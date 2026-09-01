/**
 * LaSabroso menu — typed single source of truth.
 * Mirrors the Petpooja extraction. Counts asserted below.
 *
 * Image strategy: real food photography re-hosted on OSS (guaranteed reachable)
 * via the image-search service. See docs/assets/README.md.
 */

export type DishCategory =
  | "signature"
  | "momos"
  | "pasta"
  | "pizza"
  | "desserts"
  | "coffee"
  | "starters"
  | "mocktails";

export interface Dish {
  id: string;
  name: string;
  desc: string;
  price: number;
  veg: boolean;
  category: DishCategory;
  chefPick?: boolean;
  bestseller?: boolean;
  spicy?: boolean;
  image: string;
}

/** Real food photography, OSS-hosted (reachable). 2 variants per category. */
export const CAT_IMG: Record<DishCategory, string[]> = {
  signature: [
    "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/91d277b184a0.jpg",
    "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/7490336dda08.jpg",
  ],
  momos: [
    "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/32a25c8e3886.jpg",
    "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/cdef4a9a99ab.jpg",
  ],
  pasta: [
    "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/33e6a5a23c36.jpg",
    "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/800b1e107028.jpg",
  ],
  pizza: [
    "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/c3a7d4f5e18e.jpg",
    "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/de76d4d168e7.jpg",
  ],
  desserts: [
    "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/91d277b184a0.jpg",
    "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/7490336dda08.jpg",
  ],
  coffee: [
    "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/7906fe358e3b.png",
    "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/fa61d96b1a27.jpg",
  ],
  starters: [
    "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/bfe2f380d1f4.jpg",
    "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/1a7e3638681d.jpg",
  ],
  mocktails: [
    "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/08f2996844aa.jpg",
    "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/8d49cd0c6246.jpg",
  ],
};

export const categories: {
  id: DishCategory;
  label: string;
  blurb: string;
  emoji: string;
}[] = [
  { id: "signature", label: "Signature", blurb: "House originals", emoji: "★" },
  { id: "momos", label: "Momos", blurb: "Steamed & fried", emoji: "◉" },
  { id: "pasta", label: "Pasta", blurb: "Wood-fired sauces", emoji: "✦" },
  { id: "pizza", label: "Pizza", blurb: "Hand-tossed", emoji: "◈" },
  { id: "desserts", label: "Desserts", blurb: "Dessert lab", emoji: "❋" },
  { id: "coffee", label: "Coffee", blurb: "Single origin", emoji: "☕" },
  { id: "starters", label: "Starters", blurb: "Small plates", emoji: "▸" },
  { id: "mocktails", label: "Mocktails", blurb: "Cold pressed", emoji: "❖" },
];

/** Raw dish data (image assigned per-category below). */
type RawDish = Omit<Dish, "image">;

