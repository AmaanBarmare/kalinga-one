import { useEffect, useRef, useState } from 'react'

const FRAME_COUNT = 240
const pad = (i) => ('000' + i).slice(-3)
const frameSrc = (i) => `/frames/f_${pad(i + 1)}.webp`

export default function Hero() {
  const heroRef = useRef(null)
  const canvasRef = useRef(null)
  const copyRef = useRef(null)
  const imgsRef = useRef([])
  const stateRef = useRef({ current: -1, pending: 0, raf: false })
  const [activeDot, setActiveDot] = useState(0)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d', { alpha: false })
    let dpr = Math.min(window.devicePixelRatio || 1, 2)

    // ---- preload frames ----
    const imgs = new Array(FRAME_COUNT)
    let firstDrawn = false
    for (let i = 0; i < FRAME_COUNT; i++) {
      const im = new Image()
      im.src = frameSrc(i)
      im.onload = () => {
        if (!firstDrawn) { firstDrawn = true; drawFrame(0, true) }
      }
      imgs[i] = im
    }
    imgsRef.current = imgs

    function drawCover(img) {
      if (!img || !img.complete || !img.naturalWidth) return
      const cw = canvas.clientWidth, ch = canvas.clientHeight
      const ir = img.naturalWidth / img.naturalHeight
      const cr = cw / ch
      let dw, dh
      if (ir > cr) { dh = ch; dw = ch * ir } else { dw = cw; dh = cw / ir }
      ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh)
    }

    function drawFrame(i, force) {
      i = Math.max(0, Math.min(FRAME_COUNT - 1, i | 0))
      const st = stateRef.current
      if (i === st.current && !force) return
      st.current = i
      const img = imgs[i]
      if (img && img.complete && img.naturalWidth) {
        drawCover(img)
      } else {
        for (let k = 1; k < FRAME_COUNT; k++) {
          if (imgs[i - k] && imgs[i - k].complete && imgs[i - k].naturalWidth) { drawCover(imgs[i - k]); break }
          if (imgs[i + k] && imgs[i + k].complete && imgs[i + k].naturalWidth) { drawCover(imgs[i + k]); break }
        }
      }
    }

    function requestDraw(i) {
      const st = stateRef.current
      st.pending = i
      if (st.raf) return
      st.raf = true
      requestAnimationFrame(() => { st.raf = false; drawFrame(st.pending) })
    }

    function sizeCanvas() {
      const w = canvas.clientWidth, h = canvas.clientHeight
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      drawFrame(stateRef.current.current < 0 ? 0 : stateRef.current.current, true)
    }

    const clamp = (v, a, b) => (v < a ? a : v > b ? b : v)

    function onScroll() {
      const hero = heroRef.current
      if (!hero) return
      const r = hero.getBoundingClientRect()
      const total = hero.offsetHeight - window.innerHeight
      const p = clamp(-r.top / total, 0, 1)
      requestDraw(Math.round(p * (FRAME_COUNT - 1)))

      // fade the hero copy after the first slice of scroll
      if (copyRef.current) copyRef.current.classList.toggle('hide', p > 0.12)
      setActiveDot(Math.min(4, Math.floor(p * 5)))
    }

    let ticking = false
    const scrollHandler = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => { onScroll(); ticking = false })
    }
    const resizeHandler = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      sizeCanvas()
      onScroll()
    }

    sizeCanvas()
    onScroll()
    window.addEventListener('scroll', scrollHandler, { passive: true })
    window.addEventListener('resize', resizeHandler)
    return () => {
      window.removeEventListener('scroll', scrollHandler)
      window.removeEventListener('resize', resizeHandler)
    }
  }, [])

  return (
    <section className="hero" ref={heroRef}>
      <div className="sticky">
        <canvas id="hero-stage" ref={canvasRef} />
        <div className="scrim" />
        <div className="ruby-line" />

        <div className="hero-copy" ref={copyRef}>
          <div className="block">
            <div className="eyebrow">ENGINEERED NATURAL SURFACES</div>
            <h1>The art of<br />engineered stone.</h1>
            <p className="sub">
              Quartz, marble and terrazzo — engineered in India, specified across the world.
            </p>
          </div>
          <div className="hero-foot">
            <div className="scroll-tag">
              <span>SCROLL TO EXPLORE</span>
              <span className="rule" />
            </div>
            <div className="dots">
              {[0, 1, 2, 3, 4].map((i) => (
                <i key={i} className={i === activeDot ? 'on' : ''} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
