
// API Configuration and Key Management
export const API_CONFIG = {
  // Threat Intelligence APIs
  VIRUSTOTAL: {
    baseUrl: 'https://www.virustotal.com/vtapi/v2',
    key: import.meta.env.VITE_VIRUSTOTAL_API_KEY || 'YOUR_VIRUSTOTAL_API_KEY',
  },
  SHODAN: {
    baseUrl: 'https://api.shodan.io',
    key: import.meta.env.VITE_SHODAN_API_KEY || 'YOUR_SHODAN_API_KEY',
  },
  ABUSEIPDB: {
    baseUrl: 'https://api.abuseipdb.com/api/v2',
    key: import.meta.env.VITE_ABUSEIPDB_API_KEY || 'YOUR_ABUSEIPDB_API_KEY',
  },
  // CVE Database
  NVD: {
    baseUrl: 'https://services.nvd.nist.gov/rest/json',
    key: import.meta.env.VITE_NVD_API_KEY || 'YOUR_NVD_API_KEY',
  },
  // Network APIs
  IPINFO: {
    baseUrl: 'https://ipinfo.io',
    key: import.meta.env.VITE_IPINFO_API_KEY || 'YOUR_IPINFO_API_KEY',
  },
  // Cloud Provider APIs (example)
  AWS_CLOUDWATCH: {
    region: import.meta.env.VITE_AWS_REGION || 'us-east-1',
    accessKey: import.meta.env.VITE_AWS_ACCESS_KEY || 'YOUR_AWS_ACCESS_KEY',
    secretKey: import.meta.env.VITE_AWS_SECRET_KEY || 'YOUR_AWS_SECRET_KEY',
  },
  // OpenAI for AI-powered analysis
  OPENAI: {
    baseUrl: 'https://api.openai.com/v1',
    key: import.meta.env.VITE_OPENAI_API_KEY || 'YOUR_OPENAI_API_KEY',
  }
};

export const validateApiKeys = () => {
  const missingKeys = [];
  
  Object.entries(API_CONFIG).forEach(([service, config]) => {
    if ('key' in config && config.key.startsWith('YOUR_')) {
      missingKeys.push(service);
    }
  });
  
  return {
    isValid: missingKeys.length === 0,
    missingKeys
  };
};
