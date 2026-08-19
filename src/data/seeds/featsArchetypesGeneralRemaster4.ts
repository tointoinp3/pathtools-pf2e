/** Gerais Remaster: Herbalista, Linguista, Artista Marcial, Espancador, Pirata. Sem Legacy. */
import type { Feat } from '@/types/feat'
import {
  SOURCE_HIGH_SEAS_ID,
  SOURCE_PLAYER_CORE_2_ID,
  SOURCE_PLAYER_CORE_ID,
  SOURCE_TIAN_XIA_CG_ID,
} from './sources'

function f(opts: {
  id: string
  name: string
  originalName: string
  level: number
  archetypeId: string
  description: string
  prereqId?: string
  prereqName?: string
  extraPrereq?: Feat['prerequisites']
  effects?: Feat['effects']
  traits?: string[]
  actionType?: Feat['actionType']
  trigger?: string
  frequency?: string
  sourcePage?: number
  aonUrl: string
  sourceId?: string
  isDedication?: boolean
  allowedSlotKinds?: Feat['allowedSlotKinds']
  repeatable?: boolean
  rarity?: Feat['rarity']
}): Feat {
  return {
    id: opts.id,
    name: opts.name,
    originalName: opts.originalName,
    level: opts.level,
    category: 'archetype',
    archetypeId: opts.archetypeId,
    isDedication: opts.isDedication,
    traits: opts.traits ?? (opts.isDedication ? ['Arquétipo', 'Dedicação'] : ['Arquétipo']),
    rarity: opts.rarity ?? 'common',
    provenance: { type: 'official' },
    description: opts.description,
    effects: opts.effects,
    prerequisites: [
      ...(opts.prereqId
        ? [{ kind: 'feat' as const, featId: opts.prereqId, featName: opts.prereqName }]
        : []),
      ...(opts.extraPrereq ?? []),
    ],
    actionType: opts.actionType,
    trigger: opts.trigger,
    frequency: opts.frequency,
    allowedSlotKinds: opts.allowedSlotKinds,
    repeatable: opts.repeatable,
    sourceId: opts.sourceId ?? SOURCE_PLAYER_CORE_2_ID,
    sourcePage: opts.sourcePage,
    aonUrl: opts.aonUrl,
  }
}

const DED_HERB = { id: 'feat-herbalist-dedication', name: 'Dedicação de Herbalista' }
const DED_LING = { id: 'feat-linguist-dedication', name: 'Dedicação de Linguista' }
const DED_MA = {
  id: 'feat-martial-artist-dedication',
  name: 'Dedicação de Artista Marcial',
}
const DED_MAUL = { id: 'feat-mauler-dedication', name: 'Dedicação de Espancador' }
const DED_PIR = { id: 'feat-pirate-dedication', name: 'Dedicação de Pirata' }

const herbalistArchetypeFeats: Feat[] = [
  f({
    id: DED_HERB.id,
    name: DED_HERB.name,
    originalName: 'Herbalist Dedication',
    level: 2,
    archetypeId: 'archetype-herbalist',
    isDedication: true,
    description:
      'Ganha os benefícios de alquimia avançada: 4 consumíveis alquímicos com traço cura (itens herbais); 2 se não preparou no ermo. Lembra as fórmulas (sem livro). Fica perito em Natureza e usa Natureza no lugar de Ofício para fabricar consumíveis alquímicos de cura, mesmo sem treino em Ofício, com ferramentas de curandeiro.',
    effects: [
      { kind: 'skillRank', skillId: 'nature', rank: 'expert' },
      {
        kind: 'specialAbility',
        name: 'Itens herbais',
        description:
          'Alquimia avançada: 4 consumíveis alquímicos de cura (2 fora do ermo). Natureza no lugar de Ofício para esses itens.',
      },
    ],
    extraPrereq: [
      { kind: 'feat', featId: 'feat-natural-medicine', featName: 'Medicina Natural' },
      { kind: 'text', label: 'Medicina Natural' },
    ],
    sourcePage: 202,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=252',
  }),
  f({
    id: 'feat-herbalist-fresh-ingredients',
    name: 'Ingredientes Frescos',
    originalName: 'Fresh Ingredients',
    level: 2,
    archetypeId: 'archetype-herbalist',
    prereqId: DED_HERB.id,
    prereqName: DED_HERB.name,
    description:
      'Ao usar Medicina Natural para Tratar Ferimentos, ganha o +2 de circunstância de ingredientes frescos mesmo fora do ermo. No ermo, o bônus é +4.',
    effects: [
      {
        kind: 'circumstanceBonus',
        value: 2,
        appliesTo: 'Medicina Natural para Tratar Ferimentos (ingredientes frescos; +4 no ermo)',
      },
    ],
    sourcePage: 202,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=252',
  }),
  f({
    id: 'feat-herbalist-poultice-preparation',
    name: 'Preparação de Cataplasma',
    originalName: 'Poultice Preparation',
    level: 4,
    archetypeId: 'archetype-herbalist',
    prereqId: DED_HERB.id,
    prereqName: DED_HERB.name,
    description:
      'Ao criar um elixir como item herbal, pode prepará-lo como cataplasma: ganha o traço óleo (continua alquímico), perde elixir. Aplicar: Interagir com uma mão. Além do efeito normal, o alvo tenta teste simples imediato para encerrar uma fonte de ácido, sangramento ou fogo persistente, com a redução de CD de assistência adequada.',
    sourcePage: 202,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=252',
  }),
  f({
    id: 'feat-herbalist-advanced-herbalism',
    name: 'Herbalismo Avançado',
    originalName: 'Advanced Herbalism',
    level: 6,
    archetypeId: 'archetype-herbalist',
    prereqId: DED_HERB.id,
    prereqName: DED_HERB.name,
    description:
      'Cria até 6 itens herbais por dia com alquimia avançada. Especial: no 10º nível ou mais, pode selecionar este feito uma segunda vez para subir para 8. Você decide se pega de novo; o motor não escolhe.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Mais itens herbais',
        description: '6 itens herbais por dia (8 se pegar este feito de novo no 10º+).',
      },
    ],
    repeatable: true,
    sourcePage: 202,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=252',
  }),
  f({
    id: 'feat-herbalist-endemic-herbs',
    name: 'Ervas Endêmicas',
    originalName: 'Endemic Herbs',
    level: 6,
    archetypeId: 'archetype-herbalist',
    traits: ['Arquétipo', 'Aditivo'],
    prereqId: DED_HERB.id,
    prereqName: DED_HERB.name,
    extraPrereq: [
      { kind: 'skillRank', skillId: 'survival', rank: 'trained' },
      { kind: 'text', label: 'Treinado em Sobrevivência' },
    ],
    description:
      'Quem consome seu item herbal ganha o benefício do terreno onde você o criou (1 minuto se não for imediato): aquático +1 Fortitude; ártico frio ambiental um passo menos grave (1 hora); deserto calor um passo menos grave (1 hora); floresta +2 contra doença e veneno; montanha +1 Reflexos; planície +1 Vontade; pântano remove uma fonte de sangramento persistente; subterrâneo +1 Percepção.',
    sourcePage: 202,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=6343',
  }),
]

