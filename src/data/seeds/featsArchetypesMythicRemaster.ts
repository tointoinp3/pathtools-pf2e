/** Destinos míticos Remaster (War of Immortals): Cavaleiro do Apocalipse, Arquidiabo. Sem Legacy. */
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

const DED_RIDER = {
  id: 'feat-apocalypse-rider-dedication',
  name: 'Dedicação de Cavaleiro do Apocalipse',
}
const DED_ARCHFIEND = {
  id: 'feat-archfiend-dedication',
  name: 'Dedicação de Arquidiabo',
}

const apocalypseRider: Feat[] = [
  f({
    id: DED_RIDER.id,
    name: DED_RIDER.name,
    originalName: 'Apocalypse Rider Dedication',
    level: 12,
    archetypeId: 'archetype-apocalypse-rider',
    isDedication: true,
    extraPrereq: [{ kind: 'text', label: 'Chamado mítico (mythic calling)' }],
    description:
      'Ganha uma montaria do apocalipse, leal enquanto você espalhar morte e destruição. Pode ser qualquer companheiro animal maduro com a habilidade especial montaria, marcado por forças daemônicas. Escolha se é ágil (nimble) ou selvagem (savage). Em um encontro, mesmo sem Comandar um Animal, a montaria ainda pode usar 1 ação no seu turno para Avançar ou Golpear. Anátema: “Você renuncia a qualquer plano de trapacear a morte ou construir algo que dure além da sua própria morte.” Se quebrar, perde as habilidades deste arquétipo até expiar. Especial: se já tiver companheiro animal com montaria, ele se torna a montaria do apocalipse; um dos ataques desarmados dele sobe um tamanho de dado. Você escolhe o tipo de companheiro maduro e ágil vs selvagem; o motor não escolhe.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Montaria do apocalipse',
        description:
          'Companheiro animal maduro com montaria. Você escolhe o tipo E se é ágil (nimble) ou selvagem (savage); o motor não escolhe. Em encontro, 1 ação para Avançar ou Golpear mesmo sem Comandar um Animal.',
      },
      {
        kind: 'specialAbility',
        name: 'Montaria já existente',
        description:
          'Se já tinha companheiro com montaria, ele vira a montaria do apocalipse e um ataque desarmado sobe um tamanho de dado. Você escolhe qual ataque; o motor não escolhe.',
      },
      {
        kind: 'specialAbility',
        name: 'Anátema do apocalipse',
        description:
          'Renuncia a planos de trapacear a morte ou construir algo que dure além da sua morte. Quebrar: perde habilidades do arquétipo até expiar.',
      },
    ],
    sourcePage: 106,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7304',
  }),
  f({
    id: 'feat-apocalypse-rider-behold-a-pale-horse',
    name: 'Eis um Cavalo Pálido',
    originalName: 'Behold, A Pale Horse',
    level: 14,
    archetypeId: 'archetype-apocalypse-rider',
    prereqId: DED_RIDER.id,
    prereqName: DED_RIDER.name,
    repeatable: true,
    description:
      'A montaria do apocalipse ganha uma especialização à sua escolha. Pode selecionar até 3 vezes; cada vez uma especialização diferente. A montaria não pode ter mais de três especializações. Você escolhe a especialização; o motor não escolhe.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Especialização da montaria',
        description:
          'Você escolhe a especialização (até 3, cada vez diferente). O motor não escolhe.',
      },
    ],
    sourcePage: 107,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7305',
  }),
  f({
    id: 'feat-apocalypse-rider-history-of-violence',
    name: 'História de Violência',
    originalName: 'History of Violence',
    level: 14,
    archetypeId: 'archetype-apocalypse-rider',
    traits: ['Arquétipo', 'Mítico', 'Vazio'],
    prereqId: DED_RIDER.id,
    prereqName: DED_RIDER.name,
    description:
      'Faça um Golpe. Se acertar, causa dano de vazio extra igual ao modificador do atributo-chave ao alvo e a todos os inimigos a até 9 m. Acerto crítico: o dobro desse dano, e o alvo do Golpe sofre vazio persistente igual ao modificador do atributo-chave. Este Golpe conta como dois ataques para a penalidade de ataque múltiplo.',
    actionType: 'two',
    sourcePage: 107,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7306',
  }),
  f({
    id: 'feat-apocalypse-rider-jousting-mount',
    name: 'Montaria de Justa',
    originalName: 'Jousting Mount',
    level: 14,
    archetypeId: 'archetype-apocalypse-rider',
    prereqId: DED_RIDER.id,
    prereqName: DED_RIDER.name,
    description:
      'Enquanto montado na montaria do apocalipse, qualquer arma de duas mãos que você empunhar ganha o traço justa (jousting) com tamanho de dado um abaixo do dado normal de dano da arma.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Justa montada',
        description:
          'Arma de duas mãos ganha justa com dado um tamanho menor que o dano normal, só enquanto montado.',
      },
    ],
    sourcePage: 107,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7307',
  }),
  f({
    id: 'feat-apocalypse-rider-one-among-the-masses',
    name: 'Um Entre as Massas',
    originalName: 'One Among The Masses',
    level: 14,
    archetypeId: 'archetype-apocalypse-rider',
    prereqId: DED_RIDER.id,
    prereqName: DED_RIDER.name,
    description:
      'Resistência igual ao seu nível contra dano causado por enxames, tropas e criaturas que ocupam o mesmo espaço que você. Ganha a atividade Sobrepujar a Multidão.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Resistência contra massas',
        description:
          'Resistência igual ao nível contra dano de enxames, tropas e criaturas no mesmo espaço que você.',
      },
      {
        kind: 'specialAbility',
        name: 'Sobrepujar a Multidão',
        actionType: 'two',
        description:
          'Concentrar. Requisito: mesmo espaço que um enxame ou adjacente a uma tropa. Gaste 1 Ponto Mítico; Intimidação em proficiência mítica contra a CD de Vontade. Falha: o alvo Avança na direção que você escolher e você vai junto. Sucesso: o alvo Avança duas vezes na direção que você escolher; você decide se vai junto. Qualquer resultado: atordoado 1 e imune temporário a Sobrepujar a Multidão por 24 horas. Você escolhe a direção; o motor não escolhe.',
      },
    ],
    sourcePage: 107,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7308',
  }),
  f({
    id: 'feat-apocalypse-rider-putrefaction',
    name: 'Putrefação',
    originalName: 'Putrefaction',
    level: 14,
    archetypeId: 'archetype-apocalypse-rider',
    traits: ['Arquétipo', 'Mítico', 'Concentrar'],
    prereqId: DED_RIDER.id,
    prereqName: DED_RIDER.name,
    description:
      'Gaste um Ponto Mítico. Inimigos a até 18 m fazem Fortitude contra a maior entre CD de classe e CD de magia ou ficam enjoados 1. Comida comestível apodrece e água potável fica salobra na área. Escolha um número de poções ou elixires alquímicos na área igual ao modificador do atributo-chave e tente contrapor cada um com Ocultismo ou Religião em proficiência mítica (posto de contrapose = metade do nível). Sucesso: o item estraga e vira mundano. Você escolhe os itens e a perícia de contrapose; o motor não escolhe.',
    actionType: 'two',
    sourcePage: 107,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7309',
  }),
  f({
    id: 'feat-apocalypse-rider-night-terror',
    name: 'Terror Noturno',
    originalName: 'Night Terror',
    level: 16,
    archetypeId: 'archetype-apocalypse-rider',
    prereqId: DED_RIDER.id,
    prereqName: DED_RIDER.name,
    description:
      'A montaria do apocalipse ganha Deslocamento de voo igual ao Deslocamento terrestre. Se já tiver voo, +2 de circunstância em Acrobacia para Manobrar em Voo. À noite ou sem luz solar natural: +3 m de circunstância no voo, e falhas críticas em Manobrar em Voo viram falhas.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Voo da montaria do apocalipse',
        description:
          'Deslocamento de voo = Deslocamento terrestre. Se já tinha voo: +2 de circunstância em Acrobacia para Manobrar em Voo. Sem luz solar: +3 m de circunstância no voo; falha crítica em Manobrar em Voo vira falha.',
      },
    ],
    sourcePage: 108,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7310',
  }),
  f({
    id: 'feat-apocalypse-rider-steal-death',
    name: 'Roubar a Morte',
    originalName: 'Steal Death',
    level: 16,
    archetypeId: 'archetype-apocalypse-rider',
    traits: ['Arquétipo', 'Mítico', 'Morte'],
    prereqId: DED_RIDER.id,
    prereqName: DED_RIDER.name,
    description:
      'A criatura disparadora reduz condenado ou morrendo em 1. Pelo próximo minuto, você e a montaria do apocalipse ganham cura acelerada 5 enquanto estiverem a até 3 m um do outro. Se usar esta reação de novo nesse minuto, a cura acelerada aumenta em 1, mas a duração não aumenta.',
    actionType: 'reaction',
    trigger:
      'Outra criatura a até 9 m ganha a condição condenado ou morrendo, ou essa condição aumenta.',
    sourcePage: 108,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7311',
  }),
  f({
    id: 'feat-apocalypse-rider-to-war',
    name: 'À Guerra!',
    originalName: 'To War!',
    level: 16,
    archetypeId: 'archetype-apocalypse-rider',
    prereqId: DED_RIDER.id,
    prereqName: DED_RIDER.name,
    description:
      'Requisito: você está montado na montaria do apocalipse. Comande a montaria a Avançar até o dobro do Deslocamento (ou Cavar, Escalar, Voar ou Nadar, se tiver o movimento). Move-se pelo espaço de inimigos até um tamanho menor que a montaria. A montaria causa dano igual a um dos Golpes desarmados dela a cada criatura cujo espaço atravessar (Reflexos básico contra a CD de Atletismo da montaria). Falha crítica: também desprevenido até o fim do seu próximo turno. Cada criatura só sofre dano uma vez. Aliados que viram a carga ganham PV temporários iguais ao seu nível e +2 de status no dano contra qualquer inimigo danificado pela montaria nesta rodada (traço visual). Dura até o fim do seu próximo turno. Você escolhe o ataque desarmado da montaria; o motor não escolhe.',
    actionType: 'three',
    frequency: '1 vez a cada 10 minutos',
    sourcePage: 108,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7312',
  }),
  f({
    id: 'feat-apocalypse-rider-virulent-strike',
    name: 'Golpe Virulento',
    originalName: 'Virulent Strike',
    level: 16,
    archetypeId: 'archetype-apocalypse-rider',
    traits: ['Arquétipo', 'Mítico', 'Ímpeto'],
    prereqId: DED_RIDER.id,
    prereqName: DED_RIDER.name,
    description:
      'Faça um Golpe. Se acertar, o alvo faz uma nova salvaguarda contra a doença ou veneno de maior nível que o afeta, podendo avançar o estágio mesmo fora do intervalo. Sucesso ou sucesso crítico nessa salvaguarda não reduz o estágio. Acerto crítico no Golpe: –4 de circunstância na salvaguarda.',
    actionType: 'one',
    sourcePage: 108,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7313',
  }),
  f({
    id: 'feat-apocalypse-rider-wither-away',
    name: 'Murchar',
    originalName: 'Wither Away',
    level: 16,
    archetypeId: 'archetype-apocalypse-rider',
    traits: ['Arquétipo', 'Mítico', 'Concentrar', 'Manipular', 'Vazio'],
    prereqId: DED_RIDER.id,
    prereqName: DED_RIDER.name,
    description:
      'Uma criatura viva a até 18 m sofre 14d6 de vazio e uma parte do corpo que você escolheu murcha, com penalidade conforme Fortitude contra a maior entre CD de classe e CD de magia. Braços: enfraquecido 1. Cabeça: estupefato 1. Pernas: –3 m de status nos Deslocamentos. Torso: fraqueza 10 a corte. Sucesso crítico: nada. Sucesso: metade do dano; penalidade até o fim do seu próximo turno. Falha: dano total; penalidade por 1 minuto. Falha crítica: dano dobrado; você escolhe uma segunda parte; ambas por 1 minuto. Você escolhe a(s) parte(s) a cada uso; o motor não escolhe.',
    actionType: 'two',
    effects: [
      {
        kind: 'textChoice',
        choiceId: 'apocalypse-rider-wither-body-part',
        options: [
          { id: 'arms', label: 'Braços (enfraquecido 1)' },
          { id: 'head', label: 'Cabeça (estupefato 1)' },
          { id: 'legs', label: 'Pernas (–3 m de status nos Deslocamentos)' },
          { id: 'torso', label: 'Torso (fraqueza 10 a corte)' },
        ],
        hint: 'A cada uso você escolhe a parte do corpo; o motor não escolhe.',
        abilityName: 'Murchar: {choice}',
        abilityDescription:
          'A cada uso, escolha a parte. Falha crítica: segunda parte. O motor não escolhe.',
      },
    ],
    sourcePage: 108,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7314',
  }),
  f({
    id: 'feat-apocalypse-rider-contagious-spell',
    name: 'Magia Contagiosa',
    originalName: 'Contagious Spell',
    level: 18,
    archetypeId: 'archetype-apocalypse-rider',
    traits: ['Arquétipo', 'Mítico', 'Concentrar', 'Forma de Magia'],
    prereqId: DED_RIDER.id,
    prereqName: DED_RIDER.name,
    description:
      'Gaste um Ponto Mítico. Se a próxima ação for Conjurar uma Magia que cause dano ou condições debilitantes e tenha um número específico de alvos, você pode visar uma criatura adicional. Você escolhe o alvo extra; o motor não escolhe.',
    actionType: 'one',
    sourcePage: 109,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7315',
  }),
  f({
    id: 'feat-apocalypse-rider-deathless-servant',
    name: 'Servo Sem Morte',
    originalName: 'Deathless Servant',
    level: 18,
    archetypeId: 'archetype-apocalypse-rider',
    prereqId: DED_RIDER.id,
    prereqName: DED_RIDER.name,
    description:
      'A primeira vez por dia em que seria reduzido a 0 PV sem morrer imediatamente, você evita a nocaute e, em vez do dano, recupera PV iguais ao dobro do nível. Ferido aumenta em 1. Enquanto ferido: bônus de status na CA igual ao valor de ferido e bônus de status no dano dos Golpes igual ao dobro do valor de ferido.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Servo sem morte',
        description:
          '1/dia, ao cair a 0 PV sem morrer na hora: não nocauteia; recupera PV = 2 × nível; ferido +1. Enquanto ferido: +ferido na CA (status) e +2 × ferido no dano dos Golpes (status).',
      },
    ],
    sourcePage: 109,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7316',
  }),
  f({
    id: 'feat-apocalypse-rider-memory-of-nothing',
    name: 'Memória do Nada',
    originalName: 'Memory of Nothing',
    level: 18,
    archetypeId: 'archetype-apocalypse-rider',
    traits: ['Arquétipo', 'Mítico', 'Concentrar', 'Manipular', 'Mental'],
    prereqId: DED_RIDER.id,
    prereqName: DED_RIDER.name,
    description:
      'Escolha um alvo a até 9 m e gaste um Ponto Mítico. Vontade contra a maior entre CD de classe e CD de magia, em proficiência mítica. Sucesso crítico: nada. Sucesso: 3 rodadas, atividade de 3+ ações causa 12d8 mental. Falha: 3 rodadas, atividade de 2+ ações causa 12d8 mental. Falha crítica: como falha, e atordoado 1. Você escolhe o alvo; o motor não escolhe.',
    actionType: 'two',
    sourcePage: 109,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7317',
  }),
  f({
    id: 'feat-apocalypse-rider-soul-vessel-mount',
    name: 'Montaria Vaso de Almas',
    originalName: 'Soul Vessel Mount',
    level: 18,
    archetypeId: 'archetype-apocalypse-rider',
    prereqId: DED_RIDER.id,
    prereqName: DED_RIDER.name,
    description:
      '1/dia, conjure Aprisionar Alma (seize soul) como magia inata divina. Custa 1 Ponto Mítico; a montaria do apocalipse serve de item para guardar a alma e conta como artefato para a magia. Enquanto a montaria contiver uma alma, você pode Sustentar a magia para ela consumir a alma: recupera PV iguais ao dobro do seu nível; pelo próximo minuto, +6 m de status no Deslocamento e Golpes desarmados em proficiência mítica.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Aprisionar Alma inata (montaria)',
        description:
          '1/dia, Aprisionar Alma inata divina; custo 1 Ponto Mítico; a montaria é o recipiente (conta como artefato). Sustentar para consumir a alma: PV = 2 × nível; 1 minuto: +6 m de status no Deslocamento e desarmados em proficiência mítica.',
      },
    ],
    sourcePage: 109,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7318',
  }),
  f({
    id: 'feat-apocalypse-rider-immortal-ruin',
    name: 'Ruína Imortal',
    originalName: 'Immortal Ruin',
    level: 20,
    archetypeId: 'archetype-apocalypse-rider',
    prereqId: DED_RIDER.id,
    prereqName: DED_RIDER.name,
    description:
      'Você e a montaria ganham os traços daemon, infernal (fiend) e profano. Enquanto a montaria viver: você não envelhece; condenado ou morrendo não sobe para 4 ou mais. Se fosse morto de outro modo: 0 PV, inconsciente; se a montaria estiver consciente, teleporta ao seu lado, recolhe você e tenta fugir. Enquanto você estiver consciente a até 9 m da montaria, ela não pode ser morta: a 0 PV estabiliza e morrendo não aumenta; condenado dela não sobe para 4+. Se você se afastar mais de 9 m ou ficar inconsciente, ela perde esses benefícios. Quando uma criatura viva a até 18 m morre, faz Vontade contra a maior entre CD de classe e CD de magia (incapacitação). Falha: não pode voltar à vida por 24 horas. Falha crítica: você pode fazer a alma coalescer num gema de alma (Dureza 2, PV 8) no espaço dela por 1 semana (ritual de 10 minutos para tornar permanente). Destruir a gema liberta a alma, mas não ressuscita. Conjurar para trazer de volta alguém cuja alma está na gema falha, salvo Religião contra a maior entre suas CDs.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Traços daemon, infernal e profano',
        description:
          'Você e a montaria do apocalipse ganham os traços daemon, infernal (fiend) e profano (unholy).',
      },
      {
        kind: 'specialAbility',
        name: 'Destinos entrelaçados',
        description:
          'Enquanto a montaria viver: você não envelhece; condenado/morrendo não aumenta para 4 ou mais (não é um novo máximo de morrendo na ficha). Morte por outro meio: 0 PV, inconsciente; montaria consciente teleporta, recolhe e foge. Você consciente a até 9 m: a montaria não morre (estabiliza a 0 PV; morrendo não sobe; condenado dela não vai a 4+). Afastar-se ou inconsciente: ela perde esses benefícios.',
      },
      {
        kind: 'specialAbility',
        name: 'Gema de alma',
        description:
          'Criatura viva a até 18 m que morre: Vontade (incapacitação). Falha: sem ressurreição por 24 h. Falha crítica: você pode criar gema de alma (Dureza 2, PV 8). Você escolhe se cria a gema; o motor não escolhe.',
      },
    ],
    sourcePage: 109,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7319',
  }),
]

