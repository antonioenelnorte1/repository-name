
import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './views/Home';
import CompanyPortal from './views/CompanyPortal';
import JobDetail from './views/JobDetail';
import CandidatePortal from './views/CandidatePortal';
import LearningHub from './views/LearningHub';
import AuthGate from './views/AuthGate';
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Loader2 } from 'lucide-react';

const AppContent: React.FC = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <div className="p-4 bg-white rounded-3xl shadow-2xl text-blue-600 animate-bounce">
          <Loader2 size={40} className="animate-spin" />
        </div>
        <p className="mt-6 text-slate-400 font-bold uppercase tracking-widest text-xs">Waking up the bridge...</p>
      </div>
    );
  }

  return (
    <Router>
      {isAuthenticated ? (
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/company" element={<CompanyPortal />} />
            <Route path="/job/:id" element={<JobDetail />} />
            <Route path="/candidate" element={<CandidatePortal />} />
            <Route path="/learning" element={<LearningHub />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Layout>
      ) : (
        <AuthGate onLogin={() => {}} />
      )}
    </Router>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </LanguageProvider>
  );
};

export default App;
