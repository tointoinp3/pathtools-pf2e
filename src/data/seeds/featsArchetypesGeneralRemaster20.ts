/** Gerais Remaster: Irmã da Erínia Dourada, Executor da Legião Pura, Arauto Mortal, Sacerdote Razmirano, Capuz do Vingador Ursino. Sem Legacy. */
import type { Feat, FeatSpellcastingAccess } from '@/types/feat'
import {
  SOURCE_DIVINE_MYSTERIES_ID,
  SOURCE_HELLFIRE_DISPATCHES_ID,
  SOURCE_PLAYER_CORE_2_ID,
  SOURCE_PLAYER_CORE_ID,
  SOURCE_TREASURE_VAULT_ID,
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
  repeatable?: boolean
  rarity?: Feat['rarity']
  ignoresDedicationLock?: boolean
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
    repeatable: opts.repeatable,
    ignoresDedicationLock: opts.ignoresDedicationLock,
    sourceId: opts.sourceId ?? SOURCE_HELLFIRE_DISPATCHES_ID,
    sourcePage: opts.sourcePage,
    aonUrl: opts.aonUrl,
  }
}

const DED_ERINYS = {
  id: 'feat-golden-erinys-dedication',
  name: 'Dedicação de Irmã da Erínia Dourada',
}
const STANCE_ERINYS = {
  id: 'feat-golden-erinys-stance',
  name: 'Postura da Erínia Dourada',
}
const DED_LEGION = {
  id: 'feat-pure-legion-enforcer-dedication',
  name: 'Dedicação de Executor da Legião Pura',
}
const DED_HERALD = {
  id: 'feat-mortal-herald-dedication',
  name: 'Dedicação de Arauto Mortal',
}
const HERALD_WEAPON = {
  id: 'feat-mortal-herald-heralds-weapon',
  name: 'Arma do Arauto',
}
const HERALD_FLASH = {
  id: 'feat-mortal-herald-flash-of-omnipresence',
  name: 'Lampejo de Onipresença',
}
const HERALD_SHIELD = {
  id: 'feat-mortal-herald-shield-the-faithful',
  name: 'Escudar os Fiéis',
}
const HERALD_PREMONITION = {
  id: 'feat-mortal-herald-premonition-of-clarity',
  name: 'Premonição de Clareza',
}
const DED_RAZMIR = {
  id: 'feat-razmiran-priest-dedication',
  name: 'Dedicação de Sacerdote Razmirano',
}
const DED_URSINE = {
  id: 'feat-ursine-avenger-dedication',
  name: 'Dedicação do Capuz do Vingador Ursino',
}
const FORM_URSINE = {
  id: 'feat-ursine-avenger-form',
  name: 'Forma do Vingador Ursino',
}
const GREAT_BEAR = {
  id: 'feat-ursine-avenger-great-bear',
  name: 'Grande Urso',
}

const HERALD_DOMAIN_SPELL: FeatSpellcastingAccess = {
  id: 'spellcasting-mortal-herald-domain',
  label: 'Magias de domínio de Arauto Mortal',
  style: 'focusOnly',
  tradition: 'divine',
  attributeId: 'wisdom',
  proficiencyRank: 'trained',
  classOriginalName: 'Mortal Herald',
  features: { focusPool: true },
}

const goldenErinysArchetypeFeats: Feat[] = [
  f({
    id: DED_ERINYS.id,
    name: DED_ERINYS.name,
    originalName: 'Sister of the Golden Erinys Dedication',
    level: 2,
    archetypeId: 'archetype-golden-erinys',
    isDedication: true,
    rarity: 'uncommon',
    extraPrereq: [
      {
        kind: 'text',
        label: 'Você é de Isger ou membro da Irmandade da Erínia Dourada',
      },
    ],
    description:
      'Conhecimento Adicional de Diabo (sobe em 3, 7 e 15). Você pode se santificar como profano (você escolhe; o motor não escolhe). Acesso à asp coil. Familiaridade com asp coil e flagelo (tratam-se como armas simples). Se for profano, Golpes com essas armas e desarmados ganham o traço profano. Especial: com Armamento Monástico, a asp coil ganha o traço monge para você.',
    effects: [
      { kind: 'lore', loreName: 'Diabo', rank: 'trained' },
      {
        kind: 'specialAbility',
        name: 'Conhecimento Adicional (Diabo)',
        description:
          'Sobe sozinho nos níveis 3, 7 e 15. Se já era treinado em Conhecimento de Diabo, ganhe outro Conhecimento Adicional à escolha (você nomeia; o motor não escolhe).',
      },
      {
        kind: 'textChoice',
        choiceId: 'golden-erinys-sanctification',
        options: [
          { id: 'unholy', label: 'Santificado profano' },
          { id: 'none', label: 'Sem santificação profana' },
        ],
        hint: 'Você pode se santificar como profano. O motor não escolhe.',
        abilityName: 'Santificação: {choice}',
        abilityDescription:
          'Se profano, Golpes com asp coil, flagelo e desarmados ganham o traço profano.',
      },
      {
        kind: 'weaponFamiliarity',
        weapons: ['Asp Coil', 'Scourge'],
        martialAsSimple: true,
        advancedAsMartial: true,
      },
      {
        kind: 'specialAbility',
        name: 'Acesso à asp coil',
        description:
          'Com Armamento Monástico, a asp coil ganha o traço monge para você.',
      },
    ],
    sourcePage: 32,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8929',
  }),
  f({
    id: 'feat-golden-erinys-eye-for-weakness',
    name: 'Olho para a Fraqueza',
    originalName: 'Eye for Weakness',
    level: 4,
    archetypeId: 'archetype-golden-erinys',
    prereqId: DED_ERINYS.id,
    prereqName: DED_ERINYS.name,
    description:
      'Ao Recordar Conhecimento com sucesso sobre uma criatura que você vê, aprende automaticamente se ela tem fraqueza a sagrado ou profano, além dos outros resultados. Sucesso crítico: a criatura fica desprevenida contra você até o fim do seu turno.',
    sourcePage: 109,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8931',
  }),
  f({
    id: STANCE_ERINYS.id,
    name: STANCE_ERINYS.name,
    originalName: 'Golden Erinys Stance',
    level: 4,
    archetypeId: 'archetype-golden-erinys',
    traits: ['Arquétipo', 'Postura'],
    prereqId: DED_ERINYS.id,
    prereqName: DED_ERINYS.name,
    description:
      'Nesta postura, pode fazer ataques desarmados presa da fúria: 1d6 perfurante, grupo briga, traços ágil, traidor, acuidade, impetuoso, não letal e desarmado. Crítico com Golpe corpo a corpo que cause dano perfurante: o alvo fica enjoado 1 (CD para remover = CD de classe), além de qualquer especialização crítica.',
    actionType: 'one',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Presa da fúria',
        actionType: 'one',
        description:
          '1d6 perfurante, briga; ágil, traidor, acuidade, impetuoso, não letal, desarmado. Crítico perfurante corpo a corpo: enjoado 1 (CD de classe).',
      },
    ],
    sourcePage: 109,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8930',
  }),
  f({
    id: 'feat-golden-erinys-fiendish-brand',
    name: 'Marca Infernal',
    originalName: 'Fiendish Brand',
    level: 6,
    archetypeId: 'archetype-golden-erinys',
    traits: ['Arquétipo', 'Divino', 'Profano'],
    prereqId: DED_ERINYS.id,
    prereqName: DED_ERINYS.name,
    description:
      'Golpeie com arma ou desarmado que cause dano perfurante ou cortante. Se acertar e causar dano, o alvo sofre 1d6 de sangramento persistente com o traço profano. Enquanto o sangramento durar, ao conjurar magia sagrada a criatura precisa passar num teste plano CD 5 ou a magia é interrompida.',
    actionType: 'two',
    sourcePage: 109,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8932',
  }),
  f({
    id: 'feat-golden-erinys-vengeance-strike',
    name: 'Golpe de Vingança',
    originalName: 'Vengeance Strike',
    level: 6,
    archetypeId: 'archetype-golden-erinys',
    prereqId: DED_ERINYS.id,
    prereqName: DED_ERINYS.name,
    description:
      'Golpeie corpo a corpo o inimigo disparador. Se acertar e causar dano, ele fica desprevenido contra você até o fim do seu próximo turno.',
    actionType: 'reaction',
    trigger: 'Um inimigo causa dano a você e está no seu alcance.',
    sourcePage: 109,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8933',
  }),
  f({
    id: 'feat-golden-erinys-cruel-piercing',
    name: 'Perfuração Cruel',
    originalName: 'Cruel Piercing',
    level: 8,
    archetypeId: 'archetype-golden-erinys',
    prereqId: STANCE_ERINYS.id,
    prereqName: STANCE_ERINYS.name,
    description:
      'Na Postura da Erínia Dourada, ganha Perfurar a Carne (1 ação). Disparo: sua última ação causou dano perfurante a um inimigo no alcance. Atletismo para Agarrar o mesmo inimigo; a arma do disparo ganha o traço agarrar neste teste. Sucesso: também 1d8 perfurante persistente (2d8 no crítico). O persistente acaba quando o alvo deixa de estar agarrado ou restringido por você.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Perfurar a Carne',
        actionType: 'one',
        description:
          'Na postura. Agarrar com a arma do disparo (traço agarrar). Sucesso: 1d8 perfurante persistente (2d8 no crítico); acaba ao soltar.',
      },
    ],
    sourcePage: 109,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8934',
  }),
  f({
    id: 'feat-golden-erinys-promise-of-pain',
    name: 'Promessa de Dor',
    originalName: 'Promise of Pain',
    level: 10,
    archetypeId: 'archetype-golden-erinys',
    traits: ['Arquétipo', 'Auditivo', 'Concentrar', 'Divino', 'Linguístico', 'Mental', 'Não letal'],
    prereqId: DED_ERINYS.id,
    prereqName: DED_ERINYS.name,
    description:
      'Escolha um inimigo enjoado que você vê a até 36 m. Ele sofre 10d4 de dano mental com salvaguarda básica de Vontade contra a maior entre CD de classe e CD de magia. No 12º nível e a cada 2 níveis, +2d4. Você escolhe o alvo; o motor não escolhe.',
    actionType: 'one',
    sourcePage: 109,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8935',
  }),
  f({
    id: 'feat-golden-erinys-wrathful-presence',
    name: 'Presença Irada',
    originalName: 'Wrathful Presence',
    level: 12,
    archetypeId: 'archetype-golden-erinys',
    traits: ['Arquétipo', 'Aura', 'Divino', 'Emoção', 'Medo', 'Mental'],
    prereqId: DED_ERINYS.id,
    prereqName: DED_ERINYS.name,
    description:
      'Aura de 9 m por 1 minuto ou até Dispensar. Você e aliados na aura ganham +3 de status no dano de Golpes. Inimigos que terminem o turno na aura não podem reduzir assustado abaixo de 1.',
    actionType: 'two',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Aura da ira (9 m, 1 minuto)',
        actionType: 'two',
        description:
          '+3 de status no dano de Golpes para você e aliados. Inimigos na aura: assustado mínimo 1.',
      },
    ],
    sourcePage: 109,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8936',
  }),
  f({
    id: 'feat-golden-erinys-fuse-stance',
    name: 'Postura Fundida',
    originalName: 'Fuse Stance',
    level: 18,
    archetypeId: 'archetype-golden-erinys',
    prereqId: DED_ERINYS.id,
    prereqName: DED_ERINYS.name,
    extraPrereq: [{ kind: 'text', label: 'Pelo menos duas posturas' }],
    description:
      'Ao pegar este feito, escolha duas posturas que você conhece e combine-as numa postura fundida com nome único. Ao entrar nela, ganha os efeitos das duas, inclusive requisitos e restrições. Se ambas concedem ataques especiais, você ganha todos. Se uma restringe a um ataque (como Postura da Garça), obedeça. Restrições incompatíveis: o MJ decide ou impede a fusão. Você escolhe as posturas e o nome; o motor não escolhe.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Postura fundida',
        description:
          'Escolha duas posturas e dê um nome. O motor não escolhe.',
      },
    ],
    sourceId: SOURCE_PLAYER_CORE_2_ID,
    sourcePage: 126,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=6039',
  }),
]

