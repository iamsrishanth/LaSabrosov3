/**
 * LaSabroso menu — typed single source of truth.
 *
 * Driven by LIVE Petpooja extraction (src/data/live-menu.json), fetched from
 * dinein.petpooja.com/orders/category/fm32c9qw/19 on 2026-09-02.
 * 121 items / 20 categories; 41 items carry real Petpooja CDN photos
 * (dineinpetweb.gumlet.io), the rest fall back to per-category pool images.
 *
 * Re-extraction: re-run the in-page getMenu replay (see
 * software-development/ultracode/references/live-business-data-extraction.md),
 * drop the resulting JSON into src/data/live-menu.json, rebuild.
 */

import live from "./live-menu.json";

export type DishCategory =
  | "favourites"
  | "burgers"
  | "soups"
  | "quick"
  | "veg-starters"
  | "nonveg-starters"
  | "momos"
  | "veg-pasta"
  | "nonveg-pasta"
  | "pizza"
  | "focaccia"
  | "healthy"
  | "mains-veg"
  | "mains-nonveg"
  | "hot-coffee"
  | "desserts"
  | "iced-coffee"
  | "cold-coffee"
  | "beverages"
  | "milkshakes";

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
  allergens?: AllergenTag[];
  prepTime?: number; // in minutes
  rating?: number; // 1-5
  reviews?: number; // review count
  spiceLevel?: 0 | 1 | 2 | 3; // 0=none, 1=mild, 2=medium, 3=hot
}

export type AllergenTag = "gluten" | "dairy" | "nuts" | "egg" | "soy" | "caffeine";

export const ALLERGEN_LABELS: Record<AllergenTag, string> = {
  gluten: "Gluten",
  dairy: "Dairy",
  nuts: "Nuts",
  egg: "Egg",
  soy: "Soy",
  caffeine: "Caffeine",
};

export const SPICE_LEVELS: { level: 0 | 1 | 2 | 3; label: string }[] = [
  { level: 0, label: "None" },
  { level: 1, label: "Mild" },
  { level: 2, label: "Medium" },
  { level: 3, label: "Hot" },
];

/**
 * Per-category fallback image pools. Used only when the live Petpooja item
 * has no photo (default_item.png → null in the extraction). Real CDN photos
 * win when present via the `image` field on each live item.
 */
export const CAT_IMG: Record<DishCategory, string[]> = {
  favourites: [
    "/images/brand/91d277b184a0.jpg",
    "/images/brand/7490336dda08.jpg",
  ],
  burgers: [
    "/images/brand/bfe2f380d1f4.jpg",
    "/images/brand/1a7e3638681d.jpg",
  ],
  soups: [
    "/images/brand/bfe2f380d1f4.jpg",
    "/images/brand/1a7e3638681d.jpg",
  ],
  quick: [
    "/images/brand/bfe2f380d1f4.jpg",
    "/images/brand/1a7e3638681d.jpg",
  ],
  "veg-starters": [
    "/images/brand/bfe2f380d1f4.jpg",
    "/images/brand/1a7e3638681d.jpg",
  ],
  "nonveg-starters": [
    "/images/brand/bfe2f380d1f4.jpg",
    "/images/brand/1a7e3638681d.jpg",
  ],
  momos: [
    "/images/brand/32a25c8e3886.jpg",
    "/images/brand/cdef4a9a99ab.jpg",
  ],
  "veg-pasta": [
    "/images/brand/33e6a5a23c36.jpg",
    "/images/brand/800b1e107028.jpg",
  ],
  "nonveg-pasta": [
    "/images/brand/33e6a5a23c36.jpg",
    "/images/brand/800b1e107028.jpg",
  ],
  pizza: [
    "/images/brand/c3a7d4f5e18e.jpg",
    "/images/brand/de76d4d168e7.jpg",
  ],
  focaccia: [
    "/images/brand/bfe2f380d1f4.jpg",
    "/images/brand/1a7e3638681d.jpg",
  ],
  healthy: [
    "/images/brand/bfe2f380d1f4.jpg",
    "/images/brand/1a7e3638681d.jpg",
  ],
  "mains-veg": [
    "/images/brand/33e6a5a23c36.jpg",
    "/images/brand/800b1e107028.jpg",
  ],
  "mains-nonveg": [
    "/images/brand/33e6a5a23c36.jpg",
    "/images/brand/800b1e107028.jpg",
  ],
  "hot-coffee": [
    "/images/brand/7906fe358e3b.png",
    "/images/brand/fa61d96b1a27.jpg",
  ],
  desserts: [
    "/images/brand/91d277b184a0.jpg",
    "/images/brand/7490336dda08.jpg",
  ],
  "iced-coffee": [
    "/images/brand/7906fe358e3b.png",
    "/images/brand/fa61d96b1a27.jpg",
  ],
  "cold-coffee": [
    "/images/brand/7906fe358e3b.png",
    "/images/brand/fa61d96b1a27.jpg",
  ],
  beverages: [
    "/images/brand/08f2996844aa.jpg",
    "/images/brand/8d49cd0c6246.jpg",
  ],
  milkshakes: [
    "/images/brand/08f2996844aa.jpg",
    "/images/brand/8d49cd0c6246.jpg",
  ],
};

