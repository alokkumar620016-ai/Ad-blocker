export interface ApkPackage {
  id: string;
  name: string;
  version: string;
  size: string;
  developer: string;
  category: 'System-Wide DNS AdBlock' | 'Ad-Free Streaming' | 'DNS & Privacy' | 'System Debloat';
  description: string;
  recommendedFor: string;
  officialUrl: string;
  downloadFilename: string;
  packageId: string;
  tags: string[];
  features: string[];
  minAndroid: string;
  remoteFriendly: boolean;
  sha256: string;
}

export interface AdBlockCategory {
  id: string;
  title: string;
  description: string;
  ruleCount: number;
  sampleDomains: string[];
  enabled: boolean;
  priority: 'High' | 'Medium' | 'Critical';
}

export interface DebloatApp {
  packageName: string;
  appName: string;
  purpose: string;
  safeToDisable: boolean;
  recommendation: 'Recommended' | 'Optional' | 'Caution';
  commandDisable: string;
  commandEnable: string;
}

export interface SideloadStep {
  stepNumber: number;
  title: string;
  description: string;
  command?: string;
  tips?: string[];
  warning?: string;
}
