import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home/Home';
import Documentation from './pages/Documentation';
import Topbar from './components/Topbar';

function App() {
  return (
    <main className="flex flex-col bg-black-950 max-w-svw text-white-200">
      <Topbar />
      <section id="mainContent" className="z-0 flex pt-20">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/docs" element={<Documentation />} />
        </Routes>
      </section>
    </main>
  );
}

export default App;
