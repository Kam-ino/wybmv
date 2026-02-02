import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useAnimationControls, useScroll, useTransform } from 'framer-motion'
import './App.css'
import Stack from './components/PolaroidStack'

export const ITINERARY = [
  'Meet up at ONE AYALA',
  'Go to BGC',
  'Coffee or hot chocolate date',
  'Work a little bit',
  'Walk around BGC',
  'Settle down at a nice spot to talk and exchange gifts',
  'Dinner at Dean & DeLuca',
]

export const MEMORY_PAGES = [
  {
    title: 'Us Being Us',
    photos: ['/photos/us1.jpg', '/photos/us2.jpg', '/photos/us3.jpg', '/photos/us4.jpg', '/photos/us5.jpg', '/photos/us6.jpg', '/photos/us7.jpg', '/photos/us8.jpg'],
    speed: 60, 
  },
  {
    title: 'The Fuel',
    photos: ['/photos/food_(1).jpg', '/photos/food_(2).jpg', '/photos/food_(3).jpg', '/photos/food_(4).jpg', '/photos/food_(5).jpg', '/photos/food_(6).jpg', '/photos/food_(7).jpg', '/photos/food_(8).jpg', '/photos/food_(9).jpg', '/photos/food_(10).jpg', '/photos/food_(11).jpg', '/photos/food_(12).jpg', '/photos/food_(13).jpg', '/photos/food_(14).jpg', '/photos/food_(15).jpg', '/photos/food_(16).jpg', '/photos/food_(17).jpg' ],
    speed: 75,
  },
]

const STORY = [
  {
    title: 'Prologue - The Ice',
    text:
      'Our story began on ice. Awkward steps, nervous laughs, hands reaching out for balance. We held onto each other, not knowing that this was how we’d face everything that came next.',
    photos: ['/photos/ice1.jpg', '/photos/ice2.jpg','/photos/ice3.jpg','/photos/ice4.jpg','/photos/ice5.jpg'],
  },
  {
    title: 'Chapter 1 - Getting to Know Us Better',
    text:
      'One date turned into many. We talked, we laughed, we were learning about each other really slowly. Time started moving differently, and being with you began to feel natural, like home.',
    photos: ['/photos/dates1.jpg','/photos/dates2.jpg','/photos/dates3.jpg'],
  },
  {
    title: 'Chapter 2 - The Broke Era',
    text:
      'We didn’t have much, but we had each other. Cheap meals, long walks, shared dreams, and laughter that made everything feel rich anyway. Somewhere between all of that, I asked you to be my girlfriend, and everything felt real for the first time.',
    photos: ['/photos/broke1.jpg', '/photos/broke2.jpg', '/photos/broke3.jpg', '/photos/broke4.jpg'],
    highlight: true,
  },
  {
    title: 'Chapter 3 - The Café',
    text:
      'Not long after we became official, you became a barista. Night shifts, tired eyes, and me admiring you from across the counter. Even on the busiest days, I was proud of you, watching you grow into this new chapter.',
    photos: ['/photos/cafe1.jpg', '/photos/cafe2.jpg', '/photos/cafe3.jpg', '/photos/cafe4.jpg', '/photos/cafe5.jpg', '/photos/cafe6.jpg'],
  },
  {
    title: 'Chapter 4 - The Fights',
    text:
      'It wasn’t perfect. We fought. We misunderstood. We said things we didn’t always mean. Eight months of growing pains, learning patience, learning forgiveness. In the end, we still chose each other.',
    dark: true,
  },
  {
    title: 'Chapter 5 - Employed',
    text:
      'Then life shifted. I became a web developer. A new phase of life with stability, hope, and believing in myself again. It was the first step in the future we talked about during that one night.',
    photos: ['/photos/job1.jpg', '/photos/job2.jpg', '/photos/job3.jpg'],
  },
  {
    title: 'Chapter 6 - Ascension',
    text:
        'Life slowly opened up to us. We went to places we had only talked about before, creating memories that felt lighter than the past. We were growing, not rushing, just becoming better versions of ourselves together.',
    photos: ['/photos/food_(11).jpg', '/photos/food_(2).jpg', '/photos/food_(17).jpg', '/photos/food_(18).jpg'],
  },
  {
    title: 'Chapter 7 - Bye Bye Café',
    text:
      'After 7 months, you left the café behind for a job I recommended. Now, you had more time for school. more time for us, more time to rest. A little less chaos, and a little more space to breathe, dream, and be present with each other.',
    photos: ['/photos/freedom.jpg', '/photos/freedom2.jpg', '/photos/freedom4.jpg', '/photos/freedom3.jpg'],
  },
  {
    title: 'Chapter 8 - The Family',
    text:
      'When you started joining my family more, everything felt real in a new way. There was warmth, curiosity, and a sense of belonging that didn’t need explaining. In that moment, I knew this wasn’t temporary. This was something worth protecting.',
    photos: ['/photos/family1.jpg', '/photos/family2.jpg', '/photos/family3.jpg'],
  },
  {
    title: 'Chapter 9 - The Future',
    text:
      'Nine months. We’re closing in on our Anniversary. Whatever comes next, I want to face it with you, hand in hand, building something even better than what we’ve already shared. I will always have your back, no matter what. Here’s to us, and to many more chapters ahead.',
    photos: ['/photos/future1.jpg', '/photos/future2.jpg', '/photos/1.jpg', '/photos/food_(5).jpg'],
  },
]

