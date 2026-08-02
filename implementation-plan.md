# LeafGains — Full Website Implementation Plan v3
> Scroll-triggered Fan Carousel + All Pages + ENV Image URLs | React + GSAP

---

## 🗂️ Tech Stack

| Tool | Purpose |
|---|---|
| React (Vite) | UI framework |
| GSAP + ScrollTrigger | All scroll-based animations |
| GSAP Draggable | Drag interaction on carousel cards |
| React Router DOM | Multi-page routing |
| CSS Modules | Scoped component styling |

```bash
npm create vite@latest leafgains-site -- --template react
cd leafgains-site
npm install gsap react-router-dom
```

---

## 🎨 Design Tokens — `src/styles/tokens.css`

> Colors updated from final Figma draft analysis

```css
:root {
  /* Colors — from final Figma draft */
  --green-deep:   #003A03;   /* dark sections, footer */
  --green-mid:    #2E6B27;   /* mid green */
  --green-fresh:  #91D883;   /* highlights, tags */
  --green-light:  #B0F49F;   /* light accents */
  --green-pale:   #C0C9B9;   /* subtle borders */
  --cream:        #FFF9E6;   /* main background */
  --cream-warm:   #F4EED6;   /* section 2 background */
  --cream-card:   #FAF4DC;   /* card backgrounds */
  --ink:          #1E1C0E;   /* primary text (near-black warm) */
  --ink-soft:     #41493D;   /* secondary text */
  --neon:         #95FF00;   /* CTA button accent */
  --white:        #FFFFFF;

  /* Typography */
  --font-display: 'DM Serif Display', serif;
  --font-body:    'Inter', sans-serif;
  --font-label:   'Space Grotesk', sans-serif;

  /* Spacing (8px grid) */
  --space-xs:  4px;   --space-sm:  8px;
  --space-md:  16px;  --space-lg:  24px;
  --space-xl:  48px;  --space-2xl: 80px;

  /* Radius */
  --radius-sm: 8px;   --radius-md: 16px;
  --radius-lg: 24px;  --radius-xl: 32px;
}
```

Add to `index.html` `<head>`:
```html
<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:wght@300;400;500;600&family=Space+Grotesk:wght@400;500;700&display=swap" rel="stylesheet">
```

---

## 🖼️ Image Management via ENV Variables

### `.env` (never commit to GitHub)
```env
VITE_HERO_BG_URL=your_unsplash_url_here
VITE_ABOUT_IMG_URL=your_unsplash_url_here
VITE_FEATURE_SIP_URL=your_unsplash_url_here
VITE_FEATURE_MARKET_URL=your_unsplash_url_here
VITE_FEATURE_PORTFOLIO_URL=your_unsplash_url_here
```

### `.env.example` (commit this to GitHub)
```env
# Copy this file to .env and fill in your Unsplash URLs
VITE_HERO_BG_URL=
VITE_ABOUT_IMG_URL=
VITE_FEATURE_SIP_URL=
VITE_FEATURE_MARKET_URL=
VITE_FEATURE_PORTFOLIO_URL=
```

### `.gitignore` — add these lines
```
.env
.env.local
.env.*.local
```

### `src/data/images.js` — single source of truth
```js
// All image URLs loaded from environment variables
// To update images: edit .env file only, no code changes needed

export const images = {
  heroBg:          import.meta.env.VITE_HERO_BG_URL,
  about:           import.meta.env.VITE_ABOUT_IMG_URL,
  featureSip:      import.meta.env.VITE_FEATURE_SIP_URL,
  featureMarket:   import.meta.env.VITE_FEATURE_MARKET_URL,
  featurePortfolio:import.meta.env.VITE_FEATURE_PORTFOLIO_URL,
};
```

### Usage in components
```jsx
import { images } from "../data/images";

// As CSS background
<section style={{ backgroundImage: `url(${images.heroBg})` }} />

// As img tag
<img src={images.about} alt="About LeafGains" loading="lazy" />

// In features array
const features = [
  { img: images.featureSip,       title: "SIP Calculator"    },
  { img: images.featureMarket,    title: "Market Insights"   },
  { img: images.featurePortfolio, title: "Portfolio Tracker" },
];
```

