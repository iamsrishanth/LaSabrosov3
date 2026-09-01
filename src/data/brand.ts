/**
 * LaSabroso brand canon — single source of truth for UI.
 * Verified 2026-08-31. Do NOT hardcode elsewhere.
 */

export const brand = {
  name: "LaSabroso",
  tagline: "Boho café, handcrafted in Madhapur",
  city: "Madhapur, Hyderabad",
  address: "Madhapur, Hyderabad, Telangana 500019",
  hours: "11:00 AM – 11:00 PM",
  hoursNote: "Open all seven days",
  phone: "+91 9182801364",
  phoneDisplay: "+91 91828 01364",
  instagram: "https://instagram.com/lasabroso_cafe",
  instagramHandle: "@lasabroso_cafe",
  reserveUrl: "https://instagram.com/lasabroso_cafe",
  reserveLabel: "Reserve your table",
  ratings: [
    { source: "Zomato", value: 4.3, count: 1158 },
    { source: "EazyDiner", value: 4.4, count: 1200 },
    { source: "Swiggy Dineout", value: 4.4, count: null },
    { source: "magicpin", value: 4.6, count: null },
  ],
  costForTwo: "₹1,200 – ₹2,000",
  mapQuery: "LaSabroso Cafe Madhapur Hyderabad",
  franchiseModel: "FOCO",
} as const;

export const partners = [
  { name: "Zomato", role: "Delivery + Dine-in", slug: "zomato", kind: "delivery" as const },
  { name: "Swiggy", role: "Delivery + Dineout", slug: "swiggy", kind: "delivery" as const },
  { name: "magicpin", role: "Delivery", slug: "magicpin", kind: "delivery" as const },
  { name: "Zomato District", role: "Dine-in deals · Flat 10–35%", slug: "zomato-district", kind: "dinein" as const },
  { name: "Swiggy Dineout", role: "Dine-in deals · Flat 10–35%", slug: "swiggy-dineout", kind: "dinein" as const },
] as const;

export const offers = [
  { label: "Flat 20% off on pre-booking", note: "Weekday dine-in" },
  { label: "Flat 35% off bulk events", note: "20+ guests" },
  { label: "Complimentary dessert", note: "Couples night, Thu" },
] as const;

export const events = [
  {
    title: "Corporate & Bulk Orders",
    desc: "Catered coffee bars and grazing boards for offices and team offsites across HITEC City.",
    perk: "Up to 35% off on bulk",
    icon: "Briefcase" as const,
  },
  {
    title: "Birthday & Private Dinners",
    desc: "Reserve the courtyard for intimate celebrations with a custom dessert lab counter.",
    perk: "Decor add-on included",
    icon: "Cake" as const,
  },
  {
    title: "Open Mic & Live Acoustic",
    desc: "Weekend evenings of acoustic sets and poetry on the boho outdoor deck.",
    perk: "No cover charge",
    icon: "MusicNotes" as const,
  },
] as const;

export const eventsAtmosphere = {
  image: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/1f9d8d218b10.jpg",
  caption: "The courtyard set for a birthday evening",
};

export const moments = [
  {
    title: "Laso Delights",
    desc: "Signature dessert counter",
    image: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/91d277b184a0.jpg",
    cluster: "Desserts",
  },
  {
    title: "Ice Cream Lab",
    desc: "Nitro and rolled creations",
    image: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/ee070bf2768f.jpg",
    cluster: "Ice Cream",
  },
  {
    title: "Courtyard Evenings",
    desc: "Fairy-lit boho outdoor seating",
    image: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/13a0b1df40d7.jpg",
    cluster: "Vibes",
  },
  {
    title: "Coffee Bar",
    desc: "Single-origin pour-overs",
    image: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/89cf361c1b33.jpg",
    cluster: "Coffee",
  },
  {
    title: "Wood-fired Pass",
    desc: "Hand-tossed pizzas, live",
    image: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/c3a7d4f5e18e.jpg",
    cluster: "Food",
  },
  {
    title: "Chandelier Nook",
    desc: "The most photographed corner",
    image: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/f6ca31dd8993.jpg",
    cluster: "Vibes",
  },
] as const;

export const testimonials = [
  {
    quote:
      "The chocolate khoma dessert is unreal. Easily the best café dessert I have had in Hyderabad.",
    name: "sathwik gopu",
    role: "Zomato review",
    rating: 5,
  },
  {
    quote:
      "Outdoor seating vibe is something else. Boho, fairy lights, great coffee. Came back twice in a week.",
    name: "Rohini Kumar",
    role: "EazyDiner review",
    rating: 5,
  },
  {
    quote:
      "Tucked away in Madhapur and worth every minute. The signature momos and cold brew are a must.",
    name: "Ananya R.",
    role: "magicpin review",
    rating: 4,
  },
] as const;

export const faqs = [
  {
    q: "Do you take reservations?",
    a: "Yes. DM us on Instagram (@lasabroso_cafe) with your name, date, guest count and preferred time. We confirm within minutes during open hours and hold your table for 15 minutes past the booking.",
    icon: "CalendarCheck" as const,
  },
  {
    q: "Is parking available?",
    a: "Yes. Two-wheeler and four-wheeler parking is available in the lane right outside the café. For larger groups, the Madhapur main road has ample paid parking within a 2-minute walk.",
    icon: "Car" as const,
  },
  {
    q: "Is the café pet-friendly?",
    a: "Well-behaved, leashed pets are welcome in the outdoor courtyard seating. We keep a water bowl ready. Indoor seating is reserved for humans to keep the dessert lab counter hygienic.",
    icon: "PawPrint" as const,
  },
  {
    q: "Do you have free Wi-Fi?",
    a: "Yes. Complimentary high-speed Wi-Fi for all guests. Ask the counter for the current password. Power outlets are available at most window seats, ideal for remote work over a cold brew.",
    icon: "WifiHigh" as const,
  },
  {
    q: "Can you host private events or bulk orders?",
    a: "Absolutely. We cater corporate offsites, birthdays and team dinners for 20 to 60 guests, with up to 35% off on bulk. Custom menus, live counters and a dessert lab setup are all available.",
    icon: "Users" as const,
  },
  {
    q: "What payment methods do you accept?",
    a: "All major UPI apps (GPay, PhonePe, Paytm), credit and debit cards, and cash. Dine-in deals from Zomato District and Swiggy Dineout give flat 10 to 35% off your bill.",
    icon: "CreditCard" as const,
  },
] as const;

export const instagramFeed = [
  {
    image: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/91d277b184a0.jpg",
    caption: "Chocolate Khoma, fresh from the lab",
    likes: 412,
  },
  {
    image: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/89cf361c1b33.jpg",
    caption: "Spanish latte, double shot",
    likes: 328,
  },
  {
    image: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/c3a7d4f5e18e.jpg",
    caption: "Wood-fired, hand-tossed",
    likes: 501,
  },
  {
    image: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/13a0b1df40d7.jpg",
    caption: "Courtyard evenings, fairy-lit",
    likes: 389,
  },
  {
    image: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/f6ca31dd8993.jpg",
    caption: "The chandelier nook",
    likes: 445,
  },
  {
    image: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/ee070bf2768f.jpg",
    caption: "Rolled ice cream, made live",
    likes: 367,
  },
] as const;