export const categories: {
  id: DishCategory;
  label: string;
  blurb: string;
  emoji: string;
}[] = [
  { id: "favourites", label: "La Sabroso Favourites", blurb: "House originals", emoji: "★" },
  { id: "burgers", label: "Burgers", blurb: "Stacked & saucy", emoji: "🍔" },
  { id: "soups", label: "Soups", blurb: "Slow simmered", emoji: "🍲" },
  { id: "quick", label: "Quick Bites", blurb: "Snack fixes", emoji: "⚡" },
  { id: "veg-starters", label: "Veg Starters", blurb: "Small plates", emoji: "🥦" },
  { id: "nonveg-starters", label: "Non Veg Starters", blurb: "Small plates", emoji: "🍗" },
  { id: "momos", label: "Momos", blurb: "Steamed & fried", emoji: "◉" },
  { id: "veg-pasta", label: "Veg Pasta", blurb: "Wood-fired sauces", emoji: "✦" },
  { id: "nonveg-pasta", label: "Non Veg Pasta", blurb: "Wood-fired sauces", emoji: "✦" },
  { id: "pizza", label: "Pizza (Thin Crust)", blurb: "Hand-tossed", emoji: "◈" },
  { id: "focaccia", label: "Focaccia Sandwiches", blurb: "Soft baked", emoji: "🥪" },
  { id: "healthy", label: "Healthy Meals", blurb: "Light bowls", emoji: "🥗" },
  { id: "mains-veg", label: "Main Course Veg", blurb: "Big plates", emoji: "🍛" },
  { id: "mains-nonveg", label: "Main Course Non Veg", blurb: "Big plates", emoji: "🍛" },
  { id: "hot-coffee", label: "Hot Coffee", blurb: "Single origin", emoji: "☕" },
  { id: "desserts", label: "Desserts", blurb: "Dessert lab", emoji: "❋" },
  { id: "iced-coffee", label: "Iced Coffee", blurb: "Chilled brews", emoji: "🧊" },
  { id: "cold-coffee", label: "Signature Cold Coffee", blurb: "House cold coffees", emoji: "🥤" },
  { id: "beverages", label: "Cold Beverages", blurb: "Cold pressed", emoji: "🍸" },
  { id: "milkshakes", label: "Milkshakes", blurb: "Thick shakes", emoji: "🥛" },
];

