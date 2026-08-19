import type { WornMagicActivation } from '@/types/equipment'

/** Textos completos (pt-BR) de itens mágicos Remaster com bloco Ativar, gerados do AoN. */
export interface WornItemText {
  description: string
  activations?: WornMagicActivation[]
}

export const WORN_ITEM_TEXT: Record<string, WornItemText> = {
  "Abidance Blinders": {
    description: "Antolhos de couro marrom-escuro que quase cobrem os olhos do animal, impedindo-o de ver os perigos. Leva 1 minuto para afixar num animal de atitude indiferente ou melhor. Só em animal domesticado sem treinamento de combate nem o traço lacaio. Com os antolhos, o animal não sofre amedrontado por estar em combate nem foge automaticamente. Sem um cavaleiro com a faixa pareada (trançada do mesmo couro), o Deslocamento cai para 3 m.\n\n**Ativar—Isso não pode machucar você** reação (concentrar, medo)\n**Frequência** 1 vez ao dia\n**Gatilho** Um animal a até 9 m com os antolhos pareados faz um salvaguarda contra um efeito de medo, antes de rolar\n**Efeito** Você concede +1 bônus de status em its salvaguarda against the triggering effect.",
    activations: [
  {
    name: "Isso não pode machucar você",
    actionType: "reaction",
    traits: ["Concentrate","Fear"],
    frequency: "1 vez ao dia",
    trigger: "Um animal a até 9 m com os antolhos pareados faz um salvaguarda contra um efeito de medo, antes de rolar",
    effect: "Você concede +1 bônus de status em a salvaguarda contra o efeito desencadeante.",
  },
    ],
  },
  "Aboutface Figurehead": {
    description: "Figura de proa com expressão de quem teme ser perseguido. Se o veículo tiver a habilidade lerdo, ela é suprimida.\n\n**Ativar—Meia-volta!** 1 ação (concentrar, movimento)\n**Frequência** 1 vez ao dia\n**Efeito** The figurehead turns its head as if to look behind it, spawning a momentary whirlpool under the ship and turbulent winds directly opposite the ship's heading. The ship makes a 180-degree turno in place, then continues heading in this new direction starting next turno.",
    activations: [
  {
    name: "Meia-volta!",
    actionType: "one",
    traits: ["Concentrate","Move"],
    frequency: "1 vez ao dia",
    effect: "A figura de proa vira a cabeça como se quisesse olhar para trás, gerando um redemoinho momentâneo sob o navio e ventos turbulentos diretamente opostos à direção do navio. O navio faz uma curva de 180 graus no local e continua seguindo nesta nova direção a partir da próxima curva.",
  },
    ],
  },
  "Accolade Robe": {
    description: "Veste de uma escola de mago. +2 de bônus de item em Arcanismo. Bolso extradimensional para 1 de Carga de grimórios, pergaminhos e material acadêmico (Carga leve). Ativações: Revisar e Crédito extra (ponto de foco de escola).\n\n**Ativar—Revisar** 1 ação (concentrar, manipular)\n**Efeito** Você recupera um item à sua escolha de the robe's storage, depois Recordar Conhecimento.\n\n**Ativar—Crédito extra** ação livre (concentrar)\n**Frequência** 1 vez ao dia\n**Efeito** Você ganha 1 ponto de foco, que você só pode gastar para conjurar a school magia. Se você don't spend this ponto de foco até o fim deste turno, ele é perdido.",
    activations: [
  {
    name: "Revisar",
    actionType: "one",
    traits: ["Concentrate","Manipulate"],
    effect: "Você recupera um item à sua escolha de armazenamento do manto, depois Recordar Conhecimento.",
  },
  {
    name: "Crédito extra",
    actionType: "free",
    traits: ["Concentrate"],
    frequency: "1 vez ao dia",
    effect: "Você ganha 1 ponto de foco, que você só pode gastar para conjurar a magia da escola. Se você não passar esse ponto de foco até o fim deste turno, ele estará perdido.",
  },
    ],
  },
  "Accolade Robe (Greater)": {
    description: "Versão maior: +3 em Arcanismo. Revisar é ação livre 1 vez por minuto.\n\n**Ativar—Revisar** 1 ação (concentrar, manipular)\n**Efeito** Você recupera um item à sua escolha de the robe's storage, depois Recordar Conhecimento.\n\n**Ativar—Crédito extra** ação livre (concentrar)\n**Frequência** 1 vez ao dia\n**Efeito** Você ganha 1 ponto de foco, que você só pode gastar para conjurar a school magia. Se você don't spend this ponto de foco até o fim deste turno, ele é perdido.",
    activations: [
  {
    name: "Revisar",
    actionType: "one",
    traits: ["Concentrate","Manipulate"],
    effect: "Você recupera um item à sua escolha de armazenamento do manto, depois Recordar Conhecimento.",
  },
  {
    name: "Crédito extra",
    actionType: "free",
    traits: ["Concentrate"],
    frequency: "1 vez ao dia",
    effect: "Você ganha 1 ponto de foco, que você só pode gastar para conjurar a magia da escola. Se você não passar esse ponto de foco até o fim deste turno, ele estará perdido.",
  },
    ],
  },
  "Accompaniment Cloak": {
    description: "Capa de veludo com músicos bordados que acompanham sua arte. +2 de item em Atuação.\n\n**Ativar** ação livre (concentrar, composition)\n**Frequência** 1 vez ao dia\n**Efeito** Você ganha 1 ponto de foco, which você pode use only to cast a bard composition magia. If not used by the end of seu turno, this ponto de foco is lost.\n\n**Ativar** 2 ações (concentrar, manipular)\n**Frequência** 1 vez ao dia\n**Efeito** Você peel the musicians from the garment and fling them around você. The cloak casts a 4º posto _phantom crowd_ magia (CD 28); each of the 3 m squares must be adjacent to você. The crowd looks like the musicians on the garment and continues to accompany seu Atuação testes. Você pode Sustain this effect as described in the magia.",
    activations: [
  {
    name: "",
    actionType: "free",
    traits: ["Concentrate","Composition"],
    frequency: "1 vez ao dia",
    effect: "Você ganha 1 ponto de foco, que você pode usar apenas para lançar uma magia de composição de bardo. Se não for utilizado até o final do seu turno, esse ponto de foco será perdido.",
  },
  {
    name: "",
    actionType: "two",
    traits: ["Concentrate","Manipulate"],
    frequency: "1 vez ao dia",
    effect: "Você tira os músicos da roupa e os joga ao seu redor. A capa lança uma magia 4º posto _multidão fantasma_ (CD 28); cada um dos quadrados de 3 m deve ser adjacente a você. A galera se parece com os músicos da vestimenta e continua acompanhando sua Atuação testes. Você pode sustentar esse efeito conforme descrito na magia.",
  },
    ],
  },
  "Admiral": {
    description: "This ostentatious hat is trimmed with gold thread and tiny jewels, all proclaiming seu position of authority on the high seas. Enquanto estiver vestindo the bicorne, você ganha a +2 bônus de item em Intimidação and Sailing Lore testes.\n\n**Ativar—Lutem!** reação (concentrar, medo)\n**Frequência** 1 vez ao dia\n**Gatilho** Você sofre dano from an inimigo’s Golpe or ataque de magia roll\n**Efeito** Despite seu wounds, seu troops are inspired to fight on. For 1 minute, all aliados in a 9 m emanation gain a +2 bônus de status em salvaguardas against fear effects.",
    activations: [
  {
    name: "Lutem!",
    actionType: "reaction",
    traits: ["Concentrate","Fear"],
    frequency: "1 vez ao dia",
    trigger: "Você sofre dano de um inimigo's Golpe ou ataque de magia roll",
    effect: "Apesar dos ferimentos, suas tropas estão inspiradas para continuar lutando. Por 1 minuto, todos os aliados em uma emanação de 9 meses ganham +2 de bônus de status em salvaguardas contra efeitos de medo.",
  },
    ],
  },
  "Admiral's Bicorne": {
    description: "Chapéu ostentoso com fio de ouro e joias minúsculas, proclamando autoridade no alto-mar. +2 de item em Intimidação e Conhecimento de Navegação.\n\n**Ativar—Lutem!** reação (concentrar, medo)\n**Frequência** 1 vez ao dia\n**Gatilho** Você sofre dano from an inimigo’s Golpe or ataque de magia roll\n**Efeito** Despite seu wounds, seu troops are inspired to fight on. For 1 minute, all aliados in a 9 m emanation gain a +2 bônus de status em salvaguardas against fear effects.",
    activations: [
  {
    name: "Lutem!",
    actionType: "reaction",
    traits: ["Concentrate","Fear"],
    frequency: "1 vez ao dia",
    trigger: "Você sofre dano de um inimigo's Golpe ou ataque de magia roll",
    effect: "Apesar dos ferimentos, suas tropas estão inspiradas para continuar lutando. Por 1 minuto, todos os aliados em uma emanação de 9 meses ganham +2 de bônus de status em salvaguardas contra efeitos de medo.",
  },
    ],
  },
  "Aeon Stone (Cymophane Cabochon)": {
    description: "Pedra éon: orbita a cabeça ao investir. Interagir para guardar; Desarmar pode arrancar. Guardada continua investida, mas os efeitos param até voltar a orbitar. +2 de item em Percepção e CDs contra Esconder-se, Furtar-se e Roubar. Ressonância (bússola de caminho): ver o invisível como magia inata arcana 1 vez ao dia.",
  },
  "Aeon Stone (Olivine Pendeloque)": {
    description: "Pedra éon: orbita a cabeça ao investir. Interagir para guardar; Desarmar pode arrancar. Guardada continua investida, mas os efeitos param até voltar a orbitar. +3 de item em salvaguardas contra efeitos que causam confuso, amedrontado ou estupefato.\n\n**Ativar—Terra quieta** reação (concentrar)\n**Frequência** 1 vez por hora\n**Gatilho** Você fica confuso, amedrontado, or aturdido\n**Efeito** The stone suppresses the triggering effect por 1 minuto, but the calming urges impose a –1 penalidade de status to seu rolagem de ataques.",
    activations: [
  {
    name: "Terra quieta",
    actionType: "reaction",
    traits: ["Concentrate"],
    frequency: "1 vez por hora",
    trigger: "Você fica confuso, amedrontado, or aturdido",
    effect: "A pedra suprime o efeito desencadeador por 1 minuto, mas os impulsos calmantes impõem –1 deliberação de status à sua rolagem de ataques.",
  },
    ],
  },
  "Aeon Stone (Polished Pebble)": {
    description: "Pedra éon: orbita a cabeça ao investir. Interagir para guardar; Desarmar pode arrancar. Guardada continua investida, mas os efeitos param até voltar a orbitar. +1 de item em salvaguardas de Fortitude e CDs contra tentativas de Agarrar ou Engolir você. Ressonância (bússola de caminho): graxa como magia inata primordial 1 vez ao dia (só superfícies, não objetos).",
  },
  "Aerial Cloak": {
    description: "Manto azul leve que pega o vento. +1 em pulos e em equilíbrio/manobrar em voo.\n\n**Ativar—Cair suavemente** reação (concentrar, air)\n**Frequência** 1 vez ao dia\n**Gatilho** Você're falling\n**Efeito** The cloak catches the air and você grab onto its edges, utilizing the draft to guide você to safety. Treat seu fall as 9 m shorter and glide to a space of seu choice at the bottom of seu fall, which must be within 6 m of where você would've landed.",
    activations: [
  {
    name: "Cair suavemente",
    actionType: "reaction",
    traits: ["Concentrate","Air"],
    frequency: "1 vez ao dia",
    trigger: "Você está falling",
    effect: "A capa captura o ar e você se agarra às bordas, utilizando a corrente de ar para guiá-lo para um local seguro. Trate sua queda como 9 m mais curta e deslize para um espaço de sua escolha na parte inferior de sua queda, que deve estar a 6 m de onde você teria caído.",
  },
    ],
  },
  "Alacritous Horseshoes": {
    description: "Ferraduras de ferro para cavalo ou companheiro quadrúpede. O animal investe: +5 pés de bônus de item no deslocamento terrestre, saltos melhores. Só o companheiro se beneficia.",
  },
  "Alacritous Horseshoes (Greater)": {
    description: "Versão maior: +10 pés de deslocamento terrestre e +3 em pulos. Só o companheiro investe.",
  },
  "Alchemist": {
    description: "No 1º você escolhe um campo: fórmulas extras, benefício, uso especial dos frascos versáteis, descoberta (5º), frascos avançados (11º) e descoberta maior (13º). Só campos Remaster (Player Core 2). Fonte: Player Core 2, pág. 59.\n\n**Ativar** 1 ação (concentrar)\n**Frequência** 1 vez ao dia\n**Requisitos** Você pode create versatile vials\n**Efeito** Você puxa a versatile vial from the satchel’s secondary compartment. It’s as effective as the vials você create at the start of the day, not limited like ones created using Quick Alchemy.",
    activations: [
  {
    name: "",
    actionType: "one",
    traits: ["Concentrate"],
    frequency: "1 vez ao dia",
    requirements: "Você pode create versatile vials",
    effect: "Você puxa frascos versáteis do compartimento secundário da mochila. É tão eficaz quanto os frascos que você cria no início do dia, não limitados como os criados com Quick Alchemy.",
  },
    ],
  },
  "Alchemist's Haversack": {
    description: "Mochila de couro. Compartimento principal: espaço extradimensional como bolsa espaçosa tipo II. Secundário: 2 Cargas (1 não conta no limite); pode\n\n**Ativar** 1 ação (concentrar)\n**Frequência** 1 vez ao dia\n**Requisitos** Você pode create versatile vials\n**Efeito** Você puxa a versatile vial from the satchel’s secondary compartment. It’s as effective as the vials você create at the start of the day, not limited like ones created using Quick Alchemy.",
    activations: [
  {
    name: "",
    actionType: "one",
    traits: ["Concentrate"],
    frequency: "1 vez ao dia",
    requirements: "Você pode create versatile vials",
    effect: "Você puxa frascos versáteis do compartimento secundário da mochila. É tão eficaz quanto os frascos que você cria no início do dia, não limitados como os criados com Quick Alchemy.",
  },
    ],
  },
  "Ally": {
    description: "Organizations generally buy these simple squares of fabric in large batches with an invisível symbol on each. They help armies composed of troops unfamiliar with each other, such as mercenaries or conscripts, to recognize allied units. The kerchiefs might be tied around the head, neck, or arm. They can also be used to root out impostors.\n\n**Ativar—Identificar aliados** ação livre (concentrar)\n**Gatilho** Você move within 4,5 m of a criatura wearing a matching _ally’s kerchief_\n**Efeito** The symbol magically glows above seu head. It’s invisível to everyone not invested in a matching _ally’s kerchief_.",
    activations: [
  {
    name: "Identificar aliados",
    actionType: "free",
    traits: ["Concentrate"],
    trigger: "Você move within 4,5 m of a criatura wearing a matching _ally’s kerchief_",
    effect: "O símbolo brilha magicamente acima de sua cabeça. É invisível para todos que não investem em um lenço de _aliado_ correspondente.",
  },
    ],
  },
  "Ally's Kerchief": {
    description: "Quadrados de tecido comprados em lote, com símbolo invisível. Ajudam exércitos de tropas que não se conhecem (mercenários, conscritos) a reconhecer unidades aliadas. Amarram-se na cabeça, pescoço ou braço; também denunciam impostores.\n\n**Ativar—Identificar aliados** ação livre (concentrar)\n**Gatilho** Você move within 4,5 m of a criatura wearing a matching _ally’s kerchief_\n**Efeito** The symbol magically glows above seu head. It’s invisível to everyone not invested in a matching _ally’s kerchief_.",
    activations: [
  {
    name: "Identificar aliados",
    actionType: "free",
    traits: ["Concentrate"],
    trigger: "Você move within 4,5 m of a criatura wearing a matching _ally’s kerchief_",
    effect: "O símbolo brilha magicamente acima de sua cabeça. É invisível para todos que não investem em um lenço de _aliado_ correspondente.",
  },
    ],
  },
  "Amaranthine Visage": {
    description: "Máscara de madeira de cerca de 60 cm, usada por líderes élficos da Mordant Spire, na forma da torre. As vísceras viram fumaça púrpura: resistência 10 a dano de precisão.\n\n**Ativar—Renovação eterna** reação (cura)\n**Frequência** 1 vez ao dia\n**Gatilho** Seu morrendo condition would reach the value that would cause você to die\n**Efeito** Você Sublimate Self. Você lose the morrendo condition, gaining or increasing seu ferido condition as normal, and gain fast healing 20 por 1 minuto. Você pode use Eternal Renewal even while inconsciente or otherwise unable to act.\n\n**Ativar—Sublimar a si** 2 ações (concentrar, polymorph)\n**Efeito** Seu body transforms completely into purple vapor for 5 minutes, with the effects of _vapor form_.",
    activations: [
  {
    name: "Renovação eterna",
    actionType: "reaction",
    traits: ["Healing"],
    frequency: "1 vez ao dia",
    trigger: "Sua condição morrendo atingiria o valor que faria você morrer",
    effect: "Você sublima a si mesmo. Você perde a condição de morrer, ganhando ou aumentando sua condição de ferido normalmente, e ganha cura rápida de 20 por 1 minuto. Você pode usar a Renovação Eterna mesmo quando estiver inconsciente ou incapaz de agir.",
  },
  {
    name: "Sublimar a si",
    actionType: "two",
    traits: ["Concentrate","Polymorph"],
    effect: "Seu corpo se transforma completamente em vapor roxo por 5 minutos, com efeitos de _forma de vapor_.",
  },
    ],
  },
  "Amphisbaena Handwraps": {
    description: "Faixas da pele de anfisbena; as mãos passam pelas bocas venenosas. Golpes desarmados ganham o traço versátil P. Aceitam runas de arma, como faixas dos golpes poderosos.\n\n**Ativar—Golpe de veneno gêmeo** 2 ações (manipular)\n**Frequência** 1 vez por hora\n**Efeito** Make two unarmed Golpes. Both Golpes count toward seu penalidade de ataques múltiplos, but the penalidade doesn’t increase until after both attacks. Each Golpe deals an additional 1d6 dano de veneno.",
    activations: [
  {
    name: "Golpe de veneno gêmeo",
    actionType: "two",
    traits: ["Manipulate"],
    frequency: "1 vez por hora",
    effect: "Faça dois Golpes desarmados. Ambos os Golpes contam para seu julgamento de ataques múltiplos, mas o julgamento só aumenta depois de ambos os ataques. Cada Golpe causa 1d6 de dano de veneno adicional.",
  },
    ],
  },
  "Amulet of the Hellcat": {
    description: "Amuleto de vidro numa gaiola de aço, com fragmento do coração de gato infernal. Vestido, +1 de item em Furtividade sob luz intensa; pode conjurar o truque luz pelo amuleto como magia inata divina.\n\n**Ativar—Salto invisível** 2 ações (concentrar, manipular)\n**Frequência** 1 vez ao dia\n**Requisitos** Você está in bright light\n**Efeito** Você fica invisível, Avançar up to seu speed, and then make a melee Golpe at the end of that movement. After making the Golpe, você está no longer invisível. If at any point during seu Avançar, você pass out of bright light, você está no longer invisível and must stop moving. Você may make a melee Golpe if você tem a alvo ao alcance.",
    activations: [
  {
    name: "Salto invisível",
    actionType: "two",
    traits: ["Concentrate","Manipulate"],
    frequency: "1 vez ao dia",
    requirements: "Você está in bright light",
    effect: "Você fica invisível, Avançar até sua velocidade, e depois dar um Golpe corpo a corpo ao final desse movimento. Depois de fazer o Golpe, você não fica mais invisível. Se em algum momento durante seu Avançar você sair da luz brilhante, você não estará mais invisível e deverá parar de se mover. Você pode fazer um golpe corpo a corpo se tiver um alvo ao alcance.",
  },
    ],
  },
  "Amulet of the Third Eye": {
    description: "Medalhão de latão em forma de olho, turquesa e azeviche. +2 de item em Percepção. Ao investir: Sabedoria +1 ou até +4, o que for maior.\n\n**Ativar** 2 ações (concentrar)\n**Frequência** 1 vez ao dia\n**Efeito** Você conjura _visão verdadeira_.",
    activations: [
  {
    name: "",
    actionType: "two",
    traits: ["Concentrate"],
    frequency: "1 vez ao dia",
    effect: "Você conjura _visão verdadeira_.",
  },
    ],
  },
  "Ancestral Geometry": {
    description: "Ângulos anões e histórias da família. Nas preparações diárias, uma visitação: role 2d20 e guarde o maior; 1d6 define Fortitude (1–2), Reflexos (3–4) ou Vontade (5–6). +1 de item numa perícia Saber ligada ao ancestral.\n\n**Ativar** reação (concentrar, destino)\n**Frequência** 1 vez ao dia\n**Gatilho** Você rolled a salvaguarda of the noted type\n**Efeito** Replace the roll with the d20 roll from seu ancestor's visitation.",
    activations: [
  {
    name: "",
    actionType: "reaction",
    traits: ["Concentrate","Fortune"],
    frequency: "1 vez ao dia",
    trigger: "Você rolou uma segurança do tipo anotado",
    effect: "Substitua o teste pelo teste d20 da visitação de seu ancestral.",
  },
    ],
  },
  "Anchor of Aquatic Exploration": {
    description: "Âncora picada que nunca perde o sal. Empunhada, você respira debaixo d’água, mas não Nada (perde natação, falha automática em Atletismo para Nadar). Ao entrar na água, afunda 7,5 m por rodada e anda no fundo com seu Deslocamento. Protegido de pressão, frio e descompressão.\n\n**Ativar** (manipular)\n**Frequência** 1 vez ao dia\n**Requisitos** Você está debaixo d’água\n**Efeito** Você gasta 1 minuto fincando a âncora no leito, depois do qual a âncora conjura _cabana aconchegante_, invocando um naufrágio em vez da cabana. O naufrágio fica cheio de ar respirável.",
    activations: [
  {
    name: "",
    traits: ["Manipulate"],
    frequency: "1 vez ao dia",
    requirements: "Você está debaixo d’água",
    effect: "Você gasta 1 minuto fincando a âncora no leito, depois do qual a âncora conjura _cabana aconchegante_, invocando um naufrágio em vez da cabana. O naufrágio fica cheio de ar respirável.",
  },
    ],
  },
  "Anglerfish Lantern": {
    description: "This bull's-eye lantern is either stylized after an anglerfish or made from the taxidermy of one. While it can be lit as usual, the anglerfish lantern automatically shines when submerged in water.\n\n**Ativar—Luzes hipnóticas** 2 ações (concentrar, manipular, aquatic, animals, water)\n**Frequência** 1 vez por hora\n**Efeito** All criaturas within the bright light of the anglerfish lantern deve passar num teste CD 19 salvaguarda de Vontade or be fascinado by the light por 1 rodada (1 minute on a critical failure). The fascination ends if the light is extinguished. Aquatic animals and criaturas with the water trait take a –2 penalidade de circunstância to this teste. Regardless of the result, the criatura then becomes immune to this effect for the next 24 hours.",
    activations: [
  {
    name: "Luzes hipnóticas",
    actionType: "two",
    traits: ["Concentrate","Manipulate","Aquatic","Animals","Water"],
    frequency: "1 vez por hora",
    effect: "Todas as criaturas dentro da luz brilhante da lanterna do tamboril devem passar num teste CD 19 segurança de Vontade ou ficar fascinado pela luz por 1 rodada (1 minuto em uma falha crítica). O fascínio acaba se a luz se apagar. Animais aquáticos e criaturas com a característica água recebem -2 de coincidência neste teste. Independentemente do resultado, a criatura torna-se imune a este efeito pelas próximas 24 horas.",
  },
    ],
  },
  "Anglerfish Lantern (Submersible)": {
    description: "This bull's-eye lantern is either stylized after an anglerfish or made from the taxidermy of one. While it can be lit as usual, the anglerfish lantern automatically shines when submerged in water. The CD is 24, and the lantern also has the following activation.\n\n**Ativar—Mergulhe!** (concentrar, manipular)\n**Frequência** 1 vez ao dia\n**Efeito** Você lower the _submersible anglerfish lantern_ into water at least 4,5 m deep while issuing a command. The lantern transforms into a bathysphere por 1 hora. This vehicle possesses a 18 m cone light that can be swiveled up to 90 degrees with an Interact ação and has the activation listed above. When the effect ends, any occupants are ejected harmlessly. If the bathysphere becomes broken, the effect ends and the _submersible anglerfish lantern_ is broken as well.",
    activations: [
  {
    name: "Mergulhe!",
    traits: ["Concentrate","Manipulate"],
    frequency: "1 vez ao dia",
    effect: "Você abaixa a _lanterna submersível de tamboril_ em água com pelo menos 4,5 m de profundidade enquanto emite um comando. A lanterna se transforma em batisfera por 1 hora. Este veículo possui um cone de luz de 18 m que pode ser girado até 90 graus com uma ação Interagir e possui o acionamento listado acima. Quando o efeito termina, todos os ocupantes são ejetados sem causar danos. Se a batisfera quebrar, o efeito termina e a _lanterna submersível de tamboril_ também se quebra.",
  },
    ],
  },
  "Anointed Waterskin": {
    description: "This waterskin coruscates with holy energy. After using any of the activations, the waterskin is empty, but slowly refills itself. It becomes full enough to use again at the next dawn.\n\n**Ativar—Bombardeio abençoado** 3 ações (concentrar, manipular)\n**Requisitos** The _anointed waterskin_ is full\n**Efeito** Você throw the _anointed waterskin_ up to 18 m. The water explodes out of it, with the effects of a CD 25 4º posto __holy cascade__.\n\n**Ativar—Decantação divina** (manipular)\n**Requisitos** The _anointed waterskin_ is full\n**Efeito** Você decant the water, creating up to 10 vials of _holy water_. Você deve provide the vials. Holy water created this clearly temporary upon inspection, and fades away after 8 hours.\n\n**Ativar—Gole sagrado** 1 ação (manipular)\n**Requisitos** The _anointed waterskin_ is full\n**Efeito** Você drink the water within the waterskin, granting você the effects of __bless__. As normal, você pode increase the magia’s radius by Sustaining it.",
    activations: [
  {
    name: "Bombardeio abençoado",
    actionType: "three",
    traits: ["Concentrate","Manipulate"],
    requirements: "O _odre ungido_ está cheio",
    effect: "Você joga o odre ungido até 18 m. A água explode, com os efeitos de um CD 25 4º posto __cascata sagrada__.",
  },
  {
    name: "Decantação divina",
    traits: ["Manipulate"],
    requirements: "O _odre ungido_ está cheio",
    effect: "Você decanta a água, criando até 10 frascos de _água benta_. Você deve fornecer os frascos. A água benta criou isso claramente temporário após a inspeção e desaparece após 8 horas.",
  },
  {
    name: "Gole sagrado",
    actionType: "one",
    traits: ["Manipulate"],
    requirements: "O _odre ungido_ está cheio",
    effect: "Você bebe a água dentro do odre, concedendo-lhe os efeitos de __bless__. Como de costume, você pode aumentar o raio da magia sustentando-a.",
  },
    ],
  },
  "Anti-Dragon Barding": {
    description: "Barda leve com espinhos de aço longos contra predadores aéreos (dragões, grifos, rocs). Companheiro animal: +2 de item na CD de Fortitude e Reflexos contra Agarrar, Reposicionar, Empurrar ou Derrubar; quem o Agarra sofre 1d4 perfurante.",
  },
  "Anti-Dragon Barding (Greater)": {
    description: "Barda leve com espinhos de aço longos contra predadores aéreos. Companheiro animal: +4 de item na CD de Fortitude e Reflexos contra Agarrar, Reposicionar, Empurrar ou Derrubar. Quem o Agarra sofre 3d4 perfurante.",
  },
  "Arachnolute": {
    description: "Alaúde em forma de aranha, cordas de teia de aranha golias. +2 de item em Performance ao tocar.\n\n**Ativar—Acorde de teia** 2 ações (manipular)\n**Frequência** 1 vez por hora\n**Efeito** Sticky webbing sprays in a 9 m cone as você strum the lute’s strings. Each criatura in the area of the webbing is imóvel unless it succeeds at a CD 29 salvaguarda de Reflexos.",
    activations: [
  {
    name: "Acorde de teia",
    actionType: "two",
    traits: ["Manipulate"],
    frequency: "1 vez por hora",
    effect: "Uma teia pegajosa é espalhada em um cone de 9 m enquanto você dedilha as cordas do alaúde. Cada criatura na área da teia é propriedade, a menos que obtenha sucesso em um CD 29 de salvaguarda de Reflexos.",
  },
    ],
  },
  "Arboreal Boots": {
    description: "Botas de couro com cenas da floresta. +1 de bônus de item em Acrobacia. Ignora terreno difícil de plantas e fungos.",
  },
  "Arboreal Boots (Greater)": {
    description: "Versão maior: +2 em Acrobacia e escalada de 10 pés em plantas ou fungos sem as mãos.",
  },
  "Arcane Standard": {
    description: "This magical banner has glittery, arcane threads crosswoven into the fabric, causing it to reflect light in little sparkles. While holding an _arcane standard_, você pode use the following ability.\n\n**Ativar—Fraqueza mágica** 1 ação (concentrar, acid, cold, electricity, fire, sonic)\n**Frequência** once per turno\n**Efeito** The magic of the banner causes energy to linger, tearing away at its alvo, leaving them vulnerable to more. One criatura within the banner’s aura that has taken acid, cold, electricity, fire, or dano sônico this turno gains fraqueza 5 to that dano type por 1 rodada.",
    activations: [
  {
    name: "Fraqueza mágica",
    actionType: "one",
    traits: ["Concentrate","Acid","Cold","Electricity","Fire","Sonic"],
    frequency: "uma vez por turno",
    effect: "A magia do estandarte faz com que a energia permaneça, destruindo seu alvo, deixando-o vulnerável a mais. Uma criatura dentro da aura do estandarte que tenha recebido ácido, frio, eletricidade, fogo ou dano sônico neste turno ganha fraqueza 5 naquele tipo de dano por 1 rodada.",
  },
    ],
  },
  "Arcane Standard (Greater)": {
    description: "This magical banner has glittery, arcane threads crosswoven into the fabric, causing it to reflect light in little sparkles. While holding an _arcane standard_, você pode use the following ability.\n\n**Ativar—Fraqueza mágica** 1 ação (concentrar, acid, cold, electricity, fire, sonic)\n**Frequência** once per turno\n**Efeito** The magic of the banner causes energy to linger, tearing away at its alvo, leaving them vulnerable to more. One criatura within the banner’s aura that has taken acid, cold, electricity, fire, or dano sônico this turno gains fraqueza 5 to that dano type por 1 rodada.",
    activations: [
  {
    name: "Fraqueza mágica",
    actionType: "one",
    traits: ["Concentrate","Acid","Cold","Electricity","Fire","Sonic"],
    frequency: "uma vez por turno",
    effect: "A magia do estandarte faz com que a energia permaneça, destruindo seu alvo, deixando-o vulnerável a mais. Uma criatura dentro da aura do estandarte que tenha recebido ácido, frio, eletricidade, fogo ou dano sônico neste turno ganha fraqueza 5 naquele tipo de dano por 1 rodada.",
  },
    ],
  },
  "Archivist": {
    description: "This strange contraption slides over seu eyes, supernaturally sharpening seu mind. While peering through it, você pode feel some entity whispering to você, telling all sorts of things about the subject of seu gaze. Você ganha +3 bônus de item em Ocultismo (though some entities might grant a bônus to a different skill, as determined by seu GM). Além disso, when você employ an exploration tactic other than Investigating, você also gain the benefits of Investigating unless você choose not to. When você invest the spectacles, você either increase seu Inteligência modifier by 1 or increase it to +4, whichever would give você the higher value. This gives você additional trained skills and languages, as normal for increasing seu Inteligência modifier. Você deve select skills and languages na primeira vez que você invest the item, and whenever você invest the same _archivist’s gaze_, você get the same skills and languages você picked na primeira vez que.\n\n**Ativar—Ajuda do além** 1 ação (concentrar, manipular)\n**Frequência** 1 vez por hora\n**Efeito** Adjusting the eyepiece’s focus and asking the entity for help, você cause the spectacles to cast either _see the unseen_ or a 3º posto _translate_ on você. Because the entity tied to the spectacles chooses which one, the GM picks whichever magia is most immediately useful in seu current situation (and chooses the most useful language cada vez que the item casts _translate_). The magia lasts por 1 minuto.",
    activations: [
  {
    name: "Ajuda do além",
    actionType: "one",
    traits: ["Concentrate","Manipulate"],
    frequency: "1 vez por hora",
    effect: "Ajustando o foco da ocular e pedindo ajuda à entidade, você faz com que os óculos lancem _ver o invisível_ ou um 3º posto _traduzir_ em você. Como a entidade ligada aos espetáculos escolhe qual deles, o Mestre escolhe a magia que é mais imediatamente útil em sua situação atual (e escolhe o idioma mais útil sempre que o item conjura _traduzir_). A magia dura 1 minuto.",
  },
    ],
  },
  "Archivist's Gaze": {
    description: "Artefato estranho sobre os olhos; uma entidade sussurra sobre o que você fita. +3 de item em Ocultismo (o mestre pode trocar a perícia). Ao explorar com outra tática que não Investigar, também ganha os benefícios de Investigar, salvo se recusar. Ao investir: Inteligência +1 ou até +4 (o que for maior); perícias e idiomas da primeira vez se repetem.\n\n**Ativar—Ajuda do além** 1 ação (concentrar, manipular)\n**Frequência** 1 vez por hora\n**Efeito** Adjusting the eyepiece’s focus and asking the entity for help, você cause the spectacles to cast either _see the unseen_ or a 3º posto _translate_ on você. Because the entity tied to the spectacles chooses which one, the GM picks whichever magia is most immediately useful in seu current situation (and chooses the most useful language cada vez que the item casts _translate_). The magia lasts por 1 minuto.",
    activations: [
  {
    name: "Ajuda do além",
    actionType: "one",
    traits: ["Concentrate","Manipulate"],
    frequency: "1 vez por hora",
    effect: "Ajustando o foco da ocular e pedindo ajuda à entidade, você faz com que os óculos lancem _ver o invisível_ ou um 3º posto _traduzir_ em você. Como a entidade ligada aos espetáculos escolhe qual deles, o Mestre escolhe a magia que é mais imediatamente útil em sua situação atual (e escolhe o idioma mais útil sempre que o item conjura _traduzir_). A magia dura 1 minuto.",
  },
    ],
  },
  "Arclord Eye": {
    description: "Olho num triângulo, em geral na testa; dizem que a tinta vem do Crux de Nex. Ao visar criatura oculta com efeito mágico ou magia, a CD do teste simples cai para 3.\n\n**Ativar—Abrir o olho** 1 ação (concentrar, manipular)\n**Frequência** 1 vez ao dia\n**Efeito** For the next 10 minutes, você ganha an imprecise magic sense with a range of 9 m. This allows você to detect magias, magical effects, and magical items within range. Você also learn the rank or level of such magical effects and their traits. Deceptive illusion magic is not detectable by this magic sense.",
    activations: [
  {
    name: "Abrir o olho",
    actionType: "one",
    traits: ["Concentrate","Manipulate"],
    frequency: "1 vez ao dia",
    effect: "Pelos próximos 10 minutos, você ganha um sentido mágico impreciso com alcance de 9 m. Isso permite que você detecte magias, efeitos mágicos e itens mágicos ao alcance. Você também aprende a classificação ou nível desses efeitos mágicos e suas características. A magia de ilusão enganosa não é detectável por este sentido mágico.",
  },
    ],
  },
  "Armbands of Athleticism": {
    description: "Faixas de couro nos braços. +2 de bônus de item em Atletismo. Sucesso ao Escaladar ou Nadar rende +5 pés de movimento.",
  },
  "Armbands of Athleticism (Greater)": {
    description: "Versão maior: +3 em Atletismo e +10 pés ao Escaladar ou Nadar com sucesso.",
  },
  "Armbands of the Gorgon": {
    description: "Braçadeiras azul-acinzentadas com cabeça de górgona. Contra magia ou efeito com incapacitação, trate sua salvaguarda um grau melhor e o teste para infligir o efeito um grau pior (como se tivesse mais que o dobro do posto). Ao investir: Constituição +1 ou até +4.\n\n**Ativar** 1 ação (manipular)\n**Frequência** 1 vez ao dia\n**Efeito** Você bate as braçadeiras uma na outra e remove uma condição à sua escolha que esteja o afetando. Se a condição for permanente, ela é suprimida por 1 hora.",
    activations: [
  {
    name: "",
    actionType: "one",
    traits: ["Manipulate"],
    frequency: "1 vez ao dia",
    effect: "Você bate as braçadeiras uma na outra e remove uma condição à sua escolha que esteja o afetando. Se a condição for permanente, ela é suprimida por 1 hora.",
  },
    ],
  },
  "Armory Bracelet (Greater)": {
    description: "Pulseira de latão com pingentes dos grupos arco, briga, clava, dardo, mangual, martelo, faca, picareta, arma de haste, escudo, funda, lança e espada (versões raras incluem arma de fogo).\n\n**Ativar** 2 ações (concentrar, manipular)\n**Frequência** 1 vez ao dia\n**Efeito** Você puxa one charm from the bracelet. The charm transforms into a arma of seu choice from the charm's arma group. If the arma requires ammunition, it appears with a quiver or pouch with 20 pieces of ammunition for the arma. A arma é a _+1 impacto_ arma of the type você chose. After 1 minute, the arma transforms into a non-magical version and remains until seu next daily preparations. At that point, the arma and any remaining ammunition crumble to dust and all the charms reappear on the bracelet. The arma and ammunition created with the charm are noticeably different from others and can't be sold.",
    activations: [
  {
    name: "",
    actionType: "two",
    traits: ["Concentrate","Manipulate"],
    frequency: "1 vez ao dia",
    effect: "Você puxa um pingente da pulseira. O amuleto se transforma em uma arma de sua escolha do grupo de armas do amuleto. Caso a arma necessite de munição, ela aparece com uma aljava ou bolsa com 20 munições para a arma. Uma arma é uma arma de _+1 impacto_ do tipo que você escolheu. Após 1 minuto, a arma se transforma em uma versão não mágica e permanece até os próximos preparativos diários. Nesse ponto, a arma e qualquer munição restante se transformam em pó e todos os amuletos reaparecem na pulseira. A arma e a munição criadas com o amuleto são visivelmente diferentes das outras e não podem ser vendidas.",
  },
    ],
  },
  "Armory Bracelet (Lesser)": {
    description: "Pulseira de latão com pingentes dos grupos arco, briga, clava, dardo, mangual, martelo, faca, picareta, arma de haste, escudo, funda, lança e espada (versões raras incluem arma de fogo).\n\n**Ativar** 2 ações (concentrar, manipular)\n**Frequência** 1 vez ao dia\n**Efeito** Você puxa one charm from the bracelet. The charm transforms into a arma of seu choice from the charm's arma group. If the arma requires ammunition, it appears with a quiver or pouch with 20 pieces of ammunition for the arma. A arma é a _+1 impacto_ arma of the type você chose. After 1 minute, the arma transforms into a non-magical version and remains until seu next daily preparations. At that point, the arma and any remaining ammunition crumble to dust and all the charms reappear on the bracelet. The arma and ammunition created with the charm are noticeably different from others and can't be sold.",
    activations: [
  {
    name: "",
    actionType: "two",
    traits: ["Concentrate","Manipulate"],
    frequency: "1 vez ao dia",
    effect: "Você puxa um pingente da pulseira. O amuleto se transforma em uma arma de sua escolha do grupo de armas do amuleto. Caso a arma necessite de munição, ela aparece com uma aljava ou bolsa com 20 munições para a arma. Uma arma é uma arma de _+1 impacto_ do tipo que você escolheu. Após 1 minuto, a arma se transforma em uma versão não mágica e permanece até os próximos preparativos diários. Nesse ponto, a arma e qualquer munição restante se transformam em pó e todos os amuletos reaparecem na pulseira. A arma e a munição criadas com o amuleto são visivelmente diferentes das outras e não podem ser vendidas.",
  },
    ],
  },
  "Armory Bracelet (Major)": {
    description: "Pulseira de latão com pingentes dos grupos arco, briga, clava, dardo, mangual, martelo, faca, picareta, arma de haste, escudo, funda, lança e espada (versões raras incluem arma de fogo).\n\n**Ativar** 2 ações (concentrar, manipular)\n**Frequência** 1 vez ao dia\n**Efeito** Você puxa one charm from the bracelet. The charm transforms into a arma of seu choice from the charm's arma group. If the arma requires ammunition, it appears with a quiver or pouch with 20 pieces of ammunition for the arma. A arma é a _+1 impacto_ arma of the type você chose. After 1 minute, the arma transforms into a non-magical version and remains until seu next daily preparations. At that point, the arma and any remaining ammunition crumble to dust and all the charms reappear on the bracelet. The arma and ammunition created with the charm are noticeably different from others and can't be sold.",
    activations: [
  {
    name: "",
    actionType: "two",
    traits: ["Concentrate","Manipulate"],
    frequency: "1 vez ao dia",
    effect: "Você puxa um pingente da pulseira. O amuleto se transforma em uma arma de sua escolha do grupo de armas do amuleto. Caso a arma necessite de munição, ela aparece com uma aljava ou bolsa com 20 munições para a arma. Uma arma é uma arma de _+1 impacto_ do tipo que você escolheu. Após 1 minuto, a arma se transforma em uma versão não mágica e permanece até os próximos preparativos diários. Nesse ponto, a arma e qualquer munição restante se transformam em pó e todos os amuletos reaparecem na pulseira. A arma e a munição criadas com o amuleto são visivelmente diferentes das outras e não podem ser vendidas.",
  },
    ],
  },
  "Armory Bracelet (Minor)": {
    description: "Pulseira de latão com pingentes dos grupos arco, briga, clava, dardo, mangual, martelo, faca, picareta, arma de haste, escudo, funda, lança e espada (versões raras incluem arma de fogo).\n\n**Ativar** 2 ações (concentrar, manipular)\n**Frequência** 1 vez ao dia\n**Efeito** Você puxa one charm from the bracelet. The charm transforms into a arma of seu choice from the charm's arma group. If the arma requires ammunition, it appears with a quiver or pouch with 20 pieces of ammunition for the arma. A arma é a _+1 impacto_ arma of the type você chose. After 1 minute, the arma transforms into a non-magical version and remains until seu next daily preparations. At that point, the arma and any remaining ammunition crumble to dust and all the charms reappear on the bracelet. The arma and ammunition created with the charm are noticeably different from others and can't be sold.",
    activations: [
  {
    name: "",
    actionType: "two",
    traits: ["Concentrate","Manipulate"],
    frequency: "1 vez ao dia",
    effect: "Você puxa um pingente da pulseira. O amuleto se transforma em uma arma de sua escolha do grupo de armas do amuleto. Caso a arma necessite de munição, ela aparece com uma aljava ou bolsa com 20 munições para a arma. Uma arma é uma arma de _+1 impacto_ do tipo que você escolheu. Após 1 minuto, a arma se transforma em uma versão não mágica e permanece até os próximos preparativos diários. Nesse ponto, a arma e qualquer munição restante se transformam em pó e todos os amuletos reaparecem na pulseira. A arma e a munição criadas com o amuleto são visivelmente diferentes das outras e não podem ser vendidas.",
  },
    ],
  },
  "Armory Bracelet (Moderate)": {
    description: "Pulseira de latão com pingentes dos grupos arco, briga, clava, dardo, mangual, martelo, faca, picareta, arma de haste, escudo, funda, lança e espada (versões raras incluem arma de fogo).\n\n**Ativar** 2 ações (concentrar, manipular)\n**Frequência** 1 vez ao dia\n**Efeito** Você puxa one charm from the bracelet. The charm transforms into a arma of seu choice from the charm's arma group. If the arma requires ammunition, it appears with a quiver or pouch with 20 pieces of ammunition for the arma. A arma é a _+1 impacto_ arma of the type você chose. After 1 minute, the arma transforms into a non-magical version and remains until seu next daily preparations. At that point, the arma and any remaining ammunition crumble to dust and all the charms reappear on the bracelet. The arma and ammunition created with the charm are noticeably different from others and can't be sold.",
    activations: [
  {
    name: "",
    actionType: "two",
    traits: ["Concentrate","Manipulate"],
    frequency: "1 vez ao dia",
    effect: "Você puxa um pingente da pulseira. O amuleto se transforma em uma arma de sua escolha do grupo de armas do amuleto. Caso a arma necessite de munição, ela aparece com uma aljava ou bolsa com 20 munições para a arma. Uma arma é uma arma de _+1 impacto_ do tipo que você escolheu. Após 1 minuto, a arma se transforma em uma versão não mágica e permanece até os próximos preparativos diários. Nesse ponto, a arma e qualquer munição restante se transformam em pó e todos os amuletos reaparecem na pulseira. A arma e a munição criadas com o amuleto são visivelmente diferentes das outras e não podem ser vendidas.",
  },
    ],
  },
  "Artificer Spectacles": {
    description: "Óculos retangulares de cobre. Só o usuário pode tirá-los. +3 de item em Ofício e em testes para Identificar Magia. Ao investir: Inteligência +1 ou até +4. Perícias e idiomas escolhidos na primeira vez se repetem.\n\n**Ativar** 2 ações (manipular)\n**Frequência** 1 vez por hora\n**Efeito** Você conjura a 3º posto _mending_ magia on an item você touch.",
    activations: [
  {
    name: "",
    actionType: "two",
    traits: ["Manipulate"],
    frequency: "1 vez por hora",
    effect: "Você conjura a 3º posto _mending_ magia on an item você touch.",
  },
    ],
  },
  "Ash Gown": {
    description: "Traje formal de fumaça e cinza. Resistência 5 a fogo, +1 em Intimidação.\n\n**Ativar—Passeio flamejante** 2 ações (manipular)\n**Frequência** 1 vez ao dia\n**Efeito** The ash gown ignites in a ferocious blaze, flames licking the floor and trailing behind você like a dancing cape. Você Avançar and make a Golpe at the end of seu movement. During the Avançar, seu flames incinerate minor obstacles in seu path; você ignore non-magical terreno difícil, and any você move through is destroyed. Creatures that are adjacent to você at any point during seu movement take 2d6 dano de fogo with a CD 23 Reflexos básico save. A criatura doesn't need to attempt this save more than once, even if você move past it multiple times.",
    activations: [
  {
    name: "Passeio flamejante",
    actionType: "two",
    traits: ["Manipulate"],
    frequency: "1 vez ao dia",
    effect: "O vestido cinza acende em uma chama feroz, chamas lambendo o chão e arrastando-se atrás de você como uma capa de dança. Você Avançar e fazer um Golpe no final do seu movimento. Durante o Avançar, suas chamas incineram pequenos obstáculos em seu caminho; você ignora terreno não mágico difícil, e qualquer movimento que você passar será destruído. Criaturas adjacentes a você em qualquer ponto durante seu movimento sofrem 2d6 de dano de fogo com um salvamento CD 23 Reflexosos básicos. Uma criatura não precisa tentar salvar mais de uma vez, mesmo que você passe por ele diversas vezes.",
  },
    ],
  },
  "Ash Gown (Greater)": {
    description: "Resistência 10 a fogo, +2 em Intimidação. Passeio flamejante a cada 10 minutos (4d6, CD 28).\n\n**Ativar—Passeio flamejante** 2 ações (manipular)\n**Frequência** 1 vez ao dia\n**Efeito** The ash gown ignites in a ferocious blaze, flames licking the floor and trailing behind você like a dancing cape. Você Avançar and make a Golpe at the end of seu movement. During the Avançar, seu flames incinerate minor obstacles in seu path; você ignore non-magical terreno difícil, and any você move through is destroyed. Creatures that are adjacent to você at any point during seu movement take 2d6 dano de fogo with a CD 23 Reflexos básico save. A criatura doesn't need to attempt this save more than once, even if você move past it multiple times.",
    activations: [
  {
    name: "Passeio flamejante",
    actionType: "two",
    traits: ["Manipulate"],
    frequency: "1 vez ao dia",
    effect: "O vestido cinza acende em uma chama feroz, chamas lambendo o chão e arrastando-se atrás de você como uma capa de dança. Você Avançar e fazer um Golpe no final do seu movimento. Durante o Avançar, suas chamas incineram pequenos obstáculos em seu caminho; você ignora terreno não mágico difícil, e qualquer movimento que você passar será destruído. Criaturas adjacentes a você em qualquer ponto durante seu movimento sofrem 2d6 de dano de fogo com um salvamento CD 23 Reflexosos básicos. Uma criatura não precisa tentar salvar mais de uma vez, mesmo que você passe por ele diversas vezes.",
  },
    ],
  },
  "Atlas Arcane": {
    description: "Pergaminho de velino gasto com fio dourado; mostra o entorno num raio de 58 km com detalhe razoável. +1 de item em Sobrevivência e em testes de perícia para Recordar Conhecimento relacionados ao local do mapa.\n\n**Ativar—Relatório de situação** 3 ações (auditivo, concentrar, detection, manipular)\n**Frequência** 1 vez ao dia\n**Efeito** Você speak a command phrase, and the map reveals the location of all troop movements within the area it maps. This intel is current the moment the phrase is spoken but does not update afterward, and moving the map does not reveal further intel.",
    activations: [
  {
    name: "Relatório de situação",
    actionType: "three",
    traits: ["Auditory","Concentrate","Detection","Manipulate"],
    frequency: "1 vez ao dia",
    effect: "Você fala uma frase de comando e o mapa revela a localização de todos os movimentos de tropas dentro da área mapeada. Esta informação é atual no momento em que a frase é falada, mas não é atualizada depois, e mover o mapa não revela mais informações.",
  },
    ],
  },
  "Avalanche Boots": {
    description: "Por dentro, couro forrado de pele; por fora, placas de ardósia. +3 de item em Atletismo e +2 de circunstância em Forçar Abertura e Empurrar. Ao investir: Força +1 ou até +4.\n\n**Ativar** ação livre (concentrar)\n**Frequência** 1 vez por hora\n**Gatilho** Você succeed or critically succeed with a Empurrar\n**Efeito** If the Empurrar was a success, você push seu opponent up to 3 m em vez de 1,5 m. If the Empurrar was a critical success, você push seu opponent up to 6 m, and você pode then choose to knock them caído.",
    activations: [
  {
    name: "",
    actionType: "free",
    traits: ["Concentrate"],
    frequency: "1 vez por hora",
    trigger: "Você teve sucesso ou sucesso crítico com um Empurrar",
    effect: "Se o Empurrar for um sucesso, você empurra seu oponente até 3 m em vez de 1,5 m. Se o Empurrar foi um sucesso crítico, você empurra seu oponente até 6 m, e você pode então optar por derrubá-lo.",
  },
    ],
  },
  "Backfire Mantle": {
    description: "Manto vermelho vivo, predileto de alquimistas e magos de batalha e de quem avança à frente da linha de explosões. Interpõe-se contra a magia sua e dos aliados: +1 de circunstância em Reflexos contra suas magias e as dos aliados, e resistência 3 a dano de respingo de seus itens alquímicos e dos aliados.",
  },
  "Backfire Mantle (Greater)": {
    description: "Manto vermelho vivo que se interpõe contra a magia sua e dos aliados. +2 de circunstância em Reflexos contra suas magias e as dos aliados, e resistência 10 a dano de respingo de seus itens alquímicos e dos aliados.",
  },
  "Bag of Weasels": {
    description: "Parece bolsa espaçosa tipo I. Ao tirar um item, teste simples CD 11: falha transforma o item em doninha (ou rato gigante) com aura mágica, sem lealdade. Contrapor devolve o item; morte da doninha destrói o item. Não vale para artefatos e itens difíceis de destruir.",
  },
  "Bands of Force": {
    description: "Aros de metal com gemas claras. Camada de força: +1 de bônus de item na CA e em salvaguardas, teto de Destreza +5. Talismãs como em armadura leve. Reação: Empurrar com +14.\n\n**Ativar—Devolver força** reação (force, manipular)\n**Gatilho** A criatura critically misses você with a melee Golpe.\n**Efeito** Você Empurrar the criatura using the bands' Atletismo modifier of +14.",
    activations: [
  {
    name: "Devolver força",
    actionType: "reaction",
    traits: ["Force","Manipulate"],
    trigger: "Uma criatura erra criticamente você com um Golpe corpo a corpo.",
    effect: "Você Empurrar a criatura usando o modificador de Atletismo da banda +14.",
  },
    ],
  },
  "Bands of Force (Greater)": {
    description: "Decorated with clear gemstones, these thick metal bands spread an inflexible layer of force over seu body. The force concede a você a +1 bônus de item em AC and salvaguardas, and a maximum Destreza modifier of +5 as armadura. Você pode affix talismans to the bands as though they were light armadura. The bônus de item em AC and saves is +2. The bands' Atletismo modifier is +21.\n\n**Ativar—Devolver força** reação (force, manipular)\n**Gatilho** A criatura critically misses você with a melee Golpe.\n**Efeito** Você Empurrar the criatura using the bands' Atletismo modifier of +14.",
    activations: [
  {
    name: "Devolver força",
    actionType: "reaction",
    traits: ["Force","Manipulate"],
    trigger: "Uma criatura erra criticamente você com um Golpe corpo a corpo.",
    effect: "Você Empurrar a criatura usando o modificador de Atletismo da banda +14.",
  },
    ],
  },
  "Bands of Force (Major)": {
    description: "Decorated with clear gemstones, these thick metal bands spread an inflexible layer of force over seu body. The force concede a você a +1 bônus de item em AC and salvaguardas, and a maximum Destreza modifier of +5 as armadura. Você pode affix talismans to the bands as though they were light armadura. The bônus de item em AC and saves is +3. The bands' Atletismo modifier is +33.\n\n**Ativar—Devolver força** reação (force, manipular)\n**Gatilho** A criatura critically misses você with a melee Golpe.\n**Efeito** Você Empurrar the criatura using the bands' Atletismo modifier of +14.",
    activations: [
  {
    name: "Devolver força",
    actionType: "reaction",
    traits: ["Force","Manipulate"],
    trigger: "Uma criatura erra criticamente você com um Golpe corpo a corpo.",
    effect: "Você Empurrar a criatura usando o modificador de Atletismo da banda +14.",
  },
    ],
  },
  "Banner of Creeping Death (Greater)": {
    description: "The very fabric of this off-putting magical banner seems to be rotting with a slick, foul texture. Traditionally, these banners were created from the uniforms of fallen inimigo troops, but this is considered a cruel and dishonorable practice by many modern nations. While holding a _banner of creeping death_, você pode use the following ability.\n\n**Ativar—Abraço do vazio** 1 ação (concentrar, vazio)\n**Frequência** 1 vez por minuto\n**Efeito** A massive wave of void energy floods out from the banner in all directions. All criatura vivas within the banner’s aura take 1d4+1 dano do vazio (CD 19 Fortitude básico save).",
    activations: [
  {
    name: "Abraço do vazio",
    actionType: "one",
    traits: ["Concentrate","Void"],
    frequency: "1 vez por minuto",
    effect: "Uma enorme onda de energia do vazio flui do estandarte em todas as direções. Todas as criaturas vivas dentro da aura do estandarte sofrem 1d4+1 dano do vazio (CD 19 Fortitude básico save).",
  },
    ],
  },
  "Banner of Creeping Death (Lesser)": {
    description: "The very fabric of this off-putting magical banner seems to be rotting with a slick, foul texture. Traditionally, these banners were created from the uniforms of fallen inimigo troops, but this is considered a cruel and dishonorable practice by many modern nations. While holding a _banner of creeping death_, você pode use the following ability.\n\n**Ativar—Abraço do vazio** 1 ação (concentrar, vazio)\n**Frequência** 1 vez por minuto\n**Efeito** A massive wave of void energy floods out from the banner in all directions. All criatura vivas within the banner’s aura take 1d4+1 dano do vazio (CD 19 Fortitude básico save).",
    activations: [
  {
    name: "Abraço do vazio",
    actionType: "one",
    traits: ["Concentrate","Void"],
    frequency: "1 vez por minuto",
    effect: "Uma enorme onda de energia do vazio flui do estandarte em todas as direções. Todas as criaturas vivas dentro da aura do estandarte sofrem 1d4+1 dano do vazio (CD 19 Fortitude básico save).",
  },
    ],
  },
  "Banner of Creeping Death (Major)": {
    description: "The very fabric of this off-putting magical banner seems to be rotting with a slick, foul texture. Traditionally, these banners were created from the uniforms of fallen inimigo troops, but this is considered a cruel and dishonorable practice by many modern nations. While holding a _banner of creeping death_, você pode use the following ability.\n\n**Ativar—Abraço do vazio** 1 ação (concentrar, vazio)\n**Frequência** 1 vez por minuto\n**Efeito** A massive wave of void energy floods out from the banner in all directions. All criatura vivas within the banner’s aura take 1d4+1 dano do vazio (CD 19 Fortitude básico save).",
    activations: [
  {
    name: "Abraço do vazio",
    actionType: "one",
    traits: ["Concentrate","Void"],
    frequency: "1 vez por minuto",
    effect: "Uma enorme onda de energia do vazio flui do estandarte em todas as direções. Todas as criaturas vivas dentro da aura do estandarte sofrem 1d4+1 dano do vazio (CD 19 Fortitude básico save).",
  },
    ],
  },
  "Banner of Creeping Death (Moderate)": {
    description: "The very fabric of this off-putting magical banner seems to be rotting with a slick, foul texture. Traditionally, these banners were created from the uniforms of fallen inimigo troops, but this is considered a cruel and dishonorable practice by many modern nations. While holding a _banner of creeping death_, você pode use the following ability.\n\n**Ativar—Abraço do vazio** 1 ação (concentrar, vazio)\n**Frequência** 1 vez por minuto\n**Efeito** A massive wave of void energy floods out from the banner in all directions. All criatura vivas within the banner’s aura take 1d4+1 dano do vazio (CD 19 Fortitude básico save).",
    activations: [
  {
    name: "Abraço do vazio",
    actionType: "one",
    traits: ["Concentrate","Void"],
    frequency: "1 vez por minuto",
    effect: "Uma enorme onda de energia do vazio flui do estandarte em todas as direções. Todas as criaturas vivas dentro da aura do estandarte sofrem 1d4+1 dano do vazio (CD 19 Fortitude básico save).",
  },
    ],
  },
  "Banner of Piercing Shards": {
    description: "Estandarte bordado com estilhaços e rachaduras, vermelho à distância (afixado ou empunhado). Enquanto o empunha:\n\n**Ativar—Estilhaços buscam feridas** 1 ação (concentrar)\n**Frequência** 1 vez por minuto\n**Efeito** Shards of sharpened glass violently shoot out from the magical banner into the newly opened wounds of a nearby inimigo. The magical banner deals 1d4 dano persistente de sangramento to any inimigo within the banner’s aura that has been dealt dano since the end of seu last turno.",
    activations: [
  {
    name: "Estilhaços buscam feridas",
    actionType: "one",
    traits: ["Concentrate"],
    frequency: "1 vez por minuto",
    effect: "Cacos de vidro afiado disparam violentamente do estandarte mágico para as feridas recém-abertas de um inimigo próximo. O estandarte mágico causa 1d4 dano persistente de sang a qualquer inimigo dentro da aura do estandarte que tenha recebido dano desde o final do seu último turno.",
  },
    ],
  },
  "Banner of Piercing Shards (Greater)": {
    description: "Estandarte bordado com estilhaços e rachaduras, vermelho à distância (afixado ou empunhado). Enquanto o empunha:\n\n**Ativar—Estilhaços buscam feridas** 1 ação (concentrar)\n**Frequência** 1 vez por minuto\n**Efeito** Shards of sharpened glass violently shoot out from the magical banner into the newly opened wounds of a nearby inimigo. The magical banner deals 1d4 dano persistente de sangramento to any inimigo within the banner’s aura that has been dealt dano since the end of seu last turno.",
    activations: [
  {
    name: "Estilhaços buscam feridas",
    actionType: "one",
    traits: ["Concentrate"],
    frequency: "1 vez por minuto",
    effect: "Cacos de vidro afiado disparam violentamente do estandarte mágico para as feridas recém-abertas de um inimigo próximo. O estandarte mágico causa 1d4 dano persistente de sang a qualquer inimigo dentro da aura do estandarte que tenha recebido dano desde o final do seu último turno.",
  },
    ],
  },
  "Banner of Piercing Shards (Major)": {
    description: "Estandarte bordado com estilhaços e rachaduras, vermelho à distância (afixado ou empunhado). Enquanto o empunha:\n\n**Ativar—Estilhaços buscam feridas** 1 ação (concentrar)\n**Frequência** 1 vez por minuto\n**Efeito** Shards of sharpened glass violently shoot out from the magical banner into the newly opened wounds of a nearby inimigo. The magical banner deals 1d4 dano persistente de sangramento to any inimigo within the banner’s aura that has been dealt dano since the end of seu last turno.",
    activations: [
  {
    name: "Estilhaços buscam feridas",
    actionType: "one",
    traits: ["Concentrate"],
    frequency: "1 vez por minuto",
    effect: "Cacos de vidro afiado disparam violentamente do estandarte mágico para as feridas recém-abertas de um inimigo próximo. O estandarte mágico causa 1d4 dano persistente de sang a qualquer inimigo dentro da aura do estandarte que tenha recebido dano desde o final do seu último turno.",
  },
    ],
  },
  "Banner of the Restful": {
    description: "Estandarte cor de pêssego (afixado ou empunhado). Você e aliados na emanação do estandarte ganham +1 de item nas CDs de Percepção e proteção contra frio e calor severos.",
  },
  "Banner of the Restful (Greater)": {
    description: "Estandarte cor de pêssego (afixado ou empunhado). Você e aliados na emanação do estandarte ganham +2 de item nas CDs de Percepção e proteção contra frio e calor severos.",
  },
  "Banner of the Restful (Major)": {
    description: "Estandarte cor de pêssego (afixado ou empunhado). Você e aliados na emanação do estandarte ganham +3 de item nas CDs de Percepção e proteção contra frio e calor severos.",
  },
  "Banner of the Rising Star": {
    description: "Estandarte escuro com uma estrela pálida visível mesmo à noite (afixado ou empunhado). Enquanto o empunha:\n\n**Ativar—Erguer-se** 1 ação (concentrar, cura)\n**Frequência** 1 vez por minuto\n**Efeito** The magical banner lifts seu aliados from the brink of death. An aliado within the banner’s aura with the morrendo condition regains 30 PV, does not increase their ferido condition, and can Stand as a ação livre. They become immune to Rise Up for 1 day.",
    activations: [
  {
    name: "Erguer-se",
    actionType: "one",
    traits: ["Concentrate","Healing"],
    frequency: "1 vez por minuto",
    effect: "A estandarte mágica tira seus aliados da beira da morte. Um aliado dentro da aura do estandarte com a condição morrendo recupera 30 PV, não aumenta sua condição ferido e pode ficar como uma ação livre. Eles se tornam imunes a Rise Up por 1 dia.",
  },
    ],
  },
  "Barding of the Zephyr": {
    description: "Barda leve com motivos de vento. Serve em qualquer companheiro. Quedas ativam aterrissagem suave. 1 vez ao dia, o animal voa 30 pés por 10 minutos.\n\n**Ativar—Alçar voo** 2 ações (manipular)\n**Frequência** 1 vez ao dia\n**Efeito** Você trace a finger along the wind motifs on the barding, granting seu companion wearing the barding a deslocamento de voo of 9 m por 10 minutos. Even if the companion doesn't have the mount special ability, it can still Voar while being ridden.",
    activations: [
  {
    name: "Alçar voo",
    actionType: "two",
    traits: ["Manipulate"],
    frequency: "1 vez ao dia",
    effect: "Você traça um dedo ao longo dos motivos do vento na barda, concedendo ao seu companheiro usando a barda uma deslocamento de voo de 9 m por 10 minutos. Mesmo que o companheiro não tenha a habilidade especial de montaria, ele ainda pode voar enquanto está montado.",
  },
    ],
  },
  "Barding Saddle": {
    description: "This saddle is covered with well-polished metal plates on the outside and adjusts to fit any mount.\n\n**Ativar—Pronta para a batalha** 2 ações (manipular)\n**Efeito** Você touch the metal plates of the saddle, which begin to unfold around the criatura, covering seu mount in heavy barding that extends from a simple-looking saddle. The Volume of the saddle is the same in either form, but seu mount isn’t affected by the restrictions or the benefits of wearing barding while it’s in saddle form. If the mount is already wearing barding, this has no effect. Você return the barding to saddle form by using the same activity.",
    activations: [
  {
    name: "Pronta para a batalha",
    actionType: "two",
    traits: ["Manipulate"],
    effect: "Você toca as placas de metal da sela, que começam a se desdobrar ao redor da criatura, cobrindo sua montaria com uma armadura pesada que se estende por uma sela de aparência simples. O volume da sela é o mesmo em qualquer forma, mas sua montaria não é afetada pelas restrições ou pelos benefícios de usar barda enquanto estiver na forma de sela. Se a montaria já estiver usando barding, isso não terá efeito. Você retorna o bardo à forma de sela usando a mesma atividade.",
  },
    ],
  },
  "Baton of the Fallen": {
    description: "Haste pálida de madeira com caveiras e rostos lamentosos dos mortos. Fria ao toque, esfria o ar e cheira a terra recém-revirada.\n\n**Ativar—Reunir os caídos** 3 ações (manipular, occult, vazio)\n**Frequência** 1 vez ao dia\n**Efeito** Você plant the baton into the ground, the soil softly parting to allow it to be solidly seated. Doing so summons a cloud of ghostly spirits in a 30- foot burst. All criaturas within the cloud become oculto, and all criaturas outside the cloud become oculto to criaturas within it. The spirits deal 8d6 dano do vazio to each criatura who enters or begins their turno in the cloud (CD 35 Fortitude básico). Você está unaffected by the cloud. This effect lasts 1 minute or ends if an adjacent criatura spends an Interact ação to knock the baton over.",
    activations: [
  {
    name: "Reunir os caídos",
    actionType: "three",
    traits: ["Manipulate","Occult","Void"],
    frequency: "1 vez ao dia",
    effect: "Você planta o bastão no chão, o solo se separando suavemente para permitir que ele fique firmemente assentado. Fazer isso invoca uma nuvem de espíritos fantasmagóricos em uma explosão de 9 metros. Todas as criaturas dentro da nuvem tornam-se ocultas, e todas as criaturas fora da nuvem tornam-se ocultas para as criaturas dentro dela. Os espíritos causam 8d6 dano do vazio a cada criatura que entra ou inicia seu turno na nuvem (CD 35 Fortitude básica). Você não é afetado pela nuvem. Este efeito dura 1 minuto ou termina se uma criatura adjacente gastar uma ação de Interagir para derrubar o bastão.",
  },
    ],
  },
  "Battle Medic": {
    description: "This short bronze rod has the form of a serpent coiled around it. While você hold it, você ganha a +1 bônus de item em Medicina testes.\n\n**Ativar** 2 ações (concentrar, manipular)\n**Frequência** 1 vez por hora\n**Requisitos** Você tem the Battle Medicina ação\n**Efeito** Você use Battle Medicina. O alvo is temporarily immune to seu Battle Medicina por 1 hora em vez de 1 day.",
    activations: [
  {
    name: "",
    actionType: "two",
    traits: ["Concentrate","Manipulate"],
    frequency: "1 vez por hora",
    requirements: "Você tem The Battle Medicina ação",
    effect: "Você use Battle Medicina. O alvo is temporarily immune to seu Battle Medicina por 1 hora em vez de 1 day.",
  },
    ],
  },
  "Battle Medic's Baton": {
    description: "Bastão de bronze com serpente enrolada. Empunhado, +1 de item em Medicina.\n\n**Ativar** 2 ações (concentrar, manipular)\n**Frequência** 1 vez por hora\n**Requisitos** Você tem the Battle Medicina ação\n**Efeito** Você use Battle Medicina. O alvo is temporarily immune to seu Battle Medicina por 1 hora em vez de 1 day.",
    activations: [
  {
    name: "",
    actionType: "two",
    traits: ["Concentrate","Manipulate"],
    frequency: "1 vez por hora",
    requirements: "Você tem The Battle Medicina ação",
    effect: "Você use Battle Medicina. O alvo is temporarily immune to seu Battle Medicina por 1 hora em vez de 1 day.",
  },
    ],
  },
  "Beacon of the Wilds": {
    description: "Estandarte que alivia os pés, às vezes chamado de bandeira da marcha (afixado ou empunhado). Você e aliados ignoram terreno difícil na emanação do estandarte.",
  },
  "Bedroll of Deep Slumber": {
    description: "Saco de dormir de algodão fino, recheio de plumas, bainha com sigilos das Terras dos Sonhos. Ao adormecer nele, ganha 5 PV temporários enquanto dorme e por 1 minuto após acordar, e +1 de status em salvaguardas contra efeitos mentais durante o sono (como a magia pesadelo).",
  },
  "Beguiling Crown": {
    description: "Coroa enorme de joias, ouro ondulante. Criaturas a 9 m melhoram a atitude em 1 passo (até amistoso); hostis ainda podem atacar. −4 de status na CD de Percepção contra Enganação. Ao investir: Carisma +1 ou até +4.\n\n**Ativar** 1 ação (concentrar)\n**Frequência** 1 vez por rodada\n**Efeito** Você're the subject of the _sanctuary_ magia até o fim do seu próximo turno.\n\n**Ativar** reação (concentrar)\n**Frequência** 1 vez por hora\n**Gatilho** A criatura succeeds at an rolagem de ataque against você\n**Efeito** The criatura deve passar num teste CD 41 salvaguarda de Vontade or the rolagem de ataque becomes a failure and o alvo is friendly to você until the end of its turno. On a critical failure, o alvo becomes friendly to você, drops to their knees, and begs seu forgiveness por 1 minuto or until another criatura takes a hostile ação against them.\n\n**Ativar** 2 ações (concentrar, destino, mental)\n**Frequência** 1 vez ao dia\n**Efeito** Choose one criatura viva within 9 m of você. That criatura deve passar num teste CD 41 Vontade salvaguarda or become helpful to você for the next 24 hours. If they succeed, they become friendly to você por 1 hora. If they critically succeed they're immune to this effect for 1 year.",
    activations: [
  {
    name: "",
    actionType: "one",
    traits: ["Concentrate"],
    frequency: "1 vez por rodada",
    effect: "Você é o assunto da magia do _santuário_ até o fim do seu próximo turno.",
  },
  {
    name: "",
    actionType: "reaction",
    traits: ["Concentrate"],
    frequency: "1 vez por hora",
    trigger: "Uma criatura consegue uma rolagem de ataque contra você",
    effect: "A criatura deve passar num teste CD 41 de segurança de Vontade ou a rolagem de ataque se torna um fracasso e o alvo é amigável com você até o final do seu turno. Em uma falha crítica, o alvo torna-se amigável com você, cai de joelhos e implora seu perdão por 1 minuto ou até que outra criatura tome uma ação hostil contra ele.",
  },
  {
    name: "",
    actionType: "two",
    traits: ["Concentrate","Fortune","Mental"],
    frequency: "1 vez ao dia",
    effect: "Escolha uma criatura viva a até 9 m de você. Essa criatura deve passar num teste CD 41 Vontade segurança ou tornar-se útil para você nas próximas 24 horas. Se tiverem sucesso, eles se tornarão amigáveis ​​com você por 1 hora. Se obtiverem sucesso crítico, ficarão imunes a esse efeito por 1 ano.",
  },
    ],
  },
  "Bellflower Toolbelt": {
    description: "Different versions of the _bellflower toolbelt_ are customized to appear to suit specific trades, so a belt used for carpentry would look different from a belt for baking.\n\n**Ativar** 2 ações (concentrar, manipular)\n**Efeito** Você place an object of up to 1 Volume into the belt, transforming that object into a tool befitting the trade for which the belt was created. Each object remains transformed until it has been removed from the belt for 24 hours or someone uses a single Interact ação to return it to its normal form. If enough transformed items are in it, the belt can be used as artisan's tools for that trade.",
    activations: [
  {
    name: "",
    actionType: "two",
    traits: ["Concentrate","Manipulate"],
    effect: "Você coloca um objeto de até 1 Volume no cinto, transformando esse objeto em uma ferramenta adequada ao ofício para o qual o cinto foi criado. Cada objeto permanece transformado até ser removido do cinto por 24 horas ou alguém usar uma única ação Interagir para devolvê-lo à sua forma normal. Se houver itens transformados suficientes nele, o cinto pode ser usado como ferramenta de artesão para esse comércio.",
  },
    ],
  },
  "Bellows Pipes": {
    description: "Gaita menor que as de fôlego, com foles de cotovelo e tubos de osso entalhado. +1 de item em Atuação ao tocar.\n\n**Ativar—Acordes manuais** 2 ações (auditivo, concentrar, manipular)\n**Frequência** 1 vez ao dia\n**Efeito** Você execute a complex set of complementary arpeggios for dramatic effect. Você and all aliados within a 4,5 m emanation gain a +1 bônus de status em the next rolagem de ataque, Percepção teste, salvaguarda, or teste de perícia você attempt before the end of seu next turno. Each alvo chooses which roll to use the bônus on before rolling.",
    activations: [
  {
    name: "Acordes manuais",
    actionType: "two",
    traits: ["Auditory","Concentrate","Manipulate"],
    frequency: "1 vez ao dia",
    effect: "Você executa um conjunto complexo de arpejos complementares para efeito dramático. Você e todos os aliados dentro de uma emanação de 4,5 m ganham +1 de bônus de status na próxima rolagem de ataque, Percepção teste, salvaguarda ou teste de perícia que você tenta antes do final do seu próximo turno. Cada alvo escolhe em qual jogada usar os bônus antes de rolar.",
  },
    ],
  },
  "Belt of Long Life": {
    description: "Cinto de couro grosso gravado com uma árvore antiga. Ao investir, o modificador de Constituição sobe em 1 ou vai a +4, o que for maior. Na primeira vez que investir no dia, ganha 15 PV temporários.\n\n**Ativar—Invocar a vida antiga** 1 ação (manipular)\n**Frequência** 1 vez ao dia\n**Efeito** Você recorre à energia vital da árvore no cinto para obter cura rápida. Por 2d4 rodadas, no início do seu turno a cada rodada, você recupera 15 PV.",
    activations: [
  {
    name: "Invocar a vida antiga",
    actionType: "one",
    traits: ["Manipulate"],
    frequency: "1 vez ao dia",
    effect: "Você recorre à energia vital da árvore no cinto para obter cura rápida. Por 2d4 rodadas, no início do seu turno a cada rodada, você recupera 15 PV.",
  },
    ],
  },
  "Benthic Drums": {
    description: "Bumbo de madeira de deriva e couro de baleia, com formas sinistras entalhadas. +2 de item em Atuação ao tocar. Ao tocar, comunica ideias básicas a baleias e outros animais marinhos grandes.\n\n**Ativar—Chamado das profundezas** 3 ações (concentrar, emoção, medo, manipular, mental, sonic)\n**Frequência** 1 vez por semana\n**Efeito** Você drum a song of an ancient criatura, calling forth the cries of a great whale in the minds of seu foes. All inimigos in a 18 m emanation take 9d10 dano sônico (CD 36 Vontade básico save). Creatures who fail are also amedrontado 1.",
    activations: [
  {
    name: "Chamado das profundezas",
    actionType: "three",
    traits: ["Concentrate","Emotion","Fear","Manipulate","Mental","Sonic"],
    frequency: "1 vez por semana",
    effect: "Você tamborila a canção de uma criatura antiga, evocando os gritos de uma grande baleia nas mentes de seus inimigos. Todos os inimigos em uma emanação de 18 m levam 9d10 de dano sônico (CD 36 Vontade básico save). Criaturas que falham também são amedrontadas 1.",
  },
    ],
  },
  "Berserker": {
    description: "This bearskin includes the head and bared teeth of the mighty criatura from which it was taken. When worn, the cloak drapes over seu head and around seu shoulders, imbuing você with a bear's ferocity. If você tem the Rage ação, while raging, você grow jaws that deal 1d10 dano perfurante and claws that deal 1d6 dano cortante and have the agile trait. This transformation is a morph effect, and both the jaws and claws are unarmed attacks in the brawling arma group. Você ganha the benefits of a +1 _weapon potency rune_ and a _impacto rune_ with these attacks (gaining a +1 bônus de item em rolagem de ataques and increasing the number of dano da arma dice by one). If você tem an animal instinct and the bestial rage instinct ability, em vez de gaining these unarmed attacks, seu unarmed attacks from the bestial rage instinct ability gain the benefits of a _+2 arma potency rune_ and a _impacto maior rune _ (granting a +2 bônus de item em rolagem de ataques and increasing the number of dano da arma dice by two).",
  },
  "Berserker's Cloak": {
    description: "Pele de urso com cabeça e dentes. Em fúria, mandíbulas e garras mágicas (ou runas melhores se for instinto animal com fúria bestial).",
  },
  "Berserker's Cloak (Greater)": {
    description: "Pele de urso. Em fúria, desarmados com potência +2 e impactante maior (ou +3 e impactante máximo no instinto animal com fúria bestial).",
  },
  "Blakenshipper": {
    description: "Instrumento vestido e tocado: tubos num braço de metal, trompa, tambor com pedal, foles, teclas, címbalos e mais. +1 de item em Atuação ao tocar.\n\n**Ativar—Ser a banda** 3 ações (auditivo, concentrar, manipular)\n**Frequência** 1 vez ao dia\n**Efeito** Você work double-time, playing an entire band’s composition yourself, bolstering those around você by seu mighty effort. Você and all aliados within a 18 m emanation gain 15 PV temporários that last por 1 rodada. For the next minute, você pode Sustain to continue the music, granting você and all aliados within a 18 m emanation 5 PV temporários that last por 1 rodada; this Sustain ação gains the auditory and manipulate traits.",
    activations: [
  {
    name: "Ser a banda",
    actionType: "three",
    traits: ["Auditory","Concentrate","Manipulate"],
    frequency: "1 vez ao dia",
    effect: "Você trabalha em dobro, tocando você mesmo uma composição inteira da banda, apoiando aqueles ao seu redor com seu grande esforço. Você e todos os aliados dentro de uma emanação de 18 milhões ganham 15 PV temporários que duram por 1 rodada. Para o próximo minuto, você pode Sustentar para continuar a música, concedendo a você e todos os aliados dentro de uma emanação de 18 m 5 PV temporários que duram por 1 rodada; esta ação Sustentar ganha traços auditivos e manipuladores.",
  },
    ],
  },
  "Blazing Banner": {
    description: "Estandarte em vermelhos, laranjas e amarelos como chama (afixado ou empunhado). Sempre que você ou aliado na emanação do estandarte obtém sucesso crítico num Golpe, o Golpe causa +1d4 de fogo persistente.",
  },
  "Blazing Banner (Greater)": {
    description: "Estandarte em vermelhos, laranjas e amarelos como chama (afixado ou empunhado). Sempre que você ou aliado na emanação do estandarte obtém sucesso crítico num Golpe, o Golpe causa +1d6 de fogo persistente.",
  },
  "Blazing Banner (Major)": {
    description: "Estandarte em vermelhos, laranjas e amarelos como chama (afixado ou empunhado). Sempre que você ou aliado na emanação do estandarte obtém sucesso crítico num Golpe, o Golpe causa +1d8 de fogo persistente.",
  },
  "Blazons of Shared Power": {
    description: "Emblemas de latão, em geral com heráldica; vêm em jogo de três. Ao investir, use um no peito e prenda os outros em duas armas de uma mão (corpo a corpo ou à distância), uma primária e uma secundária. Enquanto empunhar as duas, a secundária ganha as runas fundamentais da primária. Uma arma só aceita um brasão por vez.",
  },
  "Blazons of Shared Power (Greater)": {
    description: "Jogo de três emblemas: um no peito, os outros em duas armas de uma mão (primária e secundária). Enquanto empunhar as duas, a secundária ganha as runas fundamentais da primária e também as de propriedade, se cumprir os pré-requisitos da runa e não for arma específica. As próprias runas da secundária ficam suprimidas. Ao investir, pode optar por transferir só as fundamentais (como os brasões comuns). Uma arma só aceita um brasão por vez.",
  },
  "Blood Pack Squib": {
    description: "Pedra pequena ligada a um pacote de sangue falso (1 minuto para associar).\n\n**Ativar—Estourar a mochila** 1 ação (manipular)\n**Requisitos** The _blood pack squib_ must be within 6 m of its associated fake blood pack\n**Efeito** Você lightly squeeze the stone and the fake blood pack dramatically bursts. The criatura wearing the fake blood pack gains the benefits of a punctured fake blood pack. A single criatura adjacent to the criatura wearing the fake blood pack deve passar num teste CD 16 salvaguarda de Reflexos or be splattered with the fake blood, becoming ofuscado until the end of their next turno. Você pode also activate the blood pack squib as a reação when the fake blood pack is punctured normally.",
    activations: [
  {
    name: "Estourar a mochila",
    actionType: "one",
    traits: ["Manipulate"],
    requirements: "O _aborto da bolsa de sangue_ deve estar a 6 m da bolsa de sangue falsa associada",
    effect: "Você aperta levemente a pedra e a bolsa de sangue falsa explode dramaticamente. A criatura que usa a bolsa de sangue falsa ganha os benefícios de uma bolsa de sangue falsa perfurada. Uma única criatura adjacente à criatura que estiver usando a bolsa de sangue falso deve passar num teste CD 16 de proteção de Reflexos ou ser respingada com o sangue falso, ficando ofuscado até o final do próximo turno. Você também pode ativar o aborto da bolsa de sangue como uma ocorrência quando a bolsa de sangue falsa é perfurada normalmente.",
  },
    ],
  },
  "Bloodburn Censer": {
    description: "The exterior of this egg-shaped brass censer is polished to a mirror-like sheen. Several rings are attached to its sides at regular intervals. The top of the censer's lid is decorated with a pair of intertwining snakes.\n\n**Ativar—Acender incenso** 2 ações (aura, manipular)\n**Frequência** 1 vez ao dia\n**Efeito** A piping, reddish smoke pours from the censer in a 6 m emanation. Você choose whether the smoke causes o alvo's blood to turno extremely hot or transmutes to poison; the smoke deals seu choice of fire or dano de veneno. Each criatura viva that's in the area or enters it attempts a CD 34 Fortitude salvaguarda, then becomes temporarily immune por 1 hora. **Sucesso crítico** The criatura is unaffected. **Sucesso** The criatura breathes in a small amount of the poisonous smoke and takes 2d6 dano persistente. **Falha** The criatura gulps down a lungful of the smoke, taking 4d6 dano persistente and becoming enfraquecido 2 until the dano persistente ends. **Falha crítica** The criatura inhales a large amount of the smoke, taking 6d6 dano persistente and becoming enfraquecido 3 until the dano persistente ends.",
    activations: [
  {
    name: "Acender incenso",
    actionType: "two",
    traits: ["Aura","Manipulate"],
    frequency: "1 vez ao dia",
    effect: "Uma fumaça avermelhada e estridente sai do incensário em uma emanação de 6 m. Você escolhe se a fumaça faz com que o sangue do alvo fique extremamente quente ou se transmuta em veneno; a fumaça causa sua escolha de fogo ou dano de veneno. Cada criatura viva que estiver na área ou entrar nela tenta uma salvaguarda de Fortitude CD 34, depois torna-se temporariamente imune por 1 hora. **Sucesso crítico** A criatura não é afetada. **Sucesso** A criatura respira uma pequena quantidade da fumaça venenosa e sofre 2d6 de dano persistente. **Falha** A criatura engole uma baforada de fumaça, sofrendo 4d6 de dano persistente e se tornando enfraquecido 2 até que o dano persistente termine. **Falha crítica** A criatura inala grande quantidade de fumaça, sofrendo 6d6 de dano persistente e ficando enfraquecido 3 até que o dano persistente acabe.",
  },
    ],
  },
  "Bloodletting Kukri": {
    description: "Kukri +1 impactante de lâmina carmim. No crítico: 1d8 de sangramento persistente. Se o alvo ainda não tinha sangramento, você ganha 1d8 PV temporários por 1 minuto.",
  },
  "Bloodline Robe": {
    description: "Each _bloodline robe_ has a design that befits a particular sorcerer bloodline, depicting criaturas of that bloodline or using styles common among them. Você ganha +2 bônus de item em each of seu bloodline skills.\n\n**Ativar** 1 ação (concentrar)\n**Frequência** 1 vez ao dia\n**Requisitos** Você're benefiting from seu blood magic effect\n**Efeito** Você're acelerado on seu next turno. Você pode use the extra ação only as part of Casting a bloodline magia.\n\n**Ativar** ação livre (concentrar)\n**Frequência** 1 vez ao dia\n**Efeito** Você ganha 1 ponto de foco, which você pode use only to cast a sorcerer bloodline magia. If not used by the end of seu turno, this ponto de foco is lost.",
    activations: [
  {
    name: "",
    actionType: "one",
    traits: ["Concentrate"],
    frequency: "1 vez ao dia",
    requirements: "Você está se beneficiando do seu efeito mágico de sangue",
    effect: "Você está acelerado no seu próximo turno. Você pode usar a ação extra apenas como parte da magia Casting a bloodline.",
  },
  {
    name: "",
    actionType: "free",
    traits: ["Concentrate"],
    frequency: "1 vez ao dia",
    effect: "Você ganha 1 ponto de foco, que você pode usar apenas para lançar uma magia de linhagem de feiticeiro. Se não for utilizado até o final do seu turno, esse ponto de foco será perdido.",
  },
    ],
  },
  "Bloodstained Waistcoat": {
    description: "Colete branco com mancha carmesim indelével. Imbuído da agonia de um camarada que sangrou até morrer. A CD do teste simples para encerrar sangramento persistente é 10 (não 15), e 5 se outra criatura usar ação especialmente apropriada.\n\n**Ativar—Estancar sangramento** 1 ação (manipular)\n**Frequência** 1 vez ao dia\n**Efeito** The stain on the _bloodstained waistcoat_ gets slightly larger as você bleed in lieu of an aliado. The waistcoat ends a persistent bleed condition for one aliado within 9 m, but você ganha that condition with the same parameters.",
    activations: [
  {
    name: "Estancar sangramento",
    actionType: "one",
    traits: ["Manipulate"],
    frequency: "1 vez ao dia",
    effect: "A mancha no _colete manchado de sangue_ fica um pouco maior conforme você sangra no lugar de um aliado. O colete encerra uma condição de sangramento persistente para um aliado em um raio de 9 m, mas você ganha essa condição com os mesmos parâmetros.",
  },
    ],
  },
  "Bloodstride Boots": {
    description: "These red leather boots greedily absorb any blood they touch.\n\n**Ativar—Salto de sangue** 2 ações (concentrar, manipular)\n**Frequência** 1 vez por hora\n**Efeito** The boots produce a small pool of blood beneath seu feet and in a free space você pode see within 36 m. Você melt into the pool beneath você and reconstitute at the other pool, with the effects of _translocate_.\n\n**Ativar—Caminhada de sangue** (concentrar, manipular)\n**Frequência** 1 vez ao dia\n**Requisitos** Você’re standing in blood\n**Efeito** Você melt into the ground and reconstitute at a location você tem previously seen that’s within 160 km, with the effects of _translocate_. This effect fails if no sentient criatura has died at that location in the past 24 hours.",
    activations: [
  {
    name: "Salto de sangue",
    actionType: "two",
    traits: ["Concentrate","Manipulate"],
    frequency: "1 vez por hora",
    effect: "As botas produzem uma pequena poça de sangue sob seus pés e em um espaço livre você pode ver dentro de 36 m. Você derrete na piscina abaixo de você e se reconstitui na outra piscina, com os efeitos de _translocar_.",
  },
  {
    name: "Caminhada de sangue",
    traits: ["Concentrate","Manipulate"],
    frequency: "1 vez ao dia",
    requirements: "Você’re standing in blood",
    effect: "Você derrete no solo e se reconstitui em um local visto anteriormente que fica a 160 km, com os efeitos de _translocar_. Este efeito falha se nenhuma criatura senciente tiver morrido naquele local nas últimas 24 horas.",
  },
    ],
  },
  "Bolka's Blessing": {
    description: "Runa de filigrana na adaga de clã: +1 de item em Diplomacia e em Percepção para Sentir Motivação.\n\n**Ativar—Dádiva da vida** 1 ação (concentrar, cura, vitalidade)\n**Frequência** 1 vez ao dia\n**Efeito** Você regain 3d10 PV.",
    activations: [
  {
    name: "Dádiva da vida",
    actionType: "one",
    traits: ["Concentrate","Healing","Vitality"],
    frequency: "1 vez ao dia",
    effect: "Você regain 3d10 PV.",
  },
    ],
  },
  "Booming Bell": {
    description: "Sino de bronze com cabo de freixo e badalo de ferro enegrecido. +1 de item em Atuação ao tocar.\n\n**Ativar—Crescendo clarim** 2 ações (manipular, sonic)\n**Frequência** 1 vez ao dia\n**Efeito** Você ring a blasting note on the bell that sends shock waves through the air. The blast deals 4d6 dano sônico to each criatura in a 4,5 m emanation (CD 22 Fortitude básico save). On a failure, o alvo is also surdo por 1 rodada.",
    activations: [
  {
    name: "Crescendo clarim",
    actionType: "two",
    traits: ["Manipulate","Sonic"],
    frequency: "1 vez ao dia",
    effect: "Você toca uma nota explosiva na campainha que envia ondas de choque pelo ar. A explosão causa 4d6 de dano sônico a cada criatura em uma emanação de 4,5 m (CD 22 Fortitude básico save). Em caso de falha, o alvo também fica surdo por 1 rodada.",
  },
    ],
  },
  "Boots of Bounding": {
    description: "Botas de sola elástica. +5 pés de bônus de item no deslocamento e saltos melhores.",
  },
  "Boots of Bounding (Greater)": {
    description: "The springy soles of these sturdy leather boots cushion seu feet and make each step lighter. These boots give você a +5- foot bônus de item em seu Speed and a +2 bônus de item em Atletismo testes to High Jump and Long Jump. Além disso, when você use the Saltar ação, você pode move 1,5 m further if jumping horizontally or 3 pés higher if jumping vertically. The bônus to Speed is +3 m, and the bônus to High Jump and Long Jump is +3.",
  },
  "Boots of Quick Marching": {
    description: "Sapatos de couro marrom com solas espessas. Os cadarços bege sempre no ponto certo. Pode Apressar-se pelo dobro dos minutos normais: modificador de Constituição × 20 (mínimo 20).\n\n**Ativar—Passo largo** 1 ação (concentrar)\n**Frequência** 1 vez ao dia\n**Efeito** The soles on seu boots grow even thicker for a moment, proving a bounce to seu step. Você Step twice.",
    activations: [
  {
    name: "Passo largo",
    actionType: "one",
    traits: ["Concentrate"],
    frequency: "1 vez ao dia",
    effect: "As solas de suas botas ficam ainda mais grossas por um momento, provando um salto em seu passo. Você Passou duas vezes.",
  },
    ],
  },
  "Boots of the Dead": {
    description: "Talvez não houvesse escolha senão tomar as botas de um soldado caído. A culpa pesa. +1 de item em salvaguardas e CDs contra movimento forçado.\n\n**Ativar—Um de vocês** 1 ação (manipular, undead)\n**Frequência** 1 vez por hora\n**Efeito** Você shuffle seu boots, which still stink of the dead, causing one undead criatura of seu choice to think that você too are undead. O alvo is desprevenido against the next melee attack você attempt against it before the end of seu current turno.",
    activations: [
  {
    name: "Um de vocês",
    actionType: "one",
    traits: ["Manipulate","Undead"],
    frequency: "1 vez por hora",
    effect: "Você embaralha suas botas, que ainda cheiram a mortos, fazendo com que uma criatura morta-viva de sua escolha pense que você também é morto-vivo. O alvo está desprevenido contra o próximo ataque corpo a corpo que você tentar antes do final do turno atual.",
  },
    ],
  },
  "Boots of the Secret Blade": {
    description: "Botas cinza-escuras aparentemente mundanas que conjuram uma lâmina. Nem a busca mais minuciosa acha uma faca que ainda não existe.\n\n**Ativar—Sacar lâmina secreta** 1 ação (manipular)\n**Frequência** 1 vez por hora\n**Efeito** Você reach down to seu boot, draw a dagger from it, and make a ranged or melee Golpe with it. This dagger is created magically and does not exist before being drawn. The dagger remains a physical object until the next time você use Draw Secret Blade, and it disappears as a new blade is created.",
    activations: [
  {
    name: "Sacar lâmina secreta",
    actionType: "one",
    traits: ["Manipulate"],
    frequency: "1 vez por hora",
    effect: "Você alcança sua bota, saca uma adaga dela e faz um Golpe de longo alcance ou corpo a corpo com ela. Esta adaga é criada magicamente e não existe antes de ser sacada. A adaga permanece um objeto físico até a próxima vez que você usar Draw Secret Blade, e desaparece quando uma nova lâmina é criada.",
  },
    ],
  },
  "Boots of the Secret Blade (Greater)": {
    description: "Botas cinza-escuras aparentemente mundanas que conjuram uma lâmina. Nem a busca mais minuciosa acha uma faca que ainda não existe.\n\n**Ativar—Sacar lâmina secreta** 1 ação (manipular)\n**Frequência** 1 vez por hora\n**Efeito** Você reach down to seu boot, draw a dagger from it, and make a ranged or melee Golpe with it. This dagger is created magically and does not exist before being drawn. The dagger remains a physical object until the next time você use Draw Secret Blade, and it disappears as a new blade is created.",
    activations: [
  {
    name: "Sacar lâmina secreta",
    actionType: "one",
    traits: ["Manipulate"],
    frequency: "1 vez por hora",
    effect: "Você alcança sua bota, saca uma adaga dela e faz um Golpe de longo alcance ou corpo a corpo com ela. Esta adaga é criada magicamente e não existe antes de ser sacada. A adaga permanece um objeto físico até a próxima vez que você usar Draw Secret Blade, e desaparece quando uma nova lâmina é criada.",
  },
    ],
  },
  "Boots of the Secret Blade (Major)": {
    description: "Botas cinza-escuras aparentemente mundanas que conjuram uma lâmina. Nem a busca mais minuciosa acha uma faca que ainda não existe.\n\n**Ativar—Sacar lâmina secreta** 1 ação (manipular)\n**Frequência** 1 vez por hora\n**Efeito** Você reach down to seu boot, draw a dagger from it, and make a ranged or melee Golpe with it. This dagger is created magically and does not exist before being drawn. The dagger remains a physical object until the next time você use Draw Secret Blade, and it disappears as a new blade is created.",
    activations: [
  {
    name: "Sacar lâmina secreta",
    actionType: "one",
    traits: ["Manipulate"],
    frequency: "1 vez por hora",
    effect: "Você alcança sua bota, saca uma adaga dela e faz um Golpe de longo alcance ou corpo a corpo com ela. Esta adaga é criada magicamente e não existe antes de ser sacada. A adaga permanece um objeto físico até a próxima vez que você usar Draw Secret Blade, e desaparece quando uma nova lâmina é criada.",
  },
    ],
  },
  "Boozy Bottle": {
    description: "This tattoo depicts a container of alcohol, traditionally a small, uncorked brown bottle. Você ganha +1 bônus de item em salvaguardas against poison.\n\n**Ativar** reação (concentrar, medo)\n**Frequência** 1 vez ao dia\n**Gatilho** Você fail (but don't critically fail) an initial salvaguarda against a poison, or você ganha dano persistente de veneno\n**Efeito** Você pick seu poison. Calling out the name of a drink as though ordering at a bar, você negate the triggering poison. Instead, você become slightly drunk. For 10 minutes você’re desprevenido and gain a +1 bônus de item em salvaguardas against fear.",
    activations: [
  {
    name: "",
    actionType: "reaction",
    traits: ["Concentrate","Fear"],
    frequency: "1 vez ao dia",
    trigger: "Você falha (mas não falha criticamente) em uma proteção inicial contra um veneno, ou você ganha dano persistente de veneno",
    effect: "Você escolhe seu veneno. Chamando o nome de uma bebida como se estivesse pedindo em um bar, você nega o veneno desencadeante. Em vez disso, você fica um pouco bêbado. Por 10 minutos você fica desprevenido e ganha +1 de bônus de item em salvaguardas contra o medo.",
  },
    ],
  },
  "Bottle of Infinite Dust": {
    description: "Garrafa verde-pálida cheia de areia, aparentemente mundana, mas com estoque quase infinito. Filete lento e constante; até 0,5 kg de areia por dia.\n\n**Ativar—Gêiser de areia** 2 ações (earth, manipular, primal)\n**Frequência** 1 vez por hora\n**Efeito** Você aim the bottle and unleash a blast of sand. Scouring grit is released in a 4,5 m cone, dealing 4d4 dano cortante to all criaturas in the area (CD 23 Reflexos básico save).\n\n**Ativar—Tempestade de areia** 3 ações (earth, manipular, primal, water)\n**Frequência** 1 vez ao dia\n**Efeito** Você dump out the bottle, creating a swirling sandstorm around você. A 6 m emanation is filled with blowing sand that obscures vision. This has the effects of mist. The air within the sandstorm is unbreathable; criaturas in the area must hold their breath. Creatures entering or starting their turno in the sandstorm take 2d4 dano cortante (CD 23 Reflexos básico save). Creatures with the water trait or that are primarily made of liquid take double dano. This sandstorm lasts 10 minutes or until the bottle is corked with an Interact ação, whichever comes first.",
    activations: [
  {
    name: "Gêiser de areia",
    actionType: "two",
    traits: ["Earth","Manipulate","Primal"],
    frequency: "1 vez por hora",
    effect: "Você aponta a garrafa e solta uma rajada de areia. A areia abrasiva é lançada em um cone de 4,5 m, causando 4d4 de dano cortante a todas as criaturas da área (CD 23 Reflexosos básicos save).",
  },
  {
    name: "Tempestade de areia",
    actionType: "three",
    traits: ["Earth","Manipulate","Primal","Water"],
    frequency: "1 vez ao dia",
    effect: "Você joga fora a garrafa, criando uma tempestade de areia ao seu redor. Uma emanação de 6 m está cheia de areia que obscurece a visão. Isto tem os efeitos da névoa. O ar dentro da tempestade de areia é irrespirável; criaturas na área devem prender a respiração. Criaturas que entram ou iniciam seu turno na tempestade de areia sofrem 2d4 de dano cortante (CD 23 Reflexosos básicos save). Criaturas com característica água ou que sejam feitas principalmente de líquido sofrem dano duplo. Esta tempestade de areia dura 10 minutos ou até a garrafa ser rolhada com uma ação Interagir, o que ocorrer primeiro.",
  },
    ],
  },
  "Bottled Air": {
    description: "Parecendo uma garrafa de vidro comum com rolha, este item contém um suprimento ilimitado de ar fresco. Você precisa desarrolhar a garrafa com uma ação de Interagir antes de ativá-la.\n\n**Ativar—Inalar** 1 ação (manipular)\n**Efeito** Você puxa um gole de ar da garrafa. Isso permite que você respire mesmo num ambiente sem ar ou tóxico. O ar não vaza da boca da garrafa, então deixar a garrafa aberta num ambiente sem ar não muda o ambiente.",
    activations: [
  {
    name: "Inalar",
    actionType: "one",
    traits: ["Manipulate"],
    effect: "Você puxa um gole de ar da garrafa. Isso permite que você respire mesmo num ambiente sem ar ou tóxico. O ar não vaza da boca da garrafa, então deixar a garrafa aberta num ambiente sem ar não muda o ambiente.",
  },
    ],
  },
  "Bracelet of Dashing": {
    description: "Pulseira prateada tilintante. +1 de bônus de item em Acrobacia. 1 vez ao dia, +10 pés de deslocamento por 1 minuto.\n\n**Ativar—Disparada tilintante** 1 ação (concentrar)\n**Frequência** 1 vez ao dia\n**Efeito** Você ganha +3 m bônus de status em Speed por 1 minuto.",
    activations: [
  {
    name: "Disparada tilintante",
    actionType: "one",
    traits: ["Concentrate"],
    frequency: "1 vez ao dia",
    effect: "Você ganha +3 m bônus de status em Speed por 1 minuto.",
  },
    ],
  },
  "Bracers of Devotion": {
    description: "Braçadeiras com símbolo ou preceitos. Ao gastar Ponto de Foco em magia de devoção, o aliado divino ganha até o início do próximo turno: Armamento Abençoado: +2 de item contra Desarmar essa arma. Escudo Abençoado: erguido, resistência 10 a profano se sagrado, 10 a sagrado se profano, ou 5 a ambos se nenhum. Rapidez Abençoada: +3 m no Deslocamento.\n\n**Ativar** ação livre (concentrar)\n**Frequência** 1 vez ao dia\n**Efeito** Você ganha 1 ponto de foco, which você pode use only to cast a champion devotion magia. If not used by the end of seu turno, this ponto de foco is lost.",
    activations: [
  {
    name: "",
    actionType: "free",
    traits: ["Concentrate"],
    frequency: "1 vez ao dia",
    effect: "Você ganha 1 ponto de foco, que você pode usar apenas para lançar uma magia de devoção de campeão. Se não for utilizado até o final do seu turno, esse ponto de foco será perdido.",
  },
    ],
  },
  "Bracers of Missile Deflection": {
    description: "Braçadeiras de prata da alvorada. 1 vez ao dia, desviam um míssil que acertaria (não crítico).\n\n**Ativar** reação (manipular)\n**Frequência** 1 vez ao dia\n**Gatilho** A ranged arma attack hits você but doesn't critically hit\n**Requisitos** Você está aware of the attack and not desprevenido\n**Efeito** The bracers send the missile off-course. Você ganha +2 bônus de circunstância em AC against the triggering attack. If this would cause the attack to be a failure, the attack misses você.",
    activations: [
  {
    name: "",
    actionType: "reaction",
    traits: ["Manipulate"],
    frequency: "1 vez ao dia",
    trigger: "A ranged arma attack hits você but doesn't critically hit",
    requirements: "Você está ciente do ataque e não desprevenido",
    effect: "As braçadeiras desviam o míssil do curso. Você ganha +2 bônus de circunstância em CA contra o ataque desencadeador. Se isso fizer com que o ataque seja um fracasso, o ataque erra você.",
  },
    ],
  },
  "Bracers of Missile Deflection (Greater)": {
    description: "These bracers are made from plates of durable dawnsilver and gleam like the summer sun. Você pode activate the bracers 1 vez a cada 10 minutos.\n\n**Ativar** reação (manipular)\n**Frequência** 1 vez ao dia\n**Gatilho** A ranged arma attack hits você but doesn't critically hit\n**Requisitos** Você está aware of the attack and not desprevenido\n**Efeito** The bracers send the missile off-course. Você ganha +2 bônus de circunstância em AC against the triggering attack. If this would cause the attack to be a failure, the attack misses você.",
    activations: [
  {
    name: "",
    actionType: "reaction",
    traits: ["Manipulate"],
    frequency: "1 vez ao dia",
    trigger: "A ranged arma attack hits você but doesn't critically hit",
    requirements: "Você está ciente do ataque e não desprevenido",
    effect: "As braçadeiras desviam o míssil do curso. Você ganha +2 bônus de circunstância em CA contra o ataque desencadeador. Se isso fizer com que o ataque seja um fracasso, o ataque erra você.",
  },
    ],
  },
  "Bracers of Strength": {
    description: "Braçadeiras de latão com ursos. Ao investir, o modificador de Força sobe em 1 ou vai a +4, o que for maior. +3 de bônus de item em Atletismo, e +2 de circunstância para levantar objeto pesado, Escapar e Forçar abertura.\n\n**Ativar—Abraço de urso** 1 ação (manipular)\n**Efeito** Attempt to Agarrar a criatura. Se você passar, você crush the criatura in seu grasp, dealing dano de concussão to it equal to seu Força modifier. Se você passar com sucesso críticoed, the dano is equal to double seu Força modifier and the criatura suffocates enquanto it remains agarrado or imobilizado by você.",
    activations: [
  {
    name: "Abraço de urso",
    actionType: "one",
    traits: ["Manipulate"],
    effect: "Tente Agarrar uma criatura. Se você passar, você esmagará a criatura ao seu alcance, causando dano de concussão a ela igual ao seu modificador de Força. Se você passar com sucesso criticado, o dano é igual ao dobro do seu modificador de Força e a criatura sufoca enquanto permanece agarrada ou imobilizada por você.",
  },
    ],
  },
  "Branch Attendant": {
    description: "Although not all attendants’ masks are enchanted, many apply a first enchantment to celebrate their acceptance into a branch of the academy. While você wear the mask or have it as seu bonded item, add the associated cantrip to seu prepared cantrips. This has no effect if você do not prepare cantrips from the arcane or primal lists. **Cascade Bearers** _read aura_ **Emerald Boughs** _root reading_ **Rain-Scribes** _deep breath_ **Tempest-Sun Mages** _electric arc_ **Uzunjati** _prestidigitation_",
  },
  "Branch Attendant's Mask": {
    description: "Máscara de ramo da academia. Vestida ou como item vinculado, adiciona o truque associado aos seus truques preparados; sem efeito se você não preparar truques.",
  },
  "Bravery Baldric (Fleet)": {
    description: "Faixa no ombro. Sucesso crítico contra medo ou reduzir amedrontado a 0: +1 carga (máx. 2; zera ao investir). Só um investido por vez.\n\n**Ativar** 2 ações (concentrar)\n**Frequência** 1 vez por hora\n**Requisitos** The baldric has a charge\n**Efeito** One charge in the baldric expires, and você ganha its benefit, according to its type.",
    activations: [
  {
    name: "",
    actionType: "two",
    traits: ["Concentrate"],
    frequency: "1 vez por hora",
    requirements: "O baldric tem uma carga",
    effect: "Uma carga no baldric expira, e você ganha seu benefício, de acordo com sua modalidade.",
  },
    ],
  },
  "Bravery Baldric (Flight)": {
    description: "Como a faixa da bravura básica (cargas por coragem, máx. 2).\n\n**Ativar** 2 ações (concentrar)\n**Frequência** 1 vez por hora\n**Requisitos** The baldric has a charge\n**Efeito** One charge in the baldric expires, and você ganha its benefit, according to its type.",
    activations: [
  {
    name: "",
    actionType: "two",
    traits: ["Concentrate"],
    frequency: "1 vez por hora",
    requirements: "O baldric tem uma carga",
    effect: "Uma carga no baldric expira, e você ganha seu benefício, de acordo com sua modalidade.",
  },
    ],
  },
  "Bravery Baldric (Haste)": {
    description: "Como a faixa da bravura básica (cargas por coragem, máx. 2).\n\n**Ativar** 2 ações (concentrar)\n**Frequência** 1 vez por hora\n**Requisitos** The baldric has a charge\n**Efeito** One charge in the baldric expires, and você ganha its benefit, according to its type.",
    activations: [
  {
    name: "",
    actionType: "two",
    traits: ["Concentrate"],
    frequency: "1 vez por hora",
    requirements: "O baldric tem uma carga",
    effect: "Uma carga no baldric expira, e você ganha seu benefício, de acordo com sua modalidade.",
  },
    ],
  },
  "Bravery Baldric (Healthful, Greater)": {
    description: "Como a faixa saudável, mas conjura corpo são de 4º posto. Cargas por coragem (máx. 2).\n\n**Ativar** 2 ações (concentrar)\n**Frequência** 1 vez por hora\n**Requisitos** The baldric has a charge\n**Efeito** One charge in the baldric expires, and você ganha its benefit, according to its type.",
    activations: [
  {
    name: "",
    actionType: "two",
    traits: ["Concentrate"],
    frequency: "1 vez por hora",
    requirements: "O baldric tem uma carga",
    effect: "Uma carga no baldric expira, e você ganha seu benefício, de acordo com sua modalidade.",
  },
    ],
  },
  "Bravery Baldric (Healthful)": {
    description: "Como a faixa da bravura básica (cargas por coragem, máx. 2).\n\n**Ativar** 2 ações (concentrar)\n**Frequência** 1 vez por hora\n**Requisitos** The baldric has a charge\n**Efeito** One charge in the baldric expires, and você ganha its benefit, according to its type.",
    activations: [
  {
    name: "",
    actionType: "two",
    traits: ["Concentrate"],
    frequency: "1 vez por hora",
    requirements: "O baldric tem uma carga",
    effect: "Uma carga no baldric expira, e você ganha seu benefício, de acordo com sua modalidade.",
  },
    ],
  },
  "Bravery Baldric (Stone)": {
    description: "Como a faixa da bravura básica (cargas por coragem, máx. 2).\n\n**Ativar** 2 ações (concentrar)\n**Frequência** 1 vez por hora\n**Requisitos** The baldric has a charge\n**Efeito** One charge in the baldric expires, and você ganha its benefit, according to its type.",
    activations: [
  {
    name: "",
    actionType: "two",
    traits: ["Concentrate"],
    frequency: "1 vez por hora",
    requirements: "O baldric tem uma carga",
    effect: "Uma carga no baldric expira, e você ganha seu benefício, de acordo com sua modalidade.",
  },
    ],
  },
  "Brazier of Harmony": {
    description: "Incensário esférico com flores e incensos secos. Empunhado aceso, +1 de item em Diplomacia (ativado ou não).\n\n**Ativar—Acender incenso** 2 ações (aura, manipular)\n**Frequência** 1 vez ao dia\n**Efeito** When the incense is lit, pleasant, floral smoke surrounds the censer in a 6 m emanation, creating a space of peace and harmony. Each criatura that breathes the smoke is affected by 3º posto _calm_ and is then temporarily immune for 24 hours. The magia's effects end when the incense burns out.",
    activations: [
  {
    name: "Acender incenso",
    actionType: "two",
    traits: ["Aura","Manipulate"],
    frequency: "1 vez ao dia",
    effect: "Quando o incenso é aceso, uma agradável fumaça floral envolve o incensário em uma emanação de 6 m, criando um espaço de paz e harmonia. Cada criatura que respira a fumaça é afetada pelo 3º posto _calma_ e fica temporariamente imune por 24 horas. Os efeitos da magia terminam quando o incenso se esgota.",
  },
    ],
  },
  "Breath of Freedom": {
    description: "Berloque de pena, frágil à vista mas sólido como pedra. Ao Ativar o talismã, tente Escapar imediatamente.",
  },
  "Brimorak Bone Tiles": {
    description: "Como as peças de osso de pusk, mas 1d6 sangramento persistente e Reflexos CD 20.",
  },
  "Bring Me Near": {
    description: "Luneta de 3 tubos de couro com prata e lentes finas. Olhando por ela, +2 de item em Percepção visual.\n\n**Ativar** (concentrar, manipular)\n**Frequência** 1 vez ao dia\n**Efeito** Você focus on any spot você pode see within 8 km through the spyglass and rotate its parts in a meticulous order. Você and up to 4 willing criaturas adjacent to você está instantly teleported to that spot. If there's not enough room for everyone, only você está transported. If there's not enough room for você, the teleportation fails.",
    activations: [
  {
    name: "",
    traits: ["Concentrate","Manipulate"],
    frequency: "1 vez ao dia",
    effect: "Você se concentra em qualquer ponto que possa ver dentro de 8 km através da luneta e gira suas partes em uma ordem meticulosa. Você e até 4 criaturas dispostas adjacentes a você são teletransportados instantaneamente para aquele local. Se não houver espaço para todos, só você será transportado. Se não houver espaço suficiente para você, o teletransporte falhará.",
  },
    ],
  },
  "Calamity": {
    description: "This small tattoo of a stylized lidded or clouded eye radiating lines of power is inked on a part of seu body that você podenot easily see with seu own eyes, such as the nape of seu neck, behind seu ears, or seu interscapular region. This tattoo protects você during calamity além de uncertainty, guiding seu intuition to take subconscious ações and precautions to shelter você in a thousand unknown ways. When você está affected by a misfortune effect or a curse, seu shrouded eye tattoo emits an intense sensation akin to pins and needles, alerting você that something is awry, though the specific nature of the danger might be unknown to você.\n\n**Ativar—Aliviar incerteza** ação livre (concentrar)\n**Frequência** 1 vez a cada 10 minutos\n**Gatilho** Você make a teste for an ação that has the secret trait or that has been affected by a misfortune effect\n**Efeito** Você ganha +1 bônus de status em the teste associated with the triggering ação.",
    activations: [
  {
    name: "Aliviar incerteza",
    actionType: "free",
    traits: ["Concentrate"],
    frequency: "1 vez a cada 10 minutos",
    trigger: "Você faz um teste para uma ação que possui o traço secreto ou que foi afetada por um efeito de infortúnio",
    effect: "Você ganha +1 bônus de status no teste associado à ação de acionamento.",
  },
    ],
  },
  "Calamity's Bane Tattoo": {
    description: "Olho estilizado fechado ou nublado, tatuado onde você não vê com facilidade (nuca, atrás das orelhas, entre as omoplatas). Ao sofrer infortúnio ou maldição, o olho formiga e alerta que algo vai mal, sem revelar o quê.\n\n**Ativar—Aliviar incerteza** ação livre (concentrar)\n**Frequência** 1 vez a cada 10 minutos\n**Gatilho** Você make a teste for an ação that has the secret trait or that has been affected by a misfortune effect\n**Efeito** Você ganha +1 bônus de status em the teste associated with the triggering ação.",
    activations: [
  {
    name: "Aliviar incerteza",
    actionType: "free",
    traits: ["Concentrate"],
    frequency: "1 vez a cada 10 minutos",
    trigger: "Você faz um teste para uma ação que possui o traço secreto ou que foi afetada por um efeito de infortúnio",
    effect: "Você ganha +1 bônus de status no teste associado à ação de acionamento.",
  },
    ],
  },
  "Candlecap": {
    description: "The crown of a _candlecap_ is stitched leather sewn in the shape of a small bowl. Fixed inside the bowl is a melted nub of wax with a small black wick.\n\n**Ativar** 1 ação (manipular)\n**Efeito** Você shake seu head, and the candle wick ignites. The _candlecap_ sheds dim light in a 6 m radius. The candle doesn't require oxygen and can't be smothered or quenched. Activating the _candlecap_ again douses the light.",
    activations: [
  {
    name: "",
    actionType: "one",
    traits: ["Manipulate"],
    effect: "Você balança a cabeça e o pavio da vela acende. A _candlecap_ emite luz fraca em um raio de 6 m. A vela não necessita de oxigênio e não pode ser abafada ou apagada. Ativar o _candlecap_ novamente apaga a luz.",
  },
    ],
  },
  "Cantrip Deck (5-pack)": {
    description: "Fiéis de Nethys prenderam truques em cartas, acessíveis até a não conjuradores. Cartas de pergaminho com o nome do truque.\n\n**Ativar—Escolha uma carta** 1 ação (manipular)\n**Efeito** Você envision seu desired cantrip, causing its card to rise to the top of the deck, and draw the card. The deck casts that cantrip as a 1º posto magia, with a CD of 15 and a ataque de magia modifier of +5. The card crumbles into dust as the cantrip takes effect. This activation takes the same number of ações as the cantrip você chose takes to cast.",
    activations: [
  {
    name: "Escolha uma carta",
    actionType: "one",
    traits: ["Manipulate"],
    effect: "Você imagina o truque desejado, fazendo com que sua carta suba ao topo do baralho e compre a carta. O deck lança esse cantrip como 1º posto magia, com CD de 15 e modificador de ataque de magia de +5. A carta vira pó quando o truque entra em vigor. Esta ativação leva o mesmo número de ações que o truque que você escolheu leva para ser lançado.",
  },
    ],
  },
  "Captivating Rosebud": {
    description: "Botão de rosa de fragrância quase irresistível, usado para distrair perseguidores.\n\n**Ativar—Perfume de rosas** 1 ação (manipular, mental, olfactory)\n**Efeito** Você throw the _captivating rosebud_ in a square adjacent to você. The rosebud quickly sprouts into a little rosebush that lasts por 1 hora. Any criatura that passes within 4,5 m of the rose bush, other than yourself, deve fazer um teste CD 18 salvaguarda de Vontade. **Sucesso crítico** The criatura is unaffected. **Sucesso** The criatura takes a –1 penalidade de status to Percepção testes por 10 minutos. **Falha** As success, but a –2 penalidade. **Falha crítica** As success, but a –2 penalidade and the criatura is fascinado by the rosebush.\n\n**Ativar—Vinhas de rosa** (manipular)\n**Efeito** Você plant the _captivating rosebud_ into a square adjacent to a building or other structure. It grows into a rosebush that stretches up to 9 m tall. Você and seu aliados can use the rosebush as a ladder to Escalar easily up and down the side of the adjacent structure, but all other criaturas deve passar num teste CD 17 Vontade salvaguarda or fail to notice the rosebush's presence.",
    activations: [
  {
    name: "Perfume de rosas",
    actionType: "one",
    traits: ["Manipulate","Mental","Olfactory"],
    effect: "Você joga o _cativante botão de rosa_ em um quadrado adjacente a você. O botão de rosa brota rapidamente e se transforma em uma pequena roseira que dura por 1 hora. Qualquer criatura que passe a 4,5 m da roseira, além de você, deverá fazer um teste CD 18 salvaguarda de Vontade. **Sucesso crítico** A criatura não é afetada. **Sucesso** A criatura leva –1 de status para Percepção testada por 10 minutos. **Falha** Como sucesso, mas com -2 sorte. **Falha crítica** Como sucesso, mas a –2 surpresa e a criatura fica fascinada pela roseira.",
  },
  {
    name: "Vinhas de rosa",
    traits: ["Manipulate"],
    effect: "Você planta o _cativante botão de rosa_ em um quadrado adjacente a um prédio ou outra estrutura. Ela se transforma em uma roseira que chega a atingir 9 m de altura. Você e seus aliados podem usar a roseira como escada para escalar facilmente para cima e para baixo pela lateral da estrutura adjacente, mas todas as outras criaturas devem passar num teste CD 17 Vontade segurança ou não perceber a presença da roseira.",
  },
    ],
  },
  "Cassisian Helmet": {
    description: "Elmo de latão com asas e viseira. +1 de status na CA e salvaguardas contra criaturas e efeitos profanos.\n\n**Ativar** 2 ações (concentrar, manipular)\n**Frequência** 1 vez por hora\n**Efeito** Lowering the visor, você send out eye beams that deal seu choice of 2d6 cold or dano de fogo (CD 20 Reflexos básico save) to all criaturas in a 4,5 m line.",
    activations: [
  {
    name: "",
    actionType: "two",
    traits: ["Concentrate","Manipulate"],
    frequency: "1 vez por hora",
    effect: "Abaixando a viseira, você envia raios oculares que causam sua escolha de 2d6 de frio ou dano de fogo (CD 20 Reflexosos básicos save) para todas as criaturas em uma linha de 4,5 m.",
  },
    ],
  },
  "Caterwaul Sling": {
    description: "Made of shiny brown leather, this _+1 impacto sling_ has a single white thread interwoven into its cord.\n\n**Ativar—Soltar rugido** 2 ações (sonic)\n**Frequência** 1 vez ao dia\n**Efeito** Você puxa the white thread free, then whirl the sling in circles at high speed. It lets out an ear-piercing wave of sound. Each criatura in a 9 m cone takes 4d6 dano sônico (CD 21 Fortitude básico save). Any criatura that fails is surdo por 1 rodada, or 1 hour on a critical failure.",
    activations: [
  {
    name: "Soltar rugido",
    actionType: "two",
    traits: ["Sonic"],
    frequency: "1 vez ao dia",
    effect: "Você puxa o fio branco e gira a tipoia em círculos em alta velocidade. Ele emite uma onda de som ensurdecedora. Cada criatura em um cone de 9 m sofre 4d6 de dano sônico (CD 21 Fortitude básico save). Qualquer criatura que falhe é surda por 1 rodada, ou 1 hora em caso de falha crítica.",
  },
    ],
  },
  "Cauthooj Bagpipes": {
    description: "The main portion of this set of bagpipes is fashioned from the dried skin of a cauthooj, with the feathers still attached. The bird’s vocal cords are crafted into the instrument’s reeds. The pipes grant a +2 bônus de item em Atuação testes while playing music with them.\n\n**Ativar—Fuga desorientadora** 2 ações (auditivo, incapacitation, manipular, mental)\n**Frequência** 1 vez por hora\n**Efeito** Você play several notes on the pipes, quickly altering their pitch and tone. Each criatura within a 6 m emanation deve fazer um teste CD 31 salvaguarda de Vontade to resist the song. Creatures that attempt this save become temporarily immune to Disorienting Fugue por 1 minuto. **Sucesso crítico** O alvo is unaffected and its temporary imunidade a Disorienting Fugue increases to 1 hour. **Sucesso** O alvo is unaffected. **Falha** O alvo is confuso por 1 rodada. **Falha crítica** O alvo is confuso por 1 rodada and immediately attacks itself (in the normal fashion for attacking oneself while confuso). This Golpe doesn’t give the criatura a teste simples to recover from the confusion.\n\n**Ativar—Lançar canção** reação (auditivo, mental)\n**Gatilho** A criatura within 9 m attempts a melee Golpe against você or an aliado\n**Efeito** Você let loose a staccato chirp from the pipes that appears to come from somewhere else. The triggering criatura deve fazer um teste CD 31 salvaguarda de Vontade. On a failure, the criatura redirects the Golpe to another criatura of seu choice ao alcance of the melee Golpe. If no other criaturas are within range, the affected criatura instead takes a –2 penalidade to the Golpe.",
    activations: [
  {
    name: "Fuga desorientadora",
    actionType: "two",
    traits: ["Auditory","Incapacitation","Manipulate","Mental"],
    frequency: "1 vez por hora",
    effect: "Você toca várias notas nas flautas, alterando rapidamente seu tom e tom. Cada criatura dentro de uma emanação de 6 meses deve fazer um teste CD 31 salvaguarda de Vontade para resistir à música. As criaturas que tentarem este salvamento tornam-se temporariamente imunes à Fuga Desorientadora por 1 minuto. **Sucesso crítico** O alvo não é afetado e sua imunidade temporária a Fuga Desorientadora aumenta para 1 hora. **Sucesso** O alvo não é afetado. **Falha** O alvo é confuso por 1 rodada. **Falha crítica** O alvo fica confuso por 1 rodada e imediatamente ataca a si mesmo (da maneira normal de atacar a si mesmo enquanto está confuso). Este Golpe não dá à criatura um teste simples para se recuperar da confusão.",
  },
  {
    name: "Lançar canção",
    actionType: "reaction",
    traits: ["Auditory","Mental"],
    trigger: "Uma criatura dentro de 9 m tenta um Golpe corpo a corpo contra você ou um aliado",
    effect: "Você soltou um som staccato dos canos que parece vir de algum outro lugar. A criatura desencadeadora deve fazer um teste CD 31 salvaguarda de Vontade. Em caso de falha, a criatura redireciona o Golpe para outra criatura de sua escolha ao alcance do Golpe corpo a corpo. Se nenhuma outra criatura estiver ao alcance, a criatura afetada sofre -2 de retorno ao Golpe.",
  },
    ],
  },
  "Cayden": {
    description: "This ordinary-looking silver tankard functions as a _+4 impacto máximo hopeful returning light hammer_ when wielded as a arma. Imbued with Cayden Cailean's courage, você está immune to fear effects. Any liquid poured into the tankard transforms into a strong, alcoholic ambrosia that remains contained safely within until você drink it. Drinking the ambrosia Ativars the tankard, with one of the following effects. If você están't the one blessed to borrow the tankard, você está drenado 4 and enfraquecido 4 while holding it, and its magic doesn't function for você.\n\n**Ativar** reação (manipular)\n**Gatilho** Você está targeted or included in the area of a fear effect\n**Efeito** Calmly swigging a drink on the battlefield turns seu foe's attempt to frighten você against them. The fear effect is counteracted for all targets, and the criatura that created the effect must attempt a salvaguarda as if it alone were the original alvo of the effect.\n\n**Ativar** 2 ações (concentrar, manipular)\n**Frequência** 1 vez por hora\n**Efeito** Você drink from the tankard, ending the controlado, agarrado, imóvel, paralisado, imobilizado, and lento conditions on yourself and criaturas of seu choice within 36 m of você, além de anything giving such targets a penalidade de circunstância to Speed. Any effect causing these conditions ends, and if the source of the effect is an item, that item can't produce the effect for 1 week, provided it is of a level lower than the tankard's. If a alvo needs to Escapar an effect imposing any of these conditions, it automatically does so on its next attempt. Você pode Ativar this ability even if one of the listed conditions would normally prevent você from doing so (such as paralisado).\n\n**Ativar** 2 ações (concentrar, manipular, unholy)\n**Frequência** 1 vez ao dia\n**Efeito** Você enhance yourself with a shard of Cayden's divine fortune and cast _indestructibility_. **Destruction** If an unholy criatura carries _Cayden’s Tankard_ into the Starstone Cathedral, drinks from it, and returns outside with it, the tankard shatters.",
    activations: [
  {
    name: "",
    actionType: "reaction",
    traits: ["Manipulate"],
    trigger: "Você está direcionado ou incluído na área do efeito do medo",
    effect: "Beber uma bebida calmamente no campo de batalha transforma a tentativa do inimigo de assustá-lo contra ele. O efeito de medo é neutralizado para todos os alvos, e a criatura que criou o efeito deve tentar uma proteção como se fosse o único alvo original do efeito.",
  },
  {
    name: "",
    actionType: "two",
    traits: ["Concentrate","Manipulate"],
    frequency: "1 vez por hora",
    effect: "Você bebe da caneca, encerrando as condições de controle, agarrado, imóvel, paralisado, imobilizado e lento sobre você e criaturas de sua escolha dentro de 36 m de você, além de qualquer coisa, dando a tais alvos uma oportunidade de ocasional para Deslocamento. Qualquer efeito que cause essas condições termina, e se a fonte do efeito for um item, esse item não poderá produzir o efeito por 1 semana, desde que seja de nível inferior ao da caneca. Se um alvo precisar escapar de um efeito que imponha qualquer uma dessas condições, ele o fará automaticamente em sua próxima tentativa. Você pode ativar essa habilidade mesmo que uma das condições listadas normalmente o impeça de fazê-lo (como paralisado).",
  },
  {
    name: "",
    actionType: "two",
    traits: ["Concentrate","Manipulate","Unholy"],
    frequency: "1 vez ao dia",
    effect: "Você se aprimora com um fragmento da fortuna divina de Cayden e lança _indestrutibilidade_. **Destruição** Se uma criatura profana carrega _Cayden's Tankard_ para a Catedral Starstone, bebe dela e retorna para fora com ela, a caneca se estilhaça.",
  },
    ],
  },
  "Cayden's Tankard": {
    description: "Caneca de prata: martelo leve +4 impactante máxima esperançosa retornante. Imune a medo. Qualquer líquido vira ambrosia; beber ativa. Sem a bênção: drenado 4 e enfraquecido 4, sem magia.\n\n**Ativar** reação (manipular)\n**Gatilho** Você está targeted or included in the area of a fear effect\n**Efeito** Calmly swigging a drink on the battlefield turns seu foe's attempt to frighten você against them. The fear effect is counteracted for all targets, and the criatura that created the effect must attempt a salvaguarda as if it alone were the original alvo of the effect.\n\n**Ativar** 2 ações (concentrar, manipular)\n**Frequência** 1 vez por hora\n**Efeito** Você drink from the tankard, ending the controlado, agarrado, imóvel, paralisado, imobilizado, and lento conditions on yourself and criaturas of seu choice within 36 m of você, além de anything giving such targets a penalidade de circunstância to Speed. Any effect causing these conditions ends, and if the source of the effect is an item, that item can't produce the effect for 1 week, provided it is of a level lower than the tankard's. If a alvo needs to Escapar an effect imposing any of these conditions, it automatically does so on its next attempt. Você pode Ativar this ability even if one of the listed conditions would normally prevent você from doing so (such as paralisado).\n\n**Ativar** 2 ações (concentrar, manipular, unholy)\n**Frequência** 1 vez ao dia\n**Efeito** Você enhance yourself with a shard of Cayden's divine fortune and cast _indestructibility_. **Destruction** If an unholy criatura carries _Cayden’s Tankard_ into the Starstone Cathedral, drinks from it, and returns outside with it, the tankard shatters.",
    activations: [
  {
    name: "",
    actionType: "reaction",
    traits: ["Manipulate"],
    trigger: "Você está direcionado ou incluído na área do efeito do medo",
    effect: "Beber uma bebida calmamente no campo de batalha transforma a tentativa do inimigo de assustá-lo contra ele. O efeito de medo é neutralizado para todos os alvos, e a criatura que criou o efeito deve tentar uma proteção como se fosse o único alvo original do efeito.",
  },
  {
    name: "",
    actionType: "two",
    traits: ["Concentrate","Manipulate"],
    frequency: "1 vez por hora",
    effect: "Você bebe da caneca, encerrando as condições de controle, agarrado, imóvel, paralisado, imobilizado e lento sobre você e criaturas de sua escolha dentro de 36 m de você, além de qualquer coisa, dando a tais alvos uma oportunidade de ocasional para Deslocamento. Qualquer efeito que cause essas condições termina, e se a fonte do efeito for um item, esse item não poderá produzir o efeito por 1 semana, desde que seja de nível inferior ao da caneca. Se um alvo precisar escapar de um efeito que imponha qualquer uma dessas condições, ele o fará automaticamente em sua próxima tentativa. Você pode ativar essa habilidade mesmo que uma das condições listadas normalmente o impeça de fazê-lo (como paralisado).",
  },
  {
    name: "",
    actionType: "two",
    traits: ["Concentrate","Manipulate","Unholy"],
    frequency: "1 vez ao dia",
    effect: "Você se aprimora com um fragmento da fortuna divina de Cayden e lança _indestrutibilidade_. **Destruição** Se uma criatura profana carrega _Cayden's Tankard_ para a Catedral Starstone, bebe dela e retorna para fora com ela, a caneca se estilhaça.",
  },
    ],
  },
  "Channel Protection Amulet": {
    description: "Tectito polido numa gaiola de arame. Resistência 5 contra ferir (vivos) ou curar (mortos-vivos). Incomum.",
  },
  "Chaos Collar": {
    description: "Coleira discreta para esconder sob o pelo ou camuflar em escamas, usada por caçadores inescrupulosos que fabricam ameaças com animais indefesos. Funde-se ao animal na primeira vez que se fecha no pescoço; três noites por mês, ao acaso, transforma-o num monstro aterrador do mesmo tamanho (sem mudar as estatísticas) do crepúsculo ao amanhecer; se morrer, permanece na forma da hora da morte. Ao morrer o portador, vira farrapo de barbante sujo e cai, pronto para o caçador recolher e reutilizar.",
  },
  "Chaplain's Cudgel": {
    description: "This simple wooden _+1 impacto mace_ transforms in the hands of a wielder with great faith in a deity.\n\n**Ativar—Inclinar-se a um poder maior** 1 ação (concentrar, holy, unholy)\n**Requisitos** Você worship a deity\n**Efeito** Você supplicate yourself to seu deity, and the _chaplain's cudgel_ becomes a conduit for their power. It transforms into seu deity’s favored arma, as the _shifting_ rune except that it functions even if the favored arma is a ranged arma, a arma requiring two hands, or both. Etchings of seu deity’s religious symbol and other divine depictions spread across the arma from end to end. This lasts until this activation is used again. While the arma is attuned to você in this way, você get the following benefits. If você tem the holy or unholy trait, você pode add that trait to Golpes você make with the arma. Whenever você cast a divine magia that takes 2 ações or more to cast, the next Golpe você make with this arma before the end of seu next turno gets a bônus de status em its rolagem de dano equal to the arma's number of dano dice. Casting a magia matching the options from seu deity's divine font grants this benefit no matter how many ações você spent casting it.",
    activations: [
  {
    name: "Inclinar-se a um poder maior",
    actionType: "one",
    traits: ["Concentrate","Holy","Unholy"],
    requirements: "Você worship a deity",
    effect: "Você suplica à sua divindade, e o porrete do capelão se torna um canal para seu poder. Ela se transforma na arma favorita de sua divindade, como a runa _mudança_, exceto que funciona mesmo se a arma favorita for uma arma de longo alcance, uma arma que exija duas mãos, ou ambas. Gravuras do símbolo religioso de sua divindade e outras representações divinas espalhadas pela arma de ponta a ponta. Isso dura até que esta ativação seja usada novamente. Enquanto a arma é sintonizada para você desta forma, você obtém os seguintes benefícios. Se você tem o traço sagrado ou profano, você pode adicionar esse traço aos Golpes que você faz com a arma. Sempre que você conjurar uma magia divina que requer 2 ações ou mais para ser conjurada, o próximo Golpe que você fizer com esta arma antes do final do próximo turno recebe um bônus de status em sua rolagem de dano igual ao número de dados de dano da arma. Lançar uma magia que corresponda às opções da fonte divina de sua divindade concede esse benefício, não importa quantas ações você gastou para lançá-la.",
  },
    ],
  },
  "Charlatan": {
    description: "Tiny silver hooks decorate these fine silk gloves. They grant a +1 bônus de item em Prestidigitação and allow você to cast _telekinetic hand_ as an innate occult magia.",
  },
  "Charlatan's Cape": {
    description: "Capa vermelha e dourada. +2 de bônus de item em Enganação. 1 vez ao dia, translocar com fumaça. Incomum.\n\n**Ativar—Nuvem de fumaça** 2 ações (manipular)\n**Frequência** 1 vez ao dia\n**Efeito** Você conjura _translocate_. The space você leave and the one você appear in are filled with puffs of smoke that make anyone within oculto until they leave the smoke or the end of seu next turno, at which point the smoke dissipates. Strong winds immediately disperse the smoke.",
    activations: [
  {
    name: "Nuvem de fumaça",
    actionType: "two",
    traits: ["Manipulate"],
    frequency: "1 vez ao dia",
    effect: "Você conjura _translocar_. O espaço que você sai e aquele em que você aparece estão cheios de nuvens de fumaça que deixam qualquer um dentro dele oculto até que saia da fumaça ou no final do seu próximo turno, momento em que a fumaça se dissipa. Os ventos fortes dispersam imediatamente a fumaça.",
  },
    ],
  },
  "Charlatan's Gloves": {
    description: "Luvas de seda com ganchos de prata. +1 de bônus de item em Prestidigitação e mão telecinética inata ocultista.",
  },
  "Charlatan's Gloves (Greater)": {
    description: "Versão maior: +2 em Prestidigitação. Combinada com a capa, a mão telecinética pode teleportar o objeto até você.",
  },
  "Chiromantic Lines": {
    description: "Inscrições minúsculas com pó de cílios de dragões de agouro, traçadas nas pupilas e nas linhas da palma — processo doloroso e quase invisível.\n\n**Ativar—Consulta astuta** 1 ação (concentrar)\n**Frequência** 1 vez ao dia\n**Efeito** This tattoo becomes temporarily visible, allowing você to briefly grasp the very near future just enough to predict the subtle movements of those around você. Until the end of the turno, all criaturas você pode see that are not oculto or escondido are desprevenido to você.",
    activations: [
  {
    name: "Consulta astuta",
    actionType: "one",
    traits: ["Concentrate"],
    frequency: "1 vez ao dia",
    effect: "Essa tatuagem se torna temporariamente visível, permitindo que você compreenda brevemente o futuro muito próximo, apenas o suficiente para prever os movimentos sutis das pessoas ao seu redor. Até o final do turno, todas as criaturas que você pode ver que não estão ocultas ou escondidas são desprevenidas para você.",
  },
    ],
  },
  "Choker of Elocution": {
    description: "Gargantilha de platina com letras de um idioma. +1 em Sociedade, fluência nesse idioma, e fala melhor mesmo surdo.",
  },
  "Choker of Elocution (Greater)": {
    description: "This platinum choker bears characters from a language's alphabet, and it gives knowledge of that language and the associated culture's customs. Você ganha +1 bônus de item em Sociedade testes and the ability to understand, speak, and write the chosen language. Seu excellent elocution reduces the CD of the teste simples to perform an auditory ação while surdo from 5 to 3. The bônus de item is +2. The choker bears characters from three languages and grants fluency in all three.",
  },
  "Cipher of the Elemental Planes": {
    description: "Dois discos de metal, um um pouco menor, com runas e símbolos nas bordas. O anel central costuma mostrar uma runa para cada plano elemental; cifras mais antigas incluem só ar, terra, fogo e água. Pino dourado no centro os une.\n\n**Ativar—Alinhar ao plano** 2 ações (manipular, scrying, visual)\n**Efeito** Você turno the discs to align symbols, creating a minute planar gateway as large as a keyhole. Você pode look through it to view a location in an elemental plane. Each cipher connects to 12 locations on each elemental plane—typically large settlements. Anyone holding the cipher can understand the primary language of the plane the cipher is aligned to. A _cipher of the planes_ can be used in place of a planar key for _interplanar teleport_ and similar magic for travel to the plane it's aligned to. When it's used this way, você arrive unerringly at the location the cipher is aligned to.",
    activations: [
  {
    name: "Alinhar ao plano",
    actionType: "two",
    traits: ["Manipulate","Scrying","Visual"],
    effect: "Você gira os discos para alinhar os símbolos, criando um minúsculo portal planar do tamanho de um buraco de fechadura. Você pode examiná-lo para ver um local em um plano elementar. Cada cifra se conecta a 12 locais em cada plano elementar – normalmente grandes assentamentos. Qualquer pessoa que possua a cifra pode compreender a linguagem principal do plano ao qual a cifra está alinhada. Uma _cifra dos planos_ pode ser usada no lugar de uma chave planar para _teletransporte interplanar_ e magia semelhante para viajar para o plano ao qual está alinhado. Quando usado dessa forma, você chega infalivelmente ao local ao qual a cifra está alinhada.",
  },
    ],
  },
  "Clandestine Cloak": {
    description: "Manto cinza. Com o capuz, +1 em Furtividade e para Personificar um figurante, mas −1 em Diplomacia e Intimidação. 1 vez ao dia, véu de privacidade.\n\n**Ativar—Encobrir identidade** 2 ações (concentrar, manipular)\n**Frequência** 1 vez ao dia\n**Efeito** Você puxa the cloak's hood up and gain the benefits of _veil of privacy_ por 1 hora or until você pull the hood back down, whichever comes first.",
    activations: [
  {
    name: "Encobrir identidade",
    actionType: "two",
    traits: ["Concentrate","Manipulate"],
    frequency: "1 vez ao dia",
    effect: "Você puxa o capuz da capa para cima e ganha os benefícios do _véu de privacidade_ por 1 hora ou até puxar o capuz de volta para baixo, o que ocorrer primeiro.",
  },
    ],
  },
  "Clandestine Cloak (Greater)": {
    description: "Versão maior: +2 em Furtividade. Véu de privacidade de 5º posto por 8 horas.\n\n**Ativar—Encobrir identidade** 2 ações (concentrar, manipular)\n**Frequência** 1 vez ao dia\n**Efeito** Você puxa the cloak's hood up and gain the benefits of _veil of privacy_ por 1 hora or until você pull the hood back down, whichever comes first.",
    activations: [
  {
    name: "Encobrir identidade",
    actionType: "two",
    traits: ["Concentrate","Manipulate"],
    frequency: "1 vez ao dia",
    effect: "Você puxa o capuz da capa para cima e ganha os benefícios do _véu de privacidade_ por 1 hora ou até puxar o capuz de volta para baixo, o que ocorrer primeiro.",
  },
    ],
  },
  "Clarity Goggles (Greater)": {
    description: "Como os óculos menores, mas +3 de item em Percepção visual. A contraposição vale contra ilusão de magia de 9º posto ou menos, ou criatura de 19º nível ou menos, a 18 m. Sucesso: vê através por 10 minutos.\n\n**Ativar** 2 ações (concentrar, secret, illusion)\n**Frequência** 1 vez ao dia\n**Efeito** Você focus on seu environment and the criaturas around você to see them as they really are. The GM rolls a secret counteract teste using seu Percepção bônus against any illusion effect created by a 3º posto or lower magia or a criatura of 8th level or lower. Você deve be able to see the illusion, and it must be within 18 m. If the teste succeeds, você see through the illusion por 10 minutos.",
    activations: [
  {
    name: "",
    actionType: "two",
    traits: ["Concentrate","Secret","Illusion"],
    frequency: "1 vez ao dia",
    effect: "Você se concentra em seu ambiente e nas criaturas ao seu redor para vê-las como realmente são. O Mestre faz um teste secreto de contra-ataque usando seus bônus de Percepção contra qualquer efeito de ilusão criado por um 3º posto ou magia inferior ou uma criatura de 8º nível ou inferior. Você deve ser capaz de ver a ilusão, e ela deve estar dentro de 18 m. Se o teste for bem-sucedido, você verá através da ilusão por 10 minutos.",
  },
    ],
  },
  "Clarity Goggles (Lesser)": {
    description: "_Clarity goggles_ feature faceted lenses that filter seu surroundings from several slightly different angles at once, giving você a sharper picture of them. Enquanto estiver vestindo the goggles, você ganha a +1 bônus de item em visual Percepção testes.\n\n**Ativar** 2 ações (concentrar, secret, illusion)\n**Frequência** 1 vez ao dia\n**Efeito** Você focus on seu environment and the criaturas around você to see them as they really are. The GM rolls a secret counteract teste using seu Percepção bônus against any illusion effect created by a 3º posto or lower magia or a criatura of 8th level or lower. Você deve be able to see the illusion, and it must be within 18 m. If the teste succeeds, você see through the illusion por 10 minutos.",
    activations: [
  {
    name: "",
    actionType: "two",
    traits: ["Concentrate","Secret","Illusion"],
    frequency: "1 vez ao dia",
    effect: "Você se concentra em seu ambiente e nas criaturas ao seu redor para vê-las como realmente são. O Mestre faz um teste secreto de contra-ataque usando seus bônus de Percepção contra qualquer efeito de ilusão criado por um 3º posto ou magia inferior ou uma criatura de 8º nível ou inferior. Você deve ser capaz de ver a ilusão, e ela deve estar dentro de 18 m. Se o teste for bem-sucedido, você verá através da ilusão por 10 minutos.",
  },
    ],
  },
  "Clarity Goggles (Moderate)": {
    description: "Como os óculos menores, mas +2 de item em Percepção visual. A contraposição vale contra ilusão de magia de 6º posto ou menos, ou criatura de 13º nível ou menos, a 18 m. Sucesso: vê através por 10 minutos.\n\n**Ativar** 2 ações (concentrar, secret, illusion)\n**Frequência** 1 vez ao dia\n**Efeito** Você focus on seu environment and the criaturas around você to see them as they really are. The GM rolls a secret counteract teste using seu Percepção bônus against any illusion effect created by a 3º posto or lower magia or a criatura of 8th level or lower. Você deve be able to see the illusion, and it must be within 18 m. If the teste succeeds, você see through the illusion por 10 minutos.",
    activations: [
  {
    name: "",
    actionType: "two",
    traits: ["Concentrate","Secret","Illusion"],
    frequency: "1 vez ao dia",
    effect: "Você se concentra em seu ambiente e nas criaturas ao seu redor para vê-las como realmente são. O Mestre faz um teste secreto de contra-ataque usando seus bônus de Percepção contra qualquer efeito de ilusão criado por um 3º posto ou magia inferior ou uma criatura de 8º nível ou inferior. Você deve ser capaz de ver a ilusão, e ela deve estar dentro de 18 m. Se o teste for bem-sucedido, você verá através da ilusão por 10 minutos.",
  },
    ],
  },
  "Clawed Bracers": {
    description: "Braçadeiras de couro com garras de animal. 1 vez por hora, fundem-se aos braços: escalada 20 pés e garras 1d6 cortante.\n\n**Ativar—Estender garras** 1 ação (manipular, morph, agile, finesse)\n**Frequência** 1 vez por hora\n**Efeito** The bracers fuse temporarily with seu forearms, with the claws extending to seu fingertips. Você ganha a deslocamento de escalada of 6 m and a claw unarmed attack with the agile and finesse traits that deals 1d6 dano cortante. This lasts por 10 minutos or until você Dismiss it.",
    activations: [
  {
    name: "Estender garras",
    actionType: "one",
    traits: ["Manipulate","Morph","Agile","Finesse"],
    frequency: "1 vez por hora",
    effect: "As braçadeiras fundem-se temporariamente com os antebraços, com as garras estendendo-se até as pontas dos dedos. Você ganha uma distância de escalada de 6 m e um ataque de garra desarmado com traços de agilidade e delicadeza que causa 1d6 de dano cortante. Isso dura por 10 minutos ou até você dispensá-lo.",
  },
    ],
  },
  "Cloak Of Feline Rest": {
    description: "Manto de veludo negro, macio e sem adornos. Ao vestir pela primeira vez, uma onda de aconchego. Você descansa confortavelmente em qualquer espaço que não esteja molhado nem especialmente perigoso. Ao dormir com o manto, a penalidade de status em Percepção auditiva é só −2, não −4.",
  },
  "Cloak of Illusions": {
    description: "This cloak flows, covering and concealing the wearer's body. The cloak allows você to cast _figment_ como um truque inato ocultista. Although naturally a dull gray, while invested the cloak picks up colors and patterns from its surroundings, granting a +1 bônus de item em Furtividade testes.\n\n**Ativar—Puxar capuz** 2 ações (manipular)\n**Frequência** 1 vez ao dia\n**Efeito** Você draw the hood up and gain the effects of _invisibility_, with the magia's normal duration or until você pull the hood back down, whichever comes first.",
    activations: [
  {
    name: "Puxar capuz",
    actionType: "two",
    traits: ["Manipulate"],
    frequency: "1 vez ao dia",
    effect: "Você levanta o capuz e ganha os efeitos de _invisibilidade_, com a duração normal da magia ou até você puxar o capuz novamente para baixo, o que ocorrer primeiro.",
  },
    ],
  },
  "Cloak of Illusions (Greater)": {
    description: "Versão maior: +2 em Furtividade e invisibilidade de 4º posto.\n\n**Ativar—Puxar capuz** 2 ações (manipular)\n**Frequência** 1 vez ao dia\n**Efeito** Você draw the hood up and gain the effects of _invisibility_, with the magia's normal duration or until você pull the hood back down, whichever comes first.",
    activations: [
  {
    name: "Puxar capuz",
    actionType: "two",
    traits: ["Manipulate"],
    frequency: "1 vez ao dia",
    effect: "Você levanta o capuz e ganha os efeitos de _invisibilidade_, com a duração normal da magia ou até você puxar o capuz novamente para baixo, o que ocorrer primeiro.",
  },
    ],
  },
  "Cloak of Immolation": {
    description: "Parece manto clandestino. Se sofrer dano de fogo, também 1d10 de fogo persistente. Quem o acerta desarmado corpo a corpo enquanto o persistente está ativo leva fogo igual ao persistente do seu último turno. Na primeira ativação, funde-se a você.",
  },
  "Cloak of Social Graces": {
    description: "Capa de couro tingido à mão, cravejada de gemas. +1 de item em Diplomacia.\n\n**Ativar—Superar a dúvida** 2 ações (concentrar, manipular)\n**Frequência** 1 vez ao dia\n**Efeito** Você readjust seu cloak, straightening the collar and brushing out any wrinkles. Você ganha the effects of a _heroism_ magia por 1 minuto.",
    activations: [
  {
    name: "Superar a dúvida",
    actionType: "two",
    traits: ["Concentrate","Manipulate"],
    frequency: "1 vez ao dia",
    effect: "Você reajusta sua capa, alisando a gola e eliminando as rugas. Você ganha os efeitos de uma magia de _heroísmo_ por 1 minuto.",
  },
    ],
  },
  "Cloak of Social Graces (Greater)": {
    description: "Capa de couro tingido à mão, cravejada de gemas. +2 de item em Diplomacia.\n\n**Ativar—Superar a dúvida** 2 ações (concentrar, manipular)\n**Frequência** 1 vez ao dia\n**Efeito** Você readjust seu cloak, straightening the collar and brushing out any wrinkles. Você ganha the effects of a _heroism_ magia por 1 minuto.",
    activations: [
  {
    name: "Superar a dúvida",
    actionType: "two",
    traits: ["Concentrate","Manipulate"],
    frequency: "1 vez ao dia",
    effect: "Você reajusta sua capa, alisando a gola e eliminando as rugas. Você ganha os efeitos de uma magia de _heroísmo_ por 1 minuto.",
  },
    ],
  },
  "Cloak of Social Graces (Major)": {
    description: "Capa de couro tingido à mão, cravejada de gemas. +3 de item em Diplomacia.\n\n**Ativar—Superar a dúvida** 2 ações (concentrar, manipular)\n**Frequência** 1 vez ao dia\n**Efeito** Você readjust seu cloak, straightening the collar and brushing out any wrinkles. Você ganha the effects of a _heroism_ magia por 1 minuto.",
    activations: [
  {
    name: "Superar a dúvida",
    actionType: "two",
    traits: ["Concentrate","Manipulate"],
    frequency: "1 vez ao dia",
    effect: "Você reajusta sua capa, alisando a gola e eliminando as rugas. Você ganha os efeitos de uma magia de _heroísmo_ por 1 minuto.",
  },
    ],
  },
  "Cloak of Swiftness": {
    description: "Manto leve como nuvem. Ao investir, o modificador de Destreza sobe em 1 ou vai a +4, o que for maior. +3 de bônus de item em Acrobacia.\n\n**Ativar—Cavalgar o vento** 1 ação (manipular)\n**Frequência** 1 vez ao dia\n**Efeito** Você tug on the cloak, wrapping yourself in the power of wind. Você ganha a deslocamento de voo of 9 m por 1 hora. While wrapped in the cloak, você become translucent, causing você to become oculto for the duration.",
    activations: [
  {
    name: "Cavalgar o vento",
    actionType: "one",
    traits: ["Manipulate"],
    frequency: "1 vez ao dia",
    effect: "Você puxa a capa, envolvendo-se na força do vento. Você ganha um deslocamento de voo de 9 m por 1 hora. Enquanto envolto na capa, você se torna translúcido, fazendo com que você fique oculto durante todo o tempo.",
  },
    ],
  },
  "Cloak of the False Foe": {
    description: "Images of strange animals and distorted figures are woven into this coarse, fur-lined cloak.\n\n**Ativar—Forma críptida** 1 ação (manipular, polymorph, primal)\n**Frequência** 1 vez ao dia\n**Efeito** The cloak rises to envelop seu head and body, reshaping seu appearance into that of a locally feared cryptid. If there is no such figure in local lore, the cloak of the false foe instead alters seu appearance into a form imagined by the crafter of the cloak. One choice that occurs with disturbing frequency is a gaunt figure with triple-jointed fingers; an eyeless, hairless head with a lamprey mouth in the center of its face; and stubby tentacles waving down its neck. The transformation also grants the effects of either a 3º posto _humanoid form_ magia that lasts por 1 hora if você turno into a Medium cryptid, or a 5º posto humanoid form magia that lasts por 10 minutos if Kit você turno into a Large cryptid. While você're in cryptid form, any wounds left by seu magias and Golpes appear to be the result of the cryptid's unarmed attacks and special abilities to a casual inspection. This doesn't alter the actual dano type inflicted or the effects of such attack. Someone closely studying the wounds can, with a successful CD 30 Medicina teste, realize that magic has altered the appearance of the injuries.",
    activations: [
  {
    name: "Forma críptida",
    actionType: "one",
    traits: ["Manipulate","Polymorph","Primal"],
    frequency: "1 vez ao dia",
    effect: "O manto sobe para envolver sua cabeça e corpo, remodelando sua aparência na de um criptídeo temido localmente. Se não existir tal figura na tradição local, o manto do falso inimigo altera sua aparência para uma forma imaginada pelo criador do manto. Uma escolha que ocorre com frequência perturbadora é uma figura esquelética com dedos triplamente articulados; uma cabeça sem olhos e sem pêlos, com uma boca de lampreia no centro do rosto; e tentáculos grossos balançando em seu pescoço. A transformação também concede os efeitos de uma magia de 3º posto _forma humanóide_ que dura por 1 hora se você se transformar em um criptídeo Médio, ou uma magia de 5º posto de forma humanóide que dura por 10 minutos se Kit você se transformar em um criptídeo Grande. Enquanto você está na forma de criptídeo, quaisquer ferimentos deixados por suas magias e Golpes parecem ser o resultado do ataque desarmado e de habilidades especiais do criptídeo para uma inspeção casual. Isso não altera o tipo de dano infligido ou os efeitos de tal ataque. Alguém estudando atentamente as feridas pode, com um teste CD 30 Medicina bem-sucedido, perceber que a magia alterou a aparência das lesões.",
  },
    ],
  },
  "Cloak of Waves & Clouds": {
    description: "This magical cloak was crafted from the feathers and scales of a legendary giant fish that could transform into a resplendent bird.\n\n**Ativar—Cortar ar e mar** 1 ação (concentrar, manipular)\n**Efeito** The cloak ripples, becoming either giant eagle feathers or iridescent fish scales. Until você next Ativar the cloak, você ganha either a deslocamento de natação of 18 m and the ability to breathe underwater or a deslocamento de voo of 12 m.",
    activations: [
  {
    name: "Cortar ar e mar",
    actionType: "one",
    traits: ["Concentrate","Manipulate"],
    effect: "O manto ondula, tornando-se penas gigantes de águia ou escamas iridescentes de peixe. Até a próxima ativação do manto, você ganha uma posição de natação de 18 m e a capacidade de respirar debaixo d'água ou uma posição de voo de 12 m.",
  },
    ],
  },
  "Clockwork Cloak": {
    description: "Paper-thin interlocking cogs and gears make up the bronze _clockwork cloak_.\n\n**Ativar** reação (manipular)\n**Frequência** 1 vez ao dia\n**Gatilho** Você're struck by a melee attack with a held arma\n**Efeito** The folds of the cloak attempt to divert the attack and catch the arma in the cloak's gears. Make an Atletismo teste to Desarmar the attacking criatura.\n\n**Ativar** 2 ações (manipular)\n**Efeito** Você wrap the cloak around yourself and the winding gears decelerate seu body, causing você to enter standby mode. While in standby mode você don't need to eat, drink, or sleep. Você permanece aware of seu surroundings but take a –4 penalidade to Percepção testes. Você pode stay in standby mode indefinitely, although seu body ages normally. Você pode leave standby mode as a ação livre. Se você do so to initiate combat, você ganha a +2 bônus de item em seu iniciativa roll.",
    activations: [
  {
    name: "",
    actionType: "reaction",
    traits: ["Manipulate"],
    frequency: "1 vez ao dia",
    trigger: "Você foi atingido por um ataque corpo a corpo com uma arma empunhada",
    effect: "As dobras da capa tentam desviar o ataque e prender a arma nas engrenagens da capa. Faça um teste de Atletismo para Desarmar a criatura atacante.",
  },
  {
    name: "",
    actionType: "two",
    traits: ["Manipulate"],
    effect: "Você se enrola na capa e as engrenagens desaceleram seu corpo, fazendo com que você entre no modo de espera. Enquanto estiver no modo de espera, você não precisa comer, beber ou dormir. Você permanece atento ao seu entorno, mas toma um –4 de sorte para Percepção de testes. Você pode ficar no modo de espera indefinidamente, embora seu corpo envelheça normalmente. Você pode sair do modo de espera como ação livre. Se você fizer isso para iniciar o combate, você ganha +2 bônus de item em seu lançamento de iniciativa.",
  },
    ],
  },
  "Cloister Robe (Greater)": {
    description: "Como o manto menor, mas vestes de explorador +2 resiliente maior com traço focado. Também tem os bônus e a ativação das vestimentas devotas: 1 Ponto de Foco 1 vez ao dia só para magia de domínio, e cura extra de ferir ou curar em fiéis. Resistência a magias divinas = metade do nível. Fabricação: clérigo dessa divindade.",
  },
  "Cloister Robe (Lesser)": {
    description: "Manto de clérigo enclausurado; símbolo sagrado da divindade (não precisa empunhar). Vestes de explorador +1 resiliente e +1 de item em Religião. Sem benefício se não cultuar essa divindade. Ao conjurar magia de domínio dela, resistência a dano de magias divinas até o fim do próximo turno igual à metade do nível do manto. Fabricação: clérigo dessa divindade.",
  },
  "Cloister Robe (Major)": {
    description: "Como o manto maior, mas vestes de explorador +3 resiliente maior. Traço focado, ativação das vestimentas devotas e resistência a magias divinas = metade do nível. Fabricação: clérigo dessa divindade.",
  },
  "Cloister Robe (Moderate)": {
    description: "Como o manto menor, mas vestes de explorador +2 resiliente e +2 de item em Religião. Resistência a magias divinas = metade do nível ao conjurar magia de domínio. Fabricação: clérigo dessa divindade.",
  },
  "Cloth of Nullification": {
    description: "This small piece of embroidered cloth is inimical to all magic.\n\n**Ativar—Anular magia** 2 ações (manipular)\n**Efeito** Você cover a magic item with the cloth or wave the cloth near a magic effect and attempt to counteract the effect or item. The cloth's counteract teste modifier is +32, and its counteract rank is 10. Regardless of the result, the _cloth of nullification_ can't be activated again for 2d6 hours. On a success, the effect or item is deactivated for the same amount of time, and its duration, if any, continues to expire during that time. With a successful counteract teste, você pode instead choose to completely absorb the magic from the effect or item into the _cloth of nullification_. Se você do, both become completely non-magical and their magic can't be recovered, even by the _remake_ magia. The _cloth of nullification_ automatically fails to counteract most artifacts and similarly powerful items.",
    activations: [
  {
    name: "Anular magia",
    actionType: "two",
    traits: ["Manipulate"],
    effect: "Você cobre um item mágico com o pano ou agita o pano perto de um efeito mágico e tenta neutralizar o efeito do item. O modificador de teste de contra-ataque do pano é +32, e sua classificação de contra-ataque é 10. Independentemente do resultado, o _tecido da anulação_ não pode ser ativado novamente por 2d6 horas. Caso obtenha sucesso, o efeito ou item é desativado pelo mesmo período de tempo e sua duração, se houver, continua a expirar durante esse período. Com um teste de neutralização bem-sucedido, você pode optar por absorver completamente a magia do efeito ou item no _pano de anulação_. Se você fizer isso, ambos se tornarão completamente não-mágicos e sua magia não poderá ser recuperada, mesmo pela magia _remake_. O _pano de anulação_ falha automaticamente em neutralizar a maioria dos artefatos e itens igualmente poderosos.",
  },
    ],
  },
  "Cloud Pouch": {
    description: "Sacola com pó prateado sedoso. Ao espalhar, forma uma nuvem de névoa que você pode mover sustentando a\n\n**Ativar—Dispersar** 2 ações (manipular)\n**Frequência** 1 vez por hora\n**Efeito** Você scatter the dust into the air around você, causing it to condense into a cloud in a 6 m burst within 3 m, as the _mist_ magia. Você pode Sustain the activation to make the cloud Voar 6 m. The cloud lasts 1 minute, and você pode Dismiss it.",
    activations: [
  {
    name: "Dispersar",
    actionType: "two",
    traits: ["Manipulate"],
    frequency: "1 vez por hora",
    effect: "Você espalha a poeira no ar ao seu redor, fazendo com que ela se condense em uma nuvem em uma explosão de 6 m dentro de 3 m, como a magia _névoa_. Você pode sustentar a ativação para fazer a nuvem Voar 6 m. A nuvem dura 1 minuto e você pode Descartá-la.",
  },
    ],
  },
  "Codebreaker": {
    description: "This finely crafted, seemingly mundane parchment is useful for writing sensitive documents. When words are written on this parchment, they instantly scramble into unrecognizable script, requiring a CD 20 teste to Decifrar Escrita. Both of the parchment’s activations require speaking a password or pass phrase, imbued into the parchment when created. A character must critically succeed on the teste to Identificar Magia when examining the parchment to learn the password.\n\n**Ativar—Queimar após ler** 1 ação (concentrar)\n**Efeito** The words on the parchment seem to catch fire, completely burning away while leaving the parchment unharmed and ready to bear more text.\n\n**Ativar—Decifrar escrita** 1 ação (concentrar)\n**Efeito** The scrambled words align into the originally written script.",
    activations: [
  {
    name: "Queimar após ler",
    actionType: "one",
    traits: ["Concentrate"],
    effect: "As palavras no pergaminho parecem pegar fogo, queimando completamente, deixando o pergaminho ileso e pronto para conter mais texto.",
  },
  {
    name: "Decifrar escrita",
    actionType: "one",
    traits: ["Concentrate"],
    effect: "As palavras embaralhadas se alinham com a escrita original.",
  },
    ],
  },
  "Codebreaker's Parchment": {
    description: "Pergaminho fino, aparentemente mundano, para documentos sensíveis. Palavras escritas embaralham-se na hora (CD 20 para Decifrar escrita). As duas ativações exigem a senha imbuída na criação; sucesso crítico em Identificar Magia ao examiná-lo revela a senha.\n\n**Ativar—Queimar após ler** 1 ação (concentrar)\n**Efeito** The words on the parchment seem to catch fire, completely burning away while leaving the parchment unharmed and ready to bear more text.\n\n**Ativar—Decifrar escrita** 1 ação (concentrar)\n**Efeito** The scrambled words align into the originally written script.",
    activations: [
  {
    name: "Queimar após ler",
    actionType: "one",
    traits: ["Concentrate"],
    effect: "As palavras no pergaminho parecem pegar fogo, queimando completamente, deixando o pergaminho ileso e pronto para conter mais texto.",
  },
  {
    name: "Decifrar escrita",
    actionType: "one",
    traits: ["Concentrate"],
    effect: "As palavras embaralhadas se alinham com a escrita original.",
  },
    ],
  },
  "Coldstar Pistols": {
    description: "Par de pistolas de duelo: uma +3 impactante maior flamejante maior, a outra +3 impactante maior gélida maior. Unidas, cano duplo +4 impactante máxima flamejante maior e gélida maior, incremento 36 m. Em qualquer forma: ágil, ocultável, concussiva e fatal d10. Armas estelares: magia, sem munição nem pólvora.\n\n**Ativar** 1 ação (manipular)\n**Efeito** Você switch the _Coldstar Pistols_ from one form to the other. Attempt a Enganação teste to Feint with a +4 bônus de circunstância.\n\n**Ativar** 1 ação (manipular)\n**Frequência** 1 vez por rodada\n**Efeito** Make two Golpes against one alvo, taking the highest of the two rolagem de ataques and applying it to both attacks. Seu penalidade de ataques múltiplos increases only after these Golpes. **Destruction** If Deft Onki's name and deeds ever fade from mortal memory entirely, the _Coldstar Pistols_ can be destroyed like a normal object.",
    activations: [
  {
    name: "",
    actionType: "one",
    traits: ["Manipulate"],
    effect: "Você troca as _Coldstar Pistols_ de uma forma para outra. Tente um teste de Enganação para Fintar com +4 bônus de circunstância.",
  },
  {
    name: "",
    actionType: "one",
    traits: ["Manipulate"],
    frequency: "1 vez por rodada",
    effect: "Faça dois Golpes contra um alvo, pegando a maior rolagem de ataques e aplicando-a em ambos os ataques. Sua discussão de ataques múltiplos só aumenta depois desses Golpes. **Destruição** Se o nome e os feitos de Deft Onki desaparecerem completamente da memória mortal, as _Coldstar Pistols_ poderão ser destruídas como um objeto normal.",
  },
    ],
  },
  "Collar of Empathy": {
    description: "Coleira e pulseira de tiras de couro. Você e o companheiro investem o par e sentem o estado um do outro.\n\n**Ativar—Elo empático** 1 ação (concentrar)\n**Efeito** Você perceive through seu animal companion's senses em vez de seu own. Você pode Sustain the activation. Você está unaware of seu own surroundings for enquanto você está using seu animal companion's senses. In addition to the obvious use when você está separated from seu companion, this ability might allow você to notice sounds, scents, and other stimuli that seu companion's senses register but yours alone don't.",
    activations: [
  {
    name: "Elo empático",
    actionType: "one",
    traits: ["Concentrate"],
    effect: "Você percebe através dos sentidos do seu companheiro animal em vez dos seus próprios. Você pode sustentar a ativação. Você não tem consciência do que está ao seu redor enquanto usa os sentidos de seu companheiro animal. Além do uso óbvio quando você está separado de seu companheiro, essa habilidade pode permitir que você perceba sons, cheiros e outros estímulos que os sentidos de seu companheiro registram, mas os seus sozinhos não.",
  },
    ],
  },
  "Collar of Inconspicuousness": {
    description: "Coleira surrada. O companheiro investe e pode assumir forma inofensiva Minúscula (gato em vez de tigre, filhote em vez de lobo).",
  },
  "Collar Of The Eternal Bond": {
    description: "Ao investir no eidolon, vira um colar à forma dele e brilha com o símbolo compartilhado. O eidolon pode afastar-se até 45 m (em vez de 30 m) antes de desmanifestar.\n\n**Ativar—Liberdade do eidolon** 1 ação (concentrar)\n**Frequência** 1 vez ao dia\n**Efeito** Seu eidolon focuses their will on the collar, allowing the collar to maintain the connection between você at any distance. For the next 5 minutes, você and seu eidolon can move any distance from each other without seu eidolon unmanifesting. When the duration ends, if seu eidolon is more than 150 pés from você, they immediately unmanifest.",
    activations: [
  {
    name: "Liberdade do eidolon",
    actionType: "one",
    traits: ["Concentrate"],
    frequency: "1 vez ao dia",
    effect: "Seu eidolon concentra sua vontade na coleira, permitindo que a coleira mantenha a conexão entre vocês a qualquer distância. Pelos próximos 5 minutos, você e seu eidolon podem se mover a qualquer distância um do outro sem que seu eidolon deixe de se manifestar. Quando a duração termina, se seu eidolon estiver a mais de 45 m de você, eles imediatamente não se manifestam.",
  },
    ],
  },
  "Comandant": {
    description: "Only the leader of an army could wear this diamond and ruby-encrusted scabbard that somehow always remains shiny no matter how terrible the conditions. Enquanto estiver vestindo the scabbard, você feel exceptionally powerful, and você ganha a +3 bônus de item em Atletismo testes. When você invest the scabbard, você either increase seu Força modifier by 1 or increase it to +4, whichever would give você a higher value. The _commandant’s scabbard_ holds one melee arma of 1 Volume or lighter. Whenever a arma is drawn from the scabbard, it gains a +4 bônus de status em dano por 1 rodada.\n\n**Ativar—Saque imponente** 1 ação (destino)\n**Frequência** 1 vez por hora\n**Requisitos** Você tem a arma sheathed in seu _commandant’s scabbard_\n**Efeito** Você Interact to draw seu arma from seu scabbard and Golpe with it. On that Golpe, você pode roll twice and take the better result.",
    activations: [
  {
    name: "Saque imponente",
    actionType: "one",
    traits: ["Fortune"],
    frequency: "1 vez por hora",
    requirements: "Você tem a arma sheathed in seu _commandant’s scabbard_",
    effect: "Você interagir para sacar sua arma da bainha e Golpe com ela. Nesse Golpe, você pode rolar duas vezes e tirar o melhor resultado.",
  },
    ],
  },
  "Comandant's Scabbard": {
    description: "Bainha cravejada de diamantes e rubis, sempre brilhante. +3 de item em Atletismo. Ao investir: Força +1 ou até +4 (o que for maior). Guarda uma arma corpo a corpo de Volume 1 ou menos. Ao sacar uma arma da bainha, ela ganha +4 de status no dano por 1 rodada.\n\n**Ativar—Saque imponente** 1 ação (destino)\n**Frequência** 1 vez por hora\n**Requisitos** Você tem a arma sheathed in seu _commandant’s scabbard_\n**Efeito** Você Interact to draw seu arma from seu scabbard and Golpe with it. On that Golpe, você pode roll twice and take the better result.",
    activations: [
  {
    name: "Saque imponente",
    actionType: "one",
    traits: ["Fortune"],
    frequency: "1 vez por hora",
    requirements: "Você tem a arma sheathed in seu _commandant’s scabbard_",
    effect: "Você interagir para sacar sua arma da bainha e Golpe com ela. Nesse Golpe, você pode rolar duas vezes e tirar o melhor resultado.",
  },
    ],
  },
  "Compass of Transpositional Awareness": {
    description: "Bússola prateada sob vidro, gravada com símbolos esotéricos, ícones obscuros e abreviações indecifráveis.\n\n**Ativar—Rastrear teleportação** 1 ação (concentrar, manipular, teleportation)\n**Frequência** 1 vez por minuto\n**Efeito** Você point the _compass of transpositional awareness_ at an extant teleportation effect (such as a magical portal) or the site of a teleportation effect that existed within the last 1 minute (such as the space where a criatura just cast _translocate_). Attempt an Ocultismo teste to determine to where the effect leads or led. The CD of this teste is the effect's counteract CD. On a success, você know roughly the destination of the teleportation effect (for example “the Plane of Fire,” “north,” or “Avistan”). On a critical success, você ascertain the exact destination within mere feet for local effects (such as translocate) or within a few miles for long-range effects (such as _teleport_, _interplanar teleport_, or interdimensional portals).\n\n**Ativar—Triangular** 1 ação (concentrar, manipular)\n**Frequência** 1 vez ao dia\n**Efeito** Você use the _compass of transpositional awareness_ to triangulate seu current coordinates and those of seu intended destination using teleportation magic. For 1 minute, whenever você cast a teleportation magia that has a range, increase that magia's range by 9 m. If the magia normally has a range of touch, extend its range to 9 m.",
    activations: [
  {
    name: "Rastrear teleportação",
    actionType: "one",
    traits: ["Concentrate","Manipulate","Teleportation"],
    frequency: "1 vez por minuto",
    effect: "Você aponta a bússola da consciência transposicional para um efeito de teletransporte existente (como um portal mágico) ou para o local de um efeito de teletransporte que existiu no último minuto (como o espaço onde uma criatura acabou de lançar _translocar_). Faça um teste de Ocultismo para determinar aonde o efeito leva ou leva. O CD deste teste é o CD de neutralização do efeito. Com um sucesso, você sabe aproximadamente o destino do efeito de teletransporte (por exemplo, “o Plano de Fogo”, “norte” ou “Avistan”). Com um sucesso crítico, você determina o destino exato a poucos metros para efeitos locais (como translocar) ou dentro de alguns quilômetros para efeitos de longo alcance (como _teletransporte_, _teletransporte interplanar_ ou portais interdimensionais).",
  },
  {
    name: "Triangular",
    actionType: "one",
    traits: ["Concentrate","Manipulate"],
    frequency: "1 vez ao dia",
    effect: "Você usa a bússola da consciência transposicional para triangular suas coordenadas atuais e aquelas do destino pretendido usando magia de teletransporte. Por 1 minuto, sempre que você lançar uma magia de teletransporte que tenha alcance, aumente o alcance dessa magia em 9 m. Se a magia normalmente tem alcance de toque, estenda seu alcance para 9 m.",
  },
    ],
  },
  "Conch of Otherworldly Seas": {
    description: "Concha bela coberta de escrita mágica, com luz azul no interior. Instrumento musical virtuoso de mão: +2 de item em Atuação ao usá-la. Chave planar para teleporte interplanar e magias semelhantes ao Plano da Água. Ao usá-la assim, sintonize às águas do destino: aparece a 1d6×40 km do destino pretendido (em vez de 1d10×40 km).\n\n**Ativar—Voz dos oceanos** 1 ação (manipular)\n**Efeito** Você hold the horn to seu ear and can understand and speak Thalassic enquanto it remains there.\n\n**Ativar—Sons das profundezas** (concentrar, manipular)\n**Efeito** Você hold the horn to seu ear and touch the correct series of runes inscribed on its surface, causing the conch to cast a 5º posto _clairaudience_ magia for seu benefit. Provided você choose a location that's underwater, você pode extend the magia's range to 1,6 km and hear with perfect clarity.",
    activations: [
  {
    name: "Voz dos oceanos",
    actionType: "one",
    traits: ["Manipulate"],
    effect: "Você segura o chifre no ouvido e pode entender e falar talássico enquanto ele permanece lá.",
  },
  {
    name: "Sons das profundezas",
    traits: ["Concentrate","Manipulate"],
    effect: "Você segura o chifre junto ao ouvido e toca a série correta de runas inscritas em sua superfície, fazendo com que a concha lance uma magia de 5º posto _clairaudience_ para seu benefício. Desde que você escolha um local subaquático, você pode estender o alcance da magia para 1,6 km e ouvir com perfeita clareza.",
  },
    ],
  },
  "Conspirator's Cookie": {
    description: "Biscoito de chocolate imbuído numa língua. Ao comer, por 10 minutos suas palavras nessa língua soam como outra combinada na fabricação; ouvintes não percebem a troca sem Procurar (Percepção contra sua CD de Enganação).",
  },
  "Constant Crosier": {
    description: "Cajado de pastor gasto, comum entre capelães de deuses mais primais. Haste de madeira marcada por fogo, cheiro de refeições de acampamento. Conta como símbolo sagrado de madeira para deuses que concedem o domínio da natureza. Em modo de exploração, você e aliados a 36 m tratam Deslocamento de viagem de 4,5 m ou menos como 7,5 m.\n\n**Ativar—Estação da areia** 1 ação (manipular, visual)\n**Frequência** 1 vez ao dia\n**Efeito** Você brandish the constant crosier high in the air and wave it about. All aliados within 18 m who can see the crosier receive a +1 bônus de status em salvaguarda de Fortitudes and resistência 5 to dano persistente por 1 minuto.",
    activations: [
  {
    name: "Estação da areia",
    actionType: "one",
    traits: ["Manipulate","Visual"],
    frequency: "1 vez ao dia",
    effect: "Você brandir o báculo constante no ar e agitá-lo. Todos os aliados num raio de 18 m que puderem ver o báculo recebem +1 bônus de status em salvaguarda de Fortitudes e resistência 5 ao dano persistente por 1 minuto.",
  },
    ],
  },
  "Coral Aspect": {
    description: "Máscara de madeira petrificada em forma de recife. +1 de item em Atletismo para Nadar; a armadura que você veste ganha o traço aquadinâmico.\n\n**Ativar—Coabitar** 2 ações (concentrar, manipular, polymorph)\n**Frequência** 1 vez ao dia\n**Efeito** For 1 minute, seu body becomes a mobile coral reef, letting much smaller criaturas pass through or shelter in it. Creatures at least one size category smaller than você pode share seu space. Allies that share seu space gain a +2 bônus de circunstância em their AC, and você ganha resistência 5 to any dano caused by a criatura sharing the same space as você.",
    activations: [
  {
    name: "Coabitar",
    actionType: "two",
    traits: ["Concentrate","Manipulate","Polymorph"],
    frequency: "1 vez ao dia",
    effect: "For 1 minute, seu body becomes a mobile coral reef, letting much smaller criaturas pass through ou shelter in it. Creatures at least one size category smaller than você pode share seu space. Allies that share seu space gain a +2 bônus de circunstância em their AC, and você ganha resistência 5 to any dano caused by a criatura sharing the same space as você.",
  },
    ],
  },
  "Core Bugle": {
    description: "Corneta de latão marcada pelo tempo, mas em excelente estado. Borda da boquilha com runas. +2 de item em Atuação ao tocar.\n\n**Ativar—Reveille** 1 ação (auditivo, manipular)\n**Frequência** 1 vez ao dia\n**Efeito** Você blow a swift cadence of sharp notes that carries through the air. Você and all aliados within a 30- foot emanation can immediately Stand as a ação livre; this doesn’t provoke reactions.",
    activations: [
  {
    name: "Reveille",
    actionType: "one",
    traits: ["Auditory","Manipulate"],
    frequency: "1 vez ao dia",
    effect: "Você sopra uma cadência rápida de notas agudas que percorre o ar. Você e todos os aliados dentro de uma emanação de 9 metros podem imediatamente permanecer como ação livre; isso não provoca reações.",
  },
    ],
  },
  "Cornucopia of Plenty": {
    description: "This exquisite wicker horn is made of green wood and smells of fresh wheat and barley.\n\n**Ativar—Rações abundantes** 1 ação (manipular)\n**Frequência** 1 vez ao dia\n**Efeito** Você draw forth and consume a filling snack from this cornucopia. Você ganha 5 PV temporários that last por 1 minuto and suppress the effects of the fatigado condition por 10 minutos.",
    activations: [
  {
    name: "Rações abundantes",
    actionType: "one",
    traits: ["Manipulate"],
    frequency: "1 vez ao dia",
    effect: "Você tira e come um lanche recheado desta cornucópia. Você ganha 5 PV temporários que duram por 1 minuto e suprimem os efeitos da condição fatigada por 10 minutos.",
  },
    ],
  },
  "Corpseward Pendant": {
    description: "A _corpseward pendant_ is usually shaped like the skull of a humanoid or small animal.\n\n**Ativar** 1 ação (manipular, undead, vitalidade)\n**Frequência** 1 vez por hora\n**Efeito** Você fica undetectable to undead criaturas por 10 minutos. Undead can’t see, hear, or smell você, or detect você with sensory capabilities such as tremorsense. A criatura can faça um teste CD 18 Vontade salvaguarda to ignore this effect. If an undead has reason to believe that indetectado opponents are present, it can still attempt to Procurar or Golpe você. Se você attempt to use a vitality magia to dano undead, touch or dano an undead criatura, or attack any criatura while warded in this manner, the pendant’s effects immediately end. An undead criatura who observes você in this manner or one who succeeds at the salvaguarda de Vontade is immune to the _corpseward pendant_ for 24 hours.",
    activations: [
  {
    name: "",
    actionType: "one",
    traits: ["Manipulate","Undead","Vitality"],
    frequency: "1 vez por hora",
    effect: "Você fica indetectável para criaturas mortas-vivas por 10 minutos. Mortos-vivos não podem ver, ouvir ou cheirar você, nem detectar você com capacidades sensoriais, como sentido de tremor. Uma criatura pode fazer um teste CD 18 Vontade salvaguarda para ignorar este efeito. Se um morto-vivo tiver motivos para acreditar que oponentes indetectados estão presentes, ele ainda poderá tentar Procurar ou Golpe você. Se você tentar usar uma magia de vitalidade para danificar mortos-vivos, tocar ou danificar uma criatura morta-viva ou atacar qualquer criatura enquanto estiver protegido dessa maneira, os efeitos do pingente cessarão imediatamente. Uma criatura morta-viva que observa você dessa maneira ou que obtém sucesso na proteção de Vontade fica imune ao _pingente de cadáver_ por 24 horas.",
  },
    ],
  },
  "Countering Charm": {
    description: "Gema com inclusão de chumbo. Guarda uma magia de espaço para contrapô-la depois (+20). Incomum.\n\n**Ativar—Contrapor** reação (manipular)\n**Gatilho** Você está targeted by or within the area of the magia stored within the charm\n**Requisitos** Você tem a free hand\n**Efeito** Você present the charm and attempt to counteract the triggering magia, using the rank of the magia stored in the charm and a counteract modifier of +20. This expends the magia held in the charm.",
    activations: [
  {
    name: "Contrapor",
    actionType: "reaction",
    traits: ["Manipulate"],
    trigger: "Você está sendo alvo de ou dentro da área da magia armazenada no encanto",
    requirements: "Você tem a free hand",
    effect: "Você apresenta o feitiço e tenta neutralizar a magia desencadeada, usando o nível da magia armazenada no feitiço e um modificador de neutralização de +20. Isso gasta a magia contida no feitiço.",
  },
    ],
  },
  "Countering Charm (Greater)": {
    description: "This glittering charm is made of a gemstone flawed with a leaden inclusion. Spellcasters can cast magias into _countering charms_ that they've invested or that are invested by a willing criatura. The magia's effect doesn't occur; the magia's power is instead stored within the charm, replacing any magia previously there. The charm can hold only magias cast from magia slots, not cantrips or focus magias. While the charm is invested, the criatura who has invested it knows what magia is stored within and automatically identifies that magia when it's cast. The charm’s counteract modifier is +25.\n\n**Ativar—Contrapor** reação (manipular)\n**Gatilho** Você está targeted by or within the area of the magia stored within the charm\n**Requisitos** Você tem a free hand\n**Efeito** Você present the charm and attempt to counteract the triggering magia, using the rank of the magia stored in the charm and a counteract modifier of +20. This expends the magia held in the charm.",
    activations: [
  {
    name: "Contrapor",
    actionType: "reaction",
    traits: ["Manipulate"],
    trigger: "Você está sendo alvo de ou dentro da área da magia armazenada no encanto",
    requirements: "Você tem a free hand",
    effect: "Você apresenta o feitiço e tenta neutralizar a magia desencadeada, usando o nível da magia armazenada no feitiço e um modificador de neutralização de +20. Isso gasta a magia contida no feitiço.",
  },
    ],
  },
  "Countering Charm (Major)": {
    description: "This glittering charm is made of a gemstone flawed with a leaden inclusion. Spellcasters can cast magias into _countering charms_ that they've invested or that are invested by a willing criatura. The magia's effect doesn't occur; the magia's power is instead stored within the charm, replacing any magia previously there. The charm can hold only magias cast from magia slots, not cantrips or focus magias. While the charm is invested, the criatura who has invested it knows what magia is stored within and automatically identifies that magia when it's cast. The charm’s counteract modifier is +30.\n\n**Ativar—Contrapor** reação (manipular)\n**Gatilho** Você está targeted by or within the area of the magia stored within the charm\n**Requisitos** Você tem a free hand\n**Efeito** Você present the charm and attempt to counteract the triggering magia, using the rank of the magia stored in the charm and a counteract modifier of +20. This expends the magia held in the charm.",
    activations: [
  {
    name: "Contrapor",
    actionType: "reaction",
    traits: ["Manipulate"],
    trigger: "Você está sendo alvo de ou dentro da área da magia armazenada no encanto",
    requirements: "Você tem a free hand",
    effect: "Você apresenta o feitiço e tenta neutralizar a magia desencadeada, usando o nível da magia armazenada no feitiço e um modificador de neutralização de +20. Isso gasta a magia contida no feitiço.",
  },
    ],
  },
  "Coyote Cloak": {
    description: "Manto de pelo de coiote. +1 em Sobrevivência. Crítico ao Subsistir alimenta o dobro de extras.",
  },
  "Coyote Cloak (Greater)": {
    description: "Versão maior: +2 em Sobrevivência e o quádruplo de extras no crítico ao Subsistir.",
  },
  "Crafter": {
    description: "This rugged metal eyepiece etched with square patterns is designed to be worn over a single eye. Twisting the lens reveals a faint three-dimensional outline of an item você plan to build or repair, with helpful labels on the component parts. Você ganha +1 bônus de item em Ofício testes. When você Repair an item, increase the PV restored to 10 + 10 per proficiency rank on a success or 15 + 15 per proficiency rank on a critical success.",
  },
  "Crafter's Eyepiece": {
    description: "Lente de metal. +1 em Ofício. Reparos restauram mais PV no item.",
  },
  "Crafter's Eyepiece (Greater)": {
    description: "Versão maior: +2 em Ofício e 1 vez ao dia criação de 5º posto.\n\n**Ativar—Protótipo** (manipular)\n**Frequência** 1 vez ao dia\n**Efeito** Você calibrate the eyepiece to have it cast a 5º posto _creation_ magia over the course of 1 minute to construct a temporary item.",
    activations: [
  {
    name: "Protótipo",
    traits: ["Manipulate"],
    frequency: "1 vez ao dia",
    effect: "Você calibra a ocular para que ela lance uma magia de 5º posto _creation_ ao longo de 1 minuto para construir um item temporário.",
  },
    ],
  },
  "Crown of Intellect": {
    description: "Coroa de ouro com três gemas. Ao investir, o modificador de Inteligência sobe em 1 ou vai a +4, o que for maior — isso dá perícias treinadas e idiomas extras, escolhidos na primeira vez e repetidos sempre que investir a mesma coroa. +3 de bônus de item para Recordar conhecimento, qualquer perícia.\n\n**Ativar—Vasculhar a mente** 1 ação (concentrar)\n**Frequência** 1 vez por hora\n**Efeito** Você ganha the effects of _hypercognition_.",
    activations: [
  {
    name: "Vasculhar a mente",
    actionType: "one",
    traits: ["Concentrate"],
    frequency: "1 vez por hora",
    effect: "Você ganha os efeitos da _hipercognição_.",
  },
    ],
  },
  "Crown of the Companion": {
    description: "Stories tell of a king who once loved his subjects so much he was willing to give his own life energy for them, using an object like the _crown of the companion_. Whether true or not, this majestic wooden crown bears elaborate carvings depicting that tale with images of a regal figure giving increasingly of themself to a throng of needy subjects. Enquanto estiver vestindo este crown, você ganha a +1 bônus de item em Diplomacia testes.\n\n**Ativar** 2 ações (concentrar, manipular)\n**Frequência** 1 vez ao dia\n**Efeito** Você bow to an aliado within 9 m, creating a magical bond between the two of você as if você cast _share life_ targeting the aliado. The link remains even if você move more than 9 m away from them. At the end of the magia’s duration, seu aliado recovers 4d8 PV and você recover half of what they recover.",
    activations: [
  {
    name: "",
    actionType: "two",
    traits: ["Concentrate","Manipulate"],
    frequency: "1 vez ao dia",
    effect: "Você se curva para um aliado dentro de 9 m, criando um vínculo mágico entre vocês dois, como se você lançasse _share life_ visando o aliado. O link permanece mesmo se você se afastar mais de 9 m deles. Ao final da duração da magia, seu aliado recupera 4d8 PV e você recupera metade do que recuperou.",
  },
    ],
  },
  "Crown of the Master": {
    description: "This crown, granted to favored azarketis by their alghollthu masters, is made of coral sculpted into the shape of a tentacled criatura clutching the wearer’s temples. Enquanto estiver vestindo the crown, você ganha an bônus de item em salvaguardas against mental effects and can cast _figment_ as an occult magia inata.",
  },
  "Crown of the Master (Greater)": {
    description: "Coroa de coral tentacular. +2 de item em salvaguardas contra efeitos mentais; conjura figmento como magia inata oculta. Ativar — Ordem imperativa (concentrar): 1 vez ao dia. Conjura dominar de 6º posto (CD 30), duração reduzida a 8 horas.",
  },
  "Crown of Witchcraft": {
    description: "Guirlanda, diadema ou chapéu de bruxa. +1 em Intimidação, +2 na perícia do patrono se for bruxa, e ponto de foco de maldição 1 vez ao dia.\n\n**Ativar—Maldição desafiadora** ação livre (concentrar, hex)\n**Frequência** 1 vez ao dia\n**Efeito** Gain 1 ponto de foco, que você só pode gastar para conjurar a witch hex magia. Se você don't spend this point até o fim deste turno, ele é perdido.",
    activations: [
  {
    name: "Maldição desafiadora",
    actionType: "free",
    traits: ["Concentrate","Hex"],
    frequency: "1 vez ao dia",
    effect: "Ganhe 1 ponto de foco, que você só pode gastar para conjurar uma magia hexadecimal de bruxa. Se você não gastar esse ponto até o fim deste turno, ele estará perdido.",
  },
    ],
  },
  "Crown of Witchcraft (Greater)": {
    description: "An elegant accoutrement for a witch who has come into the higher echelons of power, a _crown of witchcraft_ typically looks like a garland of flowering twigs, a jeweled circlet, or a tall hat of fine fabric. Você ganha +1 bônus de item em Intimidação testes, and if você're a witch, você ganha a +2 bônus de item em seu patron skill. If você tem a familiar, você pode attach a small portion of the crown's material to seu familiar, such as a strip of fabric from a hat tied around its tail or a sprig of natural material linked to its collar; the familiar doesn't need to invest the item itself. Se você do this, seu familiar gains the tough pet ability enquanto the crown is invested by você. The bônus to Intimidação testes is +2 and the bônus to seu patron skill is +3.\n\n**Ativar—Maldição desafiadora** ação livre (concentrar, hex)\n**Frequência** 1 vez ao dia\n**Efeito** Gain 1 ponto de foco, que você só pode gastar para conjurar a witch hex magia. Se você don't spend this point até o fim deste turno, ele é perdido.",
    activations: [
  {
    name: "Maldição desafiadora",
    actionType: "free",
    traits: ["Concentrate","Hex"],
    frequency: "1 vez ao dia",
    effect: "Ganhe 1 ponto de foco, que você só pode gastar para conjurar uma magia hexadecimal de bruxa. Se você não gastar esse ponto até o fim deste turno, ele estará perdido.",
  },
    ],
  },
  "Cube of Recall": {
    description: "This small cube has smooth matte sides. One side is black, the opposite side is white, and the other four are various shades of gray. Each side can be attuned to a location and then teleport você back to that spot in the blink of an eye.\n\n**Ativar** (concentrar, manipular)\n**Efeito** Pick one side of the cube and set it face up. Você attune the cube to the location você currently occupy. Each side can be attuned to only one location. Once você use this ação to attune to a location, the side você pick loses any previously attuned location.\n\n**Ativar** 3 ações (concentrar, manipular, teleportation)\n**Efeito** While speaking a word of command and bringing the location into seu mind, você push the corresponding side of the cube. Você teleport to the location attuned to the side você press, within 30 m of the attuned location, enquanto that location is on the same planet. If it's not, seu activation produces no effect, but the attunement remains.",
    activations: [
  {
    name: "",
    traits: ["Concentrate","Manipulate"],
    effect: "Escolha um lado do cubo e coloque-o voltado para cima. Você sintoniza o cubo no local que ocupa atualmente. Cada lado pode ser sintonizado em apenas um local. Depois que você usar esta ação para sintonizar um local, o lado escolhido perderá qualquer local previamente sintonizado.",
  },
  {
    name: "",
    actionType: "three",
    traits: ["Concentrate","Manipulate","Teleportation"],
    effect: "Ao falar uma palavra de comando e trazer a localização à sua mente, você empurra o lado correspondente do cubo. Você se teletransporta para o local sintonizado ao lado que você pressiona, dentro de 30 m do local sintonizado, enquanto esse local estiver no mesmo planeta. Caso contrário, sua ativação não produz efeito, mas a sintonização permanece.",
  },
    ],
  },
  "Dancing Scarf": {
    description: "Echarpe de seda com sinos. +1 em Performance para dançar. Após dançar com sucesso, pode ficar oculta até o próximo turno.\n\n**Ativar—Cachecol rodopiante** 1 ação (manipular)\n**Requisitos** On seu most recent ação, você succeeded at a Atuação teste to dance\n**Efeito** Você fica oculto até o início do seu próximo turno.",
    activations: [
  {
    name: "Cachecol rodopiante",
    actionType: "one",
    traits: ["Manipulate"],
    requirements: "On seu most recent ação, você succeeded at a Atuação teste to dance",
    effect: "Você fica oculto até o início do seu próximo turno.",
  },
    ],
  },
  "Dancing Scarf (Greater)": {
    description: "This long and billowing scarf is typically woven of silk or sheer fabric and adorned with bells or other jangling bits of shiny metal. It grants a +1 bônus de item em Atuação testes to dance. The scarf grants a +2 bônus. When você activate the scarf, você pode also Avançar up to half seu Speed or Step.\n\n**Ativar—Cachecol rodopiante** 1 ação (manipular)\n**Requisitos** On seu most recent ação, você succeeded at a Atuação teste to dance\n**Efeito** Você fica oculto até o início do seu próximo turno.",
    activations: [
  {
    name: "Cachecol rodopiante",
    actionType: "one",
    traits: ["Manipulate"],
    requirements: "On seu most recent ação, você succeeded at a Atuação teste to dance",
    effect: "Você fica oculto até o início do seu próximo turno.",
  },
    ],
  },
  "Daredevil Boots": {
    description: "Botas coloridas. +2 em Acrobacia, melhor Passar por entre, Agarrar a borda sem as mãos e quedas mais curtas.",
  },
  "Daredevil Boots (Greater)": {
    description: "Versão maior: +3 em Acrobacia, +2 para Passar por entre, e 1 vez ao dia movimento desimpedido.\n\n**Ativar—Impulso temerário** 2 ações (concentrar)\n**Frequência** 1 vez ao dia\n**Efeito** The boots cast _unfettered movement_ on você.",
    activations: [
  {
    name: "Impulso temerário",
    actionType: "two",
    traits: ["Concentrate"],
    frequency: "1 vez ao dia",
    effect: "As botas lançam _movimento irrestrito_ em você.",
  },
    ],
  },
  "Dawnfire Beacon": {
    description: "Estandarte com luz cálida de aurora no centro (afixado ou empunhado). Emite luz intensa na emanação do estandarte e luz tênue numa área igual ao dobro da emanação. Suprimido se você não estiver empunhando o estandarte nem a arma à qual está afixado.",
  },
  "Dawnfire Beacon (Major)": {
    description: "Estandarte com luz cálida de aurora no centro (afixado ou empunhado). Emite luz intensa na emanação do estandarte e luz tênue numa área igual ao dobro da emanação. Suprimido se você não estiver empunhando o estandarte nem a arma à qual está afixado. Criaturas na emanação ganham +1 de status em salvaguardas contra efeitos profanos.",
  },
  "Deck Of Mischief": {
    description: "Baralho de 54 cartas quase iguais às comuns: quatro naipes de 13 e dois curingas, predileto de velhacos. Se souber\n\n**Ativar—Truque de carta** 1 ação (concentrar, illusion, manipular)\n**Efeito** Você learn which of the ace and face cards are still in the deck. Você pode then swap the apparent face of an ace or face card in seu hand (if você tem any) with the face of one still in the deck. A criatura who Seeks or touches the card can attempt to disbelieve this illusion (Percepção CD 20).",
    activations: [
  {
    name: "Truque de carta",
    actionType: "one",
    traits: ["Concentrate","Illusion","Manipulate"],
    effect: "Você aprende quais dos ás e cartas com figuras ainda estão no baralho. Você pode então trocar a face aparente de um ás ou carta de figura em sua mão (se tiver alguma) pela face de uma que ainda esteja no baralho. Uma criatura que procura ou toca a carta pode tentar descrer dessa ilusão (Percepção CD 20).",
  },
    ],
  },
  "Demon Mask": {
    description: "Máscara de demônio. +1 em Intimidação. 1 vez ao dia, medo CD 20.\n\n**Ativar—Máscara sarcástica** 2 ações (manipular)\n**Frequência** 1 vez ao dia\n**Efeito** The mask casts a _fear_ magia with a CD of 20.",
    activations: [
  {
    name: "Máscara sarcástica",
    actionType: "two",
    traits: ["Manipulate"],
    frequency: "1 vez ao dia",
    effect: "A máscara lança uma magia _medo_ com um CD de 20.",
  },
    ],
  },
  "Demon Mask (Greater)": {
    description: "This terrifying mask is crafted in the visage of a leering demon and grants a +1 bônus de item em Intimidação testes. The mask grants a +2 bônus de item. It casts 3º posto fear with a CD of 29.\n\n**Ativar—Máscara sarcástica** 2 ações (manipular)\n**Frequência** 1 vez ao dia\n**Efeito** The mask casts a _fear_ magia with a CD of 20.",
    activations: [
  {
    name: "Máscara sarcástica",
    actionType: "two",
    traits: ["Manipulate"],
    frequency: "1 vez ao dia",
    effect: "A máscara lança uma magia _medo_ com um CD de 20.",
  },
    ],
  },
  "Demon-Hunting Bands": {
    description: "Faixas de couro com sigilos sarkorianos. Ativar: os padrões sagrados cercam você; seu deslocamento não provoca reações de fiendes por 1 minuto.",
  },
  "Devoted Vestments": {
    description: "Vestes com cenas da divindade. Símbolo sagrado, +2 em Religião, cura extra em fiéis, e ponto de foco de domínio 1 vez ao dia.\n\n**Ativar—Devoção de domínio** ação livre (concentrar)\n**Frequência** 1 vez ao dia\n**Efeito** Gain 1 ponto de foco, que você só pode gastar para conjurar a cleric domain magia for a domain belonging to the deity the vestments are dedicated to. Se você don't spend this point até o fim deste turno, ele é perdido.",
    activations: [
  {
    name: "Devoção de domínio",
    actionType: "free",
    traits: ["Concentrate"],
    frequency: "1 vez ao dia",
    effect: "Ganhe 1 ponto de foco, que você só pode gastar para conjurar uma magia de domínio clérigo para um domínio pertencente à divindade à qual as vestimentas são dedicadas. Se você não gastar esse ponto até o fim deste turno, ele estará perdido.",
  },
    ],
  },
  "Diplomat": {
    description: "When displayed prominently, this brass badge makes criaturas find você more agreeable. Você ganha +1 bônus de item em Diplomacia testes.\n\n**Ativar—Porte diplomático** 1 ação (concentrar)\n**Frequência** 1 vez ao dia\n**Efeito** Attempt a CD 20 teste to Recordar Conhecimento about people of a human ethnicity, a non- human ancestry, or some other type of criatura. (The GM determines what seu options are.) Se você passar, the badge's bônus increases to +2 for Diplomacia testes with criaturas of that group for the rest of the day.",
    activations: [
  {
    name: "Porte diplomático",
    actionType: "one",
    traits: ["Concentrate"],
    frequency: "1 vez ao dia",
    effect: "Faça um teste CD 20 para Recordar Conhecimento sobre pessoas de etnia humana, ascendência não humana ou algum outro tipo de criatura. (O Mestre determina quais são suas opções.) Se você passar, o bônus do distintivo aumenta para +2 para testes de Diplomacia com criaturas daquele grupo pelo resto do dia.",
  },
    ],
  },
  "Diplomat's Badge": {
    description: "Insígnia de latão. +1 em Diplomacia. 1 vez ao dia, estudar um povo pode subir o bônus para +2 com eles.\n\n**Ativar—Porte diplomático** 1 ação (concentrar)\n**Frequência** 1 vez ao dia\n**Efeito** Attempt a CD 20 teste to Recordar Conhecimento about people of a human ethnicity, a non- human ancestry, or some other type of criatura. (The GM determines what seu options are.) Se você passar, the badge's bônus increases to +2 for Diplomacia testes with criaturas of that group for the rest of the day.",
    activations: [
  {
    name: "Porte diplomático",
    actionType: "one",
    traits: ["Concentrate"],
    frequency: "1 vez ao dia",
    effect: "Faça um teste CD 20 para Recordar Conhecimento sobre pessoas de etnia humana, ascendência não humana ou algum outro tipo de criatura. (O Mestre determina quais são suas opções.) Se você passar, o bônus do distintivo aumenta para +2 para testes de Diplomacia com criaturas daquele grupo pelo resto do dia.",
  },
    ],
  },
  "Doom Switch": {
    description: "This short length of wood is decorated with fine carvings of symbols representing fate.\n\n**Ativar—Direito de gabar-se** 1 ação (ataque, manipular)\n**Frequência** 1 vez ao dia\n**Efeito** Você attempt to Golpe a significant inimigo with the _doom switch_, marking them for defeat. The switch is treated as a simple melee arma for the purpose of proficiency. This attack deals no dano. **Sucesso crítico** Você and seu aliados gain a +1 bônus de status em rolagem de ataques against o alvo por 1 minuto. Se você reduce o alvo to 0 PV during this time, você ganha PV temporários equal to twice o alvo’s level por 1 rodada. **Sucesso** As critical success, except você ganha PV temporários equal to o alvo’s level. **Falha** Você and seu aliados take a –1 penalidade de status to rolagem de ataques against o alvo por 1 rodada. **Falha crítica** Você and seu aliados take a –2 penalidade de status to rolagem de ataques against o alvo por 1 rodada.",
    activations: [
  {
    name: "Direito de gabar-se",
    actionType: "one",
    traits: ["Attack","Manipulate"],
    frequency: "1 vez ao dia",
    effect: "Você tenta Golpear um inimigo significativo com o _doom switch_, marcando-o para a derrota. A troca é tratada como uma simples arma corpo a corpo para fins de proficiência. Este ataque não causa dano. **Sucesso crítico** Você e seus aliados ganham +1 de bônus de status na rolagem de ataques contra o alvo por 1 minuto. Se você reduzir o alvo para 0 PV durante esse período, você ganha PV temporários iguais ao dobro do nível do alvo por 1 rodada. **Sucesso** Como sucesso crítico, exceto que você ganha PV temporários iguais ao nível do alvo. **Falha** Você e seus aliados recebem –1 deliberação de status para rolagem de ataques contra o alvo por 1 rodada. **Falha crítica** Você e seus aliados levam um –2 julgamento de status para rolagem de ataques contra o alvo por 1 rodada.",
  },
    ],
  },
  "Doubling Rings": {
    description: "Par: anel de ouro com rubi e anel de ferro. Copia as runas fundamentais da arma na mão de ouro para a da mão de ferro enquanto as duas estiverem empunhadas.",
  },
  "Doubling Rings (Greater)": {
    description: "Versão maior: copia também runas de propriedade, se a arma de ferro servir. Dá para limitar às fundamentais ao investir.",
  },
  "Draconic Verge": {
    description: "Cetro de osso de dragão, runas minúsculas, empunhadura de couro de dragão e ponteiras de ouro. +1 de item em Intimidação para Desmoralizar. Dragões consideram o item hediondo e atacam quem o carrega, priorizando-o.\n\n**Ativar—Eminência do dragão** 2 ações (concentrar, manipular)\n**Frequência** 1 vez ao dia\n**Efeito** Você hold the verge aloft, tapping into the majesty of the dragon from whom the verge was made. All inimigos in a 18 m emanation must succeed a CD 23 salvaguarda de Vontade or become amedrontado 2 (amedrontado 3 on a critical failure).",
    activations: [
  {
    name: "Eminência do dragão",
    actionType: "two",
    traits: ["Concentrate","Manipulate"],
    frequency: "1 vez ao dia",
    effect: "Você segura a borda no alto, aproveitando a majestade do dragão de quem a borda foi feita. Todos os inimigos em uma emanação de 18 meses devem ter sucesso em um CD 23 de salvaguarda de Vontade ou se tornarem amedrontado 2 (amedrontado 3 em caso de falha crítica).",
  },
    ],
  },
  "Dragon Handwraps": {
    description: "Envoltórios de seda com dragão vermelho. Funcionam como envoltórios de golpes poderosos +3 de impacto máximo com chamas maior. +4 de item em Atletismo para Agarrar ou Empurrar. Ao investir: Força +1 ou até +4.\n\n**Ativar** 2 ações (manipular)\n**Frequência** 1 vez ao dia\n**Efeito** Você slap the bottom of seu palms with hands splayed outward, casting a 7º posto _breathe fire_ magia (CD 41).\n\n**Ativar** ação livre (concentrar)\n**Frequência** 1 vez por hora\n**Gatilho** Você succeed or critically succeed with a Agarrar\n**Efeito** Você ganha +2 bônus de status em seu Atletismo CD against any testes made to Escapar seu grapple até o fim do seu próximo turno.",
    activations: [
  {
    name: "",
    actionType: "two",
    traits: ["Manipulate"],
    frequency: "1 vez ao dia",
    effect: "Você bate na parte inferior das palmas das mãos com as mãos abertas para fora, lançando uma magia 7º posto _breathe fire_ (CD 41).",
  },
  {
    name: "",
    actionType: "free",
    traits: ["Concentrate"],
    frequency: "1 vez por hora",
    trigger: "Você teve sucesso ou sucesso crítico com um Agarrar",
    effect: "Você ganha +2 bônus de status em seu CD Atletismo contra qualquer teste feito para Escapar seu grapple até o fim do seu próximo turno.",
  },
    ],
  },
  "Dragon Pearl": {
    description: "Folhas de chá fermentadas enroladas em pérola. Ao beber o chá, por 10 minutos: resistência 15 a vazio e ataques desarmados +1d6 vitalidade em Golpe bem-sucedido. Se um ataque ou efeito reduzisse você a 0 PV, pode gastar a reação para encerrar o benefício, permanecer consciente em pé com 10 PV e aumentar ferido em 1.\n\n**Ativar—Concha nacarada** 1 ação (concentrar, force, spirit, mental, poison, primal)\n**Frequência** 1 vez ao dia\n**Efeito** Você call protective power from the pearl to form a defensive barrier around yourself. Você’re affected by an 8º posto _containment_ magia, which takes on the appearance of shimmering translucent dragon scales. The field has resistência 15 to one dano type related to the dragon the pearl came from. When você activate the pearl, você choose the type from all types the dragon has imunidade or resistência a plus a type based on their tradition: force for arcane, spirit for divine, mental for occult, or poison for primal.",
    activations: [
  {
    name: "Concha nacarada",
    actionType: "one",
    traits: ["Concentrate","Force","Spirit","Mental","Poison","Primal"],
    frequency: "1 vez ao dia",
    effect: "Você invoca o poder protetor da pérola para formar uma barreira defensiva ao seu redor. Você é afetado por uma magia de _contenção_ do 8º posto, que assume a aparência de escamas de dragão translúcidas e cintilantes. O campo tem resistência 15 a um tipo de dano relacionado ao dragão de onde veio a pérola. Ao ativar a pérola, você escolhe o tipo entre todos os tipos que o dragão tem imunidade ou resistência, além de um tipo baseado em sua tradição: força para arcano, espírito para divino, mental para oculto ou veneno para primitivo.",
  },
    ],
  },
  "Dragon Rune Bracelet": {
    description: "Pulseira de ouro com escama de dragão famoso e runas dracônicas. +2 de item em Diplomacia com dragões do mesmo tipo da escama, e +2 de item em salvaguardas contra medo de qualquer dragão.\n\n**Ativar** ação livre (concentrar)\n**Frequência** 1 vez ao dia\n**Efeito** Você ganha 1 ponto de foco, que você só pode gastar para conjurar a sorcerer draconic bloodline magia. If not used by the end of seu turno, this ponto de foco is lost.",
    activations: [
  {
    name: "",
    actionType: "free",
    traits: ["Concentrate"],
    frequency: "1 vez ao dia",
    effect: "Você ganha 1 ponto de foco, que você só pode gastar para conjurar a magia da linhagem dracônica do feiticeiro. Se não for utilizado até o final do seu turno, esse ponto de foco será perdido.",
  },
    ],
  },
  "Dragonslayer's Shield": {
    description: "Escudo de aço com couro de um tipo de dragão. Erguido: bônus de circunstância também em Reflexos contra área. +2 de circunstância em Vontade contra presença aterradora de dragão. Resistência 10 ao tipo do sopro (depois da Dureza; Bloquear com Escudo sofre 18 a menos). Pode Bloquear esse tipo de dano.",
  },
  "Dread Blindfold": {
    description: "Tira de linho preto. Visão no escuro, +3 em Intimidação, amedronta quem te vê pela primeira vez no dia, e pode lançar visão da morte ao ferir.\n\n**Ativar—Visões de terror** ação livre (concentrar)\n**Frequência** 1 vez por minuto\n**Gatilho** Você dano a criatura with a Golpe\n**Efeito** Seu alvo is gripped by intense fear. This has the effect of a CD 37 _vision of death_ magia. The criatura is then temporarily immune for 24 hours.",
    activations: [
  {
    name: "Visões de terror",
    actionType: "free",
    traits: ["Concentrate"],
    frequency: "1 vez por minuto",
    trigger: "Você danifica uma criatura com um Golpe",
    effect: "Seu alvo é tomado por um medo intenso. Isso tem o efeito de uma magia CD 37 _visão da morte_. A criatura fica então temporariamente imune por 24 horas.",
  },
    ],
  },
  "Dreamer": {
    description: "These twin tattoos, each depicting the ornate wing of a butterfly or moth, are usually placed upon seu palms or wrists. While sleeping, this tattoo crafts lucid dreams that don’t disturb seu rest; However, when danger arises, these dreams shift to alert você to trouble and shroud você in camouflaging dream-stuff. As a result, você do not take any penalidade to Percepção testes when asleep. When asleep, você also gain a +2 circumstance to seu salvaguarda de Vontades against effects with the dream or sleep traits.\n\n**Ativar—Despertar o sonho** 1 ação (illusion, manipular, mental)\n**Efeito** By touching the two halves of the tattoo together, the wings expand to show a small illusory rendition of any effects with the dream or sleep traits você está currently subject to. Onlookers (including yourself) gain a +1 bônus de status em testes to Identificar Magia of any magias or magical effects with the dream or sleep traits por 1 rodada.",
    activations: [
  {
    name: "Despertar o sonho",
    actionType: "one",
    traits: ["Illusion","Manipulate","Mental"],
    effect: "Ao tocar as duas metades da tatuagem, as asas se expandem para mostrar uma pequena representação ilusória de quaisquer efeitos com os traços de sonho ou sono aos quais você está sujeito atualmente. Os espectadores (incluindo você) ganham +1 bônus de status em testes para identificar Magia de quaisquer magias ou efeitos mágicos com os traços de sonho ou sono por 1 rodada.",
  },
    ],
  },
  "Dreamer's Butterfly": {
    description: "Duas metades de asa de borboleta ou mariposa, em geral nas palmas ou pulsos. Ao dormir, sonhos lúcidos não atrapalham o descanso e alertam ao perigo; você não sofre penalidade em Percepção dormindo e ganha +2 de circunstância em Vontade contra efeitos com traço sonho ou sono.\n\n**Ativar—Despertar o sonho** 1 ação (illusion, manipular, mental)\n**Efeito** By touching the two halves of the tattoo together, the wings expand to show a small illusory rendition of any effects with the dream or sleep traits você está currently subject to. Onlookers (including yourself) gain a +1 bônus de status em testes to Identificar Magia of any magias or magical effects with the dream or sleep traits por 1 rodada.",
    activations: [
  {
    name: "Despertar o sonho",
    actionType: "one",
    traits: ["Illusion","Manipulate","Mental"],
    effect: "Ao tocar as duas metades da tatuagem, as asas se expandem para mostrar uma pequena representação ilusória de quaisquer efeitos com os traços de sonho ou sono aos quais você está sujeito atualmente. Os espectadores (incluindo você) ganham +1 bônus de status em testes para identificar Magia de quaisquer magias ou efeitos mágicos com os traços de sonho ou sono por 1 rodada.",
  },
    ],
  },
  "Drop of Convergent Waters": {
    description: "Abhaya’s tireless years of study have allowed her to reproduce, at some level, the inconsciente melding of elements she experienced during the last Challenge of Sky and Heaven. A single drop of water in a crystalline container is the simplest application of her research. When você activate this talisman, a watery echo of one of seu limbs emerges from the container. Faça um Golpe with seu fist or an unarmed attack from seu ancestry. This attack gains the magical, reach, and water traits, retains any benefits from appropriate arma fundamental runes (but not of arma property runes), and takes no penalties for being used underwater. Você pode perform this Golpe even if você’re in a stance or under a polymorph effect that restricts seu Golpes.",
  },
  "Druid": {
    description: "Ao tornar-se druida você se alinha a uma ordem: ganha 1 feito de 1º nível, 1 magia de ordem (foco) e 1 perícia treinada. Você permanece membro da ordem inicial, mas pode estudar outras depois. Cultivo e Esporos (Pathfinder #202) são variantes da Folha. Fonte: Player Core, pág. 125; Pathfinder #202, pág. 72.\n\n**Ativar** 2 ações (concentrar)\n**Frequência** 1 vez ao dia\n**Efeito** The crown casts its magia at 2nd rank (CD 20).",
    activations: [
  {
    name: "",
    actionType: "two",
    traits: ["Concentrate"],
    frequency: "1 vez ao dia",
    effect: "A coroa lança sua magia no 2º nível (CD 20).",
  },
    ],
  },
  "Druid's Crown": {
    description: "Coroa de materiais selvagens. Só druida investe. +1 de item numa perícia e magia de 2º posto (CD 20), conforme o material: chifres — Intimidação e aumentar; flores — Diplomacia e aliados animais; folhas — Furtividade e um com as plantas. Com manto vivo também investido, o bônus sobe 1 e a CD vai a 27. Atividade de 10 minutos (manipular): desmonte e reconstrua com outro material.\n\n**Ativar** 2 ações (concentrar)\n**Frequência** 1 vez ao dia\n**Efeito** The crown casts its magia at 2nd rank (CD 20).",
    activations: [
  {
    name: "",
    actionType: "two",
    traits: ["Concentrate"],
    frequency: "1 vez ao dia",
    effect: "A coroa lança sua magia no 2º nível (CD 20).",
  },
    ],
  },
  "Dweomerveil": {
    description: "Véu de pelo de dweomergato, preso com dois dentes. Nas preparações diárias, escove e oleie; ao terminar, escolha uma tradição (arcana, divina, oculta ou primordial) e ganhe +1 de item em salvaguardas contra magia dessa tradição até as próximas preparações.\n\n**Ativar—Salto dimensional** reação (concentration, teleportation)\n**Frequência** 1 vez ao dia\n**Efeito** Seu veil billows out and você disappear behind it. Você use the traces of dweomercat magic to teleport yourself instantly to any unoccupied square within 9 m. Se você passar com sucesso críticoed at the triggering save, você pode instead teleport within 45 pés.",
    activations: [
  {
    name: "Salto dimensional",
    actionType: "reaction",
    traits: ["Concentration","Teleportation"],
    frequency: "1 vez ao dia",
    effect: "Seu véu se esvoaça e você desaparece atrás dele. Você usa os traços da magia dweomercat para se teletransportar instantaneamente para qualquer quadrado desocupado em um raio de 9 m. Se você passar com sucesso criticado no salvamento de acionamento, você poderá se teletransportar dentro de 13,5 m.",
  },
    ],
  },
  "Earthglide Cloak": {
    description: "Manto marrom e dourado, rígido como pedra. 1 vez por hora, cave pela terra e pedra sem deixar rastros.\n\n**Ativar—Deslizar pela terra** 1 ação (manipular)\n**Frequência** 1 vez por hora\n**Efeito** Você Cavar through dirt and stone up to seu deslocamento terrestre, leaving no tunnels or signs of seu passing. Se você end seu movement inside solid stone, você está forcibly expelled into the nearest open area, taking 1d6 dano de concussão for every 1,5 m between the end of seu movement and the open area.",
    activations: [
  {
    name: "Deslizar pela terra",
    actionType: "one",
    traits: ["Manipulate"],
    frequency: "1 vez por hora",
    effect: "Você cavalga por terra e pedras até sua posição terrestre, sem deixar túneis ou sinais de sua passagem. Se você terminar seu movimento dentro de pedra sólida, você será expulso à força para a área aberta mais próxima, sofrendo 1d6 de dano de concussão para cada 1,5 m entre o final de seu movimento e a área aberta.",
  },
    ],
  },
  "Earthsight Box": {
    description: "This fine wooden box is inlaid with Dwarven runes, with hinges and a clasp of iron. The box contains handfuls of fine sand.\n\n**Ativar—Replicar terra** (concentrar, manipular)\n**Frequência** 1 vez ao dia\n**Efeito** Você hold the box closed and, while envisioning the terrain, turno the box clockwise three times. When você open the box, the sand reveals, in miniature, the stone terrain surrounding você, to a range of 18 m. This shows details of paths, hills, embankments, boulders, and even artificial structures like walls and ditches, enquanto they're made of stone and earth. Se você're underground, it reveals tunnels and voids in the earth within 18 m at seu current depth. The sand maintains its shape until você close the box.",
    activations: [
  {
    name: "Replicar terra",
    traits: ["Concentrate","Manipulate"],
    frequency: "1 vez ao dia",
    effect: "Você mantém a caixa fechada e, enquanto visualiza o terreno, gira a caixa três vezes no sentido horário. Ao abrir a caixa, a areia revela, em miniatura, o terreno rochoso que o rodeia, num alcance de 18 m. Mostra detalhes de caminhos, morros, aterros, pedras e até estruturas artificiais como muros e valas, embora sejam feitas de pedra e terra. Se você estiver no subsolo, ele revela túneis e vazios na terra dentro de 18 m na profundidade atual. A areia mantém sua forma até você fechar a caixa.",
  },
    ],
  },
  "Echo Token": {
    description: "Visitors to the Echo Repository always emerge with one of these silver coins, stamped with the visage of a faceless queen, somewhere on their person. An _echo token_ carries a minute shard of the Echo Repository's mission to impart lost information.\n\n**Ativar—Jogar uma moeda** 1 ação (manipular)\n**Efeito** When flipped, the coin disintegrates into a glittery mist. Você learn and memorize one random fact about a specific type of Lore (such as Architecture Lore, Elf Lore, Astral Plane Lore) that você didn't previously know, chosen by the GM. The next time você attempt a teste to Recordar Conhecimento on this type of Lore within the next year, você ganha a +1 bônus de status on the teste. Você pode benefit from only one echo token at a time in this way; if você Flip another echo token, the Lore skill changes. However, the memorized fact will remain perfectly in seu memory forever unless magically altered or removed.",
    activations: [
  {
    name: "Jogar uma moeda",
    actionType: "one",
    traits: ["Manipulate"],
    effect: "Quando lançada, a moeda se desintegra em uma névoa brilhante. Você aprende e memoriza um fato aleatório sobre um tipo específico de Conhecimento (como Conhecimento de Arquitetura, Conhecimento de Elfos, Conhecimento de Plano Astral) que você não conhecia anteriormente, escolhido pelo Mestre. Na próxima vez que você tentar um teste para Recordar Conhecimento neste tipo de Lore no próximo ano, você ganhará um bônus de status +1 no teste. Dessa forma, você pode se beneficiar de apenas um token de eco por vez; se você virar outro token de eco, a habilidade Lore muda. No entanto, o fato memorizado permanecerá perfeitamente em sua memória para sempre, a menos que seja alterado ou removido magicamente.",
  },
    ],
  },
  "Eidolon Cape": {
    description: "Manto e capa destacável à semelhança do eidolon, com o sigilo compartilhado. +2 de item na perícia da tradição (Arcanismo, Religião, Ocultismo ou Natureza). Ao Manifestar Eidolon, a capa vira o eidolon (e vice-versa). Se presa ao manto, solta e ele aparece adjacente; senão, adjacente à capa. Manto solto ainda é Carga leve e investido. Falha se a capa estiver além de 30 m ou sem espaço.\n\n**Ativar** ação livre (concentrar)\n**Frequência** 1 vez ao dia\n**Efeito** Você ganha 1 ponto de foco, which você pode use only to cast a summoner link magia. If not used by the end of seu turno, this ponto de foco is lost.",
    activations: [
  {
    name: "",
    actionType: "free",
    traits: ["Concentrate"],
    frequency: "1 vez ao dia",
    effect: "Você ganha 1 ponto de foco, que você pode usar apenas para lançar uma magia de link de invocador. Se não for utilizado até o final do seu turno, esse ponto de foco será perdido.",
  },
    ],
  },
  "Electric Eelskin": {
    description: "Couro +1 resiliente escorregadia maior, placas cobertas de pele de enguia. Respira na água; +2 de item em Atletismo para Nadar e em Furtividade na água.\n\n**Ativar—Liberar carga** 2 ações (manipular)\n**Frequência** 1 vez por hora\n**Efeito** Você conjura a 2º posto _thunderstrike_ with a CD of 29.",
    activations: [
  {
    name: "Liberar carga",
    actionType: "two",
    traits: ["Manipulate"],
    frequency: "1 vez por hora",
    effect: "Você conjura o 2º posto _thunderstrike_ com um CD de 29.",
  },
    ],
  },
  "Emberheart": {
    description: "Amuleto em forma de coração de pedra, com um brilho de brasa; aquece como lareira. Resistência 15 a veneno. Ao investir: Constituição +1 ou até +4.\n\n**Ativar—Coração aquecedor** 2 ações (cura, magical, manipular, vitalidade)\n**Frequência** 1 vez ao dia\n**Efeito** Você hold the amulet aloft as a ripple of warm orange light exudes outward. Each aliado in a 9 m emanation regains 30 PV and gains a +3 bônus de status em salvaguarda de Fortitudes until the end of their next turno.",
    activations: [
  {
    name: "Coração aquecedor",
    actionType: "two",
    traits: ["Healing","Magical","Manipulate","Vitality"],
    frequency: "1 vez ao dia",
    effect: "Você segura o amuleto no alto enquanto uma onda de luz laranja quente emana para fora. Cada aliado em uma emanação de 9 meses recupera 30 PV e ganha +3 de bônus de status em segurança de Fortitudes até o final do próximo turno.",
  },
    ],
  },
  "Emperor": {
    description: "While most residents of—and travelers to—the Five Kings Mountains live underground, a significant number of people explore the regions’ awe-inspiring peaks. Among their many discoveries on Emperor’s Peak is a deposit of rainbow-colored rock crystal quartz with inherent magical properties that aid in survival, especially in the mountains. Dwarven artisans fashion chunks of this translucent quartz into fashionable bracelets. Wearing such a bracelet concede a você a +1 bônus de item em Sobrevivência testes to Sense Direction and Subsist. This bônus increases to +3 when in mountainous terrain. Se você attempt a Sobrevivência teste to Subsist after 8 hours or less of exploration, você sofre only a –2 penalidade em vez da –5 penalidade.",
  },
  "Emperor's Peak Quartz Bracelet": {
    description: "Pulseira de quartzo cristalino arco-íris do Pico do Imperador, nas Montanhas dos Cinco Reis. +1 de item em Sobrevivência para Orientar-se e Subsistir (+3 em terreno montanhoso). Se Subsistir após 8 horas ou menos de exploração, a penalidade é só −2, não −5.",
  },
  "Endless Quiver": {
    description: "Aljava com 40 flechas mundanas; regenera 10 por hora. Flecha removida some após 1 minuto.\n\n**Ativar—Converter flechas** 1 ação (manipular)\n**Frequência** 1 vez ao dia\n**Efeito** Você tap the quiver, and the arrows inside transform into cold iron or silver. They revert to wood after 1 minute.",
    activations: [
  {
    name: "Converter flechas",
    actionType: "one",
    traits: ["Manipulate"],
    frequency: "1 vez ao dia",
    effect: "Você bate na aljava e as flechas dentro dela se transformam em ferro frio ou prata. Eles voltam a madeira após 1 minuto.",
  },
    ],
  },
  "Endless Quiver (Greater)": {
    description: "Aljava com 100 flechas mundanas; regenera 10 por hora. Flecha removida some após 1 minuto.\n\n**Ativar—Converter flechas** 1 ação (manipular)\n**Frequência** 1 vez ao dia\n**Efeito** Você tap the quiver, and the arrows inside transform into cold iron or silver. They revert to wood after 1 minute.",
    activations: [
  {
    name: "Converter flechas",
    actionType: "one",
    traits: ["Manipulate"],
    frequency: "1 vez ao dia",
    effect: "Você bate na aljava e as flechas dentro dela se transformam em ferro frio ou prata. Eles voltam a madeira após 1 minuto.",
  },
    ],
  },
  "Entertainer": {
    description: "The designs adorning these lush sashes often imitate the decor of famous opera houses, theaters, and museums. When você invest this item, choose Enganação, Diplomacia, Intimidação, or Atuação; você ganha a +2 bônus de item em that skill.\n\n**Ativar—Bis** ação livre (concentrar)\n**Frequência** 1 vez ao dia\n**Efeito** Gain 1 ponto de foco, que você só pode gastar para conjurar a bard composition magia. Se você don't spend this point até o fim deste turno, ele é perdido.\n\n**Ativar—Transcrever** 1 ação (manipular)\n**Frequência** 1 vez ao dia\n**Efeito** Você tuck a small roll of paper into the cincture. For the next 10 minutes or until você Dismiss the activation, any performance você make is recorded on the paper, and the paper expands as necessary to accommodate it. Depending on the type of performance, this might take the form of sheet music, a transcript, or a diagram of dance moves.",
    activations: [
  {
    name: "Bis",
    actionType: "free",
    traits: ["Concentrate"],
    frequency: "1 vez ao dia",
    effect: "Ganhe 1 ponto de foco, que você só pode gastar para conjurar uma magia de composição de bardo. Se você não gastar esse ponto até o fim deste turno, ele estará perdido.",
  },
  {
    name: "Transcrever",
    actionType: "one",
    traits: ["Manipulate"],
    frequency: "1 vez ao dia",
    effect: "Você coloca um pequeno rolo de papel na cintura. Durante os próximos 10 minutos ou até você dispensar a ativação, qualquer desempenho que você fizer será registrado no papel e o papel se expandirá conforme necessário para acomodá-lo. Dependendo do tipo de apresentação, isso pode assumir a forma de partituras, uma transcrição ou um diagrama de movimentos de dança.",
  },
    ],
  },
  "Entertainer's Cincture": {
    description: "Faixa de palco. Ao investir, +2 numa perícia social/Performance à escolha. Ponto de foco de composição e transcrição de apresentação. Fabricação: bardo.\n\n**Ativar—Bis** ação livre (concentrar)\n**Frequência** 1 vez ao dia\n**Efeito** Gain 1 ponto de foco, que você só pode gastar para conjurar a bard composition magia. Se você don't spend this point até o fim deste turno, ele é perdido.\n\n**Ativar—Transcrever** 1 ação (manipular)\n**Frequência** 1 vez ao dia\n**Efeito** Você tuck a small roll of paper into the cincture. For the next 10 minutes or until você Dismiss the activation, any performance você make is recorded on the paper, and the paper expands as necessary to accommodate it. Depending on the type of performance, this might take the form of sheet music, a transcript, or a diagram of dance moves.",
    activations: [
  {
    name: "Bis",
    actionType: "free",
    traits: ["Concentrate"],
    frequency: "1 vez ao dia",
    effect: "Ganhe 1 ponto de foco, que você só pode gastar para conjurar uma magia de composição de bardo. Se você não gastar esse ponto até o fim deste turno, ele estará perdido.",
  },
  {
    name: "Transcrever",
    actionType: "one",
    traits: ["Manipulate"],
    frequency: "1 vez ao dia",
    effect: "Você coloca um pequeno rolo de papel na cintura. Durante os próximos 10 minutos ou até você dispensar a ativação, qualquer desempenho que você fizer será registrado no papel e o papel se expandirá conforme necessário para acomodá-lo. Dependendo do tipo de apresentação, isso pode assumir a forma de partituras, uma transcrição ou um diagrama de movimentos de dança.",
  },
    ],
  },
  "Entertainer's Cincture (Greater)": {
    description: "Versão maior: +3 na perícia escolhida e transcrição de até 1 hora.\n\n**Ativar—Bis** ação livre (concentrar)\n**Frequência** 1 vez ao dia\n**Efeito** Gain 1 ponto de foco, que você só pode gastar para conjurar a bard composition magia. Se você don't spend this point até o fim deste turno, ele é perdido.\n\n**Ativar—Transcrever** 1 ação (manipular)\n**Frequência** 1 vez ao dia\n**Efeito** Você tuck a small roll of paper into the cincture. For the next 10 minutes or until você Dismiss the activation, any performance você make is recorded on the paper, and the paper expands as necessary to accommodate it. Depending on the type of performance, this might take the form of sheet music, a transcript, or a diagram of dance moves.",
    activations: [
  {
    name: "Bis",
    actionType: "free",
    traits: ["Concentrate"],
    frequency: "1 vez ao dia",
    effect: "Ganhe 1 ponto de foco, que você só pode gastar para conjurar uma magia de composição de bardo. Se você não gastar esse ponto até o fim deste turno, ele estará perdido.",
  },
  {
    name: "Transcrever",
    actionType: "one",
    traits: ["Manipulate"],
    frequency: "1 vez ao dia",
    effect: "Você coloca um pequeno rolo de papel na cintura. Durante os próximos 10 minutos ou até você dispensar a ativação, qualquer desempenho que você fizer será registrado no papel e o papel se expandirá conforme necessário para acomodá-lo. Dependendo do tipo de apresentação, isso pode assumir a forma de partituras, uma transcrição ou um diagrama de movimentos de dança.",
  },
    ],
  },
  "Ethersight Ring": {
    description: "Anel de vidro com fumaça cinza. Ao investir, a fumaça clareia e você enxerga o Plano Etéreo até 18 m. Mesmo sem investir, criaturas etéreas nesse alcance o veem. Vocês só se afetam com habilidades que cruzam o Etéreo e o Universo.",
  },
  "Everburning Coal": {
    description: "Carvão sempre morno. Empunhado: resistência 10 a frio e proteção contra frio ambiental leve, severo e extremo. Chave planar para o Plano do Fogo: chega a 1d6×25 milhas do destino (em vez de 1d10×25).\n\n**Ativar—Muralha de carvão** 3 ações (concentrar, manipular, fire, cold, water)\n**Frequência** 1 vez ao dia\n**Efeito** The _everburning coal_ creates a towering wall of hot coals. This has the effect of _wall of ice_, except for the following adjustments. The wall has the fire trait em vez de cold and water. The wall deals dano de fogo em vez de dano de frio. The fraqueza a fire is instead fraqueza a cold and to water. Destroying a section of the wall with cold or water (rather than with fire) causes a section to evaporate.",
    activations: [
  {
    name: "Muralha de carvão",
    actionType: "three",
    traits: ["Concentrate","Manipulate","Fire","Cold","Water"],
    frequency: "1 vez ao dia",
    effect: "O _carvão sempre em chamas_ cria uma imponente parede de brasas. Isso tem o efeito de _parede de gelo_, exceto pelos ajustes a seguir. A parede tem traço de fogo em vez de frio e água. A parede causa dano de fogo em vez de dano de frio. A fraqueza do fogo é, em vez disso, fraqueza do frio e da água. Destruir uma seção da parede com água fria ou (em vez de fogo) faz com que uma seção evapore.",
  },
    ],
  },
  "Everlight Crystal": {
    description: "Pedra ou gema que emite luz mágica constante: brilhante em 20 pés e fraca nos 20 seguintes. Não precisa de oxigênio, não esquenta e não apaga — só cobre.",
  },
  "Everyneed Pack": {
    description: "Mochila verde com Glifo da Estrada Aberta branco. Bolsos com equipamento mundano comum de até 1 po cada (giz, pederneira, cordão); sem armadura, escudo, arma ou material precioso. Some o valor retirado; vira mochila mundana após 8 po.\n\n**Ativar** (manipular)\n**Frequência** 1 vez por hora\n**Efeito** Você draw any number of pieces of mundane gear from the pack with a combined value of 1 gp or less.",
    activations: [
  {
    name: "",
    traits: ["Manipulate"],
    frequency: "1 vez por hora",
    effect: "Você compra qualquer número de peças de equipamento mundano do pacote com um valor combinado de 1 po ou menos.",
  },
    ],
  },
  "Everyneed Pack (Greater)": {
    description: "Como a mochila básica, mas cada item mundano vale até 5 po. Ao\n\n**Ativar** (manipular)\n**Frequência** 1 vez por hora\n**Efeito** Você draw any number of pieces of mundane gear from the pack with a combined value of 1 gp or less.",
    activations: [
  {
    name: "",
    traits: ["Manipulate"],
    frequency: "1 vez por hora",
    effect: "Você compra qualquer número de peças de equipamento mundano do pacote com um valor combinado de 1 po ou menos.",
  },
    ],
  },
  "Explorer": {
    description: "Before activation, this item appears to be nothing more than a simple rolled-up tent, barely large enough to fit four Medium criaturas. Despite attempts to clean it, the tent is perpetually smudged with dirt in various places.\n\n**Ativar—Desenrolar** (manipular)\n**Frequência** 1 vez ao dia\n**Efeito** The rolled-up tent expands into a spacious yurt complete with a fire pit, 10 bedrolls, various cooking utensils, and basic food and water. The yurt can house and feed você and up to nine other Medium criaturas that eat roughly as much as a human does; they need not attempt a Sobrevivência teste to Subsist when você use the yurt. Fires and light inside the yurt do not extend illumination into the area surrounding the yurt, making it harder to spot from a distance.",
    activations: [
  {
    name: "Desenrolar",
    traits: ["Manipulate"],
    frequency: "1 vez ao dia",
    effect: "A barraca enrolada se expande em uma tenda espaçosa completa com fogueira, 10 sacos de dormir, vários utensílios de cozinha, além de comida e água básicas. A yurt pode abrigar e alimentar você e até outras nove criaturas Médias que comem aproximadamente tanto quanto um humano; eles não precisam tentar um teste de Sobrevivência para Subsistir quando você usar a yurt. O fogo e a luz dentro da yurt não estendem a iluminação para a área ao redor da yurt, tornando mais difícil detectar a distância.",
  },
    ],
  },
  "Explorer's Yurt": {
    description: "Before activation, this item appears to be nothing more than a simple rolled-up tent, barely large enough to fit four Medium criaturas. Despite attempts to clean it, the tent is perpetually smudged with dirt in various places.\n\n**Ativar—Desenrolar** (manipular)\n**Frequência** 1 vez ao dia\n**Efeito** The rolled-up tent expands into a spacious yurt complete with a fire pit, 10 bedrolls, various cooking utensils, and basic food and water. The yurt can house and feed você and up to nine other Medium criaturas that eat roughly as much as a human does; they need not attempt a Sobrevivência teste to Subsist when você use the yurt. Fires and light inside the yurt do not extend illumination into the area surrounding the yurt, making it harder to spot from a distance.",
    activations: [
  {
    name: "Desenrolar",
    traits: ["Manipulate"],
    frequency: "1 vez ao dia",
    effect: "A barraca enrolada se expande em uma tenda espaçosa completa com fogueira, 10 sacos de dormir, vários utensílios de cozinha, além de comida e água básicas. A yurt pode abrigar e alimentar você e até outras nove criaturas Médias que comem aproximadamente tanto quanto um humano; eles não precisam tentar um teste de Sobrevivência para Subsistir quando você usar a yurt. O fogo e a luz dentro da yurt não estendem a iluminação para a área ao redor da yurt, tornando mais difícil detectar a distância.",
  },
    ],
  },
  "Extra Lung": {
    description: "An extra lung is a waterproofed bladder of air worn in an underarm holster, connected to the wearer's nose by a long tube. Você pode use it as a source of air em vez de breathing in the air around você. It can hold 5 rodadas' worth of breathable air, and can be refilled if the _extra lung_ is left open por 10 minutos in an environment with suitable air. Você pode switch to breathing from the _extra lung_ at any time, without using an ação. Você pode use air from the bladder following the rules for holding seu breath, but você pode speak without losing the air from the extra lung. When você lose air at the end of each of seu turns, choose whether você use breath você're holding or air from the _extra lung_. Speaking causes você to lose breath você're holding but doesn't affect the air in the _extra lung_.\n\n**Ativar—Tossir para fora** reação (manipular, inhaled, poison)\n**Gatilho** Você breathe in an inhaled poison or other inhaled affliction\n**Efeito** Você cough the poison or tainted air into seu _extra lung_, immediately attempting a new save against the effect. The air inside seu _extra lung_ becomes fouled, and você re-expose yourself to the inhaled affliction if você breathe it in. The _extra lung_ is cleansed of any poison it contains every day at dawn.",
    activations: [
  {
    name: "Tossir para fora",
    actionType: "reaction",
    traits: ["Manipulate","Inhaled","Poison"],
    trigger: "Você breathe in an inhaled poison ou other inhaled affliction",
    effect: "Você tosse o veneno ou o ar contaminado em seu _pulmão extra_, imediatamente tentando um novo salvamento contra o efeito. O ar dentro de seu pulmão extra fica sujo e você se expõe novamente à aflição inalada se inalá-lo. O pulmão extra é limpo de qualquer veneno que contenha todos os dias ao amanhecer.",
  },
    ],
  },
  "Eye of Fortune": {
    description: "Tapa-olho com olho cravejado (Erastil). Você vê através dele. Role duas vezes o teste plano contra oculto/escondido.\n\n**Ativar—Sorte além da vista** ação livre (concentrar, destino)\n**Gatilho** Você attack a oculto or escondido criatura and haven't attempted the teste simples yet\n**Efeito** Você pode roll the teste simples for the oculto or escondido condition twice and use the higher result.",
    activations: [
  {
    name: "Sorte além da vista",
    actionType: "free",
    traits: ["Concentrate","Fortune"],
    trigger: "Você ataca uma criatura oculta ou escondida e ainda não tentou o teste simples",
    effect: "Você pode rolar o teste simples para a condição oculto ou oculto duas vezes e usar o resultado mais alto.",
  },
    ],
  },
  "Eyes of the Cat": {
    description: "Lentes de âmbar. Visão na penumbra e +2 em Percepção visual.",
  },
  "Fake Blood Pack": {
    description: "Bexiga com sangue animal, sob a roupa. Quando você sofre dano cortante ou perfurante, teste simples CD 11; no sucesso o pacote estoura e mancha, simulando ferimento grave.",
  },
  "Familiar Tattoo": {
    description: "Em geral um animal pequeno ou o nome do familiar em runas. O familiar pode fundir-se à tatuagem: 1 ação (mágica, movimento) para entrar ou sair, adjacente a você; itens de companheiro permanecem, mas ele não leva outros. Sem familiar, ou se ele não estiver presente em toda a tatuagem, o item não é mágico. Se o familiar morrer, vira tatuagem mundana.",
  },
  "Fan Buckler": {
    description: "Fechado, parece só um leque de madeira elegante; perceber o disfarce exige Percepção contra a CD de Enganação de quem empunha.\n\n**Ativar—Abrir o leque** 1 ação (manipular)\n**Efeito** Você transform the fan into a wooden buckler or vice versa.",
    activations: [
  {
    name: "Abrir o leque",
    actionType: "one",
    traits: ["Manipulate"],
    effect: "Você transforma o leque em um escudo de madeira ou vice-versa.",
  },
    ],
  },
  "Fan of Soothing Winds": {
    description: "This _fan of soothing winds_ has six cloud-shaped glass beads on the bottom of the fan, one on each of the exposed ribs. One side of the beads is white, and the other is a dark, stormy gray. Once flipped, a bead stays on its newly exposed side for an entire day before resetting overnight.\n\n**Ativar—Vento curador** 2 ações (concentrar, air)\n**Frequência** 1 vez ao dia per bead\n**Efeito** Você open seu fan and turno a bead of seu choice. The fan casts a 3-ação _heal_ magia with an area of a 9 m cone em vez da 9 m emanation; the save CD for an undead criatura is 28. This magia gains the air trait. The rank of the magia depends on which bead você're turning: the first two beads cast 4º posto _heal_, the center two cast 3º posto _heal_, and the last two cast 2º posto _heal_.",
    activations: [
  {
    name: "Vento curador",
    actionType: "two",
    traits: ["Concentrate","Air"],
    frequency: "1 vez ao dia per bead",
    effect: "Você abre seu leque e vira uma conta de sua preferência. O fã lança uma magia _heal_ de 3 ações com uma área de um cone de 9 m em vez da emanação de 9 m; o CD de salvamento para uma criatura morta-viva é 28. Esta magia ganha a característica ar. A classificação da magia depende de qual conta você está girando: as duas primeiras contas lançadas no 4º posto _heal_, as duas centrais lançadas no 3º posto _heal_ e as duas últimas lançadas no 2º posto _heal_.",
  },
    ],
  },
  "Fan of Soothing Winds (Greater)": {
    description: "This _fan of soothing winds_ has six cloud-shaped glass beads on the bottom of the fan, one on each of the exposed ribs. One side of the beads is white, and the other is a dark, stormy gray. Once flipped, a bead stays on its newly exposed side for an entire day before resetting overnight. The save CD is 34. The first two beads cast 6º posto _heal_, the center two cast 5º posto _heal_, and the last two cast 4º posto _heal_.\n\n**Ativar—Vento curador** 2 ações (concentrar, air)\n**Frequência** 1 vez ao dia per bead\n**Efeito** Você open seu fan and turno a bead of seu choice. The fan casts a 3-ação _heal_ magia with an area of a 9 m cone em vez da 9 m emanation; the save CD for an undead criatura is 28. This magia gains the air trait. The rank of the magia depends on which bead você're turning: the first two beads cast 4º posto _heal_, the center two cast 3º posto _heal_, and the last two cast 2º posto _heal_.",
    activations: [
  {
    name: "Vento curador",
    actionType: "two",
    traits: ["Concentrate","Air"],
    frequency: "1 vez ao dia per bead",
    effect: "Você abre seu leque e vira uma conta de sua preferência. O fã lança uma magia _heal_ de 3 ações com uma área de um cone de 9 m em vez da emanação de 9 m; o CD de salvamento para uma criatura morta-viva é 28. Esta magia ganha a característica ar. A classificação da magia depende de qual conta você está girando: as duas primeiras contas lançadas no 4º posto _heal_, as duas centrais lançadas no 3º posto _heal_ e as duas últimas lançadas no 2º posto _heal_.",
  },
    ],
  },
  "Fauna Guardian": {
    description: "A _fauna guardian_ is a tattoo of an animal, which você pode temporarily animate to protect você. The animal must be chosen when você get the tattoo, and can be any animal of 4th level or lower. (Seu GM might allow other options.)\n\n**Ativar** 3 ações (concentrar)\n**Frequência** 1 vez ao dia\n**Efeito** Você animate seu tattoo using the duration and other parameters of a 5º posto _summon animal_ magia. It appears in a space adjacent to você. Se vocêr tattoo animal drops to 0 HP, the activation ends, and the inanimate tattoo returns to seu skin.",
    activations: [
  {
    name: "",
    actionType: "three",
    traits: ["Concentrate"],
    frequency: "1 vez ao dia",
    effect: "Você anima sua tatuagem usando a duração e outros parâmetros de um 5º posto _summon animal_ magia. Aparece em um espaço adjacente a você. Se sua tatuagem de animal cair para 0 HP, a ativação termina e a tatuagem inanimada retorna à sua pele.",
  },
    ],
  },
  "Faydhaan": {
    description: "Noble faydhaan shuyookhs serve coffee brewed in ornate dallahs such as this one to welcome guests in their courts. Most nobles have their kitchen staff import the beans at great expense from other planes then roast the beans with local ingredients gathered on the Plane of Water to create a brew unique to their locale. A faydhaan's dallah has the name of a specific faydhaan shuyookh engraved on the bottom and typically comes with six drinking cups, a platter, and a selection of coffee beans.\n\n**Ativar—Preparar** 3 ações (concentrar, manipular)\n**Efeito** Você place a handful of beans in the dallah, and it immediately grinds the beans, fills with water, and brews six cups' worth of coffee. Pouring a cupful of coffee into a vessel takes an Interact ação, as does drinking a cup. A criatura that drinks a cup can breathe underwater and is protected from mild or severe temperatures of underwater environments for 8 hours. The coffee can later be transmuted using the dallah's other activation, but this latent magic ends if the dallah is used to brew coffee again. Coffee poured from the dallah stays in its vessel until someone drinks it or deliberately pours it out, even if the vessel is in an environment where the coffee would normally escape, such as underwater.\n\n**Ativar—Hospitalidade do faydhaan** 2 ações (concentrar)\n**Frequência** 1 vez ao dia\n**Requisitos** Você used the dallah's activation to brew a batch of coffee today\n**Efeito** Você speak the name of the faydhaan shuyookh inscribed on the dallah. Você don't need to be holding the dallah to use this activation. The shuyookh transmutes the coffee within the body of each criatura who partook from the batch você brewed, choosing a single common potion of 6th level or lower &lt;%END>, which grants them all the benefits of that potion. Typically, the shuyookh chooses a moderate healing potion, lesser potion of resistência, or potion of swimming.",
    activations: [
  {
    name: "Preparar",
    actionType: "three",
    traits: ["Concentrate","Manipulate"],
    effect: "Você coloca um punhado de feijão no dallah e ele imediatamente mói os grãos, enche com água e prepara seis xícaras de café. Derramar uma xícara de café em uma vasilha exige uma ação Interagir, assim como beber uma xícara. Uma criatura que bebe um copo pode respirar debaixo d'água e fica protegida de temperaturas amenas ou severas de ambientes subaquáticos por 8 horas. O café pode mais tarde ser transmutado usando outra ativação do dallah, mas essa magia latente termina se o dallah for usado para preparar café novamente. O café derramado do dallah permanece em sua vasilha até que alguém o beba ou o despeje deliberadamente, mesmo que a vasilha esteja em um ambiente onde o café normalmente escaparia, como debaixo d'água.",
  },
  {
    name: "Hospitalidade do faydhaan",
    actionType: "two",
    traits: ["Concentrate"],
    frequency: "1 vez ao dia",
    requirements: "Você usou a ativação do Dallah para preparar uma fornada de café hoje",
    effect: "Você fala o nome do faydhaan shuyookh inscrito no dallah. Você não precisa segurar o dallah para usar esta ativação. O shuyookh transmuta o café dentro do corpo de cada criatura que participou do lote que você preparou, escolhendo uma única poção comum de 6º nível ou inferior &lt;%END>, que lhes concede todos os benefícios daquela poção. Normalmente, o shuyookh escolhe uma poção de cura moderada, uma poção de menor resistência ou uma poção de natação.",
  },
    ],
  },
  "Faydhaan's Dallah": {
    description: "Dallah ornamentada com o nome de um shuyookh faydhaan gravado no fundo; vem com seis xícaras, bandeja e grãos.\n\n**Ativar—Preparar** 3 ações (concentrar, manipular)\n**Efeito** Você place a handful of beans in the dallah, and it immediately grinds the beans, fills with water, and brews six cups' worth of coffee. Pouring a cupful of coffee into a vessel takes an Interact ação, as does drinking a cup. A criatura that drinks a cup can breathe underwater and is protected from mild or severe temperatures of underwater environments for 8 hours. The coffee can later be transmuted using the dallah's other activation, but this latent magic ends if the dallah is used to brew coffee again. Coffee poured from the dallah stays in its vessel until someone drinks it or deliberately pours it out, even if the vessel is in an environment where the coffee would normally escape, such as underwater.\n\n**Ativar—Hospitalidade do faydhaan** 2 ações (concentrar)\n**Frequência** 1 vez ao dia\n**Requisitos** Você used the dallah's activation to brew a batch of coffee today\n**Efeito** Você speak the name of the faydhaan shuyookh inscribed on the dallah. Você don't need to be holding the dallah to use this activation. The shuyookh transmutes the coffee within the body of each criatura who partook from the batch você brewed, choosing a single common potion of 6th level or lower &lt;%END>, which grants them all the benefits of that potion. Typically, the shuyookh chooses a moderate healing potion, lesser potion of resistência, or potion of swimming.",
    activations: [
  {
    name: "Preparar",
    actionType: "three",
    traits: ["Concentrate","Manipulate"],
    effect: "Você coloca um punhado de feijão no dallah e ele imediatamente mói os grãos, enche com água e prepara seis xícaras de café. Derramar uma xícara de café em uma vasilha exige uma ação Interagir, assim como beber uma xícara. Uma criatura que bebe um copo pode respirar debaixo d'água e fica protegida de temperaturas amenas ou severas de ambientes subaquáticos por 8 horas. O café pode mais tarde ser transmutado usando outra ativação do dallah, mas essa magia latente termina se o dallah for usado para preparar café novamente. O café derramado do dallah permanece em sua vasilha até que alguém o beba ou o despeje deliberadamente, mesmo que a vasilha esteja em um ambiente onde o café normalmente escaparia, como debaixo d'água.",
  },
  {
    name: "Hospitalidade do faydhaan",
    actionType: "two",
    traits: ["Concentrate"],
    frequency: "1 vez ao dia",
    requirements: "Você usou a ativação do Dallah para preparar uma fornada de café hoje",
    effect: "Você fala o nome do faydhaan shuyookh inscrito no dallah. Você não precisa segurar o dallah para usar esta ativação. O shuyookh transmuta o café dentro do corpo de cada criatura que participou do lote que você preparou, escolhendo uma única poção comum de 6º nível ou inferior &lt;%END>, que lhes concede todos os benefícios daquela poção. Normalmente, o shuyookh escolhe uma poção de cura moderada, uma poção de menor resistência ou uma poção de natação.",
  },
    ],
  },
  "Fearless Sash": {
    description: "A feeling of security radiates out from this sash made of fine yellow fabric. Você ganha +1 bônus de status em saves against fear.\n\n**Ativar** 1 ação (concentrar)\n**Frequência** 1 vez ao dia\n**Efeito** Você and each aliado in a 1,5 m emanation reduce seu amedrontado values by 1.",
    activations: [
  {
    name: "",
    actionType: "one",
    traits: ["Concentrate"],
    frequency: "1 vez ao dia",
    effect: "Você e cada aliado em uma emanação de 1,5 m reduzem seus valores amedrontados em 1.",
  },
    ],
  },
  "Feather of the Unfounded Bravado": {
    description: "Pena grande em vermelhos, laranjas e amarelos; na verdade, pena de galinha tingida. Infla a confiança, mas pode levar a perigo.\n\n**Ativar—Fachada presunçosa** 2 ações (concentrar)\n**Frequência** 1 vez ao dia\n**Efeito** For 1 hour, the feather concede a você a +1 bônus de item em Intimidação testes to Demoralize and Diplomacia testes to Make an Impression, but a –1 penalidade de item on Acrobacia and Atletismo testes, as seu inflated confidence leads você to attempt things você simply cannot do.",
    activations: [
  {
    name: "Fachada presunçosa",
    actionType: "two",
    traits: ["Concentrate"],
    frequency: "1 vez ao dia",
    effect: "Por 1 hora, a pena concede a você um bônus de item de +1 em testes de Intimidação para Desmoralizar e testes de Diplomacia para causar uma impressão, mas um bônus de item de -1 em testes de Acrobacia e Atletismo, já que sua confiança inflada leva você a tentar coisas que você simplesmente não pode fazer.",
  },
    ],
  },
  "Fiend Warding Tattoo": {
    description: "Como a tatuagem de proteção, no estilo contra infernais. Resistência 2 a magias e ataques mágicos de infernais o tempo todo (sobe para 5 ao ativar). Ativar — Salvaguarda tinta (concentrar): 1 vez ao dia. Gatilho: inimigo, perigo ou o ambiente ataca sua CA, exige salvaguarda ou causa dano automático. Efeito: até o fim do turno, +1 de status na CA e nas salvaguardas contra o efeito e resistência 2 ao dano disparador.",
  },
  "Fife of the Faithful": {
    description: "Pífaro de metal de qualidade extraordinária, filigrana de ouro na embocadura. +1 de item em Atuação ao tocar.\n\n**Ativar—Chamado às armas** 2 ações (auditivo, concentrar, manipular)\n**Frequência** 1 vez ao dia\n**Efeito** Você play a rousing tune on the fife that carries across the battlefield. Você and all aliados in a 18 m emanation gain a +1 bônus de status em salvaguardas por 1 rodada.",
    activations: [
  {
    name: "Chamado às armas",
    actionType: "two",
    traits: ["Auditory","Concentrate","Manipulate"],
    frequency: "1 vez ao dia",
    effect: "Você toca uma música estimulante no pífano que se espalha pelo campo de batalha. Você e todos os aliados em uma emanação de 18 m ganham +1 bônus de status em salvaguardas por 1 rodada.",
  },
    ],
  },
  "Fighter's Fork": {
    description: "This _+1 trident_, usually engraved with a decorative pattern resembling fish scales, is a common arma among warriors of aquatic ancestries.\n\n**Ativar—Comprimento fluido** 1 ação (manipular, reach)\n**Efeito** Você extend or shorten the trident's haft. When extended, the trident requires two hands to wield and gains the reach trait, but loses the trident's normal thrown trait.",
    activations: [
  {
    name: "Comprimento fluido",
    actionType: "one",
    traits: ["Manipulate","Reach"],
    effect: "Você estende ou encurta o cabo do tridente. Quando estendido, o tridente requer duas mãos para ser empunhado e ganha a característica de alcance, mas perde a característica de arremesso normal do tridente.",
  },
    ],
  },
  "Fire-Jump Ring": {
    description: "Anel negro com rubis que soltam fumaça. +2 de item em Atletismo. Ativação 1 vez ao dia: entra num fogo e sai de outro a até 100 pés.",
  },
  "Fireproof Gloves": {
    description: "Luvas bege grossas até o braço, criadas por ferreiros e adotadas por soldados que desarmam bombas e armadilhas mágicas. Resistência 5 a fogo.\n\n**Ativar—Liberar calor** 1 ação (concentrar, fire)\n**Frequência** 1 vez ao dia\n**Requisitos** Você tem a free hand\n**Efeito** Você sofre the heat that’s built up in seu gloves and discharge it onto an inimigo. Você deal 6d8 dano de fogo to one criatura ao alcance (CD 26 Reflexos básico save).",
    activations: [
  {
    name: "Liberar calor",
    actionType: "one",
    traits: ["Concentrate","Fire"],
    frequency: "1 vez ao dia",
    requirements: "Você tem a free hand",
    effect: "Você sofre o calor que se acumula em suas luvas e descarrega em um inimigo. Você causa 6d8 dano de fogo a uma criatura ao alcance (CD 26 Reflexosos básicos save).",
  },
    ],
  },
  "Fireproof Gloves (Greater)": {
    description: "Luvas bege grossas até o braço, criadas por ferreiros e adotadas por soldados que desarmam bombas e armadilhas mágicas. Resistência 10 a fogo.\n\n**Ativar—Liberar calor** 1 ação (concentrar, fire)\n**Frequência** 1 vez ao dia\n**Requisitos** Você tem a free hand\n**Efeito** Você sofre the heat that’s built up in seu gloves and discharge it onto an inimigo. Você deal 6d8 dano de fogo to one criatura ao alcance (CD 26 Reflexos básico save).",
    activations: [
  {
    name: "Liberar calor",
    actionType: "one",
    traits: ["Concentrate","Fire"],
    frequency: "1 vez ao dia",
    requirements: "Você tem a free hand",
    effect: "Você sofre o calor que se acumula em suas luvas e descarrega em um inimigo. Você causa 6d8 dano de fogo a uma criatura ao alcance (CD 26 Reflexosos básicos save).",
  },
    ],
  },
  "Flag of the Stronghold": {
    description: "Estandarte branco-sujo com fortaleza azul (afixado ou empunhado). Você e aliados na emanação do estandarte ganham resistência 5 a dano de armas de cerco.",
  },
  "Flag of the Stronghold (Major)": {
    description: "Estandarte branco-sujo com fortaleza azul (afixado ou empunhado). Você e aliados na emanação do estandarte ganham resistência 10 a dano de armas de cerco.",
  },
  "Flash Beetle Lantern": {
    description: "Lanterna encapuzada com ovos de besouro-relâmpago em solução mágica. Luz intensa em raio de 13,5 m (luz fraca nos 13,5 m seguintes).\n\n**Ativar—Holofote** 1 ação (light, manipular, visual)\n**Frequência** 1 vez ao dia\n**Efeito** Flipping a oculto lever in the lantern’s handle triggers a small current to pass through the solution. The eggs brighten and emit a series of brilliant flashes in a 9 m cone. Each criatura in the área de efeito deve fazer um teste CD 18 salvaguarda de Fortitude. **Sucesso crítico** The criatura is unaffected. **Sucesso** The criatura is ofuscado por 1 rodada. **Falha** The criatura is cego por 1 rodada. **Falha crítica** The criatura is cego por 1 minuto.",
    activations: [
  {
    name: "Holofote",
    actionType: "one",
    traits: ["Light","Manipulate","Visual"],
    frequency: "1 vez ao dia",
    effect: "Acionar uma alavanca oculta na alça da lanterna aciona uma pequena corrente que passa pela solução. Os ovos brilham e emitem uma série de flashes brilhantes em um cone de 9 m. Cada criatura na área de efeito deve fazer um teste CD 18 salvaguarda de Fortitude. **Sucesso crítico** A criatura não é afetada. **Sucesso** A criatura é ofuscada por 1 rodada. **Falha** A criatura fica cega por 1 rodada. **Falha crítica** A criatura fica cega por 1 minuto.",
  },
    ],
  },
  "Flask Of Fellowship": {
    description: "Cantil de metal, 10 cm de diâmetro e 25 cm de altura, com quatro copos encaixados na tampa.\n\n**Ativar—Compartilhar um gole** ação livre (concentrar, manipular)\n**Gatilho** Você Make an Impression, but haven’t yet attempted the teste de perícia\n**Efeito** Você share drinks from the _flask of fellowship_, and the drink that pours from the flask happens to be exactly what o alvo of seu efforts would most like to have a dram or two of—wine, spirits, hot ginger tea, or ice cold water with lemon, for example. Você ganha +1 bônus de item on seu Diplomacia teste to Make an Impression. The GM can disallow the flask’s use if it doesn’t make sense in the moment for você to pull out a flask and start pouring, if drinks are inappropriate for the occasion, or if seu alvo is absolutely not interested in sharing a drink with você. Drinks from the _flask of fellowship_ are entirely social; they won’t intoxicate anyone, nor alleviate serious thirst.",
    activations: [
  {
    name: "Compartilhar um gole",
    actionType: "free",
    traits: ["Concentrate","Manipulate"],
    trigger: "Você impressiona, mas ainda não fez o teste de perícia",
    effect: "Você compartilha bebidas do _garrafa de comunhão_, e a bebida que sai do frasco é exatamente o que o alvo de seus esforços mais gostaria de tomar um gole ou dois - vinho, destilados, chá quente de gengibre ou água gelada com limão, por exemplo. Você ganha +1 bônus de item em seu teste de Diplomacia para causar uma boa impressão. O GM pode proibir o uso do frasco se não fizer sentido no momento para você puxar um frasco e começar a servir, se as bebidas forem inadequadas para a ocasião, ou se o seu alvo não estiver absolutamente interessado em compartilhar uma bebida com você. As bebidas do _garrafa de comunhão_ são inteiramente sociais; eles não intoxicarão ninguém, nem aliviarão a sede intensa.",
  },
    ],
  },
  "Floating Shield": {
    description: "A _floating shield_ is usually carved with wing motifs. This buckler (Hardness 6, HP 24, BT 12) can protect você on its own.\n\n**Ativar—Flutuar** 1 ação (manipular)\n**Frequência** 1 vez ao dia\n**Efeito** The shield magically releases itself and floats off seu arm into the air next to você, granting você its bônus automatically, as if você had Raised the Shield. Because você're not wielding the shield, você não pode use reactions such as Shield Block with the shield, but você ganha its benefits even when using both of seu hands. After 1 minute, the shield drops to the ground, ending its floating effect. While the shield is adjacent to você, você pode Interact to grasp it, ending its floating effect early.",
    activations: [
  {
    name: "Flutuar",
    actionType: "one",
    traits: ["Manipulate"],
    frequency: "1 vez ao dia",
    effect: "O escudo se libera magicamente e flutua do seu braço no ar próximo a você, concedendo a você seus bônus automaticamente, como se você tivesse levantado o escudo. Como você não está empunhando o escudo, você não pode usar reações como Shield Block com o escudo, mas você obtém seus benefícios mesmo usando as duas mãos. Após 1 minuto, o escudo cai no chão, encerrando seu efeito flutuante. Enquanto o escudo estiver adjacente a você, você pode interagir para agarrá-lo, encerrando precocemente seu efeito flutuante.",
  },
    ],
  },
  "Floating Shield (Greater)": {
    description: "A _floating shield_ is usually carved with wing motifs. This buckler (Hardness 6, HP 24, BT 12) can protect você on its own. Você pode activate the shield any number of times per day.\n\n**Ativar—Flutuar** 1 ação (manipular)\n**Frequência** 1 vez ao dia\n**Efeito** The shield magically releases itself and floats off seu arm into the air next to você, granting você its bônus automatically, as if você had Raised the Shield. Because você're not wielding the shield, você não pode use reactions such as Shield Block with the shield, but você ganha its benefits even when using both of seu hands. After 1 minute, the shield drops to the ground, ending its floating effect. While the shield is adjacent to você, você pode Interact to grasp it, ending its floating effect early.",
    activations: [
  {
    name: "Flutuar",
    actionType: "one",
    traits: ["Manipulate"],
    frequency: "1 vez ao dia",
    effect: "O escudo se libera magicamente e flutua do seu braço no ar próximo a você, concedendo a você seus bônus automaticamente, como se você tivesse levantado o escudo. Como você não está empunhando o escudo, você não pode usar reações como Shield Block com o escudo, mas você obtém seus benefícios mesmo usando as duas mãos. Após 1 minuto, o escudo cai no chão, encerrando seu efeito flutuante. Enquanto o escudo estiver adjacente a você, você pode interagir para agarrá-lo, encerrando precocemente seu efeito flutuante.",
  },
    ],
  },
  "Floating Tent (Four-Person)": {
    description: "Tenda em losango para dormir sem gravidade (Plano do Ar), com pesos nos seis pontos e âncora para não flutuar. Cabe quatro criaturas e o equipamento: quatro redes de dormir em duas fileiras no centro e redes de armazenamento no topo e na base.",
  },
  "Floating Tent (Pup)": {
    description: "Tenda em losango para dormir sem gravidade (Plano do Ar), com pesos nos seis pontos e âncora para não flutuar. Cabe uma pessoa e o equipamento: uma rede de dormir no centro para criatura Média ou menor e uma rede de armazenamento embaixo.",
  },
  "Flying Broomstick": {
    description: "Vassoura que flutua até guardada. Você monta guiando com uma mão (voo 20 pés, mais um passageiro). Sobrecarga reduz o deslocamento; acima de 30 de Carga ela cai.\n\n**Ativar—Decolar** 2 ações (concentrar, manipular)\n**Efeito** Você name a destination on the same plane, and the broom speeds toward it at a deslocamento de voo of 12 m. Você deve either clutch the broom with two hands in order to ride it, or você need to release the broom to send it off with no rider. Se você don't have a good idea of the location, layout, and general direction of the destination, or if seu named destination is on another plane, the broom wanders aimlessly, circling back to its starting location after 30 minutes. If the broom carries a rider, this activation lasts until 4 hours pass (typically 25,6 km of travel), the broom reaches its destination, or você Dismiss the activation. If the broom doesn't have a rider, the activation lasts until the broom reaches its destination. When the activation ends, the broom floats to the ground and can't be activated again por 1 hora.",
    activations: [
  {
    name: "Decolar",
    actionType: "two",
    traits: ["Concentrate","Manipulate"],
    effect: "Você nomeia um destino no mesmo avião, e a vassoura acelera em direção a ele a uma distância de voo de 12 m. Você deve segurar a vassoura com as duas mãos para montá-la ou soltá-la para despachá-la sem piloto. Se você não tiver uma boa ideia da localização, layout e direção geral do destino, ou se o destino nomeado estiver em outro avião, a vassoura vagueia sem rumo, circulando de volta ao local inicial após 30 minutos. Se a vassoura carrega um passageiro, essa ativação dura até que se passem 4 horas (normalmente 25,6 km de viagem), a vassoura chega ao seu destino, ou você dispensa a ativação. Caso a vassoura não tenha piloto, a ativação dura até que a vassoura chegue ao seu destino. Quando a ativação termina, a vassoura flutua até o chão e não pode ser ativada novamente por 1 hora.",
  },
    ],
  },
  "Force Shield": {
    description: "The edges of this elaborately engraved steel shield (Hardness 8, HP 32, BT 16) bear tiny glass tiles set in mosaic patterns.\n\n**Ativar—Bolha de força** 1 ação (concentrar, force)\n**Frequência** 1 vez ao dia\n**Efeito** The shield surrounds você with a bubble of force that protects você from harm, granting você resistência 5 to physical dano por 1 minuto. The activation ends if você cease holding the shield.",
    activations: [
  {
    name: "Bolha de força",
    actionType: "one",
    traits: ["Concentrate","Force"],
    frequency: "1 vez ao dia",
    effect: "O escudo envolve você com uma bolha de força que o protege de danos, concedendo-lhe resistência 5 a danos físicos por 1 minuto. A ativação termina se você parar de segurar o escudo.",
  },
    ],
  },
  "Forge Warden": {
    description: "Escudo de aço reforço menor, símbolo de Torag (é um símbolo religioso). Erguido: você e aliados adjacentes têm resistência 5 a fogo.\n\n**Ativar—Fogo da forja** ação livre (concentrar, fire)\n**Gatilho** Você use the _forge warden_ to Shield Block an adjacent criatura's attack, and the shield takes dano\n**Efeito** The attacking criatura takes 2d6 dano de fogo.",
    activations: [
  {
    name: "Fogo da forja",
    actionType: "free",
    traits: ["Concentrate","Fire"],
    trigger: "Você usa o _forge warden_ para bloquear com escudo o ataque de uma criatura adjacente, e o escudo sofre dano",
    effect: "A criatura atacante sofre 2d6 de dano de fogo.",
  },
    ],
  },
  "Forgefather": {
    description: "Esta runa was created by Torag, god of the forge, protection, and strategy, and shared with his greatest artisans and warriors. Torag designed a small number of these seals as gifts to allied deities; each one is nearly identical but has a different magia effect when using the reação activation; for instance, Sarenrae's seal casts _sunburst_ em vez de _earthquake_. A seal constantly rings with the quiet sound of a hammer impacto an anvil when etched onto a runestone. A _Forgefather's seal_ can be etched only onto armadura that can bear two or more property runes, and it is so powerful that it takes the place of two property runes. Enquanto estiver vestindo armadura etched with a _Forgefather's seal_, você ganha fire resistência 40. Você ignora the armadura's teste penalidade and Speed penalidade (if any); if the armadura is light or medium, increase its bônus de item em AC by 1. Além disso, any shield você wield automatically recovers 10 PV at the start of seu turno each rodada.\n\n**Ativar—Rechaço retributivo** reação (manipular)\n**Frequência** 1 vez ao dia\n**Gatilho** Você está hit by an attack\n**Efeito** The _Forgefather's seal_ glows and seu armadura shakes as it absorbs the blow. The attack's dano is reduced by 100 and você cast _earthquake_ (CD 40), centered directly on the triggering criatura. Você decide the area of the earthquake when você Cast the Spell, from as small as the size of the criatura and up to a 18 m burst.\n\n**Ativar—Selo da restauração** 3 ações (manipular)\n**Frequência** 1 vez ao dia\n**Efeito** Você call upon on the restorative powers of the seal to repair an item ao alcance. The rune instantly restores the item to full PV, even if the item was destroyed, using the effects of the _remake_ magia, so long as the majority of the item is available for the repair. The seal can restore even magic items and artifacts of its level or lower. Once você tem used this ability, the seal's ability to automatically repair shields becomes inactive until the next time você make seu daily preparations.\n\n**Ativar—Sacrifício resoluto** ação livre (concentrar)\n**Gatilho** Você tem not acted yet on seu turno\n**Efeito** Você call upon Torag to defend seu aliados and those around você, sacrificing yourself in the process. Creatures of seu choosing within 18 m recover all their PV. If any of the criaturas are dead, they are instead brought back to life with half of their maximum PV. The chosen criaturas also gain a +4 bônus de status em AC and salvaguardas, and fast healing 15 por 1 hora. Você pode use this ability to bring back to life a criatura that requires a _wish_ ritual or divine intervention to raise from the dead, enquanto você choose no other criaturas within 18 m to recover. Once você use this activation, você está turned into a perfect statue made from stone or metal that depicts você in a glorious pose honoring seu sacrifice, and você pode never be restored. The _Forgefather's seal_ remains on this statue and can be transferred to another suit of armadura or a runestone as normal. **Destruction** Using the _Forgefather's seal_ ability to bring the dead back to life on an evil demigod causes it to shatter in a violent explosion that destroys the seal and the statue made as part of the sacrifice, erasing all knowledge of the user from existence. It does, however, bring the demigod back to life.",
    activations: [
  {
    name: "Rechaço retributivo",
    actionType: "reaction",
    traits: ["Manipulate"],
    frequency: "1 vez ao dia",
    trigger: "Você está hit by an attack",
    effect: "O selo do _Forgefather_ brilha e sua armadura treme ao absorver o golpe. O dano do ataque é reduzido em 100 e você lança _earthquake_ (CD 40), centralizado diretamente na criatura desencadeadora. Você decide a área do terremoto ao lançar o feitiço, desde o tamanho da criatura até uma explosão de 18 m.",
  },
  {
    name: "Selo da restauração",
    actionType: "three",
    traits: ["Manipulate"],
    frequency: "1 vez ao dia",
    effect: "Você recorre aos poderes restauradores do selo para reparar um item ao alcance. A runa restaura instantaneamente o PV total do item, mesmo que o item tenha sido destruído, usando os efeitos da magia _remake_, desde que a maior parte do item esteja disponível para reparo. O selo pode restaurar até mesmo itens mágicos e artefatos de seu nível ou inferior. Depois que você usar essa habilidade, a habilidade do selo de reparar escudos automaticamente ficará inativa até a próxima vez que você fizer seus preparativos diários.",
  },
  {
    name: "Sacrifício resoluto",
    actionType: "free",
    traits: ["Concentrate"],
    trigger: "Você tem not acted yet on seu turno",
    effect: "Você convoca a Torag para defender seus aliados e aqueles ao seu redor, sacrificando-se no processo. Criaturas de sua escolha dentro de 18 m recuperam todo o seu PV. Se alguma das criaturas estiver morta, ela será trazida de volta à vida com metade do seu PV máximo. As criaturas escolhidas também ganham +4 bônus de status em CA e salvaguardas, e cura rápida 15 por 1 hora. Você pode usar essa habilidade para trazer de volta à vida uma criatura que requer um ritual de _desejo_ ou intervenção divina para ressuscitar dos mortos, enquanto você não escolhe nenhuma outra criatura em um raio de 18 m para se recuperar. Depois de usar esta ativação, você se transforma em uma estátua perfeita feita de pedra ou metal que o retrata em uma pose gloriosa em homenagem ao seu sacrifício, e você nunca mais será restaurado. O _Selo do Pai Forjado_ permanece nesta estátua e pode ser transferido para outra armadura ou pedra rúnica normalmente. **Destruição** Usar a habilidade do selo do _Forgefather_ para trazer os mortos de volta à vida em um semideus maligno faz com que ele se quebre em uma explosão violenta que destrói o selo e a estátua feita como parte do sacrifício, apagando todo o conhecimento do usuário da existência. No entanto, traz o semideus de volta à vida.",
  },
    ],
  },
  "Forgefather's Seal": {
    description: "Runa de Torag: ocupa duas runas de propriedade (armadura com 2+ propriedades). Resistência 40 a fogo; ignora penalidade de teste e de Deslocamento da armadura; se for leve ou média, +1 no bônus de item à CA. Escudo empunhado recupera 10 PV no início do seu turno.\n\n**Ativar—Rechaço retributivo** reação (manipular)\n**Frequência** 1 vez ao dia\n**Gatilho** Você está hit by an attack\n**Efeito** The _Forgefather's seal_ glows and seu armadura shakes as it absorbs the blow. The attack's dano is reduced by 100 and você cast _earthquake_ (CD 40), centered directly on the triggering criatura. Você decide the area of the earthquake when você Cast the Spell, from as small as the size of the criatura and up to a 18 m burst.\n\n**Ativar—Selo da restauração** 3 ações (manipular)\n**Frequência** 1 vez ao dia\n**Efeito** Você call upon on the restorative powers of the seal to repair an item ao alcance. The rune instantly restores the item to full PV, even if the item was destroyed, using the effects of the _remake_ magia, so long as the majority of the item is available for the repair. The seal can restore even magic items and artifacts of its level or lower. Once você tem used this ability, the seal's ability to automatically repair shields becomes inactive until the next time você make seu daily preparations.\n\n**Ativar—Sacrifício resoluto** ação livre (concentrar)\n**Gatilho** Você tem not acted yet on seu turno\n**Efeito** Você call upon Torag to defend seu aliados and those around você, sacrificing yourself in the process. Creatures of seu choosing within 18 m recover all their PV. If any of the criaturas are dead, they are instead brought back to life with half of their maximum PV. The chosen criaturas also gain a +4 bônus de status em AC and salvaguardas, and fast healing 15 por 1 hora. Você pode use this ability to bring back to life a criatura that requires a _wish_ ritual or divine intervention to raise from the dead, enquanto você choose no other criaturas within 18 m to recover. Once você use this activation, você está turned into a perfect statue made from stone or metal that depicts você in a glorious pose honoring seu sacrifice, and você pode never be restored. The _Forgefather's seal_ remains on this statue and can be transferred to another suit of armadura or a runestone as normal. **Destruction** Using the _Forgefather's seal_ ability to bring the dead back to life on an evil demigod causes it to shatter in a violent explosion that destroys the seal and the statue made as part of the sacrifice, erasing all knowledge of the user from existence. It does, however, bring the demigod back to life.",
    activations: [
  {
    name: "Rechaço retributivo",
    actionType: "reaction",
    traits: ["Manipulate"],
    frequency: "1 vez ao dia",
    trigger: "Você está hit by an attack",
    effect: "O selo do _Forgefather_ brilha e sua armadura treme ao absorver o golpe. O dano do ataque é reduzido em 100 e você lança _earthquake_ (CD 40), centralizado diretamente na criatura desencadeadora. Você decide a área do terremoto ao lançar o feitiço, desde o tamanho da criatura até uma explosão de 18 m.",
  },
  {
    name: "Selo da restauração",
    actionType: "three",
    traits: ["Manipulate"],
    frequency: "1 vez ao dia",
    effect: "Você recorre aos poderes restauradores do selo para reparar um item ao alcance. A runa restaura instantaneamente o PV total do item, mesmo que o item tenha sido destruído, usando os efeitos da magia _remake_, desde que a maior parte do item esteja disponível para reparo. O selo pode restaurar até mesmo itens mágicos e artefatos de seu nível ou inferior. Depois que você usar essa habilidade, a habilidade do selo de reparar escudos automaticamente ficará inativa até a próxima vez que você fizer seus preparativos diários.",
  },
  {
    name: "Sacrifício resoluto",
    actionType: "free",
    traits: ["Concentrate"],
    trigger: "Você tem not acted yet on seu turno",
    effect: "Você convoca a Torag para defender seus aliados e aqueles ao seu redor, sacrificando-se no processo. Criaturas de sua escolha dentro de 18 m recuperam todo o seu PV. Se alguma das criaturas estiver morta, ela será trazida de volta à vida com metade do seu PV máximo. As criaturas escolhidas também ganham +4 bônus de status em CA e salvaguardas, e cura rápida 15 por 1 hora. Você pode usar essa habilidade para trazer de volta à vida uma criatura que requer um ritual de _desejo_ ou intervenção divina para ressuscitar dos mortos, enquanto você não escolhe nenhuma outra criatura em um raio de 18 m para se recuperar. Depois de usar esta ativação, você se transforma em uma estátua perfeita feita de pedra ou metal que o retrata em uma pose gloriosa em homenagem ao seu sacrifício, e você nunca mais será restaurado. O _Selo do Pai Forjado_ permanece nesta estátua e pode ser transferido para outra armadura ou pedra rúnica normalmente. **Destruição** Usar a habilidade do selo do _Forgefather_ para trazer os mortos de volta à vida em um semideus maligno faz com que ele se quebre em uma explosão violenta que destrói o selo e a estátua feita como parte do sacrifício, apagando todo o conhecimento do usuário da existência. No entanto, traz o semideus de volta à vida.",
  },
    ],
  },
  "Forgotten Signet": {
    description: "Anel de prata com obsidiana e runa vermelha do esquecimento. Você sofre mente oculta (+32 de contraposição) e some da memória. Criatura sápiente, ao se separar de você: Vontade CD 42. Sucesso crítico: memória normal. Sucesso: lembra, mas descreve de forma confusa. Falha: lembra que falou com alguém do seu tipo básico, sem nome nem traços. Falha crítica: nenhuma memória. Destruição: se o nome verdadeiro do portador se torna público, o anel se parte.",
  },
  "Fortune": {
    description: "This coin is struck with the image of a beatific seraph in gold on one side and a fearsome fiend with seven eyes enameled in black on the other. While it may seem nothing more than a curiosity, it's a powerful agent of fortune when activated.\n\n**Ativar** reação (manipular, destino)\n**Gatilho** Você fail a teste or attack\n**Efeito** Flip the coin. If it lands on the seraph side, você get a 12 on the die em vez de what você rolled. If it lands on the fiend side, one of the eyes on the fiend closes. Either way, você're temporarily immune to _fortune's coin_ por 1 hora. When all seven eyes are closed, the coin vanishes into a puff of smoke, disappearing forever. This activation is a fortune effect, regardless of how the coin flip lands.",
    activations: [
  {
    name: "",
    actionType: "reaction",
    traits: ["Manipulate","Fortune"],
    trigger: "Você fail a teste ou attack",
    effect: "Jogue a moeda. Se cair no lado serafim, você tira 12 no dado em vez do que rolou. Se cair no lado do demônio, um dos olhos do demônio se fecha. De qualquer forma, você fica temporariamente imune à _moeda da fortuna_ por 1 hora. Quando todos os sete olhos estão fechados, a moeda desaparece numa nuvem de fumaça, desaparecendo para sempre. Esta ativação é um efeito de sorte, independentemente de como o cara ou coroa cai.",
  },
    ],
  },
  "Fortune's Coin": {
    description: "This coin is struck with the image of a beatific seraph in gold on one side and a fearsome fiend with seven eyes enameled in black on the other. While it may seem nothing more than a curiosity, it's a powerful agent of fortune when activated.\n\n**Ativar** reação (manipular, destino)\n**Gatilho** Você fail a teste or attack\n**Efeito** Flip the coin. If it lands on the seraph side, você get a 12 on the die em vez de what você rolled. If it lands on the fiend side, one of the eyes on the fiend closes. Either way, você're temporarily immune to _fortune's coin_ por 1 hora. When all seven eyes are closed, the coin vanishes into a puff of smoke, disappearing forever. This activation is a fortune effect, regardless of how the coin flip lands.",
    activations: [
  {
    name: "",
    actionType: "reaction",
    traits: ["Manipulate","Fortune"],
    trigger: "Você fail a teste ou attack",
    effect: "Jogue a moeda. Se cair no lado serafim, você tira 12 no dado em vez do que rolou. Se cair no lado do demônio, um dos olhos do demônio se fecha. De qualquer forma, você fica temporariamente imune à _moeda da fortuna_ por 1 hora. Quando todos os sete olhos estão fechados, a moeda desaparece numa nuvem de fumaça, desaparecendo para sempre. Esta ativação é um efeito de sorte, independentemente de como o cara ou coroa cai.",
  },
    ],
  },
  "Fortune's Coin (Platinum)": {
    description: "This coin is struck with the image of a beatific seraph in gold on one side and a fearsome fiend with seven eyes enameled in black on the other. While it may seem nothing more than a curiosity, it's a powerful agent of fortune when activated. This coin is platinum em vez de gold. The seraph side concede a você a 14 em vez da 12.\n\n**Ativar** reação (manipular, destino)\n**Gatilho** Você fail a teste or attack\n**Efeito** Flip the coin. If it lands on the seraph side, você get a 12 on the die em vez de what você rolled. If it lands on the fiend side, one of the eyes on the fiend closes. Either way, você're temporarily immune to _fortune's coin_ por 1 hora. When all seven eyes are closed, the coin vanishes into a puff of smoke, disappearing forever. This activation is a fortune effect, regardless of how the coin flip lands.",
    activations: [
  {
    name: "",
    actionType: "reaction",
    traits: ["Manipulate","Fortune"],
    trigger: "Você fail a teste ou attack",
    effect: "Jogue a moeda. Se cair no lado serafim, você tira 12 no dado em vez do que rolou. Se cair no lado do demônio, um dos olhos do demônio se fecha. De qualquer forma, você fica temporariamente imune à _moeda da fortuna_ por 1 hora. Quando todos os sete olhos estão fechados, a moeda desaparece numa nuvem de fumaça, desaparecendo para sempre. Esta ativação é um efeito de sorte, independentemente de como o cara ou coroa cai.",
  },
    ],
  },
  "Fossil Fragment (Amber Mosquito)": {
    description: "A fossil fragment is a piece of a fossil criatura, typically a smaller bone from a larger specimen. A minuscule insect preserved in fossilized tree sap, this fragment becomes a giant mosquito when activated. It can be called upon 1 vez ao dia for up to 10 minutes. The fossil mosquito can't afflict anyone with septic malaria. If the mosquito uses Blood Drain, it doesn't gain PV temporários, but instead collects blood from the victim. The blood stays within the mosquito indefinitely and stays fresh while it does. If the mosquito uses Blood Drain again, any blood from before that use is lost.\n\n**Ativar—Metamorfose fóssil** 2 ações (concentrar, manipular, minion, construct, earth, animal, death, disease, cura, nonlethal, poison, vitalidade, vazio)\n**Efeito** Você activate the fragment by placing it on solid ground and then speaking its name, causing the fragment to form the full fossilized skeleton of a criatura. In criatura form, the fragment has the minion trait. Because it's an animated fossil em vez da criatura viva, it has the construct and earth traits and lacks its normal criatura type trait (typically animal). It's also immune to bleed, death effects, disease, condenado, drenado, fatigado, healing, nonlethal attacks, paralisado, poison, enjoado, vitality, void, and inconsciente. It can understand seu language, and it obeys você to the best of its ability when você use an ação to command it. The specifics of each criatura, além de the activation's frequency, if any, appear in its entry below. If the fragment is slain while in criatura form, it reverts to its fragment shape and can't be activated again for 1 week. If the fragment is destroyed, its magic is lost.",
    activations: [
  {
    name: "Metamorfose fóssil",
    actionType: "two",
    traits: ["Concentrate","Manipulate","Minion","Construct","Earth","Animal","Death","Disease","Healing","Nonlethal","Poison","Vitality","Void"],
    effect: "Você ativa o fragmento colocando-o em solo sólido e depois falando seu nome, fazendo com que o fragmento forme o esqueleto fossilizado completo de uma criatura. Na forma de criatura, o fragmento possui a característica lacaio. Por ser um fóssil animado em vez de criatura viva, ele possui características de construção e terra e não possui sua característica normal de tipo de criatura (normalmente animal). Também é imune a sangramento, efeitos de morte, doença, condenado, drenado, fatigado, cura, ataques não letais, paralisado, veneno, enjoado, vitalidade, vazio e inconsciente. Ele pode entender seu idioma e obedece você da melhor maneira possível quando você usa uma ação para comandá-lo. As especificidades de cada criatura, além da frequência de ativação, se houver, aparecem no verbete abaixo. Se o fragmento for morto enquanto estava na forma de criatura, ele voltará à forma de fragmento e não poderá ser ativado novamente por 1 semana. Se o fragmento for destruído, sua magia será perdida.",
  },
    ],
  },
  "Fossil Fragment (Brontosaurus Phalange)": {
    description: "A fossil fragment is a piece of a fossil criatura, typically a smaller bone from a larger specimen. This massive toe bone becomes a brontosaurus when activated. It can be called upon no more than four times per month. The skeleton remains for 24 hours if used as a beast of burden or for transport. If it attempts an attack or otherwise engage in combat, it reverts to its fragment form after 1d4 rodadas. The skeleton is so massive and sturdy that it can serve as the base of a structure (from an item or magia effect with the structure trait), provided the structure is no larger than 6 m in width or height. When the brontosaurus reverts to its fragment form, the structure reverts with it.\n\n**Ativar—Metamorfose fóssil** 2 ações (concentrar, manipular, minion, construct, earth, animal, death, disease, cura, nonlethal, poison, vitalidade, vazio)\n**Efeito** Você activate the fragment by placing it on solid ground and then speaking its name, causing the fragment to form the full fossilized skeleton of a criatura. In criatura form, the fragment has the minion trait. Because it's an animated fossil em vez da criatura viva, it has the construct and earth traits and lacks its normal criatura type trait (typically animal). It's also immune to bleed, death effects, disease, condenado, drenado, fatigado, healing, nonlethal attacks, paralisado, poison, enjoado, vitality, void, and inconsciente. It can understand seu language, and it obeys você to the best of its ability when você use an ação to command it. The specifics of each criatura, além de the activation's frequency, if any, appear in its entry below. If the fragment is slain while in criatura form, it reverts to its fragment shape and can't be activated again for 1 week. If the fragment is destroyed, its magic is lost.",
    activations: [
  {
    name: "Metamorfose fóssil",
    actionType: "two",
    traits: ["Concentrate","Manipulate","Minion","Construct","Earth","Animal","Death","Disease","Healing","Nonlethal","Poison","Vitality","Void"],
    effect: "Você ativa o fragmento colocando-o em solo sólido e depois falando seu nome, fazendo com que o fragmento forme o esqueleto fossilizado completo de uma criatura. Na forma de criatura, o fragmento possui a característica lacaio. Por ser um fóssil animado em vez de criatura viva, ele possui características de construção e terra e não possui sua característica normal de tipo de criatura (normalmente animal). Também é imune a sangramento, efeitos de morte, doença, condenado, drenado, fatigado, cura, ataques não letais, paralisado, veneno, enjoado, vitalidade, vazio e inconsciente. Ele pode entender seu idioma e obedece você da melhor maneira possível quando você usa uma ação para comandá-lo. As especificidades de cada criatura, além da frequência de ativação, se houver, aparecem no verbete abaixo. Se o fragmento for morto enquanto estava na forma de criatura, ele voltará à forma de fragmento e não poderá ser ativado novamente por 1 semana. Se o fragmento for destruído, sua magia será perdida.",
  },
    ],
  },
  "Fossil Fragment (Deinonychus Claw)": {
    description: "A fossil fragment is a piece of a fossil criatura, typically a smaller bone from a larger specimen. This curved claw becomes a deinonychus when activated. It can be called upon 1 vez ao dia and can remain in deinonychus form for no more than 10 minutes. The skeleton can serve as a mount for a criatura one size smaller than it or smaller.\n\n**Ativar—Metamorfose fóssil** 2 ações (concentrar, manipular, minion, construct, earth, animal, death, disease, cura, nonlethal, poison, vitalidade, vazio)\n**Efeito** Você activate the fragment by placing it on solid ground and then speaking its name, causing the fragment to form the full fossilized skeleton of a criatura. In criatura form, the fragment has the minion trait. Because it's an animated fossil em vez da criatura viva, it has the construct and earth traits and lacks its normal criatura type trait (typically animal). It's also immune to bleed, death effects, disease, condenado, drenado, fatigado, healing, nonlethal attacks, paralisado, poison, enjoado, vitality, void, and inconsciente. It can understand seu language, and it obeys você to the best of its ability when você use an ação to command it. The specifics of each criatura, além de the activation's frequency, if any, appear in its entry below. If the fragment is slain while in criatura form, it reverts to its fragment shape and can't be activated again for 1 week. If the fragment is destroyed, its magic is lost.",
    activations: [
  {
    name: "Metamorfose fóssil",
    actionType: "two",
    traits: ["Concentrate","Manipulate","Minion","Construct","Earth","Animal","Death","Disease","Healing","Nonlethal","Poison","Vitality","Void"],
    effect: "Você ativa o fragmento colocando-o em solo sólido e depois falando seu nome, fazendo com que o fragmento forme o esqueleto fossilizado completo de uma criatura. Na forma de criatura, o fragmento possui a característica lacaio. Por ser um fóssil animado em vez de criatura viva, ele possui características de construção e terra e não possui sua característica normal de tipo de criatura (normalmente animal). Também é imune a sangramento, efeitos de morte, doença, condenado, drenado, fatigado, cura, ataques não letais, paralisado, veneno, enjoado, vitalidade, vazio e inconsciente. Ele pode entender seu idioma e obedece você da melhor maneira possível quando você usa uma ação para comandá-lo. As especificidades de cada criatura, além da frequência de ativação, se houver, aparecem no verbete abaixo. Se o fragmento for morto enquanto estava na forma de criatura, ele voltará à forma de fragmento e não poderá ser ativado novamente por 1 semana. Se o fragmento for destruído, sua magia será perdida.",
  },
    ],
  },
  "Fossil Fragment (Eurypterid Paddle)": {
    description: "A fossil fragment is a piece of a fossil criatura, typically a smaller bone from a larger specimen. The tip of an oar-like limb specialized for swimming becomes a spiny eurypterid when activated. It can be called upon once a week for up to 24 hours. The eurypterid can serve as a mount for a criatura one size smaller than it or smaller, and when it does, it confers the ability to breathe both air and water upon its rider.\n\n**Ativar—Metamorfose fóssil** 2 ações (concentrar, manipular, minion, construct, earth, animal, death, disease, cura, nonlethal, poison, vitalidade, vazio)\n**Efeito** Você activate the fragment by placing it on solid ground and then speaking its name, causing the fragment to form the full fossilized skeleton of a criatura. In criatura form, the fragment has the minion trait. Because it's an animated fossil em vez da criatura viva, it has the construct and earth traits and lacks its normal criatura type trait (typically animal). It's also immune to bleed, death effects, disease, condenado, drenado, fatigado, healing, nonlethal attacks, paralisado, poison, enjoado, vitality, void, and inconsciente. It can understand seu language, and it obeys você to the best of its ability when você use an ação to command it. The specifics of each criatura, além de the activation's frequency, if any, appear in its entry below. If the fragment is slain while in criatura form, it reverts to its fragment shape and can't be activated again for 1 week. If the fragment is destroyed, its magic is lost.",
    activations: [
  {
    name: "Metamorfose fóssil",
    actionType: "two",
    traits: ["Concentrate","Manipulate","Minion","Construct","Earth","Animal","Death","Disease","Healing","Nonlethal","Poison","Vitality","Void"],
    effect: "Você ativa o fragmento colocando-o em solo sólido e depois falando seu nome, fazendo com que o fragmento forme o esqueleto fossilizado completo de uma criatura. Na forma de criatura, o fragmento possui a característica lacaio. Por ser um fóssil animado em vez de criatura viva, ele possui características de construção e terra e não possui sua característica normal de tipo de criatura (normalmente animal). Também é imune a sangramento, efeitos de morte, doença, condenado, drenado, fatigado, cura, ataques não letais, paralisado, veneno, enjoado, vitalidade, vazio e inconsciente. Ele pode entender seu idioma e obedece você da melhor maneira possível quando você usa uma ação para comandá-lo. As especificidades de cada criatura, além da frequência de ativação, se houver, aparecem no verbete abaixo. Se o fragmento for morto enquanto estava na forma de criatura, ele voltará à forma de fragmento e não poderá ser ativado novamente por 1 semana. Se o fragmento for destruído, sua magia será perdida.",
  },
    ],
  },
  "Fossil Fragment (Petrified Wood)": {
    description: "A fossil fragment is a piece of a fossil criatura, typically a smaller bone from a larger specimen. This colorful sliver of petrificado wood becomes an awakened tree when activated. It doesn't have the normal weaknesses of an awakened tree, but it's rooted in place, imóvel. As a single ação, it can throw a petrificado seed, such as a stone pine cone or acorn, up to 18 m. A copy of the tree appears there, provided there's an unoccupied space large enough for it. While two trees exist, if either tree throws another seed, one of the existing trees disappears, replaced by the new tree. The tree can be called upon 1 vez ao dia for up to 1 minute. This duration starts when você activate the item, and all trees disappear when it ends.\n\n**Ativar—Metamorfose fóssil** 2 ações (concentrar, manipular, minion, construct, earth, animal, death, disease, cura, nonlethal, poison, vitalidade, vazio)\n**Efeito** Você activate the fragment by placing it on solid ground and then speaking its name, causing the fragment to form the full fossilized skeleton of a criatura. In criatura form, the fragment has the minion trait. Because it's an animated fossil em vez da criatura viva, it has the construct and earth traits and lacks its normal criatura type trait (typically animal). It's also immune to bleed, death effects, disease, condenado, drenado, fatigado, healing, nonlethal attacks, paralisado, poison, enjoado, vitality, void, and inconsciente. It can understand seu language, and it obeys você to the best of its ability when você use an ação to command it. The specifics of each criatura, além de the activation's frequency, if any, appear in its entry below. If the fragment is slain while in criatura form, it reverts to its fragment shape and can't be activated again for 1 week. If the fragment is destroyed, its magic is lost.",
    activations: [
  {
    name: "Metamorfose fóssil",
    actionType: "two",
    traits: ["Concentrate","Manipulate","Minion","Construct","Earth","Animal","Death","Disease","Healing","Nonlethal","Poison","Vitality","Void"],
    effect: "Você ativa o fragmento colocando-o em solo sólido e depois falando seu nome, fazendo com que o fragmento forme o esqueleto fossilizado completo de uma criatura. Na forma de criatura, o fragmento possui a característica lacaio. Por ser um fóssil animado em vez de criatura viva, ele possui características de construção e terra e não possui sua característica normal de tipo de criatura (normalmente animal). Também é imune a sangramento, efeitos de morte, doença, condenado, drenado, fatigado, cura, ataques não letais, paralisado, veneno, enjoado, vitalidade, vazio e inconsciente. Ele pode entender seu idioma e obedece você da melhor maneira possível quando você usa uma ação para comandá-lo. As especificidades de cada criatura, além da frequência de ativação, se houver, aparecem no verbete abaixo. Se o fragmento for morto enquanto estava na forma de criatura, ele voltará à forma de fragmento e não poderá ser ativado novamente por 1 semana. Se o fragmento for destruído, sua magia será perdida.",
  },
    ],
  },
  "Fossil Fragment (Triceratops Frill)": {
    description: "A fossil fragment is a piece of a fossil criatura, typically a smaller bone from a larger specimen. This small piece of triceratops frill turns into a triceratops when activated. It can be called upon 1 vez ao dia and can remain in triceratops form for no more than 10 minutes. The skeleton can serve as a mount for a criatura one size smaller than it or smaller.\n\n**Ativar—Metamorfose fóssil** 2 ações (concentrar, manipular, minion, construct, earth, animal, death, disease, cura, nonlethal, poison, vitalidade, vazio)\n**Efeito** Você activate the fragment by placing it on solid ground and then speaking its name, causing the fragment to form the full fossilized skeleton of a criatura. In criatura form, the fragment has the minion trait. Because it's an animated fossil em vez da criatura viva, it has the construct and earth traits and lacks its normal criatura type trait (typically animal). It's also immune to bleed, death effects, disease, condenado, drenado, fatigado, healing, nonlethal attacks, paralisado, poison, enjoado, vitality, void, and inconsciente. It can understand seu language, and it obeys você to the best of its ability when você use an ação to command it. The specifics of each criatura, além de the activation's frequency, if any, appear in its entry below. If the fragment is slain while in criatura form, it reverts to its fragment shape and can't be activated again for 1 week. If the fragment is destroyed, its magic is lost.",
    activations: [
  {
    name: "Metamorfose fóssil",
    actionType: "two",
    traits: ["Concentrate","Manipulate","Minion","Construct","Earth","Animal","Death","Disease","Healing","Nonlethal","Poison","Vitality","Void"],
    effect: "Você ativa o fragmento colocando-o em solo sólido e depois falando seu nome, fazendo com que o fragmento forme o esqueleto fossilizado completo de uma criatura. Na forma de criatura, o fragmento possui a característica lacaio. Por ser um fóssil animado em vez de criatura viva, ele possui características de construção e terra e não possui sua característica normal de tipo de criatura (normalmente animal). Também é imune a sangramento, efeitos de morte, doença, condenado, drenado, fatigado, cura, ataques não letais, paralisado, veneno, enjoado, vitalidade, vazio e inconsciente. Ele pode entender seu idioma e obedece você da melhor maneira possível quando você usa uma ação para comandá-lo. As especificidades de cada criatura, além da frequência de ativação, se houver, aparecem no verbete abaixo. Se o fragmento for morto enquanto estava na forma de criatura, ele voltará à forma de fragmento e não poderá ser ativado novamente por 1 semana. Se o fragmento for destruído, sua magia será perdida.",
  },
    ],
  },
  "Fossil Fragment (Tyrannosaur Tooth)": {
    description: "A fossil fragment is a piece of a fossil criatura, typically a smaller bone from a larger specimen. This dagger-shaped tooth turns into a tyrannosaurus when activated. It can be called upon 1 vez ao dia and can remain in tyrannosaurus form for no more than 10 minutes. The skeleton can serve as a mount for a criatura one size smaller than it or smaller.\n\n**Ativar—Metamorfose fóssil** 2 ações (concentrar, manipular, minion, construct, earth, animal, death, disease, cura, nonlethal, poison, vitalidade, vazio)\n**Efeito** Você activate the fragment by placing it on solid ground and then speaking its name, causing the fragment to form the full fossilized skeleton of a criatura. In criatura form, the fragment has the minion trait. Because it's an animated fossil em vez da criatura viva, it has the construct and earth traits and lacks its normal criatura type trait (typically animal). It's also immune to bleed, death effects, disease, condenado, drenado, fatigado, healing, nonlethal attacks, paralisado, poison, enjoado, vitality, void, and inconsciente. It can understand seu language, and it obeys você to the best of its ability when você use an ação to command it. The specifics of each criatura, além de the activation's frequency, if any, appear in its entry below. If the fragment is slain while in criatura form, it reverts to its fragment shape and can't be activated again for 1 week. If the fragment is destroyed, its magic is lost.",
    activations: [
  {
    name: "Metamorfose fóssil",
    actionType: "two",
    traits: ["Concentrate","Manipulate","Minion","Construct","Earth","Animal","Death","Disease","Healing","Nonlethal","Poison","Vitality","Void"],
    effect: "Você ativa o fragmento colocando-o em solo sólido e depois falando seu nome, fazendo com que o fragmento forme o esqueleto fossilizado completo de uma criatura. Na forma de criatura, o fragmento possui a característica lacaio. Por ser um fóssil animado em vez de criatura viva, ele possui características de construção e terra e não possui sua característica normal de tipo de criatura (normalmente animal). Também é imune a sangramento, efeitos de morte, doença, condenado, drenado, fatigado, cura, ataques não letais, paralisado, veneno, enjoado, vitalidade, vazio e inconsciente. Ele pode entender seu idioma e obedece você da melhor maneira possível quando você usa uma ação para comandá-lo. As especificidades de cada criatura, além da frequência de ativação, se houver, aparecem no verbete abaixo. Se o fragmento for morto enquanto estava na forma de criatura, ele voltará à forma de fragmento e não poderá ser ativado novamente por 1 semana. Se o fragmento for destruído, sua magia será perdida.",
  },
    ],
  },
  "Frostwalker Pattern": {
    description: "Motivos de geada nos pés. Ignora terreno difícil de gelo e neve.\n\n**Ativar** 1 ação (concentrar)\n**Frequência** 1 vez ao dia\n**Efeito** Until the end of seu next turno, você ignore terreno difícil and terreno muito difícil from ice and snow and don't risk falling when crossing ice.",
    activations: [
  {
    name: "",
    actionType: "one",
    traits: ["Concentrate"],
    frequency: "1 vez ao dia",
    effect: "Até o final do próximo turno, você ignora terrenos difíceis e terrenos muito difíceis de gelo e neve e não corre o risco de cair ao cruzar o gelo.",
  },
    ],
  },
  "Full Pack": {
    description: "Fiéis de Nethys prenderam truques em cartas, acessíveis até a não conjuradores. Cartas de pergaminho com o nome do truque. Ativar—Escolher uma Carta (manipular): visualize o truque, a carta sobe e você a saca; o baralho o conjura como magia de 1º posto (CD 15, ataque de magia +5); a carta vira pó. A ativação gasta as mesmas ações do truque. Este pacote tem 25 cartas — uma de cada truque do Player Core.",
  },
  "Fulu Compendium": {
    description: "Livreto que registra símbolos de fulus e traz magia pronta numa página que se restaura a cada amanhecer. Como referência, +2 de item em testes para determinar função ou autenticidade de um fulu.\n\n**Ativar—Página paralisante** 2 ações (manipular, undead)\n**Frequência** 1 vez ao dia\n**Efeito** Você rip a page from the fulu compendium and cast it in a wide arc; as it flies in that arc, it multiplies into a storm of fulus. All undead criaturas in a 9 m emanation are affected by a _spirit-sealing fulu_ with a save CD of 25.",
    activations: [
  {
    name: "Página paralisante",
    actionType: "two",
    traits: ["Manipulate","Undead"],
    frequency: "1 vez ao dia",
    effect: "Você rasga uma página do compêndio fulu e a lança em um amplo arco; à medida que voa nesse arco, ele se multiplica em uma tempestade de fulus. Todas as criaturas mortas-vivas em uma emanação de 9 meses são afetadas por um _fulu selador de espírito_ com um CD de salvamento de 25.",
  },
    ],
  },
  "Galvanic Mortal Coil": {
    description: "Bobina de aço poroso em volta de lasca de ônix: galvaesfera com necromancia. Em carne viva, sobrecarga no coração; em cadáver, reanima por pouco tempo e acessa memórias finais.\n\n**Ativar** 3 ações (manipular)\n**Frequência** 1 vez por hora\n**Efeito** Você drive the coil into a criatura viva that has 0 HP while attaching the other end to yourself, in order to dano their heart and possibly siphon their life force. The galvanic mortal coil casts _death knell_ on the criatura (CD 27).\n\n**Ativar** 10 minutos (manipular)\n**Frequência** 1 vez ao dia\n**Efeito** implant the coil into a corpse. The coil casts _talking corpse_ on the body.",
    activations: [
  {
    name: "",
    actionType: "three",
    traits: ["Manipulate"],
    frequency: "1 vez por hora",
    effect: "Você enfia a bobina em uma criatura viva que tem 0 HP enquanto prende a outra extremidade em você, para danificar seu coração e possivelmente drenar sua força vital. A bobina mortal galvânica lança uma sentença de morte sobre a criatura (CD 27).",
  },
  {
    name: "",
    timeCost: "10 minutos",
    traits: ["Manipulate"],
    frequency: "1 vez ao dia",
    effect: "implantar a bobina em um cadáver. A bobina lança _cadáver falante_ no corpo.",
  },
    ],
  },
  "Gas Mask of Clean Air": {
    description: "Máscara de lona preta sobre boca e nariz, com tubos laterais. +1 de item em salvaguardas contra venenos inalados, doenças inaladas e efeitos olfativos.\n\n**Ativar—Respirar ar puro** 1 ação (manipular)\n**Frequência** 1 vez ao dia\n**Efeito** Seu mask springs to life, pumping clean air into seu nose and mouth. For 1 rodada, você está immune to inhaled poisons, inhaled diseases, and olfactory effects. If você tem ongoing effects due to such an effect from before activating the mask, those effects continue as normal. If the air around você is unbreathable, você está underwater, or você está in a vacuum, você pode breathe normally.",
    activations: [
  {
    name: "Respirar ar puro",
    actionType: "one",
    traits: ["Manipulate"],
    frequency: "1 vez ao dia",
    effect: "Sua máscara ganha vida, bombeando ar limpo para seu nariz e boca. Durante 1 rodada, você fica imune a venenos inalados, doenças inaladas e efeitos olfativos. Se você tiver efeitos contínuos devido a tal efeito antes de ativar a máscara, esses efeitos continuarão normalmente. Se o ar ao seu redor for irrespirável, você estiver debaixo d'água ou no vácuo, você pode respirar normalmente.",
  },
    ],
  },
  "Gate Attenuator": {
    description: "Disco ou portal no tronco. Cinético: +1 no impulso. Ao investir, escolha o elemento.\n\n**Ativar—Magia elemental** 2 ações (concentrar)\n**Frequência** 1 vez ao dia\n**Efeito** The _gate attenuator_ casts a 1º posto magia, with a ataque de magia modifier of +7 and CD de magia of 17. Se você're a kineticist and the magia's element matches one of seu kinetic elements, você pode use seu impulse attack modifier em vez de the ataque de magia modifier or seu impulse CD em vez de the CD de magia. The magia corresponds to the element the item is attuned to, and it gains that element's trait if it doesn't already have it: **air** _gust of wind_, **earth** _pummeling rubble_, **fire** _dehydrate_, **metal** _thunderstrike_, **water** _snowball_, or **wood** _flourishing flora_.",
    activations: [
  {
    name: "Magia elemental",
    actionType: "two",
    traits: ["Concentrate"],
    frequency: "1 vez ao dia",
    effect: "O _gate attenuator_ lança um 1º posto magia, com um modificador de ataque de magia de +7 e CD de magia de 17. Se você é um kineticista e o elemento da magia corresponde a um de seus elementos cinéticos, você pode usar seu modificador de ataque de impulso em vez do modificador de ataque de magia ou seu CD de impulso em vez do CD de magia. A magia corresponde ao elemento ao qual o item está sintonizado e ganha a característica desse elemento se ainda não a tiver: **ar** _rajada de vento_, **terra** _esmurrando escombros_, **fogo** _desidratado_, **metal** _trovão_, **água** _bola de neve_ ou **madeira** _flora florescente_.",
  },
    ],
  },
  "Gate Attenuator (Greater)": {
    description: "_Gate attenuators_ are typically worn near the body's core and are shaped like portals or passageways, making literal the elemental gates kineticists possess within their bodies. The appearance can vary from a simple disk with a hole in the middle to a design matching a city gate of a particular settlement. Se você're a kineticist, the attenuator concede a você a +1 bônus de item em seu impulse attack modifier (but not to seu impulse CD). When você invest a _gate attenuator_, attune it to one element of seu choice. Designs on the attenuator's surface transform to match that element, and the attenuator gains the element's trait until it's no longer invested or is attuned to a different element. The bônus de item em seu impulse attack modifier is +2. The activation casts a 5º posto magia, with a ataque de magia modifier of +18 and a CD de magia of 28: **air** _pressure zone_, **earth** _sand form_, **fire** _flames of ego_, **metal** _impaling spike_, **water** _freezing rain_, or **wood** _entwined roots_.\n\n**Ativar—Magia elemental** 2 ações (concentrar)\n**Frequência** 1 vez ao dia\n**Efeito** The _gate attenuator_ casts a 1º posto magia, with a ataque de magia modifier of +7 and CD de magia of 17. Se você're a kineticist and the magia's element matches one of seu kinetic elements, você pode use seu impulse attack modifier em vez de the ataque de magia modifier or seu impulse CD em vez de the CD de magia. The magia corresponds to the element the item is attuned to, and it gains that element's trait if it doesn't already have it: **air** _gust of wind_, **earth** _pummeling rubble_, **fire** _dehydrate_, **metal** _thunderstrike_, **water** _snowball_, or **wood** _flourishing flora_.",
    activations: [
  {
    name: "Magia elemental",
    actionType: "two",
    traits: ["Concentrate"],
    frequency: "1 vez ao dia",
    effect: "O _gate attenuator_ lança um 1º posto magia, com um modificador de ataque de magia de +7 e CD de magia de 17. Se você é um kineticista e o elemento da magia corresponde a um de seus elementos cinéticos, você pode usar seu modificador de ataque de impulso em vez do modificador de ataque de magia ou seu CD de impulso em vez do CD de magia. A magia corresponde ao elemento ao qual o item está sintonizado e ganha a característica desse elemento se ainda não a tiver: **ar** _rajada de vento_, **terra** _esmurrando escombros_, **fogo** _desidratado_, **metal** _trovão_, **água** _bola de neve_ ou **madeira** _flora florescente_.",
  },
    ],
  },
  "Gate Attenuator (Major)": {
    description: "Ápice: Constituição sobe em 1 ou vai a +4. Cinético: +2 no impulso.\n\n**Ativar—Magia elemental** 2 ações (concentrar)\n**Frequência** 1 vez ao dia\n**Efeito** The _gate attenuator_ casts a 1º posto magia, with a ataque de magia modifier of +7 and CD de magia of 17. Se você're a kineticist and the magia's element matches one of seu kinetic elements, você pode use seu impulse attack modifier em vez de the ataque de magia modifier or seu impulse CD em vez de the CD de magia. The magia corresponds to the element the item is attuned to, and it gains that element's trait if it doesn't already have it: **air** _gust of wind_, **earth** _pummeling rubble_, **fire** _dehydrate_, **metal** _thunderstrike_, **water** _snowball_, or **wood** _flourishing flora_.",
    activations: [
  {
    name: "Magia elemental",
    actionType: "two",
    traits: ["Concentrate"],
    frequency: "1 vez ao dia",
    effect: "O _gate attenuator_ lança um 1º posto magia, com um modificador de ataque de magia de +7 e CD de magia de 17. Se você é um kineticista e o elemento da magia corresponde a um de seus elementos cinéticos, você pode usar seu modificador de ataque de impulso em vez do modificador de ataque de magia ou seu CD de impulso em vez do CD de magia. A magia corresponde ao elemento ao qual o item está sintonizado e ganha a característica desse elemento se ainda não a tiver: **ar** _rajada de vento_, **terra** _esmurrando escombros_, **fogo** _desidratado_, **metal** _trovão_, **água** _bola de neve_ ou **madeira** _flora florescente_.",
  },
    ],
  },
  "Gaze of the Mantis": {
    description: "Óculos de lentes vermelhas facetadas, como olhos de louva-a-deus. +2 de item em testes visuais de Percepção; você não pode ser flanqueado.\n\n**Ativar—Sentir o alvo** 1 ação\n**Frequência** 1 vez ao dia\n**Requisitos** Você’re a Red Mantis assassin\n**Efeito** Você learn the distance to and direction of all criaturas that have a Red Mantis contract on them within 16 km. If one of these criaturas is within 30 m, você also know any afflictions, conditions, and magias affecting them. This awareness lasts por 1 hora.",
    activations: [
  {
    name: "Sentir o alvo",
    actionType: "one",
    frequency: "1 vez ao dia",
    requirements: "Você’re a Red Mantis assassin",
    effect: "Você aprende a distância e a direção de todas as criaturas que possuem um contrato Red Mantis em um raio de 16 km. Se uma dessas criaturas estiver dentro de 30 m, você também conhecerá quaisquer aflições, condições e magias que as afetem. Essa consciência dura por 1 hora.",
  },
    ],
  },
  "Gelid Shard": {
    description: "Peça de artefato de arquétipo. Cristal que suga o calor. Cravado no coração, o bônus de efeitos de emoção cai 1 (mínimo 0; –2 no 10º nível). CD de Fazer uma impressão, Pedir um favor ou Ajudar nesses testes sobe +2. Resistência a frio igual ao nível e +2 de status em salvaguardas contra emoção. Destruição: uma semana e um dia no Plano do Fogo, depois esmagar com martelo de adamantina por quem amou de verdade o criador.",
  },
  "Ghost Lantern": {
    description: "Lanterna de capuz de frio ferro, vidro cinza. Usa óleo como lanterna comum; a luz deixa tudo dessaturado e brilha no Plano Etéreo e no Universo (noutros planos, lanterna normal).\n\n**Ativar** 1 ação (concentrar, magical)\n**Frequência** 1 vez ao dia\n**Requisitos** The lantern's shutters are open\n**Efeito** Você concentrate on the lantern’s light to soften the boundary between the Ethereal Plane and the Universe. Any criatura in the lantern’s bright light on the Universe gains the effects of the _ghost touch_ property rune on all its weapons and unarmed attacks. If an affected arma or attack is magical and already has the maximum number of property runes, the wielder can choose one to suppress to gain ghost touch. This benefit lasts for 5 minutes or until the shutters are closed, whichever comes first. It applies to a criatura only while it’s in the lantern’s bright light, and if the criatura leaves the light and returns it regains the benefit once more.",
    activations: [
  {
    name: "",
    actionType: "one",
    traits: ["Concentrate","Magical"],
    frequency: "1 vez ao dia",
    requirements: "As venezianas da lanterna estão abertas",
    effect: "Você se concentra na luz da lanterna para suavizar a fronteira entre o Plano Etéreo e o Universo. Qualquer criatura sob a luz brilhante da lanterna no Universo ganha os efeitos da runa de propriedade _toque fantasma_ em todas as suas armas e ataques desarmados. Se uma arma ou ataque afetado for mágico e já tiver o número máximo de runas de propriedade, o usuário pode escolher uma para suprimir para ganhar toque fantasma. Este benefício dura 5 minutos ou até o fechamento das venezianas, o que ocorrer primeiro. Aplica-se a uma criatura apenas enquanto ela estiver sob a luz brilhante da lanterna, e se a criatura deixar a luz e retornar, ela recuperará o benefício mais uma vez.",
  },
    ],
  },
  "Ghosthand": {
    description: "The barrel of this long rifle is translucent in places, forming a swirled pattern along the metal, and its stock is formed of crimson wood. _Ghosthand's Comet_ is a _+4 impacto máximo beast-bane greater impactful advanced firearm_ with a range increment of 300 pés. It deals 5d8 dano de força and has the backstabber, concussive, kickback, and fatal d12 traits. As a star gun, _Ghosthand's Comet_ runs on magic and doesn't use ammunition or black powder. A arma é silent when fired.\n\n**Ativar** ação livre (concentrar)\n**Gatilho** Você attempt a ranged Golpe with _Ghosthand's Comet_\n**Efeito** For the triggering Golpe, _Ghosthand's Comet_ changes its dano type to seu choice of acid, cold, electricity, fire, or sonic.\n\n**Ativar** 1 ação (concentrar)\n**Efeito** On seu next attempt at a ranged Golpe with _Ghosthand's Comet_, the shot phases through any material or magical obstacle, such as a _wall of force_, in its path, ignoring all cover. Você deve attempt the Golpe by the end of seu turno or this effect is lost. **Destruction** If the Grim Reaper slays the wielder of _Ghosthand's Comet_, the Reaper's scythe, as it strikes the killing blow, is destined to slice the star gun in half.",
    activations: [
  {
    name: "",
    actionType: "free",
    traits: ["Concentrate"],
    trigger: "Você tenta um Golpe de longo alcance com _Ghosthand's Comet_",
    effect: "Para o Golpe desencadeador, _Ghosthand's Comet_ muda seu tipo de dano para sua escolha de ácido, frio, eletricidade, fogo ou sônico.",
  },
  {
    name: "",
    actionType: "one",
    traits: ["Concentrate"],
    effect: "Em sua próxima tentativa de Golpe de longo alcance com _Ghosthand's Comet_, o tiro passa por qualquer obstáculo material ou mágico, como uma _parede de força_, em seu caminho, ignorando toda cobertura. Você deve tentar o Golpe até o final do turno ou esse efeito será perdido. **Destruição** Se o Grim Reaper matar o portador do _Ghosthand's Comet_, a foice do Reaper, ao desferir o golpe mortal, estará destinada a cortar a arma estelar ao meio.",
  },
    ],
  },
  "Ghosthand's Comet": {
    description: "Rifle longo de cano translúcido e coronha carmim: arma de fogo avançada +4 impactante máxima ruína das feras impactuosa maior, incremento 90 m. 5d8 de força; punhalada, concussiva, recuo e fatal d12. Arma estelar silenciosa, sem munição.\n\n**Ativar** ação livre (concentrar)\n**Gatilho** Você attempt a ranged Golpe with _Ghosthand's Comet_\n**Efeito** For the triggering Golpe, _Ghosthand's Comet_ changes its dano type to seu choice of acid, cold, electricity, fire, or sonic.\n\n**Ativar** 1 ação (concentrar)\n**Efeito** On seu next attempt at a ranged Golpe with _Ghosthand's Comet_, the shot phases through any material or magical obstacle, such as a _wall of force_, in its path, ignoring all cover. Você deve attempt the Golpe by the end of seu turno or this effect is lost. **Destruction** If the Grim Reaper slays the wielder of _Ghosthand's Comet_, the Reaper's scythe, as it strikes the killing blow, is destined to slice the star gun in half.",
    activations: [
  {
    name: "",
    actionType: "free",
    traits: ["Concentrate"],
    trigger: "Você tenta um Golpe de longo alcance com _Ghosthand's Comet_",
    effect: "Para o Golpe desencadeador, _Ghosthand's Comet_ muda seu tipo de dano para sua escolha de ácido, frio, eletricidade, fogo ou sônico.",
  },
  {
    name: "",
    actionType: "one",
    traits: ["Concentrate"],
    effect: "Em sua próxima tentativa de Golpe de longo alcance com _Ghosthand's Comet_, o tiro passa por qualquer obstáculo material ou mágico, como uma _parede de força_, em seu caminho, ignorando toda cobertura. Você deve tentar o Golpe até o final do turno ou esse efeito será perdido. **Destruição** Se o Grim Reaper matar o portador do _Ghosthand's Comet_, a foice do Reaper, ao desferir o golpe mortal, estará destinada a cortar a arma estelar ao meio.",
  },
    ],
  },
  "Glasses Of Sociability": {
    description: "Armação de arame e lentes redondas para evitar constrangimento em festas. +1 de item em Diplomacia.\n\n**Ativar—Já nos conhecemos?** 1 ação (concentrar)\n**Efeito** Você stare at another criatura and instantly remember their name if você've met and exchanged names. The glasses rely on seu latent memories, so if the criatura is disguising their identity, the glasses don't penetrate the disguise. For example, if a divoynik was disguised as an innkeeper você met, the glasses would give você the innkeeper's name, and if a noble você met before was in disguise as a masked vigilante, the glasses wouldn't reveal their true name.",
    activations: [
  {
    name: "Já nos conhecemos?",
    actionType: "one",
    traits: ["Concentrate"],
    effect: "Você olha para outra criatura e se lembra instantaneamente do nome dela se você se conheceu e trocou nomes. Os óculos dependem de suas memórias latentes, portanto, se a criatura estiver disfarçando sua identidade, os óculos não penetram no disfarce. Por exemplo, se um divoynik estivesse disfarçado de estalajadeiro que você conheceu, os óculos lhe dariam o nome do estalajadeiro, e se um nobre que você conheceu antes estivesse disfarçado de vigilante mascarado, os óculos não revelariam seu verdadeiro nome.",
  },
    ],
  },
  "Globe of Shrouds": {
    description: "The body of this censer is made of transparent crystal banded with dark iron. This globe hangs from a sturdy chain attached to a simple steel rod with a smooth grip.\n\n**Ativar—Acender incenso** 2 ações (aura, manipular)\n**Frequência** 1 vez ao dia\n**Efeito** As você light the incense, barely visible smoke issues from the censer in a hazy 6 m emanation. Creatures that are in the haze or later enter it are wreathed in wisps of smoke; these wisps last while the criatura is in the smoke's aura and until the start of its next turno if it leaves the haze. An aliado in the aura is oculto and gains a +2 bônus de status em Furtividade testes. Any inimigo in the aura that is or becomes invisível appears as a translucent shape to você and seu aliados—it's no longer escondido, but it remains oculto.",
    activations: [
  {
    name: "Acender incenso",
    actionType: "two",
    traits: ["Aura","Manipulate"],
    frequency: "1 vez ao dia",
    effect: "Conforme você acende o incenso, uma fumaça quase invisível sai do incensário em uma emanação nebulosa de 6 m. As criaturas que estão na névoa ou depois entram nela estão envoltas em nuvens de fumaça; esses tufos duram enquanto a criatura estiver na aura da fumaça e até o início de seu próximo turno se ela sair da névoa. Um aliado na aura fica oculto e ganha +2 de bônus de status em Furtividade testes. Qualquer inimigo na aura que se torne invisível aparece como uma forma translúcida para você e seus aliados – não está mais escondido, mas permanece oculto.",
  },
    ],
  },
  "Gloom Blade": {
    description: "Na luz intensa: espada curta +1, aura mágica só aparece para detectar magia de 4º+. Na penumbra/escuridão: +2 impactante. Golpe contra criatura da qual você está não detectado: +1d6 de precisão.",
  },
  "Gloves of Precision": {
    description: "Luvas sem dedos que aguçam as mãos. +2 de item em Atletismo para Escalar e em Prestidigitação para Des\n\n**Ativar—Dedos ágeis** ação livre (destino, manipular)\n**Frequência** 1 vez ao dia\n**Gatilho** Você attempt a teste de perícia to Escalar, Disable a Device, or Pick a Lock\n**Efeito** Você roll the teste de perícia twice and take the better result.",
    activations: [
  {
    name: "Dedos ágeis",
    actionType: "free",
    traits: ["Fortune","Manipulate"],
    frequency: "1 vez ao dia",
    trigger: "Você tenta um teste de perícia para escalar, desativar um dispositivo ou abrir uma fechadura",
    effect: "Você rola o teste de perícia duas vezes e tira o melhor resultado.",
  },
    ],
  },
  "Gloves of Precision (Greater)": {
    description: "Luvas sem dedos que aguçam as mãos. +3 de item em Atletismo para Escalar e em Prestidigitação para Des\n\n**Ativar—Dedos ágeis** ação livre (destino, manipular)\n**Frequência** 1 vez ao dia\n**Gatilho** Você attempt a teste de perícia to Escalar, Disable a Device, or Pick a Lock\n**Efeito** Você roll the teste de perícia twice and take the better result.",
    activations: [
  {
    name: "Dedos ágeis",
    actionType: "free",
    traits: ["Fortune","Manipulate"],
    frequency: "1 vez ao dia",
    trigger: "Você tenta um teste de perícia para escalar, desativar um dispositivo ou abrir uma fechadura",
    effect: "Você rola o teste de perícia duas vezes e tira o melhor resultado.",
  },
    ],
  },
  "Godrending Ammunition": {
    description: "Munição com lasca de estilhaço de guerra: no impacto causa 10d8 cortante no lugar do dano normal; Fortitude CD 30 (−2 de circunstância se o Golpe foi crítico). Sucesso crítico: dano normal da munição; sucesso: metade; falha: dano total e enjoado 1; falha crítica: dano dobrado e enjoado 2. Quem cair a 0 PV por esse dano é desmembrado e morre na hora; o equipamento permanece.",
  },
  "Golden Greaves": {
    description: "Grevas de metal fendido revestido de ouro. +1 de item na CD de Fortitude contra movimento forçado e na CD de Reflexos contra efeitos que o derrubariam.\n\n**Ativar—Fazer cair** reação (concentrar, infortúnio)\n**Frequência** 1 vez ao dia\n**Gatilho** An inimigo fails to Reposition, Empurrar, or Derrubar você\n**Efeito** Seu _golden greaves_ glow with a strange light, and você move seu legs in just the right way to completely throw off seu opponent. Seu opponent instead critically fails on the triggering teste.",
    activations: [
  {
    name: "Fazer cair",
    actionType: "reaction",
    traits: ["Concentrate","Misfortune"],
    frequency: "1 vez ao dia",
    trigger: "An inimigo fails to Reposition, Empurrar, or Derrubar você",
    effect: "Suas _grevas douradas_ brilham com uma luz estranha, e você move as pernas da maneira certa para desvencilhar completamente o oponente. Em vez disso, seu oponente falha criticamente no teste de ativação.",
  },
    ],
  },
  "Golden Wings": {
    description: "This pair of huge wings is crafted from numerous feathers made of a lightweight, golden magical alloy. When activated, the wings emit a melodic sound and a shimmering glow.\n\n**Ativar—Voo assistido** 2 ações (manipular)\n**Frequência** 1 vez ao dia\n**Efeito** For the next 10 minutes, você pode Saltar 6 m, using the wings to propel yourself. Você deve land on a space with solid ground. For the duration, você also emit a bright light in a 6 m radius and dim light for the next 6 m. Você sofre a –2 penalidade de item to Furtividade testes to Esconder and Furtar-se.",
    activations: [
  {
    name: "Voo assistido",
    actionType: "two",
    traits: ["Manipulate"],
    frequency: "1 vez ao dia",
    effect: "Durante os próximos 10 minutos, você pode Saltar 6 m, usando as asas para se impulsionar. Você deve pousar em um espaço com solo sólido. Durante esse período, você também emite uma luz brilhante em um raio de 6 m e uma luz fraca nos próximos 6 m. Você sofre a –2 sorte de item para Furtividade testada para Esconder e Furtar-se.",
  },
    ],
  },
  "Golden Wings (Greater)": {
    description: "This pair of huge wings is crafted from numerous feathers made of a lightweight, golden magical alloy. When activated, the wings emit a melodic sound and a shimmering glow.\n\n**Ativar—Voo assistido** 2 ações (manipular)\n**Frequência** 1 vez ao dia\n**Efeito** For the next 10 minutes, você pode Saltar 6 m, using the wings to propel yourself. Você deve land on a space with solid ground. For the duration, você also emit a bright light in a 6 m radius and dim light for the next 6 m. Você sofre a –2 penalidade de item to Furtividade testes to Esconder and Furtar-se.",
    activations: [
  {
    name: "Voo assistido",
    actionType: "two",
    traits: ["Manipulate"],
    frequency: "1 vez ao dia",
    effect: "Durante os próximos 10 minutos, você pode Saltar 6 m, usando as asas para se impulsionar. Você deve pousar em um espaço com solo sólido. Durante esse período, você também emite uma luz brilhante em um raio de 6 m e uma luz fraca nos próximos 6 m. Você sofre a –2 sorte de item para Furtividade testada para Esconder e Furtar-se.",
  },
    ],
  },
  "Golden Wings (Major)": {
    description: "This pair of huge wings is crafted from numerous feathers made of a lightweight, golden magical alloy. When activated, the wings emit a melodic sound and a shimmering glow.\n\n**Ativar—Voo assistido** 2 ações (manipular)\n**Frequência** 1 vez ao dia\n**Efeito** For the next 10 minutes, você pode Saltar 6 m, using the wings to propel yourself. Você deve land on a space with solid ground. For the duration, você also emit a bright light in a 6 m radius and dim light for the next 6 m. Você sofre a –2 penalidade de item to Furtividade testes to Esconder and Furtar-se.",
    activations: [
  {
    name: "Voo assistido",
    actionType: "two",
    traits: ["Manipulate"],
    frequency: "1 vez ao dia",
    effect: "Durante os próximos 10 minutos, você pode Saltar 6 m, usando as asas para se impulsionar. Você deve pousar em um espaço com solo sólido. Durante esse período, você também emite uma luz brilhante em um raio de 6 m e uma luz fraca nos próximos 6 m. Você sofre a –2 sorte de item para Furtividade testada para Esconder e Furtar-se.",
  },
    ],
  },
  "Golden Wings (True)": {
    description: "This pair of huge wings is crafted from numerous feathers made of a lightweight, golden magical alloy. When activated, the wings emit a melodic sound and a shimmering glow.\n\n**Ativar—Voo assistido** 2 ações (manipular)\n**Frequência** 1 vez ao dia\n**Efeito** For the next 10 minutes, você pode Saltar 6 m, using the wings to propel yourself. Você deve land on a space with solid ground. For the duration, você also emit a bright light in a 6 m radius and dim light for the next 6 m. Você sofre a –2 penalidade de item to Furtividade testes to Esconder and Furtar-se.",
    activations: [
  {
    name: "Voo assistido",
    actionType: "two",
    traits: ["Manipulate"],
    frequency: "1 vez ao dia",
    effect: "Durante os próximos 10 minutos, você pode Saltar 6 m, usando as asas para se impulsionar. Você deve pousar em um espaço com solo sólido. Durante esse período, você também emite uma luz brilhante em um raio de 6 m e uma luz fraca nos próximos 6 m. Você sofre a –2 sorte de item para Furtividade testada para Esconder e Furtar-se.",
  },
    ],
  },
  "Golden-souled Yang Na": {
    description: "Tatuagem ampla nas costas ou ombros, tradição dos sacerdotes arboristas de Tang Mai em Tian Xia.\n\n**Ativar—Bênção da alma** ação livre (concentrar, rage)\n**Frequência** 1 vez ao dia\n**Gatilho** Você sofre an ação with the rage, stance, or tandem trait\n**Efeito** The tattoo purifies seu mind and body, reducing seu desajeitado, enfraquecido, amedrontado, or aturdido condition by 1. **Special** While você está under the effect of Rage, the Soul Blessing ação gains the rage trait.",
    activations: [
  {
    name: "Bênção da alma",
    actionType: "free",
    traits: ["Concentrate","Rage"],
    frequency: "1 vez ao dia",
    trigger: "Você sofre uma ação com raiva, postura ou traço tandem",
    effect: "A tatuagem purifica sua mente e corpo, reduzindo em 1 sua condição desajeitado, enfraquecido, amedrontado ou aturdido. **Especial** Enquanto você está sob o efeito de Fúria, a ação Soul Blessing ganha o traço de raiva.",
  },
    ],
  },
  "Gorget of the Primal Roar": {
    description: "Gorjal de madeira do crepúsculo. +2 em Intimidação. Em forma polimórfica não humanóide, um rugido pode amedrontar inimigos próximos.\n\n**Ativar—Rugido primordial** 1 ação (auditivo, concentrar, emoção, mental)\n**Frequência** once during the duration of each polymorph effect\n**Requisitos** Você're in a non-humanoid form via a polymorph effect\n**Efeito** Você unleash a bestial roar, attempting a single Intimidação teste compared to the Vontade DCs of all inimigos within 9 m to impose the effects below. **Sucesso crítico** The criatura is amedrontado 2 **Sucesso** The criatura is amedrontado 1 **Falha** The criatura is unaffected",
    activations: [
  {
    name: "Rugido primordial",
    actionType: "one",
    traits: ["Auditory","Concentrate","Emotion","Mental"],
    frequency: "uma vez durante a duração de cada efeito polimorfo",
    requirements: "Você está em uma forma não humanóide através de um efeito polimorfo",
    effect: "Você solta um rugido bestial, tentando um único teste de Intimidação comparado aos Vontade DCs de todos os inimigos num raio de 9 m para impor os efeitos abaixo. **Sucesso crítico** A criatura está amedrontada 2 **Sucesso** A criatura está amedrontada 1 **Falha** A criatura não é afetada",
  },
    ],
  },
  "Goz Mask": {
    description: "Máscara de madeira de sacerdotes de Gozreh, feita para o Olho de Abendego e ainda usada na Expansão Mwangi.\n\n**Ativar** 1 ação (manipular)\n**Frequência** 1 vez ao dia\n**Efeito** Você ignora concealment caused by fog, smoke, and other obscuring vapors por 1 minuto.",
    activations: [
  {
    name: "",
    actionType: "one",
    traits: ["Manipulate"],
    frequency: "1 vez ao dia",
    effect: "Você ignora a ocultação causada por neblina, fumaça e outros vapores obscurecedores por 1 minuto.",
  },
    ],
  },
  "Goz Mask (Greater)": {
    description: "Máscara de madeira de sacerdotes de Gozreh, feita para o Olho de Abendego e ainda usada na Expansão Mwangi.\n\n**Ativar** 1 ação (manipular)\n**Frequência** 1 vez ao dia\n**Efeito** Você ignora concealment caused by fog, smoke, and other obscuring vapors por 1 minuto.",
    activations: [
  {
    name: "",
    actionType: "one",
    traits: ["Manipulate"],
    frequency: "1 vez ao dia",
    effect: "Você ignora a ocultação causada por neblina, fumaça e outros vapores obscurecedores por 1 minuto.",
  },
    ],
  },
  "Goz Mask (Major)": {
    description: "Máscara de madeira de sacerdotes de Gozreh, feita para o Olho de Abendego e ainda usada na Expansão Mwangi.\n\n**Ativar** 1 ação (manipular)\n**Frequência** 1 vez ao dia\n**Efeito** Você ignora concealment caused by fog, smoke, and other obscuring vapors por 1 minuto.",
    activations: [
  {
    name: "",
    actionType: "one",
    traits: ["Manipulate"],
    frequency: "1 vez ao dia",
    effect: "Você ignora a ocultação causada por neblina, fumaça e outros vapores obscurecedores por 1 minuto.",
  },
    ],
  },
  "Grippy Gloves": {
    description: "Luvas de couro preto com costura prateada. +1 de item em Atletismo para Escalar, Agarrar e Reposicionar.\n\n**Ativar—Pegada grudenta** 1 ação (manipular)\n**Frequência** 1 vez ao dia\n**Requisitos** Você tem an inimigo agarrado or imobilizado\n**Efeito** Seu gloves help você squeeze even more tightly, keeping seu opponent from moving freely. The inimigo você tem agarrado or imobilizado is lento 1 por 1 rodada.",
    activations: [
  {
    name: "Pegada grudenta",
    actionType: "one",
    traits: ["Manipulate"],
    frequency: "1 vez ao dia",
    requirements: "Você tem an inimigo agarrado ou imobilizado",
    effect: "Suas luvas ajudam você a apertar ainda mais, evitando que seu oponente se mova livremente. O inimigo que você tem agarrado ou imobilizado é lento 1 por 1 rodada.",
  },
    ],
  },
  "Guangu of the Steppe": {
    description: "Tambor grande de madeira dura e couro de cavalo, silhuetas brancas de ginetes. +1 de item em Atuação ao tocar.\n\n**Ativar—O martelo dos cascos** 2 ações (auditivo, concentrar, manipular, movimento)\n**Frequência** 1 vez ao dia\n**Efeito** Você hammer a thundering beat on the guangu. For 10 minutes, mounted aliados within a 18 m emanation gain a +3 m bônus de status em their mount’s Speeds. They also gain a +1 bônus de status em Natureza testes to Command an Animal and automatically succeed when they Command an Animal they’re mounted on to take a move ação (such as Avançar).",
    activations: [
  {
    name: "O martelo dos cascos",
    actionType: "two",
    traits: ["Auditory","Concentrate","Manipulate","Move"],
    frequency: "1 vez ao dia",
    effect: "Você martela uma batida estrondosa no guangu. Por 10 minutos, aliados montados dentro de uma emanação de 18 m ganham +3 m de bônus de status nas Velocidades de sua montaria. Eles também ganham +1 bônus de status em Natureza testes para Comandar um Animal e automaticamente conseguem quando Comandam um Animal em que estão montados para realizar um movimento de ação (como Avançar).",
  },
    ],
  },
  "Guise of the Smirking Devil": {
    description: "Meia-máscara azul-gelo com sorriso de prata. +2 de item em Intimidação.\n\n**Ativar—Lamento hediondo** 2 ações (concentrar, manipular)\n**Frequência** 1 vez ao dia\n**Efeito** The mask emits a soul-chilling scream that deals 6d10 dano do vazio to each criatura viva in a 6 m emanation (CD 25 Fortitude básico save).",
    activations: [
  {
    name: "Lamento hediondo",
    actionType: "two",
    traits: ["Concentrate","Manipulate"],
    frequency: "1 vez ao dia",
    effect: "A máscara emite um grito arrepiante que causa 6d10 dano do vazio a cada criatura viva em uma emanação de 6 m (CD 25 Fortitude básico save).",
  },
    ],
  },
  "Guise of the Smirking Devil (Greater)": {
    description: "This ice-blue half-mask is adorned with a wicked silver grin that covers only the wearer's mouth. Você ganha +2 bônus de item em Intimidação testes. The bônus de item em Intimidação is +3. Activating a _greater guise of the smirking devil_ casts _wails of the damned_ (CD 41), affecting all criatura vivas in the area.\n\n**Ativar—Lamento hediondo** 2 ações (concentrar, manipular)\n**Frequência** 1 vez ao dia\n**Efeito** The mask emits a soul-chilling scream that deals 6d10 dano do vazio to each criatura viva in a 6 m emanation (CD 25 Fortitude básico save).",
    activations: [
  {
    name: "Lamento hediondo",
    actionType: "two",
    traits: ["Concentrate","Manipulate"],
    frequency: "1 vez ao dia",
    effect: "A máscara emite um grito arrepiante que causa 6d10 dano do vazio a cada criatura viva em uma emanação de 6 m (CD 25 Fortitude básico save).",
  },
    ],
  },
  "Hat Of Many Minds": {
    description: "Chapéu pontudo de retalhos coloridos, sempre um pouco torto. +2 de item para Ganhar Renda, pois ajuda no trabalho tedioso.\n\n**Ativar—Sósia de retalhos** 3 ações (concentrar, manipular)\n**Frequência** 1 vez ao dia\n**Efeito** Você tear off a patch of cloth to manifest it into a copy of yourself, dressed in seu normal clothes, though they resemble the color and fabric of the patch. The copy follows seu specific instructions and performs a single, straightforward task for up to 30 minutes. It takes the copy three times as long to complete the task as it would você, meaning it can perform a task that would take você a maximum of 10 minutes. It doesn’t react quickly enough to be of any use during an encounter, and it can’t use seu magias or other special abilities—just basic ações and skill ações. The copy disappears and returns to the hat as a piece of cloth when the given task has been completed or when você Dismiss Patchwork Double.",
    activations: [
  {
    name: "Sósia de retalhos",
    actionType: "three",
    traits: ["Concentrate","Manipulate"],
    frequency: "1 vez ao dia",
    effect: "Você rasga um pedaço de pano para transformá-lo em uma cópia de si mesmo, vestido com suas roupas normais, embora elas se assemelhem à cor e ao tecido do pedaço. A cópia segue instruções específicas e executa uma tarefa única e direta por até 30 minutos. A cópia leva três vezes mais tempo para concluir a tarefa do que você levaria, o que significa que ela pode executar uma tarefa que levaria no máximo 10 minutos. Ele não reage rápido o suficiente para ser útil durante um encontro e não pode usar suas magias ou outras habilidades especiais – apenas ações básicas e ações de habilidade. A cópia desaparece e retorna ao chapéu como um pedaço de pano quando a tarefa determinada é concluída ou quando você Dispensa Patchwork Double.",
  },
    ],
  },
  "Headbands of Translocation": {
    description: "Par de faixas de seda. Se ambos investirem ao mesmo tempo pensando no mesmo símbolo, as duas mostram esse símbolo. Com ambas investidas, podem Ajudar sem ação de preparar; falha crítica em Ajudar vira falha.\n\n**Ativar** 1 ação (manipular)\n**Frequência** 1 vez ao dia\n**Efeito** Você remove seu headband, which teleports você to a space adjacent to the other Invested wearer's location, provided você está within 1,6 km of each other.",
    activations: [
  {
    name: "",
    actionType: "one",
    traits: ["Manipulate"],
    frequency: "1 vez ao dia",
    effect: "Você remove sua faixa de cabeça, que o teletransporta para um espaço adjacente à localização do outro usuário investido, desde que você esteja a 1,6 km um do outro.",
  },
    ],
  },
  "Headwrap of Wisdom": {
    description: "Faixa simples com alfinete cravejado. Ao investir, o modificador de Sabedoria sobe em 1 ou vai a +4, o que for maior. Ativações: augúrio 1 vez ao dia; 1 vez por hora, rerrolar falha contra confuso, fascinado ou estupefato (fortuna).\n\n**Ativar—Pesar as consequências** 1 ação (concentrar)\n**Frequência** 1 vez ao dia\n**Efeito** When você está considering a course of ação, você get a gut feeling about whether it's a good idea. Você ganha the effects of an _augury_ magia, except that você receive the result from seu own instincts rather than an external source.\n\n**Ativar—Reclamar a mente** reação (concentrar, destino)\n**Frequência** 1 vez por hora\n**Gatilho** Você fail a salvaguarda against an effect that makes você confuso, fascinado, or aturdido\n**Efeito** The _headwrap of wisdom_ clears seu mind. Você pode reroll the salvaguarda and use the better result.",
    activations: [
  {
    name: "Pesar as consequências",
    actionType: "one",
    traits: ["Concentrate"],
    frequency: "1 vez ao dia",
    effect: "Quando você está considerando um curso de ação, você tem um pressentimento sobre se é uma boa ideia. Você obtém os efeitos de uma magia de _augúrio_, exceto que você recebe o resultado de seus próprios instintos e não de uma fonte externa.",
  },
  {
    name: "Reclamar a mente",
    actionType: "reaction",
    traits: ["Concentrate","Fortune"],
    frequency: "1 vez por hora",
    trigger: "Você falha na proteção contra um efeito que o deixa confuso, fascinado ou aturdido",
    effect: "O _envoltório de sabedoria_ limpa sua mente. Você pode rolar novamente a segurança e usar o melhor resultado.",
  },
    ],
  },
  "Healer": {
    description: "These clean, white gloves never show signs of blood, even after they're used to stitch up wounds or treat other ailments. They give você a +1 bônus de item em Medicina testes.\n\n**Ativar—Toque do curandeiro** 1 ação (manipular)\n**Frequência** 1 vez ao dia\n**Efeito** Você soothe the wounds of a willing, living, adjacent criatura, restoring 2d6+7 PV to that criatura. This is a healing vitality effect. Você não pode harm undead with this healing.",
    activations: [
  {
    name: "Toque do curandeiro",
    actionType: "one",
    traits: ["Manipulate"],
    frequency: "1 vez ao dia",
    effect: "Você acalma as feridas de uma criatura adjacente, viva e disposta, restaurando 2d6+7 PV para aquela criatura. Este é um efeito curativo de vitalidade. Você não pode prejudicar mortos-vivos com esta cura.",
  },
    ],
  },
  "Healer's Gloves": {
    description: "These clean, white gloves never show signs of blood, even after they're used to stitch up wounds or treat other ailments. They give você a +1 bônus de item em Medicina testes.\n\n**Ativar—Toque do curandeiro** 1 ação (manipular)\n**Frequência** 1 vez ao dia\n**Efeito** Você soothe the wounds of a willing, living, adjacent criatura, restoring 2d6+7 PV to that criatura. This is a healing vitality effect. Você não pode harm undead with this healing.",
    activations: [
  {
    name: "Toque do curandeiro",
    actionType: "one",
    traits: ["Manipulate"],
    frequency: "1 vez ao dia",
    effect: "Você acalma as feridas de uma criatura adjacente, viva e disposta, restaurando 2d6+7 PV para aquela criatura. Este é um efeito curativo de vitalidade. Você não pode prejudicar mortos-vivos com esta cura.",
  },
    ],
  },
  "Healer's Gloves (Greater)": {
    description: "These clean, white gloves never show signs of blood, even after they're used to stitch up wounds or treat other ailments. They give você a +1 bônus de item em Medicina testes. The gloves provide a +2 bônus and restore 4d6+15 PV.\n\n**Ativar—Toque do curandeiro** 1 ação (manipular)\n**Frequência** 1 vez ao dia\n**Efeito** Você soothe the wounds of a willing, living, adjacent criatura, restoring 2d6+7 PV to that criatura. This is a healing vitality effect. Você não pode harm undead with this healing.",
    activations: [
  {
    name: "Toque do curandeiro",
    actionType: "one",
    traits: ["Manipulate"],
    frequency: "1 vez ao dia",
    effect: "Você acalma as feridas de uma criatura adjacente, viva e disposta, restaurando 2d6+7 PV para aquela criatura. Este é um efeito curativo de vitalidade. Você não pode prejudicar mortos-vivos com esta cura.",
  },
    ],
  },
  "Hellfire Boots": {
    description: "Botas de metal negro com brasas. Resistência 10 a fogo. 1 vez por minuto, o rastro vira chamas infernais.\n\n**Ativar—Dança do diabo** 2 ações (manipular)\n**Frequência** 1 vez por minuto\n**Efeito** Você Avançar. Each square você move through during seu Avançar is scorched with hellish flames, becoming hazardous terrain por 1 minuto. A criatura that moves through one of these spaces takes 3d6 dano de fogo.",
    activations: [
  {
    name: "Dança do diabo",
    actionType: "two",
    traits: ["Manipulate"],
    frequency: "1 vez por minuto",
    effect: "Você Avançar. Cada quadrado que você percorrer durante seu Avançar será queimado por chamas infernais, tornando-se um terreno perigoso por 1 minuto. Uma criatura que se mova por um desses espaços sofre 3d6 de dano de fogo.",
  },
    ],
  },
  "Helm of the Tides": {
    description: "Elmo prateado hidrodinâmico, ondas gravadas. +2 de item em Atletismo para Nadar.\n\n**Ativar—Erguer a maré** 2 ações (manipular)\n**Frequência** 1 vez ao dia\n**Efeito** Você conjura _control water_. Se você cast it at night, the magia’s area becomes 30 m long by 30 m wide.",
    activations: [
  {
    name: "Erguer a maré",
    actionType: "two",
    traits: ["Manipulate"],
    frequency: "1 vez ao dia",
    effect: "Você conjura _controlar a água_. Se você lançar à noite, a área da magia passa a ter 30 m de comprimento por 30 m de largura.",
  },
    ],
  },
  "Helm of Zeal": {
    description: "Elmo com símbolos de uma deidade. +2 na perícia divina dela. 1 ponto de foco de devoção 1 vez ao dia; reação extra de campeão 1 vez ao dia.\n\n**Ativar—Reagrupar à causa** ação livre (concentrar)\n**Frequência** 1 vez ao dia\n**Efeito** Você ganha 1 ponto de foco, que você só pode gastar para conjurar a devotion magia. Se você don't spend this ponto de foco by the end of this turno, it's lost.\n\n**Ativar—Fervor divino** ação livre (concentrar)\n**Frequência** 1 vez ao dia\n**Gatilho** Você've just used seu champion's reação\n**Efeito** Você ganha um additional reação você pode use only for seu champion's reação. Você lose this reação if você don't use it by the start of seu next turno.",
    activations: [
  {
    name: "Reagrupar à causa",
    actionType: "free",
    traits: ["Concentrate"],
    frequency: "1 vez ao dia",
    effect: "Você ganha 1 ponto de foco, que você só pode gastar para conjurar uma magia de devoção. Se você não passar esse ponto de foco até o final desse turno, ele está perdido.",
  },
  {
    name: "Fervor divino",
    actionType: "free",
    traits: ["Concentrate"],
    frequency: "1 vez ao dia",
    trigger: "Você've just used seu champion's reação",
    effect: "Você ganha uma evidência adicional que você pode usar apenas para a evidência do seu campeão. Você perde essa ocorrência se não usá-la até o início do próximo turno.",
  },
    ],
  },
  "Helm of Zeal (Greater)": {
    description: "+3 na perícia divina da deidade. Ponto de foco de devoção 1 vez ao dia; reação extra de campeão 1 vez por hora.\n\n**Ativar—Reagrupar à causa** ação livre (concentrar)\n**Frequência** 1 vez ao dia\n**Efeito** Você ganha 1 ponto de foco, que você só pode gastar para conjurar a devotion magia. Se você don't spend this ponto de foco by the end of this turno, it's lost.\n\n**Ativar—Fervor divino** ação livre (concentrar)\n**Frequência** 1 vez ao dia\n**Gatilho** Você've just used seu champion's reação\n**Efeito** Você ganha um additional reação você pode use only for seu champion's reação. Você lose this reação if você don't use it by the start of seu next turno.",
    activations: [
  {
    name: "Reagrupar à causa",
    actionType: "free",
    traits: ["Concentrate"],
    frequency: "1 vez ao dia",
    effect: "Você ganha 1 ponto de foco, que você só pode gastar para conjurar uma magia de devoção. Se você não passar esse ponto de foco até o final desse turno, ele está perdido.",
  },
  {
    name: "Fervor divino",
    actionType: "free",
    traits: ["Concentrate"],
    frequency: "1 vez ao dia",
    trigger: "Você've just used seu champion's reação",
    effect: "Você ganha uma evidência adicional que você pode usar apenas para a evidência do seu campeão. Você perde essa ocorrência se não usá-la até o início do próximo turno.",
  },
    ],
  },
  "Herd Mask": {
    description: "All _herd masks_ are linked to at least one other _herd mask_ and are usually sold in sets of multiple masks. Linked _herd masks_ look like one another, with only the slightest of differences to tell them apart.\n\n**Ativar** 1 ação (concentrar)\n**Frequência** 1 vez ao dia\n**Efeito** Você swap locations with another criatura wearing a linked _herd mask_ within 30 m. Se você and the criatura você swapped with are disguised as each other, other criaturas gain an immediate Percepção teste against the lower of seu or the other wearer's Enganação DCs to Impersonate each other. On a failure, they don't realize the swap occurred.",
    activations: [
  {
    name: "",
    actionType: "one",
    traits: ["Concentrate"],
    frequency: "1 vez ao dia",
    effect: "Você troca de local com outra criatura usando uma _máscara de rebanho_ vinculada em um raio de 30 m. Se você e a criatura com a qual você trocou estiverem disfarçados um do outro, outras criaturas ganham um teste de Percepção imediato contra a parte inferior dos CDs de Enganação do seu ou do outro usuário para se passarem um pelo outro. Em caso de falha, eles não percebem que a troca ocorreu.",
  },
    ],
  },
  "Hexing Jar": {
    description: "Pote de terra num cordão. Após a bruxa investir e dormir com ele, algo minúsculo cresce (escolha do patrono). +2 de item na perícia do patrono.\n\n**Ativar** ação livre (concentrar, hex)\n**Frequência** 1 vez ao dia\n**Efeito** Você ganha 1 ponto de foco, which você pode use only to cast a witch hex magia. If not used by the end of seu turno, this ponto de foco is lost.\n\n**Ativar** reação (concentrar, mental)\n**Frequência** 1 vez por hora\n**Gatilho** Você roll a critical success on an rolagem de ataque with a witch magia, or seu alvo rolls a critical failure on its salvaguarda against a witch magia or hex você cast\n**Efeito** The thing in the jar becomes more energetic—glowing, dancing, rapping on the glass, or some other ação appropriate to its appearance. It encourages você até o início do seu próximo turno, granting você and seu familiar a +1 bônus de status em AC and salvaguardas and a +2 bônus de status against mental effects.",
    activations: [
  {
    name: "",
    actionType: "free",
    traits: ["Concentrate","Hex"],
    frequency: "1 vez ao dia",
    effect: "Você ganha 1 ponto de foco, que você pode usar apenas para lançar uma magia hexadecimal de bruxa. Se não for utilizado até o final do seu turno, esse ponto de foco será perdido.",
  },
  {
    name: "",
    actionType: "reaction",
    traits: ["Concentrate","Mental"],
    frequency: "1 vez por hora",
    trigger: "Você obtém um sucesso crítico em uma rolagem de ataque com uma magia de bruxa, ou seu alvo rola uma falha crítica em uma proteção contra uma magia de bruxa ou um feitiço que você lança",
    effect: "A coisa na jarra fica mais enérgica – brilhando, dançando, batendo no vidro ou alguma outra ação apropriada à sua aparência. Ele incentiva você até o início do seu próximo turno, concedendo a você e seu familiar +1 bônus de status em CA e salvaguardas e +2 bônus de status contra efeitos mentais.",
  },
    ],
  },
  "Hexwise Banner": {
    description: "Estandarte de fios multicoloridos, roxo ou verde conforme a luz (afixado ou empunhado). Você e aliados na emanação do estandarte ganham resistência 5 a dano de magias; em magias com várias instâncias (como barragem de força), vale só na primeira.",
  },
  "Hexwise Banner (Major)": {
    description: "Estandarte de fios multicoloridos, roxo ou verde conforme a luz (afixado ou empunhado). Você e aliados na emanação do estandarte ganham resistência 10 a dano de magias; em magias com várias instâncias (como barragem de força), vale só na primeira.",
  },
  "Hidden Pocket Outfit": {
    description: "Roupa com bolsos para esconder pacotes de sangue e itens minúsculos. Vestida, você passa automaticamente nos testes para ocultar esses itens contra inspeção casual.",
  },
  "Holy Steam Ball": {
    description: "Bola oca de borracha preta com dois tubos nas narinas; vapor de água benta evaporada e incenso. Recarga: 5 minutos.\n\n**Ativar** 1 ação (manipular, fiend)\n**Requisitos** The _holy steam ball_ is filled with evaporated _holy water_ and incense smoke\n**Efeito** Você release the stored steam and smoke to concedem a vocêrself its protections. Each use of the _holy steam ball_ lasts por 1 hora and gives você a +2 bônus de item em Vontade salvaguardas against possession effects from fiend and undead and effects from fiends and undead that cause the controlado condition.",
    activations: [
  {
    name: "",
    actionType: "one",
    traits: ["Manipulate","Fiend"],
    requirements: "A _bola de vapor sagrado_ está cheia de _água benta_ evaporada e fumaça de incenso",
    effect: "Você libera o vapor e a fumaça armazenados para conceder a você mesmo suas proteções. Cada uso da _bola de vapor sagrado_ dura 1 hora e dá a você +2 bônus de item em Vontade salvaguardas contra efeitos de posse de demônios e mortos-vivos e efeitos de demônios e mortos-vivos que causam a condição controlada.",
  },
    ],
  },
  "Homeward Swallow": {
    description: "This small tattoo of a swallow always points toward seu home. The tattooing must take place at a location você consider to be seu home, or the magic fails to bind with the ink. When você travel to seu home using teleportation that can be off alvo, such as _teleport_ or _interplanar teleport_, você arrive exactly at seu home. Se vocêr home is destroyed or você come to believe a new place is seu home, this tattoo fades from seu skin.\n\n**Ativar** 1 ação (concentrar)\n**Efeito** Você sense the direction toward seu home.",
    activations: [
  {
    name: "",
    actionType: "one",
    traits: ["Concentrate"],
    effect: "Você sente a direção de sua casa.",
  },
    ],
  },
  "Horn of Exorcism": {
    description: "Trompa de chifre, madeira ou marfim. Assusta espíritos e mortos-vivos, e pode espalhar sementes sagradas que tornam golpes eficazes contra incorpóreos.\n\n**Ativar—Abalar os mortos** 1 ação (auditivo, manipular)\n**Frequência** 1 vez por hora\n**Efeito** Blowing into the horn frightens ghosts and evil spirits who can hear its call. Make an Intimidação teste to Demoralize against all criaturas with the undead or unholy trait in a 9 m emanation. This can affect even a mindless criatura with that trait, and você don't take a penalidade when você attempt to Demoralize a criatura that doesn't understand seu language.\n\n**Ativar—Sementes sagradas** 2 ações (manipular)\n**Frequência** 1 vez ao dia\n**Efeito** Você fill the horn with sacred seeds and then scatter them around você with a twist of seu wrist. The horn concede a você and seu aliados in a 9 m emanation the ghost touch property rune on all of seu arma and unarmed Golpes por 1 minuto.",
    activations: [
  {
    name: "Abalar os mortos",
    actionType: "one",
    traits: ["Auditory","Manipulate"],
    frequency: "1 vez por hora",
    effect: "Tocar a buzina assusta fantasmas e espíritos malignos que podem ouvir seu chamado. Faça um teste de Intimidação para Desmoralizar contra todas as criaturas com traço morto-vivo ou profano em uma emanação de 9 meses. Isso pode afetar até mesmo uma criatura estúpida com essa característica, e você não hesitará ao tentar desmoralizar uma criatura que não entende sua linguagem.",
  },
  {
    name: "Sementes sagradas",
    actionType: "two",
    traits: ["Manipulate"],
    frequency: "1 vez ao dia",
    effect: "Você enche o chifre com sementes sagradas e depois espalha-as ao seu redor com um giro do pulso. A buzina concede a você e seus aliados em uma emanação de 9 m a runa de propriedade do toque fantasma em todos os seus Golpes armados e desarmados por 1 minuto.",
  },
    ],
  },
  "Horn of the Archon": {
    description: "Trombeta de ouro e marfim luminosos, brilho suave. +2 de item em Atuação ao tocar.\n\n**Ativar—Nota do arconte** 1 ação (auditivo, incapacitation, manipular)\n**Frequência** 1 vez ao dia\n**Efeito** Você blast a note on the horn so clear and pure that its grandeur stuns seu inimigos and inspires seu aliados. Allies in the area gain a +1 bônus de status em rolagem de ataques and salvaguardas por 1 rodada. Enemies within a 18 m emanation deve fazer um teste CD 35 Fortitude salvaguarda. They’re then temporarily immune for 1 day. **Sucesso crítico** The criatura is unaffected. **Sucesso** The criatura is desprevenido por 1 rodada. **Falha** The criatura is atordoado 1 and desprevenido por 1 rodada. **Falha crítica** The criatura is atordoado 2 and desprevenido por 1 rodada.",
    activations: [
  {
    name: "Nota do arconte",
    actionType: "one",
    traits: ["Auditory","Incapacitation","Manipulate"],
    frequency: "1 vez ao dia",
    effect: "Você toca uma nota tão clara e pura na buzina que sua grandiosidade surpreende seus inimigos e inspira seus aliados. Aliados na área ganham +1 de bônus de status em rolagem de ataques e salvaguardas por 1 rodada. Inimigos dentro de uma emanação de 18 meses devem fazer um teste CD 35 Fortitude salvaguarda. Eles ficam temporariamente imunes por 1 dia. **Sucesso crítico** A criatura não é afetada. **Sucesso** A criatura é desprevenida por 1 rodada. **Falha** A criatura está atordoada 1 e desprevenida por 1 rodada. **Falha crítica** A criatura está atordoada 2 e desprevenida por 1 rodada.",
  },
    ],
  },
  "Horrid Figurine": {
    description: "Estatueta de jade pútrido, humanóide inchado de vermes e serpentes. Até 2 vezes ao dia; na terceira, dissolve em cola pútrida e você fica enjoado 3.\n\n**Ativar** 2 ações (concentrar, manipular)\n**Efeito** Holding the figurine over seu head and speaking one command word causes a wave of nausea in a 6 m emanation. Each criatura in the emanation deve passar num teste CD 24 salvaguarda de Fortitude or become enjoado 2. Você're immune to this effect.\n\n**Ativar** 2 ações (concentrar, manipular)\n**Efeito** Holding the figurine over seu head and speaking a different command word causes those around to tremble in fear. Each criatura in a 6 m emanation deve passar num teste CD 24 salvaguarda de Vontade or become amedrontado 3. Você're immune to this effect.",
    activations: [
  {
    name: "",
    actionType: "two",
    traits: ["Concentrate","Manipulate"],
    effect: "Segurar a estatueta sobre sua cabeça e falar uma palavra de comando causa uma onda de náusea em uma emanação de 6 meses. Cada criatura na emanação deve passar num teste CD 24 de salvaguarda de Fortitude ou tornar-se enjoado 2. Você está imune a este efeito.",
  },
  {
    name: "",
    actionType: "two",
    traits: ["Concentrate","Manipulate"],
    effect: "Segurar a estatueta sobre a cabeça e falar uma palavra de comando diferente faz com que as pessoas ao redor tremam de medo. Cada criatura em uma emanação de 6 meses deve passar num teste CD 24 de salvaguarda de Vontade ou tornar-se amedrontado 3. Você está imune a este efeito.",
  },
    ],
  },
  "Horrific Effigy": {
    description: "Ídolo blasfemo com contorno de humanóide recumbente; quanto mais se percebe, mais alienígena. Causa sonhos perturbadores: quem dormir a 15 m faz Vontade CD 30 ou acorda fatigado.\n\n**Ativar—Sussurros de Leng** (auditivo, manipular)\n**Frequência** 1 vez ao dia\n**Efeito** Você whisper a name and whatever details você recall about that person to the effigy, telling it everything você pode about seu alvo. The next time o alvo sleeps, they are subject to a _nightmare_ magia (CD 30). This continues every time o alvo sleeps until they die, você whisper a new alvo to the effigy, or o alvo gets a critical success on their save against the _nightmare_.\n\n**Ativar—Lassidão sufocante** 2 ações (concentrar, manipular, visual)\n**Frequência** 1 vez ao dia\n**Efeito** Você brandish the effigy aloft, exposing all who see it to its bizarre visage. Você and all criaturas within a 36 m emanation deve fazer um teste CD 34 salvaguarda de Vontade. **Sucesso crítico** The criatura is unaffected. **Sucesso** The criatura is aturdido 1 até o início do seu próximo turno. **Falha** The criatura is aturdido 1 and atordoado 1 até o início do seu próximo turno. **Falha crítica** The criatura is aturdido 2 and atordoado 1 até o início do seu próximo turno.",
    activations: [
  {
    name: "Sussurros de Leng",
    traits: ["Auditory","Manipulate"],
    frequency: "1 vez ao dia",
    effect: "Você sussurra um nome e todos os detalhes que você lembra sobre essa pessoa para a efígie, contando tudo o que você puder sobre seu alvo. Na próxima vez que o alvo dormir, ele estará sujeito a uma magia de _pesadelo_ (CD 30). Isso continua toda vez que o alvo dorme até morrer, você sussurra um novo alvo para a efígie ou o alvo obtém um sucesso crítico ao salvar contra o _pesadelo_.",
  },
  {
    name: "Lassidão sufocante",
    actionType: "two",
    traits: ["Concentrate","Manipulate","Visual"],
    frequency: "1 vez ao dia",
    effect: "Você brandir a efígie no alto, expondo a todos que a vêem sua aparência bizarra. Você e todas as criaturas dentro de uma emanação de 36 meses devem fazer um teste CD 34 segurança de Vontade. **Sucesso crítico** A criatura não é afetada. **Sucesso** A criatura é aturdida 1 até o início do seu próximo turno. **Falha** A criatura está aturdida 1 e atordoada 1 até o início do seu próximo turno. **Falha crítica** A criatura está aturdida 2 e atordoada 1 até o início do seu próximo turno.",
  },
    ],
  },
  "Humbug Pocket": {
    description: "Bolso de seda no cinto ou roupa. +2 em Sociedade e para Ocultar objeto nele. Produz material de falsificação e, 1 vez por hora, um documento temporário.\n\n**Ativar—Documentos, por favor** 1 ação (concentrar, manipular)\n**Frequência** 1 vez por hora\n**Efeito** Você create a temporary forgery by imagining the document você need and pulling it from the pocket. Attempt to Create a Forgery of the document você desire, with the GM rolling the teste secreto as normal. Its quality is based on seu teste, but the document disintegrates after 1 hour.",
    activations: [
  {
    name: "Documentos, por favor",
    actionType: "one",
    traits: ["Concentrate","Manipulate"],
    frequency: "1 vez por hora",
    effect: "Você cria uma falsificação temporária imaginando o documento que precisa e tirando-o do bolso. Tente criar uma falsificação do documento que você deseja, com o GM rolando o teste secreto normalmente. Sua qualidade é baseada no seu teste, mas o documento se desintegra após 1 hora.",
  },
    ],
  },
  "Humbug Pocket (Greater)": {
    description: "Versão maior: +3 em Sociedade e até 5 documentos temporários por\n\n**Ativar—Documentos, por favor** 1 ação (concentrar, manipular)\n**Frequência** 1 vez por hora\n**Efeito** Você create a temporary forgery by imagining the document você need and pulling it from the pocket. Attempt to Create a Forgery of the document você desire, with the GM rolling the teste secreto as normal. Its quality is based on seu teste, but the document disintegrates after 1 hour.",
    activations: [
  {
    name: "Documentos, por favor",
    actionType: "one",
    traits: ["Concentrate","Manipulate"],
    frequency: "1 vez por hora",
    effect: "Você cria uma falsificação temporária imaginando o documento que precisa e tirando-o do bolso. Tente criar uma falsificação do documento que você deseja, com o GM rolando o teste secreto normalmente. Sua qualidade é baseada no seu teste, mas o documento se desintegra após 1 hora.",
  },
    ],
  },
  "Hungry Lantern": {
    description: "Lanterna de estanho gasto, fria e úmida. O interior, onde iria o pavio, está cheio de fumaça negra; não há como abri-la.\n\n**Ativar—Escuridão devoradora** 3 ações (concentrar, darkness, death, manipular, spirit)\n**Frequência** 1 vez por semana\n**Efeito** Pure, impenetrable darkness flows out of the lantern like smoke and simply eats the light. A 18 m emanation centered on the lantern is plunged into darkness por 1 minuto. This darkness functions as a 4º posto _darkness_ magia. When the darkness is created, it deals 6d8 dano espiritual (CD 30 Fortitude básico save) to all criaturas within the area. Any criatura reduced to 0 PV from this dano is destroyed entirely, leaving behind only a shadow that will slowly fade over the course of a year.",
    activations: [
  {
    name: "Escuridão devoradora",
    actionType: "three",
    traits: ["Concentrate","Darkness","Death","Manipulate","Spirit"],
    frequency: "1 vez por semana",
    effect: "A escuridão pura e impenetrável flui da lanterna como fumaça e simplesmente devora a luz. Uma emanação de 18 m centrada na lanterna mergulha na escuridão por 1 minuto. Esta escuridão funciona como uma magia do 4º posto _darkness_. Quando a escuridão é criada, ela causa 6d8 dano espiritual (CD 30 Fortitude básico save) a todas as criaturas dentro da área. Qualquer criatura reduzida a 0 PV por este dano é totalmente destruída, deixando para trás apenas uma sombra que desaparecerá lentamente ao longo de um ano.",
  },
    ],
  },
  "Hunter": {
    description: "A _hunter's arrowhead_ is meant to be worn as a charm, such as a pendant, or carried in a pocket or quiver. The arrowhead is etched with images sacred to the elven god Ketephys. While você wear or carry the arrowhead, it infuses você with great skill at hunting, and você ganha a +1 bônus de item em Sobrevivência testes and rolagem de ataques against any criatura você've currently designated as seu prey with Hunt Prey. A _hunter's arrowhead_ is also a religious symbol of Ketephys.\n\n**Ativar** reação (concentrar)\n**Frequência** 1 vez ao dia\n**Gatilho** Você would miss with an attack made with a bow\n**Efeito** Você ganha +2 bônus de circunstância em seu rolagem de ataque, possibly turning a miss into a hit.",
    activations: [
  {
    name: "",
    actionType: "reaction",
    traits: ["Concentrate"],
    frequency: "1 vez ao dia",
    trigger: "Você erraria com um ataque feito com arco",
    effect: "Você ganha +2 bônus de circunstância em seu rolagem de ataque, possibly turning a miss into a hit.",
  },
    ],
  },
  "Hunter's Anthem": {
    description: "Arco longo +2 impactante, corda de prata da aurora. Com Caçar Presa, Golpes contra a presa ganham a runa trovejante.\n\n**Ativar—Canção do arco** 2 ações (concentrar)\n**Frequência** 1 vez ao dia\n**Efeito** Você shoot an arrow thrumming with the song of the bow. Faça um Golpe with the bow that deals dano as normal. As long as the Golpe isn't a critical failure, the arrow explodes in a 6 m emanation around seu alvo, dealing 5d10 dano sônico to criaturas in the area, including o alvo, with a CD 28 Fortitude básico save. Any criatura that critically fails is surdo por 1 minuto. If any criatura in the area is indetectado or unnoticed by você, você learn its location, making it escondido to você instead.",
    activations: [
  {
    name: "Canção do arco",
    actionType: "two",
    traits: ["Concentrate"],
    frequency: "1 vez ao dia",
    effect: "Você atira uma flecha vibrando com o canto do arco. Faça um Golpe com o arco que causa dano normalmente. Contanto que o Golpe não seja uma falha crítica, a flecha explode em uma emanação de 6 m ao redor de seu alvo, causando 5d10 de dano sônico às criaturas na área, incluindo o alvo, com um salvamento básico de Fortitude CD 28. Qualquer criatura que falhe criticamente é surda por 1 minuto. Se alguma criatura na área for indetectada ou despercebida por você, você saberá sua localização, tornando-a escondida para você.",
  },
    ],
  },
  "Hunter's Arrowhead": {
    description: "Ponta de flecha com imagens sagradas de Ketephys, usada como amuleto. Também é símbolo religioso dele. +1 de item em Sobrevivência e nas jogadas de ataque contra a presa atual de Caçar Presa.\n\n**Ativar** reação (concentrar)\n**Frequência** 1 vez ao dia\n**Gatilho** Você would miss with an attack made with a bow\n**Efeito** Você ganha +2 bônus de circunstância em seu rolagem de ataque, possibly turning a miss into a hit.",
    activations: [
  {
    name: "",
    actionType: "reaction",
    traits: ["Concentrate"],
    frequency: "1 vez ao dia",
    trigger: "Você erraria com um ataque feito com arco",
    effect: "Você ganha +2 bônus de circunstância em seu rolagem de ataque, possibly turning a miss into a hit.",
  },
    ],
  },
  "Hydration Cloak": {
    description: "Capa de escamas turquesa que absorve umidade. Após 1 hora submersa, criaturas aquáticas (como azarketis) ficam fora da água até 1 semana sem penalidades; depois precisa submergir de novo.\n\n**Ativar—Puxar capuz** 2 ações (manipular)\n**Frequência** 1 vez ao dia\n**Efeito** Você puxa the cloak’s hood up and gain the effects of a 2º posto _water walk_ until você pull the hood down, to a maximum of 10 minutes.",
    activations: [
  {
    name: "Puxar capuz",
    actionType: "two",
    traits: ["Manipulate"],
    frequency: "1 vez ao dia",
    effect: "Você puxa o capuz da capa para cima e ganha os efeitos de um 2º posto _caminhada na água_ até puxar o capuz para baixo, no máximo por 10 minutos.",
  },
    ],
  },
  "Ice Gliders": {
    description: "Botas bordadas dos artesãos Varki. Ignora terreno irregular ou difícil de neve e gelo. Ao Avançar no gelo, move 3 m para cada 1,5 m gasto, com lâminas de gelo nas solas.\n\n**Ativar—Gelo irregular** 1 ação (concentrar)\n**Frequência** 1 vez ao dia\n**Efeito** Você stomp seu foot on the ground, creating a 3 m emanation of jagged ice on the ground that lasts por 1 minuto before melting. This ice is terreno difícil.",
    activations: [
  {
    name: "Gelo irregular",
    actionType: "one",
    traits: ["Concentrate"],
    frequency: "1 vez ao dia",
    effect: "Você bate o pé no chão, criando uma emanação de 3 m de gelo irregular no chão que dura 1 minuto antes de derreter. Este gelo é terreno difícil.",
  },
    ],
  },
  "Ice Gliders (Greater)": {
    description: "Botas bordadas dos artesãos Varki. Ignora terreno irregular ou difícil de neve e gelo. Ao Avançar no gelo, move 3 m para cada 1,5 m gasto.\n\n**Ativar—Gelo irregular** 1 ação (concentrar)\n**Frequência** 1 vez ao dia\n**Efeito** Você stomp seu foot on the ground, creating a 3 m emanation of jagged ice on the ground that lasts por 1 minuto before melting. This ice is terreno difícil.",
    activations: [
  {
    name: "Gelo irregular",
    actionType: "one",
    traits: ["Concentrate"],
    frequency: "1 vez ao dia",
    effect: "Você bate o pé no chão, criando uma emanação de 3 m de gelo irregular no chão que dura 1 minuto antes de derreter. Este gelo é terreno difícil.",
  },
    ],
  },
  "Icicle": {
    description: "Lança longa +2 impactante maior geada maior, um único gelo. Apaga fogos não mágicos em 6 m; resistência 5 a fogo.\n\n**Ativar—Extinguir chamas** 2 ações (concentrar, manipular)\n**Efeito** Você swing the _icicle_ into the area of an ongoing magical fire, and the spear attempts to counteract the fire with a counteract modifier of +27. If it fails, it can't attempt to counteract the same fire again.\n\n**Ativar—Espeto de gelo** 2 ações (concentrar, manipular)\n**Frequência** 1 vez ao dia\n**Efeito** The _icicle_ grows rapidly, piercing criaturas in a 9 m line. Each criatura in the area takes 11d6 dano de frio with a CD 35 salvaguarda de Reflexos. A criatura that fails its save also takes 3d6 dano persistente de sangramento(double on a critical failure).",
    activations: [
  {
    name: "Extinguir chamas",
    actionType: "two",
    traits: ["Concentrate","Manipulate"],
    effect: "Você balança o pingente de gelo na área de um fogo mágico contínuo e a lança tenta neutralizar o fogo com um modificador de contra-ataque de +27. Se falhar, não poderá tentar neutralizar o mesmo fogo novamente.",
  },
  {
    name: "Espeto de gelo",
    actionType: "two",
    traits: ["Concentrate","Manipulate"],
    frequency: "1 vez ao dia",
    effect: "O _icicle_ cresce rapidamente, perfurando criaturas em uma linha de 9 m. Cada criatura na área sofre 11d6 de dano de frio com um CD 35 de salvaguarda de Reflexos. Uma criatura que falhe no teste também sofre 3d6 de dano persistente de sangramento (o dobro em uma falha crítica).",
  },
    ],
  },
  "Illusory Program": {
    description: "Folheto com ilusões minúsculas nas páginas (cena ou elenco). Abrir revela o espetáculo em miniatura por 1 minuto; depois o encanto se esgota.",
  },
  "Impenetrable Scale": {
    description: "Cota de escamas de adamantina grau padrão +2 resiliente maior fortificação. Quando a fortificação converte crítico de inimigo relevante em acerto, uma escama fica violeta: resistência a dano físico igual ao número de escamas (máx. 8). Ao amanhecer, voltam ao normal.",
  },
  "Indestructible Shield": {
    description: "Escudo de adamantina grau alto reforço maior. Só sofre dano de desintegrar (como criatura que falhou) ou artefato de destruição.",
  },
  "Inexplicable Apparatus": {
    description: "Arnês com braços-ferramenta. +3 em Ofício para Fabricar, Ganhar sustento e Reparar, fabricação mais rápida, e remendo mágico 1 vez ao dia.\n\n**Ativar—Remendo inexplicável** 3 ações (concentrar, manipular)\n**Frequência** 1 vez ao dia\n**Efeito** Você command the apparatus to magically jury-rig an item você hold or that's within 1,5 m of você. The item is repaired, as a 3º posto _mending_ magia. This lasts por 10 minutos, after which the item returns to its previous state of disrepair unless você've Repaired it before then.",
    activations: [
  {
    name: "Remendo inexplicável",
    actionType: "three",
    traits: ["Concentrate","Manipulate"],
    frequency: "1 vez ao dia",
    effect: "Você comanda o aparelho para manipular magicamente um item que você segura ou que está a 1,5 m de você. O item é reparado, como 3º posto _emenda_ magia. Isso dura 10 minutos, após os quais o item retorna ao estado anterior de degradação, a menos que você o tenha reparado antes disso.",
  },
    ],
  },
  "Instinct Crown": {
    description: "Diadema mágica ligada a um instinto de bárbaro (cabeça de lobo para animal, elmo com runas Jotun para gigante). Só ativa se você puder usar Fúria; combina melhor se o instinto coincidir.\n\n**Ativar** ação livre (concentrar)\n**Frequência** 1 vez ao dia\n**Gatilho** Você roll iniciativa\n**Requisitos** Você tem Quick-Tempered and meet its requirements\n**Efeito** Você use Quick-Tempered and gain 10 additional PV temporários from seu Rage.\n\n**Ativar** 1 ação (concentrar, rage, deadly, destino)\n**Frequência** 1 vez ao dia\n**Requisitos** Você’re raging, and the crown’s instinct matches seu barbarian instinct\n**Efeito** Você draw upon seu instinct to gain a boon, as follows. _Animal:_ Seu bestial instincts take over, granting você greater ferocity. Você pode Avançar as part of the activation, and você ganha 10 additional PV temporários from seu rage. Until the end of seu rage, você deal 3 additional dano with seu animal’s unarmed attacks, and those unarmed attacks gain the deadly d8 trait. _Dragon:_ The might of dragons surrounds você in the form of dancing flames, poisonous wisps, or another appropriate manifestation. Until the end of seu rage, adjacent criaturas that hit você with a melee attack, além de criaturas that touch você or hit você with an unarmed attack, take 2d6 dano cada vez que they do. The dano type is that of seu instinct’s dragon breath. _Fury:_ Seu boundless fury allows você push past seu natural limits, moving with unmatched speed. Você fica acelerado until the end of seu rage. Você pode use seu extra ação only to Avançar or Golpe. _Giant:_ If você tem the space to do so and aren’t already, você become Large. Seu equipment grows with você but returns to its natural size if removed. Increase seu reach by 1,5 m (or by 3 m if você were Tiny). Você deal 2 additional dano when using seu larger arma. Also, when você Avançar along the ground, você pode shatter the earth with seu footfalls, and any squares você move through become terreno difícil. Você ignora the terreno difícil você create. The ground reverts to normal when seu rage ends. _Spirit:_ Você sofre on the partial form of a spirit, becoming somewhat incorporeal. Seu raging resistência applies to all physical dano and dano de veneno, although você halve this resistência against magical attacks. _Superstition:_ Seu body fights off the effects of magic with even greater effect. Until the end of seu rage, when você attempt a salvaguarda against magic, roll twice and take the higher result. This is a fortune effect. Also, seu raging resistência applies to all magic traditions while você rage.",
    activations: [
  {
    name: "",
    actionType: "free",
    traits: ["Concentrate"],
    frequency: "1 vez ao dia",
    trigger: "Você roll iniciativa",
    requirements: "Você tem temperamento explosivo e atende aos seus requisitos",
    effect: "Você usa Quick-Tempered e ganha 10 PV adicionais temporários de seu Rage.",
  },
  {
    name: "",
    actionType: "one",
    traits: ["Concentrate","Rage","Deadly","Fortune"],
    frequency: "1 vez ao dia",
    requirements: "Você está furioso, e o instinto da coroa corresponde ao seu instinto bárbaro",
    effect: "Você recorre ao seu instinto para obter uma vantagem, como segue. _Animal:_ Seus instintos bestiais assumem o controle, garantindo a você maior ferocidade. Você pode Avançar como parte da ativação e ganha 10 PV adicionais temporários de sua raiva. Até o final de sua raiva, você causa 3 danos adicionais com o ataque desarmado de seu animal, e esses ataques desarmados ganham o traço mortal d8. _Dragão:_ O poder dos dragões envolve você na forma de chamas dançantes, fogos venenosos ou outra manifestação apropriada. Até o final de sua fúria, as criaturas adjacentes que atingirem você com um ataque corpo a corpo, além das criaturas que tocarem você ou atingirem você com um ataque desarmado, sofrerão 2d6 de dano cada vez que o fizerem. O tipo dano é o sopro de dragão do seu instinto. _Fúria:_ Sua fúria sem limites permite que você ultrapasse seus limites naturais, movendo-se com velocidade incomparável. Você fica acelerado até o fim da sua raiva. Você pode usar sua ação extra apenas para Avançar ou Golpe. _Gigante:_ Se você tem espaço para fazer isso e ainda não tem, você se torna Grande. Seu equipamento cresce com você, mas volta ao tamanho natural se for removido. Aumente seu alcance em 1,5 m (ou em 3 m se você for Minúsculo). Você causa 2 danos adicionais ao usar sua arma maior. Além disso, quando você avança pelo chão, você pode quebrar a terra com seus passos, e qualquer quadrado que você percorrer se tornará um terreno difícil. Você ignora o terreno difícil que você cria. O chão volta ao normal quando sua raiva termina. _Espírito:_ Você sofre na forma parcial de espírito, tornando-se um tanto incorpóreo. Sua resistência furiosa se aplica a todos os danos físicos e danos de veneno, embora você reduza pela metade essa resistência contra ataques mágicos. _Superstição:_ Seu corpo combate os efeitos da magia com efeitos ainda maiores. Até o final de sua fúria, quando você tentar uma proteção contra magia, role duas vezes e obtenha o resultado mais alto. Este é um efeito de sorte. Além disso, sua resistência furiosa se aplica a todas as tradições mágicas enquanto você se enfurece.",
  },
    ],
  },
  "Instrument Harness": {
    description: "Arnês de couro branco com símbolos musicais dourados. Músicos de exército ainda precisam lutar. Prende até 3 Volume de instrumentos. Se soltar um instrumento preso, ele permanece ao lado em vez de cair.\n\n**Ativar—Pronto para jogar** ação livre (manipular)\n**Frequência** 1 vez ao dia\n**Requisitos** There is an instrument attached to the _instrument harness_ and você tem enough hands free to hold it\n**Efeito** Seu harness ripples, pulling the required instrument into seu hands. Você Interact to draw the required instrument, but this manipulate ação doesn’t trigger reactions.",
    activations: [
  {
    name: "Pronto para jogar",
    actionType: "free",
    traits: ["Manipulate"],
    frequency: "1 vez ao dia",
    requirements: "Há um instrumento conectado ao _arnês de instrumentos_ e você tem mãos livres o suficiente para segurá-lo",
    effect: "Seu arnês ondula, puxando o instrumento necessário em suas mãos. Você interage para desenhar o instrumento necessário, mas essa ação de manipulação não desencadeia reações.",
  },
    ],
  },
  "Jaathoom": {
    description: "This scarf is made of fine silk that's the same shade of blue as a clear, cloudless sky. The short ends are edged with a fine gold fringe that seems to sway even in still weather as though touched by invisível winds. The long edges have exquisite embroidery in threads that vary from a blue identical to the silk to the deep gray of storm clouds during winter. Wearing this scarf grants a +2 bônus de item em Atuação testes to dance and to Acrobacia testes to Escapar.\n\n**Ativar—Desvanecer** 2 ações (concentrar)\n**Frequência** 1 vez ao dia\n**Efeito** The scarf casts 4º posto _invisibility_ on você.\n\n**Ativar—Repreensão do jaathoom** 1 ação (concentrar, air)\n**Frequência** 1 vez por hora\n**Efeito** Você let the winds around você catch the edges of the _jaathoom's scarf_, and a jaathoom shuyookh appears with a sudden updraft. The winds force seu inimigos back, granting você some breathing room in battle. Each inimigo in a 3 m emanation deve passar num teste CD 27 salvaguarda de Fortitude or be pushed 3 m. A criatura that critically fails is also knocked caído after being moved. Creatures with the air trait are immune to all these effects.",
    activations: [
  {
    name: "Desvanecer",
    actionType: "two",
    traits: ["Concentrate"],
    frequency: "1 vez ao dia",
    effect: "O lenço lança o 4º posto _invisibilidade_ em você.",
  },
  {
    name: "Repreensão do jaathoom",
    actionType: "one",
    traits: ["Concentrate","Air"],
    frequency: "1 vez por hora",
    effect: "Você deixa os ventos ao seu redor pegarem as pontas do lenço do _jaathoom_, e um jaathoom shuyookh aparece com uma corrente ascendente repentina. Os ventos forçam seus inimigos a recuar, garantindo a você algum espaço para respirar na batalha. Cada inimigo em uma emanação de 3 meses deve passar num teste CD 27 salvaguarda de Fortitude ou ser empurrado 3 metros. Uma criatura que falha criticamente também é derrubada após ser movida. Criaturas com característica ar são imunes a todos esses efeitos.",
  },
    ],
  },
  "Jaathoom's Scarf": {
    description: "Seda azul-céu com franja dourada. +2 para dançar e Escapar. Invisibilidade de 4º posto 1 vez ao dia; empurrão de 10 pés (CD 27) 1 vez por hora.\n\n**Ativar—Desvanecer** 2 ações (concentrar)\n**Frequência** 1 vez ao dia\n**Efeito** The scarf casts 4º posto _invisibility_ on você.\n\n**Ativar—Repreensão do jaathoom** 1 ação (concentrar, air)\n**Frequência** 1 vez por hora\n**Efeito** Você let the winds around você catch the edges of the _jaathoom's scarf_, and a jaathoom shuyookh appears with a sudden updraft. The winds force seu inimigos back, granting você some breathing room in battle. Each inimigo in a 3 m emanation deve passar num teste CD 27 salvaguarda de Fortitude or be pushed 3 m. A criatura that critically fails is also knocked caído after being moved. Creatures with the air trait are immune to all these effects.",
    activations: [
  {
    name: "Desvanecer",
    actionType: "two",
    traits: ["Concentrate"],
    frequency: "1 vez ao dia",
    effect: "O lenço lança o 4º posto _invisibilidade_ em você.",
  },
  {
    name: "Repreensão do jaathoom",
    actionType: "one",
    traits: ["Concentrate","Air"],
    frequency: "1 vez por hora",
    effect: "Você deixa os ventos ao seu redor pegarem as pontas do lenço do _jaathoom_, e um jaathoom shuyookh aparece com uma corrente ascendente repentina. Os ventos forçam seus inimigos a recuar, garantindo a você algum espaço para respirar na batalha. Cada inimigo em uma emanação de 3 meses deve passar num teste CD 27 salvaguarda de Fortitude ou ser empurrado 3 metros. Uma criatura que falha criticamente também é derrubada após ser movida. Criaturas com característica ar são imunes a todos esses efeitos.",
  },
    ],
  },
  "Jabali": {
    description: "_Jabali's dice_ are two six-sided dice carved from evenly weighted stone to the specifications of a specific jabali shuyookh. The sides showing a 6 also have the name and title of the shuyookh inscribed in Petran. Se você whisper the name and title during a dice game using _jabali's dice_, they bless você with a bit of luck, granting a +2 bônus de item em seu Games Lore teste. Você pode do so frequently enough to apply this bônus while Earning Income using Games Lore, but only one user at a time can do so.\n\n**Ativar—Aposta do jabali** 2 ações (concentrar, manipular)\n**Frequência** 1 vez ao dia\n**Efeito** Você call out the shuyookh's name and title, then roll the dice. The shuyookh appears briefly to provide for seu defense. Roll 2d6 to determine the effect. Represented by the GM, the shuyookh chooses any effect's specifications, benefiting você according to the shuyookh's whims. **2–5** The shuyookh casts _mountain resilience_ on você. **6–9** The shuyookh casts _grasping earth_, but você and seu aliados are immune to it. **10–11** The shuyookh casts _wall of stone_. The edges can pass through criaturas, which are shunted to the side of the wall opposite that edge. **12** The shuyookh casts a CD 31 _petrify_ magia on a criatura hostile and in proximity to você. If no appealing alvo exists, você receive a 10–11 result instead.",
    activations: [
  {
    name: "Aposta do jabali",
    actionType: "two",
    traits: ["Concentrate","Manipulate"],
    frequency: "1 vez ao dia",
    effect: "Você chama o nome e o título do shuyookh e depois joga os dados. O shuyookh aparece brevemente para fornecer sua defesa. Role 2d6 para determinar o efeito. Representado pelo GM, o shuyookh escolhe qualquer especificação de efeito, beneficiando você de acordo com os caprichos do shuyookh. **2–5** O shuyookh lança _resiliência da montanha_ em você. **6–9** O shuyookh lança _grasping earth_, mas você e seus aliados são imunes a isso. **10–11** O shuyookh lança _parede de pedra_. As arestas podem passar por criaturas, que são desviadas para o lado da parede oposto a essa aresta. **12** O shuyookh lança uma magia CD 31 _petrify_ em uma criatura hostil e próxima a você. Se não existir nenhum alvo atraente, você receberá um resultado de 10–11.",
  },
    ],
  },
  "Jabali's Dice": {
    description: "Dois dados de seis faces em pedra, com o nome e o título de um shuyookh jabali no 6 (em Petrano). Sussurrar o nome e o título num jogo: +2 de item em Saber de Jogos. Dá para usar ao Ganhar Renda com Saber de Jogos, mas só um usuário por vez.\n\n**Ativar—Aposta do jabali** 2 ações (concentrar, manipular)\n**Frequência** 1 vez ao dia\n**Efeito** Você call out the shuyookh's name and title, then roll the dice. The shuyookh appears briefly to provide for seu defense. Roll 2d6 to determine the effect. Represented by the GM, the shuyookh chooses any effect's specifications, benefiting você according to the shuyookh's whims. **2–5** The shuyookh casts _mountain resilience_ on você. **6–9** The shuyookh casts _grasping earth_, but você and seu aliados are immune to it. **10–11** The shuyookh casts _wall of stone_. The edges can pass through criaturas, which are shunted to the side of the wall opposite that edge. **12** The shuyookh casts a CD 31 _petrify_ magia on a criatura hostile and in proximity to você. If no appealing alvo exists, você receive a 10–11 result instead.",
    activations: [
  {
    name: "Aposta do jabali",
    actionType: "two",
    traits: ["Concentrate","Manipulate"],
    frequency: "1 vez ao dia",
    effect: "Você chama o nome e o título do shuyookh e depois joga os dados. O shuyookh aparece brevemente para fornecer sua defesa. Role 2d6 para determinar o efeito. Representado pelo GM, o shuyookh escolhe qualquer especificação de efeito, beneficiando você de acordo com os caprichos do shuyookh. **2–5** O shuyookh lança _resiliência da montanha_ em você. **6–9** O shuyookh lança _grasping earth_, mas você e seus aliados são imunes a isso. **10–11** O shuyookh lança _parede de pedra_. As arestas podem passar por criaturas, que são desviadas para o lado da parede oposto a essa aresta. **12** O shuyookh lança uma magia CD 31 _petrify_ em uma criatura hostil e próxima a você. Se não existir nenhum alvo atraente, você receberá um resultado de 10–11.",
  },
    ],
  },
  "Jann": {
    description: "Light always seems to be refracting through this simple prism, creating a hazy multicolor aura that surrounds the glass. When exposed to direct sunlight, the prism radiates a beam of light that shifts in color. This beam magias out the name of the jann shuyookh for whom the prism was designed. While holding the prism to seu eye, seu vision becomes overwhelmed with colors that guide seu eye, granting você a +2 bônus de item em visual Percepção testes. Se você look through the prism while você Procurar, você pode scan or search an area twice as large as normal (a 18 m cone, 9 m burst, or 6 m square) as the varying colors help você distinguish between seu surroundings.\n\n**Ativar—Luz do jann** 2 ações (concentrar, fire, acid, electricity, poison, sonic, mental, force)\n**Frequência** 1 vez ao dia\n**Efeito** Você raise the prism above seu head and call upon the jann shuyookh to come to seu aid. The shuyookh's face becomes visible in a reflection in the prism and light shines out from the prism, surrounding você in a multitude of colors. For 1 minute, você shed bright light in a 6 m emanation (and dim light for the next 6 m). The light coruscates with two colors chosen by the jann, and você ganha resistência 5 to two dano types based on the colors chosen: **red** fire, **orange** acid, **yellow** electricity, **green** poison, **blue** sonic, **indigo** mental, or **violet** force.",
    activations: [
  {
    name: "Luz do jann",
    actionType: "two",
    traits: ["Concentrate","Fire","Acid","Electricity","Poison","Sonic","Mental","Force"],
    frequency: "1 vez ao dia",
    effect: "Você levanta o prisma acima de sua cabeça e chama Jann Shuyookh para vir em seu auxílio. O rosto do shuyookh torna-se visível em um reflexo no prisma e a luz brilha do prisma, envolvendo você em uma infinidade de cores. Por 1 minuto, você emite luz brilhante em uma emanação de 6 m (e luz fraca nos próximos 6 m). A luz brilha com duas cores escolhidas pelo jann, e você ganha resistência de 5 a dois tipos de dano com base nas cores escolhidas: **vermelho** fogo, **laranja** ácido, **amarelo** eletricidade, **verde** veneno, **azul** sônico, **índigo** mental ou **violeta** força.",
  },
    ],
  },
  "Jann's Prism": {
    description: "Prisma simples que sempre parece refratar luz, com aura multicolorida. Sob luz solar direta, um feixe soletra o nome do shuyookh jann para quem o prisma foi feito. Olhando pelo prisma: +2 de item em Percepção visual. Se Procurar olhando por ele, varre o dobro da área normal (cone de 18 m, explosão de 9 m ou quadrado de 6 m).\n\n**Ativar—Luz do jann** 2 ações (concentrar, fire, acid, electricity, poison, sonic, mental, force)\n**Frequência** 1 vez ao dia\n**Efeito** Você raise the prism above seu head and call upon the jann shuyookh to come to seu aid. The shuyookh's face becomes visible in a reflection in the prism and light shines out from the prism, surrounding você in a multitude of colors. For 1 minute, você shed bright light in a 6 m emanation (and dim light for the next 6 m). The light coruscates with two colors chosen by the jann, and você ganha resistência 5 to two dano types based on the colors chosen: **red** fire, **orange** acid, **yellow** electricity, **green** poison, **blue** sonic, **indigo** mental, or **violet** force.",
    activations: [
  {
    name: "Luz do jann",
    actionType: "two",
    traits: ["Concentrate","Fire","Acid","Electricity","Poison","Sonic","Mental","Force"],
    frequency: "1 vez ao dia",
    effect: "Você levanta o prisma acima de sua cabeça e chama Jann Shuyookh para vir em seu auxílio. O rosto do shuyookh torna-se visível em um reflexo no prisma e a luz brilha do prisma, envolvendo você em uma infinidade de cores. Por 1 minuto, você emite luz brilhante em uma emanação de 6 m (e luz fraca nos próximos 6 m). A luz brilha com duas cores escolhidas pelo jann, e você ganha resistência de 5 a dois tipos de dano com base nas cores escolhidas: **vermelho** fogo, **laranja** ácido, **amarelo** eletricidade, **verde** veneno, **azul** sônico, **índigo** mental ou **violeta** força.",
  },
    ],
  },
  "Jar Of Shifting Sands": {
    description: "Pote de cerâmica com cerca de 1 litro de areia; ao despejar, conjura mais.\n\n**Ativar—Avalanche de areia** 1 ação (manipular)\n**Efeito** Você cause sand to pour out of the jar at a rate of 1 gallon per rodada. This doesn’t end until the cap is placed back on the jar as an Interact ação.\n\n**Ativar—Derramar areia** 2 ações (concentrar, manipular)\n**Efeito** Você quickly pour sand over an adjacent square, making it terreno difícil. Você pode’t use either of the jar’s activations por 1 minuto.",
    activations: [
  {
    name: "Avalanche de areia",
    actionType: "one",
    traits: ["Manipulate"],
    effect: "Você faz com que a areia saia da jarra a uma taxa de 1 galão por rodada. Isso não termina até que a tampa seja colocada de volta no frasco como uma ação Interagir.",
  },
  {
    name: "Derramar areia",
    actionType: "two",
    traits: ["Concentrate","Manipulate"],
    effect: "Você rapidamente despeja areia sobre um quadrado adjacente, tornando-o um terreno difícil. Você não pode usar nenhuma das ativações do jar por 1 minuto.",
  },
    ],
  },
  "Jaws of the Grogrisant": {
    description: "Diadema régio feito dos dentes caídos do Manto do Grogrisant pelas casas Fahlspar, Lotheed, Nicodemius e Zespire. +3 de item em Diplomacia, Intimidação e Perceber Motivação contra criaturas de traço primordial; ao investir, Sabedoria +1 ou sobe a +4.\n\n**Ativar—Empatia primordial** 2 ações (concentrar, mental, primal)\n**Frequência** 1 vez por hora\n**Efeito** Você ganha the ability to communicate with nature as if você were a part of it. Você conjura _telepathy_ at 6th rank, which can only be used to communicate with criaturas that have the primal trait.",
    activations: [
  {
    name: "Empatia primordial",
    actionType: "two",
    traits: ["Concentrate","Mental","Primal"],
    frequency: "1 vez por hora",
    effect: "Você ganha a capacidade de se comunicar com a natureza como se fizesse parte dela. Você conjura _telepatia_ no 6º posto, que só pode ser usada para se comunicar com criaturas que possuem o traço primal.",
  },
    ],
  },
  "Jorngarl's Harm": {
    description: "Machado grande desproporcional forjado pelo gigante da geada Jorngarl a partir da lâmina final Toothy Morris; emite riso gélido ao ceifar. Funciona como machado grande +3 impactante máxima vorpal que prende almas: quem morre não volta à vida senão por intervenção divina, nem por desejo ou magia similar.",
  },
  "Jug of Fond Remembrance": {
    description: "Jarro que sempre tem um gole da bebida favorita para dividir. Empunhado, +1 de circunstância em Diplomacia. Compartilhar um gole: +2 de circunstância no próximo teste de Diplomacia para Causar Impressão ou Pedir àquela criatura no mês seguinte.\n\n**Ativar** 1 ação (manipular)\n**Frequência** 1 vez por hora\n**Efeito** Você sofre a long swig on the jug and depois Recordar Conhecimento about a criatura você pode see, with a +2 bônus de circunstância em the teste. Se você falhar but don't critically fail this teste, você get a success instead. Você're then aturdido 1 for 3 rodadas.",
    activations: [
  {
    name: "",
    actionType: "one",
    traits: ["Manipulate"],
    frequency: "1 vez por hora",
    effect: "Você toma um longo gole na jarra e depois registra conhecimento sobre uma criatura que você pode ver, com +2 bônus de circunstância no teste. Se você falhar, mas não falhar criticamente neste teste, você terá sucesso. Você está então aturdido 1 por 3 rodadas.",
  },
    ],
  },
  "Keep Stone Amulet": {
    description: "Amuleto de liga adamantina-chumbo (pedra da fortaleza), em geral do tamanho da palma, com símbolos de clã. Se magia com traço detecção ou vidência visar você, o conjurador precisa de teste simples CD 5 ou perde a magia.\n\n**Ativar—Rechaçar magia** reação (concentrar, infortúnio)\n**Frequência** 1 vez ao dia\n**Gatilho** Você’re o alvo of a magia with a ataque de magia roll\n**Efeito** The caster must roll the ataque de magia roll twice and take the worse result.",
    activations: [
  {
    name: "Rechaçar magia",
    actionType: "reaction",
    traits: ["Concentrate","Misfortune"],
    frequency: "1 vez ao dia",
    trigger: "Você é o alvo de uma magia com um ataque de magia roll",
    effect: "O conjurador deve fazer o teste de ataque de magia duas vezes e obter o pior resultado.",
  },
    ],
  },
  "Keymaking Tools": {
    description: "Kit de ladrão que mantém controle sobre a fechadura. +1 de item em Prestidigitação para Abrir fechadura. Ao abrir por completo uma fechadura com este kit, produz uma cópia temporária da chave, presa por corrente de prata, que tranca e destranca como a original por 12 horas. Só uma chave por vez; criar outra substitui a anterior.",
  },
  "Killer’s Belt": {
    description: "Cinto de couro preto com rubis vermelho-sangue. +1 de item em Intimidação.\n\n**Ativar—Rubis sangrentos** 1 ação (manipular)\n**Frequência** 1 vez ao dia\n**Requisitos** Você tem a free hand and seu last ação was to deal dano to an inimigo with a Golpe or ataque de magia roll\n**Efeito** Você puxa a ruby off seu belt and crush it into dust. As this dust reaches the inimigo você just harmed, it embeds into the skin, causing them to bleed. O alvo takes 1d6 dano persistente de sangramento. The ruby reappears on the belt after 24 hours.",
    activations: [
  {
    name: "Rubis sangrentos",
    actionType: "one",
    traits: ["Manipulate"],
    frequency: "1 vez ao dia",
    requirements: "Você tem a mão livre e sua última ação foi causar dano a um inimigo com um Golpe ou ataque de magia roll",
    effect: "Você tira um rubi de seu cinto e o transforma em pó. À medida que essa poeira atinge o inimigo que você acabou de ferir, ela se fixa na pele, fazendo-os sangrar. O alvo leva 1d6 de dano persistente de sangramento. O rubi reaparece no cinto após 24 horas.",
  },
    ],
  },
  "Killer’s Belt (Greater)": {
    description: "Cinto de couro preto com rubis vermelho-sangue. +2 de item em Intimidação.\n\n**Ativar—Rubis sangrentos** 1 ação (manipular)\n**Frequência** 1 vez ao dia\n**Requisitos** Você tem a free hand and seu last ação was to deal dano to an inimigo with a Golpe or ataque de magia roll\n**Efeito** Você puxa a ruby off seu belt and crush it into dust. As this dust reaches the inimigo você just harmed, it embeds into the skin, causing them to bleed. O alvo takes 1d6 dano persistente de sangramento. The ruby reappears on the belt after 24 hours.",
    activations: [
  {
    name: "Rubis sangrentos",
    actionType: "one",
    traits: ["Manipulate"],
    frequency: "1 vez ao dia",
    requirements: "Você tem a mão livre e sua última ação foi causar dano a um inimigo com um Golpe ou ataque de magia roll",
    effect: "Você tira um rubi de seu cinto e o transforma em pó. À medida que essa poeira atinge o inimigo que você acabou de ferir, ela se fixa na pele, fazendo-os sangrar. O alvo leva 1d6 de dano persistente de sangramento. O rubi reaparece no cinto após 24 horas.",
  },
    ],
  },
  "Kimanéz Luminescent Toadstool": {
    description: "This large blue toadstool glimmers with soft, magical light similar to moonlight. The spots of white adorning the mushroom’s cap glow ethereally, as if illuminated from the inside, shedding dim light in a 3 m radius.\n\n**Ativar—Proteger área** (concentrar, light, manipular)\n**Efeito** Você plant the toadstool in the ground, allowing it to connect to all living fungi and plant matter within 36 m of its planting. For 8 hours, any corporeal criatura that touches the affected matter even accidentally begins to glow with bright magical light in a 3 m emanation, which persists enquanto they remain within 36 m of the planted mushroom. A criatura can move through an area containing affected fungi and plant matter without touching it by treating the area as terreno difícil and succeeding at a CD 18 Acrobacia teste.",
    activations: [
  {
    name: "Proteger área",
    traits: ["Concentrate","Light","Manipulate"],
    effect: "Você planta o cogumelo venenoso no solo, permitindo que ele se conecte a todos os fungos vivos e matéria vegetal em um raio de 36 m de seu plantio. Durante 8 horas, qualquer criatura corpórea que toque a matéria afetada, mesmo que acidentalmente, começa a brilhar com uma luz mágica brilhante em uma emanação de 3 m, que persiste enquanto permanecer a 36 m do cogumelo plantado. Uma criatura pode se mover através de uma área contendo fungos e matéria vegetal afetados sem tocá-la, tratando a área como terreno difícil e obtendo sucesso em um CD 18 Acrobacia teste.",
  },
    ],
  },
  "Kinetic Wraps of Strength": {
    description: "Faixas apertadas que reforçam os braços; escultores de Promise as usam para blocos de pedra. +2 de item em Atletismo para Forçar Abertura, Reposicionar e Empurrar.\n\n**Ativar—Explosão de poder** ação livre (destino, manipular)\n**Frequência** 1 vez ao dia\n**Gatilho** Você attempt an Atletismo teste to Force Open, Reposition, or Empurrar\n**Efeito** Você roll the teste de perícia twice and take the better result.",
    activations: [
  {
    name: "Explosão de poder",
    actionType: "free",
    traits: ["Fortune","Manipulate"],
    frequency: "1 vez ao dia",
    trigger: "Você tenta um teste do Atletismo para Forçar Abertura, Reposicionar ou Empurrar",
    effect: "Você rola o teste de perícia duas vezes e tira o melhor resultado.",
  },
    ],
  },
  "Kinetic Wraps of Strength (Greater)": {
    description: "Faixas apertadas que reforçam os braços; escultores de Promise as usam para blocos de pedra. +3 de item em Atletismo para Forçar Abertura, Reposicionar e Empurrar.\n\n**Ativar—Explosão de poder** ação livre (destino, manipular)\n**Frequência** 1 vez ao dia\n**Gatilho** Você attempt an Atletismo teste to Force Open, Reposition, or Empurrar\n**Efeito** Você roll the teste de perícia twice and take the better result.",
    activations: [
  {
    name: "Explosão de poder",
    actionType: "free",
    traits: ["Fortune","Manipulate"],
    frequency: "1 vez ao dia",
    trigger: "Você tenta um teste do Atletismo para Forçar Abertura, Reposicionar ou Empurrar",
    effect: "Você rola o teste de perícia duas vezes e tira o melhor resultado.",
  },
    ],
  },
  "Knave’s Standard": {
    description: "Estandarte em degradê irregular de preto a vermelho (afixado ou empunhado). Sempre que você ou aliado na emanação do estandarte obtém sucesso crítico num Golpe contra alvo desprevenido, +1d4 de precisão.",
  },
  "Knave’s Standard (Greater)": {
    description: "Estandarte em degradê irregular de preto a vermelho (afixado ou empunhado). Sempre que você ou aliado na emanação do estandarte obtém sucesso crítico num Golpe contra alvo desprevenido, +1d6 de precisão.",
  },
  "Knave’s Standard (Major)": {
    description: "Estandarte em degradê irregular de preto a vermelho (afixado ou empunhado). Sempre que você ou aliado na emanação do estandarte obtém sucesso crítico num Golpe contra alvo desprevenido, +1d8 de precisão.",
  },
  "Kols's Oath": {
    description: "Runa de filigrana na adaga de clã: +1 de item em Sociedade e em Diplomacia para Pedir favor.\n\n**Ativar—Voto inquebrantável** 1 ação (auditivo, concentrar, linguistic, mental)\n**Frequência** 1 vez ao dia\n**Efeito** Você command a criatura within 9 m to Avançar away from você, drop caído, or release one item it’s holding. The criatura can choose to perform that ação as the first ação on its next turno; if it doesn’t, it takes 4d6 dano mental (CD 20 Vontade básico save).",
    activations: [
  {
    name: "Voto inquebrantável",
    actionType: "one",
    traits: ["Auditory","Concentrate","Linguistic","Mental"],
    frequency: "1 vez ao dia",
    effect: "Você comanda uma criatura a até 9 m para avançar para longe de você, deixá-la cair ou liberar um item que ela esteja segurando. A criatura pode escolher realizar aquela ação como a primeira ação em seu próximo turno; caso contrário, serão necessários 4d6 de dano mental (CD 20 Vontade básico save).",
  },
    ],
  },
  "Kraken Figurehead": {
    description: "A knot of tentacles makes up the body of this figurehead. It's always slightly slimy and sticky to the touch. Superstitious sailors tend to avoid ships with this figurehead on the bow, claiming it's bad luck to flaunt a kraken's image while at sea.\n\n**Ativar—Açoite!** 2 ações (aura, concentrar)\n**Frequência** 1 vez por hora\n**Efeito** The effigy causes spectral tentacles to erupt from the ship's hull. These tentacles lash out in an emanation with a distance equal to the ship's length and remain active por 10 minutos. Creatures in the aura and in the same body of water as the ship take a –2 penalidade de circunstância to Atletismo testes to Nadar as the writhing tentacles lash out in all directions.\n\n**Ativar—Agarrem-nos!** 1 ação (ataque, concentrar, ataque)\n**Requisitos** The ship's spectral tentacles are activated\n**Efeito** The tentacles grab at an inimigo vessel in the aura. Attempt a piloting teste against o alvo vessel's AC. On a success, the tentacles grab hold and tether the two vessels together. While tethered, the ships can't move farther away from each other, criaturas aboard the inimigo vessel receive a –2 penalidade de circunstância to all piloting testes, and criaturas attempting to Board the inimigo vessel gain a +2 bônus de circunstância em any teste required to do so. Se você use this activation while the tentacles are already latched onto another ship, the tentacles instead pull that ship toward yours a distance up to half seu ship's deslocamento de natação with a success (or up to seu ship's full deslocamento de natação with a critical success). The pilot of the inimigo ship can faça um teste CD 27 piloting teste to break free as a single ação that has the attack trait. With a success, the ship frees itself from the tentacles.",
    activations: [
  {
    name: "Açoite!",
    actionType: "two",
    traits: ["Aura","Concentrate"],
    frequency: "1 vez por hora",
    effect: "A efígie faz com que tentáculos espectrais irrompam do casco da nave. Esses tentáculos lançam uma emanação com distância igual ao comprimento do navio e permanecem ativos por 10 minutos. Criaturas na aura e no mesmo corpo de água do navio recebem -2 de circunstâncias para Atletismo testa Nadar enquanto os tentáculos contorcidos atacam em todas as direções.",
  },
  {
    name: "Agarrem-nos!",
    actionType: "one",
    traits: ["Attack","Concentrate","Attack"],
    requirements: "Os tentáculos espectrais da nave são ativados",
    effect: "Os tentáculos agarram um navio inimigo na aura. Faça um teste de pilotagem contra o CA da embarcação alvo. Se obtiver sucesso, os tentáculos agarram e amarram os dois recipientes. Enquanto amarrados, os navios não podem se afastar um do outro, as criaturas a bordo do navio inimigo recebem um bônus de -2 de circunstância para todos os testes de pilotagem, e as criaturas que tentam embarcar no navio inimigo ganham um bônus de +2 de circunstância em qualquer teste necessário para fazê-lo. Se você usar esta ativação enquanto os tentáculos já estiverem travados em outro navio, os tentáculos puxarão esse navio em direção ao seu por uma distância de até metade da ocupação de natação de seu navio com sucesso (ou até a ocupação de natação completa de seu navio com sucesso crítico). O piloto da nave inimiga pode fazer um teste CD 27 pilotando teste para se libertar como uma única ação que possui a característica de ataque. Com sucesso, a nave se liberta dos tentáculos.",
  },
    ],
  },
  "Kraken Figurehead (Wracking)": {
    description: "A knot of tentacles makes up the body of this figurehead. It's always slightly slimy and sticky to the touch. Superstitious sailors tend to avoid ships with this figurehead on the bow, claiming it's bad luck to flaunt a kraken's image while at sea. The CD to break free of the tentacles is 31. When você use the figurehead's second activation to pull an inimigo ship, even if você didn't pull the ship any actual distance, você pode have the tentacles try to crack open its hull. The tentacles deal 7d10 dano de concussão to the inimigo vessel (CD 31 Fortitude básico save). Apply the ship's Hardness as normal.\n\n**Ativar—Açoite!** 2 ações (aura, concentrar)\n**Frequência** 1 vez por hora\n**Efeito** The effigy causes spectral tentacles to erupt from the ship's hull. These tentacles lash out in an emanation with a distance equal to the ship's length and remain active por 10 minutos. Creatures in the aura and in the same body of water as the ship take a –2 penalidade de circunstância to Atletismo testes to Nadar as the writhing tentacles lash out in all directions.\n\n**Ativar—Agarrem-nos!** 1 ação (ataque, concentrar, ataque)\n**Requisitos** The ship's spectral tentacles are activated\n**Efeito** The tentacles grab at an inimigo vessel in the aura. Attempt a piloting teste against o alvo vessel's AC. On a success, the tentacles grab hold and tether the two vessels together. While tethered, the ships can't move farther away from each other, criaturas aboard the inimigo vessel receive a –2 penalidade de circunstância to all piloting testes, and criaturas attempting to Board the inimigo vessel gain a +2 bônus de circunstância em any teste required to do so. Se você use this activation while the tentacles are already latched onto another ship, the tentacles instead pull that ship toward yours a distance up to half seu ship's deslocamento de natação with a success (or up to seu ship's full deslocamento de natação with a critical success). The pilot of the inimigo ship can faça um teste CD 27 piloting teste to break free as a single ação that has the attack trait. With a success, the ship frees itself from the tentacles.",
    activations: [
  {
    name: "Açoite!",
    actionType: "two",
    traits: ["Aura","Concentrate"],
    frequency: "1 vez por hora",
    effect: "A efígie faz com que tentáculos espectrais irrompam do casco da nave. Esses tentáculos lançam uma emanação com distância igual ao comprimento do navio e permanecem ativos por 10 minutos. Criaturas na aura e no mesmo corpo de água do navio recebem -2 de circunstâncias para Atletismo testa Nadar enquanto os tentáculos contorcidos atacam em todas as direções.",
  },
  {
    name: "Agarrem-nos!",
    actionType: "one",
    traits: ["Attack","Concentrate","Attack"],
    requirements: "Os tentáculos espectrais da nave são ativados",
    effect: "Os tentáculos agarram um navio inimigo na aura. Faça um teste de pilotagem contra o CA da embarcação alvo. Se obtiver sucesso, os tentáculos agarram e amarram os dois recipientes. Enquanto amarrados, os navios não podem se afastar um do outro, as criaturas a bordo do navio inimigo recebem um bônus de -2 de circunstância para todos os testes de pilotagem, e as criaturas que tentam embarcar no navio inimigo ganham um bônus de +2 de circunstância em qualquer teste necessário para fazê-lo. Se você usar esta ativação enquanto os tentáculos já estiverem travados em outro navio, os tentáculos puxarão esse navio em direção ao seu por uma distância de até metade da ocupação de natação de seu navio com sucesso (ou até a ocupação de natação completa de seu navio com sucesso crítico). O piloto da nave inimiga pode fazer um teste CD 27 pilotando teste para se libertar como uma única ação que possui a característica de ataque. Com sucesso, a nave se liberta dos tentáculos.",
  },
    ],
  },
  "Krasovnatype": {
    description: "Placa de vidro prateada carregada em bobina stasiana. Tocar a frente ou aproximar de um vivo: imprime a aura da criatura. Examinar a imagem: +1 de item em Recordar Conhecimento sobre ela na próxima hora.",
  },
  "Lambent Perfume": {
    description: "Queimador de íbis de três cabeças (Atreia) numa corrente de ouro.\n\n**Ativar—Acender incenso** 2 ações (aura, manipular)\n**Frequência** 1 vez ao dia\n**Efeito** Sparkling golden mist escapes the ibis's open beaks, spreading in a 6 m emanation. This perfume mist is calming and restorative. A criatura that ends its turno within the censer's smoke while enjoado or under an affliction can attempt a new salvaguarda to overcome it. A criatura with multiple afflictions, or that is both enjoado and has an affliction, chooses one to attempt to overcome cada vez que it ends its turno in the aura. After attempting a new salvaguarda against an affliction, a criatura is temporarily immune to _lambent perfume_ for the purpose of overcoming that affliction for 24 hours.",
    activations: [
  {
    name: "Acender incenso",
    actionType: "two",
    traits: ["Aura","Manipulate"],
    frequency: "1 vez ao dia",
    effect: "Uma névoa dourada cintilante escapa dos bicos abertos do íbis, espalhando-se numa emanação de 6 m. Esta névoa de perfume é calmante e restauradora. Uma criatura que termina seu turno dentro da fumaça do incensário enquanto está enjoada ou sob uma aflição pode tentar uma nova proteção para superá-la. Uma criatura com múltiplas aflições, ou que seja ao mesmo tempo enjoado e tenha uma aflição, escolhe uma para tentar superar cada vez que termina seu turno na aura. Depois de tentar uma nova proteção contra uma aflição, a criatura fica temporariamente imune ao _perfume lambente_ com o propósito de superar essa aflição por 24 horas.",
  },
    ],
  },
  "Laurel of the Empath": {
    description: "Argola de folhas prateadas. Na iniciativa com Percepção, role 2 vezes e fique com o maior (fortuna). Após 1 minuto conversando com criatura viva, sabe a atitude dela. Ao investir: Sabedoria +1 ou até +4.\n\n**Ativar** reação (concentrar)\n**Frequência** 1 vez por minuto\n**Gatilho** Você're hit by an attack\n**Efeito** Você sofre half dano from the triggering attack.\n\n**Ativar** reação (concentrar)\n**Frequência** 1 vez por hora\n**Gatilho** Você fail, but don't critically fail, a salvaguarda\n**Efeito** Você anticipate the danger and guard against it, often in unconventional or almost inconceivable ways. Treat the failed salvaguarda as a success.\n\n**Ativar** (concentrar, destino, mental)\n**Frequência** 1 vez ao dia\n**Efeito** Você spend 10 minutes talking with one criatura viva, conversing in inspirational, religious, or philosophical terms. Você ganha valuable insights into the personality of seu alvo—their hopes, dreams, and fears. When the ritual is over, você ganha a +4 bônus de item em all Percepção testes made concerning o alvo for one month. Also, o alvo gains inspirational insight, allowing o alvo to use one of the two reactions listed above once during the next 24 hours.",
    activations: [
  {
    name: "",
    actionType: "reaction",
    traits: ["Concentrate"],
    frequency: "1 vez por minuto",
    trigger: "Você está hit by an attack",
    effect: "Você sofre meio dano do ataque desencadeador.",
  },
  {
    name: "",
    actionType: "reaction",
    traits: ["Concentrate"],
    frequency: "1 vez por hora",
    trigger: "Você falha, mas não falha criticamente, uma segurança",
    effect: "Você antecipa o perigo e se protege contra ele, muitas vezes de maneiras não convencionais ou quase inconcebíveis. Trate a segurança fracassada como um sucesso.",
  },
  {
    name: "",
    traits: ["Concentrate","Fortune","Mental"],
    frequency: "1 vez ao dia",
    effect: "Você passa 10 minutos conversando com uma criatura viva, conversando em termos inspiradores, religiosos ou filosóficos. Você obtém informações valiosas sobre a personalidade do seu alvo – suas esperanças, sonhos e medos. Quando o ritual terminar, você ganha +4 de bônus de item em todos os testes de Percepção feitos em relação ao alvo durante um mês. Além disso, o alvo ganha uma visão inspiradora, permitindo que o alvo use uma das duas reações listadas acima uma vez durante as próximas 24 horas.",
  },
    ],
  },
  "Legerdemain Handkerchief": {
    description: "This frilled, silvery-gray handkerchief is a stylish tool for personal hygiene by all appearances, but it can be used to covertly make very small items vanish.\n\n**Ativar** 1 ação (manipular)\n**Requisitos** The handkerchief is entirely covering an item of negligible Volume\n**Efeito** The handkerchief transports the item it covers into its extradimensional space. The handkerchief can hold only one item within its extradimensional space at a time, so any item taken is replaced by any item already within the space. Você pode also use this ação to expel an item already within the extradimensional space without replacing it. This activation can't be used on an attended item unless the criatura with that item allows it. Placing the handkerchief over an item typically takes an Interact ação.",
    activations: [
  {
    name: "",
    actionType: "one",
    traits: ["Manipulate"],
    requirements: "O lenço cobre inteiramente um item de volume insignificante",
    effect: "O lenço transporta o item que cobre para o seu espaço extradimensional. O lenço pode conter apenas um item dentro de seu espaço extradimensional por vez, então qualquer item levado é substituído por qualquer item que já esteja dentro do espaço. Você também pode usar esta ação para expulsar um item que já está dentro do espaço extradimensional sem substituí-lo. Esta ativação não pode ser usada em um item assistido, a menos que a criatura com aquele item permita. Colocar o lenço sobre um item normalmente requer uma ação Interagir.",
  },
    ],
  },
  "Lieutenant": {
    description: "Você wear a brightly colored sash around seu waist as a symbol of seu new position. Você’re bound to make mistakes in this role, but if você pode learn from them, perhaps você’ll live long enough to become an officer. Se você trigger a reação from an inimigo or a hazard, você ganha a +1 bônus de circunstância em salvaguardas você attempt as a result of that reação and a +1 bônus de circunstância em seu AC against attacks made during that reação.\n\n**Ativar—Atenção!** reação (concentrar)\n**Frequência** 1 vez por hora\n**Gatilho** One of seu aliados triggers a reação from an inimigo or a hazard\n**Efeito** Você share seu hard-earned experience with seu aliado, giving them a +1 bônus de circunstância em salvaguardas they attempt as a result of that reação and a +1 bônus de circunstância em their AC against attacks made during that reação.",
    activations: [
  {
    name: "Atenção!",
    actionType: "reaction",
    traits: ["Concentrate"],
    frequency: "1 vez por hora",
    trigger: "One of seu aliados triggers a reação de um inimigo ou a hazard",
    effect: "Você compartilha sua experiência suada com seu aliado, dando a eles +1 bônus de circunstância em seguranças que eles tentam como resultado dessa ocorrência e +1 bônus de circunstância em seu CA contra ataques feitos durante essa ocorrência.",
  },
    ],
  },
  "Lieutenant's Sash": {
    description: "Faixa colorida na cintura, símbolo do novo posto. Se disparar uma reação de inimigo ou perigo, +1 de circunstância em salvaguardas resultantes dessa reação e +1 de circunstância na CA contra ataques durante essa reação.\n\n**Ativar—Atenção!** reação (concentrar)\n**Frequência** 1 vez por hora\n**Gatilho** One of seu aliados triggers a reação from an inimigo or a hazard\n**Efeito** Você share seu hard-earned experience with seu aliado, giving them a +1 bônus de circunstância em salvaguardas they attempt as a result of that reação and a +1 bônus de circunstância em their AC against attacks made during that reação.",
    activations: [
  {
    name: "Atenção!",
    actionType: "reaction",
    traits: ["Concentrate"],
    frequency: "1 vez por hora",
    trigger: "One of seu aliados triggers a reação de um inimigo ou a hazard",
    effect: "Você compartilha sua experiência suada com seu aliado, dando a eles +1 bônus de circunstância em seguranças que eles tentam como resultado dessa ocorrência e +1 bônus de circunstância em seu CA contra ataques feitos durante essa ocorrência.",
  },
    ],
  },
  "Life-Saver Mail": {
    description: "Brunea +2 resiliente fortificação com gema verde (luz de tocha; 1 ação concentrar para ligar/desligar).\n\n**Ativar—Segunda chance** reação (concentrar)\n**Frequência** 1 vez ao dia\n**Gatilho** Você would die\n**Efeito** The armadura’s gemstone turns gray as it shares life energy with você. The armadura casts _breath of life_ on você.\n\n**Ativar—Luz protetora** 2 ações (concentrar, manipular)\n**Efeito** Você tap on the gemstone, producing a protective screen of green light. Você conjura a 5º posto _shield_ magia. As normal with the magia, você pode’t cast shield again (using this activation or other means) por 10 minutos if você use it to Shield Block.",
    activations: [
  {
    name: "Segunda chance",
    actionType: "reaction",
    traits: ["Concentrate"],
    frequency: "1 vez ao dia",
    trigger: "Você would die",
    effect: "A pedra preciosa da armadura fica cinza à medida que compartilha energia vital com você. A armadura lança _sopro de vida_ em você.",
  },
  {
    name: "Luz protetora",
    actionType: "two",
    traits: ["Concentrate","Manipulate"],
    effect: "Você bate na pedra preciosa, produzindo uma tela protetora de luz verde. Você conjura o 5º posto _escudo_ magia. Como normal com a magia, você não pode lançar escudo novamente (usando esta ativação ou outros meios) por 10 minutos se você usá-lo para Bloquear Escudo.",
  },
    ],
  },
  "Life-Saver Mail (Greater)": {
    description: "Brunea +3 resiliente maior fortificação maior. Luz protetora conjura escudo de 9º posto.\n\n**Ativar—Segunda chance** reação (concentrar)\n**Frequência** 1 vez ao dia\n**Gatilho** Você would die\n**Efeito** The armadura’s gemstone turns gray as it shares life energy with você. The armadura casts _breath of life_ on você.\n\n**Ativar—Luz protetora** 2 ações (concentrar, manipular)\n**Efeito** Você tap on the gemstone, producing a protective screen of green light. Você conjura a 5º posto _shield_ magia. As normal with the magia, você pode’t cast shield again (using this activation or other means) por 10 minutos if você use it to Shield Block.",
    activations: [
  {
    name: "Segunda chance",
    actionType: "reaction",
    traits: ["Concentrate"],
    frequency: "1 vez ao dia",
    trigger: "Você would die",
    effect: "A pedra preciosa da armadura fica cinza à medida que compartilha energia vital com você. A armadura lança _sopro de vida_ em você.",
  },
  {
    name: "Luz protetora",
    actionType: "two",
    traits: ["Concentrate","Manipulate"],
    effect: "Você bate na pedra preciosa, produzindo uma tela protetora de luz verde. Você conjura o 5º posto _escudo_ magia. Como normal com a magia, você não pode lançar escudo novamente (usando esta ativação ou outros meios) por 10 minutos se você usá-lo para Bloquear Escudo.",
  },
    ],
  },
  "Lifting Belt": {
    description: "Cinto largo de couro. +1 em Atletismo. Limite de Carga vira 6 + FOR (máx. 11 + FOR).\n\n**Ativar—Içamento assistido** 2 ações (manipular)\n**Efeito** Você lift an object of up to 8 Volume as though it were weightless. This requires two hands, and if the object is locked or otherwise held in place, você pode attempt to Force it Open using Atletismo as part of this activation. The object still has its full weight and Volume for all other purposes—você just ignore that weight. The effect lasts até o fim do seu próximo turno.",
    activations: [
  {
    name: "Içamento assistido",
    actionType: "two",
    traits: ["Manipulate"],
    effect: "Você levanta um objeto de até 8 volumes como se ele não tivesse peso. Isso requer as duas mãos e, se o objeto estiver travado ou mantido no lugar, você pode tentar forçá-lo a abrir usando o Atletismo como parte desta ativação. O objeto ainda tem seu peso e volume completos para todos os outros propósitos – basta ignorar esse peso. O efeito dura até o fim do seu próximo turno.",
  },
    ],
  },
  "Light Writer": {
    description: "Invenção de Absalom (fins de 4721): magia e relógio para retrato monocromático fiel em 20 minutos de exposição. Duas placas metálicas ligadas por fole de couro; lente na menor, placa tratada na maior, botão no cabo e tubo de luz. Ao ativar, luz mágica estável por 20 minutos projeta a cena na placa, que se remove depois. No tripé, precisa ficar imóvel; criatura viva também, senão o retrato fica fantasmagórico.",
  },
  "Lion": {
    description: "Given only to highly trusted agents by the grand princes back when Lion Blades protected the Primogen Crown, these historic _+1 impacto authorized shortswords_ allow a Lion Blade wielder to locate resources.\n\n**Ativar—Encontrar o bando** 3 ações (arcane, concentrar, manipular)\n**Frequência** 1 vez ao dia\n**Efeito** Você conjura _locate_ at 5th rank to learn the location of one of the following of seu choice: the nearest Lion Blade safe house, shadow school, Lion Blade agent, Lion Blade kith, or a person other than yourself who’s in possession of a _lion’s call_.\n\n**Ativar—Ecoar o chamado** reação (arcane, concentrar)\n**Frequência** 1 vez ao dia\n**Gatilho** A criatura locates você using another _lion’s call_\n**Efeito** Você immediately learn the location and appearance of the triggering criatura. Você pode communicate telepathically with the triggering criatura while você remain within 1,6 km of each other for the next hour.",
    activations: [
  {
    name: "Encontrar o bando",
    actionType: "three",
    traits: ["Arcane","Concentrate","Manipulate"],
    frequency: "1 vez ao dia",
    effect: "Você conjura _localizar_ na 5ª posição para saber a localização de um dos seguintes itens de sua escolha: o esconderijo de Lion Blade mais próximo, escola das sombras, agente de Lion Blade, kith de Lion Blade ou uma pessoa diferente de você que esteja em posse de um _chamado de leão_.",
  },
  {
    name: "Ecoar o chamado",
    actionType: "reaction",
    traits: ["Arcane","Concentrate"],
    frequency: "1 vez ao dia",
    trigger: "A criatura locates você using another _lion’s call_",
    effect: "Você aprende imediatamente a localização e a aparência da criatura desencadeadora. Você pode se comunicar telepaticamente com a criatura acionadora enquanto permanecer a 1,6 km um do outro pela próxima hora.",
  },
    ],
  },
  "Lion's Armor": {
    description: "Meia-placa +2 resiliente com cabeças de leão. +2 de item em Intimidação. Combina com o escudo do leão.\n\n**Ativar—Rugido da alcateia** 2 ações (concentrar)\n**Frequência** 1 vez ao dia\n**Efeito** The lions on seu armadura roar, attempting to cow seu inimigos. Attempt a teste to Demoralize each inimigo within 9 m of você. On a critical success, o alvo is also fleeing por 1 rodada.",
    activations: [
  {
    name: "Rugido da alcateia",
    actionType: "two",
    traits: ["Concentrate"],
    frequency: "1 vez ao dia",
    effect: "Os leões em sua armadura rugem, tentando intimidar seus inimigos. Faça um teste para desmoralizar cada inimigo num raio de 9 m de você. Com sucesso crítico, o alvo também foge por 1 rodada.",
  },
    ],
  },
  "Lion's Armor (Greater)": {
    description: "Meia-placa +3 resiliente maior. +3 em Intimidação. Rugido 1 vez por hora.\n\n**Ativar—Rugido da alcateia** 2 ações (concentrar)\n**Frequência** 1 vez ao dia\n**Efeito** The lions on seu armadura roar, attempting to cow seu inimigos. Attempt a teste to Demoralize each inimigo within 9 m of você. On a critical success, o alvo is also fleeing por 1 rodada.",
    activations: [
  {
    name: "Rugido da alcateia",
    actionType: "two",
    traits: ["Concentrate"],
    frequency: "1 vez ao dia",
    effect: "Os leões em sua armadura rugem, tentando intimidar seus inimigos. Faça um teste para desmoralizar cada inimigo num raio de 9 m de você. Com sucesso crítico, o alvo também foge por 1 rodada.",
  },
    ],
  },
  "Lion's Call": {
    description: "Espadas curtas +1 impactante autorizadas dadas a agentes de confiança das Lâminas do Leão na era da Coroa Primogênita.\n\n**Ativar—Encontrar o bando** 3 ações (arcane, concentrar, manipular)\n**Frequência** 1 vez ao dia\n**Efeito** Você conjura _locate_ at 5th rank to learn the location of one of the following of seu choice: the nearest Lion Blade safe house, shadow school, Lion Blade agent, Lion Blade kith, or a person other than yourself who’s in possession of a _lion’s call_.\n\n**Ativar—Ecoar o chamado** reação (arcane, concentrar)\n**Frequência** 1 vez ao dia\n**Gatilho** A criatura locates você using another _lion’s call_\n**Efeito** Você immediately learn the location and appearance of the triggering criatura. Você pode communicate telepathically with the triggering criatura while você remain within 1,6 km of each other for the next hour.",
    activations: [
  {
    name: "Encontrar o bando",
    actionType: "three",
    traits: ["Arcane","Concentrate","Manipulate"],
    frequency: "1 vez ao dia",
    effect: "Você conjura _localizar_ na 5ª posição para saber a localização de um dos seguintes itens de sua escolha: o esconderijo de Lion Blade mais próximo, escola das sombras, agente de Lion Blade, kith de Lion Blade ou uma pessoa diferente de você que esteja em posse de um _chamado de leão_.",
  },
  {
    name: "Ecoar o chamado",
    actionType: "reaction",
    traits: ["Arcane","Concentrate"],
    frequency: "1 vez ao dia",
    trigger: "A criatura locates você using another _lion’s call_",
    effect: "Você aprende imediatamente a localização e a aparência da criatura desencadeadora. Você pode se comunicar telepaticamente com a criatura acionadora enquanto permanecer a 1,6 km um do outro pela próxima hora.",
  },
    ],
  },
  "Lion's Shield": {
    description: "Escudo de aço em cabeça de leão. O bote é um umbo +1 impactante (não sai do escudo).\n\n**Ativar—Mordida do leão** ação livre (manipular, deadly)\n**Frequência** 1 vez ao dia\n**Requisitos** Seu Shield is raised\n**Efeito** Você animate the lion's head, making a melee Golpe with it. The shield's biting maw is a martial melee arma that deals 2d6 dano perfurante and has the deadly d6 trait; it can't be enhanced by runes. The shield remains animated por 1 minuto, during which time você pode Golpe with it cada vez que você Raise the Shield, além de with a Golpe ação.",
    activations: [
  {
    name: "Mordida do leão",
    actionType: "free",
    traits: ["Manipulate","Deadly"],
    frequency: "1 vez ao dia",
    requirements: "Seu Shield is raised",
    effect: "Você anima a cabeça do leão, fazendo um Golpe corpo a corpo com ela. A mandíbula cortante do escudo é uma arma marcial corpo a corpo que causa 2d6 dano perfurante e tem o traço mortal d6; não pode ser aprimorado por runas. O escudo permanece animado por 1 minuto, durante o qual você pode Golpe com ele toda vez que você Raise the Shield, além de uma ação Golpe.",
  },
    ],
  },
  "Living Mantle": {
    description: "Manto de musgo que absorve plantas locais. +2 em Natureza, ignora frio/calor severos, ponto de foco de ordem. Fabricação: druida.\n\n**Ativar—Segredos druidicos** ação livre (concentrar)\n**Frequência** 1 vez ao dia\n**Efeito** Você ganha 1 ponto de foco, que você só pode gastar para conjurar an order magia. Se você don't spend this ponto de foco até o fim deste turno, ele é perdido.",
    activations: [
  {
    name: "Segredos druidicos",
    actionType: "free",
    traits: ["Concentrate"],
    frequency: "1 vez ao dia",
    effect: "Você ganha 1 ponto de foco, que você só pode gastar para conjurar uma ordem mágica. Se você não passar esse ponto de foco até o fim deste turno, ele estará perdido.",
  },
    ],
  },
  "Living Mantle (Greater)": {
    description: "The base of this cloak is a thick layer of moss, but it slowly picks up native plants from each area it spends time in. Você ganha +2 bônus de item em Natureza testes. Você also suffer no effects from severe cold and severe heat. The bônus to Natureza testes increases to +3. Você also suffer no effects from extreme cold and extreme heat.\n\n**Ativar—Segredos druidicos** ação livre (concentrar)\n**Frequência** 1 vez ao dia\n**Efeito** Você ganha 1 ponto de foco, que você só pode gastar para conjurar an order magia. Se você don't spend this ponto de foco até o fim deste turno, ele é perdido.",
    activations: [
  {
    name: "Segredos druidicos",
    actionType: "free",
    traits: ["Concentrate"],
    frequency: "1 vez ao dia",
    effect: "Você ganha 1 ponto de foco, que você só pode gastar para conjurar uma ordem mágica. Se você não passar esse ponto de foco até o fim deste turno, ele estará perdido.",
  },
    ],
  },
  "Locket of Love Left Behind": {
    description: "Medalhão de ouro com coração e retrato minúsculo de parceiro, filho ou lugar. +1,5 m de status nos Deslocamentos enquanto em fuga. Se estiver morrendo, a CD dos testes de recuperação cai em 1.\n\n**Ativar—Poder do verdadeiro amor** reação\n**Gatilho** Você would die due to a death effect rather than the morrendo condition\n**Efeito** Seu love pulls você back from the brink of death and the locket cracks. Você avoid morrendo and remain at 1 PV. Você não pode use the ability again until você replace the casing of the locket, which typically takes around 1 month and costs 600 gp.",
    activations: [
  {
    name: "Poder do verdadeiro amor",
    actionType: "reaction",
    trigger: "Você morreria devido a um efeito de morte e não à condição de morrer",
    effect: "Seu amor tira você da beira da morte e o medalhão quebra. Você evita morrer e fica em 1 PV. Você não pode usar a habilidade novamente até substituir o invólucro do medalhão, o que normalmente leva cerca de 1 mês e custa 600 PO.",
  },
    ],
  },
  "Lodestone Shield": {
    description: "This _moderate reinforcing cold iron_ shield (Hardness 10, HP 92, BT 46) is inset with lodestones that draw ammunition toward it.\n\n**Ativar—Atrair projétil** reação (manipular)\n**Frequência** 1 vez por minuto\n**Gatilho** A ranged arma Golpe targets a criatura within 4,5 m of você when você tem this shield raised, and the atack hasn't yet rolled their attack\n**Efeito** The triggering Golpe targets você em vez de its normal alvo. If it hits, você ganha the effects of the Shield Block reação.",
    activations: [
  {
    name: "Atrair projétil",
    actionType: "reaction",
    traits: ["Manipulate"],
    frequency: "1 vez por minuto",
    trigger: "Uma arma de longo alcance Golpe tem como alvo uma criatura a até 4,5 m de você quando você tem este escudo levantado e o ataque ainda não rolou seu ataque",
    effect: "O acionamento do Golpe atinge você em vez de seu alvo normal. Se acertar, você ganha os efeitos da ocorrência do Shield Block.",
  },
    ],
  },
  "Lover": {
    description: "These white silk gloves are adorned in red hearts that glow faintly whenever você está adjacent to someone você feel particularly strongly toward. They buoy seu spirit, giving você a +1 bônus de item em Diplomacia testes.\n\n**Ativar—Vínculo** 1 ação (manipular)\n**Frequência** 1 vez ao dia\n**Efeito** Você grasp the hands of a willing criatura você tem strong positive feelings about, regardless of the nature of those feelings. The criatura gains a +1 bônus de status em salvaguardas and 10 PV temporários por 10 minutos. If the criatura shares seu feelings, você ganha the same benefits, and for the duration, when você both roll a success on a salvaguarda against an emotion effect that causes negative emotions, você both get a critical success instead.",
    activations: [
  {
    name: "Vínculo",
    actionType: "one",
    traits: ["Manipulate"],
    frequency: "1 vez ao dia",
    effect: "Você segura as mãos de uma criatura disposta e tem fortes sentimentos positivos, independentemente da natureza desses sentimentos. A criatura ganha +1 bônus de status em salvaguardas e 10 PV temporários por 10 minutos. Se a criatura compartilhar seus sentimentos, você obtém os mesmos benefícios e, enquanto ambos obtiverem um sucesso em uma proteção contra um efeito emocional que causa emoções negativas, ambos obterão um sucesso crítico.",
  },
    ],
  },
  "Lover's Gloves": {
    description: "Luvas de seda branca com corações. +1 em Diplomacia. 1 vez ao dia, vínculo protetor com alguém querido.\n\n**Ativar—Vínculo** 1 ação (manipular)\n**Frequência** 1 vez ao dia\n**Efeito** Você grasp the hands of a willing criatura você tem strong positive feelings about, regardless of the nature of those feelings. The criatura gains a +1 bônus de status em salvaguardas and 10 PV temporários por 10 minutos. If the criatura shares seu feelings, você ganha the same benefits, and for the duration, when você both roll a success on a salvaguarda against an emotion effect that causes negative emotions, você both get a critical success instead.",
    activations: [
  {
    name: "Vínculo",
    actionType: "one",
    traits: ["Manipulate"],
    frequency: "1 vez ao dia",
    effect: "Você segura as mãos de uma criatura disposta e tem fortes sentimentos positivos, independentemente da natureza desses sentimentos. A criatura ganha +1 bônus de status em salvaguardas e 10 PV temporários por 10 minutos. Se a criatura compartilhar seus sentimentos, você obtém os mesmos benefícios e, enquanto ambos obtiverem um sucesso em uma proteção contra um efeito emocional que causa emoções negativas, ambos obterão um sucesso crítico.",
  },
    ],
  },
  "Madcap Top": {
    description: "Pião de 20 faces em cores gritantes. Ao girar, gera um efeito mágico aleatório contra o alvo escolhido (tabela no GM Core). Raro e imprevisível.\n\n**Ativar—Girar o pião** 2 ações (concentrar, manipular)\n**Efeito** Choose a criatura within 18 m to alvo and roll a d20 on the table below to determine the top's effect. Você make any decisions for a magia cast by the top unless otherwise indicated, except that it must alvo the criatura você chose, or the criatura você chose must be the center of the magia's area, if it has an area but no targets. If the magia's range is less than 18 m, increase the range to 18 m. Any CD de magia required is CD 27, and any ataque de magia roll required is +17. If the top casts a magia on você, você don't get a salvaguarda or other defense against it. The top can't be activated again for 1d4 hours. ## d20 Madcap Top Efeito 1 Você spin just like the top. Você está atordoado por 1 rodada and then confuso por 1 rodada. 2 _Slow_ affects o alvo. 3 _Shrink_ affects você for 1 day. 4 A 3º posto _illusory disguise_ makes você look like o alvo. 5 A statue of o alvo, made of chocolate or candy, appears adjacent to você. 6 Gravity reverses, sending você and o alvo 9 m in the air, imóvel. Você both fall at the start of seu next turno. 7 _Mind reading_ affects o alvo, and the top loudly recites what it discovers. 8 _Laughing fit_ affects o alvo. 9 A fountain erupts from the top, spraying wine por 10 minutos. 10 _Translocate_ affects você, but você teleport through Hell. 11 _Invisibility_ affects você. 12 Four singing skeletons appear to serenade você and seu aliados por 1 minuto, granting a +1 bônus de status em rolagem de ataques, Percepção testes, salvaguardas, and teste de perícias. 13 The top flings 1 cp at você. 14 _Confusion_ affects o alvo. 15 Você and o alvo change places; this is a teleportation effect. 16 _Banishment_ affects o alvo, or paralyze if o alvo's on its home plane. 17 Rainbow dye explodes and covers você for 24 hours. 18 The top creates a _toxic cloud_ centered on o alvo. 19 A random unattended object within 18 m of você sprouts animal legs and follows você, reverting when the top's activation recharges. 20 Spin again, and o alvo also spins as though it had activated the top.",
    activations: [
  {
    name: "Girar o pião",
    actionType: "two",
    traits: ["Concentrate","Manipulate"],
    effect: "Escolha uma criatura a até 18 m do alvo e jogue um d20 na tabela abaixo para determinar o efeito do topo. Você toma qualquer decisão para uma magia lançada pelo topo, a menos que indicado de outra forma, exceto que ela deve ter como alvo a criatura que você escolheu, ou a criatura que você escolheu deve ser o centro da área da magia, se ela tiver uma área, mas não tiver alvos. Se o alcance da magia for inferior a 18 m, aumente o alcance para 18 m. Qualquer CD de magia necessário é CD 27, e qualquer teste de ataque de magia necessário é +17. Se o topo lançar uma magia sobre você, você não terá uma proteção ou outra defesa contra ele. O topo não pode ser ativado novamente por 1d4 horas. ## d20 Madcap Top Efeito 1 Você gira igual ao pião. Você fica atordoado por 1 rodada e depois confuso por 1 rodada. 2 _Lento_ afeta o alvo. 3 _Shrink_ afeta você por 1 dia. 4 Um 3º posto _disfarce ilusório_ faz você parecer o alvo. 5 Uma estátua do alvo, feita de chocolate ou bala, aparece ao lado de você. 6 A gravidade inverte, enviando você e o alvo 9 m no ar, imóvel. Vocês dois caem no início do próximo turno. 7 _Leitura da mente_ afeta o alvo, e o top recita em voz alta o que descobre. 8 _Risos_ afeta o alvo. 9 Uma fonte irrompe do topo, borrifando vinho por 10 minutos. 10 _Translocate_ afeta você, mas você se teletransporta através do Inferno. 11 _Invisibilidade_ afeta você. 12 Quatro esqueletos cantores aparecem para fazer uma serenata para você e seus aliados por 1 minuto, concedendo +1 bônus de status em rolagem de ataques, Percepção testes, salvaguardas e teste de perícias. 13 O top arremessa 1 cp para você. 14 _Confusão_ afeta o alvo. 15 Você e o alvo trocam de lugar; este é um efeito de teletransporte. 16 _Banimento_ afeta o alvo, ou paralisa se o alvo estiver em seu plano natal. 17 A tintura arco-íris explode e cobre você por 24 horas. 18 O topo cria uma _nuvem tóxica_ centrada no alvo. 19 Um objeto aleatório abandonado a até 18 m de você brota pernas de animal e segue você, revertendo quando a ativação do pião é recarregada. 20 Gire novamente, e o alvo também gira como se tivesse ativado o topo.",
  },
    ],
  },
  "Mage": {
    description: "This hat comes in many forms, such as a colorful turban or a pointy hat with a brim, and is adorned with symbols or runes. It concede a você a +1 bônus de item em Arcanismo testes and allows você to cast the _prestidigitation_ cantrip como um truque inato arcano.",
  },
  "Mage's Hat": {
    description: "Chapéu pontudo ou turbante com runas. +1 em Arcanismo e prestidigitação inata.",
  },
  "Mage's Hat (Greater)": {
    description: "Versão maior: +2 em Arcanismo e 1 vez ao dia uma invocação arcana de 4º posto.\n\n**Ativar—Magia do chapéu**\n**Frequência** 1 vez ao dia\n**Efeito** Você doff the hat, causing magical energy to pour from it. Você conjura the magia stored in the hat.",
    activations: [
  {
    name: "Magia do chapéu",
    frequency: "1 vez ao dia",
    effect: "Você tira o chapéu, fazendo com que energia mágica saia dele. Você conjura a magia guardada no chapéu.",
  },
    ],
  },
  "Mala Beads of Foresight": {
    description: "As você move seu body, qi flows into _mala beads of foresight_ você wear and have invested, making them one with seu life force. In their usual form, beads are spheres of wood, but versions customized to different martial orders are common. Você ganha +2 bônus de item em Religião testes.\n\n**Ativar** ação livre (concentrar, divine)\n**Frequência** 1 vez ao dia\n**Efeito** Você ganha 1 ponto de foco, which você pode use only to cast a divine monk qi magia. If not used by the end of seu turno, this ponto de foco is lost.\n\n**Ativar** ação livre (concentrar)\n**Frequência** 1 vez por hora\n**Gatilho** Você tem just Refocused by meditating\n**Efeito** While meditating, você searched seu feelings for a portent of the future. Você're affected by an _augury_ magia.",
    activations: [
  {
    name: "",
    actionType: "free",
    traits: ["Concentrate","Divine"],
    frequency: "1 vez ao dia",
    effect: "Você ganha 1 ponto de foco, que você pode usar apenas para lançar uma magia de qi de monge divino. Se não for utilizado até o final do seu turno, esse ponto de foco será perdido.",
  },
  {
    name: "",
    actionType: "free",
    traits: ["Concentrate"],
    frequency: "1 vez por hora",
    trigger: "Você tem just Refocused by meditating",
    effect: "Enquanto meditava, você procurava em seus sentimentos um presságio do futuro. Você está afetado por uma magia de _augúrio_.",
  },
    ],
  },
  "Mantle of Amazing Health": {
    description: "Manto de pele de urso negro sarnento com argolas de ferro. +2 de status em Fortitude contra doença e veneno. Ao investir: Constituição +1 ou até +4.\n\n**Ativar** reação (manipular)\n**Frequência** 1 vez por rodada\n**Gatilho** Você sofre dano\n**Efeito** Drawing the cloak around você, você reduce the dano taken by 10.\n\n**Ativar** 2 ações (concentrar, manipular)\n**Frequência** 1 vez por hora\n**Efeito** Se você're currently afflicted by a poison or a disease, você pode hold the cloak tight to seu body and immediately attempt a salvaguarda to end the effect. If that salvaguarda succeeds, você end the effect of either the poison or disease no matter the stage of the affliction. Furthermore, você ganha imunidade a that poison or disease for 24 hours.",
    activations: [
  {
    name: "",
    actionType: "reaction",
    traits: ["Manipulate"],
    frequency: "1 vez por rodada",
    trigger: "Você sofre dano",
    effect: "Ao colocar a capa em volta de você, você reduz o dano recebido em 10.",
  },
  {
    name: "",
    actionType: "two",
    traits: ["Concentrate","Manipulate"],
    frequency: "1 vez por hora",
    effect: "Se você está atualmente afetado por um veneno ou uma doença, você pode segurar o manto firmemente contra seu corpo e imediatamente tentar uma proteção para acabar com o efeito. Se essa proteção for bem-sucedida, você acabará com o efeito do veneno ou da doença, independentemente do estágio da aflição. Além disso, você ganha imunidade contra veneno ou doença por 24 horas.",
  },
    ],
  },
  "Mantle of the Tikbalang": {
    description: "Capa longa com retalhos do pelo negro de tikbalang. −2 de item em salvaguardas contra ilusões, mas +2 de item em Enganação.\n\n**Ativar—Espasmo ilusório** 2 ações (concentrar, illusion, manipular, mental)\n**Frequência** 1 vez ao dia\n**Efeito** Você wrap the mantle around seu body, causing você to briefly appear much larger than você está. Faça um Golpe corpo a corpo. This Golpe deals an additional 4d6 dano mental.",
    activations: [
  {
    name: "Espasmo ilusório",
    actionType: "two",
    traits: ["Concentrate","Illusion","Manipulate","Mental"],
    frequency: "1 vez ao dia",
    effect: "Você enrola o manto em volta do corpo, fazendo com que pareça muito maior do que é. Faça um Golpe corpo a corpo. Este Golpe causa 4d6 de dano mental adicional.",
  },
    ],
  },
  "Mariner": {
    description: "The swirls on this wooden mask—often worn by Mordant Censors—move and shift, reflecting the shape of the nearest currents. Wearing the mask concede a você a +1 bônus de item em Sailing Lore and Sobrevivência testes. Além disso, it allows você to pilot a boat with simply a thought. When você pilot a vehicle, você pode keep both hands free and Drive from any location on the vehicle.\n\n**Ativar—Traçar o rumo** 1 ação (concentrar)\n**Frequência** 1 vez ao dia\n**Requisitos** Você está aboard a vehicle\n**Efeito** Você fica acelerado por 1 minuto or until você leave the vehicle, whichever comes first, and can use the extra ação to Take Control of the vehicle or, if você’re already piloting it, Drive or Stop the vehicle.",
    activations: [
  {
    name: "Traçar o rumo",
    actionType: "one",
    traits: ["Concentrate"],
    frequency: "1 vez ao dia",
    requirements: "Você está aboard a vehicle",
    effect: "Você fica acelerado por 1 minuto ou até sair do veículo, o que ocorrer primeiro, podendo usar a ação extra para Assumir o Controle do veículo ou, se você já estiver pilotando, Dirigir ou Parar o veículo.",
  },
    ],
  },
  "Marshal": {
    description: "Marechais são líderes antes de tudo. Podem vir de qualquer classe, mas todos abrem mão de um pouco da própria glória pelo bem do grupo — na linha de frente ou guiando de trás.\\n\\nA Dedicação treina (ou aperfeiçoa) Diplomacia ou Intimidação e cria uma aura de 15 pés que concede +1 de status em salvaguardas contra medo a você e aliados. Feitos seguintes viram essa aura em posturas de combate, cadência e investidas coordenadas.\n\n**Ativar—Ordem estentórea** 2 ações (auditivo, manipular, swarms)\n**Frequência** 1 vez ao dia\n**Efeito** Você issue a command in a booming voice while gesturing with the _marshal’s baton_ and cast a _command_ magia (CD 18). This magia affects troops and enxames as if they were a single criatura.",
    activations: [
  {
    name: "Ordem estentórea",
    actionType: "two",
    traits: ["Auditory","Manipulate","Swarms"],
    frequency: "1 vez ao dia",
    effect: "Você emite um comando com uma voz estrondosa enquanto gesticula com o bastão do _marechal_ e lança uma magia de _comando_ (CD 18). Esta magia afeta tropas e enxames como se fossem uma única criatura.",
  },
    ],
  },
  "Marshal's Baton": {
    description: "Bastão curto e grosso de madeira e aço, metais preciosos no cabo e filigrana nas pontas. +1 de item em Diplomacia e Intimidação contra tropas, soldados individuais e líderes militares.\n\n**Ativar—Ordem estentórea** 2 ações (auditivo, manipular, swarms)\n**Frequência** 1 vez ao dia\n**Efeito** Você issue a command in a booming voice while gesturing with the _marshal’s baton_ and cast a _command_ magia (CD 18). This magia affects troops and enxames as if they were a single criatura.",
    activations: [
  {
    name: "Ordem estentórea",
    actionType: "two",
    traits: ["Auditory","Manipulate","Swarms"],
    frequency: "1 vez ao dia",
    effect: "Você emite um comando com uma voz estrondosa enquanto gesticula com o bastão do _marechal_ e lança uma magia de _comando_ (CD 18). Esta magia afeta tropas e enxames como se fossem uma única criatura.",
  },
    ],
  },
  "Marvelous Medicines": {
    description: "Kit de curandeiro com ataduras e ervas impecáveis. +2 de bônus de item em Medicina. Ao Tratar veneno ou doença, tenta contrapor (posto 5, +21) uma vez por aflição e paciente.",
  },
  "Marvelous Medicines (Greater)": {
    description: "Versão maior: +3 de bônus de item em Medicina. Ao Tratar veneno ou doença, contrapõe com posto 8 e modificador +30.",
  },
  "Marvelous Miniature (Campfire)": {
    description: "Every _marvelous miniature_ is an exceptionally small replica of a real criatura or object. The miniature is made from wood, pewter, or other simple materials, and features a rune etched into the underside of the replica's base. _Marvelous miniatures_ sometimes come packaged together; for example, the camping set features the boat, campfire, and horse miniatures. Activating a _marvelous miniatur_e causes it to transform into another criatura or object, which then can be used as normal for that object. Each miniature can be activated only once, with most of them permanently becoming the item in their description. When activated, this miniature transforms into an active campfire. The campfire doesn't require attending and remains fully lit for 8 hours, though it can be quenched as any other campfire.",
  },
  "Marvelous Miniature (Horse)": {
    description: "Every _marvelous miniature_ is an exceptionally small replica of a real criatura or object. The miniature is made from wood, pewter, or other simple materials, and features a rune etched into the underside of the replica's base. _Marvelous miniatures_ sometimes come packaged together; for example, the camping set features the boat, campfire, and horse miniatures. Activating a _marvelous miniatur_e causes it to transform into another criatura or object, which then can be used as normal for that object. Each miniature can be activated only once, with most of them permanently becoming the item in their description. When activated, this miniature transforms into a horse. The horse can't attack or use reactions, but otherwise uses all the statistics of a riding horse and follows seu basic commands. The horse doesn't need to eat or drink. After 8 hours, it reverts back to miniature form, then crumbles to dust.",
  },
  "Marvelous Miniature (Ladder)": {
    description: "Every _marvelous miniature_ is an exceptionally small replica of a real criatura or object. The miniature is made from wood, pewter, or other simple materials, and features a rune etched into the underside of the replica's base. _Marvelous miniatures_ sometimes come packaged together; for example, the camping set features the boat, campfire, and horse miniatures. Activating a _marvelous miniatur_e causes it to transform into another criatura or object, which then can be used as normal for that object. Each miniature can be activated only once, with most of them permanently becoming the item in their description. When activated, this miniature transforms permanently into a 6 m-long wooden ladder.",
  },
  "Mask Of Allure": {
    description: "Máscara de prata espelhada que se molda ao rosto, leve e respirável, sem cobrir a visão. +2 de item em Enganação, Diplomacia, Intimidação e Atuação. Ao investir: Carisma +1 ou até +4.\n\n**Ativar—Brilho da prata** ação livre (concentrar, visual)\n**Frequência** 1 vez ao dia\n**Gatilho** Você attempt a Enganação, Diplomacia, Intimidação, or Atuação teste\n**Efeito** Você ganha +4 bônus de status em the triggering teste. This ability has no effect if você’re under the effects of a disguise that hides the _mask of allure_. Depending on the skill used, the mirrored silver transforms into one of the following appearances. **• Enganação** A swirl of silver, which entirely obscures and conceals seu normal features. **• Diplomacia** A kind, gentle, and inviting expression. **• Intimidação** An exaggerated visage of horror that shocks viewers into paying attention. **• Atuação** A humanoid face, the mouth cracked wide with a comedic smile or a tragic frown, depending on the nature of the performance.",
    activations: [
  {
    name: "Brilho da prata",
    actionType: "free",
    traits: ["Concentrate","Visual"],
    frequency: "1 vez ao dia",
    trigger: "Você tenta um teste de Enganação, Diplomacia, Intimidação ou Atuação",
    effect: "Você ganha +4 bônus de status no teste de acionamento. Esta habilidade não tem efeito se você estiver sob os efeitos de um disfarce que esconde a _máscara do fascínio_. Dependendo da habilidade utilizada, a prata espelhada se transforma em uma das seguintes aparências. **• Enganação** Um redemoinho de prata, que obscurece e esconde completamente suas características normais. **• Diplomacia** Uma expressão amável, gentil e convidativa. **• Intimidação** Uma imagem exagerada de horror que faz os espectadores prestarem atenção. **• Atuação** Rosto humanóide, boca aberta com um sorriso cômico ou uma carranca trágica, dependendo da natureza da performance.",
  },
    ],
  },
  "Mask of Mercy": {
    description: "Máscara de porcelana com rosto angelical. +1 de item em Medicina.\n\n**Ativar** 1 ação (concentrar, destino, cura)\n**Frequência** 1 vez ao dia\n**Gatilho** Você está about to roll a variable number of PV você restore from an ação with the healing trait\n**Efeito** Roll twice to determine the number of PV você restore and take the higher result.",
    activations: [
  {
    name: "",
    actionType: "one",
    traits: ["Concentrate","Fortune","Healing"],
    frequency: "1 vez ao dia",
    trigger: "Você está prestes a rolar um número variável de PV para restaurar de uma ação com o traço de cura",
    effect: "Role duas vezes para determinar o número de PV que você restaura e obtenha o resultado mais alto.",
  },
    ],
  },
  "Mask of the Cursed Eye": {
    description: "Máscara com ao menos um olho arregalado. Na primeira vez ao dia em que uma criatura no seu plano que você não percebe o visar com magia de detecção, previsão, revelação ou vidência, ela faz Vontade CD 24 (automático, sem ativar). Sucesso crítico: nada. Sucesso: nada, mas você sabe que foi visado. Falha: enjoado 1 e ofuscado por 1 minuto; você sabe. Falha crítica: enjoado 2 e ofuscado por 10 minutos, magia interrompida; você vislumbra a criatura e a distância e direção aproximadas.",
  },
  "Mask of Uncanny Breath": {
    description: "Máscara de madeira (caveira, monstro ou sem traços). Resistência 10 a venenos inalados; respira sem ar ou em toxina. +2 de item em Ocultismo.\n\n**Ativar** ação livre (concentrar, occult)\n**Frequência** 1 vez ao dia\n**Efeito** Você ganha 1 ponto de foco, which você pode use only to cast an occult monk qi magia. If not used by the end of seu turno, this ponto de foco is lost.\n\n**Ativar** reação (concentrar, unarmed)\n**Frequência** 1 vez ao dia\n**Gatilho** Seu unarmed Golpe hits a criatura that breathes\n**Efeito** The mask contorts and inhales, sucking breath from seu alvo's lungs. O alvo falls inconsciente but doesn't fall caído or drop what it's holding. It wakes up at the end of seu turno if it hasn't been woken up already.",
    activations: [
  {
    name: "",
    actionType: "free",
    traits: ["Concentrate","Occult"],
    frequency: "1 vez ao dia",
    effect: "Você ganha 1 ponto de foco, que você pode usar apenas para lançar uma magia de qi de monge oculto. Se não for utilizado até o final do seu turno, esse ponto de foco será perdido.",
  },
  {
    name: "",
    actionType: "reaction",
    traits: ["Concentrate","Unarmed"],
    frequency: "1 vez ao dia",
    trigger: "Seu Golpe desarmado atinge uma criatura que respira",
    effect: "A máscara se contorce e inala, sugando o ar dos pulmões do seu alvo. O alvo cai inconsciente mas não cai caído ou deixa cair o que está segurando. Ele acorda no final do seu turno, caso ainda não tenha sido acordado.",
  },
    ],
  },
  "Masquerade Scarf": {
    description: "Echarpe bordada que completa qualquer fantasia. 1 vez ao dia, disfarce ilusório de 1º posto.\n\n**Ativar—Mascarada** (manipular)\n**Frequência** 1 vez ao dia\n**Efeito** Você arrange the scarf over seu lower face, and it casts a 1º posto _illusory disguise_ magia on você, which ends immediately if the scarf is removed. Você pode alter the scarf's appearance or make it invisível as part of the _illusory disguise_, but it can still be felt if touched.",
    activations: [
  {
    name: "Mascarada",
    traits: ["Manipulate"],
    frequency: "1 vez ao dia",
    effect: "Você coloca o lenço na parte inferior do rosto e ele lança uma magia de 1º posto _disfarce ilusório_ em você, que termina imediatamente se o lenço for removido. Você pode alterar a aparência do lenço ou torná-lo invisível como parte do _disfarce ilusório_, mas ainda pode ser sentido se tocado.",
  },
    ],
  },
  "Masquerade Scarf (Greater)": {
    description: "This delicately embroidered scarf matches with every outfit and can even complete a costume or disguise with illusions. The activation is a 2-ação activity, você pode activate it any number of times per day, and the _illusory disguise_ is 2nd rank.\n\n**Ativar—Mascarada** (manipular)\n**Frequência** 1 vez ao dia\n**Efeito** Você arrange the scarf over seu lower face, and it casts a 1º posto _illusory disguise_ magia on você, which ends immediately if the scarf is removed. Você pode alter the scarf's appearance or make it invisível as part of the _illusory disguise_, but it can still be felt if touched.",
    activations: [
  {
    name: "Mascarada",
    traits: ["Manipulate"],
    frequency: "1 vez ao dia",
    effect: "Você coloca o lenço na parte inferior do rosto e ele lança uma magia de 1º posto _disfarce ilusório_ em você, que termina imediatamente se o lenço for removido. Você pode alterar a aparência do lenço ou torná-lo invisível como parte do _disfarce ilusório_, mas ainda pode ser sentido se tocado.",
  },
    ],
  },
  "Master Magus Ring": {
    description: "Elegant jewelry such as the _master magus ring_ adorns experienced magi. Each ring has a significant metal and symbol to represent a particular hybrid study, such as a heavy iron ring with an icon of a mountain for inexorable iron, or glittering silver with a shield-like emblem for sparkling targe. Você ganha +2 bônus de item em Arcanismo testes.\n\n**Ativar** ação livre (concentrar)\n**Frequência** 1 vez ao dia\n**Efeito** Você ganha 1 ponto de foco, which você pode use only to cast a magus conflux magia. If not used by the end of seu turno, this ponto de foco is lost.\n\n**Ativar** ação livre (concentrar, extradimensional)\n**Frequência** 1 vez ao dia\n**Efeito** The ring transports você and any items você're wearing and holding from seu current space to an unoccupied space você pode see within a range equal to seu Speed. If this would bring another criatura with você—even if você're carrying it in an extradimensional container—the activation fails and is used.",
    activations: [
  {
    name: "",
    actionType: "free",
    traits: ["Concentrate"],
    frequency: "1 vez ao dia",
    effect: "Você ganha 1 ponto de foco, que você pode usar apenas para lançar uma magia de confluxo de mago. Se não for utilizado até o final do seu turno, esse ponto de foco será perdido.",
  },
  {
    name: "",
    actionType: "free",
    traits: ["Concentrate","Extradimensional"],
    frequency: "1 vez ao dia",
    effect: "O anel transporta você e todos os itens que você está vestindo e segurando do seu espaço atual para um espaço desocupado que você pode ver dentro de um intervalo igual ao seu Deslocamento. Se isso trouxer outra criatura com você – mesmo que você a esteja carregando em um recipiente extradimensional – a ativação falha e é usada.",
  },
    ],
  },
  "Medal of Gorilla’s Might": {
    description: "Líderes militares ou chefes de Estado concedem estas medalhas a soldados exemplares. Costumam ir numa tira de tecido junto à lapela. Quantas medalhas mágicas tiver, contam coletivamente como um único item investido. Medalha de aço com cabeça e torso de gorila, por proeza física. +1 de item em Atletismo para Escalar, Forçar Abertura, Salto em Altura e Salto em Distância.\n\n**Ativar—Segundo salto do gorila** reação (concentrar, destino)\n**Frequência** 1 vez ao dia\n**Gatilho** Você would fail but not critically fail an Atletismo teste to High Jump or Long Jump\n**Efeito** The gorilla on the medal beats its chest, giving você another chance. Você reroll the failed teste.",
    activations: [
  {
    name: "Segundo salto do gorila",
    actionType: "reaction",
    traits: ["Concentrate","Fortune"],
    frequency: "1 vez ao dia",
    trigger: "Você would fail but not critically fail an Atletismo teste to High Jump ou Long Jump",
    effect: "O gorila da medalha bate no peito, dando a você outra chance. Você rola novamente o teste que falhou.",
  },
    ],
  },
  "Medal of Griffon’s Heart": {
    description: "Líderes militares ou chefes de Estado concedem estas medalhas a soldados exemplares. Costumam ir numa tira de tecido junto à lapela. Quantas medalhas mágicas tiver, contam coletivamente como um único item investido. Medalha de cobre com rosto, asas e garras de grifo de perfil, por bravura notável. +1 de item em salvaguardas contra medo e efeitos mentais. Enquanto a usa, pode conjurar guarda proibitiva como truque inato.",
  },
  "Medal of Phoenix’s Fire": {
    description: "Líderes militares ou chefes de Estado concedem estas medalhas a soldados exemplares. Costumam ir numa tira de tecido junto à lapela. Quantas medalhas mágicas tiver, contam coletivamente como um único item investido. Medalha de ouro com fênix orgulhosa e borda em forma de chama, a mais alta honraria em muitos países.\n\n**Ativar—Sacrifício da fênix** ação livre (vitalidade)\n**Frequência** 1 vez ao dia\n**Gatilho** Seu morrendo condition increases\n**Efeito** The phoenix bursts into flames. Você lose the morrendo condition and regain 1 PV. Seu ferido value does not increase. Você pode use this ação while inconsciente.",
    activations: [
  {
    name: "Sacrifício da fênix",
    actionType: "free",
    traits: ["Vitality"],
    frequency: "1 vez ao dia",
    trigger: "Seu morrendo condition increases",
    effect: "A fênix explode em chamas. Você perde a condição morrendo e recupera 1 PV. O valor do seu ferido não aumenta. Você pode usar esta ação enquanto inconsciente.",
  },
    ],
  },
  "Medal of the Wolf Pack": {
    description: "Líderes militares ou chefes de Estado concedem estas medalhas a soldados exemplares. Costumam ir numa tira de tecido junto à lapela. Quantas medalhas mágicas tiver, contam coletivamente como um único item investido. Medalha de estanho com três cabeças de lobo, concedida a esquadrões de trabalho em equipe excepcional. +2 de circunstância nas rolagens de dano contra inimigos que você estiver flanqueando.",
  },
  "Medal of Unicorn’s Purity": {
    description: "Líderes militares ou chefes de Estado concedem estas medalhas a soldados exemplares. Costumam ir numa tira de tecido junto à lapela. Quantas medalhas mágicas tiver, contam coletivamente como um único item investido. Medalha de prata com unicórnio de perfil, o chifre ultrapassando a borda circular, por retidão e serviço exemplar.\n\n**Ativar—Graça do unicórnio** reação (concentrar, cura, vitalidade, magical)\n**Frequência** 1 vez ao dia\n**Gatilho** Você would regain PV from a magical effect\n**Efeito** Você regain an additional 4d6 PV.",
    activations: [
  {
    name: "Graça do unicórnio",
    actionType: "reaction",
    traits: ["Concentrate","Healing","Vitality","Magical"],
    frequency: "1 vez ao dia",
    trigger: "Você recuperaria o PV de um efeito mágico",
    effect: "Você regain an additional 4d6 PV.",
  },
    ],
  },
  "Medic’s Armband": {
    description: "Braçadeira branca com símbolo azul-claro de médico de combate. +1 de item em Diplomacia para mudar a atitude de criaturas doentes, envenenadas e feridas.\n\n**Ativar—Não causar dano** ação livre (concentrar)\n**Frequência** 1 vez ao dia\n**Gatilho** An inimigo within 9 m targets você with a Golpe or a magia that deals dano\n**Efeito** Seu armband glows, showing that você’re here as a medic and not as a combatant. Both você and the triggering inimigo take a –4 penalidade de status to rolagem de danos até o fim do seu próximo turno.",
    activations: [
  {
    name: "Não causar dano",
    actionType: "free",
    traits: ["Concentrate"],
    frequency: "1 vez ao dia",
    trigger: "Um inimigo dentro de 9 m mira em você com um Golpe ou uma magia que causa dano",
    effect: "Sua braçadeira brilha, mostrando que você está aqui como médico e não como combatente. Tanto você quanto o inimigo acionador levam um –4 deliberação de status para rolagem de danos até o fim do seu próximo turno.",
  },
    ],
  },
  "Medic’s Armband (Greater)": {
    description: "Braçadeira branca com símbolo azul-claro de médico de combate. +1 de item em Diplomacia para mudar a atitude de criaturas doentes, envenenadas e feridas. +2 de item em Medicina para Prestar Primeiros Socorros e Tratar Ferimentos.\n\n**Ativar—Não causar dano** ação livre (concentrar)\n**Frequência** 1 vez ao dia\n**Gatilho** An inimigo within 9 m targets você with a Golpe or a magia that deals dano\n**Efeito** Seu armband glows, showing that você’re here as a medic and not as a combatant. Both você and the triggering inimigo take a –4 penalidade de status to rolagem de danos até o fim do seu próximo turno.",
    activations: [
  {
    name: "Não causar dano",
    actionType: "free",
    traits: ["Concentrate"],
    frequency: "1 vez ao dia",
    trigger: "Um inimigo dentro de 9 m mira em você com um Golpe ou uma magia que causa dano",
    effect: "Sua braçadeira brilha, mostrando que você está aqui como médico e não como combatente. Tanto você quanto o inimigo acionador levam um –4 deliberação de status para rolagem de danos até o fim do seu próximo turno.",
  },
    ],
  },
  "Medusa Armor": {
    description: "Cota de escamas de adamantina +2 que parece ter fortificação, mas não tem. Sempre que sofre crítico, depois do dano fica petrificado 1 rodada. Na primeira ativação, funde-se a você.",
  },
  "Memoir Map": {
    description: "Mapa que se atualiza com lugares que você visitou. +1 de item em Saber de um local representado. Ativar (concentrar): 1 vez ao dia, Recorde Conhecimento sobre um lugar do mapa com +1 de status.",
  },
  "Memory Ribbon": {
    description: "The time-honored tradition of weaving beautiful, embroidered glory ribbons throughout one’s hair and beard remains an important cultural practice among some dwarven clans, with the choice of colors and style of presentation representing status, achievements, and other significant aspects of someone’s position. Magical versions also exist that help enhance the wearer’s memory. These magical ribbons are especially popular when someone has been invited to serve as a toastmaster at a guild banquet or as a master of ceremonies at an important festival. Their use in final oral exams for high positions is, however, hotly debated.\n\n**Ativar—Ler a história da fita** ação livre (concentrar)\n**Gatilho** Você attempt a teste de perícia to Recordar Conhecimento but haven’t rolled yet\n**Efeito** The _memory ribbon_ concede a você a +2 bônus de item em the triggering teste de perícia to Recordar Conhecimento. Afterward, the ribbon becomes non-magical.",
    activations: [
  {
    name: "Ler a história da fita",
    actionType: "free",
    traits: ["Concentrate"],
    trigger: "Você tentou um teste de perícia para Recordar Conhecimento mas ainda não rolou",
    effect: "A _memory ribbon_ concede a você +2 bônus de item no acionamento do teste de perícia ao Recordar Conhecimento. Depois disso, a fita se torna não-mágica.",
  },
    ],
  },
  "Mercurial Mantle": {
    description: "Manto vermelho-escuro, leve, que ondula como líquido. +3 de item em Acrobacia e Furtividade; +2 de circunstância na CA contra ataques de reações disparadas pelo seu movimento. Ao investir: Destreza +1 ou até +4.\n\n**Ativar—Esquiva astuta** reação (manipular)\n**Frequência** 1 vez por hora\n**Gatilho** An inimigo misses você with a melee Golpe\n**Efeito** Você slip around the attacking criatura with ease. Você Step, without moving out of the triggering inimigo’s reach, and then make a melee Golpe against the triggering inimigo if it’s within seu reach. Se você do make a Golpe, o alvo attempts a CD 38 Percepção teste before você roll. **Falha** This criatura is desprevenido against the Golpe. **Falha crítica** This criatura is desprevenido against all seu attacks until the end of its next turno.\n\n**Ativar—Pirueta errante** 2 ações (concentrar)\n**Frequência** 1 vez ao dia\n**Efeito** The cloak hums with power as seu whirl it around yourself, disappearing amid a brief flash of light. Teleport up to double seu Speed to a location você pode see. At the end of the teleportation, você pode make a melee Golpe against a criatura ao alcance, if there is one.",
    activations: [
  {
    name: "Esquiva astuta",
    actionType: "reaction",
    traits: ["Manipulate"],
    frequency: "1 vez por hora",
    trigger: "Um inimigo sente sua falta com um Golpe corpo a corpo",
    effect: "Você consegue contornar a criatura atacante com facilidade. Você Passo, sem sair do alcance do inimigo acionador, e então fazer um Golpe corpo a corpo contra o inimigo acionador se ele estiver ao seu alcance. Se você fizer um Golpe, o alvo tenta um CD 38 Percepção teste antes de você rolar. **Falha** Esta criatura está desprevenida contra o Golpe. **Falha crítica** Esta criatura está desprevenida contra todos os seus ataques até o final do seu próximo turno.",
  },
  {
    name: "Pirueta errante",
    actionType: "two",
    traits: ["Concentrate"],
    frequency: "1 vez ao dia",
    effect: "A capa vibra com poder enquanto você a gira ao seu redor, desaparecendo em meio a um breve flash de luz. Teleporte-se para dobrar seu Deslocamento para um local que você possa ver. Ao final do teletransporte, você pode realizar um Golpe corpo a corpo contra uma criatura ao alcance, se houver.",
  },
    ],
  },
  "Messenger": {
    description: "This silver signet ring changes to match the insignia of a leader or organization você serve (or seu own face, if você serve no one else). It concede a você a +2 bônus de item em Diplomacia testes and lets você cast _message_ as an arcane magia inata at will.\n\n**Ativar—Despachar mensageiro** (concentrar)\n**Frequência** 1 vez ao dia\n**Efeito** The ring casts _animal messenger_ to seu specification. The animal is a magical criatura that springs from the ring, and its appearance suits the iconography or heraldry of the leader or organization represented by the ring.",
    activations: [
  {
    name: "Despachar mensageiro",
    traits: ["Concentrate"],
    frequency: "1 vez ao dia",
    effect: "O anel lança _animal messenger_ de acordo com sua especificação. O animal é uma criatura mágica que brota do anel, e sua aparência combina com a iconografia ou heráldica do líder ou organização representada pelo anel.",
  },
    ],
  },
  "Messenger's Ring": {
    description: "Anel de sinete que muda para o símbolo de quem você serve. +2 em Diplomacia, mensagem à vontade, e mensageiro animal 1 vez ao dia.\n\n**Ativar—Despachar mensageiro** (concentrar)\n**Frequência** 1 vez ao dia\n**Efeito** The ring casts _animal messenger_ to seu specification. The animal is a magical criatura that springs from the ring, and its appearance suits the iconography or heraldry of the leader or organization represented by the ring.",
    activations: [
  {
    name: "Despachar mensageiro",
    traits: ["Concentrate"],
    frequency: "1 vez ao dia",
    effect: "O anel lança _animal messenger_ de acordo com sua especificação. O animal é uma criatura mágica que brota do anel, e sua aparência combina com a iconografia ou heráldica do líder ou organização representada pelo anel.",
  },
    ],
  },
  "Messenger's Ring (Greater)": {
    description: "Versão maior: +3 em Diplomacia e enviar mensagem 1 vez por hora.\n\n**Ativar—Envio** 3 ações (concentrar)\n**Frequência** 1 vez por hora\n**Efeito** The ring casts _sending_ to seu specifications.",
    activations: [
  {
    name: "Envio",
    actionType: "three",
    traits: ["Concentrate"],
    frequency: "1 vez por hora",
    effect: "O anel lança _envio_ de acordo com suas especificações.",
  },
    ],
  },
  "Mind": {
    description: "Gemstones of many colors adorn the silver of a _mind's light circlet_. When você're charged with mental power, the jewels scintillate with light, with different gems resonating based on seu emotions. If você tem at least 1 ponto de foco, the gems cast dim light in a 3 m radius. When você amp a magia, the light increases to bright light in a 6 m radius (and dim light to the next 6 m) até o início do seu próximo turno. Você ganha +2 bônus de item em Ocultismo testes. Você also gain the following amp, which você pode apply to any of seu psi cantrips that have a alvo or area, much like an amp gained from a feat. **Amp** Você transfer some of the magical luminescence from the mind's light circlet to one of the criaturas. Choose a criatura targeted by the magia or in its area. Until the start of seu next turno, that criatura sheds bright light in a 6 m radius (and dim light to the next 6 m) and can't be oculto. If the criatura is invisível, it's oculto while alight, rather than being indetectado.\n\n**Ativar** ação livre (concentrar)\n**Frequência** 1 vez ao dia\n**Efeito** Você ganha 1 ponto de foco, which você pode use only to use a psychic amp. If not used by the end of seu turno, this ponto de foco is lost.",
    activations: [
  {
    name: "",
    actionType: "free",
    traits: ["Concentrate"],
    frequency: "1 vez ao dia",
    effect: "Você ganha 1 ponto de foco, que você pode usar apenas para usar um amplificador psíquico. Se não for utilizado até o final do seu turno, esse ponto de foco será perdido.",
  },
    ],
  },
  "Mind's Light Circlet": {
    description: "Diadema de prata com gemas. Com 1+ Ponto de Foco: luz tênue 3 m. Ao amplificar magia: luz intensa 6 m (tênue +6 m) até o início do próximo turno. +2 de item em Ocultismo. Amplificação extra para truques psi com alvo ou área: uma criatura alvo ou na área emite luz intensa 6 m (tênue +6 m) até o início do próximo turno, não pode ficar oculto; se invisível, fica oculto em vez de não detectado.\n\n**Ativar** ação livre (concentrar)\n**Frequência** 1 vez ao dia\n**Efeito** Você ganha 1 ponto de foco, which você pode use only to use a psychic amp. If not used by the end of seu turno, this ponto de foco is lost.",
    activations: [
  {
    name: "",
    actionType: "free",
    traits: ["Concentrate"],
    frequency: "1 vez ao dia",
    effect: "Você ganha 1 ponto de foco, que você pode usar apenas para usar um amplificador psíquico. Se não for utilizado até o final do seu turno, esse ponto de foco será perdido.",
  },
    ],
  },
  "Mirror Goggles (Greater)": {
    description: "Como os óculos menores, mas +3 de item e Fortitude CD 40. Gatilho: criatura a 18 m visa você com efeito visual; falha: enjoado 1 (enjoado 2 na crítica). Imune 1 hora.\n\n**Ativar** reação (manipular)\n**Gatilho** A criatura within 18 m targets você with a visual effect\n**Efeito** Você turno seu head to reflect aspects of the triggering effect back at its creator. The criatura deve fazer um teste CD 20 salvaguarda de Fortitude as it becomes disoriented by this reflection. On a failure, the criatura is enjoado 1 (enjoado 2 on a critical failure). The criatura is temporarily immune por 1 hora.",
    activations: [
  {
    name: "",
    actionType: "reaction",
    traits: ["Manipulate"],
    trigger: "Uma criatura dentro de 18 m mira em você com um efeito visual",
    effect: "Você vira a cabeça para refletir aspectos do efeito desencadeador de volta ao seu criador. A criatura deve fazer um teste CD 20 salvaguarda de Fortitude à medida que fica desorientada por esta reflexão. Em caso de falha, a criatura recebe o comando 1 (enjoado 2 em caso de falha crítica). A criatura fica temporariamente imune por 1 hora.",
  },
    ],
  },
  "Mirror Goggles (Lesser)": {
    description: "Lentes espelhadas. +1 de item em Percepção visual e salvaguardas contra efeitos visuais.\n\n**Ativar** reação (manipular)\n**Gatilho** A criatura within 18 m targets você with a visual effect\n**Efeito** Você turno seu head to reflect aspects of the triggering effect back at its creator. The criatura deve fazer um teste CD 20 salvaguarda de Fortitude as it becomes disoriented by this reflection. On a failure, the criatura is enjoado 1 (enjoado 2 on a critical failure). The criatura is temporarily immune por 1 hora.",
    activations: [
  {
    name: "",
    actionType: "reaction",
    traits: ["Manipulate"],
    trigger: "Uma criatura dentro de 18 m mira em você com um efeito visual",
    effect: "Você vira a cabeça para refletir aspectos do efeito desencadeador de volta ao seu criador. A criatura deve fazer um teste CD 20 salvaguarda de Fortitude à medida que fica desorientada por esta reflexão. Em caso de falha, a criatura recebe o comando 1 (enjoado 2 em caso de falha crítica). A criatura fica temporariamente imune por 1 hora.",
  },
    ],
  },
  "Mirror Goggles (Moderate)": {
    description: "Como os óculos menores, mas +2 de item e Fortitude CD 30. Gatilho: criatura a 18 m visa você com efeito visual; falha: enjoado 1 (enjoado 2 na crítica). Imune 1 hora.\n\n**Ativar** reação (manipular)\n**Gatilho** A criatura within 18 m targets você with a visual effect\n**Efeito** Você turno seu head to reflect aspects of the triggering effect back at its creator. The criatura deve fazer um teste CD 20 salvaguarda de Fortitude as it becomes disoriented by this reflection. On a failure, the criatura is enjoado 1 (enjoado 2 on a critical failure). The criatura is temporarily immune por 1 hora.",
    activations: [
  {
    name: "",
    actionType: "reaction",
    traits: ["Manipulate"],
    trigger: "Uma criatura dentro de 18 m mira em você com um efeito visual",
    effect: "Você vira a cabeça para refletir aspectos do efeito desencadeador de volta ao seu criador. A criatura deve fazer um teste CD 20 salvaguarda de Fortitude à medida que fica desorientada por esta reflexão. Em caso de falha, a criatura recebe o comando 1 (enjoado 2 em caso de falha crítica). A criatura fica temporariamente imune por 1 hora.",
  },
    ],
  },
  "Mirror of Sorshen": {
    description: "Espelho oval que mostra o que cada um mais deseja. Liga-se a conjurador lendário em Arcanismo ou Ocultismo. Quem olha fica fascinado (Vontade CD 35 por rodada; emoção, incapacitação, visual). A fascinação não cai só por ação hostil (Vontade CD 30). O dono vê o reflexo à distância e usa as ativações.\n\n**Ativar—Segunda olhada** 2 ações (concentrar, emoção, incapacitation, visual)\n**Efeito** Você force a criatura looking at the mirror to attempt an additional salvaguarda de Vontade against the mirror's fascination effect, even if they succeeded at their save.\n\n**Ativar—Desejo irresistível** 3 ações (concentrar, emoção, incapacitation, visual)\n**Requisitos** O alvo must be fascinado by the mirror\n**Efeito** Você control o alvo for 30 days, with the effect of a critically failed salvaguarda against _dominate_. If the victim sees the mirror again at any point before this duration expires, the control extends for an additional 30 days from the moment it looked at the mirror again. While there is no initial salvaguarda, the CD to break free due to commands against the criatura's nature is 35. **Destruction** The _Mirror of Sorshen_ shatters into a thousand pieces if an intelligent but completely innocent criatura resists the mirror's attraction and then accidentally drops it.",
    activations: [
  {
    name: "Segunda olhada",
    actionType: "two",
    traits: ["Concentrate","Emotion","Incapacitation","Visual"],
    effect: "Você força uma criatura olhando para o espelho a tentar uma proteção adicional de Vontade contra o efeito de fascinação do espelho, mesmo que ela tenha conseguido salvá-la.",
  },
  {
    name: "Desejo irresistível",
    actionType: "three",
    traits: ["Concentrate","Emotion","Incapacitation","Visual"],
    requirements: "O alvo deve estar fascinado pelo espelho",
    effect: "Você controla o alvo por 30 dias, com o efeito de uma proteção com falha crítica contra _dominar_. Se a vítima vir o espelho novamente em qualquer momento antes que esse período expire, o controle se estende por mais 30 dias a partir do momento em que ela olhou novamente para o espelho. Embora não haja proteção inicial, o CD para se libertar devido a comandos contra a natureza da criatura é 35. **Destruição** O _Espelho de Sorshen_ se quebra em mil pedaços se uma criatura inteligente, mas completamente inocente, resistir à atração do espelho e então acidentalmente deixá-lo cair.",
  },
    ],
  },
  "Mnemonic Feather": {
    description: "Pena de emu. Interagir para colocá-la num livro: enquanto permanecer, você se lembra do conteúdo daquela obra sem consultá-la. Tirar a pena apaga a lembrança extra.\n\n**Ativar—Recitar mnemônico** reação (auditivo, concentrar, mental)\n**Frequência** 1 vez ao dia\n**Gatilho** An aliado within 9 m attempts a Recordar Conhecimento teste involving the topic in the _mnemonic feather’s_ book\n**Efeito** Você mentally impart the book’s knowledge to seu aliado, giving them the benefit of the _mnemonic feather_.",
    activations: [
  {
    name: "Recitar mnemônico",
    actionType: "reaction",
    traits: ["Auditory","Concentrate","Mental"],
    frequency: "1 vez ao dia",
    trigger: "Um aliado dentro de 9 m tenta um teste de Recordar Conhecimento envolvendo o tema do livro _mnemônico da pena_",
    effect: "Você transmite mentalmente o conhecimento do livro ao seu aliado, dando-lhes o benefício da _pena mnemônica_.",
  },
    ],
  },
  "Monkey": {
    description: "This dried, gnarled hand is clenched in a fist, waiting for a criatura to pick it up. When você pick up the _monkey's paw_, the hand opens, revealing three withered fingers. The _monkey's paw_ concede a você three wishes (with the effects of a success on the _wish_ ritual), curling one finger after every one. Once você pick up the _monkey's paw_, você podenot discard the hand until it returns to a clenched fist by granting its three wishes. Any attempts to discard the hand, even with the effects of a _wish_ ritual, are unsuccessful as the _monkey's paw_ reappears among seu possessions within 1d4 hours; it doesn't work for any other criatura in the intervening time. The hand returns even if another criatura steals it from você. Once você make all three wishes, the _monkey's paw_ uses _interplanar teleport_ to travel to a random point in the multiverse. Whenever the _monkey's paw_ hears você utter a statement that sounds like a wish, even if você don't use the words “I wish,” it activates and grants a twisted, horrifying version of seu wish, producing any effect within the possibility of _wish_ ritual, and potentially a greater effect at the GM's discretion.",
  },
  "Monkey's Paw": {
    description: "Mão seca com três dedos: três desejos (efeito de sucesso no ritual desejo), cada um fecha um dedo. Não dá para largar até os três. Reaparece em 1d4 horas se descartada. Depois teleporta-se. Qualquer frase que soe a desejo (mesmo sem “eu desejo”) ativa uma versão torcida.",
  },
  "Monster Suit": {
    description: "Fantasia de criatura para palco, com efeitos teatrais. Vestida, +1 de item em Enganação para Personificar aquele tipo de monstro; volumosa e quente demais para aventura longa.",
  },
  "Moonlit Chain": {
    description: "Camisa de malha de prata +1. À luz da lua, visão na penumbra.\n\n**Ativar—Ofuscar visão** 1 ação (manipular)\n**Frequência** 1 vez ao dia\n**Efeito** Você touch the stitched image of the new moon on the armadura's collar and suppress the ofuscado condition por 1 minuto.",
    activations: [
  {
    name: "Ofuscar visão",
    actionType: "one",
    traits: ["Manipulate"],
    frequency: "1 vez ao dia",
    effect: "Você toca a imagem costurada da lua nova na gola da armadura e suprime a condição ofuscado por 1 minuto.",
  },
    ],
  },
  "Mordant Mask": {
    description: "Máscara de madeira; murmúrio constante como ondas. +1 de item em salvaguardas de Vontade e na CD de Vontade contra efeitos de emoção.\n\n**Ativar—Rebentação** reação (concentrar)\n**Frequência** 1 vez ao dia\n**Gatilho** Você would be affected by an auditory effect\n**Efeito** The noise of the waves grow to an overwhelming, crashing booming, drowning out all other sounds. Você fica surdo to all other noise até o fim do seu próximo turno. Você pode Sustain the activation up to 1 minute.",
    activations: [
  {
    name: "Rebentação",
    actionType: "reaction",
    traits: ["Concentrate"],
    frequency: "1 vez ao dia",
    trigger: "Você seria afetado por um efeito auditivo",
    effect: "O barulho das ondas torna-se um estrondo avassalador e estrondoso, abafando todos os outros sons. Você fica surdo a todos os outros ruídos até o fim do seu próximo turno. Você pode sustentar a ativação por até 1 minuto.",
  },
    ],
  },
  "Moritype": {
    description: "Vidro fumê com energia de vazio (exige a morte de um bicho pequeno na carga). Imprime a aura de um morto-vivo ou espírito adjacente; +1 de item para identificar aquela criatura.",
  },
  "Mortal Chronicle": {
    description: "Linha da vida no pulso. +1 de item em Medicina para Tratar ferimentos em você. Ativar (concentrar): 1 vez ao dia, quando cair a 0 PV, fica com 1 PV em vez de morrer (ainda pode ficar morrendo).",
  },
  "Motion-Seeking Lenses": {
    description: "Óculos com lentes esverdeadas: o movimento ao redor salta à vista. +1 de item na CD de Percepção contra Furtividade para Esconder-se ou Furtar-se, e quem tentar Furtar-se não se beneficia da cobertura contra sua CD de Percepção.\n\n**Ativar—Encontrar o oculto** 1 ação (detection, manipular)\n**Efeito** Você twist the lenses of seu glasses as você look for someone escondido. Você Procurar with a +1 bônus de item. Se você find a escondido criatura or object, você pode Point Out as a ação livre.",
    activations: [
  {
    name: "Encontrar o oculto",
    actionType: "one",
    traits: ["Detection","Manipulate"],
    effect: "Você torce as lentes dos seus óculos enquanto procura alguém escondido. Você procura com um bônus de +1 de item. Se você encontrar uma criatura ou objeto escondido, você pode apontar como uma ação livre.",
  },
    ],
  },
  "Mounted Inspiring Spotlight": {
    description: "Como o holofote inspirador portátil, mas versão fixa maior para teatro permanente, com alcance e brilho superiores.",
  },
  "Mutator Onyx": {
    description: "Mineral negro-azeviche da Cidadela de Ônix, hoje ferramenta alquímica em Oprak. Pressionar a gema num objeto inanimado sólido desacompanhado de Dureza 5 ou menos torna a superfície xaroposa e reduz a Dureza a 0; um ônix cobre até um cubo de 1,5 m. Após 10 minutos, a matéria volta ao sólido e recupera a Dureza.",
  },
  "Name Pendant": {
    description: "Pingente de metal gravado com nome e dados críticos; também identifica soldados caídos. +1 em salvaguardas contra magias e efeitos mágicos com o traço mental.\n\n**Ativar—Alertar oficial superior** ação livre\n**Frequência** 1 vez ao dia\n**Gatilho** Você ganha the morrendo condition\n**Efeito** The pendent alerts all other aliados within 500 pés who are also wearing a _name pendant_.",
    activations: [
  {
    name: "Alertar oficial superior",
    actionType: "free",
    frequency: "1 vez ao dia",
    trigger: "Você ganha a condição de morrer",
    effect: "O pendente alerta todos os outros aliados num raio de 150 m que também estejam usando um _pingente de nome_.",
  },
    ],
  },
  "Navaratna of the Solar Ruby": {
    description: "Colar de ouro com nove gemas impecáveis e um rubi sagrado do centro de um sol. Enquanto o usa, você ignora efeitos ambientais de temperatura, penalidades de vento, dano e efeitos de seca, inundação e terremoto, e dano de fome; não concede resistência a fogo ou frio.\n\n**Ativar—Sutra do servo impecável** reação (concentrar, divine, destino, divine)\n**Frequência** 1 vez por hora\n**Gatilho** An aliado within 9 m fails a salvaguarda against an temperature environmental effect\n**Efeito** Você offer a prayer for seu divine protection to extend to seu companion. The criatura rerolls the triggering salvaguarda with a +2 bônus de item. They must take the new result, even if it is worse. **Destruction** The navaratna must be swallowed by a fiendish divine lion; the lion must then by killed by drowning in a lake of naga venom and left to rot for a year. At the stroke of midnight on the final day, the artifact is destroyed.",
    activations: [
  {
    name: "Sutra do servo impecável",
    actionType: "reaction",
    traits: ["Concentrate","Divine","Fortune","Divine"],
    frequency: "1 vez por hora",
    trigger: "Um aliado dentro de 9 m falha na proteção contra um efeito ambiental de temperatura",
    effect: "Você oferece uma oração para que sua proteção divina seja estendida ao seu companheiro. A criatura rola novamente a salvaguarda de ativação com um bônus de item de +2. Eles devem aceitar o novo resultado, mesmo que seja pior. **Destruição** O navaratna deve ser engolido por um leão divino diabólico; o leão deve então ser morto por afogamento em um lago de veneno de naga e deixado para apodrecer por um ano. À meia-noite do último dia, o artefato é destruído.",
  },
    ],
  },
  "Navigator": {
    description: "A star inked on the back of the hand, usually between the thumb and forefinger, keeps você on the right path.\n\n**Ativar** 2 ações (concentrar, manipular)\n**Efeito** As você hold up seu hand and align the star in view, você learn which direction você're facing.",
    activations: [
  {
    name: "",
    actionType: "two",
    traits: ["Concentrate","Manipulate"],
    effect: "Ao levantar a mão e alinhar a estrela à vista, você aprende para que direção está olhando.",
  },
    ],
  },
  "Navigator's Star": {
    description: "Estrela que aponta o norte. +1 de item em Sobrevivência para Sentido de direção. Você sempre sabe onde é o norte, ao ar livre à noite.\n\n**Ativar** 2 ações (concentrar, manipular)\n**Efeito** As você hold up seu hand and align the star in view, você learn which direction você're facing.",
    activations: [
  {
    name: "",
    actionType: "two",
    traits: ["Concentrate","Manipulate"],
    effect: "Ao levantar a mão e alinhar a estrela à vista, você aprende para que direção está olhando.",
  },
    ],
  },
  "Necklace of Allure": {
    description: "Colar de prata com safiras e pingente de lobo. Ao investir, o modificador de Carisma sobe em 1 ou vai a +4, o que for maior. +2 de bônus de item em Enganação e Diplomacia.\n\n**Ativar—Conquistá-los** 2 ações (concentrar)\n**Frequência** 1 vez por hora\n**Efeito** Você conjura a 4º posto _charm_ magia (CD 38).",
    activations: [
  {
    name: "Conquistá-los",
    actionType: "two",
    traits: ["Concentrate"],
    frequency: "1 vez por hora",
    effect: "Você conjura a 4º posto _charm_ magia (CD 38).",
  },
    ],
  },
  "Nemesis Name": {
    description: "Nome de um inimigo jurado, escolhido nas preparações. Golpes contra essa criatura causam +1d6 de precisão.\n\n**Ativar** 1 ação (concentrar, mental)\n**Frequência** 1 vez por rodada\n**Requisitos** Você pode see seu nemesis, and they're within 9 m of você\n**Efeito** Você focus seu hatred into a mental scream. Seu nemesis takes 3d6 dano mental, which they can resist with a basic CD 26 salvaguarda de Vontade. Você sofre half as much dano as seu nemesis does, and você não pode reduce this dano in any way.",
    activations: [
  {
    name: "",
    actionType: "one",
    traits: ["Concentrate","Mental"],
    frequency: "1 vez por rodada",
    requirements: "Você pode ver seu inimigo, e eles estão a 9 m de você",
    effect: "Você concentra seu ódio em um grito mental. Seu inimigo sofre 3d6 de dano mental, ao qual pode resistir com um CD 26 básico de salvaguarda de Vontade. Você sofre metade do dano que seu inimigo sofre, e você não pode reduzir esse dano de forma alguma.",
  },
    ],
  },
  "Nine Void Sleeves": {
    description: "Tinta de presas e ossos de asa de sceaduinars, púrpura-negro fosco nos braços e mãos. Em combate, forma nove esporões de cristal fumacento que gesticulam por você.\n\n**Ativar—Dedos sombrios** 1 ação (concentrar, forma de magia, vazio, manipular)\n**Frequência** 1 vez a cada 10 minutos\n**Efeito** Se vocêr next ação is to Conjurar uma Magia with the void trait, seu magia loses the manipulate trait and gains the shadow trait, as the tattoo’s shadowy spurs perform the gestures in seu stead.",
    activations: [
  {
    name: "Dedos sombrios",
    actionType: "one",
    traits: ["Concentrate","Spellshape","Void","Manipulate"],
    frequency: "1 vez a cada 10 minutos",
    effect: "Se sua próxima ação for Conjurar uma Magia com o traço vazio, sua magia perde o traço manipular e ganha o traço sombra, à medida que as esporas sombrias da tatuagem realizam os gestos em seu lugar.",
  },
    ],
  },
  "Oathlamp of Accord": {
    description: "Lanterna encapuzada em prisma translúcido, alimentada por juramentos, não por óleo. Enquanto a segura, +1 de item em Diplomacia.\n\n**Ativar—Anunciar juramento** reação (light, mental)\n**Gatilho** Você make a promise in good faith\n**Efeito** The _oathlamp of accord_ sheds light without consuming fuel until the promise você made is broken or fulfilled. The GM adjudicates whether a spoken promise is broken or fulfilled. This light and the shutters to conceal it work as normal for a hooded lantern. Any criatura in the light of the oathlamp becomes aware of the contents of the oath, along with who made it and how long ago.",
    activations: [
  {
    name: "Anunciar juramento",
    actionType: "reaction",
    traits: ["Light","Mental"],
    trigger: "Você make a promise in good faith",
    effect: "A _lâmpada do acordo_ ilumina sem consumir combustível até que a promessa que você fez seja quebrada ou cumprida. O GM julga se uma promessa falada foi quebrada ou cumprida. Esta luz e as persianas para ocultá-la funcionam normalmente para uma lanterna com capuz. Qualquer criatura à luz da lâmpada do juramento fica ciente do conteúdo do juramento, bem como de quem o fez e há quanto tempo.",
  },
    ],
  },
  "Obsidian Goggles": {
    description: "Lentes pretas que clareiam o mundo. +1 em Percepção visual. 1 vez ao dia, visão no escuro por 1 hora.\n\n**Ativar—Visão no escuro** 1 ação (manipular)\n**Frequência** 1 vez ao dia\n**Efeito** Adjusting seu goggles, você ganha darkvision por 1 hora.",
    activations: [
  {
    name: "Visão no escuro",
    actionType: "one",
    traits: ["Manipulate"],
    frequency: "1 vez ao dia",
    effect: "Adjusting seu goggles, você ganha darkvision por 1 hora.",
  },
    ],
  },
  "Obsidian Goggles (Greater)": {
    description: "Versão maior: +2 em Percepção visual e visão no escuro à vontade.\n\n**Ativar—Visão no escuro** 1 ação (manipular)\n**Frequência** 1 vez ao dia\n**Efeito** Adjusting seu goggles, você ganha darkvision por 1 hora.",
    activations: [
  {
    name: "Visão no escuro",
    actionType: "one",
    traits: ["Manipulate"],
    frequency: "1 vez ao dia",
    effect: "Adjusting seu goggles, você ganha darkvision por 1 hora.",
  },
    ],
  },
  "Obsidian Goggles (Major)": {
    description: "Versão máxima: +3 em Percepção visual e visão no escuro maior à vontade.\n\n**Ativar—Visão no escuro** 1 ação (manipular)\n**Frequência** 1 vez ao dia\n**Efeito** Adjusting seu goggles, você ganha darkvision por 1 hora.",
    activations: [
  {
    name: "Visão no escuro",
    actionType: "one",
    traits: ["Manipulate"],
    frequency: "1 vez ao dia",
    effect: "Adjusting seu goggles, você ganha darkvision por 1 hora.",
  },
    ],
  },
  "One Hundred Victories": {
    description: "Marcas de batalha. +1 de item em Intimidação. Ativar (concentrar): 1 vez ao dia, ao Desmoralizar, o alvo também fica ofendido 1 se falhar.",
  },
  "One-Hour Flower": {
    description: "Sementes que florescem na hora em ambiente quente (terra, água morna ou punho fechado). Cores variadas; cada flor some após 1 hora.",
  },
  "Oneiric Crystals of the Slumberer": {
    description: "Cristais trapezoidais de alghollthu que aprisionam sonhos e memórias; ao quebrar, as vítimas as recuperam mas ficam estupefatas 1 por 1 rodada.\n\n**Ativar—Roubar lembrança** 2 ações (concentrar, manipular)\n**Frequência** 1 vez ao dia\n**Efeito** Choose a criatura você pode see, trapping its memories in the crystal. The criatura deve fazer um teste CD 31 Vontade salvaguarda. If the criatura is asleep, it uses the outcome one degree of success worse than the result of its roll. **Sucesso crítico** The criatura is unaffected and realizes você tried to steal its memories. **Sucesso** The criatura is aturdido 1 por 1 rodada but doesn’t lose any memory, and believes você did something harmless to its mind. **Falha** The criatura is aturdido 2 por 1 hora and loses all memory of a particular topic that can be detailed in 50 words or fewer. **Falha crítica** The criatura is aturdido 4 for 1 day and loses all memory of two particular topics, each of which can be detailed in 50 words or fewer.",
    activations: [
  {
    name: "Roubar lembrança",
    actionType: "two",
    traits: ["Concentrate","Manipulate"],
    frequency: "1 vez ao dia",
    effect: "Escolha uma criatura que você possa ver, prendendo suas memórias no cristal. A criatura deve fazer um teste CD 31 Vontade segurança. Se a criatura estiver adormecida, ela usará o resultado um grau de sucesso pior que o resultado de seu teste. **Sucesso crítico** A criatura não é afetada e percebe que você tentou roubar suas memórias. **Sucesso** A criatura fica aturdida 1 por 1 rodada, mas não perde a memória e acredita que você fez algo inofensivo à sua mente. **Falha** A criatura fica aturdida de 2 a 1 hora e perde toda a memória de um determinado assunto que pode ser detalhado em 50 palavras ou menos. **Falha crítica** A criatura fica aturdida 4 por 1 dia e perde toda a memória de dois tópicos específicos, cada um dos quais pode ser detalhado em 50 palavras ou menos.",
  },
    ],
  },
  "Oracular Crown": {
    description: "Patterns themed to seu curse cover seu _oracular crown_. As seu curse worsens, the appearance of the crown changes, introducing extreme angles, stronger colors, or other indications of the intensity of seu curse. Similarly, it gets closer to its natural form when você reduce the effects of seu curse. Você ganha +2 bônus de item em Religião testes.\n\n**Ativar** ação livre (concentrar)\n**Frequência** 1 vez ao dia\n**Efeito** Você ganha 1 ponto de foco, which você pode use only to cast an oracle revelation magia. If not used by the end of seu turno, this ponto de foco is lost.\n\n**Ativar** 1 ação (concentrar, cura, vitalidade, cursebound, vazio)\n**Frequência** 1 vez ao dia\n**Requisitos** Seu cursebound value is 1 or higher\n**Efeito** Você regain 3d8 PV. The amount of healing increases to 5d8 if você’re cursebound 2, 7d8 if você’re cursebound 3, or 9d8 if você’re cursebound 4. If você tem the void healing ability, this activation has the void trait em vez de the healing and vitality traits.",
    activations: [
  {
    name: "",
    actionType: "free",
    traits: ["Concentrate"],
    frequency: "1 vez ao dia",
    effect: "Você ganha 1 ponto de foco, que você pode usar apenas para lançar uma magia de revelação do oráculo. Se não for utilizado até o final do seu turno, esse ponto de foco será perdido.",
  },
  {
    name: "",
    actionType: "one",
    traits: ["Concentrate","Healing","Vitality","Cursebound","Void"],
    frequency: "1 vez ao dia",
    requirements: "Seu cursebound value is 1 ou higher",
    effect: "Você recupera 3d8 PV. A quantidade de cura aumenta para 5d8 se você estiver com maldição vinculada 2, 7d8 se você estiver com maldição vinculada 3 ou 9d8 se você estiver com maldição vinculada 4. Se você tiver a habilidade de cura do vazio, esta ativação tem o traço de vazio em vez dos traços de cura e vitalidade.",
  },
    ],
  },
  "Orm Choker": {
    description: "Gargantilha da pele tratada de orm d’água, forrada com pelo sedoso. A forma borra nas bordas: +1 de item em salvaguardas contra detecção, revelação e vidência.\n\n**Ativar—Forma aquosa** 3 ações (concentration, water, concentrar)\n**Frequência** 1 vez ao dia\n**Efeito** Você dissolve into liquid, appearing only as a stretch of flowing water. While in this form, você ganha a deslocamento de natação of 45 pés, você automatically succeed at Atletismo testes to Nadar, and você ganha a +4 bônus de circunstância em Furtividade testes in water. However, você pode’t speak, use any of seu other items or abilities, or enter a body of salt water while in this form. Você pode remain in this form for up to 1 hour, though você pode return to seu normal form using a single ação that has the concentrate trait.",
    activations: [
  {
    name: "Forma aquosa",
    actionType: "three",
    traits: ["Concentration","Water","Concentrate"],
    frequency: "1 vez ao dia",
    effect: "Você se dissolve em líquido, aparecendo apenas como um trecho de água corrente. Enquanto estiver nesta forma, você ganha a mobilidade de natação de 13,5 m, você automaticamente terá sucesso nos testes de Atletismo a Nadar, e você ganha +4 bônus de particularidade em Furtividade testes na água. No entanto, você não pode falar, usar qualquer um de seus outros itens ou habilidades ou entrar em um corpo de água salgada enquanto estiver nesta forma. Você pode permanecer nesta forma por até 1 hora, mas pode retornar à sua forma normal usando uma única ação que tenha o traço concentrado.",
  },
    ],
  },
  "Pactmaster": {
    description: "Granted by Katapesh's Pactmasters to influential merchants, exceptional Zephyr Guards, and favorite retainers, a _pactmaster's grace_ is a crystal-studded blue platinum ring that sharpens the wearer's urban instincts. While invested, the ring grants a +2 bônus de item em salvaguardas while você está in an urban setting, and this increases to a +3 bônus de item if você tem legendary proficiency in Guild Lore, Katapesh Lore, Mercantile Lore, or Sociedade. Você also gain a +3 bônus de item em Mercantile Lore testes while wearing the ring, and você pode attempt testes that require a proficiency rank of master in Sociedade.",
  },
  "Pactmaster's Grace": {
    description: "Anel de platina azul cravejado, dado pelos Mestres do Pacto de Katapesh. Investido, +2 de item em salvaguardas em ambiente urbano (+3 se for lendário em Conhecimento de Guilda, de Katapesh, Mercantil ou Sociedade). +3 de item em Conhecimento Mercantil, e pode fazer testes de Sociedade que exigem proficiência de mestre.",
  },
  "Paradise Light": {
    description: "Frasco de Brilho (Nirvana). Luz intensa 9 m + penumbra 9 m. Contra-ataca escuridão mágica; sucesso cobre a área com ilusão de Nirvana por 1 hora.\n\n**Ativar—Santuário** 2 ações (manipular)\n**Frequência** 1 vez por hora\n**Efeito** Você conjure a shard of Nirvana in a 30 foot emanation, temporarily altering the landscape into an soothing meadow por 1 minuto. Creatures in the area gain a +1 bônus de item em salvaguarda de Vontades and Sabedoria-based teste de perícias, and have fast healing 2. A criatura in the area that attempts to take a hostile ação deve passar num teste CD 28 salvaguarda de Vontade or the hostile ação is prevented and the ações they would’ve spent are wasted.",
    activations: [
  {
    name: "Santuário",
    actionType: "two",
    traits: ["Manipulate"],
    frequency: "1 vez por hora",
    effect: "Você conjura um fragmento do Nirvana em uma emanação de 9 metros, alterando temporariamente a paisagem em um prado relaxante por 1 minuto. As criaturas na área ganham +1 bônus de item em segurança de Vontades e teste de perícias baseado em Sabedoria, e têm cura rápida 2. Uma criatura na área que tenta realizar uma ação hostil deve passar num teste CD 28 de segurança de Vontade ou a ação hostil é impedida e as ações que eles teriam gasto são desperdiçadas.",
  },
    ],
  },
  "Passage Charm": {
    description: "This glossy black brooch is made of solidified shadows and is a gift, given by Avathrael Realmshaper to their aliados to allow them to navigate the heart of the forest within Gloaming Arbor. Enquanto estiver vestindo a passage charm, você pode cast _darkness_ as an innate occult magia twice per day.\n\n**Ativar—Moldar as sombras** 3 ações (manipular, earth, shadow)\n**Frequência** 1 vez ao dia\n**Requisitos** Você’re in an area that’s dark or dim light\n**Efeito** Você command the shadows to do seu bidding, forming a path, a ramp, a wall, or stairs. The _passage charm_ casts 5º posto _wall of stone_, except the magia loses the earth trait, gains the shadow trait, and has a duration of 24 hours, and the wall is created from solid shadows, rather than stone. If any section of the wall is exposed to bright light, that portion of the wall has its Hardness temporarily reduced by half (to Hardness 7).",
    activations: [
  {
    name: "Moldar as sombras",
    actionType: "three",
    traits: ["Manipulate","Earth","Shadow"],
    frequency: "1 vez ao dia",
    requirements: "Você está em uma área escura ou com pouca luz",
    effect: "Você comanda as sombras para fazerem o que quiser, formando um caminho, uma rampa, uma parede ou escadas. O _feitiço de passagem_ lança 5º posto _parede de pedra_, exceto que a magia perde o traço terra, ganha o traço sombra e tem duração de 24 horas, e a parede é criada a partir de sombras sólidas, ao invés de pedra. Se qualquer seção da parede for exposta à luz brilhante, essa parte da parede terá sua Dureza temporariamente reduzida pela metade (para Dureza 7).",
  },
    ],
  },
  "Paws of the Grogrisant": {
    description: "Botas feitas das patas do Manto do Grogrisant, encomendadas pela princesa Eutropia. +3 de item em Atletismo e em salvaguardas contra movimento forçado; ao investir, Força +1 ou sobe a +4.\n\n**Ativar—Salto do grogrisant** 1 ação (concentrar)\n**Frequência** 1 vez ao dia\n**Efeito** The Grogrisant’s legendary strength and reflexes empower seu movement. Você Saltar, doubling the vertical and horizontal distance of seu Saltar ação. Se você land adjacent to a criatura, você pode Golpe that criatura once as part of this ação.",
    activations: [
  {
    name: "Salto do grogrisant",
    actionType: "one",
    traits: ["Concentrate"],
    frequency: "1 vez ao dia",
    effect: "A força e os reflexos lendários do Grogrisant fortalecem seus movimentos. Você Saltar, dobrando a distância vertical e horizontal do seu Saltar ação. Se você pousar ao lado de uma criatura, você pode pegar essa criatura uma vez como parte desta ação.",
  },
    ],
  },
  "Pendant of the Occult": {
    description: "Amuleto oco em forma de olho. +1 em Ocultismo e orientação inata.",
  },
  "Pendant of the Occult (Greater)": {
    description: "Versão maior: +2 em Ocultismo e mensagem onírica de 4º posto 1 vez ao dia.\n\n**Ativar—Mensagem onírica** [concentrate]/Traits.aspx?ID=32 (concentrar, manipular)\n**Frequência** 1 vez ao dia\n**Efeito** Você conjura a 4º posto _dream message_ magia.",
    activations: [
  {
    name: "Mensagem onírica",
    timeCost: "[concentrate]/Traits.aspx?ID=32",
    traits: ["Concentrate","Manipulate"],
    frequency: "1 vez ao dia",
    effect: "Você conjura a 4º posto _dream message_ magia.",
  },
    ],
  },
  "Perfected Robes": {
    description: "Manto branco com alfinetes de mão: não suja. Sem necessidade de comer, dormir ou beber (pode se quiser). Visão verdadeira constante (+32 de contraposição). Sem merecê-lo: desajeitado 3, enfraquecido 3 e estupefato 3; só a visão verdadeira funciona.\n\n**Ativar** ação livre (concentrar, destino)\n**Frequência** 1 vez por minuto\n**Efeito** Se vocêr next ação is to attempt a d20 roll with which você tem legendary proficiency, roll twice and take the better result. This is a fortune effect.\n\n**Ativar** 2 ações (concentrar)\n**Frequência** 1 vez ao dia\n**Efeito** Você conjura _avatar_, gaining the abilities for Irori. **Destruction** If the wearer ever willingly turns from the path of self-perfection into corruption or overindulgence, their _perfected robes_ crumble to nothing.",
    activations: [
  {
    name: "",
    actionType: "free",
    traits: ["Concentrate","Fortune"],
    frequency: "1 vez por minuto",
    effect: "Sua próxima ação é tentar um teste d20 com o qual você tem proficiência lendária, jogue duas vezes e obtenha o melhor resultado. Este é um efeito de sorte.",
  },
  {
    name: "",
    actionType: "two",
    traits: ["Concentrate"],
    frequency: "1 vez ao dia",
    effect: "Você conjura _avatar_, ganhando as habilidades para Irori. **Destruição** Se o usuário voluntariamente se desviar do caminho do autoaperfeiçoamento para a corrupção ou o excesso de indulgência, suas _mangas aperfeiçoadas_ desmoronarão em nada.",
  },
    ],
  },
  "Perfection's First Step": {
    description: "Manuscrito de palma incompleto. Gaste 10 minutos comentando-o; ao ativar, +1 de status em um teste de perícia de sabedoria nas próximas 24 horas.",
  },
  "Persona Mask": {
    description: "Máscara de alabastro que cobre o rosto sem cegar. +1 em Performance de palco e troca de personagem.\n\n**Ativar—Assumir papel** 1 ação (concentrar)\n**Efeito** Você change the mask's appearance into an artistic rendition of a dramatic character of seu choice.",
    activations: [
  {
    name: "Assumir papel",
    actionType: "one",
    traits: ["Concentrate"],
    effect: "Você muda a aparência da máscara para uma representação artística de um personagem dramático de sua escolha.",
  },
    ],
  },
  "Persona Mask (Greater)": {
    description: "Versão maior: +2 em Performance e rerrolagem de fortuna 1 vez ao dia.\n\n**Ativar—Sacrificar papel** reação (concentrar, destino)\n**Frequência** 1 vez ao dia\n**Gatilho** Você fail a Atuação teste that benefits from the mask's bônus\n**Efeito** Você change the mask's character and reroll the Atuação teste, using the second result.",
    activations: [
  {
    name: "Sacrificar papel",
    actionType: "reaction",
    traits: ["Concentrate","Fortune"],
    frequency: "1 vez ao dia",
    trigger: "Você é reprovado em um teste de Atuação que se beneficia dos bônus da máscara",
    effect: "Você muda o caráter da máscara e rola novamente o teste de Atuação, usando o segundo resultado.",
  },
    ],
  },
  "Philosopher": {
    description: "This bizarre machine is a complex arrangement of flasks, tubes, and other alchemical equipment. The _philosopher's extractor_ is designed to create the ultimate alchemical concoctions. The extractor functions as an exceptional alchemist's toolkit, granting a +4 bônus de item em Ofício testes related to alchemy. When using the extractor to Craft an alchemical item or with infused reagents as part of seu daily preparations, você pode create impeccable alchemical items. An impeccable alchemical item always uses the maximum numerical value possible for any rolls it requires, such as dealing maximum dano with alchemist's fire or restoring the maximum number of PV with an elixir of life. If the impeccable item has a duration, it lasts twice enquanto normal. Finally, an impeccable alchemical item never has a drawback.\n\n**Ativar—Síntese acelerada** 3 ações (manipular)\n**Frequência** 1 vez por minuto\n**Efeito** Você use the extractor to produce an alchemical item of seu level or lower whose formula você know. The extractor can create 56 levels' worth of items per day in this way. For example, the extractor could create two true elixirs of life (19th level) and two moderate elixirs of life (9th level), or eight comprehension elixirs (7th level), and so on.\n\n**Ativar—Transmogrifação de essência** (sleep, mutagens, polymorph)\n**Efeito** Você sofre a sizable portion of a criatura (at least two-thirds of its original mass) and filter it through the mechanisms of the extractor. After the end of the process, the _philosopher's extractor_ creates a transmogrifying mutagen that imparts the essence of the criatura to the drinker. The extractor can make several transmogrifying mutagens simultaneously using the same activation if enough mass is provided at once, up to a maximum of 10 concurrent mutagens. Drinking a transmogrifying mutagen imparts você with one of the criatura's unique abilities por 1 hora. This could grant one of several abilities such as a dragon's breath, darkvision, flight, frightful presence, or imunidade a sleep. The ability functions as it did for the original criatura, except it uses seu class CD or seu CD de magia (whichever is higher) em vez de the criatura's CD. The mutagen grants only abilities based on a criatura's physiology and never grants magic-related abilities such as magia inatas or spellcasting ability. The GM ultimately decides what ability a transmogrifying mutagen grants. Unlike normal for mutagens and polymorph effects, você pode drink multiple transmogrifying mutagens and gain benefits from each. When você drink transmogrifying mutagens made from different criaturas, você receive abilities from each criatura. When você drink multiple transmogrifying mutagens made from the same type of criatura, such as multiple mutagens made from trolls, você ganha an additional ability for each transmogrifying mutagen você drink, and the duration of the abilities from that criatura type increases by 1 hour for each additional concoction você drink. However, these additional benefits come with a risk; if você drink a transmogrifying mutagen while at least one other is active, after drinking it, você deve succeed at a teste simples with a CD equal to the total number of active transmogrifying mutagens você've consumed. On a failure, você fully transform into a member of the species of the latest transmogrifying mutagen você drank, and você almost always go berserk from seu change. The transformation may leave some amount of seu personality and memories intact, at the GM's discretion. **Destruction** Simultaneously feeding the _philosopher's extractor_ sizable portions of an aeon, angel, archon, azata, daemon, demon, devil, protean, and psychopomp, each of at least 14th level, along with a philosopher's stone causes the device to jam, overheat, and explode. Creatures within 18 m of the explosion deve passar num teste CD 55 salvaguarda de Reflexos or become covered in an alchemical slurry that transforms them into a horrifying amalgam of at least two of the criaturas used to destroy the machine.",
    activations: [
  {
    name: "Síntese acelerada",
    actionType: "three",
    traits: ["Manipulate"],
    frequency: "1 vez por minuto",
    effect: "Você usa o extrator para produzir um item alquímico de seu nível ou inferior cuja fórmula você conhece. O extrator pode criar itens no valor de 56 níveis por dia dessa maneira. Por exemplo, o extrator poderia criar dois elixires de vida verdadeiros (19º nível) e dois elixires de vida moderados (9º nível), ou oito elixires de compreensão (7º nível) e assim por diante.",
  },
  {
    name: "Transmogrifação de essência",
    traits: ["Sleep","Mutagens","Polymorph"],
    effect: "Você pega uma porção considerável de uma criatura (pelo menos dois terços de sua massa original) e a filtra através dos mecanismos do extrator. Após o término do processo, o _extrator do filósofo_ cria um mutagênico transmogrificante que transmite a essência da criatura ao bebedor. O extrator pode produzir vários mutagênicos transmogrificantes simultaneamente usando a mesma ativação se for fornecida massa suficiente de uma só vez, até um máximo de 10 mutagênicos simultâneos. Beber um mutagênico transmogrificante confere a você uma das habilidades únicas da criatura por 1 hora. Isso pode conceder uma das várias habilidades, como sopro de dragão, visão no escuro, vôo, presença assustadora ou imunidade ao sono. A habilidade funciona como para a criatura original, exceto que usa seu CD de classe ou seu CD de magia (o que for maior) em vez do CD da criatura. O mutagênico concede apenas habilidades baseadas na fisiologia da criatura e nunca concede habilidades relacionadas à magia, como magia inatas ou habilidade de lançamento de feitiços. Em última análise, o Mestre decide qual habilidade um mutagênico transmogrificante concede. Ao contrário do normal para efeitos mutagênicos e polimorfos, você pode beber vários mutagênicos transmogrificantes e obter benefícios de cada um. Quando você bebe mutagênicos transmogrificantes feitos de diferentes criaturas, você recebe habilidades de cada criatura. Quando você bebe vários mutagênicos transmogrificantes feitos do mesmo tipo de criatura, como múltiplos mutagênicos feitos de trolls, você ganha uma habilidade adicional para cada mutagênico transmogrificante que você bebe, e a duração das habilidades desse tipo de criatura aumenta em 1 hora para cada mistura adicional que você bebe. No entanto, estes benefícios adicionais apresentam um risco; se você beber um mutagênico transmogrificante enquanto pelo menos um outro estiver ativo, depois de bebê-lo, você deverá ter sucesso em um teste simples com um CD igual ao número total de mutagênicos transmogrificantes ativos que você consumiu. Em caso de falha, você se transforma totalmente em um membro da espécie do mais recente mutagênico transmogrificante que você bebeu, e você quase sempre enlouquece com sua mudança. A transformação pode deixar intactas algumas de suas personalidades e memórias, a critério do Mestre. **Destruição** Alimentar simultaneamente o _extrator filosofal_ com porções consideráveis ​​de um aeon, anjo, arconte, azata, daemon, demônio, diabo, protéico e psicopompo, cada um de pelo menos 14º nível, junto com uma pedra filosofal faz com que o dispositivo emperre, superaqueça e exploda. Criaturas dentro de 18 m da explosão devem passar num teste CD 55 salvaguarda de Reflexosos ou ficar cobertas por uma lama alquímica que as transforma em um amálgama horrível de pelo menos duas das criaturas usadas para destruir a máquina.",
  },
    ],
  },
  "Philosopher's Extractor": {
    description: "Aparato alquímico: +4 de item em Ofício de alquimia. Itens impecáveis (valor máximo, duração dobrada, sem desvantagem).\n\n**Ativar—Síntese acelerada** 3 ações (manipular)\n**Frequência** 1 vez por minuto\n**Efeito** Você use the extractor to produce an alchemical item of seu level or lower whose formula você know. The extractor can create 56 levels' worth of items per day in this way. For example, the extractor could create two true elixirs of life (19th level) and two moderate elixirs of life (9th level), or eight comprehension elixirs (7th level), and so on.\n\n**Ativar—Transmogrifação de essência** (sleep, mutagens, polymorph)\n**Efeito** Você sofre a sizable portion of a criatura (at least two-thirds of its original mass) and filter it through the mechanisms of the extractor. After the end of the process, the _philosopher's extractor_ creates a transmogrifying mutagen that imparts the essence of the criatura to the drinker. The extractor can make several transmogrifying mutagens simultaneously using the same activation if enough mass is provided at once, up to a maximum of 10 concurrent mutagens. Drinking a transmogrifying mutagen imparts você with one of the criatura's unique abilities por 1 hora. This could grant one of several abilities such as a dragon's breath, darkvision, flight, frightful presence, or imunidade a sleep. The ability functions as it did for the original criatura, except it uses seu class CD or seu CD de magia (whichever is higher) em vez de the criatura's CD. The mutagen grants only abilities based on a criatura's physiology and never grants magic-related abilities such as magia inatas or spellcasting ability. The GM ultimately decides what ability a transmogrifying mutagen grants. Unlike normal for mutagens and polymorph effects, você pode drink multiple transmogrifying mutagens and gain benefits from each. When você drink transmogrifying mutagens made from different criaturas, você receive abilities from each criatura. When você drink multiple transmogrifying mutagens made from the same type of criatura, such as multiple mutagens made from trolls, você ganha an additional ability for each transmogrifying mutagen você drink, and the duration of the abilities from that criatura type increases by 1 hour for each additional concoction você drink. However, these additional benefits come with a risk; if você drink a transmogrifying mutagen while at least one other is active, after drinking it, você deve succeed at a teste simples with a CD equal to the total number of active transmogrifying mutagens você've consumed. On a failure, você fully transform into a member of the species of the latest transmogrifying mutagen você drank, and você almost always go berserk from seu change. The transformation may leave some amount of seu personality and memories intact, at the GM's discretion. **Destruction** Simultaneously feeding the _philosopher's extractor_ sizable portions of an aeon, angel, archon, azata, daemon, demon, devil, protean, and psychopomp, each of at least 14th level, along with a philosopher's stone causes the device to jam, overheat, and explode. Creatures within 18 m of the explosion deve passar num teste CD 55 salvaguarda de Reflexos or become covered in an alchemical slurry that transforms them into a horrifying amalgam of at least two of the criaturas used to destroy the machine.",
    activations: [
  {
    name: "Síntese acelerada",
    actionType: "three",
    traits: ["Manipulate"],
    frequency: "1 vez por minuto",
    effect: "Você usa o extrator para produzir um item alquímico de seu nível ou inferior cuja fórmula você conhece. O extrator pode criar itens no valor de 56 níveis por dia dessa maneira. Por exemplo, o extrator poderia criar dois elixires de vida verdadeiros (19º nível) e dois elixires de vida moderados (9º nível), ou oito elixires de compreensão (7º nível) e assim por diante.",
  },
  {
    name: "Transmogrifação de essência",
    traits: ["Sleep","Mutagens","Polymorph"],
    effect: "Você pega uma porção considerável de uma criatura (pelo menos dois terços de sua massa original) e a filtra através dos mecanismos do extrator. Após o término do processo, o _extrator do filósofo_ cria um mutagênico transmogrificante que transmite a essência da criatura ao bebedor. O extrator pode produzir vários mutagênicos transmogrificantes simultaneamente usando a mesma ativação se for fornecida massa suficiente de uma só vez, até um máximo de 10 mutagênicos simultâneos. Beber um mutagênico transmogrificante confere a você uma das habilidades únicas da criatura por 1 hora. Isso pode conceder uma das várias habilidades, como sopro de dragão, visão no escuro, vôo, presença assustadora ou imunidade ao sono. A habilidade funciona como para a criatura original, exceto que usa seu CD de classe ou seu CD de magia (o que for maior) em vez do CD da criatura. O mutagênico concede apenas habilidades baseadas na fisiologia da criatura e nunca concede habilidades relacionadas à magia, como magia inatas ou habilidade de lançamento de feitiços. Em última análise, o Mestre decide qual habilidade um mutagênico transmogrificante concede. Ao contrário do normal para efeitos mutagênicos e polimorfos, você pode beber vários mutagênicos transmogrificantes e obter benefícios de cada um. Quando você bebe mutagênicos transmogrificantes feitos de diferentes criaturas, você recebe habilidades de cada criatura. Quando você bebe vários mutagênicos transmogrificantes feitos do mesmo tipo de criatura, como múltiplos mutagênicos feitos de trolls, você ganha uma habilidade adicional para cada mutagênico transmogrificante que você bebe, e a duração das habilidades desse tipo de criatura aumenta em 1 hora para cada mistura adicional que você bebe. No entanto, estes benefícios adicionais apresentam um risco; se você beber um mutagênico transmogrificante enquanto pelo menos um outro estiver ativo, depois de bebê-lo, você deverá ter sucesso em um teste simples com um CD igual ao número total de mutagênicos transmogrificantes ativos que você consumiu. Em caso de falha, você se transforma totalmente em um membro da espécie do mais recente mutagênico transmogrificante que você bebeu, e você quase sempre enlouquece com sua mudança. A transformação pode deixar intactas algumas de suas personalidades e memórias, a critério do Mestre. **Destruição** Alimentar simultaneamente o _extrator filosofal_ com porções consideráveis ​​de um aeon, anjo, arconte, azata, daemon, demônio, diabo, protéico e psicopompo, cada um de pelo menos 14º nível, junto com uma pedra filosofal faz com que o dispositivo emperre, superaqueça e exploda. Criaturas dentro de 18 m da explosão devem passar num teste CD 55 salvaguarda de Reflexosos ou ficar cobertas por uma lama alquímica que as transforma em um amálgama horrível de pelo menos duas das criaturas usadas para destruir a máquina.",
  },
    ],
  },
  "Pilferer": {
    description: "Made of soft and subtle black leather, these gloves fit tightly but aren't uncomfortable and don't impede seu sense of touch. As long as você're trained in Prestidigitação while wearing these gloves, você're always considered one skill rank higher than seu actual rank. Se você possess a Legendary skill rank in Prestidigitação, você ganha a +2 bônus de item em Prestidigitação testes instead. When você invest the gloves, você either increase seu Destreza modifier by 1 or increase it to +4, whichever would give você a higher value.\n\n**Ativar** reação (concentrar)\n**Frequência** 1 vez ao dia\n**Gatilho** Você fail or critically fail a Prestidigitação teste de perícia\n**Efeito** Se você falhared the Prestidigitação teste de perícia, você succeed at that teste instead. Se você falhar criticamenteed, você fail instead.",
    activations: [
  {
    name: "",
    actionType: "reaction",
    traits: ["Concentrate"],
    frequency: "1 vez ao dia",
    trigger: "Você fail ou critically fail a Prestidigitação teste de perícia",
    effect: "Se você falhou no teste de perícia de Prestidigitação, você terá sucesso nesse teste. Se você falhar criticamente, você falhará.",
  },
    ],
  },
  "Pilferer's Gloves": {
    description: "Luvas pretas justas. Se treinado em Prestidigitação, trate o grau como um acima. Se lendário, +2 de item em Prestidigitação. Ao investir: Destreza +1 ou até +4.\n\n**Ativar** reação (concentrar)\n**Frequência** 1 vez ao dia\n**Gatilho** Você fail or critically fail a Prestidigitação teste de perícia\n**Efeito** Se você falhared the Prestidigitação teste de perícia, você succeed at that teste instead. Se você falhar criticamenteed, você fail instead.",
    activations: [
  {
    name: "",
    actionType: "reaction",
    traits: ["Concentrate"],
    frequency: "1 vez ao dia",
    trigger: "Você fail ou critically fail a Prestidigitação teste de perícia",
    effect: "Se você falhou no teste de perícia de Prestidigitação, você terá sucesso nesse teste. Se você falhar criticamente, você falhará.",
  },
    ],
  },
  "Planar Tunnel": {
    description: "Mecanismo colapsável ligado a um corredor extradimensional na fronteira de um plano específico. Abrir outro espaço extradimensional dentro rasga uma fenda, destrói ambos e manda criaturas e objetos soltos ao plano (Reflexos CD 30 evita).\n\n**Ativar** 3 ações (manipular)\n**Efeito** Você open the collapsed mechanism to fully open the tunnel, revealing an extradimensional space that stays in place. The tunnel is 6 pés across—just big enough to cover a 1,5 m square—and 3 m deep. The passage’s depth is perpendicular to the surface, so it’s most commonly placed on a floor to make a hole straight down or on a wall to create a horizontal passage through it. The atmosphere is hospitable to travel even if the keyed plane wouldn’t be. Anyone adjacent to either edge of the tunnel can Interact to collapse the opening. This closes both entrances to the extradimensional space. Any objects or criaturas within the tunnel remain inside, and any that can’t fit fully inside are ejected into the nearest open space. No matter how many items are in the planar tunnel, its Volume never changes. Items can be stowed or retrieved only while the tunnel is fully open. When the tunnel is closed, the interior remains a stable environment por 10 minutos, after which any criatura or object inside is subjected to the environment of the keyed plane as it seeps through the boundary. A criatura viva placed inside can attempt to Escapar against a CD of 13. An item inside the tunnel provides no benefits unless it’s retrieved first. Anything in the tunnel can’t be detected by magic that detects only things on the same plane. **Special** A _planar tunnel_ can be used as a planar key for the _interplanar teleport_ magia, and has the same rarity as the key, as specified in the magia.",
    activations: [
  {
    name: "",
    actionType: "three",
    traits: ["Manipulate"],
    effect: "Você abre o mecanismo colapsado para abrir totalmente o túnel, revelando um espaço extradimensional que permanece no lugar. O túnel tem 1,8 m de diâmetro – grande o suficiente para cobrir um quadrado de 1,5 m – e 3 m de profundidade. A profundidade da passagem é perpendicular à superfície, por isso é mais comumente colocada no chão para fazer um buraco direto para baixo ou na parede para criar uma passagem horizontal através dela. A atmosfera é hospitaleira para viajar, mesmo que o avião programado não esteja. Qualquer pessoa adjacente a qualquer borda do túnel pode fazer Interagir para derrubar a abertura. Isto fecha ambas as entradas para o espaço extradimensional. Quaisquer objetos ou criaturas dentro do túnel permanecem dentro, e aqueles que não cabem totalmente dentro são ejetados para o espaço aberto mais próximo. Não importa quantos itens estejam no túnel planar, seu Volume nunca muda. Os itens só podem ser guardados ou recuperados enquanto o túnel estiver totalmente aberto. Quando o túnel é fechado, o interior permanece um ambiente estável por 10 minutos, após os quais qualquer criatura ou objeto dentro dele fica sujeito ao ambiente do plano chaveado à medida que penetra através da fronteira. Uma criatura viva colocada dentro dele pode tentar Escapar contra um CD de 13. Um item dentro do túnel não oferece benefícios a menos que seja recuperado primeiro. Qualquer coisa no túnel não pode ser detectada pela magia que detecta apenas coisas no mesmo plano. **Especial** Um _túnel planar_ pode ser usado como uma chave planar para a magia de _teleporte interplanar_ e tem a mesma raridade da chave, conforme especificado na magia.",
  },
    ],
  },
  "Pocket Stage": {
    description: "Miniatura de teatro com bolso de cenário e bonecos de papel. Ao\n\n**Ativar—Brincar com bonecas** (concentrar, manipular, structure)\n**Efeito** Você place the miniature theater on the ground, filling it with any set dressing and up to six figures você choose. Then, você tap a rhythm on the miniature, causing it to grow into a modest stage 6 m wide and 4,5 m deep. It's dressed with the decorations você selected, and simple mannequins wear the costumes você chose. A wooden proscenium arch frames the stage, and simple curtains along the sides conceal the wings. As a magical structure, the stage has the structure trait. All the stage's set dressing is illusory and disappears if taken more than 6 m from the stage. The costumes are physical but with illusory embellishments that fade at the same range, revealing only plain, white smocks.",
    activations: [
  {
    name: "Brincar com bonecas",
    traits: ["Concentrate","Manipulate","Structure"],
    effect: "Você coloca o teatro em miniatura no chão, preenchendo-o com qualquer cenário e até seis figuras que você escolher. Em seguida, você bate um ritmo na miniatura, fazendo com que ela cresça até se tornar um modesto palco de 6 m de largura e 4,5 m de profundidade. Está vestido com as decorações que você escolheu, e manequins simples usam os trajes que você escolheu. Um arco de proscênio de madeira emoldura o palco, e cortinas simples nas laterais escondem as asas. Por ser uma estrutura mágica, o palco possui o traço de estrutura. Toda a decoração do cenário é ilusória e desaparece se for afastada a mais de 6 m do palco. Os trajes são físicos, mas com enfeites ilusórios que desaparecem na mesma faixa, revelando apenas aventais brancos e lisos.",
  },
    ],
  },
  "Pocket Watch of Stethelos": {
    description: "Relógio de bolso de latão com mecanismo de corda complexo; nome no verso e números numa língua desconhecida. Uso repetido atrai criaturas terríveis da Dimensão do Tempo.\n\n**Ativar—Roubar um segundo** 1 ação (manipular)\n**Frequência** 1 vez ao dia\n**Efeito** Você manipulate time around an aliado within 9 m, allowing them to perceive time differently for a moment. O alvo is acelerado por 1 rodada and can use the ação only to Step or Avançar.\n\n**Ativar—Passo entre os tiques** 2 ações (manipular)\n**Frequência** 1 vez ao dia\n**Efeito** Você ganha 3 ações, each of which must be immediately used to Saltar, Stand, Step, or Avançar. If você tem an appropriate Speed, você pode add Cavar, Escalar, Voar, or Nadar to this list. While você sofre these ações, time pauses. All other criaturas are completely unaware of seu ações, can’t speak, and can’t use any ações that would be triggered by seu movements. While você’re taking these ações, você pode’t take any other ações, including any that would be triggered by the move ações. Once the ações are complete, time starts again, and to onlookers, você seem to have suddenly teleported across the distance você traveled.",
    activations: [
  {
    name: "Roubar um segundo",
    actionType: "one",
    traits: ["Manipulate"],
    frequency: "1 vez ao dia",
    effect: "Você manipula o tempo em torno de um aliado em um raio de 9 m, permitindo que ele perceba o tempo de maneira diferente por um momento. O alvo é acelerado por 1 rodada e pode usar a ação apenas para Passo ou Avançar.",
  },
  {
    name: "Passo entre os tiques",
    actionType: "two",
    traits: ["Manipulate"],
    frequency: "1 vez ao dia",
    effect: "Você ganha 3 ações, cada uma das quais deve ser usada imediatamente para Saltar, Stand, Passo ou Avançar. Se você tiver um Deslocamento apropriado, poderá adicionar Cavar, Escalar, Voar ou Nadar a esta lista. Enquanto você sofre essas ações, o tempo faz uma pausa. Todas as outras criaturas desconhecem completamente suas ações, não podem falar e não podem usar quaisquer ações que seriam desencadeadas por seus movimentos. Enquanto você estiver realizando essas ações, você não poderá realizar quaisquer outras ações, incluindo aquelas que seriam acionadas pela movimentação de ações. Assim que as ações são concluídas, o tempo recomeça e, para os espectadores, você parece ter se teletransportado repentinamente pela distância que percorreu.",
  },
    ],
  },
  "Possibility Tome": {
    description: "Tomo pesado de prata e cobre com pedras semipreciosas. Folhear por 10 minutos enche as páginas com o tema escolhido e concede +3 de bônus de item ao Recordar conhecimento naquela perícia enquanto as páginas estiverem cheias.\n\n**Ativar—Folhear** (concentrar, manipular)\n**Efeito** As você flip through the book, você think about a broad topic você want to know more about. Choose one skill: Arcanismo, Ofício, Medicina, Natureza, Ocultismo, Religião, Sociedade, or a single subcategory of Lore. The book's pages fill with information about that skill, though only você pode see the information. While the pages are full, você pode spend an Interact ação perusing the book just before attempting a teste to Recordar Conhecimento with the chosen skill. This concede a você a +3 bônus de item em the teste, and if você roll a critical failure, você get a failure instead. The information within the book disappears after 24 hours or when the tome is activated again.",
    activations: [
  {
    name: "Folhear",
    traits: ["Concentrate","Manipulate"],
    effect: "Ao folhear o livro, você pensa em um tópico amplo sobre o qual deseja saber mais. Escolha uma perícia: Arcanismo, Ofício, Medicina, Natureza, Ocultismo, Religião, Sociedade ou uma única subcategoria de Lore. As páginas do livro estão repletas de informações sobre essa habilidade, embora somente você possa ver as informações. Enquanto as páginas estão cheias, você pode passar uma ação Interagir folheando o livro antes de tentar um teste para Recordar Conhecimento com a habilidade escolhida. Isso concede a você um bônus de +3 de item no teste, e se você obtiver uma falha crítica, você receberá uma falha. As informações contidas no livro desaparecem após 24 horas ou quando o livro é ativado novamente.",
  },
    ],
  },
  "Prankster": {
    description: "Although the simple pies that fill this glass plate every minute are edible, they don’t last long enough to sate hunger or provide any real nutritive value. Instead, they can be magically guided at targets, unleashed harmlessly by even the most uncoordinated child.\n\n**Ativar—Projetar pastel** 1 ação (manipular)\n**Frequência** 1 vez por minuto\n**Efeito** Você magically hurl the pie at a criatura within 9 m. Unless o alvo succeeds at a CD 15 salvaguarda de Reflexos, they're splattered with a harmless but tasty mess, which remains until it is wiped away with an Interact ação or is otherwise cleaned off (like if o alvo is submerged in water). After a minute, the mess disappears, and the pieplate refills with another kind of pie.",
    activations: [
  {
    name: "Projetar pastel",
    actionType: "one",
    traits: ["Manipulate"],
    frequency: "1 vez por minuto",
    effect: "Você magicamente arremessa a torta em uma criatura a até 9 m. A menos que o alvo tenha sucesso em um CD 15 salvaguarda de Reflexosos, eles ficam salpicados com uma bagunça inofensiva, mas saborosa, que permanece até que seja limpa com uma ação Interagir ou seja limpa de outra forma (como se o alvo estivesse submerso em água). Depois de um minuto, a bagunça desaparece e a forma de torta é preenchida com outro tipo de torta.",
  },
    ],
  },
  "Prankster's Perpetual Pieplate": {
    description: "Prato de vidro que se enche de tortas simples a cada minuto: comestíveis, mas sem nutrir.\n\n**Ativar—Projetar pastel** 1 ação (manipular)\n**Frequência** 1 vez por minuto\n**Efeito** Você magically hurl the pie at a criatura within 9 m. Unless o alvo succeeds at a CD 15 salvaguarda de Reflexos, they're splattered with a harmless but tasty mess, which remains until it is wiped away with an Interact ação or is otherwise cleaned off (like if o alvo is submerged in water). After a minute, the mess disappears, and the pieplate refills with another kind of pie.",
    activations: [
  {
    name: "Projetar pastel",
    actionType: "one",
    traits: ["Manipulate"],
    frequency: "1 vez por minuto",
    effect: "Você magicamente arremessa a torta em uma criatura a até 9 m. A menos que o alvo tenha sucesso em um CD 15 salvaguarda de Reflexosos, eles ficam salpicados com uma bagunça inofensiva, mas saborosa, que permanece até que seja limpa com uma ação Interagir ou seja limpa de outra forma (como se o alvo estivesse submerso em água). Depois de um minuto, a bagunça desaparece e a forma de torta é preenchida com outro tipo de torta.",
  },
    ],
  },
  "Predictable Silver Piece": {
    description: "This seemingly unremarkable, weathered silver coin bears the bust of an unnamed monarch on the face and a majestic bird on the tail. Você pode toss the coin without activating it, in which case it follows the normal laws of probability.\n\n**Ativar—Trapacear o destino** 1 ação (manipular)\n**Efeito** Você rub seu thumb on one side of the coin with the intent of slightly tweaking the strands of fate, then flip the coin into the air in a coin toss. No matter how the toss is resolved—letting the coin fall to the ground, slapping it down on the back of seu hand, or catching it on seu open palm—it always lands with the side você rubbed face up.",
    activations: [
  {
    name: "Trapacear o destino",
    actionType: "one",
    traits: ["Manipulate"],
    effect: "Você esfrega o polegar em um lado da moeda com a intenção de ajustar levemente os fios do destino e, em seguida, joga a moeda no ar em um sorteio. Não importa como o lançamento seja resolvido – deixando a moeda cair no chão, batendo-a nas costas da mão ou pegando-a com a palma aberta – ela sempre cai com o lado que você esfregou voltado para cima.",
  },
    ],
  },
  "Primeval Mistletoe": {
    description: "Ramo de azevinho e visco que não murcha. Lócus primordial, +1 em Natureza, arma/corpo rúnico e um com as plantas.\n\n**Ativar—Ungir** 2 ações (manipular)\n**Frequência** 1 vez a cada 10 minutos\n**Efeito** Você squeeze juice from one of the berries and smear it onto a arma made primarily of wood to cast _runic weapon_ on it, or onto a criatura to cast _runic body_ on it.\n\n**Ativar—Vincular** 2 ações (manipular)\n**Frequência** 1 vez ao dia\n**Efeito** Você touch the sprig, then a tree to cast _one with plants_ upon yourself, turning into a vine on the touched tree.",
    activations: [
  {
    name: "Ungir",
    actionType: "two",
    traits: ["Manipulate"],
    frequency: "1 vez a cada 10 minutos",
    effect: "Você espreme o suco de uma das frutas e espalha-o em uma arma feita principalmente de madeira para lançar _arma rúnica_ nela, ou em uma criatura para lançar _corpo rúnico_ nela.",
  },
  {
    name: "Vincular",
    actionType: "two",
    traits: ["Manipulate"],
    frequency: "1 vez ao dia",
    effect: "Você toca o galho, depois uma árvore para lançar _um com plantas_ sobre você, transformando-se em uma videira na árvore tocada.",
  },
    ],
  },
  "Primeval Mistletoe (Greater)": {
    description: "Versão maior: +2 em Natureza, unção em 6º posto, e campo de vida 1 vez ao dia.\n\n**Ativar—Cultivar** 2 ações (manipular)\n**Frequência** 1 vez ao dia\n**Efeito** Você plant the _greater primeval mistletoe_ into an area of natural earth or stone. Once planted, the plant immediately sprouts into an area of holly bushes that don't impede movement and that pulse with vitality energy, replicating the effects of a _field of life_ magia. Você pode Sustain the activation up to 1 minute. When this magic ends, the holly bushes revert back into the original _greater primeval mistletoe_.",
    activations: [
  {
    name: "Cultivar",
    actionType: "two",
    traits: ["Manipulate"],
    frequency: "1 vez ao dia",
    effect: "Você planta o _maior visco primitivo_ em uma área de terra natural ou pedra. Depois de plantada, a planta brota imediatamente em uma área de arbustos de azevinho que não impedem o movimento e que pulsam com energia vital, replicando os efeitos de uma magia _campo de vida_. Você pode sustentar a ativação por até 1 minuto. Quando essa magia termina, os arbustos de azevinho voltam ao _grande visco primitivo_ original.",
  },
    ],
  },
  "Prismatic Dust": {
    description: "Pó pigmentado. Ativar adjacente a luz mágica intensa: a luz muda para a cor do pó por 1 hora ou até dissipar.",
  },
  "Pristine Epaulets": {
    description: "Dragonas garridas e reluzentes, claramente nunca viram campo de batalha. Oficiais com mais estudo ou conexões que experiência. +1 de item em Sociedade e Conhecimento de Guerra.\n\n**Ativar—Eu quis dizer** reação (concentrar, destino)\n**Frequência** 1 vez ao dia\n**Gatilho** Você critically fail a Diplomacia teste\n**Efeito** The _pristine epaulets_ are often worn to both tense military negotiations and social events and can help você recover from a misstep. Você pode reroll the teste, but você deve take the new result.",
    activations: [
  {
    name: "Eu quis dizer",
    actionType: "reaction",
    traits: ["Concentrate","Fortune"],
    frequency: "1 vez ao dia",
    trigger: "Você critically fail a Diplomacia teste",
    effect: "As _drapas imaculadas_ são frequentemente usadas tanto em negociações militares tensas quanto em eventos sociais e podem ajudá-lo a recuperar um passo em falso. Você pode rolar novamente o teste, mas deve pegar o novo resultado.",
  },
    ],
  },
  "Prognostic Veil": {
    description: "Véu roxo com símbolos divinatórios. +2 de item em Religião. Ponto de foco de revelação 1 vez ao dia; torcer o destino numa salvaguarda se estiver ligado à maldição.\n\n**Ativar—Lembrar o futuro** ação livre (concentrar)\n**Frequência** 1 vez ao dia\n**Efeito** Você ganha 1 ponto de foco, que você só pode gastar para conjurar a revelation magia. Se você don't spend this ponto de foco by the end of this turno, it's lost.\n\n**Ativar—Torcer os fios do destino** reação (concentrar, cursebound)\n**Frequência** oncer per day\n**Gatilho** An aliado within 9 m is about to attempt a salvaguarda\n**Requisitos** Você tem the cursebound condition\n**Efeito** The aliado gains a bônus de status em the salvaguarda equal to the value of seu cursebound condition.",
    activations: [
  {
    name: "Lembrar o futuro",
    actionType: "free",
    traits: ["Concentrate"],
    frequency: "1 vez ao dia",
    effect: "Você ganha 1 ponto de foco, que você só pode gastar para conjurar uma revelação mágica. Se você não passar esse ponto de foco até o final desse turno, ele está perdido.",
  },
  {
    name: "Torcer os fios do destino",
    actionType: "reaction",
    traits: ["Concentrate","Cursebound"],
    frequency: "oncer per day",
    trigger: "Um aliado num raio de 9 m está prestes a tentar uma salvaguarda",
    requirements: "Você tem a condição de maldição vinculada",
    effect: "O aliado ganha um bônus de status em segurança igual ao valor de sua condição de maldição vinculada.",
  },
    ],
  },
  "Prognostic Veil (Greater)": {
    description: "+3 de item em Religião. Ponto de foco de revelação 1 vez ao dia; torcer o destino em golpe ou salvaguarda.\n\n**Ativar—Lembrar o futuro** ação livre (concentrar)\n**Frequência** 1 vez ao dia\n**Efeito** Você ganha 1 ponto de foco, que você só pode gastar para conjurar a revelation magia. Se você don't spend this ponto de foco by the end of this turno, it's lost.\n\n**Ativar—Torcer os fios do destino** reação (concentrar, cursebound)\n**Frequência** oncer per day\n**Gatilho** An aliado within 9 m is about to attempt a salvaguarda\n**Requisitos** Você tem the cursebound condition\n**Efeito** The aliado gains a bônus de status em the salvaguarda equal to the value of seu cursebound condition.",
    activations: [
  {
    name: "Lembrar o futuro",
    actionType: "free",
    traits: ["Concentrate"],
    frequency: "1 vez ao dia",
    effect: "Você ganha 1 ponto de foco, que você só pode gastar para conjurar uma revelação mágica. Se você não passar esse ponto de foco até o final desse turno, ele está perdido.",
  },
  {
    name: "Torcer os fios do destino",
    actionType: "reaction",
    traits: ["Concentrate","Cursebound"],
    frequency: "oncer per day",
    trigger: "Um aliado num raio de 9 m está prestes a tentar uma salvaguarda",
    requirements: "Você tem a condição de maldição vinculada",
    effect: "O aliado ganha um bônus de status em segurança igual ao valor de sua condição de maldição vinculada.",
  },
    ],
  },
  "Propulsive Boots": {
    description: "Botas vermelhas. +5 pés no deslocamento terrestre e em escalada/nado. 1 vez ao dia, acelerado para se mover.\n\n**Ativar—Pisada aceleradora** 1 ação (manipular)\n**Frequência** 1 vez ao dia\n**Efeito** Você stomp three times and gain the acelerado condition por 1 minuto. Você pode use the extra ação to Avançar, Escalar, or Nadar. (Você deve still attempt an Atletismo teste for the Escalar and Nadar ações unless você tem the appropriate movement type.)",
    activations: [
  {
    name: "Pisada aceleradora",
    actionType: "one",
    traits: ["Manipulate"],
    frequency: "1 vez ao dia",
    effect: "Você pisa três vezes e ganha a condição acelerada por 1 minuto. Você pode usar a ação extra para Avançar, Escalar ou Nadar. (Você ainda deve tentar um teste de Atletismo para as ações Escalar e Nadar, a menos que tenha o tipo de movimento apropriado.)",
  },
    ],
  },
  "Protective Netting": {
    description: "Redes encantadas sobre chapéus largos, contra enxames. Se fosse exposto a doença ou veneno de ferimento por um ataque, teste simples CD 17; no sucesso, não é exposto.\n\n**Ativar—Rede esvoaçante** reação (manipular)\n**Frequência** 1 vez ao dia\n**Gatilho** A enxame enters seu space\n**Efeito** Seu _protective netting_ flutters rapidly, keeping the enxame away. Você ganha +1 bônus de item em salvaguardas against effects originating from enxames por 1 minuto.",
    activations: [
  {
    name: "Rede esvoaçante",
    actionType: "reaction",
    traits: ["Manipulate"],
    frequency: "1 vez ao dia",
    trigger: "A enxame enters seu space",
    effect: "Sua _rede protetora_ se agita rapidamente, afastando o enxame. Você ganha +1 de bônus de item em salvaguardas contra efeitos originados de enxames por 1 minuto.",
  },
    ],
  },
  "Purifying Spoon (Ladle)": {
    description: "Concha de madeira com frase de sorte no cabo, boa para servir refeições.\n\n**Ativar—Purificar** 2 ações (manipular)\n**Frequência** 1 vez ao dia\n**Efeito** Você stir the spoon in food or drink, casting _cleanse cuisine_ on the substance as você stir. This small spoon can purify up to 1 gallon of food or drink.",
    activations: [
  {
    name: "Purificar",
    actionType: "two",
    traits: ["Manipulate"],
    frequency: "1 vez ao dia",
    effect: "Você mexe a colher na comida ou na bebida, lançando _cozinha limpa_ na substância enquanto mexe. Esta colher pequena pode purificar até 1 galão de comida ou bebida.",
  },
    ],
  },
  "Purifying Spoon (Tablespoon)": {
    description: "A phrase of luck is carved into the handle of this wooden teaspoon. While a variety of other cutlery with similar properties exists, a spoon is often the most convenient and inconspicuous to carry. This larger spoon can purify up to 8 gallons of food or drink.\n\n**Ativar—Purificar** 2 ações (manipular)\n**Frequência** 1 vez ao dia\n**Efeito** Você stir the spoon in food or drink, casting _cleanse cuisine_ on the substance as você stir. This small spoon can purify up to 1 gallon of food or drink.",
    activations: [
  {
    name: "Purificar",
    actionType: "two",
    traits: ["Manipulate"],
    frequency: "1 vez ao dia",
    effect: "Você mexe a colher na comida ou na bebida, lançando _cozinha limpa_ na substância enquanto mexe. Esta colher pequena pode purificar até 1 galão de comida ou bebida.",
  },
    ],
  },
  "Purifying Spoon (Teaspoon)": {
    description: "A phrase of luck is carved into the handle of this wooden teaspoon. While a variety of other cutlery with similar properties exists, a spoon is often the most convenient and inconspicuous to carry.\n\n**Ativar—Purificar** 2 ações (manipular)\n**Frequência** 1 vez ao dia\n**Efeito** Você stir the spoon in food or drink, casting _cleanse cuisine_ on the substance as você stir. This small spoon can purify up to 1 gallon of food or drink.",
    activations: [
  {
    name: "Purificar",
    actionType: "two",
    traits: ["Manipulate"],
    frequency: "1 vez ao dia",
    effect: "Você mexe a colher na comida ou na bebida, lançando _cozinha limpa_ na substância enquanto mexe. Esta colher pequena pode purificar até 1 galão de comida ou bebida.",
  },
    ],
  },
  "Pusk Bone Tiles": {
    description: "Catalisador de ossos de pusk. Ao esmagar o pó e soprá-lo ao conjurar escudo, o escudo vira baluarte ósseo com o rosto do demônio. Ao usar Bloquear com Escudo, explode: criaturas adjacentes que falhem em Reflexos CD 16 sofrem 1d4 sangramento persistente profano (Interagir para remover os estilhaços).",
  },
  "Quickened Standard": {
    description: "This magical banner flaps enthusiastically in the breeze, gleaming across the battlefield. While holding a acelerado standard, você pode use the following ability.\n\n**Ativar—Acelerar** 1 ação (concentrar)\n**Frequência** 1 vez por minuto\n**Efeito** The banner offers a magical boost of adrenaline. An aliado within the banner’s aura becomes acelerado por 1 rodada and can use the additional ação only to Avançar.",
    activations: [
  {
    name: "Acelerar",
    actionType: "one",
    traits: ["Concentrate"],
    frequency: "1 vez por minuto",
    effect: "O estandarte oferece um impulso mágico de adrenalina. Um aliado dentro da aura do estandarte passa a ser acelerado por 1 rodada e pode usar a ação adicional apenas para Avançar.",
  },
    ],
  },
  "Quicksilver Cloak": {
    description: "Manto levíssimo que parece refletir o astro do dia. +1 de circunstância em salvaguardas contra efeitos de luz.\n\n**Ativar—Deslizar através** 1 ação (concentrar)\n**Frequência** 1 vez a cada 10 minutos\n**Efeito** Staring down the criatura before você, você center seu shot, shooting it through one of the silver spheres floating about você. Faça um Golpe à distância against an inimigo. The attack is treated as silver.",
    activations: [
  {
    name: "Deslizar através",
    actionType: "one",
    traits: ["Concentrate"],
    frequency: "1 vez a cada 10 minutos",
    effect: "Olhando para a criatura à sua frente, você centraliza seu tiro, atirando-o através de uma das esferas prateadas flutuando ao seu redor. Faça um Golpe à distância contra um inimigo. O ataque é tratado como prata.",
  },
    ],
  },
  "Reading Glyphs": {
    description: "Glifos nos dedos ou têmporas. +1 de item em Sociedade para Decifrar escrita.\n\n**Ativar** 1 ação (concentrar)\n**Frequência** 1 vez ao dia\n**Efeito** Você sync the tattoos with the text seu fingertips are touching. By running seu fingers across the text, você translate it, with glyphs on seu knuckles showing the translation in a language você pode read. Seu tattooed glyphs can't translate encrypted or encoded text, language couched in metaphor, and the like, subject to GM discretion.",
    activations: [
  {
    name: "",
    actionType: "one",
    traits: ["Concentrate"],
    frequency: "1 vez ao dia",
    effect: "Você sincroniza as tatuagens com o texto que as pontas dos dedos estão tocando. Ao passar os dedos pelo texto, você o traduz, com glifos nos nós dos dedos mostrando a tradução em um idioma que você pode ler. Seus glifos tatuados não podem traduzir texto criptografado ou codificado, linguagem expressa em metáforas e similares, sujeito ao critério do GM.",
  },
    ],
  },
  "Reflecting Shield": {
    description: "This high-grade silver buckler (Hardness 6, HP 24, BT 12) is polished to a mirrorlike sheen. The shield functions as a spellguard shield that can also reflect magias.\n\n**Ativar—Refletir magia** reação (concentrar)\n**Frequência** 1 vez ao dia\n**Gatilho** Você're targetd by a magia\n**Requisitos** The _reflecting shield is raised_\n**Efeito** Você attempt to reflect the magia on its caster. The shield attempts to counteract the magia, with a counteract rank of 9th and a counteract modifier of +30. If the magia is successfully counteracted, it's turned back on its caster.",
    activations: [
  {
    name: "Refletir magia",
    actionType: "reaction",
    traits: ["Concentrate"],
    frequency: "1 vez ao dia",
    trigger: "Você está targetd by a magia",
    requirements: "O _escudo refletor está levantado_",
    effect: "Você tenta refletir a magia em seu conjurador. O escudo tenta neutralizar a magia, com uma classificação de neutralização de 9º e um modificador de neutralização de +30. Se a magia for neutralizada com sucesso, ela será devolvida ao seu conjurador.",
  },
    ],
  },
  "Resonant Guitar": {
    description: "Violão todo de metal, instrumento portátil virtuoso: +2 de item em Atuação ao usá-lo. Chave planar para o Plano do Metal: chega a 1d6×25 milhas do destino (em vez de 1d10×25).\n\n**Ativar—Dedilhado de trovão** (manipular)\n**Frequência** 1 vez ao dia\n**Efeito** Você play a magnetic tune, enchanting one metallic arma within 18 m of você. Este item gains the _thundering_ rune por 1 hora.\n\n**Ativar—Acorde de proteção** reação (manipular)\n**Frequência** 1 vez ao dia\n**Gatilho** A criatura within 9 m of você targets você or an aliado with a melee attack\n**Efeito** Você strike a piercing chord, putting up an invisível sound barrier between o alvo and the attacker. O alvo gains a +2 bônus de status em AC against the triggering attack. If the Golpe still hits, the barrier breaks, dealing 3d10 dano sônico to the attacker.",
    activations: [
  {
    name: "Dedilhado de trovão",
    traits: ["Manipulate"],
    frequency: "1 vez ao dia",
    effect: "Você toca uma melodia magnética, encantando uma arma metálica a até 18 m de você. Este item ganha a runa _trovão_ por 1 hora.",
  },
  {
    name: "Acorde de proteção",
    actionType: "reaction",
    traits: ["Manipulate"],
    frequency: "1 vez ao dia",
    trigger: "Uma criatura a até 9 m de você ataca você ou um aliado com um ataque corpo a corpo",
    effect: "Você toca um acorde penetrante, colocando uma barreira sonora invisível entre o alvo e o atacante. O alvo ganha +2 bônus de status em CA contra o ataque desencadeador. Se o Golpe ainda acertar, a barreira quebra, causando 3d10 de dano sônico ao atacante.",
  },
    ],
  },
  "Resonating Crystal Boots": {
    description: "Botas de couro flexível cravejadas de cristais miúdos.\n\n**Ativar—Passos tilintantes** 1 ação (auditivo, concentrar, sonic, sonic)\n**Frequência** 1 vez ao dia\n**Efeito** Avançar up to half seu Speed. The crystals ring out with pleasant-sounding chimes that reverberate painfully in the ears of others. Each criatura that você pass adjacent to during seu Avançar takes 4d8 dano sônico (CD 24 Fortitude básico save); a criatura takes this dano only once. A criatura who critically fails the save is also surdo por 1 minuto.",
    activations: [
  {
    name: "Passos tilintantes",
    actionType: "one",
    traits: ["Auditory","Concentrate","Sonic","Sonic"],
    frequency: "1 vez ao dia",
    effect: "Avançar até metade do seu Deslocamento. Os cristais soam com sons agradáveis ​​que reverberam dolorosamente nos ouvidos dos outros. Cada criatura que você passar adjacente durante seu Avançar leva 4d8 de dano sônico (CD 24 Fortitude básico save); uma criatura sofre esse dano apenas uma vez. Uma criatura que falha criticamente no salvamento também é surda por 1 minuto.",
  },
    ],
  },
  "Retribution Axe": {
    description: "Machado grande +1 com crânio. Quando uma criatura o fere, o crânio toma o rosto dela: +2 de circunstância no próximo dano contra essa criatura até o fim do seu próximo turno (só o último que o feriu).",
  },
  "Retrieval Belt": {
    description: "Cinto de bolsos de pedra. Espaço extradimensional para 1 item de até 1 de Carga. Guardar e puxar com um gesto. Incomum.\n\n**Ativar—Guardar item** 1 ação (manipular)\n**Requisitos** There is room for an item in the belt\n**Efeito** One item você're holding with a Volume of 1 or less vanishes into the belt's extradimensional space.\n\n**Ativar—Recuperar item** ação livre (manipular)\n**Requisitos** An item is stored in the belt and você tem a free hand\n**Efeito** The item stored in the belt appears in seu hand. Neither Store Item nor Retrieve Item can be activated again por 1 minuto.",
    activations: [
  {
    name: "Guardar item",
    actionType: "one",
    traits: ["Manipulate"],
    requirements: "Há espaço para um item no cinto",
    effect: "Um item que você está segurando com Volume 1 ou menos desaparece no espaço extradimensional do cinto.",
  },
  {
    name: "Recuperar item",
    actionType: "free",
    traits: ["Manipulate"],
    requirements: "Um item é guardado no cinto e você tem a mão livre",
    effect: "O item guardado no cinto aparece em sua mão. Nem Armazenar Item nem Recuperar Item podem ser ativados novamente por 1 minuto.",
  },
    ],
  },
  "Retrieval Belt (Greater)": {
    description: "This belt is covered in small pouches that clasp with buttons of painstakingly carved stone. The belt is tied to an extradimensional space that can hold one item of 1 Volume or less. Anyone holding the belt can sense its contents, but only those who've invested it can store or retrieve items. Many retrieval belts are found with an item already inside. The belt can store up to three items at a time.\n\n**Ativar—Guardar item** 1 ação (manipular)\n**Requisitos** There is room for an item in the belt\n**Efeito** One item você're holding with a Volume of 1 or less vanishes into the belt's extradimensional space.\n\n**Ativar—Recuperar item** ação livre (manipular)\n**Requisitos** An item is stored in the belt and você tem a free hand\n**Efeito** The item stored in the belt appears in seu hand. Neither Store Item nor Retrieve Item can be activated again por 1 minuto.",
    activations: [
  {
    name: "Guardar item",
    actionType: "one",
    traits: ["Manipulate"],
    requirements: "Há espaço para um item no cinto",
    effect: "Um item que você está segurando com Volume 1 ou menos desaparece no espaço extradimensional do cinto.",
  },
  {
    name: "Recuperar item",
    actionType: "free",
    traits: ["Manipulate"],
    requirements: "Um item é guardado no cinto e você tem a mão livre",
    effect: "O item guardado no cinto aparece em sua mão. Nem Armazenar Item nem Recuperar Item podem ser ativados novamente por 1 minuto.",
  },
    ],
  },
  "Retrieval Belt (Major)": {
    description: "This belt is covered in small pouches that clasp with buttons of painstakingly carved stone. The belt is tied to an extradimensional space that can hold one item of 1 Volume or less. Anyone holding the belt can sense its contents, but only those who've invested it can store or retrieve items. Many retrieval belts are found with an item already inside. The belt can store up to 10 items at a time.\n\n**Ativar—Guardar item** 1 ação (manipular)\n**Requisitos** There is room for an item in the belt\n**Efeito** One item você're holding with a Volume of 1 or less vanishes into the belt's extradimensional space.\n\n**Ativar—Recuperar item** ação livre (manipular)\n**Requisitos** An item is stored in the belt and você tem a free hand\n**Efeito** The item stored in the belt appears in seu hand. Neither Store Item nor Retrieve Item can be activated again por 1 minuto.",
    activations: [
  {
    name: "Guardar item",
    actionType: "one",
    traits: ["Manipulate"],
    requirements: "Há espaço para um item no cinto",
    effect: "Um item que você está segurando com Volume 1 ou menos desaparece no espaço extradimensional do cinto.",
  },
  {
    name: "Recuperar item",
    actionType: "free",
    traits: ["Manipulate"],
    requirements: "Um item é guardado no cinto e você tem a mão livre",
    effect: "O item guardado no cinto aparece em sua mão. Nem Armazenar Item nem Recuperar Item podem ser ativados novamente por 1 minuto.",
  },
    ],
  },
  "Rhinoceros Mask": {
    description: "Máscara encouraçada com chifre grosso. Se Avançar pelo menos 3 m, o próximo Golpe corpo a corpo até o fim do turno ignora Dureza 5 ou menos (sem benefício se a Dureza for maior).",
  },
  "Rhinoceros Mask (Greater)": {
    description: "Máscara encouraçada com chifre grosso. Se Avançar pelo menos 3 m, o próximo Golpe corpo a corpo até o fim do turno ignora Dureza 10 ou menos (sem benefício se a Dureza for maior).",
  },
  "Rhyton of the Radiant Ifrit": {
    description: "Ríton de vidro vulcânico com gemas vermelhas. Funciona como caneca sem fundo (cerveja comum a cada esvaziada); sussurrar o nome do shuyookh ifrit anterior enche com a bebida favorita de qualquer plano.\n\n**Ativar—Um brinde!** 1 ação (manipular)\n**Efeito** Você raise a toast to a criatura or criaturas você're about to socialize with. Você ganha +2 bônus de item em Enganação, Diplomacia, or Intimidação testes against those criaturas por 1 hora.\n\n**Ativar—Comando do ifrit** 2 ações (concentrar)\n**Frequência** 1 vez ao dia\n**Efeito** An ifrit's hospitality always comes with an implied threat. Você cause the shuyookh to briefly appear and take its vengeance on those who would hurt você, the genie's “guest.” The shuyookh issues a 6º posto _command_ that targets all criaturas hostile to você in range em vez de the usual number of targets. The shuyookh issues the same command to all of them. Each alvo that fails its save also feels all nourishment leached from it, becoming fatigado enquanto it's affected by the _command_.",
    activations: [
  {
    name: "Um brinde!",
    actionType: "one",
    traits: ["Manipulate"],
    effect: "Você faz um brinde a uma criatura ou criatura com quem você está prestes a se socializar. Você ganha +2 bônus de item em Enganação, Diplomacia ou Intimidação testada contra essas criaturas por 1 hora.",
  },
  {
    name: "Comando do ifrit",
    actionType: "two",
    traits: ["Concentrate"],
    frequency: "1 vez ao dia",
    effect: "A hospitalidade de um ifrit sempre vem acompanhada de uma ameaça implícita. Você faz com que o shuyookh apareça brevemente e se vingue daqueles que machucariam você, o “convidado” do gênio. O shuyookh emite um 6º posto _comando_ que atinge todas as criaturas hostis a você ao alcance em vez do número normal de alvos. O shuyookh emite o mesmo comando para todos eles. Cada alvo que falha no salvamento também sente toda a nutrição drenada dele, ficando fatigado enquanto é afetado pelo _comando_.",
  },
    ],
  },
  "Ring of Climbing": {
    description: "Anel de ouro com garras. Escalada igual à metade do deslocamento terrestre.",
  },
  "Ring of Discretion": {
    description: "Anel que oculta armadura e armas na bainha (invisíveis ou como roupa comum), sem mudar o resto da aparência. Empunhar a arma a revela até guardá-la por 1 minuto. Procurar para descrer (CD 15); quem o acerta pode tentar descrer sem ação.",
  },
  "Ring of Lies": {
    description: "Anel de prata oleoso. +2 em Enganação. 1 vez ao dia, palavras melosas discretas. Incomum.\n\n**Ativar—Adoçar mentiras** 2 ações (manipular)\n**Frequência** 1 vez ao dia\n**Efeito** Snapping seu fingers on the hand that wears the ring causes the ring to cast _honeyed words_ on você with no visual manifestations of a magia being cast.",
    activations: [
  {
    name: "Adoçar mentiras",
    actionType: "two",
    traits: ["Manipulate"],
    frequency: "1 vez ao dia",
    effect: "Estalar os dedos na mão que usa o anel faz com que o anel lance _palavras melosas_ em você, sem nenhuma manifestação visual de magia sendo lançada.",
  },
    ],
  },
  "Ring of Maniacal Devices": {
    description: "Anel de latão. Kit de ladrão no anel; +2 para desarmar, abrir fechadura e fabricar ciladas.\n\n**Ativar—Armadilha de bola de fogo** (manipular)\n**Frequência** 1 vez ao dia\n**Efeito** Você create the effects of a _rune trap_ ritual containing _fireball_. Você pode have only one trapped rune from a ring of maniacal devices active at a time, even if você tem multiple rings, and the rune disappears if você lose seu investiture in the ring.",
    activations: [
  {
    name: "Armadilha de bola de fogo",
    traits: ["Manipulate"],
    frequency: "1 vez ao dia",
    effect: "Você cria os efeitos de um ritual de _armadilha rúnica_ contendo _bola de fogo_. Você pode ter apenas uma runa presa de um anel de dispositivos maníacos ativa por vez, mesmo se você tiver vários anéis, e a runa desaparece se você perder sua investidura no anel.",
  },
    ],
  },
  "Ring of Maniacal Devices (Greater)": {
    description: "This magic ring seems like simple tarnished brass, but it enhances seu curiosity about traps and devices of all kinds. Você pode use an Interact ação to pull a thieves' toolkit from the ring. This toolkit appears in seu hand and any part of it folds back into the ring if they would leave seu possession. They concedem a você a +2 bônus de item em Prestidigitação testes to Disable a Device and to Pick a Lock, and the ring's insights concedem a você the same bônus to Ofício testes to Craft and Repair snares and traps. The ring grants a +3 bônus. Activating it creates a rune trap containing seu choice of either a 7º posto _howling blizzard_ or a 7º posto _fireball_.\n\n**Ativar—Armadilha de bola de fogo** (manipular)\n**Frequência** 1 vez ao dia\n**Efeito** Você create the effects of a _rune trap_ ritual containing _fireball_. Você pode have only one trapped rune from a ring of maniacal devices active at a time, even if você tem multiple rings, and the rune disappears if você lose seu investiture in the ring.",
    activations: [
  {
    name: "Armadilha de bola de fogo",
    traits: ["Manipulate"],
    frequency: "1 vez ao dia",
    effect: "Você cria os efeitos de um ritual de _armadilha rúnica_ contendo _bola de fogo_. Você pode ter apenas uma runa presa de um anel de dispositivos maníacos ativa por vez, mesmo se você tiver vários anéis, e a runa desaparece se você perder sua investidura no anel.",
  },
    ],
  },
  "Ring of Sigils": {
    description: "Anel de prata com sigilos, inclusive o seu ao investir. Truque sigilo e rastreio do último símbolo.\n\n**Ativar—Rastrear sigilo** 1 ação (manipular)\n**Frequência** 1 vez a cada 10 minutos\n**Efeito** Você percebe a direção geral do mais recente _sigilo_ que você criou usando o anel. Esta ativação falha se o _sigilo_ estiver a mais de 8 km ou se houver chumbo ou água corrente entre você e o _sigilo_.",
    activations: [
  {
    name: "Rastrear sigilo",
    actionType: "one",
    traits: ["Manipulate"],
    frequency: "1 vez a cada 10 minutos",
    effect: "Você percebe a direção geral do mais recente _sigilo_ que você criou usando o anel. Esta ativação falha se o _sigilo_ estiver a mais de 8 km ou se houver chumbo ou água corrente entre você e o _sigilo_.",
  },
    ],
  },
  "Ring of Sigils (Greater)": {
    description: "Versão maior: rastreio a 100 milhas e informações se o alvo for uma criatura viva.\n\n**Ativar—Rastrear sigilo** 1 ação (manipular)\n**Frequência** 1 vez a cada 10 minutos\n**Efeito** Você percebe a direção geral do mais recente _sigilo_ que você criou usando o anel. Esta ativação falha se o _sigilo_ estiver a mais de 8 km ou se houver chumbo ou água corrente entre você e o _sigilo_.",
    activations: [
  {
    name: "Rastrear sigilo",
    actionType: "one",
    traits: ["Manipulate"],
    frequency: "1 vez a cada 10 minutos",
    effect: "Você percebe a direção geral do mais recente _sigilo_ que você criou usando o anel. Esta ativação falha se o _sigilo_ estiver a mais de 8 km ou se houver chumbo ou água corrente entre você e o _sigilo_.",
  },
    ],
  },
  "Ring of Sustenance": {
    description: "Anel de madeira polida. Depois de uma semana investida, você não precisa comer nem beber e dorme só 2 horas. Incomum.",
  },
  "Ring of Swimming": {
    description: "Anel de metal azul. Nado igual à metade do deslocamento terrestre.",
  },
  "Robe of Stone": {
    description: "Manto com padrões de geodo, solta poeira. Tremor impreciso 10 pés, petrano, come terra/gemas/metal.\n\n**Ativar—Tornar-se pedra** 2 ações (concentrar, manipular, polymorph)\n**Frequência** 1 vez ao dia\n**Efeito** The cloak casts _elemental form_ on você, transforming você into an earth elemental. In addition to the magia's normal effects, você pode Cavar through any earthen matter, including rock, moving at the magia's deslocamento de escavação, leaving no tunnels or signs of seu passing. Also, the range of the tremorsense você ganha from the robe increases to 9 m.",
    activations: [
  {
    name: "Tornar-se pedra",
    actionType: "two",
    traits: ["Concentrate","Manipulate","Polymorph"],
    frequency: "1 vez ao dia",
    effect: "O manto lança _forma elemental_ em você, transformando você em um elemental da terra. Além dos efeitos normais da magia, você pode cavar através de qualquer matéria terrena, incluindo rocha, movendo-se na posição de escavação da magia, sem deixar túneis ou sinais de sua passagem. Além disso, o alcance do tremorsense que você ganha com o manto aumenta para 9 m.",
  },
    ],
  },
  "Rune Of Sin": {
    description: "Glifo tasseloniano de um pecado — inveja, gula, ganância, luxúria, orgulho, preguiça ou ira — escolhido na criação. Ao Conjurar uma Magia da tradição arcana, a runa brilha e você ganha resistência 10 a dano de magias divinas até o início do seu próximo turno.",
  },
  "Sack of Hyrdra": {
    description: "This soft cotton bag has a drawstring of sinew and a jagged embroidery pattern around the mouth. Inside are a seemingly endless number of needle-sharp teeth.\n\n**Ativar—Semear um dente** 2 ações (manipular, occult)\n**Frequência** 1 vez por hora\n**Efeito** Você conjura forth a tooth from the bag, and where it lands, a skeleton springs up from the ground. This has the effect of _phantasmal minion_, except the minion appears as a visible skeleton.\n\n**Ativar—Punho cheio de presas** 2 ações (manipular, occult)\n**Frequência** 1 vez ao dia\n**Efeito** Você draw a whole handful of teeth and cast them to the ground, casting _rouse skeletons_ as a 5º posto magia (CD 30).",
    activations: [
  {
    name: "Semear um dente",
    actionType: "two",
    traits: ["Manipulate","Occult"],
    frequency: "1 vez por hora",
    effect: "Você invoca um dente da bolsa e, onde ele cai, um esqueleto surge do chão. Isso tem o efeito de _lacaio fantasma_, exceto que o lacaio aparece como um esqueleto visível.",
  },
  {
    name: "Punho cheio de presas",
    actionType: "two",
    traits: ["Manipulate","Occult"],
    frequency: "1 vez ao dia",
    effect: "Você desenha um punhado de dentes e os joga no chão, lançando _rouse esqueletos_ como um 5º posto magia (CD 30).",
  },
    ],
  },
  "Sack of Hyrdra's Teeth": {
    description: "Saco de algodão macio, cordão de tendão e bordado irregular na boca. Dentro, dentes agudos aparentemente infinitos.\n\n**Ativar—Semear um dente** 2 ações (manipular, occult)\n**Frequência** 1 vez por hora\n**Efeito** Você conjura forth a tooth from the bag, and where it lands, a skeleton springs up from the ground. This has the effect of _phantasmal minion_, except the minion appears as a visible skeleton.\n\n**Ativar—Punho cheio de presas** 2 ações (manipular, occult)\n**Frequência** 1 vez ao dia\n**Efeito** Você draw a whole handful of teeth and cast them to the ground, casting _rouse skeletons_ as a 5º posto magia (CD 30).",
    activations: [
  {
    name: "Semear um dente",
    actionType: "two",
    traits: ["Manipulate","Occult"],
    frequency: "1 vez por hora",
    effect: "Você invoca um dente da bolsa e, onde ele cai, um esqueleto surge do chão. Isso tem o efeito de _lacaio fantasma_, exceto que o lacaio aparece como um esqueleto visível.",
  },
  {
    name: "Punho cheio de presas",
    actionType: "two",
    traits: ["Manipulate","Occult"],
    frequency: "1 vez ao dia",
    effect: "Você desenha um punhado de dentes e os joga no chão, lançando _rouse esqueletos_ como um 5º posto magia (CD 30).",
  },
    ],
  },
  "Sage": {
    description: "The thin, glittering strands of rope that form this thick belt appear to be spun gold. Strung along the front of the belt are a collection of four multicolored, perfectly spherical beads: amethyst, jade, quartz, and turquoise. Enquanto estiver vestindo the lash, você ganha a +3 bônus de item em Religião. When você invest the belt, você either increase seu Sabedoria modifier by 1 or increase it to +4, whichever would give você a higher value.\n\n**Ativar—Joia da mente** 2 ações (concentrar, manipular)\n**Efeito** Você touch one of the jewels affixed to the _sage’s lash_ and think the associated command word. Depending on the jewel, a different effect is produced that affects você and all criatura vivas in a 9 m emanation. After the effect occurs, all four jewels disappear from the lash, reappearing at the next dawn. **• Amethyst** (light, revelation) Think “verity” to emit a magical trail of light from the lash that reveals the location of each criatura in the emanation. For 1 rodada, if they would be invisível, they become oculto instead, and if they would be indetectado or unnoticed by a criatura, they’re escondido instead. A criatura can faça um teste CD 43 Furtividade teste to avoid the lash’s detection. **• Jade** (healing) Think “purity” to produce a wave of green light that ends any enjoado condition and any dano persistente de veneno affecting criaturas in the emanation. **• Quartz** (healing, vitality) Think “lenity” to have each criatura regain 30 PV. **• Turquoise** Think “clarity” to grant all affected criaturas a +2 bônus de status em their next salvaguarda de Vontade por 1 minuto.",
    activations: [
  {
    name: "Joia da mente",
    actionType: "two",
    traits: ["Concentrate","Manipulate"],
    effect: "Você toca uma das joias afixadas no chicote do _sábio_ e pensa na palavra de comando associada. Dependendo da joia, é produzido um efeito diferente que afeta você e todas as criaturas vivas em uma emanação de 9 meses. Após o efeito ocorrer, todas as quatro joias desaparecem do chicote, reaparecendo no amanhecer seguinte. **• Ametista** (luz, revelação) Pense em “verdade” para emitir um rastro mágico de luz do chicote que revela a localização de cada criatura na emanação. Por 1 rodada, se eles forem invisíveis, eles se tornarão ocultos, e se forem indetectados ou despercebidos por uma criatura, eles ficarão ocultos. Uma criatura pode fazer um teste CD 43 Furtividade teste para evitar a detecção do chicote. **• Jade** (cura) Pense em “pureza” para produzir uma onda de luz verde que acaba com qualquer condição enjoada e qualquer dano persistente de veneno que afete criaturas na emanação. **• Quartzo** (cura, vitalidade) Pense em “lenidade” para que cada criatura recupere 30 PV. **• Turquesa** Pense em “claridade” para conceder a todas as criaturas afetadas um bônus de status de +2 em sua próxima salvaguarda de Vontade por 1 minuto.",
  },
    ],
  },
  "Sage's Lash": {
    description: "Cinto de cordas douradas com quatro contas: ametista, jade, quartzo e turquesa. +3 de item em Religião. Ao investir: Sabedoria +1 ou até +4.\n\n**Ativar—Joia da mente** 2 ações (concentrar, manipular)\n**Efeito** Você touch one of the jewels affixed to the _sage’s lash_ and think the associated command word. Depending on the jewel, a different effect is produced that affects você and all criatura vivas in a 9 m emanation. After the effect occurs, all four jewels disappear from the lash, reappearing at the next dawn. **• Amethyst** (light, revelation) Think “verity” to emit a magical trail of light from the lash that reveals the location of each criatura in the emanation. For 1 rodada, if they would be invisível, they become oculto instead, and if they would be indetectado or unnoticed by a criatura, they’re escondido instead. A criatura can faça um teste CD 43 Furtividade teste to avoid the lash’s detection. **• Jade** (healing) Think “purity” to produce a wave of green light that ends any enjoado condition and any dano persistente de veneno affecting criaturas in the emanation. **• Quartz** (healing, vitality) Think “lenity” to have each criatura regain 30 PV. **• Turquoise** Think “clarity” to grant all affected criaturas a +2 bônus de status em their next salvaguarda de Vontade por 1 minuto.",
    activations: [
  {
    name: "Joia da mente",
    actionType: "two",
    traits: ["Concentrate","Manipulate"],
    effect: "Você toca uma das joias afixadas no chicote do _sábio_ e pensa na palavra de comando associada. Dependendo da joia, é produzido um efeito diferente que afeta você e todas as criaturas vivas em uma emanação de 9 meses. Após o efeito ocorrer, todas as quatro joias desaparecem do chicote, reaparecendo no amanhecer seguinte. **• Ametista** (luz, revelação) Pense em “verdade” para emitir um rastro mágico de luz do chicote que revela a localização de cada criatura na emanação. Por 1 rodada, se eles forem invisíveis, eles se tornarão ocultos, e se forem indetectados ou despercebidos por uma criatura, eles ficarão ocultos. Uma criatura pode fazer um teste CD 43 Furtividade teste para evitar a detecção do chicote. **• Jade** (cura) Pense em “pureza” para produzir uma onda de luz verde que acaba com qualquer condição enjoada e qualquer dano persistente de veneno que afete criaturas na emanação. **• Quartzo** (cura, vitalidade) Pense em “lenidade” para que cada criatura recupere 30 PV. **• Turquesa** Pense em “claridade” para conceder a todas as criaturas afetadas um bônus de status de +2 em sua próxima salvaguarda de Vontade por 1 minuto.",
  },
    ],
  },
  "Sailor’s Collar": {
    description: "Gola azul com laço na frente, enfiada no cinto. +1 de item em Atletismo.\n\n**Ativar—Ofegar por ar** reação (air, concentrar)\n**Frequência** 1 vez ao dia\n**Gatilho** Você fail a Nadar teste\n**Efeito** Seu collar inflates, giving você something to breathe from. Você pode breathe underwater por 1 minuto.",
    activations: [
  {
    name: "Ofegar por ar",
    actionType: "reaction",
    traits: ["Air","Concentrate"],
    frequency: "1 vez ao dia",
    trigger: "Você fail a Nadar teste",
    effect: "Sua gola infla, dando a você algo para respirar. Você pode respirar debaixo d'água por 1 minuto.",
  },
    ],
  },
  "Sailor’s Collar (Greater)": {
    description: "Gola azul com laço na frente, enfiada no cinto. +2 de item em Atletismo.\n\n**Ativar—Ofegar por ar** reação (air, concentrar)\n**Frequência** 1 vez ao dia\n**Gatilho** Você fail a Nadar teste\n**Efeito** Seu collar inflates, giving você something to breathe from. Você pode breathe underwater por 1 minuto.",
    activations: [
  {
    name: "Ofegar por ar",
    actionType: "reaction",
    traits: ["Air","Concentrate"],
    frequency: "1 vez ao dia",
    trigger: "Você fail a Nadar teste",
    effect: "Sua gola infla, dando a você algo para respirar. Você pode respirar debaixo d'água por 1 minuto.",
  },
    ],
  },
  "Sandals of the Stag": {
    description: "Sandálias com cervos. +1,5 m de item no Deslocamento terrestre e +3 de item em Atletismo para Salto em Altura ou Distância. Ao investir: Força +1 ou até +4.\n\n**Ativar** reação (concentrar)\n**Frequência** 1 vez por minuto\n**Gatilho** Você attempt a High Jump or Long Jump but você didn't Avançar at least 3 m\n**Efeito** Você pode attempt the jump normally. It doesn't automatically fail.",
    activations: [
  {
    name: "",
    actionType: "reaction",
    traits: ["Concentrate"],
    frequency: "1 vez por minuto",
    trigger: "Você tentou um salto em altura ou salto em distância mas não avançou pelo menos 3 m",
    effect: "Você pode tentar o salto normalmente. Não falha automaticamente.",
  },
    ],
  },
  "Sandalwood Fan": {
    description: "Leque ornamentado com uma cena do Plano da Madeira, em geral o local de criação. Ao abaná-lo, brisa de sândalo e crepitar de magia. Chave planar para teleporte interplanar e magias semelhantes. Mais chance de chegar onde pretendia: aparece a 1d6×40 km do destino (em vez da margem usual). Se o destino for a cena no leque, 1d4×40 km.\n\n**Ativar—Fala das plantas** (manipular)\n**Frequência** 1 vez ao dia\n**Efeito** The _sandalwood fan_ casts _speak with plants_ and translate for Fey and Muan on você. In addition to conversing with nearby plants, você pode also communicate with any living plants você've spoken with in the past using this fan. These plants must either be on the same plane as você or on the Plane of Wood.\n\n**Ativar—Nuvem de folhas** 2 ações (manipular)\n**Frequência** 1 vez ao dia\n**Efeito** Você summon leaves that protect seu aliados and identify inimigos. All aliados and indifferent criaturas within 9 m of você ganha lesser cover por 1 rodada, while inimigos come under the effect of _revealing light_ por 1 minuto.",
    activations: [
  {
    name: "Fala das plantas",
    traits: ["Manipulate"],
    frequency: "1 vez ao dia",
    effect: "O _fã de sândalo_ lança _falar com plantas_ e traduzir para Fey e Muan em você. Além de conversar com plantas próximas, você também pode se comunicar com qualquer planta viva com quem já conversou usando este leque. Essas plantas devem estar no mesmo plano que você ou no Plano da Madeira.",
  },
  {
    name: "Nuvem de folhas",
    actionType: "two",
    traits: ["Manipulate"],
    frequency: "1 vez ao dia",
    effect: "Você invoca folhas que protegem seus aliados e identificam inimigos. Todos os aliados e criaturas indiferentes num raio de 9 m de você ganham menor cobertura por 1 rodada, enquanto os inimigos ficam sob o efeito de _luz reveladora_ por 1 minuto.",
  },
    ],
  },
  "Sanguine Pendant": {
    description: "Cristal com uma gota de sangue. +2 nas perícias da linhagem. 1 ponto de foco de linhagem 1 vez ao dia. Só a linhagem associada investe.\n\n**Ativar—Chamado do sangue** ação livre (concentrar)\n**Frequência** 1 vez ao dia\n**Efeito** Você ganha 1 ponto de foco, que você só pode gastar para conjurar a bloodline magia. Se você don't spend this ponto de foco by the end of this turno, it's lost.",
    activations: [
  {
    name: "Chamado do sangue",
    actionType: "free",
    traits: ["Concentrate"],
    frequency: "1 vez ao dia",
    effect: "Você ganha 1 ponto de foco, que você só pode gastar para conjurar a magia da linhagem. Se você não passar esse ponto de foco até o final desse turno, ele está perdido.",
  },
    ],
  },
  "Sanguine Pendant (Greater)": {
    description: "+3 nas perícias da linhagem. 1 ponto de foco de linhagem 1 vez ao dia.\n\n**Ativar—Chamado do sangue** ação livre (concentrar)\n**Frequência** 1 vez ao dia\n**Efeito** Você ganha 1 ponto de foco, que você só pode gastar para conjurar a bloodline magia. Se você don't spend this ponto de foco by the end of this turno, it's lost.",
    activations: [
  {
    name: "Chamado do sangue",
    actionType: "free",
    traits: ["Concentrate"],
    frequency: "1 vez ao dia",
    effect: "Você ganha 1 ponto de foco, que você só pode gastar para conjurar a magia da linhagem. Se você não passar esse ponto de foco até o final desse turno, ele está perdido.",
  },
    ],
  },
  "Sash of Prowess": {
    description: "Faixa na cintura ou no peito. +2 de item em Acrobacia e Atletismo. 1 vez ao dia, sucesso vira crítico; 1 ponto de foco de qi 1 vez ao dia.\n\n**Ativar—Maestria sem esforço** ação livre (concentrar)\n**Frequência** 1 vez ao dia\n**Requisitos** Você succeed at an Acrobacia or Atletismo teste de perícia\n**Efeito** Você critically succeed instead.\n\n**Ativar—Reservas de força interior** ação livre (concentrar)\n**Frequência** 1 vez ao dia\n**Efeito** Você ganha 1 ponto de foco, que você só pode gastar para conjurar a qi magia. Se você don't spend this ponto de foco by the end of this turno, it's lost.",
    activations: [
  {
    name: "Maestria sem esforço",
    actionType: "free",
    traits: ["Concentrate"],
    frequency: "1 vez ao dia",
    requirements: "Você teve sucesso em um teste de perícia de Acrobacia ou Atletismo",
    effect: "Em vez disso, você teve um sucesso crítico.",
  },
  {
    name: "Reservas de força interior",
    actionType: "free",
    traits: ["Concentrate"],
    frequency: "1 vez ao dia",
    effect: "Você ganha 1 ponto de foco, que você só pode gastar para conjurar a qi magia. Se você não passar esse ponto de foco até o final desse turno, ele está perdido.",
  },
    ],
  },
  "Sash of Prowess (Greater)": {
    description: "+3 de item em Acrobacia e Atletismo. Sucesso vira crítico 1 vez ao dia; ponto de foco de qi 1 vez ao dia.\n\n**Ativar—Maestria sem esforço** ação livre (concentrar)\n**Frequência** 1 vez ao dia\n**Requisitos** Você succeed at an Acrobacia or Atletismo teste de perícia\n**Efeito** Você critically succeed instead.\n\n**Ativar—Reservas de força interior** ação livre (concentrar)\n**Frequência** 1 vez ao dia\n**Efeito** Você ganha 1 ponto de foco, que você só pode gastar para conjurar a qi magia. Se você don't spend this ponto de foco by the end of this turno, it's lost.",
    activations: [
  {
    name: "Maestria sem esforço",
    actionType: "free",
    traits: ["Concentrate"],
    frequency: "1 vez ao dia",
    requirements: "Você teve sucesso em um teste de perícia de Acrobacia ou Atletismo",
    effect: "Em vez disso, você teve um sucesso crítico.",
  },
  {
    name: "Reservas de força interior",
    actionType: "free",
    traits: ["Concentrate"],
    frequency: "1 vez ao dia",
    effect: "Você ganha 1 ponto de foco, que você só pode gastar para conjurar a qi magia. Se você não passar esse ponto de foco até o final desse turno, ele está perdido.",
  },
    ],
  },
  "Satchel of Numberless Seeds": {
    description: "Algibeira de couro fino, linha dourada, padrão de árvores, folhas e trepadeiras. Sempre contém 1 Volume de sementes; ao sacar uma, é semente aleatória de árvore ou cultivo.\n\n**Ativar—Semente de segurança** 2 ações (manipular, primal)\n**Frequência** 1 vez ao dia\n**Efeito** Você draw a seed and cast it into a space within 9 m. The satchel casts _protector tree_ as a 2º posto magia.\n\n**Ativar—Semente de sustento** 2 ações (cura, manipular, primal)\n**Frequência** 1 vez ao dia\n**Efeito** Você draw a seed and cast it into a space within 9 m. A small tree sprouts within 10 minutes, producing 5 fruits. A criatura who eats the fruit with an Interact ação regains 1d6+2 PV and receives as much nourishment as one meal for a typical human. After an hour, the tree and all its fruits wither away.",
    activations: [
  {
    name: "Semente de segurança",
    actionType: "two",
    traits: ["Manipulate","Primal"],
    frequency: "1 vez ao dia",
    effect: "Você tira uma semente e a lança em um espaço de até 9 m. A mochila lança _árvore protetora_ como 2º posto magia.",
  },
  {
    name: "Semente de sustento",
    actionType: "two",
    traits: ["Healing","Manipulate","Primal"],
    frequency: "1 vez ao dia",
    effect: "Você tira uma semente e a lança em um espaço de até 9 m. Uma pequena árvore brota em 10 minutos, produzindo 5 frutos. Uma criatura que come a fruta com uma ação Interagir recupera 1d6+2 PV e recebe tanta nutrição quanto uma refeição para um humano típico. Depois de uma hora, a árvore e todos os seus frutos murcham.",
  },
    ],
  },
  "Scale of Igroon": {
    description: "Escama do kaiju Igroon (Dureza 20, PV 160, Limiar 80); recupera 4 PV no início do turno. Ao Erguer um Escudo, Bloqueio também contra ácido, frio, eletricidade, fogo, força ou sônico.\n\n**Ativar** 1 ação (manipular)\n**Requisitos** Você're in an area of bright or dim light\n**Efeito** Você angle the shield to refract light. Until the start of seu next turno, você ganha a +4 bônus de item em Furtividade testes to Esconder and Furtar-se and can do so while observed. This bônus ends if você Ativar another ability or use the Shield Block reação.\n\n**Ativar** 1 ação (manipular)\n**Requisitos** Você're in an area of bright light\n**Efeito** Você angle the shield at a alvo within 18 m, reflecting light into its eyes. It deve fazer um teste CD 42 salvaguarda de Fortitude. **Sucesso crítico** O alvo is unaffected. **Sucesso** O alvo is cego until its next turno begins. **Falha** O alvo is cego por 1 minuto. **Falha crítica** O alvo is cego for 2d4 hours.\n\n**Ativar** ação livre (manipular)\n**Gatilho** Você use Shield Block and prevent yourself from taking energy dano from a line, ray, or a direct attack, including a _force barrage_ magia\n**Efeito** Você reflect the energy along a trajectory você choose. The effect travels only up to its remaining range, using its original parameters if it strikes other targets. **Destruction** If a deity, kaiju, spawn of a deity, titan, or being of similar power stomps on a _scale of Igroon_ while in absolute darkness, the shield is destroyed permanently.",
    activations: [
  {
    name: "",
    actionType: "one",
    traits: ["Manipulate"],
    requirements: "Você está in an area of bright ou dim light",
    effect: "Você inclina o escudo para refratar a luz. Até o início do próximo turno, você ganha +4 de bônus de item em testes de Furtividade para Esconder e Furtar-se e pode fazê-lo enquanto observado. Este bônus termina se você ativar outra habilidade ou usar o Bloqueio de Escudo.",
  },
  {
    name: "",
    actionType: "one",
    traits: ["Manipulate"],
    requirements: "Você está in an area of bright light",
    effect: "Você inclina o escudo para um alvo dentro de 18 m, refletindo a luz em seus olhos. Deve fazer um teste CD 42 salvaguarda de Fortitude. **Sucesso crítico** O alvo não é afetado. **Sucesso** O alvo fica cego até o início do próximo turno. **Falha** O alvo fica cego por 1 minuto. **Falha crítica** O alvo fica cego por 2d4 horas.",
  },
  {
    name: "",
    actionType: "free",
    traits: ["Manipulate"],
    trigger: "Você usa Shield Block e evita receber dano de energia de uma linha, raio ou ataque direto, incluindo uma _force barrage_ magia",
    effect: "Você reflete a energia ao longo de uma trajetória que você escolher. O efeito viaja apenas até o alcance restante, usando seus parâmetros originais se atingir outros alvos. **Destruição** Se uma divindade, kaiju, cria de uma divindade, titã ou ser de poder semelhante pisar em uma _escala de Igroon_ enquanto estiver na escuridão absoluta, o escudo será destruído permanentemente.",
  },
    ],
  },
  "Screaming Pinion": {
    description: "Mosquete de pederneira +2 impactante maior da Asa de Platina; civil em Andoran com um comete crime grave. O cão é lasca de estilhaço de guerra.\n\n**Ativar—Disparo transcendente** 1 ação (manipular, spirit)\n**Requisitos** The _screaming pinion_ is unloaded\n**Efeito** Você call on the power of the warshard to load the _screaming pinion_ with a bullet made of divine fury. The next attack from the gun deals dano espiritual, rather than its typical type, and on a critical hit, o alvo is subject to the arma’s critical specialization effect. If the gun isn’t fired before the end of seu next turno, the bullet disappears, and the gun becomes unloaded.\n\n**Ativar—Grito da águia** 2 ações (concentrar, manipular, sonic, sonic)\n**Frequência** 1 vez ao dia\n**Efeito** The musket unleashes a piercing sound wave in a 70 pés line. Each criatura in the area takes 8d10 dano sônico with a CD 30 Fortitude básico save. A criatura that critically fails its save is also surdo. If the _screaming pinion_ has a _+3 potency_ rune, the CD increases to 35, and the dano increases to 10d10.",
    activations: [
  {
    name: "Disparo transcendente",
    actionType: "one",
    traits: ["Manipulate","Spirit"],
    requirements: "O _pinhão gritante_ está descarregado",
    effect: "Você invoca o poder do warshard para carregar o _pinhão gritante_ com uma bala feita de fúria divina. O próximo ataque da arma causa dano espiritual, ao invés do seu tipo típico, e em um acerto crítico, o alvo está sujeito ao efeito de especialização crítica da arma. Se a arma não for disparada antes do final do próximo turno, a bala desaparece e a arma é descarregada.",
  },
  {
    name: "Grito da águia",
    actionType: "two",
    traits: ["Concentrate","Manipulate","Sonic","Sonic"],
    frequency: "1 vez ao dia",
    effect: "O mosquete libera uma onda sonora penetrante em uma linha de 21 m. Cada criatura na área sofre 8d10 de dano sônico com um salvamento básico de Fortitude CD 30. Uma criatura que falha criticamente em seu teste também é surdo. Se o _pinhão gritante_ tiver uma runa de potência _+3_, o CD aumenta para 35 e o dano aumenta para 10d10.",
  },
    ],
  },
  "Searing Blade": {
    description: "Espada longa +2 impactante maior flamejante. Luz tênue de 3 m.\n\n**Ativar—Disparar fogo** 2 ações (concentrar, manipular)\n**Efeito** Você conjura the _ignition_ cantrip from the sword as a 7º posto arcane magia, using seu melee attack modifier with _searing blade_ as seu ataque de magia modifier.",
    activations: [
  {
    name: "Disparar fogo",
    actionType: "two",
    traits: ["Concentrate","Manipulate"],
    effect: "Você conjura o truque _ignição_ da espada como uma magia arcana de 7º posto, usando seu modificador de ataque corpo a corpo com _lâmina abrasadora_ como seu modificador de ataque de magia.",
  },
    ],
  },
  "Searing Blade (Greater)": {
    description: "Espada longa +3 impactante maior flamejante maior. Ignição de 9º posto.\n\n**Ativar—Irradiar chamas** 1 ação\n**Frequência** 1 vez ao dia\n**Efeito** A 3 m emanation of flame radiates from the _greater searing blade_ por 1 minuto. All arma and unarmed attacks by você and seu aliados within the area gain the effect of the flaming property rune.",
    activations: [
  {
    name: "Irradiar chamas",
    actionType: "one",
    frequency: "1 vez ao dia",
    effect: "Uma emanação de chama de 3 m irradia da _lâmina abrasadora maior_ por 1 minuto. Todas as armas e ataques desarmados por você e seus aliados dentro da área ganham o efeito da runa de propriedade flamejante.",
  },
    ],
  },
  "Seed Pod of Rooted Wisdom": {
    description: "Fruto de sumaúma com três sementes. Engolir a primeira: +1 de status em Vontade contra medo por 10 minutos. A segunda: suas próximas 10 palavras são compreendidas por qualquer um que ouça. A terceira: +1 de item em um teste de Recordar Conhecimento na hora.",
  },
  "Semaphore of Slanders": {
    description: "Par de semáforos: hastes de madeira dura brancas e bandeiras de seda amarelo e vermelho, com serpente negra estilizada no canto. Além de semáforo funcional, envia sinais falsos a forças inimigas que observem: +2 de item em Enganação para isso, e aliados sempre percebem o blefe.\n\n**Ativar—Insinuação insidiosa** 2 ações (concentrar, emoção, medo, manipular, mental, visual)\n**Frequência** 1 vez ao dia\n**Efeito** Você activate the semaphore to mislead the inimigo. Choose a criatura within 18 m to faça um teste CD 28 Vontade salvaguarda. **Sucesso crítico** O alvo is unaffected. **Sucesso** O alvo is amedrontado 1. **Falha** O alvo is amedrontado 1 and is desprevenido por 1 rodada. **Falha crítica** O alvo is amedrontado 2 and desprevenido for 2 rodadas.",
    activations: [
  {
    name: "Insinuação insidiosa",
    actionType: "two",
    traits: ["Concentrate","Emotion","Fear","Manipulate","Mental","Visual"],
    frequency: "1 vez ao dia",
    effect: "Você ativa o semáforo para enganar o inimigo. Escolha uma criatura dentro de 18 m para fazer um teste CD 28 Vontade segurança. **Sucesso crítico** O alvo não é afetado. **Sucesso** O alvo é amedrontado 1. **Falha** O alvo é amedrontado 1 e é desprevenido por 1 rodada. **Falha crítica** O alvo está amedrontado 2 e desprevenido por 2 rodadas.",
  },
    ],
  },
  "Seraptis Bone Tiles": {
    description: "Como as peças de osso de pusk, mas 2d8 sangramento persistente e Reflexos CD 34.",
  },
  "Serpent Dagger": {
    description: "Adaga +1 impactante. Crítico: Fortitude CD 19 ou enjoado 1 (veneno).\n\n**Ativar—Pingar veneno** ação livre (manipular, poison)\n**Frequência** 1 vez ao dia\n**Gatilho** Você dano a criatura with the _serpent dagger_\n**Efeito** Você poison the criatura você hit with dagger venom. **Dagger Venom** (poison) **Saving Throw** CD 21 Fortitude; **Maximum Duration** 4 rodadas; **Stage 1** 1d8 dano de veneno and enfraquecido 1",
    activations: [
  {
    name: "Pingar veneno",
    actionType: "free",
    traits: ["Manipulate","Poison"],
    frequency: "1 vez ao dia",
    trigger: "Você danificou uma criatura com a _serpent dagger_",
    effect: "Você envenena a criatura que você atingiu com veneno de adaga. **Veneno de Adaga** (veneno) **Lançamento de Resistência** CD 21 Fortitude; **Duração Máxima** 4 rodadas; **Estágio 1** 1d8 dano de veneno e enfraquecido 1",
  },
    ],
  },
  "Sextant of the Night": {
    description: "Sextante de prata com espelhos de ônix e cristais; a luneta de prata, se removida, destrói o item. Pela luneta, o céu noturno de dia e o sol à noite. +1 de item em Sobrevivência, +2 para Sentido de direção.",
  },
  "Shadow Signet": {
    description: "Anel de obsidiana. Distorce a magia pelo Submundo: o próximo ataque de magia contra CA usa Fortitude ou Reflexos, à sua escolha.\n\n**Ativar** ação livre (concentrar, forma de magia)\n**Efeito** Se vocêr next ação is to Conjurar uma Magia that requires a ataque de magia roll against CA, choose Fortitude CD or Reflexos CD. Você make seu ataque de magia roll against that defense em vez de AC. If the magia has multiple targets, the choice of CD applies to all of them.",
    activations: [
  {
    name: "",
    actionType: "free",
    traits: ["Concentrate","Spellshape"],
    effect: "Se sua próxima ação for Conjurar uma Magia que requer uma jogada de ataque de magia contra CA, escolha Fortitude CD ou Reflexosos CD. Você faz seu ataque de magia rolar contra essa defesa em vez de CA. Se a magia tiver múltiplos alvos, a escolha do CD se aplica a todos eles.",
  },
    ],
  },
  "Shadowmist Cape": {
    description: "Capa negra como vapor. +3 de item em Furtividade. Ao investir: Destreza +1 ou até +4.\n\n**Ativar** reação (manipular)\n**Frequência** 1 vez por hora\n**Gatilho** A criatura misses você with an attack\n**Efeito** Attempt a Furtividade teste against the triggering criatura's Percepção CD. Se você roll a success, você're escondido from that criatura até o fim do seu próximo turno or until right after você use a hostile ação against that criatura. Se você roll a critical success, você're escondido from that criatura até o fim do seu próximo turno, even if você use hostile ações against that criatura.\n\n**Ativar** 2 ações (manipular)\n**Frequência** 1 vez ao dia\n**Efeito** With a twirl of the cape, você transform yourself into a puff of gray smoke. Você conjura _vapor form_ on yourself.",
    activations: [
  {
    name: "",
    actionType: "reaction",
    traits: ["Manipulate"],
    frequency: "1 vez por hora",
    trigger: "Uma criatura sente sua falta com um ataque",
    effect: "Faça um teste de Furtividade contra o CD Percepção da criatura acionadora. Se você obtiver sucesso, você ficará escondido daquela criatura até o fim do seu próximo turno ou até logo depois de usar uma ação hostil contra aquela criatura. Se você obtiver um sucesso crítico, você estará escondido daquela criatura até o fim do seu próximo turno, mesmo que você use ações hostis contra essa criatura.",
  },
  {
    name: "",
    actionType: "two",
    traits: ["Manipulate"],
    frequency: "1 vez ao dia",
    effect: "Com um giro da capa, você se transforma em uma nuvem de fumaça cinza. Você conjura _forma de vapor_ em você mesmo.",
  },
    ],
  },
  "Shapespeak Mask": {
    description: "Máscara entalhada em forma de animal, em geral da espécie que o usuário prefere. Enquanto a usa, você pode falar quando polimorfado em animal. Não remove outras limitações, como a de não conjurar transformado.",
  },
  "Shaping Sweet": {
    description: "Bala gelatinosa do Primeiro Mundo. Ativar ao comer: até o fim do seu próximo turno, Interagir para fazer uma mudança cosmética num objeto adjacente de até 1 Volume (cor, textura, cheiro); não altera estatísticas.",
  },
  "Sharkskin Robe": {
    description: "This sandy-textured robe comes with sleeves that resemble dorsal fins. It's believed to have been developed by frustrated alchemists from the Universe for trips to the Plane of Water. The sharkskin robe concede a você a deslocamento de natação equal to seu deslocamento terrestre and a +2 bônus de item em Atletismo testes.\n\n**Ativar—Elegância do tubarão** 2 ações (concentrar, manipular, unarmed)\n**Frequência** 1 vez por hora\n**Efeito** For 1 minute, any time você make a Golpe, seu arma or unarmed attack gains the benefit of the _underwater_ arma property rune.",
    activations: [
  {
    name: "Elegância do tubarão",
    actionType: "two",
    traits: ["Concentrate","Manipulate","Unarmed"],
    frequency: "1 vez por hora",
    effect: "Por 1 minuto, sempre que você fizer um Golpe, sua arma ou ataque desarmado ganha o benefício da runa de propriedade _underwater_ arma.",
  },
    ],
  },
  "Shawl of Seasons": {
    description: "Xale tecido que muda cor, material e poderes conforme a estação; o bordado dá +2 de item em Diplomacia para Fazer uma impressão.\n\n**Ativar—Mudança de estações** (concentrar)\n**Frequência** 1 vez ao dia\n**Efeito** Você arrange the shawl on seu shoulders to gain the benefits of a season of seu choice until seu next daily preparations. If the season você choose is the current season, você also gain a +1 bônus de item em Fortitude salvaguardas. **Spring** The shawl becomes smooth silk covered in delicate flowers. Você ganha +1,5 m bônus de item em seu Speed. **Summer** The shawl becomes light cotton with the hues of fresh grass. Você’re protected from the effects of severe heat. **Fall** The shawl becomes thin leather with an ombre of red and orange leaves. Você treat falls as 3 m shorter. **Winter** The shawl becomes warm wool as white as snow. Você’re protected from the effects of severe cold.",
    activations: [
  {
    name: "Mudança de estações",
    traits: ["Concentrate"],
    frequency: "1 vez ao dia",
    effect: "Você arruma o xale nos ombros para ganhar os benefícios de uma estação de sua escolha até os próximos preparativos diários. Se a temporada que você escolher for a atual, você também ganha +1 de bônus de item em Fortitude salvaguardas. **Primavera** O xale se transforma em seda lisa coberta de flores delicadas. Você ganha +1,5 milhão de bônus de item em seu Deslocamento. **Verão** O xale fica em algodão leve com tons de grama fresca. Você está protegido dos efeitos do calor intenso. **Outono** O xale vira couro fino com um ombre de folhas vermelhas e laranja. Você trata as quedas como 3 m mais curtas. **Inverno** O xale se transforma em lã quente e branca como a neve. Você está protegido dos efeitos do frio intenso.",
  },
    ],
  },
  "Shell of Easy Breathing": {
    description: "This large salt-encrusted seashell is more than 2 pés across, with images of deep sea criaturas carved around its edge.\n\n**Ativar—Encher a concha** 1 ação (manipular)\n**Efeito** Você place the shell on a level surface and sprinkle a few drops of water into its basin. The shell slowly fills with saltwater over the course of 1 minute. The shell's magic then becomes active, indicated by a steady stream of bubbles. Moving the shell disturbs its contents, causing the item to deactivate and the water inside to evaporate; otherwise, it remains activated for an unlimited duration. While the shell is activated, a criatura can submerge its head and let water and bubbles fill its nose and mouth (or whatever body part it uses for breathing) as a 3-ação activity. For the next hour, the criatura can breathe underwater. The criatura is then temporarily immune to _shells of easy breathing_ until the next time it makes its daily preparations.",
    activations: [
  {
    name: "Encher a concha",
    actionType: "one",
    traits: ["Manipulate"],
    effect: "Você coloque a concha em uma superfície nivelada e borrife algumas gotas de água em sua bacia. A concha enche lentamente com água salgada ao longo de 1 minuto. A magia da concha então se torna ativa, indicada por um fluxo constante de bolhas. Mover a casca perturba seu conteúdo, fazendo com que o item seja desativado e a água de seu interior evapore; caso contrário, ele permanecerá ativado por tempo ilimitado. Enquanto a carapaça estiver ativada, uma criatura pode submergir sua cabeça e deixar água e bolhas encherem seu nariz e boca (ou qualquer parte do corpo que ela use para respirar) como uma atividade de 3 ações. Durante a próxima hora, a criatura poderá respirar debaixo d'água. A criatura fica então temporariamente imune a conchas de fácil respiração até a próxima vez que fizer seus preparativos diários.",
  },
    ],
  },
  "Shell of Easy Breathing (Greater)": {
    description: "This large salt-encrusted seashell is more than 2 pés across, with images of deep sea criaturas carved around its edge. The duration of the ability to breathe underwater increases to 8 hours.\n\n**Ativar—Encher a concha** 1 ação (manipular)\n**Efeito** Você place the shell on a level surface and sprinkle a few drops of water into its basin. The shell slowly fills with saltwater over the course of 1 minute. The shell's magic then becomes active, indicated by a steady stream of bubbles. Moving the shell disturbs its contents, causing the item to deactivate and the water inside to evaporate; otherwise, it remains activated for an unlimited duration. While the shell is activated, a criatura can submerge its head and let water and bubbles fill its nose and mouth (or whatever body part it uses for breathing) as a 3-ação activity. For the next hour, the criatura can breathe underwater. The criatura is then temporarily immune to _shells of easy breathing_ until the next time it makes its daily preparations.",
    activations: [
  {
    name: "Encher a concha",
    actionType: "one",
    traits: ["Manipulate"],
    effect: "Você coloque a concha em uma superfície nivelada e borrife algumas gotas de água em sua bacia. A concha enche lentamente com água salgada ao longo de 1 minuto. A magia da concha então se torna ativa, indicada por um fluxo constante de bolhas. Mover a casca perturba seu conteúdo, fazendo com que o item seja desativado e a água de seu interior evapore; caso contrário, ele permanecerá ativado por tempo ilimitado. Enquanto a carapaça estiver ativada, uma criatura pode submergir sua cabeça e deixar água e bolhas encherem seu nariz e boca (ou qualquer parte do corpo que ela use para respirar) como uma atividade de 3 ações. Durante a próxima hora, a criatura poderá respirar debaixo d'água. A criatura fica então temporariamente imune a conchas de fácil respiração até a próxima vez que fizer seus preparativos diários.",
  },
    ],
  },
  "Shining Hackle": {
    description: "Pluma de penas curtas no chapéu, parte de uniforme formal; o brilho suave também serve em outros lugares. +1 de item em Percepção baseada em visão, mas –1 de item em Furtividade.\n\n**Ativar—Cerda brilhante** 1 ação (concentrar, light)\n**Efeito** Seu _shining hackle_ glows even brighter, shedding bright light in a 6 m radius (and dim light for the next 6 m). This effect lasts until você Dismiss it.",
    activations: [
  {
    name: "Cerda brilhante",
    actionType: "one",
    traits: ["Concentrate","Light"],
    effect: "Seu _shining hackle_ brilha ainda mais forte, emitindo luz brilhante em um raio de 6 m (e luz fraca nos próximos 6 m). Este efeito dura até você dispensá-lo.",
  },
    ],
  },
  "Shining Symbol": {
    description: "Amuleto dourado que vira o símbolo da sua divindade. +1 em Religião, luz fraca, e 1 vez ao dia luz que denuncia espíritos.\n\n**Ativar—Luz espiritual** 2 ações (concentrar, light, revelation)\n**Frequência** 1 vez ao dia\n**Efeito** The light cast by the symbol becomes bright light por 10 minutos and shines through bodies to reveal hints of the spirits within. Creatures in the light receive a –1 penalidade de status to Enganação and Furtividade testes. Você pode Dismiss this activation.",
    activations: [
  {
    name: "Luz espiritual",
    actionType: "two",
    traits: ["Concentrate","Light","Revelation"],
    frequency: "1 vez ao dia",
    effect: "A luz lançada pelo símbolo torna-se uma luz brilhante por 10 minutos e brilha através dos corpos para revelar indícios dos espíritos internos. Criaturas na luz recebem -1 de status nos testes de Enganação e Furtividade. Você pode Dispensar esta ativação.",
  },
    ],
  },
  "Shining Symbol (Greater)": {
    description: "Versão maior: +2 em Religião, penalidade −2, fraqueza 5 a espírito nos inimigos na luz.\n\n**Ativar—Luz espiritual** 2 ações (concentrar, light, revelation)\n**Frequência** 1 vez ao dia\n**Efeito** The light cast by the symbol becomes bright light por 10 minutos and shines through bodies to reveal hints of the spirits within. Creatures in the light receive a –1 penalidade de status to Enganação and Furtividade testes. Você pode Dismiss this activation.",
    activations: [
  {
    name: "Luz espiritual",
    actionType: "two",
    traits: ["Concentrate","Light","Revelation"],
    frequency: "1 vez ao dia",
    effect: "A luz lançada pelo símbolo torna-se uma luz brilhante por 10 minutos e brilha através dos corpos para revelar indícios dos espíritos internos. Criaturas na luz recebem -1 de status nos testes de Enganação e Furtividade. Você pode Dispensar esta ativação.",
  },
    ],
  },
  "Shining Symbol (Major)": {
    description: "Versão máxima: +3 em Religião, penalidade −3, fraqueza 10 a espírito.\n\n**Ativar—Luz espiritual** 2 ações (concentrar, light, revelation)\n**Frequência** 1 vez ao dia\n**Efeito** The light cast by the symbol becomes bright light por 10 minutos and shines through bodies to reveal hints of the spirits within. Creatures in the light receive a –1 penalidade de status to Enganação and Furtividade testes. Você pode Dismiss this activation.",
    activations: [
  {
    name: "Luz espiritual",
    actionType: "two",
    traits: ["Concentrate","Light","Revelation"],
    frequency: "1 vez ao dia",
    effect: "A luz lançada pelo símbolo torna-se uma luz brilhante por 10 minutos e brilha através dos corpos para revelar indícios dos espíritos internos. Criaturas na luz recebem -1 de status nos testes de Enganação e Furtividade. Você pode Dispensar esta ativação.",
  },
    ],
  },
  "Shot of the First Vault": {
    description: "Munição de qualquer arma à distância; molda-se a você. Em vez dos dados da arma, causa 25 + bônus. Estilhaça e ricocheteia em outros inimigos a 9 m (mesmo bônus de ataque). Estilhaços: desajeitado 2 até remover (3 Interagir ou 1 ação + Medicina CD 30; falha crítica 10 sangramento persistente).\n\n**Ativar—Ordem de recarga** 1 ação (concentrar)\n**Requisitos** The shot is loaded in seu ranged arma, or at hand if seu ranged arma has a reload of 0\n**Efeito** Você recall the _shot of the First Vault_, which automatically reloads itself into seu arma. If the shot had fragmented, the fragments violently dislodge themselves, dealing 15 dano persistente de sangramento to each criatura in which they were embedded. The fragments then unite to re-form the _shot of the First Vault_, which automatically reloads itself into seu arma.\n\n**Ativar—Depósito no cofre** 3 ações (manipular, incapacitation)\n**Efeito** Você line up a perfectly aimed attack directly toward the First Vault. Você Golpe a criatura, then the _shot of the First Vault_ attempts to bring seu alvo with it as it returns to the First Vault. Unless seu rolagem de ataque is a critical failure, the criatura deve fazer um teste CD 45 salvaguarda de Reflexos; this effect has the incapacitation trait. Regardless, the _shot of the First Vault_ returns to the First Vault. **Sucesso crítico** The criatura is unaffected. **Sucesso** The criatura is moved 1d20x50 feet in the direction você fired. If this causes it to hit a solid object, it takes 50 dano de concussão. **Falha** The criatura is transported to a random location on the plane of Axis. **Falha crítica** The criatura is transported to the First Vault. Unless it is capable of eluding Abadar's precautions, it is likely unable to escape the Vault on its own. **Destruction** If 10 _shots of the First Vault_ are all fired at the same group of keketar or izfiitar proteans within 1 minute of each other, each shot was a hit, and the shots are then recalled, the shots collide as they attempt to re-form and crumble to dust.",
    activations: [
  {
    name: "Ordem de recarga",
    actionType: "one",
    traits: ["Concentrate"],
    requirements: "O tiro é carregado em sua arma de longo alcance, ou em mãos se sua arma de longo alcance tiver recarga de 0",
    effect: "Você se lembra do _tiro do Primeiro Vault_, que se recarrega automaticamente em sua arma. Se o tiro tiver sido fragmentado, os fragmentos se desalojam violentamente, causando 15 de dano persistente de sangramento a cada criatura na qual estavam incrustados. Os fragmentos então se unem para formar novamente o _tiro do Primeiro Vault_, que se recarrega automaticamente em sua arma.",
  },
  {
    name: "Depósito no cofre",
    actionType: "three",
    traits: ["Manipulate","Incapacitation"],
    effect: "Você alinha um ataque perfeitamente direcionado diretamente para o Primeiro Vault. Você Golpe uma criatura, então o _shot do Primeiro Vault_ tenta trazer seu alvo com ele enquanto ele retorna ao Primeiro Vault. A menos que sua rolagem de ataque seja uma falha crítica, a criatura deve fazer um teste CD 45 de segurança de Reflexos; este efeito tem o traço de incapacitação. Independentemente disso, o _tiro do Primeiro Vault_ retorna ao Primeiro Vault. **Sucesso crítico** A criatura não é afetada. **Sucesso** A criatura se move 1d20x50 pés na direção em que você atirou. Se isso fizer com que ele atinja um objeto sólido, ele sofre 50 de dano de concussão. **Falha** A criatura é transportada para um local aleatório no plano do Eixo. **Falha crítica** A criatura é transportada para o Primeiro Vault. A menos que seja capaz de escapar das precauções de Abadar, provavelmente não conseguirá escapar do Vault sozinho. **Destruição** Se 10 _tiros do Primeiro Vault_ forem disparados contra o mesmo grupo de keketar ou izfiitar proteans com intervalo de 1 minuto entre eles, cada tiro foi um acerto, e os tiros são então recuperados, os tiros colidem enquanto tentam se reformar e virar pó.",
  },
    ],
  },
  "Silent Bell": {
    description: "Sino de mão grande de bronze fundido, cabo de madeira, gravuras de gente à mesa com nuvens ao fundo; sem badalo, não emite som.\n\n**Ativar—Soar o silêncio** 3 ações (concentrar, manipular)\n**Frequência** 1 vez ao dia\n**Efeito** The _silent bell_ creates an invisível wall surrounding a cube, 6 m to a side, that prevents sound from passing into or from the cube por 10 minutos. The wall isn't solid and doesn't prevent anything but sound from passing through. Since the cube is invisível, criaturas can still read lips and body language through the wall.",
    activations: [
  {
    name: "Soar o silêncio",
    actionType: "three",
    traits: ["Concentrate","Manipulate"],
    frequency: "1 vez ao dia",
    effect: "O _sino silencioso_ cria uma parede invisível ao redor de um cubo, de 6 m de lado, que impede a passagem de som para dentro ou para fora do cubo por 10 minutos. A parede não é sólida e não impede a passagem de nada além do som. Como o cubo é invisível, as criaturas ainda conseguem ler os lábios e a linguagem corporal através da parede.",
  },
    ],
  },
  "Silver Snake Cane": {
    description: "Bengala de metal brilhante, dispositivo assistivo popular entre zuhras. Em 1 minuto, alimente com um elixir ou uma dose de veneno ingerido ou de ferimento para encher o saco de veneno. Só um item alquímico por vez; expulsa após 24 horas ou ao receber outro.\n\n**Ativar—Espada da serpente prateada** 1 ação (concentrar, polymorph)\n**Efeito** The silver snake cane becomes a _+1 impacto silver sword cane_ por 10 minutos. If the cane holds a dose of poison with the injury trait, that poison is automatically applied to the arma. If the poison hasn't been expended by the time the cane turns back to normal, it remains stored in the cane. Você pode Dismiss this activation.\n\n**Ativar—Soro da serpente prateada** 1 ação (concentrar)\n**Frequência** 1 vez ao dia\n**Requisitos** The _silver snake cane_ holds a dose of an alchemical item\n**Efeito** The silver snake cane bites a willing alvo of seu choice within seu reach, dealing 1 dano perfurante and injecting the alchemical item. The item is expended, and if it was an elixir or ingested poison, o alvo is affected as though it consumed the item.\n\n**Ativar—Serpente de prata verdadeira** 1 ação (concentrar)\n**Efeito** The cane transforms into a giant viper made of silver. All its Golpes are silver. It acts independently but obeys você. Você pode Dismiss this activation.",
    activations: [
  {
    name: "Espada da serpente prateada",
    actionType: "one",
    traits: ["Concentrate","Polymorph"],
    effect: "A bengala de cobra prateada se torna uma bengala de espada de prata de _+1 impacto_ por 10 minutos. Se a bengala contiver uma dose de veneno com característica de ferimento, esse veneno será automaticamente aplicado à arma. Se o veneno não tiver sido consumido quando a cana voltar ao normal, ele permanecerá armazenado na cana. Você pode Dispensar esta ativação.",
  },
  {
    name: "Soro da serpente prateada",
    actionType: "one",
    traits: ["Concentrate"],
    frequency: "1 vez ao dia",
    requirements: "A _bastão de cobra prateada_ contém uma dose de um item alquímico",
    effect: "A bengala de cobra prateada pica um alvo voluntário de sua escolha ao seu alcance, causando 1 dano perfurante e injetando o item alquímico. O item é gasto, e se for um elixir ou veneno ingerido, o alvo é afetado como se tivesse consumido o item.",
  },
  {
    name: "Serpente de prata verdadeira",
    actionType: "one",
    traits: ["Concentrate"],
    effect: "A bengala se transforma em uma víbora gigante feita de prata. Todos os seus Golpes são prateados. Age de forma independente, mas obedece a você. Você pode Dispensar esta ativação.",
  },
    ],
  },
  "Singing Stone": {
    description: "Copo de pedra polida que muda de tom conforme a rocha próxima e silencia onde há pouca pedra. Chave planar para teletransporte interplanar e similares: chega a 1d6×25 milhas do destino (em vez de 1d10×25).\n\n**Ativar—Fala da pedra** (manipular)\n**Frequência** 1 vez ao dia\n**Efeito** The _singing stone_ casts _speak with stones_, allowing você to speak and listen through the bowl to communicate with stones. Você pode use the magia normally, or, as você activate the _singing stone_, você pode alvo one stone você pode clearly identify in appearance and location. This alvo must be on the same plane as você or on the Plane of Earth. Você não pode change targets during a single activation.\n\n**Ativar—Visão da pedra** 1 ação (manipular, revelation)\n**Frequência** 1 vez ao dia\n**Efeito** Placing the _singing stone_ against a rocky surface, você cause it to reverberate, revealing what's behind or beneath the surface. Você get a mental image of this area that's 4,5 m deep and 1,5 m in diameter. The image doesn't convey color, but it's clear to você what objects or criaturas within are moving and which are stationary. The image is instant, however, and therefore doesn't allow você to track movement over time.",
    activations: [
  {
    name: "Fala da pedra",
    traits: ["Manipulate"],
    frequency: "1 vez ao dia",
    effect: "A _pedra cantante_ lança _fale com as pedras_, permitindo que você fale e ouça através da tigela para se comunicar com as pedras. Você pode usar a magia normalmente ou, ao ativar a _pedra cantante_, você pode atingir uma pedra que pode identificar claramente na aparência e localização. Este alvo deve estar no mesmo plano que você ou no Plano da Terra. Você não pode alterar os alvos durante uma única ativação.",
  },
  {
    name: "Visão da pedra",
    actionType: "one",
    traits: ["Manipulate","Revelation"],
    frequency: "1 vez ao dia",
    effect: "Colocando a pedra cantante contra uma superfície rochosa, você faz com que ela reverbere, revelando o que está por trás ou abaixo da superfície. Você tem uma imagem mental dessa área que tem 4,5 m de profundidade e 1,5 m de diâmetro. A imagem não transmite cor, mas fica claro para você quais objetos ou criaturas dentro dela estão se movendo e quais estão estacionárias. A imagem é instantânea, entretanto, e portanto não permite que você rastreie o movimento ao longo do tempo.",
  },
    ],
  },
  "Sinuous Recorder": {
    description: "Flauta doce de freixo polido, padrão serpenteado. +1 de item em Atuação ao tocar.\n\n**Ativar—Acalmar serpentes** 2 ações (auditivo, concentrar, manipular)\n**Frequência** 1 vez ao dia\n**Efeito** Você play a swift composition that fascinates all snakes, pythons, vipers, and serpents that hear it. At the GM’s discretion, criaturas with major serpentine features, such as serpentfolk, are also subjected to this effect. All such criaturas within a 9 m emanation deve fazer um teste CD 20 salvaguarda de Vontade. **Sucesso crítico** O alvo’s attitude toward você decreases by one step. **Sucesso** The criatura is unaffected. **Falha** O alvo’s attitude toward você improves by one step, and it feels a powerful urge to dance. It takes a –5- foot penalidade to its Speeds por 1 minuto as it sways and dances to the music. **Falha crítica** As failure, but o alvo’s attitude toward você improves by two steps.",
    activations: [
  {
    name: "Acalmar serpentes",
    actionType: "two",
    traits: ["Auditory","Concentrate","Manipulate"],
    frequency: "1 vez ao dia",
    effect: "Você toca uma composição veloz que fascina todas as cobras, pítons, víboras e serpentes que a ouvem. A critério do Mestre, criaturas com características serpentinas importantes, como o povo serpente, também estão sujeitas a este efeito. Todas essas criaturas dentro de uma emanação de 9 meses devem fazer um teste CD 20 segurança de Vontade. **Sucesso crítico** A atitude de O alvo em relação a você diminui um passo. **Sucesso** A criatura não é afetada. **Falha** A atitude de O alvo em relação a você melhora um passo, e ele sente uma forte vontade de dançar. Ele leva –1.5 m para atingir sua velocidade por 1 minuto enquanto balança e dança ao som da música. **Falha crítica** Como fracasso, mas a atitude do alvo em relação a você melhora em dois passos.",
  },
    ],
  },
  "Skeleton Key": {
    description: "Chave macabra com caveira. Serve de kit de ladrão para Arrombar, com +1 de bônus de item em Prestidigitação. 1 vez ao dia, conjura abrir fechadura. Se quebrar no crítico, perde os benefícios até conserto.\n\n**Ativar—Afrouxar fechadura** ação livre (manipular)\n**Frequência** 1 vez ao dia\n**Efeito** The key casts _knock_ on the lock você're trying to pick.",
    activations: [
  {
    name: "Afrouxar fechadura",
    actionType: "free",
    traits: ["Manipulate"],
    frequency: "1 vez ao dia",
    effect: "A chave dá _batida_ na fechadura que você está tentando arrombar.",
  },
    ],
  },
  "Skeleton Key (Greater)": {
    description: "Versão maior: +2 de bônus de item em Prestidigitação para Arrombar, e a\n\n**Ativar—Afrouxar fechadura** ação livre (manipular)\n**Frequência** 1 vez ao dia\n**Efeito** The key casts _knock_ on the lock você're trying to pick.",
    activations: [
  {
    name: "Afrouxar fechadura",
    actionType: "free",
    traits: ["Manipulate"],
    frequency: "1 vez ao dia",
    effect: "A chave dá _batida_ na fechadura que você está tentando arrombar.",
  },
    ],
  },
  "Skinsaw Mask": {
    description: "Retalhos de pele humanóide costurados com seda ou arame pretos, olho laranja de vidro e fileira de dentes. Você sabe o valor de amedrontado de qualquer criatura observada e ganha +1 de item em Percepção para Procurar amedrontados. +1 de dano de precisão extra ao causar precisão em amedrontado. Se não for profano, fica drenado 2 enquanto a usa.",
  },
  "Skittering Mask": {
    description: "Máscara de madeira que cobre a cabeça, com furos nas laterais. Na primeira vez ao dia em que começar o turno inconsciente a até 7,5 m de um inimigo, pernas metálicas saem dos furos e dão um Passo de 1,5 m para longe do inimigo mais próximo, arrastando você (ao acaso se empatar). Sem sentidos especiais: ignora escondidos ou não detectados e não distingue quem não age de forma hostil.",
  },
  "Skittering Mask (Greater)": {
    description: "Máscara de madeira que cobre a cabeça, com furos nas laterais. Na primeira vez ao dia em que começar o turno inconsciente a até 7,5 m de um inimigo, pernas metálicas dão um Passo de 4,5 m para longe do mais próximo, arrastando você. Por 1 minuto, cada turno inconsciente a até 7,5 m de um inimigo, Passo de 4,5 m de novo. Um aliado pode sinalizar (1 ação, auditivo e concentrar): se a máscara ouvir, tenta ir na direção dele ao se afastar. Sem sentidos especiais contra escondidos ou não detectados.",
  },
  "Sky Hammer": {
    description: "Martelo de guerra de oricalco +3 impactante máximo flamejante choque, cabeça de cometa.\n\n**Ativar—Queda do cometa** reação (concentrar, fireball)\n**Gatilho** Seu rolagem de ataque with the _sky hammer_ is a critical success\n**Efeito** A 6º posto arcane fireball magia explodes, centered on the sky hammer. The CD de magia is 45. Você está immune to the fireball's effect, though seu aliados are not.",
    activations: [
  {
    name: "Queda do cometa",
    actionType: "reaction",
    traits: ["Concentrate","Fireball"],
    trigger: "Sua rolagem de ataque com o _sky Hammer_ é um sucesso de crítica",
    effect: "Uma bola de fogo arcana de 6º posto explode, centrada no martelo celeste. O CD de magia é 45. Você está imune ao efeito da bola de fogo, mas seus aliados não.",
  },
    ],
  },
  "Slates of Distant Letters": {
    description: "Par de ardósias iguais. Escrever em uma copia o texto na outra, no mesmo plano. O preço é do par; se uma quebrar, a outra se desfaz.\n\n**Ativar—Enviar mensagem** 2 ações (manipular)\n**Frequência** 1 vez por hora\n**Efeito** Você use a piece of chalk to write up to 25 words on a slate. As você write, the writing also appears on the other slate in its matched pair, no matter how far away it is, enquanto it is on the same plane. Wiping one slate clean erases the writing from both slates. Each slate can be activated 1 vez por hora.",
    activations: [
  {
    name: "Enviar mensagem",
    actionType: "two",
    traits: ["Manipulate"],
    frequency: "1 vez por hora",
    effect: "Você usa um pedaço de giz para escrever até 25 palavras em uma lousa. À medida que você escreve, a escrita também aparece na outra lousa em seu par correspondente, não importa quão longe ela esteja, enquanto estiver no mesmo plano. Limpar uma lousa apaga a escrita de ambas as lousas. Cada slate pode ser ativado 1 vez por hora.",
  },
    ],
  },
  "Sleeves of Storage": {
    description: "Veste de mangas largas, cada uma um espaço extradimensional (5 de Carga). Familiar Minúsculo pode se esconder numa manga vazia por 1 hora.",
  },
  "Sleeves of Storage (Greater)": {
    description: "Versão maior: 20 de Carga por manga e familiar por até 4 horas.",
  },
  "Smoke Veil": {
    description: "_Smoke veils_ are wigs or headdresses made of flame and ash, giving the wearer a burning coil of fiery hair and concealing their face behind a smoldering, omnipresent haze of smoke and sparking embers. Você pode use the veil to go unrecognized by hiding seu face so that você pode attempt Enganação testes to Impersonate without needing a disguise kit. When você do so, it takes você only 1 minute to create the disguise, and você ganha a +1 bônus de item em the teste. Você still need a disguise kit and the full time if você're using cosmetics and other props to change other aspects of seu disguise, or if Impersonating a specific person.\n\n**Ativar—Olhar flamejante** 1 ação (concentrar, auditivo, visual)\n**Requisitos** Você dealt dano de fogo to a alvo você pode see within 9 m with seu most recent ação this turno\n**Efeito** Você set seu fiery gaze on seu alvo, eyes burning within a cloud of ash and cinder. Roll an Intimidação teste to Demoralize o alvo. Demoralize loses the auditory trait and gains the visual trait, and você don't take a penalidade when você attempt to Demoralize a criatura that doesn't understand seu language.",
    activations: [
  {
    name: "Olhar flamejante",
    actionType: "one",
    traits: ["Concentrate","Auditory","Visual"],
    requirements: "Você causou dano de fogo a um alvo que você pode ver dentro de 9 m com sua ação mais recente neste turno",
    effect: "Você fixou seu olhar ardente em seu alvo, olhos queimando dentro de uma nuvem de cinzas e cinzas. Faça um teste de Intimidação para Desmoralizar o alvo. Desmoralizar perde o traço auditivo e ganha o traço visual, e você não se preocupa ao tentar Desmoralizar uma criatura que não entende sua linguagem.",
  },
    ],
  },
  "Snare of Speed": {
    description: "Caixa-clara e baquetas de madeira escura, pele de antílope. +2 de item em Atuação ao tocar.\n\n**Ativar—Prestissimo** 2 ações (auditivo, concentrar, manipular)\n**Frequência** 1 vez ao dia\n**Efeito** Você play the snare with an extreme cadence. Você and all aliados within a 9 m emanation gain the acelerado condition até o fim do seu próximo turno and can use the extra ação each rodada for only Step and Avançar ações.\n\n**Ativar—Larghissimo** 2 ações (auditivo, concentrar, manipular)\n**Frequência** 1 vez ao dia\n**Efeito** Você play the snare with a lassitude that drains the speed from seu foes. Enemies within a 9 m emanation deve fazer um teste CD 34 salvaguarda de Fortitude. **Sucesso crítico** The criatura is unaffected. **Sucesso** The criatura lento 1 por 1 rodada. **Falha** The criatura is lento 2 por 1 rodada. **Falha crítica** The criatura is lento 2 and desprevenido por 1 rodada.",
    activations: [
  {
    name: "Prestissimo",
    actionType: "two",
    traits: ["Auditory","Concentrate","Manipulate"],
    frequency: "1 vez ao dia",
    effect: "Você toca a caixa com uma cadência extrema. Você e todos os aliados dentro de uma emanação de 9 meses ganham a condição acelerada até o fim do seu próximo turno e podem usar a ação extra a cada rodada apenas para as ações Passo e Avançar.",
  },
  {
    name: "Larghissimo",
    actionType: "two",
    traits: ["Auditory","Concentrate","Manipulate"],
    frequency: "1 vez ao dia",
    effect: "Você toca a armadilha com uma lassidão que drena a velocidade de seus inimigos. Inimigos dentro de uma emanação de 9 meses devem fazer um teste CD 34 salvaguarda de Fortitude. **Sucesso crítico** A criatura não é afetada. **Sucesso** A criatura lenta 1 por 1 rodada. **Falha** A criatura é lenta 2 por 1 rodada. **Falha crítica** A criatura é lenta 2 e desprevenida por 1 rodada.",
  },
    ],
  },
  "Spark Wafer": {
    description: "Bolacha de reagentes. Quebrar e lançar: faíscas coloridas inofensivas numa emanação de 1,5 m por 1 rodada, só visuais.",
  },
  "Sparkshade Parasol": {
    description: "Sombrinha que protege do calor (sol ou lava). Empunhada: resistência 10 a fogo e proteção contra calor ambiental leve, severo e extremo.\n\n**Ativar—Proteção da sombrinha** reação (manipular)\n**Frequência** 1 vez a cada 10 minutos\n**Gatilho** Você're targeted by or inside the area of an effect that deals dano de fogo\n**Efeito** Você hold seu parasol between yourself and the incoming flames, gaining fire resistência 20 against the triggering effect. (This applies only to any dano the effect deals.) For the next 1 minute, flames dance harmlessly along the parasol's brim, letting você use Parasol's Pyrotechnics.\n\n**Ativar—Pirotecnia da sombrinha** 2 ações (concentrar, manipular)\n**Requisitos** Flames are dancing on the sparkshade parasol due to você using Parasol's Protection\n**Efeito** Você release captured flames out from seu parasol, shooting fire in a 9 m line. Each criatura in the line takes 10d6 dano de fogo (CD 28 Reflexos básico save). This activation loses its charge.",
    activations: [
  {
    name: "Proteção da sombrinha",
    actionType: "reaction",
    traits: ["Manipulate"],
    frequency: "1 vez a cada 10 minutos",
    trigger: "Você está sendo alvo de ou dentro da área de um efeito que causa dano de fogo",
    effect: "Você segura seu guarda-sol entre você e as chamas que se aproximam, ganhando resistência ao fogo 20 contra o efeito desencadeante. (Isso se aplica apenas a qualquer dano causado pelo efeito.) Pelo próximo 1 minuto, as chamas dançam inofensivamente ao longo da borda do guarda-sol, permitindo que você use a Pirotecnia do Parasol.",
  },
  {
    name: "Pirotecnia da sombrinha",
    actionType: "two",
    traits: ["Concentrate","Manipulate"],
    requirements: "As chamas estão dançando no guarda-sol devido a você usar a proteção do guarda-sol",
    effect: "Você libera chamas capturadas de seu guarda-sol, atirando fogo em uma linha de 9 m. Cada criatura da linha sofre 10d6 de dano de fogo (CD 28 Reflexosos básicos save). Esta ativação perde sua carga.",
  },
    ],
  },
  "Spectacles of Inquiry": {
    description: "Anything viewed through these thin spectacles looks crisp and clear, and the earpieces accentuate sounds around você. Você ganha +2 bônus de item em Percepção testes.\n\n**Ativar** 1 ação (concentrar)\n**Frequência** 1 vez por hora\n**Efeito** The spectacles key in on someone to show você their social cues in perfect clarity. Choose a criatura você pode see. Você ganha +3 bônus de item on Percepção testes você make to use Sense Motive against that criatura. This benefit lasts until você Ativar the item again in this way. Se você’re an investigator, você pode use this activation as part of the Devise a Stratagem ação (even if você’re doing it as a ação livre). Alternatively, você pode use it as part of the Pursue a Lead activity, even though você pode’t see the criatura. Você deve choose the same criatura você chose for Devise a Stratagem or Pursue a Lead.",
    activations: [
  {
    name: "",
    actionType: "one",
    traits: ["Concentrate"],
    frequency: "1 vez por hora",
    effect: "Os espetáculos mostram a alguém suas dicas sociais com perfeita clareza. Escolha uma criatura que você pode ver. Você ganha +3 bônus de item em Percepção testes que você faz para usar Sense Motive contra aquela criatura. Este benefício dura até você ativar o item novamente desta forma. Se você for um investigador, poderá usar esta ativação como parte da ação Elaborar um Estratagema (mesmo que esteja fazendo isso como uma ação livre). Alternativamente, você pode usá-lo como parte da atividade Perseguir uma Pista, mesmo que você não possa ver a criatura. Você deve escolher a mesma criatura que escolheu para Elaborar uma Estratagem ou Perseguir uma Pista.",
  },
    ],
  },
  "Spectacles of Piercing Sight": {
    description: "With lenses set in a silver frame, _spectacles of piercing_ sight concedem a você a +3 bônus de item em visual Percepção testes.\n\n**Ativar** 1 ação (concentrar)\n**Frequência** 1 vez por hora\n**Efeito** Você pode see into and through solid matter por 1 minuto. This vision can pierce through solid materials up to 6 m away as if looking at something in normal light even if no illumination is available. Você pode see through up to 1 foot of stone, 1 inch of metal, or 3 pés of wood or dirt. A thin sheet of lead blocks this vision entirely.",
    activations: [
  {
    name: "",
    actionType: "one",
    traits: ["Concentrate"],
    frequency: "1 vez por hora",
    effect: "Você pode ver dentro e através da matéria sólida por 1 minuto. Esta visão pode penetrar materiais sólidos a até 6 m de distância, como se estivesse olhando para algo sob luz normal, mesmo que não haja iluminação disponível. Você pode ver através de até 30 centímetros de pedra, 1 polegada de metal ou 0,9 m de madeira ou terra. Uma fina folha de chumbo bloqueia totalmente esta visão.",
  },
    ],
  },
  "Spellguard Shield": {
    description: "Escudo de aço com glifos. Erguido: o bônus de circunstância também vale em salvaguardas contra magias que visam você, e você pode Bloquear essas magias se tiver a ação.",
  },
  "Spiced Demonade": {
    description: "Bebida vermelha azeda de academia. Ao beber, remove fatigado e por 1 hora você trata o valor de fatigado como 1 menor para determinar penalidades (mínimo 0). Não cura a condição.",
  },
  "Spined Shield": {
    description: "Cinco espinhos (espinhos de escudo +1 impactantes). Ao Bloquear, os espinhos absorvem primeiro: cada 6 de dano (após Dureza) parte um espinho. Sem espinhos, o escudo sofre dano normal. Regeneram no dia seguinte.\n\n**Ativar—Espinho de fogo** 1 ação (manipular)\n**Efeito** Você shoot one of the shield's spines at a alvo. A fired spine uses the spikes' statistics, but it's a martial ranged arma with a range increment of 36 m.",
    activations: [
  {
    name: "Espinho de fogo",
    actionType: "one",
    traits: ["Manipulate"],
    effect: "Você atira uma das pontas do escudo em um alvo. Uma espinha disparada usa as estatísticas dos espinhos, mas é uma arma marcial de longo alcance com um incremento de alcance de 36 m.",
  },
    ],
  },
  "Spiral Chimes": {
    description: "Sinos de metal numa estátua de nuvem ou elemental de ar. Chave planar para teletransporte interplanar e similares: chega a 1d6×25 milhas do destino (em vez de 1d10×25).\n\n**Ativar—Sino da previsão** (manipular, prediction)\n**Efeito** Você let the _spiral chimes_ play in the wind, interpreting the music to predict the weather at seu location for the next 24 hours. Você receive advanced warning of the temperature, humidity, storms, natural disasters (such as tornadoes, floods, or volcanic eruptions), and other weather conditions that naturally arise. The information você ganha through the _spiral chimes_ doesn't take magical occurrences that might change the weather into account.\n\n**Ativar—Sino revelador** 1 ação (manipular, sonic)\n**Frequência** 1 vez ao dia\n**Efeito** Você ring the chimes, blanketing everything in a 9 m burst within 36 m in visible, reverberating sound. This can negate invisibility, making criaturas oculto em vez de invisível. The duration and other effects depend on the result of each criatura's attempt at a CD 30 salvaguarda de Reflexos. **Sucesso crítico** O alvo is unaffected. **Sucesso** O alvo's invisibility is negated for 2 rodadas. **Falha** O alvo is surdo por 1 minuto, and its invisibility is negated por 1 minuto. **Falha crítica** O alvo is surdo por 10 minutos, and its invisibility is negated por 10 minutos.",
    activations: [
  {
    name: "Sino da previsão",
    traits: ["Manipulate","Prediction"],
    effect: "Você deixa os _sinos em espiral_ tocarem ao vento, interpretando a música para prever o tempo em seu local para as próximas 24 horas. Você recebe avisos prévios sobre temperatura, umidade, tempestades, desastres naturais (como tornados, inundações ou erupções vulcânicas) e outras condições climáticas que surgem naturalmente. As informações que você obtém por meio dos _sinos em espiral_ não levam em consideração ocorrências mágicas que possam alterar o clima.",
  },
  {
    name: "Sino revelador",
    actionType: "one",
    traits: ["Manipulate","Sonic"],
    frequency: "1 vez ao dia",
    effect: "Você toca os sinos, cobrindo tudo em uma explosão de 9 m dentro de 36 m em som visível e reverberante. Isso pode negar a invisibilidade, tornando as criaturas ocultas em vez de invisíveis. A duração e outros efeitos dependem do resultado da tentativa de cada criatura de obter um CD 30 salvaguarda de Reflexosos. **Sucesso crítico** O alvo não é afetado. **Sucesso** A invisibilidade de O alvo é negada por 2 rodadas. **Falha** O alvo é surdo por 1 minuto, e sua invisibilidade é negada por 1 minuto. **Falha crítica** O alvo é surdo por 10 minutos, e sua invisibilidade é negada por 10 minutos.",
  },
    ],
  },
  "Spiritsight Ring": {
    description: "Anel de marfim com opala que fica translúcida e coça o dedo perto de incorpóreos. Detecta incorpóreo próximo (mesmo dentro de objeto) como sentido vago, sem localizar na hora. O incorpóreo pode se esconder com Furtividade contra sua CD de Percepção. +2 de item ao Procurar incorpóreos escondidos ou não detectados a 9 m.",
  },
  "Splinter of Finality": {
    description: "Peça de artefato de arquétipo. Estilhaço de metal negro que nunca cega: cravado no pescoço, ancora a alma; –1 de status em salvaguardas contra desajeitado, drenado ou enfraquecido (–2 no 10º nível), resistência a espírito igual ao nível e +2 de status contra espíritos, assombrações e contra confuso, controlado, condenado ou estupefato. Destruição: reunir os 13 estilhaços, reconstruir Silent Lenore e destruí-la com o ritual embotar a lâmina final.",
  },
  "Spotless Spats": {
    description: "Polainas brancas imaculadas sobre as botas, indispensáveis em parada. Enquanto as usa, a indumentária é limpa magicamente a cada 10 minutos, como prestidigitação.",
  },
  "Squire": {
    description: "Squires with aspirations of being knights wear these loose, colorful tunics, typically emblazoned with the crest of the knight or kingdom they serve.\n\n**Ativar—Em seu auxílio** 1 ação (concentrar)\n**Frequência** 1 vez ao dia\n**Efeito** Você race to the side of an aliado who needs seu help. Você Avançar twice, ignoring terreno difícil, but seu movement must end adjacent to an aliado.",
    activations: [
  {
    name: "Em seu auxílio",
    actionType: "one",
    traits: ["Concentrate"],
    frequency: "1 vez ao dia",
    effect: "Você corre para o lado de um aliado que precisa de sua ajuda. Você avança duas vezes, ignorando terreno difícil, mas seu movimento deve terminar adjacente a um aliado.",
  },
    ],
  },
  "Squire's Tabard": {
    description: "Túnica solta e colorida, em geral com o brasão do cavaleiro ou reino.\n\n**Ativar—Em seu auxílio** 1 ação (concentrar)\n**Frequência** 1 vez ao dia\n**Efeito** Você race to the side of an aliado who needs seu help. Você Avançar twice, ignoring terreno difícil, but seu movement must end adjacent to an aliado.",
    activations: [
  {
    name: "Em seu auxílio",
    actionType: "one",
    traits: ["Concentrate"],
    frequency: "1 vez ao dia",
    effect: "Você corre para o lado de um aliado que precisa de sua ajuda. Você avança duas vezes, ignorando terreno difícil, mas seu movimento deve terminar adjacente a um aliado.",
  },
    ],
  },
  "Stalwart’s Banner": {
    description: "Estandarte verde de verão (afixado ou empunhado). Enquanto o empunha:\n\n**Ativar—Manter-se firme** 1 ação (concentrar)\n**Frequência** 1 vez por minuto\n**Efeito** Você and aliados within seu banner’s aura gain 5 PV temporários and a +1 bônus de status em seu Fortitude CD and Reflexos CD against any effect that would move você or knock você caído. These effects last por 1 rodada.",
    activations: [
  {
    name: "Manter-se firme",
    actionType: "one",
    traits: ["Concentrate"],
    frequency: "1 vez por minuto",
    effect: "Você e aliados dentro da aura de seu estandarte ganham 5 PV temporários e +1 bônus de status em seu CD Fortitude e CD Reflexosos contra qualquer efeito que mova você ou derrube você. Esses efeitos duram por 1 rodada.",
  },
    ],
  },
  "Stalwart’s Banner (Greater)": {
    description: "Estandarte verde de verão (afixado ou empunhado). Enquanto o empunha:\n\n**Ativar—Manter-se firme** 1 ação (concentrar)\n**Frequência** 1 vez por minuto\n**Efeito** Você and aliados within seu banner’s aura gain 5 PV temporários and a +1 bônus de status em seu Fortitude CD and Reflexos CD against any effect that would move você or knock você caído. These effects last por 1 rodada.",
    activations: [
  {
    name: "Manter-se firme",
    actionType: "one",
    traits: ["Concentrate"],
    frequency: "1 vez por minuto",
    effect: "Você e aliados dentro da aura de seu estandarte ganham 5 PV temporários e +1 bônus de status em seu CD Fortitude e CD Reflexosos contra qualquer efeito que mova você ou derrube você. Esses efeitos duram por 1 rodada.",
  },
    ],
  },
  "Stalwart’s Banner (Major)": {
    description: "Estandarte verde de verão (afixado ou empunhado). Enquanto o empunha:\n\n**Ativar—Manter-se firme** 1 ação (concentrar)\n**Frequência** 1 vez por minuto\n**Efeito** Você and aliados within seu banner’s aura gain 5 PV temporários and a +1 bônus de status em seu Fortitude CD and Reflexos CD against any effect that would move você or knock você caído. These effects last por 1 rodada.",
    activations: [
  {
    name: "Manter-se firme",
    actionType: "one",
    traits: ["Concentrate"],
    frequency: "1 vez por minuto",
    effect: "Você e aliados dentro da aura de seu estandarte ganham 5 PV temporários e +1 bônus de status em seu CD Fortitude e CD Reflexosos contra qualquer efeito que mova você ou derrube você. Esses efeitos duram por 1 rodada.",
  },
    ],
  },
  "Stampede Medallion": {
    description: "Disco de prata do tamanho de uma peça; ao investir no eidolon, vira miniatura cravejada presa sobre o coração dele. +2 de item em Atletismo para Empurrar ou Derrubar.\n\n**Ativar—Maré impossível** 2 ações (concentrar)\n**Frequência** 1 vez ao dia\n**Efeito** Seu eidolon momentarily manifests into a stampede of dozens of copies of themself. The stampede rampages out in every direction, swerving around seu aliados while trampling any foe on the ground in an emanation around seu eidolon with a radius equal to seu eidolon’s Speed. Each of these foes takes 8d6 dano de concussão, with a CD 29 Reflexos básico save. On a critical failure, the foe is also knocked caído. After dealing dano, the stampede of eidolons vanishes as quickly as it appeared.",
    activations: [
  {
    name: "Maré impossível",
    actionType: "two",
    traits: ["Concentrate"],
    frequency: "1 vez ao dia",
    effect: "Seu eidolon se manifesta momentaneamente em uma debandada de dezenas de cópias de si mesmo. A debandada se espalha em todas as direções, desviando de seus aliados enquanto atropela qualquer inimigo no chão em uma emanação ao redor de seu eidolon com um raio igual ao Deslocamento de seu eidolon. Cada um desses inimigos sofre 8d6 de dano de concussão, com um salvamento CD 29 Reflexosos básicos. Em uma falha crítica, o inimigo também é derrubado. Depois de causar dano, a debandada de eidolons desaparece tão rapidamente quanto apareceu.",
  },
    ],
  },
  "Stampede Medallion (Greater)": {
    description: "Ao investir no eidolon, vira miniatura cravejada sobre o coração dele. +2 de item em Atletismo para Empurrar ou Derrubar.\n\n**Ativar—Maré impossível** 2 ações (concentrar)\n**Frequência** 1 vez ao dia\n**Efeito** Seu eidolon momentarily manifests into a stampede of dozens of copies of themself. The stampede rampages out in every direction, swerving around seu aliados while trampling any foe on the ground in an emanation around seu eidolon with a radius equal to seu eidolon’s Speed. Each of these foes takes 8d6 dano de concussão, with a CD 29 Reflexos básico save. On a critical failure, the foe is also knocked caído. After dealing dano, the stampede of eidolons vanishes as quickly as it appeared.",
    activations: [
  {
    name: "Maré impossível",
    actionType: "two",
    traits: ["Concentrate"],
    frequency: "1 vez ao dia",
    effect: "Seu eidolon se manifesta momentaneamente em uma debandada de dezenas de cópias de si mesmo. A debandada se espalha em todas as direções, desviando de seus aliados enquanto atropela qualquer inimigo no chão em uma emanação ao redor de seu eidolon com um raio igual ao Deslocamento de seu eidolon. Cada um desses inimigos sofre 8d6 de dano de concussão, com um salvamento CD 29 Reflexosos básicos. Em uma falha crítica, o inimigo também é derrubado. Depois de causar dano, a debandada de eidolons desaparece tão rapidamente quanto apareceu.",
  },
    ],
  },
  "Stampede Medallion (Major)": {
    description: "Ao investir no eidolon, vira miniatura cravejada sobre o coração dele. +3 de item em Atletismo para Empurrar ou Derrubar.\n\n**Ativar—Maré impossível** 2 ações (concentrar)\n**Frequência** 1 vez ao dia\n**Efeito** Seu eidolon momentarily manifests into a stampede of dozens of copies of themself. The stampede rampages out in every direction, swerving around seu aliados while trampling any foe on the ground in an emanation around seu eidolon with a radius equal to seu eidolon’s Speed. Each of these foes takes 8d6 dano de concussão, with a CD 29 Reflexos básico save. On a critical failure, the foe is also knocked caído. After dealing dano, the stampede of eidolons vanishes as quickly as it appeared.",
    activations: [
  {
    name: "Maré impossível",
    actionType: "two",
    traits: ["Concentrate"],
    frequency: "1 vez ao dia",
    effect: "Seu eidolon se manifesta momentaneamente em uma debandada de dezenas de cópias de si mesmo. A debandada se espalha em todas as direções, desviando de seus aliados enquanto atropela qualquer inimigo no chão em uma emanação ao redor de seu eidolon com um raio igual ao Deslocamento de seu eidolon. Cada um desses inimigos sofre 8d6 de dano de concussão, com um salvamento CD 29 Reflexosos básicos. Em uma falha crítica, o inimigo também é derrubado. Depois de causar dano, a debandada de eidolons desaparece tão rapidamente quanto apareceu.",
  },
    ],
  },
  "Standard of the Primeval Howl": {
    description: "Estandarte de madeira bruta e couro com fera rosnando. Empunhado, +1 de item em Intimidação e iniciativa; criaturas numa emanação de 6 m também ganham +1 de item na iniciativa.\n\n**Ativar** reação (concentrar)\n**Frequência** 1 vez por hora\n**Gatilho** An aliado within 6 m of você critically hits with a Golpe\n**Requisitos** Você tem the Battle Cry skill feat\n**Efeito** Você attempt to Demoralize the foe the Golpe hit.",
    activations: [
  {
    name: "",
    actionType: "reaction",
    traits: ["Concentrate"],
    frequency: "1 vez por hora",
    trigger: "Um aliado a até 6 m de você acerta criticamente com um Golpe",
    requirements: "Você tem o talento de habilidade Battle Cry",
    effect: "Você tenta Desmoralizar o inimigo atingido pelo Golpe.",
  },
    ],
  },
  "Standard of the Sure-Footed": {
    description: "Estandarte laranja brilhante com detalhes cinza-aço (afixado ou empunhado). Enquanto o empunha:\n\n**Ativar—Ajudar a levantar** 1 ação (air, concentrar)\n**Frequência** once per turno\n**Efeito** A gust of wind gives an aliado a helpful lift. An aliado within the banner’s aura can Stand as a ação livre.",
    activations: [
  {
    name: "Ajudar a levantar",
    actionType: "one",
    traits: ["Air","Concentrate"],
    frequency: "uma vez por turno",
    effect: "Uma rajada de vento dá ao aliado uma sustentação útil. Um aliado dentro da aura do estandarte pode permanecer como uma ação livre.",
  },
    ],
  },
  "Standard of the True Ally": {
    description: "Estandarte que lembra o vínculo entre camaradas (afixado ou empunhado). Sempre que você ou aliado na emanação do estandarte gasta uma ação no próprio turno para se preparar para Ajudar, pode Passar ou Avançar em direção a um aliado como parte dessa ação. Depois fica imune por 10 minutos.",
  },
  "Starfaring Cloak": {
    description: "Dobras com o céu noturno; luz tênue a 3 m. +3 m de item ao Deslocamento e voo igual a ele. Sem respirar; sobrevive no vazio e a frio ou calor severo ou extremo. Luz de estrela ou sol por 1 hora ao dia substitui comida e bebida. Navegação perfeita pelo céu.\n\n**Ativar** reação (concentrar, destino, destino)\n**Frequência** 1 vez ao dia\n**Gatilho** Você make an rolagem de ataque, teste de perícia, or salvaguarda\n**Efeito** Reroll the triggering roll and take the higher result. This is a fortune effect.\n\n**Ativar** 2 ações (concentrar, manipular)\n**Frequência** 1 vez ao dia\n**Efeito** The cloak casts _sleep_ at 4th rank (CD 42).\n\n**Ativar** 3 ações (concentrar)\n**Frequência** 1 vez por semana\n**Efeito** The cloak casts _teleport_ at 10th rank. Se você name no destination, it teleports você to a random planet in a random location that's safe for você. **Destruction** If the wearer of a _starfaring cloak_ is bound by imprisonment for a century and a day, the cloak dissolves into light. This time is reduced to a year and a day if the wearer is placed in eternal slumber by _imprisonment_ and subjected to the _nightmare_ magia 1 vez ao dia.",
    activations: [
  {
    name: "",
    actionType: "reaction",
    traits: ["Concentrate","Fortune","Fortune"],
    frequency: "1 vez ao dia",
    trigger: "Você make an rolagem de ataque, teste de perícia, or salvaguarda",
    effect: "Role novamente o teste de ativação e obtenha o resultado mais alto. Este é um efeito de sorte.",
  },
  {
    name: "",
    actionType: "two",
    traits: ["Concentrate","Manipulate"],
    frequency: "1 vez ao dia",
    effect: "A capa lança _sono_ na 4ª posição (CD 42).",
  },
  {
    name: "",
    actionType: "three",
    traits: ["Concentrate"],
    frequency: "1 vez por semana",
    effect: "A capa lança _teletransporte_ na 10ª posição. Se você não nomear nenhum destino, ele teletransporta você para um planeta aleatório em um local aleatório que seja seguro para você. **Destruição** Se o usuário de um _manto estelar_ for preso por um século e um dia, o manto se dissolverá em luz. Este tempo é reduzido para um ano e um dia se o usuário for colocado em sono eterno por _aprisionamento_ e submetido à magia _pesadelo_ 1 vez ao dia.",
  },
    ],
  },
  "Staring Skull": {
    description: "Caveira no peito ou dorso da mão. +1 de item em Intimidação. Ativar (concentrar, visual, emoção): 1 vez ao dia. Uma criatura a 9 m que possa vê-lo: Vontade CD 24 ou amedrontado 2 (amedrontado 3 no crítico).",
  },
  "Static-Muscular Relay": {
    description: "Orbe de vidro com bobina e eletricidade visível. Ativar: por 1 minuto, +1,5 m no seu Deslocamento e +1 de status em Reflexos. Depois você fica desajeitado 1 por 1 minuto.",
  },
  "Storm Flash": {
    description: "This _+2 impacto maior shock rapier_ has a golden blade, and miniature electric arcs flash across its guard while it's wielded. When out of its sheath under an open sky, the blade causes storm clouds to gather slowly above.\n\n**Ativar—Punhalada reluzente** 2 ações (concentrar, manipular)\n**Frequência** 1 vez ao dia\n**Efeito** Você conjura a 6º posto _lightning bolt_ (CD 33).\n\n**Ativar—Desviar iluminação** reação (concentrar)\n**Frequência** 1 vez a cada 10 minutos\n**Gatilho** An electricity effect targets você or a criatura within 3 m of você, or has você or a criatura within 3 m of você in its area\n**Efeito** Você try to divert the electricity off course, to be absorbed by _storm flash_. Choose one eligible criatura to protect and roll a melee rolagem de ataque against the CD of the electricity effect. Se você passar, the chosen criatura takes no dano de eletricidade from the triggering effect.",
    activations: [
  {
    name: "Punhalada reluzente",
    actionType: "two",
    traits: ["Concentrate","Manipulate"],
    frequency: "1 vez ao dia",
    effect: "Você conjura a 6º posto _lightning bolt_ (CD 33).",
  },
  {
    name: "Desviar iluminação",
    actionType: "reaction",
    traits: ["Concentrate"],
    frequency: "1 vez a cada 10 minutos",
    trigger: "Um efeito de eletricidade atinge você ou uma criatura dentro de 3 m de você, ou tem você ou uma criatura dentro de 3 m de você em sua área",
    effect: "Você tenta desviar a eletricidade do curso, para ser absorvida pela _tempestade_. Escolha uma criatura elegível para proteger e faça uma rolagem de ataque corpo a corpo contra o CD do efeito eletricidade. Se você passar, a criatura escolhida não sofre dano de eletricidade do efeito de ativação.",
  },
    ],
  },
  "Storm Flash (Greater)": {
    description: "Florete +3 impactante maior choque maior. O raio é de 8º posto (CD 38).\n\n**Ativar—Punhalada reluzente** 2 ações (concentrar, manipular)\n**Frequência** 1 vez ao dia\n**Efeito** Você conjura a 6º posto _lightning bolt_ (CD 33).\n\n**Ativar—Desviar iluminação** reação (concentrar)\n**Frequência** 1 vez a cada 10 minutos\n**Gatilho** An electricity effect targets você or a criatura within 3 m of você, or has você or a criatura within 3 m of você in its area\n**Efeito** Você try to divert the electricity off course, to be absorbed by _storm flash_. Choose one eligible criatura to protect and roll a melee rolagem de ataque against the CD of the electricity effect. Se você passar, the chosen criatura takes no dano de eletricidade from the triggering effect.",
    activations: [
  {
    name: "Punhalada reluzente",
    actionType: "two",
    traits: ["Concentrate","Manipulate"],
    frequency: "1 vez ao dia",
    effect: "Você conjura a 6º posto _lightning bolt_ (CD 33).",
  },
  {
    name: "Desviar iluminação",
    actionType: "reaction",
    traits: ["Concentrate"],
    frequency: "1 vez a cada 10 minutos",
    trigger: "Um efeito de eletricidade atinge você ou uma criatura dentro de 3 m de você, ou tem você ou uma criatura dentro de 3 m de você em sua área",
    effect: "Você tenta desviar a eletricidade do curso, para ser absorvida pela _tempestade_. Escolha uma criatura elegível para proteger e faça uma rolagem de ataque corpo a corpo contra o CD do efeito eletricidade. Se você passar, a criatura escolhida não sofre dano de eletricidade do efeito de ativação.",
  },
    ],
  },
  "Sturdy Neck Stock": {
    description: "Tira grossa de couro com fios roxos: gravata atraente que protege o pescoço de golpes que você não vê. +1 de circunstância na CA contra ataques enquanto desprevenido por flanqueamento.\n\n**Ativar—Esticar o estoque** 1 ação (concentrar)\n**Frequência** 1 vez ao dia\n**Efeito** The _sturdy neck_ stock expands to cover not only seu neck but also seu shoulders and the back of seu head. For 1 minute, você están’t desprevenido to escondido, indetectado, or flanking criaturas, or criaturas using surprise attack of seu level or lower.",
    activations: [
  {
    name: "Esticar o estoque",
    actionType: "one",
    traits: ["Concentrate"],
    frequency: "1 vez ao dia",
    effect: "A coronha _pescoço robusto_ se expande para cobrir não apenas o pescoço, mas também os ombros e a parte de trás da cabeça. Por 1 minuto, você não fica desprevenido a criaturas escondidas, indetectadas, ou flanqueadoras, ou criaturas usando ataque surpresa de seu nível ou inferior.",
  },
    ],
  },
  "Submersible Helm": {
    description: "Elmo hidrodinâmico. Com a viseira baixa: vê, ouve e fala debaixo d\n\n**Ativar** 3 ações (concentrar, manipular)\n**Frequência** 1 vez ao dia\n**Efeito** Você pode breathe underwater for 8 hours. During this time, você tem a deslocamento de natação equal to seu deslocamento terrestre.",
    activations: [
  {
    name: "",
    actionType: "three",
    traits: ["Concentrate","Manipulate"],
    frequency: "1 vez ao dia",
    effect: "Você pode respirar debaixo d'água por 8 horas. Durante esse período, você tem uma posição de natação igual à sua posição terrestre.",
  },
    ],
  },
  "Submersible Helm (Greater)": {
    description: "Como o elmo básico, mas +2 de item em Atletismo para Nadar. A\n\n**Ativar** 3 ações (concentrar, manipular)\n**Frequência** 1 vez ao dia\n**Efeito** Você pode breathe underwater for 8 hours. During this time, você tem a deslocamento de natação equal to seu deslocamento terrestre.",
    activations: [
  {
    name: "",
    actionType: "three",
    traits: ["Concentrate","Manipulate"],
    frequency: "1 vez ao dia",
    effect: "Você pode respirar debaixo d'água por 8 horas. Durante esse período, você tem uma posição de natação igual à sua posição terrestre.",
  },
    ],
  },
  "Sun Herald": {
    description: "This writing instrument was made from the spur of one of the giant divine roosters that heralds the presence of Shizuru. While você hold it, você ganha a +2 bônus de item em Calligraphy Lore and Medicina testes.\n\n**Ativar—Tinta rejuvenescedora** 2 ações\n**Frequência** 1 vez ao dia\n**Efeito** Drawing a circle on the ground with seu stylus, você cast _field of life_ centered on yourself.",
    activations: [
  {
    name: "Tinta rejuvenescedora",
    actionType: "two",
    frequency: "1 vez ao dia",
    effect: "Desenhando um círculo no chão com sua caneta, você lança _campo da vida_ centrado em você mesmo.",
  },
    ],
  },
  "Sun Herald's Stylus": {
    description: "Estilete feito do esporão de um galo divino que anuncia Shizuru. Enquanto o segura, +2 de item em Conhecimento de Caligrafia e Medicina.\n\n**Ativar—Tinta rejuvenescedora** 2 ações\n**Frequência** 1 vez ao dia\n**Efeito** Drawing a circle on the ground with seu stylus, você cast _field of life_ centered on yourself.",
    activations: [
  {
    name: "Tinta rejuvenescedora",
    actionType: "two",
    frequency: "1 vez ao dia",
    effect: "Desenhando um círculo no chão com sua caneta, você lança _campo da vida_ centrado em você mesmo.",
  },
    ],
  },
  "Sun Sight": {
    description: "Placed under the eyes like rays of light, this tattoo burns away illusions with the unmerciful brilliance of the sun. Você ganha +2 bônus to Percepção testes that involve sight. Se você're ofuscado, você receive a new save at the start of each of seu turns to end seu ofuscado condition.\n\n**Ativar** 3 ações (concentrar)\n**Frequência** 1 vez ao dia\n**Efeito** The tattoo casts a 4º posto _blazing bolt_, with the rays emitting from seu eyes. The number of ações você spend Activating the tattoo determines _blazing bolt’s_ number of rays. The tattoo also attempts to dispel each illusion on a criatura hit by a ray (counteract rank 5th, counteract modifier +19).",
    activations: [
  {
    name: "",
    actionType: "three",
    traits: ["Concentrate"],
    frequency: "1 vez ao dia",
    effect: "A tatuagem lança um 4º posto _raio ardente_, com os raios saindo de seus olhos. O número de ações que você gasta ativando a tatuagem determina o número de raios do _blazing bolt_. A tatuagem também tenta dissipar cada ilusão em uma criatura atingida por um raio (neutralizar o nível 5, neutralizar o modificador +19).",
  },
    ],
  },
  "Sure-Step Crampons": {
    description: "Botas forradas com grampos de gelo mágicos. Ignore terreno irregular e difícil de gelo; terreno muito difícil de gelo vira difícil.\n\n**Ativar** 1 ação (manipular)\n**Requisitos** Você're standing on an earthen, icy, or wooden surface\n**Efeito** Você dig the crampons into the spot where você're standing, offering additional support until the next time você move. Você ganha +2 bônus de circunstância em seu Fortitude and Reflexos DCs against attempts to Empurrar or Derrubar você. This bônus also applies to salvaguardas against magias or effects that attempt to move você or knock você caído. The bônus lasts until você move from seu current spot.",
    activations: [
  {
    name: "",
    actionType: "one",
    traits: ["Manipulate"],
    requirements: "Você está standing on an earthen, icy, or wooden surface",
    effect: "Você crava os grampos no local onde está, oferecendo suporte adicional até a próxima vez que você se mover. Você ganha +2 bônus de circunstância em seus DCs de Fortitude e Reflexos contra tentativas de Empurrar ou Derubar você. Este bônus também se aplica a proteções contra magias ou efeitos que tentem movê-lo ou derrubá-lo. O bônus dura até você sair da posição atual.",
  },
    ],
  },
  "Swagger Stick": {
    description: "Bastão decorativo de madeira, tampa de metal numa ponta e cabo estilizado de cavalo ou fera marcial na outra. Oficiais de Golarion carregam versões mundanas. Esta é de madeira fina, prata envelhecida e granadas nos olhos.\n\n**Ativar—Pavonear-se** 1 ação (manipular, visual)\n**Frequência** 1 vez ao dia\n**Efeito** Você dramatically swing, twirl, or otherwise brandish the _swagger stick_ to direct seu troops. All allied criaturas within 9 m who can see seu display gain +1 bônus de status em rolagem de ataques, salvaguarda de Fortitudes, and salvaguarda de Vontades against mental effects por 1 rodada.",
    activations: [
  {
    name: "Pavonear-se",
    actionType: "one",
    traits: ["Manipulate","Visual"],
    frequency: "1 vez ao dia",
    effect: "Você balança, gira ou brande dramaticamente o _bastão de arrogância_ para dirigir suas tropas. Todas as criaturas aliadas em um raio de 9 m que puderem ver sua exibição ganham +1 de bônus de status na rolagem de ataques, proteção de Fortitudes e proteção de Vontades contra efeitos mentais por 1 rodada.",
  },
    ],
  },
  "Swarmeater": {
    description: "A swarmeater's clasp features carved reliefs of verminous, swarming criaturas. When você wear the clasp, você ganha resistência 10 to physical dano from enxame criaturas.\n\n**Ativar** 2 ações (concentrar, manipular, cura, vitalidade)\n**Frequência** 1 vez ao dia\n**Requisitos** a enxame criatura is within seu reach\n**Efeito** Você thrust seu hand into the enxame, draw forth a squirming mass of vermin, and devour it. Você recover 3d10+8 PV and deal the same amount of dano de concussão to the enxame. PV recovery is a healing vitality effect.",
    activations: [
  {
    name: "",
    actionType: "two",
    traits: ["Concentrate","Manipulate","Healing","Vitality"],
    frequency: "1 vez ao dia",
    requirements: "a enxame criatura is within seu reach",
    effect: "Você enfia a mão no enxame, extrai uma massa contorcida de vermes e a devora. Você recupera 3d10+8 PV e causa a mesma quantidade de dano de concussão ao enxame. A recuperação PV é um efeito curativo de vitalidade.",
  },
    ],
  },
  "Swarmeater's Clasp": {
    description: "Broche com relevos de vermes. Resistência 10 a dano físico de enxames.\n\n**Ativar** 2 ações (concentrar, manipular, cura, vitalidade)\n**Frequência** 1 vez ao dia\n**Requisitos** a enxame criatura is within seu reach\n**Efeito** Você thrust seu hand into the enxame, draw forth a squirming mass of vermin, and devour it. Você recover 3d10+8 PV and deal the same amount of dano de concussão to the enxame. PV recovery is a healing vitality effect.",
    activations: [
  {
    name: "",
    actionType: "two",
    traits: ["Concentrate","Manipulate","Healing","Vitality"],
    frequency: "1 vez ao dia",
    requirements: "a enxame criatura is within seu reach",
    effect: "Você enfia a mão no enxame, extrai uma massa contorcida de vermes e a devora. Você recupera 3d10+8 PV e causa a mesma quantidade de dano de concussão ao enxame. A recuperação PV é um efeito curativo de vitalidade.",
  },
    ],
  },
  "Swift Standard": {
    description: "Estandarte com cavalos bordados que galopam (afixado ou empunhado). Você e aliados que começam o turno na emanação do estandarte ganham +1,5 m de status nos Deslocamentos terrestres por 1 rodada. Dobra em viagem.",
  },
  "Swift Standard (Greater)": {
    description: "Estandarte com cavalos bordados que galopam (afixado ou empunhado). Você e aliados que começam o turno na emanação do estandarte ganham +3 m de status nos Deslocamentos terrestres por 1 rodada. Dobra em viagem.",
  },
  "Swift Standard (Major)": {
    description: "Estandarte com cavalos bordados que galopam (afixado ou empunhado). Você e aliados que começam o turno na emanação do estandarte ganham +4,5 m de status nos Deslocamentos terrestres por 1 rodada. Dobra em viagem.",
  },
  "Symbol of Conflict": {
    description: "Colar que vira símbolo da divindade (ou pessoal). +1 em Religião, +1 de circunstância contra sagrado/profano, e abater ou abençoar 1 vez ao dia. Incomum.\n\n**Ativar—Presença** 2 ações (concentrar, manipular)\n**Frequência** 1 vez ao dia\n**Efeito** The symbol casts _bane_ or _bless_. The counteract CD of these effects is 18, and the counteract modifier is +8.",
    activations: [
  {
    name: "Presença",
    actionType: "two",
    traits: ["Concentrate","Manipulate"],
    frequency: "1 vez ao dia",
    effect: "O símbolo lança _bane_ ou _bless_. O CD de neutralização desses efeitos é 18 e o modificador de neutralização é +8.",
  },
    ],
  },
  "Symbol of Conflict (Greater)": {
    description: "Versão maior: +2 em Religião e magias de 4º posto (CD 27, +17).\n\n**Ativar—Presença** 2 ações (concentrar, manipular)\n**Frequência** 1 vez ao dia\n**Efeito** The symbol casts _bane_ or _bless_. The counteract CD of these effects is 18, and the counteract modifier is +8.",
    activations: [
  {
    name: "Presença",
    actionType: "two",
    traits: ["Concentrate","Manipulate"],
    frequency: "1 vez ao dia",
    effect: "O símbolo lança _bane_ ou _bless_. O CD de neutralização desses efeitos é 18 e o modificador de neutralização é +8.",
  },
    ],
  },
  "Symbol of Conflict (Major)": {
    description: "Versão máxima: +3 em Religião e magias de 6º posto, inclusive invocação alinhada (CD 38, +28).\n\n**Ativar—Presença** 2 ações (concentrar, manipular)\n**Frequência** 1 vez ao dia\n**Efeito** The symbol casts _bane_ or _bless_. The counteract CD of these effects is 18, and the counteract modifier is +8.",
    activations: [
  {
    name: "Presença",
    actionType: "two",
    traits: ["Concentrate","Manipulate"],
    frequency: "1 vez ao dia",
    effect: "O símbolo lança _bane_ ou _bless_. O CD de neutralização desses efeitos é 18 e o modificador de neutralização é +8.",
  },
    ],
  },
  "Tactician": {
    description: "Repurposing and enchanting a helmet worn by a battlefield commander can create a _tactician’s helm_, imparting knowledge of battlefield tactics that feeds off seu minor victories. The helm concede a você a +1 bônus de item em Warfare Lore testes. Also, a jewel adorns the brow of the helmet. This jewel becomes charged cada vez que você hit a criatura with a Reactive Golpe. A _tactician’s helm_ can hold up to 2 charges, and its charges reset to 0 quando você a investe.\n\n**Ativar** 1 ação (concentrar)\n**Frequência** 1 vez por hora\n**Efeito** Você choose one of the following effects. **Charge!** Avançar twice. **Move It!** Você ganha +2 bônus de status em Acrobacia and Atletismo testes until the end of this turno. **Protect!** Se você're wielding a shield, Avançar to a space adjacent to an aliado, then Raise seu Shield. **Re-Arm!** Interact up to three times. Each of these ações must be used to do something listed under Interact.",
    activations: [
  {
    name: "",
    actionType: "one",
    traits: ["Concentrate"],
    frequency: "1 vez por hora",
    effect: "Você escolhe um dos seguintes efeitos. **Carregue!** Avançar duas vezes. **Move It!** Você ganha +2 bônus de status em testes de Acrobacia e Atletismo até o final deste turno. **Proteja!** Se você estiver empunhando um escudo, avance para um espaço adjacente a um aliado e, em seguida, levante seu escudo. **Re-Armar!** Interagir até três vezes. Cada uma dessas ações deve ser usada para fazer algo listado no Interagir.",
  },
    ],
  },
  "Tactician's Helm": {
    description: "Elmo de comandante encantado. +1 de item em Conhecimento de Guerra. A joia na testa ganha 1 carga cada vez que você acerta com Golpe Reativo (máx. 2; zera ao investir).\n\n**Ativar** 1 ação (concentrar)\n**Frequência** 1 vez por hora\n**Efeito** Você choose one of the following effects. **Charge!** Avançar twice. **Move It!** Você ganha +2 bônus de status em Acrobacia and Atletismo testes until the end of this turno. **Protect!** Se você're wielding a shield, Avançar to a space adjacent to an aliado, then Raise seu Shield. **Re-Arm!** Interact up to three times. Each of these ações must be used to do something listed under Interact.",
    activations: [
  {
    name: "",
    actionType: "one",
    traits: ["Concentrate"],
    frequency: "1 vez por hora",
    effect: "Você escolhe um dos seguintes efeitos. **Carregue!** Avançar duas vezes. **Move It!** Você ganha +2 bônus de status em testes de Acrobacia e Atletismo até o final deste turno. **Proteja!** Se você estiver empunhando um escudo, avance para um espaço adjacente a um aliado e, em seguida, levante seu escudo. **Re-Armar!** Interagir até três vezes. Cada uma dessas ações deve ser usada para fazer algo listado no Interagir.",
  },
    ],
  },
  "Taldogis Badge": {
    description: "This badge depicting a hunting dog is used by Eutropia’s supporters to indicate their allegiances.\n\n**Ativar—Ladrar** 2 ações (concentrar, manipular, subtle)\n**Frequência** 1 vez por hora\n**Efeito** The hunting dog makes a single bark that only você and a single alvo of seu choice within 9 m can hear. If o alvo is a supporter of Eutropia, você ganha a +2 bônus de circunstância em Diplomacia testes against them for the next minute.",
    activations: [
  {
    name: "Ladrar",
    actionType: "two",
    traits: ["Concentrate","Manipulate","Subtle"],
    frequency: "1 vez por hora",
    effect: "O cão de caça emite um único latido que somente você e um único alvo de sua escolha num raio de 9 m podem ouvir. Se o alvo for um defensor da Eutropia, você ganha +2 bônus de circunstância em Diplomacia testando contra eles no próximo minuto.",
  },
    ],
  },
  "Talented Tap Shoes": {
    description: "Sapatos de sapateado. Vestidos, +1 de item em Acrobacia para dançar ou se apresentar; 1 vez ao dia você pode repetir um teste de Performance de dança e ficar com o segundo resultado.\n\n**Ativar—Ostentar** 1 ação (manipular)\n**Frequência** 1 vez ao dia\n**Efeito** Você click the toes of seu _talented tap shoes_ on the ground, and for the next minute, whenever você succeed or critically succeed at a salvaguarda de Reflexos to avoid a damaging effect, você pode Avançar half seu Speed as a reação. However, during this time, você sofre a –2 penalidade de item to Furtividade testes to Furtar-se.",
    activations: [
  {
    name: "Ostentar",
    actionType: "one",
    traits: ["Manipulate"],
    frequency: "1 vez ao dia",
    effect: "Você bate os dedos dos seus _talentosos sapatos de sapateado_ no chão e, no minuto seguinte, sempre que tiver sucesso ou sucesso crítico em uma proteção de Reflexos para evitar um efeito prejudicial, você pode Avançar meio seu Deslocamento como uma ocorrência. Porém, durante esse tempo, você sofre um –2 acaso de item para Furtividade testando para Furtar-se.",
  },
    ],
  },
  "Tasset of Flexibility": {
    description: "Abas de couro marrom-claro com costura dourada, presas à couraça ou roupa para proteger as coxas. +1 de item em Acrobacia.\n\n**Ativar—Ataque em investida** 1 ação (concentrar, reach)\n**Frequência** 1 vez ao dia\n**Efeito** The tasset helps você stretch farther than você normally could. Faça um Golpe with a melee arma, increasing seu reach by 1,5 m for that Golpe.",
    activations: [
  {
    name: "Ataque em investida",
    actionType: "one",
    traits: ["Concentrate","Reach"],
    frequency: "1 vez ao dia",
    effect: "O tasset ajuda você a se alongar mais do que normalmente conseguiria. Faça um Golpe com uma arma corpo a corpo, aumentando seu alcance em 1,5 m para esse Golpe.",
  },
    ],
  },
  "The Dancer's Song": {
    description: "Veneno de um par de sahkils fundidos, Os Dançarinos, criado para o Nono Exército; enquanto estupefato por ele, não trata ninguém como aliado. Fortitude CD 23; início 1 minuto; duração máxima 6 dias; Estágio 1: 2d8 veneno e estupefato 1 (1 dia); 2: 3d8 veneno e estupefato 2 (2 dias); 3: 4d8 veneno e estupefato 4 (3 dias).",
  },
  "Theater Enhancers": {
    description: "Binóculos de ópera. Vestidos, revelam ilusões sutis em adereços e cenários preparados com antecedência (sombra de demônio num fantoche, nuvem num pano de fundo).",
  },
  "Third Eye": {
    description: "Coroa que vira tatuagem. +3 em Percepção, auras mágicas contínuas, leitura de saúde ao Buscar, e visão verdadeira 1 vez ao dia.\n\n**Ativar—Visão verdadeira** 2 ações (concentrar)\n**Frequência** 1 vez ao dia\n**Efeito** Você ganha the effects of an 8º posto _visão verdadeira_ magia.",
    activations: [
  {
    name: "Visão verdadeira",
    actionType: "two",
    traits: ["Concentrate"],
    frequency: "1 vez ao dia",
    effect: "Você ganha os efeitos de uma 8º posto _visão verdadeira_ magia.",
  },
    ],
  },
  "Thousand-blade Thesis": {
    description: "Pergaminhos de papel de arroz em bambu flexível, ensaios sobre a arte da guerra e o uso de armas. +2 de item em Conhecimento de Guerra para Recordar Conhecimento (exige uma mão). Arsenal extradimensional de 5 Volume, só armas e munição; Interagir para guardar ou sacar.\n\n**Ativar—Armaria instantânea** 1 ação (manipular)\n**Frequência** 1 vez ao dia\n**Efeito** The _thousand-blade thesis_ dramatically unfurls, and the weapons contained within it spring forth and array themselves impressively in the air, floating within easy reach. For 1 minute, você pode Interact as a ação livre to draw one of the floating weapons. Others can attempt to nab them out of the air, but to do so they must critically succeed at a Desarmar teste (CD 25). Você pode’t place weapons back into the thesis until the minute elapses.",
    activations: [
  {
    name: "Armaria instantânea",
    actionType: "one",
    traits: ["Manipulate"],
    frequency: "1 vez ao dia",
    effect: "A tese das mil lâminas se desenrola dramaticamente, e as armas nela contidas saltam e se posicionam de forma impressionante no ar, flutuando ao alcance fácil. Por 1 minuto, você pode interagir como uma ação livre para sacar uma das armas flutuantes. Outros podem tentar pegá-los no ar, mas para isso eles devem ter sucesso crítico em um teste de Desarmar (CD 25). Você não pode colocar as armas de volta na tese até que um minuto passe.",
  },
    ],
  },
  "Three-Pillared Yang Na": {
    description: "Tatuagem de árvore abstrata com três linhas de texto tang, ritual com jasmim, cúrcuma e flor de yang na; primeira bênção: +1 de item em Diplomacia.\n\n**Ativar—Segunda bênção** 1 ação (concentrar, detection)\n**Efeito** Você learn the direction of the yang na tree that gave the blossom used in creating seu tattoo. Most such trees are in Tang Mai, far to the west of the Inner Sea.\n\n**Ativar—Terceira bênção** reação (concentrar)\n**Gatilho** Você sofre dano espiritual\n**Efeito** Você ganha resistência 3 against that dano espiritual.",
    activations: [
  {
    name: "Segunda bênção",
    actionType: "one",
    traits: ["Concentrate","Detection"],
    effect: "Você aprende a direção da árvore yang na que deu origem à flor usada na criação de sua tatuagem. A maioria dessas árvores está em Tang Mai, bem a oeste do Mar Interior.",
  },
  {
    name: "Terceira bênção",
    actionType: "reaction",
    traits: ["Concentrate"],
    trigger: "Você sofre dano espiritual",
    effect: "Você ganha resistência 3 contra aquele dano espiritual.",
  },
    ],
  },
  "Thrower": {
    description: "This bandolier is covered in straps and pouches capable of holding up to 2 Volume of one-handed thrown weapons. A _thrower's bandolier_ has a _+1 arma potency_ rune etched into it, and it can be etched with runes as though it were a one-handed thrown arma. When você invest the _thrower's bandolier_, você pode attune it to all the weapons sheathed in it (this ends any previous attunements made with the bandolier). Whenever você draw a arma from the bandolier, the bandolier's runes are replicated onto that arma. Any runes already on the arma are suppressed, and any runes previously replicated to a different arma in this way are removed, returning it to normal.\n\n**Ativar** 2 ações (concentrar, manipular)\n**Efeito** All weapons attuned to the bandolier, not including any weapons você're currently wielding, return to the bandolier.",
    activations: [
  {
    name: "",
    actionType: "two",
    traits: ["Concentrate","Manipulate"],
    effect: "Todas as armas sintonizadas na bandoleira, sem incluir nenhuma arma que você esteja empunhando no momento, retornam à bandoleira.",
  },
    ],
  },
  "Thrower's Bandolier": {
    description: "Bandoleira para até 2 Cargas de armas de arremesso de uma mão. Tem runa de potência +1 e pode receber runas como arma de arremesso de uma mão. Ao investir, sintonize as armas nela. Ao sacar, as runas se copiam para essa arma (runas dela são suprimidas; cópias anteriores somem).\n\n**Ativar** 2 ações (concentrar, manipular)\n**Efeito** All weapons attuned to the bandolier, not including any weapons você're currently wielding, return to the bandolier.",
    activations: [
  {
    name: "",
    actionType: "two",
    traits: ["Concentrate","Manipulate"],
    effect: "Todas as armas sintonizadas na bandoleira, sem incluir nenhuma arma que você esteja empunhando no momento, retornam à bandoleira.",
  },
    ],
  },
  "Thunderblast Slippers": {
    description: "Unassuming in appearance, these slippers indicate their nature only with a signature strip of yellow stitching. Você ganha +2 bônus de item em Acrobacia testes.\n\n**Ativar** 2 ações (concentrar, manipular)\n**Frequência** 1 vez ao dia\n**Efeito** Você move like the wind, with precision and speed. Você Avançar up to 18 m; este movimento não provoca reações. When você stop, if você've moved at least 9 m from where você started, você release a thunderous 1,5 m emanation that deals 2d6 dano de concussão and 2d6 dano sônico with a CD 25 Fortitude básico save. A criatura that critically fails its save is also knocked caído.",
    activations: [
  {
    name: "",
    actionType: "two",
    traits: ["Concentrate","Manipulate"],
    frequency: "1 vez ao dia",
    effect: "Você se move como o vento, com precisão e velocidade. Você Avançar até 18 m; este movimento não provoca reações. Quando você parar, se você se moveu pelo menos 9 m de onde você começou, você libera uma emanação estrondosa de 1,5 m que causa 2d6 dano de concussão e 2d6 dano sônico com um CD 25 Fortitude básico save. Uma criatura que falhar criticamente em seu teste também será derrubada.",
  },
    ],
  },
  "Thunderblast Slippers (Greater)": {
    description: "Como as sapatilhas básicas (+2 de item em Acrobacia), mas Avançar até 36 m, 3d6 de concussão e 3d6 sônico, Fortitude básico CD 34. Sem reações no movimento; emanação de 1,5 m se parar a 9 m ou mais do início.\n\n**Ativar** 2 ações (concentrar, manipular)\n**Frequência** 1 vez ao dia\n**Efeito** Você move like the wind, with precision and speed. Você Avançar up to 18 m; este movimento não provoca reações. When você stop, if você've moved at least 9 m from where você started, você release a thunderous 1,5 m emanation that deals 2d6 dano de concussão and 2d6 dano sônico with a CD 25 Fortitude básico save. A criatura that critically fails its save is also knocked caído.",
    activations: [
  {
    name: "",
    actionType: "two",
    traits: ["Concentrate","Manipulate"],
    frequency: "1 vez ao dia",
    effect: "Você se move como o vento, com precisão e velocidade. Você Avançar até 18 m; este movimento não provoca reações. Quando você parar, se você se moveu pelo menos 9 m de onde você começou, você libera uma emanação estrondosa de 1,5 m que causa 2d6 dano de concussão e 2d6 dano sônico com um CD 25 Fortitude básico save. Uma criatura que falhar criticamente em seu teste também será derrubada.",
  },
    ],
  },
  "Thurible of Revelation (Greater)": {
    description: "Versão maior: +3 de bônus de item em Religião. A revelação extra diária também concede visão verdadeira ao olhar pela fumaça.\n\n**Ativar—Queimar incenso** 2 ações (manipular)\n**Efeito** Você light the incense inside the censer, and it burns por 1 hora. During that time, as long você está holding the thurible, você ganha a +1 bônus de item em Religião testes, and any critical failure você roll when você Decifrar Escrita of a religious nature is a failure instead.",
    activations: [
  {
    name: "Queimar incenso",
    actionType: "two",
    traits: ["Manipulate"],
    effect: "Você acende o incenso dentro do incensário, e ele queima por 1 hora. Durante esse tempo, enquanto você estiver segurando o turíbulo, você ganha um bônus de item de +1 em testes de Religião, e qualquer falha crítica que você rolar ao Decifrar Escrita de natureza religiosa é uma falha.",
  },
    ],
  },
  "Thurible of Revelation (Lesser)": {
    description: "Incensário de latão numa corrente, em geral com texto empiriano. Ao queimar incenso (5 po), por 1 hora concede +1 em Religião enquanto você o segura.\n\n**Ativar—Queimar incenso** 2 ações (manipular)\n**Efeito** Você light the incense inside the censer, and it burns por 1 hora. During that time, as long você está holding the thurible, você ganha a +1 bônus de item em Religião testes, and any critical failure você roll when você Decifrar Escrita of a religious nature is a failure instead.",
    activations: [
  {
    name: "Queimar incenso",
    actionType: "two",
    traits: ["Manipulate"],
    effect: "Você acende o incenso dentro do incensário, e ele queima por 1 hora. Durante esse tempo, enquanto você estiver segurando o turíbulo, você ganha um bônus de item de +1 em testes de Religião, e qualquer falha crítica que você rolar ao Decifrar Escrita de natureza religiosa é uma falha.",
  },
    ],
  },
  "Thurible of Revelation (Moderate)": {
    description: "Versão moderada: +2 de bônus de item em Religião. 1 vez ao dia, olhar pela fumaça concede ver o invisível por 1 rodada.\n\n**Ativar—Queimar incenso** 2 ações (manipular)\n**Efeito** Você light the incense inside the censer, and it burns por 1 hora. During that time, as long você está holding the thurible, você ganha a +1 bônus de item em Religião testes, and any critical failure você roll when você Decifrar Escrita of a religious nature is a failure instead.",
    activations: [
  {
    name: "Queimar incenso",
    actionType: "two",
    traits: ["Manipulate"],
    effect: "Você acende o incenso dentro do incensário, e ele queima por 1 hora. Durante esse tempo, enquanto você estiver segurando o turíbulo, você ganha um bônus de item de +1 em testes de Religião, e qualquer falha crítica que você rolar ao Decifrar Escrita de natureza religiosa é uma falha.",
  },
    ],
  },
  "Tideplate": {
    description: "Placas +1 resiliente. Na água, a penalidade de teste não vale para Acrobacia/Atletismo. +2 de item para Nadar; respira debaixo d’água.\n\n**Ativar—Cavalgar as ondas** 2 ações (concentrar, manipular)\n**Frequência** 1 vez por hora\n**Efeito** The ripples on the armadura begin to undulate, matching the movement of any nearby water. The armadura casts _water walk_ on você.\n\n**Ativar—Submergir** 2 ações (concentrar, manipular, polymorph)\n**Frequência** 1 vez ao dia\n**Efeito** Você merge with the water por 10 minutos. While merged, você não pode move, você pode see through the water if it's clear enough, and você pode hear what's going on outside of the water. Water typically can't take dano, but if the water você're merged in is subject to dano de eletricidade or an ability or effect that destroys or dries water, você're expelled from the water and take 10d6 dano. _Control water_ expels você without dealing dano.",
    activations: [
  {
    name: "Cavalgar as ondas",
    actionType: "two",
    traits: ["Concentrate","Manipulate"],
    frequency: "1 vez por hora",
    effect: "As ondulações na armadura começam a ondular, acompanhando o movimento de qualquer água próxima. A armadura lança _water walk_ em você.",
  },
  {
    name: "Submergir",
    actionType: "two",
    traits: ["Concentrate","Manipulate","Polymorph"],
    frequency: "1 vez ao dia",
    effect: "Você se funde com a água por 10 minutos. Durante a fusão, você não pode se mover, você pode ver através da água se ela estiver clara o suficiente e você pode ouvir o que está acontecendo fora da água. A água normalmente não aguenta dano, mas se a água em que você está imerso estiver sujeita a dano de eletricidade ou uma habilidade ou efeito que destrói ou seca a água, você é expulso da água e sofre 10d6 de dano. _Controlar a água_ expulsa você sem causar dano.",
  },
    ],
  },
  "Timepiece Standard": {
    description: "Estandarte de engrenagens que giram (afixado ou empunhado). Sempre que você ou aliado na emanação do estandarte usa Adiar ou Preparar, ganha 5 PV temporários por 1 minuto e fica imune por 10 minutos.",
  },
  "Timepiece Standard (Major)": {
    description: "Estandarte de engrenagens que giram (afixado ou empunhado). Sempre que você ou aliado na emanação do estandarte usa Adiar ou Preparar, ganha 10 PV temporários por 1 minuto e fica imune por 10 minutos.",
  },
  "Timpani of Panic": {
    description: "Tímpano de cobre fino, pele escura e tensores vermelho-escuros. +2 de item em Atuação ao tocar.\n\n**Ativar—Sustentar pavor** 1 ação (auditivo, emoção, medo, manipular, mental)\n**Frequência** 1 vez ao dia\n**Efeito** Você beat a march on the timpani that continuously increases in tempo. Enemies within a 9 m emanation deve fazer um teste CD 26 salvaguarda de Vontade. **Sucesso crítico** The criatura is unaffected. **Sucesso** O alvo can’t reduce its amedrontado value below 1 por 1 rodada. **Falha** O alvo can’t reduce its amedrontado value below 1 por 1 minuto. **Falha crítica** As failure, and it becomes amedrontado 1.",
    activations: [
  {
    name: "Sustentar pavor",
    actionType: "one",
    traits: ["Auditory","Emotion","Fear","Manipulate","Mental"],
    frequency: "1 vez ao dia",
    effect: "Você bate uma marcha nos tímpanos que aumenta continuamente de andamento. Inimigos dentro de uma emanação de 9 meses devem fazer um teste CD 26 de segurança de Vontade. **Sucesso crítico** A criatura não é afetada. **Sucesso** O alvo não consegue reduzir seu valor de amedrontado abaixo de 1 por 1 rodada. **Falha** O alvo não pode reduzir seu valor amedrontado abaixo de 1 por 1 minuto. **Falha crítica** Como fracasso, e fica amedrontado 1.",
  },
    ],
  },
  "Titan": {
    description: "These bronze gauntlets each have a small red gem embedded in the wrist. Você ganha +3 bônus de item em Atletismo testes and a +1 bônus de circunstância em Atletismo testes to Agarrar. Se você successfully Agarrar an inimigo that’s at least one size category larger than você, the gauntlets dig into it, dealing dano de concussão equal to seu Força modifier, plus an additional 2d6 on a critical success. When você invest the gloves, você either increase seu Força modifier by 1 or increase it to +4, whichever would give você a higher value.\n\n**Ativar—Palmas estrondosas** 1 ação (manipular, sonic)\n**Frequência** 1 vez ao dia\n**Requisitos** Você tem two hands free\n**Efeito** Você clap the gauntlets together with a thunderous crack that deals 6d10 dano sônico in a 9 m emanation. Each criatura in the area deve fazer um teste CD 35 salvaguarda de Fortitude. **Sucesso crítico** The criatura is unaffected. **Sucesso** The criatura takes half dano. **Falha** The criatura takes full dano and is surdo por 1 rodada. **Falha crítica** The criatura takes double dano, is surdo por 1 minuto, and is atordoado 1.",
    activations: [
  {
    name: "Palmas estrondosas",
    actionType: "one",
    traits: ["Manipulate","Sonic"],
    frequency: "1 vez ao dia",
    requirements: "Você tem two hands free",
    effect: "Você bate palmas com um estalo estrondoso que causa 6d10 de dano sônico em uma emanação de 9 m. Cada criatura da área deve fazer um teste CD 35 de salvaguarda de Fortitude. **Sucesso crítico** A criatura não é afetada. **Sucesso** A criatura sofre metade do dano. **Falha** A criatura leva dano total e é surda por 1 rodada. **Falha crítica** A criatura sofre dano duplo, é surda por 1 minuto e atordoada 1.",
  },
    ],
  },
  "Titan's Grasp": {
    description: "Manoplas de bronze com gema vermelha no pulso. +3 de item em Atletismo e +1 de circunstância para Agarrar. Se Agarrar com sucesso um inimigo ao menos uma categoria maior, causa concussão igual ao modificador de Força (+2d6 no sucesso crítico). Ao investir: Força +1 ou até +4.\n\n**Ativar—Palmas estrondosas** 1 ação (manipular, sonic)\n**Frequência** 1 vez ao dia\n**Requisitos** Você tem two hands free\n**Efeito** Você clap the gauntlets together with a thunderous crack that deals 6d10 dano sônico in a 9 m emanation. Each criatura in the area deve fazer um teste CD 35 salvaguarda de Fortitude. **Sucesso crítico** The criatura is unaffected. **Sucesso** The criatura takes half dano. **Falha** The criatura takes full dano and is surdo por 1 rodada. **Falha crítica** The criatura takes double dano, is surdo por 1 minuto, and is atordoado 1.",
    activations: [
  {
    name: "Palmas estrondosas",
    actionType: "one",
    traits: ["Manipulate","Sonic"],
    frequency: "1 vez ao dia",
    requirements: "Você tem two hands free",
    effect: "Você bate palmas com um estalo estrondoso que causa 6d10 de dano sônico em uma emanação de 9 m. Cada criatura da área deve fazer um teste CD 35 de salvaguarda de Fortitude. **Sucesso crítico** A criatura não é afetada. **Sucesso** A criatura sofre metade do dano. **Falha** A criatura leva dano total e é surda por 1 rodada. **Falha crítica** A criatura sofre dano duplo, é surda por 1 minuto e atordoada 1.",
  },
    ],
  },
  "Titan's Standard": {
    description: "This magical banner stands largest on any battlefield. While holding a _titan’s standard_, você pode use the following ability.\n\n**Ativar—Porte de titã** 1 ação (concentrar)\n**Frequência** 1 vez por minuto\n**Efeito** The magical banner causes a rapid surge of growth. A Medium or smaller aliado within the banner’s aura becomes Large por 1 rodada. Its equipment grows with it but returns to its natural size afterwards. While Large, the aliado is desajeitado 1, and its reach increases by 1,5 m (or by 3 m if it started out Tiny).",
    activations: [
  {
    name: "Porte de titã",
    actionType: "one",
    traits: ["Concentrate"],
    frequency: "1 vez por minuto",
    effect: "O estandarte mágico provoca uma rápida onda de crescimento. Um aliado Médio ou menor dentro da aura do estandarte torna-se Grande por 1 rodada. Seu equipamento cresce com ele, mas depois retorna ao seu tamanho natural. Enquanto Grande, o aliado é desajeitado 1, e seu alcance aumenta em 1,5 m (ou em 3 m se começou Minúsculo).",
  },
    ],
  },
  "Tlil Mask": {
    description: "Máscara colorida de miçangas de Arcadia, vista como curiosidade na Expansão Mwangi, com motivos florais.\n\n**Ativar** 1 ação (concentrar)\n**Frequência** 1 vez ao dia\n**Efeito** Seu vision up to 18 m sees through small amounts of living plant matter as though it were transparent. While this effect is active, criaturas can't be oculto from você due to living plants, such as small trees, vines, and grass. This vision also prevents them from Hiding or Sneaking past você using only living plants for concealment or cover. Other than the inability to use the cover to Esconder or Furtar-se, this ability doesn't prevent plants from providing cover to criaturas or blocking line of effect. It also doesn't allow você to see through dead plant matter, such as the wooden walls of a building, or thick plant matter, such as the walls of a dungeon built entirely inside an enormous living tree. The effect lasts por 1 minuto.",
    activations: [
  {
    name: "",
    actionType: "one",
    traits: ["Concentrate"],
    frequency: "1 vez ao dia",
    effect: "Sua visão de até 18 m enxerga através de pequenas quantidades de matéria vegetal viva como se fosse transparente. Enquanto este efeito estiver ativo, criaturas não podem ficar ocultas de você devido a plantas vivas, como pequenas árvores, cipós e grama. Essa visão também evita que eles se escondam ou passem furtivamente por você usando apenas plantas vivas para ocultação ou cobertura. Além da impossibilidade de usar a cobertura para Esconder ou Furtar-se, esta habilidade não impede que as plantas forneçam cobertura para criaturas ou bloqueiem a linha de efeito. Também não permite que você veja através de matéria vegetal morta, como as paredes de madeira de um prédio, ou matéria vegetal espessa, como as paredes de uma masmorra construída inteiramente dentro de uma enorme árvore viva. O efeito dura por 1 minuto.",
  },
    ],
  },
  "Tlil Mask (Greater)": {
    description: "Máscara colorida de miçangas de Arcadia, vista como curiosidade na Expansão Mwangi, com motivos florais.\n\n**Ativar** 1 ação (concentrar)\n**Frequência** 1 vez ao dia\n**Efeito** Seu vision up to 18 m sees through small amounts of living plant matter as though it were transparent. While this effect is active, criaturas can't be oculto from você due to living plants, such as small trees, vines, and grass. This vision also prevents them from Hiding or Sneaking past você using only living plants for concealment or cover. Other than the inability to use the cover to Esconder or Furtar-se, this ability doesn't prevent plants from providing cover to criaturas or blocking line of effect. It also doesn't allow você to see through dead plant matter, such as the wooden walls of a building, or thick plant matter, such as the walls of a dungeon built entirely inside an enormous living tree. The effect lasts por 1 minuto.",
    activations: [
  {
    name: "",
    actionType: "one",
    traits: ["Concentrate"],
    frequency: "1 vez ao dia",
    effect: "Sua visão de até 18 m enxerga através de pequenas quantidades de matéria vegetal viva como se fosse transparente. Enquanto este efeito estiver ativo, criaturas não podem ficar ocultas de você devido a plantas vivas, como pequenas árvores, cipós e grama. Essa visão também evita que eles se escondam ou passem furtivamente por você usando apenas plantas vivas para ocultação ou cobertura. Além da impossibilidade de usar a cobertura para Esconder ou Furtar-se, esta habilidade não impede que as plantas forneçam cobertura para criaturas ou bloqueiem a linha de efeito. Também não permite que você veja através de matéria vegetal morta, como as paredes de madeira de um prédio, ou matéria vegetal espessa, como as paredes de uma masmorra construída inteiramente dentro de uma enorme árvore viva. O efeito dura por 1 minuto.",
  },
    ],
  },
  "Tracker": {
    description: "These lenses of forest-green glass are bound in rough leather stitched with crude twine. Enquanto estiver vestindo these goggles, você ganha a +1 bônus to Sobrevivência testes to Sense Direction and Track. Se você falhar a teste to Track, você pode try again after 30 minutes rather than an hour.",
  },
  "Tracker's Goggles": {
    description: "Lentes verdes em couro. +1 em Sobrevivência para orientar e rastrear, com nova tentativa mais cedo.",
  },
  "Tracker's Goggles (Greater)": {
    description: "These lenses of forest-green glass are bound in rough leather stitched with crude twine. Enquanto estiver vestindo these goggles, você ganha a +1 bônus to Sobrevivência testes to Sense Direction and Track. Se você falhar a teste to Track, você pode try again after 30 minutes rather than an hour. The goggles grant a +2 bônus. Se você falhar a teste to Track, você pode try again after 15 minutes rather than an hour.",
  },
  "Trail Warding Tattoo": {
    description: "Como a tatuagem de proteção, no estilo da trilha. Resistência 2 a dano de terreno perigoso e perigos ambientais o tempo todo (sobe para 5 ao ativar). Ativar — Salvaguarda tinta (concentrar): 1 vez ao dia. Gatilho: inimigo, perigo ou o ambiente ataca sua CA, exige salvaguarda ou causa dano automático. Efeito: até o fim do turno, +1 de status na CA e nas salvaguardas contra o efeito e resistência 2 ao dano disparador.",
  },
  "Traveler": {
    description: "Before it's activated, this item appears to be an ash rod capped with steel on either end.\n\n**Ativar—Toque** 2 ações (concentrar, manipular)\n**Efeito** Você imagine a specific simple tool, and the any-tool transforms into it. (Usually, você pode choose from a tool listed in the gear from Player Core). This transforms the wooden portion into any haft and the metal caps into spades, hammer heads, or the like, allowing for most basic tools but nothing more complex. Você pode return the item to its rod form with an Interact ação.",
    activations: [
  {
    name: "Toque",
    actionType: "two",
    traits: ["Concentrate","Manipulate"],
    effect: "Você imagina uma ferramenta simples e específica, e qualquer ferramenta se transforma nela. (Normalmente, você pode escolher uma ferramenta listada na engrenagem do Player Core). Isso transforma a parte de madeira em qualquer cabo e as tampas de metal em pás, cabeças de martelo ou similares, permitindo a maioria das ferramentas básicas, mas nada mais complexo. Você pode retornar o item à sua forma de bastão com uma ação Interagir.",
  },
    ],
  },
  "Traveler's Any-Tool": {
    description: "Before it's activated, this item appears to be an ash rod capped with steel on either end.\n\n**Ativar—Toque** 2 ações (concentrar, manipular)\n**Efeito** Você imagine a specific simple tool, and the any-tool transforms into it. (Usually, você pode choose from a tool listed in the gear from Player Core). This transforms the wooden portion into any haft and the metal caps into spades, hammer heads, or the like, allowing for most basic tools but nothing more complex. Você pode return the item to its rod form with an Interact ação.",
    activations: [
  {
    name: "Toque",
    actionType: "two",
    traits: ["Concentrate","Manipulate"],
    effect: "Você imagina uma ferramenta simples e específica, e qualquer ferramenta se transforma nela. (Normalmente, você pode escolher uma ferramenta listada na engrenagem do Player Core). Isso transforma a parte de madeira em qualquer cabo e as tampas de metal em pás, cabeças de martelo ou similares, permitindo a maioria das ferramentas básicas, mas nada mais complexo. Você pode retornar o item à sua forma de bastão com uma ação Interagir.",
  },
    ],
  },
  "Triangular Teeth": {
    description: "Fileira de dentes de tubarão. +1 de item em Atletismo para Nadar.\n\n**Ativar** reação (concentrar, amphibious, aquatic, water)\n**Frequência** 1 vez ao dia\n**Gatilho** Você would be hit by an attack against seu AC\n**Efeito** Você ganha +1 bônus de circunstância em AC against the attack, or a +2 bônus de circunstância if the attacker is in water or has the amphibious, aquatic, or water trait. Whether the attack hits or misses, você ganha a +2 bônus de status em dano with the next Golpe você make against the attacker before the end of seu next turno.",
    activations: [
  {
    name: "",
    actionType: "reaction",
    traits: ["Concentrate","Amphibious","Aquatic","Water"],
    frequency: "1 vez ao dia",
    trigger: "Você seria atingido por um ataque contra seu CA",
    effect: "Você ganha +1 bônus de circunstância em CA contra o ataque, ou +2 bônus de circunstância se o atacante estiver na água ou tiver a característica anfíbia, aquática ou aquática. Quer o ataque acerte ou erre, você ganha +2 de bônus de status em dano com o próximo Golpe que você fizer contra o atacante antes do final do próximo turno.",
  },
    ],
  },
  "Troubadour": {
    description: "This jaunty cap can take the form and color of any type of hat você wish upon investing the item, but it always has a peacock feather jutting out from one side. Você ganha +2 bônus de item em Diplomacia and Atuação testes while wearing the cap. When você invest the cap, você either increase seu Carisma modifer by 1 or increase it to +4, whichever would give você a higher value.\n\n**Ativar** 2 ações (concentrar)\n**Frequência** 1 vez por hora\n**Efeito** Você conjura _hypnotize_ (CD 37).\n\n**Ativar** 2 ações (manipular)\n**Frequência** 1 vez ao dia\n**Efeito** Picking the feather from seu cap, você throw it toward a alvo, casting _prismatic spray_ (CD 35).",
    activations: [
  {
    name: "",
    actionType: "two",
    traits: ["Concentrate"],
    frequency: "1 vez por hora",
    effect: "Você conjura _hypnotize_ (CD 37).",
  },
  {
    name: "",
    actionType: "two",
    traits: ["Manipulate"],
    frequency: "1 vez ao dia",
    effect: "Pegando a pena do seu boné, você a joga em direção ao alvo, lançando _spray prismático_ (CD 35).",
  },
    ],
  },
  "Troubadour's Cap": {
    description: "Chapéu que muda de forma, sempre com pena de pavão. +2 de item em Diplomacia e Atuação. Ao investir: Carisma +1 ou até +4.\n\n**Ativar** 2 ações (concentrar)\n**Frequência** 1 vez por hora\n**Efeito** Você conjura _hypnotize_ (CD 37).\n\n**Ativar** 2 ações (manipular)\n**Frequência** 1 vez ao dia\n**Efeito** Picking the feather from seu cap, você throw it toward a alvo, casting _prismatic spray_ (CD 35).",
    activations: [
  {
    name: "",
    actionType: "two",
    traits: ["Concentrate"],
    frequency: "1 vez por hora",
    effect: "Você conjura _hypnotize_ (CD 37).",
  },
  {
    name: "",
    actionType: "two",
    traits: ["Manipulate"],
    frequency: "1 vez ao dia",
    effect: "Pegando a pena do seu boné, você a joga em direção ao alvo, lançando _spray prismático_ (CD 35).",
  },
    ],
  },
  "Trudd's Strength": {
    description: "Runa de filigrana na adaga de clã, martelo de guerra diante de escudo cônico: +1 de item em Atletismo e em Intimidação para Coagir.\n\n**Ativar—Protejam o clã!** 1 ação (concentrar)\n**Frequência** 1 vez ao dia\n**Efeito** Protective energy releases in a 3 m emanation, granting a +1 bônus de status em CA to all aliados within the area. The bônus lasts por 1 minuto.",
    activations: [
  {
    name: "Protejam o clã!",
    actionType: "one",
    traits: ["Concentrate"],
    frequency: "1 vez ao dia",
    effect: "A energia protetora é liberada em uma emanação de 3 m, concedendo +1 de bônus de status em CA a todos os aliados dentro da área. O bônus dura por 1 minuto.",
  },
    ],
  },
  "Trusty Helmet": {
    description: "Você keep yourself protected from incoming projectiles with this sturdy steel helmet, painted brown.\n\n**Ativar—Bloquear manipulação** reação (concentrar)\n**Frequência** 1 vez ao dia\n**Gatilho** Você ganha the aturdido condition\n**Efeito** Seu _trusty helmet_ protects not only seu head but seu mind. The value of seu aturdido condition is decreased by 1.\n\n**Ativar—Abaixar-se** 1 ação (manipular)\n**Efeito** Você hunker down, protecting seu head using seu helmet. Você ganha +1 bônus de circunstância em seu AC against ranged attacks.",
    activations: [
  {
    name: "Bloquear manipulação",
    actionType: "reaction",
    traits: ["Concentrate"],
    frequency: "1 vez ao dia",
    trigger: "Você ganha a condição de aturdido",
    effect: "Seu _capacete confiável_ protege não só sua cabeça, mas também sua mente. O valor da condição seu aturdido é diminuído em 1.",
  },
  {
    name: "Abaixar-se",
    actionType: "one",
    traits: ["Manipulate"],
    effect: "Você se agacha, protegendo a cabeça com o capacete. Você ganha +1 de bônus de circunstância em seu CA contra ataques à distância.",
  },
    ],
  },
  "Twig of Knowledge and Memory": {
    description: "This tiny magic item looks like a twig from the rare mti’le tree with its swirls of reddish-gold veins through dark brown wood. Each one is unique and fits easily in the palm of a Medium-sized criatura’s hand. When pressed to the temple or lips of a sentient criatura, that criatura can immediately attempt a teste to Recordar Conhecimento about any subject using a corresponding skill (such as Sociedade to Recordar Conhecimento about a humanoid); they gain a +1 bônus de status on this teste. This consumable is not immediately consumed on its first use, but can be used three times before it loses its power and becomes a mundane, if still beautiful, twig.",
  },
  "Twilight Tattoo": {
    description: "Tatuagem de águia negra com espada e flechas, marca das Garras do Crepúsculo. +1 de item em Enganação.\n\n**Ativar—Desvanecer** 1 ação (concentrar, illusion)\n**Efeito** Você hide seu tattoo from view. The tattoo is invisível for 1 day and can’t be detected by effects such as _detect magic_ and _read aura_. Você pode Dismiss this effect.\n\n**Ativar—Inscrever** 2 ações (concentrar, illusion, manipular, scroll)\n**Frequência** 1 vez ao dia\n**Efeito** Você lay seu hand on a piece of text, and seu tattoo makes a perfect copy of it, storing it as a ring of swirling letters surrounding the design. The tattoo can hold text equivalent to two pages of a book, a single scroll, or a similar area of other surfaces, though it doesn’t replicate any magical effect or other special properties of the original words. Você pode Dismiss this effect, and when você Dismiss it, the tattoo copies the original text onto a blank writing surface você’re touching.",
    activations: [
  {
    name: "Desvanecer",
    actionType: "one",
    traits: ["Concentrate","Illusion"],
    effect: "Você esconde sua tatuagem da vista. A tatuagem fica invisível por 1 dia e não pode ser detectada por efeitos como _detectar magia_ e _ler aura_. Você pode descartar esse efeito.",
  },
  {
    name: "Inscrever",
    actionType: "two",
    traits: ["Concentrate","Illusion","Manipulate","Scroll"],
    frequency: "1 vez ao dia",
    effect: "Você coloca a mão em um pedaço de texto e sua tatuagem faz uma cópia perfeita dele, armazenando-o como um anel de letras rodopiantes ao redor do desenho. A tatuagem pode conter texto equivalente a duas páginas de um livro, um único pergaminho ou uma área semelhante de outras superfícies, embora não reproduza nenhum efeito mágico ou outras propriedades especiais das palavras originais. Você pode descartar esse efeito e, quando dispensá-lo, a tatuagem copia o texto original em uma superfície de escrita em branco que você está tocando.",
  },
    ],
  },
  "Twining Staff": {
    description: "Appearing to be just a small, flat disk made of twigs, this item can grow and shrink. Once formed, this oak staff is carved with twisting patterns along its length.\n\n**Ativar—Formar cajado** 1 ação (manipular)\n**Efeito** Você cause the twigs to rapidly grow or contract, reshaping into a +1 impacto staff, a _+1 impacto bo staff_, or its disk form. In its disk form, it has negligible Volume and must be held in one hand to be activated. In the other forms, it has the same Volume as a normal arma of its type. Você pode switch seu grip as part of the activation. When você expand the item, você pode use the force of the expansion to High Jump or to try to Force Open a door or the like by wedging the disk into a gap before activation. The staff makes the Atletismo teste with a +15 modifier.",
    activations: [
  {
    name: "Formar cajado",
    actionType: "one",
    traits: ["Manipulate"],
    effect: "Você faz com que os galhos cresçam ou se contraiam rapidamente, remodelando-se em uma equipe de impacto +1, uma equipe de impacto _+1_ ou em sua forma de disco. Em sua forma de disco, possui volume insignificante e deve ser segurado com uma mão para ser ativado. Nas demais formas, possui o mesmo Volume de uma arma normal do seu tipo. Você pode mudar seu punho como parte da ativação. Ao expandir o item, você pode usar a força da expansão para saltar em altura ou tentar forçar a abertura de uma porta ou algo semelhante, prendendo o disco em uma lacuna antes da ativação. O staff faz o teste do Atletismo com modificador +15.",
  },
    ],
  },
  "Twisting Twine (Greater)": {
    description: "Como o fio retorcido menor, sem limite de frequência, e +15 de Atletismo.\n\n**Ativar—Desfazer o fio** 1 ação (manipular)\n**Frequência** 1 vez ao dia\n**Efeito** Você toss the ball of twine into a square within 6 m. The twine then unravels and animates, attempting to Desarmar or Derrubar (seu choice) a criatura in the square with a total of +9 to the Atletismo teste. At the end of seu turno, the twine winds itself back into a ball and returns to seu hand; if você don't have a free hand, it returns to seu space instead.",
    activations: [
  {
    name: "Desfazer o fio",
    actionType: "one",
    traits: ["Manipulate"],
    frequency: "1 vez ao dia",
    effect: "Você joga o novelo de barbante em um quadrado de 6 m. O fio então se desenrola e se anima, tentando Desarmar ou Derubar (sua escolha) uma criatura no quadrado com um total de +9 no teste de Atletismo. No final do seu turno, o barbante se enrola novamente em uma bola e retorna para sua mão; se você não tiver mão livre, ele retornará ao seu espaço.",
  },
    ],
  },
  "Twisting Twine (Lesser)": {
    description: "This ball of hempen twine resists efforts to unravel it by hand.\n\n**Ativar—Desfazer o fio** 1 ação (manipular)\n**Frequência** 1 vez ao dia\n**Efeito** Você toss the ball of twine into a square within 6 m. The twine then unravels and animates, attempting to Desarmar or Derrubar (seu choice) a criatura in the square with a total of +9 to the Atletismo teste. At the end of seu turno, the twine winds itself back into a ball and returns to seu hand; if você don't have a free hand, it returns to seu space instead.",
    activations: [
  {
    name: "Desfazer o fio",
    actionType: "one",
    traits: ["Manipulate"],
    frequency: "1 vez ao dia",
    effect: "Você joga o novelo de barbante em um quadrado de 6 m. O fio então se desenrola e se anima, tentando Desarmar ou Derubar (sua escolha) uma criatura no quadrado com um total de +9 no teste de Atletismo. No final do seu turno, o barbante se enrola novamente em uma bola e retorna para sua mão; se você não tiver mão livre, ele retornará ao seu espaço.",
  },
    ],
  },
  "Twisting Twine (Moderate)": {
    description: "This ball of hempen twine resists efforts to unravel it by hand. Você pode activate the _moderate twisting twine_ 1 vez por hora em vez de 1 vez ao dia, and the Atletismo modifier is +12.\n\n**Ativar—Desfazer o fio** 1 ação (manipular)\n**Frequência** 1 vez ao dia\n**Efeito** Você toss the ball of twine into a square within 6 m. The twine then unravels and animates, attempting to Desarmar or Derrubar (seu choice) a criatura in the square with a total of +9 to the Atletismo teste. At the end of seu turno, the twine winds itself back into a ball and returns to seu hand; if você don't have a free hand, it returns to seu space instead.",
    activations: [
  {
    name: "Desfazer o fio",
    actionType: "one",
    traits: ["Manipulate"],
    frequency: "1 vez ao dia",
    effect: "Você joga o novelo de barbante em um quadrado de 6 m. O fio então se desenrola e se anima, tentando Desarmar ou Derubar (sua escolha) uma criatura no quadrado com um total de +9 no teste de Atletismo. No final do seu turno, o barbante se enrola novamente em uma bola e retorna para sua mão; se você não tiver mão livre, ele retornará ao seu espaço.",
  },
    ],
  },
  "Unbreakable Heart": {
    description: "These tattoos were first created using designs and techniques from the seven Shoanti clans. Each clan is known for one tattoo in particular. The clans would seal alliances in ancient days by tattooing their emblems on members of other clans to symbolically share their gifts. Though these tattoos are respected, the clans reserve their most prestigious symbols for true members of the clan. The tattoo allows você to understand and speak Shoanti. Se você already know that language, você instead gain a +1 bônus de item on Diplomacia testes você make when speaking Shoanti to someone who understands it.\n\n**Ativar**\n**Frequência** 1 vez ao dia\n**Efeito** The tattoo casts its magia.",
    activations: [
  {
    name: "",
    frequency: "1 vez ao dia",
    effect: "A tatuagem lança sua magia.",
  },
    ],
  },
  "Underbrush Cloak": {
    description: "Manto com capuz forrado de folhagem, trepadeiras e casca que nunca murcha. +1 de item em Furtividade em áreas densamente florestadas.\n\n**Ativar—Um com a floresta** 2 ações (manipular)\n**Frequência** 1 vez ao dia\n**Efeito** For the next minute, você ignore any terreno difícil caused by plants and fungi, such as bushes, vines, and undergrowth.",
    activations: [
  {
    name: "Um com a floresta",
    actionType: "two",
    traits: ["Manipulate"],
    frequency: "1 vez ao dia",
    effect: "No próximo minuto, você ignora qualquer terreno difícil causado por plantas e fungos, como arbustos, trepadeiras e vegetação rasteira.",
  },
    ],
  },
  "Urn of Ashes": {
    description: "This pewter urn contains the ashes of a benevolent ancestor, with a sliver of lingering spirit that strives to protect você.\n\n**Ativar—Condenar a urna** reação (concentrar)\n**Gatilho** Você would become condenado, or seu condenado value would increase\n**Requisitos** The ashes aren't condenado\n**Efeito** The ashes in the urn intervene, taking the condenado condition in seu place, and você don't gain or increase the value of seu condenado condition. Each night when você get a full night's rest, você pode reduce seu own condenado condition or that of the urn, but not both.\n\n**Ativar—Ira do espírito** 1 ação (ataque, concentrar, manipular)\n**Frequência** 1 vez por rodada\n**Efeito** The urn shoots a bolt of void energy at a foe within 9 m. Attempt a ataque de magia roll against o alvo's AC, using a modifier of +15 or seu own ataque de magia modifier, whichever is higher. On a success, the bolt deals 4d4 dano do vazio (doubled on a critical success).",
    activations: [
  {
    name: "Condenar a urna",
    actionType: "reaction",
    traits: ["Concentrate"],
    trigger: "Você would become condenado, or seu condenado value would increase",
    requirements: "As cinzas não estão condenadas",
    effect: "As cinzas da urna intervêm, levando a condição de condenado em seu lugar, e você não ganha nem aumenta o valor de sua condição de condenado. Cada noite, quando você tiver uma noite inteira de descanso, poderá reduzir sua própria condição de condenação ou a da urna, mas não ambas.",
  },
  {
    name: "Ira do espírito",
    actionType: "one",
    traits: ["Attack","Concentrate","Manipulate"],
    frequency: "1 vez por rodada",
    effect: "A urna dispara um raio de energia do vazio em um inimigo em um raio de 9 m. Tente uma jogada de ataque de magia contra o CA do alvo, usando um modificador de +15 ou seu próprio modificador de ataque de magia, o que for maior. Em caso de sucesso, o raio causa 4d4 dano do vazio (dobrado em caso de sucesso crítico).",
  },
    ],
  },
  "Ursine Avenger Hood": {
    description: "Peça de artefato de arquétipo. Capuz de crânio e pele de urso-das-cavernas. Investido: +1 de item em Natureza para Comandar um animal (+2 se for urso). Saudade do selvagem: –1 de item em Diplomacia para Coletar informações ou Fazer uma impressão se passar mais de 5 dias em cidade grande sem 4 horas no ermo. Destruição: ensopar no sangue de um linnorm de 16º nível ou mais e queimar só com carvalho e crisântemo.",
  },
  "Uzunjati Storytelling Amulet": {
    description: "Amuleto redondo personalizado. Investido, +1 de item em Performance para contar histórias.\n\n**Ativar—História cativante** ação livre (concentrar)\n**Frequência** 1 vez ao dia\n**Gatilho** The perfect anecdote or story to impress seu interlocutor comes floating to seu memory.\n**Efeito** Você attempt to Make an Impression or Request, using a Atuação teste em vez da Diplomacia teste.",
    activations: [
  {
    name: "História cativante",
    actionType: "free",
    traits: ["Concentrate"],
    frequency: "1 vez ao dia",
    trigger: "A anedota ou história perfeita para impressionar seu interlocutor vem flutuando em sua memória.",
    effect: "Você tenta fazer uma impressão ou solicitação, usando um teste de atuação em vez do teste de diplomacia.",
  },
    ],
  },
  "Vandal": {
    description: "This magical banner is imbued with the foolhardy courage of hooligans and troublemakers. Golpes você or an aliado make while within the banner’s aura ignore the first 2 points of Hardness of an object.",
  },
  "Vandal's Banner": {
    description: "Estandarte com a coragem temerária de arruaceiros (afixado ou empunhado). Golpes seus ou de aliados na emanação do estandarte ignoram os primeiros 2 pontos de Dureza de um objeto.",
  },
  "Vaporous Pipe": {
    description: "Cachimbo de carvalho que solta fumaça mesmo apagado. Empunhado, sem penalidade de circunstância em Percepção por fumaça densa, não sufoca por fumaça ou ar quente, e resistência a fogo igual à metade do nível.\n\n**Ativar** 1 ação (manipular)\n**Frequência** 1 vez por hora\n**Efeito** Você draw on the pipe and then blow a massive cloud of smoke that fills a 9 m emanation that includes seu space. All criaturas within the smoke cloud are oculto from each other and from criaturas outside the smoke, though você pode still see clearly within it. The smoke dissipates after 3 rodadas, or after 1 rodada if subjected to a strong wind.",
    activations: [
  {
    name: "",
    actionType: "one",
    traits: ["Manipulate"],
    frequency: "1 vez por hora",
    effect: "Você puxa o cachimbo e depois sopra uma enorme nuvem de fumaça que preenche uma emanação de 9 m que inclui seu espaço. Todas as criaturas dentro da nuvem de fumaça ficam ocultas umas das outras e das criaturas fora da fumaça, embora você ainda possa ver claramente dentro dela. A fumaça se dissipa após 3 rodadas, ou após 1 rodada se submetida a vento forte.",
  },
    ],
  },
  "Vaultbreaker": {
    description: "A _vaultbreaker's harness_ has four pockets across the chest. The pockets contain a set of infiltrator's thieves' tools, infiltrator picks, a levered crowbar, and a glass cutter. These items are magically bound to the harness; if they are more than 1 foot away from você, they disappear, then reappear in the harness at the next sunset. Broken or destroyed items similarly reappear, restored, in their proper pockets at sunset.\n\n**Ativar** 1 ação (manipular)\n**Efeito** Você cinch the harness to prepare for mischief. Você ganha +1 bônus de item em Furtividade testes and a +3 m bônus de item em seu Speed por 1 minuto.",
    activations: [
  {
    name: "",
    actionType: "one",
    traits: ["Manipulate"],
    effect: "Você aperta o arnês para se preparar para travessuras. Você ganha +1 bônus de item em testes de Furtividade e +3 milhões de bônus de item em seu Deslocamento por 1 minuto.",
  },
    ],
  },
  "Vaultbreaker's Harness": {
    description: "Arnês com quatro bolsos: ferramentas de ladrão de infiltrador, gazuas de infiltrador, pé de cabra com alavanca e cortador de vidro. Se a mais de 30 cm, somem e voltam no pôr do sol; quebrados também se restauram.\n\n**Ativar** 1 ação (manipular)\n**Efeito** Você cinch the harness to prepare for mischief. Você ganha +1 bônus de item em Furtividade testes and a +3 m bônus de item em seu Speed por 1 minuto.",
    activations: [
  {
    name: "",
    actionType: "one",
    traits: ["Manipulate"],
    effect: "Você aperta o arnês para se preparar para travessuras. Você ganha +1 bônus de item em testes de Furtividade e +3 milhões de bônus de item em seu Deslocamento por 1 minuto.",
  },
    ],
  },
  "Veiled Figurehead": {
    description: "This figurehead is carved in the shape of a humanoid, but it has no facial features whatsoever.\n\n**Ativar—Véu!** (concentrar, illusion, visual)\n**Frequência** 1 vez ao dia\n**Efeito** Você change the appearance of the ship in minor but noticeable ways. Its general size and shape can't be changed, but você pode alter surface details to seu liking. Flags and sails can be recolored and given new markings, and the overall material of the ship can appear a different color or quality. Wear and surface dano (like small holes, tears, and burns) can be masked to make the vessel look unblemished, or você pode create such dano and wear. The figurehead itself shifts to fit the change and gains a face to match the rest of the ship. The illusion lasts for 6 hours or until você Dismiss this effect. Any criatura that boards the ship or uses the Procurar ação to examine it disbelieves the illusion if it succeeds at a CD 25 Percepção teste.",
    activations: [
  {
    name: "Véu!",
    traits: ["Concentrate","Illusion","Visual"],
    frequency: "1 vez ao dia",
    effect: "Você altera a aparência do navio de maneiras menores, mas perceptíveis. Seu tamanho e formato gerais não podem ser alterados, mas você pode alterar os detalhes da superfície ao seu gosto. Bandeiras e velas podem ser recoloridas e receber novas marcações, e o material geral do navio pode ter uma cor ou qualidade diferente. Desgaste e danos superficiais (como pequenos buracos, rasgos e queimaduras) podem ser mascarados para fazer com que o vaso pareça imaculado, ou você pode criar tais danos e desgaste. A própria figura de proa muda para se ajustar à mudança e ganha um rosto que combina com o resto do navio. A ilusão dura 6 horas ou até você descartar esse efeito. Qualquer criatura que embarque no navio ou use a Procuração para examiná-lo descrente da ilusão se obtiver sucesso em um CD 25 Percepção teste.",
  },
    ],
  },
  "Veiled Figurehead (Greater)": {
    description: "This figurehead is carved in the shape of a humanoid, but it has no facial features whatsoever. The CD to disbelieve is 33, and the illusion lasts up to 24 hours. Activating a _greater veiled figurehead_ also extends the illusion to those on the ship. The figurehead casts a _veil_ magia upon them, except it targets everyone on board when activated, and it alters their clothing to a general look that matches the new appearance of the ship. Além disso, it can make everyone appear as a specific ancestry, but você deve choose the same one for all targets. This effect ends for any alvo who leaves the ship and ends for all targets if the illusion on the ship ends. A criatura that disbelieves the illusion for the ship or any disguised crew member disbelieves the entire illusion.\n\n**Ativar—Véu!** (concentrar, illusion, visual)\n**Frequência** 1 vez ao dia\n**Efeito** Você change the appearance of the ship in minor but noticeable ways. Its general size and shape can't be changed, but você pode alter surface details to seu liking. Flags and sails can be recolored and given new markings, and the overall material of the ship can appear a different color or quality. Wear and surface dano (like small holes, tears, and burns) can be masked to make the vessel look unblemished, or você pode create such dano and wear. The figurehead itself shifts to fit the change and gains a face to match the rest of the ship. The illusion lasts for 6 hours or until você Dismiss this effect. Any criatura that boards the ship or uses the Procurar ação to examine it disbelieves the illusion if it succeeds at a CD 25 Percepção teste.",
    activations: [
  {
    name: "Véu!",
    traits: ["Concentrate","Illusion","Visual"],
    frequency: "1 vez ao dia",
    effect: "Você altera a aparência do navio de maneiras menores, mas perceptíveis. Seu tamanho e formato gerais não podem ser alterados, mas você pode alterar os detalhes da superfície ao seu gosto. Bandeiras e velas podem ser recoloridas e receber novas marcações, e o material geral do navio pode ter uma cor ou qualidade diferente. Desgaste e danos superficiais (como pequenos buracos, rasgos e queimaduras) podem ser mascarados para fazer com que o vaso pareça imaculado, ou você pode criar tais danos e desgaste. A própria figura de proa muda para se ajustar à mudança e ganha um rosto que combina com o resto do navio. A ilusão dura 6 horas ou até você descartar esse efeito. Qualquer criatura que embarque no navio ou use a Procuração para examiná-lo descrente da ilusão se obtiver sucesso em um CD 25 Percepção teste.",
  },
    ],
  },
  "Ventriloquist": {
    description: "This elegant copper ring has miniature images of songbirds engraved around its circumference. Você ganha +1 bônus de item em Enganação testes.\n\n**Ativar—Projetar voz** 2 ações (manipular)\n**Frequência** 1 vez ao dia\n**Efeito** Twisting the ring around seu finger allows você to magically throw seu voice, with the effects of a _ventriloquism_ magia (CD 19).",
    activations: [
  {
    name: "Projetar voz",
    actionType: "two",
    traits: ["Manipulate"],
    frequency: "1 vez ao dia",
    effect: "Girar o anel em volta do dedo permite que você lance sua voz magicamente, com os efeitos de uma magia de _ventriloquismo_ (CD 19).",
  },
    ],
  },
  "Ventriloquist's Ring": {
    description: "Anel de cobre com passarinhos. +1 em Enganação. 1 vez ao dia, ventriloquia CD 19.\n\n**Ativar—Projetar voz** 2 ações (manipular)\n**Frequência** 1 vez ao dia\n**Efeito** Twisting the ring around seu finger allows você to magically throw seu voice, with the effects of a _ventriloquism_ magia (CD 19).",
    activations: [
  {
    name: "Projetar voz",
    actionType: "two",
    traits: ["Manipulate"],
    frequency: "1 vez ao dia",
    effect: "Girar o anel em volta do dedo permite que você lance sua voz magicamente, com os efeitos de uma magia de _ventriloquismo_ (CD 19).",
  },
    ],
  },
  "Ventriloquist's Ring (Greater)": {
    description: "Versão maior: +2 em Enganação e ventriloquia de 2º posto à vontade.\n\n**Ativar—Projetar voz** 2 ações (manipular)\n**Frequência** 1 vez ao dia\n**Efeito** Twisting the ring around seu finger allows você to magically throw seu voice, with the effects of a _ventriloquism_ magia (CD 19).",
    activations: [
  {
    name: "Projetar voz",
    actionType: "two",
    traits: ["Manipulate"],
    frequency: "1 vez ao dia",
    effect: "Girar o anel em volta do dedo permite que você lance sua voz magicamente, com os efeitos de uma magia de _ventriloquismo_ (CD 19).",
  },
    ],
  },
  "Versatile Tinderbox": {
    description: "Estojo fino de madeira elegante com gravetos e lascas em seis cores (em geral preto, azul, verde, magenta, amarelo e violeta). Ao acender fogo, a cor da chama e da fumaça muda para a da lasca. Entalhe perfeito para guardar o material, mantendo-o seco; não fecha se guardar qualquer outra coisa. Reabastece-se: nunca falta isca quando o dono precisa, mas nunca produz excedente.",
  },
  "Vine Baton": {
    description: "Bastão de madeira com trepadeira em espiral. Usado por comandantes taldanos das Armadas de Exploração.\n\n**Ativar—Avante, marcha!** 2 ações (manipular, visual)\n**Frequência** 1 vez ao dia\n**Efeito** Você brandish the vine baton with a flourish or in some other dramatic manner. Você and seu aliados within 36 m can Hustle for 1 additional hour. Se você enter an encounter during this time period, the effect ends, but você receive a +2 bônus de status em seu iniciativa rolls for that encounter.",
    activations: [
  {
    name: "Avante, marcha!",
    actionType: "two",
    traits: ["Manipulate","Visual"],
    frequency: "1 vez ao dia",
    effect: "Você brandir o bastão de videira com um floreio ou de alguma outra maneira dramática. Você e seus aliados em um raio de 36 m podem fazer Hustle por 1 hora adicional. Se você entrar em um encontro durante esse período, o efeito termina, mas você recebe +2 de bônus de status em seus testes de iniciativa para esse encontro.",
  },
    ],
  },
  "Violin of the Waves": {
    description: "Violino de jacarandá com cheiro de mar e gravuras de marinheiros. +2 de item em Atuação (+3 a bordo, andando no oceano ou adjacente à água).\n\n**Ativar** (manipular)\n**Frequência** 1 vez ao dia\n**Requisitos** Você deve be aboard a ship\n**Efeito** Você play the song. Once it's completed, the weather immediately calms to the normal as it would for the season, as control weather. For the next day, the weather remains in this state, unless affected by other magical effects. Anyone aboard the ship finds their mind wanders when performing tasks however, daydreaming of drunken revelry or other forms of entertainment, and the crew of the ship takes a –2 penalidade de status to teste de perícias to do anything other than participate in such revelry.",
    activations: [
  {
    name: "",
    traits: ["Manipulate"],
    frequency: "1 vez ao dia",
    requirements: "Você deve be aboard a ship",
    effect: "Você toca a música. Depois de concluído, o clima imediatamente se acalma e volta ao normal, como seria para a temporada, conforme o clima de controle. No dia seguinte, o clima permanecerá neste estado, a menos que seja afetado por outros efeitos mágicos. Porém, qualquer pessoa a bordo do navio fica divagando ao realizar tarefas, sonhando acordado com folias bêbadas ou outras formas de entretenimento, e a tripulação do navio leva -2 encontro de status para teste de perícias para fazer qualquer coisa além de participar de tal folia.",
  },
    ],
  },
  "Vocal Shells": {
    description: "Duas conchas do tamanho de botão: uma capta a voz, a outra reproduz. Permite jogar a voz até 18 m enquanto ambas estiverem no alcance; Interagir para ligar ou desligar.",
  },
  "Voice from the Grave": {
    description: "Crânio de ônix que sussurra sozinho. Empunhado, traduz o que espíritos e assombrações visíveis dizem (e suas palavras para eles), mesmo sem idioma comum; não os deixa amigáveis. Não funciona com espíritos sem mente.\n\n**Ativar** 2 ações (concentrar, manipular)\n**Frequência** 1 vez por hora\n**Efeito** The onyx skull casts a CD 27 _charm_ magia on one spirit or haunt você pode communicate with using the skull. Se você alvo a haunt that doesn't have a Vontade modifier, it automatically gets a failure on its save.",
    activations: [
  {
    name: "",
    actionType: "two",
    traits: ["Concentrate","Manipulate"],
    frequency: "1 vez por hora",
    effect: "A caveira de ônix lança uma magia CD 27 _charm_ em um espírito ou assombração com quem você pode se comunicar usando a caveira. Se você atingir um assombrado que não possui um modificador Vontade, ele falhará automaticamente ao salvar.",
  },
    ],
  },
  "Voyager": {
    description: "This leather rucksack has icons burned into it, and every time it's taken to a plane it hasn't been to before, a new icon representing that plane scorches into the surface. The pack concede a você a +3 bônus to Sobrevivência testes. It also enables você to see the magical traces of criaturas' passage, allowing você to Track a criatura that has teleported. The GM sets the CD of this teste, usually using the CD de magia or the level of the teleportation's caster. This lets você find the location of the criatura's destination, and você pode use that destination when casting teleport or activating the pack, even though você don't know what it looks like. The pack contains an extradimensional space with the same properties as a type II _spacious pouch_. This space contains the contents of a climber's kit. If any components of that kit are removed and not returned, they return to the pack at dawn each day.\n\n**Ativar—Viagem em grupo** (concentrar, manipular)\n**Efeito** As você activate the pack, você pode harness up to four willing criaturas to the ropes on the pack. At the end of the activation time, the pack casts a 7º posto _interplanar teleport_ or _teleport_ magia, transporting você and everyone attached to the pack. Attempt a CD 45 Sobrevivência teste. On a success, você arrive 40 km off alvo using _interplanar teleport_ or halve the distance você're off-alvo with _teleport_. On a critical success, você arrive exactly on alvo.",
    activations: [
  {
    name: "Viagem em grupo",
    traits: ["Concentrate","Manipulate"],
    effect: "Ao ativar o pacote, você pode amarrar até quatro criaturas voluntárias nas cordas do pacote. Ao final do tempo de ativação, a matilha lança um 7º posto _interplanar teleport_ ou _teleport_ magia, transportando você e todos os anexados à matilha. Tente um CD 45 Sobrevivência teste. Em caso de sucesso, você chega a 40 km do alvo usando _teleporte interplanar_ ou reduz pela metade a distância que você está fora do alvo com _teleporte_. Em um sucesso crítico, você chega exatamente no alvo.",
  },
    ],
  },
  "Voyager's Pack": {
    description: "Mochila que marca cada plano visitado. +3 em Sobrevivência, rastreia teleporte, espaço tipo II e viagem em grupo. Incomum.\n\n**Ativar—Viagem em grupo** (concentrar, manipular)\n**Efeito** As você activate the pack, você pode harness up to four willing criaturas to the ropes on the pack. At the end of the activation time, the pack casts a 7º posto _interplanar teleport_ or _teleport_ magia, transporting você and everyone attached to the pack. Attempt a CD 45 Sobrevivência teste. On a success, você arrive 40 km off alvo using _interplanar teleport_ or halve the distance você're off-alvo with _teleport_. On a critical success, você arrive exactly on alvo.",
    activations: [
  {
    name: "Viagem em grupo",
    traits: ["Concentrate","Manipulate"],
    effect: "Ao ativar o pacote, você pode amarrar até quatro criaturas voluntárias nas cordas do pacote. Ao final do tempo de ativação, a matilha lança um 7º posto _interplanar teleport_ ou _teleport_ magia, transportando você e todos os anexados à matilha. Tente um CD 45 Sobrevivência teste. Em caso de sucesso, você chega a 40 km do alvo usando _teleporte interplanar_ ou reduz pela metade a distância que você está fora do alvo com _teleporte_. Em um sucesso crítico, você chega exatamente no alvo.",
  },
    ],
  },
  "Walking Cauldron": {
    description: "Parece lava congelada, mas um padrão de runas vermelhas se repete. Ao arremessar, tem o efeito da lava congelada do mesmo nível e se recompõe após 2d4 horas.",
  },
  "Warden": {
    description: "This symbol shows seu dedication to the magic practiced by some rangers. Most rangers wear it on an amulet, ring, or piercing. Você ganha +2 bônus de item em Natureza testes.\n\n**Ativar** ação livre (concentrar)\n**Frequência** 1 vez ao dia\n**Efeito** Você ganha 1 ponto de foco, which você pode use only to cast a ranger warden magia. When você use this ponto de foco, the _warden’s signet_ also casts a 4º posto _oaken resilience_ magia on você. If not used by the end of seu turno, this ponto de foco is lost.",
    activations: [
  {
    name: "",
    actionType: "free",
    traits: ["Concentrate"],
    frequency: "1 vez ao dia",
    effect: "Você ganha 1 ponto de foco, que você pode usar apenas para lançar uma magia de guarda florestal. Quando você usa este ponto de foco, o _sinete do diretor_ também lança uma magia de 4º posto _resiliência de carvalho_ em você. Se não for utilizado até o final do seu turno, esse ponto de foco será perdido.",
  },
    ],
  },
  "Warden's Signet": {
    description: "This symbol shows seu dedication to the magic practiced by some rangers. Most rangers wear it on an amulet, ring, or piercing. Você ganha +2 bônus de item em Natureza testes.\n\n**Ativar** ação livre (concentrar)\n**Frequência** 1 vez ao dia\n**Efeito** Você ganha 1 ponto de foco, which você pode use only to cast a ranger warden magia. When você use this ponto de foco, the _warden’s signet_ also casts a 4º posto _oaken resilience_ magia on você. If not used by the end of seu turno, this ponto de foco is lost.",
    activations: [
  {
    name: "",
    actionType: "free",
    traits: ["Concentrate"],
    frequency: "1 vez ao dia",
    effect: "Você ganha 1 ponto de foco, que você pode usar apenas para lançar uma magia de guarda florestal. Quando você usa este ponto de foco, o _sinete do diretor_ também lança uma magia de 4º posto _resiliência de carvalho_ em você. Se não for utilizado até o final do seu turno, esse ponto de foco será perdido.",
  },
    ],
  },
  "Warding Tattoo": {
    description: "Muitas culturas de Golarion tatuam um símbolo para afastar o perigo (fera em Kyonin, redemoinho nas Correntes, rosto de demônio na Cicatriz de Sarkoris).\n\n**Ativar—Salvaguarda tatuada** reação (concentrar)\n**Frequência** 1 vez ao dia\n**Gatilho** An inimigo, hazard, or the environment makes an attack against seu AC, requires você to attempt a salvaguarda, or causes você to take dano automatically\n**Efeito** Until the end of the current turno, against the triggering effect, você ganha a +1 bônus de status em AC and salvaguardas and gain resistência 2 to the triggering dano.",
    activations: [
  {
    name: "Salvaguarda tatuada",
    actionType: "reaction",
    traits: ["Concentrate"],
    frequency: "1 vez ao dia",
    trigger: "Um inimigo, perigo ou ambiente faz um ataque contra seu CA, exige que você tente uma salvaguarda ou faz com que você receba dano automaticamente",
    effect: "Até o final do turno atual, contra o efeito desencadeante, você ganha +1 bônus de status em CA e salvaguardas e ganha resistência 2 ao dano desencadeante.",
  },
    ],
  },
  "Warming Parka": {
    description: "Parca grossa com capuz contra o frio. Anula o dano de frio ambiental severo, reduz o de frio extremo ao de severo e o de frio incrível ao de extremo.\n\n**Ativar—Aquecimento extra** 1 ação (manipular, cold)\n**Frequência** 1 vez ao dia\n**Efeito** Você draw the hood of seu warming parka closed to fend off the cold as much as possible. For the next minute, você ganha resistência 3 to dano de frio, but also take a –2 penalidade de item to Percepção testes. Você pode Dismiss this effect.",
    activations: [
  {
    name: "Aquecimento extra",
    actionType: "one",
    traits: ["Manipulate","Cold"],
    frequency: "1 vez ao dia",
    effect: "Você fecha o capuz da sua parka aquecida para se proteger ao máximo do frio. No minuto seguinte, você ganha resistência 3 ao dano de frio, mas também leva –2 ao cair do item para Percepção testes. Você pode descartar esse efeito.",
  },
    ],
  },
  "Warpipes": {
    description: "Gaita de foles com marcas de batalha, mas polida e tocada com amor. +1 de item em Atuação ao tocar.\n\n**Ativar—Saudação inspiradora** 2 ações (auditivo, concentrar, manipular, medo)\n**Frequência** 1 vez ao dia\n**Efeito** Você tap into the great music of the pipes, inspiring all aliados who can hear. Você and all aliados within a 18 m emanation gain a +1 bônus de status em rolagem de danos and saves against fear effects por 1 minuto.",
    activations: [
  {
    name: "Saudação inspiradora",
    actionType: "two",
    traits: ["Auditory","Concentrate","Manipulate","Fear"],
    frequency: "1 vez ao dia",
    effect: "Você aproveita a boa música das flautas, inspirando todos os aliados que podem ouvir. Você e todos os aliados dentro de uma emanação de 18 m ganham +1 de bônus de status em rolagem de danos e salva contra efeitos de medo por 1 minuto.",
  },
    ],
  },
  "Watcher": {
    description: "Soldiers who wear this burgundy armband serve as law enforcement within the ranks of a nation’s military, seeking out those who would commit crimes while in uniform. Enquanto estiver vestindo the armband, você ganha a +2 bônus de item em seu Percepção CD against Enganação testes to Lie to você. Além disso, você pode cast ring of truth 1 vez ao dia as an innate 3º posto occult magia.\n\n**Ativar—Encontrar a planta** 1 ação (concentrar, detection, manipular, magical, mental)\n**Frequência** 1 vez ao dia\n**Efeito** Sometimes people aren’t in control of their minds. Você activate seu armband, which, for the next minute, suddenly glows red if anyone within 9 m of você is under the effect of a magical mental effect that is controlling their mind or body (such as _dominate_).",
    activations: [
  {
    name: "Encontrar a planta",
    actionType: "one",
    traits: ["Concentrate","Detection","Manipulate","Magical","Mental"],
    frequency: "1 vez ao dia",
    effect: "Às vezes as pessoas não estão no controle de suas mentes. Você ativa sua braçadeira, que, no minuto seguinte, brilha repentinamente em vermelho se alguém a 9 m de você estiver sob o efeito de um efeito mental mágico que esteja controlando sua mente ou corpo (como _dominar_).",
  },
    ],
  },
  "Watcher's Armband": {
    description: "Braçadeira bordô de polícia interna militar. +2 de item na CD de Percepção contra Enganação para Mentir a você. Também conjura sino da verdade 1 vez ao dia como magia inata oculta de 3º posto.\n\n**Ativar—Encontrar a planta** 1 ação (concentrar, detection, manipular, magical, mental)\n**Frequência** 1 vez ao dia\n**Efeito** Sometimes people aren’t in control of their minds. Você activate seu armband, which, for the next minute, suddenly glows red if anyone within 9 m of você is under the effect of a magical mental effect that is controlling their mind or body (such as _dominate_).",
    activations: [
  {
    name: "Encontrar a planta",
    actionType: "one",
    traits: ["Concentrate","Detection","Manipulate","Magical","Mental"],
    frequency: "1 vez ao dia",
    effect: "Às vezes as pessoas não estão no controle de suas mentes. Você ativa sua braçadeira, que, no minuto seguinte, brilha repentinamente em vermelho se alguém a 9 m de você estiver sob o efeito de um efeito mental mágico que esteja controlando sua mente ou corpo (como _dominar_).",
  },
    ],
  },
  "Wave Warding Tattoo": {
    description: "Como a tatuagem de proteção, no estilo das ondas. Ativar — Salvaguarda tinta (concentrar): 1 vez ao dia. Gatilho: você entra onde não consegue respirar, ou inimigo, perigo ou o ambiente ataca sua CA, exige salvaguarda ou causa dano automático. Efeito: até o fim do turno, +1 de status na CA e nas salvaguardas contra o efeito, resistência 2 ao dano disparador, e conjura bolha de ar em você.",
  },
  "Wayfinder": {
    description: "Bússola compacta da Sociedade Pathfinder. Encaixa uma pedra eon (contam como um item investido) e libera a ressonância. Ativação: luz. Incomum.",
  },
  "Weapon of False Wounds": {
    description: "Arma quase toda ilusão (só o cabo é sólido). Golpes são não letais e óbvios como encenação; serve para reencenar duelos sem ferir de verdade.",
  },
  "Whisper of the First Lie": {
    description: "Colar com sussurros engarrafados da primeira mentira. +3 em Enganação, contrapõe magias da verdade, e uma única verdade fabricada CD 47. Raro.\n\n**Ativar—Liberar a mentira** 3 ações (concentrar, manipular)\n**Efeito** Você unstopper the vial and release the lie, creating the effect of a _fabricated truth_ (CD 47). The vial is emptied and can never be activated again.",
    activations: [
  {
    name: "Liberar a mentira",
    actionType: "three",
    traits: ["Concentrate","Manipulate"],
    effect: "Você destampa o frasco e libera a mentira, criando o efeito de uma _verdade fabricada_ (CD 47). O frasco é esvaziado e nunca mais poderá ser ativado.",
  },
    ],
  },
  "Whisperer of Souls": {
    description: "Glaive +4 impactante máxima brilhante maior afiada. Prende a alma de criatura sápiente de 18º nível ou mais que você reduza a 0 PV ou contra a qual tire crítico; Fortitude CD 50. Sucesso crítico: nada. Sucesso: drenado 1 (alma presa se morrer assim). Falha: drenado 2. Falha crítica: drenado 4. Alma só se liberta por ato de grande bondade.\n\n**Ativar** ação livre (concentrar, nonlethal)\n**Gatilho** Você Golpe with the _Whisperer of Souls_\n**Efeito** Você choose whether the Golpe deals lethal or nonlethal dano. If the glaive has a reason for doing so, such as slaying a criatura whose soul the glaive can absorb, it can defy seu choice if você fail a CD 50 salvaguarda de Vontade.\n\n**Ativar** ação livre (concentrar)\n**Gatilho** Você attempt an Ocultismo teste to Decifrar Escrita, Identificar Magia, Learn a Spell, or Recordar Conhecimento\n**Efeito** Você listen to eldritch secrets the arma whispers, gaining a +4 bônus de item em the triggering teste.\n\n**Ativar** 3 ações (concentrar, manipular, unholy, holy, herald)\n**Frequência** 1 vez por semana\n**Efeito** Attempt an Ocultismo teste as if você cast the legend lore ritual about a subject. Se você roll a success or critical success, você pode repeat what the _Whisperer of Souls_ relates to você about the subject. On a critical failure, você and the glaive are drawn into a murmuring void of cold, where seu mind is assaulted by strange visions for an entire week. At the end of this time, você reappear and deve fazer um teste CD 50 salvaguarda de Vontade. **Sucesso** When você return, você pode retrain one of seu skills into a Lore skill about evil criaturas or places, as if você had spent 1 week retraining. **Falha** As success, but você está aturdido 2 for 1 week. **Falha crítica** As success, but você become unholy. Se você were holy, você instead lose that trait. Você deve retrain one of seu skills into a Lore about unholy criaturas or places. Você fica obsessed with increasing seu forbidden knowledge, turning to wicked forces that offer such secrets and compromising seu morals further if você deve. **Destruction** If the _Whisperer of Souls_ is used to slay Shelyn's herald, it disintegrates, bringing about great evil in its wake.",
    activations: [
  {
    name: "",
    actionType: "free",
    traits: ["Concentrate","Nonlethal"],
    trigger: "Você Golpe com o _Sussurrador de Almas_",
    effect: "Você escolhe se o Golpe causa dano letal ou não letal. Se o glaive tiver uma razão para fazer isso, como matar uma criatura cuja alma o glaive pode absorver, ele poderá desafiar sua escolha se você falhar em um CD 50 de salvaguarda de Vontade.",
  },
  {
    name: "",
    actionType: "free",
    traits: ["Concentrate"],
    trigger: "Você tenta um teste de Ocultismo para Decifrar Escrita, Identificar Magia, Aprender um Feitiço ou Gravar Conhecimento",
    effect: "Você ouve os segredos sobrenaturais que a arma sussurra, ganhando +4 de bônus de item no teste de ativação.",
  },
  {
    name: "",
    actionType: "three",
    traits: ["Concentrate","Manipulate","Unholy","Holy","Herald"],
    frequency: "1 vez por semana",
    effect: "Faça um teste de Ocultismo como se você lançasse o ritual da lenda sobre um assunto. Se você obtiver sucesso ou sucesso crítico, poderá repetir o que o _Sussurrador de Almas_ lhe conta sobre o assunto. Em uma falha crítica, você e o glaive são atraídos para um vazio murmurante de frio, onde sua mente é assaltada por visões estranhas durante uma semana inteira. Ao final deste tempo, você reaparece e deverá fazer um teste CD 50 segurança de Vontade. **Sucesso** Quando você retornar, você poderá retreinar uma de suas habilidades em uma habilidade de Conhecimento sobre criaturas ou lugares malignos, como se você tivesse passado 1 semana retreinando. **Falha** Como sucesso, mas você está aturdido 2 por 1 semana. **Falha crítica** Como sucesso, mas você se torna profano. Se você fosse santo, você perderia essa característica. Você deve reciclar uma de suas habilidades em um conhecimento sobre criaturas ou lugares profanos. Você fica obcecado em aumentar seu conhecimento proibido, recorrendo a forças perversas que oferecem tais segredos e comprometendo ainda mais sua moral se você quiser. **Destruição** Se o _Whisperer of Souls_ for usado para matar o arauto de Shelyn, ele se desintegra, trazendo um grande mal em seu rastro.",
  },
    ],
  },
  "Whispering Veil": {
    description: "Máscara de madeira escura da Mordant Spire: +1 de item em Percepção para iniciativa e para Buscar, Procurar ou Sentir Motivação contra o que pretende lhe fazer mal (a critério do MJ); em empate de iniciativa, você age primeiro.\n\n**Ativar—Poder da agulha** ação livre (concentrar)\n**Frequência** 1 vez ao dia\n**Gatilho** Você está about to attempt a teste that seu mythic calling would allow você to spend a Mythic Point on\n**Efeito** Você draw on the power of the Mordant Spire. Você ganha 1 Mythic Point, which você pode spend to attempt the teste. Se você don’t spend this point até o fim deste turno, ele é perdido. Você do not regain a Mythic Point if você critically succeed on the teste, even if it’s na primeira vez que você did so that day, but still do so on the subsequent critical success, as usual.\n\n**Ativar—Alerta imprevisto** ação livre\n**Requisitos** A criatura or hazard você están’t aware of targets você or includes você in an area effect, and você están’t surdo\n**Efeito** The whispers warn você of the impending danger. Você immediately gain a reação that você pode use only to respond to the triggering ação or effect.",
    activations: [
  {
    name: "Poder da agulha",
    actionType: "free",
    traits: ["Concentrate"],
    frequency: "1 vez ao dia",
    trigger: "Você está prestes a tentar um teste em que seu chamado mítico lhe permitiria gastar um Ponto Mítico",
    effect: "Você utiliza o poder do Pináculo Mordente. Você ganha 1 Ponto Mítico, que pode gastar para tentar o teste. Se você não gastar esse ponto até o fim deste turno, ele estará perdido. Você não recupera um Ponto Mítico se obtiver sucesso crítico no teste, mesmo que tenha sido a primeira vez que o fez naquele dia, mas ainda assim o fará no sucesso crítico subsequente, como de costume.",
  },
  {
    name: "Alerta imprevisto",
    actionType: "free",
    requirements: "Uma criatura ou perigo que você não está ciente dos alvos ou inclui você em um efeito de área, e você não está surpreso",
    effect: "Os sussurros alertam você sobre o perigo iminente. Você imediatamente ganha uma evidência que você pode usar apenas para responder à ação ou efeito desencadeante.",
  },
    ],
  },
  "Wind at Your Back": {
    description: "This object can only be described as a gray, solidified, miniature cloud that feels spongy to the touch. The cloud is incredibly soft and can be easily lifted with little effort, though its ephemeral nature requires using two hands to ensure it doesn't slip from seu grasp.\n\n**Ativar** 1 ação (manipular)\n**Frequência** 1 vez ao dia\n**Efeito** Você blow across the surface of the cloud, and it floats free of você and calls up a strong breeze. For the next 8 hours, it floats behind você and seu companions, increasing the amount of time the group can Hustle during exploration to the lowest Constituição modifier in the group × 20 em vez de × 10. Você deve all remain within 30 m to get the benefit. Se você activate the item aboard a vehicle, você instead grant the vehicle a +3 m bônus de circunstância em its Speeds for 8 hours. If the vehicle is powered by wind, such as a sailing ship, the bônus increases to +6 m. When the 8 hours are up, the cloud stops blowing and floats back into seu hands.",
    activations: [
  {
    name: "",
    actionType: "one",
    traits: ["Manipulate"],
    frequency: "1 vez ao dia",
    effect: "Você sopra pela superfície da nuvem, e ela flutua livre de você e evoca uma forte brisa. Pelas próximas 8 horas, ele flutua atrás de você e de seus companheiros, aumentando a quantidade de tempo que o grupo pode Agitar durante a exploração para o modificador de Constituição mais baixo do grupo × 20 em vez de × 10. Todos vocês devem permanecer dentro de 30 m para obter o benefício. Se você ativar o item a bordo de um veículo, você concederá ao veículo +3 m de bônus de circunstância em suas velocidades por 8 horas. Se o veículo for movido a vento, como um navio à vela, o bônus aumenta para +6 m. Quando as 8 horas terminam, a nuvem para de soprar e flutua de volta para suas mãos.",
  },
    ],
  },
  "Windborne Platform": {
    description: "Plataforma mágica de cerca de 3 m de lado. Flutua até 6 m de altura; Interagir para subir, descer ou estacionar. Usada em palco e nos bastidores.\n\n**Ativar—Ajustar altura** 1 ação (manipular)\n**Efeito** The platform and all criaturas and items on the platform either rise or lower up to 3 m. This ação fails if there is more than 50 Volume on the platform.",
    activations: [
  {
    name: "Ajustar altura",
    actionType: "one",
    traits: ["Manipulate"],
    effect: "A plataforma e todas as criaturas e itens na plataforma sobem ou descem até 3 m. Esta ação falha se houver mais de 50 volumes na plataforma.",
  },
    ],
  },
  "Winged Sandals": {
    description: "Sandálias de couro com asinhas. Quedas ativam aterrissagem suave. 1 vez ao dia, voo de 30 pés por 10 minutos.\n\n**Ativar—Despertar asas** 2 ações (air, concentrar)\n**Frequência** 1 vez ao dia\n**Efeito** The wings grow in size and propel você through the air, granting você a deslocamento de voo of 9 m por 10 minutos.",
    activations: [
  {
    name: "Despertar asas",
    actionType: "two",
    traits: ["Air","Concentrate"],
    frequency: "1 vez ao dia",
    effect: "As asas crescem em tamanho e impulsionam você pelo ar, garantindo uma posição de voo de 9 m por 10 minutos.",
  },
    ],
  },
  "Wyvern Nafir": {
    description: "Trombeta simples de um único chifre de wyvern. +2 de item em Atuação ao tocar.\n\n**Ativar—Grito de wyvern** 2 ações (auditivo, concentrar, manipular, sonic)\n**Frequência** 1 vez ao dia\n**Efeito** Você blast a draconic scream from the nafir. All criaturas in a 9 m cone take 5d10 dano sônico (CD 27 Fortitude básico save). On a failed save, o alvo is pushed back 1,5 m (or 3 m on a critical failure).",
    activations: [
  {
    name: "Grito de wyvern",
    actionType: "two",
    traits: ["Auditory","Concentrate","Manipulate","Sonic"],
    frequency: "1 vez ao dia",
    effect: "Você dá um grito dracônico do nafir. Todas as criaturas em um cone de 9 m recebem 5d10 dano sônico (CD 27 Fortitude básico save). Em caso de falha no salvamento, o alvo é empurrado 1,5 m para trás (ou 3 m em caso de falha crítica).",
  },
    ],
  },
  "Zarothrask's Contract": {
    description: "Pacto com um gongorinan: +2 de item em Atletismo para Desarmar itens manufaturados e para Agarrar; evite promover metas demoníacas. 1 vez ao dia o gongorinan pode distorcer seu corpo (Fortitude CD 25 ou enjoado 2; as feições voltam ao sair de enjoado), em geral se você pecar ou ajudar um demônio.\n\n**Ativar—Emergência da gongorinan** 2 ações (concentrar, mental, morph, occult, unholy)\n**Frequência** 1 vez ao dia\n**Efeito** Stony tentacles burst out of seu body, lashing at foes. Creatures in a 3 m emanation take 6d6 dano de concussão and 2d6 dano mental (CD 25 Fortitude básico save); on a failure, the criatura also becomes enjoado 1 (enjoado 2 on a critical failure) as parts of their anatomy temporarily warp into animal features. When a criatura recovers from the enjoado condition, its features revert to normal.",
    activations: [
  {
    name: "Emergência da gongorinan",
    actionType: "two",
    traits: ["Concentrate","Mental","Morph","Occult","Unholy"],
    frequency: "1 vez ao dia",
    effect: "Tentáculos pedregosos explodem de seu corpo, atacando os inimigos. Criaturas em uma emanação de 3 m recebem 6d6 de dano de concussão e 2d6 de dano mental (CD 25 Fortitude básico save); em caso de falha, a criatura também se torna enjoado 1 (enjoado 2 em caso de falha crítica) à medida que partes de sua anatomia se transformam temporariamente em características animais. Quando uma criatura se recupera da condição enjoada, suas características voltam ao normal.",
  },
    ],
  },
  "Zealous Banner": {
    description: "This magical banner stands as a reminder to fight with everything because você’re fighting for everything. While holding a _zealous banner_, você pode use the following ability.\n\n**Ativar—Avante com zelo** 1 ação (concentrar)\n**Frequência** 1 vez por minuto\n**Efeito** The magical banner offers a magical boost of zeal. An aliado within the banner’s aura becomes acelerado por 1 rodada and can use the additional ação only to Golpe.",
    activations: [
  {
    name: "Avante com zelo",
    actionType: "one",
    traits: ["Concentrate"],
    frequency: "1 vez por minuto",
    effect: "O estandarte mágico oferece um impulso mágico de zelo. Um aliado dentro da aura do estandarte fica acelerado por 1 rodada e pode usar a ação adicional apenas para Golpe.",
  },
    ],
  },
  "Zuhra": {
    description: "This elaborate metallic webbing feels soft when wrapped around seu hands and forearms. It constantly shifts its strands and connections. The name of a zuhra shuyookh is etched in Talican on the only part of the item that's unchanging. Você ganha +3 bônus de item em seu Reflexos CD against attempts to Desarmar an item você're holding in seu hands.\n\n**Ativar—Estratagema de Zuhra** 2 ações (concentrar, manipular)\n**Frequência** 1 vez ao dia\n**Requisitos** Você're wielding a arma made primarily of metal\n**Efeito** Você extend the arma and call out the zuhra's name. They channel their magic through the gloves to assist você with their choice of offense or defense (as determined by the GM). The zuhra makes any choices for the magia, and any save CD is 30. **Offense** The metal of the gloves wraps around seu arma and channels the zuhra's magic to cast a 6º posto _weapon storm_ magia, replicating the metal arma. **Defense** The metal flows off seu arms, creating a _wall of metal_. The wall's surface has the same pattern as the gloves. Você lose the gloves' bônus de item until the barrier ends, at which point the metal returns to seu hands and forearms. Você pode Dismiss the activation.",
    activations: [
  {
    name: "Estratagema de Zuhra",
    actionType: "two",
    traits: ["Concentrate","Manipulate"],
    frequency: "1 vez ao dia",
    requirements: "Você está wielding a arma made primarily of metal",
    effect: "Você estende a arma e chama o nome do zuhra. Eles canalizam sua magia através das luvas para auxiliar você na escolha de ataque ou defesa (conforme determinado pelo GM). O zuhra faz qualquer escolha para a magia, e qualquer CD de salvamento custa 30. **Ofensa** O metal das luvas envolve sua arma e canaliza a magia do zuhra para lançar uma magia de 6º posto _tempestade de armas_, replicando a arma de metal. **Defesa** O metal flui de seus braços, criando uma _parede de metal_. A superfície da parede tem o mesmo padrão das luvas. Você perde o bônus de item das luvas até que a barreira termine, momento em que o metal retorna para suas mãos e antebraços. Você pode dispensar a ativação.",
  },
    ],
  },
  "Zuhra's Gloves": {
    description: "Teia metálica nas mãos, nome de um zuhra em talicano. +3 na CD contra Desarmar.\n\n**Ativar—Estratagema de Zuhra** 2 ações (concentrar, manipular)\n**Frequência** 1 vez ao dia\n**Requisitos** Você're wielding a arma made primarily of metal\n**Efeito** Você extend the arma and call out the zuhra's name. They channel their magic through the gloves to assist você with their choice of offense or defense (as determined by the GM). The zuhra makes any choices for the magia, and any save CD is 30. **Offense** The metal of the gloves wraps around seu arma and channels the zuhra's magic to cast a 6º posto _weapon storm_ magia, replicating the metal arma. **Defense** The metal flows off seu arms, creating a _wall of metal_. The wall's surface has the same pattern as the gloves. Você lose the gloves' bônus de item until the barrier ends, at which point the metal returns to seu hands and forearms. Você pode Dismiss the activation.",
    activations: [
  {
    name: "Estratagema de Zuhra",
    actionType: "two",
    traits: ["Concentrate","Manipulate"],
    frequency: "1 vez ao dia",
    requirements: "Você está wielding a arma made primarily of metal",
    effect: "Você estende a arma e chama o nome do zuhra. Eles canalizam sua magia através das luvas para auxiliar você na escolha de ataque ou defesa (conforme determinado pelo GM). O zuhra faz qualquer escolha para a magia, e qualquer CD de salvamento custa 30. **Ofensa** O metal das luvas envolve sua arma e canaliza a magia do zuhra para lançar uma magia de 6º posto _tempestade de armas_, replicando a arma de metal. **Defesa** O metal flui de seus braços, criando uma _parede de metal_. A superfície da parede tem o mesmo padrão das luvas. Você perde o bônus de item das luvas até que a barreira termine, momento em que o metal retorna para suas mãos e antebraços. Você pode dispensar a ativação.",
  },
    ],
  },
}

const BY_KEY = new Map(
  Object.entries(WORN_ITEM_TEXT).map(([name, value]) => [name.toLowerCase(), value]),
)

export function lookupWornItemText(originalName: string | undefined | null) {
  if (!originalName) return undefined
  return BY_KEY.get(originalName.trim().toLowerCase())
}

export function applyWornItemText<T extends { category: string; originalName: string; description: string; wornMagic?: { activations?: WornMagicActivation[] } }>(
  item: T,
): T {
  const extra = lookupWornItemText(item.originalName)
  if (!extra?.description) return item
  const extraLooksEnglish = !/[áàâãéêíóôõúç]/i.test(extra.description)
  const itemLooksPortuguese = /[áàâãéêíóôõúç]/i.test(item.description)
  if (!extra.activations?.length && extraLooksEnglish && itemLooksPortuguese) return item
  return {
    ...item,
    description: extra.description,
    wornMagic: extra.activations?.length
      ? { ...item.wornMagic, activations: extra.activations }
      : item.wornMagic,
  }
}
