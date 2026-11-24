export type FlavorCategory = 'todos' | 'frutales' | 'naturales' | 'especiales';

export type PresentationSize = '250ml' | '500ml' | '1L';

export interface FlavorProduct {
  id: string;
  name: string;
  category: Exclude<FlavorCategory, 'todos'>;
  tagline: string;
  description: string;
  ingredientsNote: string;
  image: string;
  imageAlt: string;
  prices: Record<PresentationSize, number>;
  featuredLabel?: string;
}

export const BRAND_CONFIG = {
  brandName: 'YogoSandy',
  subtitle: 'Yogurt Artesanal · Desde 2025',
  instagramHandle: '@yogosandy',
  instagramUrl: 'https://www.instagram.com/yogosandy/',
  whatsappPhone: '573000000000', // Reemplazar con el número oficial con código de país (sin + ni espacios)
  whatsappDisplay: '+57 300 000 0000',
  schedule: 'Lunes a Sábado · 8:00 a. m. – 6:00 p. m.',
  coverage: 'Entregas frescas a domicilio y puntos de entrega locales',
};

export const SIZE_LABELS: Record<PresentationSize, string> = {
  '250ml': '250 ml',
  '500ml': '500 ml',
  '1L': '1 Litro',
};

export function formatCurrency(amount: number): string {
  return `$${amount.toLocaleString('es-CO')}`;
}

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${BRAND_CONFIG.whatsappPhone}?text=${encodeURIComponent(message)}`;
}

export const HERO_IMAGE = {
  src: '/src/assets/images/hero_yogurt_collection_1795544937128.jpg',
  alt: 'Cuatro frascos de vidrio con yogurt artesanal YogoSandy de fresa, mora silvestre, durazno y griego natural rodeados de frutas frescas',
};

export const FLAVORS: FlavorProduct[] = [
  {
    id: 'fresa-artesanal',
    name: 'Fresa Artesanal',
    category: 'frutales',
    tagline: 'Fruta real · Textura cremosa',
    description:
      'Yogurt artesanal 100% natural, súper cremoso y preparado con fresa real macerada lentamente.',
    ingredientsNote: 'Leche entera fresca, cultivos lácticos vivos y compota casera de fresa.',
    image: '/src/assets/images/sabor_fresa_artesanal_1795544937133.jpg',
    imageAlt: 'Frasco de vidrio de yogurt artesanal sabor Fresa Artesanal YogoSandy con fresas frescas',
    prices: {
      '250ml': 8500,
      '500ml': 15500,
      '1L': 28000,
    },
    featuredLabel: 'Favorito de la casa',
  },
  {
    id: 'mora-silvestre',
    name: 'Mora Silvestre',
    category: 'frutales',
    tagline: 'Mora fresca · Sabor intenso',
    description:
      'Yogurt artesanal 100% natural, súper cremoso y con el auténtico sabor ácido-dulce de mora real.',
    ingredientsNote: 'Leche fresca pasteurizada, fermentos naturales y pulpa artesanal de mora.',
    image: '/src/assets/images/sabor_mora_silvestre_1795544937204.jpg',
    imageAlt: 'Frasco de yogurt artesanal sabor Mora Silvestre YogoSandy con moras frescas',
    prices: {
      '250ml': 8500,
      '500ml': 15500,
      '1L': 28000,
    },
  },
  {
    id: 'yogurt-griego-natural',
    name: 'Yogurt Griego Natural',
    category: 'naturales',
    tagline: 'Sin azúcar añadida · Alta cremosidad',
    description:
      'Yogurt natural de textura espesa y cremosa, ideal para acompañar con frutas, miel o granola.',
    ingredientsNote: '100% leche fresca y cultivos probióticos activos, filtrado artesanalmente.',
    image: '/src/assets/images/sabor_griego_natural_1795544936958.jpg',
    imageAlt: 'Frasco de Yogurt Griego Natural espeso con miel dorada y granola artesanal',
    prices: {
      '250ml': 9500,
      '500ml': 17500,
      '1L': 32000,
    },
    featuredLabel: 'Sin azúcar añadida',
  },
  {
    id: 'durazno-melocoton',
    name: 'Durazno Melocotón',
    category: 'frutales',
    tagline: 'Trocitos de fruta · Dulzor suave',
    description:
      'Yogurt artesanal sedoso combinado con trocitos jugosos de durazno maduro cocidos a fuego lento.',
    ingredientsNote: 'Leche fresca, fermentación lenta artesanal y melocotón seleccionado.',
    image: '/src/assets/images/sabor_durazno_melocoton_1795544937989.jpg',
    imageAlt: 'Frasco de yogurt artesanal sabor Durazno Melocotón con gajos de durazno fresco',
    prices: {
      '250ml': 9000,
      '500ml': 16500,
      '1L': 29500,
    },
  },
  {
    id: 'combo-degustacion',
    name: 'Pack Degustación x3',
    category: 'especiales',
    tagline: 'Elige 3 sabores · Ideal para probar',
    description:
      'Combina Fresa Artesanal, Mora Silvestre, Durazno o Griego Natural en presentación especial para disfrutar toda la semana.',
    ingredientsNote: 'Incluye 3 frascos del tamaño seleccionado listos para refrigerar.',
    image: '/src/assets/images/hero_yogurt_collection_1795544937128.jpg',
    imageAlt: 'Pack Degustación YogoSandy con variedad de frascos artesanales de yogurt y fruta fresca',
    prices: {
      '250ml': 24000,
      '500ml': 44000,
      '1L': 80000,
    },
    featuredLabel: 'Ahorro especial',
  },
  {
    id: 'griego-miel-granola',
    name: 'Mix Griego con Miel & Granola',
    category: 'especiales',
    tagline: 'Listo para desayunar · Crujiente',
    description:
      'Nuestro cremoso Yogurt Griego Natural acompañado de miel pura de abejas y granola artesanal tostada aparte.',
    ingredientsNote: 'Yogurt griego, avena horneada con almendras, semillas y miel 100% pura.',
    image: '/src/assets/images/sabor_griego_natural_1795544936958.jpg',
    imageAlt: 'Yogurt Griego Natural YogoSandy servido con miel pura y granola crocante',
    prices: {
      '250ml': 11500,
      '500ml': 20500,
      '1L': 36000,
    },
  },
];

export interface BenefitItem {
  id: string;
  title: string;
  description: string;
  metric: string;
}

export const BENEFITS: BenefitItem[] = [
  {
    id: 'natural-100',
    title: 'Natural 100%',
    description:
      'Elaborado sin conservantes, colorantes artificiales ni espesantes químicos. Solo ingredientes nobles y honestos.',
    metric: '0% aditivos artificiales',
  },
  {
    id: 'fruta-real',
    title: 'Hecho con Fruta Real',
    description:
      'Preparamos nuestras propias compotas con fresas, moras y duraznos frescos seleccionados en su punto exacto de madurez.',
    metric: 'Fruta fresca en cada frasco',
  },
  {
    id: 'super-cremoso',
    title: 'Súper Cremoso',
    description:
      'Fermentación lenta en pequeños lotes que garantiza una textura aterciopelada, suave al paladar y rica en probióticos.',
    metric: 'Fermentación artesanal lenta',
  },
  {
    id: 'fresco-pedido',
    title: 'Frescura de Hogar',
    description:
      'Desde 2025 cuidamos cada lote bajo pedido para que recibas un yogurt recién preparado directo en tu mesa.',
    metric: 'Lotes semanales frescos',
  },
];

export const ORDER_STEPS = [
  {
    step: '01',
    title: 'Elige tus sabores',
    detail: 'Explora nuestro catálogo y selecciona el tamaño que prefieras: 250 ml, 500 ml o 1 Litro.',
  },
  {
    step: '02',
    title: 'Arma tu pedido',
    detail: 'Pide un sabor directo en un clic o combina varios frascos en tu bolsa de pedido.',
  },
  {
    step: '03',
    title: 'Confirma por WhatsApp',
    detail: 'Tu mensaje se genera listo para enviar y coordinamos la entrega fresca hasta tu puerta.',
  },
];
