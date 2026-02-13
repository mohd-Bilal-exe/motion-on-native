import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom'; // Or your routing library of choice

export type Section = {
  title: string;
  subTitle: string;
  path: string;
};

export default function DocNavButtons({
  nextSection,
  previousSection,
}: {
  nextSection?: Section;
  previousSection?: Section;
}) {
  return (
    <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 mt-0 pt-10 border-black-800/50 border-t">
      {/* Previous Section */}
      {previousSection ? (
        <NavCard section={previousSection} direction="prev" />
      ) : (
        <div className="hidden sm:block" /> // Spacer to keep Next on the right
      )}

      {/* Next Section */}
      {nextSection && <NavCard section={nextSection} direction="next" />}
    </div>
  );
}

function NavCard({ section, direction }: { section: Section; direction: 'next' | 'prev' }) {
  const isNext = direction === 'next';

  return (
    <Link
      to={section.path}
      className={`group flex flex-col gap-2 p-6 border border-neutral-800 bg-black-900/20 hover:bg-black-800/50 rounded-2xl transition-all duration-300 ${
        isNext ? 'items-end text-right' : 'items-start text-left'
      }`}
    >
      <div className="flex items-center gap-2 text-neutral-500 group-hover:text-indigo-400 transition-colors">
        {!isNext && (
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        )}
        <span className="font-bold text-xs uppercase tracking-widest">
          {isNext ? 'Up Next' : 'Go Back'}
        </span>
        {isNext && (
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        )}
      </div>

      <div className="flex flex-col">
        <h3 className="font-bold text-white group-hover:text-indigo-100 text-xl tracking-tight transition-colors">
          {section.title}
        </h3>
        <p className="text-neutral-500 text-sm italic line-clamp-1">{section.subTitle}</p>
      </div>
    </Link>
  );
}