const linguistArchetypeFeats: Feat[] = [
  f({
    id: DED_LING.id,
    name: DED_LING.name,
    originalName: 'Linguist Dedication',
    level: 2,
    archetypeId: 'archetype-linguist',
    isDedication: true,
    description:
      'Fica treinado em Sociedade; se já era treinado, fica perito. Ganha o feito Multilíngue duas vezes (dois idiomas cada vez, mais extras se for mestre/lendário em Sociedade). Você escolhe cada idioma; o motor não escolhe.',
    effects: [
      { kind: 'skillRank', skillId: 'society', rank: 'trained', bumpIfAlready: true },
      {
        kind: 'languageChoice',
        choiceId: 'multilingual-a',
        count: 2,
        extraAtRank: { master: 1, legendary: 1 },
        skillId: 'society',
        hint: 'Multilíngue (1ª vez): escolha os idiomas.',
      },
      {
        kind: 'languageChoice',
        choiceId: 'multilingual-b',
        count: 2,
        extraAtRank: { master: 1, legendary: 1 },
        skillId: 'society',
        hint: 'Multilíngue (2ª vez): escolha os idiomas.',
      },
    ],
    extraPrereq: [{ kind: 'text', label: 'Fala pelo menos 3 idiomas' }],
    sourcePage: 203,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=6344',
  }),
  f({
    id: 'feat-linguist-multilingual-cipher',
    name: 'Cifra Multilíngue',
    originalName: 'Multilingual Cipher',
    level: 4,
    archetypeId: 'archetype-linguist',
    prereqId: DED_LING.id,
    prereqName: DED_LING.name,
    description:
      '+1 de circunstância para Decifrar Escrita. Quem tentar Decifrar Escrita que você cifrou sofre −2 a menos que fale todos os idiomas que você usou.',
    effects: [
      { kind: 'circumstanceBonus', value: 1, appliesTo: 'Decifrar Escrita' },
    ],
    sourcePage: 203,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=253',
  }),
  f({
    id: 'feat-linguist-phonetic-training',
    name: 'Treino Fonético',
    originalName: 'Phonetic Training',
    level: 4,
    archetypeId: 'archetype-linguist',
    prereqId: DED_LING.id,
    prereqName: DED_LING.name,
    description:
      'Pronuncia e repete palavras com precisão quase perfeita mesmo sem entender, e pode transcrevê-las num alfabeto fonético que você ou outro com Treino Fonético lê depois. Mesmo sons que você não pronuncia podem ser transcritos. Memorizar sequências longas continua difícil como sempre.',
    sourcePage: 203,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=253',
  }),
  f({
    id: 'feat-linguist-spot-translate',
    name: 'Traduzir na Hora',
    originalName: 'Spot Translate',
    level: 4,
    archetypeId: 'archetype-linguist',
    traits: ['Arquétipo', 'Auditivo', 'Linguístico'],
    prereqId: DED_LING.id,
    prereqName: DED_LING.name,
    description:
      'Repita a mensagem num idioma que você conhece. O efeito linguístico conta como os dois idiomas. Fala normal não precisa desta reação; ela vale para magias e ações como Comando ou Desmoralizar. Você escolhe o idioma.',
    actionType: 'reaction',
    trigger:
      'Outra criatura a até 18 m usa um efeito linguístico num idioma que você entende.',
    sourcePage: 203,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=6347',
  }),
  f({
    id: 'feat-linguist-analyze-idiolect',
    name: 'Analisar Idioleto',
    originalName: 'Analyze Idiolect',
    level: 6,
    archetypeId: 'archetype-linguist',
    prereqId: DED_LING.id,
    prereqName: DED_LING.name,
    description:
      'Após 10 minutos de interação, +4 de circunstância em Enganação e CDs para Personificar aquele indivíduo. Analisar de novo substitui o idioleto anterior.',
    effects: [
      {
        kind: 'circumstanceBonus',
        value: 4,
        appliesTo: 'Enganação para Personificar o idioleto estudado',
      },
    ],
    sourcePage: 203,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=253',
  }),
  f({
    id: 'feat-linguist-read-shibboleths',
    name: 'Ler Chiboletes',
    originalName: 'Read Shibboleths',
    level: 7,
    archetypeId: 'archetype-linguist',
    prereqId: DED_LING.id,
    prereqName: DED_LING.name,
    description:
      'Após 10 minutos, um fato menor sobre o ambiente social da pessoa (cidade natal, grupos). Se estiver fingindo, ela testa Enganação, Sociedade ou Conhecimento contra sua CD de Sociedade em segredo. Com um ou mais fatos verdadeiros, +1 de circunstância em Diplomacia e Enganação com ela.',
    sourcePage: 203,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=253',
  }),
  f({
    id: 'feat-linguist-crude-communication',
    name: 'Comunicação Rudimentar',
    originalName: 'Crude Communication',
    level: 8,
    archetypeId: 'archetype-linguist',
    prereqId: DED_LING.id,
    prereqName: DED_LING.name,
    description:
      'Após 10 minutos com uma criatura que fala um idioma, o MJ rola Sociedade secreta (CD pela raridade do idioma). Sucesso: você entende o essencial e comunica conceitos básicos. Falha: interpreta errado. Lendário em Sociedade: comunica na hora, sem teste, e intui o meio (fala, sinais etc.).',
    sourcePage: 203,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=253',
  }),
]

