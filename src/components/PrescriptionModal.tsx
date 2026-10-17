import React, { useState } from 'react';
import { X, Sparkles, Compass, Clock, CheckCircle, Copy, Check, Printer, FileText, ArrowRight, ShieldCheck } from 'lucide-react';

interface PrescriptionData {
  title: string;
  summaryDiagnosis: string;
  recommendedForest: {
    name: string;
    reason: string;
    keySpot: string;
  };
  timeTable: {
    time: string;
    title: string;
    guide: string;
  }[];
  fiveSensesTherapy: {
    sight: string;
    smell: string;
    hearing: string;
    touch: string;
    taste: string;
  };
  scientificEfficacy: string;
  therapistAdvice: string;
  checklist: string[];
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSaveToJournal?: (prescription: PrescriptionData) => void;
}

export const PrescriptionModal: React.FC<Props> = ({ isOpen, onClose, onSaveToJournal }) => {
  const [step, setStep] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // Form selections
  const [stressType, setStressType] = useState<string>('만성 피로 및 번아웃');
  const [companion, setCompanion] = useState<string>('나홀로 고요한 힐링');
  const [selectedActivities, setSelectedActivities] = useState<string[]>([
    '피톤치드 산림욕',
    '무장애 데크로드 걷기',
  ]);
  const [duration, setDuration] = useState<string>('당일 힐링 코스');
  const [region, setRegion] = useState<string>('전국 무관');

  const [prescription, setPrescription] = useState<PrescriptionData | null>(null);

  if (!isOpen) return null;

  const stressOptions = [
    { label: '만성 피로 및 직무 번아웃', desc: '휴식을 취해도 피로가 풀리지 않고 의욕이 저하된 상태' },
    { label: '수면 장애 및 불면증', desc: '잠들기 어렵고 자주 깨며 숙면을 취하지 못하는 상태' },
    { label: '디지털 디톡스 & 브레인포그', desc: '스마트폰과 모니터 과다 사용으로 머리가 무겁고 산만한 상태' },
    { label: '정서적 불안 및 우울감', desc: '가슴이 답답하고 기분 전환과 정서적 위로가 필요한 상태' },
    { label: '체력 저하 및 활력 회복', desc: '가벼운 신체 활동과 깨끗한 공기로 생체 리듬을 되찾고 싶은 상태' },
  ];

  const companionOptions = [
    '나홀로 고요한 힐링',
    '연인 / 배우자와 함께',
    '자녀 동반 가족 힐링',
    '부모님 효도 산림욕',
    '친구 / 모임 힐링',
  ];

  const activityOptions = [
    '피톤치드 산림욕',
    '무장애 데크로드 걷기',
    '황토 맨발 어싱(접지)',
    '숲속 해먹 명상',
    '계곡 족욕 및 수치유',
    '숲속 통나무집 숙박',
    '숲해설사 동행 프로그램',
  ];

  const durationOptions = ['당일 힐링 코스', '1박 2일 휴양림 숙박', '주말 2박 3일 완전 쉼'];
  const regionOptions = ['전국 무관', '수도권 (경기/강원 서부)', '강원권', '충청권', '전라권', '경상권', '제주권'];

  const toggleActivity = (act: string) => {
    setSelectedActivities((prev) =>
      prev.includes(act) ? prev.filter((a) => a !== act) : [...prev, act]
    );
  };

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/prescribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          stressType,
          companion,
          activities: selectedActivities,
          duration,
          region,
        }),
      });

      if (!res.ok) throw new Error('처방전 요청 실패');
      const data = await res.json();
      if (data.prescription) {
        setPrescription(data.prescription);
        setStep(3); // Result step
      }
    } catch (err) {
      console.error(err);
      // Fallback display if server error
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!prescription) return;
    const text = `[포레스트 힐 산림치유 처방전]
제목: ${prescription.title}
진단 요약: ${prescription.summaryDiagnosis}
추천 숲: ${prescription.recommendedForest.name}
핵심 스팟: ${prescription.recommendedForest.keySpot}
추천 사유: ${prescription.recommendedForest.reason}

[오감 치유 프로토콜]
- 후각: ${prescription.fiveSensesTherapy.smell}
- 청각: ${prescription.fiveSensesTherapy.hearing}
- 촉각: ${prescription.fiveSensesTherapy.touch}
- 시각: ${prescription.fiveSensesTherapy.sight}
- 미각: ${prescription.fiveSensesTherapy.taste}

지도사 조언: ${prescription.therapistAdvice}
`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-stone-200 overflow-hidden my-8">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100 bg-stone-50/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-800 text-white flex items-center justify-center font-bold text-sm">
              治
            </div>
            <div>
              <h2 className="text-base font-bold text-stone-900">
                AI 산림치유 처방전 (Forest Therapy Prescription)
              </h2>
              <p className="text-xs text-stone-500">
                대한민국 국립자연휴양림 및 치유의 숲 산림의학 맞춤 처방
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {/* STEP 1: Symptoms and Companion */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-semibold text-emerald-800 tracking-wider">
                  STEP 1 / 2
                </span>
                <h3 className="text-lg font-bold text-stone-900 mt-1">
                  현재 가장 완화하고 싶은 증상이나 스트레스는 무엇인가요?
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  선택하신 상태에 맞춰 피톤치드 농도와 수종(편백, 소나무, 잣나무)을 맞춤 처방합니다.
                </p>
              </div>

              {/* Stress options */}
              <div className="grid grid-cols-1 gap-2.5">
                {stressOptions.map((opt) => (
                  <button
                    key={opt.label}
                    onClick={() => setStressType(opt.label)}
                    className={`text-left p-3.5 rounded-xl border transition-all ${
                      stressType === opt.label
                        ? 'border-emerald-800 bg-emerald-50/60 shadow-sm'
                        : 'border-stone-200 hover:border-stone-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-stone-900">{opt.label}</span>
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          stressType === opt.label
                            ? 'border-emerald-800 bg-emerald-800 text-white'
                            : 'border-stone-300'
                        }`}
                      >
                        {stressType === opt.label && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                    </div>
                    <p className="text-xs text-stone-500 mt-1">{opt.desc}</p>
                  </button>
                ))}
              </div>

              {/* Companion */}
              <div className="pt-2">
                <label className="block text-xs font-semibold text-stone-800 mb-2">
                  동행 형태
                </label>
                <div className="flex flex-wrap gap-2">
                  {companionOptions.map((comp) => (
                    <button
                      key={comp}
                      onClick={() => setCompanion(comp)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                        companion === comp
                          ? 'bg-emerald-800 text-white border-emerald-800'
                          : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                      }`}
                    >
                      {comp}
                    </button>
                  ))}
                </div>
              </div>

              {/* Next Button */}
              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  className="flex items-center gap-1.5 px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-medium rounded-xl transition-colors shadow-sm"
                >
                  <span>다음 단계 (선호 활동 선택)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Activities & Region */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-semibold text-emerald-800 tracking-wider">
                  STEP 2 / 2
                </span>
                <h3 className="text-lg font-bold text-stone-900 mt-1">
                  선호하는 산림치유 활동과 일정을 선택해 주세요.
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  복수 선택 가능합니다. 현지 휴양림의 특화 시설과 연계해 안내합니다.
                </p>
              </div>

              {/* Activities */}
              <div>
                <label className="block text-xs font-semibold text-stone-800 mb-2">
                  희망 활동 (복수 선택)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {activityOptions.map((act) => {
                    const isSelected = selectedActivities.includes(act);
                    return (
                      <button
                        key={act}
                        onClick={() => toggleActivity(act)}
                        className={`p-2.5 rounded-xl border text-xs font-medium text-left transition-colors ${
                          isSelected
                            ? 'bg-emerald-800 text-white border-emerald-800 shadow-sm'
                            : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{act}</span>
                          {isSelected && <Check className="w-3.5 h-3.5" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Duration & Region */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-800 mb-2">
                    희망 일정
                  </label>
                  <select
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-stone-200 bg-white text-stone-800 focus:outline-none focus:border-emerald-700"
                  >
                    {durationOptions.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-800 mb-2">
                    선호 권역
                  </label>
                  <select
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-stone-200 bg-white text-stone-800 focus:outline-none focus:border-emerald-700"
                  >
                    {regionOptions.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Navigation */}
              <div className="pt-4 flex items-center justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="px-4 py-2.5 text-xs font-medium text-stone-600 hover:bg-stone-100 rounded-xl transition-colors"
                >
                  이전으로
                </button>
                <button
                  onClick={handleGenerate}
                  disabled={loading}
                  className="flex items-center gap-2 px-6 py-2.5 bg-emerald-800 hover:bg-emerald-900 disabled:opacity-50 text-white text-xs font-medium rounded-xl transition-colors shadow-sm"
                >
                  {loading ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>산림치유 처방전 조율 중...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>맞춤 처방전 발급하기</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Prescription Result */}
          {step === 3 && prescription && (
            <div className="space-y-6">
              {/* Prescription Card */}
              <div className="p-6 bg-stone-50/70 border border-emerald-900/10 rounded-2xl relative">
                {/* Stamp */}
                <div className="absolute top-5 right-5 w-16 h-16 rounded-full border-2 border-emerald-800/40 text-emerald-800 flex flex-col items-center justify-center rotate-12 pointer-events-none select-none">
                  <span className="text-[10px] font-bold">산림청 공인</span>
                  <span className="text-[11px] font-extrabold">치유처방</span>
                  <span className="text-[9px]">ForestHeal</span>
                </div>

                <div className="text-xs text-emerald-800 font-semibold tracking-wide">
                  대한민국 맞춤 산림치유 처방전
                </div>
                <h3 className="text-xl font-bold text-stone-900 mt-1">
                  {prescription.title}
                </h3>
                <p className="text-xs text-stone-600 mt-2 leading-relaxed bg-white/80 p-3 rounded-xl border border-stone-200/60">
                  {prescription.summaryDiagnosis}
                </p>

                {/* Recommended Forest Box */}
                <div className="mt-4 p-4 bg-emerald-900 text-white rounded-xl">
                  <div className="flex items-center gap-2 text-xs text-emerald-200 font-medium">
                    <Compass className="w-3.5 h-3.5" />
                    <span>추천 국립 치유의 숲 &amp; 자연휴양림</span>
                  </div>
                  <div className="text-base font-bold mt-1">
                    {prescription.recommendedForest.name}
                  </div>
                  <div className="text-xs text-emerald-100 mt-1 leading-relaxed">
                    <strong>추천 이유:</strong> {prescription.recommendedForest.reason}
                  </div>
                  <div className="text-xs text-amber-200 mt-1">
                    <strong>핵심 힐링 스팟:</strong> {prescription.recommendedForest.keySpot}
                  </div>
                </div>

                {/* Timeline */}
                <div className="mt-5">
                  <h4 className="text-xs font-bold text-stone-800 mb-2.5 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-emerald-700" />
                    <span>추천 시간대별 산림치유 일정</span>
                  </h4>
                  <div className="space-y-2">
                    {prescription.timeTable.map((slot, idx) => (
                      <div
                        key={idx}
                        className="p-3 bg-white rounded-xl border border-stone-200/60 text-xs"
                      >
                        <div className="flex items-center justify-between text-stone-800 font-semibold">
                          <span>{slot.title}</span>
                          <span className="text-stone-500 font-mono text-[11px]">{slot.time}</span>
                        </div>
                        <p className="text-stone-600 mt-1 leading-relaxed">{slot.guide}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 5 Senses Therapy */}
                <div className="mt-5">
                  <h4 className="text-xs font-bold text-stone-800 mb-2 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                    <span>오감(五感) 산림치유 프로토콜</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 bg-white rounded-lg border border-stone-200/60">
                      <span className="font-semibold text-emerald-800">후각 (피톤치드):</span>{' '}
                      <span className="text-stone-600">{prescription.fiveSensesTherapy.smell}</span>
                    </div>
                    <div className="p-2.5 bg-white rounded-lg border border-stone-200/60">
                      <span className="font-semibold text-blue-800">청각 (1/f 요동):</span>{' '}
                      <span className="text-stone-600">{prescription.fiveSensesTherapy.hearing}</span>
                    </div>
                    <div className="p-2.5 bg-white rounded-lg border border-stone-200/60">
                      <span className="font-semibold text-amber-800">촉각 (맨발 어싱):</span>{' '}
                      <span className="text-stone-600">{prescription.fiveSensesTherapy.touch}</span>
                    </div>
                    <div className="p-2.5 bg-white rounded-lg border border-stone-200/60">
                      <span className="font-semibold text-teal-800">시각 (수관 파장):</span>{' '}
                      <span className="text-stone-600">{prescription.fiveSensesTherapy.sight}</span>
                    </div>
                    <div className="p-2.5 bg-white rounded-lg border border-stone-200/60 col-span-1 sm:col-span-2">
                      <span className="font-semibold text-stone-800">미각 (산림차):</span>{' '}
                      <span className="text-stone-600">{prescription.fiveSensesTherapy.taste}</span>
                    </div>
                  </div>
                </div>

                {/* Scientific Efficacy */}
                <div className="mt-4 p-3 bg-emerald-50/80 rounded-xl border border-emerald-100 text-xs text-emerald-900 leading-relaxed">
                  <strong>의학적 기대 효과:</strong> {prescription.scientificEfficacy}
                </div>

                {/* Therapist Advice */}
                <div className="mt-3 p-3 bg-stone-100/70 rounded-xl text-xs text-stone-700 italic leading-relaxed">
                  &ldquo;{prescription.therapistAdvice}&rdquo;
                </div>

                {/* Checklist */}
                {prescription.checklist && prescription.checklist.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-stone-200/60">
                    <span className="text-xs font-semibold text-stone-800">지참 준비물:</span>
                    <ul className="mt-1.5 space-y-1 text-xs text-stone-600">
                      {prescription.checklist.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-1.5">
                          <CheckCircle className="w-3 h-3 text-emerald-700" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Bottom Actions */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <button
                  onClick={() => setStep(1)}
                  className="px-3.5 py-2 text-xs font-medium text-stone-600 hover:bg-stone-100 rounded-xl transition-colors"
                >
                  처방 조건 다시 설정
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center gap-1.5 px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-medium rounded-xl transition-colors"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? '복사 완료' : '처방전 복사'}</span>
                  </button>

                  {onSaveToJournal && (
                    <button
                      onClick={() => {
                        onSaveToJournal(prescription);
                        onClose();
                      }}
                      className="flex items-center gap-1.5 px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-medium rounded-xl transition-colors shadow-sm"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>치유 일지에 보관하기</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
