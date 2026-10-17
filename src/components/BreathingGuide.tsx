import React, { useState, useEffect } from 'react';
import { Wind, Play, Pause, RotateCcw, Heart, CheckCircle2 } from 'lucide-react';

type BreathPhase = 'idle' | 'inhale' | 'hold' | 'exhale';

export const BreathingGuide: React.FC = () => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [phase, setPhase] = useState<BreathPhase>('idle');
  const [countdown, setCountdown] = useState<number>(4);
  const [completedCycles, setCompletedCycles] = useState<number>(0);

  // 4-7-8 Breathing Timing
  // Inhale: 4s, Hold: 7s, Exhale: 8s
  useEffect(() => {
    if (!isActive) {
      setPhase('idle');
      setCountdown(4);
      return;
    }

    let currentPhase: BreathPhase = phase === 'idle' ? 'inhale' : phase;
    let currentSeconds = countdown;

    if (phase === 'idle') {
      setPhase('inhale');
      setCountdown(4);
      currentPhase = 'inhale';
      currentSeconds = 4;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev > 1) {
          return prev - 1;
        }

        // Phase Transition
        if (currentPhase === 'inhale') {
          currentPhase = 'hold';
          setPhase('hold');
          return 7;
        } else if (currentPhase === 'hold') {
          currentPhase = 'exhale';
          setPhase('exhale');
          return 8;
        } else {
          // exhale finished -> one cycle complete
          setCompletedCycles((c) => c + 1);
          currentPhase = 'inhale';
          setPhase('inhale');
          return 4;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, phase]);

  const toggleExercise = () => {
    setIsActive(!isActive);
  };

  const resetExercise = () => {
    setIsActive(false);
    setPhase('idle');
    setCountdown(4);
    setCompletedCycles(0);
  };

  const getPhaseText = () => {
    switch (phase) {
      case 'inhale':
        return {
          title: '피톤치드 들이마시기 (들숨)',
          desc: '소나무와 편백의 맑은 숲 내음을 코로 천천히 들이마십니다.',
          badgeColor: 'text-emerald-800 bg-emerald-50',
          scale: 'scale-125',
          duration: 'duration-[4000ms]',
        };
      case 'hold':
        return {
          title: '호흡 멈추기 (흡수)',
          desc: '수목의 테르펜 유효성분이 폐포와 혈관 깊숙이 흡수됩니다.',
          badgeColor: 'text-amber-800 bg-amber-50',
          scale: 'scale-125',
          duration: 'duration-[7000ms]',
        };
      case 'exhale':
        return {
          title: '일상의 긴장 비워내기 (날숨)',
          desc: '입을 오므려 몸속의 독소와 누적된 피로를 길게 내쉽니다.',
          badgeColor: 'text-blue-800 bg-blue-50',
          scale: 'scale-90',
          duration: 'duration-[8000ms]',
        };
      default:
        return {
          title: '산림 4-7-8 이완 호흡',
          desc: '산림청 산림치유원에서 권장하는 심박안정 피톤치드 심호흡법입니다.',
          badgeColor: 'text-stone-700 bg-stone-100',
          scale: 'scale-100',
          duration: 'duration-300',
        };
    }
  };

  const phaseInfo = getPhaseText();

  return (
    <div className="bg-white border border-stone-200/90 rounded-2xl p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-stone-100">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-semibold text-stone-900">4-7-8 산림 피톤치드 호흡 가이드</h3>
            <span className="text-xs text-emerald-800 font-medium">자율신경 밸런스</span>
          </div>
          <p className="text-xs text-stone-500 mt-0.5">
            4초 들숨(피톤치드 흡입) → 7초 멈춤(테르펜 세포 침투) → 8초 날숨(스트레스 배출)
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-50 border border-stone-200/60 rounded-xl text-xs text-stone-700 font-medium">
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>완료한 호흡:</span>
            <span className="font-mono font-bold text-emerald-800 tabular-nums">
              {completedCycles}회
            </span>
          </div>
        </div>
      </div>

      {/* Main Breathing Circle Area */}
      <div className="py-8 flex flex-col items-center justify-center">
        <div className="relative w-56 h-56 flex items-center justify-center">
          {/* Subtle Outer Pulsing Halo */}
          <div
            className={`absolute inset-0 rounded-full transition-all ease-in-out ${
              phase === 'inhale'
                ? 'bg-emerald-100/70 scale-125 duration-[4000ms]'
                : phase === 'hold'
                ? 'bg-amber-100/70 scale-125 duration-[7000ms]'
                : phase === 'exhale'
                ? 'bg-blue-100/60 scale-90 duration-[8000ms]'
                : 'bg-emerald-50 scale-100 duration-500'
            }`}
          />

          {/* Inner Breathing Core */}
          <div
            className={`relative w-44 h-44 rounded-full flex flex-col items-center justify-center shadow-inner transition-all ease-in-out text-center p-4 ${
              phase === 'inhale'
                ? 'bg-gradient-to-br from-emerald-600 to-emerald-700 text-white shadow-emerald-700/20'
                : phase === 'hold'
                ? 'bg-gradient-to-br from-amber-600 to-amber-700 text-white shadow-amber-700/20'
                : phase === 'exhale'
                ? 'bg-gradient-to-br from-teal-700 to-blue-700 text-white shadow-blue-700/20'
                : 'bg-emerald-800 text-white shadow-emerald-900/10'
            }`}
          >
            <span className="text-4xl font-mono font-bold tabular-nums tracking-tight">
              {isActive ? countdown : '4-7-8'}
            </span>
            <span className="text-xs font-medium mt-1 tracking-wide opacity-90">
              {phase === 'inhale'
                ? '들숨'
                : phase === 'hold'
                ? '숨 참기'
                : phase === 'exhale'
                ? '날숨'
                : '준비'}
            </span>
          </div>
        </div>

        {/* Phase textual feedback */}
        <div className="mt-6 text-center max-w-sm">
          <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-1.5 transition-colors">
            {phaseInfo.title}
          </div>
          <p className="text-xs text-stone-600 leading-relaxed">{phaseInfo.desc}</p>
        </div>

        {/* Controls */}
        <div className="mt-6 flex items-center gap-3">
          <button
            onClick={toggleExercise}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-xs transition-colors shadow-sm whitespace-nowrap shrink-0 ${
              isActive
                ? 'bg-stone-800 text-white hover:bg-stone-900'
                : 'bg-emerald-800 text-white hover:bg-emerald-900'
            }`}
          >
            {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
            <span>{isActive ? '호흡 일시정지' : '호흡 시작하기'}</span>
          </button>

          <button
            onClick={resetExercise}
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-medium border border-stone-200 text-stone-600 hover:bg-stone-50 transition-colors whitespace-nowrap shrink-0"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>초기화</span>
          </button>
        </div>
      </div>

      {/* Scientific Tip Footer */}
      <div className="mt-2 pt-4 border-t border-stone-100 flex items-start gap-2.5 text-xs text-stone-500">
        <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-stone-800 font-semibold">산림의학 팁:</strong> 편백나무와 소나무의 피톤치드는 오전 10시~오후 2시 사이, 기온 20~25℃, 습도 50~60%일 때 방출량이 최대에 이릅니다. 나무 주변에서 깊게 4회 이상 반복하면 심박 변이도(HRV)가 즉각 안정됩니다.
        </p>
      </div>
    </div>
  );
};
