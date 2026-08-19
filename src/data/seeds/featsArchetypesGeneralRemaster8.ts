/** Gerais Remaster: Artilheiro, Demolidor, Técnico de Fogos, Condutor de Truques, Infiltrador de Besta. Sem Legacy. */
import type { Feat } from '@/types/feat'
import { SOURCE_BATTLECRY_ID, SOURCE_GUNS_GEARS_ID, SOURCE_PLAYER_CORE_ID } from './sources'

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
    sourceId: opts.sourceId ?? SOURCE_GUNS_GEARS_ID,
    sourcePage: opts.sourcePage,
    aonUrl: opts.aonUrl,
  }
}

const DED_ART = { id: 'feat-artillerist-dedication', name: 'Dedicação de Artilheiro' }
const DED_DEM = { id: 'feat-demolitionist-dedication', name: 'Dedicação de Demolidor' }
const DED_FW = {
  id: 'feat-firework-technician-dedication',
  name: 'Dedicação de Técnico de Fogos',
}
const DED_TD = { id: 'feat-trick-driver-dedication', name: 'Dedicação de Condutor de Truques' }
const DED_XB = {
  id: 'feat-crossbow-infiltrator-dedication',
  name: 'Dedicação de Infiltrador de Besta',
}

const artilleristArchetypeFeats: Feat[] = [
  f({
    id: DED_ART.id,
    name: DED_ART.name,
    originalName: 'Artillerist Dedication',
    level: 2,
    archetypeId: 'archetype-artillerist',
    isDedication: true,
    extraPrereq: [
      { kind: 'text', label: 'Treinado em armas marciais' },
    ],
    description:
      'Se você estiver na tripulação de uma arma de cerco, você e os demais ganham +2 de circunstância em testes para Carregar, Mirar, mover ou Reparar. Ao Mirar, pode mover a mira o dobro do normal.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Equipe de artilharia',
        description:
          '+2 de circunstância para Carregar, Mirar, mover ou Reparar a arma de cerco. Mirar move o dobro.',
      },
    ],
    sourcePage: 128,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=115',
  }),
  f({
    id: 'feat-artillerist-named-artillery',
    name: 'Artilharia Nomeada',
    originalName: 'Named Artillery',
    level: 4,
    archetypeId: 'archetype-artillerist',
    prereqId: DED_ART.id,
    prereqName: DED_ART.name,
    description:
      'Um dia inteiro designa uma arma de cerco: +2 de circunstância na CA, Fortitude e Reflexos, e PV extras iguais ao dobro do seu nível. Nas preparações, 1 hora de manutenção ou perde o benefício. Só um artilheiro por arma. Você nomeia a peça; o motor não escolhe.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Artilharia nomeada',
        description: '+2 CA/Fort/Refl e +2×nível PV na peça designada, com 1 h de manutenção diária.',
      },
    ],
    sourcePage: 128,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=115',
  }),
  f({
    id: 'feat-artillerist-shorthanded',
    name: 'Equipe Reduzida',
    originalName: 'Shorthanded',
    level: 4,
    archetypeId: 'archetype-artillerist',
    prereqId: DED_ART.id,
    prereqName: DED_ART.name,
    description:
      'Pode operar com menos que o mínimo de tripulação: −2 por pessoa faltando (máx. 5 faltando) em Carregar, Mirar, Disparar, mover ou Reparar.',
    sourcePage: 128,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=115',
  }),
  f({
    id: 'feat-artillerist-cannon-corner-shot',
    name: 'Tiro de Canto de Canhão',
    originalName: 'Cannon Corner Shot',
    level: 6,
    archetypeId: 'archetype-artillerist',
    prereqId: DED_ART.id,
    prereqName: DED_ART.name,
    description:
      'Se você pessoalmente contribuir com uma ação extra de Carregar acima do mínimo, pode trocar explosão por linha do dobro do tamanho, ou o inverso (explosão de 3 m ↔ linha de 6 m).',
    sourcePage: 128,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=115',
  }),
  f({
    id: 'feat-artillerist-field-artillery',
    name: 'Artilharia de Campo',
    originalName: 'Field Artillery',
    level: 6,
    archetypeId: 'archetype-artillerist',
    prereqId: DED_ART.id,
    prereqName: DED_ART.name,
    description:
      'Interaja com uma arma de cerco montada adjacente: o Deslocamento dela aumenta em 3 m por 1 rodada.',
    actionType: 'one',
    sourcePage: 128,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=115',
  }),
  f({
    id: 'feat-artillerist-live-ammunition',
    name: 'Munição Viva',
    originalName: 'Live Ammunition',
    level: 8,
    archetypeId: 'archetype-artillerist',
    prereqId: DED_ART.id,
    prereqName: DED_ART.name,
    description:
      'Carregar uma criatura exige duas ações extras de Carregar feitas por você. A criatura deve estar disposta, inconsciente ou imobilizada, e a arma precisa cabê-la. Ao Disparar, se a arma atinge área, mire um quadrado de 1,5 m. Dano normal no alvo (ou área modificada) e na criatura disparada.',
    sourcePage: 128,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=115',
  }),
  f({
    id: 'feat-artillerist-master-siege-engineer',
    name: 'Mestre Engenheiro de Cerco',
    originalName: 'Master Siege Engineer',
    level: 16,
    archetypeId: 'archetype-artillerist',
    prereqId: DED_ART.id,
    prereqName: DED_ART.name,
    description: 'Permanentemente acelerado. A ação extra só serve para Mirar ou Disparar uma arma de cerco.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Acelerado (cerco)',
        description: 'Ação extra só para Mirar ou Disparar arma de cerco.',
      },
    ],
    sourcePage: 128,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=115',
  }),
]

