import { wornItem } from './equipmentFactory'
import type { ItemDefinition, WornMagicStats } from '@/types/equipment'
import type { SkillId } from '@/types/core'

function w(opts: {
  id: string
  aonId: number
  name: string
  originalName: string
  description: string
  level: number
  priceGp: number
  page: number
  bulk?: number | 'L' | '—'
  traits?: string[]
  rarity?: ItemDefinition['rarity']
  subcategory?: string
  requiresInvestiture?: boolean
  wornMagic?: WornMagicStats
  grantedRuneIds?: string[]
  weapon?: ItemDefinition['weapon']
}): ItemDefinition {
  return wornItem(opts)
}

function skillItem(
  skillId: SkillId,
  value: number,
  extra?: Partial<WornMagicStats>,
): WornMagicStats {
  return { skillBonuses: [{ skillId, value }], ...extra }
}

export const GM_CORE_WORN: ItemDefinition[] = [
  ...companionItems(),
  ...aeonStones(),
  ...handwraps(),
  ...charmOfResistance(),
  ...coreWorn(),
]

function companionItems(): ItemDefinition[] {
  return [
    w({
      id: 'worn-3013',
      aonId: 3013,
      name: 'Ferraduras da alacridade',
      originalName: 'Alacritous Horseshoes',
      level: 7,
      priceGp: 340,
      page: 272,
      bulk: 1,
      subcategory: 'Companheiro',
      traits: ['Companion', 'Primal'],
      wornMagic: {
        companionOnly: true,
        speedBonus: 5,
        slot: 'ferraduras',
        note: 'O companheiro quadrúpede investe. +2 de circunstância em Atletismo para Pulo em altura/distância. Ao Saltar, +5 pés na horizontal ou +3 na vertical.',
      },
      description:
        'Ferraduras de ferro para cavalo ou companheiro quadrúpede. O animal investe: +5 pés de bônus de item no deslocamento terrestre, saltos melhores. Só o companheiro se beneficia.',
    }),
    w({
      id: 'worn-3013-greater',
      aonId: 3013,
      name: 'Ferraduras da alacridade maiores',
      originalName: 'Alacritous Horseshoes (Greater)',
      level: 14,
      priceGp: 4250,
      page: 272,
      bulk: 1,
      subcategory: 'Companheiro',
      traits: ['Companion', 'Primal'],
      wornMagic: {
        companionOnly: true,
        speedBonus: 10,
        note: '+3 de circunstância em Atletismo para pulos. Só o companheiro se beneficia.',
      },
      description:
        'Versão maior: +10 pés de deslocamento terrestre e +3 em pulos. Só o companheiro investe.',
    }),
    w({
      id: 'worn-3014',
      aonId: 3014,
      name: 'Barda do zéfiro',
      originalName: 'Barding of the Zephyr',
      level: 10,
      priceGp: 900,
      page: 272,
      bulk: 'L',
      subcategory: 'Companheiro',
      traits: ['Companion', 'Primal'],
      wornMagic: {
        companionOnly: true,
        slot: 'barda',
        activate:
          'Alçar voo (2 ações, manipular): 1 vez ao dia. O companheiro ganha voo de 30 pés por 10 minutos e pode voar mesmo montado, mesmo sem a habilidade de montaria.',
        frequency: '1 vez ao dia',
        note: 'Ajusta a qualquer forma. Se o companheiro cair, recebe aterrissagem suave.',
      },
      description:
        'Barda leve com motivos de vento. Serve em qualquer companheiro. Quedas ativam aterrissagem suave. 1 vez ao dia, o animal voa 30 pés por 10 minutos.',
    }),
    w({
      id: 'worn-3015',
      aonId: 3015,
      name: 'Coleira da empatia',
      originalName: 'Collar of Empathy',
      level: 9,
      priceGp: 600,
      page: 272,
      bulk: 1,
      subcategory: 'Companheiro',
      traits: ['Companion', 'Primal'],
      wornMagic: {
        companionOnly: true,
        slot: 'coleira',
        activate:
          'Elo empático (1 ação, concentrar): você percebe pelos sentidos do companheiro (pode Sustentar). Fica alheio ao próprio entorno enquanto durar.',
        note: 'Você veste a pulseira e o companheiro a coleira; os dois investem. Sentem emoções e necessidades um do outro.',
      },
      description:
        'Coleira e pulseira de tiras de couro. Você e o companheiro investem o par e sentem o estado um do outro. Ativação: ver pelos sentidos do animal.',
    }),
    w({
      id: 'worn-3016',
      aonId: 3016,
      name: 'Coleira da discrição',
      originalName: 'Collar of Inconspicuousness',
      level: 8,
      priceGp: 475,
      page: 272,
      bulk: 1,
      subcategory: 'Companheiro',
      traits: ['Companion', 'Primal'],
      wornMagic: {
        companionOnly: true,
        slot: 'coleira',
        activate:
          'Aparência adorável (1 ação, concentrar): o companheiro vira uma criatura Minúscula inofensiva da mesma família (forma de praga, 2º posto, ou 4º se puder voar). Dura até Dispensar.',
      },
      description:
        'Coleira surrada. O companheiro investe e pode assumir forma inofensiva Minúscula (gato em vez de tigre, filhote em vez de lobo).',
    }),
  ]
}

function aeonStones(): ItemDefinition[] {
  const lore =
    'Cristal primordial que orbita a cabeça ao investir. Interagir para guardar; Desarmar pode arrancar. Guardada continua investida, mas os efeitos param até voltar a orbitar. Numa bússola de caminho (wayfinder), libera o poder de ressonância. Incomum.'
  const stones: Array<{
    key: string
    name: string
    original: string
    level: number
    priceGp: number
    traits?: string[]
    magic?: WornMagicStats
    extra: string
  }> = [
    {
      key: 'consumed',
      name: 'consumida',
      original: 'Consumed',
      level: 1,
      priceGp: 9,
      extra:
        'Pedra opaca sem magia. Ainda orbita e serve de alvo para magias que exigem um objeto nas mãos livres. Sem poder de ressonância.',
    },
    {
      key: 'preserving',
      name: 'preservadora',
      original: 'Preserving',
      level: 5,
      priceGp: 150,
      extra:
        'Estrela vermelha: resistência 3 a dano persistente. Se o persistente não superar a resistência no fim do turno, a condição acaba. Ressonância: estabilizar como truque primordial inato.',
    },
    {
      key: 'sprouting',
      name: 'brotante',
      original: 'Sprouting',
      level: 6,
      priceGp: 220,
      traits: ['Vitality'],
      magic: {
        activate:
          'Fluxo de vida (reação, concentrar, vitalidade): 1 vez por hora, quando cura de efeito de vitalidade ou sofre dano de vazio. Ganha 8 PV temporários por 1 minuto.',
        frequency: '1 vez por hora',
      },
      extra:
        'Ovoide verde. Ressonância: cipó emaranhado como truque primordial inato.',
    },
    {
      key: 'delaying',
      name: 'dilatória',
      original: 'Delaying',
      level: 7,
      priceGp: 350,
      extra:
        'Quando você morreria pela condição morrendo, a pedra reduz o valor para 1 abaixo do que mataria (em geral morrendo 3) e vira pedra consumida. Só 1 vez ao dia, mesmo com várias. Ressonância: curar de 1º posto divina inata 1 vez ao dia.',
    },
    {
      key: 'nourishing',
      name: 'nutritiva',
      original: 'Nourishing',
      level: 7,
      priceGp: 325,
      extra:
        'Após uma semana contínua investida, você não precisa comer nem beber. Tirar ou outro investir zera o prazo. Ressonância: bolha de ar primordial inata 1 vez ao dia.',
    },
    {
      key: 'smoothing',
      name: 'suavizante',
      original: 'Smoothing',
      level: 7,
      priceGp: 310,
      extra:
        'Ignora penalidades de status de 1 em testes de perícia por desajeitado, enfraquecido, amedrontado, enjoado ou estupefato. Ressonância: orientação como truque ocultista inato.',
    },
    {
      key: 'envisioning',
      name: 'visionária',
      original: 'Envisioning',
      level: 8,
      priceGp: 425,
      extra:
        'Telepatia limitada a 100 pés: uma imagem simples por rodada, como um rabisco, compreensível sem idioma. Sem poder especial de resposta. Ressonância: traduzir ocultista inata 1 vez ao dia.',
    },
    {
      key: 'amplifying',
      name: 'amplificadora',
      original: 'Amplifying',
      level: 16,
      priceGp: 9750,
      traits: ['Spellshape'],
      magic: {
        activate:
          'Amplificar (1 ação, concentrar, forma de magia): se a próxima ação for Conjurar magia, o posto dela conta como 1 a mais (máx. 10) para contrapor e ser contraposta.',
        note: 'Ressonância: +2 de bônus de item em Arcanismo, Natureza, Ocultismo ou Religião — a tradição da última magia amplificada.',
      },
      extra: 'Precisa ser ativada para o benefício principal.',
    },
    {
      key: 'peering',
      name: 'escrutadora',
      original: 'Peering',
      level: 16,
      priceGp: 9500,
      extra:
        'Em luz brilhante, emite luz fraca púrpura num raio de 30 pés. Itens e efeitos mágicos na área tingem de roxo conforme o posto de contrapor. O mestre rola em segredo um teste de contrapor (+25) contra escuridão ou ilusão tocada pela luz; se falhar, não tenta de novo por 24 horas. Na wayfinder a pedra não pega luz; a ressonância deixa ligar/desligar a luz da bússola com Interagir.',
    },
  ]
  return stones.map((stone) =>
    w({
      id: `aeon-3055-${stone.key}`,
      aonId: 3055,
      name: `Pedra eon (${stone.name})`,
      originalName: `Aeon Stone (${stone.original})`,
      level: stone.level,
      priceGp: stone.priceGp,
      page: 284,
      rarity: 'uncommon',
      subcategory: 'Pedra eon',
      traits: stone.traits,
      wornMagic: {
        slot: 'pedra eon',
        ...stone.magic,
        note: stone.extra,
      },
      description: `${lore} ${stone.extra}`,
    }),
  )
}

