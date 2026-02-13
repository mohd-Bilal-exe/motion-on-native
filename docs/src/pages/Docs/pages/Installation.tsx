import React from 'react';
import { TerminalSquare, Copy, Check } from 'lucide-react';
import DocNavButtons from '../../../components/DocNavButtons';
export default function Installation() {
  return (
    <div className="selection:bg-indigo-500/30 w-full h-[calc(100svh-80px)] overflow-y-auto selection:text-white-200 scroll-smooth">
      <div className="relative flex flex-col gap-24 mx-auto px-6 py-20 lg:py-32 max-w-5xl">
        {/* Installation Section */}
        <section id="installation" className="flex flex-col gap-8 scroll-mt-32">
          <div className="flex items-center gap-4">
            <h2 className="bg-clip-text bg-linear-to-br from-white to-neutral-400 font-bold text-transparent text-4xl tracking-tight">
              Installation
            </h2>
          </div>

          <div className="flex flex-col gap-6">
            <p className="max-w-2xl text-neutral-400 text-xl leading-relaxed">
              Getting started is dead simple. Pull the package from{' '}
              <a
                className="text-indigo-400 hover:text-indigo-300 underline underline-offset-4 transition-colors"
                href="https://www.npmjs.com/package/motion-on-native"
                target="_blank"
                rel="noreferrer"
              >
                npm
              </a>{' '}
              and you're halfway there.
            </p>

            <CodeBlock commandProvider="npm" command="install motion-on-native@latest" />
          </div>
        </section>

        {/* GitHub / Clone Section */}
        <section id="clone" className="flex flex-col gap-8 scroll-mt-32">
          <div className="flex items-center gap-4">
            <h2 className="bg-clip-text bg-linear-to-br from-white to-neutral-400 font-bold text-transparent text-4xl tracking-tight">
              Dabble with the source
            </h2>
          </div>

          <div className="flex flex-col gap-6">
            <p className="max-w-2xl text-neutral-400 text-xl leading-relaxed">
              Want to see how the engine runs? Feel free to poke around, break things, or contribute
              on{' '}
              <a
                className="text-indigo-400 hover:text-indigo-300 underline underline-offset-4 transition-colors"
                href="https://github.com/mohd-Bilal-exe/motion-on-native"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
              .
            </p>
            <CodeBlock
              commandProvider="git"
              command="clone https://github.com/mohd-Bilal-exe/motion-on-native.git"
            />
          </div>
        </section>

        <div className="bg-indigo-500/5 p-8 border border-indigo-500/10 rounded-3xl">
          <h4 className="flex items-center gap-2 mb-2 font-semibold text-indigo-300">
            <TerminalSquare className="w-4 h-4" />
            Heads up
          </h4>
          <p className="text-neutral-400">
            Make sure you have{' '}
            <span className="font-medium text-neutral-200">react-native-reanimated</span> installed.
            We're the brain, but they're the muscle.
          </p>
        </div>
        <DocNavButtons
          nextSection={{
            title: 'Quick Start',
            subTitle: 'Write your first animation with motion-on-native',
            path: '/docs/get-started/quick-start',
          }}
        />
      </div>
    </div>
  );
}

function CodeBlock({
  command,
  commandProvider = 'npm',
}: {
  command: string;
  commandProvider: string;
}) {
  const [copied, setCopied] = React.useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative flex justify-between items-center gap-3 bg-black/20 px-6 py-4 border border-neutral-800 hover:border-neutral-700 rounded-2xl w-fit overflow-hidden font-mono text-lg transition-colors">
      <div className="flex items-center gap-4">
        <span className="text-neutral-600 select-none">$</span>
        <code className="text-white-200/80">
          <span className="mr-2 text-orange-400/70">{commandProvider}</span>
          {command}
        </code>
      </div>

      <button
        onClick={copyToClipboard}
        className="flex justify-center items-center hover:border-neutral-600 rounded-lg w-10 h-10 text-neutral-400 hover:text-white active:scale-95 transition-all"
      >
        {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
      </button>
    </div>
  );
}
