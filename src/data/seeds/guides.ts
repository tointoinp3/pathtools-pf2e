import type { Guide } from '@/features/guides/guideTypes'

/** Guias de regras Remaster (Player Core). Texto original em pt-BR; fonte AoN. */
export const catalogGuides: Guide[] = [
  {
    id: 'character-creation',
    name: 'Criar um personagem',
    originalName: 'Character Creation',
    category: 'creation',
    summary:
      'Os 10 passos do Player Core para montar um herói de 1º nível: conceito, atributos, ancestralidade, origem, classe, equipamento e números da ficha.',
    source: 'Player Core pág. 17',
    aonUrl: 'https://2e.aonprd.com/Rules.aspx?ID=2027',
    relatedGuides: ['session-zero', 'feats', 'leveling-up'],
    relatedLinks: [
      { label: 'Criar Personagem (ficha)', to: '/personagens/novo' },
      { label: 'Ancestralidades', to: '/compendio/ancestralidades' },
      { label: 'Heranças versáteis', to: '/compendio/herancas-versateis' },
      { label: 'Origens', to: '/compendio/origens' },
      { label: 'Classes', to: '/compendio/classes' },
      { label: 'Divindades', to: '/compendio/divindades' },
    ],
    sections: [
      {
        heading: 'Por onde começar',
        body: `A ordem abaixo é a sugerida no Player Core — você pode pular de um passo para o outro se já souber a classe ou o povo que quer jogar. O importante é aplicar **aumentos de atributo** (boosts) e **falhas** na hora certa, para o modificador final bater.

Cada atributo começa em **+0** (a média humana). Um aumento soma +1; uma falha subtrai 1. Se o modificador já está em **+4** ou mais, o aumento vira **aumento parcial**: o próximo aumento naquele atributo é que sobe de verdade. No 1º nível nenhum atributo pode passar de **+4**.

Quando você ganha vários aumentos **ao mesmo tempo**, cada um vai para um atributo diferente — não dá para empilhar dois no mesmo.`,
      },
      {
        heading: 'Os seis atributos',
        body: `**Força** — poder físico. Entra no dano corpo a corpo e em quanto você carrega.
**Destreza** — agilidade e reflexos. Entra na CA, em Reflexos e em ataques à distância.
**Constituição** — vigor. Entra nos PV e em Fortitude.
**Inteligência** — raciocínio. Perícias extras e, em muitos casos, idiomas extras.
**Sabedoria** — intuição. Entra em Percepção e Vontade.
**Carisma** — presença. Perícias sociais e várias habilidades de classe.`,
      },
      {
        heading: '1. Conceito',
        body: `Imagine quem é o herói: personalidade, passado e por que aventura. Dá para partir de um povo, de uma origem, de uma classe ou de uma fé — ou misturar tudo. Converse com a mesa: vocês já se conhecem? O grupo precisa de alguém que cause dano, alguém que aguente porrada e alguém que cure e apoie? As classes do Remaster têm muita folga; essas funções não prendem a escolha.

Anote o nome e um resumo curto. Fé, editais e anátemas podem esperar o passo 10, salvo se a classe exigir (clérigo, campeão).`,
      },
      {
        heading: '2. Atributos no papel',
        body: `Marque +0 em todos. Já pense quais serão os altos: um arqueiro quer Destreza; um clérigo, Sabedoria. Os números só fecham depois da ancestralidade, da origem, da classe e dos **quatro aumentos livres**.`,
      },
      {
        heading: '3. Ancestralidade',
        body: `Escolha o povo. Isso define tamanho, Deslocamento, idiomas, PV iniciais da raça, sentidos e os aumentos (e às vezes a falha) de atributo.

Quatro decisões neste passo:
1. A ancestralidade em si.
2. Uma **herança** daquele povo (ou uma **herança versátil**, como nefílio, que encaixa em quase qualquer ancestralidade).
3. Onde vão os aumentos livres da raça — e se você quer **falhas voluntárias** (opcional, só para interpretar um herói bem falho; no máximo uma falha por atributo).
4. Um **feito de ancestralidade** de 1º nível.

Quer ignorar o pacote típico do povo? Você pode trocar os aumentos e a falha listados por **dois aumentos livres**. Isso é regra, não homebrew.

No Pathtools 2e isso fica nas abas Ancestralidades e Heranças Versáteis do Compêndio — a ficha soma PV, CA e sentidos sozinha.`,
      },
      {
        heading: '4. Origem (background)',
        body: `A origem é a vida **antes** de aventurar. Em geral entrega:
- dois aumentos de atributo (um restrito a duas opções, um livre);
- treino em uma perícia;
- treino em um **Conhecimento** (Lore);
- um **feito de perícia**.

Se a classe também te deixar treinado na mesma perícia, você fica treinado em **outra perícia à escolha**. A origem não muda depois.`,
      },
      {
        heading: '5. Classe',
        body: `A classe diz como você luta, quais efeitos resiste melhor e quais habilidades heroicas ganha. Anote a classe, o nível **1** e o **atributo-chave** — a classe dá um aumento nesse atributo. O resto das habilidades entra no passo 7.

Resumos de cada classe estão no Compêndio → Classes.`,
      },
      {
        heading: '6. Fechar os atributos',
        body: `Some tudo que já anotou (ancestralidade, origem, classe). Depois aplique **quatro aumentos livres**, cada um num atributo diferente.

No 1º nível o intervalo esperado é **−1 a +4**.`,
      },
      {
        heading: '7. Detalhes da classe',
        body: `Agora sim: PV totais (**PV da ancestralidade + PV da classe + Constituição**), proficiências iniciais (Percepção, salvaguardas, armas, armadura, perícias), feitos de 1º nível e escolhas da classe (ordem de druida, doutrina de clérigo, escola de mago…).

Se a classe concede magias, este é o momento de olhar tradições, truques e espaços — o Compêndio de Magias ajuda a consultar.

**CD de classe** = 10 + bônus de proficiência da CD de classe + modificador do atributo-chave. No 1º nível, treinado costuma ser +3 (nível 1 + 2).`,
      },
      {
        heading: '8. Equipamento',
        body: `No 1º nível você tem **15 po** (150 pp) para arma, armadura e utilidade. A classe lista em quais armas e armaduras você é treinado. Kits de partida no Player Core (capítulo de equipamento) aceleram a compra.

Carga: **sobrecarregado** acima de 5 + Força; **não carrega** acima de 10 + Força. Dez itens leves = 1 Bulk.`,
      },
      {
        heading: '9. Somar os modificadores',
        body: `Bônus de proficiência: **não treinado +0**; treinado / perito / mestre / lendário = **nível + 2 / 4 / 6 / 8**.

**Percepção** = proficiência de Percepção + Sabedoria.
**Fortitude** = proficiência + Constituição.
**Reflexos** = proficiência + Destreza.
**Vontade** = proficiência + Sabedoria.

**Golpe** = proficiência com a arma + atributo (em geral Força corpo a corpo, Destreza à distância) + bônus de item. O dano da arma soma Força nos corpo a corpo; à distância depende dos traços da arma.

**Perícia** = proficiência + o atributo da perícia + itens permanentes.`,
      },
      {
        heading: '10. Acabamento',
        body: `**CA** = 10 + Destreza (até o teto da armadura) + proficiência com a armadura + bônus de item da armadura.

**Pontos de herói:** em geral 1 no começo da sessão; gastam-se para rerrolar um d20 ou evitar a morte.

Editais, anátemas, deidade, idade e pronomes são opcionais para a maioria — obrigatórios quando a classe amarra (clérigo precisa de deidade). Personagens muito jovens mudam o tom da mesa; o livro recomenda pelo menos jovem adulto.

Se o personagem já começa acima do 1º, faça estes passos e depois use o guia **Subir de nível** até o nível combinado com o MJ.`,
      },
    ],
  },
  {
    id: 'feats',
    name: 'Feitos: o que são e quando escolher',
    originalName: 'Feats',
    category: 'feats',
    summary:
      'As quatro prateleiras de feitos (ancestralidade, classe, perícia, geral), o que cada espaço aceita, pré-requisitos e como o arquétipo entra na conta.',
    source: 'Player Core págs. 92 e 249',
    aonUrl: 'https://2e.aonprd.com/Rules.aspx?ID=2142',
    relatedGuides: ['character-creation', 'leveling-up', 'archetypes', 'mythic-rules'],
    relatedLinks: [
      { label: 'Feitos', to: '/compendio/feitos' },
      { label: 'Classes', to: '/compendio/classes' },
      { label: 'Arquétipos', to: '/compendio/arquetipos' },
      { label: 'Ancestralidades', to: '/compendio/ancestralidades' },
    ],
    sections: [
      {
        heading: 'O que um feito faz',
        body: `Feito é um pacote de regra que você **escolhe** — não ganha automático como a maioria das habilidades de classe. Pode ser uma ação nova (o ícone ao lado do nome diz o custo), uma reação, um bônus permanente ou uma exceção (“você pode fazer X”).

No cartão do feito olhe sempre:
- **Traços** — classifiquem o feito (geral, perícia, lutador, concentração…).
- **Pré-requisitos** — perícia treinada, outro feito, atributo mínimo, traço de arma.
- **Frequência** — 1 vez por rodada, por dia, etc.
- **Gatilho** — se for reação ou ação livre com gatilho.
- **Custo em ação** — o ícone; sem ícone, em geral é passivo.

Não pegue o mesmo feito duas vezes, salvo se o texto disser que pode.`,
      },
      {
        heading: 'Quatro prateleiras (não misture os espaços)',
        body: `Cada espaço de feito na tabela da classe é de **um tipo**. Um espaço de classe não vira feito geral, e vice-versa — com as exceções abaixo.

**Ancestralidade** — feitos do seu povo (e os que uma herança versátil liberar). No 1º nível você já pega um; depois nos níveis **5, 9, 13 e 17**.

**Classe** — só membros daquela classe (ou quem pegou a Dedicação certa). A maioria das classes começa no **1º ou 2º** e segue nos níveis pares. Lutador e algumas outras ganham no 1º; outras só no 2º. Olhe a tabela da sua classe.

**Perícia** — feitos com o traço **perícia**. Exigem treino (ou mais) na perícia correspondente. A maioria das classes ganha no **2º e a cada 2 níveis**. Ladino ganha mais cedo e com mais frequência.

**Geral** — qualquer feito com o traço **geral** cujos pré-requisitos você cumpra. A maioria das classes ganha no **3º e a cada 4 níveis** (3, 7, 11, 15, 19).`,
      },
      {
        heading: 'A troca que a regra permite',
        body: `Quando o espaço é de **feito geral**, você **pode** escolher um feito de perícia no lugar — feito de perícia também tem o traço geral.

Quando o espaço é de **feito de perícia**, você **não** pode pegar um geral sem o traço perícia. Assurance, por exemplo, serve; Resistência (Toughness) não entra nesse espaço.

Feitos de classe podem ser gastos em **arquétipo**: primeiro a Dedicação, depois os feitos daquele arquétipo nos espaços de classe seguintes, respeitando o intervalo da Dedicação (em geral você precisa de 2 feitos do arquétipo antes de pegar outra Dedicação). Compêndio → Arquétipos lista o pacote Remaster.`,
      },
      {
        heading: 'Calendário típico (maioria das classes)',
        body: `**1º** — feito de ancestralidade; algumas classes já dão feito de classe.
**2º** — feito de classe + feito de perícia.
**3º** — feito geral; aumento de perícia.
**4º** — classe + perícia.
**5º** — ancestralidade + aumento de perícia + **quatro aumentos de atributo**.
**6º** — classe + perícia.
**7º** — geral + aumento de perícia.
E assim por diante, no mesmo ritmo.

Ladino, inventor e outras classes desviam um pouco: a tabela da classe manda. Na ficha, a aba Feitos só oferece o que aquele espaço aceita.`,
      },
      {
        heading: 'Como escolher na mesa',
        body: `1. Veja o **espaço** que subiu de nível (classe, perícia, geral ou ancestralidade).
2. Filtre pelo tipo e pelo seu nível.
3. Confira pré-requisitos: perícia no grau certo, feitos anteriores, atributo.
4. Se for ação, leia o ícone e o gatilho — um feito de reação não adianta se o gatilho nunca aparece.
5. Arquétipo: só se você quer aquele pacote o suficiente para gastar vários espaços de classe nele.

Na dúvida, um feito que você vai **usar todo combate** (ou toda cena de exploração) vale mais do que um que brilha uma vez na campanha.`,
      },
    ],
  },
  {
    id: 'leveling-up',
    name: 'Subir de nível',
    originalName: 'Leveling Up',
    category: 'progression',
    summary:
      '1.000 XP viram um nível. PV, tabela da classe, feitos, magias e o +1 em tudo que já é treinado — o checklist do Player Core.',
    source: 'Player Core pág. 29',
    aonUrl: 'https://2e.aonprd.com/Rules.aspx?ID=2065',
    relatedGuides: ['character-creation', 'feats', 'xp-rewards', 'mythic-rules'],
    relatedLinks: [
      { label: 'Classes', to: '/compendio/classes' },
      { label: 'Magias', to: '/compendio/magias' },
      { label: 'Arquétipos', to: '/compendio/arquetipos' },
    ],
    sections: [
      {
        heading: 'A conta de XP',
        body: `Cada vez que o personagem junta **1.000 pontos de experiência**, o nível sobe **1**. Anote o novo nível ao lado da classe e **desconte 1.000 XP**. O que sobrar já conta para o próximo nível.

O MJ pode avançar por marco (sem XP). O efeito na ficha é o mesmo: você ganha tudo da linha nova na tabela da classe.`,
      },
      {
        heading: 'Checklist a cada nível',
        body: `1. Nível +1; XP −1.000.
2. Some os **PV da classe** (o número do bloco da classe, todo nível). Constituição extra só entra de novo se o modificador de Constituição subir neste nível.
3. Olhe a **tabela de avanço** da classe: habilidades novas, feitos, aumentos de perícia, aumentos de atributo.
4. Escolha os feitos daquela linha (ancestralidade, classe, perícia, geral — cada um no espaço certo; veja o guia de Feitos).
5. Se conjura, a classe diz se entram espaços, magias conhecidas ou altura nova. Vale reler magias que **aumentam** com o posto.
6. Tudo em que você é treinado ou melhor ganha **+1** só por subir de nível (CA, ataques, Percepção, salvaguardas, perícias, CD de magia, CD de classe).
7. Ajuste feitos e itens cujo benefício usa o **nível** (Resistência / Toughness, por exemplo).`,
      },
      {
        heading: 'O que quase todo mundo ganha',
        body: `**Aumentos de atributo** — quatro, em atributos **diferentes**, no **5º, 10º, 15º e 20º**. Se Constituição sobe, recalcule o máximo de PV (em geral +1 PV por nível já conquistado). Se Inteligência sobe, você fica treinado em **mais uma perícia** e em **mais um idioma**.

**Aumentos de perícia** — a maioria das classes no **3º e a cada 2 níveis**. Sobe o grau (treinado → perito → mestre → lendário) numa perícia que você já tem, ou deixa uma nova treinada, conforme a regra da classe. Não pula graus.

**Feitos de ancestralidade** — 5, 9, 13, 17 (além do de 1º nível).
**Feitos de classe / perícia / geral** — no ritmo da tabela; o guia de Feitos detalha.

Você pode fazer os passos **em qualquer ordem** no mesmo nível. Exemplo: no 10º, primeiro aplique os quatro aumentos de atributo e só então pegue um feito de perícia que pedia Força +3.`,
      },
      {
        heading: 'Arquétipo no lugar do feito de classe',
        body: `A linha “feito de classe” pode virar feito de **arquétipo**, se você já tem a Dedicação (ou se está pegando a Dedicação naquele espaço). O resto do nível — PV, perícia, feito geral — não muda.

Multiclasse é um tipo de arquétipo: você não “vira” a outra classe; pega fatias dela com espaços de feito de classe.`,
      },
      {
        heading: 'Na ficha deste app',
        body: `Suba o nível na ficha: o motor recalcula proficiência (nível + grau), PV máximos e CDs. Feitos e escolhas da classe que a tabela pede ainda são **sua** decisão — abra a aba Feitos e a da classe para preencher os espaços novos. Magias novas entram na aba Magias.

Se algo parecer baixo depois de subir, confira se o grau de perícia (T/E/M/L) acompanhou o aumento de perícia daquele nível.`,
      },
    ],
  },
  {
    id: 'spells',
    name: 'Magias: conjurar, aprender e tipos de mago',
    originalName: 'Spells',
    category: 'spells',
    summary:
      'Tradições, espaços, preparado vs espontâneo, truques, foco, inatas, aprender magia e o que muda quando você aumenta o posto.',
    source: 'Player Core págs. 297 e 230',
    aonUrl: 'https://2e.aonprd.com/Rules.aspx?ID=2221',
    relatedGuides: ['rituals', 'counteract', 'incapacitation'],
    relatedLinks: [
      { label: 'Magias', to: '/compendio/magias' },
      { label: 'Rituais', to: '/compendio/rituais' },
      { label: 'Classes', to: '/compendio/classes' },
    ],
    sections: [
      {
        heading: 'As quatro tradições',
        body: `Toda magia de classe vem de uma lista: **arcana**, **divina**, **oculta** ou **primal**. A classe define a sua. Quando você conjura, a magia ganha o traço dessa tradição — mesmo que o texto original da magia esteja em outra lista (ex.: clérigo de Sarenrae ganhando bola de fogo: a magia é divina na sua mão).

Itens mágicos em geral não têm tradição: usam o traço **mágico**.

**Arcana** — lógica e categorias do mundo; lista larga, fraca em espírito/alma. Mago é o exemplo clássico.
**Divina** — fé e poder de além do Universo. Clérigo.
**Oculta** — o inexplicável, sistematizado. Bardo.
**Primal** — ciclo da natureza, predador e presa. Druida.`,
      },
      {
        heading: 'Espaços de magia (spell slots)',
        body: `O posto da magia (1 a 10) mede o poder. No 1º nível você tem poucos espaços de 1º posto; sobe de nível, ganha mais espaços e postos mais altos.

**Preparado** (clérigo, druida, bruxa, mago): nas preparações diárias você escolhe quais magias entram em quais espaços. Conjurou = gastou aquele preparo. Quer a mesma magia duas vezes no dia? Prepare duas vezes. Truques são a exceção.

**Espontâneo** (bardo e classes semelhantes no Player Core 2): você tem um **repertório** menor e escolhe qual magia da lista gasta o espaço **na hora** de conjurar. As preparações recarregam os espaços; o repertório não muda nesse momento.`,
      },
      {
        heading: 'Aumentar o posto (heighten)',
        body: `Preparado: coloque a magia num espaço mais alto que o posto mínimo. Espontâneo: só aumenta se você **conhece** a magia naquele posto — ou se a classe tem **magias de assinatura**, que deixam um número limitado subir mesmo conhecendo só um posto.

Espontâneo também pode gastar um espaço alto numa magia de posto baixo **sem** aumentar: o efeito fica no posto que você conhece. Quase sempre é desperdício, salvo emergência.

Aumentar o posto importa para **contrapor** e, em muitas magias, para dano ou alvos extra (veja a linha Heightened no final do bloco).`,
      },
      {
        heading: 'Truques, foco e inatas',
        body: `**Truque (cantrip)** — não gasta espaço; à vontade até as próximas preparações. Preparamos um número fixo por dia; não entra em espaço de magia. A altura sobe sozinha: **metade do seu nível, arredondada para cima** (no conjurador típico, igual ao maior posto de espaço que você tem).

**Magia de foco** — só por habilidade de classe ou feito, não da lista. Gasta **1 ponto de foco**, nunca um espaço. Altura igual à dos truques. A reserva nasce quando você ganha a primeira magia de foco; o máximo é o número de magias de foco que exigem ponto **ou 3**, o que for menor (truques de composição de bardo não contam). Preparações enchem a reserva. **Refoco** (atividade) devolve 1 ponto; pode repetir até o máximo.

Quem só tem foco (ex.: ranger) conjura foco, mas **não** conta como conjurador para feitos que pedem espaços de magia.

**Inata** — ancestralidade ou item, em geral 1×/dia, tradição indicada na habilidade. Recarrega nas preparações. Não te faz conjurador. Atributo costuma ser **Carisma**, salvo o texto. Treinado em ataque e CD de magia; perito no 12º. **Truques** inatos sobem de posto como os outros truques. O resto **não** aumenta sozinho — só se a habilidade já vier num posto mais alto. Não gasta seus espaços de classe.`,
      },
      {
        heading: 'Como aprender uma magia nova',
        body: `Atividade **Aprender magia** (Player Core pág. 230): você precisa da característica de conjuração da classe e a magia tem de estar na lista da sua tradição.

Perícia: **Arcanismo** (arcana), **Natureza** (primal), **Ocultismo** (oculta), **Religião** (divina). Se você conjura duas tradições (ex.: clérigo com Dedicação de bardo), use a perícia da tradição da magia — Religião não coloca magia oculta no repertório de bardo.

Você precisa de professor ou escrita mágica (grimório, pergaminho), **1 hora por posto**, materiais da tabela, e um teste. Magias incomuns/raras têm CD mais alta.

**Crítico:** gasta metade dos materiais e aprende.
**Sucesso:** gasta tudo e aprende.
**Falha:** não aprende; pode tentar de novo depois de subir de nível; materiais ficam.
**Falha crítica:** como falha, mas gasta metade.

Preço / CD típica: truque ou 1º = 2 po / 15; 2º = 6 po / 18; 3º = 16 po / 20; 4º = 36 po / 23; 5º = 70 po / 26; 6º = 140 po / 28; 7º = 300 po / 31; 8º = 650 po / 34; 9º = 1.500 po / 36; 10º = 7.000 po / 41.

O que “aprender” faz: entra no grimório (mago), no familiar (bruxa) ou na lista (clérigo/druida). No **repertório** (bardo) **não** entra sozinha — só vira opção quando a classe deixar adicionar ou trocar magia.

Serve sobretudo para quem tem lista limitada; clérigo e druida já têm a lista da tradição, e usam isso mais para magias incomuns/raras.`,
      },
      {
        heading: 'Conjurar na mesa',
        body: `A maioria das magias pede gestos e palavras; sem falar, a maioria dos conjuradores não conjura (deficiência de fala: combine um análogo com o MJ). A magia é óbvia: luz, estalo, cheiro e um **anel de runas** — salvo o traço **sutil**.

O custo em ação está no bloco (muitas vezes 2 ações). Truque, espaço e foco usam o mesmo processo; espaço gasta o preparo/espaço, foco gasta 1 ponto.

**Ataque de magia** vs CA; conta para a penalidade de ataques múltiplos. Atributo: o da classe se a magia vem da classe; Carisma nas inatas, salvo o texto.
**CD de magia** = 10 + atributo de conjuração + proficiência + bônus/penalidades.
**Salvaguarda básica:** crítico 0 dano, sucesso metade, falha total, falha crítica dobro.

**Sustentar** estende magia de duração “sustained” até o fim do próximo turno. **Dispensar** encerra cedo se o texto permitir.

Magia interrompida (ex.: Golpe reativo no meio de Conjurar magia de 3 ações): você **já gastou** as ações, o espaço e os custos; o efeito não acontece.`,
      },
      {
        heading: 'Rituais (não são magia de espaço)',
        body: `Você pode ser o conjurador principal mesmo sem espaços — mas precisa **conhecer** o ritual e ter o grau de perícia que o teste principal pede. O posto máximo (e o quanto dá para aumentar) é **metade do seu nível, arredondada para cima**. Não gasta espaço; leva no mínimo 1 hora, muitas vezes dias. O teste principal é de **perícia**, não de ataque de magia. Ritual não entra no repertório. Detalhes no guia de **rituais**.`,
      },
    ],
  },
  {
    id: 'actions',
    name: 'Ações e o seu turno',
    originalName: 'Actions',
    category: 'rules',
    summary:
      '3 ações e 1 reação por turno, o que cada ícone significa, atividades, MAP, ações básicas e o que acontece se algo interrompe você.',
    source: 'Player Core pág. 414',
    aonUrl: 'https://2e.aonprd.com/Rules.aspx?ID=2335',
    relatedGuides: ['combat', 'checks', 'movement'],
    relatedLinks: [
      { label: 'Magias', to: '/compendio/magias' },
    ],
    sections: [
      {
        heading: 'O que você ganha no turno',
        body: `No modo encontro, no **início de cada turno** você recupera **3 ações** e **1 reação** para aquele round.

**1 ação** — coisa curta e fechada: Golpear, Caminhar, Interagir.
**2 ações** / **3 ações** — **atividade**: várias ações seguidas, sem misturar outra coisa no meio. Conjurar magia costuma ser atividade de 2 ações.
**Reação** — só com **gatilho**, no seu turno ou fora. Fora de combate o MJ decide com mais folga.
**Ação livre** — não gasta as 3 nem a reação. Sem gatilho: só no seu turno, como uma ação simples. Com gatilho: como reação.

Falar uma frase curta **não** gasta ação (o round são ~6 segundos). Mentir com Enganação já é ação própria.

Neste app o ícone no texto **é** o custo — não precisa estar escrito “1 ação” ao lado.`,
      },
      {
        heading: 'Uma coisa de cada vez',
        body: `Você só faz uma ação simples, atividade ou ação livre sem gatilho **por vez**. Terminou, começa a próxima. Carga Súbita diz Caminhar duas vezes e então Golpear: não dá para Interagir no meio do movimento.

Reação e ação livre **com gatilho** podem estourar no meio de outra ação.

Atividade gasta **todas** as ações de uma vez no seu turno. Se a primeira ação de Conjurar magia (3 ações) for **interrompida**, você perde as **3** ações comprometidas, o espaço e os custos; o efeito não sai.`,
      },
      {
        heading: 'Penalidade de ataques múltiplos (MAP)',
        body: `Toda ação com o traço **ataque** no **seu** turno conta: Golpe, ataque de magia, Empurrar, etc.

1º ataque: sem penalidade.
2º: **−5** (ágil **−4**).
3º e seguintes: **−10** (ágil **−8**).

A penalidade é da **arma deste** ataque, não das anteriores. Fora do seu turno (Golpe reativo) a MAP do turno **não** se aplica.`,
      },
      {
        heading: 'Ações básicas que todo mundo tem',
        body: `**Caminhar** (Stride) — até o seu Deslocamento; pode disparar reações a cada 1,5 m.
**Passo** (Step) — 1,5 m, **não** dispara reações de movimento; exige Deslocamento ≥ 3 m; não entra em terreno difícil.
**Golpe** (Strike) — 1 ação, traço ataque. Crítico: dano dobrado. Sucesso: dano. (Falha não lista efeito extra.)
**Interagir** — sacar, abrir porta, pegar item; traço manipular (dispara Golpe reativo se o inimigo tiver).
**Soltar** — ação livre; **não** dispara Golpe reativo, ao contrário da maioria das manipular.
**Levantar-se / Rastejar / Cair** — movimento.
**Buscar** (Seek) e **Sentir Motivação** — 1 ação, testes secretos de Percepção.
**Apoiar** (Aid) — reação: um aliado vai fazer teste ou ataque; você precisa ter preparado na sua vez. CD típica 15. Crítico +2 (perito +3, lendário +4); sucesso +1; falha crítica −1 no aliado.
**Preparar** (Ready) — 2 ações: escolhe uma ação simples e um gatilho; o turno acaba; se o gatilho vier antes do seu próximo turno, você usa como reação.
**Adiar** (Delay) — ação livre no início do turno: sai da iniciativa; volta no fim do turno de outra criatura. Não usa reações enquanto espera. Efeitos ruins do seu turno acontecem na hora; benefícios que acabariam no turno também acabam — não adianta Adiar para fugir disso.`,
      },
      {
        heading: 'Acelerado, lentificado, não pode agir',
        body: `**Acelerado** (quickened) e **lentificado** mudam quantas ações você **recupera no início** do turno — ganhar a condição no meio do turno **não** altera as ações daquele turno. A ação extra de pressa costuma valer só para Caminhar ou Golpear; **não** serve para uma atividade que **inclui** Golpe.
**Não pode agir:** nada de ações nem fala. Você ainda recupera as 3+1 no início do turno, salvo outra condição (ex.: atordoado) impedir.`,
      },
    ],
  },
  {
    id: 'checks',
    name: 'Testes e graus de sucesso',
    originalName: 'Checks and Degrees of Success',
    category: 'rules',
    summary:
      'd20 + modificador contra a CD, os quatro graus, 20 e 1 naturais, bônus que não somam, teste simples e pontos de herói.',
    source: 'Player Core págs. 400–413',
    aonUrl: 'https://2e.aonprd.com/Rules.aspx?ID=2263',
    relatedGuides: ['actions', 'hero-points', 'skills'],
    relatedLinks: [
      { label: 'Criar Personagem', to: '/personagens/novo' },
    ],
    sections: [
      {
        heading: 'Como se rola',
        body: `1. Rola d20 e lista modificadores, bônus e penalidades.
2. Soma tudo: esse é o resultado.
3. Compara com a **CD**. Igual ou maior = sucesso.
4. Vê o **grau** e aplica o efeito.

Quase todo teste soma um **atributo** e a **proficiência** (não treinado +0; treinado nível+2; perito +4; mestre +6; lendário +8).

CD de uma estatística sua (ex.: CD de Reflexos) = **10 + o modificador total** dessa estatística.`,
      },
      {
        heading: 'Os quatro graus',
        body: `**Sucesso crítico** — resultado ≥ CD **+10**. Em ataque, é acerto crítico.
**Sucesso** — ≥ CD.
**Falha** — abaixo da CD.
**Falha crítica** — falhou por **10 ou mais**.

Se o texto não lista crítico, o crítico vale o mesmo que sucesso (e falha crítica = falha).

**20 natural** sobe **um** grau em relação ao número puro. **1 natural** desce um grau. Isso **não** garante crítico: contra CD muito alta, 20 + modificador ainda pode ser só sucesso — ou falha, se ficar 10 ou mais abaixo da CD. Do outro lado, um 1 natural pode ser sucesso se o modificador for absurdo.

Se alguma habilidade também muda o grau, aplica **primeiro** o 20/1 natural.`,
      },
      {
        heading: 'Bônus e penalidades (não some iguais)',
        body: `Três tipos nomeados: **circunstância**, **item**, **status**. Tipos diferentes somam. Dois do **mesmo** tipo: fica só o **maior** (ou a pior penalidade do mesmo tipo).

Bônus e penalidade do **mesmo** tipo no mesmo teste **os dois** entram (heroísmo +1 de status e enjoado −2 de status: o heroísmo ainda ajuda).

Penalidade **sem tipo** (MAP, incremento de alcance) **sempre soma** com as outras sem tipo.`,
      },
      {
        heading: 'Teste simples, secreto, fortuna',
        body: `**Teste simples (flat check):** só o d20 contra a CD. Sem modificadores. CD ≤ 1 = sucesso automático; CD ≥ 21 = falha automática. Vários testes simples para a mesma coisa: rola uma vez, usa a CD **mais alta**.

**Teste secreto:** o MJ rola e descreve o efeito (Buscar, Recordar Conhecimento). Se você não sabe que o teste existe, não ativa fortuna; se sabe, avisa o MJ.

**Fortuna / infortúnio:** rerrolar, ou dois dados e fica o maior/menor. No máximo **um** de cada no mesmo teste; os dois juntos **se cancelam**. Ponto de herói para rerrolar é fortuna — não dá para gastar dois no mesmo teste.`,
      },
      {
        heading: 'Salvaguarda básica',
        body: `Quando o texto diz salvaguarda **básica** (comum em magias de dano em área):
**Crítico** — 0 dano.
**Sucesso** — metade.
**Falha** — dano cheio.
**Falha crítica** — dobro.`,
      },
      {
        heading: 'Pontos de herói',
        body: `Duram **só a sessão**. Em geral 1 no começo; máximo **3**. Gastar **não é ação**.

- **1 ponto:** rerrola um teste; fica o segundo resultado (fortuna — não dá para gastar dois no mesmo teste).
- **Todos os pontos** (mínimo 1), quando **morrendo** ia subir: sai de morrendo, 0 PV, **sem** ganhar ferido por isso.

Ritmo de premiação, gastar pelo companheiro e o que muda com regras míticas: guia **Pontos de herói**.`,
      },
    ],
  },
  {
    id: 'exploration',
    name: 'Exploração, descanso e o dia',
    originalName: 'Exploration, Rest, and Daily Preparations',
    category: 'rules',
    summary:
      'Os três modos de jogo, atividades de exploração, velocidade de viagem, as 8 horas de sono e a hora de preparar magias e itens.',
    source: 'Player Core págs. 398 e 438–439',
    aonUrl: 'https://2e.aonprd.com/Rules.aspx?ID=2440',
    relatedGuides: ['hazards', 'watches-rest', 'running-exploration'],
    relatedLinks: [
      { label: 'Magias', to: '/compendio/magias' },
      { label: 'Rituais', to: '/compendio/rituais' },
    ],
    sections: [
      {
        heading: 'Três modos',
        body: `**Encontro** — combate ou tensão; iniciativa; turnos de ~6 segundos; 3 ações e 1 reação.
**Exploração** — minutos ou horas; Deslocamento de viagem; uma **atividade de exploração** por personagem; descanso e preparações no ciclo do dia.
**Intervalo (downtime)** — dias: ganhar renda, criar item, aprender magia, retreinar, vender loot.`,
      },
      {
        heading: 'Como se explora',
        body: `Diga ao MJ o que você está fazendo em linhas gerais (“procuro armadilhas”), não cada movimento do punhal. Ele encaixa na atividade. Só caminhar = velocidade cheia da tabela. Muitas atividades caem para **metade**.

Velocidade típica em terreno plano (o livro usa pés e milhas): 25 pés = 250 pés/min, 2½ milhas/h, 20 milhas/dia. Terreno difícil = metade; terreno difícil maior = um terço.

**Evitar ser notado** — Furtividade, metade da velocidade. Se o combate começa assim, em geral você rola Furtividade no lugar de Percepção na iniciativa.
**Defender** — escudo erguido, metade da velocidade; se pinta combate, o benefício de Erguer Escudo já vale antes do seu 1º turno.
**Detectar magia** — conjura detectar magia de intervalo; metade da velocidade.
**Seguir o perito** — aliado perito+ numa perícia recorrente; você soma o nível como proficiência mesmo não treinado, mais +2/+3/+4 de circunstância (perito/mestre/lendário do aliado).
**Apressar-se** — dobro da velocidade; dura Constituição × 10 minutos (mínimo 10). No grupo, a duração usa o **menor** Con.
**Investigar** — Recordar Conhecimento secreto, metade da velocidade.
**Repetir magia** — a mesma magia (em geral um truque) de **2 ações ou menos**, na metade da velocidade.
**Explorar à frente (Scout)** — metade da velocidade; no próximo encontro **todo o grupo** ganha +1 de circunstância na iniciativa.
**Buscar** — Seek minucioso, em geral metade da velocidade.`,
      },
      {
        heading: 'Descanso',
        body: `Uma vez a cada **24 horas**, um período de descanso (tipicamente **8 horas**): você recupera PV iguais ao **modificador de Constituição (mínimo 1) × nível**, e certas condições melhoram.

Dormir de armadura = descanso ruim = **fatigado**. Mais de **16 horas** sem descansar também fatiga; essa fadiga só sai com **pelo menos 8 horas contínuas** de descanso.`,
      },
      {
        heading: 'Preparações diárias (~1 hora)',
        body: `Só depois de ter descansado, e **uma vez por dia**.

- Conjuradores recarregam espaços; preparados escolhem as magias do dia.
- Pontos de foco, usos diários e usos de item mágico resetam.
- Você veste armadura e arma o equipamento.
- **Investe** até **10** itens mágicos vestidos para ter os benefícios no dia.

Sem essa hora, mago não troca a lista e a reserva de foco não enche.`,
      },
      {
        heading: 'Aprender magia no intervalo',
        body: `Aprender magia é atividade de exploração/intervalo (1 hora por posto). No downtime você também retreina feitos e cria itens. O guia **Magias** tem a tabela de preço e CD.`,
      },
    ],
  },
  {
    id: 'combat',
    name: 'Combate, PV e ferimento',
    originalName: 'Encounter Mode, Damage, and Dying',
    category: 'rules',
    summary:
      'Iniciativa e o round, como o dano entra, cobertura e flanco, o que acontece em 0 PV, testes de recuperação, ferido, condenado e morte instantânea.',
    source: 'Player Core págs. 405–413 e 432–435',
    aonUrl: 'https://2e.aonprd.com/Rules.aspx?ID=2263',
    relatedGuides: ['actions', 'running-encounters', 'duels'],
    relatedLinks: [
      { label: 'Criar Personagem', to: '/personagens/novo' },
      { label: 'Magias', to: '/compendio/magias' },
    ],
    sections: [
      {
        heading: 'O encontro',
        body: `Quando cada ação conta, o jogo entra no **modo encontro**. O round vale **6 segundos**. Todo mundo rola iniciativa; o maior age primeiro. Empate com inimigo: o **inimigo** vai primeiro. Empate entre PCs: vocês combinam.

Na maioria das vezes a iniciativa é **Percepção**. Quem estava Evitando ser notado rola **Furtividade**. Encontro social pode pedir Enganação ou Diplomacia — em geral você ainda pode usar Percepção se preferir.

Não se rola de novo no round seguinte. **Adiar** muda o seu lugar na ordem; **Preparar** não muda.

No **início do turno**: efeitos com duração em rounds perdem 1 round; se você está morrendo, rola recuperação; cura rápida/regeneração; por último você recupera **3 ações e 1 reação** (não guarda a reação do turno anterior).
No **fim do turno**: efeitos que duram até o fim do turno acabam; dano persistente, depois o teste simples para sair dele; salvaguardas de aflição; condições como amedrontado baixam.`,
      },
      {
        heading: 'Como o dano entra',
        body: `1. Rola os dados (arma, golpe desarmado ou magia) e soma modificadores.
2. Define o **tipo** (contundente, fogo, espírito…).
3. Aplica **imunidade**, depois **fraqueza**, depois **resistência**.
4. O que sobrar tira PV 1 por 1. Ninguém cai abaixo de 0.

Corpo a corpo costuma somar Força. Arremesso também; arma **propulsiva** soma metade da Força. Magia e bomba, em geral, **não** somam atributo.

Penalidades que zerariam o dano ainda deixam **1** de dano. Crítico ou metade (salvaguarda básica): rola normal, **depois** dobra ou divide (arredonda para baixo; metade de 1 continua 1). Extra do traço fatal **não** dobra.

**Dano persistente** não entra na hora: no fim do seu turno você toma o dano e faz um teste simples **CD 15** para sair. **Sangramento** acaba sozinho se você curar até o máximo de PV.

**Não letal:** arma com o traço já nocauteia em 0 PV, sem morrendo. Usar arma letal como não letal (ou o contrário) dá **−2** de circunstância no ataque.`,
      },
      {
        heading: 'Cobertura, flanco e desprevenido',
        body: `**Desprevenido** (off-guard) = **−2** de circunstância na CA.

**Cobertura:**
- leve (em geral outra criatura no caminho): +1 na CA; **não** dá para Esconder.
- padrão: +2 na CA, Reflexos de área e Furtividade; dá para Esconder.
- maior (ação **Abrigar-se**): +4 nos mesmos.

**Flanco:** você e um aliado em lados opostos, os dois podendo agir, com ataque corpo a corpo (ou desarmado) no alcance. O alvo fica desprevenido **só** contra os ataques corpo a corpo de quem flanqueia — não contra magia à distância.`,
      },
      {
        heading: '0 PV: nocaute e morrendo',
        body: `Monstro comum em 0 PV **morre** (ou fica fora se o golpe foi não letal). Morto-vivo e construto em 0 são **destruídos**.

PC, companheiro e criatura importante **não** morrem na hora. Você:
- vai para a iniciativa **logo antes** de quem te derrubou;
- ganha **morrendo 1** (ou **2** se o golpe foi crítico do atacante ou falha crítica sua);
- se já estava **ferido**, soma o valor de ferido no morrendo;
- dano **não letal:** inconsciente em 0 PV, **sem** morrendo.

Morrendo 4 = morte. Enquanto tem a condição, você está inconsciente.`,
      },
      {
        heading: 'Recuperação, ferido e condenado',
        body: `No início de cada turno morrendo: teste simples CD **10 + valor atual de morrendo**.
**Crítico:** −2 no valor. **Sucesso:** −1. **Falha:** +1. **Falha crítica:** +2.

Tomar dano **já morrendo:** +1 no valor (+2 se foi crítico do atacante ou falha crítica sua).

Chegou em morrendo 0: perde a condição. Se ainda está em 0 PV, continua inconsciente. Qualquer cura que te ponha em **1 PV ou mais** tira morrendo e inconsciente; você age no **próximo** turno.

**Toda vez** que perde morrendo, ganha **ferido 1** (ou o ferido sobe 1). Na próxima queda, o ferido entra no morrendo. Ferido sai com **Tratar ferimentos** com sucesso, ou PV cheios **e** 10 minutos de descanso.

**Condenado** (doomed) reduz o máximo de morrendo: condenado 1 morre em morrendo 3. Se o máximo cair a 0, você morre na hora. Cai 1 a cada noite de descanso.

**Primeiros socorros** (2 ações, kit de curador): estabilizar = Medicina contra **5 + CD de recuperação** (em geral 15 + valor de morrendo). Sucesso tira morrendo (continua inconsciente). Falha crítica: +1 em morrendo.

**Ponto de herói:** gastar **todos** (mínimo 1) quando o morrendo ia subir tira a condição, 0 PV, **sem** ganhar ferido por isso. Detalhe no guia de pontos de herói.`,
      },
      {
        heading: 'Morte na hora',
        body: `Traço **morte**, dano maciço (golpe ≥ dobro dos PV máximos) e o que acontece depois de morto: guia **Traço morte**. *Reviver os Mortos* e o ritual *Ressuscitar* existem — com risco.`,
      },
    ],
  },
  {
    id: 'skills',
    name: 'Perícias: treino, testes e o que cada uma faz',
    originalName: 'Skills',
    category: 'rules',
    summary:
      'Como você fica treinado, aumentos de perícia, CDs simples, penalidade de armadura, Recordar Conhecimento e Tratar ferimentos.',
    source: 'Player Core págs. 225–242',
    aonUrl: 'https://2e.aonprd.com/Rules.aspx?ID=2134',
    relatedGuides: ['feats', 'social', 'setting-dcs'],
    relatedLinks: [
      { label: 'Criar Personagem', to: '/personagens/novo' },
      { label: 'Origens', to: '/compendio/origens' },
      { label: 'Classes', to: '/compendio/classes' },
    ],
    sections: [
      {
        heading: 'De onde vem o treino',
        body: `Atributo é talento cru; perícia é treino. No 1º nível você em geral fica treinado em duas perícias da **origem**, algumas fixas da **classe** e várias **à escolha** da classe.

Ficou treinado **duas vezes** na mesma (origem e classe)? A segunda vira treino em **outra** perícia à escolha — se a duplicata era um **Conhecimento**, a nova também tem de ser Conhecimento.

Ações da perícia se dividem em **não treinado** (qualquer um) e **treinado** (só T ou melhor). O MJ pode exigir grau mais alto para um uso específico.`,
      },
      {
        heading: 'Subir de grau e feitos de perícia',
        body: `A classe lista os níveis de **aumento de perícia** e de **feito de perícia**.

Aumento: treinar uma nova **ou** subir uma que você já tem. Treinado → perito **em qualquer nível**; perito → mestre só no **7º+**; mestre → lendário só no **15º+**.

Duas fontes te deixando perito (ou mestre/lendário) na **mesma** perícia: a segunda **não** vira outra perícia — some.

Feito de perícia é feito geral com o traço **skill**. Detalhe no guia de feitos.`,
      },
      {
        heading: 'O número na ficha',
        body: `**Modificador** = atributo-chave + bônus de proficiência + outros bônus − penalidades.
**CD da perícia** = 10 + esse modificador.

Não treinado: proficiência **+0**. Treinado: nível+2; perito +4; mestre +6; lendário +8.

CDs simples (para ter noção do que o MJ pede): não treinado **10**, treinado **15**, perito **20**, mestre **30**, lendário **40**.

**Armadura:** a penalidade de perícia da armadura entra em testes e CDs de **Força e Destreza**, salvo ação com o traço **ataque**.`,
      },
      {
        heading: 'As 17 perícias',
        body: `**Acrobacia** (Des) · **Arcanismo** (Int) · **Atletismo** (For) · **Ofício** (Int) · **Enganação** (Car) · **Diplomacia** (Car) · **Intimidação** (Car) · **Conhecimento** (Int, um assunto) · **Medicina** (Sab) · **Natureza** (Sab) · **Ocultismo** (Int) · **Performance** (Car) · **Religião** (Sab) · **Sociedade** (Int) · **Furtividade** (Des) · **Sobrevivência** (Sab) · **Prestidigitação** (Des).

O MJ pode trocar o atributo se a cena pedir.`,
      },
      {
        heading: 'Recordar Conhecimento',
        body: `1 ação, não treinado. Você sugere a perícia e **uma** pergunta. O MJ define a CD. Coisa básica (“o que é isso?”) às vezes nem pede teste.

**Crítico:** resposta verdadeira + contexto extra ou uma pergunta de seguimento.
**Sucesso:** resposta verdadeira.
**Falha crítica:** informação **errada** (ou o MJ trata como falha).

Arcanismo, Ofício, Conhecimento, Medicina, Natureza, Ocultismo, Religião e Sociedade são as clássicas. Conhecimento específico costuma ter CD **mais baixa**. A pergunta tem de ser sobre o mundo — não o número exato no bloco do monstro.

Muitos usos são **secretos**: o MJ rola.`,
      },
      {
        heading: 'Medicina na mesa',
        body: `**Primeiros socorros** (2 ações, kit de curador): estabilizar quem está morrendo, ou ajudar a parar sangramento. CD de estabilizar = **5 + CD de recuperação**. Sucesso tira morrendo (continua inconsciente). Falha crítica: +1 em morrendo.

**Tratar ferimentos** (treinado, 10 minutos, exploração): um vivo (pode ser você). Imune a outro Tratar por **1 hora** (o tempo do tratamento **conta** — dá para tratar 1× por hora, não a cada 70 min). CD típica **15**. Perito pode tentar CD 20 (+10 PV); mestre CD 30 (+30); lendário CD 40 (+50). O dano da falha crítica não muda.

**Sucesso:** 2d8 PV e **tira ferido**. **Crítico:** 4d8 e tira ferido. **Falha crítica:** 1d8 de dano. Uma hora contínua no mesmo alvo **dobra** os PV recuperados.

Feitos como Recuperação Contínua e Médico de Enfermaria deixam isso mais rápido / em mais alvos.`,
      },
    ],
  },
  {
    id: 'magic-items',
    name: 'Itens mágicos: investir, ativar e runas',
    originalName: 'Magic Items',
    category: 'rules',
    summary:
      'Investir até 10 itens vestidos, ativar, identificar magia, runas fundamentais, pergaminho, varinha, cajado, poção e item ápice.',
    source: 'GM Core págs. 219–220 e Player Core pág. 230',
    aonUrl: 'https://2e.aonprd.com/Rules.aspx?ID=3135',
    relatedGuides: ['relics', 'building-items', 'intelligent-items'],
    relatedLinks: [
      { label: 'Equipamento', to: '/compendio/equipamento' },
      { label: 'Magias', to: '/compendio/magias' },
    ],
    sections: [
      {
        heading: 'Três jeitos de um item “funcionar”',
        body: `**Constante** — basta vestir/empunhar (e investir, se tiver o traço). Cristal de luz eterna ilumina; arma flamejante soma fogo no dano. Sem ação extra.

**Investido** — o traço **invested** amarra o item ao seu potencial. Sem investir: o chapéu ainda tapa chuva, a armadura **+1 resiliente** ainda dá o bônus de item na CA, mas **não** o bônus mágico em salvaguardas; sandálias aladas ainda calçam, mas não voam. Item mundano não precisa investir.

**Ativar** — o bloco lista o custo em ação. Consumível gasta o item. Ativação não é sempre mágica (beber elixir alquímico em geral não é).`,
      },
      {
        heading: 'Investir (máximo 10 por dia)',
        body: `Você investe ao vestir: 1 ou mais ações de Interagir, em geral o mesmo tempo de vestir. Vale até **tirar** o item. Tirou: perde o investimento, **mas ainda conta** no limite do dia. O limite zera nas **preparações diárias**; o que você ainda está vestindo costuma poder permanecer investido, e conta de novo no 10.

**10** é o teto do PC (o feito Investidura Incrível sobe para 12). Armadura **com qualquer runa** ganha o traço investido.

Companheiro animal/familiar: limite **2**, e **ele** investe — você usa Investir um item junto com ele. Companheiro **não** ativa item.`,
      },
      {
        heading: 'Ativar',
        body: `Só ativa item investido se **você** o investiu. Traço **manipular**: empunhado, ou mão livre no item vestido.

Usos por dia resetam nas preparações e são **do item**: outro dono no mesmo dia não ganha uso extra.

Interrompido: você perde as ações; se tinha limite diário, **o uso conta mesmo assim**.

“Ativar: Conjurar magia” = as ações da magia, na sua lista, com o seu ataque/CD. Precisa da característica de conjuração da classe.`,
      },
      {
        heading: 'Identificar magia',
        body: `Atividade treinada, **10 minutos**, perícia da tradição: Arcanismo (arcana), Natureza (primal), Ocultismo (oculta), Religião (divina). Item só com o traço **mágico** (sem tradição) aceita qualquer uma dessas. Tradição “errada” pode, com CD mais alta, se o MJ deixar.

**Crítico:** nome, o que faz, como ativar, se é amaldiçoado.
**Sucesso:** ideia do efeito e como ativar (item/lugar); em efeito contínuo, nome e o que faz. Não tenta de novo só para criticar.
**Falha:** espera 1 dia.
**Falha crítica:** identifica **errado**.

Pergaminho ou varinha de magia **comum da sua lista** (ou que você conhece): 1 ação de Recordar Conhecimento, sucesso automático. Senão, Identificar magia.`,
      },
      {
        heading: 'Runas em arma, armadura e escudo',
        body: `**Fundamentais** — o básico:
- potência de arma: bônus de item no ataque + quantas runas de propriedade cabem;
- golpe (striking): dados extras de dano da arma;
- potência de armadura: sobe o bônus de item na CA + limite de propriedade;
- resiliente: bônus de item em salvaguardas;
- reforço (escudo): Dureza, PV e limiar de quebrado.

**Propriedade** (fogo, resistência a energia…): o máximo é o **número da potência**. +1 = 1 propriedade. Golpe e resiliente **não** ocupam esse espaço. Escudo **não** leva propriedade, só reforço.

Roupa de explorador pode receber runa de armadura, mas não runa que pede categoria leve/média/pesada. Arma específica (kukri sangrento etc.) **não** ganha propriedade; fundamentais ainda entram.

Desarmado: **envoltórios de golpes poderosos** (ou similar), não runa solta na mão.

Transferir runa é Ofício (item mágico), 1 dia, 10% do preço da runa (de um runestone é de graça).`,
      },
      {
        heading: 'Pergaminho, varinha, cajado, poção',
        body: `**Poção** — 1 ação de Interagir; beber ou dar a alguém disposto (ou indefeso) no alcance; em geral uma mão.

**Pergaminho** — uma magia, um posto, uma vez; truque, foco e ritual **não** entram. Precisa estar na sua lista; você conjura com o seu ataque/CD. Custo material já foi pago na criação; **locus** você ainda precisa ter.

**Varinha** — a magia **1×/dia**, na sua lista. Depois pode **sobrecarregar**: conjura de novo e faz teste simples **CD 10**. Sucesso: varinha **quebrada**. Falha: **destruída**. Segunda sobrecarga no mesmo dia: destrói e a magia **não** sai. Truque, foco e ritual não entram em varinha.

**Cajado** — nas preparações ele ganha cargas iguais ao **maior posto de espaço** que você tem (só se pelo menos uma magia do cajado está na sua lista; um cajado por pessoa por dia). Gastar cargas = posto da magia. Truque do cajado não gasta carga. Preparado pode gastar **um** espaço no dia para somar cargas iguais ao posto. Espontâneo pode gastar **1 carga + um espaço** para conjurar magia daquele posto (ou menor) da lista do cajado.`,
      },
      {
        heading: 'Ápice (um só)',
        body: `Item com o traço **apex**, ao investir: o modificador de um atributo sobe **+1** ou vai a **+4**, o que for melhor — e você ganha o pacote (Inteligência = perícia extra e idioma; Constituição = mais PV). Só a **primeira** vez que investir aquele item em 24 horas. **Um** ápice por vez: o segundo não sobe atributo, mas o resto do item ainda investe.`,
      },
    ],
  },
  {
    id: 'conditions',
    name: 'Condições que mudam o seu estado',
    originalName: 'Conditions',
    category: 'rules',
    summary:
      'O que significa desprevenido, caído, agarrado, amedrontado, drenado e as outras condições que mais aparecem na mesa — com o número que cada uma carrega.',
    source: 'Player Core págs. 442–447',
    aonUrl: 'https://2e.aonprd.com/Conditions.aspx',
    relatedGuides: ['combat', 'afflictions', 'actions'],
    relatedLinks: [
      { label: 'Criar Personagem', to: '/personagens/novo' },
    ],
    sections: [
      {
        heading: 'Como ler uma condição',
        body: `Condição é um estado: muda estatística, o que você pode fazer, ou os dois. A mesma condição **não empilha** — fica o valor **maior** (ou a duração mais longa).

Muitas vêm com um **número**: amedrontado 2, drenado 1. A penalidade de **status** costuma ser igual a esse número. Morrendo, ferido e condenado estão no guia de combate.`,
      },
      {
        heading: 'Defesa e posição',
        body: `**Desprevenido** (off-guard) — −2 de circunstância na CA. Pode valer só contra alguns ataques; se o texto não limitar, vale contra tudo.
**Caído** (prone) — desprevenido e −2 de circunstância nos ataques. Só pode **Rastejar** ou **Levantar-se**. Abrigar-se no chão dá cobertura **maior** contra ataques à distância (+4 na CA), mas você continua desprevenido. Derrubado no ar ou escalando = queda. Nadando não cai.
**Imobilizado** — nada com o traço movimento. Se algo te segura e uma força tenta te arrancar, ela testa contra a CD do efeito (em geral Fortitude da criatura).
**Agarrado** — desprevenido + imobilizado. Ação **manipular**: teste simples CD 5 ou a ação se perde.
**Contido** (restrained) — desprevenido + imobilizado; só Escape ou Forçar abertura. Substitui agarrado.
**Paralisado** — desprevenido; só age com a mente (Recordar Conhecimento, etc.). Não Busca.`,
      },
      {
        heading: 'Atributos e medo',
        body: `**Amedrontado** — penalidade de status igual ao valor em **todos** os testes e CDs. Cai 1 no **fim** de cada turno, salvo o texto.
**Desajeitado** (clumsy) — penalidade de status em rolagens e CDs de Destreza: CA, Reflexos, ataque à distância, Acrobacia, Furtividade, Prestidigitação.
**Enfraquecido** (enfeebled) — o mesmo para Força: ataque e dano corpo a corpo de Força, Atletismo.
**Atordoado mental** (stupefied) — Inteligência, Sabedoria e Carisma: Vontade, ataque/CD de magia, perícias mentais. Conjurar: teste simples CD **5 + valor** ou a magia é interrompida.
**Drenado** — penalidade de status em testes/CDs de Constituição (Fortitude). Perde PV iguais a **nível × valor** (mínimo 1) e o **máximo** de PV cai o mesmo tanto — isso **não** é dano. Cada noite de descanso: −1 no valor (o máximo sobe; os PV perdidos **não** voltam sozinhos).
**Enjoado** — penalidade de status em todos os testes e CDs; não ingere poção/elixir por vontade. 1 ação de vomitar: Fortitude contra a CD do efeito; sucesso −1, crítico −2.
**Fadiga** — −1 de status na CA e salvaguardas; sem atividade de exploração **enquanto viaja**. Sai com uma noite de descanso.`,
      },
      {
        heading: 'Ações a mais ou a menos',
        body: `**Acelerado** — +1 ação no **início** do turno (muitas vezes só para Caminhar ou Golpear). Ganhar no meio do turno **não** dá ação na hora. Várias fontes: a ação extra serve para **qualquer** uso permitido por **uma** delas.
**Lentificado** — no início do turno você recupera menos ações iguais ao valor. Ganhar no meio do turno não tira as ações daquele turno.
**Atordoado** (stunned) com valor: cada início de turno você perde ações e o valor cai o tanto perdido (atordoado 4: perde 3, fica 1; no turno seguinte perde 1 e ainda tem 2 ações). Pode ser duração (“1 minuto”) em vez de número. **Substitui** lentificado; ações já perdidas para atordoado **contam** no lentificado quando o atordoado acaba.
**Não pode agir** — nada, nem fala. Ver o guia de ações.`,
      },
      {
        heading: 'Sentidos, fogo e controle',
        body: `**Cego** — terreno normal vira difícil; falha crítica automática em Percepção que precise de visão; −4 de status em Percepção se visão é o único sentido preciso. Imune a efeitos visuais. Substitui ofuscado.
**Ofuscado** — se visão é o único preciso, tudo fica **oculto** (teste simples CD 5 para acertar).
**Surdo** — falha crítica em Percepção que precise de ouvido; −2 de status na iniciativa e em testes que misturam som. Ação com traço **auditivo**: CD 5 ou se perde. Imune a efeitos auditivos.
**Oculto** (concealed) — observado, mas quem te mira faz CD **5** (área ignora).
**Confuso** — desprevenido, sem aliados, sem Adiar/Preparar/reação. Gasta as ações atacando ao acaso (truque ofensivo vale). Sem alvo: acerta a si, sem crítico. Cada dano de ataque ou magia: CD 11 para sair.
**Fascinado** — −2 de status em Percepção e perícias; só concentra no assunto da fascinação. Ação hostil contra você ou aliado encerra.
**Fugindo** — todas as ações para escapar da fonte; sem Adiar/Preparar.
**Dano persistente** — no **fim** do turno, depois CD **15** para sair. Ajuda adequada (2 ações) pode dar outro teste (CD 10 se for muito certa, ou acabar na hora — água no fogo). Sangramento acaba em PV cheios. Dois persistentes do **mesmo** tipo: fica o maior.`,
      },
    ],
  },
  {
    id: 'perception',
    name: 'Percepção, luz e furtividade',
    originalName: 'Perception and Detection',
    category: 'rules',
    summary:
      'Observado, escondido, não detectado e despercebido; luz fraca e escuridão; visão no escuro; o que o teste simples CD 5 e CD 11 realmente fazem.',
    source: 'Player Core pág. 432',
    aonUrl: 'https://2e.aonprd.com/Rules.aspx?ID=2400',
    relatedGuides: ['conditions', 'combat', 'exploration'],
    relatedLinks: [
      { label: 'Ancestralidades', to: '/compendio/ancestralidades' },
    ],
    sections: [
      {
        heading: 'Quatro estados (relativos a quem olha)',
        body: `**Observado** — sentido **preciso** (visão normal) te pega sem trava. Ainda pode estar **oculto**.
**Escondido** (hidden) — você sabe o **espaço**, pouco mais. Fica **desprevenido** contra ele. Para acertar: teste simples **CD 11** **antes** da rolagem; falhou = efeito nenhum, ações e espaço já gastos. Área ignora o teste.
**Não detectado** — você **não** sabe o espaço; desprevenido; para chutar um quadrado o MJ rola o CD 11 **e** o ataque em segredo e não diz por que errou. Área acerta normalmente. **Buscar** costuma tornar escondido, não observado.
**Despercebido** (unnoticed) — a criatura nem sabe que você existe. Também está não detectada. Importa para habilidades que pedem alvo totalmente alheio.

Invisível é a exceção: o estado **não** é relativo — a condição é a mesma. O resto muda de observador para observador (você vê, o aliado não).`,
      },
      {
        heading: 'Luz',
        body: `Três níveis. Sem aviso, assume-se **luz plena**.
**Luz plena** — visão média observa.
**Luz fraca** (sombra, tocha no limite) — criaturas e objetos ficam **ocultos**, salvo visão na penumbra, visão no escuro ou outro sentido preciso que não seja visão. Fonte de luz: raio de luz plena, e luz fraca até o **dobro**.
**Escuridão** — escondido ou não detectado, salvo visão no escuro ou outro preciso. Sem isso, você está **cego** na escuridão, mas ainda observa o que está **iluminado** além. Sair do escuro para a luz plena pode **ofuscar** um pouco (MJ).`,
      },
      {
        heading: 'Sentidos precisos, imprecisos, vagos',
        body: `**Preciso** (visão média) — único jeito de observar sem penalidade. Hide e ambiente ainda pedem **Buscar**.
**Impreciso** (audição média) — no máximo **escondido**, nunca observado. Em sala barulhenta pode nem isso.
**Vago** (olfato típico) — no máximo **não detectado**; não esconde nem observa.

O MJ usa o sentido **mais preciso** disponível. Visão no escuro e visão no escuro maior: enxergam no escuro e na penumbra, **preto e branco**. Escuridão mágica de 4º posto bloqueia visão no escuro normal; a **maior** atravessa. Visão na penumbra: luz fraca = luz plena (ignora oculto da penumbra).

Faros (scent) em geral é vago, com alcance listado. Tremorsense em geral é impreciso, só na mesma superfície, e só se o alvo se move nela.`,
      },
      {
        heading: 'Invisível e furtividade',
        body: `Invisível = **não detectado** para quem só tem visão como preciso. Outro preciso ignora. Se alguém **já te via** quando você ficou invisível, começa **escondido** até você **Esgueirar**. **Buscar** contra sua CD de Furtividade te deixa escondido até o próximo Esgueirar. Pegadas na neve, rede por cima: o MJ pode te deixar escondido ou observado-oculto.

**Esconder** (Hide) e **Esgueirar** (Sneak) são Furtividade. **Criar uma distração** (Enganação) também tira olhares. Cobertura **leve** (outra criatura) **não** basta para Esconder — precisa padrão ou maior. Detalhe de cobertura no guia de combate.`,
      },
    ],
  },
  {
    id: 'movement',
    name: 'Movimento, terreno e queda',
    originalName: 'Movement, Terrain, and Falling',
    category: 'rules',
    summary:
      'Deslocamento, terreno difícil, diagonal, tamanho e alcance, atravessar criatura, movimento forçado e o dano de cair.',
    source: 'Player Core págs. 420–428',
    aonUrl: 'https://2e.aonprd.com/Rules.aspx?ID=2345',
    relatedGuides: ['actions', 'combat', 'aerial-combat'],
    relatedLinks: [
      { label: 'Companheiros', to: '/compendio/companheiros' },
    ],
    sections: [
      {
        heading: 'Deslocamento',
        body: `**Speed** sem tipo = chão. **Caminhar** usa esse número. Penalidade não baixa de **1,5 m** (5 pés), salvo o texto.

Trocar de tipo (escalar → andar) = termina uma ação e começa outra. **Passo** só no chão — não com escavar, voar, nadar, escalar.

**Escalar / nadar** com Deslocamento próprio: sucesso automático até esse valor, +4 de circunstância se rolar Atletismo (quer crítico). Ainda testa em teto, água brava, etc. Com climb Speed você **não** fica desprevenido escalando. Nadar para cima/baixo = terreno difícil. Ter swim Speed **não** é respirar na água.

**Voar:** ações Voar e Interromper a queda. Vento contra = terreno difícil (ou maior se também sobe). Vento a favor: 3 m gastos valem 6 m (não soma com descer em linha).

**Escavar** em geral **não** deixa túnel. Muitos precisam prender a respiração.`,
      },
      {
        heading: 'Grade, diagonal e reações',
        body: `Quadrado de 2,5 cm no mapa = **1,5 m**. Primeira diagonal no turno = 1,5 m; a segunda = 3 m; alterna. A conta é do **turno inteiro**, zera no fim.

Ação com traço **movimento** pode disparar reação **a cada 1,5 m** que você **sai** do alcance de alguém (no máximo uma vez por ação de movimento, por criatura). **Passo** não dispara. Movimento **forçado** (Empurrar, queda) também não dispara reação de movimento.

**Golpe reativo** (se a classe tiver): gatilho é manipular, movimento, ataque à distância, ou sair de um quadrado no meio do movimento. Crítico num gatilho **manipular** interrompe a ação. **Não** conta para MAP nem sofre MAP.`,
      },
      {
        heading: 'Terreno',
        body: `**Difícil** — entrar no quadrado custa **+1,5 m**. **Difícil maior** — **+3 m**. O extra **não** dobra na diagonal. **Não** dá para Passar em terreno difícil. Pulo ignora o terreno por cima. Ignorar difícil ainda trata difícil maior como difícil comum.

**Perigoso** — dano ao atravessar (ácido, brasas).
**Estreito / irregular** — Equilíbrio (Acrobacia); mesmo no sucesso você está desprevenido. Levar hit ou falhar salvaguarda: Reflexos na mesma CD ou cai (estreito) / cai de bruços (irregular).
**Inclinação** — Atletismo para subir; desprevenido enquanto escala.`,
      },
      {
        heading: 'Tamanho, espaço, atravessar',
        body: `Miúdo: <1,5 m, alcance 0. Pequeno/Médio: 1,5 m, alcance 1,5 m. Grande: 3 m (alto alcance 3 m; longo 1,5 m). Enorme: 4,5 m. Colossal: 6 m+.

Miúdo com alcance 0 precisa **compartilhar** o espaço para atacar. Vários miúdos cabem no mesmo quadrado.

Atravessa **disposto**. Indisposto: **Tumbling Through**. Não termina o **turno** no espaço de outro; pode terminar uma ação de movimento lá se a **próxima** já sair. Três tamanhos maior/menor: atravessa, mas não termina lá. Miúdo atravessa e **pode** terminar no espaço de outro.

Caído disposto, inconsciente ou morto, do seu tamanho ou menor: você pode ocupar o espaço. Ele não levanta enquanto você estiver em cima — Rasteja ou Empurra.

**Forçado:** o efeito define a distância, não o seu Speed. Se não cabe, para no último espaço válido. Empurrão/puxão pode te jogar em perigo; teleporte/reposição em geral **não**, salvo o texto.`,
      },
      {
        heading: 'Queda',
        body: `Caiu mais de **1,5 m**: dano contundente = **metade da distância** em pés (queda de 10 pés = 5 de dano). Teto 1.500 pés = 750 de dano. Qualquer dano da queda = **caído**. ~500 pés no 1º round, ~1.500 depois.

**Agarrar a borda** (reação) reduz em algumas quedas. Com fly Speed: **Interromper a queda**. Água, neve ou coisa macia: trata como 20 pés mais curta (30 se pulou de propósito), sem passar da **profundidade**.

Cair **em** criatura: ela faz Reflexos CD 15. Crítico 0; sucesso ¼ do seu dano de queda; falha metade; falha crítica o mesmo tanto. Acertar de propósito depois de queda longa é quase impossível.`,
      },
    ],
  },
  {
    id: 'equipment',
    name: 'Armadura, arma, escudo e carga',
    originalName: 'Armor, Weapons, Shields, and Bulk',
    category: 'rules',
    summary:
      'Como montar a CA, vestir armadura, Erguer Escudo, Bloquear com Escudo, o ataque da arma e o que acontece se você carrega Bulk demais.',
    source: 'Player Core págs. 267–282',
    aonUrl: 'https://2e.aonprd.com/Rules.aspx?ID=2143',
    relatedGuides: ['combat', 'objects', 'actions'],
    relatedLinks: [
      { label: 'Equipamento', to: '/compendio/equipamento' },
    ],
    sections: [
      {
        heading: 'Moedas e Bulk',
        body: `1 platina = 10 po = 100 prata = 1.000 cobre. Prata é o padrão do dia a dia; ouro compra magia. Gema, obra de arte e matéria-prima vendem pelo **preço cheio**; o resto, em geral **metade**.

**Bulk** mistura peso e desajeito. Limite confortável: **5 + Força**. Acima disso: **sobrecarregado** (desajeitado 1 e −3 m em todos os Deslocamentos, mínimo 1,5 m). Teto absoluto: **10 + Força**.

10 itens **leves** (L) = 1 Bulk (arredonda para baixo: 9 leves = 0). **Desprezível** (—) só conta em quantidade absurda. 1.000 moedas = 1 Bulk.

Carregado / vestido / guardado na mochila. **Empunhar** = mãos certas, pronto para usar. Sacar item vestido = Interagir; poção no cinto = 1 ação sacar + 1 beber. **Trocar** (guardar um e sacar outro) é 1 Interagir. Soltar = ação livre.`,
      },
      {
        heading: 'CA e armadura',
        body: `**CA** = 10 + Destreza (**até o Dex Cap** da armadura) + proficiência (categoria ou o tipo específico; sem armadura = defesa desarmada) + bônus de **item** da armadura + outros bônus − penalidades.

Vestir: 1 minuto (leve) ou 5 minutos (média/pesada). Tirar: 1 minuto.

**Penalidade de teste** da armadura: perícias de Força e Destreza, salvo traço **ataque**. **Penalidade de Speed:** todos os deslocamentos, mínimo 1,5 m. Se sua Força **≥ limiar** da armadura: some a penalidade de teste e a de Speed cai 1,5 m.

Armadura **quebrada** ainda dá o bônus de item na CA, com penalidade de status: −1 leve, −2 média, −3 pesada. O Dex Cap e as outras penalidades continuam.`,
      },
      {
        heading: 'Escudo',
        body: `Tem de estar **empunhado**. O bônus na CA só existe depois de **Erguer Escudo** (1 ação): bônus de **circunstância** até o **início** do seu próximo turno. Penalidade de Speed vale **sempre** que segura, erguido ou não.

Escudo comum ocupa a mão (correia no braço). Broquel **não** ocupa a mão: Erguer com a mão livre (ou, a critério do MJ, com objeto leve que não seja arma).

Torre erguida: **Abrigar-se** sobe o bônus de circunstância para **+4**. Se você daria cobertura leve, torre erguida vira cobertura **padrão** para quem está atrás.

**Bloquear com Escudo** (reação, se a classe/feito der): reduz o dano na **Dureza**; o resto divide entre você **e** o escudo.

Escudo **não** recebe runa de arma. Umbo ou espinhos no escudo são arma e **esses** podem levar runa.`,
      },
      {
        heading: 'Ataque e dano da arma',
        body: `Corpo a corpo: d20 + Força (ou Destreza se **finesse**) + proficiência.
À distância: d20 + Destreza + proficiência.

Dano corpo a corpo: dado + Força. À distância: em geral **sem** atributo; arremesso soma Força; **propulsiva** soma metade (ou a Força inteira se for negativa). Runa de golpe adiciona dados do **mesmo** tamanho. Crítico: dano dobrado.

MAP: segundo −5, demais −10; ágil −4/−8; fora do turno não aplica. Detalhe no guia de ações.`,
      },
    ],
  },
  {
    id: 'downtime',
    name: 'Intervalo: ofício, renda e retreino',
    originalName: 'Downtime',
    category: 'rules',
    summary:
      'O modo dia a dia: ganhar renda, Fabricar item, retreinar feito e perícia, descanso longo, custo de vida e o que você não pode trocar.',
    source: 'Player Core págs. 228, 237 e 440',
    aonUrl: 'https://2e.aonprd.com/Rules.aspx?ID=2444',
    relatedGuides: ['skills', 'crafting', 'running-downtime'],
    relatedLinks: [
      { label: 'Equipamento', to: '/compendio/equipamento' },
      { label: 'Criar Personagem', to: '/personagens/novo' },
    ],
    sections: [
      {
        heading: 'O que é o intervalo',
        body: `Modo **dia a dia**, em geral na cidade: descansar de verdade, fabricar, trabalhar, aprender magia, retreinar, vender loot, se divertir. Atividades vêm de feitos, perícias e do que o povoado oferece.

**Descanso longo:** um dia **e** uma noite inteiros = PV iguais a Constituição (mínimo 1) × **o dobro** do nível.

Comprar/vender com calma costuma gastar **1 dia** (mais se o lote é grande ou o item é caro). Preço cheio para comprar; **metade** para vender — moeda, gema, arte e matéria-prima saem pelo valor cheio.`,
      },
      {
        heading: 'Ganhar renda',
        body: `Precisa estar **treinado** na perícia. Ofício, Conhecimento e Performance são as mais estáveis; outra perícia pode, com CD em geral mais alta.

O MJ define o **nível da tarefa**. Depois do 1º dia você testa (CD secreta). Os dias seguintes **não** rolam de novo: repetem o pagamento até o serviço acabar (em geral 1–2 semanas).

**Crítico:** paga como tarefa de **nível +1**. **Sucesso:** coluna da sua proficiência naquele nível. **Falha:** coluna de falha (o MJ provavelmente encurta o emprego). **Falha crítica:** zero, demitido, reputação sofrendo.

Tabela 4–2 do Player Core: tarefa 1º treinado = 2 prata/dia; 5º perito = 1 po/dia; 20º lendário no crítico = 300 po. Não copie a tabela inteira — o MJ tem o livro.

Parou no meio: em geral precisa **achar outro** serviço (~1 dia). Aventura no meio: o MJ pode deixar você voltar no mesmo teste (bom você guarda; ruim você **não** rerrola para melhorar).`,
      },
      {
        heading: 'Fabricar',
        body: `Item do **seu nível ou menor** (sem nível = 0). 9º+ pede Ofício **mestre**; **17º+** pede **lendário**. Tem de ser comum ou você ter acesso. Ferramentas / oficina. Matéria-prima de **pelo menos metade** do preço — essa metade **sempre** some se der certo.

Alquímico pede o feito Criação Alquímica; mágico, Criação Mágica.

**2 dias** de preparo (1 se tiver a **fórmula**), depois o teste. Sucesso: pode pagar o resto na hora **ou** trabalhar mais dias, abatendo o resto pela tabela de renda no **seu** nível (não no nível do item). Crítico: cada dia extra abate como se o nível fosse +1. Falha: recupera a matéria-prima; recomeça. Falha crítica: perde **10%**.

Consumível: até **4 iguais** no mesmo teste (matéria de todos desde o início). Munição mundana: o pacote da tabela (em geral 10).`,
      },
      {
        heading: 'Retreinar',
        body: `Troca **feito**, **perícia** e algumas escolhas de classe. **Não** troca ancestralidade, herança, origem, classe nem modificadores de atributo. Enquanto retreina, **não** faz outra atividade de intervalo. Em geral precisa de professor (o MJ pode cobrar).

A nova opção tem de ser uma que você **já poderia** ter pego na hora da original (feito de 2º não vira feito de 4º). Se perder pré-requisito, a habilidade para.

**Feito:** 1 semana, mesmo tipo (perícia por perícia, não vira feito de mago).
**Perícia:** 1 semana — desce um grau numa e sobe outra até no máximo o grau que você largou. Também 1 semana para trocar um treino inicial da criação.
**Classe:** magia no repertório ~1 semana; ordem de druida / escola de mago **no mínimo 1 mês**. Patrono de bruxa só em caso extraordinário.`,
      },
      {
        heading: 'Custo de vida',
        body: `Subsistência 4 prata/semana; confortável 1 po; fino 30 po; extravagante 100 po. **Subsistir** (Sociedade na cidade, Sobrevivência no mato) tenta zerar a conta. Aventureiro estabelecido muitas vezes tem patrono ou tesouro demais para se preocupar.

Outras atividades de intervalo: falsificar documento, tratar doença, só… viver. Combine meta longa com o MJ.`,
      },
    ],
  },
  {
    id: 'afflictions',
    name: 'Aflições: veneno, doença e maldição',
    originalName: 'Afflictions',
    category: 'rules',
    summary:
      'Salvaguarda inicial, onset, estágios, exposição múltipla, virulento, Tratar veneno/doença e quando a maldição pede magia de 4º posto.',
    source: 'Player Core págs. 430–431 e 242',
    aonUrl: 'https://2e.aonprd.com/Rules.aspx?ID=2389',
    relatedGuides: ['combat', 'counteract', 'conditions'],
    relatedLinks: [
      { label: 'Magias', to: '/compendio/magias' },
    ],
    sections: [
      {
        heading: 'O que é uma aflição',
        body: `Doença, veneno, maldição e radiação usam o mesmo esqueleto: você falha uma salvaguarda, entra num **estágio**, e o problema piora (ou some) conforme os testes seguintes. O bloco lista nome, traços, CD, onset, duração máxima e cada estágio com o intervalo entre testes.

Se o bloco **não** traz nível, use o da criatura, armadilha ou item que causou a aflição. Magia usa a **CD de magia** do conjurador.`,
      },
      {
        heading: 'Salvaguarda inicial e onset',
        body: `Na **primeira exposição** você testa (em geral Fortitude). Esse teste se chama salvaguarda inicial.

**Sucesso:** aquela exposição não pega. Só testa de novo se for exposto outra vez.
**Falha:** entra no **estágio 1**.
**Falha crítica:** depois do onset (se houver), entra direto no **estágio 2**.

**Onset** é o atraso até o primeiro estágio fazer efeito. Sem essa linha, o estágio 1 (ou o 2, na falha crítica) entra **na hora**.

**Duração máxima**, se existir, corta a aflição quando o relógio acaba — mesmo que você ainda não tenha “curado” nos testes.`,
      },
      {
        heading: 'Estágios',
        body: `Cada estágio lista um efeito e, entre parênteses, o intervalo até o próximo teste (fim do seu turno, 1 minuto, 1 dia…). Ao entrar no estágio, o efeito vale. No fim do intervalo, testa de novo contra a mesma CD.

**Sucesso:** desce **1** estágio.
**Crítico:** desce **2**.
Se cair **abaixo de 1**, a aflição acaba.

**Falha:** sobe **1**.
**Falha crítica:** sobe **2**.
Passou do último estágio listado? **Repete o último** — não inventa um estágio pior.

Dano do estágio entra **na hora** em que você chega nele. Condição com duração própria (amedrontado, exaurido…) segue a regra da condição e pode sobrar depois que a aflição acaba. Condição **sem** duração padrão (desajeitado, paralisado) e penalidade do estágio duram **enquanto você estiver naquele estágio**, salvo o bloco dizer o contrário.`,
      },
      {
        heading: 'Exposição múltipla e virulento',
        body: `Já está com a **mesma** maldição ou doença? Nova exposição **não faz nada**.

**Veneno** é diferente: se você **falhar** a salvaguarda inicial da nova dose, o estágio sobe **1** (**+2** na falha crítica). O relógio da duração máxima **não** reinicia. Isso vale mesmo durante o onset. Se o veneno não tem onset (ou o onset já passou), o novo estágio pega **na hora**.

Traço **virulento:** precisa de **dois sucessos seguidos** para descer 1 estágio. Crítico nesse caso desce só **1**, não 2.`,
      },
      {
        heading: 'Como tirar',
        body: `Esperar os sucessos (ou a duração máxima) é válido. Na mesa, o atalho mais comum é Medicina:

**Tratar veneno** (1 ação, treinado, kit de curador vestido ou empunhado): Medicina vs CD do veneno. Só tenta de novo **depois** da próxima salvaguarda da vítima. Crítico +4 de circunstância nela; sucesso +2; falha crítica −2.

**Tratar doença** (intervalo, treinado, kit de curador, **pelo menos 8 horas**): mesma matemática de bônus/penalidade na **próxima** salvaguarda. Só tenta de novo depois desse teste.

A magia *Purificar Aflição* também contrapõe. Magia que tira a **condição na origem** (*Corpo São* e similares) ajuda doença/veneno que impõem aquela condição.

**Maldição** pede texto que cite maldição de verdade: *Purificar Aflição* de **4º posto** ou o feito de perícia Quebrar Maldição. Sem isso, Medicina sozinha em geral não basta.

Contrapor (próximo guia) é o teste que a magia usa contra a CD da aflição.`,
      },
    ],
  },
  {
    id: 'counteract',
    name: 'Contrapor magia e efeitos',
    originalName: 'Counteracting',
    category: 'spells',
    summary:
      'Como o teste de contrapor compara posto e resultado: o que um dissipar, um antídoto ou uma magia de 4º posto realmente tira.',
    source: 'Player Core pág. 431',
    aonUrl: 'https://2e.aonprd.com/Rules.aspx?ID=2389',
    relatedGuides: ['spells', 'afflictions', 'checks'],
    relatedLinks: [
      { label: 'Magias', to: '/compendio/magias' },
    ],
    sections: [
      {
        heading: 'Quando você contrapõe',
        body: `Alguns efeitos tentam **anular** magia, aflição, condição ou outro efeito contínuo. Sucesso **interrompe** o alvo — ele deixa de fazer o que faria — salvo o texto dizer outra coisa (às vezes só suprime, às vezes só tira de você).

O teste é d20 + o modificador certo **contra a CD do efeito**:
- **Aflição:** CD do bloco.
- **Magia:** CD do conjurador.
- Sem CD óbvia: o MJ monta a partir do nível do efeito.

Para magia, o modificador de contrapor é **atributo de conjuração + proficiência de magia**, mais bônus/penalidade que **citem contrapor**. Outras habilidades dizem qual perícia ou CD−10 usar.`,
      },
      {
        heading: 'Posto de contrapor',
        body: `O que você **pode** anular depende do resultado **e** da diferença de posto.

**Posto do efeito alvo:**
- Se for **magia**, o posto é o da magia (truque = 0; *Bola de Fogo* no 3º espaço = 3).
- Senão: **metade do nível**, arredondada para cima (mínimo 0).
- Nível incerto e veio de uma criatura: metade do **nível da criatura**, arredondada para cima.

O seu efeito também tem um posto de contrapor (o da magia que você conjurou, ou metade do seu nível se a habilidade disser isso).`,
      },
      {
        heading: 'Graus de sucesso',
        body: `**Crítico:** contrapõe se o posto do alvo for no máximo **o seu +3**.
**Sucesso:** no máximo **o seu +1**.
**Falha:** só se o posto do alvo for **menor** que o seu.
**Falha crítica:** não contrapõe.

Exemplos rápidos (você contrapõe com posto **3**):
- Crítico: até posto **6** (nível típico 11–12).
- Sucesso: até posto **4** (nível 7–8).
- Falha: só posto **2** ou menos.
- Falha crítica: nada.

A tabela completa (postos 0–10) está na página de Aflições do Player Core / AoN — não precisa decorar os níveis entre parênteses; o posto basta.`,
      },
      {
        heading: 'Na mesa',
        body: `*Dissipar Magia*, antídoto, *Purificar Aflição* e várias reações de classe usam essa regra. O texto da habilidade ainda manda: às vezes contrapõe **um** efeito à escolha, às vezes o de maior posto, às vezes só se você identificar o efeito antes.

Contrapor **não** cura o dano que o efeito já causou. Tirar a bola de fogo do ar impede o dano; dissipar uma *Lentidão* não devolve as ações que você já perdeu.`,
      },
    ],
  },
  {
    id: 'archetypes',
    name: 'Arquétipos e Dedicação',
    originalName: 'Archetypes',
    category: 'feats',
    summary:
      'Dedicação gasta feito de classe, dois feitos extras antes da próxima, multiclasse da própria classe é proibido, e o pacote de conjuração básica/perita/mestra.',
    source: 'Player Core pág. 215 e Player Core 2 págs. 173–174',
    aonUrl: 'https://2e.aonprd.com/Rules.aspx?ID=2127',
    relatedGuides: ['feats', 'leveling-up', 'variant-rules'],
    relatedLinks: [
      { label: 'Arquétipos', to: '/compendio/arquetipos' },
      { label: 'Classes', to: '/compendio/classes' },
    ],
    sections: [
      {
        heading: 'Como entra na ficha',
        body: `Arquétipo amplia a classe: você gasta **feitos de classe** em feitos do arquétipo. Primeiro acha o pacote que cabe no conceito; depois pega a **Dedicação** daquele arquétipo, usando um espaço de feito de classe. Daí em diante, feitos do arquétipo (se você cumprir os pré-requisitos) entram no lugar dos feitos de classe — por isso se chamam feitos de classe de arquétipo.

O feito de arquétipo **herda as restrições** do espaço que substitui. Se um benefício de 6º nível te dá um feito de classe de **4º ou menor** com o traço anão, o arquétipo nesse espaço também precisa ser 4º ou menor **e** ter o traço anão.`,
      },
      {
        heading: 'A regra da Dedicação',
        body: `A Dedicação é um compromisso: você **não** pega **outra** Dedicação até completar esta, pegando **dois feitos extras** daquele mesmo arquétipo.

Enquanto tiver qualquer outro feito daquele arquétipo, você **não** retreina a Dedicação.

Feito que **concede outro feito** (Dogma Básico do clérigo → Mãos Curadoras, por exemplo) conta como **1** para a Dedicação, não dois. Você ainda precisa cumprir os pré-requisitos do feito ganho.

**Multiclasse:** os arquétipos do Player Core têm o traço multiclasse. Você **não** pega a Dedicação da **sua própria** classe (lutador não pega Dedicação de Lutador).`,
      },
      {
        heading: 'Feitos adicionais e feitos que dão feitos',
        body: `Alguns arquétipos listam **Feitos adicionais** de outros livros, às vezes num **nível diferente** do original. Você pega como feito de arquétipo daquele nível — e isso **conta** para os dois feitos da Dedicação. Se o feito original tinha traço de classe (lutador, mago…), nesse pacote ele **perde** esse traço.

Feito de arquétipo com o traço **perícia** (em outros livros) pode gastar espaço de **feito de perícia** em vez de classe. Continua valendo para a Dedicação.

**Arquétipo de classe** (class archetype) muda a classe desde o 1º nível. Você **nunca** tem mais de um.`,
      },
      {
        heading: 'Arquétipo de conjuração',
        body: `A Dedicação já dá truques. Depois vêm três feitos com o nome do arquétipo:

**Conjuração básica** (em geral 4º): espaço de 1º posto. No 6º, espaço de 2º (e, se você tem repertório, uma magia vira assinatura). No 8º, espaço de 3º.

**Conjuração perita** (em geral 12º): perito em ataque e CD de magia + espaço de 4º (segunda assinatura se tiver repertório). No 14º, 5º posto; no 16º, 6º.

**Conjuração mestra** (em geral 18º): mestre em ataque e CD + espaço de 7º (terceira assinatura). No 20º, 8º posto.

Os espaços só conjuram o que o arquétipo permitir. Bruxa com patrono oculto no arquétipo não gasta esses espaços em magia oculta de bardo, mesmo que o bardo também seja oculto.

Essa conjuração **vale** para ativar pergaminho, varinha e cajado (Cast a Spell).`,
      },
      {
        heading: 'Alquimia e itens temporários (Player Core 2)',
        body: `Arquétipo que dá **alquimia avançada**: feito Criação Alquímica (se ainda não tiver) e um número de consumíveis infundidos por dia, sem custo/tempo normal. Várias fontes **não somam** o número — usa o **maior** — mas você pode misturar os **tipos** que cada fonte libera (herbalista + envenenador = 4 no total, cura ou veneno).

**Alquimia rápida:** Criação Alquímica + a ação Alquimia Rápida e um tanto de frascos versáteis nas preparações. Em geral **não** recupera frascos no meio do dia como o alquimista. Várias fontes: de novo o **maior** número, usos combinados.

**Item temporário** (pergaminho do trapaceiro, arma do sucateiro…): some nas **próximas preparações** se o texto não disser outra duração. Em geral **não vende**. Efeito criado pelo item também acaba nessa hora, salvo se for permanente.`,
      },
    ],
  },
  {
    id: 'companions',
    name: 'Companheiros, familiares e mascotes',
    originalName: 'Companions and Familiars',
    category: 'rules',
    summary:
      'Jovem → maduro → ágil ou selvagem → especializado; Comandar dá 2 ações; familiar troca habilidades nas preparações; mascote e familiar não combinam.',
    source: 'Player Core págs. 206–212 e 259',
    aonUrl: 'https://2e.aonprd.com/Rules.aspx?ID=2112',
    relatedGuides: ['feats', 'actions', 'mounted-combat'],
    relatedLinks: [
      { label: 'Companheiros', to: '/compendio/companheiros' },
      { label: 'Arquétipos', to: '/compendio/arquetipos' },
    ],
    sections: [
      {
        heading: 'Três bichos diferentes',
        body: `**Companheiro animal** vem de característica de classe ou feito (druida, ranger, campeão…). **Familiar** é o vínculo mágico. **Mascote** é o feito geral Pet (pág. 259): um bicho de estimação, sem o pacote de combate do companheiro.

Você pode ter **familiar ou mascote**, nunca os dois. Companheiro animal é outro tipo de regra: **pode** ter companheiro **e** familiar (ou mascote) ao mesmo tempo.

Só **um** companheiro animal por vez. Se morrer: **1 semana** de intervalo para substituir, **sem custo**.

No bloco de magia, **companion** = animal, familiar e os outros tipos (elemental, construto…). **Familiar** no alvo = só familiar. Magia que manda o companheiro dar um Golpe **não** dá Golpe ao familiar.`,
      },
      {
        heading: 'Companheiro animal (ficha jovem)',
        body: `Traços **animal** e **minion**. Nível = o **seu**. **Comandar um Animal** no seu turno dá a ele **2 ações** (substitui o teste de Natureza — você **não** rola).

Proficiências iniciais: treinado em golpes desarmados, defesa desarmada, barda, todas as salvaguardas, Percepção, Acrobacia e Atletismo. Sem especialização, não usa ação que pede Inteligência alta (Coagir, Decifrar escrito), mesmo treinado.

Modificadores de atributo vêm do **tipo** (lobo, cavalo, pássaro…). **PV** = PV de ancestralidade do tipo + **(6 + CON) × o seu nível**. Neste app a ficha do tipo é a **jovem**; o motor aplica PV, CA, ataques e o avanço dos feitos.

Únicos bônus de **item** que o companheiro usa: Speed e CA (teto de item na CA: **+3**).

Cada tipo traz tamanho, golpes, perícia extra, sentidos, Speed, às vezes montaria, um **benefício de Apoio** e uma **manobra avançada** (ágil/selvagem).`,
      },
      {
        heading: 'Apoio, montaria e itens',
        body: `**Apoio** (1 ação, o companheiro precisa ser animal companion): você ganha o benefício do tipo. No mesmo turno, as outras ações dele só podem ser **deslocamento básico** para posicionar o Apoio. Se ele já fez outra coisa neste turno, não Apoia.

Montar: o bicho precisa ser **pelo menos um tamanho maior** que o cavaleiro. Com cavaleiro, só usa Speed terrestre e **não** move e Apoia no mesmo turno — salvo o tipo ter a habilidade **mount**, que ignora as duas restrições.

Itens: limite **2** investidos. **Ele** investe; você usa Investir um item **junto**. Companheiro **não** ativa item. Detalhe no guia de itens mágicos.`,
      },
      {
        heading: 'Avanço (pelos feitos, não pelo nível sozinho)',
        body: `O nível sobe com você; o “pacote” (jovem → maduro → ágil **ou** selvagem → especializado) vem de **feitos de classe**.

**Maduro:** se era Médio ou menor, cresce **um** tamanho. Força, Destreza, Constituição e Sabedoria +1. Percepção e salvaguardas viram **perito**. Intimidação, Furtividade e Sobrevivência ficam treinadas (se o tipo já era treinado numa delas, essa vira perita). Golpe desarmado: **dois** dados.

**Ágil:** Des +2; For, Con e Sab +1. Acrobacia perita. **+2** de dano nos desarmados; os golpes contam como mágicos contra resistência. Aprende a manobra avançada do tipo.

**Selvagem:** se Médio ou menor, cresce mais um tamanho. For +2; Des, Con e Sab +1. Atletismo perito. **+3** de dano nos desarmados; golpes mágicos contra resistência. Manobra avançada.

**Especializado** (em geral um só): golpes desarmados peritos; salvaguardas e Percepção **mestres**; Des +1 e Int +2; dados de golpe vão a **três**; o dano extra sobe de 2→4 ou de 3→6; mais o bônus da especialização (Emboscador, Valentão, Audaz, Corredor, Rastreador, Destruidor).`,
      },
      {
        heading: 'Familiar e mascote',
        body: `Familiar ganha o feito **Pet**, com extras. Em Percepção, Acrobacia e Furtividade você pode usar **seu atributo de conjuração + nível** se for maior que 3 + nível.

Empatia com você a até **1,5 km** (1 milha): emoções, não idioma — fala só se uma habilidade der.

Nas **preparações diárias** você escolhe **duas** habilidades (de familiar e/ou de mestre). Habilidade **inata** do bicho (voo do corvo) **não** sai. No máximo **uma** habilidade que muda o traço de criatura (construct, plant…). Você pode pegar habilidade de mascote como habilidade de familiar: anfíbio, escavador, escalador, visão no escuro, ecolocalização, movimento rápido, voador, destreza manual, faro, resistente (**+2 PV por nível**).

Mascote (feito Pet, sem ser familiar) escolhe as duas habilidades **quando ganha o feito**, não todo dia. Trocar familiar/mascote segue o texto do feito Pet.

Comandar animal **comum** (sem ser seu companheiro) ainda pede Natureza vs CD e o bicho só age no **turno dele**. Companheiro pula esse teste e age **no seu** turno, com 2 ações.`,
      },
    ],
  },
  {
    id: 'social',
    name: 'Encontros sociais e Influência',
    originalName: 'Social Encounters and Influence',
    category: 'rules',
    summary:
      'Atitudes, Causar boa impressão, Pedido, Coagir, Recolher informações e o subsistema de Influência do GM Core quando um teste solto não basta.',
    source: 'Player Core pág. 239 e GM Core págs. 183 e 187',
    aonUrl: 'https://2e.aonprd.com/Rules.aspx?ID=1187',
    relatedGuides: ['skills', 'portraying-npcs', 'influence'],
    relatedLinks: [
      { label: 'Origens', to: '/compendio/origens' },
      { label: 'Classes', to: '/compendio/classes' },
    ],
    sections: [
      {
        heading: 'Atitudes (só NPC)',
        body: `Como o NPC te vê, do melhor ao pior:

**Prestativo** — ajuda de bom grado e atende pedidos.
**Amistoso** — gosta de você; não necessariamente se arrisca.
**Indiferente** — tanto faz. A maioria começa aqui.
**Antipático** — não quer ajudar.
**Hostil** — trabalha contra você; pode atacar só por desgostar.

Essas perícias **nunca** mudam a atitude de um **jogador**. Você pode interpretar a cena e até rolar Diplomacia se o jogador quiser um termômetro — a decisão final é dele.`,
      },
      {
        heading: 'Diplomacia no dia a dia',
        body: `**Causar boa impressão** (pelo menos 1 minuto): Diplomacia vs Vontade de um alvo (até cinco, com −2). Vale para **esta** interação social, salvo o MJ estender.

Crítico: sobe **dois** passos. Sucesso: **um**. Falha crítica: desce **um**.

**Pedido** (1 ação): só em alvo **amistoso** ou **prestativo**, e o pedido tem de caber na atitude atual. O MJ define a CD pela dificuldade — pedido impossível ou nojento, nem prestativo aceita.

Crítico: aceita sem ressalva. Sucesso: aceita, talvez com condição. Falha: recusa (pode oferecer algo menor). Falha crítica: recusa **e** a atitude desce um passo.

**Recolher informações** (exploração, secreto, em geral ~2 horas): Diplomacia nas tavernas e mercados. Sucesso traz o que o MJ definir; falha crítica traz **informação errada**. Gorjeta e suborno podem ajudar.`,
      },
      {
        heading: 'Intimidação: Coagir',
        body: `**Coagir** (pelo menos 1 minuto): Intimidação vs Vontade.

**Crítico:** entrega a informação ou segue ordens que **não** o coloquem em perigo, por até 1 dia (o MJ corta antes). Depois fica antipático se ainda não era antipático/hostil — mas, no curto prazo, tem medo demais para se vingar.
**Sucesso:** igual, só que depois de ficar antipático **pode** se vingar (denúncia, ajudar seus inimigos).
**Falha:** não obedece; vira antipático se ainda não era antipático/hostil.
**Falha crítica:** recusa, vira **hostil**, e fica imune à sua Coação por **pelo menos 1 semana**.`,
      },
      {
        heading: 'Quando um teste não basta: Influência',
        body: `Festa, tratado, júri, o senhorio te expulsando a trupe — se Diplomacia/Enganação/Intimidação **soltas** não capturam a cena, o MJ pode usar o subsistema **Influência** (GM Core).

Vocês acumulam **pontos de Influência** contra limiares do NPC, **contra o relógio**. O evento vira rounds (duração narrativa; 15 minutos a 1 hora é o típico).

Cada round, **cada PC age uma vez**: **Influenciar** ou **Descobrir**. XP típico = encontro de combate **moderado** daquele nível.`,
      },
      {
        heading: 'Influenciar e Descobrir',
        body: `**Influenciar** (concentração, linguístico): escolhe um NPC e testa a perícia que o bloco dele aceita. Crítico = **2** pontos; sucesso = **1**; falha = 0; falha crítica = **−1**.

**Descobrir** (concentração, **secreto**): Percepção ou perícia que o MJ aceitar, contra a CD de descoberta do NPC.

Sucesso — escolha **uma**: a perícia de Influenciar com a **menor CD** que você ainda não conhece; um viés pessoal; uma **resistência**; ou uma **fraqueza**.
Crítico — duas dessas (pode repetir a mesma categoria).
Falha — nada.
Falha crítica — você “aprende” uma informação **errada**.

Diplomacia quase sempre está na lista de Influenciar, mas **raramente** é a mais fácil: o sistema premia quem Descobre e usa Ofício, Conhecimento ou Performance no gosto do NPC.`,
      },
      {
        heading: 'Bloco de Influência (para o MJ)',
        body: `O essencial: Percepção, Vontade, CD de Descobrir, perícias de Influenciar **da mais fácil à mais difícil**, limiares (4 / 6 / 8 pontos, etc.) e o que cada um libera.

**Resistência** (bajulação, magos, o ex-cônjuge…): em geral **+2** na CD (+5 se for forte), ou perder pontos, ou o NPC encerrar a conversa.
**Fraqueza** (hobby, insegurança, segredo): em geral **−2** (−5 se for forte), ou pontos automáticos, ou sucesso automático no limiar.

Perícia fora da lista: se a mesa justificar bem, o MJ pode aceitar na **CD mais alta** da lista.

Comece pelo modificador de Vontade do NPC, vire CD, e ajuste fácil/difícil como nas CDs do GM Core. Encontro de 3º nível com Vontade +12 → CD base 22 é um ponto de partida sólido.`,
      },
    ],
  },
  {
    id: 'hero-points',
    name: 'Pontos de herói',
    originalName: 'Hero Points',
    category: 'rules',
    summary:
      '1 no começo da sessão, máximo 3, rerrolar um teste ou gastar todos para sair de morrendo — e o ritmo com que o MJ deve premiar.',
    source: 'Player Core pág. 413 e GM Core pág. 57',
    aonUrl: 'https://2e.aonprd.com/Rules.aspx?ID=2333',
    relatedGuides: ['checks', 'xp-rewards', 'mythic-rules'],
    relatedLinks: [
      { label: 'Criar Personagem', to: '/personagens/novo' },
      { label: 'Configurações (regras míticas)', to: '/configuracoes' },
    ],
    sections: [
      {
        heading: 'O que são',
        body: `Ponto de herói **não acumula entre sessões**. XP e tesouro ficam; isto some no fim da mesa. O MJ entrega; o jogador gasta.

Começo típico: **1** para cada PC. Máximo **3** ao mesmo tempo. O que sobrar no fim da sessão **some**.

Gastar **não é ação**. Vale mesmo se você não pode agir (inconsciente, paralisado, morrendo). Você pode gastar **em nome** do familiar ou do companheiro animal — o rerroll ou a estabilização é dele.

Na ficha e no painel de Combate o rastreador **Herói** guarda isso. Com regras míticas ligadas e um chamado, o rastreador vira **Mítico** e você **não** ganha pontos de herói — guia de regras míticas.`,
      },
      {
        heading: 'Os dois gastos',
        body: `**1 ponto — rerrolar um teste.** Fica o **segundo** resultado, mesmo se pior. É efeito de **fortuna**: no máximo um fortuna no mesmo teste, então **não** dá para gastar dois pontos no mesmo d20. Fortuna e infortúnio no mesmo teste se cancelam (guia de testes).

**Todos os pontos (mínimo 1) — evitar a morte.** Só quando a condição **morrendo** **ia subir** (em geral no teste de recuperação ou em dano extra em 0 PV). Você **perde morrendo por completo**, estabiliza com **0 PV** e **não** ganha ferido (nem aumenta o ferido) por ter saído assim. Se **já** estava ferido, o valor **não cai**.

Não dá para “guardar 1 e gastar o resto”: é **todos** ou o rerroll de 1.`,
      },
      {
        heading: 'Descreva o feito',
        body: `O Player Core pede uma cena: o ponto representa um ato **acima** do esperado. Lembrete de uma aventura antiga, alguém que você precisa salvar, um item que “por acaso” estava no bolso. Se a inspiração não vier, o MJ sugere e vocês fecham juntos.`,
      },
      {
        heading: 'Quanto o MJ deve dar',
        body: `Além do 1 inicial, uma mesa típica entrega cerca de **1 ponto por hora depois da primeira** (3 extras numa sessão de 4 horas). Jogo mais cinematográfico ou odds absurdas: 1 a cada **30 minutos**. Sessão curta: acelera para ninguém ficar zerado.

Distribua entre o grupo. Não despeje tudo num PC.

Gatilhos clássicos: última defesa, proteger inocente, estratégia ou magia que vira o combate. O silêncio de “uau” na mesa é o recado. Golpe final num inimigo difícil ou uma cena social bem resolvida também valem — não precisa ser épico mundial.

Conquista **moderada ou maior** da aventura: considere +1 para quem foi decisivo.`,
      },
    ],
  },
  {
    id: 'rarity',
    name: 'Raridade e acesso',
    originalName: 'Rarity and Access',
    category: 'rules',
    summary:
      'Comum, incomum, raro e único: o que o jogador pode pegar na criação, o que o MJ libera depois, e a linha Acesso no bloco.',
    source: 'GM Core pág. 22',
    aonUrl: 'https://2e.aonprd.com/Rules.aspx?ID=2530',
    relatedGuides: ['magic-items', 'treasure', 'character-creation'],
    relatedLinks: [
      { label: 'Magias', to: '/compendio/magias' },
      { label: 'Equipamento', to: '/compendio/equipamento' },
      { label: 'Arquétipos', to: '/compendio/arquetipos' },
    ],
    sections: [
      {
        heading: 'As quatro raridades',
        body: `Raridade **não** é poder. Incomum e raro complicam a história ou são menos frequentes no mundo — um *Reviver os Mortos* incomum não é “mais forte”, só não deveria estar na manga de todo clérigo.

**Comum** — aventureiro que cumpre os pré-requisitos **pode** pegar. Magia, feito, item, ancestralidade da lista padrão.

**Incomum** — difícil de achar ou regional. Com esforço (origem certa, intervalo procurando, facção) o PC **costuma** conseguir. Na criação, opções incomuns **já concedidas** pela ancestralidade ou classe entram de graça.

**Raro** — segredo perdido, magia antiga. Só entra se o **MJ colocar na mesa** (recompensa, tesouro, professor).

**Único** — um só no mundo: artefato nomeado, NPC com nome. O MJ decide se alguém chega perto. Graytusk a orc é única; isso **não** torna “orc” uma criatura única — reconhecer o povo continua fácil.`,
      },
      {
        heading: 'Acesso (Access)',
        body: `Bloco incomum às vezes traz uma linha **Acesso**: “seguidor de Shelyn”, “membro da Sociedade Pathfinder”, “nascido em Absalom”. Quem cumpre trata a opção como **comum** para si.

Acesso **não** é pré-requisito mecânico. O MJ pode mudar a linha sem desbalancear o número — só muda quem tem a chave na história.

No começo da campanha, combine o que está aberto. Padrão: tudo **comum** que você qualifica + incomum que a ficha **já** libera. Incomum solto, o grupo pode caçar. Raro = prêmio. Alguns MJs abrem tudo; se for o caso, diga na sessão zero.`,
      },
      {
        heading: 'Contexto muda a etiqueta',
        body: `Hobgoblin é criatura **comum** para combater, mas ancestralidade **incomum** na maioria dos cenários. Katana é incomum no Mar Interior e comum em Tian Xia. Num reino élfico, a lâmina curva élfica pode ser comum.

Ancestralidade, origem, classe e herança **incomuns ou raras** na criação: o herói não “procura” isso depois — a raridade diz o quão raro é um aventureiro daquele tipo. Droon pode tratar lagarto como comum e humano como menos comum. Guia oficial de Adventure Path costuma listar origens incomuns **liberadas** naquela campanha.`,
      },
      {
        heading: 'Na mesa e no mundo',
        body: `Quer o item raro? Encaixe uma missão: a porta só abre com aquela magia, a academia cobra o aprendizado. CD para identificar ou aprender magia/item **incomum / raro / único** sobe (+2 / +5 / +10) — guia de CDs.

Fabricar: item tem de ser comum **ou** você ter acesso. Mesma lógica para aprender magia.

O MJ pode virar a campanha com raridade: clérigo raro porque os deuses quase não atendem; magia toda incomum num mundo low-magic; *Reviver os Mortos* só para quem serve a deusa da morte. Isso é ferramenta de história, não nerf escondido.`,
      },
    ],
  },
  {
    id: 'incapacitation',
    name: 'Traço incapacitação',
    originalName: 'Incapacitation',
    category: 'spells',
    summary:
      'Por que Sono e Paralisar falham em chefes: criatura acima do dobro do posto (ou acima do nível do efeito) trata o resultado um grau melhor.',
    source: 'Player Core pág. 457',
    aonUrl: 'https://2e.aonprd.com/Traits.aspx?ID=631',
    relatedGuides: ['spells', 'death-effects', 'combat'],
    relatedLinks: [
      { label: 'Magias', to: '/compendio/magias' },
    ],
    sections: [
      {
        heading: 'Para que existe',
        body: `Efeito com o traço **incapacitação** tira alguém da luta de vez (ou mata). Sem este traço, uma magia de 1º posto derrubaria o dragão ancião. Com ele, alvo **poderoso demais** para aquele efeito trata o teste **um grau melhor** — falha vira sucesso, sucesso vira crítico, e assim por diante.

Na ficha das magias o traço aparece junto com os outros. Confira antes de gastar o espaço num chefe.`,
      },
      {
        heading: 'Magia',
        body: `Compare o **nível da criatura** com o **dobro do posto** da magia. Se o nível for **maior** que o dobro do posto, o alvo ganha o benefício.

Exemplos:
- *Sono* no 1º posto (dobro = 2): criatura de **3º+** sobe um grau.
- Magia de **3º** posto (dobro = 6): criatura de **7º+** sobe um grau; 6º nível ainda toma o efeito cheio.
- Truque (posto 0, dobro = 0): qualquer criatura de **1º+** sobe um grau.

O “um grau melhor” vale no teste que **impede** a incapacitação (em geral a salvaguarda). Se a magia usa **teste do conjurador** para incapacitá-lo (ataque de magia, contrapôr, etc.), esse teste é tratado **um grau pior**.`,
      },
      {
        heading: 'Item, criatura e perigo',
        body: `Se o efeito **não** é magia (veneno de item, habilidade de monstro, armadilha), compare níveis: criatura de **nível maior** que o do item, da criatura ou do **perigo** que gerou o efeito ganha o mesmo benefício.

Chefe de 10º contra uma armadilha incapacitante de 6º: o chefe sobe um grau. Contra a mesma armadilha, o ladino de 6º não sobe.`,
      },
      {
        heading: 'Na mesa',
        body: `Aumentar o posto da magia (Heightened) sobe o dobro — *Sono* no 4º posto (dobro = 8) ainda pega criatura de 8º no efeito cheio.

Inventando um efeito em casa: o GM Core pede que **incapacitar ou matar** só aconteça em **sucesso crítico** (ou **falha crítica**, se for salvaguarda). O traço incapacitação é o jeito oficial de não quebrar combate contra alguém fora da sua faixa.

Isto **não** é imunidade. Crítico do conjurador contra o chefe ainda pode ser um sucesso; falha crítica do chefe ainda pode ser só falha — e falha muitas vezes já é ruim.`,
      },
    ],
  },
  {
    id: 'hazards',
    name: 'Perigos: armadilhas, ambiente e assombrações',
    originalName: 'Hazards',
    category: 'rules',
    summary:
      'Simples vs complexo, detectar (Buscar vs automático), Desativar um dispositivo, quebrar na Dureza e XP de perigo.',
    source: 'GM Core págs. 98–100 e Player Core pág. 247',
    aonUrl: 'https://2e.aonprd.com/Rules.aspx?ID=2846',
    relatedGuides: ['exploration', 'building-hazards', 'encounters'],
    relatedLinks: [
      { label: 'Equipamento', to: '/compendio/equipamento' },
    ],
    sections: [
      {
        heading: 'Três famílias',
        body: `**Armadilha** (trap) — construída para machucar. Traço **mecânica** ou **mágica**.
**Ambiente** (environmental) — areia movediça, geyser, fungo tóxico.
**Assombração** (haunt) — fenômeno espectral; costuma ter Vontade e sair com Ocultismo ou Religião.

**Simples:** dispara a reação **uma vez** e acaba, salvo reset. Resolve em exploração.
**Complexo** (traço complex): entra na iniciativa, tem **rotina** (N ações por turno) e vale XP de **monstro do mesmo nível**. Troca o modo para encontro até desligar.

Nível do perigo = desafio certo para um grupo daquele nível. Tóxico, maldição e afins no bloco usam esse mesmo nível.`,
      },
      {
        heading: 'Detectar',
        body: `Todo perigo tem um **gatilho**. Sem grau mínimo de proficiência na linha Furtividade: cada PC rola Percepção **secreta** vs CD de Furtividade **ao entrar na área**.

Com grau mínimo (treinado, perito…): só quem está **Buscando** (exploração) ou usa **Buscar** no encontro, **e** tem aquele grau ou melhor.

Sucesso: o MJ descreve o que você notou. Precisa **detectar** (ou alguém apontar) para tentar desativar.

**Detectar magia** acha perigo mágico **sem** grau mínimo — só a presença, não como desligar. Com grau mínimo na linha, detectar magia **não** revela. Para entender o bastante para desarmar: Identificar magia, Recordar Conhecimento ou magia mais forte.

Perigo complexo lista **modificador** de Furtividade (iniciativa). CD para achar = esse modificador **+10**.`,
      },
      {
        heading: 'Disparar, rotina e reset',
        body: `Gatilho de viagem (pisar na placa, cruzar o sensor): se ninguém viu, a reação **acontece**. Gatilho de manipular (abrir a porta): só se alguém **fizer** isso.

A maioria usa **reação**. Alguns usam ação livre (areia movediça pode engolir várias criaturas no round).

Complexo: a reação inicial pode mandar rolar iniciativa (Furtividade do perigo). Depois, no turno dele, segue a **rotina**.

**Reset:** automático (a superfície da areia assenta em 24 h) ou manual (fechar a alçapão). Sem reset, depois da reação muita armadilha simples deixa de ser ameaça.`,
      },
      {
        heading: 'Desativar',
        body: `**Desativar um dispositivo** (2 ações, Prestidigitação, em geral ferramentas de ladrão): o jeito mais versátil. Mecânica também **quebra** na porrada; mágica em geral **contrapõe** (*Dissipar Magia*). Ambiente: Natureza ou Sobrevivência. Assombração: Ocultismo ou Religião. O bloco lista perícia, CD e se pede grau mínimo.

Quem não tem o grau mínimo **pode** tentar — só **não pode ter sucesso** (ainda pode criticar para baixo e disparar).

**Crítico:** desativa, ou **dois** sucessos se o perigo pede vários; não deixa rastros; você pode rearmar depois se o tipo permitir.
**Sucesso:** desativa, ou um sucesso na conta.
**Falha crítica:** **dispara** — inclusive falha crítica ao contrapor perigo mágico.

Dá para desativar depois de disparado, se ainda houver perigo (reset, rotina contínua).`,
      },
      {
        heading: 'Quebrar, contrapor e XP',
        body: `Objeto: dano − **Dureza**. Atingir em geral **dispara** a armadilha (o MJ pode julgar o contrário). PV ≤ **limiar de quebrado (BT)** = quebrado, não ativa, ainda conserta. 0 PV = destruído, sem conserto. Estatística que o bloco **não** lista não pode ser alvo (sem BT = não quebra, só destrói). Imunidades de objeto valem, salvo o texto. Acabar com a armadilha **num golpe só** quase nunca dispara.

Contrapor: posto e CD no bloco; mesma lógica de desativar.

XP: supera (desativou, desviou ou **aguentou** os ataques) **uma vez**. Mesmo perigo de novo = 0 XP. Simples = **1/5** do XP de um monstro daquele nível; complexo = XP de monstro. Nível ≤ grupo **−4** = trivial, 0 XP.

Âncoras (grupo no nível do perigo): simples **8** XP, complexo **40** XP. Grupo+2: 16 / 80. Tabela completa no GM Core pág. 57.`,
      },
    ],
  },
  {
    id: 'setting-dcs',
    name: 'Como o MJ define a CD',
    originalName: 'Difficulty Classes',
    category: 'rules',
    summary:
      'CD simples vs CD por nível, ajustes de fácil a incrivelmente difícil, raridade na CD, grau mínimo e Recordar Conhecimento de criatura.',
    source: 'GM Core págs. 52–53',
    aonUrl: 'https://2e.aonprd.com/Rules.aspx?ID=2627',
    relatedGuides: ['checks', 'skills', 'rarity'],
    relatedLinks: [
      { label: 'Criar Personagem', to: '/personagens/novo' },
    ],
    sections: [
      {
        heading: 'Dois jeitos',
        body: `**CD simples** — sem nível na tarefa, precisa de um número agora. Escolha o grau que **descreve** a complexidade (não é obrigatório ter esse grau para tentar):

Não treinado **10** · treinado **15** · perito **20** · mestre **30** · lendário **40**.

Exemplo: a fábula verdadeira só quem é **mestre** em Conhecimento de Folclore saberia → CD 30. Ótimo em perícia improvisada; ruim como única ferramenta em combate ou perigo — aí use nível.

**CD por nível** — o assunto tem nível (criatura, item, magia, parede do vilão). 0 = **14**; 1 = **15**; 5 = **20**; 10 = **27**; 15 = **34**; 20 = **40**. Magia usa a coluna de **posto** (1º = 15, 3º = 20, 5º = 26, 7º = 31, 10º = 39). A tabela 0–25 está no GM Core pág. 53.

Os dois caminhos são válidos na mesma parede: “só mestre escala” (30) ou “o vilão de 15º fez isso” (34).`,
      },
      {
        heading: 'Ajustes',
        body: `O ajuste é da **tarefa**, não do PC — todo mundo que rola aquela CD sente.

Incrivelmente fácil **−10** · muito fácil **−5** · fácil **−2** · difícil **+2** (também **incomum**) · muito difícil **+5** (**raro**) · incrivelmente difícil **+10** (**único**).

“Muito difícil de 2º” não é difícil para um 10º. No 1º nível, CD incrivelmente difícil do próprio nível quase só dá falha crítica; no 20º, o especialista passa nela mais da metade das vezes. Grupo de nível alto muitas vezes trata **muito difícil** como o padrão de desafio de verdade.

Tomo arcano de 4º nível: Identificar magia em Arcanismo = CD 19. Ocultismo na mesma obra pode ser **muito difícil** (24). Conhecimento de Dragão, **fácil** ou **muito fácil** (17 ou 14). Isso **não** substitui o bônus da ficha — é a perícia ser mais ou menos adequada.`,
      },
      {
        heading: 'Grupo inteiro rolando',
        body: `Se **qualquer um** passar basta e todo mundo rola, a pilha de d20 quase garante um sucesso. Quando a incerteza importa, suba para **muito difícil** ou **incrivelmente difícil** — o especialista ainda tem chance; o resto provavelmente não.

**Grau mínimo** (fechadura, perigo): quem está abaixo **não pode ter sucesso**, mas ainda rola (precisa poder criticar para baixo e aprender errado). Quase nunca peça perito em tarefa de 2º ou menos; mestre em 6º ou menos; lendário em 14º ou menos — senão ninguém daquele nível passa.`,
      },
      {
        heading: 'Tarefas frequentes',
        body: `**Fabricar:** CD do **nível do item**, + ajuste de raridade; fácil se já fabricou aquele item. Consertar: em geral a CD do nível, sem ajuste.

**Ganhar renda:** o teto de nível da tarefa ≈ nível do povoado (vilarejo 0–1, vila 2–4, cidade 5–7; metrópole 8–10). Conhecimento obscuro pode não ter serviço nenhum.

**Recolher informações:** CD simples pela disponibilidade; sobe se a pergunta é fundo.

**Identificar magia / alquimia / aprender magia:** CD do posto ou do nível do item, + raridade. Amaldiçoado ou ilusão: incrivelmente difícil ajuda a identificar **errado**. Já identificado: automático, fácil ou muito fácil.

**Recordar Conhecimento:** assunto genérico → CD simples. Criatura, armadilha ou item com nível → CD daquele nível (+ raridade). Lenda famosa pode cair para incrivelmente fácil.

**Social** sem CD de Vontade à mão: estime o nível (camponês 0 ou 1) e ajuste pela atitude — fácil se amistoso, muito fácil se prestativo, difícil se antipático, muito difícil se hostil.

**Subsistir / Sentido de direção / Rastrear:** CD simples; ajuste pelo terreno e por quem está cobrindo rastros.`,
      },
      {
        heading: 'Identificar criatura',
        body: `Sucesso: um traço **famoso** (hidra regenera a cabeça; ácido ou fogo para). Crítico: algo **sutil** (fraqueza escondida, gatilho de uma reação).

Perícia típica pelo traço: aberração/oculta/sonho/etéreo/gosma/espírito/tempo → Ocultismo. Animal/feérico/planta/fungo → Natureza. Besta/elemental → Arcanismo ou Natureza. Celestial/demônio/monitor/sombra/morto-vivo → Religião. Construto → Arcanismo ou Ofício. Dragão → Arcanismo. Humanoide → Sociedade.

Conhecimento específico costuma ser **fácil** ou **muito fácil** (antes da raridade). Bruxa pode ser Ocultismo sem ajuste, Sociedade mais difícil — o MJ tem folga.

Depois de um sucesso, nova pergunta sobre o mesmo assunto **sobe** a dificuldade. Depois de uma tentativa incrivelmente difícil **ou** de uma falha, acabou o que aquele PC sabe.`,
      },
    ],
  },
  {
    id: 'victory-points',
    name: 'Pontos de Vitória',
    originalName: 'Victory Points',
    category: 'rules',
    summary:
      'O esqueleto dos subsistemas do GM Core: acumular ou perder pontos, limiares, corrida contra o relógio e como batizar (Influência, Pesquisa, Infiltração).',
    source: 'GM Core págs. 184–186',
    aonUrl: 'https://2e.aonprd.com/Rules.aspx?ID=3028',
    relatedGuides: ['social', 'infiltration', 'using-subsystems'],
    relatedLinks: [
      { label: 'Classes', to: '/compendio/classes' },
    ],
    sections: [
      {
        heading: 'Para que serve',
        body: `Um teste solto não conta uma negociação, uma infiltração ou o rumo de uma campanha. **Pontos de Vitória** (Victory Points) medem progresso **além** de um d20.

O nome muda para caber na cena. O GM Core já usa: pontos de **Influência**, de **Pesquisa** (Research), de **Infiltração**, de **Reputação**. Na mesa, fale “pontos de Influência” — o jogador precisa entender o que está subindo.

Dá para resolver numa cena ou ir juntando a campanha inteira até decidir o final.`,
      },
      {
        heading: 'Acumular',
        body: `O mais comum: o grupo **sobe** pontos até um limiar, ou junta o máximo no tempo e compara com faixas. Influência funciona assim.

Variação: o **inimigo também** acumula. Quem chega primeiro ganha — ou no fim do relógio ganha quem tiver mais. Melhor do que o inimigo **descontar** do total dos PCs: empate e estagnação aparecem menos.

Escala grande (aventura/campanha): pontos por **objetivo difícil** ou decisão, depois compare com faixas de resultado. Mais pontos = final melhor, em geral. Às vezes “sucesso demais” vira problema (a rebelião vira motim).

Teste padrão para ganhar:
**Crítico:** +2. **Sucesso:** +1. **Falha crítica:** −1.
Na prática o grupo ganha 1 ou nada; o especialista puxa +2; ideia maluca pode custar 1.`,
      },
      {
        heading: 'Diminuir e vários relógios',
        body: `**Diminuir:** o grupo **começa** com pontos e tenta não perder (ovos de dragão, barragem, reputação). Zero = desastre. Se tem relógio, quanto sobrou no fim define o quão ruim foi.

Teste padrão para não perder:
**Crítico:** +1 se der para recuperar terreno; senão, como sucesso.
**Sucesso:** não perde.
**Falha:** −1.
**Falha crítica:** −2.

**Vários tipos de ponto:** cada lado da corrida tem o seu (quem chega a 10 primeiro). Ou Infiltração: vocês sobem Infiltração e o inimigo sobe **Alerta** (Awareness) — inclusive um pouco **sozinho** com o tempo.

Dá para só o **inimigo** ter pontos (Influência dele sobre a facção). O teste do PC **baixa** esse relógio: crítico −2, sucesso −1, falha crítica +1. A matemática é a de acumular, o tema muda.`,
      },
      {
        heading: 'Escala',
        body: `Encontro rápido: **3–5** pontos, sem limiar no meio.
Encontro longo: **7–10**, limiar em 4.
Quase uma sessão: **15–25**, limiares 5 / 10 / 15.
Aventura no fundo (sideline): **15–20**, mesmos limiares.
Aventura no centro: **25–50**, limiares 10 / 20 / 30 / 40.

Limiar = benefício parcial (ou desvantagem, se estiver diminuindo) ou uma reviravolta para a mesa não dormir no meio.

CD alta o tempo todo? Escolha o **fundo** da faixa. Conte quantas chances o grupo tem, se todo mundo é forçado a uma perícia que não tem, e se parte das ações **não** dá ponto (Descobrir na Influência).`,
      },
      {
        heading: 'Na mesa',
        body: `Varie perícia. O mesmo teste repetido enjoa. Relógio ou penalidade para o mesmo PC (ou a mesma perícia) duas vezes empurra o grupo inteiro a agir. Às vezes **todos** precisam: o anfitrião cumprimenta cada um; na infiltração cada um testa Personificar ou Furtividade.

Ideia certeira: sucesso automático. Ideia impossível: falha automática. Não force o d20.

**XP:** cena única = XP de **conquista**, ou encontro de verdade se pesou. Várias sessões = conquista nos marcos. Relógio só de história, sem “sucesso” (que tipo de rei o patrono vira): pode **não** dar XP.`,
      },
    ],
  },
  {
    id: 'encounters',
    name: 'Montar encontros (ameaça e XP)',
    originalName: 'Encounter Design',
    category: 'rules',
    summary:
      'Trivial, baixo, moderado, severo e extremo: orçamento de XP para 4 PCs, custo da criatura por diferença de nível e o que muda com grupo maior.',
    source: 'GM Core págs. 75–76',
    aonUrl: 'https://2e.aonprd.com/Rules.aspx?ID=2715',
    relatedGuides: ['combat', 'dynamic-encounters', 'adventure-design'],
    relatedLinks: [
      { label: 'Companheiros', to: '/compendio/companheiros' },
    ],
    sections: [
      {
        heading: 'Cinco ameaças',
        body: `**Trivial** — quase impossível perder. Aquecimento, paladar, “vocês são heróis”. Ainda pode ser divertido.
**Baixo** — parece perigo; gasta um pouco de recurso. O grupo inteiro só se ferra de verdade com tática péssima.
**Moderado** — desafio sério. Tática e recurso importam se vocês quiserem seguir **sem** descansar.
**Severo** — o mais duro que a maioria ainda vence com boa chance. Chefe, momento da história. Alguém pode morrer; o grupo inteiro, de vez em quando. Má sorte ou recurso baixo vira desastre — deixe a porta de fuga aberta.
**Extremo** — cara a cara, sobretudo se já estão gastos. Só use se aceitar **TPK**: grupo descansado no all-out, final de campanha, mesa veterana.

Perigo complexo entra no mesmo orçamento que criatura.`,
      },
      {
        heading: 'Orçamento (4 PCs)',
        body: `Trivial **40 ou menos** · baixo **60** · moderado **80** · severo **120** · extremo **160**.

Não precisa fechar no milímetro — chega perto. Comece pelo monstro que **precisa** estar lá e gaste o resto.

**Custo da criatura** (nível vs o do grupo):
−4 = **10** (lacaio de ameaça baixa)
−3 = **15**
−2 = **20**
−1 = **30**
igual = **40** (padrão ou chefe fraco)
+1 = **60** · +2 = **80** · +3 = **120** · +4 = **160** (chefe solo extremo)

Fora de −4 a +4 só em caso esquisito.`,
      },
      {
        heading: 'Receitas rápidas',
        body: `**Severo (120):** chefe nível+2 e 4 lacaios nível−4 · ou chefe nível+2 e um tenente do nível do grupo · ou 3 criaturas do nível do grupo.

**Moderado (80):** uma do nível + 4 lacaios −4 · ou um casal do nível · ou uma do nível + duas de −2.

**Baixo (60):** 6 lacaios de nível−4.

**Grupo ≠ 4:** para cada PC **a mais**, some o ajuste do orçamento (trivial ≤10, baixo/moderado **20**, severo **30**, extremo **40**). Para cada PC **a menos**, subtraia o mesmo. O **XP que o grupo ganha** continua o da tabela de **4** — o ajuste só monta o combate.

Melhor **adicionar/tirar inimigos** do que inchar um só. Número de inimigos perto do número de PCs costuma jogar melhor.`,
      },
      {
        heading: 'O que deixa o número mentir',
        body: `Terreno chato (escalar, nadar, difícil) + inimigo à distância pode valer um “monstro extra” no orçamento — sobretudo se o combate **já** é severo.

Não empilhe só moderado: misture trivial/baixo para brilhar e severo para chefes. Extremo, raro.

Combo de habilidades, ou o bicho que contra o grupo inteiro (voador vs mesa sem alcance), estoura o papel. Inimigos da casa conhecem armadilha e pântano; PCs defendendo a base merecem tempo para preparar.

Vários encontros **triviais** que se juntam (alarme no castelo) viram severo sem você querer. Pressão de tempo transforma trivial em tática de verdade.

XP de perigo: guia de perigos. Tesouro ao longo do nível: próximo guia.`,
      },
    ],
  },
  {
    id: 'treasure',
    name: 'Tesouro por nível',
    originalName: 'Treasure by Level',
    category: 'rules',
    summary:
      'Orçamento para 4 PCs ao longo de um nível: itens permanentes, consumíveis, moeda, grupo maior/menor e sandbox.',
    source: 'GM Core pág. 59',
    aonUrl: 'https://2e.aonprd.com/Rules.aspx?ID=2656',
    relatedGuides: ['magic-items', 'buying-selling', 'xp-rewards'],
    relatedLinks: [
      { label: 'Equipamento', to: '/compendio/equipamento' },
      { label: 'Magias', to: '/compendio/magias' },
    ],
    sections: [
      {
        heading: 'O orçamento do nível',
        body: `A tabela vale **entre** este nível e o próximo, para **4 PCs**. Não é “por encontro”: é o **total** do nível. Aventura publicada já vem calibrada — ainda assim olhe se o grupo não ficou para trás, e troque arco +1 por espada +1 se ninguém usa arco.

Padrão da maioria dos níveis:
- **2** itens permanentes de nível **+1** e **2** do **nível do grupo**
- **2** consumíveis de +1, **2** do nível, **2** de nível **−1**
- um saco de **moeda** (não só ouro: gema, arte, matéria-prima, joia, item bem abaixo do nível)

1º nível: muitos “permanentes” são arma, armadura e equipamento do Player Core (10–20 po), não magia. 20º é um nível inteiro de tesouro mesmo sem existir 21º.

Criatura do Monster Core que lista tesouro: **conta** no orçamento do nível.`,
      },
      {
        heading: 'Âncoras (4 PCs)',
        body: `**1º** — total ~175 po; 40 po em moeda (+10 por PC extra).
**3º** — ~500 po: dois permanentes 4º, dois 3º; consumíveis 4º/3º/2º (2 de cada); **120 po**.
**5º** — ~1.350 po; **320 po**.
**10º** — ~8.000 po; **2.000 po**.
**20º** — ~490.000 po; quatro permanentes de 20º; consumíveis 20º×4 e 19º×2; **140.000 po**.

A tabela 1–20 está no GM Core pág. 59. Não precisa decorar cada linha — o padrão de “dois de +1 e dois do nível” segura a mão.`,
      },
      {
        heading: 'Moeda, ajuste e raridade',
        body: `Item permanente **bem abaixo** do nível, se for “moeda” (vão vender ou usar de matéria): conte **metade** do preço. Consumível que o grupo ainda usa (pergaminho): preço **cheio**.

Nível do item na tabela **não é lei**. Troque um permanente de 12º (runa 2.000 po) por armadura +2 resiliente de 11º (1.400 po) + runa sombra de 9º (650 po) se o grupo está pelado. Subir (um item de 13º no lugar de **dois** de 11º) pede cuidado: um PC brilha, os outros não ganham nada, e o efeito pode estourar o nível atual.

Incomum com frequência; **raro** de vez em quando — melhor ainda se veio do inimigo temático. Fórmula incomum/rara é tesouro de quem Fabrica. Se a fórmula se espalhar meses/anos, o item pode virar comum nas lojas.

Fórmula, magia nova no grimório inimigo, técnica rara com um mestre: tesouro que **não** é po.`,
      },
      {
        heading: 'Grupo, sandbox e atraso',
        body: `**Cada PC além de 4:** +1 permanente do nível do grupo ou +1; +2 consumíveis (em geral um do nível e um +1); + a coluna “moeda por PC extra”.

**Menos de 4:** pode subtrair o mesmo, mas o jogo já é mais duro — muita mesa **subtrai menos** e deixa o equipamento extra compensar o papel que falta.

Sandbox / megadungeon (vão **perder** tesouro): coloque como se houvesse **+1 PC**. Estrutura bem solta: ainda mais. Grupo metódico pode sair **acima** da curva.

Longe de cidade, sem fabricar: bolso cheio, ficha fraca. Coloque item **útil** no caminho ou um NPC que troca. Se o grupo pulou um andar, o tesouro daquele andar **não aconteceu** — reponha em outro lugar se eles estão atrasados.

Compare de vez em quando com o tesouro de um personagem **novo** daquele nível (GM Core, tesouro para PCs novos). Devem estar **um pouco acima**. Buraco grande: ajuste o que vem.`,
      },
    ],
  },
  {
    id: 'objects',
    name: 'Objetos: Dureza, quebrado e destruído',
    originalName: 'Item Damage',
    category: 'rules',
    summary:
      'Dano − Dureza, limiar de quebrado, objeto vestido em geral não toma porrada, imunidades de objeto e o que muda na armadura quebrada.',
    source: 'Player Core pág. 269',
    aonUrl: 'https://2e.aonprd.com/Rules.aspx?ID=2143',
    relatedGuides: ['equipment', 'hazards', 'vehicles'],
    relatedLinks: [
      { label: 'Equipamento', to: '/compendio/equipamento' },
    ],
    sections: [
      {
        heading: 'Como o objeto toma dano',
        body: `Todo item tem **Dureza**. O dano entra, a Dureza **abate**, o resto tira PV.

Em geral só toma dano se alguém **ataca o objeto** (porta, alavanca, armadilha). Quem te acerta **não** quebra sua armadura nem a mochila. Exceções: **Bloquear com Escudo** (o escudo paga o que passou da Dureza, dividido com você) e monstros com habilidade que cita item.

Objeto **empunhado ou vestido** (attended) em geral **não** pode ser alvo de Golpe. Solto no chão, sim — e ainda assim Dureza + imunidades tornam isso lento.`,
      },
      {
        heading: 'Quebrado e destruído',
        body: `PV ≤ **limiar de quebrado (BT)** = condição **quebrado**, até **Consertar** (Repair) subir os PV **acima** do BT.
PV **0** = **destruído**. Não conserta.

Efeito que **deixa quebrado** na hora: se os PV estavam acima do BT, caem **para o BT**.

Sem BT no bloco: não muda de função por “quebrado”, mas ainda some em 0 PV.

**Quebrado:** não cumpre a função, não dá bônus — **exceto armadura**. Armadura quebrada **ainda** dá o bônus de item na CA, com penalidade de **status**: −1 leve, −2 média, −3 pesada. Dex Cap, penalidade de teste e o resto da armadura **continuam**. Escudo quebrado, arma quebrada: não usam o que deveriam.

Dureza, PV e BT vêm sobretudo do **material** (tabelas no GM Core). Item **tosco** (shoddy): metade do preço, não vende, −2 de item nos testes/CDs que o item aplica, penalidade de teste da armadura piora 2, PV e BT pela **metade**.`,
      },
      {
        heading: 'Imunidades de objeto',
        body: `Objeto inanimado e perigo, salvo o texto, ignoram: sangramento, efeitos de **morte**, doença, cura, efeitos **mentais**, ataques **não letais**, veneno, espírito, vitalidade, vazio (void), e as condições condenado, **drenado**, fatigado, paralisado, enjoado e inconsciente.

Item **consciente e pensante** não é imune a mental. Muita outra condição o MJ corta no bom senso: espada não tem Speed para penalizar; lâmina giratória de armadilha, talvez sim.

Perigo usa as mesmas regras de objeto (guia de perigos): estatística que o bloco não lista não pode ser alvo.`,
      },
      {
        heading: 'Na mesa',
        body: `Porta: Golpe vs CA do objeto, ou **Forçar abertura** (Atletismo), conforme a cena. Arma com traço **razing** (Player Core 2) soma dano extra vs objeto, estrutura e veículo.

Consertar é Ofício (guia de intervalo). Destruído = sucata, no máximo matéria-prima a critério do MJ.

Escudo: Dureza, PV e BT estão no bloco da arma/escudo — o guia de equipamento cobre Erguer e Bloquear.`,
      },
    ],
  },
  {
    id: 'death-effects',
    name: 'Traço morte e morte instantânea',
    originalName: 'Death Effects',
    category: 'rules',
    summary:
      '0 PV por efeito de morte = morto, sem morrendo 4; efeitos que matam sem dano; dano maciço; imunidade; o cadáver como objeto.',
    source: 'Player Core págs. 411–412',
    aonUrl: 'https://2e.aonprd.com/Rules.aspx?ID=2331',
    relatedGuides: ['combat', 'incapacitation', 'hero-points'],
    relatedLinks: [
      { label: 'Magias', to: '/compendio/magias' },
      { label: 'Rituais', to: '/compendio/rituais' },
    ],
    sections: [
      {
        heading: 'O traço morte',
        body: `Efeito com o traço **morte** mata **na hora** ou te empurra para a morte **sem** precisar passar por morrendo 4. Costuma ser energia do **Vazio** (Void), antítese da vida, ou algo que mira mente ou alma.

Se um efeito de morte te põe em **0 PV**, você **morre** — não ganha morrendo, não rola recuperação. *Visão da Morte* é o exemplo: as alucinações derrubam e o alvo que chega a 0 **já está morto**.

Alguns textos matam **sem dano** e **sem** 0 PV. Falhou a salvaguarda do golpe da Ceifadora: morreu. Sem morrendo, sem nocaute.

Imunidade a efeitos de **morte** (o traço) ignora o pacote. Imunidade a um tipo de dano **não** ignora o resto: imune a morte ainda toma o dano de veneno de uma nuvem tóxica, se a magia tiver as duas partes.`,
      },
      {
        heading: 'Dano maciço',
        body: `Um **único** golpe com dano ≥ **o dobro** dos seus PV **máximos** mata na hora, mesmo sem o traço morte. Não é o total do round: é aquele golpe.

PC de 40 PV máximos: 80 de dano num *Bola de Fogo* (depois de salvaguarda, fraqueza, resistência) mata. 79, não.`,
      },
      {
        heading: 'Pontos de herói e incapacitação',
        body: `Gastar todos os pontos de herói só dispara quando **morrendo ia subir**. Morte instantânea **pula** morrendo: esse gasto **não** entra. Dano maciço também não.

Traço **incapacitação** (outro guia) é o freio para *Sono* em chefe. Traço **morte** é outro eixo: muitos efeitos de morte **também** têm incapacitação, mas não conte com isso — leia o bloco.

Regras míticas trocam o teto de morrendo por condenado; morte instantânea **continua** instantânea.`,
      },
      {
        heading: 'Depois que morreu',
        body: `Você não age, não recupera ação, e para a maioria das magias vira **objeto** (salvo magia que cite morto). PV vão a 0 se não estavam; **não** sobem de 0 enquanto estiver morto.

*Reviver os Mortos* e o ritual *Ressuscitar* existem — com custo, prazo e risco. Artefato raro pode **bloquear** até isso.

Morto-vivo e construto em 0 PV já são **destruídos** no combate normal (guia de combate). Efeito de morte em morto-vivo muitas vezes nem pega: o bloco e as imunidades mandam.`,
      },
    ],
  },
  {
    id: 'infiltration',
    name: 'Infiltração e golpe',
    originalName: 'Infiltration',
    category: 'rules',
    summary:
      'Objetivos, obstáculos (pontos de Infiltração), Alerta que sobe com o tempo, complicações, oportunidades e pontos de Vantagem na preparação.',
    source: 'GM Core págs. 196–199',
    aonUrl: 'https://2e.aonprd.com/Rules.aspx?ID=3059',
    relatedGuides: ['victory-points', 'chases', 'social'],
    relatedLinks: [
      { label: 'Equipamento', to: '/compendio/equipamento' },
    ],
    sections: [
      {
        heading: 'O que é',
        body: `Entrar no covil, na sede da guarda ou no baile **sem** enfrentar todo mundo de frente. Interpretação primeiro; o subsistema só mede o progresso.

O round dura o que a história pedir (10 minutos, 1 hora…). Cada round, cada PC descreve o que faz.

**Objetivo:** entrar, achar alguém, plantar prova, sair com a relíquia. Um só, ou em sequência (entrar → abrir o cofre → fugir). Quando **todos** terminam o último, a infiltração deu certo.

Para cada objetivo, o grupo precisa superar um número de **obstáculos**. Ofereça **mais** opções do que o necessário: tem mais de um jeito de entrar no castelo, e cada um joga no que é bom. Um PC pode já estar no segundo objetivo enquanto outro ainda escala o muro.`,
      },
      {
        heading: 'Obstáculos e pontos de Infiltração',
        body: `Cada obstáculo pede um tanto de pontos de Infiltração — em geral **1 ou 2**, às vezes mais. O bloco lista como superar (perícia, Percepção, magia, item) e se é **individual** (cada um junta os seus) ou **de grupo** (a mesa junta num bolo). Muro = individual; fechadura aberta = grupo (um abre, todos passam). Cada obstáculo só se supera **uma vez** naquele objetivo.

No turno: descreve, testa se precisar.

**Crítico:** +2 pontos de Infiltração.
**Sucesso:** +1.
**Falha:** o grupo ganha **1** ponto de **Alerta**.
**Falha crítica:** **2** de Alerta.

Magia ou item que resolve sozinho: em geral +1 (ou +2 se foi decisivo). Travou no obstáculo individual? Oportunidade (abaixo) deixa um aliado ajudar.

Exemplos: posto de guarda (2 individuais, Enganação/Diplomacia/Furtividade); porta trancada (1 de grupo, Atletismo ou Prestidigitação difícil); armadilha (3 de grupo — falha crítica ainda **dispara** a armadilha).`,
      },
      {
        heading: 'Alerta (Awareness)',
        body: `Pontos de Infiltração são **por obstáculo**. **Alerta** é um bolo só, de toda a mesa, a infiltração inteira.

Sobe de três jeitos:
1. Falha / falha crítica no obstáculo (+1 / +2).
2. **+1 no fim de cada round** — o tempo denuncia.
3. Barulho, briga, cena que chama atenção (o MJ decide). Outra falha que **não** é obstáculo só sobe Alerta se fizer bagunça de verdade.

A cada ~**5** de Alerta, alguma coisa piora. Teto típico: **o dobro** dos pontos de Infiltração que o grupo precisa no total — aí a infiltração **falha**. Falhar não acaba a campanha: vira combate, prisão, plano B.

Esquema para um golpe de 10 pontos de Infiltração: 5 Alerta = +1 nas CDs e uma complicação; 10 = complicação; 15 = +2 nas CDs e complicação; **20 = falhou**.`,
      },
      {
        heading: 'Complicações, oportunidades e Vantagem',
        body: `**Complicação** — plano azedou. Gatilho: falha crítica, limiar de Alerta, magia errada no castelo do mago. Tem de resolver **antes** de voltar aos obstáculos; gasta o turno. Muitas são evento único (mesmo na falha você “passa”, com custo). Umas pedem pontos de Infiltração. Combate no meio: cada round de barulho sem cuidado **sobe Alerta**. Mire ~**duas** complicações por limiar de Alerta — senão o golpe vira só apagar incêndio.

Exemplo: “Eu te conheço?” no primeiro 5 de Alerta — Enganação, Diplomacia, Performance ou Furtividade para despistar.

**Oportunidade** — não dá ponto de objetivo. Dá senha mágica, **baixa Alerta**, reduz CD depois. Falhar pode subir Alerta. Umas uma vez (chaves do guarda); outras repetem (distração). **Alisar o caminho:** você já passou do obstáculo individual e um aliado não — no turno você **Segue o perito** para ele (ou, raro, testa no lugar dele).

**Preparação** (intervalo, dias limitados): scout, suborno, disfarce, fofoca, contato, documento falso. Ganha **pontos de Vantagem** (Edge). Ao falhar (ou criticar para baixo) num obstáculo ou complicação, gasta 1 para **transformar em sucesso** — se a vantagem fizer sentido (papel forjado não abre fechadura). Muita Vantagem = baixe os limiares de Alerta, senão some o suspense. Atividade malfeita pode **começar** a infiltração já com Alerta, ou entregar um ponto de Vantagem que **não funciona** (o MJ revela na hora certa).`,
      },
    ],
  },
  {
    id: 'research',
    name: 'Pesquisa (biblioteca e ruína)',
    originalName: 'Research',
    category: 'rules',
    summary:
      'A atividade Pesquisar, pontos de Pesquisa por lugar (teto por fonte), limiares que mudam a biblioteca e quando um teste solto basta.',
    source: 'GM Core pág. 190',
    aonUrl: 'https://2e.aonprd.com/Rules.aspx?ID=3045',
    relatedGuides: ['victory-points', 'skills', 'setting-dcs'],
    relatedLinks: [
      { label: 'Magias', to: '/compendio/magias' },
    ],
    sections: [
      {
        heading: 'Quando usar',
        body: `Informação importante **com** relógio, rival ou risco. Sem pressão e com a biblioteca segura, um teste de perícia resolve — o grupo pode rerrolar até achar tudo.

Round = 10 minutos até **1 dia**. Cada round, cada um usa a atividade de exploração **Pesquisar** e junta pontos de Pesquisa. Limiar alcançado = saber novo, recompensa, ou problema (livro falante, guardião). Isso pode **interromper** a pesquisa e virar encontro social ou combate.`,
      },
      {
        heading: 'A “biblioteca”',
        body: `Não precisa ser estante. Palácio de memória no Astral, galeria de ícones, mansão cheia de convidado. Trate como um lugar de aventura: salas, obstáculos, gente.

Em cada canto você coloca um **teste de pesquisa**: o que estão fazendo (ler, destilar amostra, convencer o bibliotecário), perícias da **mais fácil à mais difícil**, e um **teto** de pontos naquela fonte. Esgotou o teto: reler o mesmo tomo **não** dá mais ponto — têm de explorar outro canto. Uma fonte fácil na entrada ensina o tema; o miolo pede o resto.

Conhecimento de Academia e de Biblioteca entram bastante, mas misture: livro de aeromancia voando pede **Atletismo** para a escada. Perícia fora da lista, se a mesa justificar: em geral a **CD mais alta** daquela fonte.`,
      },
      {
        heading: 'Pesquisar',
        body: `Exploração, concentração. Escolhe o tópico / a seção e testa. A atividade ganha os traços da cena (linguístico se for ler).

**Crítico:** +2 pontos de Pesquisa.
**Sucesso:** +1.
**Falha crítica:** descoberta **falsa** e **−1**.

O bloco do tópico lista as fontes (com área) e os **limiares**, do menor ao maior. Cada limiar **faz alguma coisa**: dado tático, magia incomum, CD mais baixa daqui pra frente, fantasma aparecendo. História pura só nos limiares baixos. Não precisa espaçar igual — pista crucial barata, prêmio final caro.

Evento de **calendário** (carta no terceiro dia) vai abaixo do bloco, separado dos pontos.`,
      },
      {
        heading: 'Na mesa',
        body: `Nível do desafio = o da “biblioteca”. CD pela tabela de nível do grupo (guia de CDs). Varie perícia para o lutador também jogar.

Exemplo de estrutura (não copie a aventura): três fontes com tetos 5 / 10 / 15; limiares em 5, 10, 15, 20, 30 — lenda → local e combate → magia incomum → senha → proteção **e** o vilão manda destruir o que restou.

Sem tempo? Não use isto. Com rival pesquisando o mesmo tema, o relógio vira o segundo bolo de pontos (guia de Pontos de Vitória).`,
      },
    ],
  },
  {
    id: 'chases',
    name: 'Perseguições',
    originalName: 'Chases',
    category: 'rules',
    summary:
      'Obstáculos com pontos de Perseguição, perseguido age primeiro, ritmo do NPC, quatro tipos de corrida e o que fazer quando a mesa trava.',
    source: 'GM Core págs. 192–195',
    aonUrl: 'https://2e.aonprd.com/Rules.aspx?ID=3049',
    relatedGuides: ['movement', 'vehicles', 'mounted-combat'],
    relatedLinks: [
      { label: 'Companheiros', to: '/compendio/companheiros' },
    ],
    sections: [
      {
        heading: 'Quando o Speed não basta',
        body: `Sprint curto em terreno limpo: regra de Deslocamento do Player Core. Mercado lotado, desfiladeiro, recado urgente na montanha: o subsistema troca Speed cru por **obstáculos**.

É encontro. **Perseguido age primeiro**, depois quem corre atrás. Para menos loteria, os PCs rolam e o NPC anda num **ritmo fixo** (em geral **1 obstáculo por round**; mais lento se o obstáculo pede muitos pontos). Quer vai-e-vem: os dois lados rolam.

Na mesma equipe, a ordem entre vocês é livre. **Tem** de agir no turno. Passou a vez ou não pode agir: o grupo **perde 1** ponto de Perseguição.

Diga no começo quanto dura o round: 3 ações, minutos, horas, dias.`,
      },
      {
        heading: 'Obstáculos',
        body: `A distância entre um e outro é **narrativa**. Metade dos obstáculos pede pontos = número de PCs **−1**; a outra metade, **−2** (mínimo 1). Os difíceis pedem mais.

No turno: descreve como ajuda o grupo a passar, testa se precisar.

**Crítico:** +2. **Sucesso:** +1. **Falha crítica:** **−1**. O total do grupo **não** desce abaixo de 0.
Magia/item que resolve sozinho: +1 (ou +2 se foi decisivo).

Pontos **não** passam para o próximo obstáculo. Quem ainda **não** agiu neste round pode agir **já no próximo** obstáculo — por isso o especialista do obstáculo **atual** costuma ir primeiro.

Ideia fora da lista: o MJ define CD na hora (guia de CDs). Cuidado com “eu uso só Acrobacia em tudo”: algumas táticas **não** funcionam, ou só salvam **um** PC.

CD típica: simples do nível, uma via **fácil ou muito fácil**, outra **padrão ou difícil**. Barreira de um NPC específico: use a CD dele — pode ficar brutal.

Curta: **6** obstáculos (~10–20 min de mesa). Média: **8**. Longa: **10**.`,
      },
      {
        heading: 'Quatro tipos e o fim',
        body: `**Caçar:** PCs atrás. Vocês agem **depois**. Inimigo começa **1** obstáculo à frente (ou no mesmo, se for curta). Acaba se alcançarem ou se o inimigo chegar no esconderijo.

**Fugir:** PCs na frente, agem **primeiro**. Em geral 1 obstáculo de vantagem. Acaba no destino **ou** se no fim do round estiverem **3** obstáculos na frente (perderam o rastro).

**Relógio:** passar todos os obstáculos em N rounds (desastre natural, prova cronometrada). Em geral N obstáculos = N rounds.

**Competição:** dois grupos atrás da mesma coisa. Como caçar, mas qualquer lado ganha; podem rolar iniciativa entre os perseguidores.

Melhor um **obstáculo-fuga** no fim do que “acabou no round 8”: você não controla quantos obstáculos o NPC come. Três de vantagem também encerra — mas ainda tenha um ponto final se isso nunca acontecer.

Grupo separado (cada um sozinho): um **sucesso** já passa o obstáculo; crítico dá +2 de circunstância no **primeiro** teste do próximo. Evita o jogador preso numa CD impossível sem aliado.`,
      },
      {
        heading: 'Na mesa',
        body: `Narra o obstáculo **antes** da lista de perícias. Diga as CDs das vias padrão (ou pelo menos qual é a fácil). Descreva o vão fechando: grito longe → vislumbre → cara a cara. O kaiju atrás achata o bosque que vocês acabaram de atravessar.

Cartão ou mapa largo (sem grade de 1,5 m): um token por lado. Cartões virados até chegar; scout pode espiar o próximo.

**Travou 3 rounds** no obstáculo padrão: ache outro caminho. Se não fizer sentido (esfera mágica fechada), um NPC cobra caro para abrir.

O GM Core traz tabelas de obstáculo (subsolo, cidade, mato) com um jeito fácil e um difícil — use como molde, não como lista fechada. Varie perícia para o campeão e o ladino brilharem em obstáculos **diferentes**.`,
      },
    ],
  },
  {
    id: 'reputation',
    name: 'Reputação com facções',
    originalName: 'Reputation',
    category: 'rules',
    summary:
      'Pontos de Reputação de −50 a +50, favores e desserviços, as sete faixas (ignorado até caçado) e quando a história manda pular a conta.',
    source: 'GM Core págs. 200–201',
    aonUrl: 'https://2e.aonprd.com/Rules.aspx?ID=3072',
    relatedGuides: ['victory-points', 'social', 'downtime'],
    relatedLinks: [
      { label: 'Origens', to: '/compendio/origens' },
    ],
    sections: [
      {
        heading: 'O que mede',
        body: `Como um **grupo** (guilda, igreja, vila, governo) vê os PCs no médio e longo prazo — não a atitude de um NPC. Aquele guarda pode gostar de vocês mesmo com a milícia malvista.

Começam em geral **ignorados** (−4 a +4): nunca ouviram falar, ou tanto faz. Famosos/infames numa facção vizinha: o MJ começa noutra faixa.

Teto **+50**, piso **−50**.`,
      },
      {
        heading: 'Favores e desserviços',
        body: `**Favor menor** — tarefa rápida, pouco tempo de mesa: **+1**.
**Moderado** — um pedaço da sessão ou a sessão quase inteira: **+2**.
**Maior** — missão de várias sessões: **+5**.

**Desserviço** não segue o relógio da mesa: um ato rápido e hediondo já é maior.

Menor **−1** (deslize ou acúmulo de afrontas). Moderado **−2** (atrapalhou de verdade, ou feriu um princípio sem ser apocalipse). Maior **pelo menos −5** — ou zera a reputação **e ainda** tira 5 (sabotar o fim do mundo do culto).`,
      },
      {
        heading: 'As sete faixas',
        body: `**Reverenciado** 30–50 — todo mundo ouviu falar, **prestativo**, arrisca o pescoço. Só favor **maior** sobe; só desserviço moderado/maior desce.
**Admirado** 15–29 — a maioria conhece; muitos prestativos, o resto amistoso. Só favor maior sobe; qualquer desserviço desce.
**Apreciado** 5–14 — quem conhece costuma ser **amistoso**. Só favor moderado/maior sobe; qualquer desserviço desce.
**Ignorado** −4 a +4 — sem bônus nem penalidade. Qualquer favor ou desserviço mexe.
**Malvisto** −5 a −14 — quem conhece costuma ser **antipático**. Qualquer favor sobe; só desserviço moderado/maior desce.
**Odiado** −15 a −29 — a maioria **hostil**, o resto antipático; pulam em chance fácil de prejudicar vocês. Qualquer favor sobe; só desserviço maior desce.
**Caçado** −30 a −50 — inimigo público; hostil, arriscam o pescoço para destruir vocês. Só favor moderado/maior sobe; só desserviço maior desce.

A coluna “o que ainda mexe” evita que um recado menor suba herói já reverenciado — ou que um xingamento pior o caçado.`,
      },
      {
        heading: 'Na mesa',
        body: `Rode no fundo, sobretudo em sandbox: a facção que vocês veem de dois em dois meses reage ao que fizeram. Se o número brigar com a história, a história ganha. Guardas caçando por prefeito corrupto + vocês desmascaram o prefeito e salvam a vila: pode **pular** de caçado para apreciado. Inimigo que arma um quadro: reputação cai **sem** desserviço real.

Isto não substitui Causar boa impressão num NPC. Um reverenciado ainda pode levar um não de um indivíduo teimoso.

Pathfinder Society usa o mesmo esqueleto com limiares diferentes — inspiração, não regra da sua campanha.`,
      },
    ],
  },
  {
    id: 'climate',
    name: 'Clima, temperatura e vento',
    originalName: 'Climate',
    category: 'rules',
    summary:
      'Névoa e chuva, fadiga na viagem, tabela de frio/calor (dano e horas até fatigar) e o que o vento faz em voo, flecha e chama.',
    source: 'GM Core pág. 95',
    aonUrl: 'https://2e.aonprd.com/Rules.aspx?ID=2814',
    relatedGuides: ['exploration', 'movement', 'environmental-damage'],
    relatedLinks: [
      { label: 'Equipamento', to: '/compendio/equipamento' },
    ],
    sections: [
      {
        heading: 'Clima não é só cenário',
        body: `Pode somar penalidade de **circunstância** de −1 a **−4** conforme a força (Percepção, ataque à distância…). Combine com terreno do guia de movimento para o encontro ficar na memória.`,
      },
      {
        heading: 'Névoa, chuva e neve',
        body: `**Nevoeiro:** penalidade de circunstância em Percepção **visual**; criatura vista através de bastante nevoeiro fica **oculta**; visibilidade some a **800 m** ou menos. **Névoa** (mist) corta por volta de **1,5 km**; **bruma** (haze), uns **5 km**.

**Precipitação:** chuva, neve, granizo, chuva congelada. Molhada apaga chama; congelada vira neve/gelo no chão. Garoa ou neve leve: quase só visibilidade.

A maioria penaliza Percepção visual. Granizo costuma ser mais **barulho** (Percepção auditiva). Temporal ou neve pesada: criatura **longe** pode ficar oculta.

Mais que garoa/neve leve: viagem terrestre fatiga em **4 horas** (não 8). Personagem **encharcado** no frio trata a temperatura **um degrau pior** (ameno → severo, severo → extremo).

Trovoada: vento + chuva forte. Chance **pequena** de raio: dano elétrico **moderado**, ou **maior** em tempestade severa (categorias do GM Core).`,
      },
      {
        heading: 'Temperatura',
        body: `Na faixa confortável só descreva a roupa. Fora dela, a viagem fatiga mais cedo e o clima **causa dano**. Equipamento de frio anula o dano de frio **severo** ou reduz o **extremo** para o de severo.

Horas até fatigar na marcha / dano (GM Core; °C arredondado):

**Frio incrível** (≤ −62 °C): 2 h; frio **moderado** por minuto.
**Frio extremo** (~−62 a −29 °C): 4 h; frio menor a cada 10 min.
**Frio severo** (~−29 a −11 °C): 4 h; frio menor por hora.
**Frio ameno** (até 0 °C): 4 h; sem dano.
**Normal** (1–34 °C): 8 h; sem dano.
**Calor ameno** (35–40 °C): 4 h; sem dano.
**Calor severo** (41–45 °C): 4 h; fogo menor por hora.
**Calor extremo** (46–59 °C): 4 h; fogo menor a cada 10 min.
**Calor incrível** (≥ 60 °C): 2 h; fogo **moderado** por minuto.

Umidade alta: os limiares de **calor** descem ~8 °C (15 °F no livro) — o mesmo dia quente pega mais cedo. A tabela em °F está no GM Core pág. 95.`,
      },
      {
        heading: 'Vento',
        body: `Penalidade de circunstância em Percepção **auditiva**. Ataque físico à distância (flecha, arremesso): penalidade no ataque; vendaval forte pode tornar **impossível**. Apaga chama na mão; lanterna aguenta até vento **muito** forte.

**Voar:** terreno difícil ou difícil maior. Precisa **Manobrar em voo**; falha crítica (ou falhar em fazer **pelo menos um** teste desses no round) = o vento **leva**.

No chão, vendaval pode pedir Atletismo para andar; falha crítica derruba e joga para trás. Criatura **Pequena** em geral −1 de circunstância nesse teste; **Minúscula** −2.`,
      },
    ],
  },
  {
    id: 'vehicles',
    name: 'Veículos: piloto, rumo e colisão',
    originalName: 'Vehicles',
    category: 'rules',
    summary:
      'Veículo é objeto, rumo, propulsão, Conduzir (1–3 ações), imprudente, desgovernado, atropelar, quebrado e o que muda no combate a bordo.',
    source: 'GM Core págs. 210–213',
    aonUrl: 'https://2e.aonprd.com/Rules.aspx?ID=3116',
    relatedGuides: ['objects', 'chases', 'movement'],
    relatedLinks: [
      { label: 'Companheiros', to: '/compendio/companheiros' },
      { label: 'Equipamento', to: '/compendio/equipamento' },
    ],
    sections: [
      {
        heading: 'O que é um veículo',
        body: `Carroça na perseguição, galeão na campanha de pirata, aeronave antiga. Fora de combate, o **Speed** vira velocidade de viagem (tabela do Player Core) — sem Conduzir nem teste. No encontro, o piloto gasta ações.

Veículo é **objeto**: imunidades de objeto, **não age sozinho**. O bloco traz tamanho em metros (não o quadrado de criatura), tripulação, passageiros, perícias de piloto, CA, Fortitude, Dureza, PV, limiar de quebrado, Speed com o tipo de **propulsão**, e dano/CD de **colisão**.

Carga típica: ~**100 Bulk** por criatura Grande puxando. Navio: facilmente **1.000 Bulk** (volume). Aéreo: ~**1/10** do aquático para continuar no ar.`,
      },
      {
        heading: 'Rumo e propulsão',
        body: `Criatura vira no lugar. Veículo **não**. Marque o **rumo**. Só anda para frente; vira aos poucos. Em geral **até 90°** a cada comprimento que avançou: carroça de 3 m vira em 3 m; navio de 30 m precisa de 30 m (vários rounds se o Speed for 9 m). “Linha reta” mede do centro da frente e pode desviar **até 45°** do rumo.

Cinco propulsões (às vezes duas no mesmo bloco; usa **uma** por vez):

**Puxado** — Speed **não** passa do puxador mais lento. Os animais agem **dentro** das ações do veículo. Colisão acerta eles também (Reflexos básico). Natureza para animal; Diplomacia ou Intimidação se quem puxa é sapiente.
**Remado** — igual, mas os remadores em geral têm cobertura. Diplomacia ou Intimidação.
**Vento** — vento ruim trava ou desgoverna; vela de pano costuma ter fraqueza a fogo. Natureza.
**Alquímico** — vapor, combustão, gás. Muitas vezes Ofício.
**Mágico** — *Dissipar Magia* contrapõe (posto = metade do nível do veículo, CD padrão daquele nível). Arcana, Natureza, Ocultismo ou Religião, conforme a magia.

Guns & Gears acrescenta relógio (dar corda) e elétrico.`,
      },
      {
        heading: 'Pilotar no encontro',
        body: `Move no **turno do piloto**. Só **1** ação de movimento do veículo por round — dois PCs Assumindo o controle **não** andam duas vezes.

Se andou no round anterior, neste o piloto **Conduz** de novo ou **Para**. Senão (inclusive se **Adiar**), segue e fica **desgovernado**.

CD de piloto: padrão do **nível do veículo**. Terreno difícil → difícil; difícil maior → incrivelmente difícil. Vento, mar, monstro no tiro: o MJ sobe.

**Assumir o controle** (1 ação, manipular): a bordo, ao lado dos controles. Teste; sucesso = você é o piloto (ou recupera o desgovernado). Alguns controles viram atividade de várias ações.

**Embarcar / desembarcar** (1 ação, movimento): adjacente à entrada. Em movimento: Acrobacia ou Atletismo vs **CA do veículo**.

**Parar** (1 ação, manipular): o veículo está em movimento.

**Conduzir** — declare quantas ações **antes**. Não atravessa criatura, nem aliada.
**1 ação:** teste. Sucesso = até o Speed, vira normal. Falha = Speed em linha reta. Falha crítica = reta **e** desgovernado.
**2 ações** (imprudente): até **2×** Speed em reta no rumo atual.
**3 ações** (imprudente): **−5** no teste para manter o controle; até **3×** Speed em reta.

**Imprudente:** testa **antes** de resolver. Sucesso = a ação sai. Falha = Speed em reta (desvio de até 45° a critério), **desgovernado**.

**Atropelar** (3 ações, imprudente, movimento): se manteve o controle, até 2× Speed em reta. Atropela quem for **dois tamanhos menor** ou menos; pode **bater** em **um** alvo um tamanho menor ou maior. Cada um toma o dano de colisão (Reflexos básico na CD de colisão; piloto inimigo pode testar piloto no lugar). Se o alvo da batida **tomou dano**, você e o veículo tomam colisão **sem salvaguarda** e o movimento **acaba**.`,
      },
      {
        heading: 'Desgovernado, combate e quebrado',
        body: `Fica desgovernado: falhou no imprudente; passou o round sem Conduzir/Parar; o piloto **não pôde agir** no meio do movimento (Golpe reativo nocauteou). Continua no lugar de iniciativa do último piloto, **−3 m** por round, em reta no rumo, até bater ou parar. Subida, terreno ruim, vento contra: pode desacelerar mais; descida ou vento a favor: manter ou acelerar. No caminho usa o efeito de **Atropelar**, com essa distância.

Ataque a bordo se o veículo andou neste round: **−2**; **−4** se estava desgovernado ou se alguma ação foi **imprudente**. Cobertura: aberto (bigas, barco sem teto) em geral menor, ou padrão contra quem está no chão; fechado (carruagem) maior, ou bloqueia. Arma montada: em geral à distância, às vezes só num arco.

**Quebrado:** −2 na CA, salvaguardas e CD de colisão; CD de piloto **+5**; Speeds **pela metade**. **0 PV** = destruído (afunda na água; no ar, queda para todo mundo a bordo). Puxado ou remado destruído: dano de colisão **sem salvaguarda** em quem puxava/remava — e talvez tenham de ser **retirados** do destroço.`,
      },
    ],
  },
  {
    id: 'intelligent-items',
    name: 'Itens inteligentes',
    originalName: 'Intelligent Items',
    category: 'rules',
    summary:
      'Tesouro que é NPC: traço inteligente, 3 ações no turno do parceiro, recusar runa, −2 se boicotar, comunicação e o que o bloco traz a mais.',
    source: 'GM Core págs. 304–305',
    aonUrl: 'https://2e.aonprd.com/Rules.aspx?ID=3235',
    relatedGuides: ['magic-items', 'relics', 'cursed-artifacts'],
    relatedLinks: [
      { label: 'Equipamento', to: '/compendio/equipamento' },
    ],
    sections: [
      {
        heading: 'Tesouro e NPC ao mesmo tempo',
        body: `Espada que discute, amuleto que só fala com você. Complemento ou **contraponto** do PC que investe. Por ter agência limitada, rouba menos holofote que um NPC andando junto.

Pode ser **também** artefato, item amaldiçoado ou relíquia. Não se Fabrica no intervalo: acidente, ato divino ou sacrifício grande. Por isso é sempre **raro** ou **único**.

O resto do tipo continua: investir, empunhar, Dureza, runas. O bloco acrescenta o que criatura tem e objeto não.`,
      },
      {
        heading: 'O que o bloco lista',
        body: `**Percepção** e **só** os sentidos escritos — não assume visão. Se viu o que o parceiro não viu, pode avisar.

**Comunicação:** empatia (só emoção), fala, telepatia. Empatia e telepatia muitas vezes só com o parceiro ou a X metros. Idiomas entre parênteses. Sem “fala” na lista: **entende**, não fala.

**Perícias** de Inteligência, Sabedoria ou Carisma que cabem no conceito.

**Atributos:** só INT, SAB e CAR. Sem Força, Destreza, Constituição.

**Vontade:** efeito mental pede salvaguarda. Vontade baixa demais vira item fácil de controlar — e a vida do parceiro vira inferno.`,
      },
      {
        heading: 'Agência no turno',
        body: `Por padrão o item **manda na própria magia**. Arma inteligente pode **negar** runa fundamental e de propriedade. **Ele** ativa as habilidades, quando quer.

Em geral **3 ações** no **turno do parceiro**, que **não** saem das 3 do PC. Tem reação se alguma ativação for reação.

Além de recusar magia e reclamar: se for a arma ou a ferramenta da ação (kit de ladrão), pode atrapalhar o bastante para **−2** de circunstância — como ferramenta improvisada. Tomar o corpo do parceiro **só** se o bloco disser.`,
      },
      {
        heading: 'Na mesa',
        body: `Decida o papel **antes** dos números: aliado da missão, confidente, folha cômica, poder que vale o risco moral. Personalidade e poderes crescem juntos.

Modificadores: em geral os de **criatura daquele nível**. Fraco de propósito pode, mas Vontade fraca + poder de ferrar o PC = problema.

Conta como um personagem **a mais**, limitado. *Bola de Fogo* de 3º **todo round** num item normal gasta ação do PC; no inteligente **soma** ao que o grupo já faz — calibre o encontro.

Serithtial e os exemplos do GM Core são ponto de partida, não lista fechada.`,
      },
    ],
  },
  {
    id: 'relics',
    name: 'Relíquias que crescem com o herói',
    originalName: 'Relics',
    category: 'rules',
    summary:
      'Semente, dois aspectos, dons menor/maior/grandioso, tabela típica (1º / 5º / 9º / 13º / 17º), tesouro que se corta e CD do dono.',
    source: 'GM Core págs. 308–310',
    aonUrl: 'https://2e.aonprd.com/Rules.aspx?ID=3248',
    relatedGuides: ['treasure', 'magic-items', 'intelligent-items'],
    relatedLinks: [
      { label: 'Equipamento', to: '/compendio/equipamento' },
      { label: 'Origens', to: '/compendio/origens' },
    ],
    sections: [
      {
        heading: 'Semente, não loja',
        body: `Item que **cresce** com o dono e vira parte da lenda. Começa **semente**: objeto funcional com um sopro de magia. **Dons** (gifts) entram pela história — do item, do PC ou da campanha.

Passou para outro PC: o processo **recomeça** (os mesmos dons, ou outros). Roubaram: em geral ainda funciona um tempo e vai **apagando** se não voltar — o MJ fecha com a história.

O MJ **decide** se a mesa usa relíquia, quantas (uma por PC ou uma ou duas temáticas) e como corta o tesouro. **Não** se compra nem se Fabrica.`,
      },
      {
        heading: 'De onde vem',
        body: `**De origem:** amuleto da família, a primeira espada, presente do mestre. O jogador escolhe a forma (maça enferrujada, anel de cobre, manto surrado). Um aspecto já nasce da história; o outro a mesa revela.

**De campanha:** o MJ escolhe forma e aspectos para cravar o tema. Costuma **já** ter magia quando acham.

Dois **aspectos** (ar, besta, celestial, morte, terra, demônio, fogo, vida, mente, planta, sombra, água…). Quase sempre o dom casa com **um** deles. Adaga de latão com fogo + mente ganha raio de chama, não geodo de terra.

Nível da relíquia = nível do **dono**. Arma, armadura e escudo ganham runa **fundamental** normal. Runa de **propriedade:** o MJ decide; o padrão é **não** (como item específico).`,
      },
      {
        heading: 'Quando entra um dom',
        body: `A tabela é **ritmo**, não relógio. Em geral **um dom a cada ~4 níveis**, nos marcos da história (matou o vilão, ritual, juramento).

Típico: **1º** menor (~20 po); **5º** menor (~160 po); **9º** maior (~700 po); **13º** maior (~3.000 po); **17º** grandioso (~15.000 po). Evite menor no **10º+** — some na ficha, salvo o que escala bem. Quase nenhuma relíquia tem **dois** grandiosos.

O MJ escolhe o dom, ou oferece **dois caminhos**. O item cobre fraqueza e reforça o que o PC já faz, sem virar salada.

**Variante dirigida pelo jogador:** o PC escolhe os dons na subida de nível e narra o porquê. Tesouro ainda se corta. Não misture “runa no lugar de dom” nessa variante.

Runa no lugar de dom: use **nível e preço da runa**, não a tabela acima. Se permitir propriedade, elas ocupam **espaço de runa**.`,
      },
      {
        heading: 'Tesouro, CD e semente',
        body: `Corte o orçamento do nível (guia de tesouro): troque um permanente daquele nível **ou** o equivalente em po. Dom costuma ser **um pouco mais forte** que o preço e ainda escala de graça — o grupo fica acima da curva. Dar relíquia **por cima** do tesouro cheio deixa todo mundo bem mais poderoso: só se a mesa quiser isso.

CD de salvaguarda do dom = a **maior** entre CD de classe e CD de magia do dono. Ataque de magia do dom = essa CD **−10**. Contrapor = o do dono.

Semente: item comum + dois aspectos + cara do tema; ou item mágico existente com a cara mudada. Tradição (arcana, divina…) no traço da semente e dos dons, se quiser. Extra: +1 de item numa perícia numa relíquia de ~3º.

Muitos dons do **mesmo** aspecto deixam o objeto — e às vezes o herói — com a cara daquilo (sombra demais = cor some).`,
      },
    ],
  },
  {
    id: 'environmental-damage',
    name: 'Dano ambiental e desastres',
    originalName: 'Environmental Damage',
    category: 'rules',
    summary:
      'As quatro faixas de dado (menor a maciço), CD por faixa de treino, lava, avalanche, água e o que o clima já resolve.',
    source: 'GM Core págs. 90–97',
    aonUrl: 'https://2e.aonprd.com/Rules.aspx?ID=2769',
    relatedGuides: ['climate', 'hazards', 'aquatic-combat'],
    relatedLinks: [
      { label: 'Magias', to: '/compendio/magias' },
    ],
    sections: [
      {
        heading: 'Categoria, depois o dado',
        body: `Lava, avalanche, raio na tempestade: o livro fala **menor / moderado / maior / maciço**, não “8d6” em todo bloco. Você escolhe o dado **dentro** da faixa, conforme o quão feio está.

**Menor:** 1d6–2d6.
**Moderado:** 4d6–6d6.
**Maior:** 8d6–12d6.
**Maciço:** 16d6–24d6.

Clima (frio menor por hora, raio elétrico moderado) usa **esta** tabela. Perigo com bloco próprio (armadilha, haunt) usa o dano **dele**, não este.`,
      },
      {
        heading: 'CD do terreno',
        body: `Muita coisa do ambiente pede teste (Atletismo no gelo, Sobrevivência na nevasca). O GM Core dá uma **faixa de treino**, não um número: pântano untrained–trained; penhasco trained–master; lava expert–legendary; tornado e tsunami master–legendary.

Pegue a CD simples daquele treino (guia de CDs) e ajuste se o grupo é 5º num penhasco de mestre. Porta, portão e muralha: veja o objeto (Dureza, PV). Névoa, chuva, temperatura, vento: o guia de **clima** já cobre — aqui não duplica.`,
      },
      {
        heading: 'Lava, avalanche, água',
        body: `**Lava:** no chão comum anda 1,5–18 m por round (dá para correr); canal íngreme até ~90 m. O calor perto já é fogo **menor**; **imerso** = fogo **maciço** por round. Bomba de lava: no mínimo contundente **e** fogo **moderados**. Fluxo piroclástico: como avalanche, metade do dano em fogo, muito mais rápido. Cinza: fogo menor por minuto, como nevoeiro denso, ar irrespirável.

**Avalanche** (e deslizamento): contundente **maior ou maciço**. Reflexos: sucesso = metade; crítico = metade **e** não enterra. Enterrado = **contido** e em geral não se solta sozinho; contundente **menor** por minuto (e frio menor na neve); sem bolha de ar, sufoca. Aliado cava ~1,5 m × 1,5 m a cada **4 minutos** com Atletismo (2 min no crítico); pá **divide o tempo**.

**Água:** precisa respirar (*Respirar na Água* ou equivalente) e em geral **Nadar**. No fundo sem nadar: terreno **difícil maior**. Corrente contra = difícil ou difícil maior; no **fim do turno** a corrente empurra (10 pés de corrente = 3 m). Visão: água limpa ~**73 m** (240 pés) para objeto pequeno; turva **3 m** ou menos. Combate aquático: Player Core pág. 437.`,
      },
      {
        heading: 'O resto do capítulo',
        body: `Multidão, gelo, telhado, escombros, areia, mata: terreno difícil / difícil maior, Equilíbrio, ou penalidade. A tabela de faixas está no GM Core pág. 90; as entradas (pântano raso vs fundo muda com o **tamanho** da criatura) nas págs. seguintes.

Desastre (terremoto, enchente, furacão, incêndio) é encontro ou perigo complexo: use XP de perigo + esta tabela de dano. Não transforme cada viagem em desastre — um por arco basta para a mesa lembrar.`,
      },
    ],
  },
  {
    id: 'variant-rules',
    name: 'Regras variantes da mesa',
    originalName: 'Variant Rules',
    category: 'rules',
    summary:
      'Arquétipos grátis (já no app), progressão automática de bônus, proficiência sem nível e personagens de nível 0 — o que muda na ficha e no tesouro.',
    source: 'GM Core págs. 82–85',
    aonUrl: 'https://2e.aonprd.com/Rules.aspx?ID=2739',
    relatedGuides: ['archetypes', 'automatic-bonus-progression', 'encounters'],
    relatedLinks: [
      { label: 'Configurações (Arquétipos grátis)', to: '/configuracoes' },
      { label: 'Arquétipos', to: '/compendio/arquetipos' },
    ],
    sections: [
      {
        heading: 'Combinar com calma',
        body: `O Player Core é o padrão. Variante entra quando a **história** pede: escola de magia, piratas, horror sem loja de runa, faroeste em que 20 bandidos ainda assustam o campeão.

Avise que é teste. Jogador novo na mesa precisa saber o que está ligado. Dá para somar (nível 0 + proficiência sem nível no survival). Cada bloco abaixo é separado; o overlap perigoso é tesouro + encontro.

Neste app, **Arquétipos grátis** liga em **Configurações → Regras da mesa**. As outras três ainda são regra de mesa no papel.`,
      },
      {
        heading: 'Arquétipos grátis',
        body: `No **2º** e em **todo nível par**, um feito extra que **só** paga feito de arquétipo. Feitos de classe continuam iguais. A mesa pode prender a um arquétipo só (todo mundo pirata), a um tema (só magia), ou soltar tudo (poder mais alto).

Grupo no mesmo arquétipo (ou lista curta): o GM Core sugere **não** exigir os dois feitos da Dedicação antes da próxima — no app isso é **Ignorar bloqueio entre Dedicações**.

Personagem fica um pouco mais versátil. Feitos que **escalam com a quantidade** de feitos de arquétipo (Resiliência de multiclasse) contam no máximo **metade do nível** — a ficha já aplica esse teto nos PV.`,
      },
      {
        heading: 'Progressão automática de bônus',
        body: `Tira o bônus de **item** de rolagem e CD (a armadura **mantém** o bônus de item na CA) e troca por bônus de **potência** que sobe com o nível. Item mágico, se existir, vira efeito especial — não +1 no ataque.

**2º** ataque +1 (todas as armas e desarmado); **10º** +2; **16º** +3.
**3º** uma perícia +1; vai enchendo até **seis** perícias no 20º (duas +3, duas +2, duas +1). 1 semana para retreinar uma escolha.
**4º** Golpes com **2** dados; **12º** três; **19º** quatro.
**5º** CA +1; **11º** +2; **18º** +3.
**7º** Percepção +1; **13º** +2; **19º** +3.
**8º** salvaguardas +1; **14º** +2; **20º** +3.
**17º** ápice de atributo: +1 num modificador **ou** sobe para +4 (o que for melhor).

Some runas de potência, golpe e resiliente. Item que só dava bônus numérico **para**. Ápice **não** sobe atributo (já veio no 17º). Tesouro: pode ignorar boa parte da tabela; mantenha **moeda** e, se o mundo ainda tem magia, consumível no ritmo normal. Tirar **todas** as runas de propriedade (flamejante, santo) corta dano — o encontro pega mais pesado.`,
      },
      {
        heading: 'Sem nível na proficiência, e nível 0',
        body: `**Proficiência sem nível:** treinado +2, perito +4, mestre +6, lendário +8; **não treinado −2** (não +0). Em criatura, perigo e item: tire o **nível** de ataque, CA, salvaguarda, Percepção, perícia e magia. CD simples: 10 / 15 / 20 / 25 / 30. Crítico fica mais raro; magia mata menos na falha crítica.

Encontro: o orçamento de ameaça (80 / 120 XP…) **continua**; o XP da criatura **muda** (nível do grupo = 40 XP; −1 = 32; +1 = 48; +4 = 90; +7 = 160; −7 = 9). Dois monstros **não** equivalem mais a um +2. Tesouro distorce se vocês matam coisa +5 — ajuste, trave a loja, ou use progressão automática.

**Nível 0:** pare depois de ancestralidade e origem. Os **quatro aumentos livres** entram; o da **classe não**. Treinado em Percepção, as três salvaguardas, ataque desarmado, defesa sem armadura e **uma** arma simples; perícias = **2 + INT**. Bônus de treinado ainda é +2 (nível 0). PV = PV da ancestralidade + CON. Começa com **5 po**. Combate: trate o grupo como nível **−1** na hora de montar encontro. Até o 1º, distribua **10 po × número de PCs** (o resto do equipamento inicial).

Aprendiz (opcional): perícias da classe + um gostinho (alquimista: alquimia avançada com 2 itens/dia; monge: punho poderoso; marcial: armadura leve, simples e uma marcial; conjurador: tradição + 2 truques). Campanha longa no 0: comum → aprendiz → 1º, com XP rápido (800).`,
      },
    ],
  },
  {
    id: 'aquatic-combat',
    name: 'Combate aquático e afogamento',
    originalName: 'Aquatic Combat',
    category: 'rules',
    summary:
      'Desprevenido sem Speed de nado, resistência 5 a ácido e fogo, penalidade em corte/contusão, alcance pela metade, fogo debaixo d’água e a conta do ar (5 + CON).',
    source: 'Player Core pág. 437',
    aonUrl: 'https://2e.aonprd.com/Rules.aspx?ID=2438',
    relatedGuides: ['environmental-damage', 'combat', 'movement'],
    relatedLinks: [
      { label: 'Magias', to: '/compendio/magias' },
    ],
    sections: [
      {
        heading: 'Quando a água entra no encontro',
        body: `Lago, rio, plano da Água, porão inundado: use estas regras **e** as de nado do guia de movimento. Sem Speed de nado, Nadar é teste de Atletismo. No fundo sem nadar: terreno **difícil maior**. Corrente e visão: guia de dano ambiental.

*Respirar na Água* (ou item equivalente) resolve o pulmão. O resto do combate **não**.`,
      },
      {
        heading: 'O que muda no golpe',
        body: `**Desprevenido**, salvo se você tem Speed de nado.

**Resistência 5** a ácido e a fogo (a água abafa).

Golpe de **corte** ou **contusão** que atravessa água: **−2** de circunstância no ataque.

Ataque à distância **de** ou **contra** alvo debaixo d’água: incrementos de alcance **pela metade**. (No Remaster isso vale para **todo** ataque à distância — não é mais “perfurante pela metade, o resto erra sozinho”.)

**Não** conjura magia de fogo nem usa ação com o traço fogo. O que **não** é fogo no mesmo efeito **sai**: machado flamejante ainda corta, só não queima.

Ação de chão (Passo, certas manobras): o MJ pode dizer que **não funciona** flutuando.`,
      },
      {
        heading: 'Prender o fôlego',
        body: `Rounds de ar = **5 + modificador de Constituição**.

No **fim do seu turno**, perde **1**. Perde **2** se atacou ou conjurou neste turno. Cada crítico que te acerta, ou falha crítica sua numa salvaguarda de efeito que causa dano, tira **mais 1**.

**Falar** (incluindo **Conjurar magia**) zera o que restava.

Acabou o ar: **inconsciente** e começa a sufocar. **Não** acorda enquanto sufoca. No fim de cada turno: Fortitude **CD 20**. Falha = 1d10 de dano; falha crítica = **morre**. Cada teste **depois do primeiro** sobe a CD em **5** e o dano em **1d10** (acumula). Voltou o ar: para de sufocar e **acorda** — salvo já estar em 0 PV.`,
      },
      {
        heading: 'Na mesa',
        body: `Aviso **antes** de mergulhar: “sem nado você fica desprevenido; magia de fogo some; falar gasta o ar”. PC com CON alta ainda queima o pulmão se Golpear todo round.

Inimigo aquático no próprio meio: o −2 e o alcance curto pesam mais em vocês do que nele. Dê um jeito de respirar (poção, magia, bolha) se o encontro for longo — senão vira corrida de Fortitude, não luta.

Plano com o traço água: estas regras **em geral** valem o tempo todo. Criatura com fraqueza a água toma o **dobro** da fraqueza no fim de cada round.`,
      },
    ],
  },
  {
    id: 'mounted-combat',
    name: 'Combate montado',
    originalName: 'Mounted Combat',
    category: 'rules',
    summary:
      'Montar (1 ação), Comandar a montaria, MAP compartilhado, cobertura menor, −2 em Reflexos, feito Cavalgar e o que o MJ faz quando o cavalo cai.',
    source: 'Player Core pág. 437 e GM Core pág. 29',
    aonUrl: 'https://2e.aonprd.com/Rules.aspx?ID=2434',
    relatedGuides: ['companions', 'actions', 'chases'],
    relatedLinks: [
      { label: 'Companheiros', to: '/compendio/companheiros' },
    ],
    sections: [
      {
        heading: 'Como sobe',
        body: `**Montar** (1 ação, movimento): adjacente a criatura **disposta** e **pelo menos um tamanho maior**. Já montado: a mesma ação **desce** para um espaço adjacente.

A montaria age na **sua** iniciativa. Para ela gastar ações, você **Comanda um Animal**. Sem comando, o animal **desperdiça** o turno (fica parado). Feito geral **Cavalgar** (Ride): sucesso **automático** ao Comandar **a sua** montaria.

Exemplo: três Golpes seus = cavalo parado. 1 ação Comandar (sucesso) → o cavalo Caminha; a segunda ação é **seu** Golpe **ou** outro comando para o cavalo Golpear — **não os dois** na mesma ação.

Animal comum: Natureza vs CD de Vontade dele; o bicho obedece no **turno dele**. **Companheiro animal:** Comandar no **seu** turno dá **2 ações**, sem teste — detalhe no guia de companheiros. Tipo com habilidade **mount** ignora as travas de “só Speed terrestre” e “não move e Apoia no mesmo turno”.`,
      },
      {
        heading: 'Ataque e defesa juntos',
        body: `Vocês lutam como **uma unidade**: **MAP compartilhado**. Você Golpeia e depois Comanda o cavalo a Golpear = o golpe dele já vem com **−5**.

Para **atacar**, você ocupa **todos** os quadrados da montaria. Médio em Grande: alcança um lado e, na próxima ação, o outro. Montaria Média ou menor: alcance **normal**. Grande ou Enorme: alcance 1,5 m ou 3 m acerta qualquer adjacente à montaria; alcance 4,5 m acerta até 3 m dela (incluindo diagonal). Use esse alcance para **flanco**.

Inimigo escolhe: você **ou** a montaria. Área pega os **dois** se os dois estão nela. Você está no alcance se **qualquer** quadrado da montaria está. Cobertura **menor** contra ataque em **você**, se a montaria estiver no caminho (o MJ decide).

**−2** de circunstância em Reflexos (o corpo não se joga solto). A **única** ação de movimento que você usa montado é **Montar** para descer — quem anda é o bicho.`,
      },
      {
        heading: 'O que o MJ faz',
        body: `Espaço: criaturas Grandes precisam de mapa largo. Só um lado montado: coloque um beco ou sala em que o cavalo **não entra**, para o pé ter trunfo.

Inimigo deve bater no **PC**, não no cavalo toda hora — senão o jogador só assiste o destrie morrer. Montaria inimiga: nível **perto** do grupo (pesadelo maior de 11º, não cavalo de guerra de 2º embaixo de um NPC de 13º).

Montaria nocauteada **parada**: descer costuma ser limpo. **Em movimento:** Reflexos (CD simples de perito **20** funciona). Falha = jogado para o lado e **caído**.

Perseguição a galope no grid trava. Tire a grade e use o guia de **perseguições**.`,
      },
      {
        heading: 'Montaria sapiente e ombro',
        body: `Pégaso, unicórnio: as mesmas regras, mas em vez do teste de Natureza o cavaleiro gasta as **mesmas ações** para **pedir**. O MJ decide se obedece e se pede Diplomacia.

PC **Minúsculo** no ombro de outro PC: os dois rolam iniciativa e agem juntos no **menor** resultado; cada um começa o turno com **2** ações (o maior segura, o menor se agarra).

Companheiro como montaria: guia de companheiros. Eidólon e outras criaturas sapientes de classe têm texto próprio — leia o bloco, não invente a partir disto.`,
      },
    ],
  },
  {
    id: 'planes',
    name: 'Planos e traços planares',
    originalName: 'The Planes',
    category: 'rules',
    summary:
      'Os cinco eixos (escopo, gravidade, tempo, mórfico, essência), o que muda no Bulk e na queda, tempo errático/sem tempo, e fogo, vazio e vitalidade no fim do round.',
    source: 'GM Core págs. 172–173',
    aonUrl: 'https://2e.aonprd.com/Rules.aspx?ID=3014',
    relatedGuides: ['environmental-damage', 'aquatic-combat', 'movement'],
    relatedLinks: [
      { label: 'Magias', to: '/compendio/magias' },
    ],
    sections: [
      {
        heading: 'O Grande Além',
        body: `Além de Golarion e do vazio do espaço: os planos. Cada um é um mundo com lei própria. Traço que for **igual ao Universo** o bloco **omite** — se não está escrito, trate como normal.

Cinco eixos: **escopo**, **gravidade**, **tempo**, **mórfico**, **essência**.`,
      },
      {
        heading: 'Escopo, gravidade e tempo',
        body: `**Escopo:** a maioria é imensurável (por isso o traço some). **Finito** = tem borda. **Ilimitado** (unbounded) = a borda **dobra** de volta.

**Gravidade alta:** Bulk **dobra** (carrega metade); Speed e salto **metade**; ataque físico à distância só até o **3º** incremento (não o 6º); queda = dano contundente **igual à distância** em pés (não a metade).
**Baixa:** Bulk **metade**; carrega e salta o dobro; alcance físico até o **12º** incremento; os primeiros **3 m** de queda não doem, o resto causa **1/4** da distância.
**Micro:** quase zero; flutua até empurrar uma superfície.
**Estranha:** qualquer massa vira “chão” se for do seu tamanho ou maior.
**Subjetiva:** criatura com mente escolhe o “baixo” (ação livre, concentração). No ar, cair na direção escolhida até o Speed (ou de voo) usa a ação **Voar**. Objeto e criatura sem mente = micro.

**Tempo errático:** ao **sair** para tempo normal, teste simples CD 11 (o grupo que sai junto compartilha). Sucesso = 1 hora lá = 1 hora cá. Falha = 1 hora lá = **1 dia** cá. Falha crítica = **1 round** lá = 1 dia cá.
**Fluindo:** sempre mais rápido ou mais lento (ano lá = hora cá, ou o inverso) — o bloco diz qual.
**Sem tempo:** não sente fome, sede, idade nem cura natural. Veneno, doença e cura mágica às vezes também diminuem. Duração de magia **segue**. O perigo: ao **sair**, fome, sede e idade **cobram de uma vez** — dá para morrer de velhice na porta.`,
      },
      {
        heading: 'Mórfico e essência',
        body: `**Normal:** só muda com força ou magia. **Metamórfico:** muda sozinho, por deus, ou por magia. **Senciente:** o plano tem vontade. **Estático:** visitante **não** afeta morador nem o que ele carrega; magia que tentaria isso **não pega**, salvo alguém suprimir o traço.

**Ar:** céu, ilha rara; terra fica sem chão. **Terra:** quase sólido — sem escavar, você **enterra** e sufoca até achar bolha. **Fogo:** tecido desprotegido pega fogo (~1d6 persistente); visitante toma dano ambiental de fogo **moderado** no fim do round (menor em área “fria”, maior/maciço no inferno). **Metal:** estrutura que muda; bolsões de ar; madeira sofre. **Água:** líquido; sem respirar, afoga; combate aquático vale; fraqueza a água cobra o **dobro** no fim do round. **Madeira:** floresta viva, em geral não hostil. **Sombra** (Netherworld): raio de luz e área de magia de luz **pela metade**. **Vazio:** no fim do round, vivo toma pelo menos dano de vazio **menor** (moderado/maior no pior trecho), traço **morte**; 0 PV por isso = cinza, e pode virar espectro. **Vitalidade:** morto-vivo toma dano de vitalidade no fim do round; vivo **cura** o mesmo valor, excesso vira PV temporário que **soma** (diferente do normal) até sair. Se o temporário **passar do máximo de PV**, explode em alma nova.`,
      },
      {
        heading: 'Na mesa',
        body: `Diga os traços **na hora** que atravessam o portal — sobretudo tempo e gravidade. Dano ambiental usa o guia correspondente. *Teleporte Interplanar* e *Portal* são o “como”; isto é o “o que acontece lá”.

Não precisa decorar o mapa do Inner Sphere. Pegue o bloco do plano no GM Core (págs. seguintes) e rode os traços. Demiplano caseiro: escolha **um** eixo estranho, não cinco.`,
      },
    ],
  },
  {
    id: 'settlements',
    name: 'Assentamentos: vila, cidade e mercado',
    originalName: 'Settlements',
    category: 'rules',
    summary:
      'Nível da cidade = loja e Ganhar renda, vila 0–1 até metrópole 8+, serviços de magia, governo vs facção, e o que entra no bloco.',
    source: 'GM Core págs. 168–171',
    aonUrl: 'https://2e.aonprd.com/Rules.aspx?ID=2999',
    relatedGuides: ['downtime', 'nations', 'leadership'],
    relatedLinks: [
      { label: 'Equipamento', to: '/compendio/equipamento' },
      { label: 'Origens', to: '/compendio/origens' },
    ],
    sections: [
      {
        heading: 'Para que serve',
        body: `Descanso, retreino, Ganhar renda, comprar e vender — e, se a mesa quiser, a própria aventura. Combate urbano usa o ambiente do GM Core pág. 92; o dia a dia é **exploração** e **intervalo**.

Cidade densa pede os outros guias: Influência e Reputação no palácio, perseguição no mercado, infiltração no arquivo, pesquisa na biblioteca. Liderança (GM Core pág. 204) se alguém quiser montar guilda.`,
      },
      {
        heading: 'O nível da cidade',
        body: `Nível ≈ tamanho **e** economia, e em geral o NPC mais forte que se acha na rua (chefes nomeados podem passar).

Em geral: **vila** 0–1, **cidade pequena** (town) 2–4, **cidade** 5–7, **metrópole** 8+. Muito rico ou muitos NPCs altos empurram o número para cima.

**Loja:** item **comum** de nível **≤** o da cidade. Os mais altos do teto são poucos — use a tabela de tesouro como se o nível da cidade fosse **−1**. Vender para o povo: a mesma régua. População **muito** menor que o nível sugere: a loja encolhe.

PC **acima** do nível da cidade: convence artesão a encomendar item mais alto — demora. **Magia de serviço:** comum até o posto que um NPC daquele nível conjuraria (cidade 9º ≈ magia comum de **5º** posto), salvo um NPC nomeado negociar mais.

Incomum: se a cidade **cumpre o Acesso** (Kraggodan e arma anã), trata como comum ali.`,
      },
      {
        heading: 'Quem manda',
        body: `Governo visível (prefeito, conselho, rainha) **não** é sempre quem decide. Seita, guilda de ladrão, vizir, sósia. Lei pode ser um cartaz ou um labirinto de papel. Guarda: voluntário na vila, profissional na capital. Igreja, Sociedade Pathfinder, nobre e o mago local puxam a corda contra o paço.

Corrupção: suborno na fila ou juiz mentiroso. Isso alimenta Reputação e encontros sociais, não só “pague 5 po”.`,
      },
      {
        heading: 'O bloco e o que muda',
        body: `Nome, **nível**, traços (vila/town/cidade/metrópole + anão, acadêmico…), uma frase de papel na história. Depois: governo, população (com ancestralidades), idiomas, religiões (oficial e **proibidas**), ameaças, uma habilidade local, NPCs que importam.

Habilidades típicas: paraíso de artista (Performance e arte pagam melhor); cidade de artesão (uma categoria de item até **+4** níveis); academia mágica (+2 para Aprender magia; incomum a critério); viés religioso (+1 / −1 em Diplomacia conforme o deus); erudita (1d4 horas num periódico antes de Recordar Conhecimento).

Depois da aventura: tire a ameaça que mataram, coloque a que vocês atraíram, atualize população e líder. Otari e Port Peril no GM Core são molde — não copie o bloco inteiro, copie a **estrutura**.`,
      },
    ],
  },
  {
    id: 'cursed-artifacts',
    name: 'Itens amaldiçoados e artefatos',
    originalName: 'Cursed Items and Artifacts',
    category: 'rules',
    summary:
      'Traço amaldiçoado sempre raro, só o crítico em Identificar magia revela, fusão e *Purificar Aflição*; artefato não se Fabrica nem se quebra no normal, e só some do jeito do bloco.',
    source: 'GM Core págs. 300 e 306–307',
    aonUrl: 'https://2e.aonprd.com/Rules.aspx?ID=3230',
    relatedGuides: ['magic-items', 'rarity', 'afflictions'],
    relatedLinks: [
      { label: 'Equipamento', to: '/compendio/equipamento' },
      { label: 'Magias', to: '/compendio/magias' },
    ],
    sections: [
      {
        heading: 'Amaldiçoado: quase nunca de propósito',
        body: `Acidente, Ofício ruim, força sinistra no meio da criação. Quem tenta amaldiçoar de propósito em geral **não consegue**. Traço **amaldiçoado** = sempre **raro**. O MJ fecha como a maldição se comporta na mesa — o bloco é o começo.

A magia que distorce a função **esconde** a maldição. **Identificar magia:** só o **crítico** mostra que tem maldição **e** qual é. Qualquer outro resultado = “item útil”.`,
      },
      {
        heading: 'Fusão e como tira',
        body: `Muitos **não se largam**: grudam no corpo ou **voltam** se você jogar fora. O livro chama os dois de **fusão**. Em geral só aparece depois da **primeira** ativação ou do **primeiro** investir — a falsa segurança é o ponto.

Para soltar: *Purificar Aflição* (ou magia equivalente) **no dono**. Sucesso = dá para descartar. Nada impede a **mesma** criatura de se amaldiçoar de novo se vestir outra vez — jogue o item no vulcão **na hora**.

Enquanto não sai, item investido **amaldiçoado** continua contando nos **10**, mesmo sem reinvestir no dia.

**Maldição de item** (como runa de propriedade): cola no tipo listado em Uso. Em geral **não** transfere. Quebrou a maldição: o item limpo pode valer uma fortuna.`,
      },
      {
        heading: 'Artefato: história, não tesouro de 20º',
        body: `Traço **artefato**: **não** se Fabrica, **não** se ajusta runa no normal, **não** toma dano do jeito comum. Sempre **raro** ou **único**. Os do GM Core são 20º+; o nível da sua mesa é o que a história pedir.

**Não** aparece no baú padrão, nem no 20º. A campanha **dobra** em volta dele. Encontro “fácil demais” porque o artefato quebrou a regra **é** o gostinho — desde que o MJ tenha colocado isso de propósito.

Bloco traz **Destruição**: o jeito extraordinário (missão inteira, às vezes a campanha). Troque se a sua história exigir outro ritual.`,
      },
      {
        heading: 'Criar um artefato',
        body: `Comece pelo papel: arma contra a treva, baralho que injeta caos, coisa que **precisa** ser destruída. Depois os poderes que deixam esses momentos acontecerem. Pode ter **mais** habilidades que item normal, todas no tema.

CD, ataque e posto ofensivo: se forem os de um item de 20º nas mãos de um 5º, todo inimigo falha crítica. Baixe o número, use a **CD de magia do portador**, ou deixe o poder **estreito** (Serithtial brilha contra cultista de Zon-Kuthon, não contra todo mundo).

Pode ser também item inteligente ou relíquia — aí soma este guia com os outros dois. O tesouro do nível **não** substitui o artefato: ele é plot.`,
      },
    ],
  },
  {
    id: 'rituals',
    name: 'Rituais: conjurar sem espaço',
    originalName: 'Rituals',
    category: 'spells',
    summary:
      'Conjurador principal mesmo sem magia de classe, posto máximo = metade do nível (para cima), teste de perícia CD muito difícil, secundários (+2 / −4) e custo gasto no teste.',
    source: 'Player Core págs. 389–390',
    aonUrl: 'https://2e.aonprd.com/Rules.aspx?ID=2255',
    relatedGuides: ['spells', 'downtime', 'setting-dcs'],
    relatedLinks: [
      { label: 'Rituais', to: '/compendio/rituais' },
      { label: 'Magias', to: '/compendio/magias' },
    ],
    sections: [
      {
        heading: 'Não é magia de espaço',
        body: `Qualquer um pode ser o **conjurador principal** — lutador incluso — se **conhecer** o ritual e tiver o **grau de perícia** que o teste principal pede. Posto do ritual (e o quanto dá para aumentar) ≤ **metade do seu nível, arredondada para cima**. Não gasta espaço. Não entra no repertório.

A perícia principal **define a tradição** (Ofício/Arcana = arcana, Religião = divina…). CD de salvaguarda do efeito = sua CD de magia dessa tradição; sem CD de magia: **12 + nível + o maior modificador mental**.

Mínimo **1 hora**. Muitos listam **dias**: cada dia = **8 horas** de todos os conjuradores, com pausa para dormir. Um fica cantando/meditando leve enquanto os outros descansam. Palavras e gestos o tempo todo.

Intervalo é o modo natural. Exploração dá, se ninguém interromper — arriscado.`,
      },
      {
        heading: 'Aprender e o custo',
        body: `Aprender ritual **não** conta no teto de magias conhecidas. Ritual **nunca é comum**. Incomum: dá para achar quem **execute** para vocês; ensinar é outra conversa.

**Custo** (se o bloco tiver): componentes caros, gastos **na hora do teste principal**. Muitas vezes base × nível do alvo (nível < 1 conta como **1**). Versão aumentada que sobe a base multiplica de novo.

Criar criatura permanente (*Criar Morto-vivo* e similares): tabela do Player Core pág. 390. Âncoras: criatura −1/0 = posto 2, **15 po**; 5º = posto 4, **480 po**; 10º = posto 7, **3.000 po**; 17º = posto 10, **45.000 po**.`,
      },
      {
        heading: 'Principal, secundários, o teste',
        body: `**Secundários** não precisam de magia, nível mínimo nem grau de perícia. O bloco diz quantos no mínimo.

No fim: o principal testa a perícia listada. CD típica: **muito difícil** para um nível = **o dobro do posto** (ritual de 3º ≈ CD de 6º muito difícil). Como outras atividades de intervalo: **fortuna/infortúnio não entram**, nem bônus que não durou o processo inteiro.

O MJ pode baixar CD, trocar teste ou abrir mão de requisito (linha ley + lua nova).

Cada teste **secundário** (CD **padrão** do mesmo nível-dobrado) é de **uma** pessoa diferente. Sobra de gente = quem sobra **não** rola. Secundários rolam **antes**; o ritual **sempre** chega no principal.

**Crítico** no secundário: +2 de circunstância no principal.
**Sucesso:** nada.
**Falha:** −4.
**Falha crítica:** −4 **e** o grau do principal cai **um degrau**.`,
      },
      {
        heading: 'Na mesa',
        body: `O efeito sai do **grau do teste principal** — leia o bloco (*Ressuscitar* no crítico não é o mesmo que na falha). Compêndio → Rituais tem os oficiais Remaster.

Não transforme todo intervalo em ritual. Um por arco, com custo visível e secundários da mesa jogando, já vira sessão.`,
      },
    ],
  },
  {
    id: 'languages',
    name: 'Idiomas: comum, incomum e secreto',
    originalName: 'Languages',
    category: 'creation',
    summary:
      'Comum da campanha (Taldane no Mar Interior), idiomas da ancestralidade + INT, regionais com acesso, Poliglota, e sinais / ler lábios.',
    source: 'Player Core págs. 89 e 34',
    aonUrl: 'https://2e.aonprd.com/Rules.aspx?ID=2095',
    relatedGuides: ['character-creation', 'skills', 'characters-with-disabilities'],
    relatedLinks: [
      { label: 'Ancestralidades', to: '/compendio/ancestralidades' },
      { label: 'Origens', to: '/compendio/origens' },
    ],
    sections: [
      {
        heading: 'O que você já fala no 1º',
        body: `A ancestralidade lista os idiomas iniciais — em geral **fala e lê**. Modificador de Inteligência **positivo** = **+INT** idiomas extras, tirados da lista da raça **e** dos da região/etnia. Fora disso, combine com o MJ.

**Comum** é o idioma mais falado **onde a campanha se passa**. No Mar Interior, Comum = **Taldane**. Viajou para um continente com outro Comum: a barreira vale.

Em geral “se vira” só com Comum. O segundo idioma entra em negociação, escuta e comércio local.`,
      },
      {
        heading: 'Comum, incomum, regional, secreto',
        body: `**Comuns** (Mar Interior): Comum, Dracônico, Anão, Élfico, Fey, Gnômico, Goblin, Halfling, Jotun, Orc, **Sakvroth** (subsolo / serpentfolk — o antigo “subcomum”).

**Incomuns:** nativos e estudiosos. Inclui idiomas de plano e elemento — Aklo, Ctoniano (demônio), Diabólico, Empíreo (celestial), Necril, Petran / Pírico / Sussuran / Talássico / Muan / Talicano (os seis elementos), Shadowtongue, Kholo.

**Regionais** (Hallit, Kelish, Mwangi, Osiriani, Shoanti, Skald, Tien, Varisiano, Vudrani…): incomuns, mas quem **é da região** tem acesso na criação. Lista e mapa: Player Core pág. 34.

**Raro e secreto** só aparecem em jogo. Druida ainda tem o idioma da classe — não está na prateleira do 1º.

Feito **Poliglota** (Multilingual): +2 idiomas (comuns, incomuns ou com acesso); de novo se ficar mestre e lendário em Sociedade; pode pegar várias vezes. Inteligência que **sobe depois** ajusta a quantidade.`,
      },
      {
        heading: 'Sinais e lábios',
        body: `O bloco lista o que você **fala**. Sinal correspondente e ler lábios vêm dos feitos de perícia **Língua de Sinais** e **Ler Lábios**. Personagem surdo, com deficiência auditiva ou que não fala: o MJ pode **dar um desses feitos de graça** (mesmo sem pré-requisito) se o conceito pedir.`,
      },
      {
        heading: 'Na mesa',
        body: `Não trave a sessão em “ninguém fala goblin”. Trave quando **importar**: documento, culto, plano. Magia de entender idiomas existe; não substitui o feito se a mesa quer o sabor.

Nomes Remaster (Ctoniano, Empíreo, Sakvroth) são os do Player Core — não use Abissal / Infernal / Celestial / Subcomum da edição antiga.`,
      },
    ],
  },
  {
    id: 'leadership',
    name: 'Liderança: guilda, exército e seguidores',
    originalName: 'Leadership',
    category: 'rules',
    summary:
      'A organização sobe de nível recrutando, não com pontos; base até o 6º; seguidores não vão à aventura; eventos de oportunidade, problema e vento a favor.',
    source: 'GM Core págs. 204–205',
    aonUrl: 'https://2e.aonprd.com/Rules.aspx?ID=3096',
    relatedGuides: ['reputation', 'nations', 'downtime'],
    relatedLinks: [
      { label: 'Origens', to: '/compendio/origens' },
    ],
    sections: [
      {
        heading: 'Não é ponto de Vitória',
        body: `Vocês fundam uma organização (guilda, circo, exército, igreja) e **juntam gente**. Nível 1–20. Abaixo de 1 = só o grupo, zero seguidor.

O nível sobe quando a organização **cresceu de verdade** — não com um bolo de pontos. Recompensa de missão, cena social, Influência ou Reputação: entra um NPC. No começo, uns de **nível 0**; depois, mais altos e **tenentes** para chefiar turmas.

Ritmo típico: a organização sobe **junto** com os PCs. Dá para inverter (10º com organização 20º, ou só começar a recrutar no 15º).`,
      },
      {
        heading: 'Base, seguidor, tenente',
        body: `Quase toda organização precisa de **sede** (forte, caravana, navio, circo). No **6º** da organização, tem de ter — salvo a história exigir o contrário.

Seguidor e tenente são NPC **não combatentes**. A maioria no **piso** da faixa; regra de bolso: o dobro de gente em cada nível abaixo do próximo. Quando o piso dos tenentes sobe: os antigos sobem **ou** viram subordinados de tenentes novos.

Eles **mantêm** a sede e a vida da organização: vocês **não** pagam manutenção básica nem a expansão para caber mais gente. Em troca, **não** vão à masmorra, **não** são magia de graça, **não** são mão de obra livre na aventura.

Âncoras da tabela: **1º** = 1–2 seguidores nv. 0. **6º** = 14–18, teto de seguidor 1, **2** tenentes nv. 2. **10º** = 54–75, teto 2, 6–7 tenentes nv. 3–4. **20º** = 1.701–2.400, teto 4, 171–240 tenentes nv. 5–9. Tabela completa: GM Core pág. 204.`,
      },
      {
        heading: 'Eventos',
        body: `No intervalo — ou no fundo, enquanto vocês viajam — misture três tipos:

**Oportunidade** — decisão que muda a cara da casa (Aspis quer depositar carga no forte: dinheiro × escrúpulo).
**Problema** — a guarda nova está esmagando a guilda. O custo para resolver deve ser **menor** que o que os ventos a favor dão, senão a organização só dá trabalho.
**Vento a favor** — opção **incomum** (magia, feito), po, pista, prestígio. Deixe a mesa sugerir no que os seguidores estão trabalhando.

Cohorte que **viaja** com o grupo (oficial que vira PC novo) **não** conta nessa tabela: trata como personagem extra, com história amarrada.`,
      },
      {
        heading: 'Na mesa',
        body: `Isto não substitui Reputação com a cidade nem Influência no palácio — soma. A organização é o **seu** lado da balança.

Não encha o encontro com 80 seguidores. O número existe para a ficção (“o forte tem gente”) e para o evento de intervalo, não para MAP de mass battle.`,
      },
    ],
  },
  {
    id: 'buying-selling',
    name: 'Comprar e vender',
    originalName: 'Buying and Selling Items',
    category: 'rules',
    summary:
      '1 dia de intervalo, preço cheio / metade, gema e matéria pelo valor cheio, três estilos de mercado e o que a cidade de fato tem na prateleira.',
    source: 'GM Core págs. 48 e 61; Player Core pág. 440',
    aonUrl: 'https://2e.aonprd.com/Rules.aspx?ID=2617',
    relatedGuides: ['settlements', 'treasure', 'downtime'],
    relatedLinks: [
      { label: 'Equipamento', to: '/compendio/equipamento' },
    ],
    sections: [
      {
        heading: 'A regra curta',
        body: `Comprar e vender **de verdade** é intervalo. **1 dia** para uns itens; mais se o lote é grande, o item é caro ou ninguém quer.

Compra = **preço cheio**. Venda = **metade**. Objeto de arte, gema e **matéria-prima** saem pelo valor **cheio**. Oferta e procura mexem nisso **às vezes**, não toda loja.

O nível da **cidade** trava o que está na prateleira (guia de assentamentos). Vila pequena: equipamento comum e item mágico/alquímico de **1º**. Acima disso, o MJ decide.`,
      },
      {
        heading: 'Três jeitos de rodar o mercado',
        body: `**1. O que quiser, onde quiser.** Metade na hora, compra qualquer item com acesso pelo preço cheio. Rápido. O grupo fica mais padronizado (todo mundo pega o item “certo”). Incomum/raro ainda trava — ou a mesa cobra um ágio (10–100% incomum; 25–500% se abrir raro).

**2. O que quiser, com trabalho.** Precisa de mercado que aguente. Um item pela metade; o que já saturou cai a **25% ou 10%**, ou **ninguém compra**. Item alto ou incomum: NPC especial, tempo extra, e às vezes **não acha**. O mundo pesa; saquear armadura comum para vender cansa.

**3. Quase sem loja mágica.** Tesouro da aventura + Fabricar (se houver fórmula). Loja magra, preço cheio, compra seletiva. O grupo **usa** o item estranho que achou. Risco: ficha fraca se o tesouro não trouxer runa fundamental — nesse estilo, **solte** potência/golpe/resiliente com frequência.`,
      },
      {
        heading: 'O que o GM Core ainda pede',
        body: `Jogador **não** tem direito de vender tudo, sempre. Cinco espadas iguais, item sem demanda, vila pobre: recuse, baixe a porcentagem, ou mande viajar.

Se não quiser essa granulação: venda abstrata pela metade **a qualquer hora**. O grupo se equipe do jeito que quiser — e fica **mais forte**. Combine na sessão zero.`,
      },
      {
        heading: 'Na mesa',
        body: `A cidade de nível 4 não tem armadura +2 na vitrine. PC **acima** do nível da cidade encomenda (demora). Fórmula incomum/rara é tesouro, não catálogo.

Isto não substitui Fabricar (guia de intervalo) nem o orçamento de tesouro. É o **que acontece entre** o baú e a ficha.`,
      },
    ],
  },
  {
    id: 'aerial-combat',
    name: 'Combate aéreo e voo',
    originalName: 'Aerial Combat',
    category: 'rules',
    summary:
      'Ação Voar (subir difícil, descer 3 m por 1,5 m gastos), pairar, cair se não Voou no round, Manobrar em voo e o que o MJ faz com teto e inimigo à distância.',
    source: 'Player Core págs. 233 e 419; GM Core pág. 30',
    aonUrl: 'https://2e.aonprd.com/Rules.aspx?ID=2563',
    relatedGuides: ['movement', 'climate', 'mounted-combat'],
    relatedLinks: [
      { label: 'Magias', to: '/compendio/magias' },
    ],
    sections: [
      {
        heading: 'A ação Voar',
        body: `1 ação, movimento. Precisa de **Speed de voo**. Anda até esse valor.

**Subir** (reto ou diagonal) = terreno **difícil**. **Descer** em linha: cada **1,5 m** gastos valem **3 m** para baixo. Chegou no chão Voando = **sem** dano de queda.

Pairar: Voar **0 m**. Se no **fim do turno** você está no ar e **não** usou Voar neste round, **cai**.

**Interromper a queda** (se tiver fly Speed) e o dano de queda: guia de movimento.`,
      },
      {
        heading: 'Manobrar em voo',
        body: `1 ação, movimento, Acrobacia. Precisa de fly Speed. O MJ diz o que cabe; quase nunca anda **mais** que o Speed de voo.

**Sucesso:** a manobra sai.
**Falha:** não anda, ou o MJ aplica um efeito do tipo (vento te joga para o lado).
**Falha crítica:** o mesmo, pior.

Amostras (CD simples daquele treino):
**Treinado** — subida ou descida íngreme.
**Perito** — voar contra o vento.
**Mestre** — inverter a direção.
**Lendário** — vendaval.

Vento no clima: terreno difícil/difícil maior; falha crítica (ou zero sucessos no round) = o vento **leva**.`,
      },
      {
        heading: 'O mapa no ar',
        body: `Afrouxe grade, flanco e “exato 1,5 m” mais do que no chão. Combate aéreo **espalha**. Antes de alguém Voar, diga a **altura** do teto, das árvores, do penhasco — senão o teto “aparece” no meio do turno.

Não jogue combate aéreo **antes** do grupo ter magia ou item de voo. Inimigo voador **à distância** sem ferramenta no chão é frustração, não encontro.`,
      },
      {
        heading: 'Queda e o risco',
        body: `*Dissipar Magia* em *Voar* = queda, e queda mata. Inimigo inteligente voa **baixo** ou traz *Aterrissagem Suave* (Gentle Landing) / talismã de gato de jade.

Montaria voadora: soma este guia com o de combate montado. Plano do Ar: guia de planos.`,
      },
    ],
  },
  {
    id: 'hexploration',
    name: 'Hexploração: mapa hexagonal',
    originalName: 'Hexploration',
    category: 'rules',
    summary:
      'Hex de ~19 km, atividades por dia conforme o Speed mais lento, Viajar vs Reconhecer, marcha forçada, encontro aleatório e o mapa em branco dos jogadores.',
    source: 'GM Core págs. 206–209',
    aonUrl: 'https://2e.aonprd.com/Rules.aspx?ID=3103',
    relatedGuides: ['exploration', 'environmental-damage', 'encounters'],
    relatedLinks: [
      { label: 'Companheiros', to: '/compendio/companheiros' },
    ],
    sections: [
      {
        heading: 'Quando usar',
        body: `Viagem longa no Player Core já funciona. Hexploração entra quando a mesa quer **descobrir o mapa**: sandbox, recurso, sítio escondido, perigo no caminho.

O mapa do MJ é hexágono. Cada hex = ~**19 km** de ponta a ponta (12 milhas) — um dia de marcha mesmo para grupo lento. Um terreno **predominante** por hex (planície, floresta, pântano…); rio, estrada, castelo ou caverna por cima. Os jogadores recebem o mapa **em branco** e vão pintando.

Encontro **fixo** (sítio da história) + lista **aleatória** por terreno (inofensivo / perigo / criatura). Deixe gancho para vários lados: vocês não controlam a ordem. Alguns encontros podem ser **para fugir** — aí use perseguição.`,
      },
      {
        heading: 'Atividades por dia',
        body: `O ritmo é **dia**, não hora. Quantas atividades o grupo faz = Speed do **mais lento**:

**≤ 3 m:** meia atividade (2 dias para uma).
**4,5–7,5 m:** 1.
**9–12 m:** 2.
**13,5–16,5 m:** 3.
**≥ 18 m:** 4.

Dividir o grupo deixa o rápido fazer mais — e morrer sozinho no encontro aleatório.

**Marcha forçada** (ninguém fatigado): +1 **Viajar** no dia, e **só** isso. Dias seguros = modificador de Constituição (mínimo 1). Extra = fatigado até **1 dia** inteiro de intervalo descansando.

No começo do dia: teste simples conforme o terreno (planície CD 12, floresta/pântano 14, montanha 16, água/ártico/deserto 17). Estrada ou rio **−2**; voando **+3** (e o encontro tem de fazer sentido no ar). Sucesso = 1 encontro; crítico = 2. Tipo (1d10): 1–5 inofensivo, 6–7 perigo, 8–10 criatura.`,
      },
      {
        heading: 'Grupo e individual',
        body: `**Viajar** e **Reconhecer** são de **grupo**: gastam a atividade de **todo mundo**.

**Viajar** — hex aberto (planície) = 1 atividade; difícil (floresta, deserto típico) = 2; difícil maior (montanha íngreme, pântano) = 3. Estrada = um degrau **melhor**. Voo ou água: a maioria é aberto; tempestade / contra a corrente = difícil ou maior.

**Reconhecer** — o mesmo número de atividades que Viajar naquele terreno (estrada **não** barateia). Acha o que é óbvio; o escondido pede teste (Percepção no mosteiro tengu no meio da mata). Depois dá para **Mapear**.

No lugar de Viajar/Reconhecer, cada um pode fazer atividade **individual**:
**Fortificar o acampamento** — Ofício (CD treinado ou perito); sucesso = +2 de circunstância em iniciativa e Buscar contra quem se esgueira até o campo.
**Mapear a área** — Sobrevivência, só se já Reconheceram; mapa certo = **−2** na CD para não se perder naquele hex.
**Subsistir** e as atividades de exploração do Player Core (salvo **Apressar**) também entram, a critério.`,
      },
      {
        heading: 'Na mesa',
        body: `Encontro curto **não** come atividade. Virou horas (dungeon de tarde): corte o que restava do dia. Achar o sítio ao entardecer = “entramos agora ou acampamos?”.

Terreno vivo: guia de clima e dano ambiental. Plano aleatório de hex (1d20): 1–3 planície … 14–20 = **repete o anterior** — senão o deserto vira gelo no meio sem magia.

Isto não substitui exploração hora a hora dentro do hex. É o **entre** um sítio e o outro.`,
      },
    ],
  },
  {
    id: 'duels',
    name: 'Duelos: lâmina e magia',
    originalName: 'Duels',
    category: 'rules',
    summary:
      'Regras combinadas, juiz, iniciativa a cada round (Enganação / Intimidação / Percepção), as três reações de combate e Contrapor no duelo de magia.',
    source: 'GM Core págs. 202–203',
    aonUrl: 'https://2e.aonprd.com/Rules.aspx?ID=3084',
    relatedGuides: ['combat', 'social', 'counteract'],
    relatedLinks: [
      { label: 'Magias', to: '/compendio/magias' },
    ],
    sections: [
      {
        heading: 'Combinar antes',
        body: `Um contra um. Os dois **aceitam** as regras; quem é pego trapaceando **perde** (com a pena combinada). Juiz na mesa — guarda, clérigo, o MJ.

Amostras: cada um **sozinho** (às vezes dupla ou revezamento); armas e itens **combinados** (duelo de lâmina em geral corpo a corpo, sem veneno, às vezes sem alcance); duração até **primeiro sangue**, nocaute ou **desistir** (desistir pode custar reputação). Duelo de talento: vários turnos iguais para mostrar a perícia.

Estas reações **não** existem no combate normal — só com juiz e foco de dois duelistas.`,
      },
      {
        heading: 'Duelo de combate',
        body: `Quase um encontro. Diferença: iniciativa **no começo de cada round**. Cada um escolhe **Enganação, Intimidação ou Percepção**. Ninguém vê a escolha do outro.

Quem age **duas vezes seguidas** bagunça duração “até o início do seu próximo turno”: o segundo pode recusar esse efeito naquele round, ou escolher agir segundo no round seguinte mesmo ganhando a iniciativa.

Treinado na perícia que rolou = reação daquele round:
**Pressão intimidadora** (Intimidação) — gatilho: você vai Golpear corpo a corpo, ainda não rolou. Se acertar: alvo **amedrontado 1** (2 se ele usou Percepção na iniciativa).
**Esquiva enganosa** (Enganação) — gatilho: o outro te **acerta** (não crítico) corpo a corpo. Ele rerrola e fica com o segundo. Se ele usou Intimidação na iniciativa: **−2** de circunstância nesse segundo ataque.
**Sentir fraqueza** (Percepção) — gatilho: você vai Golpear corpo a corpo, ainda não rolou. Alvo **desprevenido** contra esse ataque (até o início do turno dele se ele usou Enganação na iniciativa).

Familiar e companheiro **não** usam isso, mesmo permitidos no duelo.`,
      },
      {
        heading: 'Duelo de magia',
        body: `Mais formal. Muitos **proíbem** tudo que não seja conjurar. Os dois se revezam num turno de magias; o rival tenta **contrapor**.

Iniciativa **normal** (não a cada round), mas pode ser Arcana, Natureza, Ocultismo ou Religião no lugar de Percepção. Treinado = **foco de tradição** daquela perícia + reação **Contrapor no duelo**: gasta espaço/preparo e contrapõe a magia do rival **da mesma tradição** do seu foco. **Mudar o foco de tradição** (1 ação) se estiver treinado na perícia nova.

Mistura lâmina + magia: iniciativa do duelo de combate, mas Arcana/Natureza/Ocultismo/Religião entram na lista; Contrapor e Mudar o foco continuam (Mudar o foco rende menos se a iniciativa muda todo round).`,
      },
      {
        heading: 'Fim',
        body: `O juiz confirma a vitória, pega trapaça, ou alguém desiste. Continuou depois do fim = iniciativa **normal** e combate de verdade.

Isto não substitui Influência no palácio. É o momento em que a mesa **cala** e dois personagens resolvem.`,
      },
    ],
  },
  {
    id: 'nations',
    name: 'Nações: o bloco do país',
    originalName: 'Nations',
    category: 'rules',
    summary:
      'Traços, governo, capital, povo, fé (oficial e proibida), exportação, aliado/inimigo e ameaça — o que entra no bloco e o que a história precisa antes.',
    source: 'GM Core págs. 168 e 137',
    aonUrl: 'https://2e.aonprd.com/Rules.aspx?ID=2996',
    relatedGuides: ['settlements', 'building-worlds', 'leadership'],
    relatedLinks: [
      { label: 'Divindades', to: '/compendio/divindades' },
      { label: 'Origens', to: '/compendio/origens' },
    ],
    sections: [
      {
        heading: 'País não é cidade',
        body: `Assentamento = loja e Ganhar renda. Nação = o **quadro** em volta: quem manda, com quem guerra, o que sai do porto. Uma cidade pode discordar do país inteiro.

Monte bloco para a terra natal do grupo, os países em que vão passar tempo, e os aliados/inimigos que entram na trama. O resto pode ser uma frase.`,
      },
      {
        heading: 'O que o bloco lista',
        body: `Nome, traços (elfo em Kyonin, revolucionário em Galt), uma frase de conceito.

**Governo** — monarquia hereditária, conselho eleito, teocracia.
**Capital** — com população entre parênteses.
**População** — ancestralidades, da mais comum à mais rara.
**Idiomas** — alfabéticos.
**Religiões** — as comuns; **oficial** entre parênteses; **proibidas** à parte.
**Outras características** — no máximo uma ou duas (armas de fogo em Alkenstar). Muitas nações não têm nenhuma.
**Exportação / importação** — some se não houver.
**Aliados / inimigos** — país ou organização grande; some se não houver.
**Facções, ameaças, NPCs** que importam (rei **e** quem puxa o cordão nos bastidores).`,
      },
      {
        heading: 'Desenhar a nação',
        body: `Comece pelo conceito. Depois tamanho, povo, recurso. Recurso define fronteira e guerra: sem ferro, ou comercia com o vizinho, ou invade. Sociedade nômade vs classe mercante opulenta nasce daí.

Religião de Estado e religião **proibida** mudam a ficha (clérigo em Rahadoum). Idioma nacional cruza com o guia de idiomas.

NPC: o cargo oficial **e** o vizir, o general, a rede de escravos. Sem isso o bloco é enciclopédia.`,
      },
      {
        heading: 'Na mesa',
        body: `Andoran e Rahadoum no GM Core são molde — copie a **estrutura**, não o texto. Reputação é com a **facção**; este bloco é o país inteiro. Liderança é a organização **dos PCs** dentro (ou contra) desse quadro.

Não precisa de nível de nação. A ameaça militar vira encontro; a diplomacia vira Influência.`,
      },
    ],
  },
  {
    id: 'adventure-design',
    name: 'Montar uma aventura',
    originalName: 'Adventure Design',
    category: 'rules',
    summary:
      'Motivação da mesa, variedade de cena, a receita de 8 passos (estilo + ameaça no centro) e esqueletos de masmorra, horror e alta aventura.',
    source: 'GM Core págs. 68–74',
    aonUrl: 'https://2e.aonprd.com/Rules.aspx?ID=2688',
    relatedGuides: ['encounters', 'published-adventures', 'building-creatures'],
    relatedLinks: [
      { label: 'Companheiros', to: '/compendio/companheiros' },
    ],
    sections: [
      {
        heading: 'Por onde começa',
        body: `Vilão, depois o caminho até ele. Ou o lugar, depois quem mora lá. Os dois funcionam.

Pergunte o que a mesa curte **antes**. Motivação do jogador ≠ prever o PC. Você coloca isca (NPC social, vilão impossível, bicho para o druida); a decisão ainda desvia. O importante é **engajar**, não acertar o futuro.

Emoção-alvo (triunfo, pavor, otimismo) informa cenário e NPC tanto quanto o plot. Variedade: tipo de desafio, lugar, cara, tesouro. Masmorra com combate em **todo** quarto cansa. Pense em **sessão**: se cabem cinco cenas, duas podem ser luta; as outras três mudam a ferramenta (negociação, força, furtividade).`,
      },
      {
        heading: 'A receita de oito passos',
        body: `Esqueleto primeiro; detalhe depois. O que ainda não entrou em jogo **pode mudar**. “Oposição” = adversário **e** obstáculo — temática, não necessariamente unida (facções que se odeiam).

1. **Estilo** — o vibe (masmorra, grit, alta aventura…). Quantas sessões e que mistura de encontro.
2. **Ameaça** — o perigo temático. Estilo + ameaça = o miolo.
3. **Motivações** — o que a oposição **quer**.
4. **Arcos** — o que atravessa esta aventura e talvez a campanha.
5. **NPCs e organizações**
6. **Lugares**
7. **Encontros** (sala, criatura, perigo)
8. **Tesouro**

Pode pular ordem. Ajuste a receita à mesa.`,
      },
      {
        heading: 'Três esqueletos',
        body: `**Masmorra** (3–4 sessões): viagem até lá; corredores com armadilha; acampamento seguro; passagem secreta. Combate: 2 triviais, 4 baixos, 6 moderados, 6 severos — vários **dão para contornar**. Quatro conversas com morador da masmorra + 1 trégua. Aperto, pouca luz, cripta alagada, puzzle.

**Horror** (1–2 sessões): pouca viagem; 2–4 áreas para investigar. Combate: 2 moderados, 1 severo, às vezes 1 extremo. **Evite** trivial/baixo (salvo alívio). Extremo contra o que **não dá** para ganhar funciona em one-shot. Recuar tem de ser opção real. Incerteza: o encontro **parece** pior do que é.

**Alta aventura** (6–8 sessões): duas viagens longas (mar/ar) com luta no meio. Combate: 16 moderados, 8 severos — **sem** trivial/baixo. Batalha em varanda, carroça, fio. Grupo grande de inimigo fraco para passar o trator.

O GM Core traz ainda grit, intriga, militar, mistério, planar… mesma lógica: conte sessão, misture exploração / combate / roleplay, declare o tropo.`,
      },
      {
        heading: 'Na mesa',
        body: `Encontro: guia de montar encontros. Tesouro: guia de tesouro. Criatura que não está no Monster Core: próximo guia.

NPC que **quebra** o tema (um esperançoso no horror) evita pastiche. Oposição monolítica cansa; duas facções ruins que se odeiam dão escolha.`,
      },
    ],
  },
  {
    id: 'building-creatures',
    name: 'Criar criatura e NPC',
    originalName: 'Building Creatures',
    category: 'rules',
    summary:
      'Design de cima para baixo (números finais, não soma de bônus), extremo/alto/moderado/baixo, empurrar e puxar, mapas de bruto/conjurador e nível de combate vs fora de combate.',
    source: 'GM Core págs. 112–136',
    aonUrl: 'https://2e.aonprd.com/Rules.aspx?ID=2874',
    relatedGuides: ['encounters', 'building-hazards', 'setting-dcs'],
    relatedLinks: [
      { label: 'Classes', to: '/compendio/classes' },
    ],
    sections: [
      {
        heading: 'Não é ficha de PC',
        body: `Criatura usa **número final** (CA 22, ataque +18), não “nível + treino + item + …”. Isso é design **de cima para baixo**: você escolhe o resultado e preenche o bloco.

Quatro passos: conceito → estatísticas → habilidades especiais → olhar o todo e ajustar. Pode começar pela habilidade legal. **Reskin** primeiro: gato de fogo vira árvore ácida se só muda o tipo de dano.

Escala: **extremo** (classe mundial — no máximo **um** até ~11º, dois ~15º, três ou quatro no 20º+, e só o que o encontro usa), **alto**, **moderado**, **baixo**, às vezes **terrível**. Quase toda criatura de combate tem CA alta e ou ataque+dano altos, ou ataque moderado e dano **extremo**.`,
      },
      {
        heading: 'Empurrar e puxar',
        body: `Estatística extrema pede **baixa** em outro lugar. CA extrema = salvaguarda ou PV mais baixos. Conjurador forte = vários números baixos. Quatro altos e zero baixos = reveja.

Não empilhe extremos **ligados** (ataque extremo **e** dano extremo no mesmo Golpe). Voador com ataque à distância: em geral **7º+** (quando o grupo voa). Invisibilidade à vontade: ~6º–8º.

Nível = ameaça **de combate**. Social com combate de 3º e perícia de 6º **continua 3º**. Tabelas vão até 24º (encontro extremo). Números: GM Core págs. 114+.`,
      },
      {
        heading: 'Mapa rápido',
        body: `O que não listar = **moderado**.
**Bruto** — Percepção baixa; Força alta/extrema; CA moderada/baixa; PV e dano altos.
**Escaramuçador** — Des alta; Reflexos altos; Fortitude baixo; Speed acima do normal.
**Soldado** — CA alta/extrema; Golpe reativo.
**Atirador** — Percepção alta; PV moderado/baixo; à distância forte, corpo a corpo fraco.
**Conjurador** — CD de magia alta/extrema; PV e ataque baixos; magias até **metade do nível (para cima)**.
**Paragon de perícia** — uma perícia extrema; habilidade que usa isso no combate.

Há mapas de **classe** (lutador, ladino, mago…) no mesmo capítulo — pegue feito emblemático, não a ficha inteira.`,
      },
      {
        heading: 'NPC',
        body: `Padeiro não precisa de feito de classe. Nv. **−1 ou 0**, simples. Perícias no estilo de PC (grau), com folga se for o tema (Conhecimento de Engenharia no funileiro).

**Nível fora de combate:** o advogado é −1 na briga e **4º** no tribunal. XP segue o **desafio que vocês venceram**: ganhar o processo = XP de 4º; surrar o advogado = XP de −1 **e** em geral fracasso da cena (concurso de bolo + assassinato = desclassificado).

Montar NPC **como PC** só para recorrente importante. Tesouro dele conta no orçamento (tesouro para personagem novo). Atalho de atributo: modificadores somam **+9**, no máximo um +4. Feito geral útil: Iniciativa Incrível e Robustez.

Roube habilidade do Monster Core. Corte complexidade se forem **cinco iguais** no mesmo round.`,
      },
    ],
  },
  {
    id: 'building-hazards',
    name: 'Montar um perigo',
    originalName: 'Building Hazards',
    category: 'rules',
    summary:
      'Conceito (armadilha, ambiente, assombração), um número extremo, CD de achar/desativar, defesa, ofensa simples vs complexa e rotina que faz sentido.',
    source: 'GM Core págs. 109–111',
    aonUrl: 'https://2e.aonprd.com/Rules.aspx?ID=2864',
    relatedGuides: ['hazards', 'encounters', 'building-creatures'],
    relatedLinks: [
      { label: 'Equipamento', to: '/compendio/equipamento' },
    ],
    sections: [
      {
        heading: 'Comece pelo conceito',
        body: `Nível, simples ou complexo, e a família: **armadilha** (colocada; mecânica tem peça; mágica contrapõe e, sem grau mínimo, Detectar magia acha), **ambiente** (esporo, avalanche — Sobrevivência; às vezes nem dá para bater, como nuvem de gás) ou **assombração** (marca espiritual; Religião de exorcismo é comum; desativar **não** mata o assunto até resolver o que ficou pendente — o sucesso dá pista).

O nome e a descrição já dizem **como** desliga. Números: **extremo** (classe mundial — quase todo perigo tem **um**: CD de Furtividade, de desativar **ou** de salvaguarda, cada um pega uma fase), **alto** (o chão) ou **baixo** (a fraqueza: Reflexos ruins na máquina pesada, CD fácil num poço impossível de ver). Ainda mais baixo: use o “terrível” de criar criatura.

Tabelas 2–13 a 2–16: GM Core págs. 109–111. Não copie linha a linha — pegue o nível e escolha a coluna.`,
      },
      {
        heading: 'Achar, desativar e o grau',
        body: `Decida a história do desarme: isso escolhe a perícia. Sem grau na linha de Furtividade = óbvio o bastante para achar **sem** Buscar. Mágica sem grau = Detectar magia vê. Inteligente escondeu = pelo menos **treinado**.

Grau **alto** vs **moderado** por faixa (use menor se quiser): até 0 = não treinado; 1º–4º = treinado (Percepção alta pede **perito**); 5º–8º = perito / treinado; 9º–18º = mestre / perito; 19º+ = lendário / mestre. Se o método principal pede o grau **alto**, ofereça um segundo (menos eficiente, grau menor): a assombração sai com Religião mestre **ou** Diplomacia perito numa CD pior.

Perigo complexo lista **modificador** de Furtividade (iniciativa) = CD da tabela **−10**.`,
      },
      {
        heading: 'Defesa e ofensa',
        body: `Peça física: CA, Fortitude, Reflexos, Dureza, PV, limiar de quebrado (em geral **metade** dos PV). Mágica pura ou sem forma: pule isso. Dureza alta nem sempre faz sentido — aí use só os PV da tabela de objetos. Complexo: **parta** a durabilidade em várias peças, em lugares diferentes, para forçar o grupo a se mover.

Simples acerta **muito** (bônus de ataque bem alto) e causa ~**o dobro** de dano do complexo — dispara uma vez. Complexo usa ataque mais moderado e dano menor, mas **repete**. Efeito com salvaguarda: CD extrema ou alta (não tão inflada quanto o ataque simples, porque mesmo no sucesso costuma sobrar efeito).

Simples que **só** tira Pontos de Vida é lombada. Quer propósito: consequência que dura, ou amarra com quem mora ali (o goblin atrás da placa).`,
      },
      {
        heading: 'Rotina complexa',
        body: `Complexo é um **monstro de encontro** (ou o encontro inteiro). Dano pode matar no longo prazo — não precisa ser um obstáculo de duas ações.

Peça **vários** componentes, ou o painel no **outro** lado da galeria. A rotina tem de nascer da história: lava não escolhe PC; assombração pode sentir vida. Se ataca ao acaso (pilar de lâminas), pode ser mais mortal no resto.

Quantas ações a rotina precisar. Se você fatia em ações, **tire** algumas quando o grupo desativa/quebra uma peça — progresso visível, e incentivo a lidar com o perigo no meio da luta.

Isto não substitui o guia de perigos (detectar, XP). É o **bloco novo**.`,
      },
    ],
  },
  {
    id: 'building-items',
    name: 'Montar um item',
    originalName: 'Building Items',
    category: 'rules',
    summary:
      'Conceito e papel, comparar com o que já existe, 1×/dia vs várias, bônus de item no nível certo, tipo (poção, talismã, arma específica) e faixa de preço.',
    source: 'GM Core págs. 130–133',
    aonUrl: 'https://2e.aonprd.com/Rules.aspx?ID=2923',
    relatedGuides: ['magic-items', 'treasure', 'relics'],
    relatedLinks: [
      { label: 'Equipamento', to: '/compendio/equipamento' },
      { label: 'Magias', to: '/compendio/magias' },
    ],
    sections: [
      {
        heading: 'Conceito, depois número',
        body: `Item novo é lembrança e entra no meio da campanha sem reescrever a classe. Conceito = papel na história (runa da ruína, lobo para o monge em Postura do Lobo) **e** tipo. Arma/armadura nova pede o PC **largar** a atual — tem de valer. Consumível pesa menos na trama.

Nível perto do grupo. Baixo demais = ninguém liga; alto demais = vende e quebra a curva. **Compare** o que já existe (vassoura vs sandálias aladas) antes de inventar. Às vezes basta um ajuste.

Só bônus de item é chato — mesmo a arma +1 merece um gancho de interpretação. Poder = habilidade especial **mais** o bônus.`,
      },
      {
        heading: 'Magia no item',
        body: `Olhe magia parecida. Consumível: mais fraco que o maior posto que um conjurador daquele **nível de item** lançaria. Pergaminho é o teto de eficiência (mesmo nível, mesma lista, mesmas ações).

**1×/dia:** nível do item ≥ nível mínimo do conjurador daquela magia **+2**. Haste de 3º posto 1×/dia → item pelo menos **7º** (varinha básica). **Várias vezes/dia:** +**4** em vez de +2 (9º no exemplo). Frequência: 2×/dia até 1×/hora — o que não vire constante. Truque ilimitado ok; magia de posto **não**. Menos de 1×/dia: fora de encontro, ainda na faixa de 1×/dia, com propriedades estranhas.

Constante: o nível e o preço carregam o abuso. *Voar* de 7º posto já dura 1 hora — capa 16º que voa o dia inteiro é atalho, não milagre. Algumas magias **nunca** deveriam ser constantes.

Ações da ativação = ações da magia. 1 ação para magia de 2 ações no encontro é **muito** mais forte: suba o nível e reserve para magia de apoio, não ofensiva.

Posto baixo escala mal: três *Sopro de fogo* de 1º no 5º/6º perdem para o que o PC já faz. Prefira **menos** ativações, mais fortes.`,
      },
      {
        heading: 'Bônus e tipo',
        body: `Bônus permanente de item não chega **antes** do que a matemática espera (temporário pode, se não for permanente disfarçado):

**Ataque** +1 / +2 / +3 → 2º / 10º / 16º (runa de arma).
**CA** → 5º / 11º / 18º.
**Salvaguarda** (resiliente) → 8º / 14º / 20º.
**Perícia / Percepção** → 3º / 9º / 17º (17º também é o piso de **ápice**). Percepção vale mais que uma perícia; Atletismo costuma custar mais que Sociedade.

O bônus **não** é o único poder. Muito acima do piso compete com o **próximo** +1.

Alquímico: mais fraco e mais barato (alquimista fabrica de graça). Bomba = dano + firula; elixir ≠ poção mágica; veneno: ajuste um existente. Munição que some no disparo: efeito chamativo pede **ativação** (senão é ação livre no Golpe). Arma/armadura específica troca runa de propriedade — tema colado na lâmina; preço acima das fundamentais, com desconto na firula. Poção = **1 ação** (por isso mais cara/alta que pergaminho). Talismã = o “pergaminho” de quem não conjura (afixa antes, às vezes ação livre). Cajado: tema, 1–3 magias por posto, nível ≥ mínimo do maior posto **+3**. Escudo novo: Dureza/PV **abaixo** do escudo resistente daquele nível, porque faz outra coisa.`,
      },
      {
        heading: 'CD e preço',
        body: `CD típica na tabela 2–18 (GM Core pág. 132). Função estreita: até **+2**. Aura que força salvaguarda: em geral **−2**. CD baixa = item envelhece rápido.

Preço: faixa por nível (tabelas 2–19 permanente e 2–20 consumível). Só importa de verdade se vão **vender**.
**Primário** (teto): arma, armadura, Percepção, ápice — *arma +1 golpe* = 100 po no 4º.
**Secundário** (meio): Medicina, Ofício, apoio.
**Terciário** (piso): estranho, específico; pode cair no vão entre dois níveis.

Isto não substitui o guia de itens mágicos (investir, ativar) nem o orçamento de tesouro. É o **item que o livro não tem**.`,
      },
    ],
  },
  {
    id: 'xp-rewards',
    name: 'XP e recompensas',
    originalName: 'Rewards',
    category: 'rules',
    summary:
      '1.000 XP por nível, XP de monstro/perigo e de conquista (10 / 30 / 80), grupo no mesmo total, avanço rápido/lento ou por história, e o ritmo de Pontos de herói.',
    source: 'GM Core págs. 56–57',
    aonUrl: 'https://2e.aonprd.com/Rules.aspx?ID=2647',
    relatedGuides: ['leveling-up', 'encounters', 'hero-points'],
    relatedLinks: [
      { label: 'Criar Personagem', to: '/personagens/novo' },
    ],
    sections: [
      {
        heading: 'Três prêmios',
        body: `**XP** sobe o nível. **Tesouro** (item, moeda, favor) fica na ficha. **Ponto de herói** é da **sessão**. Os dois primeiros acompanham o personagem; o terceiro zera no fim da mesa.

Padrão: **1.000 XP** = +1 nível; desconte 1.000 e o resto conta. O MJ manda no ritmo — as linhas abaixo são o esperado numa campanha normal. Como a ficha sobe: guia de subir de nível.`,
      },
      {
        heading: 'De onde vem o XP',
        body: `Oposição (luta, conflito social) = nível do desafio. Exploração (sala secreta, esconderijo, mapa da masmorra, aguentar o ambiente) também paga. **O grupo inteiro** ganha o mesmo: o ladino no cofre durante a briga ainda leva os 100 XP da luta; a gema famosa que o MJ chamou de conquista **moderada** (30 XP) também vai para todo mundo.

Monstro no nível do grupo = **40 XP**; +1 = 60; +2 = 80; +3 = 120; +4 = 160. Abaixo: −1 = 30 … −4 = 10. Perigo **complexo** = monstro; **simples** = ~1/5 (8 XP no nível do grupo). Encontro **trivial** em geral = 0; se a história precisava, pague uma conquista menor.

**Conquista** (aliança, organização, NPC que muda de lado): **menor 10 / moderada 30 / maior 80**. Moderada e maior costumam vir com Ponto de herói. Por sessão: várias menores, uma ou duas moderadas, **no máximo uma** maior. Igual para feitos iguais; **não** farmar (o segundo ovo de dragão não é novidade).

A tabela assume **4 PCs**. Grupo maior/menor muda o **orçamento** do encontro, não o XP listado. Muita gente + muitas conquistas = sobe rápido demais.`,
      },
      {
        heading: 'Mesmo nível, ritmos diferentes',
        body: `Mantenha o grupo no **mesmo** XP. Nível misturado: o fraco morre mais e se sente inútil. Se mesmo assim separar: escolha um **nível do grupo** para o orçamento (o mais alto se só um ou dois atrasaram; a média se todo mundo divergiu). Um PC **2+** níveis à frente: orçamento dos baixos + trate como **+1 PC** a cada 2 níveis de diferença. Quem está atrás ganha **XP dobrado** até alcançar. Falta à sessão: você decide se conta.

**Avanço rápido** = 800 XP por nível (campanha curta; mensal com sessão longa). **Padrão** = 1.000. **Lento** = 1.200 (tudo suado). Dá para mudar no meio: mistério na rua lento, masmorra padrão.

**Por história:** ignore XP e suba no marco (vilão, objetivo). Em geral **a cada 3–4 sessões**, logo depois do evento grande.`,
      },
      {
        heading: 'Ponto de herói e tesouro',
        body: `Começo da sessão: **1** para cada PC. Depois, ~**1 por hora** depois da primeira (3 extras numa mesa de 4 h). Mais cinematográfico ou desesperado: 1 a cada 30 min. Espalhe entre os PCs; não empilhe num só. Cue: a mesa **comemora** ou cala — último stand, inocente salvo, magia que vira o round. Golpe final num bicho duro ou cena social que fecha também vale. Conquista moderada/maior: mais um, em geral para quem puxou.

Tesouro: o orçamento é **por nível**, não por encontro (guia de tesouro). A matemática assume item **do nível do PC**; o livro manda achar item **+1** — mais forte do que o PC fabricaria. Sem loja: quase tudo “núcleo” da ficha, ou use Progressão automática de bônus (guia de regras variantes).`,
      },
    ],
  },
  {
    id: 'campaign-structure',
    name: 'Estrutura de campanha',
    originalName: 'Campaign Structure',
    category: 'rules',
    summary:
      'Série vs episódio, quanto tempo até o 20º, one-shot até épica, ligar aventuras, vilão que volta e como começar e encerrar a mesa.',
    source: 'GM Core págs. 64–67',
    aonUrl: 'https://2e.aonprd.com/Rules.aspx?ID=2668',
    relatedGuides: ['adventure-design', 'building-worlds', 'xp-rewards'],
    relatedLinks: [
      { label: 'Criar Personagem', to: '/personagens/novo' },
    ],
    sections: [
      {
        heading: 'Série, não episódio',
        body: `Aventura = um arco com começo, meio e fim. Campanha = a **série**: vários arcos, os objetivos de cada PC e os NPCs que atravessam. Tema e escopo você escolhe no começo — e a mesa **muda** os dois.

Quanto dura: o que a história precisa **e** o que a agenda aguenta. Âncora: **3–4 sessões** por nível. Semanal por um ano ≈ campanha até o **14º**; quinzenal ≈ **8º**; mensal ≈ **5º** (aí sessão mais longa e avanço rápido de 800 XP ajudam). 20º é opcional; muita mesa termina no vilão do meio. Estime **para baixo**: épica de 20 níveis uma vez por mês costuma morrer antes.

Quando achar que faltam duas sessões, **pergunte**. Objetivo de PC entra no mundo (tesouro e contato para quem quer fundar guilda; civil para salvar para quem quer proteger gente). Recapitule o estado do objetivo de vez em quando.`,
      },
      {
        heading: 'Quatro esqueletos',
        body: `**One-shot** — 1 sessão; 1 aventura (masmorra, horror, intriga, mistério); começa no 1º ou já mais alto; ficha que ninguém quer carregar um ano.
**Curta** — 2 aventuras (masmorra + alta aventura, ou horror); topo **4º–5º**; ~3 meses semanal.
**Estendida** — ~5 aventuras no tema + variedade; topo **11º–13º**; ~1 ano semanal.
**Épica** — ~6 aventuras longas até o **20º**; militar, planar, romance no meio; 1½ ano semanal ou 3 anos quinzenal.

Estilo de cada aventura: guia de montar aventura. Entre uma e outra: NPC que atravessa, pista/tesouro que só importa depois, consequência da anterior, ou viagem que vira aventura curta. Recorrência (gigante, diabo, gelo) faz o grupo se sentir **especialista**. Tema que muda: mostre o mundo mudando (o tirano cai e entram os saqueadores).`,
      },
      {
        heading: 'Vilão que volta',
        body: `Não precisa ser o mestre do plano — o mercenário que troca de patrão já basta. Não amarre a trama **nele**: o grupo pode matá-lo cedo. Tenha plano B.

Ele muda como o PC muda: rancor, cicatriz, contra o truque que o pegou da última vez. Objetivo e **passos** — se o plano quebra, o objetivo ainda diz o que ele faz. Deixe o mundo sentir o vilão **mesmo** quando o grupo ganha: NPC virado, prédio queimado, vila ocupada. Se **todas** as tramas dele falham, ele parece inútil.`,
      },
      {
        heading: 'Começar e encerrar',
        body: `Antes da sessão 1: agenda e duração estimada; data/lugar/o que trazer; restrição e opção extra de ficha; onde começa; gênero. Sessão zero: guia de criação. Na primeira mesa: recap, apresentação pelo que os **outros** veriam, perguntas, motivo para estarem juntos.

Começar acima do 1º: todos no mesmo nível; ficha do 1º e sobe. Tesouro inicial = tabela de riqueza do GM Core pág. 61 (menos item do que quem aventureiro, mas **escolhe**).

Fim segue a história, não o plot original. Avisa com uma sessão de antecedência. Sessão final mais curta + epílogo: o que aconteceu com lugar e aliado; o que cada PC faz depois. Fracasso (TPK ou relíquia entregue): pergunte se continua — mundo depois da calamidade ainda é campanha. Próxima campanha no mesmo mundo: facção, vila e origem novas nascidas **desta**.`,
      },
    ],
  },
  {
    id: 'influence',
    name: 'Influência: o encontro social longo',
    originalName: 'Influence',
    category: 'rules',
    summary:
      'Quando Diplomacia solta não basta: rounds do evento, Influenciar vs Descobrir, bloco do NPC (limiar, resistência, fraqueza) e como o MJ conduz a festa.',
    source: 'GM Core págs. 187–189',
    aonUrl: 'https://2e.aonprd.com/Rules.aspx?ID=3040',
    relatedGuides: ['social', 'victory-points', 'using-subsystems'],
    relatedLinks: [
      { label: 'Origens', to: '/compendio/origens' },
      { label: 'Classes', to: '/compendio/classes' },
    ],
    sections: [
      {
        heading: 'Quando usar',
        body: `Pedido, Causar boa impressão e Coagir resolvem o NPC da esquina — guia de encontros sociais. Influência entra quando **vários** PCs precisam pesar **no relógio**: festa, tratado, júri, o senhorio expulsando a trupe.

Vocês acumulam **pontos de Influência** até limiares. Round = fatia do evento (15 min a 1 h é o típico). Cada round, cada PC age **uma vez**: **Influenciar** ou **Descobrir**. Todo mundo tem o que fazer — não só quem tem Diplomacia.

XP típico = encontro de combate **moderado** daquele nível.`,
      },
      {
        heading: 'As duas ações',
        body: `**Influenciar** (concentração, linguístico): escolhe o NPC e testa uma perícia que o bloco aceita. Crítico = **2** pontos; sucesso = **1**; falha = 0; falha crítica = **−1**.

**Descobrir** (concentração, **secreto**): Percepção ou a perícia que o MJ aceitar, vs a CD de descoberta.

Sucesso — **uma**: a perícia de Influenciar de **menor CD** que você ainda não sabe; um viés; uma **resistência**; ou uma **fraqueza**.
Crítico — duas (pode repetir a categoria).
Falha — nada.
Falha crítica — a informação vem **errada** (você acha que bajulação funciona; na verdade ele odeia).

Diplomacia quase sempre está na lista e **quase nunca** é a mais fácil.`,
      },
      {
        heading: 'O bloco do NPC',
        body: `Opcional, mas segura a mão se houver vários. Cabe: uma frase (“barão popular”), Percepção, Vontade, CD de Descobrir, perícias de Influenciar **da mais fácil à mais difícil**, limiares (4 / 6 / 8…) e o que cada um libera, resistências e fraquezas. Depois, se precisar: aparência, adjetivos, agenda pública/escondida, pena por antagonizar.

**Resistência:** em geral **+2** na CD (+5 se for forte), perder pontos, ou ele encerrar a conversa.
**Fraqueza:** **−2** (−5 se forte), pontos de graça, ou sucesso automático no limiar.

Perícia fora da lista: se a mesa justificar, aceite na **CD mais alta**.

CD: comece pelo **nível social** (não o de combate). Vontade vira CD base; ajuste fácil/difícil como no guia de CDs. Desafio de 3º com Vontade +12 → CD 22 é um chão sólido; Diplomacia nessa CD, Intimidação +2, Conhecimento de Vinho bem abaixo.

Não copie o senhorio do GM Core — use a **estrutura**: 3 rounds, limiares 4/6/8, Ofício e Conhecimento de Contabilidade mais fáceis que Diplomacia, pena que **corta um round**.`,
      },
      {
        heading: 'Conduzir o evento',
        body: `Os PCs escolhem com quem falam. O MJ deixa perícia criativa entrar, muda a estrutura se aparecer algo bom, e faz o salão **viver** — não uma fila de testes.

Amarre round e cena. Banquete de 4 pratos e **6** rounds: 1 de apresentação, 1 por prato, 1 depois da sobremesa. NPC entra, sai, fica ocupado, ou puxa assunto com um PC. Isso quebra a repetição.

Vários NPCs = vários relógios. O grupo **divide**. Influência não substitui reputação de facção nem atitude do dia a dia — é **esta** festa.`,
      },
    ],
  },
  {
    id: 'session-zero',
    name: 'Sessão zero',
    originalName: 'Session Zero',
    category: 'rules',
    summary:
      'O que a campanha é, o que pode entrar na ficha, linhas e véus, Carta X, o baseline do Pathfinder e montar o grupo na mesma mesa.',
    source: 'GM Core págs. 7–9',
    aonUrl: 'https://2e.aonprd.com/Rules.aspx?ID=2478',
    relatedGuides: ['character-creation', 'resolving-problems', 'variant-rules'],
    relatedLinks: [
      { label: 'Criar Personagem', to: '/personagens/novo' },
      { label: 'Configurações', to: '/configuracoes' },
    ],
    sections: [
      {
        heading: 'Por que juntar a mesa antes',
        body: `Dá para chegar com a ficha pronta. Sessão zero é **montar juntos**: vínculo entre PCs, veterano ajuda iniciante, o MJ vê o grupo de verdade e encaixa no gancho.

Costuma ser mais curta. Depois: uma cena de apresentação **ou** só conversa. Agenda, duração estimada e gênero: guia de estrutura de campanha.

O MJ apresenta o que a campanha **é** e que tipo de herói encaixa. Opção mais segura = **comum do Player Core**. Comum de outro livro, incomum e raro: leia se bate no tom. Em geral libere; não é obrigação. Avise variantes **agora** (arquétipo grátis, progressão automática…).`,
      },
      {
        heading: 'O que não entra no jogo',
        body: `Pergunte **antes** — em grupo ou um a um — o que pode aparecer e o que **some**. Não pergunte **por quê**. Pediu banir: bane.

Comece por uma “classificação”: violência gráfica até onde? Palavrão na mesa? Fobia (aranha, body horror)?

**Baseline** do GM Core, para ajustar:
violência e ferimento existem; gore e crueldade **não** viram espetáculo;
romance pode, sexo **fora de cena**; PC flertando com PC de outro jogador em geral **não** (e com estranho, nunca);
PC **não** tortura, não comete violência sexual, não fere criança, não escraviza, não usa magia mental de jeito reles.
Vilão pode fazer isso **fora de cena**, ou a mesa corta de vez.

Quatro tarefas do MJ: comunicar o limite, cumprir, **parar na hora** se alguém ficar mal (mesmo tema novo), e lidar com quem testa brecha ou diminui quem tem limite diferente. Quem ficou desconfortável **não** tem de resolver o problema.`,
      },
      {
        heading: 'Linha, véu e Carta X',
        body: `**Linha** — não acontece. “Linha em tortura.”
**Véu** — acontece, a cena **corta**. Quarto, fade.

**Carta X:** um cartão com X na mesa. Qualquer um toca em silêncio; quem narrava **volta** e corta o trecho. Sem julgamento. Dá para perguntar só “volto até onde?”. Depois da sessão, revise o limite em particular. Alguns grupos fazem X com a mão ou falam “X isso”.

Erro acontece. O que conta é como vocês seguem. Jogo é lazer: se alguém usa má-fé para excluir, o MJ manda parar — ou sair.`,
      },
      {
        heading: 'Na prática',
        body: `Os 10 passos da ficha: guia de criar personagem. Aqui o grupo combina **como se conhecem**, quem cobre o quê (dano, tanque, cura — as classes Remaster folgam), e o que cada um quer ver.

Colabore: gênero, inimigo, região, aventura publicada. O MJ também joga — meta o que **você** quer ver, com um twist para não ser previsível.

Isto não substitui a ficha. É o **contrato** da mesa.`,
      },
    ],
  },
  {
    id: 'building-worlds',
    name: 'Construir o mundo',
    originalName: 'Building Worlds',
    category: 'rules',
    summary:
      'Conceito primeiro, de cima para baixo ou da vila para fora, terra e clima, tecnologia/fé/magia do mundo, nação e cosmologia — só o que a história precisa.',
    source: 'GM Core págs. 134–140',
    aonUrl: 'https://2e.aonprd.com/Rules.aspx?ID=2952',
    relatedGuides: ['nations', 'settlements', 'planes'],
    relatedLinks: [
      { label: 'Divindades', to: '/compendio/divindades' },
      { label: 'Origens', to: '/compendio/origens' },
    ],
    sections: [
      {
        heading: 'Não desenhe o planeta inteiro',
        body: `Age of Lost Omens já está pronto. Mundo próprio: flexível (só o que as **próximas** aventuras precisam), no tom que você quer, sem spoiler de livro.

Conceito e meta **antes** de mapa. Steampunk em que humano é minoria? Magia só de deuses que brigam? Vila atrás de floresta de névoa? Campanha de anos ou one-shot? Isso escolhe o resto.

**De cima:** império, mil anos, mapa-múndi — se você tem tempo.
**De baixo:** a vila da sessão 1; o resto quando o grupo andar. Dá para pular seção. Deixe espaço para o jogador colocar coisa (guia de conduzir a mesa).

Documento vivo: geografia, facção, história, NPC, plot — anote o que a mesa toca.`,
      },
      {
        heading: 'Terra, água, mapa',
        body: `Forma: globo, oco (horizonte sobe), chato, toro, cubo — grave como gravidade e ar funcionam. Terra: arquipélago, ilha grande, continente, supercontinente. Fantasia não precisa de tectônica: titã fendeu o mar.

Ambiente comum (água, ártico, deserto, floresta, montanha, planície, urbano, pântano) e extremo (aéreo, geleira, vulcão, fundo do mar, subterrâneo): guia de clima e dano ambiental.

Mapa grande, cinco traços: costa → cume → rio (**sempre** desce, afluente **junta**, não atravessa serra) → bioma → civilização (cidade perto de água e recurso; estrada contorna mata; fronteira por último). Não precisa de cada hamlet.`,
      },
      {
        heading: 'Povo, nação, cidade',
        body: `Três alavancas do **mundo** (depois cada cultura desvia):
**Tecnologia** — pedra; bronze e galé; ferro e aqueduto; aço e besta; pólvora (placa some); vapor e rifle.
**Deuses** — nenhum / só para eleitos / religião do dia a dia / deuses **no** trono.
**Magia** — nenhuma (pense em progressão automática); baixa e tabu; comum mas para poucos; alta (item como tecnologia).

Nação: conceito, depois bloco (guia de nações). Geografia vira fronteira; sem recurso = nômade ou guerra. Cultura: inspire-se no real **com respeito** — “samurai nobre” e “selvagem da selva” são caricatura, não atalho.

Assentamento: por que existe **sem** o grupo (água, estrada, porto). Papel na trama (metrópole recorrente, vila do começo, capital do tirano). Mapa rápido: rota → muralha/bairro → mercado → estalagem → um marco com nome.`,
      },
      {
        heading: 'Fé e céu',
        body: `Politeísmo (Lost Omens), dualismo, um deus, panteísmo, animismo, ateísmo. Panteão: um só com nomes locais; um por povo; deuses que **trocam** de time; ou cada um sozinho.

Deus de classe (clérigo/campeão): áreas, 1–3 éditos, 2–3 anátemas, magias extras (sempre uma de 1º posto, em geral de outra lista), fonte *Curar*/*Ferir*, santificação sagrada/profana, perícia divina, quatro domínios, arma favorecida (simples/marcial salvo tema forte). Rank: deus / semideus / quase-deus.

Cosmologia: universo vasto, limitado (árvore, tartaruga) ou bizarro (simulação). Vácuo entre estrelas, céu infinito, esferas. Planos: guia de planos — dois lados brigando por alma já basta.

Isto não substitui nação e assentamento. É o **quadro** em volta.`,
      },
    ],
  },
  {
    id: 'running-sessions',
    name: 'Conduzir a mesa',
    originalName: 'Running a Session',
    category: 'rules',
    summary:
      'Começo da sessão, holofote, falhar para frente, improviso (sim, mas), encontro que estoura e o que fazer num TPK.',
    source: 'GM Core págs. 11–16 e 33',
    aonUrl: 'https://2e.aonprd.com/Rules.aspx?ID=2486',
    relatedGuides: ['session-zero', 'resolving-problems', 'portraying-npcs'],
    relatedLinks: [
      { label: 'Criar Personagem', to: '/personagens/novo' },
    ],
    sections: [
      {
        heading: 'Abrir e fechar',
        body: `Sessão típica ~**4 h** (menos de 2 h rende pouco; acima de 2 h, pause 15 min). Chegada ≠ início do jogo. Fim combinado.

Começo: recap; onde estão e se descansaram; **1** Ponto de herói; metas ainda valem?; modo (encontro / exploração / intervalo) e um gancho falado.

~20 min antes do fim: decida o corte. Cliffhanger (antes da luta, pista, tesouro) vicia conversa entre sessões. Tesouro, nível e intervalo dão para resolver **fora** da mesa.

Holofote: o mais falante puxa. De tempos em tempos: “e o **seu** personagem agora?” Se travar, coloque um detalhe ou NPC que interesse **aquele** jogador.`,
      },
      {
        heading: 'Falhar e inventar',
        body: `Até você **dizer**, o plano muda. A taverneira “boa” vira agente se a teoria da mesa for mais divertida.

**Falhar para frente:** a história **anda** com custo — pista pior, caminho mais caro — em vez de “não deu, ponto”. Não precisa sempre; se não souber, siga.

Improviso de trama, quatro perguntas: o que a história **já** disse? O que o NPC faria? O que o jogador espera? O que o tema pede? Buraco grande: pause. Buraco pequeno: “nada acontece” e segue. “O que acontece quando eu faço isso?” = ele quer reação; dê uma, mesmo mínima.

Circunstância: ±1 menor, ±2 maior, ±4 só em vantagem absurda ou quase impossível. Ação criativa: some traço (água no machado vs elemental) — em geral **custa uma ação**.

**Sim, mas:** deixa, com preço. Benefício curto sem teste; teste e +1; teste e penalidade no inimigo; teste e dano menor. Vale **só desta vez** se você não quer criar precedente (aranha como arma de teia o resto da campanha).`,
      },
      {
        heading: 'Regra na hora',
        body: `Rápido, justo, **igual** da última vez. Uma ação indefinida ≈ 1 ação (2 se não pode fazer três no round). Dois lados: um rola vs CD do outro (iniciativa é a exceção). Efeito letal só no crítico (ou falha crítica na salvaguarda).

Olhar o livro: avise (“vou ler 1 minuto”) para a mesa não ficar morta — alguém pode ler junto. Ouça quem lembra a regra; a **decisão** é sua. Na dúvida, favoreça o pedido do jogador e revise **depois**, avisando antes da próxima.

Informação falsa (falha crítica em Recordar Conhecimento): errada, **não** explosiva. Consequência imediata, fácil de limpar — símbolo do deus trocado, não quest de quatro templos. Teste secreto: o MJ rola quando o PC não pode saber se errou; em intervalo baixo, o jogador pode rolar.`,
      },
      {
        heading: 'Encontro que quebra e TPK',
        body: `Luta fácil demais: deixe o grupo brilhar, salvo se era o chefão — aí fuga com custo, reforço, desespero visível. Luta que vai **matar todo mundo**: vilão aceita rendição, se distrai, captura em vez de executar, ou deixa um corredor. Sorte extrema acontece; terreno que **você** colocou contra o grupo, ajuste.

Encontro contornado com tática/diplomacia/magia esperta = XP **cheio**. Sorte (passagem secreta): conquista menor/moderada. Megadungeon com três caminhos: às vezes **zero**. Tesouro e pista pulados: coloque **adiante**, com vantagem por terem pulado.

**TPK:** combine o gosto **antes**. Quase sempre dá para ver chegando. Aconteceu: dungeon leve = grupo novo no mesmo buraco; campanha de trama = irmão do morto, mesma aposta. Só continua se a **mesa** quiser. Encerrar a campanha também vale.

NPC aliado **não** resolve o plot no lugar do grupo — o herói extra do MJ costuma parecer que a mesa está sendo guiada. Delegue recap, iniciativa, lanche. Isto não substitui sessão zero nem encontros. É o **durante**.`,
      },
    ],
  },
  {
    id: 'crafting',
    name: 'Fabricar: da fórmula ao item',
    originalName: 'Craft',
    category: 'rules',
    summary:
      'Nível e grau, matéria-prima da metade, 2 dias (1 com fórmula), pagar o resto ou trabalhar pela tabela de renda, lote de consumível e Reparar.',
    source: 'Player Core pág. 237',
    aonUrl: 'https://2e.aonprd.com/Actions.aspx?ID=2385',
    relatedGuides: ['downtime', 'buying-selling', 'magic-items'],
    relatedLinks: [
      { label: 'Equipamento', to: '/compendio/equipamento' },
    ],
    sections: [
      {
        heading: 'O que você precisa',
        body: `Item do **seu nível ou menor** (sem nível = 0). 9º+ pede Ofício **mestre**; 17º+ **lendário**. Comum, **ou** você tem acesso (fórmula, herança, o MJ). Ferramentas ou oficina. Alquímico: feito Criação Alquímica. Mágico: Criação Mágica.

Matéria-prima de **pelo menos metade** do preço — essa metade **some** se der certo. O resto você paga em material **ou** trabalha dias extras.

**Fórmula** escrita: preparo de 2 dias vira **1**, e é o jeito de Fabricar incomum/raro. Fórmula é tesouro (guia de tesouro). Sem ela, item comum ainda sai — só demora o dia extra.`,
      },
      {
        heading: 'O teste',
        body: `Depois do preparo, Ofício vs CD do **nível do item** (raridade e circunstância ajustam — guia de CDs).

**Crítico:** item sai; cada dia extra abate como renda do **seu nível +1**.
**Sucesso:** igual, abate no **seu** nível (não no do item) e no seu grau de Ofício.
**Falha:** item não sai; matéria volta **inteira**; recomeça.
**Falha crítica:** perde **10%** da matéria; o resto volta; recomeça.

No sucesso você pode **pagar o resto agora** e levar o item, ou continuar no intervalo. Interrompeu: volta depois de onde parou. Tabela de renda: guia de intervalo — não copie a coluna.

Consumível: até **4 iguais** no mesmo teste (matéria dos quatro desde o início). Munição mundana: o pacote da tabela (em geral 10).`,
      },
      {
        heading: 'Reparo e runa',
        body: `**Reparar** (Ofício, 10 min, ferramentas): objeto quebrado ou danificado. CD pelo nível do item. Sucesso tira dano igual ao seu teste (crítico = dobro); falha crítica **piora**. Item **destruído** (0 PV) não repara — Fabricar de novo.

Transferir runa: Ofício (item mágico), **1 dia**, 10% do preço da runa (de um runestone, de graça) — guia de itens mágicos. Isto **não** é Fabricar um item novo; é mover o que já existe.

Ganhar renda com Ofício é outro botão (mesmo guia de intervalo). Não misture o teste.`,
      },
      {
        heading: 'Na mesa',
        body: `Longe de loja, Fabricar **é** o tesouro. Sem tempo de intervalo, o grupo compra ou fica para trás — reponha item útil no caminho.

Item que o livro não tem: o MJ monta primeiro (guia de montar item), **depois** você Fabrica. Progressão automática: fundamentais somem; você fabrica efeito especial, não +1.

Isto não substitui comprar/vender nem o orçamento do nível. É o **banco de oficina**.`,
      },
    ],
  },
  {
    id: 'automatic-bonus-progression',
    name: 'Progressão automática de bônus',
    originalName: 'Automatic Bonus Progression',
    category: 'rules',
    summary:
      'Potência no lugar de runa fundamental: ataque, dado extra, CA, Percepção, salvaguarda, perícia e ápice no 17º — e o que muda no tesouro.',
    source: 'GM Core pág. 83',
    aonUrl: 'https://2e.aonprd.com/Rules.aspx?ID=2741',
    relatedGuides: ['variant-rules', 'treasure', 'magic-items'],
    relatedLinks: [
      { label: 'Configurações', to: '/configuracoes' },
    ],
    sections: [
      {
        heading: 'Para que serve',
        body: `Tira o bônus de **item** de rolagem e CD — a armadura **mantém** o bônus de item na CA — e troca por bônus de **potência** que sobe com o nível. Item, se existir, vira efeito especial, não +1 no ataque.

Mundo sem loja de runa, horror de baixa magia, ou tesouro que você quer narrar em vez de calibrar. Liga na sessão zero. Neste app a variante ainda é **papel**; Arquétipos grátis já tem interruptor.

Outras variantes (sem nível na proficiência, nível 0): guia de regras variantes.`,
      },
      {
        heading: 'O que cada nível entrega',
        body: `Todo PC ganha isto **automaticamente** (não gasta feito):

**2º** potência de ataque +1 (arma **e** desarmado); **10º** +2; **16º** +3.
**4º** Golpes com **2** dados; **12º** três; **19º** quatro.
**5º** CA +1; **11º** +2; **18º** +3.
**7º** Percepção +1; **13º** +2; **19º** +3.
**8º** salvaguardas +1; **14º** +2; **20º** +3.
**17º** ápice: +1 num modificador **ou** sobe para +4 (o que for melhor).

**Perícia** (escolha; 1 semana para retreinar):
3º uma +1 · 6º duas +1 · 9º uma +2 e uma +1 · 13º duas +2 e uma +1 · 15º três +2 e uma +1 · 17º uma +3, duas +2, duas +1 · 20º duas +3, duas +2, duas +1.`,
      },
      {
        heading: 'O que some do item',
        body: `Tire runa de **potência**, **golpe** e **resiliente**. Item que só dava bônus numérico ou dado extra **para** de dar — salvo o bônus de item da **armadura na CA**. Ápice **não** sobe atributo (já veio no 17º). Se tirar reforço de escudo, evolua escudo **com o nível**.

Pode manter runa de **propriedade** (flamejante, santo). Tirar **todas** corta dano — o encontro pesa mais, mesmo com potência automática.`,
      },
      {
        heading: 'Tesouro',
        body: `Ignore o quanto quiser da tabela por nível. **Moeda** continue saindo. Consumível (pergaminho, varinha, poção) no ritmo normal se o mundo ainda tem magia — é aí que a escolha mais dói.

Sem quase tesouro nenhum, o desafio **sobe** mesmo com os bônus de potência. Com loja fechada, ninguém converte o baú em runa que você já deu de graça.

Isto não substitui o guia de tesouro no jogo padrão. É o **modo sem fundamentais**.`,
      },
    ],
  },
  {
    id: 'group-composition',
    name: 'Mesa pequena ou grande',
    originalName: 'Group Composition',
    category: 'rules',
    summary:
      'O padrão são 4 PCs: o que muda com 2 ou com 7, NPC de apoio que não rouba a cena, delegar, recap e o que a mesa precisa para jogar bem.',
    source: 'GM Core pág. 20',
    aonUrl: 'https://2e.aonprd.com/Rules.aspx?ID=2518',
    relatedGuides: ['encounters', 'characters-with-disabilities', 'companions'],
    relatedLinks: [
      { label: 'Companheiros', to: '/compendio/companheiros' },
      { label: 'Configurações', to: '/configuracoes' },
    ],
    sections: [
      {
        heading: 'Quatro é o chão',
        body: `Orçamento de encontro, tesouro e XP assumem **4 PCs + MJ**. Menos ou mais pede ajuste de **mesa**, não só de número (guia de encontros já soma/subtrai o orçamento).

Sociedade Pathfinder: cenário de **uma sessão**, ficha que viaja. O MJ segue o texto, mas aceita ilusão, suborno ou conversa no lugar da luta escrita. Opções de ficha a campanha já escolheu — não é mesa caseira.`,
      },
      {
        heading: 'Grupo pequeno',
        body: `Dois ou três: cada PC brilha, a história cola. O buraco é **papel que falta** (ninguém cura, ninguém abre fechadura).

Jeito mais simples: **mais personagens**. Cada jogador com dois PCs, ou mercenário / NPC de apoio no buraco. O NPC do MJ **não** decide o plot e **não** ganha do PC na especialidade dele.

Outras alavancas: arquétipos grátis, tesouro extra, ou uns treinos de perícia de bônus. Encontro: tire inimigo (não infle um só). Tesouro: o livro deixa subtrair menos — o equipamento extra cobre o papel que falta.`,
      },
      {
        heading: 'Grupo grande',
        body: `Muita criatividade e combate de escala. O holofote **divide**. Combine quantos precisam estar para a sessão existir. Recap no começo é obrigatório.

**Delegue:** recap, iniciativa, tesouro do grupo, olhar regra, som. Vender, comprar comum e subir de nível **entre** sessões.

Dividir o grupo num time grande **não** é sentença de morte. Se for mais que um pulo: duas sessões, depois juntam e contam. Cada PC tem menos tempo de fala — coloque desafio e gancho **para aquele** personagem.`,
      },
      {
        heading: 'O que a mesa precisa',
        body: `Pergunte. Ajuste o que a pessoa **quer**, não o que você acha que ela precisa.

Quem ouve mal ou satura fácil: sala quieta, não interromper, folha para consultar. Quem não vê: descreva som, cheiro, temperatura, brisa — não só a pintura da sala.

Atenção (sobretudo criança): pause, coma, estique. Rabiscar ou andar enquanto joga pode **ajudar**. No turno dos outros ou com o grupo partido, celular/leitura ok — chame de volta quando o PC entra.

Ficha com deficiência: combine com o jogador. Cego/surdo **de condição** não é o mesmo que viver assim há anos. Isto não substitui sessão zero. É o **tamanho** da mesa.`,
      },
    ],
  },
  {
    id: 'published-adventures',
    name: 'Aventura publicada ou própria',
    originalName: 'Preparing Adventures',
    category: 'rules',
    summary:
      'A aventura é um esboço: o que o livro já calibrou, o que você troca para a sua mesa, Sociedade Pathfinder e quando vale escrever do zero.',
    source: 'GM Core pág. 8',
    aonUrl: 'https://2e.aonprd.com/Rules.aspx?ID=2473',
    relatedGuides: ['adventure-design', 'campaign-structure', 'encounters'],
    relatedLinks: [
      { label: 'Criar Personagem', to: '/personagens/novo' },
    ],
    sections: [
      {
        heading: 'Esboço, não roteiro',
        body: `Aventura = pacote de trama, NPC, mapa e encontro. Os beats importantes ficam; o caminho até eles **muda** na mesa.

Duas fontes: livro (Paizo ou outro) ou o que você monta. Os dois são Pathfinder. Primeira vez de MJ: **publicado** ensina estrutura.`,
      },
      {
        heading: 'O que o livro já fez',
        body: `Background, NPC, local, mapa, grupo de monstro, tesouro e encontro no nível certo. Você lê o trecho da **próxima** sessão — não precisa inventar o andar.

Não está em pedra. **Trocar é o ponto:** vilão ligado ao passado do PC, cidade natal no lugar da vila genérica, cena que a mesa odeia **sai**. Conteúdo que deixa alguém mal: corte (guia de sessão zero).

Tesouro: olhe se o grupo não ficou para trás e troque arco +1 por espada +1. Encontro pulado com esperteza ainda paga XP (guia de conduzir a mesa).`,
      },
      {
        heading: 'Sociedade Pathfinder',
        body: `Sessão de 4–5 h, ficha persistente em mesas diferentes. O MJ **não** reescreve o plot; aceita solução criativa no desafio escrito. No fim: crônica com o que a ficha ganhou; o relatório online trava o prêmio. Escolha importante do grupo entra no relatório e puxa a campanha mundial.

Mesa caseira usando módulo da Society: você **pode** customizar mais — avise se a ficha vai voltar para mesa oficial.`,
      },
      {
        heading: 'Escrever a sua',
        body: `Mais trabalho, cola na mesa. Comece pelo vilão e construa o caminho, ou pelo lugar e popule. Receita de 8 passos e esqueletos: guia de montar aventura. Campanha em volta: guia de estrutura.

Criatura, perigo e item que o livro não tem: os guias de montar. Mundo: construir o mundo. Não precisa dos dois — muita mesa mistura módulo + capítulo caseiro no meio.`,
      },
    ],
  },
  {
    id: 'narrative-collaboration',
    name: 'Colaboração narrativa',
    originalName: 'Narrative Collaboration',
    category: 'rules',
    summary:
      'Três graus: a mesa sugere e o MJ decide, jogador dono de um pedaço do mundo, ou qualquer um narra o corredor — e Pontos de História para um twist pontual.',
    source: 'GM Core pág. 19',
    aonUrl: 'https://2e.aonprd.com/Rules.aspx?ID=2512',
    relatedGuides: ['session-zero', 'building-worlds', 'running-sessions'],
    relatedLinks: [
      { label: 'Criar Personagem', to: '/personagens/novo' },
    ],
    sections: [
      {
        heading: 'A escolha tem de contar',
        body: `Alguns jogadores querem só o PC. A maioria quer que o mundo **mude** porque eles agiram. Os três modos abaixo são um dial — combine na sessão zero.

O MJ tem a última palavra para o jogo **andar**, não para ditadura. Teoria e sugestão na mesa = o que eles querem ver. Encaixe com um twist para não ser previsível. Você também joga: meta o que **você** quer ver.`,
      },
      {
        heading: 'Três graus',
        body: `**Colheita de ideias** — estrutura clássica. Você pergunta, implementa, continua no volante. Checkpoint **antes** de inventar mundo e plot; depois, em marco (para onde o navio vai, o que tem no caminho).

**Colaboração criativa** — um desenha o mapa da cidade, outro faz o NPC, outro controla monstro no combate, o quarto só joga o PC. Você cola os pedaços. Anote **quem é dono de quê**. Se o pedaço dele entra na próxima sessão, avise para preparar. Você deixa de ser o único especialista — e precisa de consistência.

**Narração solta** — qualquer um fala pelo NPC; o corredor pode vir de outro jogador. Seu trabalho vira pergunta: “o que tem atrás da porta?” “como o rei reage ao insulto?”. Funciona com mesa íntima, que aceita ideia **não usada**. Melhor em campanha curta ou rodízio de MJ.`,
      },
      {
        heading: 'O que quebra',
        body: `Tons e fatos que brigam = história que não satisfaz **ninguém**. Recap para cravar o que é verdade compartilhada.

Planejar fica difícil: improvise encontro, pause para preparar, ou revise. Use criatura do Monster Core, não bloco de três horas que ninguém vai ver.

Não sacrifique a **sua** diversão pela dos outros.`,
      },
      {
        heading: 'Pontos de História',
        body: `Opcional: **2 ou 3** por jogador no começo da sessão. Gasta para um twist **rápido** ou para cravar um fato / atitude de NPC. **Não** resolve a cena inteira nem reescreve o cenário.

Isto não substitui Influência nem Pontos de herói. É **quem segura a caneta**.`,
      },
    ],
  },
  {
    id: 'running-exploration',
    name: 'Exploração para o MJ',
    originalName: 'Running Exploration',
    category: 'rules',
    summary:
      'Cena entre encontros, preparações como clima, tempo em fatias de 10 min, pista pela metade, perigo com recado e viagem que não vira planilha.',
    source: 'GM Core págs. 34–36',
    aonUrl: 'https://2e.aonprd.com/Rules.aspx?ID=2573',
    relatedGuides: ['exploration', 'watches-rest', 'hexploration'],
    relatedLinks: [
      { label: 'Magias', to: '/compendio/magias' },
    ],
    sections: [
      {
        heading: 'O tecido entre lutas',
        body: `Biblioteca, floresta, muralha antes do ataque, cidade atrás de desaparecido: exploração é **aprender o lugar**. Tenha a sala na cabeça (visão, som, cheiro) para narrar e saber onde o grupo está.

Aposta baixa/média — tem risco, não tem faca no pescoço. Tempo do mundo corre mais rápido; se precisar medir, fatia de **~10 min** (viagem longa: hora). Reação ainda funciona. Ação específica: o jogador pede; você vê se vira encontro.

Atividade contínua diz o que o PC **prioriza** — quem Investigar o relevo quer que aquele relevo importe. Lista do jogador: guia de exploração.`,
      },
      {
        heading: 'Cena, não corredor infinito',
        body: `Corredores = uma cena; salão = outra; parar na estátua = cena nova. Transição: recap do que estavam fazendo, depois o novo. Sem iniciativa, **chame** quem puxou a mudança ou quem está na atividade certa, senão todo mundo fala junto.

Preparações (~30 min–1 h, depois de 8 h de sono): magia, foco, equipamento, 10 itens investidos — e o **clima** do dia. Vigésima manhã no mar = bota pesada; alvorada com esqueleto na colina = medo ou euforia.

Mais detalhe = mais importante. Descreveu demais o barril inútil, a mesa vai abrir. Às vezes o melhor é **fazer** aquele barril importar.`,
      },
      {
        heading: 'Pista, perigo, viagem',
        body: `Investigação: comece com pista **pela metade** (runa arcana, mas variante; três vitrais e o deus tem quatro aspectos). Sem teste se o dado já está na cara. Chame o resto do grupo. Deixe o jogador **concluir** — não entregue o gabarito.

Perigo: não aparece do nada. Poço no corredor liso de 3 m já é recado. Simples resolve em exploração (narre o gatilho e o estrago); complexo vira encontro. Dano puro some com cura — melhor se alerta o andar, tranca a porta, muda a história. Desarmar: desacelere, peça o que as mãos fazem, mostre progresso a cada sucesso.

Viagem: só encontre e cena se **render**. Fast-forward vale — mas habilidade de exploração do PC ainda tem de contar. Perdido: uma sessão para achar o rumo; se a Sobrevivência não sai, o rumo **vem até eles** (captura, covil). Emboscada: rara; o grupo assusta bicho. Vale se eles ostentaram ouro ou atacaram e recuaram — não pune acampamento mal descrito.`,
      },
      {
        heading: 'Tempo de magia',
        body: `Duração é aproximada. Magia de **1 minuto** cobre dois encontros só se as salas são vizinhas e ninguém para para curar ou discutir. **10 min** aguenta um e talvez o vizinho. **1 hora** aguenta vários.

Buff antes da luta: se pegaram de surpresa, em geral **um** preparo cada e iniciativa. Se virar rotina, conjurar **entrega** a posição — role iniciativa no meio do preparo.

Isto não substitui as atividades do Player Core. É o **MJ atrás do mapa**.`,
      },
    ],
  },
  {
    id: 'portraying-npcs',
    name: 'NPC: gancho, traição e fim',
    originalName: 'Roleplaying NPCs',
    category: 'rules',
    summary:
      'Um gancho basta, aliado não resolve o plot, traição com recado, respeito no tema pesado e morte em cena com peso.',
    source: 'GM Core págs. 13–14',
    aonUrl: 'https://2e.aonprd.com/Rules.aspx?ID=2468',
    relatedGuides: ['social', 'running-sessions', 'building-creatures'],
    relatedLinks: [
      { label: 'Origens', to: '/compendio/origens' },
    ],
    sections: [
      {
        heading: 'Um gancho',
        body: `O PC é a estrela. NPC pinta o mundo. Dá para narrar só a cara; dá para sotaque e mania. Os dois valem.

Comece com **um** gancho fácil de falar: mercador viúvo, refugiada de outro reino, criança que pergunta o inconveniente. História por trás entra se o grupo voltar. Livro já traz personalidade; NPC importante traz édito, anátema, dica de cena.

Fora da sessão: mini-missão de um PC, intervalo por mensagem, brasão do grupo. O que muda a ficha de quem **não** estava: espera a mesa cheia. Recap para ninguém se sentir de fora.`,
      },
      {
        heading: 'Não roube a cena',
        body: `Aliado poderoso demais resolve o problema e o jogador vira plateia. NPC no nível dos deuses está ocupado com outra guerra, ou tem um limite que **exige** o grupo.

Quem viaja com o party: cuidado. O “PC do MJ” coage a decisão. NPC de apoio em mesa pequena: guia de composição — não decide, não ganha do especialista.

Traição: prepare o chão. Olhando para trás, o caminho tem de fazer sentido. Dê um **tique** ou um rastro que perícia boa pega. Surpresa sem pista parece trapaça.`,
      },
      {
        heading: 'Respeito',
        body: `Tema pesado no NPC (abuso, escravidão, deficiência) pede conversa **antes**, sobretudo se não é a sua vivência. Não spoilere o personagem; combine expectativa. Sem clichê, sem piada no gancho. Linha e véu: sessão zero.

Condição cego/surdo de combate ≠ PC que vive assim. Combine a representação com o jogador.`,
      },
      {
        heading: 'Um fim de verdade',
        body: `NPC sai quando cumpre o objetivo, parte para outra aventura, desiste do sonho ou morre. Morte de querido: peso, em geral **em cena**, com o grupo presente. Emoção forte: corte a sessão ou fade. A morte muda o mundo — vila salva, gente inspirada — não só vingança do PC.

Isto não substitui Influência nem bloco de criatura. É a **pessoa** na mesa.`,
      },
    ],
  },
  {
    id: 'running-encounters',
    name: 'Encontro para o MJ',
    originalName: 'Running Encounters',
    category: 'rules',
    summary:
      'Quando rolar iniciativa, Furtividade no começo, lote de inimigos iguais, ritmo, encontro fácil/difícil demais, fuga, rendição e debate com iniciativa.',
    source: 'GM Core págs. 24–33',
    aonUrl: 'https://2e.aonprd.com/Rules.aspx?ID=2539',
    relatedGuides: ['combat', 'encounters', 'dynamic-encounters'],
    relatedLinks: [
      { label: 'Companheiros', to: '/compendio/companheiros' },
    ],
    sections: [
      {
        heading: 'Quando vira encontro',
        body: `Aposta média/alta e cada ação conta: briga, desarme do artefato, negociação com a rainha. Combate: round de **6 s**. Social tenso: round de **minuto** (ou mais) para cada um fazer um ponto.

Role iniciativa quando alguém **intenciona** atacar, sacar, conjurar preparo, desafiar, ou começa um debate que o outro não ignora. Os dois só querem conversar? **Não** role só para sair na hora.

Percepção é o padrão. Furtividade se estava Evitando ser notado. Enganação se a traição nasce na mesa. Sociedade se a ficha já desmascarou o “diplomata”. Arcana/Ocultismo se o fenômeno mágico explode em monstro. O jogador pode pedir outra perícia **só** se estabeleceu na cena (“pendo no lustre”) — não no “posso usar Acrobacia?” sem setup.

Quem evita ser notado rola Furtividade na iniciativa (cobertura conta). Compara com a CD de Percepção: igualou ou passou = **não detectado e despercebido** para aquele inimigo. Rolou melhor que todo mundo mas **ninguém** falhou a CD? Os inimigos estão não detectados, **não** despercebidos: você sabe que tem gente e pode Buscar. Os dois lados furtivos podem se cruzar sem luta.`,
      },
      {
        heading: 'Ritmo e o inimigo',
        body: `Quatro goblins iguais: **uma** iniciativa para o lote. Cada um ainda tem o turno; Adiar muda o lugar **individual**. Sorte extrema (todos juntos no topo ou todos mortos antes de agir) — use só para a mesa andar.

Inimigo usa o que **ele** sabe, não o que você sabe. O clérigo tem Vontade alta; o bicho ainda tenta o medo. Ele aprende, planeja, pesquisa. Quase ninguém acaba com quem está nocaute — só o mais cruel. Drama > tática perfeita: se o lutador provoca o gigante para longe do mago, o gigante **pode** virar.

Esqueceu um +1 no turno do monstro: segue. Crítico e magia grande merecem mais descrição; o Golpe comum, não. Olhar regra no meio: decida agora, o jogador lê no turno dos outros. Voltar ação: dentro do **próprio** turno ok; depois que o próximo agiu, em geral não.

Vários inimigos na mesma magia: pegue a CD, role o dano enquanto rola as salvaguardas, resolva do melhor resultado inimigo para o pior.`,
      },
      {
        heading: 'Fácil demais, difícil demais, fim',
        body: `Não vai matar o grupo e ninguém está sofrendo: deixe. Vai **TPK**: rendição, vilão vai embora, captura, corredor aberto — TPK no guia de conduzir a mesa. Fácil demais no chefão: fuga com custo, reforço, desespero visível; o sucesso do grupo ainda conta. Sorte extrema acontece; terreno que **você** colocou contra eles, ajuste.

Fim: um lado morto ou nocaute. Sem desafio e só limpando lacaio: pergunte se chama a luta (salvo alguém concentrando magia legal). Rendição = sai da iniciativa, negociação **curta**. Fuga em massa: cada PC escolhe **um** alvo e declara uma ação/magia; compare Speed e habilidade — pegou, volta na ordem antiga; não, escapou. Não jogue hex por hex.

Encontro pulado com tática/diplomacia/magia esperta = XP **cheio**. Sorte (passagem): conquista menor/moderada. Megadungeon com três caminhos: às vezes zero. Pista e tesouro: coloque **adiante**.`,
      },
      {
        heading: 'Social com iniciativa',
        body: `A maior conversa é roleplay + um ou dois testes. Iniciativa entra quando a aposta é prisão, guerra, rival no palácio. Deixe claro o que sucesso e falha **fecham**.

Iniciativa: Sociedade ou perícia de Carisma, conforme a abordagem. No turno: um argumento, **um** teste. Magia visível na corte = reação ruim. Oposição no relógio (rival, ou a turba que piora sozinha). Progresso: atitude, Pontos de Vitória, Influência, ou “4 guardas enganados”. XP = conquista moderada (maior se era o arco). Nível **social** do juiz, não o de combate — guia de criar criatura.

Isto não substitui combate nem Influência. É o **MJ no relógio**.`,
      },
    ],
  },
  {
    id: 'dynamic-encounters',
    name: 'Encontros dinâmicos',
    originalName: 'Dynamic Encounters',
    category: 'rules',
    summary:
      'Perigo no meio da luta, campo que muda, alarme que junta salas, pressão de tempo, objetivo paralelo e vilão que aprende da derrota.',
    source: 'GM Core pág. 78',
    aonUrl: 'https://2e.aonprd.com/Rules.aspx?ID=2728',
    relatedGuides: ['encounters', 'hazards', 'running-encounters'],
    relatedLinks: [
      { label: 'Companheiros', to: '/compendio/companheiros' },
    ],
    sections: [
      {
        heading: 'Sal e pimenta, não o prato',
        body: `Sala quadrada com bicho funciona. Dinâmica entra no chefão, no inimigo memorável, ou de vez em quando. **Um ou dois** truques por luta. Tudo complexo cansa a mesa.

Não deixe toda luta na mesma ameaça. Trivial e baixo existem. Terreno que favorece só o monstro (vôo + à distância enquanto o grupo está no chão) infla o encontro — ajuste.`,
      },
      {
        heading: 'Perigo, campo, alarme',
        body: `Perigo simples sozinho é lombada. Com inimigo que **sabe** onde não pisar, vira peça. Complexo age todo round: cano de fogo vs elemental que cresce — o grupo escolhe o que desliga primeiro. Melhor ainda se desativar dá o que fazer para quem não é o DPS.

Campo que evolui: plataforma que anda no turno dela, teleporte entre duas salas, terceiro bicho perigoso para os dois lados, ritual que cai e solta um demônio, água subindo. A mudança tem de **importar** (o pedestal da joia sobe; o canto vazio não).

Castelo com alarme: guarda **não** espera educadamente na sala. Junta patrulha trivial em grupo maior — o PC vê o tamanho antes de encarar 30. Força avassaladora: avise e deixe recuar. Separar: ferido foge buscar reforço; o grupo decide perseguir ou não.`,
      },
      {
        heading: 'Tempo e segundo objetivo',
        body: `Trivial com **4 rounds** até o lich completar o rito deixa de ser trivial. Objetivo paralelo: civil no fogo, documento queimando, golpe não letal nos guardas errados, batedor que não pode alertar, ou **perder de propósito** para seguir o ladrão até o covil. Dá palco para monge, diplomata, quem não só causa dano. Não use toda sessão.

Sinergia: reação disparada pelo aliado, ou tentáculos como perigo + cabeça como criatura. Sem coordenação (mente vazia, dois vilões se atrapalhando) deixa a luta mais fácil — e às vezes engraçada.`,
      },
      {
        heading: 'Ilusão e vilão que volta',
        body: `Grupo que explode tudo: decoy, ilusão, possessão, o ogro óbvio enquanto o goblin é o chefe. Miniatura de estátua em **toda** estátua, não só na construto.

Vilão que foge: na próxima, minion, magia e defesa **contra o truque que o pegou**. Morto: casca, forma verdadeira, necromante que levanta — se a história justificar, até na cena seguinte.

Isto não substitui o orçamento de XP. É o **tempero**.`,
      },
    ],
  },
  {
    id: 'watches-rest',
    name: 'Vigília, descanso e fome',
    originalName: 'Watches and Rest',
    category: 'rules',
    summary:
      'Quem fica acordado, quanto a noite dura (2 a 6 pessoas), iniciativa de quem dorme (−4), emboscada e o que acontece sem comida ou água.',
    source: 'GM Core pág. 43',
    aonUrl: 'https://2e.aonprd.com/Rules.aspx?ID=2573',
    relatedGuides: ['exploration', 'running-exploration', 'combat'],
    relatedLinks: [
      { label: 'Criar Personagem', to: '/personagens/novo' },
    ],
    sections: [
      {
        heading: 'A noite tem de fechar 8 horas',
        body: `Descanso: **8 h** a cada 24 h (Player Core — guia de exploração). Vigília **corta** sono; o calendário da noite precisa caber o descanso de todo mundo.

Pergunte se tem vigília. Não assuma que silêncio = ninguém guarda — senão a mesa descreve a tenda por 20 minutos toda noite.

Tabela (todos revezam o mesmo tempo):
**2** pessoas — noite de 16 h, 8 h cada.
**3** — 12 h, 4 h cada.
**4** — 10 h 40 min, ~2 h 40 cada.
**5** — 10 h, 2 h cada.
**6** — 9 h 36 min, ~1 h 36 cada.`,
      },
      {
        heading: 'Emboscada na madrugada',
        body: `Sorteie quem está de guarda. Todo mundo rola iniciativa. Quem dorme: Percepção com **−4** de status (inconsciente). **Não** acorda só porque rolou iniciativa — no começo do turno, Percepção pelo barulho.

Inimigo esperto espera o guarda fraco: o ataque **cai** naquela vigília. O MJ ainda pode pedir Furtividade vs CD de Percepção de **todos** para ver se alguém ouviu a aproximação.

Emboscada é rara. Grupo assusta bicho; vigília afasta mais. Vale se ostentaram ouro ou atacaram e recuaram — não pune acampamento mal narrado.`,
      },
      {
        heading: 'Ordem da fila e interrupção',
        body: `Quem vai na frente: o grupo decide. Isso escolhe quem leva a armadilha da porta e o dardo do corredor. Ao virar combate, a formação em geral **permanece**; ajuste no grid com a mesa.

As 8 h **não** precisam ser seguidas: interrompeu, volta a dormir. Armadura na cama = descanso ruim = **fatigado**. Mais de 16 h acordado também. Descanso longo de verdade (cama segura 24 h) é intervalo — guia de intervalo para o MJ.`,
      },
      {
        heading: 'Fome e sede',
        body: `No dia a dia, assume-se que comem. Sem isso: **fatigado** até comer/beber. Dias sem água = Constituição **+1**; depois, **1d4** por hora que **não** cura até beber. O mesmo número de dias sem comida: **1** PV por dia que não cura até comer.

Isto não substitui preparações do dia nem hexploração. É a **noite no mapa**.`,
      },
    ],
  },
  {
    id: 'running-downtime',
    name: 'Intervalo para o MJ',
    originalName: 'Running Downtime',
    category: 'rules',
    summary:
      'Quanto tempo de mesa gastar, meta longa, um teste pelo dia, cooperar, período de meses e descanso longo (o dobro do sono).',
    source: 'GM Core págs. 44–50',
    aonUrl: 'https://2e.aonprd.com/Rules.aspx?ID=2604',
    relatedGuides: ['downtime', 'crafting', 'leadership'],
    relatedLinks: [
      { label: 'Criar Personagem', to: '/personagens/novo' },
    ],
    sections: [
      {
        heading: 'Quanto da sessão',
        body: `Intervalo = entre aventuras. Um teste resume o **dia**. Aposta nenhuma ou baixa. Precisa de ação de combate? Mude de modo.

Combine a profundidade na sessão zero. Quase nunca a sessão inteira: **~30 min** entre arcos, **~15 min** numa volta rápida à cidade. Uma frase para Ganhar renda (“a frota atraca, você descarrega”); aprofunde se o jogador puxou trama.

Junte tarefas na mesma cena (Performance + Medicina na caravana ferida). Quem não quer intervalo: uma frase e segue — ou sessão paralela só para quem quer.

Sem intervalo nenhum (filme de ação ou mesa sem interesse): resuma e pule a regra. Dinheiro de intervalo é pouco vs tesouro; o que some é **escolha** de item (Fabricar / comprar).`,
      },
      {
        heading: 'Meta longa',
        body: `Taverna, guilda, academia, terra restaurada, política, ruína reconstruída — organização grande puxa o guia de liderança. Pergunte o objetivo; sugira a partir de origem e NPC, sem empurrar o seu plot.

Mostre o mundo mudando. “O magistrado azedou porque vocês invadiram a torre.” Estágios (barraquinha → loja → funcionário → filial) viram vinheta, não planilha. Sucesso razoável é **provável**, não garantido. Avise ambição vs quanto intervalo a campanha **tem**. Falhou o grande: ainda abriu caminho menor.

Começo do dia: todo mundo declara. Resolva o simples primeiro. Preparação diária: combine a rotina e assuma que se repete.`,
      },
      {
        heading: 'Teste do período',
        body: `Cooperar: um testa, os outros **Ajudam**; tarefa complexa = cada um numa frente. O teste representa **dias**: quase nenhuma magia/item de rerrolar entra (fortuna, ativar). Bônus **constante** (item investido, Assurance) entra.

Semanas ou meses: **não** role cada dia. Alguns eventos (1 por semana/mês; ~4 no ano) no nível **acima** do chão da cidade + uma média no menor nível de tarefa que o lugar oferece. Falhou a média: tenta de novo na semana seguinte; sucesso não rerrola só para criticar, salvo a história mudar.

Retreino: o MJ decide professor, tempo, custo. Quase tudo pode; sangue de feiticeiro só em caso extraordinário. Sem intervalo na campanha, ainda libere troca se o jogador **se arrependeu** da ficha.`,
      },
      {
        heading: 'Descanso longo',
        body: `24 h inteiras em cama **segura** = o dobro do sono de 8 h. Alguns dias ou uma semana: PV cheio e a maioria das condições **não permanentes**. Doença e veneno longo ainda testam. Maldição e ferimento permanente pedem magia.

Isto não substitui Fabricar, Ganhar renda nem custo de vida. É o **MJ no calendário**.`,
      },
    ],
  },
  {
    id: 'characters-with-disabilities',
    name: 'Personagem com deficiência',
    originalName: 'Characters with Disabilities',
    category: 'rules',
    summary:
      'Condição de combate ≠ viver assim: combine com o jogador, visão e audição, língua de sinais, prótese e o que a mesa não deve tratar como piada.',
    source: 'GM Core págs. 21–22',
    aonUrl: 'https://2e.aonprd.com/Rules.aspx?ID=2526',
    relatedGuides: ['group-composition', 'session-zero', 'conditions'],
    relatedLinks: [
      { label: 'Criar Personagem', to: '/personagens/novo' },
      { label: 'Feitos', to: '/compendio/feitos' },
    ],
    sections: [
      {
        heading: 'Combine, não imponha',
        body: `O jogador quer isso na ficha, ou a história levou até aqui. Representação **respeitosa** nasce da conversa com ele — não do MJ preenchendo sozinho.

**Cego** e **surdo** de condição são efeito de luta (temporário, punitivo). Quem vive assim há anos **não** usa esse pacote. Doença crônica e saúde mental: em geral o jogador interpreta; o MJ não “simula” isso com dado. Tema pesado no NPC: sessão zero e guia de NPC.

Ajuste de mesa (sala quieta, descrição por som): guia de composição.`,
      },
      {
        heading: 'Visão',
        body: `Cego de longa data: não detecta por visão; falha **crítica** em Percepção que exige vista; imune a efeito visual; **não** pode ficar cego nem ofuscado. O MJ pode dar **Luta às Cegas** de graça.

Visão reduzida: **−2 a −4** em Percepção visual. Óculos e correção existem na cidade grande e podem zerar ou baixar isso.`,
      },
      {
        heading: 'Audição',
        body: `Surdo de longa data: não detecta por audição; falha crítica em Percepção auditiva; imune a efeito auditivo. Conjurar e ativar item **em geral** seguem — prática de componente verbal/comando. Ação auditiva **nova** (não habituada): teste simples **CD 5** ou a ação se perde.

Melhor: **Língua de Sinais** de graça; **Ler Lábios** se quiser. Outros PCs também podem ganhar sinais de graça.

Quem ouve mal: **−2 a −4** em Percepção auditiva. Correção existe onde aventureiro compra — menos comum que óculos.`,
      },
      {
        heading: 'Membro e mobilidade',
        body: `Item que pede um membro: troque a forma (bota vira bracelete). Sem uma mão: Interagir em objeto de duas mãos pode custar **2 ações**; arma de duas mãos não. Sem um pé: Speed um pouco menor. Sem pernas ou sem andar: cadeira, montaria treinada, magia de voo.

Prótese (ofício, magia, mecanismo) existe na cidade, em graus de função. Sem clichê, sem o gancho virar piada.

Isto não substitui sessão zero. É a **ficha**, não a condição de 1 round.`,
      },
    ],
  },
  {
    id: 'resolving-problems',
    name: 'Problemas na mesa',
    originalName: 'Resolving Problems',
    category: 'rules',
    summary:
      'Interrupção e celular, “cola” de regra, desequilíbrio de poder, jogador que puxa o holofote e quando pedir para alguém sair — sempre em particular.',
    source: 'GM Core págs. 16–19',
    aonUrl: 'https://2e.aonprd.com/Rules.aspx?ID=2506',
    relatedGuides: ['session-zero', 'running-sessions', 'group-composition'],
    relatedLinks: [
      { label: 'Configurações', to: '/configuracoes' },
    ],
    sections: [
      {
        heading: 'Diversão de todo mundo',
        body: `Resolver problema **não** pode matar o jogo para o resto. Estilo é pessoal; ninguém concorda em tudo. Ouça a mesa; a decisão final é do MJ.

Uma noite ruim acontece. Padrão **recorrente** pede conversa.`,
      },
      {
        heading: 'Fluxo e cola',
        body: `Conversa fora de jogo cabe; cortar cena e falar por cima, não. Mão no ar muitas vezes basta. Celular: ficha e recado urgente ok; feed e jogo no turno dos outros, não — relaxe quando o PC está **fora** da cena.

Cola de regra: quase sempre é esquecimento. Lembre o texto e siga. Trapaça de propósito rouba a mesa; espere esfriar, converse calmo, pergunte o **porquê** (muitas vezes aponta o conserto).`,
      },
      {
        heading: 'Um PC brilha demais',
        body: `Regras, item ou mesa mista (otimizador + narrativo). Os outros se sentem inúteis **ou** o forte se entedia. Conversa **entre** sessões: ninguém é o vilão. Retreino fácil; item some de um jeito que a história aguente. Resistiu: ouça; se ainda limitar a mesa, seja firme.

Se **todo mundo** está se divertindo com o desnível, não mexa.`,
      },
      {
        heading: 'Quando aperta',
        body: `Obsessão pela letra, “ajudar” o turno alheio o tempo todo, holofote sem espaço para os outros: converse em particular, não no meio da cena. E-mail perde tom — presencial se der.

Inaceitável (pause o jogo): discutir decisão o tempo todo, ignorar o resto, descarrilar de propósito, crueldade — sobretudo por identidade, gênero, orientação, fé, pele.

Carta X e linha: sessão zero. Expulsar: fale com o resto da mesa primeiro; depois, com a pessoa, firme, o que não volta. Amizade pode continuar; o comportamento na mesa, não.

Isto não substitui sessão zero. É o **depois**, quando o contrato quebrou.`,
      },
    ],
  },
  {
    id: 'using-subsystems',
    name: 'Quando usar um subsistema',
    originalName: 'Deciding to Use a Subsystem',
    category: 'rules',
    summary:
      'Influência, perseguição e companhia não entram em toda cena: um pedaço de sessão, todo mundo joga, dá para somar dois, e um teste solto ainda vale.',
    source: 'GM Core pág. 183',
    aonUrl: 'https://2e.aonprd.com/Rules.aspx?ID=3026',
    relatedGuides: ['victory-points', 'influence', 'chases'],
    relatedLinks: [
      { label: 'Criar Personagem', to: '/personagens/novo' },
    ],
    sections: [
      {
        heading: 'Não é o padrão',
        body: `Subsistema aprofunda o que um teste só esmagaria. Tentação: Influência em **toda** conversa. Aí vira fila de d20.

Use quando for **um pedaço de sessão** (ou mais) e o estilo mudar. Evite se a mesa não curte, se vira só rolagem sem história, ou se só **um** PC brilha e o resto assiste.

Estrutura sem interpretação = magia morta. Às vezes o teste solto **é** o certo.`,
      },
      {
        heading: 'O que já está no catálogo',
        body: `**Pontos de Vitória** — o esqueleto; os outros só mudam o nome.
**Influência** — festa, tratado, júri.
**Pesquisa** — biblioteca, arquivo.
**Perseguição** — filme de fuga.
**Infiltração** — golpe, heist.
**Reputação** — facção no longo prazo.
**Duelos** — um contra um combinado.
**Liderança** — causa, coorte, organização.
**Hexploração** — mapa hexagonal.
**Veículos** — perseguição e viagem em escala.

Social do dia a dia: guia de encontros sociais. Combate: encontro para o MJ.`,
      },
      {
        heading: 'Somar dois',
        body: `Influência que constrói reputação. Infiltração com uma festa no meio. Hexploração + perseguição + veículo. Um é o **pano de fundo** (longo); o outro contribui na cena.

Você decide como os pontos conversam. Não empilhe três relógios na mesma hora se a mesa ainda está aprendendo um.`,
      },
      {
        heading: 'Na mesa',
        body: `Deixe tempo e cabeça para o subsistema parecer especial. Estratégia **e** roleplay. Se a estrutura virou planilha, corte e volte ao teste.

Isto não substitui os guias de cada um. É o **quando**.`,
      },
    ],
  },
  {
    id: 'mythic-rules',
    name: 'Regras míticas',
    originalName: 'Mythic Rules',
    category: 'rules',
    summary:
      'Como ligar War of Immortals na mesa: chamado, Pontos Míticos no lugar dos de herói, Reescrever o Destino, morte, feitos extras nos pares e a Dedicação de destino no 12º.',
    source: 'War of Immortals págs. 76–81',
    aonUrl: 'https://2e.aonprd.com/Rules.aspx?ID=3320',
    relatedGuides: ['hero-points', 'leveling-up', 'character-creation'],
    relatedLinks: [
      { label: 'Configurações (ligar / desligar)', to: '/configuracoes' },
      { label: 'Arquétipos (destinos)', to: '/compendio/arquetipos' },
    ],
    sections: [
      {
        heading: 'Ligar na mesa',
        body: `Isto **não** é o padrão do Player Core. Em **Configurações → Regras da mesa**, ative **Regras míticas**. Sem isso, a aba Mítico some, os slots extras não aparecem e a ficha continua com Pontos de herói.

O jogador **escolhe** o chamado — o app nunca escolhe por você. Sem chamado, você ainda não é um personagem mítico: não ganha Pontos Míticos, Reescrever o Destino nem os feitos extras.`,
      },
      {
        heading: 'O chamado',
        body: `Cada herói mítico pega **um** chamado (Acrobata, Artesão, Arquivista, Cuidador, Demagogo, Guardião, Tratador, Caçador, Sábio, Ator, Ladrão — War of Immortals; Profeta do Fim, Sonhador, Runelord e Saga no guia de Revenge of the Runelords, raros).

O chamado traz **editais** e **anátemas**, um jeito de **gastar** 1 Ponto Mítico (em geral um teste com proficiência mítica) e um jeito de **recuperar** 1 ponto (em geral o primeiro crítico do dia naquela perícia).

Personagem **sem** chamado **não** pode pegar feitos míticos.`,
      },
      {
        heading: 'Pontos Míticos (no lugar dos de herói)',
        body: `Você começa a sessão com **3** Pontos Míticos. O máximo por sessão também é **3**. Enquanto tiver Pontos Míticos, você **não ganha Pontos de herói**.

Na ficha e em Combate o rastreador **Herói** vira **Mítico**. O botão **Sessão** volta para 3.

Recupera durante o jogo (sem passar de 3):
- matar um inimigo mítico: **2** para quem desferiu o golpe, **1** para os outros PCs míticos;
- completar um feito mítico: **3** para o grupo;
- seguir os editais do chamado: **1**;
- um momento épico: o MJ decide.

**Anátema:** quebrar um anátema do chamado zera os Pontos Míticos **atuais**. É um revés da sessão, não uma perda permanente do chamado.`,
      },
      {
        heading: 'Reescrever o Destino',
        body: `Ação livre, fortuna. Gatilho: você rolou um teste de **perícia** ou **salvaguarda** e não gostou do resultado. Gaste **1** Ponto Mítico e **rerrole** com **proficiência mítica** (nível + 10). Fique com o novo resultado.

Proficiência mítica **não** substitui CA, ataques ou perícias o tempo todo — só quando uma habilidade (esta, o gasto do chamado, ou um feito) diz para usar.`,
      },
      {
        heading: 'Morte e morrer',
        body: `Quando o valor de **morrendo** chegaria ao suficiente para matar (em geral **4**), em vez disso o **condenado** sobe **1** e você estabiliza com **0 PV**. Só morre de fato quando o condenado chega a **4**. Como o normal, o condenado cai 1 após uma noite completa de descanso.`,
      },
      {
        heading: 'Feitos extras (níveis pares)',
        body: `Além da tabela da classe, o herói mítico ganha **um feito mítico extra no 2º e a cada nível par**.

- **2º–10º:** feitos míticos gerais (catálogo com o traço Mítico, categoria mítica).
- **12º:** esse extra **tem** de ser a **Dedicação de um destino mítico** (Cavaleiro do Apocalipse, Arquidiabo, Celestial Ascendido, Senhor das Bestas, Corrente Quebrada, Lenda Eterna, Semideus, Monarca Profetizado, Feitiço Selvagem, Arauto Mortal, e os quatro de Lord of the Trinity Star: Runelord Vingador, Herdeiro Heroico, Dilacerado pelo Tempo, Guerreiro da Lasca de Guerra). **Um** destino só.
- **14º+:** feitos **daquele** destino, ou feitos míticos de nível menor que você ainda não pegou.

Na aba Feitos esses espaços aparecem como **Feito mítico · nv. N** (e **Destino mítico · nv. 12**). Na Progressão também.`,
      },
      {
        heading: 'Destinos já no catálogo',
        body: `Os destinos do War of Immortals, o Arauto Mortal de Divine Mysteries e os quatro de Pathfinder #219: Lord of the Trinity Star já estão nos arquétipos. A Dedicação é 12º, incomum ou rara, com o traço Mítico. Sem Legacy. Guerreiro da Lenda não é destino — é arquétipo de classe de guerreiro.

Depois da Dedicação, os feitos do destino entram nos slots míticos de 14+ — não precisa gastar o feito de classe neles, a menos que você queira.`,
      },
    ],
  },
]
