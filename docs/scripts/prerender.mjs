import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');
const templatePath = path.join(distDir, 'index.html');

if (!fs.existsSync(templatePath)) {
  console.error('[prerender] Error: dist/index.html not found. Run vite build first.');
  process.exit(1);
}

const baseTemplate = fs.readFileSync(templatePath, 'utf-8');

const routes = [
  {
    path: '/',
    title: 'Motion on Native | Declarative Framer Motion API for React Native & Reanimated',
    description:
      'Declarative, production-ready animation library for React Native built on Reanimated. Brings Framer Motion’s AnimatePresence, exit animations, gestures, and UI-thread spring physics to iOS and Android.',
    keywords: 'react native animation, framer motion react native, animatepresence react native, react native exit animation, reanimated spring',
    type: 'website',
    noscriptHtml: `
      <h1>Motion on Native</h1>
      <p>Framer Motion–inspired animation library for React Native with Reanimated. Easy spring animations, gestures, and transitions for mobile apps.</p>
      <h2>Features</h2>
      <ul>
        <li>Declarative initial, animate, exit, and transition props</li>
        <li>AnimatedExit (direct port of Framer Motion AnimatePresence)</li>
        <li>Zero boilerplate shared values — runs 100% on Reanimated UI-thread</li>
      </ul>
    `,
  },
  {
    path: '/blog',
    title: 'Blog & Deep Dives | Motion on Native',
    description:
      'Engineering breakdowns, animation architecture, and declarative UI patterns for React Native and Reanimated.',
    keywords: 'react native animation blog, framer motion react native guide, reanimated exit animations',
    type: 'website',
    noscriptHtml: `
      <h1>Motion on Native Blog</h1>
      <p>Articles and deep dives on React Native animations, Reanimated performance, and Framer Motion patterns.</p>
      <ul>
        <li><a href="/blog/why-i-built-motion-on-native">Why I Built Motion on Native: Bringing Framer Motion Joy to Mobile</a></li>
        <li><a href="/blog/exit-animations-react-native-framer-motion">Exit Animations in React Native: How to Build Framer Motion's AnimatePresence with Reanimated</a></li>
        <li><a href="/blog/migrating-to-motion-on-native">Migrating from Raw Reanimated & Moti to Motion on Native</a></li>
      </ul>
    `,
  },
  {
    path: '/blog/why-i-built-motion-on-native',
    title: 'Why I Built Motion on Native: Bringing Framer Motion Joy to Mobile | Motion on Native',
    description:
      'The developer journey of moving from Web to React Native, hitting the painful wall of Reanimated boilerplate, the "Shared Value Factory" breakthrough, and reaching 50+ weekly downloads.',
    keywords: 'why i built motion on native, framer motion react native story, reanimated boilerplate reduction, react native developer experience',
    type: 'article',
    datePublished: '2026-09-20',
    author: 'Mohammad Bilal',
    noscriptHtml: `
      <article>
        <h1>Why I Built Motion on Native: Bringing Framer Motion Joy to Mobile</h1>
        <p>By Mohammad Bilal • September 20, 2026</p>
        <p>If you've ever built a React web application with Framer Motion, you know that magical feeling. Adding fluid animations takes seconds. But when transitioning to React Native, developers drown in dozens of lines of shared values, effects, and transform arrays for basic fades and scales.</p>
        <h2>The Shared Value Factory</h2>
        <p>Motion on Native solves this by wrapping Reanimated components with a Shared Value Factory that maps declarative props to UI-thread worklets automatically without JS bridge lag.</p>
      </article>
    `,
  },
  {
    path: '/blog/exit-animations-react-native-framer-motion',
    title: "Exit Animations in React Native: How to Build Framer Motion's AnimatePresence with Reanimated | Motion on Native",
    description:
      'Why exit animations are notoriously hard in React Native, how AnimatedExit halts component unmounting until Reanimated UI-thread springs complete, and a breakdown against Moti and raw Reanimated.',
    keywords: 'exit animations react native, animatepresence react native, framer motion react native, react native unmount animation, reanimated layout animation',
    type: 'article',
    datePublished: '2026-09-20',
    author: 'Mohammad Bilal',
    noscriptHtml: `
      <article>
        <h1>Exit Animations in React Native: How to Build Framer Motion's AnimatePresence with Reanimated</h1>
        <p>By Mohammad Bilal • September 20, 2026</p>
        <h2>Why Exit Animations Are Hard</h2>
        <p>React conditional rendering unmounts views immediately when state turns false. Without an unmount interceptor, native views disappear before exit transitions can run.</p>
        <h2>AnimatedExit & usePresence</h2>
        <p>AnimatedExit ports Framer Motion's AnimatePresence algorithm to Reanimated, keeping children alive in the tree until safeToRemove() is called upon animation completion.</p>
      </article>
    `,
  },
  {
    path: '/blog/migrating-to-motion-on-native',
    title: 'Migrating from Raw Reanimated & Moti to Motion on Native | Motion on Native',
    description:
      'Cut 70% of animation boilerplate from your React Native codebase. A step-by-step guide with before/after diffs for basic transitions, spring physics, and unmount exit handling.',
    keywords: 'migrate reanimated to motion on native, moti to motion on native, reduce reanimated boilerplate, react native animation refactoring',
    type: 'article',
    datePublished: '2026-09-20',
    author: 'Mohammad Bilal',
    noscriptHtml: `
      <article>
        <h1>Migrating from Raw Reanimated & Moti to Motion on Native</h1>
        <p>By Mohammad Bilal • September 20, 2026</p>
        <h2>Eliminating Shared Value Boilerplate</h2>
        <p>Replace manual useSharedValue, useAnimatedStyle, withSpring, and useEffect with simple declarative initial, animate, and transition props.</p>
      </article>
    `,
  },
  {
    path: '/docs',
    title: 'Documentation Overview | Motion on Native',
    description:
      'Learn the core concepts, mental model, and architecture of Motion on Native. Declarative animations on React Native and Reanimated.',
    keywords: 'motion on native docs, react native animation documentation, reanimated guide',
    type: 'website',
    noscriptHtml: `
      <h1>Motion on Native Documentation</h1>
      <p>A declarative animation library for React Native built on Reanimated.</p>
      <ul>
        <li><a href="/docs/get-started/installation">Installation</a></li>
        <li><a href="/docs/get-started/quick-start">Quick Start</a></li>
        <li><a href="/docs/core/native-motion">Core Components</a></li>
        <li><a href="/docs/core/animated-exit">AnimatedExit (Exit Animations)</a></li>
        <li><a href="/docs/core/types">TypeScript Reference</a></li>
      </ul>
    `,
  },
  {
    path: '/docs/core/animated-exit',
    title: 'AnimatedExit (Exit Animations) API Reference | Motion on Native',
    description:
      "Direct port of Framer Motion's AnimatePresence for React Native. Keep components alive during Reanimated UI-thread exit transitions with mode='sync' or mode='wait'.",
    keywords: 'animatedexit react native, animatepresence react native api, usepresence hook, useispresent hook',
    type: 'website',
    noscriptHtml: `
      <h1>AnimatedExit API Reference</h1>
      <p>Direct port of Framer Motion's AnimatePresence. Animate components when unmounted from the React tree.</p>
      <h2>Props</h2>
      <ul>
        <li><code>mode</code>: 'sync' | 'wait' | 'popLayout'</li>
        <li><code>onExitComplete</code>: Callback when all exiting components finish</li>
        <li><code>propagate</code>: Nested presence coordination</li>
      </ul>
    `,
  },
];

