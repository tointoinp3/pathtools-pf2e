import type { CreatureFamily } from '@/types/creature'

function fam(
  partial: Omit<CreatureFamily, 'source'> & { source?: string },
): CreatureFamily {
  return { source: partial.source ?? 'Pathfinder #217: Death Sails a Wine-Dark Sea', ...partial }
}

/**
 * Famílias AoN Monster Families de Myth-Speaker (#216–218) e Revenge of the Runelords (#219–220).
 * Asides = barras laterais oficiais da página da família. Sem blurb de membro.
 */
export const catalogCreatureFamiliesMythRunelords: CreatureFamily[] = [
  fam({
    id: 'family-gigantic-bee',
    name: 'Abelha Gigantesca',
    originalName: 'Gigantic Bee',
    trait: null,
    source: 'Pathfinder #217: Death Sails a Wine-Dark Sea',
    sourcePage: 82,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=566',
    intro: `A abelha-do-mel é industriosa e em geral bastante gentil. Após um afluxo de poder mítico, porém, várias colônias de abelhas se viram transformadas em espécimes gigantescos, junto com os campos onde colhem néctar. Essas abelhas agem quase como antes da infusão de poder mítico, só que agora são bem mais capazes de defender a si e às colmeias.`,
    sections: [],
  }),
  fam({
    id: 'family-painted-creatures',
    name: 'Criaturas Pintadas',
    originalName: 'Painted Creatures',
    trait: null,
    source: 'Pathfinder #218: Titanbane',
    sourcePage: 86,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=568',
    intro: `Este construto irracional toma a forma de um retrato bidimensional ganho de vida ou de uma ilustração pintada em três dimensões com pigmentos mágicos.`,
    sections: [
      {
        id: 'painted-behavior',
        title: 'Comportamento Pintado',
        body: 'Criaturas pintadas em geral adotam os comportamentos daquilo que imitam. Isso resulta em criaturas como uma ovelha pintada que bale preocupada e pasta, ainda que qualquer erva consumida fique inerte na barriga improvisada antes de transpassar o corpo e cair no chão.\n\nCriaturas inteligentes animadas desse modo às vezes desenvolvem um vocabulário limitado. Porém, o construto permanece irracional, as falas seguem só a lógica mais simplória, e as palavras ficam aquém de qualquer coisa que se pudesse chamar de conversa. Com instrução cuidadosa, esses construtos conseguem executar tarefas mundanas.',
      },
      {
        id: 'painted-treasure',
        title: 'Tesouro Pintado',
        body: 'O equipamento de uma criatura pintada faz parte dela e também é feito de tinta mágica. Esse equipamento não pode ser desarmado. Se a criatura pintada largar qualquer equipamento, o item derrete numa poça de tinta um instante depois — depois de causar dano, no caso de armas de arremesso e projéteis. Equipamento pintado (incluindo munição) é restaurado à criatura pintada automaticamente 24 horas depois de perdido.\n\nA critério do mestre, um PC artista talentoso pode resgatar um item pintado ao Repará-lo imediatamente e com sucesso, usando uma CD difícil do nível da criatura pintada. Isso pode permitir que os PCs recuperem um item único (até mágico) que existia só na imaginação do artista original.',
      },
    ],
  }),
  fam({
    id: 'family-stygian-guardian',
    name: 'Guardião Estígio',
    originalName: 'Stygian Guardian',
    trait: null,
    source: 'Pathfinder #217: Death Sails a Wine-Dark Sea',
    sourcePage: 86,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=567',
    intro: `Lugares da vida após a morte estão constantemente sob ameaça daqueles que buscam as almas dos falecidos para os próprios fins. A maioria dos reinos da Esfera Externa, porém, tem habitantes encarregados de guardar contra essa ameaça. Embora psicopompos sejam os mais conhecidos nessa tarefa, até demônios protegem com ganância as almas acumuladas nas Fendas Exteriores. Outros bolsões de realidade, como Amneros, abrigam grande número de sombras com poucas defesas além do próprio soberano do reino.`,
    sections: [
      {
        id: 'other-stygian-guardians',
        title: 'Outros Guardiões Estígios',
        body: 'Embora keribos e eumênides sejam os guardiões estígios encontrados com mais frequência, estão longe de ser os únicos. Amnerion também criou gigantes de muitos braços chamados talisons para tarefas que exigem grande força e para servir de protetores do palácio, embora esses gigantes passem a maior parte do tempo fundidos às paredes das cavernas. Em Bothrios, criaturas horrendas metade louva-a-deus, metade escorpião chamadas scynoxthis infligem punições aos perversos.',
      },
    ],
  }),
  fam({
    id: 'family-risen-runelord',
    name: 'Senhor Rúnico Ressuscitado',
    originalName: 'Risen Runelord',
    trait: null,
    source: 'Pathfinder #219: Lord of the Trinity Star',
    sourcePage: 90,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=668',
    intro: `Senhores rúnicos ressuscitados são criados por um ritual poderoso inventado pelo Senhor Rúnico Xanderghul — um ritual chamado _erguer senhor rúnico_. Todos os senhores rúnicos ressuscitados são criaturas de no mínimo 11º nível. Uma vez criados, um senhor rúnico ressuscitado não tem capacidade de se tornar mais poderoso, pois são manifestações do legado num ponto específico no tempo (embora, com tempo e recursos suficientes, um senhor rúnico ressuscitado pudesse encontrar um modo de superar essa limitação de autoaperfeiçoamento).

Um senhor rúnico ressuscitado tem um mínimo de livre-arbítrio, mas enquanto viver aquele que o criou via _erguer senhor rúnico_, está atado aos desejos do criador. Um senhor rúnico ressuscitado ordenado a ações claramente autodestrutivas pode, a critério do mestre, resistir à ordem e até romper o controle do criador.

Como _erguer senhor rúnico_ se vale do legado de um senhor rúnico como existe nas Terras dos Sonhos, nenhum senhor rúnico ressuscitado pode dormir ou sonhar. Xanderghul pode usar um senhor rúnico ressuscitado de um modo especial: pode usar qualquer senhor rúnico ressuscitado (incluindo os que não criou) como corpo reserva. Se for morto, a alma dele pode saltar instantaneamente para o senhor rúnico ressuscitado mais próximo para substituí-lo e continuar a luta, a menos que os PCs desativem essa defesa durante a segunda aventura de Revenge of the Runelords. Independentemente do nível, todos os senhores rúnicos ressuscitados são criaturas míticas e imunes a efeitos de sono.

As magias preparadas de um senhor rúnico ressuscitado dependem do legado pecaminoso. Ao criar senhores rúnicos ressuscitados de nível mais alto, use essas seleções como diretrizes temáticas ao escolher magias de círculo mais alto. Um senhor rúnico ressuscitado prepara magias arcanas, mas não precisa de grimório para isso, nem pode aprender magias novas — as magias que tem preparadas na criação são as que terá. **Magias da Inveja**—**6º** _globo dissipador_, _repulsão_; **5º** _banimento_, _dissipar magia_, _véu de privacidade_; **4º** _amarra planar_, _resistir energia_, _movimento desimpedido_; **3º** _clarividência auditiva_, _levitar_, _lentidão_; **2º** _desfoque_, _resistência ambiental_, _ver o invisível_; **1º** _encantar_, _comando_, _medo_; **Truques (6º)** _aturdir_, _figmento_, _luz_, _ler aura_, _escudo_

**Magias da Gula**—**6º** _convocar morto-vivo_, _exsanguinação vampírica_; **5º** _invocar espíritos_, _nuvem tóxica_, _onda de desespero_; **4º** _gavinhas sombrias_, _voar_, _visão da morte_; **3º** _vincular morto-vivo_, _lentidão_, _banquete vampírico_; **2º** _vendeta de sangue_, _criar comida_, _portador fantasma_; **1º** _enfraquecer_, _medo_, _peste goblin_; **Truques (6º)** _figmento_, _geada_, _luz_, _ler aura_, _distorção do vazio_

**Magias da Ganância**—**6º** _metamorfose amaldiçoada_, _desintegrar_; **5º** _forma elemental_, _espinho impalador_, _muro de pedra_; **4º** _forma aérea_, _criação_, _voar_; **3º** _forma de inseto_, _um com a pedra_, _muro de espinhos_; **2º** _aumentar_, _forma humanoide_, _encolher_; **1º** _passo veloz_, _remendar_, _forma de praga_; **Truques (6º)** _garra sulcadora_, _luz_, _ler aura_, _escudo_, _projétil telecinético_

**Magias da Luxúria**—**6º** _dominar_, _esqueça disso_; **5º** _sondar a mente_, _sono_, _sugestão subconsciente_; **4º** _confusão_, _pesadelo_, _sugestão_; **3º** _mensagem onírica_, _cativar_, _paralisar_; **2º** _desfoque_, _ataque de riso_, _embotar_; **1º** _encantar_, _comando_, _medo_; **Truques (6º)** _aturdir_, _detectar magia_, _luz_, _prestidigitação_, _mão telecinética_

**Magias do Orgulho**—**6º** _criatura ilusória_, _calamidade fantasmal_; **5º** _cores vertiginosas_, _alucinação_, _cena ilusória_; **4º** _invisibilidade_, _miragem_, _visão da morte_; **3º** _disfarce ilusório_, _hipnotizar_, _paralisar_; **2º** _desfoque_, _escuridão_, _luz reveladora_; **1º** _disfarçar magia_, _objeto ilusório_, _lacaio fantasmal_; **Truques (6º)** _aturdir_, _figmento_, _luz_, _prestidigitação_, _sigilo_

**Magias da Preguiça**—**6º** _desintegrar_, _teleporte_; **5º** _sono_, _serpentear_, _nuvem tóxica_; **4º** _confusão_, _voar_, _translocar_; **3º** _cabana aconchegante_, _lentidão_, _muro de espinhos_; **2º** _criar comida_, _montaria maravilhosa_, _névoa_; **1º** _criar água_, _pouso suave_, _golpe certeiro_; **Truques (6º)** _aturdir_, _luz_, _mensagem_, _prestidigitação_, _mão telecinética_

**Magias da Ira**—**6º** _relâmpago em cadeia_, _muro de força_; **5º** _bola de fogo_, _nevasca uivante_, _muro de gelo_; **4º** _relâmpago_, _trovão golpeador_, _muro de fogo_; **3º** _barragem de força_, _acelerar_, _muro de vento_; **2º** _virote flamejante_, _explosão de ruído_, _manobra telecinética_; **1º** _soprar fogo_, _rajada de vento_, _vento de cauda_; **Truques (6º)** _rajada cáustica_, _arco elétrico_, _ignição_, _luz_, _projétil telecinético_`,
    sections: [],
  }),
]
