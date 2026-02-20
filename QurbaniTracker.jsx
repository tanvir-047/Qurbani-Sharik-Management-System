import { useState, useEffect, useCallback, useMemo } from "react";

/* ═══════════════════════════════════════════════════════════════════════════
   CONSTANTS & HELPERS
═══════════════════════════════════════════════════════════════════════════ */
const ANIMAL_ICONS  = { cow:"🐄", goat:"🐐", sheep:"🐑", camel:"🐪", buffalo:"🦬" };
const ANIMAL_LABELS = { cow:"Cow", goat:"Goat", sheep:"Sheep", camel:"Camel", buffalo:"Buffalo" };
const YIELD = {
  cow:     { meat:0.38, bone:0.12, fat:0.08, offal:0.05 },
  goat:    { meat:0.42, bone:0.10, fat:0.06, offal:0.04 },
  sheep:   { meat:0.40, bone:0.11, fat:0.09, offal:0.04 },
  camel:   { meat:0.35, bone:0.14, fat:0.07, offal:0.05 },
  buffalo: { meat:0.36, bone:0.13, fat:0.07, offal:0.05 },
};
const PART_ICON = n =>
  n==="Solid Beef"||n==="Meat"?"🥩":n==="Bone"?"🦴":n==="Fat"?"🧈":
  n==="Liver"||n==="Heart"?"❤️":n==="Kidney"?"🫘":"📦";
const CHECKLIST = [
  "Animal is free from defects and healthy",
  "Animal has reached minimum age requirement",
  "Niyyah (intention) has been made",
  "Bismillah Allahu Akbar recited before slaughter",
  "Blade is sharp and not shown to the animal",
  "Direction of Qibla confirmed",
  "Animal slaughtered away from other animals",
];
const AVATAR_COLORS = ["#00C9A7","#F5A623","#4A90E2","#9B59B6","#E74C3C","#1ABC9C","#E67E22","#27AE60"];
const mkId    = () => Math.random().toString(36).slice(2,9);
const initials= n => n?n.split(" ").map(w=>w[0]).join("").toUpperCase().slice(0,2):"?";
const avColor = n => AVATAR_COLORS[(n.charCodeAt(0)+(n.charCodeAt(1)||0))%AVATAR_COLORS.length];

// Auto-generate animal name from type: "Cow #1", "Goat #2" etc.
const autoAnimalName = (type, existingAnimals) => {
  const count = existingAnimals.filter(a=>a.type===type).length + 1;
  return `${ANIMAL_LABELS[type]} #${count}`;
};

const DEFAULT_PARTS = () => [
  { id:mkId(), name:"Solid Beef", totalKg:0 },
  { id:mkId(), name:"Bone",       totalKg:0 },
  { id:mkId(), name:"Fat",        totalKg:0 },
  { id:mkId(), name:"Liver",      totalKg:0 },
  { id:mkId(), name:"Other",      totalKg:0 },
];

const INIT_DATA = {
  events:[{
    id:"ev1", name:"Eid-ul-Adha 2026", year:2026, createdAt:new Date().toISOString(),
    animals:[{
      id:"an1", name:"Cow #1", type:"cow", liveWeight:320, notes:"",
      checklist:CHECKLIST.map((_,i)=>i<3),
      parts:[
        {id:"p1",name:"Solid Beef",totalKg:48},{id:"p2",name:"Bone",totalKg:18},
        {id:"p3",name:"Fat",totalKg:12},{id:"p4",name:"Liver",totalKg:4},{id:"p5",name:"Other",totalKg:6},
      ],
      shareholders:[
        {id:"s1",name:"Tanvir Ahmed",   phone:"0300-1234567",shares:1,paymentStatus:"paid",   specialRequest:"Less bone",   deliveryStatus:"delivered"},
        {id:"s2",name:"Hasan Ali",      phone:"0321-9876543",shares:1,paymentStatus:"pending",specialRequest:"",             deliveryStatus:"pending"},
        {id:"s3",name:"Zainab Malik",   phone:"0333-5556666",shares:1,paymentStatus:"paid",   specialRequest:"Extra liver", deliveryStatus:"collected"},
        {id:"s4",name:"Ibrahim Khan",   phone:"0311-2223333",shares:1,paymentStatus:"partial",specialRequest:"",             deliveryStatus:"pending"},
        {id:"s5",name:"Fatima Noor",    phone:"0345-7778889",shares:1,paymentStatus:"paid",   specialRequest:"",             deliveryStatus:"pending"},
        {id:"s6",name:"Amir Siddiqui", phone:"0312-4445556",shares:1,paymentStatus:"paid",   specialRequest:"No fat",       deliveryStatus:"delivered"},
        {id:"s7",name:"Rukhsana Begum",phone:"0301-8889990",shares:1,paymentStatus:"pending",specialRequest:"",             deliveryStatus:"pending"},
      ],
    }],
  }],
  activeEventId:"ev1",
};

