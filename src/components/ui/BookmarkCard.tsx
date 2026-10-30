/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface BookmarkCardProps {
  title: string;
  subtitle: string;
  category: string;
  value: string | number;
  secondaryText?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const BookmarkCard: React.FC<BookmarkCardProps> = ({
  title,
  subtitle,
  category,
  value,
  secondaryText,
  icon,
  onClick,
  className = ''
}) => {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if ((e.key === 'Enter' || e.key === ' ') && onClick) {
          e.preventDefault();
          onClick();
        }
      }}
      className={`group relative flex flex-col justify-between p-5 bg-white dark:bg-black border border-black/15 dark:border-white/15 text-black dark:text-white transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black dark:focus-visible:ring-white ${className}`}
      style={{
        // Distinctive bite taken from the lower edge (triangular ribbon-tab inverted notch)
        clipPath:
          'polygon(0% 0%, 100% 0%, 100% calc(100% - 14px), 50% 100%, 0% calc(100% - 14px))',
        paddingBottom: '2.25rem'
      }}
    >
      {/* Top Header / Kicker */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <span className="text-[11px] font-mono tracking-wider text-black/60 dark:text-white/60">
            {category}
          </span>
          <h3 className="text-base font-semibold tracking-tight mt-0.5 text-black dark:text-white">
            {title}
          </h3>
        </div>

        {/* Artwork / Icon Box that visually dissolves into a monochromatic white glow on hover/focus */}
        <div className="relative shrink-0 w-9 h-9 rounded flex items-center justify-center border border-black/20 dark:border-white/20 bg-black/5 dark:bg-white/5 transition-all duration-300 group-hover:scale-105 group-hover:bg-white group-hover:text-black group-hover:shadow-[0_0_20px_rgba(255,255,255,0.9)] dark:group-hover:shadow-[0_0_22px_rgba(255,255,255,0.85)] group-hover:brightness-125">
          <div className="transition-transform duration-300 group-hover:scale-110">
            {icon}
          </div>
        </div>
      </div>

      {/* Middle Value / Metric */}
      <div className="my-4">
        <div className="text-2xl font-bold font-mono tracking-tight tabular-nums text-black dark:text-white transition-colors duration-300 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">
          {value}
        </div>
        <p className="text-xs text-black/70 dark:text-white/70 mt-1 line-clamp-2">
          {subtitle}
        </p>
      </div>

      {/* Bottom Kicker / Secondary Text */}
      {secondaryText && (
        <div className="text-[10px] font-mono tracking-tight text-black/50 dark:text-white/50 border-t border-black/10 dark:border-white/10 pt-2 flex items-center justify-between">
          <span>{secondaryText}</span>
          <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
            →
          </span>
        </div>
      )}

      {/* Radiant Monochromatic Hover Border Shimmer */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          boxShadow: 'inset 0 0 16px rgba(255, 255, 255, 0.15)'
        }}
        aria-hidden="true"
      />
    </div>
  );
};