> **Note:** Vite requires `VITE_` prefix for all env variables exposed to the frontend.
> `import.meta.env` is Vite's way of accessing them (not `process.env`).

---

## 📁 Full Folder Structure

```
leafgains-site/
├── .env                      ← your URLs (gitignored)
├── .env.example              ← template (committed to GitHub)
├── .gitignore
├── index.html
├── vite.config.js
├── package.json
└── src/
    ├── styles/
    │   └── tokens.css
    ├── data/
    │   ├── images.js         ← all env image URLs
    │   ├── cards.js          ← market cards data
    │   └── blogPosts.js      ← blog posts data
    ├── components/
    │   ├── Navbar/
    │   │   ├── Navbar.jsx
    │   │   └── Navbar.module.css
    │   ├── FanCarousel/
    │   │   ├── FanCarousel.jsx
    │   │   └── FanCarousel.module.css
    │   ├── MarketCard/
    │   │   ├── MarketCard.jsx
    │   │   └── MarketCard.module.css
    │   ├── TickerStrip/
    │   │   ├── TickerStrip.jsx
    │   │   └── TickerStrip.module.css
    │   ├── BlogCard/
    │   │   ├── BlogCard.jsx
    │   │   └── BlogCard.module.css
    │   ├── ContactForm/
    │   │   ├── ContactForm.jsx
    │   │   └── ContactForm.module.css
    │   └── Footer/
    │       ├── Footer.jsx
    │       └── Footer.module.css
    ├── pages/
    │   ├── Home.jsx
    │   ├── About.jsx
    │   ├── Blog.jsx
    │   └── Contact.jsx
    ├── App.jsx
    └── main.jsx
```

---

## 🗺️ App Routing — `App.jsx`

```jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home    from "./pages/Home";
import About   from "./pages/About";
import Blog    from "./pages/Blog";
import Contact from "./pages/Contact";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"        element={<Home />}    />
        <Route path="/about"   element={<About />}   />
        <Route path="/blog"    element={<Blog />}    />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}
```

---

## 📄 PAGE 1 — Home (`pages/Home.jsx`)

### Full Page Scroll Flow

```
┌─────────────────────────────────────┐  bg: dark green + hero image
│  SECTION 1: Hero  (~880px)          │  VITE_HERO_BG_URL as background
│  Navbar + Headline + CTAs           │  #95FF00 neon CTA button
└────────────────┬────────────────────┘
                 ↓ scroll
┌────────────────▼────────────────────┐  bg: #003A03 deep green
│  SECTION 2: Ticker Strip            │  infinite scroll market data
└────────────────┬────────────────────┘
                 ↓ scroll
┌────────────────▼────────────────────┐  bg: #F4EED6 warm cream
│  SECTION 3: Fan Carousel  (pinned)  │  ScrollTrigger pin 600px
│  "Today's Market Picks"             │  cards fly in → fan spread
└────────────────┬────────────────────┘
                 ↓ scroll
┌────────────────▼────────────────────┐  bg: #FFF9E6 cream
│  SECTION 4: Features                │  3 cards with env images
│  SIP · Market · Portfolio           │  stagger fade-up on scroll
└────────────────┬────────────────────┘
                 ↓ scroll
┌────────────────▼────────────────────┐  bg: #003A03 deep green
│  SECTION 5: Testimonials / CTA      │  slide in from sides
└────────────────┬────────────────────┘
                 ↓ scroll
┌────────────────▼────────────────────┐  bg: #FAF4DC pale card
│  SECTION 6: Stats / Social proof    │  counter animation on scroll
└────────────────┬────────────────────┘
                 ↓ scroll
┌────────────────▼────────────────────┐  bg: #003A03 deep green
│  Footer                             │  Instagram + email links
└─────────────────────────────────────┘
```

---

### Section 1 — Hero

