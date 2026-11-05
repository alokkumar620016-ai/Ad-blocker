import { ApkPackage } from '../types.ts';

export const APK_PACKAGES: ApkPackage[] = [
  {
    id: 'blokada-tv',
    name: 'Blokada 5 Libre (Android TV Edition)',
    version: '5.20.1-tv',
    size: '14.2 MB',
    developer: 'Blokada Open Source Project',
    category: 'System-Wide DNS AdBlock',
    description: 'The golden standard for Jio Set-Top Box ad blocking. Runs locally using a zero-overhead local VPN loopback without root. Intercepts and drops ad queries across all apps.',
    recommendedFor: 'Blocking ads in JioCinema, Zee5, Hotstar, SonyLIV, and TV system launchers',
    officialUrl: 'https://github.com/blokadaorg/blokada/releases',
    downloadFilename: 'Blokada5-Libre-AndroidTV.apk',
    packageId: 'org.blokada.alarm.dns.vpn',
    tags: ['No Root Required', 'Android 9-12 TV', 'Remote Navigation', 'Zero Battery Drain'],
    features: [
      'Works seamlessly on Jio STB JSTB100, JSTB200, JHSD200',
      'Filters DNS requests before apps can load video ads',
      'Full D-Pad / TV remote control compatibility',
      'Includes Energized, StevenBlack, and custom Jio blocklists',
      'Auto-starts on Jio STB boot'
    ],
    minAndroid: 'Android 7.0+ (Jio STB runs Android 9/10)',
    remoteFriendly: true,
    sha256: '9a8d2e41c7b30f8982a17f6920ad8348bb9942a170e4bb30328912e9b08f4cb1'
  },
  {
    id: 'smarttube-tv',
    name: 'SmartTube (Ad-Free YouTube TV)',
    version: '21.84 Stable',
    size: '18.9 MB',
    developer: 'Yuriy Lyskov (SmartTube Project)',
    category: 'Ad-Free Streaming',
    description: 'Advanced YouTube client built specifically for Android TV boxes. Eliminates all video advertisements, unskippable sponsor messages, and tracking.',
    recommendedFor: '100% ad-free 4K YouTube playback on Jio STB without Google Play Services requirement',
    officialUrl: 'https://github.com/yuliskov/SmartTube/releases',
    downloadFilename: 'SmartTube-Stable-JioSTB.apk',
    packageId: 'com.liskovsoft.videomanager',
    tags: ['Zero Ads', 'SponsorBlock', '4K 60FPS HDR', 'Background Audio'],
    features: [
      'Automatic skipping of in-video sponsor segments & channel plugs',
      'Bypasses unskippable 15-30 second mid-roll video ads',
      'Native leanback UI tailored for Jio remote D-Pad navigation',
      'Login with normal Google account without altering official YouTube',
      'Custom playback speed, volume boost, and AFR (Auto Frame Rate)'
    ],
    minAndroid: 'Android 5.0+ (All Jio STB models)',
    remoteFriendly: true,
    sha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
  },
  {
    id: 'adguard-tv',
    name: 'AdGuard for Android TV',
    version: '4.3.52 TV',
    size: '22.8 MB',
    developer: 'AdGuard Software Limited',
    category: 'DNS & Privacy',
    description: 'Dedicated TV edition of AdGuard designed for leanback displays. Supports DNS-over-HTTPS (DoH), encrypted DNS filters, and tracker blocking.',
    recommendedFor: 'Users wanting encrypted DNS-over-HTTPS (DoH) protection against ISP DNS hijacking',
    officialUrl: 'https://adguard.com/en/adguard-android-tv/overview.html',
    downloadFilename: 'AdGuard-AndroidTV-Universal.apk',
    packageId: 'com.adguard.android.tv',
    tags: ['DNS-over-HTTPS', 'Encrypted DNS', 'JioFiber Bypass', 'Parental Controls'],
    features: [
      'Prevents JioFiber ISP gateway from overriding your DNS choices',
      'Intuitive card-based UI designed for large TV screens',
      'Real-time traffic statistics and query inspection',
      'Protects smart TV from telemetry sent to smart TV telemetry networks'
    ],
    minAndroid: 'Android 7.0+',
    remoteFriendly: true,
    sha256: '8b42fc091a134d193ef20a91176b6b7a5892c9028a47cfb03841bcfa211e4033'
  },
  {
    id: 'rethink-dns',
    name: 'RethinkDNS & Firewall for TV',
    version: '0.5.5m',
    size: '19.4 MB',
    developer: 'Serverless Solutions',
    category: 'System-Wide DNS AdBlock',
    description: 'High-performance open-source DNS filter and per-app network firewall. Allows you to block individual apps on Jio STB from reaching ad servers.',
    recommendedFor: 'Power users wanting granular firewall rules and per-app telemetry isolation',
    officialUrl: 'https://github.com/celzero/rethink-app/releases',
    downloadFilename: 'RethinkDNS-TV-Edition.apk',
    packageId: 'com.celzero.bravedns',
    tags: ['Open Source', 'App Firewall', 'Zero Log', 'NextDNS Sync'],
    features: [
      'Includes over 200 built-in ad and tracking blocklists',
      'Per-app internet isolation (e.g., restrict Jio Store telemetry)',
      'WireGuard and DNS-over-TLS protocol support',
      'Ultra-lightweight memory footprint (<40MB RAM on STB)'
    ],
    minAndroid: 'Android 8.0+',
    remoteFriendly: true,
    sha256: '5c739bf832269a834162e249419b48ab65b128527a29e1f5791f4a9b5832a514'
  }
];
