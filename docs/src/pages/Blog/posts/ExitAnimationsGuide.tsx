import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, Copy, Calendar, Clock, Sparkles, AlertCircle } from 'lucide-react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { androidstudio } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { Footer } from '../../../components/Footer';
import { useMeta } from '../../../hooks/useMeta';

export default function ExitAnimationsGuide() {
  const navigate = useNavigate();

  useMeta({
    title: "Exit Animations in React Native: How to Build Framer Motion's AnimatePresence with Reanimated",
    description:
      'Why exit animations are notoriously hard in React Native, how AnimatedExit halts component unmounting until Reanimated UI-thread springs complete, and a breakdown against Moti and raw Reanimated.',
    canonical: 'https://motion-on-native.vercel.app/blog/exit-animations-react-native-framer-motion',
  });

  const codeToastExample = `import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { NativeMotion, AnimatedExit } from 'motion-on-native';

export function ToastManager() {
  const [toast, setToast] = useState<{ id: string; text: string } | null>(null);

  const showToast = () => setToast({ id: 'toast-1', text: 'Settings updated successfully!' });
  const dismissToast = () => setToast(null);

  return (
    <View style={styles.container}>
      <Pressable onPress={showToast} style={styles.button}>
        <Text style={styles.btnText}>Trigger Toast</Text>
      </Pressable>

      {/* AnimatedExit catches unmounting components */}
      <AnimatedExit>
        {toast && (
          <NativeMotion.View
            key={toast.id} // Essential for tracking lifecycle
            initial={{ opacity: 0, translateY: -40, scale: 0.9 }}
            animate={{ opacity: 1, translateY: 0, scale: 1 }}
            exit={{ opacity: 0, translateY: -40, scale: 0.85 }}
            transition={{ type: 'spring', damping: 16, stiffness: 140 }}
            style={styles.toast}
          >
            <Text style={styles.toastText}>{toast.text}</Text>
            <Pressable onPress={dismissToast}>
              <Text style={styles.dismissText}>✕</Text>
            </Pressable>
          </NativeMotion.View>
        )}
      </AnimatedExit>
    </View>
  );
}`;

  const codeModalExample = `import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { NativeMotion, AnimatedExit } from 'motion-on-native';

export function AnimatedConfirmDialog() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View style={styles.container}>
      <Pressable onPress={() => setIsOpen(true)} style={styles.openBtn}>
        <Text style={styles.btnText}>Delete Project</Text>
      </Pressable>

      <AnimatedExit>
        {isOpen && (
          <View style={StyleSheet.absoluteFillObject} pointerEvents="box-none">
            {/* Backdrop Fade */}
            <NativeMotion.View
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 200 }}
              style={styles.backdrop}
            />

            {/* Modal Dialog Spring */}
            <NativeMotion.View
              key="dialog"
              initial={{ opacity: 0, scale: 0.8, translateY: 40 }}
              animate={{ opacity: 1, scale: 1, translateY: 0 }}
              exit={{ opacity: 0, scale: 0.85, translateY: 30 }}
              transition={{ type: 'spring', damping: 18, stiffness: 120 }}
              style={styles.dialogCard}
            >
              <Text style={styles.dialogTitle}>Are you sure?</Text>
              <Text style={styles.dialogBody}>
                This action is permanent and cannot be undone.
              </Text>
              <Pressable onPress={() => setIsOpen(false)} style={styles.closeBtn}>
                <Text style={styles.closeBtnText}>Cancel</Text>
              </Pressable>
            </NativeMotion.View>
          </View>
        )}
      </AnimatedExit>
    </View>
  );
}`;

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
              React Native Guide
            </span>
            <div className="flex items-center gap-1.5 text-neutral-400 text-xs">
              <Calendar className="size-3.5" />
              <span>September 20, 2026</span>
            </div>
            <div className="flex items-center gap-1.5 text-neutral-400 text-xs ml-2">
              <Clock className="size-3.5" />
              <span>8 min read</span>
            </div>
          </div>

          <h1 className="bg-clip-text bg-linear-to-r from-white via-white-100 to-neutral-400 font-bold text-transparent text-4xl md:text-5xl lg:text-6xl tracking-tight leading-tight">
            Exit Animations in React Native: How to Build Framer Motion's AnimatePresence with Reanimated
          </h1>

          <p className="text-neutral-400 text-lg md:text-xl leading-relaxed">
            Every web developer loves Framer Motion's <code className="text-indigo-300">&lt;AnimatePresence&gt;</code>.
            Here is why unmounting animations have traditionally been painful in React Native, and how{' '}
            <code className="text-indigo-300">motion-on-native</code> brings that exact declarative API to native mobile apps.
          </p>
        </header>

        <hr className="border-white/10" />

        {/* Section 1: The Core Problem */}
        <section className="flex flex-col gap-5 text-neutral-300 text-base md:text-lg leading-relaxed">
          <h2 className="font-bold text-white text-2xl md:text-3xl tracking-tight">
            1. Why Exit Animations Are Difficult in React Native
          </h2>
          <p>
            In React, conditional rendering works via immediate removal:
          </p>
          <div className="bg-[#0d0d0d] p-4 border border-neutral-800 rounded-xl font-mono text-indigo-300 text-sm">
            {`{isVisible && <Banner />}`}
          </div>
          <p>
            When <code className="text-white">isVisible</code> becomes <code className="text-white">false</code>, React instantly unmounts
            the component from the tree. In native development, the underlying iOS <code className="text-white">UIView</code> or Android <code className="text-white">ViewGroup</code> is
            destroyed in the same tick.
          </p>
          <p>
            If you try to animate <code className="text-white">opacity: 0</code> on exit, there is literally no element left on the screen to animate.
            The view blinks out of existence instantly.
          </p>

          <div className="flex items-start gap-4 bg-red-500/10 p-5 border border-red-500/20 rounded-xl text-red-200 text-sm">
            <AlertCircle className="shrink-0 mt-0.5 size-5" />
            <div>
              <strong>The Old Workaround:</strong> Developers were forced to keep a manual second state variable (e.g. <code className="text-white">isRendering</code>),
              start an imperative animation in <code className="text-white">useEffect</code>, listen for the animation finish callback, and then finally toggle <code className="text-white">isRendering = false</code>.
              This created 30+ lines of messy boilerplate for every single modal, toast, or list item.
            </div>
          </div>
        </section>

        {/* Section 2: How AnimatedExit Solves It */}
        <section className="flex flex-col gap-5 text-neutral-300 text-base md:text-lg leading-relaxed">
          <h2 className="font-bold text-white text-2xl md:text-3xl tracking-tight">
            2. The Architecture: How AnimatedExit Works
          </h2>
          <p>
            On the web, Framer Motion solved this problem with <code className="text-indigo-300">&lt;AnimatePresence&gt;</code>.
            In <code className="text-white">motion-on-native</code>, we ported this architecture directly for React Native with <code className="text-indigo-300">&lt;AnimatedExit&gt;</code>.
          </p>

          <div className="gap-4 grid grid-cols-1 md:grid-cols-3">
            <div className="flex flex-col gap-2 bg-[#0d0d0d] p-5 border border-neutral-800 rounded-xl">
              <span className="font-mono text-indigo-400 text-xs uppercase font-bold">Step 1</span>
              <h3 className="font-semibold text-white text-base">Key Tracking</h3>
              <p className="text-neutral-400 text-sm">
                AnimatedExit remembers child keys across renders. When a key disappears, it intercepts unmounting.
              </p>
            </div>
            <div className="flex flex-col gap-2 bg-[#0d0d0d] p-5 border border-neutral-800 rounded-xl">
              <span className="font-mono text-indigo-400 text-xs uppercase font-bold">Step 2</span>
              <h3 className="font-semibold text-white text-base">UI-Thread Exit</h3>
              <p className="text-neutral-400 text-sm">
                The child is notified via PresenceContext and executes its <code className="text-white">exit</code> prop spring physics on Reanimated.
              </p>
            </div>
            <div className="flex flex-col gap-2 bg-[#0d0d0d] p-5 border border-neutral-800 rounded-xl">
              <span className="font-mono text-indigo-400 text-xs uppercase font-bold">Step 3</span>
              <h3 className="font-semibold text-white text-base">Safe Unmount</h3>
              <p className="text-neutral-400 text-sm">
                Once the exit animation finishes, the component triggers <code className="text-white">safeToRemove()</code> and cleanly leaves the DOM/Native tree.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Recipe 1 Toast */}
        <section className="flex flex-col gap-5">
          <h2 className="font-bold text-white text-2xl md:text-3xl tracking-tight">
            3. Recipe: Smooth Toast & Notification Dismissals
          </h2>
          <p className="text-neutral-300 text-base md:text-lg">
            Here is a complete, production-ready toast notification that animates down into place, and glides back up on exit:
          </p>
          <CodeWindow title="ToastManager.tsx" code={codeToastExample} />
        </section>

        {/* Section 4: Recipe 2 Modal */}
        <section className="flex flex-col gap-5">
          <h2 className="font-bold text-white text-2xl md:text-3xl tracking-tight">
            4. Recipe: Modal Backdrop & Dialog Transitions
          </h2>
          <p className="text-neutral-300 text-base md:text-lg">
            Notice how multiple components inside <code className="text-indigo-300">&lt;AnimatedExit&gt;</code> can have different exit behaviors simultaneously (e.g. backdrop fades out while dialog scales down):
          </p>
          <CodeWindow title="AnimatedConfirmDialog.tsx" code={codeModalExample} />
        </section>

        {/* Section 5: Comparison Table */}
        <section className="flex flex-col gap-6">
          <h2 className="font-bold text-white text-2xl md:text-3xl tracking-tight">
            5. Library Comparison: Which should you choose?
          </h2>
          <div className="border border-neutral-800 rounded-2xl overflow-hidden shadow-xl">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/5 font-mono text-neutral-400 text-xs uppercase">
                <tr>
                  <th className="px-6 py-4">Feature</th>
                  <th className="px-6 py-4">Raw Reanimated 3</th>
                  <th className="px-6 py-4">Moti</th>
                  <th className="px-6 py-4 text-indigo-400">Motion on Native</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800 text-neutral-300">
                <tr className="hover:bg-white/[0.02]">
                  <td className="px-6 py-4 font-semibold text-white">Declarative Props (initial, animate, exit)</td>
                  <td className="px-6 py-4 text-neutral-500">❌ (Imperative hooks)</td>
                  <td className="px-6 py-4 text-emerald-400">✅ Yes</td>
                  <td className="px-6 py-4 text-emerald-400 font-bold">✅ Yes</td>
                </tr>
                <tr className="hover:bg-white/[0.02]">
                  <td className="px-6 py-4 font-semibold text-white">Framer Motion AnimatePresence Port</td>
                  <td className="px-6 py-4 text-neutral-500">❌ No</td>
                  <td className="px-6 py-4 text-neutral-400">AnimatePresence wrapper</td>
                  <td className="px-6 py-4 text-emerald-400 font-bold">✅ Full AnimatedExit + usePresence</td>
                </tr>
                <tr className="hover:bg-white/[0.02]">
                  <td className="px-6 py-4 font-semibold text-white">Transition Modes (mode="sync" | "wait")</td>
                  <td className="px-6 py-4 text-neutral-500">❌ Manual code</td>
                  <td className="px-6 py-4 text-neutral-400">Partial</td>
                  <td className="px-6 py-4 text-emerald-400 font-bold">✅ Native support</td>
                </tr>
                <tr className="hover:bg-white/[0.02]">
                  <td className="px-6 py-4 font-semibold text-white">UI Thread Performance</td>
                  <td className="px-6 py-4 text-emerald-400">✅ 120 FPS</td>
                  <td className="px-6 py-4 text-emerald-400">✅ 120 FPS</td>
                  <td className="px-6 py-4 text-emerald-400 font-bold">✅ 120 FPS (Reanimated)</td>
                </tr>
                <tr className="hover:bg-white/[0.02]">
                  <td className="px-6 py-4 font-semibold text-white">Learning Curve for Web Developers</td>
                  <td className="px-6 py-4 text-neutral-400">High (shared values, worklets)</td>
                  <td className="px-6 py-4 text-neutral-300">Moderate</td>
                  <td className="px-6 py-4 text-emerald-400 font-bold">Zero (identical to Framer Motion)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 6: Get Started CTA */}
        <section className="flex flex-col items-center gap-6 bg-gradient-to-r from-indigo-900/30 via-indigo-600/20 to-purple-900/30 p-8 md:p-12 border border-indigo-500/30 rounded-3xl text-center shadow-2xl">
          <Sparkles className="size-8 text-indigo-400" />
          <h2 className="font-bold text-white text-3xl md:text-4xl tracking-tight">
            Ready to add exit animations to your app?
          </h2>
          <p className="max-w-xl text-neutral-300 text-base md:text-lg">
            Install <code className="text-white font-mono font-bold">motion-on-native</code> today and start creating fluid mobile interfaces with spring physics.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => navigate('/docs/get-started/quick-start')}
              className="bg-white hover:bg-neutral-200 px-6 py-3 rounded-full text-black-900 font-semibold text-sm transition-all cursor-pointer shadow-lg"
            >
              Get Started in 5 Minutes
            </button>
            <button
              onClick={() => navigate('/docs/core/animated-exit')}
              className="bg-white/10 hover:bg-white/20 px-6 py-3 rounded-full text-white font-semibold text-sm transition-all cursor-pointer border border-white/15"
            >
              AnimatedExit API Reference
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
