import React from 'react';
import { ExternalLink, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-20 border-t border-stone-200 bg-white py-12 px-6 text-stone-600">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-stone-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-emerald-800 text-white flex items-center justify-center text-xs font-serif font-bold">
                林
              </span>
              <span className="text-base font-bold text-stone-900">
                포레스트 힐 (ForestHeal)
              </span>
            </div>
            <p className="text-xs text-stone-500 mt-1 max-w-md leading-relaxed">
              산림휴양과 산림치유 활동을 원하는 모든 이를 위한 대한민국 국립자연휴양림 &amp; 치유의 숲 안내 플랫폼
            </p>
          </div>

          {/* Official Portal External Links */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-stone-600">
            <a
              href="https://www.foresttrip.go.kr"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-emerald-900 transition-colors"
            >
              <span>숲나들e (국립자연휴양림)</span>
              <ExternalLink className="w-3 h-3 text-stone-400" />
            </a>
            <a
              href="https://www.forest.go.kr"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-emerald-900 transition-colors"
            >
              <span>대한민국 산림청</span>
              <ExternalLink className="w-3 h-3 text-stone-400" />
            </a>
            <a
              href="https://fowi.or.kr"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-emerald-900 transition-colors"
            >
              <span>한국산림복지진흥원</span>
              <ExternalLink className="w-3 h-3 text-stone-400" />
            </a>
          </div>
        </div>

        {/* Bottom Credits & Notices */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-800" />
            <span>국립산림과학원 산림의학 연구자료 및 공공데이터를 기반으로 제공됩니다.</span>
          </div>
          <div className="font-mono text-[11px]">
            &copy; {new Date().getFullYear()} ForestHeal. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
