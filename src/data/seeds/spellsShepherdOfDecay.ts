import type { Spell } from '@/types/spell'
import { SOURCE_SHEPHERD_OF_DECAY_ID } from './sources'

/**
 * Magias Remaster de Pathfinder #203 Shepherd of Decay.
 * Sem legado. Resumos curtos em pt-BR — o texto completo está no livro / AoN.
 */
export const shepherdOfDecaySpells: Spell[] = [
  {
    id: 'spell-bramble-bush',
    name: 'Arbusto de Espinhos',
    originalName: 'Bramble Bush',
    rank: 0,
    traditions: ['arcane', 'primal'],
    traits: ['Cantrip', 'Concentrate', 'Manipulate', 'Plant', 'Wood'],
    rarity: 'uncommon',
    provenance: { type: 'official' },
    actionType: 'two',
    summary:
      'Cubo de 1,5 m a 9 m: 1d4 perfurante (Reflexos básico), depois terreno difícil e perigoso até o seu próximo turno. Altura +2: +1d4 inicial e no terreno.',
    description: "Num súbito surto de crescimento, você faz com que um arbusto espinhoso brote do chão, chicoteie e murche. Qualquer criatura na área sofre 1d4 dano perfurante com Reflexos básicos salvaguardas.\n\nAté o início do seu próximo turno, a área é terreno difícil e terreno perigoso. Qualquer criatura que entrar no quadrado sofre 1d4 dano perfurante com Reflexos básicos salvaguardas.\n\n**Altura (+2)** O dano inicial aumenta em 1d4, e o dano causado por terreno perigoso aumenta em 1.",
    area: "cubo de 1,5 m",
    range: "9 m",
    aonUrl: 'https://2e.aonprd.com/Spells.aspx?ID=2444',
    sourceId: SOURCE_SHEPHERD_OF_DECAY_ID,
  },
  {
    id: 'spell-reed-whistle',
    name: 'Apito de Junco',
    originalName: 'Reed Whistle',
    rank: 1,
    traditions: ['arcane', 'occult', 'primal'],
    traits: ['Concentrate', 'Manipulate', 'Plant', 'Wood'],
    rarity: 'uncommon',
    provenance: { type: 'official' },
    actionType: 'two',
    summary:
      'Encanta um fio de grama na boca. Reação: gasta 1 h de duração para Apontar uma criatura detectada; você e aliados +2 circunstância em Percepção para Procurá-la por 1d4 rodadas. Altura 3º: duração 4 h.',
    description: "Você encanta uma folha de grama que pode facilmente segurar na boca sem inibir sua fala ou outras ações. Como reação, você pode reduzir a duração restante da magia em 1 hora para apontar uma criatura que você detecta enquanto assobia bruscamente através do junco. Você e seus aliados também ganham +2 de bônus de circunstância em testes de Percepção para Procurar a criatura por rodadas 1d4.\n\n**Altura (3º)** A duração da magia passa a ser de 4 horas.",
    duration: "1 hora ou até esgotar",
    aonUrl: 'https://2e.aonprd.com/Spells.aspx?ID=2447',
    sourceId: SOURCE_SHEPHERD_OF_DECAY_ID,
  },
  {
    id: 'spell-conjured-conveyance',
    name: 'Condução Conjurada',
    originalName: 'Conjured Conveyance',
    rank: 3,
    traditions: ['arcane', 'primal'],
    traits: ['Concentrate', 'Manipulate', 'Plant', 'Wood'],
    rarity: 'uncommon',
    provenance: { type: 'official' },
    actionType: 'three',
    summary:
      'Alcance 9 m, 1 hora. Skiff Grande, carroça Grande ou ciclo Médio de madeira. Pilotar com Arcana, Conhecimento de Direção ou Natureza (CD = CD de magia). Altura +1: CA/Fort +2, Dureza +1, PV +20, colisão +1d6, +1 h.',
    description: "Você invoca um veículo complexo, esculpido inteiramente em madeira, para servir como método de transporte. O veículo aparece em uma área desocupada de sua escolha dentro do alcance. O veículo pode ser pilotado utilizando Arcanismo, Driving Lore ou Natureza teste de perícias. A CD para pilotar o veículo e a CD da colisão do veículo são iguais ao seu CD de magia. As demais estatísticas do veículo são apresentadas a seguir.\n\nAo Conjurar esta Magia, escolha se deseja criar um esquife grande, uma carroça grande ou uma bicicleta média. Com a permissão do Mestre, você pode invocar um veículo diferente de sua escolha com nível máximo de 1; este veículo deve ser feito principalmente de matéria vegetal, ter raridade comum e ser Grande ou menor.\n\n**Equife Grande — Espaço** 4,5 m de comprimento, 1,5 m de largura, 1 m de altura; **Tripulação** 1 piloto; **Passageiros** 3; **Deslocamento nado** 9 m (mágico)\n**Vagão Grande—Espaço** 3 m de comprimento, 3 m de largura, 2 m de altura; **Tripulação** 1 piloto; **Passageiros** 3; **Deslocamento** 10,5 m (mágico)\n**Ciclo Médio – Espaço** 1,5 m de comprimento, 1 m de largura, 1 m de altura; **Tripulação** 1 piloto; **Passageiros** 0; **Deslocamento** 12 m (mágico)\n**CA** 13; **Fortitude** +8\n**Dureza** 5, PV 40 (BT 20); **Imunidades** acertos críticos, imunidades a objetos, dano de precisão; **Fraquezas** fogo 5, corte 5\n**Colisão** 2d6\n\n**Altura (+1)** O CA do veículo aumenta em 2, o bônus de Fortitude aumenta em 2, a Dureza aumenta em 1, o PV aumenta em 20 e o dano de colisão aumenta em 1d6. Além disso, o nível máximo de veículo que você pode convocar com permissão do GM aumenta em 2. A duração aumenta em 1 hora.",
    duration: "1 hora",
    range: "9 m",
    aonUrl: 'https://2e.aonprd.com/Spells.aspx?ID=2445',
    sourceId: SOURCE_SHEPHERD_OF_DECAY_ID,
  },
  {
    id: 'spell-cordyceps-command',
    name: 'Comando de Cordyceps',
    originalName: 'Cordyceps Command',
    rank: 3,
    traditions: ['primal'],
    traits: ['Concentrate', 'Fungus', 'Incapacitation', 'Manipulate', 'Poison'],
    rarity: 'uncommon',
    provenance: { type: 'official' },
    actionType: 'two',
    summary:
      'Alcance 9 m, Fortitude. Escolha subir, consumir, descer ou atrair. Falha: toxina estágio 1; falha crítica: estágio 2. Estágio 3: controlado com o comportamento. (Ação não impressa no livro; Concentrate + Manipulate.)',
    description: "_Nethys Note: This spell was not printed with an action type._\n\nVocê evoca um grão de esporos de cordyceps adaptados exclusivamente ao alvo antes de acertá-los. Ao Conjurar esta Magia, escolha um dos seguintes comportamentos que o fungo obriga: subir, consumir, descer ou atrair. Embora o alvo seja controlado pelos efeitos do estágio 3 da toxina cordyceps, ele executa esse comportamento. Este controle pode incluir comportamento arriscado (como descer um penhasco precário ou tecer entre inimigos armados), mas não obriga ações letais diretas (como pular do topo do mesmo penhasco). Se o comportamento levar diretamente a danos (como cair de um penhasco) ou ações hostis (como ser atacado por criaturas que agora podem alcançar a criatura que desce), o alvo ganha um bônus de +4 em suas próximas salvaguardas contra o veneno.\n\n**Ascender:** A criatura tenta alcançar altitudes mais altas por qualquer meio razoável, como escalar, procurar escadas ou até mesmo empilhar detritos para pular em uma tentativa de chegar o mais alto possível.\n\n**Consumir:** A criatura come ou bebe avidamente tudo o que está por perto, usando ações para sacar e consumir elixires, comida ou outros itens consumíveis. Se a criatura tiver um Golpe de mandíbulas, um Golpe de presas ou um Golpe desarmado semelhante, a criatura pode, em vez disso, perseguir e usar esse Golpe contra alvos comestíveis. Se nenhum outro alimento ou bebida estiver acessível, a criatura tenta roubar ou procurar nutrição nas proximidades.\n\n**Descer:** A criatura tenta alcançar altitudes mais baixas por qualquer meio razoável, como escalar, descer enquanto voa ou até mesmo cair e tentar se enterrar no chão.\n\n**Atrair:** A criatura se move em direção a um local exposto e tenta chamar a atenção dos espectadores, como gesticulando, atuando ou acendendo fontes de luz. O alvo fica desprevenido enquanto controlado desta forma.\n\n**Sucesso** O alvo não é afetado.\n**Falha** O alvo é afetado pela toxina cordyceps no estágio 1.\n**Falha crítica** O alvo é afetado pela toxina cordyceps no estágio 2.\n\n**Toxina Cordyceps** (veneno) **Jogo de Resistência** Fortitude CD 28; **Duração Máxima** 6 rodadas; **Etapa 1** aturdido 1 (1 rodada); **Etapa 2** confusão (1 rodada); **Estágio 3** controlado (1 rodada)",
    range: "9 m",
    aonUrl: 'https://2e.aonprd.com/Spells.aspx?ID=2446',
    sourceId: SOURCE_SHEPHERD_OF_DECAY_ID,
  },
  {
    id: 'spell-boomerang-shot',
    name: 'Tiro Bumerangue',
    originalName: 'Boomerang Shot',
    rank: 5,
    traditions: ['arcane', 'primal'],
    traits: ['Concentrate', 'Manipulate', 'Plant', 'Wood'],
    rarity: 'uncommon',
    provenance: { type: 'official' },
    actionType: 'two',
    summary:
      'Alcance 30 m, 1 criatura. Ataque de magia: 7d10 concussão; ignora oculto e cobertura (exceto cobertura maior). Altura 7º: 9d10. 9º: 12d10 e ignora cobertura por completo.',
    description: "Você lança um pedaço curvo de madeira em um inimigo que contorna objetos e obstáculos para atacar de uma direção inesperada. Faça uma rolagem de ataque de magia contra o CA do alvo. Este ataque ignora a condição oculta do alvo e ignora toda a cobertura, exceto a cobertura maior. Se acertar, o projétil causa 7d10 dano de concussão.\n\n**Altura (7º)** O dano aumenta para 9d10.\n\n**Altura (9º)** O dano aumenta para 12d10, e o ataque ignora completamente a cobertura.",
    targets: "1 criatura",
    range: "30 m",
    aonUrl: 'https://2e.aonprd.com/Spells.aspx?ID=2443',
    sourceId: SOURCE_SHEPHERD_OF_DECAY_ID,
  },
]
