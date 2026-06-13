export interface ProjectData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  metrics: {
    label: string;
    value: string;
    description: string;
  }[];
  stack: string[];
  features: string[];
  challenges: string[];
  architecture?: string;
  githubUrl?: string;
  demoUrl?: string;
  engineeringLog: string;
  fullWriteup: string;
}

export const projects: ProjectData[] = [
  {
    id: 'satellite-optimizer',
    title: 'Satellite Link Optimizer',
    subtitle: 'Multi-Satellite Constellation Simulator',
    description: 'High-fidelity satellite communication simulator combining orbital propagation, atmospheric attenuation modeling, and stochastic rain fading.',
    tags: ['Python', 'SGP4', 'JIT', 'Numba'],
    metrics: [
      { label: 'Throughput', value: '275k/sec', description: 'Single-satellite vectorized mode' },
      { label: 'JIT_Speedup', value: '192x', description: 'Numba-accelerated rain dynamics' },
      { label: 'FSPL_Accuracy', value: '<1e-4 dB', description: 'Precision physics modeling' }
    ],
    stack: ['Python 3.12', 'sgp4', 'Numba JIT', 'NumPy', 'Streamlit', 'XGBoost'],
    features: [
      'Constellation Management: Dynamic handoff logic for multi-satellite systems.',
      'SGP4 Orbital Propagation: Integrated live CelesTrak TLE updates.',
      'ITU-R Models: Atmospheric modeling (P.618/P.676/P.837/P.838).',
      'Temporally Correlated Rain Fading: Maseng-Bakken AR(1) modeling.',
      'XGBoost Link Quality Prediction.'
    ],
    challenges: [
      'Minimizing SGP4 latency (currently 75µs) for large-scale constellations.',
      'Implementing state-aware handoffs with built-in hysteresis and dwell-time constraints.',
      'Optimizing memory utilization for 500k+ simulation steps.'
    ],
    engineeringLog: 'The simulation engine combines NumPy vectorization and Numba JIT compilation to support large-scale availability studies. We successfully brought SGP4 latency down to 75µs, enabling real-time handoff visualization for 1,300+ satellite databases.',
    fullWriteup: `
      ## High-Fidelity Physics Engine
      The simulator computes a full high-fidelity link budget at each time step, tracking geometric path loss, gaseous absorption, and tropospheric scintillation. It models dynamic LEO/MEO constellations by utilizing live TLE data.

      ## JIT-Accelerated Dynamics
      By utilizing Numba's Just-In-Time compilation, we achieved a 192x speedup in modeling stochastic rain fading processes (Maseng-Bakken). This allows for massive Monte Carlo execution while maintaining interactive dashboard performance.

      ## Handoff Management
      A dedicated manager handles stateful satellite switching using Highest SNR or Elevation policies, preventing rapid toggling through configurable hysteresis.
    `
  },
  {
    id: 'graphmem',
    title: 'GraphMem (GraphRAG)',
    subtitle: 'Local-First Graph Memory Framework',
    description: 'Transforms unstructured documents into a persistent, queryable knowledge graph for long-term machine memory.',
    tags: ['Local-LLM', 'Graph', 'SQLite', 'Ollama'],
    metrics: [
      { label: 'VRAM_Required', value: '6GB', description: 'Optimized for RTX 3050' },
      { label: 'Latency', value: '~12ms', description: 'Graph traversal and retrieval' },
      { label: 'Integrity', value: '100%', description: 'SQLite-backed persistence' }
    ],
    stack: ['React', 'TypeScript', 'SQLite', 'Ollama', 'Custom CUDA Kernels'],
    features: [
      'Local-First Knowledge Extraction: Entity and relationship modeling via local LLMs.',
      'Persistent Memory: Durable SQLite storage that survives process restarts.',
      'Directed Multigraph: Support for multiple relationships between entities.',
      'Fuzzy Entity Resolution: Mapping "Elon Musk" to "SpaceX CEO" automatically.'
    ],
    challenges: [
      'Normalizing LLM-generated relations into a controlled ontology.',
      'Managing confidence accumulation across independent document sources.',
      'Optimizing graph traversal for multi-hop reasoning on consumer hardware.'
    ],
    engineeringLog: 'GraphMem is an experiment in building persistent machine memory. By moving beyond isolated context windows to a structured graph layer, we enable AI agents to maintain an evolving understanding of information locally.',
    fullWriteup: `
      ## The Motivation
      Most RAG systems struggle with multi-hop reasoning and temporal relationships. GraphMem stores structured facts (e.g., Elon Musk --FOUNDED--> SpaceX) as interconnected entities that can be queried and reasoned over.

      ## Local-First Philosophy
      Designed to run entirely on an RTX 3050 (6GB VRAM), GraphMem prioritizes explainability and minimal infrastructure. No cloud services or proprietary APIs are required.

      ## Knowledge Extraction Pipeline
      Documents are chunked and passed to a local LLM to extract entities, relationships, and metadata with confidence scoring and source tracking.
    `
  }
];
