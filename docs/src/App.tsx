import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home/Home';
import Documentation from './pages/Docs/Documentation';
import Topbar from './components/Topbar';
import Blog from './pages/Blog/Blog';
import ExitAnimationsGuide from './pages/Blog/posts/ExitAnimationsGuide';
import WhyIBuiltMotionOnNative from './pages/Blog/posts/WhyIBuiltMotionOnNative';
import MigratingToMotionOnNative from './pages/Blog/posts/MigratingToMotionOnNative';

function App() {
  return (
    <main className="flex flex-col bg-black-950 max-w-svw text-white-200">
      <Topbar />
      <section id="mainContent" className="z-0 flex pt-20">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/docs/*" element={<Documentation />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/why-i-built-motion-on-native" element={<WhyIBuiltMotionOnNative />} />
          <Route path="/blog/exit-animations-react-native-framer-motion" element={<ExitAnimationsGuide />} />
          <Route path="/blog/migrating-to-motion-on-native" element={<MigratingToMotionOnNative />} />
          <Route path="/blog/*" element={<Blog />} />
        </Routes>
      </section>
    </main>
  );
}

export default App;
