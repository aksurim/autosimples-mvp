import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { VideoSection } from './components/VideoSection';
import { HowItWorks } from './components/HowItWorks';
import { Footer } from './components/Footer';
import { AdminDashboard } from './pages/AdminDashboard';
import { API_URL } from './config/api';

function LandingPage() {
  // Contador de Visitas
  useEffect(() => {
    const hasVisited = sessionStorage.getItem('hasVisited');
    if (!hasVisited) {
      fetch(`${API_URL}/metrics/increment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ metric: 'total_visits' })
      }).catch(console.error);
      sessionStorage.setItem('hasVisited', 'true');
    }
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <VideoSection />
        <HowItWorks />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;