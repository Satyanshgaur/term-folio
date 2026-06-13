import React from 'react';
import { useParams, Link } from 'react-router-dom';

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="pt-32 px-margin-desktop max-w-5xl mx-auto pb-32 font-mono text-[#00ff41]">
      <Link to="/" className="text-[#00ff41] hover:underline flex items-center gap-2 mb-12 uppercase text-xs tracking-widest">
        <span className="material-symbols-outlined text-[18px]">terminal</span>
        Return to Shell
      </Link>
      
      <div className="space-y-12 animate-fade-in">
        <div className="space-y-4">
          <div className="flex items-center gap-4 text-[10px] opacity-50 uppercase tracking-[0.2em]">
            <span>System_Analysis</span>
            <span className="h-px w-8 bg-[#00ff41]/30"></span>
            <span>ID: {id}</span>
          </div>
          <h1 className="text-5xl font-bold text-white uppercase tracking-tighter crt-glow">{id?.replace(/-/g, ' ')}</h1>
          <div className="flex flex-wrap gap-4 pt-2">
            {['CUDA', 'C++', 'Systems', 'Performance'].map(tag => (
              <span key={tag} className="px-2 py-0.5 border border-[#00ff41]/20 text-[10px] uppercase opacity-70">[{tag}]</span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 aspect-video w-full bg-white/5 rounded border border-[#00ff41]/10 flex items-center justify-center">
            <span className="material-symbols-outlined text-[64px] opacity-10">schema</span>
          </div>
          <div className="space-y-6">
            <div className="p-4 border border-[#00ff41]/20 bg-[#00ff41]/5 rounded">
              <h4 className="text-[10px] uppercase tracking-widest mb-2 opacity-50">Benchmarks</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Inference</span>
                  <span className="text-white">12.4ms</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Throughput</span>
                  <span className="text-white">850 tps</span>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="text-[10px] uppercase tracking-widest opacity-50">Stack</h4>
              <p className="text-xs text-white">NVIDIA Triton, TensorRT, Modern C++20</p>
            </div>
          </div>
        </div>

        <div className="prose prose-invert max-w-none space-y-8">
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white uppercase tracking-widest">[ Overview ]</h2>
            <p className="text-[#00ff41]/80 leading-relaxed">
              This system was engineered to solve the bottleneck in knowledge graph traversal during real-time LLM inference. By offloading graph processing to custom CUDA kernels, we achieved a 15x speedup compared to standard CPU-based approaches.
            </p>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white uppercase tracking-widest">[ Engineering Challenges ]</h2>
            <ul className="list-disc list-inside space-y-2 text-sm opacity-80">
              <li>Managing PCIe transfer overhead between host and device memory.</li>
              <li>Implementing lock-free data structures for parallel graph updates.</li>
              <li>Optimizing memory coalescing for irregular access patterns in graph nodes.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
