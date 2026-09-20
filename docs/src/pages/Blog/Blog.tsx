import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, Clock, Calendar } from 'lucide-react';
import { Footer } from '../../components/Footer';

export const BLOG_POSTS = [
  {
    slug: 'why-i-built-motion-on-native',
    title: 'Why I Built Motion on Native: Bringing Framer Motion Joy to Mobile',
    description:
      'The developer journey of moving from Web to React Native, hitting the painful wall of Reanimated boilerplate, the breakthrough of the "Shared Value Factory", and reaching 50+ weekly downloads.',
    date: 'Sep 20, 2026',
    readTime: '6 min read',
    category: 'Founder Story',
    tags: ['React Native', 'Framer Motion', 'Reanimated', 'Open Source'],
  },
  {
    slug: 'exit-animations-react-native-framer-motion',
    title: "Exit Animations in React Native: How to Build Framer Motion's AnimatePresence with Reanimated",
    description:
      'Why exit animations are notoriously hard in React Native, how AnimatedExit halts component unmounting until Reanimated UI-thread springs complete, and a breakdown against Moti and raw Reanimated.',
    date: 'Sep 20, 2026',
    readTime: '8 min read',
    category: 'Deep Dive',
    tags: ['React Native', 'Exit Animations', 'Reanimated', 'Framer Motion'],
  },
  {
    slug: 'migrating-to-motion-on-native',
    title: 'Migrating from Raw Reanimated & Moti to Motion on Native',
    description:
      'Cut 70% of animation boilerplate from your React Native codebase. A step-by-step guide with before/after diffs for basic transitions, spring physics, and unmount exit handling.',
    date: 'Sep 20, 2026',
    readTime: '6 min read',
    category: 'Migration Guide',
    tags: ['React Native', 'Reanimated', 'Moti', 'DX'],
  },
];

export default function Blog() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center w-full min-h-screen text-white-50 selection:bg-indigo-500/30 space-grotesk">
      <div className="relative flex flex-col gap-12 mx-auto px-6 py-16 md:py-24 max-w-5xl w-full">
        {/* Header */}
        <header className="flex flex-col gap-4 text-center md:text-left">
          <div className="inline-flex items-center gap-2 self-center md:self-start bg-indigo-500/10 px-3 py-1 rounded-full text-indigo-400 text-xs font-mono tracking-wider uppercase border border-indigo-500/20">
            <Sparkles className="size-3.5" />
            <span>Articles & Technical Deep Dives</span>
          </div>
          <h1 className="bg-clip-text bg-linear-to-r from-white via-white-100 to-neutral-500 font-bold text-transparent text-4xl md:text-6xl tracking-tight">
            The Motion on Native Blog
          </h1>
          <p className="max-w-2xl text-neutral-400 text-lg md:text-xl leading-relaxed">
            Engineering breakdowns, animation architecture, and declarative UI patterns for React Native and Reanimated.
          </p>
        </header>

        {/* Featured Post Card */}
        <div className="flex flex-col gap-6">
          {BLOG_POSTS.map(post => (
            <article
              key={post.slug}
              onClick={() => navigate(`/blog/${post.slug}`)}
              className="group relative flex flex-col gap-5 bg-gradient-to-b from-white/[0.04] to-white/[0.01] hover:from-white/[0.07] hover:to-white/[0.02] p-8 md:p-10 border border-white/10 hover:border-indigo-500/40 rounded-3xl transition-all duration-300 cursor-pointer shadow-2xl"
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="bg-indigo-500/20 px-3 py-0.5 rounded-full text-indigo-300 font-mono text-xs font-medium border border-indigo-500/30">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-neutral-400 text-xs">
                    <Calendar className="size-3.5" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-neutral-400 text-xs ml-2">
                    <Clock className="size-3.5" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </div>

              <h2 className="font-bold text-white group-hover:text-indigo-300 text-2xl md:text-3xl tracking-tight transition-colors">
                {post.title}
              </h2>

              <p className="text-neutral-400 text-base md:text-lg leading-relaxed">
                {post.description}
              </p>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/5">
                <div className="flex flex-wrap gap-2">
                  {post.tags.map(tag => (
                    <span
                      key={tag}
                      className="bg-white/5 px-2.5 py-1 rounded-md text-neutral-400 text-xs font-mono"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="inline-flex items-center gap-2 text-indigo-400 group-hover:text-indigo-300 font-semibold text-sm transition-transform group-hover:translate-x-1">
                  <span>Read full guide</span>
                  <ArrowRight className="size-4" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
