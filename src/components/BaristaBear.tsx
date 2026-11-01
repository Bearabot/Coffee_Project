import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, MessageCircle, X, Coffee, ChevronUp, Volume2, VolumeX } from 'lucide-react';
import { playToot } from '../utils/audio';

interface BaristaBearProps {
  onOpenQuiz: () => void;
  onExploreShop: () => void;
  variant?: 'embedded' | 'floating';
  autoFart?: boolean;
}

export const BaristaBear: React.FC<BaristaBearProps> = ({
  onOpenQuiz,
  onExploreShop,
  variant = 'embedded',
  autoFart = true,
}) => {
  const [isWaving, setIsWaving] = useState(true);
  const [speechIndex, setSpeechIndex] = useState(0);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isFarting, setIsFarting] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

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

  // Farting sound to ONLY come on when the plume of gas appears
  useEffect(() => {
    if (isFarting && !isMuted) {
      playToot();
    }
  }, [isFarting, isMuted]);

  // Rotate greeting every 9 seconds if not dismissed
  useEffect(() => {
    const interval = setInterval(() => {
      setSpeechIndex((prev) => (prev + 1) % greetings.length);
    }, 9000);
    return () => clearInterval(interval);
  }, [greetings.length]);

  // Fart every 10 seconds: shows plume of brown smoke, widens smile, and plays long fart sound!
  useEffect(() => {
    if (!autoFart) return;

    const triggerFart = () => {
      setIsFarting(true);
      setTimeout(() => {
        setIsFarting(false);
      }, 3500); // Plume lasts 3.5 seconds to encompass the full long dragged-out fart sound
    };

    // First fart after 3 seconds so visitor sees it promptly, then every 10 seconds
    const initialTimeout = setTimeout(triggerFart, 3000);
    const interval = setInterval(triggerFart, 10000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [autoFart]);

  const currentGreeting = greetings[speechIndex];

  // SVG Teddy Bear with Apron & Animated Waving Paw
  const BearIllustration = ({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) => {
    const scale = size === 'sm' ? 'w-28 h-28' : size === 'lg' ? 'w-56 h-56' : 'w-44 h-44';

    return (
      <div className={`relative ${scale} select-none flex items-center justify-center`}>
        <svg
          viewBox="-10 0 245 240"
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
            {/* Cartoon Fart Brown Smoke Gradients */}
            <radialGradient id="smokeBrown1" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#C99B52" />
              <stop offset="55%" stopColor="#8A5A23" />
              <stop offset="100%" stopColor="#54330A" />
            </radialGradient>
            <radialGradient id="smokeBrown2" cx="30%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#8A752D" />
              <stop offset="65%" stopColor="#614415" />
              <stop offset="100%" stopColor="#3D2408" />
            </radialGradient>
          </defs>

          {/* Main Bear Character Group (with comical shudder when farting) */}
          <motion.g
            animate={
              isFarting
                ? {
                    x: [0, -3, 3, -2.5, 2.5, -1, 0],
                    y: [0, -1, 2, -1, 0],
                  }
                : {}
            }
            transition={{ duration: 0.35, repeat: isFarting ? 8 : 0 }}
          >
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

            {/* Mouth: Widens cheerfully into a big beaming grin every time he farts! */}
            {isFarting ? (
              <g>
                {/* Center philtrum line */}
                <path d="M 100 114 L 100 118" stroke="#2B1A0D" strokeWidth="2.5" strokeLinecap="round" />
                {/* Extra-wide open cheerful mouth cavity (widened from 24px to 52px across muzzle) */}
                <path
                  d="M 74 118 Q 100 145 126 118 Q 100 125 74 118 Z"
                  fill="#8B2618"
                  stroke="#2B1A0D"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                />
                {/* Cheerful rosy pink tongue inside wide grin */}
                <path
                  d="M 86 135 Q 100 128 114 135 Q 100 144 86 135 Z"
                  fill="#F88F88"
                />
                {/* Uplifted cheeky smile corner dimples */}
                <path d="M 72 115 Q 74 119 77 120" fill="none" stroke="#2B1A0D" strokeWidth="2.2" strokeLinecap="round" />
                <path d="M 128 115 Q 126 119 123 120" fill="none" stroke="#2B1A0D" strokeWidth="2.2" strokeLinecap="round" />
              </g>
            ) : (
              <g>
                {/* Normal sweet teddy mouth */}
                <path d="M 100 114 L 100 122" stroke="#2B1A0D" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M 88 122 Q 100 132 112 122" fill="none" stroke="#2B1A0D" strokeWidth="2.5" strokeLinecap="round" />
              </g>
            )}

            {/* Blush Cheeks (kept and flushed vibrant rosy red during fart) */}
            <ellipse
              cx="66"
              cy="114"
              rx={isFarting ? 9.5 : 8}
              ry={isFarting ? 6.5 : 5.5}
              fill={isFarting ? '#EA5A47' : '#E88F80'}
              opacity={isFarting ? 0.85 : 0.5}
            />
            <ellipse
              cx="134"
              cy="114"
              rx={isFarting ? 9.5 : 8}
              ry={isFarting ? 6.5 : 5.5}
              fill={isFarting ? '#EA5A47' : '#E88F80'}
              opacity={isFarting ? 0.85 : 0.5}
            />

            {/* Bigger, Expressive Luminous Eyes (gleeful squint & shine during fart) */}
            <g>
              {/* Left Eye */}
              <motion.ellipse
                cx={isFarting ? 78 : 76}
                cy="88"
                rx={isFarting ? 9 : 8.5}
                ry={isFarting ? 8 : 10}
                fill="#201206"
                animate={isFarting ? { x: [0, 1.5, 0] } : { scaleY: [1, 1, 0.1, 1, 1] }}
                transition={
                  isFarting
                    ? { duration: 0.5, repeat: Infinity }
                    : { repeat: Infinity, duration: 4, times: [0, 0.9, 0.93, 0.96, 1] }
                }
              />
              {/* Big glossy catchlights */}
              <circle cx={isFarting ? 75.5 : 73.5} cy="86" r="3" fill="#FFFFFF" />
              <circle cx={isFarting ? 81 : 79} cy="91" r="1.4" fill="#FFFFFF" opacity="0.8" />

              {/* Right Eye */}
              <motion.ellipse
                cx={isFarting ? 126 : 124}
                cy="88"
                rx={isFarting ? 9 : 8.5}
                ry={isFarting ? 8 : 10}
                fill="#201206"
                animate={isFarting ? { x: [0, 1.5, 0] } : { scaleY: [1, 1, 0.1, 1, 1] }}
                transition={
                  isFarting
                    ? { duration: 0.5, repeat: Infinity }
                    : { repeat: Infinity, duration: 4, times: [0, 0.9, 0.93, 0.96, 1] }
                }
              />
              {/* Big glossy catchlights */}
              <circle cx={isFarting ? 123.5 : 121.5} cy="86" r="3" fill="#FFFFFF" />
              <circle cx={isFarting ? 129 : 127} cy="91" r="1.4" fill="#FFFFFF" opacity="0.8" />
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

          </motion.g>

          {/* 10-Second Cartoon Fart: Plume of Brown Smoke & Cartoonish "Eww!" */}
          <AnimatePresence>
            {isFarting && (
              <motion.g
                initial={{ opacity: 0, scale: 0.2, originX: '145px', originY: '205px' }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.25, transition: { duration: 0.6 } }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              >
                {/* Plume of Brown Smoke Billowing Out from Bear's Butt */}
                <g>
                  {/* Smoke puff 1 (closest to butt) */}
                  <motion.circle
                    cx="150"
                    cy="205"
                    r="11"
                    fill="url(#smokeBrown1)"
                    stroke="#3B2207"
                    strokeWidth="1.5"
                    animate={{ scale: [0.9, 1.25, 1], y: [0, -4, -8], x: [0, 2, 4] }}
                    transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  {/* Smoke puff 2 (expanding outward) */}
                  <motion.circle
                    cx="172"
                    cy="194"
                    r="17"
                    fill="url(#smokeBrown2)"
                    stroke="#3B2207"
                    strokeWidth="2"
                    animate={{ scale: [0.95, 1.3, 1.1], y: [0, -6, -12], x: [0, 4, 8] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  {/* Smoke puff 3 (big main brown cloud) */}
                  <motion.circle
                    cx="196"
                    cy="176"
                    r="22"
                    fill="url(#smokeBrown1)"
                    stroke="#3B2207"
                    strokeWidth="2"
                    animate={{ scale: [1, 1.4, 1.15], y: [0, -8, -16], x: [0, 6, 12] }}
                    transition={{ duration: 2.1, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  {/* Smoke puff 4 (rising top puff) */}
                  <motion.circle
                    cx="180"
                    cy="160"
                    r="15"
                    fill="url(#smokeBrown2)"
                    stroke="#3B2207"
                    strokeWidth="1.5"
                    animate={{ scale: [0.9, 1.35, 1], y: [0, -10, -20], x: [0, 3, 6] }}
                    transition={{ duration: 2.3, repeat: Infinity, ease: 'easeInOut' }}
                  />

                  {/* Stink Wavy Green-Brown Vapor Lines */}
                  <motion.path
                    d="M 185 146 Q 192 134 184 122 Q 190 110 182 98"
                    fill="none"
                    stroke="#735216"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    animate={{ opacity: [0.2, 0.9, 0.3], y: [0, -6, -12] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <motion.path
                    d="M 205 152 Q 214 138 206 126 Q 212 114 204 102"
                    fill="none"
                    stroke="#8A631E"
                    strokeWidth="2"
                    strokeLinecap="round"
                    animate={{ opacity: [0.3, 0.85, 0.2], y: [0, -8, -16] }}
                    transition={{ duration: 1.7, delay: 0.2, repeat: Infinity }}
                  />
                </g>

                {/* Cartoon "Eww!" Comic Sound Pop Bubble */}
                <motion.g
                  initial={{ scale: 0, rotate: -15, originX: '185px', originY: '95px' }}
                  animate={{
                    scale: [0, 1.25, 1, 1.1, 1],
                    rotate: [-15, 6, -4, 4, 0],
                    y: [0, -6, -12, -16],
                  }}
                  transition={{ duration: 3, times: [0, 0.15, 0.3, 0.7, 1], ease: 'easeOut' }}
                >
                  {/* Spiky Cartoon Pop Cloud */}
                  <path
                    d="M 154 95 L 145 104 L 158 108 L 152 119 L 167 116 L 172 128 L 185 120 L 196 130 L 202 118 L 215 124 L 212 110 L 225 107 L 216 97 L 225 87 L 210 87 L 207 74 L 195 83 L 184 72 L 178 84 L 163 78 L 165 91 Z"
                    fill="#FFF6B8"
                    stroke="#381D04"
                    strokeWidth="2.5"
                    strokeLinejoin="round"
                  />

                  {/* Cartoonish "Eww!" Text in Comic/Impact Style */}
                  <text
                    x="185"
                    y="104"
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontFamily="'Impact', 'Arial Black', 'Comic Sans MS', sans-serif"
                    fontWeight="900"
                    fontSize="22"
                    fill="#4A2604"
                    stroke="#FFE500"
                    strokeWidth="0.8"
                    letterSpacing="0.8px"
                  >
                    Eww!
                  </text>

                  {/* Funny little comic stink drops */}
                  <circle cx="150" cy="80" r="2.5" fill="#887018" />
                  <circle cx="220" cy="78" r="2" fill="#755E12" />
                  <circle cx="146" cy="116" r="1.8" fill="#887018" />
                </motion.g>
              </motion.g>
            )}
          </AnimatePresence>
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
            onClick={() => {
              setIsFarting(true);
              setIsWaving(true);
              setTimeout(() => {
                setIsFarting(false);
              }, 3500);
            }}
            title="Click me to wave and fart!"
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

          {/* Action buttons (Sound Toggle & Dismiss) */}
          <div className="self-start flex items-center gap-1">
            <button
              onClick={() => setIsMuted(!isMuted)}
              aria-label={isMuted ? 'Unmute sound effect' : 'Mute sound effect'}
              title={isMuted ? 'Unmute sound effect' : 'Mute sound effect'}
              className="text-[#948574] hover:text-[#1E1B18] p-1.5 rounded-full hover:bg-[#EFE8DC] transition-colors cursor-pointer"
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-[#A64A4A]" /> : <Volume2 className="w-4 h-4 text-[#3E654E]" />}
            </button>

            <button
              onClick={() => setIsDismissed(true)}
              aria-label="Dismiss greeting"
              className="text-[#948574] hover:text-[#1E1B18] p-1.5 rounded-full hover:bg-[#EFE8DC] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
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
            {/* Top header with close/minimize and audio toggle */}
            <div className="flex items-center justify-between border-b border-[#EAE3D4] pb-2">
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#1E1B18]">
                <span className="w-2 h-2 rounded-full bg-[#3E654E]" />
                <span>Bearista Stinkalot</span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  aria-label={isMuted ? 'Unmute sound' : 'Mute sound'}
                  className="p-1 text-[#8C7D6D] hover:text-[#1E1B18] rounded cursor-pointer"
                  title={isMuted ? 'Unmute toot sound' : 'Mute toot sound'}
                >
                  {isMuted ? <VolumeX className="w-3.5 h-3.5 text-[#A64A4A]" /> : <Volume2 className="w-3.5 h-3.5 text-[#3E654E]" />}
                </button>
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
                onClick={() => {
                  setIsFarting(true);
                  setIsWaving(true);
                  setTimeout(() => {
                    setIsFarting(false);
                  }, 3500);
                }}
                title="Click me to wave and fart!"
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
