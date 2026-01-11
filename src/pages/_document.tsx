import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="cs">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <meta name="description" content="Pokročilá detekce deepfake obsahu pomocí předtrénovaných modelů z Hugging Face. Analyzujte videa a obrázky pomocí ensemble AI modelů." />
        <meta name="keywords" content="deepfake, detection, AI, neural network, video analysis, image analysis" />
      </Head>
      <body className="cyber-grid hex-pattern min-h-screen">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
