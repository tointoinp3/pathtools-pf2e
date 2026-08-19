import type { CreatureFamily } from '@/types/creature'

function fam(
  partial: CreatureFamily,
): CreatureFamily {
  return partial
}

/**
 * Famílias AoN Monster Families destes livros (Remaster).
 * Asides = barras laterais oficiais. Sem blurb de membro.
 */
export const catalogCreatureFamiliesLostOmens: CreatureFamily[] = [
  fam({
    id: 'family-animated-handcraft',
    name: 'Artesanato animado',
    originalName: 'Animated Handcraft',
    trait: null,
    source: 'Tian Xia World Guide',
    sourcePage: 278,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=354',
    intro:
      'Muitos tipos de construtos, objetos e artesanatos animados existem em Tian Xia. Alguns, como os soldados de terracota de Lingshen, são bem conhecidos. Outros são mais raros. O artesanato animado tian é feito de materiais tradicionais de artesão, de raridade e esforço variáveis, e depende mais de perícia em Fabricação e de componentes de qualidade do que de conjuração simples.',
    sections: [
      {
        id: 'calligraphic-embellishments',
        title: 'Adornos caligráficos',
        body: 'A caligrafia é um acréscimo comum aos objetos animados de Tian Xia. Boa parte é decorativa, mas alguma carrega encantamentos que em geral funcionam como runas de arma até o construto se partir.',
      },
      {
        id: 'handcraft-creations',
        title: 'Criações artesanais',
        body: 'O artesanato animado varia muito na aparência, refletindo o temperamento e o gosto de quem o criou. Ao descrever objetos animados de origens diferentes, pense em como essas origens e tradições aparecem no resultado. Motivos comuns no artesanato tian incluem palha trançada, bordado de seda, madeira laqueada ou incrustações de madrepérola. Peças puramente decorativas podem ter elementos mais extravagantes, como peixes vivos em tanques de vidro ou pipas de seda vivas que duelam no céu acima de bairros ricos.',
      },
    ],
  }),
  fam({
    id: 'family-haunted-clockwork',
    name: 'Autômato de corda assombrado',
    originalName: 'Haunted Clockwork',
    trait: null,
    source: 'Tian Xia World Guide',
    sourcePage: 286,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=355',
    intro:
      'Os construtos das Cavernas do Clique compartilham o desenho de corda. O traço mais incomum é que se autorreplicam — ou, talvez, se reencarnam, pois animar um construto assombrado exige uma alma.',
    sections: [
      {
        id: 'eerie-adornment',
        title: 'Adorno sinistro',
        body: 'Todo construto assombrado anseia enfeitar a armação. Prezam materiais únicos, construções delicadas ou hábeis, e ornamentos. Além de decorar o corpo atual, usam esses materiais para construir um corpo novo à medida que o construto assombrado cresce e fica mais poderoso.',
      },
    ],
  }),
  fam({
    id: 'family-orchid-mantis',
    name: 'Louva-a-deus-orquídea',
    originalName: 'Orchid Mantis',
    trait: null,
    source: 'Tian Xia World Guide',
    sourcePage: 292,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=356',
    intro:
      'Poucas criaturas parecem tão belas quanto os louva-a-deus-orquídea. A forma elegante e a coloração lembram flores, e muita gente adota os insetos delicados como mascotes de vida curta. Embora esses insetos mundanos não sejam perigo para humanoides, ainda derrubam presas várias vezes maiores. Desdobrando-se da pose de flor, atacam com velocidade cegante, até perseguindo borboletas forrageiras com os braços denteados e a mordida poderosa.',
    sections: [
      {
        id: 'animal-masters',
        title: 'Mestres animais',
        body: 'Muitos seres sapientes gostam de se colocar acima do reino animal, mas a distância pode ser menor do que imaginam — e pega o arrogante de surpresa. Histórias tian falam de mestres que aprendem artes místicas ou marciais com animais, embora muitos eruditos descartem essas criaturas como seres poderosos apenas na forma animal. O louva-a-deus das cinco cores é um contra-argumento forte a essa tese, assim como animais que passam pela transformação em yaoguai. Contos mais raros falam de pássaros mímicos que conjuram magias que ouvem, ou de larvas que se encasulam em cascas de artefato e pupam em armas vivas.',
      },
      {
        id: 'colorful-companions',
        title: 'Companheiros coloridos',
        body: 'Louva-a-deus-orquídea são escolhas comuns de familiar, mesmo fora da área nativa. A critério do Mestre, esses familiares podem pegar a habilidade de familiar forma de planta, apesar de não serem plantas, para representar e realçar o camuflado excepcional.',
      },
      {
        id: 'elemental-blossoms',
        title: 'Flores elementais',
        body: 'Florestas intocadas, vales esquecidos e jardins medicinais escondem plantas que carregam essências elementais ou mágicas. Escondidos entre essas flores, os louva-a-deus ficam mais fortes com o ambiente rico, predando as outras criaturas fabulosas que vivem entre as flores, como as abelhas-boticárias.',
      },
    ],
  }),
  fam({
    id: 'family-failed-prophet',
    name: 'Profeta falho',
    originalName: 'Failed Prophet',
    trait: null,
    source: 'Shining Kingdoms',
    sourcePage: 180,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=563',
    intro:
      'Seguir os ensinamentos de Kalistrade é compromisso de uma vida. Exige adesão estudiosa às restrições e tabus das Profecias. A recompensa máxima dos devotos é a promessa de um além personalizado, cheio da riqueza de uma vida e livre do julgamento de Pharasma. Nem todos que aprendem essas revelações finais dão conta. Para os sortudos, uma morte simples é a única consequência de estragar o rito. Para os menos sortudos, o resultado é uma meia-vida indestrutível de tormento. Preso entre uma paródia distorcida do além imaginado e o Universo mortal, um profeta falho não terá paz até o corpo ser destruído.\n\nUm profeta falho lembra o cadáver esfolado de uma ancestralidade humanoide, coberto de rachaduras douradas brilhantes como veias. De perto, órgãos e musculatura são lisos e brilhantes de forma inatural, como couro curado e polido.',
    sections: [
      {
        id: 'creating-a-failed-prophet',
        title: 'Criando um profeta falho',
        body: 'Para criar um profeta falho, aplique os passos abaixo a qualquer criatura viva de pelo menos 10º nível que tenha falhado em executar corretamente o rito fúnebre kalistocrata.\n\nGanha o traço construto. Aumente o modificador de Prestidigitação para o bônus alto de perícia do nível do profeta falho, a menos que já fosse maior. Aumente em 1 a CA, os bônus de ataque, as CDs, Percepção, salvaguardas e modificadores de perícia.\n\nProfetas falhos ganham as habilidades a seguir. Se a criatura-base tiver habilidades que venham especificamente de ser viva, perde-as. Também perde traços que representavam a vida anterior à transformação, como humano ou humanoide.',
      },
      {
        id: 'failed-prophet-abilities',
        title: 'Habilidades de profeta falho',
        body: `**Sentido da Riqueza** O profeta falho detecta concentrações de moedas e outros objetos de valor como sentido impreciso com alcance de 18 m. Detecta qualquer criatura carregando moedas e tesouro cujo total seja pelo menos o custo médio de um item consumível do nível do profeta falho.

**Imunidades** sangramento, efeitos de morte, doença, condenado, drenado, fatigado, cura, ataques não letais, paralisado, veneno, enjoado, inconsciente, vitalidade, vazio

**Fraqueza** espírito 10; essa fraqueza sobe para 15 no 15º nível.

**Resistências** frio 10, eletricidade 10 e físico 10 (exceto concussão mágica); essas resistências sobem para 15 no 15º nível.

**Paisagem Mental Quebrada** (aura, ilusão, incapacitação, mental) 9 m. Uma criatura que entra na aura ou começa o turno nela deve tentar uma salvaguarda de Vontade. Use a CD de magia moderada do nível do profeta falho (GM Core 121).

Sucesso crítico A criatura não é afetada e fica imune a Paisagem Mental Quebrada por 1 minuto.
Sucesso A criatura fica Atordoada 1 enquanto visões desconexas da paisagem mental do profeta falho assaltam os sentidos.
Falha A mente da criatura é puxada para a paisagem mental do profeta falho. Fica Paralisada por 1 rodada. Enquanto paralisada, pode usar quaisquer ações com os traços mental ou espírito, ou que causem dano mental ou de espírito, como se essas ações fossem puramente mentais. Tais ações só têm linha de efeito até o profeta falho de origem e outras criaturas atualmente paralisadas por Paisagem Mental Quebrada, mas tratam todas essas criaturas como se estivessem adjacentes.
Falha crítica Como falha, mas a duração é 1 minuto ou até o profeta falho ser destruído, o que ocorrer primeiro.

**Tabus** Apesar do corpo transformado, a adesão de uma vida às restrições das Profecias de Kalistrade cravou as proibições filosóficas na alma. Sempre que um profeta falho sofre um acerto crítico de um ataque desarmado, sofre um acerto crítico ou falha crítica numa salvaguarda contra uma magia de toque, ou é exposto a um efeito de doença ou veneno (mesmo sendo imune), recebe penalidade de status −2 na CA, bônus de ataque, CDs, Percepção, salvaguardas e modificadores de perícia por 1 minuto. Quebrar outros tabus kalistocratas também pode disparar essa penalidade a critério do Mestre.

**Punhos** Profetas falhos têm um Golpe desarmado de punho que causa dano de concussão. Esse ataque tem o traço mágico, alcance 1,5 m a mais que a criatura-base, e dispara Agarrão Ganancioso. Use o bônus de ataque alto e o dano de Golpe moderado do nível do profeta falho.

**Agarrão Ganancioso** Requisitos: a última ação do profeta falho foi um Golpe de punho bem-sucedido que causou dano. Efeito: o profeta falho tenta um teste de Prestidigitação contra a CD de Reflexos do alvo. Em sucesso, furta moedas e gemas do alvo com o valor total indicado na tabela, até o máximo do que o alvo carrega. Objetos de valor em recipientes destrancados na pessoa do alvo podem ser tomados com a mesma facilidade dos carregados. Em sucesso crítico, o profeta falho rouba o dobro. Ganha uma quantidade de Pontos de Vida temporários igual ao valor furtado, que duram 1 minuto.

Nível 10–12: 5d10 po; 13–15: 6d10 po; 16–18: 7d10 po; 19–20: 8d10 po.

**Esta É a Minha Realidade!** (concentração) O profeta falho exerce controle sobre a paisagem mental em ruínas para ferir quem está preso nela. Pode tomar a forma de destroços caindo, desastres naturais ou o que mais o profeta falho imaginar. Seja qual for a forma, cada criatura atualmente paralisada pela Paisagem Mental Quebrada sofre dano de espírito com salvaguarda básica de Vontade. A CD usa a CD de magia alta do nível do profeta falho, e o dano usa o dano em área de uso ilimitado do nível do profeta falho.`,
      },
    ],
  }),
]
