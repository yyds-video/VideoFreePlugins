declare global {
  var env: {
    getUserVariable?: (key: string) => string;
    getUserVariables?: () => Record<string, string>;
    sniffVideo?: (url: string) => Promise<{ url: string; headers?: Record<string, string> }>;
    os?: string;
    appVersion?: string;
  };
}

export {};
