/** Destinos míticos Remaster (War of Immortals): Celestial Ascendido, Senhor das Feras. Sem Legacy. */
import type { Feat } from '@/types/feat'
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
      (opts.isDedication ? ['Arquétipo', 'Dedicação', 'Mítico'] : ['Arquétipo', 'Mítico']),
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

const DED_CELESTIAL = {
  id: 'feat-ascended-celestial-dedication',
  name: 'Dedicação de Celestial Ascendido',
}
const CELESTIAL_ARMAMENTS = {
  id: 'feat-ascended-celestial-celestial-armaments',
  name: 'Armamentos Celestiais',
}
const CHANNEL_SPARK = {
  id: 'feat-ascended-celestial-channel-divine-spark',
  name: 'Canalizar Faísca Divina',
}
const DED_BEAST = {
  id: 'feat-beast-lord-dedication',
  name: 'Dedicação de Senhor das Feras',
}
const DEFEND_UNION = {
  id: 'feat-beast-lord-defend-our-union',
  name: 'Defender Nossa União',
}

const ARCH_CELESTIAL = 'archetype-ascended-celestial'
const ARCH_BEAST = 'archetype-beast-lord'

const ascendedCelestialArchetypeFeats: Feat[] = [
  f({
    id: DED_CELESTIAL.id,
    name: DED_CELESTIAL.name,
    originalName: 'Ascended Celestial Dedication',
    level: 12,
    archetypeId: ARCH_CELESTIAL,
    isDedication: true,
    extraPrereq: [{ kind: 'text', label: 'Chamado mítico (mythic calling)' }],
    description:
      '1/hora, role duas vezes e use o maior resultado em uma salvaguarda de Vontade (fortuna). Se ficar confuso, em vez de atacar à toa fica teimosamente imóvel e gasta todas as ações até a condição acabar. Nimbo: luz plena em 9 m (penumbra nos 9 m seguintes). Pode suprimir ou restabelecer a luz (1 ação, concentração) — você escolhe quando; o motor não escolhe. Enquanto o nimbo estiver ativo, aliados na área ganham +1 de status em salvaguardas contra medo. Ganha Abençoar Aliado.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Resoluto (Vontade)',
        description:
          '1/hora: role duas vezes e use o maior resultado em uma salvaguarda de Vontade (fortuna).',
      },
      {
        kind: 'specialAbility',
        name: 'Imóvel se confuso',
        description:
          'Se ficar confuso, em vez de atacar fica imóvel e gasta todas as ações até a condição acabar.',
      },
      {
        kind: 'specialAbility',
        name: 'Nimbo celestial',
        description:
          'Luz plena 9 m (penumbra +9 m). Aliados na área: +1 de status contra medo. Você pode suprimir ou restabelecer a luz (1 ação, concentração); o motor não escolhe.',
        actionType: 'one',
      },
      {
        kind: 'specialAbility',
        name: 'Abençoar Aliado',
        actionType: 'one',
        description:
          'Concentração, divino, fortuna, mítico. 1/10 minutos. Requisito: nimbo ativo. Alvo: aliado disposto na luz plena do nimbo (você escolhe; o motor não escolhe). O aliado rola duas vezes e usa o maior resultado na próxima salvaguarda de Vontade até o início do seu próximo turno.',
      },
    ],
    sourcePage: 114,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7331',
  }),
  f({
    id: 'feat-ascended-celestial-aegis-for-the-innocent',
    name: 'Égide pelos Inocentes',
    originalName: 'Aegis for the Innocent',
    level: 14,
    archetypeId: ARCH_CELESTIAL,
    traits: ['Arquétipo', 'Mítico', 'Divino', 'Manipular'],
    prereqId: DED_CELESTIAL.id,
    prereqName: DED_CELESTIAL.name,
    actionType: 'one',
    description:
      'Escolha uma criatura disposta na luz plena do nimbo (você escolhe; o motor não escolhe). Barreira de luz: emanação de 3 m centrada no alvo, 1 minuto ou até Dispensar. Enquanto ativa, a área do nimbo é reduzida à metade. O alvo ganha +1 de status na CA. Inimigo na barreira ou ao entrar faz Fortitude contra sua CD de classe ou de magia (só 1 vez por rodada). Crítico: nada. Sucesso: ofuscado 1 rodada e o espaço da barreira é terreno difícil. Falha: ofuscado 1 minuto, empurrado 3 m, terreno difícil; se bater em obstáculo ou criatura, para e sofre 2d6 concussão. Falha crítica: como falha, e cego 1 rodada.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Égide pelos inocentes',
        actionType: 'one',
        description:
          'Aliado disposto na luz plena (você escolhe). Emanação 3 m, 1 minuto. Nimbo pela metade. +1 de status na CA do alvo. Fortitude (CD de classe ou magia) ao entrar: ofuscado, terreno difícil, empurrão 3 m / 2d6 concussão; crítico falho também cega 1 rodada.',
      },
    ],
    sourcePage: 115,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7332',
  }),
  f({
    id: 'feat-ascended-celestial-ascend',
    name: 'Ascender',
    originalName: 'Ascend',
    level: 14,
    archetypeId: ARCH_CELESTIAL,
    prereqId: DED_CELESTIAL.id,
    prereqName: DED_CELESTIAL.name,
    description:
      'Velocidade de voo igual à Velocidade terrestre. Ganha Ataque em Voo Rasante (2 ações: Voe e pode Golpear em qualquer ponto do percurso). Ao ganhar este feito, pode brotar asas permanentes se quiser — você escolhe; o motor não escolhe. 1/dia, 1 ação: a Velocidade de voo vira o dobro da Velocidade por 5 rodadas.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Voo celestial',
        description:
          'Velocidade de voo igual à Velocidade terrestre. 1/dia (1 ação): voo = dobro da Velocidade por 5 rodadas.',
      },
      {
        kind: 'specialAbility',
        name: 'Ataque em Voo Rasante',
        actionType: 'two',
        description: 'Voe e pode Golpear em qualquer ponto do percurso.',
      },
      {
        kind: 'textChoice',
        choiceId: 'ascended-celestial-wings',
        options: [
          { id: 'sprout-wings', label: 'Brotar asas permanentes' },
          { id: 'no-wings', label: 'Sem asas visíveis' },
        ],
        hint: 'Asas permanentes, se quiser. Você escolhe; o motor não escolhe.',
        abilityName: 'Asas: {choice}',
        abilityDescription:
          'Escolha cosmética permanente ao ganhar o feito. Não altera a Velocidade de voo.',
      },
    ],
    sourcePage: 115,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7333',
  }),
  f({
    id: CHANNEL_SPARK.id,
    name: CHANNEL_SPARK.name,
    originalName: 'Channel Divine Spark',
    level: 14,
    archetypeId: ARCH_CELESTIAL,
    traits: ['Arquétipo', 'Mítico', 'Concentrar'],
    prereqId: DED_CELESTIAL.id,
    prereqName: DED_CELESTIAL.name,
    actionType: 'one',
    description:
      'O nimbo ativa (se ainda não estiver) e a área dobra: luz plena 18 m (penumbra +18 m). Não pode suprimir o nimbo enquanto canaliza. PV temporários iguais ao nível; resistência a dano físico igual à metade do nível. Acelerado: a ação extra só para Golpear ou Andar. Cada vez que causar dano com Golpe corpo a corpo, pode Empurrar ou Derrubar o alvo como ação livre (você escolhe Empurrar ou Derrubar; o motor não escolhe). Dura 1 minuto.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Canalizar Faísca Divina',
        actionType: 'one',
        description:
          '1 minuto. Nimbo dobra (luz plena 18 m); não pode suprimir. PV temp. = nível; resistência física = metade do nível. Acelerado (Golpear ou Andar). Ao danificar com Golpe corpo a corpo: Empurrar ou Derrubar livre (você escolhe).',
      },
    ],
    sourcePage: 115,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7335',
  }),
  f({
    id: 'feat-ascended-celestial-consult-celestial-advisor',
    name: 'Consultar Conselheiro Celestial',
    originalName: 'Consult Celestial Advisor',
    level: 14,
    archetypeId: ARCH_CELESTIAL,
    traits: ['Arquétipo', 'Mítico', 'Concentrar', 'Exploração'],
    prereqId: DED_CELESTIAL.id,
    prereqName: DED_CELESTIAL.name,
    frequency: '1/dia',
    description:
      '1/dia, 30 minutos de meditação: conversa espiritual com o conselheiro celestial (você nomeia o conselheiro; o motor não escolhe). Três benefícios, em qualquer ordem (você escolhe os tópicos; o motor não escolhe): (1) Recobrar Conhecimento uma vez em qualquer assunto com proficiência mítica; gastar 1 Ponto Mítico: três assuntos. (2) Meta, atividade ou evento em até 1 semana: efeito de ler presságios. (3) Ação que pretende tomar em até 8 horas: efeito de augúrio, mas vê 8 horas no futuro e o MJ não rola teste simples em falha.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Conselheiro celestial',
        description:
          'Você nomeia o conselheiro. 1/dia, 30 min: Recobrar Conhecimento mítico (1 assunto, ou 3 se gastar 1 Ponto Mítico); ler presságios (meta em 1 semana); augúrio de 8 horas sem teste simples em falha. Você escolhe os tópicos; o motor não escolhe.',
      },
    ],
    sourcePage: 115,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7334',
  }),
  f({
    id: 'feat-ascended-celestial-a-thousand-cries-for-help',
    name: 'Mil Gritos por Ajuda',
    originalName: 'A Thousand Cries For Help',
    level: 16,
    archetypeId: ARCH_CELESTIAL,
    prereqId: DED_CELESTIAL.id,
    prereqName: DED_CELESTIAL.name,
    description:
      'Efeito constante de fala verdadeira. Ao testar Diplomacia para Causar Impressão ou Pedir, pode gastar 1 Ponto Mítico para fazer o teste com proficiência mítica.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Fala verdadeira constante',
        description:
          'Afeto constante de fala verdadeira. Diplomacia (Causar Impressão ou Pedir): gastar 1 Ponto Mítico para proficiência mítica.',
      },
    ],
    sourcePage: 116,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7337',
  }),
  f({
    id: 'feat-ascended-celestial-abjure-harm',
    name: 'Abjurar o Dano',
    originalName: 'Abjure Harm',
    level: 16,
    archetypeId: ARCH_CELESTIAL,
    prereqId: DED_CELESTIAL.id,
    prereqName: DED_CELESTIAL.name,
    actionType: 'reaction',
    trigger: 'Você sofreria dano de um Golpe crítico de um inimigo.',
    description:
      'Gaste 1 Ponto Mítico. O Golpe gatilho vira acerto normal em vez de crítico. Resistência a dano físico igual ao nível até o início do seu próximo turno. No seu próximo turno, Coagir contra a criatura gatilho usa proficiência mítica.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Abjurar o dano',
        actionType: 'reaction',
        description:
          'Gaste 1 Ponto Mítico. Crítico vira acerto. Resistência física = nível até o início do próximo turno. Coagir no próximo turno contra o gatilho: proficiência mítica.',
      },
    ],
    sourcePage: 116,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7336',
  }),
  f({
    id: CELESTIAL_ARMAMENTS.id,
    name: CELESTIAL_ARMAMENTS.name,
    originalName: 'Celestial Armaments',
    level: 16,
    archetypeId: ARCH_CELESTIAL,
    prereqId: DED_CELESTIAL.id,
    prereqName: DED_CELESTIAL.name,
    description:
      'Nas preparações diárias, escolha uma arma ou envoltórios de golpes poderosos (você escolhe; o motor não escolhe). A arma emite luz como tocha, causa +1d8 de espírito e concede especialização crítica. Crítico: o alvo faz Fortitude contra a maior entre CD de classe e CD de magia ou fica cego 1d4 rodadas. 1 ação (concentração): a arma teleporta para sua mão. Enquanto a empunha, 1 ação e 1 Ponto Mítico: cada aliado na luz plena do nimbo escolhe uma arma; por 1 minuto ela emite luz de tocha, causa +1d6 de espírito e concede especialização crítica. Os aliados escolhem as armas; o motor não escolhe.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Armamento celestial',
        description:
          'Nas preparações, você escolhe a arma ou os envoltórios. Luz de tocha, +1d8 espírito, especialização crítica. Crítico: Fortitude (maior CD) ou cego 1d4 rodadas. 1 ação (concentração): chama a arma. 1 ação + 1 Ponto Mítico: bênção de 1 minuto nas armas dos aliados na luz plena (+1d6 espírito).',
      },
    ],
    sourcePage: 116,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7338',
  }),
  f({
    id: 'feat-ascended-celestial-cleansing-spell',
    name: 'Magia Purificadora',
    originalName: 'Cleansing Spell',
    level: 16,
    archetypeId: ARCH_CELESTIAL,
    traits: ['Arquétipo', 'Mítico', 'Concentrar', 'Forma de Magia'],
    prereqId: DED_CELESTIAL.id,
    prereqName: DED_CELESTIAL.name,
    actionType: 'one',
    description:
      'Se a próxima ação for Conjurar uma Magia com traço cura em criatura viva, um alvo recupera PV iguais ao seu nível (além da cura normal) e você pode tentar contrapor doença ou veneno em um alvo da magia. Os dois alvos podem ser a mesma criatura ou criaturas diferentes, desde que ambos sejam alvos da magia de cura. Você escolhe os alvos; o motor não escolhe.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Magia purificadora',
        actionType: 'one',
        description:
          'Forma de magia. Próxima magia de cura em vivo: +PV iguais ao nível em um alvo; contrapor doença ou veneno em um alvo. Você escolhe os alvos.',
      },
    ],
    sourcePage: 116,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7339',
  }),
  f({
    id: 'feat-ascended-celestial-army-of-one',
    name: 'Exército de Um',
    originalName: 'Army of One',
    level: 18,
    archetypeId: ARCH_CELESTIAL,
    traits: ['Arquétipo', 'Mítico', 'Concentrar', 'Ímpeto'],
    prereqId: DED_CELESTIAL.id,
    prereqName: DED_CELESTIAL.name,
    extraPrereq: [
      { kind: 'feat', featId: CELESTIAL_ARMAMENTS.id, featName: CELESTIAL_ARMAMENTS.name },
    ],
    actionType: 'three',
    description:
      'Gaste 1 Ponto Mítico. Se não estiver empunhando o armamento celestial, ele teleporta para a mão. Lance-o: faça um Golpe com essa arma contra cada inimigo na luz plena do nimbo. Cada ataque conta na penalidade de ataques múltiplos, que só sobe depois de todos. A arma volta à mão.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Exército de um',
        actionType: 'three',
        description:
          'Gaste 1 Ponto Mítico. Armamento celestial ataca cada inimigo na luz plena do nimbo. PAM só sobe no fim. A arma volta à mão.',
      },
    ],
    sourcePage: 117,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7340',
  }),
  f({
    id: 'feat-ascended-celestial-eyes-unclouded',
    name: 'Olhos Desanuviados',
    originalName: 'Eyes Unclouded',
    level: 18,
    archetypeId: ARCH_CELESTIAL,
    prereqId: DED_CELESTIAL.id,
    prereqName: DED_CELESTIAL.name,
    description:
      'Efeito constante de visão verdadeira. +2 de circunstância em Percepção para Intuir Intenção e na CD de Percepção contra Mentira. Quem tenta Mentir para você rola Enganação duas vezes e usa o pior resultado (infortúnio).',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Visão verdadeira constante',
        description:
          'Afeto constante de visão verdadeira. Quem Mente para você rola duas vezes e usa o pior (infortúnio).',
      },
      {
        kind: 'circumstanceBonus',
        value: 2,
        appliesTo: 'Percepção para Intuir Intenção e CD de Percepção contra Mentira',
      },
    ],
    sourcePage: 117,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7341',
  }),
  f({
    id: 'feat-ascended-celestial-scouring-spark',
    name: 'Faísca Depuradora',
    originalName: 'Scouring Spark',
    level: 18,
    archetypeId: ARCH_CELESTIAL,
    prereqId: CHANNEL_SPARK.id,
    prereqName: CHANNEL_SPARK.name,
    description:
      'Enquanto Canaliza a Faísca Divina: imune a confuso e amedrontado. Quem o toca ou o danifica com ataque corpo a corpo desarmado ou arma corpo a corpo sem o traço alcance sofre 3d6 de fogo. Seus ataques desarmados causam +1d6 de fogo; magias de fogo causam +1 dado do mesmo tipo. Esse dano dobra contra aberração, infernal ou morto-vivo.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Faísca depuradora',
        description:
          'Durante Canalizar Faísca Divina: imune a confuso e amedrontado; 3d6 fogo a quem toca ou acerta corpo a corpo sem o traço alcance; +1d6 fogo nos desarmados; +1 dado nas magias de fogo. Dobra contra aberração, infernal ou morto-vivo.',
      },
    ],
    sourcePage: 117,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7343',
  }),
  f({
    id: 'feat-ascended-celestial-shining-glory',
    name: 'Glória Radiante',
    originalName: 'Shining Glory',
    level: 18,
    archetypeId: ARCH_CELESTIAL,
    traits: ['Arquétipo', 'Mítico', 'Concentrar'],
    prereqId: DED_CELESTIAL.id,
    prereqName: DED_CELESTIAL.name,
    actionType: 'two',
    description:
      'Gaste 1 Ponto Mítico. Aliados na luz plena do nimbo: +3 de status em ataques e testes de perícia; o bônus de status contra medo sobe para +3. Dura 1 minuto ou enquanto permanecerem na luz plena (o que for menor). Cada inimigo na luz plena faz Vontade contra a maior entre CD de classe e CD de magia. Por 1 minuto, inimigo não pode reduzir amedrontado abaixo de 1 enquanto estiver na luz plena. Crítico: nada. Sucesso: amedrontado 1 e pode Passos imediatamente se se afastar. Falha: amedrontado 2 e você fica oculto (concealed) para ele enquanto estiver amedrontado. Falha crítica: amedrontado 3 e você fica escondido (hidden) para ele enquanto estiver amedrontado.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Glória radiante',
        actionType: 'two',
        description:
          'Gaste 1 Ponto Mítico. Aliados na luz plena: +3 de status em ataques e perícias; +3 contra medo. Inimigos: Vontade (maior CD); amedrontado 1–3; não reduz abaixo de 1 na luz plena por 1 minuto.',
      },
    ],
    sourcePage: 117,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7342',
  }),
  f({
    id: 'feat-ascended-celestial-celestial-rebirth',
    name: 'Renascimento Celestial',
    originalName: 'Celestial Rebirth',
    level: 20,
    archetypeId: ARCH_CELESTIAL,
    prereqId: DED_CELESTIAL.id,
    prereqName: DED_CELESTIAL.name,
    description:
      'Aparência muda como desejar (você escolhe; o motor não escolhe). Para de envelhecer; não morre de velhice. Imune a veneno e doença. Traços celestial e sagrado, mais agathion, anjo, árcon ou azata — você escolhe o tipo; o motor não escolhe. 1/dia: sopro de vida inato divino de 5º; 2/dia: curar inato divino de 7º. Ao conjurar magia de cura que não o tenha como alvo, recupera 1d6 PV por nível da magia. Pode conjurar reviver os mortos como inata divina de 10º; o custo vira “gaste 1 Ponto Mítico”. Se morrer, renasce imediatamente como nephilim de uma ancestralidade à sua escolha (ou combinada com o MJ) descendente do tipo celestial escolhido; você escolhe se renasce no Universo, Elísio, Céu ou Nirvana. Celestiais o protegem até a maturidade, quando recupera poderes e memórias (tênues, como de outra pessoa).',
    effects: [
      {
        kind: 'textChoice',
        choiceId: 'ascended-celestial-type',
        options: [
          { id: 'agathion', label: 'Agathion' },
          { id: 'angel', label: 'Anjo' },
          { id: 'archon', label: 'Árcon' },
          { id: 'azata', label: 'Azata' },
        ],
        hint: 'Tipo celestial cujas fileiras você junta. Você escolhe; o motor não escolhe.',
        abilityName: 'Traço celestial: {choice}',
        abilityDescription:
          'Ganha os traços celestial, sagrado e o tipo escolhido. Aparência, ancestralidade do nephilim ao morrer e plano de renascimento (Universo, Elísio, Céu ou Nirvana) você escolhe; o motor não escolhe.',
      },
      {
        kind: 'specialAbility',
        name: 'Apoteose celestial',
        description:
          'Não envelhece; imune a veneno e doença. Sopro de vida 5º 1/dia; curar 7º 2/dia (inatos divinos). Magia de cura que não o alvo: +1d6 PV por nível da magia. Reviver os mortos 10º inato divino: custo = 1 Ponto Mítico. Renascimento como nephilim: você escolhe ancestralidade e plano.',
      },
    ],
    sourcePage: 117,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7344',
  }),
]

