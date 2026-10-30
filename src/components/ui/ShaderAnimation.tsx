/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface ShaderAnimationProps {
  className?: string;
  speedMultiplier?: number;
  waveDensity?: number;
  mode?: 'ambient' | 'interactive';
  isDark?: boolean;
}

export const ShaderAnimation: React.FC<ShaderAnimationProps> = ({
  className = '',
  speedMultiplier = 1.0,
  waveDensity = 1.0,
  mode = 'ambient',
  isDark = true
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [webGlSupported, setWebGlSupported] = useState(true);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // WebGL capability check
    try {
      const probe = document.createElement('canvas');
      const gl = probe.getContext('webgl') || probe.getContext('experimental-webgl');
      if (!gl) {
        setWebGlSupported(false);
        return;
      }
    } catch {
      setWebGlSupported(false);
      return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setWebGlSupported(false);
      return;
    }

    let renderer: THREE.WebGLRenderer | null = null;
    let animationFrameId = 0;

    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });
    } catch {
      setWebGlSupported(false);
      return;
    }

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    // Monochromatic Black and White GLSL Shader
    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      uniform float uTime;
      uniform vec2 uResolution;
      uniform float uDensity;
      uniform float uIsDark;
      uniform float uMode;
      varying vec2 vUv;

      // Pseudo-noise function
      float hash(vec2 p) {
        p = 50.0 * fract(p * 0.3183099 + vec2(0.71, 0.113));
        return -1.0 + 2.0 * fract(17.0 * fract(p.x * p.y * (p.x + p.y)));
      }

      float noise(in vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(mix(hash(i + vec2(0.0,0.0)), hash(i + vec2(1.0,0.0)), u.x),
                   mix(hash(i + vec2(0.0,1.0)), hash(i + vec2(1.0,1.0)), u.x), u.y);
      }

      void main() {
        vec2 st = (gl_FragCoord.xy * 2.0 - uResolution.xy) / min(uResolution.x, uResolution.y);
        
        // Multi-frequency wave contours
        float t = uTime * 0.35;
        float d = length(st);
        
        float n1 = noise(st * (2.4 * uDensity) + vec2(t * 0.2, -t * 0.15));
        float n2 = noise(st * (4.8 * uDensity) - vec2(t * 0.1, t * 0.25));
        
        float wave = sin(d * 8.0 - t * 2.0 + (n1 + 0.5 * n2) * 3.5);
        
        // Topographic isolines in pure black and white
        float contour = smoothstep(0.02, 0.0, abs(fract(wave * 2.5) - 0.5) - 0.38);
        float shimmer = 0.5 + 0.5 * sin(wave * 4.0 + t);
        
        float lum = mix(contour * 0.65, shimmer * 0.4, 0.45);
        
        // Intensity tuning for ambient background vs interactive mode
        float maxAlpha = uMode > 0.5 ? 0.35 : 0.14;
        float alpha = lum * maxAlpha;

        if (uIsDark < 0.5) {
          // Light mode: dark contours on white surface
          gl_FragColor = vec4(vec3(0.0), alpha * 0.85);
        } else {
          // Dark mode: white luminous contours on black surface
          gl_FragColor = vec4(vec3(1.0), alpha);
        }
      }
    `;

    const uniforms = {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(width, height) },
      uDensity: { value: waveDensity },
      uIsDark: { value: isDark ? 1.0 : 0.0 },
      uMode: { value: mode === 'interactive' ? 1.0 : 0.0 }
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
      depthWrite: false
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const quad = new THREE.Mesh(geometry, material);
    scene.add(quad);

    const clock = new THREE.Clock();

    const animate = () => {
      const elapsed = clock.getElapsedTime() * speedMultiplier;
      uniforms.uTime.value = elapsed;
      if (renderer) {
        renderer.render(scene, camera);
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Pause on hidden document
    const handleVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationFrameId);
      } else {
        clock.start();
        animate();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Responsive resize
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: newW, height: newH } = entry.contentRect;
        if (newW > 0 && newH > 0 && renderer) {
          renderer.setSize(newW, newH);
          uniforms.uResolution.value.set(newW, newH);
        }
      }
    });
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animationFrameId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      resizeObserver.disconnect();

      if (container && renderer?.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer?.dispose();
    };
  }, [speedMultiplier, waveDensity, mode, isDark]);

  if (!webGlSupported) {
    // Static accessible monochrome fallback
    return (
      <div
        className={`absolute inset-0 pointer-events-none opacity-5 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] ${className}`}
        aria-hidden="true"
      />
    );
  }

  return (
    <div
      ref={mountRef}
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      aria-hidden="true"
    />
  );
};
