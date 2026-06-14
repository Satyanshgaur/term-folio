import React from 'react';
import { Link } from 'react-router-dom';

interface NavigationProps {
  isTerminalMode?: boolean;
  onToggleView?: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ isTerminalMode, onToggleView }) => {
  return (
    <header 
      id="main-nav"
      className="w-full h-16 flex justify-between items-center px-4 sm:px-margin-desktop bg-surface-glass backdrop-blur-xl border-b border-border-glass"
    >
      <div className="flex items-center gap-2 sm:gap-6">
        <div className="hidden xs:flex gap-1 sm:gap-2 mr-2">
          <div className="w-2.5 h-2.5 rounded-full traffic-light-red opacity-80"></div>
          <div className="w-2.5 h-2.5 rounded-full traffic-light-yellow opacity-80"></div>
          <div className="w-2.5 h-2.5 rounded-full traffic-light-green opacity-80"></div>
        </div>

        <Link to="/" className="flex items-center gap-2 px-2 sm:px-3 py-1.5 rounded bg-white/5 border border-border-glass hover:bg-white/10 transition-all cursor-pointer">
          <span className="material-symbols-outlined text-syntax-blue text-[18px]">
            {isTerminalMode ? 'terminal' : 'visibility'}
          </span>
          <span className="hidden sm:inline font-mono text-[10px] uppercase tracking-widest text-text-main/70">
            {isTerminalMode ? 'workspace.sh' : 'dashboard.gui'}
          </span>
        </Link>

        {onToggleView && (
          <button 
            onClick={(e) => {
              e.preventDefault();
              onToggleView();
            }}
            className="flex items-center gap-2 px-2 sm:px-3 py-1.5 rounded bg-syntax-blue/10 border border-syntax-blue/20 text-syntax-blue hover:bg-syntax-blue/20 transition-all font-mono text-[10px] uppercase tracking-wider cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">
              {isTerminalMode ? 'grid_view' : 'terminal'}
            </span>
            <span className="hidden xs:inline">{isTerminalMode ? 'GUI' : 'Shell'}</span>
          </button>
        )}
      </div>

      <h1 className="font-mono text-sm font-medium tracking-tight text-text-main/40 uppercase hidden lg:block">
        <Link to="/" className="hover:text-text-main transition-colors">Satyansh Gaur <span className="font-light">// AI INFRASTRUCTURE</span></Link>
      </h1>

      <div className="flex items-center gap-3 sm:gap-6">
        <div className="flex gap-2 sm:gap-4">
          <a 
            href="https://github.com/satyanshgaur" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-text-main/50 hover:text-syntax-purple transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">terminal</span>
          </a>
          <a 
            href="https://www.linkedin.com/in/satyansh-gaur-2b1b05370" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-text-main/50 hover:text-syntax-blue transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">public</span>
          </a>
        </div>
        <button 
          onClick={() => window.location.href = 'mailto:satyanshgaur0@gmail.com'}
          className="px-3 sm:px-4 py-1.5 bg-syntax-purple/20 text-syntax-purple border border-syntax-purple/30 font-mono text-[11px] uppercase tracking-widest hover:bg-syntax-purple/30 transition-all rounded"
        >
          <span className="hidden sm:inline">Resume</span>
          <span className="sm:hidden material-symbols-outlined text-[18px]">description</span>
        </button>
      </div>
    </header>
  );
};
export default Navigation;
