import { ImageResponse } from 'next/og'

// Image metadata
export const size = {
  width: 180,
  height: 180,
}
export const contentType = 'image/png'

// Image generation
export default async function Icon() {
  // Fetch the Rock Salt font from Google Fonts with error handling
  let fontData: ArrayBuffer | null = null;
  try {
    const fontResponse = await fetch(
      new URL('https://fonts.gstatic.com/s/rocksalt/v24/MwQ0bhv11fWD6QsAVOZbsA.ttf', 'https://fonts.gstatic.com'),
      { 
        cache: 'force-cache',
        next: { revalidate: 86400 } // Cache for 24 hours
      }
    );
    if (fontResponse.ok) {
      fontData = await fontResponse.arrayBuffer();
    }
  } catch (error) {
    // If font fetch fails, continue without custom font
    console.error('Failed to fetch font for apple icon:', error);
  }

  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 120,
          background: '#fdfdfd', // Matching the background color from globals.css
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#1a1a1a',
          fontFamily: fontData ? '"Rock Salt"' : 'system-ui, -apple-system, sans-serif',
          paddingBottom: '20px',
        }}
      >
        y
      </div>
    ),
    // ImageResponse options
    {
      ...size,
      ...(fontData ? {
        fonts: [
          {
            name: 'Rock Salt',
            data: fontData,
            style: 'normal',
            weight: 400,
          },
        ],
      } : {}),
    }
  )
}
