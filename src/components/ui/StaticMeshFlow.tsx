/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from 'react';

interface StaticMeshFlowProps {
  className?: string;
  isDark?: boolean;
}

export const StaticMeshFlow: React.FC<StaticMeshFlowProps> = ({
  className = '',
  isDark = true
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    // Mouse coordinates (default off-screen)
    let mouse = { x: -9999, y: -9999, active: false };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    const spacing = 28; // Distance between dots
    const gaussianSigma = 110; // Influence radius standard deviation
    const maxAmplitude = 24; // Peak displacement amplitude

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const dotBaseColor = isDark ? '255, 255, 255' : '0, 0, 0';
      const baseAlpha = isDark ? 0.08 : 0.06;

      const cols = Math.ceil(width / spacing) + 1;
      const rows = Math.ceil(height / spacing) + 1;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const originX = c * spacing;
          const originY = r * spacing;

          let drawX = originX;
          let drawY = originY;
          let alpha = baseAlpha;
          let radius = 1;

          if (mouse.active) {
            const dx = originX - mouse.x;
            const dy = originY - mouse.y;
            const distSq = dx * dx + dy * dy;
            const dist = Math.sqrt(distSq);

            // Single Gaussian influence function: A * exp(-dist^2 / (2 * sigma^2))
            const gaussian = maxAmplitude * Math.exp(-distSq / (2 * gaussianSigma * gaussianSigma));

            if (dist > 0.01) {
              // Displace outwards from pointer
              drawX += (dx / dist) * gaussian;
              drawY += (dy / dist) * gaussian;
            }

            // Monochromatic brightness increase near cursor
            const proximityFactor = Math.exp(-distSq / (2 * (gaussianSigma * 1.2) ** 2));
            alpha = baseAlpha + proximityFactor * (isDark ? 0.45 : 0.35);
            radius = 1 + proximityFactor * 1.5;
          }

          ctx.beginPath();
          ctx.arc(drawX, drawY, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${dotBaseColor}, ${alpha})`;
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    // Pause rendering if tab hidden or reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReducedMotion) {
      render();
    }

    const handleVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationFrameId);
      } else if (!prefersReducedMotion) {
        render();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${className}`}
      aria-hidden="true"
    />
  );
};
