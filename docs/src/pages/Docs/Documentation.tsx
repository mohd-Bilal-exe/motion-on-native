import { Route, Routes } from 'react-router-dom';
import Sidebar from './components/SideBar';
import Overview from './pages/Overview';
import ImportantMentions from './pages/ImportantMentions';
import Installation from './pages/Installation';
import QuickStart from './pages/QuickStart';
import MotionComponents from './pages/MotionComponents';
import MotionProps from './pages/MotionProps';
import AniamtionBehaviour from './pages/AnimationBehaviour';
import TypesDocs from './pages/TypesDocs';
import MentalModel from './pages/MentalModel';
export default function Documentation() {
  return (
    <div className="flex bg-black-950 w-svw min-h-[calc(100svh-80px)]">
      <Sidebar />
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/resources" element={<ImportantMentions />} />
        <Route path="/get-started/installation" element={<Installation />} />
        <Route path="/get-started/quick-start" element={<QuickStart />} />
        <Route path="/core/native-motion" element={<MotionComponents />} />
        <Route path="/core/animation-props" element={<MotionProps />} />
        <Route path="/core/animation-behaviour" element={<AniamtionBehaviour />} />
        <Route path="/core/types" element={<TypesDocs />} />
        <Route path="*" element={<MentalModel />} />
      </Routes>
    </div>
  );
}
