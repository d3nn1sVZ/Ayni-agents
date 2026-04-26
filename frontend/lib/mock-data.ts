import type { Tribu, PayoutEvent } from './types'

export const tribes: Tribu[] = [
  {
    id: 'tributario-pe',
    name: 'Tributario PE',
    category: 'Legal & Finanzas',
    description: 'Expertos en derecho tributario peruano: IGV, Renta, SUNAT, RUC.',
    longDescription: 'Base de conocimiento colaborativa con 5 especialistas en tributación peruana. Cobertura completa de régimen tributario: RUC, RER, NRUS, MYPE Tributario y Régimen General.',
    rating: 4.7,
    totalRatings: 312,
    consultas: 2847,
    pricePerCallSats: 100,
    responseTime: '~1.1s',
    tags: ['SUNAT', 'IGV', 'Renta', 'NRUS', 'RER'],
    splits: [
      { wallet: '@curador-3a8f', role: 'Curador principal', pct: 0.40 },
      { wallet: '@validador-9c2e', role: 'Validador legal', pct: 0.30 },
      { wallet: '@contrib-4f1b', role: 'Contribuidor', pct: 0.10 },
      { wallet: '@contrib-7d3a', role: 'Contribuidor', pct: 0.10 },
      { wallet: '@contrib-2e8c', role: 'Contribuidor', pct: 0.10 },
    ],
    isActive: true,
    verified: true,
  },
  {
    id: 'data-science-es',
    name: 'Data Science ES',
    category: 'Tecnología',
    description: 'ML, Python, estadística y análisis de datos para el mercado hispanohablante.',
    longDescription: 'Equipo de 3 data scientists especializados en machine learning aplicado, análisis estadístico y mejores prácticas de ingeniería de datos para proyectos en LATAM y España.',
    rating: 4.9,
    totalRatings: 187,
    consultas: 1523,
    pricePerCallSats: 75,
    responseTime: '~0.8s',
    tags: ['Python', 'ML', 'pandas', 'scikit-learn', 'SQL'],
    splits: [
      { wallet: '@curador-ml5g', role: 'Curador principal', pct: 0.50 },
      { wallet: '@contrib-py9x', role: 'Python Expert', pct: 0.25 },
      { wallet: '@contrib-stat', role: 'Estadístico', pct: 0.25 },
    ],
    isActive: true,
    verified: true,
  },
  {
    id: 'legal-mx',
    name: 'Legal MX',
    category: 'Legal & Finanzas',
    description: 'Derecho corporativo y fiscal mexicano. SAT, IMSS, contratos, SAS.',
    longDescription: 'Cuatro abogados y contadores mexicanos cubriendo derecho mercantil, fiscal y laboral. Especialidad en constitución de empresas, contratos de trabajo y cumplimiento SAT.',
    rating: 4.6,
    totalRatings: 248,
    consultas: 1891,
    pricePerCallSats: 150,
    responseTime: '~1.4s',
    tags: ['SAT', 'IMSS', 'SAS', 'SAPI', 'IVA', 'ISR'],
    splits: [
      { wallet: '@curador-lex1', role: 'Curador principal', pct: 0.35 },
      { wallet: '@abogado-corp', role: 'Corporativo', pct: 0.25 },
      { wallet: '@contador-mx3', role: 'Fiscal', pct: 0.25 },
      { wallet: '@contrib-lab4', role: 'Laboral', pct: 0.15 },
    ],
    isActive: true,
    verified: true,
  },
  {
    id: 'healthtech-bo',
    name: 'HealthTech BO',
    category: 'Salud',
    description: 'Protocolos médicos bolivianos, medicamentos genéricos y guías clínicas.',
    longDescription: 'Seis profesionales de salud bolivianos documentando protocolos del Ministerio de Salud, lista de medicamentos esenciales y guías clínicas adaptadas a la realidad boliviana.',
    rating: 4.8,
    totalRatings: 129,
    consultas: 934,
    pricePerCallSats: 200,
    responseTime: '~2.1s',
    tags: ['SNIS', 'medicamentos', 'protocolos', 'vacunación'],
    splits: [
      { wallet: '@medico-bo1f', role: 'Médico curador', pct: 0.30 },
      { wallet: '@farmaco-2g9', role: 'Farmacéutico', pct: 0.20 },
      { wallet: '@enfermero-x5', role: 'Enfermería', pct: 0.15 },
      { wallet: '@medico-b3k1', role: 'Médico colaborador', pct: 0.15 },
      { wallet: '@salud-pub56', role: 'Salud pública', pct: 0.10 },
      { wallet: '@investig-8h', role: 'Investigador', pct: 0.10 },
    ],
    isActive: true,
    verified: false,
  },
  {
    id: 'defi-ar',
    name: 'DeFi AR',
    category: 'Crypto & DeFi',
    description: 'DeFi, cripto e impuestos de activos digitales en Argentina. AFIP, CEDEARs.',
    longDescription: 'Cuatro especialistas argentinos en finanzas descentralizadas cubriendo yield farming, impuestos crypto AFIP, exchanges y el ecosistema cripto bajo el marco regulatorio argentino.',
    rating: 4.5,
    totalRatings: 203,
    consultas: 1456,
    pricePerCallSats: 125,
    responseTime: '~0.9s',
    tags: ['Bitcoin', 'DeFi', 'AFIP', 'staking', 'CEDEARs'],
    splits: [
      { wallet: '@defi-ar9m2f', role: 'DeFi expert', pct: 0.35 },
      { wallet: '@impues-3f7b', role: 'Asesor fiscal', pct: 0.30 },
      { wallet: '@crypto-ar2x', role: 'Crypto analyst', pct: 0.20 },
      { wallet: '@contrib-5x1a', role: 'Contribuidor', pct: 0.15 },
    ],
    isActive: true,
    verified: true,
  },
  {
    id: 'edutech-co',
    name: 'EduTech CO',
    category: 'Educación',
    description: 'Metodologías pedagógicas colombianas, currículum MEN y gamificación educativa.',
    longDescription: 'Tres educadores colombianos especializados en innovación pedagógica, diseño curricular bajo lineamientos MEN y tecnología educativa para colegios y universidades colombianas.',
    rating: 4.4,
    totalRatings: 95,
    consultas: 678,
    pricePerCallSats: 80,
    responseTime: '~1.0s',
    tags: ['MEN', 'pedagogía', 'gamificación', 'PISA', 'Icfes'],
    splits: [
      { wallet: '@profe-co1a9', role: 'Pedagogo', pct: 0.45 },
      { wallet: '@curricul-5b3', role: 'Diseñador curricular', pct: 0.30 },
      { wallet: '@tecno-edu3f', role: 'EdTech specialist', pct: 0.25 },
    ],
    isActive: false,
    verified: false,
  },
]

