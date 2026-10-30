/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { LifecycleEvent } from '../../types/traceone';
import { Check, Clock, AlertTriangle, ExternalLink, Hash, Database, UserCheck, Factory } from 'lucide-react';

interface LifecycleTimelineProps {
  events: LifecycleEvent[];
  className?: string;
}

export const LifecycleTimeline: React.FC<LifecycleTimelineProps> = ({ events, className = '' }) => {
  const [selectedStageIndex, setSelectedStageIndex] = useState<number>(0);
  const activeEvent = events[selectedStageIndex] || events[0];

  return (
    <div className={`p-6 bg-white dark:bg-black border border-black/15 dark:border-white/15 rounded-lg text-black dark:text-white ${className}`}>
      <div className="flex items-center justify-between pb-4 border-b border-black/10 dark:border-white/10 mb-6">
        <div>
          <h3 className="text-sm font-semibold font-mono uppercase tracking-wider">
            Chronological Lifecycle Journey (7 Canonical Stages)
          </h3>
          <p className="text-xs text-black/60 dark:text-white/60">
            End-to-end provenance grounded in the TraceOne technical specification
          </p>
        </div>
        <span className="text-xs font-mono text-black/50 dark:text-white/50">
          Stage {selectedStageIndex + 1} of {events.length}
        </span>
      </div>

      {/* Horizontal Stage Stepper */}
      <div className="relative pb-6 overflow-x-auto">
        <div className="flex items-center justify-between min-w-[680px] px-4">
          {/* Connecting line */}
          <div
            className="absolute left-8 right-8 top-4 h-[1px] bg-black/15 dark:bg-white/15 -z-0"
            aria-hidden="true"
          />

          {events.map((evt, idx) => {
            const isSelected = idx === selectedStageIndex;
            const isCompleted = evt.status === 'completed';
            const isCurrent = evt.status === 'current';
            const isFlagged = evt.status === 'flagged';

            return (
              <button
                key={evt.stage}
                onClick={() => setSelectedStageIndex(idx)}
                className="relative z-10 flex flex-col items-center group cursor-pointer focus-visible:outline-none"
              >
                {/* Node Glyph in Strict Black and White */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs transition-all duration-200 ${
                    isSelected
                      ? 'ring-4 ring-black/20 dark:ring-white/20 scale-110'
                      : 'group-hover:scale-105'
                  } ${
                    isFlagged
                      ? 'bg-black text-white dark:bg-white dark:text-black border-2 border-black dark:border-white'
                      : isCompleted
                      ? 'bg-black text-white dark:bg-white dark:text-black'
                      : isCurrent
                      ? 'bg-white text-black dark:bg-black dark:text-white border-2 border-black dark:border-white font-bold'
                      : 'bg-black/5 dark:bg-white/5 text-black/40 dark:text-white/40 border border-black/20 dark:border-white/20'
                  }`}
                >
                  {isFlagged ? (
                    <AlertTriangle className="w-3.5 h-3.5" />
                  ) : isCompleted ? (
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  ) : isCurrent ? (
                    <Clock className="w-3.5 h-3.5" />
                  ) : (
                    <span>{idx + 1}</span>
                  )}
                </div>

                {/* Stage Label */}
                <span
                  className={`text-[11px] font-mono mt-2 tracking-tight transition-colors ${
                    isSelected
                      ? 'font-bold text-black dark:text-white'
                      : 'text-black/60 dark:text-white/60 group-hover:text-black dark:group-hover:text-white'
                  }`}
                >
                  {evt.stage.toUpperCase()}
                </span>
                <span className="text-[10px] text-black/40 dark:text-white/40">
                  {evt.status}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Stage Detail Card */}
      {activeEvent && (
        <div className="mt-4 p-5 rounded border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-black/10 dark:border-white/10">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-black/50 dark:text-white/50">
                Stage {selectedStageIndex + 1}: {activeEvent.stage}
              </span>
              <h4 className="text-base font-semibold text-black dark:text-white mt-0.5">
                {activeEvent.label}
              </h4>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="px-2 py-0.5 rounded border border-black/20 dark:border-white/20">
                {activeEvent.timestamp}
              </span>
              <span
                className={`px-2 py-0.5 rounded font-medium ${
                  activeEvent.status === 'completed'
                    ? 'bg-black text-white dark:bg-white dark:text-black'
                    : 'border border-black dark:border-white text-black dark:text-white'
                }`}
              >
                {activeEvent.status.toUpperCase()}
              </span>
            </div>
          </div>

          <p className="text-xs text-black/80 dark:text-white/80 leading-relaxed">
            {activeEvent.details.description}
          </p>

          {/* Operational Metrics (if available for this stage) */}
          {activeEvent.details.metrics && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              {Object.entries(activeEvent.details.metrics).map(([key, val]) => (
                <div
                  key={key}
                  className="p-2.5 bg-black/5 dark:bg-white/5 rounded border border-black/10 dark:border-white/10"
                >
                  <div className="text-[10px] font-mono text-black/60 dark:text-white/60">
                    {key}
                  </div>
                  <div className="text-xs font-mono font-bold mt-0.5 text-black dark:text-white">
                    {val}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Verification Credentials */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-[11px] font-mono border-t border-black/10 dark:border-white/10 text-black/60 dark:text-white/60">
            <div className="flex items-center gap-1.5 truncate">
              <Factory className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{activeEvent.facility}</span>
            </div>
            <div className="flex items-center gap-1.5 truncate">
              <UserCheck className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{activeEvent.operator}</span>
            </div>
            <div className="flex items-center gap-1.5 truncate">
              <Hash className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate font-mono">Tx: {activeEvent.txHash}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