```jsx
import { images } from "../data/images";

<section
  className={styles.hero}
  style={{ backgroundImage: `url(${images.heroBg})` }}
>
  <div className={styles.overlay} />   {/* dark overlay for text readability */}
  <Navbar />
  <div className={styles.heroContent}>
    <span className={styles.eyebrow}>Growth Reimagined</span>
    <h1>Grow Your Wealth,<br /><em>Naturally.</em></h1>
    <p>LeafGains blends the stability of traditional finance with the
       vitality of organic growth.</p>
    <div className={styles.actions}>
      <button className={styles.btnNeon}>Start Investing ↗</button>
      <button className={styles.btnGhost}>Learn More</button>
    </div>
  </div>
</section>
```

**CSS:**
```css
.hero {
  min-height: 100vh;
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  flex-direction: column;
}
.overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 58, 3, 0.55);   /* green-tinted dark overlay */
}
.btnNeon {
  background: #95FF00;
  color: var(--ink);
  font-family: var(--font-label);
  font-weight: 700;
  border: none;
  border-radius: 999px;
  padding: 14px 28px;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}
.btnNeon:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(149,255,0,0.35); }
.btnGhost {
  background: transparent;
  color: var(--white);
  border: 1.5px solid rgba(255,255,255,0.5);
  border-radius: 999px;
  padding: 14px 28px;
  cursor: pointer;
  transition: border-color 0.2s;
}
```

**GSAP entry timeline:**
```js
useEffect(() => {
  gsap.registerPlugin(ScrollTrigger);
  const tl = gsap.timeline();
  tl.fromTo(".eyebrow",  { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 })
    .fromTo(".hero h1",  { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.2")
    .fromTo(".hero p",   { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, "-=0.3")
    .fromTo(".actions",  { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4 }, "-=0.2");
}, []);
```

---

### Section 2 — Ticker Strip

```js
const tickerItems = [
  { label: "SENSEX",    value: "73,842",      change: "+0.62%", up: true  },
  { label: "NIFTY 50",  value: "22,419",      change: "+0.81%", up: true  },
  { label: "GOLD",      value: "₹71,240/10g", change: "+0.3%",  up: true  },
  { label: "USD/INR",   value: "83.42",       change: "-0.1%",  up: false },
  { label: "HDFC BANK", value: "₹1,842",      change: "+1.2%",  up: true  },
  { label: "RELIANCE",  value: "₹2,961",      change: "-0.4%",  up: false },
  { label: "BITCOIN",   value: "$67,400",     change: "+2.1%",  up: true  },
];
```

**GSAP infinite loop:**
```js
useEffect(() => {
  const track = tickerRef.current;
  track.innerHTML += track.innerHTML;
  gsap.to(track, { x: "-50%", duration: 25, ease: "none", repeat: -1 });
}, []);
```

---

### Section 3 — Scroll-Triggered Fan Carousel ⭐

**ScrollTrigger pin setup:**
```js
useEffect(() => {
  gsap.registerPlugin(ScrollTrigger, Draggable);

  ScrollTrigger.create({
    trigger: carouselSectionRef.current,
    start: "top top",
    end: "+=600",
    pin: true,
    onEnter:     () => animateCardsIn(),
    onLeaveBack: () => animateCardsOut(),
  });
}, []);
```

**Cards fly-in (on scroll enter):**
```js
const animateCardsIn = () => {
  gsap.fromTo(cardRefs.current,
    { y: 200, opacity: 0, scale: 0.7, rotation: 0 },
    {
      y: 0, opacity: 1, scale: 1,
      duration: 0.8, stagger: 0.1, ease: "back.out(1.5)",
      onComplete: () => animateFan(activeIndex),
    }
  );
};
```

**Fan spread:**
```js
const animateFan = (activeIndex) => {
  cardRefs.current.forEach((card, i) => {
    const offset = i - activeIndex;
    gsap.to(card, {
      x:        offset * 180,
      rotation: offset * 8,
      scale:    offset === 0 ? 1.08 : 1 - Math.abs(offset) * 0.08,
      opacity:  Math.abs(offset) > 2 ? 0 : 1 - Math.abs(offset) * 0.15,
      y:        Math.abs(offset) * 12,
      zIndex:   10 - Math.abs(offset),
      duration: 0.55,
      ease:     "power3.out",
    });
  });
};
```

