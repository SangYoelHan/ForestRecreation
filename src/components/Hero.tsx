import React from 'react';
import { Compass, Trees, Wind, ArrowDown, ShieldCheck, Heart, Sparkles } from 'lucide-react';

interface Props {
  onOpenPrescription: () => void;
  onExploreClick: () => void;
}

export const Hero: React.FC<Props> = ({ onOpenPrescription, onExploreClick }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-stone-900 via-emerald-950 to-stone-950 text-white py-16 lg:py-24 px-6 rounded-3xl border border-stone-800 shadow-xl">
      {/* Background Topographic and Organic Nature Pattern */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="sunbeam" cx="70%" cy="20%" r="60%">
              <stop offset="0%" stopColor="#4ade80" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#059669" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#sunbeam)" />
          {/* Gentle contour waves */}
          <path
            d="M -100 200 C 300 100, 700 350, 1500 150 L 1500 900 L -100 900 Z"
            fill="#064e3b"
            opacity="0.3"
          />
          <path
            d="M -100 320 C 400 250, 800 420, 1500 280 L 1500 900 L -100 900 Z"
            fill="#022c22"
            opacity="0.5"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
        {/* Unboxed editorial category */}
        <div className="inline-flex items-center gap-2 text-xs font-medium text-emerald-300">
          <span>대한민국 산림청 국립자연휴양림</span>
          <span aria-hidden="true">·</span>
          <span>국립산림과학원 치유의 숲</span>
          <span aria-hidden="true">·</span>
          <span>피톤치드 테라피</span>
        </div>

        {/* Refined Display Headline */}
        <h1
          className="font-bold tracking-tight text-white leading-tight"
          style={{
            fontSize: 'clamp(2.25rem, 4.5vw, 3.75rem)',
            textWrap: 'balance',
          }}
        >
          지친 일상에 건네는 가장 맑은 쉼표,
          <br className="hidden sm:inline" />
          대한민국 국립 산림휴양 &amp; 산림치유
        </h1>

        {/* Subtitle */}
        <p
          className="text-stone-300 text-sm md:text-base leading-relaxed max-w-2xl mx-auto font-light"
          style={{ textWrap: 'balance' }}
        >
          100년 수령의 금강소나무 숲부터 국내 최대 편백 원시림까지.
          피톤치드 농도와 계곡 음이온, 무장애 숲길 데이터를 기반으로
          당신만을 위한 맞춤형 산림치유 여정과 휴양 코스를 설계해 드립니다.
        </p>

        {/* CTAs */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={onOpenPrescription}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold rounded-xl transition-all shadow-lg shadow-emerald-950/40 whitespace-nowrap shrink-0"
          >
            <Compass className="w-4 h-4" />
            <span>AI 맞춤 산림치유 처방전 받기</span>
          </button>

          <button
            onClick={onExploreClick}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white text-xs font-medium rounded-xl border border-white/15 backdrop-blur-md transition-colors whitespace-nowrap shrink-0"
          >
            <Trees className="w-4 h-4 text-emerald-400" />
            <span>전국 휴양림 &amp; 치유의 숲 탐색</span>
          </button>
        </div>
      </div>

      {/* Quantitative Rigor Strip: 4 KPI indicators row */}
      <div className="relative z-10 max-w-5xl mx-auto mt-14 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div className="p-3">
          <span className="text-[11px] text-stone-400 block mb-0.5">전국 공인 치유의 숲</span>
          <span className="text-xl md:text-2xl font-bold font-mono text-emerald-300 tabular-nums">
            158개소+
          </span>
          <span className="text-[11px] text-stone-400 block mt-0.5">국·공립 자연휴양림 연계</span>
        </div>

        <div className="p-3">
          <span className="text-[11px] text-stone-400 block mb-0.5">평균 피톤치드 농도</span>
          <span className="text-xl md:text-2xl font-bold font-mono text-emerald-300 tabular-nums">
            98.4ppm
          </span>
          <span className="text-[11px] text-stone-400 block mt-0.5">편백·금강송 알파-피넨</span>
        </div>

        <div className="p-3">
          <span className="text-[11px] text-stone-400 block mb-0.5">스트레스 호르몬 감소</span>
          <span className="text-xl md:text-2xl font-bold font-mono text-emerald-300 tabular-nums">
            -21.4%
          </span>
          <span className="text-[11px] text-stone-400 block mt-0.5">코르티솔 농도 임상 결과</span>
        </div>

        <div className="p-3">
          <span className="text-[11px] text-stone-400 block mb-0.5">보행 약자 무장애길</span>
          <span className="text-xl md:text-2xl font-bold font-mono text-emerald-300 tabular-nums">
            100% 탐색
          </span>
          <span className="text-[11px] text-stone-400 block mt-0.5">유모차·휠체어 나눔로드</span>
        </div>
      </div>
    </section>
  );
};
