import type { BackgroundDraft } from './backgroundFactory'
import { SOURCE_BATTLECRY_ID } from './sources'

const BC = SOURCE_BATTLECRY_ID

/**
 * Origens Battlecry! (Remaster). Howl of the Wild, Impossible Magic,
 * War of Immortals e Divine Mysteries não têm origens no AoN.
 * Guns & Gears (Remastered) já está no lote 2.
 */
export const draftsBatch5: BackgroundDraft[] = [
  {
    id: 'bc-battle-mechanic',
    name: 'Mecânico de Batalha',
    originalName: 'Battle Mechanic',
    sourceId: BC,
    sourcePage: 16,
    boosts: ['intelligence', 'wisdom'],
    skill: 'crafting',
    lore: { type: 'fixed', id: 'vehicle-lore', name: 'Conhecimento de Veículos' },
    feats: [{ name: 'Reparo Rápido', originalName: 'Quick Repair' }],
    description:
      'Veículos quebram — desgaste e o inimigo. Você conserta aéreos, terrestres e náuticos e conhece as ferramentas de cada um.',
  },
  {
    id: 'bc-combat-carpenter',
    name: 'Carpinteiro de Combate',
    originalName: 'Combat Carpenter',
    sourceId: BC,
    sourcePage: 16,
    boosts: ['dexterity', 'intelligence'],
    skill: 'crafting',
    lore: { type: 'fixed', id: 'engineering-lore', name: 'Conhecimento de Engenharia' },
    feats: [{ name: 'Ofício Especializado', originalName: 'Specialty Crafting' }],
    description:
      'Horas escolhendo madeira, desenhando e construindo prédios, escudos, armas e ferramentas. Você vê o ponto fraco de uma paliçada e como reforçá-la ou derrubá-la.',
  },
  {
    id: 'bc-combat-chaplain',
    name: 'Capelão de Combate',
    originalName: 'Combat Chaplain',
    sourceId: BC,
    sourcePage: 16,
    boosts: ['wisdom', 'charisma'],
    skill: 'religion',
    lore: { type: 'custom', prompt: 'conhecimento da divindade que você venera' },
    feats: [{ name: 'Reconhecer Magia', originalName: 'Recognize Spell' }],
    description:
      'Cuidava do ânimo e da fé de soldados e famílias. Mesmo seguindo uma divindade, atuava como embaixador da igreja num exército plural — conselho, ritos e apoio no campo.',
  },
  {
    id: 'bc-conscript',
    name: 'Conscrito',
    originalName: 'Conscript',
    sourceId: BC,
    sourcePage: 16,
    boosts: ['strength', 'constitution'],
    skill: 'society',
    lore: { type: 'fixed', id: 'warfare-lore', name: 'Conhecimento de Guerra' },
    feats: [{ name: 'Conhecimento Duvidoso', originalName: 'Dubious Knowledge' }],
    description:
      'Como tantos no seu povoado, serviu no exército ao atingir a idade. Os veteranos tentaram tirar sua ingenuidade; um pouco restou. Você sabe o bastante de tática para ser perigoso.',
  },
  {
    id: 'bc-plague-doctor',
    name: 'Médico da Peste',
    originalName: 'Plague Doctor',
    sourceId: BC,
    sourcePage: 17,
    boosts: ['constitution', 'wisdom'],
    skill: 'medicine',
    lore: { type: 'fixed', id: 'herbalism-lore', name: 'Conhecimento de Herbalismo' },
    feats: [{ name: 'Inoculação', originalName: 'Inoculation' }],
    description:
      'Pestes nascem de mortes em massa e da praga que as segue. Cidades sitiadas adoecem sem comida e água limpa. Você trata os doentes — e o mundo parece mais sombrio depois de tanta desgraça.',
  },
  {
    id: 'bc-quartermaster',
    name: 'Quartel-mestre',
    originalName: 'Quartermaster',
    sourceId: BC,
    sourcePage: 17,
    boosts: ['intelligence', 'charisma'],
    skill: 'intimidation',
    lore: { type: 'fixed', id: 'legal-lore', name: 'Conhecimento Legal' },
    feats: [{ name: 'Olhar Intimidante', originalName: 'Intimidating Glare' }],
    description:
      'O exército marcha com o estômago. Você garantia ração e suprimento — e um olhar que faz o soldado sem autorização recuar.',
  },
  {
    id: 'bc-report-runner',
    name: 'Mensageiro de Relatórios',
    originalName: 'Report Runner',
    sourceId: BC,
    sourcePage: 17,
    boosts: ['strength', 'wisdom'],
    skill: 'nature',
    lore: { type: 'fixed', id: 'stabling-lore', name: 'Conhecimento de Estábulo' },
    feats: [{ name: 'Cavaleiro Expresso', originalName: 'Express Rider' }],
    description:
      'Exércitos se afastam do governo ou se separam do comando. Sua montaria e você levavam relatórios de um ponto a outro — velocidade acima de tudo.',
  },
  {
    id: 'bc-veteran',
    name: 'Veterano',
    originalName: 'Veteran',
    sourceId: BC,
    sourcePage: 17,
    boosts: ['constitution', 'wisdom'],
    skill: 'athletics',
    lore: { type: 'fixed', id: 'warfare-lore', name: 'Conhecimento de Guerra' },
    feats: [{ name: 'Ajuda com Armadura', originalName: 'Armor Assist' }],
    description:
      'Mais batalhas do que consegue contar, e ainda está de pé. Nada surpreende — salvo quando o plano funciona. Cada dia a mais ainda é uma surpresa boa.',
  },
  {
    id: 'bc-war-orphan',
    name: 'Órfão de Guerra',
    originalName: 'War Orphan',
    sourceId: BC,
    sourcePage: 17,
    boosts: ['dexterity', 'constitution'],
    skill: 'thievery',
    lore: { type: 'fixed', id: 'underworld-lore', name: 'Conhecimento do Submundo' },
    feats: [{ name: 'Truque Sujo', originalName: 'Dirty Trick' }],
    description:
      'A guerra te deixou só. Outros jovens na mesma situação viraram família, mas viver fora da lei foi o preço. Isso ficou para trás — alguns truques, não.',
  },
  {
    id: 'bc-aeronaut',
    name: 'Aeronauta',
    originalName: 'Aeronaut',
    sourceId: BC,
    sourcePage: 17,
    rarity: 'uncommon',
    boosts: ['strength', 'dexterity'],
    skill: 'athletics',
    lore: { type: 'fixed', id: 'piloting-lore', name: 'Conhecimento de Pilotagem' },
    feats: [
      {
        name: 'Garantia',
        originalName: 'Assurance',
        requiresSkillId: 'athletics',
      },
    ],
    description:
      'Você pilota balões, dirigíveis, veículos alados e maravilhas ainda mais estranhas — transporte, exploração e combate. Vive pela vista acima da refrega e pelos ventos que enchem o céu.',
  },
  {
    id: 'bc-arcane-revolutionary',
    name: 'Revolucionário Arcano',
    originalName: 'Arcane Revolutionary',
    sourceId: BC,
    sourcePage: 17,
    rarity: 'uncommon',
    boosts: ['dexterity', 'intelligence'],
    skill: 'arcana',
    lore: { type: 'custom', prompt: 'povoado que você libertou' },
    feats: [{ name: 'Identificação Rápida', originalName: 'Quick Identification' }],
    description:
      'Lutou contra governos opressores com magia antiga, libertando a comunidade de exércitos maiores. Assédio, sabotagem e o ponto cego do inimigo viraram ofício.',
  },
  {
    id: 'bc-battlefield-scrounger',
    name: 'Catador de Campo de Batalha',
    originalName: 'Battlefield Scrounger',
    sourceId: BC,
    sourcePage: 17,
    rarity: 'uncommon',
    boosts: ['strength', 'intelligence'],
    skill: 'crafting',
    lore: { type: 'fixed', id: 'warfare-lore', name: 'Conhecimento de Guerra' },
    feats: [{ name: 'Improvisar Ferramenta', originalName: 'Improvise Tool' }],
    description:
      'Anos revirando mortos e equipamento assim que a batalha acabava, transformando sucata em algo útil. Deixou essa vida, mas ficou a guerra e o jeito de fabricar com o que sobra.',
  },
  {
    id: 'bc-martial-musician',
    name: 'Músico Marcial',
    originalName: 'Martial Musician',
    sourceId: BC,
    sourcePage: 17,
    rarity: 'uncommon',
    boosts: ['dexterity', 'charisma'],
    skill: 'performance',
    lore: { type: 'fixed', id: 'warfare-lore', name: 'Conhecimento de Guerra' },
    feats: [{ name: 'Performance Impressionante', originalName: 'Impressive Performance' }],
    description:
      'Antes da idade de lutar, você já estava no campo com gaita, corneta ou tambor. O ritmo marcava o passo, a direção e a coragem das tropas.',
  },
]
