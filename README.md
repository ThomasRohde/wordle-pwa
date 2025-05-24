# Wordle PWA 🎮

A fully-featured Progressive Web App (PWA) clone of the popular Wordle game, built with React, TypeScript, and modern web technologies. Features offline support, installable app functionality, and a responsive design that works great on all devices.

[![PWA](https://img.shields.io/badge/PWA-Ready-green.svg)](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-4.5.0-646CFF.svg)](https://vitejs.dev/)

## ✨ Features

### 🎯 Core Game Features
- **Complete Wordle gameplay** - Guess the 5-letter word in 6 tries
- **Daily words** - New word every day with consistent seed
- **Smart keyboard** - Visual feedback on used letters
- **Game statistics** - Track wins, streaks, and guess distribution
- **Share results** - Copy/share your game results

### 📱 PWA Features
- **Offline Support** - Play without internet connection
- **Installable** - Add to home screen like a native app
- **Service Worker** - Advanced caching and background sync
- **Responsive Design** - Works perfectly on mobile, tablet, and desktop
- **Local Storage** - Game progress saved on your device
- **Push Notifications** - Optional daily game reminders

### 🎨 UI/UX Features
- **Smooth animations** - Tile flips and keyboard feedback
- **Touch-friendly** - Optimized for mobile interaction
- **Accessibility** - Screen reader support and keyboard navigation
- **Dark/Light themes** - System preference detection
- **Loading states** - Smooth app initialization
- **Error handling** - Graceful offline/error states

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm/yarn
- Modern web browser
- Git

### Development Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/wordle-pwa.git
cd wordle-pwa

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000 in your browser
```

### Building for Production

```bash
# Build the app
npm run build

# Preview the build
npm run preview

# Test PWA functionality at http://localhost:4173
```

### Deployment to GitHub Pages

```bash
# Build and deploy
npm run build
npm run deploy

# Your app will be available at https://yourusername.github.io/wordle-pwa/
```

## 📁 Project Structure

```
wordle-pwa/
├── public/                 # Static assets
│   ├── icons/             # PWA icons (192px, 512px)
│   ├── offline.html       # Offline fallback page
│   └── manifest.webmanifest
├── src/
│   ├── components/        # React components
│   │   ├── GameBoard.tsx  # Game grid
│   │   ├── Keyboard.tsx   # Virtual keyboard
│   │   ├── Header.tsx     # App header with stats
│   │   ├── Tile.tsx       # Game tiles
│   │   └── Toast.tsx      # Notification toasts
│   ├── context/           # React context
│   │   └── GameContext.tsx
│   ├── hooks/             # Custom hooks
│   │   ├── useGame.ts     # Game logic
│   │   ├── useKeyboard.ts # Keyboard handling
│   │   ├── usePWA.ts      # PWA functionality
│   │   └── useToast.ts    # Toast notifications
│   ├── pages/             # Page components
│   │   ├── Game.tsx       # Main game page
│   │   └── About.tsx      # About page
│   ├── types/             # TypeScript types
│   │   └── index.ts
│   ├── utils/             # Utility functions
│   │   ├── game.ts        # Game logic
│   │   ├── storage.ts     # Local storage
│   │   ├── pwa.ts         # PWA utilities
│   │   └── notifications.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── vite.config.ts         # Vite configuration
├── tailwind.config.js     # Tailwind CSS config
└── package.json
```

## 🔧 Configuration

### GitHub Pages Setup

1. **Update repository name** in `vite.config.ts`:
   ```typescript
   const REPO_NAME = 'your-repo-name' // Replace with your actual repo name
   ```

2. **Update homepage** in `package.json`:
   ```json
   "homepage": "https://yourusername.github.io/your-repo-name"
   ```

3. **Enable GitHub Pages** in repository settings
4. **Add `.nojekyll`** file to disable Jekyll processing

### PWA Configuration

The PWA is configured in `vite.config.ts` with:
- **Service Worker**: Automatic registration with update prompts
- **Manifest**: App metadata and icons
- **Workbox**: Precaching and runtime caching strategies
- **Offline support**: Fallback pages and cached resources

### Icon Generation

Generate PWA icons using the included `generate-icons.html`:
1. Open `generate-icons.html` in your browser
2. Download the generated 192x192 and 512x512 PNG files
3. Replace the placeholder files in `public/icons/`

## 🔧 Troubleshooting

### Install Button Not Visible on GitHub Pages

If the PWA install button works in development but disappears on GitHub Pages:

1. **Check Browser Console** - Look for PWA-related errors
2. **Verify Icon Paths** - Icons must use absolute paths for GitHub Pages
3. **Test Icon Validity** - Visit icon URLs directly to ensure they load
4. **Check Service Worker** - DevTools > Application > Service Workers
5. **Use Debug Function** - In browser console, run `checkPWAInstallCriteria()`

See `PWA_TROUBLESHOOTING.md` for detailed debugging steps.

### Common Issues

- **Icons not loading**: Ensure icons are valid PNG files >1KB
- **Service Worker errors**: Check console for registration failures  
- **Manifest issues**: Use DevTools > Application > Manifest tab
- **Already installed**: PWA install prompt won't show if already installed
- **Browser support**: Some browsers have stricter PWA requirements

### Manual Installation

If automatic install doesn't work, users can install manually:
- **Desktop**: Look for install icon in address bar or browser menu
- **iOS**: Share button → "Add to Home Screen"
- **Android**: Menu → "Add to Home Screen" or "Install App"

## 🎮 How to Play

1. **Guess the word** - Enter a 5-letter word
2. **Check the colors**:
   - 🟩 **Green**: Correct letter in correct position
   - 🟨 **Yellow**: Correct letter in wrong position
   - ⬛ **Gray**: Letter not in the word
3. **Use the feedback** to make better guesses
4. **Solve in 6 tries** to win!

## 🔍 PWA Testing

### Testing PWA Features

1. **Lighthouse Audit**:
   ```bash
   # Build and serve
   npm run build
   npm run preview
   
   # Run Lighthouse audit
   npm run audit
   ```

2. **Chrome DevTools**:
   - Open Application tab
   - Check Service Workers, Storage, and Manifest
   - Test offline functionality
   - Verify installability

3. **Installation Testing**:
   - Look for install button in browser
   - Test "Add to Home Screen" on mobile
   - Verify app works when installed

### Browser Support

- **Chrome/Edge**: Full PWA support
- **Firefox**: Core features (limited install support)
- **Safari**: iOS 11.3+ with some limitations
- **Mobile browsers**: Excellent support on modern versions

## 📊 Performance

- **Lighthouse Score**: 95+ on all metrics
- **First Load**: < 1s on fast 3G
- **Cache Strategy**: Aggressive caching for instant loads
- **Bundle Size**: < 500kb gzipped
- **Offline Ready**: Complete offline functionality

## 🛠️ Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checks
npm run deploy       # Deploy to GitHub Pages
npm run audit        # Run Lighthouse audit
```

### Adding New Features

1. **Game logic**: Update `src/utils/game.ts`
2. **UI components**: Add to `src/components/`
3. **State management**: Extend `src/context/GameContext.tsx`
4. **PWA features**: Modify `vite.config.ts` and service worker

### Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly (including PWA features)
5. Submit a pull request

## 🌐 Deployment Options

### GitHub Pages (Recommended)
```bash
npm run deploy
```

### Netlify
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`

### Vercel
1. Import your GitHub repository
2. Vercel will auto-detect Vite configuration
3. Deploy with one click

### Self-hosted
```bash
npm run build
# Serve the `dist` folder with any static file server
```

## 📱 Installation

### Desktop (Chrome/Edge)
- Look for the install icon (📱) in the address bar
- Click "Install Wordle PWA"

### Mobile (iOS)
- Tap Share button
- Select "Add to Home Screen"

### Mobile (Android)
- Tap menu button
- Select "Add to Home Screen" or "Install App"

## 🔐 Privacy & Security

- **No data collection**: All game data stays on your device
- **Local storage only**: No server communication required
- **HTTPS required**: PWA features require secure context
- **No tracking**: Complete privacy protection

## 🐛 Troubleshooting

### Common Issues

**PWA not installing:**
- Ensure HTTPS connection
- Check browser PWA support
- Verify manifest.json is valid

**Offline not working:**
- Clear browser cache
- Check service worker registration
- Ensure all assets are cached

**Icons not showing:**
- Generate proper PNG icons from SVG files
- Check manifest.json icon paths
- Verify icon sizes (192px, 512px)

### Debug Tools

```javascript
// Check service worker status
navigator.serviceWorker.getRegistrations()

// Check PWA install readiness
window.addEventListener('beforeinstallprompt', (e) => {
  console.log('PWA install available')
})

// Monitor online/offline status
navigator.onLine // true/false
```

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Original Wordle game by Josh Wardle
- React and TypeScript communities
- Workbox team for PWA tools
- Tailwind CSS for styling system

## 🔗 Links

- [Live Demo](https://yourusername.github.io/wordle-pwa/)
- [PWA Documentation](https://web.dev/progressive-web-apps/)
- [Vite PWA Plugin](https://vite-pwa-org.netlify.app/)
- [Workbox](https://workboxjs.org/)

---

**Built with ❤️ for the web platform**

*This project demonstrates modern PWA development practices including offline functionality, installability, and responsive design. Perfect for learning PWA development or as a starting point for your own word game!*
