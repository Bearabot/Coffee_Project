import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, MessageCircle, X, Coffee, ChevronUp } from 'lucide-react';

interface BaristaBearProps {
  onOpenQuiz: () => void;
  onExploreShop: () => void;
  variant?: 'embedded' | 'floating';
}

export const BaristaBear: React.FC<BaristaBearProps> = ({
  onOpenQuiz,
  onExploreShop,
  variant = 'embedded',
}) => {
  const [isWaving, setIsWaving] = useState(true);
  const [speechIndex, setSpeechIndex] = useState(0);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const greetings = [
    {
      title: "Welcome to Common Ground!",
      text: "I'm Bearista Stinkalot, your resident roastery bear. Fresh micro-lots roasted this morning!",
      action: "Find My Match",
      type: "quiz" as const,
    },
    {
      title: "Looking for something special?",
      text: "Try our Colombia El Paraíso thermal shock, or the stone-milled Uji Matcha.",
      action: "Explore Harvests",
      type: "shop" as const,
    },
    {
      title: "Want free weekly delivery?",
      text: "Our Roaster's Club subscription saves 15% on every harvest.",
      action: "Take Taste Quiz",
      type: "quiz" as const,
    },
  ];

  // Rotate greeting every 8 seconds if not dismissed
  useEffect(() => {
    const interval = setInterval(() => {
      setSpeechIndex((prev) => (prev + 1) % greetings.length);
    }, 9000);
    return () => clearInterval(interval);
  }, [greetings.length]);

  const currentGreeting = greetings[speechIndex];

  // SVG Teddy Bear with Apron & Animated Waving Paw
  const BearIllustration = ({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) => {
    const scale = size === 'sm' ? 'w-24 h-28' : size === 'lg' ? 'w-48 h-56' : 'w-36 h-44';

    return (
      <div className={`relative ${scale} select-none flex items-center justify-center`}>
        <svg
          viewBox="0 0 200 240"
          className="w-full h-full drop-shadow-md overflow-visible"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Bear Fur Gradients */}
            <radialGradient id="bearFur" cx="50%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#C9945B" />
              <stop offset="70%" stopColor="#A8723C" />
              <stop offset="100%" stopColor="#8A5A2B" />
            </radialGradient>
            <radialGradient id="innerEar" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#F5C4A0" />
              <stop offset="100%" stopColor="#E2A67D" />
            </radialGradient>
            <linearGradient id="apronGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2D3B31" />
              <stop offset="100%" stopColor="#1B261E" />
            </linearGradient>
            <linearGradient id="strapGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#C48E4E" />
              <stop offset="100%" stopColor="#96652E" />
            </linearGradient>
          </defs>

          {/* Smaller, snug teddy ears */}
          <circle cx="62" cy="60" r="16" fill="url(#bearFur)" stroke="#70441C" strokeWidth="2" />
          <circle cx="62" cy="60" r="9" fill="url(#innerEar)" />

          <circle cx="138" cy="60" r="16" fill="url(#bearFur)" stroke="#70441C" strokeWidth="2" />
          <circle cx="138" cy="60" r="9" fill="url(#innerEar)" />

          {/* Bear Body */}
          <ellipse cx="100" cy="165" rx="55" ry="60" fill="url(#bearFur)" />

          {/* Bear Head */}
          <ellipse cx="100" cy="95" rx="52" ry="46" fill="url(#bearFur)" stroke="#70441C" strokeWidth="2" />

          {/* Muzzle / Snout */}
          <ellipse cx="100" cy="112" rx="30" ry="23" fill="#E8C39E" />

          {/* Big Cute Teddy Button Nose */}
          <path
            d="M 85 99 Q 100 92 115 99 Q 100 121 85 99 Z"
            fill="#2B1A0D"
            stroke="#1C1007"
            strokeWidth="1.5"
          />
          {/* Nose specular highlights */}
          <ellipse cx="96" cy="99" rx="3.5" ry="2" fill="#FFFFFF" opacity="0.65" />
          <circle cx="103" cy="102" r="1.2" fill="#FFFFFF" opacity="0.45" />

          {/* Mouth */}
          <path d="M 100 114 L 100 122" stroke="#2B1A0D" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 88 122 Q 100 132 112 122" fill="none" stroke="#2B1A0D" strokeWidth="2.5" strokeLinecap="round" />

          {/* Blush Cheeks */}
          <ellipse cx="66" cy="114" rx="8" ry="5.5" fill="#E88F80" opacity="0.5" />
          <ellipse cx="134" cy="114" rx="8" ry="5.5" fill="#E88F80" opacity="0.5" />

          {/* Bigger, Expressive Luminous Eyes */}
          <g>
            {/* Left Eye */}
            <motion.ellipse
              cx="76"
              cy="88"
              rx="8.5"
              ry="10"
              fill="#201206"
              animate={{ scaleY: [1, 1, 0.1, 1, 1] }}
              transition={{ repeat: Infinity, duration: 4, times: [0, 0.9, 0.93, 0.96, 1] }}
            />
            {/* Big glossy catchlight */}
            <circle cx="73.5" cy="85" r="3" fill="#FFFFFF" />
            <circle cx="79" cy="92" r="1.4" fill="#FFFFFF" opacity="0.8" />

            {/* Right Eye */}
            <motion.ellipse
              cx="124"
              cy="88"
              rx="8.5"
              ry="10"
              fill="#201206"
              animate={{ scaleY: [1, 1, 0.1, 1, 1] }}
              transition={{ repeat: Infinity, duration: 4, times: [0, 0.9, 0.93, 0.96, 1] }}
            />
            {/* Big glossy catchlight */}
            <circle cx="121.5" cy="85" r="3" fill="#FFFFFF" />
            <circle cx="127" cy="92" r="1.4" fill="#FFFFFF" opacity="0.8" />
          </g>

          {/* Barista Apron Straps (Crossback Leather) */}
          <path d="M 72 135 L 85 155" stroke="url(#strapGrad)" strokeWidth="4.5" strokeLinecap="round" />
          <path d="M 128 135 L 115 155" stroke="url(#strapGrad)" strokeWidth="4.5" strokeLinecap="round" />

          {/* Brass Buckles */}
          <circle cx="85" cy="155" r="3" fill="#E5B558" stroke="#7A5212" strokeWidth="1" />
          <circle cx="115" cy="155" r="3" fill="#E5B558" stroke="#7A5212" strokeWidth="1" />

          {/* Barista Canvas Apron Body */}
          <path
            d="M 80 152 L 120 152 L 132 225 L 68 225 Z"
            fill="url(#apronGrad)"
            stroke="#17211A"
            strokeWidth="2"
          />

          {/* Apron Pocket */}
          <rect
            x="83"
            y="180"
            width="34"
            height="26"
            rx="3"
            fill="#233027"
            stroke="#3C4F42"
            strokeWidth="1.5"
          />
          {/* Cupping spoon in pocket */}
          <path d="M 88 185 L 88 174 Q 91 170 94 174 L 94 185" fill="#B5BDBC" stroke="#5E6766" strokeWidth="1" />
          {/* Golden Coffee Bean Embroidery on Pocket */}
          <ellipse cx="102" cy="193" rx="4" ry="5.5" fill="#D99E4B" />
          <path d="M 102 188 Q 104 193 100 198" fill="none" stroke="#784C10" strokeWidth="1" />

          {/* Apron Tie Ribbon Tails */}
          <path d="M 70 210 Q 56 220 54 235" fill="none" stroke="#2D3B31" strokeWidth="3" strokeLinecap="round" />
          <path d="M 130 210 Q 144 220 146 235" fill="none" stroke="#2D3B31" strokeWidth="3" strokeLinecap="round" />

          {/* Left Arm holding steaming ceramic coffee cup */}
          <g>
            <path
              d="M 60 148 Q 45 168 56 186 Q 66 188 74 176"
              fill="url(#bearFur)"
              stroke="#70441C"
              strokeWidth="2"
            />
            {/* Ceramic Coffee Cup */}
            <rect x="42" y="172" width="18" height="15" rx="3" fill="#FAF5ED" stroke="#42352B" strokeWidth="1.5" />
            <path d="M 42 176 Q 35 179 42 184" fill="none" stroke="#42352B" strokeWidth="1.5" />
            {/* Hot Coffee Liquid */}
            <ellipse cx="51" cy="173" rx="7" ry="2" fill="#523118" />

            {/* Steaming Aroma Swirls (Animated) */}
            <motion.path
              d="M 48 168 Q 46 160 50 154"
              fill="none"
              stroke="#B3A294"
              strokeWidth="1.5"
              strokeLinecap="round"
              animate={{ opacity: [0.2, 0.8, 0], y: [0, -6, -12] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: 'easeOut' }}
            />
            <motion.path
              d="M 54 167 Q 56 158 52 152"
              fill="none"
              stroke="#B3A294"
              strokeWidth="1.5"
              strokeLinecap="round"
              animate={{ opacity: [0.1, 0.7, 0], y: [0, -7, -14] }}
              transition={{ repeat: Infinity, duration: 2.2, delay: 0.8, ease: 'easeOut' }}
            />
          </g>

          {/* Right Arm: CHEERFUL WAVING PAW (Motion animated) */}
          <motion.g
            style={{ originX: '135px', originY: '150px' }}
            animate={
              isWaving
                ? {
                    rotate: [0, 20, -8, 22, -6, 18, 0],
                  }
                : { rotate: 0 }
            }
            transition={{
              repeat: Infinity,
              duration: 2.8,
              repeatDelay: 1.5,
              ease: 'easeInOut',
            }}
          >
            {/* Upper arm */}
            <path
              d="M 136 148 Q 155 138 165 118"
              fill="none"
              stroke="url(#bearFur)"
              strokeWidth="16"
              strokeLinecap="round"
            />
            {/* Paw pad & claws */}
            <circle cx="166" cy="115" r="11" fill="url(#bearFur)" stroke="#70441C" strokeWidth="1.5" />
            <circle cx="166" cy="115" r="6" fill="#F5C4A0" />
            {/* Mini toe pads */}
            <circle cx="158" cy="108" r="2.2" fill="#F5C4A0" />
            <circle cx="164" cy="104" r="2.2" fill="#F5C4A0" />
            <circle cx="171" cy="106" r="2.2" fill="#F5C4A0" />
          </motion.g>
        </svg>
      </div>
    );
  };

  // 1. EMBEDDED HERO / BANNER GREETING COMPONENT
  if (variant === 'embedded') {
    if (isDismissed) return null;

    return (
      <div className="relative overflow-hidden bg-gradient-to-r from-[#F4EDE0] via-[#F9F4EB] to-[#FAF7F2] border border-[#DECDB3] rounded-2xl p-5 sm:p-6 mb-8 shadow-sm">
        {/* Subtle decorative background roaster lines */}
        <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-[#E8DCB8]/30 rounded-full blur-2xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-center gap-5 sm:gap-6">
          {/* Animated Mascot Bear */}
          <div
            className="shrink-0 cursor-pointer transition-transform hover:scale-105 active:scale-95"
            onClick={() => setIsWaving(!isWaving)}
            title="Click me to wave!"
          >
            <BearIllustration size="md" />
            <span className="block text-center text-[10px] font-mono text-[#8C7D6D] mt-1">
              Bearista Stinkalot · EST. 2013
            </span>
          </div>

          {/* Greeting Prose & Speech Bubble */}
          <div className="flex-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-mono uppercase tracking-widest text-[#946132] font-semibold mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Head Roaster's Daily Welcome</span>
            </div>

            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1E1B18] tracking-tight">
              {currentGreeting.title}
            </h3>

            <p className="text-xs sm:text-sm text-[#5C5142] mt-1.5 leading-relaxed max-w-xl">
              {currentGreeting.text}
            </p>

            <div className="mt-4 flex flex-wrap items-center justify-center sm:justify-start gap-3">
              <button
                onClick={currentGreeting.type === 'quiz' ? onOpenQuiz : onExploreShop}
                className="px-4 py-2 bg-[#1F1B17] hover:bg-[#38332C] text-white text-xs font-medium rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
              >
                <Coffee className="w-3.5 h-3.5 text-[#E0AF68]" />
                <span>{currentGreeting.action}</span>
              </button>

              <button
                onClick={() => setSpeechIndex((prev) => (prev + 1) % greetings.length)}
                className="px-3 py-2 bg-white hover:bg-[#EFE9DC] text-[#4A3F31] border border-[#DECDB3] text-xs font-medium rounded-lg transition-colors cursor-pointer"
              >
                Next Roaster Tip &rarr;
              </button>
            </div>
          </div>

          {/* Dismiss button */}
          <button
            onClick={() => setIsDismissed(true)}
            aria-label="Dismiss greeting"
            className="self-start text-[#948574] hover:text-[#1E1B18] p-1.5 rounded-full hover:bg-[#EFE8DC] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  // 2. FLOATING BARISTA BEAR COMPANION (In bottom-left corner)
  return (
    <aside aria-label="Bearista Stinkalot Companion" className="fixed bottom-5 left-5 z-40">
      <AnimatePresence>
        {!isMinimized ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            className="relative bg-[#FAF7F2] border border-[#DECDB3] rounded-2xl shadow-2xl p-4 w-72 sm:w-80 flex flex-col gap-3 text-left"
          >
            {/* Top header with close/minimize */}
            <div className="flex items-center justify-between border-b border-[#EAE3D4] pb-2">
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#1E1B18]">
                <span className="w-2 h-2 rounded-full bg-[#3E654E]" />
                <span>Bearista Stinkalot</span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsMinimized(true)}
                  aria-label="Minimize companion"
                  className="p-1 text-[#8C7D6D] hover:text-[#1E1B18] rounded cursor-pointer"
                  title="Minimize"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Content row */}
            <div className="flex items-center gap-3">
              <div
                className="shrink-0 cursor-pointer"
                onClick={() => setIsWaving(!isWaving)}
                title="Click me to wave!"
              >
                <BearIllustration size="sm" />
              </div>

              <div className="flex-1">
                <p className="text-xs text-[#4A4033] font-medium leading-relaxed">
                  "{currentGreeting.text}"
                </p>

                <div className="mt-2.5 flex items-center gap-2">
                  <button
                    onClick={currentGreeting.type === 'quiz' ? onOpenQuiz : onExploreShop}
                    className="px-2.5 py-1.5 bg-[#1F1B17] hover:bg-[#38332C] text-white text-[11px] font-medium rounded-md cursor-pointer transition-colors"
                  >
                    {currentGreeting.action}
                  </button>
                  <button
                    onClick={() => setSpeechIndex((prev) => (prev + 1) % greetings.length)}
                    className="text-[10px] font-mono text-[#8C7D6D] hover:underline cursor-pointer"
                  >
                    Next tip
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          /* Minimized Floating Button */
          <motion.button
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            onClick={() => setIsMinimized(false)}
            className="flex items-center gap-2 px-3.5 py-2.5 bg-[#FAF7F2] hover:bg-[#F2ECE0] text-[#1E1B18] border border-[#DECDB3] rounded-full shadow-lg text-xs font-semibold cursor-pointer transition-all hover:scale-105"
          >
            <div className="w-7 h-7 -my-1 overflow-hidden flex items-center justify-center">
              <BearIllustration size="sm" />
            </div>
            <span>Chat with Bearista Stinkalot</span>
            <ChevronUp className="w-3.5 h-3.5 text-[#8C7E6E]" />
          </motion.button>
        )}
      </AnimatePresence>
    </aside>
  );
};
