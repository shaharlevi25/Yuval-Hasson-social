import { useState, useEffect, useRef } from "react";

// ─── COLORS ───────────────────────────────────────────────────────────────────
// --cream:    #FAF6F0   background
// --sand:     #E8DDD0   section bg
// --linen:    #F2EBE1   card bg
// --brown:    #6B4F3A   primary accent
// --dark:     #2C1F14   headings
// --mid:      #7A6354   body text
// ─────────────────────────────────────────────────────────────────────────────

function useInView(threshold = 0.15) {
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

function Reveal({ children, delay = 0, y = 32 }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : `translateY(${y}px)`,
        transition: `opacity 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

const WA_NUMBER = "972549422502";
const WA_LINK = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("היי יובל! ראיתי את דף הנחיתה שלך ורציתי לשמוע עוד 😊")}`;

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const services = [
    { icon: "📸", title: "צילום תוכן", text: "סרטונים ותמונות ברמה מקצועית — שמציגות אותך בצורה הכי טובה שיש." },
    { icon: "📱", title: "ניהול אינסטגרם", text: "תוכן עקבי, מיתוג אחיד, כתוביות מקצועיות — כל מה שצריך לעמוד מנצח." },
    { icon: "🎵", title: "ניהול טיקטוק", text: "טרנדים, מוזיקה, אלגוריתם — אני על זה. את רק צריכה להיות את עצמך." },
    { icon: "🎯", title: "אסטרטגיה ומיתוג", text: "בונות יחד זהות ברורה — צבע, שפה, קהל יעד. הכל קוהרנטי ומדויק." },
  ];

  const steps = [
    { num: "01", title: "מתחילים לדבר", text: "שיחת היכרות חופשית — מבינה את העסק, הקהל, והחלומות שלך." },
    { num: "02", title: "בונות אסטרטגיה", text: "ביחד מפתחות מחשבה אסטרטגית. מי יודע למכור אותנו יותר מעצמנו?" },
    { num: "03", title: "יוצרות תוכן אמיתי", text: "מתסרטות לבד, בשפה שלך. לא AI, לא תסריטים מוכנים — אותנטי בלבד." },
    { num: "04", title: "מציגות את המקפצה", text: "לפני ואחרי. נתונים, חשיפות, מיתוג. רואים את העבודה ואת התוצאות." },
  ];

  const faqs = [
    { q: "למה לא לכתוב תסריטים עם AI?", a: "כי הקהל שלך לא רובוט. אם תישמעי כמו רובוט — תפספסי את האותנטיות שהם מחפשים. השפה שלך תמיד תנצח." },
    { q: "כמה זמן לוקח לראות תוצאות?", a: "תהליך הסושיאל ממכר — ברגע שמתחילים, רואים שינוי. בסוף כל תהליך אני מציגה השוואת לפני ואחרי מלאה." },
    { q: "האם סושיאל מדיה מתאים לכל עסק?", a: "בהחלט. פעם פרסמו בשלטי חוצות ועמודי דרושים בעיתון — היום כל הלקוחות הפוטנציאליים נמצאים ברשתות החברתיות." },
    { q: "מה הופך את הגישה שלך לשונה?", a: "אני חיה את הרשתות ומעורבת בתוכן הטרנדי של היום. אני לא מנהלת דפים — אני בונה נוכחות אמיתית שנשמעת כמוך." },
  ];

  return (
    <div
      dir="rtl"
      style={{
        fontFamily: "'Heebo', sans-serif",
        background: "#FAF6F0",
        color: "#2C1F14",
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;600;700;900&family=Noto+Serif+Hebrew:wght@300;400;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --cream:  #FAF6F0;
          --sand:   #EDE5D8;
          --linen:  #F2EBE1;
          --brown:  #6B4F3A;
          --dark:   #2C1F14;
          --mid:    #7A6354;
          --light:  #B8A898;
        }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: var(--cream); }
        ::-webkit-scrollbar-thumb { background: var(--brown); border-radius: 4px; }

        .serif { font-family: 'Noto Serif Hebrew', Georgia, serif; }

        /* NAV */
        .nav-link {
          text-decoration: none;
          color: var(--mid);
          font-size: 0.88rem;
          font-weight: 500;
          letter-spacing: 0.03em;
          transition: color 0.25s;
        }
        .nav-link:hover { color: var(--dark); }

        /* BUTTONS */
        .btn-primary {
          display: inline-flex; align-items: center; gap: 0.5rem;
          background: var(--brown); color: #FAF6F0;
          border: none; padding: 0.95rem 2.4rem;
          border-radius: 4px;
          font-family: inherit; font-size: 0.95rem; font-weight: 600;
          letter-spacing: 0.04em; cursor: pointer;
          transition: background 0.3s, transform 0.25s, box-shadow 0.3s;
        }
        .btn-primary:hover {
          background: #4f3828;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(107,79,58,0.25);
        }
        .btn-secondary {
          display: inline-flex; align-items: center; gap: 0.5rem;
          background: transparent; color: var(--brown);
          border: 1.5px solid var(--brown); padding: 0.9rem 2.4rem;
          border-radius: 4px;
          font-family: inherit; font-size: 0.95rem; font-weight: 600;
          letter-spacing: 0.04em; cursor: pointer;
          transition: all 0.3s;
        }
        .btn-secondary:hover { background: var(--brown); color: #FAF6F0; }

        /* CARDS */
        .service-card {
          background: white;
          border: 1px solid rgba(107,79,58,0.1);
          border-radius: 8px;
          padding: 2.2rem;
          transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s;
        }
        .service-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 36px rgba(107,79,58,0.1);
          border-color: rgba(107,79,58,0.25);
        }

        /* STEP */
        .step-line {
          position: absolute;
          top: 2.2rem; left: -50%;
          width: 100%; height: 1px;
          background: linear-gradient(to right, transparent, rgba(107,79,58,0.2));
        }

        /* FAQ */
        .faq-item {
          border-bottom: 1px solid rgba(107,79,58,0.12);
          overflow: hidden;
          transition: background 0.3s;
        }
        .faq-item:first-child { border-top: 1px solid rgba(107,79,58,0.12); }
        .faq-trigger {
          width: 100%; background: none; border: none;
          padding: 1.6rem 0;
          display: flex; justify-content: space-between; align-items: center;
          cursor: pointer; font-family: inherit; text-align: right;
          font-size: 1rem; font-weight: 600; color: var(--dark);
          transition: color 0.25s;
        }
        .faq-trigger:hover { color: var(--brown); }
        .faq-icon {
          width: 28px; height: 28px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          border-radius: 50%; border: 1.5px solid currentColor;
          font-size: 1rem; line-height: 1;
          transition: transform 0.35s, background 0.25s, color 0.25s;
        }

        /* QUOTE BAR */
        .quote-bar {
          background: var(--brown);
          padding: 3.5rem 3rem;
          text-align: center;
        }

        @keyframes float {
          0%,100% { transform: translateY(0px); }
          50%      { transform: translateY(-10px); }
        }
        .float { animation: float 6s ease-in-out infinite; }

        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .services-grid { grid-template-columns: 1fr !important; }
          .steps-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>

      {/* ── NAVBAR ── */}
      <nav
        style={{
          position: "fixed", top: 0, right: 0, left: 0, zIndex: 200,
          padding: "1rem 3rem",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          background: scrolled ? "rgba(250,246,240,0.94)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(107,79,58,0.1)" : "none",
          transition: "all 0.4s",
        }}
      >
        <img
          src="/logo.svg"
          alt="יובל חסון"
          style={{ height: 46 }}
          onError={e => { e.target.style.display = "none"; }}
        />
        <div style={{ display: "flex", gap: "2.5rem", alignItems: "center" }}>
          <a href="#about"   className="nav-link">אודות</a>
          <a href="#services" className="nav-link">שירותים</a>
          <a href="#process"  className="nav-link">תהליך</a>
          <a href="#faq"      className="nav-link">שאלות</a>
          <a href={WA_LINK} target="_blank" rel="noreferrer">
            <button className="btn-primary" style={{ padding: "0.6rem 1.6rem", fontSize: "0.83rem" }}>
              📱 צרי קשר
            </button>
          </a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section
        id="hero"
        style={{
          minHeight: "100vh",
          display: "grid",
          gridTemplateColumns: "1.15fr 0.85fr",
          gap: "4rem",
          alignItems: "center",
          padding: "9rem 3rem 5rem",
          maxWidth: 1240,
          margin: "0 auto",
        }}
        className="hero-grid"
      >
        {/* Left — text */}
        <div>
          <Reveal>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "0.6rem",
              background: "rgba(107,79,58,0.08)", border: "1px solid rgba(107,79,58,0.18)",
              borderRadius: "4px", padding: "0.35rem 1rem",
              color: "var(--brown)", fontSize: "0.78rem", fontWeight: 600,
              letterSpacing: "0.1em", textTransform: "uppercase",
              marginBottom: "1.8rem",
            }}>
              📸 צלמת &amp; מנהלת רשתות חברתיות
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <h1
              className="serif"
              style={{
                fontSize: "clamp(2.8rem, 5.5vw, 5rem)",
                fontWeight: 700,
                lineHeight: 1.12,
                marginBottom: "1.6rem",
                letterSpacing: "-0.01em",
              }}
            >
              תוכן אותנטי<br />
              <span style={{ color: "var(--brown)" }}>זה תוכן טהור</span>
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p style={{
              fontSize: "1.1rem", lineHeight: 1.95,
              color: "var(--mid)", maxWidth: 520,
              marginBottom: "2.8rem",
            }}>
              אני יובל חסון — חיה את הרשתות החברתיות ומעורבת בתוכן הטרנדי של היום.
              הנישה שלי: לגרום לך לנשמע בדיוק כמוך — אמיתי, אמין, ומוכר.
            </p>
          </Reveal>

          <Reveal delay={0.22}>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <a href={WA_LINK} target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
                <button className="btn-primary">📱 שלחי הודעה</button>
              </a>
              <button
                className="btn-secondary"
                onClick={() => document.getElementById("process").scrollIntoView({ behavior: "smooth" })}
              >
                איך זה עובד?
              </button>
            </div>
          </Reveal>
        </div>

        {/* Right — photo card */}
        <Reveal delay={0.12} y={20}>
          <div style={{ position: "relative" }}>
            {/* Photo placeholder */}
            <div
              style={{
                width: "100%",
                paddingBottom: "120%",
                borderRadius: "8px 8px 80px 8px",
                overflow: "hidden",
                position: "relative",
                background: "var(--sand)",
                boxShadow: "0 24px 60px rgba(107,79,58,0.14)",
              }}
            >
              <img
                src="/yuval-photo.jpeg"
                alt="יובל חסון"
                style={{
                  position: "absolute", inset: 0,
                  width: "100%", height: "100%",
                  objectFit: "cover",
                }}
                onError={e => {
                  e.target.style.display = "none";
                  e.target.parentElement.style.display = "flex";
                  e.target.parentElement.style.alignItems = "center";
                  e.target.parentElement.style.justifyContent = "center";
                  e.target.parentElement.innerHTML =
                    `<span style="font-size:5rem;opacity:0.25;position:absolute">📸</span>
                     <p style="color:#7A6354;font-size:0.85rem;position:absolute;bottom:2rem;text-align:center;padding:0 2rem">הכניסי תמונה של יובל<br/>לתיקיית public/yuval-photo.jpg</p>`;
                }}
              />
            </div>

            {/* Floating badge */}
            <div
              className="float"
              style={{
                position: "absolute", bottom: 30, left: -24,
                background: "white",
                border: "1px solid rgba(107,79,58,0.15)",
                borderRadius: "8px",
                padding: "1rem 1.4rem",
                boxShadow: "0 8px 28px rgba(107,79,58,0.12)",
                minWidth: 160,
              }}
            >
              <p style={{ fontSize: "0.72rem", color: "var(--light)", marginBottom: "0.4rem", letterSpacing: "0.06em" }}>תוכן אמיתי</p>
              <p style={{ fontWeight: 700, fontSize: "0.95rem", color: "var(--dark)" }}>100% אותנטי ✓</p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── ABOUT ── */}
      <section
        id="about"
        style={{ background: "var(--sand)", padding: "7rem 3rem" }}
      >
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem", alignItems: "center" }}>
          <Reveal>
            <div>
              <p style={{ color: "var(--brown)", fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "1.2rem" }}>
                מי אני
              </p>
              <h2
                className="serif"
                style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.8rem)", fontWeight: 700, lineHeight: 1.25, marginBottom: "2rem" }}
              >
                פעם שלטי חוצות.<br />
                <span style={{ color: "var(--brown)" }}>היום — הרשתות שלך.</span>
              </h2>
              <p style={{ color: "var(--mid)", lineHeight: 2, marginBottom: "1.2rem" }}>
                אני יובל חסון — צלמת ומשווקת ברשתות החברתיות. חיה את הרשתות, מעורבת
                בתוכן הטרנדי, ויודעת בדיוק מה גורם לאנשים לעצור ולצפות.
              </p>
              <p style={{ color: "var(--mid)", lineHeight: 2 }}>
                הנישה שלי היא להעביר את התוכן שהלקוח ירצה לשמוע מכם — כבר ברשתות —
                כדי שיקבל את מלוא המידע שיצטרך לדעת עליכם כעסק. כי היום כל הלקוחות
                הפוטנציאליים נמצאים שם.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div style={{
              background: "white",
              borderRadius: 8,
              padding: "3rem",
              borderRight: "4px solid var(--brown)",
              boxShadow: "0 8px 32px rgba(107,79,58,0.07)",
            }}>
              <p
                className="serif"
                style={{
                  fontSize: "1.35rem", lineHeight: 1.75,
                  color: "var(--dark)", fontStyle: "italic",
                  marginBottom: "1.8rem",
                }}
              >
                "כל הלקוחות הפוטנציאליים שעסק יכיר — מגיעים מהרשתות החברתיות"
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <div style={{
                  width: 44, height: 44, borderRadius: "50%",
                  background: "var(--sand)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "1.2rem",
                }}>📸</div>
                <div>
                  <p style={{ fontWeight: 700, fontSize: "0.9rem" }}>יובל חסון</p>
                  <p style={{ color: "var(--light)", fontSize: "0.78rem" }}>Social Media Manager</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" style={{ padding: "7rem 3rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "4.5rem" }}>
              <p style={{ color: "var(--brown)", fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "1rem" }}>
                מה אני עושה
              </p>
              <h2
                className="serif"
                style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, lineHeight: 1.2 }}
              >
                שירותים שמייצרים<br />
                <span style={{ color: "var(--brown)" }}>נוכחות אמיתית</span>
              </h2>
            </div>
          </Reveal>

          <div
            style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.5rem" }}
            className="services-grid"
          >
            {services.map((s, i) => (
              <Reveal key={i} delay={i * 0.09}>
                <div className="service-card" style={{ height: "100%" }}>
                  <div style={{
                    width: 52, height: 52, borderRadius: 8,
                    background: "var(--linen)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "1.5rem", marginBottom: "1.4rem",
                  }}>
                    {s.icon}
                  </div>
                  <h3 style={{ fontWeight: 700, marginBottom: "0.8rem", fontSize: "1rem" }}>{s.title}</h3>
                  <p style={{ color: "var(--mid)", lineHeight: 1.8, fontSize: "0.9rem" }}>{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── QUOTE BAR ── */}
      <div className="quote-bar">
        <Reveal>
          <p
            className="serif"
            style={{
              fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)",
              color: "rgba(250,246,240,0.95)",
              fontStyle: "italic", lineHeight: 1.7,
              maxWidth: 800, margin: "0 auto",
            }}
          >
            "הקהל שלנו לא רובוט — ואם הרובוט יתסרט אותנו, נפספס את האותנטיות שהם מחפשים.
            איזו שפה יותר אמינה? שלנו."
          </p>
          <p style={{ color: "rgba(250,246,240,0.55)", marginTop: "1.2rem", fontSize: "0.85rem", letterSpacing: "0.08em" }}>
            — יובל חסון
          </p>
        </Reveal>
      </div>

      {/* ── PROCESS ── */}
      <section id="process" style={{ background: "var(--sand)", padding: "7rem 3rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "5rem" }}>
              <p style={{ color: "var(--brown)", fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "1rem" }}>
                איך עובדים יחד
              </p>
              <h2
                className="serif"
                style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, lineHeight: 1.2 }}
              >
                תהליך הסושיאל —<br />
                <span style={{ color: "var(--brown)" }}>תהליך ממכר</span>
              </h2>
              <p style={{ color: "var(--mid)", marginTop: "1.2rem", maxWidth: 540, margin: "1.2rem auto 0", lineHeight: 1.85 }}>
                ברגע שהחלטת להתחיל — לא יודעים לאן הדמיון הולך.
                אני מפתחת את המחשבה האסטרטגית שלך, כי מי יודע למכור אותנו יותר מעצמנו?
              </p>
            </div>
          </Reveal>

          <div
            style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0", position: "relative" }}
            className="steps-grid"
          >
            {steps.map((step, i) => (
              <Reveal key={i} delay={i * 0.12}>
                <div style={{ padding: "0 1.5rem", textAlign: "center", position: "relative" }}>
                  {/* connector line */}
                  {i > 0 && (
                    <div style={{
                      position: "absolute", top: 22, right: "50%",
                      width: "100%", height: 1,
                      background: "rgba(107,79,58,0.18)",
                    }} />
                  )}
                  {/* circle */}
                  <div style={{
                    width: 46, height: 46, borderRadius: "50%",
                    background: "var(--brown)", color: "#FAF6F0",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontWeight: 700, fontSize: "0.85rem",
                    margin: "0 auto 1.6rem",
                    position: "relative", zIndex: 1,
                    boxShadow: "0 4px 14px rgba(107,79,58,0.3)",
                  }}>
                    {step.num}
                  </div>
                  <h3 style={{ fontWeight: 700, marginBottom: "0.75rem", fontSize: "1rem" }}>{step.title}</h3>
                  <p style={{ color: "var(--mid)", fontSize: "0.88rem", lineHeight: 1.8 }}>{step.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── BEFORE / AFTER ── */}
      <section style={{ padding: "7rem 3rem" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <p style={{ color: "var(--brown)", fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "1rem" }}>
                התוצאה
              </p>
              <h2
                className="serif"
                style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, lineHeight: 1.2 }}
              >
                לפני ואחרי —<br />
                <span style={{ color: "var(--brown)" }}>תראי את המקפצה</span>
              </h2>
              <p style={{ color: "var(--mid)", marginTop: "1.2rem", maxWidth: 560, margin: "1.2rem auto 0", lineHeight: 1.85 }}>
                חשוב לי שהלקוח לא רק ירגיש את השינוי — גם יראה אותו.
                כמות הזמן והאנרגיה שהשקיעת לבד, עד שהגעת אליי.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 60px 1fr", gap: "0", alignItems: "center" }}>
              {/* Before */}
              <div style={{
                background: "var(--linen)",
                border: "1px solid rgba(107,79,58,0.12)",
                borderRadius: "8px 0 0 8px",
                padding: "2.5rem",
              }}>
                <p style={{ fontSize: "0.72rem", color: "var(--light)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "1.2rem" }}>לפני</p>
                {["תוכן אקראי ולא עקבי", "ללא מיתוג ברור", "חשיפה נמוכה", "ללא אסטרטגיה"].map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.7rem", marginBottom: "0.8rem" }}>
                    <span style={{ color: "#C4AFA5", fontSize: "0.8rem" }}>✕</span>
                    <p style={{ color: "var(--mid)", fontSize: "0.9rem" }}>{item}</p>
                  </div>
                ))}
              </div>

              {/* Arrow */}
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", background: "var(--brown)", height: "100%", color: "#FAF6F0", fontSize: "1.3rem" }}>
                ←
              </div>

              {/* After */}
              <div style={{
                background: "var(--brown)",
                borderRadius: "0 8px 8px 0",
                padding: "2.5rem",
              }}>
                <p style={{ fontSize: "0.72rem", color: "rgba(250,246,240,0.55)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "1.2rem" }}>אחרי</p>
                {["תוכן עקבי עם מיתוג אחיד", "לוגו וצבע מותג בכל סרטון", "חשיפות גבוהות ולידים", "אסטרטגיה ברורה ומדידה"].map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.7rem", marginBottom: "0.8rem" }}>
                    <span style={{ color: "rgba(250,246,240,0.7)", fontSize: "0.9rem" }}>✓</span>
                    <p style={{ color: "rgba(250,246,240,0.9)", fontSize: "0.9rem" }}>{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" style={{ background: "var(--sand)", padding: "7rem 3rem" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <p style={{ color: "var(--brown)", fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "1rem" }}>
                שאלות נפוצות
              </p>
              <h2
                className="serif"
                style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 700, lineHeight: 1.25 }}
              >
                כל מה שרצית לדעת
              </h2>
            </div>
          </Reveal>

          <div>
            {faqs.map((item, i) => (
              <Reveal key={i} delay={i * 0.07}>
                <div className="faq-item">
                  <button
                    className="faq-trigger"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span>{item.q}</span>
                    <span
                      className="faq-icon"
                      style={{
                        color: openFaq === i ? "var(--brown)" : "var(--mid)",
                        transform: openFaq === i ? "rotate(45deg)" : "none",
                        background: openFaq === i ? "rgba(107,79,58,0.08)" : "transparent",
                      }}
                    >
                      +
                    </span>
                  </button>
                  <div style={{
                    maxHeight: openFaq === i ? 200 : 0,
                    overflow: "hidden",
                    transition: "max-height 0.42s cubic-bezier(0.16,1,0.3,1)",
                  }}>
                    <p style={{ paddingBottom: "1.6rem", color: "var(--mid)", lineHeight: 1.9, fontSize: "0.95rem" }}>
                      {item.a}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        id="contact"
        style={{
          padding: "8rem 3rem",
          background: "var(--dark)",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* subtle texture */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 0,
          backgroundImage: "radial-gradient(rgba(250,246,240,0.03) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }} />
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%,-50%)",
          width: "60vw", height: "60vw", maxWidth: 600, maxHeight: 600,
          background: "radial-gradient(circle, rgba(107,79,58,0.18) 0%, transparent 65%)",
          zIndex: 0, borderRadius: "50%",
        }} />

        <div style={{ position: "relative", zIndex: 1 }}>
          <Reveal>
            <p style={{
              color: "var(--brown)", fontSize: "0.78rem", fontWeight: 700,
              letterSpacing: "0.18em", textTransform: "uppercase",
              marginBottom: "1.8rem",
            }}>
              מוכנים להתחיל?
            </p>
            <h2
              className="serif"
              style={{
                fontSize: "clamp(2.2rem, 5vw, 4rem)",
                color: "#FAF6F0", fontWeight: 700,
                lineHeight: 1.15, marginBottom: "1.5rem",
              }}
            >
              בואו נבנה יחד<br />
              <span style={{ color: "var(--brown)" }}>את הנוכחות שמגיעה לכם</span>
            </h2>
            <p style={{ color: "rgba(250,246,240,0.5)", fontSize: "1.05rem", marginBottom: "3rem", lineHeight: 1.8 }}>
              שלחי הודעה ונתחיל לבנות את הסיפור האמיתי שלך ברשתות
            </p>
            <a href={WA_LINK} target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
              <button className="btn-primary" style={{ fontSize: "1.05rem", padding: "1.15rem 3.2rem" }}>
                📱 שלחי הודעה בוואטסאפ
              </button>
            </a>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        background: "#1a120b",
        padding: "1.6rem 3rem",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        color: "rgba(250,246,240,0.25)", fontSize: "0.78rem",
        flexWrap: "wrap", gap: "0.5rem",
      }}>
        <span>© 2024 יובל חסון | ניהול רשתות חברתיות</span>
        <a href={WA_LINK} target="_blank" rel="noreferrer" style={{ color: "rgba(250,246,240,0.35)", textDecoration: "none", transition: "color 0.3s" }}>
          📱 וואטסאפ
        </a>
      </footer>
    </div>
  );
}