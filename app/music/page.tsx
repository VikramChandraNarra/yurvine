'use client'
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Music as MusicIcon, ExternalLink } from 'lucide-react';
import Link from 'next/link';

const songs = [
  {
    title: "vent to me",
    year: "2026",
    id: "0bTZhmFDxEas6hq2Mpow8d",
    type: "album",
    excerpt: "The first breath of the year. 'vent to me' captures that midnight frequency when the world goes quiet and the secrets come out. It's about being that safe space in a city that never stops talking."
  },
  {
    title: "Would You Still Stay? (Interlude)",
    year: "2025",
    id: "10XOyCJpNHHTk5gczW02x7",
    type: "album",
    excerpt: "A moment of vulnerability caught in the middle of the noise. This interlude was written at 3 AM on a rainy Tuesday, questioning the permanence of connections in a fleeting digital age."
  },
  {
    title: "Pride (feat. E.T.L)",
    year: "2025",
    id: "1EfQ89t19XYfxZ73w2HoWK",
    type: "album",
    excerpt: "A collaboration that pushed boundaries. Working with E.T.L brought a raw energy to the track, exploring the weight of ego and the liberation of letting it all go."
  },
  {
    title: "Focus Up",
    year: "2025",
    id: "15PKLXLcDe6IllU2zXe52k",
    type: "album",
    excerpt: "This was the turning point. 'Focus Up' is a mantra turned into a beat. It's the sound of sharpening the vision and cutting out the static."
  },
  {
    title: "I got what you need (feat. Wambso)",
    year: "2025",
    id: "3OCBoGADxlIIJiDzsO40sG",
    type: "album",
    excerpt: "Wambso and I wanted to create something that felt like a warm breeze on a Malaysian evening. It's smooth, confident, and unapologetically soulful."
  },
  {
    title: "I don't fw change (feat. WorldSigned & E.T.L)",
    year: "2025",
    id: "0kjvBChqQBMpOBj0LZCy0y",
    type: "album",
    excerpt: "Change is terrifying, so we made a song about resisting it until you can't anymore. A heavy-hitter with WorldSigned and E.T.L providing the perfect contrast."
  },
  {
    title: "MOVE YOUR BODY (feat. Andre Ang & WorldSigned)",
    year: "2025",
    id: "0mzwCKFgbjKoN1EVKpsYYV",
    type: "album",
    excerpt: "Pure kinetic energy. This track was designed for the basement clubs where the walls sweat and nobody knows your name. Andre and WorldSigned brought the heat."
  },
  {
    title: "I CAN'T LET YOU GO",
    year: "2025",
    id: "0Q94ctT03gLWSI1iq0WEtz",
    type: "album",
    excerpt: "The haunting realization of an obsession. We kept the production sparse to let the desperation breathe. Sometimes the most powerful things are the ones left unsaid."
  },
  {
    title: "Holding On To You (feat. Ace Love)",
    year: "2025",
    id: "7qTv4Y4d2Yd4ba9mlkkVU1",
    type: "album",
    excerpt: "Ace Love's vocals brought a layer of tenderness to this track that I didn't know it needed. It's a story of persistence and the ghosts we choose to keep."
  },
  {
    title: "HMU (feat. Ace Love) [Remix Version]",
    year: "2025",
    id: "1bIFWqm6SEZyK9qq7wJ8ZO",
    type: "album",
    excerpt: "Deconstructing the original to find something new. The remix with Ace Love is a reflection—slower, deeper, and more immersive than the first iteration."
  },
  {
    title: "TIME - EP",
    year: "2025",
    id: "6CxnfgdhOZX7K3gnxCazCz",
    type: "album",
    excerpt: "A four-chapter journey through the hours of the day. From the urgency of 'Time' to the lingering smoke of 'Mess', this EP is a portrait of a year in flux."
  },
  {
    title: "HMU",
    year: "2024",
    id: "6ddp9w22GLIDC2TPAml1Pq",
    type: "album",
    excerpt: "The song that started the conversation. 'Hit Me Up' was the first time I felt like I truly found my voice—a blend of digital yearning and organic rhythm."
  },
  {
    title: "You and Me",
    year: "2022",
    id: "13kUXWAyJ2uKE0tCnRLymk",
    type: "album",
    excerpt: "An early collaboration with Andre Ang. It's raw, it's honest, and it laid the foundation for everything that came after. A reminder of where it all began."
  },
  {
    title: "You and Me (Remixes)",
    year: "2022",
    id: "6XLViSaLi5pnkM1oaOGeLF",
    type: "album",
    excerpt: "Seeing 'You and Me' through different lenses. These remixes by WorldSigned and others showed me the infinite possibilities of a single melody."
  },
  {
    title: "Can't Escape",
    year: "2022",
    id: "62ZhjkOHtbzF0zf0BnCYub",
    type: "album",
    excerpt: "The debut. A frantic, claustrophobic anthem about the feeling of being trapped in your own city. Still feels as urgent today as it did back then."
  }
];

