import type { Feat } from '@/types/feat'
import { SOURCE_ACROPOLIS_ID, SOURCE_GATEWALKERS_PG_ID } from './sources'

/**
 * Myth Hunter e Fiery Rebirth (#216) + 17 feitos Desviantes do Gatewalkers PG Remastered.
 */
export const featsAcropolisPyre: Feat[] = [
  {
    id: 'feat-myth-hunter',
    name: 'Caçador de Mitos',
    originalName: 'Myth Hunter',
    level: 1,
    category: 'skill',
    traits: ['Geral', 'Perícia', 'Incomum'],
    rarity: 'uncommon',
    provenance: { type: 'official' },
    actionType: 'reaction',
    trigger: 'Você Recorda Conhecimento com sucesso para identificar uma criatura com o traço mítico',
    prerequisites: [
      { kind: 'text', label: 'treinado em Conhecimento de Herói-Deuses ou de Feras Lendárias' },
    ],
    description:
      'O próximo Golpe bem-sucedido contra a criatura dispara trata a resistência mítica dela como 2 menor (4 se perito no Conhecimento, 6 mestre, 8 lendário). Se o Golpe já ignoraria resistência mítica, causa +1d6 precisão no próximo acerto (1d8 perito, 1d10 mestre, 1d12 lendário).',
    sourceId: SOURCE_ACROPOLIS_ID,
    sourcePage: 82,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8006',
  },
  {
    id: 'feat-fiery-rebirth',
    name: 'Renascimento Flamejante',
    originalName: 'Fiery Rebirth',
    level: 4,
    category: 'mythic',
    traits: ['Fogo', 'Cura', 'Mítico', 'Incomum'],
    rarity: 'uncommon',
    provenance: { type: 'official' },
    actionType: 'reaction',
    trigger: 'Você recupera PV enquanto está inconsciente',
    prerequisites: [{ kind: 'text', label: 'Chamado mítico (mythic calling)' }],
    description:
      'Gasta 1 Ponto Mítico, volta à consciência, Levanta e recupera PV extras iguais ao nível. Então explode em chamas: dano de fogo igual ao dobro do nível em inimigos adjacentes (Reflexos básico contra CD de classe). Falha crítica: também empurrado 1,5 m para longe de você.',
    sourceId: SOURCE_ACROPOLIS_ID,
    sourcePage: 82,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8007',
  },
]

function deviant(opts: {
  id: string
  name: string
  originalName: string
  level: number
  description: string
  traits?: string[]
  actionType?: Feat['actionType']
  trigger?: string
  frequency?: string
  sourcePage: number
  aonUrl: string
  repeatable?: boolean
}): Feat {
  return {
    id: opts.id,
    name: opts.name,
    originalName: opts.originalName,
    level: opts.level,
    category: 'class',
    traits: opts.traits ?? ['Desviante', 'Mágico', 'Raro'],
    rarity: 'rare',
    provenance: { type: 'official' },
    description: opts.description,
    actionType: opts.actionType,
    trigger: opts.trigger,
    frequency: opts.frequency,
    repeatable: opts.repeatable,
    sourceId: SOURCE_GATEWALKERS_PG_ID,
    sourcePage: opts.sourcePage,
    aonUrl: opts.aonUrl,
  }
}

