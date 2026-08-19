/** Destinos míticos Remaster (War of Immortals): Monarca Profetizado, Magia Selvagem (Wildspell). Sem Legacy. */
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

const DED_MONARCH = {
  id: 'feat-prophesied-monarch-dedication',
  name: 'Dedicação de Monarca Profetizado',
}
const DED_WILD = {
  id: 'feat-wildspell-dedication',
  name: 'Dedicação de Magia Selvagem',
}

const prophesiedMonarchArchetypeFeats: Feat[] = [
  f({
    id: DED_MONARCH.id,
    name: DED_MONARCH.name,
    originalName: 'Prophesied Monarch Dedication',
    level: 12,
    archetypeId: 'archetype-prophesied-monarch',
    isDedication: true,
    extraPrereq: [{ kind: 'text', label: 'Chamado mítico (mythic calling)' }],
    description:
      'Designe até cinco aliados como seus cavaleiros (você nomeia; o motor não escolhe). Enquanto você estiver consciente, o condenado deles não sobe acima de 3. Se um cavaleiro estiver em perigo mortal (morrendo inconsciente, preso numa fortaleza inimiga etc.), você recebe na hora uma visão do local e da condição. Graça Real (exploração, concentrar, linguístico, mental): 10 minutos com um cavaleiro condenado; Diplomacia ou Sociedade contra CD difícil do nível dele. Qualquer resultado: o cavaleiro Recentra se tiver reserva de foco; imune à Graça Real por 24 h. Sucesso crítico: condenado −2 (mín. 0). Sucesso: −1. Falha: não reduz. Cavaleiros e domínio (reino, navio, igreja, bosque…) são escolhas suas.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Cavaleiros designados',
        description:
          'Até 5 aliados. Você nomeia quem são. Condenado máximo 3 enquanto você estiver consciente; visão se estiverem em perigo mortal. O motor não escolhe os cavaleiros.',
      },
      {
        kind: 'specialAbility',
        name: 'Graça Real',
        actionType: 'passive',
        description:
          '10 min com um cavaleiro condenado. Diplomacia ou Sociedade vs CD difícil do nível dele. Recentra (se tiver foco) em qualquer resultado; imune 24 h. Crítico: condenado −2. Sucesso: −1. Você escolhe a perícia; o motor não escolhe.',
      },
    ],
    sourcePage: 134,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7403',
  }),
  f({
    id: 'feat-prophesied-monarch-bloom-of-health',
    name: 'Flor da Saúde',
    originalName: 'Bloom of Health',
    level: 14,
    archetypeId: 'archetype-prophesied-monarch',
    traits: ['Arquétipo', 'Mítico', 'Auditivo'],
    prereqId: DED_MONARCH.id,
    prereqName: DED_MONARCH.name,
    description:
      'Grito de reunião: todos os seus cavaleiros que ouvirem ganham cura acelerada igual à metade do seu nível por 1 minuto.',
    actionType: 'one',
    sourcePage: 135,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7404',
  }),
  f({
    id: 'feat-prophesied-monarch-decree-of-banishment',
    name: 'Decreto de Banimento',
    originalName: 'Decree of Banishment',
    level: 14,
    archetypeId: 'archetype-prophesied-monarch',
    traits: ['Arquétipo', 'Mítico', 'Auditivo', 'Incapacitação'],
    prereqId: DED_MONARCH.id,
    prereqName: DED_MONARCH.name,
    description:
      'Decreto contra um inimigo a 18 m que possa ouvir. Vontade contra a maior entre CD de classe e CD de magia: falha = gasta o próximo turno afastando-se o máximo possível (incluindo magia ou deslocamento especial). Se tentar voltar a 18 m de você na semana seguinte, nova Vontade ou o movimento falha e ações/espaços gastos se perdem. Ponto Mítico: criaturas amistosas e a terra num raio de 16 km rejeitam o alvo por 1 mês (−4 em Recolher Informações, Causar Impressão, Coagir e Subsistir). Se ele continuar na área, você ouve falar na próxima vez que encontrar um grupo amistoso de 10+ membros. Só um banimento mensal por vez; um novo encerra o anterior. Você escolhe o alvo; o motor não escolhe.',
    actionType: 'one',
    frequency: '1 vez por dia',
    sourcePage: 135,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7405',
  }),
  f({
    id: 'feat-prophesied-monarch-decree-of-prosperity',
    name: 'Decreto de Prosperidade',
    originalName: 'Decree of Prosperity',
    level: 14,
    archetypeId: 'archetype-prophesied-monarch',
    traits: ['Arquétipo', 'Mítico', 'Auditivo'],
    prereqId: DED_MONARCH.id,
    prereqName: DED_MONARCH.name,
    description:
      'Cavaleiros que ouvirem tratam falhas (não críticas) em testes de perícia que não sejam de ataque como sucessos por 1 minuto. Ponto Mítico: a inspiração se espalha a todos num raio de 16 km: +2 de status em Ganhar Renda e empregos do nível deles na região por 1 mês. Comida e pousada grátis na área; até 10 itens comuns de 3º nível ou menos pela metade do preço. O povo sabe que foi o seu decreto.',
    actionType: 'one',
    sourcePage: 135,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7406',
  }),
  f({
    id: 'feat-prophesied-monarch-might-of-the-realm',
    name: 'Poder do Reino',
    originalName: 'Might of the Realm',
    level: 14,
    archetypeId: 'archetype-prophesied-monarch',
    traits: ['Arquétipo', 'Mítico', 'Ímpeto'],
    prereqId: DED_MONARCH.id,
    prereqName: DED_MONARCH.name,
    description:
      'Golpeie um inimigo. Conta como dois ataques na penalidade de ataque múltiplo. Se acertar, + dano igual ao dobro do número de cavaleiros designados que você puder ver. Crítico: o alvo também fica enfraquecido 1 até o início do seu próximo turno. Você escolhe o alvo; o motor não escolhe.',
    actionType: 'two',
    sourcePage: 136,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7407',
  }),
  f({
    id: 'feat-prophesied-monarch-kneel-before-the-rightful-heir',
    name: 'Ajoelhem-se Diante do Herdeiro Legítimo',
    originalName: 'Kneel Before the Rightful Heir',
    level: 16,
    archetypeId: 'archetype-prophesied-monarch',
    traits: ['Arquétipo', 'Mítico', 'Auditivo', 'Linguístico', 'Mental', 'Visual'],
    prereqId: DED_MONARCH.id,
    prereqName: DED_MONARCH.name,
    description:
      'Inimigos a 12 m que possam vê-lo e ouvi-lo fazem Vontade contra a maior entre CD de classe e CD de magia. Depois, imunes por 24 h. Crítico: nada. Sucesso: 3d6 mental persistente. Falha: 6d6 mental persistente. Falha crítica: 6d6 e desajeitado 2 enquanto o persistente durar. O persistente só termina se a criatura Ficar Caída num lugar que você veja e não se Levantar até o próximo turno dela; ela sabe disso.',
    actionType: 'two',
    sourcePage: 136,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7408',
  }),
  f({
    id: 'feat-prophesied-monarch-my-kingdom-my-blood',
    name: 'Meu Reino, Meu Sangue',
    originalName: 'My Kingdom, My Blood',
    level: 16,
    archetypeId: 'archetype-prophesied-monarch',
    traits: ['Arquétipo', 'Mítico', 'Manipular'],
    prereqId: DED_MONARCH.id,
    prereqName: DED_MONARCH.name,
    description:
      'Ande (ou Cavar, Escalar, Voar, Nadar se tiver o deslocamento). Finca punho ou arma no chão: emanação de 18 m por 1 minuto. Quando um aliado na aura toma dano, você pode gastar a reação para tomar metade no lugar (sem suas resistências, fraquezas ou outras habilidades). Quando você toma dano, um aliado na aura pode fazer o mesmo. Termina se você cair a 0 PV.',
    actionType: 'two',
    sourcePage: 136,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7409',
  }),
  f({
    id: 'feat-prophesied-monarch-noble-sacrifice',
    name: 'Sacrifício Nobre',
    originalName: 'Noble Sacrifice',
    level: 16,
    archetypeId: 'archetype-prophesied-monarch',
    prereqId: DED_MONARCH.id,
    prereqName: DED_MONARCH.name,
    extraPrereq: [
      {
        kind: 'text',
        label: 'Um cavaleiro designado a 4,5 m tomaria dano de um Golpe inimigo',
      },
    ],
    description:
      'Gaste um Ponto Mítico. O cavaleiro Dá um Passo como ação livre; você Anda até o espaço que ele ocupava (ignora terreno difícil e maior). Você toma o dano disparador. Se tiver escudo erguido e Bloqueio com Escudo, pode usá-lo nesta habilidade. O inimigo cujo Golpe disparou fica desprevenido até o fim do seu próximo turno. Você escolhe o cavaleiro; o motor não escolhe.',
    actionType: 'reaction',
    trigger:
      'Um cavaleiro designado a 4,5 m de você tomaria dano de um Golpe inimigo.',
    sourcePage: 136,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7410',
  }),
  f({
    id: 'feat-prophesied-monarch-protect-the-royal-line',
    name: 'Proteger a Linhagem Real',
    originalName: 'Protect the Royal Line',
    level: 16,
    archetypeId: 'archetype-prophesied-monarch',
    prereqId: DED_MONARCH.id,
    prereqName: DED_MONARCH.name,
    description:
      'Atletismo para Reposicionar ou Empurrar um inimigo que o flanqueia. Se puder ver ao menos um cavaleiro designado, +2 de circunstância (+4 se um estiver adjacente). Sucesso vira crítico; se o teste já seria crítico, +1,5 m na distância. Você escolhe Reposicionar ou Empurrar e o alvo; o motor não escolhe.',
    actionType: 'one',
    sourcePage: 136,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7411',
  }),
  f({
    id: 'feat-prophesied-monarch-decree-of-execution',
    name: 'Decreto de Execução',
    originalName: 'Decree of Execution',
    level: 18,
    archetypeId: 'archetype-prophesied-monarch',
    traits: ['Arquétipo', 'Mítico', 'Auditivo', 'Incapacitação'],
    prereqId: DED_MONARCH.id,
    prereqName: DED_MONARCH.name,
    description:
      'Alvo a 18 m que possa ouvir faz Vontade contra a maior entre CD de classe e CD de magia. Depois, imune por 1 ano. Crítico: nada. Sucesso: 14º ou menos cai a 1 PV; 15º+ toma 50 de espírito. Falha: 14º ou menos morre na hora; 15º+ toma 50 de espírito (morre se isso o levar a 0 PV; senão fraqueza 20 a todo dano por 1 minuto). Falha crítica: como falha, e quem sobrevive fica atordoado 1 por 1 minuto. Ponto Mítico: remove o traço incapacitação. Você escolhe o alvo; o motor não escolhe.',
    actionType: 'three',
    sourcePage: 137,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7412',
  }),
  f({
    id: 'feat-prophesied-monarch-decree-of-war',
    name: 'Decreto de Guerra',
    originalName: 'Decree of War',
    level: 18,
    archetypeId: 'archetype-prophesied-monarch',
    traits: ['Arquétipo', 'Mítico', 'Auditivo'],
    prereqId: DED_MONARCH.id,
    prereqName: DED_MONARCH.name,
    description:
      'Cavaleiros que ouvirem podem gastar a reação para Andar até duas vezes direto a um inimigo e Golpear se estiver ao alcance. Ponto Mítico: todos num raio de 16 km sabem que a guerra chegou. Você e os cavaleiros têm comida, pousada e conserto de itens comuns grátis na área por 1 mês, e ao menos 10 minutos de aviso quando um grupo inimigo de mais de 10 criaturas vier na sua direção.',
    actionType: 'three',
    sourcePage: 137,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7413',
  }),
  f({
    id: 'feat-prophesied-monarch-fated-duel',
    name: 'Duelo Fatídico',
    originalName: 'Fated Duel',
    level: 18,
    archetypeId: 'archetype-prophesied-monarch',
    prereqId: DED_MONARCH.id,
    prereqName: DED_MONARCH.name,
    description:
      'Gaste um Ponto Mítico e escolha um oponente a 9 m (o motor não escolhe). Se aceitar, vocês ficam presos: nenhum se afasta mais de 9 m do outro; só se ferem mutuamente; ninguém mais os fere. Após 1 minuto sem um derrotar o outro, ambos ficam condenados 1; +1 por minuto extra até morrerem. Se recusar, você recupera o Ponto Mítico e pode Intimidação com proficiência mítica para Desmoralizar.',
    actionType: 'one',
    sourcePage: 137,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7414',
  }),
  f({
    id: 'feat-prophesied-monarch-sovereigns-blade',
    name: 'Lâmina do Soberano',
    originalName: "Sovereign's Blade",
    level: 18,
    archetypeId: 'archetype-prophesied-monarch',
    traits: ['Arquétipo', 'Mítico', 'Luz'],
    prereqId: DED_MONARCH.id,
    prereqName: DED_MONARCH.name,
    description:
      'Gaste um Ponto Mítico: contra-ataca automaticamente qualquer escuridão mágica de posto 7 ou menos. Cavaleiros que vejam a arma erguida podem gastar a reação para Andar até duas vezes direto a você; os adjacentes a você depois do movimento ganham +2 de status nos testes de ataque até o início do seu próximo turno.',
    actionType: 'two',
    sourcePage: 137,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7415',
  }),
  f({
    id: 'feat-prophesied-monarch-legacy-of-monarchs',
    name: 'Legado de Monarcas',
    originalName: 'Legacy of Monarchs',
    level: 20,
    archetypeId: 'archetype-prophesied-monarch',
    prereqId: DED_MONARCH.id,
    prereqName: DED_MONARCH.name,
    description:
      'Se você morrer, qualquer cavaleiro que tocar o cadáver pode assumir o manto (você e o cavaleiro escolhem; o motor não escolhe): em 10 minutos veste seu equipamento, troca modificadores de atributo, perícias e feitos pelos seus, e passa a ser você para todos os efeitos, mantendo só ancestralidade, herança e feitos de ancestralidade. Se você voltar à vida, pode retomar o manto (o cavaleiro reverte) ou viver outra vida, retreinando perícias e feitos com novo nome e identidade.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Manto do monarca',
        description:
          'O cavaleiro escolhe assumir. Você escolhe retomar ou não se voltar à vida. O motor não escolhe.',
      },
    ],
    sourcePage: 137,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7416',
  }),
  f({
    id: 'feat-prophesied-monarch-once-and-future',
    name: 'Outrora e Futuro',
    originalName: 'Once and Future',
    level: 20,
    archetypeId: 'archetype-prophesied-monarch',
    prereqId: DED_MONARCH.id,
    prereqName: DED_MONARCH.name,
    description:
      'Não morre senão de velhice enquanto um cavaleiro estiver vivo a 9 m: condenado/morrendo não sobe o bastante para matar; efeito que mataria na hora só reduz a 0 PV. A primeira vez por ano que morreria por outro motivo, volta à vida consciente com PV iguais ao dobro do nível e ganha um Ponto Mítico. Se realmente morrer e não voltar em 1 ano, reencarna criança num corpo novo onde ainda contam suas histórias. Não completa o Rio das Almas enquanto a memória mortal de você existir.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Outrora e futuro',
        description:
          'Imortal enquanto um cavaleiro vivo estiver a 9 m. 1ª morte do ano (exceto velhice): revive com PV = 2 × nível e +1 Ponto Mítico.',
      },
    ],
    sourcePage: 137,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7417',
  }),
]

