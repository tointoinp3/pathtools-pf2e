import type { Spell } from '@/types/spell'

/**
 * Últimas magias Remaster que não cabiam nas listas de tradição:
 * truque do gelid shard (Treasure Vault Remastered) e magias de War of Immortals.
 * Sem legado. Resumos curtos em pt-BR.
 */
export const remasterRemainderSpells: Spell[] = [
  {
    id: 'spell-frosts-touch',
    name: 'Toque da Geada',
    originalName: "Frost's Touch",
    rank: 0,
    traditions: ['arcane'],
    traits: ['Cantrip', 'Cold'],
    rarity: 'rare',
    provenance: { type: 'official' },
    actionType: 'one',
    summary:
      'O estilhaço gélido suga o calor ao redor numa tentativa inútil de alcançar um frio impossível no Plano Material.',
    description: "Seu _gelid shard_ bebe o calor próximo em uma tentativa fútil de se saciar e atingir um nível de frio gélido inédito no Plano Material. Isso permite que você resfrie uma bebida, torne uma panela quente segura para manusear ou outros efeitos menores semelhantes. Uma vez resfriado, a temperatura do objeto fica sujeita ao ambiente normalmente. Você também pode solidificar a umidade ambiente em um objeto sólido; este objeto temporário é de volume insignificante, feito de gelo não mágico. O objeto parece grosseiro e artificial e é extremamente frágil – não pode ser usado como ferramenta, arma ou componente de magia. Uma vez criado, ele derrete normalmente para o gelo nas condições ambientais.\n\n**Altura (3º)** Você pode criar objetos simples de gelo com até 1 Bulk e de nível não superior a 1. Tais objetos devem ser rígidos. Você só pode criar um objeto por vez; se você criar outro, o objeto anterior derreterá instantaneamente.\n\n**Altura (5º)** Os itens que você cria podem ter até 4 Bulk e 4º nível.\n\n**Altura (7º)** Os itens que você cria podem ter até 8 Bulk e 8º nível.\n\n**Altura (9º)** Os itens que você cria podem ser de até 20 Bulk e 12º nível.",
    targets: "1 objeto",
    range: "9 m",
    aonUrl: 'https://2e.aonprd.com/Spells.aspx?ID=1274',
  },
  {
    id: 'spell-manifest-will',
    name: 'Manifestar Vontade',
    originalName: 'Manifest Will',
    rank: 0,
    traditions: [],
    traits: ['Aura', 'Cantrip', 'Concentrate', 'Hex', 'Subtle', 'Witch'],
    rarity: 'rare',
    provenance: { type: 'official' },
    actionType: 'one',
    summary: 'Libera energia do vínculo quebrado com o patrono.',
    description: "Você libera energia da conexão quebrada com seu patrono. Você está oculto de criaturas além do limite da emanação, mas não pode usar essa ocultação para Esconder-se. Qualquer criatura que comece seu turno na emanação é afetada com base na tradição do seu patrono.\n **Arcano** Energia bruta e fórmulas mágicas circulam ao seu redor. Uma criatura que comece seu turno na emanação ganha fraqueza 1 para dano mágico por 1 rodada.\n **Divino** O poder divino entra em colapso em um ciclo de vida e morte. Um vivo ou criatura morta-viva que inicia seu turno na emanação ganha 2 PV temporariamente por 1 rodada. Este efeito tem o traço espiritual.\n **Oculto** A simbologia esotérica marca o ar. Uma criatura aliada que comece seu turno na emanação terá menos cobertura enquanto estiver dentro da emanação e por 1 rodada após sair.\n **Primal** Plantas e fungos simbólicos de seu patrono crescem e murcham constantemente na emanação. Uma criatura que inicia seu turno na emanação tem -3 m de status em todas as suas Velocidades por 1 rodada ou até escapar. Este efeito tem características de fungo, planta e madeira.\n\n**Altura (+1)** Uma manifestação arcana aumenta sua fraqueza em 1 e uma manifestação divina aumenta seu PV temporariamente em 2.",
    duration: "sustentada até 1 minuto",
    area: "emanação de 3 m",
    aonUrl: 'https://2e.aonprd.com/Spells.aspx?ID=2147',
  },
  {
    id: 'spell-banishing-touch',
    name: 'Toque de Banimento',
    originalName: 'Banishing Touch',
    rank: 2,
    traditions: [],
    traits: ['Attack', 'Concentrate', 'Manipulate', 'Mythic'],
    rarity: 'rare',
    provenance: { type: 'official' },
    actionType: 'one',
    summary:
      'O toque dispara um surto de magia que lança o alvo para longe em segurança. Altura 4º, 6º, 8º.',
    description: "Seu toque projeta uma onda de magia que lança seu alvo para longe com segurança. Faça um ataque de magia corpo a corpo com proficiência mítica contra o CA do seu alvo. Se acertar, você causa 1d6 dano de concussão e lança o alvo no ar e para longe de você; o alvo sofre dano de queda normalmente. O número de ações que você gasta ao lançar a magia determina o dano causado pelo seu toque e a distância que o alvo é lançado.\n\n**1 ação** O alvo é lançado 3 m no ar e empurrado 3 m para trás.\n\n**2 ações** Seu toque causa 2d6 dano de concussão. O alvo é lançado 6 m no ar e empurrado 3 m para trás.\n\n**3 ações** Seu toque causa 2d6 dano de concussão. O alvo é lançado 9 m no ar e empurrado 6 m para trás.\n\n**Altura (4º)** O dano inicial aumenta em 1d6, e todas as distâncias aumentam em 3 m para a versão de 1 ação ou 6 m para as versões de 2 e 3 ações.\n\n**Altura (6º)** O dano inicial aumenta em 2d6, e todas as distâncias aumentam em 6 m para a versão de 1 ação ou 18 m para as versões de 2 e 3 ações.\n\n**Altura (8º)** O dano inicial aumenta em 3d6, e todas as distâncias aumentam em 9 m para a versão de 1 ação ou 30 m para as versões de 2 e 3 ações.",
    targets: "1 criatura",
    range: "toque",
    aonUrl: 'https://2e.aonprd.com/MythicSpells.aspx?ID=2152',
  },
]
