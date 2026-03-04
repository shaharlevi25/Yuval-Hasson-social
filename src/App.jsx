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

// ── Portfolio — הכניסי תמונות לתיקיית public/portfolio/ ──
const PORTFOLIO = [
  { src: "/portfolio/1.jpg", label: "אינסטגרם", client: "לקוח 1" },
  { src: "/portfolio/work2.jpg", label: "טיקטוק",   client: "לקוח 2" },
  { src: "/portfolio/work3.jpg", label: "מיתוג",    client: "לקוח 3" },
  { src: "/portfolio/work4.jpg", label: "אינסטגרם", client: "לקוח 4" },
  { src: "/portfolio/work5.jpg", label: "טיקטוק",   client: "לקוח 5" },
  { src: "/portfolio/work6.jpg", label: "מיתוג",    client: "לקוח 6" },
];

export default function App() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [openFaq,   setOpenFaq]   = useState(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const navTo = (id) => {
    setMenuOpen(false);
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 60);
  };

  const services = [
    { icon: "📸", title: "צילום תוכן",      text: "סרטונים ותמונות ברמה מקצועית — שמציגות אותך בצורה הכי טובה שיש." },
    { icon: "📱", title: "ניהול אינסטגרם", text: "תוכן עקבי, מיתוג אחיד, כתוביות מקצועיות — כל מה שצריך לעמוד מנצח." },
    { icon: "🎵", title: "ניהול טיקטוק",   text: "טרנדים, מוזיקה, אלגוריתם — אני על זה. את רק צריכה להיות את עצמך." },
    { icon: "🎯", title: "אסטרטגיה ומיתוג", text: "בונות יחד זהות ברורה — צבע, שפה, קהל יעד. הכל קוהרנטי ומדויק." },
  ];

  const steps = [
    { num: "01", title: "מתחילים לדבר",       text: "שיחת היכרות חופשית — מבינה את העסק, הקהל, והחלומות שלך." },
    { num: "02", title: "בונות אסטרטגיה",     text: "ביחד מפתחות מחשבה אסטרטגית. מי יודע למכור אותנו יותר מעצמנו?" },
    { num: "03", title: "יוצרות תוכן אמיתי", text: "בשפה שלך, לא AI. אותנטי, אמין ומוכר." },
    { num: "04", title: "מציגות את המקפצה",  text: "לפני ואחרי. נתונים, חשיפות, מיתוג. רואים את התוצאות." },
  ];

  const faqs = [
    { q: "למה לא לכתוב תסריטים עם AI?",        a: "כי הקהל שלך לא רובוט. אם תישמעי כמו רובוט — תפספסי את האותנטיות שהם מחפשים. השפה שלך תמיד תנצח." },
    { q: "כמה זמן לוקח לראות תוצאות?",          a: "תהליך הסושיאל ממכר — ברגע שמתחילים, רואים שינוי. בסוף כל תהליך אני מציגה השוואת לפני ואחרי מלאה." },
    { q: "האם סושיאל מדיה מתאים לכל עסק?",       a: "בהחלט. פעם פרסמו בשלטי חוצות — היום כל הלקוחות הפוטנציאליים נמצאים ברשתות החברתיות." },
    { q: "מה הופך את הגישה שלך לשונה?",          a: "אני חיה את הרשתות ומעורבת בתוכן הטרנדי של היום. אני לא מנהלת דפים — אני בונה נוכחות אמיתית שנשמעת כמוך." },
  ];

  const NAV = [
    { label: "אודות",   id: "about"     },
    { label: "שירותים", id: "services"  },
    { label: "עבודות",  id: "portfolio" },
    { label: "תהליך",   id: "process"   },
    { label: "שאלות",   id: "faq"       },
  ];

  return (
    <div dir="rtl" style={{ fontFamily: "'Heebo', sans-serif", background: "#FAF6F0", color: "#2C1F14", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;600;700;900&family=Noto+Serif+Hebrew:wght@300;400;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --cream: #FAF6F0; --sand: #EDE5D8; --linen: #F2EBE1;
          --brown: #6B4F3A; --dark: #2C1F14; --mid: #7A6354; --light: #B8A898;
        }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: var(--brown); border-radius: 4px; }
        .serif { font-family: 'Noto Serif Hebrew', Georgia, serif; }

        /* Buttons */
        .btn-primary {
          display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem;
          background: var(--brown); color: #FAF6F0; border: none;
          padding: 0.95rem 2.2rem; border-radius: 4px;
          font-family: inherit; font-size: 0.95rem; font-weight: 600;
          letter-spacing: 0.04em; cursor: pointer; white-space: nowrap;
          transition: background 0.3s, transform 0.25s, box-shadow 0.3s;
        }
        .btn-primary:hover { background: #4f3828; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(107,79,58,0.25); }
        .btn-secondary {
          display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem;
          background: transparent; color: var(--brown); border: 1.5px solid var(--brown);
          padding: 0.9rem 2.2rem; border-radius: 4px;
          font-family: inherit; font-size: 0.95rem; font-weight: 600;
          cursor: pointer; white-space: nowrap; transition: all 0.3s;
        }
        .btn-secondary:hover { background: var(--brown); color: #FAF6F0; }

        /* Service card */
        .service-card {
          background: white; border: 1px solid rgba(107,79,58,0.1);
          border-radius: 8px; padding: 2rem; height: 100%;
          transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s;
        }
        .service-card:hover { transform: translateY(-4px); box-shadow: 0 12px 36px rgba(107,79,58,0.1); border-color: rgba(107,79,58,0.25); }

        /* Portfolio */
        .p-card {
          border-radius: 10px; overflow: hidden; position: relative;
          background: var(--sand); aspect-ratio: 9/16;
          transition: transform 0.3s, box-shadow 0.3s; cursor: pointer;
        }
        .p-card:hover { transform: translateY(-5px); box-shadow: 0 16px 40px rgba(107,79,58,0.18); }
        .p-card img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .p-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(44,31,20,0.78) 0%, transparent 55%);
          opacity: 0; transition: opacity 0.3s;
          display: flex; flex-direction: column; justify-content: flex-end; padding: 1.1rem;
        }
        .p-card:hover .p-overlay { opacity: 1; }

        /* FAQ */
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

        /* Mobile menu */
        .mob-menu {
          position: fixed; inset: 0; z-index: 300;
          background: var(--cream); padding: 5rem 2rem 2rem;
          display: flex; flex-direction: column; gap: 0;
          transform: translateX(100%); transition: transform 0.38s cubic-bezier(0.16,1,0.3,1);
        }
        .mob-menu.open { transform: translateX(0); }
        .mob-menu-link {
          font-size: 1.35rem; font-weight: 700; color: var(--dark);
          text-decoration: none; border-bottom: 1px solid rgba(107,79,58,0.1);
          padding: 1.1rem 0; display: block;
          transition: color 0.2s;
        }
        .mob-menu-link:hover { color: var(--brown); }

        /* ── RESPONSIVE ── */
        .desktop-nav { display: flex; }
        .hamburger   { display: none; }

        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .hamburger   { display: flex !important; }
          .hero-grid   { grid-template-columns: 1fr !important; }
          .hero-photo  { order: -1; max-width: 260px; margin: 0 auto; }
          .about-grid  { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
          .srv-grid    { grid-template-columns: 1fr 1fr !important; }
          .port-grid   { grid-template-columns: 1fr 1fr !important; }
          .steps-grid  { grid-template-columns: 1fr 1fr !important; gap: 2rem !important; }
          .steps-grid > div .connector { display: none !important; }
          .ba-grid     { grid-template-columns: 1fr !important; }
          .ba-arrow    { display: none !important; }
          .ba-before   { border-radius: 8px !important; }
          .ba-after    { border-radius: 8px !important; }
          .float-badge { display: none !important; }
          section, .quote-bar { padding-left: 1.4rem !important; padding-right: 1.4rem !important; }
        }

        @media (max-width: 500px) {
          .srv-grid  { grid-template-columns: 1fr !important; }
          .port-grid { grid-template-columns: 1fr 1fr !important; }
          .steps-grid { grid-template-columns: 1fr !important; }
          .btn-row   { flex-direction: column; }
          .btn-row .btn-primary,
          .btn-row .btn-secondary { width: 100%; }
        }
      `}</style>

      {/* ── NAVBAR ── */}
      <nav style={{ position: "fixed", top: 0, right: 0, left: 0, zIndex: 200, padding: "1rem 2rem", display: "flex", justifyContent: "space-between", alignItems: "center", background: scrolled ? "rgba(250,246,240,0.95)" : "transparent", backdropFilter: scrolled ? "blur(16px)" : "none", borderBottom: scrolled ? "1px solid rgba(107,79,58,0.1)" : "none", transition: "all 0.4s" }}>
        <img src="/logo.svg" alt="יובל חסון" style={{ height: 42 }} onError={e => e.target.style.display = "none"} />

        {/* Desktop */}
        <div className="desktop-nav" style={{ gap: "2rem", alignItems: "center" }}>
          {NAV.map(n => (
            <button key={n.id} onClick={() => navTo(n.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--mid)", fontSize: "0.88rem", fontWeight: 500, fontFamily: "inherit", transition: "color 0.25s" }}
              onMouseEnter={e => e.target.style.color = "var(--dark)"}
              onMouseLeave={e => e.target.style.color = "var(--mid)"}>
              {n.label}
            </button>
          ))}
          <a href={WA_LINK} target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
            <button className="btn-primary" style={{ padding: "0.6rem 1.5rem", fontSize: "0.83rem" }}>📱 צרי קשר</button>
          </a>
        </div>

        {/* Hamburger */}
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} style={{ background: "none", border: "none", cursor: "pointer", flexDirection: "column", gap: 5, padding: "0.5rem" }}>
          {[0,1,2].map(i => (
            <span key={i} style={{ display: "block", width: 24, height: 2, background: "var(--dark)", borderRadius: 2, transition: "all 0.3s",
              transform: menuOpen ? (i===0 ? "rotate(45deg) translate(5px,5px)" : i===2 ? "rotate(-45deg) translate(5px,-5px)" : "scaleX(0)") : "none" }} />
          ))}
        </button>
      </nav>

      {/* Mobile menu */}
      <div className={`mob-menu ${menuOpen ? "open" : ""}`}>
        <button onClick={() => setMenuOpen(false)} style={{ position: "absolute", top: "1.2rem", left: "1.5rem", background: "none", border: "none", fontSize: "1.4rem", cursor: "pointer", color: "var(--dark)" }}>✕</button>
        {NAV.map(n => <a key={n.id} className="mob-menu-link" href={`#${n.id}`} onClick={() => navTo(n.id)}>{n.label}</a>)}
        <a href={WA_LINK} target="_blank" rel="noreferrer" style={{ textDecoration: "none", marginTop: "1.5rem" }}>
          <button className="btn-primary" style={{ width: "100%" }}>📱 שלחי הודעה</button>
        </a>
      </div>

      {/* ── HERO ── */}
      <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "9rem 2rem 4rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%", display: "grid", gridTemplateColumns: "1.15fr 0.85fr", gap: "4rem", alignItems: "center" }} className="hero-grid">
          <div>
            <Reveal>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "rgba(107,79,58,0.08)", border: "1px solid rgba(107,79,58,0.18)", borderRadius: "4px", padding: "0.35rem 1rem", color: "var(--brown)", fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1.6rem" }}>
                📸 צלמת &amp; מנהלת רשתות חברתיות
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="serif" style={{ fontSize: "clamp(2.6rem, 5.5vw, 5rem)", fontWeight: 700, lineHeight: 1.12, marginBottom: "1.4rem" }}>
                תוכן אותנטי<br /><span style={{ color: "var(--brown)" }}>זה תוכן טהור</span>
              </h1>
            </Reveal>
            <Reveal delay={0.14}>
              <p style={{ fontSize: "1.05rem", lineHeight: 1.95, color: "var(--mid)", maxWidth: 500, marginBottom: "2.5rem" }}>
                אני יובל חסון — חיה את הרשתות החברתיות ומעורבת בתוכן הטרנדי של היום. הנישה שלי: לגרום לך לנשמע בדיוק כמוך — אמיתי, אמין, ומוכר.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }} className="btn-row">
                <a href={WA_LINK} target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
                  <button className="btn-primary">📱 שלחי הודעה</button>
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
                פעם שלטי חוצות.<br /><span style={{ color: "var(--brown)" }}>היום — הרשתות שלך.</span>
              </h2>
              <p style={{ color: "var(--mid)", lineHeight: 2, marginBottom: "1.2rem" }}>
                אני יובל חסון — צלמת ומשווקת ברשתות החברתיות. חיה את הרשתות, מעורבת בתוכן הטרנדי, ויודעת בדיוק מה גורם לאנשים לעצור ולצפות.
              </p>
              <p style={{ color: "var(--mid)", lineHeight: 2 }}>
                הנישה שלי להעביר את התוכן שהלקוח ירצה לשמוע מכם — כבר ברשתות — כי היום כל הלקוחות הפוטנציאליים נמצאים שם.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div style={{ background: "white", borderRadius: 8, padding: "2.5rem", borderRight: "4px solid var(--brown)", boxShadow: "0 8px 32px rgba(107,79,58,0.07)" }}>
              <p className="serif" style={{ fontSize: "1.2rem", lineHeight: 1.8, color: "var(--dark)", fontStyle: "italic", marginBottom: "1.6rem" }}>
                "כל הלקוחות הפוטנציאליים שעסק יכיר — מגיעים מהרשתות החברתיות"
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "0.9rem" }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: "var(--sand)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem" }}>📸</div>
                <div>
                  <p style={{ fontWeight: 700, fontSize: "0.88rem" }}>יובל חסון</p>
                  <p style={{ color: "var(--light)", fontSize: "0.75rem" }}>Social Media Manager</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" style={{ padding: "6rem 2rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <p style={{ color: "var(--brown)", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "1rem" }}>מה אני עושה</p>
              <h2 className="serif" style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)", fontWeight: 700, lineHeight: 1.2 }}>
                שירותים שמייצרים<br /><span style={{ color: "var(--brown)" }}>נוכחות אמיתית</span>
              </h2>
            </div>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1.2rem" }} className="srv-grid">
            {services.map((s, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="service-card">
                  <div style={{ width: 48, height: 48, borderRadius: 8, background: "var(--linen)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.4rem", marginBottom: "1.2rem" }}>{s.icon}</div>
                  <h3 style={{ fontWeight: 700, marginBottom: "0.7rem", fontSize: "0.97rem" }}>{s.title}</h3>
                  <p style={{ color: "var(--mid)", lineHeight: 1.8, fontSize: "0.88rem" }}>{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── QUOTE ── */}
      <div className="quote-bar" style={{ background: "var(--brown)", padding: "3.5rem 2rem", textAlign: "center" }}>
        <Reveal>
          <p className="serif" style={{ fontSize: "clamp(1.05rem, 2.5vw, 1.65rem)", color: "rgba(250,246,240,0.95)", fontStyle: "italic", lineHeight: 1.8, maxWidth: 780, margin: "0 auto" }}>
            "הקהל שלנו לא רובוט — ואם הרובוט יתסרט אותנו, נפספס את האותנטיות שהם מחפשים. איזו שפה יותר אמינה? שלנו."
          </p>
          <p style={{ color: "rgba(250,246,240,0.45)", marginTop: "1rem", fontSize: "0.8rem", letterSpacing: "0.08em" }}>— יובל חסון</p>
        </Reveal>
      </div>

      {/* ── PORTFOLIO ── */}
      <section id="portfolio" style={{ background: "var(--sand)", padding: "6rem 2rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <p style={{ color: "var(--brown)", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "1rem" }}>עבודות</p>
              <h2 className="serif" style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)", fontWeight: 700, lineHeight: 1.2 }}>מה יצרנו יחד</h2>
              <p style={{ color: "var(--mid)", marginTop: "1rem", maxWidth: 460, margin: "1rem auto 0", lineHeight: 1.85, fontSize: "0.97rem" }}>
                כל עמוד הוא סיפור אחר — אותנטי, מקצועי, ומדויק לקהל היעד
              </p>
            </div>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.2rem" }} className="port-grid">
            {PORTFOLIO.map((item, i) => (
              <Reveal key={i} delay={i * 0.07}>
                <div className="p-card">
                  <img src={item.src} alt={item.client}
                    onError={e => {
                      e.target.style.display = "none";
                      const p = e.target.parentElement;
                      p.style.background = "var(--linen)";
                      p.innerHTML = `<div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:0.5rem;padding:1.5rem;text-align:center"><span style="font-size:2.5rem;opacity:0.25">📸</span><p style="color:var(--light);font-size:0.75rem;line-height:1.6">${item.client}<br/><span style="font-size:0.68rem;opacity:0.6">הכניסי תמונה ל-<br/>public/portfolio/work${i+1}.jpg</span></p></div>`;
                    }} />
                  <div className="p-overlay">
                    <span style={{ display: "inline-block", background: "rgba(250,246,240,0.18)", backdropFilter: "blur(8px)", color: "white", fontSize: "0.68rem", fontWeight: 600, padding: "0.2rem 0.7rem", borderRadius: "20px", marginBottom: "0.4rem", width: "fit-content" }}>{item.label}</span>
                    <p style={{ color: "rgba(250,246,240,0.85)", fontSize: "0.82rem", fontWeight: 500 }}>{item.client}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <div style={{ textAlign: "center", marginTop: "3rem" }}>
              <a href={WA_LINK} target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
                <button className="btn-secondary">רוצה תוצאות כאלה? 📱</button>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section id="process" style={{ padding: "6rem 2rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "4.5rem" }}>
              <p style={{ color: "var(--brown)", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "1rem" }}>איך עובדים יחד</p>
              <h2 className="serif" style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)", fontWeight: 700, lineHeight: 1.2 }}>
                תהליך הסושיאל —<br /><span style={{ color: "var(--brown)" }}>תהליך ממכר</span>
              </h2>
            </div>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1rem", position: "relative" }} className="steps-grid">
            {steps.map((step, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div style={{ padding: "0 1rem", textAlign: "center", position: "relative" }}>
                  {i > 0 && <div className="connector" style={{ position: "absolute", top: 22, right: "50%", width: "100%", height: 1, background: "rgba(107,79,58,0.18)" }} />}
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
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
              <p style={{ color: "var(--brown)", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "1rem" }}>התוצאה</p>
              <h2 className="serif" style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)", fontWeight: 700, lineHeight: 1.2 }}>
                לפני ואחרי —<br /><span style={{ color: "var(--brown)" }}>תראי את המקפצה</span>
              </h2>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 50px 1fr", alignItems: "stretch" }} className="ba-grid">
              <div className="ba-before" style={{ background: "var(--linen)", border: "1px solid rgba(107,79,58,0.12)", borderRadius: "8px 0 0 8px", padding: "2.2rem" }}>
                <p style={{ fontSize: "0.7rem", color: "var(--light)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "1.2rem" }}>לפני</p>
                {["תוכן אקראי ולא עקבי","ללא מיתוג ברור","חשיפה נמוכה","ללא אסטרטגיה"].map((t,i)=>(
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.75rem" }}>
                    <span style={{ color: "#C4AFA5", fontSize: "0.8rem" }}>✕</span>
                    <p style={{ color: "var(--mid)", fontSize: "0.88rem" }}>{t}</p>
                  </div>
                ))}
              </div>
              <div className="ba-arrow" style={{ display: "flex", justifyContent: "center", alignItems: "center", background: "var(--brown)", color: "#FAF6F0", fontSize: "1.2rem" }}>←</div>
              <div className="ba-after" style={{ background: "var(--brown)", borderRadius: "0 8px 8px 0", padding: "2.2rem" }}>
                <p style={{ fontSize: "0.7rem", color: "rgba(250,246,240,0.5)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "1.2rem" }}>אחרי</p>
                {["תוכן עקבי עם מיתוג אחיד","לוגו וצבע מותג בכל סרטון","חשיפות גבוהות ולידים","אסטרטגיה ברורה ומדידה"].map((t,i)=>(
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.75rem" }}>
                    <span style={{ color: "rgba(250,246,240,0.7)" }}>✓</span>
                    <p style={{ color: "rgba(250,246,240,0.88)", fontSize: "0.88rem" }}>{t}</p>
                  </div>
                ))}
              </div>
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
            <p style={{ color: "var(--brown)", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "1.6rem" }}>מוכנים להתחיל?</p>
            <h2 className="serif" style={{ fontSize: "clamp(2rem, 5vw, 3.8rem)", color: "#FAF6F0", fontWeight: 700, lineHeight: 1.15, marginBottom: "1.3rem" }}>
              בואו נבנה יחד<br /><span style={{ color: "var(--brown)" }}>את הנוכחות שמגיעה לכם</span>
            </h2>
            <p style={{ color: "rgba(250,246,240,0.5)", fontSize: "1rem", marginBottom: "2.8rem", lineHeight: 1.8 }}>
              שלחי הודעה ונתחיל לבנות את הסיפור האמיתי שלך ברשתות
            </p>
            <a href={WA_LINK} target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
              <button className="btn-primary" style={{ fontSize: "1rem", padding: "1.1rem 3rem" }}>📱 שלחי הודעה בוואטסאפ</button>
            </a>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: "#1a120b", padding: "1.5rem 2rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}>
          <span style={{ color: "rgba(250,246,240,0.25)", fontSize: "0.77rem" }}>© 2024 יובל חסון | ניהול רשתות חברתיות</span>
          <a href={WA_LINK} target="_blank" rel="noreferrer" style={{ color: "rgba(250,246,240,0.35)", textDecoration: "none", fontSize: "0.77rem" }}>📱 וואטסאפ</a>
        </div>
      </footer>
    </div>
  );
}