export const featsGatewalkersDeviant: Feat[] = [
  deviant({
    id: 'feat-deviant-awakened-power',
    name: 'Poder Desperto',
    originalName: 'Awakened Power',
    level: 4,
    traits: ['Desviante', 'Raro'],
    repeatable: true,
    sourcePage: 9,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8024',
    description:
      'Ganha um benefício de Despertar de um feito desviante de 4º nível ou menor. Especial: pode pegar várias vezes; cada vez, um feito desviante diferente de 4º ou menor.',
  }),
  deviant({
    id: 'feat-deviant-greater-awakened-power',
    name: 'Poder Desperto Maior',
    originalName: 'Greater Awakened Power',
    level: 10,
    traits: ['Desviante', 'Raro'],
    repeatable: true,
    sourcePage: 9,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8025',
    description:
      'Ganha um benefício de Despertar de um feito desviante de 10º nível ou menor. Especial: pode pegar várias vezes; cada vez, um feito diferente de 10º ou menor.',
  }),
  deviant({
    id: 'feat-deviant-blasting-beams',
    name: 'Feixes Detonadores',
    originalName: 'Blasting Beams',
    level: 2,
    traits: ['Attack', 'Desviante', 'Mágico', 'Raro'],
    actionType: 'one',
    sourcePage: 9,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8026',
    description:
      'Exige mão livre. Ataque contra criatura a 9 m: 1d6 de dano por cada 2 níveis (dobro no crítico).\n\nDespertar: atividade de 2 ações, linha de 18 m, Reflexos básico (sem rolagem de ataque).\n\nDespertar: feixes dos olhos (d4 em vez de d6, traço ágil, sem mão livre; os olhos precisam estar descobertos).',
  }),
  deviant({
    id: 'feat-deviant-consume-energy',
    name: 'Consumir Energia',
    originalName: 'Consume Energy',
    level: 2,
    actionType: 'reaction',
    trigger:
      'Um inimigo a 18 m usa uma habilidade com o traço do seu tipo de dano de desvio',
    sourcePage: 9,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8027',
    description:
      'Teste de contrapor o efeito disparador. Sucesso: PV temporários iguais ao dobro do posto contraposto, 1 minuto.\n\nDespertar: a próxima habilidade da classificação dragão aumenta alcance em 9 m ou cone/linha em 3 m (1 minuto).\n\nDespertar: até o fim do próximo turno, Golpes com uma arma ou desarmado escolhido causam +1d6 do tipo de energia consumida.',
  }),
  deviant({
    id: 'feat-deviant-storming-breath',
    name: 'Sopro Tempestuoso',
    originalName: 'Storming Breath',
    level: 6,
    actionType: 'two',
    sourcePage: 9,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8028',
    description:
      'Cone de 9 m: 4d6 de dano +1d6 por nível além do 6º, Reflexos básico.\n\nDespertar: falha crítica derruba caído.\n\nDespertar: Voa 4,5 m para trás em linha reta oposta ao sopro; esse movimento não dispara reações de movimento.',
  }),
  deviant({
    id: 'feat-deviant-propulsive-leap',
    name: 'Salto Propulsivo',
    originalName: 'Propulsive Leap',
    level: 10,
    actionType: 'one',
    sourcePage: 10,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8029',
    description:
      '1 minuto: deslocamento de voo igual ao Deslocamento ou 6 m (o maior). Sem chão sólido no fim do turno: novo teste de recuo (continua no ar se falhar, a menos que fique inconsciente).\n\nDespertar: +4,5 m de status no voo deste feito.\n\nDespertar: a primeira vez por rodada que Voar partindo do chão, adjacentes sofrem 1d4 por cada 2 níveis (Reflexos básico).',
  }),
  deviant({
    id: 'feat-deviant-overclock-senses',
    name: 'Sentidos Acelerados',
    originalName: 'Overclock Senses',
    level: 2,
    actionType: 'free',
    sourcePage: 10,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8031',
    description:
      'Você Procura. Depois: +2 circunstância na CA contra ataques à distância e em Reflexos até o início do próximo turno.\n\nDespertar: visão no escuro (ou visão verdadeira no 14º+) e Recordar Conhecimento livre após Procurar; não ganha os bônus de CA/Reflexos.\n\nDespertar: enquanto tiver os bônus, reação para forçar rerrolagem de um ataque à distância que o acertaria (infortúnio) ou de um Reflexos que falharia (fortuna); fica com o segundo resultado.',
  }),
  deviant({
    id: 'feat-deviant-unstable-gearshift',
    name: 'Câmbio Instável',
    originalName: 'Unstable Gearshift',
    level: 6,
    actionType: 'free',
    sourcePage: 10,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8032',
    description:
      '+3 m de status em todos os Deslocamentos até o fim do próximo turno. Nesse turno pode usar de novo: +1,5 m extra e prolonga 1 rodada, até não poder mais usar desvios.\n\nDespertar: ocultamento durante qualquer ação de movimento enquanto afetado.\n\nDespertar: ignora terreno difícil físico, não dispara armadilhas de peso/placa, e atravessa espaços inimigos sem Passar Rolando.',
  }),
  deviant({
    id: 'feat-deviant-lightspeed-assault',
    name: 'Assalto à Velocidade da Luz',
    originalName: 'Lightspeed Assault',
    level: 10,
    actionType: 'one',
    sourcePage: 11,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8033',
    description:
      'Avança até um inimigo e Golpeia. Se acertar, pode gastar +1 ação: Avançar e Golpear de novo; se o segundo acertar, +1 ação para um terceiro. Pode Cavar, Escalar, Voar ou Nadar no lugar de Avançar. Um só teste de recuo, independente das ações.\n\nDespertar: teleporta em vez de Avançar (traço teleporte).\n\nDespertar: gasta 1, 2 ou 3 ações de uma vez, escolhendo alvos; pode flanquear consigo mesmo; dano repetido no mesmo alvo soma para superar resistências.',
  }),
  deviant({
    id: 'feat-deviant-borrowed-ability',
    name: 'Habilidade Emprestada',
    originalName: 'Borrowed Ability',
    level: 2,
    traits: ['Desviante', 'Mágico', 'Mental', 'Raro'],
    actionType: 'one',
    sourcePage: 11,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8035',
    description:
      'Toque adjacente: escolhe uma perícia que acredita treinado+. Fica treinado nela por 1 minuto (perito no 12º se o alvo for). Se o alvo não tiver, o mestre escolhe a mais próxima. Alvo relutante faz Vontade: crítico resiste; sucesso — a cada turno cede a perícia ou faz novo recuo; falha — duração completa.\n\nDespertar: +1 circunstância numa salvaguarda (a mais alta do alvo); pode aplicar −1 na salvaguarda do alvo.\n\nDespertar: ganha os sentidos especiais do alvo (e perde os seus se o alvo não os tiver) pela duração.',
  }),
  deviant({
    id: 'feat-deviant-kinetic-dampening',
    name: 'Amortecimento Cinético',
    originalName: 'Kinetic Dampening',
    level: 6,
    actionType: 'one',
    sourcePage: 12,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8036',
    description:
      'Até o início do próximo turno: resistência 5 a dano físico (+5 no 10º e a cada 4 níveis). Golpes contra você não fazem som.\n\nDespertar: +1 ação para emanação de 4,5 m; você escolhe quem é afetado.\n\nDespertar: também resistência a fogo, eletricidade ou sônico (escolha).',
  }),
  deviant({
    id: 'feat-deviant-feed-the-void',
    name: 'Alimentar o Vazio',
    originalName: 'Feed the Void',
    level: 10,
    traits: ['Desviante', 'Extradimensional', 'Mágico', 'Mental', 'Raro', 'Espírito'],
    actionType: 'two',
    sourcePage: 12,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8037',
    description:
      'Cone de 18 m, Fortitude: crítico sem efeito; sucesso puxado 3 m; falha 6 m; falha crítica 9 m. Quem cair no seu espaço sofre 5d6 espírito (sem salvaguarda) e é cuspido num adjacente à sua escolha. +1d6 no 12º e a cada 2 níveis.\n\nDespertar: se alguém for puxado ao vazio, PV temporários iguais ao nível da criatura mais alta, 10 min.\n\nDespertar: os primeiros 9 m do cone viram gelo (terreno difícil) e escuridão (como _escuridão_ no posto metade do nível) até o início do próximo turno.',
  }),
  deviant({
    id: 'feat-deviant-high-speed-regeneration',
    name: 'Regeneração de Alta Velocidade',
    originalName: 'High-Speed Regeneration',
    level: 6,
    traits: ['Desviante', 'Cura', 'Mágico', 'Raro'],
    actionType: 'free',
    trigger: 'Seu turno começa',
    sourcePage: 13,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8040',
    description:
      'Recupera PV iguais ao dobro do nível. O mestre escolhe em segredo um tipo de energia ou material precioso; dano desse tipo faz a ferida fumegar até o fim do próximo turno (bloqueia este feito).\n\nDespertar: 1/dia, usar quando os PV iriam a 0 em vez do disparo usual; evita nocaute e fica com os PV recuperados.\n\nDespertar: +3 m de status no Deslocamento até o fim do turno.',
  }),
  deviant({
    id: 'feat-deviant-tectonic-stomp',
    name: 'Pisada Tectônica',
    originalName: 'Tectonic Stomp',
    level: 10,
    actionType: 'two',
    sourcePage: 13,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8041',
    description:
      'Emanação 9 m no chão: 1d6 concussão por cada 2 níveis, Reflexos básico; falha também caído.\n\nDespertar: até 3 blocos de pedra (1,5 m, CA 10, Dureza 8, PV = nível) em espaços desocupados não adjacentes; duram 1 min ou até pisar de novo.\n\nDespertar: falha crítica também atordoado 1.',
  }),
  deviant({
    id: 'feat-deviant-ghostly-grasp',
    name: 'Garra Fantasma (Desviante)',
    originalName: 'Ghostly Grasp (Deviant)',
    level: 2,
    actionType: 'one',
    sourcePage: 13,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8043',
    description:
      'Braço invisível a 4,5 m: pega objeto solto de 1 Bulk (deposita na mão livre ou aos pés) ou Interagir simples. +1 Bulk e +4,5 m a cada 5 níveis. Afeta incorpóreos.\n\nDespertar: 1 criatura no alcance; ataque contra CD de Fortitude (traço ataque); sucesso agarrado (crítico: restringido) 1 rodada ou até Escapar.\n\nDespertar: 1 criatura; ataque contra CD de Fortitude; sucesso move 1,5 m (crítico 3 m).',
  }),
  deviant({
    id: 'feat-deviant-enervating-wail',
    name: 'Uivo Enervante',
    originalName: 'Enervating Wail',
    level: 6,
    traits: ['Auditivo', 'Desviante', 'Mágico', 'Raro'],
    actionType: 'two',
    sourcePage: 13,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8044',
    description:
      'Emanação 6 m: vivos sofrem vazio (Fortitude básico) 4d6 +1d6 por nível além do 6º.\n\nDespertar: uivo psíquico silencioso (dano mental, Vontade, remove auditivo, adiciona mental).\n\nDespertar: sucesso (não crítico) enfraquecido 1 por 1 rodada; falha enfraquecido 1 por 1 min; falha crítica enfraquecido 2 por 1 min.',
  }),
  deviant({
    id: 'feat-deviant-distant-wandering',
    name: 'Errância Distante',
    originalName: 'Distant Wandering',
    level: 10,
    actionType: 'two',
    sourcePage: 13,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8045',
    description:
      'O corpo cai inconsciente; o espírito projeta-se: invisível, inaudível, não toca nem ataca nem conjura. Não é incorpóreo (não atravessa barreiras). Ação livre para voltar. No início do turno em forma de espírito, novo recuo (falha = volta).\n\nDespertar: voo e +6 m de status no Deslocamento em forma de espírito.\n\nDespertar: ao entrar, pode Recordar Conhecimento ou Procurar; acelerado (ação extra só para Recordar ou Procurar).',
  }),
]
