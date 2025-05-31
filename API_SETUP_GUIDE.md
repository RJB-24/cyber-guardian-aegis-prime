
# AEGIS Real-Time API Integration Guide

## Overview
This guide provides step-by-step instructions to obtain API keys for all integrated threat intelligence and monitoring services in AEGIS.

## Required API Keys

### 1. VirusTotal API (Essential for Malware Detection)
**Purpose**: IP/URL reputation, malware scanning, threat intelligence

**How to Get:**
1. Visit: https://www.virustotal.com/gui/join-us
2. Create a free account
3. Go to your profile → API Key
4. Copy the API key

**Environment Variable**: `VITE_VIRUSTOTAL_API_KEY`
**Free Tier**: 4 requests per minute, 500 requests per day
**Paid Plans**: Available for higher limits

### 2. Shodan API (Network Intelligence)
**Purpose**: Internet-connected device scanning, port information, vulnerability detection

**How to Get:**
1. Visit: https://account.shodan.io/register
2. Create an account
3. Go to Account → API Key
4. Copy the API key

**Environment Variable**: `VITE_SHODAN_API_KEY`
**Free Tier**: 100 queries per month
**Paid Plans**: $49/month for 10,000 queries

### 3. AbuseIPDB API (IP Reputation)
**Purpose**: IP blacklist checking, abuse reporting, threat intelligence

**How to Get:**
1. Visit: https://www.abuseipdb.com/register
2. Create an account
3. Go to Account → API
4. Generate API key

**Environment Variable**: `VITE_ABUSEIPDB_API_KEY`
**Free Tier**: 1,000 requests per day
**Paid Plans**: Available for commercial use

### 4. IPInfo API (Geolocation & Network Info)
**Purpose**: IP geolocation, ISP information, network details

**How to Get:**
1. Visit: https://ipinfo.io/signup
2. Create an account
3. Go to Dashboard → Token
4. Copy the access token

**Environment Variable**: `VITE_IPINFO_API_KEY`
**Free Tier**: 50,000 requests per month
**Paid Plans**: Starting at $99/month

### 5. National Vulnerability Database (NVD) API
**Purpose**: CVE vulnerability information, CVSS scores

**How to Get:**
1. Visit: https://nvd.nist.gov/developers/request-an-api-key
2. Fill out the request form
3. Wait for email confirmation (usually instant)
4. Use the provided API key

**Environment Variable**: `VITE_NVD_API_KEY`
**Free Tier**: 5 requests per 30 seconds, 50 requests per 30 seconds with API key
**Cost**: Free

### 6. OpenAI API (AI-Powered Analysis)
**Purpose**: Advanced threat analysis, natural language processing, countermeasure generation

**How to Get:**
1. Visit: https://platform.openai.com/signup
2. Create an account and verify phone number
3. Go to API Keys → Create new secret key
4. Copy the API key

**Environment Variable**: `VITE_OPENAI_API_KEY`
**Pricing**: Pay-per-use, approximately $0.03 per 1K tokens for GPT-4
**Free Tier**: $5 credit for new accounts

## Optional API Integrations (Advanced)

### 7. GreyNoise API (Internet Background Noise)
**Purpose**: Internet background noise analysis, benign scanner identification

**How to Get:**
1. Visit: https://www.greynoise.io/signup
2. Create a free account
3. Go to Account → API Key
4. Copy the API key

**Environment Variable**: `VITE_GREYNOISE_API_KEY`
**Free Tier**: 10,000 requests per month
**Cost**: Free for community use

### 8. URLVoid API (URL Reputation)
**Purpose**: URL reputation checking, malicious website detection

**How to Get:**
1. Visit: https://www.urlvoid.com/api/
2. Sign up for free account
3. Get your API key from dashboard

**Environment Variable**: `VITE_URLVOID_API_KEY`
**Free Tier**: 1,000 requests per month
**Cost**: Free

