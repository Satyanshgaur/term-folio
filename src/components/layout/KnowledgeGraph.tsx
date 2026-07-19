import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';

interface GraphNode {
  id: string;
  label: string;
  type: 'project' | 'blog' | 'skill';
  color: string;
  info: string;
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
}

interface GraphLink {
  source: string;
  target: string;
}

const INITIAL_NODES_DATA = [
  // Projects
  { id: 'satellite-optimizer', label: 'Satellite Optimizer', type: 'project' as const, color: '#82aaff', info: 'Multi-Satellite LEO Simulator' },
  { id: 'graphmem', label: 'GraphMem (GraphRAG)', type: 'project' as const, color: '#82aaff', info: 'Local Graph RAG Memory Engine' },
  { id: 'orbit-ops', label: 'Orbit Ops', type: 'project' as const, color: '#82aaff', info: 'Hyperlocal AQI Forecasting Platform' },
  { id: 'sahai-ai', label: 'Sahai AI', type: 'project' as const, color: '#82aaff', info: 'AI Student Resilience Ecosystem' },
  { id: 'plant-scout', label: 'Plant Scout', type: 'project' as const, color: '#82aaff', info: 'Autonomous CV Plant Classifier' },
  { id: 'task-server', label: 'Task Server', type: 'project' as const, color: '#82aaff', info: 'Java Multithreaded TCP Server' },
  { id: 'communeos', label: 'CommuneOS', type: 'project' as const, color: '#82aaff', info: 'Paytm Hackathon Multi-Agent Winner' },

  // Blogs
  { id: 'hpc-kernels', label: 'HPC Kernels Blog', type: 'blog' as const, color: '#ffcb6b', info: 'Writing Custom CUDA Kernels' },
  { id: 'cuda-perf', label: 'CUDA Shared Memory Blog', type: 'blog' as const, color: '#ffcb6b', info: 'GPU Hierarchy Optimizations' },
  { id: 'communeos-development-story', label: 'CommuneOS Development Blog', type: 'blog' as const, color: '#ffcb6b', info: 'Hackathon Post-Mortem Details' },

  // Skills
  { id: 'python', label: 'Python', type: 'skill' as const, color: '#c792ea', info: 'Scientific Comp. & ML' },
  { id: 'java', label: 'Java', type: 'skill' as const, color: '#c792ea', info: 'Multithreading & Sockets' },
  { id: 'cuda', label: 'CUDA & HPC', type: 'skill' as const, color: '#c792ea', info: 'GPU Hardware Optimization' },
  { id: 'typescript-react', label: 'React / TS', type: 'skill' as const, color: '#c792ea', info: 'UI & App Development' },
  { id: 'fastapi-django', label: 'FastAPI / Django', type: 'skill' as const, color: '#c792ea', info: 'Backend Architectures' },
  { id: 'pytorch-ml', label: 'PyTorch / ML', type: 'skill' as const, color: '#c792ea', info: 'Deep Learning Models' },
  { id: 'vector-dbs', label: 'Chroma / FAISS', type: 'skill' as const, color: '#c792ea', info: 'Vector Databases & RAG' },
  { id: 'multi-agent', label: 'Multi-Agent Systems', type: 'skill' as const, color: '#c792ea', info: 'agentfield & Orchestrations' },
  { id: 'sqlite-postgres', label: 'SQLite / Postgres', type: 'skill' as const, color: '#c792ea', info: 'Data Persistence Layers' }
];

const INITIAL_LINKS: GraphLink[] = [
  { source: 'satellite-optimizer', target: 'python' },
  { source: 'satellite-optimizer', target: 'pytorch-ml' },
  { source: 'graphmem', target: 'typescript-react' },
  { source: 'graphmem', target: 'sqlite-postgres' },
  { source: 'graphmem', target: 'vector-dbs' },
  { source: 'graphmem', target: 'cuda' },
  { source: 'orbit-ops', target: 'fastapi-django' },
  { source: 'orbit-ops', target: 'typescript-react' },
  { source: 'orbit-ops', target: 'sqlite-postgres' },
  { source: 'sahai-ai', target: 'fastapi-django' },
  { source: 'sahai-ai', target: 'typescript-react' },
  { source: 'sahai-ai', target: 'vector-dbs' },
  { source: 'sahai-ai', target: 'pytorch-ml' },
  { source: 'plant-scout', target: 'pytorch-ml' },
  { source: 'plant-scout', target: 'python' },
  { source: 'task-server', target: 'java' },
  { source: 'communeos', target: 'fastapi-django' },
  { source: 'communeos', target: 'typescript-react' },
  { source: 'communeos', target: 'vector-dbs' },
  { source: 'communeos', target: 'multi-agent' },
  { source: 'hpc-kernels', target: 'cuda' },
  { source: 'hpc-kernels', target: 'python' },
  { source: 'cuda-perf', target: 'cuda' },
  { source: 'communeos-development-story', target: 'communeos' },
  { source: 'communeos-development-story', target: 'multi-agent' },
  { source: 'communeos-development-story', target: 'vector-dbs' }
];

