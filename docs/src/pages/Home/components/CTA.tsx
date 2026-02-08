import { useNavigate } from 'react-router-dom';

export function FinalCTA() {
  const navigate = useNavigate();
  return (
    <section className="z-100 px-6 py-32 border-white/5 border-t text-center">
      <h2 className="mb-8 font-bold text-4xl md:text-6xl tracking-tighter space-grotesk">
        Ready to build fluid interfaces?
      </h2>
      <div className="flex flex-wrap justify-center gap-4">
        <button
          onClick={() => navigate('/docs')}
          className="shadow-2xl px-10 py-5 rounded-full font-bold text-white text-lg active:scale-95 transition-all bg-accent-blue shadow-accent-blue/20 hover:bg-accent-blue/80 cursor-pointer"
        >
          Read the Docs
        </button>
        <button className="bg-white/5 hover:bg-white/10 px-10 py-5 border border-white/10 rounded-full font-bold text-white text-lg transition-all cursor-pointer">
          Browse Components
        </button>
      </div>
    </section>
  );
}
