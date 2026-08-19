import type { CreatureFamily } from '@/types/creature'

function fam(
  partial: Omit<CreatureFamily, 'source'> & { source?: string },
): CreatureFamily {
  return { source: partial.source ?? 'Pathfinder #215: To Blot Out the Sun', ...partial }
}

/**
 * Famílias AoN Monster Families de Shades of Blood (#213–215).
 * Asides = barras laterais oficiais da página da família. Sem blurb de membro.
 */
export const catalogCreatureFamiliesShadesOfBlood: CreatureFamily[] = [
  fam({
    id: 'family-vampire-strigoi',
    name: 'Vampiro Strigoi',
    originalName: 'Vampire, Strigoi',
    trait: null,
    source: 'Pathfinder #215: To Blot Out the Sun',
    sourcePage: 84,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=564',
    intro: `Os mais antigos de todos os vampiros são os strigoi. Antecedem os nosferatus ancestrais e veem os moroi como crianças infantis, mas as próprias origens estão tão perdidas nas ravinas do tempo que poucos hoje ouviram falar deles e menos ainda conhecem a natureza verdadeira. Muitos dos contos mais antigos sobre vampiros remontam aos strigoi, e quase todo outro vampiro carrega traços que, no fundo, têm raízes nessas criaturas poderosas e antigas.

Strigoi, na forma verdadeira, são entidades sem corpo nativas do Mundo Inferior, incapazes de interagir com o mundo físico, existindo só como forças puras de malevolência. Quando essa malevolência é convidada a um corpo físico por rituais antigos, um strigoi torna-se muito mais perigoso. Esse requisito — que uma criatura viva realize um rito de livre vontade para puxar o strigoi à alma — pode bem ser a origem da compulsão de um moroi de não entrar numa casa sem primeiro ser convidado.

Uma criatura de 8º a 12º nível pode tornar-se um servo strigoi; só criaturas de 13º nível ou superior podem tornar-se progenitores strigoi. Uma criatura abaixo do 8º nível infectada por um strigoi torna-se um vampiro moroi de vontade própria (de fato, foi por esse método que os primeiros moroi vieram ao mundo). Você pode transformar uma criatura viva existente em strigoi com os passos a seguir.

Aumente o nível da criatura em 1 e altere as estatísticas da seguinte forma:
Ganha os traços sombra, morto-vivo e vampiro, e quase sempre torna-se profano. Aumente CA, bônus de ataque, CDs, salvaguardas e modificadores de perícia em 1. Aumente o dano de Golpes e outras habilidades ofensivas em 1. Se uma habilidade só puder ser usada um número pequeno de vezes, aumente o dano em 2. O strigoi ganha cura acelerada e resistência a todo dano físico, exceto de armas de prata ou armas que emitem pelo menos 1,5 m de luz intensa (como uma com a magia _luz_), conforme a tabela abaixo. Essas habilidades são o motivo de o strigoi ter menos PV.

**Estatísticas de Strigoi**
**Nível inicial** **Redução de PV** **Cura acelerada / Resistência**  8–14  −40  10  15+  −60  15

Todos os strigoi ganham as seguintes habilidades. Se a criatura-base tem quaisquer habilidades que venham especificamente de ser uma criatura viva, perde-as. Também perde quaisquer traços que representavam a vida como criatura viva, como humano e humanoide. Pode ser necessário ajustar habilidades que conflitem com o tema do strigoi.

**Visão no Escuro Maior**

**Cura de Vazio**

**Imunidades** efeitos de morte, doença, paralisia, veneno, sono

**Restauração do Caixão** (divino, vazio) Como os vampiros moroi, um strigoi não é destruído a 0 PV. Em vez disso, fica inconsciente e perde a cura acelerada. Se o corpo descansar no caixão por 1 hora, o strigoi ganha 1 PV, após o que a cura acelerada volta a funcionar normalmente.

**Fraquezas de Strigoi** Todos os strigoi possuem as seguintes fraquezas:
**Repulsa** Strigoi ficam desconfortáveis perto de espelhos ou fontes de luz intensa. Só a sombra de um strigoi se reflete num espelho, e isso muitas vezes os impele a cobrir ou destruir espelhos na presença em vez de arriscar que a natureza verdadeira seja exibida. Um strigoi não pode se aproximar voluntariamente a 3 m de um espelho brandido ou fonte de luz intensa. Para brandir um espelho ou fonte de luz, uma criatura deve Interagir para fazê-lo por 1 rodada (semelhante a Erguer um Escudo). Se o strigoi se aproximar involuntariamente a 3 m de um espelho brandido ou fonte de luz, ganha a condição em fuga, correndo do objeto brandido até terminar uma ação além de 3 m. Depois de 1 rodada exposto ao objeto de sua repulsa, um strigoi pode tentar uma salvaguarda de Vontade CD 25 como uma única ação, que tem o traço concentração. Num sucesso, supera as repulsas por 1d6 rodadas (ou 1 hora num sucesso crítico). Um strigoi pode se mover normalmente ao redor de espelhos ou fontes de luz intensa que não estejam brandidos, embora isso cause desconforto que pode ser notado com um teste bem-sucedido de Percepção para Sentir Motivação.
**Luz solar** Quando exposto à luz solar direta, um strigoi imediatamente fica inconsciente e cai no chão. Parece estar morto: não respira, a temperatura do corpo iguala o entorno e não reage a dor ou outros estímulos. Um teste bem-sucedido de Percepção contra a CD de Reflexos do strigoi basta para notar uma anomalia: a sombra lançada pelo “cadáver” se desloca e se move levemente, as bordas torcendo e ativas. Certas magias de detecção, sentidos como sentido vital e o “cadáver” sofrer dano de energia de vitalidade ainda funcionam normalmente e poderiam revelar a verdade sem um teste de Percepção. Ver o “cadáver” no reflexo de um espelho também pode revelar a verdade, pois só a sombra do corpo se reflete. Enquanto estiver na luz solar e inconsciente, o strigoi perde a resistência a dano físico. Se o strigoi sofrer dano suficiente para ser reduzido a 0 PV, o corpo se decompõe rápido e o strigoi é destruído.
**Repulsa à Água** Um strigoi não pode cruzar uma fonte significativa de água corrente (como um riacho, rio ou ondas numa praia). Um strigoi capaz de voar pode cruzar água corrente desde que não se aproxime a menos de 3 m da superfície do líquido. Se forçado à água corrente contra a vontade, o strigoi fica com lentidão 2 e ganha a condição em fuga enquanto permanecer na água. Ao fim de qualquer turno em que o strigoi permanecer em água corrente, deve obter sucesso num teste plano CD 5 ou ser destruído.
**Levitação** (divino, sombra) Strigoi podem conjurar _levitar_ à vontade como magia inata divina; ao fazê-lo, parecem subir ou descer numa massa enrolada de sombras.

**Garras** Se a criatura tinha mãos, a sombra se solidifica ao redor dos dedos quando ataca, concedendo um Golpe de garra que causa dano cortante e tem os traços ágil e mágico. O dano das garras deve ser mais ou menos o mesmo do dano de Golpe moderado de uma criatura do nível dela.

**Beber Essência** (divino, necromancia) **Requisitos** Uma criatura agarrada, paralisada, presa, inconsciente ou disposta está no alcance do strigoi; **Efeito** O strigoi crava as presas na criatura-alvo para beber o sangue e extrair a essência vital. Isso exige um teste de Atletismo contra a CD de Fortitude da criatura se ela estiver agarrada e é automático para qualquer das outras condições. A criatura fica drenada 1 e embotada 1, e o strigoi recupera PV iguais a 10% dos PV máximos, ganhando quaisquer PV excedentes como Pontos de Vida temporários. Beber Essência de uma criatura que já está drenada ou embotada não restaura PV, mas aumenta o valor da condição drenada ou o da embotada em 1 (o valor menor é aumentado; se ambos forem iguais, o strigoi escolhe). A condição drenada da vítima diminui em 1 por semana. Uma transfusão de sangue, que exige um teste bem-sucedido de Medicina CD 20 e sangue suficiente ou um doador, reduz o valor drenado em 1 após 10 minutos. A condição embotada da vítima diminui em 1 por dia após as preparações diárias. Se as preparações diárias forem feitas em plena luz solar, a condição embotada é removida por completo.

**Agarrar** Os ataques de garra da criatura ganham Agarrar. Quando usa essa habilidade, as garras sombrias parecem quase se prender a quaisquer sombras lançadas pela criatura agarrada.

**Forma de Sombra** (concentração, divino, sombra) O strigoi reverte a sombra pura e absorve o corpo e o equipamento na escuridão, ou volta à forma física. Na forma de sombra, o strigoi ganha Deslocamento de escalada igual ao Deslocamento terrestre e pode se mover por qualquer fresta que não seja hermética. Porém, só pode se mover ao longo de superfícies sólidas que não sejam altamente reflexivas, não líquidas nem espelhadas. Se a superfície em que está for destruída, o strigoi volta à forma física e fica atordoado 1. O strigoi perde a cura acelerada na forma de sombra, mas pode permanecer nela indefinidamente. Um strigoi exposto à luz solar na forma de sombra fica com lentidão 2 e deve tentar um teste plano CD 16 ao fim de cada turno. Se falhar nesse teste plano, é destruído, a sombra sumindo com um uivo de gelar o sangue.

Strigoi poderosos formados da fusão de um strigoi do Mundo Inferior e um hospedeiro vivo ganham habilidades adicionais detalhadas abaixo. Uma criatura abaixo do nível 13 não é hospedeiro significativo o bastante para tornar-se um progenitor strigoi.

**Criar Serviçal** (divino, intervalo) Como vampiro verdadeiro, mas a vítima deve ter sido morta por Domínio do Crepúsculo ou Beber Essência. Uma vítima de 8º nível ou superior torna-se um servo strigoi, enquanto uma vítima de nível inferior torna-se um vampiro moroi.

**Fuga nas Sombras** **Gatilho** O strigoi é reduzido a 0 PV; **Efeito** O strigoi usa Forma de Sombra. Pode usar ações de movimento para se mover em direção ao caixão mesmo estando a 0 PV. Enquanto estiver a 0 PV nessa forma, o strigoi não é afetado por dano adicional. Uma vez que o strigoi alcance o caixão, ou se não o tiver feito em 2 horas, volta automaticamente à forma física, inconsciente.

**Deslocamento de Voo** Em vez de poder conjurar _levitar_ à vontade, um progenitor strigoi ganha Deslocamento de voo igual ao Deslocamento terrestre. Quando um progenitor strigoi voa, manifesta asas semelhantes a de morcego feitas de sombra.

**Domínio do Crepúsculo** (divino, sombra) **Frequência** 1 vez por minuto; **Efeito** Com um aceno da mão, o strigoi evoca ruína vil das sombras ao redor, fazendo espirais de escuridão e morcegos, ratos e lobos sombrios açoitar alvos vivos numa emanação de 9 m. Criaturas vivas nessa área sofrem 1d6 de dano de vazio + 1d6 de dano de vazio a cada 2 níveis do strigoi, com uma salvaguarda básica de Fortitude contra a CD do nível do strigoi. Uma criatura que falhe também fica ofuscada pela escuridão por 1 rodada (ou cega por 1 rodada e então ofuscada por 1 rodada numa falha crítica).

**Dominar** (divino, incapacitação, mental, visual) Como vampiro verdadeiro.

**Beber Essência** Como strigoi, mas a vítima fica drenada 2 e embotada 2 em vez de 1.`,
    sections: [
      {
        id: 'in-shadows',
        title: 'Nas Sombras',
        body: 'Na forma verdadeira de uma sombra sem corpo, um strigoi é mais uma força malevolente estranha semelhante a uma alma do que uma criatura de fato. Nessa forma, um strigoi é capaz de pensamento e emoção e pode se comunicar com as formas sombrias de outros strigoi, mas não tem como se comunicar ou interagir com o mundo físico. Inúmeros strigoi existem assim no Mundo Inferior, esperando pacientemente que o ritual que permite aos mortais convidá-los para dentro seja descoberto de novo.',
      },
      {
        id: 'non-evil-strigoi',
        title: 'Strigoi Não Malignos',
        body: 'Strigoi não malignos são ainda mais raros que moroi não malignos, mas podem, em teoria, existir. Os que existem muitas vezes são assombrados pela perda de visões para sempre barradas a eles, como o sol ou o próprio reflexo. Para strigoi não malignos, essas coisas não inspiram aversão, e sim uma vergonha profunda e avassaladora e ódio de si.',
      },
      {
        id: 'strange-wounds',
        title: 'Feridas Estranhas',
        body: 'As marcas icônicas de perfuração no pescoço de uma vítima esgotada de sangue são bem conhecidas de caçadores de vampiros, mas as feridas deixadas por strigoi são mais estranhas. Quando um strigoi se alimenta de uma vítima viva, o local da ferida perde a cor, fica enrugado e estranhamente frio ao toque. Essas condições desaparecem se a ferida cicatrizar; se um strigoi se alimentar o bastante para causar morte pela condição drenada, a criatura deixa para trás uma carcaça cinza ressequida de um corpo sem sangue. Autópsias completas nos mortos desse modo revelam ainda outra curiosidade inquietante: os cérebros dessas vítimas são ovoides cinza lisos, as dobras e fissuras da matéria cinzenta fundidas numa massa sem traços.',
      },
      {
        id: 'strigoi-and-the-sun',
        title: 'Strigoi e o Sol',
        body: 'Desde que não estejam na forma de sombra, strigoi são mais inconvenienciados pela luz solar do que feridos por ela, mas ser deixado inconsciente certamente os coloca em desvantagem. Desde que estejam numa área com pouco risco de luz solar direta, como um cômodo sem janelas ou portas exteriores, ou uma área subterrânea, alguns strigoi permanecem ativos durante o dia, recuando aos caixões só em emergências. Ao fazer isso, esses strigoi se misturaram ainda mais à sociedade — pode haver mais deles do que se suspeita!',
      },
    ],
  }),
]
