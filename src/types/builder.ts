export type RoleType = 
  | 'AI Engineer'
  | 'Full Stack Developer'
  | 'Frontend Developer'
  | 'Backend Developer'
  | 'ML Engineer'
  | 'Data Scientist'
  | 'Designer'
  | 'Product Builder'
  | 'Indie Hacker'
  | 'Other';

export type AspectRatioType = '4:5' | '1:1' | '16:9' | '9:16';

export type PhotoShape = 'rounded-rect' | 'circle' | 'soft-square' | 'event-frame';

export type PhotoFilter = 'natural' | 'warm-goa' | 'tropical' | 'high-contrast' | 'monochrome';

export type CardThemeId = 
  | '01-goa-sunset'
  | '02-tropical-night'
  | '03-beach-club'
  | '04-terminal-goa'
  | '05-minimal-builder';

export type CardLayoutId = 
  | '01-builder-pass'
  | '02-beach-pass'
  | '03-terminal-pass'
  | '04-creator-pass'
  | '05-social-card';

export type CardBgType = 
  | 'goa-beach'
  | 'goa-sunset'
  | 'tropical-ocean'
  | 'tropical-green'
  | 'dark-terminal'
  | 'minimal-cream';

export type VibePreset = 'goa' | 'hacker' | 'sunset' | 'ocean' | 'minimal';

export interface CardThemeOption {
  id: CardThemeId;
  name: string;
  subtitle: string;
  bgGradient: string;
  accentColor: string;
  textColor: string;
}

export interface CardLayoutOption {
  id: CardLayoutId;
  name: string;
  description: string;
}

export interface AspectRatioOption {
  id: AspectRatioType;
  name: string;
  label: string;
  width: number;
  height: number;
}

export interface BuilderData {
  photoUrl: string | null;
  name: string;
  role: RoleType | string;
  customRole?: string;
  stack: string[];
  title: string;
  serialNumber: string;
  socialHandle?: string;
  motto?: string;
  statusBadge?: string;
  // Photo Controls
  photoZoom: number;
  photoOffsetX: number;
  photoOffsetY: number;
  photoRotation: number;
  focalPosition?: 'center' | 'top' | 'bottom';
  photoShape: PhotoShape;
  photoFilter: PhotoFilter;
  // Card Background Controls
  cardBgType: CardBgType;
  cardBgOffsetX: number;
  cardBgOffsetY: number;
  cardBgZoom: number;
  cardBgOverlay: number;
  // Styling & Layout
  cardTheme: CardThemeId;
  cardLayout: CardLayoutId;
  aspectRatio: AspectRatioType;
}

export const DEFAULT_BUILDER: BuilderData = {
  photoUrl: '/demo_builder_photo.png',
  name: 'Anurag Pathak',
  role: 'AI Engineer',
  customRole: '',
  stack: ['React', 'Node.js', 'AI', 'Python'],
  title: 'THE MODEL WHISPERER',
  serialNumber: 'HH26-ANU-01',
  socialHandle: 'anuragpathak',
  motto: 'BUILT TO SHIP.',
  statusBadge: 'READY TO BUILD',
  photoZoom: 1.0,
  photoOffsetX: 0,
  photoOffsetY: 0,
  photoRotation: 0,
  focalPosition: 'top',
  photoShape: 'rounded-rect',
  photoFilter: 'natural',
  cardBgType: 'goa-beach',
  cardBgOffsetX: 0,
  cardBgOffsetY: 0,
  cardBgZoom: 1.0,
  cardBgOverlay: 55,
  cardTheme: '01-goa-sunset',
  cardLayout: '01-builder-pass',
  aspectRatio: '4:5'
};

export const PRESET_ROLES: RoleType[] = [
  'AI Engineer',
  'Full Stack Developer',
  'Frontend Developer',
  'Backend Developer',
  'ML Engineer',
  'Data Scientist',
  'Designer',
  'Product Builder',
  'Indie Hacker',
  'Other'
];

export const POPULAR_STACK_TAGS: string[] = [
  'React',
  'Node.js',
  'Python',
  'AI',
  'TypeScript',
  'Next.js',
  'PyTorch',
  'Rust',
  'Go',
  'SQL',
  'Tailwind',
  'FastAPI',
  'Solana',
  'UI/UX',
  'PostgreSQL',
  'Docker'
];

