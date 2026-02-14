import { Logo } from './Topbar';

export function Footer() {
  return (
    <footer className="z-500 flex md:flex-row flex-col justify-between items-center gap-8 mx-auto px-6 py-12 border-white/5 border-t w-full max-w-6xl">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 overflow-hidden font-bold text-lg uppercase tracking-tighter space-grotesk">
          <Logo className="-mb-1 p-2 size-15 overflow-hidden text-accent-blue" />
          Motion On Native
        </div>
        <p className="text-white/20 text-xs">Built on React Native Reanimated 3.</p>
      </div>

      <div className="flex gap-8 font-medium text-white/40 text-sm">
        <a
          href="https://github.com/mohd-Bilal-exe/motion-on-native"
          target="_blank"
          className="hover:text-white transition-colors"
        >
          GitHub
        </a>
        <a
          target="_blank"
          href="https://github.com/mohd-Bilal-exe"
          className="hover:text-white transition-colors"
        >
          The Developer
        </a>
      </div>

      <div className="flex items-center gap-4 bg-white/5 px-4 py-2 border border-white/10 rounded-full">
        <span className="font-bold text-[10px] text-white/30 uppercase tracking-widest">
          v1.5.1-beta
        </span>
        <div className="bg-white/20 w-px h-3" />
        <span className="font-bold text-[10px] text-green-500 uppercase tracking-widest">
          MIT LICENSE
        </span>
      </div>
    </footer>
  );
}
