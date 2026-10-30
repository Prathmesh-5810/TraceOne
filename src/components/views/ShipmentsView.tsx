/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { TraceItem } from '../../types/traceone';
import { LifecycleTimeline } from '../tracking/LifecycleTimeline';
import { Search, Truck, MapPin, Factory, Calendar, ShieldCheck, ArrowRight, ExternalLink } from 'lucide-react';

interface ShipmentsViewProps {
  items: TraceItem[];
  selectedItem: TraceItem;
  onSelectItem: (item: TraceItem) => void;
  onOpenPassport: (item: TraceItem) => void;
}

export const ShipmentsView: React.FC<ShipmentsViewProps> = ({
  items,
  selectedItem,
  onSelectItem,
  onOpenPassport
}) => {
  const [searchInput, setSearchInput] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    const found = items.find(
      (i) =>
        i.trackingId.toLowerCase() === searchInput.trim().toLowerCase() ||
        i.serialNumber.toLowerCase() === searchInput.trim().toLowerCase()
    );
    if (found) {
      onSelectItem(found);
    } else {
      setErrorMsg(`No item found matching "${searchInput}". Please check ID.`);
    }
  };

  return (
    <div className="space-y-8">
      {/* Search Header Bar */}
      <div className="p-6 rounded-lg border border-black/15 dark:border-white/15 bg-white dark:bg-black text-black dark:text-white space-y-4">
        <div>
          <h2 className="text-lg font-bold font-mono uppercase tracking-tight">
            Individual Item Tracking & Lifecycle Telemetry
          </h2>
          <p className="text-xs text-black/60 dark:text-white/60">
            Query any physical component by Tracking ID or Serial Number to retrieve its immutable product ledger.
          </p>
        </div>

        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-black/40 dark:text-white/40" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Enter Tracking ID (e.g. TRC-9014-GEAR or TRC-5520-AERO)..."
              className="w-full pl-9 pr-4 py-2.5 text-xs font-mono bg-black/5 dark:bg-white/5 border border-black/15 dark:border-white/15 rounded text-black dark:text-white placeholder:text-black/40 dark:placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 text-xs font-mono font-semibold rounded bg-black text-white dark:bg-white dark:text-black hover:opacity-90 cursor-pointer shrink-0 transition-opacity"
          >
            Retrieve Ledger
          </button>
        </form>

        {errorMsg && (
          <div className="text-xs font-mono text-black dark:text-white p-2 border border-black dark:border-white rounded bg-black/5 dark:bg-white/5">
            {errorMsg}
          </div>
        )}

        {/* Quick Sample Selector Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs font-mono">
          <span className="text-black/50 dark:text-white/50 text-[11px]">Quick Samples:</span>
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => onSelectItem(item)}
              className={`px-2.5 py-1 rounded border text-[11px] cursor-pointer transition-colors ${
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

      {/* Selected Item Overview Hero */}
      <div className="p-6 rounded-lg border border-black/15 dark:border-white/15 bg-white dark:bg-black text-black dark:text-white space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-black/10 dark:border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-black/60 dark:text-white/60 mb-1">
              <span>{selectedItem.category}</span>
              <span>·</span>
              <span>BATCH: {selectedItem.batchId}</span>
              <span>·</span>
              <span className="uppercase">IND: {selectedItem.industry}</span>
            </div>
            <h3 className="text-2xl font-bold tracking-tight text-black dark:text-white">
              {selectedItem.name}
            </h3>
            <div className="flex items-center gap-4 mt-2 text-xs font-mono text-black/70 dark:text-white/70">
              <span>Tracking ID: <strong className="text-black dark:text-white">{selectedItem.trackingId}</strong></span>
              <span>Serial: <strong className="text-black dark:text-white">{selectedItem.serialNumber}</strong></span>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span
              className={`px-3 py-1.5 rounded text-xs font-mono font-bold border ${
                selectedItem.status === 'Delivered'
                  ? 'bg-black text-white dark:bg-white dark:text-black border-transparent'
                  : selectedItem.status === 'In Transit'
                  ? 'border border-black dark:border-white text-black dark:text-white'
                  : selectedItem.status === 'Issues'
                  ? 'bg-black text-white dark:bg-white dark:text-black border-2 border-black dark:border-white'
                  : 'bg-black/10 text-black dark:bg-white/10 dark:text-white'
              }`}
            >
              STATUS: {selectedItem.status.toUpperCase()}
            </span>

            <button
              onClick={() => onOpenPassport(selectedItem)}
              className="px-3.5 py-1.5 rounded bg-black text-white dark:bg-white dark:text-black text-xs font-mono font-semibold hover:opacity-90 cursor-pointer flex items-center gap-1.5 transition-opacity"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Digital Passport</span>
            </button>
          </div>
        </div>

        {/* 4 Detail Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Col 1: Manufacturer */}
          <div className="p-4 rounded border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02]">
            <div className="flex items-center gap-1.5 text-xs font-mono text-black/60 dark:text-white/60 mb-2">
              <Factory className="w-3.5 h-3.5" />
              <span>MANUFACTURER</span>
            </div>
            <div className="font-sans font-semibold text-xs text-black dark:text-white">
              {selectedItem.manufacturer.name}
            </div>
            <div className="text-[11px] font-mono text-black/60 dark:text-white/60 mt-1">
              Facility: {selectedItem.manufacturer.facilityId}
            </div>
            <div className="text-[11px] font-mono text-black/60 dark:text-white/60">
              Standard: {selectedItem.manufacturer.standard}
            </div>
          </div>

          {/* Col 2: Last Known Location */}
          <div className="p-4 rounded border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02]">
            <div className="flex items-center gap-1.5 text-xs font-mono text-black/60 dark:text-white/60 mb-2">
              <MapPin className="w-3.5 h-3.5" />
              <span>CURRENT LOCATION</span>
            </div>
            <div className="font-sans font-semibold text-xs text-black dark:text-white">
              {selectedItem.lastKnownLocation.city}, {selectedItem.lastKnownLocation.country}
            </div>
            <div className="text-[11px] font-mono text-black/60 dark:text-white/60 mt-1 truncate">
              {selectedItem.lastKnownLocation.facility}
            </div>
            <div className="text-[11px] font-mono text-black/60 dark:text-white/60">
              GPS: {selectedItem.lastKnownLocation.coordinates}
            </div>
          </div>

          {/* Col 3: AI Quality Inspection */}
          <div className="p-4 rounded border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02]">
            <div className="flex items-center gap-1.5 text-xs font-mono text-black/60 dark:text-white/60 mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>AI QUALITY SCORE</span>
            </div>
            <div className="text-xl font-bold font-mono tabular-nums text-black dark:text-white">
              {selectedItem.inspection.score}%
            </div>
            <div className="text-[11px] font-mono text-black/60 dark:text-white/60 mt-1">
              Model: {selectedItem.inspection.model}
            </div>
            <div className="text-[11px] font-mono text-black/60 dark:text-white/60">
              Decision: {selectedItem.inspection.decision} (Defects: {selectedItem.inspection.defectCount})
            </div>
          </div>

          {/* Col 4: Blockchain Ledger Reference */}
          <div className="p-4 rounded border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02]">
            <div className="flex items-center gap-1.5 text-xs font-mono text-black/60 dark:text-white/60 mb-2">
              <Calendar className="w-3.5 h-3.5" />
              <span>ON-CHAIN ANCHOR</span>
            </div>
            <div className="text-xs font-mono text-black dark:text-white font-bold truncate">
              Block #{selectedItem.blockchain.blockNumber}
            </div>
            <div className="text-[11px] font-mono text-black/60 dark:text-white/60 mt-1 truncate">
              Tx: {selectedItem.blockchain.txHash.slice(0, 14)}...
            </div>
            <div className="text-[11px] font-mono text-black/60 dark:text-white/60">
              Network: {selectedItem.blockchain.network.split(' ')[0]}
            </div>
          </div>
        </div>
      </div>

      {/* 7-Stage Chronological Lifecycle Journey */}
      <LifecycleTimeline events={selectedItem.timeline} />
    </div>
  );
};
