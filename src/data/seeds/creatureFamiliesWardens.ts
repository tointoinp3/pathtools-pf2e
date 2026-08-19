import type { CreatureFamily } from '@/types/creature'

function fam(
  partial: Omit<CreatureFamily, 'source'> & { source?: string },
): CreatureFamily {
  return { source: partial.source ?? 'Pathfinder #202: Severed at the Root', ...partial }
}

/**
 * Famílias AoN Monster Families de Wardens of Wildwood (#201–203).
 * Asides = barras laterais oficiais da página da família. Sem blurb de membro.
 */
export const catalogCreatureFamiliesWardens: CreatureFamily[] = [
  fam({
    id: 'family-blight-bonded',
    name: 'Ligado à Praga',
    originalName: 'Blight Bonded',
    trait: null,
    source: 'Pathfinder #203 Shepherd of Decay',
    sourcePage: 80,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=555',
    intro:
      'O Plano da Madeira contém muitos ecossistemas únicos formados em torno de espécies de árvores maravilhosas; quando a Praga de Ayrzul muta uma dessas árvores em vez de matá-la, o efeito pode se espalhar pelo bioma inteiro. Várias espécies costumam mutar juntas, tornando-se imitações distorcidas e um vetor da Praga de Ayrzul. Essas famílias de criaturas “ligadas à praga” são parasitas e predadoras e em geral formam relações simbióticas torcidas.',
    sections: [
      {
        id: 'other-blight-bonds',
        title: 'Outros Laços de Praga',
        body: 'Os bordos que escorrem vazam seiva tóxica que transforma regiões inteiras em ermos pantanosos onde prosperam as garças-ceifadoras de muitas cabeças. As garças usam os bicos em foice para eviscerar a presa e alimentar as entranhas aos bordos, garantindo a produção do limo viscoso com que nutrem os filhotes.',
      },
    ],
  }),
  fam({
    id: 'family-eyelet',
    name: 'Eyelet',
    originalName: 'Eyelet',
    trait: null,
    source: 'Pathfinder #202: Severed at the Root',
    sourcePage: 82,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=552',
    intro:
      'Eyelets são criaturas minúsculas parecidas com morcegos, com asas de sombra e sensores mágicos de vidência embutidos no torso. Usam esses sensores semelhantes a olhos para gravar eventos próximos, ganhando sustento no processo.',
    sections: [
      {
        id: 'scrying-station',
        title: 'Estação de Vidência',
        body: 'Eyelets vivem em bandos, aninhando-se numa estação de vidência central por segurança e camaradagem. Nessas estações, os eventos que testemunham são armazenados e vistos, e os sensores de vidência dos eyelets são apagados. Eyelets selvagens em geral usam prédios abandonados ou sistemas de cavernas abrigadas como estações de vidência.',
      },
    ],
  }),
  fam({
    id: 'family-woodblessed',
    name: 'Abençoado da Madeira',
    originalName: 'Woodblessed',
    trait: null,
    source: 'Pathfinder #202: Severed at the Root',
    sourcePage: 85,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=553',
    intro:
      'Abençoados da madeira são aqueles a quem foi concedida energia incontrolável extraída do Plano da Madeira — uma bênção que traz dor e morte eventual.\n\nTodos os abençoados da madeira ganham as seguintes habilidades.\n\n**Fim Explosivo** (primordial, madeira) Quando o abençoado da madeira morre, o portal planar dentro dele entra em colapso, fazendo-o explodir num estouro de 6 m de cipós que infligem 1d6 de dano de concussão por nível a todas as criaturas, com uma salvaguarda básica de Reflexos contra a CD de magia do abençoado da madeira. O corpo é completamente consumido, embora a rede de raízes e o equipamento permaneçam.\n\n**Aura Luminante** (aura, luz) 6 m. A energia planar volátil que corre nas veias do abençoado da madeira preenche a área com luz tênue.\n\n**Magias Inatas Primordiais** Um abençoado da madeira pode conjurar _madeira_ como truque inato primordial.\n\n**Labareda Reativa** **Gatilho** O abençoado da madeira sofre dano de uma criatura no alcance dele; **Efeito** Distraído pela dor, a concentração escorrega e lascas irrompem do corpo enquanto perde temporariamente o controle da energia planar. Tanto a criatura que disparou o gatilho quanto o abençoado da madeira sofrem 1d6 de dano perfurante + 1d6 a cada 2 níveis que o abençoado da madeira tiver, com uma salvaguarda básica de Reflexos contra a CD de magia dele.\n\n**Abrir Portal Planar** (concentração, primordial) O abençoado da madeira fortalece a si mesmo ou o próximo ataque. Se a próxima ação for Andar, é lançado do chão por uma árvore que brota de súbito e o impelindo para frente. Durante esse Deslocamento, tem Deslocamento de voo igual ao Deslocamento. Se não terminar o movimento numa superfície sólida que suporte o peso, cai. Se a próxima ação for um Golpe, o ataque brota espinhos que infligem 1d4 extra de dano de sangramento persistente (1d6 nos níveis 6–12, 1d10 nos níveis 13+).',
    sections: [
      {
        id: 'creating-woodblessed',
        title: 'Criando Abençoados da Madeira',
        body: 'Aplique o seguinte para transformar uma criatura viva em abençoado da madeira.\nAumente o nível, a CA, os modificadores de ataque, as CDs, as salvaguardas e os modificadores de perícia em 1. Ganha o traço madeira, além de vulnerabilidade a fogo e mental com base no nível. Ganha um Golpe à distância de lasca que inflige dano perfurante, está no grupo pancada e tem incremento de distância de 9 m.',
      },
    ],
  }),
  fam({
    id: 'family-woodwarp',
    name: 'Distorcido da Madeira',
    originalName: 'Woodwarp',
    trait: null,
    source: 'Pathfinder #202: Severed at the Root',
    sourcePage: 86,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=554',
    intro:
      'Distorcidos da madeira são monstros mutantes criados quando uma criatura senciente é inundada com energia descontrolada do Plano da Madeira que não consegue controlar. Essa enxurrada de energia planar que consome tudo varre a criatura de dentro para fora e a distorce num híbrido monstruoso de humanoide e planta — uma aberração com traços fisiológicos dos dois, dolorosamente remodelada em algo terrível de se ver.\n\nA forma e os traços de um distorcido da madeira são determinados pelo tamanho da criatura antes da transformação — thrailorns eram Pequenos, e durnólitos eram Médios. Independentemente da aparência, os distorcidos da madeira suportam dor constante da densa rede de raízes que cresce dentro deles, perfurando osso, músculo e órgãos. Essa dor agonizante e total os empurra à violência, fazendo-os atacar tudo ao redor.\n\nEm sua busca por poder absoluto, Ruzadoya Crina-veloz criou um ritual para canalizar de propósito energia do Plano da Madeira em seus seguidores, transformando-os ou numa monstruosidade distorcida da madeira ou num soldado abençoado da madeira de elite conhecido como Escolhido de Ruzadoya. Um foco ritual elaborado de madeira entalhada de Idyllis, uma árvore do Plano da Madeira, serve de foco para esse ritual e de fonte da energia planar. Durante a transformação de um distorcido da madeira, esse foco se funde ao corpo e se torna o ponto de origem da rede de raízes. Distorcidos da madeira criados por tais rituais são mais fáceis de controlar do que os criados por acaso, pois um ritualista experiente pode imprimir a vontade no distorcido durante a transformação. Esses distorcidos servem Ruzadoya como caçadores, sentinelas e tropas de choque violentas.',
    sections: [
      {
        id: 'just-a-name',
        title: 'Só um Nome',
        body: 'Embora distorcidos da madeira tenham nomes próprios, é improvável que membros da Loja da Trama-raiz os descubram. Em vez disso, são chamados por apelidos. Thrailorns são apelidados de “costas-espinho” e durnólitos de “babados-batedores”.',
      },
      {
        id: 'other-woodwarps',
        title: 'Outros Distorcidos da Madeira',
        body: 'Thrailorns e durnólitos não são os únicos tipos de distorcidos da madeira. Criaturas de tamanhos diferentes geram distorcidos diferentes. Sprites, dragonetes fey, jinkins e outras criaturas Minúsculas tornam-se izifaines — distorcidos da madeira sem cabeça, com asas carnosas e um ferrão afiado envolto em pétalas tóxicas. Centauros, minotauros, gigantes e outras criaturas Grandes tornam-se rogoars — distorcidos atléticos de braços musculosos e alongados que lutam corpo a corpo com a presa.',
      },
    ],
  }),
]
