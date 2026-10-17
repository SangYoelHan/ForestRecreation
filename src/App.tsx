import React, { useState, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { SoundscapePlayer } from './components/SoundscapePlayer';
import { ForestExplorer } from './components/ForestExplorer';
import { FiveSensesSection } from './components/FiveSensesSection';
import { BreathingGuide } from './components/BreathingGuide';
import { ForestJournal } from './components/ForestJournal';
import { ForestDetailModal } from './components/ForestDetailModal';
import { PrescriptionModal } from './components/PrescriptionModal';
import { Footer } from './components/Footer';
import { ForestItem, FOREST_LIST } from './data/forestData';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('explorer');
  const [selectedForest, setSelectedForest] = useState<ForestItem | null>(null);
  const [isPrescriptionOpen, setIsPrescriptionOpen] = useState<boolean>(false);

  // Bookmarks in LocalStorage
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('forest_bookmarks');
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error(e);
    }
    return ['daegwallyeong', 'jangseong-cypress'];
  });

  // Saved Prescriptions in LocalStorage
  const [savedPrescriptions, setSavedPrescriptions] = useState<any[]>(() => {
    try {
      const stored = localStorage.getItem('forest_saved_prescriptions');
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error(e);
    }
    return [];
  });

  // Section references for smooth scrolling
  const explorerRef = useRef<HTMLDivElement>(null);
  const sensesRef = useRef<HTMLDivElement>(null);
  const breathingRef = useRef<HTMLDivElement>(null);
  const soundscapeRef = useRef<HTMLDivElement>(null);
  const journalRef = useRef<HTMLDivElement>(null);

  const toggleBookmark = (id: string) => {
    setBookmarkedIds((prev) => {
      const next = prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id];
      try {
        localStorage.setItem('forest_bookmarks', JSON.stringify(next));
      } catch (e) {
        console.error(e);
      }
      return next;
    });
  };

  const handleSavePrescription = (prescription: any) => {
    setSavedPrescriptions((prev) => {
      const next = [prescription, ...prev];
      try {
        localStorage.setItem('forest_saved_prescriptions', JSON.stringify(next));
      } catch (e) {
        console.error(e);
      }
      return next;
    });
  };

  const handleNavigate = (section: string) => {
    setActiveSection(section);
    if (section === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (section === 'explorer') {
      explorerRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else if (section === 'senses') {
      sensesRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else if (section === 'breathing') {
      breathingRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else if (section === 'soundscape') {
      soundscapeRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else if (section === 'journal') {
      journalRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAF8] text-stone-900 flex flex-col font-sans selection:bg-emerald-100 selection:text-emerald-900">
      {/* 3-Zone Top Bar */}
      <Header
        onOpenPrescription={() => setIsPrescriptionOpen(true)}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      {/* Main Content Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-8 space-y-12">
        {/* Hero Section */}
        <Hero
          onOpenPrescription={() => setIsPrescriptionOpen(true)}
          onExploreClick={() => handleNavigate('explorer')}
        />

        {/* Ambient Nature Soundscape Bar */}
        <div ref={soundscapeRef} className="scroll-mt-20">
          <SoundscapePlayer />
        </div>

        {/* Explorer Section: National Recreational Forests & Healing Forests */}
        <div ref={explorerRef} className="scroll-mt-20 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-2">
            <div>
              <span className="text-xs font-semibold text-emerald-800 tracking-wider">
                EXPLORE FORESTS &amp; TRAILS
              </span>
              <h2 className="text-2xl font-bold tracking-tight text-stone-900 mt-1">
                전국 국립·공립 자연휴양림 &amp; 치유의 숲
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                지역별 생태 수종, 피톤치드 방출 지수, 무장애 데크길 및 치유 프로그램을 탐색하세요.
              </p>
            </div>
          </div>

          <ForestExplorer
            onSelectForest={(forest) => setSelectedForest(forest)}
            bookmarkedIds={bookmarkedIds}
            onToggleBookmark={toggleBookmark}
          />
        </div>

        {/* 4-7-8 Breathing Guide */}
        <div ref={breathingRef} className="scroll-mt-20">
          <BreathingGuide />
        </div>

        {/* 5 Senses Therapy Mechanism */}
        <div ref={sensesRef} className="scroll-mt-20">
          <FiveSensesSection />
        </div>

        {/* User Journal & Bookmarks */}
        <div ref={journalRef} className="scroll-mt-20">
          <ForestJournal
            bookmarkedIds={bookmarkedIds}
            onToggleBookmark={toggleBookmark}
            onSelectForest={(forest) => setSelectedForest(forest)}
            savedPrescriptions={savedPrescriptions}
            onOpenPrescription={() => setIsPrescriptionOpen(true)}
          />
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Forest Detail Modal */}
      <ForestDetailModal
        forest={selectedForest}
        onClose={() => setSelectedForest(null)}
        isBookmarked={selectedForest ? bookmarkedIds.includes(selectedForest.id) : false}
        onToggleBookmark={toggleBookmark}
        onOpenPrescription={() => setIsPrescriptionOpen(true)}
      />

      {/* AI Prescription Modal */}
      <PrescriptionModal
        isOpen={isPrescriptionOpen}
        onClose={() => setIsPrescriptionOpen(false)}
        onSaveToJournal={handleSavePrescription}
      />
    </div>
  );
}
