/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { TraceItem } from '../../types/traceone';
import { DigitalQualityPassport } from '../traceability/DigitalQualityPassport';
import { ShieldCheck, Search, Database, Cpu, CheckCircle2, AlertTriangle, Layers } from 'lucide-react';

interface TraceabilityViewProps {
  items: TraceItem[];
  selectedItem: TraceItem;
  onSelectItem: (item: TraceItem) => void;
}

export const TraceabilityView: React.FC<TraceabilityViewProps> = ({
  items,
  selectedItem,
  onSelectItem
}) => {
  const [filterSearch, setFilterSearch] = useState('');

  const filteredItems = items.filter(
    (i) =>
      i.name.toLowerCase().includes(filterSearch.toLowerCase()) ||
      i.trackingId.toLowerCase().includes(filterSearch.toLowerCase()) ||
      i.digitalPassport.passportId.toLowerCase().includes(filterSearch.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Traceability Header */}
      <div className="p-6 md:p-8 rounded-lg border border-black/15 dark:border-white/15 bg-white dark:bg-black text-black dark:text-white space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="text-[11px] font-mono tracking-wider uppercase text-black/60 dark:text-white/60 mb-1">
              DIGITAL PRODUCT PASSPORTS & IMMUTABLE PROVENANCE
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-black dark:text-white">
              Traceability Management System
            </h2>
            <p className="text-xs sm:text-sm text-black/70 dark:text-white/70 mt-1 max-w-2xl leading-relaxed">
              TraceOne bridges physical goods to cryptographic proofs. Off-chain inspection artifacts are pinned to IPFS, while root document hashes and lifecycle events are committed to on-chain smart contracts.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="p-3 rounded border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 text-right font-mono text-xs">
              <div className="text-[10px] text-black/50 dark:text-white/50">SMART CONTRACT NODE</div>
              <div className="font-bold">0x328b...182Cc</div>
            </div>
          </div>
        </div>

        {/* Master Selector Bar */}
        <div className="pt-4 border-t border-black/10 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative max-w-sm w-full">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-black/40 dark:text-white/40 pointer-events-none" />
            <input
              type="text"
              value={filterSearch}
              onChange={(e) => setFilterSearch(e.target.value)}
              placeholder="Search product, passport ID, or serial..."
              className="w-full pl-8 pr-3 py-1.5 text-xs font-mono bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded text-black dark:text-white placeholder:text-black/40 dark:placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-mono">
            {filteredItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onSelectItem(item)}
                className={`px-3 py-1.5 rounded border whitespace-nowrap cursor-pointer transition-colors ${
                  selectedItem.id === item.id
                    ? 'bg-black text-white dark:bg-white dark:text-black border-transparent font-bold'
                    : 'border-black/20 dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/5 text-black dark:text-white'
                }`}
              >
                {item.trackingId}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Primary Detail: Digital Quality Passport & Tamper Engine */}
      <DigitalQualityPassport item={selectedItem} />
    </div>
  );
};