function handwraps(): ItemDefinition[] {
  const grades = [
    {
      key: '1',
      label: '+1',
      original: '(+1)',
      level: 2,
      priceGp: 35,
      runes: ['rune-2830-1'],
    },
    {
      key: '1-striking',
      label: '+1 impactante',
      original: '(+1 striking)',
      level: 4,
      priceGp: 100,
      runes: ['rune-2830-1', 'rune-2829'],
    },
    {
      key: '2-striking',
      label: '+2 impactante',
      original: '(+2 striking)',
      level: 10,
      priceGp: 1000,
      runes: ['rune-2830-2', 'rune-2829'],
    },
    {
      key: '2-greater',
      label: '+2 impactante maior',
      original: '(+2 greater striking)',
      level: 12,
      priceGp: 2000,
      runes: ['rune-2830-2', 'rune-2829-greater'],
    },
    {
      key: '3-greater',
      label: '+3 impactante maior',
      original: '(+3 greater striking)',
      level: 16,
      priceGp: 10000,
      runes: ['rune-2830-3', 'rune-2829-greater'],
    },
    {
      key: '3-major',
      label: '+3 impactante máxima',
      original: '(+3 major striking)',
      level: 19,
      priceGp: 40000,
      runes: ['rune-2830-3', 'rune-2829-major'],
    },
  ] as const
  return grades.map((grade) =>
    w({
      id: `worn-3086-${grade.key}`,
      aonId: 3086,
      name: `Faixas de golpes poderosos (${grade.label})`,
      originalName: `Handwraps of Mighty Blows ${grade.original}`,
      level: grade.level,
      priceGp: grade.priceGp,
      page: 290,
      grantedRuneIds: [...grade.runes],
      weapon: {
        proficiency: 'unarmed',
        rangeType: 'melee',
        damageDie: '1d4',
        damageType: 'bludgeoning',
        group: 'brawling',
        hands: '1',
      },
      wornMagic: {
        unarmedHost: true,
        slot: 'luvas',
        note: 'Trate como arma corpo a corpo do grupo briga, Carga leve, para gravar runas e afixar talismãs. As runas valem em todos os seus ataques desarmados (punho e outros). Runas de propriedade só aplicam quando fizerem sentido no golpe usado.',
      },
      description: `Faixas bordadas que você enrola nas mãos ao investir. As runas gravadas (${grade.label}) passam para os ataques desarmados. Dá para aprimorar, transferir runas e afixar talismãs como numa arma.`,
    }),
  )
}

function charmOfResistance(): ItemDefinition[] {
  const types = [
    { key: 'acid', name: 'ácido', original: 'Acid', damageType: 'acid' },
    { key: 'cold', name: 'frio', original: 'Cold', damageType: 'cold' },
    { key: 'electricity', name: 'eletricidade', original: 'Electricity', damageType: 'electricity' },
    { key: 'fire', name: 'fogo', original: 'Fire', damageType: 'fire' },
    { key: 'sonic', name: 'sônico', original: 'Sonic', damageType: 'sonic' },
  ] as const
  const grades = [
    { key: '', name: '', original: '', level: 6, priceGp: 245, resist: 5 },
    { key: '-greater', name: ' maior', original: ' (Greater)', level: 10, priceGp: 975, resist: 10 },
    { key: '-major', name: ' máxima', original: ' (Major)', level: 14, priceGp: 4400, resist: 15 },
  ] as const
  const out: ItemDefinition[] = []
  for (const type of types) {
    for (const grade of grades) {
      out.push(
        w({
          id: `worn-3065-${type.key}${grade.key}`,
          aonId: 3065,
          name: `Amuleto de resistência a ${type.name}${grade.name}`,
          originalName: `Charm of Resistance (${type.original})${grade.original}`,
          level: grade.level,
          priceGp: grade.priceGp,
          page: 287,
          wornMagic: {
            energyResistances: [{ damageType: type.damageType, value: grade.resist }],
            slot: 'amuleto',
          },
          description: `Berloque no cinto ou pescoço, talhado no tema de ${type.name}. Resistência ${grade.resist} a dano de ${type.name}. Cada amuleto protege só um tipo de energia.`,
        }),
      )
    }
  }
  return out
}

function coreWorn(): ItemDefinition[] {
  return [
    w({
      id: 'worn-3054',
      aonId: 3054,
      name: 'Manto de honrarias',
      originalName: 'Accolade Robe',
      level: 10,
      priceGp: 1000,
      page: 284,
      bulk: 'L',
      traits: ['Arcane', 'Focused'],
      wornMagic: skillItem('arcana', 2, {
        extraBulkCapacity: 1,
        slot: 'veste',
        activate:
          'Revisar (1 ação, concentrar e manipular): tira um item do bolso e Recorda conhecimento. Crédito extra (ação livre, concentrar): 1 vez ao dia, ganha 1 ponto de foco só para magia de escola; perde se não gastar neste turno.',
        frequency: '1 vez ao dia (crédito extra)',
        note: 'Bolso extradimensional: 1 de Carga de itens leves de magia e estudo. Fabricação: mago da escola associada.',
      }),
      description:
        'Veste de uma escola de mago. +2 de bônus de item em Arcanismo. Bolso extradimensional para 1 de Carga de grimórios, pergaminhos e material acadêmico (Carga leve). Ativações: Revisar e Crédito extra (ponto de foco de escola).',
    }),
    w({
      id: 'worn-3054-greater',
      aonId: 3054,
      name: 'Manto de honrarias maior',
      originalName: 'Accolade Robe (Greater)',
      level: 17,
      priceGp: 13500,
      page: 284,
      bulk: 'L',
      traits: ['Arcane', 'Focused'],
      wornMagic: skillItem('arcana', 3, {
        extraBulkCapacity: 1,
        activate: 'Revisar vira ação livre 1 vez por minuto. Crédito extra 1 vez ao dia.',
      }),
      description:
        'Versão maior: +3 em Arcanismo. Revisar é ação livre 1 vez por minuto.',
    }),
    w({
      id: 'worn-3056',
      aonId: 3056,
      name: 'Botas arbóreas',
      originalName: 'Arboreal Boots',
      level: 5,
      priceGp: 160,
      page: 285,
      bulk: 'L',
      traits: ['Primal'],
      wornMagic: skillItem('acrobatics', 1, {
        slot: 'sapatos',
        note: 'Ignora terreno difícil de plantas e fungos.',
      }),
      description:
        'Botas de couro com cenas da floresta. +1 de bônus de item em Acrobacia. Ignora terreno difícil de plantas e fungos.',
    }),
    w({
      id: 'worn-3056-greater',
      aonId: 3056,
      name: 'Botas arbóreas maiores',
      originalName: 'Arboreal Boots (Greater)',
      level: 9,
      priceGp: 700,
      page: 285,
      bulk: 'L',
      traits: ['Primal'],
      wornMagic: skillItem('acrobatics', 2, {
        note: 'Deslocamento de escalada de 10 pés em plantas ou fungos, sem usar as mãos.',
      }),
      description:
        'Versão maior: +2 em Acrobacia e escalada de 10 pés em plantas ou fungos sem as mãos.',
    }),
    w({
      id: 'worn-3057',
      aonId: 3057,
      name: 'Braçadeiras do atletismo',
      originalName: 'Armbands of Athleticism',
      level: 9,
      priceGp: 645,
      page: 285,
      bulk: 'L',
      wornMagic: skillItem('athletics', 2, {
        slot: 'braçadeiras',
        note: 'Ao Escaladar ou Nadar com sucesso, +5 pés de bônus de item na distância.',
      }),
      description:
        'Faixas de couro nos braços. +2 de bônus de item em Atletismo. Sucesso ao Escaladar ou Nadar rende +5 pés de movimento.',
    }),
    w({
      id: 'worn-3057-greater',
      aonId: 3057,
      name: 'Braçadeiras do atletismo maiores',
      originalName: 'Armbands of Athleticism (Greater)',
      level: 17,
      priceGp: 13000,
      page: 285,
      bulk: 'L',
      wornMagic: skillItem('athletics', 3, {
        note: 'Sucesso ao Escaladar ou Nadar: +10 pés.',
      }),
      description:
        'Versão maior: +3 em Atletismo e +10 pés ao Escaladar ou Nadar com sucesso.',
    }),
    w({
      id: 'worn-3058',
      aonId: 3058,
      name: 'Faixas de força',
      originalName: 'Bands of Force',
      level: 8,
      priceGp: 500,
      page: 286,
      bulk: 'L',
      traits: ['Force'],
      wornMagic: {
        acItemBonus: 1,
        saveBonus: 1,
        dexCap: 5,
        slot: 'braçadeiras',
        activate:
          'Devolver força (reação, força, manipular): quando uma criatura erra criticamente um golpe corpo a corpo em você, Empurre-a com Atletismo +14 das faixas.',
        note: 'Funcionam como armadura (teto de Destreza +5). Dá para afixar talismãs como em armadura leve.',
      },
      description:
        'Aros de metal com gemas claras. Camada de força: +1 de bônus de item na CA e em salvaguardas, teto de Destreza +5. Talismãs como em armadura leve. Reação: Empurrar com +14.',
    }),
    w({
      id: 'worn-3058-greater',
      aonId: 3058,
      name: 'Faixas de força maiores',
      originalName: 'Bands of Force (Greater)',
      level: 14,
      priceGp: 4500,
      page: 286,
      bulk: 'L',
      traits: ['Force'],
      wornMagic: {
        acItemBonus: 2,
        saveBonus: 2,
        dexCap: 5,
        activate: 'Devolver força: Atletismo +21 das faixas.',
      },
      description: 'Versão maior: +2 na CA e salvaguardas. Empurrar com +21.',
    }),
    w({
      id: 'worn-3058-major',
      aonId: 3058,
      name: 'Faixas de força máximas',
      originalName: 'Bands of Force (Major)',
      level: 20,
      priceGp: 70000,
      page: 286,
      bulk: 'L',
      traits: ['Force'],
      wornMagic: {
        acItemBonus: 3,
        saveBonus: 3,
        dexCap: 5,
        activate: 'Devolver força: Atletismo +33 das faixas.',
      },
      description: 'Versão máxima: +3 na CA e salvaguardas. Empurrar com +33.',
    }),
    w({
      id: 'worn-3059',
      aonId: 3059,
      name: 'Botas do salto',
      originalName: 'Boots of Bounding',
      level: 7,
      priceGp: 340,
      page: 286,
      bulk: 'L',
      wornMagic: {
        speedBonus: 5,
        slot: 'sapatos',
        note: '+2 de bônus de item em Atletismo para Pulo em altura/distância. Ao Saltar, +5 pés na horizontal ou +3 na vertical.',
      },
      description:
        'Botas de sola elástica. +5 pés de bônus de item no deslocamento e saltos melhores.',
    }),
    w({
      id: 'worn-3059-greater',
      aonId: 3059,
      name: 'Botas do salto maiores',
      originalName: 'Boots of Bounding (Greater)',
      level: 14,
      priceGp: 4250,
      page: 286,
      bulk: 'L',
      wornMagic: {
        speedBonus: 10,
        note: '+3 em Pulo em altura/distância.',
      },
      description: 'Versão maior: +10 pés de deslocamento e +3 nos pulos.',
    }),
    w({
      id: 'worn-3060',
      aonId: 3060,
      name: 'Pulseira da arrancada',
      originalName: 'Bracelet of Dashing',
      level: 3,
      priceGp: 58,
      page: 286,
      bulk: 'L',
      wornMagic: skillItem('acrobatics', 1, {
        activate:
          'Arrancada tilintante (1 ação, concentrar): 1 vez ao dia. +10 pés de bônus de status no deslocamento por 1 minuto.',
        frequency: '1 vez ao dia',
      }),
      description:
        'Pulseira prateada tilintante. +1 de bônus de item em Acrobacia. 1 vez ao dia, +10 pés de deslocamento por 1 minuto.',
    }),
    w({
      id: 'worn-3061',
      aonId: 3061,
      name: 'Braçadeiras de desvio de mísseis',
      originalName: 'Bracers of Missile Deflection',
      level: 3,
      priceGp: 52,
      page: 286,
      bulk: 'L',
      wornMagic: {
        slot: 'braçadeiras',
        activate:
          'Reação (manipular): 1 vez ao dia. Gatilho: um golpe à distância acerta você, mas não é crítico; você está ciente e não desprevenido. +2 de circunstância na CA contra esse golpe; se isso fizer falhar, erra.',
        frequency: '1 vez ao dia',
      },
      description:
        'Braçadeiras de prata da alvorada. 1 vez ao dia, desviam um míssil que acertaria (não crítico).',
    }),
    w({
      id: 'worn-3061-greater',
      aonId: 3061,
      name: 'Braçadeiras de desvio de mísseis maiores',
      originalName: 'Bracers of Missile Deflection (Greater)',
      level: 9,
      priceGp: 650,
      page: 286,
      bulk: 'L',
      wornMagic: {
        activate: 'Como as comuns, mas 1 vez a cada 10 minutos.',
        frequency: '1 vez a cada 10 minutos',
      },
      description: 'Versão maior: a reação pode ser usada a cada 10 minutos.',
    }),
    w({
      id: 'worn-3062',
      aonId: 3062,
      name: 'Amuleto de proteção canalizada',
      originalName: 'Channel Protection Amulet',
      level: 3,
      priceGp: 56,
      page: 286,
      rarity: 'uncommon',
      wornMagic: {
        note: 'Resistência 5 contra dano de magias ferir se você for vivo, ou contra curar se for morto-vivo.',
      },
      description:
        'Tectito polido numa gaiola de arame. Resistência 5 contra ferir (vivos) ou curar (mortos-vivos). Incomum.',
    }),
    w({
      id: 'worn-3063',
      aonId: 3063,
      name: 'Capa do charlatão',
      originalName: "Charlatan's Cape",
      level: 10,
      priceGp: 980,
      page: 286,
      bulk: 'L',
      rarity: 'uncommon',
      wornMagic: skillItem('deception', 2, {
        slot: 'manto',
        activate:
          'Nuvem de fumaça (2 ações, manipular): 1 vez ao dia. Conjura translocar. Os espaços de saída e chegada ficam com fumaça (oculto) até o fim do seu próximo turno ou até saírem. Vento forte dispersa.',
        frequency: '1 vez ao dia',
      }),
      description:
        'Capa vermelha e dourada. +2 de bônus de item em Enganação. 1 vez ao dia, translocar com fumaça. Incomum.',
    }),
    w({
      id: 'worn-3064',
      aonId: 3064,
      name: 'Luvas do charlatão',
      originalName: "Charlatan's Gloves",
      level: 3,
      priceGp: 50,
      page: 286,
      bulk: 'L',
      traits: ['Teleportation'],
      wornMagic: skillItem('thievery', 1, {
        slot: 'luvas',
        note: 'Permite conjurar mão telecinética como magia inata ocultista.',
      }),
      description:
        'Luvas de seda com ganchos de prata. +1 de bônus de item em Prestidigitação e mão telecinética inata ocultista.',
    }),
    w({
      id: 'worn-3064-greater',
      aonId: 3064,
      name: 'Luvas do charlatão maiores',
      originalName: "Charlatan's Gloves (Greater)",
      level: 9,
      priceGp: 600,
      page: 286,
      bulk: 'L',
      traits: ['Teleportation'],
      wornMagic: skillItem('thievery', 2, {
        note: 'Com a capa do charlatão, objetos movidos pela mão telecinética podem sumir em fumaça e reaparecer ao seu lado (teleporte).',
      }),
      description:
        'Versão maior: +2 em Prestidigitação. Combinada com a capa, a mão telecinética pode teleportar o objeto até você.',
    }),
    ...restOfWorn(),
  ]
}

