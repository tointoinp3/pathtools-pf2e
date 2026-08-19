import type { CreatureFamily } from '@/types/creature'

const MONSTER_CORE_2 = 'Monster Core 2'

function fam(
  partial: Omit<CreatureFamily, 'source'> & { source?: string },
): CreatureFamily {
  return { source: MONSTER_CORE_2, ...partial }
}

/**
 * Lore de família Remaster para o 9º lote do Monster Core 2.
 * Famílias já existentes (dragões MC2, sombra, autômato de corda, zumbi)
 * não se repetem.
 */
export const catalogCreatureFamiliesMonsterCore2Batch9: CreatureFamily[] = [
  fam({
    id: 'family-dragonblood',
    name: "Sangue-de-dragão",
    originalName: "Dragonblood",
    trait: "Dragonblood",
    aonUrl: "https://2e.aonprd.com/MonsterFamilies.aspx?ID=590",
    intro:
      "Quando um dragão exerce influência numa comunidade, seja pela força ou misturando-se e vivendo entre os mortais, pode nascer uma criança que exibe aspectos físicos ou mentais daquele dragão. Esses descendentes são conhecidos como sangue-de-dragão e muitas vezes têm traços dracônicos que denunciam a herança. Sangue-de-dragão pode ser achado entre todas as ancestralidades, embora muitos sejam humanos ou tenham alguma conexão dracônica já existente, como kobolds com associação estreita a um dragão.\n\nUm sangue-de-dragão em geral possui algum traço físico que revela a natureza dracônica. Podem ser sutis, como unhas alongadas semelhantes a garras ou coloração única dos olhos. Para muitos, os traços são mais evidentes: chifres, caudas dracônicas, asas ou manchas de escamas. Em alguns casos, um sangue-de-dragão parece um dragão bípede de imediato, o que frequentemente leva a confundi-los com outras ancestralidades reptilianas, como kobolds e lagartos. Para os que não têm traços óbvios, ainda há indícios ocasionais da influência dracônica, em geral manifestando-se em momentos de emoção avassaladora, ainda que só por um instante.\n\nSangue-de-dragão pode rastrear a conexão a um tipo específico de dragão, comumente chamado de exemplar dracônico. Os traços físicos e as habilidades de um sangue-de-dragão sempre combinam com os do exemplar. Um sangue-de-dragão cujo exemplar é um dragão de cinzas, por exemplo, manifesta escamas carmesins ou a habilidade de soprar fogo. A opinião de um dragão sobre um sangue-de-dragão aparentado varia. A maioria dos dragões encara sangue-de-dragão com indiferença. Dragões benevolentes e sociáveis muitas vezes acham parentesco ao saber de um sangue-de-dragão relacionado. Alguns dragões, porém, os veem como inferiores. Como um sangue-de-dragão não é um dragão \"de verdade\", o exemplar dracônico pouco se importa.",
    sections: [
    ],
  }),
  fam({
    id: 'family-dragonfly',
    name: "Libélula",
    originalName: "Dragonfly",
    trait: null,
    aonUrl: "https://2e.aonprd.com/MonsterFamilies.aspx?ID=591",
    intro:
      "Libélulas caçam com uma combinação de poder ágil e velocidade mortal. Nos estágios iniciais da vida, esses insetos são predadores inteiramente aquáticos, mas tomam o ar depois da muda. A maioria vive em torno de corpos d'água adequados à desova, mas libélulas gigantes já foram vistas voando muitos quilômetros enquanto caçam. Embora as asas diáfanas e os corpos coloridos sejam belos à primeira vista, um aventureiro desavisado atraído pelo espetáculo corre o risco bem real de virar almoço.",
    sections: [
      {
        id: "dragonfly-species",
        title: "Espécies de libélula",
        body: "Embora libélulas venham em muitas cores, as diferenças entre espécies às vezes vão além da variação estética. Libélulas azuis gigantes são versões maiores e tóxicas dos insetos, com uma mordida entorpecente que boggards usam para fabricar venenos. Libélulas de caverna são variantes mais lentas mas mais fortes que habitam grandes sistemas de cavernas. As lendárias libélulas da tempestade são criaturas verdadeiramente imensas que podem usar as asas poderosas para atordoar os inimigos.",
      },
    ],
  }),
]
