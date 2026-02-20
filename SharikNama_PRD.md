# SharikNama — Product Requirements Document (PRD)
**Version:** 1.0  
**Status:** Draft  
**Author:** Product Team  
**Last Updated:** June 2026  

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Problem Statement](#2-problem-statement)
3. [Product Vision & Goals](#3-product-vision--goals)
4. [Target Users & Personas](#4-target-users--personas)
5. [Market Analysis](#5-market-analysis)
6. [Product Scope](#6-product-scope)
7. [Functional Requirements](#7-functional-requirements)
8. [Non-Functional Requirements](#8-non-functional-requirements)
9. [User Stories & Acceptance Criteria](#9-user-stories--acceptance-criteria)
10. [Feature Prioritization (MoSCoW)](#10-feature-prioritization-moscow)
11. [Information Architecture](#11-information-architecture)
12. [User Flows](#12-user-flows)
13. [Data Models](#13-data-models)
14. [Release Plan](#14-release-plan)
15. [Success Metrics & KPIs](#15-success-metrics--kpis)
16. [Risks & Mitigations](#16-risks--mitigations)
17. [Islamic Compliance & Sensitivity Guidelines](#17-islamic-compliance--sensitivity-guidelines)
18. [Open Questions](#18-open-questions)

---

## 1. Executive Summary

SharikNama is a **mobile-first Qurbani management platform** designed to bring transparency, structure, and digital documentation to the Eid-ul-Adha animal sharing process. The app serves families, mosque committees, and butcher teams who collectively purchase and distribute animals during the Islamic festival of sacrifice.

The platform handles the **entire Qurbani lifecycle** — from registering animals and shareholders (shariks), entering meat weights by part, auto-calculating each person's share, tracking payments and delivery status, to generating digital receipts and WhatsApp-shareable share cards.

**Phase 1 (MVP)** ships as an offline-first Progressive Web App (PWA). **Phase 2** introduces cloud sync, multi-admin access, QR receipts, and photo proof. **Phase 3** targets mosque-scale community platforms with analytics and marketplace features.

---

## 2. Problem Statement

### 2.1 Current Reality

Every year during Eid-ul-Adha, millions of Muslim families across South Asia, the Middle East, and beyond participate in collective Qurbani — typically sharing a single cow among 7 shareholders (as per Islamic ruling), or purchasing goats/sheep individually. The coordination process is overwhelmingly manual:

- 📝 **Paper lists** scrawled in notebooks, lost or illegible
- 📞 **WhatsApp messages** with confusing spreadsheet screenshots
- 🤷 **Verbal agreements** about who gets what — leading to disputes
- 💸 **No payment tracking** — awkward money collection, forgotten amounts
- 🏠 **No delivery confirmation** — families uncertain if their share arrived
- ⚖️ **No weight transparency** — trust issues about fair distribution
- 🕌 **Mosque committees** managing 30+ animals with zero digital tools

### 2.2 Core Pain Points

| Pain Point | Who Feels It | Severity |
|---|---|---|
| Don't know their exact share weight | Shariks | High |
| Can't track who has paid | Organizer | High |
| No proof of fair distribution | All parties | High |
| Can't remember previous year amounts | All parties | Medium |
| Butcher has no digital record | Butcher team | High |
| No way to share receipts digitally | Organizer | Medium |
| Large committees lose track of deliveries | Committee admin | High |

### 2.3 The Opportunity

There is currently **no dedicated, purpose-built digital tool** for Qurbani management in any major app store. Existing workarounds (Excel, WhatsApp groups, paper) are fragmented, error-prone, and offer no transparency guarantee. SharikNama addresses this entirely unserved market with a product designed specifically for this use case.

---

## 3. Product Vision & Goals

### 3.1 Vision Statement

> *"Every Sharik deserves to know exactly what they're receiving. Every organizer deserves tools worthy of the task."*

SharikNama exists to transform an act of faith — Qurbani — into a **documented, trustworthy, and dignified experience** for every participant. The app doesn't just track meat weights; it upholds the Islamic values of fairness (adl), transparency (wudhuh), and accountability (mas'uliyya).

### 3.2 Product Goals

**Business Goals**
- Acquire 10,000 active users in the first Eid season (June 2026)
- Achieve 40% month-over-month retention through annual Eid cycles
- Establish SharikNama as the go-to Qurbani tool in Pakistan, Bangladesh, and diaspora communities
- Generate revenue through premium features (Phase 2+)

**User Goals**
- Organizers can set up and manage a complete Qurbani in under 10 minutes
- Shariks receive their digital receipt within 1 minute of distribution
- Mosque committees can manage 50+ animals with a team of admins
- Butcher teams can enter all weights in under 5 minutes per animal

**Product Quality Goals**
- Core features usable completely offline
- App loads in under 2 seconds on mid-range Android phones
- Works on devices with 2GB RAM running Android 9+
- Zero data loss during offline use

---

## 4. Target Users & Personas

### Persona 1 — The Family Organizer
**Name:** Ahmed Raza, 38, Lahore  
**Device:** Samsung Galaxy A-series (mid-range Android)  
**Tech Comfort:** Moderate — uses WhatsApp, basic apps  
**Context:** Organizes a shared cow among his brothers and cousins every year. Collects money, coordinates with butcher, distributes meat.  
**Frustrations:** Arguments about "who got less bone", forgetting who paid, sending blurry photos of handwritten lists  
**Needs:** Fast entry, automatic fair-share calculation, WhatsApp receipt for each family member  
**Success Metric:** "I sent everyone their receipt on WhatsApp before they left"

---

### Persona 2 — The Mosque Committee Admin
**Name:** Haji Manzoor, 55, Karachi  
**Device:** iPhone 11  
**Tech Comfort:** Low-medium — uses WhatsApp and basic features  
**Context:** Manages Qurbani for a mosque community with 40 animals, 200+ shareholders, and a 3-person admin team  
**Frustrations:** Keeping track of who picked up their share, chasing payments from 200 people, handwriting 200 receipts  
**Needs:** Multi-admin access, bulk shareholder management, delivery confirmation per person, payment overview dashboard  
**Success Metric:** "No complaints about missing or unfair shares this year"

---

### Persona 3 — The Butcher Team Member
**Name:** Kareem, 29, slaughterhouse worker  
**Device:** Cheap Android phone, wet/dirty hands during work  
**Tech Comfort:** Low — basic phone user  
**Context:** Weighs and records each part of the animal after slaughter. Standing in a noisy, chaotic environment.  
**Frustrations:** Having to type on small keyboard, can't use phone with wet hands, data entry errors  
**Needs:** Big tap targets, no keyboard required, fast sequential entry, voice input  
**Success Metric:** "I entered all 6 parts in under 3 minutes"

---

### Persona 4 — The Individual Sharik
**Name:** Zainab Malik, 34, London  
**Device:** iPhone 14  
**Tech Comfort:** High — digital native  
**Context:** Participates in a family Qurbani managed by her uncle in Pakistan. Wants proof of her share.  
**Frustrations:** Uncle sends blurry WhatsApp photos, unclear if she got her full share, no record for following year  
**Needs:** Clean digital receipt, QR code to verify, share history  
**Success Metric:** "I can see exactly what I received, clearly documented"

---

## 5. Market Analysis

### 5.1 Market Size

| Segment | Size |
|---|---|
| Global Muslim population | 1.9 billion |
| Estimated annual Qurbani participants | 100–150 million households |
| Pakistan (primary market) | 220 million population, ~30M Qurbani participants |
| Bangladesh | 170 million population, ~20M Qurbani participants |
| UK Muslim diaspora | 3.9 million, significant Qurbani market |
| US Muslim diaspora | 3.5 million |

### 5.2 Competitive Landscape

| Competitor | Type | Limitation |
|---|---|---|
| Excel / Google Sheets | Manual tool | No mobile UX, no distribution tracking |
| WhatsApp | Communication | No structured data, no receipts |
| Generic event apps | Not purpose-built | No Qurbani-specific features |
| Paper notebooks | Analog | Easily lost, not shareable, no receipts |
| **No dedicated Qurbani app** | Gap | **SharikNama fills this completely** |

### 5.3 Competitive Advantage

1. **First-mover** in a large, underserved vertical
2. **Islamic UX** — built with religious sensitivity embedded in the product
3. **Offline-first** — works in rural areas and low-connectivity environments
4. **Butcher Mode** — unique feature for professional use at point of slaughter
5. **Viral loop** — WhatsApp share receipts act as natural organic marketing

---

## 6. Product Scope

### 6.1 In Scope (All Phases)

- Animal management (registration, type, live weight)
- Meat parts entry with per-share auto-calculation
- Shareholder (Sharik) management with full profile
- Payment status tracking (not payment processing)
- Delivery status tracking
- Individual share receipts
- WhatsApp share cards
- Butcher Mode (large-button weight entry)
- Weight estimator (live weight → yield prediction)
- Islamic compliance checklist
- Event/year history archive
- Offline-first data persistence
- PWA installability

### 6.2 Explicitly Out of Scope (All Phases)

- **Actual payment processing** — SharikNama tracks payment status only, never handles money
- **Animal purchasing/marketplace** (Phase 3 only, separate product line)
- **Live slaughter assistance or guidance** — cultural/ethical sensitivity
- **Financial advice or Zakat calculation** — different religious domain

---

## 7. Functional Requirements

### FR-01: Event Management
| ID | Requirement | Priority |
|---|---|---|
| FR-01.1 | User can create a named Qurbani event (e.g., "Eid 2026 — Family") | Must |
| FR-01.2 | User can switch between multiple saved events | Must |
| FR-01.3 | Events are stored indefinitely as history archive | Must |
| FR-01.4 | Each event stores its own animals, shariks, and settings | Must |
| FR-01.5 | User can rename or delete an event | Should |
| FR-01.6 | Event shows creation date and last modified date | Should |

### FR-02: Animal Management
| ID | Requirement | Priority |
|---|---|---|
| FR-02.1 | User can add an animal with name, type, live weight, and notes | Must |
| FR-02.2 | Supported animal types: Cow, Goat, Sheep, Camel, Buffalo | Must |
| FR-02.3 | Animal type determines share denomination shown (1/7 for cow, 1 for goat) | Should |
| FR-02.4 | User can edit or delete any animal | Must |
| FR-02.5 | Animal card shows total meat, per-share amount, and delivery progress | Must |
| FR-02.6 | User can attach photos to an animal record | Could |

### FR-03: Meat Parts Management
| ID | Requirement | Priority |
|---|---|---|
| FR-03.1 | Each animal has a configurable list of meat parts | Must |
| FR-03.2 | Default parts: Solid Beef, Bone, Fat, Liver, Other | Must |
| FR-03.3 | User can add custom parts (Heart, Kidney, Head, etc.) | Must |
| FR-03.4 | User can delete any part | Must |
| FR-03.5 | Per-share amount auto-calculates: totalKg ÷ numberOfShareholders | Must |
| FR-03.6 | Parts displayed as expandable cards (not table) | Must |
| FR-03.7 | Total meat weight shown in animal summary | Must |

### FR-04: Butcher Mode
| ID | Requirement | Priority |
|---|---|---|
| FR-04.1 | Dedicated fullscreen interface with large tap targets (min 56×56px) | Must |
| FR-04.2 | All parts shown as large grid buttons with current weight | Must |
| FR-04.3 | Built-in numeric keypad — no system keyboard invoked | Must |
| FR-04.4 | Tap part → enter weight → save with single confirm tap | Must |
| FR-04.5 | Bismillah prompt displayed on mode entry | Must |
| FR-04.6 | Visual confirmation animation on successful save | Should |
| FR-04.7 | Voice input: speak "Solid meat 32 kg" → auto-fill | Could |

### FR-05: Shareholder (Sharik) Management
| ID | Requirement | Priority |
|---|---|---|
| FR-05.1 | Add shariks with: name, phone, number of shares, payment status, special request | Must |
| FR-05.2 | Payment status options: Paid, Partial, Pending | Must |
| FR-05.3 | Delivery status options: Pending, Collected, Delivered | Must |
| FR-05.4 | User can edit all sharik fields | Must |
| FR-05.5 | User can delete a sharik | Must |
| FR-05.6 | Special requests visible on sharik card (e.g., "Less bone") | Must |
| FR-05.7 | Global sharik list filterable by payment/delivery status | Must |
| FR-05.8 | Sharik can have fractional shares (0.5, 1, 2) | Should |

### FR-06: Individual Share View & Receipt
| ID | Requirement | Priority |
|---|---|---|
| FR-06.1 | Tapping a sharik shows their exact kg per meat part | Must |
| FR-06.2 | Receipt shows event name, animal name, all parts with kg | Must |
| FR-06.3 | Total share weight displayed prominently | Must |
| FR-06.4 | Delivery status toggle directly on receipt | Must |
| FR-06.5 | WhatsApp share button opens pre-formatted message | Must |
| FR-06.6 | Receipt is shareable as text via any channel | Should |
| FR-06.7 | Receipt exportable as PDF | Could |
| FR-06.8 | Receipt shareable as image (screenshot card) | Could |
| FR-06.9 | Unique QR code per sharik linking to their receipt | Could |

### FR-07: Weight Estimator
| ID | Requirement | Priority |
|---|---|---|
| FR-07.1 | User inputs: animal type + live weight in kg | Must |
| FR-07.2 | App outputs estimated: Meat, Bone, Fat, Offal in kg | Must |
| FR-07.3 | Yield ratios per animal type (Cow 38%, Goat 42%, etc.) | Must |
| FR-07.4 | Results include disclaimer about estimate accuracy | Must |
| FR-07.5 | One-tap to use estimated values as animal's parts | Should |

### FR-08: Payment Tracking
| ID | Requirement | Priority |
|---|---|---|
| FR-08.1 | Per-sharik payment status (Paid / Partial / Pending) | Must |
| FR-08.2 | Dashboard shows payment completion percentage | Must |
| FR-08.3 | Dashboard shows count of paid/pending/partial shariks | Must |
| FR-08.4 | Filter shariks by payment status | Must |
| FR-08.5 | App never processes or stores payment amounts | Must |
| FR-08.6 | Payment notes field per sharik | Should |

### FR-09: Delivery Tracking
| ID | Requirement | Priority |
|---|---|---|
| FR-09.1 | Per-sharik delivery status (Pending / Collected / Delivered) | Must |
| FR-09.2 | Dashboard progress bar shows overall distribution progress | Must |
| FR-09.3 | Quick delivery status toggle on sharik receipt | Must |
| FR-09.4 | Notification to organizer when all shariks marked delivered | Should |

### FR-10: Islamic Compliance Checklist
| ID | Requirement | Priority |
|---|---|---|
| FR-10.1 | Per-animal pre-slaughter checklist based on Islamic requirements | Must |
| FR-10.2 | Default 7 items covering Niyyah, Bismillah, Qibla, animal health | Must |
| FR-10.3 | Visual progress indicator for checklist completion | Must |
| FR-10.4 | Checklist state persisted per animal | Must |
| FR-10.5 | Organizer can add custom checklist items | Should |

### FR-11: Dashboard & Analytics
| ID | Requirement | Priority |
|---|---|---|
| FR-11.1 | Home screen shows: Animals, Shariks, Total Meat, Payment % | Must |
| FR-11.2 | Distribution progress bar (delivered/total) | Must |
| FR-11.3 | Payment progress bar (paid/total) | Must |
| FR-11.4 | Quick action chips for fast navigation | Must |
| FR-11.5 | Year-over-year comparison across events | Could |

---

## 8. Non-Functional Requirements

### NFR-01: Performance
| ID | Requirement |
|---|---|
| NFR-01.1 | App initial load under 2.5 seconds on 3G connection |
| NFR-01.2 | All UI interactions respond within 100ms |
| NFR-01.3 | Data save operations complete within 50ms |
| NFR-01.4 | App functional on devices with 2GB RAM |
| NFR-01.5 | Supports up to 100 animals and 700 shariks per event without performance degradation |

### NFR-02: Reliability & Offline
| ID | Requirement |
|---|---|
| NFR-02.1 | All core features work without internet connection |
| NFR-02.2 | Zero data loss on app crash or browser close |
| NFR-02.3 | Data persists across device restarts |
| NFR-02.4 | Graceful handling of storage quota exceeded (warn user, don't lose data) |

### NFR-03: Usability
| ID | Requirement |
|---|---|
| NFR-03.1 | All interactive elements minimum 44×44px touch target |
| NFR-03.2 | Butcher Mode tap targets minimum 80×80px |
| NFR-03.3 | App usable with one hand (primary actions reachable with thumb) |
| NFR-03.4 | Text readable without zoom on 5" screen (min 12px body) |
| NFR-03.5 | New user can complete first animal setup without tutorial |

### NFR-04: Compatibility
| ID | Requirement |
|---|---|
| NFR-04.1 | Works on Android 9+ (Chrome 80+) |
| NFR-04.2 | Works on iOS 14+ (Safari) |
| NFR-04.3 | Installable as PWA on both platforms |
| NFR-04.4 | Responsive for screen widths 360px–430px |
| NFR-04.5 | Functions without camera permission (photo features optional) |

### NFR-05: Security & Privacy
| ID | Requirement |
|---|---|
| NFR-05.1 | All data stored locally — no user data sent to any server (Phase 1) |
| NFR-05.2 | No analytics or tracking without explicit consent |
| NFR-05.3 | WhatsApp share uses device's native share sheet, no third-party relay |
| NFR-05.4 | No user account, email, or phone number required to use app |
| NFR-05.5 | Phase 2 cloud sync uses end-to-end encryption |

### NFR-06: Localization
| ID | Requirement |
|---|---|
| NFR-06.1 | Default language: English |
| NFR-06.2 | Arabic/Urdu text (Bismillah, labels) rendered correctly RTL |
| NFR-06.3 | Phase 2: Urdu interface option |
| NFR-06.4 | Phase 2: Arabic interface option |
| NFR-06.5 | Weight unit: kg (default); lbs conversion in settings |

---

## 9. User Stories & Acceptance Criteria

### Epic 1: Animal Setup

**US-001 — Add a new animal**
> As an organizer, I want to add an animal with its details so that I can start managing its shares.

**Acceptance Criteria:**
- [ ] Form includes: name (required), type selector, live weight (optional), notes (optional)
- [ ] Type selector shows 5 options with emoji icons
- [ ] On save, animal appears in event with default 5 parts pre-populated
- [ ] Confirmation toast appears after save
- [ ] User can cancel without saving

---

**US-002 — Enter meat weights in Butcher Mode**
> As a butcher team member, I want to enter weights using a large numpad without a keyboard so I can work in noisy, messy conditions.

**Acceptance Criteria:**
- [ ] Butcher Mode shows fullscreen dark interface
- [ ] All meat parts visible as large grid cards showing current weight
- [ ] Tapping a part opens a numpad (no system keyboard shown)
- [ ] User can enter decimal values (e.g., 32.5)
- [ ] Saving shows teal confirmation and returns to grid
- [ ] Bismillah text visible at top of screen

---

### Epic 2: Sharik Management

**US-003 — Add a shareholder**
> As an organizer, I want to register each person sharing the animal so I can calculate their individual portion.

**Acceptance Criteria:**
- [ ] Form includes: name (required), phone, shares count, payment status, special request
- [ ] Per-share calculation updates live as shariks are added
- [ ] Sharik card shows name, payment badge, delivery status
- [ ] Special request shown with gold text if present
- [ ] Duplicate name allowed (two family members with same name)

---

**US-004 — View a sharik's individual share**
> As an organizer or sharik, I want to see exactly how much of each meat part one person receives.

**Acceptance Criteria:**
- [ ] Receipt card shows: event name, animal name, sharik name
- [ ] Each meat part listed with exact kg (totalKg ÷ shareholders)
- [ ] Total share weight shown prominently
- [ ] Delivery toggle allows instant status update
- [ ] WhatsApp button opens pre-formatted message

---

### Epic 3: Tracking & Oversight

**US-005 — Monitor overall distribution progress**
> As an organizer, I want to see at a glance how many shares have been distributed so I know what's left.

**Acceptance Criteria:**
- [ ] Dashboard shows delivery progress bar
- [ ] Count of delivered vs pending shown numerically
- [ ] Tapping bar navigates to filtered shariks list
- [ ] Dashboard updates immediately when delivery status changes

---

**US-006 — Track payment collection**
> As an organizer, I want to mark each person's payment status so I know who still owes money.

**Acceptance Criteria:**
- [ ] Payment status toggleable per sharik: Paid / Partial / Pending
- [ ] Dashboard shows payment completion percentage
- [ ] Badge colors: green (paid), yellow (partial), red (pending)
- [ ] Filter shariks by payment status

---

### Epic 4: Receipts & Sharing

**US-007 — Share receipt via WhatsApp**
> As an organizer, I want to send each person a clear message showing their share so there's no confusion.

**Acceptance Criteria:**
- [ ] Tapping WhatsApp button opens wa.me with pre-filled text
- [ ] Message includes: Eid greeting, person's name, per-part breakdown, total
- [ ] Phone number pre-populated if stored in sharik profile
- [ ] Message includes "SharikNama" branding

---

## 10. Feature Prioritization (MoSCoW)

### Phase 1 — MVP (Eid 2026)

| Feature | Priority | Complexity | Impact |
|---|---|---|---|
| Event creation & switching | **Must** | Low | High |
| Animal management (add/edit/delete) | **Must** | Low | High |
| Meat parts entry (expandable cards) | **Must** | Medium | High |
| Per-share auto-calculation | **Must** | Low | Critical |
| Sharik management (add/edit/delete) | **Must** | Medium | Critical |
| Individual share receipt view | **Must** | Medium | Critical |
| WhatsApp share (text message) | **Must** | Low | High |
| Payment status tracking | **Must** | Low | High |
| Delivery status tracking | **Must** | Low | High |
| Dashboard with progress stats | **Must** | Medium | High |
| Butcher Mode (numpad) | **Must** | Medium | High |
| Weight estimator | **Must** | Low | Medium |
| Islamic compliance checklist | **Must** | Low | Medium |
| History archive (multiple events) | **Must** | Low | High |
| Offline-first (localStorage) | **Must** | Low | Critical |
| PWA installability | **Should** | Medium | High |

### Phase 2 — Growth (Post-Eid 2026)

| Feature | Priority | Complexity | Impact |
|---|---|---|---|
| QR code receipt per sharik | **Should** | Medium | High |
| PDF receipt export | **Should** | Medium | High |
| Photo proof mode (animal/scale/distribution) | **Should** | High | Medium |
| Urdu / Arabic language support | **Should** | High | High |
| Cloud sync (Firebase) | **Should** | High | High |
| Multi-admin access | **Should** | Very High | High |
| Data export (CSV / JSON) | **Should** | Medium | Medium |
| Bulk sharik import (CSV) | **Could** | High | Medium |
| SMS notification via Twilio | **Could** | High | Medium |
| 1/3 Islamic charity tracking mode | **Could** | Medium | Medium |

### Phase 3 — Platform (2027)

| Feature | Priority | Notes |
|---|---|---|
| Community mosque dashboard (web) | Could | SaaS model |
| Analytics (cost/kg trends, year-over-year) | Could | Requires cloud |
| Animal marketplace / verified suppliers | Won't yet | Separate business |
| National Qurbani registry integration | Won't yet | Government partnership required |

---

## 11. Information Architecture

```
SharikNama PWA
│
├── 🏠 Home (Dashboard)
│   ├── Greeting & Active Event
│   ├── Stats Grid: Animals · Shariks · Total Meat (kg) · Payment %
│   ├── Distribution Progress Bar
│   ├── Payment Progress Bar
│   ├── Quick Actions Chip Row: Butcher Mode · Estimator · Add Animal · All Shariks
│   └── Animal Cards (preview) → Animal Detail
│
├── 🐄 Animals
│   ├── Animal List (with delivery progress bars)
│   ├── Add Animal (modal)
│   └── Animal Detail (sub-screen)
│       ├── Header: name, type, live weight, per-share stats
│       ├── 🥩 Parts Tab
│       │   ├── Part Cards (expandable) — enter kg per part
│       │   └── Add Part form
│       ├── 👥 Shariks Tab
│       │   ├── Sharik Cards → Share Receipt Modal
│       │   └── Add Sharik form
│       └── ✅ Checklist Tab
│           └── 7-item Islamic compliance list
│
├── 👥 Shariks (Global)
│   ├── Filter Chips: All · Paid · Pending · Delivered
│   ├── Sharik Cards (name, animal, kg, status) → Share Receipt Modal
│   └── Share Receipt Modal
│       ├── Dark receipt card (per-part breakdown)
│       ├── Delivery status toggle
│       └── WhatsApp · Edit · Delete actions
│
├── 🗓 Events
│   ├── Event List (tap to activate)
│   └── Create Event form
│
── Floating Tools (accessible from header) ──
├── ⚖️ Weight Estimator (inline screen)
└── 🎯 Butcher Mode (fullscreen, requires active animal)
```

---

## 12. User Flows

### Flow 1: First-Time Setup (New Event + Animal + Shariks)

```
App Open
  └── Home: No event prompt
      └── Tap "Create Event"
          └── Enter name: "Eid 2026 — Brothers"
              └── Tap "Add Animal"
                  └── Fill: Cow #1 | Cow | 320kg
                      └── Animal created with 5 default parts
                          └── Tap "Butcher Mode"
                              └── Enter weights per part
                                  └── Back to Animal Detail
                                      └── Shariks tab → Add 7 shariks
                                          └── Dashboard shows per-share calculation
                                              └── Send WhatsApp to each sharik ✓
```

### Flow 2: Day-Of Distribution

```
Open App → Active Event: Eid 2026
  └── Dashboard: 7 shariks · 88kg total · 0% delivered
      └── Tap Sharik: "Tanvir Ahmed"
          └── Receipt: Beef 6.00kg · Bone 2.00kg · Total 12.60kg
              └── Tap "Delivered" → Green confirmation
                  └── Dashboard progress: 1/7 delivered ✓
```

### Flow 3: Butcher Mode Weight Entry

```
Header: Tap 🎯 Butcher Mode
  └── Select animal: Cow #1
      └── Fullscreen opens. Bismillah shown.
          └── Tap "Solid Beef" card
              └── Numpad opens. Enter: 4 8 . 5
                  └── Tap "Save Weight"
                      └── Card updates: 48.5kg ✓
                          └── Tap next part...
```

### Flow 4: Sending WhatsApp Receipt

```
Global Shariks → Tap "Zainab Malik"
  └── Receipt modal opens
      └── Shows: Beef 6.00kg | Bone 2.00kg | Total 12.60kg
          └── Tap 📱 WhatsApp
              └── WhatsApp opens with pre-filled message
                  └── Zainab's number pre-populated
                      └── Tap Send ✓
```

---

## 13. Data Models

### Event
```typescript
interface QurbaniEvent {
  id:          string;           // UUID
  name:        string;           // "Eid-ul-Adha 2026 — Family"
  year:        number;           // 2026
  createdAt:   ISO8601String;
  updatedAt:   ISO8601String;
  animals:     Animal[];
}
```

### Animal
```typescript
interface Animal {
  id:           string;
  name:         string;          // "Cow #1"
  type:         'cow' | 'goat' | 'sheep' | 'camel' | 'buffalo';
  liveWeight:   number | null;   // kg, for estimator
  notes:        string;
  checklist:    boolean[];       // 7 items, indexed
  parts:        MeatPart[];
  shareholders: Shareholder[];
  photos:       PhotoAttachment[]; // Phase 2
  createdAt:    ISO8601String;
}
```

### MeatPart
```typescript
interface MeatPart {
  id:      string;
  name:    string;    // "Solid Beef", "Bone", "Fat", "Liver", "Other"
  totalKg: number;    // total kg for this part across entire animal
  // Derived: perShareKg = totalKg / animal.shareholders.length
}
```

### Shareholder
```typescript
interface Shareholder {
  id:             string;
  name:           string;
  phone:          string | null;
  shares:         number;         // typically 1; can be fractional
  paymentStatus:  'paid' | 'partial' | 'pending';
  paymentNotes:   string;         // optional memo
  specialRequest: string;         // "less bone", "extra liver"
  deliveryStatus: 'pending' | 'collected' | 'delivered';
  deliveryTime:   ISO8601String | null;
  notes:          string;
}
```

### AppState (Root)
```typescript
interface AppState {
  events:        QurbaniEvent[];
  activeEventId: string | null;
  settings:      UserSettings;
  version:       number;          // schema version for migrations
}

interface UserSettings {
  language:      'en' | 'ur' | 'ar';
  weightUnit:    'kg' | 'lbs';
  theme:         'dark';          // only dark in Phase 1
}
```

### Derived Calculations
```typescript
// Per-share calculation
const perShareKg = (part: MeatPart, animal: Animal): number =>
  animal.shareholders.length > 0
    ? part.totalKg / animal.shareholders.length
    : 0;

// Total share for a specific sharik
const totalShareKg = (animal: Animal, sharik: Shareholder): number =>
  animal.parts.reduce((sum, part) =>
    sum + (part.totalKg / animal.shareholders.length) * sharik.shares, 0);

// Yield estimation
const estimateYield = (liveWeight: number, type: AnimalType) => ({
  meat:  liveWeight * YIELD_RATIOS[type].meat,
  bone:  liveWeight * YIELD_RATIOS[type].bone,
  fat:   liveWeight * YIELD_RATIOS[type].fat,
  offal: liveWeight * YIELD_RATIOS[type].offal,
});
```

---

## 14. Release Plan

### Phase 1 — MVP: "Eid Ready" (Target: May 2026)

**Goal:** Feature-complete offline-first PWA ready before Eid 2026

| Sprint | Duration | Focus |
|---|---|---|
| Sprint 1 | 2 weeks | Core data model, event/animal CRUD, localStorage |
| Sprint 2 | 2 weeks | Sharik management, per-share calculation |
| Sprint 3 | 2 weeks | Butcher Mode, receipt view, WhatsApp share |
| Sprint 4 | 1 week | Estimator, checklist, dashboard stats |
| Sprint 5 | 1 week | PWA setup, performance tuning, QA |
| **Beta** | 2 weeks | 100 beta users, bug fixes |
| **Launch** | Eid 2026 | Public launch |

### Phase 2 — "Community" (Target: Oct 2026)

- Firebase cloud sync + auth
- Multi-admin with role permissions
- QR code receipts (qrcode.js)
- PDF export (jsPDF)
- Photo attachments
- Urdu/Arabic localization
- Data export (CSV)

### Phase 3 — "Platform" (Target: Eid 2027)

- Web dashboard for mosque committees
- Analytics (cost per kg, year trends)
- SMS notifications
- Public API for integrations
- Premium subscription model

---

## 15. Success Metrics & KPIs

### Acquisition
| Metric | Target (Eid 2026) |
|---|---|
| App installs (PWA) | 10,000 |
| Organic installs via WhatsApp share card | 40% of total |
| Countries reached | 15+ |

### Engagement
| Metric | Target |
|---|---|
| Events created per user | ≥ 1 |
| Animals entered per event | ≥ 1 |
| Shariks entered per animal | ≥ 3 |
| WhatsApp shares sent per session | ≥ 2 |
| Session duration (Eid day) | ≥ 8 minutes |

### Quality
| Metric | Target |
|---|---|
| App crash rate | < 0.1% |
| Data loss incidents | 0 |
| Lighthouse Performance score | ≥ 85 |
| First Contentful Paint | < 1.5s |

### Retention
| Metric | Target |
|---|---|
| Year-over-year return rate | ≥ 60% |
| User recommends to another organizer | ≥ 30% NPS |

---

## 16. Risks & Mitigations

| Risk | Probability | Impact | Mitigation |
|---|---|---|---|
| Low smartphone penetration in target market | Medium | High | PWA works on basic Android browsers; SMS fallback planned |
| Users don't trust app with sensitive data | Medium | High | Local-only storage, clear privacy statement, open source option |
| Competitor launches before Eid 2026 | Low | Medium | First-mover + Islamic UX depth is significant moat |
| localStorage data loss on browser clear | Medium | High | Export/import JSON backup; warn user; Phase 2 cloud sync |
| Low Eid-season usage window (2–3 days) | High | Medium | Target pre-Eid preparation + Year-round history use |
| Butcher Mode adoption low | Medium | Low | Not critical for MVP; family use case is primary |
| Urdu/Arabic text rendering issues | Medium | Medium | Test on actual Android devices; use proven Arabic font stacks |
| WhatsApp API changes | Low | Medium | Uses wa.me URL scheme (stable, not Business API) |

---

## 17. Islamic Compliance & Sensitivity Guidelines

### 17.1 Religious Accuracy
- All Islamic terminology reviewed by a qualified Islamic scholar before launch
- Checklist items sourced from mainstream Islamic jurisprudence (Hanafi, Shafi'i, Maliki, Hanbali where relevant)
- App never gives religious rulings — only tracks compliance with what user marks
- Bismillah displayed in correct Arabic calligraphy (Amiri font)

### 17.2 Sensitive Content Guidelines
- App never shows slaughter imagery or graphic content
- No sound effects that could be associated with slaughter
- Checklist is informational only — app is not a fatwa tool
- No advertisement alongside religious content

### 17.3 Cultural Sensitivity
- Cow is the default animal type — respects South Asian majority Muslim context
- Camel included for Gulf/North African users
- Terminology uses both "Qurbani" (South Asian) and "Udhiyah" (Arabic) where appropriate
- Dates use Hijri calendar alongside Gregorian

### 17.4 Privacy & Trust
- No data ever leaves the device without explicit user action (Phase 1)
- WhatsApp sharing uses native device share — no server relay
- Phone numbers are stored locally and never transmitted
- App explicitly is not a payment app — this is stated in onboarding

---

## 18. Open Questions

| # | Question | Owner | Due |
|---|---|---|---|
| OQ-01 | Should shares be weighted? (1 sharik = 2 shares = 2x meat) | Product | Sprint 2 |
| OQ-02 | Does 1/3 charity tracking belong in Phase 1 or Phase 2? | Product | Sprint 1 |
| OQ-03 | What languages are needed for Eid 2026 launch? (Urdu critical?) | Product | Sprint 1 |
| OQ-04 | Should Butcher Mode support voice entry in Phase 1? | Engineering | Sprint 3 |
| OQ-05 | What is the monetization model? Freemium / one-time / subscription? | Business | Pre-launch |
| OQ-06 | Should mosque committees get a web admin panel in Phase 2? | Product | Phase 2 planning |
| OQ-07 | How do we handle data migration between schema versions? | Engineering | Sprint 1 |
| OQ-08 | Is PDF export needed before Eid 2026 or can it wait? | Product | Sprint 4 |

---

*Document prepared by the SharikNama Product Team*  
*For questions or revisions, update this document and increment the version number.*

---

**SharikNama — Bringing transparency, trust, and structure to Qurbani. Every year. Every animal. Every share.** 🌙
