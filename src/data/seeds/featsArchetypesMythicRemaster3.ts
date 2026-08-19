/** Destinos míticos Remaster (War of Immortals): Corrente Quebrada, Lenda Eterna, Godling. Sem Legacy. */
import type { Feat, FeatSpellcastingAccess } from '@/types/feat'
import { SOURCE_WAR_OF_IMMORTALS_ID } from './sources'

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
  repeatable?: boolean
  rarity?: Feat['rarity']
  ignoresDedicationLock?: boolean
  classId?: string | null
}): Feat {
  return {
    id: opts.id,
    name: opts.name,
    originalName: opts.originalName,
    level: opts.level,
    category: 'archetype',
    archetypeId: opts.archetypeId,
    isDedication: opts.isDedication,
    classId: opts.classId ?? null,
    traits:
      opts.traits ??
      (opts.isDedication
        ? ['Arquétipo', 'Dedicação', 'Mítico']
        : ['Arquétipo', 'Mítico']),
    rarity: opts.rarity ?? 'uncommon',
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
    repeatable: opts.repeatable,
    ignoresDedicationLock: opts.ignoresDedicationLock,
    sourceId: opts.sourceId ?? SOURCE_WAR_OF_IMMORTALS_ID,
    sourcePage: opts.sourcePage,
    aonUrl: opts.aonUrl,
  }
}

const DED_CHAIN = {
  id: 'feat-broken-chain-dedication',
  name: 'Dedicação de Corrente Quebrada',
}

const DED_LEGEND = {
  id: 'feat-eternal-legend-dedication',
  name: 'Dedicação de Lenda Eterna',
}

const IMMOVABLE = {
  id: 'feat-eternal-legend-immovable-object',
  name: 'Objeto Imóvel',
}

const DED_GODLING = {
  id: 'feat-godling-dedication',
  name: 'Dedicação de Godling',
}

const FONT_LIFE_DEATH = {
  id: 'feat-godling-font-of-life-or-death',
  name: 'Fonte de Vida ou Morte',
}

const GODLING_SPELL: FeatSpellcastingAccess = {
  id: 'spellcasting-godling-domain',
  label: 'Magias de domínio de Godling',
  style: 'focusOnly',
  tradition: 'divine',
  attributeId: 'wisdom',
  attributeChoiceId: 'godling-spell-attribute',
  attributeOptions: ['wisdom', 'charisma'],
  attributeChoiceHint: 'Sabedoria ou Carisma. O motor não escolhe.',
  proficiencyRank: 'expert',
  classOriginalName: 'Godling',
  features: { focusPool: true },
}

