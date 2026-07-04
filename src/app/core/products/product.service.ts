import { Injectable } from '@angular/core';
import { Product, ProductCategory } from '../../shared/models/product.model';

const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Neon RTX 4070 Super',
    description:
      'GPU de alto rendimiento con iluminación RGB y overclock de fábrica para gaming 1440p.',
    price: 649.99,
    category: 'gpus',
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=600&h=400&fit=crop',
    tags: ['ray tracing', 'dlss', 'rgb'],
    stock: 12,
    rating: 4.8,
    featured: true,
    specs: {
      VRAM: '12 GB GDDR6X',
      Boost: '2475 MHz',
      TDP: '220 W',
    },
  },
  {
    id: '2',
    name: 'Void Core i7-14700K',
    description:
      'Procesador de 20 núcleos optimizado para streaming, edición y juegos competitivos.',
    price: 419.0,
    category: 'cpus',
    image: 'https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=600&h=400&fit=crop',
    tags: ['intel', 'overclock'],
    stock: 20,
    rating: 4.7,
    seminuevo: true,
    featured: true,
    specs: {
      Núcleos: '20 (8P + 12E)',
      Hilos: '28',
      Socket: 'LGA 1700',
    },
  },
  {
    id: '3',
    name: 'Pulse Mechanical Keyboard',
    description:
      'Teclado mecánico hot-swap con switches lineales y glow púrpura personalizable.',
    price: 129.99,
    category: 'peripherals',
    image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=600&h=400&fit=crop',
    tags: ['mechanical', 'rgb', 'hot-swap'],
    stock: 35,
    rating: 4.6,
    featured: true,
    specs: {
      Switches: 'Lineales',
      Layout: 'TKL',
      Conexión: 'USB-C / Wireless',
    },
  },
  {
    id: '4',
    name: 'Aurora 27" OLED 240Hz',
    description:
      'Monitor OLED con negros infinitos, 0.03 ms y HDR para una experiencia inmersiva.',
    price: 899.0,
    category: 'monitors',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&h=400&fit=crop',
    tags: ['oled', '240hz', 'hdr'],
    stock: 8,
    rating: 4.9,
    featured: true,
    specs: {
      Panel: 'OLED',
      Resolución: '2560×1440',
      Refresh: '240 Hz',
    },
  },
  {
    id: '5',
    name: 'Shadow Pro Wireless Mouse',
    description:
      'Ratón ultraligero con sensor de 26K DPI y batería de 80 horas.',
    price: 89.99,
    category: 'peripherals',
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&h=400&fit=crop',
    tags: ['wireless', 'lightweight'],
    stock: 40,
    rating: 4.5,
    seminuevo: true,
    specs: {
      DPI: '26000',
      Peso: '59 g',
      Batería: '80 h',
    },
  },
  {
    id: '6',
    name: 'Cyber Headset 7.1',
    description:
      'Auriculares con sonido espacial, micrófono desmontable y almohadillas de gel frío.',
    price: 149.5,
    category: 'accessories',
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&h=400&fit=crop',
    tags: ['surround', 'mic'],
    stock: 22,
    rating: 4.4,
    specs: {
      Audio: '7.1 virtual',
      Micrófono: 'Desmontable',
      Conexión: 'USB / 3.5 mm',
    },
  },
  {
    id: '7',
    name: 'Quantum RX 7800 XT',
    description:
      'Tarjeta gráfica AMD para 1440p ultra con gran ancho de banda de memoria.',
    price: 529.0,
    category: 'gpus',
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=600&h=400&fit=crop',
    tags: ['amd', 'fsr'],
    stock: 15,
    rating: 4.6,
    seminuevo: true,
    specs: {
      VRAM: '16 GB GDDR6',
      Boost: '2430 MHz',
      TDP: '263 W',
    },
  },
  {
    id: '8',
    name: 'Nova Ryzen 7 7800X3D',
    description:
      'CPU gaming con caché 3D V-Cache para máximos FPS en títulos AAA.',
    price: 379.0,
    category: 'cpus',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop',
    tags: ['amd', '3d-vcache'],
    stock: 18,
    rating: 4.9,
    specs: {
      Núcleos: '8',
      Hilos: '16',
      Socket: 'AM5',
    },
  },
];

@Injectable({ providedIn: 'root' })
export class ProductService {
  getAll(): Product[] {
    return PRODUCTS;
  }

  getFeatured(): Product[] {
    return PRODUCTS.filter((product) => product.featured);
  }

  getById(id: string): Product | undefined {
    return PRODUCTS.find((product) => product.id === id);
  }

  getByCategory(category: ProductCategory | 'all'): Product[] {
    if (category === 'all') {
      return PRODUCTS;
    }
    return PRODUCTS.filter((product) => product.category === category);
  }

  getRelated(product: Product, limit = 4): Product[] {
    return PRODUCTS.filter(
      (item) => item.category === product.category && item.id !== product.id
    ).slice(0, limit);
  }

  search(term: string): Product[] {
    const query = term.trim().toLowerCase();
    if (!query) {
      return PRODUCTS;
    }
    return PRODUCTS.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.tags.some((tag) => tag.includes(query))
    );
  }
}