const martialArtistArchetypeFeats: Feat[] = [
  f({
    id: DED_MA.id,
    name: DED_MA.name,
    originalName: 'Martial Artist Dedication',
    level: 2,
    archetypeId: 'archetype-martial-artist',
    isDedication: true,
    description:
      'O dado de dano dos seus ataques desarmados de punho passa a 1d6 (em vez de 1d4). Não sofre a penalidade de −2 de circunstância por tornar letal um ataque desarmado não letal.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Punhos letais',
        description: 'Punho 1d6. Sem −2 para tornar letal um desarmado não letal.',
      },
    ],
    sourcePage: 206,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=255',
  }),
  f({
    id: 'feat-martial-artist-crane-stance',
    name: 'Postura da Garça',
    originalName: 'Crane Stance',
    level: 4,
    archetypeId: 'archetype-martial-artist',
    traits: ['Arquétipo', 'Postura'],
    prereqId: DED_MA.id,
    prereqName: DED_MA.name,
    description:
      '+1 de circunstância na CA. Só Golpes de asa de garça: 1d6 concussão, grupo briga, ágil, acuidade, não letal, desarmado. CD de Salto em Altura/Distância −5; ao Saltar, +1,5 m horizontal ou +60 cm vertical.',
    actionType: 'one',
    sourceId: SOURCE_PLAYER_CORE_2_ID,
    sourcePage: 118,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=5976',
  }),
  f({
    id: 'feat-martial-artist-dragon-stance',
    name: 'Postura do Dragão',
    originalName: 'Dragon Stance',
    level: 4,
    archetypeId: 'archetype-martial-artist',
    traits: ['Arquétipo', 'Postura'],
    prereqId: DED_MA.id,
    prereqName: DED_MA.name,
    description:
      'Golpes de cauda de dragão: 1d10 concussão, grupo briga, impulso, não letal, desarmado. Ignora o primeiro quadrado de terreno difícil ao Deslocar-se.',
    actionType: 'one',
    sourceId: SOURCE_PLAYER_CORE_2_ID,
    sourcePage: 118,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=5977',
  }),
  f({
    id: 'feat-martial-artist-mountain-stance',
    name: 'Postura da Montanha',
    originalName: 'Mountain Stance',
    level: 4,
    archetypeId: 'archetype-martial-artist',
    traits: ['Arquétipo', 'Postura'],
    prereqId: DED_MA.id,
    prereqName: DED_MA.name,
    extraPrereq: [{ kind: 'text', label: 'Sem armadura e tocando o chão' }],
    description:
      'Só Golpes de pedra cadente: 1d8 concussão, grupo briga, vigoroso, não letal, desarmado. +4 de item na CA e +2 de circunstância contra Reposicionar, Empurrar, Derrubar e movimento forçado. Teto de DES na CA +0; Deslocamentos −1,5 m. O bônus de item acumula com runas de potência em roupa de explorador, armadura mística e faixas de força.',
    actionType: 'one',
    sourceId: SOURCE_PLAYER_CORE_2_ID,
    sourcePage: 118,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=5980',
  }),
  f({
    id: 'feat-martial-artist-rushing-goat-stance',
    name: 'Postura da Cabra Impetuosa',
    originalName: 'Rushing Goat Stance',
    level: 4,
    archetypeId: 'archetype-martial-artist',
    traits: ['Arquétipo', 'Postura'],
    prereqId: DED_MA.id,
    prereqName: DED_MA.name,
    description:
      'Só Golpes de chifre de aríete: 1d8 concussão, grupo briga, vigoroso, não letal, empurrar, desarmado. Se a ação anterior foi Escalar, Deslocar-se ou Saltar, bônus de circunstância no dano igual ao número de dados. Pode Golpear com chifre ao Escalar mesmo sem mão livre.',
    actionType: 'one',
    sourceId: SOURCE_TIAN_XIA_CG_ID,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7106',
  }),
  f({
    id: 'feat-martial-artist-stumbling-stance',
    name: 'Postura Cambaleante',
    originalName: 'Stumbling Stance',
    level: 4,
    archetypeId: 'archetype-martial-artist',
    traits: ['Arquétipo', 'Postura'],
    prereqId: DED_MA.id,
    prereqName: DED_MA.name,
    extraPrereq: [
      { kind: 'skillRank', skillId: 'deception', rank: 'trained' },
      { kind: 'text', label: 'Treinado em Enganação' },
    ],
    description:
      '+1 de circunstância em Enganação para Fintar. Só Golpes cambaleantes: 1d8 concussão, grupo briga, ágil, traidor, acuidade, não letal, desarmado. Inimigo que acertar você com Golpe corpo a corpo fica desprevenido contra o próximo Golpe cambaleante até o fim do seu próximo turno.',
    actionType: 'one',
    sourceId: SOURCE_PLAYER_CORE_2_ID,
    sourcePage: 119,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=5982',
  }),
  f({
    id: 'feat-martial-artist-tiger-stance',
    name: 'Postura do Tigre',
    originalName: 'Tiger Stance',
    level: 4,
    archetypeId: 'archetype-martial-artist',
    traits: ['Arquétipo', 'Postura'],
    prereqId: DED_MA.id,
    prereqName: DED_MA.name,
    description:
      'Garras de tigre: 1d8 corte, grupo briga, ágil, acuidade, não letal, desarmado. Crítico que cause dano: 1d4 sangramento persistente. Com Deslocamento de pelo menos 6 m, pode Dar um Passo de 3 m.',
    actionType: 'one',
    sourceId: SOURCE_PLAYER_CORE_2_ID,
    sourcePage: 119,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=5983',
  }),
  f({
    id: 'feat-martial-artist-twisting-petal-stance',
    name: 'Postura da Pétala Torcida',
    originalName: 'Twisting Petal Stance',
    level: 4,
    archetypeId: 'archetype-martial-artist',
    traits: ['Arquétipo', 'Postura'],
    prereqId: DED_MA.id,
    prereqName: DED_MA.name,
    extraPrereq: [
      { kind: 'skillRank', skillId: 'deception', rank: 'trained' },
      { kind: 'text', label: 'Treinado em Enganação' },
    ],
    description:
      'Golpes de flor de vendaval: 1d6 corte, grupo briga, ágil, acuidade, não letal, empurrar, desarmado. +1 em Atletismo para Empurrar e +2 na CD de Fortitude contra Empurrar. +1 em Enganação para Fintar e +2 na CD de Percepção contra Finta.',
    actionType: 'one',
    sourceId: SOURCE_TIAN_XIA_CG_ID,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7107',
  }),
  f({
    id: 'feat-martial-artist-wolf-stance',
    name: 'Postura do Lobo',
    originalName: 'Wolf Stance',
    level: 4,
    archetypeId: 'archetype-martial-artist',
    traits: ['Arquétipo', 'Postura'],
    prereqId: DED_MA.id,
    prereqName: DED_MA.name,
    description:
      'Mandíbulas de lobo: 1d8 perfuração, grupo briga, ágil, traidor, acuidade, não letal, desarmado. Se estiver flanqueando, as mandíbulas também ganham o traço derrubar.',
    actionType: 'one',
    sourceId: SOURCE_PLAYER_CORE_2_ID,
    sourcePage: 119,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=5984',
  }),
  f({
    id: 'feat-martial-artist-follow-up-strike',
    name: 'Golpe de Seguimento',
    originalName: 'Follow-up Strike',
    level: 6,
    archetypeId: 'archetype-martial-artist',
    traits: ['Arquétipo', 'Ímpeto'],
    prereqId: DED_MA.id,
    prereqName: DED_MA.name,
    extraPrereq: [
      { kind: 'text', label: 'Sua última ação foi um Golpe corpo a corpo desarmado que errou' },
    ],
    description:
      'Faça outro Golpe desarmado corpo a corpo, usando a mesma penalidade de ataque múltiplo do Golpe que errou.',
    actionType: 'one',
    sourcePage: 206,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=6365',
  }),
  f({
    id: 'feat-martial-artist-adamantine-body',
    name: 'Corpo de Adamantina',
    originalName: 'Adamantine Body',
    level: 8,
    archetypeId: 'archetype-martial-artist',
    prereqId: DED_MA.id,
    prereqName: DED_MA.name,
    description:
      'Resistência igual a 2 + metade do seu nível contra todo o dano do ataque ou efeito disparador.',
    actionType: 'reaction',
    trigger: 'Um ataque ou efeito causaria dano a você.',
    sourceId: SOURCE_TIAN_XIA_CG_ID,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7116',
  }),
  f({
    id: 'feat-martial-artist-advanced-monastic-weaponry',
    name: 'Armamento Monástico Avançado',
    originalName: 'Advanced Monastic Weaponry',
    level: 8,
    archetypeId: 'archetype-martial-artist',
    prereqId: DED_MA.id,
    prereqName: DED_MA.name,
    extraPrereq: [
      { kind: 'feat', featId: 'feat-monk-monastic-weaponry', featName: 'Armamento Monástico' },
      { kind: 'text', label: 'Armamento Monástico' },
    ],
    description:
      'Para proficiência, trata armas de monge avançadas como marciais de monge.',
    effects: [
      {
        kind: 'weaponFamiliarity',
        traits: ['monk'],
        martialAsSimple: false,
        advancedAsMartial: true,
      },
    ],
    sourceId: SOURCE_PLAYER_CORE_2_ID,
    sourcePage: 121,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=5997',
  }),
  f({
    id: 'feat-martial-artist-crane-flutter',
    name: 'Voo da Garça',
    originalName: 'Crane Flutter',
    level: 8,
    archetypeId: 'archetype-martial-artist',
    prereqId: 'feat-martial-artist-crane-stance',
    prereqName: 'Postura da Garça',
    extraPrereq: [{ kind: 'text', label: 'Você está em Postura da Garça' }],
    description:
      'O bônus de circunstância na CA da postura sobe para +3 contra o ataque disparador. Se o ataque errar e o atacante estiver no seu alcance, Golpeie com asa de garça com −2.',
    actionType: 'reaction',
    trigger: 'Você é alvo de um ataque de um atacante observado.',
    sourceId: SOURCE_PLAYER_CORE_2_ID,
    sourcePage: 121,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=6000',
  }),
  f({
    id: 'feat-martial-artist-dragon-roar',
    name: 'Rugido do Dragão',
    originalName: 'Dragon Roar',
    level: 8,
    archetypeId: 'archetype-martial-artist',
    prereqId: 'feat-martial-artist-dragon-stance',
    prereqName: 'Postura do Dragão',
    extraPrereq: [{ kind: 'text', label: 'Você está em Postura do Dragão' }],
    description:
      'Inimigos numa emanação de 4,5 m: Vontade contra sua CD de Intimidação ou amedrontado 1 (2 na falha crítica). Criatura amedrontada por isso que começa o turno adjacente a você não reduz o valor abaixo de 1 naquele turno. O primeiro ataque que acertar uma criatura amedrontada até o fim do seu próximo turno ganha +4 de circunstância no dano. 1d4 rodadas de recarga. Termina se sair da postura. Imune 1 minuto.',
    actionType: 'one',
    sourceId: SOURCE_PLAYER_CORE_2_ID,
    sourcePage: 121,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=6001',
  }),
  f({
    id: 'feat-martial-artist-grievous-blow',
    name: 'Golpe Grave',
    originalName: 'Grievous Blow',
    level: 8,
    archetypeId: 'archetype-martial-artist',
    prereqId: DED_MA.id,
    prereqName: DED_MA.name,
    description:
      'Golpe desarmado corpo a corpo. Se acertar: +2 dados de dano da arma e ignora resistência a dano físico (ou a um tipo físico) igual ao seu nível. Conta como dois ataques. No 18º, +3 dados.',
    actionType: 'two',
    sourcePage: 206,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=255',
  }),
  f({
    id: 'feat-martial-artist-momentous-charge',
    name: 'Investida Momentosa',
    originalName: 'Momentous Charge',
    level: 8,
    archetypeId: 'archetype-martial-artist',
    prereqId: 'feat-martial-artist-rushing-goat-stance',
    prereqName: 'Postura da Cabra Impetuosa',
    extraPrereq: [{ kind: 'text', label: 'Você está em Postura da Cabra Impetuosa' }],
    description:
      'Escale, Desloque-se ou Salte e então Golpeie com chifre de aríete. Sucesso: empurra o alvo até 3 m para longe. Sucesso crítico: também atordoado 1.',
    actionType: 'two',
    sourceId: SOURCE_TIAN_XIA_CG_ID,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7109',
  }),
  f({
    id: 'feat-martial-artist-mountain-stronghold',
    name: 'Fortaleza da Montanha',
    originalName: 'Mountain Stronghold',
    level: 8,
    archetypeId: 'archetype-martial-artist',
    prereqId: 'feat-martial-artist-mountain-stance',
    prereqName: 'Postura da Montanha',
    extraPrereq: [{ kind: 'text', label: 'Você está em Postura da Montanha' }],
    description:
      '+2 de circunstância na CA até o início do seu próximo turno. Especial: o teto de DES na CA da Postura da Montanha sobe de +0 para +1.',
    actionType: 'one',
    sourceId: SOURCE_PLAYER_CORE_2_ID,
    sourcePage: 122,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=6002',
  }),
  f({
    id: 'feat-martial-artist-tiger-slash',
    name: 'Talho do Tigre',
    originalName: 'Tiger Slash',
    level: 8,
    archetypeId: 'archetype-martial-artist',
    prereqId: 'feat-martial-artist-tiger-stance',
    prereqName: 'Postura do Tigre',
    extraPrereq: [{ kind: 'text', label: 'Você está em Postura do Tigre' }],
    description:
      'Golpe de garra de tigre com +2 dados (+3 no 14º+) e pode Empurrar 1,5 m. Crítico que cause dano: some seu modificador de Força ao sangramento persistente da garra.',
    actionType: 'two',
    sourceId: SOURCE_PLAYER_CORE_2_ID,
    sourcePage: 123,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=6006',
  }),
  f({
    id: 'feat-martial-artist-wolf-drag',
    name: 'Arrasto do Lobo',
    originalName: 'Wolf Drag',
    level: 8,
    archetypeId: 'archetype-martial-artist',
    prereqId: 'feat-martial-artist-wolf-stance',
    prereqName: 'Postura do Lobo',
    extraPrereq: [{ kind: 'text', label: 'Você está em Postura do Lobo' }],
    description:
      'Golpe de mandíbula de lobo. A mandíbula ganha fatal d12 neste Golpe; se acertar, derruba o alvo.',
    actionType: 'two',
    sourceId: SOURCE_PLAYER_CORE_2_ID,
    sourcePage: 123,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=6009',
  }),
  f({
    id: 'feat-martial-artist-scattering-in-spring',
    name: 'Dispersar na Primavera',
    originalName: 'Scattering in Spring',
    level: 10,
    archetypeId: 'archetype-martial-artist',
    prereqId: 'feat-martial-artist-twisting-petal-stance',
    prereqName: 'Postura da Pétala Torcida',
    extraPrereq: [{ kind: 'text', label: 'Você está em Postura da Pétala Torcida' }],
    description:
      '+2 de circunstância na CA contra o ataque disparador. Se errar, Finte ou Empurre o atacante; sucesso vira sucesso crítico.',
    actionType: 'reaction',
    trigger:
      'Um inimigo no seu alcance mira em você com um ataque corpo a corpo e você está ciente do ataque.',
    sourceId: SOURCE_TIAN_XIA_CG_ID,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7111',
  }),
  f({
    id: 'feat-martial-artist-five-gods-ram',
    name: 'Aríete dos Cinco Deuses',
    originalName: 'Five-gods Ram',
    level: 14,
    archetypeId: 'archetype-martial-artist',
    prereqId: 'feat-martial-artist-rushing-goat-stance',
    prereqName: 'Postura da Cabra Impetuosa',
    extraPrereq: [{ kind: 'text', label: 'Você está em Postura da Cabra Impetuosa' }],
    description:
      'Desloque-se ou Escale e Golpeie com chifre. Se acertar, empurra 3 m, Desloque-se ou Escale de novo e Golpeie outra vez. Segundo acerto: derruba. Se o segundo errar ou você não completar, fica atordoado 1. Ambos contam na penalidade, que só sobe depois dos dois.',
    actionType: 'three',
    sourceId: SOURCE_TIAN_XIA_CG_ID,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7112',
  }),
  f({
    id: 'feat-martial-artist-path-of-iron',
    name: 'Caminho de Ferro',
    originalName: 'Path of Iron',
    level: 14,
    archetypeId: 'archetype-martial-artist',
    prereqId: DED_MA.id,
    prereqName: DED_MA.name,
    description:
      'Desloque-se sem disparar reações. Até três Golpes corpo a corpo durante o movimento, cada um contra um inimigo diferente. Cada um conta na penalidade, que só sobe depois de todos.',
    actionType: 'three',
    sourcePage: 206,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=255',
  }),
  f({
    id: 'feat-martial-artist-whirling-in-the-summer-storm',
    name: 'Rodopio na Tempestade de Verão',
    originalName: 'Whirling in the Summer Storm',
    level: 14,
    archetypeId: 'archetype-martial-artist',
    prereqId: 'feat-martial-artist-twisting-petal-stance',
    prereqName: 'Postura da Pétala Torcida',
    extraPrereq: [{ kind: 'text', label: 'Você está em Postura da Pétala Torcida' }],
    description:
      'Dê um Passo. Cada inimigo no alcance testa Vontade contra a maior entre CD de classe e CD de Enganação; falha: desprevenido a ataques corpo a corpo seus e de aliados até o fim do seu próximo turno. Depois Empurre até três adjacentes; cada Empurrar conta na penalidade, que só sobe depois de todos.',
    actionType: 'three',
    sourceId: SOURCE_TIAN_XIA_CG_ID,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7113',
  }),
  f({
    id: 'feat-martial-artist-mountain-quake',
    name: 'Terremoto da Montanha',
    originalName: 'Mountain Quake',
    level: 16,
    archetypeId: 'archetype-martial-artist',
    prereqId: 'feat-martial-artist-mountain-stronghold',
    prereqName: 'Fortaleza da Montanha',
    extraPrereq: [{ kind: 'text', label: 'Você está em Postura da Montanha' }],
    description:
      'Criaturas no chão numa emanação de 6 m sofrem dano igual ao seu modificador de Força (mín. 0), Fortitude básico contra CD de classe. Falha: também caem. Recarga 1d4 rodadas. Especial: teto de DES da Postura da Montanha sobe de +1 para +2.',
    actionType: 'one',
    sourceId: SOURCE_PLAYER_CORE_2_ID,
    sourcePage: 126,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=6033',
  }),
  f({
    id: 'feat-martial-artist-echoing-violence',
    name: 'Violência Ecoante',
    originalName: 'Echoing Violence',
    level: 18,
    archetypeId: 'archetype-martial-artist',
    traits: ['Arquétipo', 'Morte', 'Incapacitação'],
    prereqId: DED_MA.id,
    prereqName: DED_MA.name,
    description:
      'A criatura sofre 10d6 concussão, Fortitude básico contra CD de classe. Falha crítica: morre imediatamente. 1/minuto.',
    actionType: 'free',
    frequency: '1/minuto',
    trigger: 'Você obtém sucesso crítico com um Golpe desarmado contra um oponente.',
    sourceId: SOURCE_TIAN_XIA_CG_ID,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7117',
  }),
]

