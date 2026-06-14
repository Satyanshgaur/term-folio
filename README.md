# Satyansh Gaur | AI Infrastructure Portfolio

Here is the repository for my personal portfolio project—a high-fidelity, workstation-style environment designed to showcase systems engineering and AI infrastructure expertise.

This platform moves beyond the traditional static portfolio, offering a dual-layered experience that mirrors a modern developer workstation. It blends a deep **Tokyo Night** aesthetic with functional **Glassmorphism** and a fully interactive **Shell Environment**.

## 🚀 Key Features

### 🖥️ Immersive Shell Environment (`workspace.sh`)
- **Full-Page Terminal**: A persistent, full-viewport shell with command history and rich React-based outputs.
- **Visual CRT Effects**: Authentic retro-computing feel with subtle scanlines, flicker animations, and soft glows.
- **Rich Command Outputs**: Commands like `projects` and `whoami` render interactive cards, architecture diagrams, and live metrics rather than just plain text.

### 🌓 Graphical Dashboard (`dashboard.gui`)
- **Seamless Duality**: Switch instantly between the raw shell and a polished, graphical dashboard without losing state.
- **Refined Glassmorphism**: Multi-layered frosted-glass surfaces with `backdrop-filter: blur(20px)` and low-contrast UI chrome.
- **Responsive Systems Design**: A layout optimized for information density, designed to look and feel like high-end monitoring software.

### 📊 Performance-First Project Showcase
- **Deep Technical Reports**: The `project <id>` command initiates a full system analysis, displaying:
    - **Architecture Diagrams**: Structural visualizations of system layers.
    - **Benchmark Charts**: Quantitative performance metrics (Latency, Throughput, Efficiency).
    - **Engineering Logs**: Post-mortems on design decisions and hardware-level optimizations.
- **Metric-Driven UI**: Key achievements (e.g., "275k steps/sec", "192x JIT Speedup") are elevated in the UI hierarchy using semantic coloring.

### 🛰️ Live System Monitor
- **Workstation Sidebar**: A permanent right-hand panel featuring:
    - **Real-Time GPU/VRAM Widgets**: Smoothly animated (simulated) telemetry of the AI environment.
    - **Contextual Metadata**: Instant visibility of system status, session ID, and deployment latency.

## 🛠️ Build & Architecture

The application is built with a focus on **Precision Engineering** and **Type Safety**:

- **Core**: React 18 with TypeScript for robust, maintainable components.
- **Styling**: Tailwind CSS utilizing a custom-ported Tokyo Night and Catppuccin color palette.
- **Routing**: React Router DOM managing individual project/blog URLs for direct artifact access.
- **Data Layer**: Centralized, high-fidelity project and research data managed in structured TypeScript directories.
- **Quality Control**: Automated CI/CD pipeline via GitHub Actions for linting, type-checking, and build verification.

## ⌨️ Usable Shell Commands

| Command | Action |
|---|---|
| `help` | List all available system utilities. |
| `who` | View the AI Infrastructure profile and current research focus. |
| `projects` | List all active system artifacts with primary metrics. |
| `project [id]` | Open a high-fidelity technical report for a specific project. |
| `blogs` | Access the research journal entries. |
| `blog [id]` | Render a specific research entry directly in the shell buffer. |
| `skills` | Display the technical stack (Systems, AI Infra, Kernels). |
| `ask [query]` | Communicate with the Context-Aware AI Assistant (`Neural_Link`). |
| `resume` | Stream the professional manifest to the browser. |
| `clear` | Wipe the terminal buffer. |

## 🚀 Deployment & Security

### 🔐 Security First
- **Secrets Management**: This project uses environment variables for the `OPENROUTER_API_KEY`. 
- **Git Safety**: All `.env` files are explicitly excluded via `.gitignore` to prevent credential leakage.
- **Backend Isolation**: AI logic is contained in Vercel Serverless Functions (`api/`), ensuring the API key is never exposed to the client-side browser code.

### 🌐 Vercel Hosting
1.  **Push** this repository to GitHub.
2.  **Import** the project into the [Vercel Dashboard](https://vercel.com).
3.  **Configure Environment Variables**: In Vercel, navigate to `Settings > Environment Variables` and add:
    - `OPENROUTER_API_KEY`: Your production key.
4.  **Launch**: Vercel will automatically deploy the site with secure backend access.

---

*This project is an ongoing experiment in building high-fidelity, hardware-aware digital experiences.*
