/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: (dark: boolean) => void;
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  isDark,
  onToggle,
  className = ''
}) => {
  return (
    <button
      role="switch"
      aria-checked={isDark}
      aria-label="Toggle light and dark theme"
      onClick={() => onToggle(!isDark)}
      className={`relative inline-flex items-center h-8 w-16 p-1 rounded-full cursor-pointer transition-colors duration-300 backdrop-blur-md border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black dark:focus-visible:ring-white ${
        isDark
          ? 'bg-white/10 border-white/20 hover:bg-white/15'
          : 'bg-black/5 border-black/15 hover:bg-black/10'
      } ${className}`}
    >
      {/* Sliding Glass Thumb */}
      <span
        className={`inline-flex items-center justify-center w-6 h-6 rounded-full shadow-md transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isDark
            ? 'translate-x-8 bg-white text-black'
            : 'translate-x-0 bg-black text-white'
        }`}
      >
        {isDark ? (
          <Moon className="w-3.5 h-3.5 stroke-[2.2]" />
        ) : (
          <Sun className="w-3.5 h-3.5 stroke-[2.2]" />
        )}
      </span>

      {/* Background Icons */}
      <span
        className={`absolute left-2 text-[10px] select-none transition-opacity duration-200 pointer-events-none ${
          isDark ? 'opacity-40 text-white' : 'opacity-0'
        }`}
        aria-hidden="true"
      >
        <Sun className="w-3 h-3" />
      </span>
      <span
        className={`absolute right-2 text-[10px] select-none transition-opacity duration-200 pointer-events-none ${
          isDark ? 'opacity-0' : 'opacity-40 text-black'
        }`}
        aria-hidden="true"
      >
        <Moon className="w-3 h-3" />
      </span>
    </button>
  );
};
