import React, { useState, useEffect, useCallback } from 'react';
import {
  Heart,
  Printer,
  Clock,
  Fire,
  Users,
  ChefHat,
  Check,
  Minus,
  Plus,
  ArrowRight,
  CaretLeft,
  SpinnerGap,
  WarningCircle,
} from '@phosphor-icons/react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { getRecipeById, getRandomRecipe } from '../services/mealdb';
import type { Recipe } from '../services/mealdb';
import { useFavourites } from '../context/FavouritesContext';

// ─── Instruction steps parser ──────────────────────────────────────────────
function parseSteps(instructions: string) {
  // Split on numbered patterns like "1." "Step 1:" or double newlines
  const lines = instructions
    .split(/\r?\n/)
    .map(l => l.trim())
    .filter(Boolean);

  const steps: { number: number; title: string; body: string }[] = [];
  let buffer: string[] = [];
  let stepNum = 1;

  for (const line of lines) {
    // Detect a new step header
    const isHeader =
      /^(step\s*\d+[:\-.]?)/i.test(line) ||
      /^\d+[.\)]\s+[A-Z]/.test(line);

    if (isHeader && buffer.length > 0) {
      const body = buffer.join(' ');
      steps.push({ number: stepNum, title: `Step ${stepNum}`, body });
      stepNum++;
      buffer = [line.replace(/^(step\s*\d+[:\-.]?\s*|\d+[.\)]\s*)/i, '')];
    } else {
      buffer.push(line.replace(/^(step\s*\d+[:\-.]?\s*|\d+[.\)]\s*)/i, ''));
    }
  }

  if (buffer.length > 0) {
    steps.push({ number: stepNum, title: `Step ${stepNum}`, body: buffer.join(' ') });
  }

  // If parsing produced only 1 "step", split on sentence boundaries instead
  if (steps.length <= 1 && instructions.length > 100) {
    const sentences = instructions
      .replace(/\r?\n/g, ' ')
      .split(/(?<=[.!?])\s+/)
      .map(s => s.trim())
      .filter(Boolean);

    const chunkSize = Math.max(2, Math.ceil(sentences.length / 6));
    return sentences.reduce<{ number: number; title: string; body: string }[]>(
      (acc, sentence, i) => {
        const chunk = Math.floor(i / chunkSize);
        if (!acc[chunk]) {
          acc[chunk] = { number: chunk + 1, title: `Step ${chunk + 1}`, body: '' };
        }
        acc[chunk].body += (acc[chunk].body ? ' ' : '') + sentence;
        return acc;
      },
      [],
    );
  }

  return steps;
}