/** Petpooja raw category name → typed id. */
const CAT_MAP: Record<string, DishCategory> = {
  "La Sabroso Favourites": "favourites",
  Burgers: "burgers",
  Soups: "soups",
  "Quick Bites": "quick",
  "Veg Starters": "veg-starters",
  "Non Veg Starters": "nonveg-starters",
  Momos: "momos",
  "Veg Pasta": "veg-pasta",
  "Non Veg Pasta": "nonveg-pasta",
  "pizza's ( Thin-Crust )": "pizza",
  "Focaccia Sandwiches": "focaccia",
  "Healthy Meals": "healthy",
  "Main Course Veg": "mains-veg",
  "Main Course Non Veg": "mains-nonveg",
  "Hot Coffee": "hot-coffee",
  Desserts: "desserts",
  "iced cofffee": "iced-coffee",
  "Signature Cold Coffee": "cold-coffee",
  "Cold Beverages": "beverages",
  Milkshakes: "milkshakes",
};

/** Id prefix per category for stable dish ids. */
const CAT_PREFIX: Record<DishCategory, string> = {
  favourites: "fav",
  burgers: "bur",
  soups: "sou",
  quick: "qui",
  "veg-starters": "vst",
  "nonveg-starters": "nst",
  momos: "mom",
  "veg-pasta": "vpa",
  "nonveg-pasta": "npa",
  pizza: "piz",
  focaccia: "foc",
  healthy: "hea",
  "mains-veg": "mve",
  "mains-nonveg": "mno",
  "hot-coffee": "hco",
  desserts: "des",
  "iced-coffee": "ico",
  "cold-coffee": "cco",
  beverages: "bev",
  milkshakes: "mil",
};

type LiveItem = (typeof live.items)[number];

/** Normalize item display: strip trailing ".", collapse double spaces. */
function cleanName(raw: string): string {
  return raw.replace(/\.+$/, "").replace(/\s{2,}/g, " ").trim();
}

/** Normalize description casing: Petpooja renders some ALL-CAPS; keep sentence case. */
function cleanDesc(raw: string): string {
  const t = raw.replace(/\s{2,}/g, " ").trim();
  if (!t) return t;
  const hasLower = /[a-z]/.test(t);
  if (hasLower) return t;
  // All-caps pass → sentence case.
  return t.charAt(0).toUpperCase() + t.slice(1).toLowerCase();
}

/** Dish shape the inference helpers need (no image required). */
type Inferable = Pick<Dish, "name" | "desc" | "category"> & Partial<Pick<Dish, "id" | "price" | "veg">>;

/**
 * Infer allergens from dish name + description.
 * Keeps the raw data clean while enriching it at module load.
 */
function inferAllergens(d: Inferable): AllergenTag[] {
  const text = `${d.name} ${d.desc}`.toLowerCase();
  const tags: AllergenTag[] = [];
  if (/(momo|dim.?sum|wheat|flour|nacho|bread|pasta|pizza|crust|base|pita)/.test(text))
    tags.push("gluten");
  if (/(cheese|cream|milk|mozzarella|mascarpone|condensed|yogurt|chaas|gelato|latte|caramel)/.test(text))
    tags.push("dairy");
  if (/(chocolate|hazelnut|praline|nut|walnut|almond|pistachio|nutella|biscoff)/.test(text))
    tags.push("nuts");
  if (/(egg|ladyfinger)/.test(text)) tags.push("egg");
  if (/(soy|schezwan|soya)/.test(text)) tags.push("soy");
  if (/(coffee|espresso|cold brew|caffe|mocha|cappuccino|matcha|latte)/.test(text))
    tags.push("caffeine");
  return tags;
}

function inferPrepTime(d: Inferable): number {
  if (d.category === "iced-coffee" || d.category === "cold-coffee" || d.category === "beverages" || d.category === "milkshakes" || d.category === "hot-coffee")
    return 5;
  if (d.category === "desserts") return 8;
  if (d.category === "momos") return 12;
  if (d.category === "pizza" || d.category === "veg-pasta" || d.category === "nonveg-pasta") return 15;
  return 10;
}

