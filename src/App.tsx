import React, { useState } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { ApkHub } from './components/ApkHub.tsx';
import { CableWebAdb } from './components/CableWebAdb.tsx';
import { BlocklistManager } from './components/BlocklistManager.tsx';
import { DebloatManager } from './components/DebloatManager.tsx';
import { CableGuide } from './components/CableGuide.tsx';
import { AdTestTool } from './components/AdTestTool.tsx';
import { DownloadModal } from './components/DownloadModal.tsx';
import { Footer } from './components/Footer.tsx';
import { ApkPackage } from './types.ts';
import { APK_PACKAGES } from './data/apkData.ts';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('apks');
  const [selectedApk, setSelectedApk] = useState<ApkPackage | null>(APK_PACKAGES[0]);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState<boolean>(false);

  const handleSelectForWebAdb = (apk: ApkPackage) => {
    setSelectedApk(apk);
    setActiveTab('webadb');
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Top Bar Contract Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenDownloadModal={() => setIsDownloadModalOpen(true)}
      />

      {/* Hero Section */}
      <Hero
        onOpenDownloadModal={() => setIsDownloadModalOpen(true)}
        onNavigateToWebAdb={() => {
          setActiveTab('webadb');
          window.scrollTo({ top: 400, behavior: 'smooth' });
        }}
        onNavigateToGuide={() => {
          setActiveTab('guide');
          window.scrollTo({ top: 400, behavior: 'smooth' });
        }}
      />

      {/* Main Content Workspace Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-10 space-y-12">
        {/* Active Tab View */}
        {activeTab === 'apks' && (
          <ApkHub
            onSelectForWebAdb={handleSelectForWebAdb}
            onOpenDownloadModal={() => setIsDownloadModalOpen(true)}
          />
        )}

        {activeTab === 'webadb' && (
          <CableWebAdb
            selectedApk={selectedApk}
            onSelectApk={(apk) => setSelectedApk(apk)}
            onNavigateToGuide={() => {
              setActiveTab('guide');
              window.scrollTo({ top: 400, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'blocklists' && <BlocklistManager />}

        {activeTab === 'debloat' && <DebloatManager />}

        {activeTab === 'guide' && <CableGuide />}

        {/* Live Network & DNS Diagnostic Prober */}
        <section className="pt-6 border-t border-slate-800/80">
          <AdTestTool />
        </section>
      </main>

      {/* Footer */}
      <Footer onNavigateTab={(tab) => {
        setActiveTab(tab);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }} />

      {/* Custom APK Package Compiler Modal */}
      <DownloadModal
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
      />
    </div>
  );
}
