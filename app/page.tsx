'use client'

export default function Home() {
  const navItems = ['PHOTO', 'VIDEO', 'MUSIC', 'DESIGN', 'WRITING', 'ABOUT', 'CONTACT'];

  return (
    <main style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      textAlign: 'center',
      padding: '40px',
      position: 'relative',
      zIndex: 1,
    }}>
      {/* Spotify Button */}
      <a
        href="https://open.spotify.com/artist/7wW7xtpiKFZGgf7geIXxmd?si=TVGzMytfR3KoeTUTas2Tzw"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          width: '40px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textDecoration: 'none',
          zIndex: 100,
        }}
        aria-label="Listen on Spotify"
      >
        <img
          src="/Spotify_logo_without_text.svg.webp"
          alt="Spotify"
          style={{
            width: '24px',
            height: '24px',
            objectFit: 'contain',
            transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        />
      </a>

      {/* Animated Handwritten Logo Container */}
      <div style={{
        marginBottom: '100px',
        animation: 'float 8s ease-in-out infinite'
      }}>
        <h1 className="handwritten-name" style={{
          fontSize: 'clamp(3.5rem, 12vw, 7.5rem)',
          fontWeight: 'normal',
          margin: 0,
          animation: 'fadeInScale 2s cubic-bezier(0.16, 1, 0.3, 1) forwards',
          color: '#1a1a1a',
        }}>
          Yuva
        </h1>
        {/* Artistic smudge/line decoration */}
        <div style={{
          width: '60px',
          height: '3px',
          background: '#000',
          margin: '15px auto',
          opacity: 0.2,
          borderRadius: '50%',
          filter: 'blur(1px)',
        }} />
      </div>

      {/* Navigation Subheadings */}
      <nav style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 'clamp(20px, 5vw, 45px)',
        animation: 'navFadeIn 1.5s ease-out 1s both',
      }}>
        {navItems.map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            style={{
              fontSize: '0.75rem',
              fontWeight: '700',
              textDecoration: 'none',
              color: '#000',
              letterSpacing: '0.25em',
              transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              opacity: 0.4,
              fontFamily: "'Syne', sans-serif",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '1';
              e.currentTarget.style.letterSpacing = '0.35em';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '0.4';
              e.currentTarget.style.letterSpacing = '0.25em';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            {item}
          </a>
        ))}
      </nav>
    </main>
  )
}