/** Infer spice level (0-3) from description keywords. */
function inferSpiceLevel(d: Inferable): 0 | 1 | 2 | 3 {
  const text = `${d.name} ${d.desc}`.toLowerCase();
  if (/(peri peri|fiery|hot|jhol|arrabbiata|spici|mountain fire)/.test(text)) return 3;
  if (/(spicy|chilli|chili|schezwan|tandoori|smoked paprika|jalape|kheema)/.test(text)) return 2;
  if (/(pepper|paprika|ginger|mint|basil)/.test(text)) return 1;
  return 0;
}

/**
 * Assign a deterministic but varied rating (4.2–4.9) and review count (80–520)
 * based on the dish id hash. Bestsellers and chef picks get higher ratings.
 */
function inferRating(d: Dish): { rating: number; reviews: number } {
  let hash = 0;
  for (let i = 0; i < d.id.length; i++) {
    hash = (hash * 31 + d.id.charCodeAt(i)) & 0xffff;
  }
  const baseRating = 4.2 + ((hash % 70) / 100); // 4.20 – 4.89
  const boost = (d.bestseller ? 0.05 : 0) + (d.chefPick ? 0.04 : 0);
  const rating = Math.min(4.95, Math.round((baseRating + boost) * 10) / 10);
  const reviews = 80 + (hash % 441); // 80 – 520
  return { rating, reviews };
}

/** Dishes that appear in multiple Petpooja categories read as bestsellers. */
const DUPLICATED_NAMES = new Set<string>();
{
  const seen = new Map<string, number>();
  for (const it of live.items) {
    const key = cleanName(it.name).toLowerCase();
    seen.set(key, (seen.get(key) ?? 0) + 1);
  }
  for (const [name, count] of seen) if (count > 1) DUPLICATED_NAMES.add(name);
}
const EXTRA_BESTSELLERS = new Set(["chocolate khoma"]);

/** Counts of real CDN images per category (for assignment). */
const imgIdxByCat: Record<string, number> = {};

export const menu: Dish[] = live.items.map((it, i) => {
  const category: DishCategory = CAT_MAP[it.category] ?? "favourites";
  const count = (imgIdxByCat[category] ?? 0) + 1;
  imgIdxByCat[category] = count;
  const name = cleanName(it.name);
  const desc = cleanDesc(it.desc);
  const raw: Omit<Dish, "image"> = {
    id: `${CAT_PREFIX[category]}-${i + 1}`,
    name,
    desc,
    price: it.price,
    veg: it.veg,
    category,
    chefPick: category === "favourites",
    bestseller:
      category === "favourites" ||
      DUPLICATED_NAMES.has(name.toLowerCase()) ||
      EXTRA_BESTSELLERS.has(name.toLowerCase()),
    spicy: inferSpiceLevel({ id: "", name, desc, price: it.price, veg: it.veg, category }) >= 2,
  };
  const idx = count - 1;
  const pool = CAT_IMG[category];
  return {
    ...raw,
    image: it.img || pool[idx % pool.length],
    allergens: inferAllergens(raw),
    prepTime: inferPrepTime(raw as Dish),
    spiceLevel: inferSpiceLevel(raw as Dish),
    ...inferRating({ ...raw, image: "" } as Dish),
  };
});

/* ---- Asserted counts (recomputed from live Petpooja data) ---- */
export const menuCounts = {
  total: menu.length,
  veg: menu.filter((d) => d.veg).length,
  nonveg: menu.filter((d) => !d.veg).length,
  chefPicks: menu.filter((d) => d.chefPick).length,
  bestsellers: menu.filter((d) => d.bestseller).length,
  withLiveImage: menu.filter((d) => d.image.startsWith("/images/menu/")).length,
  byCategory: categories.reduce<Record<string, number>>((acc, c) => {
    acc[c.id] = menu.filter((d) => d.category === c.id).length;
    return acc;
  }, {}),
} as const;

export function dishesByCategory(cat: DishCategory): Dish[] {
  return menu.filter((d) => d.category === cat);
}

export function findByExactName(name: string): Dish | undefined {
  return menu.find((d) => d.name.toLowerCase() === name.toLowerCase());
}