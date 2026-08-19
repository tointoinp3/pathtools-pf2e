import type { CreatureFamily } from '@/types/creature'

function fam(partial: CreatureFamily): CreatureFamily {
  return partial
}

/**
 * Famílias AoN Monster Families ligadas às fichas de Howl of the Wild (Remaster).
 * Asides = barras laterais oficiais da página da família. Sem blurb de membro.
 * Famílias já no catálogo (quimera, sapo, hidra, mantícora, unicórnio, guia espiritual,
 * dinossauro, grifo, basilisco, lobisomem, tubarão) são reusadas pelos IDs antigos.
 */
export const catalogCreatureFamiliesHowlOfTheWild: CreatureFamily[] = [
  fam({
    id: 'family-dischoran',
    name: 'Discorano',
    originalName: 'Dischoran',
    trait: null,
    source: 'Howl of the Wild',
    sourcePage: 140,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=490',
    intro:
      'Discoranos são um grupo de predadores que caçam por som focado. Embora possuam protuberâncias que lembram olhos, na verdade são órgãos sensoriais auditivos capazes de captar o menor ruído e localizar a presa com precisão absoluta.\n\nSó alguns tipos de discoranos foram identificados, mas todos compartilham traços unificadores: pseudo-olhos voltados para a frente, velocidade enganosa e fome voraz. A sensibilidade a ruído combinada com a capacidade de transformar som em arma é provavelmente a razão principal pela qual discoranos passam a maior parte do tempo sozinhos.',
    sections: [],
  }),
  fam({
    id: 'family-ethereal-wildlife',
    name: 'Fauna etérea',
    originalName: 'Ethereal Wildlife',
    trait: null,
    source: 'Howl of the Wild',
    sourcePage: 146,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=492',
    intro: 'Os animais a seguir têm laços com o Plano Etéreo.',
    sections: [],
  }),
  fam({
    id: 'family-fish',
    name: 'Peixe',
    originalName: 'Fish',
    trait: null,
    source: 'Howl of the Wild',
    sourcePage: 148,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=493',
    intro:
      'Essas criaturas magníficas se escondem sob a superfície de lagos calmos, rios correntes e mares vastos. A água é o domínio delas, e algumas protegem o lar com afinco.',
    sections: [],
  }),
  fam({
    id: 'family-galvanoscale',
    name: 'Galvanescama',
    originalName: 'Galvanoscale',
    trait: null,
    source: 'Howl of the Wild',
    sourcePage: 152,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=495',
    intro:
      'Uma característica interessante de vários répteis de Golarion é a capacidade de gerar ou manipular corrente elétrica. Embora não haja uma única razão para essa qualidade, espécies suficientes a possuem para que estudiosos criassem a categoria de répteis conhecida como galvanescamas.',
    sections: [],
  }),
  fam({
    id: 'family-gorgon',
    name: 'Górgona',
    originalName: 'Gorgon',
    trait: null,
    source: 'Howl of the Wild',
    sourcePage: 154,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=496',
    intro:
      'Górgonas são um grupo amplo de animais que compartilham alguns traços peculiares. Todas são cobertas de placas de armadura e exalam gases petrificantes. Fora isso, górgonas podem lembrar quase qualquer animal. Embora algumas pareçam criaturas menos imponentes, nunca devem ser subestimadas. São caçadoras astutas, e até um sopro pequeno do bafo pode imobilizar quase qualquer presa.',
    sections: [],
  }),
  fam({
    id: 'family-hexmoth',
    name: 'Mariposa-feitiço',
    originalName: 'Hexmoth',
    trait: null,
    source: 'Howl of the Wild',
    sourcePage: 159,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=498',
    intro:
      'À primeira vista, vermes-feitiço parecem larvas sem graça, mas a capacidade de sentir e consumir magia logo fica clara. Crescem rápido, devorando o poder em cabanas de bruxas, gabinetes de arcanistas e clareiras mágicas a um ritmo alarmante antes de tecer casulos e emergir como mariposas-feitiço belas e variadas. Algumas têm gosto por tipos particulares de magia, como magias de fogo ou magia primal.',
    sections: [],
  }),
  fam({
    id: 'family-seal',
    name: 'Foca',
    originalName: 'Seal',
    trait: null,
    source: 'Howl of the Wild',
    sourcePage: 178,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=501',
    intro:
      'Focas são mamíferos carnívoros semiaquáticos encontrados em praias por Golarion. São conhecidas pelas habilidades extraordinárias de caça, usando os bigodes sensíveis para detectar o movimento e o tamanho dos peixes que perseguem, o que lhes permite até localizar presas escondidas.',
    sections: [],
  }),
  fam({
    id: 'family-tardigrade',
    name: 'Tardígrado',
    originalName: 'Tardigrade',
    trait: null,
    source: 'Howl of the Wild',
    sourcePage: 187,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=503',
    intro:
      'Tardígrados não crescem mais que a largura de um fio de cabelo, mas quando os ambientes à beira-rio são expostos a níveis elevados de magia, esses onívoros de oito patas podem alcançar tamanhos enormes.',
    sections: [],
  }),
  fam({
    id: 'family-wardens-of-the-wild',
    name: 'Guardiões do Ermo',
    originalName: 'Wardens of the Wild',
    trait: null,
    source: 'Howl of the Wild',
    sourcePage: 203,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=506',
    intro:
      'Todos os Guardiões do Ermo compartilham as duas habilidades a seguir.\n\n**Voz da Natureza** Embora os Guardiões do Ermo não falem com palavras, comunicam conceitos complexos de forma impecável e sem fala com qualquer animal, besta, planta ou outra criatura do mundo natural por contato visual prolongado. Criaturas sapientes com laços fortes com o mundo natural, como bárbaros de instinto animal ou druidas que falam o Canto Selvagem, conseguem entender um Guardião do Ermo em parte, embora o sentido possa ser vago.\n\n**Coroa do Guardião** A coroa chifruda de um Guardião do Ermo impõe respeito às criaturas selvagens. Criaturas selvagens nativas do bioma de um guardião melhoram automaticamente a atitude em um passo (até amistosa) e em geral não tomam ações hostis umas contra as outras na presença do guardião.',
    sections: [],
  }),
]
