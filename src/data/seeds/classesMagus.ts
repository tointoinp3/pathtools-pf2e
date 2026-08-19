import type { CharacterClass } from '@/types/class'
import { SOURCE_IMPOSSIBLE_MAGIC_ID } from './sources'
import { magusSpellcasting } from './magusSpellcasting'
import { CLASS_MAGUS_ID } from './ids'

export { CLASS_MAGUS_ID }

const MAGUS_CLASS_FEAT_LEVELS = [1, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20]

/**
 * Magus Remaster — Impossible Magic (AoN Classes ID 74).
 * Conjuração arcana preparada limitada (máx. 2/posto; baixos permanecem).
 */
export const magusClass: CharacterClass = {
  id: CLASS_MAGUS_ID,
  name: 'Magus',
  originalName: 'Magus',
  rarity: 'common',
  provenance: { type: 'official' },
  sourceId: SOURCE_IMPOSSIBLE_MAGIC_ID,
  sourcePage: 9,
  hitPointsPerLevel: 8,
  keyAttributeOptions: ['strength', 'dexterity'],
  perceptionRank: 'trained',
  saves: {
    fortitude: 'expert',
    reflex: 'trained',
    will: 'trained',
  },
  skills: {
    fixed: [{ id: 'magus-arcana', rank: 'trained', skillId: 'arcana' }],
    additionalBase: 3,
    additionalFromIntelligence: true,
  },
  attacks: [
    { category: 'simple', rank: 'trained', label: 'Armas simples' },
    { category: 'martial', rank: 'trained', label: 'Armas marciais' },
    { category: 'unarmed', rank: 'trained', label: 'Ataques desarmados' },
  ],
  defenses: [
    { category: 'light', rank: 'trained', label: 'Armadura leve' },
    { category: 'medium', rank: 'trained', label: 'Armadura média' },
    { category: 'unarmored', rank: 'trained', label: 'Defesa sem armadura' },
  ],
  classDcRank: 'trained',
  classFeatLevels: MAGUS_CLASS_FEAT_LEVELS,
  spellcasting: magusSpellcasting,
  subclass: {
    id: 'magus-hybrid-study',
    label: 'Estudo Híbrido',
    description:
      'Seu treino físico e mágico se fundem num estilo. Define magia de confluxo (foco) e, no 7º, magias estudiosas. Fonte: Impossible Magic / AoN.',
    required: true,
    options: [
      {
        id: 'hybrid-inexorable-iron',
        name: 'Ferro Inexorável',
        originalName: 'Inexorable Iron',
        description:
          'Armas pesadas de duas mãos e força bruta fundidas à magia.',
        rulesSummary:
          'Confluxo: Golpe Trovejante. Magias estudiosas: Aumentar (7º), Prender à Terra (11º), Amarra Planar (13º).',
        sourceId: SOURCE_IMPOSSIBLE_MAGIC_ID,
      },
      {
        id: 'hybrid-laughing-shadow',
        name: 'Sombra Risonha',
        originalName: 'Laughing Shadow',
        description:
          'Velocidade, teleporte curto e golpes que somem na sombra.',
        rulesSummary:
          'Confluxo: Assalto Dimensional. Magias estudiosas: Desfocalizar (7º), Arma Fantasma (11º), Translocar (13º).',
        sourceId: SOURCE_IMPOSSIBLE_MAGIC_ID,
      },
      {
        id: 'hybrid-sparkling-targe',
        name: 'Escudo Cintilante',
        originalName: 'Sparkling Targe',
        description: 'Espada e escudo com magia defensiva.',
        rulesSummary:
          'Confluxo: Golpe Protetor. Magias estudiosas: Resistir à Energia (7º), Agressão Protetora (11º), Resiliência da Montanha (13º).',
        sourceId: SOURCE_IMPOSSIBLE_MAGIC_ID,
      },
      {
        id: 'hybrid-starlit-span',
        name: 'Arco Estrelado',
        originalName: 'Starlit Span',
        description: 'Disparos à distância carregados de magia.',
        rulesSummary:
          'Confluxo: Estrela Cadente. Magias estudiosas: Manobra Telecinética (7º), Parede de Vento (11º), Movimento Livre (13º).',
        sourceId: SOURCE_IMPOSSIBLE_MAGIC_ID,
      },
      {
        id: 'hybrid-twisting-tree',
        name: 'Árvore Torcida',
        originalName: 'Twisting Tree',
        description: 'O cajado é extensão do corpo e da magia.',
        rulesSummary:
          'Confluxo: Cajado Giratório. Magias estudiosas: Resiliência de Carvalho (7º), Lentidão (11º), Cintilar (13º).',
        sourceId: SOURCE_IMPOSSIBLE_MAGIC_ID,
      },
      {
        id: 'hybrid-twofold-tine',
        name: 'Dente Duplo',
        originalName: 'Twofold Tine',
        description: 'Lança ou arma de haste: alcance e força num só estilo.',
        rulesSummary:
          'Confluxo: Arremesso de Força. Magias estudiosas: Desfocalizar (7º), Poço Gravitacional (11º), Movimento Livre (13º).',
        sourceId: SOURCE_IMPOSSIBLE_MAGIC_ID,
      },
      {
        id: 'hybrid-volatile-spark',
        name: 'Fagulha Volátil',
        originalName: 'Volatile Spark',
        description: 'Pólvora e magia no mesmo gatilho.',
        rulesSummary:
          'Confluxo: Rajada Estrondosa. Magias estudiosas: Flora Enredante (7º), Prender à Terra (11º), Selar Destino (13º).',
        sourceId: SOURCE_IMPOSSIBLE_MAGIC_ID,
      },
    ],
  },
  mechanicsGuide: [
    {
      title: 'Conjuração limitada',
      originalName: 'Magus Spellcasting',
      body: 'Você prepara magias arcanas do grimório, com no máximo 2 espaços por posto. Ao subir de nível os postos baixos permanecem — diferente da “onda” do Magus legado. Ataque e CD de magia usam Inteligência, mesmo que o atributo-chave marcial seja Força ou Destreza.',
    },
    {
      title: 'Golpe Mágico',
      originalName: 'Spellstrike',
      body: '2 ações: canalize uma magia de ataque (1 ou 2 ações) num Golpe. Gasta a magia e uma carga. Recarregar: 1 ação (confluxo também recarrega). No 19º, duas cargas. Na aba Combate: cargas, ataque de magia e magias de ataque preparadas.',
    },
  ],
  levelTable: [
    { level: 1, features: ['Conjuração de Magus', 'Estudo híbrido', 'Golpe Mágico', 'Feito de magus'] },
    { level: 2, features: ['Feito de magus', 'Feito de perícia'] },
    { level: 3, features: ['Magias de 2º', 'Feito geral', 'Aumento de perícia'] },
    { level: 4, features: ['Feito de magus', 'Feito de perícia'] },
    { level: 5, features: ['Magias de 3º', 'Aumentos de atributo', 'Feito de ancestralidade'] },
    { level: 6, features: ['Feito de magus', 'Feito de perícia'] },
    { level: 7, features: ['Magias estudiosas', 'Especialização em armas', 'Feito geral'] },
    { level: 8, features: ['Feito de magus', 'Feito de perícia'] },
    { level: 9, features: ['Conjurador especialista', 'Feito de ancestralidade'] },
    { level: 10, features: ['Aumentos de atributo', 'Feito de magus', 'Feito de perícia'] },
    { level: 11, features: ['Armadura média especialista', 'Feito geral'] },
    { level: 12, features: ['Feito de magus', 'Feito de perícia'] },
    { level: 13, features: ['Maestria com armas', 'Feito de ancestralidade'] },
    { level: 14, features: ['Feito de magus', 'Feito de perícia'] },
    { level: 15, features: ['Aumentos de atributo', 'Maior especialização', 'Feito geral'] },
    { level: 16, features: ['Feito de magus', 'Feito de perícia'] },
    { level: 17, features: ['Conjurador mestre', 'Maestria em armadura média'] },
    { level: 18, features: ['Feito de magus', 'Feito de perícia'] },
    { level: 19, features: ['Golpe Mágico duplo', 'Feito geral'] },
    { level: 20, features: ['Aumentos de atributo', 'Feito de magus', 'Feito de perícia'] },
  ],
  features: [
    {
      id: 'magus-spellcasting',
      name: 'Conjuração de Magus',
      originalName: 'Magus Spellcasting',
      level: 1,
      description:
        'Conjurador arcano preparado limitado: no 1º, 1 magia de 1º + 5 truques do grimório. Máximo 2 espaços por posto; os baixos permanecem. Ataque e CD usam Inteligência.',
    },
    {
      id: 'magus-spellbook',
      name: 'Grimório de Magus',
      originalName: 'Spellbook',
      level: 1,
      description:
        'Começa com truques e magias de 1º no grimório. A cada nível, adiciona 2 magias de posto que possa conjurar. Aprenda na aba Grimório; prepare nos espaços do dia.',
    },
    {
      id: 'magus-conflux',
      name: 'Magias de Confluxo',
      originalName: 'Conflux Spells',
      level: 1,
      description:
        'Aprende a magia de confluxo do estudo híbrido (foco). Reserva de 1 PF; Refocar estudando o grimório e treinando o corpo. Conjurar uma magia de confluxo recarrega o Golpe Mágico.',
    },
    {
      id: 'magus-spellstrike',
      name: 'Golpe Mágico',
      originalName: 'Spellstrike',
      level: 1,
      actionType: 'two',
      description:
        'Canalize uma magia de ataque no Golpe. A magia deve ter 1 ou 2 ações e o traço Ataque. Faça o Golpe; ele substitui o teste de ataque da magia. Se o Golpe acertar, a magia também acerta (crítico no Golpe = crítico na magia). Gasta a magia e uma carga. Sem carga, não usa. Recarregar: 1 ação, ou ao conjurar magia de confluxo.',
    },
    {
      id: 'magus-recharge-spellstrike',
      name: 'Recarregar Golpe Mágico',
      originalName: 'Recharge Spellstrike',
      level: 1,
      actionType: 'one',
      description:
        'Recupera uma carga de Golpe Mágico. Magias de confluxo recarregam automaticamente ao conjurar. Dedicação (Golpe Mágico do arquétipo): recarga de 1 minuto.',
    },
    {
      id: 'magus-double-spellstrike',
      name: 'Golpe Mágico Duplo',
      originalName: 'Double Spellstrike',
      level: 19,
      description:
        'Você tem duas cargas de Golpe Mágico. Recarregar recupera uma; confluxo recupera uma.',
    },
  ],
  lore: {
    summary:
      'Guerreiro-estudioso que funde golpe e magia arcana. Poucos espaços, muita precisão.',
    duringCombat:
      'Golpe Mágico, Cascata Arcana e magias curtas nos momentos certos.',
    duringSocial:
      'Pode impressionar com disciplina militar e conhecimento arcano.',
    whileExploring:
      'Usa magia utilitária do grimório e perícia marcial.',
    inDowntime: 'Estuda grimório, treina formas e forja o estilo híbrido.',
    youMight: [
      'Tratar magia como extensão da esgrima.',
      'Anotar cada Golpe Mágico como se fosse uma tese.',
    ],
    othersProbably: [
      'Acharem você um mago de armadura — ou um guerreiro que “trapaceia” com magia.',
    ],
  },
  aonUrl: 'https://2e.aonprd.com/Classes.aspx?ID=74',
}
