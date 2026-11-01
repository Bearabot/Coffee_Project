// Shared AudioContext with unlock listener for browser autoplay compliance
let sharedAudioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  try {
    if (!sharedAudioCtx) {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) return null;
      sharedAudioCtx = new AudioContextClass();
    }
    if (sharedAudioCtx.state === 'suspended') {
      sharedAudioCtx.resume().catch(() => {});
    }
    return sharedAudioCtx;
  } catch {
    return null;
  }
}

// Automatically resume audio context on first user interaction
if (typeof window !== 'undefined') {
  const unlockAudio = () => {
    if (sharedAudioCtx && sharedAudioCtx.state === 'suspended') {
      sharedAudioCtx.resume().catch(() => {});
    }
  };
  window.addEventListener('pointerdown', unlockAudio, { passive: true });
  window.addEventListener('keydown', unlockAudio, { passive: true });
  window.addEventListener('touchstart', unlockAudio, { passive: true });
}

/**
 * Web Audio API gentle bell sound synthesizer for brew timer notifications.
 * Self-contained without external audio files.
 */
export function playChime() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    
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
 * Web Audio API synthesizer for a louder, long, dragged-out cartoon fart sound effect (~2.8 seconds).
 * Uses dual modulated oscillators with LFO flapping flutter, multi-pulse surges, sub-bass rumble, and filtered noise rasp.
 */
export function playToot() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    const t = ctx.currentTime;
    const duration = 2.85; // Dragged-out long fart (~2.85s)

    // 1. Master Gain for powerful, loud comedic presence (peaking at ~0.92)
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.001, t);
    masterGain.gain.linearRampToValueAtTime(0.92, t + 0.06);  // Punchy loud attack
    masterGain.gain.linearRampToValueAtTime(0.75, t + 0.45);  // First sustained rumble
    masterGain.gain.linearRampToValueAtTime(0.88, t + 0.95);  // Second comedic surge
    masterGain.gain.linearRampToValueAtTime(0.68, t + 1.55);  // Third flutter surge
    masterGain.gain.linearRampToValueAtTime(0.80, t + 1.95);  // Fourth sputter burst
    masterGain.gain.linearRampToValueAtTime(0.50, t + 2.45);  // Trailing sputter
    masterGain.gain.exponentialRampToValueAtTime(0.0001, t + duration);
    masterGain.connect(ctx.destination);

    // 2. Primary Pitch-Dropping Oscillator (Sawtooth with sputtering glide)
    const osc1 = ctx.createOscillator();
    osc1.type = 'sawtooth';

    // Pitch trajectory: starts high at 195Hz, drops, surges at pulses, ends in deep 44Hz rumble
    osc1.frequency.setValueAtTime(195, t);
    osc1.frequency.linearRampToValueAtTime(155, t + 0.2);
    osc1.frequency.linearRampToValueAtTime(175, t + 0.38);
    osc1.frequency.linearRampToValueAtTime(130, t + 0.7);
    osc1.frequency.linearRampToValueAtTime(160, t + 0.95);  // Surge 2
    osc1.frequency.linearRampToValueAtTime(118, t + 1.4);
    osc1.frequency.linearRampToValueAtTime(145, t + 1.85);  // Surge 3
    osc1.frequency.linearRampToValueAtTime(88, t + 2.3);
    osc1.frequency.exponentialRampToValueAtTime(44, t + duration);

    // LFO (Low-Frequency Oscillator) for lip-flapping buzz and sputter
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(19, t); // 19Hz rapid flapping
    lfo.frequency.linearRampToValueAtTime(11, t + duration); // Slows down to 11Hz as pressure wanes
    lfoGain.gain.setValueAtTime(48, t); // 48Hz pitch modulation depth
    lfo.connect(osc1.frequency);

    // Low-Pass Filter on Osc1 for resonant squelchy acoustics
    const lpf = ctx.createBiquadFilter();
    lpf.type = 'lowpass';
    lpf.frequency.setValueAtTime(640, t);
    lpf.frequency.linearRampToValueAtTime(460, t + 0.8);
    lpf.frequency.linearRampToValueAtTime(540, t + 1.8);
    lpf.frequency.exponentialRampToValueAtTime(160, t + duration);
    lpf.Q.setValueAtTime(3.2, t); // Resonant squelch

    osc1.connect(lpf);
    lpf.connect(masterGain);

    // 3. Sub-Bass Oscillator (Square wave for chest-rumbling low end)
    const subOsc = ctx.createOscillator();
    const subGain = ctx.createGain();
    subOsc.type = 'square';
    subOsc.frequency.setValueAtTime(92, t);
    subOsc.frequency.linearRampToValueAtTime(68, t + 1.0);
    subOsc.frequency.exponentialRampToValueAtTime(36, t + duration);

    subGain.gain.setValueAtTime(0.38, t);
    subGain.gain.linearRampToValueAtTime(0.30, t + 1.8);
    subGain.gain.exponentialRampToValueAtTime(0.001, t + duration);

    const subFilter = ctx.createBiquadFilter();
    subFilter.type = 'lowpass';
    subFilter.frequency.setValueAtTime(160, t);

    subOsc.connect(subFilter);
    subFilter.connect(subGain);
    subGain.connect(masterGain);

    // 4. Long Dragged-out "Pffft" Airy Noise Texture
    const bufferSize = Math.floor(ctx.sampleRate * duration);
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;

    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.setValueAtTime(540, t);
    noiseFilter.frequency.linearRampToValueAtTime(320, t + duration);
    noiseFilter.Q.setValueAtTime(2.0, t);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.001, t);
    noiseGain.gain.linearRampToValueAtTime(0.35, t + 0.08); // Louder airy rasp
    noiseGain.gain.linearRampToValueAtTime(0.28, t + 1.0);
    noiseGain.gain.linearRampToValueAtTime(0.33, t + 1.9);  // Noise swells with surges
    noiseGain.gain.exponentialRampToValueAtTime(0.0001, t + duration);

    whiteNoise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(masterGain);

    // Start all sound generators
    osc1.start(t);
    lfo.start(t);
    subOsc.start(t);
    whiteNoise.start(t);

    // Stop cleanly at end of duration
    osc1.stop(t + duration);
    lfo.stop(t + duration);
    subOsc.stop(t + duration);
    whiteNoise.stop(t + duration);
  } catch {
    // Ignore audio errors if audio context is blocked by browser policy
  }
}
