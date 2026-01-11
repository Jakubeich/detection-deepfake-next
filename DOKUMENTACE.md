# Dokumentace Frontendu - DeepFake Detector

## Přehled projektu

DeepFake Detector je webová aplikace pro detekci deepfake obsahu v obrázcích a videích. Frontend je vytvořen pomocí moderních technologií React/Next.js s důrazem na uživatelskou přívětivost a vizuálně atraktivní cyber-themed design.

## Technologie a závislosti

### Hlavní technologie

- **Next.js 16.1.1** - React framework s podporou SSR/SSG
- **React 19.2.3** - UI knihovna
- **TypeScript 5.x** - Typová bezpečnost
- **Tailwind CSS 3.3.6** - Utility-first CSS framework

### UI knihovny a animace

- **Framer Motion 12.23.26** - Animace a přechody
- **Lucide React 0.294.0** - Sada moderních ikon
- **Recharts 2.10.3** - Grafy a vizualizace dat

### Development nástroje

- **ESLint** - Linting kódu
- **PostCSS** - CSS preprocessing
- **Autoprefixer** - Automatické přidávání vendor prefixů

## Architektura projektu

```
detection-deepfake-next/
├── public/                    # Statické soubory
├── src/
│   ├── components/           # React komponenty
│   │   ├── FileUpload.tsx
│   │   ├── Header.tsx
│   │   ├── LoadingAnimation.tsx
│   │   ├── ModeSelector.tsx
│   │   ├── ResultDisplay.tsx
│   │   └── VideoResultDisplay.tsx
│   ├── lib/                  # Utility funkce
│   │   └── api.ts
│   ├── pages/                # Next.js stránky
│   │   ├── _app.tsx
│   │   ├── _document.tsx
│   │   └── index.tsx
│   ├── styles/               # Globální styly
│   │   └── globals.css
│   └── types/                # TypeScript definice
│       └── index.ts
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.ts
└── eslint.config.mjs
```

## Klíčové komponenty

### 1. Header (`Header.tsx`)

**Účel**: Hlavička aplikace s logem a informacemi o stavu systému

**Vlastnosti**:
- Logo s cyber-themed designem
- Status indikátory pro Model a System
- Responzivní layout

**Technické detaily**:
- Používá Framer Motion pro fade-in animace
- Ikony z Lucide React (Shield, Cpu, Activity)
- Gradient efekty pro vizuální styl

### 2. ModeSelector (`ModeSelector.tsx`)

**Účel**: Přepínání mezi režimy analýzy (obrázek/video)

**Props**:
```typescript
{
  mode: 'image' | 'video',
  onModeChange: (mode: AnalysisMode) => void,
  isDisabled?: boolean
}
```

**Vlastnosti**:
- Toggle mezi Image a Video módem
- Vizuální feedback aktivního režimu
- Disable stav během analýzy

### 3. FileUpload (`FileUpload.tsx`)

**Účel**: Nahrávání souborů drag & drop nebo kliknutím

**Props**:
```typescript
{
  mode: 'image' | 'video',
  onFileSelect: (file: File) => void,
  isDisabled?: boolean
}
```

**Klíčové funkce**:
- Drag & drop podpora
- Validace formátu souboru
- Validace velikosti souboru
- Preview nahraného obrázku
- Animované přechody (Framer Motion AnimatePresence)

**Podporované formáty**:
- **Obrázky**: PNG, JPG, JPEG, WebP, GIF (max 10MB)
- **Videa**: MP4, AVI, MOV, WebM, MKV (max 100MB)

### 4. LoadingAnimation (`LoadingAnimation.tsx`)

**Účel**: Zobrazení stavu během zpracování

**Props**:
```typescript
{
  stage?: 'uploading' | 'analyzing' | 'processing',
  progress?: number
}
```

**Vlastnosti**:
- Rotující kroužek indikátor
- Textové stavy (NAHRÁVÁNÍ, ANALYZUJI, ZPRACOVÁNÍ)
- Volitelný progress bar

### 5. ResultDisplay (`ResultDisplay.tsx`)

**Účel**: Zobrazení výsledků analýzy obrázku

**Props**:
```typescript
{
  result: ImageAnalysisResponse
}
```

