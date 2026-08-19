import type { SenseKind } from '@/types'
import { formatSpeedMeters } from '@/utils/labels'

export type SenseAcuity = 'precise' | 'imprecise' | 'vague'

export interface SenseSubject {
  id: string
  kind?: SenseKind | 'greaterDarkvision' | 'vision' | 'hearing' | 'touch'
  name: string
  originalName: string
  aliases: string[]
  defaultAcuity: SenseAcuity
  summary: string
  description: string
}

export interface SenseCardModel {
  title: string
  subtitle: string
  summary: string
  description: string
  acuity: SenseAcuity
  sourcePage: number
  sourceLabel?: string
}

export const SENSE_ACUITY_LABELS: Record<SenseAcuity, string> = {
  precise: 'preciso',
  imprecise: 'impreciso',
  vague: 'vago',
}

export const SENSE_ACUITY_RULES: Record<SenseAcuity, string> = {
  precise:
    'Sentido preciso (Player Core pg. 433): percebe detalhes. É o único jeito de mirar uma criatura sem desvantagem. Em geral detecta automaticamente, salvo se ela estiver escondida ou o ambiente obscurecer — aí use Procurar. Com um preciso, a criatura pode ficar Observada.',
  imprecise:
    'Sentido impreciso (Player Core pg. 433): não dá o detalhe de um preciso. Em geral você sente a criatura automaticamente, mas ela fica Escondida, não Observada. Se usar Furtividade ou o ambiente distorcer o sentido (sala barulhenta, para audição), pode estar Indetectável — use Procurar. No melhor caso, um impreciso torna Indetectável em Escondida; nunca Observada.',
  vague:
    'Sentido vago (Player Core pg. 433): avisa que algo está lá, sem apontar o quê nem o espaço exato. No melhor caso, torna Despercebido em Indetectável. Não deixa Escondida nem Observada. O MJ usa o sentido mais preciso disponível.',
}

const SOURCE_PAGE = 433

