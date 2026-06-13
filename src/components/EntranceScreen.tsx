import React from 'react';

interface EntranceScreenProps {
  onEnter: (isTerminal: boolean) => void;
  isExiting: boolean;
}

const EntranceScreen: React.FC<EntranceScreenProps> = ({ onEnter, isExiting }) => {
  return (
    <section 
      id="entrance-screen" 
      className={`fixed inset-0 bg-bg-deep flex flex-col items-center justify-center text-center z-[100] transition-opacity duration-1000 ${
        isExiting ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="relative z-10 space-y-12">
        <div className="fade-in space-y-4">
          <div className="flex items-center justify-center gap-4 mb-2">
            <span className="h-px w-12 bg-syntax-blue/20"></span>
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-syntax-blue/50">Core_Environment_Load</span>
            <span className="h-px w-12 bg-syntax-blue/20"></span>
          </div>
          <h2 className="text-6xl font-bold text-text-main tracking-tighter uppercase">SATYANSH GAUR</h2>
          <p className="font-mono text-xs text-text-main/40 tracking-[0.2em] uppercase">AI Infrastructure // Systems Programming // HPC</p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8 items-center justify-center mt-12">
          <button 
            className="group relative px-10 py-4 bg-white/5 border border-border-glass rounded-lg overflow-hidden transition-all hover:border-syntax-purple/50 hover:bg-syntax-purple/5"
            onClick={() => onEnter(true)}
          >
            <span className="relative z-10 font-mono text-[11px] uppercase tracking-widest text-syntax-purple group-hover:text-text-main transition-colors">[ Initial_Shell ]</span>
          </button>
          
          <button 
            className="group relative px-10 py-4 bg-white/5 border border-border-glass rounded-lg overflow-hidden transition-all hover:border-syntax-blue/50 hover:bg-syntax-blue/5"
            onClick={() => onEnter(false)}
          >
            <span className="relative z-10 font-mono text-[11px] uppercase tracking-widest text-syntax-blue group-hover:text-text-main transition-colors">[ Load_GUI ]</span>
          </button>
        </div>

        <div className="pt-24 font-mono text-[9px] uppercase tracking-[0.3em] opacity-20">
          Precision Engineering // System v1.6.9
        </div>
      </div>
    </section>
  );
};

export default EntranceScreen;