export default function MusicPage() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fdfdfd', color: '#000', position: 'relative' }}>
      {/* Immersive Layers */}
      <div className="noise-overlay" />
      <div 
        className="cursor-aura" 
        style={{ 
          left: mousePos.x, 
          top: mousePos.y,
        }} 
      />
      <div 
        className={`custom-cursor ${isHovered ? 'cursor-hover' : ''}`}
        style={{ 
          left: mousePos.x, 
          top: mousePos.y,
        }} 
      />

      {/* Header/Nav */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        padding: '32px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 100,
        mixBlendMode: 'difference',
        filter: 'invert(1)'
      }}>
        <Link 
          href="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            textDecoration: 'none',
            color: 'inherit'
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <ArrowLeft size={20} />
          <span style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase' }}>Back</span>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <MusicIcon size={20} />
          <span style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase' }}>Music</span>
        </div>
      </nav>

      {/* Main Content */}
      <main style={{
        paddingTop: '128px',
        paddingBottom: '160px',
        paddingLeft: '24px',
        paddingRight: '24px',
        maxWidth: '1100px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 10
      }}>
        <header style={{ marginBottom: '128px', textAlign: 'center' }}>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="handwritten-name"
            style={{ fontSize: 'clamp(3rem, 10vw, 6rem)', marginBottom: '16px' }}
          >
            Discography
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.5 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.4em', textTransform: 'uppercase' }}
          >
            Selected Works 2022 — 2026
          </motion.p>
        </header>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '160px' }}>
          {songs.map((song, index) => (
            <motion.section 
              key={song.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, cubicBezier: [0.16, 1, 0.3, 1] }}
              style={{
                display: 'flex',
                flexDirection: index % 2 === 0 ? 'row' : 'row-reverse',
                alignItems: 'center',
                gap: '80px',
                flexWrap: 'wrap'
              }}
            >
              {/* Spotify Player Container */}
              <div style={{ flex: '1', minWidth: '300px', position: 'relative' }} className="player-container">
                <div style={{
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: '12px',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                  transition: 'transform 0.5s ease'
                }}>
                  <iframe
                    style={{ borderRadius: '12px' }}
                    src={`https://open.spotify.com/embed/${song.type}/${song.id}?utm_source=generator&theme=0`}
                    width="100%"
                    height="352"
                    frameBorder="0"
                    allowFullScreen
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Text Context */}
              <div style={{ flex: '1', minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <span style={{ fontSize: '0.6rem', fontWeight: 900, opacity: 0.2, letterSpacing: '-0.05em' }}>0{index + 1}</span>
                    <div style={{ height: '1px', width: '48px', backgroundColor: 'rgba(0,0,0,0.1)' }} />
                    <span style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', opacity: 0.4 }}>{song.year}</span>
                  </div>
                  <h2 style={{ fontSize: '2.5rem', fontWeight: 800, tracking: '-0.02em', lineHeight: 1.1 }}>
                    {song.title}
                  </h2>
                </div>
                
                <p className="serif" style={{ fontSize: '1.1rem', lineHeight: 1.6, color: 'rgba(0,0,0,0.6)', fontStyle: 'italic' }}>
                  &ldquo;{song.excerpt}&rdquo;
                </p>

                <motion.a
                  href={`https://open.spotify.com/album/${song.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '0.65rem',
                    fontWeight: 900,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    borderBottom: '2px solid rgba(0,0,0,0.1)',
                    paddingBottom: '4px',
                    textDecoration: 'none',
                    color: '#000',
                    width: 'fit-content',
                    transition: 'border-color 0.3s ease'
                  }}
                  className="listen-link"
                >
                  Listen on Spotify
                  <ExternalLink size={12} />
                </motion.a>
              </div>
            </motion.section>
          ))}
        </div>
      </main>

      <footer style={{ padding: '80px 0', textAlign: 'center', opacity: 0.2 }}>
        <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase' }}>© 2026 YURVINE</p>
      </footer>

      <style jsx global>{`
        .serif {
          font-family: 'Playfair Display', serif;
        }

        .noise-overlay {
          position: fixed;
          top: -50%;
          left: -50%;
          right: -50%;
          bottom: -50%;
          width: 200%;
          height: 200vh;
          background: transparent url('https://www.transparenttextures.com/patterns/natural-paper.png') repeat 0 0;
          animation: noise 0.2s infinite;
          opacity: 0.12;
          pointer-events: none;
          z-index: 50;
        }

        @keyframes noise {
          0% { transform: translate(0,0) }
          10% { transform: translate(-5%,-5%) }
          20% { transform: translate(-10%,5%) }
          30% { transform: translate(5%,-10%) }
          40% { transform: translate(-5%,15%) }
          50% { transform: translate(-10%,5%) }
          60% { transform: translate(15%,0) }
          70% { transform: translate(0,10%) }
          80% { transform: translate(-15%,0) }
          90% { transform: translate(10%,5%) }
          100% { transform: translate(5%,0) }
        }

        .cursor-aura {
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(0,0,0,0.03) 0%, rgba(0,0,0,0) 70%);
          position: fixed;
          top: 0;
          left: 0;
          border-radius: 50%;
          pointer-events: none;
          transform: translate(-50%, -50%);
          z-index: 5;
        }

        .custom-cursor {
          width: 8px;
          height: 8px;
          background: #000;
          border-radius: 50%;
          position: fixed;
          top: 0;
          left: 0;
          pointer-events: none;
          z-index: 1000;
          transform: translate(-50%, -50%);
          transition: transform 0.1s ease-out, width 0.3s, height 0.3s, opacity 0.3s;
        }

        .cursor-hover {
          width: 40px;
          height: 40px;
          background: transparent;
          border: 1px solid rgba(0,0,0,0.2);
        }

        .handwritten-name {
          font-family: 'Rock Salt', cursive;
          filter: contrast(120%) brightness(80%);
          display: inline-block;
          cursor: default;
          user-select: none;
        }

        .player-container:hover div {
          transform: translateY(-8px);
        }

        .listen-link:hover {
          border-color: #000 !important;
        }

        @media (max-width: 768px) {
          section {
            flex-direction: column !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </div>
  );
}
