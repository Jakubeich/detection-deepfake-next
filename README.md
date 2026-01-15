# 🛡️ DeepFake Detector - Frontend

> **Semestrální projekt** | Umělá inteligence | 2026

Webová aplikace pro detekci deepfake obsahu v obrázcích a videích pomocí předtrénovaných AI modelů.

![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black?logo=next.js)
![React](https://img.shields.io/badge/React-19.2.3-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3.6-38B2AC?logo=tailwindcss)

---

## 📋 Obsah

- [O projektu](#-o-projektu)
- [Funkce](#-funkce)
- [Technologie](#-technologie)
- [Požadavky](#-požadavky)
- [Instalace](#-instalace)
- [Spuštění](#-spuštění)
- [Struktura projektu](#-struktura-projektu)
- [Dokumentace](#-dokumentace)
- [Autor](#-autor)

---

## 🎯 O projektu

DeepFake Detector je frontendová část systému pro detekci manipulovaného mediálního obsahu. Aplikace umožňuje uživatelům nahrát obrázky nebo videa a získat analýzu, zda obsah obsahuje známky deepfake manipulace.

Systém využívá **ensemble více AI modelů** z Hugging Face pro vyšší přesnost detekce a poskytuje vizualizaci výsledků s bounding boxy kolem detekovaných obličejů.

---

## ✨ Funkce

- 🖼️ **Analýza obrázků** - detekce deepfake v statických snímcích
- 🎬 **Analýza videí** - frame-by-frame analýza s agregací výsledků
- 📊 **Vizualizace výsledků** - pravděpodobnostní bary, klíčové snímky
- 🎨 **Moderní UI** - cyber-themed design s animacemi
- 📱 **Responzivní design** - optimalizováno pro desktop i mobil
- ⚡ **SSR health check** - real-time stav backendu

---

## 🛠️ Technologie

| Kategorie | Technologie |
|-----------|-------------|
| **Framework** | Next.js 16.1.1 (Pages Router) |
| **UI knihovna** | React 19.2.3 |
| **Jazyk** | TypeScript 5.x |
| **Styling** | Tailwind CSS 3.3.6 |
| **Animace** | Framer Motion 12.23.26 |
| **Ikony** | Lucide React 0.294.0 |
| **Grafy** | Recharts 2.10.3 |

---

## 📦 Požadavky

- **Node.js** >= 18.x
- **npm** >= 9.x (nebo yarn/pnpm)
- **Backend API** - běžící na `NEXT_PUBLIC_API_BASE_URL`

---

## 🚀 Instalace

1. **Klonování repozitáře**
   ```bash
   git clone https://github.com/Jakubeich/detection-deepfake-next.git
   cd detection-deepfake-next
   ```

2. **Instalace závislostí**
   ```bash
   npm install
   ```

3. **Konfigurace prostředí**
   
   Vytvořte soubor `.env.local`:
   ```env
   NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:5000
   ```

---

## ▶️ Spuštění

### Development
```bash
npm run dev
```
Aplikace bude dostupná na [http://localhost:3000](http://localhost:3000)

### Production build
```bash
npm run build
npm start
```

### Linting
```bash
npm run lint
```

---

## 📁 Struktura projektu

```
src/
├── components/           # React komponenty
│   ├── ui/               # Sdílené UI komponenty
│   │   ├── StatusIndicator.tsx
│   │   ├── ModeButton.tsx
│   │   ├── ProbabilityBar.tsx
│   │   ├── StatCard.tsx
│   │   └── index.ts
│   ├── Header.tsx
│   ├── FileUpload.tsx
│   ├── ModeSelector.tsx
│   ├── LoadingAnimation.tsx
│   ├── ResultDisplay.tsx
│   ├── VideoResultDisplay.tsx
│   └── index.ts
├── lib/                  # API a utility
│   ├── api.ts            # API volání
│   └── utils.ts          # Formátovací funkce
├── pages/                # Next.js stránky
│   ├── _app.tsx
│   ├── _document.tsx
│   └── index.tsx
├── styles/
│   └── globals.css       # Globální styly + Tailwind
└── types/
    └── index.ts          # TypeScript definice
```

---

## 📚 Dokumentace

Podrobná technická dokumentace je dostupná v souboru [DOKUMENTACE.md](./DOKUMENTACE.md).

Obsahuje:
- Detailní popis všech komponent
- API komunikace
- TypeScript typy
- Design systém
- Animace a přechody

---

## 👤 Autor

**Jakub Mitrega**

Semestrální projekt - Umělá inteligence | 2026

---

## 📄 Licence

Tento projekt je vytvořen pro studijní účely.
