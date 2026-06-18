'use client';

import * as React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, Search, Heart, X, ChevronLeft, ChevronRight, 
  ArrowUp, Phone, MapPin, Sparkles, Truck, Headphones, 
  ShieldCheck, Check, Instagram, Eye, ArrowRight, Minus, 
  Plus, Menu, HelpCircle, Send, MessageSquare 
} from 'lucide-react';

// --- DATA STRUCTURES & CONFIG ---

interface Product {
  id: string;
  name: string;
  category: 'decor' | 'kitchen' | 'bed' | 'all';
  image: string;
  originalPrice?: number;
  price: number;
  priceRange?: { min: number; max: number };
  badge?: string;
  isSale?: boolean;
  isOutOfStock?: boolean;
  hasVariants?: boolean;
  variants?: { id: string; name: string; price: number }[];
  description: string;
  sku: string;
}

const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Sophie Candle Holders (Set of 6)',
    sku: 'MD-SOPHIE-6',
    category: 'decor',
    image: 'https://images.unsplash.com/photo-1603006905393-0d4beb6806e5?auto=format&fit=crop&w=800&q=80',
    originalPrice: 26999,
    price: 10990,
    badge: '-59%',
    isSale: true,
    description: 'Add a touch of warmth and editorial sophistication with this brass-plated set of six Sophie Candle Holders. Crafted with high-grade solid alloy and calibrated to host standard taper candles elegantly. Perfect for ambient tablescaping and intimate evening gatherings.',
  },
  {
    id: 'p2',
    name: 'CHESS PIECES ORNAMENTS (SET OF 3)',
    sku: 'MD-CHESS-3',
    category: 'decor',
    image: 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&w=800&q=80',
    originalPrice: 20999,
    price: 19999,
    badge: '-5%',
    isSale: true,
    description: 'An artistic, low-profile statuary set representing the King, Queen, and Knight. Masterfully molded using heavy marble-dust composite and topped with dark gold-brushed finishing. An exceptional focal point for executive home libraries and drawing room coffee tables.',
  },
  {
    id: 'p3',
    name: 'DEER HEAD BOOKENDS',
    sku: 'MD-DEER-BK',
    category: 'decor',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
    originalPrice: 14990,
    price: 11990,
    badge: '-20%',
    isSale: true,
    description: 'Weighty architectural accent bookends shaped into classical deer head profiles. Finished in a matte metallic deep-gold luster with heavy black felt-padded bases to secure your literature collections on floating shelves securely.',
  },
  {
    id: 'p4',
    name: 'Globe Bookends',
    sku: 'MD-GLOBE-BK',
    category: 'decor',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    originalPrice: 14990,
    price: 11990,
    badge: '-20%',
    isSale: true,
    description: 'Revolving terrestrial sphere bookends featuring antique cartographic styling, metal gimbals, and highly treated dark mahogany solid wood stands. A scholarly addition to mid-century modern workspaces.',
  },
  {
    id: 'p5',
    name: 'Tripod Feather Lamp',
    sku: 'MD-TRIPOD-FL',
    category: 'decor',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
    originalPrice: 34999,
    price: 24999,
    badge: 'Out Of Stock',
    isOutOfStock: true,
    description: 'High-fashion ostrich feather floor-lamp configured on raw hand-brushed solid nickel tripod legs. Distributes a breathtaking, romantic ambient glow. Feathers are hand-sorted and cruelty-free certified.',
  },
  {
    id: 'p6',
    name: 'Nickel Clock',
    sku: 'MD-NICKEL-CLK',
    category: 'decor',
    image: 'https://images.unsplash.com/photo-1563861826100-9cb868fdcd1c?auto=format&fit=crop&w=800&q=80',
    price: 29999,
    description: 'Minimalist industrial wall clock in hand-cast brushed nickel. Features continuous quiet quartz-sweeping movement without clock ticks. Ideal for quiet libraries, premium workspaces, and gallery walls.',
  },
  {
    id: 'p7',
    name: 'Blossom Tree Ornaments',
    sku: 'MD-BLOSSOM-TR',
    category: 'decor',
    image: 'https://images.unsplash.com/photo-1522441815192-d9f04eb0615c?auto=format&fit=crop&w=800&q=80',
    originalPrice: 34999,
    price: 24999,
    badge: '-29%',
    isSale: true,
    description: 'Intertwining floral branches modeled after the vivid spring blossoms. Heavily electroplated in double-layered lustrous gold with a solid natural black stone platform base.',
  },
  {
    id: 'p8',
    name: 'Dragonfly Candleholder',
    sku: 'MD-DRAGONFLY',
    category: 'decor',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    price: 7990,
    priceRange: { min: 7990, max: 8990 },
    hasVariants: true,
    variants: [
      { id: 'v1', name: 'Small Desk Model', price: 7990 },
      { id: 'v2', name: 'Large Display Model', price: 8990 }
    ],
    description: 'Exquisite detailed metal dragonfly sculpture carrying a hand-blown, warmth-insulated amber glass tealight vessel. Cast iron with bronze patina highlights that outline elegant wing patterns on adjacent surfaces when lit.',
  }
];

const LOOKBOOK_HOTSPOTS = [
  { id: 'h1', x: '28%', y: '45%', productId: 'p1', label: 'Sophie Candle Holders' },
  { id: 'h2', x: '72%', y: '60%', productId: 'p3', label: 'Deer Head Bookends' },
  { id: 'h3', x: '50%', y: '35%', productId: 'p6', label: 'Nickel Clock' },
];

