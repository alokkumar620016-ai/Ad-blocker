import React from 'react';
import { Download, Cable, Shield, CheckCircle2, Tv } from 'lucide-react';

interface HeroProps {
  onOpenDownloadModal: () => void;
  onNavigateToWebAdb: () => void;
  onNavigateToGuide: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenDownloadModal,
  onNavigateToWebAdb,
  onNavigateToGuide
}) => {
  return (
    <section className="relative overflow-hidden border-b border-slate-800/60 bg-gradient-to-b from-slate-900/60 via-slate-950 to-slate-950 pt-10 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Text & Intent */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-xs font-medium text-emerald-400">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400"></span>
              <span>Tested on JioFiber & JioAirFiber Set-Top Boxes</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-slate-400">No Root Required</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight" style={{ textWrap: 'balance' }}>
              Block All Ads on Your Jio Set-Top Box via USB Cable
            </h1>

            <p className="text-base text-slate-300 leading-relaxed max-w-2xl">
              Eliminate unskippable video ads, launcher banner spam, and background telemetry across JioCinema, Hotstar, YouTube, SonyLIV, and Zee5. Download preconfigured TV ad-blocker APKs and push them straight over USB cable with in-browser WebADB.
            </p>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onOpenDownloadModal}
                className="flex items-center gap-2.5 px-6 py-3 text-sm font-semibold text-slate-950 bg-emerald-400 rounded-lg hover:bg-emerald-300 active:scale-[0.98] transition-all shadow-md shadow-emerald-500/20"
              >
                <Download className="w-4 h-4" />
                <span>Download APK Package</span>
              </button>

              <button
                onClick={onNavigateToWebAdb}
                className="flex items-center gap-2.5 px-5 py-3 text-sm font-semibold text-white bg-slate-800 border border-slate-700 rounded-lg hover:bg-slate-700/80 active:scale-[0.98] transition-all"
              >
                <Cable className="w-4 h-4 text-emerald-400" />
                <span>Connect via USB Cable</span>
              </button>

              <button
                onClick={onNavigateToGuide}
                className="text-xs text-slate-400 hover:text-white underline underline-offset-4 transition-colors"
              >
                View Cable Step-by-Step Guide
              </button>
            </div>

            {/* Quick Proof Strip */}
            <div className="pt-4 border-t border-slate-800/80 grid grid-cols-3 gap-4">
              <div>
                <div className="text-xl font-bold text-white font-mono tabular-nums">14,820+</div>
                <div className="text-xs text-slate-400">Indian OTT & Jio Rules</div>
              </div>
              <div>
                <div className="text-xl font-bold text-emerald-400 font-mono tabular-nums">100%</div>
                <div className="text-xs text-slate-400">No Root or Bootloader Unlock</div>
              </div>
              <div>
                <div className="text-xl font-bold text-white font-mono tabular-nums">USB / ADB</div>
                <div className="text-xs text-slate-400">Cable Direct Sideload</div>
              </div>
            </div>
          </div>

          {/* Right Column: Hardware Preview Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/60 shadow-2xl">
              <div className="aspect-video w-full overflow-hidden bg-slate-950 relative">
                <img
                  src="/src/assets/images/jio_stb_cable_shield_1793855425409.jpg"
                  alt="Jio Set-Top Box connected to laptop via USB cable"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                
                {/* Overlay Badge */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-slate-200 bg-slate-900/85 backdrop-blur-md px-3 py-2 rounded-lg border border-slate-700/60">
                  <div className="flex items-center gap-2">
                    <Tv className="w-4 h-4 text-emerald-400" />
                    <span className="font-medium">Jio STB 4K Hardware</span>
                  </div>
                  <span className="font-mono text-emerald-400">USB 2.0 / 3.0 Ready</span>
                </div>
              </div>

              {/* Supported Models Strip */}
              <div className="p-4 space-y-2.5">
                <div className="text-xs font-semibold text-slate-300">Verified Compatible Hardware:</div>
                <div className="space-y-1.5 text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Jio STB v1 & v2 (JSTB100, JSTB200 Amlogic S905X2)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>JioAirFiber Android TV Set-Top Box (JHSD200)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Works with standard USB Type-A to Type-A or Type-C cable</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