**Draggable:**
```js
Draggable.create(trackRef.current, {
  type: "x", inertia: true,
  onDragEnd: function() {
    const delta = this.endX - this.startX;
    if (delta < -50)     setActiveIndex(p => Math.min(p + 1, cards.length - 1));
    else if (delta > 50) setActiveIndex(p => Math.max(p - 1, 0));
  },
});
```

**Keyboard:**
```js
useEffect(() => {
  const onKey = (e) => {
    if (e.key === "ArrowRight") setActiveIndex(p => Math.min(p + 1, cards.length - 1));
    if (e.key === "ArrowLeft")  setActiveIndex(p => Math.max(p - 1, 0));
  };
  window.addEventListener("keydown", onKey);
  return () => window.removeEventListener("keydown", onKey);
}, []);
```

**Market cards data — `src/data/cards.js`:**
```js
export const marketCards = [
  { id:1, tag:"Market",       tagColor:"#91D883", title:"NIFTY 50 Today",    subtitle:"IT and Banking lead gains",            value:"+0.8%",     trend:"up",      bg:"linear-gradient(135deg, #003A03, #2E6B27)" },
  { id:2, tag:"Mutual Funds", tagColor:"#C9A84C", title:"SIP of the Week",   subtitle:"Mirae Asset Large Cap — 5yr returns",  value:"12.4% CAGR",trend:"up",      bg:"linear-gradient(135deg, #2E6B27, #91D883)" },
  { id:3, tag:"Equity",       tagColor:"#B0F49F", title:"Stock Spotlight",   subtitle:"HDFC Bank — Strong Q2, analysts bullish",value:"₹1,842",  trend:"up",      bg:"linear-gradient(135deg, #003A03, #41493D)" },
  { id:4, tag:"Economy",      tagColor:"#F4EED6", title:"Macro Update",      subtitle:"RBI holds repo rate at 6.5%",          value:"6.5%",      trend:"neutral", bg:"linear-gradient(135deg, #1E1C0E, #003A03)" },
  { id:5, tag:"Learn",        tagColor:"#C0C9B9", title:"Beginner's Corner", subtitle:"What is an Index Fund?",               value:"5 min read",trend:"neutral", bg:"linear-gradient(135deg, #41493D, #2E6B27)" },
];
```

---

### Section 4 — Features

```jsx
import { images } from "../data/images";

const features = [
  { img: images.featureSip,        title: "SIP Calculator",    desc: "Plan your monthly investments and see long-term growth projections." },
  { img: images.featureMarket,     title: "Market Insights",   desc: "Daily curated analysis of indices, sectors, and top movers."        },
  { img: images.featurePortfolio,  title: "Portfolio Tracker", desc: "Monitor your holdings across mutual funds and equity in one place."  },
];
```

**Scroll animation:**
```js
gsap.fromTo(".feature-card",
  { y: 60, opacity: 0 },
  { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: "power2.out",
    scrollTrigger: { trigger: ".features-section", start: "top 75%" }
  }
);
```

**Card CSS:**
```css
.featureCard {
  border: 1px solid var(--green-pale);
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: var(--cream-card);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.featureCard:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 48px rgba(0, 58, 3, 0.12);
}
.featureCard img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}
```

---

### Section 5 — Testimonials / CTA (dark green `#003A03`)

```js
// Slide in from opposite sides
gsap.fromTo(".testimonial:nth-child(odd)",
  { x: -60, opacity: 0 },
  { x: 0, opacity: 1, duration: 0.7,
    scrollTrigger: { trigger: ".testimonials", start: "top 80%" } }
);
gsap.fromTo(".testimonial:nth-child(even)",
  { x: 60, opacity: 0 },
  { x: 0, opacity: 1, duration: 0.7,
    scrollTrigger: { trigger: ".testimonials", start: "top 80%" } }
);
```

---

## 📄 PAGE 2 — About (`pages/About.jsx`)

```jsx
import { images } from "../data/images";
```

### Sections