const INSTAGRAM_POSTS = [
  { id: 'ig1', image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=500&q=80' },
  { id: 'ig2', image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=500&q=80' },
  { id: 'ig3', image: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=500&q=80' },
  { id: 'ig4', image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=500&q=80' },
  { id: 'ig5', image: 'https://images.unsplash.com/photo-1615876234886-fd9a39fda97f?auto=format&fit=crop&w=500&q=80' },
  { id: 'ig6', image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=500&q=80' },
];

interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant?: { id: string; name: string; price: number };
}

export default function Home() {
  // --- STATE MANAGEMENT ---
  const [cart, setCart] = React.useState<CartItem[]>([]);
  const [wishlist, setWishlist] = React.useState<string[]>([]);
  
  // Modal Overlays
  const [isCartOpen, setIsCartOpen] = React.useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = React.useState(false);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [lookbookProduct, setLookbookProduct] = React.useState<Product | null>(null);
  const [quickViewProduct, setQuickViewProduct] = React.useState<Product | null>(null);
  const [selectedVariant, setSelectedVariant] = React.useState<{ id: string; name: string; price: number } | null>(null);
  const [quickViewQty, setQuickViewQty] = React.useState(1);

  // Search filter
  const [searchQuery, setSearchQuery] = React.useState('');
  
  // Tracking Order Modal
  const [isTrackOpen, setIsTrackOpen] = React.useState(false);
  const [trackingNumber, setTrackingNumber] = React.useState('');
  const [trackingStatus, setTrackingStatus] = React.useState<any | null>(null);

  // Notification Toast
  const [toast, setToast] = React.useState<{ show: boolean; msg: string; productImg?: string } | null>(null);

  // Newsletter subscription status
  const [newsletterSubscribed, setNewsletterSubscribed] = React.useState(false);
  const [newsletterEmail, setNewsletterEmail] = React.useState('');

  // Mobile Bottom Banner Promo Active
  const [showMobilePromo, setShowMobilePromo] = React.useState(true);

  // Back to top scroll observer
  const [showBackToTop, setShowBackToTop] = React.useState(false);

  // Carousel Trending Auto-shift
  const [carouselIndex, setCarouselIndex] = React.useState(0);
  const [isCarouselHovered, setIsCarouselHovered] = React.useState(false);

  // Shop All Active Filter tab ('all', 'decor', 'kitchen', 'bed')
  const [categoryFilter, setCategoryFilter] = React.useState<'all' | 'decor' | 'kitchen' | 'bed'>('all');

  // --- INITIAL LOAD & LOCALSTORAGE PERSISTENCE ---
  React.useEffect(() => {
    const timer = setTimeout(() => {
      const savedCart = localStorage.getItem('marinas_cart');
      const savedWishlist = localStorage.getItem('marinas_wishlist');
      if (savedCart) {
        try { setCart(JSON.parse(savedCart)); } catch (e) { console.error(e); }
      }
      if (savedWishlist) {
        try { setWishlist(JSON.parse(savedWishlist)); } catch (e) { console.error(e); }
      }
    }, 0);

    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const saveCartToStorage = (updatedCart: CartItem[]) => {
    localStorage.setItem('marinas_cart', JSON.stringify(updatedCart));
  };

  const saveWishlistToStorage = (updatedWishlist: string[]) => {
    localStorage.setItem('marinas_wishlist', JSON.stringify(updatedWishlist));
  };

  // --- CORE INTERACTIONS ---

  const triggerToast = (msg: string, productImg?: string) => {
    setToast({ show: true, msg, productImg });
    setTimeout(() => {
      setToast(null);
    }, 4500);
  };

  const toggleWishlist = (productId: string) => {
    let updated;
    if (wishlist.includes(productId)) {
      updated = wishlist.filter(id => id !== productId);
      triggerToast('Removed item from your Saved Gallery.');
    } else {
      updated = [...wishlist, productId];
      const product = PRODUCTS.find(p => p.id === productId);
      triggerToast(`Saved "${product?.name}" to Wishlist!`, product?.image);
    }
    setWishlist(updated);
    saveWishlistToStorage(updated);
  };

  const addToCart = (product: Product, quantity: number = 1, variant?: { id: string; name: string; price: number }) => {
    if (product.isOutOfStock) {
      triggerToast('Apologies, this luxury item is currently out of stock.');
      return;
    }

    const existingIndex = cart.findIndex(item => 
      item.product.id === product.id && 
      (!variant || item.selectedVariant?.id === variant.id)
    );

    let updatedCart = [...cart];
    if (existingIndex > -1) {
      updatedCart[existingIndex].quantity += quantity;
    } else {
      updatedCart.push({
        product,
        quantity,
        selectedVariant: variant
      });
    }

    setCart(updatedCart);
    saveCartToStorage(updatedCart);
    
    // Quick triggers
    triggerToast(`Added ${quantity}x "${product.name}${variant ? ` (${variant.name})` : ''}" directly to cart.`, product.image);
    
    // Animated slide open of cart to guarantee visual feedback
    setTimeout(() => {
      setIsCartOpen(true);
    }, 600);
  };

  const updateCartQuantity = (index: number, delta: number) => {
    let updatedCart = [...cart];
    updatedCart[index].quantity += delta;
    if (updatedCart[index].quantity <= 0) {
      updatedCart.splice(index, 1);
      triggerToast('Item removed from shopping bag.');
    }
    setCart(updatedCart);
    saveCartToStorage(updatedCart);
  };

  const removeCartItem = (index: number) => {
    let updatedCart = [...cart];
    triggerToast(`Removed "${updatedCart[index].product.name}" from shopping bag.`);
    updatedCart.splice(index, 1);
    setCart(updatedCart);
    saveCartToStorage(updatedCart);
  };

  // --- TRAX LOGISTICS SIMULATED ORDER TRACKER ---
  const handleTrackOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingNumber.trim()) {
      setTrackingStatus({ error: 'Please enter a valid order reference format (e.g. MD-2026-9812)' });
      return;
    }

    const cleaned = trackingNumber.trim().toUpperCase();
    
    // Custom seed data or random but gorgeous responsive updates
    if (cleaned === 'MD-DEMO-1') {
      setTrackingStatus({
        orderId: 'MD-DEMO-1',
        customer: 'Asim Khan (Gulberg III, Lahore)',
        status: 'Delivered',
        carrier: 'Trax Courier Logistics',
        trackingId: 'TRX-98218128-LHR',
        steps: [
          { name: 'Order Approved & Gallery Secured', date: 'June 15, 2026 10:00 AM', completed: true },
          { name: 'Dispatched from Lahore Circular Road Warehouse', date: 'June 15, 2026 02:30 PM', completed: true },
          { name: 'Arrived at In-Transit Hub Facility', date: 'June 16, 2026 09:15 AM', completed: true },
          { name: 'Delivered and Signed — Safe Dropped with Concierge', date: 'June 17, 2026 04:45 PM', completed: true }
        ]
      });
    } else {
      // Standard dynamic generator based on user input
      setTrackingStatus({
        orderId: cleaned,
        customer: 'Premium Customer (Home Delivery, Pakistan)',
        status: 'In Transit',
        carrier: 'Call Courier Worldwide',
        trackingId: `CC-${Math.floor(100000 + Math.random() * 900000)}-PK`,
        steps: [
          { name: 'Order Authenticated & Quality Control Check', date: 'June 17, 2026 11:15 AM', completed: true },
          { name: 'Prepared and Boxed with Silk Ribbons', date: 'June 18, 2026 08:30 AM', completed: true },
          { name: 'Sorted at Central Lahore Circular Road Hub', date: 'June 18, 2026 01:20 PM', completed: true },
          { name: 'Out for Courier Premium Secured Transit', date: 'Pending Courier Scan', completed: false }
        ]
      });
    }
  };

  // --- CAROUSEL AUTOMATED ROTATION (Trending Now) ---
  React.useEffect(() => {
    if (isCarouselHovered) return;
    const interval = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % PRODUCTS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isCarouselHovered]);

  // --- WHATSAPP REDIRECT FORMATTING ---
  const initiateWhatsAppCheckout = () => {
    if (cart.length === 0) {
      triggerToast('Your shopping cart is currently empty.');
      return;
    }

    const subtotal = cart.reduce((total, item) => {
      const price = item.selectedVariant ? item.selectedVariant.price : item.product.price;
      return total + (price * item.quantity);
    }, 0);

    let message = `*Marina's Decor — Pakistan Premium Checkout Order*\n`;
    message += `===================================\n`;
    message += `Hello! I would like to purchase the following custom luxury items:\n\n`;

    cart.forEach((item, index) => {
      const name = item.product.name;
      const variantText = item.selectedVariant ? ` (${item.selectedVariant.name})` : '';
      const itemPrice = item.selectedVariant ? item.selectedVariant.price : item.product.price;
      message += `${index + 1}. *${name}${variantText}*\n`;
      message += `   Qty: ${item.quantity}  |  Price: ₨ ${itemPrice.toLocaleString()} each\n`;
      message += `   Subtotal: ₨ ${(itemPrice * item.quantity).toLocaleString()}\n\n`;
    });

    message += `===================================\n`;
    message += `*Total Order Value:* ₨ ${subtotal.toLocaleString()}\n`;
    message += `*National Delivery:* FREE NATIONWIDE SHIPPING (₨ 0)\n\n`;
    message += `Please confirm availability for delivery to my address. Thank you!`;

    const encodedText = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/923104323200?text=${encodedText}`;
    
    // Open in new tab style safely
    window.open(whatsappUrl, '_blank');
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) {
      return;
    }
    setNewsletterSubscribed(true);
    triggerToast('Thank you! Welcome to the Marina’s Elite circle.');
  };

  // Calculate order subtotal
  const orderSubtotal = cart.reduce((acc, item) => {
    const itemPrice = item.selectedVariant ? item.selectedVariant.price : item.product.price;
    return acc + (itemPrice * item.quantity);
  }, 0);

  // Filtered products on Search
  const filteredSearchProducts = PRODUCTS.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative min-h-screen selection:bg-[#C9A96E]/30 selection:text-[#1A1A1A] bg-[#FCFBFA]" id="top">
      
      {/* ================= SECTION 1: ANNOUNCEMENT BAR ================= */}
      <motion.div 
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="sticky top-0 z-50 bg-[#2C2C2C] text-[#C9A96E] font-mono text-[11px] tracking-[3px] py-2.5 px-4 flex justify-between items-center select-none border-b border-[#C9A96E]/20"
        id="announcement-bar"
      >
        <div className="w-full text-center uppercase text-xs font-semibold">
          FREE DELIVERY ALL ACROSS PAKISTAN — NO MINIMUM ORDER
        </div>
        <button 
          onClick={() => setIsTrackOpen(true)}
          className="hidden md:flex items-center gap-1.5 hover:text-white transition-colors uppercase pr-4 shrink-0 hover:underline underline-offset-4 cursor-pointer"
          id="btn-announcement-track"
        >
          <Truck className="w-3.5 h-3.5 text-[#C9A96E]" />
          Track Order
        </button>
      </motion.div>

      {/* ================= SECTION 2: NAVIGATION HEADER ================= */}
      <header 
        className="sticky top-[38px] z-40 bg-white/90 backdrop-blur-md border-b border-gray-100 transition-all duration-300"
        id="navigation-header"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex justify-between items-center">
          
          {/* Logo Brand Title */}
          <div className="flex flex-col select-none cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <span className="font-serif text-2xl md:text-[28px] tracking-[1.5px] font-medium text-[#2C2C2C] leading-none">Marina&apos;s</span>
            <div className="w-full h-[1px] bg-[#C9A96E] my-1"></div>
            <span className="text-[9px] md:text-[10px] tracking-[5px] uppercase font-sans text-stone-500 text-center leading-none">DECOR</span>
          </div>

          {/* Center Links (Desktop only) */}
          <nav className="hidden lg:flex items-center space-x-8 text-sm uppercase tracking-widest font-medium text-[#1A1A1A]" id="nav-desktop">
            <a href="#top" className="relative py-2 group hover:text-[#C9A96E] transition-colors">
              Home
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#C9A96E] group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#shop-anchor" onClick={() => setCategoryFilter('all')} className="relative py-2 group hover:text-[#C9A96E] transition-colors">
              Shop All
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#C9A96E] group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#shop-anchor" onClick={() => setCategoryFilter('decor')} className="relative py-2 group hover:text-[#C9A96E] transition-colors">
              Home Decor
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#C9A96E] group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#shop-by-categories" className="relative py-2 group hover:text-[#C9A96E] transition-colors">
              Kitchen & Dining
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#C9A96E] group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#story-anchor" className="relative py-2 group hover:text-[#C9A96E] transition-colors">
              Bed & Bath
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#C9A96E] group-hover:w-full transition-all duration-300"></span>
            </a>
            <button onClick={() => setIsTrackOpen(true)} className="relative py-2 group hover:text-[#C9A96E] transition-colors uppercase tracking-widest text-left cursor-pointer font-medium">
              Track Order
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#C9A96E] group-hover:w-full transition-all duration-300"></span>
            </button>
          </nav>

          {/* Right Icons Row */}
          <div className="flex items-center space-x-2.5 md:space-x-4">
            
            {/* Search Icon Click */}
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-[#2C2C2C] hover:text-[#C9A96E] transition-colors cursor-pointer"
              aria-label="Search"
              id="icon-search-trigger"
            >
              <Search className="w-5 h-5 pointer-events-none" />
            </button>

            {/* Wishlist toggle drawer */}
            <button 
              onClick={() => setIsWishlistOpen(true)}
              className="p-2 text-[#2C2C2C] hover:text-[#C9A96E] transition-colors relative cursor-pointer"
              aria-label="Saved Gallery"
              id="icon-wishlist-trigger"
            >
              <Heart className="w-5 h-5 pointer-events-none" />
              {wishlist.length > 0 && (
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-0.5 -right-0.5 bg-[#C9A96E] text-white text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold"
                >
                  {wishlist.length}
                </motion.div>
              )}
            </button>

            {/* Cart Slide-in click button */}
            <button 
              onClick={() => setIsCartOpen(true)}
              className="p-2 text-[#2C2C2C] hover:text-[#C9A96E] transition-colors relative cursor-pointer"
              aria-label="Shopping Cart"
              id="icon-cart-trigger"
            >
              <ShoppingBag className="w-5 h-5 pointer-events-none" />
              {cart.length > 0 && (
                <motion.div 
                  key={cart.length}
                  initial={{ scale: 0.6 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-0.5 -right-0.5 bg-[#8B2635] text-white text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold"
                >
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </motion.div>
              )}
            </button>

            {/* Mobile Hamburger toggle */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-[#2C2C2C] hover:text-[#C9A96E] transition-colors cursor-pointer"
              aria-label="Open Mobile Menu"
              id="mobile-hamburger"
            >
              <Menu className="w-6 h-6" />
            </button>

          </div>

        </div>
      </header>

      {/* ================= SECTION 3: HERO SECTION ================= */}
      <section 
        className="relative h-[90vh] md:h-screen min-h-[500px] flex items-center justify-start overflow-hidden select-none"
        id="hero-section"
      >
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1920&q=80" 
            alt="Marina's Lifestyle Ambient Space"
            fill
            priority
            className="object-cover scale-102 contrast-[1.05]"
            referrerPolicy="no-referrer"
          />
          {/* Rich Ambient Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-black/30 to-transparent"></div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-start text-white">
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#C9A96E] font-mono text-xs md:text-sm tracking-[5px] uppercase mb-4"
          >
            NEW COLLECTION 2026
          </motion.span>

          <motion.h1 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-serif text-3xl md:text-5xl lg:text-[62px] font-normal leading-[1.1] max-w-2xl mb-6 tracking-wide"
          >
            Transform Your Home with Unique Home Decor in Pakistan
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="text-stone-300 text-sm md:text-lg max-w-lg mb-8 md:mb-10 font-sans tracking-wide leading-relaxed"
          >
            Curated elegance, comfort, and functionality — designed to inspire every corner of your living space with Lahore’s premier luxury brand.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-wrap gap-4 items-center"
          >
            <a 
              href="#shop-anchor"
              className="bg-[#C9A96E] text-[#1A1A1A] font-semibold text-xs md:text-sm px-8 py-4 uppercase tracking-[2px] transition-all hover:bg-white hover:text-[#2C2C2C] hover:scale-102 hover:shadow-xl duration-300 rounded-sm"
              id="hero-cta-explore"
            >
              Explore Collection
            </a>
            
            {/* Custom Lookbook click mechanism */}
            <button 
              onClick={() => {
                const clock = PRODUCTS.find(p => p.id === 'p6');
                if (clock) {
                  setLookbookProduct(clock);
                }
              }}
              className="group text-stone-100 hover:text-[#C9A96E] text-xs md:text-sm uppercase tracking-[2px] font-semibold flex items-center gap-1 py-3 transition-colors cursor-pointer border-b border-transparent hover:border-[#C9A96E]"
              id="hero-cta-lookbook"
            >
              View Interactive Lookbook <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
            </button>
          </motion.div>
        </div>

        {/* Scroll Indicator bouncing gold node */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:block">
          <motion.a 
            href="#shop-by-categories"
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-2 text-[#C9A96E] group"
          >
            <span className="text-[10px] uppercase font-mono tracking-[4px]">Discover</span>
            <div className="w-[1.5px] h-10 bg-[#C9A96E] relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1/2 bg-white animate-bounce"></div>
            </div>
          </motion.a>
        </div>
      </section>

      {/* ================= SECTION 4: SHOP BY CATEGORIES ================= */}
      <section 
        className="max-w-7xl mx-auto px-6 py-20 md:py-28" 
        id="shop-by-categories"
      >
        <div className="text-center mb-16 md:mb-20">
          <h2 className="font-serif text-3xl md:text-4.5xl text-[#2C2C2C] tracking-wide mb-3">Shop By Categories</h2>
          <div className="w-16 h-[2px] bg-[#C9A96E] mx-auto mb-4"></div>
          <p className="text-stone-500 text-sm md:text-base font-sans tracking-wide">Discover premium pieces that blend traditional elegance with modern utility.</p>
        </div>

        {/* Dynamic Category Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 select-none" id="category-bento-grid">
          
          {[
            {
              title: "Home Decor",
              image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80",
              slug: "decor",
              count: "4 Products"
            },
            {
              title: "Kitchen & Dining",
              image: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=800&q=80",
              slug: "kitchen",
              count: "Curated Set"
            },
            {
              title: "Bed & Bath",
              image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80",
              slug: "bed",
              count: "Premium Linens"
            },
            {
              title: "Shop All",
              image: "https://images.unsplash.com/photo-1615876234886-fd9a39fda97f?auto=format&fit=crop&w=800&q=80",
              slug: "all",
              count: "Discover All"
            }
          ].map((cat, i) => (
            <a 
              key={i}
              href="#shop-anchor"
              onClick={() => setCategoryFilter(cat.slug as any)}
              className="relative group block h-80 overflow-hidden cursor-pointer rounded-sm border border-stone-100"
            >
              <Image 
                src={cat.image} 
                alt={cat.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-95"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/35 transition-colors duration-300"></div>
              
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <span className="text-[10px] font-mono tracking-[4px] text-[#C9A96E] uppercase mb-1.5">{cat.count}</span>
                <h3 className="font-serif text-xl md:text-2xl font-light tracking-wide">{cat.title}</h3>
                
                <span className="opacity-0 group-hover:opacity-100 text-xs text-[#C9A96E] font-semibold tracking-[3px] uppercase mt-4 transition-all duration-300">
                  LET&apos;S SHOP
                </span>
              </div>
            </a>
          ))}

        </div>
      </section>

      {/* ================= SECTION 5: BRAND STORY / TRUST SECTION ================= */}
      <section 
        className="w-full bg-[#F5F0E8] py-16 md:py-24" 
        id="story-anchor"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Large Editorial Image with gold badge */}
          <div className="relative h-[480px] lg:h-[580px] rounded-sm overflow-hidden" id="story-gallery">
            <Image 
              src="https://images.unsplash.com/photo-1615876234886-fd9a39fda97f?auto=format&fit=crop&w=1000&q=80" 
              alt="Marina's Decor Editorial Style Story" 
              fill
              className="object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-[#2C2C2C]/10"></div>
            
            <div className="absolute bottom-6 right-6 bg-[#2C2C2C] text-white p-6 md:p-8 max-w-[280px]">
              <p className="font-mono text-[#C9A96E] text-[10px] tracking-[4px] uppercase mb-2">LIMITED LAUNCH EDITION</p>
              <h4 className="font-serif text-lg text-stone-100">Every design choice begins with a heritage story.</h4>
            </div>
          </div>

          {/* Right Brand Message & Trust Cards */}
          <div className="flex flex-col justify-center">
            <span className="text-[#C9A96E] font-mono text-xs tracking-[5px] uppercase mb-3">OUR HERITAGE PHILOSOPHY</span>
            <h2 className="font-serif text-3xl md:text-4.5xl text-[#2C2C2C] tracking-tight leading-[1.15] mb-6">
              Shop Home Decor Online in Pakistan — Hassle-Free & Secure
            </h2>
            
            <p className="text-stone-700 text-sm md:text-base tracking-wide leading-relaxed mb-8">
              At Marina&apos;s Decor, we believe your home should be a direct reflection of your personality and style. Based in Pakistan, we offer a curated gallery of home decor items that seamlessly blend classical elegance, warmth, and daily functionality. Whether you are revamping your drawing room, adding soft ambient lighting, or designing functional kitchen zones, our exclusive premium range is sculpted to inspire.
            </p>

            <div className="w-full h-[1px] bg-stone-300 mb-8"></div>

            {/* Three Trust Badges in elegant column/grid */}
            <div className="space-y-6" id="trust-badges-flow">
              
              <div className="flex items-start shrink-0 gap-4">
                <div className="p-3 bg-white text-[#C9A96E] rounded-sm transform group-hover:scale-105 duration-300">
                  <Truck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-stone-900 font-serif font-medium text-lg leading-snug">Nationwide Free Shipping</h4>
                  <p className="text-stone-500 text-xs md:text-sm tracking-wide mt-1">Free secure courier shipping on all Pakistan orders, direct from our Lahore hub.</p>
                </div>
              </div>

              <div className="flex items-start shrink-0 gap-4">
                <div className="p-3 bg-white text-[#C9A96E] rounded-sm">
                  <Headphones className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-stone-900 font-serif font-medium text-lg leading-snug">24/7 Dedicated Client Relations</h4>
                  <p className="text-stone-500 text-xs md:text-sm tracking-wide mt-1">Speak directly with our designers and service agents over WhatsApp +92 310 4323200 anytime.</p>
                </div>
              </div>

              <div className="flex items-start shrink-0 gap-4">
                <div className="p-3 bg-white text-[#C9A96E] rounded-sm">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-stone-900 font-serif font-medium text-lg leading-snug">Worry-Free Quality Guarantee</h4>
                  <p className="text-stone-500 text-xs md:text-sm tracking-wide mt-1">Love every item or secure an easy 7-day hassle-free money back return.</p>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ================= SECTION 6: FEATURED PRODUCTS ================= */}
      <section 
        className="max-w-7xl mx-auto px-6 py-20 md:py-28"
        id="shop-anchor"
      >
        <div className="text-center mb-16">
          <span className="text-[#C9A96E] font-mono text-xs tracking-[5px] uppercase mb-2 block">CRAFTED ACCENTS</span>
          <h2 className="font-serif text-3xl md:text-4.5xl text-[#2C2C2C] tracking-wide mb-3">Featured Masterpieces</h2>
          <div className="w-16 h-[2px] bg-[#C9A96E] mx-auto mb-4"></div>
          
          {/* Interactive filter tabs */}
          <div className="flex justify-center space-x-6 mt-8 font-mono text-xs tracking-widest uppercase">
            {(['all', 'decor', 'kitchen', 'bed'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`pb-1 border-b-2 transition-all cursor-pointer ${
                  categoryFilter === cat 
                    ? 'border-[#C9A96E] text-[#1A1A1A] font-semibold' 
                    : 'border-transparent text-gray-400 hover:text-[#1A1A1A]'
                }`}
              >
                {cat === 'all' ? 'Shop All' : cat === 'decor' ? 'Home Decor' : cat === 'kitchen' ? 'Kitchen' : 'Bed & Bath'}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8" id="featured-products-grid">
          {PRODUCTS
            .filter(p => categoryFilter === 'all' || p.category === categoryFilter)
            .slice(0, 4)
            .map((p) => {
              const isWishlisted = wishlist.includes(p.id);
              return (
                <div 
                  key={p.id}
                  className="group relative flex flex-col bg-white border border-gray-100 rounded-sm overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  {/* Badge & Quick Action Row */}
                  <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 pointer-events-none">
                    {p.badge && (
                      <span className="bg-[#8B2635] text-white text-[10px] font-mono uppercase px-2 py-1 tracking-wider leading-none weighted">
                        {p.badge}
                      </span>
                    )}
                  </div>
                  
                  <div className="absolute top-3 right-3 z-15">
                    <button
                      onClick={() => toggleWishlist(p.id)}
                      className="p-2 bg-white/80 hover:bg-white rounded-full text-stone-700 hover:text-[#8B2635] transition-all shadow-md focus:outline-none cursor-pointer"
                      aria-label="Add to Wishlist"
                    >
                      <Heart className={`w-4.5 h-4.5 ${isWishlisted ? 'fill-[#8B2635] text-[#8B2635]' : ''}`} />
                    </button>
                  </div>

                  {/* Image and Quick view hover block */}
                  <div className="relative h-80 overflow-hidden bg-stone-50 cursor-pointer" onClick={() => setQuickViewProduct(p)}>
                    <Image 
                      src={p.image} 
                      alt={p.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/25 transition-all duration-300"></div>

                    {/* Quick View Button */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="bg-white/90 backdrop-blur-md text-[#1A1A1A] font-mono text-[10px] tracking-[3px] uppercase px-5 py-3 hover:bg-[#C9A96E] hover:text-[#1A1A1A] transition-all duration-300 rounded-xs shadow-md">
                        QUICK GALLERY VIEW
                      </span>
                    </div>
                  </div>

                  {/* Product Details info panel */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-serif text-lg text-[#2C2C2C] mb-1.5 line-clamp-1 group-hover:text-[#C9A96E] transition-colors">
                        {p.name}
                      </h3>
                      <p className="text-gray-400 text-[11px] uppercase tracking-widest mb-3 select-none">SKU: {p.sku}</p>
                      
                      <div className="flex items-center gap-2 mb-4">
                        {p.originalPrice && (
                          <span className="text-stone-400 line-through text-sm">
                            ₨ {p.originalPrice.toLocaleString()}
                          </span>
                        )}
                        <span className="text-[#8B2635] font-semibold text-lg">
                          ₨ {p.price.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Action buttons list */}
                    <div className="space-y-2 mt-2">
                      <button
                        onClick={() => addToCart(p, 1)}
                        className="w-full bg-[#2C2C2C] hover:bg-[#C9A96E] hover:text-[#1A1A1A] text-white font-mono text-[10px] tracking-widest uppercase py-3 transition-colors duration-300 rounded-sm cursor-pointer"
                        id={`btn-add-cart-${p.id}`}
                      >
                        ADD TO GALLEY BAG
                      </button>
                      
                      <button
                        onClick={() => {
                          addToCart(p, 1);
                          setIsCartOpen(true);
                        }}
                        className="w-full bg-white hover:bg-[#F5F0E8] text-[#1A1A1A] border border-[#2C2C2C] font-mono text-[10px] tracking-widest uppercase py-3 transition-colors duration-300 rounded-sm cursor-pointer"
                        id={`btn-buy-now-${p.id}`}
                      >
                        SECURE BUY NOW
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
        </div>
      </section>

      {/* ================= SECTION 7: TRENDING NOW / POPULAR THIS WEEK ================= */}
      <section 
        className="w-full bg-white border-y border-stone-100 py-20"
        id="trending-section"
      >
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-[#C9A96E] font-mono text-xs tracking-[5px] uppercase mb-2 block">MOST COVETED PIECES</span>
              <h2 className="font-serif text-3xl md:text-4xl text-[#2C2C2C]">Popular This Week</h2>
            </div>
            
            {/* Custom Carousel Arrows */}
            <div className="flex gap-2.5 mt-4 md:mt-0 select-none">
              <button 
                onClick={() => setCarouselIndex((prev) => (prev - 1 + PRODUCTS.length) % PRODUCTS.length)}
                className="w-10 h-10 rounded-full border border-stone-200 hover:border-[#C9A96E] hover:text-[#C9A96E] flex items-center justify-center text-[#2C2C2C] transition-all cursor-pointer"
                aria-label="Previous"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setCarouselIndex((prev) => (prev + 1) % PRODUCTS.length)}
                className="w-10 h-10 rounded-full border border-stone-200 hover:border-[#C9A96E] hover:text-[#C9A96E] flex items-center justify-center text-[#2C2C2C] transition-all cursor-pointer"
                aria-label="Next"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Carousel Showcase window */}
          <div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            onMouseEnter={() => setIsCarouselHovered(true)}
            onMouseLeave={() => setIsCarouselHovered(false)}
            id="trending-carousel-wrapper"
          >
            {/* Shift displayed products dynamically based on index */}
            {Array.from({ length: 4 }).map((_, i) => {
              const pIndex = (carouselIndex + i) % PRODUCTS.length;
              const p = PRODUCTS[pIndex];
              const isWishlisted = wishlist.includes(p.id);

              return (
                <motion.div 
                  key={p.id}
                  layout
                  className="group relative flex flex-col bg-[#FCFBFA] border border-stone-100 rounded-sm overflow-hidden hover:shadow-lg transition-all duration-300"
                >
                  
                  {/* Badge & OOS handler */}
                  <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 pointer-events-none">
                    {p.isOutOfStock ? (
                      <span className="bg-[#2C2C2C] text-white text-[9px] font-mono uppercase px-2.5 py-1 tracking-wider leading-none">
                        OUT OF STOCK
                      </span>
                    ) : p.badge ? (
                      <span className="bg-[#8B2635] text-white text-[9px] font-mono uppercase px-2.5 py-1 tracking-wider leading-none uppercase">
                        {p.badge}
                      </span>
                    ) : null}
                  </div>

                  <div className="absolute top-3 right-3 z-15">
                    <button
                      onClick={() => toggleWishlist(p.id)}
                      className="p-2 bg-white/80 hover:bg-white rounded-full text-stone-700 hover:text-[#8B2635] transition-all cursor-pointer shadow-sm"
                    >
                      <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#8B2635] text-[#8B2635]' : ''}`} />
                    </button>
                  </div>

                  <div className="relative h-72 overflow-hidden bg-stone-50 cursor-pointer" onClick={() => setQuickViewProduct(p)}>
                    <Image 
                      src={p.image} 
                      alt={p.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-black/15 transition-all duration-300"></div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-serif text-base text-[#2C2C2C] mb-1.5 line-clamp-1">{p.name}</h3>
                      
                      <div className="flex items-center gap-2 mb-3">
                        {p.priceRange ? (
                          <span className="text-[#8B2635] font-semibold text-sm">
                            ₨ {p.priceRange.min.toLocaleString()} – ₨ {p.priceRange.max.toLocaleString()}
                          </span>
                        ) : (
                          <>
                            {p.originalPrice && (
                              <span className="text-stone-400 line-through text-xs">
                                ₨ {p.originalPrice.toLocaleString()}
                              </span>
                            )}
                            <span className="text-[#8B2635] font-semibold text-sm">
                              ₨ {p.price.toLocaleString()}
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="pt-2">
                      {p.isOutOfStock ? (
                        <button
                          disabled
                          className="w-full bg-stone-200 text-stone-500 font-mono text-[9px] tracking-widest uppercase py-3 rounded-sm cursor-not-allowed text-center"
                        >
                          OUT OF STOCK
                        </button>
                      ) : p.hasVariants ? (
                        <button
                          onClick={() => {
                            setSelectedVariant(p.variants ? p.variants[0] : null);
                            setQuickViewProduct(p);
                          }}
                          className="w-full bg-[#C9A96E]/90 hover:bg-[#C9A96E] text-stone-950 font-mono text-[9px] tracking-widest uppercase py-3 transition-colors duration-300 rounded-sm cursor-pointer"
                        >
                          SELECT VARIANT
                        </button>
                      ) : (
                        <button
                          onClick={() => addToCart(p, 1)}
                          className="w-full bg-[#2C2C2C] hover:bg-[#C9A96E] hover:text-[#1A1A1A] text-white font-mono text-[9px] tracking-widest uppercase py-3 transition-colors duration-300 rounded-sm cursor-pointer"
                        >
                          ADD TO CART
                        </button>
                      )}
                    </div>

                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ================= SECTION 8: INSTAGRAM / SOCIAL PROOF ================= */}
      <section 
        className="w-full bg-[#2C2C2C] py-20 text-white select-none overflow-hidden"
        id="instagram-wall"
      >
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="text-[#C9A96E] font-mono text-xs tracking-[4px] uppercase mb-2 block">STAY UP TO DATE</span>
          <h2 className="font-serif text-3xl md:text-4.5xl tracking-wide mb-2 text-white">Follow Our Living Story</h2>
          <a 
            href="https://www.instagram.com/marinasdecor.pk" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[#C9A96E] hover:text-white transition-colors tracking-widest font-mono text-sm md:text-base leading-relaxed mb-10 inline-block underline underline-offset-4"
          >
            @marinasdecor.pk
          </a>

          {/* Insta layout grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10" id="insta-feed-grid">
            {INSTAGRAM_POSTS.map((post, index) => (
              <a 
                key={post.id}
                href="https://www.instagram.com/marinasdecor.pk"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-square overflow-hidden bg-stone-900 block rounded-sm border border-stone-800"
              >
                <Image 
                  src={post.image} 
                  alt="Fine home living styled by Marina's"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500 brightness-90"
                  referrerPolicy="no-referrer"
                />
                
                {/* Accent overlay with Instagram Logo */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="flex flex-col items-center gap-2">
                    <Instagram className="w-8 h-8 text-[#C9A96E]" />
                    <span className="text-[10px] uppercase font-mono tracking-[2px] text-stone-200">View Gallery</span>
                  </div>
                </div>
              </a>
            ))}
          </div>

          <a 
            href="https://www.instagram.com/marinasdecor.pk"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border border-[#C9A96E] text-[#C9A96E] hover:bg-[#C9A96E] hover:text-[#2C2C2C] font-mono text-xs tracking-widest uppercase py-4 px-8 transition-colors duration-300 rounded-sm"
          >
            FOLLOW @MARINASDECOR
          </a>
        </div>
      </section>

      {/* ================= SECTION 9: NEWSLETTER SECTION ================= */}
      <section 
        className="w-full bg-[#F5F0E8] py-16 md:py-24"
        id="newsletter-section"
      >
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-5">
            <h2 className="font-serif text-3xl md:text-3.5xl text-[#2C2C2C] tracking-wide mb-3">Join the Inner Circle</h2>
            <p className="text-stone-600 text-sm md:text-base leading-relaxed tracking-wide">
              Be the first to discover new curated collections, exclusive catalog capsule drops, and custom interior styling inspiration delivered directly to your inbox.
            </p>
          </div>

          <div className="lg:col-span-7 bg-white p-8 md:p-10 rounded-sm shadow-sm" id="newsletter-form-container">
            {newsletterSubscribed ? (
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex flex-col items-center text-center py-6"
              >
                <div className="w-12 h-12 bg-[#C9A96E]/20 text-[#C9A96E] rounded-full flex items-center justify-center mb-4">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-[#2C2C2C] mb-1">You Are Subscribed</h3>
                <p className="text-stone-500 text-xs md:text-sm tracking-wide">Thank you for joining our private styling mailing list.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                <div className="flex flex-col md:flex-row gap-3">
                  <input 
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email catalog address"
                    className="flex-1 bg-[#FCFBFA] border-b border-stone-300 py-3 px-4 focus:outline-none focus:border-[#C9A96E] text-sm text-[#1A1A1A] placeholder-stone-400 font-sans tracking-wide"
                  />
                  <button 
                    type="submit"
                    className="bg-[#2C2C2C] hover:bg-[#C9A96E] hover:text-[#1A1A1A] text-white font-mono text-xs tracking-wider uppercase py-3.5 px-8 transition-colors duration-300 rounded-sm font-semibold shrink-0"
                  >
                    Subscribe
                  </button>
                </div>
                <p className="text-stone-400 text-[11px] font-sans">
                  We respect your privacy. Opt-out from premium newsletters at any single click.
                </p>
              </form>
            )}
          </div>

        </div>
      </section>

      {/* ================= SECTION 10: FOOTER ================= */}
      <footer 
        className="bg-[#1A1A1A] text-stone-300 pt-20 pb-16 border-t border-stone-800"
        id="footer-section"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex flex-col select-none cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <span className="font-serif text-3xl tracking-[1.5px] font-medium text-[#C9A96E] leading-none">Marina&apos;s</span>
              <div className="w-28 h-[1px] bg-[#C9A96E] my-1.5"></div>
              <span className="text-[10px] tracking-[5px] uppercase font-sans text-stone-400 leading-none">DECOR</span>
            </div>

            <p className="text-stone-400 text-xs md:text-sm tracking-wide leading-relaxed">
              Marina&apos;s Decor was founded on the mantra that home decorating should be fun, easy, and deeply expressive of your identity. All of our luxury products are styled by industry experts and heavily tested for lasting structural quality.
            </p>

            <div className="space-y-2 text-xs md:text-sm font-mono tracking-wide">
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#C9A96E] shrink-0" />
                <span>Warehouse: 13 Main Circular Road, Lahore</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C9A96E]" />
                <a href="tel:+923104323200" className="hover:text-[#C9A96E] transition-colors">
                  Support: +92 310 4323200
                </a>
              </p>
            </div>

            <div className="flex space-x-4">
              {['Facebook', 'Instagram', 'WhatsApp', 'Pinterest'].map((social, i) => (
                <a 
                  key={i} 
                  href="https://wa.me/923104323200"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-stone-800 hover:bg-[#C9A96E] text-[#C9A96E] hover:text-[#1A1A1A] flex items-center justify-center transition-all hover:scale-105"
                  aria-label={social}
                >
                  <Sparkles className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2.5 lg:pl-8 space-y-4">
            <h4 className="text-[#C9A96E] font-mono text-[11px] tracking-[3px] uppercase font-semibold">QUICK LINKS</h4>
            <ul className="space-y-2 text-xs md:text-sm">
              <li><a href="#top" className="hover:text-[#C9A96E] transition-all hover:translate-x-1 inline-block">Home</a></li>
              <li><a href="#shop-anchor" className="hover:text-[#C9A96E] transition-all hover:translate-x-1 inline-block">Shop All</a></li>
              <li><a href="#shop-by-categories" className="hover:text-[#C9A96E] transition-all hover:translate-x-1 inline-block">Tableware</a></li>
              <li><a href="#story-anchor" className="hover:text-[#C9A96E] transition-all hover:translate-x-1 inline-block">Our Process</a></li>
              <li><a href="tel:+923104323200" className="hover:text-[#C9A96E] transition-all hover:translate-x-1 inline-block">Contact Us</a></li>
              <li><button onClick={() => setIsTrackOpen(true)} className="hover:text-[#C9A96E] transition-all hover:translate-x-1 inline-block text-left cursor-pointer">Shipping Policy</button></li>
            </ul>
          </div>

          {/* Column 3: Customer Care */}
          <div className="lg:col-span-2.5 space-y-4">
            <h4 className="text-[#C9A96E] font-mono text-[11px] tracking-[3px] uppercase font-semibold">CUSTOMER SERVICE</h4>
            <ul className="space-y-2 text-xs md:text-sm">
              <li><button onClick={() => setIsTrackOpen(true)} className="hover:text-[#C9A96E] transition-all hover:translate-x-1 inline-block text-left cursor-pointer">Track Your Package</button></li>
              <li><a href="tel:+923104323200" className="hover:text-[#C9A96E] transition-all hover:translate-x-1 inline-block">Size Guidelines</a></li>
              <li><a href="tel:+923104323200" className="hover:text-[#C9A96E] transition-all hover:translate-x-1 inline-block">F.A.Q. Portal</a></li>
              <li><a href="tel:+923104323200" className="hover:text-[#C9A96E] transition-all hover:translate-x-1 inline-block">Returns & Returns Exchange</a></li>
              <li><a href="tel:+923104323200" className="hover:text-[#C9A96E] transition-all hover:translate-x-1 inline-block">Warranty Info</a></li>
            </ul>
          </div>

          {/* Column 4: Premium catalog sign */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-[#C9A96E] font-mono text-[11px] tracking-[3px] uppercase font-semibold">WEEKLY CATALOGS</h4>
            <p className="text-stone-400 text-xs md:text-sm">Subscribe to receive mobile catalog updates containing limited boutique releases.</p>
            
            <form onSubmit={handleNewsletterSubmit} className="relative mt-2">
              <input 
                type="email"
                required
                placeholder="your@email.com"
                className="w-full bg-stone-800 text-white py-3 pl-4 pr-10 focus:outline-none focus:border-[#C9A96E] text-xs font-sans tracking-wide border-b border-stone-700"
              />
              <button 
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-[#C9A96E] hover:text-white transition-colors cursor-pointer"
                aria-label="Submit Mail"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>

        {/* Brand Bottom bar */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8 border-t border-stone-800 flex flex-col md:flex-row justify-between items-center text-stone-500 text-xs gap-4">
          <p>Copyright © 2026 Marina&apos;s Decor. Built beautifully for luxury shopping in Pakistan.</p>
          
          {/* Payment Badges of Pakistan */}
          <div className="flex items-center space-x-3 text-[10px] select-none font-mono">
            <span className="px-2 py-1 bg-stone-800 text-stone-200 border border-stone-700">Cash on Delivery</span>
            <span className="px-2 py-1 bg-stone-800 text-stone-100 border border-[#C9A96E]/20">EasyPaisa</span>
            <span className="px-2 py-1 bg-stone-800 text-stone-100 border border-[#C9A96E]/20">JazzCash</span>
            <span className="px-2 py-1 bg-stone-800 text-stone-300">Visa / Mastercard</span>
          </div>
        </div>
      </footer>


      {/* ================= MODAL: SEARCH OVERLAY ================= */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#1A1A1A]/95 backdrop-blur-md flex flex-col justify-start pt-24 px-6 md:px-12"
            id="search-overlay-modal"
          >
            <div className="max-w-4xl mx-auto w-full">
              <div className="flex justify-between items-center mb-10">
                <span className="font-serif text-2xl text-[#C9A96E]">Marina&apos;s Luxury Search Catalogue</span>
                <button 
                  onClick={() => setIsSearchOpen(false)}
                  className="p-2 border border-stone-600 rounded-full text-stone-400 hover:text-white hover:border-white transition-colors cursor-pointer"
                  aria-label="Close search"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Input field with automatic instant querying and keyboard Escape release handler */}
              <div className="relative border-b-2 border-[#C9A96E]/40 pb-3 mb-8">
                <input 
                  type="text"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="What luxury decor piece are you hosting today?..."
                  className="w-full bg-transparent text-white font-serif text-2xl md:text-3xl focus:outline-none placeholder-stone-600 pr-10 text-stone-100 font-light"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 text-[#C9A96E]">
                  <Search className="w-6 h-6" />
                </button>
              </div>

              {/* Popular quick-click categories */}
              <div className="flex flex-wrap items-center gap-2 mb-8 text-xs font-mono tracking-widest text-stone-400">
                <span>POPULAR SEARCH TERMS:</span>
                {['Candle Holders', 'Bookends', 'Clocks', 'Ornaments'].map((term) => (
                  <button 
                    key={term}
                    onClick={() => setSearchQuery(term)}
                    className="px-3 py-1 bg-stone-800 hover:bg-[#C9A96E] hover:text-[#1A1A1A] transition-colors rounded-sm cursor-pointer"
                  >
                    {term}
                  </button>
                ))}
              </div>

              {/* Result Grid with direct click triggers */}
              <div className="max-h-[50vh] overflow-y-auto pr-2 space-y-4 custom-scrollbar">
                {searchQuery ? (
                  filteredSearchProducts.length > 0 ? (
                    filteredSearchProducts.map((p) => (
                      <div 
                        key={p.id}
                        className="flex items-center gap-4 bg-stone-900 p-4 border border-stone-800 hover:border-[#C9A96E]/40 transition-colors rounded-sm"
                      >
                        <div className="relative w-16 h-16 shrink-0 aspect-square overflow-hidden bg-stone-800">
                          <Image src={p.image} alt={p.name} fill className="object-cover" referrerPolicy="no-referrer" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-serif text-base text-stone-100">{p.name}</h4>
                          <p className="text-[#C9A96E] font-mono text-xs mt-0.5">₨ {p.price.toLocaleString()}</p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setSelectedVariant(null);
                              setQuickViewProduct(p);
                              setIsSearchOpen(false);
                            }}
                            className="px-3 py-2 border border-stone-600 text-stone-400 hover:text-white hover:border-white text-[10px] font-mono tracking-wider uppercase rounded-sm cursor-pointer"
                          >
                            VIEW
                          </button>
                          <button
                            onClick={() => {
                              addToCart(p, 1);
                              setIsSearchOpen(false);
                            }}
                            className="px-3 py-2 bg-[#C9A96E] text-[#1A1A1A] text-[10px] font-mono tracking-wider uppercase rounded-sm cursor-pointer hover:bg-white transition-colors"
                          >
                            ADD BAG
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-stone-500 font-mono text-sm py-4">No exclusive products found matching &quot;{searchQuery}&quot;.</p>
                  )
                ) : (
                  <p className="text-stone-500 font-mono text-sm py-4">Type above to search live catalogue...</p>
                )}
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>


      {/* ================= MODAL: SLIDE-OUT CART PANEL ================= */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 z-50 bg-black"
            />
            {/* Sidepanel */}
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.35 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-white shadow-2xl flex flex-col justify-between"
              id="shopping-cart-drawer"
            >
              {/* Header */}
              <div className="p-6 border-b border-stone-100 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-[#C9A96E]" />
                  <span className="font-serif text-lg md:text-xl font-medium text-[#2C2C2C]">
                    Your Gallery Bag ({cart.reduce((sum, item) => sum + item.quantity, 0)})
                  </span>
                </div>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="p-1 text-stone-500 hover:text-red-500 transition-colors cursor-pointer"
                  aria-label="Close cart"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Items List scroll view */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
                {cart.length > 0 ? (
                  cart.map((item, index) => {
                    const price = item.selectedVariant ? item.selectedVariant.price : item.product.price;
                    return (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        key={`${item.product.id}-${index}`}
                        className="flex gap-4 p-3 bg-stone-50 border border-stone-100 rounded-sm relative"
                      >
                        {/* Remove Cross */}
                        <button 
                          onClick={() => removeCartItem(index)}
                          className="absolute top-2 right-2 text-stone-400 hover:text-red-500 transition-colors cursor-pointer"
                          aria-label="Remove item"
                        >
                          <X className="w-4 h-4" />
                        </button>

                        <div className="relative w-20 h-20 bg-stone-100 border border-stone-200 shrink-0">
                          <Image src={item.product.image} alt={item.product.name} fill className="object-cover" referrerPolicy="no-referrer" />
                        </div>

                        <div className="flex-1">
                          <h4 className="font-serif text-sm text-stone-900 font-medium pr-4">{item.product.name}</h4>
                          {item.selectedVariant && (
                            <span className="text-[10px] font-mono uppercase bg-amber-100 text-stone-700 px-2.5 py-0.5 rounded-sm inline-block mt-1">
                              {item.selectedVariant.name}
                            </span>
                          )}
                          <p className="text-[#8B2635] font-semibold text-xs mt-2">₨ {price.toLocaleString()}</p>
                          
                          {/* Quantity control multiplier */}
                          <div className="flex items-center space-x-2 mt-3 select-none">
                            <button 
                              onClick={() => updateCartQuantity(index, -1)}
                              className="p-1 aspect-square bg-[#2C2C2C] text-white hover:bg-[#C9A96E] transition-colors rounded-sm cursor-pointer"
                              aria-label="Decrease"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-sm font-semibold px-2 w-6 text-center">{item.quantity}</span>
                            <button 
                              onClick={() => updateCartQuantity(index, 1)}
                              className="p-1 aspect-square bg-[#2C2C2C] text-white hover:bg-[#C9A96E] transition-colors rounded-sm cursor-pointer"
                              aria-label="Increase"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })
                ) : (
                  <div className="flex flex-col items-center text-center py-20 text-stone-400 space-y-4">
                    <ShoppingBag className="w-12 h-12 text-[#C9A96E]/40" />
                    <p className="font-serif text-lg">Your Gallery Bag is empty</p>
                    <p className="text-xs px-12">Browse our exclusive collections to select elements worthy of hosting.</p>
                  </div>
                )}
              </div>

              {/* Footer Subtotal & Action buttons */}
              {cart.length > 0 && (
                <div className="p-6 border-t border-stone-100 bg-[#FCFBFA] space-y-4 selection:bg-[#C9A96E]/20">
                  <div className="flex justify-between items-center text-base">
                    <span className="font-sans tracking-wide text-stone-500">Cart Subtotal:</span>
                    <span className="font-serif text-lg font-bold text-[#8B2635]">₨ {orderSubtotal.toLocaleString()}</span>
                  </div>
                  
                  <div className="text-[11px] text-stone-500 text-center uppercase tracking-wider bg-emerald-50 text-emerald-800 py-1 rounded-sm border border-emerald-200">
                    🎉 Free National Delivery Activated
                  </div>

                  {/* Place WhatsApp Order secure trigger */}
                  <button 
                    onClick={initiateWhatsAppCheckout}
                    className="w-full bg-[#2C2C2C] hover:bg-emerald-600 hover:text-white text-[#C9A96E] font-mono text-[11px] tracking-widest uppercase py-4 transition-colors duration-300 rounded-sm font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-md"
                    id="btn-cart-whatsapp-checkout"
                  >
                    <MessageSquare className="w-4 h-4 text-emerald-400 animate-pulse" />
                    Place Order via WhatsApp
                  </button>

                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="w-full text-center text-stone-500 hover:text-stone-800 text-xs font-mono tracking-widest uppercase transition-colors py-2 cursor-pointer block hover:underline"
                  >
                    Continue Shopping
                  </button>
                </div>
              )}

            </motion.div>
          </>
        )}
      </AnimatePresence>


      {/* ================= MODAL: SLIDE-OUT WISHLIST PANEL ================= */}
      <AnimatePresence>
        {isWishlistOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} exit={{ opacity: 0 }} onClick={() => setIsWishlistOpen(false)} className="fixed inset-0 z-50 bg-black" />
            <motion.div 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'tween', duration: 0.35 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-white shadow-2xl flex flex-col justify-between"
              id="wishlist-drawer"
            >
              <div className="p-6 border-b border-stone-100 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-[#8B2635]" />
                  <span className="font-serif text-lg md:text-xl font-medium text-[#2C2C2C]">Saved Gallery Pieces</span>
                </div>
                <button onClick={() => setIsWishlistOpen(false)} className="p-1 text-stone-500 hover:text-red-500 transition-colors cursor-pointer"><X className="w-5 h-5" /></button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
                {wishlist.length > 0 ? (
                  wishlist.map((id) => {
                    const p = PRODUCTS.find(item => item.id === id);
                    if (!p) return null;
                    return (
                      <div key={id} className="flex gap-4 p-3 bg-stone-50 border border-stone-100 rounded-sm relative">
                        <button 
                          onClick={() => toggleWishlist(id)}
                          className="absolute top-2 right-2 text-stone-400 hover:text-red-500 transition-colors cursor-pointer"
                        >
                          <X className="w-4 h-4" />
                        </button>

                        <div className="relative w-16 h-16 bg-stone-100 border border-stone-200 shrink-0">
                          <Image src={p.image} alt={p.name} fill className="object-cover" referrerPolicy="no-referrer" />
                        </div>

                        <div className="flex-1">
                          <h4 className="font-serif text-sm text-stone-900 font-medium pr-4">{p.name}</h4>
                          <p className="text-[#8B2635] font-semibold text-xs mt-1">₨ {p.price.toLocaleString()}</p>
                          
                          <button
                            onClick={() => {
                              addToCart(p, 1);
                              setIsWishlistOpen(false);
                            }}
                            className="text-[10px] font-mono font-medium tracking-wider uppercase text-white bg-[#C9A96E] hover:bg-[#2C2C2C] px-3 py-1.5 rounded-sm transition-colors mt-2 text-left block cursor-pointer"
                          >
                            Move to Cart
                          </button>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="flex flex-col items-center text-center py-20 text-stone-400 space-y-4">
                    <Heart className="w-12 h-12 text-[#8B2635]/40" />
                    <p className="font-serif text-lg">Your Wishlist is empty</p>
                    <p className="text-xs px-12">Heart your favorite design pieces to view and retrieve them easily.</p>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>


      {/* ================= MODAL: PRODUCT QUICK-VIEW & VARIANT SELECTOR ================= */}
      <AnimatePresence>
        {quickViewProduct && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} exit={{ opacity: 0 }} onClick={() => setQuickViewProduct(null)} className="fixed inset-0 z-50 bg-black" />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="fixed left-4 right-4 md:left-[10%] md:right-[10%] lg:left-[20%] lg:right-[20%] top-[8%] bottom-[8%] z-50 bg-white rounded-sm overflow-hidden shadow-2xl flex flex-col md:flex-row border border-[#C9A96E]/20"
              id="product-quick-view-modal"
            >
              {/* Product Close Button */}
              <button 
                onClick={() => setQuickViewProduct(null)}
                className="absolute top-4 right-4 z-20 p-2 bg-white/80 backdrop-blur-sm rounded-full text-stone-800 hover:text-red-500 hover:bg-white transition-all shadow-md cursor-pointer"
                aria-label="Close product view"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Large Image Frame banner on Left */}
              <div className="relative w-full md:w-1/2 h-64 md:h-full bg-stone-100 shrink-0">
                <Image 
                  src={quickViewProduct.image} 
                  alt={quickViewProduct.name} 
                  fill 
                  className="object-cover" 
                  referrerPolicy="no-referrer"
                />
                {quickViewProduct.badge && (
                  <span className="absolute top-4 left-4 bg-[#8B2635] text-white text-[10px] font-mono uppercase px-3 py-1.5 tracking-wider leading-none">
                    {quickViewProduct.badge}
                  </span>
                )}
              </div>

              {/* Details and selectors panel on Right */}
              <div className="flex-1 p-6 md:p-10 overflow-y-auto flex flex-col justify-between space-y-4 custom-scrollbar bg-[#FCFBFA]">
                <div>
                  <span className="text-[#C9A96E] font-mono text-[10px] tracking-[4px] uppercase mb-1 block">LIMITED BOUTIQUE</span>
                  <h3 className="font-serif text-xl md:text-2xl text-stone-900 leading-snug">{quickViewProduct.name}</h3>
                  <p className="text-stone-400 text-xs font-mono tracking-widest mt-1 mb-4 select-none">SKU: {quickViewProduct.sku}</p>
                  
                  <div className="flex items-center gap-2 mb-4">
                    {quickViewProduct.originalPrice && (
                      <span className="text-stone-400 line-through text-sm">
                        ₨ {quickViewProduct.originalPrice.toLocaleString()}
                      </span>
                    )}
                    <span className="text-[#8B2635] font-semibold text-xl">
                      ₨ {(selectedVariant ? selectedVariant.price : quickViewProduct.price).toLocaleString()}
                    </span>
                  </div>

                  <p className="text-stone-600 text-xs md:text-sm leading-relaxed tracking-wide mb-6">
                    {quickViewProduct.description}
                  </p>

                  <div className="w-full h-[1px] bg-stone-200 my-4"></div>

                  {/* Variant Selection (e.g. for Dragonfly Candleholder) */}
                  {quickViewProduct.hasVariants && quickViewProduct.variants && (
                    <div className="space-y-2 mt-4">
                      <span className="text-stone-700 font-mono text-[10px] tracking-wider uppercase block">SELECT DECOR SIZE:</span>
                      <div className="flex flex-wrap gap-2">
                        {quickViewProduct.variants.map((v) => (
                          <button
                            key={v.id}
                            onClick={() => setSelectedVariant(v)}
                            className={`px-3 py-2 text-xs font-mono tracking-wide border transition-all cursor-pointer ${
                              (selectedVariant?.id === v.id) 
                                ? 'border-[#C9A96E] bg-[#F5F0E8] text-[#1A1A1A] font-semibold shadow-sm' 
                                : 'border-stone-200 text-stone-500 hover:border-black'
                            }`}
                          >
                            {v.name} (₨ {v.price.toLocaleString()})
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Quantity selector multiplier */}
                  <div className="space-y-2 mt-4">
                    <span className="text-[#1A1A1A] font-mono text-[10px] tracking-wider uppercase block">GALLERY QTY:</span>
                    <div className="flex items-center space-x-3 select-none">
                      <button 
                        onClick={() => setQuickViewQty(prev => Math.max(1, prev - 1))}
                        className="w-8 h-8 bg-[#2C2C2C] text-white hover:bg-[#C9A96E] rounded-sm flex items-center justify-center transition-colors cursor-pointer"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="font-semibold text-sm w-8 text-center">{quickViewQty}</span>
                      <button 
                        onClick={() => setQuickViewQty(prev => prev + 1)}
                        className="w-8 h-8 bg-[#2C2C2C] text-white hover:bg-[#C9A96E] rounded-sm flex items-center justify-center transition-colors cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                </div>

                {/* Final Actions block */}
                <div className="space-y-2 pt-2 select-none">
                  <div className="text-[10px] uppercase font-mono tracking-widest text-[#C9A96E] flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5" />
                    <span>Free Delivery across Pakistan is currently active</span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        addToCart(quickViewProduct, quickViewQty, selectedVariant || undefined);
                        setQuickViewProduct(null);
                        setQuickViewQty(1);
                        setSelectedVariant(null);
                      }}
                      className="flex-1 bg-[#2C2C2C] hover:bg-[#C9A96E] hover:text-[#1A1A1A] text-white font-mono text-xs tracking-widest uppercase py-4 transition-colors duration-300 rounded-sm font-semibold cursor-pointer"
                    >
                      ADD TO GALLERY BAG
                    </button>
                    <button
                      onClick={() => {
                        addToCart(quickViewProduct, quickViewQty, selectedVariant || undefined);
                        setQuickViewProduct(null);
                        setQuickViewQty(1);
                        setSelectedVariant(null);
                        setTimeout(() => {
                          setIsCartOpen(true);
                        }, 100);
                      }}
                      className="px-6 bg-[#C9A96E] hover:bg-[#2C2C2C] hover:text-white text-stone-950 font-mono text-xs tracking-widest uppercase py-4 transition-colors duration-300 rounded-sm font-semibold cursor-pointer"
                    >
                      BUY NOW
                    </button>
                  </div>
                </div>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>


      {/* ================= MODAL: INTERACTIVE GALLERY LOOKBOOK HOTSPOTS ================= */}
      <AnimatePresence>
        {lookbookProduct && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.7 }} exit={{ opacity: 0 }} onClick={() => setLookbookProduct(null)} className="fixed inset-0 z-50 bg-black/90" />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="fixed left-4 right-4 md:left-[8%] md:right-[8%] lg:left-[15%] lg:right-[15%] top-[5%] bottom-[5%] z-50 bg-white rounded-sm overflow-hidden shadow-2xl flex flex-col"
              id="lookbook-gallery-modal"
            >
              <div className="p-4 md:p-6 border-b border-stone-100 flex justify-between items-center bg-white sticky top-0 z-10">
                <div>
                  <h3 className="font-serif text-lg md:text-xl text-[#2C2C2C] tracking-wide">Marina&apos;s Ambient Living Lookbook</h3>
                  <p className="text-stone-400 text-[10px] md:text-xs font-mono uppercase tracking-widest mt-1">Hover the gold pulsing targets to shop featured items</p>
                </div>
                <button 
                  onClick={() => setLookbookProduct(null)}
                  className="p-1 border border-stone-200 rounded-full hover:text-red-500 hover:border-red-500 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Large interactive Canvas frame */}
              <div className="flex-1 relative bg-stone-900 overflow-hidden select-none">
                <Image 
                  src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80" 
                  alt="Marina's Ambient space hotspot lookbook"
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />

                {/* Hotspot triggers overlay */}
                {LOOKBOOK_HOTSPOTS.map((spot) => (
                  <div 
                    key={spot.id}
                    style={{ left: spot.x, top: spot.y }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 group"
                  >
                    {/* Ring Pulse animate */}
                    <span className="absolute inset-0 rounded-full bg-[#C9A96E]/40 animate-ping scale-200 duration-1000"></span>
                    <button 
                      onClick={() => {
                        const target = PRODUCTS.find(item => item.id === spot.productId);
                        if (target) {
                          setQuickViewProduct(target);
                          setLookbookProduct(null);
                        }
                      }}
                      className="relative w-6 h-6 md:w-8 md:h-8 rounded-full bg-[#C9A96E] text-[#1A1A1A] hover:bg-white flex items-center justify-center font-bold text-xs shadow-lg transition-colors cursor-pointer"
                    >
                      +
                    </button>

                    {/* Popover Card info on Hover */}
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 hidden group-hover:block bg-stone-950 text-white min-w-[200px] p-3 rounded-sm text-center shadow-2xl backdrop-blur-md">
                      <p className="font-serif text-sm text-white mb-0.5">{spot.label}</p>
                      <span className="text-[#C9A96E] font-mono text-xs block mb-1">Click element to buy</span>
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-stone-950"></div>
                    </div>
                  </div>
                ))}

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>


      {/* ================= MODAL: TRAX / CALL COURIER ORDER TRACKER ================= */}
      <AnimatePresence>
        {isTrackOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} exit={{ opacity: 0 }} onClick={() => setIsTrackOpen(false)} className="fixed inset-0 z-50 bg-black" />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="fixed left-4 right-4 md:left-[20%] md:right-[20%] lg:left-[30%] lg:right-[30%] top-[10%] bottom-[10%] z-50 bg-white rounded-sm overflow-hidden shadow-2xl flex flex-col justify-between border border-[#C9A96E]/20"
              id="order-tracking-modal"
            >
              {/* Header */}
              <div className="p-6 border-b border-stone-100 flex justify-between items-center bg-white sticky top-0 z-10">
                <div className="flex items-center gap-2">
                  <Truck className="text-[#C9A96E] w-5 h-5 shrink-0" />
                  <span className="font-serif text-lg font-medium text-[#2C2C2C]">National Order Delivery Tracker</span>
                </div>
                <button onClick={() => { setIsTrackOpen(false); setTrackingStatus(null); setTrackingNumber(''); }} className="p-1 text-stone-500 hover:text-red-500 transition-colors cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form Input / Output scrollable frame */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 bg-[#FCFBFA] custom-scrollbar">
                
                {/* Simple quick instruct */}
                <div className="p-4 bg-[#F5F0E8] border border-[#C9A96E]/20 rounded-sm">
                  <p className="font-sans text-xs tracking-wide leading-relaxed text-stone-700">
                    Enter your Marina&apos;s Decor Order number to check the secure dispatch and delivery transit status direct from our Lahore warehouse. 
                  </p>
                  <p className="text-[11px] font-mono mt-2 text-[#C9A96E] font-medium uppercase">
                    TRY DEMO ORDER KEY: <strong className="underline select-all tracking-[1.5px]">MD-DEMO-1</strong>
                  </p>
                </div>

                <form onSubmit={handleTrackOrderSubmit} className="space-y-4">
                  <div className="flex flex-col space-y-2">
                    <label className="text-stone-700 font-mono text-[10px] tracking-widest uppercase">Order Tracking Reference ID:</label>
                    <div className="flex gap-2">
                      <input 
                        type="text"
                        required
                        value={trackingNumber}
                        onChange={(e) => setTrackingNumber(e.target.value)}
                        placeholder="e.g. MD-2026-9812"
                        className="flex-1 bg-white border border-stone-300 py-3 px-4 focus:outline-none focus:border-[#C9A96E] text-xs text-[#1A1A1A] placeholder-stone-400 font-mono tracking-wide rounded-sm"
                      />
                      <button 
                        type="submit"
                        className="bg-[#2C2C2C] hover:bg-[#C9A96E] hover:text-[#1A1A1A] text-white font-mono text-xs tracking-wider uppercase py-3 px-6 transition-colors duration-300 rounded-sm cursor-pointer"
                      >
                        Track
                      </button>
                    </div>
                  </div>
                </form>

                <div className="w-full h-[1px] bg-stone-200"></div>

                {/* Simulated Order timeline state status */}
                {trackingStatus ? (
                  trackingStatus.error ? (
                    <p className="text-red-500 text-xs font-mono text-center py-4">{trackingStatus.error}</p>
                  ) : (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-6"
                    >
                      <div className="p-4 border border-stone-200 bg-white space-y-2 rounded-sm text-xs font-sans tracking-wide">
                        <div className="flex justify-between">
                          <span className="text-stone-400 uppercase font-mono text-[10px]">Order ID:</span>
                          <span className="font-mono text-[#1A1A1A] font-bold">{trackingStatus.orderId}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-stone-400 uppercase font-mono text-[10px]">Recipient:</span>
                          <span className="font-semibold">{trackingStatus.customer}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-stone-400 uppercase font-mono text-[10px]">Courier Service:</span>
                          <span className="text-stone-600">{trackingStatus.carrier}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-stone-400 uppercase font-mono text-[10px]">AWB Tracking Id:</span>
                          <span className="font-mono select-all font-semibold text-stone-900">{trackingStatus.trackingId}</span>
                        </div>
                        <div className="flex justify-between pb-1">
                          <span className="text-stone-400 uppercase font-mono text-[10px]">Current Status:</span>
                          <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-full font-bold uppercase font-mono text-[9px] tracking-widest whitespace-nowrap">
                            {trackingStatus.status}
                          </span>
                        </div>
                      </div>

                      {/* Timeline flow */}
                      <div className="relative pl-6 space-y-6 select-none" id="order-timeline">
                        <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-[#C9A96E]/20"></div>
                        
                        {trackingStatus.steps.map((step: any, sIdx: number) => (
                          <div key={sIdx} className="relative flex flex-col justify-start">
                            <span className={`absolute -left-[23px] top-1 w-4 h-4 rounded-full border-2 bg-white flex items-center justify-center ${step.completed ? 'border-[#C9A96E] bg-[#C9A96E]' : 'border-stone-300'}`}>
                              {step.completed && <Check className="w-2.5 h-2.5 text-white stroke-[4]" />}
                            </span>
                            <h4 className="font-serif text-sm font-medium text-stone-900">{step.name}</h4>
                            <p className="text-stone-400 font-mono text-[10px] mt-0.5">{step.date}</p>
                          </div>
                        ))}
                      </div>

                    </motion.div>
                  )
                ) : (
                  <p className="text-stone-400 font-mono text-xs text-center py-8">No order tracking searched yet.</p>
                )}

              </div>

              {/* Customer Care click trigger link */}
              <div className="p-6 border-t border-stone-100 bg-[#FCFBFA] select-none text-center">
                <p className="text-stone-400 text-[11px] mb-2 font-sans">
                  Experiencing any difficulty or delays with your shipment parcel?
                </p>
                <a 
                  href="tel:+923104323200"
                  className="inline-flex items-center gap-1.5 text-[#C9A96E] hover:text-[#2C2C2C] font-mono text-xs tracking-wider uppercase underline underline-offset-4 cursor-pointer"
                >
                  <Headphones className="w-3.5 h-3.5" />
                  Contact Lahore Support Hotline
                </a>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>


      {/* ================= NOTIFICATION TOAST OVERLAY ================= */}
      <AnimatePresence>
        {toast && (
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50 bg-[#2C2C2C] text-white p-4 max-w-sm rounded-sm border border-[#C9A96E]/30 shadow-2xl flex items-center gap-4.5"
            id="toast-notification-node"
          >
            {toast.productImg ? (
              <div className="relative w-12 h-12 rounded-xs overflow-hidden shrink-0 aspect-square border border-[#C9A96E]/20 bg-[#1A1A1A]">
                <Image src={toast.productImg} alt="Thumbnail representation" fill className="object-cover" referrerPolicy="no-referrer" />
              </div>
            ) : (
              <div className="w-10 h-10 bg-[#C9A96E]/20 rounded-full flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5 text-[#C9A96E]" />
              </div>
            )}
            <div className="flex-1">
              <p className="text-stone-100 font-sans text-xs md:text-sm tracking-wide">{toast.msg}</p>
              <button 
                onClick={() => { setIsCartOpen(true); setToast(null); }}
                className="text-[#C9A96E] hover:text-white transition-colors font-mono text-[9px] tracking-widest uppercase mt-1 inline-block cursor-pointer underline"
              >
                View Your Selection Bag &rarr;
              </button>
            </div>
            <button 
              onClick={() => setToast(null)}
              className="p-1 hover:text-red-500 text-stone-400 transition-colors cursor-pointer"
              aria-label="Dismiss toast"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>


      {/* ================= MOBILE BOTTOM PROMO REMINDER BAR ================= */}
      <AnimatePresence>
        {showMobilePromo && (
          <motion.div 
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-0 left-0 right-0 z-35 bg-white border-t border-stone-200 shadow-xl p-3 md:hidden flex justify-between items-center selection:bg-[#C9A96E]/20"
            id="mobile-bottom-promo-bar"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-4.5 h-4.5 text-[#C9A96E]" />
              <div className="flex flex-col">
                <span className="font-serif text-xs font-semibold text-stone-900">National Free Courier Active</span>
                <span className="text-[10px] text-stone-500 font-sans tracking-wide">Nationwide Delivery — No Minimum Checkout</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <a 
                href="https://wa.me/923104323200" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-mono text-[9px] tracking-wider uppercase py-2.5 px-3.5 rounded-sm font-semibold block shadow-sm border border-emerald-400"
              >
                Order WhatsApp
              </a>
              <button 
                onClick={() => setShowMobilePromo(false)}
                className="p-1 text-stone-400 hover:text-gray-700 transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>


      {/* ================= FLOATING ACTION BUTTONS (WhatsApp & Back to Top) ================= */}
      
      {/* WhatsApp Pulse Floating action */}
      <a 
        href="https://wa.me/923104323200?text=Hello%20Marina%27s%20Decor%2c%20I%20am%20interested%20in%20your%20luxury%20home%20decor%20items."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-20 md:bottom-8 right-6 z-35 w-14 h-14 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-2xl transition-all transform hover:scale-105 duration-300 group ring-4 ring-emerald-500/20 active:scale-95 cursor-pointer"
        aria-label="Chat with Marina on WhatsApp"
        id="btn-whatsapp-floating"
      >
        <span className="absolute inset-0 rounded-full bg-emerald-500/30 animate-pulse scale-102"></span>
        <Phone className="w-6 h-6 rotate-[90deg] group-hover:rotate-[0] transition-transform duration-300" />
        {/* Helper popover */}
        <span className="absolute right-16 bg-white border border-stone-200 text-[#1A1A1A] font-mono text-[9px] tracking-widest uppercase px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md whitespace-nowrap rounded-sm">
          WhatsApp Order Help
        </span>
      </a>

      {/* Back to top scroll observer */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button 
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-36 md:bottom-24 right-7 z-35 w-11 h-11 bg-white hover:bg-stone-100 rounded-full flex items-center justify-center shadow-lg transition-colors border border-stone-100 text-stone-700 cursor-pointer"
            aria-label="Scroll Back to Top"
            id="btn-scroll-top-floating"
          >
            <ArrowUp className="w-4 h-4 text-[#C9A96E]" />
          </motion.button>
        )}
      </AnimatePresence>


      {/* ================= MOBILE NAVIGATION DRAWER OVERLAY ================= */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white/98 backdrop-blur-lg flex flex-col justify-start pt-24 px-6 select-none"
            id="mobile-navigation-overlay"
          >
            <div className="flex justify-between items-center mb-8">
              <div className="flex flex-col">
                <span className="font-serif text-2xl tracking-[1px] text-stone-900 leading-none">Marina&apos;s</span>
                <span className="text-[10px] tracking-[4px] uppercase text-stone-400 mt-1">DECOR</span>
              </div>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 border border-stone-200 rounded-full text-stone-700 focus:outline-none cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex flex-col space-y-5 text-xl font-serif text-[#1C1C1C] select-none" id="nav-mobile-tree">
              <a 
                href="#top" 
                onClick={() => setIsMobileMenuOpen(false)} 
                className="border-b border-stone-100 pb-2 hover:text-[#C9A96E] transition-colors"
              >
                Home Space
              </a>
              <a 
                href="#shop-anchor" 
                onClick={() => { setCategoryFilter('all'); setIsMobileMenuOpen(false); }} 
                className="border-b border-stone-100 pb-2 hover:text-[#C9A96E] transition-colors"
              >
                Shop All Accents
              </a>
              <a 
                href="#shop-anchor" 
                onClick={() => { setCategoryFilter('decor'); setIsMobileMenuOpen(false); }} 
                className="border-b border-stone-100 pb-2 hover:text-[#C9A96E] transition-colors"
              >
                Home Decor Collection
              </a>
              <a 
                href="#shop-by-categories" 
                onClick={() => setIsMobileMenuOpen(false)} 
                className="border-b border-stone-100 pb-2 hover:text-[#C9A96E] transition-colors"
              >
                Kitchen Tableware
              </a>
              <a 
                href="#story-anchor" 
                onClick={() => setIsMobileMenuOpen(false)} 
                className="border-b border-stone-100 pb-2 hover:text-[#C9A96E] transition-colors"
              >
                Bed & Bath Linens
              </a>
              
              <button 
                onClick={() => { setIsTrackOpen(true); setIsMobileMenuOpen(false); }} 
                className="border-b border-stone-100 pb-2 hover:text-[#C9A96E] transition-colors text-left cursor-pointer font-serif text-xl"
              >
                Track Your Shipment
              </button>
            </nav>

            <div className="mt-12 space-y-4">
              <p className="text-gray-400 text-xs font-mono tracking-widest uppercase">Lahore Headquarters:</p>
              <a href="tel:+923104323200" className="flex items-center gap-2 text-stone-800 text-sm font-semibold">
                <Phone className="w-4 h-4 text-[#C9A96E]" />
                <span>+92 310 4323200</span>
              </a>
              <p className="text-stone-400 text-xs tracking-wide leading-relaxed">
                Free Delivery nationwide with secure tracking and money back peace-of-mind guarantee.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
