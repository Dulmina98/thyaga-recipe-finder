export interface Recipe {
  id: number;
  tag: string;
  tagColor: string;
  title: string;
  desc: string;
  time: string;
  cal: string;
  rating: number;
  reviews: string;
  image: string;
  cuisine: string;
  collection: string;
  savedDate: string;
}

export const INITIAL_FAVOURITES: Recipe[] = [
  {
    id: 1, tag: 'Baked', tagColor: '#E8500B',
    title: 'Cheesy Baked Chicken Pasta',
    desc: 'Golden, bubbly baked pasta layered with mozzarella and herb-roasted chicken.',
    time: '45 min', cal: '560 cal', rating: 4.7, reviews: '1.1K',
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600&q=80',
    cuisine: 'Italian', collection: 'Weeknight Dinners', savedDate: 'Today',
  },
  {
    id: 2, tag: 'Quick', tagColor: '#1A1A1A',
    title: 'Spicy Mango Tacos',
    desc: 'Fresh mango salsa meets fire-roasted peppers in this vibrant street-style taco.',
    time: '25 min', cal: '380 cal', rating: 4.9, reviews: '2.1K',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&q=80',
    cuisine: 'Mexican', collection: 'Weekend Feasts', savedDate: 'Yesterday',
  },
  {
    id: 3, tag: 'Healthy', tagColor: '#1A1A1A',
    title: 'Truffle Mushroom Risotto',
    desc: 'Silky arborio rice slow-cooked with wild mushrooms and a drizzle of truffle oil.',
    time: '35 min', cal: '420 cal', rating: 4.8, reviews: '1.5K',
    image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=600&q=80',
    cuisine: 'Italian', collection: 'Weekend Feasts', savedDate: '2 days ago',
  },
  {
    id: 4, tag: 'Spicy', tagColor: '#E8500B',
    title: 'Korean BBQ Bulgogi Bowl',
    desc: 'Caramelised marinated beef over steamed rice with pickled daikon and kimchi.',
    time: '55 min', cal: '510 cal', rating: 4.9, reviews: '3.1K',
    image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=600&q=80',
    cuisine: 'Korean', collection: 'Weeknight Dinners', savedDate: '3 days ago',
  },
  {
    id: 5, tag: 'Light', tagColor: '#1A1A1A',
    title: 'Lemon Garlic Chicken Linguine',
    desc: 'Bright citrus and roasted garlic butter sauce with seared chicken strips.',
    time: '22 min', cal: '340 cal', rating: 4.6, reviews: '980',
    image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=600&q=80',
    cuisine: 'Italian', collection: 'Quick & Easy', savedDate: '1 week ago',
  },
  {
    id: 6, tag: 'Vegan', tagColor: '#1A1A1A',
    title: 'Zucchini Noodle Buddha Bowl',
    desc: 'Low-carb spiralised zucchini with roasted chickpeas and tahini drizzle.',
    time: '18 min', cal: '290 cal', rating: 4.7, reviews: '640',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80',
    cuisine: 'Asian', collection: 'Quick & Easy', savedDate: '1 week ago',
  },
];

export const COLLECTIONS = ['All Saved', 'Weeknight Dinners', 'Weekend Feasts', 'Quick & Easy'];
export const CUISINE_FILTERS = ['All', 'Italian', 'Mexican', 'Korean', 'Asian'];
