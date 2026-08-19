import type { CreatureFamily } from '@/types/creature'

function fam(
  partial: Omit<CreatureFamily, 'source'> & { source?: string },
): CreatureFamily {
  return { source: partial.source ?? 'Pathfinder #212: A Voice in the Blight', ...partial }
}

/**
 * Famílias AoN Monster Families de Spore War (#210–212).
 * Asides = barras laterais oficiais da página da família. Sem blurb de membro.
 */
export const catalogCreatureFamiliesSporeWar: CreatureFamily[] = [
  fam({
    id: 'family-blight',
    name: 'Praga',
    originalName: 'Blight',
    trait: null,
    source: 'Pathfinder #212: A Voice in the Blight',
    sourcePage: 84,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=561',
    intro: `Pragas são corrupções da fúria da natureza.

Todas as pragas possuem as seguintes habilidades. **Dominação da Praga** Todas as pragas podem conjurar _dominar_ como magia inata primordial, mas só podem visar animais, feras, fungos, gosmas ou plantas localizados dentro do domínio amaldiçoado. Se uma criatura dominada por essa magia sair do domínio amaldiçoado, os efeitos de _dominar_ terminam imediatamente, mas enquanto a criatura dominada permanecer no domínio amaldiçoado, a duração é ilimitada. Quando uma praga visa um fungo, gosma ou planta sem mente, a magia _dominar_ perde o traço mental.

**Domínio Amaldiçoado** (maldição, primordial) Uma vez por ano, quando estiver num terreno compatível com seu tipo (como um pântano para uma praga do pântano), a praga pode infundir a terra ao redor com sua essência corrompida ao realizar um rito que leva um dia. A região num raio de 8 km torna-se seu domínio amaldiçoado; esse efeito não se estende a terreno incompatível e não se move com a praga. O ponto em que a praga amaldiçoou o domínio torna-se o epicentro. Dentro do domínio amaldiçoado, uma praga ignora todo terreno difícil não mágico e sempre ganha os benefícios da ação Cobrir Rastros. Pragas também têm um sentido impreciso para a localização de todas as criaturas dentro do domínio e podem se comunicar com todas as criaturas sencientes que detectarem no domínio usando telepatia. O domínio amaldiçoado de cada praga tem propriedades adicionais específicas do tipo. Uma praga fora de um domínio amaldiçoado fica com lentidão 1 até retornar ao próprio domínio ou ao de outra praga. Remover essa maldição exige um personagem com o feito Quebrar Maldição (ou habilidade semelhante); essa atividade deve ser realizada no epicentro do domínio amaldiçoado. Se a praga que amaldiçoou o domínio estiver morta, testes para contrapor um domínio amaldiçoado ganham um bônus de circunstância de +4.

**Supervisionar Domínio** (concentração, primordial) A praga projeta os sentidos para qualquer ponto do domínio amaldiçoado, ganhando um sentido preciso do entorno num raio de 150 m até o fim do próximo turno. Uma praga pode conjurar _dominar_ por esse vínculo sensorial. Uma praga pode Sustentar essa habilidade, mas não pode usá-la para estender os sentidos além das bordas do domínio.

**Rejuvenescimento** (primordial) Se uma praga for morta dentro do domínio amaldiçoado, o corpo derrete no ambiente ao redor e uma nova praga do mesmo tipo se forma espontaneamente em 1d10 dias no epicentro do domínio amaldiçoado, a menos que a maldição seja removida antes. A nova praga retém todas as memórias da praga anterior.`,
    sections: [
      {
        id: 'additional-information',
        title: 'Informações Adicionais',
        body: 'O artigo “Corruptores da Natureza”, que começa na página 76 deste volume, apresenta muito mais informações sobre a ecologia das pragas, a sociedade e os domínios delas, além de notas sobre outros tipos de praga além da praga do pântano.',
      },
    ],
  }),
  fam({
    id: 'family-cliftwood-fiend',
    name: 'Corruptor de Cliftwood',
    originalName: 'Cliftwood Fiend',
    trait: null,
    source: 'Pathfinder #212: A Voice in the Blight',
    sourcePage: 84,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=562',
    intro:
      'Corruptores de cleftwood misturam as propriedades de demônios e elementais da madeira, os corpos de madeira distorcidos por nós, podridão e crescimentos fúngicos. Eruditos planares debatem em qual categoria os corruptores de cleftwood se encaixam melhor, mas para os próprios cleftwoods não há dúvida — sentem-se muito mais em casa nas Fendas Exteriores do que no Plano da Madeira.',
    sections: [
      {
        id: 'demonic-elementals',
        title: 'Elementais Demoníacos',
        body: 'Corruptores de cleftwood não são demônios nem elementais verdadeiros, mas possuem os dois traços de criatura. Como não se formam de almas pecaminosas, não têm a vulnerabilidade típica ao pecado que a maioria dos demônios possui e, como têm seiva semelhante a sangue, não têm a imunidade típica a sangramento que a maioria dos elementais possui.',
      },
      {
        id: 'other-cleftwood-fiends',
        title: 'Outros Corruptors de Cleftwood',
        body: 'Trituradores da fenda e segundas crias são os únicos tipos de corruptor de cleftwood atualmente ativos em Tanglebriar, mas outros existem nas Fendas Exteriores, sobretudo no reino de Jeharlu. Ali, pode-se encontrar o dente-lasca semelhante a um toco que bebe sangue, o jardineiro praga humanóide conjurador de magia primordial, ou o horror enorme da queda-mortal.',
      },
    ],
  }),
]
