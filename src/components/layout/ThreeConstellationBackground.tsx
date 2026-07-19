import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeConstellationBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0c10, 0.0018);

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.z = 400;

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // 4. Create Constellation Particles & Lines
    const particleCount = 140;
    const maxDistance = 125;
    const positions = new Float32Array(particleCount * 3);
    const velocities: { x: number; y: number; z: number }[] = [];

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 800;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 800;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 800;

      velocities.push({
        x: (Math.random() - 0.5) * 0.4,
        y: (Math.random() - 0.5) * 0.4,
        z: (Math.random() - 0.5) * 0.4
      });
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Particle Material
    const particleMaterial = new THREE.PointsMaterial({
      color: 0x82aaff,
      size: 3.5,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending
    });

    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);

    // Line connections geometry
    const linePositions = new Float32Array(particleCount * particleCount * 6);
    const lineColors = new Float32Array(particleCount * particleCount * 6);
    const lineGeometry = new THREE.BufferGeometry();

    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    lineGeometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending
    });

    const lineSystem = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lineSystem);

    // 3D Orbital Rings (Constellation Grid aesthetics)
    const ringGroup = new THREE.Group();
    
    const ringGeo1 = new THREE.TorusGeometry(240, 0.5, 16, 120);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0xc792ea,
      wireframe: true,
      transparent: true,
      opacity: 0.12
    });
    const ringMesh1 = new THREE.Mesh(ringGeo1, ringMat1);
    ringMesh1.rotation.x = Math.PI / 3;
    ringGroup.add(ringMesh1);

    const ringGeo2 = new THREE.TorusGeometry(340, 0.4, 16, 120);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x82aaff,
      wireframe: true,
      transparent: true,
      opacity: 0.09
    });
    const ringMesh2 = new THREE.Mesh(ringGeo2, ringMat2);
    ringMesh2.rotation.y = Math.PI / 4;
    ringGroup.add(ringMesh2);

    scene.add(ringGroup);

    // Interaction Variables
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    let scrollY = 0;
    let targetScrollY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX - window.innerWidth / 2) * 0.4;
      targetMouseY = (e.clientY - window.innerHeight / 2) * 0.4;
    };

    const handleScroll = () => {
      targetScrollY = window.scrollY || document.documentElement.scrollTop;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Lerp Mouse and Scroll
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;
      scrollY += (targetScrollY - scrollY) * 0.05;

      camera.position.x = mouseX * 0.5;
      camera.position.y = -mouseY * 0.5 + scrollY * 0.15;
      camera.lookAt(scene.position);

      ringGroup.rotation.y += 0.0012;
      ringGroup.rotation.x += 0.0006;

      // Update particle positions
      const posAttr = particleGeometry.attributes.position as THREE.BufferAttribute;
      const posArray = posAttr.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        let px = posArray[i * 3];
        let py = posArray[i * 3 + 1];
        let pz = posArray[i * 3 + 2];

        px += velocities[i].x;
        py += velocities[i].y;
        pz += velocities[i].z;

        // Bounce inside bounding box [-400, 400]
        if (px < -400 || px > 400) velocities[i].x *= -1;
        if (py < -400 || py > 400) velocities[i].y *= -1;
        if (pz < -400 || pz > 400) velocities[i].z *= -1;

        posArray[i * 3] = px;
        posArray[i * 3 + 1] = py;
        posArray[i * 3 + 2] = pz;
      }
      posAttr.needsUpdate = true;

      // Calculate connections between particles
      let lineIndex = 0;
      let colorIndex = 0;

      const linePosAttr = lineGeometry.attributes.position as THREE.BufferAttribute;
      const lineColAttr = lineGeometry.attributes.color as THREE.BufferAttribute;
      const linePosArray = linePosAttr.array as Float32Array;
      const lineColArray = lineColAttr.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        for (let j = i + 1; j < particleCount; j++) {
          const dx = posArray[i * 3] - posArray[j * 3];
          const dy = posArray[i * 3 + 1] - posArray[j * 3 + 1];
          const dz = posArray[i * 3 + 2] - posArray[j * 3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < maxDistance) {
            const alpha = 1 - dist / maxDistance;

            linePosArray[lineIndex++] = posArray[i * 3];
            linePosArray[lineIndex++] = posArray[i * 3 + 1];
            linePosArray[lineIndex++] = posArray[i * 3 + 2];

            linePosArray[lineIndex++] = posArray[j * 3];
            linePosArray[lineIndex++] = posArray[j * 3 + 1];
            linePosArray[lineIndex++] = posArray[j * 3 + 2];

            // Neon Blue -> Purple Gradient
            const r = 0.51 + 0.27 * alpha;
            const g = 0.66 + 0.1 * alpha;
            const b = 1.0;

            lineColArray[colorIndex++] = r * alpha;
            lineColArray[colorIndex++] = g * alpha;
            lineColArray[colorIndex++] = b * alpha;

            lineColArray[colorIndex++] = r * alpha;
            lineColArray[colorIndex++] = g * alpha;
            lineColArray[colorIndex++] = b * alpha;
          }
        }
      }

      lineGeometry.setDrawRange(0, lineIndex / 3);
      linePosAttr.needsUpdate = true;
      lineColAttr.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      particleGeometry.dispose();
      particleMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 pointer-events-none z-0 opacity-75 transition-opacity duration-1000"
      aria-hidden="true"
    />
  );
};

export default ThreeConstellationBackground;
