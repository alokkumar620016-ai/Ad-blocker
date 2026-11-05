import React, { useState } from 'react';
import { JIO_DEBLOAT_LIST } from '../data/guideData.ts';
import { DebloatApp } from '../types.ts';
import { Sliders, Copy, Check, AlertCircle, ShieldCheck, Download, Terminal, ArrowRight } from 'lucide-react';
import { triggerDownload } from '../utils/apkGenerator.ts';

export const DebloatManager: React.FC = () => {
  const [selectedApps, setSelectedApps] = useState<string[]>(
    JIO_DEBLOAT_LIST.filter((app) => app.recommendation === 'Recommended').map((a) => a.packageName)
  );
  const [copiedPkg, setCopiedPkg] = useState<string | null>(null);

  const toggleSelect = (pkg: string) => {
    setSelectedApps((prev) =>
      prev.includes(pkg) ? prev.filter((p) => p !== pkg) : [...prev, pkg]
    );
  };

  const copyCommand = (cmd: string, pkg: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedPkg(pkg);
    setTimeout(() => setCopiedPkg(null), 2000);
  };

  const handleDownloadBatch = () => {
    let script = `@echo off
echo ========================================================
echo  Jio STB System Ad Debloater - USB Cable Runner
echo ========================================================
echo Checking connected Jio STB via USB...
adb devices
echo.
echo Disabling selected Jio advertising & telemetry packages...
`;

    JIO_DEBLOAT_LIST.filter((a) => selectedApps.includes(a.packageName)).forEach((app) => {
      script += `echo Disabling ${app.appName} (${app.packageName})...\n`;
      script += `${app.commandDisable}\n`;
    });

    script += `\necho.
echo [DONE] Selected Jio ad services have been suppressed!
echo Your Jio STB launcher will now be clean and responsive.
pause
`;

    const blob = new Blob([script], { type: 'text/plain' });
    triggerDownload(blob, 'jio-stb-cable-debloater.bat');
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="border-b border-slate-800 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Sliders className="w-5 h-5 text-emerald-400" />
            <span>Jio STB System Ad Debloater &amp; Bloatware Suppressor</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Safely disable auto-playing banner carousels, promotional popups, and telemetry background services via USB cable.
          </p>
        </div>

        <button
          onClick={handleDownloadBatch}
          className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-slate-950 bg-emerald-400 rounded-lg hover:bg-emerald-300 active:scale-[0.98] transition-all shrink-0 shadow-sm"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Download Cable Script (.bat)</span>
        </button>
      </div>

      {/* Safety Notice */}
      <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-4 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
        <div className="text-xs text-slate-300 space-y-1">
          <div className="font-semibold text-white">100% Safe &amp; Reversible</div>
          <p className="text-slate-400">
            These commands use Android's non-root <code className="text-emerald-400">pm disable-user --user 0</code> command. They freeze the advertising daemons without deleting system partitions. If you ever need to restore any service, you can run <code className="text-emerald-400">pm enable &lt;package&gt;</code> at any time.
          </p>
        </div>
      </div>

      {/* Package List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
          <span>Identified Jio STB System Ad Components ({JIO_DEBLOAT_LIST.length})</span>
          <span className="font-mono text-emerald-400">
            {selectedApps.length} Selected for Suppression
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {JIO_DEBLOAT_LIST.map((app) => {
            const isSelected = selectedApps.includes(app.packageName);
            return (
              <div
                key={app.packageName}
                className={`rounded-xl border p-4 transition-all ${
                  isSelected
                    ? 'border-slate-700 bg-slate-900/70 shadow-sm'
                    : 'border-slate-800/60 bg-slate-950/40 opacity-75'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <button
                      onClick={() => toggleSelect(app.packageName)}
                      className={`w-5 h-5 rounded mt-0.5 flex items-center justify-center border transition-all shrink-0 ${
                        isSelected
                          ? 'bg-emerald-500 border-emerald-400 text-slate-950'
                          : 'bg-slate-900 border-slate-700 text-transparent'
                      }`}
                      aria-label={`Toggle ${app.appName}`}
                    >
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </button>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white tracking-tight">
                          {app.appName}
                        </span>
                        <span className="text-[11px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                          {app.packageName}
                        </span>
                        {app.recommendation === 'Recommended' && (
                          <span className="text-[10px] font-semibold text-emerald-400 border border-emerald-500/30 px-1.5 rounded">
                            Recommended
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400">{app.purpose}</p>
                    </div>
                  </div>

                  {/* Single command copy */}
                  <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
                    <button
                      onClick={() => copyCommand(app.commandDisable, app.packageName)}
                      className="px-3 py-1.5 text-xs font-mono font-medium rounded-lg bg-slate-950 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors flex items-center gap-2"
                    >
                      <Terminal className="w-3 h-3 text-emerald-400" />
                      {copiedPkg === app.packageName ? (
                        <span className="text-emerald-400 font-sans font-semibold">Copied Command</span>
                      ) : (
                        <span>Copy ADB Command</span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
