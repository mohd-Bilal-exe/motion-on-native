
import LightRays from '../../components/LightRays';
import Hero from './components/Hero';
import Demos from './components/Demos';
import HowItWorks from './components/HowItWorks';
import APITaste from './components/ApiTaste';
import { FinalCTA } from './components/CTA';
import { Footer } from '../../components/Footer';

export default function HomePage() {
  return (
    <div className="z-50 flex flex-col items-center w-full min-h-screen text-white-50 selection:bg-accent-blue/30 space-grotesk">
      <div className="top-0 z-0 fixed w-svw h-full">
        <LightRays
          raysOrigin="top-center"
          raysColor="#4f68cb"
          raysSpeed={1}
          lightSpread={0.5}
          rayLength={3}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0}
          distortion={0}
          className=""
          pulsating={false}
          fadeDistance={1}
          saturation={1}
        />
      </div>
      <Hero />
      <Demos />
      <HowItWorks />
      <APITaste />
      <FinalCTA />
      <Footer />
    </div>
  );
}
