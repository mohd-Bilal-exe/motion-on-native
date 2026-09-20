import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, Copy, Calendar, Clock, RefreshCw } from 'lucide-react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { androidstudio } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { Footer } from '../../../components/Footer';
import { useMeta } from '../../../hooks/useMeta';

export default function MigratingToMotionOnNative() {
  const navigate = useNavigate();

  useMeta({
    title: 'Migrating from Raw Reanimated & Moti to Motion on Native',
    description:
      'Cut 70% of animation boilerplate from your React Native codebase. A step-by-step guide with before/after diffs for basic transitions, spring physics, and unmount exit handling.',
    canonical: 'https://motion-on-native.vercel.app/blog/migrating-to-motion-on-native',
  });

  const reanimatedBeforeCode = `// ❌ BEFORE: Raw Reanimated 3 (Heavy Boilerplate)
import React, { useEffect } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

export function ExpandableBox({ isExpanded }) {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(0.8);

  useEffect(() => {
    scale.value = withSpring(isExpanded ? 1.2 : 1, { damping: 12, stiffness: 90 });
    opacity.value = withSpring(isExpanded ? 1 : 0.8);
  }, [isExpanded]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  return <Animated.View style={[{ width: 100, height: 100, backgroundColor: 'blue' }, animatedStyle]} />;
}`;

  const motionAfterCode = `// ✅ AFTER: Motion on Native (Clean Declarative Props)
import React from 'react';
import { NativeMotion } from 'motion-on-native';

export function ExpandableBox({ isExpanded }) {
  return (
    <NativeMotion.View
      animate={{
        scale: isExpanded ? 1.2 : 1,
        opacity: isExpanded ? 1 : 0.8,
      }}
      transition={{ type: 'spring', damping: 12, stiffness: 90 }}
      style={{ width: 100, height: 100, backgroundColor: 'blue' }}
    />
  );
}`;

  const motiBeforeCode = `// Migrating from Moti
import { View } from 'moti';

<View
  from={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: 1, scale: 1 }}
  exit={{ opacity: 0, scale: 0.9 }}
  transition={{ type: 'spring', damping: 15 }}
/>`;

  const motionEquivalentCode = `// Motion on Native Equivalent (Framer Motion API)
import { NativeMotion, AnimatedExit } from 'motion-on-native';

<AnimatedExit>
  {isVisible && (
    <NativeMotion.View
      key="unique-key"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ type: 'spring', damping: 15 }}
    />
  )}
</AnimatedExit>`;

  return (
    <div className="flex flex-col items-center w-full min-h-screen text-white-50 selection:bg-indigo-500/30 space-grotesk">
      <article className="relative flex flex-col gap-12 mx-auto px-6 py-16 md:py-24 max-w-4xl w-full">
        {/* Back navigation */}
        <button
          onClick={() => navigate('/blog')}
          className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors cursor-pointer w-fit text-sm"
        >
          <ArrowLeft className="size-4" />
          <span>Back to Blog</span>
        </button>

        {/* Title Header */}
        <header className="flex flex-col gap-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="bg-indigo-500/20 px-3 py-1 rounded-full text-indigo-300 font-mono text-xs font-semibold border border-indigo-500/30">
              Migration Guide
            </span>
            <div className="flex items-center gap-1.5 text-neutral-400 text-xs">
              <Calendar className="size-3.5" />
              <span>September 20, 2026</span>
            </div>
            <div className="flex items-center gap-1.5 text-neutral-400 text-xs ml-2">
              <Clock className="size-3.5" />
              <span>6 min read</span>
            </div>
          </div>

          <h1 className="bg-clip-text bg-linear-to-r from-white via-white-100 to-neutral-400 font-bold text-transparent text-4xl md:text-5xl lg:text-6xl tracking-tight leading-tight">
            Migrating from Raw Reanimated & Moti to Motion on Native
          </h1>

          <p className="text-neutral-400 text-lg md:text-xl leading-relaxed">
            Tired of cluttering your React Native components with endless <code className="text-indigo-300">useSharedValue</code> and <code className="text-indigo-300">useAnimatedStyle</code> calls?
            Here is a step-by-step guide to migrate your animations to clean, declarative JSX while preserving 100% UI-thread performance.
          </p>
        </header>

        <hr className="border-white/10" />

        {/* Section 1: Overview */}
        <section className="flex flex-col gap-5 text-neutral-300 text-base md:text-lg leading-relaxed">
          <h2 className="font-bold text-white text-2xl md:text-3xl tracking-tight">
            1. Why Migrate?
          </h2>
          <p>
            When teams scale React Native applications, animations often become the first point of maintenance friction.
            Raw Reanimated code requires defining shared values, managing effects, and converting transform tuples manually.
          </p>
          <div className="gap-4 grid grid-cols-1 md:grid-cols-3">
            <div className="flex flex-col gap-2 bg-[#0d0d0d] p-5 border border-neutral-800 rounded-xl">
              <span className="text-emerald-400 font-mono text-xs font-bold uppercase">70% Less Code</span>
              <p className="text-neutral-400 text-sm">Eliminate boilerplate hooks and style wrappers completely.</p>
            </div>
            <div className="flex flex-col gap-2 bg-[#0d0d0d] p-5 border border-neutral-800 rounded-xl">
              <span className="text-indigo-400 font-mono text-xs font-bold uppercase">Web Parity</span>
              <p className="text-neutral-400 text-sm">Write the exact same motion syntax you use with Framer Motion on web.</p>
            </div>
            <div className="flex flex-col gap-2 bg-[#0d0d0d] p-5 border border-neutral-800 rounded-xl">
              <span className="text-yellow-400 font-mono text-xs font-bold uppercase">Zero Perf Loss</span>
              <p className="text-neutral-400 text-sm">Built on top of Reanimated worklets; animations never block the JS thread.</p>
            </div>
          </div>
        </section>

        {/* Section 2: Reanimated Migration */}
        <section className="flex flex-col gap-5">
          <h2 className="font-bold text-white text-2xl md:text-3xl tracking-tight">
            2. Migrating from Raw Reanimated 3
          </h2>
          <p className="text-neutral-300 text-base md:text-lg">
            Compare the before and after for an expandable box:
          </p>

          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-red-400 text-lg">Before: Raw Reanimated 3</h3>
            <CodeWindow title="ExpandableBox.reanimated.tsx" code={reanimatedBeforeCode} />

            <h3 className="font-semibold text-emerald-400 text-lg mt-4">After: Motion on Native</h3>
            <CodeWindow title="ExpandableBox.motion.tsx" code={motionAfterCode} />
          </div>
        </section>

        {/* Section 3: Transition Property Mapping */}
        <section className="flex flex-col gap-5 text-neutral-300 text-base md:text-lg leading-relaxed">
          <h2 className="font-bold text-white text-2xl md:text-3xl tracking-tight">
            3. Mapping Transition Properties
          </h2>
          <p>
            Instead of manually calling <code className="text-white">withSpring(val, config)</code> or <code className="text-white">withTiming(val, config)</code>,
            pass a single declarative <code className="text-indigo-300">transition</code> object:
          </p>

          <div className="border border-neutral-800 rounded-2xl overflow-hidden shadow-xl text-sm">
            <table className="w-full text-left">
              <thead className="bg-white/5 font-mono text-neutral-400 text-xs uppercase">
                <tr>
                  <th className="px-6 py-4">Reanimated Call</th>
                  <th className="px-6 py-4 text-indigo-400">Motion on Native Prop</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800 text-neutral-300">
                <tr className="hover:bg-white/[0.02]">
                  <td className="px-6 py-4 font-mono text-neutral-400">withSpring(v, {`{ damping: 15, stiffness: 100 }`})</td>
                  <td className="px-6 py-4 font-mono text-emerald-400">transition={`{ { type: 'spring', damping: 15, stiffness: 100 } }`}</td>
                </tr>
                <tr className="hover:bg-white/[0.02]">
                  <td className="px-6 py-4 font-mono text-neutral-400">withTiming(v, {`{ duration: 400, easing: Easing.ease }`})</td>
                  <td className="px-6 py-4 font-mono text-emerald-400">transition={`{ { type: 'timing', duration: 400, ease: 'ease' } }`}</td>
                </tr>
                <tr className="hover:bg-white/[0.02]">
                  <td className="px-6 py-4 font-mono text-neutral-400">withDelay(200, withSpring(v))</td>
                  <td className="px-6 py-4 font-mono text-emerald-400">transition={`{ { type: 'spring', delay: 200 } }`}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 4: Moti Migration */}
        <section className="flex flex-col gap-5">
          <h2 className="font-bold text-white text-2xl md:text-3xl tracking-tight">
            4. Migrating from Moti
          </h2>
          <p className="text-neutral-300 text-base md:text-lg">
            If your codebase uses Moti, switching is painless. Motion on Native uses standard Framer Motion naming conventions (<code className="text-indigo-300">initial</code> instead of <code className="text-neutral-400">from</code>):
          </p>

          <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold text-neutral-400 text-sm uppercase font-mono">Moti</h3>
              <CodeWindow title="MotiComponent.tsx" code={motiBeforeCode} />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold text-indigo-400 text-sm uppercase font-mono">Motion on Native</h3>
              <CodeWindow title="MotionComponent.tsx" code={motionEquivalentCode} />
            </div>
          </div>
        </section>

        {/* Section 5: Unmounting / Exit presence */}
        <section className="flex flex-col gap-5 text-neutral-300 text-base md:text-lg leading-relaxed">
          <h2 className="font-bold text-white text-2xl md:text-3xl tracking-tight">
            5. Handling Unmounting with AnimatedExit
          </h2>
          <p>
            When migrating exit animations, wrap your conditional components in <code className="text-indigo-300">&lt;AnimatedExit&gt;</code> and supply an <code className="text-indigo-300">exit</code> prop:
          </p>
          <div className="bg-[#0d0d0d] p-4 border border-neutral-800 rounded-xl font-mono text-indigo-300 text-sm">
            {`<AnimatedExit mode="sync">\n  {show && (\n    <NativeMotion.View\n      key="card"\n      initial={{ opacity: 0, scale: 0.8 }}\n      animate={{ opacity: 1, scale: 1 }}\n      exit={{ opacity: 0, scale: 0.8 }}\n    />\n  )}\n</AnimatedExit>`}
          </div>
        </section>

        {/* CTA */}
        <section className="flex flex-col items-center gap-6 bg-gradient-to-r from-indigo-900/30 via-indigo-600/20 to-purple-900/30 p-8 md:p-12 border border-indigo-500/30 rounded-3xl text-center shadow-2xl">
          <RefreshCw className="size-8 text-indigo-400" />
          <h2 className="font-bold text-white text-3xl md:text-4xl tracking-tight">
            Ready to upgrade your codebase?
          </h2>
          <p className="max-w-xl text-neutral-300 text-base md:text-lg">
            Start by wrapping your first component with <code className="text-white font-mono font-bold">NativeMotion.View</code>.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => navigate('/docs/get-started/quick-start')}
              className="bg-white hover:bg-neutral-200 px-6 py-3 rounded-full text-black-900 font-semibold text-sm transition-all cursor-pointer shadow-lg"
            >
              Get Started with Motion on Native
            </button>
            <button
              onClick={() => navigate('/docs/core/native-motion')}
              className="bg-white/10 hover:bg-white/20 px-6 py-3 rounded-full text-white font-semibold text-sm transition-all cursor-pointer border border-white/15"
            >
              Component Reference
            </button>
          </div>
        </section>
      </article>
      <Footer />
    </div>
  );
}

function CodeWindow({ title, code }: { title: string; code: string }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative flex flex-col bg-[#0d0d0d] shadow-2xl border border-neutral-800 rounded-2xl overflow-hidden">
      <div className="flex justify-between items-center bg-white/5 px-4 py-3 border-b border-white/5">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full" />
            <div className="w-3 h-3 bg-yellow-500 rounded-full" />
            <div className="w-3 h-3 bg-green-500 rounded-full" />
          </div>
          <span className="font-mono text-neutral-500 text-sm">{title}</span>
        </div>
        <button onClick={copy} className="text-neutral-500 hover:text-white transition-colors cursor-pointer">
          {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
      <div className="p-2 overflow-x-auto">
        <pre className="font-mono text-indigo-300/90 text-sm leading-relaxed">
          <SyntaxHighlighter
            language="tsx"
            style={androidstudio}
            customStyle={{
              background: 'rgba(0, 0, 0, 0)',
              padding: '20px',
              fontSize: '14px',
              lineHeight: '1.6',
              margin: 0,
            }}
            showLineNumbers={false}
            wrapLines={true}
          >
            {code}
          </SyntaxHighlighter>
        </pre>
      </div>
    </div>
  );
}
