import React from 'react';
import { ShieldCheck } from 'lucide-react';

interface FooterProps {
  onNavigateTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateTab }) => {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 py-10 text-xs text-slate-500">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2 text-slate-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span className="font-semibold text-white">JioShield STB</span>
          <span aria-hidden="true" className="text-slate-700">·</span>
          <span>Open-Source Android TV AdBlock &amp; USB Cable Sideload Tool</span>
        </div>

        <div className="flex items-center gap-6">
          <button
            onClick={() => onNavigateTab('apks')}
            className="hover:text-slate-300 transition-colors"
          >
            APK Catalog
          </button>
          <button
            onClick={() => onNavigateTab('webadb')}
            className="hover:text-slate-300 transition-colors"
          >
            Cable WebADB
          </button>
          <button
            onClick={() => onNavigateTab('blocklists')}
            className="hover:text-slate-300 transition-colors"
          >
            Blocklists
          </button>
          <button
            onClick={() => onNavigateTab('debloat')}
            className="hover:text-slate-300 transition-colors"
          >
            Debloat
          </button>
          <button
            onClick={() => onNavigateTab('guide')}
            className="hover:text-slate-300 transition-colors"
          >
            Sideload Guide
          </button>
        </div>
      </div>
    </footer>
  );
};