function InfiniteCarousel({ photos, duration, loopCopies = 6 }) {
  const trackRef = useRef(null)
  const [shift, setShift] = useState(0)

  const halfTrack = Array.from({ length: loopCopies }, () => photos).flat()
  const trackItems = [...halfTrack, ...halfTrack]

  useEffect(() => {
    if (!trackRef.current) return
    if (photos.length <= 1) return

    const measure = () => {
      const el = trackRef.current
      if (!el) return
      const half = el.scrollWidth / 2
      setShift(Number.isFinite(half) ? half : 0)
    }

    measure()

    const ro = new ResizeObserver(measure)
    ro.observe(trackRef.current)

    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [photos.length, trackItems.length])

  return (
    <div
      ref={trackRef}
      className="carousel-track"
      style={{
        '--duration': duration,
        '--shift': `${shift}px`,
      }}
    >
      {trackItems.map((p, idx) => (
        <img key={idx} src={p} alt="memory" />
      ))}
    </div>
  )
}


export default function ProposalAdventure() {
  const [visible, setVisible] = useState({})
  const refs = useRef([])
  const fightsRef = useRef(null)
  const CAROUSEL_PER_PHOTO_SEC = 10
  const CAROUSEL_LOOP_COPIES = 6

  const [showItinerary, setShowItinerary] = useState(false)
  const [celebrate, setCelebrate] = useState(false)
  const noButtonControls = useAnimationControls()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.dataset.id
          if (entry.intersectionRatio >= 0.5) {
            setVisible((v) => ({ ...v, [id]: true }))
          } else {
            setVisible((v) => ({ ...v, [id]: false }))
          }
        })
      },
      { threshold: [0, 0.5, 1] }
    )

    refs.current.forEach((el) => observer.observe(el))
        return () => observer.disconnect()
    }, [])

    const { scrollYProgress } = useScroll({
        target: fightsRef,
        offset: ['start end', 'end start'],
    })
  
  const fightsIndex = 4;
  const isFightsActive = fightsIndex === 4 ? visible[`story-${fightsIndex}`] : false;
  const darkness = useTransform(
    scrollYProgress,
    [0, 0.35, 0.65, 1],
    [0, 1, 1, 0]
  )

  const dark = useTransform(
    darkness,
    (d) =>
        `radial-gradient(
        circle at top,
        rgba(26,26,31,${d}),
        rgba(11,11,15,${d}),
        rgba(0,0,0,${d})
        )`
  )

  const bgColor = useTransform(
    scrollYProgress,
    [0, 0.35, 0.65, 1],
    ['radial-gradient(circle at top, #ff9aa2, #ff5d8f, #ff3c6e)', 'radial-gradient(circle at top, #ff9aa2, #ff5d8f, #ff3c6e)', 'radial-gradient(circle at top, #ff9aa2, #ff5d8f, #ff3c6e)', 'radial-gradient(circle at top, #ff9aa2, #ff5d8f, #ff3c6e)']
  )

  return (
    <motion.div
        className="phone-frame"
        style={{ '--bg': isFightsActive ? dark : bgColor }}
    >
      <section className="hero">
        <h1>Our Story</h1>
        <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
            <div className="polaroid rotate-left">
                <img src="/photos/1.jpg" alt="You" />
            </div>
            <div className="polaroid rotate-right">
                <img src="/photos/2.jpg" alt="Me" />
            </div>
        </div>
        <div className="polaroid rotate-center">
            <img src="/photos/3.jpg" alt="Us" />
        </div>
        <p>Scroll slowly 💖</p>
      </section>

      {STORY.map((chapter, i) => (
        <section
            key={i}
            ref={(el) => {
                refs.current[i] = el
                if (chapter.dark) fightsRef.current = el
            }}
            data-id={`story-${i}`}
            className="story-section"
        >
          <motion.div
            className={`story-card 
                ${chapter.dark ? 'dark-chapter' : ''} 
                ${chapter.highlight ? 'highlight-chapter' : ''}`}
            animate={{
                opacity: visible[`story-${i}`] ? 1 : 0,
                y: visible[`story-${i}`] ? 0 : 40,
            }}
            transition={{ duration: 0.6 }}
            >
            {chapter.photos && (
                <div style={{ width: 320, height: 320, margin: '24px auto' }}>
                    <Stack
                    cards={chapter.photos.map(src => (
                        <img src={src} alt="memory" className="card-image" />
                    ))}
                    randomRotation
                    sendToBackOnClick
                    mobileClickOnly
                    sensitivity={140}
                    />
                </div>
            )}


            <h2>{chapter.title}</h2>
            <p>{chapter.text}</p>
          </motion.div>

        </section>
      ))}

      {MEMORY_PAGES.map((page, i) => (
        <section
          key={i}
          ref={(el) => (refs.current[STORY.length + i] = el)}
          data-id={`mem-${i}`}
          className="memory-section"
        >
          <motion.div
            className="memory-card"
            animate={{
              opacity: visible[`mem-${i}`] ? 1 : 0,
              y: visible[`mem-${i}`] ? 0 : 40,
            }}
            transition={{ duration: 0.6 }}
          >
            <h2>{page.title}</h2>
            <div className="carousel">
                {page.photos.length > 1 ? (
                    <InfiniteCarousel
                    photos={page.photos}
                    loopCopies={CAROUSEL_LOOP_COPIES}
                    duration={
                        page.speed
                        ? `${page.speed}s`
                        : `${page.photos.length * CAROUSEL_LOOP_COPIES * CAROUSEL_PER_PHOTO_SEC}s`
                    }
                    />
                ) : (
                    page.photos.map((p, idx) => <img key={idx} src={p} alt="memory" />)
                )}
            </div>

          </motion.div>
        </section>
      ))}

      {['Now,...', 'I have...', 'a question...'].map((t, j) => (
        <section
          key={`announce-${j}`}
          ref={(el) => (refs.current[STORY.length + MEMORY_PAGES.length + j] = el)}
          data-id={`announce-${j}`}
          className="announce-section"
        >
          <motion.div
            className={`announce-card announce-${j}`}
            animate={{
              opacity: visible[`announce-${j}`] ? 1 : 0,
              y: visible[`announce-${j}`] ? 0 : 20,
              scale: visible[`announce-${j}`] ? 1 : 0.98,
            }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="announce-text">{t}</h2>
          </motion.div>
        </section>
      ))}

      <section className="question">
        <h1>Will You Be My<br />Valentine?</h1>
        <div className="choices">
          <button
            className="btn"
            onClick={() => {
              setCelebrate(true)
              setShowItinerary(true)
            }}
          >
            Yes 💖
          </button>

          <motion.button
                className="btn"
                animate={noButtonControls}
                onClick={() => {
                    noButtonControls.start({
                    x: [0, -8, 8, -8, 8, 0],
                    rotate: [0, -2, 2, -2, 2, 0],
                    transition: { duration: 0.38, ease: 'easeOut' },
                    })
                }}
                >
                No 💔
          </motion.button>

        </div>
        <p style={{fontSize: 12}}>on the 16th...</p>
      </section>

      <AnimatePresence>
        {celebrate && (
          <motion.div className="celebration" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h1>YAY!!! 💕</h1>
            <p>I love you baby!!!</p>
            <button
                className="show-itinerary-btn"
                onClick={() => setShowItinerary(!showItinerary)}
            >
                {showItinerary ? "Hide Itinerary" : "Show Itinerary"}
            </button>

            {showItinerary && (
                <motion.div
                    className="itinerary-section"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="itinerary-content">
                      <h4>Our Plan</h4>
                      <ul className="itinerary-list">
                        {ITINERARY.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                </motion.div>
            )}

          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
