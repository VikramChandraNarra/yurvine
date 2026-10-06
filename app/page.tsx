'use client'
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ArrowDown } from 'lucide-react';
import styles from './home.module.css';
import { motion, useReducedMotion } from 'framer-motion';

export default function Home() {
  const navItems = ['PHOTO', 'VIDEO', 'MUSIC', 'ABOUT', 'CONTACT'];
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const touch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouch(touch);
    setMousePos({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    const handleMouseMove = (e: MouseEvent) => {
      if (!touch) {
        setMousePos({ x: e.clientX, y: e.clientY });
      }
    };
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div style={{ backgroundColor: '#fdfdfd', minHeight: '200vh' }}>
      {/* Immersive Layers */}
      <div className="noise-overlay" />
      <div 
        className="cursor-aura" 
        style={{ 
          left: mousePos.x, 
          top: mousePos.y,
          display: isTouch ? 'none' : 'block'
        }} 
      />
      <div 
        className={`custom-cursor ${isHovered ? 'cursor-hover' : ''}`}
        style={{ 
          left: mousePos.x, 
          top: mousePos.y,
          display: isTouch ? 'none' : 'block'
        }} 
      />

      {/* Sticky Navigation */}
      <motion.nav
        aria-label="Main navigation"
        animate={{
          position: scrolled ? 'fixed' : 'absolute',
          top: scrolled ? 0 : '80svh',
          padding: scrolled ? (isTouch ? '15px 20px' : '20px 40px') : '0px',
          backgroundColor: scrolled ? 'rgba(253, 253, 253, 0.8)' : 'transparent',
          backdropFilter: scrolled ? 'blur(10px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(0,0,0,0.05)' : 'none',
          width: '100%',
          zIndex: 1000,
        }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 'clamp(15px, 4vw, 45px)',
          left: 0,
          flexWrap: 'wrap',
        }}
      >
        {navItems.map((item) => (
          <a
            key={item}
            href={item === 'MUSIC' ? '/music' : item === 'PHOTO' ? '/photo' : item === 'CONTACT' ? '/contact' : item === 'VIDEO' ? 'https://www.youtube.com/@yurvine5448' : `#${item.toLowerCase()}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
              fontSize: '0.65rem',
              fontWeight: '800',
              textDecoration: 'none',
              color: '#000',
              letterSpacing: '0.3em',
              transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              opacity: scrolled ? 0.8 : 0.4,
              fontFamily: "'Syne', sans-serif",
            }}
            className="nav-item"
            target={item === 'VIDEO' ? '_blank' : undefined}
            rel={item === 'VIDEO' ? 'noopener noreferrer' : undefined}
          >
            {item}
          </a>
        ))}
      </motion.nav>

      {/* The original minimal hero, with a portrait layered into the name. */}
      <section className={styles.hero}>
        <motion.div
          className={styles.heroArtwork}
          initial={false}
          animate={{ opacity: scrolled ? 0 : 1 }}
          transition={{ duration: reduceMotion ? 0 : 0.5 }}
        >
          <h1 className={styles.artistName}>YURVINE</h1>
          <div className={styles.portrait}>
            <Image
              src="/images/yurvine-portrait.webp"
              alt="Yurvine in a lavender hoodie"
              width={1700}
              height={3200}
              priority
              sizes="(max-width: 600px) 70vw, 40vw"
            />
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.a
          href="#about"
          aria-label="Scroll to about"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          initial={{ opacity: 0 }}
          animate={{ opacity: scrolled ? 0 : 1 }}
          style={{
            position: 'absolute',
            bottom: '40px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '44px',
            height: '44px',
            color: 'rgba(0,0,0,0.45)',
          }}
        >
          <motion.span
            animate={{ y: reduceMotion ? 0 : [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{ display: 'flex' }}
          >
            <ArrowDown size={24} strokeWidth={1.25} aria-hidden="true" />
          </motion.span>
        </motion.a>
      </section>

      {/* Bio Section */}
      <section id="about" style={{
        padding: '160px 24px',
        maxWidth: '900px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1,
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="serif" style={{ 
              fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', 
              lineHeight: 1.4, 
              color: '#000',
              fontWeight: 400,
            }}>
              I’m <span style={{ fontWeight: 900, fontStyle: 'italic' }}>Yurvine</span>, I’m 17, and I’ve been making music for as long as I can remember. I started because I loved how music made me feel, and over time it became the thing I care about the most.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <p style={{ 
              fontSize: 'clamp(1rem, 2vw, 1.25rem)', 
              lineHeight: 1.8, 
              color: 'rgba(0,0,0,0.6)',
              fontFamily: "'Syne', sans-serif",
              fontWeight: 500,
              maxWidth: '700px',
            }}>
              I spend most of my time writing, recording, and figuring out how to make songs that actually mean something, not just sound good. I’m still learning every day, but I’m serious about this and I put everything I have into my music.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="vision-card"
            style={{ 
              backgroundColor: '#000', 
              padding: 'clamp(30px, 8vw, 60px)', 
              borderRadius: '2px',
              color: '#fff',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div className="noise-overlay" style={{ opacity: 0.05 }} />
            <h2 style={{ 
              fontSize: '0.65rem', 
              fontWeight: 900, 
              letterSpacing: '0.5em', 
              textTransform: 'uppercase',
              marginBottom: '30px',
              opacity: 0.5
            }}>The Vision</h2>
            <p className="serif" style={{ 
              fontSize: 'clamp(1.25rem, 3vw, 2rem)', 
              lineHeight: 1.5,
              fontWeight: 400,
            }}>
              My goal is simple but huge. I want to be the <span style={{ color: '#fff', fontStyle: 'italic' }}>biggest RnB artist</span> in the world and show that our sound belongs on the biggest stages. One day I want to perform at the Super Bowl, not for the fame, but to prove that a kid with a laptop, a mic, and a vision can come from anywhere and still make it all the way.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer Space */}
      <footer style={{ padding: '100px 0', textAlign: 'center', opacity: 0.1 }}>
        <p style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.4em' }}>YURVINE 2026</p>
      </footer>

      <style jsx global>{`
        body {
          cursor: ${isTouch ? 'default' : 'none'};
        }

        .nav-item:hover {
          opacity: 1 !important;
          letter-spacing: 0.4em !important;
          transform: translateY(-2px);
        }
        
        .serif {
          font-family: var(--font-playfair), serif;
        }

        /* Ensure noise overlay covers everything */
        .noise-overlay {
          z-index: 2000;
        }

        @media (max-width: 768px) {
          .nav-item {
            font-size: 0.55rem !important;
            letter-spacing: 0.2em !important;
          }
          
          section {
            padding: 80px 20px !important;
          }

          .vision-card {
            padding: 40px 24px !important;
          }
        }
      `}</style>
    </div>
  )
}
