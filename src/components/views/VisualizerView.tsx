/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ShaderAnimation } from '../ui/ShaderAnimation';
import { Waves, ChevronDown, ChevronUp, Sliders, Eye, RefreshCw } from 'lucide-react';

interface VisualizerViewProps {
  isDark: boolean;
}

export const VisualizerView: React.FC<VisualizerViewProps> = ({ isDark }) => {
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1.2);
  const [waveDensity, setWaveDensity] = useState<number>(1.4);
  const [isDockCollapsed, setIsDockCollapsed] = useState<boolean>(false);

  return (
    <div className="relative w-full h-[calc(100vh-8rem)] rounded-lg border border-black/15 dark:border-white/15 overflow-hidden bg-white dark:bg-black text-black dark:text-white select-none">
      {/* 3D WebGL Shader Animation Canvas */}
      <ShaderAnimation
        speedMultiplier={speedMultiplier}
        waveDensity={waveDensity}
        mode="interactive"
        isDark={isDark}
      />

      {/* Top Overlay Spec HUD */}
      <div className="absolute top-4 left-4 z-10 p-3 rounded border border-black/15 dark:border-white/15 bg-white/80 dark:bg-black/80 backdrop-blur-md font-mono text-xs max-w-xs shadow-sm">
        <div className="flex items-center gap-2 font-bold uppercase tracking-wider mb-1">
          <Waves className="w-3.5 h-3.5" />
          <span>Interactive 3D Shader Engine</span>
        </div>
        <p className="text-[11px] text-black/60 dark:text-white/60 leading-relaxed">
          Procedural GLSL topographic contours in strict monochrome. Mathematical noise deformation representing continuous blockchain state oscillations.
        </p>
        <div className="mt-2 pt-2 border-t border-black/10 dark:border-white/10 flex items-center justify-between text-[10px] text-black/50 dark:text-white/50">
          <span>DPR: Capped 2.0</span>
          <span>Shaders: GLSL v3.0</span>
        </div>
      </div>

      {/* Ergonomic Collapsible Bottom Control Dock (Three.js Skill Directive) */}
      <div
        className={`absolute bottom-5 left-1/2 -translate-x-1/2 z-20 w-[92%] max-w-xl transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isDockCollapsed ? 'translate-y-[calc(100%-2.25rem)]' : 'translate-y-0'
        }`}
      >
        {/* Collapse/Expand Toggle Tab */}
        <div className="flex justify-center -mb-[1px]">
          <button
            onClick={() => setIsDockCollapsed(!isDockCollapsed)}
            className="px-3 py-1 rounded-t border-t border-x border-black/15 dark:border-white/15 bg-white/95 dark:bg-black/95 backdrop-blur-md text-[11px] font-mono flex items-center gap-1.5 cursor-pointer hover:bg-black/5 dark:hover:bg-white/5"
            aria-label={isDockCollapsed ? 'Expand control dock' : 'Collapse control dock'}
          >
            {isDockCollapsed ? (
              <>
                <ChevronUp className="w-3 h-3" />
                <span>Show Controls</span>
              </>
            ) : (
              <>
                <ChevronDown className="w-3 h-3" />
                <span>Collapse Dock</span>
              </>
            )}
          </button>
        </div>

        {/* Dock Controls Body */}
        <div className="p-4 rounded-lg border border-black/15 dark:border-white/15 bg-white/95 dark:bg-black/95 backdrop-blur-md font-mono text-xs shadow-lg space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-semibold uppercase tracking-wider flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5" />
              <span>Waveform Controls</span>
            </span>
            <button
              onClick={() => {
                setSpeedMultiplier(1.0);
                setWaveDensity(1.0);
              }}
              className="text-[10px] text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white flex items-center gap-1 cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="text-black/60 dark:text-white/60">Waveform Speed:</span>
                <span className="font-bold tabular-nums">{speedMultiplier.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="0.2"
                max="3.0"
                step="0.1"
                value={speedMultiplier}
                onChange={(e) => setSpeedMultiplier(parseFloat(e.target.value))}
                className="w-full accent-black dark:accent-white cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="text-black/60 dark:text-white/60">Contour Density:</span>
                <span className="font-bold tabular-nums">{waveDensity.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="2.5"
                step="0.1"
                value={waveDensity}
                onChange={(e) => setWaveDensity(parseFloat(e.target.value))}
                className="w-full accent-black dark:accent-white cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
