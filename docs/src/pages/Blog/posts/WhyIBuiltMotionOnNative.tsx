import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, Copy, Calendar, Clock, Heart, Zap, ShieldCheck } from 'lucide-react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { androidstudio } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { Footer } from '../../../components/Footer';
import { useMeta } from '../../../hooks/useMeta';

export default function WhyIBuiltMotionOnNative() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'raw' | 'motion'>('motion');

  useMeta({
    title: 'Why I Built Motion on Native: Bringing Framer Motion Joy to Mobile',
    description:
      'The developer journey of moving from Web to React Native, hitting the wall of Reanimated boilerplate, the "Shared Value Factory" breakthrough, and reaching 50+ weekly downloads.',
    canonical: 'https://motion-on-native.vercel.app/blog/why-i-built-motion-on-native',
  });

  const rawReanimatedCode = `// 😫 The Old Way: 30+ lines of imperative ceremony for ONE card fade/scale
import React, { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

export default function Card() {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(20);
  const scale = useSharedValue(0.95);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 300 });
    translateY.value = withSpring(0, { damping: 15, stiffness: 100 });
    scale.value = withSpring(1, { damping: 15, stiffness: 100 });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  return (
    <Animated.View style={[styles.card, animatedStyle]}>
      <Text style={styles.title}>Hello World</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: { padding: 20, backgroundColor: '#1e1b4b', borderRadius: 16 },
  title: { color: '#fff' },
});`;

  const motionCode = `// 😍 The Motion on Native Way: 5 lines, zero boilerplate, 100% UI-thread
import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { NativeMotion } from 'motion-on-native';

export default function Card() {
  return (
    <NativeMotion.View
      initial={{ opacity: 0, translateY: 20, scale: 0.95 }}
      animate={{ opacity: 1, translateY: 0, scale: 1 }}
      transition={{ type: 'spring', damping: 15, stiffness: 100 }}
      style={styles.card}
    >
      <Text style={styles.title}>Hello World</Text>
    </NativeMotion.View>
  );
}

const styles = StyleSheet.create({
  card: { padding: 20, backgroundColor: '#1e1b4b', borderRadius: 16 },
  title: { color: '#fff' },
});`;

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
              Founder Story
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
            Why I Built Motion on Native: Bringing Framer Motion Joy to Mobile
          </h1>

          <p className="text-neutral-400 text-lg md:text-xl leading-relaxed">
            I love Framer Motion on the web. But when I jumped into React Native, I found myself drowning in dozens of lines of
            shared values and imperative ceremony for simple UI transitions. Here is the story of how and why I built <code className="text-indigo-300">motion-on-native</code>.
          </p>
        </header>

        <hr className="border-white/10" />

        {/* The Web Experience */}
        <section className="flex flex-col gap-5 text-neutral-300 text-base md:text-lg leading-relaxed">
          <h2 className="font-bold text-white text-2xl md:text-3xl tracking-tight">
            1. The Golden Standard on Web
          </h2>
          <p>
            If you've ever built a React web application with Framer Motion (now <a href="https://motion.dev" target="_blank" rel="noreferrer" className="text-indigo-400 hover:underline">Motion</a>),
            you know that magical feeling. Adding fluid animations to a landing page or SaaS dashboard takes seconds:
          </p>
          <div className="bg-[#0d0d0d] p-4 border border-neutral-800 rounded-xl font-mono text-indigo-300 text-sm">
            {`<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} />`}
          </div>
          <p>
            You declare what the component looks like initially, where it should animate to, and optionally how it springs.
            You don't worry about managing animation frame counters, subscribing to interpolation nodes, or wiring up lifecycle hooks.
            It just flows naturally from your component's state.
          </p>
        </section>

        {/* The Mobile Reality Check */}
        <section className="flex flex-col gap-5 text-neutral-300 text-base md:text-lg leading-relaxed">
          <h2 className="font-bold text-white text-2xl md:text-3xl tracking-tight">
            2. The React Native Reality Check
          </h2>
          <p>
            When I transitioned to React Native, I immediately reached for <code className="text-white">react-native-reanimated</code>.
            Don't get me wrong: <strong>Reanimated is an engineering masterpiece</strong>. It offloads animation math to the UI thread,
            bypassing the JavaScript bridge and guaranteeing 60fps or 120fps on ProMotion displays.
          </p>
          <p>
            <strong>The issue wasn't performance — it was the Developer Experience (DX).</strong>
          </p>
          <p>
            To build a simple card that fades in and scales slightly, I had to:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-2 text-neutral-400">
            <li>Import 4 different hooks and functions (<code className="text-neutral-200">useSharedValue</code>, <code className="text-neutral-200">useAnimatedStyle</code>, <code className="text-neutral-200">withTiming</code>, <code className="text-neutral-200">withSpring</code>).</li>
            <li>Create separate shared values for every single animating property.</li>
            <li>Start the animations inside a <code className="text-neutral-200">useEffect</code> hook.</li>
            <li>Construct an animated style object with transform arrays.</li>
            <li>Merge the animated style into an <code className="text-neutral-200">Animated.View</code>.</li>
          </ul>
          <p>
            Before I wrote a single line of business logic, my component was already 40 lines of boilerplate. And when I had to add an exit animation?
            Forget it — that required manual state machines just to delay component unmounting.
          </p>
        </section>

        {/* The Side by Side Comparison */}
        <section className="flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-white text-2xl md:text-3xl tracking-tight">
              3. The Comparison: See the Difference
            </h2>
            <div className="flex bg-white/5 p-1 rounded-lg border border-white/10 text-xs">
              <button
                onClick={() => setActiveTab('motion')}
                className={`px-3 py-1 rounded-md transition-all cursor-pointer font-medium ${
                  activeTab === 'motion'
                    ? 'bg-indigo-600 text-white shadow'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Motion on Native (4 lines)
              </button>
              <button
                onClick={() => setActiveTab('raw')}
                className={`px-3 py-1 rounded-md transition-all cursor-pointer font-medium ${
                  activeTab === 'raw'
                    ? 'bg-red-600/80 text-white shadow'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Raw Reanimated (35 lines)
              </button>
            </div>
          </div>

          {activeTab === 'motion' ? (
            <CodeWindow title="Card.tsx (Motion on Native)" code={motionCode} />
          ) : (
            <CodeWindow title="Card.tsx (Raw Reanimated 3)" code={rawReanimatedCode} />
          )}
        </section>

        {/* The Shared Value Factory */}
        <section className="flex flex-col gap-5 text-neutral-300 text-base md:text-lg leading-relaxed">
          <h2 className="font-bold text-white text-2xl md:text-3xl tracking-tight">
            4. The Breakthrough: The "Shared Value Factory"
          </h2>
          <p>
            I asked myself: <em>Why can't animations just be props?</em>
          </p>
          <p>
            Instead of making developers hand-wire shared values, what if a higher-order wrapper dynamically instantiated
            and mapped Reanimated shared values based on whatever keys were passed to <code className="text-indigo-300">initial</code> and <code className="text-indigo-300">animate</code>?
          </p>
          <p>
            Under the hood in <code className="text-white">createMotionComponent</code>:
          </p>
          <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
            <div className="flex flex-col gap-2 bg-[#0d0d0d] p-5 border border-neutral-800 rounded-xl">
              <div className="flex items-center gap-2 text-indigo-400 font-semibold">
                <Zap className="size-4" />
                <span>Zero Bridge Crossing</span>
              </div>
              <p className="text-neutral-400 text-sm">
                Transitions evaluate directly on the Reanimated UI thread. Frame rates remain rock-solid at 60/120fps regardless of JS activity.
              </p>
            </div>
            <div className="flex flex-col gap-2 bg-[#0d0d0d] p-5 border border-neutral-800 rounded-xl">
              <div className="flex items-center gap-2 text-indigo-400 font-semibold">
                <ShieldCheck className="size-4" />
                <span>Clean Unmounting</span>
              </div>
              <p className="text-neutral-400 text-sm">
                Shared values are managed internally and cleaned up on unmount, completely eliminating memory leaks.
              </p>
            </div>
          </div>
        </section>

        {/* Exit Animations & Open Source */}
        <section className="flex flex-col gap-5 text-neutral-300 text-base md:text-lg leading-relaxed">
          <h2 className="font-bold text-white text-2xl md:text-3xl tracking-tight">
            5. Porting Framer Motion's AnimatePresence
          </h2>
          <p>
            Once basic spring and timing transitions were working, the biggest missing piece was <strong>exit animations</strong>.
            Framer Motion has a brilliant architecture for <code className="text-indigo-300">&lt;AnimatePresence&gt;</code> that coordinates
            presence contexts and delays unmounting until all child transitions resolve.
          </p>
          <p>
            Because Framer Motion is open source under the permissive **MIT License**, I adapted its presence algorithm for React Native,
            combining it with Reanimated's layout capabilities to create <code className="text-indigo-300">&lt;AnimatedExit&gt;</code>.
          </p>
        </section>

        {/* The 50 downloads and next steps */}
        <section className="flex flex-col gap-5 text-neutral-300 text-base md:text-lg leading-relaxed">
          <h2 className="font-bold text-white text-2xl md:text-3xl tracking-tight">
            6. From a Frustration to 50+ Weekly Downloads
          </h2>
          <p>
            I published <code className="text-white">motion-on-native</code> to npm thinking maybe a couple of friends would find it useful.
            Within weeks, the package started averaging 35 to 50 downloads a week from developers across the globe who felt the exact same pain.
          </p>
          <p>
            That community response made me realize this wasn't just my pet peeve — it was a major gap in the React Native ecosystem.
            We just published <strong>version 1.5.7</strong> with refined types, optional presence animations, and full documentation.
          </p>
        </section>

        {/* CTA */}
        <section className="flex flex-col items-center gap-6 bg-gradient-to-r from-indigo-900/30 via-indigo-600/20 to-purple-900/30 p-8 md:p-12 border border-indigo-500/30 rounded-3xl text-center shadow-2xl">
          <Heart className="size-8 text-pink-400" />
          <h2 className="font-bold text-white text-3xl md:text-4xl tracking-tight">
            Join the Journey
          </h2>
          <p className="max-w-xl text-neutral-300 text-base md:text-lg">
            Give <code className="text-white font-mono font-bold">motion-on-native</code> a spin in your next React Native project.
            Cut down the boilerplate and bring the joy back to mobile animations.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => navigate('/docs/get-started/quick-start')}
              className="bg-white hover:bg-neutral-200 px-6 py-3 rounded-full text-black-900 font-semibold text-sm transition-all cursor-pointer shadow-lg"
            >
              Get Started with Motion on Native
            </button>
            <button
              onClick={() => navigate('/blog/migrating-to-motion-on-native')}
              className="bg-white/10 hover:bg-white/20 px-6 py-3 rounded-full text-white font-semibold text-sm transition-all cursor-pointer border border-white/15"
            >
              Read Migration Guide
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
