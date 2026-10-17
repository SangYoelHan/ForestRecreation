import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause, Wind, Droplets, Clock, SlidersHorizontal, Sparkles } from 'lucide-react';
import { forestSoundEngine, SoundState } from '../utils/soundEngine';

export const SoundscapePlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [timerMinutes, setTimerMinutes] = useState<number | null>(null);
  const [remainingSeconds, setRemainingSeconds] = useState<number | null>(null);

  const [soundState, setSoundState] = useState<SoundState>({
    windVolume: 0.5,
    streamVolume: 0.6,
    birdVolume: 0.4,
    cricketVolume: 0.1,
    masterVolume: 0.7,
    isPlaying: false,
  });

  const presets = [
    {
      name: '아침 피톤치드 숲길',
      icon: '🌲',
      state: { windVolume: 0.4, streamVolume: 0.3, birdVolume: 0.7, cricketVolume: 0.0 },
    },
    {
      name: '깊은 계곡 쉼터',
      icon: '💧',
      state: { windVolume: 0.3, streamVolume: 0.8, birdVolume: 0.3, cricketVolume: 0.0 },
    },
    {
      name: '달빛 숲속 명상',
      icon: '🌙',
      state: { windVolume: 0.6, streamVolume: 0.2, birdVolume: 0.0, cricketVolume: 0.6 },
    },
    {
      name: '울창한 편백 숲',
      icon: '🌿',
      state: { windVolume: 0.7, streamVolume: 0.4, birdVolume: 0.4, cricketVolume: 0.1 },
    },
  ];

  const togglePlay = () => {
    if (!isPlaying) {
      forestSoundEngine.start({ ...soundState, isPlaying: true });
      setIsPlaying(true);
    } else {
      forestSoundEngine.stop();
      setIsPlaying(false);
      setTimerMinutes(null);
      setRemainingSeconds(null);
    }
  };

  const handleVolumeChange = (
    channel: 'wind' | 'stream' | 'bird' | 'cricket' | 'master',
    val: number
  ) => {
    const key = `${channel}Volume` as keyof SoundState;
    setSoundState((prev) => ({ ...prev, [key]: val }));
    forestSoundEngine.setVolume(channel, val);
  };

  const applyPreset = (presetState: Partial<SoundState>) => {
    setSoundState((prev) => {
      const next = { ...prev, ...presetState };
      if (isPlaying) {
        if (presetState.windVolume !== undefined) forestSoundEngine.setVolume('wind', presetState.windVolume);
        if (presetState.streamVolume !== undefined) forestSoundEngine.setVolume('stream', presetState.streamVolume);
        if (presetState.birdVolume !== undefined) forestSoundEngine.setVolume('bird', presetState.birdVolume);
        if (presetState.cricketVolume !== undefined) forestSoundEngine.setVolume('cricket', presetState.cricketVolume);
      }
      return next;
    });
    if (!isPlaying) {
      forestSoundEngine.start({ ...soundState, ...presetState, isPlaying: true });
      setIsPlaying(true);
    }
  };

  const setTimer = (minutes: number) => {
    setTimerMinutes(minutes);
    setRemainingSeconds(minutes * 60);
    if (!isPlaying) {
      forestSoundEngine.start({ ...soundState, isPlaying: true });
      setIsPlaying(true);
    }
  };

  // Timer tick
  useEffect(() => {
    if (!isPlaying || remainingSeconds === null) return;
    if (remainingSeconds <= 0) {
      forestSoundEngine.stop();
      setIsPlaying(false);
      setTimerMinutes(null);
      setRemainingSeconds(null);
      return;
    }

    const interval = setInterval(() => {
      setRemainingSeconds((prev) => (prev !== null && prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, remainingSeconds]);

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="bg-white border border-stone-200/90 rounded-2xl p-5 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left Info */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center border border-emerald-100/80 shrink-0">
            {isPlaying ? (
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-600"></span>
              </span>
            ) : (
              <Wind className="w-5 h-5 text-emerald-700" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-semibold text-stone-900">숲의 소리 사운드스케이프</h3>
              <span className="text-xs text-stone-500 font-medium">자연 주파수 합성</span>
            </div>
            <p className="text-xs text-stone-500 mt-0.5">
              솔바람, 맑은 계곡물, 산새 소리를 실시간으로 믹싱하여 심신을 안정시킵니다.
            </p>
          </div>
        </div>

        {/* Center / Right controls */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={togglePlay}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-xs transition-colors whitespace-nowrap shrink-0 shadow-sm ${
              isPlaying
                ? 'bg-emerald-800 text-white hover:bg-emerald-900'
                : 'bg-emerald-700 text-white hover:bg-emerald-800'
            }`}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
            <span>{isPlaying ? '소리 일시정지' : '숲의 소리 듣기'}</span>
          </button>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-medium border border-stone-200 text-stone-700 hover:bg-stone-50 transition-colors whitespace-nowrap shrink-0"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-stone-500" />
            <span>{isExpanded ? '채널 닫기' : '사운드 조율'}</span>
          </button>

          {remainingSeconds !== null && (
            <div className="flex items-center gap-1.5 px-3 py-2 bg-stone-100 rounded-xl text-xs font-mono text-stone-700 tabular-nums">
              <Clock className="w-3.5 h-3.5 text-stone-500" />
              <span>{formatTimer(remainingSeconds)}</span>
            </div>
          )}
        </div>
      </div>

      {/* Preset selection bar */}
      <div className="mt-4 pt-3.5 border-t border-stone-100 flex items-center gap-2 overflow-x-auto pb-1">
        <span className="text-xs font-medium text-stone-500 whitespace-nowrap shrink-0 mr-1">
          추천 프리셋:
        </span>
        {presets.map((preset) => (
          <button
            key={preset.name}
            onClick={() => applyPreset(preset.state)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-stone-50 hover:bg-emerald-50 text-stone-700 hover:text-emerald-800 border border-stone-200/60 transition-colors whitespace-nowrap shrink-0"
          >
            <span>{preset.icon}</span>
            <span>{preset.name}</span>
          </button>
        ))}
      </div>

      {/* Expanded Mixer Controls */}
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-stone-200/80 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-in fade-in duration-200">
          {/* Wind */}
          <div className="bg-stone-50/70 p-3.5 rounded-xl border border-stone-200/60">
            <div className="flex items-center justify-between text-xs text-stone-700 mb-2">
              <span className="font-medium flex items-center gap-1.5">
                <Wind className="w-3.5 h-3.5 text-emerald-700" />
                솔바람 (바람결)
              </span>
              <span className="font-mono text-stone-500 tabular-nums">
                {Math.round(soundState.windVolume * 100)}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={soundState.windVolume}
              onChange={(e) => handleVolumeChange('wind', parseFloat(e.target.value))}
              className="w-full accent-emerald-700 cursor-pointer"
            />
          </div>

          {/* Stream */}
          <div className="bg-stone-50/70 p-3.5 rounded-xl border border-stone-200/60">
            <div className="flex items-center justify-between text-xs text-stone-700 mb-2">
              <span className="font-medium flex items-center gap-1.5">
                <Droplets className="w-3.5 h-3.5 text-blue-600" />
                계곡 물소리 (음이온)
              </span>
              <span className="font-mono text-stone-500 tabular-nums">
                {Math.round(soundState.streamVolume * 100)}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={soundState.streamVolume}
              onChange={(e) => handleVolumeChange('stream', parseFloat(e.target.value))}
              className="w-full accent-emerald-700 cursor-pointer"
            />
          </div>

          {/* Bird */}
          <div className="bg-stone-50/70 p-3.5 rounded-xl border border-stone-200/60">
            <div className="flex items-center justify-between text-xs text-stone-700 mb-2">
              <span className="font-medium flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                산새 지저귐
              </span>
              <span className="font-mono text-stone-500 tabular-nums">
                {Math.round(soundState.birdVolume * 100)}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={soundState.birdVolume}
              onChange={(e) => handleVolumeChange('bird', parseFloat(e.target.value))}
              className="w-full accent-emerald-700 cursor-pointer"
            />
          </div>

          {/* Cricket */}
          <div className="bg-stone-50/70 p-3.5 rounded-xl border border-stone-200/60">
            <div className="flex items-center justify-between text-xs text-stone-700 mb-2">
              <span className="font-medium flex items-center gap-1.5">
                <Volume2 className="w-3.5 h-3.5 text-stone-600" />
                저녁 풀벌레
              </span>
              <span className="font-mono text-stone-500 tabular-nums">
                {Math.round(soundState.cricketVolume * 100)}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={soundState.cricketVolume}
              onChange={(e) => handleVolumeChange('cricket', parseFloat(e.target.value))}
              className="w-full accent-emerald-700 cursor-pointer"
            />
          </div>

          {/* Bottom row: Master volume & sleep timer */}
          <div className="col-span-1 md:col-span-2 lg:col-span-4 flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <span className="text-xs font-medium text-stone-600 whitespace-nowrap shrink-0">
                전체 음량
              </span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={soundState.masterVolume}
                onChange={(e) => handleVolumeChange('master', parseFloat(e.target.value))}
                className="w-36 accent-emerald-700 cursor-pointer"
              />
              <span className="text-xs font-mono text-stone-500 tabular-nums">
                {Math.round(soundState.masterVolume * 100)}%
              </span>
            </div>

            <div className="flex items-center gap-1.5 w-full sm:w-auto justify-end">
              <span className="text-xs text-stone-500 mr-1">수면/명상 타이머:</span>
              {[15, 30, 60].map((mins) => (
                <button
                  key={mins}
                  onClick={() => setTimer(mins)}
                  className={`px-2.5 py-1 text-xs rounded-lg border transition-colors ${
                    timerMinutes === mins
                      ? 'bg-emerald-800 text-white border-emerald-800'
                      : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  {mins}분
                </button>
              ))}
              {timerMinutes !== null && (
                <button
                  onClick={() => {
                    setTimerMinutes(null);
                    setRemainingSeconds(null);
                  }}
                  className="px-2 py-1 text-xs text-stone-500 hover:text-stone-800"
                >
                  해제
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
