import { useState } from 'react';

export function InstallSection() {
  const [manager, setManager] = useState('npm');
  const commands: any = {
    npm: 'npm install motion-on-native',
    yarn: 'yarn add motion-on-native',
    pnpm: 'pnpm add motion-on-native',
  };

  return (
    <section className="flex flex-col items-center px-6 py-20">
      <div className="flex gap-1 bg-white/5 mb-6 p-1 border border-white/10 rounded-2xl">
        {['npm', 'yarn', 'pnpm'].map(m => (
          <button
            key={m}
            onClick={() => setManager(m)}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold uppercase transition-all ${manager === m ? 'bg-white text-black' : 'text-white/40 hover:text-white'}`}
          >
            {m}
          </button>
        ))}
      </div>
      <div className="group relative bg-[#0D0D0D] px-10 py-6 border border-white/10 hover:border-accent-blue/50 rounded-[2rem] w-full max-w-xl text-center transition-colors">
        <code className="font-mono text-white text-xl md:text-2xl tracking-tight">
          {commands[manager]}
        </code>
        <div className="top-1/2 -right-4 absolute opacity-0 group-hover:opacity-100 px-2 py-1 rounded-md font-bold text-[10px] text-white transition-opacity -translate-y-1/2 bg-accent-blue">
          CLICK TO COPY
        </div>
      </div>
    </section>
  );
}
