/**
 * Nomes próprios que ainda aparecem em inglês no meio de texto já em pt-BR
 * (arquétipos, ancestralidades, pré-requisitos).
 */
export function applyCatalogTokens(text: string): string {
  return text
    .replace(/\s*\(way of the spellshot\)/gi, '')
    .replace(/\s*\(mythic calling\)/gi, '')
    .replace(/\bOrdem Hellknight\b/g, 'Ordem dos Cavaleiros Infernais')
    .replace(/\bLiga Hellbreakers\b/g, 'Liga dos Quebra-Inferno')
    .replace(
      /\bmeia-placa e placa Hellknight\b/g,
      'meia-placa e placa de Cavaleiro Infernal',
    )
    .replace(/\bArmadura Hellknight\b/g, 'Armadura de Cavaleiro Infernal')
    .replace(/\barmadura Hellknight\b/g, 'armadura de Cavaleiro Infernal')
    .replace(/\bcouraça Hellknight\b/g, 'couraça de Cavaleiro Infernal')
    .replace(/\bplaca Hellknight\b/g, 'placa de Cavaleiro Infernal')
    .replace(/\bHellknights\b/g, 'Cavaleiros Infernais')
    .replace(/\bHellknight\b/g, 'Cavaleiro Infernal')
    .replace(/\bHellbreakers\b/g, 'Quebra-Inferno')
    .replace(/\bHellbreaker\b/g, 'Quebra-Inferno')
    .replace(/\bBlackjacket\b/g, 'Casaca Negra')
    .replace(/\bWylderhearts\b/g, 'Corações Selvagens')
    .replace(/\bWylderheart\b/g, 'Coração Selvagem')
    .replace(/\bcaminho do Spellshot\b/gi, 'caminho do Tiro Arcano')
    .replace(/\bcaminho Spellshot\b/gi, 'caminho do Tiro Arcano')
    .replace(/\bSpellshot\b/g, 'Tiro Arcano')
    .replace(/\bAlter Ego\b/g, 'Outro Eu')
    .replace(/\bRunelords\b/g, 'Senhores das Runas')
    .replace(/\bRunelord\b/g, 'Senhor das Runas')
    .replace(/\bGodling\b/g, 'Cria Divina')
    .replace(/\bCatfolk\b/g, 'Povo-Felino')
    .replace(/\bLizardfolk\b/g, 'Iruxi')
    .replace(/\bRatfolk\b/g, 'Ysoki')
    .replace(/\bMerfolk\b/g, 'Povo-marinho')
}