export const ASPECT_RATIO_OPTIONS: AspectRatioOption[] = [
  { id: '4:5', name: 'Social Feed (4:5)', label: '1080 × 1350', width: 1080, height: 1350 },
  { id: '1:1', name: 'Square (1:1)', label: '1080 × 1080', width: 1080, height: 1080 },
  { id: '16:9', name: 'Banner (16:9)', label: '1200 × 675', width: 1200, height: 675 },
  { id: '9:16', name: 'Story (9:16)', label: '1080 × 1920', width: 1080, height: 1920 }
];

export const CARD_BG_OPTIONS: { id: CardBgType; name: string; imgUrl?: string }[] = [
  { id: 'goa-beach', name: 'Goa Beach', imgUrl: '/goa_beach_bg.png' },
  { id: 'goa-sunset', name: 'Goa Sunset', imgUrl: '/goa_sunset_bg.png' },
  { id: 'tropical-ocean', name: 'Tropical Ocean', imgUrl: '/tropical_ocean_bg.png' },
  { id: 'tropical-green', name: 'Tropical Green' },
  { id: 'dark-terminal', name: 'Dark Terminal' },
  { id: 'minimal-cream', name: 'Minimal Cream' }
];

export const CARD_THEME_OPTIONS: CardThemeOption[] = [
  {
    id: '01-goa-sunset',
    name: 'THE GOA SUNSET',
    subtitle: 'Beach sunset, cream & gold',
    bgGradient: 'from-[#082C2A] via-[#063B2F] to-[#124E3F]',
    accentColor: '#F4C542',
    textColor: '#FFF7E6'
  },
  {
    id: '02-tropical-night',
    name: 'THE TROPICAL PASS',
    subtitle: 'Green tropical, gold & cream',
    bgGradient: 'from-[#04241C] via-[#063B2F] to-[#0A4D3E]',
    accentColor: '#10B981',
    textColor: '#FFF7E6'
  },
  {
    id: '03-beach-club',
    name: 'THE OCEAN BUILDER',
    subtitle: 'Ocean blue, teal & cream',
    bgGradient: 'from-[#093532] via-[#0B4844] to-[#F0644F]',
    accentColor: '#F0644F',
    textColor: '#FFF7E6'
  },
  {
    id: '04-terminal-goa',
    name: 'THE NIGHT HACKER',
    subtitle: 'Deep green & terminal mono',
    bgGradient: 'from-[#031A15] via-[#052C23] to-[#063B2F]',
    accentColor: '#F4C542',
    textColor: '#FFF7E6'
  },
  {
    id: '05-minimal-builder',
    name: 'THE MINIMAL PASS',
    subtitle: 'Cream, deep green & coral accent',
    bgGradient: 'from-[#0B2521] via-[#10342E] to-[#16453D]',
    accentColor: '#F0644F',
    textColor: '#FFF7E6'
  }
];

export const CARD_LAYOUT_OPTIONS: CardLayoutOption[] = [
  {
    id: '01-builder-pass',
    name: 'PORTRAIT BUILDER PASS',
    description: '1080 × 1350 event pass credential'
  },
  {
    id: '02-beach-pass',
    name: 'SQUARE SOCIAL PASS',
    description: '1080 × 1080 profile avatar pass'
  },
  {
    id: '03-terminal-pass',
    name: 'STORY PASS',
    description: '1080 × 1920 fullscreen mobile story'
  },
  {
    id: '04-creator-pass',
    name: 'LANDSCAPE BUILDER PASS',
    description: '1200 × 675 landscape header pass'
  }
];

export const STATUS_BADGES: string[] = [
  'READY TO BUILD',
  'PROTOTYPE SHIPPER',
  'AI AGENT BUILDER',
  'HARDCORE HACKER',
  'GOA HACKATHON VIP'
];

export const PRESET_MOTTOS: string[] = [
  'BUILT TO SHIP.',
  'SHIPPING BEFORE SUNRISE.',
  '0 TO 1 IN GOA.',
  'CODE • BREAK • REPEAT.',
  'CHAOS. CREATIVITY. CODE.'
];
