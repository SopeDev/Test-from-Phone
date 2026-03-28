'use client'

import { useEffect, useState } from 'react'
import styles from './page.module.css'

const TITLE = 'HOLA'
const SHAPES_COUNT = 15
const SPARKLES_COUNT = 20

const SHAPE_TYPES = ['circle', 'square', 'triangle', 'donut', 'cross']

const randomBetween = (min, max) => Math.random() * (max - min) + min

const Home = () => {
  const [shapes, setShapes] = useState([])
  const [sparkles, setSparkles] = useState([])
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 })
  const [isLoaded, setIsLoaded] = useState(false)
  const [name, setName] = useState('')
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const generatedShapes = Array.from({ length: SHAPES_COUNT }, (_, i) => ({
      id: i,
      type: SHAPE_TYPES[i % SHAPE_TYPES.length],
      size: randomBetween(20, 80),
      left: randomBetween(0, 100),
      top: randomBetween(0, 100),
      duration: randomBetween(15, 35),
      delay: randomBetween(0, 10),
      hue: randomBetween(0, 360),
    }))

    const generatedSparkles = Array.from({ length: SPARKLES_COUNT }, (_, i) => ({
      id: i,
      left: randomBetween(5, 95),
      top: randomBetween(5, 95),
      size: randomBetween(2, 6),
      duration: randomBetween(1, 3),
      delay: randomBetween(0, 5),
    }))

    setShapes(generatedShapes)
    setSparkles(generatedSparkles)

    requestAnimationFrame(() => setIsLoaded(true))
  }, [])

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <main className={styles.scene}>
      <div
        className={styles.spotlight}
        style={{
          background: `radial-gradient(circle 300px at ${mousePos.x}% ${mousePos.y}%, rgba(255,255,255,0.06), transparent)`,
        }}
      />

      <div className={styles.gradientBg} />
      <div className={styles.gridOverlay} />
      <div className={styles.noiseOverlay} />

      <div className={styles.shapesContainer}>
        {shapes.map((shape) => (
          <div
            key={shape.id}
            className={`${styles.floatingShape} ${styles[shape.type]}`}
            style={{
              width: shape.size,
              height: shape.size,
              left: `${shape.left}%`,
              top: `${shape.top}%`,
              animationDuration: `${shape.duration}s`,
              animationDelay: `${shape.delay}s`,
              '--hue': shape.hue,
            }}
          />
        ))}
      </div>

      <div className={styles.sparklesContainer}>
        {sparkles.map((s) => (
          <div
            key={s.id}
            className={styles.sparkle}
            style={{
              left: `${s.left}%`,
              top: `${s.top}%`,
              width: s.size,
              height: s.size,
              animationDuration: `${s.duration}s`,
              animationDelay: `${s.delay}s`,
            }}
          />
        ))}
      </div>

      <div className={styles.pulseRings}>
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={styles.ring}
            style={{ animationDelay: `${i * 1.5}s` }}
          />
        ))}
      </div>

      <div className={styles.titleContainer}>
        <h1 className={styles.title} data-text={TITLE}>
          {TITLE.split('').map((char, i) => (
            <span
              key={i}
              className={`${styles.letter} ${isLoaded ? styles.letterVisible : ''}`}
              style={{
                animationDelay: `${i * 0.07}s`,
                '--i': i,
                '--total': TITLE.length,
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h1>

        <div className={styles.glitchLayer} aria-hidden="true">
          <h1 className={styles.glitchText} data-text={TITLE}>
            {TITLE}
          </h1>
        </div>

        <div className={styles.subtitle}>
          <span className={styles.subtitleText}>
            {submitted ? `${name} 🫸 💩 toma` : '¿Cómo te llamas?'}
          </span>
        </div>

        {!submitted && (
          <div className={styles.inputGroup}>
            <input
              className={styles.nameInput}
              type="text"
              placeholder="Escribe tu nombre..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && name.trim() && setSubmitted(true)}
            />
            <button
              className={styles.submitBtn}
              onClick={() => name.trim() && setSubmitted(true)}
            >
              Saludar
            </button>
          </div>
        )}
      </div>

      <div className={styles.scanline} />
    </main>
  )
}

export default Home
