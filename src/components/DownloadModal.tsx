import React, { useState } from 'react';
import { X, Download, Check, Sparkles, FileArchive, PackageCheck, Cable, RefreshCw } from 'lucide-react';
import { generateCustomJioApk, triggerDownload } from '../utils/apkGenerator.ts';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DownloadModal: React.FC<DownloadModalProps> = ({ isOpen, onClose }) => {
  const [includeJio, setIncludeJio] = useState(true);
  const [includeOtt, setIncludeOtt] = useState(true);
  const [includeSmartTv, setIncludeSmartTv] = useState(true);
  const [includeGlobal, setIncludeGlobal] = useState(true);
  const [dnsServer, setDnsServer] = useState('dns.adguard-dns.com');
  const [format, setFormat] = useState<'apk' | 'bundle'>('apk');
  const [isBuilding, setIsBuilding] = useState(false);

  if (!isOpen) return null;

  const handleBuild = async () => {
    setIsBuilding(true);
    try {
      const blob = await generateCustomJioApk({
        includeJioFilters: includeJio,
        includeOttFilters: includeOtt,
        includeSmartTvTelemetry: includeSmartTv,
        includeGlobalAds: includeGlobal,
        customDnsServer: dnsServer
      });

      const filename = format === 'apk'
        ? 'JioBox-AdShield-Installer.apk'
        : 'JioSTB-Cable-Sideload-Bundle.zip';

      triggerDownload(blob, filename);
      setTimeout(() => {
        setIsBuilding(false);
        onClose();
      }, 800);
    } catch (err) {
      console.error(err);
      setIsBuilding(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-xl rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl overflow-hidden space-y-6 p-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
              <Sparkles className="w-4 h-4" />
              <span>Jio STB Package Compiler</span>
            </div>
            <h3 className="text-lg font-bold text-white tracking-tight">
              Build &amp; Download Jio STB AdBlock APK
            </h3>
            <p className="text-xs text-slate-400">
              Compile your custom ad-blocking package configured specifically for Jio Set-Top Box.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filters Configuration */}
        <div className="space-y-3">
          <label className="text-xs font-semibold text-slate-300">
            Included Ad &amp; Telemetry Filters:
          </label>

          <div className="space-y-2">
            <label className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700 cursor-pointer transition-colors">
              <span className="text-xs text-slate-200">
                Reliance Jio STB Telemetry &amp; Launcher Ads (842 rules)
              </span>
              <input
                type="checkbox"
                checked={includeJio}
                onChange={(e) => setIncludeJio(e.target.checked)}
                className="w-4 h-4 accent-emerald-500 rounded cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700 cursor-pointer transition-colors">
              <span className="text-xs text-slate-200">
                Indian Streaming Ads: Hotstar, JioCinema, Zee5, SonyLIV (1,640 rules)
              </span>
              <input
                type="checkbox"
                checked={includeOtt}
                onChange={(e) => setIncludeOtt(e.target.checked)}
                className="w-4 h-4 accent-emerald-500 rounded cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700 cursor-pointer transition-colors">
              <span className="text-xs text-slate-200">
                Smart TV Chipset &amp; Amlogic Telemetry (1,220 rules)
              </span>
              <input
                type="checkbox"
                checked={includeSmartTv}
                onChange={(e) => setIncludeSmartTv(e.target.checked)}
                className="w-4 h-4 accent-emerald-500 rounded cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700 cursor-pointer transition-colors">
              <span className="text-xs text-slate-200">
                Global Mobile &amp; TV Ad Networks (11,118 rules)
              </span>
              <input
                type="checkbox"
                checked={includeGlobal}
                onChange={(e) => setIncludeGlobal(e.target.checked)}
                className="w-4 h-4 accent-emerald-500 rounded cursor-pointer"
              />
            </label>
          </div>
        </div>

        {/* DNS Sink Configuration */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300">
            Default DNS Resolver:
          </label>
          <select
            value={dnsServer}
            onChange={(e) => setDnsServer(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg py-2 px-3 text-xs text-white focus:outline-none focus:border-emerald-400"
          >
            <option value="dns.adguard-dns.com">AdGuard DNS (dns.adguard-dns.com) - Recommended</option>
            <option value="dns.nextdns.io">NextDNS (dns.nextdns.io)</option>
            <option value="security.cloudflare-dns.com">Cloudflare Security (1.1.1.2)</option>
            <option value="adblock.doh.mullvad.net">Mullvad AdBlock (adblock.doh.mullvad.net)</option>
          </select>
        </div>

        {/* Format Selector */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300">
            Package Format:
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setFormat('apk')}
              className={`p-3 rounded-lg border text-left transition-all ${
                format === 'apk'
                  ? 'border-emerald-500/50 bg-emerald-950/20 text-white'
                  : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <PackageCheck className="w-4 h-4 text-emerald-400" />
                <span>Standalone APK</span>
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                Direct `.apk` file for USB cable or flash drive transfer
              </div>
            </button>

            <button
              type="button"
              onClick={() => setFormat('bundle')}
              className={`p-3 rounded-lg border text-left transition-all ${
                format === 'bundle'
                  ? 'border-emerald-500/50 bg-emerald-950/20 text-white'
                  : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <Cable className="w-4 h-4 text-emerald-400" />
                <span>Cable Sideload Bundle</span>
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                APK + 1-Click Windows `.bat` &amp; Mac `.sh` cable installers
              </div>
            </button>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-4">
          <div className="text-[11px] text-slate-400">
            Output: <span className="font-mono text-emerald-400">{format === 'apk' ? 'JioBox-AdShield-Installer.apk' : 'JioSTB-Cable-Sideload-Bundle.zip'}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleBuild}
              disabled={isBuilding}
              className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-slate-950 bg-emerald-400 rounded-lg hover:bg-emerald-300 active:scale-[0.98] transition-all disabled:opacity-50 shadow-sm"
            >
              {isBuilding ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Packaging APK...</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span>Compile &amp; Download</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
