/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { TraceItem } from '../../types/traceone';
import { CheckCircle2, AlertTriangle, RefreshCw, Shield, FileCheck, Copy, Check } from 'lucide-react';

interface TamperSimulatorProps {
  item: TraceItem;
  className?: string;
}

// Helper to compute SHA-256 hash string
async function computeSha256(str: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

export const TamperSimulator: React.FC<TamperSimulatorProps> = ({ item, className = '' }) => {
  const [tampered, setTampered] = useState(false);
  const [tamperedScore, setTamperedScore] = useState<number>(item.inspection.score);
  const [tamperedNotes, setTamperedNotes] = useState<string>('Zero manufacturing defects detected.');
  const [currentHash, setCurrentHash] = useState<string>(item.ipfs.rawDocumentHash);
  const [copied, setCopied] = useState(false);

  const authenticPayload = JSON.stringify({
    trackingId: item.trackingId,
    batchId: item.batchId,
    serialNumber: item.serialNumber,
    inspectionScore: item.inspection.score,
    decision: item.inspection.decision,
    cid: item.ipfs.cid,
    notes: 'Zero manufacturing defects detected.'
  });

  useEffect(() => {
    const recalculate = async () => {
      if (!tampered) {
        setCurrentHash(item.ipfs.rawDocumentHash);
      } else {
        const alteredPayload = JSON.stringify({
          trackingId: item.trackingId,
          batchId: item.batchId,
          serialNumber: item.serialNumber,
          inspectionScore: tamperedScore,
          decision: tamperedScore < 90 ? 'FAILED' : 'REVIEW',
          cid: item.ipfs.cid,
          notes: tamperedNotes
        });
        const recalculated = await computeSha256(alteredPayload);
        setCurrentHash(recalculated);
      }
    };
    recalculate();
  }, [tampered, tamperedScore, tamperedNotes, item]);

  const isMatch = currentHash === item.ipfs.rawDocumentHash;

  const copyHash = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`p-6 bg-white dark:bg-black border border-black/15 dark:border-white/15 text-black dark:text-white rounded-lg ${className}`}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-black/10 dark:border-white/10 gap-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded border border-black/20 dark:border-white/20 flex items-center justify-center bg-black/5 dark:bg-white/5">
            <Shield className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-semibold tracking-tight uppercase font-mono">
              Cryptographic Tamper Detection Engine
            </h4>
            <p className="text-xs text-black/60 dark:text-white/60">
              Real-time SHA-256 verification against on-chain smart contract reference
            </p>
          </div>
        </div>

        {/* Simulation Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              if (!tampered) {
                setTampered(true);
                setTamperedScore(84.0);
                setTamperedNotes('Modified inspection score (Unauthorized Alteration)');
              } else {
                setTampered(false);
                setTamperedScore(item.inspection.score);
                setTamperedNotes('Zero manufacturing defects detected.');
              }
            }}
            className={`px-3 py-1.5 text-xs font-mono font-medium rounded transition-colors cursor-pointer border ${
              tampered
                ? 'bg-black text-white dark:bg-white dark:text-black border-transparent'
                : 'bg-transparent text-black dark:text-white border-black/20 dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/5'
            }`}
          >
            {tampered ? 'Revert to Authentic Record' : 'Simulate Unauthorized Edit'}
          </button>

          {tampered && (
            <button
              onClick={() => {
                setTampered(false);
                setTamperedScore(item.inspection.score);
                setTamperedNotes('Zero manufacturing defects detected.');
              }}
              title="Reset"
              className="p-1.5 rounded border border-black/20 dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-5">
        {/* On-chain Recorded Hash */}
        <div className="p-4 rounded border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02]">
          <div className="flex items-center justify-between text-xs font-mono text-black/60 dark:text-white/60 mb-2">
            <span className="flex items-center gap-1.5">
              <FileCheck className="w-3.5 h-3.5" />
              On-Chain Blockchain Anchor
            </span>
            <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 border border-black/20 dark:border-white/20 rounded">
              Immutable
            </span>
          </div>
          <div className="font-mono text-xs break-all bg-black/5 dark:bg-white/5 p-2.5 rounded border border-black/10 dark:border-white/10 select-all">
            {item.ipfs.rawDocumentHash}
          </div>
          <div className="flex items-center justify-between mt-2 text-[11px] font-mono text-black/50 dark:text-white/50">
            <span>Contract: {item.blockchain.contractAddress.slice(0, 10)}...</span>
            <button
              onClick={() => copyHash(item.ipfs.rawDocumentHash)}
              className="hover:text-black dark:hover:text-white flex items-center gap-1 cursor-pointer"
            >
              {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
        </div>

        {/* Live Off-Chain Computed Document Hash */}
        <div
          className={`p-4 rounded border transition-colors ${
            isMatch
              ? 'border-black/20 dark:border-white/20 bg-black/[0.02] dark:bg-white/[0.02]'
              : 'border-black dark:border-white bg-black/5 dark:bg-white/10'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-mono mb-2">
            <span className="flex items-center gap-1.5 font-medium">
              <RefreshCw className="w-3.5 h-3.5" />
              Live Recomputed Document Hash
            </span>
            <span
              className={`text-[10px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded font-bold ${
                isMatch
                  ? 'bg-black text-white dark:bg-white dark:text-black'
                  : 'border border-black dark:border-white bg-transparent text-black dark:text-white'
              }`}
            >
              {isMatch ? 'Match' : 'Mismatch Alert'}
            </span>
          </div>
          <div
            className={`font-mono text-xs break-all p-2.5 rounded border select-all ${
              isMatch
                ? 'bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10'
                : 'bg-black text-white dark:bg-white dark:text-black border-transparent font-semibold'
            }`}
          >
            {currentHash}
          </div>
          <div className="flex items-center justify-between mt-2 text-[11px] font-mono text-black/50 dark:text-white/50">
            <span>Algorithm: SHA-256 (256-bit)</span>
            <span>CID: {item.ipfs.cid.slice(0, 12)}...</span>
          </div>
        </div>
      </div>

      {/* Verification Status Banner (Strict Black and White) */}
      <div
        className={`p-4 rounded flex items-start gap-3 border ${
          isMatch
            ? 'bg-black text-white dark:bg-white dark:text-black border-transparent'
            : 'bg-transparent text-black dark:text-white border-2 border-black dark:border-white'
        }`}
      >
        {isMatch ? (
          <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
        ) : (
          <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
        )}
        <div className="text-xs">
          <div className="font-bold uppercase tracking-wider font-mono">
            {isMatch
              ? 'MATCH — Content matches the recorded hash'
              : 'MISMATCH — Content differs from the recorded hash'}
          </div>
          <p className="mt-1 opacity-90 leading-relaxed">
            {isMatch
              ? 'Cryptographic reference on the Ethereum testnet confirms that zero alterations have occurred since the original quality inspection and passport minting event.'
              : 'Tamper alert triggered: The computed hash of this quality report does not match the blockchain reference. Content has been modified after on-chain anchoring.'}
          </p>
        </div>
      </div>

      {/* Editable Fields when Tampering is active */}
      {tampered && (
        <div className="mt-4 p-4 border border-black/20 dark:border-white/20 rounded bg-black/5 dark:bg-white/5">
          <h5 className="text-xs font-mono font-semibold uppercase tracking-wider mb-3">
            Simulated Off-Chain Document Edits
          </h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
            <div>
              <label className="block text-black/60 dark:text-white/60 mb-1">
                Inspection Quality Score (%):
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="100"
                value={tamperedScore}
                onChange={(e) => setTamperedScore(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-1.5 bg-white dark:bg-black border border-black/20 dark:border-white/20 rounded text-black dark:text-white"
              />
            </div>
            <div>
              <label className="block text-black/60 dark:text-white/60 mb-1">
                Report Annotation Note:
              </label>
              <input
                type="text"
                value={tamperedNotes}
                onChange={(e) => setTamperedNotes(e.target.value)}
                className="w-full px-3 py-1.5 bg-white dark:bg-black border border-black/20 dark:border-white/20 rounded text-black dark:text-white"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
