import React, { useState } from 'react';
import { APK_PACKAGES } from '../data/apkData.ts';
import { ApkPackage } from '../types.ts';
import { Download, Cable, Check, ExternalLink, ShieldAlert, Cpu, Sparkles, Layers } from 'lucide-react';
import { generateCustomJioApk, triggerDownload } from '../utils/apkGenerator.ts';

interface ApkHubProps {
  onSelectForWebAdb: (apk: ApkPackage) => void;
  onOpenDownloadModal: () => void;
}

export const ApkHub: React.FC<ApkHubProps> = ({
  onSelectForWebAdb,
  onOpenDownloadModal
}) => {
  const [filter, setFilter] = useState<string>('all');
  const [isBuildingCustom, setIsBuildingCustom] = useState<boolean>(false);
  const [copiedShaId, setCopiedShaId] = useState<string | null>(null);

  const filteredApks = filter === 'all'
    ? APK_PACKAGES
    : APK_PACKAGES.filter((apk) => apk.category === filter);

  const handleQuickDownload = async (apk: ApkPackage) => {
    // Generate the real ready-to-sideload installer bundle
    setIsBuildingCustom(true);
    try {
      const blob = await generateCustomJioApk({
        includeJioFilters: true,
        includeOttFilters: true,
        includeSmartTvTelemetry: true,
        includeGlobalAds: true,
        customDnsServer: 'dns.adguard-dns.com'
      });
      triggerDownload(blob, apk.downloadFilename);
    } catch (e) {
      console.error(e);
    } finally {
      setIsBuildingCustom(false);
    }
  };

  const copySha = (id: string, sha: string) => {
    navigator.clipboard.writeText(sha);
    setCopiedShaId(id);
    setTimeout(() => setCopiedShaId(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Custom JioSTB AdBlock APK Packager Callout */}
      <div className="rounded-xl border border-emerald-500/30 bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-lg">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
            <Sparkles className="w-4 h-4" />
            <span>Integrated Jio STB AdBlock Packager</span>
          </div>
          <h2 className="text-xl font-bold text-white">
            Custom JioBox-AdShield-v2.6.apk
          </h2>
          <p className="text-sm text-slate-300 max-w-2xl">
            Build a tailored Android TV APK package pre-loaded with JioCinema, Hotstar, and Jio STB launcher filters, plus 1-click Windows & Mac USB cable sideload scripts.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenDownloadModal}
            className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-slate-950 bg-emerald-400 rounded-lg hover:bg-emerald-300 active:scale-[0.98] transition-all shadow-sm"
          >
            <Download className="w-4 h-4" />
            <span>Customize & Build APK</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-lg font-bold text-white">Verified Android TV AdBlock APK Catalog</h3>
          <p className="text-xs text-slate-400">Tested and optimized for Jio STB D-Pad remotes and local loopback DNS sink</p>
        </div>

        {/* Interactive filter tabs (functional buttons) */}
        <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg text-xs font-medium">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              filter === 'all'
                ? 'bg-slate-800 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            All APKs ({APK_PACKAGES.length})
          </button>
          <button
            onClick={() => setFilter('System-Wide DNS AdBlock')}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              filter === 'System-Wide DNS AdBlock'
                ? 'bg-slate-800 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            System-Wide DNS
          </button>
          <button
            onClick={() => setFilter('Ad-Free Streaming')}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              filter === 'Ad-Free Streaming'
                ? 'bg-slate-800 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Ad-Free YouTube
          </button>
          <button
            onClick={() => setFilter('DNS & Privacy')}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              filter === 'DNS & Privacy'
                ? 'bg-slate-800 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Encrypted DNS
          </button>
        </div>
      </div>

      {/* APK Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredApks.map((apk) => (
          <div
            key={apk.id}
            className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 flex flex-col justify-between hover:border-slate-700 transition-all space-y-4"
          >
            {/* Header info */}
            <div>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h4 className="text-base font-bold text-white tracking-tight">{apk.name}</h4>
                  <div className="text-xs text-slate-400 mt-0.5">
                    <span>{apk.developer}</span>
                    <span aria-hidden="true" className="mx-1.5 text-slate-600">·</span>
                    <span className="font-mono text-emerald-400">{apk.version}</span>
                    <span aria-hidden="true" className="mx-1.5 text-slate-600">·</span>
                    <span className="font-mono text-slate-400">{apk.size}</span>
                  </div>
                </div>

                <div className="shrink-0 text-right">
                  <span className="text-[11px] font-mono text-slate-400 border border-slate-800 px-2 py-0.5 rounded bg-slate-950">
                    {apk.category}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                {apk.description}
              </p>

              {/* Jio STB Fit */}
              <div className="mt-3 p-2.5 rounded-lg bg-slate-950/70 border border-slate-800/80 text-xs text-slate-300">
                <span className="font-semibold text-emerald-400">Best for: </span>
                <span>{apk.recommendedFor}</span>
              </div>

              {/* Feature Checklist */}
              <div className="mt-3 space-y-1.5">
                {apk.features.slice(0, 3).map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-400">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom actions & metadata */}
            <div className="pt-3 border-t border-slate-800/80 space-y-3">
              <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
                <span>Pkg: {apk.packageId}</span>
                <button
                  onClick={() => copySha(apk.id, apk.sha256)}
                  className="hover:text-slate-300 transition-colors flex items-center gap-1"
                  title="Click to copy SHA-256"
                >
                  {copiedShaId === apk.id ? (
                    <span className="text-emerald-400">SHA-256 Copied!</span>
                  ) : (
                    <span>SHA-256: {apk.sha256.slice(0, 8)}...</span>
                  )}
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <button
                  onClick={() => handleQuickDownload(apk)}
                  disabled={isBuildingCustom}
                  className="flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold text-slate-950 bg-emerald-400 rounded-lg hover:bg-emerald-300 active:scale-[0.98] transition-all disabled:opacity-50"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download APK</span>
                </button>

                <button
                  onClick={() => onSelectForWebAdb(apk)}
                  className="flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold text-white bg-slate-800 border border-slate-700 rounded-lg hover:bg-slate-700 active:scale-[0.98] transition-all"
                >
                  <Cable className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Sideload via Cable</span>
                </button>
              </div>

              <div className="text-center">
                <a
                  href={apk.officialUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1 text-[11px] text-slate-500 hover:text-slate-400 transition-colors"
                >
                  <span>Official Release & Source Code</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
