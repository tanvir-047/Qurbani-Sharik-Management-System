# SharikNama — Technology Stack & Architecture Document
**Version:** 1.0  
**Status:** Approved  
**Author:** Engineering Team  
**Last Updated:** June 2026

---

## Table of Contents

1. [Architecture Philosophy](#1-architecture-philosophy)
2. [System Architecture Overview](#2-system-architecture-overview)
3. [Phase 1 — Offline-First PWA Stack](#3-phase-1--offline-first-pwa-stack)
4. [Phase 2 — Cloud-Connected Stack](#4-phase-2--cloud-connected-stack)
5. [Phase 3 — Platform Stack](#5-phase-3--platform-stack)
6. [Frontend Architecture](#6-frontend-architecture)
7. [State Management](#7-state-management)
8. [Data Layer & Storage](#8-data-layer--storage)
9. [API Design (Phase 2+)](#9-api-design-phase-2)
10. [Authentication & Authorization](#10-authentication--authorization)
11. [Offline & Sync Strategy](#11-offline--sync-strategy)
12. [File & Media Handling](#12-file--media-handling)
13. [Notifications & Sharing](#13-notifications--sharing)
14. [Performance Strategy](#14-performance-strategy)
15. [Testing Strategy](#15-testing-strategy)
16. [DevOps & Infrastructure](#16-devops--infrastructure)
17. [Security Architecture](#17-security-architecture)
18. [Localization & i18n](#18-localization--i18n)
19. [Monitoring & Observability](#19-monitoring--observability)
20. [Dependency Decisions & ADRs](#20-dependency-decisions--adrs)

---

## 1. Architecture Philosophy

### Principles

**1. Offline-First, Always**  
SharikNama's primary users operate in real-world conditions on Eid day — crowded slaughterhouses, rural areas with weak connectivity, family gatherings with poor WiFi. The app must function perfectly with zero internet. Cloud features are enhancements, never requirements.

**2. Mobile-First Performance**  
The target device is a mid-range Android phone (Samsung A-series, ~2GB RAM, ~Snapdragon 660). Every architectural decision prioritizes bundle size, render performance, and memory efficiency.

**3. Zero-Trust Local Storage**  
In Phase 1, user data never leaves the device. There is no server, no analytics collection, no crash reporting without consent. Trust is earned, not assumed.

**4. Graceful Degradation**  
Features that require internet (cloud sync, QR codes, SMS) degrade gracefully. The app's core — entering weights, managing shariks, calculating shares — works regardless.

**5. Islamic Sensitivity by Design**  
Architecture decisions respect the religious context: no gambling/betting SDKs, no adult content networks, no data brokers in the dependency tree.

---

## 2. System Architecture Overview

### Phase 1 — Pure Client-Side

```
┌─────────────────────────────────────────────────┐
│                  USER'S DEVICE                   │
│                                                  │
│  ┌────────────────────────────────────────────┐  │
│  │          SharikNama PWA (React)            │  │
│  │                                            │  │
│  │  ┌──────────┐  ┌──────────┐  ┌─────────┐  │  │
│  │  │  UI Layer │  │  State   │  │  Logic  │  │  │
│  │  │ (React)   │  │(Zustand) │  │ (utils) │  │  │
│  │  └──────────┘  └──────────┘  └─────────┘  │  │
│  │                     │                      │  │
│  │          ┌──────────┴──────────┐           │  │
│  │          │    Storage Layer     │           │  │
│  │          │   (localStorage)    │           │  │
│  │          └─────────────────────┘           │  │
│  └────────────────────────────────────────────┘  │
│                                                  │
│  ┌───────────────┐  ┌──────────────────────────┐ │
│  │ Service Worker│  │    Native Device APIs    │ │
│  │  (Workbox)    │  │ Share · Camera · Install │ │
│  └───────────────┘  └──────────────────────────┘ │
└─────────────────────────────────────────────────┘
                         │
              (optional, never required)
                         │
                  ┌──────┴──────┐
                  │  WhatsApp   │
                  │  wa.me URL  │
                  └─────────────┘
```

### Phase 2 — Cloud-Enabled

```
                    USERS' DEVICES
                ┌──────────────────┐
                │  SharikNama PWA  │
                └────────┬─────────┘
                         │ HTTPS (sync when online)
                         │
              ┌──────────┴──────────┐
              │   Backend Services  │
              │                     │
         ┌────┴────┐         ┌──────┴──────┐
         │Firebase │         │  Supabase   │
         │  Auth   │         │  Database   │
         └─────────┘         └─────────────┘
              │
    ┌─────────┴──────────┐
    │   Cloud Functions  │
    │  ┌──────────────┐  │
    │  │ QR Generator │  │
    │  │ PDF Export   │  │
    │  │ SMS (Twilio) │  │
    │  └──────────────┘  │
    └────────────────────┘
```

---

## 3. Phase 1 — Offline-First PWA Stack

### Complete Stack at a Glance

| Layer | Technology | Version | Reason |
|---|---|---|---|
| **UI Framework** | React | 18.x | Industry standard, hooks-based, excellent mobile perf |
| **Build Tool** | Vite | 5.x | Fastest dev server, optimal production builds |
| **Language** | TypeScript | 5.x | Type safety on data models is critical |
| **Styling** | CSS Modules + CSS Variables | — | Zero runtime overhead, full design system control |
| **State** | Zustand | 4.x | Minimal boilerplate, perfect for this app's size |
| **Persistence** | localStorage + Zustand persist | — | Offline-first, zero config, reliable |
| **PWA** | Vite PWA Plugin (Workbox) | 0.20.x | Service worker, installability, caching |
| **QR Codes** | qrcode.react | 3.x | Lightweight, offline QR generation |
| **Share** | Web Share API + wa.me | Native | Zero dependency sharing |
| **Icons** | Emoji + Iconoir | — | Emoji for content icons, Iconoir for UI icons |
| **Fonts** | Google Fonts (self-hosted in prod) | — | Outfit + DM Sans + Amiri |
| **Testing** | Vitest + React Testing Library | — | Fast, native Vite integration |
| **Linting** | ESLint + Prettier | — | Code quality |

### Package.json (Core Dependencies)

```json
{
  "dependencies": {
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "zustand": "^4.5.2",
    "qrcode.react": "^3.1.0"
  },
  "devDependencies": {
    "typescript": "^5.4.0",
    "vite": "^5.2.0",
    "@vitejs/plugin-react": "^4.2.0",
    "vite-plugin-pwa": "^0.20.0",
    "workbox-window": "^7.1.0",
    "vitest": "^1.5.0",
    "@testing-library/react": "^15.0.0",
    "eslint": "^8.57.0",
    "prettier": "^3.2.0"
  }
}
```

---

## 4. Phase 2 — Cloud-Connected Stack

### New Additions

| Layer | Technology | Reason |
|---|---|---|
| **Backend-as-a-Service** | Supabase | Open source Firebase alternative, Postgres, real-time, free tier |
| **Authentication** | Supabase Auth | Phone OTP (no email required — better for target audience) |
| **Database** | Supabase (PostgreSQL) | Relational, RLS for multi-tenant security |
| **File Storage** | Supabase Storage | Photo proof mode (animal images) |
| **Real-time Sync** | Supabase Realtime | Live updates for multi-admin events |
| **Edge Functions** | Supabase Edge Functions (Deno) | QR generation, PDF export, SMS |
| **SMS** | Twilio (via edge function) | WhatsApp & SMS notifications |
| **PDF Generation** | jsPDF + html2canvas | Client-side PDF, no server needed |
| **QR Code Scanning** | html5-qrcode | Scan QR for receipt verification |

### Why Supabase over Firebase

| Factor | Supabase | Firebase |
|---|---|---|
| Database | PostgreSQL (relational, querying) | NoSQL (Firestore — less suited to relational Qurbani data) |
| Pricing | More generous free tier | Can get expensive with reads |
| Self-hostable | Yes | No |
| Open source | Yes | No |
| Real-time | Yes | Yes |
| Auth | Phone OTP, social | Same |

---

## 5. Phase 3 — Platform Stack

| Layer | Technology |
|---|---|
| **Web App (Committee Dashboard)** | Next.js 14 (App Router) |
| **Admin Dashboard** | Shadcn/ui + Recharts |
| **Background Jobs** | Supabase pg_cron (monthly archive jobs) |
| **Email** | Resend (transactional email) |
| **Analytics (internal)** | Plausible (privacy-first) |
| **CDN** | Cloudflare |
| **Monitoring** | Sentry (errors) + Uptime Robot |

---

## 6. Frontend Architecture

### Project Structure

```
sharik-nama/
├── public/
│   ├── icons/              # PWA app icons (48px to 512px)
│   ├── manifest.json       # PWA manifest
│   └── offline.html        # Offline fallback page
│
├── src/
│   ├── main.tsx            # App entry, React root
│   ├── App.tsx             # Root component, router shell
│   │
│   ├── screens/            # Top-level page components
│   │   ├── HomeScreen.tsx
│   │   ├── AnimalsScreen.tsx
│   │   ├── AnimalDetailScreen.tsx
│   │   ├── ShariksScreen.tsx
│   │   ├── EventsScreen.tsx
│   │   ├── ButcherModeScreen.tsx
│   │   └── WeightEstimatorScreen.tsx
│   │
│   ├── components/         # Reusable UI components
│   │   ├── layout/
│   │   │   ├── AppHeader.tsx
│   │   │   ├── BottomNav.tsx
│   │   │   └── Modal.tsx
│   │   ├── cards/
│   │   │   ├── AnimalCard.tsx
│   │   │   ├── SharikCard.tsx
│   │   │   ├── PartCard.tsx
│   │   │   ├── StatCard.tsx
│   │   │   └── ReceiptCard.tsx
│   │   ├── forms/
│   │   │   ├── AddAnimalForm.tsx
│   │   │   ├── AddSharikForm.tsx
│   │   │   └── AddPartForm.tsx
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── ProgressBar.tsx
│   │   │   ├── Chip.tsx
│   │   │   ├── Toast.tsx
│   │   │   └── Numpad.tsx
│   │   └── special/
│   │       ├── BismillahBanner.tsx
│   │       ├── IslamicChecklist.tsx
│   │       ├── WhatsAppShareButton.tsx
│   │       └── QRCodeCard.tsx (Phase 2)
│   │
│   ├── store/              # Zustand state
│   │   ├── useAppStore.ts  # Main store
│   │   ├── useToastStore.ts
│   │   └── slices/
│   │       ├── eventSlice.ts
│   │       ├── animalSlice.ts
│   │       └── sharikSlice.ts
│   │
│   ├── hooks/              # Custom React hooks
│   │   ├── useAnimal.ts
│   │   ├── useShareCalculation.ts
│   │   ├── useWhatsAppShare.ts
│   │   └── useEstimator.ts
│   │
│   ├── utils/              # Pure utility functions
│   │   ├── calculations.ts # Share math, yield estimates
│   │   ├── formatting.ts   # kg display, date format
│   │   ├── validation.ts   # Form validators
│   │   ├── storage.ts      # localStorage wrapper with versioning
│   │   └── share.ts        # WhatsApp message builder
│   │
│   ├── types/              # TypeScript interfaces
│   │   ├── models.ts       # QurbaniEvent, Animal, Shareholder, etc.
│   │   └── api.ts          # Phase 2: API response types
│   │
│   ├── constants/
│   │   ├── animals.ts      # ANIMAL_TYPES, YIELD_RATIOS
│   │   ├── parts.ts        # DEFAULT_PARTS, PART_ICONS
│   │   ├── checklist.ts    # ISLAMIC_CHECKLIST items
│   │   └── theme.ts        # Design tokens (mirrors CSS variables)
│   │
│   └── styles/
│       ├── globals.css     # CSS variables, reset, base
│       ├── animations.css  # Keyframe animations
│       └── typography.css  # Font declarations
│
├── vite.config.ts
├── tsconfig.json
└── package.json
```

### Component Design Principles

1. **Screens** = top-level route components, own their data-fetching/subscription logic
2. **Cards** = presentational + interactive, receive data via props
3. **UI primitives** = completely stateless, pure display
4. **Modals** = rendered via portal at root level, avoid z-index wars
5. **All components** = default export, named interface, JSDoc for props

---

## 7. State Management

### Why Zustand

Zustand is chosen over Redux (too verbose), Context API (performance issues with frequent updates during Butcher Mode weight entry), and Jotai (atomic model is overkill for this app's structure).

### Store Architecture

```typescript
// store/useAppStore.ts

interface AppStore {
  // ── STATE ──
  events: QurbaniEvent[];
  activeEventId: string | null;
  settings: UserSettings;

  // ── DERIVED (computed via selectors) ──
  // Never stored, always computed
  
  // ── ACTIONS ──
  
  // Events
  addEvent: (name: string) => void;
  updateEvent: (id: string, updates: Partial<QurbaniEvent>) => void;
  deleteEvent: (id: string) => void;
  setActiveEvent: (id: string) => void;

  // Animals
  addAnimal: (eventId: string, animal: Omit<Animal, 'id'>) => void;
  updateAnimal: (eventId: string, animal: Animal) => void;
  deleteAnimal: (eventId: string, animalId: string) => void;

  // Parts
  addPart: (eventId: string, animalId: string, part: Omit<MeatPart, 'id'>) => void;
  updatePart: (eventId: string, animalId: string, part: MeatPart) => void;
  deletePart: (eventId: string, animalId: string, partId: string) => void;

  // Shareholders
  addShareholder: (eventId: string, animalId: string, s: Omit<Shareholder, 'id'>) => void;
  updateShareholder: (eventId: string, animalId: string, s: Shareholder) => void;
  deleteShareholder: (eventId: string, animalId: string, id: string) => void;
  updateDeliveryStatus: (eventId: string, animalId: string, id: string, status: DeliveryStatus) => void;

  // Settings
  updateSettings: (updates: Partial<UserSettings>) => void;
  
  // Utilities
  exportData: () => string;        // JSON backup
  importData: (json: string) => void; // JSON restore
}
```

### Selectors (Derived State)

```typescript
// Pure selector functions — never stored, always computed
export const selectActiveEvent = (state: AppStore) =>
  state.events.find(e => e.id === state.activeEventId) ?? null;

export const selectAnimalStats = (animal: Animal) => ({
  totalKg:      animal.parts.reduce((s, p) => s + p.totalKg, 0),
  perShareKg:   animal.parts.reduce((s, p) => s + p.totalKg, 0) / (animal.shareholders.length || 1),
  paidCount:    animal.shareholders.filter(s => s.paymentStatus === 'paid').length,
  deliveredCount: animal.shareholders.filter(s => s.deliveryStatus !== 'pending').length,
});

export const selectEventStats = (event: QurbaniEvent) => {
  const allShariks = event.animals.flatMap(a => a.shareholders);
  return {
    animalCount:  event.animals.length,
    sharikCount:  allShariks.length,
    totalKg:      event.animals.reduce((s, a) => s + a.parts.reduce((s2, p) => s2 + p.totalKg, 0), 0),
    paidPct:      allShariks.length ? allShariks.filter(s => s.paymentStatus === 'paid').length / allShariks.length * 100 : 0,
    deliveredPct: allShariks.length ? allShariks.filter(s => s.deliveryStatus !== 'pending').length / allShariks.length * 100 : 0,
  };
};
```

### Persistence Configuration

```typescript
// Zustand persist middleware with custom storage
const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({ /* store definition */ }),
    {
      name: 'shariknama-v2',           // localStorage key
      version: 2,                       // schema version
      migrate: (persistedState, version) => {
        // Handle schema upgrades
        if (version === 1) {
          return migrateV1toV2(persistedState);
        }
        return persistedState;
      },
      partialize: (state) => ({
        // Only persist these fields (not UI state)
        events: state.events,
        activeEventId: state.activeEventId,
        settings: state.settings,
      }),
    }
  )
);
```

---

## 8. Data Layer & Storage

### Phase 1: localStorage Strategy

**Schema versioning** prevents data corruption on app updates:

```typescript
// utils/storage.ts
const STORAGE_KEY = 'shariknama-v2';
const SCHEMA_VERSION = 2;

interface StorageEnvelope {
  version: number;
  data: AppState;
  savedAt: string;
}

export const storage = {
  save: (state: AppState): void => {
    const envelope: StorageEnvelope = {
      version: SCHEMA_VERSION,
      data: state,
      savedAt: new Date().toISOString(),
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(envelope));
    } catch (e) {
      if (e instanceof DOMException && e.name === 'QuotaExceededError') {
        // Show user warning: "Storage full. Please export a backup."
        notifyStorageFull();
      }
    }
  },
  
  load: (): AppState | null => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const envelope = JSON.parse(raw) as StorageEnvelope;
      return runMigrations(envelope);
    } catch {
      return null;
    }
  },
  
  export: (): string => {
    return localStorage.getItem(STORAGE_KEY) ?? '{}';
  },
  
  import: (json: string): boolean => {
    try {
      const envelope = JSON.parse(json) as StorageEnvelope;
      const migrated = runMigrations(envelope);
      storage.save(migrated);
      return true;
    } catch {
      return false;
    }
  },
};
```

**Storage Size Estimation:**
- 1 event + 5 animals + 35 shareholders + 5 parts each ≈ ~50KB
- localStorage limit: 5–10MB
- SharikNama can store ~100 years of events comfortably
- Photos stored separately (IndexedDB, Phase 2)

### Phase 2: IndexedDB for Media

Photos and larger blobs use IndexedDB via `idb` library:

```typescript
import { openDB } from 'idb';

const db = openDB('shariknama-media', 1, {
  upgrade(db) {
    db.createObjectStore('photos', { keyPath: 'id' });
  },
});

// Store photo
const savePhoto = async (id: string, blob: Blob) => {
  (await db).put('photos', { id, blob, savedAt: Date.now() });
};
```

### Phase 2: Supabase Sync

```typescript
// Conflict resolution: last-write-wins with timestamp
// Offline queue: actions buffered, replayed when online

interface SyncQueue {
  operations: {
    type: 'upsert' | 'delete';
    table: string;
    data: unknown;
    timestamp: number;
  }[];
}
```

---

## 9. API Design (Phase 2+)

### RESTful Resource Structure (Supabase Auto-Generated)

```
POST   /events              Create event
GET    /events              List user's events
PATCH  /events/:id          Update event
DELETE /events/:id          Delete event

POST   /animals             Add animal to event
GET    /animals?event_id=   List animals in event
PATCH  /animals/:id         Update animal
DELETE /animals/:id         Delete animal

POST   /shareholders        Add shareholder
GET    /shareholders?animal_id=  List shareholders
PATCH  /shareholders/:id    Update status
DELETE /shareholders/:id    Remove

POST   /parts               Add meat part
PATCH  /parts/:id           Update kg weight
DELETE /parts/:id           Remove part

GET    /receipts/:sharik_id  Get shareholder receipt (public, no auth)
GET    /qr/:sharik_id        Get QR code data (public)
```

### Edge Functions

```typescript
// supabase/functions/generate-receipt-pdf/index.ts
// Generates PDF server-side using Puppeteer

// supabase/functions/send-whatsapp/index.ts
// Twilio WhatsApp Business API (Phase 3)

// supabase/functions/generate-qr/index.ts
// Returns QR code PNG for public receipt URL
```

---

## 10. Authentication & Authorization

### Phase 1: No Authentication
- No user accounts required
- All data is local and anonymous
- No PII transmitted anywhere

### Phase 2: Phone OTP (Primary)

**Why phone OTP over email:**
- Target audience in Pakistan/Bangladesh is much more comfortable with OTP SMS than email accounts
- Lower friction for non-technical users
- Works on basic phones without email clients

```typescript
// Supabase Phone Auth
const { data, error } = await supabase.auth.signInWithOtp({
  phone: '+923001234567',
});

// Verify OTP
const { data, error } = await supabase.auth.verifyOtp({
  phone: '+923001234567',
  token: '123456',
  type: 'sms',
});
```

### Role-Based Access Control (Phase 2)

```sql
-- Supabase RLS Policies

-- Events: owner has full access
CREATE POLICY "event_owner_access"
  ON events FOR ALL
  USING (auth.uid() = owner_id);

-- Admins: invited members can read/write
CREATE POLICY "event_admin_access"
  ON events FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM event_admins
      WHERE event_id = events.id
      AND user_id = auth.uid()
      AND role IN ('admin', 'viewer')
    )
  );

-- Public receipts: anyone with the sharik ID can read
CREATE POLICY "public_receipt_read"
  ON shareholders FOR SELECT
  USING (receipt_public = true);
```

### Role Definitions

| Role | Permissions |
|---|---|
| `owner` | Full CRUD on event, animals, shariks, admins |
| `admin` | Full CRUD except delete event or manage admins |
| `butcher` | Can only update part weights (Butcher Mode) |
| `viewer` | Read-only access to all data |

---

## 11. Offline & Sync Strategy

### Service Worker (Phase 1 — via Workbox)

```typescript
// vite.config.ts — PWA configuration
import { VitePWA } from 'vite-plugin-pwa';

export default {
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      strategies: 'generateSW',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        runtimeCaching: [
          {
            // Google Fonts — stale-while-revalidate
            urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\/.*/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'google-fonts',
              expiration: { maxEntries: 4, maxAgeSeconds: 365 * 24 * 60 * 60 },
            },
          },
        ],
      },
      manifest: {
        name: 'SharikNama',
        short_name: 'SharikNama',
        description: 'Eid-ul-Adha Qurbani Management',
        theme_color: '#00D09C',
        background_color: '#080C18',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        icons: [
          { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
    }),
  ],
};
```

### Phase 2: Optimistic Updates + Sync Queue

```
User Action (offline)
  └── Update local Zustand store immediately (optimistic)
      └── Add operation to SyncQueue (IndexedDB)
          └── Show "Saved locally" indicator

Network comes back online
  └── Process SyncQueue FIFO
      └── Send operations to Supabase
          ├── Success → Remove from queue
          └── Conflict → Last-write-wins by timestamp
              └── Show toast: "Synced ✓"
```

---

## 12. File & Media Handling

### Phase 2: Photo Proof Mode

```typescript
// Camera capture for animal proof photos
const capturePhoto = async (): Promise<string> => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.capture = 'environment'; // rear camera
  
  return new Promise((resolve) => {
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      
      // Compress before storage
      const compressed = await compressImage(file, { maxWidth: 1200, quality: 0.8 });
      const base64 = await fileToBase64(compressed);
      resolve(base64);
    };
    input.click();
  });
};

// Compression utility
const compressImage = (file: File, options: { maxWidth: number; quality: number }): Promise<Blob> => {
  return new Promise((resolve) => {
    const img = new Image();
    const canvas = document.createElement('canvas');
    img.onload = () => {
      const scale = Math.min(1, options.maxWidth / img.width);
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      canvas.getContext('2d')!.drawImage(img, 0, 0, canvas.width, canvas.height);
      canvas.toBlob(blob => resolve(blob!), 'image/jpeg', options.quality);
    };
    img.src = URL.createObjectURL(file);
  });
};
```

---

## 13. Notifications & Sharing

### WhatsApp Share (Phase 1)

```typescript
// utils/share.ts
export const buildWhatsAppMessage = (sharik: Shareholder, animal: Animal, eventName: string): string => {
  const count = animal.shareholders.length;
  const partsText = animal.parts
    .map(p => `${getPartIcon(p.name)} ${p.name.padEnd(12)}: *${(p.totalKg / count).toFixed(2)} kg*`)
    .join('\n');
  const totalKg = animal.parts.reduce((s, p) => s + p.totalKg, 0) / count;
  
  return `🌙 *Eid-ul-Adha — SharikNama*

As-salamu alaykum *${sharik.name}*,
Your Qurbani share from *${animal.name}* is ready!

📦 *Your Share Details:*
${partsText}

📊 *Total Share: ${totalKg.toFixed(2)} kg*
🚚 Status: ${deliveryStatusText(sharik.deliveryStatus)}

JazakAllah Khair 🤲
_Sent via SharikNama_`;
};

export const openWhatsApp = (phone: string | null, message: string): void => {
  const encoded = encodeURIComponent(message);
  const phoneStr = phone ? normalizePhone(phone) : '';
  window.open(`https://wa.me/${phoneStr}?text=${encoded}`, '_blank');
};
```

### Web Share API (Phase 1 fallback)

```typescript
export const nativeShare = async (title: string, text: string): Promise<boolean> => {
  if (navigator.share) {
    try {
      await navigator.share({ title, text });
      return true;
    } catch {
      return false;
    }
  }
  // Fallback: copy to clipboard
  await navigator.clipboard.writeText(text);
  return false;
};
```

### Push Notifications (Phase 2)

```typescript
// Request permission
const requestPushPermission = async () => {
  const permission = await Notification.requestPermission();
  if (permission === 'granted') {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: VAPID_PUBLIC_KEY,
    });
    await saveSubscription(subscription); // to Supabase
  }
};

// Trigger: all shares marked as delivered
// Send: "✅ All 7 shares from Cow #1 have been distributed!"
```

### SMS via Twilio (Phase 2)

```typescript
// supabase/functions/send-sms/index.ts
import twilio from 'twilio';

const client = twilio(Deno.env.get('TWILIO_SID'), Deno.env.get('TWILIO_TOKEN'));

Deno.serve(async (req) => {
  const { phone, message } = await req.json();
  await client.messages.create({
    body: message,
    from: Deno.env.get('TWILIO_PHONE'),
    to: phone,
  });
  return new Response(JSON.stringify({ success: true }));
});
```

---

## 14. Performance Strategy

### Bundle Size Targets (Phase 1)

| Bundle | Target | Strategy |
|---|---|---|
| Initial JS | < 80KB gzipped | Code split by screen |
| CSS | < 20KB | CSS variables, no Tailwind (no purge complexity) |
| Fonts | < 60KB | Subset to Latin + Arabic required glyphs |
| Total First Load | < 200KB | |
| Lighthouse Performance | ≥ 85 | |

### Code Splitting

```typescript
// Lazy load non-critical screens
const ButcherModeScreen    = lazy(() => import('./screens/ButcherModeScreen'));
const WeightEstimatorScreen = lazy(() => import('./screens/WeightEstimatorScreen'));
const EventsScreen          = lazy(() => import('./screens/EventsScreen'));
```

### Rendering Optimization

```typescript
// Heavy list memoization
const SharikList = memo(({ shareholders, onTap }: SharikListProps) => (
  <div>
    {shareholders.map(s => <SharikCard key={s.id} sharik={s} onTap={onTap} />)}
  </div>
));

// Selector memoization — prevent re-renders on unrelated store changes
const stats = useAppStore(useCallback(
  state => selectEventStats(selectActiveEvent(state)),
  []
));
```

### CSS Performance

```css
/* Use contain to limit paint areas */
.animal-card { contain: layout style; }
.modal-overlay { contain: layout; }

/* GPU-accelerate transitions */
.animal-card { will-change: transform; }
.modal { will-change: transform; }

/* Use CSS variables — change once, apply everywhere */
:root { --primary: #00D09C; }
/* Don't use JS to change colors */
```

---

## 15. Testing Strategy

### Test Pyramid

```
        ┌─────────────────┐
        │   E2E (Playwright)│  5%
        │   "Happy paths"  │
        └────────┬─────────┘
           ┌─────┴─────┐
           │Integration │  25%
           │(RTL + store)│
           └─────┬──────┘
             ┌───┴───┐
             │  Unit  │  70%
             │(utils, │
             │calcs,  │
             │models) │
             └────────┘
```

### Unit Tests (Vitest)

```typescript
// utils/calculations.test.ts
describe('perShareKg', () => {
  it('divides total kg equally among shareholders', () => {
    const animal = mockAnimal({ parts: [{ id:'1', name:'Beef', totalKg:42 }], shareholders: Array(7).fill(mockSharik()) });
    expect(perShareKg(animal.parts[0], animal)).toBe(6.0);
  });
  
  it('returns 0 when no shareholders', () => {
    const animal = mockAnimal({ shareholders: [] });
    expect(perShareKg(animal.parts[0], animal)).toBe(0);
  });
  
  it('handles fractional shares', () => {
    // Sharik with 2 shares out of 8 total
    expect(totalShareKg(animal, { ...sharik, shares: 2 })).toBeCloseTo(24.0);
  });
});

describe('yieldEstimate', () => {
  it('estimates cow yield correctly', () => {
    const result = estimateYield(350, 'cow');
    expect(result.meat).toBeCloseTo(133); // 350 * 0.38
    expect(result.bone).toBeCloseTo(42);  // 350 * 0.12
  });
});
```

### Integration Tests (React Testing Library)

```typescript
// screens/ButcherMode.test.tsx
it('saves weight when user taps part, enters numpad, and confirms', async () => {
  render(<ButcherModeScreen animal={mockCow} onUpdate={jest.fn()} onBack={jest.fn()} />);
  
  // Tap Solid Beef card
  await userEvent.click(screen.getByText('Solid Beef'));
  
  // Enter 48.5 on numpad
  await userEvent.click(screen.getByText('4'));
  await userEvent.click(screen.getByText('8'));
  await userEvent.click(screen.getByText('.'));
  await userEvent.click(screen.getByText('5'));
  
  // Confirm
  await userEvent.click(screen.getByText('Save Weight'));
  
  // Card updates
  expect(screen.getByText('48.5')).toBeInTheDocument();
});
```

### E2E Tests (Playwright)

```typescript
// e2e/complete-qurbani-setup.spec.ts
test('complete Qurbani setup flow', async ({ page }) => {
  await page.goto('/');
  await page.click('text=Create Event');
  await page.fill('[placeholder*="event name"]', 'Test Eid 2026');
  await page.click('text=Create');
  
  await page.click('text=Add Animal');
  await page.fill('[placeholder*="Cow #1"]', 'Test Cow');
  await page.click('text=Add Animal');
  
  // Add 7 shariks
  for (let i = 1; i <= 7; i++) {
    await page.click('text=Add Sharik');
    await page.fill('[placeholder*="Tanvir"]', `Sharik ${i}`);
    await page.click('button:has-text("Add Sharik")');
  }
  
  // Verify per-share calculation displayed
  await expect(page.locator('text=/\\d+\\.\\d{2} kg \/ share/')).toBeVisible();
});
```

---

## 16. DevOps & Infrastructure

### Phase 1 Hosting

```
GitHub Repository
  └── GitHub Actions (CI/CD)
      ├── On PR: lint + test
      └── On merge to main:
          ├── vite build
          ├── Bundle size check (< 200KB limit)
          └── Deploy to Vercel (automatic)
```

**Vercel** is chosen for Phase 1:
- Free tier covers projected Phase 1 traffic
- Automatic HTTPS (required for PWA / Service Worker)
- Edge network (fast in South Asia via Singapore PoP)
- Zero-config deployment from GitHub

### GitHub Actions Workflow

```yaml
# .github/workflows/deploy.yml
name: Build & Deploy

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test-and-build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20', cache: 'npm' }
      - run: npm ci
      - run: npm run lint
      - run: npm run typecheck
      - run: npm run test
      - run: npm run build
      - name: Check bundle size
        run: npx bundlewatch
      
  deploy:
    needs: test-and-build
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

### Phase 2 Infrastructure

```
Vercel (Frontend PWA)
  │
  ├── Supabase (Backend)
  │   ├── PostgreSQL database
  │   ├── Auth (Phone OTP)
  │   ├── Storage (photos)
  │   ├── Edge Functions (Deno)
  │   └── Realtime (websockets)
  │
  ├── Cloudflare (Phase 3)
  │   ├── CDN + DDoS protection
  │   └── R2 for media storage
  │
  └── Twilio
      └── SMS for OTP + notifications
```

### Environment Configuration

```bash
# .env.local (never committed)
VITE_APP_VERSION=2.0.0
VITE_SUPABASE_URL=https://xxx.supabase.co       # Phase 2
VITE_SUPABASE_ANON_KEY=eyJhbGci...              # Phase 2
VITE_VAPID_PUBLIC_KEY=BNxxxxxx                  # Phase 2 push
```

---

## 17. Security Architecture

### Phase 1 Threat Model

| Threat | Risk | Mitigation |
|---|---|---|
| localStorage data accessed by malicious browser extension | Low | No PII transmitted; data is non-sensitive (meat weights) |
| XSS attacks | Low | React's JSX auto-escapes; no dangerouslySetInnerHTML |
| Data loss on browser clear | Medium | Export/import backup feature; clear user warning |
| Fake app impersonating SharikNama | Low | Canonical domain, HTTPS, clear branding |

### Phase 2 Threat Model

| Threat | Risk | Mitigation |
|---|---|---|
| Unauthorized access to event data | High | Supabase RLS, server-side enforcement |
| Phone number harvest | Medium | Hashed before storage, access logged |
| Event data tampering by rogue admin | Medium | Audit log, owner-only delete |
| OTP interception | Low | Twilio's secure channel, short expiry (5min) |
| SQL injection | Low | Supabase parameterized queries |
| JWT theft | Medium | Short expiry (1hr), refresh token rotation |

### Content Security Policy

```html
<!-- index.html -->
<meta http-equiv="Content-Security-Policy"
  content="
    default-src 'self';
    script-src 'self';
    style-src 'self' https://fonts.googleapis.com 'unsafe-inline';
    font-src 'self' https://fonts.gstatic.com;
    img-src 'self' data: blob:;
    connect-src 'self' https://*.supabase.co wss://*.supabase.co;
  ">
```

---

## 18. Localization & i18n

### Phase 1: English Only (with Arabic elements)

Arabic/Urdu strings (Bismillah, animal names) hardcoded in Amiri font. Full i18n structure established but only `en` locale populated.

### Phase 2: Multi-language

```
src/
└── locales/
    ├── en/
    │   ├── common.json    # Buttons, labels
    │   ├── animals.json   # Animal type names
    │   └── checklist.json # Islamic checklist items
    ├── ur/                # Urdu
    └── ar/                # Arabic
```

**i18n Library:** `react-i18next` — industry standard, tree-shakeable, lazy loads locale files.

**RTL Support:** CSS logical properties used throughout:

```css
/* Instead of margin-left, use margin-inline-start */
/* This automatically flips in RTL mode */
.sharik-avatar { margin-inline-end: 12px; }
.back-btn { align-self: flex-start; }

/* RTL mode triggered by HTML dir attribute */
html[dir="rtl"] .bottom-nav { flex-direction: row-reverse; }
```

---

## 19. Monitoring & Observability

### Phase 1

| Tool | Purpose | Privacy |
|---|---|---|
| Vercel Analytics | Page views (aggregated, no PII) | Privacy-safe |
| Vercel Speed Insights | Core Web Vitals | No PII |
| Manual error boundary | Catch React errors, show "reload" screen | No external reporting |

### Phase 2

| Tool | Purpose |
|---|---|
| **Sentry** | Error tracking (with PII scrubbing) |
| **Plausible** | Privacy-first analytics (no cookies, GDPR compliant) |
| **Supabase Logs** | Database query performance |
| **Uptime Robot** | Availability monitoring (free tier) |

### Error Boundary

```tsx
// components/ErrorBoundary.tsx
class ErrorBoundary extends React.Component<Props, State> {
  componentDidCatch(error: Error, info: ErrorInfo) {
    // Phase 1: console only
    // Phase 2: Sentry.captureException(error, { extra: info });
    console.error('SharikNama error:', error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ textAlign: 'center', padding: 40 }}>
          <div style={{ fontSize: 48 }}>🌙</div>
          <h2>Something went wrong</h2>
          <p>Your data is safe. Please refresh the app.</p>
          <button onClick={() => window.location.reload()}>Reload</button>
        </div>
      );
    }
    return this.props.children;
  }
}
```

---

## 20. Dependency Decisions & ADRs

### ADR-001: React over Vue or Svelte
**Decision:** React 18  
**Reasoning:** Largest talent pool in South Asian dev community; best ecosystem for complex state patterns; Zustand and testing tools more mature. Svelte's smaller bundle advantage is outweighed by hiring considerations.

### ADR-002: Zustand over Redux Toolkit
**Decision:** Zustand  
**Reasoning:** Redux's boilerplate is unnecessary for this app's data scale. Zustand with persist middleware covers all Phase 1 needs in ~100 lines vs Redux's ~400. Easier for contributors to understand.

### ADR-003: CSS Variables over Tailwind
**Decision:** CSS Variables + CSS Modules  
**Reasoning:** The design system is dark-first with specific glow and glassmorphism effects that require direct CSS control. Tailwind's JIT requires build-time purging complexity, and the dark color system doesn't map cleanly to Tailwind's palette. CSS variables are zero-runtime and infinitely flexible.

### ADR-004: Supabase over Firebase (Phase 2)
**Decision:** Supabase  
**Reasoning:** Relational data model (events → animals → shareholders) maps perfectly to PostgreSQL. Firestore's NoSQL approach would require denormalization. Supabase is open-source and self-hostable — important for trust with a religious-use-case app.

### ADR-005: No component library (Phase 1)
**Decision:** Custom UI components  
**Reasoning:** The design system is highly specific (dark navy, teal glow, Islamic aesthetics). Using shadcn/ui or MUI would require overriding most styles, adding bundle weight for no benefit. Custom components take ~3 days but result in a pixel-perfect match to the Figma design.

### ADR-006: WhatsApp deep link over Business API
**Decision:** wa.me URL scheme  
**Reasoning:** WhatsApp Business API requires business verification and costs per message. wa.me is free, instant, and works for all users. The user controls the send action, which is more appropriate for a personal/community use case.

### ADR-007: localStorage over IndexedDB (Phase 1)
**Decision:** localStorage with Zustand persist  
**Reasoning:** The data model is small (< 100KB for typical use). localStorage is synchronous (simpler code), universally supported, and sufficient for Phase 1. IndexedDB added in Phase 2 for photo blobs only.

---

## Summary Table

| Concern | Phase 1 | Phase 2 | Phase 3 |
|---|---|---|---|
| Framework | React 18 + Vite | → | Next.js 14 (web) |
| Language | TypeScript 5 | → | → |
| State | Zustand | → | → |
| Styling | CSS Variables | → | → |
| Storage | localStorage | + IndexedDB + Supabase | → |
| Auth | None | Supabase Phone OTP | → |
| Backend | None | Supabase (PG) | + Edge Functions |
| Hosting | Vercel | → | + Cloudflare |
| SMS | None | Twilio | → |
| PDF | None | jsPDF (client) | Server-side (Puppeteer) |
| QR | qrcode.react | + QR scanning | → |
| CI/CD | GitHub Actions + Vercel | → | → |
| Monitoring | Vercel Analytics | + Sentry + Plausible | → |
| Testing | Vitest + RTL | + Playwright E2E | → |

---

*Document prepared by the SharikNama Engineering Team*  
*Update this document when architectural decisions change. Every ADR should be recorded.*

---

**SharikNama — Built for Eid. Trusted by families.** 🌙
