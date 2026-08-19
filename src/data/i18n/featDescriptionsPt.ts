import { GENERATED_FEAT_DESCRIPTIONS_PT } from './featUiGeneratedPt'
import { lookupFeatRecord } from './featNamesPt'
import {
  GENERATED_FEAT_FREQUENCIES_PT,
  GENERATED_FEAT_TRIGGERS_PT,
} from './featTriggersGeneratedPt'
import { formatSpeedMeters } from '@/utils/labels'
import { applyCatalogTokens } from '@/data/i18n/catalogTokensPt'
import { EQUIPMENT_PHRASE_REPLACEMENTS } from '@/data/i18n/equipmentPhrasesPt'

/**
 * Descrições pt-BR curadas (prioridade máxima).
 * Chave = originalName em inglês do feito.
 * O seed pode continuar em inglês; a UI usa este mapa.
 */
export const FEAT_DESCRIPTIONS_PT: Record<string, string> = {
  'Combat Assessment':
    'Você faz um ataque telegráfico para estudar o inimigo. Faça um Golpe corpo a corpo. Em um acerto, pode imediatamente tentar um teste de Recordar Conhecimento sobre o alvo. Em um acerto crítico, ganha +2 de bônus de circunstância nesse teste. O alvo fica temporariamente imune à Avaliação de Combate por 1 dia.',
  'Double Slice':
    'Você ataca o inimigo com as duas armas. Faça dois Golpes, um com cada arma corpo a corpo, cada um usando sua penalidade de ataque múltiplo atual. Ambos devem ter o mesmo alvo. Se o segundo Golpe for com uma arma que não tenha o traço ágil, ele sofre −2 de penalidade.\n\nSe ambos acertarem, some o dano e depois aplique outros efeitos das duas armas. Dano de precisão só conta uma vez, no ataque que você escolher. Some o dano dos dois Golpes e aplique resistências/fraquezas só uma vez. Isso conta como dois ataques para a penalidade de ataque múltiplo.',
  'Exacting Strike':
    'Você faz um ataque controlado, tentando abrir espaço para outro. Faça um Golpe. Em um erro, este ataque não aumenta sua penalidade de ataque múltiplo.',
  'Powerful Shove':
    'Você pode Empurrar criaturas até uma categoria de tamanho maior que você. Em um sucesso crítico no teste de Atletismo para Empurrar, você empurra o alvo até 3 m e o derruba.',
  'Sudden Charge':
    'Com uma explosão rápida de movimento, você avança e ataca. Distancie até o dobro da sua Velocidade (mínimo 1,5 m) e, no fim do movimento, faça um Golpe corpo a corpo. Você pode usar Investida Súbita enquanto Escala ou Nada se tiver a velocidade correspondente.',
  'Vicious Swing':
    'Você coloca força extra no golpe. Faça um Golpe corpo a corpo. Se acertar, cause +1 dado de dano da arma (ou do ataque desarmado). Este dado não é aumentado por efeitos que aumentem o tamanho do dado. Em edições anteriores, este feito era Power Attack.',
  'Intimidating Strike':
    'Seu golpe amedronta o inimigo. Faça um Golpe corpo a corpo. Em um acerto, o alvo fica assustado 1 (assustado 2 em crítico).',
  'Point-Blank Stance':
    'Você adota uma postura para tiros curtos. Enquanto nesta postura, ao fazer um ataque à distância com arma sem o traço de recarregar contra um alvo adjacente, você não sofre a penalidade usual de −2, e o alvo fica desprevenido contra seus ataques à distância.',
  'Point Blank Stance':
    'Você adota uma postura para tiros curtos. Enquanto nesta postura, ao fazer um ataque à distância com arma sem o traço de recarregar contra um alvo adjacente, você não sofre a penalidade usual de −2, e o alvo fica desprevenido contra seus ataques à distância.',
  'Combat Grab':
    'Você agarra o inimigo com a mão livre. Faça um Golpe corpo a corpo com a outra mão. Em um acerto, o alvo fica agarrado por você (enquanto a mão livre estiver livre). O alvo fica agarrado até escapar ou você soltar.',
  'Aggressive Block':
    'Você bloqueia e empurra. Use quando Bloquear com Escudo. Empurre o alvo 1,5 m (ou 3 m em sucesso crítico no Bloqueio, se o mestre permitir).',
  'Assisting Shot':
    'Seu tiro ajuda o aliado. Faça um Golpe à distância. Em um acerto, o próximo aliado a atacar o alvo antes do início do seu próximo turno ganha +1 de bônus de circunstância ao ataque (ou +2 em crítico seu).',
  'Certain Strike':
    'Mesmo um golpe falho causa algum dano. Faça um Golpe. Em um erro, cause dano igual ao modificador do atributo da arma (sem outros bônus). Em falha crítica, não cause dano.',
  'Power Attack':
    'Você coloca força extra no golpe. Faça um Golpe corpo a corpo. Se acertar, cause +1 dado de dano da arma. Este dado não é aumentado por efeitos que aumentem o tamanho do dado.',
  'Snagging Strike':
    'Você prende o inimigo. Faça um Golpe corpo a corpo com uma mão livre. Em um acerto, o alvo fica agarrado até o início do seu próximo turno ou até escapar.',
  'Dual-Handed Assault':
    'Você empunha a arma com as duas mãos por um instante. Faça um Golpe com uma arma corpo a corpo de uma mão. Adicione o dado de dano de duas mãos da arma (se houver) a este ataque.',
  'Rebound Tornado':
    'Você gira e rebate ataques. Até o início do seu próximo turno, quando um inimigo erra um ataque corpo a corpo contra você, você pode fazer um Golpe corpo a corpo contra ele como reação.',
  "Guardian's Deflection":
    'Você desvia o golpe de um aliado. Gatilho: um inimigo ataca um aliado adjacente a você. O aliado ganha +2 de bônus de circunstância à CA contra o ataque. Se o ataque errar, o inimigo fica desprevenido contra o próximo ataque corpo a corpo que você fizer contra ele até o fim do seu próximo turno.',
  'Shielded Stride':
    'Quando você tem um escudo erguido, pode Distancie-se pela metade da Velocidade (arredondado para cima) sem provocar Golpes Reativos ou movimentos semelhantes.',
  'Slam Down':
    'Você derruba o inimigo. Faça um Golpe corpo a corpo. Em um acerto, o alvo fica caído. Em crítico, também sofre a condição caído e não pode Levantar-se até o início do seu próximo turno.',
  'Swipe':
    'Você corta em arco. Faça um Golpe corpo a corpo e compare o resultado com a CA de até dois inimigos adjacentes entre si e a você. Role o ataque uma vez e aplique a cada alvo. Cada acerto causa dano normalmente; isso conta como um ataque para a penalidade de ataque múltiplo.',
  'Twin Parry':
    'Você cruza as armas para se defender. Enquanto empunha duas armas corpo a corpo, ganha +1 de bônus de circunstância à CA até o início do seu próximo turno (ou +2 se as duas tiverem o traço de aparar).',
  'Brutal Beating':
    'Seu Ataque Furtivo deixa o alvo atordoado. Em um crítico com Ataque Furtivo, o alvo fica atordoado 1.',
  'Nimble Dodge':
    'Você se esquiva. Gatilho: um inimigo que você pode ver declara um ataque contra você e ainda não rolou. Você ganha +2 de bônus de circunstância à CA contra aquele ataque.',
  'Trap Finder':
    'Você ganha +1 de bônus de circunstância a testes de Percepção para achar armadilhas, a testes de Ladroagem para desarmá-las e a salvaguardas contra armadilhas. Também pode achar armadilhas que normalmente exigem Percepção mestre.',
  'Twin Feint':
    'Você finta com uma arma e ataca com a outra. Faça dois Golpes, cada um com uma arma diferente, contra o mesmo alvo. O segundo Golpe conta o alvo como desprevenido até o fim deste ataque. Ambos usam a penalidade de ataque múltiplo atual, e cada um a aumenta normalmente.',
  "You're Next":
    'Você amedronta o próximo. Gatilho: você reduz um inimigo a 0 PV. Tente um teste de Intimidação com +2 de bônus de circunstância para Coagir um inimigo que possa ver a morte.',
  'Mobility':
    'Você se move sem provocar. Quando Distancia, não provoca reações que são desencadeadas por movimento (como Golpe Reativo), a menos que você saia de um quadrado ameaçado e entre em outro ameaçado pela mesma criatura.',
  'Sudden Leap':
    'Você salta e ataca. Salte até sua Velocidade horizontalmente, e faça um Golpe corpo a corpo no fim do salto. Se estiver voando ou escalando, pode saltar na direção correspondente.',
  'Quick Draw':
    'Você saca e ataca. Interaja para sacar uma arma e faça um Golpe com ela.',
  'Gang Up':
    'Você e seus aliados cercam o alvo. Qualquer inimigo a 3 m de você e de pelo menos um aliado fica desprevenido contra você.',
  'Dread Striker':
    'Você aproveita o medo. Criaturas assustadas ficam desprevenidas contra seus ataques.',
  "Scout's Warning":
    'Você alerta o grupo. Gatilho: você vai rolar iniciativa. Você e aliados a 9 m que possam ouvi-lo ganham +1 de bônus de circunstância à iniciativa.',
  'Rage':
    'Você libera a fúria. Enquanto enfurecido: ganha PV temporários iguais ao nível + modificador de Constituição; +2 de dano com armas e ataques desarmados corpo a corpo; −1 de CA; não pode usar ações com o traço concentração. Dura 1 minuto, até ficar inconsciente, ou até terminar (ação livre). Depois de enfurecer-se, não pode enfurecer-se de novo por 1 minuto.',
  'Sudden Charge (Barbarian)':
    'Você avança enfurecido. Distancie até o dobro da Velocidade e faça um Golpe corpo a corpo. Você deve estar enfurecido.',
  'Acute Vision':
    'Você ganha visão no escuro.',
  'Acute Scent':
    'Você ganha faro impreciso com alcance de 9 m.',
  'Fast Movement':
    'Sua Velocidade aumenta em 3 m enquanto não usa armadura pesada.',
  'Raging Athlete':
    'Enquanto enfurecido, você ganha Escalada e Natação iguais à metade da Velocidade terrestre (arredondada para cima), e ignora a primeira quadrícula de terreno difícil a cada Distância.',
  'Counterspell':
    'Quando um inimigo lança uma magia que você tem preparada, você pode gastar o preparo correspondente para tentar Dissipar Magia nela como reação.',
  'Familiar':
    'Você ganha um familiar. Se já tiver um, ganha uma habilidade extra de familiar.',
  'Reach Spell':
    'Se sua próxima ação for Conjurar uma Magia com alcance, aumente o alcance em 9 m. Se a magia normalmente tiver alcance de toque, passa a 9 m.',
  'Widen Spell':
    'Se sua próxima ação for Conjurar uma Magia com área de explosão, cone ou linha, e a magia não tiver duração, aumente a área. Explosão: +1,5 m de raio. Cone: +4,5 m. Linha: +4,5 m.',
  'Conceal Spell':
    'Você esconde a conjuração. Se sua próxima ação for Conjurar uma Magia, tente Furtividade contra a Percepção de observadores. Em sucesso, eles não notam que você conjurou (a menos que a magia tenha efeitos óbvios).',
  'Bespell Strikes':
    'Energia mágica envolve suas armas. Frequência: 1 vez por turno. Se seu turno anterior incluiu Conjurar uma Magia não cantrip, seu próximo Golpe causa +1d6 de dano (tipo conforme a magia) até o fim do turno.',
  'Advanced School Spell':
    'Você aprende a magia de foco avançada da sua escola.',
  'Basic Lesson':
    'Seu patrono concede uma lição básica. Escolha uma lição básica; você ganha o hex associado e seu familiar aprende a magia associada.',
  'Greater Lesson':
    'Seu patrono concede uma lição maior. Escolha uma lição maior; você ganha o hex associado e seu familiar aprende a magia associada.',
  'Major Lesson':
    'Seu patrono concede uma lição suprema. Escolha uma lição suprema; você ganha o hex associado e seu familiar aprende a magia associada.',
  "Patron's Puppet":
    'Você comanda o familiar à distância. Ação livre. Seu familiar Distancia, Passa, Escala ou Nada até sua Velocidade.',
  'Phase Familiar':
    'Você protege o familiar. Gatilho: seu familiar sofreria dano. O familiar ganha resistência a todo dano igual ao seu nível + modificador de Inteligência contra o dano desencadeante.',
  'Bardic Lore':
    'Seu repertório de conhecimento é vasto. Você treina em Lore Bárdico, uma perícia especial para Recordar Conhecimento sobre quase qualquer assunto. Use seu modificador de Ocultismo se for maior.',
  'Lingering Composition':
    'Você faz a composição durar. Se sua próxima ação for lançar um truque de composição, tente Performance. Em sucesso, a composição dura 3 rodadas; em sucesso crítico, 4; em falha, 1; em falha crítica, a composição falha. Isso também aumenta sua reserva de foco em 1.',
  'Versatile Performance':
    'Você usa Performance no lugar de Diplomacia para Impressionar, Intimidação para Coagir e Enganação para Mentir ou Impersonar. Também pode usar Performance para cumprir pré-requisitos de feitos dessas perícias.',
  'Martial Performance':
    'Sua arte inspira combate. Quando você lança um truque de composição, pode Distancie-se até a metade da Velocidade (arredondada para cima) como ação livre antes ou depois.',
  'Inspire Courage':
    'Você inspira coragem (Hino Corajoso). Seu truque de composição concede +1 de status a ataque, dano e salvaguardas contra medo.',
  'Domain Initiate':
    'Você acessa um domínio da sua divindade. Escolha um domínio; ganha a magia de foco inicial desse domínio e uma reserva de foco com 1 Ponto de Foco.',
  'Deadly Simplicity':
    'Sua arma favorita simples ou desarmada torna-se mais letal. Aumente o dado de dano da arma favorita em um passo (1d4→1d6, 1d6→1d8, 1d8→2d6, etc.).',
  'Healing Hands':
    'Sua magia Curar tem o dado aumentado em um passo (d8→d10).',
  'Holy Castigation':
    'Você canaliza poder sagrado. Se for sagrado, pode usar Ferir para danificar demônios e mortos-vivos mesmo que normalmente use Curar; regras de santificação se aplicam.',
  'Communal Healing':
    'Quando você lança Curar visando uma única criatura e restaura PV, você também recupera PV iguais ao posto da magia.',
  // Patrulheiro — descrições sem versão no pacote gerado
  'Far Shot':
    'Sua experiência em campo ensinou você a focar a mira à distância, aumentando sua precisão. Dobre os incrementos de alcance das suas armas.',
  'Intensified Element Stance':
    'Você consome o medicamento elemental do seu corpo para reforçar seus ataques, mas não pode consumir mais nenhum medicamento elemental até o dia seguinte. Enquanto estiver na Postura do Elemento Intensificado, seus Golpes e magias de dano causam 1d6 de dano adicional contra certas criaturas, conforme o tipo de medicamento elemental consumido. Se quem fabricou o medicamento era lendário na perícia usada, esse dano sobe para 2d6.\n\n**Terra**: dano de ácido contra criaturas de água\n\n**Fogo**: dano de fogo contra criaturas de metal e constructos predominantemente metálicos\n\n**Metal**: dano de eletricidade contra criaturas de madeira ou vegetais e constructos feitos principalmente de madeira ou matéria vegetal\n\n**Água**: dano sônico contra criaturas de fogo\n\n**Madeira**: dano de frio contra criaturas de terra e constructos feitos principalmente de rocha ou terra',
  'Incredible Companion (Ranger)':
    'Seu companheiro animal continua a crescer e se desenvolver. Ele se torna um companheiro animal ágil ou selvagem (à sua escolha), ganhando capacidades adicionais conforme o tipo de companheiro.',
  'Side by Side (Ranger)':
    'Você e seu companheiro animal lutam em conjunto. Sempre que você e seu companheiro animal estiverem adjacentes ao mesmo inimigo, vocês estão flanqueando esse inimigo um com o outro, independentemente das posições reais.',
  'Stealthy Companion':
    'Você treinou seu companheiro animal para se misturar ao ambiente. Seu companheiro animal ganha o benefício do feito Camuflagem. Se o companheiro for um emboscador especializado, sua proficiência em Furtividade sobe para mestre (ou lendária, se já era mestre).',
  'Legendary Monster Hunter':
    'Seu conhecimento sobre monstros é tão incrível que revela falhas gritantes na sua presa. Seu bônus de Caçador de Monstros (e o bônus de Guardião contra Monstros, se tiver) aumenta de +1 para +2, para você e para qualquer aliado beneficiado.',
  'Warden’s Reload':
    'Sua maestria com magia e com armas como a besta permite empunhar ambas com igual facilidade. Interaja para recarregar uma arma que esteja empunhando.',
  "Warden's Reload":
    'Sua maestria com magia e com armas como a besta permite empunhar ambas com igual facilidade. Interaja para recarregar uma arma que esteja empunhando.',
  'Manifold Edge':
    'Você aprendeu a explorar toda vantagem possível. Ao usar Caçar Presa, você pode ganhar um benefício de gume do caçador diferente do que escolheu no 1º nível. Se fizer isso, não ganha o benefício adicional de Caçador Magistral.',
  'Masterful Companion':
    'Seu companheiro animal compartilha suas habilidades incríveis de caça, permitindo que ele abata a presa comum com facilidade. Ao Caçar Presa, seu companheiro animal ganha o benefício de Caçador Magistral associado ao seu gume do caçador, em vez de apenas o benefício original do gume.',
  'Legendary Shot':
    'Você se concentra na presa caçada, percebendo ângulos, resistência do ar e cada variável que afetaria seu ataque à distância. Se tiver proficiência de mestre com sua arma à distância, você ignora a penalidade por atacar a até cinco incrementos de alcance ao atacar sua presa caçada.',
  'Ultimate Skirmisher':
    'Você é tão habilidoso em navegar pelos ermos que seu movimento não é afetado por terreno algum. Você ignora os efeitos de todo terreno difícil, terreno muito difícil e terreno perigoso, e não aciona armadilhas e perigos disparados ao entrar em uma área (como arames e placas de pressão), a menos que queira.',
  'Head Stomp':
    'Faça um Golpe corpo a corpo desarmado contra um alvo caído. Se acertar, até o fim do seu próximo turno o alvo fica estupefato 1 (ou estupefato 2 em um acerto crítico) e desprevenido.',
  // Patrulheiro — nível 1
  'Animal Companion':
    'Você ganha os serviços de um companheiro animal jovem, que viaja com você em suas aventuras e obedece a comandos simples da melhor forma que consegue. Veja Companheiros Animais para mais informações.\n\n**Patrulheiro**: ao Caçar Presa, seu companheiro animal ganha os benefícios da ação e o benefício do seu gume do caçador, se você tiver um.',
  'Crossbow Ace':
    'Seu domínio profundo da besta permite recarregar com eficiência enquanto sai da linha de tiro. Crie uma Diversão ou Busque Cobertura, depois Interaja para recarregar. Como de costume, você precisa cumprir os requisitos para Buscar Cobertura: estar caído, se beneficiando de cobertura ou perto de um elemento que permita Buscar Cobertura.',
  'Hunted Shot':
    'Você dispara dois tiros rápidos contra quem está caçando. Faça dois Golpes contra sua presa com a arma exigida. Se ambos acertarem a mesma criatura, some o dano para efeito de resistências e fraquezas. Aplique sua penalidade de ataque múltiplo normalmente a cada Golpe.',
  'Initiate Warden':
    'Você treinou com uma das seitas de patrulheiros conhecidas como guardiões, que praticam um tipo especializado de magia primal. Você ganha uma magia de guardião à sua escolha entre as magias de guardião iniciais (ou outra a que tenha acesso). Fica treinado em ataques e CDs de magia primal; o atributo de conjuração é Sabedoria. Se ainda não tiver, ganha uma reserva de 1 Ponto de Foco (Refocar: 10 min comungando com a natureza ou ritos simples de guardião).\n\n**Especial**: você pode escolher este feito várias vezes, escolhendo uma magia de guardião inicial diferente a cada vez.',
  'Monster Hunter':
    'Você avalia sua presa rapidamente e aplica o que sabe. Como parte da ação usada para Caçar Presa, você pode fazer um teste para Recordar Conhecimento sobre ela. Ao obter sucesso crítico ao identificar a presa caçada com Recordar Conhecimento, além dos outros benefícios você nota uma fraqueza nas defesas da criatura: ganha +1 de bônus de circunstância na sua próxima jogada de ataque contra essa presa, e qualquer aliado a quem você avisar ganha o mesmo benefício. Você só pode conceder os bônus de Caçador de Monstros 1 vez por dia contra uma criatura específica.',
  'Twin Takedown':
    'Você ataca rapidamente sua presa caçada com cada uma das suas armas, podendo combinar o dano em um único golpe devastador. Faça dois Golpes contra sua presa caçada, um com cada arma exigida. Se ambos acertarem a mesma presa, some o dano para efeito de resistências e fraquezas. Aplique sua penalidade de ataque múltiplo normalmente a cada Golpe.',
  // Patrulheiro — nível 2
  'Animal Empathy (Ranger)':
    'Você tem uma ligação com as criaturas do mundo natural que permite comunicar-se com elas em nível rudimentar. Você pode usar Diplomacia para Causar Impressão em animais e fazer Pedidos muito simples a eles. Na maioria dos casos, animais selvagens dão tempo para você se explicar.',
  'Favored Terrain':
    'Você estudou um terreno específico para superar seus desafios. Escolha aquático, ártico, deserto, floresta, montanha, planície, céu, pântano ou subterrâneo como terreno favorito. Nesse terreno, você ignora os efeitos de terreno difícil não mágico. Se tiver o recurso de classe Jornada Desimpedida, ganha um segundo benefício no terreno favorito, conforme a escolha:\n\n**Aquático**: você ganha deslocamento de natação igual ao seu deslocamento. Se já tinha deslocamento de natação, em vez disso ganha +3 m de bônus de status nele.\n\n**Ártico**: você precisa comer e beber apenas um décimo do normal, não é afetado por frio severo ou extremo e caminha sobre gelo e neve com deslocamento pleno sem precisar se Equilibrar.\n\n**Deserto**: você precisa comer e beber apenas um décimo do normal, não é afetado por calor severo ou extremo e caminha sobre areia com deslocamento pleno sem precisar se Equilibrar.\n\n**Floresta, Montanha ou Subterrâneo**: você ganha deslocamento de escalada igual ao seu deslocamento. Se já tinha deslocamento de escalada, em vez disso ganha +3 m de bônus de status nele.\n\n**Planície**: você ganha +3 m de bônus de status no deslocamento terrestre.\n\n**Céu**: você ganha +3 m de bônus de status no deslocamento de voo, se tiver um.\n\n**Pântano**: você se move por brejos com deslocamento pleno, mesmo que sejam fundos o bastante para ser terreno muito difícil ou exigir Nadar.',
  "Hunter's Aim":
    'Quando você se concentra em mirar, seu ataque fica especialmente preciso. Faça um Golpe à distância contra sua presa caçada. Nesse Golpe você ganha +2 de bônus de circunstância na jogada de ataque e ignora a condição oculto da presa e qualquer cobertura menor.',
  'Monster Warden':
    'Você sabe como se defender da sua presa. Quando concede os bônus de Caçador de Monstros, cada criatura beneficiada também ganha +2 de bônus de circunstância na CA na próxima vez que a criatura a atacar, ou na próxima salvaguarda contra um efeito daquela criatura (o que vier primeiro).',
  // Patrulheiro — nível 4
  'Advanced Warden':
    'Você desbloqueia magias primais mais poderosas. Você ganha uma magia de guardião à sua escolha entre as magias de guardião avançadas (ou outra a que tenha acesso).\n\n**Especial**: você pode escolher este feito várias vezes, escolhendo uma magia de guardião avançada diferente a cada vez.',
  "Companion's Cry":
    'Você pode incentivar seu companheiro a dar o máximo. Você pode gastar 2 ações para Comandar um Animal em vez de 1 ao comandar seu companheiro animal. Se fizer isso, seu companheiro animal usa uma ação adicional.',
  'Disrupt Prey':
    'Faça um Golpe corpo a corpo contra sua presa. Se o ataque for um acerto crítico, você interrompe a ação desencadeante.',
  'Favored Prey':
    'Você estudou um tipo específico de criatura selvagem e consegue caçá-lo com mais facilidade. Ao ganhar este feito, escolha animais, feras, dragões ou fungos e plantas como presa favorita. Ao rolar iniciativa, se puder ver um inimigo da categoria escolhida, você pode Caçar Presa como ação livre, designando esse inimigo.\n\nVocê pode usar essa ação livre mesmo sem ter identificado a criatura com Recordar Conhecimento. O benefício não se aplica contra inimigos favoritos disfarçados de outras criaturas, e o mestre decide se vale contra uma criatura disfarçada de presa favorita.',
  'Natural Conduit':
    'Você pode usar um animal como conduto para sua magia. Se sua próxima ação for Conjurar uma Magia que tenha alcance, a magia usa o animal como ponto de origem.',
  'Running Reload':
    'Você pode recarregar sua arma em movimento. Você Distancia, dá um Passo ou se Esgueira, depois Interage para recarregar.',
  "Wolf in Sheep's Clothing":
    'Com um pedaço de couro, alguns chifres e pelos descartados, você cria um disfarce capaz de enganar até um caçador experiente. Você pode Fazer-se Passar por criaturas com os traços animal, fera ou planta, desde que sejam do mesmo tamanho que você ou um tamanho maior e tenham forma corporal ao menos vagamente parecida com a sua (ou seja, um humanoide típico poderia se passar por um urso ou um arbóreo, mas não por um cavalo, escorpião gigante ou trepadeira assassina). Passar-se por uma criatura maior não muda seu tamanho real.',
  // Patrulheiro — nível 6
  'Additional Recollection':
    'Você examina o campo de batalha rapidamente, lembrando detalhes críticos de vários oponentes. Você pode imediatamente tentar um teste para Recordar Conhecimento sobre uma criatura diferente que consiga perceber.',
  'Animal Strength':
    'Você acessa a força primal do seu _traço animal_. Quando ganha um ataque de garras ou mandíbulas por _traço animal_, você pode escolher uma arma que esteja carregando e aplicar todas as runas dela (quando aplicáveis) a esse ataque desarmado. Isso substitui quaisquer runas que o ataque desarmado normalmente teria de outras fontes, como _ataduras de golpes poderosos_. Além disso, ao acertar criticamente com um ataque de garras ou mandíbulas do traço animal, você causa 1d6 de dano de sangramento persistente.',
  'Masterful Warden':
    'Sua maestria em magia de guardião aumenta. Você ganha uma magia de guardião à sua escolha entre as magias de guardião mestras (ou outra a que tenha acesso).\n\n**Especial**: você pode escolher este feito várias vezes, escolhendo uma magia de guardião mestra diferente a cada vez.',
  'Mature Animal Companion (Ranger)':
    'Seu companheiro animal se torna um companheiro animal maduro e ganha capacidades adicionais.\n\nSeu companheiro animal tem mais independência. Durante um encontro, mesmo que você não use a ação Comandar um Animal, ele ainda pode usar 1 ação naquela rodada, no seu turno, para Golpear ou Distanciar (ou Escavar, Escalar, Voar ou Nadar, se tiver esse deslocamento). Ele pode fazer isso em qualquer momento do seu turno, desde que você não esteja executando uma ação. Se fizer, essas são todas as ações que ele ganha na rodada — você não pode Comandá-lo depois.',
  'Nature Prowler':
    'Quando você começa seu turno escondido ou indetectável pela presa caçada, ela fica desprevenida contra você até o fim do seu turno. Em ambiente natural, você pode Evitar Ser Notado e se Esgueirar com deslocamento pleno.',
  'Snap Shot':
    'Você pode reagir com armas à distância quando uma criatura está em curta distância. Você pode usar uma reação que normalmente permite um Golpe corpo a corpo para, em vez disso, fazer um Golpe à distância. Você precisa estar Golpeando um alvo adjacente. Se o gatilho da reação exigir, trate sua arma à distância como se tivesse alcance de 1,5 m. Se a reação tiver outros requisitos, como empunhar um tipo específico de arma, Disparo Instantâneo não permite ignorá-los; ele só permite trocar um Golpe corpo a corpo por um Golpe à distância.',
  'Swift Tracker':
    'Seus olhos apurados captam sinais de passagem mesmo em movimento. Você pode se mover com deslocamento pleno enquanto Rastreia. Com proficiência de mestre em Sobrevivência, você não precisa fazer um novo teste de Sobrevivência a cada hora enquanto Rastreia. Com proficiência lendária em Sobrevivência, você pode usar outra atividade de exploração enquanto Rastreia.\n\nSe rolar Sobrevivência para iniciativa enquanto rastreia sua presa caçada, ao começar seu primeiro turno do encontro você pode Distanciar em direção à presa como ação livre.',
  // Patrulheiro — nível 8
  "Can't You See?":
    'O olho se rebela, a mente recua — por mais que quem consiga vê-lo tente explicar o que está ali, o olhar dos companheiros simplesmente desliza por você, como um pássaro com medo de pousar. Um personagem que tentar Apontar sua posição deve fazer um teste plano CD 14. Se falhar, seus aliados o entendem mal e não sabem onde você está. Em uma falha crítica, os aliados acham que ele apontou você em um lugar completamente diferente, escolhido pelo mestre. Da mesma forma, quando uma criatura falha criticamente ao Procurar você enquanto está escondido ou indetectável para ela, ela acha que você está em outro lugar, escolhido pelo mestre. Nos dois casos você parece estar escondido para a criatura que pensa que você está em outro lugar, embora na prática você esteja indetectável para ela quanto a mirar e a novos usos da ação Procurar.',
  'Deadly Aim':
    'Você mira nos pontos fracos da presa, tornando o disparo mais difícil, mas causando mais dano se acertar. Faça um Golpe à distância contra sua presa caçada com −2 de penalidade. Você ganha +4 de bônus de circunstância no dano desse Golpe. Esse bônus sobe para +6 no 11º nível e +8 no 15º.',
  'Eerie Environs':
    'O mundo natural pode ser assustador para quem não está acostumado — e você o torna ainda mais. Se estiver escondido de uma criatura, você pode tentar Desmoralizá-la sem perder a condição escondido, imitando sons de bestas estranhas ou fazendo a vegetação farfalhar ameaçadoramente. Ao fazer isso, você não sofre a penalidade no teste caso o alvo não entenda seu idioma.',
  'Eerie Traces':
    'Os rastros que você deixa são estranhos, de algum modo perturbadores e inquietantes — podem seguir para trás ou passar por lugares onde ninguém pensaria em passar. Você transforma seus rastros em vestígios sinistros, movendo-se até metade da sua velocidade de viagem enquanto o faz. Você não precisa fazer teste de Sobrevivência para alterar os rastros, mas quem tentar rastreá-lo deve fazer uma salvaguarda de Vontade contra a maior entre sua CD de classe e sua CD de magia.\n\n**Sucesso**: o rastreador não é afetado.\n\n**Falha**: o rastreador fica assustado 1 enquanto seguir seus rastros. Essa condição não diminui até ele parar de segui-lo, e volta se ele retomar o rastreamento. Se entrar em um encontro com você depois de seguir seus rastros, começa o encontro assustado 1.\n\n**Falha crítica**: como na falha, mas os vestígios perturbadores deixam o rastreador assustado 2.',
  'Hazard Finder':
    'Você tem uma habilidade intuitiva para sentir perigos. Você ganha +1 de bônus de circunstância em testes de Percepção para encontrar armadilhas e perigos, na CA contra os ataques deles e nas salvaguardas contra seus efeitos. Você consegue encontrar perigos que normalmente exigiriam Vasculhar mesmo sem estar Vasculhando.',
  'Terrain Master':
    'Você consegue se adaptar ao ambiente em qualquer terreno natural. Você pode passar 1 hora praticando no terreno atual para torná-lo seu terreno favorito, substituindo temporariamente o atual. Se passar um dia inteiro fora do novo terreno favorito, ele volta a ser a escolha original feita quando você pegou o feito Terreno Favorito.',
  "Warden's Boon":
    'Você Aponta vulnerabilidades presentes na sua presa caçada, concedendo a um aliado os benefícios listados em Caçar Presa e do seu gume do caçador até o fim do próximo turno dele. Dependendo de você gritar ou usar gestos, esta ação ganha o traço auditivo ou visual.',
  // Patrulheiro — nível 10
  Camouflage:
    'Você altera sua aparência para se misturar aos ermos. Em terreno natural, você pode se Esconder e se Esgueirar mesmo sem cobertura e sem estar oculto.',
  'Eerie Proclamation':
    'Você sabe que há lugares no mundo que são simplesmente errados — onde os pássaros não cantam e você sente que está sendo observado. Você consegue identificar esses lugares e despertá-los. Para isso, gesticule na direção de um quadrado de 3 m por 3 m que consiga ver e faça uma proclamação ameaçadora ("Este é solo amaldiçoado", "Aquele é um lugar de mau agouro"). A próxima criatura que entrar no território marcado deve fazer uma salvaguarda de Vontade contra sua CD de magia (se for druida) ou CD de classe (se for patrulheiro).\n\n**Sucesso**: o alvo não é afetado.\n\n**Falha**: algo dá terrivelmente errado para a vítima no solo amaldiçoado. Os detalhes ficam a cargo do mestre — pode ser um acidente puramente "natural" (pisar numa velha armadilha de urso, talvez) ou algo mais estranho e espectral. O alvo ganha uma condição por 2 rodadas: role 1d4 e use a coluna de falha (1: desajeitado 2; 2: enfraquecido 2; 3: estupefato 2; 4: deslumbrado).\n\n**Falha crítica**: como na falha, mas o efeito é assombrosamente medonho. Use a coluna de falha crítica (1: desajeitado 3; 2: enfraquecido 3; 3: estupefato 3; 4: cego por 1 rodada, depois deslumbrado) e a condição dura por 1 minuto.',
  'Master Monster Hunter':
    'Você tem um conhecimento quase enciclopédico de todas as criaturas do mundo. Você pode usar Natureza para Recordar Conhecimento e identificar qualquer criatura. Além disso, ganha os benefícios de Caçador de Monstros (e de Guardião contra Monstros, se tiver) tanto em um sucesso quanto em um sucesso crítico.',
  'Peerless Warden':
    'Sua maestria em magia primal deu acesso aos maiores segredos da magia de guardião. Você ganha uma magia de guardião à sua escolha entre as magias de guardião sem igual (ou outra a que tenha acesso).\n\n**Especial**: você pode escolher este feito várias vezes, escolhendo uma magia de guardião sem igual diferente a cada vez.',
  'Penetrating Shot':
    'Você atira atravessando uma criatura no caminho para acertar sua presa. Escolha um alvo que esteja dando cobertura menor à sua presa caçada. Faça um único Golpe à distância com a arma exigida contra o alvo escolhido e contra sua presa caçada. Esse ataque ignora qualquer cobertura menor que o alvo escolhido dê à presa. Role o dano uma única vez e aplique a cada criatura acertada. Disparo Penetrante conta como dois ataques para sua penalidade de ataque múltiplo.',
  "Warden's Step":
    'Você pode guiar seus aliados para se moverem em silêncio pelos ermos. Quando você Evita Ser Notado durante a exploração em terreno natural, pode designar quantos aliados quiser para receberem os benefícios como se estivessem usando essa atividade naquela exploração. Isso não exige ação da parte deles.',
  // Patrulheiro — nível 12
  'Distracting Shot':
    'A força bruta dos seus ataques, ou a quantidade avassaladora deles, deixa o inimigo desnorteado. Se você acertar criticamente sua presa caçada com uma arma à distância, ou acertá-la ao menos duas vezes no mesmo turno com uma arma à distância, ela fica desprevenida até o início do seu próximo turno.',
  'Double Prey':
    'Você pode se concentrar em dois inimigos ao mesmo tempo, caçando os dois. Ao usar a ação Caçar Presa, você pode escolher duas criaturas como presa.',
  'Obscured Emergence':
    'Você é, por natureza, uma criatura de bosques sombrios e ermos áridos, e quando decide se revelar um pouco dessa penumbra vem junto, obscurecendo sua forma com distorções estranhas ou névoa. Quando você deixa de estar escondido por ação sua (e não porque alguém o encontrou), você ganha ocultamento até o início do seu próximo turno, pois os olhos das pessoas têm dificuldade estranha de focar em você. Como de costume em ocultamento com manifestação visual óbvia, você não pode usá-lo para se Esconder.',
  'Second Sting':
    'Você lê os movimentos da presa e os transforma em brechas, de modo que falhas com uma arma preparam golpes de raspão com a outra. Faça um Golpe corpo a corpo com uma das armas exigidas contra sua presa caçada. O Golpe ganha o seguinte efeito de falha.\n\n**Falha**: você causa o dano que a outra arma exigida teria causado em um acerto, excluindo todos os dados de dano. (Isso remove os dados de runas de arma, magias e habilidades especiais, não só os dados de dano da arma.)',
  "Warden's Focus":
    'Sua ligação com o ambiente se aprofunda e se expande, permitindo atrair mais do poder primal da natureza ao se concentrar. Quando você Refoca, recupera todos os seus Pontos de Foco em vez de 1.',
  // Patrulheiro — nível 14
  'Shared Prey':
    'Caçando em dupla, você e seu aliado marcam a mesma presa. Quando usa Caçar Presa e escolhe apenas uma presa, você pode conceder a um aliado os benefícios de Caçar Presa e do seu gume do caçador, além de mantê-los para si. O aliado mantém esses benefícios até você usar Caçar Presa de novo.',
  "Warden's Guidance":
    'Você transmite a posição da presa aos seus aliados com palavras ou gestos cuidadosos. Enquanto sua presa caçada estiver observada por você, todos os seus aliados que rolarem falha ou falha crítica ao Procurá-la obtêm sucesso em vez disso. Seus aliados precisam conseguir ver ou ouvir você para ganhar esse benefício, e você precisa conseguir gritar ou fazer gestos visíveis.',
  // Patrulheiro — nível 16
  'Greater Distracting Shot':
    'Até um único projétil pode desequilibrar o inimigo, e ataques mais poderosos o deixam desnorteado por mais tempo. Se você acertar sua presa caçada com uma arma à distância, ela fica desprevenida até o início do seu próximo turno. Se acertá-la criticamente ou acertá-la duas vezes no mesmo turno com uma arma à distância, ela fica desprevenida até o fim do seu próximo turno.',
  'Improved Twin Riposte (Ranger)':
    'No início de cada turno seu, você ganha uma reação adicional que só pode ser usada para executar Ripostada Dupla. Você pode usar Ripostada Dupla mesmo sem estar se beneficiando de Aparo Duplo (embora precise empunhar duas armas corpo a corpo, uma em cada mão).',
  'Specialized Companion (Ranger)':
    'Seu companheiro animal continua crescendo em poder e habilidade, e agora é astuto o bastante para se especializar. Seu companheiro animal ganha uma especialização à sua escolha.\n\n**Especial**: você pode escolher este feito até três vezes. A cada vez, adicione uma especialização diferente ao seu companheiro.',
  // Patrulheiro — nível 18
  'Impossible Flurry':
    'Você abre mão da precisão para atacar em velocidade impossível. Faça três Golpes corpo a corpo com cada uma das armas exigidas. Seu primeiro ataque com cada arma sofre a penalidade de ataque múltiplo como se você já tivesse feito um ataque neste turno. Todos os Golpes restantes sofrem a penalidade de ataque múltiplo máxima.',
  'Perfect Shot':
    'Depois de observar os movimentos do combate com intensidade e precisão incríveis, você dispara contra sua presa no momento perfeito para causar o máximo de dor. Faça um Golpe à distância com a arma exigida contra sua presa caçada. Se acertar, o Golpe causa dano máximo. Depois do Golpe, seu turno termina.',
  'Shadow Hunter':
    'Você se mistura ao ambiente tão bem que os outros têm dificuldade de distingui-lo do terreno. Em terreno natural, você está sempre oculto para todos os inimigos, se quiser — exceto para sua presa caçada.',
  // Patrulheiro — nível 20
  'To the Ends of the Earth':
    'Sua capacidade de rastrear a presa ultrapassa qualquer explicação, permitindo traçar os movimentos dela e prever sua posição com facilidade. Quando você usa Caçar Presa em uma criatura a até 30 m, passa a acompanhar os movimentos dela, sabendo sua posição exata não importa a que distância ela vá, enquanto continuar sendo sua presa. Você precisa ser lendário em Natureza para rastrear a posição da presa através de teleporte ou viagem planar. Este feito ganha os traços detecção e primal se você for lendário em Natureza.',
  'Triple Threat':
    'Você pode dividir sua atenção em três ao caçar. Ao usar Caçar Presa, você pode designar três criaturas como presa, designar duas criaturas como presa e compartilhar o efeito com um aliado (como em Presa Compartilhada), ou designar uma criatura como presa e compartilhar o efeito com dois aliados.',
  // Monge — posturas e feitos de 1º (curadoria: o gerador traduziu “crane” como guindaste)
  'Crane Stance':
    'Seus braços tremulam como asas de garça. Você ganha +1 de bônus de circunstância à CA, mas os únicos Golpes que pode fazer são ataques de asa de garça. Causam 1d6 de concussão; grupo briga; traços ágil, acuidade, não letal e desarmado.\n\nNa Postura da Garça, reduza em 5 a CD de Salto em Altura e Salto em Distância. Ao Saltar, pode mover +1,5 m na horizontal ou +0,6 m na vertical.',
  'Dragon Stance':
    'Você entra na postura do dragão e golpeia com as pernas como a cauda de um dragão. Pode fazer ataques de cauda de dragão que causam 1d10 de concussão. Grupo briga; traços ímpeto, não letal e desarmado.\n\nNa Postura do Dragão, ignore a primeira quadrícula de terreno difícil ao Distanciar.',
  'Monastic Archer Stance':
    'Postura especializada em arco. Os únicos Golpes permitidos são com arco longo, arco curto ou arcos com o traço monge. Você pode usar Rajada de Golpes com esses arcos. Feitos e habilidades de monge que normalmente exigem ataques desarmados funcionam com esses arcos dentro da metade do primeiro incremento de alcance (em geral 15 m no arco longo e 9 m no curto), desde que não exijam um Golpe específico.\n\n**Especial**: ao escolher este feito, fica treinado em arco longo, arco curto e arcos simples/marciais com traço monge. Golpes Especialistas e Golpes Mestres também sobem a proficiência dessas armas.',
  'Monastic Weaponry':
    'Você treinou com as armas do mosteiro. Ganha acesso a armas incomuns com o traço monge e fica treinado em armas de monge simples e marciais. Quando a proficiência em ataques desarmados sobe para especialista ou mestre, a dessas armas sobe junto. Se tiver familiaridade com uma arma ágil ou de acuidade, ela também ganha o traço monge para você.\n\nPode usar armas de monge corpo a corpo com feitos e habilidades de monge que normalmente exigem ataques desarmados, salvo se exigirem um ataque específico (como Postura da Garça). Se ganhar especialização crítica em desarmados, também ganha com armas de monge.',
  'Mountain Stance':
    'Postura da montanha implacável (técnica de monges anões): golpes com peso de avalanche e bloqueio com as vestes. Os únicos Golpes são ataques desarmados de pedra caindo (1d8 concussão; grupo briga; traços vigoroso, não letal e desarmado).\n\nNa Postura da Montanha: +4 de bônus de item à CA e +2 de circunstância contra Reposicionar, Empurrar, Derrubar e movimento forçado. Limite de Destreza na CA +0 (não soma Des à CA) e todos os deslocamentos −1,5 m. O bônus de item acumula com runas de potência de armadura em roupa de explorador, armadura mística e faixas de força.',
  'Qi Spells':
    'Você cultivou o qi para produzir efeitos mágicos. Ganha _agitação interior_, _ímpeto de qi_ ou outra magia de qi de monge de 1º posto a que tenha acesso.\n\n**Especial**: pode escolher este feito mais de uma vez, cada vez uma magia diferente.',
  'Tiger Stance':
    'Você entra na postura do tigre e pode fazer ataques de garra de tigre (1d8 cortante; grupo briga; traços ágil, acuidade, não letal e desarmado). Em sucesso crítico com as garras, se causar dano, o alvo sofre 1d4 de sangramento persistente.\n\nSe seu Deslocamento for pelo menos 6 m na Postura do Tigre, você pode dar um Passo de 3 m.',
  'Wolf Stance':
    'Você entra na postura do lobo, baixo ao chão, mãos como presas. Pode fazer ataques desarmados de mandíbula de lobo (1d8 perfurante; grupo briga; traços ágil, traidor, acuidade, não letal e desarmado).\n\nSe estiver flanqueando o alvo na Postura do Lobo, as mandíbulas também ganham o traço derrubar.',
  'Stumbling Stance':
    'Postura aparentemente desfocada, como os movimentos de alguém embriagado. +1 de circunstância em Enganação para Fintar. Os únicos Golpes são balanços cambaleantes (1d8 concussão; grupo briga; traços ágil, traidor, acuidade, não letal e desarmado). Se um inimigo o acertar com Golpe corpo a corpo nesta postura, fica desprevenido contra o próximo balanço cambaleante que você fizer contra ele até o fim do seu próximo turno.',
  // Animista — feitos de 1º (prática e postura)
  'Apparition Sense':
    'Você vê e interage com o que os outros não veem. Ganha visão de aparição, um sentido impreciso que detecta espíritos, assombrações e mortos-vivos invisíveis ou escondidos a até 9 m.\n\nPode deixar um espírito ou morto-vivo que não fala usar sua voz, se estiver em contato direto. Em 10 minutos, pode ligar uma alma desencarnada ao corpo vivo que foi dela: precisa estar em contato com os dois o tempo todo. Não ressuscita mortos — só devolve a alma a um corpo ainda vivo. Se outro espírito ocupar o corpo, ele faz salvaguarda de Vontade contra sua CD de magia; em falha, é expulso quando o dono original volta.',
  "Channeler's Stance":
    'Você entra numa postura que deixa o poder fluir. Enquanto nela, ao conjurar ou Sustentar magia de aparição ou de vaso que cause dano de energia, ganha bônus de status no dano igual ao posto da magia.\n\nCada vez que Conjurar uma Magia com os traços vitalidade ou vazio que restaure PV nesta postura, os alvos ganham bônus de status na cura inicial igual ao posto. Não se aplica a cura ao longo do tempo (cura rápida, regeneração).',
  'Circle of Spirits':
    'Com um pensamento, palavra ou gesto, você alcança outro espírito. Escolha outra aparição entre as que sintonizou; ela vira a primária, no lugar da atual.\n\n**Especial**: os Pontos de Foco da reserva são iguais ao número de magias de foco que você tem ou ao de aparições sintonizadas, o que for maior (máx. 3).',
  'Relinquish Control':
    'Sua aparição assume e protege você de influência externa. Até o início do seu próximo turno, +4 de status em salvaguardas contra magias e efeitos que dão a condição controlado ou tentam influenciar suas ações (como _encantar_, _comando_ ou a melodia de um nosoi). As únicas ações permitidas: Recordar Conhecimento, Passo, Golpe, Conjurar magia de aparição, Conjurar magia de vaso, Sustentar magia de vaso ou usar ação com o traço aparição. +2 de circunstância em Recordar Conhecimento com Lores das aparições sintonizadas.\n\n**Especial**: exige vínculo forte com uma aparição específica. Escolha uma a que tenha acesso; depois de aprender o feito, ela deve ser uma das sintonizadas todo dia.',
  'Spirit Familiar (Animist)':
    'Ao sintonizar as aparições nas preparações, pode gastar um pouco da força vital para uma delas se manifestar como familiar (traço espírito). Se o familiar morrer ou for destruído, você perde os outros benefícios daquela aparição até manifestá-lo de novo nas próximas preparações. Se dispersar a aparição manifestada como familiar, o familiar é destruído.',
  'Stifle Flames':
    'Sua experiência florestal ensinou técnicas para combater incêndios. Sempre que tentar um teste de perícia para apagar um fogo não mágico, você recebe +2 de bônus de circunstância. A CD dos testes planos para encerrar dano persistente de fogo cai de 15 para 10, ou de 10 para 5 se receber ajuda especialmente adequada.',
  "Performer's Treatment":
    'Com sua experiência de palco, você consegue manter um conjunto de ferramentas de curandeiro à mão o tempo todo. Pode vestir o kit como parte de qualquer traje ou disfarce. Criaturas só notam o kit se usarem Procurar e tiverem sucesso num teste de Percepção contra sua CD de Performance.\n\nAlém disso, no último instante você percebe quando deve só fingir para não causar dano duradouro. Quando obtém uma falha crítica em Medicina para Administrar Primeiros Socorros, Tratar Doença, Tratar Veneno ou Tratar Ferimentos, pode tentar um teste de Performance contra a CD de Percepção do paciente. Em um sucesso, a falha crítica vira falha.',
  'Inflame Crowd':
    'Suas performances são um chamado à ação para quem as ouve. Durante 1 hora após ter sucesso em Causar Boa Impressão usando Performance, você pode Fazer um Pedido a um membro da plateia afetada usando Performance no lugar de Diplomacia.',
  'Talent Envy':
    'Cada performance irradia um brilho deslumbrante, despertando inveja e inadequação em quem compara o próprio talento ao seu. 1 vez por minuto, ao ter sucesso num teste do tipo de Performance escolhido em Performer Virtuoso, você pode Desmoralizar um espectador a até 18 m como ação livre. Se o teste de Performance foi um sucesso crítico, melhore o grau de sucesso do Desmoralizar em um passo.',
  'Vanish into The Land':
    'Você usa os acidentes naturais do terreno para se esconder. No terreno difícil escolhido em Espreitador do Terreno, pode Esconder-se e Furtar-se mesmo sem cobertura ou estar oculto.',
  'Cheaters Always Prosper':
    'Você não é campeão da justiça e luta sujo se isso ajudar a sobreviver. Pode tentar um teste de Truque Sujo com a arma corpo a corpo mesmo sem mão livre. Se falhar criticamente nesse teste usando uma arma, pode largá-la para tratar o resultado como falha em vez de falha crítica.',
  'Cannonball Fall':
    'Você cai de propósito sobre um inimigo a até 3 m na horizontal, de uma altura de até 1,5 m × seu nível. Você sofre o dano de queda normalmente; o inimigo faz salvaguarda de Reflexos contra sua CD de classe (em vez das regras usuais de cair sobre alguém). Se alguma habilidade reduzir o dano que você sofreria, o dano do inimigo usa o valor antes dessa redução. Se controlar a descida (corda, parede adjacente etc.), você não cai ao chão mesmo sofrendo dano.\n\n**Sucesso crítico**: o inimigo não sofre dano. **Sucesso**: dano de concussão igual a 1/4 do dano de queda. **Falha**: metade do dano e o alvo cai. **Falha crítica**: o mesmo dano que você sofreu, o alvo cai e fica atordoado 1.',
  'Rock the Boat':
    'Ao cair, você agarra um inimigo com mãos ou pernas e o puxa junto. Tente um teste de Atletismo contra a CD de Reflexos da criatura desencadeante. Em sucesso, ela cai com você (ainda pode tentar Agarrar a Borda) ou também fica caída.',
  'Halyard Strike':
    'Você luta com confiança pendurado numa linha. Segura uma corda próxima, arremessa uma da mão ou dispara uma arma de gancho numa superfície sólida e então balança até o dobro da Velocidade. Pode fazer um Golpe com arma de uma mão ou ataque desarmado em qualquer ponto desse movimento. Em falha crítica no Golpe, o movimento termina ali.\n\n**Especial**: se tiver Dedicação de Pirata e neste movimento tiver embarcado ou desembarcado de um barco (ou veículo semelhante), o Golpe causa +1 dado de dano da arma.',
  'Think Twice':
    'Você ameaça de súbito a criatura prestes a atacá-lo, fazendo-a hesitar. +4 de bônus de circunstância à CA contra o ataque desencadeante. A mesma criatura não pode disparar esta reação de novo por 1 dia.\n\n**Especial**: se tiver Olhar Intimidante, pode perder o traço auditivo e ganhar o visual.',
  'Fog Cloak':
    'Quando está oculto por névoa ou neblina, fica escondido até uma criatura ter sucesso em Procurar para encontrá-lo.',
  'Sawtooth Grapple':
    'Com dois sabres serra-dente, você prende o inimigo. Faça um Golpe com cada arma contra a mesma criatura. Se causar dano de Ataque Furtivo, pode imediatamente tentar Agarrar, mesmo sem mão livre. Se ambos os Golpes causaram dano, a penalidade de ataque múltiplo não se aplica à tentativa de Agarrar.\n\n**Especial**: você empunha duas armas, pelo menos uma delas um sabre serra-dente.',
  'Heartless Debilitations':
    'Você debilita com eficiência impiedosa. Adicione estas opções ao Golpe Debilitante: o alvo ganha fraqueza 5 a sangramento e veneno; ou o alvo fica assustado 1.',
  'Cutthroat Grapple':
    'Você pune quem tenta escapar das suas lâminas. Faça um Golpe corpo a corpo contra a criatura desencadeante. Em acerto, ela sofre −4 de circunstância na tentativa de Escapar e 1d6 de dano de sangramento.',
  'Sanguine Evasion':
    'Você evita a morte virando um jato de névoa vermelha. Permanece com 1 PV e assume forma vaporosa (efeitos de _forma vaporosa_), com Deslocamento de Voo igual ao terrestre, e pode ocupar o mesmo espaço de outra criatura. Criaturas nesse espaço ficam ocultas. Pode Dispensar a forma: volta ao normal com 1 PV e ferido 1. Se não dispensar em 1 minuto, volta com 0 PV e morrendo 1.',
  'Swan Dive':
    'Você salta ou cai de propósito na água, sem sofrer dano de queda, e então Nada até sua Velocidade. Até o fim do turno, sucesso em Atletismo para Nadar vira sucesso crítico, e falha crítica vira falha.',
  'Fight or Flight':
    'Você usa o adrenalina do medo. Pode fazer um Golpe corpo a corpo contra a criatura que lhe deu assustado, se estiver no alcance, ou Distanciar até sua Velocidade para longe do efeito ou criatura que causou a condição.',
  'Personalized Poisoning':
    'Ao estudar um local onde a criatura passa muito tempo (quarto, escritório), você descobre condições, reações ou sensibilidades que a deixam suscetível a venenos. Ao fabricar um veneno alquímico, pode adaptá-lo a essa criatura: ela sofre −2 de circunstância em Fortitude contra o veneno; outras criaturas ganham +2 de circunstância.',
  'Deadly Casework':
    'Você trata um assassinato planejado como qualquer investigação. Pode Perseguir uma Pista e abrir uma investigação sobre o alvo a assassinar. Essa investigação não conta no limite de investigações ativas, mas você só pode ter uma de assassinato. O bônus de Estratagema de Perícia aumenta em 1 ao investigar detalhes desse alvo.',
  'Forensic Countermeasures':
    'Em 1 minuto, você adultera um único local (como um cômodo pequeno) para obscurecer evidências ou plantar pistas enganosas (você escolhe o que elas sugerem). Uma criatura vê através das contramedidas com Recordar Conhecimento bem-sucedido contra sua CD de Enganação, e só se procurar ativamente por adulteração.',
  'Deduce Habits':
    'Ao usar Traçar o Futuro, pode contemplar uma pessoa que observou a até 9 m por pelo menos 1 minuto. Você deduz lugares onde ela estará por hábito na próxima semana e em que horário. Para cada local, deduz a chance de dois entre: sozinha, desarmada ou desatenta. Também ganha um conselho por local sobre como tornar esses estados mais ou menos prováveis. O mestre determina os locais, horários e chances.',
  'Bullet and a Broadside':
    'Você combina arma de cerco e arma de fogo. Se gastou uma ação: Dispara a arma de cerco e faz um Golpe com a arma de fogo ou besta, em qualquer ordem, com a mesma penalidade de ataque múltiplo. Se gastou duas ações: Carrega a arma de cerco e Interage para recarregar a arma de fogo ou besta, em qualquer ordem, sem precisar de mão livre.',
  'Seize an Advantage':
    'Você aproveita a vantagem do Truque Sujo. Faça um Golpe à distância ou Interaja para Recarregar; isso não dispara reações do oponente exigido. Se teve sucesso ou sucesso crítico no Truque Sujo, Golpes à distância e Interagir para Recarregar não disparam reações desse oponente enquanto ele permanecer desajeitado por causa do Truque Sujo.',
  'Elemental Defense':
    'Se a próxima ação for Conjurar uma Magia com pelo menos um traço elemental (ar, terra, fogo, metal, água ou madeira), você ganha resistência a efeitos com os traços elementais dessa magia igual ao dobro do posto. A resistência dura até o início do seu próximo turno.',
  'Incriminating Spell':
    'Se a próxima ação for Conjurar uma Magia com o traço mental, escolha uma criatura a até 18 m que o alvo possa perceber. Se o alvo tiver sucesso na salvaguarda, achará que aquela criatura (e não você) tentou alterar sua mente. Testes de Sentir Motivação contra você ou o incriminado usam sua CD de magia. Se o incriminado for claramente incapaz de magia, o alvo ganha +2 de circunstância em Percepção para Sentir Motivação.',
  'Shrink Spell':
    'Ao usar Dissipar Magia contra uma magia de área explosão, cone ou linha sem duração, se falhar em dissipá-la, reduz a área: −1,5 m no raio de explosão ou emanação, ou −3 m no comprimento de cone ou linha.',
  'Knockback Spell':
    'Se a próxima ação for Conjurar uma Magia de área explosão, cone, emanação ou linha, sem duração, que peça Reflexos ou Fortitude, cada criatura que falhou é empurrada 1,5 m (3 m em falha crítica), além dos outros efeitos. Cone, emanação ou linha: para longe de você. Explosão: para longe do centro.',
  'Spellbinding Speech':
    'Escolha uma criatura a até 9 m que possa ouvi-lo e entendê-lo e tente um teste de Arcana contra a CD de Vontade. Em sucesso, ela não pode usar reações até o início do seu próximo turno. Independentemente do resultado, fica temporariamente imune à Fala Hipnotizante por 24 horas.',
  'Shared Focus':
    'Escolha um aliado disposto a até 9 m que também tenha reserva de foco. O alvo ganha 1 Ponto de Foco temporário até o início do seu próximo turno (perdido mesmo se não gasto). Esse ponto é separado da reserva, então pode tê-lo mesmo no máximo. Depois fica temporariamente imune a Foco Compartilhado até as próximas preparações diárias.',
  'Spatial Awareness':
    'Você ganha +1 de bônus de circunstância ao tentar dissipar um efeito de teleporte. Quando um efeito de teleporte ocorre a até 18 m, você detecta o local como sentido preciso. Se uma criatura se teleporta dali, você sabe a direção geral, mas não a distância. Pode Identificar Magia até 1 hora depois: em sucesso, sabe o destino a até 16 km; em sucesso crítico, a até 1,6 km.',
  'Redirect Teleportation':
    'Gaste uma magia preparada com o traço teleporte (perde o espaço como se tivesse conjurado a magia desencadeante) e tente dissipá-la. O posto de dissipar é o da magia gasta. Em sucesso, você não interrompe a magia: escolhe um espaço desocupado a até 18 m para a criatura aparecer. Não pode ser um espaço obviamente nocivo (muralha de fogo, terreno perigoso) nem que faça o alvo cair.',
  'Dizzying Spell':
    'Se a próxima ação for Conjurar uma Magia que peça salvaguarda de Vontade e tenha um único alvo, o alvo fica estupefato 2 por 1 rodada se falhar (estupefato 3 em falha crítica).',
  'Flood Stance':
    'Nesta postura, você prende a respiração por até 10 minutos e sai da postura se parar de prendê-la. Não perde ar extra ao atacar, sofrer acerto crítico ou falhar criticamente numa salvaguarda. Ainda perde todo o ar se falar, inclusive para Conjurar uma Magia. Os únicos Golpes permitidos são ataques desarmados de rio transbordado (1d8 concussão; grupo briga; traços não letal, derrubar, desarmado e água; sem a penalidade usual de lutar debaixo d’água). Debaixo d’água, também ganham o traço vigoroso.',
  'Student of Water':
    'Se estiver debaixo d’água, você tem cobertura contra criaturas fora da água. Assim que cumprir os pré-requisitos, ganha os feitos Saqueador Subaquático e Corrida na Água.',
  'Waterfowl Stance':
    'Nesta postura, dandpatta, cimitarra, talwar e zulfikar ganham o traço monge para você. Ao Passar Através do espaço de uma criatura ou Saltar sobre ela empunhando uma dessas armas, causa 1d6 de dano cortante (2d6 com runa de golpe maior, 3d6 com golpe máximo).\n\n**Especial**: você ganha acesso a dandpatta, talwar e zulfikar.',
  'Divert Streamflow':
    'Tente um teste de Atletismo para Reposicionar a criatura que causou o dano desencadeante. Em sucesso, pode dar um Passo como ação livre.',
  'Tributary Circulation':
    'Você ganha +2 de bônus de circunstância em salvaguardas de Vontade e contra veneno até o início do seu próximo turno. Se gastou duas ações, também pode tentar um teste plano para encerrar dano persistente de veneno, reduzindo a CD para 10 (como recuperação assistida).',
  "Culvert's Collapse":
    'Faça um Golpe de rio transbordado contra o inimigo que lhe causou dano desde o seu turno anterior. Esse Golpe causa +1d8 de sangramento persistente.',
  "Snakebird's Shadow":
    'Faça um Golpe corpo a corpo com a arma exigida contra cada inimigo numa linha de 4,5 m, enquanto sombras de água cortantes saem da lâmina. Cada ataque conta para a penalidade de ataque múltiplo, mas você só a aumenta depois de todos os ataques.',
  'Wake to Strife':
    'A criatura exigida faz salvaguarda de Fortitude contra sua CD de classe; se estiver caída, pode Levantar-se como ação livre.\n\n**Sucesso crítico**: sem efeito. **Sucesso**: enjoado 1. **Falha**: enjoado 2; se tiver mão livre e o alvo não for maior que você, pode tentar Agarrar como ação livre. **Falha crítica**: como falha, mas sucesso no Agarrar vira sucesso crítico.',
  'Lessons of Flux':
    'Você rerrola o teste e fica com o segundo resultado. Se ainda falhar ou falhar criticamente, pode fazer uma pergunta sobre a criatura que tentava Agarrar, Reposicionar, Empurrar, Derrubar ou Passar Através, como se tivesse sucesso em Recordar Conhecimento.',
  'Wave Dashes Rocks':
    'Faça um Golpe corpo a corpo contra a criatura exigida; depois ela deixa de estar agarrada ou imobilizada por você. O Golpe deve ser desarmado ou com arma de monge. Se causar dano, o alvo cai e fica desajeitado 1 e enfraquecido 1 até o fim do próximo turno dele.',
  'Convergent Tides':
    'Enquanto estiver na postura Cascata Arcana, você ignora terreno difícil causado por água (caminho alagado, natação em água agitada etc.).',
  'Shattering Spellstrike':
    'Faça um Golpe Mágico com a arma improvisada. Se acertar, causa +2d6 de dano de força e a arma quebra. Se a magia não for truque nem magia de foco, some o posto da magia a esse dano extra. Se a Dureza for maior que seu nível, ou se for artefato, item amaldiçoado ou difícil de quebrar, a arma não quebra e você não causa o dano extra.',
  'Surface Tension':
    'A condição quebrada da arma fica temporariamente suprimida. A arma causa dano de concussão extra igual ao dobro do número de dados de dano (esse tipo não muda) e ganha o traço mortal d8 (se já tinha mortal, o dado sobe um passo ou para d8, o que for maior). Na primeira vez que usar a arma num Golpe Mágico ou obtiver sucesso crítico num ataque com ela, a arma é destruída. Dureza maior que o nível, artefato, item amaldiçoado ou difícil de destruir: não é destruída, e o efeito dura só até o fim do seu turno.',
  'Crosscurrent Counter':
    'Tente um teste de Atletismo para Agarrar a criatura desencadeante, mesmo fora do alcance ou sem mão livre. Em sucesso, também remove a condição desencadeante, e o tendril de água puxa a criatura para adjacente a você antes de dissipar.',
  "Whirlpool's Pull":
    'Interaja para pegar um objeto sem dono a até 4,5 m que possa usar como arma improvisada e então Conjure uma Magia que seja truque ou magia de confluxo de 1 ação.',
  'Maelstrom Flow':
    'A arma improvisada ganha o efeito da runa _astral_, _corrosiva_, _extensora_ ou _gelo_ por 1 minuto; depois o item é destruído. Dureza maior que o nível, artefato, item amaldiçoado ou difícil de destruir: não é destruído, e o efeito dura só até o fim do seu turno. Não conta no limite de runas de propriedade da potência, mas cada arma só pode ter uma aplicação de Fluxo do Maelstrom por vez.',
  'Arms that Cut the Waves':
    'Rio, lago, mar ou oceano: a água chama e você não teme as profundezas. Ao tentar Atletismo para Nadar, pode gastar 1 Ponto Mítico para rolar com proficiência mítica. Quando acabaria o ar e começaria a sufocar, pode gastar 1 Ponto Mítico para prender a respiração por mais 10 rodadas.',
  'Binds that Tie':
    'Você se destaca ao ajudar a capturar inimigos. Ao tentar Agarrar um oponente já agarrado por um aliado, pode gastar 1 Ponto Mítico para rolar com proficiência mítica. Em sucesso, causa dano de concussão extra igual ao dobro do modificador de Força.',
  'Ears that Hear the Truth':
    'Você nunca perde o tremor que denuncia uma mentira. Ao Sentir Motivação, ou ao rolar Percepção para iniciativa, pode gastar 1 Ponto Mítico para rolar com proficiência mítica.',
  'Feet that Stride the Sky':
    'Quando você ou a criatura que monta tenta Salto em Altura ou em Distância, pode gastar 1 Ponto Mítico para rolar com proficiência mítica; use as CDs de Salto em Distância e o máximo de distância vira o dobro da Velocidade.',
  'Hands that Unweave Disaster':
    'Ao tentar Acrobacia para Agarrar a Borda, pode gastar 1 Ponto Mítico para rolar com proficiência mítica. Também pode gastar 1 Ponto Mítico ao Desarmar Dispositivo para rolar com proficiência mítica (isso permite tentar mesmo se a ação exigir perito ou melhor).',
  'Storied Companion':
    'Gaste 1 Ponto Mítico; o companheiro rerrola a salvaguarda desencadeante com proficiência mítica e ganha PV temporários iguais ao dobro do seu nível por 1 minuto.',
  "We've Met Before":
    '**Requisito** você conversou mutuamente com a criatura por pelo menos 1 minuto.\n\nGaste 1 Ponto Mítico para ganhar um Conhecimento específico daquela criatura por 24 horas, com proficiência mítica. Use-o para Recordar Conhecimento sobre ela, Decifrar Escritos dela, Ganhar Renda ou Subsistir em áreas que ela governa, ou outras tarefas adequadas (o MJ decide).',
  'Become Shadow':
    'Ao tentar Esconder-se ou Furtar-se, ou ao rolar Furtividade para iniciativa, pode gastar 1 Ponto Mítico para ficar oculto e rolar com proficiência mítica.',
  'Cutting Rebuke':
    'Você ganha o feito de perícia Gracejo. Pode gastar 1 Ponto Mítico ao rolar Diplomacia dessa ação para usar proficiência mítica. Em sucesso, também causa dano mental igual ao seu nível (dobro em sucesso crítico).',
  Godspeed:
    'Gaste 1 Ponto Mítico; pelo próximo minuto, +3 m de bônus de status a todos os Deslocamentos e você fica acelerado. A ação extra de cada rodada só pode ser Distanciar, Passo ou Saltar.',
  Prescience:
    'Gaste 1 Ponto Mítico e role iniciativa com proficiência mítica. Até o fim do seu primeiro turno, +1 de status à CA e a todas as salvaguardas.',
  'Read The Wind':
    'Sempre que tiver sucesso em Rastrear com proficiência mítica, pode imediatamente Recordar Conhecimento sobre a criatura rastreada, também com proficiência mítica e a perícia que o MJ indicar.',
  'Unbelievably Believable':
    'Ao tentar Obter Informações, Causar Boa Impressão, Fazer um Pedido ou Mentir, pode gastar 1 Ponto Mítico para rolar com proficiência mítica.',
  'Unending Subsistence':
    'Ao tentar Sociedade ou Sobrevivência para Subsistir, pode gastar 1 Ponto Mítico para rolar com proficiência mítica. O sucesso sempre alimenta e abriga você e até uma dúzia de criaturas. Em sucesso crítico, todas ganham +2 de circunstância em Fortitude por 24 horas.',
  'Correct The Story':
    'Gaste 1 Ponto Mítico. O inimigo rerrola o ataque ou salvaguarda desencadeante e fica com o novo resultado.',
  'Divert Destiny':
    'Gaste 1 Ponto Mítico e sobrevive ao ataque ou efeito desencadeante: perde ferido e morrendo, o condenado não sobe, e você fica consciente e de pé com PV iguais a 10 + seu nível.',
  'Fling Into action':
    'Ao tentar salvaguarda de Reflexos, pode gastar 1 Ponto Mítico para rolar com proficiência mítica. Em sucesso, arremessa-se até 9 m na direção que escolher (18 m em sucesso crítico). Pode ir em linha reta horizontal ou vertical, ou 1,5 m na horizontal para cada 3 m na vertical.',
  'Fling Into Action':
    'Ao tentar salvaguarda de Reflexos, pode gastar 1 Ponto Mítico para rolar com proficiência mítica. Em sucesso, arremessa-se até 9 m na direção que escolher (18 m em sucesso crítico). Pode ir em linha reta horizontal ou vertical, ou 1,5 m na horizontal para cada 3 m na vertical.',
  'Mythic Counterspell':
    'Gaste 1 Ponto Mítico e gaste uma magia preparada ou um espaço não usado de posto igual ou maior que a magia desencadeante (perde o espaço como se tivesse conjurado). Então tenta dissipá-la usando proficiência mítica no bônus de conjuração do teste.',
  'Repel Assault':
    'Gaste 1 Ponto Mítico; ganha resistência ao ataque desencadeante igual ao seu nível. Se Golpear o inimigo que atacou até o fim do seu próximo turno, esse Golpe usa proficiência mítica (só o primeiro contra aquele inimigo).',
  'Unrivaled Retort':
    'Gaste 1 Ponto Mítico e tente a salvaguarda desencadeante com proficiência mítica. Em sucesso, pode imediatamente recarregar e fazer um Golpe à distância contra a origem do efeito.',
  'Arc of Destruction':
    'Gaste 1 Ponto Mítico; +4 de status à CA contra o Golpe desencadeante. Se o Golpe falhar, você pega a arma ou munição no ar e a relança no inimigo com proficiência mítica. Arma arremessada: aplica runas e efeitos dela. Munição de uma arma que você empunha: aplica as runas da sua arma.',
  'Mythic Allies':
    'Gaste 1 Ponto Mítico; a criatura conjurada ganha +2 de status nos ataques, +2 de status em todas as defesas e PV extras iguais ao seu nível até o fim da invocação. O próximo Golpe dela após esta habilidade ganha +4 de circunstância no ataque.',
  'Mythic Magic':
    'Ao ganhar este feito, escolha até 3 magias de 1º ou 2º posto que levem no máximo 3 ações e sejam instantâneas ou durem 10 minutos ou menos. Gaste 1 Ponto Mítico para conjurar qualquer uma delas pelo custo normal, com proficiência mítica, elevadas à metade do seu nível (arredondado para cima). Sem conjuração de classe, use Carisma; senão, o atributo da sua classe. Você só ganha Conjurar uma Magia para magias deste feito.\n\n**Especial**: no 14º, some uma magia de 3º. No 20º, uma de 4º.',
  'Mythic Refocus':
    'Gaste 1 Ponto Mítico; recupera imediatamente todos os Pontos de Foco, enchendo a reserva até o máximo atual.',
  'Steal Magic':
    'Quando dissipar com sucesso uma magia inimiga com Contramedida Mítica, pode aprendê-la se estiver na lista da sua tradição. Grimório: a magia é inscrita na hora (páginas em branco se preciso). Repertório: pode retreinar na hora qualquer magia do repertório para a dissipada; se a substituída vinha de recurso de classe, volta ao normal nas próximas preparações.',
  'Summon Mythic Power':
    'Você recupera 1 Ponto Mítico.',
  'Unbelievable Interception':
    'Gaste 1 Ponto Mítico; Distanciar duas vezes em linha reta até o inimigo desencadeante. Se terminar no alcance ou alcance de ameaça do ataque, você vira o alvo do Golpe (mesma rolagem, compare com a sua CA). Se o ataque falhar e o inimigo estiver no seu alcance, pode imediatamente fazer um Golpe corpo a corpo com proficiência mítica.',
  'Become Destiny':
    'Gaste 1 Ponto Mítico e remova uma condição que o aflige, encerre os efeitos contínuos de uma magia que o afeta, ou liberte-se de uma armadilha ou perigo. Ao se libertar de um perigo, move-se imediatamente ao espaço seguro adjacente mais próximo.',
  "Call from Death's Door":
    'Gaste 1 Ponto Mítico; o aliado desencadeante perde morrendo, o ferido não aumenta, e ele cura PV iguais ao dobro do seu nível.',
  'Eyes that See Eternity':
    'Gaste 1 Ponto Mítico; pelo próximo minuto, ganha os efeitos de _visão verdadeira_ e rola todos os testes de Percepção com proficiência mítica.',
  'Mythic Casting':
    'Gaste 1 Ponto Mítico; se a próxima ação for Conjurar uma Magia, use proficiência mítica nos ataques de magia e na CD dessa magia.',
  'Mythic Containment':
    'Gaste 1 Ponto Mítico e tente Enganação, Diplomacia ou Intimidação com proficiência mítica contra a CD de Vontade de uma criatura a até 9 m para fazê-la entrar num recipiente (saco, caixa etc.). O recipiente cabe qualquer tamanho. Em sucesso, a criatura entra: fica agarrada, lentificada 1 e precisa prender a respiração ou sufoca. Pode Escapar (CD da perícia usada, com proficiência mítica). Liberta-se sozinha após 1 minuto; você pode gastar +1 Ponto Mítico como ação livre para prolongar 1 minuto quando for expirar.',
  'Mythic Strike':
    'Gaste 1 Ponto Mítico e faça um Golpe com uma arma empunhada ou ataque desarmado. O Golpe usa proficiência mítica, e a arma ou ataque conta como arma mítica para superar resistência ou imunidade míticas.',
  'Unbreaking Castle':
    '**Requisito** você empunha um escudo ou uma arma com o traço aparar.\n\nGaste 1 Ponto Mítico e Erga um Escudo ou posicione a arma para aparar. Pelo próximo minuto, sempre que fizer isso (incluindo agora), aliados que você possa ver ganham o bônus de circunstância de CA do escudo ou da arma. Com o escudo erguido ou a arma posicionada, inimigos tratam os quadrados no seu alcance como terreno difícil. Após Bloquear com Escudo, pode Golpear com uma pancada de escudo ou arma acoplada contra um inimigo adjacente, com proficiência mítica.\n\nA primeira vez por rodada que um inimigo errar um Golpe corpo a corpo contra você com a arma posicionada para aparar, você pode Golpeá-lo com essa arma com proficiência mítica como reação.',
  'Covet Hoard':
    'Você tem o desejo dracônico por tesouro. Ganha o feito de perícia Carregador Robusto, mesmo sem cumprir os pré-requisitos. Também ganha +2 de bônus de circunstância à CD de Percepção contra tentativas de Furtar de você e a qualquer salvaguarda contra um efeito que vise um item que você esteja segurando ou carregando.\n\nNo 11º nível, ganha o feito geral Investidura Incrível, mesmo sem cumprir os pré-requisitos.',
  'Dragonet Breath':
    'Você desenvolveu seu sopro mágico. Expulsa o sopro de dragonete associado à sua herança. Sopro de Dragonete ganha os traços listados entre parênteses, e a CD é a maior entre sua CD de classe e sua CD de magia. Depois de usar Sopro de Dragonete, não pode usá-lo novamente por 1d4 rodadas.\n\n**Dragonete Feérico** (arcano, veneno) Você sopra um cone de 4,5 m de gás eufórico. Cada criatura na área deve obter sucesso em uma salvaguarda de Fortitude ou fica estupefato 1 por 1 rodada.\n\n**Draco-Homing** (ácido) Você expulsa uma linha de 9 m de saliva cáustica que causa 1d4 de dano ácido, com salvaguarda básica de Reflexos. No 3º nível e a cada 2 níveis seguintes, o dano aumenta em 1d4.\n\n**Draco Doméstico** (arcano, mental) Você sopra uma nuvem de névoa prateada num cone de 4,5 m que causa 1d4 de dano mental, com salvaguarda básica de Vontade. A névoa conta como prata para fraquezas. No 3º nível e a cada 2 níveis seguintes, o dano aumenta em 1d4.\n\n**Dragonete-Pérola** (arcano, maldição) Você sopra um cone de 4,5 m de névoa dourada que altera a sorte das criaturas atingidas. Cada vez que usa Sopro de Dragonete, decida se concede boa ou má sorte. Qualquer criatura afetada fica temporariamente imune por 1 hora.\n\nSe o sopro concede boa sorte, cada criatura na área ganha +1 de bônus de status na próxima rolagem de ataque ou teste de perícia antes do início do seu próximo turno.\n\nSe o sopro concede má sorte, cada criatura na área deve tentar uma salvaguarda de Vontade. Quem falhar sofre −1 de penalidade de status na próxima rolagem de ataque ou teste de perícia antes do início do seu próximo turno. Em falha crítica, a criatura deve rolar duas vezes e ficar com o pior resultado; este é um efeito de infortúnio.\n\n**Dragonete de Poça** (fogo) Você sopra uma linha de 4,5 m de gás superaquecido que causa 1d4 de dano de fogo, com salvaguarda básica de Reflexos. No 3º nível e a cada 2 níveis seguintes, o dano aumenta em 1d4. Pode usar o sopro debaixo d’água mesmo com o traço fogo. Se o fizer, o sopro ganha o traço água e emerge como um cone de 6 m de água fervente.',
  'Dragonet Resistances':
    'Você pode ser um dragão pequeno, mas ainda é um dragão — é difícil contê-lo. Ganha +2 de bônus de circunstância em salvaguardas contra efeitos de sono e efeitos que o deixariam paralisado.',
  'Mighty Dragonet':
    'Você cresceu especialmente grande e agora se impõe sobre os outros dragonetes. Em vez de Minúsculo, seu tamanho é Pequeno.\n\n**Especial** Embora possa crescer depois do 1º nível, você não pode abandonar este feito por retreinamento.',
  'My Claws are Daggers':
    'Suas garras são tão afiadas quanto os dentes. Você ganha um ataque desarmado de garra que causa 1d6 de dano cortante. As garras estão no grupo faca e têm os traços ágil, finura e desarmado.\n\nNo 5º nível, sempre que obtiver um acerto crítico com as garras ou as mandíbulas, aplica o efeito de especialização crítica.\n\n**Especial** Se sua herança de dragonete for Draco Doméstico, as garras contam como prata.',
  'Scales of Steel':
    'Suas escamas são duras como armadura e garantem alguma proteção no mundo perigoso. Quando está sem armadura, as escamas concedem +1 de bônus de item à CA, com teto de Destreza +3. O bônus de item sobe para +2 no 5º nível. Esse bônus de item à CA se acumula com runas de _potência de armadura_ na roupa de explorador, com a magia _armadura mística_ ou com _faixas de força_.',
  'Take Wing':
    'Você fortaleceu as asas e agora pode voar por distâncias curtas. Você Voa. Se normalmente não tiver Deslocamento de voo, ganha Deslocamento de voo de 4,5 m para este movimento. Se não estiver em chão sólido no fim deste movimento, você cai.',
  'Ascended Dragonet Heritage':
    'Você despertou o poder da sua herança dracônica. Ganha todos os benefícios mecânicos da herança de dragonete escolhida no 1º nível, o que permite selecionar feitos e obter benefícios que exigem uma herança de dragonete específica.',
  'Inhale, Exhale!':
    'Você puxa um fôlego especialmente fundo antes de soltar o sopro de dragonete nos inimigos. Se a próxima ação for usar Sopro de Dragonete, some 1,5 m ao comprimento do cone ou da linha. Se o sopro causar dano, também causa um dado extra de dano.',
  'Jealous Grip':
    'Você protege seu tesouro, e ai de quem tentar levar o que é seu. Faça um Golpe corpo a corpo contra a criatura desencadeante. Se o ataque for um acerto crítico e a ação desencadeante tinha o traço manipular, você interrompe essa ação. Este Golpe não conta para a penalidade de ataques múltiplos, e a penalidade de ataques múltiplos não se aplica a este Golpe.',
  'Zip! Zoom!':
    'Você consegue voar por distâncias maiores antes de precisar pousar. O Deslocamento de voo que ganha de Abrir Asas aumenta para 7,5 m.',
  'Bond Companion':
    'Você forma um vínculo próximo com um companheiro, semelhante ao de mestre e familiar, e pode presentear essa criatura com um toque da sua magia inata. Durante as preparações diárias, pode passar tempo com outro personagem jogador para torná-lo seu companheiro designado naquele dia. Esse jogador precisa ter uma reserva de Pontos de Foco. Você ganha a atividade Fortalecer Foco.\n\n**Fortalecer Foco** (concentrar) **Requisitos** você está tocando o companheiro designado, e a reserva de foco dele não está cheia; **Efeito** o companheiro recupera 1 Ponto de Foco.',
  'Ferocious Will':
    'Você dispara um estouro de retorno mágico na fonte do efeito, causando 5d6 de dano mental com salvaguarda básica de Vontade contra a maior entre sua CD de classe e sua CD de magia. Se o alvo falhar criticamente, também fica lentificado 1 por 1 rodada. No 11º nível e a cada 2 níveis seguintes, o dano aumenta em 1d6.',
  'Into the Sky':
    'Você voa tão naturalmente quanto qualquer dragonete. Tem Deslocamento de voo de 7,5 m o tempo todo.',
  'Form a Flock':
    'Você chama dragonetes selvagens próximos para enxamear ao seu lado. O bando concede 25 PV temporários que duram até 1 minuto. O bando se dispersa e o efeito termina quando os PV temporários acabam, o minuto passa ou você dispensa Formar um Bando. Enquanto estiver cercado pelo bando, você ganha fraqueza 5 a dano de área e de salpico e tem uma aura de bando numa emanação de 3 m. Inimigos nessa aura ficam ofuscados.\n\nQuando usa Formar um Bando e enquanto durar, você pode usar a ação Saraivada Ácida.\n\n**Saraivada Ácida** **Frequência** 1 vez por rodada; **Efeito** cada inimigo na sua aura sofre 5d6 de dano ácido e 2d6 de dano ácido persistente, com salvaguarda básica de Reflexos contra a maior entre sua CD de classe e sua CD de magia. O dano inicial sobe para 6d6 no 15º nível e 7d6 no 18º nível.',
  'Lurching Chomp':
    'Com astúcia, charme ou um pouco de magia, você atrai um inimigo para uma olhada mais de perto — e uma dentada rápida! Escolha uma criatura a até 9 m. Ela deve tentar uma salvaguarda de Vontade contra a maior entre sua CD de classe e sua CD de magia. Se o alvo falhar, você o puxa até 9 m. Se o alvo terminar esse movimento no alcance das suas mandíbulas, você pode tentar um Golpe de mandíbulas contra ele. Independentemente do resultado da salvaguarda, o alvo fica temporariamente imune por 24 horas.',
  'Dazzling Dragonet Disappearance':
    'Um brilho intenso nas escamas lampeja quando você é atingido — e então você já não está lá. O inimigo desencadeante fica ofuscado por 1 rodada, e você fica sob o efeito de uma magia _invisibilidade_ de 4º posto.',
  'Dragonet Immunities':
    'Você não dorme a menos que escolha permitir, nem fica parado. Suas resistências a sono e paralisia aumentam, e você ignora por completo tais efeitos, como convém a um dragão. Ganha imunidade a efeitos de sono e a efeitos que o deixariam paralisado.',
  'Stellar Misfortune':
    'Ação livre. Frequência: 1 vez ao dia. Traços: adivinhação, infortúnio, ocultista.\n\nGatilho: uma criatura que você possa ver está prestes a tentar uma salvaguarda, rolagem de ataque ou teste de perícia.\nRequisito: você precisa estar sob o céu noturno, com as estrelas visíveis.\n\nVocê evoca o poder de uma estrela de infortúnio. O alvo rola o teste disparador duas vezes e usa o pior resultado.',
  'Warding Sign':
    'Reação. Frequência: 1 vez por minuto. Traço: concentração.\n\nGatilho: você tenta uma salvaguarda contra um efeito mágico e ainda não rolou.\n\nVocê evoca um signo pessoal de proteção, que brilha e depois some. Ganha +2 de bônus de circunstância na salvaguarda disparadora, ou +3 se o efeito for uma maldição.\n\nO mestre e você combinam o que resta da maldição desta origem: em geral um efeito temático constante ou muito frequente e, de vez em quando, manifestações mais perigosas.',
  'Name Drop':
    'Reação. Frequência: 1 vez ao dia. Traços: auditivo, fortuna.\n\nGatilho: você falha ou falha criticamente em um teste de Enganação, Diplomacia, Intimidação ou Sociedade.\n\nVocê invoca o nome do patrono e rerrola o teste de perícia. Deve usar o segundo resultado, mesmo que seja pior.\n\nSe ofender o patrono, perde este benefício até se reconciliar (combinar com o mestre).',
  'Bestial Clarity':
    'Reação. Frequência: 1 vez ao dia. Traço: fortuna.\n\nGatilho: você falha numa salvaguarda contra um efeito de encantamento (efeito mental, no Remaster).\n\nSua manifestação bestial fica mais visível e o instinto toma conta. Você pode rerrolar a salvaguarda disparadora com +2 de bônus de circunstância, mas deve usar o novo resultado.',
  'Indomitable Act':
    'Reação. Frequência: 1 vez ao dia. Traço: fortuna.\n\nGatilho: você está prestes a tentar um teste.\nRequisito: você está amedrontado.\n\nVocê usa o medo como combustível. Role o teste disparador duas vezes e use o melhor resultado.',
  'Stitch Flesh':
    'Você pode usar Tratar Ferimentos para restaurar PV de criaturas mortas-vivas, não só vivas. As técnicas variam, mas exigem suturas, ataduras e as ferramentas de curandeiro.\n\nO mestre pode aumentar a CD — por exemplo se o morto-vivo estiver num templo de Pharasma ou se os ferimentos vieram de energia de vitalidade poderosa.',
  'Contract Negotiator':
    'Pré-requisito: treinado em Conhecimento Jurídico.\n\nAo negociar acordos, você pode usar Conhecimento Jurídico no lugar de Diplomacia para Causar Impressão ou Fazer um Pedido, mesmo sem um quadro legal formal.\n\nSe for especialista em Diplomacia, ganha +1 de bônus de circunstância nesses testes; mestre +2; lendário +3.',
}

