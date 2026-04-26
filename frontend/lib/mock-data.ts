import type { Tribu, PayoutEvent } from './types'

export const tribes: Tribu[] = [
  {
    id: 'tributario-pe',
    name: 'Tax PE',
    category: 'Legal & Finance',
    description: 'Experts in Peruvian tax law: VAT (IGV), Income Tax, SUNAT, RUC.',
    longDescription: 'Collaborative knowledge base with 5 specialists in Peruvian taxation. Full coverage of tax regimes: RUC, RER, NRUS, MYPE Tax Regime, and General Regime.',
    rating: 4.7,
    totalRatings: 312,
    consultas: 2847,
    pricePerCallSats: 100,
    responseTime: '~1.1s',
    tags: ['SUNAT', 'IGV', 'Income Tax', 'NRUS', 'RER'],
    splits: [
      { wallet: '@curador-3a8f', role: 'Lead curator', pct: 0.40 },
      { wallet: '@validador-9c2e', role: 'Legal validator', pct: 0.30 },
      { wallet: '@contrib-4f1b', role: 'Contributor', pct: 0.10 },
      { wallet: '@contrib-7d3a', role: 'Contributor', pct: 0.10 },
      { wallet: '@contrib-2e8c', role: 'Contributor', pct: 0.10 },
    ],
    isActive: true,
    verified: true,
  },
  {
    id: 'data-science-es',
    name: 'Data Science ES',
    category: 'Technology',
    description: 'ML, Python, statistics, and data analysis for the Spanish-speaking market.',
    longDescription: 'Team of 3 data scientists specialized in applied machine learning, statistical analysis, and data engineering best practices for projects in LATAM and Spain.',
    rating: 4.9,
    totalRatings: 187,
    consultas: 1523,
    pricePerCallSats: 75,
    responseTime: '~0.8s',
    tags: ['Python', 'ML', 'pandas', 'scikit-learn', 'SQL'],
    splits: [
      { wallet: '@curador-ml5g', role: 'Lead curator', pct: 0.50 },
      { wallet: '@contrib-py9x', role: 'Python Expert', pct: 0.25 },
      { wallet: '@contrib-stat', role: 'Statistician', pct: 0.25 },
    ],
    isActive: true,
    verified: true,
  },
  {
    id: 'legal-mx',
    name: 'Legal MX',
    category: 'Legal & Finance',
    description: 'Mexican corporate and tax law. SAT, IMSS, contracts, SAS.',
    longDescription: 'Four Mexican lawyers and accountants covering corporate, tax, and labor law. Specialized in company formation, employment contracts, and SAT compliance.',
    rating: 4.6,
    totalRatings: 248,
    consultas: 1891,
    pricePerCallSats: 150,
    responseTime: '~1.4s',
    tags: ['SAT', 'IMSS', 'SAS', 'SAPI', 'VAT', 'ISR'],
    splits: [
      { wallet: '@curador-lex1', role: 'Lead curator', pct: 0.35 },
      { wallet: '@abogado-corp', role: 'Corporate', pct: 0.25 },
      { wallet: '@contador-mx3', role: 'Tax', pct: 0.25 },
      { wallet: '@contrib-lab4', role: 'Labor', pct: 0.15 },
    ],
    isActive: true,
    verified: true,
  },
  {
    id: 'healthtech-bo',
    name: 'HealthTech BO',
    category: 'Health',
    description: 'Bolivian medical protocols, generic medications, and clinical guidelines.',
    longDescription: 'Six Bolivian healthcare professionals documenting Ministry of Health protocols, essential medicines lists, and clinical guidelines adapted to the Bolivian context.',
    rating: 4.8,
    totalRatings: 129,
    consultas: 934,
    pricePerCallSats: 200,
    responseTime: '~2.1s',
    tags: ['SNIS', 'medications', 'protocols', 'vaccination'],
    splits: [
      { wallet: '@medico-bo1f', role: 'Lead physician curator', pct: 0.30 },
      { wallet: '@farmaco-2g9', role: 'Pharmacist', pct: 0.20 },
      { wallet: '@enfermero-x5', role: 'Nursing', pct: 0.15 },
      { wallet: '@medico-b3k1', role: 'Contributing physician', pct: 0.15 },
      { wallet: '@salud-pub56', role: 'Public health', pct: 0.10 },
      { wallet: '@investig-8h', role: 'Researcher', pct: 0.10 },
    ],
    isActive: true,
    verified: false,
  },
  {
    id: 'defi-ar',
    name: 'DeFi AR',
    category: 'Crypto & DeFi',
    description: 'DeFi, crypto, and digital asset taxes in Argentina. AFIP, CEDEARs.',
    longDescription: 'Four Argentine specialists in decentralized finance covering yield farming, AFIP crypto taxes, exchanges, and the crypto ecosystem under the Argentine regulatory framework.',
    rating: 4.5,
    totalRatings: 203,
    consultas: 1456,
    pricePerCallSats: 125,
    responseTime: '~0.9s',
    tags: ['Bitcoin', 'DeFi', 'AFIP', 'staking', 'CEDEARs'],
    splits: [
      { wallet: '@defi-ar9m2f', role: 'DeFi expert', pct: 0.35 },
      { wallet: '@impues-3f7b', role: 'Tax advisor', pct: 0.30 },
      { wallet: '@crypto-ar2x', role: 'Crypto analyst', pct: 0.20 },
      { wallet: '@contrib-5x1a', role: 'Contributor', pct: 0.15 },
    ],
    isActive: true,
    verified: true,
  },
  {
    id: 'edutech-co',
    name: 'EduTech CO',
    category: 'Education',
    description: 'Colombian pedagogical methodologies, MEN curriculum, and educational gamification.',
    longDescription: 'Three Colombian educators specialized in pedagogical innovation, curriculum design under MEN guidelines, and educational technology for schools and universities in Colombia.',
    rating: 4.4,
    totalRatings: 95,
    consultas: 678,
    pricePerCallSats: 80,
    responseTime: '~1.0s',
    tags: ['MEN', 'pedagogy', 'gamification', 'PISA', 'Icfes'],
    splits: [
      { wallet: '@profe-co1a9', role: 'Pedagogue', pct: 0.45 },
      { wallet: '@curricul-5b3', role: 'Curriculum designer', pct: 0.30 },
      { wallet: '@tecno-edu3f', role: 'EdTech specialist', pct: 0.25 },
    ],
    isActive: false,
    verified: false,
  },
]