const pureLegionEnforcerArchetypeFeats: Feat[] = [
  f({
    id: DED_LEGION.id,
    name: DED_LEGION.name,
    originalName: 'Pure Legion Enforcer Dedication',
    level: 6,
    archetypeId: 'archetype-pure-legion-enforcer',
    isDedication: true,
    rarity: 'uncommon',
    extraPrereq: [{ kind: 'text', label: 'Membro da Legião Pura' }],
    description:
      'Treinado em Intimidação e Religião (perito se já for treinado na perícia). Se já for perito nas duas, fique treinado numa perícia à escolha (você escolhe; o motor não escolhe). Ganha Reconhecer Magia. Ao reconhecer magia divina, sempre aprende que é divina e ganha +2 de circunstância no teste de Religião. Éditos: confiscá-los, conter ou destruir objetos divinos em Rahadoum; expulsar conjuradores divinos de Rahadoum. Anátema: usar habilidades, itens ou magias divinas; permitir proselitismo em Rahadoum; cultuar uma divindade. Violar anátema perde os benefícios até rededicar-se (em geral 20 po × nível e 1 dia sem magia divina).',
    effects: [
      { kind: 'skillRank', skillId: 'intimidation', rank: 'trained', bumpIfAlready: true },
      { kind: 'skillRank', skillId: 'religion', rank: 'trained', bumpIfAlready: true },
      {
        kind: 'circumstanceBonus',
        value: 2,
        appliesTo: 'Religião para Reconhecer Magia divina',
      },
      {
        kind: 'specialAbility',
        name: 'Reconhecer Magia',
        description:
          'Ganha o feito Reconhecer Magia. Magia divina: sempre identifica a tradição divina. Se já era perito em Intimidação e Religião, fique treinado numa perícia à escolha (o motor não escolhe).',
      },
      {
        kind: 'specialAbility',
        name: 'Éditos e anátema da Legião Pura',
        description:
          'Violar anátema perde os benefícios do arquétipo até rededicar-se (doação típica 20 po × nível e 1 dia sem magia divina).',
      },
    ],
    sourcePage: 60,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8891',
  }),
  f({
    id: 'feat-pure-legion-enforcer-godless-healing',
    name: 'Cura Sem Deuses',
    originalName: 'Godless Healing',
    level: 2,
    archetypeId: 'archetype-pure-legion-enforcer',
    traits: ['Arquétipo', 'Geral', 'Perícia'],
    prereqId: DED_LEGION.id,
    prereqName: DED_LEGION.name,
    extraPrereq: [
      { kind: 'feat', featId: 'feat-battle-medicine', featName: 'Medicina de Combate' },
      { kind: 'text', label: 'Não pode ter divindade padroeira' },
    ],
    description:
      'Recupera +5 PV de um sucesso em Tratar Ferimentos ou Medicina de Combate em você. Depois que você ou um aliado usa Medicina de Combate em você, a imunidade temporária dura só 1 hora (em vez de 1 dia).',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Cura sem deuses',
        description:
          '+5 PV de Tratar Ferimentos ou Medicina de Combate em você. Imunidade à Medicina de Combate: 1 hora.',
      },
    ],
    sourcePage: 60,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8888',
  }),
  f({
    id: 'feat-pure-legion-enforcer-mortal-healing',
    name: 'Cura Mortal',
    originalName: 'Mortal Healing',
    level: 2,
    archetypeId: 'archetype-pure-legion-enforcer',
    traits: ['Arquétipo', 'Geral', 'Perícia'],
    prereqId: DED_LEGION.id,
    prereqName: DED_LEGION.name,
    extraPrereq: [
      { kind: 'skillRank', skillId: 'medicine', rank: 'expert' },
      { kind: 'text', label: 'Você segue as Leis da Mortalidade' },
    ],
    description:
      'Ao obter sucesso em Tratar Ferimentos numa criatura que não recuperou PV de magia divina nas últimas 24 h, o sucesso vira crítico e restaura o valor correspondente.',
    sourcePage: 60,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8889',
  }),
  f({
    id: 'feat-pure-legion-enforcer-paragon-battle-medicine',
    name: 'Medicina de Combate Paragônica',
    originalName: 'Paragon Battle Medicine',
    level: 7,
    archetypeId: 'archetype-pure-legion-enforcer',
    traits: ['Arquétipo', 'Geral', 'Perícia'],
    rarity: 'uncommon',
    prereqId: DED_LEGION.id,
    prereqName: DED_LEGION.name,
    extraPrereq: [
      { kind: 'feat', featId: 'feat-battle-medicine', featName: 'Medicina de Combate' },
      { kind: 'skillRank', skillId: 'medicine', rank: 'master' },
    ],
    description:
      'Medicina de Combate bem-sucedida: também reduz enjoado, enfraquecido ou desajeitado em 1 (sem efeito se um efeito contínuo impõe desajeitado, como ampliar). Lendário em Medicina: pode reduzir assustado ou atordoado em 1. Com Cura Sem Deuses: pode reduzir estupefato ou drenado em 1. Com Cura Mortal, num alvo sem vitalidade/cura mágica nas últimas 24 h: reduz todas as condições disponíveis em 1 (2 se o teste foi crítico antes deste feito). Você escolhe qual condição reduzir; o motor não escolhe.',
    sourcePage: 60,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8890',
  }),
  f({
    id: 'feat-pure-legion-enforcer-edict-of-mortality',
    name: 'Édito da Mortalidade',
    originalName: 'Edict of Mortality',
    level: 8,
    archetypeId: 'archetype-pure-legion-enforcer',
    prereqId: DED_LEGION.id,
    prereqName: DED_LEGION.name,
    description:
      'Intimidação contra todos os inimigos a até 18 m que cultuam uma divindade, comparando com a CD de Vontade de cada um. Depois, imunes a este uso por 24 h. Sucesso crítico: assustado 2; até o início do seu próximo turno, conjurar magia divina exige teste plano CD 7 ou a ação é perdida. Sucesso: assustado 1 e CD 5.',
    actionType: 'two',
    sourcePage: 61,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8892',
  }),
  f({
    id: 'feat-pure-legion-enforcer-unassailable-enforcer',
    name: 'Executor Inexpugnável',
    originalName: 'Unassailable Enforcer',
    level: 8,
    archetypeId: 'archetype-pure-legion-enforcer',
    prereqId: DED_LEGION.id,
    prereqName: DED_LEGION.name,
    description:
      'Resistência a dano de espírito igual à metade do seu nível. Dobra se o efeito que causou o dano tiver o traço sagrado ou profano.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Resistência a espírito (metade do nível)',
        description: 'Dobra contra efeitos sagrados ou profanos.',
      },
    ],
    sourcePage: 61,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8893',
  }),
  f({
    id: 'feat-pure-legion-enforcer-no-gods-only-mortals',
    name: 'Sem Deuses, Só Mortais!',
    originalName: 'No Gods, Only Mortals!',
    level: 10,
    archetypeId: 'archetype-pure-legion-enforcer',
    prereqId: DED_LEGION.id,
    prereqName: DED_LEGION.name,
    description:
      'Ordene ao conjurador que pare. Intimidação para contrapor a magia disparadora, usando metade do seu nível (arredondada para cima) como posto de contraposição.',
    actionType: 'free',
    trigger: 'Você reconhece com sucesso uma magia com o traço divino.',
    frequency: '1 vez a cada 10 minutos',
    sourcePage: 61,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8894',
  }),
  f({
    id: 'feat-pure-legion-enforcer-traces-of-the-divine',
    name: 'Rastros do Divino',
    originalName: 'Traces of the Divine',
    level: 10,
    archetypeId: 'archetype-pure-legion-enforcer',
    prereqId: DED_LEGION.id,
    prereqName: DED_LEGION.name,
    description:
      '+2 de circunstância em Percepção para Buscar e Sobrevivência para Rastrear criaturas que conjuram magias divinas. Sucesso automático no teste plano para mirar criatura oculta que conjura magias divinas; o teste para criatura escondida que conjura magias divinas cai para CD 5.',
    effects: [
      {
        kind: 'circumstanceBonus',
        value: 2,
        appliesTo:
          'Percepção para Buscar e Sobrevivência para Rastrear conjuradores divinos',
      },
      {
        kind: 'specialAbility',
        name: 'Farejar o divino',
        description:
          'Teste plano automático contra oculto (conjurador divino); escondido CD 5.',
      },
    ],
    sourcePage: 61,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8895',
  }),
  f({
    id: 'feat-pure-legion-enforcer-shake-off-the-gods',
    name: 'Sacudir os Deuses',
    originalName: 'Shake Off the Gods',
    level: 12,
    archetypeId: 'archetype-pure-legion-enforcer',
    traits: ['Arquétipo', 'Concentrar'],
    prereqId: DED_LEGION.id,
    prereqName: DED_LEGION.name,
    extraPrereq: [
      {
        kind: 'text',
        label: 'Você está sob um efeito com o traço divino que exigiu salvaguarda',
      },
    ],
    description:
      'Nova salvaguarda contra o efeito exigido, com +2 de status. Não pode obter resultado pior que a salvaguarda original.',
    actionType: 'one',
    sourcePage: 61,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8896',
  }),
  f({
    id: 'feat-pure-legion-enforcer-throttle-the-divine',
    name: 'Estrangular o Divino',
    originalName: 'Throttle the Divine',
    level: 14,
    archetypeId: 'archetype-pure-legion-enforcer',
    prereqId: DED_LEGION.id,
    prereqName: DED_LEGION.name,
    description:
      'Enquanto tiver uma criatura agarrada, ela rola o teste plano para ações de manipular com o traço divino duas vezes e usa o pior. Cada vez que tenta essa ação agarrada, você aperta o aperto: dano de concussão igual a 2d6 + seu modificador de Força.',
    sourcePage: 61,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8897',
  }),
  f({
    id: 'feat-pure-legion-enforcer-wrath-against-the-divine',
    name: 'Ira Contra o Divino',
    originalName: 'Wrath Against the Divine',
    level: 16,
    archetypeId: 'archetype-pure-legion-enforcer',
    prereqId: DED_LEGION.id,
    prereqName: DED_LEGION.name,
    description:
      'Golpeie um inimigo que conjura magias divinas. O Golpe causa dois dados extras de dano da arma. O alvo faz Vontade contra sua CD de classe. Falha: perde a magia divina preparada de maior posto disponível ou o espaço não usado de maior posto para magia divina (aleatório se houver várias). Falha crítica: também não pode conjurar magias divinas até o início do seu próximo turno.',
    actionType: 'two',
    sourcePage: 61,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8898',
  }),
  f({
    id: 'feat-pure-legion-enforcer-repelling-enforcer',
    name: 'Executor Repelente',
    originalName: 'Repelling Enforcer',
    level: 18,
    archetypeId: 'archetype-pure-legion-enforcer',
    prereqId: DED_LEGION.id,
    prereqName: DED_LEGION.name,
    description:
      'Sempre que uma criatura que conjura magias divinas causa dano a você, ela sofre 5d6 de dano de espírito que ignora resistência a espírito (mas não imunidade).',
    sourcePage: 61,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8899',
  }),
  f({
    id: 'feat-pure-legion-enforcer-mortal-possibility',
    name: 'Possibilidade Mortal',
    originalName: 'Mortal Possibility',
    level: 20,
    archetypeId: 'archetype-pure-legion-enforcer',
    prereqId: DED_LEGION.id,
    prereqName: DED_LEGION.name,
    description:
      'Escolha uma perícia em que você é mestre: fica lendário nela. Ganha um feito de perícia à escolha dessa perícia. No primeiro sucesso do dia com essa perícia, +3 de status no próximo teste de qualquer perícia na hora seguinte. Você escolhe a perícia e o feito; o motor não escolhe.',
    effects: [
      {
        kind: 'skillRankChoice',
        choiceId: 'pure-legion-mortal-possibility',
        rank: 'legendary',
        requireRank: 'master',
        hint: 'Perícia em que você é mestre. Fica lendário. O motor não escolhe.',
      },
      {
        kind: 'specialAbility',
        name: 'Feito de perícia lendária',
        description:
          'Escolha um feito de perícia da perícia escolhida. Primeiro sucesso do dia: +3 de status no próximo teste de qualquer perícia na hora seguinte.',
      },
    ],
    sourcePage: 61,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8900',
  }),
]

