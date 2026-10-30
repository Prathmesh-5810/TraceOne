/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { TraceItem } from '../../types/traceone';
import { QrCode, CheckCircle2, ShieldCheck, Database, Cpu, ExternalLink, Hash, Copy, Check } from 'lucide-react';
import { TamperSimulator } from './TamperSimulator';

interface DigitalQualityPassportProps {
  item: TraceItem;
  className?: string;
}

export const DigitalQualityPassport: React.FC<DigitalQualityPassportProps> = ({ item, className = '' }) => {
  const [showTamperSim, setShowTamperSim] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Passport Header Card */}
      <div className="p-6 bg-white dark:bg-black border border-black/15 dark:border-white/15 text-black dark:text-white rounded-lg shadow-sm">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-black/10 dark:border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-black/60 dark:text-white/60 mb-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>DIGITAL QUALITY PASSPORT</span>
              <span>·</span>
              <span>{item.digitalPassport.passportId}</span>
            </div>
            <h2 className="text-xl font-bold tracking-tight text-black dark:text-white">
              {item.name}
            </h2>
            <p className="text-xs text-black/70 dark:text-white/70 mt-1 max-w-xl">
              Cryptographically unified manufacturing identity linking edge sensor telemetry, AI defect verification, decentralized IPFS reports, and on-chain immutability.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setShowTamperSim(!showTamperSim)}
              className="px-3 py-1.5 text-xs font-mono font-medium rounded border border-black/20 dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer transition-colors"
            >
              {showTamperSim ? 'Hide Tamper Simulator' : 'Test Tamper Engine'}
            </button>
            <button
              onClick={() => copyToClipboard(item.digitalPassport.qrPayload)}
              className="px-3 py-1.5 text-xs font-mono font-medium rounded bg-black text-white dark:bg-white dark:text-black hover:opacity-90 cursor-pointer flex items-center gap-1.5 transition-opacity"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Share Passport'}</span>
            </button>
          </div>
        </div>

        {/* Passport Layout - Inspired by PDF Slide 2 and Slide 5 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6">
          {/* Left Column: Passport Ledger Fields */}
          <div className="lg:col-span-8 space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="p-3 bg-black/5 dark:bg-white/5 rounded border border-black/10 dark:border-white/10">
                <div className="text-[10px] font-mono uppercase tracking-wider text-black/60 dark:text-white/60">
                  Tracking ID
                </div>
                <div className="text-sm font-mono font-bold mt-0.5 text-black dark:text-white">
                  {item.trackingId}
                </div>
              </div>

              <div className="p-3 bg-black/5 dark:bg-white/5 rounded border border-black/10 dark:border-white/10">
                <div className="text-[10px] font-mono uppercase tracking-wider text-black/60 dark:text-white/60">
                  Batch Reference
                </div>
                <div className="text-sm font-mono font-bold mt-0.5 text-black dark:text-white">
                  {item.batchId}
                </div>
              </div>

              <div className="p-3 bg-black/5 dark:bg-white/5 rounded border border-black/10 dark:border-white/10">
                <div className="text-[10px] font-mono uppercase tracking-wider text-black/60 dark:text-white/60">
                  Serial Number
                </div>
                <div className="text-sm font-mono font-bold mt-0.5 text-black dark:text-white">
                  {item.serialNumber}
                </div>
              </div>

              <div className="p-3 bg-black/5 dark:bg-white/5 rounded border border-black/10 dark:border-white/10">
                <div className="text-[10px] font-mono uppercase tracking-wider text-black/60 dark:text-white/60">
                  Inspection Status
                </div>
                <div className="text-sm font-mono font-bold mt-0.5 flex items-center gap-1.5 text-black dark:text-white">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {item.inspection.decision} ({item.inspection.score}%)
                </div>
              </div>

              <div className="p-3 bg-black/5 dark:bg-white/5 rounded border border-black/10 dark:border-white/10">
                <div className="text-[10px] font-mono uppercase tracking-wider text-black/60 dark:text-white/60">
                  Certification Record
                </div>
                <div className="text-sm font-mono font-bold mt-0.5 text-black dark:text-white">
                  {item.manufacturer.standard}
                </div>
              </div>

              <div className="p-3 bg-black/5 dark:bg-white/5 rounded border border-black/10 dark:border-white/10">
                <div className="text-[10px] font-mono uppercase tracking-wider text-black/60 dark:text-white/60">
                  Verification Status
                </div>
                <div className="text-sm font-mono font-bold mt-0.5 flex items-center gap-1.5 text-black dark:text-white">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  HASH VERIFIED
                </div>
              </div>
            </div>

            {/* Off-Chain IPFS and On-Chain Blockchain Specs */}
            <div className="p-4 rounded border border-black/10 dark:border-white/10 space-y-3 bg-black/[0.02] dark:bg-white/[0.02]">
              <div className="flex items-center justify-between text-xs font-mono font-semibold">
                <span className="flex items-center gap-1.5 text-black dark:text-white">
                  <Database className="w-3.5 h-3.5" />
                  Off-Chain IPFS Storage Details
                </span>
                <span className="text-[10px] text-black/60 dark:text-white/60 font-normal">
                  {item.ipfs.pinnedGateways} Gateways Pinned · Size: {item.ipfs.fileSize}
                </span>
              </div>
              <div className="text-xs font-mono break-all bg-black/5 dark:bg-white/5 p-2 rounded border border-black/10 dark:border-white/10 flex items-center justify-between">
                <span>CID: {item.ipfs.cid}</span>
                <button
                  onClick={() => copyToClipboard(item.ipfs.cid)}
                  className="hover:text-black dark:hover:text-white text-black/60 dark:text-white/60 shrink-0 ml-2 cursor-pointer"
                  title="Copy CID"
                >
                  <Copy className="w-3 h-3" />
                </button>
              </div>

              <div className="flex items-center justify-between text-xs font-mono font-semibold pt-2 border-t border-black/10 dark:border-white/10">
                <span className="flex items-center gap-1.5 text-black dark:text-white">
                  <Cpu className="w-3.5 h-3.5" />
                  On-Chain Smart Contract Ledger
                </span>
                <span className="text-[10px] text-black/60 dark:text-white/60 font-normal">
                  Block #{item.blockchain.blockNumber} · {item.blockchain.network}
                </span>
              </div>
              <div className="text-xs font-mono break-all bg-black/5 dark:bg-white/5 p-2 rounded border border-black/10 dark:border-white/10 flex items-center justify-between">
                <span>Tx: {item.blockchain.txHash}</span>
                <button
                  onClick={() => copyToClipboard(item.blockchain.txHash)}
                  className="hover:text-black dark:hover:text-white text-black/60 dark:text-white/60 shrink-0 ml-2 cursor-pointer"
                  title="Copy Transaction Hash"
                >
                  <Copy className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Physical QR Code & Seal */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 rounded border border-black/15 dark:border-white/15 bg-black/[0.03] dark:bg-white/[0.03] text-center">
            {/* High-fidelity SVG QR Code representation in strict black and white */}
            <div className="p-3 bg-white border-2 border-black rounded shadow-sm">
              <svg
                viewBox="0 0 120 120"
                className="w-36 h-36"
                shapeRendering="crispEdges"
              >
                {/* 3 Corner Finder Patterns */}
                <rect x="0" y="0" width="35" height="35" fill="black" />
                <rect x="5" y="5" width="25" height="25" fill="white" />
                <rect x="10" y="10" width="15" height="15" fill="black" />

                <rect x="85" y="0" width="35" height="35" fill="black" />
                <rect x="90" y="5" width="25" height="25" fill="white" />
                <rect x="95" y="10" width="15" height="15" fill="black" />

                <rect x="0" y="85" width="35" height="35" fill="black" />
                <rect x="5" y="90" width="25" height="25" fill="white" />
                <rect x="10" y="95" width="15" height="15" fill="black" />

                {/* Timing patterns and internal QR matrix blocks */}
                <rect x="40" y="12" width="6" height="6" fill="black" />
                <rect x="52" y="12" width="6" height="6" fill="black" />
                <rect x="64" y="12" width="6" height="6" fill="black" />
                <rect x="76" y="12" width="6" height="6" fill="black" />

                <rect x="12" y="40" width="6" height="6" fill="black" />
                <rect x="12" y="52" width="6" height="6" fill="black" />
                <rect x="12" y="64" width="6" height="6" fill="black" />
                <rect x="12" y="76" width="6" height="6" fill="black" />

                <rect x="42" y="42" width="12" height="12" fill="black" />
                <rect x="60" y="42" width="6" height="12" fill="black" />
                <rect x="72" y="42" width="18" height="6" fill="black" />
                <rect x="42" y="60" width="18" height="6" fill="black" />
                <rect x="66" y="54" width="12" height="12" fill="black" />
                <rect x="48" y="72" width="24" height="6" fill="black" />
                <rect x="78" y="66" width="12" height="18" fill="black" />

                <rect x="42" y="88" width="6" height="18" fill="black" />
                <rect x="54" y="94" width="18" height="6" fill="black" />
                <rect x="78" y="90" width="12" height="12" fill="black" />
                <rect x="66" y="106" width="18" height="6" fill="black" />
              </svg>
            </div>

            <div className="mt-3 text-xs font-mono font-semibold uppercase tracking-wider text-black dark:text-white">
              Scan to Verify Authenticity
            </div>
            <p className="text-[11px] text-black/60 dark:text-white/60 mt-1 max-w-[200px]">
              Direct QR verification resolves to smart contract address and IPFS inspection archive.
            </p>
          </div>
        </div>

        {/* SDG Integration Tags from PDF */}
        <div className="mt-6 pt-4 border-t border-black/10 dark:border-white/10 flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-mono text-black/50 dark:text-white/50 mr-2">
            UN SDG Alignment:
          </span>
          {item.digitalPassport.sdgAlignment.map((sdg, idx) => (
            <span
              key={idx}
              className="px-2.5 py-1 text-[11px] font-mono rounded border border-black/20 dark:border-white/20 bg-black/5 dark:bg-white/5 text-black dark:text-white"
            >
              {sdg}
            </span>
          ))}
        </div>
      </div>

      {/* Embedded Tamper Simulator */}
      {showTamperSim && <TamperSimulator item={item} />}
    </div>
  );
};
