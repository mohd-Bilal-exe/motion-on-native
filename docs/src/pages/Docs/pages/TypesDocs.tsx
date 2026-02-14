import React from 'react';
import { Braces, ShieldCheck, Check, Copy, AlertCircle, Move, Layers, Palette } from 'lucide-react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { androidstudio } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import DocNavButtons from '../../../components/DocNavButtons';

export default function TypesDocs() {
  return (
    <div className="selection:bg-indigo-500/30 w-full h-[calc(100svh-80px)] overflow-y-auto selection:text-white-200 scroll-smooth">
      <div className="relative flex flex-col gap-24 mx-auto px-6 py-20 lg:py-32 max-w-5xl">
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

        {/* 1. Transform Table */}
        <section className="flex flex-col gap-8">
          <div className="flex items-center gap-3">
            <Move className="text-blue-400" size={24} />
            <h2 className="font-bold text-white text-3xl tracking-tight">Transforms</h2>
          </div>
          <PropertyTable
            data={[
              { prop: 'opacity', type: 'number', desc: '0 to 1 range' },
              { prop: 'translateX', type: 'number', desc: 'Horizontal shift in pixels' },
              { prop: 'scale', type: 'number', desc: 'Size multiplier (default: 1)' },
              { prop: 'rotate', type: 'string', desc: "Degrees or Radians (e.g. '45deg')" },
              { prop: 'skewX', type: 'string', desc: "Skew angle (e.g. '10deg')" },
            ]}
          />
        </section>

        {/* 2. Layout Table */}
        <section className="flex flex-col gap-8">
          <div className="flex items-center gap-3">
            <Layers className="text-emerald-400" size={24} />
            <h2 className="font-bold text-white text-3xl tracking-tight">Layout & Spacing</h2>
          </div>
          <PropertyTable
            data={[
              { prop: 'width', type: 'number', desc: 'Pixel width' },
              { prop: 'height', type: 'number', desc: 'Pixel height' },
              { prop: 'margin', type: 'number', desc: 'Uniform margin spacing' },
              { prop: 'padding', type: 'number', desc: 'Uniform padding spacing' },
              { prop: 'top / left', type: 'number', desc: 'Absolute positioning' },
            ]}
          />
        </section>

        {/* 3. Style Table */}
        <section className="flex flex-col gap-8">
          <div className="flex items-center gap-3">
            <Palette className="text-fuchsia-400" size={24} />
            <h2 className="font-bold text-white text-3xl tracking-tight">Styling</h2>
          </div>
          <PropertyTable
            data={[
              { prop: 'backgroundColor', type: 'string', desc: 'Hex, RGB, or HSL' },
              { prop: 'borderRadius', type: 'number', desc: 'Corner rounding in pixels' },
              { prop: 'elevation', type: 'number', desc: 'Shadow depth (Android only)' },
              { prop: 'shadowOpacity', type: 'number', desc: '0 to 1 range (iOS only)' },
            ]}
          />
        </section>

        {/* Full Interfaces */}
        <div className="flex flex-col gap-12 mt-12 pt-12 border-neutral-800/50 border-t">
          <h2 className="flex items-center gap-3 font-bold text-white text-3xl tracking-tight">
            <Braces className="text-indigo-400" size={24} />
            Raw Interfaces
          </h2>
          <CodeWindow title="AnimationProps.ts" code={animationPropsCode} />
          <CodeWindow title="TransitionProps.ts" code={transitionPropsCode} />
          <CodeWindow title="MotionComponentProps.ts" code={motionCompPropsCode} />
        </div>

        {/* Warning */}
        <div className="flex items-start gap-6 bg-neutral-900/50 p-8 border border-neutral-800 rounded-3xl">
          <div className="bg-neutral-800 p-3 rounded-2xl text-neutral-400 shrink-0">
            <AlertCircle size={24} />
          </div>
          <div>
            <h4 className="mb-1 font-bold text-white text-lg">Under Construction</h4>
            <p className="text-neutral-500 leading-relaxed">
              Props like <code className="text-neutral-300">whileHover</code> and{' '}
              <code className="text-neutral-300">layoutId</code> are defined for future parity, but
              are currently inactive.
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

function PropertyTable({ data }: { data: { prop: string; type: string; desc: string }[] }) {
  return (
    <div className="bg-neutral-900/10 border border-neutral-800 rounded-2xl w-full overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-neutral-900/40 border-neutral-800 border-b">
            <th className="px-6 py-4 font-bold text-neutral-500 text-xs uppercase tracking-widest">
              Property
            </th>
            <th className="px-6 py-4 font-bold text-neutral-500 text-xs uppercase tracking-widest">
              Type
            </th>
            <th className="px-6 py-4 font-bold text-neutral-500 text-xs uppercase tracking-widest">
              Usage / Range
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-800">
          {data.map((row, i) => (
            <tr key={i} className="group hover:bg-neutral-800/30 transition-colors">
              <td className="px-6 py-4 font-mono text-indigo-400 group-hover:text-indigo-300 text-sm transition-colors">
                {row.prop}
              </td>
              <td className="px-6 py-4 font-mono text-emerald-500/80 text-sm">{row.type}</td>
              <td className="px-6 py-4 text-neutral-400 text-sm">{row.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
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
  opacity?: number;
  translateX?: number;
  translateY?: number;
  scale?: number;
  rotate?: string; 
  width?: number;
  height?: number;
  backgroundColor?: string;
  borderRadius?: number;
  elevation?: number;
}`;

const transitionPropsCode = `export interface TransitionProps {
  type?: 'spring' | 'timing';
  duration?: number;
  damping?: number;
  stiffness?: number;
  mass?: number;
  delay?: number;
  repeat?: number | 'infinity';
}`;

const motionCompPropsCode = `export interface MotionComponentProps {
  initial?: AnimationProps | false;
  animate?: AnimationProps;
  exit?: AnimationProps;
  transition?: TransitionProps;
  styles?: ViewStyle;
}`;
