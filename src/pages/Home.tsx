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

  const handleEnter = (isTerminal: boolean) => {
    setIsExiting(true);
    onToggleTerminal(isTerminal);
    setTimeout(() => {
      onEnter();
    }, 1000);
  };

  return (
    <div className="relative h-screen w-full flex overflow-hidden">
      {!hasEntered && (
        <EntranceScreen onEnter={handleEnter} isExiting={isExiting} />
      )}

      {hasEntered && (
        <>
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

          <div className={`transition-all duration-1000 transform ${hasEntered ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
            <WorkstationSidebar activeContextId={activeContextId} />
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
