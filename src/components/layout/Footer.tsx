import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer 
      id="global-footer"
      className="w-full flex justify-between items-center px-margin-desktop py-4 border-t border-[#00ff41]/10 bg-black/60 backdrop-blur-md font-mono text-[10px]"
    >
      <div className="text-[#00ff41]/50 tracking-widest uppercase">
        [ PROCESS_STATUS: STABLE ] © {new Date().getFullYear()} SATYANSH GAUR
      </div>
      <div className="flex gap-8">
        <a 
          href="https://github.com/satyansh-gaur" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-[#00ff41]/50 hover:text-[#00ff41] transition-colors uppercase"
        >
          // GitHub
        </a>
        <a 
          href="#" 
          className="text-[#00ff41]/50 hover:text-[#00ff41] transition-colors uppercase"
        >
          // LinkedIn
        </a>
        <a 
          href="#" 
          className="text-[#00ff41]/50 hover:text-[#00ff41] transition-colors uppercase"
        >
          // X_Twitter
        </a>
      </div>
    </footer>
  );
};

export default Footer;
