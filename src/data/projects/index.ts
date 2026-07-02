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
    githubUrl: 'https://github.com/Satyanshgaur/Satellite-link-optimiser',
    demoUrl: 'https://github.com/Satyanshgaur/Satellite-link-optimiser',
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
    githubUrl: 'https://github.com/Satyanshgaur/RecalNet',
    demoUrl: 'https://github.com/Satyanshgaur/RecalNet',
    engineeringLog: 'GraphMem is an experiment in building persistent machine memory. By moving beyond isolated context windows to a structured graph layer, we enable AI agents to maintain an evolving understanding of information locally.',
    fullWriteup: `
      ## The Motivation
      Most RAG systems struggle with multi-hop reasoning and temporal relationships. GraphMem stores structured facts (e.g., Elon Musk --FOUNDED--> SpaceX) as interconnected entities that can be queried and reasoned over.

      ## Local-First Philosophy
      Designed to run entirely on an RTX 3050 (6GB VRAM), GraphMem prioritizes explainability and minimal infrastructure. No cloud services or proprietary APIs are required.

      ## Knowledge Extraction Pipeline
      Documents are chunked and passed to a local LLM to extract entities, relationships, and metadata with confidence scoring and source tracking.
    `
  },
  {
    id: 'orbit-ops',
    title: 'Orbit Ops',
    subtitle: 'Hyperlocal Air Quality Forecasting Platform',
    description: 'Predicts neighborhood-level air pollution using satellite observations, ground sensors, and weather data.',
    tags: ['FastAPI', 'TimescaleDB', 'PostGIS', 'Next.js'],
    metrics: [
      { label: 'Downscaling', value: '10km -> Street', description: 'Hyperlocal prediction grid' },
      { label: 'API_Latency', value: '~45ms', description: 'FastAPI async performance' },
      { label: 'Precision', value: '92%', description: 'Prediction accuracy vs ground truth' }
    ],
    stack: ['FastAPI', 'Docker', 'TimescaleDB', 'PostGIS', 'xarray + dask', 'Next.js', 'Mapbox'],
    features: [
      'Hyperlocal Forecasting: Street-level predictions using ML downscaling.',
      'Explainable Predictions: Shows pollution drivers (traffic, weather, industry).',
      'Interactive Map: Visualization of local risk levels via Mapbox.',
      'Personalized Alerts: Threshold-based notifications for pined locations.'
    ],
    challenges: [
      'Fusing heterogeneous data sources (NASA TEMPO, EPA, NOAA).',
      'Scaling time-series data processing with dask for street-level resolution.',
      'Implementing low-latency spatial queries in PostGIS.'
    ],
    githubUrl: 'https://github.com/Satyanshgaur/orbit-ops',
    demoUrl: 'https://github.com/Satyanshgaur/orbit-ops',
    engineeringLog: 'Orbit Ops solves the "citywide average" problem in AQI reporting. By fusing NASA satellite data with ground stations and weather models, we provide actionable, hyperlocal insights for daily activity planning.',
    fullWriteup: `
      ## The Data Fusion Problem
      Pollution can differ street-to-street, but citywide AQI averages often mislead users. Orbit Ops fuses NASA TEMPO satellite observations with local ground sensors to create a high-resolution pollution map.

      ## Scalable Infrastructure
      Built on FastAPI and TimescaleDB, the platform handles massive environmental datasets using xarray and dask for parallelized preprocessing.

      ## Explainable ML
      Instead of just showing a number, our model predicts *why* spikes occur — whether it's a specific traffic corridor during rush hour or low wind speed trapping emissions.
    `
  },
  {
    id: 'sahai-ai',
    title: 'Sahai AI',
    subtitle: 'AI-Powered Mental Health & Lifestyle Ecosystem',
    description: 'An AI-driven resilience platform for college students, integrating personalized AI therapy, lifestyle tracking, and peer communities.',
    tags: ['LLMs', 'RAG', 'Django', 'React'],
    metrics: [
      { label: 'RAG_Accuracy', value: '94.2%', description: 'Evidence-based response score' },
      { label: 'Concurrency', value: 'Redis-Cached', description: 'High-performance chat sessions' },
      { label: 'Deployment', value: 'Docker', description: 'Containerized microservices' }
    ],
    stack: ['FastAPI', 'Django', 'PostgreSQL', 'Redis', 'FAISS', 'React', 'Tailwind'],
    features: [
      'AI Chatbot (Fine-tuned + RAG): Context-aware, safe responses using FAISS semantic search.',
      'Lifestyle Tracking: Mood trackers and clinical assessments (PHQ-9).',
      'Community Layer: Moderated support forums and college-specific circles.',
      'Crisis Escalation: Automated routing for at-risk cases to licensed counselors.'
    ],
    challenges: [
      'Efficient fine-tuning using LoRA for empathetic, ethical student-facing tone.',
      'Integrating evidence-based clinical docs via semantic vector search.',
      'Managing real-time interactions using WebSockets at scale.'
    ],
    githubUrl: 'https://github.com/Vaibhav20k/Sahai_Project',
    demoUrl: 'https://github.com/Vaibhav20k/Sahai_Project',
    engineeringLog: 'Sahai treats mental health as a lifestyle issue. By blending AI support with real-world community meetups and lifestyle tracking, we build a supportive ecosystem where student well-being is integrated into daily life.',
    fullWriteup: `
      ## Beyond the Chatbot
      Sahai is an integrated ecosystem. It combines an empathetic AI layer with lifestyle tracking (moods, habits) and a community layer for real-world support.

      ## Technical AI Layer
      Utilizing a RAG pipeline with FAISS, Sahai ensures that every piece of advice is grounded in curated, evidence-based mental health documentation.

      ## Enterprise-Ready Backend
      A hybrid FastAPI/Django architecture ensures secure authentication while providing high-throughput chat endpoints cached with Redis.
    `
  },
  {
    id: 'plant-scout',
    title: 'Plant Scout',
    subtitle: 'Autonomous Field Scout & Classifier',
    description: 'End-to-end ML and robotics project for early plant disease detection using computer vision and autonomous navigation.',
    tags: ['PyTorch', 'ResNet9', 'CV', 'Robotics'],
    metrics: [
      { label: 'Arch', value: 'ResNet9', description: 'Optimized residual network' },
      { label: 'Speed', value: 'Real-Time', description: 'Edge-ready inference latency' },
      { label: 'Validation', value: 'Leaf-ID Aware', description: 'Leakage-free dataset splitting' }
    ],
    stack: ['PyTorch', 'ResNet9', 'Jetson Nano', 'OpenCV', 'One Cycle Policy'],
    features: [
      'ResNet9 Architecture: High-speed residual network for image classification.',
      'Leakage-Free Splitting: Advanced data prep grouping photos by physical leaf.',
      'Mixed Precision Training: Speeding up convergence with torch.amp.',
      'Edge-Ready Inference: Designed for Jetson Nano/Raspberry Pi deployment.'
    ],
    challenges: [
      'Preventing data leakage by ensuring multiple photos of the same leaf stay in the same split.',
      'Optimizing model size for real-time classification on embedded hardware.',
      'Managing gradient stability with clipping and weight decay during training.'
    ],
    githubUrl: 'https://github.com/Satyanshgaur/plant_disease_classification',
    demoUrl: 'https://github.com/Satyanshgaur/plant_disease_classification',
    engineeringLog: 'Plant Scout bridges the gap between precision agriculture and autonomous systems. By training on leakage-free datasets, we ensure our ResNet9 model generalizes to unseen field conditions effectively.',
    fullWriteup: `
      ## Precision Agriculture
      Early detection of leaf diseases can save entire harvests. Plant Scout identifies disease categories from live camera input with high confidence.

      ## Robust Machine Learning
      Unlike standard random splits, we use Leaf-ID aware grouping to ensure the model is tested on *unseen leaves*, providing a true measure of real-world performance.

      ## Robotics Integration
      The project is optimized for deployment on small-scale wheeled robots (using Jetson Nano), enabling autonomous field scanning and real-time reporting.
    `
  },
  {
    id: 'task-server',
    title: 'Task Server',
    subtitle: 'Multithreaded TCP Task Processor',
    description: 'A high-concurrency TCP server written in Java for processing computational tasks across dedicated worker pools.',
    tags: ['Java', 'TCP/IP', 'Concurrency', 'Networking'],
    metrics: [
      { label: 'Concurrency', value: 'Thread-Pool', description: 'Configurable worker management' },
      { label: 'Latency', value: 'Sub-ms', description: 'Raw socket overhead' },
      { label: 'Safety', value: 'Lock-Guarded', description: 'Thread-safe task routing' }
    ],
    stack: ['Java 11+', 'TCP Sockets', 'Concurrency API', 'Thread Pools'],
    features: [
      'Concurrent Sessions: Dedicated threads for each connected client.',
      'Worker Pool: Efficiently drains a shared thread-safe task queue.',
      'Supported Tasks: SORT (lists), FACTORIAL (compute), REVERSE (strings).',
      'Graceful Handling: Robust error management for malformed commands.'
    ],
    challenges: [
      'Ensuring strict thread safety across the shared task queue.',
      'Eliminating cross-session data contamination through isolated result routing.',
      'Managing graceful resource cleanup during abrupt client disconnections.'
    ],
    githubUrl: 'https://github.com/Satyanshgaur/task-server-in-java',
    demoUrl: 'https://github.com/Satyanshgaur/task-server-in-java',
    engineeringLog: 'The Task Server is a deep dive into concurrent systems design. It prioritizes the core mechanics of raw socket communication and thread-safe task orchestration over high-level abstractions.',
    fullWriteup: `
      ## Concurrent Architecture
      The implementation utilizes a configurable pool of worker threads that process tasks submitted over raw TCP/IP sockets. This ensures high-throughput task execution without blocking client connections.

      ## Thread Safety
      Every access to the central task queue is guarded by Java synchronization primitives, ensuring system integrity even under heavy concurrent load.

      ## Bare-Metal Networking
      By working directly with Java Sockets and plain text protocols, the project demonstrates a clear understanding of low-level network communication and result routing.
    `
  },
  {
    id: 'communeos',
    title: 'CommuneOS',
    subtitle: 'AI-Powered Community Operations Agent (Paytm Hackathon Winner)',
    description: 'An intelligent multi-agent system that observes member profiles, interactions, and queries to dynamically personalize community environments and provide actionable operational intelligence.',
    tags: ['Multi-Agent', 'FastAPI', 'Next.js', 'ChromaDB', 'agentfield'],
    metrics: [
      { label: 'Award', value: '1st Place', description: 'Winner of Paytm Hackathon' },
      { label: 'Agents', value: '6 Collaborating', description: 'Under Orchestrator coordination' },
      { label: 'Latency', value: '~230ms', description: 'Optimized offline mock execution' }
    ],
    stack: [
      'Next.js 15+ (App Router)',
      'React 19',
      'TypeScript',
      'Tailwind CSS',
      'FastAPI',
      'ChromaDB',
      'agentfield SDK',
      'Groq / OpenRouter',
      'SQLAlchemy'
    ],
    features: [
      'Multi-Agent Network: Coordinates six specialized agents (Identity, Discovery, Learning, Mentor, Health, Organizer) under the Memory Agent routing coordinator.',
      'Resume Ingestion Pipeline: Extracts text via PyMuPDF (fitz), parses content via LLM schema structuring, and splits it into semantic ChromaDB chunks.',
      'Dynamic Welcome Onboarding: Generates custom roadmaps, checklists, channel suggestions, and matches members with local mentors.',
      'Community Health Audits: Monitors chat feeds to flag inactive members at risk of churn and surface ignored newcomer threads.',
      'Operational Intelligence: Consolidates metrics, event suggestions, and moderator action items for community managers.'
    ],
    challenges: [
      'Orchestrating 6 concurrent LLM agents without hitting extreme token limits or latency spikes, solved by introducing caching via CacheService (1-hour TTL) and local fallback processing.',
      'Ensuring PyMuPDF PDF parser gracefully degrades to a local keyword matcher when model providers (Groq/OpenRouter) hit rate limits.',
      'Designing a unified API compat layer to bind FastAPI Pydantic responses to Next.js Client component requirements.'
    ],
    githubUrl: 'https://github.com/Satyanshgaur/communeos',
    demoUrl: 'https://github.com/Satyanshgaur/communeos',
    engineeringLog: 'CommuneOS won 1st Place at the Paytm Hackathon. It moves beyond generic chat bots into a cooperative multi-agent operating system. By analyzing member patterns and indexing resources into ChromaDB, the orchestrator personalizes spaces for developers while giving organizers actionable insights.',
    fullWriteup: `
      ## The Architecture
      
      At the core of CommuneOS is a decentralized, multi-agent network operating on top of a shared vector memory layer. Rather than treating RAG as a simple query-response mechanism, CommuneOS partitions memory and intelligence into specialized agents:
      
      \`\`\`mermaid
      graph TD
          User[User Bio / Resume PDF] --> |Ingests| ResumeService[Resume Service]
          ResumeService --> |Splits & Embeds| ChromaDB[(ChromaDB Vector Store)]
          ChromaDB --> |Injects Context| MemoryAgent[Memory Agent]
          
          Orchestrator[Orchestrator] --> |Executes Loop| MemoryAgent
          Orchestrator --> IdentityAgent[Identity Agent]
          IdentityAgent --> DiscoveryAgent[Discovery Agent]
          DiscoveryAgent --> LearningAgent[Learning Agent]
          LearningAgent --> MentorAgent[Mentor Agent]
          
          ActivityLogs[Member Activity Logs] --> HealthAgent[Health Agent]
          HealthAgent --> OrganizerAgent[Organizer Agent]
          OrganizerAgent --> Dashboard[Organizer Action Dashboard]
      \`\`\`
      
      ### 1. Ingestion and PDF RAG Pipeline
      When a user uploads a PDF, the backend uses PyMuPDF (\`fitz\`) to extract text. A structured JSON schema is then built using Groq/OpenRouter. If rate limits are reached, the system falls back to a custom local keyword scanner matching against 30+ developer-centric keywords. The text is partitioned into five main categories: Education, Projects, Skills, Experience, and Career Goals, and embedded into local ChromaDB storage (\`backend/data/chroma_db\`).
      
      ### 2. Multi-Agent Personalization Loop
      Once indexed, the \`Memory Agent\` coordinates with the \`Orchestrator\` to run five specialized agents:
      * **Identity Agent**: Analyzes biography files and profile tags to identify background experience (Beginner, Intermediate, Advanced, Expert) and preferred learning styles.
      * **Discovery Agent**: Matches relevant community channels, study groups, and events.
      * **Learning Agent**: Designs a multi-week milestone learning roadmap and a daily checkbox checklist.
      * **Mentor Agent**: Automatically calculates matching metrics against the mentor directory using cosine-similarity search on ChromaDB.
      * **Community Health Agent**: Inspects engagement patterns to flag ignored newcomers or churn risks.
      * **Organizer Agent**: Converts health alerts and trending topics into an actionable checklist for community managers.
    `
  }
];
