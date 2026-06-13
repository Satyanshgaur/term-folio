import React from 'react';
import { Link } from 'react-router-dom';
import { projects } from '../data/projects';
import { blogs } from '../data/blogs';

const StaticView: React.FC = () => {
  return (
    <div className="max-w-6xl w-full mx-auto px-margin-desktop py-24 space-y-32 overflow-y-auto max-h-screen terminal-scroll pb-40">
      {/* Profile Section */}
      <section className="space-y-12 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-border-glass pb-12">
          <div className="flex items-center gap-8">
            <div className="w-24 h-24 rounded-2xl border border-border-glass bg-white/5 flex items-center justify-center backdrop-blur-2xl shadow-xl">
              <span className="material-symbols-outlined text-5xl text-syntax-blue opacity-80">memory</span>
            </div>
            <div>
              <h1 className="text-5xl font-bold text-text-main tracking-tighter uppercase mb-2">Satyansh Gaur</h1>
              <p className="text-syntax-purple font-mono text-sm tracking-[0.3em] uppercase opacity-70">AI Infrastructure Engineer // Systems Programmer</p>
            </div>
          </div>
          <div className="flex gap-4">
             <div className="px-4 py-2 bg-white/5 border border-border-glass rounded text-[10px] font-mono uppercase tracking-widest text-text-main/40">
                Lvl: Expert
             </div>
             <div className="px-4 py-2 bg-white/5 border border-border-glass rounded text-[10px] font-mono uppercase tracking-widest text-syntax-green/60">
                Status: Available
             </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="md:col-span-2 space-y-8">
            <h2 className="font-mono text-[11px] font-bold text-syntax-blue tracking-[0.4em] uppercase opacity-50 flex items-center gap-4">
              <span className="w-8 h-px bg-syntax-blue/30"></span> 01. INTEL
            </h2>
            <p className="text-2xl text-text-main/90 leading-relaxed font-light">
              Architecting <span className="text-syntax-blue font-medium">hardware-aware</span> software solutions for the next generation of AI scaling. 
            </p>
            <p className="text-text-main/50 text-base leading-relaxed max-w-2xl">
              Building high-performance infrastructure for AI inference and distributed systems. Focused on CUDA kernels, GPU architecture, and low-level performance engineering.
            </p>
          </div>
          <div className="space-y-8 p-8 bg-panel-glass border border-border-glass rounded-2xl shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity">
               <span className="material-symbols-outlined text-6xl">insights</span>
            </div>
            <h2 className="font-mono text-[11px] font-bold text-syntax-purple tracking-[0.4em] uppercase opacity-50 flex items-center gap-4">
               02. DOMAINS
            </h2>
            <ul className="space-y-4 font-mono text-[11px] uppercase tracking-widest text-text-main/70">
              <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-syntax-blue rounded-full shadow-[0_0_8px_rgba(130,170,255,0.8)]"></span> GPU Architecture</li>
              <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-syntax-purple rounded-full shadow-[0_0_8px_rgba(199,146,234,0.8)]"></span> CUDA / Triton Kernels</li>
              <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-syntax-green rounded-full shadow-[0_0_8px_rgba(195,232,141,0.8)]"></span> LLM Inference Engines</li>
              <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-syntax-yellow rounded-full shadow-[0_0_8_8px_rgba(255,203,107,0.8)]"></span> Linux Kernel Dev</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="space-y-16 animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <h2 className="font-mono text-[11px] font-bold text-syntax-blue tracking-[0.4em] uppercase opacity-50 flex items-center gap-4">
          <span className="w-8 h-px bg-syntax-blue/30"></span> 03. SYSTEM_ARCHIVE
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Link 
              key={project.id}
              to={`/projects/${project.id}`}
              className="group relative p-10 bg-panel-glass border border-border-glass rounded-2xl overflow-hidden hover:border-syntax-blue/30 transition-all hover:shadow-[0_0_40px_rgba(130,170,255,0.05)] flex flex-col"
            >
              <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-100 transition-all group-hover:text-syntax-blue transform translate-x-2 -translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0">
                <span className="material-symbols-outlined text-4xl">terminal</span>
              </div>
              <div className="relative z-10 space-y-6 flex-1 flex flex-col">
                <span className={`font-mono text-[10px] uppercase tracking-[0.3em] syntax-blue font-bold opacity-60`}>
                  // {project.tags[0]}
                </span>
                <div>
                  <h3 className="text-2xl font-bold text-text-main uppercase tracking-tight group-hover:text-text-main transition-colors mb-3">
                    {project.title}
                  </h3>
                  <p className="text-text-main/40 text-sm leading-relaxed">
                    {project.description}
                  </p>
                </div>
                <div className="mt-auto pt-8 flex items-center gap-3 text-[11px] font-mono uppercase tracking-[0.3em] text-syntax-blue opacity-40 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 font-bold">
                  Analyze_System <span className="material-symbols-outlined text-[16px]">arrow_right_alt</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Blogs Section */}
      <section className="space-y-16 animate-fade-in" style={{ animationDelay: '0.4s' }}>
        <div className="flex items-center justify-between border-b border-border-glass pb-8">
           <h2 className="font-mono text-[11px] font-bold text-syntax-purple tracking-[0.4em] uppercase opacity-50 flex items-center gap-4">
             <span className="w-8 h-px bg-syntax-purple/30"></span> 04. RESEARCH_JOURNAL
           </h2>
        </div>
        <div className="space-y-2">
          {blogs.map((blog) => (
            <Link 
              key={blog.id}
              to={`/blog/${blog.id}`}
              className="flex items-center justify-between p-8 bg-transparent border-b border-border-glass/30 hover:bg-white/5 transition-all group rounded-lg"
            >
              <div className="flex items-center gap-16">
                <span className="font-mono text-[11px] text-syntax-comment tracking-[0.2em] w-24 opacity-60 group-hover:opacity-100 transition-opacity">{blog.date}</span>
                <span className="text-xl text-text-main/80 font-medium group-hover:text-syntax-purple transition-colors uppercase tracking-tight">
                  {blog.title}
                </span>
              </div>
              <div className="flex items-center gap-4">
                 <span className="text-[10px] font-mono uppercase tracking-widest text-text-main/20 group-hover:text-syntax-purple opacity-0 group-hover:opacity-100 transition-all">Read_Report</span>
                 <span className="material-symbols-outlined text-text-main/10 group-hover:text-syntax-purple transition-all group-hover:translate-x-2">trending_flat</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default StaticView;
