import React, { useState } from 'react';
import { Wind, Volume2, Footprints, Eye, Coffee, Check, ShieldCheck } from 'lucide-react';
import { HEALING_ACTIVITIES, HealingActivity } from '../data/forestData';

export const FiveSensesSection: React.FC = () => {
  const [activeSense, setActiveSense] = useState<string>('후각');

  const senseIcons: { [key: string]: React.ReactNode } = {
    후각: <Wind className="w-4 h-4" />,
    청각: <Volume2 className="w-4 h-4" />,
    촉각: <Footprints className="w-4 h-4" />,
    시각: <Eye className="w-4 h-4" />,
    미각: <Coffee className="w-4 h-4" />,
  };

  const currentActivity = HEALING_ACTIVITIES.find((a) => a.sense === activeSense) || HEALING_ACTIVITIES[0];

  return (
    <div className="bg-white rounded-3xl border border-stone-200/90 p-6 md:p-8 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-stone-100">
        <div>
          <span className="text-xs font-semibold text-emerald-800 tracking-wider">
            SCIENTIFIC FOREST THERAPY
          </span>
          <h2 className="text-2xl font-bold tracking-tight text-stone-900 mt-1">
            숲의 오감(五感) 치유 메커니즘
          </h2>
          <p className="text-xs text-stone-500 mt-1 max-w-xl leading-relaxed">
            국립산림과학원의 의학적 임상 연구에 기반하여, 숲이 인체 자율신경계와 면역체계에 작용하는 5가지 과학적 감각 치유 원리를 소개합니다.
          </p>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-xl overflow-x-auto">
          {HEALING_ACTIVITIES.map((act) => (
            <button
              key={act.sense}
              onClick={() => setActiveSense(act.sense)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                activeSense === act.sense
                  ? 'bg-white text-emerald-900 shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <span>{senseIcons[act.sense]}</span>
              <span>{act.sense} 치유</span>
            </button>
          ))}
        </div>
      </div>

      {/* Active Sense Detail Showcase */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left: Deep guide */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center gap-2 text-xs text-emerald-800 font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>{currentActivity.sense} 자극 요법 · 권장 시간 {currentActivity.durationMinutes}분</span>
          </div>

          <h3 className="text-xl font-bold text-stone-900">
            {currentActivity.title}
          </h3>
          <p className="text-xs text-stone-600 leading-relaxed font-medium">
            {currentActivity.subtitle}
          </p>

          <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200/60 space-y-2">
            <span className="text-xs font-bold text-stone-800 block">생리학적 작용 기전</span>
            <p className="text-xs text-stone-600 leading-relaxed">
              {currentActivity.mechanism}
            </p>
          </div>

          <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-100 space-y-2">
            <span className="text-xs font-bold text-emerald-950 block">현장 실천 가이드</span>
            <p className="text-xs text-emerald-900 leading-relaxed">
              {currentActivity.instruction}
            </p>
          </div>

          <div className="pt-2 text-xs text-stone-500 flex items-start gap-2">
            <Check className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <span>
              <strong className="text-stone-800">임상 효과:</strong> {currentActivity.scientificBenefit}
            </span>
          </div>
        </div>

        {/* Right: Informational graphic card */}
        <div className="lg:col-span-5 bg-gradient-to-br from-stone-900 to-emerald-950 text-white rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between min-h-[300px]">
          {/* Subtle organic SVG accent */}
          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
            <svg width="200" height="200" viewBox="0 0 100 100">
              <path
                d="M 50 10 C 20 40, 20 70, 50 90 C 80 70, 80 40, 50 10 Z"
                fill="currentColor"
              />
            </svg>
          </div>

          <div>
            <div className="text-xs font-mono text-emerald-300">
              FOREST SENSE PROTOCOL // 0{HEALING_ACTIVITIES.findIndex((a) => a.sense === activeSense) + 1}
            </div>
            <div className="text-2xl font-bold mt-2">
              {currentActivity.sense}을 통한 뇌파 동조
            </div>
            <p className="text-xs text-stone-300 mt-2 leading-relaxed font-light">
              숲속 환경에 노출되는 것만으로도 교감신경의 과긴장이 풀리고 부교감신경이 우세해져 신체 자연치유력이 극대화됩니다.
            </p>
          </div>

          <div className="pt-6 border-t border-white/10 mt-6 grid grid-cols-2 gap-3">
            <div>
              <span className="text-[11px] text-white/60 block">권장 소요</span>
              <span className="text-sm font-semibold font-mono tabular-nums">
                {currentActivity.durationMinutes}분
              </span>
            </div>
            <div>
              <span className="text-[11px] text-white/60 block">최적 시간</span>
              <span className="text-sm font-semibold">오전 10:00 ~ 14:00</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