### 9. AlienVault OTX API (Open Threat Exchange)
**Purpose**: Community threat intelligence, IOCs, malware samples

**How to Get:**
1. Visit: https://otx.alienvault.com/
2. Create free account
3. Go to Settings → API Integration
4. Copy your OTX Key

**Environment Variable**: `VITE_OTX_API_KEY`
**Free Tier**: Unlimited for community members
**Cost**: Free

### 10. ThreatCrowd API (Threat Intelligence Search)
**Purpose**: Open source threat intelligence search engine

**How to Get:**
1. Visit: https://www.threatcrowd.org/
2. No registration required
3. API is completely free and open

**Environment Variable**: Not required (open API)
**Free Tier**: No limits
**Cost**: Free

## AEGIS New Features & Requirements

### Real-time 3D Network Visualization
- **No additional APIs required**
- Uses built-in network topology algorithms
- Real-time canvas-based rendering

### AI Threat Hunting Dashboard  
- **Enhanced by**: OpenAI API (for advanced analysis)
- **Alternative**: Works with built-in ML models without API

### Automated Incident Response
- **Enhanced by**: All threat intelligence APIs
- **Core functionality**: Works independently with simulated data

### Predictive Attack Timeline
- **Enhanced by**: OpenAI API + CVE/NVD data
- **Core functionality**: Uses built-in predictive algorithms

### Interactive Threat Intelligence Map
- **Enhanced by**: IPInfo API (geolocation) + all threat Intel APIs
- **Core functionality**: Works with simulated global threat data

### AI Security Chatbot
- **Enhanced by**: OpenAI API (for natural language processing)
- **Alternative**: Works with pre-programmed responses

## Configuration Steps

### 1. Create Environment File
Create a `.env.local` file in your project root:

```env
# Core Threat Intelligence APIs
VITE_VIRUSTOTAL_API_KEY=your_virustotal_api_key_here
VITE_SHODAN_API_KEY=your_shodan_api_key_here
VITE_ABUSEIPDB_API_KEY=your_abuseipdb_api_key_here
VITE_IPINFO_API_KEY=your_ipinfo_api_key_here
VITE_NVD_API_KEY=your_nvd_api_key_here
VITE_OPENAI_API_KEY=your_openai_api_key_here

# Optional Enhanced APIs
VITE_GREYNOISE_API_KEY=your_greynoise_api_key_here
VITE_URLVOID_API_KEY=your_urlvoid_api_key_here
VITE_OTX_API_KEY=your_otx_api_key_here

# Cloud APIs (Enterprise)
VITE_AWS_ACCESS_KEY=your_aws_access_key_here
VITE_AWS_SECRET_KEY=your_aws_secret_key_here
VITE_AWS_REGION=us-east-1
```

### 2. Restart Development Server
After adding environment variables:
```bash
npm run dev
```

### 3. Verify Configuration
1. Open AEGIS dashboard
2. Check the "API Integration Status" card
3. All APIs should show "OK" status
4. Test real-time features

## Hackathon-Winning Features Guide

### 1. 3D Network Topology Visualization
- **Demo impact**: Visual wow factor, real-time network security
- **Key talking points**: "Live 3D network visualization with AI threat detection"
- **No API dependencies**: Works out of the box

### 2. AI Threat Hunting Operations
- **Demo impact**: Shows sophisticated AI/ML capabilities
- **Key talking points**: "Autonomous threat hunting with ensemble AI models"
- **Enhanced with**: OpenAI API for advanced analysis

### 3. Automated Incident Response
- **Demo impact**: Demonstrates full automation and AI decision making
- **Key talking points**: "Zero-human-intervention incident response"
- **Enhanced with**: All threat intelligence APIs

### 4. Predictive Attack Timeline
- **Demo impact**: Shows future prediction capabilities
- **Key talking points**: "AI predicts attacks before they happen"
- **Enhanced with**: OpenAI + NVD APIs

