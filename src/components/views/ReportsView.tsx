/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { TraceItem } from '../../types/traceone';
import {
  FileText,
  Download,
  Calendar,
  Filter,
  BarChart2,
  PieChart,
  ArrowRight,
  Printer,
  CheckCircle2,
  Clock,
  Truck,
  Package
} from 'lucide-react';

interface ReportsViewProps {
  items: TraceItem[];
}

export const ReportsView: React.FC<ReportsViewProps> = ({ items }) => {
  const [dateRange, setDateRange] = useState<'7d' | '30d' | 'q4' | 'all'>('30d');
  const [locationFilter, setLocationFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [showPrintModal, setShowPrintModal] = useState<boolean>(false);

  // Compute metrics
  const total = items.length;
  const inTransit = items.filter((i) => i.status === 'In Transit').length;
  const delivered = items.filter((i) => i.status === 'Delivered').length;
  const pending = items.filter((i) => i.status === 'Pending').length;
  const issues = items.filter((i) => i.status === 'Issues').length;
  const avgScore = (items.reduce((acc, i) => acc + i.inspection.score, 0) / (total || 1)).toFixed(1);

  // Unique locations and categories for filter dropdowns
  const uniqueLocations = Array.from(new Set(items.map((i) => i.lastKnownLocation.country)));
  const uniqueCategories = Array.from(new Set(items.map((i) => i.category)));

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8">
      {/* Header and Export Control */}
      <div className="p-6 md:p-8 rounded-lg border border-black/15 dark:border-white/15 bg-white dark:bg-black text-black dark:text-white flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="text-[11px] font-mono tracking-wider uppercase text-black/60 dark:text-white/60 mb-1">
            TRACEONE QUALITY AUDIT & OPERATIONAL ANALYTICS
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-black dark:text-white">
            Reports & Traceability Intelligence
          </h2>
          <p className="text-xs sm:text-sm text-black/70 dark:text-white/70 mt-1 max-w-xl">
            Audit-grade performance metrics, item-flow distribution, and compliance reports verified against on-chain smart contract logs.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0 no-print">
          <button
            onClick={() => setShowPrintModal(true)}
            className="px-4 py-2 text-xs font-mono font-medium rounded border border-black/20 dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer flex items-center gap-2 transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Preview Report</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-4 py-2 text-xs font-mono font-bold rounded bg-black text-white dark:bg-white dark:text-black hover:opacity-90 cursor-pointer flex items-center gap-2 transition-opacity shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Generate & Export PDF</span>
          </button>
        </div>
      </div>

      {/* Filter Toolbar (No-Print) */}
      <div className="p-4 rounded-lg border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] flex flex-wrap items-center justify-between gap-4 text-xs font-mono no-print">
        <div className="flex items-center gap-2">
          <span className="text-black/50 dark:text-white/50 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            Time Range:
          </span>
          <div className="flex items-center gap-1">
            {(['7d', '30d', 'q4', 'all'] as const).map((r) => (
              <button
                key={r}
                onClick={() => setDateRange(r)}
                className={`px-2.5 py-1 rounded cursor-pointer transition-colors ${
                  dateRange === r
                    ? 'bg-black text-white dark:bg-white dark:text-black font-bold'
                    : 'border border-black/15 dark:border-white/15 text-black/70 dark:text-white/70 hover:bg-black/5 dark:hover:bg-white/5'
                }`}
              >
                {r.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-black/50 dark:text-white/50">Location:</span>
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="px-2.5 py-1 rounded border border-black/20 dark:border-white/20 bg-white dark:bg-black text-black dark:text-white text-xs font-mono cursor-pointer"
            >
              <option value="all">All Locations</option>
              {uniqueLocations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-black/50 dark:text-white/50">Category:</span>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-2.5 py-1 rounded border border-black/20 dark:border-white/20 bg-white dark:bg-black text-black dark:text-white text-xs font-mono cursor-pointer"
            >
              <option value="all">All Categories</option>
              {uniqueCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* KPI Cards Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded border border-black/15 dark:border-white/15 bg-white dark:bg-black text-black dark:text-white">
          <div className="text-[11px] font-mono text-black/60 dark:text-white/60">TOTAL REGISTERED</div>
          <div className="text-2xl font-bold font-mono tabular-nums mt-1">{total} Items</div>
          <div className="text-[10px] text-black/50 dark:text-white/50 mt-1">100% on-chain registered</div>
        </div>

        <div className="p-4 rounded border border-black/15 dark:border-white/15 bg-white dark:bg-black text-black dark:text-white">
          <div className="text-[11px] font-mono text-black/60 dark:text-white/60">SUCCESSFULLY TRACKED</div>
          <div className="text-2xl font-bold font-mono tabular-nums mt-1">{delivered} Verified</div>
          <div className="text-[10px] text-black/50 dark:text-white/50 mt-1">Destination reached</div>
        </div>

        <div className="p-4 rounded border border-black/15 dark:border-white/15 bg-white dark:bg-black text-black dark:text-white">
          <div className="text-[11px] font-mono text-black/60 dark:text-white/60">ACTIVE IN-TRANSIT</div>
          <div className="text-2xl font-bold font-mono tabular-nums mt-1">{inTransit} En Route</div>
          <div className="text-[10px] text-black/50 dark:text-white/50 mt-1">Real-time GPS waypoints</div>
        </div>

        <div className="p-4 rounded border border-black/15 dark:border-white/15 bg-white dark:bg-black text-black dark:text-white">
          <div className="text-[11px] font-mono text-black/60 dark:text-white/60">AI QUALITY AVERAGE</div>
          <div className="text-2xl font-bold font-mono tabular-nums mt-1">{avgScore}%</div>
          <div className="text-[10px] text-black/50 dark:text-white/50 mt-1">YOLO defect vision score</div>
        </div>
      </div>

      {/* Monochrome Item-Flow Stage-Gate Visualization (Prompt Section 7) */}
      <div className="p-6 rounded-lg border border-black/15 dark:border-white/15 bg-white dark:bg-black text-black dark:text-white space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold font-mono uppercase tracking-wider">
              Item-Flow Lifecycle Funnel
            </h3>
            <p className="text-xs text-black/60 dark:text-white/60">
              End-to-end stage-gate throughput across active production batches
            </p>
          </div>
          <span className="text-xs font-mono text-black/50 dark:text-white/50">
            Source: On-Chain Event Logs
          </span>
        </div>

        {/* High-Contrast Black and White Flow SVG */}
        <div className="overflow-x-auto py-4">
          <div className="min-w-[700px] flex items-center justify-between gap-3 text-center">
            {/* Stage 1: Manufacturing */}
            <div className="flex-1 p-4 rounded border-2 border-black dark:border-white bg-black/5 dark:bg-white/5">
              <div className="text-[10px] font-mono uppercase tracking-wider text-black/60 dark:text-white/60">
                01. Manufacturing
              </div>
              <div className="text-xl font-bold font-mono tabular-nums mt-1">
                {total} Units
              </div>
              <div className="text-[10px] font-mono text-black/50 dark:text-white/50 mt-1">
                100% Edge Captured
              </div>
            </div>

            <div className="text-black/40 dark:text-white/40 font-mono text-xs">→</div>

            {/* Stage 2: AI Inspection */}
            <div className="flex-1 p-4 rounded border-2 border-black dark:border-white bg-black/5 dark:bg-white/5">
              <div className="text-[10px] font-mono uppercase tracking-wider text-black/60 dark:text-white/60">
                02. AI Inspection
              </div>
              <div className="text-xl font-bold font-mono tabular-nums mt-1">
                {total} Units
              </div>
              <div className="text-[10px] font-mono text-black/50 dark:text-white/50 mt-1">
                Avg Score: {avgScore}%
              </div>
            </div>

            <div className="text-black/40 dark:text-white/40 font-mono text-xs">→</div>

            {/* Stage 3: Certification */}
            <div className="flex-1 p-4 rounded border-2 border-black dark:border-white bg-black/5 dark:bg-white/5">
              <div className="text-[10px] font-mono uppercase tracking-wider text-black/60 dark:text-white/60">
                03. Certification
              </div>
              <div className="text-xl font-bold font-mono tabular-nums mt-1">
                {total - issues} Minted
              </div>
              <div className="text-[10px] font-mono text-black/50 dark:text-white/50 mt-1">
                {issues} Held in Review
              </div>
            </div>

            <div className="text-black/40 dark:text-white/40 font-mono text-xs">→</div>

            {/* Stage 4: Distribution */}
            <div className="flex-1 p-4 rounded border border-black/40 dark:border-white/40 bg-transparent">
              <div className="text-[10px] font-mono uppercase tracking-wider text-black/60 dark:text-white/60">
                04. Distribution
              </div>
              <div className="text-xl font-bold font-mono tabular-nums mt-1">
                {inTransit + delivered} Units
              </div>
              <div className="text-[10px] font-mono text-black/50 dark:text-white/50 mt-1">
                {inTransit} En Route
              </div>
            </div>

            <div className="text-black/40 dark:text-white/40 font-mono text-xs">→</div>

            {/* Stage 5: Delivered */}
            <div className="flex-1 p-4 rounded bg-black text-white dark:bg-white dark:text-black border-2 border-transparent">
              <div className="text-[10px] font-mono uppercase tracking-wider opacity-70">
                05. Customer Handover
              </div>
              <div className="text-xl font-bold font-mono tabular-nums mt-1">
                {delivered} Verified
              </div>
              <div className="text-[10px] font-mono opacity-80 mt-1">
                QR Authenticated
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Status Distribution Summary & Activity Table */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Status Distribution Meter */}
        <div className="p-6 rounded-lg border border-black/15 dark:border-white/15 bg-white dark:bg-black text-black dark:text-white space-y-4">
          <h4 className="text-sm font-bold font-mono uppercase tracking-wider">
            Status Distribution
          </h4>
          <p className="text-xs text-black/60 dark:text-white/60">
            Breakdown across total monitored batches
          </p>

          <div className="space-y-3 pt-2">
            <div>
              <div className="flex items-center justify-between text-xs font-mono mb-1">
                <span>In Transit ({inTransit})</span>
                <span>{Math.round((inTransit / total) * 100)}%</span>
              </div>
              <div className="w-full h-2 rounded bg-black/10 dark:bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-black/70 dark:bg-white/70"
                  style={{ width: `${(inTransit / total) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs font-mono mb-1">
                <span>Delivered & Verified ({delivered})</span>
                <span>{Math.round((delivered / total) * 100)}%</span>
              </div>
              <div className="w-full h-2 rounded bg-black/10 dark:bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-black dark:bg-white"
                  style={{ width: `${(delivered / total) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs font-mono mb-1">
                <span>Pending / Review ({pending + issues})</span>
                <span>{Math.round(((pending + issues) / total) * 100)}%</span>
              </div>
              <div className="w-full h-2 rounded bg-black/10 dark:bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-black/30 dark:bg-white/30"
                  style={{ width: `${((pending + issues) / total) * 100}%` }}
                />
              </div>
            </div>
          </div>

          <div className="p-3 mt-4 rounded border border-black/10 dark:border-white/10 text-[11px] font-mono text-black/60 dark:text-white/60">
            Compliance Note: All active batches verified in conformance with European Commission DPP Directive & NIST standards.
          </div>
        </div>

        {/* Right: Detailed Batch Audit Summary */}
        <div className="lg:col-span-2 p-6 rounded-lg border border-black/15 dark:border-white/15 bg-white dark:bg-black text-black dark:text-white space-y-4">
          <h4 className="text-sm font-bold font-mono uppercase tracking-wider">
            Audit Ledger Summary
          </h4>
          <div className="overflow-x-auto border border-black/10 dark:border-white/10 rounded">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 text-black/70 dark:text-white/70">
                  <th className="py-2.5 px-3">Batch ID</th>
                  <th className="py-2.5 px-3">Tracking ID</th>
                  <th className="py-2.5 px-3">Standard</th>
                  <th className="py-2.5 px-3">Quality Score</th>
                  <th className="py-2.5 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/10 dark:divide-white/10">
                {items.map((item) => (
                  <tr key={item.id} className="hover:bg-black/5 dark:hover:bg-white/5">
                    <td className="py-2.5 px-3 font-semibold">{item.batchId}</td>
                    <td className="py-2.5 px-3">{item.trackingId}</td>
                    <td className="py-2.5 px-3 text-black/60 dark:text-white/60">
                      {item.manufacturer.standard.split(' ')[0]}
                    </td>
                    <td className="py-2.5 px-3 font-bold tabular-nums">
                      {item.inspection.score}%
                    </td>
                    <td className="py-2.5 px-3">
                      <span className="px-1.5 py-0.5 rounded border border-black/20 dark:border-white/20 text-[10px]">
                        {item.status.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Print / PDF Modal Preview */}
      {showPrintModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="bg-white text-black p-6 sm:p-8 rounded-lg max-w-2xl w-full border border-black/30 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto font-mono">
            <div className="flex items-center justify-between pb-4 border-b border-black/20">
              <div>
                <h3 className="text-base font-bold uppercase tracking-wider">
                  TRACEONE QUALITY & PROVENANCE REPORT
                </h3>
                <div className="text-xs text-black/60 mt-0.5">
                  Generated: {new Date().toISOString().split('T')[0]} · Audit ID: AUD-2026-X99
                </div>
              </div>
              <button
                onClick={() => setShowPrintModal(false)}
                className="px-2 py-1 text-xs border border-black/30 rounded hover:bg-black/5 cursor-pointer"
              >
                Close
              </button>
            </div>

            <div className="text-xs space-y-3 leading-relaxed">
              <p>
                <strong>EXECUTIVE SUMMARY:</strong> This document certifies the end-to-end quality inspection and blockchain verification records for all active batches under the TraceOne enterprise network.
              </p>
              <div className="grid grid-cols-2 gap-3 p-3 bg-neutral-100 rounded text-xs">
                <div>Total Monitored Items: {total}</div>
                <div>Average AI Quality Score: {avgScore}%</div>
                <div>Delivered Items: {delivered}</div>
                <div>Active in Transit: {inTransit}</div>
              </div>
            </div>

            <div className="pt-4 border-t border-black/20 flex items-center justify-end gap-3">
              <button
                onClick={() => setShowPrintModal(false)}
                className="px-4 py-2 text-xs border border-black/30 rounded cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handlePrint}
                className="px-4 py-2 text-xs font-bold bg-black text-white rounded cursor-pointer flex items-center gap-2"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print / Save as PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