const DEMO_QUERIES: Record<string, string[]> = {
  'tributario-pe': [
    '¿Cómo declaro renta de cuarta categoría?',
    'Diferencia entre RER y Régimen General',
    '¿Cuándo pago el IGV mensual a SUNAT?',
    'Suspensión de retenciones cuarta categoría',
    'Libros contables obligatorios para PYME',
    '¿Qué es el NRUS y cuándo conviene?',
  ],
  'data-science-es': [
    '¿Cómo usar SHAP values en sklearn?',
    'XGBoost vs LightGBM: diferencias clave',
    'Manejo de valores nulos con pandas',
    'Cross-validation estratificada en clasificación',
    '¿Qué es la regularización L1 vs L2?',
    'Pipeline de feature engineering en Python',
  ],
  'legal-mx': [
    '¿Cómo constituir una SAS en México?',
    'Contrato de trabajo por proyecto IMSS',
    '¿Cuándo aplica la retención de IVA?',
    'Diferencia entre SAPI y SA de CV',
    'Obligaciones fiscales para freelancers',
  ],
  'healthtech-bo': [
    'Protocolo COVID actualizado Bolivia 2026',
    'Calendario de vacunación infantil Bolivia',
    'Medicamentos esenciales lista SEDES',
    '¿Qué cubre el seguro universal de salud?',
    'Dosis pediátricas amoxicilina Bolivia',
  ],
  'defi-ar': [
    '¿Cómo declarar crypto a la AFIP?',
    'Yield farming seguro en DeFi 2026',
    '¿CEDEARs vs acciones extranjeras?',
    'Impuesto a las ganancias en staking',
    '¿Cómo usar Lightning Network en Argentina?',
  ],
  'edutech-co': [
    'Pedagogía activa vs tradicional MEN',
    'Gamificación en educación primaria Colombia',
    '¿Cómo diseñar OVAs según MEN?',
    'Estrategias para resultados Icfes',
    'Currículum por competencias Colombia',
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
  const queries = DEMO_QUERIES[tribe.id] ?? ['Consulta general']
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
  makeSettled('tributario-pe', '¿Cómo declaro renta de cuarta categoría?', 'a1b2c3', 4000),
  makeSettled('data-science-es', '¿Cómo usar SHAP values en sklearn?', 'd4e5f6', 8500),
  makeSettled('defi-ar', '¿Cómo declarar crypto a la AFIP?', 'g7h8i9', 13000),
  makeSettled('legal-mx', '¿Cómo constituir una SAS en México?', 'j0k1l2', 17500),
  makeSettled('tributario-pe', 'Diferencia entre RER y Régimen General', 'm3n4o5', 22000),
  makeSettled('healthtech-bo', 'Calendario de vacunación infantil Bolivia', 'p6q7r8', 27000),
  makeSettled('data-science-es', 'XGBoost vs LightGBM: diferencias clave', 's9t0u1', 31500),
  makeSettled('tributario-pe', 'Suspensión de retenciones cuarta categoría', 'v2w3x4', 36000),
  makeSettled('defi-ar', 'Yield farming seguro en DeFi 2026', 'y5z6a7', 40500),
  makeSettled('legal-mx', 'Obligaciones fiscales para freelancers', 'b8c9d0', 45000),
  {
    id: `init-${++eventCounter}`,
    ts: Date.now() - 2000,
    phase: 'requested',
    tribuId: 'data-science-es',
    tribuName: 'Data Science ES',
    category: 'Tecnología',
    totalSats: 75,
    query: 'Pipeline de feature engineering en Python',
    agentId: '@agent-e1f2g3',
    splits: tribes.find(t => t.id === 'data-science-es')!.splits.map(s => ({
      wallet: s.wallet,
      role: s.role,
      sats: Math.round(75 * s.pct),
    })),
  },
]
