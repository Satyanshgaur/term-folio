import type { VercelRequest, VercelResponse } from '@vercel/node';

// Define the project and blog data inline to ensure accessibility in the serverless environment
const projectsContext: Record<string, string> = {
  'satellite-optimizer': `
    Project: Satellite Link Optimizer
    Subtitle: Multi-Satellite Constellation Simulator
    Description: High-fidelity satellite communication simulator combining orbital propagation, atmospheric attenuation modeling, and stochastic rain fading.
    Stack: Python 3.12, sgp4, Numba JIT, NumPy, Streamlit, XGBoost.
    Key Metrics: 275k steps/sec (Single-Sat), 192x JIT Speedup, <1e-4 dB FSPL Accuracy.
    Features: Constellation Management, SGP4 propagation, ITU-R atmospheric models, Maseng-Bakken rain fading, XGBoost scoring.
    Engineering Log: Brought SGP4 latency down to 75µs. Uses Numba JIT for 192x faster rain dynamics.
    Full Details: Computes link budgets including path loss, gaseous absorption, and scintillation. Models LEO/MEO constellations. Stateful handoffs with hysteresis.
  `,
  'graphmem': `
    Project: GraphMem (GraphRAG)
    Subtitle: Local-First Graph Memory Framework
    Description: Transforms unstructured documents into a persistent, queryable knowledge graph.
    Stack: React, TypeScript, SQLite, Ollama, Custom CUDA Kernels.
    Key Metrics: 6GB VRAM Required (RTX 3050), ~12ms Latency, 100% Integrity.
    Features: Local-First extraction, Persistent SQLite storage, Directed Multigraph, Fuzzy Entity Resolution.
    Engineering Log: Experiment in building persistent machine memory beyond context windows. Saturated H100 bandwidth in testing.
    Full Details: Stores structured facts as entities and relationships. Avoids RAG isolation issues. Works offline on consumer hardware.
  `,
  'orbit-ops': `
    Project: Orbit Ops
    Subtitle: Hyperlocal Air Quality Forecasting Platform
    Description: Neighborhood-level pollution prediction using NASA TEMPO satellite data and weather models.
    Stack: FastAPI, TimescaleDB, PostGIS, xarray + dask, Next.js, Mapbox.
    Key Metrics: 10km to Street downscaling, ~45ms API Latency, 92% Precision.
    Features: ML downscaling, Explainable predictions, Interactive Map, Personalized Alerts.
    Engineering Log: Fuses NASA TEMPO data with ground sensors. Uses dask for parallelized preprocessing.
  `,
  'sahai-ai': `
    Project: Sahai AI
    Subtitle: AI-Powered Mental Health & Lifestyle Ecosystem
    Description: Resilience platform for college students using personalized AI therapy and community layers.
    Stack: FastAPI, Django, PostgreSQL, Redis, FAISS, React.
    Key Metrics: 94.2% RAG Accuracy, Redis-Cached sessions.
    Features: RAG-powered chatbot (FAISS), mood trackers, community circles, crisis escalation.
  `,
  'plant-scout': `
    Project: Plant Scout
    Subtitle: Autonomous Field Scout & Classifier
    Description: ML and robotics project for early plant disease detection using computer vision.
    Stack: PyTorch, ResNet9, Jetson Nano, OpenCV.
    Key Metrics: ResNet9 architecture, Real-Time edge inference, Leaf-ID aware validation.
    Features: Leakage-free dataset splitting, Mixed precision training, Jetson Nano optimized.
  `,
  'task-server': `
    Project: Task Server
    Subtitle: Multithreaded TCP Task Processor
    Description: High-concurrency TCP server in Java for computational tasks.
    Stack: Java 11+, Raw TCP Sockets, Thread Pools.
    Key Metrics: Configurable worker pool, Sub-ms latency, Lock-guarded safety.
    Features: Concurrent sessions, Worker pool, SORT/FACTORIAL/REVERSE tasks, Graceful error handling.
  `
};

