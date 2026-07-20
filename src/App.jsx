import { useEffect, useRef, useState } from 'react'
import Hero from './Hero.jsx'

/* ---------------------------------------------------------------- TOP BAR */
function TopBar() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.6)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <header className={`topbar${scrolled ? ' scrolled' : ''}`}>
      <img className="logo" src="/logo/wordmark-white.svg" alt="Kalinga Stone" />
      <nav>
        <a href="#collections">Collections</a>
        <a href="#projects">Projects</a>
        <a href="#experience">Experience</a>
        <a href="#company">Company</a>
        <a href="#contact">Contact</a>
        <a className="btn-ruby" href="#contact">Book a Visit</a>
      </nav>
      <button className="btn-ruby nav-toggle" aria-label="Menu">Menu</button>
    </header>
  )
}

/* ----------------------------------------------------------------- TICKER */
const TICKER_ITEMS = [
  '15+ YEARS OF EXPERTISE', '66+ COUNTRIES', '500+ EXQUISITE DESIGNS',
  '20,000+ KITCHENS CRAFTED', 'ITALIAN TECHNOLOGY', '5000+ GLOBAL CLIENTS',
]
function Ticker() {
  const line = TICKER_ITEMS.join('      ·      ') + '      ·      '
  return (
    <div className="ticker">
      <div className="track">
        <span>{line}</span>
        <span>{line}</span>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------ MATERIALITY */
function Materiality() {
  return (
    <section className="materiality">
      <div className="inner">
        <div className="eyebrow">MATERIALITY</div>
        <h2>
          We engineer surfaces that carry the<br />
          soul of natural stone — with the precision of<br />
          modern science.
        </h2>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------- CERTIFICATIONS */
const CERTS = ['NSF/ANSI 51 · FOOD SAFE', 'GREENGUARD GOLD', 'ISO 14001', 'CE MARKED', 'LIFETIME WARRANTY']
function Certifications() {
  return (
    <section className="certs">
      <div className="row">
        <div className="label">CERTIFIED TO GLOBAL STANDARDS</div>
        <div className="dash" />
        {CERTS.map((c) => <div className="pill" key={c}>{c}</div>)}
      </div>
    </section>
  )
}

/* ------------------------------------------------------------- COLLECTIONS */
const MATERIALS = [
  { name: 'Quartz', desc: 'Engineered durability', bullet: true },
  { name: 'Marble', desc: 'Veined elegance', idx: '02' },
  { name: 'Terrazzo', desc: 'Characterful chips', idx: '03' },
  { name: 'Elixir', desc: 'Translucent stone', idx: '04' },
  { name: 'Custom Terrazzo', desc: 'Bespoke blends', idx: '05' },
]
function Collections() {
  return (
    <section className="collections" id="collections">
      <div className="visual" />
      <div className="body">
        <div className="head">
          <div className="eyebrow">COLLECTIONS</div>
          <h2>Five material<br />languages.</h2>
        </div>
        <div className="mat-list">
          {MATERIALS.map((m) => (
            <div className="mat-row" key={m.name}>
              <div className="left">
                {m.bullet ? <span className="bullet" /> : <span className="idx">{m.idx}</span>}
                <span className="name">{m.name}</span>
              </div>
              <div className="right">
                <span className="desc">{m.desc}</span>
                <span className="arrow">→</span>
              </div>
            </div>
          ))}
        </div>
        <div className="hint">Hover a collection to preview · drag to explore all</div>
      </div>
    </section>
  )
}

/* --------------------------------------------------------------- TRENDING */
const TRENDING = [
  { name: 'Murano', tag: 'NEW', cat: 'Terrazzo · 2 finishes', img: '/img/terrazzo.jpg' },
  { name: 'Miraggio Gold', tag: '', cat: 'Marble · 3 finishes', img: '/img/quartz.jpg' },
  { name: 'Voila', tag: 'NEW', cat: 'Elixir · 3 finishes', img: '/img/quartz-wide.jpg' },
]
function Trending() {
  return (
    <section className="trending" id="projects">
      <div>
        <div className="head">
          <div>
            <div className="eyebrow">TRENDING NOW</div>
            <h2>What the studios are specifying.</h2>
          </div>
          <a className="link-arrow" href="#collections">View all <span className="arrow">→</span></a>
        </div>
        <div className="cards-3">
          {TRENDING.map((c) => (
            <div className="tcard" key={c.name}>
              <div className="thumb" style={{ backgroundImage: `url(${c.img})` }} />
              <div className="meta">
                <span className="name">{c.name}</span>
                {c.tag && <span className="tag">{c.tag}</span>}
              </div>
              <div className="cat">{c.cat}</div>
              <a className="qv" href="#">Quick view <span className="arrow">→</span></a>
            </div>
          ))}
        </div>
      </div>
      <a className="btn-ruby-lg" href="#collections">Explore the Collections <span className="arrow">→</span></a>
    </section>
  )
}

/* ---------------------------------------------------------- BROWSE BY SPACE */
const SPACES = [
  { n: '01', t: 'Kitchen', img: '/img/quartz.jpg' },
  { n: '02', t: 'Bathroom', img: '/img/tex-02.jpg' },
  { n: '03', t: 'Living Room', img: '/img/terrazzo.jpg' },
  { n: '04', t: 'Commercial', img: '/img/tex-01.jpg' },
  { n: '05', t: 'Hospitality', img: '/img/quartz-wide.jpg' },
]
function BrowseBySpace() {
  const trackRef = useRef(null)
  const fillRef = useRef(null)
  const drag = useRef({ down: false, startX: 0, startScroll: 0, moved: false })

  const updateProgress = () => {
    const el = trackRef.current, fill = fillRef.current
    if (!el || !fill) return
    const max = el.scrollWidth - el.clientWidth
    const p = max > 0 ? el.scrollLeft / max : 0
    fill.style.left = `${p * 78}%`
  }
  useEffect(() => { updateProgress() }, [])

  const onDown = (e) => {
    const el = trackRef.current
    drag.current = { down: true, startX: e.pageX, startScroll: el.scrollLeft, moved: false }
    el.classList.add('dragging')
  }
  const onMove = (e) => {
    if (!drag.current.down) return
    const el = trackRef.current
    const dx = e.pageX - drag.current.startX
    if (Math.abs(dx) > 4) drag.current.moved = true
    el.scrollLeft = drag.current.startScroll - dx
    updateProgress()
  }
  const onUp = () => {
    drag.current.down = false
    trackRef.current?.classList.remove('dragging')
  }

  return (
    <section className="spaces" id="experience">
      <div className="head">
        <div>
          <div className="eyebrow">BROWSE BY SPACE</div>
          <h2>Stone for every space</h2>
        </div>
        <div className="meta">
          <span className="m">01 / 05</span>
          <span>Drag to explore →</span>
        </div>
      </div>
      <div className="progress"><i ref={fillRef} /></div>
      <div
        className="space-track"
        ref={trackRef}
        onScroll={updateProgress}
        onMouseDown={onDown}
        onMouseMove={onMove}
        onMouseUp={onUp}
        onMouseLeave={onUp}
      >
        {SPACES.map((s) => (
          <div className="space-card" key={s.n} style={{ backgroundImage: `url(${s.img})` }}>
            <div className="cap">
              <div className="n">{s.n}</div>
              <div className="t">{s.t}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ------------------------------------------------------------- VISUALIZER */
const VIS_MATERIALS = [
  { name: 'Calacatta Oro · Polished', swatch: '#d7d1c8', filter: 'none' },
  { name: 'Bianco Terrazzo · Honed', swatch: '#b8afa8', filter: 'saturate(.78) brightness(.97)' },
  { name: 'Grigio Stone · Leathered', swatch: '#8a7f77', filter: 'saturate(.6) brightness(.82) contrast(1.06)' },
  { name: 'Nero Marquina · Polished', swatch: '#5e544e', filter: 'saturate(.5) brightness(.52) contrast(1.14)' },
]

function Visualizer() {
  const wrapRef = useRef(null)
  const draggingRef = useRef(false)
  const [pos, setPos] = useState(50)   // divider position, %
  const [mat, setMat] = useState(0)    // selected material

  const setFromClientX = (clientX) => {
    const el = wrapRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    if (r.width === 0) return
    const p = ((clientX - r.left) / r.width) * 100
    setPos(Math.min(100, Math.max(0, p)))
  }

  // drag begins on the handle only, so clicks elsewhere never jump the divider
  const onPointerDown = (e) => {
    draggingRef.current = true
    e.currentTarget.setPointerCapture?.(e.pointerId)
  }
  const onPointerMove = (e) => { if (draggingRef.current) setFromClientX(e.clientX) }
  const stopDrag = (e) => {
    if (!draggingRef.current) return
    draggingRef.current = false
    e.currentTarget.releasePointerCapture?.(e.pointerId)
  }

  const onKeyDown = (e) => {
    const step = e.shiftKey ? 10 : 2
    if (e.key === 'ArrowLeft') { setPos((p) => Math.max(0, p - step)); e.preventDefault() }
    else if (e.key === 'ArrowRight') { setPos((p) => Math.min(100, p + step)); e.preventDefault() }
    else if (e.key === 'Home') { setPos(0); e.preventDefault() }
    else if (e.key === 'End') { setPos(100); e.preventDefault() }
  }

  return (
    <section className="visualizer">
      <div className="col">
        <div className="lead">
          <div className="eyebrow" style={{ letterSpacing: '4px' }}>VISUALIZER</div>
          <h2>See it in<br /><span className="tan">your space</span>.</h2>
          <p>
            Preview Kalinga surfaces in your own room before you commit — upload a photo,
            choose a material, and watch the space transform instantly.
          </p>
        </div>
        <div className="steps">UPLOAD&nbsp;&nbsp;·&nbsp;&nbsp;SELECT&nbsp;&nbsp;·&nbsp;&nbsp;PREVIEW</div>
        <a className="btn-ruby-lg rounded" href="#">Visualize Your Space <span className="arrow">→</span></a>
      </div>

      <div
        className="ba"
        ref={wrapRef}
        style={{ '--pos': `${pos}%` }}
        onPointerMove={onPointerMove}
        onPointerUp={stopDrag}
        onPointerLeave={stopDrag}
        onPointerCancel={stopDrag}
      >
        {/* base layer — the Kalinga surface (right of the divider) */}
        <div className="ba-layer">
          <img
            className="ba-img"
            src="/img/visualizer-after.jpg"
            alt={`Living room with ${VIS_MATERIALS[mat].name}`}
            style={{ filter: VIS_MATERIALS[mat].filter }}
            draggable="false"
          />
        </div>

        {/* top layer — the original room, masked to the left of the divider */}
        <div className="ba-layer ba-before">
          <img
            className="ba-img"
            src="/img/visualizer-before.jpg"
            alt="Living room before"
            draggable="false"
          />
        </div>

        <span className="ba-tag b">BEFORE</span>
        <span className="ba-tag a">AFTER</span>
        <div className="chip"><i />LIVING ROOM</div>

        <div
          className="ba-handle"
          role="slider"
          tabIndex={0}
          aria-label="Drag to compare before and after"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          aria-valuetext={`${Math.round(pos)}% before, ${100 - Math.round(pos)}% after`}
          onPointerDown={onPointerDown}
          onKeyDown={onKeyDown}
        >
          <span className="ba-line" />
          <span className="ba-grip">‹ ›</span>
        </div>

        <div className="swatches">
          <div className="r">
            {VIS_MATERIALS.map((m, i) => (
              <button
                key={m.name}
                type="button"
                className={`s${i === mat ? ' sel' : ''}`}
                style={{ background: m.swatch }}
                onClick={() => setMat(i)}
                aria-label={m.name}
                aria-pressed={i === mat}
                title={m.name}
              />
            ))}
          </div>
          <span className="cap">{VIS_MATERIALS[mat].name}</span>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------- WHY KALINGA */
const STATS = [
  { num: '35+', lab: 'Years of expertise' },
  { num: '100+', lab: 'Signature collections' },
  { num: '20,000+', lab: 'Projects delivered' },
  { num: '15+', lab: 'Countries served' },
]
function WhyKalinga() {
  return (
    <section className="why">
      <div className="inner">
        <div className="lead">
          <div className="eyebrow">WHY KALINGA</div>
          <h2>Built to a higher standard.</h2>
          <p>Lifetime warranty on every slab — certified to global standards.</p>
        </div>
        <div className="stats">
          {STATS.map((s) => (
            <div className="stat" key={s.lab}>
              <div className="num">{s.num}</div>
              <div className="lab">{s.lab}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------ SELECTED WORK */
function SelectedWork() {
  return (
    <section className="work">
      <a className="top-link" href="#projects">All projects <span className="arrow">→</span></a>
      <div className="caption">
        <div className="eyebrow">SELECTED WORK</div>
        <h2>Skyline Residences</h2>
        <div className="facts">
          <span>Residential</span><span>·</span><span>Mumbai, India</span><span>·</span><span>Calacatta Oro</span>
        </div>
        <a className="view" href="#">View project <span className="arrow">→</span></a>
      </div>
      <div className="pager">
        <div className="count">01 — 12</div>
        <div className="arrows"><span>←</span><span>→</span></div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------- MANUFACTURING */
const STEPS = [
  { i: '01', n: 'Sourcing', d: 'Responsibly quarried raw material, graded by hand.' },
  { i: '02', n: 'Engineering', d: 'High-pressure presses and kilns for absolute consistency.' },
  { i: '03', n: 'Finishing', d: 'Polished, honed and leathered to a flawless surface.' },
  { i: '04', n: 'MaxGuard™', d: 'Our proprietary stain, scratch and heat shield.' },
]
function Manufacturing() {
  return (
    <section className="mfg" id="company">
      <div className="head">
        <div>
          <div className="eyebrow">MANUFACTURING &amp; TECHNOLOGY</div>
          <h2>Engineered with precision.</h2>
        </div>
        <a className="link-arrow" href="#" style={{ color: '#fff' }}>
          <span style={{ color: '#fff' }}>Watch the film</span> <span className="arrow" style={{ color: '#fff' }}>→</span>
        </a>
      </div>
      <div className="film"><div className="play">▶</div></div>
      <div className="steps">
        {STEPS.map((s) => (
          <div className="step" key={s.i}>
            <div className="idx">{s.i}</div>
            <div className="rule" />
            <div className="name">{s.n}</div>
            <div className="desc">{s.d}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ------------------------------------------------------------ FOR THE TRADE */
const TRADE = [
  { t: 'Architects & Designers', d: 'Super-jumbo formats, BIM files, spec sheets and a design desk that speaks fluent architecture.', cta: 'Start specifying' },
  { t: 'Fabricators', d: 'Top-grade slabs, consistent batches and technical support from line to install.', cta: 'Partner with us' },
  { t: 'Distributors', d: 'An export-ready range trusted in 66+ countries — with training and stock support.', cta: 'Become a distributor' },
]
function ForTheTrade() {
  return (
    <section className="trade">
      <div className="lead">
        <div className="eyebrow">FOR THE TRADE</div>
        <h2>Your project, our stone.</h2>
      </div>
      <div className="cards">
        {TRADE.map((c) => (
          <div className="trade-card" key={c.t}>
            <h3>{c.t}</h3>
            <p>{c.d}</p>
            <a className="cta" href="#">{c.cta} <span className="arrow">→</span></a>
          </div>
        ))}
      </div>
    </section>
  )
}

/* --------------------------------------------------------- EXPERIENCE CENTRES */
const CITIES = [
  { name: 'Mumbai', addr: 'Linking Road, Bandra West', on: true },
  { name: 'Delhi', addr: 'MG Road, Saket' },
  { name: 'Bangalore', addr: 'Indiranagar, 100ft Road' },
]
function ExperienceCentres() {
  return (
    <section className="centres" id="contact">
      <div className="body">
        <div className="lead">
          <div className="eyebrow">EXPERIENCE CENTRES</div>
          <h2>Visit us<br />in person.</h2>
          <p>Experience full-scale surfaces, sample libraries and visualiser stations with a specialist by your side.</p>
        </div>
        <div className="cities">
          {CITIES.map((c) => (
            <div className="city" key={c.name}>
              <div className="left">
                <span className={`bullet${c.on ? '' : ' off'}`} />
                <span className="name">{c.name}</span>
              </div>
              <span className="addr">{c.addr}</span>
            </div>
          ))}
        </div>
        <a className="btn-ink" href="#">Book a Visit</a>
      </div>
      <div className="visual" />
    </section>
  )
}

/* --------------------------------------------------------------- JOURNAL */
const SIDE_ARTICLES = [
  { cat: 'LOOKBOOK', t: 'Calacatta in the contemporary kitchen', img: '/img/quartz.jpg' },
  { cat: 'HOMES WE LOVE', t: 'A Goa villa built around terrazzo', img: '/img/terrazzo.jpg' },
  { cat: 'CRAFT', t: 'Inside the art of slab finishing', img: '/img/tex-01.jpg' },
]
function Journal() {
  return (
    <section className="journal">
      <div className="head">
        <div>
          <div className="eyebrow">JOURNAL</div>
          <h2>From the studio</h2>
        </div>
        <a className="link-arrow" href="#">All articles <span className="arrow">→</span></a>
      </div>
      <div className="grid">
        <div className="feat">
          <div className="thumb" />
          <div className="txt">
            <div className="eyebrow" style={{ fontSize: 11, letterSpacing: '2px' }}>DESIGN TRENDS</div>
            <h3>The quiet return of warm minimalism in 2026</h3>
            <p>How designers are pairing engineered stone with warm neutral palettes to create spaces that feel both timeless and alive.</p>
            <a className="read" href="#">Read article <span className="arrow">→</span></a>
          </div>
        </div>
        <div className="side">
          {SIDE_ARTICLES.map((a) => (
            <div className="item" key={a.t}>
              <div className="thumb" style={{ backgroundImage: `url(${a.img})` }} />
              <div className="c">
                <div className="eyebrow">{a.cat}</div>
                <h4>{a.t}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------- VOICES */
const QUOTES = [
  { q: '“The slab looks even better in real life than in the catalogue. It instantly elevated the entire space.”', who: 'HOMEOWNER · MUMBAI' },
  { q: '“Consistent quality, excellent polish, reliable timelines. Our go-to for premium projects.”', who: 'ARCHITECT · DUBAI' },
  { q: '“The veining is incredibly natural, marble’s elegance with quartz’s strength.”', who: 'DESIGNER · SINGAPORE' },
]
function Voices() {
  return (
    <section className="voices">
      <div className="lead">
        <div className="eyebrow">VOICES</div>
        <h2>Trusted across continents.</h2>
      </div>
      <div className="quotes">
        {QUOTES.map((qt) => (
          <div className="quote" key={qt.who}>
            <p>{qt.q}</p>
            <div className="by"><span className="rule" /><span className="who">{qt.who}</span></div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* --------------------------------------------------------- START A PROJECT */
function StartProject() {
  return (
    <section className="start">
      <div className="col">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div className="eyebrow">START A PROJECT</div>
          <h2>Let&apos;s create<br />something lasting.</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div className="actions">
            <a className="btn-white" href="#">Book a Visit</a>
            <a className="btn-outline" href="#">Request Sample</a>
          </div>
          <div className="mail">Or write to us — hello@kalingastone.com</div>
        </div>
      </div>
      <div className="visual" />
    </section>
  )
}

/* ---------------------------------------------------------------- FOOTER */
const FOOT_COLS = [
  { h: 'COLLECTIONS', items: ['Quartz', 'Marble', 'Terrazzo', 'Elixir', 'Custom Terrazzo'] },
  { h: 'COMPANY', items: ['Our Story', 'Craftsmanship', 'Sustainability', 'Innovation', 'Careers'] },
  { h: 'EXPLORE', items: ['Projects', 'Experience', 'Visualizer', 'Find a Dealer'] },
  { h: 'CONTACT', items: ['Sales', 'Support', 'Dealer Locator', 'Book a Visit'] },
]
function Footer() {
  return (
    <footer className="footer">
      <div className="grid">
        <div className="brand-col">
          <img src="/logo/wordmark-white.svg" alt="Kalinga Stone" />
          <p>Premium engineered surfaces — quartz, marble and terrazzo, made in India.</p>
          <div className="sub">
            <input type="email" placeholder="Your email address" aria-label="Email address" />
            <button type="button">Subscribe</button>
          </div>
        </div>
        {FOOT_COLS.map((col) => (
          <div className="col" key={col.h}>
            <h5>{col.h}</h5>
            {col.items.map((it) => <a href="#" key={it}>{it}</a>)}
          </div>
        ))}
      </div>
      <div className="legal">
        <span>© 2026 Kalinga Stone. All rights reserved.</span>
        <div className="links">
          <span>Privacy</span><span>Terms</span><span>Instagram</span><span>LinkedIn</span>
        </div>
      </div>
    </footer>
  )
}

/* ------------------------------------------------------------------- APP */
export default function App() {
  return (
    <>
      <TopBar />
      <Hero />
      <Ticker />
      <Materiality />
      <Certifications />
      <Collections />
      <Trending />
      <BrowseBySpace />
      <Visualizer />
      <WhyKalinga />
      <SelectedWork />
      <Manufacturing />
      <ForTheTrade />
      <ExperienceCentres />
      <Journal />
      <Voices />
      <StartProject />
      <Footer />
    </>
  )
}
