import type { ClassCatalogDefinition } from '@/types/class'
import { CLASS_EXEMPLAR_ID } from '../ids'
import { SOURCE_WAR_OF_IMMORTALS_ID } from '../sources'
import { catalogOption, section } from './helpers'

const SRC = SOURCE_WAR_OF_IMMORTALS_ID

export const exemplarIkonCatalog: ClassCatalogDefinition = {
  id: 'exemplar-ikons',
  classId: CLASS_EXEMPLAR_ID,
  label: 'Ícones',
  originalName: 'Ikons',
  description:
    'No 1º você escolhe 3 ícones (War of Immortals, pág. 43). Pegue pelo menos 1 de arma. Corpo não se desarma nem se rouba. Arma/vestido: ganha um item nível 0 do uso.',
  kind: 'repertoire',
  unique: true,
  slotsByLevel: [{ minLevel: 1, count: 3 }],
  searchPlaceholder: 'Buscar ícone…',
  categoryLabels: {
    weapon: 'Arma',
    worn: 'Vestido',
    body: 'Corpo',
  },
  constraints: [
    {
      kind: 'minCategory',
      category: 'weapon',
      count: 1,
      message: 'Escolha pelo menos 1 ícone de arma',
    },
  ],
  options: [
    catalogOption({
      id: 'ikon-barrows-edge',
      name: 'Fio da Tumba',
      originalName: "Barrow's Edge",
      category: 'weapon',
      usage: 'Arma corpo a corpo cortante ou perfurante',
      sourcePage: 43,
      description:
        'A lâmina chacoalha na bainha, como se quisesse sair para beber violência.',
      rulesSummary:
        'Imanência: +1 espírito por dado de arma (+3 se o alvo está abaixo da metade dos PV). Chacoalha perto de inimigo ferido. Transcendência: cura metade do dano do último Golpe.',
      actionType: 'one',
      sections: [
        section(
          'Imanência',
          '+1 de espírito por dado de dano da arma. Se o alvo está abaixo da metade dos PV máximos, +3 por dado. A arma avisa quando um inimigo ferido está no alcance.',
        ),
        section(
          'Beber dos Inimigos',
          'Requer Golpe bem-sucedido com o Fio da Tumba na ação anterior. Recupera PV iguais à metade do dano causado.',
          'one',
        ),
      ],
    }),
    catalogOption({
      id: 'ikon-gleaming-blade',
      name: 'Lâmina Reluzente',
      originalName: 'Gleaming Blade',
      category: 'weapon',
      usage: 'Arma do grupo espada ou faca, ou desarmado corpo a corpo cortante',
      sourcePage: 44,
      description: 'Brilha tão afiada que parece cortar o ar à frente.',
      rulesSummary:
        'Imanência: +2 espírito por dado. Transcendência: dois Golpes no mesmo alvo; se ambos acertam, o dano vira espírito e soma (resistências uma vez).',
      actionType: 'two',
      sections: [
        section('Imanência', 'Golpes causam +2 de espírito por dado de arma.'),
        section(
          'Golpe do Espírito Fluente',
          'Dois Golpes no mesmo alvo com a Lâmina Reluzente (MAP atual; −2 no segundo se a arma não for ágil). Se ambos acertam, some o dano como espírito; precisão só uma vez; resistências/fraquezas uma vez. Conta como 2 ataques no MAP.',
          'two',
        ),
      ],
    }),
    catalogOption({
      id: 'ikon-hands-of-the-wildling',
      name: 'Mãos do Selvagem',
      originalName: 'Hands of the Wildling',
      category: 'weapon',
      usage: 'Arma corpo a corpo de mão livre ou Golpe desarmado corpo a corpo',
      sourcePage: 44,
      description: 'Punhos tatuados, garras ou manoplas — cada golpe com fúria animal.',
      rulesSummary:
        'Imanência: +1 espírito de respingo por dado (você é imune). Transcendência: cone de 4,5 m, Reflexos básico vs dano do Golpe em espírito.',
      actionType: 'two',
      sections: [
        section(
          'Imanência',
          '+1 de espírito de respingo por dado de arma. Você é imune a esse respingo.',
        ),
        section(
          'Balanço Feral',
          'Cada criatura num cone de 4,5 m: Reflexos básico vs CD de classe ou dano de espírito igual ao seu Golpe normal com este ícone. Pode golpear sem controle: −2 de circunstância nos saves dos inimigos, mas você fica desprevenido até o próximo turno.',
          'two',
        ),
      ],
    }),
    catalogOption({
      id: 'ikon-mortal-harvest',
      name: 'Colheita Mortal',
      originalName: 'Mortal Harvest',
      category: 'weapon',
      usage: 'Foice, ou arma dos grupos machado, mangual ou haste',
      sourcePage: 45,
      description: 'Antes derrubava árvores ou safras. Agora colhe vidas.',
      rulesSummary:
        'Imanência: espírito persistente = 1 por dado. Transcendência: Distanciar metade + Golpe em outro alvo, mesmo MAP.',
      actionType: 'one',
      sections: [
        section(
          'Imanência',
          'Golpes causam 1 de espírito persistente por dado de arma.',
        ),
        section(
          'Ceifar o Campo',
          'Requer Golpe bem-sucedido com a Colheita na ação anterior. Distanciar até metade do Deslocamento e Golpear outra criatura. Usa o mesmo MAP do Golpe anterior; conta no MAP normalmente.',
          'one',
        ),
      ],
    }),
    catalogOption({
      id: 'ikon-noble-branch',
      name: 'Ramo Nobre',
      originalName: 'Noble Branch',
      category: 'weapon',
      usage: 'Lança/haste, ou cajado, bō, bastão ou khakkhara',
      sourcePage: 45,
      description: 'Pau simples, golpes confiáveis — sem firula.',
      rulesSummary:
        'Imanência: +2 espírito por dado. Transcendência: o alvo toma espírito igual aos dados da arma (incluindo golpeante).',
      actionType: 'one',
      sections: [
        section('Imanência', 'Golpes causam +2 de espírito por dado de arma.'),
        section(
          'Golpear, Respirar, Dilacerar',
          'Requer Golpe bem-sucedido com o Ramo neste turno. O alvo toma dano de espírito igual aos dados de dano da arma (inclui runas golpeantes; não inclui runas de propriedade nem habilidades extras).',
          'one',
        ),
      ],
    }),
    catalogOption({
      id: 'ikon-shadow-sheath',
      name: 'Bainha das Sombras',
      originalName: 'Shadow Sheath',
      category: 'weapon',
      usage: 'Coldre ou bainha para arma de arremesso de 1 mão e Bulk leve ou menos',
      sourcePage: 45,
      description: 'Cópias infinitas da arma escondida — você nunca fica desarmado.',
      rulesSummary:
        'Carrega 1 arma (1 min). Sacar cópia: Interagir (livre com imanência). +2 espírito por dado (+3 se desprevenido). Transcendência: após falhar, saca e Golpeia de novo (alvo desprevenido).',
      actionType: 'one',
      sections: [
        section(
          'Imanência',
          'Sacar da bainha é ação livre. Golpes com a cópia: +2 espírito por dado (+3 se o alvo está desprevenido). Cópias somem ao sair da mão.',
        ),
        section(
          'Lâmina Oculta do Mentiroso',
          'Requer Golpe malsucedido com a arma da bainha. Saca outra cópia e Golpeia com o mesmo MAP; o alvo fica desprevenido a este ataque. Depois pode sacar de novo.',
          'one',
        ),
      ],
    }),
    catalogOption({
      id: 'ikon-starshot',
      name: 'Tiro Estelar',
      originalName: 'Starshot',
      category: 'weapon',
      usage: 'Arma à distância',
      sourcePage: 46,
      description: 'Disparos como estrelas caindo.',
      rulesSummary:
        'Imanência: +1 espírito de respingo por dado. Transcendência: explosão de 1,5 m a até 18 m; Reflexos básico; criaturas maiores que você −2 no save.',
      actionType: 'two',
      sections: [
        section(
          'Imanência',
          'Golpes causam +1 de espírito de respingo por dado de arma.',
        ),
        section(
          'Cometa que Derruba Gigantes',
          'Explosão de 1,5 m a até 18 m. Reflexos básico vs CD de classe ou dano de espírito igual ao Golpe normal. Criaturas maiores que você: −2 de circunstância no save. Gasta munição normal.',
          'two',
        ),
      ],
    }),
    catalogOption({
      id: 'ikon-titans-breaker',
      name: 'Quebra-Titãs',
      originalName: "Titan's Breaker",
      category: 'weapon',
      usage: 'Arma corpo a corpo dos grupos clava, martelo ou machado, ou desarmado concussão',
      sourcePage: 46,
      description: 'Golpes que fariam montanha virar pó.',
      rulesSummary:
        'Imanência: +2 espírito por dado; fura Dureza de construto/objeto = seu nível. Transcendência: 1 Golpe (conta 2 no MAP) com espírito extra e dados extras se acertar.',
      actionType: 'two',
      sections: [
        section(
          'Imanência',
          '+2 de espírito por dado. Construtos e objetos não são imunes; o espírito ignora Dureza igual ao seu nível.',
        ),
        section(
          'Fraturar Montanhas',
          'Um Golpe corpo a corpo (conta como 2 ataques no MAP). Se acertar, o espírito da imanência sobe para 4 + 1 dado extra de arma (6 + 2 dados no 10º; 8 + 3 dados no 18º).',
          'two',
        ),
      ],
    }),
    catalogOption({
      id: 'ikon-unfailing-bow',
      name: 'Arco Infalível',
      originalName: 'Unfailing Bow',
      category: 'weapon',
      usage: 'Arma à distância',
      sourcePage: 47,
      description: 'O tiro parece guiado — acha até o alvo mais rápido.',
      rulesSummary:
        'Imanência: +1 espírito por dado (+1d4 por dado no crítico). Transcendência: repete o d20 do Golpe anterior no mesmo alvo.',
      actionType: 'one',
      sections: [
        section(
          'Imanência',
          '+1 de espírito por dado de arma, ou +1d4 por dado num crítico.',
        ),
        section(
          'Flecha Parte Flecha',
          'Requer Golpe com o Arco Infalível na ação anterior. Golpeia o mesmo alvo: o d20 é o mesmo do tiro anterior (penalidades do MAP valem; 1 e 20 naturais não ajustam sozinhos o grau).',
          'one',
        ),
      ],
    }),
    catalogOption({
      id: 'ikon-bands-of-imprisonment',
      name: 'Faixas do Cárcere',
      originalName: 'Bands of Imprisonment',
      category: 'worn',
      usage: 'Tornozeleiras, braceletes ou diadema (muitas vezes faixa de cabeça)',
      sourcePage: 43,
      description: 'Não aumentam a força — a contêm, afiando a disciplina.',
      rulesSummary:
        'Imanência: +1 de status em Vontade; resistência mental = metade do nível. Transcendência: Escapar (+2) + Distanciar 2× em linha + Golpe corpo a corpo.',
      actionType: 'two',
      sections: [
        section(
          'Imanência',
          '+1 de status em salvaguardas de Vontade e resistência a dano mental igual à metade do seu nível.',
        ),
        section(
          'Romper as Amarras',
          'Pode tentar Escapar com +2 de status, depois Distanciar até o dobro do Deslocamento em linha reta, depois um Golpe corpo a corpo. Se não precisar Escapar ou não puder se mover, ainda faz o resto.',
          'two',
        ),
      ],
    }),
    catalogOption({
      id: 'ikon-fetching-bangles',
      name: 'Pulseiras Cativantes',
      originalName: 'Fetching Bangles',
      category: 'worn',
      usage: 'Braceletes vestidos',
      sourcePage: 44,
      description: 'Brilham com o seu magnetismo.',
      rulesSummary:
        'Imanência: aura 3 m — inimigo que tenta se afastar: Vontade vs CD ou a ação de movimento é interrompida. Transcendência: puxa 1 inimigo a 6 m para adjacente (Vontade).',
      actionType: 'one',
      sections: [
        section(
          'Imanência',
          'Aura de 3 m (mental). Inimigo na aura que tenta se afastar de você: Vontade vs CD de classe ou a ação de movimento é interrompida.',
        ),
        section(
          'Abraço do Destino',
          'Escolha 1 inimigo a até 6 m. Vontade vs CD de classe ou é puxado para um espaço adjacente a você.',
          'one',
        ),
      ],
    }),
    catalogOption({
      id: 'ikon-horn-of-plenty',
      name: 'Cornucópia',
      originalName: 'Horn of Plenty',
      category: 'worn',
      usage: 'Bolsa, cabaça ou recipiente de 1 Bulk vestido',
      sourcePage: 44,
      description: 'Colheita e lar: guarda poções e elixires (até 1 Bulk).',
      rulesSummary:
        'Nas preparações: 1 elixir da vida temporário (2 no 8º, 3 no 16º) ou outras fórmulas que você conheça. Imanência: sacar e beber em 1 ação. Transcendência: o efeito vai para um aliado a 18 m.',
      actionType: 'one',
      sections: [
        section(
          'Imanência',
          'Interagir para sacar um consumível e beber numa só ação. Outros só acessam se você deixar.',
        ),
        section(
          'Alimentar as Massas',
          'Saca e bebe um consumível da cornucópia; o efeito vai para um aliado disposto a até 18 m. Se curar PV, você pode dividir o valor entre vocês dois.',
          'one',
        ),
      ],
    }),
    catalogOption({
      id: 'ikon-mirrored-aegis',
      name: 'Égide Espelhada',
      originalName: 'Mirrored Aegis',
      category: 'worn',
      usage: 'Qualquer escudo',
      sourcePage: 45,
      description: 'Polido a ponto de refletir até ataques espirituais.',
      rulesSummary:
        'Imanência: aura 4,5 m, +1 de status na CA (você e aliados); 10 min com a faísca restaura os PV do escudo. Transcendência: +1 CA/Reflexos/saves vs força, espírito, vitalidade ou vazio por 1 min (você + 1 aliado).',
      actionType: 'one',
      sections: [
        section(
          'Imanência',
          'Aura de 4,5 m: +1 de status na CA para você e aliados. Se a faísca ficar 10 min ininterruptos no escudo, ele volta aos PV máximos.',
        ),
        section(
          'Erguer os Muros',
          'Ergue a égide e cria escudos etéreos em você e 1 aliado a 4,5 m: +1 de status em CA, Reflexos e salvaguardas vs efeitos de força, espírito, vitalidade ou vazio por 1 minuto.',
          'one',
        ),
      ],
    }),
    catalogOption({
      id: 'ikon-pelt-of-the-beast',
      name: 'Pele da Fera',
      originalName: 'Pelt of the Beast',
      category: 'worn',
      usage: 'Manto ou cinto vestido',
      sourcePage: 45,
      description: 'Couro de animal: o bastante para sobreviver ao pior clima.',
      rulesSummary:
        'Nas preparações: escolha frio, eletricidade, fogo, veneno ou sônico. Imanência: resistência = metade do nível; calor/frio ambiental 1 passo mais brando. Transcendência: aura 4,5 m, +2 CA e saves vs aquele traço.',
      actionType: 'one',
      sections: [
        section(
          'Imanência',
          'Resistência igual à metade do nível ao tipo habituado. Trata calor e frio ambientais como 1 passo menos severos.',
        ),
        section(
          'Sobreviver aos Ermos',
          'Pode trocar o tipo habituado. Até o próximo turno, aura de 4,5 m: você e aliados ganham +2 de circunstância em CA e salvaguardas vs efeitos com aquele traço.',
          'one',
        ),
      ],
    }),
    catalogOption({
      id: 'ikon-skybearers-belt',
      name: 'Cinto do Céu',
      originalName: "Skybearer's Belt",
      category: 'worn',
      usage: 'Cinto vestido',
      sourcePage: 46,
      description: 'Força de quem carregaria o céu.',
      rulesSummary:
        'Imanência: Desarmar/Agarrar/Empurrar/Derrubar até 2 tamanhos maiores; +1 de circunstância nesses testes e nos saves contra eles. Transcendência: Distanciar carregando aliados adjacentes.',
      actionType: 'two',
      sections: [
        section(
          'Imanência',
          'Pode Desarmar, Agarrar, Empurrar ou Derrubar criaturas até 2 tamanhos maiores. +1 de circunstância nesses testes e nos saves para resistir a essas manobras.',
        ),
        section(
          'Carregar os Fardos',
          'Distanciar (ou Escalar/Voar/Nadar se tiver o deslocamento). Durante o movimento, pode pegar aliados dispostos adjacentes e deixá-los em outro espaço adjacente. Ignora o Bulk deles nesse Distanciar.',
          'two',
        ),
      ],
    }),
    catalogOption({
      id: 'ikon-thousand-league-sandals',
      name: 'Sandálias das Mil Léguas',
      originalName: 'Thousand-League Sandals',
      category: 'worn',
      usage: 'Calçados vestidos',
      sourcePage: 46,
      description: 'Surradas, mas ainda vão longe.',
      rulesSummary:
        'Imanência: +3 m de status no Deslocamento. Transcendência: você Distanciar; aliados a 3 m no início podem Distanciar como reação.',
      actionType: 'one',
      sections: [
        section(
          'Imanência',
          '+3 m de bônus de status no Deslocamento.',
        ),
        section(
          'Disparada de Maratona',
          'Você Distanciar. Cada aliado a até 3 m de você no início do movimento pode Distanciar como reação.',
          'one',
        ),
      ],
    }),
    catalogOption({
      id: 'ikon-victors-wreath',
      name: 'Grinalda do Vencedor',
      originalName: "Victor's Wreath",
      category: 'worn',
      usage: 'Cabeça ou cinto (em geral uma faixa)',
      sourcePage: 47,
      description: 'Lembra a você e aos aliados: só vale a vitória.',
      rulesSummary:
        'Imanência: aura 4,5 m, +1 de status nos ataques (você e aliados). Transcendência: cada aliado na aura rerrola 1 save contra efeito negativo contínuo, com +2.',
      actionType: 'one',
      sections: [
        section(
          'Imanência',
          'Aura 4,5 m (emoção, mental): você e aliados ganham +1 de status em jogadas de ataque.',
        ),
        section(
          'Um Instante até a Glória',
          'Cada aliado na aura pode tentar de novo 1 salvaguarda contra um efeito ou condição negativos contínuos que exigiam save, com +2 de status. Usa o melhor resultado. Cada aliado só se beneficia 1× por efeito.',
          'one',
        ),
      ],
    }),
    catalogOption({
      id: 'ikon-eye-catching-spot',
      name: 'Marca que Prende o Olhar',
      originalName: 'Eye-Catching Spot',
      category: 'body',
      usage: 'Imbuída no rosto',
      sourcePage: 44,
      description: 'Sinal no rosto ou sorriso de sol — distrai e conquista.',
      rulesSummary:
        'Imanência: −1 de circunstância nos ataques corpo a corpo contra você. Transcendência: 1 criatura a 9 m, Vontade ou fascinada até seu próximo turno.',
      actionType: 'two',
      sections: [
        section(
          'Imanência',
          'Inimigos sofrem −1 de circunstância em jogadas de ataque corpo a corpo contra você (mental, visual).',
        ),
        section(
          'Encanto Cativante',
          '1 criatura a até 9 m: Vontade vs CD de classe ou fascinada até o início do seu próximo turno. Ação hostil contra o alvo encerra; contra os aliados dele, não.',
          'two',
        ),
      ],
    }),
    catalogOption({
      id: 'ikon-gaze-sharp-as-steel',
      name: 'Olhar Afiado como Aço',
      originalName: 'Gaze Sharp as Steel',
      category: 'body',
      usage: 'Imbuído nos olhos',
      sourcePage: 44,
      description: 'Enxerga o andorinha no horizonte e a flecha no ar.',
      rulesSummary:
        'Imanência: +1 Percepção; +2 CA vs ataques à distância. Transcendência: próximo Golpe bem-sucedido até o fim do próximo turno: +1d6 precisão (2d6 no 10º, 3d6 no 18º).',
      actionType: 'one',
      sections: [
        section(
          'Imanência',
          '+1 de status em testes de Percepção e +2 de status na CA contra ataques à distância.',
        ),
        section(
          'Um Instante Sem Fim',
          'Seu próximo Golpe bem-sucedido contra um inimigo até o fim do seu próximo turno causa +1d6 de precisão (2d6 no 10º, 3d6 no 18º).',
          'one',
        ),
      ],
    }),
    catalogOption({
      id: 'ikon-scar-of-the-survivor',
      name: 'Cicatriz do Sobrevivente',
      originalName: 'Scar of the Survivor',
      category: 'body',
      usage: 'Imbuída na pele',
      sourcePage: 45,
      description: 'Alguém tentou encerrar a história. Falhou.',
      rulesSummary:
        'Imanência: feito Difícil de Matar + +1 Fortitude. Transcendência: cura 1d8 (+1d8 no 3º e a cada 2 níveis).',
      actionType: 'one',
      sections: [
        section(
          'Imanência',
          'Ganha os benefícios do feito Difícil de Matar e +1 de status em Fortitude.',
        ),
        section(
          'Nenhuma Cicatriz Além Desta',
          'Recupera 1d8 PV. No 3º e a cada 2 níveis, +1d8.',
          'one',
        ),
      ],
    }),
    catalogOption({
      id: 'ikon-skin-hard-as-horn',
      name: 'Pele Dura como Chifre',
      originalName: 'Skin Hard as Horn',
      category: 'body',
      usage: 'Imbuída na pele',
      sourcePage: 46,
      description:
        'A pele vira armadura — um ponto desprotegido permanece, desafio da lenda.',
      rulesSummary:
        'Nas preparações: habitue-se a concussão, corte ou perfuração. Imanência: resistência = metade do nível (não no crítico). Transcendência: resistência = nível; quem erra ou zera o dano fica desprevenido e −2 naquela arma.',
      actionType: 'one',
      sections: [
        section(
          'Imanência',
          'Resistência ao tipo habituado igual à metade do nível. Não vale em acertos críticos.',
        ),
        section(
          'Choquem-se Contra Mim',
          'Até o próximo turno, resistência igual ao nível. Se um inimigo atacar com o mesmo tipo e errar (ou o dano cair a 0 pela resistência), fica desprevenido e sofre −2 de circunstância nos ataques com aquela arma até o início do turno dele.',
          'one',
        ),
      ],
    }),
  ].map((o) => ({ ...o, sourceId: SRC })),
}

