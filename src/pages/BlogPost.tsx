import React from 'react';
import { useParams, Link } from 'react-router-dom';

const BlogPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="pt-32 px-margin-desktop max-w-4xl mx-auto pb-32 font-mono text-[#00ff41]">
      <Link to="/" className="text-[#00ff41] hover:underline flex items-center gap-2 mb-12 uppercase text-xs tracking-widest">
        <span className="material-symbols-outlined text-[18px]">terminal</span>
        Exit Journal
      </Link>
      
      <article className="space-y-12 animate-fade-in">
        <div className="space-y-4">
          <div className="flex items-center gap-4 text-[10px] opacity-50 uppercase tracking-[0.2em]">
            <span>Journal_Entry</span>
            <span className="h-px w-8 bg-[#00ff41]/30"></span>
            <span>Ref: {id}</span>
          </div>
          <h1 className="text-5xl font-bold text-white uppercase tracking-tighter leading-tight crt-glow">
            {id?.replace(/-/g, ' ')}
          </h1>
          <div className="flex gap-8 text-[10px] uppercase tracking-widest opacity-60">
            <span>Published: Feb 2026</span>
            <span>Topic: Performance Engineering</span>
          </div>
        </div>

        <div className="h-px bg-[#00ff41]/20 w-full"></div>

        <div className="prose prose-invert max-w-none space-y-8">
          <p className="text-xl text-white font-light leading-relaxed">
            In systems programming, we often treat the hardware as an abstract entity. However, at extreme scales, the physical reality of the machine—its cache hierarchy, PCIe lanes, and memory controllers—dictates the software architecture.
          </p>
          
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white uppercase tracking-widest">[ The Memory Bottleneck ]</h2>
            <p className="text-[#00ff41]/80 leading-relaxed">
              When working with high-throughput inference engines, the primary enemy is latency. Shared memory on GPUs is a powerful tool, but misuse can lead to bank conflicts that throttle performance. Understanding how to align memory access patterns with hardware architecture is critical.
            </p>
          </div>

          <div className="p-6 bg-[#00ff41]/5 border border-[#00ff41]/20 rounded font-mono text-sm">
            <p className="opacity-50 mb-2">// Sample CUDA Kernel Optimization</p>
            <code className="text-white">
              __shared__ float tile[TILE_SIZE][TILE_SIZE + 1]; <span className="text-[#00ff41]/50">// Padding to avoid bank conflicts</span>
            </code>
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlogPost;
