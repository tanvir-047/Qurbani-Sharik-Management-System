# SharikNama — Design Document
### Eid-ul-Adha Qurbani Management Platform · v2.0

---

## 1. Product Vision

SharikNama transforms the traditionally manual, paper-based, and often opaque process of Qurbani coordination into a **structured, trustworthy, and digitally documented experience**. It serves families, groups, and mosque committees who organize Eid-ul-Adha animal sharing — bringing transparency to every stage: from animal selection and shareholder registration, to meat distribution, delivery tracking, and digital receipts.

> **Mission:** Every Sharik deserves to know exactly what they're receiving. Every organizer deserves tools worthy of the task.

---

## 2. Target Users

| User Type | Context | Primary Need |
|---|---|---|
| **Family Organizer** | Managing 1–2 animals for extended family | Quick entry, share receipts via WhatsApp |
| **Mosque Committee** | 10–50 animals, 70–350 shareholders | Multi-animal overview, delivery tracking, payment monitoring |
| **Butcher / Slaughter Team** | Noisy environment, hands covered | Butcher Mode: big buttons, fast weight entry |
| **Individual Sharik** | Wants proof of their share | QR receipt, WhatsApp card |

---

## 3. Design Language

### 3.1 Philosophy
**"Sacred Precision"** — The app draws visual inspiration from the night sky of Eid — deep indigo darkness punctuated by the sharp emerald light of a new moon. Every element feels intentional, trustworthy, and calm under pressure.

### 3.2 Color Palette

| Token | Value | Usage |
|---|---|---|
| `--bg` | `#080C18` | App background |
| `--surface` | `#0F1628` | Card backgrounds |
| `--surface-2` | `#151E35` | Elevated cards, inner sections |
| `--surface-3` | `#1C2640` | Input backgrounds |
| `--primary` | `#00D09C` | CTA buttons, active states, icons |
| `--primary-dark` | `#00A87A` | Hover / pressed state |
| `--primary-glow` | `rgba(0,208,156,0.15)` | Card glow, highlight rings |
| `--primary-dim` | `rgba(0,208,156,0.08)` | Subtle backgrounds |
| `--text-1` | `#FFFFFF` | Headlines, primary text |
| `--text-2` | `#8B9BB4` | Secondary labels, metadata |
| `--text-3` | `#3D4F6E` | Placeholder, disabled |
| `--border` | `rgba(255,255,255,0.06)` | Card borders |
| `--border-active` | `rgba(0,208,156,0.30)` | Selected/active borders |
| `--gold` | `#F5A623` | Payment amounts, premium badges |
| `--red` | `#FF5C5C` | Danger, errors, unpaid |
| `--blue` | `#4A90E2` | Info, partial payment |
| `--success` | `#00D09C` | Same as primary |

### 3.3 Typography

| Role | Font | Weight | Size |
|---|---|---|---|
| **App Name / Hero** | Outfit | 800 | 28–36px |
| **Screen Titles** | Outfit | 700 | 20–24px |
| **Card Titles** | Outfit | 600 | 15–18px |
| **Body / Labels** | DM Sans | 400–500 | 13–15px |
| **Numbers / Stats** | Outfit | 800 | 22–42px |
| **Arabic / Calligraphy accent** | Amiri | 700 | For Bismillah / branding |
| **Micro labels** | DM Sans | 600 | 10–11px uppercase |

### 3.4 Spacing & Radius
- Base unit: 4px
- Card radius: 20px
- Inner element radius: 12px
- Button radius: 14px (or full pill for CTAs: 999px)
- Page padding: 20px
- Card padding: 18px
- Gap between cards: 12px

### 3.5 Shadows & Depth
```
Level 1 (card):   0 2px 12px rgba(0,0,0,0.4)
Level 2 (modal):  0 20px 60px rgba(0,0,0,0.7)
Glow (primary):   0 0 20px rgba(0,208,156,0.20)
Glow (gold):      0 0 16px rgba(245,166,35,0.25)
```

### 3.6 Motion
- Page transitions: `fadeUp` — 240ms ease-out
- Card entry: staggered `slideUp` with 40ms delay increments
- Modal: `slideUp` from bottom — 300ms cubic-bezier(0.34, 1.56, 0.64, 1)
- Tap feedback: scale(0.97) — 100ms
- Progress bars: width transition 600ms ease-out
- Glow pulse on active stat: subtle 2s infinite breathing animation

---

## 4. Information Architecture

```
SharikNama
├── Home (Dashboard)
│   ├── Active Event Summary
│   ├── Stats Grid (Animals, Shariks, Total Meat, Paid)
│   ├── Distribution Progress Bar
│   ├── Payment Overview
│   ├── Animal Cards (quick overview)
│   └── Quick Actions (chips)
│
├── Animals
│   ├── Animal List
│   └── Animal Detail
│       ├── Parts Tab (expandable cards)
│       ├── Shariks Tab (list + individual receipt)
│       └── Checklist Tab (Islamic compliance)
│
├── Shariks (Global view across all animals)
│   ├── Filter by status
│   └── Sharik Card → Share Receipt Modal
│
└── Events (History Archive)
    ├── Event list
    └── Create new event

── Floating Tools ──
├── Butcher Mode (big numpad, fast entry)
└── Weight Estimator (live weight → yield)
```