function restOfWorn(): ItemDefinition[] {
  return [
    w({
      id: 'worn-3066',
      aonId: 3066,
      name: 'Gargantilha da elocução',
      originalName: 'Choker of Elocution',
      level: 6,
      priceGp: 200,
      page: 287,
      bulk: 'L',
      wornMagic: skillItem('society', 1, {
        slot: 'colar',
        note: 'Fala, entende e escreve o idioma escolhido. CD do teste plano para ação auditiva surdo cai de 5 para 3. Fabricação: você conhece o idioma.',
      }),
      description:
        'Gargantilha de platina com letras de um idioma. +1 em Sociedade, fluência nesse idioma, e fala melhor mesmo surdo.',
    }),
    w({
      id: 'worn-3066-greater',
      aonId: 3066,
      name: 'Gargantilha da elocução maior',
      originalName: 'Choker of Elocution (Greater)',
      level: 10,
      priceGp: 850,
      page: 287,
      bulk: 'L',
      wornMagic: skillItem('society', 2, {
        note: 'Três idiomas.',
      }),
      description: 'Versão maior: +2 em Sociedade e fluência em três idiomas.',
    }),
    w({
      id: 'worn-3067',
      aonId: 3067,
      name: 'Manto clandestino',
      originalName: 'Clandestine Cloak',
      level: 6,
      priceGp: 230,
      page: 287,
      bulk: 'L',
      rarity: 'uncommon',
      wornMagic: skillItem('stealth', 1, {
        slot: 'manto',
        activate:
          'Encobrir identidade (2 ações, concentrar e manipular): 1 vez ao dia. Véu de privacidade por 1 hora ou até baixar o capuz.',
        frequency: '1 vez ao dia',
        note: 'Com o capuz: +1 em Enganação para Personificar figurante esquecível, −1 de item em Diplomacia e Intimidação.',
      }),
      description:
        'Manto cinza. Com o capuz, +1 em Furtividade e para Personificar um figurante, mas −1 em Diplomacia e Intimidação. 1 vez ao dia, véu de privacidade.',
    }),
    w({
      id: 'worn-3067-greater',
      aonId: 3067,
      name: 'Manto clandestino maior',
      originalName: 'Clandestine Cloak (Greater)',
      level: 10,
      priceGp: 900,
      page: 287,
      bulk: 'L',
      rarity: 'uncommon',
      wornMagic: skillItem('stealth', 2, {
        activate: 'Véu de privacidade de 5º posto por 8 horas.',
        frequency: '1 vez ao dia',
      }),
      description: 'Versão maior: +2 em Furtividade. Véu de privacidade de 5º posto por 8 horas.',
    }),
    w({
      id: 'worn-3068',
      aonId: 3068,
      name: 'Braçadeiras garrudas',
      originalName: 'Clawed Bracers',
      level: 7,
      priceGp: 325,
      page: 287,
      bulk: 'L',
      traits: ['Morph'],
      wornMagic: {
        slot: 'braçadeiras',
        activate:
          'Estender garras (1 ação, manipular, metamorfose): 1 vez por hora. Escalada 20 pés e golpe desarmado de garra (ágil, acuidade) 1d6 cortante por 10 minutos ou até Dispensar.',
        frequency: '1 vez por hora',
      },
      description:
        'Braçadeiras de couro com garras de animal. 1 vez por hora, fundem-se aos braços: escalada 20 pés e garras 1d6 cortante.',
    }),
    w({
      id: 'worn-3069',
      aonId: 3069,
      name: 'Manto das ilusões',
      originalName: 'Cloak of Illusions',
      level: 7,
      priceGp: 360,
      page: 287,
      bulk: 'L',
      wornMagic: skillItem('stealth', 1, {
        slot: 'manto',
        activate:
          'Puxar capuz (2 ações, manipular): 1 vez ao dia. Invisibilidade (duração da magia ou até baixar o capuz).',
        frequency: '1 vez ao dia',
        note: 'Truque figura inato ocultista.',
      }),
      description:
        'Manto fluido. Truque figura, +1 em Furtividade, e 1 vez ao dia invisibilidade pelo capuz.',
    }),
    w({
      id: 'worn-3069-greater',
      aonId: 3069,
      name: 'Manto das ilusões maior',
      originalName: 'Cloak of Illusions (Greater)',
      level: 12,
      priceGp: 1750,
      page: 287,
      bulk: 'L',
      wornMagic: skillItem('stealth', 2, {
        activate: 'Invisibilidade de 4º posto.',
        frequency: '1 vez ao dia',
      }),
      description: 'Versão maior: +2 em Furtividade e invisibilidade de 4º posto.',
    }),
    w({
      id: 'worn-3070',
      aonId: 3070,
      name: 'Berloque contraposto',
      originalName: 'Countering Charm',
      level: 11,
      priceGp: 1200,
      page: 287,
      rarity: 'uncommon',
      wornMagic: {
        activate:
          'Contrapor (reação, manipular): você é alvo ou está na área da magia guardada; mão livre. Apresenta o berloque e tenta contrapor (posto da magia guardada, modificador +20). Gasta a magia.',
        note: 'Um conjurador pode guardar uma magia de espaço (não truque nem foco) no berloque investido por ele ou por aliado disposto.',
      },
      description:
        'Gema com inclusão de chumbo. Guarda uma magia de espaço para contrapô-la depois (+20). Incomum.',
    }),
    w({
      id: 'worn-3070-greater',
      aonId: 3070,
      name: 'Berloque contraposto maior',
      originalName: 'Countering Charm (Greater)',
      level: 15,
      priceGp: 5500,
      page: 287,
      rarity: 'uncommon',
      wornMagic: {
        activate: 'Contrapor com modificador +25.',
      },
      description: 'Versão maior: contrapor com +25.',
    }),
    w({
      id: 'worn-3070-major',
      aonId: 3070,
      name: 'Berloque contraposto máximo',
      originalName: 'Countering Charm (Major)',
      level: 18,
      priceGp: 20000,
      page: 287,
      rarity: 'uncommon',
      wornMagic: {
        activate: 'Contrapor com modificador +30.',
      },
      description: 'Versão máxima: contrapor com +30.',
    }),
    w({
      id: 'worn-3071',
      aonId: 3071,
      name: 'Manto de coiote',
      originalName: 'Coyote Cloak',
      level: 3,
      priceGp: 60,
      page: 287,
      wornMagic: skillItem('survival', 1, {
        slot: 'manto',
        note: 'Sucesso crítico em Sobrevivência para Subsistir alimenta o dobro de criaturas extras.',
      }),
      description:
        'Manto de pelo de coiote. +1 em Sobrevivência. Crítico ao Subsistir alimenta o dobro de extras.',
    }),
    w({
      id: 'worn-3071-greater',
      aonId: 3071,
      name: 'Manto de coiote maior',
      originalName: 'Coyote Cloak (Greater)',
      level: 9,
      priceGp: 650,
      page: 288,
      wornMagic: skillItem('survival', 2, {
        note: 'Crítico ao Subsistir alimenta quatro vezes as criaturas extras.',
      }),
      description: 'Versão maior: +2 em Sobrevivência e o quádruplo de extras no crítico ao Subsistir.',
    }),
    w({
      id: 'worn-3072',
      aonId: 3072,
      name: 'Lente do artesão',
      originalName: "Crafter's Eyepiece",
      level: 3,
      priceGp: 60,
      page: 288,
      wornMagic: skillItem('crafting', 1, {
        slot: 'lente',
        note: 'Ao Reparar, PV restaurados: 10 + 10 por posto de proficiência (sucesso) ou 15 + 15 por posto (crítico).',
      }),
      description:
        'Lente de metal. +1 em Ofício. Reparos restauram mais PV no item.',
    }),
    w({
      id: 'worn-3072-greater',
      aonId: 3072,
      name: 'Lente do artesão maior',
      originalName: "Crafter's Eyepiece (Greater)",
      level: 11,
      priceGp: 1200,
      page: 288,
      wornMagic: skillItem('crafting', 2, {
        activate:
          'Protótipo (1 minuto, manipular): 1 vez ao dia. A lente conjura criação de 5º posto para um item temporário.',
        frequency: '1 vez ao dia',
      }),
      description: 'Versão maior: +2 em Ofício e 1 vez ao dia criação de 5º posto.',
    }),
    w({
      id: 'worn-3073',
      aonId: 3073,
      name: 'Coroa da bruxaria',
      originalName: 'Crown of Witchcraft',
      level: 10,
      priceGp: 1000,
      page: 288,
      traits: ['Focused', 'Hex'],
      wornMagic: skillItem('intimidation', 1, {
        slot: 'chapéu',
        activate:
          'Maldição desafiadora (ação livre, concentrar): 1 vez ao dia, 1 ponto de foco só para maldição de bruxa; perde se não gastar neste turno.',
        frequency: '1 vez ao dia',
        note: 'Se for bruxa, +2 de bônus de item na perícia do patrono. Familiar pode ganhar mascote resistente enquanto a coroa estiver investida. Fabricação: bruxa.',
      }),
      description:
        'Guirlanda, diadema ou chapéu de bruxa. +1 em Intimidação, +2 na perícia do patrono se for bruxa, e ponto de foco de maldição 1 vez ao dia.',
    }),
    w({
      id: 'worn-3073-greater',
      aonId: 3073,
      name: 'Coroa da bruxaria maior',
      originalName: 'Crown of Witchcraft (Greater)',
      level: 18,
      priceGp: 21000,
      page: 288,
      traits: ['Focused', 'Hex'],
      wornMagic: skillItem('intimidation', 2, {
        note: '+3 na perícia do patrono.',
      }),
      description: 'Versão maior: +2 em Intimidação e +3 na perícia do patrono.',
    }),
    w({
      id: 'worn-3074',
      aonId: 3074,
      name: 'Echarpe dançante',
      originalName: 'Dancing Scarf',
      level: 3,
      priceGp: 60,
      page: 288,
      traits: ['Visual'],
      wornMagic: skillItem('performance', 1, {
        slot: 'cinto',
        activate:
          'Echarpe rodopiante (1 ação, manipular): se a ação mais recente foi sucesso em Performance para dançar, você fica oculto até o início do próximo turno.',
      }),
      description:
        'Echarpe de seda com sinos. +1 em Performance para dançar. Após dançar com sucesso, pode ficar oculta até o próximo turno.',
    }),
    w({
      id: 'worn-3074-greater',
      aonId: 3074,
      name: 'Echarpe dançante maior',
      originalName: 'Dancing Scarf (Greater)',
      level: 9,
      priceGp: 650,
      page: 288,
      traits: ['Visual'],
      wornMagic: skillItem('performance', 2, {
        activate: 'Além de ficar oculta, pode Caminhar até metade do deslocamento ou Dar um passo.',
      }),
      description: 'Versão maior: +2 em Performance para dançar, e a ativação inclui deslocamento.',
    }),
    w({
      id: 'worn-3075',
      aonId: 3075,
      name: 'Botas do ousado',
      originalName: 'Daredevil Boots',
      level: 10,
      priceGp: 900,
      page: 288,
      bulk: 'L',
      wornMagic: skillItem('acrobatics', 2, {
        slot: 'sapatos',
        note: '+1 de circunstância para Passar por entre. Agarrar a borda mesmo sem as mãos livres. Quedas 10 pés mais curtas (ou Queda de gato um posto melhor).',
      }),
      description:
        'Botas coloridas. +2 em Acrobacia, melhor Passar por entre, Agarrar a borda sem as mãos e quedas mais curtas.',
    }),
    w({
      id: 'worn-3075-greater',
      aonId: 3075,
      name: 'Botas do ousado maiores',
      originalName: 'Daredevil Boots (Greater)',
      level: 17,
      priceGp: 14000,
      page: 288,
      bulk: 'L',
      wornMagic: skillItem('acrobatics', 3, {
        activate:
          'Ímpeto ousado (2 ações, concentrar): 1 vez ao dia. Conjura movimento desimpedido em você.',
        frequency: '1 vez ao dia',
        note: '+2 de circunstância para Passar por entre.',
      }),
      description:
        'Versão maior: +3 em Acrobacia, +2 para Passar por entre, e 1 vez ao dia movimento desimpedido.',
    }),
    w({
      id: 'worn-3076',
      aonId: 3076,
      name: 'Máscara demoníaca',
      originalName: 'Demon Mask',
      level: 4,
      priceGp: 85,
      page: 288,
      bulk: 'L',
      wornMagic: skillItem('intimidation', 1, {
        slot: 'máscara',
        activate: 'Máscara ameaçadora (2 ações, manipular): 1 vez ao dia. Conjura medo (CD 20).',
        frequency: '1 vez ao dia',
      }),
      description: 'Máscara de demônio. +1 em Intimidação. 1 vez ao dia, medo CD 20.',
    }),
    w({
      id: 'worn-3076-greater',
      aonId: 3076,
      name: 'Máscara demoníaca maior',
      originalName: 'Demon Mask (Greater)',
      level: 10,
      priceGp: 900,
      page: 288,
      bulk: 'L',
      wornMagic: skillItem('intimidation', 2, {
        activate: 'Medo de 3º posto (CD 29).',
        frequency: '1 vez ao dia',
      }),
      description: 'Versão maior: +2 em Intimidação e medo de 3º posto (CD 29).',
    }),
    w({
      id: 'worn-3077',
      aonId: 3077,
      name: 'Vestimentas devotas',
      originalName: 'Devoted Vestments',
      level: 11,
      priceGp: 1250,
      page: 288,
      bulk: 'L',
      traits: ['Divine', 'Focused'],
      wornMagic: skillItem('religion', 2, {
        slot: 'veste',
        activate:
          'Devoção de domínio (ação livre, concentrar): 1 vez ao dia, 1 ponto de foco só para magia de domínio do clérigo da divindade das vestes.',
        frequency: '1 vez ao dia',
        note: 'Serve de símbolo sagrado. Cura de ferir/curar em seguidores da divindade aumenta no posto da magia. Fabricação: clérigo dessa divindade.',
      }),
      description:
        'Vestes com cenas da divindade. Símbolo sagrado, +2 em Religião, cura extra em fiéis, e ponto de foco de domínio 1 vez ao dia.',
    }),
    w({
      id: 'worn-3078',
      aonId: 3078,
      name: 'Insígnia do diplomata',
      originalName: "Diplomat's Badge",
      level: 5,
      priceGp: 125,
      page: 289,
      wornMagic: skillItem('diplomacy', 1, {
        activate:
          'Porte diplomático (1 ação, concentrar): 1 vez ao dia. Teste CD 20 para Recordar conhecimento sobre um povo ou tipo de criatura. Em sucesso, o bônus em Diplomacia com esse grupo vira +2 pelo resto do dia.',
        frequency: '1 vez ao dia',
      }),
      description:
        'Insígnia de latão. +1 em Diplomacia. 1 vez ao dia, estudar um povo pode subir o bônus para +2 com eles.',
    }),
    w({
      id: 'worn-3079',
      aonId: 3079,
      name: 'Anéis duplicadores',
      originalName: 'Doubling Rings',
      level: 3,
      priceGp: 50,
      page: 289,
      wornMagic: {
        doublingRings: 'standard',
        note: 'O anel de ouro copia potência e impacto da arma corpo a corpo empunhada nessa mão para a arma na mão do anel de ferro. Runas da arma de ferro ficam suprimidas. Não vale para arremesso nem arma de duas mãos segura numa só. Equipe duas armas corpo a corpo: a primeira da lista é a fonte.',
      },
      description:
        'Par: anel de ouro com rubi e anel de ferro. Copia as runas fundamentais da arma na mão de ouro para a da mão de ferro enquanto as duas estiverem empunhadas.',
    }),
    w({
      id: 'worn-3079-greater',
      aonId: 3079,
      name: 'Anéis duplicadores maiores',
      originalName: 'Doubling Rings (Greater)',
      level: 11,
      priceGp: 1300,
      page: 289,
      wornMagic: {
        doublingRings: 'greater',
        note: 'Também copia runas de propriedade se a arma de ferro cumprir os pré-requisitos e não for arma específica. Ao investir, pode escolher copiar só as fundamentais.',
      },
      description:
        'Versão maior: copia também runas de propriedade, se a arma de ferro servir. Dá para limitar às fundamentais ao investir.',
    }),
    ...finalWorn(),
  ]
}