const DEMO_QUERIES: Record<string, string[]> = {
  'tributario-pe': [
    'How do I declare fourth-category income tax?',
    'Difference between RER and General Regime',
    'When do I pay monthly VAT (IGV) to SUNAT?',
    'Suspension of fourth-category withholding',
    'Mandatory accounting books for SMEs',
    'What is NRUS and when is it beneficial?',
  ],
  'data-science-es': [
    'How to use SHAP values in sklearn?',
    'XGBoost vs LightGBM: key differences',
    'Handling missing values with pandas',
    'Stratified cross-validation in classification',
    'What is L1 vs L2 regularization?',
    'Feature engineering pipeline in Python',
  ],
  'legal-mx': [
    'How to establish a SAS in Mexico?',
    'Project-based employment contract IMSS',
    'When does VAT withholding apply?',
    'Difference between SAPI and SA de CV',
    'Tax obligations for freelancers',
  ],
  'healthtech-bo': [
    'Updated COVID protocol Bolivia 2026',
    'Child vaccination schedule Bolivia',
    'Essential medicines list SEDES',
    'What does the universal health insurance cover?',
    'Pediatric amoxicillin dosage Bolivia',
  ],
  'defi-ar': [
    'How to declare crypto to AFIP?',
    'Safe yield farming in DeFi 2026',
    'CEDEARs vs foreign stocks?',
    'Income tax on staking',
    'How to use Lightning Network in Argentina?',
  ],
  'edutech-co': [
    'Active vs traditional pedagogy MEN',
    'Gamification in primary education Colombia',
    'How to design OVAs according to MEN?',
    'Strategies for Icfes results',
    'Competency-based curriculum Colombia',
  ],
}