```
┌─────────────────────────────────────┐  bg: #003A03
│  Hero: Mission statement            │  large serif text, white
│  "We make investing feel natural"   │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐  bg: #FFF9E6
│  Story: "Why LeafGains?"            │
│  Left: VITE_ABOUT_IMG_URL  │  Right: timeline
│  Timeline line draws on scroll      │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐  bg: #F4EED6
│  Values: 3 pillars                  │
│  Transparency · Growth · Simplicity │
└─────────────────────────────────────┘
│  Footer                             │
```

**About image usage:**
```jsx
<div className={styles.storyLayout}>
  <div className={styles.imageWrap}>
    <img
      src={images.about}
      alt="LeafGains story"
      loading="lazy"
      className={styles.storyImg}
    />
  </div>
  <div className={styles.timeline}>
    {/* timeline items */}
  </div>
</div>
```

**Timeline draw animation:**
```js
gsap.fromTo(".timeline-line",
  { scaleY: 0, transformOrigin: "top center" },
  { scaleY: 1, duration: 1.2, ease: "power2.inOut",
    scrollTrigger: { trigger: ".story-section", start: "top 60%" } }
);
gsap.fromTo(".timeline-item",
  { x: 40, opacity: 0 },
  { x: 0, opacity: 1, stagger: 0.2, duration: 0.6,
    scrollTrigger: { trigger: ".story-section", start: "top 60%" } }
);
```

---

## 📄 PAGE 3 — Blog (`pages/Blog.jsx`)

### Blog Data — `src/data/blogPosts.js`

> No env images needed here — use Unsplash direct URLs as fallback or leave as placeholder

```js
export const blogPosts = [
  { id:1, tag:"Beginner",     title:"What is a SIP? Everything You Need to Know",         date:"Jan 12, 2025", readTime:5,  excerpt:"Systematic Investment Plans explained for first-time investors."     },
  { id:2, tag:"Equity",       title:"Top 5 Stocks to Watch in Q1 2025",                    date:"Jan 18, 2025", readTime:7,  excerpt:"Our analysts break down the most promising equity picks."            },
  { id:3, tag:"Mutual Funds", title:"Large Cap vs Mid Cap: Which is Right for You?",       date:"Jan 25, 2025", readTime:6,  excerpt:"Understanding risk profiles and matching them to fund categories."   },
  { id:4, tag:"Economy",      title:"RBI Rate Hold: What It Means for Your Portfolio",     date:"Feb 3, 2025",  readTime:4,  excerpt:"Breaking down the signals from RBI's latest policy decision."        },
  { id:5, tag:"Beginner",     title:"Index Funds vs Active Funds: The Great Debate",       date:"Feb 10, 2025", readTime:8,  excerpt:"Passive vs active investing — which strategy wins long-term?"        },
  { id:6, tag:"Equity",       title:"HDFC Bank Q3 Results: Analysis & Outlook",            date:"Feb 17, 2025", readTime:5,  excerpt:"Deep dive into HDFC Bank's quarterly performance and outlook."       },
];
```

**Filter tabs:**
```js
const [activeTag, setActiveTag] = useState("All");
const tags = ["All", "Equity", "Mutual Funds", "Economy", "Beginner"];
const filtered = activeTag === "All" ? blogPosts : blogPosts.filter(p => p.tag === activeTag);

const switchFilter = (tag) => {
  gsap.fromTo(".blog-grid", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" });
  setActiveTag(tag);
};
```

---

## 📄 PAGE 4 — Contact (`pages/Contact.jsx`)

### Form with validation + GSAP feedback

```js
const [form, setForm]     = useState({ name: "", email: "", message: "" });
const [status, setStatus] = useState("idle"); // idle | sending | sent | error

const validate = () => {
  if (form.name.length < 2)                          return "Name too short";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return "Invalid email";
  if (form.message.length < 10)                      return "Message too short";
  return null;
};

const handleSubmit = (e) => {
  e.preventDefault();
  const error = validate();
  if (error) {
    // Shake animation on error
    gsap.fromTo(formRef.current,
      { x: -8 },
      { x: 0, duration: 0.4, ease: "elastic.out(1, 0.3)", repeat: 3, yoyo: true }
    );
    return;
  }
  setStatus("sending");
  setTimeout(() => setStatus("sent"), 1500); // simulate API
};

// Success animation
useEffect(() => {
  if (status === "sent") {
    gsap.fromTo(".success-msg",
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.4)" }
    );
  }
}, [status]);
```

