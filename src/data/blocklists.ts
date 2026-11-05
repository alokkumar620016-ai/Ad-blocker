import { AdBlockCategory } from '../types.ts';

export const JIO_STB_BLOCKLISTS: AdBlockCategory[] = [
  {
    id: 'jio-telemetry',
    title: 'Reliance Jio STB Telemetry & Ad Engines',
    description: 'Blocks intrusive banner ads on Jio Home launcher, startup promotional popups, and user telemetry servers.',
    ruleCount: 842,
    enabled: true,
    priority: 'Critical',
    sampleDomains: [
      'ad.jio.com',
      'ads.jio.com',
      'telemetry.jiocinema.com',
      'adtech.jiotv.com',
      'log.jio.com',
      'stb-ads.jio.ril.com',
      'device-telemetry.jio.com',
      'jiomedia-ads.akamaized.net',
      'analytics.jio.com',
      'campaign.jio.com'
    ]
  },
  {
    id: 'indian-ott-ads',
    title: 'Indian OTT Streaming Ad Servers',
    description: 'Blocks mid-roll video ad injection and pre-roll sponsor clips on Hotstar, SonyLIV, Zee5, Voot, and MX Player.',
    ruleCount: 1640,
    enabled: true,
    priority: 'Critical',
    sampleDomains: [
      'adtech.hotstar.com',
      'ads.hotstar.com',
      'akamai-ads.hotstar.com',
      'sonylivads.akamaized.net',
      'ads.zee5.com',
      'track.zee5.com',
      'admanager.voot.com',
      'inmobicdn.net',
      'ads.inmobi.com',
      'vserv.mobi'
    ]
  },
  {
    id: 'smart-tv-telemetry',
    title: 'Smart TV & Chipset Hardware Trackers',
    description: 'Blocks background reporting from Amlogic SoC, Realtek Wi-Fi modules, and Android TV usage reporting.',
    ruleCount: 1220,
    enabled: true,
    priority: 'High',
    sampleDomains: [
      'data.amlogic.com',
      'log.amlogic.cn',
      'metrics.realtek.com',
      'androidtvtelemetry.google.com',
      'firebaselogging.googleapis.com',
      'app-measurement.com',
      'crashlytics.com',
      'device-metrics.amazon.com'
    ]
  },
  {
    id: 'global-ad-networks',
    title: 'Global Ad Networks & Video Ad Syndicates',
    description: 'Universal blacklist for Google AdSense, DoubleClick, AppLovin, Unity Ads, and Flurry.',
    ruleCount: 11118,
    enabled: true,
    priority: 'High',
    sampleDomains: [
      'doubleclick.net',
      'pagead2.googlesyndication.com',
      'googleads.g.doubleclick.net',
      'adservice.google.com',
      'applovin.com',
      'unityads.unity3d.com',
      'flurry.com',
      'adnxs.com',
      'criteo.com',
      'scorecardresearch.com'
    ]
  }
];

export const PRIVATE_DNS_PROVIDERS = [
  {
    name: 'AdGuard Default (Blocks Ads + Trackers)',
    dohUrl: 'dns.adguard-dns.com',
    ipv4: '94.140.14.14',
    recommended: true,
    description: 'Zero setup required. Simply type this address in Jio STB Settings > Network > Private DNS.'
  },
  {
    name: 'AdGuard Non-Filtering (Encrypted Only)',
    dohUrl: 'unfiltered.adguard-dns.com',
    ipv4: '94.140.14.140',
    recommended: false,
    description: 'Bypasses Jio ISP throttling without blocking cosmetic elements.'
  },
  {
    name: 'NextDNS Custom (Custom Blocklists + Analytics)',
    dohUrl: 'dns.nextdns.io',
    ipv4: '45.90.28.0',
    recommended: false,
    description: 'Create your own free NextDNS profile and plug the unique ID into Jio STB.'
  },
  {
    name: 'Mullvad AdBlock DoH',
    dohUrl: 'adblock.doh.mullvad.net',
    ipv4: '194.242.2.3',
    recommended: false,
    description: 'Ultra-private privacy oriented DNS with zero log retention.'
  }
];