const archfiend: Feat[] = [
  f({
    id: DED_ARCHFIEND.id,
    name: DED_ARCHFIEND.name,
    originalName: 'Archfiend Dedication',
    level: 12,
    archetypeId: 'archetype-archfiend',
    isDedication: true,
    extraPrereq: [{ kind: 'text', label: 'Chamado mítico (mythic calling)' }],
    description:
      'Nomeie seu reino e descreva a aparência eventual (terreno distintivo). Escolha o tipo de dano do reino: ácido, frio, eletricidade, fogo ou veneno. Resistência a esse tipo igual à metade do nível; se já tiver essa resistência, aumente-a em 5. Ganha Manifestar o Reino. Você escolhe nome, aparência e tipo de dano; o motor não escolhe.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Reino planejado',
        description:
          'Nomeie o reino e descreva a aparência eventual. O motor não escolhe.',
      },
      {
        kind: 'textChoice',
        choiceId: 'archfiend-realm-damage-type',
        options: [
          { id: 'acid', label: 'Ácido' },
          { id: 'cold', label: 'Frio' },
          { id: 'electricity', label: 'Eletricidade' },
          { id: 'fire', label: 'Fogo' },
          { id: 'poison', label: 'Veneno' },
        ],
        hint: 'Você escolhe o tipo de dano do reino; o motor não escolhe.',
        abilityName: 'Tipo de dano do reino: {choice}',
        abilityDescription:
          'Resistência igual à metade do nível a esse tipo. Se já tiver essa resistência, aumente-a em 5.',
      },
      {
        kind: 'specialAbility',
        name: 'Resistência do reino',
        description:
          'Resistência igual à metade do nível ao tipo escolhido. Se já tiver essa resistência, +5. Não há efeito de resistência automática no motor; anote o valor na ficha.',
      },
      {
        kind: 'specialAbility',
        name: 'Manifestar o Reino',
        actionType: 'two',
        description:
          'Concentrar, divino, manipular. Frequência: 1/hora. Explosão de 6 m de raio centrada em você: terreno difícil para inimigos; –1 em Fortitude dos inimigos na área. Sustentar 1/rodada; se não sustentar, o raio cai 1,5 m. Máximo 1 minuto; pode Dispensar. Dispensa automática se o raio chegar a 0 ou se você se afastar mais de 30 m das bordas.',
      },
    ],
    sourcePage: 110,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7320',
  }),
  f({
    id: 'feat-archfiend-don-thy-fervor',
    name: 'Reveste-te de Fervor',
    originalName: 'Don thy Fervor',
    level: 14,
    archetypeId: 'archetype-archfiend',
    traits: ['Arquétipo', 'Mítico', 'Concentrar'],
    prereqId: DED_ARCHFIEND.id,
    prereqName: DED_ARCHFIEND.name,
    description:
      'Pelo próximo minuto, +2 de circunstância em Enganação, Diplomacia e Intimidação, e +2 de circunstância em testes de contrapose. No 18º nível, esses bônus sobem para +3.',
    actionType: 'one',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Fervor infernal (1 minuto)',
        actionType: 'one',
        description:
          '+2 de circunstância em Enganação, Diplomacia, Intimidação e contrapose (+3 no 18º).',
      },
    ],
    sourcePage: 111,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7321',
  }),
  f({
    id: 'feat-archfiend-lord-of-the-fiends',
    name: 'Senhor dos Infernais',
    originalName: 'Lord of the Fiends',
    level: 14,
    archetypeId: 'archetype-archfiend',
    prereqId: DED_ARCHFIEND.id,
    prereqName: DED_ARCHFIEND.name,
    description:
      'Gaste um Ponto Mítico. Tente um teste em proficiência mítica para Recordar Conhecimento sobre cada infernal (fiend) que você vê. Pela próxima hora, sucesso em Enganação, Diplomacia ou Intimidação contra um infernal vira sucesso crítico.',
    actionType: 'two',
    sourcePage: 111,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7322',
  }),
  f({
    id: 'feat-archfiend-manipulate-realm',
    name: 'Manipular o Reino',
    originalName: 'Manipulate Realm',
    level: 14,
    archetypeId: 'archetype-archfiend',
    prereqId: DED_ARCHFIEND.id,
    prereqName: DED_ARCHFIEND.name,
    description:
      'Se gastar um Ponto Mítico ao Manifestar o Reino, pode usar Drenar o Reino, Expandir o Reino e Liberar o Reino (ações livres).',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Drenar o Reino',
        actionType: 'free',
        description:
          'Concentrar. Disparo: sua ação anterior foi Sustentar o reino manifestado. Requisito: raio de pelo menos 3 m. Reduza o raio em 3 m. Recupera PV iguais ao nível; Golpes até o fim do turno causam +1d8 do tipo de dano do reino.',
      },
      {
        kind: 'specialAbility',
        name: 'Expandir o Reino',
        actionType: 'free',
        description:
          'Concentrar. Disparo: sua ação anterior foi Sustentar o reino manifestado. Aumente o raio em 3 m.',
      },
      {
        kind: 'specialAbility',
        name: 'Liberar o Reino',
        actionType: 'free',
        description:
          'Concentrar. Disparo: sua ação anterior foi Sustentar o reino manifestado. Um inimigo no reino sofre 4d8 do tipo de dano do reino (Fortitude básico contra a maior entre CD de classe e CD de magia). Você escolhe o inimigo; o motor não escolhe.',
      },
    ],
    sourcePage: 111,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7323',
  }),
  f({
    id: 'feat-archfiend-marshall-fiendish-forces',
    name: 'Reunir Forças Infernais',
    originalName: 'Marshall Fiendish Forces',
    level: 16,
    archetypeId: 'archetype-archfiend',
    prereqId: DED_ARCHFIEND.id,
    prereqName: DED_ARCHFIEND.name,
    description:
      'Ao Manifestar o Reino, pode fazer um infernal comum de nível 11 ou menor (escolhido ao pegar este feito) aparecer num ponto à sua escolha no reino, com o traço lacaio. Permanece enquanto o reino estiver manifestado, até 0 PV ou até você mandá-lo partir; então some. No 20º nível, pode escolher um infernal comum de nível 15 ou menor. Você nomeia o infernal; o motor não escolhe.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Infernal convocado',
        description:
          'Nomeie um infernal comum de nível ≤ 11 (≤ 15 no 20º). Aparece ao Manifestar o Reino, traço lacaio. O motor não escolhe a criatura.',
      },
    ],
    sourcePage: 111,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7324',
  }),
  f({
    id: 'feat-archfiend-realm-strider',
    name: 'Andarilho do Reino',
    originalName: 'Realm Strider',
    level: 16,
    archetypeId: 'archetype-archfiend',
    prereqId: DED_ARCHFIEND.id,
    prereqName: DED_ARCHFIEND.name,
    description:
      'Conjure Translocar (translocate) como magia inata divina de 4º posto à vontade. Ao fazê-lo, espaços adjacentes ao que você deixa e ao que aparece sofrem 4d6 do tipo de dano do reino (Reflexos básico contra a maior entre CD de classe e CD de magia).',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Translocar inata (4º, à vontade)',
        description:
          'Translocar inata divina de 4º posto à vontade. Espaços adjacentes à origem e ao destino: 4d6 do tipo de dano do reino (Reflexos básico).',
      },
    ],
    sourcePage: 111,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7325',
  }),
  f({
    id: 'feat-archfiend-seat-of-power',
    name: 'Assento do Poder',
    originalName: 'Seat of Power',
    level: 16,
    archetypeId: 'archetype-archfiend',
    prereqId: DED_ARCHFIEND.id,
    prereqName: DED_ARCHFIEND.name,
    description:
      'Um demiplano abriga uma residência grandiosa, o coração do reino planejado. Você descreve a aparência (casa de duskwood, castelo em ruínas, torre de gelo, pagode de almas, etc.). Você e criaturas que escolher recuperam o triplo de PV ao descansar no assento. 1/dia no assento: Purificar Aflição ou Corpo São como inata divina de 4º posto, só em você. Ganha Entrar no Assento do Poder. Você descreve o assento; o motor não escolhe.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Aparência do assento',
        description:
          'Descreva o assento do poder. O motor não escolhe.',
      },
      {
        kind: 'specialAbility',
        name: 'Descanso no assento',
        description:
          'Você e criaturas que escolher recuperam 3× PV ao descansar no assento. 1/dia: Purificar Aflição ou Corpo São inata divina de 4º, só em você. Você escolhe a magia; o motor não escolhe.',
      },
      {
        kind: 'specialAbility',
        name: 'Entrar no Assento do Poder',
        description:
          'Concentrar, exploração, mítico. 10 minutos; até 10 criaturas dispostas a até 9 m o tempo todo. Permanecem o quanto quiserem. Qualquer um (incluindo você) parte com 3 ações (concentrar) e volta ao local de entrada (ou espaço vazio mais próximo).',
      },
    ],
    sourcePage: 111,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7326',
  }),
  f({
    id: 'feat-archfiend-brandish-authority',
    name: 'Brandir Autoridade',
    originalName: 'Brandish Authority',
    level: 18,
    archetypeId: 'archetype-archfiend',
    traits: ['Arquétipo', 'Mítico', 'Auditivo', 'Visual'],
    prereqId: DED_ARCHFIEND.id,
    prereqName: DED_ARCHFIEND.name,
    description:
      'Manifeste um signo visível de autoridade (coroa de chamas, cetro de almas, trono de crânios, etc.) no seu espaço ou na mão, por 1 minuto. Ao aparecer, tente Desmoralizar cada inimigo a até 9 m que possa ver ou ouvir você, sem penalidade por não compartilhar idioma. Enquanto o signo permanecer, inimigos não reduzem assustado abaixo de 1. Pode gastar 1 Ponto Mítico nesta ação: no início do turno, criatura assustada por Brandir Autoridade faz Vontade contra a maior entre CD de classe e CD de magia. Falha: precisa Ficar Caído. Falha crítica: Fica Caído e não pode Levantar neste turno. Você descreve o signo; o motor não escolhe.',
    actionType: 'two',
    sourcePage: 112,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7327',
  }),
  f({
    id: 'feat-archfiend-imprison-foe',
    name: 'Aprisionar Inimigo',
    originalName: 'Imprison Foe',
    level: 18,
    archetypeId: 'archetype-archfiend',
    traits: ['Arquétipo', 'Mítico', 'Teleportação'],
    prereqId: DED_ARCHFIEND.id,
    prereqName: DED_ARCHFIEND.name,
    description:
      'Gaste 1 Ponto Mítico. Uma criatura a quem você causou dano com a última ação faz Vontade contra a maior entre CD de classe e CD de magia. Qualquer resultado: imune temporário a Aprisionar Inimigo por 24 horas. Sucesso crítico: nada. Sucesso: atordoado 2. Falha: transportado a uma cela no calabouço extradimensional por 1 minuto (não sai nem danifica a cela; teleporte só se também atravessar planos). No fim de cada turno, nova Vontade: reduz 1 rodada restante, ou encerra no sucesso crítico. Ao acabar, volta ao espaço original (ou o mais próximo). Falha crítica: como falha, atordoado na primeira rodada. Você descreve a aparência da prisão; o motor não escolhe.',
    actionType: 'one',
    sourcePage: 112,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7328',
  }),
  f({
    id: 'feat-archfiend-profane-bargain',
    name: 'Pacto Profano',
    originalName: 'Profane Bargain',
    level: 18,
    archetypeId: 'archetype-archfiend',
    traits: ['Arquétipo', 'Mítico', 'Divino', 'Mental'],
    rarity: 'rare',
    prereqId: DED_ARCHFIEND.id,
    prereqName: DED_ARCHFIEND.name,
    description:
      'Pacto com criatura sápiente e disposta: nunca ações hostis contra você, nunca mentir, nunca falar do pacto, e cumprir ou abster-se de uma tarefa que você especifica. Se aceitar, pede algo verbalmente; você pode distorcer detalhes desde que cumpra o pedido. Se o pedido pudesse ser concedido por Desejo, gaste 1 Ponto Mítico e é concedido. Enquanto durar: você sabe a localização do alvo, comunica-se telepaticamente a qualquer distância e vê pelos sentidos dele (1 ação, concentrar). 1/dia: 3 ações (concentrar) para controlá-lo por 10 minutos; ele não lembra. Se quebrar os termos, você escolhe na hora: morre; morre e você possui a alma; fica permanentemente controlado; ou é preso numa cela do calabouço (só com Aprisionar Inimigo). Cada alvo só faz este pacto uma vez (nem morte, Desejo ou intervenção divina libertam essa limitação). Você não pode pactuar consigo. Você escolhe tarefa, distorção e punição; o motor não escolhe.',
    actionType: 'two',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Pacto profano',
        actionType: 'two',
        description:
          'Você escolhe a tarefa extra, como distorcer o pedido e a punição se o alvo quebrar o pacto. O motor não escolhe.',
      },
    ],
    sourcePage: 112,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7329',
  }),
  f({
    id: 'feat-archfiend-fiend-eternal',
    name: 'Infernal Eterno',
    originalName: 'Fiend Eternal',
    level: 20,
    archetypeId: 'archetype-archfiend',
    prereqId: DED_ARCHFIEND.id,
    prereqName: DED_ARCHFIEND.name,
    description:
      'Ganha os traços infernal (fiend) e profano; imune ao tipo de dano do reino; não envelhece. O reino planejado torna-se real (Inferno, Fendas Exteriores, Mundo Inferior, demiplano infernal ou outro espaço planar à sua escolha). Com Assento do Poder, o assento se funde ao reino e Entrar no Assento leva a qualquer ponto do reino; senão, ritual de 10 minutos para entrar/sair (sem levar ninguém). Sempre que morreria: 0 PV, inconsciente, transportado ao assento. Após 1 hora (1 rodada com Assento do Poder), recupera 5 PV e acorda. Não pode deixar o reino até curar por completo ou passar 1 semana. Ganha um grupo pequeno de lacaios infernais no reino (não saem, salvo às vezes com Reunir Forças Infernais). Vínculo telepático: 3 ações (concentrar) para falar com o grupo ou um infernal específico e Recordar Conhecimento ou Obter Informações; falha crítica vira falha. Você escolhe o espaço planar; o motor não escolhe.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Traços infernal e profano',
        description: 'Você ganha os traços infernal (fiend) e profano (unholy). Não envelhece.',
      },
      {
        kind: 'specialAbility',
        name: 'Imunidade ao dano do reino',
        description: 'Imune ao tipo de dano do reino escolhido na Dedicação.',
      },
      {
        kind: 'specialAbility',
        name: 'Reino completo',
        description:
          'O reino torna-se real no espaço planar que você escolher. O motor não escolhe o plano. Com Assento do Poder, Entrar no Assento vai a qualquer ponto; senão, ritual de 10 minutos (só você).',
      },
      {
        kind: 'specialAbility',
        name: 'Retorno ao assento',
        description:
          'Ao morrer: 0 PV, inconsciente, transportado ao assento. 1 hora depois (1 rodada com Assento do Poder): 5 PV e acorda. Não sai do reino até curar por completo ou 1 semana.',
      },
      {
        kind: 'specialAbility',
        name: 'Lacaios infernais',
        actionType: 'three',
        description:
          'Grupo no reino, vínculo telepático. 3 ações (concentrar): Recordar Conhecimento ou Obter Informações; falha crítica vira falha. Você escolhe falar com o grupo ou um infernal; o motor não escolhe.',
      },
    ],
    sourcePage: 112,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7330',
  }),
]

export const archetypeFeatsMythicRemaster: Feat[] = [...apocalypseRider, ...archfiend]
