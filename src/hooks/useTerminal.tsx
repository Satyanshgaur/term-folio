import React, { useState, useCallback } from 'react';
import { projects } from '../data/projects';
import { blogs } from '../data/blogs';

export interface TerminalLine {
  type: 'input' | 'output' | 'error' | 'info';
  content: string | React.ReactNode;
}

export const useTerminal = () => {
  const [history, setHistory] = useState<TerminalLine[]>([
    { 
      type: 'output', 
      content: (
        <div className="space-y-4 mb-8">
          <p className="syntax-blue font-medium">Welcome to workspace.sh (Version 1.6.9)</p>
          <p className="text-text-main/60 italic">Type <span className="text-syntax-purple">'help'</span> to see available commands.</p>
          <div className="p-3 bg-white/5 border border-border-glass rounded max-w-fit">
            <p className="text-syntax-yellow text-xs font-bold uppercase tracking-widest">Featured_Release:</p>
            <p className="text-syntax-green text-sm">Satellite Link Optimizer // High-fidelity physics engine (Numba-accelerated)</p>
          </div>
        </div>
      ) 
    }
  ]);

  const addLine = useCallback((line: TerminalLine) => {
    setHistory((prev) => [...prev, line]);
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  const executeCommand = useCallback((cmd: string) => {
    const command = cmd.trim().toLowerCase();
    const args = command.split(' ');
    const mainCmd = args[0];

    if (!command) return;

    addLine({ type: 'input', content: command });

    switch (mainCmd) {
      case 'help':
        addLine({ 
          type: 'output', 
          content: (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-2 mt-2 opacity-80 text-sm">
              <div><span className="syntax-purple font-medium">who</span> <span className="opacity-40">- About me</span></div>
              <div><span className="syntax-purple font-medium">projects</span> <span className="opacity-40">- Selected works</span></div>
              <div><span className="syntax-purple font-medium">skills</span> <span className="opacity-40">- Tech stack</span></div>
              <div><span className="syntax-purple font-medium">resume</span> <span className="opacity-40">- PDF download</span></div>
              <div><span className="syntax-purple font-medium">contact</span> <span className="opacity-40">- Connectivity</span></div>
              <div><span className="syntax-purple font-medium">clear</span> <span className="opacity-40">- Clear buffer</span></div>
              <div><span className="syntax-purple font-medium">blogs</span> <span className="opacity-40">- Writeups</span></div>
              <div><span className="syntax-purple font-medium">project [id]</span> <span className="opacity-40">- System specs</span></div>
              <div><span className="syntax-purple font-medium">blog [id]</span> <span className="opacity-40">- Read journal</span></div>
            </div>
          )
        });
        break;

      case 'who':
      case 'whoami':
        addLine({
          type: 'output',
          content: (
            <div className="border border-border-glass p-6 rounded-lg bg-white/5 mt-4 max-w-2xl backdrop-blur-md">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded bg-syntax-blue/10 flex items-center justify-center border border-syntax-blue/20">
                  <span className="material-symbols-outlined text-[32px] text-syntax-blue">memory</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-text-main uppercase tracking-tighter">Satyansh Gaur</h3>
                  <p className="text-[10px] text-syntax-purple uppercase tracking-widest font-medium opacity-80">AI Infrastructure Engineer // Systems Programmer</p>
                </div>
              </div>
              <div className="space-y-4 text-sm leading-relaxed text-text-main/80">
                <p>
                  Architecting <span className="text-syntax-blue">high-performance kernels</span> and distributed systems for the next generation of AI workloads. Specialized in hardware-aware software optimization.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 border-t border-border-glass pt-4">
                  <div>
                    <span className="block text-[10px] uppercase opacity-40 mb-1 tracking-widest">Current Research</span>
                    <p className="text-text-main text-xs font-medium">GPU Architecture & CUDA Kernels</p>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase opacity-40 mb-1 tracking-widest">Focus Area</span>
                    <p className="text-text-main text-xs font-medium">LLM Inference & Kernel Fusion</p>
                  </div>
                </div>
              </div>
            </div>
          )
        });
        break;

      case 'skills':
        addLine({
          type: 'output',
          content: (
            <div className="space-y-6 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <h4 className="text-syntax-blue uppercase text-[10px] font-bold tracking-[0.2em] opacity-60">[ 01. SYSTEMS ]</h4>
                  <div className="flex flex-wrap gap-2">
                    {['Modern C++', 'Rust', 'Linux Kernel', 'CUDA', 'GPU Arch'].map(s => (
                      <span key={s} className="px-2 py-1 bg-white/5 border border-border-glass text-[10px] text-text-main/80 uppercase tracking-tight">{s}</span>
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="text-syntax-purple uppercase text-[10px] font-bold tracking-[0.2em] opacity-60">[ 02. AI_INFRA ]</h4>
                  <div className="flex flex-wrap gap-2">
                    {['vLLM', 'Triton', 'TensorRT', 'PyTorch', 'Model Quant'].map(s => (
                      <span key={s} className="px-2 py-1 bg-white/5 border border-border-glass text-[10px] text-text-main/80 uppercase tracking-tight">{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )
        });
        break;

      case 'projects':
        addLine({
          type: 'output',
          content: (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 max-w-5xl">
              {projects.map(p => (
                <div key={p.id} className="p-8 rounded-2xl border border-border-glass bg-white/5 backdrop-blur-sm group hover:border-syntax-blue/30 transition-all flex flex-col gap-6 shadow-2xl relative overflow-hidden">
                  <div className="flex justify-between items-start relative z-10">
                    <h3 className="text-3xl font-bold text-text-main uppercase tracking-tighter">{p.title}</h3>
                    <div className="text-right">
                      <span className="block text-[9px] uppercase tracking-widest text-text-main/40 mb-1">{p.metrics[0].label}</span>
                      <span className="text-syntax-yellow font-bold text-sm tracking-tight">{p.metrics[0].value}</span>
                    </div>
                  </div>
                  <p className="text-text-main/50 text-base leading-relaxed max-w-sm relative z-10">{p.description}</p>
                  <div className="mt-auto pt-6 border-t border-border-glass/30 flex items-center justify-between relative z-10">
                    <div className="flex gap-3">
                      {p.tags.map(t => (
                        <span key={t} className="px-2 py-0.5 bg-white/5 border border-border-glass text-[9px] uppercase tracking-widest font-bold text-text-main/60">
                          {t}
                        </span>
                      ))}
                    </div>
                    <button 
                      onClick={() => executeCommand(`project ${p.id}`)}
                      className="text-[11px] font-bold uppercase tracking-[0.2em] text-syntax-blue hover:underline underline-offset-8"
                    >
                      SPEC_ANALYSIS &gt;
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )
        });
        break;

      case 'project': {
        const projectId = args[1];
        const project = projects.find(p => p.id === projectId);
        if (!projectId || !project) {
          addLine({ type: 'error', content: `Usage: project [id]. Available IDs: ${projects.map(p => p.id).join(', ')}` });
        } else {
          addLine({
            type: 'output',
            content: (
              <div className="mt-12 space-y-12 max-w-5xl animate-fade-in pb-20">
                <div className="space-y-4 border-l-2 border-syntax-blue pl-8">
                  <span className="text-[10px] uppercase tracking-[0.4em] text-text-main/30 font-bold">System_Artifact // {project.id}</span>
                  <h2 className="text-5xl font-bold text-text-main uppercase tracking-tighter">{project.title}</h2>
                  <p className="text-xl text-text-main/60 font-light">{project.subtitle}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-8">
                    <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-syntax-blue opacity-60">FEATURES</h4>
                    <ul className="space-y-4 font-mono text-sm text-text-main/80">
                      {project.features.map((f, i) => (
                        <li key={i} className="flex gap-4">
                          <span className="text-syntax-purple">0{i+1}.</span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-8">
                    <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-syntax-yellow opacity-60">PERFORMANCE_BENCHMARKS</h4>
                    <div className="space-y-6 p-8 bg-panel-glass border border-border-glass rounded-2xl">
                       {project.metrics.map((m, i) => (
                         <div key={i} className="space-y-3">
                            <div className="flex justify-between text-[10px] uppercase tracking-widest text-text-main/50 font-bold">
                               <span>{m.label}</span>
                               <span className="text-syntax-green">{m.value}</span>
                            </div>
                            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-border-glass">
                               <div className={`h-full ${i % 2 === 0 ? 'bg-syntax-yellow' : 'bg-syntax-blue'} w-[85%] shadow-[0_0_15px_rgba(130,170,255,0.3)]`}></div>
                            </div>
                         </div>
                       ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                   <div className="md:col-span-2 space-y-6">
                      <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-text-main/40">[ ENGINEERING_LOG ]</h4>
                      <div className="prose prose-invert max-w-none">
                         <p className="text-text-main/70 leading-relaxed italic text-base">
                            "{project.engineeringLog}"
                         </p>
                      </div>
                   </div>
                   <div className="space-y-6">
                      <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-text-main/40">[ ACCESS_POINT ]</h4>
                      <div className="flex flex-col gap-4">
                         <a href={project.githubUrl || "#"} className="flex items-center justify-between p-4 bg-white/5 border border-border-glass rounded-lg hover:border-syntax-purple/50 group transition-all text-sm font-mono uppercase tracking-widest">
                            Source_Code
                            <span className="material-symbols-outlined text-[18px] text-syntax-purple">code</span>
                         </a>
                      </div>
                   </div>
                </div>
              </div>
            )
          });
        }
        break;
      }

      case 'blogs':
        addLine({
          type: 'output',
          content: (
            <div className="space-y-4 mt-4 max-w-2xl">
              {blogs.map(b => (
                <div key={b.id} className="flex items-center justify-between group cursor-pointer p-2 hover:bg-white/5 rounded border border-transparent hover:border-border-glass transition-all" onClick={() => executeCommand(`blog ${b.id}`)}>
                  <div className="flex items-center gap-12">
                    <span className="text-[10px] text-syntax-comment opacity-70 tracking-widest">{b.date}</span>
                    <span className="text-sm text-text-main/80 group-hover:text-text-main uppercase tracking-tight">{b.title}</span>
                  </div>
                  <span className="material-symbols-outlined text-[16px] opacity-0 group-hover:opacity-100 transition-opacity text-syntax-blue">open_in_new</span>
                </div>
              ))}
            </div>
          )
        });
        break;

      case 'blog': {
        const blogId = args[1];
        const blog = blogs.find(b => b.id === blogId);
        if (!blogId || !blog) {
          addLine({ type: 'error', content: `Usage: blog [id]. Available IDs: ${blogs.map(b => b.id).join(', ')}` });
        } else {
          addLine({
            type: 'output',
            content: (
              <div className="mt-8 max-w-3xl p-8 bg-white/5 rounded-2xl border border-border-glass backdrop-blur-md">
                <div className="mb-12 border-b border-border-glass pb-8">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-syntax-purple font-bold">Research_Journal // {blog.id}</span>
                  <h2 className="text-5xl font-bold text-text-main uppercase mt-4 tracking-tighter leading-tight">{blog.title}</h2>
                  <div className="flex gap-8 mt-6 text-[10px] uppercase tracking-[0.2em] opacity-40">
                     <span>{blog.date}</span>
                     <span>Topic: {blog.topic}</span>
                  </div>
                </div>
                <div className="prose prose-invert max-w-none prose-sm leading-relaxed text-text-main/70">
                   {blog.content.split('\n').map((line, i) => (
                     <p key={i} className="mb-4">{line.trim()}</p>
                   ))}
                </div>
              </div>
            )
          });
        }
        break;
      }

      case 'contact':
        addLine({
          type: 'output',
          content: (
            <div className="mt-4 space-y-4">
              <p className="text-text-main/50 italic text-sm mb-4">Establishing connectivity protocol...</p>
              <div className="grid grid-cols-1 gap-3 text-sm">
                <div className="flex items-center gap-4">
                  <span className="text-syntax-purple uppercase tracking-[0.2em] text-[10px] font-bold w-20">Email</span>
                  <span className="text-text-main/80">satyansh@gaur.dev</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-syntax-blue uppercase tracking-[0.2em] text-[10px] font-bold w-20">X/Twitter</span>
                  <span className="text-text-main/80">@satyansh_gaur</span>
                </div>
              </div>
            </div>
          )
        });
        break;

      case 'clear':
        clearHistory();
        break;

      case 'resume':
        addLine({ type: 'info', content: 'Streaming resume.pdf payload to browser output...' });
        setTimeout(() => {
          addLine({ type: 'output', content: <span className="syntax-green font-bold">[ SUCCESS ] Manifest synchronized. Download started.</span> });
        }, 800);
        break;

      default:
        addLine({ 
          type: 'error', 
          content: `Command not found: ${command}. Type 'help' for assist.` 
        });
    }
  }, [addLine, clearHistory]);

  return { history, executeCommand, addLine };
};
