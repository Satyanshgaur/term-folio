import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

interface GraphNode {
  id: string;
  label: string;
  type: 'project' | 'blog' | 'skill';
  color: string;
  info: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

interface GraphLink {
  source: string;
  target: string;
}

const INITIAL_NODES = [
  // Projects
  { id: 'satellite-optimizer', label: 'Satellite Optimizer', type: 'project', color: '#82aaff', info: 'Multi-Satellite LEO Simulator' },
  { id: 'graphmem', label: 'GraphMem (GraphRAG)', type: 'project', color: '#82aaff', info: 'Local Graph RAG Memory Engine' },
  { id: 'orbit-ops', label: 'Orbit Ops', type: 'project', color: '#82aaff', info: 'Hyperlocal AQI Forecasting Platform' },
  { id: 'sahai-ai', label: 'Sahai AI', type: 'project', color: '#82aaff', info: 'AI Student Resilience Ecosystem' },
  { id: 'plant-scout', label: 'Plant Scout', type: 'project', color: '#82aaff', info: 'Autonomous CV Plant Classifier' },
  { id: 'task-server', label: 'Task Server', type: 'project', color: '#82aaff', info: 'Java Multithreaded TCP Server' },
  { id: 'communeos', label: 'CommuneOS', type: 'project', color: '#82aaff', info: 'Paytm Hackathon Multi-Agent Winner' },

  // Blogs
  { id: 'hpc-kernels', label: 'HPC Kernels Blog', type: 'blog', color: '#ffcb6b', info: 'Writing Custom CUDA Kernels' },
  { id: 'cuda-perf', label: 'CUDA Shared Memory Blog', type: 'blog', color: '#ffcb6b', info: 'GPU Hierarchy Optimizations' },
  { id: 'communeos-development-story', label: 'CommuneOS Development Blog', type: 'blog', color: '#ffcb6b', info: 'Hackathon Post-Mortem Details' },

  // Skills
  { id: 'python', label: 'Python', type: 'skill', color: '#c792ea', info: 'Scientific Comp. & ML' },
  { id: 'java', label: 'Java', type: 'skill', color: '#c792ea', info: 'Multithreading & Sockets' },
  { id: 'cuda', label: 'CUDA & HPC', type: 'skill', color: '#c792ea', info: 'GPU Hardware Optimization' },
  { id: 'typescript-react', label: 'React / TS', type: 'skill', color: '#c792ea', info: 'UI & App Development' },
  { id: 'fastapi-django', label: 'FastAPI / Django', type: 'skill', color: '#c792ea', info: 'Backend Architectures' },
  { id: 'pytorch-ml', label: 'PyTorch / ML', type: 'skill', color: '#c792ea', info: 'Deep Learning Models' },
  { id: 'vector-dbs', label: 'Chroma / FAISS', type: 'skill', color: '#c792ea', info: 'Vector Databases & RAG' },
  { id: 'multi-agent', label: 'Multi-Agent Systems', type: 'skill', color: '#c792ea', info: 'agentfield & Orchestrations' },
  { id: 'sqlite-postgres', label: 'SQLite / Postgres', type: 'skill', color: '#c792ea', info: 'Data Persistence Layers' }
];

const INITIAL_LINKS: GraphLink[] = [
  // Satellite Link Optimizer connections
  { source: 'satellite-optimizer', target: 'python' },
  { source: 'satellite-optimizer', target: 'pytorch-ml' },
  
  // GraphMem connections
  { source: 'graphmem', target: 'typescript-react' },
  { source: 'graphmem', target: 'sqlite-postgres' },
  { source: 'graphmem', target: 'vector-dbs' },
  { source: 'graphmem', target: 'cuda' },

  // Orbit Ops connections
  { source: 'orbit-ops', target: 'fastapi-django' },
  { source: 'orbit-ops', target: 'typescript-react' },
  { source: 'orbit-ops', target: 'sqlite-postgres' },

  // Sahai AI connections
  { source: 'sahai-ai', target: 'fastapi-django' },
  { source: 'sahai-ai', target: 'typescript-react' },
  { source: 'sahai-ai', target: 'vector-dbs' },
  { source: 'sahai-ai', target: 'pytorch-ml' },

  // Plant Scout connections
  { source: 'plant-scout', target: 'pytorch-ml' },
  { source: 'plant-scout', target: 'python' },

  // Task Server connections
  { source: 'task-server', target: 'java' },

  // CommuneOS connections
  { source: 'communeos', target: 'fastapi-django' },
  { source: 'communeos', target: 'typescript-react' },
  { source: 'communeos', target: 'vector-dbs' },
  { source: 'communeos', target: 'multi-agent' },

  // Blog connections
  { source: 'hpc-kernels', target: 'cuda' },
  { source: 'hpc-kernels', target: 'python' },
  { source: 'cuda-perf', target: 'cuda' },
  { source: 'communeos-development-story', target: 'communeos' },
  { source: 'communeos-development-story', target: 'multi-agent' },
  { source: 'communeos-development-story', target: 'vector-dbs' }
];

const WIDTH = 320;
const HEIGHT = 260;

// Deterministic pseudo-random number generator to satisfy react-hooks/purity rules
const pseudoRandom = (seed: number) => {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
};

const KnowledgeGraph: React.FC = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<'all' | 'project' | 'blog' | 'skill'>('all');
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  // Zoom and Pan state
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);

  const panStartRef = useRef({ x: 0, y: 0 });
  const isPanningRef = useRef(false);
  
  // Physics nodes ref to keep layout persistent and run calculation outside React state cycle if needed
  const nodesRef = useRef<GraphNode[]>(
    INITIAL_NODES.map((node, index) => {
      // Place initial nodes in a circle with noise
      const angle = (index / INITIAL_NODES.length) * Math.PI * 2;
      const radius = 60 + pseudoRandom(index) * 20;
      return {
        ...node,
        x: WIDTH / 2 + Math.cos(angle) * radius,
        y: HEIGHT / 2 + Math.sin(angle) * radius,
        vx: 0,
        vy: 0,
      } as GraphNode;
    })
  );

  const [nodes, setNodes] = useState<GraphNode[]>([]);
  const draggedNodeIdRef = useRef<string | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  // Trigger state synchronization from ref values
  useEffect(() => {
    setNodes([...nodesRef.current]);
  }, []);

  // Recenter helper
  const handleRecenter = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    nodesRef.current = INITIAL_NODES.map((node, index) => {
      const angle = (index / INITIAL_NODES.length) * Math.PI * 2;
      const radius = 60 + pseudoRandom(index + 100) * 20;
      return {
        ...node,
        x: WIDTH / 2 + Math.cos(angle) * radius,
        y: HEIGHT / 2 + Math.sin(angle) * radius,
        vx: 0,
        vy: 0,
      } as GraphNode;
    });
    setNodes([...nodesRef.current]);
  };

  // Physics loop
  useEffect(() => {
    let animationId: number;

    const tick = () => {
      const currentNodes = nodesRef.current;
      const len = currentNodes.length;

      // 1. Repulsion force between all active nodes
      const repulsionStrength = 180;
      const repelDistLimit = 120;
      for (let i = 0; i < len; i++) {
        const nodeA = currentNodes[i];
        for (let j = i + 1; j < len; j++) {
          const nodeB = currentNodes[j];
          
          let dx = nodeB.x - nodeA.x;
          const dy = nodeB.y - nodeA.y;
          if (dx === 0) dx = 0.1; // Prevent NaN
          const distSq = dx * dx + dy * dy;
          const dist = Math.sqrt(distSq);

          if (dist < repelDistLimit) {
            const force = repulsionStrength / (distSq + 10);
            const fx = (dx / dist) * force;
            const fy = (dy / dist) * force;

            if (nodeA.id !== draggedNodeIdRef.current) {
              nodeA.vx -= fx;
              nodeA.vy -= fy;
            }
            if (nodeB.id !== draggedNodeIdRef.current) {
              nodeB.vx += fx;
              nodeB.vy += fy;
            }
          }
        }
      }

      // 2. Attraction force along links
      const attractionStrength = 0.04;
      const restLength = 45;
      INITIAL_LINKS.forEach((link) => {
        const sourceNode = currentNodes.find(n => n.id === link.source);
        const targetNode = currentNodes.find(n => n.id === link.target);

        if (sourceNode && targetNode) {
          const dx = targetNode.x - sourceNode.x;
          const dy = targetNode.y - sourceNode.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 0.1;
          
          const force = attractionStrength * (dist - restLength);
          const fx = (dx / dist) * force;
          const fy = (dy / dist) * force;

          if (sourceNode.id !== draggedNodeIdRef.current) {
            sourceNode.vx += fx;
            sourceNode.vy += fy;
          }
          if (targetNode.id !== draggedNodeIdRef.current) {
            targetNode.vx -= fx;
            targetNode.vy -= fy;
          }
        }
      });

      // 3. Gravity pulling nodes towards center
      const gravity = 0.015;
      const cx = WIDTH / 2;
      const cy = HEIGHT / 2;
      for (let i = 0; i < len; i++) {
        const node = currentNodes[i];
        if (node.id === draggedNodeIdRef.current) continue;

        node.vx += (cx - node.x) * gravity;
        node.vy += (cy - node.y) * gravity;
      }

      // 4. Update coordinates & apply damping
      const damping = 0.82;
      for (let i = 0; i < len; i++) {
        const node = currentNodes[i];
        if (node.id === draggedNodeIdRef.current) continue;

        node.vx *= damping;
        node.vy *= damping;
        
        node.x += node.vx;
        node.y += node.vy;

        // Boundaries clamp to avoid flying out
        node.x = Math.max(12, Math.min(WIDTH - 12, node.x));
        node.y = Math.max(12, Math.min(HEIGHT - 12, node.y));
      }

      setNodes([...currentNodes]);
      animationId = requestAnimationFrame(tick);
    };

    animationId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationId);
  }, []);

  // Zoom and Pan Handlers
  const handleWheel = (e: React.WheelEvent<SVGSVGElement>) => {
    e.preventDefault();
    if (!svgRef.current) return;

    const rect = svgRef.current.getBoundingClientRect();
    const mouseX = ((e.clientX - rect.left) / rect.width) * WIDTH;
    const mouseY = ((e.clientY - rect.top) / rect.height) * HEIGHT;

    const zoomFactor = e.deltaY < 0 ? 1.15 : 1 / 1.15;
    const nextZoom = Math.max(0.5, Math.min(3, zoom * zoomFactor));

    setPan(prev => ({
      x: mouseX - (mouseX - prev.x) * (nextZoom / zoom),
      y: mouseY - (mouseY - prev.y) * (nextZoom / zoom)
    }));
    setZoom(nextZoom);
  };

  const handleBgMouseDown = (e: React.MouseEvent<SVGSVGElement>) => {
    if (e.button !== 0) return; // Only left click for pan
    // If target is the SVG backdrop or lines, start panning
    if (e.target === e.currentTarget || (e.target as SVGElement).tagName === 'line') {
      isPanningRef.current = true;
      setIsPanning(true);
      panStartRef.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
    }
  };

  const handleBgTouchStart = (e: React.TouchEvent<SVGSVGElement>) => {
    // Single touch on backdrop starts pan
    if (e.touches.length === 1 && (e.target === e.currentTarget || (e.target as SVGElement).tagName === 'line')) {
      isPanningRef.current = true;
      setIsPanning(true);
      const touch = e.touches[0];
      panStartRef.current = { x: touch.clientX - pan.x, y: touch.clientY - pan.y };
    }
  };

  // Drag handlers
  const handleMouseDown = (e: React.MouseEvent<SVGElement>, nodeId: string) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent background click / pan
    draggedNodeIdRef.current = nodeId;
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (isPanningRef.current) {
      setPan({
        x: e.clientX - panStartRef.current.x,
        y: e.clientY - panStartRef.current.y
      });
      return;
    }

    if (!draggedNodeIdRef.current || !svgRef.current) return;
    
    // Get mouse coordinates relative to SVG elements
    const rect = svgRef.current.getBoundingClientRect();
    const svgX = ((e.clientX - rect.left) / rect.width) * WIDTH;
    const svgY = ((e.clientY - rect.top) / rect.height) * HEIGHT;

    // Convert SVG coordinates back to graph-local coordinates (reverse pan and zoom)
    const graphX = (svgX - pan.x) / zoom;
    const graphY = (svgY - pan.y) / zoom;

    const node = nodesRef.current.find(n => n.id === draggedNodeIdRef.current);
    if (node) {
      node.x = graphX;
      node.y = graphY;
      node.vx = 0;
      node.vy = 0;
    }
  };

  const handleMouseUpOrLeave = () => {
    draggedNodeIdRef.current = null;
    isPanningRef.current = false;
    setIsPanning(false);
  };

  // Touch support for mobile dragging
  const handleTouchStart = (nodeId: string) => {
    draggedNodeIdRef.current = nodeId;
  };

  const handleTouchMove = (e: React.TouchEvent<SVGSVGElement>) => {
    if (isPanningRef.current && e.touches.length === 1) {
      const touch = e.touches[0];
      setPan({
        x: touch.clientX - panStartRef.current.x,
        y: touch.clientY - panStartRef.current.y
      });
      return;
    }

    if (!draggedNodeIdRef.current || !svgRef.current) return;
    
    const rect = svgRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const svgX = ((touch.clientX - rect.left) / rect.width) * WIDTH;
    const svgY = ((touch.clientY - rect.top) / rect.height) * HEIGHT;

    const graphX = (svgX - pan.x) / zoom;
    const graphY = (svgY - pan.y) / zoom;

    const node = nodesRef.current.find(n => n.id === draggedNodeIdRef.current);
    if (node) {
      node.x = graphX;
      node.y = graphY;
      node.vx = 0;
      node.vy = 0;
    }
  };

  const handleNodeClick = (node: GraphNode) => {
    setSelectedNodeId(node.id === selectedNodeId ? null : node.id);
    if (node.type === 'project') {
      navigate(`/projects/${node.id}`);
    } else if (node.type === 'blog') {
      navigate(`/blog/${node.id}`);
    }
  };

  // Determine connected nodes for highlighting
  const getConnectedNodeIds = (nodeId: string | null): Set<string> => {
    const connected = new Set<string>();
    if (!nodeId) return connected;
    connected.add(nodeId);
    INITIAL_LINKS.forEach(link => {
      if (link.source === nodeId) {
        connected.add(link.target);
      } else if (link.target === nodeId) {
        connected.add(link.source);
      }
    });
    return connected;
  };

  const activeFocusId = hoveredNodeId || selectedNodeId;
  const connectedIds = getConnectedNodeIds(activeFocusId);
  const focusedNode = nodes.find(n => n.id === activeFocusId);

  // Helper check if a node is visible based on filter
  const isNodeVisible = (node: GraphNode) => {
    if (filter === 'all') return true;
    return node.type === filter;
  };

  return (
    <div className="space-y-4">
      {/* Header and Recenter */}
      <div className="flex justify-between items-center">
        <h3 className="text-[10px] font-bold text-text-main/30 uppercase tracking-[0.3em] flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-syntax-green animate-pulse shadow-[0_0_8px_rgba(195,232,141,0.6)]"></span>
          Knowledge_Graph
        </h3>
        <button 
          onClick={handleRecenter}
          className="text-[10px] text-text-main/40 hover:text-syntax-blue transition-colors flex items-center gap-1 font-mono hover:underline"
          title="Recenter Force Layout"
        >
          <span className="material-symbols-outlined text-xs">restart_alt</span>
          recenter
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-1.5 p-0.5 bg-white/5 border border-border-glass rounded-lg">
        {(['all', 'project', 'blog', 'skill'] as const).map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`flex-1 text-[11px] uppercase tracking-wider py-1 rounded transition-all font-mono ${
              filter === type 
                ? 'bg-syntax-blue/25 text-white font-bold border border-syntax-blue/40 shadow-[0_0_8px_rgba(130,170,255,0.25)]' 
                : 'text-text-main/50 hover:text-text-main/90'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Graph Display */}
      <div className="relative aspect-[320/260] w-full border border-border-glass rounded-xl bg-bg-deep/80 backdrop-blur-md overflow-hidden shadow-[inset_0_0_20px_rgba(0,0,0,0.6)]">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none"></div>
        
        <svg
          ref={svgRef}
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          className={`w-full h-full select-none ${isPanning ? 'cursor-grabbing' : 'cursor-grab'}`}
          onWheel={handleWheel}
          onMouseDown={handleBgMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          onTouchStart={handleBgTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleMouseUpOrLeave}
        >
          {/* Zoom and Pan group wrapper */}
          <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}>
            {/* Links Render */}
            {INITIAL_LINKS.map((link, i) => {
              const sourceNode = nodes.find(n => n.id === link.source);
              const targetNode = nodes.find(n => n.id === link.target);
              if (!sourceNode || !targetNode) return null;

              // Highlight connections if hovered/selected
              const isHighlighted = activeFocusId 
                ? connectedIds.has(link.source) && connectedIds.has(link.target)
                : true;

              const isDimmed = activeFocusId && !isHighlighted;
              
              // Render links only if both nodes are in the active filters
              const isVisible = isNodeVisible(sourceNode) && isNodeVisible(targetNode);

              return (
                <line
                  key={`link-${i}`}
                  x1={sourceNode.x}
                  y1={sourceNode.y}
                  x2={targetNode.x}
                  y2={targetNode.y}
                  stroke={isHighlighted ? '#82aaff' : 'rgba(255,255,255,0.07)'}
                  strokeWidth={isHighlighted ? 1.2 : 0.8}
                  strokeDasharray={sourceNode.type === 'blog' || targetNode.type === 'blog' ? '2 2' : undefined}
                  className="transition-all duration-300"
                  style={{
                    opacity: isVisible ? (isHighlighted ? 0.7 : isDimmed ? 0.08 : 0.25) : 0,
                  }}
                />
              );
            })}

            {/* Nodes Render */}
            {nodes.map((node) => {
              const isHighlighted = activeFocusId ? connectedIds.has(node.id) : true;
              const isDimmed = activeFocusId && !isHighlighted;
              const isCurrent = activeFocusId === node.id;
              
              // Color mapping matching UI palette
              let nodeColor = node.color;
              if (node.type === 'project') nodeColor = '#82aaff'; // syntax-blue
              else if (node.type === 'blog') nodeColor = '#ffcb6b'; // syntax-yellow
              else if (node.type === 'skill') nodeColor = '#c792ea'; // syntax-purple

              const isVisible = isNodeVisible(node);
              const nodeRadius = node.type === 'skill' ? 4 : 5.5;

              return (
                <g 
                  key={node.id}
                  style={{
                    opacity: isVisible ? (isHighlighted ? 1 : isDimmed ? 0.2 : 0.8) : 0,
                    pointerEvents: isVisible ? 'auto' : 'none'
                  }}
                  className="transition-all duration-300 cursor-pointer"
                  onMouseEnter={() => setHoveredNodeId(node.id)}
                  onMouseLeave={() => setHoveredNodeId(null)}
                  onClick={() => handleNodeClick(node)}
                  onMouseDown={(e) => handleMouseDown(e, node.id)}
                  onTouchStart={() => handleTouchStart(node.id)}
                >
                  {/* Node Outer Glow */}
                  {(isCurrent || (activeFocusId && isHighlighted)) && (
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={nodeRadius + 6}
                      fill={nodeColor}
                      opacity={isCurrent ? 0.35 : 0.15}
                      className="animate-pulse"
                    />
                  )}

                  {/* Node Center Dot */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={isCurrent ? nodeRadius + 1.5 : nodeRadius}
                    fill={nodeColor}
                    stroke="#111827"
                    strokeWidth={1.5}
                    className="transition-all duration-300"
                  />

                  {/* Node Label (show always if hovered/selected, or small text if skill/project to mimic obsidian graph) */}
                  {(isCurrent || activeFocusId === null) && (
                    <text
                      x={node.x}
                      y={node.y - (nodeRadius + 6)}
                      textAnchor="middle"
                      fill={isCurrent ? '#ffffff' : '#f1f5f9'}
                      fontSize={isCurrent ? '11px' : '8.5px'}
                      fontWeight={isCurrent ? 'bold' : '500'}
                      className="pointer-events-none font-mono tracking-tight filter drop-shadow-[0_1px_3px_rgba(0,0,0,0.95)]"
                      style={{
                        opacity: isCurrent ? 1 : node.type === 'skill' ? 0.6 : 0.85
                      }}
                    >
                      {node.label}
                    </text>
                  )}
                </g>
              );
            })}
          </g>
        </svg>

        {/* Zoom Controls Overlay */}
        <div className="absolute bottom-3 right-3 flex gap-1.5 bg-black/50 backdrop-blur-md border border-border-glass rounded-lg px-2 py-1 z-20">
          <button 
            onClick={() => setZoom(z => Math.min(3, z * 1.15))}
            className="text-xs text-text-main/60 hover:text-syntax-blue w-5 h-5 flex items-center justify-center font-bold transition-colors select-none"
            title="Zoom In"
          >
            +
          </button>
          <button 
            onClick={() => setZoom(z => Math.max(0.5, z / 1.15))}
            className="text-xs text-text-main/60 hover:text-syntax-blue w-5 h-5 flex items-center justify-center font-bold transition-colors select-none"
            title="Zoom Out"
          >
            -
          </button>
          <button 
            onClick={() => { setZoom(1); setPan({ x: 0, y: 0 }); }}
            className="text-[10px] text-text-main/80 font-bold hover:text-syntax-blue px-1.5 h-5 flex items-center justify-center transition-colors font-mono select-none"
            title="Reset Zoom & Pan"
          >
            {zoom.toFixed(1)}x
          </button>
        </div>
      </div>

      {/* Info Card at Bottom of Graph */}
      <div className="p-3 bg-white/5 border border-border-glass rounded-lg min-h-[80px] flex flex-col justify-center transition-all duration-300">
        {focusedNode ? (
          <div className="space-y-1.5 animate-fade-in">
            <div className="flex justify-between items-baseline">
              <span className="text-xs font-bold text-white tracking-tight uppercase truncate max-w-[70%]">
                {focusedNode.label}
              </span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono uppercase tracking-widest font-bold ${
                focusedNode.type === 'project' 
                  ? 'bg-syntax-blue/20 text-syntax-blue border border-syntax-blue/30 shadow-[0_0_8px_rgba(130,170,255,0.15)]'
                  : focusedNode.type === 'blog'
                    ? 'bg-syntax-yellow/20 text-syntax-yellow border border-syntax-yellow/30 shadow-[0_0_8px_rgba(255,203,107,0.15)]'
                    : 'bg-syntax-purple/20 text-syntax-purple border border-syntax-purple/30 shadow-[0_0_8px_rgba(199,146,234,0.15)]'
              }`}>
                {focusedNode.type}
              </span>
            </div>
            <p className="text-xs text-text-main/80 leading-normal italic line-clamp-2">
              {focusedNode.info}
            </p>
            {(focusedNode.type === 'project' || focusedNode.type === 'blog') && (
              <span className="text-[10px] text-syntax-blue hover:text-white font-bold tracking-tight block pt-0.5 hover:underline cursor-pointer">
                Click to explore details &rarr;
              </span>
            )}
          </div>
        ) : (
          <div className="text-center py-2">
            <p className="text-xs text-text-main/60 uppercase tracking-widest font-mono font-medium">
              Hover/Drag nodes to inspect links
            </p>
            <p className="text-[10px] text-text-main/40 font-mono mt-1">
              Click projects or blogs to navigate
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default KnowledgeGraph;
