export interface BlogData {
  id: string;
  title: string;
  date: string;
  topic: string;
  summary: string;
  content: string;
}

export const blogs: BlogData[] = [
  {
    id: 'hpc-kernels',
    title: 'Writing Custom HPC Kernels',
    date: 'FEB 2026',
    topic: 'Performance Engineering',
    summary: 'Exploring the complexities of hardware-aware software and the limits of parallel architectures.',
    content: `
      In systems programming, we often treat the hardware as an abstract entity. However, at extreme scales, the physical reality of the machine—its cache hierarchy, PCIe lanes, and memory controllers—dictates the software architecture.

      ## The Memory Bottleneck
      When working with high-throughput inference engines, the primary enemy is latency. Shared memory on GPUs is a powerful tool, but misuse can lead to bank conflicts that throttle performance. Understanding how to align memory access patterns with hardware architecture is critical.

      ## Kernel Optimization
      Custom CUDA kernels allow for fine-grained control over execution. By implementing lock-free data structures and minimizing host-to-device transfers, we can achieve significant performance gains.
    `
  },
  {
    id: 'cuda-perf',
    title: 'CUDA Memory Hierarchy Optimization',
    date: 'JAN 2026',
    topic: 'GPU Architecture',
    summary: 'Deep dive into shared memory banking and throughput optimization in massive parallel architectures.',
    content: `
      Understanding how data flows through the GPU is essential for writing efficient code. This article covers the hierarchy from global memory down to registers, and how to utilize each layer effectively.

      ## Shared Memory Banking
      Shared memory is divided into banks. Simultaneous access to the same bank results in a conflict, which serializes the requests. We explore techniques like padding to avoid these bottlenecks.
    `
  },
  {
    id: 'communeos-development-story',
    title: 'Behind CommuneOS: Building a Cooperative Multi-Agent Network (Paytm Hackathon Winner)',
    date: 'JUL 2026',
    topic: 'Software Architecture',
    summary: 'An inside look at designing, building, and optimizing CommuneOS, a multi-agent system powered by FastAPI, agentfield, and ChromaDB that secured 1st Place at the Paytm Hackathon.',
    content: `
      Modern developer communities suffer from a major design flaw: **static curation**. Everyone who joins a community—from first-year university students to principal kernel engineers—is greeted with the exact same welcome message, the same generic channel list, and the same list of resources. 

      At the **Paytm Hackathon**, we set out to build a solution: **CommuneOS (CommunityOS)**. By deploying a team of specialized, cooperating AI agents on top of a semantic memory layer, we turned community onboarding and management into a dynamic, personalized experience. This engineering post-mortem breaks down how we built the system that took home **1st Place**.

      ---

      ## The Challenge: Why Single Agents Fail
      Initially, we considered a single large LLM agent to handle user profiling, channel mapping, roadmap generation, and mentor matching. However, in our local-first prototyping environment, this approach suffered from:
      1. **Context Pollution**: Merging RAG data for channels, events, study guides, and mentors into a single context window bloated the token usage and degraded reasoning quality.
      2. **High Latency**: The LLM had to do too much sequential reasoning, pushing API response times past 15 seconds.
      3. **Fragile Schemas**: Single prompts generating complex, nested JSON schemas for four different tasks frequently failed validation.

      Our solution was to partition the intelligence. We designed a **Multi-Agent Network** utilizing the **agentfield SDK**, where each agent has a single, stateless, well-defined responsibility.

      ---

      ## The Multi-Agent Network

      In CommuneOS, a centralized **Orchestrator** manages the workflow execution pipeline, passing data sequentially between agents:

      1. **Identity Agent**: Examines bios, message logs, and profile tags. It classifies skill confidence (Beginner, Intermediate, Advanced, Expert), detects technical stacks, and recognizes preferred learning styles.
      2. **Discovery Agent**: Matches relevant community channels, study guides, and upcoming events to the user.
      3. **Learning Agent**: Builds a personalized multi-week milestone learning roadmap and a daily checklist.
      4. **Mentor Agent**: Queries the mentor directory using cosine-similarity search, evaluates alignment, and suggests the top matched expert mentors with explicit reasonings.
      5. **Community Health Agent**: Periodically inspects activity logs, flagging unanswered newcomer posts and predicting churn risks.
      6. **Organizer Agent**: Aggregates health metrics and feedback to generate a clean, prioritized dashboard of action tasks for community managers.

      By executing these agents in a decoupled, structured sequence, each agent works with a minimal, specialized prompt. This ensures 100% schema alignment and drastically reduces local token consumption.

      ---

      ## Ingestion & The PDF RAG Pipeline

      During user registration, members upload their resume (or a developer bio). This triggers the backend ingest pipeline:
      
      * **Text Extraction**: The FastAPI backend receives the PDF and uses PyMuPDF (\`fitz\`) to extract raw text blocks.
      * **Structured Parsing**: We run a JSON-structured LLM prompt to map text into a schema (Education, Experience, Skills, Projects, Goals).
      * **Local Keyword Fallback**: Hackathons are notorious for network instability. If Groq or OpenRouter rate limits us, the system falls back to a regex-based keyword parser that extracts 30+ core languages/frameworks and populates the database automatically.
      * **Vector Storage**: The parsed profile is split into semantic chunks and indexed inside a local **ChromaDB** instance.

      ---

      ## Optimizing Latency and Testing

      Building a complex multi-agent app in a 36-hour hackathon requires robust validation. We built a validation suite with:
      * **Mock-Override Isolation**: We patched external LLM calls to use cached mock files in testing, allowing us to execute integration and schema alignment tests in under 230ms.
      * **CacheService**: A local CacheService implements a 1-hour TTL on the multi-agent execution output to prevent unnecessary LLM runs.

      ---

      ## Looking Ahead

      Taking CommuneOS from a hackathon-winning prototype to a production-grade SaaS requires scaling the architecture. Our roadmap includes transitioning the pipeline to **Celery and Redis** for asynchronous task execution, using **Supabase Realtime** to stream agent results to the Next.js frontend, and migrating from ChromaDB to **pgvector** in PostgreSQL to scale to thousands of concurrent users.
    `
  }
];