export const exemplarEpithetCatalog: ClassCatalogDefinition = {
  id: 'exemplar-epithets',
  classId: CLASS_EXEMPLAR_ID,
  label: 'Epítetos',
  originalName: 'Epithets',
  description:
    'A lenda que cola. Raiz no 3º (perícia + efeito ao Acender Transcendência). Domínio no 7º. Soberania no 15º. Só 1 efeito de epíteto por Acender. Epítetos de AP ficam de fora.',
  kind: 'progression',
  unique: true,
  pickMode: 'perCategory',
  slotsByLevel: [
    { minLevel: 3, count: 1 },
    { minLevel: 7, count: 2 },
    { minLevel: 15, count: 3 },
  ],
  picksPerCategory: [
    { category: 'root', minLevel: 3, count: 1 },
    { category: 'dominion', minLevel: 7, count: 1 },
    { category: 'sovereignty', minLevel: 15, count: 1 },
  ],
  categoryMinLevel: { root: 3, dominion: 7, sovereignty: 15 },
  categoryLabels: {
    root: 'Raiz (3º)',
    dominion: 'Domínio (7º)',
    sovereignty: 'Soberania (15º)',
  },
  searchPlaceholder: 'Buscar epíteto…',
  emptyHint: 'Os epítetos começam no 3º nível.',
  options: [
    catalogOption({
      id: 'epithet-the-brave',
      name: 'o Bravo',
      originalName: 'The Brave',
      category: 'root',
      level: 3,
      skillId: 'athletics',
      sourcePage: 31,
      description: 'Quando a fera aparece, você já está na frente.',
      rulesSummary:
        'Treinado em Atletismo. Após Acender: Distanciar metade em linha reta rumo a 1 inimigo (livre). 1× por inimigo a cada 10 min.',
    }),
    catalogOption({
      id: 'epithet-the-cunning',
      name: 'o Astuto',
      originalName: 'The Cunning',
      category: 'root',
      level: 3,
      skillId: 'deception',
      sourcePage: 31,
      description: 'Vitória de esperteza ecoa mais que força bruta.',
      rulesSummary:
        'Treinado em Enganação. Após Acender: Criar Distração ou Fintar como ação livre.',
    }),
    catalogOption({
      id: 'epithet-the-deft',
      name: 'o Hábil',
      originalName: 'The Deft',
      category: 'root',
      level: 3,
      skillId: 'thievery',
      sourcePage: 31,
      description: 'Pés de vendaval, dedos de brisa.',
      rulesSummary:
        'Treinado em Ladroagem. Após Acender: Furtar ou Palmear. Também pode Interagir (livre) para recarregar/sacar ícone de arma (recarga ou arremesso de 1 mão), antes ou depois da transcendência.',
    }),
    catalogOption({
      id: 'epithet-the-mournful',
      name: 'o Lamentoso',
      originalName: 'The Mournful',
      category: 'root',
      level: 3,
      skillId: 'diplomacy',
      sourcePage: 32,
      description: 'Carrega sonhos de quem caiu para os outros viverem sorrindo.',
      rulesSummary:
        'Treinado em Diplomacia. Após Acender: 1 inimigo a 9 m que viu o ato fica ofuscado até seu próximo turno (emoção, mental). Imune 10 min.',
    }),
    catalogOption({
      id: 'epithet-the-proud',
      name: 'o Orgulhoso',
      originalName: 'The Proud',
      category: 'root',
      level: 3,
      skillId: 'intimidation',
      sourcePage: 32,
      description: 'Convida o desafio — glória ou proteção dos seus.',
      rulesSummary:
        'Treinado em Intimidação. Após Acender: 1 inimigo a 9 m. Até seu próximo turno: −1 contra os outros, +1 contra você (ataques, dano e perícias). Auditivo, emoção, mental, linguístico.',
    }),
    catalogOption({
      id: 'epithet-the-radiant',
      name: 'o Radiante',
      originalName: 'The Radiant',
      category: 'root',
      level: 3,
      skillId: 'diplomacy',
      sourcePage: 32,
      description: 'Brilha o bastante para puxar séquito e mudar reino.',
      rulesSummary:
        'Treinado em Diplomacia. Após Acender: 1 aliado a 9 m recupera PV = 2 + dobro do nível (mental, emoção). Imune 10 min.',
    }),
    catalogOption({
      id: 'epithet-born-of-the-bones',
      name: 'Nascido dos Ossos da Terra',
      originalName: 'Born of the Bones of the Earth',
      category: 'dominion',
      level: 7,
      sourcePage: 33,
      description: 'Pedra e solo — o palco das lendas.',
      rulesSummary:
        'Feito Faísca Energizada (terra ou fogo). Crítico em alvo no chão de terra/pedra: imobilizado (Escapar vs CD). Ao Acender no chão: pode rachar emanação de 3 m (terreno difícil; você ignora).',
    }),
    catalogOption({
      id: 'epithet-dancer-in-the-seasons',
      name: 'Dançarino das Estações',
      originalName: 'Dancer in the Seasons',
      category: 'dominion',
      level: 7,
      sourcePage: 33,
      description: 'Floresce, folga, dá e toma — o ano inteiro.',
      rulesSummary:
        'Faísca Energizada (frio, fogo, vazio ou madeira). Crítico: Passo livre (a estação gira). Ao Acender: PV temporários = metade do nível até o próximo turno.',
    }),
    catalogOption({
      id: 'epithet-of-verse-unbroken',
      name: 'De Verso Ininterrupto',
      originalName: 'Of Verse Unbroken',
      category: 'dominion',
      level: 7,
      sourcePage: 33,
      description: 'A arte é o que faz a luta valer.',
      rulesSummary:
        'Faísca Energizada (sônico ou vitalidade). Crítico: alvo estupefato 1 (Vontade). Ao Acender: até o próximo turno, aliado a 9 m pode Sustentar 1 efeito com um zumbido (livre no início do turno dele; 1× / 10 min).',
    }),
    catalogOption({
      id: 'epithet-peerless-under-heaven',
      name: 'Sem Igual sob o Céu',
      originalName: 'Peerless under Heaven',
      category: 'dominion',
      level: 7,
      sourcePage: 33,
      description: 'Deuses guerreiam. Você quer o topo da pilha.',
      rulesSummary:
        'Crítico: especialização crítica do grupo da arma (ou efeito da runa atroz se já tinha). Ao Acender: 1 inimigo a 9 m, Vontade ou amedrontado 1. Imune 10 min.',
    }),
    catalogOption({
      id: 'epithet-restless-as-the-tides',
      name: 'Inquieto como as Marés',
      originalName: 'Restless as the Tides',
      category: 'dominion',
      level: 7,
      sourcePage: 33,
      description: 'O oceano dá vida e a toma.',
      rulesSummary:
        'Faísca Energizada (água ou frio). Crítico: respingo de concussão = dados de arma (alvo e a 3 m). Ao Acender: Passo, ou empurra 1,5 m o inimigo afetado (Fortitude).',
    }),
    catalogOption({
      id: 'epithet-whose-cry-is-thunder',
      name: 'Cujo Grito é Trovão',
      originalName: 'Whose Cry is Thunder',
      category: 'dominion',
      level: 7,
      sourcePage: 33,
      description: 'O céu obedece; o raio mora na alma.',
      rulesSummary:
        'Faísca Energizada (eletricidade ou sônico). Crítico: Fortitude ou cai e fica surdo 1 min. Ao Acender: pode carregar-se — quem te toca ou te acerta corpo a corpo sem alcance toma 1d6 de eletricidade até o próximo turno.',
    }),
    catalogOption({
      id: 'epithet-healer-of-the-world',
      name: 'Curador do Mundo',
      originalName: 'Healer of the World',
      category: 'sovereignty',
      level: 15,
      sourcePage: 34,
      description: 'A lenda está nas vidas que você salva.',
      rulesSummary:
        'Após Acender: criaturas dispostas ou inconscientes numa emanação de 9 m. Morrendo: perdem morrendo e ficam a 0 PV. As outras: 10 PV temporários até seu próximo turno. Vitalidade, cura.',
    }),
    catalogOption({
      id: 'epithet-teacher-of-heroes',
      name: 'Mestre de Heróis',
      originalName: 'Teacher of Heroes',
      category: 'sovereignty',
      level: 15,
      sourcePage: 34,
      description: 'Ser lembrado nos que um dia vão te superar.',
      rulesSummary:
        'Após Acender: Recordar Conhecimento (livre) sobre 1 inimigo visível e transmite aos aliados a 18 m. A 1ª informação é sempre imunidades (senão maior resistência, senão maior fraqueza, senão pior salvaguarda).',
    }),
    catalogOption({
      id: 'epithet-the-last-ruler',
      name: 'o Último Soberano',
      originalName: 'The Last Ruler',
      category: 'sovereignty',
      level: 15,
      sourcePage: 34,
      description: 'Monarca ou deus — a presença de todos os reis.',
      rulesSummary:
        'Após Acender: até o próximo turno, se um inimigo falhar num ataque contra você, pode Coagir (Intimidação) como livre.',
    }),
    catalogOption({
      id: 'epithet-thief-of-moonlight',
      name: 'Ladrão do Luar',
      originalName: 'Thief of Moonlight',
      category: 'sovereignty',
      level: 15,
      sourcePage: 34,
      description: 'Histórias em voz baixa. Até as luzes do céu não estão seguras.',
      rulesSummary:
        'Após Acender: Palmear ou Furtar (livre) de um inimigo a até 9 m. O objeto some e reaparece na sua mão.',
    }),
  ].map((o) => ({ ...o, sourceId: SRC })),
}
