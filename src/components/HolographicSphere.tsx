'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function HolographicSphere() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    let scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer;
    let points: THREE.Points, smPoints: THREE.Points, sphereGroup: THREE.Group;
    let mouse = new THREE.Vector2(-100, -100);
    const particleCount = 5000;
    const sphereRadius = 80;
    
    let originalPositions: Float32Array, particleVelocities: Float32Array;

    function createInitialsParticles() {
      const particles: number[] = [];
      const pointsPerSegment = 150; 
      const depthLayers = 20;      
      const thickness = 12;         

      function sampleLine(start: THREE.Vector3, end: THREE.Vector3) {
        for (let j = 0; j < depthLayers; j++) { 
          const zOffset = (j - depthLayers / 2) * (thickness / depthLayers);
          for (let i = 0; i <= pointsPerSegment; i++) {
            const p = new THREE.Vector3().lerpVectors(start, end, i / pointsPerSegment);
            p.x += (Math.random() - 0.5) * 3;
            p.y += (Math.random() - 0.5) * 3;
            p.z = zOffset + (Math.random() - 0.5) * 3;
            particles.push(p.x, p.y, p.z);
          }
        }
      }

      const s_left = -60, s_right = -15, s_top = 25, s_bottom = -25, s_mid = 0;
      sampleLine(new THREE.Vector3(s_right, s_top, 0), new THREE.Vector3(s_left, s_top, 0));
      sampleLine(new THREE.Vector3(s_left, s_top, 0), new THREE.Vector3(s_left, s_mid, 0));
      sampleLine(new THREE.Vector3(s_left, s_mid, 0), new THREE.Vector3(s_right, s_mid, 0));
      sampleLine(new THREE.Vector3(s_right, s_mid, 0), new THREE.Vector3(s_right, s_bottom, 0));
      sampleLine(new THREE.Vector3(s_right, s_bottom, 0), new THREE.Vector3(s_left, s_bottom, 0));
      
      const m_left = 15, m_right = 60, m_top = 25, m_bottom = -25, m_mid_x = 37.5, m_mid_y = 0;
      sampleLine(new THREE.Vector3(m_left, m_bottom, 0), new THREE.Vector3(m_left, m_top, 0));
      sampleLine(new THREE.Vector3(m_left, m_top, 0), new THREE.Vector3(m_mid_x, m_mid_y, 0));
      sampleLine(new THREE.Vector3(m_mid_x, m_mid_y, 0), new THREE.Vector3(m_right, m_top, 0));
      sampleLine(new THREE.Vector3(m_right, s_top, 0), new THREE.Vector3(m_right, m_bottom, 0));

      return new Float32Array(particles);
    }

    function init() {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
      camera.position.z = 150;
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
      container.appendChild(renderer.domElement);
      
      sphereGroup = new THREE.Group();
      scene.add(sphereGroup);

      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);
      const baseSphereColor = new THREE.Color(0x00ffff);
      originalPositions = new Float32Array(particleCount * 3);
      particleVelocities = new Float32Array(particleCount * 3);

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const phi = Math.acos(-1 + (2 * i) / particleCount);
        const theta = Math.sqrt(particleCount * Math.PI) * phi;
        const x = sphereRadius * Math.cos(theta) * Math.sin(phi);
        const y = sphereRadius * Math.sin(theta) * Math.sin(phi);
        const z = sphereRadius * Math.cos(phi);
        positions[i3] = x; positions[i3 + 1] = y; positions[i3 + 2] = z;
        originalPositions[i3] = x; originalPositions[i3 + 1] = y; originalPositions[i3 + 2] = z;
        particleVelocities.fill(0, i3, i3 + 3);
        baseSphereColor.toArray(colors, i3);
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      const material = new THREE.PointsMaterial({
        size: 0.8, blending: THREE.AdditiveBlending, transparent: true,
        opacity: 0.8, depthWrite: false, vertexColors: true
      });
      points = new THREE.Points(geometry, material);
      sphereGroup.add(points);

      const initialsVertices = createInitialsParticles();
      const initialsGeometry = new THREE.BufferGeometry();
      initialsGeometry.setAttribute('position', new THREE.BufferAttribute(initialsVertices, 3));
      const initialsColors = new Float32Array(initialsVertices.length);
      const baseInitialsColor = new THREE.Color(0x009999);
      for(let i = 0; i < initialsVertices.length / 3; i++) {
        baseInitialsColor.toArray(initialsColors, i * 3);
      }
      initialsGeometry.setAttribute('color', new THREE.BufferAttribute(initialsColors, 3));
      const initialsMaterial = new THREE.PointsMaterial({
        size: 1.0, blending: THREE.AdditiveBlending, transparent: true,
        opacity: 0.4, depthWrite: false, vertexColors: true 
      });
      smPoints = new THREE.Points(initialsGeometry, initialsMaterial);
      scene.add(smPoints); 

      container.addEventListener('mousemove', onMouseMove);
      container.addEventListener('mouseleave', onMouseLeave);
      window.addEventListener('resize', onWindowResizeSphere);
    }

    function onMouseMove(event: MouseEvent) {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / container.clientWidth) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / container.clientHeight) * 2 + 1;
    }

    function onMouseLeave() { 
      mouse.x = -100; 
      mouse.y = -100; 
    }

    function onWindowResizeSphere() {
      if (!container || !camera || !renderer) return;
      if (container.clientWidth > 0 && container.clientHeight > 0) {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
      }
    }

    const glowingParticles = { sphere: [] as any[], initials: [] as any[] };

    function handleGlowing(pointsObject: THREE.Points, baseColor: number, particlePool: any[]) {
      if (Math.random() < 0.1) {
        particlePool.push({
          index: Math.floor(Math.random() * pointsObject.geometry.attributes.position.count),
          intensity: 1.0 
        });
      }
      const colors = pointsObject.geometry.attributes.color.array;
      const base = new THREE.Color(baseColor);
      for (let i = 0; i < colors.length / 3; i++) {
        const currentColor = new THREE.Color().fromArray(colors, i * 3);
        currentColor.lerp(base, 0.05);
        currentColor.toArray(colors, i * 3);
      }
      for (let i = particlePool.length - 1; i >= 0; i--) {
        const p = particlePool[i];
        const white = new THREE.Color(0xffffff);
        const currentColor = new THREE.Color().fromArray(colors, p.index * 3);
        currentColor.lerp(white, p.intensity);
        currentColor.toArray(colors, p.index * 3);
        p.intensity -= 0.05;
        if (p.intensity <= 0) particlePool.splice(i, 1);
      }
      pointsObject.geometry.attributes.color.needsUpdate = true;
    }

    function animateSphere() {
      if (!scene || !camera || !renderer || !points || !smPoints) {
        requestAnimationFrame(animateSphere);
        return;
      }

      requestAnimationFrame(animateSphere);

      if (sphereGroup) {
        sphereGroup.rotation.y += 0.0015;
        sphereGroup.rotation.x += 0.0006;
      }

      if (smPoints) {
        smPoints.position.y = Math.sin(Date.now() * 0.0005) * 2;
      }

      const positions = points.geometry.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const pos = new THREE.Vector3().fromArray(positions, i3);
        const originalPos = new THREE.Vector3().fromArray(originalPositions, i3);
        const velocity = new THREE.Vector3().fromArray(particleVelocities, i3);
        const mouse3D = new THREE.Vector3(mouse.x * sphereRadius, mouse.y * sphereRadius, 50);
        
        let force = new THREE.Vector3(0, 0, 0);
        if (pos.distanceTo(mouse3D) < 40) {
          const repulsion = new THREE.Vector3().subVectors(pos, mouse3D).normalize();
          force.add(repulsion.multiplyScalar(0.8));
        }
        const spring = new THREE.Vector3().subVectors(originalPos, pos);
        force.add(spring.multiplyScalar(0.01));
        velocity.multiplyScalar(0.95).add(force);
        pos.add(velocity);
        pos.toArray(positions, i3);
        velocity.toArray(particleVelocities, i3);
      }
      points.geometry.attributes.position.needsUpdate = true;

      handleGlowing(points, 0x00ffff, glowingParticles.sphere);
      handleGlowing(smPoints, 0x009999, glowingParticles.initials);

      renderer.render(scene, camera);
    }

    init();
    animateSphere();

    return () => {
      if (container) {
        container.removeEventListener('mousemove', onMouseMove);
        container.removeEventListener('mouseleave', onMouseLeave);
        window.removeEventListener('resize', onWindowResizeSphere);
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      }
      if (renderer) {
        renderer.dispose();
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="w-[200px] h-[200px] mb-6 cursor-grab"
    />
  );
}