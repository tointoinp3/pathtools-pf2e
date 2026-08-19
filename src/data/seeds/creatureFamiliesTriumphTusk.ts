import type { CreatureFamily } from '@/types/creature'

function fam(
  partial: Omit<CreatureFamily, 'source'> & { source?: string },
): CreatureFamily {
  return { source: partial.source ?? 'Pathfinder #207: Resurrection Flood', ...partial }
}

/**
 * Famílias AoN Monster Families de Triumph of the Tusk (#207–209).
 * Asides = barras laterais oficiais da página da família. Sem blurb de membro.
 */
export const catalogCreatureFamiliesTriumphTusk: CreatureFamily[] = [
  fam({
    id: 'family-floodslain-creature',
    name: 'Criatura Afogada da Enchente',
    originalName: 'Floodslain Creature',
    trait: null,
    source: 'Pathfinder #207: Resurrection Flood',
    sourcePage: 84,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=557',
    intro: `As águas súbitas e avassaladoras do Dilúvio matam muitas criaturas em Belkzen a cada ano. A surpresa e o terror que essas vítimas sentem nos últimos instantes às vezes bastam para erguê-las dos mortos como afogados da enchente. Conforme as águas que as mataram recuam, os mortos-vivos buscam outros para se juntar a eles. Apesar dos corpos quebrados e estilhaçados, os afogados da enchente costumam ser reconhecíveis para quem os conheceu em vida.

Criaturas afogadas da enchente são raras fora de Belkzen, o que leva alguns eruditos a especular que as águas do Dilúvio são de algum modo amaldiçoadas. Outros acreditam que a proximidade de Gallowspire possa ser a causa. Se for assim, as Terras de Cascalho também podem ver afogados da enchente surgir, conforme o Tirano Sussurrante avança seus planos depois de escapar daquela prisão.

Você pode construir uma criatura afogada da enchente do zero usando as regras padrão de criação de monstros (como foram construídos o orc e o lobo afogados da enchente), ou transformar uma criatura existente completando os passos a seguir. Em qualquer caso, as habilidades específicas listadas abaixo funcionam do mesmo modo.

Escolha uma criatura que tenha o traço animal ou humanoide; essa é a criatura-base. Aumente o nível dela em 1 e altere as estatísticas da seguinte forma.
Ganha os traços anfíbio e morto-vivo. Ganha visão no escuro. Aumente CA, bônus de ataque, CDs, salvaguardas e modificadores de perícia em 1. Se a criatura-base não tinha CDs listadas, use a CD moderada de uma criatura do nível dela para quaisquer habilidades novas que exijam CD. Aumente os Pontos de Vida conforme a tabela abaixo.
**Nível inicial** **Aumento de PV** 1 ou menor +10  2–4 +15  5–19 +20  20+ +30

Uma criatura afogada da enchente ganha as seguintes habilidades. Se a criatura-base tem quaisquer habilidades que venham especificamente de ser uma criatura viva, perde-as. Também perde quaisquer traços que representavam a vida como criatura viva, como humano e humanoide. Pode ser necessário ajustar ou remover outras habilidades que conflitem com o tema de morto-vivo.

**Visão no Escuro** **Cura de Vazio** **Imunidades** efeitos de morte, doença, paralisado, veneno, sono **Toque de Afogamento** (ocultismo) Quando a criatura afogada da enchente causa dano a uma criatura com um ataque corpo a corpo que não seja de arma, os pulmões do alvo começam a se encher de água. O alvo deve tentar uma salvaguarda de Fortitude contra a CD de Vontade do afogado da enchente. Um alvo afetado por Toque de Afogamento pode gastar uma única ação tossindo na tentativa de se recuperar, o que imediatamente permite uma nova salvaguarda de Fortitude contra o efeito. Um sucesso melhora o resultado anterior em 1 grau. Um sucesso crítico melhora o resultado anterior em 2, e uma falha crítica o piora em 1. **Sucesso Crítico** A criatura não é afetada. **Sucesso** A criatura fica com lentidão 1 por 1 rodada. **Falha** A criatura fica com lentidão 2 por 1 rodada. **Falha Crítica** A criatura fica com lentidão 2 e afogando. **Cria Afogada da Enchente** (ocultismo) Um animal ou humanoide vivo morto por uma criatura afogada da enchente ressurge como afogado da enchente se o cadáver for deixado na água por 24 horas. O novo afogado da enchente não fica sob o controle da criatura que o matou. **Difícil de Queimar** A criatura ganha resistência a dano de fogo igual ao nível (mínimo 1). **Solo Encharcado** (aura, ocultismo, água) 6 m. Água flui sem fim de uma criatura afogada da enchente, tornando a área ao redor escorregadia. O chão na aura é terreno difícil para todas as criaturas que não sejam afogadas da enchente. **Nadador** Apesar da aparência desajeitada, os afogados da enchente são excelentes nadadores. A criatura ganha Deslocamento de natação igual ao Deslocamento-base. **Vomitar Destroços** (ocultismo) O corpo de uma criatura afogada da enchente está cheio de detritos da morte horrenda, que ela pode cuspir nos inimigos. O afogado da enchente vomita destroços num cone de 4,5 m. Qualquer criatura na área sofre 1d8 de dano de concussão por nível da criatura afogada da enchente (mínimo 1d8), com uma salvaguarda básica de Reflexos contra a CD de Fortitude do afogado da enchente.`,
    sections: [
      {
        id: 'in-search-of-water',
        title: 'Em Busca de Água',
        body: 'Afogados da enchente tendem a se mover para terreno mais baixo, buscando água por instinto. As planícies de inundação planas de Belkzen, porém, fazem as criaturas vaguearem de modos imprevisíveis. Um ditado comum entre artesãos orcs antigos é “construa no alto, fique seco”, mas muitos acrescentam “construa em baixo, os mortos fluem”.',
      },
      {
        id: 'panicked-eyes',
        title: 'Olhos em Pânico',
        body: 'Um traço distintivo que todos os afogados da enchente compartilham são os olhos arregalados e tomados de pânico. O olhar de um afogado da enchente fica congelado para sempre na expressão de terror que a criatura sentiu momentos antes da morte. Rumores dizem que alguns afogados da enchente conseguem espalhar esse medo a outros com um mero olhar.',
      },
    ],
  }),
  fam({
    id: 'family-storm-spirits',
    name: 'Espíritos da Tempestade',
    originalName: 'Storm Spirits',
    trait: null,
    source: 'Pathfinder #208: Hoof, Cinder, and Storm',
    sourcePage: 84,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=558',
    intro:
      'As tempestades ancestrais que assolam Belkzen atraem muitos tipos de fantasmas, espectros e espíritos perigosos, inclusive os dois apresentados abaixo.',
    sections: [],
  }),
  fam({
    id: 'family-war-beast',
    name: 'Fera de Guerra',
    originalName: 'War Beast',
    trait: null,
    source: "Pathfinder #209: Destroyer's Doom",
    sourcePage: 86,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=559',
    intro:
      'A criação de megafauna em Belkzen é motivo de orgulho orc, com muitas espécies criadas para a vida cotidiana. Em batalha, elas oferecem uma vantagem contra os inimigos.',
    sections: [],
  }),
  fam({
    id: 'family-wyvernsting-orc',
    name: 'Orc de Wyvernsting',
    originalName: 'Wyvernsting Orc',
    trait: null,
    source: "Pathfinder #209: Destroyer's Doom",
    sourcePage: 88,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=560',
    intro:
      'Enquanto alguns guerreiros orcs se especializam numa técnica de seu clã, outros sintetizam estilos de toda parte numa técnica unificada, porém versátil.',
    sections: [
      {
        id: 'orc-duels',
        title: 'Duelos Orcs',
        body: 'O duelo é prática frequente em muitas culturas de Golarion, e os orcs não são exceção. A letalidade desses duelos varia conforme o motivo: uma luta amistosa vai até o primeiro sangue ou até um combatente desmaiar, enquanto uma briga em resposta a uma vendeta ou insulto tem mais chance de ser até a morte. Ao contrário de muitas tradições de duelo, os espectadores são encorajados a ajudar os combatentes verbalmente, gritando incentivo ao lutador preferido e injúrias ao oponente.',
      },
    ],
  }),
]
