import React, { useState } from 'react';
import { Activity, ShieldCheck, ShieldAlert, RefreshCw, CheckCircle, XCircle } from 'lucide-react';

interface TestTarget {
  name: string;
  category: string;
  url: string;
  domain: string;
  status: 'pending' | 'blocked' | 'passed';
}

export const AdTestTool: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [testResults, setTestResults] = useState<TestTarget[]>([
    {
      name: 'JioCinema Ad Injection Server',
      category: 'Jio Telemetry',
      url: 'https://ad.jio.com/favicon.ico',
      domain: 'ad.jio.com',
      status: 'pending'
    },
    {
      name: 'Hotstar Video Adtech',
      category: 'Indian OTT',
      url: 'https://adtech.hotstar.com/ads',
      domain: 'adtech.hotstar.com',
      status: 'pending'
    },
    {
      name: 'Google DoubleClick Ad Server',
      category: 'Global Ad Network',
      url: 'https://pagead2.googlesyndication.com/pagead/show_ads.js',
      domain: 'pagead2.googlesyndication.com',
      status: 'pending'
    },
    {
      name: 'InMobi Mobile Ad Network',
      category: 'Mobile / TV Ads',
      url: 'https://ads.inmobi.com/ping',
      domain: 'ads.inmobi.com',
      status: 'pending'
    }
  ]);

  const runAdblockDiagnostic = async () => {
    setIsRunning(true);
    const updated = [...testResults];

    for (let i = 0; i < updated.length; i++) {
      const target = updated[i];
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2000);

        await fetch(target.url, {
          mode: 'no-cors',
          cache: 'no-store',
          signal: controller.signal
        });

        clearTimeout(timeoutId);
        // If the request succeeds in loading an ad server, it means ads are NOT blocked
        target.status = 'passed';
      } catch (e) {
        // If it was aborted or blocked by DNS sink / adblocker, it's blocked!
        target.status = 'blocked';
      }
      setTestResults([...updated]);
    }
    setIsRunning(false);
  };

  const blockedCount = testResults.filter((r) => r.status === 'blocked').length;

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-400" />
            <span>Live Ad-Blocking Diagnostic Tester</span>
          </h3>
          <p className="text-xs text-slate-400">
            Probe live Indian streaming and ad tracking endpoints to verify if your current network or device is actively sinking ads.
          </p>
        </div>

        <button
          onClick={runAdblockDiagnostic}
          disabled={isRunning}
          className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 rounded-lg hover:bg-emerald-300 active:scale-[0.98] transition-all disabled:opacity-50 shrink-0 self-start sm:self-auto shadow-sm"
        >
          {isRunning ? (
            <>
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>Probing Endpoints...</span>
            </>
          ) : (
            <>
              <Activity className="w-3.5 h-3.5" />
              <span>Run Diagnostic Test</span>
            </>
          )}
        </button>
      </div>

      {/* Target Rows */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
        {testResults.map((target, idx) => (
          <div
            key={idx}
            className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between text-xs"
          >
            <div className="space-y-0.5">
              <div className="font-semibold text-white">{target.name}</div>
              <div className="font-mono text-[11px] text-slate-400">{target.domain}</div>
            </div>

            <div className="shrink-0">
              {target.status === 'pending' && (
                <span className="text-[11px] font-mono text-slate-500">Ready</span>
              )}
              {target.status === 'blocked' && (
                <span className="flex items-center gap-1 font-mono text-[11px] text-emerald-400 bg-emerald-950/40 border border-emerald-500/20 px-2 py-0.5 rounded">
                  <CheckCircle className="w-3 h-3" />
                  <span>BLOCKED (Sink)</span>
                </span>
              )}
              {target.status === 'passed' && (
                <span className="flex items-center gap-1 font-mono text-[11px] text-amber-400 bg-amber-950/40 border border-amber-500/20 px-2 py-0.5 rounded">
                  <XCircle className="w-3 h-3" />
                  <span>UNBLOCKED</span>
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