const maulerArchetypeFeats: Feat[] = [
  f({
    id: DED_MAUL.id,
    name: DED_MAUL.name,
    originalName: 'Mauler Dedication',
    level: 2,
    archetypeId: 'archetype-mauler',
    isDedication: true,
    description:
      'Familiaridade com armas corpo a corpo de duas mãos ou com o traço duas mãos: marciais contam como simples e avançadas como marciais. Se for ao menos perito nessa arma, aplica especialização crítica.',
    effects: [
      {
        kind: 'weaponFamiliarity',
        weapons: [
          'Longspear',
          'Bo Staff',
          'Falchion',
          'Glaive',
          'Greataxe',
          'Greatclub',
          'Greatpick',
          'Greatsword',
          'Guisarme',
          'Halberd',
          'Lance',
          'Maul',
          'Ranseur',
          'Scythe',
          'War Flail',
          'Elven Curve Blade',
          'Horsechopper',
          'Spiked Chain',
          'Bastard Sword',
          'Staff',
        ],
        martialAsSimple: true,
        advancedAsMartial: true,
      },
      {
        kind: 'specialAbility',
        name: 'Especialização crítica (duas mãos)',
        description:
          'Se for ao menos perito na arma corpo a corpo de duas mãos (ou com traço duas mãos), aplica especialização crítica. A lista cobre o Player Core; outras armas de duas mãos seguem a mesma regra.',
      },
    ],
    sourcePage: 207,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=256',
  }),
  f({
    id: 'feat-mauler-slam-down',
    name: 'Derrubar com Pancada',
    originalName: 'Slam Down',
    level: 4,
    archetypeId: 'archetype-mauler',
    prereqId: DED_MAUL.id,
    prereqName: DED_MAUL.name,
    description:
      'Golpe corpo a corpo. Se acertar e causar dano, teste de Atletismo para Derrubar o alvo. Com arma corpo a corpo de duas mãos, ignora a mão livre do Derrubar. Ambos contam na penalidade, que só sobe depois dos dois.',
    actionType: 'two',
    sourcePage: 207,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=256',
  }),
  f({
    id: 'feat-mauler-vicious-swing',
    name: 'Balanço Cruel',
    originalName: 'Vicious Swing',
    level: 4,
    archetypeId: 'archetype-mauler',
    traits: ['Arquétipo', 'Ímpeto'],
    prereqId: DED_MAUL.id,
    prereqName: DED_MAUL.name,
    description:
      'Golpe corpo a corpo que conta como dois ataques. Se acertar, +1 dado de dano da arma (+2 no 10º, +3 no 18º).',
    actionType: 'two',
    sourceId: SOURCE_PLAYER_CORE_ID,
    sourcePage: 141,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=4775',
  }),
  f({
    id: 'feat-mauler-clear-the-way',
    name: 'Abrir Caminho',
    originalName: 'Clear the Way',
    level: 6,
    archetypeId: 'archetype-mauler',
    prereqId: DED_MAUL.id,
    prereqName: DED_MAUL.name,
    extraPrereq: [{ kind: 'text', label: 'Empunhando uma arma corpo a corpo com as duas mãos' }],
    description:
      'Tente Empurrar até cinco criaturas adjacentes (teste separado cada uma; ignora mão livre). Depois Desloque-se até metade do Deslocamento sem disparar reações das que você Empurrar com sucesso. Cada tentativa conta na penalidade, que só sobe depois de todas.',
    actionType: 'two',
    sourcePage: 207,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=6369',
  }),
  f({
    id: 'feat-mauler-shoving-sweep',
    name: 'Varredura Empurradora',
    originalName: 'Shoving Sweep',
    level: 8,
    archetypeId: 'archetype-mauler',
    prereqId: DED_MAUL.id,
    prereqName: DED_MAUL.name,
    extraPrereq: [
      { kind: 'skillRank', skillId: 'athletics', rank: 'expert' },
      { kind: 'text', label: 'Perito em Atletismo' },
      { kind: 'text', label: 'Empunhando uma arma corpo a corpo com as duas mãos' },
    ],
    description:
      'Tente Empurrar a criatura disparadora, ignorando mão livre. Salvo sucesso crítico, ela continua o movimento depois do Empurrar.',
    actionType: 'reaction',
    trigger: 'Um inimigo no seu alcance deixa um quadrado durante uma ação de movimento.',
    sourcePage: 207,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=6370',
  }),
  f({
    id: 'feat-mauler-crashing-slam',
    name: 'Pancada Estilhaçante',
    originalName: 'Crashing Slam',
    level: 12,
    archetypeId: 'archetype-mauler',
    prereqId: 'feat-mauler-slam-down',
    prereqName: 'Derrubar com Pancada',
    description:
      'Ao usar Derrubar com Pancada, em vez de Golpe + Derrubar, faça um único Golpe. Se acertar, obtém sucesso crítico automático no Derrubar (ambos ainda contam na penalidade). Com arma de duas mãos, use o tamanho do dado da arma no dano do Derrubar crítico.',
    sourcePage: 207,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=256',
  }),
  f({
    id: 'feat-mauler-brutal-finish',
    name: 'Remate Brutal',
    originalName: 'Brutal Finish',
    level: 14,
    archetypeId: 'archetype-mauler',
    traits: ['Arquétipo', 'Pressão'],
    prereqId: DED_MAUL.id,
    prereqName: DED_MAUL.name,
    extraPrereq: [{ kind: 'text', label: 'Empunhando uma arma corpo a corpo com as duas mãos' }],
    description:
      'Golpe com arma de duas mãos; depois o turno acaba. +1 dado de dano da arma (+2 no 18º). Falha: dano igual a um dado da arma (dois no 18º).',
    actionType: 'one',
    sourceId: SOURCE_PLAYER_CORE_ID,
    sourcePage: 148,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=4832',
  }),
  f({
    id: 'feat-mauler-hammer-quake',
    name: 'Martelo Sísmico',
    originalName: 'Hammer Quake',
    level: 14,
    archetypeId: 'archetype-mauler',
    prereqId: DED_MAUL.id,
    prereqName: DED_MAUL.name,
    description:
      'Escolha um quadrado no alcance (pode ser o seu). Se houver inimigo lá, pode Golpear com a arma de duas mãos. Depois tente Derrubar cada inimigo naquele quadrado e nos adjacentes, ignorando mão livre. Conta como três ataques; a penalidade só sobe depois do Golpe (se houver) e de todos os Derrubar.',
    actionType: 'three',
    sourcePage: 207,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=256',
  }),
  f({
    id: 'feat-mauler-unbalancing-sweep',
    name: 'Varredura Desequilibrante',
    originalName: 'Unbalancing Sweep',
    level: 14,
    archetypeId: 'archetype-mauler',
    prereqId: DED_MAUL.id,
    prereqName: DED_MAUL.name,
    description:
      'Escolha até três inimigos no alcance e se vai Empurrar ou Derrubar os três. Teste de Atletismo separado contra cada um, sempre a mesma manobra. Cada tentativa conta na penalidade, que só sobe depois de todas.',
    actionType: 'three',
    sourcePage: 207,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=256',
  }),
  f({
    id: 'feat-mauler-avalanche-strike',
    name: 'Golpe Avalanche',
    originalName: 'Avalanche Strike',
    level: 16,
    archetypeId: 'archetype-mauler',
    traits: ['Arquétipo', 'Ímpeto'],
    prereqId: DED_MAUL.id,
    prereqName: DED_MAUL.name,
    extraPrereq: [{ kind: 'text', label: 'Empunhando uma arma corpo a corpo com as duas mãos' }],
    description:
      'Um Golpe corpo a corpo com a arma de duas mãos contra cada inimigo no alcance corpo a corpo. Cada um conta na penalidade, que só sobe depois de todos.',
    actionType: 'three',
    sourcePage: 207,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=6372',
  }),
]

