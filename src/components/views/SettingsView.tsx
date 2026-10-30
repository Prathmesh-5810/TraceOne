/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { SDG_REFERENCES } from '../../data/mockDatasets';
import { Settings, Shield, Database, Cpu, Globe, Check, Save } from 'lucide-react';

export const SettingsView: React.FC = () => {
  const [network, setNetwork] = useState('Ethereum Sepolia Testnet (PoS)');
  const [contractAddress, setContractAddress] = useState('0x328bF9eC40F00185cEb778B5F6e469b2d8B182Cc');
  const [ipfsGateway, setIpfsGateway] = useState('https://ipfs.traceone.network/ipfs/');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="p-6 md:p-8 rounded-lg border border-black/15 dark:border-white/15 bg-white dark:bg-black text-black dark:text-white space-y-2">
        <h2 className="text-xl sm:text-2xl font-bold font-mono uppercase tracking-tight">
          Platform Configuration & Node Parameters
        </h2>
        <p className="text-xs sm:text-sm text-black/70 dark:text-white/70 leading-relaxed">
          Manage blockchain smart contract integration, off-chain IPFS artifact gateways, and compliance frameworks.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Blockchain Node Settings */}
        <div className="p-6 rounded-lg border border-black/15 dark:border-white/15 bg-white dark:bg-black text-black dark:text-white space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider pb-2 border-b border-black/10 dark:border-white/10">
            <Cpu className="w-4 h-4" />
            <span>On-Chain Blockchain Parameters</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
            <div>
              <label className="block text-black/60 dark:text-white/60 mb-1">
                Active Blockchain Network:
              </label>
              <input
                type="text"
                value={network}
                onChange={(e) => setNetwork(e.target.value)}
                className="w-full px-3 py-2 rounded border border-black/20 dark:border-white/20 bg-black/5 dark:bg-white/5 text-black dark:text-white"
              />
            </div>

            <div>
              <label className="block text-black/60 dark:text-white/60 mb-1">
                Registry Smart Contract Address:
              </label>
              <input
                type="text"
                value={contractAddress}
                onChange={(e) => setContractAddress(e.target.value)}
                className="w-full px-3 py-2 rounded border border-black/20 dark:border-white/20 bg-black/5 dark:bg-white/5 text-black dark:text-white font-mono"
              />
            </div>
          </div>
        </div>

        {/* IPFS Artifact Storage */}
        <div className="p-6 rounded-lg border border-black/15 dark:border-white/15 bg-white dark:bg-black text-black dark:text-white space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider pb-2 border-b border-black/10 dark:border-white/10">
            <Database className="w-4 h-4" />
            <span>Decentralized Off-Chain Storage (IPFS)</span>
          </div>

          <div className="text-xs font-mono">
            <label className="block text-black/60 dark:text-white/60 mb-1">
              Designated IPFS Public Gateway:
            </label>
            <input
              type="text"
              value={ipfsGateway}
              onChange={(e) => setIpfsGateway(e.target.value)}
              className="w-full px-3 py-2 rounded border border-black/20 dark:border-white/20 bg-black/5 dark:bg-white/5 text-black dark:text-white"
            />
          </div>
        </div>

        {/* UN SDG Frameworks Reference from PDF Slide 4 */}
        <div className="p-6 rounded-lg border border-black/15 dark:border-white/15 bg-white dark:bg-black text-black dark:text-white space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider pb-2 border-b border-black/10 dark:border-white/10">
            <Globe className="w-4 h-4" />
            <span>UN Sustainable Development Goals (SDG) Alignment</span>
          </div>

          <div className="space-y-3">
            {SDG_REFERENCES.map((sdg, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] text-xs font-mono space-y-1"
              >
                <div className="flex items-center justify-between font-bold text-black dark:text-white">
                  <span>{sdg.target}</span>
                  <span className="text-[10px] text-black/50 dark:text-white/50">{sdg.code}</span>
                </div>
                <p className="text-[11px] text-black/70 dark:text-white/70 leading-relaxed font-sans">
                  {sdg.summary}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-end gap-3">
          {saved && (
            <span className="text-xs font-mono flex items-center gap-1.5 text-black dark:text-white">
              <Check className="w-3.5 h-3.5" />
              Settings Saved
            </span>
          )}
          <button
            type="submit"
            className="px-5 py-2 text-xs font-mono font-bold rounded bg-black text-white dark:bg-white dark:text-black hover:opacity-90 cursor-pointer flex items-center gap-2 transition-opacity"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Configuration</span>
          </button>
        </div>
      </form>
    </div>
  );
};