/** Remove links crus do AoN e normaliza aspas antes de traduzir. */
export function cleanFeatMarkdownText(text: string): string {
  return text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[’‘]/g, "'")
    .replace(/\s{2,}/g, ' ')
    .trim()
}

/** Frases de regra EN → PT (mais longas primeiro). */
const PHRASE_REPLACEMENTS: Array<[RegExp, string]> = [
  ...EQUIPMENT_PHRASE_REPLACEMENTS,
  [
    /An enemy you're aware of hits you with a Strike or a spell attack, or you fail a save against an enemy's spell\.?/gi,
    'Um inimigo do qual você está ciente acerta você com um Golpe ou um ataque de magia, ou você falha em uma salvaguarda contra uma magia de um inimigo.',
  ],
  [
    /You're targeted by a Strike or a spell attack, or you're about to roll a saving throw against a spell effect\.?/gi,
    'Você é alvo de um Golpe ou de um ataque de magia, ou está prestes a rolar uma salvaguarda contra um efeito de magia.',
  ],
  [/You immediately Raise a Shield or cast _?shield_?\.?/gi, 'Você imediatamente ergue um Escudo ou lança _escudo_.'],
  [/imediatamente Erguer um Escudo/g, 'imediatamente ergue um Escudo'],
  [/lança _shield_/gi, 'lança _escudo_'],
  [/_shield_/g, '_escudo_'],
  [/_blur_/g, '_desfoque_'],
  [/_invisibility_/g, '_invisibilidade_'],
  [/_inner upheaval_/gi, '_agitação interior_'],
  [/_lay on hands_/gi, '_imposição das mãos_'],
  [/_boost eidolon_/gi, '_impulsionar eidolon_'],
  [/_reinforce eidolon_/gi, '_reforçar eidolon_'],
  [/_tempest surge_/gi, '_surto tempestuoso_'],
  [/\*\*Frequency\*\*/g, '**Frequência**'],
  [/\*\*Trigger\*\*/g, '**Gatilho**'],
  [/\*\*Effect\*\*/g, '**Efeito**'],
  [/\*\*Requirements\*\*/g, '**Requisitos**'],
  [/you're aware of/gi, 'do qual você está ciente'],
  [/you are aware of/gi, 'do qual você está ciente'],
  [/hits you with a/gi, 'acerta você com um'],
  [/fail a save against/gi, 'falha em uma salvaguarda contra'],
  [/an enemy's spell/gi, 'uma magia de um inimigo'],
  [/Raise a Shield/g, 'Erguer um Escudo'],
  [/Shield Block/g, 'Bloqueio com Escudo'],
  [/Flurry of Blows/g, 'Rajada de Golpes'],
  [/Arcane Cascade/g, 'Cascata Arcana'],
  [/Spellstrike/g, 'Golpe Mágico'],
  [/Intercept Attack/g, 'Interceptar Ataque'],
  [/Change Shape/g, 'Mudar Forma'],
  [/Drop Prone/g, 'Cair'],
  [/High Jump/g, 'Salto em Altura'],
  [/Long Jump/g, 'Salto em Distância'],
  [/Tumble Through/g, 'Atravessar Rolando'],
  [/Make an Impression/g, 'Causar Boa Impressão'],
  [/Activate an Item/g, 'Ativar um Item'],
  [/Recall Knowledge/g, 'Recordar Conhecimento'],
  [/Devised a Stratagem/g, 'Elaborou um Estratagema'],
  [/\bDemoralize\b/g, 'Coagir'],
  [/\bImpersonate\b/g, 'Personificar'],
  [/\bReposition\b/g, 'Reposicionar'],
  [/\bShove\b/g, 'Empurrar'],
  [/\bTrip\b/g, 'Derrubar'],
  [/\bSeeking\b/g, 'Procurando'],
  [/\bSeek\b/g, 'Procurar'],
  [/You are targeted by a spell/gi, 'Você é alvo de uma magia'],
  [/You are targeted by/gi, 'Você é alvo de'],
  [/You're the target of/gi, 'Você é o alvo de'],
  [/You're about to roll initiative/gi, 'Você está prestes a rolar iniciativa'],
  [/You roll initiative/gi, 'Você rola iniciativa'],
  [/You fail a Reflex saving throw/gi, 'Você falha em um teste de Reflexos'],
  [/You fail a Fortitude saving throw/gi, 'Você falha em um teste de Fortitude'],
  [/You fail a Will saving throw/gi, 'Você falha em um teste de Vontade'],
  [/You fail a skill check or saving throw/gi, 'Você falha em um teste de perícia ou salvaguarda'],
  [/You fail a saving throw/gi, 'Você falha em uma salvaguarda'],
  [/You attempt a ranged Strike/gi, 'Você tenta um Golpe à distância'],
  [/You attempt a saving throw/gi, 'Você tenta uma salvaguarda'],
  [/You would be reduced to 0 Hit Points/gi, 'Você seria reduzido a 0 PV'],
  [/You are reduced to 0 Hit Points/gi, 'Você é reduzido a 0 PV'],
  [/would be reduced to 0 Hit Points/gi, 'seria reduzido a 0 PV'],
  [/You become \[?grabbed\]?/gi, 'Você fica agarrado'],
  [/temporary Hit Points?/gi, 'PV temporários'],
  [/Hit Points?/gi, 'PV'],
  [/multiple attack penalty/gi, 'penalidade de ataque múltiplo'],
  [/circumstance bonus/gi, 'bônus de circunstância'],
  [/circumstance penalty/gi, 'penalidade de circunstância'],
  [/status bonus/gi, 'bônus de status'],
  [/status penalty/gi, 'penalidade de status'],
  [/item bonus/gi, 'bônus de item'],
  [/Recall Knowledge/gi, 'Recordar Conhecimento'],
  [/saving throws?/gi, 'salvaguardas'],
  [/unarmed attacks?/gi, 'ataques desarmados'],
  [/melee Strike/gi, 'Golpe corpo a corpo'],
  [/ranged Strike/gi, 'Golpe à distância'],
  [/Focus Points?/gi, 'Pontos de Foco'],
  [/spell attack/gi, 'ataque de magia'],
  [/spell DC/gi, 'CD de magia'],
  [/class DC/gi, 'CD de classe'],
  [/daily preparations/gi, 'preparações diárias'],
  [/Cast a Spell/gi, 'Conjurar uma Magia'],
  [/An ally within (\d+(?:\.\d+)?) m would be reduced to 0 (?:HP|PV) but not immediately killed\.?/gi,
    'Um aliado a $1 m seria reduzido a 0 PV, mas não morto imediatamente.'],
  [/An adjacent ally attempts to/gi, 'Um aliado adjacente tenta'],
  [/An adjacent ally becomes/gi, 'Um aliado adjacente fica'],
  [/\b or \b/g, ' ou '],
  [/once pr 10 minutes\.?/gi, '1 vez a cada 10 minutos'],
  [/once per 10 minutes\.?/gi, '1 vez a cada 10 minutos'],
  [/twice per week\.?/gi, '2 vezes por semana'],
  [/three times per day\.?/gi, '3 vezes por dia'],
  [/one per day\.?/gi, '1 vez por dia'],
  [/Once per hour\.?/g, '1 vez por hora'],
  [/\bfeitiços\b/gi, 'magias'],
  [/\bfeitiço\b/gi, 'magia'],
  [/contra o magia/g, 'contra uma magia'],
  [/um magia preparado/g, 'uma magia preparada'],
  [/lança um magia/g, 'lança uma magia'],
  [/reconheceu o magia/g, 'reconheceu a magia'],
  [/possui um magia/g, 'possui uma magia'],
  [/\bo magia\b/g, 'a magia'],
  [/\bum magia\b/g, 'uma magia'],
  [/once per minute\.?/gi, '1 vez por minuto'],
  [/once per week\.?/gi, '1 vez por semana'],
  [/once per turn\.?/gi, '1 vez por turno'],
  [/once per day/gi, '1 vez por dia'],
  [/once per round/gi, '1 vez por rodada'],
  [/once per hour/gi, '1 vez por hora'],
  [/Sua vez começa\.?/g, 'Seu turno começa'],
  [/lançar a iniciativa/gi, 'rolar iniciativa'],
  [/Você Conjurar uma Magia/g, 'Você conjura uma magia'],
  [/Você Mudar Forma/g, 'Você muda de forma'],
  [/do qual você está consciente/gi, 'do qual você está ciente'],
  [/uma segurança contra/gi, 'uma salvaguarda contra'],
  [/em uma segurança/gi, 'em uma salvaguarda'],
  [/consegue uma segurança/gi, 'obtém sucesso em uma salvaguarda'],
  [/verificação de recuperação ou segurança/gi, 'teste de recuperação ou salvaguarda'],
  [/tenta uma proteção contra/gi, 'tenta uma salvaguarda contra'],
  [/lançar uma proteção/gi, 'rolar uma salvaguarda'],
  [/sua proteção contra/gi, 'sua salvaguarda contra'],
  [/na proteção contra/gi, 'na salvaguarda contra'],
  [/falha na proteção contra/gi, 'falha na salvaguarda contra'],
  [/arma de longo alcance Golpe/gi, 'Golpe à distância'],
  [/armas perfurantes de longo alcance/gi, 'armas perfurantes à distância'],
  [/arma de longo alcance/gi, 'arma à distância'],
  [/slot de feitiço/gi, 'espaço de magia'],
  [/slot de magia/gi, 'espaço de magia'],
  [/\bsalvamentos?\b/gi, 'salvaguarda'],
  [/\bfeitiços\b/gi, 'magias'],
  [/\bfeitiço\b/gi, 'magia'],
  [/as a free action/gi, 'como ação livre'],
  [/as a reaction/gi, 'como reação'],
  [/until the start of your next turn/gi, 'até o início do seu próximo turno'],
  [/until the end of your next turn/gi, 'até o fim do seu próximo turno'],
  [/On a critical hit,/gi, 'Em um acerto crítico,'],
  [/On a hit,/gi, 'Em um acerto,'],
  [/On a miss,/gi, 'Em um erro,'],
  [/On a critical success,/gi, 'Em um sucesso crítico,'],
  [/On a success,/gi, 'Em um sucesso,'],
  [/On a failure,/gi, 'Em uma falha,'],
  [/On a critical failure,/gi, 'Em uma falha crítica,'],
  [/critical hits?/gi, 'acertos críticos'],
  [/critical success/gi, 'sucesso crítico'],
  [/critical failure/gi, 'falha crítica'],
  [/off-guard/gi, 'desprevenido'],
  [/flat-footed/gi, 'desprevenido'],
  [/Armor Class|\bAC\b/g, 'CA'],
  [/Point Out/gi, 'Apontar'],
  [/\bStride\b/g, 'Distanciar'],
  [/\bStrike\b/g, 'Golpe'],
  [/\bStrikes\b/g, 'Golpes'],
  [/\bfrightened\b/gi, 'amedrontado'],
  [/\bstupefied\b/gi, 'estupefato'],
  [/\bsickened\b/gi, 'enjoado'],
  [/\benfeebled\b/gi, 'enfraquecido'],
  [/\bclumsy\b/gi, 'desajeitado'],
  [/\bprone\b/gi, 'caído'],
  [/\bgrabbed\b/gi, 'agarrado'],
  [/\brestrained\b/gi, 'contido'],
  [/\bstunned\b/gi, 'atordoado'],
  [/\bslowed\b/gi, 'lentificado'],
  [/\bconcealed\b/gi, 'oculto'],
  [/\bhidden\b/gi, 'escondido'],
  [/\bundetected\b/gi, 'indetectável'],
  [/You make a /g, 'Você faz um '],
  [/You gain /g, 'Você ganha '],
  [/You can /g, 'Você pode '],
  [/You deal /g, 'Você causa '],
  [/You take /g, 'Você sofre '],
  [/Make a /g, 'Faça um '],
  [/your foe/gi, 'seu inimigo'],
  [/your enemy/gi, 'seu inimigo'],
  [/your allies/gi, 'seus aliados'],
  [/your ally/gi, 'seu aliado'],
  [/your familiar/gi, 'seu familiar'],
  [/the target/gi, 'o alvo'],
  [/temporarily immune to/gi, 'temporariamente imune a'],
  [/immediately attempt a check/gi, 'imediatamente tentar um teste'],
  [/attempt a check/gi, 'fazer um teste'],
  [/to learn about/gi, 'para aprender sobre'],
  [/telegraphed attack/gi, 'ataque telegráfico'],
  [/for 1 day/gi, 'por 1 dia'],
  [/for 1 minute/gi, 'por 1 minuto'],
  [/for 1 round/gi, 'por 1 rodada'],
  [/You're/g, 'Você está'],
  [/you're/g, 'você está'],
  [/Você're/g, 'Você está'],
  [/você're/g, 'você está'],
  [/You ou /g, 'Você ou '],
  [/you ou /g, 'você ou '],
  [/Your turn begins\.?/gi, 'Seu turno começa'],
  [/An ally /g, 'Um aliado '],
  [/An enemy /g, 'Um inimigo '],
  [/An effect /g, 'Um efeito '],
  [/A criatura viva within range/gi, 'Uma criatura viva ao alcance'],
  [/within range/gi, 'ao alcance'],
  [/from an /gi, 'de um '],
  [/from a /gi, 'de um '],
  [/against the triggering effect/gi, 'contra o efeito desencadeante'],
  [/its salvaguarda/gi, 'a salvaguarda'],
  [/don't /gi, 'não '],
  [/hasn't /gi, 'não '],
  [/critically misses/gi, 'erra criticamente'],
  [/critically succeeds at a/gi, 'obtém sucesso crítico em um'],
  [/succeed or critically succeed with a/gi, 'obtém sucesso ou sucesso crítico com um'],
  [/melee Golpe/gi, 'Golpe corpo a corpo'],
  [/rolagem de ataque/gi, 'rolagem de ataque'],
  [/uses a reaction to/gi, 'usa uma reação para'],
  [/would deal/gi, 'causaria'],
  [/to you ou an ally/gi, 'a você ou a um aliado'],
  [/1 ou 2 creatures/gi, '1 ou 2 criaturas'],
  [/\bcreatures\b/gi, 'criaturas'],
  [/must be worshippers of your religion/gi, 'devem ser adoradores da sua religião'],
  [/must be the ritual's target/gi, 'deve ser o alvo do ritual'],
  [/1 \(or more\)/gi, '1 (ou mais)'],
  [/1 or more/gi, '1 ou mais'],
  [/2 or more/gi, '2 ou mais'],
  [/\b or more\b/gi, ' ou mais'],
  [/2 to 5/gi, '2 a 5'],
  [/2 to 12/gi, '2 a 12'],
  [/1 to 9/gi, '1 a 9'],
  [/until the wager's completion/gi, 'até o fim da aposta'],
  [/the posto do ritual/gi, 'o posto do ritual'],
  [/1 target whom you love/gi, '1 alvo a quem você ama'],
  [/2 criaturas who you know/gi, '2 criaturas que você conhece'],
  [/Você está falling/gi, 'Você está caindo'],
  [/\bfalling\b/gi, 'caindo'],
  [/1 object/gi, '1 objeto'],
  [/1 dead criatura/gi, '1 criatura morta'],
  [/no more than (\d+) feet long/gi, 'com no máximo $1 pés de comprimento'],
  [/10-foot-by-10-foot area/gi, 'área de 3 m por 3 m'],
  [/1 cubic foot/gi, '1 pé cúbico'],
  [/cubic feet/gi, 'pés cúbicos'],
  [/cubic foot/gi, 'pé cúbico'],
  [/\bPrestidigitação\b/g, 'Ladroagem'],
  [/\bThievery\b/g, 'Ladroagem'],
  [/\bEste magia\b/g, 'Esta magia'],
  [/\beste magia\b/g, 'esta magia'],
  [/horários diários/gi, 'preparações diárias'],
  [/\bassustado\b/g, 'amedrontado'],
  [/é amedrontad[oa] (\d)/gi, 'fica amedrontado $1'],
  [/está amedrontad[oa] (\d)/gi, 'fica amedrontado $1'],
]

function applyFeet(text: string): string {
  return text
    .replace(/\b(\d+)\s*pés(?:\s*\/\s*[\d.,]+\s*m)?/gi, (_all, n: string) =>
      formatSpeedMeters(Number(n)),
    )
    .replace(/\b(\d+)\s*feet\b/gi, (_all, n: string) => formatSpeedMeters(Number(n)))
    .replace(/(\d+(?:,\d+)?\s*m)\s*\(\s*\d+\s*(?:pés|feet)\s*\)/gi, '$1')
}

/** Gatilhos curados (prioridade sobre o mapa gerado). */
const FEAT_TRIGGERS_PT: Record<string, string> = {
  'Stellar Misfortune':
    'Uma criatura que você possa ver está prestes a tentar uma salvaguarda, rolagem de ataque ou teste de perícia.',
  'Warding Sign':
    'Você tenta uma salvaguarda contra um efeito mágico e ainda não rolou.',
  'Name Drop':
    'Você falha ou falha criticamente em um teste de Enganação, Diplomacia, Intimidação ou Sociedade.',
  'Bestial Clarity':
    'Você falha numa salvaguarda contra um efeito de encantamento (efeito mental, no Remaster).',
  'Indomitable Act': 'Você está prestes a tentar um teste.',
  'Emergency Targe':
    'Um inimigo do qual você está ciente acerta você com um Golpe ou um ataque de magia, ou você falha em uma salvaguarda contra uma magia de um inimigo.',
  'Jealous Grip':
    'Uma criatura no seu alcance da qual você está ciente tenta Desarmar você, ou danificar ou Furtar um item em sua posse.',
  'Ferocious Will':
    'Você obtém sucesso em uma salvaguarda contra um efeito mental mágico.',
  'Dazzling Dragonet Disappearance':
    'Um inimigo adjacente acerta você com um ataque.',
}

/** Tradução automática por glossário (quando não há versão curada). */
export function autoTranslateFeatDescription(text: string): string {
  let out = applyFeet(cleanFeatMarkdownText(text))
  for (const [pattern, replacement] of PHRASE_REPLACEMENTS) {
    out = out.replace(pattern, replacement)
  }
  return applyFeet(applyCatalogTokens(out))
}

/** Gatilho e frequência: sempre limpa markdown e traduz (não depende do mapa de descrição). */
export function localizeFeatRulesText(
  text: string,
  kind: 'trigger' | 'frequency',
  originalName?: string,
): string {
  if (originalName) {
    const curatedTrigger = lookupFeatRecord(FEAT_TRIGGERS_PT, originalName)
    if (kind === 'trigger' && curatedTrigger) {
      return curatedTrigger
    }
    const map =
      kind === 'trigger'
        ? GENERATED_FEAT_TRIGGERS_PT
        : GENERATED_FEAT_FREQUENCIES_PT
    const curated = lookupFeatRecord(map, originalName)
    if (curated) return autoTranslateFeatDescription(curated)
  }
  return autoTranslateFeatDescription(text)
}

/** Limpa markdown e traduz resíduos EN em qualquer texto de regra (magia, ritual, item). */
export function polishRulesText(text: string): string {
  return autoTranslateFeatDescription(text)
}

export function localizeFeatDescription(
  description: string,
  originalName?: string,
  displayName?: string,
): string {
  const curated =
    lookupFeatRecord(FEAT_DESCRIPTIONS_PT, originalName, displayName) ??
    lookupFeatRecord(
      GENERATED_FEAT_DESCRIPTIONS_PT,
      originalName,
      displayName,
    )
  if (curated) return autoTranslateFeatDescription(curated)
  return autoTranslateFeatDescription(description)
}
