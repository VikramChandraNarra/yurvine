import { ImageResponse } from 'next/og'

// Image metadata
export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'

// Image generation
export default async function Icon() {
  // Fetch the Rock Salt font from Google Fonts
  // We use the direct .ttf link obtained from the Google Fonts CSS API
  const fontData = await fetch(
    new URL('https://fonts.gstatic.com/s/rocksalt/v24/MwQ0bhv11fWD6QsAVOZbsA.ttf', 'https://fonts.gstatic.com')
  ).then((res) => res.arrayBuffer())

  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 24,
          background: 'transparent',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#1a1a1a',
          fontFamily: '"Rock Salt"',
          // Adjusting for the descender in 'y' and the font's natural tilt
          paddingBottom: '2px',
          marginTop: '-2px',
        }}
      >
        y
      </div>
    ),
    // ImageResponse options
    {
      ...size,
      fonts: [
        {
          name: 'Rock Salt',
          data: fontData,
          style: 'normal',
          weight: 400,
        },
      ],
    }
  )
}