console.log('[prerender] Generating static HTML for', routes.length, 'routes...');

function escapeAttr(str) {
  if (!str) return '';
  return str.replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

for (const route of routes) {
  let html = baseTemplate;
  const canonicalUrl = `https://motion-on-native.vercel.app${route.path === '/' ? '' : route.path}`;
  const safeTitle = escapeAttr(route.title);
  const safeDesc = escapeAttr(route.description);
  const safeKeywords = escapeAttr(route.keywords);

  // Replace Title
  html = html.replace(/<title>.*?<\/title>/i, `<title>${route.title}</title>`);
  html = html.replace(/<meta name="title" content=".*?" \/>/i, `<meta name="title" content="${safeTitle}" />`);

  // Replace Description & Keywords
  html = html.replace(/<meta\s+name="description"\s+content=".*?"\s*\/>/is, `<meta name="description" content="${safeDesc}" />`);
  html = html.replace(/<meta\s+name="keywords"\s+content=".*?"\s*\/>/is, `<meta name="keywords" content="${safeKeywords}" />`);

  // Replace Canonical
  html = html.replace(/<link rel="canonical" href=".*?" \/>/i, `<link rel="canonical" href="${canonicalUrl}" />`);

  // Replace OpenGraph & Twitter
  html = html.replace(/<meta property="og:type" content=".*?" \/>/i, `<meta property="og:type" content="${route.type}" />`);
  html = html.replace(/<meta property="og:url" content=".*?" \/>/i, `<meta property="og:url" content="${canonicalUrl}" />`);
  html = html.replace(/<meta\s+property="og:title"\s+content=".*?"\s*\/>/is, `<meta property="og:title" content="${safeTitle}" />`);
  html = html.replace(/<meta\s+property="og:description"\s+content=".*?"\s*\/>/is, `<meta property="og:description" content="${safeDesc}" />`);

  html = html.replace(/<meta property="twitter:url" content=".*?" \/>/i, `<meta property="twitter:url" content="${canonicalUrl}" />`);
  html = html.replace(/<meta\s+property="twitter:title"\s+content=".*?"\s*\/>/is, `<meta property="twitter:title" content="${safeTitle}" />`);
  html = html.replace(/<meta\s+property="twitter:description"\s+content=".*?"\s*\/>/is, `<meta property="twitter:description" content="${safeDesc}" />`);

  // For articles, add Article JSON-LD Schema
  if (route.type === 'article') {
    const articleSchema = `
    <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": "${route.title}",
        "description": "${route.description}",
        "datePublished": "${route.datePublished}",
        "author": {
          "@type": "Person",
          "name": "${route.author}",
          "url": "https://github.com/mohd-Bilal-exe"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Motion on Native",
          "url": "https://motion-on-native.vercel.app"
        },
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": "${canonicalUrl}"
        }
      }
    </script>
    `;
    html = html.replace('</head>', `${articleSchema}\n</head>`);
  }

  // Remove any pre-existing noscript tags to prevent duplicates on rerun
  html = html.replace(/<noscript>[\s\S]*?<\/noscript>/gi, '');

  // Inject semantic noscript block for non-JS crawlers
  const noscriptTag = `\n    <noscript>\n      <div style="padding: 24px; font-family: sans-serif; max-width: 800px; margin: 0 auto; line-height: 1.6;">\n${route.noscriptHtml}\n      </div>\n    </noscript>\n`;
  html = html.replace('<div id="root"></div>', `<div id="root"></div>${noscriptTag}`);

  // Determine output path
  let targetFile;
  if (route.path === '/') {
    targetFile = templatePath;
  } else {
    const routeFolder = path.join(distDir, route.path.replace(/^\//, ''));
    if (!fs.existsSync(routeFolder)) {
      fs.mkdirSync(routeFolder, { recursive: true });
    }
    targetFile = path.join(routeFolder, 'index.html');
  }

  fs.writeFileSync(targetFile, html, 'utf-8');
  console.log(`[prerender] ✓ Written ${path.relative(distDir, targetFile)}`);
}

console.log('[prerender] Static route generation complete! 100% crawlable & indexable.');
