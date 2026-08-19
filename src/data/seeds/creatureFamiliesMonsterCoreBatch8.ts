import type { CreatureFamily } from '@/types/creature'

const MONSTER_CORE = 'Monster Core'

function fam(
  partial: Omit<CreatureFamily, 'source'> & { source?: string },
): CreatureFamily {
  return { source: MONSTER_CORE, ...partial }
}

/**
 * Lore de família Remaster para o lote 8 do Monster Core.
 * Asides = barras laterais da página AoN Monster Families. Sem blurb de membro.
 */
export const catalogCreatureFamiliesMonsterCoreBatch8: CreatureFamily[] = [
  fam({
    id: 'family-cave-worm',
    name: 'Verme das Cavernas',
    originalName: 'Cave Worm',
    trait: null,
    sourcePage: 54,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=378',
    intro:
      'Vermes das cavernas são necrófagos gigantescos que perfuram as profundezas do mundo, comendo o que acham. Batizados pelos habitats distintos, são vorazes e exibem capacidade destrutiva avassaladora. Vermes de tipos e habilidades diferentes espreitam cantos mais remotos — contos falam de vermes árticos que habitam geleiras ou icebergs imensos e vermes de sepultura que cavam cemitérios de ruínas há muito esquecidas, para citar alguns.',
    sections: [
      {
        id: 'belly-of-the-beast',
        title: 'Barriga da fera',
        body: 'A aventura não precisa acabar só porque o grupo foi engolido inteiro por um verme gigante. Talvez os PJs achem um item não digerido que os ajude a sobreviver ao ambiente inóspito, ou o verme os regurgite numa caverna bem longe de onde começaram. Seja o detalhe que for, dá para tirar do folclore e da ficção popular a própria aventura “barriga do verme” para heróis que acabam do lado errado da goela!',
      },
      {
        id: 'cave-worm-guardians',
        title: 'Guardiões verme',
        body: 'Vermes das cavernas são notoriamente obtusos, movidos sobretudo por necessidades puramente animalistas de se alimentar e reproduzir. Isso não impediu tentativas de amansá-los ou usá-los como guarda. Magia pode manter o controle, mas treinadores de animais talentosos, pacientes e corajosos conseguem condicionar vermes a servir em toda sorte de papéis: máquinas de cerco vivas, métodos chocantes de executar inimigos, ou simplesmente mascotes.',
      },
      {
        id: 'notorious-worms',
        title: 'Vermes notórios',
        body: 'Algumas sociedades veem vermes imensos como desastres naturais ou encarnações de deuses irados. Vermes ativos numa região muitas vezes viram parte do folclore local. Por exemplo, nas notórias Terras de Cinza do leste de Varísia, shoanti há muito contam histórias de Cindermaw, um verme de magma imenso visto por uns como digno de culto e por outros como o teste máximo de bravura.',
      },
      {
        id: 'ravenous-tunnelers',
        title: 'Escavadores vorazes',
        body: 'Vermes das cavernas são infames por serem quase imparáveis e por engolir a presa inteira. Também ingerem terra e minerais enquanto cavam. Processam parte desses minerais — daí o couro couraçado e o ferrão tóxico — e deixam o resto para trás, muitas vezes incluindo tesouro ou outros objetos de valor que acabam atraindo exploradores para perto — e, com mais frequência, para a goela. Embora não sejam de todo sem mente, são difíceis de treinar, e a maioria das tentativas de domesticá-los (em teoria, um recurso de mineração excelente) termina em desastre.',
      },
    ],
  }),
  fam({
    id: 'family-lich',
    name: 'Lich',
    originalName: 'Lich',
    trait: 'Lich',
    sourcePage: 218,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=438',
    intro:
      'Para ganhar mais tempo e completar as metas, alguns conjuradores desesperados buscam a imortalidade abraçando a morte-viva. Depois de longos anos de pesquisa e da criação de um recipiente especial chamado gaiola da alma, o conjurador dá o passo final ao beber uma poção mortal ou lançar encantamentos pavorosos que o transformam em lich. A maioria empreende o plano drástico para continuar o trabalho ou cumprir um plano de longo prazo; outros viram liches porque temem a morte ou para cumprir um propósito malevolente, como vingança jurada há muito. O resultado é permanente e carrega o potencial de alterar a história — tanto para quem se transforma quanto para os incontáveis mortais que inevitavelmente sofrerão com o poder novo.',
    sections: [
      {
        id: 'lich-lairs',
        title: 'Covis de lich',
        body: 'Depois da metamorfose, um lich muitas vezes acha algum lugar quieto para habitar, em geral protegido por uma variedade de guardiões e armadilhas, por dois motivos principais. Primeiro, precisa de solidão para planejar os esquemas elaborados; segundo, poucos mortais (se algum) se dignam a lidar com esses necromantes lendariamente corruptos. Um motivo gera o outro: o isolamento autoimposto muitas vezes empurra o lich ao desapego e ao desprezo pela vida mortal, solidificando ainda mais a separação da civilização. Quanto mais tempo vive, mais meticuloso o planejamento: esconde-se num labirinto de enigmas mortais, despistes e monstros. Servos e guardiões são absolutamente leais, seja pela natureza (construtos ou outros mortos-vivos) ou por compulsão de magia poderosa. Muitos liches afundam nas próprias visões distorcidas; a natureza do covil é um bom indicador da visão que têm da vida.',
      },
      {
        id: 'unique-lichdom',
        title: 'Lichdom único',
        body: 'O ritual exato, os ingredientes das poções mortais e as condições mágicas exigidas para virar lich são únicos e diferentes para cada criatura viva. Entender o caminho de um conjurador até o lichdom pode ajudar, mas não é garantia de sucesso para outros.',
      },
    ],
  }),
  fam({
    id: 'family-graveknight',
    name: 'Cavaleiro da Tumba',
    originalName: 'Graveknight',
    trait: 'Graveknight',
    sourcePage: 178,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=423',
    intro:
      'Cavaleiros da tumba são guerreiros mortos-vivos a quem uma armadura amaldiçoada concedeu a não-vida.',
    sections: [
      {
        id: 'arts-of-war',
        title: 'Artes da guerra',
        body: 'Cavaleiros da tumba não surgem de meros soldados, e sim de grandes táticos que venceram incontáveis combates. Muitas vezes foram o general mais poderoso da terra ou o herói de guerra mais condecorado. Isso significa que não se atiram só num corpo a corpo. Estudaram o terreno (muitas vezes com o olhar experiente e implacável que só o morto-vivo traz) e planejaram movimentos de tropa, obras de terra e armadilhas para garantir a vitória. Em geral têm reforços prontos e contingências redundantes. Assim como grandes estrategistas dizem que o combate se decide antes do primeiro golpe, lutar contra um cavaleiro da tumba muitas vezes parece uma luta desesperada num torno que se fecha depressa.',
      },
      {
        id: 'infamous-graveknights',
        title: 'Cavaleiros da tumba infames',
        body: 'Vários dos vilões mais notórios de Golarion são cavaleiros da tumba. Os exemplos abaixo estão entre os mais infames ainda à solta e podem inspirar ou servir de vilões no jogo.\n\n**Lictor Shokneir**: um dia líder Hellknight da notória Ordem da Cruz, recusou uma ordem real de dissolver o exército de açougueiros. Os outros Hellknights o cercaram e arrasaram o castelo, a Cidadela Gheisteno. A determinação sustenta a forma agora morta-viva, e ele e as legiões reconstruíram a cidadela em toda a glória assombrada.\n\n**O Príncipe Negro**: embora o cavaleiro da tumba conhecido só como o Príncipe Negro tenha sido redimido séculos atrás como parte dos 11 Atos de Iomedae, diz-se que a armadura permanece intacta — e que forças vis conspiram para recuperá-la. Se for vestida por um descendente do Príncipe Negro, o Mar Interior enfrentará um vilão terrível.',
      },
      {
        id: 'other-powers',
        title: 'Outros poderes',
        body: 'Você pode usar as habilidades alternativas como exemplos para criar poderes novos que reflitam a personalidade ou a história de um cavaleiro da tumba, ou até trocar mais de um poder. Devem ser inimigos únicos e memoráveis.',
      },
      {
        id: 'steed-adaptations',
        title: 'Adaptações de montaria',
        body: 'Para alguns, a montaria é mais do que a projeção do desejo de se mover rápido pelo campo. Quem usa Montaria Fantasma pode ter a aparência, as resistências ou o movimento de uma montaria favorita que cavalgou em vida — como a resistência a fogo de um pesadelo ou o Deslocamento de voo de um pégaso.',
      },
      {
        id: 'unique-destruction',
        title: 'Destruição única',
        body: 'Embora a maioria das armaduras de cavaleiro da tumba possa ser destruída pelos meios padrão, as de cavaleiros particularmente poderosos podem ser mais duráveis e exigir passos extras. Em geral são armaduras de cavaleiros de nível alto, e os passos de destruição ligam-se à criação. Por exemplo, uma armadura específica não pode ser destruída até ser golpeada por um descendente de quem originalmente abateu o cavaleiro em batalha antes da transformação.',
      },
    ],
  }),
  fam({
    id: 'family-norn',
    name: 'Norn',
    originalName: 'Norn',
    trait: null,
    sourcePage: 240,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=448',
    intro:
      'Antigas além da imaginação, norns são fey poderosas que seguram nas mãos a manifestação física do destino na forma de fio dourado. Velam toda a vida, intervindo com relutância quando chamadas — ou com vingança quando os fios do destino são torcidos e abusados por seres menores. Cortam figuras imponentes: 4,2 m de altura e 360 kg.\n\nA relação com os Primogênitos do Primeiro Mundo é complexa. Muitas servem Magdh a Tríade, a Primogênita tríplice que algumas norns acreditam ser o primeiro triunvirato norn unido numa entidade só, pois Magdh tem três corpos: Donzela, Mãe e Matriarca. Magdh afirma vigiar os fios do destino em busca de algum cataclismo profetizado ominoso e, além de auxiliar nas adivinhações, espera que as norns que a servem sigam comandos crípticos para empurrar o futuro para longe da beira. Porém, norns são seres poderosos por direito próprio, capazes de conceder poder divino, e muitas recusam servir a semideusa enigmática.',
    sections: [
      {
        id: 'lost-norns',
        title: 'Norns perdidas',
        body: 'Quando separada de um triunvirato por tempo demais, uma norn no Universo mortal pode ficar confusa e fraca. Os poderes permanecem fortes, mas a capacidade de interpretar o destino se distorce. Norns perdidas passam a usar as habilidades para as próprias metas em vez de servir o destino, baseando as ações em como as visões enviesadas melhor as servem.',
      },
      {
        id: 'norn-triumvirates',
        title: 'Triunviratos norn',
        body: 'Norns que visitam o Universo muitas vezes o fazem em grupos de três conhecidos como triunviratos. Podem comunicar-se telepaticamente numa distância planetária. Independentemente da aparência no Primeiro Mundo, quando uma norn entra num triunvirato no Universo, a idade aparente muda para que em cada grupo sempre haja uma norn jovem adulta, uma de meia-idade e uma idosa — Donzela, Mãe e Matriarca.',
      },
    ],
  }),
  fam({
    id: 'family-linnorm',
    name: 'Linnorm',
    originalName: 'Linnorm',
    trait: 'Linnorm',
    sourcePage: 220,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=439',
    intro:
      'Imensos dragões primevos dos trechos setentrionais do mundo, linnorms odeiam quem consideram criaturas menores e buscam infligir o máximo de sofrimento nas vítimas. Embora essas monstruosidades serpentinas não sejam os dragões alados poderosos que a maioria imagina, ainda assim possuem força incrível e poderes mortais que muitas vezes rivalizam a brutalidade de dragões mais notórios.',
    sections: [
      {
        id: 'death-curses',
        title: 'Maldições da morte',
        body: 'As maldições da morte dos linnorms muitas vezes são tema de sagas trágicas, e quem se imagina herói vitorioso por abater um linnorm muitas vezes encontra o fim logo depois, sucumbindo a essas maldições bem depois da passagem do linnorm responsável.',
      },
      {
        id: 'linnorm-hoards',
        title: 'Tesouros de linnorm',
        body: 'Como dragões verdadeiros, linnorms tendem a amontoar pilhas imensas de tesouro nos covis. Esses tesouros consistem mais nas armas, no equipamento e nos pertences de pretensos vencedores do que em moedas cunhadas ou obras de arte.',
      },
      {
        id: 'linnorm-kings',
        title: 'Reis Linnorm',
        body: 'Nas lendárias Terras dos Reis Linnorm, abater um linnorm é tradicionalmente exigido de quem reivindica a coroa de uma nação. Recentemente, porém, a Rainha Linnorm Estrid Branca reivindicou a coroa não abatendo um linnorm, e sim submetendo-o, ganhando um aliado poderoso e perigoso para ajudar a assegurar o governo.',
      },
      {
        id: 'other-linnorms',
        title: 'Outros linnorms',
        body: 'Linnorms existem em uma variedade de formas além dos quatro detalhados aqui. O linnorm de cairn esquelético, o linnorm de taiga espinhento e o linnorm de fiorde aquático aterrorizam cada um as próprias regiões específicas do Universo.',
      },
    ],
  }),
]
