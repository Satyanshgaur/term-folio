import React from 'react';
import { Link } from 'react-router-dom';

interface ProjectsModalProps {
  onClose: () => void;
}

const ProjectsModal: React.FC<ProjectsModalProps> = ({ onClose }) => {
  const projects = [
    {
      id: 'graphrag',
      title: 'GraphRAG Engine',
      description: 'High-performance knowledge graph reasoning system for LLMs.',
      type: 'AI_Infra',
      color: '#00ff41',
      icon: 'memory'
    },
    {
      id: 'satellite',
      title: 'Satellite Optimizer',
      description: 'Real-time link budget optimizer for LEO constellations.',
      type: 'Systems',
      color: '#00ff41',
      icon: 'settings_input_antenna'
    },
    {
      id: 'portfolio-os',
      title: 'Portfolio OS',
      description: 'Vite-based shell environment for performance engineering showcasing.',
      type: 'Shell',
      color: '#00ff41',
      icon: 'terminal'
    }
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm animate-fade-in font-mono">
      <div className="glass-modal w-full max-w-5xl max-h-[85vh] rounded flex flex-col overflow-hidden shadow-2xl border-[#00ff41]/30">
        <div className="h-12 bg-[#00ff41]/10 flex items-center px-6 justify-between border-b border-[#00ff41]/20">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[#00ff41] text-[20px]">database</span>
            <span className="text-[10px] text-[#00ff41] uppercase tracking-[0.2em]">System_Archive // Selected_Projects</span>
          </div>
          <button 
            className="w-8 h-8 flex items-center justify-center hover:bg-[#00ff41]/20 transition-colors group"
            onClick={onClose}
          >
            <span className="material-symbols-outlined text-[18px] text-[#00ff41]/60 group-hover:text-[#00ff41]">close</span>
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-12 terminal-scroll bg-black/40">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div key={project.id} className="project-card p-6 rounded border border-[#00ff41]/10 bg-[#00ff41]/5 flex flex-col group">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-10 h-10 rounded border border-[#00ff41]/20 flex items-center justify-center group-hover:border-[#00ff41]/50 transition-colors">
                    <span className="material-symbols-outlined text-[#00ff41] opacity-70 group-hover:opacity-100">{project.icon}</span>
                  </div>
                  <span className="text-[9px] uppercase tracking-widest px-2 py-0.5 border border-[#00ff41]/30 text-[#00ff41]/60">{project.type}</span>
                </div>
                <div className="space-y-4 flex-1 flex flex-col">
                  <div>
                    <h3 className="text-xl font-bold text-white uppercase tracking-tight group-hover:text-[#00ff41] transition-colors">{project.title}</h3>
                    <p className="text-xs text-on-surface-variant leading-relaxed opacity-70 mt-2">{project.description}</p>
                  </div>
                  <div className="mt-auto pt-6 flex flex-wrap gap-4 text-[10px] uppercase tracking-widest border-t border-[#00ff41]/5">
                    <Link to={`/projects/${project.id}`} className="text-[#00ff41] hover:underline underline-offset-4 flex items-center gap-1">
                      Analyze
                    </Link>
                    <a href="#" className="text-white hover:underline underline-offset-4 opacity-50 hover:opacity-100 transition-opacity">
                      GitHub
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="px-8 py-4 bg-black border-t border-[#00ff41]/10 flex justify-between items-center text-[10px] text-[#00ff41]/40 uppercase tracking-widest">
          <div>Archive_Integrity: 100% Verified</div>
          <div className="flex gap-2 items-center">
            <span className="w-2 h-2 rounded-full bg-[#00ff41] animate-pulse"></span>
            Ready
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsModal;
