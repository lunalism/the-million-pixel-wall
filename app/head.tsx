// app/head.tsx
export default function Head() {
    return (
        <>
            {/* <!-- Primary Meta Tags --> */}
            <title>The Million Pixel Wall</title>
            <meta name="title" content="The Million Pixel Wall" />
            <meta name="description" content="Leave your brand in digital history." />

            {/* <!-- Open Graph / Facebook --> */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://the-million-pixel-wall.vercel.app/" />
            <meta property="og:title" content="The Million Pixel Wall" />
            <meta property="og:description" content="Leave your brand in digital history." />
            <meta property="og:image" content="https://the-million-pixel-wall.vercel.app/og-home.png" />

            {/* <!-- Twitter --> */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content="https://the-million-pixel-wall.vercel.app/" />
            <meta property="twitter:title" content="The Million Pixel Wall" />
            <meta property="twitter:description" content="Leave your brand in digital history." />
            <meta property="twitter:image" content="https://the-million-pixel-wall.vercel.app/og-home.png" />

            {/* <!-- Meta Tags Generated with https://metatags.io --> */}
        </>
    );
  }
  