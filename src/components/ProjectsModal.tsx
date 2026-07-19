import React from 'react';
import { Link } from 'react-router-dom';
import { projects } from '../data/projects';
import Card3DTilt from './layout/Card3DTilt';

interface ProjectsModalProps {
  onClose: () => void;
}

const ProjectsModal: React.FC<ProjectsModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm animate-fade-in font-mono">
      <div className="glass-terminal w-full max-w-6xl max-h-[85vh] rounded-2xl flex flex-col overflow-hidden shadow-2xl">
        <div className="h-12 bg-white/5 flex items-center px-6 justify-between border-b border-border-glass">
          <div className="flex items-center gap-4">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full traffic-light-red cursor-pointer" onClick={onClose}></div>
              <div className="w-3 h-3 rounded-full traffic-light-yellow"></div>
              <div className="w-3 h-3 rounded-full traffic-light-green"></div>
            </div>
            <span className="text-[10px] text-text-main/40 uppercase tracking-[0.2em] ml-4">System_Archive // Visual_Manifest</span>
          </div>
          <button 
            className="w-8 h-8 flex items-center justify-center hover:bg-white/10 transition-colors group"
            onClick={onClose}
          >
            <span className="material-symbols-outlined text-[18px] text-text-main/40 group-hover:text-text-main">close</span>
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-12 terminal-scroll bg-black/20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Card3DTilt key={project.id} className="h-full">
                <div className="group relative p-6 bg-panel-glass border border-border-glass rounded-xl overflow-hidden hover:border-syntax-blue/40 transition-all flex flex-col h-full">
                  {/* Project Image Header */}
                  {project.image && (
                    <div className="w-full h-36 mb-4 rounded-lg overflow-hidden border border-border-glass/40 relative bg-black/40">
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-bg-deep/80 via-transparent to-transparent pointer-events-none"></div>
                    </div>
                  )}

                  <div className="relative z-10 space-y-4 flex-1 flex flex-col">
                    <div className="flex justify-between items-start">
                      <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-syntax-blue font-bold opacity-60">
                        // {project.tags[0]}
                      </span>
                      <span className="text-syntax-yellow font-bold text-[10px] uppercase tracking-widest">{project.metrics[0].value}</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-text-main uppercase tracking-tight group-hover:text-syntax-blue transition-colors mb-2">
                        {project.title}
                      </h3>
                      <p className="text-text-main/40 text-xs leading-relaxed line-clamp-3">
                        {project.description}
                      </p>
                    </div>
                    <div className="mt-auto pt-4 flex items-center justify-between border-t border-white/5">
                      <Link 
                        to={`/projects/${project.id}`} 
                        className="text-[10px] font-bold uppercase tracking-[0.2em] text-syntax-purple hover:underline underline-offset-4"
                        onClick={onClose}
                      >
                        Analyze
                      </Link>
                      <a href={project.githubUrl || "#"} className="text-text-main/30 hover:text-text-main">
                         <span className="material-symbols-outlined text-[18px]">code</span>
                      </a>
                    </div>
                  </div>
                </div>
              </Card3DTilt>
            ))}
          </div>
        </div>

        <div className="px-8 py-4 bg-black/40 border-t border-border-glass flex justify-between items-center text-[9px] text-text-main/20 uppercase tracking-[0.3em]">
          <div>Integrity_Check: 100% Secure</div>
          <div className="flex gap-4 items-center">
            <span>Buffer_Sync: OK</span>
            <span className="w-1.5 h-1.5 rounded-full bg-syntax-green animate-pulse"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsModal;
