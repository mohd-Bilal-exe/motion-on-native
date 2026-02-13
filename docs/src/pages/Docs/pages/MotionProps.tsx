import React from 'react';
import { Box, Layers, Move, Palette, Info } from 'lucide-react';
import DocNavButtons from '../../../components/DocNavButtons';

export default function MotionProps() {
  return (
    <div className="selection:bg-indigo-500/30 w-full h-[calc(100svh-80px)] overflow-y-auto selection:text-white-200 scroll-smooth">
      <div className="relative flex flex-col gap-20 mx-auto px-6 py-20 lg:py-32 max-w-5xl">
        {/* Header */}
        <header className="flex flex-col gap-4">
          <h1 className="bg-clip-text bg-linear-to-r from-white to-neutral-400 font-bold text-transparent text-5xl tracking-tighter">
            Animation Props
          </h1>
          <p className="max-w-2xl text-neutral-400 text-xl leading-relaxed">
            The <code className="text-indigo-300">animate</code> prop is reactive. When you update
            the object passed to it, the library bridges the gap between the current state and the
            target state on the native thread.
          </p>
        </header>

        {/* The Reactive Concept */}
        <div className="flex items-start gap-6 bg-indigo-500/5 p-8 border border-indigo-500/10 rounded-3xl">
          <div className="bg-indigo-500/10 p-3 rounded-2xl text-indigo-400 shrink-0">
            <Info size={24} />
          </div>
          <div>
            <h4 className="mb-1 font-mono font-bold text-white text-lg">Reactive by design</h4>
            <p className="text-neutral-400 leading-relaxed">
              You don't trigger animations. You describe the current state. If{' '}
              <code className="text-neutral-200">isVisible</code> toggles, the component sees the
              change in the <code className="font-mono text-indigo-300">animate</code> prop and
              performs the work.
            </p>
          </div>
        </div>

        {/* Property Groups */}
        <div className="flex flex-col gap-16">
          <PropGroup
            title="Transforms"
            icon={<Move className="text-blue-400" size={20} />}
            props={[
              'opacity',
              'translateX',
              'translateY',
              'scale',
              'scaleX',
              'scaleY',
              'rotate',
              'rotateX',
              'rotateY',
              'rotateZ',
              'skewX',
              'skewY',
            ]}
            description="The most performant properties. These run entirely on the GPU via the native thread."
          />

          <PropGroup
            title="Layout"
            icon={<Layers className="text-emerald-400" size={20} />}
            props={['width', 'height', 'top', 'bottom', 'left', 'right', 'zIndex']}
            description="Changing layout properties can be expensive. Use these sparingly for complex animations."
          />

          <PropGroup
            title="Styling"
            icon={<Palette className="text-fuchsia-400" size={20} />}
            props={[
              'backgroundColor',
              'borderRadius',
              'borderWidth',
              'borderColor',
              'shadowOpacity',
              'shadowRadius',
              'elevation',
            ]}
            description="Note: Color interpolation is currently in beta. Motion on Native use Reanimated's interpolation under the hood."
          />

          <PropGroup
            title="Spacing"
            icon={<Box className="text-orange-400" size={20} />}
            props={[
              'margin',
              'marginTop',
              'marginBottom',
              'marginLeft',
              'marginRight',
              'padding',
              'paddingTop',
              'paddingBottom',
            ]}
            description="Animatable spacing for those rare cases where you need to shift content flow."
          />
        </div>

        <DocNavButtons
          previousSection={{
            title: 'Motion Components',
            subTitle: 'Primitives you can animate',
            path: '/docs/core/native-motion',
          }}
          nextSection={{
            title: 'Animation Behaviour',
            subTitle: 'Springs, Timing, and Delays',
            path: '/docs/core/animation-behaviour',
          }}
        />
      </div>
    </div>
  );
}

function PropGroup({
  title,
  icon,
  props,
  description,
}: {
  title: string;
  icon: React.ReactNode;
  props: string[];
  description: string;
}) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <div className="bg-neutral-900 p-2 border border-neutral-800 rounded-lg">{icon}</div>
        <h3 className="font-bold text-white text-2xl tracking-tight">{title}</h3>
      </div>
      <p className="max-w-2xl text-neutral-500 text-lg">{description}</p>
      <div className="flex flex-wrap gap-2">
        {props.map(p => (
          <span
            key={p}
            className="bg-neutral-900/50 px-3 py-1.5 border border-neutral-800 rounded-lg font-mono text-neutral-300 text-sm"
          >
            {p}
          </span>
        ))}
      </div>
    </div>
  );
}
