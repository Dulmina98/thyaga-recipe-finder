import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { MarqueeBanner } from './components/MarqueeBanner';
import { SearchSection } from './components/SearchSection';
import { TrendingRecipes } from './components/TrendingRecipes';
import { WhySection } from './components/WhySection';
import { CTASection } from './components/CTASection';
import { Footer } from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 antialiased">
      <Navigation />
      <Hero />
      <MarqueeBanner />
      <SearchSection />
      <TrendingRecipes />
      <WhySection />
      <CTASection />
      <Footer />
    </div>
  );
}

export default App;
