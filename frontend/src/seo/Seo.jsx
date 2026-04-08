import React from 'react';
import { Helmet } from 'react-helmet-async';

function getOrigin() {
  const envOrigin = import.meta.env.VITE_SITE_URL;
  if (envOrigin) return envOrigin;
  if (typeof window !== 'undefined' && window.location?.origin) return window.location.origin;
  return 'http://localhost:5173';
}

function safeString(value) {
  return String(value ?? '').trim();
}

export default function Seo({
  title,
  description,
  canonicalPath,
  ogTitle,
  ogDescription,
  ogImageTitle,
}) {
  const origin = getOrigin();
  const canonical = canonicalPath ? `${origin}${canonicalPath}` : origin;

  const finalTitle = safeString(title) || 'Yeva';
  const finalDescription =
    safeString(description) || 'Personal essays and thoughts by Yeva.';

  const finalOgTitle = safeString(ogTitle) || finalTitle;
  const finalOgDescription = safeString(ogDescription) || finalDescription;
  const finalOgImageTitle = safeString(ogImageTitle) || finalOgTitle;

  // Dynamic SVG OG image served by the backend at `/api/og` (Vercel routePrefix).
  // For local dev, Vite proxy rewrites `/api/*` -> `/*`.
  const ogImage = `${origin}/api/og?title=${encodeURIComponent(finalOgImageTitle)}`;

  return (
    <Helmet>
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <link rel="canonical" href={canonical} />

      <meta property="og:site_name" content="Yeva" />
      <meta property="og:title" content={finalOgTitle} />
      <meta property="og:description" content={finalOgDescription} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={ogImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalOgTitle} />
      <meta name="twitter:description" content={finalOgDescription} />
      <meta name="twitter:image" content={ogImage} />

      <meta name="robots" content="index,follow" />
    </Helmet>
  );
}

