import { useState, useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import Today from './pages/Today';
import BrainDump from './pages/BrainDump';
import WeekView from './pages/WeekView';
import EndOfDay from './pages/EndOfDay';

type View = 'today' | 'braindump' | 'week' | 'endofday';

function App() {
  const [currentView, setCurrentView] = useState<View>('today');
  const [showEndOfDay, setShowEndOfDay] = useState(false);

  // Check if it's evening and show end of day prompt
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 20 && !showEndOfDay) {
      // Show subtle prompt for end of day review
    }
  }, [showEndOfDay]);

  const renderView = () => {
    switch (currentView) {
      case 'today':
        return <Today onNavigate={setCurrentView} />;
      case 'braindump':
        return <BrainDump onBack={() => setCurrentView('today')} />;
      case 'week':
        return <WeekView onBack={() => setCurrentView('today')} />;
      case 'endofday':
        return <EndOfDay onComplete={() => setCurrentView('today')} />;
      default:
        return <Today onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-background font-body">
      <Toaster />
      
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-lg mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-display font-semibold text-foreground">
              Anchor
            </h1>
            <nav className="flex items-center gap-2">
              <button
                onClick={() => setCurrentView('today')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  currentView === 'today' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Today
              </button>
              <button
                onClick={() => setCurrentView('week')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  currentView === 'week' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Week
              </button>
              <button
                onClick={() => setCurrentView('endofday')}
                className="px-3 py-1.5 rounded-lg text-sm font-medium bg-secondary text-secondary-foreground hover:opacity-90 transition-opacity"
              >
                End Day
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-lg mx-auto px-4 py-6 pb-24">
        {renderView()}
      </main>

      {/* Floating Brain Dump Button - always visible except on brain dump page */}
      {currentView !== 'braindump' && (
        <button
          onClick={() => setCurrentView('braindump')}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-transform completion-ring"
          aria-label="Quick capture"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      )}
    </div>
  );
}

export default App;
