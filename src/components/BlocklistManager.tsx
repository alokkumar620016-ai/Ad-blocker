import React, { useState } from 'react';
import { JIO_STB_BLOCKLISTS, PRIVATE_DNS_PROVIDERS } from '../data/blocklists.ts';
import { Shield, Check, Copy, Download, Globe, Radio, ExternalLink } from 'lucide-react';
import { triggerDownload } from '../utils/apkGenerator.ts';

export const BlocklistManager: React.FC = () => {
  const [categories, setCategories] = useState(JIO_STB_BLOCKLISTS);
  const [selectedDns, setSelectedDns] = useState(PRIVATE_DNS_PROVIDERS[0]);
  const [copiedDns, setCopiedDns] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'blocklists' | 'privatedns'>('blocklists');

  const toggleCategory = (id: string) => {
    setCategories((prev) =>
      prev.map((cat) => (cat.id === id ? { ...cat, enabled: !cat.enabled } : cat))
    );
  };

  const totalRules = categories
    .filter((c) => c.enabled)
    .reduce((acc, curr) => acc + curr.ruleCount, 0);

  const copyDns = (dohUrl: string) => {
    navigator.clipboard.writeText(dohUrl);
    setCopiedDns(true);
    setTimeout(() => setCopiedDns(false), 2000);
  };

  const handleDownloadHosts = () => {
    let content = `# JioShield STB Compiled Blocklist
# Targets: Reliance Jio STB, JioCinema, Hotstar, SonyLIV, Zee5, SmartTV telemetry
# Generated: ${new Date().toISOString()}
127.0.0.1 localhost
::1 localhost
`;
    categories
      .filter((c) => c.enabled)
      .forEach((cat) => {
        content += `\n# --- ${cat.title} ---\n`;
        cat.sampleDomains.forEach((domain) => {
          content += `0.0.0.0 ${domain}\n`;
        });
      });

    const blob = new Blob([content], { type: 'text/plain' });
    triggerDownload(blob, 'jio-stb-adblock-hosts.txt');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-slate-800 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Shield className="w-5 h-5 text-emerald-400" />
            <span>Jio STB Blocklists & Private DNS Configurations</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Curated domain lists tuned to drop ad requests in Indian streaming apps, Jio promotional carousels, and smart TV telemetry.
          </p>
        </div>

        {/* Segmented Mode Button */}
        <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg text-xs font-medium">
          <button
            onClick={() => setActiveTab('blocklists')}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              activeTab === 'blocklists'
                ? 'bg-slate-800 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Ad Blocklists ({totalRules.toLocaleString()} rules)
          </button>
          <button
            onClick={() => setActiveTab('privatedns')}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              activeTab === 'privatedns'
                ? 'bg-slate-800 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Native Private DNS Setup
          </button>
        </div>
      </div>

      {activeTab === 'blocklists' ? (
        <div className="space-y-6">
          {/* Summary Strip */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="text-xs font-semibold text-emerald-400">Filter Engine Status:</div>
              <div className="text-lg font-bold text-white font-mono tabular-nums">
                {totalRules.toLocaleString()} Active Blacklist Rules
              </div>
              <p className="text-xs text-slate-400">
                These rules will be embedded into your downloaded APK package or exported hosts file.
              </p>
            </div>

            <button
              onClick={handleDownloadHosts}
              className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-slate-950 bg-emerald-400 rounded-lg hover:bg-emerald-300 active:scale-[0.98] transition-all self-start sm:self-auto shrink-0 shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download hosts.txt</span>
            </button>
          </div>

          {/* Blocklist Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categories.map((category) => (
              <div
                key={category.id}
                className={`rounded-xl border p-5 transition-all space-y-4 ${
                  category.enabled
                    ? 'border-slate-700 bg-slate-900/70'
                    : 'border-slate-800/60 bg-slate-950/40 opacity-70'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white tracking-tight">
                        {category.title}
                      </span>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-400">
                        {category.priority}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {category.description}
                    </p>
                  </div>

                  {/* Toggle Checkbox */}
                  <button
                    onClick={() => toggleCategory(category.id)}
                    className={`w-6 h-6 rounded flex items-center justify-center border transition-all shrink-0 ${
                      category.enabled
                        ? 'bg-emerald-500 border-emerald-400 text-slate-950'
                        : 'bg-slate-900 border-slate-700 text-transparent'
                    }`}
                    aria-label={`Toggle ${category.title}`}
                  >
                    <Check className="w-4 h-4 stroke-[3]" />
                  </button>
                </div>

                {/* Sample Domains */}
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 space-y-1.5">
                  <div className="text-[11px] font-semibold text-slate-400 flex items-center justify-between">
                    <span>Sample Blocked Targets:</span>
                    <span className="font-mono text-emerald-400 tabular-nums">
                      {category.ruleCount.toLocaleString()} domains
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {category.sampleDomains.slice(0, 6).map((domain, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800"
                      >
                        {domain}
                      </span>
                    ))}
                    {category.sampleDomains.length > 6 && (
                      <span className="text-[10px] font-mono text-slate-500 self-center px-1">
                        +{category.sampleDomains.length - 6} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Native Private DNS Setup View */
        <div className="space-y-6">
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
            <div className="space-y-1">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Globe className="w-4 h-4 text-emerald-400" />
                <span>Zero-App Sideload: Configure Jio STB Native Private DNS</span>
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
                Jio Set-Top Box running Android TV 9, 10, or 11 has a built-in "Private DNS" feature (DNS-over-TLS). You can block ads across every app simply by pasting this DNS address into your Jio STB settings with your TV remote control!
              </p>
            </div>

            {/* Step instruction strip */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                <div className="text-xs font-bold text-emerald-400 font-mono">STEP 01</div>
                <div className="text-xs font-semibold text-white">Open TV Settings</div>
                <div className="text-xs text-slate-400">
                  Settings &gt; Network &amp; Internet &gt; Scroll to "Private DNS".
                </div>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                <div className="text-xs font-bold text-emerald-400 font-mono">STEP 02</div>
                <div className="text-xs font-semibold text-white">Select Provider Hostname</div>
                <div className="text-xs text-slate-400">
                  Change from "Off" to "Private DNS provider hostname".
                </div>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                <div className="text-xs font-bold text-emerald-400 font-mono">STEP 03</div>
                <div className="text-xs font-semibold text-white">Type Hostname &amp; Save</div>
                <div className="text-xs text-slate-400">
                  Type <span className="text-emerald-400 font-mono">dns.adguard-dns.com</span> and click OK.
                </div>
              </div>
            </div>

            {/* Provider Cards */}
            <div className="space-y-3 pt-4 border-t border-slate-800">
              <div className="text-xs font-semibold text-slate-300">
                Recommended Private DNS Servers for Jio STB:
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {PRIVATE_DNS_PROVIDERS.map((provider, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-xl border transition-all space-y-3 ${
                      selectedDns.dohUrl === provider.dohUrl
                        ? 'border-emerald-500/40 bg-slate-950 shadow-md'
                        : 'border-slate-800 bg-slate-900/40 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="text-xs font-bold text-white flex items-center gap-2">
                          <span>{provider.name}</span>
                          {provider.recommended && (
                            <span className="text-[10px] font-semibold text-emerald-400 border border-emerald-500/30 px-1.5 rounded">
                              Recommended
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-slate-400 mt-1">
                          {provider.description}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-2 rounded bg-slate-900 border border-slate-800 text-xs font-mono text-emerald-400">
                      <span>{provider.dohUrl}</span>
                      <button
                        onClick={() => copyDns(provider.dohUrl)}
                        className="px-2.5 py-1 text-[11px] font-sans font-medium text-slate-300 hover:text-white rounded bg-slate-800 hover:bg-slate-700 transition-colors flex items-center gap-1"
                      >
                        {copiedDns && selectedDns.dohUrl === provider.dohUrl ? (
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
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