// ─── Related card (shows a random recipe preview) ──────────────────────────
const RelatedCard: React.FC<{ r: { id: string; title: string; image: string; category: string } }> = ({ r }) => {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();
  return (
    <article
      onClick={() => navigate(`/recipe/${r.id}`)}
      className="border border-[#1a1a1a] bg-white overflow-hidden cursor-pointer transition-all duration-200"
      style={{
        boxShadow: hovered ? '6px 6px 0px #1a1a1a' : 'none',
        transform: hovered ? 'translate(-2px,-2px)' : 'translate(0,0)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="h-44 overflow-hidden">
        <img
          src={r.image}
          alt={r.title}
          className="w-full h-full object-cover transition-transform duration-500"
          style={{ transform: hovered ? 'scale(1.06)' : 'scale(1)' }}
        />
      </div>
      <div className="p-4">
        <span className="text-[11px] font-bold uppercase tracking-wide text-[#E8500B]">{r.category}</span>
        <h4 className="mt-1 font-bold text-[#000] text-sm leading-snug">{r.title}</h4>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs font-semibold text-[#1a1a1a] opacity-50">View Recipe →</span>
        </div>
      </div>
    </article>
  );
};

// ─── Loading skeleton ──────────────────────────────────────────────────────
const LoadingSkeleton: React.FC = () => (
  <div className="min-h-screen bg-[#FAF6EF] animate-pulse">
    <div className="h-16 bg-white border-b border-[#1a1a1a]" />
    <div className="h-[480px] bg-[#E8E2D8]" />
    <div className="h-20 bg-[#1a1a1a]" />
    <div className="layout-container py-16 flex gap-10">
      <div className="hidden lg:block w-72 space-y-4">
        <div className="h-32 bg-[#E8E2D8] rounded" />
        <div className="h-64 bg-[#E8E2D8] rounded" />
      </div>
      <div className="flex-1 space-y-4">
        {[1, 2, 3, 4].map(i => <div key={i} className="h-28 bg-[#E8E2D8] rounded" />)}
      </div>
    </div>
  </div>
);

// ─── Error state ───────────────────────────────────────────────────────────
const ErrorState: React.FC<{ message: string; onBack: () => void }> = ({ message, onBack }) => (
  <div className="min-h-screen bg-[#FAF6EF] flex flex-col">
    <div className="flex-1 flex flex-col items-center justify-center gap-6 px-4 text-center pt-16">
      <WarningCircle size={64} weight="thin" className="text-[#E8500B]" />
      <h1 className="text-2xl font-bold text-[#1a1a1a]">Recipe Not Found</h1>
      <p className="text-[#1a1a1a] opacity-60 max-w-md">{message}</p>
      <button
        onClick={onBack}
        className="border-2 border-[#1a1a1a] px-6 py-3 text-sm font-bold hover:bg-[#1a1a1a] hover:text-white transition-colors"
      >
        ← Back to Search
      </button>
    </div>
  </div>
);

// ─── Ingredient Measurement Scaler ─────────────────────────────────────────
function scaleMeasurement(measure: string, currentServings: number, baseServings: number = 4): string {
  if (!measure) return measure;
  if (currentServings === baseServings) return measure;
  const ratio = currentServings / baseServings;

  // Match leading number, fraction, or mixed fraction (e.g. "1", "1/2", "1 1/2", "1-1/2", "200")
  const match = measure.trim().match(/^(\d+(?:[\s-]+\d+\/\d+)?|\d+\/\d+|\d+(?:\.\d+)?)\s*(.*)$/);
  if (!match) return measure;

  let numStr = match[1].replace('-', ' ').trim();
  const rest = match[2];

  let num = 0;
  if (numStr.includes('/')) {
    const parts = numStr.split(/\s+/);
    if (parts.length === 2) {
      const [whole, frac] = parts;
      const [numPart, denPart] = frac.split('/');
      num = parseInt(whole, 10) + parseInt(numPart, 10) / parseInt(denPart, 10);
    } else {
      const [numPart, denPart] = numStr.split('/');
      num = parseInt(numPart, 10) / parseInt(denPart, 10);
    }
  } else {
    num = parseFloat(numStr);
  }

  if (isNaN(num) || num === 0) return measure;

  const scaled = num * ratio;
  
  // Format nicely, favoring cooking fractions
  const eps = 0.01;
  const whole = Math.floor(scaled);
  const frac = scaled - whole;
  
  let fracStr = '';
  if (Math.abs(frac - 0) < eps) fracStr = '';
  else if (Math.abs(frac - 0.25) < eps) fracStr = '1/4';
  else if (Math.abs(frac - 0.33) < eps || Math.abs(frac - 0.333) < eps) fracStr = '1/3';
  else if (Math.abs(frac - 0.5) < eps) fracStr = '1/2';
  else if (Math.abs(frac - 0.66) < eps || Math.abs(frac - 0.666) < eps) fracStr = '2/3';
  else if (Math.abs(frac - 0.75) < eps) fracStr = '3/4';
  else fracStr = frac.toFixed(2).replace(/\.?0+$/, ''); // Fallback for decimals

  let formatted = '';
  if (whole > 0 && fracStr) formatted = `${whole} ${fracStr}`;
  else if (whole > 0) formatted = `${whole}`;
  else if (fracStr) formatted = fracStr;
  else formatted = scaled.toString();

  // If original had no space between number and unit (e.g. "200g"), keep it that way
  const hadSpace = measure.trim().match(/^[\d\s\/-]+\s+/);
  return hadSpace ? `${formatted} ${rest}`.trim() : `${formatted}${rest}`;
}

// ─── Main page ─────────────────────────────────────────────────────────────
export const RecipeDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isFavourite, toggleFavourite } = useFavourites();

  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [related, setRelated] = useState<{ id: string; title: string; image: string; category: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [servings, setServings] = useState(4);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [checkedIngredients, setCheckedIngredients] = useState<Set<number>>(new Set());
  const [activeTab, setActiveTab] = useState<'ingredients' | 'nutrition'>('ingredients');

  // Fetch main recipe
  useEffect(() => {
    if (!id) {
      setError('No recipe ID provided.');
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);
    setCompletedSteps(new Set());
    setCheckedIngredients(new Set());

    getRecipeById(id)
      .then(data => {
        if (cancelled) return;
        if (!data) {
          setError('This recipe could not be found. It may have been removed from TheMealDB.');
        } else {
          setRecipe(data);
        }
      })
      .catch(() => {
        if (!cancelled) setError('Failed to load recipe. Check your connection and try again.');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [id]);

  // Fetch 3 random recipes for the "Related" section
  useEffect(() => {
    if (!recipe) return;
    let cancelled = false;

    Promise.all([getRandomRecipe(), getRandomRecipe(), getRandomRecipe()])
      .then(results => {
        if (cancelled) return;
        const items = results
          .filter(Boolean)
          .filter(r => r!.id !== recipe.id)
          .slice(0, 3)
          .map(r => ({ id: r!.id, title: r!.title, image: r!.image, category: r!.category }));
        setRelated(items);
      })
      .catch(() => { /* non-critical — just hide the section */ });

    return () => { cancelled = true; };
  }, [recipe]);

  const toggleStep = useCallback((n: number) => {
    setCompletedSteps(prev => {
      const next = new Set(prev);
      next.has(n) ? next.delete(n) : next.add(n);
      return next;
    });
  }, []);

  const toggleIngredient = useCallback((i: number) => {
    setCheckedIngredients(prev => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  }, []);

  if (loading) return <LoadingSkeleton />;
  if (error || !recipe) return <ErrorState message={error ?? 'Unknown error'} onBack={() => navigate('/search')} />;

  const steps = parseSteps(recipe.instructions);
  const progress = steps.length > 0 ? Math.round((completedSteps.size / steps.length) * 100) : 0;
  const saved = isFavourite(recipe.id);

  const handleToggleFavourite = () => {
    toggleFavourite({
      id: recipe.id,
      title: recipe.title,
      image: recipe.image,
      category: recipe.category,
      area: recipe.area,
    });
  };

  return (
    <div className="min-h-screen bg-white font-sans text-[#1a1a1a] selection:bg-[#E8500B] selection:text-white">
      {/* ── Breadcrumb & Navigation ── */}
      <div className="pt-24 pb-6 layout-container">
        <div className="relative h-[480px] lg:h-[560px] overflow-hidden border-b-2 border-[#1a1a1a]">
          <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)' }} />

          {/* Back breadcrumb */}
          <div className="absolute top-6 left-0 right-0 layout-container">
            <Link to="/search" className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm font-medium transition-colors">
              <CaretLeft weight="bold" /> Back to Recipes
            </Link>
          </div>

          {/* Hero text */}
          <div className="absolute bottom-0 left-0 right-0 layout-container pb-10">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="bg-[#E8500B] text-white text-xs font-bold uppercase tracking-wide px-3 py-1">{recipe.category}</span>
                  <span className="border border-white/50 text-white text-xs font-semibold uppercase tracking-wide px-3 py-1">{recipe.area}</span>
                </div>
                <h1 className="text-4xl lg:text-6xl font-bold text-white tracking-tight leading-tight">{recipe.title}</h1>
                {recipe.tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {recipe.tags.map(t => (
                      <span key={t} className="border border-white/40 text-white/80 text-xs font-semibold px-2.5 py-1">{t}</span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3 flex-shrink-0">
                <button
                  onClick={handleToggleFavourite}
                  className="flex items-center gap-2 border-2 border-white bg-white/10 backdrop-blur-sm text-white px-4 py-2.5 text-sm font-semibold hover:bg-white hover:text-[#1a1a1a] transition-all"
                >
                  <Heart weight={saved ? 'fill' : 'regular'} className={saved ? 'text-[#E8500B]' : ''} />
                  {saved ? 'Saved' : 'Save'}
                </button>
                {recipe.youtubeUrl && (
                  <a
                    href={recipe.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 border-2 border-white bg-white/10 backdrop-blur-sm text-white px-4 py-2.5 text-sm font-semibold hover:bg-white hover:text-[#1a1a1a] transition-all"
                  >
                    ▶ Watch
                  </a>
                )}
                <button
                  onClick={() => window.print()}
                  className="flex items-center gap-2 border-2 border-white bg-white/10 backdrop-blur-sm text-white px-4 py-2.5 text-sm font-semibold hover:bg-white hover:text-[#1a1a1a] transition-all"
                >
                  <Printer /> Print
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Stats bar ── */}
      <div className="border-b-2 border-[#1a1a1a] bg-[#1a1a1a]">
        <div className="layout-container">
          <div className="flex flex-wrap items-center divide-x divide-white/10">
            {[
              { icon: <Users size={16} />, label: 'Servings', value: `${servings} people` },
              { icon: <ChefHat size={16} />, label: 'Ingredients', value: `${recipe.ingredients.length} items` },
              { icon: <Clock size={16} />, label: 'Steps', value: `${steps.length} steps` },
              { icon: <Fire size={16} />, label: 'Cuisine', value: recipe.area },
            ].map((m, i) => (
              <div key={i} className="flex items-center gap-3 px-6 py-4 first:pl-0">
                <span className="text-[#E8500B]">{m.icon}</span>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#CDCBC0]">{m.label}</p>
                  <p className="text-sm font-bold text-white">{m.value}</p>
                </div>
              </div>
            ))}
            {recipe.sourceUrl && (
              <div className="flex items-center gap-3 px-6 py-4 ml-auto">
                <a
                  href={recipe.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-[#E8500B] hover:underline"
                >
                  Original Source ↗
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="layout-container">
        <div className="flex gap-10 py-16">

          {/* ── Sidebar ── */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <div className="sticky top-24 flex flex-col gap-6">

              {/* Servings adjuster */}
              <div className="border-2 border-[#1a1a1a] bg-white p-6">
                <p className="text-xs font-bold uppercase tracking-wider text-[#1a1a1a] mb-4">Adjust Servings</p>
                <div className="flex items-center justify-between gap-4">
                  <button
                    onClick={() => setServings(s => Math.max(1, s - 1))}
                    className="w-9 h-9 border-2 border-[#1a1a1a] flex items-center justify-center hover:bg-[#1a1a1a] hover:text-white transition-colors text-[#1a1a1a]"
                  >
                    <Minus weight="bold" />
                  </button>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-[#1a1a1a]">{servings}</p>
                    <p className="text-xs text-[#1a1a1a] opacity-50 mt-0.5">servings</p>
                  </div>
                  <button
                    onClick={() => setServings(s => Math.min(20, s + 1))}
                    className="w-9 h-9 border-2 border-[#1a1a1a] flex items-center justify-center hover:bg-[#1a1a1a] hover:text-white transition-colors text-[#1a1a1a]"
                  >
                    <Plus weight="bold" />
                  </button>
                </div>
              </div>

              {/* Ingredients / Nutrition tabs */}
              <div className="border-2 border-[#1a1a1a] bg-white overflow-hidden">
                <div className="flex border-b-2 border-[#1a1a1a]">
                  {(['ingredients', 'nutrition'] as const).map(tab => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors ${activeTab === tab ? 'bg-[#E8500B] text-white' : 'text-[#1a1a1a] hover:bg-[#FAF6EF]'}`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {activeTab === 'ingredients' ? (
                  <div className="p-4 max-h-[400px] overflow-y-auto">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#1a1a1a] opacity-40 mb-3">Tap to check off</p>
                    <ul className="space-y-2">
                      {recipe.ingredients.map((ing, i) => (
                        <li
                          key={i}
                          onClick={() => toggleIngredient(i)}
                          className="flex items-start gap-3 cursor-pointer group"
                        >
                          <div className={`flex-shrink-0 w-4 h-4 mt-0.5 border-2 flex items-center justify-center transition-all ${checkedIngredients.has(i) ? 'bg-[#E8500B] border-[#E8500B]' : 'border-[#CDCBC0] group-hover:border-[#E8500B]'}`}>
                            {checkedIngredients.has(i) && <Check weight="bold" size={12} className="text-white" />}
                          </div>
                          <span className={`text-sm leading-snug transition-colors ${checkedIngredients.has(i) ? 'line-through text-[#1a1a1a] opacity-40' : 'text-[#1a1a1a]'}`}>
                            {ing.measure && <span className="font-bold">{scaleMeasurement(ing.measure, servings, 4)} </span>}
                            {ing.name}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div className="p-4">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#1a1a1a] opacity-40 mb-3">Estimated per serving</p>
                    <p className="text-xs text-[#1a1a1a] opacity-50 leading-relaxed">
                      Nutritional info is not available from TheMealDB's free API. For accurate data, visit the{' '}
                      {recipe.sourceUrl
                        ? <a href={recipe.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-[#E8500B] underline">original source</a>
                        : 'recipe source'}.
                    </p>
                    <div className="mt-4 space-y-2">
                      {[
                        { label: 'Ingredients', value: `${recipe.ingredients.length}` },
                        { label: 'Cuisine', value: recipe.area },
                        { label: 'Category', value: recipe.category },
                      ].map(n => (
                        <div key={n.label} className="flex justify-between text-sm border-b border-[#F0EAE0] pb-2">
                          <span className="font-semibold text-[#1a1a1a]">{n.label}</span>
                          <span className="text-[#1a1a1a] opacity-70">{n.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Tags */}
              {recipe.tags.length > 0 && (
                <div className="border-2 border-[#1a1a1a] bg-white p-5">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#1a1a1a] mb-3">Tags</p>
                  <div className="flex flex-wrap gap-2">
                    {recipe.tags.map(t => (
                      <span key={t} className="border border-[#1a1a1a] px-3 py-1 text-xs font-semibold text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white transition-colors cursor-pointer">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* YouTube link */}
              {recipe.youtubeUrl && (
                <a
                  href={recipe.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 border-[#E8500B] bg-[#E8500B] text-white p-4 flex items-center justify-center gap-2 font-bold text-sm hover:bg-[#c94008] transition-colors"
                >
                  ▶ Watch on YouTube
                </a>
              )}
            </div>
          </aside>

          {/* ── Steps ── */}
          <div className="flex-1 min-w-0">

            {/* Progress bar */}
            <div className="mb-10">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-bold text-[#1a1a1a]">
                  Cooking Progress
                  <span className="ml-2 text-[#E8500B]">{completedSteps.size}/{steps.length} steps</span>
                </p>
                <span className="text-sm font-bold text-[#1a1a1a] opacity-50">{progress}%</span>
              </div>
              <div className="h-2 bg-[#F0EAE0] border border-[#CDCBC0] overflow-hidden">
                <div
                  className="h-full bg-[#E8500B] transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              {progress === 100 && (
                <p className="mt-2 text-sm font-bold text-[#E8500B]">🎉 Recipe complete! Time to plate up.</p>
              )}
            </div>

            {/* Step cards */}
            <div className="space-y-6">
              {steps.map((step) => {
                const done = completedSteps.has(step.number);
                return (
                  <div
                    key={step.number}
                    className={`border-2 transition-all duration-200 ${done ? 'border-[#E8500B] bg-white' : 'border-[#1a1a1a] bg-white'}`}
                    style={{ boxShadow: done ? '4px 4px 0px #E8500B' : 'none' }}
                  >
                    <div
                      className={`flex items-center justify-between p-6 cursor-pointer ${done ? 'bg-[#E8500B]/5' : ''}`}
                      onClick={() => toggleStep(step.number)}
                    >
                      <div className="flex items-center gap-5">
                        <div
                          className={`w-12 h-12 flex-shrink-0 flex items-center justify-center text-lg font-bold border-2 transition-all ${done ? 'bg-[#E8500B] border-[#E8500B] text-white' : 'bg-[#FAF6EF] border-[#1a1a1a] text-[#1a1a1a]'}`}
                        >
                          {done ? <Check weight="bold" /> : step.number}
                        </div>
                        <h3 className={`text-lg font-bold ${done ? 'text-[#E8500B]' : 'text-[#000]'}`}>{step.title}</h3>
                      </div>
                      <button
                        className={`text-xs font-bold uppercase tracking-wider px-4 py-2 border-2 transition-all ${done ? 'border-[#E8500B] text-[#E8500B] hover:bg-[#E8500B] hover:text-white' : 'border-[#1a1a1a] text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white'}`}
                        onClick={(e) => { e.stopPropagation(); toggleStep(step.number); }}
                      >
                        {done ? 'Undo' : 'Mark Done'}
                      </button>
                    </div>

                    <div className="px-6 pb-6 border-t border-[#F0EAE0]">
                      <p className="text-[15px] leading-relaxed text-[#1a1a1a] mt-4">{step.body}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Mobile tags */}
            {recipe.tags.length > 0 && (
              <div className="lg:hidden mt-10 border-2 border-[#1a1a1a] bg-white p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-[#1a1a1a] mb-3">Tags</p>
                <div className="flex flex-wrap gap-2">
                  {recipe.tags.map(t => (
                    <span key={t} className="border border-[#1a1a1a] px-3 py-1 text-xs font-semibold text-[#1a1a1a]">{t}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Related recipes ── */}
      {related.length > 0 && (
        <section className="py-16 border-t-2 border-[#1a1a1a]" style={{ backgroundColor: '#F0EAE0' }}>
          <div className="layout-container">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-sm font-bold uppercase tracking-wider text-[#E8500B] mb-1">You Might Also Like</p>
                <h2 className="text-3xl font-bold text-[#1a1a1a]">Related Recipes</h2>
              </div>
              <Link to="/search" className="inline-flex items-center gap-2 text-sm font-bold text-[#1a1a1a] border-b-2 border-[#1a1a1a] pb-0.5 hover:text-[#E8500B] hover:border-[#E8500B] transition-colors">
                Browse all <ArrowRight weight="bold" />
              </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => <RelatedCard key={r.id} r={r} />)}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

// Needed to satisfy SpinnerGap import even though it's unused directly
// (kept so the icon set is available for future loading states)
void SpinnerGap;

export default RecipeDetailPage;
