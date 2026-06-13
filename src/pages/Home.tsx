import React, { useState } from 'react';
import EntranceScreen from '../components/EntranceScreen';
import Terminal from '../components/Terminal/Terminal';
import ProjectsModal from '../components/ProjectsModal';
import StaticView from '../components/StaticView';

interface HomeProps {
  onEnter: () => void;
  hasEntered: boolean;
  isTerminalMode: boolean;
  onToggleTerminal: (val: boolean) => void;
}

const Home: React.FC<HomeProps> = ({ onEnter, hasEntered, isTerminalMode, onToggleTerminal }) => {
  const [isExiting, setIsExiting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEnter = (isTerminal: boolean) => {
    setIsExiting(true);
    onToggleTerminal(isTerminal);
    setTimeout(() => {
      onEnter();
    }, 1000);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {!hasEntered && (
        <EntranceScreen onEnter={handleEnter} isExiting={isExiting} />
      )}

      {hasEntered && isTerminalMode && (
        <div className="h-full w-full animate-fade-in pt-16">
          <Terminal 
            onOpenModal={() => setIsModalOpen(true)}
          />
        </div>
      )}

      {hasEntered && !isTerminalMode && (
        <div className="h-full w-full pt-16">
          <StaticView />
        </div>
      )}


      {isModalOpen && (
        <ProjectsModal onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default Home;
