import React from 'react';

interface FooterProps {
  onSelectTab: (tab: 'shop' | 'subscription' | 'brewing' | 'journal') => void;
  onOpenQuiz: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab, onOpenQuiz }) => {
  return (
    <footer className="bg-[#1C1815] text-[#C4B7A5] pt-14 pb-10 border-t border-black/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Brand & Manifesto */}
          <div className="md:col-span-5 space-y-4">
            <h3 className="font-serif text-2xl font-bold text-white tracking-tight">
              Common Ground
            </h3>
            <p className="text-xs sm:text-sm text-[#A89C8B] leading-relaxed max-w-sm">
              An independent specialty coffee roaster and artisan tea atelier. Committed to ethical micro-lot sourcing, zero-compromise roast profiling, and everyday brewing rituals.
            </p>
            <div className="pt-2 text-xs font-mono text-[#8C7E6E] space-y-1">
              <div>Roasting Schedule: Tuesday & Thursday Weekly Runs</div>
              <div>Direct-Trade Standard: Minimum 200% Over C-Market Index</div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="font-serif text-sm font-semibold text-white">Curations</h4>
            <ul className="space-y-2 text-xs text-[#A89C8B]">
              <li>
                <button
                  onClick={() => onSelectTab('shop')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Single Origin Beans
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('shop')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Artisan Tea & Matcha
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('subscription')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  The Roaster’s Club
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenQuiz}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Taste Match Quiz
                </button>
              </li>
            </ul>
          </div>

          {/* Education & Craft */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="font-serif text-sm font-semibold text-white">Brew & Learn</h4>
            <ul className="space-y-2 text-xs text-[#A89C8B]">
              <li>
                <button
                  onClick={() => onSelectTab('brewing')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Hario V60 Masterclass
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('brewing')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Ceremonial Matcha
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('brewing')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Gongfu Cha Gaiwan
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('journal')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Roastery Field Notes
                </button>
              </li>
            </ul>
          </div>

          {/* Atelier Newsletter */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-serif text-sm font-semibold text-white">The Fresh Roast Dispatch</h4>
            <p className="text-xs text-[#A89C8B] leading-relaxed">
              Early access to fleeting micro-lots, seasonal single gardens, and roast schedules.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert('Thank you for joining our roastery dispatch.');
              }}
              className="flex gap-2"
            >
              <input
                type="email"
                placeholder="Your email address"
                required
                className="w-full px-3 py-2 bg-white/5 border border-white/15 rounded-lg text-xs text-white placeholder:text-[#786D5F] focus:outline-none focus:border-white/40 font-mono"
              />
              <button
                type="submit"
                className="px-3 py-2 bg-white text-[#1C1815] text-xs font-bold rounded-lg hover:bg-[#EAE2D3] transition-colors cursor-pointer shrink-0"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-[#786D5F] gap-4">
          <div>
            © {new Date().getFullYear()} Common Ground Coffee Roasters & Tea Atelier. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Sustainably Packaged</span>
            <span aria-hidden="true">·</span>
            <span>Direct Sourcing</span>
            <span aria-hidden="true">·</span>
            <span>Freshness Guaranteed</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
