import type { CreatureFamilySection } from '@/types/creature'

/** Lore (descrição + sidebars da ficha) das tropas de Battlecry! */
export const CREATURE_LORE_BATTLECRY: Record<
  string,
  { description: string; sections: CreatureFamilySection[] }
> = {
  'creature-angelic-chorus': {
    description:
      'Embora anjos corais se contentem em cantar hinos no Nirvana, às vezes precisam descer ao reino mortal para socorrer quem trava batalha justa contra os ímpios. Um coro angélico costuma apoiar exércitos que ganharam o favor dos reinos celestiais.',
    sections: [],
  },
  'creature-animated-army': {
    description:
      'Estátuas animadas costumam aparecer em pares ou sozinhas, escondidas à vista entre o restante da decoração. De vez em quando, um criador fabrica dezenas delas para servir como força de combate quase imparável, que não reclama nem cansa.',
    sections: [],
  },
  'creature-apprentice-magician-clique': {
    description:
      'Alunos de academias de magia às vezes formam amizades rápidas. Quando não estão estudando ou descarregando o estresse juntos, essas panelinhas podem ser chamadas para defender o local de ensino contra um ataque externo.',
    sections: [],
  },
  'creature-arboreal-copse': {
    description:
      'Embora guardiões arbóreos em geral permaneçam nos limites das florestas que protegem, ocasionalmente reúnem-se em bosques para buscar informação sobre ameaças e reportar aos regentes arbóreos. Arbóreos costumam ser lentos para agir, mas bosques às vezes precisam decidir rápido diante de perigos iminentes.',
    sections: [],
  },
  'creature-archer-regiment': {
    description:
      'Regimentos de arqueiros são capazes de encher o céu de flechas a grande distância, vitais para qualquer líder de guerra que queira enfraquecer o inimigo antes que ele se aproxime das unidades ou acampamentos aliados.',
    sections: [],
  },
  'creature-archon-bastion': {
    description:
      'Rekheps, também chamados arcontes-escudo, enfrentam qualquer investida profana contra o Céu, mas ocasionalmente viajam ao Universo mortal para proteger os fracos. Grandes formações de rekheps são um espetáculo quando travam as formas de escudo contra os ímpios.',
    sections: [],
  },
  'creature-boggard-dreadknot': {
    description:
      'A cavalaria boggard empunha clavas enquanto monta sapos gigantes em batalha, muitas vezes saindo dos pântanos natais para infundir medo no coração dos inimigos.',
    sections: [],
  },
  'creature-boggard-scouting-party': {
    description:
      'Patrulhas de batedores boggard avançam à frente de outras tropas boggard para reconhecer o terreno. Às vezes atacam se acham que podem vencer uma força inimiga com rapidez.',
    sections: [],
  },
  'creature-charau-ka-shrieker-crew': {
    description:
      'Charau-ka são primatas humanoides pequenos que vivem em selvas tropicais, sobretudo na Expansão Mwangi. Tripulações guinchadoras patrulham as copas perto dos povoados, afastando predadores. Às vezes um grupo se dedica ao senhor demoníaco Angazhan e vira uma caçada sedenta de sangue.',
    sections: [],
  },
  'creature-clockwork-infantry': {
    description:
      'Com cada unidade pesando cerca de 225 kg de metal e magia, uma infantaria de corda é força a se respeitar no campo. Sem precisar de comida, abrigo ou descanso e sem sentir dor, avança onde tropas vivas têm grande dificuldade. Sem moral a quebrar nem mentes a iludir, patrulha sem parar e não mostra piedade. O único inconveniente é precisar dar corda com mais frequência do que autômatos mais simples.',
    sections: [],
  },
  'creature-clockwork-runner-pack': {
    description:
      'Corredores de corda são unidades feitas para velocidade. Imitando grandes felinos, trocam robustez por agilidade. Controlam o campo atravessando terrenos diversos, cortando unidades inimigas e cobrindo aliados com as bestas embutidas. Como autômatos de corda, precisam ser recarregados, o que os torna menos ideais em destacamentos longos.',
    sections: [],
  },
  'creature-deinonychus-pack': {
    description:
      'Deinonicos são temidos tanto pelas garras afiadas com que evisceram a presa quanto pelo domínio da tática de matilha, que permite derrubar presas muito maiores. Algumas comunidades iruxi e xulgath treinam esses dinossauros como escaramuçadores de campo, enfraquecendo o inimigo com golpes de bater e correr antes do golpe final.',
    sections: [],
  },
  'creature-dezullon-thicket': {
    description:
      'É raro, por sorte, encontrar mais de um dezullon em poucos quilômetros quadrados: poucos ecossistemas têm caça bastante para sustentar mais de uma dessas plantas carnívoras. Quando um dezullon bem alimentado acha um lugar abundante, porém, às vezes enraíza, floresce e em seguida expulsa dezenas de vagens do tamanho de um punho. Se mudas suficientes chegam ao tamanho adulto, fundem-se temporariamente numa massa de gavinhas e varrem a área, esgotando a caça restante antes de se dispersar em busca de cotos próprios.',
    sections: [],
  },
  'creature-drake-flight': {
    description:
      'Drakes de biomas diferentes raramente se encontram, pela distância. Uma criatura poderosa, um artefato antigo ou uma catástrofe natural pode reunir vários tipos numa só catástrofe viva. Tal esquadrilha é terror no campo de batalha.',
    sections: [],
  },
  'creature-dromaar-company': {
    description:
      'Várias companhias mercenárias dromaar operam em Belkzen e arredores, oferecendo força de armas a qualquer clã que peça. Esses guerreiros disciplinados marcham confiantes, trazendo os machados contra quem se põe no caminho.',
    sections: [],
  },
  'creature-druid-circle': {
    description:
      'No papel de protetores das terras selvagens e intocadas, druidas poderosos podem reunir-se para enfrentar uma ameaça particularmente hedionda.',
    sections: [],
  },
  'creature-dwarf-longshot-squad': {
    description:
      'Enquanto muitos anões treinam para dominar martelos e escudos, outros buscam tornar-se mestres de armas à distância — em geral bestas robustas de feitura anã. Exércitos anões empregam esquadrões de tiro longo como primeira linha de defesa, sobretudo fora de túneis apertados e cavernas subterrâneas.',
    sections: [
      {
        id: 'longshots-with-guns',
        title: 'Tiros longos com armas de fogo',
        body: 'Anões de Dongun Hold e lugares semelhantes têm acesso a armas de fogo, e você pode refletir isso dando rifles ao esquadrão de tiro longo anão. Ajuste a ficha para o traço incomum e troque menções a “bestas” por “rifles” e “virotes” por “balas”. Além disso, dê à ação Virotes do Céu o traço concussivo, ou seja, causa dano de concussão ou perfurante, o que for mais prejudicial a cada alvo (você também pode chamá-la de “Balas do Céu”). Por fim, substitua Fuzilaria Impeditiva pela habilidade Névoa de Balas.\n\nEsta coleção já inclui a ficha pronta do esquadrão com rifles (Esquadrão de Tiro Longo Anão (armas de fogo)).',
      },
    ],
  },
  'creature-dwarf-longshot-squad-guns': {
    description:
      'Enquanto muitos anões treinam para dominar martelos e escudos, outros buscam tornar-se mestres de armas à distância. Em Dongun Hold e lugares semelhantes, o esquadrão troca as bestas por rifles: a primeira linha de defesa dispara fumaça e bala em campo aberto.',
    sections: [],
  },
  'creature-first-class-infantry': {
    description:
      'Soldados que participam de várias campanhas ganham a experiência necessária para se tornar as melhores forças de combate do exército. Tropas de infantaria de primeira classe entram em campos onde vencer o dia é da maior importância.',
    sections: [],
  },
  'creature-fleshwarp-amalgam': {
    description:
      'Distorcedores de carne gostariam que cada criação fosse perfeita, mas produzem inúmeros refugos. Muitos são mortos na criação. Alguns ainda têm uso, transformando a imperfeição em arma. Esses refugos — montes de carne, carapaças e membros demais — podem ser açoitados até o frenesi e lançados contra forças inimigas.',
    sections: [],
  },
  'creature-gargoyle-wing': {
    description:
      'Em geral feras solitárias que espreitam templos abandonados e outras estruturas onde se misturam à estatuária monstruosa, gárgulas ocasionalmente se unem para caçar presas desafiadoras ou simplesmente para o prazer comum de massacrar indefesos. Chamados asas, esses agrupamentos costumam ser curtos — o que pouco importa a quem cai sob sua predação enquanto duram.',
    sections: [],
  },
  'creature-giant-ant-army': {
    description:
      'Como as minúsculas, colônias de formigas gigantes formam vastos exércitos que lançam campanhas regulares nas terras ao redor do ninho para forragear e expandir território. Os alvos principais costumam ser colônias rivais, mas um exército que topa um povoado humanoide não hesita em invadi-lo e despojá-lo de recursos para a rainha, com particular interesse nos antigos habitantes.',
    sections: [],
  },
  'creature-gnome-cannon-corps': {
    description:
      'Gnomos inventivos misturam engenharia e magia feérica para criar canhões maravilhosos, cujos disparos coloridos deslumbram inimigos enquanto criam áreas de terreno distorcido. Só os generais mais espertos entendem como usar um corpo de canhões com grande vantagem na guerra não convencional.',
    sections: [],
  },
  'creature-goblin-rabble': {
    description:
      'Goblins não têm a organização e a disciplina dos primos hobgoblins, mas muitas vezes compensam com astúcia. Algumas tribos gostam de aterrorizar rotas comerciais ao crepúsculo. Focados em despojar valores e escapar em vez de terminar a luta, esses grupos brilham em velocidade e em identificar o que vale a pena tirar da presa atônita, usando táticas de bater e correr porque costumam estar em desvantagem.',
    sections: [],
  },
  'creature-halfling-lucky-draw': {
    description:
      'Alguns halflings, sobretudo os da Varísia, estudam os métodos de adivinhação do Harrow e acessam forças ocultas que lhes permitem manipular o destino com as cartas. Algumas companhias mercenárias e organizações criminosas empregam esses halflings como amuletos de azar para os inimigos.',
    sections: [],
  },
  'creature-hell-hound-pack': {
    description:
      'Com frequência destacadas no campo ao lado de legiões vordine, matilhas de cães infernais distraem e enfraquecem forças inimigas para dar vantagem tática aos senhores. Sem inteligência para manobras avançadas, cães bem treinados usam o sopro flamejante para controlar o campo, separando unidades inimigas dos aliados ou empurrando-as a posições piores, deixando-as presas fáceis para outras tropas profanas.',
    sections: [],
  },
  'creature-hobgoblin-veteran-regiment': {
    description:
      'Há poucas visões tão intimidadoras quanto um regimento de soldados hobgoblins bem armados avançando pelo campo. Excepcionalmente capazes de se defender e tenazes até o excesso, esses hobgoblins são usados como ferramenta de precisão, explorando o ponto mais fraco do inimigo e rasgando-o para colapsar linhas defensivas inteiras.',
    sections: [],
  },
  'creature-kobold-trap-squad': {
    description:
      'Esquadrões de armadilhas kobold em geral protegem as tocas, mas às vezes saem a mando de um patrono poderoso. Os objetivos costumam ser reconhecer um local, mas podem incluir obter um item ou recurso para o bem da toca.',
    sections: [],
  },
  'creature-leukodaemon-plague': {
    description:
      'Daemons são moldados pela destruição da vida em todas as formas — e a ela se dedicam. Leukodaemons servem ao Cavaleiro do Apocalipse da Pestilência, espalhando doença pelo Universo com o próprio toque. Um pequeno exército de leukodaemons tem potencial para apagar um país — ou mais — se não for detido.',
    sections: [],
  },
  'creature-lich-legion': {
    description:
      'O processo de tornar-se lich é raro e rigoroso, mas em lugares onde a magia flui livre uma sociedade de conjuradores pode realizar os rituais em coletivo. Quando dá certo, os liches resultantes ficam espiritualmente atados, formando um exército de conjuradores mortos-vivos perigosos, muitas vezes com metas sinistras.',
    sections: [],
  },
  'creature-mitflit-vermin-cavalry': {
    description:
      'Embora mitflits sejam conhecidos como gremlins covardes, o líder certo pode levá-los a um fervor agressivo. Montados em carrapatos gigantes, centopeias e outros artrópodes, esses mitflits superam o ódio de si mesmos para levar a luta aos inimigos.',
    sections: [],
  },
  'creature-monk-cadre': {
    description:
      'Muitos artistas marciais treinam para defender a si e aos aliados contra agressão indesejada, mas às vezes até os monges mais pacíficos precisam ir à guerra. Um quadro de monges estudados causa grande dano com socos e chutes, além de focar o qi em rajadas à distância.',
    sections: [],
  },
  'creature-ofalth-stampede': {
    description:
      'Se o sistema de lixo de uma grande cidade sai do controle, ofalths podem crescer e proliferar sem freio. Essas criaturas fétidas carregam toneladas de resto nas costas e uma doença particularmente virulenta.',
    sections: [],
  },
  'creature-omox-slime-pool': {
    description:
      'Omoxes são a personificação da poluição e da imundície. Sem anatomia verdadeira, tendem a assumir formas humanoides zombeteiras — distinção difícil de notar quando se reúnem em grupos grandes como força de ataque. Tal grupo muitas vezes parece uma única massa revolta de lodo com vários torsos projetados em formação militar.',
    sections: [],
  },
  'creature-orc-raiding-party': {
    description:
      'Bandos de saqueadores orcs são unidades temidas cujos ataques implacáveis e pura ferocidade os tornam soldados capazes, ainda que nada sutis. Levam a sério o dever de carregar o estandarte do clã ao combate e arriscam ferimentos graves de bom grado para mantê-lo no alto.',
    sections: [],
  },
  'creature-protean-tumult': {
    description:
      'Pela natureza caótica dos proteanos, muita gente assume que são incapazes de cooperar. Porém são astutos o bastante para unir-se diante do perigo ou a mando de seres mais poderosos, às vezes agindo como um grupo chamado tumulto proteano. Tal associação reúne dezenas de proteanos de formas e tamanhos diferentes, muitos dos quais alteram o corpo a cada instante.',
    sections: [],
  },
  'creature-qadiran-camel-corps': {
    description:
      'Navegar os desertos de Golarion exige indivíduos treinados e, muitas vezes, montarias especializadas. O corpo de camelos qadirano é um exemplo de quem faz patrulhas longas, caça bandidos e despacha ameaças naturais que possam incomodar viajantes.',
    sections: [],
  },
  'creature-ratfolk-shank-squad': {
    description:
      'Especialistas em combate urbano com muitos truques na manga, esta unidade de homens-rato é conhecida por armas envenenadas e truques sujos. Esquadrões de estiletes costumam ser mercenários leais apenas a quem paga mais.',
    sections: [],
  },
  'creature-redcap-brigade': {
    description:
      'Redcaps são fadas sádicas conhecidas pela sede de sangue impiedosa. Quando se reúnem em tropas, instigam uns aos outros a alturas ainda maiores de violência.',
    sections: [],
  },
  'creature-scamp-inferno': {
    description:
      'Diabretes do fogo são brincalhões excitáveis do Plano do Fogo, com pouco conceito de moderação. Quando se reúnem em bandos, o resultado inevitável é incêndio não intencional.',
    sections: [
      {
        id: 'other-elemental-scamp-troops',
        title: 'Outras tropas de diabretes elementais',
        body: 'Em geral, todos os diabretes elementais são um tanto travessos e igualmente propensos a reunir-se em massa para causar estrago (muitas vezes acidental). Você pode alterar a ficha do Inferno de Diabretes para representar tropas de outros diabretes elementais: troque o traço Fogo pelo listado e aplique os demais ajustes.\n\nEsta coleção já inclui fichas prontas de Avalanche (terra), Enchente (água), Estilhaços (metal), Emaranhado (madeira) e Redemoinho (ar).',
      },
    ],
  },
  'creature-scamp-avalanche': {
    description:
      'Diabretes da terra são travessos como os demais scamps elementais e tão propensos a reunir-se em massa para causar estrago — muitas vezes acidental. A avalanche vem de baixo, em pedra e veneno.',
    sections: [],
  },
  'creature-scamp-flood': {
    description:
      'Diabretes da água são travessos como os demais scamps elementais e tão propensos a reunir-se em massa para causar estrago — muitas vezes acidental. Onde deveria haver só travessura, vêm ácido e maré.',
    sections: [],
  },
  'creature-scamp-shrapnel': {
    description:
      'Diabretes do metal são travessos como os demais scamps elementais e tão propensos a reunir-se em massa para causar estrago — muitas vezes acidental. Estilhaço e sangramento no lugar da chama.',
    sections: [],
  },
  'creature-scamp-tangle': {
    description:
      'Diabretes da madeira são travessos como os demais scamps elementais e tão propensos a reunir-se em massa para causar estrago — muitas vezes acidental. Espinho, pólen e vinha no meio da tropa.',
    sections: [],
  },
  'creature-scamp-whirlwind': {
    description:
      'Diabretes do ar são travessos como os demais scamps elementais e tão propensos a reunir-se em massa para causar estrago — muitas vezes acidental. A rajada empurra — e eles ainda acham graça.',
    sections: [],
  },
  'creature-sinswarm': {
    description:
      'Crias do pecado, monstros de carne humanoide torcida, foram criadas há eras pelo runelord Alaznist como tropas de choque. Odientas até contra os da própria espécie, em geral só se reúnem em cultos pequenos e isolados, embora seres poderosos às vezes consigam coagir números maiores desses horrores babosos a unir forças como turbas excepcionalmente sedentas de sangue.',
    sections: [],
  },
  'creature-skeleton-mob': {
    description:
      'Para o mórbido, um campo de batalha não passa de um jardim de cadáveres. Às vezes, pela magia de um necromante ou por um acúmulo infeliz de energia de vazio, esses corpos erguem-se como esqueletos quebrados e destroçados. Mesmo incompletos, ainda representam ameaça significativa.',
    sections: [],
  },
  'creature-vanth-guardian-flock': {
    description:
      'Psicopompos vanth são guardiões eternos do ciclo de vida e morte. Quando almas são ameaçadas por profanos ou outras forças malevolentes, reúnem-se para ceifar a ameaça.',
    sections: [],
  },
  'creature-viking-guard': {
    description:
      'Bárbaros, caçadores e guerreiros ulfen testados em batalha reúnem-se numa unidade de elite especializada em proteger líderes no combate, bem como quem pode pagar seus serviços. Viajando longe, tropas isoladas ou companhias inteiras encontram trabalho com facilidade graças à reputação, de guarda-costas em pequenos exércitos privados a missões especializadas.',
    sections: [],
  },
  'creature-vordine-legion': {
    description:
      'Vordines são os soldados rasos do Inferno, despachados em vastos exércitos da cidade de ferro de Dis para guardar as camadas superiores e esmagar os inimigos dos arquidiabos que ali governam. Infatigável e impiedosa, uma legião de vordines golpeia com precisão implacável que impõe medo e inveja em igual medida pelo multiverso. Embora em geral sirvam a diabos mais poderosos, como os tirânicos nessari, cada legião também observa uma hierarquia interna única que permite a outro vordine assumir o comando num instante, se necessário.',
    sections: [],
  },
  'creature-wight-battalion': {
    description:
      'Wights são mortos-vivos malévolos, empenhados em profanar o sagrado e determinados a causar sofrimento a toda criatura viva. Um wight sozinho já é perigoso; compelidos a agir juntos, são força a se respeitar. Um batalhão de wights tem potencial para amaldiçoar exércitos inteiros, aumentando o número até virar uma maré profana.',
    sections: [],
  },
  'creature-wolf-pack': {
    description:
      'Embora matilhas de lobos possam ser ameaça a vilas agrícolas que dependem do gado, preferem não atacar humanoides nem outros inimigos perigosos. Matilhas famintas, porém, não têm o luxo da cautela.',
    sections: [],
  },
  'creature-xulgath-army': {
    description:
      'Embora a maioria dos povoados xulgath fique no Subsolo, esses humanoides reptilianos às vezes sobem à superfície com más intenções. Reunidos em exército, rasgam comunidades inocentes em nome de qualquer líder a quem sirvam.',
    sections: [],
  },
  'creature-xulgath-dinosaur-cavalry': {
    description:
      'Xulgaths criam e treinam dinossauros há milênios, e os laços entre eles são tão familiares e fortes quanto os de qualquer outro humanoide com o companheiro domesticado de escolha. A maioria serve sobretudo como besta de carga, mas soldados de elite conhecidos como ginetes rudes treinam os dinossauros mais vis e agressivos de várias espécies como montarias aterradoras, capazes de romper linhas defensivas e reduzir fortificações a estilhaços com a mesma facilidade com que dispersam soldados inimigos.',
    sections: [],
  },
  'creature-zecui-horde': {
    description:
      'Um ataque surpresa de um enxame dos insetoides zecui pode apagar uma vila inteira da noite para o dia. Quando não devoram as vítimas na hora, em geral as implantam com as próprias larvas e as enterram em covas coletivas imensas, onde a horda em desenvolvimento pode ficar dormente por anos antes de irromper à superfície para assolar povoados próximos.',
    sections: [],
  },
}
