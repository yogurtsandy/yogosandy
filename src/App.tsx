import React, { useState } from 'react';
import {
  Check,
  Heart,
  Instagram,
  Leaf,
  Menu,
  MessageCircle,
  Plus,
  ShoppingBag,
  Sparkles,
  Clock,
  MapPin,
  X,
  ArrowRight,
} from 'lucide-react';
import {
  BENEFITS,
  BRAND_CONFIG,
  FLAVORS,
  FlavorCategory,
  FlavorProduct,
  HERO_IMAGE,
  ORDER_STEPS,
  PresentationSize,
  SIZE_LABELS,
  buildWhatsAppUrl,
  formatCurrency,
} from './data/products';
import { YogoSandyLogo } from './components/YogoSandyLogo';
import { SmartFoodImage } from './components/SmartFoodImage';
import { CartItem, OrderDrawer } from './components/OrderDrawer';

const CATEGORY_TABS: { id: FlavorCategory; label: string }[] = [
  { id: 'todos', label: 'Todos' },
  { id: 'frutales', label: 'Con Fruta' },
  { id: 'naturales', label: 'Natural' },
  { id: 'especiales', label: 'Especiales' },
];

const SIZE_OPTIONS: PresentationSize[] = ['250ml', '500ml', '1L'];

const BENEFIT_ICONS: Record<string, React.ReactNode> = {
  'natural-100': <Leaf className="h-6 w-6 text-[#C8284B]" />,
  'fruta-real': <Heart className="h-6 w-6 text-[#C8284B]" />,
  'super-cremoso': <Sparkles className="h-6 w-6 text-[#C8284B]" />,
  'fresco-pedido': <Clock className="h-6 w-6 text-[#C8284B]" />,
};

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<FlavorCategory>('todos');
  const [selectedSize, setSelectedSize] = useState<PresentationSize>('500ml');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);

  // Quick contact form state
  const [quickFlavorId, setQuickFlavorId] = useState<string>(FLAVORS[0].id);
  const [quickSize, setQuickSize] = useState<PresentationSize>('500ml');
  const [quickName, setQuickName] = useState('');
  const [quickMessage, setQuickMessage] = useState('');

  const filteredFlavors =
    selectedCategory === 'todos'
      ? FLAVORS
      : FLAVORS.filter((flavor) => flavor.category === selectedCategory);

  const totalCartUnits = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleAddToOrder = (flavor: FlavorProduct) => {
    const cartItemId = `${flavor.id}-${selectedSize}`;
    const unitPrice = flavor.prices[selectedSize];

    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.id === cartItemId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: cartItemId,
          productId: flavor.id,
          name: flavor.name,
          size: selectedSize,
          unitPrice,
          quantity: 1,
          image: flavor.image,
        },
      ];
    });

    setRecentlyAddedId(flavor.id);
    window.setTimeout(() => {
      setRecentlyAddedId((current) => (current === flavor.id ? null : current));
    }, 1400);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, quantity: item.quantity + delta } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const buildDirectFlavorWhatsApp = (flavor: FlavorProduct) => {
    const price = formatCurrency(flavor.prices[selectedSize]);
    return buildWhatsAppUrl(
      `Hola YogoSandy, quiero pedir 1x ${flavor.name} (${SIZE_LABELS[selectedSize]} - ${price}). ¿Tienen disponibilidad para hoy?`
    );
  };

  const quickFlavorObj = FLAVORS.find((f) => f.id === quickFlavorId) || FLAVORS[0];
  const quickOrderWhatsAppUrl = buildWhatsAppUrl(
    [
      `Hola YogoSandy, quiero hacer un pedido rápido:`,
      `• Sabor: ${quickFlavorObj.name} (${SIZE_LABELS[quickSize]} - ${formatCurrency(
        quickFlavorObj.prices[quickSize]
      )})`,
      quickName.trim() ? `• Mi nombre: ${quickName.trim()}` : null,
      quickMessage.trim() ? `• Comentario: ${quickMessage.trim()}` : null,
    ]
      .filter(Boolean)
      .join('\n')
  );

  const generalWhatsAppUrl = buildWhatsAppUrl(
    'Hola YogoSandy, me gustaría conocer los sabores disponibles y hacer un pedido.'
  );

  return (
    <div className="min-h-screen bg-white text-[#2D1B20] flex flex-col">
      {/* Top Bar Contract: Brand — 4 Single-Line Nav Links — 1 Primary Action */}
      <header className="sticky top-0 z-40 border-b border-[#FCE8EE] bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-8 px-4 py-3 sm:px-6">
          {/* Zone 1: Circular Logo + Brand Wordmark */}
          <a
            href="#inicio"
            className="flex items-center gap-3 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C8284B] rounded-full"
          >
            <YogoSandyLogo size={44} className="shrink-0" />
            <span className="font-display text-xl font-bold tracking-tight text-[#C8284B]">
              YogoSandy
            </span>
          </a>

          {/* Zone 2: 4 Clean Single-Line Nav Links */}
          <nav
            aria-label="Navegación principal"
            className="hidden md:flex items-center gap-7 text-sm font-medium text-[#3A252B]"
          >
            <a
              href="#inicio"
              className="whitespace-nowrap shrink-0 py-1 transition-colors hover:text-[#C8284B] hover:underline underline-offset-4"
            >
              Inicio
            </a>
            <a
              href="#sabores"
              className="whitespace-nowrap shrink-0 py-1 transition-colors hover:text-[#C8284B] hover:underline underline-offset-4"
            >
              Nuestros Sabores
            </a>
            <a
              href="#beneficios"
              className="whitespace-nowrap shrink-0 py-1 transition-colors hover:text-[#C8284B] hover:underline underline-offset-4"
            >
              Beneficios
            </a>
            <a
              href="#contacto"
              className="whitespace-nowrap shrink-0 py-1 transition-colors hover:text-[#C8284B] hover:underline underline-offset-4"
            >
              Contacto
            </a>
          </nav>

          {/* Zone 3: 1 Primary Action + Mobile Hamburger */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href={generalWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 rounded-full bg-[#C8284B] px-5 py-2.5 text-sm font-semibold text-white shadow-xs transition-colors duration-150 hover:bg-[#A81B3A] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C8284B]"
            >
              <MessageCircle className="h-4 w-4 shrink-0" />
              <span>Pedir por WhatsApp</span>
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((open) => !open)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#FCE8EE] bg-[#FFF8FA] text-[#C8284B] md:hidden focus-visible:outline-2 focus-visible:outline-[#C8284B]"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Accessible Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div className="border-t border-[#FCE8EE] bg-white px-4 py-4 md:hidden">
            <nav className="flex flex-col gap-2" aria-label="Navegación móvil">
              <a
                href="#inicio"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-2xl px-4 py-3 text-base font-medium text-[#2D1B20] hover:bg-[#FCE8EE] hover:text-[#C8284B]"
              >
                Inicio
              </a>
              <a
                href="#sabores"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-2xl px-4 py-3 text-base font-medium text-[#2D1B20] hover:bg-[#FCE8EE] hover:text-[#C8284B]"
              >
                Nuestros Sabores
              </a>
              <a
                href="#beneficios"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-2xl px-4 py-3 text-base font-medium text-[#2D1B20] hover:bg-[#FCE8EE] hover:text-[#C8284B]"
              >
                Beneficios
              </a>
              <a
                href="#contacto"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-2xl px-4 py-3 text-base font-medium text-[#2D1B20] hover:bg-[#FCE8EE] hover:text-[#C8284B]"
              >
                Contacto
              </a>
              <a
                href={generalWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 flex items-center justify-center gap-2 rounded-full bg-[#C8284B] px-5 py-3 text-sm font-semibold text-white"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Pedir por WhatsApp</span>
              </a>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1">
        {/* SECTION 1: HERO */}
        <section
          id="inicio"
          className="relative overflow-hidden bg-white pt-10 pb-16 sm:pt-14 sm:pb-20 lg:pt-16 lg:pb-24"
        >
          {/* Subtle decorative pastel pink splash & soft curves */}
          <div
            className="pointer-events-none absolute -top-24 right-0 h-[420px] w-[420px] rounded-full bg-[#FCE8EE]/70 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute bottom-10 -left-24 h-64 w-64 rounded-full bg-[#FCE8EE]/60 blur-2xl"
            aria-hidden="true"
          />

          <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
              {/* Left Column: Brand Headline & CTAs */}
              <div className="flex flex-col justify-center lg:col-span-6">
                <p className="text-sm font-semibold tracking-wide text-[#C8284B]">
                  Yogurt Artesanal <span aria-hidden="true">·</span> Desde 2025{' '}
                  <span aria-hidden="true">·</span> @yogosandy
                </p>

                <h1 className="mt-4 font-display text-[clamp(2.35rem,4.3vw,3.75rem)] leading-[1.08] font-bold tracking-tight text-[#C8284B] text-balance">
                  El verdadero sabor artesanal en cada cucharada
                </h1>

                <p className="mt-5 max-w-xl text-lg leading-relaxed text-[#3A252B]">
                  Yogures 100% naturales, súper cremosos y hechos con fruta real. Elaborados en
                  pequeños lotes cada semana para que disfrutes un producto fresco, honesto y
                  delicioso.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <a
                    href="#sabores"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#C8284B] px-7 py-3.5 text-base font-semibold text-white shadow-sm transition-all duration-150 hover:bg-[#A81B3A] hover:-translate-y-0.5 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C8284B]"
                  >
                    <span>Ver Sabores</span>
                    <ArrowRight className="h-4 w-4" />
                  </a>

                  <button
                    type="button"
                    onClick={() => setIsDrawerOpen(true)}
                    className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#F4A6BE] bg-[#FFF8FA] px-7 py-3.5 text-base font-semibold text-[#C8284B] transition-all duration-150 hover:border-[#C8284B] hover:bg-[#FCE8EE] whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C8284B]"
                  >
                    <ShoppingBag className="h-4 w-4" />
                    <span>
                      Hacer Pedido{totalCartUnits > 0 ? ` (${totalCartUnits})` : ''}
                    </span>
                  </button>
                </div>

                {/* Clean unboxed proof line */}
                <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-[#FCE8EE] pt-6 text-sm font-medium text-[#5C434A]">
                  <span>100% Natural</span>
                  <span aria-hidden="true" className="text-[#F4A6BE]">
                    •
                  </span>
                  <span>Fruta real seleccionada</span>
                  <span aria-hidden="true" className="text-[#F4A6BE]">
                    •
                  </span>
                  <span>Sin conservantes</span>
                </div>
              </div>

              {/* Right Column: Framed Hero Yogurt Collection Photography */}
              <div className="relative flex items-center lg:col-span-6">
                {/* Soft pastel & cherry framed backdrop */}
                <div
                  className="absolute -inset-3 rounded-[2.25rem] bg-gradient-to-br from-[#FCE8EE] via-[#F9D2DE]/60 to-[#FCE8EE] -rotate-1"
                  aria-hidden="true"
                />
                <div className="relative w-full overflow-hidden rounded-[2rem] bg-[#FCE8EE] shadow-md aspect-[4/3] lg:h-full lg:min-h-[420px]">
                  <SmartFoodImage
                    src={HERO_IMAGE.src}
                    alt={HERO_IMAGE.alt}
                    label="YogoSandy Yogurt Artesanal"
                    className="h-full w-full"
                  />
                  {/* Subtle circular brand seal resting gently at bottom corner */}
                  <div className="absolute bottom-4 right-4 hidden sm:block drop-shadow-md">
                    <YogoSandyLogo size={76} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Wave Separator: White -> Soft Pastel Pink */}
        <div className="bg-white leading-none" aria-hidden="true">
          <svg
            viewBox="0 0 1440 72"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="block w-full h-10 sm:h-14"
            preserveAspectRatio="none"
          >
            <path
              d="M0 32C240 72 480 72 720 36C960 0 1200 0 1440 36V72H0V32Z"
              fill="#FCE8EE"
            />
          </svg>
        </div>

        {/* SECTION 2: NUESTROS SABORES (CATALOG) */}
        <section id="sabores" className="relative bg-[#FCE8EE] py-16 sm:py-20">
          {/* Subtle decorative hearts in background */}
          <div
            className="pointer-events-none absolute top-12 left-8 text-[#F4A6BE]/40"
            aria-hidden="true"
          >
            <Heart className="h-10 w-10 fill-current" />
          </div>
          <div
            className="pointer-events-none absolute bottom-16 right-10 text-[#F4A6BE]/40"
            aria-hidden="true"
          >
            <Heart className="h-12 w-12 fill-current" />
          </div>

          <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
            {/* Section Header */}
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold text-[#C8284B]">Catálogo artesanal</p>
              <h2 className="mt-2 font-display text-3xl font-bold text-[#C8284B] sm:text-4xl text-balance">
                Nuestros Sabores
              </h2>
              <p className="mt-3 text-base leading-relaxed text-[#3A252B]">
                Elige tu presentación favorita y pide directo por WhatsApp en un clic o arma tu
                combinación de sabores.
              </p>
            </div>

            {/* Interactive Controls Bar: Category Filter + Presentation Size + Order Drawer Trigger */}
            <div className="mt-10 flex flex-col items-stretch justify-between gap-4 rounded-3xl bg-white/85 p-4 shadow-xs backdrop-blur-xs lg:flex-row lg:items-center">
              {/* Category Filter */}
              <div
                className="flex flex-wrap items-center gap-1.5"
                role="tablist"
                aria-label="Filtrar sabores por categoría"
              >
                {CATEGORY_TABS.map((tab) => {
                  const isActive = selectedCategory === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setSelectedCategory(tab.id)}
                      className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#C8284B] ${
                        isActive
                          ? 'bg-[#C8284B] text-white shadow-xs'
                          : 'text-[#3A252B] hover:bg-[#FCE8EE] hover:text-[#C8284B]'
                      }`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {/* Size Selector + My Order Trigger */}
              <div className="flex flex-wrap items-center justify-between gap-3 sm:justify-end">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-[#5C434A] whitespace-nowrap">
                    Tamaño:
                  </span>
                  <div
                    className="inline-flex rounded-full bg-[#FCE8EE] p-1"
                    role="group"
                    aria-label="Seleccionar presentación"
                  >
                    {SIZE_OPTIONS.map((size) => {
                      const active = selectedSize === size;
                      return (
                        <button
                          key={size}
                          type="button"
                          onClick={() => setSelectedSize(size)}
                          className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors duration-150 whitespace-nowrap shrink-0 ${
                            active
                              ? 'bg-white text-[#C8284B] shadow-xs'
                              : 'text-[#3A252B] hover:text-[#C8284B]'
                          }`}
                        >
                          {SIZE_LABELS[size]}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsDrawerOpen(true)}
                  className="inline-flex items-center gap-2 rounded-full border border-[#F4A6BE] bg-[#FFF8FA] px-4 py-2 text-xs font-semibold text-[#C8284B] transition-colors hover:bg-[#FCE8EE] whitespace-nowrap shrink-0"
                >
                  <ShoppingBag className="h-3.5 w-3.5" />
                  <span>Mi Pedido</span>
                  <span className="tabular-nums font-bold">({totalCartUnits})</span>
                </button>
              </div>
            </div>

            {/* Product Grid (3 columns desktop, 2 tablet, 1 mobile) */}
            <div className="mt-8 grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
              {filteredFlavors.map((flavor) => {
                const currentPrice = flavor.prices[selectedSize];
                const isJustAdded = recentlyAddedId === flavor.id;

                return (
                  <article
                    key={flavor.id}
                    className="flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md"
                  >
                    {/* Product Photography */}
                    <div className="aspect-[4/3] w-full overflow-hidden bg-[#FFF8FA]">
                      <SmartFoodImage
                        src={flavor.image}
                        alt={flavor.imageAlt}
                        label={flavor.name}
                        className="h-full w-full transition-transform duration-300 hover:scale-[1.03]"
                      />
                    </div>

                    {/* Card Body */}
                    <div className="flex flex-1 flex-col p-6">
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="text-xs font-medium text-[#5C434A]">
                          {flavor.tagline}
                        </span>
                        {flavor.featuredLabel && (
                          <span className="text-xs font-semibold text-[#C8284B] whitespace-nowrap shrink-0">
                            {flavor.featuredLabel}
                          </span>
                        )}
                      </div>

                      <div className="mt-2 flex items-baseline justify-between gap-3">
                        <h3 className="font-display text-xl font-bold text-[#2D1B20]">
                          {flavor.name}
                        </h3>
                        <span className="font-display text-xl font-bold tabular-nums text-[#C8284B] shrink-0">
                          {formatCurrency(currentPrice)}
                        </span>
                      </div>

                      <p className="mt-2.5 text-sm leading-relaxed text-[#3A252B]">
                        {flavor.description}
                      </p>

                      <p className="mt-2 text-xs leading-relaxed text-[#5C434A]">
                        {flavor.ingredientsNote}
                      </p>

                      {/* Card Footer Actions */}
                      <div className="mt-auto pt-5 flex items-center gap-2.5">
                        <a
                          href={buildDirectFlavorWhatsApp(flavor)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#C8284B] px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-[#A81B3A] whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C8284B]"
                        >
                          <MessageCircle className="h-4 w-4 shrink-0" />
                          <span>Pedir por WhatsApp</span>
                        </a>

                        <button
                          type="button"
                          onClick={() => handleAddToOrder(flavor)}
                          aria-label={`Agregar ${flavor.name} (${SIZE_LABELS[selectedSize]}) al pedido`}
                          className={`inline-flex items-center justify-center gap-1 rounded-full border px-3.5 py-2.5 text-xs font-semibold transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#C8284B] ${
                            isJustAdded
                              ? 'border-[#C8284B] bg-[#FCE8EE] text-[#C8284B]'
                              : 'border-[#F4A6BE] bg-white text-[#C8284B] hover:bg-[#FFF8FA]'
                          }`}
                        >
                          {isJustAdded ? (
                            <>
                              <Check className="h-3.5 w-3.5" />
                              <span>Agregado</span>
                            </>
                          ) : (
                            <>
                              <Plus className="h-3.5 w-3.5" />
                              <span>Agregar</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Wave Separator: Soft Pastel Pink -> Pure White */}
        <div className="bg-[#FCE8EE] leading-none" aria-hidden="true">
          <svg
            viewBox="0 0 1440 72"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="block w-full h-10 sm:h-14"
            preserveAspectRatio="none"
          >
            <path
              d="M0 36C280 0 560 0 840 36C1080 68 1280 68 1440 36V72H0V36Z"
              fill="#FFFFFF"
            />
          </svg>
        </div>

        {/* SECTION 3: BENEFICIOS (¿POR QUÉ ELEGIR YOGOSANDY?) */}
        <section id="beneficios" className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold text-[#C8284B]">Calidad desde 2025</p>
              <h2 className="mt-2 font-display text-3xl font-bold text-[#C8284B] sm:text-4xl text-balance">
                ¿Por qué elegir YogoSandy?
              </h2>
              <p className="mt-3 text-base leading-relaxed text-[#3A252B]">
                Cada frasco nace de una receta familiar cuidada al detalle: leche fresca, fruta de
                verdad y fermentación lenta para lograr una textura inolvidable.
              </p>
            </div>

            {/* 4 Benefit Cards */}
            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {BENEFITS.map((benefit) => (
                <div
                  key={benefit.id}
                  className="flex flex-col rounded-3xl border border-[#FCE8EE] bg-[#FFF8FA] p-6 transition-transform duration-150 hover:-translate-y-0.5"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FCE8EE]">
                    {BENEFIT_ICONS[benefit.id]}
                  </div>
                  <h3 className="mt-5 font-display text-xl font-bold text-[#2D1B20]">
                    {benefit.title}
                  </h3>
                  <p className="mt-2.5 flex-1 text-sm leading-relaxed text-[#3A252B]">
                    {benefit.description}
                  </p>
                  <p className="mt-4 border-t border-[#FCE8EE] pt-3 text-xs font-semibold text-[#C8284B]">
                    {benefit.metric}
                  </p>
                </div>
              ))}
            </div>

            {/* Simple 3-Step Order Flow Strip */}
            <div className="mt-14 rounded-3xl border border-[#FCE8EE] bg-white p-6 sm:p-8 shadow-xs">
              <div className="flex flex-col justify-between gap-4 border-b border-[#FCE8EE] pb-6 sm:flex-row sm:items-end">
                <div>
                  <h3 className="font-display text-2xl font-bold text-[#2D1B20]">
                    ¿Cómo hacer tu pedido?
                  </h3>
                  <p className="mt-1 text-sm text-[#5C434A]">
                    Sin formularios largos ni registros complicados: directo a nuestro WhatsApp.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsDrawerOpen(true)}
                  className="inline-flex items-center gap-2 self-start rounded-full bg-[#FCE8EE] px-5 py-2.5 text-sm font-semibold text-[#C8284B] transition-colors hover:bg-[#F9D2DE] sm:self-auto whitespace-nowrap"
                >
                  <ShoppingBag className="h-4 w-4" />
                  <span>Abrir Mi Pedido</span>
                </button>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
                {ORDER_STEPS.map((item) => (
                  <div key={item.step} className="flex items-start gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#C8284B] font-display text-sm font-bold tabular-nums text-white">
                      {item.step}
                    </span>
                    <div>
                      <h4 className="font-display text-lg font-semibold text-[#2D1B20]">
                        {item.title}
                      </h4>
                      <p className="mt-1 text-sm leading-relaxed text-[#5C434A]">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: CONTACTO Y PEDIDO RÁPIDO */}
        <section id="contacto" className="bg-[#FFF8FA] py-16 sm:py-20 border-t border-[#FCE8EE]">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-stretch">
              {/* Left Info Card */}
              <div className="flex flex-col justify-between rounded-3xl bg-[#FCE8EE] p-8 lg:col-span-5">
                <div>
                  <p className="text-sm font-semibold text-[#C8284B]">Contacto directo</p>
                  <h2 className="mt-2 font-display text-3xl font-bold text-[#C8284B] text-balance">
                    Pide fresco hoy mismo
                  </h2>
                  <p className="mt-3 text-base leading-relaxed text-[#3A252B]">
                    Atendemos tus pedidos personalizados, combos familiares y encargos especiales
                    para tus desayunos o celebraciones.
                  </p>

                  <dl className="mt-8 space-y-4 text-sm text-[#2D1B20]">
                    <div className="flex items-start gap-3">
                      <Clock className="mt-0.5 h-5 w-5 shrink-0 text-[#C8284B]" />
                      <div>
                        <dt className="font-semibold">Horario de atención</dt>
                        <dd className="text-[#5C434A]">{BRAND_CONFIG.schedule}</dd>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#C8284B]" />
                      <div>
                        <dt className="font-semibold">Entregas frescas</dt>
                        <dd className="text-[#5C434A]">{BRAND_CONFIG.coverage}</dd>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Instagram className="mt-0.5 h-5 w-5 shrink-0 text-[#C8284B]" />
                      <div>
                        <dt className="font-semibold">Instagram oficial</dt>
                        <dd>
                          <a
                            href={BRAND_CONFIG.instagramUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium text-[#C8284B] underline-offset-4 hover:underline"
                          >
                            {BRAND_CONFIG.instagramHandle}
                          </a>
                        </dd>
                      </div>
                    </div>
                  </dl>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href={generalWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#C8284B] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#A81B3A] whitespace-nowrap"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>Escribir por WhatsApp</span>
                  </a>
                  <a
                    href={BRAND_CONFIG.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#C8284B] transition-colors hover:bg-[#FFF8FA] whitespace-nowrap"
                  >
                    <Instagram className="h-4 w-4" />
                    <span>{BRAND_CONFIG.instagramHandle}</span>
                  </a>
                </div>
              </div>

              {/* Right Quick Order Builder Card */}
              <div className="rounded-3xl border border-[#FCE8EE] bg-white p-8 shadow-xs lg:col-span-7">
                <h3 className="font-display text-2xl font-bold text-[#2D1B20]">
                  Arma un pedido rápido por WhatsApp
                </h3>
                <p className="mt-1.5 text-sm text-[#5C434A]">
                  Selecciona el sabor y tamaño que deseas; generamos tu mensaje listo para enviar.
                </p>

                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="quick-flavor"
                      className="block text-xs font-semibold text-[#3A252B] mb-1.5"
                    >
                      Sabor o presentación
                    </label>
                    <select
                      id="quick-flavor"
                      value={quickFlavorId}
                      onChange={(e) => setQuickFlavorId(e.target.value)}
                      className="w-full rounded-2xl border border-[#F9D2DE] bg-[#FFF8FA] px-4 py-3 text-sm font-medium text-[#2D1B20] focus:border-[#C8284B] focus:outline-none"
                    >
                      {FLAVORS.map((flavor) => (
                        <option key={flavor.id} value={flavor.id}>
                          {flavor.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="quick-size"
                      className="block text-xs font-semibold text-[#3A252B] mb-1.5"
                    >
                      Tamaño
                    </label>
                    <select
                      id="quick-size"
                      value={quickSize}
                      onChange={(e) => setQuickSize(e.target.value as PresentationSize)}
                      className="w-full rounded-2xl border border-[#F9D2DE] bg-[#FFF8FA] px-4 py-3 text-sm font-medium text-[#2D1B20] focus:border-[#C8284B] focus:outline-none"
                    >
                      {SIZE_OPTIONS.map((size) => (
                        <option key={size} value={size}>
                          {SIZE_LABELS[size]} — {formatCurrency(quickFlavorObj.prices[size])}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="quick-name"
                      className="block text-xs font-semibold text-[#3A252B] mb-1.5"
                    >
                      Tu nombre (opcional)
                    </label>
                    <input
                      id="quick-name"
                      type="text"
                      value={quickName}
                      onChange={(e) => setQuickName(e.target.value)}
                      placeholder="Ej. Camila Rodríguez"
                      className="w-full rounded-2xl border border-[#F9D2DE] bg-[#FFF8FA] px-4 py-3 text-sm text-[#2D1B20] placeholder:text-[#5C434A]/50 focus:border-[#C8284B] focus:outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="quick-notes"
                      className="block text-xs font-semibold text-[#3A252B] mb-1.5"
                    >
                      Dirección o nota adicional (opcional)
                    </label>
                    <textarea
                      id="quick-notes"
                      rows={3}
                      value={quickMessage}
                      onChange={(e) => setQuickMessage(e.target.value)}
                      placeholder="Ej. ¿Tienen entrega hoy en la tarde en el barrio norte?"
                      className="w-full rounded-2xl border border-[#F9D2DE] bg-[#FFF8FA] px-4 py-3 text-sm text-[#2D1B20] placeholder:text-[#5C434A]/50 focus:border-[#C8284B] focus:outline-none resize-none"
                    />
                  </div>
                </div>

                <div className="mt-6 flex flex-col items-start justify-between gap-4 border-t border-[#FCE8EE] pt-6 sm:flex-row sm:items-center">
                  <div>
                    <span className="block text-xs text-[#5C434A]">Precio seleccionado</span>
                    <span className="font-display text-2xl font-bold tabular-nums text-[#C8284B]">
                      {formatCurrency(quickFlavorObj.prices[quickSize])}
                    </span>
                  </div>

                  <a
                    href={quickOrderWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-[#C8284B] px-7 py-3.5 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-[#A81B3A] whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C8284B]"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>Enviar Pedido por WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Wave Separator into Raspberry Footer */}
      <div className="bg-[#FFF8FA] leading-none" aria-hidden="true">
        <svg
          viewBox="0 0 1440 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="block w-full h-10 sm:h-12"
          preserveAspectRatio="none"
        >
          <path
            d="M0 24C360 64 720 64 1080 24C1260 4 1380 8 1440 20V60H0V24Z"
            fill="#C8284B"
          />
        </svg>
      </div>

      {/* FOOTER */}
      <footer className="bg-[#C8284B] text-white py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col items-start justify-between gap-8 border-b border-white/20 pb-8 md:flex-row md:items-center">
            <div className="flex items-center gap-4">
              <YogoSandyLogo size={68} className="shrink-0" />
              <div>
                <p className="font-display text-2xl font-bold tracking-tight">YogoSandy</p>
                <p className="text-sm text-[#FCE8EE]">
                  Yogurt Artesanal · 100% Natural · Desde 2025
                </p>
              </div>
            </div>

            <nav aria-label="Enlaces del pie de página" className="flex flex-wrap gap-6 text-sm">
              <a href="#inicio" className="text-[#FCE8EE] hover:text-white hover:underline underline-offset-4">
                Inicio
              </a>
              <a href="#sabores" className="text-[#FCE8EE] hover:text-white hover:underline underline-offset-4">
                Nuestros Sabores
              </a>
              <a href="#beneficios" className="text-[#FCE8EE] hover:text-white hover:underline underline-offset-4">
                Beneficios
              </a>
              <a href="#contacto" className="text-[#FCE8EE] hover:text-white hover:underline underline-offset-4">
                Contacto
              </a>
            </nav>

            <div className="flex items-center gap-3">
              <a
                href={BRAND_CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram de YogoSandy"
                className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/25 whitespace-nowrap"
              >
                <Instagram className="h-4 w-4" />
                <span>{BRAND_CONFIG.instagramHandle}</span>
              </a>
              <a
                href={generalWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp de YogoSandy"
                className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#C8284B] transition-colors hover:bg-[#FCE8EE] whitespace-nowrap"
              >
                <MessageCircle className="h-4 w-4" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          <div className="mt-6 flex flex-col items-start justify-between gap-2 text-xs text-[#FCE8EE] sm:flex-row sm:items-center">
            <p>© 2025–2026 YogoSandy Yogurt Artesanal. Todos los derechos reservados.</p>
            <p>Hecho con fruta real y cariño artesanal.</p>
          </div>
        </div>
      </footer>

      {/* Interactive Slide-Over Order Drawer */}
      <OrderDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />
    </div>
  );
}
