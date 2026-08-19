import type { CreatureFamily } from '@/types/creature'

function fam(
  partial: Omit<CreatureFamily, 'source'> & { source?: string },
): CreatureFamily {
  return { source: partial.source ?? 'Pathfinder #206: Bring the House Down', ...partial }
}

/**
 * Famílias AoN Monster Families de Curtain Call (#204–206).
 * Asides = barras laterais oficiais da página da família. Sem blurb de membro.
 */
export const catalogCreatureFamiliesCurtainCall: CreatureFamily[] = [
  fam({
    id: 'family-palinthanos',
    name: 'Palinthanos',
    originalName: 'Palinthanos',
    trait: null,
    source: 'Pathfinder #206: Bring the House Down',
    sourcePage: 86,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=556',
    intro:
      'Quando um evento cósmico como a Chuva dos Deuses perturba tudo o que existe, o Rio das Almas às vezes flui para trás por um breve instante — literalmente, pelo choque da onda. Almas relutantes e confusas forçadas a recuar o bastante podem sofrer a agonia de atravessar a morte em tempo invertido. Algumas dessas almas conseguem reentrar no rio quando o fluxo volta ao normal, mas as que ficam encalhadas nas margens metafóricas dos vivos podem tornar-se palinthanos: mortos-vivos poderosos nascidos de seu fim invertido, que lutam em vão até o banimento predestinado de volta ao Rio.',
    sections: [
      {
        id: 'backward-time',
        title: 'Tempo Invertido',
        body: 'Os movimentos de um palinthanos muitas vezes parecem contraintuitivos aos sentidos, como se alguma força invisível do futuro não visto agisse sobre eles. Por exemplo, feridas criadas pelos ataques de palinthanos tendem a aparecer nos corpos fora de sincronia com o golpe que as inflige, manifestando-se uma fração de segundo antes de o ataque acertar. Onde quer que apareçam, é como se duas correntes de tempo colidissem e fluíssem em sentidos opostos, e o Universo fizesse o possível para dar sentido a isso.',
      },
    ],
  }),
]
