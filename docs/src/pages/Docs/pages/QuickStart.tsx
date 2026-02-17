import React from 'react';
import { Rocket, Check, Copy } from 'lucide-react';
import DocNavButtons from '../../../components/DocNavButtons';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { androidstudio } from 'react-syntax-highlighter/dist/esm/styles/hljs';

export default function QuickStart() {
  return (
    <div className="selection:bg-indigo-500/30 w-full h-[calc(100svh-80px)] overflow-y-auto selection:text-white-200 scroll-smooth">
      <div className="relative flex flex-col gap-24 mx-auto px-6 py-20 lg:py-32 max-w-5xl">
        {/* Header */}
        <header className="flex flex-col gap-4">
          <h1 className="bg-clip-text bg-linear-to-r from-white to-neutral-400 font-bold text-transparent text-5xl tracking-tighter">
            Quick Start
          </h1>
          <p className="max-w-2xl text-neutral-400 text-xl leading-relaxed">
            Forget declaring shared values for every animation. Let's get something moving on the
            screen without the headache.
          </p>
        </header>

        {/* Basic Animation */}
        <section id="basic-animation" className="flex flex-col gap-8 scroll-mt-32">
          <div className="flex items-center gap-4">
            <h2 className="bg-clip-text bg-linear-to-br from-white to-neutral-400 font-bold text-transparent text-3xl tracking-tight">
              Your first motion
            </h2>
          </div>

          <p className="text-neutral-400 text-lg">
            Import <code className="text-indigo-300">NativeMotion</code> and drop a View. It’s that
            simple. The library handles the interpolation and UI-thread handoff automatically.
          </p>

          <CodeWindow
            title="App.tsx"
            code={`import { NativeMotion } from 'motion-on-native';

export default function App() {
  return (
    <NativeMotion.View
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', damping: 15 }}
      style={{ width: 100, height: 100, backgroundColor: 'blue' }}
    />
  );
}`}
          />
        </section>

        {/* Exit Animations */}
        <section id="exit-animations" className="flex flex-col gap-8 scroll-mt-32">
          <div className="flex items-center gap-4">
            <h2 className="bg-clip-text bg-linear-to-br from-white to-neutral-400 font-bold text-transparent text-3xl tracking-tight">
              Handling the "Exit" (BETA)
            </h2>
          </div>

          <p className="text-neutral-400 text-lg">
            React just removes components out of existence. Use{' '}
            <code className="text-indigo-300">AnimatedExit</code> to let them animate properly.
          </p>

          <CodeWindow
            title="Presence.tsx"
            code={`import { NativeMotion, AnimatedExit } from 'motion-on-native';
export default function Presence() {
const [isVisible, setIsVisible] = useState(true); 

return (<AnimatedExit>
  {isVisible && (
    <NativeMotion.View
      animationId="modal" // Required for exit animations
      initial={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      exit={{ opacity: 0, translateY: 20 }}
    />
  )}
</AnimatedExit>)
}`}
          />
        </section>

        {/* Pro Tip Card */}
        <div className="bg-emerald-500/5 p-8 border border-emerald-500/10 rounded-3xl">
          <h4 className="flex items-center gap-2 mb-2 font-semibold text-emerald-400">
            <Rocket className="w-4 h-4" />
            Think Declaratively
          </h4>
          <p className="text-neutral-400">
            Don't worry about <span className="text-neutral-200">useSharedValue</span>. Just tell
            the component what it should look like in its{' '}
            <span className="text-indigo-300 italic">initial</span> and{' '}
            <span className="text-indigo-300 italic">animate</span> states. Motion On Native will
            handle the rest — no shared values, no manual timing, nothing. Just tell it what to do.
          </p>
        </div>

        <DocNavButtons
          previousSection={{
            title: 'Installation',
            subTitle: 'Get the package and dependencies',
            path: '/docs/get-started/installation',
          }}
          nextSection={{
            title: 'Motion Components',
            subTitle: 'Components currently offered',
            path: '/docs/core/native-motion',
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
      <div className="p-6 overflow-x-auto">
        <pre className="font-mono text-indigo-300/90 text-sm leading-relaxed">
          <SyntaxHighlighter
            language="js"
            style={androidstudio}
            customStyle={{
              background: 'rgba(0, 0, 0, 0)',
              borderRadius: '16px',
              padding: '20px',
              fontSize: '13px',
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
