export type ProductCategory = 'coffee' | 'tea';

export interface ProductWeightOption {
  size: string;
  price: number;
}

export interface FlavorScores {
  acidity: number; // 0 - 100
  body: number;    // 0 - 100
  sweetness: number; // 0 - 100
  floral: number;  // 0 - 100
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: ProductCategory;
  origin: {
    country: string;
    region: string;
    estate: string;
    elevation: string;
  };
  roastOrType: string; // e.g. "Light Roast", "Medium-Light", "Ceremonial Grade Matcha", "High Mountain Oolong"
  tastingNotes: string[];
  processMethod: string;
  flavorScores: FlavorScores;
  recommendedBrew: string[];
  price: number; // base price
  weights: ProductWeightOption[];
  grindOptions: string[];
  harvestSeason: string;
  story: string;
  badge?: string;
  visualTheme: {
    baseColor: string; // hex or tailwind class
    accentColor: string;
    patternType: 'waves' | 'botanical' | 'rings' | 'topography';
    labelColor: string;
    sealText: string;
  };
  inStock: boolean;
  rating: number;
  reviewCount: number;
}

export interface CartItem {
  id: string; // unique item instance id
  productId: string;
  name: string;
  category: ProductCategory;
  selectedWeight: string;
  selectedGrind: string;
  price: number;
  quantity: number;
  isSubscription: boolean;
  subscriptionCadence?: string; // 'Weekly' | 'Bi-Weekly' | 'Monthly'
  visualTheme: Product['visualTheme'];
}

export interface SubscriptionConfig {
  planId: string;
  curation: 'single_origin' | 'signature_blends' | 'rare_tea' | 'duo_atelier';
  frequency: 'weekly' | 'biweekly' | 'monthly';
  bagsCount: number;
  format: string;
  flavorPreference: string;
  deliveryAddress?: string;
  active: boolean;
  nextShipmentDate: string;
}

export interface BrewGuideStep {
  title: string;
  durationSeconds: number;
  waterGramsTarget: number;
  instruction: string;
  tip?: string;
}

export interface BrewGuide {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: ProductCategory;
  methodName: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  totalTimeMinutes: string;
  dryGramsDefault: number;
  waterGramsDefault: number;
  ratioLabel: string;
  grindSize: string;
  waterTemp: string;
  equipment: string[];
  overview: string;
  steps: BrewGuideStep[];
}

export interface JournalArticle {
  id: string;
  slug: string;
  title: string;
  category: 'Origin Travel' | 'Brewing Science' | 'Tea Culture' | 'Roasting Craft';
  readTime: string;
  publishedDate: string;
  excerpt: string;
  author: {
    name: string;
    role: string;
  };
  contentSections: {
    heading: string;
    text: string;
  }[];
}
