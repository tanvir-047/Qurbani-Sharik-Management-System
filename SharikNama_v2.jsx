import { useState, useEffect, useCallback, useMemo, useRef } from "react";

/* ═══════════════════════════════════════════════════════════════════════════
   DESIGN SYSTEM — Dark Navy + Emerald Teal (extracted from Figma Kit)
   ═══════════════════════════════════════════════════════════════════════════ */
const DS = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=DM+Sans:wght@300;400;500;600;700&family=Amiri:wght@400;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg:          #080C18;
    --surface:     #0F1628;
    --surface-2:   #151E35;
    --surface-3:   #1C2640;
    --surface-4:   #212E4A;
    --primary:     #00D09C;
    --primary-dk:  #00A87A;
    --primary-glow:rgba(0,208,156,0.18);
    --primary-dim: rgba(0,208,156,0.08);
    --primary-border:rgba(0,208,156,0.28);
    --text-1:      #FFFFFF;
    --text-2:      #8B9BB4;
    --text-3:      #3D4F6E;
    --border:      rgba(255,255,255,0.06);
    --border-2:    rgba(255,255,255,0.10);
    --gold:        #F5A623;
    --gold-dim:    rgba(245,166,35,0.12);
    --red:         #FF5C5C;
    --red-dim:     rgba(255,92,92,0.12);
    --blue:        #4A90E2;
    --blue-dim:    rgba(74,144,226,0.12);
    --r-xl:        20px;
    --r-lg:        16px;
    --r-md:        12px;
    --r-sm:        8px;
    --r-pill:      999px;
    --shadow-card: 0 2px 16px rgba(0,0,0,0.45);
    --shadow-lg:   0 20px 60px rgba(0,0,0,0.75);
    --glow:        0 0 24px rgba(0,208,156,0.20);
  }

  html, body, #root { height: 100%; }
  body {
    font-family: 'DM Sans', sans-serif;
    background: var(--bg);
    color: var(--text-1);
    -webkit-font-smoothing: antialiased;
    overflow: hidden;
  }

  /* ── SCROLLBAR ── */
  ::-webkit-scrollbar { width: 0; background: transparent; }

  /* ── APP SHELL ── */
  .app {
    max-width: 430px;
    height: 100dvh;
    margin: 0 auto;
    background: var(--bg);
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
  }

  /* ── SCROLL AREA ── */
  .scroll-area {
    flex: 1;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    overscroll-behavior: contain;
  }

  /* ── HEADER ── */
  .app-header {
    flex-shrink: 0;
    background: var(--surface);
    border-bottom: 1px solid var(--border);
    padding: 14px 20px 16px;
    position: relative;
    overflow: hidden;
  }
  .app-header::after {
    content: '☽';
    position: absolute;
    right: -8px; top: -12px;
    font-size: 72px;
    opacity: 0.04;
    pointer-events: none;
    color: var(--primary);
  }
  .header-row { display: flex; align-items: center; justify-content: space-between; }
  .logo-wrap { display: flex; flex-direction: column; }
  .logo-title {
    font-family: 'Outfit', sans-serif;
    font-size: 22px; font-weight: 800;
    color: var(--primary);
    letter-spacing: -0.3px;
    line-height: 1;
  }
  .logo-sub { font-size: 10px; color: var(--text-3); font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; margin-top: 3px; }
  .header-actions { display: flex; gap: 8px; }
  .icon-btn {
    width: 38px; height: 38px;
    background: var(--surface-2);
    border: 1px solid var(--border);
    border-radius: var(--r-md);
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; font-size: 17px;
    transition: all 0.15s;
  }
  .icon-btn:active { transform: scale(0.93); background: var(--surface-3); }

  .event-chip {
    margin-top: 12px;
    display: inline-flex; align-items: center; gap: 7px;
    background: var(--primary-dim);
    border: 1px solid var(--primary-border);
    border-radius: var(--r-pill);
    padding: 7px 14px; cursor: pointer;
    transition: all 0.15s;
  }
  .event-chip:active { background: rgba(0,208,156,0.14); }
  .event-chip-dot { width: 7px; height: 7px; background: var(--primary); border-radius: 50%; box-shadow: var(--glow); }
  .event-chip-name { font-size: 12px; font-weight: 700; color: var(--primary); font-family: 'Outfit', sans-serif; }
  .event-chip-arrow { font-size: 9px; color: var(--text-3); }

  /* ── BOTTOM NAV ── */
  .bottom-nav {
    flex-shrink: 0;
    background: var(--surface);
    border-top: 1px solid var(--border);
    display: flex;
    padding: 10px 0 env(safe-area-inset-bottom, 10px);
    position: relative;
  }
  .bottom-nav::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--primary-border), transparent);
  }
  .nav-item {
    flex: 1; display: flex; flex-direction: column; align-items: center; gap: 4px;
    padding: 4px 6px; cursor: pointer; border: none; background: none;
    -webkit-tap-highlight-color: transparent; transition: all 0.2s;
  }
  .nav-icon { font-size: 19px; transition: transform 0.2s; }
  .nav-label {
    font-size: 10px; font-weight: 600; color: var(--text-3);
    font-family: 'DM Sans', sans-serif; letter-spacing: 0.3px;
    transition: color 0.2s;
  }
  .nav-item.active .nav-icon { transform: scale(1.15); }
  .nav-item.active .nav-label { color: var(--primary); font-weight: 700; }
  .nav-indicator {
    width: 20px; height: 3px;
    background: var(--primary);
    border-radius: var(--r-pill);
    box-shadow: var(--glow);
    margin-top: 2px;
  }

  /* ── PAGE CONTENT ── */
  .page { padding: 20px 20px 8px; animation: pageIn 0.22s ease-out; }
  @keyframes pageIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }

  /* ── SECTION HEADER ── */
  .sec-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }
  .sec-title { font-family: 'Outfit', sans-serif; font-size: 18px; font-weight: 700; color: var(--text-1); }
  .sec-badge {
    background: var(--primary-dim); color: var(--primary);
    border: 1px solid var(--primary-border);
    font-size: 11px; font-weight: 700;
    padding: 3px 10px; border-radius: var(--r-pill);
    font-family: 'Outfit', sans-serif;
  }

  /* ── STAT GRID ── */
  .stat-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 20px; }
  .stat-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--r-xl);
    padding: 16px;
    position: relative; overflow: hidden;
    animation: cardIn 0.3s ease-out both;
    box-shadow: var(--shadow-card);
  }
  .stat-card.hero {
    background: linear-gradient(135deg, #00D09C 0%, #00A87A 100%);
    border-color: transparent;
    box-shadow: var(--glow), var(--shadow-card);
  }
  .stat-card.gold-card {
    background: linear-gradient(135deg, #F5A623 0%, #E8921A 100%);
    border-color: transparent;
    box-shadow: 0 0 24px rgba(245,166,35,0.20), var(--shadow-card);
  }
  @keyframes cardIn { from { opacity: 0; transform: translateY(12px) scale(0.97); } to { opacity: 1; transform: none; } }
  .stat-icon { font-size: 20px; margin-bottom: 8px; }
  .stat-val {
    font-family: 'Outfit', sans-serif;
    font-size: 26px; font-weight: 800;
    color: var(--text-1); line-height: 1;
    margin-bottom: 4px;
  }
  .stat-card.hero .stat-val,
  .stat-card.gold-card .stat-val { color: rgba(0,0,0,0.85); }
  .stat-lbl {
    font-size: 11px; font-weight: 600; color: var(--text-2);
    text-transform: uppercase; letter-spacing: 0.8px;
  }
  .stat-card.hero .stat-lbl,
  .stat-card.gold-card .stat-lbl { color: rgba(0,0,0,0.55); }

  /* ── PROGRESS CARD ── */
  .prog-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--r-xl);
    padding: 18px;
    margin-bottom: 12px;
    box-shadow: var(--shadow-card);
  }
  .prog-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; }
  .prog-title { font-family: 'Outfit', sans-serif; font-size: 14px; font-weight: 600; color: var(--text-1); display: flex; align-items: center; gap: 8px; }
  .prog-count { font-size: 13px; font-weight: 700; color: var(--primary); font-family: 'Outfit', sans-serif; }
  .prog-track { background: var(--surface-3); border-radius: var(--r-pill); height: 8px; overflow: hidden; }
  .prog-fill { height: 100%; border-radius: var(--r-pill); background: linear-gradient(90deg, var(--primary), #00F5B8); transition: width 0.7s cubic-bezier(0.34,1.56,0.64,1); }
  .prog-fill.gold { background: linear-gradient(90deg, var(--gold), #FFCA62); }
  .prog-sub { font-size: 11px; color: var(--text-3); margin-top: 8px; font-weight: 500; }

  /* ── CHIPS ── */
  .chip-row { display: flex; gap: 8px; overflow-x: auto; margin-bottom: 20px; padding-bottom: 2px; -webkit-overflow-scrolling: touch; }
  .chip-row::-webkit-scrollbar { display: none; }
  .chip {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--r-pill);
    padding: 9px 14px;
    font-size: 12px; font-weight: 700; white-space: nowrap;
    cursor: pointer; color: var(--text-2);
    display: flex; align-items: center; gap: 6px;
    font-family: 'DM Sans', sans-serif;
    transition: all 0.15s;
  }
  .chip:active { transform: scale(0.95); }
  .chip.active, .chip.cta {
    background: var(--primary); color: #000;
    border-color: transparent;
    box-shadow: 0 4px 14px rgba(0,208,156,0.35);
  }

  /* ── ANIMAL CARD ── */
  .animal-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--r-xl);
    margin-bottom: 12px;
    overflow: hidden; cursor: pointer;
    transition: transform 0.13s, box-shadow 0.13s;
    box-shadow: var(--shadow-card);
  }
  .animal-card:active { transform: scale(0.98); }
  .animal-card-body { padding: 16px 18px; display: flex; align-items: center; gap: 14px; }
  .animal-emoji-wrap {
    width: 56px; height: 56px;
    background: var(--surface-2);
    border: 1px solid var(--border);
    border-radius: var(--r-lg);
    display: flex; align-items: center; justify-content: center;
    font-size: 28px; flex-shrink: 0;
  }
  .animal-info { flex: 1; min-width: 0; }
  .animal-name { font-family: 'Outfit', sans-serif; font-size: 16px; font-weight: 700; color: var(--text-1); margin-bottom: 3px; }
  .animal-meta { font-size: 12px; color: var(--text-2); font-weight: 500; }
  .animal-per-share { font-size: 13px; font-weight: 700; color: var(--primary); margin-top: 2px; font-family: 'Outfit', sans-serif; }
  .animal-arrow { font-size: 16px; color: var(--text-3); flex-shrink: 0; }
  .animal-progress { height: 3px; background: var(--surface-3); }
  .animal-progress-fill { height: 100%; background: linear-gradient(90deg, var(--primary), #00F5B8); transition: width 0.6s; }

  /* ── SHARIK CARD ── */
  .sharik-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--r-xl);
    margin-bottom: 10px;
    padding: 14px 16px;
    display: flex; align-items: center; gap: 12px;
    cursor: pointer; transition: transform 0.13s;
    box-shadow: var(--shadow-card);
  }
  .sharik-card:active { transform: scale(0.98); }
  .avatar {
    width: 46px; height: 46px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Outfit', sans-serif; font-size: 17px; font-weight: 800;
    flex-shrink: 0; color: #000;
  }
  .sharik-name { font-family: 'Outfit', sans-serif; font-size: 15px; font-weight: 700; color: var(--text-1); }
  .sharik-sub { font-size: 12px; color: var(--text-2); margin-top: 2px; }
  .sharik-req { font-size: 11px; color: var(--gold); margin-top: 3px; font-weight: 600; }
  .sharik-right { display: flex; flex-direction: column; align-items: flex-end; gap: 5px; flex-shrink: 0; }

  /* ── STATUS BADGES ── */
  .badge {
    font-size: 10px; font-weight: 700;
    padding: 3px 9px; border-radius: var(--r-pill);
    text-transform: uppercase; letter-spacing: 0.6px;
    font-family: 'DM Sans', sans-serif;
  }
  .badge-paid   { background: rgba(0,208,156,0.15); color: var(--primary); border: 1px solid rgba(0,208,156,0.25); }
  .badge-pending{ background: var(--red-dim); color: var(--red); border: 1px solid rgba(255,92,92,0.25); }
  .badge-partial{ background: var(--blue-dim); color: var(--blue); border: 1px solid rgba(74,144,226,0.25); }
  .delivery-tag { font-size: 10px; font-weight: 700; color: var(--text-3); }
  .delivery-tag.done { color: var(--primary); }

  /* ── PART CARD ── */
  .part-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--r-lg);
    margin-bottom: 10px;
    overflow: hidden;
    transition: border-color 0.2s;
  }
  .part-card.open { border-color: var(--primary-border); }
  .part-header {
    padding: 14px 16px;
    display: flex; align-items: center; gap: 12px;
    cursor: pointer;
  }
  .part-icon-wrap {
    width: 38px; height: 38px;
    background: var(--primary-dim);
    border-radius: var(--r-md);
    display: flex; align-items: center; justify-content: center;
    font-size: 20px; flex-shrink: 0;
  }
  .part-name { font-family: 'Outfit', sans-serif; font-size: 14px; font-weight: 600; color: var(--text-1); }
  .part-kg { font-size: 12px; color: var(--text-2); margin-top: 1px; }
  .part-per { background: var(--primary-dim); color: var(--primary); border: 1px solid var(--primary-border); border-radius: var(--r-pill); font-size: 11px; font-weight: 700; padding: 3px 10px; font-family: 'Outfit', sans-serif; }
  .part-chevron { color: var(--text-3); font-size: 13px; margin-left: 4px; transition: transform 0.2s; }
  .part-chevron.open { transform: rotate(180deg); color: var(--primary); }
  .part-body { padding: 0 16px 16px; border-top: 1px solid var(--border); }

  /* ── TABS ── */
  .tab-bar {
    display: flex; gap: 6px;
    background: var(--surface-2);
    border-radius: var(--r-lg); padding: 5px;
    margin-bottom: 16px;
  }
  .tab {
    flex: 1; padding: 9px 6px; text-align: center;
    border-radius: var(--r-md); font-size: 12px; font-weight: 600;
    cursor: pointer; transition: all 0.2s; color: var(--text-2);
    font-family: 'DM Sans', sans-serif; white-space: nowrap;
  }
  .tab.active {
    background: var(--surface-3); color: var(--primary);
    font-weight: 700;
    box-shadow: 0 1px 4px rgba(0,0,0,0.3);
  }

  /* ── FORMS ── */
  .form-group { margin-bottom: 14px; }
  .form-label {
    display: block; font-size: 11px; font-weight: 700;
    color: var(--text-2); text-transform: uppercase; letter-spacing: 0.8px;
    margin-bottom: 7px; font-family: 'DM Sans', sans-serif;
  }
  .form-input {
    width: 100%; padding: 13px 15px;
    background: var(--surface-3);
    border: 1.5px solid var(--border-2);
    border-radius: var(--r-md); color: var(--text-1);
    font-family: 'DM Sans', sans-serif; font-size: 15px;
    outline: none; transition: border-color 0.2s;
  }
  .form-input:focus { border-color: var(--primary); }
  .form-input::placeholder { color: var(--text-3); }
  .form-select {
    width: 100%; padding: 13px 15px;
    background: var(--surface-3);
    border: 1.5px solid var(--border-2);
    border-radius: var(--r-md); color: var(--text-1);
    font-family: 'DM Sans', sans-serif; font-size: 15px;
    outline: none; appearance: none; cursor: pointer;
  }
  .input-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }

  /* ── BUTTONS ── */
  .btn {
    border: none; border-radius: var(--r-md); cursor: pointer;
    font-family: 'DM Sans', sans-serif; font-weight: 700;
    display: flex; align-items: center; justify-content: center; gap: 6px;
    transition: all 0.13s; -webkit-tap-highlight-color: transparent;
    font-size: 14px;
  }
  .btn:active { transform: scale(0.96); }
  .btn-primary {
    background: var(--primary); color: #000;
    padding: 14px 20px; width: 100%; font-size: 15px;
    border-radius: var(--r-lg);
    box-shadow: 0 4px 16px rgba(0,208,156,0.30);
    font-family: 'Outfit', sans-serif; font-weight: 700;
  }
  .btn-surface { background: var(--surface-2); color: var(--text-1); border: 1px solid var(--border); padding: 12px 16px; border-radius: var(--r-lg); }
  .btn-ghost   { background: var(--primary-dim); color: var(--primary); border: 1px solid var(--primary-border); padding: 12px 16px; border-radius: var(--r-lg); font-family: 'Outfit', sans-serif; font-weight: 700; }
  .btn-danger  { background: var(--red-dim); color: var(--red); border: 1px solid rgba(255,92,92,0.25); padding: 10px 14px; border-radius: var(--r-md); }
  .btn-gold    { background: linear-gradient(135deg, #F5A623, #E8921A); color: #000; border-radius: var(--r-lg); padding: 14px 20px; font-family: 'Outfit', sans-serif; font-weight: 700; }
  .btn-sm      { padding: 8px 14px; font-size: 12px; border-radius: var(--r-md); }
  .btn-row     { display: flex; gap: 10px; }

  /* ── RECEIPT CARD ── */
  .receipt {
    background: linear-gradient(160deg, #0D1E40 0%, #0F2535 50%, #0A1E2E 100%);
    border: 1px solid rgba(0,208,156,0.20);
    border-radius: var(--r-xl);
    padding: 24px;
    text-align: center;
    position: relative; overflow: hidden;
    margin-bottom: 20px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.5), 0 0 40px rgba(0,208,156,0.08);
  }
  .receipt::before {
    content: '☽';
    position: absolute; top: -10px; right: 8px;
    font-size: 90px; opacity: 0.06; color: var(--primary);
    pointer-events: none;
  }
  .receipt-event { font-size: 11px; color: var(--text-3); text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 8px; }
  .receipt-name { font-family: 'Outfit', sans-serif; font-size: 26px; font-weight: 800; color: var(--text-1); margin-bottom: 4px; }
  .receipt-animal { font-size: 13px; color: var(--primary); font-weight: 600; margin-bottom: 20px; }
  .receipt-divider { border: none; border-top: 1px solid rgba(255,255,255,0.07); margin: 16px 0; }
  .receipt-row { display: flex; align-items: center; justify-content: space-between; padding: 9px 0; }
  .receipt-row-left { display: flex; align-items: center; gap: 10px; font-size: 14px; color: var(--text-2); font-weight: 500; }
  .receipt-row-kg { font-family: 'Outfit', sans-serif; font-size: 16px; font-weight: 700; color: var(--text-1); }
  .receipt-total-block {
    background: var(--primary-dim);
    border: 1px solid var(--primary-border);
    border-radius: var(--r-lg);
    padding: 16px; margin-top: 16px; text-align: center;
  }
  .receipt-total-lbl { font-size: 11px; color: var(--primary); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px; opacity: 0.7; }
  .receipt-total-val { font-family: 'Outfit', sans-serif; font-size: 36px; font-weight: 900; color: var(--primary); line-height: 1; }
  .receipt-total-unit { font-size: 16px; font-weight: 600; opacity: 0.7; }

  /* ── MODAL ── */
  .overlay {
    position: fixed; inset: 0;
    background: rgba(0,0,0,0.7);
    backdrop-filter: blur(4px);
    z-index: 200;
    display: flex; align-items: flex-end; justify-content: center;
    animation: overlayIn 0.2s ease;
  }
  @keyframes overlayIn { from { opacity: 0; } to { opacity: 1; } }
  .modal {
    background: var(--surface);
    border: 1px solid var(--border-2);
    border-radius: 24px 24px 0 0;
    width: 100%; max-width: 430px;
    max-height: 93dvh; overflow-y: auto;
    padding: 20px 20px 32px;
    animation: modalUp 0.3s cubic-bezier(0.34,1.56,0.64,1);
  }
  @keyframes modalUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
  .modal-handle { width: 36px; height: 4px; background: var(--border-2); border-radius: var(--r-pill); margin: 0 auto 20px; }
  .modal-title { font-family: 'Outfit', sans-serif; font-size: 22px; font-weight: 800; color: var(--text-1); margin-bottom: 20px; }

  /* ── CHECKLIST ── */
  .check-item { display: flex; align-items: flex-start; gap: 12px; padding: 12px 0; border-bottom: 1px solid var(--border); cursor: pointer; }
  .check-item:last-child { border-bottom: none; }
  .check-box {
    width: 22px; height: 22px; border-radius: var(--r-sm);
    border: 2px solid var(--border-2);
    display: flex; align-items: center; justify-content: center;
    font-size: 12px; flex-shrink: 0; margin-top: 1px;
    transition: all 0.2s;
  }
  .check-box.on { background: var(--primary); border-color: var(--primary); color: #000; box-shadow: 0 2px 8px rgba(0,208,156,0.3); }
  .check-label { font-size: 13px; color: var(--text-2); line-height: 1.5; }
  .check-label.on { color: var(--text-1); }

  /* ── BUTCHER MODE ── */
  .butcher-wrap { background: #04080F; height: 100dvh; display: flex; flex-direction: column; overflow: hidden; max-width: 430px; margin: 0 auto; }
  .butcher-header { padding: 16px 20px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid rgba(0,208,156,0.10); }
  .butcher-title { font-family: 'Outfit', sans-serif; font-size: 20px; font-weight: 800; color: var(--primary); }
  .butcher-content { flex: 1; overflow-y: auto; padding: 16px 16px 8px; }
  .butcher-parts-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 16px; }
  .butcher-part {
    background: var(--surface);
    border: 1.5px solid var(--border);
    border-radius: var(--r-lg);
    padding: 16px 12px;
    display: flex; flex-direction: column; align-items: center; gap: 6px;
    cursor: pointer; transition: all 0.13s;
  }
  .butcher-part:active { transform: scale(0.96); }
  .butcher-part.sel { background: var(--primary-dim); border-color: var(--primary-border); box-shadow: var(--glow); }
  .bp-icon { font-size: 32px; }
  .bp-name { font-size: 12px; font-weight: 700; color: var(--text-2); text-align: center; font-family: 'Outfit', sans-serif; }
  .bp-kg { font-family: 'Outfit', sans-serif; font-size: 20px; font-weight: 800; color: var(--primary); }
  .numpad-area { background: var(--surface); border: 1px solid var(--border); border-radius: 20px 20px 0 0; padding: 16px 16px 4px; }
  .numpad-display {
    font-family: 'Outfit', sans-serif; font-size: 52px; font-weight: 800;
    color: var(--text-1); text-align: center;
    padding: 8px 0 16px; border-bottom: 1px solid var(--border);
    margin-bottom: 14px;
  }
  .numpad-unit { font-size: 22px; color: var(--text-3); margin-left: 4px; }
  .numpad-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 12px; }
  .numpad-key {
    background: var(--surface-2);
    border: 1px solid var(--border);
    border-radius: var(--r-lg); padding: 16px;
    font-family: 'Outfit', sans-serif; font-size: 22px; font-weight: 700;
    color: var(--text-1); cursor: pointer; text-align: center;
    transition: all 0.1s;
  }
  .numpad-key:active { background: var(--surface-3); transform: scale(0.94); }
  .numpad-key.del { color: var(--red); }
  .numpad-key.save-key { background: var(--primary); color: #000; box-shadow: 0 4px 16px rgba(0,208,156,0.30); grid-column: span 3; font-size: 17px; }

  /* ── ESTIMATOR ── */
  .est-result {
    background: var(--surface-2);
    border: 1px solid var(--primary-border);
    border-radius: var(--r-xl);
    padding: 18px; margin-top: 16px;
    box-shadow: var(--glow);
  }
  .est-row { display: flex; align-items: center; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid var(--border); }
  .est-row:last-child { border-bottom: none; font-weight: 800; }
  .est-lbl { display: flex; align-items: center; gap: 8px; font-size: 14px; color: var(--text-2); }
  .est-val { font-family: 'Outfit', sans-serif; font-size: 15px; font-weight: 700; color: var(--primary); }

  /* ── ANIMAL TYPE SELECTOR ── */
  .type-grid { display: flex; gap: 8px; flex-wrap: wrap; }
  .type-btn {
    padding: 10px 14px;
    background: var(--surface-3);
    border: 1.5px solid var(--border);
    border-radius: var(--r-md);
    color: var(--text-2); font-size: 13px; font-weight: 700;
    cursor: pointer; font-family: 'DM Sans', sans-serif;
    transition: all 0.15s;
  }
  .type-btn.sel { background: var(--primary-dim); border-color: var(--primary-border); color: var(--primary); }

  /* ── EVENTS SCREEN ── */
  .event-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--r-xl);
    margin-bottom: 12px; padding: 18px;
    cursor: pointer; transition: all 0.15s;
    box-shadow: var(--shadow-card);
  }
  .event-card.active-event { border-color: var(--primary-border); box-shadow: var(--glow), var(--shadow-card); }
  .event-card:active { transform: scale(0.98); }
  .event-name { font-family: 'Outfit', sans-serif; font-size: 17px; font-weight: 700; color: var(--text-1); margin-bottom: 6px; }
  .event-meta { font-size: 12px; color: var(--text-2); }

  /* ── INFO ROW ── */
  .info-grid { background: var(--surface-2); border-radius: var(--r-lg); padding: 14px; margin-bottom: 14px; display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .info-cell { }
  .info-lbl { font-size: 10px; color: var(--text-3); text-transform: uppercase; letter-spacing: 0.8px; font-weight: 700; margin-bottom: 3px; }
  .info-val { font-size: 13px; font-weight: 700; color: var(--text-1); }

  /* ── EMPTY STATE ── */
  .empty { text-align: center; padding: 48px 24px; }
  .empty-ico { font-size: 52px; display: block; margin-bottom: 14px; opacity: 0.4; }
  .empty-txt { font-size: 14px; color: var(--text-3); font-weight: 600; }

  /* ── TOAST ── */
  .toast {
    position: fixed; top: 20px; left: 50%; transform: translateX(-50%);
    background: var(--primary); color: #000;
    padding: 11px 20px; border-radius: var(--r-pill);
    font-size: 13px; font-weight: 700; z-index: 9999; white-space: nowrap;
    box-shadow: 0 4px 20px rgba(0,208,156,0.4);
    font-family: 'Outfit', sans-serif;
    animation: toastPop 0.25s cubic-bezier(0.34,1.56,0.64,1), toastFade 0.3s ease 2.2s forwards;
  }
  @keyframes toastPop { from { opacity:0; transform:translateX(-50%) scale(0.85) translateY(-8px); } to { opacity:1; transform:translateX(-50%) scale(1) translateY(0); } }
  @keyframes toastFade { to { opacity:0; transform:translateX(-50%) translateY(-10px); } }

  /* ── BISMILLAH BANNER ── */
  .bismillah {
    text-align: center; padding: 14px 16px;
    background: var(--primary-dim);
    border: 1px solid var(--primary-border);
    border-radius: var(--r-lg); margin-bottom: 16px;
    font-family: 'Amiri', serif; font-size: 20px;
    color: var(--primary); letter-spacing: 2px;
  }

  /* ── DELIVERY TOGGLE ── */
  .delivery-toggle { display: flex; gap: 8px; }
  .del-btn {
    flex: 1; padding: 10px 6px;
    border: 1.5px solid var(--border);
    border-radius: var(--r-md);
    background: var(--surface-2); color: var(--text-2);
    font-size: 11px; font-weight: 700; cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    transition: all 0.15s; text-align: center;
  }
  .del-btn.on { border-color: var(--primary-border); background: var(--primary-dim); color: var(--primary); }

  /* Overrides for back-button inside screen */
  .back-btn {
    display: inline-flex; align-items: center; gap: 6px;
    background: var(--surface-2); border: 1px solid var(--border);
    color: var(--text-2); font-size: 13px; font-weight: 600;
    padding: 8px 14px; border-radius: var(--r-md);
    cursor: pointer; margin-bottom: 16px;
    font-family: 'DM Sans', sans-serif;
  }
  .back-btn:active { transform: scale(0.96); }

  /* Animal detail header */
  .animal-detail-header {
    background: linear-gradient(160deg, #0D1628 0%, #0A1020 100%);
    border-bottom: 1px solid var(--border);
    padding: 16px 20px 20px;
    flex-shrink: 0;
  }
  .animal-detail-stats { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; margin-top: 16px; }
  .ads-cell { background: var(--surface-2); border: 1px solid var(--border); border-radius: var(--r-md); padding: 10px 8px; text-align: center; }
  .ads-val { font-family: 'Outfit', sans-serif; font-size: 16px; font-weight: 800; color: var(--primary); }
  .ads-lbl { font-size: 10px; color: var(--text-3); font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-top: 2px; }
`;

/* ═══════════════════════════════════════════════════════════════════════════
   CONSTANTS
   ═══════════════════════════════════════════════════════════════════════════ */
const ANIMAL_ICONS = { cow:"🐄", goat:"🐐", sheep:"🐑", camel:"🐪", buffalo:"🦬" };
const YIELD = {
  cow:     { meat:0.38, bone:0.12, fat:0.08, offal:0.05 },
  goat:    { meat:0.42, bone:0.10, fat:0.06, offal:0.04 },
  sheep:   { meat:0.40, bone:0.11, fat:0.09, offal:0.04 },
  camel:   { meat:0.35, bone:0.14, fat:0.07, offal:0.05 },
  buffalo: { meat:0.36, bone:0.13, fat:0.07, offal:0.05 },
};
const PART_ICON = { "Solid Beef":"🥩","Meat":"🥩","Bone":"🦴","Fat":"🧈","Liver":"❤️","Heart":"❤️","Kidney":"🫘","Stomach":"🫙","Head":"💀","Other":"📦","Offal":"🫀","Lung":"🫁" };
const getPI = n => PART_ICON[n] || (n.toLowerCase().includes("meat")?"🥩":n.toLowerCase().includes("bone")?"🦴":"📦");
const CHECKLIST = [
  "Animal is free from defects and healthy",
  "Animal has reached minimum age requirement",
  "Niyyah (intention) has been made",
  "Bismillah Allahu Akbar recited before slaughter",
  "Blade is sharp and not shown to the animal",
  "Direction of Qibla confirmed",
  "Animal slaughtered away from other animals",
];
const AVATAR_COLORS = ["#00D09C","#F5A623","#4A90E2","#B06AEB","#FF5C5C","#00BCD4","#FF8C42","#7CB342"];
const mkId = () => Math.random().toString(36).slice(2,9);
const initials = n => n ? n.split(" ").map(w=>w[0]).join("").toUpperCase().slice(0,2) : "?";
const avatarColor = n => AVATAR_COLORS[(n.charCodeAt(0)+(n.charCodeAt(1)||0))%AVATAR_COLORS.length];

const DEFAULT_PARTS = [
  { id:mkId(), name:"Solid Beef", totalKg:0 },
  { id:mkId(), name:"Bone",       totalKg:0 },
  { id:mkId(), name:"Fat",        totalKg:0 },
  { id:mkId(), name:"Liver",      totalKg:0 },
  { id:mkId(), name:"Other",      totalKg:0 },
];

const INIT = {
  events:[{
    id:"ev1", name:"Eid-ul-Adha 2026", year:2026, createdAt:new Date().toISOString(),
    animals:[{
      id:"an1", name:"Cow #1", type:"cow", liveWeight:320, notes:"Purchased from local farmer",
      checklist:CHECKLIST.map((_,i)=>i<3),
      parts:[
        { id:"p1", name:"Solid Beef", totalKg:48 },
        { id:"p2", name:"Bone",       totalKg:18 },
        { id:"p3", name:"Fat",        totalKg:12 },
        { id:"p4", name:"Liver",      totalKg:4  },
        { id:"p5", name:"Other",      totalKg:6  },
      ],
      shareholders:[
        { id:"s1", name:"Tanvir Ahmed",    phone:"0300-1234567", shares:1, paymentStatus:"paid",    specialRequest:"Less bone please",  deliveryStatus:"delivered" },
        { id:"s2", name:"Hasan Ali",        phone:"0321-9876543", shares:1, paymentStatus:"pending", specialRequest:"",                  deliveryStatus:"pending"   },
        { id:"s3", name:"Zainab Malik",     phone:"0333-5556666", shares:1, paymentStatus:"paid",    specialRequest:"Extra liver",        deliveryStatus:"collected" },
        { id:"s4", name:"Ibrahim Khan",     phone:"0311-2223333", shares:1, paymentStatus:"partial", specialRequest:"",                  deliveryStatus:"pending"   },
        { id:"s5", name:"Fatima Noor",      phone:"0345-7778889", shares:1, paymentStatus:"paid",    specialRequest:"",                  deliveryStatus:"pending"   },
        { id:"s6", name:"Amir Siddiqui",    phone:"0312-4445556", shares:1, paymentStatus:"paid",    specialRequest:"No fat",            deliveryStatus:"delivered" },
        { id:"s7", name:"Rukhsana Begum",   phone:"0301-8889990", shares:1, paymentStatus:"pending", specialRequest:"",                  deliveryStatus:"pending"   },
      ],
    }],
  }],
  activeEventId:"ev1",
};

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
function HomeScreen({ state, onNav, setDetailAnimal }) {
  const event = state.events.find(e=>e.id===state.activeEventId);
  if (!event) return (
    <div className="page">
      <div className="empty">
        <span className="empty-ico">🌙</span>
        <div className="empty-txt">Create your first Qurbani event to begin</div>
        <div style={{marginTop:20}}>
          <button className="btn btn-primary" onClick={()=>onNav("events")}>Create Event</button>
        </div>
      </div>
    </div>
  );

  const allS = event.animals.flatMap(a=>a.shareholders);
  const totalKg = event.animals.reduce((s,a)=>s+a.parts.reduce((s2,p)=>s2+Number(p.totalKg),0),0);
  const paidCt  = allS.filter(s=>s.paymentStatus==="paid").length;
  const delCt   = allS.filter(s=>s.deliveryStatus==="delivered"||s.deliveryStatus==="collected").length;

  return (
    <div className="page" style={{paddingBottom:8}}>
      {/* Greeting */}
      <div style={{marginBottom:20}}>
        <div style={{fontSize:12,color:"var(--text-3)",fontWeight:600,letterSpacing:"1px",textTransform:"uppercase",marginBottom:4}}>ASSALAMU ALAYKUM</div>
        <div style={{fontFamily:"Outfit,sans-serif",fontSize:24,fontWeight:800,color:"var(--text-1)"}}>Qurbani Dashboard</div>
      </div>

      {/* Stats */}
      <div className="stat-grid">
        <div className="stat-card hero" style={{animationDelay:"0ms"}}>
          <div className="stat-icon">🐄</div>
          <div className="stat-val">{event.animals.length}</div>
          <div className="stat-lbl">Animals</div>
        </div>
        <div className="stat-card gold-card" style={{animationDelay:"60ms"}}>
          <div className="stat-icon">👥</div>
          <div className="stat-val">{allS.length}</div>
          <div className="stat-lbl">Shariks</div>
        </div>
        <div className="stat-card" style={{animationDelay:"120ms"}}>
          <div className="stat-icon">🥩</div>
          <div className="stat-val" style={{color:"var(--primary)"}}>{totalKg.toFixed(0)}<span style={{fontSize:14,color:"var(--text-3)",fontWeight:600}}>kg</span></div>
          <div className="stat-lbl">Total Meat</div>
        </div>
        <div className="stat-card" style={{animationDelay:"180ms"}}>
          <div className="stat-icon">💳</div>
          <div className="stat-val" style={{color:"var(--gold)"}}>{allS.length?Math.round(paidCt/allS.length*100):0}<span style={{fontSize:14,color:"var(--text-3)",fontWeight:600}}>%</span></div>
          <div className="stat-lbl">Paid</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="chip-row">
        <div className="chip cta" onClick={()=>onNav("butcherMode")}>🎯 Butcher Mode</div>
        <div className="chip" onClick={()=>onNav("estimator")}>⚖️ Estimator</div>
        <div className="chip" onClick={()=>onNav("addAnimal")}>＋ Animal</div>
        <div className="chip" onClick={()=>onNav("shariks")}>👥 Shariks</div>
      </div>

      {/* Distribution Progress */}
      <div className="prog-card" style={{marginBottom:12}}>
        <div className="prog-header">
          <div className="prog-title">🚚 Distribution</div>
          <div className="prog-count">{delCt}/{allS.length}</div>
        </div>
        <div className="prog-track">
          <div className="prog-fill" style={{width:allS.length?`${delCt/allS.length*100}%`:"0%"}}/>
        </div>
        <div className="prog-sub">{delCt} done · {allS.length-delCt} pending</div>
      </div>

      {/* Payment Progress */}
      <div className="prog-card" style={{marginBottom:20}}>
        <div className="prog-header">
          <div className="prog-title">💰 Payments</div>
          <div className="prog-count" style={{color:"var(--gold)"}}>{paidCt}/{allS.length} paid</div>
        </div>
        <div className="prog-track">
          <div className="prog-fill gold" style={{width:allS.length?`${paidCt/allS.length*100}%`:"0%"}}/>
        </div>
        <div style={{display:"flex",gap:8,marginTop:10,flexWrap:"wrap"}}>
          {["paid","pending","partial"].map(st=>{
            const ct = allS.filter(s=>s.paymentStatus===st).length;
            return ct>0?<span key={st} className={`badge badge-${st}`}>{ct} {st}</span>:null;
          })}
        </div>
      </div>

      {/* Animals */}
      <div className="sec-header">
        <div className="sec-title">Animals</div>
        <span className="sec-badge">{event.animals.length}</span>
      </div>
      {event.animals.map(animal=>{
        const kg = animal.parts.reduce((s,p)=>s+Number(p.totalKg),0);
        const ps = animal.shareholders.length>0?kg/animal.shareholders.length:0;
        return (
          <div className="animal-card" key={animal.id} onClick={()=>{ setDetailAnimal(animal.id); onNav("animalDetail"); }}>
            <div className="animal-card-body">
              <div className="animal-emoji-wrap">{ANIMAL_ICONS[animal.type]||"🐄"}</div>
              <div className="animal-info">
                <div className="animal-name">{animal.name}</div>
                <div className="animal-meta">{animal.shareholders.length} shareholders · {kg.toFixed(1)} kg</div>
                <div className="animal-per-share">≈ {ps.toFixed(2)} kg / share</div>
              </div>
              <div className="animal-arrow">›</div>
            </div>
            <div className="animal-progress">
              <div className="animal-progress-fill" style={{width:animal.liveWeight?`${Math.min(100,(kg/(animal.liveWeight*0.38))*100)}%`:"55%"}}/>
            </div>
          </div>
        );
      })}
      <button className="btn btn-ghost" style={{width:"100%",marginTop:4}} onClick={()=>onNav("addAnimal")}>＋ Add Animal</button>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   ANIMAL DETAIL
   ═══════════════════════════════════════════════════════════════════════════ */
function AnimalDetail({ animal, eventName, onBack, onUpdate, toast }) {
  const [tab, setTab]           = useState("parts");
  const [openPart, setOpenPart] = useState(null);
  const [showAddPart, setAddPart] = useState(false);
  const [newPart, setNewPart]   = useState({ name:"", totalKg:"" });
  const [showAddS, setAddS]     = useState(false);
  const [selSharik, setSelSharik] = useState(null);

  const kg = animal.parts.reduce((s,p)=>s+Number(p.totalKg),0);
  const ps = animal.shareholders.length>0 ? kg/animal.shareholders.length : 0;
  const cl = animal.checklist || CHECKLIST.map(()=>false);

  const upPart = (id,k,v) => onUpdate({...animal, parts:animal.parts.map(p=>p.id===id?{...p,[k]:v}:p)});
  const delPart = id => onUpdate({...animal, parts:animal.parts.filter(p=>p.id!==id)});
  const addPart = () => {
    if(!newPart.name||!newPart.totalKg) return;
    onUpdate({...animal, parts:[...animal.parts,{id:mkId(),name:newPart.name,totalKg:Number(newPart.totalKg)}]});
    setNewPart({name:"",totalKg:""}); setAddPart(false); toast("Part added ✓");
  };
  const upSharik = s => onUpdate({...animal, shareholders:animal.shareholders.map(sh=>sh.id===s.id?s:sh)});
  const delSharik = id => { onUpdate({...animal, shareholders:animal.shareholders.filter(s=>s.id!==id)}); setSelSharik(null); toast("Removed"); };
  const toggleCl = i => { const nc=[...cl]; nc[i]=!nc[i]; onUpdate({...animal,checklist:nc}); };

  return (
    <div style={{display:"flex",flexDirection:"column",height:"100dvh",overflow:"hidden"}}>
      {/* Detail Header */}
      <div className="animal-detail-header">
        <button className="back-btn" onClick={onBack}>← Back</button>
        <div style={{display:"flex",alignItems:"center",gap:14}}>
          <div style={{fontSize:38,background:"var(--surface-3)",borderRadius:"var(--r-lg)",padding:"10px 12px"}}>{ANIMAL_ICONS[animal.type]||"🐄"}</div>
          <div>
            <div style={{fontFamily:"Outfit,sans-serif",fontSize:20,fontWeight:800,color:"var(--text-1)"}}>{animal.name}</div>
            <div style={{fontSize:12,color:"var(--text-3)",marginTop:3}}>{eventName} {animal.liveWeight?`· ${animal.liveWeight}kg live`:""}</div>
          </div>
        </div>
        <div className="animal-detail-stats">
          {[[`${kg.toFixed(1)}kg`,"Total"],[`${ps.toFixed(2)}kg`,"Per Share"],[animal.shareholders.length,"Shariks"]].map(([v,l])=>(
            <div className="ads-cell" key={l}><div className="ads-val">{v}</div><div className="ads-lbl">{l}</div></div>
          ))}
        </div>
      </div>

      <div style={{flex:1,overflowY:"auto",padding:"16px 16px 24px"}}>
        <div className="tab-bar">
          {[["parts","🥩 Parts"],["shariks","👥 Shariks"],["checklist","✅ Checklist"]].map(([k,lbl])=>(
            <div key={k} className={`tab ${tab===k?"active":""}`} onClick={()=>setTab(k)}>{lbl}</div>
          ))}
        </div>

        {/* ── PARTS ── */}
        {tab==="parts" && <>
          {animal.parts.map(part=>(
            <div className={`part-card ${openPart===part.id?"open":""}`} key={part.id}>
              <div className="part-header" onClick={()=>setOpenPart(openPart===part.id?null:part.id)}>
                <div className="part-icon-wrap">{getPI(part.name)}</div>
                <div style={{flex:1}}>
                  <div className="part-name">{part.name}</div>
                  <div className="part-kg">{Number(part.totalKg).toFixed(2)} kg total</div>
                </div>
                <div className="part-per">{ps>0?(Number(part.totalKg)/animal.shareholders.length).toFixed(2):"0.00"}/share</div>
                <div className={`part-chevron ${openPart===part.id?"open":""}`}>▼</div>
              </div>
              {openPart===part.id && (
                <div className="part-body">
                  <div className="form-group" style={{marginTop:12,marginBottom:10}}>
                    <label className="form-label">Total Amount (kg)</label>
                    <input className="form-input" type="number" value={part.totalKg} onChange={e=>upPart(part.id,"totalKg",e.target.value)} placeholder="0.00"/>
                  </div>
                  <div className="btn-row">
                    <button className="btn btn-ghost" style={{flex:1}} onClick={()=>{ setOpenPart(null); toast("Saved ✓"); }}>✓ Save</button>
                    <button className="btn btn-danger btn-sm" onClick={()=>delPart(part.id)}>🗑</button>
                  </div>
                </div>
              )}
            </div>
          ))}
          {showAddPart ? (
            <div style={{background:"var(--surface)",border:"1px solid var(--border)",borderRadius:"var(--r-xl)",padding:16,marginTop:8}}>
              <div className="form-group">
                <label className="form-label">Part Name</label>
                <input className="form-input" value={newPart.name} onChange={e=>setNewPart({...newPart,name:e.target.value})} placeholder="e.g. Heart, Kidney..."/>
              </div>
              <div className="form-group">
                <label className="form-label">Total (kg)</label>
                <input className="form-input" type="number" value={newPart.totalKg} onChange={e=>setNewPart({...newPart,totalKg:e.target.value})} placeholder="0.00"/>
              </div>
              <div className="btn-row">
                <button className="btn btn-primary" style={{flex:1}} onClick={addPart}>Add Part</button>
                <button className="btn btn-surface" onClick={()=>setAddPart(false)}>Cancel</button>
              </div>
            </div>
          ) : (
            <button className="btn btn-ghost" style={{width:"100%",marginTop:10}} onClick={()=>setAddPart(true)}>＋ Add Part</button>
          )}
        </>}

        {/* ── SHARIKS ── */}
        {tab==="shariks" && <>
          {animal.shareholders.map(s=>(
            <div className="sharik-card" key={s.id} onClick={()=>setSelSharik(s)}>
              <div className="avatar" style={{background:avatarColor(s.name)}}>{initials(s.name)}</div>
              <div style={{flex:1,minWidth:0}}>
                <div className="sharik-name">{s.name}</div>
                <div className="sharik-sub">{s.phone||"No phone"}</div>
                {s.specialRequest&&<div className="sharik-req">📝 {s.specialRequest}</div>}
              </div>
              <div className="sharik-right">
                <span className={`badge badge-${s.paymentStatus}`}>{s.paymentStatus}</span>
                <span className={`delivery-tag ${s.deliveryStatus==="delivered"||s.deliveryStatus==="collected"?"done":""}`}>
                  {s.deliveryStatus==="delivered"?"✅ Delivered":s.deliveryStatus==="collected"?"🏠 Collected":"⏳ Pending"}
                </span>
              </div>
            </div>
          ))}
          <button className="btn btn-primary" style={{marginTop:8}} onClick={()=>setAddS(true)}>＋ Add Sharik</button>
        </>}

        {/* ── CHECKLIST ── */}
        {tab==="checklist" && (
          <div style={{background:"var(--surface)",border:"1px solid var(--border)",borderRadius:"var(--r-xl)",padding:18}}>
            <div className="bismillah">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم</div>
            <div style={{fontFamily:"Outfit,sans-serif",fontSize:16,fontWeight:700,color:"var(--text-1)",marginBottom:4}}>Islamic Compliance</div>
            <div style={{fontSize:12,color:"var(--text-3)",marginBottom:16}}>Verify all conditions before slaughter</div>
            {CHECKLIST.map((item,i)=>(
              <div className="check-item" key={i} onClick={()=>toggleCl(i)}>
                <div className={`check-box ${cl[i]?"on":""}`}>{cl[i]?"✓":""}</div>
                <div className={`check-label ${cl[i]?"on":""}`}>{item}</div>
              </div>
            ))}
            <div style={{marginTop:14,fontSize:13,color:"var(--primary)",fontWeight:700,fontFamily:"Outfit,sans-serif"}}>
              {cl.filter(Boolean).length}/{CHECKLIST.length} conditions met
            </div>
          </div>
        )}
      </div>

      {showAddS && (
        <SharikModal
          onClose={()=>setAddS(false)}
          onSave={s=>{ onUpdate({...animal,shareholders:[...animal.shareholders,s]}); setAddS(false); toast("Sharik added ✓"); }}
        />
      )}
      {selSharik && (
        <SharikDetailModal
          sharik={selSharik} animal={animal} eventName={eventName}
          onClose={()=>setSelSharik(null)}
          onUpdate={s=>{ upSharik(s); setSelSharik(s); toast("Saved ✓"); }}
          onDelete={delSharik}
        />
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   SHARIK MODAL (Add/Edit)
   ═══════════════════════════════════════════════════════════════════════════ */
function SharikModal({ onClose, onSave, initial }) {
  const [f, setF] = useState(initial||{name:"",phone:"",shares:1,paymentStatus:"pending",specialRequest:"",deliveryStatus:"pending"});
  const s = (k,v) => setF(p=>({...p,[k]:v}));
  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={e=>e.stopPropagation()}>
        <div className="modal-handle"/>
        <div className="modal-title">{initial?"Edit Sharik":"Add Sharik"}</div>
        <div className="form-group">
          <label className="form-label">Full Name *</label>
          <input className="form-input" value={f.name} onChange={e=>s("name",e.target.value)} placeholder="e.g. Tanvir Ahmed"/>
        </div>
        <div className="form-group">
          <label className="form-label">Phone Number</label>
          <input className="form-input" type="tel" value={f.phone} onChange={e=>s("phone",e.target.value)} placeholder="0300-1234567"/>
        </div>
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
        <div className="form-group">
          <label className="form-label">Special Request</label>
          <input className="form-input" value={f.specialRequest} onChange={e=>s("specialRequest",e.target.value)} placeholder="e.g. Less bone, extra liver..."/>
        </div>
        <div className="btn-row">
          <button className="btn btn-primary" style={{flex:1}} onClick={()=>f.name&&onSave({...f,id:initial?.id||mkId()})}>
            {initial?"Save Changes":"Add Sharik"}
          </button>
          <button className="btn btn-surface" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   SHARIK DETAIL MODAL (Receipt + Actions)
   ═══════════════════════════════════════════════════════════════════════════ */
function SharikDetailModal({ sharik, animal, eventName, onClose, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);
  const count = animal.shareholders.length;
  const ps = count>0 ? animal.parts.reduce((s,p)=>s+Number(p.totalKg),0)/count : 0;

  const waText = () => {
    const parts = animal.parts.map(p=>`${getPI(p.name)} ${p.name}: *${(Number(p.totalKg)/count).toFixed(2)} kg*`).join("\n");
    return encodeURIComponent(
      `🌙 *Eid-ul-Adha 2026 — SharikNama*\n\nAs-salamu alaykum *${sharik.name}*,\nYour Qurbani share from ${animal.name} is ready!\n\n📦 *Your Share Details:*\n${parts}\n\n📊 *Total: ${ps.toFixed(2)} kg*\n🚚 Status: ${sharik.deliveryStatus==="delivered"?"✅ Delivered":sharik.deliveryStatus==="collected"?"🏠 Collected":"⏳ Pending"}\n\n_JazakAllah Khair 🤲_\n_Generated by SharikNama_`
    );
  };

  if (editing) return (
    <SharikModal initial={sharik} onClose={()=>setEditing(false)} onSave={s=>{ onUpdate(s); setEditing(false); }}/>
  );

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={e=>e.stopPropagation()} style={{maxHeight:"90dvh"}}>
        <div className="modal-handle"/>
        {/* Receipt */}
        <div className="receipt">
          <div className="receipt-event">{eventName}</div>
          <div className="receipt-name">{sharik.name}</div>
          <div className="receipt-animal">{animal.name} · {count} shariks</div>
          <hr className="receipt-divider"/>
          {animal.parts.map(p=>(
            <div className="receipt-row" key={p.id}>
              <div className="receipt-row-left"><span>{getPI(p.name)}</span><span>{p.name}</span></div>
              <span className="receipt-row-kg">{(Number(p.totalKg)/count).toFixed(2)} kg</span>
            </div>
          ))}
          <div className="receipt-total-block">
            <div className="receipt-total-lbl">Total Share</div>
            <div className="receipt-total-val">{ps.toFixed(2)}<span className="receipt-total-unit"> kg</span></div>
          </div>
        </div>

        {/* Info */}
        <div className="info-grid" style={{marginBottom:12}}>
          {[["📞 Phone",sharik.phone||"—"],["💳 Payment",sharik.paymentStatus],["🚚 Delivery",sharik.deliveryStatus],["📝 Request",sharik.specialRequest||"None"]].map(([l,v])=>(
            <div className="info-cell" key={l}><div className="info-lbl">{l}</div><div className="info-val">{v}</div></div>
          ))}
        </div>

        {/* Delivery toggle */}
        <div style={{marginBottom:14}}>
          <div className="form-label">Update Delivery</div>
          <div className="delivery-toggle">
            {["pending","collected","delivered"].map(s=>(
              <button key={s} className={`del-btn ${sharik.deliveryStatus===s?"on":""}`} onClick={()=>onUpdate({...sharik,deliveryStatus:s})}>
                {s==="pending"?"⏳ Pending":s==="collected"?"🏠 Collected":"✅ Delivered"}
              </button>
            ))}
          </div>
        </div>

        <div className="btn-row" style={{marginBottom:8}}>
          <button className="btn btn-gold" style={{flex:1}} onClick={()=>window.open(`https://wa.me/?text=${waText()}`,"_blank")}>
            📱 WhatsApp
          </button>
          <button className="btn btn-ghost" style={{flex:1}} onClick={()=>setEditing(true)}>✏️ Edit</button>
          <button className="btn btn-danger btn-sm" onClick={()=>{ if(window.confirm("Remove sharik?")) onDelete(sharik.id); }}>🗑</button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   SHARIKS SCREEN
   ═══════════════════════════════════════════════════════════════════════════ */
function ShariksScreen({ state, onUpdate }) {
  const [filter, setFilter] = useState("all");
  const [sel, setSel] = useState(null);
  const event = state.events.find(e=>e.id===state.activeEventId);
  if (!event) return <div className="page"><div className="empty"><span className="empty-ico">👥</span><div className="empty-txt">No event selected</div></div></div>;

  const allS = event.animals.flatMap(a=>a.shareholders.map(s=>({...s,animal:a})));
  const filtered = filter==="all" ? allS : allS.filter(s=>s.paymentStatus===filter||s.deliveryStatus===filter);

  return (
    <div className="page">
      <div className="sec-header"><div className="sec-title">All Shariks</div><span className="sec-badge">{allS.length}</span></div>
      <div className="chip-row" style={{marginBottom:14}}>
        {["all","paid","pending","delivered"].map(f=>(
          <div key={f} className={`chip ${filter===f?"active":""}`} onClick={()=>setFilter(f)}>{f.charAt(0).toUpperCase()+f.slice(1)}</div>
        ))}
      </div>
      {filtered.length===0 ? (
        <div className="empty"><span className="empty-ico">🔍</span><div className="empty-txt">No results</div></div>
      ) : filtered.map(s=>{
        const kg = s.animal.parts.reduce((sum,p)=>sum+Number(p.totalKg),0);
        const ps = s.animal.shareholders.length>0?kg/s.animal.shareholders.length:0;
        return (
          <div className="sharik-card" key={s.id+s.animal.id} onClick={()=>setSel({sharik:s,animal:s.animal})}>
            <div className="avatar" style={{background:avatarColor(s.name)}}>{initials(s.name)}</div>
            <div style={{flex:1,minWidth:0}}>
              <div className="sharik-name">{s.name}</div>
              <div className="sharik-sub">{s.animal.name} · {ps.toFixed(2)} kg</div>
              {s.specialRequest&&<div className="sharik-req">📝 {s.specialRequest}</div>}
            </div>
            <div className="sharik-right">
              <span className={`badge badge-${s.paymentStatus}`}>{s.paymentStatus}</span>
              <span className={`delivery-tag ${s.deliveryStatus==="delivered"?"done":""}`}>
                {s.deliveryStatus==="delivered"?"✅":s.deliveryStatus==="collected"?"🏠":"⏳"}
              </span>
            </div>
          </div>
        );
      })}
      {sel && (
        <SharikDetailModal
          sharik={sel.sharik} animal={sel.animal} eventName={event.name}
          onClose={()=>setSel(null)}
          onUpdate={updated=>{
            onUpdate(prev=>({...prev,events:prev.events.map(ev=>ev.id!==prev.activeEventId?ev:{...ev,animals:ev.animals.map(a=>a.id!==sel.animal.id?a:{...a,shareholders:a.shareholders.map(sh=>sh.id===updated.id?updated:sh)})})}));
            setSel({...sel,sharik:updated});
          }}
          onDelete={id=>{
            onUpdate(prev=>({...prev,events:prev.events.map(ev=>ev.id!==prev.activeEventId?ev:{...ev,animals:ev.animals.map(a=>a.id!==sel.animal.id?a:{...a,shareholders:a.shareholders.filter(sh=>sh.id!==id)})})}));
            setSel(null);
          }}
        />
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   ANIMALS SCREEN
   ═══════════════════════════════════════════════════════════════════════════ */
function AnimalsScreen({ state, onNav, setDetailAnimal }) {
  const event = state.events.find(e=>e.id===state.activeEventId);
  if (!event) return <div className="page"><div className="empty"><span className="empty-ico">🐄</span><div className="empty-txt">No event selected</div></div></div>;
  return (
    <div className="page">
      <div className="sec-header">
        <div className="sec-title">Animals</div>
        <button className="btn btn-ghost btn-sm" onClick={()=>onNav("addAnimal")}>＋ Add</button>
      </div>
      {event.animals.length===0 && <div className="empty"><span className="empty-ico">🐄</span><div className="empty-txt">No animals yet</div></div>}
      {event.animals.map(animal=>{
        const kg = animal.parts.reduce((s,p)=>s+Number(p.totalKg),0);
        const ps = animal.shareholders.length>0?kg/animal.shareholders.length:0;
        const delCt = animal.shareholders.filter(s=>s.deliveryStatus==="delivered"||s.deliveryStatus==="collected").length;
        return (
          <div className="animal-card" key={animal.id} onClick={()=>{ setDetailAnimal(animal.id); onNav("animalDetail"); }}>
            <div className="animal-card-body">
              <div className="animal-emoji-wrap">{ANIMAL_ICONS[animal.type]||"🐄"}</div>
              <div className="animal-info">
                <div className="animal-name">{animal.name}</div>
                <div className="animal-meta">{animal.shareholders.length} shareholders · {kg.toFixed(1)} kg</div>
                <div className="animal-per-share">≈ {ps.toFixed(2)} kg/share · {delCt}/{animal.shareholders.length} delivered</div>
              </div>
              <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:6}}>
                <div className="animal-arrow">›</div>
              </div>
            </div>
            <div className="animal-progress">
              <div className="animal-progress-fill" style={{width:animal.shareholders.length?`${delCt/animal.shareholders.length*100}%`:"0%"}}/>
            </div>
          </div>
        );
      })}
      <button className="btn btn-ghost" style={{width:"100%",marginTop:8}} onClick={()=>onNav("addAnimal")}>＋ Add Animal</button>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   EVENTS SCREEN
   ═══════════════════════════════════════════════════════════════════════════ */
function EventsScreen({ state, onSetActive, onAddEvent }) {
  const [showAdd, setShowAdd] = useState(false);
  const [name, setName] = useState(`Eid-ul-Adha ${new Date().getFullYear()}`);
  return (
    <div className="page">
      <div className="sec-header">
        <div className="sec-title">History & Events</div>
        <button className="btn btn-ghost btn-sm" onClick={()=>setShowAdd(true)}>＋ New</button>
      </div>
      {state.events.map(ev=>{
        const total = ev.animals.reduce((s,a)=>s+a.shareholders.length,0);
        return (
          <div key={ev.id} className={`event-card ${ev.id===state.activeEventId?"active-event":""}`} onClick={()=>onSetActive(ev.id)}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8}}>
              <div className="event-name">{ev.id===state.activeEventId&&<span style={{color:"var(--primary)",marginRight:6}}>●</span>}{ev.name}</div>
              {ev.id===state.activeEventId&&<span className="badge badge-paid">Active</span>}
            </div>
            <div className="event-meta">{ev.animals.length} animals · {total} shareholders</div>
          </div>
        );
      })}
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
              <button className="btn btn-primary" style={{flex:1}} onClick={()=>{ if(name){ onAddEvent(name); setShowAdd(false); } }}>Create</button>
              <button className="btn btn-surface" onClick={()=>setShowAdd(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   ADD ANIMAL MODAL
   ═══════════════════════════════════════════════════════════════════════════ */
function AddAnimalModal({ onClose, onAdd }) {
  const [f, setF] = useState({ name:"", type:"cow", liveWeight:"", notes:"" });
  const s = (k,v) => setF(p=>({...p,[k]:v}));
  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={e=>e.stopPropagation()}>
        <div className="modal-handle"/>
        <div className="modal-title">Add Animal</div>
        <div className="form-group">
          <label className="form-label">Animal Name *</label>
          <input className="form-input" value={f.name} onChange={e=>s("name",e.target.value)} placeholder="e.g. Cow #1, Black Goat..."/>
        </div>
        <div className="form-group">
          <label className="form-label">Type</label>
          <div className="type-grid">
            {Object.entries(ANIMAL_ICONS).map(([t,ic])=>(
              <button key={t} className={`type-btn ${f.type===t?"sel":""}`} onClick={()=>s("type",t)}>{ic} {t.charAt(0).toUpperCase()+t.slice(1)}</button>
            ))}
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Live Weight (kg) — optional</label>
          <input className="form-input" type="number" value={f.liveWeight} onChange={e=>s("liveWeight",e.target.value)} placeholder="e.g. 350"/>
        </div>
        <div className="form-group">
          <label className="form-label">Notes</label>
          <input className="form-input" value={f.notes} onChange={e=>s("notes",e.target.value)} placeholder="Farmer name, purchase info..."/>
        </div>
        <div className="btn-row">
          <button className="btn btn-primary" style={{flex:1}} onClick={()=>f.name&&onAdd({...f,id:mkId(),liveWeight:Number(f.liveWeight)||0,parts:DEFAULT_PARTS.map(p=>({...p,id:mkId()})),shareholders:[],checklist:CHECKLIST.map(()=>false)})}>
            Add Animal
          </button>
          <button className="btn btn-surface" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   BUTCHER MODE
   ═══════════════════════════════════════════════════════════════════════════ */
function ButcherMode({ animal, onUpdate, onBack, toast }) {
  const [sel, setSel] = useState(null);
  const [val, setVal] = useState("");
  const press = n => {
    if(n==="⌫") setVal(v=>v.slice(0,-1));
    else if(n===".") { if(!val.includes(".")) setVal(v=>v+"."); }
    else setVal(v=>(v+n).slice(0,7));
  };
  const save = () => {
    if(!sel||!val) return;
    onUpdate({...animal, parts:animal.parts.map(p=>p.id===sel?{...p,totalKg:Number(val)}:p)});
    const nm = animal.parts.find(p=>p.id===sel)?.name;
    toast(`✓ ${nm}: ${val} kg`);
    setVal(""); setSel(null);
  };
  return (
    <div className="butcher-wrap">
      <div className="butcher-header">
        <div>
          <div className="butcher-title">🎯 Butcher Mode</div>
          <div style={{fontSize:11,color:"var(--text-3)",marginTop:2}}>{animal.name} · tap a part to enter weight</div>
        </div>
        <button className="icon-btn" onClick={onBack} style={{color:"var(--text-2)"}}>✕</button>
      </div>
      <div className="butcher-content">
        <div className="bismillah">بِسْمِ اللَّهِ</div>
        <div className="butcher-parts-grid">
          {animal.parts.map(p=>(
            <div key={p.id} className={`butcher-part ${sel===p.id?"sel":""}`} onClick={()=>{ setSel(p.id); setVal(String(p.totalKg||"")); }}>
              <div className="bp-icon">{getPI(p.name)}</div>
              <div className="bp-name">{p.name}</div>
              <div className="bp-kg">{p.totalKg||"—"}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="numpad-area">
        {sel ? (
          <>
            <div style={{fontSize:11,color:"var(--text-3)",textAlign:"center",marginBottom:4}}>
              {animal.parts.find(p=>p.id===sel)?.name}
            </div>
            <div className="numpad-display">{val||"0"}<span className="numpad-unit">kg</span></div>
            <div className="numpad-grid">
              {["1","2","3","4","5","6","7","8","9",".","0","⌫"].map(n=>(
                <div key={n} className={`numpad-key ${n==="⌫"?"del":""}`} onClick={()=>press(n)}>{n}</div>
              ))}
            </div>
            <div className="numpad-key save-key" onClick={save}>✓ Save Weight</div>
          </>
        ) : (
          <div style={{textAlign:"center",padding:"16px 0",color:"var(--text-3)",fontSize:14,fontWeight:600}}>
            ← Tap a part above to enter weight
          </div>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   WEIGHT ESTIMATOR
   ═══════════════════════════════════════════════════════════════════════════ */
function Estimator({ onBack }) {
  const [type, setType] = useState("cow");
  const [lw, setLw] = useState("");
  const res = useMemo(()=>{
    if(!lw||!Number(lw)) return null;
    const r=YIELD[type], w=Number(lw);
    return {
      meat:  (w*r.meat).toFixed(1),
      bone:  (w*r.bone).toFixed(1),
      fat:   (w*r.fat).toFixed(1),
      offal: (w*r.offal).toFixed(1),
      total: (w*(r.meat+r.bone+r.fat+r.offal)).toFixed(1),
    };
  },[type,lw]);
  return (
    <div className="page">
      <button className="back-btn" onClick={onBack}>← Back</button>
      <div style={{fontFamily:"Outfit,sans-serif",fontSize:24,fontWeight:800,color:"var(--text-1)",marginBottom:4}}>⚖️ Weight Estimator</div>
      <div style={{fontSize:13,color:"var(--text-3)",marginBottom:20,lineHeight:1.5}}>Enter live weight to estimate meat yield before slaughter</div>
      <div style={{background:"var(--surface)",border:"1px solid var(--border)",borderRadius:"var(--r-xl)",padding:18,marginBottom:16}}>
        <div className="form-group">
          <label className="form-label">Animal Type</label>
          <div className="type-grid">
            {Object.entries(ANIMAL_ICONS).map(([t,ic])=>(
              <button key={t} className={`type-btn ${type===t?"sel":""}`} onClick={()=>setType(t)}>{ic} {t.charAt(0).toUpperCase()+t.slice(1)}</button>
            ))}
          </div>
        </div>
        <div className="form-group" style={{marginBottom:0}}>
          <label className="form-label">Live Weight (kg)</label>
          <input className="form-input" type="number" value={lw} onChange={e=>setLw(e.target.value)} placeholder="e.g. 350"/>
        </div>
      </div>
      {res && (
        <div className="est-result">
          <div style={{fontFamily:"Outfit,sans-serif",fontSize:16,fontWeight:700,color:"var(--text-1)",marginBottom:12}}>
            Estimated Yield from {lw}kg {ANIMAL_ICONS[type]}
          </div>
          {[["🥩","Solid Meat",res.meat],["🦴","Bone",res.bone],["🧈","Fat",res.fat],["❤️","Offal",res.offal]].map(([ic,l,v])=>(
            <div className="est-row" key={l}><div className="est-lbl"><span>{ic}</span>{l}</div><div className="est-val">{v} kg</div></div>
          ))}
          <div className="est-row">
            <div className="est-lbl" style={{color:"var(--text-1)",fontWeight:800}}>📦 Total Usable</div>
            <div className="est-val" style={{fontSize:18}}>{res.total} kg</div>
          </div>
          <div style={{marginTop:12,fontSize:11,color:"var(--text-3)",background:"var(--surface-3)",borderRadius:"var(--r-md)",padding:"10px 12px",lineHeight:1.5}}>
            ℹ️ Estimates based on average industry yield ratios. Actual results vary by breed, age, and method.
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   BOTTOM NAV
   ═══════════════════════════════════════════════════════════════════════════ */
function BottomNav({ active, onNav }) {
  const items = [["home","🏠","Home"],["animals","🐄","Animals"],["shariks","👥","Shariks"],["events","🗓","Events"]];
  return (
    <nav className="bottom-nav">
      {items.map(([id,ic,lbl])=>(
        <button key={id} className={`nav-item ${active===id?"active":""}`} onClick={()=>onNav(id)}>
          <span className="nav-icon">{ic}</span>
          <span className="nav-label">{lbl}</span>
          {active===id && <div className="nav-indicator"/>}
        </button>
      ))}
    </nav>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   ROOT APP
   ═══════════════════════════════════════════════════════════════════════════ */
export default function App() {
  const [state, setState] = useState(()=>{ try{ const d=localStorage.getItem("sn_v2"); return d?JSON.parse(d):INIT; }catch{ return INIT; } });
  const [screen, setScreen] = useState("home");
  const [detailId, setDetailId] = useState(null);
  const [toast, setToast] = useState("");
  const [showAddAnimal, setShowAddAnimal] = useState(false);

  useEffect(()=>{ try{ localStorage.setItem("sn_v2",JSON.stringify(state)); }catch{} },[state]);

  const showToast = msg => { setToast(msg); setTimeout(()=>setToast(""),2600); };

  const nav = useCallback((s,param=null)=>{
    if(s==="addAnimal"){ setShowAddAnimal(true); return; }
    setScreen(s);
    if(param!==null) setDetailId(param);
  },[]);

  const activeEvent = state.events.find(e=>e.id===state.activeEventId);

  const updateAnimalInState = useCallback(updated => {
    setState(prev=>({...prev,events:prev.events.map(ev=>ev.id!==prev.activeEventId?ev:{...ev,animals:ev.animals.map(a=>a.id===updated.id?updated:a)})}));
  },[]);

  const addAnimal = animal => {
    setState(prev=>({...prev,events:prev.events.map(ev=>ev.id!==prev.activeEventId?ev:{...ev,animals:[...ev.animals,animal]})}));
    setShowAddAnimal(false);
    showToast("Animal added ✓");
  };

  const addEvent = name => {
    const ev = {id:mkId(),name,year:new Date().getFullYear(),createdAt:new Date().toISOString(),animals:[]};
    setState(prev=>({...prev,events:[...prev.events,ev],activeEventId:ev.id}));
    showToast("Event created ✓");
  };

  const setActiveEvent = id => {
    setState(prev=>({...prev,activeEventId:id}));
    setScreen("home");
    showToast("Switched event ✓");
  };

  /* SPECIAL FULL SCREENS (no header/nav) */
  if (screen==="butcherMode" && activeEvent) {
    const animal = activeEvent.animals.find(a=>a.id===detailId) || activeEvent.animals[0];
    if (animal) return (
      <>
        <style>{DS}</style>
        <Toast msg={toast}/>
        <ButcherMode animal={animal} onUpdate={updateAnimalInState} onBack={()=>setScreen("animalDetail")} toast={showToast}/>
      </>
    );
  }

  /* ANIMAL DETAIL (uses its own header) */
  if (screen==="animalDetail" && activeEvent) {
    const animal = activeEvent.animals.find(a=>a.id===detailId);
    if (animal) return (
      <>
        <style>{DS}</style>
        <Toast msg={toast}/>
        <AnimalDetail
          animal={animal}
          eventName={activeEvent.name}
          onBack={()=>setScreen("home")}
          onUpdate={updateAnimalInState}
          toast={showToast}
        />
      </>
    );
  }

  const MAIN_TABS = ["home","animals","shariks","events"];

  return (
    <>
      <style>{DS}</style>
      <Toast msg={toast}/>
      <div className="app">
        {/* Header */}
        <div className="app-header">
          <div className="header-row">
            <div className="logo-wrap">
              <div className="logo-title">☽ SharikNama</div>
              <div className="logo-sub">Qurbani Management</div>
            </div>
            <div className="header-actions">
              <div className="icon-btn" onClick={()=>{ setScreen("estimator"); }} title="Weight Estimator">⚖️</div>
              <div className="icon-btn" onClick={()=>{ if(activeEvent?.animals.length){ setDetailId(activeEvent.animals[0].id); setScreen("butcherMode"); } else showToast("Add an animal first"); }} title="Butcher Mode">🎯</div>
            </div>
          </div>
          {activeEvent && (
            <div className="event-chip" onClick={()=>setScreen("events")}>
              <div className="event-chip-dot"/>
              <span className="event-chip-name">{activeEvent.name}</span>
              <span className="event-chip-arrow">▼</span>
            </div>
          )}
        </div>

        {/* Screen Content */}
        <div className="scroll-area">
          {screen==="home"    && <HomeScreen    state={state} onNav={nav} setDetailAnimal={id=>{ setDetailId(id); }}/>}
          {screen==="animals" && <AnimalsScreen state={state} onNav={nav} setDetailAnimal={id=>setDetailId(id)}/>}
          {screen==="shariks" && <ShariksScreen state={state} onUpdate={setState}/>}
          {screen==="events"  && <EventsScreen  state={state} onSetActive={setActiveEvent} onAddEvent={addEvent}/>}
          {screen==="estimator"&&<Estimator     onBack={()=>setScreen("home")}/>}
        </div>

        {/* Bottom Nav */}
        <BottomNav active={MAIN_TABS.includes(screen)?screen:"home"} onNav={s=>{ setScreen(s); }}/>
      </div>

      {showAddAnimal && <AddAnimalModal onClose={()=>setShowAddAnimal(false)} onAdd={addAnimal}/>}
    </>
  );
}