/* ═══════════════════════════════════════════════════════════════════════════
   STYLES — DUAL THEME (dark default + light mode)
═══════════════════════════════════════════════════════════════════════════ */
const buildCSS = () => `
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=DM+Sans:wght@300;400;500;600;700&family=Amiri:wght@400;700&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}

/* ── DARK THEME (default) ── */
:root[data-theme="dark"] {
  --bg:            #080C18;
  --surface:       #0F1628;
  --surface-2:     #151E35;
  --surface-3:     #1C2640;
  --primary:       #00D09C;
  --primary-dk:    #00A87A;
  --primary-dim:   rgba(0,208,156,0.10);
  --primary-bdr:   rgba(0,208,156,0.28);
  --primary-glow:  0 0 24px rgba(0,208,156,0.22);
  --text-1:        #FFFFFF;
  --text-2:        #8B9BB4;
  --text-3:        #3D4F6E;
  --border:        rgba(255,255,255,0.07);
  --border-2:      rgba(255,255,255,0.12);
  --card-shadow:   0 2px 16px rgba(0,0,0,0.50);
  --modal-shadow:  0 20px 60px rgba(0,0,0,0.75);
  --gold:          #F5A623;
  --gold-dim:      rgba(245,166,35,0.14);
  --red:           #FF5C5C;
  --red-dim:       rgba(255,92,92,0.14);
  --blue:          #4A90E2;
  --blue-dim:      rgba(74,144,226,0.14);
  --header-bg:     #0F1628;
  --header-bdr:    rgba(255,255,255,0.07);
  --nav-bg:        #0F1628;
  --nav-bdr:       rgba(255,255,255,0.07);
  --nav-active-bg: #00D09C;
  --stat-hero-bg:  linear-gradient(135deg,#00D09C,#00A87A);
  --stat-gold-bg:  linear-gradient(135deg,#F5A623,#E8921A);
  --stat-hero-txt: rgba(0,0,0,0.85);
  --stat-hero-lbl: rgba(0,0,0,0.55);
  --input-bg:      #1C2640;
  --input-bdr:     rgba(255,255,255,0.12);
  --prog-track:    #1C2640;
  --receipt-bg:    linear-gradient(160deg,#0D1E40,#0A1020);
  --receipt-bdr:   rgba(0,208,156,0.22);
  --check-bg:      #0F1628;
  --toggle-track:  #1C2640;
}

/* ── LIGHT THEME (Figma-inspired: teal header, mint body, white cards) ── */
:root[data-theme="light"] {
  --bg:            #E8F5EF;
  --surface:       #FFFFFF;
  --surface-2:     #F0FBF5;
  --surface-3:     #E0F5EC;
  --primary:       #00C9A7;
  --primary-dk:    #00A88A;
  --primary-dim:   rgba(0,201,167,0.10);
  --primary-bdr:   rgba(0,201,167,0.30);
  --primary-glow:  0 0 20px rgba(0,201,167,0.18);
  --text-1:        #0A1F14;
  --text-2:        #4A6B58;
  --text-3:        #8AADA0;
  --border:        rgba(0,0,0,0.07);
  --border-2:      rgba(0,0,0,0.12);
  --card-shadow:   0 2px 12px rgba(0,120,80,0.10);
  --modal-shadow:  0 20px 60px rgba(0,0,0,0.25);
  --gold:          #E67E00;
  --gold-dim:      rgba(230,126,0,0.12);
  --red:           #D63031;
  --red-dim:       rgba(214,48,49,0.10);
  --blue:          #2980B9;
  --blue-dim:      rgba(41,128,185,0.10);
  --header-bg:     #00C9A7;
  --header-bdr:    rgba(0,0,0,0.08);
  --nav-bg:        #FFFFFF;
  --nav-bdr:       rgba(0,120,80,0.10);
  --nav-active-bg: #00C9A7;
  --stat-hero-bg:  linear-gradient(135deg,#00C9A7,#009E84);
  --stat-gold-bg:  linear-gradient(135deg,#F5A623,#E8921A);
  --stat-hero-txt: #FFFFFF;
  --stat-hero-lbl: rgba(255,255,255,0.75);
  --input-bg:      #F0FBF5;
  --input-bdr:     rgba(0,0,0,0.12);
  --prog-track:    #D5EDE5;
  --receipt-bg:    linear-gradient(160deg,#E8F5EF,#D5EDE5);
  --receipt-bdr:   rgba(0,201,167,0.30);
  --check-bg:      #F0FBF5;
  --toggle-track:  #D5EDE5;
}

html,body,#root{height:100%;}
body{
  font-family:'DM Sans',sans-serif;
  background:var(--bg);
  color:var(--text-1);
  -webkit-font-smoothing:antialiased;
  overflow:hidden;
  transition:background 0.3s,color 0.3s;
}
::-webkit-scrollbar{width:0;background:transparent;}

/* ── SHELL ── */
.app{
  max-width:430px;height:100dvh;margin:0 auto;
  background:var(--bg);display:flex;flex-direction:column;
  position:relative;overflow:hidden;
  transition:background 0.3s;
}
.scroll-area{flex:1;overflow-y:auto;-webkit-overflow-scrolling:touch;overscroll-behavior:contain;}

/* ── HEADER ── */
.app-header{
  flex-shrink:0;
  background:var(--header-bg);
  border-bottom:1px solid var(--header-bdr);
  padding:14px 20px 16px;
  position:relative;overflow:hidden;
  transition:background 0.3s;
}
.app-header::after{
  content:'☽';position:absolute;right:-8px;top:-12px;
  font-size:72px;opacity:0.06;pointer-events:none;color:var(--primary);
}
.header-row{display:flex;align-items:center;justify-content:space-between;}
.logo-wrap{display:flex;flex-direction:column;}
.logo-title{
  font-family:'Outfit',sans-serif;font-size:22px;font-weight:800;
  color:var(--primary);letter-spacing:-0.3px;line-height:1;
}
[data-theme="light"] .logo-title{color:#FFFFFF;}
.logo-sub{font-size:10px;color:var(--text-3);font-weight:600;letter-spacing:1.5px;text-transform:uppercase;margin-top:3px;}
[data-theme="light"] .logo-sub{color:rgba(255,255,255,0.7);}
.header-actions{display:flex;gap:8px;}
.icon-btn{
  width:38px;height:38px;background:var(--surface-2);
  border:1px solid var(--border);border-radius:12px;
  display:flex;align-items:center;justify-content:center;
  cursor:pointer;font-size:17px;transition:all 0.15s;
}
[data-theme="light"] .icon-btn{background:rgba(255,255,255,0.25);border-color:rgba(255,255,255,0.3);}
.icon-btn:active{transform:scale(0.93);}

/* ── THEME TOGGLE BUTTON ── */
.theme-toggle{
  width:38px;height:38px;
  background:var(--surface-2);
  border:1px solid var(--border);
  border-radius:12px;
  display:flex;align-items:center;justify-content:center;
  cursor:pointer;font-size:18px;transition:all 0.2s;
}
[data-theme="light"] .theme-toggle{background:rgba(255,255,255,0.25);border-color:rgba(255,255,255,0.3);}
.theme-toggle:active{transform:scale(0.93);}

.event-chip{
  margin-top:12px;
  display:inline-flex;align-items:center;gap:7px;
  background:var(--primary-dim);
  border:1px solid var(--primary-bdr);
  border-radius:999px;padding:7px 14px;cursor:pointer;
  transition:all 0.15s;
}
[data-theme="light"] .event-chip{background:rgba(255,255,255,0.25);border-color:rgba(255,255,255,0.4);}
.event-chip-dot{width:7px;height:7px;background:var(--primary);border-radius:50%;}
[data-theme="light"] .event-chip-dot{background:#fff;}
.event-chip-name{font-size:12px;font-weight:700;color:var(--primary);font-family:'Outfit',sans-serif;}
[data-theme="light"] .event-chip-name{color:#fff;}
.event-chip-arrow{font-size:9px;color:var(--text-3);}
[data-theme="light"] .event-chip-arrow{color:rgba(255,255,255,0.6);}

/* ── BOTTOM NAV — Figma-inspired floating card ── */
.bottom-nav{
  flex-shrink:0;
  margin:8px 16px 12px;
  background:var(--nav-bg);
  border:1px solid var(--nav-bdr);
  border-radius:28px;
  display:flex;align-items:center;
  padding:10px 8px;
  box-shadow:0 8px 32px rgba(0,0,0,0.18);
  transition:background 0.3s;
  position:relative;
}
.nav-item{
  flex:1;display:flex;flex-direction:column;align-items:center;gap:2px;
  padding:6px 4px;cursor:pointer;border:none;background:none;
  -webkit-tap-highlight-color:transparent;transition:all 0.2s;border-radius:16px;
}
.nav-icon-wrap{
  width:44px;height:44px;
  display:flex;align-items:center;justify-content:center;
  border-radius:50%;transition:all 0.2s;font-size:20px;
}
.nav-item.active .nav-icon-wrap{
  background:var(--nav-active-bg);
  box-shadow:0 4px 14px rgba(0,208,156,0.40);
}
[data-theme="light"] .nav-item.active .nav-icon-wrap{
  box-shadow:0 4px 14px rgba(0,201,167,0.35);
}
.nav-label{
  font-size:10px;font-weight:600;color:var(--text-3);
  font-family:'DM Sans',sans-serif;letter-spacing:0.3px;
  transition:color 0.2s;
}
.nav-item.active .nav-label{color:var(--primary);font-weight:700;}
[data-theme="light"] .nav-item.active .nav-label{color:var(--primary-dk);}

/* ── CENTER FAB in bottom nav ── */
.nav-fab{
  flex:0 0 auto;
  width:52px;height:52px;
  background:var(--primary);
  border-radius:50%;
  display:flex;align-items:center;justify-content:center;
  cursor:pointer;font-size:24px;color:#000;font-weight:800;
  box-shadow:0 6px 20px rgba(0,208,156,0.45);
  margin:0 4px;transition:transform 0.15s;
  border:none;
  flex-direction:column;
}
.nav-fab:active{transform:scale(0.93);}

/* ── PAGE ── */
.page{padding:20px 20px 8px;animation:pageIn 0.22s ease-out;}
@keyframes pageIn{from{opacity:0;transform:translateY(8px);}to{opacity:1;transform:translateY(0);}}

/* ── SECTION HEADER ── */
.sec-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;}
.sec-title{font-family:'Outfit',sans-serif;font-size:18px;font-weight:700;color:var(--text-1);}
.sec-badge{
  background:var(--primary-dim);color:var(--primary);
  border:1px solid var(--primary-bdr);font-size:11px;font-weight:700;
  padding:3px 10px;border-radius:999px;font-family:'Outfit',sans-serif;
}

/* ── STAT GRID ── */
.stat-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px;}
.stat-card{
  background:var(--surface);border:1px solid var(--border);
  border-radius:20px;padding:16px;position:relative;overflow:hidden;
  box-shadow:var(--card-shadow);transition:background 0.3s,transform 0.13s;
  cursor:default;
}
.stat-card.clickable{cursor:pointer;}
.stat-card.clickable:active{transform:scale(0.97);}
.stat-card.hero{background:var(--stat-hero-bg);border-color:transparent;box-shadow:var(--primary-glow),var(--card-shadow);}
.stat-card.gold-card{background:var(--stat-gold-bg);border-color:transparent;box-shadow:0 0 20px rgba(245,166,35,0.22),var(--card-shadow);}
.stat-icon{font-size:20px;margin-bottom:8px;}
.stat-val{font-family:'Outfit',sans-serif;font-size:26px;font-weight:800;color:var(--text-1);line-height:1;margin-bottom:4px;}
.stat-card.hero .stat-val,.stat-card.gold-card .stat-val{color:var(--stat-hero-txt);}
.stat-lbl{font-size:11px;font-weight:600;color:var(--text-2);text-transform:uppercase;letter-spacing:0.8px;}
.stat-card.hero .stat-lbl,.stat-card.gold-card .stat-lbl{color:var(--stat-hero-lbl);}
.stat-card-arrow{position:absolute;bottom:14px;right:14px;font-size:18px;opacity:0.4;}
.stat-card.hero .stat-card-arrow,.stat-card.gold-card .stat-card-arrow{opacity:0.5;color:#000;}

/* ── PROGRESS CARD ── */
.prog-card{
  background:var(--surface);border:1px solid var(--border);
  border-radius:20px;padding:18px;margin-bottom:12px;
  box-shadow:var(--card-shadow);transition:background 0.3s;
}
.prog-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;}
.prog-title{font-family:'Outfit',sans-serif;font-size:14px;font-weight:600;color:var(--text-1);display:flex;align-items:center;gap:8px;}
.prog-count{font-size:13px;font-weight:700;color:var(--primary);font-family:'Outfit',sans-serif;}
.prog-track{background:var(--prog-track);border-radius:999px;height:8px;overflow:hidden;}
.prog-fill{height:100%;border-radius:999px;background:linear-gradient(90deg,var(--primary),#00F5B8);transition:width 0.7s cubic-bezier(0.34,1.56,0.64,1);}
.prog-fill.gold{background:linear-gradient(90deg,var(--gold),#FFCA62);}
.prog-sub{font-size:11px;color:var(--text-3);margin-top:8px;font-weight:500;}

/* ── ANIMAL CARD ── */
.animal-card{
  background:var(--surface);border:1px solid var(--border);border-radius:20px;
  margin-bottom:12px;overflow:hidden;cursor:pointer;
  transition:transform 0.13s,box-shadow 0.13s;box-shadow:var(--card-shadow);
}
.animal-card:active{transform:scale(0.98);}
.animal-card-body{padding:16px 18px;display:flex;align-items:center;gap:14px;}
.animal-emoji-wrap{
  width:56px;height:56px;background:var(--surface-2);border:1px solid var(--border);
  border-radius:16px;display:flex;align-items:center;justify-content:center;
  font-size:28px;flex-shrink:0;
}
.animal-info{flex:1;min-width:0;}
.animal-name{font-family:'Outfit',sans-serif;font-size:16px;font-weight:700;color:var(--text-1);margin-bottom:3px;}
.animal-meta{font-size:12px;color:var(--text-2);font-weight:500;}
.animal-per-share{font-size:13px;font-weight:700;color:var(--primary);margin-top:2px;font-family:'Outfit',sans-serif;}
.animal-progress{height:3px;background:var(--prog-track);}
.animal-progress-fill{height:100%;background:linear-gradient(90deg,var(--primary),#00F5B8);transition:width 0.6s;}

/* ── SHARIK CARD ── */
.sharik-card{
  background:var(--surface);border:1px solid var(--border);border-radius:20px;
  margin-bottom:10px;padding:14px 16px;
  display:flex;align-items:center;gap:12px;
  cursor:pointer;transition:transform 0.13s;box-shadow:var(--card-shadow);
}
.sharik-card:active{transform:scale(0.98);}
.avatar{
  width:46px;height:46px;border-radius:50%;flex-shrink:0;
  display:flex;align-items:center;justify-content:center;
  font-family:'Outfit',sans-serif;font-size:17px;font-weight:800;color:#fff;
}
.sharik-name{font-family:'Outfit',sans-serif;font-size:15px;font-weight:700;color:var(--text-1);}
.sharik-sub{font-size:12px;color:var(--text-2);margin-top:2px;}
.sharik-req{font-size:11px;color:var(--gold);margin-top:3px;font-weight:600;}
.sharik-right{display:flex;flex-direction:column;align-items:flex-end;gap:5px;flex-shrink:0;}
.sharik-del-btn{
  width:30px;height:30px;border-radius:8px;
  background:var(--red-dim);border:1px solid rgba(255,92,92,0.2);
  color:var(--red);display:flex;align-items:center;justify-content:center;
  font-size:14px;cursor:pointer;transition:all 0.15s;flex-shrink:0;
}
.sharik-del-btn:active{transform:scale(0.9);}

/* ── BADGES ── */
.badge{
  font-size:10px;font-weight:700;padding:3px 9px;
  border-radius:999px;text-transform:uppercase;letter-spacing:0.6px;
  font-family:'DM Sans',sans-serif;
}
.badge-paid   {background:rgba(0,208,156,0.15);color:var(--primary);border:1px solid rgba(0,208,156,0.25);}
.badge-pending{background:var(--red-dim);color:var(--red);border:1px solid rgba(255,92,92,0.25);}
.badge-partial{background:var(--blue-dim);color:var(--blue);border:1px solid rgba(74,144,226,0.25);}
.delivery-tag{font-size:10px;font-weight:700;color:var(--text-3);}
.delivery-tag.done{color:var(--primary);}

/* ── PART CARD ── */
.part-card{
  background:var(--surface);border:1px solid var(--border);border-radius:16px;
  margin-bottom:10px;overflow:hidden;transition:border-color 0.2s;
}
.part-card.open{border-color:var(--primary-bdr);}
.part-header{padding:14px 16px;display:flex;align-items:center;gap:12px;cursor:pointer;}
.part-icon-wrap{
  width:38px;height:38px;background:var(--primary-dim);
  border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0;
}
.part-name{font-family:'Outfit',sans-serif;font-size:14px;font-weight:600;color:var(--text-1);}
.part-kg{font-size:12px;color:var(--text-2);margin-top:1px;}
.part-per{
  background:var(--primary-dim);color:var(--primary);border:1px solid var(--primary-bdr);
  border-radius:999px;font-size:11px;font-weight:700;padding:3px 10px;
  font-family:'Outfit',sans-serif;
}
.part-chevron{color:var(--text-3);font-size:13px;margin-left:4px;transition:transform 0.2s;}
.part-chevron.open{transform:rotate(180deg);color:var(--primary);}
.part-body{padding:0 16px 16px;border-top:1px solid var(--border);}

/* ── TABS ── */
.tab-bar{
  display:flex;gap:6px;background:var(--surface-2);
  border-radius:16px;padding:5px;margin-bottom:16px;
}
.tab{
  flex:1;padding:9px 6px;text-align:center;border-radius:12px;font-size:12px;font-weight:600;
  cursor:pointer;transition:all 0.2s;color:var(--text-2);font-family:'DM Sans',sans-serif;white-space:nowrap;
}
.tab.active{background:var(--surface-3);color:var(--primary);font-weight:700;box-shadow:0 1px 4px rgba(0,0,0,0.15);}

/* ── FORMS ── */
.form-group{margin-bottom:14px;}
.form-label{
  display:block;font-size:11px;font-weight:700;color:var(--text-2);
  text-transform:uppercase;letter-spacing:0.8px;margin-bottom:7px;
}
.form-input{
  width:100%;padding:13px 15px;background:var(--input-bg);
  border:1.5px solid var(--input-bdr);border-radius:12px;
  color:var(--text-1);font-family:'DM Sans',sans-serif;font-size:15px;
  outline:none;transition:border-color 0.2s;
}
.form-input:focus{border-color:var(--primary);}
.form-input::placeholder{color:var(--text-3);}
.form-select{
  width:100%;padding:13px 15px;background:var(--input-bg);
  border:1.5px solid var(--input-bdr);border-radius:12px;
  color:var(--text-1);font-family:'DM Sans',sans-serif;font-size:15px;
  outline:none;appearance:none;cursor:pointer;
}
.input-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;}

/* ── BUTTONS ── */
.btn{
  border:none;border-radius:12px;cursor:pointer;
  font-family:'DM Sans',sans-serif;font-weight:700;
  display:flex;align-items:center;justify-content:center;gap:6px;
  transition:all 0.13s;-webkit-tap-highlight-color:transparent;font-size:14px;
}
.btn:active{transform:scale(0.96);}
.btn-primary{
  background:var(--primary);color:#000;padding:14px 20px;width:100%;font-size:15px;
  border-radius:16px;box-shadow:0 4px 16px rgba(0,208,156,0.30);
  font-family:'Outfit',sans-serif;font-weight:700;
}
.btn-surface{background:var(--surface-2);color:var(--text-1);border:1px solid var(--border);padding:12px 16px;border-radius:16px;}
.btn-ghost  {background:var(--primary-dim);color:var(--primary);border:1px solid var(--primary-bdr);padding:12px 16px;border-radius:16px;font-family:'Outfit',sans-serif;font-weight:700;}
.btn-danger {background:var(--red-dim);color:var(--red);border:1px solid rgba(255,92,92,0.25);padding:10px 14px;border-radius:12px;}
.btn-gold   {background:linear-gradient(135deg,#F5A623,#E8921A);color:#000;border-radius:16px;padding:14px 20px;font-family:'Outfit',sans-serif;font-weight:700;}
.btn-sm     {padding:8px 14px;font-size:12px;border-radius:10px;}
.btn-row    {display:flex;gap:10px;}

/* ── RECEIPT ── */
.receipt{
  background:var(--receipt-bg);border:1px solid var(--receipt-bdr);
  border-radius:20px;padding:24px;text-align:center;
  position:relative;overflow:hidden;margin-bottom:20px;
  box-shadow:0 8px 32px rgba(0,0,0,0.3),var(--primary-glow);
}
[data-theme="light"] .receipt{box-shadow:0 8px 32px rgba(0,120,80,0.15);}
.receipt::before{
  content:'☽';position:absolute;top:-10px;right:8px;
  font-size:90px;opacity:0.07;color:var(--primary);pointer-events:none;
}
.receipt-event{font-size:11px;color:var(--text-3);text-transform:uppercase;letter-spacing:1.5px;margin-bottom:8px;}
.receipt-name{font-family:'Outfit',sans-serif;font-size:26px;font-weight:800;color:var(--text-1);margin-bottom:4px;}
.receipt-animal{font-size:13px;color:var(--primary);font-weight:600;margin-bottom:20px;}
.receipt-divider{border:none;border-top:1px solid var(--border-2);margin:16px 0;}
.receipt-row{display:flex;align-items:center;justify-content:space-between;padding:9px 0;}
.receipt-row-left{display:flex;align-items:center;gap:10px;font-size:14px;color:var(--text-2);font-weight:500;}
.receipt-row-kg{font-family:'Outfit',sans-serif;font-size:16px;font-weight:700;color:var(--text-1);}
.receipt-total-block{
  background:var(--primary-dim);border:1px solid var(--primary-bdr);
  border-radius:16px;padding:16px;margin-top:16px;text-align:center;
}
.receipt-total-lbl{font-size:11px;color:var(--primary);text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;opacity:0.8;}
.receipt-total-val{font-family:'Outfit',sans-serif;font-size:36px;font-weight:900;color:var(--primary);line-height:1;}
.receipt-total-unit{font-size:16px;font-weight:600;opacity:0.7;}

/* ── MODAL ── */
.overlay{
  position:fixed;inset:0;background:rgba(0,0,0,0.6);
  backdrop-filter:blur(4px);z-index:300;
  display:flex;align-items:flex-end;justify-content:center;
  animation:overlayIn 0.2s ease;
}
@keyframes overlayIn{from{opacity:0;}to{opacity:1;}}
.modal{
  background:var(--surface);border:1px solid var(--border-2);
  border-radius:24px 24px 0 0;
  width:100%;max-width:430px;max-height:93dvh;overflow-y:auto;
  padding:20px 20px 32px;
  animation:modalUp 0.3s cubic-bezier(0.34,1.56,0.64,1);
  transition:background 0.3s;
}
@keyframes modalUp{from{transform:translateY(100%);}to{transform:translateY(0);}}
.modal-handle{width:36px;height:4px;background:var(--border-2);border-radius:999px;margin:0 auto 20px;}
.modal-title{font-family:'Outfit',sans-serif;font-size:22px;font-weight:800;color:var(--text-1);margin-bottom:20px;}

/* ── CHECKLIST ── */
.check-item{display:flex;align-items:flex-start;gap:12px;padding:12px 0;border-bottom:1px solid var(--border);cursor:pointer;}
.check-item:last-child{border-bottom:none;}
.check-box{
  width:22px;height:22px;border-radius:8px;border:2px solid var(--border-2);
  display:flex;align-items:center;justify-content:center;
  font-size:12px;flex-shrink:0;margin-top:1px;transition:all 0.2s;
}
.check-box.on{background:var(--primary);border-color:var(--primary);color:#000;box-shadow:0 2px 8px rgba(0,208,156,0.3);}
.check-label{font-size:13px;color:var(--text-2);line-height:1.5;}
.check-label.on{color:var(--text-1);}

/* ── ESTIMATOR ── */
.est-result{
  background:var(--surface-2);border:1px solid var(--primary-bdr);
  border-radius:20px;padding:18px;margin-top:16px;box-shadow:var(--primary-glow);
}
.est-row{display:flex;align-items:center;justify-content:space-between;padding:10px 0;border-bottom:1px solid var(--border);}
.est-row:last-child{border-bottom:none;}
.est-lbl{display:flex;align-items:center;gap:8px;font-size:14px;color:var(--text-2);}
.est-val{font-family:'Outfit',sans-serif;font-size:15px;font-weight:700;color:var(--primary);}

/* ── TYPE SELECTOR ── */
.type-grid{display:flex;gap:8px;flex-wrap:wrap;}
.type-btn{
  padding:10px 14px;background:var(--surface-3);border:1.5px solid var(--border);
  border-radius:12px;color:var(--text-2);font-size:13px;font-weight:700;
  cursor:pointer;font-family:'DM Sans',sans-serif;transition:all 0.15s;
}
.type-btn.sel{background:var(--primary-dim);border-color:var(--primary-bdr);color:var(--primary);}

/* ── EVENT CARD ── */
.event-card{
  background:var(--surface);border:1px solid var(--border);border-radius:20px;
  margin-bottom:12px;padding:18px;cursor:pointer;transition:all 0.15s;
  box-shadow:var(--card-shadow);
}
.event-card.active-event{border-color:var(--primary-bdr);box-shadow:var(--primary-glow),var(--card-shadow);}
.event-card:active{transform:scale(0.98);}
.event-name{font-family:'Outfit',sans-serif;font-size:17px;font-weight:700;color:var(--text-1);margin-bottom:6px;}
.event-meta{font-size:12px;color:var(--text-2);}

/* ── INFO GRID ── */
.info-grid{background:var(--surface-2);border-radius:16px;padding:14px;margin-bottom:14px;display:grid;grid-template-columns:1fr 1fr;gap:12px;}
.info-lbl{font-size:10px;color:var(--text-3);text-transform:uppercase;letter-spacing:0.8px;font-weight:700;margin-bottom:3px;}
.info-val{font-size:13px;font-weight:700;color:var(--text-1);}

/* ── DELIVERY TOGGLE ── */
.delivery-toggle{display:flex;gap:8px;}
.del-btn{
  flex:1;padding:10px 6px;border:1.5px solid var(--border);border-radius:12px;
  background:var(--surface-2);color:var(--text-2);font-size:11px;font-weight:700;
  cursor:pointer;font-family:'DM Sans',sans-serif;transition:all 0.15s;text-align:center;
}
.del-btn.on{border-color:var(--primary-bdr);background:var(--primary-dim);color:var(--primary);}

/* ── BACK BUTTON ── */
.back-btn{
  display:inline-flex;align-items:center;gap:6px;
  background:var(--surface-2);border:1px solid var(--border);
  color:var(--text-2);font-size:13px;font-weight:600;
  padding:8px 14px;border-radius:12px;cursor:pointer;margin-bottom:16px;
  font-family:'DM Sans',sans-serif;
}
.back-btn:active{transform:scale(0.96);}

/* ── ANIMAL DETAIL HEADER ── */
.animal-detail-header{
  background:var(--surface);border-bottom:1px solid var(--border);
  padding:16px 20px 20px;flex-shrink:0;transition:background 0.3s;
}
.animal-detail-stats{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin-top:16px;}
.ads-cell{
  background:var(--surface-2);border:1px solid var(--border);
  border-radius:12px;padding:10px 8px;text-align:center;
}
.ads-val{font-family:'Outfit',sans-serif;font-size:16px;font-weight:800;color:var(--primary);}
.ads-lbl{font-size:10px;color:var(--text-3);font-weight:600;text-transform:uppercase;letter-spacing:0.5px;margin-top:2px;}

/* ── BISMILLAH ── */
.bismillah{
  text-align:center;padding:14px 16px;
  background:var(--primary-dim);border:1px solid var(--primary-bdr);
  border-radius:16px;margin-bottom:16px;
  font-family:'Amiri',serif;font-size:20px;color:var(--primary);letter-spacing:2px;
}

/* ── EMPTY STATE ── */
.empty{text-align:center;padding:48px 24px;}
.empty-ico{font-size:52px;display:block;margin-bottom:14px;opacity:0.4;}
.empty-txt{font-size:14px;color:var(--text-3);font-weight:600;}

/* ── TOAST ── */
.toast{
  position:fixed;top:20px;left:50%;transform:translateX(-50%);
  background:var(--primary);color:#000;
  padding:11px 20px;border-radius:999px;
  font-size:13px;font-weight:700;z-index:9999;white-space:nowrap;
  box-shadow:0 4px 20px rgba(0,208,156,0.4);font-family:'Outfit',sans-serif;
  animation:toastPop 0.25s cubic-bezier(0.34,1.56,0.64,1),toastFade 0.3s ease 2.2s forwards;
}
@keyframes toastPop{from{opacity:0;transform:translateX(-50%) scale(0.85) translateY(-8px);}to{opacity:1;transform:translateX(-50%) scale(1) translateY(0);}}
@keyframes toastFade{to{opacity:0;transform:translateX(-50%) translateY(-10px);}}
`;

