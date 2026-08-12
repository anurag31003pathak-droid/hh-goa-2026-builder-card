import { RoleType } from '../types/builder';

const ROLE_TITLES: Record<string, string[]> = {
  'AI Engineer': [
    'THE MODEL WHISPERER',
    'THE PROMPT MAGICIAN',
    'THE AGENT ARCHITECT',
    'THE NEURAL WIZARD',
    'THE LLM SURGEON'
  ],
  'Full Stack Developer': [
    'THE PRODUCT SHIPPER',
    'THE FULL-STACK MAESTRO',
    'THE END-TO-END HACKER',
    'THE SHIP MACHINE',
    'THE MONOLITH BREAKER'
  ],
  'Frontend Developer': [
    'THE PIXEL HACKER',
    'THE INTERFACE CRAFTSMAN',
    'THE DOM SURGEON',
    'THE UI WARRIOR',
    'THE RENDERING WIZARD'
  ],
  'Backend Developer': [
    'THE SYSTEM BUILDER',
    'THE PROTOCOL SURGEON',
    'THE INFRA ARCHITECT',
    'THE DATABASE WARLOCK',
    'THE LATENCY KILLER'
  ],
  'ML Engineer': [
    'THE PATTERN HUNTER',
    'THE ALGORITHM ALCHEMIST',
    'THE TENSOR MASTER',
    'THE WEIGHT TUNER',
    'THE PIPELINE FORGER'
  ],
  'Data Scientist': [
    'THE DATA EXPLORER',
    'THE INSIGHT MINER',
    'THE SIGNAL EXTRACTOR',
    'THE DATA WARLOCK',
    'THE VECTOR SCIENTIST'
  ],
  'Designer': [
    'THE VISION CRAFTSMAN',
    'THE PIXEL POET',
    'THE EXPERIENCE WEAVER',
    'THE VECTOR ARTISAN',
    'THE DESIGN ARCHITECT'
  ],
  'Product Builder': [
    'THE IDEA TURNER',
    'THE ZERO-TO-ONE BUILDER',
    'THE FEATURE FORGER',
    'THE CHAOS HARNESSER',
    'THE PRODUCT CATALYST'
  ],
  'Indie Hacker': [
    'THE SOLO SHIPPER',
    'THE BOOTSTRAP NINJA',
    'THE ONE-MAN ARMY',
    'THE SHIPPER MONSTER',
    'THE REVENUE HACKER'
  ],
  'Other': [
    'THE CODE ARCHITECT',
    'THE DIGITAL CRAFTSMAN',
    'THE CHAOS SHIPPER',
    'THE GOA HACKER',
    'THE CYBER BUILDER'
  ]
};

const STACK_TITLES: Record<string, string> = {
  'React': 'THE COMPONENT MASTER',
  'Node.js': 'THE EVENT LOOP DEMON',
  'Python': 'THE AUTOMATION BUILDER',
  'AI': 'THE INTELLIGENCE FORGER',
  'TypeScript': 'THE TYPE SAFETY WARRIOR',
  'Rust': 'THE MEMORY GUARDIAN',
  'Go': 'THE CONCURRENCY KING',
  'Solana': 'THE BLOCKCHAIN SHIPPER',
  'PyTorch': 'THE GRADIENT DESCENT WARLOCK',
  'Docker': 'THE CONTAINER COMMANDER'
};

export function generateTitle(role: string, stack: string[] = [], cycleIndex: number = 0): string {
  // Check stack titles first if cycle index is matching stack length
  const matchedStackTitles = stack
    .map(s => STACK_TITLES[s])
    .filter(Boolean);

  const availableRoleTitles = ROLE_TITLES[role] || ROLE_TITLES['Other'];
  const pool = [...availableRoleTitles, ...matchedStackTitles];

  if (pool.length === 0) return 'THE GOA BUILDER';

  const normalizedIndex = Math.abs(cycleIndex) % pool.length;
  return pool[normalizedIndex];
}

export function generateRandomSerialNumber(): string {
  const randomDigits = Math.floor(1000 + Math.random() * 9000);
  const randomChar = String.fromCharCode(65 + Math.floor(Math.random() * 26));
  return `HH26-GOA-${randomDigits}-${randomChar}`;
}
