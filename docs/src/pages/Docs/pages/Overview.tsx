import React from 'react';

import SyntaxHighlighter from 'react-syntax-highlighter';
import { androidstudio } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { useResponsive } from '../../../hooks/useResponsive';
import { motion } from 'motion/react';

export default function Overview() {
  return (
    <div className="w-full h-[calc(100svh-80px)] px-[6svw] py-[10svh] overflow-y-auto selection:bg-accent-blue/30 scroll-smooth">
      <div className="flex flex-col gap-20 md:gap-32 pb-20 w-full">

        <div className="flex flex-col gap-20 md:gap-32 mx-auto px-6 max-w-6xl">
          <Section
            id="the-pain"
            heading="The Pain"
            subheading="Why did I built this"

            content="React Native animations are powerful with Reanimated, sure. But the hassle you deal with for a simple transition is absurd. Managing shared values, handling entering/exiting animations manually, and keeping track of gesture states can quickly turn into spaghetti code."
            bullets={[
              'Shared value boilerplate cluttering components',
              'Manual spring/timing configs for every property',
              'Repetitive setup for simple animations',
            ]}
          />

          <Section
            id="the-friction"
            heading="The Friction"
            subheading="Problem I faced."
            content="The problem isn’t Reanimated — it's freakin' amazing. The problem is the developer experience around it. You shouldn't have to be an animation expert to fade in a view."
            bullets={[
              'Cognitive overhead from managing animation lifecycles',
              'Logic scattered across hooks, effects, and styles',
              'Intent gets lost in implementation details',
            ]}
          />

          <Section
            id="the-idea"
            heading="The Idea"
            subheading="Declarative & Simple"
            content="What if animations were just... props? Describe where the view should be, and let Motion on Native figure out the interpolation. No shared values, no manual wiring, no headaches."
          >
            <CodeDemo />
          </Section>
        </div>
      </div>
    </div>
  );
}


function Section({
  id,
  heading,
  subheading,
  content,
  bullets,
  children,
}: {
  id: string;
  heading: string;
  subheading?: string;
  content: string;
  bullets?: string[];
  children?: React.ReactNode;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      id={id}
      className="grid md:grid-cols-2 gap-10 md:gap-16 items-center"
    >
      <div className="flex flex-col gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2 text-accent-blue text-sm font-mono uppercase tracking-wider">

            <span>{subheading}</span>
          </div>
          <h2 className="bg-clip-text bg-linear-to-br from-white to-white/70 font-bold text-3xl text-transparent md:text-4xl">
            {heading}
          </h2>
        </div>

        <p className="text-lg text-white/60 leading-relaxed">
          {content}
        </p>

        {bullets && (
          <ul className="space-y-3 mt-2">
            {bullets.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-white/50">
                <div className="mt-1.5 w-1.5 h-1.5 bg-accent-blue rounded-full" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className={`relative ${children ? '' : 'hidden md:block'}`}>
        {children ? (
          children
        ) : (
          <div className="absolute inset-0 bg-linear-to-r from-accent-blue/10 to-transparent blur-3xl rounded-full" />
        )}
      </div>
    </motion.section>
  );
}

function CodeDemo() {
  const isMobile = useResponsive();

  return (
    <div className="group relative">
      <div className="absolute -inset-1 bg-linear-to-r from-accent-blue/30 to-purple-600/30 blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
      <div className="relative bg-[#0d0d0d] shadow-2xl backdrop-blur-sm border border-white/10 rounded-2xl font-mono text-lg leading-relaxed overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/5">
          <div className="w-3 h-3 bg-red-500 rounded-full" />
          <div className="w-3 h-3 bg-yellow-500 rounded-full" />
          <div className="w-3 h-3 bg-green-500 rounded-full" />
        </div>
        <SyntaxHighlighter
          language="tsx"
          style={androidstudio}
          customStyle={{
            background: 'transparent',
            padding: '24px',
            fontSize: isMobile ? '12px' : '15px',
            lineHeight: '1.6',
            margin: 0,
          }}
          showLineNumbers={false}
          wrapLines={true}
        >
          {`<Animated.View 
  animate={{ 
    opacity: 1, 
    scale: 1 
  }} 
  transition={{
    type: 'spring',
    damping: 20
  }}
/>`}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