const brokenChainArchetypeFeats: Feat[] = [
  f({
    id: DED_CHAIN.id,
    name: DED_CHAIN.name,
    originalName: 'Broken Chain Dedication',
    level: 12,
    archetypeId: 'archetype-broken-chain',
    isDedication: true,
    rarity: 'uncommon',
    extraPrereq: [{ kind: 'text', label: 'Chamado mítico (mythic calling)' }],
    description:
      'O Chamado nasceu da revolta contra tiranos. Ao Escapar ou Forçar Abertura, pode gastar 1 Ponto Mítico para fazê-lo com proficiência mítica. Ganha Ultimato de Libertação (1 ação; auditivo, linguístico, mental, mítico; 1/dia): proclama ultimato contra uma criatura que você acredita oprimir outras e contra quem segue as ordens dela. Você escolhe o alvo; o motor não escolhe. Quem ouve (incluindo você) ou souber depois fica encorajado por 1 dia: +2 de status em Vontade contra efeitos da criatura opressora e aliados dela (+3 a até 9 m de você). Na primeira vez a cada dia que essa criatura ou um aliado dela chegar a 9 m de você, Vontade contra a maior entre CD de classe e CD de magia ou fica assustado 1 (assustado 2 na falha crítica); esse segundo efeito tem emoção, medo e mental. A criatura opressora pode encerrar tudo como ação livre ao concordar de verdade em cessar a opressão em definitivo. Sem duração; só um ultimato ativo; um segundo encerra o primeiro. Anátema: não usar o Ultimato em quem você não acredita oprimir ou que já cedeu o poder. Quebrar a anátema: perde as habilidades deste arquétipo até expiação. O mestre decide o que é opressão.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Proficiência mítica (Escapar / Forçar Abertura)',
        description:
          'Gaste 1 Ponto Mítico ao Escapar ou Forçar Abertura para fazê-lo com proficiência mítica.',
      },
      {
        kind: 'specialAbility',
        name: 'Ultimato de Libertação',
        actionType: 'one',
        description:
          '1/dia. Você escolhe a criatura opressora. Encoraja ouvintes por 1 dia (+2 Vontade / +3 a 9 m). Primeira aproximação a 9 m no dia: Vontade ou assustado 1 (2 no crítico). A opressora pode encerrar ao ceder o poder. Um ultimato por vez.',
      },
      {
        kind: 'specialAbility',
        name: 'Anátema da Corrente Quebrada',
        description:
          'Não use o Ultimato em quem você não acredita oprimir ou que já cedeu o poder. Quebrar: perde o arquétipo até expiação.',
      },
    ],
    sourcePage: 122,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7357',
  }),
  f({
    id: 'feat-broken-chain-bloc-tactics',
    name: 'Táticas de Bloco',
    originalName: 'Bloc Tactics',
    level: 14,
    archetypeId: 'archetype-broken-chain',
    rarity: 'uncommon',
    prereqId: DED_CHAIN.id,
    prereqName: DED_CHAIN.name,
    description:
      'No preparo diário, escolha um número de alvos igual à metade do seu nível (você escolhe quem; o motor não escolhe). Disfarces escondem a identidade: +4 de status em Enganação para impedir que vejam através do disfarce, e somam o nível mesmo destreinados. Também protegem contra fumaça, vapores e substâncias inaladas: +3 de status nas salvaguardas contra esses efeitos. Vestir ou tirar o disfarce é atividade de 2 ações.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Disfarces de ação direta',
        description:
          'No preparo, você nomeia até metade do nível em alvos. +4 status em Enganação para o disfarce (soma o nível mesmo destreinado); +3 status contra fumaça/vapores/inalados. Vestir/tirar: 2 ações. O motor não escolhe os alvos.',
      },
    ],
    sourcePage: 123,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7358',
  }),
  f({
    id: 'feat-broken-chain-break-the-cycle',
    name: 'Quebrar o Ciclo',
    originalName: 'Break the Cycle',
    level: 14,
    archetypeId: 'archetype-broken-chain',
    rarity: 'uncommon',
    prereqId: DED_CHAIN.id,
    prereqName: DED_CHAIN.name,
    description:
      'Ganha o feito de perícia Negociação Lendária (Legendary Negotiation), mesmo sem cumprir os pré-requisitos. Além disso, ao testar Diplomacia, pode gastar 1 Ponto Mítico para fazê-lo com proficiência mítica.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Negociação Lendária',
        description:
          'Ganha Legendary Negotiation mesmo sem se qualificar. Diplomacia: 1 Ponto Mítico para proficiência mítica.',
      },
    ],
    sourcePage: 123,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7359',
  }),
  f({
    id: 'feat-broken-chain-release-me',
    name: 'Liberte-me!',
    originalName: 'Release Me!',
    level: 14,
    archetypeId: 'archetype-broken-chain',
    rarity: 'uncommon',
    prereqId: DED_CHAIN.id,
    prereqName: DED_CHAIN.name,
    extraPrereq: [
      { kind: 'text', label: 'Agarrado ou imobilizado (restrained) pela criatura alvo' },
    ],
    description:
      'Golpe corpo a corpo contra quem o agarrou ou imobilizou. Pode atacar mesmo imobilizado (restrained), salvo se empunhar arma de duas mãos. A menos que o Golpe seja falha crítica, tente Escapar. Se a criatura for alvo do Ultimato de Libertação, +2 de circunstância nesse teste. Golpe e Escapar contam na penalidade de ataques múltiplos, que só sobe depois dos dois testes.',
    actionType: 'one',
    sourcePage: 123,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7360',
  }),
  f({
    id: 'feat-broken-chain-rites-of-liberation',
    name: 'Ritos de Libertação',
    originalName: 'Rites of Liberation',
    level: 14,
    archetypeId: 'archetype-broken-chain',
    rarity: 'uncommon',
    prereqId: DED_CHAIN.id,
    prereqName: DED_CHAIN.name,
    description:
      'Aprende o ritual liberdade (freedom). Se gastar 1 Ponto Mítico extra ao conjurá-lo, o tempo cai para 1 hora e conjuradores primário e secundários testam as perícias com proficiência mítica. Falha crítica no ritual vira falha. Ganha as magias de domínio passo desimpedido (unimpeded stride) e palavra de liberdade (word of freedom) como magias de foco: reserva de 2 pontos de foco (ou expande a reserva se já tiver). Refoco: 10 minutos meditando em liberdade.',
    effects: [
      { kind: 'focusPool', points: 2 },
      {
        kind: 'specialAbility',
        name: 'Ritual liberdade e magias de domínio',
        description:
          'Ritual freedom (1 Ponto Mítico extra: 1 hora, testes míticos; falha crítica vira falha). Foco: unimpeded stride e word of freedom. Refoco meditando em liberdade.',
      },
    ],
    sourcePage: 123,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7361',
  }),
  f({
    id: 'feat-broken-chain-united-front',
    name: 'Frente Unida',
    originalName: 'United Front',
    level: 14,
    archetypeId: 'archetype-broken-chain',
    rarity: 'uncommon',
    prereqId: DED_CHAIN.id,
    prereqName: DED_CHAIN.name,
    description:
      'Se gastar 1 Ponto Mítico ao usar Ultimato de Libertação, faça quatro perguntas ligadas àquela criatura, como se tivesse sucesso em quatro testes de Recordar Conhecimento. As informações chegam em 1 a 2 horas, de apoiadores locais. Depois de recebê-las, na primeira iniciativa de um encontro com o alvo do ultimato ou aliados dele, você e todos os aliados rolam iniciativa com proficiência mítica. Você formula as perguntas; o motor não escolhe.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Apoiadores e iniciativa mítica',
        description:
          '1 Ponto Mítico no Ultimato: 4 perguntas (como 4 RK bem-sucedidos) em 1–2 h. Depois, primeira iniciativa contra o alvo/aliados: você e aliados com proficiência mítica. O motor não escolhe as perguntas.',
      },
    ],
    sourcePage: 123,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7362',
  }),
  f({
    id: 'feat-broken-chain-you-cant-keep-us-down',
    name: 'Não Nos Derrubam',
    originalName: "You Can't Keep Us Down",
    level: 14,
    archetypeId: 'archetype-broken-chain',
    traits: ['Arquétipo', 'Mítico', 'Cura'],
    rarity: 'uncommon',
    prereqId: DED_CHAIN.id,
    prereqName: DED_CHAIN.name,
    description:
      'Aliados a até 18 m que estejam morrendo, ou inconscientes e feridos, recuperam PV iguais a três vezes o seu nível. Em seguida, aliados a até 18 m que estejam caídos podem Levantar-se como ação livre que não dispara reações.',
    actionType: 'three',
    sourcePage: 123,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7363',
  }),
  f({
    id: 'feat-broken-chain-bring-into-the-fold',
    name: 'Trazer para o Rebanho',
    originalName: 'Bring into the Fold',
    level: 16,
    archetypeId: 'archetype-broken-chain',
    rarity: 'uncommon',
    prereqId: DED_CHAIN.id,
    prereqName: DED_CHAIN.name,
    extraPrereq: [
      { kind: 'text', label: 'A próxima ação é Ultimato de Libertação' },
    ],
    description:
      'Se a próxima ação for Ultimato de Libertação, até 10 alvos que o ouçam fazem Vontade contra a maior entre CD de classe e CD de magia. Você escolhe os alvos; o motor não escolhe. Sucesso: nada. Falha: atitude em relação a você sobe 1 passo. Falha crítica: sobe 2 passos. Para a mudança durar além da interação social, fale com os afetados por pelo menos 10 minutos sobre a causa.',
    actionType: 'two',
    sourcePage: 124,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7364',
  }),
  f({
    id: 'feat-broken-chain-cry-of-rebellion',
    name: 'Grito de Rebelião',
    originalName: 'Cry of Rebellion',
    level: 16,
    archetypeId: 'archetype-broken-chain',
    traits: ['Arquétipo', 'Mítico', 'Auditivo', 'Sônico'],
    rarity: 'uncommon',
    prereqId: DED_CHAIN.id,
    prereqName: DED_CHAIN.name,
    description:
      'Aliados a até 18 m que o ouçam ganham +2 de status em ataques, Percepção, salvaguardas e perícias por 1 minuto. Inimigos a até 9 m sofrem 16d4 sônico (Fortitude básica contra a maior entre CD de classe e CD de magia). O dano sônico aumenta 1d4 no 17º nível e a cada nível seguinte.',
    actionType: 'three',
    sourcePage: 124,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7365',
  }),
  f({
    id: 'feat-broken-chain-lose-your-chains',
    name: 'Perca as Correntes',
    originalName: 'Lose Your Chains',
    level: 16,
    archetypeId: 'archetype-broken-chain',
    traits: ['Arquétipo', 'Mítico', 'Auditivo', 'Linguístico'],
    rarity: 'uncommon',
    prereqId: DED_CHAIN.id,
    prereqName: DED_CHAIN.name,
    description:
      'O aliado disparador pode tentar Escapar com proficiência mítica.',
    actionType: 'reaction',
    trigger: 'Um aliado ganha a condição agarrado ou imobilizado (restrained).',
    sourcePage: 124,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7366',
  }),
  f({
    id: 'feat-broken-chain-remember-thy-names',
    name: 'Lembra Teus Nomes',
    originalName: 'Remember thy Names',
    level: 16,
    archetypeId: 'archetype-broken-chain',
    traits: ['Arquétipo', 'Mítico', 'Mental', 'Maldição'],
    rarity: 'uncommon',
    prereqId: DED_CHAIN.id,
    prereqName: DED_CHAIN.name,
    extraPrereq: [
      { kind: 'text', label: 'Alvo do Ultimato de Libertação' },
    ],
    description:
      'Olhe nos olhos do alvo do Ultimato e diga os nomes das vítimas. 12d6 mental (Vontade básica contra a maior entre CD de classe e CD de magia). Falha ou falha crítica: também 2d6 mental persistente. Por 1 hora, quando o persistente parar, você ou um aliado pode citar o nome de uma vítima (1 ação) para forçar nova Vontade ou o persistente recomeça. Maldição. Depois, o alvo fica imune por 24 horas. Você escolhe o alvo; o motor não escolhe.',
    actionType: 'two',
    sourcePage: 124,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7367',
  }),
  f({
    id: 'feat-broken-chain-stand-firm',
    name: 'Permaneça Firme',
    originalName: 'Stand Firm',
    level: 16,
    archetypeId: 'archetype-broken-chain',
    traits: ['Arquétipo', 'Mítico', 'Auditivo'],
    rarity: 'uncommon',
    prereqId: DED_CHAIN.id,
    prereqName: DED_CHAIN.name,
    description:
      'Grite a um aliado a até 9 m que esteja fugindo ou assustado e possa ouvi-lo. Reduz assustado em 2 (mínimo 0). Se estiver fugindo, tenta nova salvaguarda contra o efeito. Se essa salvaguarda for falha (não crítica), gasta 1 ação a menos no turno para fugir da fonte — pode Golpear ou Conjurar magia de 1 ação que não o afaste, mas continua fugindo e não pode Adiar nem Preparar. Se um efeito já reduz as ações do turno, não ganha esse benefício na falha. Depois, aquele aliado fica imune até o início do seu próximo turno. Você escolhe o aliado; o motor não escolhe.',
    actionType: 'one',
    sourcePage: 124,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7368',
  }),
  f({
    id: 'feat-broken-chain-liberty-or-death',
    name: 'Liberdade ou Morte',
    originalName: 'Liberty or Death',
    level: 18,
    archetypeId: 'archetype-broken-chain',
    traits: ['Arquétipo', 'Mítico', 'Morte', 'Incapacitação'],
    rarity: 'uncommon',
    prereqId: DED_CHAIN.id,
    prereqName: DED_CHAIN.name,
    extraPrereq: [
      {
        kind: 'text',
        label: 'Uma criatura é alvo do Ultimato de Libertação há pelo menos 1 minuto',
      },
    ],
    description:
      'Gaste 1 Ponto Mítico e Golpeie com proficiência mítica a criatura requerida. Se acertar e causar dano, Fortitude contra a maior entre CD de classe e CD de magia ou morre. Se passar, fica imune a esta habilidade por 24 horas.',
    actionType: 'two',
    sourcePage: 125,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7369',
  }),
  f({
    id: 'feat-broken-chain-rebellious-existence',
    name: 'Existência Rebelde',
    originalName: 'Rebellious Existence',
    level: 18,
    archetypeId: 'archetype-broken-chain',
    rarity: 'uncommon',
    prereqId: DED_CHAIN.id,
    prereqName: DED_CHAIN.name,
    description:
      'Ignora efeitos mentais sem o traço medo que lhe roubariam a agência (ex.: falha em encantar ainda permite ações hostis; contra crise de riso ainda pode reagir, mas continua lentificado). Falha crítica em medo ainda causa fuga. Imune a efeitos que aprisionam a alma (como prender alma ou lâmina final).',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Existência rebelde',
        description:
          'Ignora efeitos mentais sem medo que roubem agência. Imune a aprisionar a alma (seize soul, lâmina final).',
      },
    ],
    sourcePage: 125,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7370',
  }),
  f({
    id: 'feat-broken-chain-reprisal-of-the-fallen',
    name: 'Represália dos Caídos',
    originalName: 'Reprisal of the Fallen',
    level: 18,
    archetypeId: 'archetype-broken-chain',
    rarity: 'uncommon',
    prereqId: DED_CHAIN.id,
    prereqName: DED_CHAIN.name,
    description:
      '1/dia, conjure invocar espíritos (invoke spirits) ou lamentos dos condenados (wails of the damned) de 9º posto como magia inata oculta. Use a maior entre CD de classe e CD de magia. Você escolhe qual magia a cada uso; o motor não escolhe.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Inata oculta 1/dia (9º posto)',
        description:
          'Invoke spirits ou wails of the damned. CD = a maior entre classe e magia. Você escolhe a magia; o motor não escolhe.',
      },
    ],
    sourcePage: 125,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7371',
  }),
  f({
    id: 'feat-broken-chain-break-the-causal-chain',
    name: 'Quebrar a Cadeia Causal',
    originalName: 'Break the Causal Chain',
    level: 20,
    archetypeId: 'archetype-broken-chain',
    rarity: 'uncommon',
    prereqId: DED_CHAIN.id,
    prereqName: DED_CHAIN.name,
    description:
      'Algo terrível aconteceu. Gaste 1 Ponto Mítico para alterar a realidade como se tivesse sucesso (não crítico) no ritual desejo (wish). Deve desfazer por completo os efeitos de uma ação ou conjunto de ações da última semana que levaram ao desfecho indesejado. Isso trará consequências graves. Alterar a causalidade atrai éons, norns fey e deuses de mudança, destino, liberdade, tempo ou tirania. Você descreve o que desfaz; o motor não escolhe.',
    actionType: 'three',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Quebrar a cadeia causal',
        actionType: 'three',
        description:
          '1 Ponto Mítico: sucesso no ritual wish, só para desfazer ações da última semana. Você nomeia o que desfaz; o motor não escolhe. Consequências narrativas graves.',
      },
    ],
    sourcePage: 125,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7372',
  }),
  f({
    id: 'feat-broken-chain-you-cant-kill-an-idea',
    name: 'Não Se Mata uma Ideia',
    originalName: "You Can't Kill an Idea",
    level: 20,
    archetypeId: 'archetype-broken-chain',
    rarity: 'uncommon',
    prereqId: DED_CHAIN.id,
    prereqName: DED_CHAIN.name,
    description:
      'Se você morreria com Ultimato de Libertação ativo, vira forma-ideia (com equipamento): invisível, incorpóreo, 1 PV e não pode ganhar mais, imune a todo dano; morrendo/condenado não sobe até matá-lo; imune a morte instantânea e a inconsciente, mas só ações puramente mentais. Telepatia ilimitada com aliados; +2 reações no início de cada turno. Pode Ajudar só com conselho telepático, sem preparar; 1 Ponto Mítico para Ajudar com proficiência mítica. Bônus de circunstância de Ajudar +1. Em até 1 hora, escolha um seguidor disposto da causa para fundir-se e deixar de ser forma-ideia: use o seu nível, ancestralidade/herança/feitos de ancestralidade do seguidor, e combine com o mestre classe, atributos, perícias e feitos da fusão. O novo personagem fica com o equipamento anterior. Você nomeia o seguidor; o motor não escolhe. Sem fusão em 1 hora: deixa de ser forma-ideia e morre; o equipamento da morte original deixa de existir.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Forma-ideia',
        description:
          'Ao morrer com ultimato ativo: forma-ideia (invisível, incorpóreo, 1 PV, imune a dano/morte instantânea). Você nomeia o seguidor da fusão em 1 hora; o motor não escolhe.',
      },
    ],
    sourcePage: 125,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7373',
  }),
]