### 5. Global Threat Intelligence Map
- **Demo impact**: Geographic visualization of global threats
- **Key talking points**: "Real-time global threat intelligence visualization"
- **Enhanced with**: IPInfo + all threat APIs

### 6. AI Security Chatbot
- **Demo impact**: Natural language interaction with security AI
- **Key talking points**: "Talk to your security system in plain English"
- **Enhanced with**: OpenAI API for natural responses

## API Rate Limits & Best Practices

### Rate Limiting Strategy
- **VirusTotal**: 4 requests/minute (free) - Cache results for 1 hour
- **Shodan**: 100 queries/month (free) - Use sparingly, cache aggressively
- **AbuseIPDB**: 1,000 requests/day (free) - Rate limit to ~40/hour
- **IPInfo**: 50,000 requests/month (free) - ~1,600 requests/day
- **NVD**: 50 requests/30 seconds - Batch CVE queries
- **OpenAI**: Pay-per-use - Optimize prompts, cache responses
- **GreyNoise**: 10,000 requests/month (free) - Cache for 24 hours
- **URLVoid**: 1,000 requests/month (free) - Cache for 6 hours

### Demo-Ready Features (No API Required)
All core AEGIS features work without APIs for demonstration:
- 3D Network Visualization
- AI Threat Hunting (with simulated data)
- Incident Response System
- Predictive Timeline
- Threat Intelligence Map
- Security Chatbot (with pre-programmed responses)

### API-Enhanced Features
When APIs are configured, these features become even more powerful:
- **Real threat intelligence** instead of simulated data
- **Live CVE feeds** from NVD
- **Actual IP reputation** checking
- **Real geolocation** data for threats
- **Advanced AI analysis** with OpenAI
- **Community threat intelligence** from OTX

## Security Considerations

### API Key Protection
1. **Never commit API keys to version control**
2. **Use environment variables only**
3. **Rotate keys regularly**
4. **Monitor API usage for anomalies**

### Network Security
1. **Use HTTPS for all API calls**
2. **Implement request signing where available**
3. **Log API interactions for audit**
4. **Set up monitoring for rate limit violations**

## Troubleshooting

### Common Issues

1. **CORS Errors**
   - Solution: Use server-side proxy for API calls
   - Implementation: Create Supabase Edge Functions

2. **Rate Limit Exceeded**
   - Solution: Implement exponential backoff
   - Cache responses aggressively

3. **Invalid API Key**
   - Check environment variable names
   - Verify API key format
   - Confirm account status

4. **Network Timeouts**
   - Implement retry logic
   - Set appropriate timeout values
   - Use circuit breaker pattern

### Testing API Integration

```bash
# Test individual APIs
curl -H "x-apikey: YOUR_VIRUSTOTAL_KEY" \
  "https://www.virustotal.com/vtapi/v2/ip-address/report?ip=8.8.8.8"

curl -H "Key: YOUR_ABUSEIPDB_KEY" \
  "https://api.abuseipdb.com/api/v2/check?ipAddress=8.8.8.8"

curl "https://ipinfo.io/8.8.8.8?token=YOUR_IPINFO_TOKEN"
```

## Quick Start Checklist

- [ ] Sign up for VirusTotal account and get API key
- [ ] Register for Shodan and obtain API key
- [ ] Create AbuseIPDB account and generate key
- [ ] Sign up for IPInfo and get access token
- [ ] Request NVD API key
- [ ] Create OpenAI account and get API key
- [ ] (Optional) Get GreyNoise, URLVoid, OTX API keys
- [ ] Create `.env.local` file with all keys
- [ ] Restart development server
- [ ] Verify API status in AEGIS dashboard
- [ ] Test all hackathon-winning features

With all APIs configured, AEGIS provides a complete, production-ready autonomous cybersecurity platform with real-time threat intelligence, AI-powered analysis, and automated incident response using live data from multiple security sources.
