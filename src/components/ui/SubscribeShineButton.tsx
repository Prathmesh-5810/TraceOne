/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useEffect } from 'react';

interface SubscribeShineButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  icon?: React.ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
}

export const SubscribeShineButton: React.FC<SubscribeShineButtonProps> = ({
  children,
  icon,
  variant = 'primary',
  className = '',
  onClick,
  ...props
}) => {
  const containerRef = useRef<HTMLButtonElement>(null);
  const shineRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<Animation | null>(null);

  useEffect(() => {
    const shineEl = shineRef.current;
    if (!shineEl) return;

    // Web Animations API: 360-degree continuous rotating border ray
    const keyframes = [
      { transform: 'rotate(0deg)' },
      { transform: 'rotate(360deg)' }
    ];

    const startAnimation = () => {
      if (!shineEl) return;
      if (!animationRef.current) {
        animationRef.current = shineEl.animate(keyframes, {
          duration: 2400,
          iterations: Infinity,
          easing: 'linear'
        });
      } else {
        animationRef.current.play();
      }
    };

    const stopAnimation = () => {
      if (animationRef.current) {
        // Smoothly settle and pause
        animationRef.current.pause();
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mouseenter', startAnimation);
      container.addEventListener('mouseleave', stopAnimation);
      container.addEventListener('focus', startAnimation);
      container.addEventListener('blur', stopAnimation);
    }

    return () => {
      if (container) {
        container.removeEventListener('mouseenter', startAnimation);
        container.removeEventListener('mouseleave', stopAnimation);
        container.removeEventListener('focus', startAnimation);
        container.removeEventListener('blur', stopAnimation);
      }
      if (animationRef.current) {
        animationRef.current.cancel();
      }
    };
  }, []);

  return (
    <button
      ref={containerRef}
      onClick={onClick}
      className={`group relative inline-flex items-center justify-center p-[1px] overflow-hidden rounded-full font-medium text-xs transition-transform active:scale-[0.98] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${className}`}
      {...props}
    >
      {/* Rotating highlight tracing the border on hover/focus via WAAPI */}
      <div
        ref={shineRef}
        className="absolute inset-[-100%] pointer-events-none opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300"
        style={{
          background:
            'conic-gradient(from 0deg at 50% 50%, transparent 0deg, #ffffff 40deg, transparent 80deg, transparent 360deg)'
        }}
        aria-hidden="true"
      />

      {/* Button Interior (Strict Black and White) */}
      <div
        className={`relative z-10 flex items-center gap-2 px-4 py-2 rounded-full w-full h-full transition-colors ${
          variant === 'primary'
            ? 'bg-black text-white hover:bg-neutral-900 border border-white/20'
            : 'bg-white text-black hover:bg-neutral-100 border border-black/20'
        }`}
      >
        {icon && <span className="shrink-0">{icon}</span>}
        <span className="tracking-wide uppercase font-semibold text-[11px] font-mono">
          {children}
        </span>
      </div>
    </button>
  );
};
