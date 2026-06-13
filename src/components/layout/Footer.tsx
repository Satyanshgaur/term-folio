import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer 
      id="global-footer"
      className="w-full h-12 flex justify-between items-center px-margin-desktop bg-surface-glass backdrop-blur-xl border-t border-border-glass font-mono text-[10px]"
    >
      <div className="text-text-main/30 tracking-[0.2em] uppercase">
        [ SYSTEM_STATUS: NOMINAL ] // © {new Date().getFullYear()} SATYANSH GAUR
      </div>
      <div className="flex gap-8">
        <a 
          href="https://github.com/satyansh-gaur" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-text-main/40 hover:text-syntax-blue transition-colors uppercase tracking-widest"
        >
          GitHub
        </a>
        <a 
          href="#" 
          className="text-text-main/40 hover:text-syntax-purple transition-colors uppercase tracking-widest"
        >
          LinkedIn
        </a>
        <a 
          href="#" 
          className="text-text-main/40 hover:text-syntax-green transition-colors uppercase tracking-widest"
        >
          X_Twitter
        </a>
      </div>
    </footer>
  );
};

export default Footer;
