import React, { useState } from 'react';
import { Bookmark, Plus, Trash2, Calendar, Trees, Smile, FileText, ArrowUpRight } from 'lucide-react';
import { ForestItem, FOREST_LIST } from '../data/forestData';

export interface JournalEntry {
  id: string;
  date: string;
  forestName: string;
  activities: string[];
  stressBefore: number; // 1 to 10
  stressAfter: number; // 1 to 10
  notes: string;
}

interface Props {
  bookmarkedIds: string[];
  onToggleBookmark: (id: string) => void;
  onSelectForest: (forest: ForestItem) => void;
  savedPrescriptions: any[];
  onOpenPrescription: () => void;
}

export const ForestJournal: React.FC<Props> = ({
  bookmarkedIds,
  onToggleBookmark,
  onSelectForest,
  savedPrescriptions,
  onOpenPrescription,
}) => {
  const [activeTab, setActiveTab] = useState<'journal' | 'bookmarks' | 'prescriptions'>('journal');
  const [isAddingEntry, setIsAddingEntry] = useState<boolean>(false);

  // Journal Entries stored in local state initialized from localStorage
  const [entries, setEntries] = useState<JournalEntry[]>(() => {
    try {
      const stored = localStorage.getItem('forest_journal_entries');
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error(e);
    }
    return [
      {
        id: 'entry-1',
        date: '2026-10-12',
        forestName: '국립 대관령 치유의 숲',
        activities: ['피톤치드 산림욕', '솔바람 명상', '황토 맨발길'],
        stressBefore: 8,
        stressAfter: 2,
        notes: '금강송 숲길을 걸으며 4-7-8 호흡을 하니 머리가 맑아지고 두통이 사라졌습니다. 솔방울 향기가 기억에 남습니다.',
      },
    ];
  });

  // Form State
  const [newForestName, setNewForestName] = useState<string>(FOREST_LIST[0].name);
  const [newDate, setNewDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [newActivities, setNewActivities] = useState<string>('피톤치드 산림욕, 데크길 걷기');
  const [newStressBefore, setNewStressBefore] = useState<number>(7);
  const [newStressAfter, setNewStressAfter] = useState<number>(3);
  const [newNotes, setNewNotes] = useState<string>('');

  const saveEntries = (updated: JournalEntry[]) => {
    setEntries(updated);
    try {
      localStorage.setItem('forest_journal_entries', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddEntry = (e: React.FormEvent) => {
    e.preventDefault();
    const entry: JournalEntry = {
      id: Date.now().toString(),
      date: newDate,
      forestName: newForestName,
      activities: newActivities.split(',').map((s) => s.trim()).filter(Boolean),
      stressBefore: newStressBefore,
      stressAfter: newStressAfter,
      notes: newNotes,
    };
    saveEntries([entry, ...entries]);
    setIsAddingEntry(false);
    setNewNotes('');
  };

  const handleDeleteEntry = (id: string) => {
    saveEntries(entries.filter((entry) => entry.id !== id));
  };

  const bookmarkedForests = FOREST_LIST.filter((f) => bookmarkedIds.includes(f.id));

  return (
    <div className="bg-white rounded-3xl border border-stone-200/90 p-6 md:p-8 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-100">
        <div>
          <span className="text-xs font-semibold text-emerald-800 tracking-wider">
            MY FOREST LOG &amp; BOOKMARKS
          </span>
          <h2 className="text-2xl font-bold tracking-tight text-stone-900 mt-1">
            나의 산림치유 아카이브
          </h2>
          <p className="text-xs text-stone-500 mt-1">
            방문한 휴양림 기록, 스트레스 완화 일지, 찜한 힐링 스팟을 한눈에 관리합니다.
          </p>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-xl">
          <button
            onClick={() => setActiveTab('journal')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'journal'
                ? 'bg-white text-emerald-900 shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            치유 일지 ({entries.length})
          </button>
          <button
            onClick={() => setActiveTab('bookmarks')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'bookmarks'
                ? 'bg-white text-emerald-900 shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            찜한 휴양림 ({bookmarkedForests.length})
          </button>
          <button
            onClick={() => setActiveTab('prescriptions')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'prescriptions'
                ? 'bg-white text-emerald-900 shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            보관된 처방전 ({savedPrescriptions.length})
          </button>
        </div>
      </div>

      {/* Tab 1: Journal */}
      {activeTab === 'journal' && (
        <div className="mt-6 space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs text-stone-500">
              숲 방문 전후의 스트레스 지수 변화를 기록해 보세요.
            </span>
            <button
              onClick={() => setIsAddingEntry(!isAddingEntry)}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-medium rounded-xl transition-colors shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{isAddingEntry ? '작성 취소' : '치유 일지 작성'}</span>
            </button>
          </div>

          {/* Form */}
          {isAddingEntry && (
            <form
              onSubmit={handleAddEntry}
              className="p-5 bg-stone-50 rounded-2xl border border-stone-200/80 space-y-4 animate-in fade-in duration-200"
            >
              <h3 className="text-xs font-bold text-stone-900 tracking-wider">
                새 산림치유 방문 일지
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    방문한 휴양림 / 치유의 숲
                  </label>
                  <select
                    value={newForestName}
                    onChange={(e) => setNewForestName(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-stone-200 bg-white text-stone-800 focus:outline-none focus:border-emerald-700"
                  >
                    {FOREST_LIST.map((f) => (
                      <option key={f.id} value={f.name}>
                        {f.name} ({f.region})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    방문 일자
                  </label>
                  <input
                    type="date"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-stone-200 bg-white text-stone-800 focus:outline-none focus:border-emerald-700"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  체험한 치유 활동 (쉼표로 구분)
                </label>
                <input
                  type="text"
                  placeholder="예: 편백 피톤치드 호흡, 계곡 족욕, 해먹 명상"
                  value={newActivities}
                  onChange={(e) => setNewActivities(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-stone-200 bg-white text-stone-800 focus:outline-none focus:border-emerald-700"
                />
              </div>

              {/* Stress Slider */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div>
                  <div className="flex items-center justify-between text-xs text-stone-700 mb-1">
                    <span>방문 전 스트레스 (1~10)</span>
                    <span className="font-mono font-bold text-rose-700 tabular-nums">
                      {newStressBefore}점
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={newStressBefore}
                    onChange={(e) => setNewStressBefore(parseInt(e.target.value))}
                    className="w-full accent-rose-700 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs text-stone-700 mb-1">
                    <span>방문 후 스트레스 (1~10)</span>
                    <span className="font-mono font-bold text-emerald-700 tabular-nums">
                      {newStressAfter}점
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={newStressAfter}
                    onChange={(e) => setNewStressAfter(parseInt(e.target.value))}
                    className="w-full accent-emerald-700 cursor-pointer"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  치유 소감 및 나만의 느낌
                </label>
                <textarea
                  rows={3}
                  placeholder="숲속에서 느꼈던 바람, 냄새, 머리가 맑아진 순간을 적어보세요..."
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-stone-200 bg-white text-stone-800 focus:outline-none focus:border-emerald-700"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddingEntry(false)}
                  className="px-3.5 py-2 text-xs font-medium text-stone-600 hover:bg-stone-200 rounded-xl transition-colors"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-medium rounded-xl transition-colors shadow-sm"
                >
                  일지 저장하기
                </button>
              </div>
            </form>
          )}

          {/* List of Entries */}
          <div className="space-y-3">
            {entries.map((entry) => {
              const diff = entry.stressBefore - entry.stressAfter;
              return (
                <div
                  key={entry.id}
                  className="p-4 bg-stone-50/70 rounded-2xl border border-stone-200/80 flex flex-col justify-between space-y-3 hover:border-stone-300 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-stone-900">{entry.forestName}</h4>
                        <span className="text-xs text-stone-500 font-mono tabular-nums">{entry.date}</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-1 text-[11px] text-stone-600">
                        {entry.activities.map((act, idx) => (
                          <span key={idx} className="bg-white px-2 py-0.5 rounded border border-stone-200/60">
                            {act}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Stress delta */}
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <span className="text-[11px] text-stone-500 block">스트레스 완화도</span>
                        <div className="text-xs font-mono font-bold text-emerald-800 tabular-nums">
                          {entry.stressBefore}점 → {entry.stressAfter}점{' '}
                          {diff > 0 && <span className="text-emerald-700 font-semibold">(-{diff}점)</span>}
                        </div>
                      </div>

                      <button
                        onClick={() => handleDeleteEntry(entry.id)}
                        className="p-1.5 text-stone-400 hover:text-rose-600 transition-colors"
                        title="일지 삭제"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-stone-600 bg-white p-3 rounded-xl border border-stone-200/60 leading-relaxed">
                    {entry.notes}
                  </p>
                </div>
              );
            })}

            {entries.length === 0 && (
              <div className="p-8 text-center bg-stone-50 rounded-2xl text-stone-500 text-xs">
                아직 작성된 산림치유 일지가 없습니다. 첫 방문 후기를 기록해 보세요!
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 2: Bookmarks */}
      {activeTab === 'bookmarks' && (
        <div className="mt-6">
          {bookmarkedForests.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {bookmarkedForests.map((forest) => (
                <div
                  key={forest.id}
                  className="p-4 bg-stone-50/70 rounded-2xl border border-stone-200/80 flex flex-col justify-between space-y-3"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-stone-500">{forest.region} · {forest.type}</span>
                      <button
                        onClick={() => onToggleBookmark(forest.id)}
                        className="text-amber-500 hover:text-amber-700"
                      >
                        <Bookmark className="w-3.5 h-3.5 fill-amber-500" />
                      </button>
                    </div>
                    <h4 className="text-sm font-bold text-stone-900 mt-1">{forest.name}</h4>
                    <p className="text-xs text-stone-600 mt-1 line-clamp-2">{forest.summary}</p>
                  </div>

                  <button
                    onClick={() => onSelectForest(forest)}
                    className="w-full flex items-center justify-center gap-1.5 py-2 px-3 bg-white hover:bg-emerald-50 text-stone-800 text-xs font-medium rounded-xl border border-stone-200 transition-colors"
                  >
                    <span>상세 코스 보기</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center bg-stone-50 rounded-2xl text-stone-500 text-xs">
              찜한 휴양림이 없습니다. 탐색 메뉴에서 마음에 드는 휴양림을 북마크해 보세요.
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Saved Prescriptions */}
      {activeTab === 'prescriptions' && (
        <div className="mt-6 space-y-3">
          {savedPrescriptions.length > 0 ? (
            savedPrescriptions.map((p, idx) => (
              <div
                key={idx}
                className="p-4 bg-stone-50/70 rounded-2xl border border-emerald-900/10 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-stone-900">{p.title}</h4>
                  <span className="text-xs text-emerald-800 font-medium">
                    추천 숲: {p.recommendedForest?.name}
                  </span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed bg-white p-3 rounded-xl border border-stone-200/60">
                  {p.summaryDiagnosis}
                </p>
                <div className="text-[11px] text-stone-500 pt-1">
                  <strong>핵심 스팟:</strong> {p.recommendedForest?.keySpot}
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center bg-stone-50 rounded-2xl text-stone-500 text-xs">
              보관된 산림치유 처방전이 없습니다.
              <button
                onClick={onOpenPrescription}
                className="block mx-auto mt-3 px-4 py-2 bg-emerald-800 text-white rounded-xl hover:bg-emerald-900 transition-colors"
              >
                지금 AI 맞춤 처방받기
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
