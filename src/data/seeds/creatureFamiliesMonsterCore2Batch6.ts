import type { CreatureFamily } from '@/types/creature'

const MONSTER_CORE_2 = 'Monster Core 2'

function fam(
  partial: Omit<CreatureFamily, 'source'> & { source?: string },
): CreatureFamily {
  return { source: MONSTER_CORE_2, ...partial }
}

/**
 * Lore de família Remaster para o 6º lote do Monster Core 2.
 * Famílias já existentes (aeon, arbóreo, diabo, girtablilu, velstrac, gigante,
 * aesir, andarilho-enxame, coatl, objeto animado, gosma, arconte, owb, elemental,
 * daemon, demônio, profundo, cavaleiro da tumba, div, troll, ninfa) não se repetem.
 */
export const catalogCreatureFamiliesMonsterCore2Batch6: CreatureFamily[] = [
  fam({
    id: 'family-spiral-centurion',
    name: "Centurião Espiral",
    originalName: "Spiral Centurion",
    trait: null,
    aonUrl: "https://2e.aonprd.com/Search.aspx?q=Spiral%20Centurion",
    intro:
      "Esses construtos mecânicos foram criados para servir de guardiões numa era antiga e já passada, embora exatamente quem os fez e os segredos da construção há muito se tenham perdido na história. Da cintura para cima, lembram humanoides feitos de metal, mas da cintura para baixo o corpo toma a forma de piões de metal giratórios cingidos de lâminas que se destacam em ceifar inimigos próximos. A maioria dos centuriões espirais pode ser mandada recuar com uma senha, mas muitas vezes essas frases de comando se perderam nas brumas do tempo. Em casos raros, um centurião espiral também pode empunhar armas manufaturadas ou um escudo além das armas embutidas, dando-lhe acesso a ações adicionais além das listadas abaixo.\n\nA maioria dos centuriões espirais tem centenas ou até milhares de anos, permanecendo funcional só por causa da magia poderosa usada na criação. Ainda assim, milênios de abandono fizeram muitos centuriões espirais desenvolver falhas ou mau funcionamento pequenos.",
    sections: [],
  }),
  fam({
    id: 'family-unrisen',
    name: "Unrisen",
    originalName: "Unrisen",
    trait: null,
    aonUrl: "https://2e.aonprd.com/Search.aspx?q=Unrisen",
    intro:
      "Um unrisen é uma conglomeração mutilada de ossos estilhaçados, órgãos em decomposição e carne podre, criado quando um ritual como ressuscitar dá errado de forma catastrófica. É preciso extremo cuidado, pois se tal ritual falha por completo, um unrisen pode ser o resultado — como muitos ritualistas já aprenderam para seu horror.\n\nUnrisen mal têm inteligência, conscientes só da agonia infligida sem parar pela criação falha e do ressentimento pelos vivos. Tendem a atacar primeiro os conjuradores envolvidos no ritual fracassado antes de voltar-se contra todos os outros ao redor. Embora a forma torcida de um unrisen seja irreconhecível como o alvo pretendido da ressurreição, os uivos sem palavras muitas vezes são perturbadoramente semelhantes à voz do falecido. Se um unrisen é destruído antes de poder erguer-se de novo, reduz-se a um punhado de sais metálicos azul-esverdeados chamados sais essenciais.",
    sections: [],
  }),
  fam({
    id: 'family-calikang',
    name: "Calikang",
    originalName: "Calikang",
    trait: null,
    aonUrl: "https://2e.aonprd.com/Search.aspx?q=Calikang",
    intro:
      "Calikangs são guardiões gigantes de pele azul e seis braços de tumbas e tesouros antigos. Cada um sente um impulso profundo e inerente de proteger e guardar, tornando-os muito procurados como zeladores e guarda-costas. Como a maioria serve como guardiões solitários, poucas sociedades calikang existem.\n\nAs fisiologias únicas dos calikangs lhes permitem absorver e manipular magia elétrica bem como outras energias. Podem viver 200 anos — embora possam estender ainda mais as vidas via animação suspensa. Por essa razão, muitos são escolhidos para guardar tumbas ou outros sítios selados onde guardiões vivos pereceriam e construtos se deteriorariam.",
    sections: [],
  }),
  fam({
    id: 'family-catoblepas',
    name: "Catoblepas",
    originalName: "Catoblepas",
    trait: null,
    aonUrl: "https://2e.aonprd.com/Search.aspx?q=Catoblepas",
    intro:
      "O catoblepas é uma fera agressiva até nos melhores momentos. Embora prefira pântanos, o catoblepas já foi visto forrageando em planícies e florestas por períodos curtos, deixando para trás terrenos de caça maculados pelo hálito fétido e pelos dejetos nauseantes que outros predadores e presas igualmente evitam por dias ou até semanas depois. O catoblepas intimida as criaturas que acredita serem páreo e come tudo que for mais fraco.\n\nUm catoblepas tem 4,5 m de comprimento e pesa 1.000 kg.",
    sections: [],
  }),
  fam({
    id: 'family-grisantian-lion',
    name: "Leão Grisantiano",
    originalName: "Grisantian Lion",
    trait: null,
    aonUrl: "https://2e.aonprd.com/Search.aspx?q=Grisantian%20Lion",
    intro:
      "O aparecimento do poderoso grogrisant é um evento de uma vez por geração, mas os descendentes dessas feras lendárias são bem conhecidos ao longo das World's Edge Mountains e por todo Taldor. Esses predadores primevos não viajam em alcateia como leões mundanos. Em vez disso, evitam outros da própria espécie, até para acasalar, e procuram leões comuns uma vez por ano para esse fim. Uma leoa grisantiana que gera filhotes só cuida da prole o bastante para que se tornem autossuficientes — o que leva só alguns meses, graças ao crescimento e ao desenvolvimento incrivelmente rápidos da espécie.\n\nUm leão grisantiano adulto é tão grande quanto um elefante e extremamente agressivo, caçando qualquer coisa que encontre. Enquanto leões comuns dependem de furtividade e táticas de matilha para garantir uma refeição, o leão grisantiano é grande demais para esconder-se no capim alto. Em vez disso, adaptou-se às montanhas, onde escolhe uma caverna grande e de difícil acesso como lar, muitas vezes matando qualquer criatura infeliz o bastante para já habitar o lugar. Um leão grisantiano pode rastrear por quilômetros e é um caçador astuto, escondendo-se ao longo de falésias e afloramentos rochosos enquanto espreita a presa.\n\nEmbora sejam criaturas selvagens que nunca podem ser amansadas, leões grisantianos entendem Taldane e ocasionalmente concordam em ajudar quem defende a natureza. Porém, tais alianças são temporárias e pouco confiáveis na melhor das hipóteses.",
    sections: [],
  }),
  fam({
    id: 'family-rusalka',
    name: "Rusalka",
    originalName: "Rusalka",
    trait: null,
    aonUrl: "https://2e.aonprd.com/Search.aspx?q=Rusalka",
    intro:
      "Esses fey andróginos que habitam rios deleitam-se em manipular as emoções daqueles infelizes o bastante para cair em seu alcance, usando humilhação para quebrar as vontades das vítimas. Rusalkas gostam de manter os brinquedos quebrados por perto, tanto para entretenimento contínuo quanto para auxiliar na defesa, pois a miséria dos cativos muitas vezes os leva a tornar-se obsessivamente leais a esses fey. Se uma pessoa alguma vez escapa das garras de uma rusalka, a rusalka provavelmente a procurará e a envergonhará por “abandonar” o lar, tudo na esperança de que a vítima regrida a um estado mental angustiado e volte ao cativeiro.",
    sections: [],
  }),
  fam({
    id: 'family-ambush-copse',
    name: "Bosque de Emboscada",
    originalName: "Ambush Copse",
    trait: null,
    aonUrl: "https://2e.aonprd.com/Search.aspx?q=Ambush%20Copse",
    intro:
      "Madeira serrada e talhada a machado range junta quando um bosque de emboscada se move, esmagando pela floresta. Cortes e queimaduras marcam a casca desta massa gigantesca e irada de toros giratórios e mortais.\n\nA floresta nunca esquece. Lembra as machadinhas, as serras raspando e a fumaça de fogueiras de madeira crepitante. Lembra as carroças levando árvores antigas embora para cortar, talhar e queimar. Intromissão fey ou magia elemental errante puxam tais memórias para fora junto com a raiva e a mágoa da floresta para formar um bosque de emboscada.\n\nUm bosque de emboscada descarrega a ira sobre vilas ao longo da trilha do lenhador ou espera que intrusos entrem no domínio florestal. Embora um bosque de emboscada possa ser tomado por um arbóreo ferido, pode cessar o movimento para parecer uma pilha de toros coberta de mato ou um casebre parcialmente desabado. Ali, espera a retribuição.",
    sections: [],
  }),
  fam({
    id: 'family-anguished-flame',
    name: "Chama Angustiada",
    originalName: "Anguished Flame",
    trait: null,
    aonUrl: "https://2e.aonprd.com/Search.aspx?q=Anguished%20Flame",
    intro:
      "Contos antigos dizem que o senhor elemental Atreia criou seus filhos de seis asas para conduzir preces mortais aos reinos do divino. Esses elementais trabalham lado a lado com servos deíficos celestiais e infernais para aceitar sacrifícios e oferendas, mas também abençoam mortais contritos com absolvição e purificação, ajudando-os a mudar o destino que os espera depois da morte.",
    sections: [],
  }),
  fam({
    id: 'family-assault-alloy',
    name: "Liga de Assalto",
    originalName: "Assault Alloy",
    trait: null,
    aonUrl: "https://2e.aonprd.com/Search.aspx?q=Assault%20Alloy",
    intro:
      "Enquanto Laudinmio, o Soberano da Alquimia, dorme no Plano do Metal, seus alunos mais curiosos espalharam-se pelo Universo para conduzir experimentos alquímicos cada vez mais ousados. Conhecidos como ligas de assalto, esses elementais travessos cansaram-se e enjoaram dos impulsos acumuladores dos humanoides, sobretudo em uniformidade tão insípida. Não sabem que a maior força do metal está na diversidade?",
    sections: [],
  }),
  fam({
    id: 'family-destiny-tempest',
    name: "Tempestade do Destino",
    originalName: "Destiny Tempest",
    trait: null,
    aonUrl: "https://2e.aonprd.com/Search.aspx?q=Destiny%20Tempest",
    intro:
      "Antes do Império Jaathoom, o Plano do Ar era governado por tempestades do destino a partir de seu Império Reveriente das Noites Perdidas. Quando os exércitos jaathoom esmagaram o Império Reveriente, aprisionaram as tempestades do destino derrotadas em esferas de bronze espalhadas pelo Plano do Ar, prisões de tempo e pesadelo eterno.",
    sections: [],
  }),
  fam({
    id: 'family-dibrasgorth',
    name: "Dibrasgorth",
    originalName: "Dibrasgorth",
    trait: null,
    aonUrl: "https://2e.aonprd.com/Search.aspx?q=Dibrasgorth",
    intro:
      "Dibrasgorths, às vezes chamados Mães do Oblívio, são criaturas monstruosas do caos que habitam espaços sem luz, muitas vezes perto do fundo de lagos e oceanos profundos tanto na superfície quanto no subterrâneo. Podem parecer monstros hediondos com cabeças semelhantes a um plesiossauro sobre massas de tentáculos, cada um rematado com um olho vermelho maligno, mas dibrasgorths têm um senso torcido de astúcia, provavelmente devido à habilidade de ver e afetar planos além daquele em que estão. Embora sejam bem poderosos (alguns sendo os servos prediletos de Lamashtu), dibrasgorths preferem manter a existência em segredo dos mortais do mundo acima.",
    sections: [],
  }),
  fam({
    id: 'family-iceberg-clam',
    name: "Amêijoa-Iceberg",
    originalName: "Iceberg Clam",
    trait: null,
    aonUrl: "https://2e.aonprd.com/Search.aspx?q=Iceberg%20Clam",
    intro:
      "Embora tecnicamente não seja nem iceberg nem amêijoa, o elemental devastador conhecido como amêijoa-iceberg ganhou o nome adequado da camuflagem natural e das tendências de alimentação. Esse predador de emboscada esférico exibe controle térmico pleno sobre a água que o cerca e compõe a forma mutável, atraindo nadadores cansados e embarcações à deriva com a promessa de alívio antes de envolvê-los e fervê-los vivos.\n\nA menos que tenha comido recentemente o bastante para ainda estar digerindo a refeição, uma amêijoa-iceberg derretida é quase imperceptível num corpo d’água grande. Como não gasta energia para manter o exterior congelado, pode esperar semanas ou até meses antes de alimentar-se de novo, cavalgando correntes oceânicas até que alguma criatura ou embarcação infeliz entre em seguida no corpo — e nunca saia.",
    sections: [],
  }),
  fam({
    id: 'family-irlgaunt',
    name: "Irlgaunt",
    originalName: "Irlgaunt",
    trait: null,
    aonUrl: "https://2e.aonprd.com/Search.aspx?q=Irlgaunt",
    intro:
      "Irlgaunts lembram aranhas ou caranguejos titânicos, mas com tentáculos semelhantes a cefalópodes irrompendo das pontas das pernas couraçadas de quitina. As conchas cinza denteadas lhes permitem misturar-se às paredes rochosas dos desfiladeiros altos e ravinas profundas que servem de terrenos de caça. Apesar do tamanho, movem-se com velocidade incrível, saltando por abismos e escaravando penhascos de montanha íngremes em instantes. Embora sejam formidáveis em combate corpo a corpo, irlgaunts têm um ataque à distância ainda mais poderoso. Essas criaturas bombardeiam os oponentes com gastrólitos regurgitados com força — aglomerados do tamanho de um melão de pedras envolvidas em enzimas digestivas coaguladas fortes o bastante para decompor carne e osso. Gastrólitos são frágeis e explodem ao contato, salpicando a área com lascas de rocha e ácido cáustico.\n\nEmbora se possa facilmente tomar um irlgaunt por uma besta simples e bruta, têm inteligência aguçada e empregam estratégias de caça ardilosas. Armam armadilhas para viajantes e gostam de usar gemas e itens mágicos tomados de vítimas anteriores como isca. Já se soube que iniciam deslizamentos de pedras ou de outro modo bloqueiam passagens para desviar exploradores para as garras. Também usam os gastrólitos para dirigir os movimentos da presa, forçando vítimas a becos sem saída na beira de abismos ou falésias.\n\nNa maior parte, irlgaunts vivem vidas solitárias, provavelmente porque achar comida o bastante para sustentar mais de um tende a ser difícil. Porém, ainda mantêm um senso de comunidade estendida e regional, reunindo-se ativamente quando se organizam para a guerra ou para discutir outras questões que afetam a espécie ou os territórios compartilhados. Já se soube que ocasionalmente se aliam a gigantes, mas essas tréguas tendem a ser nebulosas.",
    sections: [],
  }),
  fam({
    id: 'family-jorogumo',
    name: "Jorogumo",
    originalName: "Jorogumo",
    trait: null,
    aonUrl: "https://2e.aonprd.com/Search.aspx?q=Jorogumo",
    intro:
      "Aparecendo como humanos belos e bem vestidos, jorogumos espreitam nas montanhas altas e predam viajantes, muitas vezes por palavras e encanto. Essas criaturas cruéis podem transformar-se por completo numa aranha gigante ou brotar pernas de aranha das costas, e muitas vezes mantêm aranhas gigantes como animais de estimação. Jorogumos em geral comem a presa, mas alguns humanoides encontram um destino ainda mais hediondo como incubadoras vivas de ovos de jorogumo.\n\nQuando encontram um tengu, jorogumos entram em fúria e tentam assassiná-los o mais depressa possível, pois insistem que tengus podem ver através do engano com um mero olhar e são imunes ao veneno, mas não está claro a forasteiros se essa é a história inteira por trás do ódio obstinado. Embora a maioria dos jorogumos seja criatura solitária, alguns adoram Norgorber e servem como aliados valiosos a guildas de ladrões que seguem aquele deus na forma de Mestre Cinzento.",
    sections: [],
  }),
  fam({
    id: 'family-millindemalion',
    name: "Millindemalion",
    originalName: "Millindemalion",
    trait: null,
    aonUrl: "https://2e.aonprd.com/Search.aspx?q=Millindemalion",
    intro:
      "Millindemalions são fey trapaceiros cruéis capazes de causar caos com os chapéus mágicos que alteram a mente. Muitos contos folclóricos pelo mundo falam de fey industriosos que ajudam artesãos em apuros — sapateiros, chapeleiros, alfaiates e assim por diante — durante a noite, criando mercadorias de qualidade em segredo por nenhum pagamento maior que uma migalha de pão ou um pires de nata. Essas histórias guardam um grão de verdade, pois fey bondosos de fato ocasionalmente viajam do Primeiro Mundo para auxiliar um artesão humilde por capricho, por subornos de comida, ou às vezes até como parte de um esforço concertado para espalhar beleza pelo mundo. Porém, quando um artesão se torna dependente demais dessa ajuda, o ajudante fey amigável pode tornar-se distorcido e retorcido de ressentimento e abandono. Por fim, poderia transformar-se num brincalhão cruel que se deleita em punir mortais que ousam encarregar um fey de trabalho tão mundano. O millindemalion é o resultado de um fey bondoso, fazedor de chapéus, passando por tal transformação. Alguns estudiosos acreditam que esse comportamento errático é causado pela preponderância de mercúrio usado na maioria da chapelaria.",
    sections: [],
  }),
  fam({
    id: 'family-darvakka',
    name: "Darvakka",
    originalName: "Darvakka",
    trait: "Darvakka",
    aonUrl: "https://2e.aonprd.com/MonsterFamilies.aspx?ID=578",
    intro:
      "Darvakkas, também chamados nightshades, são um mal voraz feito em partes iguais de escuridão e malícia. Formam-se de criaturas dos Planos Exteriores que viajam à convergência do Mundo Inferior e do Vazio, onde o poder do nada as oblitera. Essas abominações mortas-vivas são a personificação física da entropia e ardem com ódio intenso por toda vida, trabalhando para trazer uma noite final e escura ao Universo onde só restem cinzas e gelo.\n\nComo criaturas distorcidas por trevas e sombra, darvakkas têm grande aversão à luz do sol e a todas as fontes de energia vital. Ao viajar no Universo, passam as horas de luz escondidos sob a terra, em ruínas, ou submersos nos abismos mais escuros do oceano além do alcance dos raios solares, emergindo sempre que a escuridão os abriga acima.\n\nDarvakkas têm uma aura de entropia que atrai servos mortos-vivos para servir de guerreiros e arautos. Raramente buscam alianças uns com os outros ou com outras criaturas, existindo em solidão como cabeças de exércitos individuais dos mortos.",
    sections: [
      {
        id: "creating-nothing",
        title: "Criar Nada",
        body: "Darvakkas são feitos da quintessência — essência espiritual manifesta em forma física — de fiends lançados ao vazio no fim da realidade. A morte da alma imortal faz a criatura ser consumida, catalisando uma mudança que a embaralha numa entidade inteiramente nova que não retém nada do eu anterior.",
      },
      {
        id: "other-darvakkas",
        title: "Outros Darvakkas",
        body: "Os darvakkas destas páginas não são os únicos de sua espécie. Outros existem, a maioria com formas de animais, de cães que avançam a artrópodes que se arrastam. Todos são perigosos, e outros ainda mais poderosos que nasurgeths sem dúvida existem — darvakkas que podem ser tão proeminentes e poderosos quanto demideuses horrorosos.",
      },
      {
        id: "the-end-of-reality",
        title: "O Fim da Realidade",
        body: "Nas profundezas da escuridão, onde o Mundo Inferior e o Vazio se encontram, há um único ponto fixo onde a realidade chega ao fim. Essa junção planar, um abismo de entropia sólida cristalizada pelo peso do infinito comprimindo-se eternamente sobre si, é onde darvakkas se formam.",
      },
    ],
  }),
  fam({
    id: 'family-viper-vine',
    name: "Videira Vípera",
    originalName: "Viper Vine",
    trait: null,
    aonUrl: "https://2e.aonprd.com/Search.aspx?q=Viper%20Vine",
    intro:
      "Carnívora voraz comedora de carne, a videira vípera tem uma única flor enorme erguendo-se de um emaranhado espesso e frondoso de videiras semelhantes a cobras. Quando a planta sente a aproximação de presa adequada pelo sistema de raízes sensível e enterrado raso, ergue-se como uma cobra agitada e desenrola a flor de cores vivas, um ato que libera uma nuvem de pólen que entorpece a mente.\n\nComo videiras vípera ganham nutrição consumindo criaturas em vez de por fotossíntese e absorvendo nutrientes do solo, desenvolveram locomoção rudimentar e podem arrastar-se pelo chão com raízes semelhantes a tentáculos. Até têm uma forma de senciência rudimentar, permitindo-lhes tanto discernir diferenças na presa quanto tomar decisões táticas limitadas, ao mesmo tempo evitando criaturas particularmente grandes ou de aparência perigosa.\n\nA área em torno dos terrenos de caça da videira vípera muitas vezes está salpicada dos restos parcialmente devorados das vítimas. Não é incomum achar os cadáveres em decomposição de animais selvagens, aventureiros malogrados e até gigantes nas imediações da planta, junto com um espalhamento de tesouro incidental deixado nos cadáveres. Uma videira vípera raramente volta à carcaça de uma criatura que matou antes, preferindo caçar carne fresca.",
    sections: [],
  }),
  fam({
    id: 'family-doprillu',
    name: "Doprillu",
    originalName: "Doprillu",
    trait: null,
    aonUrl: "https://2e.aonprd.com/Search.aspx?q=Doprillu",
    intro:
      "As aberrações conhecidas como doprillus são brutos de músculos em faixas que usam máscaras ornamentadas o tempo todo, as quais enchem os portadores de força mágica e espírito de luta. Doprillus amam batalhar, sobretudo por agarrão, e estão ansiosos para começar brigas. Em terreno neutro, um doprillu oferece duelar o oponente de aparência mais forte, mas quando o território natal de um doprillu é invadido, nenhuma regra se aplica ao confronto. Como convém ao sangue superaquecido que os alimenta, doprillus fazem lar em locais quentes: selvas tórridas, desertos ensolarados e cavernas subterrâneas perto de respiradouros de enxofre.",
    sections: [],
  }),
  fam({
    id: 'family-ozthoom',
    name: "Ozthoom",
    originalName: "Ozthoom",
    trait: null,
    aonUrl: "https://2e.aonprd.com/Search.aspx?q=Ozthoom",
    intro:
      "Ozthooms são assassinos sombrios que servem criaturas fey poderosas ou até os Primogênitos — os semideuses do Primeiro Mundo. Em meio às cortes dos Primogênitos ou de outros governantes fey poderosos, esses assassinos sinistros espreitam no alto enquanto aguardam o chamado à ação — ameaças implícitas semelhantes a armas mortais penduradas como decoração num salão real. Ozthooms nunca falam em voz alta; quando sentem necessidade de comunicar-se, fazem-no num sussurro telepático direto na mente da vítima. Embora o corpo de um ozthoom seja um material estranho e carnoso, as garras mortais e as asas cruelmente ganchudas são feitas de ferro frio afiado como navalha, uma qualidade que os torna muito temidos entre outros fey. Um ozthoom típico tem 3 m de altura e envergadura de 2,4 m, mas pesa menos de 36 kg.\n\nEmbora a maioria dos ozthooms sirva mestres poderosos, alguns desses fey assassinos foram deixados à própria sorte e não servem senão os próprios caprichos volúveis. Em alguns casos, o mestre foi morto; em outros, o ozthoom foi dispensado do serviço por qualquer número de razões. Um ozthoom deixado a indulgir os desejos cruéis sem freio é muitas vezes o ozthoom mais perigoso de todos.",
    sections: [],
  }),
  fam({
    id: 'family-berberoka',
    name: "Berberoka",
    originalName: "Berberoka",
    trait: null,
    aonUrl: "https://2e.aonprd.com/Search.aspx?q=Berberoka",
    intro:
      "Berberokas são humanoides gigantes que vivem entre florestas e pântanos, onde usam a habilidade de engolir quantidades maciças de água para drenar lagoas e lagos pequenos. Criaturas que visitam o bebedouro predileto e encontram só uma bacia de lama vazia tornam-se presa do berberoka, que se esconde no mato e avassala a presa com uma torrente maciça de água regurgitada.\n\nO dorso mosqueado de um berberoka — que lembra um feixe de plantas locais, árvores pequenas e pedras grandes — concede camuflagem natural que lhes permite esconder-se à vista de todos. Berberokas tendem a disfarçar-se de formações rochosas no centro de um leito seco enquanto esperam passantes. Nas regiões tropicais onde berberokas são mais comuns, os locais sabem dar ampla margem a lagoas vazias, independentemente dos peixes tentadores saltitando. Viajantes famintos, por outro lado, podem ver tal fartura como bênção dos deuses, só para ser arrastados no dilúvio mortal do berberoka.",
    sections: [],
  }),
  fam({
    id: 'family-hyakume',
    name: "Hyakume",
    originalName: "Hyakume",
    trait: null,
    aonUrl: "https://2e.aonprd.com/Search.aspx?q=Hyakume",
    intro:
      "Centenas de olhos injetados espiam de sob as camadas carnosas da pele de um hyakume. Essas aberrações descomunais cobiçam conhecimento e vão a grandes extremos para guardar o que sabem para si; destroem scriptoria que saquearam e queimam livros que leram para assegurar que nenhuma outra alma aprenda o conteúdo. Embora hyakumes ocasionalmente troquem informação valiosa para granjear conhecimento maior, são propensos a enganar os alvos a revelar mais do que deveriam. O mais assustador de tudo é a habilidade do hyakume de roubar memórias e apagar qualquer conhecimento de sua existência das mentes das vítimas.",
    sections: [],
  }),
  fam({
    id: 'family-marrmora',
    name: "Marrmora",
    originalName: "Marrmora",
    trait: null,
    aonUrl: "https://2e.aonprd.com/Search.aspx?q=Marrmora",
    intro:
      "No Primeiro Mundo, marrmoras habitam ermos arruinados perpetuamente flagelados pelo fogo e raramente, se é que alguma vez, viajam a outro lugar. Quando um incêndio florestal devasta uma região selvagem no Universo e resulta na morte de outros fey, marrmoras podem ser puxados através da fronteira planar para deleitar-se na destruição resultante. Buscam reacender os fogos que os chamaram, reunir e alimentar-se dos restos carbonizados dos que pereceram dentro (em particular os corpos de fey mortos), embora fiquem com saudade de casa se passam tempo demais longe do Primeiro Mundo. São oprimidos por uma raiva caprichosa mas persistente e são infalivelmente cruéis. Embora sejam capazes de negociação e interação inteligente, quase nunca barganham de boa-fé e em geral interagem com outros só como meio de espalhar com mais eficiência a devastação flamejante.\n\nA aparência torcida de um marrmora evoca o aspecto de um arbóreo cuja casca foi queimada até virar carvão. Têm rostos quase sem feições e mãos que terminam em garras longas e afiadas. A carne quebrada parece madeira queimada a carvão, crivada de rachaduras que ainda brilham com um calor malsão. Deixam um rastro de cinza por onde andam, e fios de fumaça se enrolam dos corpos. Embora marrmoras apreciem a visão de qualquer bosque e seus habitantes assando nos fogos cuidadosamente cultivados, pouco traz mais prazer ao fey monstruoso do que a visão de criaturas vegetais inteligentes cozinhando até ficar crocantes.",
    sections: [],
  }),
  fam({
    id: 'family-nosferatu',
    name: "Nosferatu",
    originalName: "Vampire, Nosferatu",
    trait: null,
    aonUrl: "https://2e.aonprd.com/MonsterFamilies.aspx?ID=630",
    intro:
      "Nosferatus são vampiros antigos nascidos de mortais que morreram nas grandes pestes de outrora. Talvez por causa da idade avançada, nosferatus não conseguem criar mais da própria espécie.",
    sections: [
      {
        id: "among-the-living",
        title: "Entre os Vivos",
        body: "Embora a aparência aterrorize, nosferatus em geral habitam entre mortais. Podem residir num solar decrépito encravado num bairro quieto. Também ocupam um castelo abandonado, predando viajantes exaustos que tomam o covil por abrigo contra os elementos.",
      },
      {
        id: "building-a-nosferatu",
        title: "Construir um Nosferatu",
        body: "Embora nosferatus não consigam criar mais da própria espécie, muitos desses vampiros antigos espreitam nas várias sombras do mundo, tomando uma variedade de formas. Se houver tempo, é mais eficaz construir um nosferatu novo do zero usando as regras padrão de criação de monstros, usadas para criar o servo nosferatu, o malfeitor nosferatu e o soberano nosferatu. Porém, também se pode usar as diretrizes em Criar um Nosferatu para transformar uma criatura existente num nosferatu, ajustando o monstro conforme convier. Em qualquer caso, habilidades específicas de nosferatu como cura do vazio, Dominar e Beber Sangue funcionam igual.",
      },
      {
        id: "building-a-nosferatu-thrall",
        title: "Construir um Servo Nosferatu",
        body: "Embora um nosferatu não transforme uma criatura viva noutro nosferatu, pode criar um servo por um ritual de 1 dia. Pode manter um número de servos até o modificador de Carisma; criar servos novos além desse limite liberta servos anteriores do serviço. Pode converter qualquer criatura viva que não seja sem mente num servo nosferatu aplicando as habilidades de servo nosferatu e aumentando o nível em 1. Uma criatura imune a efeitos mentais não pode tornar-se servo nosferatu. Também se pode construir um servo nosferatu do zero usando as regras de criação de monstros no GM Core e aplicando as modificações acima.",
      },
      {
        id: "monsters-of-legend",
        title: "Monstros de Lenda",
        body: "A palavra nosferatu aparece impressa desde meados do século XVIII, apresentada por escritores da Europa Ocidental como um termo romeno para vampiro, inspirando algumas das mentes mais brilhantes da ficção de horror. Não existe etimologia clara, e embora se desconheça se as raízes da palavra são de fato romenas, o próprio vampiro é um elemento duradouro do folclore romeno.",
      },
    ],
  }),
]