const beastLordArchetypeFeats: Feat[] = [
  f({
    id: DED_BEAST.id,
    name: DED_BEAST.name,
    originalName: 'Beast Lord Dedication',
    level: 12,
    archetypeId: ARCH_BEAST,
    isDedication: true,
    extraPrereq: [
      { kind: 'text', label: 'Chamado mítico (mythic calling)' },
      { kind: 'text', label: 'Companheiro animal maduro ou construto avançado' },
    ],
    description:
      'Escolha o companheiro que o qualificou como companheiro unido (você nomeia qual; o motor não escolhe). O companheiro unido sobe o modificador de Inteligência para +0, ou +1 se o modificador já for maior que +0. Ele entende um idioma que você conhece (você escolhe o idioma; o motor não escolhe) e se comunica com você; só você o entende (grunhidos, chilreios ou ruídos). Se você ou o companheiro unido estiver consciente a até 9 m e qualquer um tiver de fazer salvaguarda contra efeito mental, os dois rolam; o alvo usa o melhor resultado. O mesmo vale se os dois tiverem de salvar contra o mesmo efeito.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Companheiro unido',
        description:
          'Você nomeia qual companheiro é o unido. INT sobe para +0, ou +1 se já for maior que +0. Entende um idioma que você conhece (você escolhe o idioma). Só você o compreende ao falar.',
      },
      {
        kind: 'specialAbility',
        name: 'Salvaguardas mentais compartilhadas',
        description:
          'Conscientes a até 9 m: os dois rolam salvaguardas mentais; o alvo usa o melhor resultado (também se os dois forem alvos do mesmo efeito).',
      },
    ],
    sourcePage: 118,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7345',
  }),
  f({
    id: 'feat-beast-lord-chosen-ward',
    name: 'Protegido Escolhido',
    originalName: 'Chosen Ward',
    level: 14,
    archetypeId: ARCH_BEAST,
    prereqId: DED_BEAST.id,
    prereqName: DED_BEAST.name,
    description:
      'Nas preparações diárias, escolha um aliado que não seja o companheiro unido (você escolhe; o motor não escolhe). Enquanto você ou o companheiro unido estiver adjacente ao protegido, ele ganha +1 de circunstância na CA e em Reflexos. Quando o protegido fizer Reflexos adjacente a você ou ao companheiro, pode gastar 1 Ponto Mítico como reação para ele rolar duas vezes e usar o melhor (fortuna). Especial: se tiver Defender Nossa União, essa reação também dispara quando um inimigo acerta o protegido; nesse caso o dano do protegido é reduzido se o seu Golpe for bem-sucedido.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Protegido escolhido',
        description:
          'Nas preparações, você escolhe o aliado (não o companheiro unido). Adjacente a você ou ao unido: +1 de circunstância na CA e Reflexos. Reação + 1 Ponto Mítico: fortuna no Reflexos do protegido. Com Defender Nossa União, também dispara se um inimigo acertar o protegido.',
      },
    ],
    sourcePage: 119,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7346',
  }),
  f({
    id: 'feat-beast-lord-guarded-domain',
    name: 'Domínio Guardado',
    originalName: 'Guarded Domain',
    level: 14,
    archetypeId: ARCH_BEAST,
    prereqId: DED_BEAST.id,
    prereqName: DED_BEAST.name,
    description:
      '1 semana de intervalo num povoado ou área natural de 8 km de raio: você e o companheiro tornam-se guardiões (domínio guardado). Você nomeia o domínio; o motor não escolhe. Só um domínio por vez; um novo encerra o anterior. O domínio dura até vocês passarem mais de 1 mês fora; depois, outra semana para reatar. Se uma criatura esteve no domínio por pelo menos 1 hora enquanto você ou o companheiro também estava, qualquer um pode Recolher Informações sobre o alvo em 1 minuto comungando com a terra ou os moradores, com proficiência mítica. 1/dia, 3 ações: gaste 1 Ponto Mítico para teleportar você e o companheiro unido a um local que conheça no domínio (teleporte).',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Domínio guardado',
        description:
          'Você nomeia o domínio (1 semana de intervalo; raio 8 km). Recolher Informações mítico (1 min) sobre quem esteve 1 hora no domínio. 1/dia, 3 ações + 1 Ponto Mítico: teleporte você e o unido para um local conhecido no domínio.',
      },
    ],
    sourcePage: 119,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7347',
  }),
  f({
    id: 'feat-beast-lord-we-are-one',
    name: 'Somos Um',
    originalName: 'We are One',
    level: 14,
    archetypeId: ARCH_BEAST,
    prereqId: DED_BEAST.id,
    prereqName: DED_BEAST.name,
    description:
      'Você e o companheiro unido podem ocupar o mesmo espaço. Ao fazê-lo, ambos fornecem cobertura menor um ao outro e contam como adjacentes. O alvo fica automaticamente desprevenido contra o primeiro Golpe de cada um de vocês por rodada enquanto compartilham o espaço; o mesmo vale se você estiver montado no companheiro unido.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Somos um',
        description:
          'Podem compartilhar espaço: cobertura menor mútua, contam como adjacentes. Primeiro Golpe de cada um por rodada: alvo desprevenido (também se montado no unido).',
      },
    ],
    sourcePage: 119,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7348',
  }),
  f({
    id: 'feat-beast-lord-you-cant-hide-from-us',
    name: 'Não Há Esconderijo',
    originalName: "You Can't Hide From Us",
    level: 14,
    archetypeId: ARCH_BEAST,
    prereqId: DED_BEAST.id,
    prereqName: DED_BEAST.name,
    actionType: 'one',
    description:
      'Requisito: o companheiro unido acertou um Golpe contra uma criatura nesta rodada. Golpeie a mesma criatura. Se o Golpe acertar, o alvo fica marcado: não pode ficar oculto nem dissimulado para você e o companheiro por 1 minuto ou até se afastar mais de 18 m de qualquer um dos dois (o que ocorrer primeiro). Se um efeito ou magia concederia essa condição, tente contrapor imediatamente. Posto de contraposição = metade do nível (para cima); modificador = o maior entre CD de classe −10 e CD de magia −10.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Não há esconderijo',
        actionType: 'one',
        description:
          'Requisito: o unido acertou um Golpe nesta rodada. Golpeie o mesmo alvo. Se acertar: sem oculto/dissimulado para vocês por 1 minuto ou até 18 m de distância. Pode contrapor o efeito que concederia a condição.',
      },
    ],
    sourcePage: 119,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7349',
  }),
  f({
    id: 'feat-beast-lord-bat-around',
    name: 'Rebater',
    originalName: 'Bat Around',
    level: 16,
    archetypeId: ARCH_BEAST,
    prereqId: DED_BEAST.id,
    prereqName: DED_BEAST.name,
    actionType: 'two',
    description:
      'Faça um Golpe corpo a corpo. Se causar dano, teste de Atletismo para Reposicionar ou Empurrar (você escolhe; o motor não escolhe). Os dois contam na PAM, que só sobe depois dos dois. Se o movimento terminar no alcance do companheiro unido, ele pode Golpear o alvo. Salvo falha crítica, o companheiro também pode Reposicionar ou Empurrar (você escolhe a manobra do companheiro; o motor não escolhe). A PAM do companheiro funciona da mesma forma.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Rebater',
        actionType: 'two',
        description:
          'Golpe corpo a corpo; se causar dano, Reposicionar ou Empurrar (você escolhe). Se o alvo parar no alcance do unido, o unido Golpeia e pode Reposicionar ou Empurrar (você escolhe). PAM só sobe depois dos pares.',
      },
    ],
    sourcePage: 120,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7350',
  }),
  f({
    id: DEFEND_UNION.id,
    name: DEFEND_UNION.name,
    originalName: 'Defend Our Union',
    level: 16,
    archetypeId: ARCH_BEAST,
    prereqId: DED_BEAST.id,
    prereqName: DED_BEAST.name,
    actionType: 'reaction',
    trigger:
      'Você e o companheiro estão a até 4,5 m um do outro, e um inimigo acerta um Golpe no companheiro unido.',
    description:
      'Pode Andar imediatamente em direção ao inimigo gatilho e Golpeá-lo se ele estiver no primeiro incremento da arma à distância ou no seu alcance corpo a corpo. Se o Golpe acertar, reduza o dano do companheiro em valor igual ao seu nível, ou o dobro do nível se for crítico.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Defender nossa união',
        actionType: 'reaction',
        description:
          'Ande rumo ao inimigo e Golpeie se estiver no alcance. Acerto: reduz o dano do unido em seu nível (dobro se crítico). Com Protegido Escolhido, também dispara se o Golpe for no protegido.',
      },
    ],
    sourcePage: 120,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7351',
  }),
  f({
    id: 'feat-beast-lord-telepathic-union',
    name: 'União Telepática',
    originalName: 'Telepathic Union',
    level: 16,
    archetypeId: ARCH_BEAST,
    traits: ['Arquétipo', 'Mítico', 'Linguístico', 'Mental'],
    prereqId: DED_BEAST.id,
    prereqName: DED_BEAST.name,
    description:
      'Você e o companheiro unido se comunicam telepaticamente a até 1,6 km, como se falassem o idioma compartilhado. No mesmo plano, sentem as emoções gerais um do outro (perigo ou grande aflição).',
    effects: [
      {
        kind: 'specialAbility',
        name: 'União telepática',
        description:
          'Telepatia a 1,6 km no idioma compartilhado. No mesmo plano: sentem emoções gerais (perigo ou aflição).',
      },
    ],
    sourcePage: 120,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7352',
  }),
  f({
    id: 'feat-beast-lord-unified-stance',
    name: 'Postura Unificada',
    originalName: 'Unified Stance',
    level: 16,
    archetypeId: ARCH_BEAST,
    traits: ['Arquétipo', 'Mítico', 'Postura'],
    prereqId: DED_BEAST.id,
    prereqName: DED_BEAST.name,
    actionType: 'one',
    description:
      'Entra na postura. O companheiro unido fica acelerado e, ao ser Comandado, pode usar a ação extra para Andar ou Golpear.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Postura unificada',
        actionType: 'one',
        description:
          'O companheiro unido fica acelerado; a ação extra do Comando só para Andar ou Golpear.',
      },
    ],
    sourcePage: 120,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7353',
  }),
  f({
    id: 'feat-beast-lord-creature-of-myth',
    name: 'Criatura do Mito',
    originalName: 'Creature of Myth',
    level: 18,
    archetypeId: ARCH_BEAST,
    prereqId: DED_BEAST.id,
    prereqName: DED_BEAST.name,
    extraPrereq: [{ kind: 'text', label: 'Companheiro unido com especialização' }],
    description:
      'O companheiro unido especializado ganha um dos efeitos abaixo. Você escolhe um; o motor não escolhe. Corpo Funesto: você escolhe ácido, fogo ou veneno. Égide de Energia: você escolhe ácido, frio, eletricidade ou fogo. Pele Protetora: você escolhe a fraqueza 10 a ferro frio ou prata. Cabeças Quiméricas exige cabeça e pelo menos um ataque desarmado de boca/cabeça.',
    effects: [
      {
        kind: 'textChoice',
        choiceId: 'beast-lord-creature-of-myth',
        options: [
          { id: 'baleful-body', label: 'Corpo Funesto' },
          { id: 'chimeric-heads', label: 'Cabeças Quiméricas' },
          { id: 'energy-aegis', label: 'Égide de Energia' },
          { id: 'magnificent-flight', label: 'Voo Magnífico' },
          { id: 'protective-skin', label: 'Pele Protetora' },
        ],
        hint: 'Um efeito para o companheiro unido. Você escolhe; o motor não escolhe.',
        abilityName: 'Criatura do mito: {choice}',
        abilityDescription:
          'Corpo Funesto: você escolhe ácido, fogo ou veneno; dano de contato = metade do nível; 1 Ponto Mítico ao Comandar: 2 ações, 14d6 do tipo escolhido em cone 4,5 m ou linha 9 m (Reflexos básico, maior CD). Cabeças Quiméricas: visão em 360°; exige cabeça e desarmado de boca/cabeça; 1 Ponto Mítico: 1 ação, dois Golpes desarmados no mesmo alvo (dano combinado se ambos acertarem). Égide de Energia: você escolhe ácido, frio, eletricidade ou fogo — imunidade a esse tipo; +1 de status na CA e salvaguardas contra criaturas/efeitos/magias com esse traço; 1 Ponto Mítico: 1 ação (concentrar) estende aos adjacentes até o início do seu próximo turno. Voo Magnífico: Velocidade de voo = Velocidade e habilidade montaria; se já tiver montaria ou voo igual à Velocidade, +3 m na Velocidade; 1 Ponto Mítico: 2 ações, Voe até o dobro e um Golpe desarmado no percurso. Pele Protetora: +30 PV máx.; fraqueza 10 a ferro frio ou prata (você escolhe); 1 Ponto Mítico: cura acelerada igual ao seu nível por 1 minuto.',
      },
    ],
    sourcePage: 120,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7354',
  }),
  f({
    id: 'feat-beast-lord-pack-of-the-beast-lord',
    name: 'Matilha do Senhor das Feras',
    originalName: 'Pack Of The Beast Lord',
    level: 18,
    archetypeId: ARCH_BEAST,
    traits: ['Arquétipo', 'Mítico', 'Auditivo', 'Concentrar'],
    prereqId: DED_BEAST.id,
    prereqName: DED_BEAST.name,
    actionType: 'three',
    description:
      'Gaste 1 Ponto Mítico. O companheiro unido fica Gárgantua por 1 minuto: imune a precisão, resistência a dano físico igual à metade do seu nível, fraqueza a dano em área igual à metade do seu nível. Ganha Assalto Aglomerado, que você Comanda imediatamente ao ativar. Assalto Aglomerado (1 ação, ataque): cada inimigo no espaço do unido sofre dano igual a um dos Golpes desarmados dele mais o seu nível (Reflexos básico contra a maior CD). Você escolhe qual Golpe desarmado; o motor não escolhe.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Matilha do senhor das bestas',
        actionType: 'three',
        description:
          'Gaste 1 Ponto Mítico. Unido Gárgantua 1 minuto: imune a precisão; resistência física = metade do nível; fraqueza a área = metade do nível. Comanda Assalto Aglomerado na hora (você escolhe o Golpe desarmado): dano = esse Golpe + seu nível (Reflexos básico).',
      },
    ],
    sourcePage: 120,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7355',
  }),
  f({
    id: 'feat-beast-lord-one-life-two-vessels',
    name: 'Uma Vida, Dois Recipientes',
    originalName: 'One Life, Two Vessels',
    level: 20,
    archetypeId: ARCH_BEAST,
    prereqId: DED_BEAST.id,
    prereqName: DED_BEAST.name,
    description:
      'Se o companheiro unido morrer ou for destruído a até 9 m, a consciência dele entra na sua mente até as próximas preparações; então um ritual de 1 hora o restaura inteiro, com PV máximos e sem as aflições da morte. Se você morrer ou for destruído a até 9 m do unido, sua consciência flui para ele por 3 dias: age como o companheiro, usando as estatísticas dele. Depois de 3 dias, você volta à vida com PV iguais ao dobro do nível e recupera 1 Ponto Mítico. Se um morrer enquanto compartilha o corpo do outro, a morte é definitiva; se não for revivido em 1 ano, ambos reencarnam como crianças perto de onde se tornaram companheiros, sem memória completa, mas com um vislumbre do vínculo. Se um morrer de novo antes de se reunirem, o ciclo se quebra.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Uma vida, dois recipientes',
        description:
          'Morte do unido a 9 m: consciência em você até as preparações; ritual de 1 h restaura o companheiro. Sua morte a 9 m: você age como o unido por 3 dias, depois volta com PV = 2× nível e 1 Ponto Mítico. Morte dupla no mesmo corpo: morte verdadeira; reencarnação em 1 ano se não revividos.',
      },
    ],
    sourcePage: 120,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7356',
  }),
]

export const archetypeFeatsMythicRemaster2: Feat[] = [
  ...ascendedCelestialArchetypeFeats,
  ...beastLordArchetypeFeats,
]