const SUBJECTS: SenseSubject[] = [
  {
    id: 'vision',
    kind: 'vision',
    name: 'Visão normal',
    originalName: 'Vision',
    aliases: [
      'vision',
      'visao',
      'visão',
      'visao normal',
      'visão normal',
      'visao precisa',
      'visão precisa',
    ],
    defaultAcuity: 'precise',
    summary:
      'Sentido preciso. Na penumbra, o que você vê fica Oculto. Na escuridão, você não enxerga.',
    description:
      'A visão média é o sentido preciso padrão. Na penumbra (sombra, borda de uma tocha), criaturas e objetos ficam Ocultos, salvo se você tiver visão na penumbra, visão no escuro ou outro preciso que não seja visão. Na escuridão, a visão não funciona.\n\nFontes de luz: raio de luz plena, e penumbra até o dobro desse raio.',
  },
  {
    id: 'hearing',
    kind: 'hearing',
    name: 'Audição',
    originalName: 'Hearing',
    aliases: [
      'hearing',
      'audicao',
      'audição',
      'audicao imprecisa',
      'audição imprecisa',
    ],
    defaultAcuity: 'imprecise',
    summary:
      'Sentido impreciso padrão. Localiza o espaço, mas a criatura fica Escondida, não Observada.',
    description:
      'A audição média é o sentido impreciso padrão. Sala barulhenta, silêncio mágico ou Surdo prejudicam ou encerram este sentido.',
  },
  {
    id: 'touch',
    kind: 'touch',
    name: 'Toque',
    originalName: 'Touch',
    aliases: ['touch', 'toque', 'toque vago'],
    defaultAcuity: 'vague',
    summary:
      'Sentido vago: percebe contato, não localiza à distância. Construtos costumam não ter olfato nem paladar.',
    description:
      'O toque só informa o que está encostado em você. Não substitui visão nem audição para Procurar ou mirar.',
  },
  {
    id: 'lowLightVision',
    kind: 'lowLightVision',
    name: 'Visão na penumbra',
    originalName: 'Low-Light Vision',
    aliases: [
      'lowlightvision',
      'low-light vision',
      'low light vision',
      'visao na penumbra',
      'visão na penumbra',
    ],
    defaultAcuity: 'precise',
    summary:
      'Você vê na penumbra como se fosse luz intensa e ignora Oculto causado só pela penumbra. Ainda não vê no escuro total.',
    description:
      'Sentidos especiais ignoram ou reduzem Indetectável, Escondido e Oculto quando a visão média falha (Player Core pg. 433).\n\nCom visão na penumbra, penumbra conta como luz intensa para você. Escuridão continua escuridão — para isso precisa de visão no escuro.',
  },
  {
    id: 'darkvision',
    kind: 'darkvision',
    name: 'Visão no escuro',
    originalName: 'Darkvision',
    aliases: [
      'darkvision',
      'visao no escuro',
      'visão no escuro',
    ],
    defaultAcuity: 'precise',
    summary:
      'Você vê na escuridão e na penumbra como na luz intensa, só em preto e branco. Escuridão mágica (ex.: magia Escuridão de 4º posto) bloqueia esta visão.',
    description:
      'Sentidos especiais ignoram ou reduzem Indetectável, Escondido e Oculto quando a visão média falha (Player Core pg. 433).\n\nVisão no escuro (e a maior) enxerga perfeitamente no escuro e na penumbra, em preto e branco. Formas de escuridão mágica, como Escuridão de 4º posto, bloqueiam a visão no escuro comum. Visão no escuro maior atravessa inclusive essas.',
  },
  {
    id: 'greaterDarkvision',
    kind: 'greaterDarkvision',
    name: 'Visão no escuro maior',
    originalName: 'Greater Darkvision',
    aliases: [
      'greater darkvision',
      'greaterdarkvision',
      'visao no escuro maior',
      'visão no escuro maior',
    ],
    defaultAcuity: 'precise',
    summary:
      'Como visão no escuro, e ainda atravessa escuridão mágica (inclusive Escuridão de 4º posto). Continua preto e branco.',
    description:
      'Sentidos especiais ignoram ou reduzem Indetectável, Escondido e Oculto quando a visão média falha (Player Core pg. 433).\n\nA visão no escuro maior vê no escuro e na penumbra em preto e branco e atravessa formas de escuridão mágica que bloqueiam a visão no escuro comum.',
  },
  {
    id: 'scent',
    kind: 'scent',
    name: 'Faro',
    originalName: 'Scent',
    aliases: ['scent', 'faro', 'olfato', 'cheiro'],
    defaultAcuity: 'vague',
    summary:
      'Detecta criaturas e objetos pelo cheiro, no alcance listado, só se emitirem aroma. Sem o texto “impreciso”, o faro costuma ser vago.',
    description:
      'O faro só funciona se o alvo emitir aroma. Cheiro forte ou a favor do vento: o MJ pode dobrar ou triplicar o alcance; contra o vento, reduzir.\n\nNo Player Core o faro é em geral vago. Muitas fichas de monstro e companheiro listam “faro (impreciso)” — aí use a acuidade da ficha.',
  },
  {
    id: 'tremorsense',
    kind: 'tremorsense',
    name: 'Sentido sísmico',
    originalName: 'Tremorsense',
    aliases: [
      'tremorsense',
      'sentido sismico',
      'sentido sísmico',
      'sismico',
      'sísmico',
      'tremor',
    ],
    defaultAcuity: 'imprecise',
    summary:
      'Sente vibração numa superfície sólida, no alcance listado. Costuma ser impreciso. Só vale se você e o alvo estão na mesma superfície e o alvo se move (ou escava) nela.',
    description:
      'Sentido sísmico não detecta quem está voando, levitando ou parado. Alcance e se é preciso ou impreciso vêm na ficha.',
  },
  {
    id: 'echolocation',
    name: 'Ecolocalização',
    originalName: 'Echolocation',
    aliases: [
      'echolocation',
      'ecolocalizacao',
      'ecolocalização',
      'sonar',
    ],
    defaultAcuity: 'precise',
    summary:
      'Usa a audição como sentido preciso no alcance listado (como um morcego). Silêncio ou Surdo encerram o efeito.',
    description:
      'A regra assume visão precisa e audição imprecisa. Ecolocalização inverte a audição para precisa naquele alcance. Aparece nas fichas como “ecolocalização (precisa)”.',
  },
  {
    id: 'wavesense',
    name: 'Sentido aquático',
    originalName: 'Wavesense',
    aliases: [
      'wavesense',
      'sentido aquatico',
      'sentido aquático',
      'sentido na agua',
      'sentido na água',
    ],
    defaultAcuity: 'imprecise',
    summary:
      'Sente movimento através de líquido, no alcance listado. Em geral impreciso, e só enquanto você e o alvo estão no mesmo corpo d’água.',
    description:
      'Equivalente aquático do sentido sísmico: vibração na água, não no ar. Fora d’água não funciona.',
  },
  {
    id: 'lifesense',
    name: 'Sentido vital',
    originalName: 'Lifesense',
    aliases: ['lifesense', 'sentido vital', 'sentido de vida'],
    defaultAcuity: 'imprecise',
    summary:
      'Detecta criaturas vivas (e em geral mortos-vivos) no alcance, sem precisar vê-las. Costuma ser impreciso.',
    description:
      'Não substitui visão para ler um texto ou distinguir um aliado de um saco. Construtos e objetos sem vida em geral não aparecem, salvo o texto dizer o contrário.',
  },
  {
    id: 'thoughtsense',
    name: 'Sentido de pensamentos',
    originalName: 'Thoughtsense',
    aliases: [
      'thoughtsense',
      'sentido de pensamentos',
      'sentido mental',
    ],
    defaultAcuity: 'imprecise',
    summary:
      'Detecta criaturas pensantes no alcance. Costuma ser impreciso. Mentes protegidas ou vazias podem não aparecer.',
    description:
      'Não lê o conteúdo dos pensamentos — só a presença de uma mente. Efeitos que bloqueiam magia de adivinhação ou o traço mental podem atrapalhar, a critério do MJ.',
  },
  {
    id: 'motionSense',
    name: 'Sentido de movimento',
    originalName: 'Motion Sense',
    aliases: [
      'motion sense',
      'motionsense',
      'sentido de movimento',
      'sentido movimento',
    ],
    defaultAcuity: 'precise',
    summary:
      'Detecta movimento no alcance. Costuma ser preciso. Quem estiver parado pode não aparecer.',
    description:
      'Típico de lodo e algumas criaturas cegas. Não substitui visão para ler ou distinguir detalhes imóveis. A ficha diz se é preciso ou impreciso e o alcance.',
  },
  {
    id: 'noVision',
    name: 'Sem visão',
    originalName: 'No Vision',
    aliases: ['no vision', 'sem visao', 'sem visão', 'cego', 'cega'],
    defaultAcuity: 'vague',
    summary:
      'Não enxerga. Usa outros sentidos (sísmico, movimento, faro…). Fica Cego para tudo que depende de visão.',
    description:
      'Sem um sentido preciso no lugar da visão, a criatura trata alvos como Escondidos ou pior. Muitas vezes tem sentido de movimento ou sísmico preciso no alcance listado na ficha.',
  },
]

