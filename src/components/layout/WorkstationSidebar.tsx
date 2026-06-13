import React, { useState, useEffect } from 'react';

const WorkstationSidebar: React.FC = () => {
  const [gpuLoad, setGpuLoad] = useState(71);
  const [ramLoad, setRamLoad] = useState(14.2);

  useEffect(() => {
    const interval = setInterval(() => {
      setGpuLoad(prev => Math.min(95, Math.max(40, prev + (Math.random() - 0.5) * 5)));
      setRamLoad(prev => Math.min(16, Math.max(8, prev + (Math.random() - 0.5) * 0.2)));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <aside className="w-80 h-full bg-surface-glass border-l border-border-glass p-8 flex flex-col gap-12 font-mono overflow-y-auto terminal-scroll">
      {/* System Monitor */}
      <section className="space-y-6">
        <h3 className="text-[10px] font-bold text-text-main/30 uppercase tracking-[0.3em] flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-syntax-blue animate-pulse"></span>
          System_Monitor
        </h3>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-[11px] uppercase tracking-widest">
              <span className="text-text-main/60">GPU_Utilization</span>
              <span className="text-syntax-yellow font-bold">{gpuLoad.toFixed(0)}%</span>
            </div>
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-border-glass">
              <div 
                className="h-full bg-syntax-blue transition-all duration-1000 ease-in-out shadow-[0_0_10px_rgba(130,170,255,0.5)]" 
                style={{ width: `${gpuLoad}%` }}
              ></div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-[11px] uppercase tracking-widest">
              <span className="text-text-main/60">VRAM_Usage</span>
              <span className="text-syntax-purple font-bold">{ramLoad.toFixed(1)} GB</span>
            </div>
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-border-glass">
              <div 
                className="h-full bg-syntax-purple transition-all duration-1000 ease-in-out shadow-[0_0_10px_rgba(199,146,234,0.5)]" 
                style={{ width: `${(ramLoad / 16) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </section>

      {/* Current Focus */}
      <section className="space-y-4">
        <h3 className="text-[10px] font-bold text-text-main/30 uppercase tracking-[0.3em]">Current_Focus</h3>
        <div className="p-4 bg-white/5 border border-border-glass rounded-lg space-y-2">
          <p className="text-xs text-text-main font-medium uppercase tracking-tight">Triton Kernels</p>
          <p className="text-[10px] text-text-main/40 leading-relaxed italic">
            Optimizing memory coalescing for irregular graph access patterns.
          </p>
        </div>
      </section>

      {/* Session Metadata */}
      <section className="space-y-6">
        <h3 className="text-[10px] font-bold text-text-main/30 uppercase tracking-[0.3em]">Instance_Metadata</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center border-b border-border-glass/30 pb-2">
            <span className="text-[10px] uppercase text-text-main/40 tracking-widest">Status</span>
            <span className="text-[10px] uppercase text-syntax-green font-bold tracking-widest">Available</span>
          </div>
          <div className="flex justify-between items-center border-b border-border-glass/30 pb-2">
            <span className="text-[10px] uppercase text-text-main/40 tracking-widest">Location</span>
            <span className="text-[10px] uppercase text-text-main/80 font-bold tracking-widest">India</span>
          </div>
          <div className="flex justify-between items-center border-b border-border-glass/30 pb-2">
            <span className="text-[10px] uppercase text-text-main/40 tracking-widest">Uptime</span>
            <span className="text-[10px] uppercase text-text-main/80 font-bold tracking-widest tracking-tighter">99.9%</span>
          </div>
        </div>
      </section>

      {/* Latest Artifact */}
      <section className="mt-auto">
        <div className="p-4 border border-syntax-blue/20 bg-syntax-blue/5 rounded-lg">
          <span className="text-[9px] uppercase tracking-widest text-syntax-blue font-bold block mb-2">Latest_Build</span>
          <p className="text-[11px] text-text-main/80 font-medium">GraphRAG_Engine v2.4.0</p>
          <div className="flex items-center gap-2 mt-2">
             <span className="w-1.5 h-1.5 rounded-full bg-syntax-green"></span>
             <span className="text-[9px] uppercase text-text-main/40 tracking-widest font-mono">Passing Checks</span>
          </div>
        </div>
      </section>
    </aside>
  );
};

export default WorkstationSidebar;
