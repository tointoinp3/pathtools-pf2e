/** Textos de magias e recursos de origem, para a ficha não ficar só com o nome. */

export const INNATE_CANTRIP_NOTE =
  'Truque inato à vontade. Truques inatos se altura automaticamente para metade do seu nível (arredondado para cima).'

export const GUIDANCE_INNATE = `${INNATE_CANTRIP_NOTE} Tradição divina.

Você pede orientação a entidades sobrenaturais. O alvo ganha +1 de bônus de status em uma rolagem de ataque, teste de Percepção, salvaguarda ou teste de perícia antes da duração terminar. O alvo escolhe em qual jogada usar o bônus antes de rolar. Se usar o bônus, a magia termina. De qualquer forma, o alvo fica temporariamente imune por 1 hora.

Alcance 9 m; 1 criatura; duração até o início do seu próximo turno.

Como alternativa, o mestre pode conceder uma bênção similar no lugar desta magia.`

export const FEYS_FORTUNE = `Frequência: 1 vez ao dia. Gatilho: você tenta um teste de perícia e ainda não rolou. Traços: concentração, fortuna.

Efeito: role o teste de perícia duas vezes e use o melhor resultado.

Esta origem também impõe um anátema do pacto fey (combinar com o mestre). O mais comum: cumprir um único pedido de qualquer fey que souber o seu nome. Se violar o anátema, você perde Fortuna dos Fey até receber os efeitos de um ritual expiar bem-sucedido usando Natureza.`

export const HAUNTED_ENTITY = `O mestre também o deixa treinado em uma perícia extra que a entidade assombradora domina — anote-a na ficha.

Sempre que você tentar um teste dessa perícia da entidade, o mestre pode oferecer +1 de bônus de circunstância, como se a entidade estivesse Ajudando. Se você aceitar e falhar no teste, fica amedrontado 2 (amedrontado 4 em falha crítica). O valor inicial de amedrontado não pode ser reduzido nem evitado por efeitos que reduziriam ou impediriam a condição (como a Bravura do guerreiro).`

export const FERAL_CHILD_SENSES = `Você ganha visão na penumbra. Se já tiver visão na penumbra, ganha visão no escuro em vez disso. Você também ganha faro impreciso com alcance de 9 m.`

export const ELEMENTAL_INNATE_CANTRIP = `${INNATE_CANTRIP_NOTE} Tradição primal. O plano escolhido no Conhecimento define o truque:

• Ar — Explosão de Vendaval (2 ações): vento numa emanação de 1,5 m causa 1d6 de concussão (Fortitude); falha empurra 1,5 m, falha crítica empurra 3 m. Altura +1: +1d6.
• Terra — Dispersar Cascalho (2 ações): pedras numa área causam 2d4 de concussão (Reflexos básico) e deixam terreno difícil por 1 minuto. Altura +1: +1d4.
• Fogo — Ignição (2 ações): ataque de magia, 9 m, 2d4 de fogo (d6 se for corpo a corpo); crítico também causa fogo persistente. Altura +1: +1d4.
• Metal — Dardos de Agulha (2 ações): ataque de magia, 18 m, 3d4 perfurante com o metal que você tiver; crítico causa sangramento. Altura +1: +1d4.
• Água — Jato (2 ações): cubo de 1,5 m a 9 m, 2d4 de concussão (Reflexos básico); falha crítica deixa desprevenido. Altura +1: +1d4.
• Madeira — Leitura das Raízes (2 ações): emanação de 9 m revela criaturas Médias ou maiores não detectadas e dá +1 de status para Procurar e para o primeiro teste de Rastrear.`

export const AUGURY_WEEKLY = `Frequência: 1 vez por semana. Magia inata divina de 2º posto (Augúrio).

Durante o lançamento, pergunte sobre o resultado de um curso de ação até 30 minutos no futuro. O mestre indica o melhor palpite entre: bom, ruim, misto ou nada. O mestre faz um teste simples secreto de CD 6; em falha o resultado é sempre “nada”, então um “nada” pode ser impreciso. Perguntar de novo o mesmo tópico reusa o primeiro teste secreto, salvo se as circunstâncias mudarem.`

export const ILL_OMEN_DAILY = `Frequência: 1 vez ao dia. Magia inata ocultista de 1º posto (Mau Presságio). 2 ações.

Alcance 9 m; 1 criatura; duração 1 rodada; defesa Vontade.

O alvo deve tentar uma salvaguarda de Vontade.
• Sucesso: não é afetado.
• Falha: na primeira rolagem de ataque ou teste de perícia durante a duração, rola duas vezes e usa o pior resultado.
• Falha crítica: toda rolagem de ataque ou teste de perícia durante a duração usa o pior de dois resultados.`

