import { Copy } from 'lucide-react';

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
          title="Variants System"
          code={`const variants = {
  hidden: { x: -20, opacity: 0 },
  visible: { x: 0, opacity: 1 }
}

<NativeMotion.View 
  animate={isOpen ? 'visible' : 'hidden'}
  variants={variants}
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
    <div className={`bg-[#0A0A0A] border border-white/10 rounded-3xl p-6 space-y-4 ${className}`}>
      <div className="flex justify-between items-center px-1">
        <span className="font-bold text-white/60 text-xs uppercase tracking-widest">{title}</span>
        <Copy className="size-4 text-white/20 hover:text-white transition-colors cursor-pointer" />
      </div>
      <pre className="bg-black/40 p-5 rounded-2xl overflow-x-auto font-mono text-[13px] leading-relaxed text-accent-blue">
        <code>{code}</code>
      </pre>
    </div>
  );
}
