import React from 'react';
import { ShieldCheck, Download } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenDownloadModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenDownloadModal
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-6 py-4">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <div 
          onClick={() => setActiveTab('apks')} 
          className="flex items-center gap-2.5 cursor-pointer text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 hover:opacity-90 transition-opacity"
        >
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <span>JioShield STB</span>
        </div>

        {/* Zone 2: 4-5 Clean Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400">
          <button
            onClick={() => setActiveTab('apks')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-white ${
              activeTab === 'apks' ? 'text-emerald-400 font-semibold' : ''
            }`}
          >
            APK Hub
          </button>
          <button
            onClick={() => setActiveTab('webadb')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-white ${
              activeTab === 'webadb' ? 'text-emerald-400 font-semibold' : ''
            }`}
          >
            Cable WebADB
          </button>
          <button
            onClick={() => setActiveTab('blocklists')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-white ${
              activeTab === 'blocklists' ? 'text-emerald-400 font-semibold' : ''
            }`}
          >
            Blocklists & DNS
          </button>
          <button
            onClick={() => setActiveTab('debloat')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-white ${
              activeTab === 'debloat' ? 'text-emerald-400 font-semibold' : ''
            }`}
          >
            Debloat Tools
          </button>
          <button
            onClick={() => setActiveTab('guide')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-white ${
              activeTab === 'guide' ? 'text-emerald-400 font-semibold' : ''
            }`}
          >
            Cable Guide
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenDownloadModal}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 rounded-lg hover:bg-emerald-300 active:scale-[0.98] transition-all whitespace-nowrap shrink-0 shadow-sm shadow-emerald-500/20"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download APK</span>
          </button>
        </div>
      </div>
    </header>
  );
};