---

## 🦶 Footer (`components/Footer/Footer.jsx`)

```jsx
<footer className={styles.footer}>   {/* bg: #003A03 */}
  <div className={styles.top}>
    <div className={styles.brand}>
      <span className={styles.logo}>🌿 LeafGains</span>
      <p>Grow your wealth, naturally.</p>
    </div>
    <nav className={styles.links}>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/blog">Blog</Link>
      <Link to="/contact">Contact</Link>
    </nav>
    <div className={styles.socials}>
      <a href="https://instagram.com/leaf_gains_finance" target="_blank" rel="noreferrer">Instagram</a>
      <a href="mailto:contact@leafgains.com">Email</a>
    </div>
  </div>
  <div className={styles.bottom}>
    <p>© 2025 LeafGains Finance. All rights reserved.</p>
  </div>
</footer>
```

---

## 🎬 Complete Animation Master Table

| # | Page | Element | Animation | Trigger | GSAP |
|---|---|---|---|---|---|
| 1 | Home | Navbar | Slide down + fade | Page load | `timeline` |
| 2 | Home | Hero text sequence | Eyebrow→H1→p→CTAs fade up | Page load | `timeline` |
| 3 | Home | Ticker strip | Infinite scroll left | Page load | `repeat:-1` |
| 4 | Home | Carousel cards | Fly in from below, stagger | ScrollTrigger onEnter | `fromTo` |
| 5 | Home | Fan spread | Rotate + x after fly-in | onComplete of fly-in | `to` per card |
| 6 | Home | Card switch | Reposition all cards | Click/drag/keyboard | `to` per card |
| 7 | Home | Feature cards | Stagger fade up | ScrollTrigger 75% | `fromTo` |
| 8 | Home | Testimonials | Slide from opposite sides | ScrollTrigger 80% | `fromTo` |
| 9 | About | Timeline line | Draw scaleY 0→1 | ScrollTrigger 60% | `fromTo` |
| 10 | About | Timeline items | Stagger slide right | ScrollTrigger 60% | `fromTo` |
| 11 | About | Value cards | Stagger fade up | ScrollTrigger 75% | `fromTo` |
| 12 | Blog | Grid on filter switch | Fade + slide up | Tab click | `fromTo` |
| 13 | Contact | Form entry | Fade up | ScrollTrigger | `fromTo` |
| 14 | Contact | Validation fail | Shake | Submit error | `elastic.out` |
| 15 | Contact | Success state | Scale pop | status==="sent" | `back.out` |

---

## 📱 Responsive Breakpoints

```css
/* Tablet ≤ 1024px */
@media (max-width: 1024px) {
  .hero              { flex-direction: column; }
  .carouselStage     { height: 380px; }
  .storyLayout       { flex-direction: column; }
  /* Fan: card 260×340px, spread 140px, rotation 6deg */
}

/* Mobile ≤ 640px */
@media (max-width: 640px) {
  .carouselStage     { height: 320px; }
  /* Fan: card 220×300px, spread 100px, rotation 5deg */
  /* Hide cards where |offset| > 1 */
  .blogGrid          { grid-template-columns: 1fr; }
  .ticker            { font-size: 11px; }
}
```

---

## ✅ Pre-Evaluation Checklist

**Setup:**
- [ ] `.env` file created with all 5 image URLs filled in
- [ ] `.env.example` committed to GitHub (empty values)
- [ ] `.env` added to `.gitignore`
- [ ] `gsap.registerPlugin(ScrollTrigger, Draggable)` in `main.jsx`

**Functionality:**
- [ ] Fan carousel: drag ✓ click ✓ keyboard ✓ dots ✓
- [ ] ScrollTrigger pin works (carousel stays while scrolling)
- [ ] Ticker loops with zero visible jump
- [ ] Navbar changes style on scroll (blur + dark bg)
- [ ] All 4 routes working (`/` `/about` `/blog` `/contact`)
- [ ] Contact form validation + shake on error + success pop
- [ ] `prefers-reduced-motion` respected

