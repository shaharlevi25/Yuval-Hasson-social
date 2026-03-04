import { useState, useEffect, useRef } from "react";

function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function Reveal({ children, delay = 0, y = 28 }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : `translateY(${y}px)`,
      transition: `opacity 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
    }}>
      {children}
    </div>
  );
}

const WA_NUMBER = "972549422502";
const WA_LINK = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("היי יובל! ראיתי את דף הנחיתה שלך ורציתי לשמוע עוד 😊")}`;

// סרטוני/תמונות עבודות — הכניסי קבצים לתיקיית public/portfolio/
const PORTFOLIO = [
  { src: "/Portfolio/yuval1.mp4", thumb: "/Portfolio/yuval1.mp4", type: "video", label: "טיקטוק",   client: "עבודה 1" },
  { src: "/Portfolio/yuval2.mp4", thumb: "/Portfolio/yuval2.mp4", type: "video", label: "אינסטגרם", client: "עבודה 2" },
];

const REVIEWS = [
  {
    text: "אני רוצה להמליץ על יובל! לפני מקצועיות ואיכות היא קודם כל בן אדם! מקשיבה, מכילה ומבינה את הצרכים של העסק, מקצועית ויצירתית עם מחשבה מחוץ לקופסה והתאמה לקונספט ולקהל היעד. והכי חשוב מביאה תוצאות והכל מתנהל בוייב פשוט מושלם. לא תתאכזבו, מומלצת!",
    stars: 5,
  },
  {
    text: "יובלי היקרה, מעבר לזה שאת צלמת סופר מוכשרת, את גם אשת שירות ומכירות מעולה. לא בכל יום פוגשים אדם אחד שמשלב בתוכו כל כך הרבה מיומנויות, וכל זה בטבעיות ומקצועיות רבה. מאוד משקיעה בנו כלקוחות ודואגת לרדוף אחרינו, ולא אנחנו אחרייך. את מנהלת את עצמך ואותנו יופי יופי :)",
    stars: 5,
  },
  {
    text: "ממליץ מאד על יובל — מקצוענית, עניינית, תמיד זמינה, סבלנית, והכי חשוב תוצאות מהירות!!!",
    stars: 5,
  },
];

export default function App() {
  const [scrolled,    setScrolled]    = useState(false);
  const [menuOpen,    setMenuOpen]    = useState(false);
  const [openFaq,     setOpenFaq]     = useState(null);
  const [slideIndex,  setSlideIndex]  = useState(0);
  const [reviewIndex, setReviewIndex] = useState(0);
  const reviewTimer = useRef(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Auto-rotate reviews every 15s
  useEffect(() => {
    reviewTimer.current = setInterval(() => {
      setReviewIndex(i => (i + 1) % REVIEWS.length);
    }, 15000);
    return () => clearInterval(reviewTimer.current);
  }, []);

  const navTo = (id) => {
    setMenuOpen(false);
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 60);
  };

  const prevSlide = () => setSlideIndex(i => (i - 1 + PORTFOLIO.length) % PORTFOLIO.length);
  const nextSlide = () => setSlideIndex(i => (i + 1) % PORTFOLIO.length);

  const services = [
    { icon: "🎬", title: "צילום ועריכת תוכן",  text: "צילום ועריכת סרטונים ותמונות ברמה מקצועית שמציגות אותך בצורה הכי טובה שיש." },
    { icon: "🎵", title: "ניהול טיקטוק",        text: "טרנדים, מוזיקה, אלגוריתם אני על זה. אתם רק צריכים להיות אתם." },
    { icon: "🎯", title: "אסטרטגיה ומיתוג",     text: "בונים יחד זהות ברורה צבע, שפה, קהל יעד. הכל מדויק לפי הצורך שלכם." },
  ];

  const steps = [
    { num: "1", title: "מתחילים לדבר",       text: "שיחת היכרות חופשית. מכירים את העסק לעומק מקהל יעד ועד המתחרים שלך." },
    { num: "2", title: "בונים אסטרטגיה",      text: "ביחד נפתח מחשבה אסטרטגית. כי מי יודע למכור אותנו יותר מעצמנו?" },
    { num: "3", title: "יוצרים תוכן אמיתי",  text: "בשפה שלנו, לא AI. אותנטי, אמין ומוכר." },
    { num: "4", title: "מציגים את המקפצה",   text: "לכל תהליך יש לפני ואחרי. נתונים, חשיפות, מיתוג — רואים את התוצאות." },
  ];

  const faqs = [
    { q: "למה לא לכתוב תסריטים עם AI?",   a: "כי הקהל שלך לא רובוט. אם תישמעי כמו רובוט תפספסי את האותנטיות שהם מחפשים. השפה שלך תמיד תנצח." },
    { q: "כמה זמן לוקח לראות תוצאות?",     a: "תהליך הסושיאל ממכר — ברגע שמתחילים רואים שינוי. בסוף כל תהליך אני מציגה השוואת לפני ואחרי מלאה." },
    { q: "האם סושיאל מדיה מתאים לכל עסק?", a: "בהחלט. פעם פרסמו בשלטי חוצות — היום כל הלקוחות הפוטנציאליים נמצאים ברשתות החברתיות." },
    { q: "מה הופך את הגישה שלך לשונה?",    a: "אני חיה את הרשתות ומעורבת בתוכן הטרנדי של היום. אני לא מנהלת דפים — אני בונה נוכחות אמיתית שנשמעת כמוך." },
  ];

  const NAV = [
    { label: "אודות",   id: "about"     },
    { label: "שירותים", id: "services"  },
    { label: "עבודות",  id: "portfolio" },
    { label: "תהליך",   id: "process"   },
    { label: "ביקורות", id: "reviews"   },
  ];

  // visible portfolio cards (up to 3 at a time on desktop)
  const visibleCount = 3;
  const visibleItems = Array.from({ length: visibleCount }, (_, i) =>
    PORTFOLIO[(slideIndex + i) % PORTFOLIO.length]
  );

  return (
    <div dir="rtl" style={{ fontFamily: "'Heebo', sans-serif", background: "#FAF6F0", color: "#2C1F14", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;600;700;900&family=Noto+Serif+Hebrew:wght@300;400;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --cream: #FAF6F0; --sand: #EDE5D8; --linen: #F2EBE1;
          --brown: #6B4F3A; --dark: #2C1F14; --mid: #7A6354; --light: #B8A898;
          --wa: #25D366;
        }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: var(--brown); border-radius: 4px; }
        .serif { font-family: 'Noto Serif Hebrew', Georgia, serif; }

        .btn-primary {
          display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem;
          background: var(--brown); color: #FAF6F0; border: none;
          padding: 0.95rem 2.2rem; border-radius: 4px;
          font-family: inherit; font-size: 0.95rem; font-weight: 600;
          letter-spacing: 0.04em; cursor: pointer; white-space: nowrap;
          transition: background 0.3s, transform 0.25s, box-shadow 0.3s;
        }
        .btn-primary:hover { background: #4f3828; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(107,79,58,0.25); }

        .btn-wa {
          display: inline-flex; align-items: center; justify-content: center; gap: 0.6rem;
          background: var(--wa); color: white; border: none;
          padding: 1.1rem 3rem; border-radius: 4px;
          font-family: inherit; font-size: 1rem; font-weight: 700;
          cursor: pointer; white-space: nowrap;
          transition: background 0.3s, transform 0.25s, box-shadow 0.3s;
        }
        .btn-wa:hover { background: #1ebe5d; transform: translateY(-2px); box-shadow: 0 8px 28px rgba(37,211,102,0.35); }

        .btn-secondary {
          display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem;
          background: transparent; color: var(--brown); border: 1.5px solid var(--brown);
          padding: 0.9rem 2.2rem; border-radius: 4px;
          font-family: inherit; font-size: 0.95rem; font-weight: 600;
          cursor: pointer; white-space: nowrap; transition: all 0.3s;
        }
        .btn-secondary:hover { background: var(--brown); color: #FAF6F0; }

        .service-card {
          background: white; border: 1px solid rgba(107,79,58,0.1);
          border-radius: 8px; padding: 2rem; height: 100%;
          transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s;
        }
        .service-card:hover { transform: translateY(-4px); box-shadow: 0 12px 36px rgba(107,79,58,0.1); border-color: rgba(107,79,58,0.25); }

        .p-card {
          border-radius: 12px; overflow: hidden; position: relative;
          background: var(--sand); aspect-ratio: 9/16; flex-shrink: 0;
          transition: transform 0.3s, box-shadow 0.3s; cursor: pointer;
        }
        .p-card:hover { transform: translateY(-5px); box-shadow: 0 16px 40px rgba(107,79,58,0.18); }
        .p-card img, .p-card video { width: 100%; height: 100%; object-fit: cover; display: block; }
        .p-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(44,31,20,0.78) 0%, transparent 55%);
          opacity: 0; transition: opacity 0.3s;
          display: flex; flex-direction: column; justify-content: flex-end; padding: 1.1rem;
        }
        .p-card:hover .p-overlay { opacity: 1; }

        .carousel-btn {
          width: 44px; height: 44px; border-radius: 50%;
          background: white; border: 1.5px solid rgba(107,79,58,0.2);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; font-size: 1rem; color: var(--brown);
          transition: all 0.25s; flex-shrink: 0;
          box-shadow: 0 2px 12px rgba(107,79,58,0.1);
        }
        .carousel-btn:hover { background: var(--brown); color: white; border-color: var(--brown); }

        .review-card {
          background: white; border-radius: 12px; padding: 2.2rem;
          border: 1px solid rgba(107,79,58,0.1);
          box-shadow: 0 4px 24px rgba(107,79,58,0.06);
          transition: all 0.5s ease;
        }

        .package-card {
          background: white; border: 1.5px solid rgba(107,79,58,0.12);
          border-radius: 12px; padding: 2.2rem; height: 100%;
          transition: transform 0.3s, box-shadow 0.3s;
          position: relative;
        }
        .package-card:hover { transform: translateY(-4px); box-shadow: 0 12px 36px rgba(107,79,58,0.1); }
        .package-highlight {
          border-color: var(--brown);
          background: var(--dark);
          color: #FAF6F0;
        }

        .faq-item { border-bottom: 1px solid rgba(107,79,58,0.12); overflow: hidden; }
        .faq-item:first-child { border-top: 1px solid rgba(107,79,58,0.12); }
        .faq-btn {
          width: 100%; background: none; border: none; padding: 1.4rem 0;
          display: flex; justify-content: space-between; align-items: center; gap: 1rem;
          cursor: pointer; font-family: inherit; text-align: right;
          font-size: 1rem; font-weight: 600; color: var(--dark); transition: color 0.25s;
        }
        .faq-btn:hover { color: var(--brown); }
        .faq-icon {
          width: 26px; height: 26px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          border-radius: 50%; border: 1.5px solid currentColor; font-size: 1rem;
          transition: transform 0.35s, background 0.25s, color 0.25s;
        }

        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        .float { animation: float 6s ease-in-out infinite; }

        .mob-menu {
          position: fixed; inset: 0; z-index: 300;
          background: var(--cream); padding: 5rem 2rem 2rem;
          display: flex; flex-direction: column; gap: 0; overflow-y: auto;
          transform: translateX(100%); transition: transform 0.38s cubic-bezier(0.16,1,0.3,1);
        }
        .mob-menu.open { transform: translateX(0); }
        .mob-menu-link {
          font-size: 1.3rem; font-weight: 700; color: var(--dark);
          text-decoration: none; border-bottom: 1px solid rgba(107,79,58,0.1);
          padding: 1rem 0; display: block; transition: color 0.2s;
        }
        .mob-menu-link:hover { color: var(--brown); }

        .desktop-nav { display: flex; }
        .hamburger   { display: none; }

        @media (max-width: 900px) {
          .carousel-desktop { display: none !important; }
          .carousel-mobile  { display: block !important; }
          .carousel-btn { width: 38px !important; height: 38px !important; font-size: 1.1rem !important; }
          .hero-bg-mobile { display: block !important; }
          .hero-photo { display: none !important; }
          .port-desktop { display: none !important; }
          .port-mobile  { display: block !important; }
          .desktop-nav { display: none !important; }
          .hamburger   { display: flex !important; }
          .hero-grid   { grid-template-columns: 1fr !important; }
          .hero-photo  { order: -1; max-width: 260px; margin: 0 auto; }
          .about-grid  { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
          .srv-grid    { grid-template-columns: 1fr 1fr !important; }
          .steps-grid  { grid-template-columns: 1fr 1fr !important; gap: 2rem !important; }
          .pkg-grid    { grid-template-columns: 1fr !important; max-width: 420px !important; margin: 0 auto; }
          .ba-grid     { grid-template-columns: 1fr !important; gap: 1rem !important; }
          .ba-arrow    { display: none !important; }
          .ba-before, .ba-after { border-radius: 8px !important; }
          .float-badge { display: none !important; }
          .carousel-inner { gap: 1rem !important; }
        }
        @media (max-width: 600px) {
          .hero-title { font-size: clamp(1.5rem, 8vw, 2.5rem) !important; white-space: normal !important; }
          .hero-section { padding: 7rem 1.2rem 3rem !important; }
          .hero-text p { max-width: 100% !important; }
          section { padding-left: 1.2rem !important; padding-right: 1.2rem !important; }
          .srv-grid    { grid-template-columns: 1fr !important; }
          .steps-grid  { grid-template-columns: 1fr !important; }
          .btn-row { flex-direction: row !important; flex-wrap: nowrap !important; gap: 0.5rem !important; width: 100% !important; }
          .btn-row a { flex: 1; min-width: 0; display: block; }
          .btn-row .btn-wa { width: 100% !important; font-size: 0.75rem !important; padding: 0.7rem 0.3rem !important; justify-content: center; gap: 0.25rem !important; border-radius: 4px; }
          .btn-row .btn-secondary { width: 100% !important; font-size: 0.75rem !important; padding: 0.7rem 0.3rem !important; border-radius: 4px; }
          .btn-row .btn-wa svg { display: none !important; }
          .btn-row .btn-secondary { flex: 1; }
        }
      `}</style>

      {/* ── NAVBAR ── */}
      <nav style={{ position: "fixed", top: 0, right: 0, left: 0, zIndex: 200, padding: "1rem 2rem", display: "flex", justifyContent: "space-between", alignItems: "center", background: scrolled ? "rgba(250,246,240,0.95)" : "transparent", backdropFilter: scrolled ? "blur(16px)" : "none", borderBottom: scrolled ? "1px solid rgba(107,79,58,0.1)" : "none", transition: "all 0.4s" }}>
        <img src="/logo.svg" alt="יובל חסון" style={{ height: 42 }} onError={e => e.target.style.display = "none"} />
        <div className="desktop-nav" style={{ gap: "1.8rem", alignItems: "center" }}>
          {NAV.map(n => (
            <button key={n.id} onClick={() => navTo(n.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--mid)", fontSize: "0.86rem", fontWeight: 500, fontFamily: "inherit", transition: "color 0.25s" }}
              onMouseEnter={e => e.target.style.color = "var(--dark)"}
              onMouseLeave={e => e.target.style.color = "var(--mid)"}>
              {n.label}
            </button>
          ))}
          <a href={WA_LINK} target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
            <button className="btn-wa" style={{ padding: "0.6rem 1.4rem", fontSize: "0.82rem" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.115.549 4.103 1.514 5.829L.055 23.454a.75.75 0 0 0 .918.918l5.629-1.459A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.712 9.712 0 0 1-4.953-1.356l-.355-.211-3.681.955.977-3.578-.232-.368A9.712 9.712 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/></svg>
              צרי קשר
            </button>
          </a>
        </div>
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} style={{ background: "none", border: "none", cursor: "pointer", flexDirection: "column", gap: 5, padding: "0.5rem" }}>
          {[0,1,2].map(i => (
            <span key={i} style={{ display: "block", width: 24, height: 2, background: "var(--dark)", borderRadius: 2, transition: "all 0.3s", transform: menuOpen ? (i===0 ? "rotate(45deg) translate(5px,5px)" : i===2 ? "rotate(-45deg) translate(5px,-5px)" : "scaleX(0)") : "none" }} />
          ))}
        </button>
      </nav>

      {/* Mobile menu */}
      <div className={`mob-menu ${menuOpen ? "open" : ""}`}>
        <button onClick={() => setMenuOpen(false)} style={{ position: "absolute", top: "1.2rem", left: "1.5rem", background: "none", border: "none", fontSize: "1.4rem", cursor: "pointer", color: "var(--dark)" }}>✕</button>
        {NAV.map(n => <a key={n.id} className="mob-menu-link" href={`#${n.id}`} onClick={() => navTo(n.id)}>{n.label}</a>)}
        <a href={WA_LINK} target="_blank" rel="noreferrer" style={{ textDecoration: "none", marginTop: "1.5rem" }}>
          <button className="btn-wa" style={{ width: "100%" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.115.549 4.103 1.514 5.829L.055 23.454a.75.75 0 0 0 .918.918l5.629-1.459A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.712 9.712 0 0 1-4.953-1.356l-.355-.211-3.681.955.977-3.578-.232-.368A9.712 9.712 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/></svg>
            שלחי הודעה בוואטסאפ
          </button>
        </a>
      </div>

      {/* ── HERO ── */}
      <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "13rem 1.2rem 3rem", position: "relative", overflow: "hidden" }}>
        {/* Background image — mobile only, 25% opacity */}
        <div className="hero-bg-mobile" style={{
          position: "absolute", inset: 0, zIndex: 0,
          backgroundImage: "url('/yuval-photo.jpeg')",
          backgroundSize: "cover", backgroundPosition: "top center",
          opacity: 0.40,
          display: "none",
        }} />
        <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%", display: "grid", gridTemplateColumns: "1.15fr 0.85fr", gap: "4rem", alignItems: "flex-end", position: "relative", zIndex: 1 }} className="hero-grid">
          <div>
            <Reveal>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "rgba(107,79,58,0.08)", border: "1px solid rgba(107,79,58,0.18)", borderRadius: "4px", padding: "0.35rem 1rem", color: "var(--brown)", fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1.6rem", flexWrap: "wrap" }}>
                📸 צלמת ומנהלת רשתות חברתיות
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="serif" style={{ fontSize: "clamp(1.6rem, 6.5vw, 4.5rem)", fontWeight: 700, lineHeight: 1.15, marginBottom: "1.4rem" }}>
                תוכן אותנטי <span style={{ color: "var(--brown)" }}>זה תוכן טהור</span>
              </h1>
            </Reveal>
            <Reveal delay={0.14}>
              <p style={{ fontSize: "1.05rem", lineHeight: 1.95, color: "var(--mid)", maxWidth: 520, marginBottom: "0.8rem" }}>
                אני יובל חסון — חיה את הרשתות החברתיות ומעורבת בתוכן הטרנדי של היום.
              </p>
              <p style={{ fontSize: "1.05rem", lineHeight: 1.95, color: "var(--mid)", maxWidth: 520, marginBottom: "2.5rem" }}>
                הנישה שלי: לגרום לך להישמע בדיוק כמוך — אמיתי, אמין ומוכר.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }} className="btn-row">
                <a href={WA_LINK} target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
                  <button className="btn-wa">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.115.549 4.103 1.514 5.829L.055 23.454a.75.75 0 0 0 .918.918l5.629-1.459A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.712 9.712 0 0 1-4.953-1.356l-.355-.211-3.681.955.977-3.578-.232-.368A9.712 9.712 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/></svg>
                    שלח/י הודעה
                  </button>
                </a>
                <button className="btn-secondary" onClick={() => navTo("process")}>איך זה עובד?</button>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1} y={20}>
            <div className="hero-photo" style={{ position: "relative" }}>
              <div style={{ width: "100%", paddingBottom: "125%", borderRadius: "8px 8px 70px 8px", overflow: "hidden", background: "var(--sand)", boxShadow: "0 24px 60px rgba(107,79,58,0.14)", position: "relative" }}>
                <img src="/yuval-photo.jpeg" alt="יובל חסון" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
              </div>
              <div className="float float-badge" style={{ position: "absolute", bottom: 24, left: -20, background: "white", border: "1px solid rgba(107,79,58,0.15)", borderRadius: "8px", padding: "0.9rem 1.3rem", boxShadow: "0 8px 28px rgba(107,79,58,0.12)" }}>
                <p style={{ fontSize: "0.68rem", color: "var(--light)", marginBottom: "0.3rem", letterSpacing: "0.06em" }}>תוכן אמיתי</p>
                <p style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--dark)" }}>100% אותנטי ✓</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" style={{ background: "var(--sand)", padding: "6rem 2rem" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }} className="about-grid">
          <Reveal>
            <div>
              <p style={{ color: "var(--brown)", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "1rem" }}>מי אני</p>
              <h2 className="serif" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.7rem)", fontWeight: 700, lineHeight: 1.25, marginBottom: "1.8rem" }}>
                פעם שלטי חוצות.<br /><span style={{ color: "var(--brown)" }}>היום הרשתות שלך.</span>
              </h2>
              <p style={{ color: "var(--mid)", lineHeight: 2, marginBottom: "1.2rem" }}>
                אני צלמת ומשווקת ברשתות החברתיות.
                חיה את הרשתות, מעורבת בתוכן טרנדי ויודעת בדיוק מה הלקוחות שלך רוצים לפגוש ברשתות שגורם לאנשים לעצור ולצפות בתוכן שלכם.
              </p>
              <p style={{ color: "var(--mid)", lineHeight: 2, marginBottom: "1.2rem" }}>
                הנישה שלי להעביר את התוכן שהלקוח ירצה לשמוע מכם ושהנוכחות של המקצועיות והשירות שלכם יועבר במסר ברור ללקוח.
              </p>
              <p style={{ color: "var(--brown)", fontWeight: 600, fontSize: "0.95rem" }}>
                כיום יותר מ-80% מהלקוחות הפוטנציאליים שלך נמצאים שם.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div style={{ background: "white", borderRadius: 8, padding: "2.5rem", borderRight: "4px solid var(--brown)", boxShadow: "0 8px 32px rgba(107,79,58,0.07)" }}>
              <p className="serif" style={{ fontSize: "1.2rem", lineHeight: 1.8, color: "var(--dark)", fontStyle: "italic", marginBottom: "1.6rem" }}>
                "פעם הפרסום לא היה נגיש, היום אתה צריך להנגיש את הפרסום ללקוח שלך"
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "0.9rem" }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: "var(--sand)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem" }}>📸</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" style={{ padding: "6rem 2rem" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              {/* <p style={{ color: "var(--brown)", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "1rem" }}>מה אני עושה</p> */}
              <h2 className="serif" style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)", fontWeight: 700, lineHeight: 1.2 }}>
                שירותים שמייצרים<br /><span style={{ color: "var(--brown)" }}>נוכחות אמיתית</span>
              </h2>
            </div>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.4rem" }} className="srv-grid">
            {services.map((s, i) => (
              <Reveal key={i} delay={i * 0.09}>
                <div className="service-card">
                  <div style={{ width: 52, height: 52, borderRadius: 8, background: "var(--linen)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", marginBottom: "1.2rem" }}>{s.icon}</div>
                  <h3 style={{ fontWeight: 700, marginBottom: "0.7rem", fontSize: "1rem" }}>{s.title}</h3>
                  <p style={{ color: "var(--mid)", lineHeight: 1.8, fontSize: "0.9rem" }}>{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── QUOTE ── */}
      <div style={{ background: "var(--brown)", padding: "3.5rem 2rem", textAlign: "center" }}>
        <Reveal>
          <p className="serif" style={{ fontSize: "clamp(1.05rem, 2.5vw, 1.65rem)", color: "rgba(250,246,240,0.95)", fontStyle: "italic", lineHeight: 1.8, maxWidth: 820, margin: "0 auto" }}>
            "הקהל שלנו לא רובוט, אם יתסרטו אותנו, נפספס את האותנטיות שאנחנו רוצים להעביר. איזו שפה יותר אמינה מהשפה שלנו? אף רובוט לא יכול לדבר אותה."
          </p>

        </Reveal>
      </div>

      {/* ── PORTFOLIO — EPIC SECTION ── */}
      <section id="portfolio" style={{ background: "#8B6E52", padding: "0", overflow: "hidden", position: "relative" }}>
        {/* Grain overlay */}
        <div style={{ position: "absolute", inset: 0, zIndex: 1, backgroundImage: "radial-gradient(rgba(250,246,240,0.03) 1px, transparent 1px)", backgroundSize: "20px 20px", pointerEvents: "none" }} />

        {/* Header */}
        <div style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "4rem 2rem 2.5rem" }}>
          <Reveal>
            <p style={{ color: "rgba(250,246,240,0.6)", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "1rem" }}>עבודות</p>
            <h2 className="serif" style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", fontWeight: 700, lineHeight: 1.1, color: "#FAF6F0" }}>
              העבודות שלנו<br />
              <span style={{ color: "rgba(250,246,240,0.75)", fontStyle: "italic" }}>מדברות בעד עצמן</span>
            </h2>
            <p style={{ color: "rgba(250,246,240,0.45)", marginTop: "1rem", fontSize: "0.97rem", lineHeight: 1.7 }}>
              תוכן אמיתי &bull; תוצאות אמיתיות &bull; לקוחות מרוצים
            </p>
          </Reveal>
        </div>

        {/* ── DESKTOP: cinematic 3-up with featured center ── */}
        <div className="port-desktop" style={{ position: "relative", zIndex: 2, padding: "0 2rem 4rem", maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", gap: "1rem", alignItems: "stretch", justifyContent: "center" }}>
            {/* Prev button */}
            <button onClick={prevSlide} style={{ background: "rgba(250,246,240,0.06)", border: "1px solid rgba(250,246,240,0.1)", borderRadius: "50%", width: 48, height: 48, color: "#FAF6F0", fontSize: "1.2rem", cursor: "pointer", flexShrink: 0, alignSelf: "center", transition: "all 0.3s", backdropFilter: "blur(8px)" }}
              onMouseEnter={e => { e.target.background = "rgba(107,79,58,0.4)"; e.target.style.background = "rgba(107,79,58,0.5)"; }}
              onMouseLeave={e => { e.target.style.background = "rgba(250,246,240,0.06)"; }}>›</button>

            {/* Side card - smaller */}
            <div style={{ flex: "0 0 22%", aspectRatio: "9/16", borderRadius: 14, overflow: "hidden", opacity: 0.55, transform: "scale(0.92)", transition: "all 0.5s", position: "relative", background: "#2C1F14" }}>
              {PORTFOLIO[(slideIndex - 1 + PORTFOLIO.length) % PORTFOLIO.length].type === "video" ? (
                <video src={PORTFOLIO[(slideIndex - 1 + PORTFOLIO.length) % PORTFOLIO.length].src} muted playsInline loop style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <img src={PORTFOLIO[(slideIndex - 1 + PORTFOLIO.length) % PORTFOLIO.length].src} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="" />
              )}
            </div>

            {/* CENTER — big featured */}
            <div style={{ flex: "0 0 38%", aspectRatio: "9/16", borderRadius: 18, overflow: "hidden", position: "relative", background: "#2C1F14", boxShadow: "0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(250,246,240,0.1)" }}>
              {PORTFOLIO[slideIndex].type === "video" ? (
                <video key={slideIndex} src={PORTFOLIO[slideIndex].src} controls playsInline autoPlay muted loop
                  style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <img src={PORTFOLIO[slideIndex].src} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt={PORTFOLIO[slideIndex].client} />
              )}
              {/* glow ring */}
              <div style={{ position: "absolute", inset: -2, borderRadius: 20, border: "2px solid rgba(107,79,58,0.5)", pointerEvents: "none" }} />
              {/* label */}
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)", padding: "2rem 1.5rem 1.5rem" }}>
                <span style={{ display: "inline-block", background: "var(--brown)", color: "white", fontSize: "0.72rem", fontWeight: 700, padding: "0.25rem 0.8rem", borderRadius: "20px", marginBottom: "0.4rem" }}>{PORTFOLIO[slideIndex].label}</span>
                <p style={{ color: "rgba(250,246,240,0.9)", fontWeight: 600, fontSize: "0.95rem" }}>{PORTFOLIO[slideIndex].client}</p>
              </div>
            </div>

            {/* Side card - smaller */}
            <div style={{ flex: "0 0 22%", aspectRatio: "9/16", borderRadius: 14, overflow: "hidden", opacity: 0.55, transform: "scale(0.92)", transition: "all 0.5s", position: "relative", background: "#2C1F14" }}>
              {PORTFOLIO[(slideIndex + 1) % PORTFOLIO.length].type === "video" ? (
                <video src={PORTFOLIO[(slideIndex + 1) % PORTFOLIO.length].src} muted playsInline loop style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <img src={PORTFOLIO[(slideIndex + 1) % PORTFOLIO.length].src} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="" />
              )}
            </div>

            <button onClick={nextSlide} style={{ background: "rgba(250,246,240,0.06)", border: "1px solid rgba(250,246,240,0.1)", borderRadius: "50%", width: 48, height: 48, color: "#FAF6F0", fontSize: "1.2rem", cursor: "pointer", flexShrink: 0, alignSelf: "center", transition: "all 0.3s", backdropFilter: "blur(8px)" }}
              onMouseEnter={e => { e.target.style.background = "rgba(107,79,58,0.5)"; }}
              onMouseLeave={e => { e.target.style.background = "rgba(250,246,240,0.06)"; }}>‹</button>
          </div>
        </div>

        {/* ── MOBILE: full-screen video player ── */}
        <div className="port-mobile" style={{ display: "none", position: "relative", zIndex: 2, padding: "0 1rem 2rem" }}>
          <div style={{ position: "relative", borderRadius: 18, overflow: "hidden", background: "#000", boxShadow: "0 24px 60px rgba(0,0,0,0.5)", maxWidth: 340, margin: "0 auto" }}>
            {PORTFOLIO[slideIndex].type === "video" ? (
              <video key={slideIndex} src={PORTFOLIO[slideIndex].src} controls playsInline autoPlay muted loop
                style={{ width: "100%", aspectRatio: "9/16", objectFit: "cover", display: "block" }} />
            ) : (
              <img src={PORTFOLIO[slideIndex].src} style={{ width: "100%", aspectRatio: "9/16", objectFit: "cover", display: "block" }} alt={PORTFOLIO[slideIndex].client} />
            )}
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 60%)", padding: "2rem 1.2rem 1.2rem" }}>
              <span style={{ display: "inline-block", background: "var(--brown)", color: "white", fontSize: "0.7rem", fontWeight: 700, padding: "0.2rem 0.7rem", borderRadius: "20px", marginBottom: "0.3rem" }}>{PORTFOLIO[slideIndex].label}</span>
              <p style={{ color: "white", fontWeight: 600, fontSize: "0.9rem" }}>{PORTFOLIO[slideIndex].client}</p>
            </div>
          </div>

          {/* Mobile swipe dots + arrows */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", marginTop: "1.5rem" }}>
            <button onClick={prevSlide} style={{ background: "rgba(250,246,240,0.1)", border: "1px solid rgba(250,246,240,0.15)", borderRadius: "50%", width: 40, height: 40, color: "#FAF6F0", fontSize: "1.1rem", cursor: "pointer" }}>›</button>
            <div style={{ display: "flex", gap: "0.4rem" }}>
              {PORTFOLIO.map((_, i) => (
                <button key={i} onClick={() => setSlideIndex(i)} style={{ width: i === slideIndex ? 20 : 7, height: 7, borderRadius: 4, background: i === slideIndex ? "var(--brown)" : "rgba(250,246,240,0.25)", border: "none", cursor: "pointer", transition: "all 0.3s", padding: 0 }} />
              ))}
            </div>
            <button onClick={nextSlide} style={{ background: "rgba(250,246,240,0.1)", border: "1px solid rgba(250,246,240,0.15)", borderRadius: "50%", width: 40, height: 40, color: "#FAF6F0", fontSize: "1.1rem", cursor: "pointer" }}>‹</button>
          </div>
        </div>

        {/* Dots desktop */}
        <div className="port-desktop" style={{ display: "flex", justifyContent: "center", gap: "0.5rem", paddingBottom: "3rem", position: "relative", zIndex: 2 }}>
          {PORTFOLIO.map((_, i) => (
            <button key={i} onClick={() => setSlideIndex(i)} style={{ width: i === slideIndex ? 24 : 7, height: 7, borderRadius: 4, background: i === slideIndex ? "var(--brown)" : "rgba(250,246,240,0.2)", border: "none", cursor: "pointer", transition: "all 0.3s", padding: 0 }} />
          ))}
        </div>


      </section>

      {/* ── PROCESS ── */}
      <section id="process" style={{ padding: "6rem 2rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "4.5rem" }}>
              <p style={{ color: "var(--brown)", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "1rem" }}>איך עובדים יחד</p>
              <h2 className="serif" style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)", fontWeight: 700, lineHeight: 1.2 }}>
                תהליך הסושיאל<br /><span style={{ color: "var(--brown)" }}>תהליך ממכר</span>
              </h2>
            </div>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1rem", position: "relative" }} className="steps-grid">
            {steps.map((step, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div style={{ padding: "0 1rem", textAlign: "center", position: "relative" }}>
                  <div style={{ position: "absolute", top: 22, left: "-50%", width: "100%", height: 1, background: "rgba(107,79,58,0.18)", zIndex: 0 }} />
                  <div style={{ width: 44, height: 44, borderRadius: "50%", background: "var(--brown)", color: "#FAF6F0", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "0.82rem", margin: "0 auto 1.4rem", position: "relative", zIndex: 1, boxShadow: "0 4px 14px rgba(107,79,58,0.3)" }}>{step.num}</div>
                  <h3 style={{ fontWeight: 700, marginBottom: "0.6rem", fontSize: "0.97rem" }}>{step.title}</h3>
                  <p style={{ color: "var(--mid)", fontSize: "0.85rem", lineHeight: 1.75 }}>{step.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── BEFORE / AFTER ── */}
      <section style={{ background: "var(--sand)", padding: "6rem 2rem" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "1rem" }}>
              <p style={{ color: "var(--brown)", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "1rem" }}>התוצאה</p>
              <h2 className="serif" style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)", fontWeight: 700, lineHeight: 1.2 }}>
                לפני ואחרי<br /><span style={{ color: "var(--brown)" }}>תראו את המקפצה</span>
              </h2>
              <p style={{ color: "var(--mid)", marginTop: "1rem", lineHeight: 1.85, fontSize: "0.97rem", maxWidth: 600, margin: "1rem auto 0" }}>
                כבר ברגע שנתחיל, הנה כמה עובדות שמראש ניתן להבין שיקרו
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 50px 1fr", alignItems: "stretch", marginTop: "3rem" }} className="ba-grid">
              <div className="ba-before" style={{ background: "var(--linen)", border: "1px solid rgba(107,79,58,0.12)", borderRadius: "8px 0 0 8px", padding: "2.2rem" }}>
<div style={{ display: "flex", alignItems: "baseline", gap: "0.6rem", marginBottom: "1.4rem", flexWrap: "wrap" }}><p style={{ fontSize: "1.4rem", fontWeight: 900, color: "var(--brown)" }}>לפני</p><p style={{ fontSize: "0.82rem", color: "var(--light)" }}>(לפני שהתחלתם לעבוד איתי)</p></div>
                {["תוכן חובבני ולא עקבי","שפה שיווקית לא רציפה","חשיפה נמוכה","ללא אסטרטגיה"].map((t,i)=>(
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.75rem" }}>
                    <span style={{ color: "#C4AFA5", fontSize: "0.8rem" }}>✕</span>
                    <p style={{ color: "var(--mid)", fontSize: "0.9rem" }}>{t}</p>
                  </div>
                ))}
              </div>
              <div className="ba-arrow" style={{ display: "flex", justifyContent: "center", alignItems: "center", background: "var(--brown)", color: "#FAF6F0", fontSize: "1.2rem" }}>←</div>
              <div className="ba-after" style={{ background: "var(--brown)", borderRadius: "0 8px 8px 0", padding: "2.2rem" }}>
<div style={{ display: "flex", alignItems: "baseline", gap: "0.6rem", marginBottom: "1.4rem", flexWrap: "wrap" }}><p style={{ fontSize: "1.4rem", fontWeight: 900, color: "#FAF6F0" }}>אחרי</p><p style={{ fontSize: "0.82rem", color: "rgba(250,246,240,0.55)" }}>(אחרי שהתחלתם לעבוד איתי)</p></div>
                {["תוכן עקבי עם מיתוג אחיד","צבע מותג בכל סרטון","חשיפות גבוהות ומעורבות קהל יעד","תוכן מקצועי ולא חובבני"].map((t,i)=>(
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.75rem" }}>
                    <span style={{ color: "rgba(250,246,240,0.7)" }}>✓</span>
                    <p style={{ color: "rgba(250,246,240,0.88)", fontSize: "0.9rem" }}>{t}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section id="reviews" style={{ padding: "6rem 2rem" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <p style={{ color: "var(--brown)", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "1rem" }}>ביקורות</p>
              <h2 className="serif" style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)", fontWeight: 700, lineHeight: 1.2 }}>
                מה אומרים<br /><span style={{ color: "var(--brown)" }}>הלקוחות</span>
              </h2>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div style={{ position: "relative", minHeight: 260 }}>
              {REVIEWS.map((r, i) => (
                <div key={i} className="review-card" style={{
                  position: i === 0 ? "relative" : "absolute",
                  top: 0, left: 0, right: 0,
                  opacity: reviewIndex === i ? 1 : 0,
                  transform: reviewIndex === i ? "translateY(0)" : "translateY(16px)",
                  pointerEvents: reviewIndex === i ? "auto" : "none",
                  transition: "opacity 0.6s ease, transform 0.6s ease",
                }}>
                  <div style={{ display: "flex", gap: "0.3rem", marginBottom: "1rem" }}>
                    {[...Array(r.stars)].map((_, j) => <span key={j} style={{ color: "#E8A838", fontSize: "1rem" }}>★</span>)}
                  </div>
                  <p className="serif" style={{ fontSize: "1.05rem", lineHeight: 1.85, color: "var(--dark)", fontStyle: "italic", marginBottom: "1.4rem" }}>
                    "{r.text}"
                  </p>
                  <p style={{ fontWeight: 700, fontSize: "0.88rem", color: "var(--brown)" }}>{r.name}</p>
                </div>
              ))}
            </div>

            {/* Review dots */}
            <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", marginTop: "2rem" }}>
              {REVIEWS.map((_, i) => (
                <button key={i} onClick={() => { setReviewIndex(i); clearInterval(reviewTimer.current); }}
                  style={{ width: i === reviewIndex ? 24 : 8, height: 8, borderRadius: 4, background: i === reviewIndex ? "var(--brown)" : "rgba(107,79,58,0.25)", border: "none", cursor: "pointer", transition: "all 0.3s", padding: 0 }} />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

{/* ── FAQ ── */}
      <section id="faq" style={{ padding: "6rem 2rem" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
              <p style={{ color: "var(--brown)", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "1rem" }}>שאלות נפוצות</p>
              <h2 className="serif" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 700, lineHeight: 1.25 }}>כל מה שרצית לדעת</h2>
            </div>
          </Reveal>
          {faqs.map((item, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <div className="faq-item">
                <button className="faq-btn" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span>{item.q}</span>
                  <span className="faq-icon" style={{ color: openFaq===i ? "var(--brown)" : "var(--mid)", transform: openFaq===i ? "rotate(45deg)" : "none", background: openFaq===i ? "rgba(107,79,58,0.08)" : "transparent" }}>+</span>
                </button>
                <div style={{ maxHeight: openFaq===i ? 200 : 0, overflow: "hidden", transition: "max-height 0.42s cubic-bezier(0.16,1,0.3,1)" }}>
                  <p style={{ paddingBottom: "1.4rem", color: "var(--mid)", lineHeight: 1.9, fontSize: "0.93rem" }}>{item.a}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section id="contact" style={{ padding: "7rem 2rem", background: "var(--dark)", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0, backgroundImage: "radial-gradient(rgba(250,246,240,0.03) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "60vw", height: "60vw", maxWidth: 500, maxHeight: 500, background: "radial-gradient(circle, rgba(107,79,58,0.2) 0%, transparent 65%)", zIndex: 0, borderRadius: "50%" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <Reveal>
            <p style={{ color: "var(--brown)", fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)", fontWeight: 700, letterSpacing: "0.05em", marginBottom: "1rem" }}>מוכנים להתחיל להגדיל?</p>
            <h2 className="serif" style={{ fontSize: "clamp(2rem, 5vw, 3.8rem)", color: "#FAF6F0", fontWeight: 700, lineHeight: 1.15, marginBottom: "1.3rem" }}>
              בואו נבנה יחד<br /><span style={{ color: "var(--brown)" }}>את התוכן המתאים לעסק שלכם</span>
            </h2>
            <p style={{ color: "rgba(250,246,240,0.45)", fontSize: "1rem", marginBottom: "2.8rem", lineHeight: 1.85, maxWidth: 520, margin: "1.2rem auto 2.8rem" }}>
              נצרף תוכן מקצועי, עקבי ואותנטי — שמדבר בדיוק בשפה של הקהל שלך ומביא לקוחות.
            </p>
            <a href={WA_LINK} target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
              <button className="btn-wa" style={{ fontSize: "1.05rem", padding: "1.15rem 3.2rem" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.115.549 4.103 1.514 5.829L.055 23.454a.75.75 0 0 0 .918.918l5.629-1.459A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.712 9.712 0 0 1-4.953-1.356l-.355-.211-3.681.955.977-3.578-.232-.368A9.712 9.712 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/></svg>
                שלחי הודעה בוואטסאפ
              </button>
            </a>
          </Reveal>
        </div>
      </section>

      {/* ── ACCESSIBILITY WIDGET ── */}
      <div id="accessibility-widget" role="complementary" aria-label="כלי נגישות">
        <style>{`
          #acc-btn {
            position: fixed; bottom: 24px; left: 24px; z-index: 9999;
            width: 52px; height: 52px; border-radius: 50%;
            background: var(--brown); color: white; border: none;
            font-size: 1.4rem; cursor: pointer;
            box-shadow: 0 4px 20px rgba(107,79,58,0.4);
            display: flex; align-items: center; justify-content: center;
            transition: transform 0.2s, box-shadow 0.2s;
          }
          #acc-btn:hover { transform: scale(1.1); box-shadow: 0 6px 28px rgba(107,79,58,0.5); }
          #acc-btn:focus { outline: 3px solid #FAD27A; outline-offset: 3px; }
          #acc-menu {
            position: fixed; bottom: 88px; left: 24px; z-index: 9998;
            background: white; border-radius: 12px; padding: 1rem;
            box-shadow: 0 8px 32px rgba(0,0,0,0.15);
            display: none; flex-direction: column; gap: 0.5rem;
            min-width: 200px; border: 1px solid rgba(107,79,58,0.1);
          }
          #acc-menu.open { display: flex; }
          .acc-opt {
            background: none; border: 1px solid rgba(107,79,58,0.15);
            border-radius: 6px; padding: 0.6rem 1rem;
            font-family: inherit; font-size: 0.88rem; cursor: pointer;
            text-align: right; color: var(--dark); transition: background 0.2s;
            display: flex; align-items: center; gap: 0.5rem;
          }
          .acc-opt:hover { background: var(--linen); }
          .acc-opt:focus { outline: 2px solid var(--brown); }
          body.acc-large-text { font-size: 120% !important; }
          body.acc-high-contrast { filter: contrast(1.5) !important; }
          body.acc-underline-links a { text-decoration: underline !important; }
        `}</style>
        <button id="acc-btn" aria-label="פתח תפריט נגישות" aria-expanded="false"
          onClick={() => {
            const menu = document.getElementById("acc-menu");
            const btn = document.getElementById("acc-btn");
            const isOpen = menu.classList.toggle("open");
            btn.setAttribute("aria-expanded", isOpen);
          }}>
          ♿
        </button>
        <div id="acc-menu" role="menu" aria-label="אפשרויות נגישות" dir="rtl">
          <p style={{ fontSize: "0.7rem", color: "var(--light)", fontWeight: 600, letterSpacing: "0.08em", marginBottom: "0.3rem", paddingRight: "0.3rem" }}>נגישות</p>
          {[
            { label: "הגדלת טקסט", icon: "A+", cls: "acc-large-text" },
            { label: "ניגודיות גבוהה", icon: "◑", cls: "acc-high-contrast" },
            { label: "קישורים מודגשים", icon: "🔗", cls: "acc-underline-links" },
          ].map(opt => (
            <button key={opt.cls} className="acc-opt" role="menuitem"
              onClick={() => document.body.classList.toggle(opt.cls)}>
              <span style={{ fontWeight: 700, minWidth: 20 }}>{opt.icon}</span>
              {opt.label}
            </button>
          ))}
          <button className="acc-opt" role="menuitem"
            onClick={() => { document.body.classList.remove("acc-large-text","acc-high-contrast","acc-underline-links"); }}>
            <span style={{ fontWeight: 700, minWidth: 20 }}>↺</span>
            איפוס
          </button>
          <p style={{ fontSize: "0.68rem", color: "var(--light)", marginTop: "0.5rem", paddingRight: "0.3rem", lineHeight: 1.5 }}>
            נגישות לפי תקן WCAG 2.1<br />ותקנות שוויון זכויות לאנשים עם מוגבלות
          </p>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer style={{ background: "#1a120b", padding: "1.5rem 2rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}>
          <span style={{ color: "rgb(135, 125, 102)", fontSize: "0.77rem" }}>© 2026 יובל חסון ניהול סושיאל | נבנה על ידי שחר לוי</span>
          <a href={WA_LINK} target="_blank" rel="noreferrer" style={{ color: "rgba(37,211,102,0.6)", textDecoration: "none", fontSize: "0.77rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.115.549 4.103 1.514 5.829L.055 23.454a.75.75 0 0 0 .918.918l5.629-1.459A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.712 9.712 0 0 1-4.953-1.356l-.355-.211-3.681.955.977-3.578-.232-.368A9.712 9.712 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/></svg>
            וואטסאפ
          </a>
        </div>
      </footer>
    </div>
  );
}