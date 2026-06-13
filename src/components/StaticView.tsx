import React from 'react';
import { Link } from 'react-router-dom';

const StaticView: React.FC = () => {
  const projects = [
    { 
      id: 'graphrag', 
      title: 'GraphRAG Engine', 
      tag: 'C++ / CUDA', 
      color: 'syntax-blue',
      desc: 'High-performance knowledge graph reasoning system for LLMs. Optimized for massive parallel traversal.'
    },
    { 
      id: 'satellite', 
      title: 'Satellite Optimizer', 
      tag: 'Rust / Wasm', 
      color: 'syntax-green',
      desc: 'Real-time link budget optimizer for LEO constellations. Low-latency performance engineering.'
    },
    { 
      id: 'portfolio-os', 
      title: 'Portfolio OS', 
      tag: 'React / TS', 
      color: 'syntax-purple',
      desc: 'System-themed shell environment for showcasing AI infrastructure and systems programming projects.'
    },
  ];

  const blogs = [
    { id: 'hpc-kernels', title: 'Writing Custom HPC Kernels', date: 'FEB 2026' },
    { id: 'cuda-perf', title: 'CUDA Memory Hierarchy Optimization', date: 'JAN 2026' },
  ];

  return (
    <div className="max-w-5xl w-full mx-auto px-margin-desktop py-24 space-y-24 overflow-y-auto max-h-screen terminal-scroll pb-32">
      {/* Profile Section */}
      <section className="space-y-8 animate-fade-in">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 rounded border border-border-glass bg-white/5 flex items-center justify-center backdrop-blur-md">
            <span className="material-symbols-outlined text-4xl text-syntax-blue">memory</span>
          </div>
          <div>
            <h1 className="text-4xl font-bold text-text-main tracking-tighter uppercase">Satyansh Gaur</h1>
            <p className="text-syntax-purple font-mono text-xs tracking-[0.2em] uppercase opacity-70">AI Infrastructure Engineer // Systems Programmer</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-12">
          <div className="md:col-span-2 space-y-6">
            <h2 className="font-mono text-[10px] font-bold text-syntax-blue tracking-[0.3em] uppercase opacity-60">[ 01. INTEL ]</h2>
            <p className="text-xl text-text-main leading-relaxed font-light">
              Architecting <span className="text-syntax-blue font-medium">high-performance kernels</span> and distributed systems for the next generation of AI workloads. 
            </p>
            <p className="text-text-main/60 text-sm leading-relaxed max-w-xl">
              My work focuses on pushing the boundaries of hardware utilization. From CUDA optimization to Linux kernel tuning, I build the infrastructure that powers large-scale inference and complex reasoning engines.
            </p>
          </div>
          <div className="space-y-6 p-6 bg-white/5 border border-border-glass rounded-lg backdrop-blur-sm">
            <h2 className="font-mono text-[10px] font-bold text-syntax-purple tracking-[0.3em] uppercase opacity-60">[ 02. FOCUS ]</h2>
            <ul className="space-y-3 font-mono text-[10px] uppercase tracking-widest text-text-main/70">
              <li className="flex items-center gap-2"><span className="w-1 h-1 bg-syntax-blue rounded-full"></span> GPU Architecture</li>
              <li className="flex items-center gap-2"><span className="w-1 h-1 bg-syntax-blue rounded-full"></span> CUDA / Triton</li>
              <li className="flex items-center gap-2"><span className="w-1 h-1 bg-syntax-blue rounded-full"></span> LLM Inference</li>
              <li className="flex items-center gap-2"><span className="w-1 h-1 bg-syntax-blue rounded-full"></span> Linux Kernel</li>
              <li className="flex items-center gap-2"><span className="w-1 h-1 bg-syntax-blue rounded-full"></span> Modern C++ / Rust</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="space-y-12 animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <h2 className="font-mono text-[10px] font-bold text-syntax-blue tracking-[0.3em] uppercase opacity-60">[ 03. SYSTEM_ARCHIVE ]</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <Link 
              key={project.id}
              to={`/projects/${project.id}`}
              className="group relative p-8 bg-white/5 border border-border-glass rounded-xl overflow-hidden hover:border-text-main/20 transition-all backdrop-blur-sm"
            >
              <div className="relative z-10 space-y-4">
                <span className={`font-mono text-[9px] uppercase tracking-[0.2em] ${project.color} font-bold`}>
                  {project.tag}
                </span>
                <h3 className="text-2xl font-bold text-text-main uppercase tracking-tight group-hover:text-syntax-blue transition-colors">
                  {project.title}
                </h3>
                <p className="text-text-main/50 text-xs leading-relaxed">
                  {project.desc}
                </p>
                <div className="pt-4 flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-syntax-blue opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                  Analyze System <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Blogs Section */}
      <section className="space-y-12 animate-fade-in" style={{ animationDelay: '0.4s' }}>
        <h2 className="font-mono text-[10px] font-bold text-syntax-purple tracking-[0.3em] uppercase opacity-60">[ 04. RESEARCH_JOURNAL ]</h2>
        <div className="space-y-4">
          {blogs.map((blog) => (
            <Link 
              key={blog.id}
              to={`/blog/${blog.id}`}
              className="flex items-center justify-between p-6 bg-white/5 border border-transparent rounded-lg hover:border-border-glass hover:bg-white/10 transition-all group"
            >
              <div className="flex items-center gap-12">
                <span className="font-mono text-[10px] text-syntax-comment tracking-widest w-20">{blog.date}</span>
                <span className="text-base text-text-main font-medium group-hover:text-syntax-purple transition-colors uppercase tracking-tight">
                  {blog.title}
                </span>
              </div>
              <span className="material-symbols-outlined text-text-main/20 group-hover:text-syntax-purple transition-all group-hover:translate-x-1">arrow_right_alt</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default StaticView;