const demolitionistArchetypeFeats: Feat[] = [
  f({
    id: DED_DEM.id,
    name: DED_DEM.name,
    originalName: 'Demolitionist Dedication',
    level: 2,
    archetypeId: 'archetype-demolitionist',
    isDedication: true,
    rarity: 'uncommon',
    description:
      'Treinado em Conhecimento de Engenharia, ou perito se já era treinado. Ganha Preparar Explosivos (2 ações, concentração): afixe 1 ou 2 bombas em objeto inanimado no alcance para detonar até 1 minuto depois. O dano ignora Solidez igual ao seu nível; criaturas adjacentes sofrem o respingo. Não pode preparar de novo enquanto espera a detonação. Sem o feito Legacy Carga de Demolição.',
    effects: [
      { kind: 'lore', loreName: 'Engenharia', rank: 'trained' },
      {
        kind: 'specialAbility',
        name: 'Preparar Explosivos',
        actionType: 'two',
        description:
          'Afixe 1–2 bombas; detonam no momento escolhido (máx. 1 min). Ignora Solidez = nível. Se já era treinado em Engenharia, trate como perito.',
      },
    ],
    sourcePage: 133,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=118',
  }),
  f({
    id: 'feat-demolitionist-safety-measures',
    name: 'Medidas de Segurança',
    originalName: 'Safety Measures',
    level: 4,
    archetypeId: 'archetype-demolitionist',
    rarity: 'uncommon',
    prereqId: DED_DEM.id,
    prereqName: DED_DEM.name,
    description:
      'Com cobertura contra uma bomba, resistência ao dano dela igual à metade do nível + o bônus de circunstância na CA da cobertura. Contra as suas próprias bombas, vale mesmo sem cobertura.',
    sourcePage: 133,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=118',
  }),
  f({
    id: 'feat-demolitionist-explosive-entry',
    name: 'Entrada Explosiva',
    originalName: 'Explosive Entry',
    level: 7,
    archetypeId: 'archetype-demolitionist',
    rarity: 'uncommon',
    prereqId: DED_DEM.id,
    prereqName: DED_DEM.name,
    description:
      'Prepare Explosivos em porta, janela, recipiente ou portão pesado. Na detonação, teste de Engenharia para Forçar Abertura (bônus de item da bomba no ataque, se houver, vale no teste). Sempre quebra o objeto. Sucesso crítico vira sucesso.',
    actionType: 'two',
    sourcePage: 133,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=118',
  }),
  f({
    id: 'feat-demolitionist-controlled-blast',
    name: 'Explosão Controlada',
    originalName: 'Controlled Blast',
    level: 8,
    archetypeId: 'archetype-demolitionist',
    rarity: 'uncommon',
    prereqId: DED_DEM.id,
    prereqName: DED_DEM.name,
    description:
      'Se tiver Bombas Direcionais, pode usá-las com Preparar Explosivos. Se tiver a descoberta de campo de bombardeiro, aplique o respingo extra a uma bomba e a área aumentada de Respingo Expandido a todas.',
    sourcePage: 133,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=118',
  }),
  f({
    id: 'feat-demolitionist-collapse-wall',
    name: 'Derrubar Parede',
    originalName: 'Collapse Wall',
    level: 12,
    archetypeId: 'archetype-demolitionist',
    rarity: 'uncommon',
    prereqId: DED_DEM.id,
    prereqName: DED_DEM.name,
    extraPrereq: [
      {
        kind: 'text',
        label:
          'Você está a até 9 m de bombas que preparou numa parede ou superfície vertical',
      },
    ],
    description:
      'Detone as bombas. Se o dano reduzir os PV da parede abaixo do limiar de quebrado, a criatura sofre concussão igual ao dano causado à parede (Reflexos básico; CD de classe ou de magia, a maior). Falha: 1 Interagir para se desenterrar; falha crítica: 2.',
    actionType: 'reaction',
    trigger: 'Uma criatura entra na área de respingo das bombas.',
    sourcePage: 133,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=3244',
  }),
]

