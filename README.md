<p align="center">
  <img src="dist/favicon.svg" width="400">
</p>

> **Keep your reference in sight.**

Kickstand is a browser-based web utility that keeps a single reference image visible in a floating **Document Picture-in-Picture** window while you work in other applications. Paste a screenshot or mockup, pop it out, and keep working — no split screen, no alt-tab, no install, no account.

[![Live Demo](https://img.shields.io/badge/demo-kickstand--mu.vercel.app-3F6893?style=flat-square)](https://kickstand-mu.vercel.app/)
[![GitHub Repository](https://img.shields.io/badge/github-nyomann--arch%2FKickstand-1B2733?style=flat-square&logo=github)](https://github.com/nyomann-arch/Kickstand)
[![License: MIT](https://img.shields.io/badge/License-MIT-6B8CAE?style=flat-square)](LICENSE)

🌐 **Language:** [Bahasa Indonesia](README.id.md) · [English](README.md)

---

## Quick Links

- **Live Application:** [https://kickstand-mu.vercel.app/](https://kickstand-mu.vercel.app/)
- **Source Code:** [https://github.com/nyomann-arch/Kickstand](https://github.com/nyomann-arch/Kickstand)
- **License:** [MIT License](LICENSE)

---

## The App

Kickstand is a compact single-page application:

- **Input area** — paste an image (Ctrl+V), choose a file, or drag and drop it onto the dropzone.
- **Preview** — the image renders at its original aspect ratio, never cropped or distorted.
- **Pop Out** — opens the image in a native always-on-top Document PiP window.
- **Actions** — replace or remove the image; closing the PiP window keeps the main preview intact and ready to float again.

---

## Problem It Solves

Developers and designers working on a single monitor often need to keep one visual reference — a screenshot, mockup, or diagram — visible while working in an editor like VS Code or Figma. Common workarounds all have friction:

- **Split-screen** shrinks the area available for the main application.
- **Alt-tabbing** back and forth repeatedly breaks concentration.
- **A normal browser tab** forces a context switch every time you check the reference.
- **Always-on-top desktop utilities or extensions** may require installation, permissions, or administrator approval.
- **Full reference boards** like PureRef are overkill when you only need one image for a few minutes.

Kickstand demonstrates a lighter path for this *ephemeral* need: paste one image, pop it out into a floating window, work, then close it when done.

---

## Key Features

### 1. Three Input Methods
Every image can enter Kickstand through any of three paths:

- **Paste:** press Ctrl+V while the Kickstand tab is focused — handled via the Clipboard Event API.
- **File Picker:** choose a PNG, JPG, or WebP file from your device.
- **Drag-and-Drop:** drop an image file directly onto the dropzone.

All three paths converge on the same validation and preview pipeline.

### 2. Strict Validation & Safe Image Lifecycle
- **Format allowlist:** only PNG, JPEG/JPG, and WebP are accepted — SVG, GIF, video, and PDF are rejected with clear messages.
- **Size limit:** files up to 20 MiB are accepted; oversized, empty, and undecodable files are rejected before they reach the preview.
- **Decode check:** every image is probed with a hidden `Image` element to confirm it actually decodes and to read its natural dimensions.
- **Safe Blob URL lifecycle:** a new Object URL is created per image and assigned to all consumers *before* the old URL is revoked — no broken images and no leaks across repeated swaps.
- **Race-safe input:** rapid successive inputs are handled by request IDs, so a stale async result can never overwrite a newer image.

### 3. Document Picture-in-Picture Engine
- **Feature detection** via `'documentPictureInPicture' in window` — no user-agent sniffing.
- `requestWindow()` is called **synchronously inside the click handler**, preserving transient user activation.
- **Double-click protection** with an `isOpeningPiP` guard and synchronous button disabling.
- **Proportional initial window size** computed from the image's natural aspect ratio, clamped to sane min/max bounds (the browser may still adjust it).
- **One image, one window:** replacing the image while PiP is active updates the *same* floating window — a second PiP is never opened.
- **Clean lifecycle:** the PiP window's `pagehide` event resets state so close → reopen cycles work reliably.

### 4. Honest States & Feedback
- A support badge shows PiP availability up front.
- Empty, loaded, PiP-active, unsupported, and error states are all distinct and clearly messaged.
- Status updates are announced through `aria-live` regions; all controls are keyboard-accessible.
- Unsupported browsers (Safari, mobile) still get full preview with an honest explanation instead of a dead button.

### Browser Support for Pop Out

| Browser | Status | Behavior |
|---|---|---|
| Chrome desktop 116+ | Full support | Target browser — Pop Out works |
| Edge desktop 116+ | Full support | Target browser — Pop Out works |
| Opera desktop 102+ | Full support | Pop Out works |
| Firefox 151+ | Preview | Experimental — may work |
| Safari desktop / mobile | Not supported | Preview only, Pop Out disabled with explanation |

---

## Core Workflow

**Paste → Preview → Pop Out → Work with the reference visible → Close/Reopen**

The PiP window is a real browser window: it stays on top of your other apps, resizes with its native controls, and dies with its tab — exactly like the platform intends.

---

## How to Use

1. Open [https://kickstand-mu.vercel.app/](https://kickstand-mu.vercel.app/) in a supported desktop browser.
2. Copy an image (screenshot, mockup, diagram) from another app.
3. Focus the Kickstand tab and press **Ctrl+V** — or click **Choose image**, or drag and drop a file.
4. Check the preview, then click **Pop Out**.
5. Switch to your main app — the image stays floating above it.
6. Close the PiP window with its native controls; your preview stays put and **Pop Out** works again. Paste a new image anytime to update the same floating window.

Supported formats: **PNG, JPG/JPEG, WebP** (max 20 MiB).

---

## Compatibility & Known Limitations

- **One active image and one PiP window per tab** — by design, not a stack or gallery.
- The PiP window **cannot outlive its tab**; closing the tab closes the window.
- The website **cannot control the window's position** on screen.
- The initial window size is a *request* — the browser may clamp or adjust it.
- Always-on-top is a browser feature, **not a guarantee** above every fullscreen app or OS-level window.
- Paste only works while the Kickstand page has focus — there is **no global clipboard capture**.
- The 20 MiB limit is provisional and may be tuned after device testing.
- Document PiP requires a **secure context** (HTTPS or localhost).

---

## Privacy & Security

Kickstand holds a strict privacy-first principle:

- **100% client-side processing:** images are read via the File API and rendered through Blob Object URLs entirely in browser memory.
- **No backend, no API, no database:** there is no server-side image processing endpoint and no third-party analytics or telemetry.
- **No permanent storage:** images are never written to `localStorage`, `sessionStorage`, `IndexedDB`, cookies, or the filesystem. They live in page memory only and disappear when the tab closes or refreshes.
- **No network calls for images:** no `fetch`, `XMLHttpRequest`, `sendBeacon`, or WebSocket ever transmits image data — verified by static inspection of source and build output.
- **No external assets at runtime:** the app loads no CDNs, fonts, trackers, or third-party scripts.
- **Privacy statement:**
  > *"Images are processed locally in your browser. Kickstand does not upload your images."*
- *Transparency note:* opening the site downloads static assets (HTML, CSS, JS) from Vercel hosting — that is separate from your images, which never leave the browser.

---

## Tech Stack

Kickstand is built with a lean modern web stack — no framework, no backend, no runtime dependencies:

| Component | Technology | Purpose |
|---|---|---|
| **Markup** | HTML5 Semantic | Accessible, structured page skeleton |
| **Styling** | Pure CSS3 (Custom Properties) | Design tokens, `.kickstand-*` components, responsive layout |
| **App Logic** | Vanilla JavaScript (ES Modules) | Input handling, image state, PiP lifecycle |
| **Build Tooling** | Vite 6 | Dev server and optimized static production build |
| **Image Input** | Clipboard Event API, File API, Drag & Drop API | Paste, picker, and dropzone inputs |
| **Image Rendering** | Blob API & Object URLs | Local preview and PiP display without uploads |
| **Floating Window** | Document Picture-in-Picture API | Native always-on-top window |
| **Public Hosting** | Vercel | Static hosting for the production build |

---

## Run Locally

### Prerequisites
- Node.js 18+ and npm
- A desktop browser with Document PiP support for the Pop Out feature (Chrome/Edge 116+ recommended)

### 1. Clone Repository
```bash
git clone https://github.com/nyomann-arch/Kickstand.git
cd Kickstand
```

### 2. Install Dependencies
```bash
npm ci
```

### 3. Run Development Server
```bash
npm run dev
```

Open http://localhost:5173 in your browser.

### 4. Production Build (optional)
```bash
npm run build
npm run preview
```

`npm run preview` serves the production build at http://localhost:4173.

> **Developer note:** this is a Vite project — dependencies are installed via npm and the production output is a static `dist/` folder that can be hosted anywhere.

---

## Repository Structure

```text
Kickstand/
├── docs/
│   ├── 01-agent-rules.md          # Agent rules, security, technical boundaries
│   ├── 02-prd-kickstand.md        # Product Requirements Document (PRD)
│   ├── 03-design-systems.md       # Visual identity, design tokens, components
│   └── 04-verification-checklist.md # Milestone 5 verification checklist
├── public/
│   ├── favicon.svg                # Site icon
│   ├── robots.txt                 # Crawler rules + sitemap reference
│   ├── sitemap.xml                # Single-page sitemap
│   └── google*.html               # Search Console verification file
├── src/
│   ├── main.js                    # Input, image lifecycle, Document PiP logic
│   └── styles.css                 # Design tokens + .kickstand-* components
├── index.html                     # Markup + SEO/OG/JSON-LD meta
├── dist/                          # Tracked production build output
├── LICENSE                        # MIT open-source license
├── README.md                      # English documentation
└── README.id.md                   # Indonesian documentation
```

CSS for the PiP document is injected as a `PIP_CSS` string inside `src/main.js`, because the PiP window is a separate document that does not inherit the main page's stylesheet.

---

## Deployment

Kickstand deploys instantly to any static hosting platform — the production build is a plain `dist/` folder:

- **Live Demo (Vercel):** [https://kickstand-mu.vercel.app/](https://kickstand-mu.vercel.app/) — auto-deploys from `main`; Vercel runs `npm run build` and serves `dist/`.
- **GitHub Pages:** publish the `dist/` folder (or set the build output accordingly); set Vite `base` if using a project site URL.
- **Netlify / other static hosts:** connect the repo, set build command `npm run build`, publish directory `dist`.

Files in `public/` (`robots.txt`, `sitemap.xml`, favicon, Search Console verification) are copied verbatim into `dist/` on every build.

---

## Contributing & Feedback

Bug fixes, test scenarios, accessibility improvements, and documentation polish are welcome!

1. Report issues or discuss feature ideas via [GitHub Issues](https://github.com/nyomann-arch/Kickstand/issues).
2. Submit code or documentation fixes via [Pull Request](https://github.com/nyomann-arch/Kickstand/pulls).

Please note the project scope defined in [`docs/02-prd-kickstand.md`](docs/02-prd-kickstand.md) — Kickstand is intentionally a single-image floating reference tool, not a reference board, clipboard manager, or asset library.

---

## License

This project is licensed under the [MIT License](LICENSE) © 2026 nyomann-arch.