const AGENT_SUFFIXES = [
  'a1b2c3', 'd4e5f6', 'g7h8i9', 'j0k1l2', 'm3n4o5',
  'p6q7r8', 's9t0u1', 'v2w3x4', 'y5z6a7', 'b8c9d0',
  'e1f2g3', 'h4i5j6', 'k7l8m9', 'n0o1p2', 'q3r4s5',
]

let eventCounter = 0

export function generateEvent(phase: 'requested' | 'settled'): PayoutEvent {
  const activeTribe = tribes.filter(t => t.isActive)
  const tribe = activeTribe[Math.floor(Math.random() * activeTribe.length)]
  const queries = DEMO_QUERIES[tribe.id] ?? ['General query']
  const query = queries[Math.floor(Math.random() * queries.length)]
  const agentSuffix = AGENT_SUFFIXES[Math.floor(Math.random() * AGENT_SUFFIXES.length)]

  return {
    id: `evt-${Date.now()}-${++eventCounter}`,
    ts: Date.now(),
    phase,
    tribuId: tribe.id,
    tribuName: tribe.name,
    category: tribe.category,
    totalSats: tribe.pricePerCallSats,
    query,
    agentId: `@agent-${agentSuffix}`,
    splits: tribe.splits.map(s => ({
      wallet: s.wallet,
      role: s.role,
      sats: Math.round(tribe.pricePerCallSats * s.pct),
    })),
  }
}

function makeSettled(tribuId: string, query: string, agentSuffix: string, offsetMs: number): PayoutEvent {
  const tribe = tribes.find(t => t.id === tribuId)!
  return {
    id: `init-${++eventCounter}`,
    ts: Date.now() - offsetMs,
    phase: 'settled',
    tribuId: tribe.id,
    tribuName: tribe.name,
    category: tribe.category,
    totalSats: tribe.pricePerCallSats,
    query,
    agentId: `@agent-${agentSuffix}`,
    splits: tribe.splits.map(s => ({
      wallet: s.wallet,
      role: s.role,
      sats: Math.round(tribe.pricePerCallSats * s.pct),
    })),
  }
}

export const initialEvents: PayoutEvent[] = [
  makeSettled('tributario-pe', 'How do I declare fourth-category income tax?', 'a1b2c3', 4000),
  makeSettled('data-science-es', 'How to use SHAP values in sklearn?', 'd4e5f6', 8500),
  makeSettled('defi-ar', 'How to declare crypto to AFIP?', 'g7h8i9', 13000),
  makeSettled('legal-mx', 'How to establish a SAS in Mexico?', 'j0k1l2', 17500),
  makeSettled('tributario-pe', 'Difference between RER and General Regime', 'm3n4o5', 22000),
  makeSettled('healthtech-bo', 'Child vaccination schedule Bolivia', 'p6q7r8', 27000),
  makeSettled('data-science-es', 'XGBoost vs LightGBM: key differences', 's9t0u1', 31500),
  makeSettled('tributario-pe', 'Suspension of fourth-category withholding', 'v2w3x4', 36000),
  makeSettled('defi-ar', 'Safe yield farming in DeFi 2026', 'y5z6a7', 40500),
  makeSettled('legal-mx', 'Tax obligations for freelancers', 'b8c9d0', 45000),
  {
    id: `init-${++eventCounter}`,
    ts: Date.now() - 2000,
    phase: 'requested',
    tribuId: 'data-science-es',
    tribuName: 'Data Science ES',
    category: 'Technology',
    totalSats: 75,
    query: 'Feature engineering pipeline in Python',
    agentId: '@agent-e1f2g3',
    splits: tribes.find(t => t.id === 'data-science-es')!.splits.map(s => ({
      wallet: s.wallet,
      role: s.role,
      sats: Math.round(75 * s.pct),
    })),
  },
]
