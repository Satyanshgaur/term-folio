import React, { useState } from 'react';
import EntranceScreen from '../components/EntranceScreen';
import Terminal from '../components/Terminal/Terminal';
import StaticView from '../components/StaticView';
import WorkstationSidebar from '../components/layout/WorkstationSidebar';

interface HomeProps {
  onEnter: () => void;
  hasEntered: boolean;
  isTerminalMode: boolean;
  onToggleTerminal: (val: boolean) => void;
}

const Home: React.FC<HomeProps> = ({ onEnter, hasEntered, isTerminalMode, onToggleTerminal }) => {
  const [isExiting, setIsExiting] = useState(false);
  const [activeContextId, setActiveContextId] = useState<string | null>(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const handleEnter = (isTerminal: boolean) => {
    setIsExiting(true);
    onToggleTerminal(isTerminal);
    setTimeout(() => {
      onEnter();
    }, 1000);
  };

  return (
    <div className="w-full flex">
      {!hasEntered && (
        <EntranceScreen onEnter={handleEnter} isExiting={isExiting} />
      )}

      {hasEntered && (
        <>
          {/* Mobile Sidebar Toggle Button - Only visible on small screens */}
          <button 
            onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
            className="lg:hidden fixed bottom-20 right-6 z-[110] w-12 h-12 rounded-full bg-syntax-blue/20 border border-syntax-blue/40 flex items-center justify-center text-syntax-blue backdrop-blur-xl shadow-lg hover:bg-syntax-blue/30 transition-all active:scale-95"
            title="Toggle System Monitor"
          >
            <span className="material-symbols-outlined">{isMobileSidebarOpen ? 'close' : 'analytics'}</span>
          </button>

          <div className="flex-1 min-w-0 h-full relative">
            {isTerminalMode ? (
              <div className="h-full w-full animate-fade-in pt-16">
                <Terminal onActiveContextChange={setActiveContextId} />
              </div>
            ) : (
              <div className="h-full w-full pt-16 overflow-hidden">
                <StaticView />
              </div>
            )}
          </div>

          {/* Sidebar with Responsive Classes */}
          <div className={`
            fixed lg:relative inset-y-0 right-0 z-[105] lg:z-10
            transition-all duration-500 ease-in-out transform
            ${isMobileSidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
            lg:block
          `}>
            {/* Backdrop for mobile */}
            {isMobileSidebarOpen && (
              <div 
                className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-[-1]"
                onClick={() => setIsMobileSidebarOpen(false)}
              ></div>
            )}
            <WorkstationSidebar activeContextId={activeContextId} />
          </div>
        </>
      )}
    </div>
  );
};
export default Home;
