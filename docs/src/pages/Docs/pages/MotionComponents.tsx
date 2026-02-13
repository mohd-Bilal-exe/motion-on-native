import React from 'react';
import { Check, Copy, Package } from 'lucide-react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { androidstudio } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import DocNavButtons from '../../../components/DocNavButtons';

export default function MotionComponents() {
  const codeExample = `import { Text } from 'react-native'
import { NativeMotion } from 'motion-on-native';

// Use it just like a standard View
<NativeMotion.View
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }} 
>
  <Text className="text-white">
    Hello World
  </Text>
</NativeMotion.View>`;

  const availableComponents = [
    { name: 'View', type: 'Layout' },
    { name: 'Text', type: 'Typography' },
    { name: 'Image', type: 'Media' },
    { name: 'Pressable', type: 'Interaction' },
    { name: 'SectionList', type: 'List' },
    { name: 'TextInput', type: 'Input' },
    { name: 'ImageBackground', type: 'Media' },
    { name: 'TouchableOpacity', type: 'Interaction' },
  ];

  return (
    <div className="selection:bg-indigo-500/30 w-full h-[calc(100svh-80px)] overflow-y-auto selection:text-white-200 scroll-smooth">
      <div className="relative flex flex-col gap-20 mx-auto px-6 py-20 lg:py-32 max-w-5xl">
        <header className="flex flex-col gap-4">
          <div className="flex items-center gap-2 font-mono text-indigo-400 text-sm uppercase tracking-widest">
            <span>Core Components</span>
          </div>
          <h1 className="bg-clip-text bg-linear-to-r from-white to-neutral-500 font-bold text-transparent text-5xl tracking-tighter">
            Motion Components
          </h1>
          <p className="max-w-2xl text-neutral-400 text-xl leading-relaxed">
            I’ve wrapped the standard React Native components. Every component below is optimized to
            handle declarative props without touching the JS thread.
          </p>
        </header>

        {/* The Implementation Example */}
        <section className="flex flex-col gap-6">
          <h3 className="font-semibold text-white text-2xl tracking-tight">Usage</h3>
          <CodeWindow title="BasicComponent.tsx" code={codeExample} />
        </section>

        {/* The Grid of Components */}
        <section className="flex flex-col gap-8">
          <div className="flex items-center gap-3">
            <Package className="text-neutral-500" size={24} />
            <h2 className="font-bold text-white text-3xl tracking-tight">Available Components</h2>
          </div>

          <div className="gap-3 grid grid-cols-2 md:grid-cols-3">
            {availableComponents.map(comp => (
              <div
                key={comp.name}
                className="group bg-black-900/20 hover:bg-neutral-900/40 p-4 border border-neutral-800 rounded-xl transition-all cursor-default"
              >
                <div className="mb-1 font-bold text-[10px] text-neutral-500 group-hover:text-indigo-400 uppercase tracking-wider transition-colors">
                  {comp.type}
                </div>
                <div className="font-mono text-neutral-200 text-sm">
                  NativeMotion.<span className="font-bold text-md text-white">{comp.name}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* The "Anything Else" Tip */}
        <div className="bg-indigo-500/5 p-8 border border-indigo-500/10 rounded-3xl">
          <p className="text-neutral-400 text-lg leading-relaxed">
            Need something that isn't here? Most custom components can be animated by wrapping them
            in a<code className="mx-2 font-mono text-indigo-300">NativeMotion.View</code>. We keep
            the list lean to ensure performance doesn't take a hit.
          </p>
        </div>

        <DocNavButtons
          previousSection={{
            title: 'Quick Start',
            subTitle: 'First animation in 60 seconds',
            path: '/docs/get-started/quick-start',
          }}
          nextSection={{
            title: 'Animation Props',
            subTitle: 'What you can actually move',
            path: '/docs/core/animation-props',
          }}
        />
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
