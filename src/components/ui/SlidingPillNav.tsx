/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';

export interface PillTabItem {
  id: string;
  label: string;
  count?: number;
}

interface SlidingPillNavProps {
  items: PillTabItem[];
  activeId: string;
  onChange: (id: string) => void;
  className?: string;
}

export const SlidingPillNav: React.FC<SlidingPillNavProps> = ({
  items,
  activeId,
  onChange,
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const [indicatorStyle, setIndicatorStyle] = useState<{
    left: number;
    width: number;
    opacity: number;
  }>({
    left: 0,
    width: 0,
    opacity: 0
  });

  const updateIndicator = () => {
    const activeButton = buttonRefs.current.get(activeId);
    const container = containerRef.current;
    if (activeButton && container) {
      const containerRect = container.getBoundingClientRect();
      const buttonRect = activeButton.getBoundingClientRect();
      setIndicatorStyle({
        left: buttonRect.left - containerRect.left,
        width: buttonRect.width,
        opacity: 1
      });
    }
  };

  useEffect(() => {
    updateIndicator();
    const handleResize = () => {
      updateIndicator();
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeId, items]);

  return (
    <div
      ref={containerRef}
      role="tablist"
      aria-label="Filter navigation"
      className={`relative inline-flex items-center p-1 bg-black/5 dark:bg-white/10 rounded-full border border-black/10 dark:border-white/10 ${className}`}
    >
      {/* Sliding Pill Indicator */}
      <div
        className="absolute top-1 bottom-1 bg-white text-black dark:bg-white dark:text-black rounded-full shadow-sm pointer-events-none transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          left: `${indicatorStyle.left}px`,
          width: `${indicatorStyle.width}px`,
          opacity: indicatorStyle.opacity
        }}
        aria-hidden="true"
      />

      {items.map((item) => {
        const isActive = item.id === activeId;
        return (
          <button
            key={item.id}
            ref={(el) => {
              if (el) buttonRefs.current.set(item.id, el);
              else buttonRefs.current.delete(item.id);
            }}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(item.id)}
            className={`relative z-10 px-3.5 py-1.5 text-xs font-medium whitespace-nowrap transition-colors duration-150 rounded-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black dark:focus-visible:ring-white ${
              isActive
                ? 'text-black font-semibold'
                : 'text-black/70 hover:text-black dark:text-white/70 dark:hover:text-white'
            }`}
          >
            <span>{item.label}</span>
            {item.count !== undefined && (
              <span
                className={`ml-1.5 text-[10px] font-mono tabular-nums px-1.5 py-0.2 rounded-full ${
                  isActive
                    ? 'bg-black/10 text-black'
                    : 'bg-black/10 text-black/70 dark:bg-white/20 dark:text-white/80'
                }`}
              >
                {item.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