/* ═══════════════════════════════════════════════════════════════════════════
   TOAST
═══════════════════════════════════════════════════════════════════════════ */
function Toast({ msg }) {
  if (!msg) return null;
  return <div className="toast">{msg}</div>;
}

/* ═══════════════════════════════════════════════════════════════════════════
   HOME SCREEN
═══════════════════════════════════════════════════════════════════════════ */
function HomeScreen({ state, onNav }) {
  const event = state.events.find(e => e.id === state.activeEventId);
  if (!event) return (
    <div className="page">
      <div className="empty">
        <span className="empty-ico">🌙</span>
        <div className="empty-txt">Create your first Qurbani event to begin</div>
        <div style={{ marginTop: 20 }}>
          <button className="btn btn-primary" onClick={() => onNav("events")}>Create Event</button>
        </div>
      </div>
    </div>
  );

  const allS   = event.animals.flatMap(a => a.shareholders);
  const totalKg= event.animals.reduce((s, a) => s + a.parts.reduce((s2, p) => s2 + Number(p.totalKg), 0), 0);
  const paidCt = allS.filter(s => s.paymentStatus === "paid").length;
  const delCt  = allS.filter(s => s.deliveryStatus !== "pending").length;

  return (
    <div className="page" style={{ paddingBottom: 8 }}>
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 12, color: "var(--text-3)", fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase", marginBottom: 4 }}>ASSALAMU ALAYKUM</div>
        <div style={{ fontFamily: "Outfit,sans-serif", fontSize: 24, fontWeight: 800, color: "var(--text-1)" }}>Qurbani Dashboard</div>
      </div>

      {/* Stat Grid — Animals & Shariks are clickable */}
      <div className="stat-grid">
        <div className="stat-card hero clickable" onClick={() => onNav("animals")}>
          <div className="stat-icon">🐄</div>
          <div className="stat-val">{event.animals.length}</div>
          <div className="stat-lbl">Animals</div>
          <div className="stat-card-arrow">›</div>
        </div>
        <div className="stat-card gold-card clickable" onClick={() => onNav("shariks")}>
          <div className="stat-icon">👥</div>
          <div className="stat-val">{allS.length}</div>
          <div className="stat-lbl">Shariks</div>
          <div className="stat-card-arrow">›</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🥩</div>
          <div className="stat-val" style={{ color: "var(--primary)", fontSize: 22 }}>{totalKg.toFixed(0)}<span style={{ fontSize: 13, color: "var(--text-3)", fontWeight: 600 }}>kg</span></div>
          <div className="stat-lbl">Total Meat</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">💳</div>
          <div className="stat-val" style={{ color: "var(--gold)", fontSize: 22 }}>{allS.length ? Math.round(paidCt / allS.length * 100) : 0}<span style={{ fontSize: 13, color: "var(--text-3)", fontWeight: 600 }}>%</span></div>
          <div className="stat-lbl">Paid</div>
        </div>
      </div>

      {/* Distribution Progress */}
      <div className="prog-card" style={{ marginBottom: 12 }}>
        <div className="prog-header">
          <div className="prog-title">🚚 Distribution</div>
          <div className="prog-count">{delCt}/{allS.length}</div>
        </div>
        <div className="prog-track">
          <div className="prog-fill" style={{ width: allS.length ? `${delCt / allS.length * 100}%` : "0%" }} />
        </div>
        <div className="prog-sub">{delCt} done · {allS.length - delCt} pending</div>
      </div>

      {/* Payment Progress */}
      <div className="prog-card" style={{ marginBottom: 20 }}>
        <div className="prog-header">
          <div className="prog-title">💰 Payments</div>
          <div className="prog-count" style={{ color: "var(--gold)" }}>{paidCt}/{allS.length} paid</div>
        </div>
        <div className="prog-track">
          <div className="prog-fill gold" style={{ width: allS.length ? `${paidCt / allS.length * 100}%` : "0%" }} />
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap" }}>
          {["paid", "pending", "partial"].map(st => {
            const ct = allS.filter(s => s.paymentStatus === st).length;
            return ct > 0 ? <span key={st} className={`badge badge-${st}`}>{ct} {st}</span> : null;
          })}
        </div>
      </div>

      {/* Animals overview */}
      <div className="sec-header">
        <div className="sec-title">Animals</div>
        <span className="sec-badge">{event.animals.length}</span>
      </div>
      {event.animals.map(animal => {
        const kg = animal.parts.reduce((s, p) => s + Number(p.totalKg), 0);
        const ps = animal.shareholders.length > 0 ? kg / animal.shareholders.length : 0;
        return (
          <div className="animal-card" key={animal.id} onClick={() => onNav("animalDetail", animal.id)}>
            <div className="animal-card-body">
              <div className="animal-emoji-wrap">{ANIMAL_ICONS[animal.type] || "🐄"}</div>
              <div className="animal-info">
                <div className="animal-name">{animal.name}</div>
                <div className="animal-meta">{animal.shareholders.length} shareholders · {kg.toFixed(1)} kg</div>
                <div className="animal-per-share">≈ {ps.toFixed(2)} kg / share</div>
              </div>
              <div style={{ fontSize: 20, color: "var(--text-3)" }}>›</div>
            </div>
            <div className="animal-progress">
              <div className="animal-progress-fill" style={{ width: animal.shareholders.length ? `${(animal.shareholders.filter(s => s.deliveryStatus !== "pending").length / animal.shareholders.length) * 100}%` : "0%" }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   ANIMALS SCREEN
═══════════════════════════════════════════════════════════════════════════ */
function AnimalsScreen({ state, onNav, onAddAnimal }) {
  const event = state.events.find(e => e.id === state.activeEventId);
  if (!event) return <div className="page"><div className="empty"><span className="empty-ico">🐄</span><div className="empty-txt">No event selected</div></div></div>;
  return (
    <div className="page">
      <div className="sec-header">
        <div className="sec-title">Animals</div>
        <button className="btn btn-ghost btn-sm" onClick={onAddAnimal}>＋ Add</button>
      </div>
      {event.animals.length === 0 && <div className="empty"><span className="empty-ico">🐄</span><div className="empty-txt">No animals yet. Tap ＋ to add one.</div></div>}
      {event.animals.map(animal => {
        const kg = animal.parts.reduce((s, p) => s + Number(p.totalKg), 0);
        const ps = animal.shareholders.length > 0 ? kg / animal.shareholders.length : 0;
        const delCt = animal.shareholders.filter(s => s.deliveryStatus !== "pending").length;
        return (
          <div className="animal-card" key={animal.id} onClick={() => onNav("animalDetail", animal.id)}>
            <div className="animal-card-body">
              <div className="animal-emoji-wrap">{ANIMAL_ICONS[animal.type] || "🐄"}</div>
              <div className="animal-info">
                <div className="animal-name">{animal.name}</div>
                <div className="animal-meta">{animal.shareholders.length} shareholders · {kg.toFixed(1)} kg</div>
                <div className="animal-per-share">≈ {ps.toFixed(2)} kg/share · {delCt}/{animal.shareholders.length} delivered</div>
              </div>
              <div style={{ fontSize: 20, color: "var(--text-3)" }}>›</div>
            </div>
            <div className="animal-progress">
              <div className="animal-progress-fill" style={{ width: animal.shareholders.length ? `${delCt / animal.shareholders.length * 100}%` : "0%" }} />
            </div>
          </div>
        );
      })}
      <button className="btn btn-ghost" style={{ width: "100%", marginTop: 8 }} onClick={onAddAnimal}>＋ Add Animal</button>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   ANIMAL DETAIL SCREEN
═══════════════════════════════════════════════════════════════════════════ */
function AnimalDetail({ animal, eventName, onBack, onUpdate, toast }) {
  const [tab, setTab]           = useState("parts");
  const [openPart, setOpenPart] = useState(null);
  const [showAddPart, setAddPart] = useState(false);
  const [newPart, setNewPart]   = useState({ name: "", totalKg: "" });
  const [showAddS, setAddS]     = useState(false);
  const [selSharik, setSelSharik] = useState(null);

  const kg = animal.parts.reduce((s, p) => s + Number(p.totalKg), 0);
  const ps = animal.shareholders.length > 0 ? kg / animal.shareholders.length : 0;
  const cl = animal.checklist || CHECKLIST.map(() => false);

  const upPart   = (id, k, v) => onUpdate({ ...animal, parts: animal.parts.map(p => p.id === id ? { ...p, [k]: v } : p) });
  const delPart  = id => onUpdate({ ...animal, parts: animal.parts.filter(p => p.id !== id) });
  const addPart  = () => {
    if (!newPart.name || !newPart.totalKg) return;
    onUpdate({ ...animal, parts: [...animal.parts, { id: mkId(), name: newPart.name, totalKg: Number(newPart.totalKg) }] });
    setNewPart({ name: "", totalKg: "" }); setAddPart(false); toast("Part added ✓");
  };
  const upSharik  = s  => onUpdate({ ...animal, shareholders: animal.shareholders.map(sh => sh.id === s.id ? s : sh) });
  const delSharik = id => {
    onUpdate({ ...animal, shareholders: animal.shareholders.filter(s => s.id !== id) });
    setSelSharik(null); toast("Sharik removed");
  };
  const toggleCl  = i  => { const nc = [...cl]; nc[i] = !nc[i]; onUpdate({ ...animal, checklist: nc }); };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100dvh", overflow: "hidden" }}>
      <div className="animal-detail-header">
        <button className="back-btn" onClick={onBack}>← Back</button>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ fontSize: 38, background: "var(--surface-3)", borderRadius: 16, padding: "10px 12px" }}>{ANIMAL_ICONS[animal.type] || "🐄"}</div>
          <div>
            <div style={{ fontFamily: "Outfit,sans-serif", fontSize: 20, fontWeight: 800, color: "var(--text-1)" }}>{animal.name}</div>
            <div style={{ fontSize: 12, color: "var(--text-3)", marginTop: 3 }}>{eventName}{animal.liveWeight ? ` · ${animal.liveWeight}kg live` : ""}</div>
          </div>
        </div>
        <div className="animal-detail-stats">
          {[[`${kg.toFixed(1)}kg`, "Total"], [`${ps.toFixed(2)}kg`, "Per Share"], [animal.shareholders.length, "Shariks"]].map(([v, l]) => (
            <div className="ads-cell" key={l}><div className="ads-val">{v}</div><div className="ads-lbl">{l}</div></div>
          ))}
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "16px 16px 24px" }}>
        <div className="tab-bar">
          {[["parts", "🥩 Parts"], ["shariks", "👥 Shariks"], ["checklist", "✅ Checklist"]].map(([k, lbl]) => (
            <div key={k} className={`tab ${tab === k ? "active" : ""}`} onClick={() => setTab(k)}>{lbl}</div>
          ))}
        </div>

        {/* PARTS TAB */}
        {tab === "parts" && <>
          {animal.parts.map(part => (
            <div className={`part-card ${openPart === part.id ? "open" : ""}`} key={part.id}>
              <div className="part-header" onClick={() => setOpenPart(openPart === part.id ? null : part.id)}>
                <div className="part-icon-wrap">{PART_ICON(part.name)}</div>
                <div style={{ flex: 1 }}>
                  <div className="part-name">{part.name}</div>
                  <div className="part-kg">{Number(part.totalKg).toFixed(2)} kg total</div>
                </div>
                <div className="part-per">{ps > 0 ? (Number(part.totalKg) / animal.shareholders.length).toFixed(2) : "0.00"}/share</div>
                <div className={`part-chevron ${openPart === part.id ? "open" : ""}`}>▼</div>
              </div>
              {openPart === part.id && (
                <div className="part-body">
                  <div className="form-group" style={{ marginTop: 12, marginBottom: 10 }}>
                    <label className="form-label">Total Amount (kg)</label>
                    <input className="form-input" type="number" value={part.totalKg} onChange={e => upPart(part.id, "totalKg", e.target.value)} placeholder="0.00" />
                  </div>
                  <div className="btn-row">
                    <button className="btn btn-ghost" style={{ flex: 1 }} onClick={() => { setOpenPart(null); toast("Saved ✓"); }}>✓ Save</button>
                    <button className="btn btn-danger btn-sm" onClick={() => delPart(part.id)}>🗑 Delete</button>
                  </div>
                </div>
              )}
            </div>
          ))}
          {showAddPart ? (
            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 20, padding: 16, marginTop: 8 }}>
              <div className="form-group">
                <label className="form-label">Part Name</label>
                <input className="form-input" value={newPart.name} onChange={e => setNewPart({ ...newPart, name: e.target.value })} placeholder="e.g. Heart, Kidney..." />
              </div>
              <div className="form-group">
                <label className="form-label">Total (kg)</label>
                <input className="form-input" type="number" value={newPart.totalKg} onChange={e => setNewPart({ ...newPart, totalKg: e.target.value })} placeholder="0.00" />
              </div>
              <div className="btn-row">
                <button className="btn btn-primary" style={{ flex: 1 }} onClick={addPart}>Add Part</button>
                <button className="btn btn-surface" onClick={() => setAddPart(false)}>Cancel</button>
              </div>
            </div>
          ) : (
            <button className="btn btn-ghost" style={{ width: "100%", marginTop: 10 }} onClick={() => setAddPart(true)}>＋ Add Part</button>
          )}
        </>}

        {/* SHARIKS TAB */}
        {tab === "shariks" && <>
          {/* Add Sharik Button at top */}
          <button className="btn btn-primary" style={{ marginBottom: 14 }} onClick={() => setAddS(true)}>＋ Add New Sharik</button>

          {animal.shareholders.length === 0 && (
            <div className="empty"><span className="empty-ico">👥</span><div className="empty-txt">No shariks yet. Add the first one!</div></div>
          )}
          {animal.shareholders.map(s => (
            <div className="sharik-card" key={s.id} onClick={() => setSelSharik(s)}>
              <div className="avatar" style={{ background: avColor(s.name) }}>{initials(s.name)}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="sharik-name">{s.name}</div>
                <div className="sharik-sub">{s.phone || "No phone"}</div>
                {s.specialRequest && <div className="sharik-req">📝 {s.specialRequest}</div>}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div className="sharik-right">
                  <span className={`badge badge-${s.paymentStatus}`}>{s.paymentStatus}</span>
                  <span className={`delivery-tag ${s.deliveryStatus !== "pending" ? "done" : ""}`}>
                    {s.deliveryStatus === "delivered" ? "✅ Delivered" : s.deliveryStatus === "collected" ? "🏠 Collected" : "⏳ Pending"}
                  </span>
                </div>
                {/* Delete button — stops propagation so it doesn't open receipt */}
                <div className="sharik-del-btn" onClick={e => { e.stopPropagation(); if (window.confirm(`Remove ${s.name}?`)) delSharik(s.id); }}>🗑</div>
              </div>
            </div>
          ))}
        </>}

        {/* CHECKLIST TAB */}
        {tab === "checklist" && (
          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 20, padding: 18 }}>
            <div className="bismillah">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم</div>
            <div style={{ fontFamily: "Outfit,sans-serif", fontSize: 16, fontWeight: 700, color: "var(--text-1)", marginBottom: 4 }}>Islamic Compliance</div>
            <div style={{ fontSize: 12, color: "var(--text-3)", marginBottom: 16 }}>Verify all conditions before slaughter</div>
            {CHECKLIST.map((item, i) => (
              <div className="check-item" key={i} onClick={() => toggleCl(i)}>
                <div className={`check-box ${cl[i] ? "on" : ""}`}>{cl[i] ? "✓" : ""}</div>
                <div className={`check-label ${cl[i] ? "on" : ""}`}>{item}</div>
              </div>
            ))}
            <div style={{ marginTop: 14, fontSize: 13, color: "var(--primary)", fontWeight: 700, fontFamily: "Outfit,sans-serif" }}>
              {cl.filter(Boolean).length}/{CHECKLIST.length} conditions met
            </div>
          </div>
        )}
      </div>

      {showAddS && (
        <SharikModal
          onClose={() => setAddS(false)}
          onSave={s => { onUpdate({ ...animal, shareholders: [...animal.shareholders, s] }); setAddS(false); toast("Sharik added ✓"); }}
        />
      )}
      {selSharik && (
        <SharikDetailModal
          sharik={selSharik} animal={animal} eventName={eventName}
          onClose={() => setSelSharik(null)}
          onUpdate={s => { upSharik(s); setSelSharik(s); toast("Saved ✓"); }}
          onDelete={delSharik}
        />
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   SHARIK MODAL (Add / Edit)
═══════════════════════════════════════════════════════════════════════════ */
function SharikModal({ onClose, onSave, initial }) {
  const [f, setF] = useState(initial || { name: "", phone: "", shares: 1, paymentStatus: "pending", specialRequest: "", deliveryStatus: "pending" });
  const s = (k, v) => setF(p => ({ ...p, [k]: v }));
  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-handle" />
        <div className="modal-title">{initial ? "Edit Sharik" : "Add Sharik"}</div>
        <div className="form-group">
          <label className="form-label">Full Name *</label>
          <input className="form-input" value={f.name} onChange={e => s("name", e.target.value)} placeholder="e.g. Tanvir Ahmed" />
        </div>
        <div className="form-group">
          <label className="form-label">Phone Number</label>
          <input className="form-input" type="tel" value={f.phone} onChange={e => s("phone", e.target.value)} placeholder="0300-1234567" />
        </div>
        <div className="input-grid">
          <div className="form-group">
            <label className="form-label">Shares</label>
            <input className="form-input" type="number" min="1" value={f.shares} onChange={e => s("shares", Number(e.target.value))} />
          </div>
          <div className="form-group">
            <label className="form-label">Payment</label>
            <select className="form-select" value={f.paymentStatus} onChange={e => s("paymentStatus", e.target.value)}>
              <option value="pending">Pending</option>
              <option value="partial">Partial</option>
              <option value="paid">Paid</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Special Request</label>
          <input className="form-input" value={f.specialRequest} onChange={e => s("specialRequest", e.target.value)} placeholder="e.g. Less bone, extra liver..." />
        </div>
        <div className="btn-row">
          <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => f.name && onSave({ ...f, id: initial?.id || mkId() })}>
            {initial ? "Save Changes" : "Add Sharik"}
          </button>
          <button className="btn btn-surface" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   SHARIK DETAIL MODAL
═══════════════════════════════════════════════════════════════════════════ */
function SharikDetailModal({ sharik, animal, eventName, onClose, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);
  const count = animal.shareholders.length;
  const ps    = count > 0 ? animal.parts.reduce((s, p) => s + Number(p.totalKg), 0) / count : 0;

  const waText = () => {
    const parts = animal.parts.map(p => `${PART_ICON(p.name)} ${p.name}: *${(Number(p.totalKg) / count).toFixed(2)} kg*`).join("\n");
    return encodeURIComponent(
      `🌙 *Eid-ul-Adha — QurbaniTracker*\n\nAs-salamu alaykum *${sharik.name}*,\nYour Qurbani share from ${animal.name} is ready!\n\n📦 *Your Share:*\n${parts}\n\n📊 *Total: ${ps.toFixed(2)} kg*\n🚚 ${sharik.deliveryStatus === "delivered" ? "✅ Delivered" : sharik.deliveryStatus === "collected" ? "🏠 Collected" : "⏳ Pending"}\n\n_JazakAllah Khair 🤲_\n_Sent via QurbaniTracker_`
    );
  };

  if (editing) return <SharikModal initial={sharik} onClose={() => setEditing(false)} onSave={s => { onUpdate(s); setEditing(false); }} />;

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-handle" />
        <div className="receipt">
          <div className="receipt-event">{eventName}</div>
          <div className="receipt-name">{sharik.name}</div>
          <div className="receipt-animal">{animal.name} · {count} shariks</div>
          <hr className="receipt-divider" />
          {animal.parts.map(p => (
            <div className="receipt-row" key={p.id}>
              <div className="receipt-row-left"><span>{PART_ICON(p.name)}</span><span>{p.name}</span></div>
              <span className="receipt-row-kg">{(Number(p.totalKg) / count).toFixed(2)} kg</span>
            </div>
          ))}
          <div className="receipt-total-block">
            <div className="receipt-total-lbl">Total Share</div>
            <div className="receipt-total-val">{ps.toFixed(2)}<span className="receipt-total-unit"> kg</span></div>
          </div>
        </div>
        <div className="info-grid" style={{ marginBottom: 12 }}>
          {[["📞 Phone", sharik.phone || "—"], ["💳 Payment", sharik.paymentStatus], ["🚚 Delivery", sharik.deliveryStatus], ["📝 Request", sharik.specialRequest || "None"]].map(([l, v]) => (
            <div key={l}><div className="info-lbl">{l}</div><div className="info-val">{v}</div></div>
          ))}
        </div>
        <div style={{ marginBottom: 14 }}>
          <div className="form-label">Update Delivery</div>
          <div className="delivery-toggle">
            {["pending", "collected", "delivered"].map(s => (
              <button key={s} className={`del-btn ${sharik.deliveryStatus === s ? "on" : ""}`} onClick={() => onUpdate({ ...sharik, deliveryStatus: s })}>
                {s === "pending" ? "⏳ Pending" : s === "collected" ? "🏠 Collected" : "✅ Delivered"}
              </button>
            ))}
          </div>
        </div>
        <div className="btn-row" style={{ marginBottom: 8 }}>
          <button className="btn btn-gold" style={{ flex: 1 }} onClick={() => window.open(`https://wa.me/?text=${waText()}`, "_blank")}>📱 WhatsApp</button>
          <button className="btn btn-ghost" style={{ flex: 1 }} onClick={() => setEditing(true)}>✏️ Edit</button>
          <button className="btn btn-danger btn-sm" onClick={() => { if (window.confirm(`Remove ${sharik.name}?`)) onDelete(sharik.id); }}>🗑</button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   SHARIKS SCREEN (global view)
═══════════════════════════════════════════════════════════════════════════ */
function ShariksScreen({ state, onUpdate, toast }) {
  const [filter, setFilter] = useState("all");
  const [sel, setSel]       = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const event = state.events.find(e => e.id === state.activeEventId);
  if (!event) return <div className="page"><div className="empty"><span className="empty-ico">👥</span><div className="empty-txt">No event selected</div></div></div>;

  const allS = event.animals.flatMap(a => a.shareholders.map(s => ({ ...s, animal: a })));
  const filtered = filter === "all" ? allS : allS.filter(s => s.paymentStatus === filter || s.deliveryStatus === filter);

  // Delete from any animal
  const deleteSharik = (sharikId, animalId) => {
    onUpdate(prev => ({
      ...prev,
      events: prev.events.map(ev => ev.id !== prev.activeEventId ? ev : {
        ...ev,
        animals: ev.animals.map(a => a.id !== animalId ? a : {
          ...a, shareholders: a.shareholders.filter(sh => sh.id !== sharikId)
        })
      })
    }));
    setSel(null);
    toast("Sharik removed");
  };

  // Update sharik in any animal
  const updateSharik = (updated, animalId) => {
    onUpdate(prev => ({
      ...prev,
      events: prev.events.map(ev => ev.id !== prev.activeEventId ? ev : {
        ...ev,
        animals: ev.animals.map(a => a.id !== animalId ? a : {
          ...a, shareholders: a.shareholders.map(sh => sh.id === updated.id ? updated : sh)
        })
      })
    }));
  };

  // First animal to add shariks to (global add goes to first animal if only one)
  const firstAnimal = event.animals[0];

  return (
    <div className="page">
      <div className="sec-header">
        <div className="sec-title">All Shariks</div>
        <span className="sec-badge">{allS.length}</span>
      </div>

      {/* Add Sharik button */}
      {firstAnimal && (
        <button className="btn btn-primary" style={{ marginBottom: 14 }} onClick={() => setShowAdd(true)}>
          ＋ Add New Sharik
        </button>
      )}
      {!firstAnimal && (
        <div style={{ background: "var(--gold-dim)", border: "1px solid rgba(245,166,35,0.2)", borderRadius: 12, padding: "10px 14px", marginBottom: 14, fontSize: 12, color: "var(--gold)", fontWeight: 600 }}>
          ⚠️ Add an animal first before adding shariks
        </div>
      )}

      <div style={{ display: "flex", gap: 8, marginBottom: 14, overflowX: "auto" }}>
        {["all", "paid", "pending", "delivered"].map(f => (
          <div key={f} style={{ padding: "8px 14px", background: filter === f ? "var(--primary)" : "var(--surface)", border: "1px solid var(--border)", borderRadius: 999, fontSize: 12, fontWeight: 700, whiteSpace: "nowrap", cursor: "pointer", color: filter === f ? "#000" : "var(--text-2)", transition: "all 0.15s" }} onClick={() => setFilter(f)}>
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </div>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="empty"><span className="empty-ico">🔍</span><div className="empty-txt">No results</div></div>
      ) : filtered.map(s => {
        const kg = s.animal.parts.reduce((sum, p) => sum + Number(p.totalKg), 0);
        const ps = s.animal.shareholders.length > 0 ? kg / s.animal.shareholders.length : 0;
        return (
          <div className="sharik-card" key={s.id + s.animal.id} onClick={() => setSel({ sharik: s, animal: s.animal })}>
            <div className="avatar" style={{ background: avColor(s.name) }}>{initials(s.name)}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="sharik-name">{s.name}</div>
              <div className="sharik-sub">{s.animal.name} · {ps.toFixed(2)} kg share</div>
              {s.specialRequest && <div className="sharik-req">📝 {s.specialRequest}</div>}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div className="sharik-right">
                <span className={`badge badge-${s.paymentStatus}`}>{s.paymentStatus}</span>
                <span className={`delivery-tag ${s.deliveryStatus !== "pending" ? "done" : ""}`}>
                  {s.deliveryStatus === "delivered" ? "✅" : s.deliveryStatus === "collected" ? "🏠" : "⏳"}
                </span>
              </div>
              {/* Delete button with stopPropagation */}
              <div className="sharik-del-btn" onClick={e => { e.stopPropagation(); if (window.confirm(`Remove ${s.name}?`)) deleteSharik(s.id, s.animal.id); }}>🗑</div>
            </div>
          </div>
        );
      })}

      {sel && (
        <SharikDetailModal
          sharik={sel.sharik} animal={sel.animal} eventName={event.name}
          onClose={() => setSel(null)}
          onUpdate={updated => { updateSharik(updated, sel.animal.id); setSel({ ...sel, sharik: updated }); toast("Saved ✓"); }}
          onDelete={id => deleteSharik(id, sel.animal.id)}
        />
      )}

      {showAdd && firstAnimal && (
        <SharikModal
          onClose={() => setShowAdd(false)}
          onSave={s => {
            onUpdate(prev => ({
              ...prev,
              events: prev.events.map(ev => ev.id !== prev.activeEventId ? ev : {
                ...ev,
                animals: ev.animals.map(a => a.id !== firstAnimal.id ? a : { ...a, shareholders: [...a.shareholders, s] })
              })
            }));
            setShowAdd(false);
            toast("Sharik added ✓");
          }}
        />
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   EVENTS SCREEN
═══════════════════════════════════════════════════════════════════════════ */
function EventsScreen({ state, onSetActive, onAddEvent }) {
  const [showAdd, setShowAdd] = useState(false);
  const [name, setName]       = useState(`Eid-ul-Adha ${new Date().getFullYear()}`);
  return (
    <div className="page">
      <div className="sec-header">
        <div className="sec-title">History & Events</div>
        <button className="btn btn-ghost btn-sm" onClick={() => setShowAdd(true)}>＋ New</button>
      </div>
      {state.events.map(ev => {
        const total = ev.animals.reduce((s, a) => s + a.shareholders.length, 0);
        return (
          <div key={ev.id} className={`event-card ${ev.id === state.activeEventId ? "active-event" : ""}`} onClick={() => onSetActive(ev.id)}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
              <div className="event-name">{ev.id === state.activeEventId && <span style={{ color: "var(--primary)", marginRight: 6 }}>●</span>}{ev.name}</div>
              {ev.id === state.activeEventId && <span className="badge badge-paid">Active</span>}
            </div>
            <div className="event-meta">{ev.animals.length} animals · {total} shareholders</div>
          </div>
        );
      })}
      {showAdd && (
        <div className="overlay" onClick={() => setShowAdd(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-handle" />
            <div className="modal-title">New Event</div>
            <div className="form-group">
              <label className="form-label">Event Name</label>
              <input className="form-input" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Eid-ul-Adha 2026" />
            </div>
            <div className="btn-row">
              <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => { if (name) { onAddEvent(name); setShowAdd(false); } }}>Create</button>
              <button className="btn btn-surface" onClick={() => setShowAdd(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   ADD ANIMAL MODAL — auto-generates name from type
═══════════════════════════════════════════════════════════════════════════ */
function AddAnimalModal({ onClose, onAdd, existingAnimals }) {
  const [type, setType]     = useState("cow");
  const [name, setName]     = useState(autoAnimalName("cow", existingAnimals));
  const [weight, setWeight] = useState("");
  const [notes, setNotes]   = useState("");

  // When type changes, auto-update name unless user has manually edited it
  const [userEditedName, setUserEditedName] = useState(false);

  const handleTypeChange = (newType) => {
    setType(newType);
    if (!userEditedName) {
      setName(autoAnimalName(newType, existingAnimals));
    }
  };

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-handle" />
        <div className="modal-title">Add Animal</div>
        <div className="form-group">
          <label className="form-label">Type</label>
          <div className="type-grid">
            {Object.entries(ANIMAL_ICONS).map(([t, ic]) => (
              <button key={t} className={`type-btn ${type === t ? "sel" : ""}`} onClick={() => handleTypeChange(t)}>
                {ic} {ANIMAL_LABELS[t]}
              </button>
            ))}
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Animal Name</label>
          <input
            className="form-input"
            value={name}
            onChange={e => { setName(e.target.value); setUserEditedName(true); }}
            placeholder="e.g. Cow #1"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Live Weight (kg) — optional</label>
          <input className="form-input" type="number" value={weight} onChange={e => setWeight(e.target.value)} placeholder="e.g. 350" />
        </div>
        <div className="form-group">
          <label className="form-label">Notes</label>
          <input className="form-input" value={notes} onChange={e => setNotes(e.target.value)} placeholder="Farmer name, purchase info..." />
        </div>
        <div className="btn-row">
          <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => name && onAdd({
            id: mkId(), name, type, liveWeight: Number(weight) || 0, notes,
            parts: DEFAULT_PARTS(), shareholders: [], checklist: CHECKLIST.map(() => false)
          })}>
            Add Animal
          </button>
          <button className="btn btn-surface" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   WEIGHT ESTIMATOR SCREEN
═══════════════════════════════════════════════════════════════════════════ */
function EstimatorScreen({ onBack }) {
  const [type, setType] = useState("cow");
  const [lw, setLw]     = useState("");
  const res = useMemo(() => {
    if (!lw || !Number(lw)) return null;
    const r = YIELD[type], w = Number(lw);
    return {
      meat:  (w * r.meat).toFixed(1),
      bone:  (w * r.bone).toFixed(1),
      fat:   (w * r.fat).toFixed(1),
      offal: (w * r.offal).toFixed(1),
      total: (w * (r.meat + r.bone + r.fat + r.offal)).toFixed(1),
    };
  }, [type, lw]);

  return (
    <div className="page">
      <button className="back-btn" onClick={onBack}>← Back</button>
      <div style={{ fontFamily: "Outfit,sans-serif", fontSize: 24, fontWeight: 800, color: "var(--text-1)", marginBottom: 4 }}>⚖️ Weight Estimator</div>
      <div style={{ fontSize: 13, color: "var(--text-3)", marginBottom: 20 }}>Estimate yield from live weight</div>
      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 20, padding: 18, marginBottom: 16 }}>
        <div className="form-group">
          <label className="form-label">Animal Type</label>
          <div className="type-grid">
            {Object.entries(ANIMAL_ICONS).map(([t, ic]) => (
              <button key={t} className={`type-btn ${type === t ? "sel" : ""}`} onClick={() => setType(t)}>{ic} {ANIMAL_LABELS[t]}</button>
            ))}
          </div>
        </div>
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label">Live Weight (kg)</label>
          <input className="form-input" type="number" value={lw} onChange={e => setLw(e.target.value)} placeholder="e.g. 350" />
        </div>
      </div>
      {res && (
        <div className="est-result">
          <div style={{ fontFamily: "Outfit,sans-serif", fontSize: 16, fontWeight: 700, color: "var(--text-1)", marginBottom: 12 }}>Estimated Yield from {lw}kg {ANIMAL_ICONS[type]}</div>
          {[["🥩", "Solid Meat", res.meat], ["🦴", "Bone", res.bone], ["🧈", "Fat", res.fat], ["❤️", "Offal", res.offal]].map(([ic, l, v]) => (
            <div className="est-row" key={l}><div className="est-lbl"><span>{ic}</span>{l}</div><div className="est-val">{v} kg</div></div>
          ))}
          <div className="est-row">
            <div className="est-lbl" style={{ color: "var(--text-1)", fontWeight: 800 }}>📦 Total Usable</div>
            <div className="est-val" style={{ fontSize: 18 }}>{res.total} kg</div>
          </div>
          <div style={{ marginTop: 12, fontSize: 11, color: "var(--text-3)", background: "var(--surface-3)", borderRadius: 10, padding: "10px 12px", lineHeight: 1.5 }}>
            ℹ️ Average industry estimates. Actual yield varies by breed and technique.
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   BOTTOM NAV — Figma-inspired floating card design
═══════════════════════════════════════════════════════════════════════════ */
function BottomNav({ active, onNav, onAdd }) {
  // 5-slot design: Home | Animals | [FAB Add] | Shariks | Events
  const left  = [["home", "🏠", "Home"], ["animals", "🐄", "Animals"]];
  const right = [["shariks", "👥", "Shariks"], ["events", "🗓", "Events"]];

  return (
    <nav className="bottom-nav">
      {left.map(([id, ic, lbl]) => (
        <button key={id} className={`nav-item ${active === id ? "active" : ""}`} onClick={() => onNav(id)}>
          <div className="nav-icon-wrap">{ic}</div>
          <span className="nav-label">{lbl}</span>
        </button>
      ))}
      {/* Center FAB */}
      <button className="nav-fab" onClick={onAdd} title="Add Animal">
        <span style={{ fontSize: 22, fontWeight: 900, lineHeight: 1 }}>＋</span>
      </button>
      {right.map(([id, ic, lbl]) => (
        <button key={id} className={`nav-item ${active === id ? "active" : ""}`} onClick={() => onNav(id)}>
          <div className="nav-icon-wrap">{ic}</div>
          <span className="nav-label">{lbl}</span>
        </button>
      ))}
    </nav>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   ROOT APP
═══════════════════════════════════════════════════════════════════════════ */
export default function App() {
  const [state, setState]   = useState(() => { try { const d = localStorage.getItem("qt_v3"); return d ? JSON.parse(d) : INIT_DATA; } catch { return INIT_DATA; } });
  const [screen, setScreen] = useState("home");
  const [detailId, setDetailId] = useState(null);
  const [toast, setToast]   = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [theme, setTheme]   = useState(() => localStorage.getItem("qt_theme") || "dark");

  useEffect(() => {
    try { localStorage.setItem("qt_v3", JSON.stringify(state)); } catch {}
  }, [state]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("qt_theme", theme);
  }, [theme]);

  const showToast = msg => { setToast(msg); setTimeout(() => setToast(""), 2600); };
  const toggleTheme = () => setTheme(t => t === "dark" ? "light" : "dark");

  const nav = useCallback((s, param = null) => {
    setScreen(s);
    if (param !== null) setDetailId(param);
  }, []);

  const activeEvent = state.events.find(e => e.id === state.activeEventId);

  const updateAnimal = useCallback(updated => {
    setState(prev => ({
      ...prev,
      events: prev.events.map(ev => ev.id !== prev.activeEventId ? ev : {
        ...ev, animals: ev.animals.map(a => a.id === updated.id ? updated : a)
      })
    }));
  }, []);

  const addAnimal = animal => {
    setState(prev => ({
      ...prev,
      events: prev.events.map(ev => ev.id !== prev.activeEventId ? ev : {
        ...ev, animals: [...ev.animals, animal]
      })
    }));
    setShowAdd(false);
    showToast("Animal added ✓");
  };

  const addEvent = name => {
    const ev = { id: mkId(), name, year: new Date().getFullYear(), createdAt: new Date().toISOString(), animals: [] };
    setState(prev => ({ ...prev, events: [...prev.events, ev], activeEventId: ev.id }));
    showToast("Event created ✓");
  };

  const setActiveEvent = id => {
    setState(prev => ({ ...prev, activeEventId: id }));
    setScreen("home");
    showToast("Switched event ✓");
  };

  // Animal detail fullscreen
  if (screen === "animalDetail" && activeEvent) {
    const animal = activeEvent.animals.find(a => a.id === detailId);
    if (animal) return (
      <>
        <style>{buildCSS()}</style>
        <Toast msg={toast} />
        <AnimalDetail animal={animal} eventName={activeEvent.name} onBack={() => setScreen("animals")} onUpdate={updateAnimal} toast={showToast} />
      </>
    );
  }

  if (screen === "estimator") return (
    <>
      <style>{buildCSS()}</style>
      <div className="app">
        <div className="app-header">
          <div className="header-row">
            <div className="logo-wrap">
              <div className="logo-title">☽ QurbaniTracker</div>
              <div className="logo-sub">Eid-ul-Adha Management</div>
            </div>
            <div className="header-actions">
              <div className="theme-toggle" onClick={toggleTheme}>{theme === "dark" ? "☀️" : "🌙"}</div>
            </div>
          </div>
        </div>
        <div className="scroll-area"><EstimatorScreen onBack={() => setScreen("home")} /></div>
        <BottomNav active="home" onNav={nav} onAdd={() => setShowAdd(true)} />
      </div>
    </>
  );

  const TABS = ["home", "animals", "shariks", "events"];

  return (
    <>
      <style>{buildCSS()}</style>
      <Toast msg={toast} />
      <div className="app">
        {/* HEADER */}
        <div className="app-header">
          <div className="header-row">
            <div className="logo-wrap">
              <div className="logo-title">☽ QurbaniTracker</div>
              <div className="logo-sub">Eid-ul-Adha Management</div>
            </div>
            <div className="header-actions">
              <div className="icon-btn" onClick={() => setScreen("estimator")} title="Weight Estimator">⚖️</div>
              {/* Light/Dark toggle — top right */}
              <div className="theme-toggle" onClick={toggleTheme} title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}>
                {theme === "dark" ? "☀️" : "🌙"}
              </div>
            </div>
          </div>
          {activeEvent && (
            <div className="event-chip" onClick={() => setScreen("events")}>
              <div className="event-chip-dot" />
              <span className="event-chip-name">{activeEvent.name}</span>
              <span className="event-chip-arrow">▼</span>
            </div>
          )}
        </div>

        {/* SCREENS */}
        <div className="scroll-area">
          {screen === "home"    && <HomeScreen    state={state} onNav={(s, p) => { nav(s, p); }} />}
          {screen === "animals" && <AnimalsScreen state={state} onNav={nav} onAddAnimal={() => setShowAdd(true)} />}
          {screen === "shariks" && <ShariksScreen state={state} onUpdate={setState} toast={showToast} />}
          {screen === "events"  && <EventsScreen  state={state} onSetActive={setActiveEvent} onAddEvent={addEvent} />}
        </div>

        {/* BOTTOM NAV — floating card style */}
        <BottomNav
          active={TABS.includes(screen) ? screen : "home"}
          onNav={s => setScreen(s)}
          onAdd={() => setShowAdd(true)}
        />
      </div>

      {/* Add Animal Modal */}
      {showAdd && (
        <AddAnimalModal
          onClose={() => setShowAdd(false)}
          onAdd={addAnimal}
          existingAnimals={activeEvent?.animals || []}
        />
      )}
    </>
  );
}
