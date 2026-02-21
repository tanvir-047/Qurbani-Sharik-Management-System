import { useState, useEffect, useMemo, useCallback } from "react";

/* ══════════════════════════════════════════════════════════════════
   SVG ICON SYSTEM — Premium outline icons matching Figma style
══════════════════════════════════════════════════════════════════ */
const Svg = ({ size = 22, sw = 1.8, vb = "0 0 24 24", children, style }) => (
  <svg width={size} height={size} viewBox={vb} fill="none" stroke="currentColor"
       strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" style={style}>
    {children}
  </svg>
);

// Cow head — matches Image 2 reference (horns, face, snout, nostrils)
const ICow = p => <Svg {...p}>
  <path d="M8 7.5Q7 4.5 5 3M16 7.5Q17 4.5 19 3"/>
  <rect x="5" y="7" width="14" height="13" rx="6"/>
  <circle cx="9.5" cy="12" r="1.3" fill="currentColor" stroke="none"/>
  <circle cx="14.5" cy="12" r="1.3" fill="currentColor" stroke="none"/>
  <ellipse cx="12" cy="17" rx="3.5" ry="2"/>
  <circle cx="10.8" cy="17" r="0.7" fill="currentColor" stroke="none"/>
  <circle cx="13.2" cy="17" r="0.7" fill="currentColor" stroke="none"/>
</Svg>;

// House — matches Image 2 reference
const IHome = p => <Svg {...p}>
  <path d="M3 10.5L12 3l9 7.5V21a1 1 0 01-1 1H4a1 1 0 01-1-1z"/>
  <polyline points="9,22 9,13 15,13 15,22"/>
</Svg>;

// Person — gummy-bear silhouette matching Image 2
const IUser = p => <Svg {...p}>
  <circle cx="12" cy="7.5" r="4"/>
  <path d="M5 22c0-3.9 3.1-7 7-7s7 3.1 7 7"/>
</Svg>;

// Stacked layers — matches Image 2
const IStack = p => <Svg {...p}>
  <polygon points="12,2 22,7 12,12 2,7"/>
  <polyline points="2,17 12,22 22,17"/>
  <polyline points="2,12 12,17 22,12"/>
</Svg>;

// Action icons
const IPlus    = p => <Svg {...p} sw={2.5}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></Svg>;
const ITrash   = p => <Svg {...p}><polyline points="3,6 5,6 21,6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></Svg>;
const IEdit    = p => <Svg {...p}><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 013 3L12 15l-4 1 1-4z"/></Svg>;
const IBack    = p => <Svg {...p}><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12,19 5,12 12,5"/></Svg>;
const IChevD   = p => <Svg {...p} sw={2}><polyline points="6,9 12,15 18,9"/></Svg>;
const ICheck   = p => <Svg {...p} sw={2.5}><polyline points="20,6 9,17 4,12"/></Svg>;
const IWA      = p => <Svg {...p}><path d="M21 11.5a8.4 8.4 0 01-.9 3.8A8.5 8.5 0 0112 20a8.4 8.4 0 01-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 01-.9-3.8A8.5 8.5 0 0112 3h.5a8.5 8.5 0 018 8.5z"/></Svg>;
const ISun     = p => <Svg {...p}><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></Svg>;
const IMoon    = p => <Svg {...p}><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></Svg>;
// Kettlebell — matches weight icon from Image 1
const IScale = p => <Svg {...p}>
  <path d="M9 10 A3 3 0 0 1 15 10" strokeLinecap="round"/>
  <path d="M7.2 10 C5.4 10 4 11.3 4 13 C4 14.5 5.1 15.7 6.6 16"/>
  <path d="M16.8 10 C18.6 10 20 11.3 20 13 C20 14.5 18.9 15.7 17.4 16"/>
  <rect x="6" y="15.5" width="12" height="7.5" rx="3.8"/>
</Svg>;
const IChevR   = p => <Svg {...p} sw={2}><polyline points="9,18 15,12 9,6"/></Svg>;
const IShield  = p => <Svg {...p}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></Svg>;
const IStar    = p => <Svg {...p} sw={1.5}><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></Svg>;

/* ══════════════════════════════════════════════════════════════════
   CONSTANTS & HELPERS
══════════════════════════════════════════════════════════════════ */
const ANIMAL_TYPES  = ["cow","goat","sheep","camel","buffalo"];
const ANIMAL_LABELS = { cow:"Cow", goat:"Goat", sheep:"Sheep", camel:"Camel", buffalo:"Buffalo" };
const ANIMAL_EMOJI  = { cow:"🐄", goat:"🐐", sheep:"🐑", camel:"🐪", buffalo:"🦬" };
const YIELD = {
  cow:     { meat:0.38, bone:0.12, fat:0.08, offal:0.05 },
  goat:    { meat:0.42, bone:0.10, fat:0.06, offal:0.04 },
  sheep:   { meat:0.40, bone:0.11, fat:0.09, offal:0.04 },
  camel:   { meat:0.35, bone:0.14, fat:0.07, offal:0.05 },
  buffalo: { meat:0.36, bone:0.13, fat:0.07, offal:0.05 },
};
const COMMON_PARTS = ["Solid Beef","Bone","Fat","Liver","Heart","Kidney","Head","Trotters","Skin","Other"];
const CHECKLIST = [
  "Animal is free from defects and healthy",
  "Animal has reached minimum age requirement",
  "Niyyah (intention) has been made",
  "Bismillah Allahu Akbar recited before slaughter",
  "Blade is sharp and not shown to the animal",
  "Direction of Qibla confirmed",
  "Animal slaughtered away from other animals",
];
const AVATAR_COLORS = ["#00C9A7","#F5A623","#4A90E2","#9B59B6","#E74C3C","#1ABC9C","#E67E22"];

const mkId    = () => Math.random().toString(36).slice(2,9);
const initials= n => n ? n.split(" ").map(w=>w[0]).join("").toUpperCase().slice(0,2) : "?";
const avColor = n => AVATAR_COLORS[(n.charCodeAt(0)+(n.charCodeAt(1)||0)) % AVATAR_COLORS.length];
const autoName= (type, list) => `${ANIMAL_LABELS[type]} #${list.filter(a=>a.type===type).length+1}`;

const DEFAULT_PARTS = () => [
  {id:mkId(), name:"Solid Beef", totalKg:0},
  {id:mkId(), name:"Bone",       totalKg:0},
  {id:mkId(), name:"Fat",        totalKg:0},
  {id:mkId(), name:"Liver",      totalKg:0},
  {id:mkId(), name:"Other",      totalKg:0},
];

// ── Weighted share calculation ──────────────────────────────────────
// If a sharik has shares=3, they receive 3× the base unit.
const totalSlots   = a => a.shareholders.reduce((s,sh) => s+(sh.shares||1), 0) || 1;
const perSlotKg    = a => a.parts.reduce((s,p) => s+Number(p.totalKg), 0) / totalSlots(a);
const sharikTotalKg= (a,sh) => perSlotKg(a) * (sh.shares||1);
const sharikParts  = (a,sh) => a.parts.map(p => ({
  ...p,
  sharikKg: (Number(p.totalKg) / totalSlots(a)) * (sh.shares||1)
}));

const INIT_DATA = {
  events:[{
    id:"ev1", name:"Eid-ul-Adha 2026", year:2026, createdAt:new Date().toISOString(),
    animals:[{
      id:"an1", name:"Cow #1", type:"cow", liveWeight:320, notes:"",
      checklist: CHECKLIST.map((_,i)=>i<3),
      parts:[
        {id:"p1",name:"Solid Beef",totalKg:48},{id:"p2",name:"Bone",totalKg:18},
        {id:"p3",name:"Fat",totalKg:12},{id:"p4",name:"Liver",totalKg:4},{id:"p5",name:"Other",totalKg:6},
      ],
      shareholders:[
        {id:"s1",name:"Tanvir Ahmed",   phone:"0300-1234567",shares:1,paymentStatus:"paid",   specialRequest:"Less bone",   deliveryStatus:"delivered"},
        {id:"s2",name:"Hasan Ali",      phone:"0321-9876543",shares:1,paymentStatus:"pending",specialRequest:"",            deliveryStatus:"pending"},
        {id:"s3",name:"Zainab Malik",   phone:"0333-5556666",shares:1,paymentStatus:"paid",   specialRequest:"Extra liver", deliveryStatus:"collected"},
        {id:"s4",name:"Ibrahim Khan",   phone:"0311-2223333",shares:1,paymentStatus:"partial",specialRequest:"",            deliveryStatus:"pending"},
        {id:"s5",name:"Fatima Noor",    phone:"0345-7778889",shares:1,paymentStatus:"paid",   specialRequest:"",            deliveryStatus:"pending"},
        {id:"s6",name:"Amir Siddiqui", phone:"0312-4445556",shares:1,paymentStatus:"paid",   specialRequest:"No fat",      deliveryStatus:"delivered"},
        {id:"s7",name:"Rukhsana Begum",phone:"0301-8889990",shares:1,paymentStatus:"pending",specialRequest:"",            deliveryStatus:"pending"},
      ],
    }],
  }],
  activeEventId:"ev1",
};

