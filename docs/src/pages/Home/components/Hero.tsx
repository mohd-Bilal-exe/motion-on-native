import { ChevronRight, Code2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
export default function Hero() {
  const navigate = useNavigate();
  return (
    <section className="relative flex flex-col justify-center items-center px-6 pt-5 md:pt-40 pb-20 w-full overflow-hidden text-center space-grotesk">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 bg-white/5 mb-6 px-3 py-1 border border-white/10 hover:border-white/20 rounded-full text-white/60 text-sm transition-colors"
      >
        <span className="relative flex w-2 h-2">
          <span className="inline-flex absolute opacity-75 rounded-full w-full h-full animate-ping bg-accent-blue"></span>
          <span className="inline-flex relative rounded-full w-2 h-2 bg-accent-blue"></span>
        </span>
        v1.0.0 is now live
      </motion.div>

      <motion.h1
        className="mb-6 font-bold text-6xl md:text-8xl tracking-tight"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Motion <span className="text-accent-blue">on Native</span>
      </motion.h1>

      <motion.p
        className="mb-10 max-w-2xl text-white/50 text-lg md:text-xl leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        Combining the ease of Framer Motion and performance of Reanimated. Most declarative way to
        animate your React Native components.
      </motion.p>

      <motion.div
        className="flex flex-wrap justify-center gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <button
          onClick={() => navigate('/docs')}
          className="flex items-center gap-2 bg-white px-3 md:px-8 py-1 md:py-4 rounded-full font-bold text-black hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          Get Started <ChevronRight className="size-5" />
        </button>
        <button
          onClick={() =>
            window.open('https://github.com/mohd-Bilal-exe/motion-on-native', '_blank')
          }
          className="flex items-center gap-2 bg-white/5 hover:bg-white/10 px-3 md:px-8 py-1 md:py-4 border border-white/10 rounded-full font-bold transition-all cursor-pointer"
        >
          <Code2 className="size-5" /> View Code
        </button>
      </motion.div>
    </section>
  );
}