const fireworkTechnicianArchetypeFeats: Feat[] = [
  f({
    id: DED_FW.id,
    name: DED_FW.name,
    originalName: 'Firework Technician Dedication',
    level: 2,
    archetypeId: 'archetype-firework-technician',
    isDedication: true,
    rarity: 'uncommon',
    extraPrereq: [
      { kind: 'skillRank', skillId: 'crafting', rank: 'trained' },
      { kind: 'text', label: 'Treinado em Ofício; acesso Tian Xia ou Vudra (PFS) ou concessão do MJ' },
    ],
    description:
      'Treinado em Conhecimento de Fogos de Artifício, ou perito se já era treinado. Alquimia rápida: até 4 frascos versáteis pirotécnicos (traço fogo, dano de fogo) nas preparações; só para arremessar, Lançar Fogos ou criar consumíveis de fogos. CD de Lançar Fogos = CD de classe ou de magia, a maior. Cometas (linha 18 m de luz; pode Apontar), Flor (emanação 6 m, Fortitude ou ofuscado) e Saudação (audível; ajuda aliado fascinado ou confuso). Você escolhe o efeito; o motor não escolhe o truque.',
    effects: [
      { kind: 'lore', loreName: 'Fogos de Artifício', rank: 'trained' },
      {
        kind: 'specialAbility',
        name: 'Lançar Fogos',
        actionType: 'one',
        description:
          'Custa 1 frasco versátil. Cometa, flor ou saudação. 4 frascos pirotécnicos/dia. Se já treinado na lore, trate como perito.',
      },
    ],
    sourcePage: 134,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=119',
  }),
  f({
    id: 'feat-firework-technician-coughing-dragon',
    name: 'Exibição do Dragão Tosse',
    originalName: 'Coughing Dragon Display',
    level: 4,
    archetypeId: 'archetype-firework-technician',
    rarity: 'uncommon',
    prereqId: DED_FW.id,
    prereqName: DED_FW.name,
    description:
      '2 ações: escolha efeitos auditivos ou visuais e tente contrapor um ou mais na emanação de 18 m (sucesso suprime até o início do seu próximo turno). Modificador de contraposto = Conhecimento de Fogos; posto = metade do nível (para cima). 3 ações e 2 frascos: contrapõe os dois tipos.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Dragão Tosse',
        actionType: 'two',
        description: 'Contrapor auditivo ou visual numa emanação de 18 m.',
      },
    ],
    sourcePage: 134,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=119',
  }),
  f({
    id: 'feat-firework-technician-expert-crafter',
    name: 'Artesão Perito de Fogos',
    originalName: 'Expert Fireworks Crafter',
    level: 6,
    archetypeId: 'archetype-firework-technician',
    rarity: 'uncommon',
    prereqId: DED_FW.id,
    prereqName: DED_FW.name,
    description: 'Frascos versáteis por dia passam a 5.',
    effects: [
      {
        kind: 'specialAbility',
        name: '5 frascos pirotécnicos',
        description: 'Máximo diário de frascos versáteis = 5.',
      },
    ],
    sourcePage: 134,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=119',
  }),
  f({
    id: 'feat-firework-technician-jumping-jenny',
    name: 'Exibição da Jenny Saltitante',
    originalName: 'Jumping Jenny Display',
    level: 8,
    archetypeId: 'archetype-firework-technician',
    rarity: 'uncommon',
    prereqId: DED_FW.id,
    prereqName: DED_FW.name,
    description:
      '1 ação: alvo voando a até 18 m. Até o início do seu próximo turno, cada Voar exige Acrobacia para Manobrar em Voo contra a CD de Lançar Fogos ou é interrompido. Se todos falharem, cai sem dano no fim do turno.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Jenny Saltitante',
        actionType: 'one',
        description: 'Perturba Voar de um alvo aéreo a 18 m.',
      },
    ],
    sourcePage: 134,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=119',
  }),
  f({
    id: 'feat-firework-technician-goblin-jubilee',
    name: 'Exibição do Jubileu Goblin',
    originalName: 'Goblin Jubilee Display',
    level: 10,
    archetypeId: 'archetype-firework-technician',
    rarity: 'uncommon',
    prereqId: DED_FW.id,
    prereqName: DED_FW.name,
    description:
      '3 ações (fogo, sônico, visual): explosão de 6 m a até 36 m. 3d6 fogo + 3d6 sônico e Fortitude; +1d6 de cada a cada 3 níveis. 2 frascos: +1d6 de cada (+2d6 no 16º). Sucesso crítico: nada. Sucesso: ofuscado e surdo até o fim do próximo turno, metade do dano. Falha: ofuscado e surdo 1 minuto, dano total. Falha crítica: cego 1 rodada, ofuscado e surdo 1 minuto, dobro.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Jubileu Goblin',
        actionType: 'three',
        description: 'Explosão 6 m: fogo + sônico e Fortitude (ofuscado/surdo/cego).',
      },
    ],
    sourcePage: 134,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=119',
  }),
  f({
    id: 'feat-firework-technician-banshee-cry',
    name: 'Exibição do Grito da Banshee',
    originalName: 'Banshee Cry Display',
    level: 12,
    archetypeId: 'archetype-firework-technician',
    rarity: 'uncommon',
    prereqId: DED_FW.id,
    prereqName: DED_FW.name,
    description:
      'Vontade: sucesso = nada; falha = precisa de 1 ação extra na atividade disparadora ou ela é interrompida; falha crítica = a ação é interrompida.',
    actionType: 'reaction',
    trigger:
      'Uma criatura a até 9 m Conjura uma Magia ou Ativa um Item com Ativação de concentração.',
    sourcePage: 134,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=119',
  }),
]

