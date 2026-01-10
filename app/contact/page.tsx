'use client'
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function ContactPage() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fdfdfd', color: '#000', position: 'relative', overflow: 'hidden' }}>
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

      {/* Nav */}
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
          <span style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase' }}>Home</span>
        </Link>
        <span style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', opacity: 0.4 }}>Connect</span>
      </nav>

      <main style={{
        paddingTop: '160px',
        paddingBottom: '100px',
        paddingLeft: '24px',
        paddingRight: '24px',
        maxWidth: '700px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 10
      }}>
        <header style={{ marginBottom: '80px' }}>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="handwritten-name"
            style={{ fontSize: 'clamp(3rem, 10vw, 5rem)', marginBottom: '16px' }}
          >
            Say Hello
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 0.3 }}
            style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.4em', textTransform: 'uppercase' }}
          >
            Inquiries • Collaborations • Just Vibe
          </motion.p>
        </header>

        <motion.form 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          onSubmit={handleSubmit}
          style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}
        >
          <div style={{ position: 'relative' }}>
            <input 
              type="text" 
              required
              placeholder="YOUR NAME"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="form-input"
            />
          </div>

          <div style={{ position: 'relative' }}>
            <input 
              type="email" 
              required
              placeholder="YOUR EMAIL"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="form-input"
            />
          </div>

          <div style={{ position: 'relative' }}>
            <textarea 
              required
              rows={4}
              placeholder="YOUR MESSAGE"
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="form-input"
              style={{ resize: 'none' }}
            />
          </div>

          <button
            type="submit"
            disabled={status === 'loading'}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
              padding: '20px',
              backgroundColor: '#000',
              color: '#fff',
              border: 'none',
              borderRadius: '2px',
              fontSize: '0.65rem',
              fontWeight: 900,
              letterSpacing: '0.4em',
              textTransform: 'uppercase',
              cursor: 'none',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              opacity: status === 'loading' ? 0.5 : 1
            }}
          >
            {status === 'loading' ? 'Sending...' : 'Transmit'}
            <Send size={14} />
          </button>

          <AnimatePresence>
            {status === 'success' && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#008000', fontSize: '0.75rem', fontWeight: 600 }}
              >
                <CheckCircle2 size={16} />
                Message received. I&apos;ll get back to you soon.
              </motion.div>
            )}
            {status === 'error' && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#ff0000', fontSize: '0.75rem', fontWeight: 600 }}
              >
                <AlertCircle size={16} />
                Something went wrong. Please try again.
              </motion.div>
            )}
          </AnimatePresence>
        </motion.form>

        <footer style={{ marginTop: '120px', display: 'flex', gap: '40px', opacity: 0.3 }}>
          <a href="mailto:contact@yuva.com" className="social-link">EMAIL</a>
          <a href="https://instagram.com/yurvine" target="_blank" className="social-link">INSTAGRAM</a>
          <a href="https://twitter.com/yurvine" target="_blank" className="social-link">TWITTER</a>
        </footer>
      </main>

      <style jsx global>{`
        .form-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid rgba(0,0,0,0.1);
          padding: 15px 0;
          font-family: var(--font-syne), sans-serif;
          font-size: 0.85rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          color: #000;
          transition: all 0.3s ease;
          outline: none;
        }

        .form-input:focus {
          border-bottom: 1px solid #000;
          padding-left: 10px;
        }

        .form-input::placeholder {
          font-size: 0.6rem;
          font-weight: 800;
          letter-spacing: 0.3em;
          opacity: 0.3;
        }

        .social-link {
          font-size: 0.6rem;
          font-weight: 800;
          letter-spacing: 0.3em;
          text-decoration: none;
          color: #000;
          transition: opacity 0.3s ease;
        }

        .social-link:hover {
          opacity: 1 !important;
        }

        .handwritten-name {
          font-family: var(--font-rock-salt), cursive;
          filter: contrast(120%) brightness(80%);
          display: inline-block;
          cursor: default;
          user-select: none;
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
      `}</style>
    </div>
  );
}
