import React, { useState, useEffect } from 'react';
import { Search, SlidersHorizontal, Sparkles, Coffee, Leaf, Check } from 'lucide-react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { SubscriptionBuilder } from './components/SubscriptionBuilder';
import { BrewingGuideLab } from './components/BrewingGuideLab';
import { JournalSection } from './components/JournalSection';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { TasteQuizModal } from './components/TasteQuizModal';
import { Footer } from './components/Footer';
import { BaristaBear } from './components/BaristaBear';
import { PRODUCTS, BREW_GUIDES, JOURNAL_ARTICLES } from './data/mockData';
import { Product, CartItem } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<'shop' | 'subscription' | 'brewing' | 'journal'>('shop');

  // Filter & Search states
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'coffee' | 'tea' | 'reserves'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRoast, setSelectedRoast] = useState<string>('all');
  const [selectedBrewMethod, setSelectedBrewMethod] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  // Modal & Drawer states
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  // Cart state persisted to localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('common_ground_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Toast notification for user action feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('common_ground_cart', JSON.stringify(cart));
    } catch {
      // storage unavailable
    }
  }, [cart]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Cart manipulation
  const handleAddToCart = (newItem: {
    productId: string;
    name: string;
    category: Product['category'];
    selectedWeight: string;
    selectedGrind: string;
    price: number;
    quantity: number;
    isSubscription: boolean;
    subscriptionCadence?: string;
    visualTheme: Product['visualTheme'];
  }) => {
    setCart((prev) => {
      // Check if identical item already exists (same product, weight, grind, subscription)
      const existingIdx = prev.findIndex(
        (i) =>
          i.productId === newItem.productId &&
          i.selectedWeight === newItem.selectedWeight &&
          i.selectedGrind === newItem.selectedGrind &&
          i.isSubscription === newItem.isSubscription &&
          i.subscriptionCadence === newItem.subscriptionCadence
      );

      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += newItem.quantity;
        return updated;
      } else {
        const cartItemInstance: CartItem = {
          id: `${newItem.productId}-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
          ...newItem,
        };
        return [...prev, cartItemInstance];
      }
    });

    showToast(`Added "${newItem.name}" to your bag`);
  };

  const handleQuickAdd = (product: Product) => {
    handleAddToCart({
      productId: product.id,
      name: product.name,
      category: product.category,
      selectedWeight: product.weights[0].size,
      selectedGrind: product.grindOptions[0],
      price: product.price,
      quantity: 1,
      isSubscription: false,
      visualTheme: product.visualTheme,
    });
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const cartCount = cart.reduce((acc, i) => acc + i.quantity, 0);
  const cartSubtotal = cart.reduce((acc, i) => acc + i.price * i.quantity, 0);

  // Filtered & Sorted Products
  const filteredProducts = PRODUCTS.filter((product) => {
    // Category match
    if (categoryFilter === 'coffee' && product.category !== 'coffee') return false;
    if (categoryFilter === 'tea' && product.category !== 'tea') return false;
    if (categoryFilter === 'reserves' && !product.badge) return false;

    // Search query match
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = product.name.toLowerCase().includes(q);
      const matchOrigin = product.origin.country.toLowerCase().includes(q) || product.origin.region.toLowerCase().includes(q);
      const matchNotes = product.tastingNotes.some((n) => n.toLowerCase().includes(q));
      if (!matchName && !matchOrigin && !matchNotes) return false;
    }

    // Roast / style match
    if (selectedRoast !== 'all') {
      if (!product.roastOrType.toLowerCase().includes(selectedRoast.toLowerCase())) {
        return false;
      }
    }

    // Brew method match
    if (selectedBrewMethod !== 'all') {
      if (!product.recommendedBrew.some((b) => b.toLowerCase().includes(selectedBrewMethod.toLowerCase()))) {
        return false;
      }
    }

    return true;
  }).sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0; // featured default
  });

  const featuredCoffee = PRODUCTS[1]; // Guji Hambela
  const featuredTea = PRODUCTS[5];    // Ceremonial Uji Matcha

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#24211D]">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1F1B17] text-white py-3 px-4 rounded-xl shadow-2xl flex items-center gap-2.5 text-xs sm:text-sm font-medium border border-white/20 animate-fade-in">
          <Check className="w-4 h-4 text-[#7DE289]" />
          <span>{toastMessage}</span>
          <button
            onClick={() => setIsCartOpen(true)}
            className="ml-2 underline font-mono text-[11px] text-[#E0D3BE] hover:text-white cursor-pointer"
          >
            View Bag
          </button>
        </div>
      )}

      {/* Top Bar Header strictly following Top Bar Contract */}
      <Header
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        cartCount={cartCount}
        cartSubtotal={cartSubtotal}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Main Content Areas */}
      <main className="flex-1">
        {/* Tab: Shop Beans & Leaves */}
        {activeTab === 'shop' && (
          <>
            <HeroSection
              featuredCoffee={featuredCoffee}
              featuredTea={featuredTea}
              onExploreShop={() => {
                const el = document.getElementById('catalog-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              onOpenSubscription={() => {
                setActiveTab('subscription');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenQuiz={() => setIsQuizOpen(true)}
              onSelectProduct={(p) => setSelectedProduct(p)}
            />

            {/* Catalog Discovery Section */}
            <section id="catalog-section" className="py-10 sm:py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Animated Teddy Bear Barista Greeting */}
              <BaristaBear
                variant="embedded"
                onOpenQuiz={() => setIsQuizOpen(true)}
                onExploreShop={() => {
                  const el = document.getElementById('catalog-grid-top');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              />

              <div id="catalog-grid-top" />

              {/* Category Segmented Controls & Search Toolbar */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#EAE3D4]">
                {/* Interactive Category Tabs */}
                <div className="flex items-center gap-1.5 p-1 bg-[#EFE9DC] rounded-xl self-start border border-[#DECDB3]">
                  <button
                    onClick={() => setCategoryFilter('all')}
                    className={`px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-all cursor-pointer ${
                      categoryFilter === 'all'
                        ? 'bg-white text-[#1E1B18] shadow-sm font-semibold'
                        : 'text-[#695E50] hover:text-[#1E1B18]'
                    }`}
                  >
                    All Harvests ({PRODUCTS.length})
                  </button>
                  <button
                    onClick={() => setCategoryFilter('coffee')}
                    className={`px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                      categoryFilter === 'coffee'
                        ? 'bg-white text-[#1E1B18] shadow-sm font-semibold'
                        : 'text-[#695E50] hover:text-[#1E1B18]'
                    }`}
                  >
                    <Coffee className="w-3.5 h-3.5 text-[#A86E38]" />
                    <span>Specialty Coffee</span>
                  </button>
                  <button
                    onClick={() => setCategoryFilter('tea')}
                    className={`px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                      categoryFilter === 'tea'
                        ? 'bg-white text-[#1E1B18] shadow-sm font-semibold'
                        : 'text-[#695E50] hover:text-[#1E1B18]'
                    }`}
                  >
                    <Leaf className="w-3.5 h-3.5 text-[#4E8256]" />
                    <span>Artisan Tea & Matcha</span>
                  </button>
                  <button
                    onClick={() => setCategoryFilter('reserves')}
                    className={`px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                      categoryFilter === 'reserves'
                        ? 'bg-white text-[#1E1B18] shadow-sm font-semibold'
                        : 'text-[#695E50] hover:text-[#1E1B18]'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#D97736]" />
                    <span>Micro-Lot Reserves</span>
                  </button>
                </div>

                {/* Search Bar & Sorting */}
                <div className="flex flex-wrap items-center gap-2.5">
                  <div className="relative">
                    <Search className="w-4 h-4 text-[#8C7D6D] absolute left-3 top-2.5" />
                    <input
                      type="text"
                      placeholder="Search tasting notes, country, lot..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9 pr-3 py-2 bg-white border border-[#DACFB8] rounded-lg text-xs text-[#1F1B17] placeholder:text-[#8C7E6E] focus:outline-none focus:border-[#1F1B17] w-56 sm:w-64"
                    />
                  </div>

                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                    className="p-2 bg-white border border-[#DACFB8] rounded-lg text-xs text-[#1F1B17] font-medium focus:outline-none cursor-pointer"
                  >
                    <option value="featured">Featured Curations</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                </div>
              </div>

              {/* Secondary Refinement Strip: Roast & Brew Method filters */}
              <div className="py-4 flex flex-wrap items-center justify-between gap-3 text-xs text-[#6B5F4F]">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-[#8A7C6B] flex items-center gap-1">
                    <SlidersHorizontal className="w-3.5 h-3.5" /> Filter By:
                  </span>

                  <select
                    value={selectedRoast}
                    onChange={(e) => setSelectedRoast(e.target.value)}
                    className="px-2.5 py-1 bg-white border border-[#DACFB8] rounded-md text-xs text-[#1F1B17] font-medium"
                  >
                    <option value="all">All Roasts & Harvest Styles</option>
                    <option value="Light">Light Roast (Floral / Sparkling)</option>
                    <option value="Medium">Medium Roast (Caramel / Balanced)</option>
                    <option value="Matcha">Ceremonial Matcha</option>
                    <option value="Oolong">Charcoal Roasted Oolong</option>
                    <option value="White">Imperial White Buds</option>
                  </select>

                  <select
                    value={selectedBrewMethod}
                    onChange={(e) => setSelectedBrewMethod(e.target.value)}
                    className="px-2.5 py-1 bg-white border border-[#DACFB8] rounded-md text-xs text-[#1F1B17] font-medium"
                  >
                    <option value="all">All Brewing Devices</option>
                    <option value="Pour Over">Pour Over / V60</option>
                    <option value="Espresso">Espresso Machine</option>
                    <option value="AeroPress">AeroPress</option>
                    <option value="Whisk">Chasen Whisk (Matcha)</option>
                    <option value="Gongfu">Gongfu Cha / Gaiwan</option>
                    <option value="Cold">Cold Brew</option>
                  </select>

                  {(selectedRoast !== 'all' || selectedBrewMethod !== 'all' || searchQuery) && (
                    <button
                      onClick={() => {
                        setSelectedRoast('all');
                        setSelectedBrewMethod('all');
                        setSearchQuery('');
                      }}
                      className="text-xs text-[#9E6533] hover:underline font-mono"
                    >
                      Clear Filters
                    </button>
                  )}
                </div>

                <div className="font-mono text-xs text-[#8C7D6D]">
                  Showing {filteredProducts.length} harvest{filteredProducts.length === 1 ? '' : 's'}
                </div>
              </div>

              {/* Product Grid */}
              {filteredProducts.length === 0 ? (
                <div className="py-16 text-center text-[#786A59]">
                  <h4 className="font-serif text-lg font-bold text-[#1E1B18]">
                    No harvests match your criteria
                  </h4>
                  <p className="text-xs text-[#695D4E] mt-1">
                    Try adjusting your search terms or clearing your roast filter.
                  </p>
                  <button
                    onClick={() => {
                      setCategoryFilter('all');
                      setSearchQuery('');
                      setSelectedRoast('all');
                      setSelectedBrewMethod('all');
                    }}
                    className="mt-4 px-4 py-2 bg-[#1F1B17] text-white text-xs font-medium rounded-lg cursor-pointer"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-4">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onQuickView={(p) => setSelectedProduct(p)}
                      onQuickAdd={handleQuickAdd}
                    />
                  ))}
                </div>
              )}
            </section>
          </>
        )}

        {/* Tab: Subscriptions */}
        {activeTab === 'subscription' && (
          <SubscriptionBuilder
            onAddSubscriptionToBag={(subItem) => {
              handleAddToCart(subItem);
              setIsCartOpen(true);
            }}
          />
        )}

        {/* Tab: Brewing Guides */}
        {activeTab === 'brewing' && <BrewingGuideLab guides={BREW_GUIDES} />}

        {/* Tab: Roastery Journal Blog */}
        {activeTab === 'journal' && <JournalSection articles={JOURNAL_ARTICLES} />}
      </main>

      {/* Footer */}
      <Footer
        onSelectTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenQuiz={() => setIsQuizOpen(true)}
      />

      {/* Floating Barista Bear Companion (with minimize / tips) */}
      <BaristaBear
        variant="floating"
        autoFart={activeTab !== 'shop'}
        onOpenQuiz={() => setIsQuizOpen(true)}
        onExploreShop={() => {
          setActiveTab('shop');
          const el = document.getElementById('catalog-grid-top');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Product Detail Modal (PDP) */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Taste Match Quiz Modal */}
      <TasteQuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        products={PRODUCTS}
        onSelectProduct={(p) => setSelectedProduct(p)}
        onAddToCart={handleAddToCart}
      />

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        onExploreShop={() => {
          setIsCartOpen(false);
          setActiveTab('shop');
        }}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        onOrderComplete={() => {
          setCart([]);
        }}
      />
    </div>
  );
}