/** Destino mítico: o slot do 12º e os de 14+ exigem o traço Mítico. */
function withMythicTrait(feat: Feat): Feat {
  if (feat.traits.some((t) => t === 'Mítico' || t === 'Mythic')) return feat
  const traits = [...feat.traits]
  const afterDedication = traits.indexOf('Dedicação')
  const afterArchetype = traits.indexOf('Arquétipo')
  const at =
    afterDedication >= 0
      ? afterDedication + 1
      : afterArchetype >= 0
        ? afterArchetype + 1
        : 0
  traits.splice(at, 0, 'Mítico')
  return { ...feat, traits }
}

const mortalHeraldArchetypeFeats: Feat[] = [
  f({
    id: DED_HERALD.id,
    name: DED_HERALD.name,
    originalName: 'Mortal Herald Dedication',
    level: 12,
    archetypeId: 'archetype-mortal-herald',
    isDedication: true,
    rarity: 'rare',
    extraPrereq: [
      { kind: 'text', label: 'Chamado mítico (mythic calling)' },
      {
        kind: 'text',
        label: 'Devoto de uma divindade específica; mestre em Religião ou na perícia divina da divindade',
      },
    ],
    description:
      'Você se torna arauto mortal da sua divindade (você escolhe a divindade; o motor não escolhe). Outros sentem a ligação. Fica preso à anátema da divindade. Santificação sagrada ou profana conforme a divindade: se “pode”, você escolhe; se “deve”, ganha o traço automaticamente. Traço oposto: perde o anterior até ritual de expiação. 1/dia, curar (heal) como magia inata divina de 6º posto, só em você, com os benefícios da versão de 2 ações ao gastar 1 ação. Se for reduzido a 0 PV sem morrer na hora, pode conjurá-la como ação livre antes de ficar inconsciente. A magia é elevada automaticamente a posto igual à metade do seu nível. Especial: com cura do vazio, conjura ferir (harm) no lugar. Você escolhe santificação e heal/harm; o motor não escolhe.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Divindade e anátema',
        description:
          'Você nomeia a divindade. Anátema dela vale. O motor não escolhe a divindade nem os dons.',
      },
      {
        kind: 'textChoice',
        choiceId: 'mortal-herald-sanctification',
        options: [
          { id: 'holy', label: 'Sagrado' },
          { id: 'unholy', label: 'Profano' },
          { id: 'none', label: 'Sem santificação' },
        ],
        hint: 'Se a divindade “pode” ser sagrada/profana, você escolhe. Se “deve”, pegue o traço obrigatório. O motor não escolhe.',
        abilityName: 'Santificação: {choice}',
        abilityDescription: 'Traço sagrado ou profano, ou nenhum.',
      },
      {
        kind: 'textChoice',
        choiceId: 'mortal-herald-innate',
        options: [
          { id: 'heal', label: 'Curar (heal)' },
          { id: 'harm', label: 'Ferir (harm) — cura do vazio' },
        ],
        hint: 'Heal, ou harm se tiver cura do vazio. O motor não escolhe.',
        abilityName: 'Inata 1/dia: {choice}',
        abilityDescription:
          '6º posto, só em você, 1 ação com benefícios de 2 ações; ação livre a 0 PV. Elevada à metade do nível.',
      },
    ],
    sourceId: SOURCE_DIVINE_MYSTERIES_ID,
    sourcePage: 279,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7528',
  }),
  f({
    id: 'feat-mortal-herald-domain-embodiment',
    name: 'Encarnação de Domínio',
    originalName: 'Domain Embodiment',
    level: 14,
    archetypeId: 'archetype-mortal-herald',
    prereqId: DED_HERALD.id,
    prereqName: DED_HERALD.name,
    description:
      'A cada preparo diário, ganhe duas magias de domínio iniciais ou avançadas de qualquer domínio ou domínio alternativo da sua divindade, como inatas até o próximo preparo. São magias de foco (1 ponto de foco). Reserva: número de magias de foco que você conhece ou 3, o que for menor. Refoco: 10 minutos orando ou servindo a causa. Magias divinas. Se ainda não for, fica treinado em ataque e CD de magia. Atributo: Sabedoria. Você escolhe as duas magias de domínio a cada dia; o motor não escolhe.',
    effects: [
      { kind: 'focusPool', points: 2 },
      { kind: 'spellcasting', access: HERALD_DOMAIN_SPELL },
      {
        kind: 'specialAbility',
        name: 'Duas magias de domínio (preparo diário)',
        description:
          'Escolha duas magias de domínio iniciais ou avançadas da sua divindade. O motor não escolhe.',
      },
    ],
    sourceId: SOURCE_DIVINE_MYSTERIES_ID,
    sourcePage: 280,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7529',
  }),
  f({
    id: 'feat-mortal-herald-fear-of-god',
    name: 'Temor de Deus',
    originalName: 'Fear of God',
    level: 14,
    archetypeId: 'archetype-mortal-herald',
    traits: ['Arquétipo', 'Divino', 'Perícia'],
    prereqId: DED_HERALD.id,
    prereqName: DED_HERALD.name,
    extraPrereq: [{ kind: 'skillRank', skillId: 'intimidation', rank: 'expert' }],
    description:
      'O inimigo disparador fica marcado por 10 minutos: ignore a imunidade temporária dele a Desmoralizar e, ao Desmoralizar com sucesso, aumente assustado em 1 (2 no crítico), máximo assustado 4.',
    actionType: 'free',
    trigger: 'Você Desmoraliza um inimigo com sucesso.',
    frequency: '1 vez a cada 10 minutos',
    sourceId: SOURCE_DIVINE_MYSTERIES_ID,
    sourcePage: 280,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7530',
  }),
  f({
    id: HERALD_FLASH.id,
    name: HERALD_FLASH.name,
    originalName: 'Flash of Omnipresence',
    level: 14,
    archetypeId: 'archetype-mortal-herald',
    traits: ['Arquétipo', 'Mítico', 'Teleporte'],
    prereqId: DED_HERALD.id,
    prereqName: DED_HERALD.name,
    extraPrereq: [{ kind: 'text', label: 'Personagem mítico' }],
    description:
      'Teleporte para um espaço vazio adjacente a um aliado a até 30 m. Se gastar um Ponto Mítico, teleporte para qualquer lugar a até 1,6 km; inimigos adjacentes ao chegar fazem Vontade contra a maior entre CD de classe e CD de magia ou ficam atordoados 1.',
    actionType: 'one',
    sourceId: SOURCE_DIVINE_MYSTERIES_ID,
    sourcePage: 280,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7531',
  }),
  f({
    id: HERALD_WEAPON.id,
    name: HERALD_WEAPON.name,
    originalName: "Herald's Weapon",
    level: 14,
    archetypeId: 'archetype-mortal-herald',
    traits: ['Arquétipo', 'Divino'],
    prereqId: DED_HERALD.id,
    prereqName: DED_HERALD.name,
    description:
      'Escolha uma arma que você empunha ou um ataque desarmado, por 1 minuto: o dano passa a ser de espírito, ganha o traço santificado e causa +2d4 de espírito. Você escolhe a arma a cada uso; o motor não escolhe.',
    actionType: 'one',
    frequency: '1 vez por hora',
    sourceId: SOURCE_DIVINE_MYSTERIES_ID,
    sourcePage: 280,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7532',
  }),
  f({
    id: 'feat-mortal-herald-mortal-ascension',
    name: 'Ascensão Mortal',
    originalName: 'Mortal Ascension',
    level: 14,
    archetypeId: 'archetype-mortal-herald',
    prereqId: DED_HERALD.id,
    prereqName: DED_HERALD.name,
    description: 'Ganha deslocamento de voo igual ao seu Deslocamento.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Deslocamento de voo = Deslocamento',
        description: 'Voo igual ao Deslocamento terrestre.',
      },
    ],
    sourceId: SOURCE_DIVINE_MYSTERIES_ID,
    sourcePage: 280,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7533',
  }),
  f({
    id: HERALD_SHIELD.id,
    name: HERALD_SHIELD.name,
    originalName: 'Shield the Faithful',
    level: 14,
    archetypeId: 'archetype-mortal-herald',
    prereqId: DED_HERALD.id,
    prereqName: DED_HERALD.name,
    description:
      'Por 1 minuto, você e aliados a até 3 m ganham +1 de item na CA e resistência 10 a espírito. Criatura adjacente que o acerta com ataque corpo a corpo, ou que o toca ou acerta com desarmado, sofre 5 de espírito. No 20º nível: resistência 15 e 10 de espírito.',
    actionType: 'one',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Aura dos fiéis (1 minuto)',
        actionType: 'one',
        description:
          '+1 de item na CA e resistência 10 a espírito (15 no 20º) a até 3 m. Toque/acerto adjacente: 5 espírito (10 no 20º).',
      },
    ],
    sourceId: SOURCE_DIVINE_MYSTERIES_ID,
    sourcePage: 280,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7534',
  }),
  f({
    id: 'feat-mortal-herald-chastise',
    name: 'Repreender',
    originalName: 'Chastise',
    level: 16,
    archetypeId: 'archetype-mortal-herald',
    prereqId: DED_HERALD.id,
    prereqName: DED_HERALD.name,
    description:
      'Repreenda o espírito de um inimigo assustado a até 9 m. Vontade contra a maior entre CD de classe e CD de magia. Depois, imune por 1 hora. Sucesso crítico: nada. Sucesso: 2 espírito persistente (dobra na primeira falha do teste plano). Falha: 4 (dobra). Falha crítica: 6 (dobra).',
    actionType: 'two',
    sourceId: SOURCE_DIVINE_MYSTERIES_ID,
    sourcePage: 281,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7535',
  }),
  f({
    id: 'feat-mortal-herald-declare-anathema',
    name: 'Declarar Anátema',
    originalName: 'Declare Anathema',
    level: 16,
    archetypeId: 'archetype-mortal-herald',
    prereqId: DED_HERALD.id,
    prereqName: DED_HERALD.name,
    description:
      'Declare anátema uma criatura de que você está ciente a até 9 m. Religião contra a CD de Vontade. Sucesso crítico: quem tentar efeito benéfico no alvo precisa passar em teste plano CD 5 ou a ação é interrompida; maldição até limpar aflição ou ritual de expiação; fraqueza 10 a espírito por 1 minuto. Sucesso: igual, mas a maldição dura 1 minuto. Falha: 1 rodada, sem fraqueza. Falha crítica: nada.',
    actionType: 'two',
    sourceId: SOURCE_DIVINE_MYSTERIES_ID,
    sourcePage: 281,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7536',
  }),
  f({
    id: 'feat-mortal-herald-dive-of-the-divine',
    name: 'Mergulho do Divino',
    originalName: 'Dive of the Divine',
    level: 16,
    archetypeId: 'archetype-mortal-herald',
    traits: ['Arquétipo', 'Divino', 'Santificado'],
    prereqId: DED_HERALD.id,
    prereqName: DED_HERALD.name,
    extraPrereq: [
      { kind: 'text', label: 'Deslocamento de voo de pelo menos 6 m; você está a pelo menos 6 m do chão' },
    ],
    description:
      'Voe em linha reta para baixo, aterrissando em segurança no espaço desocupado mais próximo abaixo. Ao aterrissar, criaturas numa emanação de 3 m sofrem 8d10 de espírito (Fortitude básica contra a maior entre CD de classe e CD de magia). Falha: empurrado 1,5 m (3 m na falha crítica). No 20º nível: 10d10.',
    actionType: 'two',
    sourceId: SOURCE_DIVINE_MYSTERIES_ID,
    sourcePage: 281,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7537',
  }),
  f({
    id: 'feat-mortal-herald-following-smite',
    name: 'Golpe Seguidor',
    originalName: 'Following Smite',
    level: 16,
    archetypeId: 'archetype-mortal-herald',
    traits: ['Arquétipo', 'Divino', 'Santificado'],
    prereqId: HERALD_WEAPON.id,
    prereqName: HERALD_WEAPON.name,
    extraPrereq: [
      {
        kind: 'text',
        label: 'Sua última ação foi um Golpe com arma ou desarmado potencializado por Arma do Arauto',
      },
    ],
    description:
      'A criatura acertada na ação anterior faz Reflexos contra a maior entre CD de classe e CD de magia. Sucesso crítico: nada. Sucesso: espírito igual à metade do seu nível. Falha: espírito igual ao nível e fica derrubado. Falha crítica: espírito igual ao dobro do nível, derrubado e desajeitado 1 até o início do seu próximo turno.',
    actionType: 'one',
    sourceId: SOURCE_DIVINE_MYSTERIES_ID,
    sourcePage: 281,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7538',
  }),
  f({
    id: 'feat-mortal-herald-free-from-bonds',
    name: 'Livre das Amarras',
    originalName: 'Free from Bonds',
    level: 16,
    archetypeId: 'archetype-mortal-herald',
    prereqId: HERALD_FLASH.id,
    prereqName: HERALD_FLASH.name,
    description:
      'Se estiver agarrado ou restringido ao usar Lampejo de Onipresença, a criatura ou efeito que impõe a condição sofre dano de espírito igual ao seu nível. Se teletransportar adjacente a um aliado agarrado ou restringido, Religião contra a CD difícil do nível da criatura ou efeito. Sucesso: o aliado perde essa condição.',
    sourceId: SOURCE_DIVINE_MYSTERIES_ID,
    sourcePage: 281,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7539',
  }),
  f({
    id: 'feat-mortal-herald-healing-sanctuary',
    name: 'Santuário de Cura',
    originalName: 'Healing Sanctuary',
    level: 16,
    archetypeId: 'archetype-mortal-herald',
    traits: ['Arquétipo', 'Divino'],
    prereqId: HERALD_SHIELD.id,
    prereqName: HERALD_SHIELD.name,
    description:
      'Aliado que começa o turno na aura de Escudar os Fiéis ganha 10 PV temporários que duram 1 rodada.',
    sourceId: SOURCE_DIVINE_MYSTERIES_ID,
    sourcePage: 281,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7540',
  }),
  f({
    id: 'feat-mortal-herald-heraldic-proclamation',
    name: 'Proclamação Heráldica',
    originalName: 'Heraldic Proclamation',
    level: 16,
    archetypeId: 'archetype-mortal-herald',
    prereqId: DED_HERALD.id,
    prereqName: DED_HERALD.name,
    description:
      'Se a próxima ação for Conjurar uma Magia que não seja truque, aliados a até 9 m ganham PV iguais ao dobro do posto da magia, e inimigos a até 9 m sofrem espírito igual ao dobro do posto (Vontade básica contra sua CD de magia).',
    actionType: 'one',
    sourceId: SOURCE_DIVINE_MYSTERIES_ID,
    sourcePage: 281,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7541',
  }),
  f({
    id: 'feat-mortal-herald-invisible-hand',
    name: 'Mão Invisível',
    originalName: 'Invisible Hand',
    level: 16,
    archetypeId: 'archetype-mortal-herald',
    prereqId: DED_HERALD.id,
    prereqName: DED_HERALD.name,
    description:
      '1/dia, ao rolar Furtividade para iniciativa, pode ficar invisível por 1 minuto. Se gastar um Ponto Mítico ao começar Evitar Atenção, fica invisível enquanto continuar Evitando Atenção.',
    sourceId: SOURCE_DIVINE_MYSTERIES_ID,
    sourcePage: 281,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7542',
  }),
  f({
    id: HERALD_PREMONITION.id,
    name: HERALD_PREMONITION.name,
    originalName: 'Premonition of Clarity',
    level: 16,
    archetypeId: 'archetype-mortal-herald',
    traits: ['Arquétipo', 'Fortuna'],
    prereqId: DED_HERALD.id,
    prereqName: DED_HERALD.name,
    description:
      'Rerrole a salvaguarda disparadora com +2 de circunstância. Use o segundo resultado, mesmo se for pior.',
    actionType: 'reaction',
    trigger: 'Você falha numa salvaguarda contra um efeito mental.',
    frequency: '1 vez por hora',
    sourceId: SOURCE_PLAYER_CORE_ID,
    sourcePage: 120,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=4691',
  }),
  f({
    id: 'feat-mortal-herald-deific-font',
    name: 'Fonte Deífica',
    originalName: 'Deific Font',
    level: 18,
    archetypeId: 'archetype-mortal-herald',
    traits: ['Arquétipo', 'Divino'],
    prereqId: DED_HERALD.id,
    prereqName: DED_HERALD.name,
    description:
      'Fique drenado 1 ou aumente drenado em 1. Até o fim do seu próximo turno, se Conjurar uma Magia de 4º posto ou menor, não gasta o espaço; se conjurar magia de foco, não custa ponto de foco. A magia perde o traço de tradição e ganha o traço divino.',
    actionType: 'one',
    frequency: '1 vez por hora',
    sourceId: SOURCE_DIVINE_MYSTERIES_ID,
    sourcePage: 281,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7543',
  }),
  f({
    id: 'feat-mortal-herald-divine-presence',
    name: 'Presença Divina',
    originalName: 'Divine Presence',
    level: 18,
    archetypeId: 'archetype-mortal-herald',
    traits: ['Arquétipo', 'Postura'],
    prereqId: DED_HERALD.id,
    prereqName: DED_HERALD.name,
    description:
      'Nesta postura, emanação de 1,5 m (aura). Pode agir a partir do seu espaço ou de qualquer espaço da emanação. Inimigo que termina o turno completamente na emanação fica desprevenido contra seus Golpes. Sustentar aumenta o raio em 1,5 m, máximo 4,5 m.',
    actionType: 'one',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Emanação divina (postura)',
        actionType: 'one',
        description:
          '1,5 m (até 4,5 m ao Sustentar). Agir de qualquer espaço da aura. Inimigo no interior: desprevenido aos seus Golpes.',
      },
    ],
    sourceId: SOURCE_DIVINE_MYSTERIES_ID,
    sourcePage: 282,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7544',
  }),
  f({
    id: 'feat-mortal-herald-eternal-bane',
    name: 'Maldição Eterna',
    originalName: 'Eternal Bane',
    level: 18,
    archetypeId: 'archetype-mortal-herald',
    prereqId: DED_HERALD.id,
    prereqName: DED_HERALD.name,
    extraPrereq: [{ kind: 'text', label: 'Profano' }],
    description:
      'Cercado continuamente por maldição (bane) de posto igual à metade do seu nível (arredondada para cima). Raio 4,5 m, sem aumentar. Pode Dispensar; retorna automaticamente após 1 minuto.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Maldição (bane) contínua',
        description: 'Posto = metade do nível. Raio 4,5 m. Dispensar: volta em 1 minuto.',
      },
    ],
    sourceId: SOURCE_PLAYER_CORE_ID,
    sourcePage: 120,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=4693',
  }),
  f({
    id: 'feat-mortal-herald-eternal-blessing',
    name: 'Bênção Eterna',
    originalName: 'Eternal Blessing',
    level: 18,
    archetypeId: 'archetype-mortal-herald',
    prereqId: DED_HERALD.id,
    prereqName: DED_HERALD.name,
    extraPrereq: [{ kind: 'text', label: 'Sagrado' }],
    description:
      'Cercado continuamente por bênção (bless) de posto igual à metade do seu nível (arredondada para cima). Raio 4,5 m, sem aumentar. Pode Dispensar; retorna automaticamente após 1 minuto.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Bênção (bless) contínua',
        description: 'Posto = metade do nível. Raio 4,5 m. Dispensar: volta em 1 minuto.',
      },
    ],
    sourceId: SOURCE_PLAYER_CORE_ID,
    sourcePage: 120,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=4694',
  }),
  f({
    id: 'feat-mortal-herald-eyes-of-god',
    name: 'Olhos de Deus',
    originalName: 'Eyes of God',
    level: 18,
    archetypeId: 'archetype-mortal-herald',
    prereqId: DED_HERALD.id,
    prereqName: DED_HERALD.name,
    description:
      'Efeito contínuo de ver o invisível e visão verdadeira de 8º posto. +4 de status em Intuir Intenção e na CD de Percepção contra Mentiras.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Ver o invisível e visão verdadeira (8º)',
        description: '+4 de status em Intuir Intenção e na CD de Percepção contra Mentiras.',
      },
    ],
    sourceId: SOURCE_DIVINE_MYSTERIES_ID,
    sourcePage: 282,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7545',
  }),
  f({
    id: 'feat-mortal-herald-flash-of-omniscience',
    name: 'Lampejo de Onisciência',
    originalName: 'Flash of Omniscience',
    level: 18,
    archetypeId: 'archetype-mortal-herald',
    traits: ['Arquétipo', 'Mítico'],
    prereqId: DED_HERALD.id,
    prereqName: DED_HERALD.name,
    extraPrereq: [{ kind: 'text', label: 'Personagem mítico' }],
    description:
      'Gaste um Ponto Mítico. Aprenda imediatamente resistências, fraquezas e imunidades (incluindo valores e fraquezas incomuns) de uma criatura que você vê. Você escolhe a criatura; o motor não escolhe.',
    actionType: 'free',
    sourceId: SOURCE_DIVINE_MYSTERIES_ID,
    sourcePage: 282,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7546',
  }),
  f({
    id: 'feat-mortal-herald-glory-on-high',
    name: 'Glória nas Alturas',
    originalName: 'Glory on High',
    level: 18,
    archetypeId: 'archetype-mortal-herald',
    prereqId: DED_HERALD.id,
    prereqName: DED_HERALD.name,
    extraPrereq: [{ kind: 'text', label: 'Deslocamento de voo' }],
    description:
      'Voe para cima até o deslocamento de voo e Interaja para sacar uma arma ou gesticular com a mão ou um símbolo sagrado vestido. Cada inimigo numa emanação de 18 m faz Vontade contra a maior entre CD de classe e CD de magia; depois, imune por 1 hora. Sucesso crítico: nada. Sucesso: ofuscado 1 minuto. Falha: cego 1 rodada, ofuscado 1 minuto e 10d6 mental. Falha crítica: cego 1 minuto, ofuscado 1 hora e 20d6 mental.',
    actionType: 'two',
    sourceId: SOURCE_DIVINE_MYSTERIES_ID,
    sourcePage: 282,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7547',
  }),
  f({
    id: 'feat-mortal-herald-guiding-words',
    name: 'Palavras-Guia',
    originalName: 'Guiding Words',
    level: 18,
    archetypeId: 'archetype-mortal-herald',
    prereqId: DED_HERALD.id,
    prereqName: DED_HERALD.name,
    description:
      'Escolha um aliado a até 9 m e faça Diplomacia contra a CD difícil do nível do aliado. Sucesso: o primeiro teste de ataque do aliado até o fim do próximo turno dele é rolado duas vezes, usando o melhor. Depois, imune por 10 minutos. Você escolhe o aliado; o motor não escolhe.',
    actionType: 'one',
    sourceId: SOURCE_DIVINE_MYSTERIES_ID,
    sourcePage: 282,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7548',
  }),
  f({
    id: 'feat-mortal-herald-marked-for-rebuke',
    name: 'Marcado para Repreensão',
    originalName: 'Marked For Rebuke',
    level: 18,
    archetypeId: 'archetype-mortal-herald',
    prereqId: DED_HERALD.id,
    prereqName: DED_HERALD.name,
    description:
      'Se a próxima ação for Conjurar uma Magia que causa dano, uma criatura à escolha que sofra dano da magia fica marcada até o fim do seu próximo turno: fraqueza 10 a todo dano e imune a Marcado para Repreensão por 24 h. Você escolhe a criatura; o motor não escolhe.',
    actionType: 'one',
    sourceId: SOURCE_DIVINE_MYSTERIES_ID,
    sourcePage: 282,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7549',
  }),
  f({
    id: 'feat-mortal-herald-resurrectionist',
    name: 'Ressurreicionista',
    originalName: 'Resurrectionist',
    level: 18,
    archetypeId: 'archetype-mortal-herald',
    prereqId: DED_HERALD.id,
    prereqName: DED_HERALD.name,
    description:
      'Ao restaurar PV a uma criatura morrendo, ou ao trazê-la de volta à vida e restaurar PV, ela ganha cura acelerada 5 por 1 minuto. A cura acelerada acaba se a criatura ficar inconsciente.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Cura acelerada 5 (1 minuto)',
        description: 'Ao curar criatura morrendo ou ressuscitada. Acaba se ficar inconsciente.',
      },
    ],
    sourceId: SOURCE_PLAYER_CORE_ID,
    sourcePage: 121,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=4697',
  }),
  f({
    id: 'feat-mortal-herald-stand-for-the-fallen',
    name: 'Erguer-se pelos Caídos',
    originalName: 'Stand for the Fallen',
    level: 18,
    archetypeId: 'archetype-mortal-herald',
    traits: ['Arquétipo', 'Concentrar', 'Divino'],
    prereqId: DED_HERALD.id,
    prereqName: DED_HERALD.name,
    description:
      'Avance duas vezes até ficar adjacente ao aliado disparador (pode Cavar, Escalar, Voar ou Nadar se tiver o deslocamento). Então sofre o dano que o teria reduzido a 0 PV, com resistência a todo dano igual ao seu nível contra esse dano.',
    actionType: 'reaction',
    trigger: 'Um aliado sofre dano que o reduziria a 0 PV.',
    sourceId: SOURCE_DIVINE_MYSTERIES_ID,
    sourcePage: 282,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7550',
  }),
  f({
    id: 'feat-mortal-herald-divine-apex',
    name: 'Ápice Divino',
    originalName: 'Divine Apex',
    level: 20,
    archetypeId: 'archetype-mortal-herald',
    prereqId: DED_HERALD.id,
    prereqName: DED_HERALD.name,
    description:
      'Ao completar o preparo diário, toque um item mágico vestido sem o traço ápice. Ele ganha ápice até o próximo preparo. Escolha um dos atributos divinos da sua divindade: o item aumenta esse modificador em 1 ou até +4, o que for maior. Só um ápice por personagem, como de costume. Você escolhe o item e o atributo; o motor não escolhe.',
    effects: [
      {
        kind: 'textChoice',
        choiceId: 'mortal-herald-apex-attribute',
        options: [
          { id: 'strength', label: 'Força' },
          { id: 'dexterity', label: 'Destreza' },
          { id: 'constitution', label: 'Constituição' },
          { id: 'intelligence', label: 'Inteligência' },
          { id: 'wisdom', label: 'Sabedoria' },
          { id: 'charisma', label: 'Carisma' },
        ],
        hint: 'Escolha um atributo divino da sua divindade. O motor não escolhe.',
        abilityName: 'Ápice diário: {choice}',
        abilityDescription:
          'Item vestido sem ápice: +1 no atributo escolhido ou até +4, até o próximo preparo.',
      },
    ],
    sourceId: SOURCE_PLAYER_CORE_ID,
    sourcePage: 121,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=4698',
  }),
  f({
    id: 'feat-mortal-herald-ease-the-burden',
    name: 'Aliviar o Fardo',
    originalName: 'Ease the Burden',
    level: 20,
    archetypeId: 'archetype-mortal-herald',
    prereqId: DED_HERALD.id,
    prereqName: DED_HERALD.name,
    description:
      'Uma criatura adjacente recupera 100 PV e reduz drenado, desajeitado, enfraquecido, assustado e estupefato em 1 (mínimo 0).',
    actionType: 'two',
    sourceId: SOURCE_DIVINE_MYSTERIES_ID,
    sourcePage: 282,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7551',
  }),
  f({
    id: 'feat-mortal-herald-enter-divine-realm',
    name: 'Entrar no Reino Divino',
    originalName: 'Enter Divine Realm',
    level: 20,
    archetypeId: 'archetype-mortal-herald',
    prereqId: DED_HERALD.id,
    prereqName: DED_HERALD.name,
    description:
      'Teleporte interplanar 1/dia como magia inata divina, tempo de conjuração 1 minuto. Você é a chave planar e só viaja ao reino da sua divindade. Sempre aparecem no centro do reino; você (não necessariamente os aliados) é imune às condições nocivas do reino. Voltar: 1 minuto imaginando o destino, até 8 criaturas dispostas (não precisam ser as mesmas).',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Teleporte interplanar (1/dia, 1 minuto)',
        description: 'Só o reino da sua divindade. Volta em 1 minuto com até 8 criaturas.',
      },
    ],
    sourceId: SOURCE_DIVINE_MYSTERIES_ID,
    sourcePage: 282,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7552',
  }),
  f({
    id: 'feat-mortal-herald-flash-of-omnipotence',
    name: 'Lampejo de Onipotência',
    originalName: 'Flash of Omnipotence',
    level: 20,
    archetypeId: 'archetype-mortal-herald',
    traits: ['Arquétipo', 'Mítico'],
    prereqId: DED_HERALD.id,
    prereqName: DED_HERALD.name,
    extraPrereq: [{ kind: 'text', label: 'Personagem mítico' }],
    description:
      'Gaste um Ponto Mítico. Até o fim do seu turno, qualquer dano que você causa ignora todas as resistências e imunidades do alvo, ou dispara a maior fraqueza se o alvo não tiver resistência nem imunidade.',
    actionType: 'free',
    sourceId: SOURCE_DIVINE_MYSTERIES_ID,
    sourcePage: 282,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7553',
  }),
  f({
    id: 'feat-mortal-herald-heralds-strike',
    name: 'Golpe do Arauto',
    originalName: "Herald's Strike",
    level: 20,
    archetypeId: 'archetype-mortal-herald',
    prereqId: HERALD_WEAPON.id,
    prereqName: HERALD_WEAPON.name,
    description:
      'Ative Arma do Arauto ignorando a frequência e Golpeie com a arma ou desarmado transformado. Se acertar e causar dano, o alvo faz Vontade contra a maior entre CD de classe e CD de magia (um grau pior se o Golpe foi crítico). Depois, imune por 10 minutos. Sucesso crítico: nada. Sucesso: 3d10 espírito e ofuscado 1 rodada. Falha: 6d10 espírito, ofuscado 1 rodada e drenado 1. Falha crítica: 12d10 espírito, cego 1 rodada e drenado 2.',
    actionType: 'two',
    sourceId: SOURCE_DIVINE_MYSTERIES_ID,
    sourcePage: 282,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7554',
  }),
  f({
    id: 'feat-mortal-herald-moment-of-apotheosis',
    name: 'Momento de Apoteose',
    originalName: 'Moment of Apotheosis',
    level: 20,
    archetypeId: 'archetype-mortal-herald',
    prereqId: DED_HERALD.id,
    prereqName: DED_HERALD.name,
    description:
      'Avatar 1/dia como magia inata divina. A forma segue a sua divindade; o motor não escolhe o avatar.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Avatar (1/dia, inata divina)',
        description: 'A forma é a da sua divindade. O motor não escolhe.',
      },
    ],
    sourceId: SOURCE_DIVINE_MYSTERIES_ID,
    sourcePage: 282,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7555',
  }),
  f({
    id: 'feat-mortal-herald-shared-clarity',
    name: 'Clareza Compartilhada',
    originalName: 'Shared Clarity',
    level: 20,
    archetypeId: 'archetype-mortal-herald',
    prereqId: HERALD_PREMONITION.id,
    prereqName: HERALD_PREMONITION.name,
    description:
      'Ao usar Premonição de Clareza, aliados a até 4,5 m que falharam na mesma salvaguarda contra o mesmo efeito mental também podem gastar a reação para rerrolar com +2 de circunstância.',
    sourceId: SOURCE_DIVINE_MYSTERIES_ID,
    sourcePage: 282,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7556',
  }),
  f({
    id: 'feat-mortal-herald-spark-of-immortality',
    name: 'Centelha de Imortalidade',
    originalName: 'Spark of Immortality',
    level: 20,
    archetypeId: 'archetype-mortal-herald',
    prereqId: DED_HERALD.id,
    prereqName: DED_HERALD.name,
    description:
      'Não envelhece. Só morre ao atingir morrendo 5 (morrendo 6 se tiver Difícil de Matar). Ao morrer, corpo e alma vão à presença da divindade, que pode reconstruir sua forma e devolvê-lo ao ponto da morte (ou local seguro) ou deixá-lo descansar no reino até ser necessário.',
    effects: [
      { kind: 'dyingMax', value: 5 },
      {
        kind: 'specialAbility',
        name: 'Imortalidade divina',
        description:
          'Não envelhece. Morrendo 6 se tiver Difícil de Matar. A divindade pode restaurá-lo após a morte.',
      },
    ],
    sourceId: SOURCE_DIVINE_MYSTERIES_ID,
    sourcePage: 282,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7557',
  }),
].map(withMythicTrait)

