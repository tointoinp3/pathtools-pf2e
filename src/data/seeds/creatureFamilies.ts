import type { CreatureFamily } from '@/types/creature'
import { catalogCreatureFamiliesMonsterCoreBatch } from './creatureFamiliesMonsterCoreBatch'
import { catalogCreatureFamiliesMonsterCoreBatch2 } from './creatureFamiliesMonsterCoreBatch2'
import { catalogCreatureFamiliesMonsterCoreBatch3 } from './creatureFamiliesMonsterCoreBatch3'
import { catalogCreatureFamiliesMonsterCoreBatch4 } from './creatureFamiliesMonsterCoreBatch4'
import { catalogCreatureFamiliesMonsterCoreBatch5 } from './creatureFamiliesMonsterCoreBatch5'
import { catalogCreatureFamiliesMonsterCoreBatch6 } from './creatureFamiliesMonsterCoreBatch6'
import { catalogCreatureFamiliesMonsterCoreBatch7 } from './creatureFamiliesMonsterCoreBatch7'
import { catalogCreatureFamiliesMonsterCoreBatch8 } from './creatureFamiliesMonsterCoreBatch8'
import { catalogCreatureFamiliesMonsterCoreBatch9 } from './creatureFamiliesMonsterCoreBatch9'
import { catalogCreatureFamiliesMonsterCore2Batch } from './creatureFamiliesMonsterCore2Batch'
import { catalogCreatureFamiliesMonsterCore2Batch2 } from './creatureFamiliesMonsterCore2Batch2'
import { catalogCreatureFamiliesMonsterCore2Batch3 } from './creatureFamiliesMonsterCore2Batch3'
import { catalogCreatureFamiliesMonsterCore2Batch4 } from './creatureFamiliesMonsterCore2Batch4'
import { catalogCreatureFamiliesMonsterCore2Batch5 } from './creatureFamiliesMonsterCore2Batch5'
import { catalogCreatureFamiliesMonsterCore2Batch6 } from './creatureFamiliesMonsterCore2Batch6'
import { catalogCreatureFamiliesMonsterCore2Batch7 } from './creatureFamiliesMonsterCore2Batch7'
import { catalogCreatureFamiliesMonsterCore2Batch8 } from './creatureFamiliesMonsterCore2Batch8'
import { catalogCreatureFamiliesMonsterCore2Batch9 } from './creatureFamiliesMonsterCore2Batch9'
import { catalogCreatureFamiliesLostOmens } from './creatureFamiliesLostOmens'
import { catalogCreatureFamiliesRageOfElements } from './creatureFamiliesRageOfElements'
import { catalogCreatureFamiliesHowlOfTheWild } from './creatureFamiliesHowlOfTheWild'
import { catalogCreatureFamiliesDraconicCodex } from './creatureFamiliesDraconicCodex'
import { catalogCreatureFamiliesNpcCore } from './creatureFamiliesNpcCore'
import { catalogCreatureFamiliesSeasonOfGhosts } from './creatureFamiliesSeasonOfGhosts'
import { catalogCreatureFamiliesGatewalkers } from './creatureFamiliesGatewalkers'
import { catalogCreatureFamiliesSevenDooms } from './creatureFamiliesSevenDooms'
import { catalogCreatureFamiliesWardens } from './creatureFamiliesWardens'
import { catalogCreatureFamiliesCurtainCall } from './creatureFamiliesCurtainCall'
import { catalogCreatureFamiliesTriumphTusk } from './creatureFamiliesTriumphTusk'
import { catalogCreatureFamiliesSporeWar } from './creatureFamiliesSporeWar'
import { catalogCreatureFamiliesShadesOfBlood } from './creatureFamiliesShadesOfBlood'
import { catalogCreatureFamiliesMythRunelords } from './creatureFamiliesMythRunelords'
import { catalogCreatureFamiliesHellbreakers } from './creatureFamiliesHellbreakers'
import { catalogCreatureFamiliesStandaloneFive } from './creatureFamiliesStandaloneFive'

const MONSTER_CORE = 'Monster Core'

/**
 * Lore de família Remaster (AoN Monster Families).
 * Compartilhado por tag; criaturas com traço genérico apontam `familyIds`.
 */
