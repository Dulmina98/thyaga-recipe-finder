# 🍽️ RecipeFinder

A fast, beautiful recipe discovery app built with **React + TypeScript + Vite**, powered by the free [TheMealDB API](https://www.themealdb.com/api.php).

Search thousands of recipes by name or ingredient, dive into full cooking instructions, and build a persistent favourites collection that survives page refreshes.

---

## 📐 Design Rationale

### Visual Language
The design follows a **bold editorial aesthetic** — think food magazine meets modern web app. The core palette is:
- **`#1A1A1A`** (near-black) — primary text, borders, structural elements
- **`#E8500B`** (mandarin orange) — the brand accent: CTAs, tags, active states, icons
- **`#FAF6EF`** (warm cream) — background that feels warm and appetising rather than clinical white

Heavy use of **2px solid borders** and **offset box shadows** (`6px 6px 0 #1a1a1a`) gives the UI a tactile, handcrafted feel that differentiates it from generic card-based layouts.

### Typography & Hierarchy
A single font family (system sans-serif via Tailwind's `font-sans`) is used throughout. Hierarchy is established through weight (400 → 900) and size contrast rather than multiple typefaces, keeping load times low and the design cohesive.

### Target User: Home Cooks
The target user wants to **find a recipe quickly and follow it without friction**. Every design decision serves this:

| Design Choice | User Benefit |
|---|---|
| Persistent favourites (localStorage) | Never lose a saved recipe across sessions |
| Ingredient checklist in recipe detail | Tick off as you cook without losing your place |
| Step-by-step progress bar | Reduces cognitive load — see how far you are |
| Debounced search (500 ms) | Results appear while typing, not only on submit |
| Skeleton loading cards | No jarring layout shifts while results load |
| URL-synced search (`?q=chicken`) | Shareable search links; browser back button works |
| Category quick-filter pills | Jump to Seafood / Pasta without typing |

### Responsiveness
All layouts use **flexbox + CSS Grid with Tailwind breakpoints**. The sidebar collapses on mobile, the grid scales from 1 → 2 → 3 columns, and sticky elements (navigation, recipe sidebar) are pinned correctly at all viewport widths.

---

## ✨ Features Implemented

### 🔍 Recipe Search & Display
- **Smart search** — queries TheMealDB by recipe name first; if no results, automatically retries by main ingredient
- **Debounced live search** — 500 ms after the user stops typing, a new API call fires automatically
- **URL-synced queries** — search term is stored in `?q=` so searches are bookmarkable and shareable
- **Category quick-filter pills** — one-click filters for Chicken, Seafood, Pasta, Vegetarian, Dessert
- **Landing page search bar** — submits on Enter or button click, navigates to the search results page
- **Tag chips on landing page** — click Pizza, Spicy, Vegan, etc. to jump straight to themed results

### 📄 Detailed Recipe View
- Dynamic routing: every recipe has its own URL — `/recipe/:id`
- Full recipe data fetched from TheMealDB by meal ID
- **Ingredients checklist** — tap any ingredient to cross it off while cooking
- **Servings adjuster** — ± buttons to scale the serving count
- **Step-by-step instruction cards** — raw API instructions parsed into individual step cards
- **Cooking progress bar** — click "Mark Done" on steps; a progress bar fills toward 100 %
- **YouTube link** — a "Watch" button appears when TheMealDB provides a video URL
- **Related recipes section** — 3 random recipes shown below every detail page
- **Back to Recipes** breadcrumb link

### ❤️ Favourites System
- **Persistent across sessions** — saved to `localStorage` under key `recipefinder_favourites`
- **Cross-tab sync** — two browser windows stay in sync via the `storage` event
- **Toggle from anywhere** — save/unsave a recipe from the search results card or the recipe detail page
- **Favourites page** — grid / list view toggle, search within saved recipes, cuisine filter chips
- **Animated removal** — cards fade out before being removed from the DOM
- **Saved date** — each favourite records when it was saved (ISO timestamp → displayed as locale date)

### 🎨 UI / UX
- **Loading skeletons** — 6 animated pulse cards on search; full-page skeleton on recipe detail
- **Error states** — warning icon + message + Retry / Back button for every failed API call
- **Empty state** — friendly message with the search term when no results are found
- **Hover micro-animations** — cards lift with offset box-shadow on hover
- **Fully responsive** — mobile (1-col) → tablet (2-col) → desktop (3-col + sidebar)

### 📄 Additional Pages
- **About page** — team / project information
- **Landing page** — hero banner, search section, trending recipes, marquee banner, CTA section

---

## 🛠️ Tech Stack

| Technology | Role |
|---|---|
| [React 19](https://react.dev) | UI library |
| [TypeScript](https://www.typescriptlang.org) | Type safety across the codebase |
| [Vite 8](https://vitejs.dev) | Build tool & dev server |
| [React Router v7](https://reactrouter.com) | Client-side routing (`/`, `/search`, `/recipe/:id`, `/favourites`, `/about`) |
| [Tailwind CSS v4](https://tailwindcss.com) | Utility-first styling |
| [@phosphor-icons/react](https://phosphoricons.com) | Icon library |
| [TheMealDB API](https://www.themealdb.com/api.php) | Free recipe data (no API key required in dev) |
| `localStorage` | Favourites persistence |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** ≥ 18
- **npm** ≥ 9

### Installation & Running Locally

```bash
# 1. Clone the repository
git clone https://github.com/<your-username>/thyaga-recipe-finder.git
cd thyaga-recipe-finder

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The app will be available at **http://localhost:5173**.

### Other Commands

```bash
# Type-check without building
npx tsc --noEmit

# Lint
npm run lint

# Production build
npm run build

# Preview production build locally
npm run preview
```

> **No `.env` file required.** TheMealDB's test API key (`1`) is embedded in the service layer and works for development and educational use without registration.

---

## 📁 Project Structure

```
src/
├── components/
│   ├── search/          # SearchNavigation, SearchResultCard, SearchSidebar
│   ├── favourites/      # FavouriteGridCard, FavouriteListRow, FavouritesSidebar, EmptyState
│   ├── ui/              # Button (reusable)
│   └── ...              # Hero, Navigation, Footer, MarqueeBanner, etc.
├── context/
│   └── FavouritesContext.tsx   # React context + useFavourites hook + localStorage logic
├── pages/
│   ├── LandingPage.tsx
│   ├── SearchResultsPage.tsx   # Real API calls, skeletons, error/empty states
│   ├── RecipeDetailPage.tsx    # Dynamic route, useParams, step parser
│   ├── FavouritesPage.tsx
│   └── AboutPage.tsx
├── services/
│   └── mealdb.ts        # All TheMealDB API functions + TypeScript types
├── types/
│   └── favourite.ts     # FavouriteItem type
└── data/                # Legacy mock data (kept for reference)
```

---

## ⚙️ Key Architecture Decisions

### API Service Layer (`src/services/mealdb.ts`)
All network calls are isolated in one file. Components never call `fetch` directly — they import typed functions (`searchByName`, `getRecipeById`, `smartSearch`, etc.). This makes it trivial to swap the API or add caching later.

### Favourites Context (`src/context/FavouritesContext.tsx`)
A single React context wraps the entire app (mounted in `main.tsx`). Any component can call `useFavourites()` to read or update the list. State is mirrored to `localStorage` on every change via a `useEffect`, and a `storage` event listener keeps multiple tabs in sync.

### `smartSearch`
TheMealDB's name search and ingredient filter are separate endpoints. `smartSearch` tries name search first; if that returns nothing it retries with the same string as an ingredient. This means searching "chicken breast" works naturally.

### Instruction Step Parser
TheMealDB stores cooking instructions as a single unstructured text blob. A custom parser (`parseSteps`) attempts to split on numbered patterns (`1.`, `Step 2:`) and falls back to sentence-boundary splitting into roughly 6 chunks. This converts raw text into interactive, checkable step cards.

---

## 🧩 Challenges & Solutions

### 1. TheMealDB returns `null` for empty ingredient slots
The API always returns 20 `strIngredient` / `strMeasure` pairs, with unused ones set to `""` or `null`. The `extractIngredients` helper filters these out by checking `if (name)` before adding to the array.

### 2. No cooking time or calorie data in the free API
TheMealDB's free tier doesn't return nutrition or prep/cook time. The design adapts gracefully — the stats bar on the detail page shows Servings, Ingredient count, Step count, and Cuisine instead.

### 3. Unstructured instruction text
Parsing the instruction blob into steps is heuristic-based and not perfect for every recipe. The fallback (sentence-boundary splitting) ensures that even plain-paragraph instructions get split into digestible cards rather than showing one giant wall of text.

### 4. Type safety with the raw API shape
TheMealDB uses an index signature (`[key: string]: string | null`) for ingredient/measure fields. This required adding an explicit index signature to `RawMeal` while keeping the named fields strongly typed.

### 5. Favourites shape vs. mock data shape
The existing UI was built against a mock data shape with fields like `tag`, `tagColor`, `cuisine`, `collection`. Migrating to the `FavouriteItem` type (from the real API) required updating every card component to use `category`, `area`, and `savedAt` instead — done without breaking the visual design.

---

## 📝 License

This project was built as part of a frontend development assignment. All recipe data is provided by [TheMealDB](https://www.themealdb.com) under their free API terms.
