import React, { useState, useEffect } from 'react';
import KnowledgeGraph from './KnowledgeGraph';

interface WorkstationSidebarProps {
  activeContextId?: string | null;
}

const WorkstationSidebar: React.FC<WorkstationSidebarProps> = ({ activeContextId }) => {
  // Persistence of custom sidebar width (default to 380px for a wider look)
  const [width, setWidth] = useState(() => {
    const saved = localStorage.getItem('sidebar-width');
    return saved ? parseInt(saved, 10) : 380;
  });

  const [isResizing, setIsResizing] = useState(false);
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== 'undefined' ? window.innerWidth >= 1024 : true
  );

  // Keep track of window resize to enable/disable resizing
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle resizing mouse events
  useEffect(() => {
    if (!isResizing) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Sidebar is on the right side of the viewport, so width grows as mouse moves left
      const newWidth = window.innerWidth - e.clientX;
      
      // Clamp between 320px and 700px, max 50% of viewport width
      const clampedWidth = Math.max(
        320,
        Math.min(700, Math.min(newWidth, window.innerWidth * 0.5))
      );
      
      setWidth(clampedWidth);
      localStorage.setItem('sidebar-width', clampedWidth.toString());
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing]);

  const startResizing = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
  };

  return (
    <aside 
      className="w-screen h-screen bg-bg-deep lg:bg-surface-glass border-l border-border-glass p-8 flex flex-col gap-12 font-mono overflow-y-auto terminal-scroll shadow-2xl sticky top-0 relative transition-shadow duration-300"
      style={{ 
        width: isDesktop ? `${width}px` : undefined,
        // Disable text selection and layout updates transitions while dragging
        transition: isResizing ? 'none' : undefined
      }}
    >
      {/* Draggable Resizer Handle - Left edge */}
      {isDesktop && (
        <div 
          onMouseDown={startResizing}
          className={`absolute left-0 top-0 w-1.5 h-full cursor-col-resize z-50 transition-colors duration-200 ${
            isResizing 
              ? 'bg-syntax-blue shadow-[0_0_12px_rgba(130,170,255,1)]' 
              : 'hover:bg-syntax-blue/20'
          }`}
          title="Drag to resize sidebar"
        />
      )}

      {/* Knowledge Graph */}
      <section>
        <KnowledgeGraph />
      </section>

      {/* Inspired By GraphMem */}
      <section className="space-y-4">
        <h3 className="text-[10px] font-bold text-text-main/50 uppercase tracking-[0.3em]">Graph_built_using</h3>
        <div className="p-4 bg-white/5 border border-border-glass rounded-lg space-y-2">
          <p className="text-xs text-text-main font-bold uppercase tracking-tight">RecalNet</p>
          <p className="text-xs text-text-main/80 leading-relaxed italic">
            Create local secure knowledge graphs for long term memory for LLM's.
          </p>
          <a 
            href="https://github.com/Satyanshgaur/RecalNet" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs text-syntax-blue font-bold hover:text-white hover:underline flex items-center gap-1 font-mono pt-1 w-fit transition-colors"
          >
            <span className="material-symbols-outlined text-xs">link</span>
            github.com/Satyanshgaur/RecalNet
          </a>
        </div>
      </section>

      {/* Checkout New Works */}
      <section className="space-y-4">
        <h3 className="text-[10px] font-bold text-text-main/50 uppercase tracking-[0.3em]">Checkout_New_Works</h3>
        <div className="p-4 bg-white/5 border border-border-glass rounded-lg space-y-2">
          <p className="text-xs text-text-main font-bold uppercase tracking-tight">Kaggle Dataset</p>
          <p className="text-xs text-text-main/80 leading-relaxed italic">
            Rain Prediction Training Dataset for ML models.
          </p>
          <a 
            href="https://www.kaggle.com/datasets/satyanshgaur1/rain-prediction-training-dataset" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs text-syntax-blue font-bold hover:text-white hover:underline flex items-center gap-1 font-mono pt-1 w-fit transition-colors"
          >
            <span className="material-symbols-outlined text-xs">database</span>
            kaggle.com/datasets/...
          </a>
        </div>
      </section>

      {/* Latest Artifact */}
      <section className="mt-auto">
        <div className="p-4 border border-syntax-blue/20 bg-syntax-blue/5 rounded-lg">
          <span className="text-xs uppercase tracking-widest text-syntax-blue font-bold block mb-2">Active_Session_Data</span>
          <p className="text-xs text-text-main/90 font-medium truncate uppercase tracking-tighter">
            {activeContextId || 'Default_Workspace'}
          </p>
          <div className="flex items-center gap-2 mt-2">
             <span className="w-1.5 h-1.5 rounded-full bg-syntax-green animate-pulse"></span>
             <span className="text-[10px] uppercase text-text-main/60 tracking-widest font-mono">Kernel Synchronized</span>
          </div>
        </div>
      </section>
    </aside>
  );
};

export default WorkstationSidebar;