export const VITALITY_LASH_INNATE = `${INNATE_CANTRIP_NOTE} Tradição divina. No texto original esta origem concede Disruptir Morto-vivo; no Remaster o truque equivalente é Açoite de Vitalidade.

2 ações. Alcance 9 m; 1 criatura morta-viva ou com cura nula.

Você causa 2d6 de dano de vitalidade com salvaguarda básica de Fortitude. Em falha crítica, o alvo também fica enfraquecido 1 até o início do seu próximo turno.
Altura (+1): o dano aumenta em 1d6.`

export const VITALITY_LASH_INNATE_INT = `${VITALITY_LASH_INNATE}

Use Inteligência como atributo-chave desta magia inata (ataque e CD).`

export const SIGN_INNATE_SPELL = `O signo da constelação em que você nasceu (tabela do livro-fonte desta origem) define o boost de atributo e concede uma magia inata associada. Combine o signo com o mestre e anote a magia na ficha — sem essa escolha, o benefício mágico não está definido.`

export const WARDED_BY_KAMI = `Você está ligado a um amparo (animal, planta, objeto ou local à sua escolha). 1 vez ao dia, gaste uma ação de Interagir para fundir-se ao amparo e recuperar PV iguais ao seu nível. Esta ação tem o traço cura.`

export const NOCTURNAL_NAVIGATOR = `Sempre que você puder identificar as estrelas com clareza: um sucesso em um teste para Sentir Direção (ou outro teste de orientação) vira sucesso crítico; uma falha crítica vira falha.`

export const TIDE_WATCHER = `À noite, quando você puder ver a lua, ganha +1 de bônus de circunstância em testes de Sobrevivência para reconhecer padrões climáticos e prever o tempo. O bônus sobe para +2 se você estiver nas proximidades do oceano.`

export const WISHED_ALIVE = `Frequência: 1 vez ao dia. 1 ação (concentrar).

Você deseja fervorosamente algo que poderia começar a alcançar nesta ação. Ganha +2 de bônus de circunstância no primeiro teste de perícia que tentar até o fim do seu turno para cumprir esse desejo.`

export const OTHERWORLDLY_MISSION = `Frequência: 1 vez por aventura.

Você pode pedir ordens à voz que acredita ser uma divindade. Nunca recebe explicação — só um comando para ir a algum lugar ou fazer alguma coisa. Seguir o comando nem sempre é seguro, mas costuma ser interessante. Combine com o mestre se a voz é fé, manipulação ou uma divindade de verdade.`

export const MECHANICAL_SYMBIOSIS = `O mestre também o deixa treinado em uma perícia extra que a entidade de mecanismos domina — anote-a na ficha.

Sempre que você tentar um teste dessa perícia da entidade, o mestre pode oferecer +1 de bônus de circunstância, como se ela estivesse Ajudando. Se você aceitar e falhar, a entidade se contrai: você fica atordoado 1 (atordoado 2 em falha crítica).`

export const SAVED_BY_CLOCKWORK = `Todo dia você precisa gastar 10 minutos em manutenção e dar corda nas peças de mecanismo, ou elas podem falhar (consequência combinada com o mestre, conforme o que foi substituído). Os componentes concedem +2 de bônus de circunstância em rolagens de iniciativa.`

export const TECH_RELIANT = `Você ganha +1 de bônus de circunstância em salvaguardas contra magias. Magias de cura, itens mágicos de cura e efeitos mágicos com o traço cura não têm efeito em você.`

export const REVENANT_VOID_HEALING = `Você ainda é vivo, não morto-vivo, mas tem cura do vazio: dano de vitalidade o fere e efeitos de vazio o curam, como se fosse morto-vivo.`

export const TWIN_VILLAGE_DREAMS = `Você e seu gêmeo recebem todas as noites o efeito de Mensagem Onírica, só entre os dois. Isto não é magia, é um efeito natural. A mensagem chega no sonho (até 1 minuto de fala). Salvo se o gêmeo for outro personagem jogador, o mestre interpreta ou resume o encontro.`

export const EMPTY_WHISPERS = `Você pode tentar um teste de Conhecimento de Fendas Planares para perceber fendas planares mesmo sem estar Investigando ou Procurando por elas, e também para perceber locais onde magia apagou da existência a memória de um objeto ou criatura.`

