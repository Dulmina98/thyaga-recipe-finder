import React from 'react';
import { RecipeCard } from './RecipeCard';

export const TrendingRecipes: React.FC = () => {
  const recipes = [
    {
      tag: 'Mexican • 25min',
      title: 'Spicy Mango Tacos',
      desc: 'Fresh mango salsa meets fire-roasted peppers in this vibrant street-style taco.',
      rating: '4.9',
      reviews: '2.1K',
      image: '/images/trending/mexican.jpg',
    },
    {
      tag: 'Italian • 35min',
      title: 'Truffle Mushroom Risotto',
      desc: 'Silky arborio rice slow-cooked with wild mushrooms and a drizzle of truffle oil.',
      rating: '4.8',
      reviews: '1.1K',
      image: '/images/trending/italian.jpg',
    },
    {
      tag: 'Korean • 55min',
      title: 'Korean BBQ Bulgogi Bowl',
      desc: 'Caramelized marinated beef over steamed rice with pickled daikon and kimchi.',
      rating: '4.9',
      reviews: '3.1K',
      image: '/images/trending/korean.jpg',
    },
  ];

  return (
    <section className="py-20 lg:py-28" style={{ backgroundColor: '#FAF6EF' }}>
      <div className="layout-container">
        <p className="text-sm font-bold uppercase tracking-wider" style={{ color: '#E8500B' }}>Hot Right Now</p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: '#000000' }}>Trending Recipes</h2>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {recipes.map((recipe, idx) => (
            <RecipeCard key={idx} {...recipe} />
          ))}
        </div>
      </div>
    </section>
  );
};