const eternalLegendArchetypeFeats: Feat[] = [
  f({
    id: DED_LEGEND.id,
    name: DED_LEGEND.name,
    originalName: 'Eternal Legend Dedication',
    level: 12,
    archetypeId: 'archetype-eternal-legend',
    isDedication: true,
    rarity: 'uncommon',
    extraPrereq: [{ kind: 'text', label: 'Chamado mítico (mythic calling)' }],
    description:
      'Quase nada o derruba. No preparo diário, escolha desajeitado, drenado ou enfraquecido. Pelo resto do dia, sucesso contra efeito que imporia essa condição vira sucesso crítico; ao ganhá-la, reduza o valor em 1. Pode trocar a condição escolhida com 1 ação (concentrar). Você escolhe a condição; o motor não escolhe.',
    effects: [
      {
        kind: 'textChoice',
        choiceId: 'eternal-legend-condition',
        options: [
          { id: 'clumsy', label: 'Desajeitado (clumsy)' },
          { id: 'drained', label: 'Drenado (drained)' },
          { id: 'enfeebled', label: 'Enfraquecido (enfeebled)' },
        ],
        hint: 'No preparo (ou 1 ação concentrar). Sucesso vira crítico contra essa condição; ao ganhá-la, valor −1. O motor não escolhe.',
        abilityName: 'Condição lendária: {choice}',
        abilityDescription:
          'Sucesso contra essa condição vira crítico. Ao ganhá-la, reduza o valor em 1. Troca com 1 ação (concentrar).',
      },
    ],
    sourcePage: 126,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7374',
  }),
  f({
    id: 'feat-eternal-legend-demolishing-knockback',
    name: 'Empurrão Demolidor',
    originalName: 'Demolishing Knockback',
    level: 14,
    archetypeId: 'archetype-eternal-legend',
    rarity: 'uncommon',
    prereqId: DED_LEGEND.id,
    prereqName: DED_LEGEND.name,
    description:
      'Gaste 1 Ponto Mítico e Golpeie com proficiência mítica. Se acertar e causar dano, empurre o alvo até 4,5 m. Se colidir com objeto de dureza 5 ou menos, o objeto quebra e o alvo atravessa o espaço, sofrendo +2d6 concussão (o mestre pode mudar o tipo: ex. cortante através de vidro). Se não colidir, Reflexos contra CD de classe ou fica caído no fim do movimento.',
    actionType: 'one',
    sourcePage: 127,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7375',
  }),
  f({
    id: 'feat-eternal-legend-earth-to-heavens-strike',
    name: 'Golpe da Terra aos Céus',
    originalName: 'Earth to Heavens Strike',
    level: 14,
    archetypeId: 'archetype-eternal-legend',
    rarity: 'uncommon',
    prereqId: DED_LEGEND.id,
    prereqName: DED_LEGEND.name,
    description:
      'Golpeie; se acertar e causar dano, o alvo fica desajeitado 1 até o fim do seu próximo turno. Depois, outro Golpe no mesmo alvo; se acertar e causar dano, fica estupefato 1 até o fim do seu próximo turno. Se os dois acertarem e causarem dano, as duas condições duram 1 minuto. Cada Golpe conta na penalidade de ataques múltiplos, que só sobe depois dos dois.',
    actionType: 'two',
    sourcePage: 127,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7376',
  }),
  f({
    id: 'feat-eternal-legend-faultless-defense',
    name: 'Defesa Impecável',
    originalName: 'Faultless Defense',
    level: 14,
    archetypeId: 'archetype-eternal-legend',
    rarity: 'uncommon',
    prereqId: DED_LEGEND.id,
    prereqName: DED_LEGEND.name,
    description:
      'Gaste 1 Ponto Mítico: resistência igual à metade do nível contra o dano disparador, depois Golpeie com proficiência mítica a criatura que atacou. Se o Golpe acertar e causar dano, ela também fica lentificada 1.',
    actionType: 'reaction',
    trigger: 'Você sofreria dano de um Golpe de uma criatura.',
    sourcePage: 127,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7377',
  }),
  f({
    id: IMMOVABLE.id,
    name: IMMOVABLE.name,
    originalName: 'Immovable Object',
    level: 14,
    archetypeId: 'archetype-eternal-legend',
    traits: ['Arquétipo', 'Mítico', 'Postura'],
    rarity: 'uncommon',
    prereqId: DED_LEGEND.id,
    prereqName: DED_LEGEND.name,
    description:
      'Plante os pés. Nesta postura e no chão, imune a movimento forçado; se um efeito o derrubaria, você não cai e pode Dar um Passo como ação livre.',
    actionType: 'one',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Postura objeto imóvel',
        actionType: 'one',
        description:
          'No chão: imune a movimento forçado. Se seria derrubado, não cai e pode Dar um Passo (ação livre).',
      },
    ],
    sourcePage: 127,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7378',
  }),
  f({
    id: 'feat-eternal-legend-scattering-shout',
    name: 'Grito Dispersor',
    originalName: 'Scattering Shout',
    level: 14,
    archetypeId: 'archetype-eternal-legend',
    traits: ['Arquétipo', 'Mítico', 'Auditivo', 'Sônico'],
    rarity: 'uncommon',
    prereqId: DED_LEGEND.id,
    prereqName: DED_LEGEND.name,
    description:
      'Cada inimigo numa emanação de 3 m faz Fortitude contra CD de classe. Sucesso crítico: nada. Sucesso: empurrado 1,5 m para longe. Falha: empurrado 3 m e 8d6 sônico. Falha crítica: empurrado 4,5 m e 16d6 sônico.',
    actionType: 'three',
    sourcePage: 127,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7379',
  }),
  f({
    id: 'feat-eternal-legend-death-from-above',
    name: 'Morte do Alto',
    originalName: 'Death from Above',
    level: 16,
    archetypeId: 'archetype-eternal-legend',
    rarity: 'uncommon',
    prereqId: DED_LEGEND.id,
    prereqName: DED_LEGEND.name,
    extraPrereq: [
      {
        kind: 'text',
        label: 'Adjacente a uma superfície escalável de pelo menos 3 m de altura',
      },
    ],
    description:
      'Desloque-se até metade do Deslocamento para cima na superfície requerida (ou o Deslocamento de escalada inteiro, se tiver). A superfície não precisa cobrir toda a altura. Depois, Golpe à distância no primeiro incremento e aterrise no espaço inicial (ou adjacente) sem dano de queda, ou aterrise adjacente a uma criatura a até 3 m da superfície sem dano de queda e Golpeie corpo a corpo. Qualquer um dos Golpes causa +2 dados de dano da arma. O alvo que sofrer dano faz Fortitude contra CD de classe ou fica atordoado 1. Você escolhe o alvo e o modo; o motor não escolhe.',
    actionType: 'two',
    sourcePage: 128,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7380',
  }),
  f({
    id: 'feat-eternal-legend-leaping-hedgehog-strike',
    name: 'Golpe do Ouriço Saltitante',
    originalName: 'Leaping Hedgehog Strike',
    level: 16,
    archetypeId: 'archetype-eternal-legend',
    rarity: 'uncommon',
    prereqId: DED_LEGEND.id,
    prereqName: DED_LEGEND.name,
    description:
      'Salte na horizontal em direção a um inimigo que você vê; trate o Deslocamento como 9 m ou mais neste Salto se for menor. Se terminar adjacente, teste Acrobacia para Atravessar o espaço dele. Sucesso: o alvo também cai. Depois Golpeie o mesmo inimigo. Se ele estiver caído, pode gastar 1 Ponto Mítico neste Golpe para fazê-lo com proficiência mítica. Você escolhe o inimigo; o motor não escolhe.',
    actionType: 'two',
    sourcePage: 128,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7381',
  }),
  f({
    id: 'feat-eternal-legend-pierce-the-eye',
    name: 'Perfure o Olho',
    originalName: 'Pierce The Eye',
    level: 16,
    archetypeId: 'archetype-eternal-legend',
    rarity: 'uncommon',
    prereqId: DED_LEGEND.id,
    prereqName: DED_LEGEND.name,
    extraPrereq: [{ kind: 'text', label: 'Empunhando uma arma de ataque à distância' }],
    description:
      'Golpe à distância. Se acertar, o alvo também sofre 2d8 sangramento persistente e faz Fortitude contra CD de classe. Sucesso crítico: nada. Sucesso: cego até o fim do próximo turno dele. Falha: cego enquanto durar o persistente e por +1 rodada. Falha crítica: como falha, e −2 de circunstância no teste plano para remover o persistente; quem Prestar Primeiros Socorros para estancar sofre −2 de circunstância em Medicina.',
    actionType: 'two',
    sourcePage: 128,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7382',
  }),
  f({
    id: 'feat-eternal-legend-terrifying-mien',
    name: 'Aparência Aterradora',
    originalName: 'Terrifying Mien',
    level: 16,
    archetypeId: 'archetype-eternal-legend',
    rarity: 'uncommon',
    prereqId: DED_LEGEND.id,
    prereqName: DED_LEGEND.name,
    description:
      'Resistência a concussão, perfurante e cortante contra Golpes de criaturas assustadas, igual a quatro vezes o valor de assustado. Se essa resistência se aplicar a pelo menos um Golpe da criatura no turno dela, ela não reduz assustado no fim do turno.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Aparência aterradora',
        description:
          'Resistência concussão/perfurante/cortante vs Golpes de assustados = 4 × valor de assustado. Se aplicar no turno da criatura, ela não reduz assustado no fim do turno.',
      },
    ],
    sourcePage: 128,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7383',
  }),
  f({
    id: 'feat-eternal-legend-weft-and-warp',
    name: 'Trama e Urdidura',
    originalName: 'Weft and Warp',
    level: 16,
    archetypeId: 'archetype-eternal-legend',
    rarity: 'uncommon',
    prereqId: DED_LEGEND.id,
    prereqName: DED_LEGEND.name,
    description:
      'Desloque-se até metade do Deslocamento até um inimigo; se terminar adjacente, Golpeie corpo a corpo. Se acertar, Reposicione o alvo para o seu espaço ao mesmo tempo que Dá um Passo para o espaço dele. Depois outro Golpe no mesmo alvo, que está desprevenido. Por fim, pode Dar um Passo para longe. Você escolhe o inimigo; o motor não escolhe.',
    actionType: 'three',
    sourcePage: 128,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7384',
  }),
  f({
    id: 'feat-eternal-legend-exaltation-overwhelming',
    name: 'Exaltação Avassaladora',
    originalName: 'Exaltation Overwhelming',
    level: 18,
    archetypeId: 'archetype-eternal-legend',
    rarity: 'uncommon',
    prereqId: DED_LEGEND.id,
    prereqName: DED_LEGEND.name,
    description:
      'Gaste 1 Ponto Mítico. Inimigos que possam vê-lo fazem Vontade contra CD de classe ou ficam assustados 3 (assustados 4 na falha crítica). Você e qualquer aliado que possa vê-lo podem Golpear ou Deslocar-se como ação livre. Esses Golpes são com proficiência mítica. Cada um escolhe Golpear ou Deslocar-se; o motor não escolhe.',
    actionType: 'three',
    sourcePage: 129,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7385',
  }),
  f({
    id: 'feat-eternal-legend-legend-of-combat',
    name: 'Lenda do Combate',
    originalName: 'Legend of Combat',
    level: 18,
    archetypeId: 'archetype-eternal-legend',
    rarity: 'uncommon',
    prereqId: DED_LEGEND.id,
    prereqName: DED_LEGEND.name,
    description:
      'Gaste 1 Ponto Mítico. Por 1 minuto, +1 reação no início de cada turno. Ganha Velocidade dos Braços [reação] (mítico): disparador — seu turno começa; efeito — Golpeie um oponente no alcance, ou Desloque-se direto até um oponente. Se for o primeiro Golpe nesse oponente neste encontro, é com proficiência mítica. Você escolhe o oponente; o motor não escolhe.',
    actionType: 'one',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Velocidade dos Braços',
        actionType: 'reaction',
        description:
          '1 Ponto Mítico: 1 minuto, +1 reação por turno. Disparador: seu turno começa. Golpe no alcance ou Deslocar até o oponente; primeiro Golpe nele no encontro é mítico.',
      },
    ],
    sourcePage: 129,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7386',
  }),
  f({
    id: 'feat-eternal-legend-mythic-weapon-specialization',
    name: 'Especialização Mítica em Armas',
    originalName: 'Mythic Weapon Specialization',
    level: 18,
    archetypeId: 'archetype-eternal-legend',
    rarity: 'uncommon',
    prereqId: DED_LEGEND.id,
    prereqName: DED_LEGEND.name,
    description:
      'Quando Golpeia com proficiência mítica, o dano adicional da especialização em armas sobe para 12.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Especialização mítica em armas',
        description:
          'Golpe com proficiência mítica: dano extra de especialização em armas = 12.',
      },
    ],
    sourcePage: 129,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7387',
  }),
  f({
    id: 'feat-eternal-legend-unstoppable-force',
    name: 'Força Imparável',
    originalName: 'Unstoppable Force',
    level: 18,
    archetypeId: 'archetype-eternal-legend',
    rarity: 'uncommon',
    prereqId: DED_LEGEND.id,
    prereqName: DED_LEGEND.name,
    extraPrereq: [{ kind: 'feat', featId: IMMOVABLE.id, featName: IMMOVABLE.name }],
    description:
      'Na postura de Objeto Imóvel, ignore terreno difícil e terreno difícil maior. 1 vez a cada 10 minutos, se Dispensar a postura, pode Deslocar-se como ação livre. No fim desse Deslocamento, o passo final explode: cada criatura numa emanação de 6 m sofre 14d6 força (Reflexos básicos contra CD de classe). Quem falhar também cai.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Força imparável',
        description:
          'Na postura Objeto Imóvel: ignore terreno difícil/maior. 1/10 min ao Dispensar: Deslocar (ação livre) e explosão 6 m, 14d6 força (Reflexos básicos); falha também cai.',
      },
    ],
    sourcePage: 129,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7388',
  }),
  f({
    id: 'feat-eternal-legend-fight-through-oblivion',
    name: 'Lutar Através do Oblívio',
    originalName: 'Fight Through Oblivion',
    level: 20,
    archetypeId: 'archetype-eternal-legend',
    rarity: 'uncommon',
    prereqId: DED_LEGEND.id,
    prereqName: DED_LEGEND.name,
    description:
      'Ao cair a 0 PV, não fica inconsciente nem ganha morrendo. Até o início do próximo turno, imune a todo dano, mas não recupera PV senão assim: se Golpear e causar dano a um inimigo neste turno, recupera 4d8+30 PV. Senão, ferido sobe 1 e você continua imune a dano e cura. O ciclo segue até recuperar PV causando dano ou até ferido 4: então perde ferido, cai inconsciente e ganha morrendo.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Lutar através do oblívio',
        description:
          'A 0 PV: não inconsciente/morrendo; imune a dano até o próximo turno (sem cura, salvo Golpe que cause dano: 4d8+30 PV). Senão ferido +1. Em ferido 4: inconsciente e morrendo.',
      },
    ],
    sourcePage: 129,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7389',
  }),
  f({
    id: 'feat-eternal-legend-finish-their-story',
    name: 'Encerre a História Deles!',
    originalName: 'Finish Their Story!',
    level: 20,
    archetypeId: 'archetype-eternal-legend',
    rarity: 'uncommon',
    prereqId: DED_LEGEND.id,
    prereqName: DED_LEGEND.name,
    description:
      'Gaste 1 Ponto Mítico e Golpeie com proficiência mítica. Este Golpe conta como dois ataques na penalidade de ataques múltiplos. 16º nível ou menos: se acertar, o alvo morre na hora. 17º: se acertar, dano normal +3 dados. 18º ou mais: se acertar, dano normal +2 dados. Depois, o alvo fica temporariamente imune por 1 hora. Você escolhe o inimigo; o motor não escolhe.',
    actionType: 'two',
    sourcePage: 129,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7390',
  }),
  f({
    id: 'feat-eternal-legend-living-epic',
    name: 'Épico Vivo',
    originalName: 'Living Epic',
    level: 20,
    archetypeId: 'archetype-eternal-legend',
    rarity: 'uncommon',
    prereqId: DED_LEGEND.id,
    prereqName: DED_LEGEND.name,
    description:
      'Quando você morreria, desaparece. Reaparece em qualquer lugar onde o seu nome for dito na semana seguinte, no contexto de contar um feito seu (incluindo a morte). Se quem falar for aliado próximo (ex.: outro PC), volta com 1 PV. Se for um estranho, volta com PV cheios e +1 de status em ataques, Percepção, salvaguardas e perícias por 1 semana. Se ninguém disser o nome em 1 semana, a alma entra no Rio das Almas e pode ser trazida por outros meios.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Épico vivo',
        description:
          'Ao morrer: desaparece e reaparece em 1 semana onde o nome for dito ao contar um feito. Aliado próximo: 1 PV. Estranho: PV cheios e +1 status (ataques, Percepção, salvaguardas, perícias) por 1 semana.',
      },
    ],
    sourcePage: 129,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7391',
  }),
]

