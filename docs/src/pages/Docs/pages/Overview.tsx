import React from 'react';
import { Flame, Zap, Lightbulb } from 'lucide-react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { androidstudio } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { useResponsive } from '../../../hooks/useResponsive';

export default function Overview() {
  const isMobile = useResponsive();
  return (
    <div className="w-full h-[calc(100svh-80px)] overflow-y-auto selection:bg-accent-blue/30 scroll-smooth">
      <div className="relative flex flex-col gap-10 md:gap-28 mx-auto px-6 py-20 lg:py-32 max-w-5xl">
        <Section
          id="the-pain"
          heading="The Pain"
          icon={<Flame className="w-5 h-5 text-orange-500" />}
          content="React Native animations are powerful with Reanimated, sure. But the hassle you deal with for a simple transition is absurd."
          bullets={[
            'Shared value boilerplate that clutters your component',
            'Manual spring/timing configs for every single property',
            'Doing the exact same setup for the 100th time',
          ]}
        />

        <Section
          id="the-friction"
          heading="The Friction"
          icon={<Zap className="w-5 h-5 text-yellow-400" />}
          content="The problem isn’t Reanimated — it's freakin' amazing."
          bullets={[
            'Cognitive overhead from managing animation lifecycles',
            'Logic scattered across hooks, effects, and styles',
            'Your actual intent gets lost in implementation details',
          ]}
        />

        <Section
          id="the-idea"
          heading="The Idea"
          icon={<Lightbulb className="w-5 h-5 text-indigo-400" />}
          content="What if animations were just... props? Describe where the view should be, and let Motion on Native figure out the interpolation. No shared values, no manual wiring, no headaches."
        >
          <div className="group relative mt-4">
            <div className="relative bg-[#0d0d0d] shadow-2xl backdrop-blur-sm border border-neutral-800 rounded-2xl font-mono text-lg leading-relaxed">
              <SyntaxHighlighter
                language="tsx"
                style={androidstudio}
                customStyle={{
                  background: 'rgba(0, 0, 0, 0.5)',
                  borderRadius: '16px',
                  padding: '20px',
                  fontSize: isMobile ? '10px' : '17px',
                  lineHeight: '1.6',
                  margin: 0,
                }}
                showLineNumbers={false}
                wrapLines={true}
              >
                {'<Animated.View \n animate={{ opacity: 1, scale: 1 }} \n/>'}
              </SyntaxHighlighter>
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
}

function Section({
  id,
  heading,
  content,
  bullets,
  children,
}: {
  id: string;
  heading: string;
  icon: React.ReactNode;
  content: string;
  bullets?: string[];
  children?: React.ReactNode;
}) {
  return (
    <section id={id} className="group relative flex flex-col gap-4 scroll-mt-32">
      <div className="flex items-center gap-4">
        <h2 className="bg-clip-text bg-linear-to-br from-55% from-white to-neutral-300 font-bold text-transparent text-2xl md:text-4xl tracking-tight">
          {heading}
        </h2>
      </div>

      <div className="flex md:flex-row flex-col gap-12">
        <div className="flex flex-col flex-1 gap-8">
          <p
            className={`max-w-2xl font-medium text-sm  ${id !== 'the-idea' ? 'text-neutral-400 md:text-xl leading-relaxed' : 'text-neutral-500 md:text-md leading-snug'}`}
          >
            {content}
          </p>

          {bullets && (
            <ul className="space-y-2">
              {bullets.map((item, i) => (
                <li
                  key={i}
                  className="group/li flex items-start gap-2 text-neutral-500 transition-colors"
                >
                  •<span className="md:text-md text-sm leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {children && <div className="flex-1 lg:mt-0 lg:max-w-md">{children}</div>}
      </div>
    </section>
  );
}
