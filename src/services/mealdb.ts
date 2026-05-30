const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export interface RawMeal {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags: string | null;
  strYoutube: string | null;
  strSource: string | null;
  [key: string]: string | null;
}

export interface RawMealSummary {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

export interface RawCategory {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

export interface Ingredient {
  name: string;
  measure: string;
  thumbnail: string;
}

export interface Recipe {
  id: string;
  title: string;
  category: string;
  area: string;
  instructions: string;
  image: string;
  thumbnail: string;
  tags: string[];
  youtubeUrl: string | null;
  sourceUrl: string | null;
  ingredients: Ingredient[];
}

export interface RecipeSummary {
  id: string;
  title: string;
  category: string;
  area: string;
  thumbnail: string;
}

export interface Category {
  id: string;
  name: string;
  thumbnail: string;
  description: string;
}

function extractIngredients(meal: RawMeal): Ingredient[] {
  const ingredients: Ingredient[] = [];
  for (let i = 1; i <= 20; i++) {
    const name = meal[`strIngredient${i}`]?.trim();
    const measure = meal[`strMeasure${i}`]?.trim();
    if (name) {
      ingredients.push({
        name,
        measure: measure ?? '',
        thumbnail: `https://www.themealdb.com/images/ingredients/${encodeURIComponent(name)}-small.png`,
      });
    }
  }
  return ingredients;
}

function normaliseRecipe(meal: RawMeal): Recipe {
  return {
    id: meal.idMeal,
    title: meal.strMeal,
    category: meal.strCategory,
    area: meal.strArea,
    instructions: meal.strInstructions,
    image: meal.strMealThumb,
    thumbnail: `${meal.strMealThumb}/preview`,
    tags: meal.strTags ? meal.strTags.split(',').map(t => t.trim()).filter(Boolean) : [],
    youtubeUrl: meal.strYoutube ?? null,
    sourceUrl: meal.strSource ?? null,
    ingredients: extractIngredients(meal),
  };
}

function normaliseSummary(meal: RawMealSummary): RecipeSummary {
  return {
    id: meal.idMeal,
    title: meal.strMeal,
    category: '',
    area: '',
    thumbnail: meal.strMealThumb,
  };
}

async function apiFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`);
  if (!res.ok) {
    throw new Error(`TheMealDB API error: ${res.status} ${res.statusText}`);
  }
  return res.json() as Promise<T>;
}

export async function searchByName(query: string): Promise<RecipeSummary[]> {
  if (!query.trim()) return [];
  const data = await apiFetch<{ meals: RawMeal[] | null }>(`/search.php?s=${encodeURIComponent(query.trim())}`);
  if (!data.meals) return [];
  return data.meals.map(m => ({
    id: m.idMeal,
    title: m.strMeal,
    category: m.strCategory,
    area: m.strArea,
    thumbnail: m.strMealThumb,
  }));
}

export async function searchByIngredient(ingredient: string): Promise<RecipeSummary[]> {
  if (!ingredient.trim()) return [];
  const slug = ingredient.trim().replace(/\s+/g, '_');
  const data = await apiFetch<{ meals: RawMealSummary[] | null }>(`/filter.php?i=${encodeURIComponent(slug)}`);
  if (!data.meals) return [];
  return data.meals.map(normaliseSummary);
}

export async function searchByCategory(category: string): Promise<RecipeSummary[]> {
  if (!category.trim()) return [];
  const data = await apiFetch<{ meals: RawMealSummary[] | null }>(`/filter.php?c=${encodeURIComponent(category.trim())}`);
  if (!data.meals) return [];
  return data.meals.map(normaliseSummary);
}

export async function searchByArea(area: string): Promise<RecipeSummary[]> {
  if (!area.trim()) return [];
  const data = await apiFetch<{ meals: RawMealSummary[] | null }>(`/filter.php?a=${encodeURIComponent(area.trim())}`);
  if (!data.meals) return [];
  return data.meals.map(normaliseSummary);
}

export async function getRecipeById(id: string): Promise<Recipe | null> {
  if (!id) return null;
  const data = await apiFetch<{ meals: RawMeal[] | null }>(`/lookup.php?i=${encodeURIComponent(id)}`);
  if (!data.meals || data.meals.length === 0) return null;
  return normaliseRecipe(data.meals[0]);
}

export async function getRandomRecipe(): Promise<Recipe | null> {
  const data = await apiFetch<{ meals: RawMeal[] | null }>('/random.php');
  if (!data.meals || data.meals.length === 0) return null;
  return normaliseRecipe(data.meals[0]);
}

export async function getCategories(): Promise<Category[]> {
  const data = await apiFetch<{ categories: RawCategory[] | null }>('/categories.php');
  if (!data.categories) return [];
  return data.categories.map(c => ({
    id: c.idCategory,
    name: c.strCategory,
    thumbnail: c.strCategoryThumb,
    description: c.strCategoryDescription,
  }));
}

export async function getAreas(): Promise<string[]> {
  const data = await apiFetch<{ meals: { strArea: string }[] | null }>('/list.php?a=list');
  if (!data.meals) return [];
  return data.meals.map(m => m.strArea);
}

export async function smartSearch(query: string): Promise<RecipeSummary[]> {
  const trimmed = query.trim();
  if (!trimmed) return [];

  const byName = await searchByName(trimmed);
  if (byName.length > 0) return byName;

  return searchByIngredient(trimmed);
}