---

## 5. Core Features

### 5.1 Dashboard (Home)
- Greeting with event name and moon icon
- 2×2 stat grid with dark glass cards: Animals, Shariks, Total Meat (kg), Payment ratio
- Linear progress bar for distribution status (teal fill)
- Horizontal scroll "Quick Actions" chips
- Animal overview cards with per-share calculation

### 5.2 Animal Management
- Add animals: name, type (Cow/Goat/Sheep/Camel/Buffalo), live weight, notes
- Each animal has: Parts, Shareholders, Islamic Checklist
- Parts entered via expandable cards (not table) — name + total kg → auto-calculates per share
- Live yield progress visual based on estimated vs actual weight

### 5.3 Sharik (Shareholder) Management
Each Sharik record contains:
- Full name + phone
- Number of shares (1 share = 1/7 for cow, 1 for goat)
- Payment status: Paid / Partial / Pending + amount
- Special request (less bone, extra liver, etc.)
- Delivery status: Pending / Collected / Delivered

### 5.4 Individual Share View (Receipt)
When a sharik is tapped:
- Beautiful dark receipt card showing exact kg per part
- Total share weight prominently displayed
- WhatsApp share button (pre-formatted message)
- Delivery status toggle

### 5.5 Butcher Mode
- Fullscreen dark interface
- Grid of meat parts as large tap targets
- Inline numpad (no keyboard)
- Instant save with visual confirmation
- Optimized for gloves / wet hands / noise

### 5.6 Weight Estimator
- Select animal type → enter live weight
- Outputs: Meat, Bone, Fat, Offal estimates
- Based on industry slaughter yield ratios:
  - Cow: Meat 38%, Bone 12%, Fat 8%, Offal 5%
  - Goat: Meat 42%, Bone 10%, Fat 6%, Offal 4%
  - Sheep: Meat 40%, Bone 11%, Fat 9%, Offal 4%

### 5.7 Events / History Archive
- Create named events: "Eid 2025 — Family", "Masjid Qurbani 2026"
- Switch active event from header
- Full history preserved in localStorage

### 5.8 WhatsApp Share Card
Auto-generated text:
```
🌙 Eid-ul-Adha 2026
[Animal Name] — SharikNama

As-salamu alaykum [Name],
Your Qurbani share is ready!

🥩 Solid Beef:   6.00 kg
🦴 Bone:         2.00 kg
🧈 Fat:          3.00 kg
❤️ Liver:        0.60 kg
📦 Other:        1.00 kg

📊 Total: 12.60 kg
🚚 Status: Ready for collection

JazakAllah Khair 🤲
— SharikNama
```

---

## 6. Future Roadmap

| Priority | Feature | Description |
|---|---|---|
| High | **QR Code Receipts** | Each sharik gets unique QR → scan to view share |
| High | **Photo Proof Mode** | Attach animal image, weight scale photo, distribution photo |
| Medium | **Charity Mode (1/3 Rule)** | Islamic 1/3 for family, 1/3 charity, 1/3 gift tracking |
| Medium | **Multi-Admin Cloud Sync** | Mosque committees with multiple admins |
| Medium | **SMS Notifications** | Auto-send share details via SMS |
| Low | **Analytics Dashboard** | Year-over-year trends, avg cost per kg |
| Low | **Animal Marketplace** | Connect with verified livestock sellers |

---

## 7. Islamic UX Principles
- **Niyyah Checklist**: Pre-slaughter condition verification with Islamic requirements
- **Bismillah Prompt**: Reminder before entering butcher mode
- **1/3 Distribution**: Built-in tracking for Islamic charity distribution rule
- **Qibla Awareness**: Checklist item for direction of slaughter
- **Arabic Typography**: Bismillah / Amiri font for sacred context elements
- **Charitable Default**: App encourages documenting charity portion

---

## 8. Technical Stack

| Layer | Choice | Reason |
|---|---|---|
| Framework | React (JSX) | Component reuse, state management |
| Styling | CSS-in-JS (template literals) | Full control, dark theme variables |
| Fonts | Google Fonts (Outfit + DM Sans + Amiri) | Free, fast, beautiful |
| Storage | localStorage | Offline-first, no server needed |
| PDF/Share | Browser APIs + WhatsApp deep link | Zero dependencies |
| Icons | Emoji + Unicode | Universal, no bundle cost |

---

*SharikNama — Bringing transparency, trust, and structure to Qurbani. Every year. Every animal. Every share.*