const razmiranPriestArchetypeFeats: Feat[] = [
  f({
    id: DED_RAZMIR.id,
    name: DED_RAZMIR.name,
    originalName: 'Razmiran Priest Dedication',
    level: 2,
    archetypeId: 'archetype-razmiran-priest',
    isDedication: true,
    rarity: 'uncommon',
    extraPrereq: [
      { kind: 'skillRank', skillId: 'crafting', rank: 'trained' },
      { kind: 'skillRank', skillId: 'deception', rank: 'trained' },
    ],
    description:
      'Ganha uma máscara razmiri (só você se beneficia; sem valor de venda). Pode fabricar uma substituta em 4 horas se for danificada ou perdida. As habilidades da máscara usam a maior entre CD de classe e CD de magia. Máscara de ferro: +1 de item em Enganação para Mentir ou Fintar. Ativação — Invocar a Benevolência de Razmir (2 ações, concentrar, manipular, oculto; 1/minuto): toque concede PV temporários iguais ao dobro do seu nível por 24 h; se estava inconsciente, recupera a consciência e não a perde de novo por PV enquanto esses temporários durarem. Pode pegar Dedicação de Clérigo sem cumprir os pré-requisitos e antes de dois feitos deste arquétipo, mas deve escolher Razmir. Magias do arquétipo de clérigo assim obtidas são ocultas (não divinas); feitos de clérigo com traço divino passam a oculto. Atributo-chave dessas magias: Carisma (não Sabedoria). Você escolhe se pega a Dedicação de Clérigo e quais magias; o motor não escolhe.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Máscara razmiri (ferro)',
        description:
          '+1 de item em Enganação para Mentir ou Fintar. Fabricar substituta em 4 h. CD: a maior entre classe e magia.',
      },
      {
        kind: 'specialAbility',
        name: 'Invocar a Benevolência de Razmir',
        actionType: 'two',
        description:
          '1/minuto. Toque: PV temporários = 2 × nível (24 h). Inconsciente: acorda e não desmaia de novo enquanto os temporários durarem.',
      },
      {
        kind: 'specialAbility',
        name: 'Dedicação de Clérigo (Razmir, oculto, Carisma)',
        description:
          'Pode pegar Dedicação de Clérigo sem pré-requisitos e antes de dois feitos deste arquétipo. Deve ser Razmir. Magias e traços divinos viram ocultos; atributo Carisma. Você escolhe as magias; o motor não escolhe.',
      },
    ],
    sourceId: SOURCE_DIVINE_MYSTERIES_ID,
    sourcePage: 290,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7566',
  }),
  f({
    id: 'feat-razmiran-priest-perfect-truths',
    name: 'Verdades Perfeitas',
    originalName: 'Perfect Truths',
    level: 6,
    archetypeId: 'archetype-razmiran-priest',
    prereqId: DED_RAZMIR.id,
    prereqName: DED_RAZMIR.name,
    description:
      'Ao Mentir, pode estruturar cada frase como verdade de certo ângulo. Com a máscara, não sofre penalidade de Enganação sob anel da verdade ou efeito similar. Sob esse efeito, ao começar a falar pode Enganação para contrapor (posto = metade do nível, arredondada para cima): sucesso não encerra o efeito, mas faz indicar que você fala a verdade mesmo ao mentir.',
    sourceId: SOURCE_DIVINE_MYSTERIES_ID,
    sourcePage: 290,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7567',
  }),
  f({
    id: 'feat-razmiran-priest-mask-of-the-12th-step',
    name: 'Máscara do 12º Degrau',
    originalName: 'Mask of The 12th Step',
    level: 10,
    archetypeId: 'archetype-razmiran-priest',
    prereqId: DED_RAZMIR.id,
    prereqName: DED_RAZMIR.name,
    extraPrereq: [{ kind: 'skillRank', skillId: 'crafting', rank: 'expert' }],
    description:
      'Pode fabricar a máscara de prata ou aprimorar a atual no mesmo tempo de uma de ferro. Máscara de prata: +2 de item em Enganação para Mentir ou Fintar, item de 10º nível. Ativação — Invocar a Misericórdia de Razmir (2 ações, concentrar, manipular, oculto; 3/dia): toque conjura limpar aflição oculta de posto igual à metade do seu nível. Sucesso na contraposição: o estágio cai 1 temporariamente e os efeitos ficam suprimidos por 24 h; depois a aflição retoma. Salvaguardas que teriam ocorrido no período são feitas todas ao fim das 24 h.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Máscara razmiri (prata)',
        description: '+2 de item em Enganação para Mentir ou Fintar. Item de 10º nível.',
      },
      {
        kind: 'specialAbility',
        name: 'Invocar a Misericórdia de Razmir',
        actionType: 'two',
        description:
          '3/dia. Limpar aflição oculta (posto = metade do nível); suprime 24 h em vez de curar de fato.',
      },
    ],
    sourceId: SOURCE_DIVINE_MYSTERIES_ID,
    sourcePage: 291,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7568',
  }),
  f({
    id: 'feat-razmiran-priest-mask-of-the-15th-step',
    name: 'Máscara do 15º Degrau',
    originalName: 'Mask of The 15th Step',
    level: 14,
    archetypeId: 'archetype-razmiran-priest',
    prereqId: DED_RAZMIR.id,
    prereqName: DED_RAZMIR.name,
    extraPrereq: [{ kind: 'skillRank', skillId: 'crafting', rank: 'master' }],
    description:
      'Pode fabricar a máscara de ouro ou aprimorar a atual no mesmo tempo de uma de ferro. Máscara de ouro: +3 de item em Enganação para Mentir ou Fintar, item de 14º nível. Ativação — Invocar a Ira de Razmir (2 ações, concentrar, manipular, oculto; 1/dia): explosão solar (sunburst) oculta de 8º posto; contra mortos-vivos a magia tem o traço incapacitação.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Máscara razmiri (ouro)',
        description: '+3 de item em Enganação para Mentir ou Fintar. Item de 14º nível.',
      },
      {
        kind: 'specialAbility',
        name: 'Invocar a Ira de Razmir',
        actionType: 'two',
        description: '1/dia. Explosão solar oculta de 8º posto; incapacitação contra mortos-vivos.',
      },
    ],
    sourceId: SOURCE_DIVINE_MYSTERIES_ID,
    sourcePage: 291,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7569',
  }),
  f({
    id: 'feat-razmiran-priest-living-god',
    name: 'Deus Vivo',
    originalName: 'Living God',
    level: 20,
    archetypeId: 'archetype-razmiran-priest',
    prereqId: DED_RAZMIR.id,
    prereqName: DED_RAZMIR.name,
    description:
      'Pode fabricar a máscara de porcelana com metais preciosos ou aprimorar a atual no mesmo tempo de uma de ferro. Máscara de porcelana: +4 de item em Enganação para Mentir ou Fintar, item de 18º nível, ápice que aumenta o modificador de Carisma em 1 ou até +4, o que for maior. Ativação — Poder do Deus Vivo (3 ações, concentrar, manipular, oculto; 1/dia): manifestação oculta de 10º posto; qualquer magia emulada ganha o traço incapacitação. Você escolhe a magia emulada; o motor não escolhe.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Máscara razmiri (porcelana, ápice)',
        description:
          '+4 de item em Enganação para Mentir ou Fintar. Item de 18º nível. Carisma +1 ou até +4.',
      },
      {
        kind: 'specialAbility',
        name: 'Poder do Deus Vivo',
        actionType: 'three',
        description:
          '1/dia. Manifestação oculta de 10º posto; a magia emulada tem incapacitação. Você escolhe a magia; o motor não escolhe.',
      },
    ],
    sourceId: SOURCE_DIVINE_MYSTERIES_ID,
    sourcePage: 291,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7570',
  }),
]

