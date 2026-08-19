import type { CreatureFamily } from '@/types/creature'

const SOURCE = 'Gatewalkers (Hardcover)'

function fam(
  partial: Omit<CreatureFamily, 'source'> & { source?: string },
): CreatureFamily {
  return { source: SOURCE, ...partial }
}

/**
 * Famílias AoN Monster Families de Gatewalkers (Hardcover).
 * Asides = barras laterais oficiais da página da família. Sem blurb de membro.
 */
export const catalogCreatureFamiliesGatewalkers: CreatureFamily[] = [
  fam({
    id: 'family-blackfrost-dead',
    name: "Mortos da Geada Negra",
    originalName: "Blackfrost Dead",
    trait: null,
    sourcePage: 248,
    aonUrl: "https://2e.aonprd.com/MonsterFamilies.aspx?ID=664",
    intro:
      "Esses horrores árticos cambaleantes são mortos só no nome. Criaturas que sucumbem ao frio enquanto amaldiçoadas pela geada negra não viram meros cadáveres enterrados no gelo, e sim mortos-vivos ferozes capazes de espalhar ainda mais a maldição. Carne gretada e queimada de frio que emite vapor congelante como fumaça; passadas inexoráveis pela neve escurecida de cinza; um olhar vazio azul-gelo desprovido de humanidade — as descrições dos mortos da geada negra variam conforme quem conta, mas ninguém nega o pavor sobrenatural que evocam.\n\nMortos da geada negra assumem várias formas. A maioria é bruta sem mente, quase indistinguível de zumbis mundanos salvo pela maldição que infligem. Outros não só mantêm a presença de espírito como empunham poderes de corrupção psíquica semelhantes aos da origem da geada negra, Osoyo, a Baleia da Geada Negra. A forma que um morto da geada negra assume depende sobretudo da fortitude psíquica da vítima e da aptidão dela para magia oculta.\n\nMais detalhes sobre a geada negra aparecem no livro.\n\nVocê pode modificar um morto-vivo existente para virar um morto da geada negra usando as habilidades a seguir. Todos os mortos da geada negra carregam a maldição da geada negra e têm algum modo de infligi-la, em geral com um dos Golpes. A maioria tem também uma outra habilidade desta lista. Como derivam da própria geada negra, todos têm o traço raro.\n\nSopro da Geada Negra (oculto) O morto da geada negra ofega fundo e então exala uma névoa de partículas azul-escuras de geada negra numa emanação de 1,5 m. Todas as criaturas dentro da névoa ficam ocultas, e todas as criaturas fora da névoa ficam ocultas para quem está dentro. A névoa persiste por 1 minuto. Uma criatura que termine o turno na névoa é exposta à geada negra. O morto da geada negra não pode usar Sopro da Geada Negra de novo por 1d4 rodadas.\n\nEscalar no Gelo O morto da geada negra pode escalar gelo como se tivesse o Deslocamento de escalada listado. Ignora terreno difícil e terreno muito difícil de gelo e neve e não corre risco de cair ao atravessar gelo.\n\nOlhar que Queima a Mente (emoção, medo, oculto, visual) O morto da geada negra finca o olhar aterrorizante numa criatura a até 18 m. A criatura sofre 1d4 de dano mental por nível do morto da geada negra (mínimo 2d4), com salvaguarda básica de Vontade. Em falha crítica, fica Amedrontada 1.\n\nMorte Estilhaçante (frio) Quando o morto da geada negra é destruído, o corpo estilhaça como gelo quebradiço, enchendo o ar ao redor de lascas gélidas e afiadas. Criaturas numa emanação de 3 m sofrem 1d8 de dano de frio por nível do morto da geada negra (mínimo 3d8), com salvaguarda básica de Reflexos. Quem falha criticamente também sofre 1d6 de dano persistente de sangramento.",
    sections: [
      {
        id: "creating-blackfrost-dead",
        title: "Criar Mortos da Geada Negra",
        body: "O jeito mais simples de criar um morto da geada negra é usar um morto-vivo existente, como um zumbi ou uma múmia, como criatura-base. Troque as habilidades da criatura por habilidades da lista nesta página. Todos os mortos da geada negra ganham o traço frio e têm pelo menos um modo de infligir geada negra, muitas vezes usando um dos Golpes.",
      },
      {
        id: "curse-of-the-crown",
        title: "Maldição da Coroa",
        body: "Mortos da geada negra só são encontrados em torno das Agulhas Sem Nome, sob as quais permanece aprisionado um ser alienígena enorme chamado Osoyo. Só recentemente esse ser ancestral mexeu-se no sono, fazendo a geada negra espumar de fendas no gelo e afligir exploradores infelizes. A disseminação da maldição tem sido misericordiosamente lenta até agora, mas a cada criatura afligida o alcance de Osoyo se expande para fora.",
      },
    ],
  }),
  fam({
    id: 'family-elder-thing',
    name: "Elder Thing",
    originalName: "Elder Thing",
    trait: null,
    sourcePage: 256,
    aonUrl: "https://2e.aonprd.com/MonsterFamilies.aspx?ID=665",
    intro:
      "Conhecidas por vários nomes em vários mundos, mas com mais frequência como “elder things” ou “os antigos”, essas criaturas alienígenas se interessam por criar obras duradouras de arte, arquitetura e até vida (como o lendário e temido shoggoth). Combinadas à capacidade ilimitada de egocentrismo e a vidas enormemente longas, elder things em geral se veem como a espécie mais erudita e avançada de qualquer planeta que visitam, e tendem a tratar a maioria das outras formas de vida como um cientista trataria estoque experimental. Embora em geral não sejam inimigas ou violentas por natureza, esse jeito as coloca em conflito com outras sociedades que encontram, e a guerra é uma solução de honra antiga. Elder things raramente recuam de usar violência para garantir o próprio território e o direito percebido de experimentar e explorar.\n\nUma elder thing típica tem 1,8 m da cabeça aos pés, com envergadura de 2,1 m. Os corpos são radiais, com cinco asas, cinco braços semelhantes a tentáculos que terminam cada um num ninho retorcido de gavinhas, e cinco pedúnculos oculares. Numa ponta do corpo em forma de barril há tentáculos maiores usados para combate e locomoção; na outra, no centro dos cinco olhos na cabeça em forma de estrela-do-mar, fica uma única boca cercada de cílios multicoloridos. O idioma de uma elder thing mistura assobios e silvos, mas elas também vocalizam uma ampla gama de outros idiomas — embora com sotaque estranho e agudo.",
    sections: [
      {
        id: "space-travelers",
        title: "Viajantes Espaciais",
        body: "Uma elder thing pode viajar pelo espaço sideral voando, mas não o faz a uma velocidade maior que o Deslocamento de voo normal. Quando deseja viajar pelo vazio do espaço, em geral aponta-se na direção desejada e entra em hibernação cronometrada para despertar quando se aproxima do destino.",
      },
    ],
  }),
  fam({
    id: 'family-gorga',
    name: "Gorga",
    originalName: "Gorga",
    trait: null,
    sourcePage: 260,
    aonUrl: "https://2e.aonprd.com/MonsterFamilies.aspx?ID=666",
    intro:
      "Gorgas são personificações feéricas do medo que criaturas diurnas têm do escuro. Seres de sombra e fome, adoram predar criaturas amantes da luz. Existem muitos tipos de gorgas, e cada um personifica uma faceta diferente dos incontáveis terrores da noite.\n\nGorgas são comuns no reino do Primeiro Mundo chamado Nighthold, onde um dia serviram o misterioso Conde Ranalc. Depois do desaparecimento de Ranalc, as gorgas perderam depressa o pouco de compaixão que tinham, espalharam-se em bandos pequenos liderados pelos membros mais fortes e começaram a caçar qualquer feérico que achassem. Todas as gorgas carregam véus de sombra dentro de si, e a maioria acha a luz do dia desagradável, tendendo a permanecer na penumbra perpétua de Nighthold ou a se esconder em cavernas ou florestas densas até a noite cair. Os olhos bizarros — poços ocos de sombra mágica — permitem que vejam mesmo na escuridão mágica.",
    sections: [
      {
        id: "gorgas-and-elves",
        title: "Gorgas e Elfos",
        body: "Há milhares de anos as gorgas buscam vingança pela perda do amado Conde Ranalc. Há alguns séculos, um intrigante feérico chamado Kaneepo, o Magro, viu no rancor das criaturas sombrias uma oportunidade de executar a própria vendeta. O feérico de língua afiada convenceu um grupo de gorgas de que os elfos estavam por trás do desaparecimento do Conde Ranalc e de que as gorgas alcançariam vingança se se unissem aos assaltos de Kaneepo contra o Universo. Embora algumas das gorgas mais perspicazes tenham visto através do ardil, a maioria se contenta em ter uma válvula para a fúria.",
      },
      {
        id: "other-gorgas",
        title: "Outras Gorgas",
        body: "Existem tantos tipos de gorgas quantos jeitos de temer o escuro. O medo de perder a única fonte de iluminação — uma tocha oscilante numa tempestade, a última vela numa noite sem lua — manifesta-se como uma notua, capaz de apagar luzes e vidas. Quando o escuro faz objetos distantes parecerem outra coisa — um tronco parece uma fera agachada, um véu de musgo vira uma cobra pendurada — a gorga gaiomyr dança de deleite e traz à vida horrenda os perigos imaginados das vítimas. Algumas gorgas, dizem, representam medos noturnos que desafiam descrição — o medo de incógnitas desconhecidas, talvez.",
      },
    ],
  }),
  fam({
    id: 'family-skin-beetle',
    name: "Besouro-da-pele",
    originalName: "Skin Beetle",
    trait: null,
    sourcePage: 267,
    aonUrl: "https://2e.aonprd.com/MonsterFamilies.aspx?ID=667",
    intro:
      "Besouros-da-pele são encontrados na maioria dos ambientes que sustentam vida, das estepes frias e secas às selvas densas e úmidas. Usam mandíbulas complexas de várias articulações para arrancar a pele e a carne de criaturas recém-mortas com precisão quase cirúrgica.\n\nEmbora comam a maior parte do que removem, também preservam pedaços para depois, cobrindo-os com secreções salivares especiais semelhantes a formaldeído. O besouro-da-pele enrola essa carne coberta numa bola e então a guarda sob uma raiz exposta ou uma pedra para tempos mais magros. Sinais de atividade incluem esqueletos esfolados e o cheiro da saliva conservante dos besouros.",
    sections: [
      {
        id: "umasi-beetle-masters",
        title: "Umasi Mestres dos Besouros",
        body: "Embora sejam mais conhecidos por esfolar carniça, besouros-da-pele também podem curar indivíduos gravemente feridos. Conseguem enxertar carne preservada num animal ou humanoide moribundo. O resultado final não é bonito, mas às vezes funciona. Do ponto de vista de quem foi curado, a bênção pode ser mista, pois a cirurgia do besouro muitas vezes transforma o sujeito numa aberração de retalhos chamada umasi.\n\nUmasi criados por besouros-da-pele às vezes desenvolvem conexões sobrenaturais com seus salvadores insetoides. Esses umasi podem comandar besouros-da-pele a colher mais carne para manter intactos os corpos em decomposição.",
      },
    ],
  }),
]
