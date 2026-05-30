import React, { useState } from 'react';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { 
  Heart, 
  ShareNetwork, 
  Printer, 
  Clock, 
  Fire, 
  Users, 
  ChefHat, 
  Check, 
  Minus, 
  Plus, 
  ArrowRight, 
  CaretLeft 
} from '@phosphor-icons/react';
import { useNavigate, Link } from 'react-router-dom';
import { BASE_SERVINGS, RECIPE, INGREDIENTS, STEPS, RELATED } from '../data/recipeDetailMockData';

function scaleAmount(amount: number, servings: number): string {
  const scaled = (amount * servings) / BASE_SERVINGS;
  if (scaled % 1 === 0) return scaled.toString();
  const frac = scaled - Math.floor(scaled);
  const whole = Math.floor(scaled);
  const fracs: Record<string, string> = {
    '0.25': '¼', '0.5': '½', '0.75': '¾', '0.33': '⅓', '0.67': '⅔',
  };
  const fracKey = frac.toFixed(2);
  const fracStr = fracs[fracKey] ?? frac.toFixed(1);
  return whole > 0 ? `${whole} ${fracStr}` : fracStr;
}

const RelatedCard: React.FC<{ r: typeof RELATED[0] }> = ({ r }) => {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();
  return (
    <article
      onClick={() => navigate('/recipe')}
      className="border border-[#1a1a1a] bg-white overflow-hidden cursor-pointer transition-all duration-200"
      style={{
        boxShadow: hovered ? '6px 6px 0px #1a1a1a' : 'none',
        transform: hovered ? 'translate(-2px,-2px)' : 'translate(0,0)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="h-44 overflow-hidden">
        <img src={r.image} alt={r.title} className="w-full h-full object-cover transition-transform duration-500" style={{ transform: hovered ? 'scale(1.06)' : 'scale(1)' }} />
      </div>
      <div className="p-4">
        <span className="text-[11px] font-bold uppercase tracking-wide text-[#E8500B]">{r.tag.split('•')[0].trim()}</span>
        <h4 className="mt-1 font-bold text-[#000] text-sm leading-snug">{r.title}</h4>
        <div className="mt-3 flex items-center justify-between">
          <span className="flex items-center gap-1 text-xs font-bold"><span className="text-[#E8500B]">★</span> {r.rating}</span>
          <span className="text-[11px] text-[#1a1a1a] opacity-50">{r.tag.split('•')[1]?.trim()}</span>
        </div>
      </div>
    </article>
  );
};

export const RecipeDetailPage: React.FC = () => {
  const [saved, setSaved] = useState(false);
  const [servings, setServings] = useState(BASE_SERVINGS);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [checkedIngredients, setCheckedIngredients] = useState<Set<number>>(new Set());
  const [activeTab, setActiveTab] = useState<'ingredients' | 'nutrition'>('ingredients');

  const toggleStep = (n: number) => {
    setCompletedSteps(prev => {
      const next = new Set(prev);
      next.has(n) ? next.delete(n) : next.add(n);
      return next;
    });
  };

  const toggleIngredient = (i: number) => {
    setCheckedIngredients(prev => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

  const progress = Math.round((completedSteps.size / STEPS.length) * 100);

  return (
    <div className="min-h-screen font-sans bg-[#FAF6EF]">
      <Navigation />

      <div className="pt-16">
        <div className="relative h-[480px] lg:h-[560px] overflow-hidden border-b-2 border-[#1a1a1a]">
          <img src={RECIPE.image} alt={RECIPE.title} className="w-full h-full object-cover" />
          {/* Dark gradient overlay */}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)' }} />

          {/* Back breadcrumb */}
          <div className="absolute top-6 left-0 right-0 layout-container">
            <Link to="/search" className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm font-medium transition-colors">
              <CaretLeft weight="bold" /> Back to Recipes
            </Link>
          </div>

          {/* Hero text overlay */}
          <div className="absolute bottom-0 left-0 right-0 layout-container pb-10">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="bg-[#E8500B] text-white text-xs font-bold uppercase tracking-wide px-3 py-1">{RECIPE.tag}</span>
                  <span className="border border-white/50 text-white text-xs font-semibold uppercase tracking-wide px-3 py-1">{RECIPE.difficulty}</span>
                </div>
                <h1 className="text-4xl lg:text-6xl font-bold text-white tracking-tight leading-tight">{RECIPE.title}</h1>
                <p className="mt-2 text-white/75 text-lg max-w-xl">{RECIPE.subtitle}</p>
                <div className="mt-4 flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    {[1,2,3,4,5].map(s => (
                      <span key={s} className="text-lg" style={{ color: s <= Math.round(RECIPE.rating) ? '#E8500B' : 'rgba(255,255,255,0.3)' }}>★</span>
                    ))}
                    <span className="text-white font-bold ml-1">{RECIPE.rating}</span>
                    <span className="text-white/60 text-sm">({RECIPE.reviews.toLocaleString()} reviews)</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 flex-shrink-0">
                <button
                  onClick={() => setSaved(!saved)}
                  className="flex items-center gap-2 border-2 border-white bg-white/10 backdrop-blur-sm text-white px-4 py-2.5 text-sm font-semibold hover:bg-white hover:text-[#1a1a1a] transition-all"
                >
                  <Heart weight={saved ? 'fill' : 'regular'} className={saved ? 'text-[#E8500B]' : ''} /> {saved ? 'Saved' : 'Save'}
                </button>
                <button className="flex items-center gap-2 border-2 border-white bg-white/10 backdrop-blur-sm text-white px-4 py-2.5 text-sm font-semibold hover:bg-white hover:text-[#1a1a1a] transition-all">
                  <ShareNetwork /> Share
                </button>
                <button className="flex items-center gap-2 border-2 border-white bg-white/10 backdrop-blur-sm text-white px-4 py-2.5 text-sm font-semibold hover:bg-white hover:text-[#1a1a1a] transition-all">
                  <Printer /> Print
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-b-2 border-[#1a1a1a] bg-[#1a1a1a]">
        <div className="layout-container">
          <div className="flex flex-wrap items-center divide-x divide-white/10">
            {[
              { icon: <Clock size={16} />, label: 'Prep', value: RECIPE.prepTime },
              { icon: <Clock size={16} />, label: 'Cook', value: RECIPE.cookTime },
              { icon: <Clock size={16} />, label: 'Total', value: RECIPE.totalTime },
              { icon: <Fire size={16} />, label: 'Calories', value: `${RECIPE.calories} kcal` },
              { icon: <Users size={16} />, label: 'Servings', value: `${servings} people` },
              { icon: <ChefHat size={16} />, label: 'Difficulty', value: RECIPE.difficulty },
            ].map((m, i) => (
              <div key={i} className="flex items-center gap-3 px-6 py-4 first:pl-0">
                <span className="text-[#E8500B]">{m.icon}</span>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#CDCBC0]">{m.label}</p>
                  <p className="text-sm font-bold text-white">{m.value}</p>
                </div>
              </div>
            ))}
            <div className="flex items-center gap-3 px-6 py-4 ml-auto">
              <img src={RECIPE.author.avatar} alt={RECIPE.author.name} className="w-8 h-8 rounded-full object-cover border-2 border-[#E8500B]" />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#CDCBC0]">Recipe by</p>
                <p className="text-sm font-bold text-white">{RECIPE.author.name}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="layout-container">
        <div className="flex gap-10 py-16">

          <aside className="hidden lg:block w-72 flex-shrink-0">
            <div className="sticky top-24 flex flex-col gap-6">

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
                  <div className="p-4">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#1a1a1a] opacity-40 mb-3">Tap to check off</p>
                    <ul className="space-y-2">
                      {INGREDIENTS.map((ing, i) => (
                        <li
                          key={i}
                          onClick={() => toggleIngredient(i)}
                          className="flex items-start gap-3 cursor-pointer group"
                        >
                          <div className={`flex-shrink-0 w-4 h-4 mt-0.5 border-2 flex items-center justify-center transition-all ${checkedIngredients.has(i) ? 'bg-[#E8500B] border-[#E8500B]' : 'border-[#CDCBC0] group-hover:border-[#E8500B]'}`}>
                            {checkedIngredients.has(i) && <Check weight="bold" size={12} className="text-white" />}
                          </div>
                          <span className={`text-sm leading-snug transition-colors ${checkedIngredients.has(i) ? 'line-through text-[#1a1a1a] opacity-40' : 'text-[#1a1a1a]'}`}>
                            <span className="font-bold">{scaleAmount(ing.amount, servings)}{ing.unit ? ` ${ing.unit}` : ''}</span>
                            {' '}{ing.name}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div className="p-4">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#1a1a1a] opacity-40 mb-3">Per serving</p>
                    <div className="space-y-3">
                      {[
                        { label: 'Calories', value: RECIPE.calories, unit: 'kcal', pct: 24 },
                        { label: 'Protein', value: RECIPE.protein, unit: '', pct: 28 },
                        { label: 'Carbs', value: RECIPE.carbs, unit: '', pct: 21 },
                        { label: 'Fat', value: RECIPE.fat, unit: '', pct: 25 },
                      ].map(n => (
                        <div key={n.label}>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-semibold text-[#1a1a1a]">{n.label}</span>
                            <span className="text-xs font-bold text-[#1a1a1a]">{n.value}{n.unit}</span>
                          </div>
                          <div className="h-1.5 bg-[#F0EAE0] overflow-hidden">
                            <div className="h-full bg-[#E8500B] transition-all duration-500" style={{ width: `${n.pct}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="border-2 border-[#1a1a1a] bg-white p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-[#1a1a1a] mb-3">Tags</p>
                <div className="flex flex-wrap gap-2">
                  {RECIPE.tags.map(t => (
                    <span key={t} className="border border-[#1a1a1a] px-3 py-1 text-xs font-semibold text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white transition-colors cursor-pointer">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          <div className="flex-1 min-w-0">

            <div className="mb-10">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-bold text-[#1a1a1a]">
                  Cooking Progress
                  <span className="ml-2 text-[#E8500B]">{completedSteps.size}/{STEPS.length} steps</span>
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

            <div className="space-y-6">
              {STEPS.map((step) => {
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
                        <div>
                          <h3 className={`text-lg font-bold ${done ? 'text-[#E8500B]' : 'text-[#000]'}`}>{step.title}</h3>
                          <span className="text-xs text-[#1a1a1a] opacity-50 flex items-center gap-1 mt-0.5">
                            <Clock size={12} /> {step.duration}
                          </span>
                        </div>
                      </div>
                      <button
                        className={`text-xs font-bold uppercase tracking-wider px-4 py-2 border-2 transition-all ${done ? 'border-[#E8500B] text-[#E8500B] hover:bg-[#E8500B] hover:text-white' : 'border-[#1a1a1a] text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white'}`}
                        onClick={(e) => { e.stopPropagation(); toggleStep(step.number); }}
                      >
                        {done ? 'Undo' : 'Mark Done'}
                      </button>
                    </div>

                    <div className={`px-6 pb-6 border-t border-[#F0EAE0]`}>
                      <p className="text-[15px] leading-relaxed text-[#1a1a1a] mt-4">{step.body}</p>
                      {step.tip && (
                        <div className="mt-4 flex gap-3 bg-[#FAF6EF] border-l-4 border-[#E8500B] p-4">
                          <span className="text-[#E8500B] font-bold text-sm flex-shrink-0">💡 Tip</span>
                          <p className="text-sm text-[#1a1a1a] opacity-80 leading-relaxed">{step.tip}</p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="lg:hidden mt-10 border-2 border-[#1a1a1a] bg-white p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-[#1a1a1a] mb-3">Tags</p>
              <div className="flex flex-wrap gap-2">
                {RECIPE.tags.map(t => (
                  <span key={t} className="border border-[#1a1a1a] px-3 py-1 text-xs font-semibold text-[#1a1a1a]">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="py-16 border-t-2 border-[#1a1a1a]" style={{ backgroundColor: '#F0EAE0' }}>
        <div className="layout-container">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-[#E8500B] mb-1">You Might Also Like</p>
              <h2 className="text-3xl font-bold text-[#1a1a1a]">Related Recipes</h2>
            </div>
            <a href="#" className="inline-flex items-center gap-2 text-sm font-bold text-[#1a1a1a] border-b-2 border-[#1a1a1a] pb-0.5 hover:text-[#E8500B] hover:border-[#E8500B] transition-colors">
              Browse all <ArrowRight weight="bold" />
            </a>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {RELATED.map((r, i) => <RelatedCard key={i} r={r} />)}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default RecipeDetailPage;
