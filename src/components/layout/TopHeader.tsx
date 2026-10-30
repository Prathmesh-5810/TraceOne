/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Search, Menu, Sparkles, Filter, Database } from 'lucide-react';
import { ThemeToggle } from '../ui/ThemeToggle';
import { IndustryDomain } from '../../types/traceone';

interface TopHeaderProps {
  pageTitle: string;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedIndustry: IndustryDomain;
  onSelectIndustry: (ind: IndustryDomain) => void;
  isDark: boolean;
  onToggleTheme: (dark: boolean) => void;
  ambientShader: boolean;
  onToggleShader: (active: boolean) => void;
  onOpenMobileSidebar: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  pageTitle,
  searchQuery,
  onSearchChange,
  selectedIndustry,
  onSelectIndustry,
  isDark,
  onToggleTheme,
  ambientShader,
  onToggleShader,
  onOpenMobileSidebar
}) => {
  return (
    <header className="h-16 px-4 sm:px-6 border-b border-black/15 dark:border-white/15 bg-white/80 dark:bg-black/80 backdrop-blur-md sticky top-0 z-20 flex items-center justify-between gap-4">
      {/* Left: Mobile Menu + Page Title */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={onOpenMobileSidebar}
          className="lg:hidden p-2 -ml-2 rounded text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white cursor-pointer"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h1 className="text-sm sm:text-base font-bold font-mono uppercase tracking-tight text-black dark:text-white">
            {pageTitle}
          </h1>
        </div>
      </div>

      {/* Middle: Global Search */}
      <div className="flex-1 max-w-md hidden md:block">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-black/40 dark:text-white/40 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by Tracking ID, batch, product, or location..."
            className="w-full pl-9 pr-4 py-1.5 text-xs font-mono bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-full text-black dark:text-white placeholder:text-black/40 dark:placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white transition-all"
          />
        </div>
      </div>

      {/* Right Controls: Industry Switcher, Shader Toggle, Theme Toggle */}
      <div className="flex items-center gap-2.5 shrink-0">
        {/* Industry Domain Switcher (User Answer: All of the Above) */}
        <div className="hidden sm:flex items-center gap-1 p-0.5 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 text-[11px] font-mono">
          <button
            onClick={() => onSelectIndustry('all')}
            className={`px-2.5 py-1 rounded-full cursor-pointer transition-colors ${
              selectedIndustry === 'all'
                ? 'bg-black text-white dark:bg-white dark:text-black font-semibold'
                : 'text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white'
            }`}
          >
            All
          </button>
          <button
            onClick={() => onSelectIndustry('machinery')}
            className={`px-2.5 py-1 rounded-full cursor-pointer transition-colors ${
              selectedIndustry === 'machinery'
                ? 'bg-black text-white dark:bg-white dark:text-black font-semibold'
                : 'text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white'
            }`}
          >
            Machinery
          </button>
          <button
            onClick={() => onSelectIndustry('electronics')}
            className={`px-2.5 py-1 rounded-full cursor-pointer transition-colors ${
              selectedIndustry === 'electronics'
                ? 'bg-black text-white dark:bg-white dark:text-black font-semibold'
                : 'text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white'
            }`}
          >
            Semiconductors
          </button>
          <button
            onClick={() => onSelectIndustry('aerospace')}
            className={`px-2.5 py-1 rounded-full cursor-pointer transition-colors ${
              selectedIndustry === 'aerospace'
                ? 'bg-black text-white dark:bg-white dark:text-black font-semibold'
                : 'text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white'
            }`}
          >
            Aerospace
          </button>
        </div>

        {/* Ambient Three.js Shader toggle */}
        <button
          onClick={() => onToggleShader(!ambientShader)}
          title={ambientShader ? 'Disable 3D Background Shader' : 'Enable 3D Background Shader'}
          className={`p-2 rounded-full border cursor-pointer transition-colors text-xs flex items-center gap-1 font-mono ${
            ambientShader
              ? 'bg-black text-white dark:bg-white dark:text-black border-transparent'
              : 'border-black/15 dark:border-white/15 text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white'
          }`}
          aria-label="Toggle Three.js shader background"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span className="hidden xl:inline text-[10px]">3D</span>
        </button>

        {/* Animated Black and White Theme Toggle */}
        <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
      </div>
    </header>
  );
};
