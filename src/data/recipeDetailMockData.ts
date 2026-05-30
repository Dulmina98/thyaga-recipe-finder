export const BASE_SERVINGS = 4;

export const RECIPE = {
  title: 'Truffle Mushroom Risotto',
  subtitle: 'Silky arborio rice slow-cooked with wild mushrooms and a drizzle of truffle oil.',
  tag: 'Italian',
  difficulty: 'Medium',
  rating: 4.8,
  reviews: 1524,
  savedCount: '3.2K',
  image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=1400&q=90',
  author: { name: 'Chef Marco', avatar: 'https://images.unsplash.com/photo-1607631568010-a87245c0daf8?w=200&q=80' },
  prepTime: '15 min',
  cookTime: '35 min',
  totalTime: '50 min',
  calories: 480,
  protein: '14g',
  carbs: '62g',
  fat: '18g',
  tags: ['Vegetarian', 'Gluten-Free', 'Comfort Food', 'Date Night', 'Italian'],
};

export const INGREDIENTS = [
  { amount: 1.5, unit: 'cups', name: 'Arborio rice' },
  { amount: 6, unit: 'cups', name: 'warm vegetable or chicken stock' },
  { amount: 400, unit: 'g', name: 'mixed wild mushrooms (cremini, shiitake, oyster)' },
  { amount: 1, unit: '', name: 'medium white onion, finely diced' },
  { amount: 4, unit: 'cloves', name: 'garlic, minced' },
  { amount: 0.75, unit: 'cup', name: 'dry white wine' },
  { amount: 60, unit: 'g', name: 'unsalted butter' },
  { amount: 0.5, unit: 'cup', name: 'Parmesan cheese, freshly grated' },
  { amount: 2, unit: 'tbsp', name: 'truffle oil' },
  { amount: 3, unit: 'tbsp', name: 'olive oil' },
  { amount: 1, unit: 'handful', name: 'fresh thyme sprigs' },
  { amount: 1, unit: 'to taste', name: 'sea salt and black pepper' },
];

export const STEPS = [
  {
    number: 1,
    title: 'Prepare the Stock',
    duration: '5 min',
    body: 'Heat the stock in a small saucepan over low heat. Keep it warm throughout cooking — cold stock will interrupt the cooking process and make the risotto gluey.',
    tip: 'Use good-quality stock. Homemade or a good store-bought brand makes a noticeable difference here.',
  },
  {
    number: 2,
    title: 'Sauté the Mushrooms',
    duration: '8 min',
    body: 'Heat 2 tbsp olive oil in a large, wide pan over high heat. Add mushrooms in a single layer — don\'t overcrowd. Cook without stirring for 3–4 minutes until golden. Season with salt, thyme, and half the garlic. Toss and cook another 2 minutes. Remove and set aside.',
    tip: 'Resist stirring too early. Mushrooms need contact with the hot pan to brown, not steam.',
  },
  {
    number: 3,
    title: 'Build the Base',
    duration: '7 min',
    body: 'In the same pan over medium heat, add remaining olive oil. Gently sweat the onion for 4–5 minutes until soft and translucent. Add remaining garlic and cook for 1 minute. Add the arborio rice and stir to coat every grain in oil. Toast for 2 minutes until the edges of the rice turn translucent.',
  },
  {
    number: 4,
    title: 'Deglaze with Wine',
    duration: '3 min',
    body: 'Pour in the white wine and stir continuously until fully absorbed. This step adds acidity and complexity to the final flavour.',
    tip: 'Use a wine you\'d actually drink. Cheap cooking wine will give you cheap-tasting risotto.',
  },
  {
    number: 5,
    title: 'Add Stock Gradually',
    duration: '20 min',
    body: 'Add the warm stock one ladle at a time, stirring continuously and waiting for each addition to be almost fully absorbed before adding the next. This slow process develops the characteristic creaminess. After about 18–20 minutes the rice should be al dente — tender but with a slight bite.',
  },
  {
    number: 6,
    title: 'Finish & Serve',
    duration: '3 min',
    body: 'Remove from heat. Stir in cold butter in cubes, then Parmesan. This is the "mantecatura" — the Italian technique that gives risotto its glossy, velvety finish. Fold in the sautéed mushrooms. Taste and adjust seasoning. Plate immediately, drizzle with truffle oil, and finish with extra Parmesan and fresh thyme.',
    tip: 'Risotto waits for no one. Serve immediately for best texture — it thickens as it cools.',
  },
];

export const RELATED = [
  {
    title: 'Creamy Chicken Alfredo',
    tag: 'Italian • 25 min',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=600&q=80',
  },
  {
    title: 'Spicy Mango Tacos',
    tag: 'Mexican • 20 min',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&q=80',
  },
  {
    title: 'Korean BBQ Bulgogi Bowl',
    tag: 'Korean • 55 min',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=600&q=80',
  },
];
