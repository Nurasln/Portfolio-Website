import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import GameDetails from './pages/GameDetails';
import Projects from './pages/Projects';
import LoadingScreen from './components/LoadingScreen';

import { AnomalyProvider } from './context/AnomalyContext';

import SnowEffect from './components/SnowEffect';

// Helper component to force Home on refresh
const RedirectToHome = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== '/') {
      navigate('/');
    }
  }, []); // Run once on mount

  return null;
};

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}

      {!loading && (
        <Router>
          <AnomalyProvider>
            <RedirectToHome />
            <SnowEffect />
            {/* w-full ve overflow-hidden ile tam ekranı sabitledik */}
            <div className="w-full h-screen bg-[#121212] text-white overflow-hidden flex flex-col font-inter selection:bg-purple-500 selection:text-white">
              <Navbar />

              {/* max-w sınırlamasını kaldırdık, artık tam genişlik */}
              <div className="flex-1 w-full relative flex flex-col overflow-hidden">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/game/:id" element={<GameDetails />} />
                </Routes>
              </div>
            </div>
          </AnomalyProvider>
        </Router>
      )}
    </>
  );
}

export default App;