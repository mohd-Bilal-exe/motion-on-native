import { motion } from 'motion/react';
import { Zap, Brain, Rocket } from 'lucide-react';

export default function HowItWorks() {
  return (
    <section className="z-100 relative mx-auto px-6 py-32 w-full max-w-6xl overflow-hidden">
      <div className="items-center gap-16 grid grid-cols-1 lg:grid-cols-2">
        {/* Left: The Narrative */}
        <div className="space-y-10">
          <div className="space-y-4">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="font-bold text-4xl md:text-5xl tracking-tight space-grotesk"
            >
              The Mental Model Shift
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-white/50 text-lg leading-relaxed"
            >
              Stop thinking in{' '}
              <code className="px-1 rounded bg-accent-blue/10 text-accent-blue">SharedValues</code>{' '}
              and complex timelines. Describe <strong>what</strong> should happen; motion on native
              handle <strong>how</strong> it runs.
            </motion.p>
          </div>

          <div className="space-y-8">
            <ConceptItem
              icon={<Brain className="size-5 text-accent-blue" />}
              title="Declarative Intent"
              desc="Move away from declaring different hooks for different props. If your state changes, your UI moves. Automatically!"
            />
            <ConceptItem
              icon={<Zap className="size-5 text-yellow-400" />}
              title="Native-First Execution"
              desc="Your animations aren't fighting for the performance. Reanimated under the hood handles it all."
            />
            <ConceptItem
              icon={<Rocket className="size-5 text-green-400" />}
              title="Zero Configuration"
              desc="Smart physical defaults out of the box. No more 'tuning' stiffness for 4 hours just to make a button feel real."
            />
          </div>
        </div>

        {/* Right: The Architecture Stack Visual */}
        <div className="relative flex justify-center items-center h-125">
          <div className="flex flex-col gap-4 w-full max-w-[320px]">
            <StackLayer
              label="Your Component"
              active
              desc="initial={{ opacity: 0 }} animate={{ opacity: 1 }}"
              delay={0}
            />
            <div className="flex justify-center h-8">
              <div className="bg-linear-to-b to-transparent w-px from-accent-blue" />
            </div>
            <StackLayer
              label="Motion On Native"
              highlight
              desc="Prop-to-Worklet Translation Engine"
              delay={0.2}
            />
            <div className="flex justify-center h-8">
              <div className="bg-white/10 w-px" />
            </div>
            <StackLayer
              label="Reanimated 3"
              dim
              desc="Native Driver & Gesture Handler"
              delay={0.4}
            />
            <div className="flex justify-center h-8">
              <div className="bg-white/5 w-px" />
            </div>
            <StackLayer label="iOS / Android" dim desc="60/120Hz Native OS Layout" delay={0.6} />
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="bg-white-200/2 backdrop-blur-lg mt-24 p-4 border border-white-200/10 rounded-[2.5rem] text-center"
      >
        <p className="font-medium text-white/40 italic">
          "Motion on Native removes the boilerplate headache, allows you to focus on actually
          building the animations."
        </p>
      </motion.div>
    </section>
  );
}

function ConceptItem({ icon, title, desc }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex gap-5"
    >
      <div className="bg-white/5 mt-1 p-3 border border-white/10 rounded-2xl h-fit shrink-0">
        {icon}
      </div>
      <div className="space-y-1">
        <h4 className="font-bold text-white/90">{title}</h4>
        <p className="text-white/40 text-sm leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  );
}

function StackLayer({ label, desc, active, dim, highlight, delay }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      viewport={{ once: true }}
      className={`
        p-6 rounded-3xl border transition-all duration-500 backdrop-blur-lg
        ${active ? 'text-white-200 bg-white-200/5 border-black-800' : ''}
        ${highlight ? 'bg-accent-blue text-white-200 border-accent-blue shadow-[0_0_30px_rgba(79,104,203,0.3)] scale-105 z-10' : ''}
        ${dim ? 'bg-white-200/5 text-white/40 border-white/5' : ''}
      `}
    >
      <h5 className="font-bold text-sm tracking-tight">{label}</h5>
      <p
        className={`text-[10px] mt-1 font-mono uppercase tracking-wider ${active ? 'text-white-200/50' : 'opacity-40'}`}
      >
        {desc}
      </p>
    </motion.div>
  );
}
