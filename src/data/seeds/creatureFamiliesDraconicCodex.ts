import type { CreatureFamily } from '@/types/creature'

function fam(partial: CreatureFamily): CreatureFamily {
  return partial
}

/**
 * Famílias AoN Monster Families de Draconic Codex (Remaster).
 * Asides = barras laterais oficiais da página da família. Sem blurb de membro.
 * Famílias já no catálogo (adamantina, cinzas, conspirador, etc.) são reusadas.
 * Dragonete: atualizado em creatureFamiliesMonsterCoreBatch5.ts.
 */
export const catalogCreatureFamiliesDraconicCodex: CreatureFamily[] = [
  fam({
    id: 'family-dragon-barrage',
    name: "Dragão de Barragem",
    originalName: "Dragon, Barrage",
    trait: null,
    sourcePage: 105,
    source: 'Draconic Codex',
    aonUrl: "https://2e.aonprd.com/MonsterFamilies.aspx?ID=634",
    intro:
      "Dragões de barragem são criaturas em grande parte solitárias. Fazem os covis em lugares isolados e difíceis de achar, como picos de montanhas ou as profundezas de minas e pedreiras abandonadas. Tendem a manter-se longe de grandes centros populacionais, sobretudo onde há abundância de magia arcana em uso. Até dragões de barragem jovens em geral são achados sozinhos, e suspeita-se que não se reproduzam em sentido biológico. Teoriza-se, em vez disso, que conforme envelhecem e crescem, a energia arcana que os forma torna-se potente demais para ser contida na forma física. Conforme começa a saltar em arcos e crepitar para fora, incontida e incontrolável, cria uma massa de energia caótica semelhante à que formou os primeiros dragões de barragem. Se o dragão não acha um modo de desprender a energia arcana, ela por fim coalesce num dragão de barragem novo.",
    sections: [
      {
        id: "barrage-dragon-spellcasters",
        title: "Conjuradores de dragão de barragem",
        body: "Conjuradores de dragão de barragem tendem a lançar as magias a seguir.\n\n### Dragão de Barragem Jovem\n **Magias arcanas preparadas** CD 26, ataque +18; **3º** _force barrage_, _lightning bolt_, _wall of wind_; **2º** _blazing bolt_, _force barrage_, _telekinetic maneuver_; **1º** _dizzying colors_, _force barrage_, _pummeling rubble_; **Truques (3º)** _detect magic_, _electric arc_, _figment_, _shield_, _telekinetic projectile_\n\n### Dragão de Barragem Adulto\n**Magias arcanas preparadas** CD 32, ataque +24; Como o dragão de barragem jovem, mais **6º** _disintegrate_, _force barrage_, _wall of force_; **5º** _force barrage_, _impaling spike_, _telekinetic haul_; **4º** _creation_, _flicker_, _force barrage_; **Truques (6º)** _detect magic_, _electric arc_, _figment_, _shield_, _telekinetic projectile_\n\n### Dragão de Barragem Ancião\n **Magias arcanas preparadas** CD 38, ataque +30; Como o dragão de barragem adulto, mais **9º** _detonate magic_, _force barrage_, _implosion_; **8º** _force barrage_, _hidden mind_, _quandary_; **7º** _duplicate foe_, _energy aegis_, _force barrage_; **Truques (9º)** _detect magic_, _electric arc_, _figment_, _shield_, _telekinetic projectile_\n\n### Arquidragão de Barragem\n **Magias arcanas preparadas** CD 42, ataque +34; Como o dragão de barragem ancião, mais **9º** _containment_, _project image_",
      },
    ],
  }),
  fam({
    id: 'family-dragon-bog',
    name: "Dragão de Pântano",
    originalName: "Dragon, Bog",
    trait: null,
    sourcePage: 109,
    source: 'Draconic Codex',
    aonUrl: "https://2e.aonprd.com/MonsterFamilies.aspx?ID=635",
    intro:
      "Dragões de pântano assombram as parábolas antigas, as características primais uma expressão crua de um mundo primevo que recusa a tirania da progressão do tempo. Os corpos são os de uma coisa que se arrasta sobre o ventre, corpulenta e ricamente blindada por um couro crostoso de esporões e espinhos. As garras, tal como as asas, são coisas débeis, vestígios de um conceito dracônico mais gracioso que só o mais ancião dos arquidragões de pântano talvez alcance. Os rostos são máscaras de terror; os lábios se retraem num rosnado para expor sorrisos brutos de presas como adagas, marcados de crateras pelos ácidos estomacais vis que dão ao sopro latente a turpitude fétida que fere os sentidos quase até a tontura. São, palmo a palmo, uma monstruosidade notívaga, um horror dilacerante que infundiria terror em quem os visse, o ápice dos predadores nascidos do charco.",
    sections: [
      {
        id: "bog-dragon-spellcasters",
        title: "Conjuradores de dragão de pântano",
        body: "Conjuradores de dragão de pântano tendem a lançar as magias a seguir.\n\n### Dragão de Pântano Jovem\n **Magias primais preparadas** CD 25, ataque +17; **4º** _hydraulic torrent_, _misty memory_, _vapor form_; **3º** _aqueous orb_, _earthbind_, _wall of thorns_; **2º** _mist_, _sudden blight_, _vomit swarm_; **1º** _fear_, _mud pit_, _vanishing tracks_; **Truques (4º)** _caustic blast_, _detect magic_, _know the way_, _tangle vine_, _tremor signs_\n\n### Dragão de Pântano Adulto\n**Magias primais preparadas** CD 30, ataque +22; Como o dragão de pântano jovem, mais **6º** _blinding fury_, _tangling creepers_, _tree of seasons_; **5º** _control water_, _corrosive muck_, _toxic cloud_; **Truques (6º)** _caustic blast_, _detect magic_, _know the way_, _tangle vine_, _tremor signs_\n\n### Dragão de Pântano Ancião\n**Magias primais preparadas** CD 37, ataque +29; As adult bog dragon, mais **8º** _acid grip_, _desiccate_, _earthquake_; **7º** _execute_, _mask of terror_, _regenerate_; **Truques (8º)** _caustic blast_, _detect magic_, _know the way_, _tangle vine_, _tremor signs_\n\n### Arquidragão de Pântano\n**Magias primais preparadas** CD 41, ataque +33; Como o dragão de pântano ancião, mais **9º** _harm_, _massacre_, _wrathful storm_; **Truques (9º)** _caustic blast_, _detect magic_, _know the way_, _tangle vine_, _tremor signs_",
      },
    ],
  }),
  fam({
    id: 'family-dragon-brine',
    name: "Dragão de Salmoura",
    originalName: "Dragon, Brine",
    trait: null,
    sourcePage: 113,
    source: 'Draconic Codex',
    aonUrl: "https://2e.aonprd.com/MonsterFamilies.aspx?ID=636",
    intro:
      "Por causa dessa criação dura, dragões de salmoura veem a obediência ao saber superior como o modo próprio do mundo. Isso levou naturalmente a um sistema gerontocrático de governo; humanoides obedecem a dragões de salmoura, e dragões mais jovens ao menos fingem ouvir os dragões anciãos, com o senhor elemental Kelizandri, o Imperador Salobro, servindo de cabeça do Império Salobro. Uma vez que um dragão alcança a adultez, em geral acredita conhecer os súditos melhor que ninguém e começa a descartar as opiniões de todos salvo Kelizandri. Dragões de salmoura adultos que não governam um feudo ou outro povoado são raros; a maioria tem tanto o desejo de impor a vontade ao mundo quanto o poder de forçar uma civilização a seguir as ordens. Esse desejo de governar cria soberanos que abrangem o espectro político, de governantes benéficos que buscam otimizar a segurança e a felicidade dos súditos a tiranos que encaram os cidadãos como crianças ignorantes que morreriam sem a sabedoria do dragão.",
    sections: [
      {
        id: "brine-dragon-spellcasters",
        title: "Conjuradores de dragão de salmoura",
        body: "Conjuradores de dragão de salmoura tendem a lançar as magias a seguir.\n\n### Dragão de Salmoura Jovem\n **Magias primais preparadas** CD 26, ataque +18; **4º** _crashing wave_, _hydraulic torrent_, _unfettered movement_; **3º** _aqueous orb_, _feet to fins_, _slow_; **2º** _acid grip_, _darkness_, _water breathing_; **1º** _air bubble_, _create water_, _hydraulic push_; **Truques (3º)** _caustic blast_, _detect magic_, _guidance_, _read aura_, _spout_\n\n### Dragão de Salmoura Adulto\n **Magias primais preparadas** CD 32, ataque +24; Como o dragão de salmoura jovem, mais **6º** _acid grip_, _hydraulic torrent_, _truesight_; **5º** _control water_, _corrosive muck_, _mariner's curse_; **Truques (6º)** _caustic blast_, _detect magic_, _guidance_, _read aura_, _spout_\n\n### Dragão de Salmoura Ancião\n **Magias primais preparadas** CD 38, ataque +30; Como o dragão de salmoura adulto, mais **8º** _desiccate_, _hydraulic torrent_, _migration_; **7º** _eclipse burst_, _energy aegis_, _regenerate_; **Truques (8º)** _caustic blast_, _detect magic_, _guidance_, _read aura_, _spout_\n\n### Arquidragão de Salmoura\n **Magias primais preparadas** CD 42, ataque +34; Como o dragão de salmoura ancião, mais **9º** _detonate magic_, _implosion_, _wrathful storm_; **Truques (9º)** _caustic blast_, _detect magic_, _guidance_, _read aura_, _spout_",
      },
    ],
  }),
  fam({
    id: 'family-dragon-cloud',
    name: "Dragão de Nuvem",
    originalName: "Dragon, Cloud",
    trait: null,
    sourcePage: 117,
    source: 'Draconic Codex',
    aonUrl: "https://2e.aonprd.com/MonsterFamilies.aspx?ID=637",
    intro:
      "Dragões de nuvem são os dragões primais do céu e da névoa. Há muito, muito tempo, nos dias antes de as pessoas escreverem as coisas com qualquer consistência, dragões de nuvem talvez tenham sido visitantes de Golarion, vindos primeiro do ar sem fim além da realidade. Se assim foi, instalaram-se bem à vontade. Habitam os lugares altos do mundo, aninhando-se no alto dos picos das montanhas ou nas mais altas árvores de florestas alpinas. Deleitam-se no voo ainda mais que outros dragões, e voam mais alto que quase todos os parentes, até os lugares onde o ar rarefaz e o céu toma os tons da noite. Viajam com frequência e percorrem longas distâncias.",
    sections: [
      {
        id: "cloud-dragon-spellcasters",
        title: "Conjuradores de dragão de nuvem",
        body: "Conjuradores de dragão de nuvem tendem a lançar as magias a seguir.\n\n### Dragão de Nuvem Jovem\n**Magias primais preparadas** CD 29, ataque +21; **4º** _lightning bolt_, _mirage_, _vapor form_; **3º** _haste_, _lightning bolt_, _slow_; **2º** _humanoid form_, _resist energy_, _sure footing_; **1º** _tailwind_, _thunderstrike_, _ventriloquism_; **Truques (4º)** _detect magic_, _electric arc_, _frostbite_, _prestidigitation_, _sigil_\n\n### Dragão de Nuvem Adulto\n**Magias primais preparadas** CD 34, ataque +26; Como o dragão de nuvem jovem, mais **6º** _chain lightning_, _cursed metamorphosis_, _truesight_; **5º** _banishment_, _howling blizzard_, _lightning bolt_; **Truques (6º)** _detect magic_, _electric arc_, _frostbite_, _prestidigitation_, _sigil_\n\n### Dragão de Nuvem Ancião\n**Magias primais preparadas** CD 41, ataque +33; Como o dragão de nuvem adulto, mais **9º** _falling stars_, _metamorphosis_, _wrathful storm_; **8º** _arctic rift_, _desiccate_, _punishing winds_; **7º** _eclipse burst_, _energy aegis_, _regenerate_; **Truques (9º)** _detect magic_, _electric arc_, _frostbite_, _prestidigitation_, _sigil_\n\n### Arquidragão de Nuvem\n**Magias primais preparadas** CD 45, ataque +37; Como o dragão de nuvem ancião, mais **10º** _cataclysm_, _revival_; **Truques (10º)** _detect magic_, _electric arc_, _frostbite_, _prestidigitation_, _sigil_",
      },
    ],
  }),
  fam({
    id: 'family-dragon-crystal',
    name: "Dragão de Cristal",
    originalName: "Dragon, Crystal",
    trait: null,
    sourcePage: 121,
    source: 'Draconic Codex',
    aonUrl: "https://2e.aonprd.com/MonsterFamilies.aspx?ID=638",
    intro:
      "Dragões de cristal consideram-se entre as espécies de dragão mais belas e esperam que os outros reconheçam isso. Veem pouco motivo para enfeitar os couros cristalinos, mas podem passar horas cada dia cuidando da aparência. Limpam-se com frequência, e cada escama precisa estar devidamente facetada e livre de imperfeições. Um dragão de cristal pode recolher-se ao covil se o couro for danificado, removendo manualmente as escamas danificadas (um processo doloroso!) e então esperando as substitutas crescerem.",
    sections: [
      {
        id: "crystal-dragon-spellcasters",
        title: "Conjuradores de dragão de cristal",
        body: "Conjuradores de dragão de cristal tendem a lançar as magias a seguir.\n\n### Dragão de Cristal Jovem\n**Magias primais preparadas** CD 25, ataque +17, **4º** _mountain resilience_, _shatter_; **3º** _cave fangs_, _earthbind_, _one with stone_; **2º** _burrow ward_, _everlight_, _expeditious excavation_; **1º** _pummeling rubble_, _shattering gem_, _shockwave_; **Truques (4º)** _detect magic_, _glass shield_, _light_, _scatter scree_, _tremor signs_\n\n### Dragão de Cristal Adulto\n**Magias primais preparadas** CD 30, ataque +22; Como o dragão de cristal jovem, mais **6º** _petrify_, _vitrifying blast_; **5º** _creation_, _speak with stones_, _wall of stone_; **4º** _shape stone_; **Truques (6º)** _detect magic_, _glass shield_, _light_, _scatter scree_, _tremor signs_\n\n### Dragão de Cristal Ancião\n**Magias primais preparadas** CD 37, ataque +29; Como o dragão de cristal adulto, mais **8º** _cave fangs_, _earthquake_, _moment of renewal_; **7º** _heaving earth_; **Truques (8º)** _detect magic_, _glass shield_, _light_, _scatter scree_, _tremor signs_\n\n### Arquidragão de Cristal\n**Magias primais preparadas** CD 41, ataque +33; Como o dragão de cristal ancião, mais **10º** _indestructibility_; **9º** _heaving earth_, _implosion_; **Truques (10º)** _detect magic_, _glass shield_, _light_, _scatter scree_, _tremor signs_",
      },
    ],
  }),
  fam({
    id: 'family-dragon-delight',
    name: "Dragão do Deleite",
    originalName: "Dragon, Delight",
    trait: null,
    sourcePage: 125,
    source: 'Draconic Codex',
    aonUrl: "https://2e.aonprd.com/MonsterFamilies.aspx?ID=639",
    intro:
      "Como residentes do plano Exterior do Elísio, dragões do deleite são encarnações da propensão do plano à alegria, à travessura, à paixão e à espontaneidade. As asas maciças de gaze refratam a luz de mil arco-íris entre camadas translúcidas. Escamas verde-púrpura cintilam em esplendor opalescente, enquanto uma cauda longa e sinuosa estala em figuras em espiral, disparando para tirar os pés de debaixo de observadores distraídos. Um par de antenas emplumadas dirige o dragão do deleite à próxima fonte de diversão — seja brincadeira, mimo ou passatempo em geral, tudo com certeza se tornará um grande momento na presença do dragão, saibam ou não os habitantes de um plano.",
    sections: [
      {
        id: "delight-dragon-spellcasters",
        title: "Conjuradores de dragão do deleite",
        body: "Conjuradores de dragão do deleite tendem a lançar as magias a seguir.\n\n### Dragão do Deleite Jovem\n **Magias divinas preparadas** CD 29, ataque +21; **5º** _banishment_, _dispel magic_; **4º** _cleanse affliction_, _noise blast_, _vital beacon_; **3º** _cozy cabin_, _heroism_, _locate_; **2º** _clear mind_, _laughing fit_, _revealing light_; **1º** _concordant choir_, _item facade_, _ventriloquism_; **Truques (5º)** _bullhorn_, _detect magic_, _divine lance_, _prestidigitation_, _summon instrument_\n\n### Dragão do Deleite Adulto\n **Magias divinas preparadas** CD 34, ataque +26; Como o dragão do deleite jovem, mais **7º** _dispel magic_, _regenerate_, _sunburst_; **6º** _blessed boundary_, _spirit blast_, _truesight_; **5º** _breath of life_; **Truques (7º)** _bullhorn_, _detect magic_, _divine lance_, _prestidigitation_, _summon instrument_\n\n### Dragão do Deleite Ancião\n**Magias divinas preparadas** CD 41, ataque +33; Como o dragão do deleite adulto, mais **9º** _dispel magic_, _divine decree_, _overwhelming presence_; **8º** _moment of renewal_ (×2), _pinpoint_; **Truques (9º)** _bullhorn_, _detect magic_, _divine lance_, _prestidigitation_, _summon instrument_\n\n### Arquidragão do Deleite\n **Magias divinas preparadas** CD 45, ataque +37; Como o dragão do deleite adulto, mais **10º** _gate_; **Truques (10º)** _bullhorn_, _detect magic_, _divine lance_, _prestidigitation_, _summon instrument_",
      },
    ],
  }),
  fam({
    id: 'family-dragon-executor',
    name: "Dragão Executor",
    originalName: "Dragon, Executor",
    trait: null,
    sourcePage: 131,
    source: 'Draconic Codex',
    aonUrl: "https://2e.aonprd.com/MonsterFamilies.aspx?ID=641",
    intro:
      "Dragões executores tendem a alinhar-se com o Céu, mas há alguns que se considerariam de outro modo. Deuses como Sarenrae, Iomedae e Trudd todos têm dragões executores aliados, atuando como generais nos exércitos divinos, guarda-costas, arautos ou como servos leais nos esforços dos deuses em Golarion. Em alguns casos, dragões executores escolhem em vez disso alinhar-se com deidades que não são do Céu, mas têm outros aliados divinos. Psicopompos falam de um dragão executor que serve Urgathoa como guarda-costas e mascote, empanturrando-se nos banquetes sem fim que Urgathoa oferece quase diariamente.",
    sections: [
      {
        id: "executor-dragon-spellcasters",
        title: "Conjuradores de dragão executor",
        body: "Executor dragon spellcasters might focus on holy or unholy spells, depending on their personality and sanctification. The following spell choices represent a holy executor dragon.\n\n### Dragão Executor Jovem\n**Magias divinas preparadas** CD 28, ataque +20; **4º** _divine wrath_, _spiritual armament_, _unfettered movement_; **3º** _blindness_, _holy light_, _ring of truth_; **2º** _deafness_, _revealing light_, _spiritual armament_; **1º** _bless_, _infuse vitality_, **sanctuary**; **Truques (4º)** _detect magic_, _divine lance_, _guidance_, _light_, _shield_\n\n### Dragão Executor Adulto\n**Magias divinas preparadas** CD 33, ataque +25; Como o dragão executor jovem, mais **6º** _blessed boundary_, _spirit blast_, _spiritual armament_; **5º** _divine immolation_, _holy light_, _spiritual guardian_; **Truques (6º)** _detect magic_, _divine lance_, _guidance_, _light_, _shield_\n\n### Dragão Executor Ancião\n**Magias divinas preparadas** CD 40, ataque +32; Como o dragão executor adulto, mais **8º** _canticle of everlasting grief_, _divine inspiration_, _spiritual armament_; **7º** _divine decree_, _execute_, _holy light_; **Truques (8º)** _detect magic_, _divine lance_, _guidance_, _light_, _shield_\n\n### Arquidragão Executor\n**Magias divinas preparadas** CD 44, ataque +36; Como o dragão executor ancião, mais **10º** _divine decree_; **9º** _massacre_, _overwhelming presenc_e; **Truques (10º)** _detect magic_, _divine lance_, _guidance_, _light_, _shield_",
      },
    ],
  }),
  fam({
    id: 'family-dragon-forest',
    name: "Dragão da Floresta",
    originalName: "Dragon, Forest",
    trait: null,
    sourcePage: 135,
    source: 'Draconic Codex',
    aonUrl: "https://2e.aonprd.com/MonsterFamilies.aspx?ID=642",
    intro:
      "Como o restante dos primos imperiais, o dragão da floresta provavelmente originou-se do plano elemental que encarna, a saber o Plano da Madeira. O fato de alguns dragões da floresta ainda residirem na Floresta Eterna recentemente retornada sustenta essa teoria, embora isso só responda ao local de origem, não a como os dragões vieram a ser. A Senhora Elemental Shumunue pode lembrar um dragão da floresta, mas ela mesma não é uma, então o mistério do progenitor dos dragões permanece sem resposta até hoje.",
    sections: [
      {
        id: "forest-dragon-spellcasters",
        title: "Conjuradores de dragão da floresta",
        body: "Conjuradores de dragão da floresta tendem a lançar as magias a seguir.\n\n### Dragão da Floresta Jovem\n**Magias primais preparadas** CD 29, ataque +21; **4º** _mirage_, _speak with plants_, _vapor form_; **3º** _insect form_, _mad monkeys_, _wall of thorns_; **2º** _animal messenger_, _darkness_, _gecko grip_; **1º** _goblin pox_, _pest form_, _weaken earth_; **Truques (4º)** _caustic blast_, _detect magic_, _guidance_, _read aura_, _tangle vine_; **Rituais** CD 29; _plant growth_\n\n### Dragão da Floresta Adulto\n **Magias primais preparadas** CD 34, ataque +26; Como o dragão da floresta jovem, mais **6º** _cursed metamorphosis_, _lignify_, _tangling creepers_; **5º** _moon frenzy_, _nature's pathway_, _toxic cloud_; **Truques (6º)** _caustic blast_, _detect magic_, _guidance_, _read aura_, _tangle vine_; **Rituais** CD 34; _primal call_\n\n### Dragão da Floresta Ancião\n **Magias primais preparadas** CD 41, ataque +33; Como o dragão da floresta adulto, mais **9º** _implosion_, _massacre_; **8º** _desiccate_, _punishing winds_, _rainbow fumarole_; **7º** _eclipse burst_, _regenerate_, _true target_; **Truques (9º)** _caustic blast_, _detect magic_, _guidance_, _read aura_, _tangle vine_\n\n### Arquidragão da Floresta\n**Magias primais preparadas** CD 45, ataque +37; Como o dragão da floresta ancião, mais **10º** _indestructibility_, _manifestation_; **9º** _nature's enmity_; **Truques (10º)** _caustic blast_, _detect magic_, _guidance_, _read aura_, _tangle vine_",
      },
    ],
  }),
  fam({
    id: 'family-dragon-magma',
    name: "Dragão de Magma",
    originalName: "Dragon, Magma",
    trait: null,
    sourcePage: 139,
    source: 'Draconic Codex',
    aonUrl: "https://2e.aonprd.com/MonsterFamilies.aspx?ID=643",
    intro:
      "Dragões de magma representam um aspecto impulsivo e volátil da linhagem dracônica. Territoriais e imprevisíveis, são conhecidos por proteger os terrenos de caça com um porte feroz e orgulhoso que não admite desafiantes. Apaixonados ao extremo, dragões de magma nas formas dracônicas muitas vezes podem parecer de todo bestiais, lançando-se por impulso a ameaças e desafios com abandono selvagem, mas isso desmente um intelecto que muitos subestimam.",
    sections: [
      {
        id: "magma-dragon-spellcasters",
        title: "Conjuradores de dragão de magma",
        body: "Magma dragon spellcasters often know the following spells.\n\n### Dragão de Magma Jovem\n**Magias primais preparadas** CD** 28, ataque +20; **4º** _fireball_, _mountain resilience_, _wall of fire_; **3º** _fireball_, _haste_, _slow_; **2º** _mist_, _revealing light_, _sound body_; **1º** _air bubble_, _grease_, _vanishing tracks_; **Truques (4º)** _detect magic_, _ignition_, _prestidigitation_, _read aura_, _sigil_\n\n### Dragão de Magma Adulto\n**Magias primais preparadas** CD 33, ataque +25; Como o dragão de magma jovem, mais **6º** _fireball_, _petrify_, _truesight_; **5º** _fireball_, _toxic cloud_, _wall of stone_; **Truques (6º)** _detect magic_, _ignition_, _prestidigitation_, _read aura_, _sigil_\n\n### Dragão de Magma Ancião\n**Magias primais preparadas** CD 40, ataque +32; Como o dragão de magma adulto, mais **8º** _desiccate_, _earthquake_, _fireball_; **7º** _fiery body_, _fireball_, _volcanic eruption_; **Truques (8º)** _detect magic_, _ignition_, _prestidigitation_, _read aura_, _sigil_\n\n### Arquidragão de Magma\n**Magias primais preparadas** CD 44, ataque +36; Como o dragão de magma ancião, mais **9º** _falling stars_, _massacre_; **Truques (9º)** _detect magic_, _ignition_, _prestidigitation_, _read aura_, _sigil_",
      },
    ],
  }),
  fam({
    id: 'family-dragon-mocking',
    name: "Dragão Zombeteiro",
    originalName: "Dragon, Mocking",
    trait: null,
    sourcePage: 143,
    source: 'Draconic Codex',
    aonUrl: "https://2e.aonprd.com/MonsterFamilies.aspx?ID=644",
    intro:
      "Trocistas astutos e exibicionistas entusiasmados, dragões zombeteiros divertem os amigos e humilham os inimigos usando truques, sátira e grandiloquência para desgraçar os poderosos e erguer o ânimo dos oprimidos. Entre os dragões mais propensos a interagir de perto com humanoides, muitas vezes instalam-se em comunidades ou perto delas, onde acham alvos fáceis para as artimanhas. São animadores inveterados, embora mais propensos a recitar poemas satíricos ou gracejos agudos do que a compor baladas. Especialistas em disfarce, às vezes mudam de forma para espiar melhor pessoas interessantes, farejar informação embaraçosa ou executar ardis elaborados. Dragões mais sérios muitas vezes encaram os dragões zombeteiros como exibicionistas irresponsáveis, mas sob o exterior jovial abrigam um desejo ardente de combater a injustiça. São facilmente recrutados para campanhas contra tiranos, e dragões mais jovens muitas vezes trabalham para remover chefes de gangue ou senhorios que oprimem o povo trabalhador.",
    sections: [
      {
        id: "mocking-dragon-spellcasters",
        title: "Conjuradores de dragão zombeteiro",
        body: "Conjuradores de dragão zombeteiro tendem a lançar as magias a seguir.\n\n### Dragão Zombeteiro Jovem\n**Magias ocultistas preparadas** CD 26, ataque +18; **4º** _confusion_, _dispel magic_, _mirage_; **3º** _hypnotize_, _paralyze_, _slow_; **2º** _blur_, _illusory creature_, _phantasmal treasure_; **1º** _dizzying colors_, _fear_, _sleep_; **Truques (4º)** _detect magic_, _figment_, _summon instrument_, _telekinetic hand_, _telekinetic projectile_\n\n### Dragão Zombeteiro Adulto\n**Magias ocultistas preparadas** CD 32, ataque +24; Como o dragão zombeteiro jovem, mais **6º** _cursed metamorphosis_, _truesight_, _vibrant pattern_; **5º** _cloak of colors_, _strange geometry_, _synesthesia_; **Truques (6º)** _detect magic_, _figment_, _summon instrument_, _telekinetic hand_, _telekinetic projectile_\n\n### Dragão Zombeteiro Ancião\n**Magias ocultistas preparadas** CD 38, ataque +30; Como o dragão zombeteiro adulto, mais **8º** _confusing colors_, _quandary_, _uncontrollable dance_; **7º** _duplicate foe_, _visions of danger_, _warp mind_; **Truques (8º)** _detect magic_, _figment_, _summon instrument_, _telekinetic hand_, _telekinetic projectile_\n\n### Arquidragão Zombeteiro\n**Magias ocultistas preparadas** CD 42, ataque +34; Como o dragão zombeteiro ancião, mais **10º** _fabricated truth_; **9º** _overwhelming presence_, _phantasmagoria_, _unfathomable song_; **Truques (10º)** _detect magic_, _figment_, _summon instrument_, _telekinetic hand_, _telekinetic projectile_",
      },
    ],
  }),
  fam({
    id: 'family-dragon-oath',
    name: "Dragão do Juramento",
    originalName: "Dragon, Oath",
    trait: null,
    sourcePage: 147,
    source: 'Draconic Codex',
    aonUrl: "https://2e.aonprd.com/MonsterFamilies.aspx?ID=645",
    intro:
      "Dragões do juramento são a encarnação de uma causa que perseguem com determinação infalível. Extraem o poder não de meras palavras, mas do significado e dos ideais que essas palavras carregam. A dedicação levou à imagem difundida de dragões do juramento lutando ao lado de campeões nobres que tentam trazer o bem onde se pensa que só a corrupção habita. Ainda assim, não há nada mais aterrador do que o poder de um dragão do juramento que jura uma causa violenta ou que é arrastado à danação pela lealdade.",
    sections: [
      {
        id: "oath-dragon-spellcasters",
        title: "Conjuradores de dragão do juramento",
        body: "Conjuradores de dragão do juramento tendem a lançar as magias a seguir.\n\n### Dragão do Juramento Jovem\n**Magias divinas preparadas** CD 29, ataque +21; **4º** _clear mind_, _heal_, _vital beacon_; **3º** _cleanse affliction_, _heal_, _heroism_; **2º** _cleanse affliction_, _status_, _translate_; **1º** _protection_, _spirit link_, _thoughtful gift_; **Truques (4º)** _bullhorn_, _detect magic_, _forbidding ward_, _guidance_, _stabilize_\n\n### Dragão do Juramento Adulto\n**Magias divinas preparadas** CD 34, ataque +26; Como o dragão do juramento jovem, mais **6º** _clear mind_, _heroism_, _zealous conviction_; **5º** _resist energy_, _spirit link_, _truespeech_; **Truques (6º)** _bullhorn_, _detect magic_, _forbidding ward_, _guidance_, _stabilize_\n\n### Dragão do Juramento Ancião\n**Magias divinas preparadas** CD 41, ataque +33; Como o dragão do juramento adulto, mais **9º** _field of life_, _foresight_, _heroism_; **8º** _clear mind_, _divine decree_, _sound body_; **7º** _Dissipar Magia_, _energy aegis_, _spell riposte_; **Truques (9º)** _bullhorn_, _detect magic_, _forbidding ward_, _guidance_, _stabilize_\n\n### Arquidragão do Juramento\n**Magias divinas preparadas** CD 45, ataque +37; Como o dragão do juramento ancião, mais **10º** _revival_; **9º** _heal_; **Truques (10º)** _bullhorn_, _detect magic_, _forbidding ward_, _guidance_, _stabilize_",
      },
    ],
  }),
  fam({
    id: 'family-dragon-rime',
    name: "Dragão da Geada",
    originalName: "Dragon, Rime",
    trait: null,
    sourcePage: 151,
    source: 'Draconic Codex',
    aonUrl: "https://2e.aonprd.com/MonsterFamilies.aspx?ID=647",
    intro:
      "Dragões da geada são a encarnação do frio gélido e do gelo. Essas criaturas resistentes adaptaram-se a climas árticos rigorosos, capazes de sobreviver indefinidamente em temperaturas abaixo de zero. São tons de branco e azul-pálido que os camuflam à perfeição no hábitat natural, lembrando geleiras ou montes de neve quando enroscados. Conseguem romper lajes grandes de gelo e mergulhar em águas congeladas em busca de presa. Devido à temperatura corporal naturalmente mais baixa, podem retardar o trato digestivo, o que lhes permite viver longo tempo com pouca comida. Presa grande — como baleias, caribus ou alces — oferece o melhor sustento, mas não são exigentes quando é hora de comer.",
    sections: [
      {
        id: "rime-dragon-spellcasters",
        title: "Conjuradores de dragão da geada",
        body: "Conjuradores de dragão da geada tendem a lançar as magias a seguir.\n\n### Dragão da Geada Jovem\n**Magias primais preparadas** CD 24; ataque +16; **3º** _aqueous orb_, _chilling spray_, _slow_; **2º** _dismantle_, _environmental endurance_, _shatter_; **1º** _chilling spray_, _hydraulic push_, _vanishing tracks_; **Truques (3º)** _detect magic_, _frostbite_, _gale blast_, _know the way_, _spout_\n\n### Dragão da Geada Adulto\n**Magias primais preparadas** CD 29; ataque +21; Como o dragão da geada jovem, mais **5º** _control water_, _howling blizzard_, _speak with stones_; **4º** _ice storm_, _shape stone_, _unfettered movement_; **Truques (5º)** _detect magic_, _frostbite_, _gale blast_, _know the way_, _spout_\n\n### Dragão da Geada Ancião\n**Magias primais preparadas** CD 36; ataque +28; Como o dragão da geada adulto, mais **8º** _arctic rift_, _earthquake_; **7º** _howling blizzard_, _regenerate_, _unfettered pack_; **6º** _chilling spray_, _frost pillar_, _truesight_; **Truques (8º)** _detect magic_, _frostbite_, _gale blast_, _know the way_, _spout_\n\n### Arquidragão da Geada\n**Magias primais preparadas** CD 40; ataque +32; Como o dragão da geada ancião, mais **9º** _implosion_, _wrathful storm_; **8º** _desiccate_; **Truques (9º)** _detect magic_, _frostbite_, _gale blast_, _know the way_, _spout_",
      },
    ],
  }),
  fam({
    id: 'family-dragon-sage',
    name: "Dragão Sábio",
    originalName: "Dragon, Sage",
    trait: null,
    sourcePage: 155,
    source: 'Draconic Codex',
    aonUrl: "https://2e.aonprd.com/MonsterFamilies.aspx?ID=648",
    intro:
      "Uma escama reluzente, inscrita de runas, é tudo que a maioria das pessoas, até aventureiros, vê de um dragão sábio ao longo da vida. Mesmo então, só quem é familiarizado com o saber dos dragões provavelmente reconhecerá a escama como algo além de um pergaminho de magia elaborado. Colecionadores e eruditos de saber esotérico, dragões sábios tornam-se cada vez mais reclusos com a idade e, mesmo na juventude, tendem a trabalhar por intermediários de confiança. Para quem consegue localizar e ganhar a confiança de tal criatura, até os dragões sábios mais jovens são fontes de conhecimento difícil de achar e técnicas mágicas raras. Os mais velhos são combinações vivas de bibliotecas gargantuescas e grimórios sem fim, acumulando os segredos do Universo — e além — nos covis isolados.",
    sections: [
      {
        id: "sage-dragon-spellcasters",
        title: "Conjuradores de dragão sábio",
        body: "Conjuradores de dragão sábio tendem a lançar as magias a seguir.\n\n### Dragão Sábio Jovem\n**Magias ocultistas preparadas** CD 28, ataque +20; **5º** _scouting eye_, _synesthesia_; **4º** _confusion_, _dispelling globe_, _translocate_; **3º** _haste_, _hypercognition_, _mind reading_; **2º** _humanoid form_, _stupefy_, _translate_; **1º** _command_, _déjà vu_, _ill omen_; **Truques (5º)** _daze_, _detect magic_, _read aura_, _shield_, _sigil_\n\n### Dragão Sábio Adulto\n**Magias ocultistas preparadas** CD 33, ataque +25; Como o dragão sábio jovem, mais **7º** _project image_, _visions of danger_; **6º** _dominate_, _repulsion_, _spellwrack_; **5º** _subconscious suggestion_; **Truques (7º)** _daze_, _detect magic_, _read aura_, _shield_, _sigil_\n\n### Dragão Sábio Ancião\n**Magias ocultistas preparadas** CD 44, ataque +36; Como o dragão sábio adulto, mais **9º** _foresight_, _telepathic demand_; **8º** _pinpoint_, _quandary_, _spiritual epidemic_; **7º** _spell riposte_; **Truques (9º)** _daze_, _read aura_, _shield_, _sigil_, _Mão Telecinética_\n\n### Arquidragão Sábio\n**Magias ocultistas preparadas** CD 48, ataque +40; Como o dragão sábio ancião, mais **10º** _manifestation_; **9º** _overwhelming presence_; **Truques (10º)** _daze_, _read aura_, _shield_, _sigil_, _telekinetic hand_",
      },
    ],
  }),
  fam({
    id: 'family-dragon-sea',
    name: "Dragão do Mar",
    originalName: "Dragon, Sea",
    trait: null,
    sourcePage: 159,
    source: 'Draconic Codex',
    aonUrl: "https://2e.aonprd.com/MonsterFamilies.aspx?ID=649",
    intro:
      "Dragões do mar imperiais associam-se à água elemental e superintendem chuva, tempestades, rios e oceanos. Vivem adjacentes às civilizações de Tian Xia, prontos a auxiliar os assuntos mortais e provar o valor. Para alguns dragões do mar, prestar assistência em matérias de clima e saber arcano é um dever. Para outros, é um privilégio que leva a tributos valiosos ou refeições deliciosas. Peticionários visitantes estão ansiosos demais para fornecer, pois diz-se que quando um dragão do mar está satisfeito, a chuva é suave e farta. Em contraste, quando estão irados, a tempestade não poupa ninguém da fúria.",
    sections: [
      {
        id: "sea-dragon-spellcasters",
        title: "Conjuradores de dragão do mar",
        body: "Conjuradores de dragão do mar tendem a lançar as magias a seguir.\n\n### Dragão do Mar Jovem\n**Magias arcanas preparadas** CD 26, ataque +18; **3º** _feet to fins_, _haste_, _wall of wind_; **2º** _laughing fit_, _resist energy_, _water breathing_; **1º** _air bubble_, _grease_, _grim tendrils_; **Truques (3º)** _detect magic_, _message_, _prestidigitation_, _read aura_, _shield_\n\n### Dragão do Mar Adulto\n**Magias arcanas preparadas** CD 32, ataque +24; Como o dragão do mar jovem, mais **5º** _mariner's curse_, _truespeech_, _wall of ice_; **4º** _dispelling globe_, _translocate_, _vapor form_; **Truques (5º)** _detect magic_, _message_, _prestidigitation_, _read aura_, _shield_; **Rituais** CD 32; _commune_\n\n### Dragão do Mar Ancião\n**Magias arcanas preparadas** CD 38, ataque +30; Como o dragão do mar adulto, mais **8º** _desiccate_, _disappearance_, _pinpoint_; **7º** _energy aegis_, _project image_, _spell riposte_; **6º** _phantasmal calamity_, _repulsion_, _truesight_; **Truques (8º)** _detect magic_, _message_, _prestidigitation_, _read aura_, _shield_; **Rituais** CD 38; _commune_\n\n### Arquidragão do Mar\n**Magias arcanas preparadas** CD 42, ataque +34; Como o dragão do mar ancião, mais **10º** _cataclysm_, _manifestation_; **9º** _foresight_, _wrathful storm_; **Truques (10º)** _detect magic_, _message_, _prestidigitation_, _read aura_, _shield_; **Rituais** CD 42; _commune_",
      },
    ],
  }),
  fam({
    id: 'family-dragon-sky',
    name: "Dragão do Céu",
    originalName: "Dragon, Sky",
    trait: null,
    sourcePage: 163,
    source: 'Draconic Codex',
    aonUrl: "https://2e.aonprd.com/MonsterFamilies.aspx?ID=650",
    intro:
      "Quando os dragões imperiais chegaram primeiro ao Universo, cada um estava bem sintonizado aos planos elementais de onde vinham. Conforme a guerra entre os Senhores Elementais grassava e os senhores benévolos caíam um a um, os Planos do Metal e da Madeira selaram-se. Para os dragões originários do Núcleo Corroído, a própria existência estava agora em jogo. Esses dragões voaram de cume a cume, buscando refúgio no Tian Xia então perigoso, tomado por yaoguais em guerra. Por fim, nos picos de Chenlun, Gossamer, Kelsang, Kimu, Kullan, Kyojin e da Muralha do Céu, seres celestiais responderam aos gritos de ajuda dos dragões. O que os dragões já não tinham em metal elemental, esses celestiais proveram por bênçãos e essência divinas. Com a natureza mudada, os dragões como espécie sobreviveram. Com o tempo, a proximidade do céu e das deidades a que servem passou a dar-lhes o nome. O passado como dragões de metal elemental tornou-se só memória desbotada e mito de criação para todos, salvo os próprios dragões do céu, lembrarem.",
    sections: [
      {
        id: "sky-dragon-spellcasters",
        title: "Conjuradores de dragão do céu",
        body: "Conjuradores de dragão do céu tendem a lançar as magias a seguir.\n\n### Dragão do Céu Jovem\n**Magias divinas preparadas** CD 28, ataque +20; **4º** _dispel magic_, _divine wrath_, _read omens_; **3º** _Mensagem Onírica_, _heroism_, _locate_; **2º** _augury_, _translate_, _create food_; **1º** _alarm_, _bless_, _sanctuary_; **Truques (4º)** _detect magic_, _divine lance_, _read aura_, _shield_, _Estabilizar_; **Rituais** CD 28; _consecrate_\n\n### Dragão do Céu Adulto\n**Magias divinas preparadas** CD 33, ataque +25; Como o dragão do céu jovem, mais **6º** _blessed boundary_, _spirit blast_, _truesight_; **5º** _banishment_, _scouting eye_, _truespeech_; **Truques (6º)** _detect magic_, _divine lance_, _read aura_, _shield_, _stabilize_; **Rituais** CD 33; _atone_\n\n### Dragão do Céu Ancião\n**Magias divinas preparadas** CD 40, ataque +32; Como o dragão do céu adulto, mais **8º** _canticle of everlasting grief_, _divine decree_, _Localizar_; **7º** _energy aegis_, _interplanar teleport_, _sunburst_; **Truques (9º)** _detect magic_, _divine lance_, _read aura_, _shield_, _stabilize_; **Rituais** CD 42; _collective memories_\n\n### Arquidragão do Céu\n**Magias divinas preparadas** CD 44, ataque +36; Como o dragão do céu ancião, mais **10º** _cataclysm_, _gate_; **9º** _falling stars_, _wrathful storm_; **Truques (10º)** _detect magic_, _divine lance_, _read aura_, _shield_, _stabilize_; **Rituais** CD 44",
      },
    ],
  }),
  fam({
    id: 'family-dragon-sovereign',
    name: "Dragão Soberano",
    originalName: "Dragon, Sovereign",
    trait: null,
    sourcePage: 167,
    source: 'Draconic Codex',
    aonUrl: "https://2e.aonprd.com/MonsterFamilies.aspx?ID=652",
    intro:
      "Não há explicação clara para por que os dragões soberanos são como são hoje. Alguns conjecturam que talvez tenha sido um pacto para cumprir ambição pessoal, para passar de incumbidos de escolher governantes a tornar-se os próprios governantes. Outros perguntam-se se as terras de Tian Xia foram corrompidas no passado, e os dragões da terra afastaram-se das naturezas elementais para salvar-se. Talvez também se tenham tornado dragões empíreos, mas então voltaram às terras dos mortais quando nenhum governante adequado subiu ao trono.",
    sections: [
      {
        id: "sovereign-dragon-spellcasters",
        title: "Conjuradores de dragão soberano",
        body: "Conjuradores de dragão soberano tendem a lançar as magias a seguir.\n\n### Dragão Soberano Jovem\n**Magias ocultistas preparadas** CD 30, ataque +22; **4º** _detect scrying_, _flicker_, _silence_; **3º** _enthrall_, _heroism_, _hypnotize_; **2º** _clear mind_, _status_, _translate_; **1º** _command_, _illusory disguise_, _sure strike_; **Truques (4º)** _daze_, _detect magic_, _prestidigitation_, _read aura_, _shield_\n\n### Dragão Soberano Adulto\n**Magias ocultistas preparadas** CD 36, ataque +28; Como o dragão soberano jovem, mais **6º** _dominate_, _never mind_, _zealous conviction_; **5º** _dreaming potential_, _subconscious suggestion_, _truespeech_; **Truques (6º)** _daze_, _detect magic_, _prestidigitation_, _read aura_, _shield_\n\n### Dragão Soberano Ancião\n**Magias ocultistas preparadas** CD 42, ataque +34; Como o dragão soberano adulto, mais **9º** _foresight_, _overwhelming presence_, _telepathic demand_; **8º** _disappearance_, _dream council_, _quandary_; **7º** _planar palace_, _planar seal_, _true target_; **Truques (9º)** _daze_, _detect magic_, _prestidigitation_, _read aura_, _shield_\n\n### Arquidragão Soberano\n**Magias ocultistas preparadas** CD 46, ataque +38; Como o dragão soberano ancião, mais **10º** _gate_, _indestructibility_; **Truques (10º)** _daze_, _detect magic_, _prestidigitation_, _read aura_, _shield_",
      },
    ],
  }),
  fam({
    id: 'family-dragon-stormcrown',
    name: "Dragão da Coroa-tempestade",
    originalName: "Dragon, Stormcrown",
    trait: null,
    sourcePage: 171,
    source: 'Draconic Codex',
    aonUrl: "https://2e.aonprd.com/MonsterFamilies.aspx?ID=653",
    intro:
      "Arautos de — e anunciados por — as forças primais do trovão e do relâmpago, dragões da coroa-tempestade fundem a majestade de tempestades ferozes e dragões poderosos. Movidos por emoção e curiosidade, esses dragões volúveis podem mudar de amigo a inimigo ou de ameaçadores a pensativos em meros instantes.",
    sections: [
      {
        id: "stormcrown-dragon-spellcasters",
        title: "Conjuradores de dragão da coroa-tempestade",
        body: "Stormcrown dragon spellcasters often cast the following spells.\n\n### Dragão da Coroa-tempestade Jovem\n**Magias primais preparadas** CD 28, ataque +20; **4º** _bestial curse_, _stifling stillness_; **3º** _blindness_, _haste_, _tempest cloak_; **2º** _deafness_, _mist_, _shatter_; **1º** _charm_, _create water_, _grease_; **Truques (4º)** _detect magic_, _electric arc_, _know the way_, _read aura_, _Estabilizar_\n\n### Dragão da Coroa-tempestade Adulto\n**Magias primais preparadas** CD 33, ataque +25; Como o dragão da coroa-tempestade jovem, mais **6º** _hydraulic torrent_, _truesight_; **5º** _control water_, _pressure zone_, _wisdom of the winds_; **4º** _zephyr slip_; **Truques (6º)** _detect magic_, _electric arc_, _know the way_, _read aura_, _stabilize_\n\n### Dragão da Coroa-tempestade Ancião\n**Magias primais preparadas** CD 40, ataque +32; Como o dragão da coroa-tempestade adulto, mais **8º** _heal_, _moment of renewal_, _punishing winds_; **7º** _mask of terror_, _regenerate_, _shock to the system_; **6º** _chain lightning_; **Truques (8º)** _detect magic_, _electric arc_, _know the way_, _read aura_, _stabilize_\n\n### Arquidragão da Coroa-tempestade\n**Magias primais preparadas** CD 44, ataque +36; Como o dragão da coroa-tempestade ancião, mais **10º** _indestructibility_, _manifestation_; **9º** _detonate magic_, _falling stars_, _implosion_; **Truques (10º)** _detect magic_, _electric arc_, _know the way_, _read aura_, _stabilize_",
      },
    ],
  }),
  fam({
    id: 'family-dragon-time',
    name: "Dragão do Tempo",
    originalName: "Dragon, Time",
    trait: null,
    sourcePage: 175,
    source: 'Draconic Codex',
    aonUrl: "https://2e.aonprd.com/MonsterFamilies.aspx?ID=655",
    intro:
      "Dragões do tempo são inimigos implacáveis dos sinistros cães de Tindalos, também habitantes da Dimensão do Tempo. Embora os cães de Tindalos também busquem impedir qualquer adulteração do fluxo do tempo, dragões do tempo caçam implacavelmente cada cão que encontram, apesar do aparente terreno comum entre eles. Nenhum dragão contou a razão dessa inimizade a forasteiros, mas eruditos especulam que dragões do tempo e cães de Tindalos talvez tenham opiniões diferentes e concorrentes sobre como o fluxo próprio do tempo deveria ser. Ocasionalmente, os perseguidos pelos cães são resgatados por dragões do tempo que surgem do nada para matar os perseguidores, embora isso não seja necessariamente um golpe de sorte se o dragão interveniente também se opuser às atividades deles.",
    sections: [
      {
        id: "time-dragon-spellcasters",
        title: "Conjuradores de dragão do tempo",
        body: "Conjuradores de dragão do tempo tendem a lançar as magias a seguir.\n\n### Dragão do Tempo Jovem\"\n**Magias arcanas preparadas** CD 30, ataque +22; **6º** _phantasmal calamity_, _truesight_; **5º** _banishment_, _invoke spirits_, _sending_; **4º** _flicker_, _unfettered movement_, _vision of death_; **3º** _enthrall_, _haste_, _temporal twin_; **2º** _blur_, _loose time's arrow_, _see the unseen_; **1º** _phantasmal minion_, _sure strike_ (×2); **Truques (6º)** _daze_, _detect magic_, _message_, _sigil_, _telekinetic hand_\n\n### Dragão do Tempo Adulto\n**Magias arcanas preparadas** CD 36, ataque +28; Como o dragão do tempo jovem, mais **8º** _disappearance_, _hidden mind_; **7º** _eclipse burst_, _planar palace_, _retrocognition_; **6º** _disintegrate_; **Truques (8º)** _daze_, _detect magic_, _message_, _sigil_, _telekinetic hand_\n\n### Dragão do Tempo Ancião\n**Magias arcanas preparadas** CD 42, ataque +34; Como o dragão do tempo adulto, mais **9º** _falling stars_, _metamorphosis_, _foresight_; **8º** _disintegrate_; **Truques (9º)** _daze_, _detect magic_, _message_, _sigil_, _telekinetic hand_\n\n### Arquidragão do Tempo\n**Magias arcanas preparadas** CD 46, ataque +38; Como o dragão do tempo adulto, mais **10º** _remake_, _revival_; **Truques (10º)** _daze_, _detect magic_, _message_, _sigil_, _telekinetic hand_",
      },
    ],
  }),
  fam({
    id: 'family-dragon-umbral',
    name: "Dragão Umbral",
    originalName: "Dragon, Umbral",
    trait: null,
    sourcePage: 179,
    source: 'Draconic Codex',
    aonUrl: "https://2e.aonprd.com/MonsterFamilies.aspx?ID=656",
    intro:
      "Histórias por todo Golarion advertem as crianças sobre os monstros que habitam as sombras, mas nenhuma história captura a realidade do dragão umbral. Nativos do Mundo Inferior, esses dragões ocultos estão em casa na escuridão, usando-a a seu favor tanto dentro quanto fora da batalha. Dragões umbrais raramente se preocupam em lutar de modo justo, emergindo do esconderijo para golpear inimigos desatentos e usando o sopro mágico sem escrúpulo. De modo semelhante, em situações sociais, muitas vezes permanecem nas sombras, operando por outras criaturas. Mesmo em conversa direta, frequentemente obscurecem a verdadeira intenção, preferindo nunca ser encurralados com uma resposta sólida.",
    sections: [
      {
        id: "umbral-dragon-spellcasters",
        title: "Conjuradores de dragão umbral",
        body: "Conjuradores de dragão umbral tendem a lançar as magias a seguir.\n\n### Dragão Umbral Jovem\n**Magias ocultistas preparadas** CD 30, ataque +22; **5º** _dispel magic_, _shadow blast_; **4º** _nightmare_, _vision of death_, _whispers of the void_; **3º** _dispel magic_, _bind undead_, _veil of privacy_; **2º** _humanoid form_, _paranoia_, _reaper's lantern_; **1º** _grim tendrils_, _disguise magic_, _fear_; **Truques (5º)** _figment_, _know the way_, _light_, _sigil_, _void warp_\n\n### Dragão Umbral Adulto\n**Magias ocultistas preparadas** CD 36, ataque +28; Como o dragão umbral jovem, mais **7º** _interplanar teleport_, _shadow blast_; **6º** _paranoia_, _scintillating safeguard_, _truesight_; **5º** _slither_; **Truques (7º)** _figment_, _know the way_, _light_, _sigil_, _void warp_\n\n### Dragão Umbral Ancião\n**Magias ocultistas preparadas** CD 42, ataque +34; Como o dragão umbral adulto, mais **9º** _shadow blast_, _wails of the damned_; **8º** _canticle of everlasting grief_, _mask of terror_, _pinpoint_; **7º** _execute_; **Truques (9º)** _figment_, _know the way_, _light_, _sigil_, _void warp_\n\n### Arquidragão Umbral\n**Magias ocultistas preparadas** CD 46, ataque +38; Como o dragão umbral ancião, mais **10º** _indestructibility_, _manifestation_; **9º** _overwhelming presence_; **Truques (10º)** _figment_, _know the way_, _light_, _sigil_, _void warp_",
      },
    ],
  }),
  fam({
    id: 'family-dragon-underworld',
    name: "Dragão do Submundo",
    originalName: "Dragon, Underworld",
    trait: null,
    sourcePage: 183,
    source: 'Draconic Codex',
    aonUrl: "https://2e.aonprd.com/MonsterFamilies.aspx?ID=657",
    intro:
      "Dragões do submundo fazem os lares perto de falhas geológicas, vulcões ativos ou dormentes e regiões com atividade sísmica natural. Locais com fontes termais e fumarolas são particularmente populares, pois fornecem muitos ingredientes alquímicos e mágicos. Além de câmaras-fortes abarrotadas de tesouro, os covis de dragões do submundo também são laboratórios, dedicados a desvendar segredos de cultivo, elementos, magia e quaisquer outros mistérios de interesse. Várias famílias de dragões do submundo operam tais laboratórios há dezenas de milhares de anos.",
    sections: [
      {
        id: "underworld-dragon",
        title: "Dragão do Submundo",
        body: "Conjuradores de dragão do submundo tendem a lançar as magias a seguir.\n\n### Dragão do Submundo Jovem\n**Magias arcanas preparadas** CD 25, ataque +17; **3º** _earthbind_, _fireball_; **2º** _knock_, _revealing light_, _resist energy_; **1º** _carryall_, _enfeeble_, _force barrage_; **Truques (3º)** _caustic blast_, _ignition_, _read aura_, _shield_, _telekinetic hand_\n\n### Dragão do Submundo Adulto\n**Magias arcanas preparadas** CD 30, ataque +22; Como o dragão do submundo jovem, mais **5º** _scouting eye_, _toxic cloud_; **4º** _mirage_, _peaceful bubble_, _translocate_; **3º** _slow_; **Truques (5º)** _caustic blast_, _ignition_, _read aura_, _shield_, _telekinetic hand_\n\n### Dragão do Submundo Ancião\n**Magias arcanas preparadas** CD 37, ataque +29; Como o dragão do submundo adulto, mais **7º** _energy aegis_, _fiery body_, _mask of terror_; **6º** _mislead_, _spellwrack_, _truesight_; **5º** _mind probe_; **Truques (7º)** _caustic blast_, _ignition_, _read aura_, _shield_, _telekinetic hand_\n\n### Arquidragão do Submundo\n**Magias arcanas preparadas** CD 41, ataque +33; Como o dragão do submundo ancião, mais **10º** _cataclysm_, _remake_; **9º** _detonate magic_, _metamorphosis_; **Truques (10º)** _caustic blast_, _ignition_, _read aura_, _shield_, _telekinetic hand_",
      },
    ],
  }),
  fam({
    id: 'family-dragon-vizier',
    name: "Dragão Vizir",
    originalName: "Dragon, Vizier",
    trait: null,
    sourcePage: 187,
    source: 'Draconic Codex',
    aonUrl: "https://2e.aonprd.com/MonsterFamilies.aspx?ID=658",
    intro:
      "Dragões vizires preocupam-se sobretudo com a educação e o cultivo das pessoas. Pessoas fascinam dragões vizires em toda a complexidade tumultuosa e contraditória. Por que alguns se destacam, e outros titubeiam e fracassam? Por que uma pessoa torna-se santa e a seguinte, uma tirana? Por que alguns tornam-se lendas no próprio tempo, enquanto outros labutam na ignomínia?",
    sections: [
      {
        id: "vizier-dragon-spellcasters",
        title: "Conjuradores de dragão vizir",
        body: "Conjuradores de dragão vizir tendem a lançar as magias a seguir.\n\n### Dragão Vizir Jovem\n**Magias ocultistas preparadas** CD 30, ataque +22; **4º** _confusion_, _honeyed words_, _nightmare_; **3º** _enthrall_, _locate_, _ring of truth_; **2º** _clear mind_, _dispel magic_, _sound body_; **1º** _mindlink_, _sanctuary_, _spirit link_; **Truques (4º)** _figment_, _guidance_, _message_, _prestidigitation_, _sigil_\n\n### Dragão Vizir Adulto\n**Magias ocultistas preparadas** CD 36, ataque +28; Como o dragão vizir jovem, mais **6º** _mislead_, _never mind_, _wall of force_; **5º** _banishment_, _sending_, _subconscious suggestion_; **Truques (6º)** _figment_, _guidance_, _message_, _prestidigitation_, _sigil_\n\n### Dragão Vizir Ancião\n**Magias ocultistas preparadas** CD 42, ataque +34; Como o dragão vizir adulto, mais **9º** _foresight_, _overwhelming presence_, _phantasmagoria_; **8º** _hidden mind_, _quandary_, _unrelenting observation_; **7º** _energy aegis_, _project image_, _true target_; **Truques (9º)** _figment_, _guidance_, _message_, _prestidigitation_, _sigil_\n\n### Arquidragão Vizir\n**Magias ocultistas preparadas** CD 46, ataque +38; Como o dragão vizir ancião, mais **10º** _fabricated truth_, _revival_; **9º** _resplendent mansion_; **Truques (10º)** _figment_, _guidance_, _message_, _prestidigitation_, _sigil_",
      },
    ],
  }),
  fam({
    id: 'family-dragon-vorpal',
    name: "Dragão Vorpal",
    originalName: "Dragon, Vorpal",
    trait: null,
    sourcePage: 191,
    source: 'Draconic Codex',
    aonUrl: "https://2e.aonprd.com/MonsterFamilies.aspx?ID=659",
    intro:
      "Dragões vorpais são mais notórios pela magia _vorpal_ afiada. Até o menor desses dragões pode decepar a cabeça de um inimigo num único golpe de sorte. De modo incomum, porém, o alvo sobrevive como criatura bipartida: um corpo sem cabeça controlado por uma cabeça destacada que ainda pensa e fala, e que pode sobreviver à destruição do dito corpo. Não é incomum que aspirantes a matadores de dragões sejam mandados para casa carregando as próprias cabeças debaixo de um braço como lição de humildade. Os mais azarados, infelizmente, podem ser guardados como troféus — e, num sentido bem literal, peças de conversa — enquanto o dragão devora a porção maior. Alguns até usam as cabeças decepadas favoritas como um colar macabro.",
    sections: [
      {
        id: "vorpal-dragon-spellcasters",
        title: "Conjuradores de dragão vorpal",
        body: "Conjuradores de dragão vorpal tendem a lançar as magias a seguir.\n\n### Dragão Vorpal Jovem\n**Magias arcanas preparadas** CD 28, ataque +20; **4º** _clairvoyance_, _unfettered movement_; **3º** _clairaudience_, _mending_, _slow_; **2º** _create food_, _revealing light_, _ventriloquism_; **1º** _alarm_, _sure strike_ (×2); ****Truques (4º)** _detect magic_, _live wire_, _message_, _read aura_, _telekinetic hand_\n\n### Dragão Vorpal Adulto\n**Magias arcanas preparadas** CD 35, ataque +27; Como o dragão vorpal jovem, mais **6º** _enlarge_, _slow_; **5º** _impaling spike_, _thoughtful gift_, _wave of despair_; **4º** _illusory disguise_; **Truques (6º)** _detect magic_, _live wire_, _message_, _read aura_, _telekinetic hand_\n\n### Dragão Vorpal Ancião\n**Magias arcanas preparadas** CD 40, ataque +32; Como o dragão vorpal adulto, mais **8º** _arctic rift_, _dream council_, _unrelenting observation_; **7º** _haste_, _spell riposte_, _true target_; **6º** _create food_; **Truques (8º)** _detect magic_, _live wire_, _message_, _read aura_, _telekinetic hand_\n\n### Arquidragão Vorpal\n**Magias arcanas preparadas** CD 44, ataque +36; Como o dragão vorpal ancião, mais **10º** _falling stars_, _manifestation_; **9º** _detonate magic_, _magnetic dominion_, _phantasmagoria_; **Truques (10º)** _detect magic_, _live wire_, _message_, _read aura_, _telekinetic hand_",
      },
    ],
  }),
  fam({
    id: 'family-dragon-wailing',
    name: "Dragão Uivante",
    originalName: "Dragon, Wailing",
    trait: null,
    sourcePage: 195,
    source: 'Draconic Codex',
    aonUrl: "https://2e.aonprd.com/MonsterFamilies.aspx?ID=660",
    intro:
      "Astutos, pacientes e criativos, dragões uivantes são adeptos do som e da psicologia. Com a fisiologia e a conexão inata à magia arcana permitindo-lhes produzir e moldar ondas sonoras, essas criaturas reclusas são ouvidas com bem mais frequência do que vistas. Nomeados pela tendência a usar vocalizações agudas e inquietantes para comunicar-se a longas distâncias e sobressaltar a presa, dragões uivantes assombram locais que criam ecos interessantes ou úteis, como cânions ou cavernas. Embora predadores impiedosos quando preciso, a maioria dedica a energia a investigar os efeitos do som no ambiente e nos corpos e mentes das criaturas.",
    sections: [
      {
        id: "wailing-dragon-spellcasters",
        title: "Conjuradores de dragão uivante",
        body: "Conjuradores de dragão uivante tendem a lançar as magias a seguir.\n\n### Dragão Uivante Jovem\n**Magias arcanas preparadas** CD 24, ataque +16; **3º** _clairaudience_, _translate_, _wall of wind_; **2º** _dispel magic_, _mist_, _translate_; **1º** _command_, _sure strike_, _tailwind_; **Truques (3º)** _bullhorn_, _detect magic_, _haunting hymn_, _read aura_, _sigil_\n\n### Dragão Uivante Adulto\n**Magias arcanas preparadas** CD 29, ataque +21; Como o dragão uivante jovem, mais **5º** _banishment_, _confusing cry_, _truespeech_; **4º** _dispel magic_, _Selar o Destino_, _whispers of the void_; **Truques (5º)** _bullhorn_, _detect magic_, _haunting hymn_, _read aura_, _sigil_\n\n### Dragão Uivante Ancião\n**Magias arcanas preparadas** CD 36, ataque +28; Como o dragão uivante adulto, mais **8º** _canticle of everlasting grief_, _spirit song_; **7º** _contingency_, _energy aegis_, _spell riposte_; **6º** _phantom orchestra_, _repulsion_, _whispers of the void_; **Truques (8º)** _bullhorn_, _detect magic_, _haunting hymn_, _read aura_, _sigil_\n\n### Arquidragão Uivante\n**Magias arcanas preparadas** CD 40, ataque +32; Como o dragão uivante ancião, mais **9º** _massacre_, _metamorphosis_, _phantom orchestra_; **8º** _uncontrollable dance_; **Truques (9º)** _bullhorn_, _detect magic_, _haunting hymn_, _read aura_, _sigil_",
      },
    ],
  }),
  fam({
    id: 'family-dragon-wish',
    name: "Dragão dos Desejos",
    originalName: "Dragon, Wish",
    trait: null,
    sourcePage: 199,
    source: 'Draconic Codex',
    aonUrl: "https://2e.aonprd.com/MonsterFamilies.aspx?ID=661",
    intro:
      "O que é um desejo? Um dragão dos desejos chamaria isso a expressão mais verdadeira do eu — cada desejo individual revela algo de importância profunda para quem deseja, e nunca dois desejos são exatamente iguais. Seja o desejo de criação ou destruição, justiça ou vingança, amor ou ódio, dragões dos desejos buscam entender o que o torna importante para quem deseja e encaram a habilidade de torná-lo realidade como um dom que os ajuda a dar sentido ao mundo.",
    sections: [
      {
        id: "wish-dragon-spellcasters",
        title: "Conjuradores de dragão dos desejos",
        body: "Conjuradores de dragão dos desejos tendem a lançar as magias a seguir.\n\n### Dragão dos Desejos Jovem\n**Magias arcanas preparadas** CD 29; ataque +21; **4º** _confusion_, _suggestion_, _translocate_; **3º** _earthbind_, _lightning bolt_, _mind reading_; **2º** _charitable urge_, _phantasmal treasure_, _revealing light_; **1º** _déjà vu_, _force barrage_, _item facade_; **Truques (4º)** _bullhorn_, _daze_, _figment_, _light_, _telekinetic hand_\n\n### Dragão dos Desejos Adulto\n**Magias arcanas preparadas** CD 34; ataque +26; Como o dragão dos desejos jovem, mais **6º** _cursed metamorphosis_, _never mind_, _scrying_; **5º** _hallucination_, _magic passage_, _subconscious suggestion_; **Truques (6º)** _bullhorn_, _daze_, _figment_, _light_, _telekinetic hand_\n\n### Dragão dos Desejos Ancião\n**Magias arcanas preparadas** CD 41; ataque +33; Como o dragão dos desejos adulto, mais **8º** _confusing colors_, _dream council_, _uncontrollable dance_; **7º** _duplicate foe_, _mask of terror_, _true target_; **Truques (8º)** _bullhorn_, _daze_, _figment_, _light_, _telekinetic hand_\n\n### Arquidragão dos Desejos\n**Magias arcanas preparadas** CD 45; ataque +37; Como o dragão dos desejos adulto, mais **10º** _manifestation_, _remake_; **9º** _foresight_, _phantasmagoria_, _resplendent mansion_; **Truques (10º)** _bullhorn_, _daze_, _figment_, _light_, _telekinetic hand_",
      },
    ],
  }),
  fam({
    id: 'family-wyrmwraith',
    name: "Wyrmwraith",
    originalName: "Wyrmwraith",
    trait: null,
    sourcePage: 202,
    source: 'Draconic Codex',
    aonUrl: "https://2e.aonprd.com/MonsterFamilies.aspx?ID=662",
    intro:
      "Wyrmwraiths habitam áreas remotas marcadas por catástrofes e morte, onde podem melhor esconder a natureza morta-viva ou entregar-se à pesquisa sombria. Os covis muitas vezes têm uma única antecâmara oculta e altamente defensável onde o wyrmwraith se reúne com os agentes enquanto trava uma guerra com rivais distantes por meio de intermediários descartáveis. Essa antecâmara mal iluminada em geral está cheia de morte e muitos servos mortos-vivos, alguns erguidos dos corpos daqueles cuja utilidade chegou ao fim.",
    sections: [

    ],
  })
]
