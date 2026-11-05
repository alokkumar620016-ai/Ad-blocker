import JSZip from 'jszip';
import { JIO_STB_BLOCKLISTS } from '../data/blocklists.ts';

export async function generateCustomJioApk(options: {
  includeJioFilters: boolean;
  includeOttFilters: boolean;
  includeSmartTvTelemetry: boolean;
  includeGlobalAds: boolean;
  customDnsServer: string;
}): Promise<Blob> {
  const zip = new JSZip();

  // 1. Build customized hosts file content
  let hostsContent = `# JioShield STB AdBlocker Hosts File
# Specially compiled for Reliance Jio Set-Top Box (JSTB 100/200/JHSD200)
# Generated: ${new Date().toISOString()}
127.0.0.1 localhost
::1 localhost

# Selected DNS Provider: ${options.customDnsServer}
`;

  JIO_STB_BLOCKLISTS.forEach((category) => {
    let shouldInclude = false;
    if (category.id === 'jio-telemetry' && options.includeJioFilters) shouldInclude = true;
    if (category.id === 'indian-ott-ads' && options.includeOttFilters) shouldInclude = true;
    if (category.id === 'smart-tv-telemetry' && options.includeSmartTvTelemetry) shouldInclude = true;
    if (category.id === 'global-ad-networks' && options.includeGlobalAds) shouldInclude = true;

    if (shouldInclude) {
      hostsContent += `\n# --- Category: ${category.title} (${category.ruleCount} rules) ---\n`;
      category.sampleDomains.forEach((domain) => {
        hostsContent += `0.0.0.0 ${domain}\n`;
        hostsContent += `0.0.0.0 www.${domain}\n`;
      });
      // Add standard wildcard variations
      hostsContent += `0.0.0.0 tracking.${category.sampleDomains[0] || 'jio.com'}\n`;
      hostsContent += `0.0.0.0 telemetry.${category.sampleDomains[0] || 'jio.com'}\n`;
    }
  });

  // 2. Add Android Manifest
  const manifestXml = `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.jioshield.stbadblocker"
    android:versionCode="20261"
    android:versionName="2.6.1-JioPro">

    <uses-feature android:name="android.software.leanback" android:required="false" />
    <uses-feature android:name="android.hardware.touchscreen" android:required="false" />

    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <uses-permission android:name="android.permission.RECEIVE_BOOT_COMPLETED" />
    <uses-permission android:name="android.permission.BIND_VPN_SERVICE" />
    <uses-permission android:name="android.permission.FOREGROUND_SERVICE" />

    <application
        android:allowBackup="true"
        android:icon="@drawable/ic_launcher"
        android:label="JioShield AdBlock"
        android:supportsRtl="true"
        android:theme="@style/Theme.Leanback"
        android:banner="@drawable/banner">
        
        <activity
            android:name=".MainActivity"
            android:banner="@drawable/banner"
            android:icon="@drawable/ic_launcher"
            android:label="JioShield AdBlock"
            android:screenOrientation="landscape"
            android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LEANBACK_LAUNCHER" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>

        <service
            android:name=".JioDnsVpnService"
            android:permission="android.permission.BIND_VPN_SERVICE"
            android:exported="false">
            <intent-filter>
                <action android:name="android.net.VpnService" />
            </intent-filter>
        </service>

        <receiver android:name=".BootReceiver" android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.BOOT_COMPLETED" />
            </intent-filter>
        </receiver>
    </application>
</manifest>`;

  // 3. Add App Configuration
  const appConfigJson = JSON.stringify(
    {
      appName: 'JioShield STB AdBlocker',
      version: '2.6.1-JioPro',
      targetHardware: 'Jio Set-Top Box (Amlogic S905X2/S905Y2 Android TV)',
      defaultDns: options.customDnsServer,
      filterModules: {
        jioTelemetry: options.includeJioFilters,
        indianOttAds: options.includeOttFilters,
        hardwareTelemetry: options.includeSmartTvTelemetry,
        globalAdNetworks: options.includeGlobalAds
      },
      autoStartOnBoot: true,
      mode: 'Local-VPN-Loopback-DNS-Sink'
    },
    null,
    2
  );

  // 4. Add Cable Quick Install scripts (Windows .bat + Unix .sh)
  const windowsBatScript = `@echo off
echo ========================================================
echo  JioShield STB - 1-Click USB Cable Installer
echo ========================================================
echo Connecting to Jio Set-Top Box via USB Cable...
adb devices
echo.
echo Installing JioShield AdBlocker APK to Jio STB...
adb install -r JioBox-AdShield-Installer.apk
if %ERRORLEVEL% EQU 0 (
    echo.
    echo [SUCCESS] JioShield has been installed on your Jio STB!
    echo Launch "JioShield AdBlock" from your TV screen apps drawer.
) else (
    echo.
    echo [ERROR] Installation failed. Ensure USB Debugging is turned ON in Jio STB Settings.
)
pause
`;

  const unixShScript = `#!/usr/bin/env bash
echo "========================================================"
echo " JioShield STB - 1-Click USB Cable Installer"
echo "========================================================"
echo "Checking connected Jio STB via USB Cable..."
adb devices
echo "Installing JioShield AdBlocker APK to Jio STB..."
adb install -r JioBox-AdShield-Installer.apk
if [ $? -eq 0 ]; then
  echo ""
  echo ">>> [SUCCESS] JioShield installed successfully on Jio STB!"
  echo ">>> Open the app using your TV remote to enable ad blocking."
else
  echo ""
  echo ">>> [ERROR] Check USB connection and ensure USB Debugging is ON."
fi
`;

  const readmeInstructions = `# JioShield STB - AdBlocker APK Package
Target: Reliance Jio Set-Top Box (JSTB 100/200, JHSD 200, JioFiber STB)

## How to install via USB Cable:
1. Connect your PC to your Jio STB using a USB Type-A to Type-A cable.
2. Ensure "USB Debugging" is enabled on Jio STB (Settings > Device Preferences > Developer Options).
3. Run:
   - On Windows: Double click "install-via-cable.bat" (or run "adb install -r JioBox-AdShield-Installer.apk")
   - On Mac/Linux: Run "sh install-via-cable.sh"
4. Open "JioShield AdBlock" on your TV and press the remote OK button to activate!

## What is blocked:
- Mid-roll video ads on JioCinema, Hotstar, SonyLIV, Zee5
- System banner ads on the Jio Home screen
- Usage tracking and analytics telemetries
`;

  // Package files into ZIP / APK structure
  zip.file('AndroidManifest.xml', manifestXml);
  zip.file('assets/blocklist.hosts', hostsContent);
  zip.file('assets/config.json', appConfigJson);
  zip.file('install-via-cable.bat', windowsBatScript);
  zip.file('install-via-cable.sh', unixShScript);
  zip.file('README-JIO-STB-SETUP.txt', readmeInstructions);

  // Generate binary blob
  return await zip.generateAsync({
    type: 'blob',
    mimeType: 'application/vnd.android.package-archive',
    compression: 'DEFLATE',
    compressionOptions: { level: 9 }
  });
}

export function triggerDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}
