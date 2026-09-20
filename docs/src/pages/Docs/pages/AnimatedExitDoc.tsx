import { useState } from 'react';
import { Sparkles, Check, Copy, AlertCircle, Layers, ShieldCheck } from 'lucide-react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { androidstudio } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import DocNavButtons from '../../../components/DocNavButtons';
import { useMeta } from '../../../hooks/useMeta';

export default function AnimatedExitDoc() {
  useMeta({
    title: 'AnimatedExit (Exit Animations) - Core Components',
    description:
      "Direct port of Framer Motion's AnimatePresence for React Native. Keep components alive during Reanimated UI-thread exit transitions.",
    canonical: 'https://motion-on-native.vercel.app/docs/core/animated-exit',
  });
  const basicExample = `import React, { useState } from 'react';
import { Button, Text, StyleSheet } from 'react-native';
import { NativeMotion, AnimatedExit } from 'motion-on-native';

export default function NotificationBanner() {
  const [show, setShow] = useState(true);

  return (
    <>
      <Button title={show ? "Dismiss" : "Show"} onPress={() => setShow(!show)} />

      <AnimatedExit>
        {show && (
          <NativeMotion.View
            key="banner" // Unique key is REQUIRED
            initial={{ opacity: 0, translateY: -20, scale: 0.95 }}
            animate={{ opacity: 1, translateY: 0, scale: 1 }}
            exit={{ opacity: 0, translateY: -20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 15, stiffness: 120 }}
            style={styles.banner}
          >
            <Text style={styles.text}>Saved to cloud successfully!</Text>
          </NativeMotion.View>
        )}
      </AnimatedExit>
    </>
  );
}

const styles = StyleSheet.create({
  banner: {
    padding: 16,
    backgroundColor: '#3b82f6',
    borderRadius: 12,
    marginVertical: 12,
  },
  text: { color: '#ffffff', fontWeight: '600' },
});`;

  const waitModeExample = `<AnimatedExit mode="wait">
  {currentStep === 1 ? (
    <NativeMotion.View
      key="step-1"
      initial={{ opacity: 0, translateX: -40 }}
      animate={{ opacity: 1, translateX: 0 }}
      exit={{ opacity: 0, translateX: 40 }}
      transition={{ type: 'spring', damping: 18 }}
    >
      <StepOneForm />
    </NativeMotion.View>
  ) : (
    <NativeMotion.View
      key="step-2"
      initial={{ opacity: 0, translateX: -40 }}
      animate={{ opacity: 1, translateX: 0 }}
      exit={{ opacity: 0, translateX: 40 }}
      transition={{ type: 'spring', damping: 18 }}
    >
      <StepTwoForm />
    </NativeMotion.View>
  )}
</AnimatedExit>`;

  const usePresenceExample = `import { usePresence, useIsPresent } from 'motion-on-native';

export function CustomCard() {
  // isPresent is true while mounted; false once parent AnimatedExit initiates removal
  const [isPresent, safeToRemove] = usePresence();

  // Or simply read the boolean presence flag
  const isCurrentlyPresent = useIsPresent();

  return (
    <View style={{ opacity: isCurrentlyPresent ? 1 : 0.5 }}>
      <Text>Status: {isPresent ? "Active" : "Exiting..."}</Text>
    </View>
  );
}`;

  return (
    <div className="selection:bg-indigo-500/30 w-full h-[calc(100svh-80px)] overflow-y-auto selection:text-white-200 scroll-smooth">
      <div className="relative flex flex-col gap-20 mx-auto px-6 py-20 lg:py-32 max-w-5xl">
        <header className="flex flex-col gap-4">
          <div className="flex items-center gap-2 font-mono text-indigo-400 text-sm uppercase tracking-widest">
            <Sparkles className="size-4" />
            <span>Core Components</span>
          </div>
          <h1 className="bg-clip-text bg-linear-to-r from-white to-neutral-500 font-bold text-transparent text-5xl tracking-tighter">
            AnimatedExit (Exit Animations)
          </h1>
          <p className="max-w-2xl text-neutral-400 text-xl leading-relaxed">
            Direct port of Framer Motion's <code className="text-indigo-300">AnimatePresence</code>.
            Allows React Native components to animate smoothly before they are removed from the component tree.
          </p>
        </header>

        {/* Why AnimatedExit */}
        <section className="flex flex-col gap-6 bg-white/[0.02] p-6 border border-white/10 rounded-2xl">
          <div className="flex items-center gap-3">
            <Layers className="text-indigo-400" size={22} />
            <h3 className="font-semibold text-white text-2xl tracking-tight">The Exit Dilemma in React Native</h3>
          </div>
          <p className="text-neutral-400 text-base leading-relaxed">
            By default in React, when condition <code className="text-indigo-300">{`{isVisible && <Component />}`}</code> turns false,
            React destroys the DOM or native view immediately. Standard animation styles never get a chance to run
            because the view is already gone.
          </p>
          <p className="text-neutral-400 text-base leading-relaxed">
            <strong className="text-white">AnimatedExit</strong> intercepts unmounting. It keeps the exiting component alive in the React
            tree until its <code className="text-indigo-300">exit</code> animation finishes running on Reanimated's UI thread, then unmounts it cleanly.
          </p>
        </section>

        {/* Basic Usage */}
        <section className="flex flex-col gap-6">
          <h2 className="font-bold text-white text-3xl tracking-tight">Basic Usage</h2>
          <p className="text-neutral-400 text-base">
            Wrap conditional elements inside <code className="text-indigo-300">&lt;AnimatedExit&gt;</code>.
            Ensure every direct child has a distinct <code className="text-indigo-300">key</code> prop.
          </p>
          <CodeWindow title="ExitBanner.tsx" code={basicExample} />
        </section>

        {/* Key Requirement Callout */}
        <div className="flex items-start gap-4 bg-amber-500/10 p-5 border border-amber-500/20 rounded-xl text-amber-200">
          <AlertCircle className="shrink-0 mt-0.5 size-5" />
          <div className="text-sm leading-relaxed">
            <strong className="font-semibold">Important: Every child must have a unique key.</strong>
            <p className="mt-1 text-amber-200/80">
              React tracks item lifecycle and unmount orders through the <code className="text-white">key</code> prop.
              Without a unique key, <code className="text-white">&lt;AnimatedExit&gt;</code> cannot differentiate between entering and exiting views.
            </p>
          </div>
        </div>

        {/* Modes: sync vs wait */}
        <section className="flex flex-col gap-6">
          <h2 className="font-bold text-white text-3xl tracking-tight">Transition Modes</h2>
          <p className="text-neutral-400 text-base">
            Control the sequence of entering and exiting elements using the <code className="text-indigo-300">mode</code> prop.
          </p>

          <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
            <div className="flex flex-col gap-3 bg-[#0d0d0d] p-5 border border-neutral-800 rounded-xl">
              <span className="font-mono text-indigo-400 text-sm">mode="sync" (Default)</span>
              <h4 className="font-semibold text-white text-lg">Concurrent Transitions</h4>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Entering children animate in at the same time exiting children animate out. Ideal for lists, toasts, and independently toggled views.
              </p>
            </div>
            <div className="flex flex-col gap-3 bg-[#0d0d0d] p-5 border border-neutral-800 rounded-xl">
              <span className="font-mono text-indigo-400 text-sm">mode="wait"</span>
              <h4 className="font-semibold text-white text-lg">Sequential Transitions</h4>
              <p className="text-neutral-400 text-sm leading-relaxed">
                The exiting child completes its full exit animation before the new child begins mounting and entering. Perfect for wizards and multi-step forms.
              </p>
            </div>
          </div>

          <CodeWindow title="WizardStep.tsx (mode='wait')" code={waitModeExample} />
        </section>

        {/* Props Reference */}
        <section className="flex flex-col gap-6">
          <h2 className="font-bold text-white text-3xl tracking-tight">AnimatedExit Props</h2>
          <div className="border-neutral-800 border rounded-xl overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/5 font-mono text-neutral-400 text-xs uppercase">
                <tr>
                  <th className="px-6 py-4">Prop</th>
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4">Default</th>
                  <th className="px-6 py-4">Description</th>
                </tr>
              </thead>
              <tbody className="divide-neutral-800 divide-y text-neutral-300">
                <tr className="hover:bg-white/[0.02]">
                  <td className="px-6 py-4 font-mono text-indigo-300 font-semibold">mode</td>
                  <td className="px-6 py-4 font-mono text-neutral-400">'sync' | 'wait' | 'popLayout'</td>
                  <td className="px-6 py-4 font-mono text-neutral-500">'sync'</td>
                  <td className="px-6 py-4">Determines whether children animate concurrently or sequentially.</td>
                </tr>
                <tr className="hover:bg-white/[0.02]">
                  <td className="px-6 py-4 font-mono text-indigo-300 font-semibold">onExitComplete</td>
                  <td className="px-6 py-4 font-mono text-neutral-400">() =&gt; void</td>
                  <td className="px-6 py-4 font-mono text-neutral-500">undefined</td>
                  <td className="px-6 py-4">Callback triggered after all exiting elements have unmounted.</td>
                </tr>
                <tr className="hover:bg-white/[0.02]">
                  <td className="px-6 py-4 font-mono text-indigo-300 font-semibold">propagate</td>
                  <td className="px-6 py-4 font-mono text-neutral-400">boolean</td>
                  <td className="px-6 py-4 font-mono text-neutral-500">false</td>
                  <td className="px-6 py-4">Allows nested AnimatedExit trees to coordinate exit timings.</td>
                </tr>
                <tr className="hover:bg-white/[0.02]">
                  <td className="px-6 py-4 font-mono text-indigo-300 font-semibold">children</td>
                  <td className="px-6 py-4 font-mono text-neutral-400">React.ReactNode</td>
                  <td className="px-6 py-4 font-mono text-neutral-500">required</td>
                  <td className="px-6 py-4">Direct children with unique keys.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* usePresence Hooks */}
        <section className="flex flex-col gap-6">
          <h2 className="font-bold text-white text-3xl tracking-tight">usePresence & useIsPresent Hooks</h2>
          <p className="text-neutral-400 text-base">
            Components nested inside an <code className="text-indigo-300">&lt;AnimatedExit&gt;</code> can inspect whether they are currently unmounting.
          </p>
          <CodeWindow title="CustomPresence.tsx" code={usePresenceExample} />
        </section>

        {/* Open Source Notice */}
        <div className="flex items-center gap-3 bg-white/[0.02] p-4 border border-white/10 rounded-xl text-neutral-400 text-xs">
          <ShieldCheck className="size-5 text-emerald-400 shrink-0" />
          <span>
            The AnimatedExit and usePresence core architecture is adapted from Motion (Framer Motion) under the MIT License. See <code className="text-white">THIRD-PARTY-NOTICES.md</code> for details.
          </span>
        </div>

        <DocNavButtons />
      </div>
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
