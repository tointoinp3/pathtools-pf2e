import { alchemicalItem } from './equipmentFactory'
import type { AlchemicalMutagenStats, ItemDefinition } from '@/types/equipment'
import type { SkillId } from '@/types/core'

const GRADES = [
  {
    key: 'lesser',
    name: 'menor',
    original: 'Lesser',
    level: 1,
    priceGp: 4,
    bonus: 1,
    duration: '1 minuto',
  },
  {
    key: 'moderate',
    name: 'moderado',
    original: 'Moderate',
    level: 3,
    priceGp: 12,
    bonus: 2,
    duration: '10 minutos',
  },
  {
    key: 'greater',
    name: 'maior',
    original: 'Greater',
    level: 11,
    priceGp: 300,
    bonus: 3,
    duration: '1 hora',
  },
  {
    key: 'major',
    name: 'máximo',
    original: 'Major',
    level: 17,
    priceGp: 3000,
    bonus: 4,
    duration: '1 hora',
  },
] as const

const BESTIAL_DICE = [
  { claw: '1d4', jaws: '1d6' },
  { claw: '2d6', jaws: '2d8' },
  { claw: '3d8', jaws: '3d10' },
  { claw: '4d8', jaws: '4d10' },
] as const

const DRAKE_AC = [4, 5, 6, 7]
const JUGGER_HP = [5, 10, 30, 45]
const QUICK_SPEED = [5, 10, 15, 20]

function skills(
  ids: SkillId[],
  value: number,
): Array<{ skillId: SkillId; value: number }> {
  return ids.map((skillId) => ({ skillId, value }))
}

function mutagenSet(opts: {
  aonId: number
  name: string
  originalName: string
  page: number
  benefit: string
  drawback: string
  extraDesc: string
  stats: (bonus: number, index: number) => Omit<
    AlchemicalMutagenStats,
    'duration' | 'benefit' | 'drawback'
  >
}): ItemDefinition[] {
  return GRADES.map((grade, index) => {
    const extra = opts.stats(grade.bonus, index)
    return alchemicalItem({
      id: `alch-${opts.aonId}-${grade.key}`,
      aonId: opts.aonId,
      name: `${opts.name} ${grade.name}`,
      originalName: `${opts.originalName} (${grade.original})`,
      level: grade.level,
      priceGp: grade.priceGp,
      page: opts.page,
      alchemical: {
        kind: 'mutagen',
        effectFamily: 'mutagen',
        mutagen: {
          duration: grade.duration,
          benefit: opts.benefit,
          drawback: opts.drawback,
          ...extra,
        },
      },
      description: `${opts.extraDesc} Benefício: ${opts.benefit} Desvantagem: ${opts.drawback} Dura ${grade.duration}. Polimorfia — beber outro mutagênico substitui este.`,
    })
  })
}

