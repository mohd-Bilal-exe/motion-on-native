import React from 'react';
import { Code2, Braces, Binary, ShieldCheck, Check, Copy, AlertCircle } from 'lucide-react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { androidstudio } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import DocNavButtons from '../../../components/DocNavButtons';

export default function TypesDocs() {
  return (
    <div className="selection:bg-indigo-500/30 w-full h-[calc(100svh-80px)] overflow-y-auto selection:text-white-200 scroll-smooth">
      <div className="relative flex flex-col gap-20 mx-auto px-6 py-20 lg:py-32 max-w-5xl">
        {/* Header */}
        <header className="flex flex-col gap-4">
          <div className="flex items-center gap-2 font-mono text-emerald-400 text-sm uppercase tracking-widest">
            <ShieldCheck size={16} />
            <span>Type Safety</span>
          </div>
          <h1 className="bg-clip-text bg-linear-to-r from-white to-neutral-400 font-bold text-transparent text-5xl tracking-tighter">
            Exported Types
          </h1>
          <p className="max-w-2xl text-neutral-400 text-xl leading-relaxed">
            Strictly typed for a better DX. We export these interfaces so you can build your own
            high-level components without losing autocompletion.
          </p>
        </header>

        {/* AnimationProps Interface */}
        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <Braces className="text-indigo-400" size={24} />
            <h2 className="font-bold text-white text-3xl tracking-tight">AnimationProps</h2>
          </div>
          <p className="text-neutral-500 text-lg leading-relaxed">
            This defines what you can pass to <code className="text-indigo-300">initial</code>,{' '}
            <code className="text-indigo-300">animate</code>, and{' '}
            <code className="text-indigo-300">exit</code>.
          </p>

          <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
            <TypeCard
              title="Numbers"
              types={['opacity', 'scale', 'translateX', 'width', 'borderRadius', 'elevation']}
            />
            <TypeCard
              title="Strings (Units)"
              types={['rotate', 'rotateX', 'skewY', 'backgroundColor', 'borderColor']}
            />
          </div>

          <CodeWindow title="AnimationProps.ts" code={animationPropsCode} />
        </section>

        {/* TransitionProps Interface */}
        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <Binary className="text-blue-400" size={24} />
            <h2 className="font-bold text-white text-3xl tracking-tight">TransitionProps</h2>
          </div>
          <CodeWindow title="TransitionProps.ts" code={transitionPropsCode} />
        </section>

        {/* MotionComponentProps */}
        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <Code2 className="text-purple-400" size={24} />
            <h2 className="font-bold text-white text-3xl tracking-tight">MotionComponentProps</h2>
          </div>
          <p className="text-neutral-400 text-lg">
            The full set of props accepted by any{' '}
            <code className="text-indigo-300 italic">NativeMotion</code> component.
          </p>
          <CodeWindow title="MotionComponentProps.ts" code={motionCompPropsCode} />
        </section>

        {/* Future Implementation Warning */}
        <div className="flex items-start gap-6 bg-neutral-900/50 p-8 border border-neutral-800 rounded-3xl">
          <div className="bg-neutral-800 p-3 rounded-2xl text-neutral-400 shrink-0">
            <AlertCircle size={24} />
          </div>
          <div>
            <h4 className="mb-1 font-bold text-white text-lg">Under Construction</h4>
            <p className="text-neutral-500 leading-relaxed">
              Props like <code className="text-neutral-300">whileHover</code>,{' '}
              <code className="text-neutral-300">layout</code>, and{' '}
              <code className="text-neutral-300">layoutId</code> are currently defined in the types
              for future parity with Framer Motion, but they are not yet active in the current
              engine.
            </p>
          </div>
        </div>

        <DocNavButtons
          previousSection={{
            title: 'Animation Behaviour',
            subTitle: 'Springs, timing, and delays',
            path: '/docs/core/animation-behaviour',
          }}
        />
      </div>
    </div>
  );
}

function TypeCard({ title, types }: { title: string; types: string[] }) {
  return (
    <div className="bg-neutral-900/30 p-5 border border-neutral-800 rounded-2xl">
      <h5 className="mb-3 font-bold text-white text-sm uppercase tracking-widest">{title}</h5>
      <div className="flex flex-wrap gap-2">
        {types.map(t => (
          <code key={t} className="bg-neutral-800 px-2 py-1 rounded text-indigo-300 text-xs">
            {t}
          </code>
        ))}
      </div>
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
      <div className="flex justify-between items-center bg-neutral-900/50 px-4 py-3 border-neutral-800 border-b">
        <span className="font-mono text-neutral-500 text-sm">{title}</span>
        <button onClick={copy} className="text-neutral-500 hover:text-white transition-colors">
          {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
      <div className="p-2 overflow-x-auto">
        <SyntaxHighlighter
          language="typescript"
          style={androidstudio}
          customStyle={{ background: 'transparent', padding: '20px', fontSize: '13px', margin: 0 }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}

const animationPropsCode = `export interface AnimationProps {
  // Transform (Numbers or degree strings)
  opacity?: number;
  translateX?: number;
  translateY?: number;
  scale?: number;
  rotate?: string; // e.g., '45deg'

  // Layout & Spacing
  width?: number;
  height?: number;
  margin?: number;
  padding?: number;

  // Colors & Styles
  backgroundColor?: string;
  borderRadius?: number;
  borderColor?: string;
  
  // Platform Specific
  shadowOpacity?: number; // iOS
  elevation?: number;    // Android
}`;

const transitionPropsCode = `export interface TransitionProps {
  type?: 'spring' | 'timing';
  duration?: number;
  damping?: number;
  stiffness?: number;
  mass?: number;
  delay?: number;
  ease?: string;
  repeat?: number | 'infinity';
  repeatType?: 'loop' | 'reverse';
}`;

const motionCompPropsCode = `export interface MotionComponentProps {
  initial?: AnimationProps | false;
  animate?: AnimationProps;
  exit?: AnimationProps;
  transition?: TransitionProps;
  
  // Presence Config
  presenceAnimation?: { 
    entering: LayoutEntryAnimation; 
    exiting: LayoutExitAnimation 
  };
  
  styles?: ViewStyle;
  onExitComplete?: () => void;
  isPresent?: boolean;
}`;