const raw: RawDish[] = [
  // ---- Signature ----
  {
    id: "sig-1",
    name: "LaSabroso Special Momo",
    desc: "Steamed dim-sum filled with spiced cottage cheese, served with smoked schezwan",
    price: 229,
    veg: true,
    category: "signature",
    chefPick: true,
    bestseller: true,
  },
  {
    id: "sig-2",
    name: "Chocolate Khoma Dessert",
    desc: "Warm chocolate soil, hazelnut praline and salted caramel pearls",
    price: 249,
    veg: true,
    category: "signature",
    chefPick: true,
    bestseller: true,
  },
  {
    id: "sig-3",
    name: "Truffle Mushroom Pizza",
    desc: "Hand-tossed base, wild mushrooms, truffle oil, mozzarella, thyme",
    price: 389,
    veg: true,
    category: "signature",
    chefPick: true,
  },
  {
    id: "sig-4",
    name: "House Cold Brew Tonic",
    desc: "Single origin cold brew, elderflower tonic, orange peel",
    price: 219,
    veg: true,
    category: "signature",
    bestseller: true,
  },
  {
    id: "sig-5",
    name: "Peri Peri Paneer Tikka",
    desc: "Char-grilled cottage cheese, smoked peri peri, mint chaas foam",
    price: 269,
    veg: true,
    category: "signature",
    spicy: true,
  },

  // ---- Momos ----
  {
    id: "mom-1",
    name: "Steamed Veg Momos",
    desc: "Classic Tibetan steamed parcels, burnt garlic chutney",
    price: 149,
    veg: true,
    category: "momos",
    bestseller: true,
  },
  {
    id: "mom-2",
    name: "Tandoori Momos",
    desc: "Char-grilled momos in smoky tandoori marinade",
    price: 199,
    veg: true,
    category: "momos",
    spicy: true,
    chefPick: true,
  },
  {
    id: "mom-3",
    name: "Cheesy Fried Momos",
    desc: "Golden fried, molten cheese centre, schezwan dip",
    price: 209,
    veg: true,
    category: "momos",
    bestseller: true,
  },
  {
    id: "mom-4",
    name: "Jhol Momo",
    desc: "Nepalese-style momos drowned in fiery sesame-tomato broth",
    price: 219,
    veg: true,
    category: "momos",
    spicy: true,
  },
  {
    id: "mom-5",
    name: "Chocolate Momos",
    desc: "Dessert momos, molten dark chocolate, icing sugar",
    price: 189,
    veg: true,
    category: "momos",
    chefPick: true,
  },
  {
    id: "mom-6",
    name: "Chicken Steamed Momos",
    desc: "Juicy minced chicken, ginger, burnt garlic chutney",
    price: 189,
    veg: false,
    category: "momos",
    bestseller: true,
  },

  // ---- Pasta ----
  {
    id: "pas-1",
    name: "Smoked Al Fredo Penne",
    desc: "Creamy parmesan, smoked paprika, charred peppers",
    price: 279,
    veg: true,
    category: "pasta",
    chefPick: true,
  },
  {
    id: "pas-2",
    name: "Arrabbiata Spaghetti",
    desc: "Fiery tomato, garlic, basil, chilli oil",
    price: 259,
    veg: true,
    category: "pasta",
    spicy: true,
  },
  {
    id: "pas-3",
    name: "Pesto Fusilli",
    desc: "House basil pesto, pine nuts, sun-dried tomato",
    price: 289,
    veg: true,
    category: "pasta",
  },
  {
    id: "pas-4",
    name: "Pink Sauce Rigatoni",
    desc: "Tomato-cream, oregano, cracked pepper",
    price: 269,
    veg: true,
    category: "pasta",
    bestseller: true,
  },

  // ---- Pizza ----
  {
    id: "piz-1",
    name: "Margherita Classica",
    desc: "San Marzano, fior di latte, fresh basil, EVOO",
    price: 299,
    veg: true,
    category: "pizza",
  },
  {
    id: "piz-2",
    name: "Farmhouse Garden",
    desc: "Bell pepper, onion, mushroom, sweet corn, double cheese",
    price: 349,
    veg: true,
    category: "pizza",
    bestseller: true,
  },
  {
    id: "piz-3",
    name: "Truffle Mushroom",
    desc: "Wild mushroom, truffle oil, mozzarella, thyme",
    price: 389,
    veg: true,
    category: "pizza",
    chefPick: true,
  },
  {
    id: "piz-4",
    name: "Peri Peri Paneer",
    desc: "Smoked peri peri paneer, onion, coriander drizzle",
    price: 359,
    veg: true,
    category: "pizza",
    spicy: true,
  },
  {
    id: "piz-5",
    name: "Chicken Tikka Pizza",
    desc: "Tandoori chicken tikka, onion, mint, double cheese",
    price: 429,
    veg: false,
    category: "pizza",
    bestseller: true,
  },

  // ---- Desserts ----
  {
    id: "des-1",
    name: "Chocolate Khoma",
    desc: "Warm chocolate soil, hazelnut praline, salted caramel pearls",
    price: 249,
    veg: true,
    category: "desserts",
    chefPick: true,
    bestseller: true,
  },
  {
    id: "des-2",
    name: "Tiramisu Jar",
    desc: "Mascarpone, espresso-soaked ladyfingers, cocoa",
    price: 219,
    veg: true,
    category: "desserts",
  },
  {
    id: "des-3",
    name: "Molten Lava Cake",
    desc: "Dark chocolate fondant, vanilla bean gelato",
    price: 229,
    veg: true,
    category: "desserts",
    bestseller: true,
  },
  {
    id: "des-4",
    name: "Cheesecake Berry Compote",
    desc: "Baked vanilla cheesecake, seasonal berry compote",
    price: 239,
    veg: true,
    category: "desserts",
    chefPick: true,
  },
  {
    id: "des-5",
    name: "Rolled Ice Cream Lab",
    desc: "Choose your base and mix-ins, rolled live at the counter",
    price: 199,
    veg: true,
    category: "desserts",
  },

  // ---- Coffee ----
  {
    id: "cof-1",
    name: "House Cold Brew",
    desc: "18-hour single origin, smooth, low-acid",
    price: 179,
    veg: true,
    category: "coffee",
    bestseller: true,
  },
  {
    id: "cof-2",
    name: "Spanish Latte",
    desc: "Double shot, condensed milk, velvet microfoam",
    price: 189,
    veg: true,
    category: "coffee",
    chefPick: true,
  },
  {
    id: "cof-3",
    name: "Hazelnut Mocha",
    desc: "Dark chocolate, hazelnut praline, double espresso",
    price: 199,
    veg: true,
    category: "coffee",
  },
  {
    id: "cof-4",
    name: "Pour Over Single Origin",
    desc: "Rotating estate, hand-poured to order",
    price: 219,
    veg: true,
    category: "coffee",
    chefPick: true,
  },
  {
    id: "cof-5",
    name: "Iced Salted Caramel",
    desc: "Salted caramel, cold milk, espresso shot",
    price: 209,
    veg: true,
    category: "coffee",
    bestseller: true,
  },

  // ---- Starters ----
  {
    id: "sta-1",
    name: "Loaded Nachos Supreme",
    desc: "Corn nachos, cheese sauce, salsa, jalapeño, sour cream",
    price: 219,
    veg: true,
    category: "starters",
    bestseller: true,
  },
  {
    id: "sta-2",
    name: "Crispy Corn Kernels",
    desc: "Crunchy corn, garlic butter, smoked paprika",
    price: 169,
    veg: true,
    category: "starters",
    spicy: true,
  },
  {
    id: "sta-3",
    name: "Cheesy Garlic Bread",
    desc: "Wood-fired, mozzarella, herb butter",
    price: 159,
    veg: true,
    category: "starters",
  },
  {
    id: "sta-4",
    name: "Hummus & Pita Platter",
    desc: "Beetroot hummus, olive oil, warm pita, olives",
    price: 199,
    veg: true,
    category: "starters",
    chefPick: true,
  },
  {
    id: "sta-5",
    name: "Smoked Chicken Wings",
    desc: "Char-grilled, peri peri glaze, blue cheese dip",
    price: 259,
    veg: false,
    category: "starters",
    spicy: true,
  },

  // ---- Mocktails ----
  {
    id: "moc-1",
    name: "Virgin Mojito",
    desc: "Mint, lime, soda, brown sugar",
    price: 149,
    veg: true,
    category: "mocktails",
    bestseller: true,
  },
  {
    id: "moc-2",
    name: "Berry Bliss",
    desc: "Mixed berry crush, lime, soda",
    price: 169,
    veg: true,
    category: "mocktails",
  },
  {
    id: "moc-3",
    name: "Cold Brew Tonic",
    desc: "Single origin cold brew, elderflower tonic, orange",
    price: 219,
    veg: true,
    category: "mocktails",
    chefPick: true,
  },
  {
    id: "moc-4",
    name: "Watermelon Cooler",
    desc: "Fresh watermelon, mint, lime",
    price: 159,
    veg: true,
    category: "mocktails",
  },
];

/** Assign images by category + position within category (2 variants). */
const countByCat: Record<string, number> = {};
export const menu: Dish[] = raw.map((d) => {
  const idx = countByCat[d.category] ?? 0;
  countByCat[d.category] = idx + 1;
  const arr = CAT_IMG[d.category];
  return { ...d, image: arr[idx % arr.length] };
});

/* ---- Asserted counts (spec: recompute from data after Petpooja re-extraction) ---- */
export const menuCounts = {
  total: menu.length,
  veg: menu.filter((d) => d.veg).length,
  chefPicks: menu.filter((d) => d.chefPick).length,
  bestsellers: menu.filter((d) => d.bestseller).length,
  byCategory: categories.reduce<Record<string, number>>((acc, c) => {
    acc[c.id] = menu.filter((d) => d.category === c.id).length;
    return acc;
  }, {}),
} as const;

export function dishesByCategory(cat: DishCategory): Dish[] {
  return menu.filter((d) => d.category === cat);
}
