# PWA App Generator

**Project Idea:** `<insert your app idea here>`

**Task:** Scaffold a new **Progressive Web App (PWA)** that is fully static, stores data in browser storage, and can be deployed to GitHub Pages. Follow these guidelines:

**First step:**

1. **Generate a `TODO.md` file** at the project root listing the major tasks and subtasks.
2. Keep this `TODO.md` up to date—append/modify checklist items as the scaffold progresses so it always reflects remaining work.

**General requirements:**

1. **Project Setup**
    - Use **Vite** with **React + TypeScript**.
    - Add **vite-plugin-pwa** for automatic Service Worker generation and manifest injection.
    - Include scripts in `package.json` for `dev`, `build`, and `deploy` (using **gh-pages**).
    - Set the Vite `base` option and React Router `basename` to the repo name for GitHub Pages compatibility.
2. **PWA Essentials**
    - Generate a **`manifest.webmanifest`** with name, short_name, description, theme_color, background_color, display mode `standalone`, start_url `"./"`, and a full icon set (192 px & 512 px PNGs plus maskable).
    - Configure **vite-plugin-pwa** to:
        - Register the Service Worker automatically (`registerType: "prompt"`).
        - Use **Workbox** defaults for precaching build assets.
        - Add runtime caching for same-origin images and JSON using a stale-while-revalidate strategy.
    - Create a custom **Service Worker** extension (if needed) to:
        - Cache API responses or dynamic JSON in IndexedDB when offline.
        - Show an “offline fallback page” for navigation requests.
        - Listen for the `beforeinstallprompt` event and expose a UI button to trigger install.
    - Provide an **offline-ready** landing page and ensure all critical routes work without network.
3. **Data Persistence**
    - Use **Local Storage** (or optionally **IndexedDB** via a wrapper) for core user data.
    - Implement a context or custom hook that syncs React state ↔ storage with debounce saving.
    - Guarantee read/write still works when offline.
4. **State Management & Architecture**
    - Organize code into `components`, `pages`, `hooks`, `context`, `utils`, and `types`.
    - Keep components modular and responsive using **Tailwind CSS** (mobile-first).
    - Use React Router for navigation; ensure each route’s resources are precached.
5. **Enhanced PWA Features (Optional but scaffold-ready)**
    - Integrate **push notifications**: include a stub `notifications.ts` that requests permission and shows a local notification via the Service Worker.
    - Add **background sync** scaffolding to queue mutations while offline and replay them when back online (even though no real backend is used yet).
    - Provide a Lighthouse config and npm script (`npm run audit`) to test PWA scores.
6. **GitHub Pages Deployment**
    - Configure `vite.config.ts` so the Service Worker scope and asset URLs respect the `/your-repo-name/` base path.
    - Use `"deploy": "gh-pages -d dist"` in `package.json`.
    - Document any GitHub Pages quirks, such as disabling Jekyll (`.nojekyll`) and caching headers.
7. **Example Feature Implementation**
    - Build a minimal UI demonstrating:
        - Adding, editing, and deleting items (saved to storage).
        - An install-PWA button.
        - A toast/banner indicating offline or online status (listen to `navigator.onLine`).
8. **Documentation**
    - Generate a **README** explaining: setup, dev server, PWA testing (Chrome DevTools & Lighthouse), deployment steps, and how offline support works.
    - Include badges or instructions for verifying the PWA passes all core requirements.
    - Keep `TODO.md` current until all tasks are complete.

**Output:** Produce the complete file structure—with starter code, manifest, Service Worker, icons, and README—ready for a developer to run `npm install`, `npm run dev`, and instantly have an installable, offline-capable PWA deployable via `npm run deploy`.