function finalWorn(): ItemDefinition[] {
  return [
    w({
      id: 'worn-3080',
      aonId: 3080,
      name: 'Venda do pavor',
      originalName: 'Dread Blindfold',
      level: 17,
      priceGp: 15000,
      page: 289,
      traits: ['Emotion', 'Fear', 'Mental'],
      wornMagic: skillItem('intimidation', 3, {
        slot: 'lente',
        activate:
          'Visões de terror (ação livre, concentrar): 1 vez por minuto, ao causar dano com um golpe. O alvo sofre visão da morte CD 37, depois imune por 24 horas.',
        frequency: '1 vez por minuto',
        note: 'Visão no escuro (só por ela). A primeira vez que uma criatura vê você no dia, Vontade CD 37 ou amedrontado 1. Aliados ficam imunes após uma semana.',
      }),
      description:
        'Tira de linho preto. Visão no escuro, +3 em Intimidação, amedronta quem te vê pela primeira vez no dia, e pode lançar visão da morte ao ferir.',
    }),
    w({
      id: 'worn-3081',
      aonId: 3081,
      name: 'Manto do deslize terrestre',
      originalName: 'Earthglide Cloak',
      level: 15,
      priceGp: 6500,
      page: 289,
      traits: ['Earth', 'Occult'],
      wornMagic: {
        slot: 'manto',
        activate:
          'Deslizar pela terra (1 ação, manipular): 1 vez por hora. Cava terra e pedra até seu deslocamento terrestre, sem túnel. Se terminar dentro de pedra, é expulso à área aberta mais próxima (1d6 concussão por 5 pés).',
        frequency: '1 vez por hora',
      },
      description:
        'Manto marrom e dourado, rígido como pedra. 1 vez por hora, cave pela terra e pedra sem deixar rastros.',
    }),
    w({
      id: 'worn-3082',
      aonId: 3082,
      name: 'Cinturão do artista',
      originalName: "Entertainer's Cincture",
      level: 10,
      priceGp: 1000,
      page: 289,
      traits: ['Focused', 'Occult'],
      wornMagic: {
        slot: 'cinto',
        activate:
          'Bis (ação livre, concentrar): 1 vez ao dia, 1 ponto de foco só para composição de bardo. Transcrever (1 ação, manipular): 1 vez ao dia, grava a apresentação em papel por 10 minutos.',
        frequency: '1 vez ao dia',
        note: 'Ao investir, escolha Enganação, Diplomacia, Intimidação ou Performance: +2 de bônus de item nessa perícia. Fabricação: bardo.',
      },
      description:
        'Faixa de palco. Ao investir, +2 numa perícia social/Performance à escolha. Ponto de foco de composição e transcrição de apresentação. Fabricação: bardo.',
    }),
    w({
      id: 'worn-3082-greater',
      aonId: 3082,
      name: 'Cinturão do artista maior',
      originalName: "Entertainer's Cincture (Greater)",
      level: 17,
      priceGp: 13000,
      page: 289,
      traits: ['Focused', 'Occult'],
      wornMagic: {
        note: '+3 na perícia escolhida. Transcrever dura até 1 hora.',
      },
      description: 'Versão maior: +3 na perícia escolhida e transcrição de até 1 hora.',
    }),
    w({
      id: 'worn-3083',
      aonId: 3083,
      name: 'Olho da fortuna',
      originalName: 'Eye of Fortune',
      level: 13,
      priceGp: 2700,
      page: 289,
      traits: ['Fortune'],
      wornMagic: {
        slot: 'lente',
        activate:
          'Sorte além da vista (ação livre, concentrar, fortuna): ao atacar criatura oculta ou escondida, antes do teste plano, role duas vezes e use o maior.',
      },
      description:
        'Tapa-olho com olho cravejado (Erastil). Você vê através dele. Role duas vezes o teste plano contra oculto/escondido.',
    }),
    w({
      id: 'worn-3084',
      aonId: 3084,
      name: 'Olhos do gato',
      originalName: 'Eyes of the Cat',
      level: 9,
      priceGp: 700,
      page: 290,
      wornMagic: {
        perceptionBonus: 2,
        slot: 'lente',
        note: '+2 de bônus de item em Percepção que envolva visão. Visão na penumbra.',
      },
      description:
        'Lentes de âmbar. Visão na penumbra e +2 em Percepção visual.',
    }),
    w({
      id: 'worn-3085',
      aonId: 3085,
      name: 'Gorjal do rugido primordial',
      originalName: 'Gorget of the Primal Roar',
      level: 11,
      priceGp: 1250,
      page: 290,
      bulk: 'L',
      traits: ['Auditory', 'Emotion', 'Mental'],
      wornMagic: skillItem('intimidation', 2, {
        slot: 'colar',
        activate:
          'Rugido primordial (1 ação, auditivo, concentrar, emoção, medo, mental): 1 vez durante cada efeito de polimorfia, se você não estiver em forma humanóide. Um teste de Intimidação contra a CD de Vontade de inimigos a 30 pés: crítico amedrontado 2, sucesso amedrontado 1.',
      }),
      description:
        'Gorjal de madeira do crepúsculo. +2 em Intimidação. Em forma polimórfica não humanóide, um rugido pode amedrontar inimigos próximos.',
    }),
    w({
      id: 'worn-3087',
      aonId: 3087,
      name: 'Luvas do curandeiro',
      originalName: "Healer's Gloves",
      level: 4,
      priceGp: 80,
      page: 290,
      bulk: 'L',
      wornMagic: skillItem('medicine', 1, {
        slot: 'luvas',
        activate:
          'Toque do curandeiro (1 ação, manipular): 1 vez ao dia. Criatura viva disposta adjacente recupera 2d6+7 PV (cura de vitalidade; não fere mortos-vivos).',
        frequency: '1 vez ao dia',
      }),
      description:
        'Luvas brancas que nunca mancham. +1 em Medicina. 1 vez ao dia, cura 2d6+7 PV num aliado adjacente.',
    }),
    w({
      id: 'worn-3087-greater',
      aonId: 3087,
      name: 'Luvas do curandeiro maiores',
      originalName: "Healer's Gloves (Greater)",
      level: 9,
      priceGp: 700,
      page: 290,
      bulk: 'L',
      wornMagic: skillItem('medicine', 2, {
        activate: 'Cura 4d6+15 PV.',
        frequency: '1 vez ao dia',
      }),
      description: 'Versão maior: +2 em Medicina e cura 4d6+15 PV.',
    }),
    w({
      id: 'worn-3088',
      aonId: 3088,
      name: 'Botas de fogo infernal',
      originalName: 'Hellfire Boots',
      level: 13,
      priceGp: 3000,
      page: 290,
      bulk: 1,
      traits: ['Fire', 'Occult'],
      wornMagic: {
        energyResistances: [{ damageType: 'fire', value: 10 }],
        slot: 'sapatos',
        activate:
          'Dança do diabo (2 ações, manipular): 1 vez por minuto. Caminhe; cada quadrado vira terreno perigoso por 1 minuto (3d6 de fogo em quem atravessar).',
        frequency: '1 vez por minuto',
      },
      description:
        'Botas de metal negro com brasas. Resistência 10 a fogo. 1 vez por minuto, o rastro vira chamas infernais.',
    }),
    w({
      id: 'worn-3089',
      aonId: 3089,
      name: 'Bolso da farsa',
      originalName: 'Humbug Pocket',
      level: 9,
      priceGp: 650,
      page: 290,
      traits: ['Occult'],
      wornMagic: skillItem('society', 2, {
        activate:
          'Papéis, por favor (1 ação, concentrar e manipular): 1 vez por hora. Tira uma falsificação temporária (teste secreto de Criar falsificação); desintegra em 1 hora.',
        frequency: '1 vez por hora',
        note: '+2 em Furtividade para Ocultar objeto neste bolso. Produz papel e tinta para falsificar. Cabe 1 item de Carga leve.',
      }),
      description:
        'Bolso de seda no cinto ou roupa. +2 em Sociedade e para Ocultar objeto nele. Produz material de falsificação e, 1 vez por hora, um documento temporário.',
    }),
    w({
      id: 'worn-3089-greater',
      aonId: 3089,
      name: 'Bolso da farsa maior',
      originalName: 'Humbug Pocket (Greater)',
      level: 17,
      priceGp: 12500,
      page: 290,
      traits: ['Occult'],
      wornMagic: skillItem('society', 3, {
        note: 'Papéis, por favor pode criar até 5 documentos do mesmo tipo, com um só teste.',
      }),
      description: 'Versão maior: +3 em Sociedade e até 5 documentos temporários por ativação.',
    }),
    w({
      id: 'worn-3090',
      aonId: 3090,
      name: 'Aparato inexplicável',
      originalName: 'Inexplicable Apparatus',
      level: 18,
      priceGp: 19000,
      page: 291,
      bulk: 2,
      wornMagic: skillItem('crafting', 3, {
        slot: 'veste',
        activate:
          'Remendo inexplicável (3 ações, concentrar e manipular): 1 vez ao dia. Conserta um item que você segura ou a 5 pés, como consertar de 3º posto, por 10 minutos.',
        frequency: '1 vez ao dia',
        note: 'O +3 vale para Ofício, Ganhar sustento e Reparar. Tempo mínimo para Fabricar cai para 1 dia; progresso extra usa nível +1 (crítico: nível +2).',
      }),
      description:
        'Arnês com braços-ferramenta. +3 em Ofício para Fabricar, Ganhar sustento e Reparar, fabricação mais rápida, e remendo mágico 1 vez ao dia.',
    }),
    w({
      id: 'worn-3091',
      aonId: 3091,
      name: 'Cinto do levantamento',
      originalName: 'Lifting Belt',
      level: 4,
      priceGp: 80,
      page: 292,
      bulk: 'L',
      wornMagic: skillItem('athletics', 1, {
        extraBulkCapacity: 1,
        slot: 'cinto',
        activate:
          'Apoio ao erguer (2 ações, manipular): levanta um objeto de até 8 de Carga como se não pesasse (duas mãos). Se estiver preso, pode Forçar abertura como parte da ativação. Dura até o fim do próximo turno.',
      }),
      description:
        'Cinto largo de couro. +1 em Atletismo. Limite de Carga vira 6 + FOR (máx. 11 + FOR). Ativação: erguer até 8 de Carga como se fosse leve.',
    }),
    w({
      id: 'worn-3092',
      aonId: 3092,
      name: 'Manto vivo',
      originalName: 'Living Mantle',
      level: 10,
      priceGp: 1000,
      page: 292,
      bulk: 'L',
      traits: ['Focused', 'Plant', 'Primal'],
      wornMagic: skillItem('nature', 2, {
        slot: 'manto',
        activate:
          'Segredos druidicos (ação livre, concentrar): 1 vez ao dia, 1 ponto de foco só para magia de ordem. Fabricação: druida.',
        frequency: '1 vez ao dia',
        note: 'Imune aos efeitos de frio severo e calor severo.',
      }),
      description:
        'Manto de musgo que absorve plantas locais. +2 em Natureza, ignora frio/calor severos, ponto de foco de ordem. Fabricação: druida.',
    }),
    w({
      id: 'worn-3092-greater',
      aonId: 3092,
      name: 'Manto vivo maior',
      originalName: 'Living Mantle (Greater)',
      level: 18,
      priceGp: 21000,
      page: 292,
      bulk: 'L',
      traits: ['Focused', 'Plant', 'Primal'],
      wornMagic: skillItem('nature', 3, {
        note: 'Também ignora frio extremo e calor extremo.',
      }),
      description: 'Versão maior: +3 em Natureza e ignora frio/calor extremos.',
    }),
    w({
      id: 'worn-3093',
      aonId: 3093,
      name: 'Luvas do amante',
      originalName: "Lover's Gloves",
      level: 8,
      priceGp: 500,
      page: 292,
      traits: ['Emotion', 'Mental'],
      wornMagic: skillItem('diplomacy', 1, {
        slot: 'luvas',
        activate:
          'Vínculo (1 ação, manipular): 1 vez ao dia. Segure as mãos de uma criatura disposta por quem você sente afeto. Ela ganha +1 de status em salvaguardas e 10 PV temporários por 10 minutos. Se o sentimento for mútuo, você também, e sucessos em salvaguardas contra emoção negativa viram críticos.',
        frequency: '1 vez ao dia',
      }),
      description:
        'Luvas de seda branca com corações. +1 em Diplomacia. 1 vez ao dia, vínculo protetor com alguém querido.',
    }),
    w({
      id: 'worn-3094',
      aonId: 3094,
      name: 'Chapéu do mago',
      originalName: "Mage's Hat",
      level: 3,
      priceGp: 50,
      page: 292,
      traits: ['Arcane'],
      wornMagic: skillItem('arcana', 1, {
        slot: 'chapéu',
        note: 'Prestidigitação como truque arcano inato.',
      }),
      description:
        'Chapéu pontudo ou turbante com runas. +1 em Arcanismo e prestidigitação inata.',
    }),
    w({
      id: 'worn-3094-greater',
      aonId: 3094,
      name: 'Chapéu do mago maior',
      originalName: "Mage's Hat (Greater)",
      level: 9,
      priceGp: 650,
      page: 292,
      traits: ['Arcane'],
      wornMagic: skillItem('arcana', 2, {
        activate:
          'Magia do chapéu (Conjurar magia): 1 vez ao dia. Tira o chapéu e conjura a magia de invocação de 4º posto tecida nele (em geral invocar animal ou elemental). Se preparar magias arcanas, pode trocar ao investir.',
        frequency: '1 vez ao dia',
      }),
      description:
        'Versão maior: +2 em Arcanismo e 1 vez ao dia uma invocação arcana de 4º posto.',
    }),
    w({
      id: 'worn-3095',
      aonId: 3095,
      name: 'Echarpe de mascarada',
      originalName: 'Masquerade Scarf',
      level: 2,
      priceGp: 30,
      page: 292,
      wornMagic: {
        activate:
          'Mascarada (1 minuto, manipular): 1 vez ao dia. Disfarce ilusório de 1º posto até tirar a echarpe.',
        frequency: '1 vez ao dia',
      },
      description:
        'Echarpe bordada que completa qualquer fantasia. 1 vez ao dia, disfarce ilusório de 1º posto.',
    }),
    w({
      id: 'worn-3095-greater',
      aonId: 3095,
      name: 'Echarpe de mascarada maior',
      originalName: 'Masquerade Scarf (Greater)',
      level: 7,
      priceGp: 340,
      page: 292,
      wornMagic: {
        activate: 'Mascarada (2 ações). Quantas vezes quiser ao dia. Disfarce ilusório de 2º posto.',
      },
      description:
        'Versão maior: ativação de 2 ações, à vontade, disfarce ilusório de 2º posto.',
    }),
    w({
      id: 'worn-3096',
      aonId: 3096,
      name: 'Anel do mensageiro',
      originalName: "Messenger's Ring",
      level: 9,
      priceGp: 700,
      page: 292,
      wornMagic: skillItem('diplomacy', 2, {
        activate:
          'Despachar mensageiro (1 minuto, concentrar): 1 vez ao dia. Mensageiro animal; a criatura surge do anel com a heráldica do anel. Também mensagem como magia arcana inata à vontade.',
        frequency: '1 vez ao dia',
      }),
      description:
        'Anel de sinete que muda para o símbolo de quem você serve. +2 em Diplomacia, mensagem à vontade, e mensageiro animal 1 vez ao dia.',
    }),
    w({
      id: 'worn-3096-greater',
      aonId: 3096,
      name: 'Anel do mensageiro maior',
      originalName: "Messenger's Ring (Greater)",
      level: 17,
      priceGp: 13500,
      page: 292,
      wornMagic: skillItem('diplomacy', 3, {
        activate:
          'Envio (3 ações, concentrar): 1 vez por hora. O anel conjura enviar mensagem. Também as ativações do anel comum.',
        frequency: '1 vez por hora',
      }),
      description: 'Versão maior: +3 em Diplomacia e enviar mensagem 1 vez por hora.',
    }),
    w({
      id: 'worn-3097',
      aonId: 3097,
      name: 'Óculos de obsidiana',
      originalName: 'Obsidian Goggles',
      level: 5,
      priceGp: 150,
      page: 293,
      wornMagic: {
        perceptionBonus: 1,
        slot: 'lente',
        activate:
          'Visão no escuro (1 ação, manipular): 1 vez ao dia, visão no escuro por 1 hora.',
        frequency: '1 vez ao dia',
        note: '+1 de bônus de item em Percepção visual.',
      },
      description:
        'Lentes pretas que clareiam o mundo. +1 em Percepção visual. 1 vez ao dia, visão no escuro por 1 hora.',
    }),
    w({
      id: 'worn-3097-greater',
      aonId: 3097,
      name: 'Óculos de obsidiana maiores',
      originalName: 'Obsidian Goggles (Greater)',
      level: 11,
      priceGp: 1250,
      page: 293,
      wornMagic: {
        perceptionBonus: 2,
        activate:
          'Visão no escuro (1 ação) à vontade, até desligar (Interagir) ou deixar de investir.',
      },
      description: 'Versão maior: +2 em Percepção visual e visão no escuro à vontade.',
    }),
    w({
      id: 'worn-3097-major',
      aonId: 3097,
      name: 'Óculos de obsidiana máximos',
      originalName: 'Obsidian Goggles (Major)',
      level: 18,
      priceGp: 20000,
      page: 293,
      wornMagic: {
        perceptionBonus: 3,
        activate: 'Visão no escuro maior, à vontade.',
      },
      description: 'Versão máxima: +3 em Percepção visual e visão no escuro maior à vontade.',
    }),
    w({
      id: 'worn-3098',
      aonId: 3098,
      name: 'Pingente do oculto',
      originalName: 'Pendant of the Occult',
      level: 3,
      priceGp: 60,
      page: 293,
      traits: ['Occult'],
      wornMagic: skillItem('occultism', 1, {
        note: 'Orientação como truque ocultista inato.',
      }),
      description:
        'Amuleto oco em forma de olho. +1 em Ocultismo e orientação inata.',
    }),
    w({
      id: 'worn-3098-greater',
      aonId: 3098,
      name: 'Pingente do oculto maior',
      originalName: 'Pendant of the Occult (Greater)',
      level: 9,
      priceGp: 650,
      page: 293,
      traits: ['Occult'],
      wornMagic: skillItem('occultism', 2, {
        activate:
          'Mensagem onírica (concentrar e manipular): 1 vez ao dia. Conjura mensagem onírica de 4º posto.',
        frequency: '1 vez ao dia',
      }),
      description: 'Versão maior: +2 em Ocultismo e mensagem onírica de 4º posto 1 vez ao dia.',
    }),
    w({
      id: 'worn-3099',
      aonId: 3099,
      name: 'Máscara de persona',
      originalName: 'Persona Mask',
      level: 3,
      priceGp: 50,
      page: 293,
      traits: ['Fortune'],
      wornMagic: skillItem('performance', 1, {
        slot: 'máscara',
        activate: 'Assumir papel (1 ação, concentrar): a máscara vira um personagem dramático à escolha.',
        note: '+1 em Performance ao atuar, orar, fazer comédia ou cantar. Não atrapalha os sentidos.',
      }),
      description:
        'Máscara de alabastro que cobre o rosto sem cegar. +1 em Performance de palco e troca de personagem.',
    }),
    w({
      id: 'worn-3099-greater',
      aonId: 3099,
      name: 'Máscara de persona maior',
      originalName: 'Persona Mask (Greater)',
      level: 9,
      priceGp: 650,
      page: 293,
      traits: ['Fortune'],
      wornMagic: skillItem('performance', 2, {
        activate:
          'Sacrificar papel (reação, concentrar, fortuna): 1 vez ao dia, ao falhar num teste de Performance que use o bônus da máscara. Troca o personagem e rerrola.',
        frequency: '1 vez ao dia',
      }),
      description: 'Versão maior: +2 em Performance e rerrolagem de fortuna 1 vez ao dia.',
    }),
    w({
      id: 'worn-3100',
      aonId: 3100,
      name: 'Visco primevo',
      originalName: 'Primeval Mistletoe',
      level: 6,
      priceGp: 230,
      page: 294,
      wornMagic: skillItem('nature', 1, {
        activate:
          'Unção (2 ações, manipular): 1 vez a cada 10 minutos. Suco da baga em arma de madeira (arma rúnica) ou criatura (corpo rúnico). Amarração (2 ações): 1 vez ao dia, um com as plantas em uma árvore tocada.',
        frequency: '1 vez a cada 10 minutos / 1 vez ao dia',
        note: 'Serve de lócus primordial.',
      }),
      description:
        'Ramo de azevinho e visco que não murcha. Lócus primordial, +1 em Natureza, arma/corpo rúnico e um com as plantas.',
    }),
    w({
      id: 'worn-3100-greater',
      aonId: 3100,
      name: 'Visco primevo maior',
      originalName: 'Primeval Mistletoe (Greater)',
      level: 14,
      priceGp: 3900,
      page: 294,
      wornMagic: skillItem('nature', 2, {
        activate:
          'Unção em 6º posto. Cultivar (2 ações): 1 vez ao dia, planta o visco e cria campo de vida (azevinho) por até 1 minuto (Sustentar).',
        frequency: '1 vez ao dia (cultivar)',
      }),
      description:
        'Versão maior: +2 em Natureza, unção em 6º posto, e campo de vida 1 vez ao dia.',
    }),
    w({
      id: 'worn-3101',
      aonId: 3101,
      name: 'Botas propulsoras',
      originalName: 'Propulsive Boots',
      level: 13,
      priceGp: 3000,
      page: 294,
      bulk: 'L',
      wornMagic: {
        speedBonus: 5,
        slot: 'sapatos',
        activate:
          'Pisada aceleradora (1 ação, manipular): 1 vez ao dia. Acelerado por 1 minuto; a ação extra só para Caminhar, Escaladar ou Nadar.',
        frequency: '1 vez ao dia',
        note: '+5 pés também em deslocamentos de escalada e nado que você já tenha.',
      },
      description:
        'Botas vermelhas. +5 pés no deslocamento terrestre e em escalada/nado. 1 vez ao dia, acelerado para se mover.',
    }),
    w({
      id: 'worn-3102',
      aonId: 3102,
      name: 'Cinto de recuperação',
      originalName: 'Retrieval Belt',
      level: 7,
      priceGp: 340,
      page: 294,
      rarity: 'uncommon',
      traits: ['Extradimensional'],
      wornMagic: {
        extraBulkCapacity: 1,
        slot: 'cinto',
        activate:
          'Guardar (1 ação, manipular): item de 1 de Carga ou menos some para o espaço. Recuperar (ação livre): o item aparece na mão livre. Nenhuma das duas de novo por 1 minuto.',
      },
      description:
        'Cinto de bolsos de pedra. Espaço extradimensional para 1 item de até 1 de Carga. Guardar e puxar com um gesto. Incomum.',
    }),
    w({
      id: 'worn-3102-greater',
      aonId: 3102,
      name: 'Cinto de recuperação maior',
      originalName: 'Retrieval Belt (Greater)',
      level: 9,
      priceGp: 600,
      page: 294,
      rarity: 'uncommon',
      traits: ['Extradimensional'],
      wornMagic: {
        extraBulkCapacity: 3,
        note: 'Até 3 itens.',
      },
      description: 'Versão maior: até 3 itens no espaço.',
    }),
    w({
      id: 'worn-3102-major',
      aonId: 3102,
      name: 'Cinto de recuperação máximo',
      originalName: 'Retrieval Belt (Major)',
      level: 13,
      priceGp: 2500,
      page: 294,
      rarity: 'uncommon',
      traits: ['Extradimensional'],
      wornMagic: {
        extraBulkCapacity: 10,
        note: 'Até 10 itens.',
      },
      description: 'Versão máxima: até 10 itens no espaço.',
    }),
    w({
      id: 'worn-3103',
      aonId: 3103,
      name: 'Anel da escalada',
      originalName: 'Ring of Climbing',
      level: 12,
      priceGp: 1750,
      page: 294,
      wornMagic: {
        note: 'Deslocamento de escalada igual à metade do terrestre (penalidades de deslocamento aplicam antes de dividir).',
      },
      description:
        'Anel de ouro com garras. Escalada igual à metade do deslocamento terrestre.',
    }),
    w({
      id: 'worn-3104',
      aonId: 3104,
      name: 'Anel das mentiras',
      originalName: 'Ring of Lies',
      level: 10,
      priceGp: 850,
      page: 294,
      rarity: 'uncommon',
      wornMagic: skillItem('deception', 2, {
        activate:
          'Adoçar mentiras (2 ações, manipular): 1 vez ao dia. Palavras melosas, sem manifestações visuais de magia.',
        frequency: '1 vez ao dia',
      }),
      description:
        'Anel de prata oleoso. +2 em Enganação. 1 vez ao dia, palavras melosas discretas. Incomum.',
    }),
    w({
      id: 'worn-3105',
      aonId: 3105,
      name: 'Anel de sigilos',
      originalName: 'Ring of Sigils',
      level: 1,
      priceGp: 20,
      page: 294,
      traits: ['Arcane'],
      wornMagic: {
        activate:
          'Rastrear sigilo (1 ação, manipular): 1 vez a cada 10 minutos. Direção geral do sigilo mais recente criado com o anel, até 5 milhas, se não houver chumbo ou água corrente no caminho. Também sigilo como truque arcano inato.',
        frequency: '1 vez a cada 10 minutos',
      },
      description:
        'Anel de prata com sigilos, inclusive o seu ao investir. Truque sigilo e rastreio do último símbolo.',
    }),
    w({
      id: 'worn-3105-greater',
      aonId: 3105,
      name: 'Anel de sigilos maior',
      originalName: 'Ring of Sigils (Greater)',
      level: 6,
      priceGp: 225,
      page: 294,
      traits: ['Arcane'],
      wornMagic: {
        activate:
          'Rastrear sigilo até 100 milhas. Se o sigilo estiver numa criatura viva, você também sabe se está viva, a distância e as condições.',
        frequency: '1 vez a cada 10 minutos',
      },
      description: 'Versão maior: rastreio a 100 milhas e informações se o alvo for uma criatura viva.',
    }),
    w({
      id: 'worn-3106',
      aonId: 3106,
      name: 'Anel da sustento',
      originalName: 'Ring of Sustenance',
      level: 7,
      priceGp: 325,
      page: 294,
      rarity: 'uncommon',
      wornMagic: {
        note: 'Não precisa comer nem beber. 2 horas de sono valem 8. Só funciona após uma semana contínua investida; tirar zera o prazo.',
      },
      description:
        'Anel de madeira polida. Depois de uma semana investida, você não precisa comer nem beber e dorme só 2 horas. Incomum.',
    }),
    w({
      id: 'worn-3107',
      aonId: 3107,
      name: 'Anel da natação',
      originalName: 'Ring of Swimming',
      level: 12,
      priceGp: 1750,
      page: 295,
      wornMagic: {
        note: 'Deslocamento de nado igual à metade do terrestre (penalidades aplicam antes de dividir).',
      },
      description: 'Anel de metal azul. Nado igual à metade do deslocamento terrestre.',
    }),
    w({
      id: 'worn-3109',
      aonId: 3109,
      name: 'Símbolo reluzente',
      originalName: 'Shining Symbol',
      level: 3,
      priceGp: 55,
      page: 295,
      traits: ['Divine', 'Light', 'Revelation'],
      wornMagic: skillItem('religion', 1, {
        activate:
          'Luz espiritual (2 ações, concentrar, luz, revelação): 1 vez ao dia. A luz vira brilhante por 10 minutos; criaturas na luz sofrem −1 de status em Enganação e Furtividade. Pode Dispensar.',
        frequency: '1 vez ao dia',
        note: 'Vira o símbolo da sua divindade. Luz fraca num raio de 20 pés.',
      }),
      description:
        'Amuleto dourado que vira o símbolo da sua divindade. +1 em Religião, luz fraca, e 1 vez ao dia luz que denuncia espíritos.',
    }),
    w({
      id: 'worn-3109-greater',
      aonId: 3109,
      name: 'Símbolo reluzente maior',
      originalName: 'Shining Symbol (Greater)',
      level: 9,
      priceGp: 650,
      page: 295,
      traits: ['Divine', 'Light', 'Revelation'],
      wornMagic: skillItem('religion', 2, {
        note: 'Penalidade da luz espiritual −2. Inimigos na luz ganham fraqueza 5 a dano de espírito.',
      }),
      description: 'Versão maior: +2 em Religião, penalidade −2, fraqueza 5 a espírito nos inimigos na luz.',
    }),
    w({
      id: 'worn-3109-major',
      aonId: 3109,
      name: 'Símbolo reluzente máximo',
      originalName: 'Shining Symbol (Major)',
      level: 17,
      priceGp: 13500,
      page: 295,
      traits: ['Divine', 'Light', 'Revelation'],
      wornMagic: skillItem('religion', 3, {
        note: 'Penalidade −3. Fraqueza 10 a espírito.',
      }),
      description: 'Versão máxima: +3 em Religião, penalidade −3, fraqueza 10 a espírito.',
    }),
    w({
      id: 'worn-3110',
      aonId: 3110,
      name: 'Mangas de armazenamento',
      originalName: 'Sleeves of Storage',
      level: 4,
      priceGp: 100,
      page: 296,
      bulk: 'L',
      traits: ['Extradimensional'],
      wornMagic: {
        extraBulkCapacity: 10,
        slot: 'veste',
        note: 'Cada manga segura 5 de Carga (total 10), item no máx. 1 de Carga. Familiar Minúsculo pode ficar 1 hora numa manga vazia. Interagir com uma mão livre.',
      },
      description:
        'Veste de mangas largas, cada uma um espaço extradimensional (5 de Carga). Familiar Minúsculo pode se esconder numa manga vazia por 1 hora.',
    }),
    w({
      id: 'worn-3110-greater',
      aonId: 3110,
      name: 'Mangas de armazenamento maiores',
      originalName: 'Sleeves of Storage (Greater)',
      level: 9,
      priceGp: 600,
      page: 296,
      bulk: 'L',
      traits: ['Extradimensional'],
      wornMagic: {
        extraBulkCapacity: 40,
        note: '20 de Carga por manga. Familiar aguenta 4 horas.',
      },
      description: 'Versão maior: 20 de Carga por manga e familiar por até 4 horas.',
    }),
    w({
      id: 'worn-3111',
      aonId: 3111,
      name: 'Símbolo de conflito',
      originalName: 'Symbol of Conflict',
      level: 4,
      priceGp: 90,
      page: 296,
      rarity: 'uncommon',
      traits: ['Divine'],
      wornMagic: skillItem('religion', 1, {
        activate:
          'Presença (2 ações, concentrar e manipular): 1 vez ao dia. Conjura abater ou abençoar (CD de contrapor 18, modificador +8).',
        frequency: '1 vez ao dia',
        note: 'Só sagrado ou profano pode afinar. +1 de circunstância em salvaguardas contra efeitos sagrados e profanos. Fabricação: você é sagrado ou profano.',
      }),
      description:
        'Colar que vira símbolo da divindade (ou pessoal). +1 em Religião, +1 de circunstância contra sagrado/profano, e abater ou abençoar 1 vez ao dia. Incomum.',
    }),
    w({
      id: 'worn-3111-greater',
      aonId: 3111,
      name: 'Símbolo de conflito maior',
      originalName: 'Symbol of Conflict (Greater)',
      level: 10,
      priceGp: 900,
      page: 296,
      rarity: 'uncommon',
      traits: ['Divine'],
      wornMagic: skillItem('religion', 2, {
        activate:
          'Lista de 4º posto: abater, abençoar, ira divina e limpar aflição. CD 27, contrapor +17.',
        frequency: '1 vez ao dia',
      }),
      description: 'Versão maior: +2 em Religião e magias de 4º posto (CD 27, +17).',
    }),
    w({
      id: 'worn-3111-major',
      aonId: 3111,
      name: 'Símbolo de conflito máximo',
      originalName: 'Symbol of Conflict (Major)',
      level: 18,
      priceGp: 19000,
      page: 296,
      rarity: 'uncommon',
      traits: ['Divine'],
      wornMagic: skillItem('religion', 3, {
        activate:
          'Magias de 6º posto: abater, abençoar, ira divina, limpar aflição, mais invocar celestial (sagrado) ou invocar demônio (profano). CD 38, contrapor +28.',
        frequency: '1 vez ao dia',
      }),
      description: 'Versão máxima: +3 em Religião e magias de 6º posto, inclusive invocação alinhada (CD 38, +28).',
    }),
    w({
      id: 'worn-3112',
      aonId: 3112,
      name: 'Terceiro olho',
      originalName: 'Third Eye',
      level: 19,
      priceGp: 40000,
      page: 296,
      wornMagic: {
        perceptionBonus: 3,
        activate:
          'Visão verdadeira (2 ações, concentrar): 1 vez ao dia. Efeitos de visão verdadeira de 8º posto.',
        frequency: '1 vez ao dia',
        note: 'Ao investir, vira tatuagem. Detectar magia de 9º posto contínuo (todas as auras a 30 pés). Buscar numa criatura revela condições, aflições e PV aproximados.',
      },
      description:
        'Coroa que vira tatuagem. +3 em Percepção, auras mágicas contínuas, leitura de saúde ao Buscar, e visão verdadeira 1 vez ao dia.',
    }),
    w({
      id: 'worn-3113',
      aonId: 3113,
      name: 'Óculos do rastreador',
      originalName: "Tracker's Goggles",
      level: 3,
      priceGp: 60,
      page: 296,
      wornMagic: skillItem('survival', 1, {
        slot: 'lente',
        note: '+1 para Orientar-se e Rastrear. Se falhar ao Rastrear, pode tentar de novo após 30 minutos (em vez de 1 hora).',
      }),
      description:
        'Lentes verdes em couro. +1 em Sobrevivência para orientar e rastrear, com nova tentativa mais cedo.',
    }),
    w({
      id: 'worn-3113-greater',
      aonId: 3113,
      name: 'Óculos do rastreador maiores',
      originalName: "Tracker's Goggles (Greater)",
      level: 9,
      priceGp: 660,
      page: 296,
      wornMagic: skillItem('survival', 2, {
        note: 'Nova tentativa ao Rastrear após 15 minutos.',
      }),
      description: 'Versão maior: +2 e nova tentativa após 15 minutos.',
    }),
    w({
      id: 'worn-3114',
      aonId: 3114,
      name: 'Anel do ventríloquo',
      originalName: "Ventriloquist's Ring",
      level: 3,
      priceGp: 60,
      page: 296,
      wornMagic: skillItem('deception', 1, {
        activate:
          'Lançar a voz (2 ações, manipular): 1 vez ao dia. Ventriloquia (CD 19).',
        frequency: '1 vez ao dia',
      }),
      description:
        'Anel de cobre com passarinhos. +1 em Enganação. 1 vez ao dia, ventriloquia CD 19.',
    }),
    w({
      id: 'worn-3114-greater',
      aonId: 3114,
      name: 'Anel do ventríloquo maior',
      originalName: "Ventriloquist's Ring (Greater)",
      level: 9,
      priceGp: 670,
      page: 296,
      wornMagic: skillItem('deception', 2, {
        activate: 'Ventriloquia de 2º posto (CD 27), à vontade.',
      }),
      description: 'Versão maior: +2 em Enganação e ventriloquia de 2º posto à vontade.',
    }),
    w({
      id: 'worn-3115',
      aonId: 3115,
      name: 'Mochila do viajante',
      originalName: "Voyager's Pack",
      level: 17,
      priceGp: 14800,
      page: 297,
      rarity: 'uncommon',
      wornMagic: skillItem('survival', 3, {
        extraBulkCapacity: 50,
        slot: 'mochila',
        activate:
          'Viagem em grupo (10 minutos, concentrar e manipular): até 4 criaturas dispostas nas cordas. Conjura teleporte ou teleporte interplanar de 7º posto. Teste de Sobrevivência CD 45: sucesso reduz o erro; crítico chega no alvo.',
        note: 'Espaço como bolsa espaçosa tipo II, com kit de escalada que se recompõe ao amanhecer. Permite Rastrear criatura que teleportou.',
      }),
      description:
        'Mochila que marca cada plano visitado. +3 em Sobrevivência, rastreia teleporte, espaço tipo II e viagem em grupo. Incomum.',
    }),
    w({
      id: 'worn-3117',
      aonId: 3117,
      name: 'Bússola de caminho',
      originalName: 'Wayfinder',
      level: 2,
      priceGp: 28,
      page: 297,
      rarity: 'uncommon',
      wornMagic: {
        activate: 'Luz (1 ação, concentrar): a bússola é alvo de luz de 1º posto.',
        note: 'Funciona como bússola. Encaixa uma pedra eon: os dois investem como um só item e a pedra libera o poder de ressonância. Duas wayfinders com pedra investida se anulam. Acesso: membro da Sociedade Pathfinder.',
      },
      description:
        'Bússola compacta da Sociedade Pathfinder. Encaixa uma pedra eon (contam como um item investido) e libera a ressonância. Ativação: luz. Incomum.',
    }),
    w({
      id: 'worn-3118',
      aonId: 3118,
      name: 'Sussurro da primeira mentira',
      originalName: 'Whisper of the First Lie',
      level: 20,
      priceGp: 60000,
      page: 297,
      rarity: 'rare',
      wornMagic: skillItem('deception', 3, {
        activate:
          'Soltar a mentira (3 ações, concentrar e manipular): destampa o frasco e cria verdade fabricada (CD 47). O frasco esvazia e nunca mais ativa. Fabricação: fornecer verdade fabricada.',
        note: 'Pode contrapor efeitos que forcem a verdade ou detectem mentira (posto 9, +35). Sucesso ignora o efeito sem removê-lo.',
      }),
      description:
        'Colar com sussurros engarrafados da primeira mentira. +3 em Enganação, contrapõe magias da verdade, e uma única verdade fabricada CD 47. Raro.',
    }),
    w({
      id: 'worn-3119',
      aonId: 3119,
      name: 'Sandálias aladas',
      originalName: 'Winged Sandals',
      level: 10,
      priceGp: 850,
      page: 297,
      bulk: 'L',
      traits: ['Air'],
      wornMagic: {
        slot: 'sapatos',
        activate:
          'Despertar asas (2 ações, ar, concentrar): 1 vez ao dia. Voo de 30 pés por 10 minutos.',
        frequency: '1 vez ao dia',
        note: 'Ao cair, conjura aterrissagem suave automaticamente (não dispara de novo por 10 minutos).',
      },
      description:
        'Sandálias de couro com asinhas. Quedas ativam aterrissagem suave. 1 vez ao dia, voo de 30 pés por 10 minutos.',
    }),
    w({
      id: 'worn-3108',
      aonId: 3108,
      name: 'Sinete das sombras',
      originalName: 'Shadow Signet',
      level: 10,
      priceGp: 1000,
      page: 295,
      wornMagic: {
        slot: 'anel',
        activate:
          'Distorcer (concentrar, forma de magia): se a próxima ação for Conjurar magia com ataque contra CA, escolha CD de Fortitude ou Reflexos. O ataque de magia usa essa defesa em vez da CA (vale para todos os alvos da magia).',
      },
      description:
        'Anel de obsidiana. Distorce a magia pelo Submundo: o próximo ataque de magia contra CA usa Fortitude ou Reflexos, à sua escolha.',
    }),
  ]
}