export const PLAYER_CORE_2_MUTAGENS: ItemDefinition[] = [
  ...mutagenSet({
    aonId: 3315,
    name: 'Mutagênico bestial',
    originalName: 'Bestial Mutagen',
    page: 289,
    benefit:
      'Bônus de item em Atletismo e ataques desarmados. Ganha garra (ágil) e mandíbulas. Runas impactantes não alteram esses ataques.',
    drawback: '–2 em Reflexos, Acrobacia e Furtividade.',
    extraDesc: 'Traços bestiais e pesados.',
    stats: (bonus, index) => ({
      itemBonus: bonus,
      skillBonuses: skills(['athletics'], bonus),
      skillPenalties: skills(['acrobatics', 'stealth'], -2),
      savePenalties: [{ save: 'reflex', value: -2 }],
      unarmedAttackBonus: bonus,
      unarmedAttacks: [
        {
          name: 'Garra',
          damageDie: BESTIAL_DICE[index]!.claw,
          damageType: 'slashing',
          traits: ['Agile', 'Unarmed'],
        },
        {
          name: 'Mandíbulas',
          damageDie: BESTIAL_DICE[index]!.jaws,
          damageType: 'piercing',
          traits: ['Unarmed'],
        },
      ],
      extraNote:
        index === 3
          ? 'Você ganha especialização com garra e mandíbulas (ou especialização maior se já tiver).'
          : undefined,
    }),
  }),
  ...mutagenSet({
    aonId: 3316,
    name: 'Mutagênico cognitivo',
    originalName: 'Cognitive Mutagen',
    page: 289,
    benefit:
      'Bônus de item em Arcanismo, Ofício, Ocultismo, Sociedade e testes para Recordar Conhecimento. Falha crítica em Recordar Conhecimento vira falha.',
    drawback:
      '–2 em ataques com arma e desarmados, Atletismo e Acrobacia. Carrega 2 Bulk a menos antes de sobrecarregar; o máximo cai 4.',
    extraDesc: 'A mente fica nítida; o corpo parece distante.',
    stats: (bonus, index) => ({
      itemBonus: bonus,
      skillBonuses: skills(
        ['arcana', 'crafting', 'occultism', 'society'],
        bonus,
      ),
      skillPenalties: skills(['athletics', 'acrobatics'], -2),
      attackPenalty: -2,
      loreBonus: bonus,
      bulkEncumberedAdjust: -2,
      bulkMaxAdjust: -4,
      extraNote:
        index === 2
          ? 'Você fica treinado em uma perícia de Inteligência, escolhida na criação.'
          : index === 3
            ? 'Você fica treinado em uma perícia, escolhida na criação.'
            : 'Falha crítica em Recordar Conhecimento vira falha.',
    }),
  }),
  ...mutagenSet({
    aonId: 3317,
    name: 'Mutagênico coração de drake',
    originalName: 'Drakeheart Mutagen',
    page: 289,
    benefit:
      'Bônus de item na CA (teto de Destreza +2) e em Percepção. Ganha a ação Ímpeto final: dê dois Passos e o mutagênico acaba. Se estiver de armadura, a proficiência de CA continua sendo a da armadura.',
    drawback: '–1 em Vontade, Reflexos e testes para Recordar Conhecimento.',
    extraDesc: 'Escamas e pupilas de drake; a mente e os reflexos atrasam.',
    stats: (bonus, index) => ({
      itemBonus: bonus,
      acItemBonus: DRAKE_AC[index],
      dexCap: 2,
      perceptionBonus: bonus,
      savePenalties: [
        { save: 'will', value: -1 },
        { save: 'reflex', value: -1 },
      ],
      endActionLabel: 'Ímpeto final',
      extraNote: 'Ímpeto final: uma ação, dois Passos, e o efeito acaba.',
    }),
  }),
  ...mutagenSet({
    aonId: 3318,
    name: 'Mutagênico juggernaut',
    originalName: 'Juggernaut Mutagen',
    page: 289,
    benefit: 'Bônus de item em Fortitude e PV temporários (voltam se você ficar no máximo por 1 minuto).',
    drawback: '–2 em Vontade, Percepção e iniciativa.',
    extraDesc: 'O corpo fica sólido e lento.',
    stats: (bonus, index) => ({
      itemBonus: bonus,
      saveBonuses: [{ save: 'fortitude', value: bonus }],
      savePenalties: [{ save: 'will', value: -2 }],
      perceptionPenalty: -2,
      tempHp: JUGGER_HP[index],
      extraNote:
        index >= 2
          ? index === 3
            ? 'Sucesso em Fortitude vira crítico; falha crítica vira falha.'
            : 'Sucesso em Fortitude vira sucesso crítico.'
          : undefined,
    }),
  }),
  ...mutagenSet({
    aonId: 3319,
    name: 'Mutagênico mercúrio',
    originalName: 'Quicksilver Mutagen',
    page: 290,
    benefit:
      'Bônus de item em Acrobacia, Furtividade, Prestidigitação, Reflexos e ataques baseados em Destreza, mais bônus de status no deslocamento.',
    drawback:
      'Você perde PV iguais ao dobro do seu nível e não pode recuperá-los enquanto o mutagênico durar. –2 em Fortitude.',
    extraDesc: 'Rápido e frágil.',
    stats: (bonus, index) => ({
      itemBonus: bonus,
      skillBonuses: skills(['acrobatics', 'stealth', 'thievery'], bonus),
      saveBonuses: [{ save: 'reflex', value: bonus }],
      savePenalties: [{ save: 'fortitude', value: -2 }],
      dexAttackBonus: bonus,
      speedBonus: QUICK_SPEED[index],
      extraNote:
        'Ao beber, perde PV iguais ao dobro do nível; não recupera esses PV enquanto durar.',
    }),
  }),
  ...mutagenSet({
    aonId: 3320,
    name: 'Mutagênico sereno',
    originalName: 'Serene Mutagen',
    page: 290,
    benefit:
      'Bônus de item em Vontade, Percepção, Medicina, Natureza, Religião e Sobrevivência. O bônus de Vontade sobe contra efeitos mentais.',
    drawback:
      '–1 em ataques e na CD de magias ofensivas, e –1 por dado de dano em arma, desarmado e magia.',
    extraDesc: 'Paz interior; violência incomoda.',
    stats: (bonus, index) => ({
      itemBonus: bonus,
      skillBonuses: skills(
        ['medicine', 'nature', 'religion', 'survival'],
        bonus,
      ),
      saveBonuses: [{ save: 'will', value: bonus }],
      perceptionBonus: bonus,
      attackPenalty: -1,
      extraNote:
        index === 0
          ? '+2 em Vontade contra efeitos mentais. –1 por dado no dano.'
          : index === 1
            ? '+3 em Vontade contra efeitos mentais. –1 por dado no dano.'
            : index === 2
              ? '+4 em Vontade contra efeitos mentais. Sucesso contra mental vira crítico. –1 por dado no dano.'
              : 'Sucesso em Vontade contra mental vira crítico; falha crítica vira falha. –1 por dado no dano.',
    }),
  }),
  ...mutagenSet({
    aonId: 3321,
    name: 'Mutagênico língua de prata',
    originalName: 'Silvertongue Mutagen',
    page: 290,
    benefit:
      'Bônus de item em Enganação, Diplomacia, Intimidação e Performance. Falha crítica nessas perícias vira falha.',
    drawback:
      '–2 em Arcanismo, Ofício, Ocultismo e Sociedade. Escolha uma perícia em que está treinado: fica destreinado nela enquanto durar.',
    extraDesc: 'Voz musical; a emoção turva a razão.',
    stats: (bonus) => ({
      itemBonus: bonus,
      skillBonuses: skills(
        ['deception', 'diplomacy', 'intimidation', 'performance'],
        bonus,
      ),
      skillPenalties: skills(
        ['arcana', 'crafting', 'occultism', 'society'],
        -2,
      ),
      extraNote:
        'Falha crítica em Enganação, Diplomacia, Intimidação e Performance vira falha. Uma perícia treinada fica destreinada (anote qual).',
    }),
  }),
]