const trickDriverArchetypeFeats: Feat[] = [
  f({
    id: DED_TD.id,
    name: DED_TD.name,
    originalName: 'Trick Driver Dedication',
    level: 2,
    archetypeId: 'archetype-trick-driver',
    isDedication: true,
    rarity: 'uncommon',
    extraPrereq: [{ kind: 'text', label: 'Treinado em Conhecimento de Condução' }],
    description:
      'Perito em Conhecimento de Condução (mestre no 7º, lendário no 15º). Pode usar essa lore no lugar de Pilotagem ou Náutico para pilotar. Pode usar Destreza no lugar de Inteligência nesses testes.',
    effects: [
      { kind: 'lore', loreName: 'Condução', rank: 'expert' },
      {
        kind: 'specialAbility',
        name: 'Piloto versátil',
        description:
          'Condução no lugar de Pilotagem/Náutico; DES no lugar de INT. Mestre no 7º, lendário no 15º.',
      },
    ],
    sourcePage: 55,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=112',
  }),
  f({
    id: 'feat-trick-driver-express-driver',
    name: 'Condutor Expresso',
    originalName: 'Express Driver',
    level: 2,
    archetypeId: 'archetype-trick-driver',
    rarity: 'uncommon',
    prereqId: DED_TD.id,
    prereqName: DED_TD.name,
    description:
      'Ao calcular o deslocamento de viagem do dia no veículo, teste de Condução (CD típica da pilotagem ou do ambiente). Sucesso: +50% na velocidade de viagem. Sem efeito em encontros.',
    sourcePage: 55,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=112',
  }),
  f({
    id: 'feat-trick-driver-power-slide',
    name: 'Derrapagem Controlada',
    originalName: 'Power Slide',
    level: 4,
    archetypeId: 'archetype-trick-driver',
    rarity: 'uncommon',
    prereqId: DED_TD.id,
    prereqName: DED_TD.name,
    description:
      '1 a 3 ações: Dirija com −2 no teste, ganhando os efeitos de Dirigir pelo mesmo número de ações. No fim, se passar, vire até 90° (180° no crítico).',
    actionType: 'one',
    sourcePage: 55,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=112',
  }),
  f({
    id: 'feat-trick-driver-take-the-wheel',
    name: 'Pegar o Volante',
    originalName: 'Take the Wheel',
    level: 4,
    archetypeId: 'archetype-trick-driver',
    traits: ['Arquétipo', 'Ímpeto'],
    rarity: 'uncommon',
    prereqId: DED_TD.id,
    prereqName: DED_TD.name,
    extraPrereq: [
      { kind: 'text', label: 'Perito em Conhecimento de Condução; adjacente ao ponto de entrada do veículo' },
    ],
    description: 'Embarque e Assuma o Controle do veículo adjacente.',
    actionType: 'one',
    sourcePage: 55,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=3142',
  }),
  f({
    id: 'feat-trick-driver-push-it',
    name: 'Forçar o Motor',
    originalName: 'Push it',
    level: 7,
    archetypeId: 'archetype-trick-driver',
    rarity: 'uncommon',
    prereqId: DED_TD.id,
    prereqName: DED_TD.name,
    description:
      'Quando passa num teste de pilotagem, o veículo ganha +1,5 m de circunstância em todos os Deslocamentos até o fim do seu turno (+3 m no crítico).',
    sourcePage: 55,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=112',
  }),
  f({
    id: 'feat-trick-driver-roadkill',
    name: 'Atropelo',
    originalName: 'Roadkill',
    level: 10,
    archetypeId: 'archetype-trick-driver',
    rarity: 'uncommon',
    prereqId: DED_TD.id,
    prereqName: DED_TD.name,
    extraPrereq: [{ kind: 'text', label: 'Você está pilotando um veículo' }],
    description:
      'Ao Atropelar, pode usar sua CD de classe no lugar da CD de colisão. Pode Atropelar qualquer número de criaturas até um tamanho menor que o veículo, ou investir contra um alvo até o tamanho do veículo.',
    sourcePage: 55,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=3145',
  }),
  f({
    id: 'feat-trick-driver-drive-by-attack',
    name: 'Ataque de Passagem',
    originalName: 'Drive-By Attack',
    level: 12,
    archetypeId: 'archetype-trick-driver',
    rarity: 'uncommon',
    prereqId: DED_TD.id,
    prereqName: DED_TD.name,
    description:
      '1 a 3 ações: Dirija (efeitos de Dirigir pelo mesmo número de ações). Em qualquer ponto do movimento, Golpeie.',
    actionType: 'one',
    sourcePage: 55,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=112',
  }),
]

