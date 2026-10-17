/**
 * Forest Audio Engine using Web Audio API
 * Generates natural real-time synthesized soundscapes:
 * - Wind through pine needles (솔바람)
 * - Mountain stream / valley water (계곡 물소리)
 * - Songbirds in canopy (숲새 지저귐)
 * - Evening crickets (풀벌레 소리)
 */

export interface SoundState {
  windVolume: number;
  streamVolume: number;
  birdVolume: number;
  cricketVolume: number;
  masterVolume: number;
  isPlaying: boolean;
}

class ForestSoundEngine {
  private ctx: AudioContext | null = null;
  private isRunning = false;

  private masterGain: GainNode | null = null;
  private windGain: GainNode | null = null;
  private streamGain: GainNode | null = null;
  private birdGain: GainNode | null = null;
  private cricketGain: GainNode | null = null;

  // Active nodes & intervals
  private birdTimer: number | null = null;
  private cricketTimer: number | null = null;
  private noiseBuffers: { [key: string]: AudioBuffer } = {};

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  private createNoiseBuffer(durationSeconds = 5): AudioBuffer {
    if (!this.ctx) throw new Error('AudioContext not ready');
    const bufferSize = this.ctx.sampleRate * durationSeconds;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let lastOut = 0.0;
    // Pink noise approximation for warm organic sound
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      data[i] = (lastOut + 0.02 * white) / 1.02;
      lastOut = data[i];
      data[i] *= 3.5; // Gain compensation
    }
    return buffer;
  }

  private createWhiteNoiseBuffer(durationSeconds = 5): AudioBuffer {
    if (!this.ctx) throw new Error('AudioContext not ready');
    const bufferSize = this.ctx.sampleRate * durationSeconds;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    return buffer;
  }

  public start(initialState: SoundState) {
    this.initContext();
    if (!this.ctx) return;
    if (this.isRunning) return;

    this.isRunning = true;

    // Master Gain
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(initialState.masterVolume, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);

    // 1. Wind (솔바람)
    this.windGain = this.ctx.createGain();
    this.windGain.gain.setValueAtTime(initialState.windVolume, this.ctx.currentTime);
    this.windGain.connect(this.masterGain);

    const windBuffer = this.createNoiseBuffer(6);
    const windSource = this.ctx.createBufferSource();
    windSource.buffer = windBuffer;
    windSource.loop = true;

    const windFilter = this.ctx.createBiquadFilter();
    windFilter.type = 'lowpass';
    windFilter.frequency.setValueAtTime(380, this.ctx.currentTime);

    // LFO for breathing wind gust effect
    const windLfo = this.ctx.createOscillator();
    windLfo.frequency.setValueAtTime(0.15, this.ctx.currentTime); // ~6.6s cycle
    const windLfoGain = this.ctx.createGain();
    windLfoGain.gain.setValueAtTime(160, this.ctx.currentTime);
    windLfo.connect(windLfoGain);
    windLfoGain.connect(windFilter.frequency);
    windLfo.start();

    windSource.connect(windFilter);
    windFilter.connect(this.windGain);
    windSource.start();

    // 2. Stream (계곡물)
    this.streamGain = this.ctx.createGain();
    this.streamGain.gain.setValueAtTime(initialState.streamVolume, this.ctx.currentTime);
    this.streamGain.connect(this.masterGain);

    const streamBuffer = this.createWhiteNoiseBuffer(4);
    const streamSource = this.ctx.createBufferSource();
    streamSource.buffer = streamBuffer;
    streamSource.loop = true;

    const streamFilter1 = this.ctx.createBiquadFilter();
    streamFilter1.type = 'bandpass';
    streamFilter1.frequency.setValueAtTime(650, this.ctx.currentTime);
    streamFilter1.Q.setValueAtTime(2.5, this.ctx.currentTime);

    const streamFilter2 = this.ctx.createBiquadFilter();
    streamFilter2.type = 'lowpass';
    streamFilter2.frequency.setValueAtTime(1200, this.ctx.currentTime);

    // Gentle water ripple modulation
    const waterLfo = this.ctx.createOscillator();
    waterLfo.frequency.setValueAtTime(0.8, this.ctx.currentTime);
    const waterLfoGain = this.ctx.createGain();
    waterLfoGain.gain.setValueAtTime(150, this.ctx.currentTime);
    waterLfo.connect(waterLfoGain);
    waterLfoGain.connect(streamFilter1.frequency);
    waterLfo.start();

    streamSource.connect(streamFilter1);
    streamFilter1.connect(streamFilter2);
    streamFilter2.connect(this.streamGain);
    streamSource.start();

    // 3. Birds (산새 지저귐)
    this.birdGain = this.ctx.createGain();
    this.birdGain.gain.setValueAtTime(initialState.birdVolume, this.ctx.currentTime);
    this.birdGain.connect(this.masterGain);
    this.scheduleBirdChirps();

    // 4. Crickets (풀벌레 소리)
    this.cricketGain = this.ctx.createGain();
    this.cricketGain.gain.setValueAtTime(initialState.cricketVolume, this.ctx.currentTime);
    this.cricketGain.connect(this.masterGain);
    this.scheduleCricketSounds();
  }

  private triggerSingleChirp() {
    if (!this.ctx || !this.isRunning || !this.birdGain) return;
    const now = this.ctx.currentTime;
    const baseFreq = 2200 + Math.random() * 1200;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(baseFreq, now);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.5, now + 0.06);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.9, now + 0.14);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.18, now + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.16);

    osc.connect(gain);
    gain.connect(this.birdGain);

    osc.start(now);
    osc.stop(now + 0.2);

    // Sometimes second chirp in quick succession
    if (Math.random() > 0.5) {
      setTimeout(() => {
        if (!this.ctx || !this.birdGain || !this.isRunning) return;
        const now2 = this.ctx.currentTime;
        const osc2 = this.ctx.createOscillator();
        const gain2 = this.ctx.createGain();
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(baseFreq * 1.2, now2);
        osc2.frequency.exponentialRampToValueAtTime(baseFreq * 1.6, now2 + 0.05);
        osc2.frequency.exponentialRampToValueAtTime(baseFreq * 1.1, now2 + 0.12);

        gain2.gain.setValueAtTime(0.001, now2);
        gain2.gain.linearRampToValueAtTime(0.15, now2 + 0.02);
        gain2.gain.exponentialRampToValueAtTime(0.0001, now2 + 0.14);

        osc2.connect(gain2);
        gain2.connect(this.birdGain);
        osc2.start(now2);
        osc2.stop(now2 + 0.18);
      }, 120 + Math.random() * 80);
    }
  }

  private scheduleBirdChirps() {
    const loop = () => {
      if (!this.isRunning) return;
      this.triggerSingleChirp();
      const nextInterval = 2800 + Math.random() * 5500;
      this.birdTimer = window.setTimeout(loop, nextInterval);
    };
    loop();
  }

  private triggerCricketPulse() {
    if (!this.ctx || !this.isRunning || !this.cricketGain) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(4600 + Math.random() * 300, now);

    // Fast rhythm flutter
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.05, now + 0.05);
    gain.gain.linearRampToValueAtTime(0.01, now + 0.1);
    gain.gain.linearRampToValueAtTime(0.05, now + 0.15);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

    osc.connect(gain);
    gain.connect(this.cricketGain);
    osc.start(now);
    osc.stop(now + 0.4);
  }

  private scheduleCricketSounds() {
    const loop = () => {
      if (!this.isRunning) return;
      this.triggerCricketPulse();
      const nextInterval = 800 + Math.random() * 1200;
      this.cricketTimer = window.setTimeout(loop, nextInterval);
    };
    loop();
  }

  public setVolume(channel: 'wind' | 'stream' | 'bird' | 'cricket' | 'master', value: number) {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const target = Math.max(0, Math.min(1, value));

    switch (channel) {
      case 'wind':
        this.windGain?.gain.setTargetAtTime(target, now, 0.1);
        break;
      case 'stream':
        this.streamGain?.gain.setTargetAtTime(target, now, 0.1);
        break;
      case 'bird':
        this.birdGain?.gain.setTargetAtTime(target, now, 0.1);
        break;
      case 'cricket':
        this.cricketGain?.gain.setTargetAtTime(target, now, 0.1);
        break;
      case 'master':
        this.masterGain?.gain.setTargetAtTime(target, now, 0.1);
        break;
    }
  }

  public stop() {
    if (!this.isRunning) return;
    this.isRunning = false;

    if (this.birdTimer) clearTimeout(this.birdTimer);
    if (this.cricketTimer) clearTimeout(this.cricketTimer);

    if (this.ctx && this.masterGain) {
      const now = this.ctx.currentTime;
      this.masterGain.gain.setTargetAtTime(0, now, 0.15);
      setTimeout(() => {
        if (this.ctx && this.ctx.state !== 'closed') {
          this.ctx.close();
          this.ctx = null;
        }
      }, 250);
    }
  }
}

export const forestSoundEngine = new ForestSoundEngine();
