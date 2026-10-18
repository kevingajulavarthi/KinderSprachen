import React, { useState, useEffect } from 'react';
import { LearningProvider, useLearning } from './context/LearningContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { LessonPlayer } from './pages/LessonPlayer';
import { Alphabet } from './pages/Alphabet';
import { Vocabulary } from './pages/Vocabulary';
import { Games } from './pages/Games';
import { Stories } from './pages/Stories';
import { Speaking } from './pages/Speaking';
import { Achievements } from './pages/Achievements';
import { ParentDashboard } from './pages/ParentDashboard';
import { ParentGate } from './components/ParentGate';

function MainApp() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [activeLessonId, setActiveLessonId] = useState<string>('lesson-1');
  const [isParentGateOpen, setIsParentGateOpen] = useState(false);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const handleNavigate = (page: string, params?: { lessonId?: string }) => {
    if (params?.lessonId) {
      setActiveLessonId(params.lessonId);
    }
    setCurrentPage(page);
  };

  const handleStartLesson = (lessonId: string) => {
    setActiveLessonId(lessonId);
    setCurrentPage('lesson-player');
  };

  const handleNextLesson = (nextId: string) => {
    setActiveLessonId(nextId);
    setCurrentPage('lesson-player');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDF5] text-[#26354A]">
      {/* Top Bar Navigation */}
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {currentPage === 'home' && <Home onNavigate={handleNavigate} />}

        {currentPage === 'dashboard' && (
          <Dashboard
            onStartLesson={handleStartLesson}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'lessons' && (
          <Dashboard
            onStartLesson={handleStartLesson}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'lesson-player' && (
          <LessonPlayer
            lessonId={activeLessonId}
            onBackToMap={() => setCurrentPage('dashboard')}
            onNextLesson={handleNextLesson}
          />
        )}

        {currentPage === 'alphabet' && <Alphabet />}

        {currentPage === 'vocabulary' && <Vocabulary />}

        {currentPage === 'games' && <Games />}

        {currentPage === 'stories' && <Stories />}

        {currentPage === 'speaking' && <Speaking />}

        {currentPage === 'achievements' && <Achievements />}

        {currentPage === 'parent' && (
          <ParentDashboard
            onBackToApp={() => setCurrentPage('dashboard')}
            onNavigateToLesson={handleStartLesson}
          />
        )}
      </main>

      {/* Child-Safe Footer */}
      <Footer onOpenParent={() => setIsParentGateOpen(true)} />

      {/* Parent Gate from Footer */}
      <ParentGate
        isOpen={isParentGateOpen}
        onSuccess={() => {
          setIsParentGateOpen(false);
          setCurrentPage('parent');
        }}
        onClose={() => setIsParentGateOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <LearningProvider>
      <MainApp />
    </LearningProvider>
  );
}
