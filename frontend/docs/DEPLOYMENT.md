# Deployment Guide

This guide covers how to deploy the Mini Social frontend to various hosting platforms.

## Prerequisites

Before deploying, make sure you have:
- Built the project successfully (`npm run build`)
- Set up Firebase with authentication and Firestore
- Configured environment variables

## Netlify Deployment

### Method 1: Deploy via Netlify CLI

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Build the project:
```bash
npm run build
```

3. Deploy:
```bash
netlify deploy --prod
```

4. Select the `dist` directory when prompted

### Method 2: Deploy via Git

1. Push your code to GitHub/GitLab/Bitbucket
2. Go to [Netlify](https://www.netlify.com/)
3. Click "Add new site" > "Import an existing project"
4. Connect your Git provider and select your repository
5. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Add environment variables in Site settings > Environment variables
7. Deploy

## Vercel Deployment

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

3. Follow the prompts
4. Add environment variables:
```bash
vercel env add VITE_FIREBASE_API_KEY
vercel env add VITE_FIREBASE_AUTH_DOMAIN
# ... add all other environment variables
```

Or via the Vercel dashboard:
1. Push code to GitHub
2. Go to [Vercel](https://vercel.com/)
3. Import your repository
4. Configure environment variables
5. Deploy

## Firebase Hosting

1. Install Firebase CLI:
```bash
npm install -g firebase-tools
```

2. Login to Firebase:
```bash
firebase login
```

3. Initialize Firebase Hosting:
```bash
firebase init hosting
```

Configure as follows:
- Public directory: `dist`
- Configure as single-page app: Yes
- Set up automatic builds: No (optional)

4. Build the project:
```bash
npm run build
```

5. Deploy:
```bash
firebase deploy --only hosting
```

## GitHub Pages

1. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Add to `package.json`:
```json
{
  "homepage": "https://yourusername.github.io/mini-social",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

3. Update `vite.config.ts`:
```typescript
export default defineConfig({
  base: '/mini-social/', // your repo name
  // ... rest of config
})
```

4. Deploy:
```bash
npm run deploy
```

## Environment Variables

All deployment platforms need these environment variables:

```
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID
```

### Setting Environment Variables

**Netlify:**
- Go to Site settings > Environment variables
- Add each variable

**Vercel:**
- Go to Project settings > Environment Variables
- Add each variable

**Firebase Hosting:**
- No need to set separately (uses .env file during build)

## Post-Deployment Checklist

- [ ] Test user registration
- [ ] Test user login/logout
- [ ] Test creating posts
- [ ] Test editing own posts
- [ ] Test deleting own posts
- [ ] Verify real-time updates work
- [ ] Check responsive design on mobile
- [ ] Verify all routes work (no 404s)
- [ ] Test authentication persistence
- [ ] Check Firebase security rules are correct

## Troubleshooting

### Issue: 404 on page refresh
**Solution:** Make sure `_redirects` file is in the `public` directory:
```
/*    /index.html   200
```

### Issue: Firebase not connecting
**Solution:** Verify all environment variables are set correctly

### Issue: CORS errors
**Solution:** Check Firebase project settings and ensure the domain is authorized

### Issue: Build fails
**Solution:** 
1. Clear node_modules: `rm -rf node_modules`
2. Clear cache: `npm cache clean --force`
3. Reinstall: `npm install`
4. Rebuild: `npm run build`

## Custom Domain Setup

### Netlify
1. Go to Domain settings
2. Add custom domain
3. Update DNS records as instructed

### Vercel
1. Go to Domains
2. Add your domain
3. Update DNS records as instructed

### Firebase Hosting
1. Go to Hosting settings
2. Add custom domain
3. Verify ownership
4. Update DNS records

## HTTPS Setup

All mentioned platforms provide automatic HTTPS. Make sure to:
1. Force HTTPS redirect (usually automatic)
2. Update Firebase Auth authorized domains
3. Test authentication works over HTTPS

## Continuous Deployment

### GitHub Actions (Netlify/Vercel)
```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - run: npm run deploy
        env:
          VITE_FIREBASE_API_KEY: ${{ secrets.VITE_FIREBASE_API_KEY }}
          # ... other env vars
```

## Performance Optimization

After deployment:
1. Enable compression (gzip/brotli)
2. Set up CDN
3. Enable caching headers
4. Monitor performance with Lighthouse
5. Set up error tracking (e.g., Sentry)

