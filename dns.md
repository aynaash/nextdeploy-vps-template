# 🌐 NextDeploy DNS Setup Guide

Target Domain: **ressencesystems.com**
Deployment Type: **VPS (Direct Server)**
Generated: `2026-07-06 00:40:20 EAT`

Server IP: **production-01**

> [!IMPORTANT]
> This guide contains **exact** values for your domain. Copy them precisely.
> DNS changes can take 5-60 minutes to propagate worldwide.
> 📚 [Full Documentation](https://nextdeploy.org/docs)

### ⏱️ DNS Propagation Timeline

| DNS Server | Typical Time |
| :--- | :--- |
| Namecheap/Provider | ⚡ Instant (once saved) |
| Google (8.8.8.8) | 5-30 minutes |
| Cloudflare (1.1.1.1) | 5-30 minutes |
| Worldwide | 24-48 hours max |

## 📍 Step 1: Root Domain A Record

Points your main domain directly to your server.

| Field | Value |
| :--- | :--- |
| **Type** | `A Record` |
| **Host/Name** | `@` |
| **Value/IP** | `production-01` |
| **TTL** | `Automatic` |


## 🔄 Step 2: WWW Subdomain

Ensures `www.ressencesystems.com` works properly.

| Field | Value |
| :--- | :--- |
| **Type** | `CNAME` |
| **Host/Name** | `www` |
| **Value/Target** | `ressencesystems.com` |
| **TTL** | `Automatic` (or 5-30 minutes) |


## 📋 Provider-Specific Instructions

### Namecheap

| Do | Don't |
| :--- | :--- |
| ✅ Use `@` for root domain | ❌ Never include `.ressencesystems.com` in Host field |
| ✅ For www SSL: `_hash.www` in Host | ❌ Don't add trailing dots |
| ✅ Copy values exactly as shown | ❌ Don't add extra spaces |

### Cloudflare

⚠️ **Critical**: For SSL validation records, ensure the cloud icon is **gray** (DNS only)

| Record Type | Proxy Status |
| :--- | :--- |
| SSL Validation Records | ⚪ Gray cloud (DNS only) |
| Root/WWW (after SSL) | 🟠 Orange cloud (proxied) optional |

### GoDaddy

- Use **@** for root domain
- Points to field should NOT have trailing dot
- TTL can be left as 1 hour

## ⚠️ Common Pitfalls to Avoid

| ❌ Wrong | ✅ Correct | Why |
| :--- | :--- | :--- |
| `_5f2eb7...nextdeploy.org` | `_5f2eb7...` | Host field should NOT include your domain name |
| `_hash.www.nextdeploy.org` | `_hash.www` | For www SSL records, stop at '.www' |
| `value.acm-validations.aws.` | `value.acm-validations.aws` | Most providers don't want trailing dots in the Value field |
| `Waiting 2 minutes and giving up` | `Waiting 30+ minutes for propagation` | DNS propagation takes time - be patient! |

## 🔍 How to Verify Records

After adding records, verify they're working:

```bash
# Check root domain
dig nextdeploy.org CNAME +short

# Check SSL validation records
dig _5f2eb7...nextdeploy.org CNAME +short
dig @8.8.8.8 _hash.www.nextdeploy.org CNAME +short  # Use Google DNS

# Watch for propagation
watch -n 60 'dig @8.8.8.8 _hash.www.nextdeploy.org CNAME +short'
```

**Expected output**: You should see the target value (CloudFront domain or validation string)

## 🚀 Final Steps

1. ✅ Save both records in your DNS panel
2. ⏱️ Wait 5-10 minutes for propagation
3. 🔒 SSL will be automatically provisioned by Caddy on first visit
4. 🌐 Visit https://ressencesystems.com to test