const wildspellArchetypeFeats: Feat[] = [
  f({
    id: DED_WILD.id,
    name: DED_WILD.name,
    originalName: 'Wildspell Dedication',
    level: 12,
    archetypeId: 'archetype-wildspell',
    isDedication: true,
    extraPrereq: [
      { kind: 'text', label: 'Chamado mítico (mythic calling)' },
      {
        kind: 'text',
        label: 'Capacidade de conjurar magias a partir de espaços (spell slots)',
      },
    ],
    description:
      'Ganha a magia de foco surto de magia (spellsurge) da sua tradição de conjuração principal (você confirma a tradição se tiver mais de uma; o motor não escolhe). 2 ações, concentrar, mítico, posto 6. Aura (em geral 4,5 m). Ao conjurar, escolha um efeito e pode Sustentar para trocar ou Dissipar: Interferência (+2 de circunstância em salvaguardas contra efeitos mentais); Poço de Mana (aliados passam automaticamente no teste plano para Conjurar, ex. estupefato); Sobrepor Resistência (magias que afetem criatura na aura ignoram resistência igual ao seu nível, inclusive persistente e contínuo; não ignora imunidades); Proteção (dano de magias na aura reduzido pelo seu nível, inclusive persistente e contínuo). O efeito da aura é escolha sua a cada conjuração; o motor nunca escolhe.',
    effects: [
      { kind: 'focusPool', points: 1 },
      {
        kind: 'grantedFocusSpell',
        originalName: 'Spellsurge',
        label: 'Destino Magia Selvagem',
      },
      {
        kind: 'specialAbility',
        name: 'Surto de magia (spellsurge)',
        description:
          'Magia de foco da tradição principal. Ao conjurar, escolha Interferência, Poço de Mana, Sobrepor Resistência ou Proteção. Sustentar troca; Dissipar encerra. O motor não escolhe tradição nem o efeito.',
      },
    ],
    sourcePage: 138,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7418',
  }),
  f({
    id: 'feat-wildspell-extend-surge',
    name: 'Estender Surto',
    originalName: 'Extend Surge',
    level: 14,
    archetypeId: 'archetype-wildspell',
    traits: ['Arquétipo', 'Mítico', 'Concentrar'],
    prereqId: DED_WILD.id,
    prereqName: DED_WILD.name,
    description:
      'Até o início do seu próximo turno, o raio da aura de surto de magia vai a 9 m. Ponto Mítico: 18 m até o início do próximo turno, depois 9 m pelo resto da magia.',
    actionType: 'one',
    sourcePage: 139,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7419',
  }),
  f({
    id: 'feat-wildspell-invigorating-surge',
    name: 'Surto Revigorante',
    originalName: 'Invigorating Surge',
    level: 14,
    archetypeId: 'archetype-wildspell',
    traits: ['Arquétipo', 'Mítico', 'Concentrar'],
    prereqId: DED_WILD.id,
    prereqName: DED_WILD.name,
    description:
      'Uma criatura na aura de surto de magia ganha PV temporários iguais ao seu nível, enquanto permanecer na aura. Usar de novo cancela os anteriores. Ponto Mítico: até metade do seu nível em criaturas na aura. Você escolhe quem recebe; o motor não escolhe.',
    actionType: 'one',
    sourcePage: 139,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7420',
  }),
  f({
    id: 'feat-wildspell-mythic-heightening',
    name: 'Elevação Mítica',
    originalName: 'Mythic Heightening',
    level: 14,
    archetypeId: 'archetype-wildspell',
    traits: ['Arquétipo', 'Mítico', 'Concentrar', 'Forma de Magia'],
    prereqId: DED_WILD.id,
    prereqName: DED_WILD.name,
    description:
      'Gaste um Ponto Mítico. Se a próxima ação for Conjurar uma Magia, ela é elevada ao posto mais alto que você pode conjurar. Ataque e CD de magia com proficiência mítica. O espaço gasto não muda.',
    actionType: 'one',
    sourcePage: 139,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7421',
  }),
  f({
    id: 'feat-wildspell-spell-network',
    name: 'Rede de Magia',
    originalName: 'Spell Network',
    level: 14,
    archetypeId: 'archetype-wildspell',
    traits: ['Arquétipo', 'Mítico', 'Postura'],
    prereqId: DED_WILD.id,
    prereqName: DED_WILD.name,
    description:
      'Nesta postura, um aliado na aura de surto de magia pode tratar outro aliado na aura como origem da magia (alcance e cobertura a partir daquele espaço). Aliados na aura estão ao alcance de toque uns dos outros. Magia que só afetaria o conjurador pode afetar outro aliado na aura. O aliado escolhe a origem e o alvo; o motor não escolhe.',
    actionType: 'free',
    sourcePage: 139,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7422',
  }),
  f({
    id: 'feat-wildspell-burning-surge',
    name: 'Surto Ardente',
    originalName: 'Burning Surge',
    level: 14,
    archetypeId: 'archetype-wildspell',
    prereqId: DED_WILD.id,
    prereqName: DED_WILD.name,
    description:
      'O disparador e as criaturas adjacentes tomam 1d6 por posto da magia (Vontade básica contra a maior entre CD de classe e CD de magia). Tipo = o da magia (você escolhe se houver vários; mental se a magia não causar dano). O efeito ganha o traço do dano. Ponto Mítico: CD com proficiência mítica; pode trocar o dano para ácido, frio, eletricidade ou fogo; quem falhar toma persistente do mesmo tipo igual ao posto da magia. Você escolhe o tipo se houver opção; o motor não escolhe.',
    actionType: 'reaction',
    trigger: 'Uma criatura Conjura uma Magia dentro da sua aura de surto de magia.',
    sourcePage: 139,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7423',
  }),
  f({
    id: 'feat-wildspell-imbue-spell',
    name: 'Imbuir Magia',
    originalName: 'Imbue Spell',
    level: 16,
    archetypeId: 'archetype-wildspell',
    traits: ['Arquétipo', 'Mítico', 'Concentrar'],
    prereqId: DED_WILD.id,
    prereqName: DED_WILD.name,
    description:
      'Ao terminar de Conjurar, em vez do efeito normal você imbui a energia num aliado adjacente ou na aura (gasta espaço/foco normalmente). Em até 1 hora o aliado libera com 1 ação (concentrar, manipular), sem gastar espaço. Atributos da magia (incluindo forma de magia) são os da sua conjuração; o aliado é o conjurador para origem e escolhas, e Sustenta se precisar. Não pode imbuir a si. Só uma magia imbuída por vez. Você escolhe o aliado; o motor não escolhe.',
    actionType: 'free',
    trigger: 'Você termina de Conjurar uma Magia.',
    sourcePage: 140,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7424',
  }),
  f({
    id: 'feat-wildspell-mystical-flare',
    name: 'Clarão Místico',
    originalName: 'Mystical Flare',
    level: 16,
    archetypeId: 'archetype-wildspell',
    traits: ['Arquétipo', 'Mítico', 'Concentrar', 'Luz', 'Visual'],
    prereqId: DED_WILD.id,
    prereqName: DED_WILD.name,
    description:
      'Criaturas na aura de surto de magia ficam ocultas, e as de fora ficam ocultas para as de dentro. Você ignora essa ocultação. Até o fim do seu próximo turno; Sustentar 1/rodada estende 1 rodada.',
    actionType: 'one',
    sourcePage: 140,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7425',
  }),
  f({
    id: 'feat-wildspell-rapid-switch',
    name: 'Troca Rápida',
    originalName: 'Rapid Switch',
    level: 16,
    archetypeId: 'archetype-wildspell',
    prereqId: DED_WILD.id,
    prereqName: DED_WILD.name,
    description:
      'Sustente surto de magia para escolher outro efeito da aura. Você escolhe o novo efeito (Interferência, Poço de Mana, Sobrepor Resistência ou Proteção); o motor não escolhe.',
    actionType: 'free',
    sourcePage: 140,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7426',
  }),
  f({
    id: 'feat-wildspell-recharging-transference',
    name: 'Transferência Recarregadora',
    originalName: 'Recharging Transference',
    level: 16,
    archetypeId: 'archetype-wildspell',
    traits: ['Arquétipo', 'Mítico', 'Concentrar'],
    prereqId: DED_WILD.id,
    prereqName: DED_WILD.name,
    description:
      'Gaste uma magia preparada, um espaço ou 1 Ponto de Foco e escolha um aliado adjacente ou na aura. Espaço: o aliado recupera um espaço gasto de posto igual ou menor. Foco: o aliado recupera 1 Ponto de Foco. Não concede acima do máximo do alvo. Não pode ser você. Um só espaço/ponto por uso. Você escolhe o que gastar e o aliado; o motor não escolhe.',
    actionType: 'one',
    sourcePage: 140,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7427',
  }),
  f({
    id: 'feat-wildspell-thundering-surge',
    name: 'Surto Trovejante',
    originalName: 'Thundering Surge',
    level: 16,
    archetypeId: 'archetype-wildspell',
    traits: ['Arquétipo', 'Mítico', 'Sônico', 'Forma de Magia'],
    prereqId: DED_WILD.id,
    prereqName: DED_WILD.name,
    description:
      'Se a próxima ação for Conjurar uma Magia, teste plano CD 5. Crítico: inimigos numa explosão de 3 m no alvo ou na área da magia tomam sônico igual ao dobro do nível (Fortitude básica contra a maior CD); falha = caído. Sucesso: sônico igual ao nível; falha crítica = caído. Falha: todas as criaturas numa explosão de 3 m em você tomam sônico igual ao nível; falha = caído.',
    actionType: 'one',
    sourcePage: 140,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7428',
  }),
  f({
    id: 'feat-wildspell-galvanize-spell',
    name: 'Galvanizar Magia',
    originalName: 'Galvanize Spell',
    level: 18,
    archetypeId: 'archetype-wildspell',
    traits: ['Arquétipo', 'Mítico', 'Concentrar', 'Forma de Magia'],
    prereqId: DED_WILD.id,
    prereqName: DED_WILD.name,
    extraPrereq: [{ kind: 'text', label: 'Aura de surto de magia ativa' }],
    description:
      'Gaste um Ponto Mítico. O surto de magia termina. Se a próxima ação for Conjurar uma Magia ao menos 2 postos abaixo do seu espaço mais alto, reduza as ações em 1 (mín. 1). Depois recupera na hora a magia ou o espaço gasto (parâmetros normais). Você escolhe a magia; o motor não escolhe.',
    actionType: 'free',
    frequency: '1 vez por dia',
    sourcePage: 141,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7429',
  }),
  f({
    id: 'feat-wildspell-mana-detonation',
    name: 'Detonação de Mana',
    originalName: 'Mana Detonation',
    level: 18,
    archetypeId: 'archetype-wildspell',
    prereqId: DED_WILD.id,
    prereqName: DED_WILD.name,
    description:
      'Ganha a magia de foco explosão arcana (arcane explosion): o corpo vira magia pura, explode (16d6 de força na emanação, Fortitude básica; falha = empurrado 3 m ou caído se não completar) e se reforma. Fica incorpóreo, imune a doença, veneno e precisão; resistência a todo dano igual ao nível (exceto força, espírito e Golpes com toque fantasma), dobrada contra não mágico. Não pode Golpear, Conjurar nem ações de manipular. Quem termina o turno adjacente toma 6d6 de força. Até Dissipar: volta à forma normal com PV máximos.',
    effects: [
      { kind: 'focusPool', points: 1 },
      {
        kind: 'grantedFocusSpell',
        originalName: 'Arcane Explosion',
        label: 'Destino Magia Selvagem',
      },
      {
        kind: 'specialAbility',
        name: 'Explosão arcana (arcane explosion)',
        description:
          'Magia de foco de 9º posto. Você escolhe quando Dissipar a forma. O motor não escolhe.',
      },
    ],
    sourcePage: 141,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7430',
  }),
  f({
    id: 'feat-wildspell-mythic-counter',
    name: 'Contragolpe Mítico',
    originalName: 'Mythic Counter',
    level: 18,
    archetypeId: 'archetype-wildspell',
    prereqId: DED_WILD.id,
    prereqName: DED_WILD.name,
    description:
      'Ao contra-atacar uma magia, pode gastar um Ponto Mítico para testar com proficiência mítica. Se o alvo do contra-ataque estiver na aura de surto de magia, falha crítica conta como falha.',
    sourcePage: 141,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7431',
  }),
  f({
    id: 'feat-wildspell-mystic-life-force',
    name: 'Força Vital Mística',
    originalName: 'Mystic Life Force',
    level: 20,
    archetypeId: 'archetype-wildspell',
    prereqId: DED_WILD.id,
    prereqName: DED_WILD.name,
    description:
      'Não morre senão de velhice enquanto estiver sob magia contínua ou na própria aura de surto de magia: condenado/morrendo não sobe o bastante para matar; efeito que mataria na hora só reduz a 0 PV. Se morrer, vira fonte mágica ligada a um aliado a até 1,6 km (você escolhe o aliado; o motor não escolhe). Esse aliado aprende o ritual fonte encarnada (embodied font). Até ser restaurado, 1/hora pode conjurar surto de magia centrado no escolhido (você faz as escolhas da magia e as ações permitidas por ela; nenhuma outra ação).',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Fonte mágica',
        description:
          'Você escolhe o aliado âncora. Continua escolhendo o efeito do surto de magia. O motor não escolhe.',
      },
    ],
    sourcePage: 141,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7432',
  }),
  f({
    id: 'feat-wildspell-surging-interference',
    name: 'Interferência Pulsante',
    originalName: 'Surging Interference',
    level: 20,
    archetypeId: 'archetype-wildspell',
    prereqId: DED_WILD.id,
    prereqName: DED_WILD.name,
    description:
      'Tente contra-atacar a magia. Se conseguir, recupera uma magia ou espaço de 8º posto ou menor à sua escolha. Ponto Mítico no contra-ataque bem-sucedido: em vez disso um espaço/magia de 9º. Você escolhe qual espaço recupera; o motor não escolhe.',
    actionType: 'reaction',
    trigger: 'Uma criatura Conjura uma Magia dentro da sua aura de surto de magia.',
    sourcePage: 141,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7433',
  }),
]

export const archetypeFeatsMythicRemaster4: Feat[] = [
  ...prophesiedMonarchArchetypeFeats,
  ...wildspellArchetypeFeats,
]
