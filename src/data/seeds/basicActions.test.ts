import { describe, test } from 'node:test'
import assert from 'node:assert/strict'
import { BASIC_ACTIONS } from './basicActions.ts'
import {
  ACTION_GROUP_ORDER,
  ACTION_GROUPS_HIDDEN_BY_DEFAULT,
} from '@/types/action.ts'

const PDF_ORIGINALS = [
  'Strike',
  'Feint',
  'Escape',
  'Grapple',
  'Shove',
  'Trip',
  'Disarm',
  'Cast a Spell',
  'Dismiss',
  'Sustain',
  'Identify Spell',
  'Recognize Spell',
  'Avert Gaze',
  'Take Cover',
  'Raise a Shield',
  'Shield Block',
  'Delay',
  'Ready',
  'Create a Diversion',
  'Bon Mot',
  'Demoralize',
  'Seek',
  'Point Out',
  'Hide',
  'Sneak',
  'Conceal an Object',
  'Palm an Object',
  'Steal',
  'Lie',
  'Sense Motive',
  'Stride',
  'Step',
  'Tumble Through',
  'Drop Prone',
  'Crawl',
  'Stand',
  'Leap',
  'High Jump',
  'Long Jump',
  'Swim',
  'Climb',
  'Balance',
  'Grab an Edge',
  'Arrest a Fall',
  'Maneuver in Flight',
  'Interact',
  'Release',
  'Activate an Item',
  'Trick Magic Item',
  'Invest an Item',
  'Disable a Device',
  'Pick a Lock',
  'Force Open',
  'Administer First Aid',
  'Battle Medicine',
  'Treat Wounds',
  'Treat Poison',
  'Treat Disease',
  'Aid',
  'Recall Knowledge',
  'Request',
  'Perform',
  'Command an Animal',
  'Mount',
  'Follow the Expert',
  'Refocus',
  'Repair',
  'Coerce',
  'Gather Information',
  'Make an Impression',
  'Hustle',
  'Squeeze',
  'Avoid Notice',
  'Cover Tracks',
  'Track',
  'Defend',
  'Repeat a Spell',
  'Scout',
  'Investigate',
  'Search',
  'Detect Magic',
  'Affix a Talisman',
  'Call Companion',
  'Decipher Writing',
  'Identify Alchemy',
  'Identify Magic',
  'Impersonate',
  'Pursue a Lead',
  'Sense Direction',
  'Borrow an Arcane Spell',
  'Learn a Spell',
  'Craft',
  'Earn Income',
  'Subsist',
  'Long-Term Rest',
  'Create Forgery',
  'Retraining',
  'Influence',
  'Discover',
  'Research',
  'Gossip',
  'Gain Contact',
  'Bribe Contact',
  'Scout Location',
  'Forge Documents',
  'Secure Disguises',
]

describe('catálogo de ações da ficha', () => {
  test('ids únicos e grupo válido', () => {
    const ids = BASIC_ACTIONS.map((action) => action.id)
    assert.equal(new Set(ids).size, ids.length)
    for (const action of BASIC_ACTIONS) {
      assert.ok(
        ACTION_GROUP_ORDER.includes(action.group),
        `${action.id} grupo inválido`,
      )
      assert.ok(action.name.trim().length > 0)
      assert.notEqual(action.name, action.name.toUpperCase())
    }
  })

  test('cobre as ações do cheatsheet em pt-BR', () => {
    const byOriginal = new Map(
      BASIC_ACTIONS.map((action) => [action.originalName.toLowerCase(), action]),
    )
    const missing = PDF_ORIGINALS.filter(
      (name) => !byOriginal.has(name.toLowerCase()),
    )
    assert.deepEqual(missing, [])

    const strike = byOriginal.get('strike')
    assert.equal(strike?.name, 'Golpear')
    assert.equal(byOriginal.get('grapple')?.name, 'Agarrar')
    assert.equal(byOriginal.get('treat wounds')?.name, 'Tratar Ferimentos')
    assert.equal(byOriginal.get('tumble through')?.group, 'movement')
    assert.equal(byOriginal.get('battle medicine')?.featRequired, true)
  })

  test('exploração e intervalo começam ocultos; combate não', () => {
    assert.ok(ACTION_GROUPS_HIDDEN_BY_DEFAULT.includes('exploration'))
    assert.ok(ACTION_GROUPS_HIDDEN_BY_DEFAULT.includes('downtime'))
    assert.equal(ACTION_GROUPS_HIDDEN_BY_DEFAULT.includes('movement'), false)
    assert.equal(ACTION_GROUPS_HIDDEN_BY_DEFAULT.includes('medicine'), false)
  })
})
