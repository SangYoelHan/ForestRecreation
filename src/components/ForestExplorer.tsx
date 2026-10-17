import React, { useState, useMemo } from 'react';
import { Search, Trees, Mountain, Gauge, Bookmark, ArrowUpRight, Filter } from 'lucide-react';
import { ForestItem, FOREST_LIST } from '../data/forestData';

interface Props {
  onSelectForest: (forest: ForestItem) => void;
  bookmarkedIds: string[];
  onToggleBookmark: (id: string) => void;
}

export const ForestExplorer: React.FC<Props> = ({
  onSelectForest,
  bookmarkedIds,
  onToggleBookmark,
}) => {
  const [selectedRegion, setSelectedRegion] = useState<string>('전체');
  const [selectedTheme, setSelectedTheme] = useState<string>('전체');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'phytoncide' | 'trail' | 'altitude'>('phytoncide');

  const regions = ['전체', '수도권', '강원권', '충청권', '전라권', '경상권', '제주권'];
  const themes = [
    '전체',
    '피톤치드산림욕',
    '데크로드산책',
    '맨발어싱',
    '숲속숙박',
    '수치유족욕',
    '명상해먹',
  ];

  const filteredForests = useMemo(() => {
    return FOREST_LIST.filter((f) => {
      // Region filter
      if (selectedRegion !== '전체' && f.region !== selectedRegion) return false;

      // Theme filter
      if (selectedTheme !== '전체' && !f.themes.includes(selectedTheme as any)) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = f.name.toLowerCase().includes(q);
        const matchesLocation = f.location.toLowerCase().includes(q);
        const matchesTrees = f.mainTrees.some((t) => t.toLowerCase().includes(q));
        const matchesDesc = f.summary.toLowerCase().includes(q);
        if (!matchesName && !matchesLocation && !matchesTrees && !matchesDesc) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'phytoncide') return b.phytoncideIndex - a.phytoncideIndex;
      if (sortBy === 'trail') return b.trailLengthKm - a.trailLengthKm;
      if (sortBy === 'altitude') return b.altitudeMeters - a.altitudeMeters;
      return 0;
    });
  }, [selectedRegion, selectedTheme, searchQuery, sortBy]);

  return (
    <div className="space-y-6">
      {/* Search and Sort Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-stone-200/90 shadow-sm">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="휴양림 명칭, 수종(편백·소나무·잣나무), 지역 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 text-stone-800 placeholder-stone-400 focus:outline-none focus:border-emerald-700 focus:bg-white transition-all"
          />
        </div>

        {/* Sort Select */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs text-stone-500 whitespace-nowrap">정렬:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="text-xs py-2 px-3 rounded-xl border border-stone-200 bg-white text-stone-700 focus:outline-none focus:border-emerald-700 cursor-pointer"
          >
            <option value="phytoncide">피톤치드 지수 높은 순</option>
            <option value="trail">치유숲길 긴 순 (km)</option>
            <option value="altitude">해발 고도 높은 순 (m)</option>
          </select>
        </div>
      </div>

      {/* Region Segmented Filter */}
      <div className="space-y-2">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <span className="text-stone-400 font-medium whitespace-nowrap shrink-0 mr-1.5">
            권역:
          </span>
          <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-xl">
            {regions.map((region) => (
              <button
                key={region}
                onClick={() => setSelectedRegion(region)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                  selectedRegion === region
                    ? 'bg-white text-emerald-900 shadow-sm'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {region}
              </button>
            ))}
          </div>
        </div>

        {/* Theme Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <span className="text-stone-400 font-medium whitespace-nowrap shrink-0 mr-1.5">
            테마:
          </span>
          <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-xl">
            {themes.map((theme) => (
              <button
                key={theme}
                onClick={() => setSelectedTheme(theme)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                  selectedTheme === theme
                    ? 'bg-white text-emerald-900 shadow-sm'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {theme === '전체' ? '전체 테마' : `#${theme}`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Count Bar */}
      <div className="flex items-center justify-between text-xs text-stone-500 px-1">
        <div>
          전국 국립·공립 휴양림 &amp; 치유의 숲{' '}
          <strong className="text-emerald-800 font-mono tabular-nums">{filteredForests.length}</strong>곳
        </div>
        <div className="text-[11px] text-stone-400">
          국립산림과학원 피톤치드 공인 지수 반영
        </div>
      </div>

      {/* Forest Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredForests.map((forest) => {
          const isBookmarked = bookmarkedIds.includes(forest.id);
          return (
            <div
              key={forest.id}
              className="bg-white rounded-2xl border border-stone-200/90 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between group"
            >
              {/* Card Media Header - Rich styled nature canvas with zero broken images */}
              <div
                className="relative p-5 text-white flex flex-col justify-between h-40 overflow-hidden cursor-pointer"
                style={{
                  background: `linear-gradient(135deg, ${forest.accentColor} 0%, #0d2818 100%)`,
                }}
                onClick={() => onSelectForest(forest)}
              >
                {/* Subtle topographic pattern */}
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="90%" cy="10%" r="80" fill="none" stroke="#ffffff" strokeWidth="1" />
                    <circle cx="90%" cy="10%" r="50" fill="none" stroke="#ffffff" strokeWidth="1" />
                    <circle cx="90%" cy="10%" r="20" fill="none" stroke="#ffffff" strokeWidth="1" />
                  </svg>
                </div>

                {/* Top unboxed metadata */}
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-1.5 text-[11px] text-white/80 font-medium">
                    <span>{forest.region}</span>
                    <span aria-hidden="true">·</span>
                    <span>{forest.type}</span>
                  </div>

                  {/* Bookmark Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleBookmark(forest.id);
                    }}
                    className="p-1.5 rounded-lg bg-black/20 hover:bg-black/40 text-white/90 transition-colors"
                  >
                    <Bookmark
                      className={`w-3.5 h-3.5 ${
                        isBookmarked ? 'fill-amber-400 text-amber-400' : ''
                      }`}
                    />
                  </button>
                </div>

                {/* Forest Title & Altitude */}
                <div className="relative z-10">
                  <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-emerald-200 transition-colors">
                    {forest.name}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-white/80 mt-0.5">
                    <span className="font-mono tabular-nums">해발 {forest.altitudeMeters}m</span>
                    <span aria-hidden="true">·</span>
                    <span>숲길 {forest.trailLengthKm}km</span>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                  {forest.summary}
                </p>

                {/* Tree Types & Phytoncide Index */}
                <div className="space-y-2 pt-2 border-t border-stone-100">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-stone-500 font-medium">피톤치드 농도 지수</span>
                    <span className="font-mono font-bold text-emerald-800 tabular-nums">
                      {forest.phytoncideIndex} / 100
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full h-1.5 bg-stone-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-700 rounded-full"
                      style={{ width: `${forest.phytoncideIndex}%` }}
                    />
                  </div>

                  {/* Tree tags */}
                  <div className="flex items-center gap-1.5 text-[11px] text-stone-500 flex-wrap pt-1">
                    <Trees className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    {forest.mainTrees.map((tree, idx) => (
                      <span key={tree}>
                        {tree}
                        {idx < forest.mainTrees.length - 1 && ' · '}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Action */}
                <div className="pt-2 flex items-center justify-between">
                  <button
                    onClick={() => onSelectForest(forest)}
                    className="w-full flex items-center justify-center gap-1.5 py-2 px-3 bg-stone-50 hover:bg-emerald-50 text-stone-800 hover:text-emerald-900 border border-stone-200 text-xs font-medium rounded-xl transition-colors"
                  >
                    <span>상세 정보 및 코스 보기</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredForests.length === 0 && (
        <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center">
          <Trees className="w-8 h-8 text-stone-400 mx-auto mb-2" />
          <h4 className="text-sm font-semibold text-stone-800">검색 조건에 맞는 휴양림이 없습니다.</h4>
          <p className="text-xs text-stone-500 mt-1">
            다른 권역이나 테마 필터를 선택하시거나 검색어를 확인해 보세요.
          </p>
          <button
            onClick={() => {
              setSelectedRegion('전체');
              setSelectedTheme('전체');
              setSearchQuery('');
            }}
            className="mt-4 px-4 py-2 bg-emerald-800 text-white text-xs font-medium rounded-xl hover:bg-emerald-900 transition-colors"
          >
            전체 목록 다시 보기
          </button>
        </div>
      )}
    </div>
  );
};
