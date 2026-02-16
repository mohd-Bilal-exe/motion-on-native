import { Brain, Cpu, Activity, AlertTriangle, Layers, Code2, Sparkles } from 'lucide-react';
import DocNavButtons from '../../../components/DocNavButtons';

export default function MentalModel() {
  return (
    <div className="selection:bg-indigo-500/30 w-full h-[calc(100svh-80px)] overflow-y-auto selection:text-white-200 scroll-smooth">
      <div className="relative flex flex-col gap-24 mx-auto px-6 py-20 lg:py-32 max-w-5xl">
        {/* Header */}
        <header className="flex flex-col gap-4">
          <div className="flex items-center gap-2 font-mono text-indigo-400 text-sm uppercase tracking-widest">
            <Brain size={16} />
            <span>Under the hood</span>
          </div>
          <h1 className="bg-clip-text bg-linear-to-br from-white to-neutral-400 font-bold text-transparent text-5xl tracking-tighter">
            The Mental Model
          </h1>
          <p className="max-w-2xl text-neutral-400 text-xl leading-relaxed">
            Not sugar coating or trying to hide the complexity. Here is exactly how your props
            becomes animation.
          </p>
        </header>
        <section className="relative bg-yellow-500/5 p-8 lg:p-12 border border-yellow-500/20 rounded-3xl overflow-hidden">
          <div className="-top-20 -left-20 absolute bg-yellow-500/10 blur-[80px] rounded-full w-64 h-64" />

          <div className="relative flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="flex justify-center items-center bg-yellow-950/50 border border-yellow-500/30 rounded-xl w-10 h-10">
                <Sparkles className="w-5 h-5 text-yellow-400" />
              </div>
              <h3 className="font-bold text-white text-2xl tracking-tight">I'm Still Cookin'</h3>
            </div>

            <div className="flex flex-col gap-4">
              <p className="max-w-3xl text-neutral-300 text-xl leading-relaxed">
                I’m still diving deep into the internals of Reanimated and React Native. This
                library is as much a learning journey for me as it is a tool for you.
              </p>

              <p className="max-w-2xl text-neutral-400 text-lg">
                The current <span className="font-semibold">"Shared Value Factory"</span> approach
                works, but it's just the beginning. I'm actively looking into more aggressive
                optimizations—like <span className="font-bold">dynamic value injection </span>
                and <span className="font-bold">proxy-based tracking</span> — to cut down the memory
                footprint without losing that clean declarative API.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 mt-4">
              <div className="flex items-center gap-2 bg-neutral-900/50 px-4 py-2 border border-neutral-800 rounded-full text-neutral-400 text-sm">
                <div className="bg-yellow-500 rounded-full w-1.5 h-1.5 animate-pulse" />
                Shared Value Refinement
              </div>
              <div className="flex items-center gap-2 bg-neutral-900/50 px-4 py-2 border border-neutral-800 rounded-full text-neutral-400 text-sm">
                <div className="bg-amber-500 rounded-full w-1.5 h-1.5 animate-pulse" />
                Layout Transition Research
              </div>
            </div>
          </div>
        </section>
        {/* The Factory Logic */}
        <section className="flex flex-col gap-8">
          <div className="flex items-center gap-4">
            <div className="flex justify-center items-center bg-neutral-900 border border-neutral-800 rounded-xl w-10 h-10">
              <Layers className="w-5 h-5 text-accent-blue" />
            </div>
            <h2 className="font-bold text-white text-3xl tracking-tight">
              The Shared Value Registry
            </h2>
          </div>

          <p className="text-neutral-400 text-lg leading-relaxed">
            Every component instance maintains a persistent{' '}
            <code className="text-indigo-300">useRef</code> object containing over 50+
            pre-initialized Shared Values. This is the "Engine Room."
          </p>

          <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
            <div className="bg-neutral-900/30 p-8 border border-neutral-800 rounded-3xl">
              <h4 className="mb-3 font-bold text-white">Hot Standby</h4>
              <p className="text-neutral-500 leading-relaxed">
                By pre-allocating shared values for everything from{' '}
                <code className="text-indigo-200">skewX</code> to{' '}
                <code className="text-indigo-200">paddingBottom</code>, we eliminate the need to
                dynamically inject hooks, which React doesn't allow anyway.
              </p>
            </div>
            <div className="bg-neutral-900/30 p-8 border border-neutral-800 rounded-3xl">
              <h4 className="mb-3 font-bold text-white">Prop Proxying</h4>
              <p className="text-neutral-500 leading-relaxed">
                When your <code className="text-indigo-200">animate</code> prop changes, a
                specialized <code className="text-indigo-200">animateToValues</code> function diffs
                the new object and dispatches Reanimated worklets to the relevant shared values.
              </p>
            </div>
          </div>
        </section>

        {/* Color Interpolation Logic */}
        <section className="flex flex-col gap-8">
          <div className="flex items-center gap-4">
            <div className="flex justify-center items-center bg-neutral-900 border border-neutral-800 rounded-xl w-10 h-10">
              <Code2 className="w-5 h-5 text-fuchsia-400" />
            </div>
            <h2 className="font-bold text-white text-3xl tracking-tight">
              Complex Property Mapping
            </h2>
          </div>
          <p className="text-neutral-400 text-lg leading-relaxed">
            Properties like colors and rotations aren't just numbers—they require interpolation. We
            manage specialized "Progress" values and "Target" values to handle the math:
          </p>
          <div className="bg-[#0d0d0d] p-6 border border-neutral-800 rounded-2xl font-mono text-indigo-300 text-sm">
            // We track progress from 0 to 1 <br />
            style[key] = interpolateColor(progress.value, [0, 1], [fromColor, toColor]);
          </div>
        </section>

        {/* The Trade-offs */}
        <section className="flex flex-col gap-8">
          <div className="flex items-center gap-4">
            <div className="flex justify-center items-center bg-neutral-900 border border-neutral-800 rounded-xl w-10 h-10">
              <AlertTriangle className="w-5 h-5 text-orange-500" />
            </div>
            <h2 className="font-bold text-white text-3xl tracking-tight">The Brutal Honesty</h2>
          </div>

          <div className="flex flex-col gap-6">
            <p className="text-neutral-400 text-lg leading-relaxed">
              We traded memory for DX. Here is why:
            </p>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="bg-neutral-800 mt-1 p-1 rounded text-neutral-500">
                  <Activity size={14} />
                </div>
                <div>
                  <h5 className="font-bold text-neutral-200">Memory Footprint</h5>
                  <p className="text-neutral-500 leading-relaxed">
                    Initializing ~50 shared values per component uses more RAM than a manual
                    Reanimated setup. For modern devices, this is a non-issue, but for a list of
                    5,000 items, you might want to use standard{' '}
                    <code className="text-neutral-300">Animated.View</code>.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="bg-neutral-800 mt-1 p-1 rounded text-neutral-500">
                  <Cpu size={14} />
                </div>
                <div>
                  <h5 className="font-bold text-neutral-200">The Effect Lag</h5>
                  <p className="text-neutral-500 leading-relaxed">
                    Animations are triggered via <code className="text-neutral-300">useEffect</code>
                    . This means there is a microscopic delay (one JS frame) before the animation
                    begins on the UI thread. It's the only way to keep the API truly declarative.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </section>

        <DocNavButtons
          previousSection={{
            title: 'Overview',
            subTitle: 'What is this all about?',
            path: '/docs/get-started/overview',
          }}
          nextSection={{
            title: 'Quick Start',
            subTitle: 'Start animating now',
            path: '/docs/get-started/quick-start',
          }}
        />
      </div>
    </div>
  );
}
