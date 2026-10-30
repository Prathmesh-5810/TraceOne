/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { TraceItem, ItemStatus } from '../../types/traceone';
import { BookmarkCard } from '../ui/BookmarkCard';
import { SlidingPillNav, PillTabItem } from '../ui/SlidingPillNav';
import { SubscribeShineButton } from '../ui/SubscribeShineButton';
import {
  Package,
  Truck,
  CheckCircle2,
  Clock,
  ArrowUpDown,
  ExternalLink,
  Shield,
  Layers,
  Search,
  Filter
} from 'lucide-react';

interface DashboardViewProps {
  items: TraceItem[];
  onSelectTrackItem: (item: TraceItem) => void;
  onOpenPassport: (item: TraceItem) => void;
  onNavigateShipments: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  items,
  onSelectTrackItem,
  onOpenPassport,
  onNavigateShipments
}) => {
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [tableSearch, setTableSearch] = useState<string>('');
  const [sortField, setSortField] = useState<'trackingId' | 'name' | 'status'>('trackingId');
  const [sortAsc, setSortAsc] = useState<boolean>(true);

  // Compute KPI metrics
  const totalCount = items.length;
  const inTransitCount = items.filter((i) => i.status === 'In Transit').length;
  const deliveredCount = items.filter((i) => i.status === 'Delivered').length;
  const pendingCount = items.filter((i) => i.status === 'Pending').length;
  const issuesCount = items.filter((i) => i.status === 'Issues').length;

  const filterTabs: PillTabItem[] = [
    { id: 'all', label: 'All Items', count: totalCount },
    { id: 'In Transit', label: 'In Transit', count: inTransitCount },
    { id: 'Delivered', label: 'Delivered', count: deliveredCount },
    { id: 'Issues', label: 'Issues & Review', count: issuesCount + pendingCount }
  ];

  // Filtered & Sorted activity table rows
  const filteredItems = useMemo(() => {
    return items
      .filter((item) => {
        if (statusFilter === 'all') return true;
        if (statusFilter === 'Issues') {
          return item.status === 'Issues' || item.status === 'Pending';
        }
        return item.status === statusFilter;
      })
      .filter((item) => {
        if (!tableSearch.trim()) return true;
        const q = tableSearch.toLowerCase();
        return (
          item.trackingId.toLowerCase().includes(q) ||
          item.name.toLowerCase().includes(q) ||
          item.lastKnownLocation.city.toLowerCase().includes(q) ||
          item.lastKnownLocation.facility.toLowerCase().includes(q) ||
          item.batchId.toLowerCase().includes(q)
        );
      })
      .sort((a, b) => {
        let cmp = 0;
        if (sortField === 'trackingId') cmp = a.trackingId.localeCompare(b.trackingId);
        else if (sortField === 'name') cmp = a.name.localeCompare(b.name);
        else if (sortField === 'status') cmp = a.status.localeCompare(b.status);
        return sortAsc ? cmp : -cmp;
      });
  }, [items, statusFilter, tableSearch, sortField, sortAsc]);

  const toggleSort = (field: 'trackingId' | 'name' | 'status') => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Section Hero Banner with Subscribe Shine Button */}
      <div className="p-6 md:p-8 rounded-lg border border-black/15 dark:border-white/15 bg-white dark:bg-black text-black dark:text-white flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
        <div className="max-w-2xl">
          <div className="text-[11px] font-mono tracking-wider uppercase text-black/60 dark:text-white/60 mb-1">
            TRACEONE GLOBAL TRACKING & TRACEABILITY
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-black dark:text-white">
            Verifiable Supply Chain Integrity & AI Quality
          </h2>
          <p className="text-xs sm:text-sm text-black/70 dark:text-white/70 mt-2 leading-relaxed">
            Unified manufacturing intelligence combining line-edge telemetry, YOLO computer vision inspection, decentralized IPFS artifact storage, and immutable Ethereum smart contracts.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0">
          <SubscribeShineButton
            onClick={onNavigateShipments}
            icon={<Truck className="w-3.5 h-3.5" />}
          >
            Track Shipment
          </SubscribeShineButton>
        </div>
      </div>

      {/* KPI Cards Grid (Strict Black and White) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Total Tracked */}
        <div className="p-5 rounded-lg border border-black/15 dark:border-white/15 bg-white dark:bg-black text-black dark:text-white">
          <div className="flex items-center justify-between text-xs font-mono text-black/60 dark:text-white/60">
            <span>TOTAL ITEMS TRACKED</span>
            <Package className="w-4 h-4 text-black/40 dark:text-white/40" />
          </div>
          <div className="text-3xl font-bold font-mono tracking-tight tabular-nums mt-3 text-black dark:text-white">
            {totalCount.toString().padStart(2, '0')}
          </div>
          <div className="text-[11px] font-mono text-black/50 dark:text-white/50 mt-1">
            Across active production batches
          </div>
        </div>

        {/* KPI 2: Items in Transit */}
        <div className="p-5 rounded-lg border border-black/15 dark:border-white/15 bg-white dark:bg-black text-black dark:text-white">
          <div className="flex items-center justify-between text-xs font-mono text-black/60 dark:text-white/60">
            <span>ITEMS IN TRANSIT</span>
            <Truck className="w-4 h-4 text-black/40 dark:text-white/40" />
          </div>
          <div className="text-3xl font-bold font-mono tracking-tight tabular-nums mt-3 text-black dark:text-white">
            {inTransitCount.toString().padStart(2, '0')}
          </div>
          <div className="text-[11px] font-mono text-black/50 dark:text-white/50 mt-1">
            Active carrier routing & depots
          </div>
        </div>

        {/* KPI 3: Delivered Items */}
        <div className="p-5 rounded-lg border border-black/15 dark:border-white/15 bg-white dark:bg-black text-black dark:text-white">
          <div className="flex items-center justify-between text-xs font-mono text-black/60 dark:text-white/60">
            <span>DELIVERED & VERIFIED</span>
            <CheckCircle2 className="w-4 h-4 text-black/40 dark:text-white/40" />
          </div>
          <div className="text-3xl font-bold font-mono tracking-tight tabular-nums mt-3 text-black dark:text-white">
            {deliveredCount.toString().padStart(2, '0')}
          </div>
          <div className="text-[11px] font-mono text-black/50 dark:text-white/50 mt-1">
            QR handover authenticated
          </div>
        </div>

        {/* KPI 4: Pending / Review Items */}
        <div className="p-5 rounded-lg border border-black/15 dark:border-white/15 bg-white dark:bg-black text-black dark:text-white">
          <div className="flex items-center justify-between text-xs font-mono text-black/60 dark:text-white/60">
            <span>PENDING & REVIEW</span>
            <Clock className="w-4 h-4 text-black/40 dark:text-white/40" />
          </div>
          <div className="text-3xl font-bold font-mono tracking-tight tabular-nums mt-3 text-black dark:text-white">
            {(pendingCount + issuesCount).toString().padStart(2, '0')}
          </div>
          <div className="text-[11px] font-mono text-black/50 dark:text-white/50 mt-1">
            Awaiting inspection clearance
          </div>
        </div>
      </div>

      {/* Bookmark Cards Showcase (Required Component B) */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold font-mono uppercase tracking-wider text-black dark:text-white">
              Featured Verified Digital Passports
            </h3>
            <p className="text-xs text-black/60 dark:text-white/60">
              Interactive bookmark cards with lower bite notch and monochromatic glow dissolve
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {items.slice(0, 3).map((item) => (
            <BookmarkCard
              key={item.id}
              title={item.name}
              subtitle={`${item.manufacturer.name} · ${item.batchId}`}
              category={item.category}
              value={item.trackingId}
              secondaryText={`Quality Score: ${item.inspection.score}% · ${item.inspection.decision}`}
              icon={<Shield className="w-4 h-4" />}
              onClick={() => onOpenPassport(item)}
            />
          ))}
        </div>
      </div>

      {/* Recent Tracking Activity Section */}
      <div className="p-6 rounded-lg border border-black/15 dark:border-white/15 bg-white dark:bg-black text-black dark:text-white space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-bold font-mono uppercase tracking-wider text-black dark:text-white">
              Recent Tracking Activity
            </h3>
            <p className="text-xs text-black/60 dark:text-white/60">
              Real-time audit log of tracked items across the global manufacturing network
            </p>
          </div>

          {/* Sliding Pill Filter Navigation (Required Component A) */}
          <div className="overflow-x-auto pb-1">
            <SlidingPillNav
              items={filterTabs}
              activeId={statusFilter}
              onChange={setStatusFilter}
            />
          </div>
        </div>

        {/* Table Search & Controls Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
          <div className="relative max-w-sm w-full">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-black/40 dark:text-white/40 pointer-events-none" />
            <input
              type="text"
              value={tableSearch}
              onChange={(e) => setTableSearch(e.target.value)}
              placeholder="Filter by tracking ID, item, or location..."
              className="w-full pl-8 pr-3 py-1.5 text-xs font-mono bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded text-black dark:text-white placeholder:text-black/40 dark:placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white"
            />
          </div>

          <div className="text-xs font-mono text-black/50 dark:text-white/50">
            Showing {filteredItems.length} of {totalCount} records
          </div>
        </div>

        {/* Structured Data Table (Strict Black and White) */}
        <div className="overflow-x-auto border border-black/10 dark:border-white/10 rounded">
          <table className="w-full text-left text-xs font-mono border-collapse">
            <thead>
              <tr className="border-b border-black/15 dark:border-white/15 bg-black/[0.03] dark:bg-white/[0.03] text-black/70 dark:text-white/70 select-none">
                <th
                  onClick={() => toggleSort('trackingId')}
                  className="py-3 px-4 font-semibold uppercase tracking-wider cursor-pointer hover:text-black dark:hover:text-white"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Tracking ID</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th
                  onClick={() => toggleSort('name')}
                  className="py-3 px-4 font-semibold uppercase tracking-wider cursor-pointer hover:text-black dark:hover:text-white"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Item / Product</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3 px-4 font-semibold uppercase tracking-wider">
                  Last Known Location
                </th>
                <th
                  onClick={() => toggleSort('status')}
                  className="py-3 px-4 font-semibold uppercase tracking-wider cursor-pointer hover:text-black dark:hover:text-white"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Status</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3 px-4 font-semibold uppercase tracking-wider">
                  Timestamp
                </th>
                <th className="py-3 px-4 font-semibold uppercase tracking-wider text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/10 dark:divide-white/10">
              {filteredItems.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-black/50 dark:text-white/50">
                    No matching records found.
                  </td>
                </tr>
              ) : (
                filteredItems.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-black/[0.02] dark:hover:bg-white/[0.03] transition-colors"
                  >
                    <td className="py-3.5 px-4 font-bold text-black dark:text-white">
                      {item.trackingId}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-sans font-medium text-black dark:text-white">
                        {item.name}
                      </div>
                      <div className="text-[10px] text-black/50 dark:text-white/50">
                        {item.batchId} · {item.serialNumber}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="text-black dark:text-white">
                        {item.lastKnownLocation.city}, {item.lastKnownLocation.country}
                      </div>
                      <div className="text-[10px] text-black/50 dark:text-white/50 truncate max-w-[180px]">
                        {item.lastKnownLocation.facility}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium border ${
                          item.status === 'Delivered'
                            ? 'bg-black text-white dark:bg-white dark:text-black border-transparent'
                            : item.status === 'In Transit'
                            ? 'bg-transparent text-black dark:text-white border-black/40 dark:border-white/40'
                            : item.status === 'Issues'
                            ? 'bg-black text-white dark:bg-white dark:text-black border-2 border-black dark:border-white font-bold'
                            : 'bg-black/10 text-black dark:bg-white/10 dark:text-white border-black/10 dark:border-white/10'
                        }`}
                      >
                        {item.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-black/60 dark:text-white/60 tabular-nums">
                      {item.timeline[0]?.timestamp.split(' ')[0] || '2026-10-24'}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          onClick={() => onSelectTrackItem(item)}
                          className="px-2.5 py-1 text-[11px] font-mono rounded border border-black/20 dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer transition-colors"
                        >
                          Track
                        </button>
                        <button
                          onClick={() => onOpenPassport(item)}
                          className="px-2.5 py-1 text-[11px] font-mono rounded bg-black text-white dark:bg-white dark:text-black hover:opacity-90 cursor-pointer transition-opacity"
                        >
                          Passport
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
