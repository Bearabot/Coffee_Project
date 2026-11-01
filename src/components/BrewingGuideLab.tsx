import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Droplets, Scale, Thermometer, CheckCircle2, ChevronRight, Bell } from 'lucide-react';
import { BrewGuide } from '../types';
import { playChime } from '../utils/audio';

interface BrewingGuideLabProps {
  guides: BrewGuide[];
}

export const BrewingGuideLab: React.FC<BrewingGuideLabProps> = ({ guides }) => {
  const [selectedGuideId, setSelectedGuideId] = useState<string>(guides[0]?.id || 'v60-pourover');
  const activeGuide = guides.find((g) => g.id === selectedGuideId) || guides[0];

  // Dynamic Ratio Calculator: Base target water in ml
  const [targetWater, setTargetWater] = useState<number>(activeGuide.waterGramsDefault);

  // Sync default water when guide changes
  useEffect(() => {
    setTargetWater(activeGuide.waterGramsDefault);
    setIsRunning(false);
    setElapsedSeconds(0);
    setCurrentStepIndex(0);
  }, [activeGuide.id, activeGuide.waterGramsDefault]);

  // Dynamic dry grams scaled according to base ratio
  const ratioMultiplier = activeGuide.dryGramsDefault / activeGuide.waterGramsDefault;
  const scaledDryGrams = Math.round(targetWater * ratioMultiplier * 10) / 10;

  // Live Timer State
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Compute total duration of all steps
  const totalDurationSeconds = activeGuide.steps.reduce((acc, step) => acc + step.durationSeconds, 0);

  // Determine current active step based on elapsedSeconds
  useEffect(() => {
    let accumulated = 0;
    for (let i = 0; i < activeGuide.steps.length; i++) {
      accumulated += activeGuide.steps[i].durationSeconds;
      if (elapsedSeconds < accumulated || i === activeGuide.steps.length - 1) {
        if (currentStepIndex !== i && isRunning) {
          playChime();
        }
        setCurrentStepIndex(i);
        break;
      }
    }
  }, [elapsedSeconds, activeGuide.steps, currentStepIndex, isRunning]);

  // Tick timer
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setElapsedSeconds((prev) => {
          if (prev >= totalDurationSeconds) {
            setIsRunning(false);
            playChime();
            return totalDurationSeconds;
          }
          return prev + 1;
        });
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, totalDurationSeconds]);

  const handleReset = () => {
    setIsRunning(false);
    setElapsedSeconds(0);
    setCurrentStepIndex(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const activeStep = activeGuide.steps[currentStepIndex] || activeGuide.steps[0];

  // Scale target step water according to user calculator input
  const scaleWaterTarget = (originalTarget: number) => {
    if (originalTarget === 0) return 0;
    const factor = targetWater / activeGuide.waterGramsDefault;
    return Math.round(originalTarget * factor);
  };

  return (
    <div className="py-10 sm:py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="flex items-center justify-center gap-2 text-xs font-mono uppercase tracking-widest text-[#857666] mb-2">
          <span>The Brew Lab</span>
          <span aria-hidden="true">·</span>
          <span>Precision Extractions</span>
          <span aria-hidden="true">·</span>
          <span>Audio Companion</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E1B18] tracking-tight [text-wrap:balance]">
          Masterclass Brewing Guides
        </h2>
        <p className="mt-2 text-sm sm:text-base text-[#615546]">
          Dial in your water ratios, grind sizing, and pouring cadence with our interactive companion timer.
        </p>
      </div>

      {/* Method Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none justify-start lg:justify-center">
        {guides.map((guide) => {
          const isSelected = guide.id === selectedGuideId;
          return (
            <button
              key={guide.id}
              onClick={() => setSelectedGuideId(guide.id)}
              className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg whitespace-nowrap shrink-0 transition-all cursor-pointer border ${
                isSelected
                  ? 'bg-[#1F1B17] text-white border-[#1F1B17] shadow-sm font-semibold'
                  : 'bg-white hover:bg-[#F2ECE0] text-[#4A4134] border-[#D9CEB8]'
              }`}
            >
              <span>{guide.title}</span>
              <span className="text-[10px] ml-2 opacity-70 font-mono">
                {guide.category === 'coffee' ? 'Coffee' : 'Tea'}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Guide View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Method Details, Ratio Calculator, & Equipment */}
        <div className="lg:col-span-6 space-y-6">
          {/* Method Overview Card */}
          <div className="bg-[#FAF7F2] p-6 rounded-2xl border border-[#E3DAC8] shadow-sm">
            <div className="flex items-center justify-between text-xs font-mono text-[#8C7D6D] mb-1">
              <span className="uppercase tracking-wider">{activeGuide.methodName}</span>
              <span className="font-semibold text-[#1F1B17]">
                Difficulty: {activeGuide.difficulty}
              </span>
            </div>

            <h3 className="font-serif text-2xl font-bold text-[#1E1B17]">
              {activeGuide.title}
            </h3>
            <p className="text-xs sm:text-sm text-[#5C5243] mt-2 leading-relaxed">
              {activeGuide.overview}
            </p>

            {/* Parameter Badges */}
            <div className="grid grid-cols-3 gap-3 mt-5 pt-4 border-t border-[#EAE3D4] text-xs">
              <div className="flex flex-col">
                <span className="text-[#847665] font-mono text-[10px] uppercase">Grind Sizing</span>
                <span className="font-semibold text-[#1F1B17] mt-0.5">{activeGuide.grindSize}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[#847665] font-mono text-[10px] uppercase">Water Temp</span>
                <span className="font-semibold text-[#1F1B17] mt-0.5">{activeGuide.waterTemp}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[#847665] font-mono text-[10px] uppercase">Target Time</span>
                <span className="font-semibold text-[#1F1B17] mt-0.5">{activeGuide.totalTimeMinutes}</span>
              </div>
            </div>
          </div>

          {/* Dynamic Brew Ratio & Water Calculator */}
          <div className="bg-[#F3EDE1] p-6 rounded-2xl border border-[#DECDB3] shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Scale className="w-4 h-4 text-[#A86E38]" />
                <h4 className="font-serif text-base font-bold text-[#1E1B18]">
                  Dynamic Recipe Calculator
                </h4>
              </div>
              <span className="text-xs font-mono text-[#7D6E5D] bg-white px-2 py-0.5 rounded border border-[#D5C9B3]">
                {activeGuide.ratioLabel}
              </span>
            </div>

            <p className="text-xs text-[#635748] mb-4">
              Adjust your desired water volume. We calculate the exact gram dosage needed for balanced extraction.
            </p>

            {/* Water slider */}
            <div className="space-y-2 mb-4">
              <div className="flex justify-between items-baseline text-xs">
                <span className="font-mono text-[#6E6152]">Target Water Volume:</span>
                <span className="font-mono text-base font-bold text-[#1F1B17] tabular-nums">
                  {targetWater} ml / grams
                </span>
              </div>
              <input
                type="range"
                min={activeGuide.waterGramsDefault > 150 ? 150 : 50}
                max={activeGuide.waterGramsDefault > 150 ? 800 : 250}
                step={activeGuide.waterGramsDefault > 150 ? 25 : 10}
                value={targetWater}
                onChange={(e) => setTargetWater(Number(e.target.value))}
                className="w-full accent-[#1E1B18] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-[#8C7D6D]">
                <span>Single Cup</span>
                <span>Double Batch</span>
                <span>Carafe Share</span>
              </div>
            </div>

            {/* Computed Dosage Highlight Box */}
            <div className="p-4 bg-white rounded-xl border border-[#DACFB8] flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#827464] block">
                  Required {activeGuide.category === 'coffee' ? 'Coffee Grounds' : 'Tea Leaves'}
                </span>
                <span className="font-mono text-2xl font-bold text-[#1E1B17] tabular-nums">
                  {scaledDryGrams}g
                </span>
              </div>
              <div className="text-right">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#827464] block">
                  Target Water
                </span>
                <span className="font-mono text-2xl font-bold text-[#5B889C] tabular-nums">
                  {targetWater}g
                </span>
              </div>
            </div>
          </div>

          {/* Equipment Checklist */}
          <div className="bg-[#FAF7F2] p-5 rounded-2xl border border-[#E3DAC8] text-xs">
            <h4 className="font-serif text-sm font-bold text-[#1F1B17] mb-2.5">
              Tools & Equipment Needed
            </h4>
            <ul className="space-y-1.5 text-[#544A3C]">
              {activeGuide.equipment.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#3E654E] shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: Live Companion Timer & Interactive Steps */}
        <div className="lg:col-span-6 space-y-6 lg:sticky lg:top-24">
          {/* Live Timer Unit */}
          <div className="bg-[#1F1B17] text-white rounded-2xl p-6 sm:p-7 shadow-xl border border-black/40">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-[#C4B7A5]">
                <Bell className="w-3.5 h-3.5 text-[#D97736]" />
                <span>Brew Assistant Timer</span>
              </div>
              <div className="font-mono text-xs text-[#A89C8B]">
                Step {currentStepIndex + 1} of {activeGuide.steps.length}
              </div>
            </div>

            {/* Time Readout */}
            <div className="text-center py-4">
              <div className="font-mono text-5xl sm:text-6xl font-bold tracking-tight tabular-nums text-[#FAF7F2]">
                {formatTime(elapsedSeconds)}
              </div>
              <div className="text-xs font-mono text-[#A89B88] mt-1">
                Target: {formatTime(totalDurationSeconds)}
              </div>
            </div>

            {/* Current Active Step Box */}
            <div className="my-4 p-4 rounded-xl bg-white/10 border border-white/10">
              <div className="flex items-center justify-between text-xs font-mono mb-1">
                <span className="text-[#D97736] font-bold">CURRENT CUE:</span>
                {activeStep.waterGramsTarget > 0 && (
                  <span className="text-white/90">
                    Target Scale: {scaleWaterTarget(activeStep.waterGramsTarget)}g
                  </span>
                )}
              </div>
              <div className="font-serif text-lg font-bold text-white">
                {activeStep.title}
              </div>
              <p className="text-xs text-white/80 mt-1 leading-relaxed">
                {activeStep.instruction}
              </p>
              {activeStep.tip && (
                <div className="mt-2 text-[11px] text-[#E8CCA8] italic">
                  Tip: {activeStep.tip}
                </div>
              )}
            </div>

            {/* Overall Progress Bar */}
            <div className="w-full bg-white/15 h-2 rounded-full overflow-hidden mb-6">
              <div
                className="bg-[#D97736] h-full transition-all duration-300"
                style={{
                  width: `${Math.min(100, (elapsedSeconds / totalDurationSeconds) * 100)}%`,
                }}
              />
            </div>

            {/* Timer Controls */}
            <div className="flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => setIsRunning(!isRunning)}
                className={`py-3 px-6 rounded-xl font-medium text-sm flex items-center gap-2 cursor-pointer transition-colors shadow-md ${
                  isRunning
                    ? 'bg-[#C96B32] hover:bg-[#B55E29] text-white'
                    : 'bg-[#FAF7F2] hover:bg-[#EAE3D4] text-[#1F1B17]'
                }`}
              >
                {isRunning ? (
                  <>
                    <Pause className="w-4 h-4" />
                    <span>Pause Timer</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current" />
                    <span>Start Brew Timer</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="p-3 rounded-xl bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors cursor-pointer"
                title="Reset Timer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Step By Step Full Sequence Roadmap */}
          <div className="bg-[#FAF7F2] p-5 rounded-2xl border border-[#E3DAC8] shadow-sm">
            <h4 className="font-serif text-sm font-bold text-[#1F1B17] mb-3">
              Extraction Sequence Steps
            </h4>
            <div className="space-y-2.5">
              {activeGuide.steps.map((step, idx) => {
                const isCurrent = idx === currentStepIndex;
                const isPassed = idx < currentStepIndex;
                return (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl border text-xs transition-colors ${
                      isCurrent
                        ? 'bg-[#FAF2E6] border-[#D97736] ring-1 ring-[#D97736]'
                        : isPassed
                        ? 'bg-[#F2ECE1] border-[#DDD1BE] opacity-60'
                        : 'bg-white border-[#E5DAC6]'
                    }`}
                  >
                    <div className="flex items-center justify-between font-mono text-[11px] mb-1">
                      <span className="font-bold text-[#1F1B17]">
                        Step {idx + 1}: {step.title}
                      </span>
                      <span className="text-[#8C7E6E]">
                        ~{step.durationSeconds}s
                        {step.waterGramsTarget > 0 && ` · ${scaleWaterTarget(step.waterGramsTarget)}g`}
                      </span>
                    </div>
                    <p className="text-[#594E3F] leading-snug">{step.instruction}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
