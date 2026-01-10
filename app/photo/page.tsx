'use client'
import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowLeft, Camera, Maximize2 } from 'lucide-react';
import Link from 'next/link';

const photos = [
  { id: 1, src: '/IMG_6837.jpg', alt: 'Live Performance' },
  { id: 2, src: '/IMG_6838.jpg', alt: 'Studio Portrait' },
  { id: 3, src: '/IMG_6840.jpg', alt: 'Green Light Session' },
  { id: 4, src: '/IMG_6842.jpg', alt: 'Blue Light Session' },
  { id: 5, src: '/IMG_6843.jpg', alt: 'Profile Performance' },
  { id: 6, src: '/IMG_8548.jpg', alt: 'Session 01' },
  { id: 7, src: '/IMG_8568.jpg', alt: 'Session 02' },
  { id: 8, src: '/IMG_8578.jpg', alt: 'Session 03' },
];

export default function PhotoPage() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const isUserScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Horizontal scroll with mouse wheel and touch gestures
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      isUserScrollingRef.current = true;
      setIsPaused(true);
      
      // Use deltaY for vertical wheel and deltaX for horizontal wheel
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      container.scrollLeft += delta;
      
      // Resume auto-scroll after 2 seconds of inactivity
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      scrollTimeoutRef.current = setTimeout(() => {
        isUserScrollingRef.current = false;
        setIsPaused(false);
      }, 2000);
    };

    let touchStartX = 0;
    let touchStartScrollLeft = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
      touchStartScrollLeft = container.scrollLeft;
      isUserScrollingRef.current = true;
      setIsPaused(true);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isUserScrollingRef.current) return;
      const deltaX = e.touches[0].clientX - touchStartX;
      container.scrollLeft = touchStartScrollLeft - deltaX;
    };

    const handleTouchEnd = () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      scrollTimeoutRef.current = setTimeout(() => {
        isUserScrollingRef.current = false;
        setIsPaused(false);
      }, 2000);
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: true });
    container.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  // Auto-scroll continuously
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let animationFrameId: number;
    let lastTime = performance.now();

    const autoScroll = (currentTime: number) => {
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;

      if (!isPaused && !isUserScrollingRef.current) {
        const oneThird = container.scrollWidth / 3;
        
        // Increased speed: 1.2px per 16ms
        container.scrollLeft += (deltaTime / 16) * 1.2;

        // Infinite loop reset logic
        if (container.scrollLeft >= oneThird * 2) {
          container.scrollLeft -= oneThird;
        }
      }

      animationFrameId = requestAnimationFrame(autoScroll);
    };

    animationFrameId = requestAnimationFrame(autoScroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused]);

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#0a0a0a', // Dark theme for photo gallery
      color: '#fff', 
      position: 'relative',
      overflow: 'hidden' 
    }}>
      {/* Immersive Layers */}
      <div className="noise-overlay" style={{ opacity: 0.2 }} />
      <div 
        className="cursor-aura" 
        style={{ 
          left: mousePos.x, 
          top: mousePos.y,
          background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 70%)'
        }} 
      />
      <div 
        className={`custom-cursor ${isHovered ? 'cursor-hover' : ''}`}
        style={{ 
          left: mousePos.x, 
          top: mousePos.y,
          backgroundColor: '#fff'
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
      }}>
        <Link 
          href="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            textDecoration: 'none',
            color: '#fff'
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <ArrowLeft size={20} />
          <span style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase' }}>Back</span>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Camera size={20} />
          <span style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase' }}>Gallery</span>
        </div>
      </nav>

      <main style={{ 
        height: '100vh', 
        display: 'flex', 
        alignItems: 'center',
        overflow: 'hidden'
      }}>
        <div 
          ref={scrollContainerRef}
          className="scrollable-gallery"
          style={{
            display: 'flex',
            height: '100vh',
            overflowX: 'auto',
            overflowY: 'hidden',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
            width: '100%',
            alignItems: 'center',
            padding: '0 40px',
            gap: '40px',
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div style={{ display: 'flex', gap: '40px', minWidth: 'max-content' }}>
          {[...photos, ...photos, ...photos].map((photo, index) => (
            <motion.div
              key={`${photo.id}-${index}`}
              whileHover={{ scale: 1.02 }}
              style={{
                width: 'clamp(300px, 60vw, 800px)',
                height: '70vh',
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '4px',
                flexShrink: 0,
                cursor: 'crosshair'
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'grayscale(100%) contrast(1.1)',
                  transition: 'filter 0.5s ease'
                }}
                className="gallery-img"
              />
              <div style={{
                position: 'absolute',
                bottom: '20px',
                left: '20px',
                opacity: 0,
                transition: 'opacity 0.3s ease'
              }} className="photo-info">
                <p style={{ fontSize: '0.6rem', fontWeight: 900, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                  {photo.alt}
                </p>
              </div>
            </motion.div>
          ))}
          </div>
        </div>
      </main>

      <div style={{
        position: 'fixed',
        bottom: '40px',
        left: '50%',
        transform: 'translateX(-50%)',
        textAlign: 'center',
        opacity: 0.3,
        pointerEvents: 'none'
      }}>
        <p style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.5em', textTransform: 'uppercase' }}>
          Scroll Horizontally / Mouse Wheel / Touch to Navigate
        </p>
      </div>

      <style jsx global>{`
        .scrollable-gallery {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .scrollable-gallery::-webkit-scrollbar {
          display: none;
        }

        .gallery-img:hover {
          filter: grayscale(0%) contrast(1) !important;
        }

        .photo-info {
          opacity: 0;
        }

        div:hover > .photo-info {
          opacity: 1 !important;
        }

        .custom-cursor.cursor-hover {
          width: 60px;
          height: 60px;
          background: transparent !important;
          border: 1px solid rgba(255,255,255,0.5);
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
          width: 600px;
          height: 600px;
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
          border-radius: 50%;
          position: fixed;
          top: 0;
          left: 0;
          pointer-events: none;
          z-index: 1000;
          transform: translate(-50%, -50%);
          transition: transform 0.1s ease-out, width 0.3s, height 0.3s, opacity 0.3s;
        }
      `}</style>
    </div>
  );
}
