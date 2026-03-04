import React from 'react'

function App() {
  return (
    <div style={{ direction: 'rtl', textAlign: 'center', fontFamily: 'sans-serif', padding: '40px' }}>
      <header style={{ backgroundColor: '#1DA1F2', color: 'white', padding: '50px', borderRadius: '20px' }}>
        <h1>יובל חסון - ניהול סושיאל מקצועי</h1>
        <p>בונים לעסק שלך נוכחות דיגיטלית שמביאה לקוחות</p>
      </header>
      
      <main style={{ marginTop: '30px' }}>
        <h2>השירותים שלנו</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '10px', width: '200px' }}>
            <h3>ניהול תוכן</h3>
            <p>פוסטים, סטוריז ורילס בטיקטוק ובאינסטגרם</p>
          </div>
          <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '10px', width: '200px' }}>
            <h3>אסטרטגיה</h3>
            <p>בניית תוכנית עבודה חודשית מנצחת</p>
          </div>
        </div>
      </main>

      <footer style={{ marginTop: '50px' }}>
        <a href="https://wa.me/972500000000" style={{ backgroundColor: '#25D366', color: 'white', padding: '15px 25px', borderRadius: '50px', textDecoration: 'none', fontWeight: 'bold' }}>
          דברו איתי בוואטסאפ
        </a>
      </footer>
    </div>
  )
}

export default App