import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Zap, Layers, Wind, Code2 } from 'lucide-react';
import LightRays from '../../components/LightRays';
import Hero from './components/Hero';
import Demos from './components/Demos';
import HowItWorks from './components/HowItWorks';
import APITaste from './components/ApiTaste';
import { FinalCTA } from './components/CTA';
import { Footer } from '../../components/Footer';

export default function HomePage() {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
  };

  return (
    <div className="z-50 flex flex-col items-center w-full min-h-screen text-white-50 selection:bg-accent-blue/30">
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
