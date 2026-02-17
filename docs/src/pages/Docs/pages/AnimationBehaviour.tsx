import React from 'react';
import { Activity, Timer, RotateCcw, Zap, Check, Copy } from 'lucide-react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { androidstudio } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import DocNavButtons from '../../../components/DocNavButtons';

export default function AnimationBehaviour() {
  return (
    <div className="selection:bg-indigo-500/30 w-full h-[calc(100svh-80px)] overflow-y-auto selection:text-white-200 scroll-smooth">
      <div className="relative flex flex-col gap-20 mx-auto px-6 py-20 lg:py-32 max-w-5xl">
        {/* Header */}
        <header className="flex flex-col gap-4">
          <h1 className="bg-clip-text bg-linear-to-r from-white to-neutral-400 font-bold text-transparent text-5xl tracking-tighter">
            Animation Behaviour
          </h1>
          <p className="max-w-2xl text-neutral-400 text-xl leading-relaxed">
            The <code className="text-indigo-300">transition</code> prop determines the "vibe" of
            your motion. Whether it’s an organic spring or a precise linear curve, you control the
            physics here.
          </p>
        </header>

        {/* 1. Spring - The Default */}
        <section className="flex flex-col gap-8">
          <div className="flex items-center gap-4">
            <div className="flex justify-center items-center bg-neutral-900 border border-neutral-800 rounded-xl w-10 h-10">
              <Activity className="w-5 h-5 text-indigo-400" />
            </div>
            <h2 className="font-bold text-white text-3xl tracking-tight">Spring Physics</h2>
          </div>

          <p className="text-neutral-400 text-lg leading-relaxed">
            Spring is the default animation type. It feels organic because it's based on physical
            properties like mass and stiffness rather than a fixed duration.
          </p>

          <CodeWindow
            title="SpringConfig.tsx"
            code={`transition={{
  type: 'spring',
  stiffness: 100, // Resistance to change
  damping: 15,    // How fast the oscillation stops
  mass: 1,        // Weight of the object
}}`}
          />

          <div className="gap-4 grid grid-cols-1 md:grid-cols-3">
            <PropMetric title="Stiffness" desc="Higher = snappier, more aggressive movement." />
            <PropMetric title="Damping" desc="Lower = more bounciness and overshoot." />
            <PropMetric title="Mass" desc="Higher = more inertia, feels 'heavier' to move." />
          </div>
        </section>

        {/* 2. Timing */}
        <section className="flex flex-col gap-8">
          <div className="flex items-center gap-4">
            <div className="flex justify-center items-center bg-neutral-900 border border-neutral-800 rounded-xl w-10 h-10">
              <Timer className="w-5 h-5 text-emerald-400" />
            </div>
            <h2 className="font-bold text-white text-3xl tracking-tight">Timing & Easing</h2>
          </div>

          <p className="text-neutral-400 text-lg leading-relaxed">
            Use <code className="text-indigo-300">timing</code> when you need a fixed duration or
            specific easing curves (like linear or ease-in-out).
          </p>

          <CodeWindow
            title="TimingConfig.tsx"
            code={`transition={{
  type: 'timing',
  duration: 400,
  ease: 'easeInOut' // or 'linear', 'easeIn', 'easeOut'
}}`}
          />
        </section>

        {/* 3. Global Props */}
        <section className="flex flex-col gap-8">
          <div className="flex items-center gap-4">
            <div className="flex justify-center items-center bg-neutral-900 border border-neutral-800 rounded-xl w-10 h-10">
              <RotateCcw className="w-5 h-5 text-orange-400" />
            </div>
            <h2 className="font-bold text-white text-3xl tracking-tight">Utility Props</h2>
          </div>

          <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
            <div className="bg-neutral-900/40 p-6 border border-neutral-800 rounded-2xl">
              <h4 className="mb-2 font-bold text-white">Delay</h4>
              <p className="mb-4 text-neutral-500 text-sm">
                Wait before starting the animation (in ms).
              </p>
              <code className="text-indigo-300 text-sm">delay: 200</code>
            </div>
            <div className="bg-neutral-900/40 p-6 border border-neutral-800 rounded-2xl">
              <h4 className="mb-2 font-bold text-white">Repeat</h4>
              <p className="mb-4 text-neutral-500 text-sm">Number of times to run or 'infinity'.</p>
              <code className="text-indigo-300 text-sm">
                repeat: 'infinity', repeatType: 'reverse'
              </code>
            </div>
          </div>
        </section>

        {/* Color Limitation Warning */}
        <div className="flex items-start gap-6 bg-amber-500/5 p-8 border border-amber-500/10 rounded-3xl">
          <div className="bg-amber-500/10 p-3 rounded-2xl text-amber-500 shrink-0">
            <Zap size={24} />
          </div>
          <div>
            <h4 className="mb-1 font-mono font-bold text-white text-lg">No "Bouncy" Colors</h4>
            <p className="text-neutral-400 leading-relaxed">
              Color interpolation uses <code className="text-neutral-200">withTiming</code> under
              the hood regardless of your config. Physics-based springs don't really apply to hex
              codes, so we default to a smooth linear transition for any color-based props.
            </p>
          </div>
        </div>

        <DocNavButtons
          previousSection={{
            title: 'Animation Props',
            subTitle: 'What you can actually move',
            path: '/docs/core/animation-props',
          }}
          nextSection={{
            title: 'Types',
            subTitle: 'Animation props and their types.',
            path: '/docs/core/types',
          }}
        />
      </div>
    </div>
  );
}

function PropMetric({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="bg-neutral-900/20 p-4 border border-neutral-800 rounded-xl">
      <div className="mb-1 font-mono text-indigo-400 text-xs uppercase tracking-widest">
        {title}
      </div>
      <p className="text-neutral-500 text-sm leading-snug">{desc}</p>
    </div>
  );
}

function CodeWindow({ code, title }: { code: string; title: string }) {
  const [copied, setCopied] = React.useState(false);
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
        <button onClick={copy} className="text-neutral-500 hover:text-white transition-colors">
          {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
      <div className="p-2 overflow-x-auto">
        <SyntaxHighlighter
          language="tsx"
          style={androidstudio}
          customStyle={{ background: 'transparent', padding: '20px', fontSize: '14px', margin: 0 }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
