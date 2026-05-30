import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import SearchResultsPage from './pages/SearchResultsPage';
import FavouritesPage from './pages/FavouritesPage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/search" element={<SearchResultsPage />} />
        <Route path="/favourites" element={<FavouritesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
