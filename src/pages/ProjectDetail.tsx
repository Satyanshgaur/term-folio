import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { projects } from '../data/projects';

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const project = projects.find(p => p.id === id);

  if (!project) {
    return (
      <div className="pt-32 px-margin-desktop text-center font-mono">
        <p className="text-syntax-purple mb-8 uppercase tracking-widest">[ 404_SYSTEM_NOT_FOUND ]</p>
        <Link to="/" className="text-syntax-blue hover:underline uppercase text-xs">Return to Workspace</Link>
      </div>
    );
  }

  return (
    <div className="pt-32 px-margin-desktop max-w-5xl mx-auto pb-40 font-mono text-text-main/90">
      <Link to="/" className="text-syntax-blue hover:underline flex items-center gap-2 mb-16 uppercase text-[10px] tracking-[0.3em] font-bold">
        <span className="material-symbols-outlined text-[18px]">terminal</span>
        Return to Workspace
      </Link>
      
      <div className="space-y-16 animate-fade-in">
        <div className="space-y-6 border-l-2 border-syntax-blue pl-8">
          <div className="flex items-center gap-4 text-[10px] opacity-40 uppercase tracking-[0.4em] font-bold">
            <span>System_Artifact</span>
            <span className="h-px w-12 bg-border-glass"></span>
            <span>Ref: {project.id}</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-text-main uppercase tracking-tighter">{project.title}</h1>
          <p className="text-xl md:text-2xl text-text-main/50 font-light max-w-3xl leading-relaxed">{project.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Main Visual Display Area */}
          <div className="md:col-span-2 aspect-video w-full rounded-2xl border border-border-glass overflow-hidden relative group bg-black/40 shadow-2xl backdrop-blur-md">
            {project.image ? (
              <div className="w-full h-full relative">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-deep/90 via-transparent to-transparent pointer-events-none"></div>
                <div className="absolute top-4 left-4 px-3 py-1 bg-black/70 backdrop-blur-md border border-white/10 rounded text-[10px] font-mono text-syntax-blue uppercase tracking-widest font-bold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-syntax-blue animate-pulse"></span>
                  HIGH_RES_SNAPSHOT // {project.id}
                </div>
              </div>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-12 relative overflow-hidden group-hover:bg-white/5 transition-colors">
                <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 opacity-[0.03] pointer-events-none">
                  {[...Array(64)].map((_, i) => <div key={i} className="border border-text-main"></div>)}
                </div>
                <span className="material-symbols-outlined text-8xl text-text-main/10 group-hover:text-syntax-blue/20 transition-all scale-110">hub</span>
                <p className="mt-8 text-[11px] uppercase tracking-[0.4em] text-text-main/30 font-bold">[ System_Architecture_Layer ]</p>
              </div>
            )}
          </div>

          <div className="space-y-10">
            <div className="p-8 border border-border-glass bg-panel-glass rounded-2xl space-y-6">
              <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-syntax-yellow opacity-60">PERFORMANCE</h4>
              <div className="space-y-4">
                {project.metrics.map((m, i) => (
                  <div key={i} className="flex justify-between items-center border-b border-white/5 pb-2">
                    <span className="text-[10px] uppercase text-text-main/40 font-bold">{m.label}</span>
                    <span className="text-syntax-green font-bold text-xs">{m.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-syntax-blue opacity-60">STACK_PROFILE</h4>
              <div className="flex flex-wrap gap-2">
                {project.stack.map(s => (
                  <span key={s} className="px-2 py-1 bg-white/5 border border-border-glass rounded text-[10px] text-text-main/70 uppercase tracking-tight">{s}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="md:col-span-2 space-y-12">
            <div className="space-y-6">
              <h2 className="text-[11px] font-bold text-text-main uppercase tracking-[0.4em] flex items-center gap-4">
                 <span className="w-8 h-px bg-syntax-purple/30"></span> DESIGN_MANIFESTO
              </h2>
              <div className="prose prose-invert max-w-none prose-sm leading-relaxed text-text-main/70 italic text-lg border-l-2 border-border-glass/30 pl-8">
                 "{project.engineeringLog}"
              </div>
            </div>

            <div className="space-y-6">
               <h2 className="text-[11px] font-bold text-text-main uppercase tracking-[0.4em] flex items-center gap-4">
                  <span className="w-8 h-px bg-syntax-green/30"></span> CORE_CAPABILITIES
               </h2>
               <ul className="space-y-4 font-mono text-sm text-text-main/60">
                  {project.features.map((f, i) => (
                    <li key={i} className="flex gap-6">
                       <span className="text-syntax-purple font-bold tracking-widest">0{i+1}.</span>
                       <span className="leading-relaxed">{f}</span>
                    </li>
                  ))}
               </ul>
            </div>
          </div>
          
          <div className="space-y-8">
             <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-text-main/30">ARTIFACT_ACCESS</h4>
             <div className="flex flex-col gap-4">
                <a href={project.githubUrl || "#"} className="flex items-center justify-between p-5 bg-white/5 border border-border-glass rounded-xl hover:border-syntax-purple/50 group transition-all backdrop-blur-sm">
                   <span className="text-[11px] font-bold uppercase tracking-[0.3em]">Source_Code</span>
                   <span className="material-symbols-outlined text-[20px] text-syntax-purple opacity-40 group-hover:opacity-100">code</span>
                </a>
                <a href={project.demoUrl || "#"} className="flex items-center justify-between p-5 bg-white/5 border border-border-glass rounded-xl hover:border-syntax-blue/50 group transition-all backdrop-blur-sm">
                   <span className="text-[11px] font-bold uppercase tracking-[0.3em]">Live_Manifest</span>
                   <span className="material-symbols-outlined text-[20px] text-syntax-blue opacity-40 group-hover:opacity-100">open_in_new</span>
                </a>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