const pirateArchetypeFeats: Feat[] = [
  f({
    id: DED_PIR.id,
    name: DED_PIR.name,
    originalName: 'Pirate Dedication',
    level: 2,
    archetypeId: 'archetype-pirate',
    isDedication: true,
    description:
      'Ganha Conhecimento Adicional em Conhecimento Náutico ou no Conhecimento de uma cidade costeira com a qual você tem ligação (ex.: Porto Perigo). Ignora terreno difícil ou irregular causado por chão instável (convés). Ganha Assalto de Abordagem (duas ações, ímpeto): Desloque-se duas vezes ou teste de Acrobacia (CD típica 20) para balançar até o dobro do Deslocamento numa corda, então Golpeie. Se embarcou ou desembarcou de um barco nesse movimento, o Golpe ganha um dado extra de dano da arma. Nomeie o Conhecimento; o motor não escolhe.',
    effects: [
      {
        kind: 'loreChoice',
        choiceId: 'sailing-or-port',
        rank: 'trained',
        increaseAtLevels: [3, 7, 15],
        hint: 'Náutico, ou o Conhecimento de uma cidade costeira (ex.: Porto Perigo). O motor não escolhe.',
      },
      {
        kind: 'specialAbility',
        name: 'Assalto de Abordagem',
        actionType: 'two',
        description:
          'Ímpeto. Desloque-se duas vezes ou Acrobacia para balançar até o dobro do Deslocamento, então Golpeie. Embarcar/desembarcar: +1 dado de dano da arma. Ignora terreno difícil de chão instável.',
      },
    ],
    extraPrereq: [
      { kind: 'skillRank', skillId: 'intimidation', rank: 'trained' },
      { kind: 'text', label: 'Treinado em Intimidação' },
    ],
    sourcePage: 209,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=258',
  }),
  f({
    id: 'feat-pirate-antagonize',
    name: 'Antagonizar',
    originalName: 'Antagonize',
    level: 4,
    archetypeId: 'archetype-pirate',
    prereqId: DED_PIR.id,
    prereqName: DED_PIR.name,
    description:
      'Quando Desmoraliza com sucesso, a condição amedrontado do alvo não pode cair abaixo de 1 no fim do turno dele até ele usar uma ação hostil contra você ou deixar de observá-lo/senti-lo por pelo menos 1 rodada.',
    sourceId: SOURCE_PLAYER_CORE_2_ID,
    sourcePage: 165,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=6136',
  }),
  f({
    id: 'feat-pirate-bitter-taste-of-betrayal',
    name: 'Gosto Amargo da Traição',
    originalName: 'Bitter Taste of Betrayal',
    level: 4,
    archetypeId: 'archetype-pirate',
    prereqId: DED_PIR.id,
    prereqName: DED_PIR.name,
    description:
      'Salvo se for alvo voluntário, +2 de circunstância na CA e salvaguardas contra criaturas que você considera aliadas e contra criaturas indetectadas por você. Se um “aliado” se revelar inimigo, o mesmo bônus vale contra ele até o fim do seu próximo turno.',
    effects: [
      {
        kind: 'circumstanceBonus',
        value: 2,
        appliesTo: 'CA e salvaguardas contra aliados (não voluntário) e indetectados',
      },
    ],
    sourceId: SOURCE_HIGH_SEAS_ID,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=258',
  }),
  f({
    id: 'feat-pirate-inner-sea-privateer',
    name: 'Corsário do Mar Interior',
    originalName: 'Inner Sea Privateer',
    level: 4,
    archetypeId: 'archetype-pirate',
    prereqId: DED_PIR.id,
    prereqName: DED_PIR.name,
    description:
      'Pode usar Conhecimento Náutico para Recordar Conhecimento sobre criaturas nativas do Alto-Mar e sobre bandeiras, navios e marinheiros da região. Se um navio usa bandeira falsa, o MJ rola Conhecimento Náutico secreto (CD típica do nível do capitão).',
    sourceId: SOURCE_HIGH_SEAS_ID,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=258',
  }),
  f({
    id: 'feat-pirate-into-the-storm',
    name: 'Enfrentar a Tempestade',
    originalName: 'Into the Storm',
    level: 4,
    archetypeId: 'archetype-pirate',
    prereqId: DED_PIR.id,
    prereqName: DED_PIR.name,
    description:
      'Reduz em 2 penalidades de circunstância a ataques à distância por vento ou precipitação. Pode usar armas em que é mestre com −4 de circunstância (−2 se lendário) mesmo quando vento/precipitação impediriam (ex.: muralha de vento).',
    sourceId: SOURCE_HIGH_SEAS_ID,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=258',
  }),
  f({
    id: 'feat-pirate-combat-training',
    name: 'Treino de Combate Pirata',
    originalName: 'Pirate Combat Training',
    level: 4,
    archetypeId: 'archetype-pirate',
    prereqId: DED_PIR.id,
    prereqName: DED_PIR.name,
    description:
      'Ganha Escalador de Combate ou Saqueador Submerso, mesmo sem os pré-requisitos (você escolhe). Familiaridade com machadinha, florete, cimitarra e chicote: tratam-se como simples. No 5º, crítico com essas armas aplica especialização crítica. O MJ pode incluir outras marciais da região.',
    effects: [
      {
        kind: 'textChoice',
        choiceId: 'pirate-skill-feat',
        options: [
          { id: 'combat-climber', label: 'Escalador de Combate' },
          { id: 'underwater-marauder', label: 'Saqueador Submerso' },
        ],
        hint: 'Escolha um feito de perícia. O motor não escolhe.',
        abilityName: '{choice}',
        abilityDescription:
          'Você ganha este feito de perícia mesmo sem cumprir os pré-requisitos.',
      },
      {
        kind: 'weaponFamiliarity',
        weapons: ['Hatchet', 'Rapier', 'Scimitar', 'Whip'],
        martialAsSimple: true,
        advancedAsMartial: false,
        critSpecAtLevel: 5,
      },
    ],
    sourcePage: 209,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=258',
  }),
  f({
    id: 'feat-pirate-pirates-pet',
    name: 'Mascote do Pirata',
    originalName: "Pirate's Pet",
    level: 4,
    archetypeId: 'archetype-pirate',
    prereqId: DED_PIR.id,
    prereqName: DED_PIR.name,
    description:
      'Ganha o feito Mascote. O mascote ganha uma habilidade extra (padrão ou: acompanhante, evitar dano, independente, parceiro no crime, fala, valet). Aprende uma magia comum de 1º ou 2º posto que tenha o familiar como alvo, 1/dia como inata primal — ou Familiar de Fase 1/hora (não é magia de foco). Ao conjurar, o alvo é o mascote, não um familiar. Você escolhe a magia e a habilidade extra; adicione o mascote em Companheiros.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Mascote pirata',
        description:
          'Feito Mascote + 1 habilidade extra (incluindo opções de Shackles). Magia inata primal 1/dia (1º–2º que alvo familiar) ou Familiar de Fase 1/hora. Você escolhe magia e habilidade.',
      },
    ],
    sourceId: SOURCE_HIGH_SEAS_ID,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=258',
  }),
  f({
    id: 'feat-pirate-rope-runner',
    name: 'Corredor de Cordas',
    originalName: 'Rope Runner',
    level: 4,
    archetypeId: 'archetype-pirate',
    prereqId: DED_PIR.id,
    prereqName: DED_PIR.name,
    description:
      'Deslocamento de escalada de 4,5 m, só em cordas e similares. Sucesso em Atletismo para Escalar ou Acrobacia para Equilibrar-se vira sucesso crítico. Não fica desprevenido ao Escalar ou Equilibrar-se numa corda.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Escalar cordas',
        description:
          'Deslocamento de escalada 4,5 m só em cordas. Sucesso em Escalar/Equilibrar vira crítico. Sem desprevenido nessas cordas.',
      },
    ],
    sourcePage: 209,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=258',
  }),
  f({
    id: 'feat-pirate-sharkskin-grip',
    name: 'Pegada de Pele de Tubarão',
    originalName: 'Sharkskin Grip',
    level: 4,
    archetypeId: 'archetype-pirate',
    prereqId: DED_PIR.id,
    prereqName: DED_PIR.name,
    description:
      'Enquanto vestir a roupa: +1 de item em ataques desarmados, Acrobacia e salvaguardas/CDs de Reflexos para Escapar, Agarrar a Borda ou evitar cair. Ao Agarrar com sucesso, causa dano cortante igual aos dados do seu punho.',
    effects: [
      {
        kind: 'circumstanceBonus',
        value: 1,
        appliesTo:
          'Ataques desarmados, Acrobacia e Reflexos para Escapar / Agarrar a Borda / não cair (bônus de item da roupa)',
      },
    ],
    sourceId: SOURCE_HIGH_SEAS_ID,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=258',
  }),
  f({
    id: 'feat-pirate-youre-next',
    name: 'Você é o Próximo',
    originalName: "You're Next",
    level: 4,
    archetypeId: 'archetype-pirate',
    traits: ['Arquétipo', 'Emoção', 'Medo', 'Mental', 'Visual'],
    prereqId: DED_PIR.id,
    prereqName: DED_PIR.name,
    extraPrereq: [
      { kind: 'skillRank', skillId: 'intimidation', rank: 'trained' },
      { kind: 'text', label: 'Treinado em Intimidação' },
    ],
    description:
      'Tente Desmoralizar uma criatura a até 18 m, com +2 de circunstância. Se for lendário em Intimidação, pode usar como ação livre com o mesmo gatilho.',
    actionType: 'reaction',
    trigger: 'Você reduz um inimigo a 0 PV.',
    sourceId: SOURCE_PLAYER_CORE_ID,
    sourcePage: 157,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=6135',
  }),
  f({
    id: 'feat-pirate-walk-the-plank',
    name: 'Andar na Prancha',
    originalName: 'Walk the Plank',
    level: 8,
    archetypeId: 'archetype-pirate',
    prereqId: DED_PIR.id,
    prereqName: DED_PIR.name,
    description:
      'Tente Desmoralizar. Sucesso: além do normal, force o alvo a Deslocar-se até o Deslocamento dele; você escolhe o caminho, mas não para espaço obviamente nocivo salvo sucesso crítico. Não dispara reações. Imune 10 minutos.',
    actionType: 'two',
    sourcePage: 209,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=258',
  }),
]

export const archetypeFeatsGeneralRemaster4: Feat[] = [
  ...herbalistArchetypeFeats,
  ...linguistArchetypeFeats,
  ...martialArtistArchetypeFeats,
  ...maulerArchetypeFeats,
  ...pirateArchetypeFeats,
]