function fold(value: string): string {
  return value
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
}

const BY_ID = new Map<string, SenseSubject>()
const BY_ALIAS = new Map<string, string>()

function register(subject: SenseSubject) {
  BY_ID.set(subject.id, subject)
  if (subject.kind) BY_ID.set(String(subject.kind), subject)
  for (const key of [subject.id, subject.name, subject.originalName, ...subject.aliases]) {
    const folded = fold(key)
    if (folded && !BY_ALIAS.has(folded)) BY_ALIAS.set(folded, subject.id)
  }
}

for (const subject of SUBJECTS) register(subject)

export function getSenseSubject(raw: string): SenseSubject | undefined {
  const trimmed = raw.trim()
  if (!trimmed) return undefined
  if (BY_ID.has(trimmed)) return BY_ID.get(trimmed)
  const id = BY_ALIAS.get(fold(trimmed))
  if (id) return BY_ID.get(id)
  const folded = fold(trimmed)
  const ranked = SUBJECTS.filter((subject) => {
    const name = fold(subject.name)
    const original = fold(subject.originalName)
    return (
      (name.length >= 5 && folded.includes(name)) ||
      (original.length >= 5 && folded.includes(original))
    )
  }).sort(
    (a, b) =>
      fold(b.name).length - fold(a.name).length ||
      fold(b.originalName).length - fold(a.originalName).length,
  )
  return ranked[0]
}

