import React from 'react';
import { Compass } from 'lucide-react';

interface Props {
  onOpenPrescription: () => void;
  activeSection: string;
  onNavigate: (section: string) => void;
}

export const Header: React.FC<Props> = ({ onOpenPrescription, activeSection, onNavigate }) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-6 py-3.5">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => onNavigate('hero')}
          className="text-lg font-bold tracking-tight text-emerald-950 whitespace-nowrap shrink-0 flex items-center gap-2 text-left"
        >
          <span className="w-7 h-7 rounded-lg bg-emerald-800 text-white flex items-center justify-center text-xs font-serif font-bold">
            林
          </span>
          <span>포레스트 힐 (ForestHeal)</span>
        </button>

        {/* Zone 2: 4–5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-medium text-stone-600">
          <button
            onClick={() => onNavigate('explorer')}
            className={`hover:text-emerald-900 transition-colors whitespace-nowrap shrink-0 ${
              activeSection === 'explorer' ? 'text-emerald-900 font-semibold' : ''
            }`}
          >
            휴양림·치유의 숲
          </button>
          <button
            onClick={() => onNavigate('senses')}
            className={`hover:text-emerald-900 transition-colors whitespace-nowrap shrink-0 ${
              activeSection === 'senses' ? 'text-emerald-900 font-semibold' : ''
            }`}
          >
            산림치유 5감
          </button>
          <button
            onClick={() => onNavigate('breathing')}
            className={`hover:text-emerald-900 transition-colors whitespace-nowrap shrink-0 ${
              activeSection === 'breathing' ? 'text-emerald-900 font-semibold' : ''
            }`}
          >
            피톤치드 호흡
          </button>
          <button
            onClick={() => onNavigate('soundscape')}
            className={`hover:text-emerald-900 transition-colors whitespace-nowrap shrink-0 ${
              activeSection === 'soundscape' ? 'text-emerald-900 font-semibold' : ''
            }`}
          >
            숲의 소리
          </button>
          <button
            onClick={() => onNavigate('journal')}
            className={`hover:text-emerald-900 transition-colors whitespace-nowrap shrink-0 ${
              activeSection === 'journal' ? 'text-emerald-900 font-semibold' : ''
            }`}
          >
            나의 치유일지
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenPrescription}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-xl transition-colors whitespace-nowrap shrink-0 shadow-sm"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>AI 맞춤 처방받기</span>
          </button>
        </div>
      </div>
    </header>
  );
};
