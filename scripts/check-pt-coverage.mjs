/**
 * Verifica se sobrou texto em inglês no que o usuário vê.
 *
 *   npm run check:pt
 *
 * Lê os seeds como texto (sem bundler) e aplica os mesmos mapas de tradução
 * que a UI usa. Sai com código 1 se achar algo, para poder entrar em CI.
 *
 * Por que existe: o glossário automático troca termos soltos ("Strike" →
 * "Golpe") dentro de frases em inglês. Um teste que só verifique "a tradução
 * mudou o texto?" passa mesmo com a descrição inteira em inglês.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const seedsDir = path.resolve(__dirname, '../src/data/seeds')
const i18nDir = path.resolve(__dirname, '../src/data/i18n')

/** Palavras inequivocamente inglesas — sem colisão com português. */
const EN_ONLY = new Set([
  'you', 'your', 'yours', 'the', 'and', 'with', 'when', 'make', 'makes',
  'gain', 'gains', 'this', 'that', 'these', 'those', 'if', 'have', 'has',
  'they', 'their', 'them', 'its', 'from', 'can', 'must', 'which',
  'attack', 'damage', 'target', 'creature', 'enemy', 'ally', 'allies',
  'round', 'turn', 'level', 'check', 'against', 'until', 'while', 'each',
  'other', 'than', 'into', 'does', 'uses', 'weapon', 'spell', 'success',
  'failure', 'action', 'actions', 'feet', 'bonus', 'penalty', 'trait',
  'roll', 'hit', 'hits', 'become', 'becomes', 'instead', 'also', 'any',
  'first', 'second', 'third', 'even', 'such', 'both', 'were', 'about',
])

const LIMIT = 0.12

/**
 * Fração de palavras inequivocamente inglesas.
 * O regex inclui acentuadas para "força" não virar "for" + "a".
 */
function englishRatio(text) {
  const words = text.toLowerCase().match(/[a-zà-ÿ']+/g) ?? []
  if (words.length < 10) return 0
  let en = 0
  for (const w of words) if (EN_ONLY.has(w)) en++
  return en / words.length
}

function read(file) {
  return fs.readFileSync(file, 'utf8')
}

/** Chaves de um Record<string, string> declarado no fonte. */
function keysOf(source, exportName) {
  const start = source.indexOf(`export const ${exportName}`)
  if (start === -1) return new Set()
  const keys = new Set()
  const body = source.slice(start)
  // aspas podem conter apóstrofo escapado: 'Stonemason\'s Eye'
  const re = /^ {2}(?:'((?:[^'\\]|\\.)*)'|"((?:[^"\\]|\\.)*)"|([A-Za-z_]\w*)):/gm
  for (const m of body.matchAll(re)) {
    const raw = m[1] ?? m[2] ?? m[3]
    keys.add(raw.replace(/\\(['"\\])/g, '$1'))
  }
  return keys
}

/** Valores de um Record — o lado já em português. */
function valuesOf(source, exportName) {
  const start = source.indexOf(`export const ${exportName}`)
  if (start === -1) return new Set()
  const out = new Set()
  const body = source.slice(start)
  for (const m of body.matchAll(/^ {2}(?:'[^']+'|"[^"]+"|[A-Za-z_]\w*):\s*'([^']+)'/gm)) {
    out.add(m[1])
  }
  return out
}

/** Extrai o valor de um campo string, respeitando aspas e apóstrofos. */
function fieldValue(entry, field) {
  const re = new RegExp(
    `${field}:\\s*(?:"((?:[^"\\\\]|\\\\.)*)"|'((?:[^'\\\\]|\\\\.)*)'|\`((?:[^\`\\\\]|\\\\.)*)\`)`,
  )
  const m = entry.match(re)
  if (!m) return null
  return m[1] ?? m[2] ?? m[3] ?? null
}

const namesSrc = read(path.join(i18nDir, 'featNamesPt.ts'))
const descsSrc = read(path.join(i18nDir, 'featDescriptionsPt.ts'))
const genSrc = read(path.join(i18nDir, 'featUiGeneratedPt.ts'))
const traitsSrc = read(path.join(i18nDir, 'traitLabelsPt.ts'))

const translatedNames = new Set([
  ...keysOf(namesSrc, 'FEAT_NAMES_PT'),
  ...keysOf(genSrc, 'GENERATED_FEAT_NAMES_PT'),
])
const translatedDescs = new Set([
  ...keysOf(descsSrc, 'FEAT_DESCRIPTIONS_PT'),
  ...keysOf(genSrc, 'GENERATED_FEAT_DESCRIPTIONS_PT'),
])
const translatedTraits = keysOf(traitsSrc, 'TRAIT_LABELS_PT')

/**
 * Traços que já saem em português dos seeds.
 * Fonte de verdade: os `traitPt` do gerador, mais os valores do mapa.
 */
const generatorSrc = read(path.join(__dirname, 'generate-remaster-feats.mjs'))
const portugueseTraits = new Set([
  ...valuesOf(traitsSrc, 'TRAIT_LABELS_PT'),
  ...[...generatorSrc.matchAll(/traitPt:\s*'([^']+)'/g)].map((m) => m[1]),
])

const problems = []

/** Feitos: originalName + description em template string. */
for (const file of fs.readdirSync(seedsDir)) {
  if (!file.startsWith('feats') || !file.endsWith('.ts')) continue
  const src = read(path.join(seedsDir, file))
  const entries = src.split(/\n  \{\n/).slice(1)
  for (const entry of entries) {
    const original = fieldValue(entry, 'originalName')
    if (!original) continue
    const desc = fieldValue(entry, 'description') ?? ''
    if (desc && !translatedDescs.has(original) && englishRatio(desc) > LIMIT) {
      problems.push(`[descrição] ${file}: ${original}`)
    }
    const display = fieldValue(entry, 'name') ?? original
    // nome de uma palavra igual em PT (Familiar, Allegro…) não é problema
    if (display === original && /\s/.test(original) && !translatedNames.has(original)) {
      problems.push(`[nome] ${file}: ${original}`)
    }
    const traitsM = entry.match(/traits:\s*\[([^\]]*)\]/)
    if (traitsM) {
      for (const t of traitsM[1].matchAll(/["']([^"']+)["']/g)) {
        const trait = t[1]
        if (!/^[A-Z][a-z]+$/.test(trait)) continue
        if (translatedTraits.has(trait) || portugueseTraits.has(trait)) continue
        if (/[áàâãéêíóôõúç]/i.test(trait)) continue
        problems.push(`[traço] ${file}: ${trait} (em ${original})`)
      }
    }
  }
}

/** Demais seeds: qualquer string longa em inglês. */
for (const file of fs.readdirSync(seedsDir)) {
  if (file.startsWith('feats') || !file.endsWith('.ts')) continue
  const src = read(path.join(seedsDir, file))
  for (const m of src.matchAll(/(?:description|body|rulesSummary|summary):\s*\n?\s*['"`]((?:[^'"`\\]|\\.){40,})['"`]/g)) {
    if (englishRatio(m[1]) > LIMIT) {
      problems.push(`[texto] ${file}: ${m[1].slice(0, 70).replace(/\s+/g, ' ')}…`)
    }
  }
}

const unique = [...new Set(problems)]
if (unique.length === 0) {
  console.log('OK — nenhum texto em inglês encontrado nos seeds.')
} else {
  console.error(`${unique.length} item(ns) ainda em inglês:\n`)
  for (const p of unique) console.error('  ' + p)
  console.error('\nTraduza em src/data/i18n/ e suba o CURRENT_SEED_VERSION.')
  process.exitCode = 1
}