**Images:**
- [ ] Hero background loading from `VITE_HERO_BG_URL`
- [ ] About image loading from `VITE_ABOUT_IMG_URL`
- [ ] Feature images loading from respective env vars
- [ ] All `<img>` tags have `alt` text + `loading="lazy"`

**Polish:**
- [ ] No horizontal overflow on mobile (375px)
- [ ] No console errors or warnings
- [ ] Tested on Chrome + Firefox

---

## 🚀 Code Generation Prompt (paste into Claude / Cursor / Copilot)

```
Build a full React + GSAP website for LeafGains Finance with 4 pages: Home, About, Blog, Contact.

TECH STACK: React (Vite), GSAP + ScrollTrigger + Draggable, React Router DOM, CSS Modules.
No external UI libraries.

IMAGE MANAGEMENT:
- All images loaded via Vite env variables (import.meta.env.VITE_*)
- Create src/data/images.js that exports: { heroBg, about, featureSip, featureMarket, featurePortfolio }
- Create .env.example with empty VITE_HERO_BG_URL, VITE_ABOUT_IMG_URL, VITE_FEATURE_SIP_URL,
  VITE_FEATURE_MARKET_URL, VITE_FEATURE_PORTFOLIO_URL
- Add .env to .gitignore

DESIGN TOKENS (src/styles/tokens.css):
  --green-deep #003A03 | --green-mid #2E6B27 | --green-fresh #91D883
  --cream #FFF9E6 | --cream-warm #F4EED6 | --cream-card #FAF4DC
  --ink #1E1C0E | --ink-soft #41493D | --neon #95FF00
  Fonts: DM Serif Display (headings) · Inter (body) · Space Grotesk (labels)

HOME PAGE (7 sections):
1. Hero (100vh) — backgroundImage from images.heroBg with dark green overlay.
   Headline "Grow Your Wealth, Naturally.", #95FF00 neon CTA "Start Investing ↗", ghost "Learn More".
   GSAP timeline: eyebrow → h1 → p → buttons fade up sequentially on mount.
2. Ticker Strip — bg #003A03, infinite GSAP scroll (SENSEX, NIFTY, GOLD, USD/INR, HDFC, RELIANCE, BTC).
3. Fan Carousel (100vh, bg #F4EED6) — ScrollTrigger PIN (end: +=600). On enter: 5 cards fly in
   from y:200 with stagger back.out(1.5), then spread into fan (offset*180px x, offset*8deg rotation,
   active scale 1.08). GSAP Draggable + keyboard arrows + dot indicators.
   Cards: NIFTY/SIP/Stock Spotlight/RBI Update/Beginner's Corner with green gradient backgrounds.
4. Features (bg #FFF9E6) — 3 cards using images.featureSip/featureMarket/featurePortfolio.
   ScrollTrigger stagger fade-up. Hover: translateY(-6px) + shadow.
5. Testimonials (bg #003A03) — 2 quotes slide in from opposite sides on scroll.
6. Stats (bg #FAF4DC) — 3 number counters animate on scroll.
7. Footer (bg #003A03) — Logo, nav links, Instagram + email.

ABOUT PAGE:
- Hero (bg #003A03): mission statement in large DM Serif white text.
- Story (bg #FFF9E6): left = <img src={images.about} loading="lazy">, right = timeline.
  Timeline vertical line draws (scaleY 0→1) + items stagger slide in on ScrollTrigger.
- Values (bg #F4EED6): 3 cards (Transparency, Growth, Simplicity) stagger fade-up.
- Footer.

BLOG PAGE:
- Header + filter tabs (All/Equity/Mutual Funds/Economy/Beginner).
- 2-col card grid. Filter switch: GSAP fade+slide grid. 6 Indian finance blog posts.

CONTACT PAGE:
- 2-col: left = form (name/email/message), right = info panel (email + instagram).
- JS validation: name>2chars, valid email regex, message>10chars.
- On error: GSAP elastic shake. On success: scale pop animation.

Fully responsive (mobile 375px). All img tags: alt + loading="lazy".
Register GSAP plugins in main.jsx: gsap.registerPlugin(ScrollTrigger, Draggable).
```