const crossbowInfiltratorArchetypeFeats: Feat[] = [
  f({
    id: DED_XB.id,
    name: DED_XB.name,
    originalName: 'Crossbow Infiltrator Dedication',
    level: 2,
    archetypeId: 'archetype-crossbow-infiltrator',
    isDedication: true,
    extraPrereq: [
      { kind: 'skillRank', skillId: 'stealth', rank: 'trained' },
      { kind: 'text', label: 'Treinado em Furtividade' },
    ],
    description:
      'Familiaridade com arco de manopla, besta de mão e besta de mão repetidora: a repetidora conta como marcial e o arco de manopla como simples. Perito nessas armas: especialização crítica. Saque do Infiltrador (1 ação, 1/rodada): Interaja para sacar uma dessas e Golpeie, ou Golpeie com besta de mão/repetidora já carregada e Interaja para guardá-la.',
    effects: [
      {
        kind: 'weaponFamiliarity',
        weapons: ['Gauntlet Bow', 'Hand Crossbow', 'Repeating Hand Crossbow'],
        martialAsSimple: false,
      },
      {
        kind: 'specialAbility',
        name: 'Saque do Infiltrador',
        actionType: 'one',
        description:
          '1/rodada. Sacar e Golpear, ou Golpear e guardar. Arco de manopla como simples; repetidora como marcial. Crítico especial se perito.',
      },
    ],
    sourceId: SOURCE_BATTLECRY_ID,
    sourcePage: 56,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=325',
  }),
  f({
    id: 'feat-crossbow-infiltrator-crescent-cross',
    name: 'Treino de Besta Crescente',
    originalName: 'Crescent Cross Training',
    level: 4,
    archetypeId: 'archetype-crossbow-infiltrator',
    prereqId: DED_XB.id,
    prereqName: DED_XB.name,
    description:
      'As duas configurações da besta crescente contam como simples. Feitos deste arquétipo que valem para arco de manopla também valem para ela (forma corpo a corpo como manopla). Spray Crescente (2 ações, ímpeto): até três Golpes à distância; pode trocar para a forma à distância de graça; Interaja de graça entre câmaras. Penalidade só sobe no fim.',
    effects: [
      {
        kind: 'weaponFamiliarity',
        weapons: ['Crescent Cross'],
        martialAsSimple: true,
      },
      {
        kind: 'specialAbility',
        name: 'Spray Crescente',
        actionType: 'two',
        description: 'Até 3 Golpes com a forma à distância da besta crescente.',
      },
    ],
    sourceId: SOURCE_BATTLECRY_ID,
    sourcePage: 56,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=325',
  }),
  f({
    id: 'feat-crossbow-infiltrator-repeating-training',
    name: 'Treino de Besta de Mão Repetidora',
    originalName: 'Repeating Hand Crossbow Training',
    level: 4,
    archetypeId: 'archetype-crossbow-infiltrator',
    prereqId: DED_XB.id,
    prereqName: DED_XB.name,
    description:
      'Acesso a bestas de mão repetidoras e bandoleiras repetidoras. Com Recarga em Movimento (ou similar), pode gastar 3 ações para recarregar um pente depois da outra ação (2 ações se o pente vier da bandoleira).',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Acesso a repetidora',
        description: 'Acesso a repeating hand crossbow e repeater bandolier.',
      },
    ],
    sourceId: SOURCE_BATTLECRY_ID,
    sourcePage: 56,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=325',
  }),
  f({
    id: 'feat-crossbow-infiltrator-dual-weapon-reload',
    name: 'Recarga com Duas Armas',
    originalName: 'Dual-Weapon Reload',
    level: 6,
    archetypeId: 'archetype-crossbow-infiltrator',
    prereqId: DED_XB.id,
    prereqName: DED_XB.name,
    description:
      'Empunhando duas armas de uma mão, uma em cada, não precisa de mão livre para recarregar a arma à distância de uma mão.',
    sourceId: SOURCE_PLAYER_CORE_ID,
    sourcePage: 141,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=325',
  }),
  f({
    id: 'feat-crossbow-infiltrator-infiltrators-reload',
    name: 'Recarga do Infiltrador',
    originalName: "Infiltrator's Reload",
    level: 6,
    archetypeId: 'archetype-crossbow-infiltrator',
    prereqId: DED_XB.id,
    prereqName: DED_XB.name,
    description:
      'Interaja para recarregar uma arma com familiaridade deste arquétipo e então Esconda-se, Furtive-se ou Abrigue-se.',
    actionType: 'one',
    sourceId: SOURCE_BATTLECRY_ID,
    sourcePage: 56,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=325',
  }),
  f({
    id: 'feat-crossbow-infiltrator-reloading-trick',
    name: 'Truque de Recarga',
    originalName: 'Reloading Trick',
    level: 6,
    archetypeId: 'archetype-crossbow-infiltrator',
    prereqId: DED_XB.id,
    prereqName: DED_XB.name,
    description:
      'Interaja para recarregar besta de mão ou arco de manopla e Golpeie à distância. Com Treino de Besta de Mão Repetidora, pode carregar um pente inteiro, mas só dispara um virote antes de emperrar.',
    actionType: 'one',
    sourceId: SOURCE_BATTLECRY_ID,
    sourcePage: 56,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=325',
  }),
  f({
    id: 'feat-crossbow-infiltrator-lethargy-poisoner',
    name: 'Envenenador de Letargia',
    originalName: 'Lethargy Poisoner',
    level: 8,
    archetypeId: 'archetype-crossbow-infiltrator',
    prereqId: DED_XB.id,
    prereqName: DED_XB.name,
    description:
      'Nas preparações, 1 dose de veneno da letargia (estupor se perito em Ofício; 2 doses se mestre, 3 se lendário). CD = CD de classe. Só você usa; expiram nas próximas preparações. O MJ pode negar se a área for estéril demais. Você não escolhe o veneno além do posto de Ofício.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Venenos diários',
        description: 'Letargia ou estupor conforme Ofício; CD de classe; só você.',
      },
    ],
    sourceId: SOURCE_BATTLECRY_ID,
    sourcePage: 57,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=325',
  }),
  f({
    id: 'feat-crossbow-infiltrator-assassination',
    name: 'Assassinato de Infiltração',
    originalName: 'Infiltration Assassination',
    level: 10,
    archetypeId: 'archetype-crossbow-infiltrator',
    prereqId: DED_XB.id,
    prereqName: DED_XB.name,
    description:
      'Golpe corpo a corpo com o arco de manopla como manopla. Se acertar, o alvo fica agarrado; então Golpe à distância com o arco (não dispara reações de ataque à distância). Se tiver veneno de ferimento, aplique no virote de graça antes do Golpe à distância.',
    actionType: 'two',
    sourceId: SOURCE_BATTLECRY_ID,
    sourcePage: 57,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=325',
  }),
  f({
    id: 'feat-crossbow-infiltrator-skirmish-strike',
    name: 'Golpe de Escaramuça',
    originalName: 'Skirmish Strike',
    level: 10,
    archetypeId: 'archetype-crossbow-infiltrator',
    prereqId: DED_XB.id,
    prereqName: DED_XB.name,
    description: 'Dê um Passo e então Golpeie, ou Golpeie e então Dê um Passo.',
    actionType: 'one',
    sourceId: SOURCE_PLAYER_CORE_ID,
    sourcePage: 158,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=325',
  }),
  f({
    id: 'feat-crossbow-infiltrator-unseen-shot',
    name: 'Tiro Invisível',
    originalName: 'Unseen Shot',
    level: 14,
    archetypeId: 'archetype-crossbow-infiltrator',
    prereqId: DED_XB.id,
    prereqName: DED_XB.name,
    description:
      'Na primeira vez por rodada que Golpear um alvo pelo qual você está não detectado ou despercebido, com arma de familiaridade deste arquétipo, fica oculto do alvo depois do ataque.',
    sourceId: SOURCE_BATTLECRY_ID,
    sourcePage: 57,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=325',
  }),
  f({
    id: 'feat-crossbow-infiltrator-blitz',
    name: 'Blitz do Infiltrador',
    originalName: "Infiltrator's Blitz",
    level: 16,
    archetypeId: 'archetype-crossbow-infiltrator',
    prereqId: DED_XB.id,
    prereqName: DED_XB.name,
    description:
      'Tente Escapar de efeito que o imobiliza. +3 m de circunstância no Deslocamento e Desloque-se até três vezes. Em cada Deslocamento, pode Golpear com arma de familiaridade deste arquétipo e Interagir para recarregar. Depois fica fatigado por 1 minuto.',
    actionType: 'three',
    sourceId: SOURCE_BATTLECRY_ID,
    sourcePage: 57,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=325',
  }),
]

export const archetypeFeatsGeneralRemaster8: Feat[] = [
  ...artilleristArchetypeFeats,
  ...demolitionistArchetypeFeats,
  ...fireworkTechnicianArchetypeFeats,
  ...trickDriverArchetypeFeats,
  ...crossbowInfiltratorArchetypeFeats,
]
