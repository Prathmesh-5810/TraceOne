/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  LayoutDashboard,
  Truck,
  ShieldCheck,
  BarChart3,
  Waves,
  Settings,
  ChevronRight,
  LogOut,
  X
} from 'lucide-react';

export type NavView = 'dashboard' | 'shipments' | 'traceability' | 'reports' | 'visualizer' | 'settings';

interface SidebarProps {
  activeView: NavView;
  onSelectView: (view: NavView) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  totalItemsCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeView,
  onSelectView,
  isOpenMobile,
  onCloseMobile,
  totalItemsCount
}) => {
  const navItems = [
    { id: 'dashboard' as NavView, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'shipments' as NavView, label: 'Shipments', icon: Truck, count: totalItemsCount },
    { id: 'traceability' as NavView, label: 'Traceability', icon: ShieldCheck },
    { id: 'reports' as NavView, label: 'Reports', icon: BarChart3 },
    { id: 'visualizer' as NavView, label: '3D Visualizer', icon: Waves },
    { id: 'settings' as NavView, label: 'Settings', icon: Settings },
  ];

  const content = (
    <div className="flex flex-col h-full bg-white dark:bg-black text-black dark:text-white border-r border-black/15 dark:border-white/15 select-none">
      {/* Brand Header */}
      <div className="h-16 px-6 flex items-center justify-between border-b border-black/10 dark:border-white/10 shrink-0">
        <div className="flex items-center gap-3">
          {/* TraceOne Logo: Connected network node + gear SVG symbol from PDF */}
          <div className="w-8 h-8 rounded bg-black text-white dark:bg-white dark:text-black flex items-center justify-center font-bold">
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2">
              <circle cx="12" cy="12" r="3" />
              <circle cx="12" cy="4" r="2" />
              <circle cx="5" cy="18" r="2" />
              <circle cx="19" cy="18" r="2" />
              <line x1="12" y1="6" x2="12" y2="9" />
              <line x1="6.5" y1="16.5" x2="10" y2="13.5" />
              <line x1="17.5" y1="16.5" x2="14" y2="13.5" />
            </svg>
          </div>
          <div>
            <span className="text-base font-bold tracking-tight uppercase font-mono">
              TraceOne
            </span>
            <span className="block text-[9px] font-mono tracking-widest text-black/50 dark:text-white/50 -mt-1">
              QUALITY LEDGER
            </span>
          </div>
        </div>

        {/* Mobile close button */}
        <button
          onClick={onCloseMobile}
          className="lg:hidden p-1.5 text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white cursor-pointer"
          aria-label="Close menu"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        <div className="px-3 pb-2 text-[10px] font-mono uppercase tracking-wider text-black/40 dark:text-white/40">
          Navigation
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                onSelectView(item.id);
                onCloseMobile();
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded text-xs font-medium transition-colors cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black dark:focus-visible:ring-white ${
                isActive
                  ? 'bg-black text-white dark:bg-white dark:text-black font-semibold'
                  : 'text-black/70 hover:text-black dark:text-white/70 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                    isActive ? 'text-white dark:text-black' : 'text-black/60 dark:text-white/60'
                  }`}
                />
                <span className="font-mono text-xs">{item.label}</span>
              </div>

              {item.count !== undefined && (
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                    isActive
                      ? 'bg-white/20 text-white dark:bg-black/20 dark:text-black'
                      : 'bg-black/10 text-black dark:bg-white/10 dark:text-white'
                  }`}
                >
                  {item.count}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Network & Node Status Box */}
      <div className="p-3 mx-3 mb-3 rounded border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02]">
        <div className="flex items-center justify-between text-[10px] font-mono">
          <span className="text-black/60 dark:text-white/60">ETHEREUM TESTNET</span>
          <span className="font-bold">SEPOLIA</span>
        </div>
        <div className="flex items-center justify-between text-[10px] font-mono text-black/40 dark:text-white/40 mt-1">
          <span>IPFS CLUSTER</span>
          <span>PINNED (24/24)</span>
        </div>
      </div>

      {/* User Profile & Account Controls */}
      <div className="p-4 border-t border-black/10 dark:border-white/10 shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full border border-black/20 dark:border-white/20 flex items-center justify-center font-mono text-xs font-bold bg-black/5 dark:bg-white/5">
              TO
            </div>
            <div className="truncate max-w-[120px]">
              <div className="text-xs font-semibold truncate">Dr. Aris Thorne</div>
              <div className="text-[10px] font-mono text-black/50 dark:text-white/50 truncate">
                Chief Quality Officer
              </div>
            </div>
          </div>
          <button
            title="Account Menu"
            className="p-1.5 text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:block w-64 h-screen sticky top-0 shrink-0 z-30">
        {content}
      </aside>

      {/* Mobile Drawer */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={onCloseMobile}
            aria-hidden="true"
          />
          <div className="relative w-72 max-w-[85vw] h-full z-10 shadow-xl">
            {content}
          </div>
        </div>
      )}
    </>
  );
};
