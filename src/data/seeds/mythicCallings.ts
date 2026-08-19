import type { MythicCalling } from '@/types/mythic'
import {
  SOURCE_WAR_OF_IMMORTALS_ID,
  SOURCE_RUNELORDS_PG_ID,
} from './sources'

function c(opts: Omit<MythicCalling, 'provenance'>): MythicCalling {
  return { ...opts, provenance: { type: 'official' } }
}

/** Chamados míticos Remaster. Sem Legacy. */
export const officialMythicCallings: MythicCalling[] = [
  c({
    id: 'calling-acrobat',
    name: 'Chamado do Acrobata',
    originalName: "Acrobat's Calling",
    rarity: 'uncommon',
    summary:
      'Dançar em alturas perigosas e atravessar vãos só com reflexo e perícia.',
    mythicSpend:
      'Ao Equilibrar-se, Manobrar em Voo, Passar por Espaço Ameaçado ou Saltar em Distância, gaste 1 Ponto Mítico para testar com proficiência mítica.',
    mythicRegain:
      'O primeiro sucesso crítico do dia em Acrobacia ao Equilibrar-se, Manobrar em Voo ou Passar por Espaço Ameaçado em combate devolve 1 Ponto Mítico.',
    edicts: [
      'Saltar sem ter certeza de que vai aterrissar ileso',
      'Testar os reflexos passando pelo espaço de inimigos bem mais poderosos',
    ],
    anathema: [
      'Contornar um inimigo quando passar pelo espaço dele for uma opção viável',
      'Usar medidas de segurança para acrobacias',
    ],
    sourceId: SOURCE_WAR_OF_IMMORTALS_ID,
    sourcePage: 79,
    aonUrl: 'https://2e.aonprd.com/MythicCallings.aspx?ID=1',
  }),
  c({
    id: 'calling-artisan',
    name: 'Chamado do Artesão',
    originalName: "Artisan's Calling",
    rarity: 'uncommon',
    summary:
      'Uma urgência de criar até o feito que o mundo nunca viu.',
    mythicSpend:
      'Ao Fabricar ou Consertar um objeto (incluindo veículos e estruturas), gaste 1 Ponto Mítico para testar com proficiência mítica.',
    mythicRegain:
      'O primeiro sucesso crítico do dia para Consertar devolve 1 Ponto Mítico.',
    edicts: [
      'Ser o primeiro a testar um item ou arma feito com as próprias mãos',
      'Buscar ou inovar fórmulas de criações cada vez mais complexas',
    ],
    anathema: [
      'Destruir as criações de outros artesãos',
      'Recusar um pedido sincero de consertar algo quebrado',
      'Usar arma ou item feito por outra pessoa, salvo para aprender a função e entender como criar o seu',
    ],
    sourceId: SOURCE_WAR_OF_IMMORTALS_ID,
    sourcePage: 79,
    aonUrl: 'https://2e.aonprd.com/MythicCallings.aspx?ID=2',
  }),
  c({
    id: 'calling-bookkeeper',
    name: 'Chamado do Arquivista',
    originalName: "Bookkeeper's Calling",
    rarity: 'uncommon',
    summary:
      'Preservar conhecimento e os instrumentos que o guardam — livros, pergaminhos, arquivos.',
    mythicSpend:
      'Ao Recordar Conhecimento ou Ganhar Renda com um Conhecimento em que você é treinado, gaste 1 Ponto Mítico para testar com proficiência mítica.',
    mythicRegain:
      'O primeiro sucesso crítico do dia em Recordar Conhecimento pesquisando numa biblioteca ou local semelhante devolve 1 Ponto Mítico.',
    edicts: [
      'Educar os outros',
      'Registrar conhecimento novo para que outros compartilhem das descobertas',
    ],
    anathema: [
      'Destruir livros, pergaminhos ou outros instrumentos de registro',
      'Recusar a chance de compartilhar conhecimento com quem busca de verdade',
    ],
    sourceId: SOURCE_WAR_OF_IMMORTALS_ID,
    sourcePage: 79,
    aonUrl: 'https://2e.aonprd.com/MythicCallings.aspx?ID=3',
  }),
  c({
    id: 'calling-caretaker',
    name: 'Chamado do Cuidador',
    originalName: "Caretaker's Calling",
    rarity: 'uncommon',
    summary:
      'Cuidar dos outros até, um dia, curar uma ferida inimaginável.',
    mythicSpend:
      'Ao Tratar Doença, Tratar Veneno, Tratar Ferimentos ou usar Medicina de Batalha, gaste 1 Ponto Mítico para testar com proficiência mítica.',
    mythicRegain:
      'O primeiro sucesso crítico do dia em Tratar Ferimentos devolve 1 Ponto Mítico.',
    edicts: [
      'Prestar auxílio',
      'Curar os feridos, de onde quer que venham',
    ],
    anathema: [
      'Negar cuidado aos desfavorecidos',
      'Recusar curar as feridas de um inimigo que se rendeu',
    ],
    sourceId: SOURCE_WAR_OF_IMMORTALS_ID,
    sourcePage: 80,
    aonUrl: 'https://2e.aonprd.com/MythicCallings.aspx?ID=4',
  }),
  c({
    id: 'calling-demagogue',
    name: 'Chamado do Demagogo',
    originalName: "Demagogue's Calling",
    rarity: 'uncommon',
    summary: 'As palavras fluem de uma fonte na alma.',
    mythicSpend:
      'Ao Coagir ou Causar Impressão, gaste 1 Ponto Mítico para testar com proficiência mítica.',
    mythicRegain:
      'O primeiro sucesso crítico do dia para Coagir uma criatura que não é aliada, Criar Diversão com palavras ou Causar Impressão num público indiferente ou hostil devolve 1 Ponto Mítico.',
    edicts: [
      'Contar histórias a públicos que nunca as ouviram',
      'Resolver conflitos com palavras, não com armas',
    ],
    anathema: [
      'Interromper alguém que está contando uma história',
      'Recorrer à violência sem tentar desarmar a situação com palavras',
    ],
    sourceId: SOURCE_WAR_OF_IMMORTALS_ID,
    sourcePage: 80,
    aonUrl: 'https://2e.aonprd.com/MythicCallings.aspx?ID=5',
  }),
  c({
    id: 'calling-guardian',
    name: 'Chamado do Guardião',
    originalName: "Guardian's Calling",
    rarity: 'uncommon',
    summary:
      'Proteger aliados e inocentes, empurrando agressores para longe.',
    mythicSpend:
      'Ao Desarmar, Reposicionar ou Empurrar, gaste 1 Ponto Mítico para testar com proficiência mítica. Com proficiência mítica, essas manobras ignoram o tamanho da criatura.',
    mythicRegain:
      'O primeiro sucesso crítico do dia em Desarmar, Reposicionar ou Empurrar devolve 1 Ponto Mítico.',
    edicts: [
      'Colocar-se no caminho do dano para proteger aliados ou inocentes ameaçados',
    ],
    anathema: [
      'Recuar de uma batalha enquanto aliados ou inocentes estão em perigo sem ter feito todo esforço razoável para resgatá-los',
    ],
    sourceId: SOURCE_WAR_OF_IMMORTALS_ID,
    sourcePage: 80,
    aonUrl: 'https://2e.aonprd.com/MythicCallings.aspx?ID=6',
  }),
  c({
    id: 'calling-handler',
    name: 'Chamado do Tratador',
    originalName: "Handler's Calling",
    rarity: 'uncommon',
    summary: 'Cuidar de criaturas selvagens.',
    mythicSpend:
      'Ao Comandar um Animal, gaste 1 Ponto Mítico para testar com proficiência mítica.',
    mythicRegain:
      'O primeiro sucesso crítico do dia para Causar Impressão num animal selvagem ou Comandar um Animal que não é seu pet/companheiro devolve 1 Ponto Mítico.',
    edicts: [
      'Cuidar de animais ou feras perigosas que precisem',
      'Respeitar os habitats das criaturas selvagens',
    ],
    anathema: [
      'Iniciar combate contra um animal ou fera encontrado no ambiente natural',
      'Matar um animal ou fera quando poupá-lo for uma opção viável',
    ],
    sourceId: SOURCE_WAR_OF_IMMORTALS_ID,
    sourcePage: 80,
    aonUrl: 'https://2e.aonprd.com/MythicCallings.aspx?ID=7',
  }),
  c({
    id: 'calling-hunter',
    name: 'Chamado do Caçador',
    originalName: "Hunter's Calling",
    rarity: 'uncommon',
    summary:
      'Você é o caçador; em algum lugar, um predador lendário espera como desafio final.',
    mythicSpend:
      'Ao Buscar ou Rastrear, gaste 1 Ponto Mítico para testar com proficiência mítica.',
    mythicRegain:
      'O primeiro sucesso crítico do dia para Buscar ou Rastrear uma criatura hostil ou não amistosa devolve 1 Ponto Mítico.',
    edicts: [
      'Ser o primeiro do grupo a explorar uma área desconhecida e potencialmente perigosa',
      'Procurar criaturas que desequilibram o mundo natural e corrigir o desequilíbrio',
    ],
    anathema: [
      'Deixar livre um animal ou fera que você feriu para causar dano no futuro',
      'Recusar um pedido para caçar um animal ou fera perigosa',
    ],
    sourceId: SOURCE_WAR_OF_IMMORTALS_ID,
    sourcePage: 80,
    aonUrl: 'https://2e.aonprd.com/MythicCallings.aspx?ID=8',
  }),
  c({
    id: 'calling-sage',
    name: 'Chamado do Sábio',
    originalName: "Sage's Calling",
    rarity: 'uncommon',
    summary: 'Já é um arquivo de saber, e a sede de aprender nunca se sacia.',
    mythicSpend:
      'Ao Recordar Conhecimento, gaste 1 Ponto Mítico para testar com proficiência mítica.',
    mythicRegain:
      'O primeiro sucesso crítico do dia em Recordar Conhecimento contra uma criatura inimiga devolve 1 Ponto Mítico.',
    edicts: [
      'Preservar o conhecimento para gerações futuras',
      'Buscar saber perdido em lugares perigosos ou esquecidos',
    ],
    anathema: [
      'Destruir livros ou outros repositórios de conhecimento',
      'Mentir para esconder conhecimento do mundo',
    ],
    sourceId: SOURCE_WAR_OF_IMMORTALS_ID,
    sourcePage: 80,
    aonUrl: 'https://2e.aonprd.com/MythicCallings.aspx?ID=9',
  }),
  c({
    id: 'calling-thespian',
    name: 'Chamado do Ator',
    originalName: "Thespian's Calling",
    rarity: 'uncommon',
    summary:
      'O mundo é um palco; você não é só ator — é o dramaturgo cuja história pode mudar o rumo da história.',
    mythicSpend:
      'Ao usar Performance para Apresentar-se ou Ganhar Renda, gaste 1 Ponto Mítico para testar com proficiência mítica.',
    mythicRegain:
      'O primeiro sucesso crítico do dia para Apresentar-se devolve 1 Ponto Mítico.',
    edicts: [
      'Dominar apresentações novas',
      'Buscar oportunidades de se apresentar a públicos novos',
      'Apoiar outros artistas',
    ],
    anathema: [
      'Negar um pedido de bis',
      'Recusar um pedido para se apresentar diante de um público',
      'Sabotar outro artista',
    ],
    sourceId: SOURCE_WAR_OF_IMMORTALS_ID,
    sourcePage: 80,
    aonUrl: 'https://2e.aonprd.com/MythicCallings.aspx?ID=10',
  }),
  c({
    id: 'calling-thief',
    name: 'Chamado do Ladrão',
    originalName: "Thief's Calling",
    rarity: 'uncommon',
    summary:
      'Mestre da guilda ou batedor de carteira: algo que não é seu chama, e a lacração só cresce.',
    mythicSpend:
      'Ao Abrir Fechadura ou Furtar um item, gaste 1 Ponto Mítico para testar com proficiência mítica.',
    mythicRegain:
      'O primeiro sucesso crítico do dia para Abrir Fechadura ou Furtar de uma criatura hostil devolve 1 Ponto Mítico.',
    edicts: [
      'Buscar fechaduras e defesas mecânicas cada vez mais perigosas e complexas',
      'Furtar coisas de criaturas ou lugares perigosos',
    ],
    anathema: [
      'Deixar tesouro desacompanhado onde o encontrou',
      'Deixar passar oportunidades de lucro que desafiem suas perícias',
    ],
    sourceId: SOURCE_WAR_OF_IMMORTALS_ID,
    sourcePage: 81,
    aonUrl: 'https://2e.aonprd.com/MythicCallings.aspx?ID=11',
  }),
  c({
    id: 'calling-doomsayer',
    name: 'Chamado do Profeta do Fim',
    originalName: "Doomsayer's Calling",
    rarity: 'rare',
    summary:
      'Todas as coisas acabam. Você estará no precipício do destino de Golarion — não para apressá-lo, mas para negar aos agentes do fim a satisfação.',
    mythicSpend:
      'Ao Consertar, Prestar Primeiros Socorros ou Tratar Ferimentos (não Medicina de Batalha), gaste 1 Ponto Mítico para testar com proficiência mítica.',
    mythicRegain:
      'O primeiro sucesso crítico do dia para Consertar ou Prestar Primeiros Socorros devolve 1 Ponto Mítico.',
    edicts: [
      'Ajudar a impedir (ou ao menos adiar) o fim do mundo mantendo aliados e equipamento em boa forma',
      'Consolar os desesperançados',
    ],
    anathema: [
      'Ajudar de propósito qualquer plano para acabar com o mundo',
      'Zombar de quem prevê o fim do mundo',
    ],
    sourceId: SOURCE_RUNELORDS_PG_ID,
    sourcePage: 17,
    aonUrl: 'https://2e.aonprd.com/MythicCallings.aspx?ID=13',
  }),
  c({
    id: 'calling-dreamer',
    name: 'Chamado do Sonhador',
    originalName: "Dreamer's Calling",
    rarity: 'rare',
    summary:
      'Os sonhos sempre pareceram mais reais que a vigília. Algo nas Terras dos Sonhos chama.',
    mythicSpend:
      'Ao Recordar Conhecimento com Arcanismo, Natureza, Religião ou Ocultismo, ou ao Fabricar qualquer obra de arte, gaste 1 Ponto Mítico para testar com proficiência mítica.',
    mythicRegain:
      'O primeiro sucesso crítico do dia para Fabricar ou para Recordar Conhecimento sobre sonhos ou as Terras dos Sonhos devolve 1 Ponto Mítico.',
    edicts: [
      'Compartilhar seus sonhos com os amigos e se interessar se eles compartilharem os deles',
      'Tirar inspiração dos sonhos quando criar',
    ],
    anathema: [
      'Negar a uma criatura (incluindo você) a chance de dormir o bastante para sonhar',
      'Denegrir quem tem ambições que provavelmente nunca alcançará',
    ],
    sourceId: SOURCE_RUNELORDS_PG_ID,
    sourcePage: 17,
    aonUrl: 'https://2e.aonprd.com/MythicCallings.aspx?ID=14',
  }),
  c({
    id: 'calling-runelord',
    name: 'Chamado do Runelord',
    originalName: "Runelord's Calling",
    rarity: 'rare',
    summary:
      'Memórias estranhas, palpites e sonhos já puxavam você antes de Karzoug despertar. O legado de Thassilon — talvez até uma vida passada — está ligado à sua alma.',
    mythicSpend:
      'Ao Identificar Magia, Aprender uma Magia ou conjurar um ritual, gaste 1 Ponto Mítico para testar com proficiência mítica.',
    mythicRegain:
      'O primeiro sucesso crítico do dia em Arcanismo, Natureza, Ocultismo ou Religião para Identificar Magia devolve 1 Ponto Mítico.',
    edicts: [
      'Buscar magias e itens raros da Thassilon antiga',
      'Aprender o saber de Thassilon que foi esquecido',
    ],
    anathema: [
      'Destruir de propósito textos antigos ou outro conhecimento escrito sem antes preservá-lo de algum modo',
      'Tratar as convicções ou crenças de outra pessoa como fantasia ou delírio',
    ],
    sourceId: SOURCE_RUNELORDS_PG_ID,
    sourcePage: 18,
    aonUrl: 'https://2e.aonprd.com/MythicCallings.aspx?ID=15',
  }),
  c({
    id: 'calling-saga',
    name: 'Chamado da Saga',
    originalName: "Saga's Calling",
    rarity: 'rare',
    summary:
      'As Terras da Saga carregam lendas de antes da Queda da Terra. Cada história nova parece falar da sua vida — e você já sabe que está destinado a ser o foco de uma.',
    mythicSpend:
      'Ao usar Performance ou Recolher Informações, gaste 1 Ponto Mítico para testar com proficiência mítica.',
    mythicRegain:
      'O primeiro sucesso crítico do dia para Recolher Informações devolve 1 Ponto Mítico.',
    edicts: [
      'Proteger o povo das Terras da Saga',
      'Preservar lendas e mitos por escrito ou em arte para as gerações futuras',
    ],
    anathema: [
      'Deixar sofrer quem precisa de ajuda nas Terras da Saga se você puder fazer algo',
      'Tratar a própria saga como mais importante que a de qualquer outro — a sua ainda não foi contada até o fim',
    ],
    sourceId: SOURCE_RUNELORDS_PG_ID,
    sourcePage: 18,
    aonUrl: 'https://2e.aonprd.com/MythicCallings.aspx?ID=16',
  }),
]

export function listOfficialMythicCallings(): MythicCalling[] {
  return officialMythicCallings
}

export function getOfficialMythicCalling(id: string): MythicCalling | undefined {
  return officialMythicCallings.find((calling) => calling.id === id)
}
