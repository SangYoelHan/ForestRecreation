import React from 'react';
import { X, Trees, MapPin, Gauge, Mountain, ExternalLink, Bookmark, Check, Calendar, Compass, ShieldCheck } from 'lucide-react';
import { ForestItem } from '../data/forestData';

interface Props {
  forest: ForestItem | null;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  onOpenPrescription: () => void;
}

export const ForestDetailModal: React.FC<Props> = ({
  forest,
  onClose,
  isBookmarked,
  onToggleBookmark,
  onOpenPrescription,
}) => {
  if (!forest) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-stone-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Banner with organic gradient & topography motif */}
        <div
          className="relative px-6 pt-8 pb-6 text-white overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${forest.accentColor} 0%, #0d2818 100%)`,
          }}
        >
          {/* Subtle topography SVG pattern */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="contour" width="60" height="60" patternUnits="userSpaceOnUse">
                  <path
                    d="M0 20 Q 30 10, 60 20 T 120 20 M0 40 Q 30 50, 60 40 T 120 40"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="1"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#contour)" />
            </svg>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white/90 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Unboxed category & metadata */}
          <div className="flex items-center gap-2 text-xs text-white/80 font-medium">
            <span>{forest.region}</span>
            <span aria-hidden="true">·</span>
            <span>{forest.type}</span>
            <span aria-hidden="true">·</span>
            <span>피톤치드 지수 {forest.phytoncideIndex}/100</span>
          </div>

          <h2 className="text-2xl font-bold tracking-tight text-white mt-1.5">
            {forest.name}
          </h2>
          <p className="text-xs text-white/90 mt-1 max-w-lg leading-relaxed font-light">
            {forest.summary}
          </p>

          {/* Key metrics strip */}
          <div className="mt-5 grid grid-cols-3 gap-2.5 pt-4 border-t border-white/15">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-2.5">
              <span className="text-[11px] text-white/70 block">해발 고도</span>
              <span className="text-sm font-semibold font-mono tabular-nums">{forest.altitudeMeters}m</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-2.5">
              <span className="text-[11px] text-white/70 block">치유숲길 총연장</span>
              <span className="text-sm font-semibold font-mono tabular-nums">{forest.trailLengthKm}km</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-2.5">
              <span className="text-[11px] text-white/70 block">보행 난이도</span>
              <span className="text-sm font-semibold">{forest.difficulty}</span>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
          {/* Location */}
          <div className="flex items-start gap-2.5 text-xs text-stone-600 bg-stone-50 p-3 rounded-xl border border-stone-200/60">
            <MapPin className="w-4 h-4 text-emerald-800 shrink-0 mt-0.5" />
            <div>
              <strong className="text-stone-800 font-semibold">소재지:</strong> {forest.location}
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-xs font-bold text-stone-900 tracking-wider">
              숲 소개 및 생태 환경
            </h3>
            <p className="text-xs text-stone-600 mt-2 leading-relaxed">
              {forest.description}
            </p>
          </div>

          {/* Tree Species */}
          <div>
            <h3 className="text-xs font-bold text-stone-900 tracking-wider flex items-center gap-1.5">
              <Trees className="w-3.5 h-3.5 text-emerald-700" />
              <span>주요 자생 수목 (피톤치드 원천)</span>
            </h3>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {forest.mainTrees.map((tree) => (
                <span
                  key={tree}
                  className="px-2.5 py-1 text-xs bg-emerald-50 text-emerald-900 rounded-lg border border-emerald-100 font-medium"
                >
                  {tree}
                </span>
              ))}
            </div>
          </div>

          {/* Healing Highlights */}
          <div>
            <h3 className="text-xs font-bold text-stone-900 tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span>핵심 산림치유 포인트</span>
            </h3>
            <ul className="mt-2 space-y-2">
              {forest.healingHighlights.map((hl, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-stone-600">
                  <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{hl}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h3 className="text-xs font-bold text-stone-900 tracking-wider flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-emerald-700" />
              <span>운영 산림치유 및 체험 프로그램</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
              {forest.programs.map((prog, idx) => (
                <div
                  key={idx}
                  className="p-2.5 bg-stone-50 rounded-xl border border-stone-200/60 text-xs text-stone-700 font-medium"
                >
                  {prog}
                </div>
              ))}
            </div>
          </div>

          {/* Booking Info Box */}
          <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold text-emerald-900 block">
                {forest.bookingInfo.platform}
              </span>
              <p className="text-xs text-emerald-700 mt-0.5">{forest.bookingInfo.tip}</p>
            </div>
            <a
              href={forest.bookingInfo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-medium rounded-xl transition-colors shrink-0 shadow-sm"
            >
              <span>예약 안내 바로가기</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 px-6 border-t border-stone-100 bg-stone-50/50 flex items-center justify-between gap-3">
          <button
            onClick={() => onToggleBookmark(forest.id)}
            className={`flex items-center gap-1.5 px-4 py-2 text-xs font-medium rounded-xl border transition-colors ${
              isBookmarked
                ? 'bg-amber-50 text-amber-900 border-amber-300'
                : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-100'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-amber-600 text-amber-600' : ''}`} />
            <span>{isBookmarked ? '찜한 휴양림' : '휴양림 찜하기'}</span>
          </button>

          <button
            onClick={() => {
              onClose();
              onOpenPrescription();
            }}
            className="flex items-center gap-1.5 px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-medium rounded-xl transition-colors shadow-sm"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>이 숲으로 AI 처방받기</span>
          </button>
        </div>
      </div>
    </div>
  );
};