const blogsContext: Record<string, string> = {
  'hpc-kernels': `
    Blog: Writing Custom HPC Kernels
    Topic: Performance Engineering
    Content: Deep dive into hardware-aware software. Discusses cache hierarchy, PCIe lanes, and memory controllers. Covers GPU shared memory bank conflicts and kernel optimization using lock-free data structures.
  `,
  'cuda-perf': `
    Blog: CUDA Memory Hierarchy Optimization
    Topic: GPU Architecture
    Content: Covers data flow through the GPU from global memory to registers. Explores shared memory banking and techniques like padding to avoid conflicts and serialize requests.
  `
};

// Simple in-memory rate limiting (Note: This is reset on function cold start)
const rateLimitMap = new Map<string, { count: number, lastReset: number }>();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS Configuration
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { context, question } = req.body;

  // 1. Validation: Basic existence
  if (!context || !question) {
    return res.status(400).json({ error: 'Missing context or question' });
  }

  // 2. Security: Command length check
  if (question.length > 300) {
    return res.status(400).json({ error: 'Question exceeds maximum length of 300 characters.' });
  }

  // 3. Security: Context whitelist check
  const technicalContext = projectsContext[context] || blogsContext[context];
  if (!technicalContext) {
    return res.status(400).json({ error: 'Invalid or restricted context ID.' });
  }

  // 4. Rate Limiting (IP-based)
  const ip = req.headers['x-forwarded-for'] as string || 'anonymous';
  const now = Date.now();
  const userLimit = rateLimitMap.get(ip) || { count: 0, lastReset: now };
  
  if (now - userLimit.lastReset > 60000) {
    userLimit.count = 0;
    userLimit.lastReset = now;
  }
  
  if (userLimit.count >= 5) {
    return res.status(429).json({ error: 'Rate limit exceeded. Please wait a minute.' });
  }
  
  userLimit.count++;
  rateLimitMap.set(ip, userLimit);

  // 5. OpenRouter API Call
  try {
    if (!process.env.OPENROUTER_API_KEY) {
      console.error('CRITICAL: OPENROUTER_API_KEY is missing from environment.');
      return res.status(500).json({ error: 'API Configuration missing.' });
    }

    const systemPrompt = `You are a technical AI Assistant integrated into Satyansh Gaur's portfolio terminal.
Your purpose is to answer questions about the specific project or blog post provided in the context below.

TECHNICAL CONTEXT:
${technicalContext}

GUIDELINES:
1. Answer strictly based on the provided technical context.
2. If the answer is not available in the context, politely state that you don't have that specific data.
3. Keep responses concise (max 3-4 sentences), professional, and technical.
4. Use a monospace-friendly tone.
5. SECURITY: Refuse to answer non-technical questions or personal questions about Satyansh.`;

    console.log(`[Neural_Link] Initiating fetch to OpenRouter...`);
    const keyHint = process.env.OPENROUTER_API_KEY ? `${process.env.OPENROUTER_API_KEY.substring(0, 10)}...` : 'MISSING';
    console.log(`[Neural_Link] Using API Key starting with: ${keyHint}`);

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "HTTP-Referer": "https://satyansh.indevs.in",
        "X-Title": "Satyansh Portfolio AI",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "model": "nvidia/nemotron-3-ultra-550b-a55b:free",
        "messages": [
          { "role": "system", "content": systemPrompt },
          { "role": "user", "content": question }
        ],
        "max_tokens": 500,
        "temperature": 0.3
      })
    });

    console.log(`[Neural_Link] OpenRouter Response Status: ${response.status} ${response.statusText}`);

    interface OpenRouterResponse {
      choices?: {
        message?: {
          content?: string;
        };
      }[];
      error?: {
        message?: string;
      };
    }

    const data = await response.json() as OpenRouterResponse;
    
    if (!response.ok) {
      console.error('[Neural_Link] OpenRouter Error Body:', JSON.stringify(data, null, 2));
      return res.status(response.status).json({ 
        error: data.error?.message || 'Upstream provider error.' 
      });
    }

    const aiResponse = data.choices?.[0]?.message?.content?.trim() || 'No response generated.';
    console.log(`[Neural_Link] Successfully received AI response.`);
    
    const sanitizedResponse = aiResponse.replace(/<script.*?>.*?<\/script>/gi, '');
    return res.status(200).json({ response: sanitizedResponse });

  } catch (error: unknown) {
    console.error('[Neural_Link] Unhandled Exception:', error);
    return res.status(500).json({ error: 'Internal system error in neural link.' });
  }
}