const ursineAvengerArchetypeFeats: Feat[] = [
  f({
    id: DED_URSINE.id,
    name: DED_URSINE.name,
    originalName: 'Ursine Avenger Hood Dedication',
    level: 2,
    archetypeId: 'archetype-ursine-avenger',
    isDedication: true,
    rarity: 'rare',
    extraPrereq: [
      {
        kind: 'text',
        label: 'Você possui e investe o Capuz do Vingador Ursino',
      },
    ],
    description:
      'Arquétipo de artefato: é preciso ter e investir o Capuz do Vingador Ursino. Enquanto investido, +1 de item em Natureza para Comandar um Animal (+2 se o animal for um urso). Saudade do ermo: −1 de item em Diplomacia para Obter Informações ou Causar Impressão se passar mais de 5 dias numa cidade grande sem ao menos 4 horas no ermo. Não se escolhe um “tipo” de urso.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Capuz do Vingador Ursino (investido)',
        description:
          '+1 de item em Natureza para Comandar um Animal (+2 se for urso). −1 de item em Diplomacia para Obter Informações/Causar Impressão após 5 dias na cidade sem 4 h no ermo.',
      },
    ],
    sourceId: SOURCE_TREASURE_VAULT_ID,
    sourcePage: 183,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=200',
  }),
  f({
    id: FORM_URSINE.id,
    name: FORM_URSINE.name,
    originalName: 'Ursine Avenger Form',
    level: 2,
    archetypeId: 'archetype-ursine-avenger',
    traits: ['Arquétipo', 'Artefato', 'Morfo', 'Primordial'],
    prereqId: DED_URSINE.id,
    prereqName: DED_URSINE.name,
    description:
      'Vista o capuz e o pelo nos braços: forma híbrida de urso. Mandíbulas desarmadas 1d8 perfurante e garras desarmadas 1d6 corte (ágil); ambas no grupo briga. Não fala frases complexas (só grunhidos e gestos); efeitos que exigem idioma compartilhado ou falado não funcionam até voltar. Use esta ação de novo para tirar o capuz e voltar. Não se escolhe um tipo de urso.',
    actionType: 'one',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Forma ursina (híbrida)',
        actionType: 'one',
        description:
          'Mandíbulas 1d8 perfurante (briga). Garras 1d6 corte, ágil (briga). Sem fala complexa. 1 ação para entrar ou sair.',
      },
    ],
    sourceId: SOURCE_TREASURE_VAULT_ID,
    sourcePage: 183,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=4086',
  }),
  f({
    id: 'feat-ursine-avenger-senses-of-the-bear',
    name: 'Sentidos do Urso',
    originalName: 'Senses of the Bear',
    level: 4,
    archetypeId: 'archetype-ursine-avenger',
    prereqId: DED_URSINE.id,
    prereqName: DED_URSINE.name,
    description:
      'Na forma ursina, visão na penumbra e faro impreciso 9 m. Se já tinha visão na penumbra, ganha visão no escuro no lugar.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Sentidos ursinos (na forma)',
        description:
          'Visão na penumbra (visão no escuro se já tinha penumbra). Faro impreciso 9 m.',
      },
    ],
    sourceId: SOURCE_TREASURE_VAULT_ID,
    sourcePage: 183,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=4087',
  }),
  f({
    id: 'feat-ursine-avenger-bear-hug',
    name: 'Abraço de Urso',
    originalName: 'Bear Hug',
    level: 6,
    archetypeId: 'archetype-ursine-avenger',
    prereqId: DED_URSINE.id,
    prereqName: DED_URSINE.name,
    extraPrereq: [{ kind: 'text', label: 'Sua última ação foi um Golpe de garra bem-sucedido' }],
    description:
      'Outro Golpe de garra contra o mesmo alvo. Se acertar, o alvo também fica agarrado.',
    actionType: 'one',
    sourceId: SOURCE_TREASURE_VAULT_ID,
    sourcePage: 183,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=4088',
  }),
  f({
    id: 'feat-ursine-avenger-call-ursine-ally',
    name: 'Convocar Aliado Ursino',
    originalName: 'Call Ursine Ally',
    level: 8,
    archetypeId: 'archetype-ursine-avenger',
    traits: ['Arquétipo', 'Primordial', 'Convocação'],
    prereqId: DED_URSINE.id,
    prereqName: DED_URSINE.name,
    description:
      'Invocar animal inata de 3º posto, só urso-negro. No 10º: 4º posto, urso pardo. No 12º: 5º posto, urso polar. No 14º: 6º posto, urso das cavernas. O tipo segue o nível; o jogador não escolhe o tipo.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Invocar animal (urso, inata)',
        description:
          '3º urso-negro; 10º 4º/pardo; 12º 5º/polar; 14º 6º/cavernas. Sem escolha de tipo.',
      },
    ],
    sourceId: SOURCE_TREASURE_VAULT_ID,
    sourcePage: 183,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=4089',
  }),
  f({
    id: 'feat-ursine-avenger-bear-empathy',
    name: 'Empatia Ursina',
    originalName: 'Bear Empathy',
    level: 10,
    archetypeId: 'archetype-ursine-avenger',
    traits: ['Arquétipo', 'Primordial'],
    prereqId: DED_URSINE.id,
    prereqName: DED_URSINE.name,
    description:
      'Comunica-se com todos os ursos (e outras criaturas ursinas a critério do MJ) por sons e linguagem corporal.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Falar com ursos',
        description: 'Sons e linguagem corporal. Outras ursinas a critério do MJ.',
      },
    ],
    sourceId: SOURCE_TREASURE_VAULT_ID,
    sourcePage: 183,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=4090',
  }),
  f({
    id: GREAT_BEAR.id,
    name: GREAT_BEAR.name,
    originalName: 'Great Bear',
    level: 12,
    archetypeId: 'archetype-ursine-avenger',
    prereqId: FORM_URSINE.id,
    prereqName: FORM_URSINE.name,
    description:
      'Ao usar Forma do Vingador Ursino, pode gastar 1 ação extra para ganhar os efeitos de ampliar de 1º posto, até a duração normal da magia ou até deixar a forma, o que ocorrer primeiro.',
    frequency: '1 vez por hora',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Ampliar (1º) na transformação',
        description: '1 ação extra ao entrar na forma. 1/hora. Dura a magia ou até sair da forma.',
      },
    ],
    sourceId: SOURCE_TREASURE_VAULT_ID,
    sourcePage: 184,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=4091',
  }),
  f({
    id: 'feat-ursine-avenger-terrible-transformation',
    name: 'Transformação Terrível',
    originalName: 'Terrible Transformation',
    level: 14,
    archetypeId: 'archetype-ursine-avenger',
    prereqId: FORM_URSINE.id,
    prereqName: FORM_URSINE.name,
    description:
      'Ao usar Forma do Vingador Ursino, pode Intimidação para Desmoralizar cada inimigo a até 9 m que possa vê-lo, sem penalidade se a criatura não entender seu idioma.',
    sourceId: SOURCE_TREASURE_VAULT_ID,
    sourcePage: 184,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=4092',
  }),
  f({
    id: 'feat-ursine-avenger-fearsome-fangs',
    name: 'Presas Temíveis',
    originalName: 'Fearsome Fangs',
    level: 16,
    archetypeId: 'archetype-ursine-avenger',
    prereqId: FORM_URSINE.id,
    prereqName: FORM_URSINE.name,
    description:
      'Na Forma do Vingador Ursino, o dano base das mandíbulas sobe para 1d12 e o das garras para 1d8.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Mandíbulas 1d12 / garras 1d8',
        description: 'Substitui os dados base da Forma do Vingador Ursino.',
      },
    ],
    sourceId: SOURCE_TREASURE_VAULT_ID,
    sourcePage: 184,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=4093',
  }),
  f({
    id: 'feat-ursine-avenger-mighty-bear',
    name: 'Urso Poderoso',
    originalName: 'Mighty Bear',
    level: 18,
    archetypeId: 'archetype-ursine-avenger',
    prereqId: GREAT_BEAR.id,
    prereqName: GREAT_BEAR.name,
    description: 'O ampliar de Grande Urso é elevado a 4º posto.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Ampliar (4º) na transformação',
        description: 'Substitui o ampliar de 1º posto de Grande Urso.',
      },
    ],
    sourceId: SOURCE_TREASURE_VAULT_ID,
    sourcePage: 184,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=4094',
  }),
  f({
    id: 'feat-ursine-avenger-immortal-bear',
    name: 'Urso Imortal',
    originalName: 'Immortal Bear',
    level: 20,
    archetypeId: 'archetype-ursine-avenger',
    prereqId: FORM_URSINE.id,
    prereqName: FORM_URSINE.name,
    description: 'Na Forma do Vingador Ursino, cura acelerada 5.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Cura acelerada 5 (forma ursina)',
        description: 'Só enquanto estiver na Forma do Vingador Ursino.',
      },
    ],
    sourceId: SOURCE_TREASURE_VAULT_ID,
    sourcePage: 184,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=4095',
  }),
]

export const archetypeFeatsGeneralRemaster20: Feat[] = [
  ...goldenErinysArchetypeFeats,
  ...pureLegionEnforcerArchetypeFeats,
  ...mortalHeraldArchetypeFeats,
  ...razmiranPriestArchetypeFeats,
  ...ursineAvengerArchetypeFeats,
]