**Zobrazované informace**:
- Hlavní verdikt (DEEPFAKE/AUTENTICKÝ)
- Pravděpodobnost fake/real (progress bary)
- Úroveň spolehlivosti
- Vizualizace s bounding boxem
- Technická informace o analýze

**Vizuální feedback**:
- Červená/zelená barevná schémata podle výsledku
- Animované ikony (Shield/ShieldAlert)
- Border color podle výsledku

### 6. VideoResultDisplay (`VideoResultDisplay.tsx`)

**Účel**: Zobrazení komplexních výsledků analýzy videa

**Props**:
```typescript
{
  result: VideoAnalysisResponse
}
```

**Zobrazované sekce**:

1. **Hlavní výsledková karta**
   - Verdikt s ikonou
   - Grid statistik (Deepfake %, Framů, Délka, Odchylka)
   - Progress bary pro průměrné pravděpodobnosti

2. **Timeline graf**
   - Recharts area chart
   - Zobrazení pravděpodobnosti deepfake v čase
   - Reference line na 50% prahu
   - Interactive tooltip

3. **Klíčové snímky galerie**
   - Carousel klíčových framů s anotacemi
   - Thumbnail strip pro rychlou navigaci
   - Overlay s frame číslem a pravděpodobností

4. **Info karta**
   - Technické informace o analýze
   - Popis metody agregace
   - Interpretace směrodatné odchylky

## API komunikace

### API endpoint (`src/lib/api.ts`)

**Base URL**: `http://127.0.0.1:5000/api`

#### 1. Health Check
```typescript
GET /health
Response: HealthCheckResponse
```

#### 2. Analýza obrázku
```typescript
POST /analyze/image
Body: FormData (file)
Response: ImageAnalysisResponse
```

#### 3. Analýza videa
```typescript
POST /analyze/video
Body: FormData (file, max_frames)
Response: VideoAnalysisResponse
```

### Utility funkce

```typescript
// Formátování času
formatDuration(seconds: number): string
// Příklad: 125 → "2:05"

// Formátování procent
formatPercentage(value: number): string
// Příklad: 0.856 → "85.6%"

// Úroveň spolehlivosti
getConfidenceLevel(confidence: number): string
// Vrací: "Velmi vysoká" | "Vysoká" | "Střední" | "Nízká"
```

## TypeScript typy

### Hlavní datové struktury

```typescript
interface AnalysisResult {
  fake_probability: number;      // 0.0 - 1.0
  real_probability: number;       // 0.0 - 1.0
  is_deepfake: boolean;
  confidence: number;             // 0.0 - 1.0
  face_detected: boolean;
  bounding_box?: number[];        // [x1, y1, x2, y2]
}

interface VideoResult {
  avg_fake_probability: number;
  avg_real_probability: number;
  std_deviation: number;          // Směrodatná odchylka
  is_deepfake: boolean;
  confidence: number;
  frames_analyzed: number;
  total_frames: number;
  fps: number;
  duration: number;               // sekundy
}

interface KeyFrame {
  frame_index: number;
  visualization: string;          // base64 data URL
  fake_probability: number;
}

interface Timeline {
  indices: number[];              // Frame čísla
  probabilities: number[];        // Pravděpodobnosti
  timestamps: number[];           // Časy v sekundách
}
```

## Design systém

### Barevná paleta (CSS Variables)

```css
--color-cyber-black: #0a0a0f    /* Hlavní pozadí */
--color-cyber-dark: #12121a     /* Sekundární pozadí */
--color-cyber-gray: #1a1a24     /* Karty */
--color-cyber-light: #2a2a3a    /* Hover stavy */

--color-neon-red: #ff3366       /* Deepfake */
--color-neon-green: #00ff88     /* Autentický */
--color-neon-blue: #00d4ff      /* Primární akcent */
--color-neon-purple: #a855f7    /* Sekundární */
--color-neon-yellow: #ffd60a    /* Varování */
```

### Fonty

- **Display**: Orbitron - Pro nadpisy a UI prvky
- **Body**: JetBrains Mono - Pro běžný text a technické údaje

### Tailwind custom classes

```css
.cyber-card          /* Glassmorphism karta */
.cyber-button        /* Primární tlačítko */
.dropzone            /* Drag & drop oblast */
.result-fake         /* Červený border pro fake */
.result-real         /* Zelený border pro real */
```

