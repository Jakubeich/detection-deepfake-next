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
│   │   ├── ui/               # Sdílené UI komponenty
│   │   │   ├── ModeButton.tsx
│   │   │   ├── ProbabilityBar.tsx
│   │   │   ├── StatCard.tsx
│   │   │   ├── StatusIndicator.tsx
│   │   │   └── index.ts
│   │   ├── FileUpload.tsx
│   │   ├── Header.tsx
│   │   ├── LoadingAnimation.tsx
│   │   ├── ModeSelector.tsx
│   │   ├── ResultDisplay.tsx
│   │   ├── VideoResultDisplay.tsx
│   │   └── index.ts          # Export všech komponent
│   ├── lib/                  # API a utility funkce
│   │   ├── api.ts            # API volání
│   │   └── utils.ts          # Formátovací utility
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

**Props**:
```typescript
{
  health?: HealthStatus  // Stav z getServerSideProps
}
```

**Vlastnosti**:
- Logo s cyber-themed designem
- Status indikátory pro Model a System (napojeno na `/api/health`)
- Responzivní layout
- Server-side rendering pro stav backendu

**Technické detaily**:
- Používá Framer Motion pro fade-in animace
- Ikony z Lucide React (Shield, Cpu, Activity)
- Gradient efekty pro vizuální styl
- Status se načítá na serveru přes `getServerSideProps` (bez zatěžování klienta)
- Používá sdílenou komponentu `StatusIndicator` z `components/ui`

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
- Používá sdílenou komponentu `ModeButton` z `components/ui`

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
- Pravděpodobnost fake/real (sdílená komponenta `ProbabilityBar`)
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
   - Grid statistik (sdílená komponenta `StatCard`)
   - Progress bary pro průměrné pravděpodobnosti (sdílená komponenta `ProbabilityBar`)

2. **Klíčové snímky galerie**
   - Carousel klíčových framů s anotacemi
   - Thumbnail strip pro rychlou navigaci
   - Overlay s frame číslem a pravděpodobností

3. **Info karta**
   - Technické informace o analýze
   - Popis metody agregace
   - Interpretace směrodatné odchylky

### 7. Sdílené UI komponenty (`components/ui/`)

Ve složce `components/ui/` jsou umístěny znovupoužitelné UI komponenty:

#### StatusIndicator (`ui/StatusIndicator.tsx`)
**Účel**: Indikátor stavu s ikonou a animovaným bodem
```typescript
{
  icon: React.ReactNode,
  label: string,
  status: 'active' | 'inactive'
}
```

#### ModeButton (`ui/ModeButton.tsx`)
**Účel**: Tlačítko pro přepínač módu s aktivním stavem
```typescript
{
  icon: React.ReactNode,
  label: string,
  isActive: boolean,
  onClick: () => void,
  disabled?: boolean
}
```

#### ProbabilityBar (`ui/ProbabilityBar.tsx`)
**Účel**: Animovaný progress bar pro zobrazení pravděpodobnosti
```typescript
{
  label: string,
  value: number,           // 0.0 - 1.0
  color: 'red' | 'green' | 'blue',
  isHighlighted?: boolean
}
```

#### StatCard (`ui/StatCard.tsx`)
**Účel**: Statistická karta pro zobrazení metriky
```typescript
{
  icon: React.ReactNode,
  label: string,
  value: string,
  color?: 'red' | 'green' | 'blue' | 'default'
}
```

## API komunikace

### API endpoint (`src/lib/api.ts`)

**Base URL**: Konfigurováno přes environment variable `NEXT_PUBLIC_API_BASE_URL`

#### 1. Health Check
```typescript
GET /api/health
Response: HealthCheckResponse
```

#### 2. Analýza obrázku
```typescript
POST /api/analyze/image
Body: FormData (file)
Response: ImageAnalysisResponse
```

#### 3. Analýza videa
```typescript
POST /api/analyze/video
Body: FormData (file, every_n, max_frames)
Response: VideoAnalysisResponse
```

### Utility funkce (`src/lib/utils.ts`)

Formátovací funkce jsou odděleny od API volání:

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

// Barva výsledku
getResultColor(isFake: boolean): string
// Vrací: '#ff3366' | '#00ff88'
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

interface HealthCheckResponse {
  status: string;                 // 'healthy'
  device: string;                 // 'cpu' | 'cuda'
  threshold: number;              // Práh pro detekci (např. 0.65)
  models: {
    ensemble: boolean;            // Zda je ensemble aktivní
    primary: string;              // Primární model
    secondary: string[];          // Sekundární modely
  };
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

// UI typy
type StatusType = 'active' | 'inactive';

interface HealthStatus {
  model: StatusType;
  system: StatusType;
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

### Server-side data (getServerSideProps)

Health check dat jsou načtena na serveru při každém požadavku:

```typescript
export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  try {
    const response = await fetch(`${API_BASE}/api/health`);
    const data = await response.json();
    return {
      props: {
        health: {
          model: data.models?.ensemble ? 'active' : 'inactive',
          system: data.status === 'healthy' ? 'active' : 'inactive',
        },
      },
    };
  } catch {
    return { props: { health: { model: 'inactive', system: 'inactive' } } };
  }
};
```

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

1. **API endpoint**: Konfigurováno přes `NEXT_PUBLIC_API_BASE_URL` environment variable
2. **Bez autentikace**: Otevřený přístup
3. **File size limity**: Jen klientská validace (backend má vlastní)
4. **Browser compatibility**: Moderní browsery (ES2020+)
5. **Mobile UX**: Optimalizováno, ale drag & drop na mobilu limitované

## Principy kódu

### Struktura komponent

- **1 soubor = 1 komponenta**: Každá komponenta má vlastní soubor
- **Sdílené UI**: Znovupoužitelné komponenty v `components/ui/`
- **Index soubory**: Pro snadnější importy (`./ui`, `@/components`)

### Oddělení zodpovědností

- **api.ts**: Pouze API volání (fetch funkce)
- **utils.ts**: Formátovací a pomocné funkce
- **types/index.ts**: TypeScript definice
- **components/ui/**: Sdílené UI komponenty

---

**Autor**: Jakub Mitrega
**Datum**: Leden 2026
**Framework**: Next.js 16 + React 19
**Účel**: Semestrální projekt - Detekce Deepfake obsahu
