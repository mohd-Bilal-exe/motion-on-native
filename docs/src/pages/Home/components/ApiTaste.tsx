import { Copy } from 'lucide-react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { androidstudio } from 'react-syntax-highlighter/dist/esm/styles/hljs';
export default function APITaste() {
  return (
    <section className="z-100 mx-auto px-6 py-24 w-full max-w-5xl">
      <div className="mb-12 text-center">
        <h2 className="font-bold text-3xl space-grotesk">A Sane API</h2>
        <p className="text-white/40">
          Powerful enough for complex UI. Simple enough for a Friday afternoon.
        </p>
      </div>

      <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
        {/* Basic Snippet */}
        <CodeCard
          title="Basic Animation"
          code={`<NativeMotion.View
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ type: 'spring' }}
/>`}
        />

        {/* Variants Snippet */}
        <CodeCard
          title="Default entry/exit"
          code={`import {fadeIn, fadeOut} from "reaniated"

<NativeMotion.View 
  animate={x:200}
  presenceAnimation={{entry:fadeIn, exit:fadeOut}} 
  //this overrides animate
/>`}
        />

        {/* Layout Snippet */}
        <CodeCard
          title="Layout & Presence"
          className="md:col-span-2"
          code={`<AnimatedExit mode="wait">
  {show && (
    <NativeMotion.View
      exit={{ opacity: 0, height: 0 }}
      transition={{ type: 'timing', duration: 300 }}
    />
  )}
</AnimatedExit>`}
        />
      </div>
    </section>
  );
}

function CodeCard({ title, code, className }: any) {
  return (
    <div className={`bg-white-200/5 border border-white/10 rounded-3xl p-6 space-y-4 ${className}`}>
      <div className="flex justify-between items-center px-1">
        <span className="font-bold text-white/60 text-xs uppercase tracking-widest">{title}</span>
        <Copy className="size-4 text-white/20 hover:text-white transition-colors cursor-pointer" />
      </div>
      <SyntaxHighlighter
        language="tsx"
        style={androidstudio}
        customStyle={{
          background: 'rgba(0, 0, 0, 0.5)',
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
    </div>
  );
}
