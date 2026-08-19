import type { CreatureFamily } from '@/types/creature'

const SOURCE = 'Pathfinder #200: Seven Dooms for Sandpoint'

function fam(
  partial: Omit<CreatureFamily, 'source'> & { source?: string },
): CreatureFamily {
  return { source: SOURCE, ...partial }
}

/**
 * Famílias AoN Monster Families de Pathfinder #200: Seven Dooms for Sandpoint.
 * Asides = barras laterais oficiais da página da família. Sem blurb de membro.
 * Famílias já no catálogo (autômato de corda, demônio, carniçal, goblin, etc.)
 * são reusadas pelos IDs antigos.
 */
export const catalogCreatureFamiliesSevenDooms: CreatureFamily[] = [
  fam({
    id: 'family-longlegs',
    name: 'Pernalonga',
    originalName: 'Longlegs',
    trait: null,
    sourcePage: 192,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=507',
    intro:
      'Enquanto os espécimes menores desses aracnídeos de aparência inquietante (conhecidos regionalmente por nomes como ceifeiras, aranhas-cócega ou opiliões) são inofensivos, os primos maiores, chamados simplesmente de pernalongas, são tudo menos isso.',
    sections: [
      {
        id: 'longlegs-species',
        title: 'Espécies de Pernalonga',
        body: 'Além dos dois tipos comuns apresentados aqui, muitas outras variantes de pernalongas existem em Golarion, com exceção das regiões árticas, onde não prosperam. Costumam viver na periferia das cidades, espreitando esgotos ou ruínas onde a caça é boa. Enxames de pernalongas de esgoto são particularmente perigosos e infestam as subcidades de muitos povoados taldanos; a oeste, em Cheliax, as pernalongas-executoras, bem maiores, preferem viver nos telhados de favelas onde o domínio de Thrune foi especialmente cruel. Entre as maiores de todas, porém, está a temida (e felizmente rara) ceifeira-de-árvore da Expansão Mwangi.',
      },
    ],
  }),
  fam({
    id: 'family-zoog',
    name: 'Zoog',
    originalName: 'Zoog',
    trait: null,
    sourcePage: 192,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=508',
    intro:
      'Peludos, com focinho de tentáculos e dados a chilreios, os zoogs habitam as partes sombrias do mundo onde os sonhos têm o jeito inquietante de se tornarem reais. Em geral reúnem-se em famílias pequenas e, embora normalmente comam fungos e plantas, alguns desenvolveram gosto por seres sencientes.',
    sections: [
      {
        id: 'zoogs-vs-cats',
        title: 'Zoogs vs. Gatos',
        body: 'Zoogs e gatos têm um ódio lendário, embora nenhum dos lados lembre a causa original. Zoogs já foram vistos predando gatinhos, mas a coragem falha depressa diante de um gato adulto. Os gatos, por outro lado, sempre se lançam a pular, perseguir e atacar zoogs à vista.',
      },
    ],
  }),
]
