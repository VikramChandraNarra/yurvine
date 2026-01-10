import { ImageResponse } from 'next/og'

// Image metadata
export const size = {
  width: 180,
  height: 180,
}
export const contentType = 'image/png'

// Image generation
export default async function Icon() {
  // Fetch the Rock Salt font from Google Fonts
  const fontData = await fetch(
    new URL('https://fonts.gstatic.com/s/rocksalt/v24/MwQ0bhv11fWD6QsAVOZbsA.ttf', 'https://fonts.gstatic.com')
  ).then((res) => res.arrayBuffer())

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
          fontFamily: '"Rock Salt"',
          paddingBottom: '20px',
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