export const REBORN_SOUL_MEMORIES = `Os dois Conhecimentos desta origem sobem automaticamente: especialista no 3º nível, mestre no 7º e lendário no 15º.

Em situações que ecoam a vida passada, o mestre pode oferecer +1 de bônus de circunstância nesses Conhecimentos ou em outro teste de perícia. Se você aceitar e falhar, fica estupefato 1 por 1 minuto (estupefato 2 em falha crítica).`

export const FATED_RIVAL = `Enquanto não estiver na presença do rival: você tem o feito Difícil de Matar e +1 de bônus de circunstância em salvaguardas contra a condição condenado.

Na presença do rival: perde esses benefícios, mas ganha +1 de bônus de circunstância em rolagens de ataque e dano.

Se o rival se tornar aliado ou membro do grupo, você recupera Difícil de Matar e o bônus contra condenado enquanto isso durar. Combine com o mestre quem é o rival; um dos boosts livres desta origem é escolhido pelo mestre para complementar o rival.`

export const KAIJU_TROPHY = `Quando você Recapitular Conhecimento com Conhecimento de Kaiju e tiver à vista um item daquele kaiju (escama, lodo, pegada, bem colhido ou trabalhado), ganha +1 de bônus de circunstância no teste.`

export const LETTER_WRITER_LANGUAGE = `Durante as preparações diárias, escolha um idioma adicional que você conhece. Pode trocá-lo na próxima preparação diária.`

export const RECLAIM_DESTINY = `Ação livre. Frequência: 1 vez ao dia. Gatilho: você está prestes a tentar um teste e está afetado por um efeito de fortuna ou infortúnio que modifica esse teste.

Você ignora o efeito de fortuna ou infortúnio e rola o teste normalmente.`

export const ENLIGHTENMENT_IN_ADVERSITY = `Reação. Frequência: 1 vez ao dia. Gatilho: você falha criticamente em um teste de perícia de uma perícia que ganhou desta origem (a perícia escolhida ou o Conhecimento escolhido).

Na próxima vez, dentro de 1 minuto, que tentar um teste da mesma perícia, role duas vezes e use o melhor resultado.`

export const TALL_TALE_LEGEND = `Você pode ganhar o feito Rede de Contatos mais tarde sem ser especialista em Sociedade e sem ter Etiqueta Cortês. Isto representa a lenda se espalhando: as pessoas querem conhecê-lo.`

export const HOST_SPIRIT = `Frequência: 1 vez ao dia. Atividade de exploração.

Você tenta um teste de perícia para uma atividade de exploração, mesmo que normalmente precise ser treinado. Fica treinado na perícia só o bastante para aquele teste (no máximo 10 minutos). Consiga ou não, nas próximas 24 horas você deve cumprir um favor menor ao espírito (o mestre define; em geral algo sensorial). Não pode Acolher Espírito de novo até cumprir o favor. Se não cumprir em 24 horas, fica fatigado até cumprir.`

export const FINAL_SPITE = `Quando cai a 0 PV, você ainda desfere um Golpe antes de cair inconsciente. Combine com o mestre a frequência (em geral 1 vez ao dia) se o texto do feito Último Rancor no livro-fonte limitar o uso.`

export const DEVIANT_NOTE = `Usa as regras de poderes desviantes (Guia do Gatewalkers / Dark Archive): peculiaridade, despertar e backlash.`

export const GW_BLASTING_BEAMS_FIRE = `${DEVIANT_NOTE}

1 ação, ataque, mão livre. Ataque de magia a 9 m; sucesso causa 1d6 de fogo por cada 2 níveis (dobro no crítico).

Peculiaridade: as pupilas viram arcos e brilham ao usar o poder.`

export const GW_TITAN_SWING = `${DEVIANT_NOTE}

2 ações. Um Golpe corpo a corpo causa +1 dado de dano da arma e empurra 1,5 m (no 10º: +2 dados e 3 m; no 18º: +3 dados e 4,5 m).

Peculiaridade: as pupilas viram arcos e brilham ao usar o poder.`

export const GW_DRAINING_TOUCH = `${DEVIANT_NOTE}

1 ação, ataque, frio. Golpe corpo a corpo; sucesso causa 1d8 de frio por cada 2 níveis (dobro no crítico).

Peculiaridade: ao usar um poder desviante, um gemido baixo ecoa por perto.`

export const GW_GHOSTLY_GRASP = `${DEVIANT_NOTE}

1 ação. Um braço invisível a até 4,5 m pega um objeto sem dono de 1 Bulk ou faz uma Interação simples, e o deposita numa mão livre ou aos seus pés. A cada 5 níveis, +1 Bulk e +4,5 m de alcance. Afeta também incorpóreos.

Peculiaridade: ao usar um poder desviante, um gemido baixo ecoa por perto.`

