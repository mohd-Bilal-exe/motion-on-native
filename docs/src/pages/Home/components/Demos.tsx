import { motion, AnimatePresence } from 'motion/react';
import { useState, useMemo } from 'react';
import { Settings2, Code, Copy, Check, RotateCcw, ChevronDown } from 'lucide-react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { gruvboxDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

type Tab = 'entry' | 'layout' | 'transform' | 'entry-exit' | 'color';

const TABS: Tab[] = ['entry', 'layout', 'transform', 'entry-exit', 'color'];
const COLORS = ['#4f68cb', '#e11d48', '#10b981', '#f59e0b'];

export default function InteractivePlayground() {
  const [activeTab, setActiveTab] = useState<Tab>('transform');
  const [stiffness, setStiffness] = useState(100);
  const [damping, setDamping] = useState(15);
  const [mass, setMass] = useState(1);
  const [copied, setCopied] = useState(false);
  const [isMounted, setIsMounted] = useState(true);
  const [colorValue, setColorValue] = useState('#4f68cb');

  const [transformState, setTransformState] = useState({ prop: 'translateX', value: 0 });
  const [layoutState, setLayoutState] = useState({ prop: 'width', value: 128 });

  const transitionCode = useMemo(() => {
    const config = `transition={{ type: 'spring', stiffness: ${stiffness}, damping: ${damping}, mass: ${mass} }}`;

    switch (activeTab) {
      case 'entry':
        return `<NativeMotion.View\n  initial={{ opacity: 0, scale: 0.5 }}\n  animate={{ opacity: 1, scale: 1 }}\n  ${config}\n/>`;
      case 'transform':
        return `<NativeMotion.View\n  animate={{ ${transformState.prop}: ${transformState.value} }}\n  ${config}\n/>`;
      case 'entry-exit':
        return `<AnimatedExit>\n  {isVisible && (\n    <NativeMotion.View\n      exit={{ opacity: 0, scale: 0.5 }}\n      ${config}\n    />\n  )}\n</AnimatedExit>`;
      case 'color':
        return `<NativeMotion.View\n  animate={{ backgroundColor: '${colorValue}' }}\n  ${config}\n/>`;
      case 'layout':
        return `<NativeMotion.View
  animate={{ 
    ${layoutState.prop}: ${layoutState.value}
  }}
  transition={{ type: 'spring', stiffness: ${stiffness}, damping: ${damping} }}
/>`;
      default:
        return '';
    }
  }, [activeTab, stiffness, damping, mass, transformState, layoutState, colorValue]);
  const copyToClipboard = () => {
    navigator.clipboard.writeText(transitionCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="z-100 mx-auto px-4 sm:px-6 py-16 sm:py-24 w-full max-w-7xl">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h2 className="font-bold text-2xl sm:text-3xl tracking-tight space-grotesk">
            Interactive Playground
          </h2>
          <p className="max-w-xl text-white/40 text-sm sm:text-base">
            Get the gist of Motion on Native. Real-time spring physics powered by Reanimated.
          </p>
        </div>

        {/* Tabs Navigation */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2 bg-white-200/5 p-1.5 border border-white/10 rounded-2xl w-full sm:w-fit overflow-x-auto">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as Tab)}
              className={`px-3 sm:px-4 py-2 rounded-xl text-[10px] sm:text-xs font-bold transition-all uppercase tracking-widest whitespace-nowrap ${
                activeTab === tab
                  ? 'bg-accent-blue text-white-200 shadow-lg'
                  : 'text-white/40 hover:text-white-200 hover:bg-white-200/5'
              }`}
            >
              {tab === 'color' ? 'Color (Beta)' : tab.replace('-', '/')}
            </button>
          ))}
        </div>

        <div className="gap-6 grid grid-cols-1 lg:grid-cols-12">
          {/* Preview Canvas */}
          <div className="group relative flex flex-col justify-center items-center lg:col-span-7 bg-white-200/5 backdrop-blur-xl border border-white/10 rounded-4xl min-h-100 sm:min-h-125 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] via-transparent to-transparent from-accent-blue/5" />

            <AnimatePresence mode="wait">
              {isMounted && (
                <motion.div
                  key={activeTab}
                  initial={
                    activeTab === 'entry' || activeTab === 'entry-exit'
                      ? { opacity: 0, scale: 0.5 }
                      : false
                  }
                  animate={{
                    opacity: 1,
                    width:
                      activeTab === 'layout' &&
                      (layoutState.prop === 'size' || layoutState.prop === 'width')
                        ? layoutState.value
                        : 128,
                    height:
                      activeTab === 'layout' &&
                      (layoutState.prop === 'size' || layoutState.prop === 'height')
                        ? layoutState.value
                        : 128,
                    borderRadius:
                      activeTab === 'layout' && layoutState.prop === 'borderRadius'
                        ? layoutState.value
                        : 24,
                    scale:
                      activeTab === 'layout' && layoutState.prop === 'scale'
                        ? layoutState.value
                        : 1,
                    x:
                      activeTab === 'transform' && transformState.prop === 'translateX'
                        ? transformState.value
                        : 0,
                    rotate:
                      activeTab === 'transform' && transformState.prop === 'rotate'
                        ? transformState.value
                        : 0,
                    backgroundColor: activeTab === 'color' ? colorValue : '#4f68cb',
                    [transformState.prop]: activeTab === 'transform' ? transformState.value : '',
                  }}
                  exit={
                    activeTab === 'entry-exit' ? { opacity: 0, scale: 0.5, rotate: 15 } : undefined
                  }
                  transition={{ type: 'spring', stiffness, damping, mass }}
                  className="flex justify-center items-center shadow-[0_0_50px_-12px_rgba(79,104,203,0.5)] rounded-3xl size-32"
                  style={{ backgroundColor: '#4f68cb' }}
                ></motion.div>
              )}
            </AnimatePresence>

            {/* Contextual Controls based on Tab */}
            <div className="bottom-4 sm:bottom-8 absolute flex flex-col gap-4 px-4 sm:px-10 w-full">
              {activeTab === 'transform' && (
                <div className="flex sm:flex-row flex-col items-stretch sm:items-end gap-3 sm:gap-4">
                  <div className="flex flex-col flex-1 gap-2">
                    <div className="flex justify-between font-mono text-[10px] text-white/40 uppercase">
                      <span>{transformState.prop}</span>
                      <span>{transformState.value}</span>
                    </div>
                    <input
                      type="range"
                      min="-120"
                      max="120"
                      value={transformState.value}
                      onChange={e =>
                        setTransformState({ ...transformState, value: parseInt(e.target.value) })
                      }
                      className="w-full accent-accent-blue"
                    />
                  </div>
                  <div className="group/select relative w-full sm:w-auto">
                    <select
                      value={transformState.prop}
                      onChange={e => setTransformState({ prop: e.target.value, value: 0 })}
                      className="bg-white/10 hover:bg-white/20 px-4 py-2 pr-10 border border-white/10 rounded-xl outline-none w-full font-bold text-white text-xs appearance-none cursor-pointer"
                    >
                      <option value="translateX" className="bg-[#0D0D0D]">
                        Translate X
                      </option>
                      <option className="bg-[#0D0D0D]" value="translateY">
                        Translate Y
                      </option>
                      <option className="bg-[#0D0D0D]" value="rotate">
                        Rotate
                      </option>
                      <option className="bg-[#0D0D0D]" value="scale">
                        Scale
                      </option>
                      <option className="bg-[#0D0D0D]" value="skewX">
                        Skew X
                      </option>
                    </select>
                    <ChevronDown className="top-2.5 right-3 absolute size-4 text-white/40 pointer-events-none" />
                  </div>
                </div>
              )}
              {activeTab === 'layout' && (
                <div className="flex flex-col gap-4 px-1 w-full">
                  <div className="flex sm:flex-row flex-col items-stretch sm:items-end gap-3 sm:gap-4">
                    {/* Property Slider */}
                    <div className="flex flex-col flex-1 gap-2">
                      <div className="flex justify-between font-mono text-[10px] text-white/40 uppercase tracking-widest">
                        <span>{layoutState.prop}</span>
                        <span>
                          {layoutState.value}
                          {layoutState.prop === 'scale' ? 'x' : 'px'}
                        </span>
                      </div>
                      <input
                        type="range"
                        min={layoutState.prop === 'scale' ? '0.5' : '0'}
                        max={layoutState.prop === 'scale' ? '2' : '240'}
                        step={layoutState.prop === 'scale' ? '0.1' : '1'}
                        value={layoutState.value}
                        onChange={e =>
                          setLayoutState({ ...layoutState, value: parseFloat(e.target.value) })
                        }
                        className="w-full accent-accent-blue"
                      />
                    </div>

                    <div className="group/select relative w-full sm:w-auto">
                      <select
                        value={layoutState.prop}
                        onChange={e => {
                          const val = e.target.value;
                          const defaultValue =
                            val === 'scale' ? 1 : val === 'borderRadius' ? 24 : 128;
                          setLayoutState({ prop: val, value: defaultValue });
                        }}
                        className="bg-white/10 hover:bg-white/20 px-4 py-2 pr-10 border border-white/10 rounded-xl outline-none w-full font-bold text-white text-xs appearance-none cursor-pointer"
                      >
                        <optgroup label="Dimensions" className="bg-[#0D0D0D]">
                          <option value="width">Width</option>
                          <option value="height">Height</option>
                          <option value="size">Size (Both)</option>
                        </optgroup>
                        <optgroup label="Styling" className="bg-[#0D0D0D]">
                          <option value="borderRadius">Border Radius</option>
                          <option value="scale">Scale Multiplier</option>
                        </optgroup>
                      </select>
                      <ChevronDown className="top-2.5 right-3 absolute size-4 text-white/40 pointer-events-none" />
                    </div>
                  </div>

                  <p className="text-[9px] text-white/20 sm:text-[10px] italic">
                    * Animating layout properties on Native triggers UI thread layout passes via
                    Reanimated.
                  </p>
                </div>
              )}
              {activeTab === 'entry-exit' && (
                <button
                  onClick={() => setIsMounted(!isMounted)}
                  className="bg-white/10 hover:bg-white/20 py-2.5 sm:py-3 border border-white/10 rounded-2xl w-full font-bold text-[10px] sm:text-xs uppercase tracking-[0.2em] transition-all"
                >
                  {isMounted ? 'Unmount Component' : 'Mount Component'}
                </button>
              )}
              {activeTab === 'color' && (
                <div className="flex flex-col gap-2">
                  <span className="font-mono text-[9px] text-white/40 sm:text-[10px] uppercase">
                    Pick Interpolation Target{' '}
                  </span>
                  <div className="flex gap-2 sm:gap-3">
                    {COLORS.map(c => (
                      <button
                        key={c}
                        onClick={() => setColorValue(c)}
                        className="border-2 border-white/10 rounded-full size-7 sm:size-8 active:scale-90 transition-transform"
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </div>
                  <span className="mt-2 font-mono text-[8px] text-white/40 sm:text-[9px] italics">
                    *Interpolation of colors are simulated through web api Native results mayn vary.
                  </span>
                </div>
              )}
            </div>

            <button
              onClick={() => {
                setTransformState({ prop: 'translateX', value: 0 });
                setLayoutState({ prop: 'width', value: 128 });
                setStiffness(100);
                setDamping(15);
                setMass(1);
                setIsMounted(true);
              }}
              className="top-4 sm:top-6 right-4 sm:right-8 absolute bg-white/5 hover:bg-white/10 p-2 rounded-full text-white/40 transition-all"
            >
              <RotateCcw className="size-4" />
            </button>
          </div>

          {/* Controls & Code */}
          <div className="flex flex-col gap-6 lg:col-span-5">
            <div className="space-y-6 bg-white-200/5 p-4 sm:p-8 border border-white/10 rounded-4xl">
              <div className="flex items-center gap-2 mb-2">
                <Settings2 className="size-3.5 sm:size-4 text-accent-blue" />
                <span className="font-bold text-[10px] text-white/60 sm:text-xs uppercase tracking-widest">
                  Physics
                </span>
              </div>
              {activeTab === 'color' ? (
                <span className="mt-2 font-mono text-white/40 text-xs sm:text-sm italics">
                  Spring physics is diabled in colors for better transitional behaviour.
                </span>
              ) : (
                <>
                  <Slider
                    label="Stiffness"
                    value={stiffness}
                    min={1}
                    max={500}
                    onChange={setStiffness}
                  />
                  <Slider label="Damping" value={damping} min={1} max={50} onChange={setDamping} />
                  <Slider
                    label="Mass"
                    value={mass}
                    min={0.1}
                    max={10}
                    step={0.1}
                    onChange={setMass}
                  />
                </>
              )}
            </div>

            <div className="group relative bg-white-200/5 p-4 sm:p-6 border border-white/10 rounded-4xl">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2 text-white/40">
                  <Code className="size-3.5 sm:size-4" />
                  <span className="font-bold text-[9px] sm:text-[10px] uppercase tracking-widest">
                    Usage
                  </span>
                </div>
                <button
                  onClick={copyToClipboard}
                  className="bg-white/5 hover:bg-white/10 p-1.5 sm:p-2 rounded-lg text-white/60 transition-all"
                >
                  {copied ? (
                    <Check className="size-3.5 sm:size-4 text-green-400" />
                  ) : (
                    <Copy className="size-3.5 sm:size-4" />
                  )}
                </button>
              </div>
              <pre className="overflow-x-auto font-mono text-[11px] sm:text-[13px] leading-relaxed text-accent-blue">
                <SyntaxHighlighter
                  language="tsx"
                  style={gruvboxDark}
                  customStyle={{
                    background: 'rgba(0, 0, 0, 0.5)',
                    borderRadius: '16px',
                    padding: '12px',
                    fontSize: '11px',
                    lineHeight: '1.6',
                    margin: 0,
                  }}
                  showLineNumbers={false}
                  wrapLines={true}
                >
                  {transitionCode}
                </SyntaxHighlighter>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Slider({ label, value, min, max, step = 1, onChange }: any) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between font-mono text-[10px] sm:text-[11px]">
        <span className="text-white/30 uppercase">{label}</span>
        <span className="text-white">{value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={e => onChange(parseFloat(e.target.value))}
        className="bg-white/10 rounded-lg w-full h-1 accent-accent-blue appearance-none cursor-pointer"
      />
    </div>
  );
}
