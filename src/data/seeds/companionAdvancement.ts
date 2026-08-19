import type {
  AnimalCompanionSpecialization,
  AnimalCompanionStage,
  ConstructCompanionStage,
} from '@/types/companion'

/** Player Core pg. 211 — avanço de companheiro animal (Remaster). */
export const ANIMAL_COMPANION_STAGE_RULES: Record<
  AnimalCompanionStage,
  string
> = {
  young: `Estágio inicial da ficha de tipo. Treinado em ataques desarmados, defesa sem armadura, bardagem, Percepção, todas as salvaguardas, Acrobacia, Atletismo e a perícia listada no tipo. Dano desarmado com 1 dado.`,
  mature: `Se o companheiro é Médio ou menor, cresce um tamanho.

Aumente Força, Destreza, Constituição e Sabedoria em 1.

Percepção e todas as salvaguardas passam a perito. Intimidação, Furtividade e Sobrevivência passam a treinado; se o tipo já dava treinado numa dessas, essa sobe a perito.

Dano desarmado: de 1 dado para 2 dados.`,
  nimble: `Aumente Destreza em 2 e Força, Constituição e Sabedoria em 1.

Acrobacia passa a perito.

+2 de dano extra nos ataques desarmados. Os ataques passam a ser mágicos para ignorar resistências a ataques não mágicos.

Aprende a manobra avançada do tipo.`,
  savage: `Se o companheiro é Médio ou menor, cresce um tamanho.

Aumente Força em 2 e Destreza, Constituição e Sabedoria em 1.

Atletismo passa a perito.

+3 de dano extra nos ataques desarmados. Os ataques passam a ser mágicos para ignorar resistências a ataques não mágicos.

Aprende a manobra avançada do tipo.`,
  specialized: `Companheiros especializados são mais inteligentes e têm comportamentos mais complexos. A maioria só pode ter uma especialização. Na primeira especialização, o companheiro também ganha:

Ataques desarmados passam a perito.

Salvaguardas e Percepção passam a mestre.

Aumente Destreza em 1 e Inteligência em 2.

Dano desarmado: de 2 dados para 3 dados, e o dano extra sobe de +2 para +4 (se vinha de Ágil) ou de +3 para +6 (se vinha de Feroz).

Mais o benefício da especialização escolhida.`,
}

/** Player Core pg. 211 — especializações. */
export const ANIMAL_SPECIALIZATION_RULES: Record<
  AnimalCompanionSpecialization,
  string
> = {
  ambusher: `No ambiente natural do companheiro, ele pode usar Esgueirar-se mesmo se estiver observado. Furtividade passa a perito (ou mestre se o tipo já dava perito). Destreza +1. Defesa sem armadura passa a perito.`,
  bully: `O companheiro aterroriza inimigos com exibições de domínio e os empurra no campo. Atletismo e Intimidação passam a perito (ou mestre se o tipo já dava perito). Força +1 e Carisma +3.`,
  daredevil: `O companheiro entra no combate com saltos e mergulhos. Ganha Negar Vantagem: não fica desprevenido contra criaturas ocultas, indetectadas ou que flanqueiam, a menos que o nível da criatura seja maior que o seu. Acrobacia passa a mestre. Destreza +1. Defesa sem armadura passa a perito.`,
  racer: `O companheiro dispara. Ganha +3 m de status na Velocidade, natação ou voo (você escolhe). Fortitude passa a lendário. Constituição +1.`,
  tracker: `O companheiro é um rastreador excepcional. Pode se mover em Velocidade total enquanto segue rastros. Sobrevivência passa a perito (ou mestre se o tipo já dava perito). Sabedoria +1.`,
  wrecker: `O companheiro estraçalha objetos. Ataques desarmados ignoram metade da Solidez de um objeto. Atletismo passa a mestre. Força +1.`,
}

/** Guns & Gears (Remastered) pg. 33 — avanço de companheiro construto. */
export const CONSTRUCT_COMPANION_STAGE_RULES: Record<
  ConstructCompanionStage,
  string
> = {
  prototype: `Chassi inicial da inovação Construto. Treinado em ataques desarmados, defesa sem armadura, Percepção, salvaguardas, Acrobacia e Atletismo. Imunidades de construto. Escolha uma modificação inicial.`,
  advanced: `Aumente Força, Destreza, Constituição e Sabedoria em 1.

Dano desarmado: de 1 dado para 2 dados.

Percepção e todas as salvaguardas passam a perito.

Intimidação, Furtividade e Sobrevivência passam a treinado. Se o construto é sua inovação e já era treinado numa dessas por modificação, essa sobe a perito.

Você pode mudar o tamanho para Pequeno, Médio ou Grande.`,
  incredible: `Aumente Força, Destreza, Constituição e Sabedoria em 2.

+2 de dano extra nos ataques desarmados. Os ataques passam a ser mágicos, ignorando resistências a ataques não mágicos.

Atletismo e Acrobacia passam a perito.`,
  paragon: `Aumente Força, Destreza, Constituição e Sabedoria em 1.

Ataques desarmados e defesa sem armadura passam a perito.

Atletismo, Acrobacia, salvaguardas e Percepção passam a mestre.

Dano desarmado: de 2 dados para 3 dados, e o dano extra sobe de +2 para +4.`,
}