export const GW_SONIC_DASH = `${DEVIANT_NOTE}

1 ação. Anda duas vezes em linha reta (ou usa Escavar/Escalar/Voar/Nadar se tiver esse deslocamento).

Peculiaridade: ao usar um poder desviante, plantas ao redor florescem e murcham como se envelhecessem rápido.`

export const GW_EERIE_FLICKER = `${DEVIANT_NOTE}

Reação. Gatilho: o Golpe de um inimigo o acertaria e você ainda não estava oculto daquele inimigo. Fica oculto por 1 rodada e o teste simples de ocultação vale contra aquele Golpe.

Peculiaridade: ao usar um poder desviante, plantas ao redor florescem e murcham como se envelhecessem rápido.`

export const GW_BLASTING_BEAMS_ELEC = `${DEVIANT_NOTE}

1 ação, ataque, mão livre, eletricidade. Ataque de magia a 9 m; sucesso causa 1d6 de eletricidade por cada 2 níveis (dobro no crítico).

Peculiaridade: ao usar um poder desviante, os músculos incham de forma impossível (a Força em si não muda).`

export const GW_BONE_SPIKES = `${DEVIANT_NOTE}

1 ação. Por 1 minuto você faz Golpes desarmados de espinho ósseo (1d6 perfurante, versátil S, varredura). Ao ativar, pode copiar as runas de uma arma que estiver com você (exceto as que não se aplicariam).

Peculiaridade: ao usar um poder desviante, os músculos incham de forma impossível (a Força em si não muda).`

export const STELLAR_MISFORTUNE = `Ação livre. Frequência: 1 vez ao dia. Traços: adivinhação, infortúnio, ocultista.

Gatilho: uma criatura que você possa ver está prestes a tentar uma salvaguarda, rolagem de ataque ou teste de perícia.
Requisito: você precisa estar sob o céu noturno, com as estrelas visíveis.

Você evoca o poder de uma estrela de infortúnio. O alvo rola o teste disparador duas vezes e usa o pior resultado.`

export const WARDING_SIGN = `Reação. Frequência: 1 vez por minuto. Traço: concentração.

Gatilho: você tenta uma salvaguarda contra um efeito mágico e ainda não rolou.

Você evoca um signo pessoal de proteção, que brilha e depois some. Ganha +2 de bônus de circunstância na salvaguarda disparadora, ou +3 se o efeito for uma maldição.

O mestre e você combinam o que resta da maldição desta origem: em geral um efeito temático constante ou muito frequente e, de vez em quando, manifestações mais perigosas.`

export const NAME_DROP = `Reação. Frequência: 1 vez ao dia. Traços: auditivo, fortuna.

Gatilho: você falha ou falha criticamente em um teste de Enganação, Diplomacia, Intimidação ou Sociedade.

Você invoca o nome do patrono e rerrola o teste de perícia. Deve usar o segundo resultado, mesmo que seja pior.

Se ofender o patrono, perde este benefício até se reconciliar (combinar com o mestre).`

export const BESTIAL_CLARITY = `Reação. Frequência: 1 vez ao dia. Traço: fortuna.

Gatilho: você falha numa salvaguarda contra um efeito de encantamento (efeito mental, no Remaster).

Sua manifestação bestial fica mais visível e o instinto toma conta. Você pode rerrolar a salvaguarda disparadora com +2 de bônus de circunstância, mas deve usar o novo resultado.`

export const INDOMITABLE_ACT = `Reação. Frequência: 1 vez ao dia. Traço: fortuna.

Gatilho: você está prestes a tentar um teste.
Requisito: você está amedrontado.

Você usa o medo como combustível. Role o teste disparador duas vezes e use o melhor resultado.`

export const STITCH_FLESH = `Você pode usar Tratar Ferimentos para restaurar PV de criaturas mortas-vivas, não só vivas. As técnicas variam, mas exigem suturas, ataduras e as ferramentas de curandeiro.

O mestre pode aumentar a CD — por exemplo se o morto-vivo estiver num templo de Pharasma ou se os ferimentos vieram de energia de vitalidade poderosa.`

export const CONTRACT_NEGOTIATOR = `Pré-requisito: treinado em Conhecimento Jurídico.

Ao negociar acordos, você pode usar Conhecimento Jurídico no lugar de Diplomacia para Causar Impressão ou Fazer um Pedido, mesmo sem um quadro legal formal.

Se for especialista em Diplomacia, ganha +1 de bônus de circunstância nesses testes; mestre +2; lendário +3.`