/* ══════════════════════════════════════════════════════════════════
   GLOBAL CSS — Poppins, dual theme, curved header layout
══════════════════════════════════════════════════════════════════ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&family=Amiri:wght@400;700&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}

/* ── DARK THEME ── */
:root[data-theme="dark"]{
  --hdr-bg:      #061020;
  --bg:          #0D1626;
  --surface:     #152033;
  --surface-2:   #1C2A40;
  --surface-3:   #243349;
  --primary:     #00D09C;
  --primary-dk:  #00A87A;
  --primary-dim: rgba(0,208,156,0.10);
  --primary-bdr: rgba(0,208,156,0.28);
  --primary-glow:0 0 24px rgba(0,208,156,0.22);
  --text-1:      #FFFFFF;
  --text-2:      #8B9BB4;
  --text-3:      #3D5070;
  --border:      rgba(255,255,255,0.07);
  --border-2:    rgba(255,255,255,0.13);
  --card-shadow: 0 2px 16px rgba(0,0,0,0.50);
  --modal-shadow:0 20px 60px rgba(0,0,0,0.75);
  --gold:        #F5A623;
  --gold-dim:    rgba(245,166,35,0.14);
  --red:         #FF5C5C;
  --red-dim:     rgba(255,92,92,0.14);
  --blue:        #4A90E2;
  --blue-dim:    rgba(74,144,226,0.14);
  --input-bg:    #1C2A40;
  --input-bdr:   rgba(255,255,255,0.12);
  --prog-track:  #1C2A40;
  --nav-bg:      #152033;
  --nav-bdr:     rgba(255,255,255,0.08);
  --nav-active:  #00D09C;
  --receipt-bg:  linear-gradient(160deg,#0D1E40,#0A1020);
  --receipt-bdr: rgba(0,208,156,0.22);
  --fab-glow:    0 6px 20px rgba(0,208,156,0.45);
  --stat-hero:   linear-gradient(135deg,#00D09C,#00A87A);
  --stat-gold:   linear-gradient(135deg,#F5A623,#E8921A);
  --stat-hero-c: rgba(0,0,0,0.85);
  --chip-bg:     rgba(0,208,156,0.10);
  --chip-bdr:    rgba(0,208,156,0.28);
  --chip-txt:    rgba(255,255,255,0.85);
  --hdr-name-c:  #00D09C;
}

/* ── LIGHT THEME — Figma-inspired teal + mint ── */
:root[data-theme="light"]{
  --hdr-bg:      #00C9A7;
  --bg:          #EDF7F3;
  --surface:     #FFFFFF;
  --surface-2:   #F0FAF6;
  --surface-3:   #E0F2EC;
  --primary:     #00C9A7;
  --primary-dk:  #00A88A;
  --primary-dim: rgba(0,201,167,0.10);
  --primary-bdr: rgba(0,201,167,0.28);
  --primary-glow:0 0 24px rgba(0,201,167,0.20);
  --text-1:      #0A2018;
  --text-2:      #4A7060;
  --text-3:      #90B0A5;
  --border:      rgba(0,0,0,0.07);
  --border-2:    rgba(0,0,0,0.12);
  --card-shadow: 0 2px 12px rgba(0,100,70,0.10);
  --modal-shadow:0 20px 60px rgba(0,0,0,0.25);
  --gold:        #D97A00;
  --gold-dim:    rgba(217,122,0,0.12);
  --red:         #D63031;
  --red-dim:     rgba(214,48,49,0.10);
  --blue:        #2980B9;
  --blue-dim:    rgba(41,128,185,0.10);
  --input-bg:    #F0FAF6;
  --input-bdr:   rgba(0,0,0,0.12);
  --prog-track:  #D5EDE5;
  --nav-bg:      #FFFFFF;
  --nav-bdr:     rgba(0,100,70,0.10);
  --nav-active:  #00C9A7;
  --receipt-bg:  linear-gradient(160deg,#E8F5EF,#D5EDE5);
  --receipt-bdr: rgba(0,201,167,0.28);
  --fab-glow:    0 6px 20px rgba(0,201,167,0.40);
  --stat-hero:   linear-gradient(135deg,#00C9A7,#009E84);
  --stat-gold:   linear-gradient(135deg,#F5A623,#E8921A);
  --stat-hero-c: #FFFFFF;
  --chip-bg:     rgba(255,255,255,0.28);
  --chip-bdr:    rgba(255,255,255,0.45);
  --chip-txt:    #FFFFFF;
  --hdr-name-c:  #FFFFFF;
}

html,body,#root{height:100%;}
body{
  font-family:'Poppins',sans-serif;
  background:var(--hdr-bg);
  color:var(--text-1);
  -webkit-font-smoothing:antialiased;
  overflow:hidden;
  transition:background 0.3s,color 0.3s;
}
::-webkit-scrollbar{width:0;background:transparent;}

/* ── APP SHELL ── */
.app{
  max-width:430px;height:100dvh;margin:0 auto;
  background:var(--hdr-bg);
  display:flex;flex-direction:column;
  position:relative;overflow:hidden;
  transition:background 0.3s;
}

/* ── HEADER — transparent over hdr-bg (teal in light, dark in dark) ── */
.app-header{
  flex-shrink:0;
  background:transparent;
  padding:16px 20px 14px;
}
.header-row{display:flex;align-items:center;justify-content:space-between;}
.logo-title{
  font-family:'Poppins',sans-serif;font-size:20px;font-weight:800;
  color:var(--hdr-name-c);letter-spacing:-0.3px;line-height:1;
}
.header-actions{display:flex;gap:8px;}
.icon-btn{
  width:38px;height:38px;
  background:rgba(255,255,255,0.18);
  border:1px solid rgba(255,255,255,0.25);
  border-radius:12px;
  display:flex;align-items:center;justify-content:center;
  cursor:pointer;color:white;transition:all 0.15s;
}
.icon-btn:active{transform:scale(0.93);}

/* ── CONTENT CARD — rises from header with curved top ── */
.content-card{
  flex:1;
  background:var(--bg);
  border-radius:24px 24px 0 0;
  display:flex;flex-direction:column;
  overflow:hidden;
  box-shadow:0 -6px 30px rgba(0,0,0,0.15);
  transition:background 0.3s;
  margin-top:10px;
}

/* ── SCROLL AREA ── */
.scroll-area{flex:1;overflow-y:auto;-webkit-overflow-scrolling:touch;overscroll-behavior:contain;}

/* ── EVENT CHIP ── */
.event-chip{
  margin-top:10px;
  display:inline-flex;align-items:center;gap:7px;
  background:var(--chip-bg);
  border:1px solid var(--chip-bdr);
  border-radius:999px;padding:7px 14px;cursor:pointer;
  transition:all 0.15s;
}
.event-chip-dot{width:7px;height:7px;background:var(--hdr-name-c);border-radius:50%;}
.event-chip-name{font-size:12px;font-weight:600;color:var(--chip-txt);font-family:'Poppins',sans-serif;}
.event-chip svg{color:var(--chip-txt);opacity:0.7;}

/* ── BOTTOM NAV — floating pill card ── */
.bottom-nav{
  flex-shrink:0;
  margin:8px 16px 12px;
  background:var(--nav-bg);
  border:1px solid var(--nav-bdr);
  border-radius:28px;
  display:flex;align-items:center;
  padding:8px;
  box-shadow:0 8px 32px rgba(0,0,0,0.18);
  transition:background 0.3s;
}
.nav-item{
  flex:1;display:flex;flex-direction:column;align-items:center;gap:3px;
  padding:6px 4px;cursor:pointer;border:none;background:none;
  -webkit-tap-highlight-color:transparent;transition:all 0.2s;border-radius:16px;
}
.nav-icon-wrap{
  width:42px;height:42px;
  display:flex;align-items:center;justify-content:center;
  border-radius:50%;transition:all 0.2s;
  color:var(--text-3);
}
.nav-item.active .nav-icon-wrap{
  background:var(--nav-active);
  color:#fff;
  box-shadow:var(--fab-glow);
}
.nav-label{
  font-size:10px;font-weight:600;color:var(--text-3);
  font-family:'Poppins',sans-serif;letter-spacing:0.3px;transition:color 0.2s;
}
.nav-item.active .nav-label{color:var(--primary);font-weight:700;}
[data-theme="light"] .nav-item.active .nav-label{color:var(--primary-dk);}
.nav-fab{
  flex:0 0 auto;width:52px;height:52px;
  background:var(--primary);border-radius:50%;
  display:flex;align-items:center;justify-content:center;
  cursor:pointer;color:#fff;
  box-shadow:var(--fab-glow);
  margin:0 4px;transition:transform 0.15s;border:none;
}
.nav-fab:active{transform:scale(0.93);}

/* ── PAGE ── */
.page{padding:20px 20px 8px;animation:fadeUp 0.22s ease-out;}
@keyframes fadeUp{from{opacity:0;transform:translateY(8px);}to{opacity:1;transform:translateY(0);}}

/* ── SECTION HEADER ── */
.sec-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;}
.sec-title{font-family:'Poppins',sans-serif;font-size:17px;font-weight:700;color:var(--text-1);}
.sec-badge{background:var(--primary-dim);color:var(--primary);border:1px solid var(--primary-bdr);font-size:11px;font-weight:700;padding:3px 10px;border-radius:999px;font-family:'Poppins',sans-serif;}

/* ── STAT GRID ── */
.stat-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:14px;}
.stat-card{
  background:var(--surface);border:1px solid var(--border);border-radius:20px;
  padding:16px;position:relative;overflow:hidden;
  box-shadow:var(--card-shadow);transition:background 0.3s,transform 0.13s;cursor:default;
}
.stat-card.link{cursor:pointer;}
.stat-card.link:active{transform:scale(0.97);}
.stat-card.hero{background:var(--stat-hero);border-color:transparent;box-shadow:var(--primary-glow),var(--card-shadow);}
.stat-card.gold{background:var(--stat-gold);border-color:transparent;box-shadow:0 0 20px rgba(245,166,35,0.22),var(--card-shadow);}
.stat-ico{font-size:22px;margin-bottom:8px;}
.stat-val{font-family:'Poppins',sans-serif;font-size:26px;font-weight:800;color:var(--text-1);line-height:1;margin-bottom:4px;}
.stat-card.hero .stat-val,.stat-card.gold .stat-val{color:var(--stat-hero-c);}
.stat-lbl{font-size:10px;font-weight:600;color:var(--text-2);text-transform:uppercase;letter-spacing:0.8px;}
.stat-card.hero .stat-lbl,.stat-card.gold .stat-lbl{color:rgba(255,255,255,0.75);}
.stat-card.hero .stat-lbl{color:rgba(0,0,0,0.55);}
.stat-arrow{position:absolute;bottom:14px;right:14px;opacity:0.35;}
.stat-card.hero .stat-arrow,.stat-card.gold .stat-arrow{opacity:0.4;color:#000;}

/* ── PROGRESS CARD ── */
.prog-card{background:var(--surface);border:1px solid var(--border);border-radius:20px;padding:18px;margin-bottom:12px;box-shadow:var(--card-shadow);transition:background 0.3s;}
.prog-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;}
.prog-title{font-family:'Poppins',sans-serif;font-size:13px;font-weight:600;color:var(--text-1);display:flex;align-items:center;gap:8px;}
.prog-count{font-size:13px;font-weight:700;color:var(--primary);font-family:'Poppins',sans-serif;}
.prog-track{background:var(--prog-track);border-radius:999px;height:8px;overflow:hidden;}
.prog-fill{height:100%;border-radius:999px;background:linear-gradient(90deg,var(--primary),#00F5B8);transition:width 0.7s cubic-bezier(0.34,1.56,0.64,1);}
.prog-fill.gold{background:linear-gradient(90deg,var(--gold),#FFCA62);}
.prog-sub{font-size:11px;color:var(--text-3);margin-top:8px;font-weight:500;}

/* ── ANIMAL CARD ── */
.animal-card{background:var(--surface);border:1px solid var(--border);border-radius:20px;margin-bottom:12px;overflow:hidden;cursor:pointer;transition:transform 0.13s;box-shadow:var(--card-shadow);}
.animal-card:active{transform:scale(0.98);}
.animal-card-body{padding:16px 18px;display:flex;align-items:center;gap:14px;}
.animal-icon-wrap{width:52px;height:52px;background:var(--surface-2);border:1px solid var(--border);border-radius:16px;display:flex;align-items:center;justify-content:center;flex-shrink:0;color:var(--primary);}
.animal-name{font-family:'Poppins',sans-serif;font-size:15px;font-weight:700;color:var(--text-1);margin-bottom:2px;}
.animal-meta{font-size:11px;color:var(--text-2);font-weight:500;}
.animal-share{font-size:12px;font-weight:700;color:var(--primary);margin-top:2px;font-family:'Poppins',sans-serif;}
.animal-prog{height:3px;background:var(--prog-track);}
.animal-prog-fill{height:100%;background:linear-gradient(90deg,var(--primary),#00F5B8);transition:width 0.6s;}

/* ── SHARIK CARD ── */
.sharik-card{background:var(--surface);border:1px solid var(--border);border-radius:20px;margin-bottom:10px;padding:14px 16px;display:flex;align-items:center;gap:12px;cursor:pointer;transition:transform 0.13s;box-shadow:var(--card-shadow);}
.sharik-card:active{transform:scale(0.97);}
.avatar{width:44px;height:44px;border-radius:50%;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-family:'Poppins',sans-serif;font-size:15px;font-weight:800;color:#fff;}
.sharik-name{font-family:'Poppins',sans-serif;font-size:14px;font-weight:700;color:var(--text-1);}
.sharik-sub{font-size:11px;color:var(--text-2);margin-top:2px;}
.sharik-req{font-size:11px;color:var(--gold);margin-top:3px;font-weight:600;}
.del-btn{
  width:32px;height:32px;border-radius:10px;
  background:var(--red-dim);border:1px solid rgba(255,92,92,0.20);
  color:var(--red);display:flex;align-items:center;justify-content:center;
  cursor:pointer;transition:all 0.15s;flex-shrink:0;
}
.del-btn:active{transform:scale(0.88);}

/* ── BADGES ── */
.badge{font-size:10px;font-weight:700;padding:3px 9px;border-radius:999px;text-transform:uppercase;letter-spacing:0.5px;font-family:'Poppins',sans-serif;}
.badge-paid   {background:rgba(0,208,156,0.15);color:var(--primary);border:1px solid rgba(0,208,156,0.25);}
.badge-pending{background:var(--red-dim);color:var(--red);border:1px solid rgba(255,92,92,0.25);}
.badge-partial{background:var(--blue-dim);color:var(--blue);border:1px solid rgba(74,144,226,0.25);}
.del-tag{font-size:10px;font-weight:600;color:var(--text-3);}
.del-tag.done{color:var(--primary);}

/* ── PART CARD ── */
.part-card{background:var(--surface);border:1px solid var(--border);border-radius:16px;margin-bottom:10px;overflow:hidden;transition:border-color 0.2s;}
.part-card.open{border-color:var(--primary-bdr);}
.part-header{padding:14px 16px;display:flex;align-items:center;gap:12px;cursor:pointer;}
.part-icon{width:36px;height:36px;background:var(--primary-dim);border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;}
.part-name{font-family:'Poppins',sans-serif;font-size:13px;font-weight:600;color:var(--text-1);}
.part-kg{font-size:11px;color:var(--text-2);margin-top:1px;}
.part-share-badge{background:var(--primary-dim);color:var(--primary);border:1px solid var(--primary-bdr);border-radius:999px;font-size:11px;font-weight:700;padding:3px 10px;font-family:'Poppins',sans-serif;}
.part-chev{color:var(--text-3);transition:transform 0.2s;}
.part-chev.open{transform:rotate(180deg);color:var(--primary);}
.part-body{padding:0 16px 16px;border-top:1px solid var(--border);}

/* ── TABS ── */
.tab-bar{display:flex;gap:6px;background:var(--surface-2);border-radius:16px;padding:5px;margin-bottom:16px;}
.tab{flex:1;padding:9px 6px;text-align:center;border-radius:12px;font-size:12px;font-weight:600;cursor:pointer;transition:all 0.2s;color:var(--text-2);font-family:'Poppins',sans-serif;white-space:nowrap;}
.tab.active{background:var(--surface-3);color:var(--primary);font-weight:700;box-shadow:0 1px 4px rgba(0,0,0,0.10);}

/* ── FORMS ── */
.form-group{margin-bottom:14px;}
.form-label{display:block;font-size:10px;font-weight:700;color:var(--text-2);text-transform:uppercase;letter-spacing:0.8px;margin-bottom:7px;font-family:'Poppins',sans-serif;}
.form-input,.form-select{
  width:100%;padding:13px 15px;background:var(--input-bg);border:1.5px solid var(--input-bdr);border-radius:12px;
  color:var(--text-1);font-family:'Poppins',sans-serif;font-size:14px;outline:none;transition:border-color 0.2s;
}
.form-input:focus,.form-select:focus{border-color:var(--primary);}
.form-input::placeholder{color:var(--text-3);}
.form-select{appearance:none;cursor:pointer;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%238B9BB4' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 14px center;}
.input-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;}

/* ── BUTTONS ── */
.btn{border:none;border-radius:12px;cursor:pointer;font-family:'Poppins',sans-serif;font-weight:700;display:flex;align-items:center;justify-content:center;gap:6px;transition:all 0.13s;-webkit-tap-highlight-color:transparent;font-size:13px;}
.btn:active{transform:scale(0.96);}
.btn-primary{background:var(--primary);color:#000;padding:14px 20px;width:100%;font-size:14px;border-radius:16px;box-shadow:0 4px 16px rgba(0,208,156,0.28);font-family:'Poppins',sans-serif;font-weight:700;}
.btn-surface{background:var(--surface-2);color:var(--text-1);border:1px solid var(--border);padding:12px 16px;border-radius:16px;}
.btn-ghost  {background:var(--primary-dim);color:var(--primary);border:1px solid var(--primary-bdr);padding:12px 16px;border-radius:16px;}
.btn-danger {background:var(--red-dim);color:var(--red);border:1px solid rgba(255,92,92,0.25);padding:10px 14px;border-radius:12px;}
.btn-gold   {background:var(--stat-gold);color:#000;border-radius:16px;padding:14px 20px;font-family:'Poppins',sans-serif;font-weight:700;font-size:14px;}
.btn-sm     {padding:8px 14px;font-size:12px;border-radius:10px;}
.btn-row    {display:flex;gap:10px;}

/* ── RECEIPT ── */
.receipt{background:var(--receipt-bg);border:1px solid var(--receipt-bdr);border-radius:20px;padding:24px;text-align:center;position:relative;overflow:hidden;margin-bottom:20px;box-shadow:0 8px 32px rgba(0,0,0,0.2),var(--primary-glow);}
.receipt-event{font-size:10px;color:var(--text-3);text-transform:uppercase;letter-spacing:1.5px;margin-bottom:8px;font-family:'Poppins',sans-serif;}
.receipt-name{font-family:'Poppins',sans-serif;font-size:24px;font-weight:800;color:var(--text-1);margin-bottom:4px;}
.receipt-animal{font-size:12px;color:var(--primary);font-weight:600;margin-bottom:18px;}
.receipt-divider{border:none;border-top:1px solid var(--border-2);margin:14px 0;}
.receipt-row{display:flex;align-items:center;justify-content:space-between;padding:8px 0;}
.receipt-row-left{display:flex;align-items:center;gap:10px;font-size:13px;color:var(--text-2);font-weight:500;}
.receipt-row-kg{font-family:'Poppins',sans-serif;font-size:15px;font-weight:700;color:var(--text-1);}
.receipt-total-block{background:var(--primary-dim);border:1px solid var(--primary-bdr);border-radius:16px;padding:16px;margin-top:14px;text-align:center;}
.receipt-total-lbl{font-size:10px;color:var(--primary);text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;opacity:0.8;font-family:'Poppins',sans-serif;}
.receipt-total-val{font-family:'Poppins',sans-serif;font-size:34px;font-weight:900;color:var(--primary);line-height:1;}
.receipt-total-unit{font-size:15px;font-weight:600;opacity:0.7;}

/* ── MODAL ── */
.overlay{position:fixed;inset:0;background:rgba(0,0,0,0.6);backdrop-filter:blur(4px);z-index:300;display:flex;align-items:flex-end;justify-content:center;animation:overlayIn 0.2s ease;}
@keyframes overlayIn{from{opacity:0;}to{opacity:1;}}
.modal{background:var(--surface);border:1px solid var(--border-2);border-radius:24px 24px 0 0;width:100%;max-width:430px;max-height:93dvh;overflow-y:auto;padding:20px 20px 32px;animation:modalUp 0.3s cubic-bezier(0.34,1.56,0.64,1);transition:background 0.3s;}
@keyframes modalUp{from{transform:translateY(100%);}to{transform:translateY(0);}}
.modal-handle{width:36px;height:4px;background:var(--border-2);border-radius:999px;margin:0 auto 20px;}
.modal-title{font-family:'Poppins',sans-serif;font-size:20px;font-weight:800;color:var(--text-1);margin-bottom:20px;}

/* ── CHECKLIST ── */
.check-item{display:flex;align-items:flex-start;gap:12px;padding:12px 0;border-bottom:1px solid var(--border);cursor:pointer;}
.check-item:last-child{border-bottom:none;}
.check-box{width:22px;height:22px;border-radius:8px;border:2px solid var(--border-2);display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px;transition:all 0.2s;color:transparent;}
.check-box.on{background:var(--primary);border-color:var(--primary);color:#000;box-shadow:0 2px 8px rgba(0,208,156,0.3);}
.check-label{font-size:13px;color:var(--text-2);line-height:1.5;font-family:'Poppins',sans-serif;}
.check-label.on{color:var(--text-1);}

/* ── BACK BUTTON ── */
.back-btn{display:inline-flex;align-items:center;gap:6px;background:var(--surface-2);border:1px solid var(--border);color:var(--text-2);font-size:12px;font-weight:600;padding:8px 14px;border-radius:12px;cursor:pointer;margin-bottom:16px;font-family:'Poppins',sans-serif;}
.back-btn:active{transform:scale(0.96);}

/* ── ANIMAL DETAIL HEADER ── */
.ad-header{background:var(--surface);border-bottom:1px solid var(--border);padding:16px 20px 18px;flex-shrink:0;transition:background 0.3s;}
.ad-stats{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin-top:14px;}
.ads-cell{background:var(--surface-2);border:1px solid var(--border);border-radius:12px;padding:10px 8px;text-align:center;}
.ads-val{font-family:'Poppins',sans-serif;font-size:15px;font-weight:800;color:var(--primary);}
.ads-lbl{font-size:9px;color:var(--text-3);font-weight:600;text-transform:uppercase;letter-spacing:0.5px;margin-top:2px;}

/* ── BISMILLAH ── */
.bismillah{text-align:center;padding:14px 16px;background:var(--primary-dim);border:1px solid var(--primary-bdr);border-radius:16px;margin-bottom:16px;font-family:'Amiri',serif;font-size:22px;color:var(--primary);letter-spacing:2px;}

/* ── DELIVERY TOGGLE ── */
.del-toggle{display:flex;gap:8px;}
.del-opt{flex:1;padding:10px 6px;border:1.5px solid var(--border);border-radius:12px;background:var(--surface-2);color:var(--text-2);font-size:11px;font-weight:700;cursor:pointer;font-family:'Poppins',sans-serif;transition:all 0.15s;text-align:center;}
.del-opt.on{border-color:var(--primary-bdr);background:var(--primary-dim);color:var(--primary);}

/* ── EVENT CARD ── */
.event-card{background:var(--surface);border:1px solid var(--border);border-radius:20px;margin-bottom:12px;padding:18px;cursor:pointer;transition:all 0.15s;box-shadow:var(--card-shadow);}
.event-card.active-ev{border-color:var(--primary-bdr);box-shadow:var(--primary-glow),var(--card-shadow);}
.event-card:active{transform:scale(0.98);}

/* ── TYPE SELECTOR ── */
.type-grid{display:flex;gap:8px;flex-wrap:wrap;}
.type-btn{padding:10px 14px;background:var(--surface-3);border:1.5px solid var(--border);border-radius:12px;color:var(--text-2);font-size:13px;font-weight:700;cursor:pointer;font-family:'Poppins',sans-serif;transition:all 0.15s;}
.type-btn.sel{background:var(--primary-dim);border-color:var(--primary-bdr);color:var(--primary);}

/* ── EST RESULT ── */
.est-result{background:var(--surface-2);border:1px solid var(--primary-bdr);border-radius:20px;padding:18px;margin-top:16px;box-shadow:var(--primary-glow);}
.est-row{display:flex;align-items:center;justify-content:space-between;padding:10px 0;border-bottom:1px solid var(--border);}
.est-row:last-child{border-bottom:none;}
.est-lbl{display:flex;align-items:center;gap:8px;font-size:13px;color:var(--text-2);}
.est-val{font-family:'Poppins',sans-serif;font-size:14px;font-weight:700;color:var(--primary);}

/* ── INFO GRID ── */
.info-grid{background:var(--surface-2);border-radius:16px;padding:14px;margin-bottom:14px;display:grid;grid-template-columns:1fr 1fr;gap:12px;}
.info-lbl{font-size:9px;color:var(--text-3);text-transform:uppercase;letter-spacing:0.8px;font-weight:700;margin-bottom:3px;}
.info-val{font-size:13px;font-weight:700;color:var(--text-1);}

/* ── EMPTY STATE ── */
.empty{text-align:center;padding:48px 24px;}
.empty-ico{display:block;margin:0 auto 16px;opacity:0.3;color:var(--primary);}
.empty-txt{font-size:14px;color:var(--text-3);font-weight:600;font-family:'Poppins',sans-serif;}

/* ── TOAST ── */
.toast{position:fixed;top:24px;left:50%;transform:translateX(-50%);background:var(--primary);color:#000;padding:11px 22px;border-radius:999px;font-size:13px;font-weight:700;z-index:9999;white-space:nowrap;box-shadow:0 4px 20px rgba(0,208,156,0.4);font-family:'Poppins',sans-serif;animation:toastPop 0.25s cubic-bezier(0.34,1.56,0.64,1),toastFade 0.3s ease 2.2s forwards;}
@keyframes toastPop{from{opacity:0;transform:translateX(-50%) scale(0.85) translateY(-8px);}to{opacity:1;transform:translateX(-50%) scale(1) translateY(0);}}
@keyframes toastFade{to{opacity:0;transform:translateX(-50%) translateY(-10px);}}

/* ── ONBOARDING ── */
.ob-wrap{height:100dvh;display:flex;flex-direction:column;background:var(--primary);transition:background 0.3s;}
[data-theme="dark"] .ob-wrap{background:#061020;}
.ob-header{padding:60px 32px 28px;flex-shrink:0;}
.ob-title{font-family:'Poppins',sans-serif;font-size:26px;font-weight:800;line-height:1.3;color:#fff;margin-bottom:8px;}
[data-theme="dark"] .ob-title{color:#fff;}
.ob-sub{font-size:13px;font-weight:500;color:rgba(255,255,255,0.75);line-height:1.5;}
.ob-card{flex:1;background:var(--bg);border-radius:32px 32px 0 0;display:flex;flex-direction:column;align-items:center;padding:32px 28px 36px;box-shadow:0 -8px 40px rgba(0,0,0,0.15);}
[data-theme="dark"] .ob-card{background:#0D1626;}
.ob-illus{flex:1;display:flex;align-items:center;justify-content:center;width:100%;}
.ob-next{font-family:'Poppins',sans-serif;font-size:17px;font-weight:700;color:var(--primary);cursor:pointer;margin-bottom:16px;letter-spacing:0.2px;}
[data-theme="dark"] .ob-next{color:#00D09C;}
.ob-dots{display:flex;gap:8px;justify-content:center;}
.ob-dot{height:8px;border-radius:999px;background:var(--border-2);transition:all 0.35s cubic-bezier(0.34,1.56,0.64,1);}
.ob-dot.on{background:var(--primary);}
[data-theme="dark"] .ob-dot.on{background:#00D09C;}
`;

/* ══════════════════════════════════════════════════════════════════
   ONBOARDING ILLUSTRATIONS
══════════════════════════════════════════════════════════════════ */
const IllustrationAnimal = ({ theme }) => {
  const c1 = theme === "dark" ? "rgba(0,208,156,0.08)" : "rgba(0,201,167,0.08)";
  const c2 = theme === "dark" ? "rgba(0,208,156,0.13)" : "rgba(0,201,167,0.13)";
  const stroke = theme === "dark" ? "#00D09C" : "#00C9A7";
  const accent = theme === "dark" ? "#F5A623" : "#E67E00";
  return (
    <svg width="220" height="220" viewBox="0 0 220 220" fill="none">
      <circle cx="110" cy="110" r="100" fill={c1} stroke={stroke} strokeWidth="1" strokeDasharray="4 4"/>
      <circle cx="110" cy="110" r="70" fill={c2} stroke={stroke} strokeWidth="1"/>
      {/* Body */}
      <ellipse cx="110" cy="138" rx="40" ry="26" fill={stroke} opacity="0.18" stroke={stroke} strokeWidth="1.5"/>
      {/* Head */}
      <ellipse cx="110" cy="98" rx="30" ry="26" fill={stroke} opacity="0.22" stroke={stroke} strokeWidth="2"/>
      {/* Horns */}
      <path d="M88 82 Q80 66 74 62" stroke={stroke} strokeWidth="3" strokeLinecap="round"/>
      <path d="M132 82 Q140 66 146 62" stroke={stroke} strokeWidth="3" strokeLinecap="round"/>
      {/* Eyes */}
      <circle cx="99" cy="93" r="5" fill="white" opacity="0.9"/>
      <circle cx="121" cy="93" r="5" fill="white" opacity="0.9"/>
      <circle cx="100" cy="94" r="3" fill="#2C3E50"/>
      <circle cx="122" cy="94" r="3" fill="#2C3E50"/>
      {/* Snout */}
      <ellipse cx="110" cy="112" rx="11" ry="7.5" fill={stroke} opacity="0.35" stroke={stroke} strokeWidth="1.5"/>
      <circle cx="105.5" cy="112" r="2.8" fill="rgba(0,0,0,0.2)"/>
      <circle cx="114.5" cy="112" r="2.8" fill="rgba(0,0,0,0.2)"/>
      {/* Stars / accent dots */}
      <circle cx="168" cy="58" r="4" fill={accent} opacity="0.7"/>
      <circle cx="178" cy="82" r="2.5" fill={stroke} opacity="0.5"/>
      <circle cx="45" cy="60" r="3" fill={stroke} opacity="0.5"/>
      <circle cx="36" cy="84" r="2" fill={accent} opacity="0.6"/>
      <path d="M158 140 l3 6 6 3-6 3-3 6-3-6-6-3 6-3z" fill={accent} opacity="0.4"/>
    </svg>
  );
};

const IllustrationTrack = ({ theme }) => {
  const stroke = theme === "dark" ? "#00D09C" : "#00C9A7";
  const accent = theme === "dark" ? "#F5A623" : "#E67E00";
  const bg1 = theme === "dark" ? "rgba(0,208,156,0.08)" : "rgba(0,201,167,0.08)";
  const bg2 = theme === "dark" ? "rgba(0,208,156,0.15)" : "rgba(0,201,167,0.15)";
  return (
    <svg width="220" height="220" viewBox="0 0 220 220" fill="none">
      {/* Card */}
      <rect x="38" y="28" width="144" height="164" rx="18" fill={bg1} stroke={stroke} strokeWidth="1.5"/>
      <rect x="50" y="42" width="120" height="14" rx="6" fill={bg2}/>
      {/* Three check rows */}
      {[0,1,2].map(i => (
        <g key={i}>
          <circle cx="66" cy={80+i*32} r="11" fill={bg2} stroke={stroke} strokeWidth="1.5"/>
          <polyline points={`61,${80+i*32} 64.5,${83.5+i*32} 71,${76+i*32}`} stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <rect x="84" y={73+i*32} width="70" height="8" rx="4" fill={bg2}/>
          <rect x="84" y={84+i*32} width="45" height="5" rx="2.5" fill={bg1}/>
        </g>
      ))}
      {/* Share button */}
      <rect x="62" y="168" width="96" height="18" rx="9" fill={stroke} opacity="0.25" stroke={stroke} strokeWidth="1.5"/>
      <text x="110" y="181" textAnchor="middle" fontSize="9" fill={stroke} fontWeight="700" fontFamily="Poppins,sans-serif">Share Receipt</text>
      {/* Decorations */}
      <circle cx="175" cy="48" r="4" fill={accent} opacity="0.7"/>
      <circle cx="42" cy="155" r="3" fill={stroke} opacity="0.4"/>
      <circle cx="185" cy="130" r="2.5" fill={accent} opacity="0.5"/>
    </svg>
  );
};

/* ══════════════════════════════════════════════════════════════════
   ONBOARDING
══════════════════════════════════════════════════════════════════ */
function Onboarding({ onComplete, theme }) {
  const [slide, setSlide] = useState(0);
  const slides = [
    {
      title: "Welcome To Your Complete Qurbani Management Solution",
      sub:   "Organize your Eid-ul-Adha with full transparency",
      Illus: <IllustrationAnimal theme={theme} />,
    },
    {
      title: "Track Animals, Shariks & Payments With Ease",
      sub:   "Send digital receipts via WhatsApp in one tap",
      Illus: <IllustrationTrack theme={theme} />,
    },
  ];
  const isLast = slide === slides.length - 1;
  const s = slides[slide];
  return (
    <div className="ob-wrap">
      <div className="ob-header" style={{textAlign:"center"}}>
        <div className="ob-title" style={{textAlign:"center"}}>{s.title}</div>
      </div>
      <div className="ob-card">
        <div className="ob-illus">{s.Illus}</div>
        <div className="ob-next" onClick={() => isLast ? onComplete() : setSlide(x => x+1)}>
          {isLast ? "Get Started →" : "Next"}
        </div>
        <div className="ob-dots">
          {slides.map((_, i) => (
            <div key={i} className={`ob-dot ${i===slide?"on":""}`} style={{ width: i===slide ? 24 : 8 }} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   CONFIRM MODAL — reusable "Are you sure?" with Yes/No
══════════════════════════════════════════════════════════════════ */
function ConfirmModal({ title, message, onConfirm, onCancel }) {
  return (
    <div className="overlay" style={{zIndex:500}} onClick={onCancel}>
      <div className="modal" style={{borderRadius:24,paddingBottom:28}} onClick={e=>e.stopPropagation()}>
        <div className="modal-handle"/>
        <div style={{textAlign:"center",padding:"4px 0 22px"}}>
          <div style={{
            width:58,height:58,background:"var(--red-dim)",border:"1px solid rgba(255,92,92,0.22)",
            borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",
            margin:"0 auto 16px"
          }}>
            <ITrash size={24} style={{color:"var(--red)"}}/>
          </div>
          <div style={{fontFamily:"Poppins,sans-serif",fontSize:19,fontWeight:800,color:"var(--text-1)",marginBottom:8}}>
            {title || "Are you sure?"}
          </div>
          {message && (
            <div style={{fontSize:13,color:"var(--text-2)",lineHeight:1.6,padding:"0 8px"}}>
              {message}
            </div>
          )}
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
          <button className="btn btn-surface" style={{padding:"13px",fontSize:14,borderRadius:14}} onClick={onCancel}>
            No, Keep
          </button>
          <button className="btn btn-danger" style={{padding:"13px",fontSize:14,borderRadius:14,background:"var(--red)",color:"#fff",border:"none"}} onClick={onConfirm}>
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   TOAST
══════════════════════════════════════════════════════════════════ */
function Toast({ msg }) { return msg ? <div className="toast">{msg}</div> : null; }

/* ══════════════════════════════════════════════════════════════════
   HOME SCREEN
══════════════════════════════════════════════════════════════════ */
function HomeScreen({ state, onNav }) {
  const [summaryModal, setSummaryModal] = useState(null); // null | "distribution" | "payments" | "animals" | "shariks"
  const event = state.events.find(e => e.id === state.activeEventId);
  if (!event) return (
    <div className="page">
      <div className="empty">
        <div className="empty-ico"><ICow size={52}/></div>
        <div className="empty-txt">Create your first Qurbani event to begin</div>
        <div style={{marginTop:20}}><button className="btn btn-primary" onClick={() => onNav("events")}>Create Event</button></div>
      </div>
    </div>
  );
  const allS   = event.animals.flatMap(a => a.shareholders.map(s => ({...s, animalName: a.name, animal: a})));
  const totKg  = event.animals.reduce((s,a) => s + a.parts.reduce((s2,p) => s2+Number(p.totalKg),0), 0);
  const paidCt = allS.filter(s => s.paymentStatus==="paid").length;
  const delCt  = allS.filter(s => s.deliveryStatus!=="pending" && s.deliveryStatus!=="not_collected").length;

  const DIST_GROUPS = [
    { label:"Collected",     fn: s => s.deliveryStatus==="collected"||s.deliveryStatus==="delivered", color:"var(--primary)" },
    { label:"Not Collected", fn: s => s.deliveryStatus==="pending"||s.deliveryStatus==="not_collected", color:"var(--red)" },
  ];
  const PAY_GROUPS = [
    { label:"Paid",    fn: s => s.paymentStatus==="paid",    color:"var(--primary)" },
    { label:"Partial", fn: s => s.paymentStatus==="partial", color:"var(--blue)"    },
    { label:"Pending", fn: s => s.paymentStatus==="pending", color:"var(--red)"     },
  ];

  return (
    <div className="page" style={{paddingBottom:8}}>
      <div style={{marginBottom:18}}>
        <div style={{fontSize:11,color:"var(--text-3)",fontWeight:600,letterSpacing:"1px",textTransform:"uppercase",marginBottom:4}}>ASSALAMU ALAYKUM</div>
        <div style={{fontFamily:"Poppins,sans-serif",fontSize:22,fontWeight:800,color:"var(--text-1)"}}>Qurbani Dashboard</div>
      </div>
      <div className="stat-grid">
        {/* Animals card — opens popup summary */}
        <div className="stat-card hero link" onClick={() => setSummaryModal("animals")}>
          <div className="stat-ico"><ICow size={24} style={{color:"rgba(0,0,0,0.6)"}}/></div>
          <div className="stat-val">{event.animals.length}</div>
          <div className="stat-lbl">Animals</div>
          <div className="stat-arrow"><IChevR size={18}/></div>
        </div>
        {/* Shariks card — opens popup summary */}
        <div className="stat-card gold link" onClick={() => setSummaryModal("shariks")}>
          <div className="stat-ico"><IUser size={24} style={{color:"rgba(0,0,0,0.6)"}}/></div>
          <div className="stat-val">{allS.length}</div>
          <div className="stat-lbl">Shariks</div>
          <div className="stat-arrow"><IChevR size={18}/></div>
        </div>
        <div className="stat-card">
          <div style={{color:"var(--primary)",marginBottom:8}}><IScale size={22}/></div>
          <div className="stat-val" style={{color:"var(--primary)",fontSize:22}}>{totKg.toFixed(0)}<span style={{fontSize:12,color:"var(--text-3)",fontWeight:600}}> kg</span></div>
          <div className="stat-lbl">Total Meat</div>
        </div>
        <div className="stat-card">
          <div style={{color:"var(--gold)",marginBottom:8}}><IStar size={20}/></div>
          <div className="stat-val" style={{color:"var(--gold)",fontSize:22}}>{allS.length ? Math.round(paidCt/allS.length*100) : 0}<span style={{fontSize:12,color:"var(--text-3)",fontWeight:600}}> %</span></div>
          <div className="stat-lbl">Paid</div>
        </div>
      </div>

      {/* Distribution — clickable */}
      <div className="prog-card" style={{marginBottom:10,cursor:"pointer"}} onClick={() => setSummaryModal("distribution")}>
        <div className="prog-header">
          <div className="prog-title"><span style={{color:"var(--primary)"}}><IUser size={16}/></span>Distribution</div>
          <div style={{display:"flex",alignItems:"center",gap:6}}>
            <span className="prog-count">{delCt}/{allS.length}</span>
            <IChevR size={14} style={{color:"var(--text-3)"}}/>
          </div>
        </div>
        <div className="prog-track"><div className="prog-fill" style={{width:allS.length?`${delCt/allS.length*100}%`:"0%"}}/></div>
        <div className="prog-sub">{delCt} done · {allS.length-delCt} pending · tap for details</div>
      </div>

      {/* Payments — clickable */}
      <div className="prog-card" style={{marginBottom:18,cursor:"pointer"}} onClick={() => setSummaryModal("payments")}>
        <div className="prog-header">
          <div className="prog-title"><span style={{color:"var(--gold)"}}><IStar size={16}/></span>Payments</div>
          <div style={{display:"flex",alignItems:"center",gap:6}}>
            <span className="prog-count" style={{color:"var(--gold)"}}>{paidCt}/{allS.length} paid</span>
            <IChevR size={14} style={{color:"var(--text-3)"}}/>
          </div>
        </div>
        <div className="prog-track"><div className="prog-fill gold" style={{width:allS.length?`${paidCt/allS.length*100}%`:"0%"}}/></div>
        <div style={{display:"flex",gap:8,marginTop:10,flexWrap:"wrap"}}>
          {["paid","pending","partial"].map(st => { const ct=allS.filter(s=>s.paymentStatus===st).length; return ct>0?<span key={st} className={`badge badge-${st}`}>{ct} {st}</span>:null; })}
        </div>
      </div>

      <div className="sec-header"><div className="sec-title">Animals</div><span className="sec-badge">{event.animals.length}</span></div>
      {event.animals.map(a => {
        const kg=a.parts.reduce((s,p)=>s+Number(p.totalKg),0);
        const ps=perSlotKg(a);
        return (
          <div className="animal-card" key={a.id} onClick={() => onNav("animalDetail",a.id)}>
            <div className="animal-card-body">
              <div className="animal-icon-wrap"><ICow size={26}/></div>
              <div style={{flex:1,minWidth:0}}>
                <div className="animal-name">{a.name}</div>
                <div className="animal-meta">{a.shareholders.length} shareholders · {kg.toFixed(1)} kg</div>
                <div className="animal-share">≈ {ps.toFixed(2)} kg / share unit</div>
              </div>
              <IChevR size={18} style={{color:"var(--text-3)",flexShrink:0}}/>
            </div>
            <div className="animal-prog"><div className="animal-prog-fill" style={{width:a.shareholders.length?`${a.shareholders.filter(s=>s.deliveryStatus!=="pending").length/a.shareholders.length*100}%`:"0%"}}/></div>
          </div>
        );
      })}

      {/* ── POPUP MODALS ── */}
      {summaryModal && (() => {
        // ── ANIMALS POPUP ──────────────────────────────────────
        if (summaryModal === "animals") return (
          <div className="overlay" onClick={() => setSummaryModal(null)}>
            <div className="modal" onClick={e => e.stopPropagation()}>
              <div className="modal-handle"/>
              <div className="modal-title">Animals Overview</div>
              {event.animals.length === 0
                ? <div className="empty"><div className="empty-ico"><ICow size={40}/></div><div className="empty-txt">No animals added yet</div></div>
                : event.animals.map(a => {
                  const kg = a.parts.reduce((s,p)=>s+Number(p.totalKg),0);
                  const psk = perSlotKg(a);
                  const paidSh = a.shareholders.filter(s=>s.paymentStatus==="paid").length;
                  const collSh = a.shareholders.filter(s=>s.deliveryStatus==="collected"||s.deliveryStatus==="delivered").length;
                  return (
                    <div key={a.id} style={{background:"var(--surface-2)",border:"1px solid var(--border)",borderRadius:16,padding:14,marginBottom:12}}>
                      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
                        <div style={{width:38,height:38,background:"var(--primary-dim)",borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",color:"var(--primary)"}}><ICow size={20}/></div>
                        <div style={{flex:1}}>
                          <div style={{fontFamily:"Poppins,sans-serif",fontSize:14,fontWeight:700,color:"var(--text-1)"}}>{a.name}</div>
                          <div style={{fontSize:11,color:"var(--text-3)"}}>{ANIMAL_LABELS[a.type]} · {kg.toFixed(1)} kg total · ≈{psk.toFixed(2)} kg/unit</div>
                        </div>
                      </div>
                      {/* Parts summary */}
                      <div style={{marginBottom:8}}>
                        <div style={{fontSize:10,fontWeight:700,color:"var(--text-3)",textTransform:"uppercase",letterSpacing:"0.7px",marginBottom:6}}>Parts</div>
                        <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                          {a.parts.filter(p=>Number(p.totalKg)>0).length === 0
                            ? <span style={{fontSize:11,color:"var(--text-3)"}}>No parts entered</span>
                            : a.parts.filter(p=>Number(p.totalKg)>0).map(p => (
                              <span key={p.id} style={{fontSize:11,fontWeight:600,padding:"3px 10px",background:"var(--surface-3)",borderRadius:999,color:"var(--text-1)",border:"1px solid var(--border)"}}>
                                {p.name}: {Number(p.totalKg).toFixed(1)} kg
                              </span>
                            ))
                          }
                        </div>
                      </div>
                      {/* Shariks summary */}
                      <div style={{display:"flex",gap:8}}>
                        <div style={{flex:1,background:"var(--surface)",borderRadius:10,padding:"8px 12px",textAlign:"center"}}>
                          <div style={{fontFamily:"Poppins,sans-serif",fontSize:16,fontWeight:800,color:"var(--text-1)"}}>{a.shareholders.length}</div>
                          <div style={{fontSize:10,color:"var(--text-3)",fontWeight:600}}>Shariks</div>
                        </div>
                        <div style={{flex:1,background:"var(--surface)",borderRadius:10,padding:"8px 12px",textAlign:"center"}}>
                          <div style={{fontFamily:"Poppins,sans-serif",fontSize:16,fontWeight:800,color:"var(--primary)"}}>{paidSh}/{a.shareholders.length}</div>
                          <div style={{fontSize:10,color:"var(--text-3)",fontWeight:600}}>Paid</div>
                        </div>
                        <div style={{flex:1,background:"var(--surface)",borderRadius:10,padding:"8px 12px",textAlign:"center"}}>
                          <div style={{fontFamily:"Poppins,sans-serif",fontSize:16,fontWeight:800,color:"var(--blue)"}}>{collSh}/{a.shareholders.length}</div>
                          <div style={{fontSize:10,color:"var(--text-3)",fontWeight:600}}>Collected</div>
                        </div>
                      </div>
                    </div>
                  );
                })
              }
              <button className="btn btn-surface" style={{width:"100%",marginTop:4}} onClick={() => setSummaryModal(null)}>Close</button>
            </div>
          </div>
        );

        // ── SHARIKS POPUP ──────────────────────────────────────
        if (summaryModal === "shariks") return (
          <div className="overlay" onClick={() => setSummaryModal(null)}>
            <div className="modal" onClick={e => e.stopPropagation()}>
              <div className="modal-handle"/>
              <div className="modal-title">Shariks Overview</div>
              {/* Payment summary bar */}
              <div style={{display:"flex",gap:8,marginBottom:16}}>
                {[
                  {label:"Paid",    count:allS.filter(s=>s.paymentStatus==="paid").length,    color:"var(--primary)"},
                  {label:"Partial", count:allS.filter(s=>s.paymentStatus==="partial").length, color:"var(--blue)"},
                  {label:"Pending", count:allS.filter(s=>s.paymentStatus==="pending").length, color:"var(--red)"},
                ].map(({label,count,color}) => (
                  <div key={label} style={{flex:1,background:"var(--surface-2)",borderRadius:12,padding:"10px 8px",textAlign:"center",border:"1px solid var(--border)"}}>
                    <div style={{fontFamily:"Poppins,sans-serif",fontSize:18,fontWeight:800,color}}>{count}</div>
                    <div style={{fontSize:10,fontWeight:600,color:"var(--text-3)",textTransform:"uppercase",letterSpacing:"0.5px"}}>{label}</div>
                  </div>
                ))}
              </div>
              {/* Delivery summary bar */}
              <div style={{display:"flex",gap:8,marginBottom:16}}>
                {[
                  {label:"Collected",     count:allS.filter(s=>s.deliveryStatus==="collected"||s.deliveryStatus==="delivered").length, color:"var(--primary)"},
                  {label:"Not Collected", count:allS.filter(s=>s.deliveryStatus==="pending"||s.deliveryStatus==="not_collected").length, color:"var(--red)"},
                ].map(({label,count,color}) => (
                  <div key={label} style={{flex:1,background:"var(--surface-2)",borderRadius:12,padding:"10px 8px",textAlign:"center",border:"1px solid var(--border)"}}>
                    <div style={{fontFamily:"Poppins,sans-serif",fontSize:18,fontWeight:800,color}}>{count}</div>
                    <div style={{fontSize:10,fontWeight:600,color:"var(--text-3)",textTransform:"uppercase",letterSpacing:"0.5px"}}>{label}</div>
                  </div>
                ))}
              </div>
              {/* Sharik list */}
              {allS.length === 0
                ? <div className="empty"><div className="empty-ico"><IUser size={40}/></div><div className="empty-txt">No shariks added yet</div></div>
                : allS.map((s,i) => {
                  const myKg = sharikTotalKg(s.animal, s);
                  const isCol = s.deliveryStatus==="collected"||s.deliveryStatus==="delivered";
                  return (
                    <div key={s.id+i} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 12px",background:"var(--surface-2)",borderRadius:12,marginBottom:6}}>
                      <div style={{width:36,height:36,borderRadius:"50%",background:avColor(s.name),display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:800,color:"#fff",flexShrink:0}}>{initials(s.name)}</div>
                      <div style={{flex:1,minWidth:0}}>
                        <div style={{fontFamily:"Poppins,sans-serif",fontSize:13,fontWeight:700,color:"var(--text-1)"}}>{s.name}</div>
                        <div style={{fontSize:11,color:"var(--text-3)"}}>{s.animalName} · {myKg.toFixed(1)} kg{s.shares>1?` · ${s.shares} shares`:""}</div>
                      </div>
                      <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:4}}>
                        <span className={`badge badge-${s.paymentStatus}`}>{s.paymentStatus}</span>
                        <span style={{fontSize:10,fontWeight:600,color:isCol?"var(--primary)":"var(--red)"}}>{isCol?"✅ Collected":"⏳ Pending"}</span>
                      </div>
                    </div>
                  );
                })
              }
              <button className="btn btn-surface" style={{width:"100%",marginTop:8}} onClick={() => setSummaryModal(null)}>Close</button>
            </div>
          </div>
        );

        // ── DISTRIBUTION / PAYMENTS POPUP ─────────────────────
        const isDistrib = summaryModal === "distribution";
        const groups = isDistrib ? DIST_GROUPS : PAY_GROUPS;
        const title = isDistrib ? "Distribution Summary" : "Payment Summary";
        return (
          <div className="overlay" onClick={() => setSummaryModal(null)}>
            <div className="modal" onClick={e => e.stopPropagation()}>
              <div className="modal-handle"/>
              <div className="modal-title">{title}</div>
              {groups.map(({ label, fn, color }) => {
                const members = allS.filter(fn);
                if (!members.length) return null;
                return (
                  <div key={label} style={{marginBottom:18}}>
                    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
                      <div style={{width:8,height:8,borderRadius:"50%",background:color,flexShrink:0}}/>
                      <div style={{fontFamily:"Poppins,sans-serif",fontSize:13,fontWeight:700,color:"var(--text-1)"}}>{label}</div>
                      <span style={{marginLeft:"auto",background:"var(--surface-2)",color,border:`1px solid ${color}44`,borderRadius:999,fontSize:11,fontWeight:700,padding:"2px 10px",fontFamily:"Poppins,sans-serif"}}>{members.length}</span>
                    </div>
                    {members.map((s,i) => (
                      <div key={s.id+i} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 12px",background:"var(--surface-2)",borderRadius:12,marginBottom:6}}>
                        <div style={{width:34,height:34,borderRadius:"50%",background:avColor(s.name),display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:800,color:"#fff",flexShrink:0,fontFamily:"Poppins,sans-serif"}}>{initials(s.name)}</div>
                        <div style={{flex:1,minWidth:0}}>
                          <div style={{fontFamily:"Poppins,sans-serif",fontSize:13,fontWeight:700,color:"var(--text-1)"}}>{s.name}</div>
                          <div style={{fontSize:11,color:"var(--text-3)"}}>{s.animalName}</div>
                        </div>
                        <div style={{fontSize:11,fontWeight:700,color,textTransform:"capitalize",whiteSpace:"nowrap"}}>{label}</div>
                      </div>
                    ))}
                  </div>
                );
              })}
              <button className="btn btn-surface" style={{width:"100%",marginTop:4}} onClick={() => setSummaryModal(null)}>Close</button>
            </div>
          </div>
        );
      })()}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   ANIMALS SCREEN — all events grouped
══════════════════════════════════════════════════════════════════ */
function AnimalsScreen({ state, onNav, onAddAnimal }) {
  const totalAnimals = state.events.reduce((s,e) => s + e.animals.length, 0);
  return (
    <div className="page">
      <div className="sec-header">
        <div className="sec-title">All Animals</div>
        <span className="sec-badge">{totalAnimals}</span>
      </div>
      {totalAnimals === 0 && (
        <div className="empty"><div className="empty-ico"><ICow size={52}/></div><div className="empty-txt">No animals yet. Tap + to add one.</div></div>
      )}
      {state.events.map(ev => {
        if (ev.animals.length === 0) return null;
        return (
          <div key={ev.id} style={{marginBottom:20}}>
            {/* Event group header */}
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
              <div style={{
                height:1,flex:1,background:"var(--border)"
              }}/>
              <div style={{
                display:"flex",alignItems:"center",gap:6,
                background:"var(--surface-2)",border:"1px solid var(--border)",
                borderRadius:999,padding:"4px 12px",flexShrink:0
              }}>
                {ev.id === state.activeEventId && (
                  <div style={{width:6,height:6,borderRadius:"50%",background:"var(--primary)"}}/>
                )}
                <span style={{fontFamily:"Poppins,sans-serif",fontSize:11,fontWeight:700,color:"var(--text-2)"}}>{ev.name}</span>
                <span style={{fontSize:11,color:"var(--text-3)"}}>· {ev.animals.length}</span>
              </div>
              <div style={{height:1,flex:1,background:"var(--border)"}}/>
            </div>
            {ev.animals.map(a => {
              const kg = a.parts.reduce((s,p)=>s+Number(p.totalKg),0);
              const ps = perSlotKg(a);
              const del = a.shareholders.filter(s=>s.deliveryStatus==="collected"||s.deliveryStatus==="delivered").length;
              return (
                <div className="animal-card" key={a.id} onClick={() => onNav("animalDetail", a.id)}>
                  <div className="animal-card-body">
                    <div className="animal-icon-wrap"><ICow size={26}/></div>
                    <div style={{flex:1,minWidth:0}}>
                      <div className="animal-name">{a.name}</div>
                      <div className="animal-meta">{ANIMAL_LABELS[a.type]} · {a.shareholders.length} shareholders · {kg.toFixed(1)} kg</div>
                      <div className="animal-share">≈ {ps.toFixed(2)} kg/unit · {del}/{a.shareholders.length} collected</div>
                    </div>
                    <IChevR size={18} style={{color:"var(--text-3)",flexShrink:0}}/>
                  </div>
                  <div className="animal-prog">
                    <div className="animal-prog-fill" style={{width:a.shareholders.length?`${del/a.shareholders.length*100}%`:"0%"}}/>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
      <button className="btn btn-ghost" style={{width:"100%",marginTop:8}} onClick={onAddAnimal}><IPlus size={16}/> Add Animal</button>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   ADD PART FORM — with dropdown for common parts
══════════════════════════════════════════════════════════════════ */
function AddPartForm({ onAdd, onCancel }) {
  const [choice, setChoice] = useState("");
  const [custom, setCustom]  = useState("");
  const [kg, setKg]          = useState("");
  const partName = choice === "Other" ? custom : choice;
  return (
    <div style={{background:"var(--surface)",border:"1px solid var(--border)",borderRadius:20,padding:16,marginTop:8}}>
      <div className="form-group">
        <label className="form-label">Part Name</label>
        <select className="form-select" value={choice} onChange={e => setChoice(e.target.value)}>
          <option value="">Select a part...</option>
          {COMMON_PARTS.map(p => <option key={p} value={p}>{p}</option>)}
        </select>
        {choice === "Other" && (
          <input className="form-input" style={{marginTop:8}} value={custom} onChange={e => setCustom(e.target.value)} placeholder="Enter custom part name..." />
        )}
      </div>
      <div className="form-group">
        <label className="form-label">Total Weight (kg)</label>
        <input className="form-input" type="number" value={kg} onChange={e => setKg(e.target.value)} placeholder="0.00" />
      </div>
      <div className="btn-row">
        <button className="btn btn-primary" style={{flex:1}} onClick={() => { if(partName && kg) { onAdd({id:mkId(),name:partName,totalKg:Number(kg)}); }}}>Add Part</button>
        <button className="btn btn-surface" onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   ANIMAL DETAIL SCREEN
══════════════════════════════════════════════════════════════════ */
function AnimalDetail({ animal, eventName, onBack, onUpdate, onDeleteAnimal, toast }) {
  const [tab, setTab]       = useState("parts");
  const [openP, setOpenP]   = useState(null);
  const [showAddP, setAddP] = useState(false);
  const [showAddS, setAddS] = useState(false);
  const [selS, setSelS]     = useState(null);

  // Confirms
  const [confirmDelAnimal, setConfirmDelAnimal]   = useState(false);
  const [confirmDelSharik, setConfirmDelSharik]   = useState(null); // sharik id

  // Checklist — stored as [{id,text,checked}]; migrate legacy boolean[]
  const rawCl = animal.checklist || [];
  const checkItems = rawCl.length > 0 && typeof rawCl[0] === "object"
    ? rawCl
    : CHECKLIST.map((text, i) => ({ id: String(i), text, checked: !!rawCl[i] }));
  const [newCheckTxt, setNewCheckTxt] = useState("");
  const [editingCl, setEditingCl]     = useState(null); // {id, text}

  const saveCl   = items => onUpdate({...animal, checklist: items});
  const toggleCl = id    => saveCl(checkItems.map(c => c.id===id ? {...c,checked:!c.checked} : c));
  const addCl    = ()    => {
    if (!newCheckTxt.trim()) return;
    saveCl([...checkItems, {id:mkId(), text:newCheckTxt.trim(), checked:false}]);
    setNewCheckTxt("");
  };
  const removeCl    = id  => saveCl(checkItems.filter(c => c.id!==id));
  const saveEditCl  = ()  => {
    if (!editingCl?.text.trim()) return;
    saveCl(checkItems.map(c => c.id===editingCl.id ? {...c,text:editingCl.text} : c));
    setEditingCl(null);
  };

  // Part ops
  const upPart  = (id,k,v) => onUpdate({...animal, parts:animal.parts.map(p=>p.id===id?{...p,[k]:v}:p)});
  const delPart = id        => onUpdate({...animal, parts:animal.parts.filter(p=>p.id!==id)});
  const addPart = p         => { onUpdate({...animal, parts:[...animal.parts,p]}); setAddP(false); toast("Part added ✓"); };

  // Sharik ops
  const upSharik  = s  => onUpdate({...animal, shareholders:animal.shareholders.map(sh=>sh.id===s.id?s:sh)});
  const delSharik = id => { onUpdate({...animal, shareholders:animal.shareholders.filter(s=>s.id!==id)}); setSelS(null); setConfirmDelSharik(null); toast("Sharik removed"); };
  const addSharik = s  => { onUpdate({...animal, shareholders:[...animal.shareholders,s]}); setAddS(false); toast("Sharik added ✓"); };

  const kg    = animal.parts.reduce((s,p) => s+Number(p.totalKg), 0);
  const slots = totalSlots(animal);
  const psk   = perSlotKg(animal);

  return (
    <div style={{display:"flex",flexDirection:"column",height:"100dvh",overflow:"hidden",background:"var(--bg)",transition:"background 0.3s"}}>

      {/* ── FIX 1: sticky top nav — back button always visible top-left ── */}
      <div style={{
        background:"var(--hdr-bg)", flexShrink:0,
        padding:"16px 20px 14px",
        display:"flex", alignItems:"center", justifyContent:"space-between",
        gap:12
      }}>
        <button onClick={onBack} style={{
          display:"inline-flex",alignItems:"center",gap:7,
          background:"rgba(255,255,255,0.18)",border:"1px solid rgba(255,255,255,0.28)",
          color:"#fff",fontSize:13,fontWeight:600,padding:"9px 16px",
          borderRadius:12,cursor:"pointer",fontFamily:"Poppins,sans-serif",
          flexShrink:0,whiteSpace:"nowrap"
        }}>
          <IBack size={14} style={{color:"#fff"}}/> Back
        </button>
        <div style={{fontFamily:"Poppins,sans-serif",fontSize:13,fontWeight:600,color:"rgba(255,255,255,0.80)",textAlign:"center",flex:1}}>
          {ANIMAL_LABELS[animal.type]}
        </div>
        {/* FIX 4: delete animal button in header */}
        <button onClick={() => setConfirmDelAnimal(true)} style={{
          width:38,height:38,borderRadius:12,
          background:"rgba(255,80,80,0.22)",border:"1px solid rgba(255,80,80,0.35)",
          color:"#FF8080",display:"flex",alignItems:"center",justifyContent:"center",
          cursor:"pointer",flexShrink:0
        }} title="Delete Animal">
          <ITrash size={16}/>
        </button>
      </div>

      {/* Animal info card */}
      <div className="ad-header">
        <div style={{display:"flex",alignItems:"center",gap:14}}>
          <div style={{width:52,height:52,background:"var(--surface-2)",border:"1px solid var(--border)",borderRadius:16,display:"flex",alignItems:"center",justifyContent:"center",color:"var(--primary)"}}><ICow size={28}/></div>
          <div>
            <div style={{fontFamily:"Poppins,sans-serif",fontSize:19,fontWeight:800,color:"var(--text-1)"}}>{animal.name}</div>
            <div style={{fontSize:11,color:"var(--text-3)",marginTop:2}}>{eventName}{animal.liveWeight?` · ${animal.liveWeight} kg live`:""}</div>
          </div>
        </div>
        <div className="ad-stats">
          {[[`${kg.toFixed(1)} kg`,"Total"],[`${psk.toFixed(2)} kg`,"Per Unit"],[animal.shareholders.length,"Shariks"]].map(([v,l]) => (
            <div className="ads-cell" key={l}><div className="ads-val">{v}</div><div className="ads-lbl">{l}</div></div>
          ))}
        </div>
      </div>

      <div style={{flex:1,overflowY:"auto",padding:"16px 16px 24px"}}>
        <div className="tab-bar">
          {[["parts","Parts"],["shariks","Shariks"],["checklist","Checklist"]].map(([k,lbl]) => (
            <div key={k} className={`tab ${tab===k?"active":""}`} onClick={() => setTab(k)}>{lbl}</div>
          ))}
        </div>

        {/* ── PARTS TAB ── */}
        {tab==="parts" && <>
          {animal.parts.map(part => (
            <div className={`part-card ${openP===part.id?"open":""}`} key={part.id}>
              <div className="part-header" onClick={() => setOpenP(openP===part.id?null:part.id)}>
                <div className="part-icon">{part.name==="Solid Beef"||part.name==="Meat"?"🥩":part.name==="Bone"?"🦴":part.name==="Fat"?"🧈":part.name==="Liver"||part.name==="Heart"?"❤️":part.name==="Kidney"?"🫘":"📦"}</div>
                <div style={{flex:1}}>
                  <div className="part-name">{part.name}</div>
                  <div className="part-kg">{Number(part.totalKg).toFixed(2)} kg total</div>
                </div>
                <span className="part-share-badge">{slots>0?(Number(part.totalKg)/slots).toFixed(2):0}/unit</span>
                <span className={`part-chev ${openP===part.id?"open":""}`}><IChevD size={16}/></span>
              </div>
              {openP===part.id && (
                <div className="part-body">
                  <div className="form-group" style={{marginTop:12,marginBottom:10}}>
                    <label className="form-label">Total Amount (kg)</label>
                    <input className="form-input" type="number" value={part.totalKg} onChange={e=>upPart(part.id,"totalKg",e.target.value)} placeholder="0.00"/>
                  </div>
                  <div className="btn-row">
                    <button className="btn btn-ghost" style={{flex:1}} onClick={()=>{setOpenP(null);toast("Saved ✓");}}>Save</button>
                    <button className="btn btn-danger btn-sm" onClick={()=>delPart(part.id)}><ITrash size={14}/></button>
                  </div>
                </div>
              )}
            </div>
          ))}
          {showAddP ? <AddPartForm onAdd={addPart} onCancel={()=>setAddP(false)}/> : (
            <button className="btn btn-ghost" style={{width:"100%",marginTop:8}} onClick={()=>setAddP(true)}><IPlus size={16}/> Add Part</button>
          )}
        </>}

        {/* ── SHARIKS TAB ── */}
        {tab==="shariks" && <>
          <button className="btn btn-primary" style={{marginBottom:14}} onClick={()=>setAddS(true)}><IPlus size={16}/> Add New Sharik</button>
          {animal.shareholders.length===0 && <div className="empty"><div className="empty-ico"><IUser size={48}/></div><div className="empty-txt">No shariks yet</div></div>}
          {animal.shareholders.map(s => (
            <div className="sharik-card" key={s.id} onClick={()=>setSelS(s)}>
              <div className="avatar" style={{background:avColor(s.name)}}>{initials(s.name)}</div>
              <div style={{flex:1,minWidth:0}}>
                <div className="sharik-name">{s.name}</div>
                <div className="sharik-sub">{s.phone||"No phone"}{s.shares>1?` · ${s.shares} shares`:""}</div>
                {s.specialRequest && <div className="sharik-req">📝 {s.specialRequest}</div>}
              </div>
              <div style={{display:"flex",alignItems:"center",gap:8}}>
                <span className={`badge badge-${s.paymentStatus}`}>{s.paymentStatus}</span>
                {/* FIX 5: confirm before delete */}
                <div className="del-btn" onClick={e=>{e.stopPropagation();setConfirmDelSharik(s.id);}}><ITrash size={14}/></div>
              </div>
            </div>
          ))}
        </>}

        {/* ── FIX 2: CHECKLIST TAB — add / edit / remove ── */}
        {tab==="checklist" && (
          <div style={{background:"var(--surface)",border:"1px solid var(--border)",borderRadius:20,padding:18}}>
            <div className="bismillah">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم</div>
            <div style={{fontFamily:"Poppins,sans-serif",fontSize:15,fontWeight:700,color:"var(--text-1)",marginBottom:4}}>Islamic Compliance</div>
            <div style={{fontSize:12,color:"var(--text-3)",marginBottom:14}}>Verify all conditions before slaughter</div>

            {checkItems.map(item => (
              editingCl?.id === item.id ? (
                /* ── EDIT ROW ── */
                <div key={item.id} style={{display:"flex",gap:8,padding:"10px 0",borderBottom:"1px solid var(--border)",alignItems:"center"}}>
                  <input
                    className="form-input"
                    style={{flex:1,padding:"8px 12px",fontSize:13}}
                    value={editingCl.text}
                    onChange={e=>setEditingCl({...editingCl,text:e.target.value})}
                    onKeyDown={e=>e.key==="Enter"&&saveEditCl()}
                    autoFocus
                  />
                  <button className="btn btn-ghost btn-sm" onClick={saveEditCl}>✓</button>
                  <button className="btn btn-surface btn-sm" onClick={()=>setEditingCl(null)}>✕</button>
                </div>
              ) : (
                /* ── NORMAL ROW ── */
                <div key={item.id} className="check-item" style={{borderBottom:"1px solid var(--border)"}}>
                  <div className={`check-box ${item.checked?"on":""}`} onClick={()=>toggleCl(item.id)}>
                    {item.checked && <ICheck size={13}/>}
                  </div>
                  <div className={`check-label ${item.checked?"on":""}`} style={{flex:1,userSelect:"none"}} onClick={()=>toggleCl(item.id)}>
                    {item.text}
                  </div>
                  <div style={{display:"flex",gap:6,marginLeft:6}}>
                    <div onClick={()=>setEditingCl({id:item.id,text:item.text})} style={{
                      width:28,height:28,borderRadius:8,background:"var(--primary-dim)",
                      display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",color:"var(--primary)"
                    }}><IEdit size={13}/></div>
                    <div onClick={()=>removeCl(item.id)} style={{
                      width:28,height:28,borderRadius:8,background:"var(--red-dim)",
                      display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",color:"var(--red)"
                    }}><ITrash size={13}/></div>
                  </div>
                </div>
              )
            ))}

            <div style={{marginTop:12,marginBottom:16,fontSize:13,color:"var(--primary)",fontWeight:700,fontFamily:"Poppins,sans-serif"}}>
              {checkItems.filter(c=>c.checked).length}/{checkItems.length} conditions met
            </div>

            {/* ── ADD NEW CONDITION ── */}
            <div style={{display:"flex",gap:8,alignItems:"center"}}>
              <input
                className="form-input"
                style={{flex:1,padding:"10px 14px",fontSize:13}}
                value={newCheckTxt}
                onChange={e=>setNewCheckTxt(e.target.value)}
                placeholder="Add a custom condition..."
                onKeyDown={e=>e.key==="Enter"&&addCl()}
              />
              <button className="btn btn-ghost" style={{padding:"10px 16px",whiteSpace:"nowrap",flexShrink:0}} onClick={addCl}>
                <IPlus size={14}/> Add
              </button>
            </div>
          </div>
        )}
      </div>

      {showAddS && <SharikModal onClose={()=>setAddS(false)} onSave={addSharik}/>}
      {selS && (
        <SharikDetailModal
          sharik={selS} animal={animal} eventName={eventName}
          onClose={()=>setSelS(null)}
          onUpdate={s=>{upSharik(s);setSelS(s);toast("Saved ✓");}}
          onDelete={id=>{ setSelS(null); setConfirmDelSharik(id); }}
        />
      )}

      {/* FIX 4: Animal delete confirmation */}
      {confirmDelAnimal && (
        <ConfirmModal
          title="Delete Animal?"
          message={`Remove "${animal.name}" along with all its parts and shariks? This cannot be undone.`}
          onConfirm={()=>{ setConfirmDelAnimal(false); onDeleteAnimal(animal.id); }}
          onCancel={()=>setConfirmDelAnimal(false)}
        />
      )}

      {/* FIX 5: Sharik delete confirmation */}
      {confirmDelSharik && (
        <ConfirmModal
          title="Remove Sharik?"
          message="This sharik and their share data will be permanently removed."
          onConfirm={()=>delSharik(confirmDelSharik)}
          onCancel={()=>setConfirmDelSharik(null)}
        />
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   SHARIK MODAL — Add / Edit
══════════════════════════════════════════════════════════════════ */
function SharikModal({ onClose, onSave, initial }) {
  const [f, setF] = useState(initial || { name:"", phone:"", shares:1, paymentStatus:"pending", specialRequest:"", deliveryStatus:"pending" });
  const s = (k,v) => setF(p=>({...p,[k]:v}));
  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={e=>e.stopPropagation()}>
        <div className="modal-handle"/>
        <div className="modal-title">{initial?"Edit Sharik":"Add Sharik"}</div>
        <div className="form-group"><label className="form-label">Full Name *</label><input className="form-input" value={f.name} onChange={e=>s("name",e.target.value)} placeholder="e.g. Tanvir Ahmed"/></div>
        <div className="form-group"><label className="form-label">Phone Number</label><input className="form-input" type="tel" value={f.phone} onChange={e=>s("phone",e.target.value)} placeholder="0300-1234567"/></div>
        <div className="input-grid">
          <div className="form-group">
            <label className="form-label">Shares</label>
            <input className="form-input" type="number" min="1" value={f.shares} onChange={e=>s("shares",Number(e.target.value))}/>
          </div>
          <div className="form-group">
            <label className="form-label">Payment</label>
            <select className="form-select" value={f.paymentStatus} onChange={e=>s("paymentStatus",e.target.value)}>
              <option value="pending">Pending</option>
              <option value="partial">Partial</option>
              <option value="paid">Paid</option>
            </select>
          </div>
        </div>
        <div className="form-group"><label className="form-label">Special Request</label><input className="form-input" value={f.specialRequest} onChange={e=>s("specialRequest",e.target.value)} placeholder="e.g. Less bone, extra liver..."/></div>
        <div className="btn-row">
          <button className="btn btn-primary" style={{flex:1}} onClick={()=>f.name&&onSave({...f,id:initial?.id||mkId()})}>{initial?"Save Changes":"Add Sharik"}</button>
          <button className="btn btn-surface" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   SHARIK DETAIL MODAL — receipt, 2-option delivery, confirm delete
══════════════════════════════════════════════════════════════════ */
function SharikDetailModal({ sharik, animal, eventName, onClose, onUpdate, onDelete }) {
  const [editing,    setEditing]    = useState(false);
  const [confirmDel, setConfirmDel] = useState(false);

  const slots   = totalSlots(animal);
  const myTotal = sharikTotalKg(animal, sharik);
  const myParts = sharikParts(animal, sharik);

  // Fix 7: treat "delivered" as collected too (legacy compat)
  const isCollected = sharik.deliveryStatus === "collected" || sharik.deliveryStatus === "delivered";

  const waText = () => {
    const lines = myParts.map(p => `${p.name}: *${p.sharikKg.toFixed(2)} kg*`).join("\n");
    return encodeURIComponent(
      `🌙 *Eid-ul-Adha — QurbaniTracker*\n\nAs-salamu alaykum *${sharik.name}*,\nYour Qurbani share from ${animal.name} is ready!\n\n📦 *Your Share (${sharik.shares>1?`${sharik.shares} shares`:"1 share"}):*\n${lines}\n\n📊 *Total: ${myTotal.toFixed(2)} kg*\n${isCollected?"✅ Collected":"⏳ Not Collected"}\n\n_JazakAllah Khair 🤲_\n_Sent via QurbaniTracker_`
    );
  };

  if (editing) return <SharikModal initial={sharik} onClose={()=>setEditing(false)} onSave={s=>{onUpdate(s);setEditing(false);}}/>;

  const partIcon = n => n==="Solid Beef"||n==="Meat"?"🥩":n==="Bone"?"🦴":n==="Fat"?"🧈":n==="Liver"||n==="Heart"?"❤️":n==="Kidney"?"🫘":"📦";

  return (
    <>
      <div className="overlay" onClick={onClose}>
        <div className="modal" onClick={e=>e.stopPropagation()}>
          <div className="modal-handle"/>
          <div className="receipt">
            <div className="receipt-event">{eventName}</div>
            <div className="receipt-name">{sharik.name}</div>
            <div className="receipt-animal">{animal.name} · {slots} total slots{sharik.shares>1?` · ${sharik.shares} shares`:""}</div>
            <hr className="receipt-divider"/>
            {myParts.map(p => (
              <div className="receipt-row" key={p.id}>
                <div className="receipt-row-left"><span>{partIcon(p.name)}</span><span>{p.name}</span></div>
                <span className="receipt-row-kg">{p.sharikKg.toFixed(2)} kg</span>
              </div>
            ))}
            <div className="receipt-total-block">
              <div className="receipt-total-lbl">Total Share</div>
              <div className="receipt-total-val">{myTotal.toFixed(2)}<span className="receipt-total-unit"> kg</span></div>
            </div>
          </div>

          <div className="info-grid" style={{marginBottom:12}}>
            {[["📞 Phone",sharik.phone||"—"],["💳 Payment",sharik.paymentStatus],["🔢 Shares",sharik.shares||1],["📝 Request",sharik.specialRequest||"None"]].map(([l,v]) => (
              <div key={l}><div className="info-lbl">{l}</div><div className="info-val">{v}</div></div>
            ))}
          </div>

          {/* FIX 7: Only 2 delivery options */}
          <div style={{marginBottom:14}}>
            <div className="form-label">Update Delivery</div>
            <div className="del-toggle" style={{gap:10}}>
              <button
                className={`del-opt ${!isCollected?"on":""}`}
                style={!isCollected?{borderColor:"rgba(255,92,92,0.5)",background:"var(--red-dim)",color:"var(--red)"}:{}}
                onClick={()=>onUpdate({...sharik,deliveryStatus:"not_collected"})}>
                ⏳ Not Collected
              </button>
              <button
                className={`del-opt ${isCollected?"on":""}`}
                onClick={()=>onUpdate({...sharik,deliveryStatus:"collected"})}>
                ✅ Collected
              </button>
            </div>
          </div>

          <div className="btn-row" style={{marginBottom:8}}>
            <button className="btn btn-gold" style={{flex:1}} onClick={()=>window.open(`https://wa.me/?text=${waText()}`,"_blank")}><IWA size={16}/> WhatsApp</button>
            <button className="btn btn-ghost" style={{flex:1}} onClick={()=>setEditing(true)}><IEdit size={16}/> Edit</button>
            {/* FIX 5: confirm before delete */}
            <button className="btn btn-danger btn-sm" onClick={()=>setConfirmDel(true)}><ITrash size={14}/></button>
          </div>
        </div>
      </div>

      {/* FIX 5: Confirmation popup */}
      {confirmDel && (
        <ConfirmModal
          title="Remove Sharik?"
          message={`Remove ${sharik.name} from this animal? This cannot be undone.`}
          onConfirm={()=>{ setConfirmDel(false); onDelete(sharik.id); }}
          onCancel={()=>setConfirmDel(false)}
        />
      )}
    </>
  );
}

/* ══════════════════════════════════════════════════════════════════
   SHARIKS SCREEN — global view with working delete
══════════════════════════════════════════════════════════════════ */
function ShariksScreen({ state, onUpdate, toast }) {
  const [filter, setFilter]   = useState("all");
  const [sel, setSel]         = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [confirmDel, setConfirmDel] = useState(null); // {sharikId, animalId}
  const event = state.events.find(e => e.id === state.activeEventId);
  if (!event) return <div className="page"><div className="empty"><div className="empty-ico"><IUser size={52}/></div><div className="empty-txt">No event selected</div></div></div>;

  const allS = event.animals.flatMap(a => a.shareholders.map(s => ({...s, animal:a})));
  const filtered = filter==="all" ? allS : allS.filter(s => s.paymentStatus===filter);

  // ── Correct delete implementation — directly calls setState ──
  const deleteSharik = (sharikId, animalId) => {
    onUpdate(prev => ({
      ...prev,
      events: prev.events.map(ev =>
        ev.id !== prev.activeEventId ? ev : {
          ...ev,
          animals: ev.animals.map(a =>
            a.id !== animalId ? a : {
              ...a,
              shareholders: a.shareholders.filter(sh => sh.id !== sharikId)
            }
          )
        }
      )
    }));
    setSel(null);
    toast("Sharik removed");
  };

  const updateSharik = (updated, animalId) => {
    onUpdate(prev => ({
      ...prev,
      events: prev.events.map(ev =>
        ev.id !== prev.activeEventId ? ev : {
          ...ev,
          animals: ev.animals.map(a =>
            a.id !== animalId ? a : {
              ...a,
              shareholders: a.shareholders.map(sh => sh.id===updated.id ? updated : sh)
            }
          )
        }
      )
    }));
  };

  const firstAnimal = event.animals[0];

  return (
    <div className="page">
      <div className="sec-header"><div className="sec-title">All Shariks</div><span className="sec-badge">{allS.length}</span></div>
      {firstAnimal
        ? <button className="btn btn-primary" style={{marginBottom:14}} onClick={()=>setShowAdd(true)}><IPlus size={16}/> Add New Sharik</button>
        : <div style={{background:"var(--gold-dim)",border:"1px solid rgba(245,166,35,0.2)",borderRadius:12,padding:"10px 14px",marginBottom:14,fontSize:12,color:"var(--gold)",fontWeight:600}}>⚠️ Add an animal first</div>
      }
      <div style={{display:"flex",gap:8,marginBottom:14,overflowX:"auto",paddingBottom:4}}>
        {["all","paid","pending","partial"].map(f => (
          <div key={f} style={{padding:"8px 14px",background:filter===f?"var(--primary)":"var(--surface)",border:"1px solid var(--border)",borderRadius:999,fontSize:12,fontWeight:700,whiteSpace:"nowrap",cursor:"pointer",color:filter===f?"#000":"var(--text-2)",transition:"all 0.15s"}} onClick={()=>setFilter(f)}>
            {f.charAt(0).toUpperCase()+f.slice(1)}
          </div>
        ))}
      </div>
      {filtered.length===0
        ? <div className="empty"><div className="empty-ico"><IUser size={48}/></div><div className="empty-txt">No results</div></div>
        : filtered.map(s => {
            const myTotal = sharikTotalKg(s.animal, s);
            return (
              <div className="sharik-card" key={s.id+s.animal.id} onClick={()=>setSel({sharik:s,animal:s.animal})}>
                <div className="avatar" style={{background:avColor(s.name)}}>{initials(s.name)}</div>
                <div style={{flex:1,minWidth:0}}>
                  <div className="sharik-name">{s.name}</div>
                  <div className="sharik-sub">{s.animal.name} · {myTotal.toFixed(2)} kg{s.shares>1?` · ${s.shares} shares`:""}</div>
                  {s.specialRequest && <div className="sharik-req">📝 {s.specialRequest}</div>}
                </div>
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  <div>
                    <div style={{marginBottom:4}}><span className={`badge badge-${s.paymentStatus}`}>{s.paymentStatus}</span></div>
                    <div className={`del-tag ${s.deliveryStatus!=="pending"?"done":""}`}>{s.deliveryStatus==="delivered"?"✅":s.deliveryStatus==="collected"?"🏠":"⏳"}</div>
                  </div>
                  {/* FIX 5: confirm before delete */}
                  <div className="del-btn" onClick={e=>{e.stopPropagation();setConfirmDel({sharikId:s.id,animalId:s.animal.id});}}><ITrash size={14}/></div>
                </div>
              </div>
            );
          })
      }
      {sel && (
        <SharikDetailModal
          sharik={sel.sharik} animal={sel.animal} eventName={event.name}
          onClose={()=>setSel(null)}
          onUpdate={updated=>{updateSharik(updated,sel.animal.id);setSel({...sel,sharik:updated});toast("Saved ✓");}}
          onDelete={id=>{ setSel(null); setConfirmDel({sharikId:id,animalId:sel.animal.id}); }}
        />
      )}
      {confirmDel && (
        <ConfirmModal
          title="Remove Sharik?"
          message="This sharik and their share data will be permanently removed."
          onConfirm={()=>{ deleteSharik(confirmDel.sharikId,confirmDel.animalId); setConfirmDel(null); }}
          onCancel={()=>setConfirmDel(null)}
        />
      )}
      {showAdd && firstAnimal && (
        <SharikModal
          onClose={()=>setShowAdd(false)}
          onSave={s => {
            onUpdate(prev => ({
              ...prev,
              events: prev.events.map(ev =>
                ev.id!==prev.activeEventId ? ev : {
                  ...ev,
                  animals: ev.animals.map(a =>
                    a.id!==firstAnimal.id ? a : {...a, shareholders:[...a.shareholders,s]}
                  )
                }
              )
            }));
            setShowAdd(false);
            toast("Sharik added ✓");
          }}
        />
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   EVENTS SCREEN — export (PDF/JPG) + duplicate + delete (Fix 3)
══════════════════════════════════════════════════════════════════ */
function EventsScreen({ state, onSetActive, onAddEvent, onDeleteEvent, onDuplicateEvent }) {
  const [showAdd, setShowAdd]         = useState(false);
  const [name, setName]               = useState(`Eid-ul-Adha ${new Date().getFullYear()}`);
  const [confirmDel, setConfirmDel]   = useState(null);
  const [dupModal, setDupModal]       = useState(null);  // event to duplicate
  const [dupName, setDupName]         = useState("");

  // ── Generate styled HTML for an event ──
  const buildEventHTML = (ev) => {
    const rows = ev.animals.map(a => {
      const kg = a.parts.reduce((s,p)=>s+Number(p.totalKg),0);
      const psk = perSlotKg(a);
      const partsHTML = a.parts.filter(p=>Number(p.totalKg)>0).map(p =>
        `<span style="display:inline-block;background:#e8fef7;color:#00a37a;border:1px solid #b2f0df;border-radius:6px;padding:2px 8px;font-size:12px;margin:2px">${p.name}: ${Number(p.totalKg).toFixed(1)} kg</span>`
      ).join("");
      const shariksHTML = a.shareholders.map(sh =>
        `<div style="display:flex;justify-content:space-between;padding:4px 0;border-bottom:1px solid #eee;font-size:13px">
          <span style="font-weight:600">${sh.name}${sh.shares>1?` (${sh.shares} shares)`:""}</span>
          <span style="display:flex;gap:8px">
            <span style="color:${sh.paymentStatus==="paid"?"#00a37a":sh.paymentStatus==="partial"?"#4a90e2":"#e74c3c"};font-weight:600">${sh.paymentStatus}</span>
            <span style="color:${sh.deliveryStatus==="collected"||sh.deliveryStatus==="delivered"?"#00a37a":"#e74c3c"};font-weight:600">${sh.deliveryStatus==="collected"||sh.deliveryStatus==="delivered"?"Collected":"Pending"}</span>
          </span>
        </div>`
      ).join("");
      return `
        <div style="background:#fff;border:1px solid #e0e0e0;border-radius:12px;padding:16px;margin-bottom:14px">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
            <div style="font-size:17px;font-weight:800;color:#0d1626">${a.name}</div>
            <div style="font-size:12px;color:#8b9bb4">${kg.toFixed(1)} kg · ≈${psk.toFixed(2)} kg/unit</div>
          </div>
          <div style="margin-bottom:10px">${partsHTML||'<span style="font-size:12px;color:#aaa">No parts</span>'}</div>
          <div style="font-size:11px;font-weight:700;color:#8b9bb4;text-transform:uppercase;letter-spacing:0.7px;margin-bottom:6px">SHARIKS (${a.shareholders.length})</div>
          ${shariksHTML||'<div style="font-size:12px;color:#aaa">None</div>'}
        </div>`;
    }).join("");

    return `<!DOCTYPE html><html><head><meta charset="utf-8">
    <title>${ev.name} — QurbaniTracker</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800&display=swap" rel="stylesheet">
    <style>
      *{box-sizing:border-box;margin:0;padding:0}
      body{font-family:'Poppins',sans-serif;background:#f5f7fa;padding:24px;max-width:700px;margin:0 auto}
      h1{font-size:26px;font-weight:800;color:#00c9a7;margin-bottom:4px}
      .meta{font-size:13px;color:#8b9bb4;margin-bottom:20px}
      .stat-row{display:flex;gap:12px;margin-bottom:20px}
      .stat{flex:1;background:#fff;border:1px solid #e0e0e0;border-radius:10px;padding:12px;text-align:center}
      .stat-val{font-size:24px;font-weight:800;color:#0d1626}
      .stat-lbl{font-size:10px;color:#8b9bb4;text-transform:uppercase;letter-spacing:0.7px;font-weight:600}
      @media print{body{background:#fff;padding:12px}button{display:none}}
    </style>
    </head><body>
    <h1>🌙 ${ev.name}</h1>
    <div class="meta">QurbaniTracker Export · ${new Date().toLocaleDateString()}</div>
    <div class="stat-row">
      <div class="stat"><div class="stat-val">${ev.animals.length}</div><div class="stat-lbl">Animals</div></div>
      <div class="stat"><div class="stat-val">${ev.animals.reduce((s,a)=>s+a.shareholders.length,0)}</div><div class="stat-lbl">Shariks</div></div>
      <div class="stat"><div class="stat-val">${ev.animals.reduce((s,a)=>s+a.parts.reduce((s2,p)=>s2+Number(p.totalKg),0),0).toFixed(1)} kg</div><div class="stat-lbl">Total Meat</div></div>
    </div>
    ${rows}
    <div style="text-align:center;font-size:11px;color:#aaa;margin-top:20px">Generated by QurbaniTracker</div>
    </body></html>`;
  };

  const exportPDF = (ev) => {
    const w = window.open("", "_blank");
    w.document.write(buildEventHTML(ev));
    w.document.close();
    setTimeout(() => w.print(), 600);
  };

  const exportJPG = (ev) => {
    const html = buildEventHTML(ev);
    const blob = new Blob([html], {type:"text/html"});
    const url  = URL.createObjectURL(blob);
    const w    = window.open(url, "_blank");
    setTimeout(() => {
      w.document.title = ev.name;
      // Inject html2canvas from CDN then capture
      const s = w.document.createElement("script");
      s.src = "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";
      s.onload = () => {
        w.html2canvas(w.document.body, {scale:2, useCORS:true, backgroundColor:"#f5f7fa"}).then(canvas => {
          const a = w.document.createElement("a");
          a.download = `${ev.name.replace(/\s+/g,"-")}.jpg`;
          a.href = canvas.toDataURL("image/jpeg", 0.92);
          a.click();
        });
      };
      w.document.head.appendChild(s);
    }, 800);
  };

  return (
    <div className="page">
      <div className="sec-header">
        <div className="sec-title">Events & History</div>
        <button className="btn btn-ghost btn-sm" onClick={()=>setShowAdd(true)}><IPlus size={14}/> New</button>
      </div>

      {state.events.map(ev => {
        const total = ev.animals.reduce((s,a) => s+a.shareholders.length, 0);
        const isActive = ev.id === state.activeEventId;
        return (
          <div key={ev.id} className={`event-card ${isActive?"active-ev":""}`}
               style={{cursor:"pointer"}}
               onClick={()=>onSetActive(ev.id)}>
            {/* Title row */}
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
              <div style={{fontFamily:"Poppins,sans-serif",fontSize:15,fontWeight:700,color:"var(--text-1)",flex:1,minWidth:0,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
                {isActive && <span style={{color:"var(--primary)",marginRight:6}}>●</span>}
                {ev.name}
              </div>
              {isActive && <span className="badge badge-paid" style={{flexShrink:0}}>Active</span>}
            </div>
            <div style={{fontSize:12,color:"var(--text-2)",marginBottom:12}}>{ev.animals.length} animals · {total} shareholders</div>

            {/* Action buttons row */}
            <div style={{display:"flex",gap:6}} onClick={e=>e.stopPropagation()}>
              {/* Export PDF */}
              <button className="btn btn-surface" style={{flex:1,padding:"8px 4px",fontSize:11,gap:4,borderRadius:10}} onClick={()=>exportPDF(ev)}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                PDF
              </button>
              {/* Export JPG */}
              <button className="btn btn-surface" style={{flex:1,padding:"8px 4px",fontSize:11,gap:4,borderRadius:10}} onClick={()=>exportJPG(ev)}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                JPG
              </button>
              {/* Duplicate */}
              <button className="btn btn-ghost" style={{flex:1,padding:"8px 4px",fontSize:11,gap:4,borderRadius:10,color:"var(--primary)"}}
                onClick={()=>{setDupModal(ev);setDupName(`${ev.name} (Copy)`);}}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
                Copy
              </button>
              {/* Delete */}
              <div className="del-btn" style={{flexShrink:0}} onClick={()=>setConfirmDel(ev.id)}>
                <ITrash size={14}/>
              </div>
            </div>
          </div>
        );
      })}

      {/* New event modal */}
      {showAdd && (
        <div className="overlay" onClick={()=>setShowAdd(false)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <div className="modal-handle"/>
            <div className="modal-title">New Event</div>
            <div className="form-group">
              <label className="form-label">Event Name</label>
              <input className="form-input" value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. Eid-ul-Adha 2026"/>
            </div>
            <div className="btn-row">
              <button className="btn btn-primary" style={{flex:1}} onClick={()=>{if(name){onAddEvent(name);setShowAdd(false);}}}>Create</button>
              <button className="btn btn-surface" onClick={()=>setShowAdd(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Duplicate rename modal */}
      {dupModal && (
        <div className="overlay" onClick={()=>setDupModal(null)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <div className="modal-handle"/>
            <div className="modal-title">Duplicate Event</div>
            <div style={{fontSize:12,color:"var(--text-3)",marginBottom:16}}>
              Copying all animals and data from <strong style={{color:"var(--text-1)"}}>{dupModal.name}</strong>
            </div>
            <div className="form-group">
              <label className="form-label">New Event Name</label>
              <input className="form-input" value={dupName} onChange={e=>setDupName(e.target.value)} autoFocus/>
            </div>
            <div className="btn-row">
              <button className="btn btn-primary" style={{flex:1}} onClick={()=>{
                if(dupName.trim()) {
                  onDuplicateEvent(dupModal, dupName.trim());
                  setDupModal(null);
                }
              }}>Duplicate</button>
              <button className="btn btn-surface" onClick={()=>setDupModal(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {confirmDel && (
        <ConfirmModal
          title="Delete Event?"
          message={`Remove "${state.events.find(e=>e.id===confirmDel)?.name}" and ALL its animals and shariks? This cannot be undone.`}
          onConfirm={()=>{ onDeleteEvent(confirmDel); setConfirmDel(null); }}
          onCancel={()=>setConfirmDel(null)}
        />
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   ADD ANIMAL MODAL — auto-generates name from type
══════════════════════════════════════════════════════════════════ */
function AddAnimalModal({ onClose, onAdd, existingAnimals }) {
  const [type, setType]     = useState("cow");
  const [name, setName]     = useState(() => autoName("cow", existingAnimals));
  const [edited, setEdited] = useState(false);
  const [weight, setWeight] = useState("");
  const [notes, setNotes]   = useState("");

  const changeType = t => {
    setType(t);
    if (!edited) setName(autoName(t, existingAnimals));
  };

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={e=>e.stopPropagation()}>
        <div className="modal-handle"/>
        <div className="modal-title">Add Animal</div>
        <div className="form-group">
          <label className="form-label">Type</label>
          <div className="type-grid">
            {ANIMAL_TYPES.map(t => (
              <button key={t} className={`type-btn ${type===t?"sel":""}`} onClick={()=>changeType(t)}>
                {ANIMAL_EMOJI[t]} {ANIMAL_LABELS[t]}
              </button>
            ))}
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Animal Name</label>
          <input className="form-input" value={name} onChange={e=>{setName(e.target.value);setEdited(true);}} placeholder="e.g. Cow #1"/>
        </div>
        <div className="form-group">
          <label className="form-label">Live Weight (kg) — optional</label>
          <input className="form-input" type="number" value={weight} onChange={e=>setWeight(e.target.value)} placeholder="e.g. 350"/>
        </div>
        <div className="form-group">
          <label className="form-label">Notes</label>
          <input className="form-input" value={notes} onChange={e=>setNotes(e.target.value)} placeholder="Farmer name, purchase info..."/>
        </div>
        <div className="btn-row">
          <button className="btn btn-primary" style={{flex:1}} onClick={()=>name&&onAdd({
            id:mkId(), name, type, liveWeight:Number(weight)||0, notes,
            parts:DEFAULT_PARTS(), shareholders:[], checklist:CHECKLIST.map(()=>false)
          })}>Add Animal</button>
          <button className="btn btn-surface" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   ESTIMATOR SCREEN
══════════════════════════════════════════════════════════════════ */
function EstimatorScreen({ onBack }) {
  const [type, setType] = useState("cow");
  const [lw, setLw]     = useState("");
  const res = useMemo(() => {
    if (!lw||!Number(lw)) return null;
    const r=YIELD[type], w=Number(lw);
    return { meat:(w*r.meat).toFixed(1), bone:(w*r.bone).toFixed(1), fat:(w*r.fat).toFixed(1), offal:(w*r.offal).toFixed(1), total:(w*(r.meat+r.bone+r.fat+r.offal)).toFixed(1) };
  }, [type, lw]);
  return (
    <div className="page">
      <button className="back-btn" onClick={onBack}><IBack size={14}/> Back</button>
      <div style={{fontFamily:"Poppins,sans-serif",fontSize:22,fontWeight:800,color:"var(--text-1)",marginBottom:4}}>Weight Estimator</div>
      <div style={{fontSize:12,color:"var(--text-3)",marginBottom:20}}>Estimate yield from live weight</div>
      <div style={{background:"var(--surface)",border:"1px solid var(--border)",borderRadius:20,padding:18,marginBottom:16}}>
        <div className="form-group">
          <label className="form-label">Animal Type</label>
          <div className="type-grid">{ANIMAL_TYPES.map(t=><button key={t} className={`type-btn ${type===t?"sel":""}`} onClick={()=>setType(t)}>{ANIMAL_EMOJI[t]} {ANIMAL_LABELS[t]}</button>)}</div>
        </div>
        <div className="form-group" style={{marginBottom:0}}>
          <label className="form-label">Live Weight (kg)</label>
          <input className="form-input" type="number" value={lw} onChange={e=>setLw(e.target.value)} placeholder="e.g. 350"/>
        </div>
      </div>
      {res && (
        <div className="est-result">
          <div style={{fontFamily:"Poppins,sans-serif",fontSize:15,fontWeight:700,color:"var(--text-1)",marginBottom:12}}>Estimated Yield — {lw}kg {ANIMAL_EMOJI[type]}</div>
          {[["🥩","Solid Meat",res.meat],["🦴","Bone",res.bone],["🧈","Fat",res.fat],["❤️","Offal",res.offal]].map(([ic,l,v]) => (
            <div className="est-row" key={l}><div className="est-lbl"><span>{ic}</span>{l}</div><div className="est-val">{v} kg</div></div>
          ))}
          <div className="est-row"><div className="est-lbl" style={{color:"var(--text-1)",fontWeight:800}}>📦 Total Usable</div><div className="est-val" style={{fontSize:17}}>{res.total} kg</div></div>
          <div style={{marginTop:12,fontSize:11,color:"var(--text-3)",background:"var(--surface-3)",borderRadius:10,padding:"10px 12px",lineHeight:1.5}}>ℹ️ Estimates only. Actual yield varies by breed and technique.</div>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   BOTTOM NAV — floating pill with SVG icons
══════════════════════════════════════════════════════════════════ */
function BottomNav({ active, onNav, onAdd }) {
  const left  = [["home",<IHome sw={1.8}/>,"Home"],["animals",<ICow sw={1.8}/>,"Animals"]];
  const right = [["shariks",<IUser sw={1.8}/>,"Shariks"],["events",<IStack sw={1.8}/>,"Events"]];
  return (
    <nav className="bottom-nav">
      {left.map(([id,ic,lbl]) => (
        <button key={id} className={`nav-item ${active===id?"active":""}`} onClick={()=>onNav(id)}>
          <div className="nav-icon-wrap">{ic}</div>
          <span className="nav-label">{lbl}</span>
        </button>
      ))}
      <button className="nav-fab" onClick={onAdd} title="Add Animal"><IPlus size={24} sw={2.5}/></button>
      {right.map(([id,ic,lbl]) => (
        <button key={id} className={`nav-item ${active===id?"active":""}`} onClick={()=>onNav(id)}>
          <div className="nav-icon-wrap">{ic}</div>
          <span className="nav-label">{lbl}</span>
        </button>
      ))}
    </nav>
  );
}

/* ══════════════════════════════════════════════════════════════════
   ROOT APP
══════════════════════════════════════════════════════════════════ */
export default function App() {
  const [state, setState]   = useState(() => { try { const d=localStorage.getItem("qt_v3"); return d?JSON.parse(d):INIT_DATA; } catch { return INIT_DATA; } });
  const [screen, setScreen] = useState("home");
  const [detailId, setDetailId] = useState(null);
  const [toast, setToast]   = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [theme, setTheme]   = useState(() => localStorage.getItem("qt_theme") || "dark");
  const [onboarded, setOnboarded] = useState(() => !!localStorage.getItem("qt_onboarded"));

  useEffect(() => { try { localStorage.setItem("qt_v3", JSON.stringify(state)); } catch {} }, [state]);
  useEffect(() => { document.documentElement.setAttribute("data-theme", theme); localStorage.setItem("qt_theme", theme); }, [theme]);

  const showToast = msg => { setToast(msg); setTimeout(()=>setToast(""),2600); };
  const toggleTheme = () => setTheme(t => t==="dark"?"light":"dark");

  const nav = useCallback((s, param=null) => { setScreen(s); if(param!==null) setDetailId(param); }, []);

  const activeEvent = state.events.find(e => e.id === state.activeEventId);

  const updateAnimal = useCallback(updated => {
    setState(prev => ({
      ...prev,
      events: prev.events.map(ev => ({
        ...ev,
        animals: ev.animals.map(a => a.id===updated.id ? updated : a)
      }))
    }));
  }, []);

  const addAnimal = animal => {
    setState(prev => ({
      ...prev,
      events: prev.events.map(ev =>
        ev.id!==prev.activeEventId ? ev : { ...ev, animals:[...ev.animals,animal] }
      )
    }));
    setShowAdd(false);
    showToast("Animal added ✓");
  };

  const addEvent = name => {
    const ev = { id:mkId(), name, year:new Date().getFullYear(), createdAt:new Date().toISOString(), animals:[] };
    setState(prev => ({ ...prev, events:[...prev.events,ev], activeEventId:ev.id }));
    showToast("Event created ✓");
  };

  const deleteAnimal = useCallback(animalId => {
    setState(prev => ({
      ...prev,
      events: prev.events.map(ev => ({
        ...ev,
        animals: ev.animals.filter(a=>a.id!==animalId)
      }))
    }));
    setScreen("animals");
    showToast("Animal removed");
  }, []);

  const deleteEvent = useCallback(eventId => {
    setState(prev => {
      const remaining = prev.events.filter(e=>e.id!==eventId);
      return {
        ...prev,
        events: remaining,
        activeEventId: prev.activeEventId===eventId ? (remaining[0]?.id||null) : prev.activeEventId
      };
    });
    showToast("Event deleted");
  }, []);

  const duplicateEvent = useCallback((srcEvent, newName) => {
    const deepCopyAnimals = (animals) => animals.map(a => ({
      ...a,
      id: mkId(),
      shareholders: a.shareholders.map(sh => ({...sh, id: mkId()})),
      parts: a.parts.map(p => ({...p, id: mkId()})),
      checklist: a.checklist ? a.checklist.map(c => typeof c === "object" ? {...c, id: mkId()} : c) : [],
    }));
    const ev = {
      id: mkId(),
      name: newName,
      year: new Date().getFullYear(),
      createdAt: new Date().toISOString(),
      animals: deepCopyAnimals(srcEvent.animals),
    };
    setState(prev => ({ ...prev, events: [...prev.events, ev] }));
    showToast("Event duplicated ✓");
  }, []);

  // ── Onboarding gate ──
  if (!onboarded) return (
    <>
      <style>{CSS}</style>
      <div style={{maxWidth:430,height:"100dvh",margin:"0 auto",overflow:"hidden"}}>
        <Onboarding theme={theme} onComplete={() => { localStorage.setItem("qt_onboarded","1"); setOnboarded(true); }}/>
      </div>
    </>
  );

  // ── Animal Detail (full-screen, no shell wrapper) ──
  if (screen==="animalDetail") {
    // Find animal in ANY event (since AnimalsScreen shows all events)
    let animal = null, animalEventName = "";
    for (const ev of state.events) {
      const found = ev.animals.find(a => a.id===detailId);
      if (found) { animal = found; animalEventName = ev.name; break; }
    }
    if (animal) return (
      <>
        <style>{CSS}</style>
        <Toast msg={toast}/>
        <AnimalDetail animal={animal} eventName={animalEventName} onBack={()=>setScreen("animals")} onUpdate={updateAnimal} onDeleteAnimal={deleteAnimal} toast={showToast}/>
      </>
    );
  }

  // ── Estimator (no bottom nav needed, but keep shell) ──
  if (screen==="estimator") return (
    <>
      <style>{CSS}</style>
      <div className="app">
        <div className="app-header">
          <div className="header-row">
            <div className="logo-title">QurbaniTracker</div>
            <div style={{display:"flex",gap:8}}>
              <div className="icon-btn" onClick={toggleTheme}>{theme==="dark"?<ISun size={17}/>:<IMoon size={17}/>}</div>
            </div>
          </div>
        </div>
        <div className="content-card">
          <div className="scroll-area"><EstimatorScreen onBack={()=>setScreen("home")}/></div>
          <BottomNav active="home" onNav={nav} onAdd={()=>setShowAdd(true)}/>
        </div>
      </div>
    </>
  );

  const TABS = ["home","animals","shariks","events"];

  return (
    <>
      <style>{CSS}</style>
      <Toast msg={toast}/>
      <div className="app">
        {/* HEADER — sits on --hdr-bg (teal in light, dark navy in dark) */}
        <div className="app-header">
          <div className="header-row">
            <div className="logo-title">QurbaniTracker</div>
            <div style={{display:"flex",gap:8}}>
              <div className="icon-btn" onClick={()=>setScreen("estimator")} title="Weight Estimator"><IScale size={17}/></div>
              {/* Light/Dark mode toggle — top right */}
              <div className="icon-btn" onClick={toggleTheme} title={theme==="dark"?"Light Mode":"Dark Mode"}>
                {theme==="dark" ? <ISun size={17}/> : <IMoon size={17}/>}
              </div>
            </div>
          </div>
          {activeEvent && (
            <div className="event-chip" onClick={()=>setScreen("events")}>
              <span className="event-chip-dot"/>
              <span className="event-chip-name">{activeEvent.name}</span>
              <IChevD size={13}/>
            </div>
          )}
        </div>

        {/* CONTENT CARD — rises with rounded top over header bg */}
        <div className="content-card">
          <div className="scroll-area">
            {screen==="home"    && <HomeScreen    state={state} onNav={nav}/>}
            {screen==="animals" && <AnimalsScreen state={state} onNav={nav} onAddAnimal={()=>setShowAdd(true)}/>}
            {screen==="shariks" && <ShariksScreen state={state} onUpdate={setState} toast={showToast}/>}
            {screen==="events"  && <EventsScreen  state={state} onSetActive={id=>{setState(p=>({...p,activeEventId:id}));setScreen("home");showToast("Switched ✓");}} onAddEvent={addEvent} onDeleteEvent={deleteEvent} onDuplicateEvent={duplicateEvent}/>}
          </div>

          {/* BOTTOM NAV — Figma floating pill style with SVG icons */}
          <BottomNav
            active={TABS.includes(screen)?screen:"home"}
            onNav={s=>setScreen(s)}
            onAdd={()=>setShowAdd(true)}
          />
        </div>
      </div>

      {showAdd && (
        <AddAnimalModal
          onClose={()=>setShowAdd(false)}
          onAdd={addAnimal}
          existingAnimals={activeEvent?.animals||[]}
        />
      )}
    </>
  );
}