const pseudoRandom = (seed: number) => {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
};

const KnowledgeGraph: React.FC = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<'all' | 'project' | 'blog' | 'skill'>('all');
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [screenCoords, setScreenCoords] = useState<{ id: string; x: number; y: number; label: string; type: string }[]>([]);

  // ESC key to exit fullscreen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen]);

  // 3D Physics nodes ref
  const nodesRef = useRef<GraphNode[]>(
    INITIAL_NODES_DATA.map((node, i) => {
      const radius = 100 + pseudoRandom(i) * 60;
      const theta = pseudoRandom(i + 10) * Math.PI * 2;
      const phi = (pseudoRandom(i + 20) - 0.5) * Math.PI;
      return {
        ...node,
        x: radius * Math.cos(phi) * Math.sin(theta),
        y: radius * Math.sin(phi),
        z: radius * Math.cos(phi) * Math.cos(theta),
        vx: 0,
        vy: 0,
        vz: 0
      };
    })
  );

  const filterRef = useRef(filter);
  filterRef.current = filter;

  const activeFocusIdRef = useRef<string | null>(null);
  activeFocusIdRef.current = hoveredNodeId || selectedNodeId;

  // 3D Scene setup
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 320;
    const height = container.clientHeight || 260;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0c10, 0.002);

    const camera = new THREE.PerspectiveCamera(50, width / height, 1, 1000);
    camera.position.set(0, 0, 320);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x82aaff, 2, 500);
    pointLight.position.set(100, 100, 150);
    scene.add(pointLight);

    // Node Group
    const graphGroup = new THREE.Group();
    scene.add(graphGroup);

    // Create 3D Meshes for Nodes
    const sphereGeoMap = {
      project: new THREE.SphereGeometry(7, 24, 24),
      blog: new THREE.SphereGeometry(6, 24, 24),
      skill: new THREE.SphereGeometry(4.5, 24, 24)
    };

    const nodeMeshMap = new Map<string, THREE.Mesh>();

    nodesRef.current.forEach(node => {
      let hexColor = 0x82aaff;
      if (node.type === 'blog') hexColor = 0xffcb6b;
      if (node.type === 'skill') hexColor = 0xc792ea;

      const mat = new THREE.MeshStandardMaterial({
        color: hexColor,
        emissive: hexColor,
        emissiveIntensity: 0.4,
        roughness: 0.2,
        metalness: 0.5
      });

      const mesh = new THREE.Mesh(sphereGeoMap[node.type], mat);
      mesh.userData = { id: node.id, type: node.type, label: node.label };
      mesh.position.set(node.x, node.y, node.z);
      graphGroup.add(mesh);
      nodeMeshMap.set(node.id, mesh);
    });

    // Create 3D Lines Geometry for Links
    const linePositions = new Float32Array(INITIAL_LINKS.length * 6);
    const lineColors = new Float32Array(INITIAL_LINKS.length * 6);
    const lineGeo = new THREE.BufferGeometry();

    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    lineGeo.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));

    const lineMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });

    const lineSegments = new THREE.LineSegments(lineGeo, lineMat);
    graphGroup.add(lineSegments);

    // 3D Raycasting & Drag Interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    let isDraggingNode = false;
    let isOrbiting = false;
    let draggedNodeId: string | null = null;
    let previousMousePosition = { x: 0, y: 0 };
    const dragPlane = new THREE.Plane();
    const planeIntersect = new THREE.Vector3();

    const handleMouseDown = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);

      const visibleMeshes = Array.from(nodeMeshMap.entries())
        .filter(([id]) => {
          const node = nodesRef.current.find(n => n.id === id);
          return node && (filterRef.current === 'all' || node.type === filterRef.current);
        })
        .map(([, mesh]) => mesh);

      const intersects = raycaster.intersectObjects(visibleMeshes);

      if (intersects.length > 0) {
        isDraggingNode = true;
        draggedNodeId = intersects[0].object.userData.id;

        // Create a drag plane passing through hit point facing camera
        const hitPoint = intersects[0].point;
        const camDir = new THREE.Vector3();
        camera.getWorldDirection(camDir);
        dragPlane.setFromNormalAndCoplanarPoint(camDir.negate(), hitPoint);

        container.style.cursor = 'grabbing';
      } else {
        isOrbiting = true;
        previousMousePosition = { x: e.clientX, y: e.clientY };
        container.style.cursor = 'grabbing';
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      mouse.x = (mouseX / rect.width) * 2 - 1;
      mouse.y = -(mouseY / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);

      if (isDraggingNode && draggedNodeId) {
        if (raycaster.ray.intersectPlane(dragPlane, planeIntersect)) {
          const localPoint = graphGroup.worldToLocal(planeIntersect.clone());
          const node = nodesRef.current.find(n => n.id === draggedNodeId);
          if (node) {
            node.x = localPoint.x;
            node.y = localPoint.y;
            node.z = localPoint.z;
            node.vx = 0;
            node.vy = 0;
            node.vz = 0;
          }
        }
      } else if (isOrbiting) {
        const deltaX = e.clientX - previousMousePosition.x;
        const deltaY = e.clientY - previousMousePosition.y;

        graphGroup.rotation.y += deltaX * 0.008;
        graphGroup.rotation.x += deltaY * 0.008;

        previousMousePosition = { x: e.clientX, y: e.clientY };
      } else {
        const visibleMeshes = Array.from(nodeMeshMap.entries())
          .filter(([id]) => {
            const node = nodesRef.current.find(n => n.id === id);
            return node && (filterRef.current === 'all' || node.type === filterRef.current);
          })
          .map(([, mesh]) => mesh);

        const intersects = raycaster.intersectObjects(visibleMeshes);

        if (intersects.length > 0) {
          const hoveredId = intersects[0].object.userData.id;
          setHoveredNodeId(hoveredId);
          container.style.cursor = 'pointer';
        } else {
          setHoveredNodeId(null);
          container.style.cursor = 'grab';
        }
      }
    };

    const handleMouseUp = () => {
      isDraggingNode = false;
      isOrbiting = false;
      draggedNodeId = null;
      container.style.cursor = 'grab';
    };

    const handleClick = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(Array.from(nodeMeshMap.values()));

      if (intersects.length > 0) {
        const clickedId = intersects[0].object.userData.id;
        const clickedType = intersects[0].object.userData.type;
        setSelectedNodeId(prev => (prev === clickedId ? null : clickedId));

        if (clickedType === 'project') {
          if (isFullscreen) setIsFullscreen(false);
          navigate(`/projects/${clickedId}`);
        } else if (clickedType === 'blog') {
          if (isFullscreen) setIsFullscreen(false);
          navigate(`/blog/${clickedId}`);
        }
      }
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      camera.position.z = THREE.MathUtils.clamp(camera.position.z + e.deltaY * 0.3, 160, 550);
    };

    const domElem = renderer.domElement;
    domElem.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    domElem.addEventListener('click', handleClick);
    domElem.addEventListener('wheel', handleWheel, { passive: false });

    // Handle Container Resize
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 320;
      const h = container.clientHeight || 260;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Physics Loop & Render Animation
    let animId: number;

    const tick = () => {
      animId = requestAnimationFrame(tick);

      const nodes = nodesRef.current;
      const len = nodes.length;

      // Repulsion
      for (let i = 0; i < len; i++) {
        for (let j = i + 1; j < len; j++) {
          const nA = nodes[i];
          const nB = nodes[j];
          let dx = nB.x - nA.x;
          let dy = nB.y - nA.y;
          let dz = nB.z - nA.z;
          if (dx === 0 && dy === 0 && dz === 0) dx = 0.1;
          const distSq = dx * dx + dy * dy + dz * dz;
          const dist = Math.sqrt(distSq);

          if (dist < 150) {
            const force = 350 / (distSq + 10);
            const fx = (dx / dist) * force;
            const fy = (dy / dist) * force;
            const fz = (dz / dist) * force;

            if (nA.id !== draggedNodeId) {
              nA.vx -= fx; nA.vy -= fy; nA.vz -= fz;
            }
            if (nB.id !== draggedNodeId) {
              nB.vx += fx; nB.vy += fy; nB.vz += fz;
            }
          }
        }
      }

      // Attraction along links
      INITIAL_LINKS.forEach(link => {
        const s = nodes.find(n => n.id === link.source);
        const t = nodes.find(n => n.id === link.target);
        if (s && t) {
          const dx = t.x - s.x;
          const dy = t.y - s.y;
          const dz = t.z - s.z;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz) || 0.1;
          const force = 0.03 * (dist - 65);

          const fx = (dx / dist) * force;
          const fy = (dy / dist) * force;
          const fz = (dz / dist) * force;

          if (s.id !== draggedNodeId) {
            s.vx += fx; s.vy += fy; s.vz += fz;
          }
          if (t.id !== draggedNodeId) {
            t.vx -= fx; t.vy -= fy; t.vz -= fz;
          }
        }
      });

      // Gravity & damping
      for (let i = 0; i < len; i++) {
        const n = nodes[i];
        if (n.id !== draggedNodeId) {
          n.vx -= n.x * 0.012;
          n.vy -= n.y * 0.012;
          n.vz -= n.z * 0.012;

          n.vx *= 0.82;
          n.vy *= 0.82;
          n.vz *= 0.82;

          n.x += n.vx;
          n.y += n.vy;
          n.z += n.vz;
        }

        const mesh = nodeMeshMap.get(n.id);
        if (mesh) {
          mesh.position.set(n.x, n.y, n.z);

          const isFilterActive = filterRef.current === 'all' || n.type === filterRef.current;
          mesh.visible = isFilterActive;

          const isFocused = !activeFocusIdRef.current || activeFocusIdRef.current === n.id;
          const mat = mesh.material as THREE.MeshStandardMaterial;
          mat.emissiveIntensity = isFocused ? 0.6 : 0.15;
          mat.opacity = isFilterActive ? (isFocused ? 1.0 : 0.35) : 0;
          mat.transparent = true;
        }
      }

      // Update 3D Link Lines
      let lIdx = 0;
      let cIdx = 0;
      const lPosArr = lineGeo.attributes.position.array as Float32Array;
      const lColArr = lineGeo.attributes.color.array as Float32Array;

      INITIAL_LINKS.forEach(link => {
        const s = nodes.find(n => n.id === link.source);
        const t = nodes.find(n => n.id === link.target);
        if (s && t) {
          const sVisible = filterRef.current === 'all' || s.type === filterRef.current;
          const tVisible = filterRef.current === 'all' || t.type === filterRef.current;
          const visible = sVisible && tVisible;

          lPosArr[lIdx++] = s.x; lPosArr[lIdx++] = s.y; lPosArr[lIdx++] = s.z;
          lPosArr[lIdx++] = t.x; lPosArr[lIdx++] = t.y; lPosArr[lIdx++] = t.z;

          const isConnectedHover = activeFocusIdRef.current === s.id || activeFocusIdRef.current === t.id;
          const brightness = visible ? (isConnectedHover ? 1.0 : 0.25) : 0;

          lColArr[cIdx++] = 0.51 * brightness; lColArr[cIdx++] = 0.66 * brightness; lColArr[cIdx++] = 1.0 * brightness;
          lColArr[cIdx++] = 0.51 * brightness; lColArr[cIdx++] = 0.66 * brightness; lColArr[cIdx++] = 1.0 * brightness;
        }
      });

      lineGeo.attributes.position.needsUpdate = true;
      lineGeo.attributes.color.needsUpdate = true;

      if (!isOrbiting && !isDraggingNode) {
        graphGroup.rotation.y += 0.001;
      }

      // 2D Screen Projection for overlay labels
      const projectedCoords: { id: string; x: number; y: number; label: string; type: string }[] = [];
      const tempVec = new THREE.Vector3();

      const curWidth = container.clientWidth || 320;
      const curHeight = container.clientHeight || 260;

      nodes.forEach(n => {
        if (filterRef.current !== 'all' && n.type !== filterRef.current) return;

        const mesh = nodeMeshMap.get(n.id);
        if (mesh) {
          mesh.getWorldPosition(tempVec);
          tempVec.project(camera);

          if (tempVec.z < 1) {
            const screenX = (tempVec.x * 0.5 + 0.5) * curWidth;
            const screenY = (-(tempVec.y * 0.5) + 0.5) * curHeight;
            projectedCoords.push({
              id: n.id,
              x: screenX,
              y: screenY,
              label: n.label,
              type: n.type
            });
          }
        }
      });

      setScreenCoords(projectedCoords);
      renderer.render(scene, camera);
    };

    tick();

    (container as unknown as { resetCamera: () => void }).resetCamera = () => {
      graphGroup.rotation.set(0, 0, 0);
      camera.position.set(0, 0, 320);
    };

    return () => {
      cancelAnimationFrame(animId);
      domElem.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      domElem.removeEventListener('click', handleClick);
      domElem.removeEventListener('wheel', handleWheel);
      window.removeEventListener('resize', handleResize);

      if (container.contains(domElem)) {
        container.removeChild(domElem);
      }
      Object.values(sphereGeoMap).forEach(g => g.dispose());
      lineGeo.dispose();
      lineMat.dispose();
      renderer.dispose();
    };
  }, [navigate, isFullscreen]);

  const handleRecenter = () => {
    const container = containerRef.current as unknown as { resetCamera?: () => void };
    if (container && container.resetCamera) {
      container.resetCamera();
    }
  };

  const activeFocusId = hoveredNodeId || selectedNodeId;
  const focusedNode = INITIAL_NODES_DATA.find(n => n.id === activeFocusId);

  if (isFullscreen) {
    return (
      <div className="fixed inset-0 z-[200] p-6 bg-black/90 backdrop-blur-2xl flex flex-col font-mono animate-fade-in shadow-2xl overflow-hidden select-none">
        {/* Fullscreen Header */}
        <div className="flex justify-between items-center pb-4 border-b border-border-glass mb-4">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-syntax-green animate-pulse shadow-[0_0_12px_rgba(195,232,141,0.9)]"></span>
            <h3 className="text-sm font-bold text-text-main uppercase tracking-[0.3em]">
              Knowledge_Graph_3D // Fullscreen_Spatial_Explorer
            </h3>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={handleRecenter}
              className="px-3 py-1 bg-white/5 border border-border-glass rounded text-xs text-text-main/70 hover:text-syntax-blue hover:border-syntax-blue/40 transition-all uppercase tracking-widest flex items-center gap-1 font-mono"
            >
              <span className="material-symbols-outlined text-sm">restart_alt</span>
              recenter
            </button>
            <button 
              onClick={() => setIsFullscreen(false)}
              className="px-3 py-1 bg-syntax-blue/20 border border-syntax-blue/40 rounded text-xs text-syntax-blue hover:bg-syntax-blue/30 transition-all uppercase tracking-widest flex items-center gap-1 font-mono font-bold"
            >
              <span className="material-symbols-outlined text-sm">close</span>
              Exit Fullscreen [ESC]
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 p-1 bg-white/5 border border-border-glass rounded-lg mb-4 max-w-xl">
          {(['all', 'project', 'blog', 'skill'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`flex-1 text-xs uppercase tracking-wider py-1.5 rounded transition-all font-mono ${
                filter === type 
                  ? 'bg-syntax-blue/25 text-white font-bold border border-syntax-blue/40 shadow-[0_0_8px_rgba(130,170,255,0.25)]' 
                  : 'text-text-main/50 hover:text-text-main/90'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Fullscreen 3D Canvas */}
        <div className="relative flex-1 w-full border border-border-glass rounded-2xl bg-bg-deep/90 backdrop-blur-md overflow-hidden shadow-[inset_0_0_30px_rgba(0,0,0,0.8)]">
          <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing relative" />

          {/* Crisp Overlay Labels */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {screenCoords.map(node => {
              const isHovered = hoveredNodeId === node.id || selectedNodeId === node.id;
              return (
                <div
                  key={node.id}
                  style={{
                    transform: `translate(-50%, -100%) translate(${node.x}px, ${node.y - 12}px)`,
                    opacity: activeFocusId ? (isHovered ? 1 : 0.25) : (node.type === 'skill' ? 0.65 : 0.9)
                  }}
                  className={`absolute text-xs font-mono whitespace-nowrap transition-opacity pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] ${
                    isHovered ? 'text-white font-bold text-sm z-20' : 'text-text-main/80'
                  }`}
                >
                  {node.label}
                </div>
              );
            })}
          </div>

          <div className="absolute bottom-4 left-4 text-xs text-text-main/40 font-mono tracking-widest uppercase pointer-events-none bg-black/60 backdrop-blur-md px-3 py-1.5 border border-border-glass rounded">
            Drag Nodes to Pull // Drag Background to Orbit 360° // Scroll to Zoom
          </div>
        </div>

        {/* Bottom Info Card */}
        <div className="mt-4 p-4 bg-white/5 border border-border-glass rounded-xl min-h-[60px] flex items-center justify-between">
          {focusedNode ? (
            <div className="flex items-center justify-between w-full font-mono">
              <div>
                <span className="text-sm font-bold text-white tracking-tight uppercase mr-3">
                  {focusedNode.label}
                </span>
                <span className="text-xs text-text-main/70 italic">
                  {focusedNode.info}
                </span>
              </div>
              {(focusedNode.type === 'project' || focusedNode.type === 'blog') && (
                <span 
                  onClick={() => {
                    setIsFullscreen(false);
                    navigate(focusedNode.type === 'project' ? `/projects/${focusedNode.id}` : `/blog/${focusedNode.id}`);
                  }}
                  className="text-xs text-syntax-blue hover:text-white font-bold uppercase tracking-wider hover:underline cursor-pointer border border-syntax-blue/30 px-3 py-1 rounded bg-syntax-blue/10"
                >
                  Open Details &rarr;
                </span>
              )}
            </div>
          ) : (
            <div className="text-xs text-text-main/50 uppercase tracking-widest font-mono">
              Hover or drag 3D nodes to inspect relationships across systems and skills.
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 font-mono select-none">
      {/* Header and Recenter/Fullscreen */}
      <div className="flex justify-between items-center">
        <h3 className="text-[10px] font-bold text-text-main/40 uppercase tracking-[0.3em] flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-syntax-green animate-pulse shadow-[0_0_8px_rgba(195,232,141,0.8)]"></span>
          Knowledge_Graph_3D
        </h3>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleRecenter}
            className="text-[10px] text-text-main/50 hover:text-syntax-blue transition-colors flex items-center gap-1 font-mono hover:underline"
            title="Recenter 3D Viewport"
          >
            <span className="material-symbols-outlined text-xs">restart_alt</span>
            recenter
          </button>
          <button 
            onClick={() => setIsFullscreen(true)}
            className="text-[10px] text-syntax-blue hover:text-white transition-colors flex items-center gap-1 font-mono hover:underline font-bold flex items-center gap-1"
            title="Expand to Fullscreen 3D Explorer"
          >
            <span className="material-symbols-outlined text-xs">open_in_full</span>
            fullscreen
          </button>
        </div>
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

      {/* 3D WebGL Canvas Display */}
      <div className="relative aspect-[320/260] w-full border border-border-glass rounded-xl bg-bg-deep/90 backdrop-blur-md overflow-hidden shadow-[inset_0_0_20px_rgba(0,0,0,0.7)]">
        <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing relative" />

        {/* 2D Crisp Overlay Labels */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {screenCoords.map(node => {
            const isHovered = hoveredNodeId === node.id || selectedNodeId === node.id;
            return (
              <div
                key={node.id}
                style={{
                  transform: `translate(-50%, -100%) translate(${node.x}px, ${node.y - 10}px)`,
                  opacity: activeFocusId ? (isHovered ? 1 : 0.25) : (node.type === 'skill' ? 0.65 : 0.9)
                }}
                className={`absolute text-[8.5px] font-mono whitespace-nowrap transition-opacity pointer-events-none drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] ${
                  isHovered ? 'text-white font-bold text-[10px] z-20' : 'text-text-main/80'
                }`}
              >
                {node.label}
              </div>
            );
          })}
        </div>

        {/* Controls Guide */}
        <div className="absolute bottom-2 left-2 text-[9px] text-text-main/30 font-mono tracking-widest uppercase pointer-events-none">
          Drag Nodes // Drag BG Orbit // Scroll Zoom
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
              Drag Nodes or Orbit 3D Scene
            </p>
            <p className="text-[10px] text-text-main/40 font-mono mt-1">
              Click nodes to view full specs & journal
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default KnowledgeGraph;
