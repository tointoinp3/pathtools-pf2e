import type { ClassCatalogDefinition, ClassCatalogOption } from '@/types/class'
import type { SpecialAbilityDefinition } from '@/types/ancestry'
import { CLASS_COMMANDER_ID } from '../ids'
import { SOURCE_BATTLECRY_ID } from '../sources'
import { catalogOption } from './helpers'

const SRC = SOURCE_BATTLECRY_ID

function tactic(opts: {
  id: string
  name: string
  originalName: string
  category: 'mobility' | 'offensive' | 'expert' | 'master' | 'legendary'
  page: number
  actionType?: SpecialAbilityDefinition['actionType']
  description: string
  rulesSummary: string
  level?: number
}): ClassCatalogOption {
  const level =
    opts.level ??
    (opts.category === 'expert'
      ? 7
      : opts.category === 'master'
        ? 15
        : opts.category === 'legendary'
          ? 19
          : 1)
  return catalogOption({
    ...opts,
    level,
    sourcePage: opts.page,
  })
}

export const commanderTacticCatalog: ClassCatalogDefinition = {
  id: 'commander-tactics',
  classId: CLASS_COMMANDER_ID,
  label: 'Fólio de táticas',
  originalName: "Commander's Folio",
  description:
    'No 1º: 5 táticas de mobilidade ou ofensiva. 7º: +2 (pode ser especialista) e 4 preparadas. 15º: +2 (até mestre) e 5 preparadas. 19º: +2 (até lendária) e 6 preparadas. Feito Expansão Tática adiciona ao fólio sem aumentar o preparado. Táticas de AP ficam de fora.',
  kind: 'repertoire',
  unique: true,
  slotsByLevel: [
    { minLevel: 1, count: 5 },
    { minLevel: 7, count: 7 },
    { minLevel: 15, count: 9 },
    { minLevel: 19, count: 11 },
  ],
  categoryMinLevel: {
    mobility: 1,
    offensive: 1,
    expert: 7,
    master: 15,
    legendary: 19,
  },
  categoryLabels: {
    mobility: 'Mobilidade',
    offensive: 'Ofensiva',
    expert: 'Especialista (7º)',
    master: 'Mestre (15º)',
    legendary: 'Lendária (19º)',
  },
  preparedSlotsByLevel: [
    { minLevel: 1, count: 3 },
    { minLevel: 7, count: 4 },
    { minLevel: 15, count: 5 },
    { minLevel: 19, count: 6 },
  ],
  preparedFromPicks: true,
  preparedLabel: 'Táticas preparadas hoje',
  preparedDescription:
    'Nas preparações (ou 10 min de treino) você escolhe quais táticas do fólio o esquadrão ensaiou. Esquadrão: 2 + INT aliados (você conta sem ocupar vaga).',
  searchPlaceholder: 'Buscar tática…',
  options: [
    tactic({
      id: 'tactic-defensive-retreat',
      name: 'Retirada Defensiva',
      originalName: 'Defensive Retreat',
      category: 'mobility',
      page: 25,
      actionType: 'one',
      description: 'Recuo cuidadoso, longe do perigo.',
      rulesSummary:
        'Sinaliza o esquadrão na aura: cada um pode dar até 3 Passos (livre), sempre se afastando de ao menos 1 inimigo observado — só se aproxima se for o único caminho para a segurança.',
    }),
    tactic({
      id: 'tactic-gather-to-me',
      name: 'Reúnam-se a Mim!',
      originalName: 'Gather to Me!',
      category: 'mobility',
      page: 25,
      actionType: 'one',
      description: 'O time fecha formação na sua bandeira.',
      rulesSummary:
        'Sinaliza o esquadrão: cada um Distanciar como reação, terminando na aura do estandarte (ou o mais perto que o Deslocamento permitir). Vale escavar/escalar/voar/nadar se tiverem o deslocamento.',
    }),
    tactic({
      id: 'tactic-mountaineering-training',
      name: 'Treino de Montanhismo',
      originalName: 'Mountaineering Training',
      category: 'mobility',
      page: 25,
      actionType: 'one',
      description: 'Instrução para paredão e penhasco.',
      rulesSummary:
        'Até o fim do seu próximo turno, você e o esquadrão ganham Deslocamento de escalada de 6 m. Com esta tática preparada, usa Conhecimento de Guerra no lugar de Atletismo para Escalar.',
    }),
    tactic({
      id: 'tactic-naval-training',
      name: 'Treino Naval',
      originalName: 'Naval Training',
      category: 'mobility',
      page: 25,
      actionType: 'one',
      description: 'Instrução para água brava.',
      rulesSummary:
        'Até o fim do seu próximo turno, você e o esquadrão ganham Deslocamento de natação de 6 m. Com esta tática preparada, usa Guerra no lugar de Atletismo para Nadar.',
    }),
    tactic({
      id: 'tactic-passage-of-lines',
      name: 'Passagem de Linhas',
      originalName: 'Passage of Lines',
      category: 'mobility',
      page: 25,
      actionType: 'one',
      description: 'Unidade cansada recua; unidade fresca avança.',
      rulesSummary:
        'Na aura: cada um do esquadrão pode trocar de lugar com um aliado disposto adjacente (precisa caber). Deitado pode; agarrado/imobilizado não.',
    }),
    tactic({
      id: 'tactic-protective-screen',
      name: 'Tela Protetora',
      originalName: 'Protective Screen',
      category: 'mobility',
      page: 25,
      actionType: 'one',
      description: 'Técnica para proteger o mago de guerra.',
      rulesSummary:
        '1 aliado Distanciar (reação) rumo a outro na aura. Se terminar adjacente, o segundo não provoca reações ao conjurar ou atirar até o fim do próximo turno dele (ou até se afastar).',
    }),
    tactic({
      id: 'tactic-coordinating-maneuvers',
      name: 'Manobras Coordenadas',
      originalName: 'Coordinating Maneuvers',
      category: 'offensive',
      page: 26,
      actionType: 'one',
      description: 'Empurra o inimigo para o ângulo ruim.',
      rulesSummary:
        '1 aliado na aura: Passo livre. Se terminar ao lado de um oponente, pode Reposicionar como reação.',
    }),
    tactic({
      id: 'tactic-double-team',
      name: 'Dupla Equipe',
      originalName: 'Double Team',
      category: 'offensive',
      page: 26,
      actionType: 'two',
      description: 'Um posiciona, o outro esmaga.',
      rulesSummary:
        '1 aliado com oponente no alcance: Empurrar ou Reposicionar (livre). Se o alvo terminar adjacente a outro do esquadrão, o segundo Golpeia corpo a corpo como reação.',
    }),
    tactic({
      id: 'tactic-end-it',
      name: 'Acabem!',
      originalName: 'End it!',
      category: 'offensive',
      page: 26,
      actionType: 'two',
      description: 'Vitória já está na mão — o medo faz o resto.',
      rulesSummary:
        'Brandir, incapacitação. Requer superioridade numérica e alguém do time ter nocado um inimigo desde o seu último turno. Esquadrão na aura: Passo rumo a hostil. Hostis a 3 m: Vontade ou fogem 1 rodada (fuga + amedrontado 2 na falha crítica).',
    }),
    tactic({
      id: 'tactic-pincer-attack',
      name: 'Ataque de Pinça',
      originalName: 'Pincer Attack',
      category: 'offensive',
      page: 26,
      actionType: 'one',
      description: 'Formação para abrir flanco.',
      rulesSummary:
        'Esquadrão: Passo como reação. Quem terminar adjacente a um oponente deixa esse alvo desprevenido aos Golpes corpo a corpo seus e dos que responderam, até o seu próximo turno.',
    }),
    tactic({
      id: 'tactic-reload',
      name: 'Recarreguem!',
      originalName: 'Reload!',
      category: 'offensive',
      page: 26,
      actionType: 'one',
      description: 'O treino entra: próxima saraivada já.',
      rulesSummary:
        'Esquadrão: Interagir para recarregar como reação. Em arma de cerco, pode mandar Carregar.',
    }),
    tactic({
      id: 'tactic-shields-up',
      name: 'Escudos!',
      originalName: 'Shields Up!',
      category: 'offensive',
      page: 26,
      actionType: 'one',
      description: 'Defesa no sinal.',
      rulesSummary:
        'Na aura: Erguer Escudo como reação (ou aparar com arma de aparar). Quem tem o truque escudo pode conjurá-lo como reação.',
    }),
    tactic({
      id: 'tactic-strike-hard',
      name: 'Golpeiem Forte!',
      originalName: 'Strike Hard!',
      category: 'offensive',
      page: 26,
      actionType: 'two',
      description: 'Um aliado, um golpe, agora.',
      rulesSummary: '1 aliado na aura Golpeia como reação.',
    }),
    tactic({
      id: 'tactic-tactical-takedown',
      name: 'Derrubada Tática',
      originalName: 'Tactical Takedown',
      category: 'offensive',
      page: 26,
      actionType: 'two',
      description: 'Dois fecham e o chão recebe o inimigo.',
      rulesSummary:
        'Até 2 aliados na aura: Distanciar metade (reação). Se os dois terminarem adjacentes ao mesmo inimigo, Reflexos vs CD ou o alvo cai.',
    }),
    tactic({
      id: 'tactic-alley-oop',
      name: 'Passe Aéreo',
      originalName: 'Alley-oop',
      category: 'expert',
      page: 26,
      actionType: 'one',
      description: 'Consumível voa exatamente para quem precisa.',
      rulesSummary:
        '1 aliado na aura com consumível de 1 ação: joga (livre) para outro na aura, que pega e ativa como reação. Munição ativada pode ir para a arma compatível nessa reação.',
    }),
    tactic({
      id: 'tactic-buckle-cut-blitz',
      name: 'Blitz dos Cintos',
      originalName: 'Buckle-cut Blitz',
      category: 'expert',
      page: 26,
      actionType: 'two',
      description: 'Passam cortando cadarço e fivela.',
      rulesSummary:
        'Até 2 aliados: Distanciar (reação). Cada inimigo adjacente em algum ponto: Reflexos ou desajeitado 1 por 1 rodada (2 na falha crítica).',
    }),
    tactic({
      id: 'tactic-demoralizing-charge',
      name: 'Investida Desmoralizante',
      originalName: 'Demoralizing Charge',
      category: 'expert',
      page: 26,
      actionType: 'two',
      description: 'A carga coordenada vira medo.',
      rulesSummary:
        'Até 2 aliados: Distanciar rumo a inimigo (livre) e Golpear (reação) se terminarem adjacentes. Cada acerto: Vontade ou amedrontado 1 (2 na falha crítica). Mesmo alvo: um save só, com penalidade se os dois atacarem.',
    }),
    tactic({
      id: 'tactic-seek-and-destroy',
      name: 'Busquem e Destruam',
      originalName: 'Seek and Destroy',
      category: 'expert',
      page: 27,
      actionType: 'two',
      description: 'Achou o escondido, fura a fraqueza.',
      rulesSummary:
        'Até 2 aliados: Procurar (livre), depois reação para Apontar, Distanciar rumo ao observado ou Golpear. Precisão extra = metade do nível no próximo Golpe até o seu próximo turno contra quem ficou observado nesse Procurar.',
    }),
    tactic({
      id: 'tactic-slip-and-sizzle',
      name: 'Escorrega e Queima',
      originalName: 'Slip and Sizzle',
      category: 'expert',
      page: 27,
      actionType: 'two',
      description: 'Um derruba, o outro explode magia.',
      rulesSummary:
        '2 aliados: um adjacente ao oponente Derruba (reação); se conseguir, o outro conjura magia de dano de até 2 ações (reação) no alvo. Se gastou espaço/PF: lento 1 e sem reação no próximo turno.',
    }),
    tactic({
      id: 'tactic-stupefying-raid',
      name: 'Assalto Estupefaciente',
      originalName: 'Stupefying Raid',
      category: 'expert',
      page: 27,
      actionType: 'two',
      description: 'Manobra que deixa o inimigo atordoado da cabeça.',
      rulesSummary:
        'Até 2 aliados: Distanciar (reação). Inimigos adjacentes no caminho: Vontade ou estupefato 1 por 1 rodada (2 na falha crítica). Mental.',
    }),
    tactic({
      id: 'tactic-take-the-high-ground',
      name: 'Tomem o Terreno Alto',
      originalName: 'Take the High Ground',
      category: 'expert',
      page: 27,
      actionType: 'one',
      description: 'Um impulsiona o outro para o ponto alto.',
      rulesSummary:
        '1 aliado Distanciar (livre) rumo a outro. Se terminar adjacente, Saltar (reação) até 7,5 m horizontal ou 4,5 m vertical (12 m / 7,5 m se você for lendário em Guerra).',
    }),
    tactic({
      id: 'tactic-wait-for-it',
      name: 'Esperem…',
      originalName: 'Wait for It...',
      category: 'expert',
      page: 27,
      actionType: 'one',
      description: 'Guarda alta enquanto esperam o momento.',
      rulesSummary:
        'Até 2 aliados: enquanto Adiam ou Preparam, +1 de circunstância em CA e saves. Você pode dar 1 reação extra de Reações Treinadas só para a ação Preparada.',
    }),
    tactic({
      id: 'tactic-corpse-crenellation',
      name: 'Ameia Cadavérica',
      originalName: 'Corpse Crenellation',
      category: 'master',
      page: 27,
      actionType: 'two',
      description: 'O corpo do inimigo vira cobertura improvisada.',
      rulesSummary:
        'Até 2 aliados: Distanciar metade e Golpear (reação). Se o alvo for a 0 PV, o corpo dá cobertura menor até o seu próximo turno. Quem se Abriga pode Distanciar metade até o espaço do caído.',
    }),
    tactic({
      id: 'tactic-mirrored-wall',
      name: 'Muro Espelhado',
      originalName: 'Mirrored Wall',
      category: 'master',
      page: 27,
      actionType: 'two',
      description: 'Escudos polidos devolvem a luz nos olhos.',
      rulesSummary:
        '1×/10 min. Requer luz forte ou lanterna. Esquadrão pode Erguer Escudo. Depois, 1 com escudo erguido ofusca um inimigo a 18 m: Fortitude ou cego 1 rodada. Mais escudos: penalidade no save (máx. −4).',
    }),
    tactic({
      id: 'tactic-piranha-assault',
      name: 'Assalto Piranha',
      originalName: 'Piranha Assault',
      category: 'master',
      page: 27,
      actionType: 'one',
      description: 'Mil mordidas furam resistência.',
      rulesSummary:
        '1×/10 min. Designa 1 criatura na aura. Por 1 minuto, ataques do esquadrão ignoram resistência daquele tipo igual ao seu nível.',
    }),
    tactic({
      id: 'tactic-pop-drop-and-lock',
      name: 'Estoura, Derruba e Trava',
      originalName: 'Pop, Drop, and Lock',
      category: 'master',
      page: 27,
      actionType: 'two',
      description: 'Três ações diferentes no mesmo alvo.',
      rulesSummary:
        'Até 3 aliados com o mesmo inimigo no alcance: cada um, como reação, Golpeia, Derruba ou Agarra — cada ação só uma vez, em qualquer ordem.',
    }),
    tactic({
      id: 'tactic-ready-aim-fire',
      name: 'Apontar, Mirar, Fogo!',
      originalName: 'Ready, Aim, Fire!',
      category: 'master',
      page: 28,
      actionType: 'two',
      description: 'Saraivada no mesmo alvo.',
      rulesSummary:
        'Até 3 aliados: recarregar (livre) e Golpe à distância (reação) no inimigo escolhido. Truque de dano a 9 m+ pode substituir o Golpe.',
    }),
    tactic({
      id: 'tactic-roaring-charge',
      name: 'Investida Estrondosa',
      originalName: 'Roaring Charge',
      category: 'master',
      page: 28,
      actionType: 'two',
      description: 'Grito e carga que quebram a linha.',
      rulesSummary:
        '1×/10 min. Esquadrão: Distanciar até 2× rumo a inimigo (reação). Criaturas a 3 m no fim: Vontade (incapacitação, medo) — amedrontado 1/2/3+fuga.',
    }),
    tactic({
      id: 'tactic-the-bigger-they-are',
      name: 'Quanto Maior, Melhor',
      originalName: 'The Bigger They Are',
      category: 'master',
      page: 28,
      actionType: 'one',
      description: 'Juntos, o esquadrão derruba gigante.',
      rulesSummary:
        '1 aliado Reposiciona, Empurra ou Derruba. Cada outro adjacente a ele ou ao alvo ajuda (reação): +1 tamanho máximo e +1 de circunstância no teste (máx. +4).',
    }),
    tactic({
      id: 'tactic-bloody-guillotine',
      name: 'Guilhotina Sangrenta',
      originalName: 'Bloody Guillotine',
      category: 'legendary',
      page: 28,
      actionType: 'two',
      description: 'Combo para encerrar de vez.',
      rulesSummary:
        '1×/dia. Até 3 aliados: Distanciar metade rumo a 1 alvo (livre) e Derrubar ou Golpear (reação). A 1ª vez que um alvo deitado toma dano de Golpe desta tática: Fortitude ou morre (morte, incapacitação). Quem vê: Vontade ou enjoado.',
    }),
    tactic({
      id: 'tactic-cry-havoc',
      name: 'Gritem Caos!',
      originalName: 'Cry Havoc!',
      category: 'legendary',
      page: 28,
      actionType: 'three',
      description: 'O clangor abafa a guerra.',
      rulesSummary:
        'Esquadrão Distanciar até 2× rumo ao alvo (reação). Ao entrar adjacente a um inimigo: Fortitude básico ou 2d6 concussão + 2d6 sônico por participante. Imune 24 h depois. Surdo 1 rodada na falha crítica.',
    }),
    tactic({
      id: 'tactic-executioners-volley',
      name: 'Rajada do Carrasco',
      originalName: "Executioner's Volley",
      category: 'legendary',
      page: 28,
      actionType: 'two',
      description: 'Pelotão de fuzilamento.',
      rulesSummary:
        '1×/dia. Você e o esquadrão na aura: Golpe à distância (reação) no mesmo alvo; some o dano vs resistências. Se for vivo, os ataques ganham morte. Se morrer: outros inimigos na aura, Vontade ou amedrontados 2.',
    }),
    tactic({
      id: 'tactic-insta-ballista',
      name: 'Insta-Balista',
      originalName: 'Insta-Ballista',
      category: 'legendary',
      page: 29,
      actionType: 'two',
      description: 'Montam uma balista no grito e disparan.',
      rulesSummary:
        'Os aliados escolhidos ao preparar (levam 8 Bulk de peças) fecham formação (máx. 3 m entre si) e disparam: Golpe à distância com sua proficiência marcial, +item = número de ajudantes (máx. +4), 10d12 perfurante, alcance 60 m. Depois desmonta.',
    }),
    tactic({
      id: 'tactic-sanguine-revitalization',
      name: 'Revitalização Sanguínea',
      originalName: 'Sanguine Revitalization',
      category: 'legendary',
      page: 29,
      actionType: 'two',
      description: 'O sangue do inimigo reanima o esquadrão.',
      rulesSummary:
        '1×/dia. Aliados com arma/desarmado cortante ou perfurante: Distanciar metade (livre) e Golpear (reação). Se o alvo tomou dano e não é imune a sangramento: Fortitude ou 10 persistente (penalidade = acertos, máx. −4). Esquadrão a 6 m: cura 10d6.',
    }),
    tactic({
      id: 'tactic-valkyries-charge',
      name: 'Investida da Valquíria',
      originalName: "Valkyrie's Charge",
      category: 'legendary',
      page: 29,
      actionType: 'three',
      description: 'Desafiam a morte numa última carga.',
      rulesSummary:
        'Cura 80 PV no esquadrão na aura. Quem estava inconsciente a 0 PV pode Levantar e pegar armas (livre). Depois Distanciar até 2× rumo a inimigo (livre) e Golpear (reação) se chegar no alcance.',
    }),
  ].map((o) => ({ ...o, sourceId: SRC })),
}