### Animace principy

- **Fade-in**: 0.2s duration pro většinu elementů
- **Bez zbytečných efektů**: Minimalistický přístup
- **AnimatePresence**: Pro plynulé přechody mezi stavy
- **Progress animace**: 0.5-0.8s easing pro smooth feel

## State management

### Hlavní stav aplikace (index.tsx)

```typescript
const [mode, setMode] = useState<AnalysisMode>('image');
const [status, setStatus] = useState<AnalysisStatus>('idle');
const [selectedFile, setSelectedFile] = useState<File | null>(null);
const [imageResult, setImageResult] = useState<ImageAnalysisResponse | null>(null);
const [videoResult, setVideoResult] = useState<VideoAnalysisResponse | null>(null);
const [error, setError] = useState<string | null>(null);
```

### Status flow

```
idle → uploading → analyzing → complete
                            ↓
                          error
```

## Responsivní design

### Breakpointy

- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1024px (md)
- **Desktop**: > 1024px (lg)

### Přizpůsobení

- Komponenty používají Tailwind responsive utility třídy
- Grid systém se přizpůsobuje (1 → 2 → 3 sloupce)
- Font sizes škálují (text-sm → text-lg)
- Padding a spacing se adaptuje

## Instalace a spuštění

### Požadavky

- Node.js 20+
- npm/yarn/pnpm

### Instalace

```bash
# Naklonování repozitáře
git clone [repository-url]

# Instalace závislostí
npm install
# nebo
yarn install
```

### Development

```bash
npm run dev
# Aplikace běží na http://localhost:3000
```

### Production build

```bash
npm run build
npm run start
```

### Linting

```bash
npm run lint
```

## Konfigurace

### Next.js config (`next.config.ts`)

```typescript
const nextConfig: NextConfig = {
  reactStrictMode: true,
};
```

### Tailwind config (`tailwind.config.ts`)

- Custom color scheme
- Font families
- Content paths pro PurgeCSS

### TypeScript config (`tsconfig.json`)

- Strict mode enabled
- Path aliases (@/ → src/)
- Modern ES target

## Výkon a optimalizace

### Optimalizace

1. **Next.js automatické optimalizace**:
   - Image optimization (next/image)
   - Code splitting
   - Lazy loading komponent

2. **CSS optimalizace**:
   - Tailwind PurgeCSS (pouze použité třídy)
   - PostCSS minifikace

3. **Bundle optimalizace**:
   - Tree shaking
   - Vendor splitting

### Best practices

- Použití `useCallback` pro event handlers
- `memo` pro náročné komponenty (grafy)
- Lazy loading pro těžké závislosti
- AnimatePresence mode="wait" pro plynulé přechody

## Error handling

### Klientská strana

```typescript
try {
  const result = await analyzeImage(file);
  setImageResult(result);
  setStatus('complete');
} catch (err) {
  setError(err instanceof Error ? err.message : 'Neočekávaná chyba');
  setStatus('error');
}
```

### Zobrazení chyb

- Error cards s červeným borderem
- Inline validační zprávy u FileUpload
- Toast notifikace nejsou implementovány (záměrně jednoduché)

## Bezpečnost

### Frontend zabezpečení

1. **Validace na klientu**:
   - Kontrola formátu souboru (extension + MIME type)
   - Kontrola velikosti souboru
   - Prevence XSS (React automatic escaping)

2. **API komunikace**:
   - CORS handle na backendu
   - FormData pro bezpečné nahrávání souborů
   - Error messages sanitizace

### Poznámky k production

- V produkci změnit API_BASE na production URL
- Implementovat proper CORS policy
- Přidat rate limiting na klientu
- Implementovat JWT/session autentikaci (pokud potřeba)

## Známé limitace

1. **API endpoint hardcoded**: `http://127.0.0.1:5000` - změnit pro production
2. **Bez autentikace**: Otevřený přístup
3. **File size limity**: Jen klientská validace (backend má vlastní)
4. **Browser compatibility**: Moderní browsery (ES2020+)
5. **Mobile UX**: Optimalizováno, ale drag & drop na mobilu limitované

---

**Autor**: Jakub Mitrega
**Datum**: Leden 2026
**Framework**: Next.js 16 + React 19
**Účel**: Semestrální projekt - Detekce Deepfake obsahu
