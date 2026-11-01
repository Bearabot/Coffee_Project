/**
 * Web Audio API gentle bell sound synthesizer for brew timer notifications.
 * Self-contained without external audio files.
 */
export function playChime() {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    
    // Create oscillator for main chime tone
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    // Harmonic pleasant chime chord (E5 tone ~ 659.25Hz)
    osc.frequency.setValueAtTime(659.25, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1318.5, ctx.currentTime + 0.3);

    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 1.2);
  } catch {
    // Ignore audio errors if audio context is blocked by browser policy
  }
}

/**
 * Web Audio API synthesizer for a subtle, cartoonish "pfft / toot" sound effect.
 * Combines a pitch-dropping modulated tone with a soft filtered noise rasp.
 */
export function playToot() {
  try {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();

    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    const t = ctx.currentTime;

    // 1. Main cartoon pitch-dropping "toot" oscillator (sawtooth with low-pass warmth)
    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();
    const lpf = ctx.createBiquadFilter();

    osc.type = 'sawtooth';
    // Start at ~165Hz and wobble down to ~60Hz (classic cartoon toot)
    osc.frequency.setValueAtTime(165, t);
    osc.frequency.linearRampToValueAtTime(138, t + 0.08);
    osc.frequency.linearRampToValueAtTime(152, t + 0.16);
    osc.frequency.exponentialRampToValueAtTime(58, t + 0.42);

    // Warm low-pass filter to make it subtle, mellow, and pleasant
    lpf.type = 'lowpass';
    lpf.frequency.setValueAtTime(380, t);
    lpf.frequency.exponentialRampToValueAtTime(170, t + 0.42);

    // Volume envelope
    oscGain.gain.setValueAtTime(0.001, t);
    oscGain.gain.linearRampToValueAtTime(0.2, t + 0.05);
    oscGain.gain.linearRampToValueAtTime(0.16, t + 0.2);
    oscGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.42);

    osc.connect(lpf);
    lpf.connect(oscGain);
    oscGain.connect(ctx.destination);

    // 2. Subtle airy "pffft" puff noise rasp layer
    const bufferSize = Math.floor(ctx.sampleRate * 0.32);
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;

    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.setValueAtTime(420, t);
    noiseFilter.Q.setValueAtTime(1.8, t);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.001, t);
    noiseGain.gain.linearRampToValueAtTime(0.1, t + 0.04);
    noiseGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.3);

    whiteNoise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(ctx.destination);

    // Trigger playback
    osc.start(t);
    whiteNoise.start(t);

    osc.stop(t + 0.45);
    whiteNoise.stop(t + 0.45);
  } catch {
    // Ignore audio errors if audio context is blocked by browser policy
  }
}
