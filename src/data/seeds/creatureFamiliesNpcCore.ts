import type { CreatureFamily } from '@/types/creature'

function fam(partial: CreatureFamily): CreatureFamily {
  return partial
}

/**
 * Famílias AoN Monster Families de NPC Core (lotes 1–4: Artesão a Vilão).
 * Asides = barras laterais oficiais da página da família. Sem blurb de membro.
 */
export const catalogCreatureFamiliesNpcCore: CreatureFamily[] = [
  fam({
    id: 'family-artisan',
    name: "Artesão",
    originalName: "Artisan",
    trait: null,
    sourcePage: 8,
    source: 'NPC Core',
    aonUrl: "https://2e.aonprd.com/MonsterFamilies.aspx?ID=531",
    intro:
      "A perícia se forja com anos de esforço e, muitas vezes, trabalho tedioso. Artesãos são mestres do ofício, capazes de criar obras práticas e belas.",
    sections: [
      {
        id: "crossover-ancestry-npcs",
        title: "NPCs de ancestralidade cruzada",
        body: "Vários NPCs de outras partes do NPC Core encaixam bem neste grupo: ferreiro anão (nível 0), artista abandonado (nível 2), chef goblin (nível 1), chef-chefe halfling (nível 2), forjador de lâminas tengu (nível 6).",
      },
      {
        id: "don-t-split-the-party",
        title: "Não divida o grupo",
        body: "Todo artesão deve ter o direito de se organizar e negociar com o empregador as condições de trabalho. Isso inclui o direito de distribuir literatura, usar símbolos ou brasões de sindicato e discutir o sindicato com colegas fora do horário, em locais como sala de ferramentas e ateliê. Organizadores sindicais recebem o ajuste Organizador Sindical.",
      },
      {
        id: "impending-meet-cute-scenarios",
        title: "Cenários de encontro fortuito",
        body: "Distritos de artesãos e ofícios são o lugar perfeito para conhecer gente nova e, quem sabe, encontrar amor. Quanto mais diferentes forem duas lojas vizinhas, maior a chance de interações interessantes entre fregueses e donos. Pense numa padaria bem em frente a uma oficina de maquinista, ou num florista ao lado de um estúdio de tatuagem.",
      },
    ],
  }),
  fam({
    id: 'family-courtier',
    name: "Cortesão",
    originalName: "Courtier",
    trait: null,
    sourcePage: 12,
    source: 'NPC Core',
    aonUrl: "https://2e.aonprd.com/MonsterFamilies.aspx?ID=532",
    intro:
      "Os habitantes de uma corte nobre são as pessoas mais poderosas de uma civilização, munidos de riqueza, posição e autoridade acima do povo comum.",
    sections: [
      {
        id: "crossover-ancestry-npcs",
        title: "NPCs de ancestralidade cruzada",
        body: "Vários NPCs de outras partes do NPC Core encaixam bem neste grupo: tradutor aiuvarin (nível 0).",
      },
      {
        id: "intriguing-plots",
        title: "Intrigas",
        body: "A corte real está cheia de trama! Eis exemplos de quem pode estar tramando.\n\n- O cônjuge ou os filhos do monarca\n- O animal de estimação real (um druida disfarçado)\n- O grão-vizir\n- Embaixadores ou nobres visitantes\n- O campeão do palácio\n- O médico do palácio\n- A equipe da cozinha\n- O bobo da corte",
      },
      {
        id: "know-your-social-events",
        title: "Conheça os eventos sociais",
        body: "**Baile**: festa de dança formal que muitas vezes inclui um banquete.\n**Banquete**: refeição formal elaborada para muita gente.\n**Baile de debutante**: baile em que jovens da alta sociedade entram formalmente na vida adulta.\n**Gala**: ocasião social com entretenimento ou apresentações especiais.\n**Caçada**: competição formal de caça entre a nobreza e a realeza da corte.\n**Masque**: espetáculo dramático com canto, dança, pantomima e diálogo.",
      },
      {
        id: "social-warfare",
        title: "Guerra social",
        body: "Embora cortesãos possam ter guardas e servos à disposição, suas forças mais potentes são as conexões fora da corte e a vontade do povo. Um nobre pode controlar financeiramente o distrito de entretenimento, mas uma cortesã popular que mude o patrocínio leva os admiradores junto. Um enviado que conquiste o povo comum ao mandar espiões expor oficiais corruptos pode provocar revolta pública quando um rival tenta substituí-lo.",
      },
    ],
  }),
  fam({
    id: 'family-criminal',
    name: "Criminoso",
    originalName: "Criminal",
    trait: null,
    sourcePage: 18,
    source: 'NPC Core',
    aonUrl: "https://2e.aonprd.com/MonsterFamilies.aspx?ID=533",
    intro:
      "Nas entranhas da sociedade, os sem-lei reinam.",
    sections: [
      {
        id: "corruption-for-hire",
        title: "Corrupção de aluguel",
        body: "Os criminosos desta seção não precisam sempre existir em oposição aos PJs. Personagens podem usar um juiz corrupto para manter o alvo de uma investigação na cidade enquanto tratam do resto, ou contratar um mestre do disfarce para infiltrar um prédio e mapear o andar antes do golpe. Basta moeda e uma palavra baixa no ouvido certo.",
      },
      {
        id: "criminal-scams",
        title: "Golpes criminosos",
        body: "Golpes comuns incluem coletores falsos de caridades inexistentes para doentes e oprimidos, jogos de azar viciados em feiras locais com prêmios sem valor, artistas de rua espalhafatosos encobrindo batedores de carteira na plateia, e laranjas que se oferecem para ajudar viajantes a achar pousada, mas os levam a estalagens com preços abusivos.",
      },
      {
        id: "crossover-ancestry-npcs",
        title: "NPCs de ancestralidade cruzada",
        body: "Vários NPCs de outras partes do NPC Core encaixam bem neste grupo: ousado gnomo (nível 2), contrabandista halfling (nível 6), ladrão saltador (nível 3).",
      },
      {
        id: "fantasy-crimes",
        title: "Crimes fantásticos",
        body: "Muitos crimes em Pathfinder lembram os do mundo real, mas alguns só existem num mundo de magia. Entre eles: usar magia para vencer uma aposta, usos maliciosos de maldições, violar a autonomia com magias que encantam ou controlam, forjar presságios, violar a privacidade com vidência ou invadir via teletransporte.",
      },
      {
        id: "folk-heroes",
        title: "Heróis populares",
        body: "Bandidos do mundo real existem no folclore e na história como campeões dos oprimidos, lutando contra opressores, roubando os ricos e atacando os poderosos a partir de covis secretos no ermo. O líder da gangue pode ser uma lenda local, alguém a quem os PJs recorrem para ajuda mútua quando a situação aperta.",
      },
      {
        id: "more-scams",
        title: "Mais golpes",
        body: "Fraudadores vendem itens alquímicos, remédios, amuletos, talismãs ou outras magias menores falsos.\nAgiotas inescrupulosos aproveitam regras frouxas para impor termos predatórios.\nFalsos videntes e médiuns usam leitura fria para iludir marcas ingênuas.",
      },
      {
        id: "protection-rackets",
        title: "Rachas de proteção",
        body: "Organizações criminosas muitas vezes acham mais fácil exigir dinheiro de proteção dos locais do que o trabalho de roubar. “Proteção” inclui a premissa implícita de que quem paga está a salvo daqueles criminosos, e alguns grupos também prometem retaliação se quem lhes paga cair nas mãos de outros bandidos.",
      },
      {
        id: "sanctuary",
        title: "Santuário",
        body: "Aventureiros ou quem eles resgatam podem achar santuário em lugares sagrados para ganhar tempo contra perseguidores ou sumir de quem os caça. Essas instituições vão de simples santuários rurais a mosteiros e propriedades maiores. As igrejas de Asmodeus, Cayden Cailean, Iomedae, Irori, Sarenrae e Shelyn são as mais propensas a conceder santuário — embora algumas cobrem caro em troca da proteção.",
      },
      {
        id: "walking-the-walk",
        title: "Viver o ofício",
        body: "Devotos itinerantes, como o peregrino e o sacerdote viajante, já viram mundo e estão mais do que dispostos a falar com gente nova. Isso faz desses viajantes um tesouro de rumores, histórias de terras lendárias e conselhos para quem mais precisa. Mas também estão longe de casa, então a dependência da generosidade alheia faz com que frequentemente aceitem trocar informação, viajar junto, dividir pousada ou outros arranjos úteis. A paciência dos companheiros com o proselitismo do viajante… é outro assunto.",
      },
    ],
  }),
  fam({
    id: 'family-devotee',
    name: "Devoto",
    originalName: "Devotee",
    trait: null,
    sourcePage: 28,
    source: 'NPC Core',
    aonUrl: "https://2e.aonprd.com/MonsterFamilies.aspx?ID=534",
    intro:
      "Religiões inspiram indivíduos devotos a defender seus preceitos.\n\nVocê pode personalizar um acólito, zelote, sacerdote ou outro NPC ligado a uma divindade específica para corresponder a outra divindade.\n- Mude a santificação do NPC para a da nova divindade.\n- Adicione a perícia divina da divindade no maior modificador de perícia que o NPC tiver. Opcionalmente, remova a perícia divina da divindade antiga.\n- Troque a arma pela arma predileta da nova divindade. Em geral dá para deixar o dano da arma como está.\n- Se o NPC tiver várias magias de _ferir_ ou _curar_ no círculo máximo (imitando a fonte divina do clérigo), mude essa magia para corresponder à fonte da nova divindade. Se o NPC tiver a habilidade mãos curadoras, troque-a por energia seletiva. **Energia Seletiva** Quando o devoto conjura uma versão de _ferir_ ou _curar_ que tenha área, pode designar até 5 criaturas na área. Essas criaturas não são alvos da magia.\n- Troque algumas magias por magias de devoto ou outras que combinem com o estilo da nova divindade. Você pode trocar magias de domínio se quiser, mas isso é mais trabalhoso; o melhor é consultar o Player Core (domínios e magias de domínio). Para a mecânica das divindades, veja a tabela de divindades.\n\nPara fazer um sacerdote de Urgathoa, faça as seguintes mudanças no sacerdote de Sarenrae, seguindo os pontos acima.\n- Troque o traço sagrado por profano.\n- Adicione Intimidação +14 e remova Medicina +14.\n- Troque a cimitarra por uma foice. Você pode mudar o dano 1d6+7 para o equivalente 1d10+5 se quiser usar o dado normal da foice.\n- Mude as magias como segue e substitua mãos curadoras por energia seletiva. Esta lista inclui um exemplo de troca do domínio do sol pelo domínio da morte-viva. **3º** _vincular morto-vivo_, _escuridão gélida_, _ferir_ (×5), _banquete vampírico_; **2º** _vendeta de sangue_, _vitalidade falsa_, _armamento espiritual_; **1º** _enfraquecer_, _medo_, _varíola goblin_; **Truques** _detectar magia_, _lança divina_, _orientação_, _ler aura_, _distorção do vazio_; **Magia de Domínio de Clérigo** _toque da morte-viva_.\n\nPara fazer a troca num campeão, use as causas.\n- Mude a santificação e a perícia divina, como acima.\n- Mude a arma predileta como acima. Se o campeão tinha arma de duas mãos e a nova divindade tem arma predileta de uma mão, reduza a CA do campeão em 1 e dê a ele um escudo de aço. Inversamente, se a ficha tinha arma predileta de uma mão e escudo, aumente a CA em 1, remova o escudo e ajuste a magia de foco _escudos do espírito_ se o campeão a tinha.\n- Troque a reação do campeão (Passo Libertador para o campeão de Shelyn ou Golpe Retributivo Exaltado para o campeão deífico de Iomedae) pela listada na nova causa. Inclua o benefício exaltado da reação se o nível do campeão for alto o bastante.\n- Se necessário, mude a magia de foco do campeão para _imposição das mãos_ se a divindade permitir _curar_ como fonte divina, ou para _toque do vazio_ se a divindade permitir _ferir_. Se o campeão usa escudo, você pode mudar a magia de foco para _escudos do espírito_.",
    sections: [
      {
        id: "crossover-ancestry-npcs",
        title: "NPCs de ancestralidade cruzada",
        body: "Vários NPCs de outras partes do NPC Core encaixam bem neste grupo: sacerdote espiritual (nível 5).",
      },
      {
        id: "divinatory-herbs",
        title: "Ervas divinatórias",
        body: "Ervas e outras plantas reverenciadas têm papel sagrado na prática divina, sobretudo nos transes de sibilas e outros ritos oraculares. Essas ervas mudam entre nações e estações de cultivo, mas as comuns são louro, camomila, hera, lavanda e artemísia.",
      },
      {
        id: "faithless-goals",
        title: "Metas sem fé",
        body: "O que separa o blasfemo do profeta é, ao menos em parte, a consciência de que está corrompendo de propósito a palavra da própria divindade. Blasfemos não conjuram magias de clérigo, pois não seguem os preceitos do deus; contudo, podem ter outras habilidades de conjuração para esconder esse fato.",
      },
      {
        id: "implements-of-faith",
        title: "Símbolos da fé",
        body: "O equipamento mais essencial para exibir a fé é o símbolo religioso da divindade, e quem viaja por áreas perigosas cuida de ter à mão a arma predileta do deus. Expressar devoção pelo resto da indumentária também importa: roupas azul e ouro e um símbolo dourado para um seguidor de Sarenrae, ou roupas pretas, correntes e espinhos para um fiel de Zon-Kuthon.",
      },
      {
        id: "redemption-through-penance",
        title: "Redenção pela penitência",
        body: "Os deuses exigem muito, e até os devotos podem falhar. É importante entender o que pode romper a conexão com a divindade e que passos são necessários para expiar e recuperar o lugar entre os fiéis, pois isso varia muito entre deuses. Embora o penitente seja o mais propenso a ter caído da fé, muitos destes NPCs podem ter as habilidades divinas removidas para aparecer como personagens caídos ou excomungados.",
      },
      {
        id: "walking-in-faith",
        title: "Andar na fé",
        body: "Devotos que viajam o mundo se esforçam para espalhar a palavra da fé. Podem recorrer à magia divina (rituais para fortalecer comunidades, magias para consolar o luto ou proteção) para exemplificar os ideais da fé e impedir quem faria mal. Seguidores de divindades profanas podem tomar outro caminho, deixando ruína, morte-viva ou outras cicatrizes que mostrem o poder do deus.",
      },
    ],
  }),
  fam({
    id: 'family-downtrodden',
    name: "Oprimido",
    originalName: "Downtrodden",
    trait: null,
    sourcePage: 40,
    source: 'NPC Core',
    aonUrl: "https://2e.aonprd.com/MonsterFamilies.aspx?ID=535",
    intro:
      "Infelizmente, toda sociedade tem gente vivendo à margem.",
    sections: [
      {
        id: "braving-the-mob",
        title: "Enfrentar a turba",
        body: "Uma turba é uma multidão violenta que funciona como terreno difícil maior e terreno perigoso, causando 1d4 de dano por quadrado entrado. Uma criatura pode gastar uma ação para tentar um teste de Intimidação CD 16; em sucesso, dispersa a turba de todos os quadrados adjacentes (ou de todos os quadrados a até 3 m em sucesso crítico). Esta ação tem os traços concentrar, emoção, manipular e mental. Se a turba for um encontro de combate, use em vez disso a turba iludida.",
      },
    ],
  }),
  fam({
    id: 'family-engineer',
    name: "Engenheiro",
    originalName: "Engineer",
    trait: null,
    sourcePage: 42,
    source: 'NPC Core',
    aonUrl: "https://2e.aonprd.com/MonsterFamilies.aspx?ID=536",
    intro:
      "Embora relativamente incomuns em grande parte de Golarion, as mentes frequentemente excêntricas, mas inegavelmente brilhantes, que criam dispositivos elaborados de mecanismo de relógio, pólvora e vapor costumam ocupar bem mais espaço na imaginação pública do que seus números sugeririam.\n\nAo fazer um ataque ou ativar uma habilidade concedida por um dispositivo mecânico mal conservado ou de construção tosca, o engenheiro deve tentar um teste simples CD 5 depois do teste de ataque ou de perícia relevante. Em falha, a ação é perdida e o dispositivo falha de forma espetacular (role na tabela Falhas de Dispositivo). Uma falha de dispositivo não afeta o tempo que precisa passar antes que algumas habilidades possam ser usadas de novo.\n\n**Falhas de Dispositivo**\n\n**d6** **Efeito**\n**1 Fiasco** O dispositivo trava ou dá curto. Se a ação que disparou era um ataque, ele se torna retroativamente uma falha crítica. O engenheiro precisa usar uma ação Interagir para reiniciar o dispositivo antes de usá-lo de novo.\n**2 Contragolpe** O dispositivo explode com violência, desabilitando-o e causando 1d6 de dano de concussão para cada 2 níveis do engenheiro numa explosão de 1,5 m centrada no dispositivo. O dispositivo fica quebrado até o engenheiro Repará-lo.\n**3 Fora do alvo** Se a ação que disparou era um ataque direcionado, o ataque mira outra criatura (que não o engenheiro) a até 3 m do alvo pretendido, determinada aleatoriamente pelo Mestre. Se não houver tal alvo, o ataque erra.\n**4 Reinício de sistema** Um estouro de retorno desliga por um instante todos os dispositivos do engenheiro. Ele não pode usar ataques nem habilidades concedidos por qualquer dispositivo de engenharia pessoal, potencialmente incluindo deslocamentos, até o início do próximo turno.\n**5 Superaquecimento** O dispositivo sobrecarregado gera uma onda de calor intenso. O dispositivo queima o engenheiro por 4d6 de dano de fogo e 2d4 de dano persistente de fogo, com uma salvaguarda básica de Reflexos. A CD é igual à CD de Fortitude do engenheiro. O engenheiro pode Soltar o item antes de rolar para melhorar o grau de sucesso da salvaguarda em um passo.\n**6 Reação atrasada** O dispositivo não funciona, sem efeito aparente. No início do próximo turno do engenheiro, o dispositivo ativa automaticamente. O Mestre escolhe qualquer alvo ou área aleatoriamente.",
    sections: [
      {
        id: "brigh",
        title: "Brigh",
        body: "Em Golarion, ciência e magia convivem, e muitos engenheiros cultuam Brigh, a divindade de mecanismo de relógio, invenção e tempo. Costuma ser invocada quando um inventor precisa de inspiração ou está no prazo e precisa que as próximas horas passem mais devagar. Muitas vezes, engenheiros gravam ícones pequenos do símbolo religioso de Brigh — uma máscara à semelhança dela.",
      },
      {
        id: "crossover-ancestry-npcs",
        title: "NPCs de ancestralidade cruzada",
        body: "Vários NPCs de outras partes do NPC Core encaixam bem neste grupo: sucateiro goblin (nível 4), armadilheiro kobold (nível 2).",
      },
      {
        id: "firearms",
        title: "Armas de fogo",
        body: "Vários engenheiros usam armas de fogo, tecnologia relativamente rara em Golarion. São armas incomuns, simples e marciais, então muitos personagens jogadores podem usá-las. Se quiser evitar colocá-las nas mãos dos PJs, troque as armas de fogo por bestas ou armas semelhantes. Mais armas de fogo e a classe pistoleiro aparecem em _Pathfinder Guns & Gears_.",
      },
      {
        id: "gadgets-for-pcs",
        title: "Engenhocas para PJs",
        body: "Como engenheiros costumam carregar engenhocas únicas, seus personagens jogadores provavelmente vão querer salvaguardar e reutilizar esses itens. Se quiser isso no jogo, deixe-os usar os itens basicamente como escritos ou converta-os em engenhocas consumíveis. Em qualquer caso, esses itens costumam ser instáveis quando recuperados: usáveis uma a poucas vezes, ou sujeitos a falhas de disparo.",
      },
      {
        id: "mechanical-allies",
        title: "Aliados mecânicos",
        body: "Muitas vezes, engenheiros andam acompanhados de criaturas mecânicas de criação própria, como cães de mecanismo de relógio ou pássaros mecânicos. Para montar encontros com essas criaturas, adapte um construto existente (como um objeto animado) ou mude o traço de um animal para construto e dê imunidade a sangramento, efeitos de morte, doença, condenado, drenado, fatigado, cura, ataques não letais, paralisado, veneno, enjoado, espírito, inconsciente, vitalidade e vazio. Você pode reduzir um pouco os PV para compensar.",
      },
      {
        id: "misfires",
        title: "Falhas de disparo",
        body: "Armas de fogo mal conservadas ou submetidas a esforço incomum podem falhar. Se uma criatura tenta disparar uma arma de fogo que foi disparada no dia anterior ou antes e não foi limpa desde então, ela rola um teste simples CD 5 antes do teste de ataque. Se falhar neste teste de falha, a arma trava. O ataque é uma falha crítica automática, e a criatura precisa usar uma ação Interagir para destravar antes de recarregar e disparar de novo. Depois que uma criatura passou pelo menos uma hora limpando a arma, ninguém precisa rolar falha para aquela arma até o dia seguinte, a menos que um efeito diga o contrário.",
      },
    ],
  }),
  fam({
    id: 'family-explorer',
    name: "Explorador",
    originalName: "Explorer",
    trait: null,
    sourcePage: 52,
    source: 'NPC Core',
    aonUrl: "https://2e.aonprd.com/MonsterFamilies.aspx?ID=537",
    intro:
      "Exploradores em geral estão bem equipados e bem treinados para qualquer tipo de perigo e ansiosos para levar outros ao ermo.",
    sections: [
      {
        id: "crossover-ancestry-npcs",
        title: "NPCs de ancestralidade cruzada",
        body: "Vários NPCs de outras partes do NPC Core encaixam bem neste grupo: sobrevivente bleachling (nível 2), guarda-caça orc (nível 4), camuflador tripkee (nível 2), batedor tripkee (nível 1), batedores da floresta (nível 8).",
      },
      {
        id: "famed-forests",
        title: "Florestas famosas",
        body: "A **Floresta Verduran** é o maior bosque do continente de Avistão; druidas e rangers da Loge do Bosque Selvagem conquistaram grande autonomia para a floresta com um tratado de mil anos. A **Floresta dos Espíritos** se estende por mais de mil milhas de Tian Xia e é o berço primordial dos espíritos da natureza conhecidos como kami. A **Mata Presa**, em Nirmathas e nas Terras de Cascalho, abriga Crystalhurst, uma aldeia de druidas que lutou contra o terrível Flagelo Sombrio que devastou a corte feérica de 7.000 anos que outrora guardava o bosque. A **Floresta Fierani** cobre a maior parte da nação élfica de Kyonin.",
      },
      {
        id: "foraging-for-fun-and-fortune",
        title: "Forragear por diversão e fortuna",
        body: "Para alguns, a variedade é o tempero da vida — desde que você tenha certeza da planta que acabou de colher. Em vez de tesouro fabricado num cenário natural, o Mestre pode permitir que certas ervas, flores e vegetais descobertos no ermo funcionem como elixires alquímicos de 1º nível. Por exemplo, as flores brancas conhecidas como copos-de-fada têm sabor picante quando mordiscadas, concedendo os benefícios de um elixir da chita menor. Um feijão-longo nutritivo restaura a saúde como um elixir da vida mínimo. Esses itens forrageados duram só 24 horas depois de colhidos e não podem ser vendidos.",
      },
      {
        id: "knowledge-exploration",
        title: "Exploração do conhecimento",
        body: "Embora Sobrevivência e Natureza sejam perícias cruciais para qualquer explorador, vários Saberes também se mostram úteis para qualquer NPC aventureiro no ermo e podem ser trocados com facilidade para deixar o conjunto de perícias mais adequado.\n\nSaber de Arquitetura\nSaber de Engenharia\nSaber de Pesca\nSaber de Herborismo\nSaber de Caça\nSaber de Mineração\nSaber de Navegação\nSaber de Patrulha",
      },
      {
        id: "tips-from-the-guide",
        title: "Dicas do guia",
        body: "Para a atividade de exploração Seguir o Perito, um explorador é considerado perito dos níveis 1–6, mestre dos níveis 7–14 e lendário do 15 em diante. Você pode permitir que PJs que Sigam o Perito liderados por um explorador continuem a somar o próprio nível ao teste de perícia por algum tempo depois: 1 hora se o explorador for perito, 1 dia se for mestre, ou 1 semana se for lendário. Um personagem só pode ter esse benefício para uma perícia por vez.",
      },
    ],
  }),
  fam({
    id: 'family-healer',
    name: "Curandeiro",
    originalName: "Healer",
    trait: null,
    sourcePage: 60,
    source: 'NPC Core',
    aonUrl: "https://2e.aonprd.com/MonsterFamilies.aspx?ID=538",
    intro:
      "O mundo é um lugar perigoso. Felizmente, há quem dedique a vida a aliviar a dor e o sofrimento dos outros.",
    sections: [
      {
        id: "ailments",
        title: "Aflições",
        body: "Doenças comuns podem ser encontradas aqui. A maioria dos curandeiros consegue tratá-las, embora possam ter impactos fisiológicos de prazo mais longo. Para condições incomuns, como febre de bogwid ou podridão zumbi, você pode impor penalidades a um curandeiro comum que tente remediá-las.",
      },
      {
        id: "alchemical-reputation",
        title: "Reputação alquímica",
        body: "Ganhar a confiança dos clientes costuma ser a parte mais difícil do ofício de qualquer alquimista bem-intencionado. Elixires muitas vezes carregam estigma por causa da natureza ampla e potencialmente duvidosa das concocções alquímicas. Alquimistas voltados à medicina costumam construir reputação local favorável, o que pode chamar a atenção de empregadores no governo próximo. Isso vai de tarefas simples como preparar elixires diários para a guarda da cidade a ajudar aventureiros autônomos da região.",
      },
      {
        id: "hunting-for-healing",
        title: "Caçar para curar",
        body: "Curandeiros que não usam magia estão sempre à caça de ingredientes. NPCs como o boticário, o herborista local e o mercador de tônicos podem contratar os PJs para coletar ingredientes raros que ouviram ter propriedades alquímicas latentes. Essa missão pode envolver viajar a uma área inóspita para coletar plantas, fungos ou minerais. Ou exigir rastrear e abater ou capturar uma criatura cujos órgãos produzam ingredientes úteis na cura.",
      },
      {
        id: "medical-service-prices",
        title: "Preços de serviço médico",
        body: "O médico e o cirurgião são mestres em Medicina; o boticário e o médico da peste são peritos. Médicos da peste cobram cinco vezes esta tarifa, e cirurgiões 10 vezes. **Identificar Aflição**: 1 pp **Tratar Ferimentos**: 2 pp **Tratar Doença**: 1 po **Primeiros Socorros ou Tratar um Veneno**: 1 pp",
      },
    ],
  }),
  fam({
    id: 'family-laborer',
    name: "Trabalhador",
    originalName: "Laborer",
    trait: null,
    sourcePage: 66,
    source: 'NPC Core',
    aonUrl: "https://2e.aonprd.com/MonsterFamilies.aspx?ID=539",
    intro:
      "A sociedade se constrói nas costas dos trabalhadores.",
    sections: [
      {
        id: "bar-fight",
        title: "Briga de bar!",
        body: "Brigas de bar funcionam melhor sem grade. Use as fichas daqui ou da seção Oprimido para participantes notáveis. A maioria luta de forma não letal com punhos ou armas improvisadas. Role um ou dois ataques no fim de cada rodada contra cada PJ na briga (modificador de ataque +4, 1d4+2 de dano de concussão). Lutadores particularmente ébrios podem ficar Desprotegidos e receber +1 de bônus de item em salvaguardas contra efeitos de medo.",
      },
      {
        id: "crossover-ancestry-npcs",
        title: "NPCs de ancestralidade cruzada",
        body: "Vários NPCs de outras partes do NPC Core encaixam bem neste grupo: agricultor orc (nível 1), jardineiro leshy-raiz (nível –1), mensageiro leshy-bola-de-feno (nível 3).",
      },
      {
        id: "dreams-of-adventure",
        title: "Sonhos de aventura",
        body: "Alguns trabalhadores sonham com uma vida longe do ofício mundano. A maioria desses sonhos é de nobreza ou riquezas fáceis e fantasiosas; outros desejam aventura, viagem e magia. Escutam com avidez aventureiros de visita e até pedem para se juntar a uma jornada. Os particularmente tolos podem não aceitar um não e desafiar o aventureiro ou se esgueirar junto quando o grupo parte.",
      },
      {
        id: "laborer-games",
        title: "Jogos de trabalhador",
        body: "Trabalhadores tendem a jogar quando o serviço está parado ou na pausa. Jogos comuns incluem Fileira de Gremlin, que envolve rolar dados e tentar combiná-los, e Pescar com Fogo, em que os jogadores tentam reunir todas as cartas de um tipo do baralho sem perder as próprias e “queimar”.",
      },
      {
        id: "silver-linings",
        title: "Lado bom",
        body: "Trabalhadores têm empregos difíceis e jornadas longas. O serviço em si não é glamouroso, e o pagamento não é grande. Mesmo assim, alguns encontram prazer no que fazem. Olham o ofício e veem aventura no dia a dia. Contentam-se em prestar serviços essenciais, ajudar a salvar vidas, viajar, conhecer gente interessante ou até enfrentar a ferocidade da natureza. Embora o trabalho possa ser sem brilho, as vantagens podem ser ótimas!",
      },
      {
        id: "tap-list",
        title: "Carta de bebidas",
        body: "**Cerveja**: cerveja andorena, bock Cabeça-de-Rocha, stout Escavador Alegre, Fantasmas Líquidos, ale Luglurch, lager Thileu. **Cidra e hidromel**: cidra de raiz-dura, cidra qadirana, hidromel da Cervejaria Dois Cavaleiros, hidromel de baga-vinho. **Vinho**: vinho-do-gelo de Irrisen, sarain, syrinelle, vinho da Abadia Rosa-Branca. **Destilados**: gota de Daggermark, uísque soco-de-dragão, Velho Erebo, vjarik.",
      },
    ],
  }),
  fam({
    id: 'family-martial-artist',
    name: "Artista marcial",
    originalName: "Martial Artist",
    trait: null,
    sourcePage: 72,
    source: 'NPC Core',
    aonUrl: "https://2e.aonprd.com/MonsterFamilies.aspx?ID=540",
    intro:
      "Artistas marciais se esforçam para dominar a arte da luta corpo a corpo.\n\nRaramente têm o mesmo repertório. Para variar, use a tabela a seguir para ajustar as estatísticas de um NPC:\n\n**NPC** **Habilidade** **Trocar por**\nEstudante marcial — Jogo de pés elegante — Hi-yah!\nCombatente de torneio — Trabalhar a plateia — Provocação competitiva\nLutador de artes mistas — Qualquer opção de Troca de Postura — Postura de finta constante\nFaixa-preta — Contra-ataque bloqueador — Chute lateral defensivo\nGrão-mestre — Soco de um milímetro — Portão Flamejante\n\n**Portão Flamejante** (eletricidade) **Requisitos** O grão-mestre tem um alvo agarrado ou imobilizado; **Efeito** O grão-mestre arremessa o alvo para cima e o eletrocuta com um golpe de palmas duplas infundido de qi na descida. O alvo fica Caído, perde a condição agarrado ou imobilizado e sofre 5d6 de dano de concussão e 2d8 de dano persistente de eletricidade (salvaguarda básica de Fortitude CD 38).\n\n**Provocação competitiva** (emoção, medo, mental) O combatente de torneio tenta Desmoralizar um alvo. Em sucesso, a criatura desmoralizada fica Desprotegida até o fim do próximo turno dela. O combatente recebe +2 de bônus de circunstância no dano contra uma criatura deixada Desprotegida deste modo.\n\n**Postura de finta constante** Esta opção de postura substitui uma opção diferente de Troca de Postura (em geral Postura de Agarrão Seguro). +2 em tentativas de Fintar. Se o lutador de artes mistas rolar uma falha crítica para Fintar, obtém uma falha em vez disso. Se Fintar com sucesso, pode usar Troca de Postura como ação livre. Ao contrário de outras posturas, nesta o lutador não pode fazer Golpes.\n\n**Chute lateral defensivo** **Gatilho** Uma criatura no alcance do faixa-preta usa uma ação de movimento; **Efeito** O faixa-preta faz um Golpe de punho pensado para interceptar e criar distância. Este Golpe não conta para a penalidade de ataques múltiplos do faixa-preta, e essa penalidade não se aplica a este Golpe. Num acerto, o alvo é empurrado 1,5 m para longe.\n\n**Kiai!** **Frequência** 1 vez por turno; **Requisitos** O estudante marcial tenta um Golpe; **Efeito** O estudante grita para sobressaltar o adversário. Se o Golpe for bem-sucedido, o alvo fica Amedrontado 1.\n\nÀs vezes não vale a pena lutar limpo. Você pode dar uma destas táticas sujas a qualquer NPC artista marcial. Combatentes de torneio são especialmente propensos a buscar uma vantagem que lhes dê a vitória; a maioria dos faixas-pretas e grão-mestres dificilmente se rebaixa a essa trapaça.\n\n**Espinhos ocultos** **Gatilho** O artista marcial obtém sucesso crítico num Golpe desarmado; **Efeito** Espinhos minúsculos nas luvas ou no calçado causam 1d6 extra de dano persistente de sangramento.\n\n**Substância contrabandeada** O artista marcial saca um frasco alquímico oculto de mutagênico e o bebe para melhorar o desempenho em combate. O item em geral é um mutagênico de colosso ou de mercúrio. Esta habilidade não pode ser usada de novo até o artista marcial ter tempo de adquirir e esconder um mutagênico novo. Alguns usam frascos pequenos ocultos; outros escondem uma seringa ou embebam o líquido alquímico numa peça de roupa que possam pôr na boca.\n\n**Mordida ilegal** O artista marcial faz um teste de Atletismo contra a CD de Fortitude do alvo para mordê-lo numa área vulnerável. Em sucesso, causa 2d6 de dano perfurante (ou o dobro em sucesso crítico).\n\n**Areia no olho** (visual) O artista marcial Finta. Em sucesso, joga areia no rosto de um alvo, deixando-o Cego por 1 rodada ou até o alvo Interagir para remover a condição Cego.\n\nGrão-mestres estudam técnicas banidas pela tendência a mutilar tanto o usuário quanto a vítima. Se a Palma Proibida não combina com o estilo do seu grão-mestre, troque-a por um dos golpes a seguir — se tiver coragem.\n\n**Aura de queima vital** (aura, força) O grão-mestre transmuta a própria expectativa de vida numa expulsão de qi. Pelo próximo minuto, fica cercado por uma emanação de 9 m que causa 3d6 de dano de força a todas as criaturas que começarem o turno na emanação, inclusive o próprio grão-mestre. Enquanto a Aura de queima vital estiver ativa, os Golpes de punho do grão-mestre causam 2 dados extras de dano de arma. Quando a aura desaparece, o grão-mestre fica permanentemente Condenado 1. Esta condição é cumulativa.\n\n**Surto solar** (visual) O grão-mestre libera uma onda de qi tão brilhante quanto o sol. Todas as criaturas num raio de 15 m do grão-mestre que possam ver devem tentar uma salvaguarda de Reflexos CD 38, inclusive o próprio grão-mestre. **Sucesso crítico** A criatura fica Ofuscada por 1 rodada. **Sucesso** A criatura fica Cega por 1 rodada. **Falha** A criatura fica Cega por 1 dia. **Falha crítica** A criatura fica Cega permanentemente.\n\n**Super explosão de qi** (força, forma de magia, polimorfia) O corpo do grão-mestre se expande ao se preparar para exudar uma quantidade inimaginável de qi. Se a próxima ação do grão-mestre for conjurar a versão de 2 ações de _explosão de qi_, o tamanho do cone aumenta para 36 m e o dano sobe para 16d6. O grão-mestre também fica uma categoria de tamanho maior pelo próximo minuto, causando +9 de dano extra com os Golpes corpo a corpo. Além disso, fica permanentemente Drenado 1. Esta condição Drenado é cumulativa.",
    sections: [
      {
        id: "crossover-ancestry-npcs",
        title: "NPCs de ancestralidade cruzada",
        body: "Vários NPCs de outras partes do NPC Core encaixam bem neste grupo: mestre veterano orc (nível 10).",
      },
      {
        id: "fists-of-the-ruby-phoenix",
        title: "Punhos da Fênix Rubra",
        body: "De todos os certames de luta de Golarion, o mais notável é o Torneio da Fênix Rubra, realizado a cada década ao largo da costa de Goka. O torneio é orquestrado pela maga lendária Hao Jin e atrai incontáveis atletas, com os vencedores premiados com relíquias poderosas além da imaginação. A história do torneio mais recente está na Adventure Path Punhos da Fênix Rubra.",
      },
      {
        id: "life-s-energy",
        title: "Energia da vida",
        body: "Qi é muito mais do que um meio de complementar ataques — é uma energia que todas as entidades vivas possuem, e artistas marciais apenas são experientes em manifestá-la de formas ofensivas. Além do combate, o qi é amplamente usado na medicina de Tian Xia, sobretudo entre curandeiros que cultuam a divindade Qi Zhong.",
      },
      {
        id: "versus-a-gauntlet",
        title: "Contra uma luva",
        body: "Numa luta contra um dojo ou uma ordem monástica inteira, reserve fichas de artista marcial de níveis semelhantes aos dos PJs para os antagonistas mais fortes. Salpique a cena com combatentes mais fracos, com CA e salvaguardas baixas, poucos Pontos de Vida e Deslocamento de 7,5 m. Cada um desses inimigos usa as ações para flanquear os PJs e tentar Golpes de punho com modificador de acerto baixo que causam dano baixo. Quando os números começam a minguar, eles fogem.",
      },
    ],
  }),
  fam({
    id: 'family-maverick',
    name: "Independente",
    originalName: "Maverick",
    trait: null,
    sourcePage: 76,
    source: 'NPC Core',
    aonUrl: "https://2e.aonprd.com/MonsterFamilies.aspx?ID=541",
    intro:
      "Esses lobos solitários têm uma aura de mistério, bravata e desenvoltura.",
    sections: [
      {
        id: "crossover-ancestry-npcs",
        title: "NPCs de ancestralidade cruzada",
        body: "Vários NPCs de outras partes do NPC Core encaixam bem neste grupo: bando-de-bico (nível 5), companheiro de jogo (nível 3), gangue pega-pega goblin (nível 5).",
      },
      {
        id: "draw",
        title: "Saquem!",
        body: "Vários independentes carregam as armas à distância explosivas chamadas armas de fogo. Muitos destes NPCs podem ser adaptados a outras armas à distância, como bestas ou arcos, com mudanças mínimas se você optar por não incluir armas de fogo no jogo. Mais armas de fogo e a classe pistoleiro aparecem em _Pathfinder Guns & Gears_.",
      },
      {
        id: "dueling-etiquette",
        title: "Etiqueta de duelo",
        body: "Alguns independentes se encontram para se avaliar antes de decidir se duelam. Então, se decidirem se desafiar, as regras do confronto (ou a falta delas) são combinadas de antemão para evitar mágoa depois. Ser mau perdedor é muito malvisto, até mais do que um duelo até a morte.",
      },
      {
        id: "familiar-firearms",
        title: "Armas de fogo familiares",
        body: "Muitos bruxos de arma empunham armas que são ao mesmo tempo armas de fogo e armas ou implementos mágicos de alguma forma, o que serve no lugar do familiar de um bruxo comum. Como a maioria dos bruxos de arma — raros como são — fabrica o próprio armamento, especula-se que o patrono seja quem fornece os projetos da sofisticada arma de fogo mágica.",
      },
      {
        id: "mavericks-and-duels",
        title: "Independentes e duelos",
        body: "Independentes tendem a pular num duelo num estalar de dedos, prontos para um teste verdadeiro de intuição e reflexos. Um encontro de duelo usa o subsistema de duelos. Um duelista inigualável é de fato excepcional (e já tem todas as ações de duelo usadas no subsistema graças às perícias). Se quiser que outro NPC tenha mais opções em duelos, você pode trocar uma das perícias existentes por Enganação ou Intimidação.",
      },
    ],
  }),
  fam({
    id: 'family-mercenary',
    name: "Mercenário",
    originalName: "Mercenary",
    trait: null,
    sourcePage: 82,
    source: 'NPC Core',
    aonUrl: "https://2e.aonprd.com/MonsterFamilies.aspx?ID=542",
    intro:
      "Seja para travar guerra, proteger uma caravana ou infiltrar uma fortaleza impenetrável, há trabalho de sobra para mercenários em todo Golarion.",
    sections: [
      {
        id: "crossover-ancestry-npcs",
        title: "NPCs de ancestralidade cruzada",
        body: "Vários NPCs de outras partes do NPC Core encaixam bem neste grupo: catador de ossos (nível 0), batedor kholo (nível 7), pragmático kholo (nível 1), corcel sortudo (nível 8), víbora de túnel (nível 1).",
      },
      {
        id: "group-decisions",
        title: "Decisões em grupo",
        body: "Em qualquer grupo grande de mercenários, torna-se extremamente importante decidir quais clientes aceitar. Embora algumas bandas tenham hierarquia rígida com um líder designado no comando, as bandas costumam ser bem mais democráticas. Na maioria, um voto de maioria simples determina se uma oferta é aceita ou recusada. Outros grupos ficam no meio-termo, usando eleição democrática para escolher um líder individual ou um conselho pequeno para fechar acordos em nome de todos.",
      },
      {
        id: "joining-up",
        title: "Entrar na banda",
        body: "Bandas mercenárias diferentes têm exigências diferentes para candidatos. Saber lutar é só o começo. Bandas com reputação mais honrada exigem entrevistas rigorosas, juramentos de sangue e até verificação de antecedentes, enquanto bandas de reputação mais duvidosa aceitam um lutador hábil sem fazer perguntas. De vez em quando, as bandas tendem a se formar por linhas de ancestralidade. Orcs, hobgoblins e anões todos têm bandas mercenárias lendárias percorrendo a região do Mar Interior, mas quase todas aceitam um recruta que não seja da ancestralidade delas se as habilidades valerem a pena.",
      },
      {
        id: "mercenary-banter",
        title: "Jargão mercenário",
        body: "Eis um vocabulário comum entre mercenários.\n\n**Arrombador**: alguém hábil em quebrar fechaduras ou cofres. **Mergulho**: furto ou contrabando abaixo do solo, muitas vezes por túneis. **Raposear**: fingir que está dormindo, em geral para uma emboscada. **Médico**: um curandeiro. **Aríete**: um guerreiro de impacto. **Fundeiro**: um conjurador. **Balanço da moeda**: jurar lealdade a quem paga mais. **Linha d'água**: o dinheiro da companhia mercenária: “Aproveitem a cidade enquanto a linha d'água está alta, pessoal.” **Sussurrante**: quem consegue se mover furtivamente.",
      },
    ],
  }),
  fam({
    id: 'family-military',
    name: "Militar",
    originalName: "Military",
    trait: null,
    sourcePage: 88,
    source: 'NPC Core',
    aonUrl: "https://2e.aonprd.com/MonsterFamilies.aspx?ID=543",
    intro:
      "Um exército serve para defender e lutar em nome de nações e pode ser treinado e destacado de várias formas.\n\nA maioria dos combates militares ocorre em áreas amplas, como planícies ou cidades, onde há mais território ou recursos a ganhar. Porém, unidades de guerrilha lutam em florestas, pântanos e outros lugares difíceis, onde armam armadilhas, emboscadas e outras táticas de surpresa. Você pode usar estes ajustes para transformar um NPC ou uma tropa militar em guerrilha. Também servem para mercenários ou outros NPCs não militares.\nDê à criatura um modificador de Furtividade igual ao valor alto de perícia do nível dela. Se estiver com pressa, use o maior modificador de perícia da criatura. Se a criatura tiver a perícia Atletismo, reduza o modificador em 2. Reduza o dano dos Golpes da criatura em 2, mas dê a habilidade Ataque Furtivo. **Ataque Furtivo** A criatura causa 1d6 de dano de precisão extra a criaturas Desprotegidas. Adicione a habilidade Bote. **Bote** A criatura Avança e faz um Golpe no fim desse movimento. Se começou esta ação escondida, permanece escondida até depois do Golpe desta habilidade.\n\nA batalha pode ser um assunto complicado. Situações diferentes pedem arranjos variados de soldados. Você pode adicionar a habilidade Trocar Formação a uma tropa para dar mais opções, em geral escolhendo duas ou três das formações listadas aqui. Tropas com Inteligência animal (–4 ou menor) ou que não sejam treinadas para combate em geral não conseguem trocar de formação sem uma força externa comandando-as.\n\n**Trocar Formação** (concentrar, movimento) A tropa se reconfigura para assumir uma das formações abaixo que conheça. Usar esta ação de novo encerra qualquer formação anterior, e a tropa também pode usar esta ação para voltar à formação padrão, encerrando quaisquer benefícios e desvantagens.\n**Aberta** Os membros da tropa se espalham para cobrir mais terreno. **Benefício** Quaisquer fraquezas que a tropa tenha a dano em área e respingo são suprimidas. **Desvantagem** Salvaguardas inimigas contra os efeitos danosos da tropa saem um grau de sucesso melhor do que o rolado. **Coluna de marcha** Esta formação percorre longas distâncias com mais rapidez. **Benefício** A tropa recebe +3 m de bônus de circunstância em todos os Deslocamentos. **Desvantagem** A tropa fica Desprotegida e sofre –2 de penalidade em salvaguardas de Reflexos. **Casco de tartaruga** A tropa entrelaça os escudos. Só um grupo com escudos pode usar esta formação. **Benefício** A tropa recebe +2 de bônus de circunstância à CA contra ataques à distância e a salvaguardas de Reflexos. **Desvantagem** A tropa sofre –3 m de penalidade em todos os Deslocamentos. **Cunha** A tropa se alinha atrás de um comandante poderoso. **Benefício** A tropa escolhe uma criatura aliada adjacente sem o traço tropa para seguir. Cada vez que a criatura escolhida Avança, a tropa segue como ação livre, Avançando para manter a criatura escolhida adjacente. **Desvantagem** A tropa perde parte da autonomia. Fica Lenta 1 e não pode se afastar voluntariamente do líder.",
    sections: [
      {
        id: "crossover-ancestry-npcs",
        title: "NPCs de ancestralidade cruzada",
        body: "Vários NPCs de outras partes do NPC Core encaixam bem neste grupo: multidão de leshys-milho (nível 4), guerreiro mata-demônios (nível 5), batalhão anão (nível 6), general anão (nível 8), batalhão hobgoblin (nível 5), quebra-magias hobgoblin (nível 3), vanguarda hobgoblin (nível 8), esmaga-crânios orcs (nível 7).",
      },
      {
        id: "military-nomenclature",
        title: "Nomenclatura militar",
        body: "Culturas diferentes veem a guerra de formas diferentes. Algumas a veem como um jogo a ser vencido, outras como uma arte, e outras ainda como a forma máxima de glória. Essas perspectivas podem se refletir nos nomes usados para descrever unidades e formações militares. Alguns exércitos vão a extremos elaborados para enganar os inimigos, conferindo nomes-código sempre mutáveis a divisões e estratégias. Outros podem tomar emprestados os nomes de animais belos ou simplesmente batizar unidades com armas prediletas.",
      },
      {
        id: "mounted-warfare",
        title: "Guerra montada",
        body: "NPCs militares individuais que se vejam em terreno aberto talvez precisem fechar a distância até os oponentes. Considere dar a um NPC como o porta-estandarte ou o franco-atirador um cavalo de guerra, ou fazer o sargento instrutor ou o cavaleiro mago montar um cavalo de guerra veterano.",
      },
      {
        id: "signature-weapons",
        title: "Armas características",
        body: "Formações de falange classicamente usam a lança como arma de escolha. Porém, sinta-se livre para trocar esta arma por algo mais adequado à cultura local. Por exemplo, uma falange composta de cultuadores de Gozreh pode empunhar tridentes em vez de lanças.",
      },
      {
        id: "spoils-of-war",
        title: "Espólios de guerra",
        body: "A guerra raramente é um empreendimento lucrativo para qualquer dos lados. Cada batalha conquista pouco mais do que uma posição estratégica melhor e, potencialmente, glória. Ocasionalmente, um inimigo particularmente potente pode ter algum equipamento mágico, mas a maioria dos soldados não tem. Um grupo de aventureiros deve buscar se valer do exército pelo qual luta, pois é ali que em geral encontram as maiores recompensas, tanto em ouro quanto em favores.",
      },
      {
        id: "troop-gear",
        title: "Equipamento de tropa",
        body: "Como os membros componentes de uma tropa são individualmente bem menos poderosos do que a tropa como um todo, o equipamento de uma tropa em geral tem utilidade ou valor desprezível. Porém, a brigada de cavalaria dos Cavaleiros Infernais veste valiosa placa dos Cavaleiros Infernais (vale 35 po), e um grupo talvez consiga salvaguardar uma ou duas peças dos inimigos derrotados — se estiver disposto a arriscar a ira da Ordem do Prego!",
      },
    ],
  }),
  fam({
    id: 'family-mystic',
    name: "Místico",
    originalName: "Mystic",
    trait: null,
    sourcePage: 96,
    source: 'NPC Core',
    aonUrl: "https://2e.aonprd.com/MonsterFamilies.aspx?ID=544",
    intro:
      "Segredos ocultos e poderes ocultistas têm um atrativo irresistível para muitos. Como a maioria destes NPCs é de conjuradores, considere usar listas de magias alternativas para ajustar os temas.",
    sections: [
      {
        id: "crossover-ancestry-npcs",
        title: "NPCs de ancestralidade cruzada",
        body: "Vários NPCs de outras partes do NPC Core encaixam bem neste grupo: mãe dos ossos (nível 6), bruxa leshy-cabaça (nível 6), guardião de infiéis tripkee (nível 7).",
      },
      {
        id: "guests-beware",
        title: "Hóspedes, cuidado",
        body: "A maioria das criaturas inteligentes segue costumes básicos de hospitalidade, como não atacar um hóspede que jantou sob o teto delas. Até a criatura feérica mais sinistra reluta em quebrar tais costumes, embora refeições com os feéricos muitas vezes tragam perigos próprios. Outros têm menos escrúpulos e podem empregar venenos, maldições ou poções como tempero para jantares desavisados.",
      },
      {
        id: "mystic-protection",
        title: "Proteção mística",
        body: "A maioria dos místicos não é particularmente hábil em combate e pode contratar ou encantar guarda-costas, como o guarda-costas (nível 1), sentinela arqueira (nível 2), mosqueteiro (nível 3), combatente de torneio (nível 5), cavaleiro (nível 7) ou caçador de heróis (nível 13).",
      },
      {
        id: "mystic-rituals",
        title: "Rituais místicos",
        body: "Os seguintes rituais às vezes são conjurados por grupos místicos. Os do _Monster Core_ estão disponíveis apenas a celestiais e infiéis apropriados dentro das organizações.\n_mensageiro angelical_ (1º grau)\n_círculo de vinculação_ (6º grau)\n_chamar espírito_ (5º grau)\n_memórias coletivas_ (9º grau)\n_comungar_ (6º grau)\n_pacto demoníaco_ (1º grau)\n_pacto diabólico_ (1º grau)\n_servidor planar_ (5º grau)",
      },
      {
        id: "sinister-rituals",
        title: "Rituais sinistros",
        body: "A maioria dos rituais tem um custo simples em po e testes de perícia associados. Mas e se um NPC desesperado estiver disposto a oferecer algo mais macabro, como vidas, almas ou pior? Um ritual tão nefasto usa um ritual normal como base, mas as CDs e os requisitos de proficiência podem ser reduzidos ou dispensados por completo, assim como qualquer custo em po.",
      },
    ],
  }),
  fam({
    id: 'family-official',
    name: "Oficial",
    originalName: "Official",
    trait: null,
    sourcePage: 108,
    source: 'NPC Core',
    aonUrl: "https://2e.aonprd.com/MonsterFamilies.aspx?ID=545",
    intro:
      "Sociedades maiores dependem de quem tem autoridade e capacidade para interpretar e aplicar as leis. Alguns cumprem esses deveres com justiça, mas outros são duros e cruéis, impondo punições severas a quem não puder pagar por clemência.",
    sections: [
      {
        id: "at-your-service",
        title: "Às suas ordens",
        body: "Muitos oficiais podem conscrever outros para serviço em uma variedade de postos. Em geral são outros oficiais como guardas ou carcereiros, mas alguns NPCs de outras seções que podem ser conscritos incluem tropeiro, guia, mensageiro e rastreador. Em raras ocasiões, oficiais recebem alguma autoridade sobre NPCs militares. O mestre do porto também pode conscrever os serviços de um contramestre, estivador, navegador ou capitão de navio.",
      },
      {
        id: "crossover-ancestry-npcs",
        title: "NPCs de ancestralidade cruzada",
        body: "Vários NPCs de outras partes do NPC Core encaixam bem neste grupo: grande chefão goblin (nível 6), guarda da corte élfica (nível 13), guardião de ovos kobold (nível 3), voz do enxame (nível 3), guarda da maré (nível 4).",
      },
      {
        id: "delaying-tactics",
        title: "Táticas de atraso",
        body: "Um oficial pode transformar a burocracia em arma. Um juiz pode aplicar uma lei arcaica em geral ignorada, mas ainda em vigor. Um coletor de impostos pode pedir o selo de um lorde que está fora da região. O mestre do porto pode exigir todas as taxas em moeda local, plenamente ciente de que os cambistas não abrirão por dias.",
      },
      {
        id: "deploying-the-watch",
        title: "Despachar a vigília",
        body: "Se nenhum guarda estiver presente, leva pelo menos 1–2 rodadas para um civil achar um guarda que toque o apito de alarme. Se um guarda já estava no local, soaria o alarme imediatamente. Reforços em geral chegam 2–3 rodadas depois.",
      },
      {
        id: "deputized-adventuring",
        title: "Aventura com nomeação",
        body: "Oficiais da vigília muitas vezes precisam de ajuda especializada para resolver casos criminais difíceis ou rastrear fugitivos que escaparam à captura. Aventureiros contratados como consultores em geral são nomeados, recebendo autoridade legal temporária comparável à de condestáveis. Podem prender suspeitos com humanidade, realizar buscas e interrogatórios razoáveis, e confiscar e devolver bens roubados. Oficiais corruptos podem nomear em troca de um suborno substancial se as ações forem plausivelmente defensáveis.",
      },
      {
        id: "guard-patrols",
        title: "Patrulhas da guarda",
        body: "Áreas de alta segurança, muralhas da cidade e ruas principais tendem a ter patrulhas regulares da guarda, tanto de hora em hora quanto noturnas. Essas patrulhas em geral fazem pausas regulares em portões, castelos, postos da guarda, cadeias, portos ou torres de vigia. Outras áreas sob jurisdição da vigília tendem a receber visitas esporádicas, às vezes só quando um alarme é soado.",
      },
      {
        id: "intelligence-networks",
        title: "Redes de inteligência",
        body: "Governos complexos dependem de burocracias e sistemas confiáveis de mensageiros para monitorar territórios expansivos, enviar ordens e decretar determinações em larga escala. A maioria dos governos usa formalmente oficiais convencionais para executar as políticas, mas redes secretas ou extraoficiais de agentes mais confiáveis tratam de assuntos mais sensíveis. Também farejam corrupção e dissidência entre os oficiais regulares.",
      },
      {
        id: "jailbreak",
        title: "Fuga da cadeia!",
        body: "Se um PJ ou aliado for preso, o grupo pode tramar uma fuga. Para uma cadeia ou penitenciária complexa, isso pode exigir o uso do subsistema de infiltração. Com uma cadeia menor de vila ou cidade, de estrutura simples e equipe reduzida, pode bastar um pouco de força. A fuga pode ser só o começo, levando a mais aventura!",
      },
      {
        id: "making-bureaucracy-fun",
        title: "Tornar a burocracia divertida",
        body: "Esperar em filas e preencher formulários raramente é divertido na vida real, então como pode ser divertido no jogo? Mantenha as cenas andando e permita que todos participem. Descreva quanto os PJs esperam, mas nunca force os jogadores a esperar de verdade como os personagens. A frustração de preencher formulários ou falar com dezenas de escrivães em departamentos diferentes pode ser resumida ou entregue como pano de fundo. Além disso, se um teste não for necessário e não houver interpretação acontecendo, a cena pode simplesmente fazer parte desse pano de fundo, o que significa que, mesmo com os personagens no limite da paciência, os jogadores estão tão envolvidos quanto estariam em qualquer outro desafio social. Por fim, certifique-se de que cada PJ tenha alguma forma de contribuir.",
      },
      {
        id: "off-with-a-warning",
        title: "Só um aviso",
        body: "Oficiais muitas vezes podem ser convencidos a abandonar uma investigação menor ou tênue.\nPedido com uma história compassiva (CD padrão para infração civil, CD difícil para contravenção, CD muito difícil para delito menor improvável de ir a julgamento)\nExplicar circunstâncias suspeitas\nDar um suborno de cerca de um quarto a metade da multa\nInvocar um conflito de jurisdição (Sociedade com CD difícil do nível do oficial)\nInvocar um associado poderoso o bastante para dificultar a vida do oficial (Coagir, potencialmente Mentir)",
      },
      {
        id: "officer-ranks",
        title: "Postos de oficial",
        body: "Alguns postos na hierarquia das forças de segurança, do mais alto ao mais baixo, incluem grão-inquisidor, lorde condestável, inspetor-chefe, acusador/inquisidor real, xerife, capitão, inspetor, reeve/oficial de justiça, tenente, gendarme, sargento, cabo, condestável e deputado/vigiador. Esses títulos e estruturas variam muito entre povoados e culturas diferentes.",
      },
      {
        id: "unusual-misdemeanors",
        title: "Contravenções incomuns",
        body: "Alterar o tempo sem permissão\nDeixar de limpar depois de companheiros animais\nVoar dentro dos limites da cidade\nVender poções sem licença",
      },
    ],
  }),
  fam({
    id: 'family-performer',
    name: "Artista",
    originalName: "Performer",
    trait: null,
    sourcePage: 124,
    source: 'NPC Core',
    aonUrl: "https://2e.aonprd.com/MonsterFamilies.aspx?ID=546",
    intro:
      "Apresentações vêm numa ampla variedade de formas, de métodos musicais como canto e instrumentos a dança física e malabarismo, até simples oratória e conversa.",
    sections: [
      {
        id: "crossover-ancestry-npcs",
        title: "NPCs de ancestralidade cruzada",
        body: "Vários NPCs de outras partes do NPC Core encaixam bem neste grupo: fiandeiro de causos halfling (nível 7), mascarado iruxi (nível 9), ofuscador espetacular (nível 5).",
      },
      {
        id: "handheld-instruments",
        title: "Instrumentos de mão",
        body: "Instrumentos musicais variam em tamanho e função. Para inspirar o que um NPC músico pode tocar, escolha da lista a seguir: acordeão, gaita de foles, bodhrán, bongô, cabasa, castanhola, charango, sinos de vento, claves, cuíca, dan moi, didgeridoo, rabeca, flauta, gemshorn, gittern, guan, sino de mão, gaita, sanfona de roda, kalimba, kazoo, alaúde, lira, mandolim, maracas, ocarina, flauta de pã, flautim, saltério, flauta doce, sacabuxa, charamela, apito deslizante, colheres, pandeiro, trompete, triângulo, ukulele, viela ou zílios.",
      },
      {
        id: "let-s-see-a-show",
        title: "Vamos ver um espetáculo",
        body: "Preços de uma noite de entretenimento são por cabeça e podem ser bem mais altos para artistas de classe mundial.\n\n**Circo** 1 pp; **Dança** 2 pc social, 6 pc palco, 1 po baile da alta sociedade; **Ópera** 5 po entrada geral, 20 po camarote; **Música** 5 pc trovadores, 2 pp orquestra; **Peça teatral** 6 pc teatro pequeno, 1 pp teatro grande; **Apresentação de rua** gorjetas de 1–2 pc.",
      },
      {
        id: "performers-across-golarion",
        title: "Artistas por Golarion",
        body: "Algumas das estrelas mais brilhantes de Golarion são tanto fazedores de história quanto contadores de história.\n\n**Camilia Drannoch, revolucionária**: Camilia usa palavras poderosas para pôr fim à Revolução Vermelha, livrar Galt das _lâminas finais_ e restabelecer relações no exterior. **O Circo das Maravilhas Errantes**: talvez o espetáculo itinerante mais espetacular do Mar Interior, o Circo das Maravilhas Errantes e seu Sideshow das Maravilhas Cotidianas oferece números realmente extraordinários. **Janatimo, Orador dos Contos do Mundo**: Janatimo, um bardo aiuvarin na Magaambya, lidera os Uzunjati, eruditos e mestres encarregados de espalhar conhecimento para melhorar o mundo.",
      },
      {
        id: "the-colleges-of-humor",
        title: "Os colégios do humor",
        body: "Por Golarion há bolsões de bobos e gracejadores que formam grupos que chamam de colégios do humor. Embora não tenham nome formal nem sede, esses colégios são universalmente reconhecidos por produzir comédia excelente. Quem treina neles em geral se especializa numa das muitas formas de humor. Algumas das especializações mais comuns incluem, mas não se limitam a: palhaçada física, humor romântico, alta comédia, comédia de situação, paródia, surrealismo, farsa, trocadilho e humor observacional.",
      },
    ],
  }),
  fam({
    id: 'family-primalist',
    name: "Primordialista",
    originalName: "Primalist",
    trait: null,
    sourcePage: 132,
    source: 'NPC Core',
    aonUrl: "https://2e.aonprd.com/MonsterFamilies.aspx?ID=547",
    intro:
      "Um primordialista empunha energias e magia primordiais, às vezes ensinado por forças de poder primordial, inclusive elementais poderosos ou feéricos do Primeiro Mundo. Primordialistas protegem o mundo natural, oferecendo medicina forte a quem precisa enquanto enfrentam a suspeita de quem não entende seus modos.\n\nGrande parte dos primordialistas pertence a círculos drúidicos, e mesmo os que não são membros tendem a conhecer os mais proeminentes da terra natal.",
    sections: [
      {
        id: "crossover-ancestry-npcs",
        title: "NPCs de ancestralidade cruzada",
        body: "Vários NPCs de outras partes do NPC Core encaixam bem neste grupo: conservacionista gnomo (nível 6), mergulhador da terra kobold (nível 4).",
      },
      {
        id: "druid-groves",
        title: "Bosques de druida",
        body: "Quando escolhem se estabelecer num lugar, druidas famosamente habitam bosques de druida. Esses santuários misturam elementos de moradia, santuários rituais e o ambiente natural num todo coeso e harmônico. Flora e fauna formam a maioria dos elementos da maioria dos bosques, com só pequenas quantidades de construção, pois druidas prezam se encaixar no ambiente em vez de dobrá-lo para lhes servir. Um bosque pode ser um recesso pequeno lar de um druida solitário ou um bosquete supercrecido de árvores abrigando uma loja inteira.",
      },
      {
        id: "order-hierarchies",
        title: "Hierarquias de ordem",
        body: "Ordens da Fé Verde tendem a obedecer hierarquias rígidas, com nove “círculos” para ordens maiores e três ou cinco para ordens menores. Um membro novo se torna iniciado do primeiro círculo. Cada círculo ascendente guarda informação mais secreta e preciosa e tem menos membros que o círculo abaixo. Para subir, um druida precisa prestar serviço rumo aos objetivos da ordem e crescer em conhecimento e habilidade mágica. Se um círculo estiver cheio, um druida talvez precise conquistar a vaga desafiando um superior.",
      },
      {
        id: "speaking-wildsong",
        title: "Falar Canção Selvagem",
        body: "O idioma secreto falado entre druidas, chamado Canção Selvagem, soa mais como chamados de animais do que palavras faladas. Se estiver interpretando uma conversa entre druidas na mesa, você pode imitar um animal, ou até tocar trechos de sons de animais. Grande parte da Canção Selvagem se transmite por tom e associações com animais diferentes. A Canção Selvagem de um druida individual pode incorporar com mais frequência sons de animais prevalentes na região natal, formando uma espécie de dialeto ou sotaque.",
      },
    ],
  }),
  fam({
    id: 'family-scholar',
    name: "Erudito",
    originalName: "Scholar",
    trait: null,
    sourcePage: 138,
    source: 'NPC Core',
    aonUrl: "https://2e.aonprd.com/MonsterFamilies.aspx?ID=548",
    intro:
      "O verdadeiro poder vem do conhecimento — o poder de moldar o crescimento de reinos com meros sussurros, ficar três passos à frente dos adversários, ou até saber qual flora é melhor para criar venenos sem rastro.",
    sections: [
      {
        id: "academic-pranks",
        title: "Pegadinhas acadêmicas",
        body: "É tradição querida na maioria das universidades do Mar Interior que jovens eruditos puxem pegadinhas estranhas e tortas, ainda mais quando esses jovens têm magia — quanto mais difícil, bizarra ou inexplicável a pegadinha, melhor. Os magos do Arcanamirium ainda relembram a vez em que transportaram uma galé inteira para um parque da cidade no meio da noite. Da mesma forma, os estudantes da Academia Dacilane recentemente começaram o que chamaram de Primeira Grande Guerra das Pegadinhas.",
      },
      {
        id: "centers-of-learning",
        title: "Centros de saber",
        body: "**A Acadaemae (Varisia)**: faculdade de magos de ponta especializada em evocar criaturas de outros mundos. **Universidade de Almas (Andoran)**: escola voltada sobretudo a direito, política, filosofia moderna e zoologia. **Academia Kitharodian (Taldor)**: famosa faculdade bárdica que ensina alunos de todas as classes sociais. **Magaambya (Nantambu)**: escola antiga com alguns dos maiores acervos de saber arcano do mundo. **Universidade de Lepidstadt (Ustalav)**: escola voltada sobretudo a alquimia, medicina e estudo científico.",
      },
      {
        id: "crossover-ancestry-npcs",
        title: "NPCs de ancestralidade cruzada",
        body: "Vários NPCs de outras partes do NPC Core encaixam bem neste grupo: coletor de nomes catfolk (nível 6), guarda-lendas dromaar (nível 5), filomata gnomo (nível –1).",
      },
      {
        id: "fashionable-familiars",
        title: "Familiares na moda",
        body: "Vincular-se a um familiar é um ato profundamente pessoal, único a cada mestre e familiar. Como gente é gente, certos familiares continuam mais populares que outros. Gatos, ratos e corvos são clássicos veneráveis, improváveis de serem desalojados tão cedo. Macacos são comuns em climas mais ao sul, e o venerável sapo é o familiar de escolha de magos que querem algo um pouco mais de baixa manutenção.",
      },
      {
        id: "scholarly-titles",
        title: "Títulos acadêmicos",
        body: "Eruditos universitários podem ser tão obcecados por títulos quanto a aristocracia mais emperrada, e por isso todas as universidades do Mar Interior têm uma riqueza de postos, títulos, graus e formas de tratamento. Alguns dos mais comuns são deão, reitor, professor, docente, conferencista, leitor, fellow, élder, doutor, mestre, filósofo, tutor e don, com uma hoste de variantes vice-, adjunto-, sênior- e emérito- em todos eles.",
      },
      {
        id: "uncommon-scholastic-disciplines",
        title: "Disciplinas acadêmicas incomuns",
        body: "Além das ciências da vida e naturais como arcana, biologia, botânica, geologia, oceanografia e zoologia, a demanda cresce nas cidades por disciplinas mais modernas como antropologia, economia, sociologia, planejamento urbano e até curadoria de arte e investigação forense.",
      },
      {
        id: "university-uniform",
        title: "Uniforme universitário",
        body: "A maioria das universidades do Mar Interior tem túnicas como uniforme oficial ou cerimonial, em geral com uma mistura de estolas, capuzes e faixas tomados, com graus variados de sutileza, das tradições religiosas locais. Menos comum, vê-se cajados, capas ou amuletos, mas ocasionalmente aparecem coisas realmente estranhas. Graduados da Chirographica em Ular Kel recebem uma lança de prata, enquanto o Colégio dos Mistérios em Absalom concede tatuagens sobrenaturais aos alunos estrela.",
      },
    ],
  }),
  fam({
    id: 'family-seafarer',
    name: "Navegante",
    originalName: "Seafarer",
    trait: null,
    sourcePage: 146,
    source: 'NPC Core',
    aonUrl: "https://2e.aonprd.com/MonsterFamilies.aspx?ID=549",
    intro:
      "Aventureiros podem precisar de passagem numa embarcação veloz, ou podem enfrentar perigo de saqueadores no mar ou em povoados costeiros.",
    sections: [
      {
        id: "conscription",
        title: "Recrutamento forçado",
        body: "Embora a escravidão seja proibida em Golarion, a prática de aliciar marinheiros para o serviço com copiosas quantidades de álcool e promessas ambíguas permanece uma tradição atemporal. Velhos lobos do mar às vezes dizem: “Pegue a vela, e é isso que vai levar.” Isso originalmente se referia à peça de ouro padrão de Korvosa que trazia a impressão de um navio. Uma vez que um marinheiro aceitasse qualquer moeda de um recruta, era jogo justo conscrevê-lo.",
      },
      {
        id: "crossover-ancestry-npcs",
        title: "NPCs de ancestralidade cruzada",
        body: "Vários NPCs de outras partes do NPC Core encaixam bem neste grupo: come-azar (nível 4).",
      },
      {
        id: "religion",
        title: "Religião",
        body: "A fé de quem navega as ondas frequentemente é questão de aplacamento em vez de piedade. Marinheiros em geral rezam a Gozreh e Hei Feng por tempo favorável; a Besmara na esperança de evitar piratas e monstros marinhos; e a Desna e Sarenrae por auxílio na navegação. Marinhas com religiões nacionais fortes fecham os olhos a esse comportamento. Embarcações rahadoumi são uma exceção e proíbem tal culto. Estrangeiros entre as tripulações precisam ser secretos nas devoções.",
      },
      {
        id: "sea-maps",
        title: "Mapas do mar",
        body: "O mapa de um navio é motivo de grande orgulho e valor. Cada navio desenvolve mapas conforme navega e descobre rotas e locais. Embora marinhas maiores possam compartilhar achados entre si, embarcações independentes prezam os segredos do mapa acima de tudo. Por isso, mapas do mar muitas vezes não têm legendas e são cifrados com símbolos únicos, para que os segredos, que valem mais que ouro, não sejam facilmente descobertos.",
      },
      {
        id: "the-bends",
        title: "O mal da descompressão",
        body: "Mergulhadores de grandes profundidades têm um perigo especial contra o qual precisam se preparar no dia a dia: ar no sangue. Conhecida coloquialmente como o mal da descompressão, ocorre quando um mergulhador sobe rápido demais, seja por inexperiência ou medo. Muitos mergulhadores tiveram de escolher entre enfrentar um predador aterrador ou se mover rápido demais e se tornar vítimas desta doença dolorosa.",
      },
    ],
  }),
  fam({
    id: 'family-villain',
    name: "Vilão",
    originalName: "Villain",
    trait: null,
    sourcePage: 152,
    source: 'NPC Core',
    aonUrl: "https://2e.aonprd.com/MonsterFamilies.aspx?ID=550",
    intro:
      "Vilões perseguem objetivos egoístas e cruéis, atropelando quem estiver no caminho.",
    sections: [
      {
        id: "golarion-s-most-wanted",
        title: "Os mais procurados de Golarion",
        body: "Eis alguns dos vilões mais notórios da história de Golarion.\n\n**Rainha Abrogail II**: a governante de Cheliax se dedica a Asmodeus e governa tiranicamente a nação diabólica, completamente confiante na supremacia de si e do país. **Tar-Baphon**: o liche antigo chamado Tirano Sussurrante invadiu nação após nação com hordas de mortos-vivos, matou um arauto divino e mesmo agora ressurgiu e se reagrupou nas Terras de Cascalho. **Os Senhores das Runas**: os sete governantes da antiga Thassilon dominaram poderes de runas mágicas, permitindo-lhes governar em tempos antigos e voltar de novo e de novo nos séculos seguintes para tentar retomar o poder que um dia tiveram.",
      },
      {
        id: "manipulative-evil",
        title: "Mal manipulador",
        body: "Vilões que usam o poder das ideias — como o conspiracionista e o propagandista desta seção — não são combatentes particularmente eficazes. Em vez disso, dependem de ingênuos ou de outros vilões (como a turba iludida ou o belicista) para encenar fisicamente as ideologias malignas. Também são adaptáveis, embora o conspiracionista em geral mantenha conspirações e temas centrados em si e em aliados próximos, enquanto o propagandista em geral trama com o consentimento do Estado, usando meias-verdades e enquadramento manipulador para servir a quem está no poder e ser bem pago pelo trabalho.",
      },
      {
        id: "recurring-villains",
        title: "Vilões recorrentes",
        body: "Vilões são tão devotos aos esquemas malignos quanto heróis o são à justiça ou à liberdade. Vilões rendem NPCs recorrentes excelentes. A seção de avanço de NPC é especialmente útil para vilões. Para contar histórias mais variadas, o Mestre pode fazer os vilões se juntarem a novos grupos de seguidores ou ficarem a serviço de novos benfeitores, usando as habilidades vilanescas para uma causa nova.",
      },
      {
        id: "relative-villainy",
        title: "Vilania relativa",
        body: "Estes personagens estão claramente postos como vilões na estrutura da história de uma aventura de Pathfinder, mas isso não significa que as pessoas do mundo os vejam assim de forma universal. Vilões funcionam melhor quando civis bem-intencionados não conseguem ver a malícia, ou quando o vilão é tão carismático ou poderoso que traz outros sob sua influência. Você pode usar um encontro de influência para interpretar os personagens dos jogadores tentando afastar uma pessoa poderosa da influência do vilão, ou até ter PJs e vilão correndo para influenciar a mesma pessoa.",
      },
    ],
  })
]
