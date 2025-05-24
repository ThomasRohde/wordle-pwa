# Wordle PWA - Copilot Instructions

This is a Progressive Web App (PWA) implementation of the Wordle game built with React, TypeScript, and Vite. The project follows modern PWA best practices and is optimized for mobile devices.

## Project Architecture

### Tech Stack
- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite with vite-plugin-pwa
- **Styling**: Tailwind CSS (mobile-first)
- **Routing**: React Router
- **Storage**: Local Storage with React Context
- **Deployment**: GitHub Pages via GitHub Actions

### Code Organization
```
src/
├── components/     # Reusable UI components (GameBoard, Keyboard, etc.)
├── pages/         # Route components (Game, About)
├── hooks/         # Custom React hooks (useGame, usePWA, useToast)
├── context/       # React context providers (GameContext)
├── utils/         # Utility functions (game logic, storage, PWA helpers)
└── types/         # TypeScript type definitions
```

## Coding Standards

### React Guidelines
- Use functional components with hooks
- Implement proper TypeScript types for all props and state
- Use React Context for global state management
- Keep components small and focused
- Follow React hooks rules (no conditional hooks)

### TypeScript Guidelines
- Use strict TypeScript configuration
- Define interfaces for all data structures
- Use type guards for runtime type checking
- Prefer `const` assertions and `readonly` modifiers
- Use optional chaining (`?.`) and nullish coalescing (`??`)

### PWA-Specific Guidelines
- Always use absolute paths in manifest for GitHub Pages deployment
- Implement proper service worker registration with user prompts
- Include comprehensive logging for PWA debugging
- Test install functionality requires user interaction first
- Use mobile-first responsive design patterns

### Mobile UI Guidelines
- Handle iOS Safari dynamic viewport with CSS custom properties
- Use safe area CSS variables for iPhone notch support
- Prevent iOS zoom on input focus (16px minimum font size)
- Optimize touch interactions with proper touch-action CSS
- Implement keyboard-friendly navigation

### File Naming Conventions
- Use PascalCase for React components (`GameBoard.tsx`)
- Use camelCase for utility functions and hooks (`useGame.ts`)
- Use kebab-case for configuration files (`vite.config.ts`)
- Use descriptive names that indicate purpose

### Error Handling
- Implement try/catch blocks for localStorage operations
- Add error boundaries for React components
- Log errors with contextual information
- Provide graceful fallbacks for PWA features

### Performance Guidelines
- Use React.memo for expensive components
- Implement debounced localStorage saves
- Lazy load non-critical components
- Optimize icon generation with canvas library

## PWA Best Practices

### Installation
- Implement `beforeinstallprompt` event handling
- Provide alternative installation instructions
- Add debugging utilities for install criteria checking
- Test in incognito windows to avoid cached state

### Offline Support
- Cache critical assets with service worker
- Implement offline fallback pages
- Store game state in localStorage
- Provide online/offline status indicators

### Mobile Optimization
- Use viewport meta tag with `viewport-fit=cover`
- Implement dynamic viewport height handling
- Add touch optimization CSS
- Test on actual mobile devices, not just DevTools

## Deployment Configuration

### GitHub Pages
- Set correct base path in `vite.config.ts`: `/wordle-pwa/`
- Use absolute icon paths in manifest
- Include `.nojekyll` file in public folder
- Configure GitHub Actions for automated deployment

### Icon Generation
- Use automated canvas-based icon generation
- Generate valid PNG files >1KB for all sizes
- Include `prebuild` script in package.json
- Test icon validity by opening directly in browser

## Testing Guidelines
- Test PWA install functionality in production environment
- Verify offline functionality works correctly
- Test on multiple mobile devices and browsers
- Use Lighthouse for PWA audit scores
- Check service worker registration in DevTools

## Common Issues & Solutions
- Install button requires user interaction first
- Icons must be valid PNG files with absolute paths
- Service worker scope must match deployment path
- iOS Safari requires special viewport and touch handling
- GitHub Pages deployment needs proper base path configuration

When making changes to this project, always consider:
1. PWA compliance and installation requirements
2. Mobile-first responsive design
3. Offline functionality preservation
4. TypeScript type safety
5. Performance implications
6. Cross-browser compatibility (especially iOS Safari)