export const catalogCreatureFamilies: CreatureFamily[] = [
  {
    id: 'family-goblin',
    name: 'Goblin',
    originalName: 'Goblin',
    trait: 'Goblin',
    source: MONSTER_CORE,
    sourcePage: 174,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=422',
    intro:
      'Humanoides baixos, em geral de pele verde ou cinza, cabeça grande e orelhas largas. Alguns se esforçam para viver em paz entre outros povos; muitos são impetuosos e violentos, e acham graça em causar estrago. Não pensam duas vezes em abater gado, roubar ou incendiar um prédio só pelo prazer do momento. Adoram pregar peças maldosas nos mais altos — os “pernaltas”.\n\nSão supersticiosos: têm reverência pela magia e fascínio por fogo, e quem domina um ou outro ganha respeito. O resto do mundo acha o jeito goblin difícil de entender: odeiam cães, mas dividem o covil com os chamados cães goblin; atacam criaturas maiores sem medo, mas têm pavor de cavalos; detestam verdura e consideram picles uma iguaria. Para um goblin, claro, tudo isso faz perfeito sentido.',
    sections: [
      {
        id: 'goblin-leadership',
        title: 'Liderança goblin',
        body: 'Há muitos caminhos até o comando de um bando. Uns herdam; outros ganham o posto por serem os mais fortes, espertos, maldosos, carismáticos — ou simplesmente os mais sortudos. Sobreviver a uma bola de fogo que varre o resto da gangue porque você estava ocupado comendo um picles é uma forma de saber que os deuses-heróis goblins te olham com favor.',
      },
      {
        id: 'goblin-treasure',
        title: 'Tesouro goblin',
        body: 'Tocas goblins costumam ser lixões imundos, mas às vezes guardam tesouro de verdade roubado de pernaltas ou de outras tribos: joias miúdas, coisas brilhantes como espelhinhos, dentes de ouro. Como quase nunca confiam uns nos outros, muitos goblins carregam as bugigangas mais queridas no corpo — armas úteis ou itens mágicos menores inclusive.',
      },
      {
        id: 'goblin-warrens',
        title: 'Tocas goblins',
        body: 'Goblins erguem tocas precárias em florestas e costas, em geral perto de povoados de outros humanoides — fica mais fácil vasculhar e saquear.',
      },
      {
        id: 'goblin-around-the-world',
        title: 'Goblins pelo mundo',
        body: 'Ajustes simples deixam um NPC goblin refletir heranças diferentes. Para um pele-carbonizada ou da neve, dê resistência a frio ou fogo igual ao nível e reduza os PV máximos pelo nível. Um dente-de-navalha ganha um Golpe de mandíbulas com os mesmos bônus de ataque e dano do Golpe corpo a corpo principal, mas com dano base de 1d6 perfurante.',
      },
      {
        id: 'goblin-new-outlooks',
        title: 'Novos horizontes',
        body: 'É outra era para os goblins: muitos ainda são ameaça, mas outros saem por conta própria e contribuem do jeito deles para o bem maior. A maioria continua pouco afeita a regras, mas muita gente é, no fundo, de bom coração. Os goblins mais comuns entre outras ancestralidades são cozinheiros, sucateiros e os do Monster Core: commandos, piromaníacos, cantores de guerra e guerreiros.',
      },
      {
        id: 'goblin-song',
        title: 'A canção goblin',
        body: `Talvez a mais infame das cantigas goblins:

Goblins mastigam e goblins mordem,
Goblins cortam e goblins lutam.
Espeta o cão e corta o cavalo,
Goblins comem e levam à força!

Goblins correm e goblins pulam.
Goblins golpeiam e goblins esbarram.
Queima a pele e esmaga a testa,
Goblins aqui e você já era!

Persegue o bebê, pega o filhote.
Bate na cabeça pra ele calar a boca.
Osso estala, carne no caldo,
Nós somos goblins! Você é o prato!`,
      },
    ],
  },
  {
    id: 'family-wolf',
    name: 'Lobo',
    originalName: 'Wolf',
    trait: null,
    source: MONSTER_CORE,
    sourcePage: 350,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=485',
    intro:
      'Lobos percorrem florestas, colinas e outros ermos, onde caçam em matilha para cercar e acossar a presa antes do bote. Como a maioria dos predadores, preferem atacar o alvo mais fraco ou mais exposto que encontrarem.',
    sections: [
      {
        id: 'wolf-territories',
        title: 'Territórios de Lobo',
        body: 'As matilhas reivindicam e defendem faixas grandes de território, que patrulham com regularidade em busca tanto de presa quanto de rivais. Leva cerca de 10 dias para uma matilha cobrir a extensão inteira — que pode se estender por quilômetros em qualquer direção, mas em geral acompanha o terreno. Mantêm a reivindicação marcando árvores com o cheiro e uivando para afastar outras matilhas. Se esses avisos não bastam para expulsar concorrentes, a matilha ataca os intrusos diretamente.',
      },
    ],
  },
  {
    id: 'family-ogre',
    name: 'Ogro',
    originalName: 'Ogre',
    trait: null,
    source: MONSTER_CORE,
    sourcePage: 250,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=451',
    intro:
      'Para muita gente, ogros são violência bruta, crueldade gananciosa e amoralidade. Medem cerca de 3 m, músculos densos, e costumam ser tão fortes quanto vis. Os piores são sádicos: assassinato, tortura e violência em todas as formas. Preferem descontar a fúria em outros humanoides — quanto menores, melhor. Quem cai nas mãos de um ogro pode ter destino pior que a morte: virar jantar. Na criatividade para infligir dor, muitas vezes esquecem que as vítimas não têm a mesma fortitude, e cativos morrem antes do que o ogro gostaria. Quem sobrevive à despensa costuma sair com cicatrizes na mente. Um prisioneiro esperto às vezes engana o bruto com promessa de tesouro, comida ou outro passatempo tosco, e usa a inteligência limitada do ogro para fugir ou se vingar.\n\nOgros são sociais só no sentido mais rebaixado. Reúnem-se em “famílias”, nem sempre de sangue. O mais poderoso é o “chefe” — em geral o patriarca ou a matriarca — e os outros aprendem a obedecer depressa, ou sofrem nas mãos da parentela leal. Moram em cavernas, ruínas ou casebres perto o bastante de povoados ou trilhas de animais para saquear fácil. O covil é imundo, cheio de evidências da depravação e de tesouros roubados de cativos.',
    sections: [
      {
        id: 'ogre-treasures',
        title: 'Tesouros grotescos',
        body: 'As tocas são açougues: membros decepados, vísceras e ensopados duvidosos. Ogros às vezes guardam treco brilhante, como joias, e apreciam armas e armaduras intimidadoras — sobretudo no tamanho certo para eles.',
      },
      {
        id: 'ogre-hooks',
        title: 'Ganchos ogro',
        body: 'Ogros são conhecidos por picaretas imensas e curvas chamadas ganchos ogro. Arma marcial incomum: 1 po, 1d10 perfurante, 2 de Carga, duas mãos, grupo picareta. Traços mortal d10 e derrubar.',
      },
    ],
  },
  ...catalogCreatureFamiliesMonsterCoreBatch,
  ...catalogCreatureFamiliesMonsterCoreBatch2,
  ...catalogCreatureFamiliesMonsterCoreBatch3,
  ...catalogCreatureFamiliesMonsterCoreBatch4,
  ...catalogCreatureFamiliesMonsterCoreBatch5,
  ...catalogCreatureFamiliesMonsterCoreBatch6,
  ...catalogCreatureFamiliesMonsterCoreBatch7,
  ...catalogCreatureFamiliesMonsterCoreBatch8,
  ...catalogCreatureFamiliesMonsterCoreBatch9,
  ...catalogCreatureFamiliesMonsterCore2Batch,
  ...catalogCreatureFamiliesMonsterCore2Batch2,
  ...catalogCreatureFamiliesMonsterCore2Batch3,
  ...catalogCreatureFamiliesMonsterCore2Batch4,
  ...catalogCreatureFamiliesMonsterCore2Batch5,
  ...catalogCreatureFamiliesMonsterCore2Batch6,
  ...catalogCreatureFamiliesMonsterCore2Batch7,
  ...catalogCreatureFamiliesMonsterCore2Batch8,
  ...catalogCreatureFamiliesMonsterCore2Batch9,

  ...catalogCreatureFamiliesLostOmens,
  ...catalogCreatureFamiliesRageOfElements,
  ...catalogCreatureFamiliesHowlOfTheWild,
  ...catalogCreatureFamiliesDraconicCodex,
  ...catalogCreatureFamiliesNpcCore,
  ...catalogCreatureFamiliesSeasonOfGhosts,
  ...catalogCreatureFamiliesGatewalkers,
  ...catalogCreatureFamiliesSevenDooms,
  ...catalogCreatureFamiliesWardens,
  ...catalogCreatureFamiliesCurtainCall,
  ...catalogCreatureFamiliesTriumphTusk,
  ...catalogCreatureFamiliesSporeWar,
  ...catalogCreatureFamiliesShadesOfBlood,
  ...catalogCreatureFamiliesMythRunelords,
  ...catalogCreatureFamiliesHellbreakers,
  ...catalogCreatureFamiliesStandaloneFive,
]

export function getCreatureFamilyById(
  id: string | null | undefined,
): CreatureFamily | null {
  if (!id) return null
  return catalogCreatureFamilies.find((family) => family.id === id) ?? null
}