function detectAcuity(raw: string): SenseAcuity | undefined {
  const folded = fold(raw)
  if (/\bimpreciso/.test(folded) || /\bimprecise/.test(folded)) return 'imprecise'
  if (/\bvago/.test(folded) || /\bvague/.test(folded)) return 'vague'
  if (/\bpreciso/.test(folded) || /\bprecise/.test(folded)) return 'precise'
  return undefined
}

function detectRangeLabel(raw: string): string | undefined {
  const meters = raw.match(/(\d+(?:[.,]\d+)?)\s*m\b/i)
  if (meters) return `${meters[1].replace(',', '.')} m`
  const feet = raw.match(/(\d+)\s*(?:pés|pes|feet|ft\.?)\b/i)
  if (feet) return formatSpeedMeters(Number(feet[1]))
  return undefined
}

export function parseSenseLabel(raw: string): {
  name: string
  subject?: SenseSubject
  acuity?: SenseAcuity
  rangeLabel?: string
} {
  const trimmed = raw.trim()
  const paren = trimmed.match(/^(.*?)\s*\((.*)\)\s*$/)
  const head = (paren ? paren[1] : trimmed).trim()
  const extra = paren ? paren[2] : ''
  const subject = getSenseSubject(head) ?? getSenseSubject(trimmed)
  const acuity = detectAcuity(trimmed) ?? detectAcuity(extra)
  const rangeLabel = detectRangeLabel(trimmed) ?? detectRangeLabel(head)
  return {
    name: subject?.name ?? head,
    subject,
    acuity,
    rangeLabel,
  }
}

function resolveAcuity(
  subject: SenseSubject | undefined,
  precise?: boolean,
  explicit?: SenseAcuity,
): SenseAcuity {
  if (explicit) return explicit
  if (precise === true) return 'precise'
  if (precise === false) return 'imprecise'
  return subject?.defaultAcuity ?? 'precise'
}

export function composeSenseCard(input: {
  kind?: string
  name?: string
  rangeFeet?: number
  rangeLabel?: string
  precise?: boolean
  acuity?: SenseAcuity
  description?: string
  sourceLabel?: string
}): SenseCardModel {
  const fromKind = input.kind ? getSenseSubject(input.kind) : undefined
  const fromName = input.name ? getSenseSubject(input.name) : undefined
  const subject = fromName ?? fromKind
  const acuity = resolveAcuity(subject, input.precise, input.acuity)
  const rangeLabel =
    input.rangeLabel ??
    (input.rangeFeet != null ? formatSpeedMeters(input.rangeFeet) : undefined)
  const titleBits = [
    input.name?.trim() || subject?.name || 'Sentido',
    rangeLabel,
  ]
  const title = titleBits.filter(Boolean).join(' ')
  const instance = input.description?.trim()
  const catalogSummary = subject?.summary ?? 'Sentido especial. Toque para ler a regra.'
  const summary = instance || catalogSummary
  const extra = [subject?.description, SENSE_ACUITY_RULES[acuity]]
    .filter(Boolean)
    .join('\n\n')
  const description =
    instance && instance !== catalogSummary ? `${instance}\n\n${extra}` : extra

  return {
    title,
    subtitle: [
      subject?.originalName,
      SENSE_ACUITY_LABELS[acuity],
      input.sourceLabel,
    ]
      .filter(Boolean)
      .join(' · '),
    summary,
    description,
    acuity,
    sourcePage: SOURCE_PAGE,
    sourceLabel: input.sourceLabel,
  }
}

export const NORMAL_VISION_CARD = composeSenseCard({
  kind: 'vision',
  name: 'Visão normal',
})
