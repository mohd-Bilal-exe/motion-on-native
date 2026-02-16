import { BrainCircuit, Handshake, Menu, X } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import { Logo } from '../../../components/Topbar';
import { useResponsive } from '../../../hooks/useResponsive';
import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
type SidebarSection = {
  label: string;
  items: {
    name: string;
    path: string;
  }[];
};

const topNav = [
  { name: 'The Motivation', icon: <Logo className="size-7" />, path: '/docs' },
  {
    name: 'Important mentions',
    icon: <Handshake className="ml-2 size-5 text-yellow-400" />,
    path: '/docs/resources',
  },
  {
    name: 'Mental Model',
    icon: <BrainCircuit className="ml-2 size-5 text-pink-400" />,
    path: '/docs/mental-model',
  },
];

const sections: SidebarSection[] = [
  {
    label: 'Getting Started',
    items: [
      { name: 'Installation', path: '/docs/get-started/installation' },
      { name: 'Quick Start', path: '/docs/get-started/quick-start' },
    ],
  },
  {
    label: 'Core Features',
    items: [
      { name: 'Motion Components', path: '/docs/core/native-motion' },
      { name: 'Animation Props', path: '/docs/core/animation-props' },
      { name: 'Animation behaviour', path: '/docs/core/animation-behaviour' },
      { name: 'Types', path: '/docs/core/types' },
    ],
  },
];

export default function Sidebar() {
  const { pathname } = useLocation();
  const { isMobile } = useResponsive();
  const [isOpen, setIsOpen] = useState(false);

  if (isMobile) {
    return (
      <>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="top-24 right-4 z-100 fixed bg-white/10 hover:bg-white/20 p-2 border border-white/10 rounded-lg transition-all"
        >
          {isOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.aside
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="z-50 fixed inset-0 bg-black-900 backdrop-blur-xl px-6 md:py-20 pt-24 overflow-y-auto text-sm"
            >
              <nav className="space-y-1 mb-10">
                {topNav.map(item => {
                  const active = pathname === item.path;
                  return (
                    <NavLink
                      key={item.name}
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`
                      flex items-center gap-3 rounded-lg px-3 py-2 transition
                      ${
                        active
                          ? 'bg-black/5 text-white-200 font-medium'
                          : 'text-white-200/60 hover:bg-black/5 hover:text-white-200/80'
                      }
                    `}
                    >
                      <span className="opacity-70">{item.icon}</span>
                      {item.name}
                    </NavLink>
                  );
                })}
              </nav>

              <div className="space-y-8">
                {sections.map(section => {
                  const activeLabel = section.items.some(item => pathname === item.path);
                  return (
                    <div key={section.label}>
                      <div
                        className={`mb-3 text-[11px] uppercase tracking-wide ${
                          activeLabel
                            ? 'text-accent-blue font-bold'
                            : 'text-white-200/60 font-semibold'
                        } transition-all duration-300`}
                      >
                        {section.label}
                      </div>
                      <div className="space-y-1">
                        {section.items.map(item => {
                          const active = pathname === item.path;
                          return (
                            <NavLink
                              key={item.name}
                              to={item.path}
                              onClick={() => setIsOpen(false)}
                              className={`
                              block rounded-md px-2 py-1.5 transition
                              ${active ? 'text-white-200 font-medium' : 'text-white-200/60 hover:text-accent-blue'}
                            `}
                            >
                              {item.name}
                            </NavLink>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.aside>
          )}
        </AnimatePresence>
      </>
    );
  }

  return (
    <aside className="relative px-6 py-8 min-w-[16svw] text-sm">
      <div className="right-0 absolute inset-y-1/2 bg-radial from-30% from-white-200/20 to-90% to-transparent w-px h-1/2 -translate-y-1/2 pointer-events-none"></div>
      {/* Top icon navigation */}
      <nav className="space-y-1 mb-10">
        {topNav.map(item => {
          const active = pathname === item.path;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={`
                flex items-center gap-3 rounded-lg px-2 py-2 transition
                ${
                  active
                    ? 'bg-black/5 text-white-200 font-medium'
                    : 'text-white-200/60 hover:bg-black/5 hover:text-white-200/80'
                }
              `}
            >
              <span className="opacity-70">{item.icon}</span>
              {item.name}
            </NavLink>
          );
        })}
      </nav>

      {/* Docs sections */}
      <div className="space-y-8">
        {sections.map(section => {
          const activeLabel = section.items.some(item => pathname === item.path);
          return (
            <div key={section.label}>
              <div
                className={`mb-3  text-[11px]  uppercase tracking-wide ${
                  activeLabel ? 'text-accent-blue font-bold' : ' text-white-200/80 font-semibold'
                } transition-all duration-300`}
              >
                {section.label}
              </div>

              <div className="space-y-1">
                {section.items.map(item => {
                  const active = pathname === item.path;
                  return (
                    <NavLink
                      key={item.name}
                      to={item.path}
                      className={`
                      block rounded-md px-2 py-1.5 transition
                      ${active ? 'text-white-200 font-medium' : 'text-white-200/60 hover:text-accent-blue'}
                    `}
                    >
                      {item.name}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
