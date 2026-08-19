import type { ClassCatalogDefinition } from '@/types/class'
import { CLASS_ANIMIST_ID } from '../ids'
import { SOURCE_WAR_OF_IMMORTALS_ID } from '../sources'
import { catalogOption, section } from './helpers'

const SRC = SOURCE_WAR_OF_IMMORTALS_ID

function apparition(opts: {
  id: string
  name: string
  originalName: string
  page: number
  description: string
  lores: [string, string]
  cantrip: string
  spells: string
  vessel: string
  avatar: string
}): ReturnType<typeof catalogOption> {
  return catalogOption({
    id: opts.id,
    name: opts.name,
    originalName: opts.originalName,
    sourcePage: opts.page,
    description: opts.description,
    loreNames: opts.lores,
    loreExpertAtLevel: 8,
    loreMasterAtLevel: 16,
    rulesSummary: `Lores: ${opts.lores.join(', ')} (treinadas; especialista 8º, mestre 16º). Truque: ${opts.cantrip}. Vaso: ${opts.vessel}.`,
    sections: [
      section('Repertório', `Truque: ${opts.cantrip}. ${opts.spells}`),
      section('Magia de vaso', opts.vessel),
      section('Avatar (19º)', opts.avatar),
    ],
  })
}

export const animistApparitionCatalog: ClassCatalogDefinition = {
  id: 'animist-apparitions',
  classId: CLASS_ANIMIST_ID,
  label: 'Aparições sintonizadas',
  originalName: 'Apparition Attunement',
  description:
    'Cada dia você sintoniza 2 aparições (3 no 7º, 4 no 15º). Uma é a primária (vaso e, no 19º, avatar). Ao Refocus, pode trocar qual das sintonizadas é a primária. Aparições de AP ficam de fora.',
  kind: 'daily',
  unique: true,
  slotsByLevel: [
    { minLevel: 1, count: 2 },
    { minLevel: 7, count: 3 },
    { minLevel: 15, count: 4 },
  ],
  primaryPick: {
    label: 'Aparição primária',
    description:
      'Concede a magia de vaso e o avatar. Precisa ser uma das sintonizadas hoje.',
  },
  searchPlaceholder: 'Buscar aparição…',
  options: [
    apparition({
      id: 'apparition-crafter-in-the-vault',
      name: 'Artesão no Cofre',
      originalName: 'Crafter in the Vault',
      page: 17,
      description:
        'Masmorra e forja: criação e ferimento no mesmo lugar. Ciumento se alguém invade a especialidade.',
      lores: ['Conhecimento de Arquitetura', 'Conhecimento de Engenharia'],
      cantrip: 'Símbolo',
      spells:
        '1º Consertar; 2º Arrombar; 3º Arma Fantasma; 4º Criação; 5º Espeto Empalador; 6º Muralha de Metal; 7º Serra Degoladora; 8º Forma Ferrosa; 9º Mansão Resplandecente.',
      vessel: 'Oficina Itinerante (Traveling Workshop)',
      avatar: 'Masmorra Encarnada — Deslocamento 15 m, escavar ou voo 15 m.',
    }),
    apparition({
      id: 'apparition-custodian-of-groves',
      name: 'Guardião de Bosques e Jardins',
      originalName: 'Custodian of Groves and Gardens',
      page: 18,
      description:
        'Horta, lavoura, lugar de descanso onde o verde cresce. Pacífico e avesso a briga.',
      lores: ['Conhecimento de Lavoura', 'Conhecimento de Herbalismo'],
      cantrip: 'Cipó Emaranhado',
      spells:
        '1º Árvore Protetora; 2º Brisa Suave; 3º Passagem Segura; 4º Bolha Pacífica; 5º Idiomas Verdadeiros; 6º Campo de Vida; 7º Gaiola de Lenha Viva; 8º Instante de Renovação; 9º Inimizade da Natureza.',
      vessel: 'Jardim da Cura (Garden of Healing)',
      avatar: 'Confins Pacíficos — 18 m, ignora terreno difícil.',
    }),
    apparition({
      id: 'apparition-echo-of-lost-moments',
      name: 'Eco de Momentos Perdidos',
      originalName: 'Echo of Lost Moments',
      page: 18,
      description:
        'Memórias que todos esqueceram. Magia do tempo quebrada. Gosta de anfitrião ordeiro.',
      lores: ['Conhecimento de Adivinhação', 'Conhecimento de Genealogia'],
      cantrip: 'Figmento',
      spells:
        '1º Déjà Vu; 2º Dissipar Magia; 3º Maldição do Tempo Perdido; 4º Visão da Morte; 5º Cena Ilusória; 6º Calamidade Fantasmagórica; 7º Retrocognição; 8º Dilema; 9º Premonição.',
      vessel: 'Guardar Tempo (Store Time)',
      avatar: 'Devorador do Tempo Perdido — 9 m, voo 15 m.',
    }),
    apparition({
      id: 'apparition-impostor-in-hidden-places',
      name: 'Impostor em Lugares Ocultos',
      originalName: 'Impostor in Hidden Places',
      page: 18,
      description:
        'Sussurra em cantos sem voz mortal. Azar para quem perturba; aliado para quem ganha confiança.',
      lores: ['Conhecimento de Adivinhação', 'Conhecimento do Submundo'],
      cantrip: 'Mão Telecinética',
      spells:
        '1º Mau Agouro; 2º Invisibilidade; 3º Véu de Privacidade; 4º Portal Liminar; 5º Geometria Estranha; 6º Induzir ao Erro; 7º Palácio Planar; 8º Desaparecimento; 9º Fantasmagoria.',
      vessel: 'Sussurro Incômodo (Discomfiting Whisper)',
      avatar: 'Sussurro nas Sombras — 15 m, voo 15 m.',
    }),
    apparition({
      id: 'apparition-lurker-in-devouring-dark',
      name: 'Espreitador na Escuridão Devoradora',
      originalName: 'Lurker in Devouring Dark',
      page: 19,
      description:
        'Naufrágio, iceberg, água funda. Variante da Tapeçaria Negra troca Navegação por Tapeçaria e o dano vira vazio.',
      lores: ['Conhecimento do Oceano', 'Conhecimento de Navegação'],
      cantrip: 'Explosão Cáustica',
      spells:
        '1º Tentáculos Sombrios; 2º Agarre Ácido; 3º Orbe Aquoso; 4º Garras das Profundezas; 5º Muralha de Gelo; 6º Pilar de Geada; 7º Profundezas Famintas; 8º Fenda Ártica; 9º Implosão.',
      vessel: 'Forma da Escuridão Devoradora (Devouring Dark Form)',
      avatar: 'Tentáculos da Escuridão — 21 m, natação 21 m.',
    }),
    apparition({
      id: 'apparition-monarch-of-the-fey-courts',
      name: 'Monarca das Cortes Feéricas',
      originalName: 'Monarch of the Fey Courts',
      page: 19,
      description:
        'Primeiro Mundo e ninfas. Vaidoso, caprichoso, não perdoa desaforo.',
      lores: ['Conhecimento de Arte', 'Conhecimento Feérico'],
      cantrip: 'Cipó Emaranhado',
      spells:
        '1º Encantar; 2º Criar Comida; 3º Embevecer; 4º Sugestão; 5º Alucinação; 6º Dominar; 7º Máscara de Terror; 8º Dança Incontrolável; 9º Canção Insondável.',
      vessel: 'Graça da Ninfa (Nymph’s Grace)',
      avatar: 'Rainha da Corte de Inverno — 15 m, voo e natação 15 m.',
    }),
    apparition({
      id: 'apparition-reveler-in-lost-glee',
      name: 'Folião na Alegria Perdida',
      originalName: 'Reveler in Lost Glee',
      page: 19,
      description:
        'Lugares abandonados que já foram festa. Ri do desconforto alheio.',
      lores: ['Conhecimento de Circo', 'Conhecimento de Adivinhação'],
      cantrip: 'Prestidigitação',
      spells:
        '1º Cores Vertiginosas; 2º Crise de Riso; 3º Hipnotizar; 4º Confusão; 5º Cena Ilusória; 6º Padrão Vibrante; 7º Distorcer a Mente; 8º Dilema; 9º Lamentos dos Condenados.',
      vessel: 'Espelhos do Trapaceiro (Trickster’s Mirrors)',
      avatar: 'Mestre da Celebração Sombria — 15 m, ignora terreno difícil.',
    }),
    apparition({
      id: 'apparition-stalker-in-darkened-boughs',
      name: 'Espreitador nos Galhos Escuros',
      originalName: 'Stalker in Darkened Boughs',
      page: 20,
      description:
        'Floresta antiga que não quer dono. Impulsivo; fica se o ódio for aplacado.',
      lores: ['Conhecimento de Floresta', 'Conhecimento de Caça'],
      cantrip: 'Garra Dilacerante',
      spells:
        '1º Corpo Rúnico; 2º Vomitar Enxame; 3º Muralha de Espinhos; 4º Maldição Bestial; 5º Frenesi Lunar; 6º Cipós Emaranhados; 7º Matilha Livre; 8º Forma Monstruosa; 9º Tempestade Colérica.',
      vessel: 'Forma da Floresta Sombria (Darkened Forest Form)',
      avatar: 'Fera dos Galhos — 21 m, voo 21 m.',
    }),
    apparition({
      id: 'apparition-steward-of-stone-and-fire',
      name: 'Mordomo de Pedra e Fogo',
      originalName: 'Steward of Stone and Fire',
      page: 20,
      description:
        'Vulcão, nascente escaldante, rocha velha. Ira rápida, memória longa.',
      lores: ['Conhecimento de Montanha', 'Conhecimento de Vulcão'],
      cantrip: 'Ignição',
      spells:
        '1º Terra Interposta; 2º Terra Explosiva; 3º Bola de Fogo; 4º Muralha de Fogo; 5º Muralha de Pedra; 6º Petrificar; 7º Erupção Vulcânica; 8º Terremoto; 9º Estrelas Cadentes.',
      vessel: 'Bílis da Terra (Earth’s Bile)',
      avatar: 'Sangue dos Planetas — 15 m, escavar 15 m.',
    }),
    apparition({
      id: 'apparition-vanguard-of-roaring-waters',
      name: 'Vanguarda das Águas Rugindo',
      originalName: 'Vanguard of Roaring Waters',
      page: 21,
      description:
        'Corredeira, rebentação, recife. Ama o caos e se entedia fácil.',
      lores: ['Conhecimento de Montanha', 'Conhecimento de Rio'],
      cantrip: 'Respingo Revigorante',
      spells:
        '1º Ímpeto Hidráulico; 2º Névoa; 3º Onda Estilhaçante; 4º Torrente Hidráulica; 5º Controlar Água; 6º Oceano Pessoal; 7º Fonte Dançante; 8º Redemoinho; 9º Tempestade Colérica.',
      vessel: 'Rio que Talha Montanhas (River Carving Mountains)',
      avatar: 'Rio que Parte o Mundo — 15 m, natação 21 m.',
    }),
    apparition({
      id: 'apparition-witness-to-ancient-battles',
      name: 'Testemunha de Batalhas Antigas',
      originalName: 'Witness to Ancient Battles',
      page: 21,
      description:
        'Soldado que não voltou, valquíria, ou o próprio campo de batalha ganhou alma. Sóbrio.',
      lores: ['Conhecimento de Campos de Batalha', 'Conhecimento de Heráldica'],
      cantrip: 'Escudo',
      spells:
        '1º Golpe Certo; 2º Aumentar; 3º Arma Fantasma; 4º Tempestade de Armas; 5º Invocar Espíritos; 6º Calamidade Fantasmagórica; 7º Alvo Verdadeiro; 8º Cântico da Dor Eterna; 9º Arma do Juízo.',
      vessel: 'Encarnação da Batalha (Embodiment of Battle)',
      avatar: 'General da Batalha Sem Fim — 21 m, imune a imobilizado.',
    }),
  ].map((o) => ({ ...o, sourceId: SRC })),
}
