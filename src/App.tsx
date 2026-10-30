/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Sidebar, NavView } from './components/layout/Sidebar';
import { TopHeader } from './components/layout/TopHeader';
import { DashboardView } from './components/views/DashboardView';
import { ShipmentsView } from './components/views/ShipmentsView';
import { TraceabilityView } from './components/views/TraceabilityView';
import { ReportsView } from './components/views/ReportsView';
import { VisualizerView } from './components/views/VisualizerView';
import { SettingsView } from './components/views/SettingsView';
import { StaticMeshFlow } from './components/ui/StaticMeshFlow';
import { ShaderAnimation } from './components/ui/ShaderAnimation';
import { INITIAL_TRACE_ITEMS } from './data/mockDatasets';
import { TraceItem, IndustryDomain } from './types/traceone';

export default function App() {
  // Theme state persisted in localStorage
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem('traceone-theme');
    if (saved !== null) {
      return saved === 'dark';
    }
    return true; // Default to dark mode
  });

  // Active navigation view
  const [activeView, setActiveView] = useState<NavView>('dashboard');

  // Selected item for tracking and passport views
  const [items, setItems] = useState<TraceItem[]>(INITIAL_TRACE_ITEMS);
  const [selectedItem, setSelectedItem] = useState<TraceItem>(INITIAL_TRACE_ITEMS[0]);

  // Global search & Industry domain preset
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedIndustry, setSelectedIndustry] = useState<IndustryDomain>('all');

  // Background animation effects
  const [ambientShader, setAmbientShader] = useState<boolean>(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);

  // Sync theme class to document element
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('traceone-theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('traceone-theme', 'light');
    }
  }, [isDark]);

  // Filter items by industry and global search query
  const displayedItems = useMemo(() => {
    return items.filter((item) => {
      // Industry filter
      if (selectedIndustry !== 'all' && item.industry !== selectedIndustry) {
        return false;
      }
      // Global search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesQuery =
          item.trackingId.toLowerCase().includes(q) ||
          item.name.toLowerCase().includes(q) ||
          item.batchId.toLowerCase().includes(q) ||
          item.serialNumber.toLowerCase().includes(q) ||
          item.lastKnownLocation.city.toLowerCase().includes(q) ||
          item.lastKnownLocation.country.toLowerCase().includes(q);
        if (!matchesQuery) return false;
      }
      return true;
    });
  }, [items, selectedIndustry, searchQuery]);

  // Map view IDs to page header titles
  const viewTitles: Record<NavView, string> = {
    dashboard: 'Global Tracking & Traceability Dashboard',
    shipments: 'Shipments & Item Lifecycle Tracking',
    traceability: 'Traceability & Digital Quality Passports',
    reports: 'Quality Reports & Operational Analytics',
    visualizer: '3D Procedural Shader Visualizer',
    settings: 'Platform Settings & Node Configuration'
  };

  const handleSelectTrackItem = (item: TraceItem) => {
    setSelectedItem(item);
    setActiveView('shipments');
  };

  const handleOpenPassport = (item: TraceItem) => {
    setSelectedItem(item);
    setActiveView('traceability');
  };

  return (
    <div className="relative min-h-screen bg-neutral-100 dark:bg-black text-black dark:text-white flex transition-colors duration-200">
      {/* Background Interactive Layer 1: 2D Canvas Gaussian Static Mesh Flow */}
      <StaticMeshFlow isDark={isDark} />

      {/* Background Interactive Layer 2: Subtle Three.js Procedural Shader (When enabled) */}
      {ambientShader && activeView !== 'visualizer' && (
        <ShaderAnimation
          speedMultiplier={0.8}
          waveDensity={1.2}
          mode="ambient"
          isDark={isDark}
          className="opacity-40"
        />
      )}

      {/* Left Persistent Navigation Sidebar */}
      <Sidebar
        activeView={activeView}
        onSelectView={setActiveView}
        isOpenMobile={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
        totalItemsCount={displayedItems.length}
      />

      {/* Main Workspace */}
      <div className="flex-1 flex flex-col min-w-0 z-10">
        {/* Top Header */}
        <TopHeader
          pageTitle={viewTitles[activeView]}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedIndustry={selectedIndustry}
          onSelectIndustry={setSelectedIndustry}
          isDark={isDark}
          onToggleTheme={setIsDark}
          ambientShader={ambientShader}
          onToggleShader={setAmbientShader}
          onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
        />

        {/* Content Viewport */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {activeView === 'dashboard' && (
            <DashboardView
              items={displayedItems}
              onSelectTrackItem={handleSelectTrackItem}
              onOpenPassport={handleOpenPassport}
              onNavigateShipments={() => setActiveView('shipments')}
            />
          )}

          {activeView === 'shipments' && (
            <ShipmentsView
              items={displayedItems.length > 0 ? displayedItems : items}
              selectedItem={selectedItem}
              onSelectItem={setSelectedItem}
              onOpenPassport={handleOpenPassport}
            />
          )}

          {activeView === 'traceability' && (
            <TraceabilityView
              items={displayedItems.length > 0 ? displayedItems : items}
              selectedItem={selectedItem}
              onSelectItem={setSelectedItem}
            />
          )}

          {activeView === 'reports' && (
            <ReportsView items={displayedItems.length > 0 ? displayedItems : items} />
          )}

          {activeView === 'visualizer' && (
            <VisualizerView isDark={isDark} />
          )}

          {activeView === 'settings' && (
            <SettingsView />
          )}
        </main>
      </div>
    </div>
  );
}