const godlingArchetypeFeats: Feat[] = [
  f({
    id: DED_GODLING.id,
    name: DED_GODLING.name,
    originalName: 'Godling Dedication',
    level: 12,
    archetypeId: 'archetype-godling',
    isDedication: true,
    rarity: 'rare',
    extraPrereq: [{ kind: 'text', label: 'Chamado mítico (mythic calling)' }],
    description:
      'Começa o caminho à apoteose. Nomeie um aliado disposto como hierofante (o motor não escolhe). Se o hierofante não for treinado em ataque e CD de magia, fica treinado enquanto for o hierofante. Se morrer ou se afastar, designe outro após 24 horas de comunhão. Nomeie um domínio (o motor não escolhe) e aprenda a magia de domínio inicial. Reserva de 1 ponto de foco; Refoco: 10 minutos reabastecendo energia divina. Perito em modificador e CD de magia; atributo dessas magias: Sabedoria ou Carisma (você escolhe ao ganhar o feito; o motor não escolhe). O hierofante ganha Conjurar uma Magia e pode conjurar essa magia de domínio gastando o seu ponto de foco; usa a própria proficiência e o mesmo atributo que você escolheu. Se o hierofante tiver poder mítico, pode gastar 1 Ponto Mítico para conjurar qualquer magia divina ganha como hierofante com proficiência mítica.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Hierofante',
        description:
          'Você nomeia o aliado hierofante. Treinado em ataque/CD de magia enquanto for o hierofante. Troca com 24 h de comunhão. O motor não escolhe.',
      },
      {
        kind: 'specialAbility',
        name: 'Caminho à divindade / domínio',
        description:
          'Você nomeia o domínio reivindicado e a senda à divindade. Aprende a magia de domínio inicial. O motor não escolhe domínio nem senda.',
      },
      { kind: 'focusPool', points: 1 },
      { kind: 'spellcasting', access: GODLING_SPELL },
      {
        kind: 'specialAbility',
        name: 'Conjuração do hierofante',
        description:
          'O hierofante pode conjurar a magia de domínio gastando o seu ponto de foco, com a própria proficiência e o atributo que você escolheu.',
      },
    ],
    sourcePage: 130,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7392',
  }),
  f({
    id: 'feat-godling-claim-cardinal-domains',
    name: 'Reivindicar Domínios Cardeais',
    originalName: 'Claim Cardinal Domains',
    level: 14,
    archetypeId: 'archetype-godling',
    rarity: 'rare',
    prereqId: DED_GODLING.id,
    prereqName: DED_GODLING.name,
    description:
      'Reivindique até três domínios extras (máximo 4 no total). Você nomeia cada domínio; o motor não escolhe. A forma mortal não segura tudo: no preparo diário, escolha de qual domínio está puxando poder naquele dia (os outros dormem). Aprende a magia de domínio avançada de cada domínio reivindicado. Pode deixar um ou mais espaços vazios; enquanto houver domínio não reivindicado, gaste 1 Ponto Mítico (1 ação) para reivindicar um, mesmo em combate — vira o domínio ativo e não pode ser trocado depois. Também pode gastar 1 Ponto Mítico para acessar todos os reivindicados por 1 minuto (o hierofante também); depois escolha qual dos quatro permanece até o próximo preparo.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Domínios cardeais',
        description:
          'Você nomeia até 3 domínios extras (máx. 4). No preparo, um fica ativo. Magias avançadas dos reivindicados. Pode deixar vagas e reivindicar com 1 Ponto Mítico (1 ação). 1 Ponto Mítico: todos ativos por 1 minuto. O motor não escolhe os domínios.',
      },
    ],
    sourcePage: 131,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7393',
  }),
  f({
    id: 'feat-godling-divine-invulnerability',
    name: 'Invulnerabilidade Divina',
    originalName: 'Divine Invulnerability',
    level: 14,
    archetypeId: 'archetype-godling',
    rarity: 'rare',
    prereqId: DED_GODLING.id,
    prereqName: DED_GODLING.name,
    description:
      'Gaste 1 Ponto Mítico. Resistência a todo dano igual à metade do nível por 1 minuto. Se conjurar magia de domínio deste destino nesse período, a resistência sobe para igual ao nível até o início do seu próximo turno.',
    actionType: 'one',
    sourcePage: 131,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7394',
  }),
  f({
    id: 'feat-godling-heroic-weakness',
    name: 'Fraqueza Heroica',
    originalName: 'Heroic Weakness',
    level: 14,
    archetypeId: 'archetype-godling',
    rarity: 'rare',
    prereqId: DED_GODLING.id,
    prereqName: DED_GODLING.name,
    description:
      'Myth-Speaker AP. Combine com o mestre uma fraqueza heroica: um tipo de dano específico ligado a uma condição específica, ambos relevantes à história (ex.: espírito de seguidor de deus rival, dano físico de uma categoria de arma, vazio de um tipo de morto-vivo, fogo de uma região). Fraqueza igual ao dobro do nível. Ganha Isso Me Fortalece [reação]: disparador — sofre dano da fraqueza heroica e não cai a menos de 1 PV; efeito — suas magias ganham bônus de status no dano contra a criatura disparadora igual ao dobro do posto, até usar esta reação de novo; a criatura faz Vontade contra a maior entre CD de classe e CD de magia ou fica assustada 1 (assustada 2 na falha crítica). Você nomeia a fraqueza com o mestre; o motor não escolhe.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Fraqueza heroica',
        description:
          'Você nomeia tipo de dano + condição com o mestre. Fraqueza = 2 × nível. O motor não escolhe.',
      },
      {
        kind: 'specialAbility',
        name: 'Isso Me Fortalece',
        actionType: 'reaction',
        description:
          'Disparador: dano da fraqueza heroica e você fica com ≥ 1 PV. Magias: +status no dano vs disparador = 2 × posto até usar de novo. Vontade ou assustado 1 (2 no crítico).',
      },
    ],
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8014',
  }),
  f({
    id: 'feat-godling-myth-of-quick-thinking',
    name: 'Mito do Raciocínio Rápido',
    originalName: 'Myth of Quick-Thinking',
    level: 14,
    archetypeId: 'archetype-godling',
    rarity: 'rare',
    prereqId: DED_GODLING.id,
    prereqName: DED_GODLING.name,
    description:
      'Myth-Speaker AP. Mentir é atividade de 2 ações, por mais elaborada que seja a história. Ao testar Enganação, pode gastar 1 Ponto Mítico para fazê-lo com proficiência mítica. Se tiver sucesso em Enganação na presença do hierofante, fiéis que você vê passam automaticamente em Personificar ou Mentir de modo que apoie a história. Também reivindica um domínio à escolha: confiança, segredo ou truque. Você escolhe o domínio; o motor não escolhe.',
    effects: [
      {
        kind: 'textChoice',
        choiceId: 'godling-quick-thinking-domain',
        options: [
          { id: 'confidence', label: 'Confiança (confidence)' },
          { id: 'secrecy', label: 'Segredo (secrecy)' },
          { id: 'trickery', label: 'Truque (trickery)' },
        ],
        hint: 'Reivindique um destes domínios. O motor não escolhe.',
        abilityName: 'Domínio do mito: {choice}',
        abilityDescription: 'Domínio reivindicado pelo mito do raciocínio rápido.',
      },
      {
        kind: 'specialAbility',
        name: 'Parábolas astutas',
        description:
          'Mentir em 2 ações. Enganação: 1 Ponto Mítico para proficiência mítica. Sucesso na presença do hierofante: fiéis visíveis passam automaticamente em Personificar/Mentir que apoie a história.',
      },
    ],
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8015',
  }),
  f({
    id: 'feat-godling-myth-of-realm-walking',
    name: 'Mito do Caminhar entre Reinos',
    originalName: 'Myth of Realm-Walking',
    level: 14,
    archetypeId: 'archetype-godling',
    rarity: 'rare',
    prereqId: DED_GODLING.id,
    prereqName: DED_GODLING.name,
    description:
      'Myth-Speaker AP. Efeito que tentaria ancorá-lo a um plano (ex.: amarra planar) ou baní-lo (ex.: banimento) ganha o traço incapacitação. Se já tiver, +4 de status na salvaguarda. Se passar, a criatura que usou o efeito faz Vontade contra a maior entre CD de classe e CD de magia ou fica estupefata 1 por 1 minuto (estupefata 2 na falha crítica). Também reivindica um domínio à escolha: sonhos, destino ou viagem. Você escolhe o domínio; o motor não escolhe.',
    effects: [
      {
        kind: 'textChoice',
        choiceId: 'godling-realm-walking-domain',
        options: [
          { id: 'dreams', label: 'Sonhos (dreams)' },
          { id: 'fate', label: 'Destino (fate)' },
          { id: 'travel', label: 'Viagem (travel)' },
        ],
        hint: 'Reivindique um destes domínios. O motor não escolhe.',
        abilityName: 'Domínio do mito: {choice}',
        abilityDescription: 'Domínio reivindicado pelo mito do caminhar entre reinos.',
      },
      {
        kind: 'specialAbility',
        name: 'Viajante de planos',
        description:
          'Ancorar/banir ganha incapacitação (ou +4 status se já tiver). Sucesso: o autor faz Vontade ou estupefato 1 (2 no crítico) por 1 minuto.',
      },
    ],
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8016',
  }),
  f({
    id: 'feat-godling-receive-prayers',
    name: 'Receber Preces',
    originalName: 'Receive Prayers',
    level: 14,
    archetypeId: 'archetype-godling',
    traits: ['Arquétipo', 'Mítico', 'Concentrar', 'Mental'],
    rarity: 'rare',
    prereqId: DED_GODLING.id,
    prereqName: DED_GODLING.name,
    description:
      '+1 de status em Sentir Motivação só para discernir esperanças, preces, desejos e anseios fortes. Status (status) constante divino no hierofante: duração ilimitada, qualquer alcance (inclusive entre planos); contrapor só suprime até o próximo preparo; acaba se deixar de ser hierofante. 1/dia, fôlego de vida (breath of life) como inata divina de 5º posto, só no hierofante, alcance ilimitado (o status costuma avisá-lo quando o hierofante morreria).',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Preces e status constante',
        description:
          '+1 status em Sentir Motivação (esperanças/preces/desejos). Status divino constante no hierofante (qualquer alcance/planos). Breath of life 5º 1/dia só no hierofante, alcance ilimitado.',
      },
    ],
    sourcePage: 131,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7395',
  }),
  f({
    id: 'feat-godling-absolve-sins',
    name: 'Absolver Pecados',
    originalName: 'Absolve Sins',
    level: 16,
    archetypeId: 'archetype-godling',
    traits: ['Arquétipo', 'Mítico', 'Mental'],
    rarity: 'rare',
    prereqId: DED_GODLING.id,
    prereqName: DED_GODLING.name,
    description:
      'Gaste 1 Ponto Mítico. Cada inimigo numa emanação de 9 m sofre 14d6 mental (Vontade básica contra a maior entre CD de classe e CD de magia). Quem causou dano a você ou ao hierofante desde o fim do seu turno anterior usa um grau de sucesso pior.',
    actionType: 'two',
    sourcePage: 132,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7396',
  }),
  f({
    id: FONT_LIFE_DEATH.id,
    name: FONT_LIFE_DEATH.name,
    originalName: 'Font of Life or Death',
    level: 16,
    archetypeId: 'archetype-godling',
    rarity: 'rare',
    prereqId: DED_GODLING.id,
    prereqName: DED_GODLING.name,
    description:
      'Escolha curar (heal) ou ferir (harm); ganha a magia escolhida como inata de 8º posto, 3 vezes por dia. O hierofante também pode conjurá-las gastando um dos seus usos diários. Você escolhe heal ou harm; o motor não escolhe.',
    effects: [
      {
        kind: 'textChoice',
        choiceId: 'godling-font-heal-harm',
        options: [
          { id: 'heal', label: 'Curar (heal)' },
          { id: 'harm', label: 'Ferir (harm)' },
        ],
        hint: 'Inata de 8º posto, 3/dia. O hierofante pode gastar os seus usos. O motor não escolhe.',
        abilityName: 'Fonte: {choice}',
        abilityDescription:
          'Inata de 8º posto 3/dia. O hierofante pode conjurar gastando um uso seu.',
      },
    ],
    sourcePage: 132,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7397',
  }),
  f({
    id: 'feat-godling-gird-champion',
    name: 'Armar o Campeão',
    originalName: 'Gird Champion',
    level: 16,
    archetypeId: 'archetype-godling',
    rarity: 'rare',
    prereqId: DED_GODLING.id,
    prereqName: DED_GODLING.name,
    description:
      'Ao ganhar este feito, nomeie um tipo de arma de significado especial (ex.: espada longa ou foice); essa é a arma favorecida. Você e o hierofante a tratam como arma simples para proficiência, ganham a especialização crítica dela e causam +1d6 espírito nos Golpes com ela. Se uma magia de domínio atual puder causar outro tipo que não espírito, você pode igualar esse tipo (ex.: fogo com domínio do fogo). Você nomeia a arma e, se couber, o tipo de dano; o motor não escolhe.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Arma favorecida',
        description:
          'Você nomeia o tipo de arma. Você e o hierofante: como simples para proficiência, especialização crítica, +1d6 espírito (ou o tipo da magia de domínio, se escolher). O motor não escolhe a arma nem o tipo.',
      },
    ],
    sourcePage: 132,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7398',
  }),
  f({
    id: 'feat-godling-pass-vengeful-judgement',
    name: 'Proferir Juízo Vingativo',
    originalName: 'Pass Vengeful Judgement',
    level: 18,
    archetypeId: 'archetype-godling',
    traits: ['Arquétipo', 'Mítico', 'Santificado'],
    rarity: 'rare',
    prereqId: DED_GODLING.id,
    prereqName: DED_GODLING.name,
    extraPrereq: [
      { kind: 'text', label: 'O hierofante invocou seu juízo no turno anterior' },
    ],
    description:
      'Se o hierofante acertar um Golpe, pode gastar 1 ação para invocar sua ira. No seu turno, Proferir Juízo Vingativo no alvo: pilar de energia divina, 20d10 espírito (Fortitude básica), sem linha de efeito, qualquer alcance. Se uma magia de domínio atual causar outro tipo que não espírito, você pode igualar (ex.: fogo). Se gastar 1 Ponto Mítico, a explosão se vê a 16 km; por 1 mês, você e o hierofante ganham +2 de status em Intimidação contra criaturas da área. Especial: com Fonte de Vida ou Morte, pode usar vitalidade (se escolheu heal) ou vazio (se escolheu harm). Você escolhe o tipo de dano quando couber; o motor não escolhe.',
    actionType: 'one',
    frequency: '1/dia',
    sourcePage: 132,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7399',
  }),
  f({
    id: 'feat-godling-sanctified-relic',
    name: 'Relíquia Santificada',
    originalName: 'Sanctified Relic',
    level: 18,
    archetypeId: 'archetype-godling',
    rarity: 'rare',
    prereqId: DED_GODLING.id,
    prereqName: DED_GODLING.name,
    description:
      'Ao pegar o feito, escolha dois atributos (um deve ser o atributo-chave) e santificação sagrada ou profana; se já tiver o traço sagrado ou profano por classe ou outra habilidade, deve escolher o mesmo. No preparo, toque um item mágico vestido sem o traço ápice: ele ganha ápice até o próximo preparo e aumenta um dos atributos divinos (escolhido no preparo) em 1 ou até +4, o que for maior. Também concede ao usuário o traço sagrado ou profano escolhido. Só um ápice por personagem. Você não pode vestir este ápice; o hierofante pode. Se gastar 1 Ponto Mítico ao criar, aumenta os dois atributos divinos em 1 ou até +4 (exceção ao limite de ápice). Você escolhe atributos, santificação, item e atributo do dia; o motor não escolhe.',
    effects: [
      {
        kind: 'textChoice',
        choiceId: 'godling-relic-sanctification',
        options: [
          { id: 'holy', label: 'Sagrado' },
          { id: 'unholy', label: 'Profano' },
        ],
        hint: 'Se já tiver sagrado/profano, use o mesmo. O motor não escolhe.',
        abilityName: 'Santificação da relíquia: {choice}',
        abilityDescription: 'O ápice concede este traço ao usuário. Você não veste o item; o hierofante pode.',
      },
      {
        kind: 'specialAbility',
        name: 'Atributos divinos e ápice',
        description:
          'Você nomeia dois atributos (um é o chave). No preparo, um item vestido sem ápice vira ápice até o próximo preparo: +1 ou até +4 num atributo divino. 1 Ponto Mítico: os dois atributos. O motor não escolhe atributos nem o item.',
      },
    ],
    sourcePage: 133,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7400',
  }),
  f({
    id: 'feat-godling-stymie-the-gods',
    name: 'Obstruir os Deuses',
    originalName: 'Stymie the Gods',
    level: 18,
    archetypeId: 'archetype-godling',
    rarity: 'rare',
    prereqId: DED_GODLING.id,
    prereqName: DED_GODLING.name,
    description:
      'Você ou o hierofante usa esta ação. Ambos ganham +2 de status na CA e nas salvaguardas contra magias divinas e contra magias, Golpes e habilidades de criaturas extraplanares, por 3 rodadas — mesmo em planos separados. Se quem usar gastar 1 Ponto Mítico, o bônus sobe para +4 e dura 10 minutos.',
    actionType: 'two',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Obstruir os deuses',
        actionType: 'two',
        description:
          'Você ou o hierofante: +2 status CA/salvaguardas vs magias divinas e vs magias/Golpes/habilidades extraplanares, 3 rodadas (qualquer plano). 1 Ponto Mítico: +4 por 10 minutos.',
      },
    ],
    sourcePage: 133,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7401',
  }),
  f({
    id: 'feat-godling-assume-godhood',
    name: 'Assumir a Divindade',
    originalName: 'Assume Godhood',
    level: 20,
    archetypeId: 'archetype-godling',
    rarity: 'rare',
    prereqId: DED_GODLING.id,
    prereqName: DED_GODLING.name,
    description:
      'Apoteose: pode servir de divindade a classes com traço de divindade (ex.: clérigo). Fornece qualquer aspecto de bloco de divindade que você já tenha por feitos de Godling (domínios, arma favorecida etc.). Escolha uma perícia lendária como perícia divina, e os atributos divinos incluem o chave e outro à sua escolha. Escolha três magias de qualquer lista exceto divina: uma de 1º, uma de 2º ou 3º, e uma de qualquer posto — viram magias extras de clérigo para fiéis. Magia de Intercessão [reação] (divino, concentrar, forma de magia) 1/dia: disparador — o hierofante Conjura uma Magia; efeito — não gasta o espaço, uso ou ponto de foco. Se morrer depois de Assumir a Divindade, só o corpo mortal perece; você segue como deidade, concede magias e percebe/afeta fiéis (Receber Preces, Intercessão) sem alcance. Para agir no Universo, encarne num corpo a até 1,6 km de um fiel ou sítio sagrado, com as mesmas estatísticas de antes da morte; a aparência é a que você quiser, em geral com um traço da iconografia. Pode encarnar à vontade; interferências repetidas atraem deuses mais antigos. Você nomeia perícia divina, segundo atributo, as três magias, fiéis e a forma encarnada; o motor não escolhe.',
    effects: [
      {
        kind: 'skillSelect',
        choiceId: 'godling-divine-skill',
        minRank: 'legendary',
        hint: 'Uma perícia lendária como perícia divina. O motor não escolhe.',
        abilityName: 'Perícia divina: {skill}',
        abilityDescription: 'Perícia divina da fé nascente.',
      },
      {
        kind: 'specialAbility',
        name: 'Atributo divino extra, magias de clérigo e intercessão',
        description:
          'Você nomeia o segundo atributo divino e três magias não divinas (1º; 2º ou 3º; qualquer posto) para fiéis. Intercessão 1/dia: o hierofante não gasta espaço/uso/foco. O motor não escolhe.',
      },
      {
        kind: 'specialAbility',
        name: 'Magia de Intercessão',
        actionType: 'reaction',
        description:
          '1/dia. Disparador: o hierofante Conjura uma Magia. Não gasta espaço, uso nem ponto de foco.',
      },
    ],
    sourcePage: 133,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7402',
  }),
]

export const archetypeFeatsMythicRemaster3: Feat[] = [
  ...brokenChainArchetypeFeats,
  ...eternalLegendArchetypeFeats,
  ...godlingArchetypeFeats,
]



