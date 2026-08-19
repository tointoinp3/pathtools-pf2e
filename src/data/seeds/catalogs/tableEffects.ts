import type { CatalogTableEffect } from '@/types/catalogEffects'
import type { ConnectionTarget } from '@/types/connections'

function bonus(
  target: ConnectionTarget,
  formula: string,
  when?: CatalogTableEffect['when'],
  label?: string,
): CatalogTableEffect {
  return { kind: 'bonus', target, formula, when, label }
}

function resist(
  damageType: string,
  formula: string,
  when?: CatalogTableEffect['when'],
): CatalogTableEffect {
  return {
    kind: 'bonus',
    target: `resistance.${damageType}`,
    formula,
    when,
    label: `Resistência (${damageType})`,
  }
}

function perDie(
  damageType: string,
  amount: number,
  when: CatalogTableEffect['when'] = 'spark',
  extra?: { persistent?: boolean; appliesTo?: 'all' | 'melee' | 'ranged' },
): CatalogTableEffect {
  return {
    kind: 'damagePerDie',
    damageType,
    perDie: amount,
    when,
    persistent: extra?.persistent,
    appliesTo: extra?.appliesTo,
  }
}

/** Efeitos de mesa por id de opção de catálogo. */
export const CATALOG_TABLE_EFFECTS: Record<string, CatalogTableEffect[]> = {
  // —— Inventor: armadura ——
  'armor-mod-harmonic-oscillator': [
    resist('force', '3 + MEIO_NIVEL'),
    resist('sonic', '3 + MEIO_NIVEL'),
    resist('force', '2', 'overdrive'),
    resist('sonic', '2', 'overdrive'),
  ],
  'armor-mod-metallic-reactance': [
    resist('acid', '3 + MEIO_NIVEL'),
    resist('electricity', '3 + MEIO_NIVEL'),
    resist('acid', '2', 'overdrive'),
    resist('electricity', '2', 'overdrive'),
  ],
  'armor-mod-muscular-exoskeleton': [
    bonus('skill.athletics', '1', 'overdrive', 'Exoesqueleto'),
  ],
  'armor-mod-otherworldly-protection': [
    resist('void', '3 + MEIO_NIVEL'),
    resist('spirit', '3 + MEIO_NIVEL'),
  ],
  'armor-mod-phlogistonic-regulator': [
    resist('cold', 'MEIO_NIVEL'),
    resist('fire', 'MEIO_NIVEL'),
    resist('cold', '2', 'overdrive'),
    resist('fire', '2', 'overdrive'),
  ],
  'armor-mod-speed-boosters': [
    bonus('speed', '5', 'always', 'Impulsores'),
    bonus('speed', '5', 'overdrive', 'Impulsores (sobrecarga)'),
  ],
  'armor-mod-subtle-dampeners': [
    bonus('skill.stealth', '1', 'overdrive', 'Amortecedores'),
  ],
  'armor-mod-antimagic-plating': [
    bonus('ac', '1', 'always', 'Antimagia (vs magias)'),
    bonus('save', '1', 'always', 'Antimagia (vs magias)'),
  ],
  'armor-mod-dense-plating': [resist('slashing', 'MEIO_NIVEL')],
  'armor-mod-layered-mesh': [resist('piercing', 'MEIO_NIVEL')],
  'armor-mod-tensile-absorption': [resist('bludgeoning', 'MEIO_NIVEL')],
  'armor-mod-hyper-boosters': [
    bonus('speed', '10', 'always', 'Hiperimpulsores'),
    bonus('speed', '10', 'overdrive', 'Hiperimpulsores (sobrecarga)'),
  ],
  'armor-mod-energy-barrier': [
    resist('acid', '2 + MEIO_NIVEL'),
    resist('cold', '2 + MEIO_NIVEL'),
    resist('electricity', '2 + MEIO_NIVEL'),
    resist('fire', '2 + MEIO_NIVEL'),
    resist('force', '2 + MEIO_NIVEL'),
    resist('sonic', '2 + MEIO_NIVEL'),
    resist('vitality', '2 + MEIO_NIVEL'),
    resist('void', '2 + MEIO_NIVEL'),
  ],
  'armor-mod-perfect-fortification': [resist('precision', '2 + MEIO_NIVEL')],
  'armor-mod-physical-protections': [
    resist('bludgeoning', 'MEIO_NIVEL'),
    resist('piercing', 'MEIO_NIVEL'),
    resist('slashing', 'MEIO_NIVEL'),
  ],

  // —— Exemplar: ícones (imanência com a faísca) ——
  'ikon-barrows-edge': [perDie('spirit', 1)],
  'ikon-gleaming-blade': [perDie('spirit', 2)],
  'ikon-hands-of-the-wildling': [perDie('spirit', 1)],
  'ikon-mortal-harvest': [perDie('spirit', 1, 'spark', { persistent: true })],
  'ikon-noble-branch': [perDie('spirit', 2)],
  'ikon-shadow-sheath': [perDie('spirit', 2)],
  'ikon-starshot': [perDie('spirit', 1)],
  'ikon-titans-breaker': [perDie('spirit', 2)],
  'ikon-unfailing-bow': [perDie('spirit', 1)],
  'ikon-bands-of-imprisonment': [
    bonus('save.will', '1', 'spark', 'Faixas'),
    resist('mental', 'MEIO_NIVEL', 'spark'),
  ],
  'ikon-mirrored-aegis': [bonus('ac', '1', 'spark', 'Égide (aura)')],
  'ikon-thousand-league-sandals': [
    bonus('speed', '10', 'spark', 'Sandálias'),
  ],
  'ikon-victors-wreath': [bonus('attack', '1', 'spark', 'Grinalda (aura)')],
  'ikon-eye-catching-spot': [bonus('ac', '1', 'spark', 'Marca (vs corpo a corpo)')],
  'ikon-gaze-sharp-as-steel': [
    bonus('perception', '1', 'spark', 'Olhar'),
    bonus('ac', '2', 'spark', 'Olhar (vs à distância)'),
  ],
  'ikon-scar-of-the-survivor': [
    bonus('save.fortitude', '1', 'spark', 'Cicatriz'),
    bonus('dying.max', '1', 'spark', 'Difícil de Matar'),
  ],
  'ikon-skin-hard-as-horn': [resist('bludgeoning', 'MEIO_NIVEL', 'spark')],
  'ikon-pelt-of-the-beast': [resist('cold', 'MEIO_NIVEL', 'spark')],

  // —— Runesmith: gravada no portador (você) ——
  'rune-holtrik': [bonus('ac', '1', 'etched', 'Holtrik (escudo erguido)')],
  'rune-ledria': [
    bonus('skill.deception', '1', 'etched', 'Ledria'),
    bonus('skill.diplomacy', '1', 'etched', 'Ledria'),
    bonus('skill.performance', '1', 'etched', 'Ledria'),
  ],
  'rune-lyskel': [bonus('speed', '-5', 'etched', 'Lyskel')],
  'rune-esvadir': [
    perDie('bleed', 2, 'etched', { persistent: true }),
  ],
  'rune-marssyl': [perDie('bludgeoning', 1, 'etched')],
  'rune-oljinex': [bonus('shield.hardness', '2', 'etched', 'Oljinex')],
  'rune-sertum': [bonus('skill.survival', '1', 'etched', 'Sertum')],
  'rune-zohk': [bonus('speed', '15', 'etched', 'Zohk (em direção a você)')],
  'rune-cruonign': [bonus('damage', '3', 'etched', 'Cruonign (vazio)')],
  'rune-feikris': [bonus('skill.athletics', '2', 'etched', 'Feikris')],
  'rune-yudici': [bonus('ac', '1', 'etched', 'Yudici (aliados, escudo erguido)')],
  'rune-xinsala': [
    bonus('ac', '1', 'etched', 'Xinsala (vs magia)'),
    bonus('save', '1', 'etched', 'Xinsala (vs magia)'),
  ],
}

/** Substitui resistência de metade do nível pela do nível cheio. */
export const ENHANCED_RESISTANCE_OPTION_ID = 'armor-mod-enhanced-resistance'
export const INCREDIBLE_RESISTANCE_OPTION_ID = 'armor-mod-incredible-resistance'
export const HYPER_BOOSTERS_OPTION_ID = 'armor-mod-hyper-boosters'
export const SPEED_BOOSTERS_OPTION_ID = 'armor-mod-speed-boosters'
export const MUSCULAR_OPTION_ID = 'armor-mod-muscular-exoskeleton'
export const SUBTLE_OPTION_ID = 'armor-mod-subtle-dampeners'
