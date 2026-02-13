import React from 'react';
import { ExternalLink, Cpu, Heart, HeartHandshake } from 'lucide-react';

export default function ImportantMentions() {
  return (
    <div className="selection:bg-indigo-500/30 px-[6svw] py-[10svh] w-full min-h-[calc(100svh-80px)] overflow-y-auto">
      <div className="mx-auto max-w-5xl">
        <header className="mb-16">
          <h2 className="bg-clip-text bg-linear-to-r from-white to-neutral-400 py-2 font-bold text-transparent text-5xl tracking-tighter">
            Standing on Shoulders
          </h2>
          <p className="mt-4 max-w-2xl text-neutral-400 text-xl leading-relaxed">
            I didn't reinvent the wheel-I just made sure it fits React Native. This library is the
            love child of two industry giants.
          </p>
        </header>

        <div className="gap-8 grid grid-cols-1 md:grid-cols-2">
          <MentionCard
            title="Motion (formely Framer Motion)"
            url="https://motion.dev/"
            description="The blueprint. I've heavily borrowed (read: shamelessly adopted) their declarative API and AnimatePresence logic because, frankly, nobody does motion syntax better."
            tags={['API Design', 'Exit Logic', 'The Inspiration']}
            accentColor="from-yellow-500/40 via-[#fff42b]/20 to-transparent"
            icon={<HeartHandshake className="text-[#fff42b]" />}
          />
          <MentionCard
            title="Reanimated"
            url="https://docs.swmansion.com/react-native-reanimated/"
            description="The raw horsepower. I have used Reanimated to handle the heavy lifting on the UI thread, ensuring your animations don't choke when the JS thread gets busy."
            tags={['The Engine', '120 FPS']}
            accentColor="from-blue-600/40 via-fuchsia-500/20 to-transparent"
            icon={<Cpu className="text-indigo-300" />}
          />
        </div>

        <footer className="flex flex-col items-center bg-neutral-800/10 mt-24 p-12 border border-neutral-800 rounded-3xl text-center">
          <div className="bg-neutral-800/50 mb-6 p-4 border border-neutral-700 rounded-full">
            <Heart className="fill-red-500 w-6 h-6 text-red-500" />
          </div>
          <h3 className="font-bold text-white text-2xl tracking-tight">Open Source</h3>
          <p className="mt-3 max-w-md text-neutral-400 text-lg">
            Built for devs (majorly myself) who want web-level simplicity without sacrificing
            mobile-level performance.
          </p>
        </footer>
      </div>
    </div>
  );
}

function MentionCard({
  title,
  url,
  description,
  tags,
  accentColor,
  icon,
}: {
  title: string;
  url: string;
  description: string;
  tags: string[];
  accentColor: string;
  icon: React.ReactNode;
}) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col justify-between bg-black-900/50 hover:bg-neutral-900/60 p-8 border border-neutral-800 rounded-3xl overflow-hidden transition-all duration-500"
    >
      {/* Subtle Gradient Flare */}
      <div
        className={`absolute -inset-px bg-linear-to-br ${accentColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
        style={{ maskImage: 'radial-gradient(circle at top left, white, transparent 90%)' }}
      />

      <div className="z-10 relative">
        <div className="flex justify-between items-start mb-8">
          <div className="bg-neutral-800/80 shadow-inner p-3 border border-neutral-700 rounded-2xl">
            {React.cloneElement(icon as React.ReactElement)}
          </div>
          <ExternalLink className="w-5 h-5 text-neutral-600 group-hover:text-white transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </div>

        <h3 className="mb-4 font-bold text-white text-2xl tracking-tight">{title}</h3>
        <p className="mb-8 text-neutral-400 text-lg leading-relaxed">{description}</p>
      </div>

      <div className="z-10 relative flex flex-wrap gap-2">
        {tags.map(tag => (
          <span
            key={tag}
            className="bg-neutral-950/50 px-3 py-1 border border-neutral-800 rounded-lg font-semibold text-[10px] text-neutral-500 group-hover:text-neutral-300 uppercase tracking-widest transition-colors"
          >
            {tag}
          </span>
        ))}
      </div>
    </a>
  );
}
