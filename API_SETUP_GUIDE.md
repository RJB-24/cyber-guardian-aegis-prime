
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

### 7. AWS CloudWatch (Enterprise)
**Purpose**: Cloud infrastructure monitoring, log analysis

**How to Get:**
1. Create AWS account: https://aws.amazon.com/
2. Create IAM user with CloudWatch permissions
3. Generate access keys

**Environment Variables**: 
- `VITE_AWS_ACCESS_KEY`
- `VITE_AWS_SECRET_KEY`
- `VITE_AWS_REGION`

### 8. Microsoft Defender API (Enterprise)
**Purpose**: Endpoint detection and response

**How to Get:**
1. Azure Active Directory admin access required
2. Register application in Azure AD
3. Configure API permissions

### 9. CrowdStrike Falcon API (Enterprise)
**Purpose**: Advanced endpoint protection

**How to Get:**
1. CrowdStrike Falcon subscription required
2. Contact CrowdStrike for API access

## Configuration Steps

### 1. Create Environment File
Create a `.env.local` file in your project root:

```env
# Threat Intelligence APIs
VITE_VIRUSTOTAL_API_KEY=your_virustotal_api_key_here
VITE_SHODAN_API_KEY=your_shodan_api_key_here
VITE_ABUSEIPDB_API_KEY=your_abuseipdb_api_key_here
VITE_IPINFO_API_KEY=your_ipinfo_api_key_here
VITE_NVD_API_KEY=your_nvd_api_key_here
VITE_OPENAI_API_KEY=your_openai_api_key_here

# Optional Cloud APIs
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
4. Click "Test Real-time APIs" to verify functionality

## API Rate Limits & Best Practices

### Rate Limiting Strategy
- **VirusTotal**: 4 requests/minute (free) - Cache results for 1 hour
- **Shodan**: 100 queries/month (free) - Use sparingly, cache aggressively
- **AbuseIPDB**: 1,000 requests/day (free) - Rate limit to ~40/hour
- **IPInfo**: 50,000 requests/month (free) - ~1,600 requests/day
- **NVD**: 50 requests/30 seconds - Batch CVE queries
- **OpenAI**: Pay-per-use - Optimize prompts, cache responses

### Caching Implementation
```javascript
// Example caching strategy
const cache = new Map();
const CACHE_DURATION = 3600000; // 1 hour

async function cachedAPICall(key, apiFunction) {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  
  const data = await apiFunction();
  cache.set(key, { data, timestamp: Date.now() });
  return data;
}
```

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

## Monitoring & Analytics

### API Usage Tracking
1. **Log all API calls with timestamps**
2. **Track response times and error rates**
3. **Monitor rate limit consumption**
4. **Set up alerts for API failures**

### Performance Metrics
- Average response time per API
- Success/failure rates
- Cache hit ratios
- Monthly API costs

## Scaling Considerations

### Production Deployment
1. **Use paid API tiers for production**
2. **Implement distributed caching (Redis)**
3. **Set up API monitoring and alerting**
4. **Consider API gateways for rate limiting**

### Cost Optimization
1. **Implement intelligent caching**
2. **Batch API requests where possible**
3. **Use free tiers efficiently**
4. **Monitor and optimize query patterns**

## Legal & Compliance

### Terms of Service
- Review each API provider's terms
- Ensure compliance with usage policies
- Understand data retention requirements
- Implement proper attribution where required

### Data Privacy
- Minimize data collection
- Implement data retention policies
- Ensure GDPR compliance if applicable
- Document data processing activities

---

## Quick Start Checklist

- [ ] Sign up for VirusTotal account and get API key
- [ ] Register for Shodan and obtain API key
- [ ] Create AbuseIPDB account and generate key
- [ ] Sign up for IPInfo and get access token
- [ ] Request NVD API key
- [ ] Create OpenAI account and get API key
- [ ] Create `.env.local` file with all keys
- [ ] Restart development server
- [ ] Verify API status in AEGIS dashboard
- [ ] Test real-time functionality

With all APIs configured, AEGIS will provide real-time threat intelligence, automated analysis, and AI-powered countermeasure generation using live data from multiple security sources.
