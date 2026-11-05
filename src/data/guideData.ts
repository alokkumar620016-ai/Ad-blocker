import { DebloatApp, SideloadStep } from '../types.ts';

export const CABLE_STEPS: SideloadStep[] = [
  {
    stepNumber: 1,
    title: 'Unlock Developer Options on Jio STB',
    description: 'Turn on your Jio Set-Top Box. On your remote, navigate to Settings > Device Preferences > About. Scroll down to "Build" or "Android TV OS build". Press the Center (OK) button on your remote 7 times rapidly until a toast appears stating "You are now a developer!".',
    tips: [
      'Works on all Jio STB models: JSTB100, JSTB200, JHSD200.',
      'If your Jio remote has a Settings gear button, you can jump directly to Settings.'
    ]
  },
  {
    stepNumber: 2,
    title: 'Enable USB Debugging & Unknown Sources',
    description: 'Go back to Settings > Device Preferences > Developer Options. Scroll down and toggle ON "USB Debugging". Next, go to Settings > Device Preferences > Security & Restrictions > toggle ON "Unknown Sources" or allow permissions for your file manager.',
    tips: [
      'USB Debugging permits your computer to communicate directly over the USB cable.',
      'A prompt may show on TV asking "Allow USB debugging?" — check "Always allow from this computer" and click OK.'
    ]
  },
  {
    stepNumber: 3,
    title: 'Connect the USB Cable (PC to Jio STB)',
    description: 'Take a standard USB Type-A to Type-A male cable (or USB-C to USB-A cable depending on your PC). Plug one end into your computer and the other end into the USB Port 1 (marked USB 2.0 or 3.0) on the rear or side panel of your Jio Set-Top Box.',
    tips: [
      'Ensure the cable is a data-sync cable, not a power-only charging cable.',
      'The Jio STB will chime or display a notification on screen detecting the host.'
    ],
    warning: 'Do not disconnect the cable during an active APK sideload transmission.'
  },
  {
    stepNumber: 4,
    title: 'Install the AdBlock APK via WebADB or Terminal',
    description: 'Use the interactive WebADB tool on this dashboard (click "Connect via USB" below) to push the APK directly from your browser, or open your PC command prompt / terminal and run:',
    command: 'adb install -r Blokada5-Libre-AndroidTV.apk',
    tips: [
      'Verify connection with: adb devices',
      'For SmartTube: adb install -r SmartTube-Stable-JioSTB.apk',
      'Once installed, launch the app directly from your Jio STB App Drawer using your remote.'
    ]
  },
  {
    stepNumber: 5,
    title: 'Activate Ad Blocking on Jio STB',
    description: 'On your TV, open Blokada or AdGuard from the "Your Apps" section. Click the large Shield/Power button using your TV remote. Accept the standard Android "Connection Request / VPN authorization" prompt. Ad blocking is now permanently active across all streaming apps!',
    tips: [
      'Ensure "Start on boot" is toggled ON in the app settings so ads stay blocked even if the STB is restarted.',
      'Test by opening Hotstar, SonyLIV, or YouTube to verify zero banner or video ads.'
    ]
  }
];

export const PENDRIVE_STEPS: SideloadStep[] = [
  {
    stepNumber: 1,
    title: 'Download APK to USB Flash Drive',
    description: 'Click "Download APK" on this website and save the `.apk` file directly onto a FAT32-formatted USB flash drive or pen drive.',
    tips: ['Format your pen drive as FAT32 or exFAT so the Jio STB can read it without errors.']
  },
  {
    stepNumber: 2,
    title: 'Install "File Commander" or "FX File Explorer" on Jio STB',
    description: 'On your Jio STB, open the JioStore or Google Play Store and install any standard TV file manager (like File Commander, FX, or AnExplorer).',
    tips: ['Most Jio STBs come preloaded with JioPages or a media player that can also browse external storage.']
  },
  {
    stepNumber: 3,
    title: 'Plug Flash Drive into Jio STB USB Port',
    description: 'Insert the pen drive into the USB port of your Jio STB. A popup will ask to open with the file manager.',
    tips: ['Browse to your USB drive, click the `.apk` file, and press "Install".']
  }
];

export const JIO_DEBLOAT_LIST: DebloatApp[] = [
  {
    packageName: 'com.jio.media.stbadservice',
    appName: 'Jio STB System Ad Service',
    purpose: 'Injects banner advertisements and sponsored recommendation carousels into the home launcher.',
    safeToDisable: true,
    recommendation: 'Recommended',
    commandDisable: 'adb shell pm disable-user --user 0 com.jio.media.stbadservice',
    commandEnable: 'adb shell pm enable com.jio.media.stbadservice'
  },
  {
    packageName: 'com.jio.stb.telemetry',
    appName: 'Jio STB Telemetry & Usage Analytics',
    purpose: 'Logs every channel click, app launch time, and remote button press to send to analytics servers.',
    safeToDisable: true,
    recommendation: 'Recommended',
    commandDisable: 'adb shell pm disable-user --user 0 com.jio.stb.telemetry',
    commandEnable: 'adb shell pm enable com.jio.stb.telemetry'
  },
  {
    packageName: 'com.jio.launcher.ads',
    appName: 'Jio Home Launcher Promotional Carousel',
    purpose: 'Displays video ads and commercial previews on top of the home screen.',
    safeToDisable: true,
    recommendation: 'Recommended',
    commandDisable: 'adb shell pm disable-user --user 0 com.jio.launcher.ads',
    commandEnable: 'adb shell pm enable com.jio.launcher.ads'
  },
  {
    packageName: 'com.google.android.tvrecommendations',
    appName: 'Android TV Sponsored Recommendations',
    purpose: 'Pushes Google sponsored rows and trailers above installed apps.',
    safeToDisable: true,
    recommendation: 'Optional',
    commandDisable: 'adb shell pm disable-user --user 0 com.google.android.tvrecommendations',
    commandEnable: 'adb shell pm enable com.google.android.tvrecommendations'
  },
  {
    packageName: 'com.jio.jiostore',
    appName: 'JioStore Push Notifications',
    purpose: 'Sends unsolicited app installation prompts and featured app notifications.',
    safeToDisable: true,
    recommendation: 'Optional',
    commandDisable: 'adb shell pm disable-user --user 0 com.jio.jiostore',
    commandEnable: 'adb shell pm enable com.jio.jiostore'
  }
];
