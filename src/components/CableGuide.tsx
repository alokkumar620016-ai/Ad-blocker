import React, { useState } from 'react';
import { CABLE_STEPS, PENDRIVE_STEPS } from '../data/guideData.ts';
import { Cable, Usb, Wifi, Tv, CheckCircle, AlertTriangle, Terminal, Copy, Check } from 'lucide-react';

export const CableGuide: React.FC = () => {
  const [activeMethod, setActiveMethod] = useState<'cable' | 'pendrive' | 'wireless'>('cable');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const copy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(id);
    setTimeout(() => setCopiedText(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-slate-800 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Cable className="w-5 h-5 text-emerald-400" />
            <span>Complete Jio STB Cable Transfer &amp; Sideloading Manual</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Official instructions for transferring APK files to Reliance Jio Set-Top Box using USB cables, flash drives, or local Wi-Fi ADB.
          </p>
        </div>

        {/* Method Selector Tabs */}
        <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg text-xs font-medium">
          <button
            onClick={() => setActiveMethod('cable')}
            className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 ${
              activeMethod === 'cable'
                ? 'bg-slate-800 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Cable className="w-3.5 h-3.5 text-emerald-400" />
            <span>USB Cable (A-to-A)</span>
          </button>
          <button
            onClick={() => setActiveMethod('pendrive')}
            className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 ${
              activeMethod === 'pendrive'
                ? 'bg-slate-800 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Usb className="w-3.5 h-3.5 text-cyan-400" />
            <span>USB Flash Drive</span>
          </button>
          <button
            onClick={() => setActiveMethod('wireless')}
            className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 ${
              activeMethod === 'wireless'
                ? 'bg-slate-800 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Wifi className="w-3.5 h-3.5 text-indigo-400" />
            <span>Wi-Fi ADB (Cable-Free)</span>
          </button>
        </div>
      </div>

      {activeMethod === 'cable' && (
        <div className="space-y-6">
          {/* Method Overview Card */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span>Required Hardware for Direct Cable Transfer</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-300">
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                <div className="font-semibold text-emerald-400">1. USB A-to-A Cable</div>
                <p className="text-slate-400">Standard Male USB-A to Male USB-A data sync cable (available online for ~$1-$2).</p>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                <div className="font-semibold text-emerald-400">2. Jio STB Port 1</div>
                <p className="text-slate-400">Plug into USB Port 1 (usually on side or closest to power input on JSTB200).</p>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                <div className="font-semibold text-emerald-400">3. PC / Laptop with Chrome</div>
                <p className="text-slate-400">Use this applet's "Cable WebADB" or command line ADB.</p>
              </div>
            </div>
          </div>

          {/* Sequential Steps */}
          <div className="space-y-4">
            {CABLE_STEPS.map((step) => (
              <div
                key={step.stepNumber}
                className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-3 hover:border-slate-700 transition-all"
              >
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center font-mono font-bold text-xs text-emerald-400 shrink-0">
                    {step.stepNumber}
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-white tracking-tight">
                      {step.title}
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Optional Command */}
                {step.command && (
                  <div className="ml-10 p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between font-mono text-xs text-emerald-400">
                    <span className="truncate">{step.command}</span>
                    <button
                      onClick={() => copy(step.command!, `cmd-${step.stepNumber}`)}
                      className="px-2 py-1 text-[11px] font-sans font-medium text-slate-300 hover:text-white rounded bg-slate-800 hover:bg-slate-700 transition-colors flex items-center gap-1 shrink-0 ml-2"
                    >
                      {copiedText === `cmd-${step.stepNumber}` ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                )}

                {/* Tips */}
                {step.tips && step.tips.length > 0 && (
                  <div className="ml-10 space-y-1 pt-1">
                    {step.tips.map((tip, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-400">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400/80 shrink-0" />
                        <span>{tip}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Warning if any */}
                {step.warning && (
                  <div className="ml-10 p-2 rounded bg-amber-950/20 border border-amber-500/20 text-xs text-amber-300 flex items-center gap-2">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                    <span>{step.warning}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {activeMethod === 'pendrive' && (
        <div className="space-y-6">
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-3">
            <h3 className="text-sm font-bold text-white">USB Pen Drive Transfer (No PC-to-TV Cable Needed)</h3>
            <p className="text-xs text-slate-300">
              If you don't have a USB A-to-A cable, you can simply download the APK file onto any standard USB pen drive/flash drive and insert it into the Jio STB USB slot.
            </p>
          </div>

          <div className="space-y-4">
            {PENDRIVE_STEPS.map((step) => (
              <div
                key={step.stepNumber}
                className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-3"
              >
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center font-mono font-bold text-xs text-cyan-400 shrink-0">
                    {step.stepNumber}
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-white tracking-tight">
                      {step.title}
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                {step.tips && (
                  <div className="ml-10 space-y-1 pt-1">
                    {step.tips.map((tip, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-400">
                        <CheckCircle className="w-3.5 h-3.5 text-cyan-400/80 shrink-0" />
                        <span>{tip}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {activeMethod === 'wireless' && (
        <div className="space-y-6">
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-4">
            <h3 className="text-sm font-bold text-white">Wireless ADB over JioFiber Home Wi-Fi</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              If both your computer and Jio STB are connected to the same JioFiber router (e.g., `JioFiber-5GHz`), you can sideload completely over the air without any physical cable!
            </p>

            <div className="space-y-3 pt-2">
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
                <div className="text-xs font-semibold text-white">1. Find Jio STB IP Address:</div>
                <div className="text-xs text-slate-400">
                  On Jio STB, go to <span className="text-white">Settings &gt; Network &amp; Internet &gt; Connected Wi-Fi</span>. Note the IP address (e.g., <code className="text-emerald-400">192.168.29.145</code>).
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
                <div className="text-xs font-semibold text-white">2. Connect via PC Command Prompt:</div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800 flex items-center justify-between font-mono text-xs text-emerald-400">
                  <span>adb connect 192.168.29.145:5555</span>
                  <button
                    onClick={() => copy('adb connect 192.168.29.145:5555', 'wifi-adb')}
                    className="p-1 hover:text-white transition-colors"
                  >
                    {copiedText === 'wifi-adb' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                  </button>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
                <div className="text-xs font-semibold text-white">3. Push the AdBlock APK:</div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800 flex items-center justify-between font-mono text-xs text-emerald-400">
                  <span>adb install -r Blokada5-Libre-AndroidTV.apk</span>
                  <button
                    onClick={() => copy('adb install -r Blokada5-Libre-AndroidTV.apk', 'wifi-inst')}
                    className="p-1 hover:text-white transition-colors"
                  >
                    {copiedText === 'wifi-inst' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
