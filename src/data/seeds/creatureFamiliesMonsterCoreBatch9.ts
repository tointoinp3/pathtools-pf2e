import type { CreatureFamily } from '@/types/creature'

const MONSTER_CORE = 'Monster Core'

function fam(
  partial: Omit<CreatureFamily, 'source'> & { source?: string },
): CreatureFamily {
  return { source: MONSTER_CORE, ...partial }
}

/**
 * Lore de família Remaster para o lote 9 do Monster Core.
 * Asides = barras laterais da página AoN Monster Families. Sem blurb de membro.
 */
export const catalogCreatureFamiliesMonsterCoreBatch9: CreatureFamily[] = [
  fam({
    id: 'family-dragon-adamantine',
    name: 'Dragão de Adamantina',
    originalName: 'Dragon, Adamantine',
    trait: null,
    sourcePage: 108,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=396',
    intro:
      'Os poderosos dragões de adamantina são um dos vários dragões conhecidos como dragões de metais celestes. A magia inata que corre por esses dragões faz com que atraiam metais específicos ao corpo como ímãs ou, em alguns casos, que esses metais celestes cresçam naturalmente no corpo. Dragões de adamantina começam a vida com escamas duras que, ao envelhecer, são substituídas por placas de adamantina ainda mais espessas e resistentes. Em geral são constantes e leais. Uma vez que se comprometem com um propósito, mudar de ideia é quase impossível.',
    sections: [
      {
        id: 'adamantine-dragon-lairs',
        title: 'Covis de dragão de adamantina',
        body: 'Dragões de adamantina vivem sobretudo em montanhas, cânions e outros terrenos rochosos. Chegar aos covis pode ser difícil, pois o dragão de adamantina em geral cava de onde estiver até o covil. Isso cria redes vastas de túneis que confundem. O tesouro de um dragão de adamantina costuma estar espalhado de gemas e metais preciosos achados nas escavações. Por isso, em geral preferem outros presentes: muitos apreciam contos interessantes e canções memoráveis mais do que posses materiais.',
      },
      {
        id: 'adamantine-dragon-spellcasters',
        title: 'Conjuradores de dragão de adamantina',
        body: `Conjuradores de dragão de adamantina tendem a lançar as magias a seguir.

### Dragão de Adamantina Jovem
**Magias primais preparadas** CD 28, ataque +21; **4º** _Moldar Pedra_, _Movimento Livre_; **3º** _Prender à Terra_, _Um com a Pedra_, _Lentidão_; **2º** _Escuridão_, _Estilhaçar_, _Andar na Água_; **1º** _Bolha de Ar_, _Vento a Favor_, _Apagar Rastros_; **Truques (4º)** _Explosão Cáustica_, _Detectar Magia_, _Saber o Caminho_, _Sigilo_, _Cipó Emaranhado_

### Dragão de Adamantina Adulto
**Magias primais preparadas** CD 34, ataque +27; Como o dragão de adamantina jovem, mais **6º** _Petrificar_, _Trepadeiras Emaranhadas_; **5º** _Espeto Empalador_, _Passagem Mágica_, _Falar com Pedras_; **4º** _Forma de Vapor_; **Truques (6º)** _Explosão Cáustica_, _Detectar Magia_, _Saber o Caminho_, _Sigilo_, _Cipó Emaranhado_

### Dragão de Adamantina Ancião
**Magias primais preparadas** CD 41, ataque +36; Como o dragão de adamantina adulto, mais **8º** _Terremoto_, _Dessecar_, _Momento de Renovação_; **7º** _Máscara do Terror_, _Regenerar_, _Erupção Vulcânica_; **6º** _Campo de Vida_; **Truques (8º)** _Explosão Cáustica_, _Detectar Magia_, _Saber o Caminho_, _Sigilo_, _Cipó Emaranhado_

### Arquidragão de Adamantina
**Magias primais preparadas** CD 44, ataque +36; Como o dragão de adamantina ancião, mais **9º** _Implosão_, _Estrelas Cadentes_; **Truques (9º)** _Explosão Cáustica_, _Detectar Magia_, _Saber o Caminho_, _Sigilo_, _Cipó Emaranhado_`,
      },
      {
        id: 'alternate-abilities',
        title: 'Habilidades alternativas',
        body: `Você pode criar um dragão de adamantina mais incomum substituindo qualquer uma das habilidades a seguir por Investida Escavadora, Frenesi Dracônico ou Presença Aterradora.

**Esmagamento de Cratera** O dragão se arremessa contra o chão, craterando a terra numa emanação de 3 m de profundidade e 18 m de largura. Criaturas na área são lançadas ao ar e devem tentar uma salvaguarda de Reflexos com CD igual à do Sopro de Avalanche do dragão. **Sucesso crítico** A criatura aterrissa em pé. **Sucesso** A criatura aterrissa Caída. **Falha** A criatura aterrissa Caída e sofre 1d6 de dano a cada dois níveis do dragão. **Falha crítica** Como falha, e o dragão pode fazer um Golpe de mandíbulas contra a criatura como ação livre. Só pode atacar uma criatura que tenha falhado criticamente na salvaguarda.

**Rugido Magnético** (metal, primevo) Com um rugido poderoso, o dragão atrai metal numa emanação de 18 m. Qualquer objeto de metal desacompanhado de 1 Volume ou menos voa até o dragão e gruda no couro, concedendo +2 de bônus de item à CA por 1 minuto. Qualquer criatura que empunhe um objeto de metal de 1 Volume ou menos deve tentar uma salvaguarda de Fortitude com CD igual à CD do Sopro de Avalanche do dragão ou ter o item puxado até o dragão e grudado por 1 rodada. Uma criatura vestindo armadura de metal, em vez disso, deve passar numa salvaguarda de Fortitude contra a CD + 2 ou ser puxada, sofrendo 1d6 de dano de concussão a cada 3 m que foi movida, e ficar magneticamente grudada ao dragão por 1 rodada. Um objeto ou criatura pode ser desgrudado com uma ação Interagir.

**Golpe Petrificante** (metal, primevo) Os ataques do dragão de adamantina podem transformar criaturas em esculturas para acrescentar ao tesouro. Uma criatura que sofra um acerto crítico do Golpe de garra ou de mandíbulas do dragão deve tentar uma salvaguarda de Fortitude com CD igual à da Presença Aterradora do dragão. Numa salvaguarda bem-sucedida, a criatura fica imune temporariamente por 1 minuto. **Sucesso crítico** A criatura não é afetada. **Sucesso** A criatura fica Atrasada 1. **Falha** A criatura fica Atrasada 2. **Falha crítica** A criatura fica Petrificada permanentemente em adamantina.

**Rajada Repelente** (metal, primevo); **Frequência** uma vez ao dia; **Efeito** O dragão expulsa escamas do corpo numa emanação de 15 m. Criaturas na área sofrem dano cortante igual ao Sopro de Avalanche do dragão (com salvaguarda básica de Reflexos da mesma CD). O dragão recebe os modificadores de Abandonar Armadura independentemente dos PV até depois de uma noite de descanso.

**Asas Ceifadoras** **Requisitos** o dragão tem o Deslocamento aumentado por Abandonar Armadura; **Efeito** o dragão Voa e faz até dois Golpes de garra contra criaturas diferentes ao longo do voo.`,
      },
      {
        id: 'trivorrin',
        title: 'Trivorrin',
        body: 'O dragão de adamantina Trivorrin é uma ameaça bem conhecida dos grupos nômades de Numéria. Residindo no lar dentro da fenda imensa conhecida como o Caminho da Primeira Lâmina, Trivorrin age como uma espécie de árbitro dos vários clãs e tribos da região. Quem traz oferendas de maravilhas tecnológicas de toda Numéria ganha passagem segura e proteção do dragão, tornando o lar um terreno neutro para a política dos clãs. Trivorrin acumula tecnologia há séculos na tentativa de construir uma invenção secreta própria.',
      },
    ],
  }),
  fam({
    id: 'family-dragon-conspirator',
    name: 'Dragão Conspirador',
    originalName: 'Dragon, Conspirator',
    trait: null,
    sourcePage: 110,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=397',
    intro:
      'Escondidos nas sombras e nos altos escalões da sociedade estão os dragões conspiradores. Esses dragões são tramadores, sempre buscando manipular e controlar os outros, seja por ganho pessoal ou simplesmente pela emoção de ver as maquinações se desenrolarem. Dragões conspiradores se veem acima dos demais e em geral falam com tom e palavras infantilizadores. Porém, como a maioria encontra os outros disfarçada, faz o possível para manter o disfarce.',
    sections: [
      {
        id: 'alternate-abilities',
        title: 'Habilidades alternativas',
        body: `Dragões conspiradores muitas vezes acumulam uma variedade de talentos alinhados à história dos disfarces e, mais do que qualquer outro dragão, podem escolher afiar perícias que os sirvam nas identidades escolhidas à custa do domínio nas formas dracônicas. Embora a maioria pratique a arte da manipulação sutil, um dragão particularmente ousado pode interpretar o papel de um tirano fantoche mais violento no físico, contente em deixar o poder abertamente a conselheiros bajuladores enquanto manipula os desejos em segredo. Tal dragão conspirador pode recorrer a habilidades ou feitos de classes como bárbaro, guerreiro, espadachim ou até pistoleiro para sustentar a farsa.

A maioria dos dragões conspiradores, porém, passa os dias entre as sociedades de outras ancestralidades como conselheiros, confidentes e outros papéis que têm o ouvido de quem está no poder; assim, é mais comum encontrar dragões conspiradores com afinidade por diplomacia, planejamento e subterfúgio para melhor fortalecer os desígnios. Tal dragão conspirador pode ser feito com facilidade substituindo Frenesi Dracônico, Retrair o Corpo ou Transformação Apressada por uma das opções a seguir.

**Paranoides no Ápice** Dragões conspiradores temem mais do que qualquer um deles admitiria; ter poder vem com o medo de que o poder se perca ou seja roubado. O dragão tem a condição Acelerado e pode usar a ação extra somente para as ações Fintar, Procurar e Avaliar Motivações.

**Retorno Mental** (concentração, emoção, mental, oculta) **Gatilho** Uma criatura usa um efeito mágico mental contra o dragão; **Efeito** O dragão usa a rajada mental contra a criatura que disparou. Num acerto crítico, o efeito mental é interrompido.

**Revelações Obscurecidas** (oculta) Quando o dragão é alvo de um efeito de detecção, revelação ou escrutínio, o Mestre rola um teste secreto de contraposições com círculo de contraposições igual à metade do nível do dragão (arredondada para cima) e modificador igual à Vontade do dragão. O dragão fica ciente dos efeitos contrapostos dessa forma e das fontes, então fornece informações falsas à escolha dele.

**Sussurradores Ocultos** Depois de conversar com uma criatura por 10 minutos, o dragão pode lançar uma das magias inatas ocultas mirando a criatura, entrelaçando-a na conversa. Magias lançadas assim perdem o traço manipulação e ganham o traço linguística.`,
      },
      {
        id: 'conspirator-dragon-lairs',
        title: 'Covis de dragão conspirador',
        body: 'Embora dragões conspiradores guardem tesouros como outros dragões, também gostam de colecionar segredos e material de chantagem. Isso vai de cópias de cartas e contratos que se acreditava secretos a outras provas incriminatórias que ajudam a alcançar as metas do dragão. As metas de um dragão conspirador podem variar, e cada um guarda itens ligados a essa meta — como escrituras para um dragão que busca possuir uma cidade, ou tomos antigos para um dragão que busca reunir informação sobre civilizações antigas. Como a maioria vive entre povoados, guardam os tesouros em porões grandes, fora do povoado em covis secretos de floresta ou montanha, ou até no cofre de um banco local.',
      },
      {
        id: 'conspirator-dragon-spellcasters',
        title: 'Conjuradores de dragão conspirador',
        body: `Conjuradores de dragão conspirador tendem a lançar as magias a seguir.

### Dragão Conspirador Jovem
**Magias ocultas preparadas** CD 26, ataque +19; **3º** _Clarividência Auditiva_, _Paralisar_, _Véu de Privacidade_; **2º** _Calma_, _Invisibilidade_, _Paranoia_; **1º** _Ruína_, _Medo_, _Dor Fantasma_; **Truques (3º)** _Aturdir_, _Detectar Magia_, _Figmento_, _Mensagem_, _Projétil Telecinético_

### Dragão Conspirador Adulto
**Magias ocultas preparadas** CD 33, ataque +26; Como o dragão conspirador jovem, mais **5º** _Olho de Batedor_, _Pulso Sináptico_, _Fala Verdadeira_; **4º** _Clarividência_, _Palavras Melosas_, _Sugestão_; **Truques (5º)** _Aturdir_, _Detectar Magia_, _Figmento_, _Mensagem_, _Projétil Telecinético_

### Dragão Conspirador Ancião
**Magias ocultas preparadas** CD 39, ataque +33; Como o dragão conspirador adulto, mais **8º** _Mente Oculta_, _Observação Implacável_; **7º** _Duplicar Inimigo_, _Projetar Imagem_, _Distorcer a Mente_; **6º** _Induzir ao Erro_, _Escrutínio_, _Visão Verdadeira_; **Truques (8º)** _Aturdir_, _Detectar Magia_, _Figmento_, _Mensagem_, _Projétil Telecinético_

### Arquidragão Conspirador
**Magias ocultas preparadas** CD 42, ataque +34; Como o dragão conspirador ancião, mais **9º** _Fantasmagoria_, _Exigência Telepática_; **Truques (9º)** _Aturdir_, _Detectar Magia_, _Figmento_, _Mensagem_, _Projétil Telecinético_`,
      },
      {
        id: 'vixalla',
        title: 'Vixalla',
        body: 'Embora seja uma chegada relativamente recente à política de Taldor, a Condessa Phisetta dis Alavir causou forte impressão entre a nobreza do país. Quando não está em público, a Condessa abandona a persona nobre e assume a forma verdadeira, a do dragão conspirador Vixalla. O dragão mantém o tesouro e um rodízio de servos cujas memórias ela apaga com regularidade numa caverna nas profundezas sob o solar na capital de Taldor, Oppara.',
      },
    ],
  }),
  fam({
    id: 'family-dragon-diabolic',
    name: 'Dragão Diabólico',
    originalName: 'Dragon, Diabolic',
    trait: null,
    sourcePage: 112,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=398',
    intro:
      'O Inferno, segundo alguns teólogos, é uma entidade viva por si. Dragões diabólicos, argumentam esses eruditos, são apenas extensões do plano: criaturas vivas que se desprendem do Inferno para executar a vontade dele. Seja isso verdade ou sejam os dragões diabólicos simplesmente as almas reencarnadas de dragões enviados ao Inferno, o fato permanece: esses dragões são poderosos, astutos e tirânicos. A meta de todo dragão diabólico é avançar a vontade do Inferno, embora o modo varie. Independentemente das metas, esses dragões sempre abordam recém-chegados com uma calma inquietante.',
    sections: [
      {
        id: 'alternate-abilities',
        title: 'Habilidades alternativas',
        body: `Com os poderes do Inferno à disposição, dragões diabólicos podem ter uma infinidade de habilidades diferentes. Você pode aplicar os ajustes a seguir a dragões diabólicos de qualquer idade.

Alguns dragões diabólicos conseguem roubar os rostos e as memórias daqueles cujas almas possuem, vestindo-os como disfarces com os quais enganar vítimas em potencial. Para fazer um dragão com essa habilidade, substitua Presença Aterradora pelo seguinte.

**Disfarce Diabólico** (concentração, divina, polimorfia) O dragão assume a forma de uma criatura específica cuja gema da alma ou contrato infernal esteja em posse ou no tesouro dele. Isso tem os efeitos de Mudar Forma, exceto que o dragão também ganha conhecimento rudimentar da personalidade, conexões sociais, trejeitos e memórias superficiais da criatura, a critério do Mestre. Qualquer conhecimento que o dragão ganhe ao assumir a forma de outra criatura se perde quando o dragão dispensa o efeito ou muda de forma de novo, embora nada o impeça de registrar isso por outros meios enquanto transformado.

Dragões diabólicos com jeito para a feitiçaria podem rasgar o tecido entre o Universo e as profundezas do Inferno com um mero gesto. Para fazer um dragão com essa habilidade, substitua Frenesi Dracônico pelo seguinte.

**Fenda Infernal** (divina, fogo, profano) O dragão usa a garra para rasgar uma fenda até Phlegethon, a quarta camada do Inferno. A fenda mede 1,5 m de largura, 3 m de altura e até 6 m de comprimento, e pode ser Sustentada por até 1 minuto. Enquanto a fenda estiver aberta, qualquer criatura que ocupe a área ou um quadrado adjacente no início do turno sofre 3d6 de dano de fogo (+1 dado para cada categoria de idade do dragão além de jovem) e uma quantidade igual de dano de espírito, com salvaguarda básica de Reflexos. O dragão pode escolher, em vez disso, abrir uma fenda até Cocytus, a sétima camada congelada do Inferno, para substituir esse dano de fogo por dano de frio, embora ainda esteja sujeito à habilidade Fogo Diabólico do dragão.

Dragões diabólicos com domínio excepcional de pactos diabólicos e conjuração interplanar podem substituir os lacaios conjurados de conjuradores pelos próprios. Para fazer um dragão com essa habilidade, substitua Ferrão do Inferno pelo seguinte.

**Interceptar Conjurações** (concentração) **Gatilho** Uma criatura a até 9 m usa magia para conjurar ou invocar uma criatura; **Efeito** O dragão tenta um teste de contraposições com um teste de Saber do Inferno (círculo de contraposições igual à metade do nível do dragão, arredondada para cima). Num sucesso, o dragão toma o controle do efeito, fazendo-o falhar e conjurando imediatamente uma magia _Conjurar Capeta_ do mesmo círculo (mínimo 5º) que o efeito que disparou para conjurar uma criatura com o traço diabo.`,
      },
      {
        id: 'azhadar',
        title: 'Azhadar',
        body: 'Azhadar, a grande arquidragão diabólica, serve o arquidiabo Moloch, o General do Inferno. O dragão tem grande liberdade para marchar os exércitos do Inferno aonde for preciso, mas nos últimos séculos achou prazer em deixar o Inferno para tentar grandes guerreiros mortais com promessas incontáveis. Quem cede se vê recrutado para os exércitos do Inferno quando inevitavelmente encontra o fim nas mãos de um rival igualmente empoderado no campo de batalha. A aparição mais recente de Azhadar foi perto de Bloodcove, onde fez uma oferta a um capitão pirata tirânico.',
      },
      {
        id: 'diabolic-dragon-lairs',
        title: 'Covis de dragão diabólico',
        body: 'O covil de um dragão diabólico é um lugar surpreendentemente esparso. A maioria desses dragões acha cavernas ou salas grandes no Inferno para reivindicar como covil, mas guarda relativamente pouco dentro. O tesouro de um dragão diabólico em geral é feito de gemas da alma — gemas mágicas feitas para conter almas mortais — e contratos infernais. Os contratos ainda estão em vigor e se resolvem quando a alma do signatário mortal chega ao Inferno e é colocada à força numa gema da alma. Embora dragões diabólicos repassem as almas contidas nessas gemas a outras partes do Inferno para incontáveis propósitos, a maioria segura as almas de mortais que acha particularmente intrigantes e chama essas almas para serem servos ou para outros propósitos vis mais tarde.',
      },
      {
        id: 'diabolic-dragon-spellcasters',
        title: 'Conjuradores de dragão diabólico',
        body: `Conjuradores de dragão diabólico tendem a lançar as magias a seguir.

### Dragão Diabólico Jovem
**Magias divinas preparadas** CD 30, ataque +24; **4º** _Globo Dissipador_, _Ira Divina_, _Amarra Planar_; **3º** _Cegueira_, _Escuridão Gélida_, _Ferir_; **2º** _Vendeta de Sangue_, _Escuridão_, _Traduzir_; **1º** _Comando_ (×2), _Medo_; **Truques (4º)** _Detectar Magia_, _Lança Divina_, _Mensagem_, _Sigilo_, _Distorção do Vazio_

### Dragão Diabólico Adulto
**Magias divinas preparadas** CD 36, ataque +30; Como o dragão diabólico jovem, mais **6º** _Banimento_, _Fronteira Abençoada_, _Dominar_; **5º** _Mensagem à Distância_, _Translocar_, _Fala Verdadeira_; **Truques (6º)** _Detectar Magia_, _Lança Divina_, _Mensagem_, _Sigilo_, _Distorção do Vazio_

### Dragão Diabólico Ancião
**Magias divinas preparadas** CD 42, ataque +38; Como o dragão diabólico adulto, mais **9º** _Ferir_, _Massacre_, _Lamentos dos Condenados_; **8º** _Cântico da Dor Eterna_, _Executar_, _Localizar com Precisão_; **7º** _Explosão de Eclipse_, _Selo Planar_, _Fala Verdadeira_; **Truques (9º)** _Detectar Magia_, _Lança Divina_, _Mensagem_, _Sigilo_, _Distorção do Vazio_

### Arquidragão Diabólico
**Magias divinas preparadas** CD 46, ataque +38; Como o dragão diabólico ancião, mais **10º** _Indestrutibilidade_, _Massacre_; **Truques (10º)** _Detectar Magia_, _Lança Divina_, _Mensagem_, _Sigilo_, _Distorção do Vazio_`,
      },
    ],
  }),
  fam({
    id: 'family-dragon-empyreal',
    name: 'Dragão Empíreo',
    originalName: 'Dragon, Empyreal',
    trait: null,
    sourcePage: 114,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=399',
    intro:
      'Os três planos celestiais principais — Céu, Nirvana e Elísio — cada um tem os respectivos dragões. Dragões empíreos têm conexão direta com o Céu. Usando as bênçãos do Céu, protegem os outros e intercedem contra a maldade. Dragões empíreos são sábios, atenciosos e compassivos. Ao falar com os outros, são pacientes e compreensivos.',
    sections: [
      {
        id: 'alternate-abilities',
        title: 'Habilidades alternativas',
        body: `Dragões empíreos achados nos planos celestiais podem ter habilidades únicas próprias. Você pode aplicar os ajustes a seguir a dragões empíreos de qualquer idade.

Dragões empíreos entendem que às vezes precisam fazer um sacrifício para proteger os outros. Para fazer um dragão com essa habilidade, substitua Desvio Divino pelo seguinte.

**Escudo Sacrificial** (divina) **Gatilho** Um aliado a até 18 m do dragão sofreria dano; **Efeito** A auréola do dragão se interpõe diante da criatura como um escudo, transferindo o dano ao dragão. Se o dano for de vazio, o dragão ganha resistência a esse dano igual à metade do nível.

Dragões empíreos que lutam ao lado de mortais quando as forças do mal estão em marcha podem fortalecer os aliados. Para fazer um dragão com qualquer uma dessas habilidades, substitua Frenesi Dracônico por uma das seguintes.

**Auréola Restauradora** (concentração, divina) A auréola do dragão se divide em auréolas menores, pairando sobre até seis criaturas à escolha do dragão dentro da aura de Presença Inspiradora. Criaturas que usam uma auréola ganham cura acelerada igual à metade do nível do dragão por 1 minuto. O dragão não pode usar outras habilidades da auréola enquanto outras criaturas a usam, e pode Dispensar o efeito para qualquer ou todas as criaturas afetadas.

**Grinalda de Luz Sagrada** (concentração, divina, sagrado) O dragão imbui os aliados com fogo celestial. Criaturas a até 18 m do dragão ganham o traço sagrado e os Golpes causam 1d10 adicional de dano de fogo por 1 minuto. Se a criatura acertar criticamente um inimigo com um Golpe, o inimigo também pega fogo e sofre 1d6 de dano de fogo persistente.`,
      },
      {
        id: 'empyreal-dragon-lairs',
        title: 'Covis de dragão empíreo',
        body: 'Embora a maioria dos dragões empíreos mantenha lares entre os entornos do Céu, muitos também escolhem guardar covis pelo Universo mortal. Esses covis em geral ficam em lugares menos remotos, com a expectativa de que uma pessoa tenha mais chance de tropeçar num deles e achar ajuda em tempos de necessidade. Além das riquezas tradicionais de um tesouro de dragão, o tesouro de um dragão empíreo contém uma infinidade de armamentos, em geral no tamanho das pessoas da região caso precisem de equipamento para enfrentar o mal.',
      },
      {
        id: 'empyreal-dragon-spellcasters',
        title: 'Conjuradores de dragão empíreo',
        body: `Conjuradores de dragão empíreo tendem a lançar as magias a seguir.

### Dragão Empíreo Jovem
**Magias divinas preparadas** CD 29, ataque +22; **4º** _Dissipar Magia_, _Movimento Livre_, _Farol Vital_; **3º** _Prender Morto-vivo_, _Sino da Verdade_, _Corpo São_; **2º** _Mente Clara_, _Luz Eterna_, _Compartilhar Vida_; **1º** _Bênção_, _Consertar_, _Santuário_; **Truques (4º)** _Detectar Magia_, _Lança Divina_, _Orientação_, _Escudo_, _Estabilizar_

### Dragão Empíreo Adulto
**Magias divinas preparadas** CD 34, ataque +28; Como o dragão empíreo jovem, mais **6º** _Campo de Vida_, _Dissipar Magia_, _Rajada Espiritual_; **5º** _Sopro de Vida_, _Mente Clara_, _Mensagem à Distância_; **Truques (6º)** _Detectar Magia_, _Lança Divina_, _Orientação_, _Escudo_, _Estabilizar_

### Dragão Empíreo Ancião
**Magias divinas preparadas** CD 41, ataque +35; Como o dragão empíreo adulto, mais **9º** _Decreto Divino_, _Presença Avassaladora_, _Explosão Solar_; **8º** _Dissipar Magia_, _Inspiração Divina_, _Momento de Renovação_; **7º** _Égide de Energia_, _Selo Planar_, _Regenerar_; **Truques (9º)** _Detectar Magia_, _Lança Divina_, _Orientação_, _Escudo_, _Estabilizar_

### Arquidragão Empíreo
**Magias divinas preparadas** CD 46, ataque +38; Como o dragão empíreo ancião, mais **10º** _Portal_, _Reviver_; **Truques (10º)** _Detectar Magia_, _Lança Divina_, _Orientação_, _Escudo_, _Estabilizar_`,
      },
      {
        id: 'yssendri',
        title: 'Yssendri',
        body: 'Originalmente das fileiras dos maiores exércitos do Céu, a grande arquidragão empírea Yssendri acabou por se retirar do combate direto, escolhendo focar empreendimentos mais filantrópicos. Yssendri viaja a povoados menores pelo Universo para ajudar a defender inocentes. Recentemente, viajou à nação desértica de Thuvia para defender uma caravana de mercadores de terras distantes.',
      },
    ],
  }),
  fam({
    id: 'family-dragon-fortune',
    name: 'Dragão da Fortuna',
    originalName: 'Dragon, Fortune',
    trait: null,
    sourcePage: 116,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=400',
    intro:
      'Dragões da fortuna têm a habilidade inata de puxar as energias mágicas brutas que os cercam. Usam constantemente essas energias para fortalecer as habilidades mágicas e até o corpo, pois a energia pode curar feridas. Um dragão da fortuna tem o porte típico de um dragão arcano, mas o corpo ostenta um traço marcante: o tesouro. A natureza de puxar magia faz moedas, gemas e, sobretudo, itens mágicos se agarrarem ao corpo como ferro atraído a ímãs. O dragão puxa sem parar energias mágicas dos itens presos ao corpo e usa essas energias para lançar magias. As energias mágicas que fluem por um dragão da fortuna fluem também pelos itens, e em muitos casos os itens derretem com o calor gerado nesse processo. Dragões da fortuna buscam experiências novas. Esse desejo de originalidade faz com que abordem visitantes de outras ancestralidades com curiosidade, embora o interesse inicial se esvaia depressa se o visitante carecer de qualidades empolgantes.',
    sections: [
      {
        id: 'alternate-abilities',
        title: 'Habilidades alternativas',
        body: `Dragões da fortuna colecionam toda sorte de tesouros diferentes, que podem usar a seu favor. Você pode aplicar os ajustes a seguir a um dragão da fortuna de qualquer idade.

Dragões da fortuna mórbidos podem colecionar artefatos feitos dos corpos de outros dragões, incorporando dentes, escamas e garras aos itens presos ao corpo. Isso lhes concede o poder de puxar a magia daqueles dragões falecidos. Para fazer um dragão com essa habilidade, substitua Frenesi Dracônico pelo seguinte.

**Natureza Quimérica** (arcana) Quando o dragão da fortuna faz um Golpe ou usa o Sopro Disruptivo, pode escolher ácido, frio, eletricidade, fogo, veneno, vazio ou vitalidade. O Golpe causa 1d6 adicional desse tipo de dano em vez de dano de força adicional, e o Sopro Disruptivo causa esse tipo de dano em vez de dano de força.

Em vez de depender do poder mágico dos itens no tesouro, alguns dragões da fortuna usam o tesouro para formar cascas protetoras. Tais dragões em geral só são achados no coração dos covis, cercados pelo grosso do tesouro. Para fazer um dragão com essa habilidade, substitua Capturar Magia e Mergulho no Tesouro pelo seguinte.

**Riqueza Oculta** **Requisitos** o dragão está adjacente ao tesouro; **Efeito** O dragão se recolhe para dentro de um monte de riquezas a fim de restaurar a energia. Esconde-se no monte de riquezas, usando-o como cobertura maior. O dragão recupera um espaço de magia espontânea gasto. Além disso, o Escudo da Fortuna recupera PV iguais ao nível do dragão.

**Escudo da Fortuna** O dragão ajusta o tesouro em volta do corpo para funcionar como uma espécie de escudo. Ganha +2 de bônus de circunstância à CA até o início do próximo turno e pode usar a reação Bloqueio com Escudo. O escudo tem Solidez, PV e limiar de quebrado de um escudo robusto do nível do dragão. Quando fica quebrado, dispara o efeito da habilidade Compartilhar a Riqueza do dragão.`,
      },
      {
        id: 'fortune-dragon-lairs',
        title: 'Covis de dragão da fortuna',
        body: 'O covil de um dragão da fortuna em geral guarda um tesouro bem maior do que o que outros dragões colecionam. Esses tesouros estão cheios de relíquias, objetos e armamentos relativamente sem valor, drenados de toda a energia mágica, e achar tesouros úteis entre eles exige muito esforço. Dragões da fortuna são particularmente protetores dos tesouros mais raros e ou os enterram no fundo do tesouro ou os mantêm presos diretamente ao corpo, onde o tesouro está mais seguro. Um dragão da fortuna desata a fúria plena para proteger o tesouro de qualquer forasteiro, independentemente da posição da pessoa.',
      },
      {
        id: 'fortune-dragon-spellcasters',
        title: 'Conjuradores de dragão da fortuna',
        body: `Conjuradores de dragão da fortuna tendem a lançar as magias a seguir.

### Dragão da Fortuna Jovem
**Magias arcanas preparadas** CD 30, ataque +22; **4º** _Cintilar_, _Translocar_, _Visão da Morte_; **3º** _Orbe Aquoso_, _Graxa_, _Acelerar_; **2º** _Invisibilidade_, _Névoa_, _Teia_; **1º** _Rajada de Vento_, _Fachada de Item_, _Servo Fantasmal_; **Truques (4º)** _Arco Elétrico_, _Figmento_, _Prestidigitação_, _Escudo_, _Mão Telecinética_

### Dragão da Fortuna Adulto
**Magias arcanas preparadas** CD 36, ataque +28; Como o dragão da fortuna jovem, mais **6º** _Metamorfose Amaldiçoada_, _Teleporte_, _Muralha de Força_; **5º** _Nevasca Uivante_, _Olho de Batedor_, _Nuvem Tóxica_; **Truques (6º)** _Arco Elétrico_, _Figmento_, _Prestidigitação_, _Escudo_, _Mão Telecinética_

### Dragão da Fortuna Ancião
**Magias arcanas preparadas** CD 45, ataque +37; Como o dragão da fortuna adulto, mais **9º** _Detonar Magia_, _Estrelas Cadentes_, _Fantasmagoria_; **8º** _Fenda Ártica_, _Desaparecimento_, _Dança Incontrolável_; **7º** _Contingência_, _Égide de Energia_, _Palácio Planar_; **Truques (9º)** _Arco Elétrico_, _Figmento_, _Prestidigitação_, _Escudo_, _Mão Telecinética_

### Arquidragão da Fortuna
**Magias arcanas preparadas** CD 50, ataque +42; Como o dragão da fortuna ancião, mais **10º** _Indestrutibilidade_, _Refazer_; **Truques (10º)** _Arco Elétrico_, _Figmento_, _Prestidigitação_, _Escudo_, _Mão Telecinética_`,
      },
      {
        id: 'lethiliss',
        title: 'Lethiliss',
        body: 'O poder mágico de runelords antigos inicialmente atraiu o dragão da fortuna Lethiliss às Montanhas Calphiuak do Novo Thassilon, no noroeste de Avistão. Lethiliss passou várias décadas reunindo artefatos mágicos. Durante a Queda da Terra, um desses artefatos se ativou, trancando Lethiliss numa estase mágica que só se rompeu milênios depois. Agora Lethiliss passa boa parte do tempo viajando a região para rastrear relíquias mágicas para a coleção e para aprender mais sobre o mundo moderno.',
      },
    ],
  }),
  fam({
    id: 'family-dragon-horned',
    name: 'Dragão Cornífero',
    originalName: 'Dragon, Horned',
    trait: null,
    sourcePage: 119,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=401',
    intro:
      'A magia que corre pelos dragões primais pode manifestar traços mais animalistas ou bestiais num dado tipo de dragão. Notáveis entre esses são os chifres pareados imensos do dragão cornífero. Embora a estrutura corpulenta, a coloração natural e as escamas salientes e rugosas sejam todas notáveis à sua maneira, são os chifres o mais óbvio e marcante à primeira vista. Dragões corníferos usam os chifres para empalar a presa numa exibição rápida e brutal de poder. Em geral são contemplativos e têm uma fixação por conhecimento e autodisciplina, traços desmentidos pela aparência bestial. Como resultado, dragões corníferos em geral estão mais abertos a falar com forasteiros.',
    sections: [
      {
        id: 'alternate-abilities',
        title: 'Habilidades alternativas',
        body: `Muitos dragões corníferos se adaptam ao ambiente para aprender habilidades únicas.

Dragões corníferos de pântano crescem cogumelos nas escamas e inalam os esporos liberados por esses fungos para efeitos temporários. Para fazer um dragão com essa habilidade, substitua Frenesi Dracônico de um dragão cornífero de qualquer idade pelo seguinte.

**Esporos Revigorantes** (manipulação) O dragão se contorce, ejetando esporos de uma variedade de fungos coloridos que cobrem os membros. Os esporos flutuam até o focinho do dragão e o revigoram. O dragão ganha PV temporários iguais ao nível, que duram 10 minutos. O dragão também ganha resistência a concussão, cortante e perfurante igual à metade do nível até o fim do próximo turno. O dragão não pode usar Esporos Revigorantes de novo por 1d4 rodadas.

Alguns dragões corníferos maduros usam fragmentos dos chifres como mísseis para pegar inimigos desprevenidos e pregá-los no chão. Para fazer um dragão com essa habilidade, substitua Frenesi Dracônico de um dragão cornífero adulto ou mais velho pelo seguinte.

**Projétil de Chifre** **Frequência** uma vez por rodada; **Efeito** O dragão arremessa um fragmento do chifre num alvo a até 12 m. O alvo sofre o mesmo dano do Golpe de chifre do dragão e deve tentar uma salvaguarda de Reflexos. **Sucesso crítico** O alvo não sofre dano. **Sucesso** O alvo sofre metade do dano. **Falha** O alvo sofre dano pleno e fica Imobilizado, pois o fragmento do chifre o prega à superfície mais próxima. **Falha crítica** Como falha, mas o alvo sofre dano dobrado e 2d6 de sangramento persistente, pois o fragmento atravessa o corpo.

Os mais poderosos dos dragões corníferos exalam magia primeva que expande as mentes dos animais em seu domínio, dando-lhes domínio sobre essas criaturas em momentos críticos. Para fazer um dragão com essa habilidade, substitua Impulso Dracônico de um dragão cornífero ancião ou mais velho pelo seguinte.

**Domínio Ápice** (primevo) Quando o dragão lança _Dominar_ numa criatura com o traço animal, o resultado da salvaguarda do alvo é um grau de sucesso pior. Um animal que o dragão controla com essa magia pode falar Dracônico e ganha +2 de bônus de status em quaisquer testes de perícia baseados em Inteligência, Sabedoria e Carisma que tentar enquanto controlado.`,
      },
      {
        id: 'athervox',
        title: 'Athervox',
        body: 'Como dragões corníferos são contemplativos e buscam empreendimentos eruditos, Athervox não é diferente. Astrônoma de ofício, esta grande dragão cornífera mantém um observatório perto de Senara, nos Bosques Sussurrantes de Cheliax. Lá, fechou um acordo com a Casa Thrune em que concordou em instruir um punhado de aprendizes. Depois de alguns anos de instrução, esses “aprendizes” desapareceram numa noite, levando volumes das anotações cruciais do dragão — um agravo que ela não esqueceu e pelo qual planeja buscar vingança.',
      },
      {
        id: 'horned-dragon-lairs',
        title: 'Covis de dragão cornífero',
        body: 'Covis de dragão cornífero em geral ficam em florestas e pântanos, mas os sítios podem variar. Alguns dragões corníferos guardam covis em cavernas; outros em árvores ocas ou sob as raízes de sistemas de árvores grandes; alguns até guardam covis entre as copas da floresta. Os tesouros em geral são bem cuidados, organizados e cheios de tomos de saber e pergaminhos de magia, junto com antiguidades que colecionam por razões inescrutáveis. Muitos desses tesouros vêm de todo o globo, e mais de um aventureiro já sobreviveu a um encontro com um dragão cornífero afagando o ego e oferecendo artefatos raros ou saber perdido de culturas antigas.',
      },
      {
        id: 'horned-dragon-spellcasters',
        title: 'Conjuradores de dragão cornífero',
        body: `Conjuradores de dragão cornífero tendem a lançar as magias a seguir.

### Dragão Cornífero Jovem
**Magias primais preparadas** CD 26, ataque +20; **3º** _Dissipar Magia_, _Lentidão_, _Véu de Privacidade_, _Muralha de Espinhos_; **2º** _Forma Humanoide_, _Um com as Plantas_, _Corpo São_; **1º** _Rajada de Vento_, _Apagar Rastros_, _Ventriloquia_; **Truques (3º)** _Detectar Magia_, _Saber o Caminho_, _Luz_, _Ler Aura_, _Cipó Emaranhado_

### Dragão Cornífero Adulto
**Magias primais preparadas** CD 33, ataque +26; Como o dragão cornífero jovem, mais **5º** _Dissipar Magia_, _Nuvem Tóxica_, _Véu de Privacidade_; **4º** _Torrente Hidráulica_, _Resiliência da Montanha_, _Movimento Livre_; **Truques (5º)** _Detectar Magia_, _Saber o Caminho_, _Luz_, _Ler Aura_, _Cipó Emaranhado_

### Dragão Cornífero Ancião
**Magias primais preparadas** CD 39, ataque +33; Como o dragão cornífero adulto, mais **8º** _Dessecar_, _Ventos Punitivos_; **7º** _Executar_, _Máscara do Terror_, _Véu de Privacidade_; **6º** _Campo de Vida_, _Trepadeiras Emaranhadas_, _Visão Verdadeira_; **Truques (8º)** _Detectar Magia_, _Saber o Caminho_, _Luz_, _Ler Aura_, _Cipó Emaranhado_

### Arquidragão Cornífero
**Magias primais preparadas** CD 44, ataque +36; Como o dragão cornífero ancião, mais **10º** _Cataclismo_; **9º** _Implosão_, _Inimizade da Natureza_; **Truques (10º)** _Detectar Magia_, _Saber o Caminho_, _Luz_, _Ler Aura_, _Cipó Emaranhado_`,
      },
    ],
  }),
  fam({
    id: 'family-dragon-mirage',
    name: 'Dragão da Miragem',
    originalName: 'Dragon, Mirage',
    trait: null,
    sourcePage: 121,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=402',
    intro:
      'Dragões da miragem são mestres da magia de ilusão e usam os poderes para enganar os outros e avançar as próprias agendas. Além do domínio mágico, dragões da miragem possuem vários traços extras para ajudar nas caçadas ou despistar atacantes, como as escamas camufladoras e um sopro alucinatório que pode confundir vários inimigos de uma vez. Dragões da miragem são figuras vaidosas e egocêntricas. No fim, importam-se mais consigo do que com os outros.',
    sections: [
      {
        id: 'alternate-abilities',
        title: 'Habilidades alternativas',
        body: `Embora alguns dragões da miragem tendam ao combate corpo a corpo, outros dependem mais da magia para confundir inimigos. Para criar um dragão da miragem variante, substitua Mordida Alongada por uma das seguintes.

**Imagem Residual** (arcana, ilusão, forma de magia) **Frequência** uma vez por hora; **Requisitos** a próxima ação do dragão da miragem é lançar _Invisibilidade_; **Efeito** Conforme o dragão fica invisível, deixa um duplicata ilusório de si na posição original que dura 1 minuto. Uma criatura que determine que o duplicata é uma ilusão não necessariamente sabe que o dragão da miragem está invisível, e uma que possa ver a forma invisível não necessariamente sabe que o duplicata é uma ilusão. Quando o dragão da miragem Avança ou Voa, pode Sustentar a ilusão como ação livre para fazê-la Avançar ou Voar até 18 m, falar pela ilusão, ou fazer um Golpe de garra usando o modificador de ataque de magia do dragão na rolagem de ataque. Esse Golpe causa a mesma quantidade e tipo de dano de uma magia _Criatura Ilusória_ elevada ao círculo de magia mais alto do dragão. O dragão da miragem pode Dispensar a ilusão.

**Terror Fantasmal** (concentração, emoção, medo, ilusão, mental, visual) O dragão ou parece temporariamente estar em vários lugares ao mesmo tempo, ou cresce até tamanho Gargantuesco para amedrontar os inimigos. Cada inimigo numa emanação de 36 m que possa ver o dragão da miragem deve tentar uma salvaguarda de Vontade (com CD igual à da Exibição Cativante do dragão). **Sucesso crítico** O alvo não é afetado. **Sucesso** O alvo fica Amedrontado 1. **Falha** O alvo fica Amedrontado 2 e não pode usar reações até o início do próximo turno do dragão. **Falha crítica** Como falha, mas Amedrontado 3.

**Remodelar o Terreno** (arcana, concentração, ilusão) O dragão da miragem mistura ilusão e realidade numa emanação de 7,5 m. Uma criatura que entre na área deve passar numa salvaguarda de Vontade (a mesma CD da Exibição Cativante do dragão) ou tratar a área como terreno difícil. Criaturas que tentem uma salvaguarda contra esse efeito usam o mesmo resultado se saírem e reentrarem na área.

No turno, o arquidragão pode Sustentar esse efeito para mover as ilusões até 10,5 m cada, ou trocar de lugar com qualquer ilusão que esteja a até 9 m de si. Qualquer duplicata a mais de 18 m do arquidragão desaparece.`,
      },
      {
        id: 'dijansi',
        title: 'Dijansi',
        body: 'A vila de New Lipror, no sul de Jalmeray, guarda um segredo: ela não existe. O dragão da miragem Dijansi criou a vila ilusória inicialmente como forma de entretenimento. Com o tempo, a vila atraiu viajantes curiosos, que Dijansi convenceu a manter o segredo da vila e a lhe dar tesouros e adoração. Dijansi agora usa a vila para atrair mais patronos e saciar o desejo de riquezas e atenção.',
      },
      {
        id: 'mirage-dragon-lairs',
        title: 'Covis de dragão da miragem',
        body: 'O covil de um dragão da miragem está cheio dos tesouros típicos que se esperaria de um dragão. Diferente dos tesouros de outros dragões, um dragão da miragem cuida de polir cada moeda, gema e metal precioso até um brilho de espelho. Esses itens reflexivos são colocados de forma metódica pelo covil, permitindo que o dragão se veja de todos os ângulos a qualquer momento. Além das riquezas típicas, dragões da miragem também guardam espelhos nos tesouros para melhor coçar a comichão narcisista. Dragões da miragem tendem a guardar covis em ambientes naturais, mais adequados à camuflagem. Esses covis em geral ficam perto de lagos e outros corpos d’água grandes que servem de espelho natural adicional para o dragão.',
      },
      {
        id: 'mirage-dragon-spellcasters',
        title: 'Conjuradores de dragão da miragem',
        body: `Conjuradores de dragão da miragem tendem a lançar as magias a seguir.

### Dragão da Miragem Jovem
**Magias arcanas preparadas** CD 27, ataque +20; **4º** _Confusão_, _Visão da Morte_; **3º** _Disfarçar Magia_, _Cativar_, _Hipnotizar_; **2º** _Incorporar Mensagem_, _Luz Reveladora_, _Ver o Invisível_; **1º** _Fachada de Item_, _Servo Fantasmal_, _Ventriloquia_; **Truques (4º)** _Aturdir_, _Detectar Magia_, _Luz_, _Prestidigitação_, _Ler Aura_

### Dragão da Miragem Adulto
**Magias arcanas preparadas** CD 35, ataque +27; Como o dragão da miragem jovem, mais **6º** _Induzir ao Erro_, _Calamidade Fantasmal_; **5º** _Visão Falsa_, _Mensagem à Distância_, _Arrasto Telecinético_; **4º** _Forma de Vapor_; **Truques (6º)** _Aturdir_, _Detectar Magia_, _Luz_, _Prestidigitação_, _Ler Aura_

### Dragão da Miragem Ancião
**Magias arcanas preparadas** CD 43, ataque +35; Como o dragão da miragem adulto, mais **8º** _Desaparecimento_, _Alucinação_, _Mente Oculta_; **7º** _Contingência_, _Máscara do Terror_, _Projetar Imagem_; **6º** _Visão Verdadeira_; **Truques (8º)** _Aturdir_, _Detectar Magia_, _Luz_, _Prestidigitação_, _Ler Aura_

### Arquidragão da Miragem
**Magias arcanas preparadas** CD 45, ataque +37; Como o dragão da miragem ancião, mais **10º** _Manifestação_; **9º** _Fantasmagoria_, _Mansão Resplandecente_; **Truques (10º)** _Aturdir_, _Detectar Magia_, _Luz_, _Prestidigitação_, _Ler Aura_`,
      },
    ],
  }),
  fam({
    id: 'family-dragon-omen',
    name: 'Dragão do Presságio',
    originalName: 'Dragon, Omen',
    trait: null,
    sourcePage: 123,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=403',
    intro:
      'O destino é matéria caprichosa em Golarion. Mesmo com a profecia quebrada no mundo, há meios de olhar o futuro imediato ou adquirir uma noção vaga de eventos de longo prazo. Dragões do presságio estão fadados a ver o futuro — por nebuloso que seja — o tempo todo. Visões do futuro os perseguem como uma canção quieta que nunca para de tocar na mente. Embora um dragão do presságio possa focar ou ignorar a música do destino a qualquer momento, a canção toca do mesmo jeito. À primeira vista, dragões do presságio lembram outros dragões ocultos na aparência, salvo pela membrana interior espelhada das asas. As asas de um dragão do presságio oferecem vislumbres do futuro. Esses vislumbres são nublados e vagos, mas em geral corretos, ainda que só tecnicamente. Dragões do presságio têm uma compulsão natural de compartilhar os futuros que veem. Esses dragões não têm escrúpulos sobre o que as visões mostram e compartilham o conhecimento igualmente com aldeões inocentes e com tiranos vis.',
    sections: [
      {
        id: 'alternate-abilities',
        title: 'Habilidades alternativas',
        body: `Ser inundado com vislumbres nebulosos do futuro pode mudar o modo como um dragão do presságio usa os poderes. Você pode aplicar os ajustes a seguir a um dragão do presságio de qualquer idade.

Alguns dragões do presságio focam em ficar um passo à frente do destino, usando o que conseguem ver do futuro para contrapor ameaças imediatas ao abrir mão de parte da visão de longo prazo. Para fazer um dragão do presságio com essas habilidades, substitua Asas Proféticas pelo seguinte.

**Prevenido e Armado** (oculta) No início do dia, um dragão pode realizar um ritual de 10 minutos para se preparar para quaisquer lutas que possa ter no dia. O dragão escolhe um dos efeitos a seguir, que duram 24 horas.
**Destino Assegurado** (fortuna) Quando o dragão do presságio rola iniciativa, em vez de rolar, pode escolher ter um resultado igual a 13 + o modificador de iniciativa.
**Desafio Instintivo** Durante um encontro, o dragão ganha uma reação adicional no início do turno que só pode ser usada para Desafiar o Destino.

Alguns dragões do presságio conseguem manipular em parte os destinos de outras criaturas, ligando-os. Para fazer um dragão do presságio com essa habilidade, substitua Frenesi Dracônico pelo seguinte.

**Entrelaçar Destinos** (maldição, mental, oculta) O dragão do presságio cria um vínculo entre duas criaturas a até 18 m, entrelaçando os destinos por 1 rodada. A primeira vez durante essa duração em que uma das criaturas sofre dano, a outra sofre uma quantidade igual de dano mental, com salvaguarda básica de Vontade (CD igual à CD do Sopro do Destino do dragão).`,
      },
      {
        id: 'gurvallinn',
        title: 'Gurvallinn',
        body: 'O dragão do presságio Gurvallinn tornou-se visão comum na região do Olho do Pavor, em Avistão. O reaparecimento do lich Tar-Baphon trouxe muitos perigos para a região. Gurvallinn, assediado por incontáveis presságios, viaja entre as nações da região para compartilhar as visões com os locais, embora muitos desses avisos sejam vagos, tornando difícil agir com a informação.',
      },
      {
        id: 'omen-dragon-lairs',
        title: 'Covis de dragão do presságio',
        body: 'Dragões do presságio mantêm vários covis, como se futuros diferentes exigissem um covil distinto. Cada covil tem um tesouro menor que o de um dragão típico, mas esses tesouros parecem ter mais impacto. Além de riquezas, um dragão do presságio acumula itens de significância. Podem ser armas lendárias, curas para uma praga ainda por acontecer, ou outros itens que o dragão viu numa visão e reconhece como importantes. Muitos viajantes desesperados fazem a jornada até esses covis na esperança de achar o item milagroso que resolverá os problemas. Dragões do presságio estão abertos a compartilhar esses itens, mas se o dragão não tiver certeza do propósito do item, o visitante precisa assegurar ao dragão o destino do item — e não alguma possibilidade futura imprevista.',
      },
      {
        id: 'omen-dragon-spellcasters',
        title: 'Conjuradores de dragão do presságio',
        body: `Conjuradores de dragão do presságio tendem a lançar as magias a seguir.

### Dragão do Presságio Jovem
**Magias ocultas preparadas** CD 25, ataque +17; **3º** _Mensagem Onírica_, _Hipercognição_; **2º** _Mente Clara_, _Estado_, _Estupefazer_; **1º** _Comando_, _Medo_, _Proteção_; **Truques (3º)** _Aturdir_, _Detectar Magia_, _Saber o Caminho_, _Mensagem_, _Ler Aura_

### Dragão do Presságio Adulto
**Magias ocultas preparadas** CD 30, ataque +22; Como o dragão do presságio jovem, mais **5º** _Localizar_, _Onda de Desespero_; **4º** _Clarividência_, _Confusão_, _Ler Presságios_; **3º** _Localizar_; **Truques (5º)** _Aturdir_, _Detectar Magia_, _Saber o Caminho_, _Mensagem_, _Ler Aura_

### Dragão do Presságio Ancião
**Magias ocultas preparadas** CD 39, ataque +31; Como o dragão do presságio adulto, mais **7º** _Tanto Faz_, _Visões de Perigo_, _Distorcer a Mente_; **6º** _Repulsão_, _Escrutínio_, _Visão Verdadeira_; **5º** _Mensagem à Distância_; **Truques (7º)** _Aturdir_, _Detectar Magia_, _Saber o Caminho_, _Mensagem_, _Ler Aura_

### Arquidragão do Presságio
**Magias ocultas preparadas** CD 44, ataque +36; Como o dragão do presságio ancião, mais **9º** _Precognição_, _Visões de Perigo_; **8º** _Cores Confusas_, _Mente Oculta_, _Localizar com Precisão_; **Truques (9º)** _Aturdir_, _Detectar Magia_, _Saber o Caminho_, _Mensagem_, _Ler Aura_`,
      },
    ],
  }),
]
