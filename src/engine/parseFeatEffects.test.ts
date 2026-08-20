import { test, describe } from 'node:test'
import assert from 'node:assert/strict'
import type { Feat } from '@/types/feat'
import {
  effectsForFeat,
  parseFeatDescriptionEffects,
} from './parseFeatEffects.ts'
import { applyFeatEffects } from './featEffects.ts'

function stubFeat(partial: Partial<Feat> & Pick<Feat, 'id' | 'description'>): Feat {
  return {
    name: partial.name ?? 'Teste',
    originalName: partial.originalName ?? 'Test',
    level: partial.level ?? 2,
    category: partial.category ?? 'archetype',
    archetypeId: partial.archetypeId ?? 'archetype-test',
    traits: partial.traits ?? ['Arquétipo'],
    rarity: partial.rarity ?? 'common',
    provenance: partial.provenance ?? { type: 'official' },
    ...partial,
  }
}

describe('parseFeatDescriptionEffects', () => {
  test('lê escolha de perícia em inglês', () => {
    const feat = stubFeat({
      id: 'feat-fighter-dedication',
      description:
        'You become trained in martial weapons. You become trained in your choice of Acrobatics or Athletics; if you are already trained in both of these skills, you instead become trained in a skill of your choice.',
    })
    const skills = parseFeatDescriptionEffects(feat).filter(
      (e) => e.kind === 'skillRankChoice',
    )
    assert.equal(skills.length, 1)
    const primeiro = skills[0]
    assert.deepEqual(
      primeiro?.kind === 'skillRankChoice' ? primeiro.skillOptions : null,
      ['acrobatics', 'athletics'],
    )
  })

  test('lê perito em duas perícias', () => {
    const feat = stubFeat({
      id: 'feat-archaeologist-dedication',
      description: 'Você fica perito em Sociedade e Ladroagem.',
    })
    const ranks = parseFeatDescriptionEffects(feat)
      .filter((e) => e.kind === 'skillRank')
      .map((e) => (e.kind === 'skillRank' ? `${e.skillId}:${e.rank}` : ''))
      .sort()
    assert.deepEqual(ranks, ['society:expert', 'thievery:expert'])
  })

  test('se já treinado, sobe para perito em vez de trocar perícia', () => {
    const feat = stubFeat({
      id: 'feat-linguist-dedication',
      description:
        'Fica treinado em Sociedade; se já era treinado, fica perito.',
    })
    const effect = parseFeatDescriptionEffects(feat).find(
      (e) => e.kind === 'skillRank',
    )
    assert.equal(effect?.kind, 'skillRank')
    if (effect?.kind !== 'skillRank') return
    assert.equal(effect.skillId, 'society')
    assert.equal(effect.bumpIfAlready, true)
    assert.equal(effect.replaceIfTrained, false)
  })

  test('lê Fortitude mestre e Percepção mestre', () => {
    const fort = parseFeatDescriptionEffects(
      stubFeat({
        id: 'feat-barbarian-juggernauts-fortitude',
        description: 'Sua proficiência em salvaguardas de Fortitude sobe para mestre.',
      }),
    )
    assert.deepEqual(
      fort.filter((e) => e.kind === 'saveRank'),
      [{ kind: 'saveRank', save: 'fortitude', rank: 'master' }],
    )
    const perc = parseFeatDescriptionEffects(
      stubFeat({
        id: 'feat-gunslinger-eagle-eye',
        description: 'Fica mestre em Percepção.',
      }),
    )
    assert.deepEqual(
      perc.filter((e) => e.kind === 'perceptionRank'),
      [{ kind: 'perceptionRank', rank: 'master' }],
    )
  })

  test('Acrobacia ou Atletismo vira escolha, não as duas', () => {
    const feat = stubFeat({
      id: 'feat-choice',
      description: 'Fica treinado em Acrobacia ou Atletismo.',
    })
    const effects = parseFeatDescriptionEffects(feat)
    assert.equal(effects.filter((e) => e.kind === 'skillRank').length, 0)
    const choice = effects.find((e) => e.kind === 'skillRankChoice')
    assert.equal(choice?.kind, 'skillRankChoice')
    if (choice?.kind !== 'skillRankChoice') return
    assert.deepEqual(choice.skillOptions, ['acrobatics', 'athletics'])
  })
})

describe('effectsForFeat', () => {
  test('efeito explícito de arma não apaga perícia lida do texto', () => {
    const feat = stubFeat({
      id: 'feat-mix',
      description: 'You become trained in Acrobatics. You become trained in martial weapons.',
      effects: [{ kind: 'attackRank', categories: ['martial'], rank: 'trained' }],
    })
    const merged = effectsForFeat(feat)
    assert.ok(
      merged.some((e) => e.kind === 'skillRank' && e.skillId === 'acrobatics'),
    )
    assert.ok(merged.some((e) => e.kind === 'attackRank'))
  })

  test('infere conjuração básica pelo nome do feito', () => {
    const feat = stubFeat({
      id: 'feat-wizard-basic-spellcasting',
      name: 'Conjuração Básica de Mago',
      originalName: 'Basic Wizard Spellcasting',
      archetypeId: 'archetype-wizard',
      description: 'You gain the basic spellcasting benefits.',
    })
    const merged = effectsForFeat(feat)
    const tier = merged.find((e) => e.kind === 'spellcastingTier')
    assert.deepEqual(tier, {
      kind: 'spellcastingTier',
      sourceId: 'spellcasting-wizard-archetype',
      tier: 'basic',
    })
  })
})

describe('applyFeatEffects textChoice', () => {
  test('escolha de estudo aplica lore ou perícia', () => {
    const feat = stubFeat({
      id: 'feat-oatia-skysage-dedication',
      description: 'Treinado em Conhecimento de Astronomia ou perito em Ocultismo.',
      effects: [
        {
          kind: 'textChoice',
          choiceId: 'study',
          options: [
            {
              id: 'astronomy-lore',
              label: 'Astronomia',
              effects: [{ kind: 'lore', loreName: 'Astronomia', rank: 'trained' }],
            },
            {
              id: 'occultism-expert',
              label: 'Ocultismo',
              effects: [
                { kind: 'skillRank', skillId: 'occultism', rank: 'expert' },
              ],
            },
          ],
        },
      ],
    })
    const lore = applyFeatEffects({
      feats: [feat],
      level: 2,
      attrMap: {
        strength: 0,
        dexterity: 0,
        constitution: 0,
        intelligence: 0,
        wisdom: 0,
        charisma: 0,
      },
      featChoices: { 'feat-oatia-skysage-dedication:study': 'astronomy-lore' },
    })
    assert.equal(lore.lores[0]?.name, 'Astronomia')
    assert.equal(lore.skillRanks.occultism, undefined)

    const occult = applyFeatEffects({
      feats: [feat],
      level: 2,
      attrMap: {
        strength: 0,
        dexterity: 0,
        constitution: 0,
        intelligence: 0,
        wisdom: 0,
        charisma: 0,
      },
      featChoices: { 'feat-oatia-skysage-dedication:study': 'occultism-expert' },
    })
    assert.equal(occult.skillRanks.occultism, 'expert')
    assert.equal(occult.lores.length, 0)
  })
})
