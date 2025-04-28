import Script from 'next/script';
import React from 'react';

export default function AdSense({ pid }: { pid: string }) {
  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${pid}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}
