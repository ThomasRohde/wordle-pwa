# GitHub Pages Deployment Guide

## Option 1: Using GitHub Actions (Recommended)

The project is now configured with a GitHub Actions workflow that automatically deploys to GitHub Pages when you push to the main branch.

### Setup Steps:

1. **Enable GitHub Pages**: Go to your repository settings → Pages → Source: "GitHub Actions"

2. **Push your changes**:
   ```bash
   git add .
   git commit -m "Add GitHub Actions deployment workflow"
   git push origin main
   ```

3. **The deployment will run automatically** and your site will be available at:
   `https://thomasrohde.github.io/wordle-pwa/`

## Option 2: Manual Deployment with gh-pages

If you prefer manual deployment:

```bash
npm run build
npm run deploy
```

## What Was Fixed

The following issues were resolved:

1. **Icon paths**: Updated manifest to use absolute paths with `/wordle-pwa/` prefix
2. **Service Worker**: Explicitly configured VitePWA to generate `sw.js` 
3. **Jekyll conflicts**: Added `.nojekyll` file to prevent GitHub Pages Jekyll processing
4. **GitHub Actions**: Added automated deployment workflow

## Troubleshooting

If you still see 404 errors after deployment:

1. **Check GitHub Pages settings**: Ensure source is set to "GitHub Actions"
2. **Wait for deployment**: Check the Actions tab for deployment status
3. **Clear browser cache**: Hard refresh (Ctrl+F5) the page
4. **Verify repository name**: Ensure it matches "wordle-pwa" in vite.config.ts

## Files Changed

- `.github/workflows/deploy.yml` - Added GitHub Actions workflow
- `vite.config.ts` - Fixed icon paths and PWA configuration  
- `public/.nojekyll` - Prevents Jekyll processing
- `package.json` - Updated homepage URL
