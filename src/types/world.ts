/**
 * Domínio do módulo Mundo: notas interligadas estilo wiki e mapas de
 * campanha com marcadores e fronteiras políticas.
 *
 * Coordenadas do mapa são sempre normalizadas (0..1) em relação à imagem
 * de fundo — assim trocar a imagem por uma versão maior não desloca nada.
 */

/** Formas geométricas embutidas para marcadores (sem significado fixo). */
export type MarkerShape =
  | 'circle'
  | 'ring'
  | 'square'
  | 'diamond'
  | 'triangle'
  | 'triangleDown'
  | 'star'
  | 'star4'
  | 'pentagon'
  | 'hexagon'
  | 'cross'
  | 'x'
  | 'pin'
  | 'flag'

export const MARKER_SHAPES: MarkerShape[] = [
  'circle',
  'ring',
  'square',
  'diamond',
  'triangle',
  'triangleDown',
  'star',
  'star4',
  'pentagon',
  'hexagon',
  'cross',
  'x',
  'pin',
  'flag',
]

export const MARKER_SHAPE_LABELS: Record<MarkerShape, string> = {
  circle: 'Círculo',
  ring: 'Anel',
  square: 'Quadrado',
  diamond: 'Losango',
  triangle: 'Triângulo',
  triangleDown: 'Triângulo invertido',
  star: 'Estrela',
  star4: 'Estrela de 4 pontas',
  pentagon: 'Pentágono',
  hexagon: 'Hexágono',
  cross: 'Cruz',
  x: 'X',
  pin: 'Alfinete',
  flag: 'Bandeira',
}

export interface MapMarker {
  id: string
  /** Posição normalizada (0..1) relativa à imagem do mapa. */
  x: number
  y: number
  /** Forma embutida — `null` quando o marcador usa um ícone importado. */
  shape: MarkerShape | null
  /** Ícone importado (worldAssets, kind `icon`) — vence a forma. */
  assetId: string | null
  color: string
  /** Diâmetro em unidades da imagem (escala junto com o zoom). */
  size: number
  label: string
  showLabel: boolean
  /** Nota vinculada manualmente — clicar no marcador abre a nota. */
  noteId: string | null
}

/**
 * Vértice de fronteira compartilhável. Países vizinhos referenciam os
 * mesmos vértices, então mover um vértice move as duas fronteiras juntas
 * e nunca sobra vão entre elas.
 */
export interface MapVertex {
  id: string
  x: number
  y: number
}

/** Ajustes manuais sobre o rótulo automático do país. */
export interface CountryLabelStyle {
  /** Deslocamento a partir da posição automática (unidades da imagem). */
  dx: number
  dy: number
  /** Graus somados à rotação automática. */
  rotation: number
  /** Multiplicador do tamanho automático da fonte. */
  scale: number
  /** Curvatura do texto: -1 (côncava) a 1 (convexa), 0 = reto. */
  curve: number
}

export interface WorldCountry {
  id: string
  name: string
  color: string
  /** Polígono como sequência de vértices (compartilhados com vizinhos). */
  vertexIds: string[]
  /** Opacidade do preenchimento (0..1). */
  fillOpacity: number
  showLabel: boolean
  /** `null` = rótulo 100% automático. */
  label: CountryLabelStyle | null
  noteId: string | null
}

/** Estilos de trilha/estrada desenhada à mão no mapa. */
export type MapPathStyle =
  | 'solid'
  | 'dashed'
  | 'dotted'
  | 'dashdot'
  | 'rail'
  | 'trail'

export const MAP_PATH_STYLES: MapPathStyle[] = [
  'solid',
  'dashed',
  'dotted',
  'dashdot',
  'rail',
  'trail',
]

export const MAP_PATH_STYLE_LABELS: Record<MapPathStyle, string> = {
  solid: 'Contínuo',
  dashed: 'Tracejado',
  dotted: 'Pontilhado',
  dashdot: 'Traço e ponto',
  rail: 'Estrada',
  trail: 'Trilha',
}

export interface MapPathPoint {
  x: number
  y: number
}

/** Caminho livre (estrada, rio, rota) — não fecha país. */
export interface MapPath {
  id: string
  name: string
  color: string
  /** Espessura relativa à largura da imagem. */
  width: number
  style: MapPathStyle
  points: MapPathPoint[]
  noteId: string | null
  showLabel: boolean
}

/** Entrada da legenda: o usuário decide o que cada forma significa neste mapa. */
export interface MapLegendEntry {
  id: string
  shape: MarkerShape | null
  assetId: string | null
  meaning: string
  color: string | null
}

/** Pan/zoom lembrado — não altera o conteúdo, só a câmera. */
export interface MapCamera {
  x: number
  y: number
  scale: number
}

export interface WorldMap {
  id: string
  name: string
  /** Imagem de fundo em worldAssets (kind `map`); `null` = tela vazia. */
  imageAssetId: string | null
  imageWidth: number
  imageHeight: number
  markers: MapMarker[]
  vertices: MapVertex[]
  countries: WorldCountry[]
  paths: MapPath[]
  legend: MapLegendEntry[]
  camera: MapCamera | null
  showMarkers: boolean
  showCountries: boolean
  showLabels: boolean
  showPaths: boolean
  /**
   * Multiplicador de todos os ícones deste mapa (1 = tamanho gravado em
   * cada marcador). Serve para encolher o lote sem editar um a um.
   */
  iconScale: number
  createdAt: string
  updatedAt: string
}

export type WorldAssetKind = 'icon' | 'map'

/** Imagem persistida do mundo: ícone reutilizável ou fundo de mapa. */
export interface WorldAssetRecord {
  id: string
  kind: WorldAssetKind
  name: string
  blob: Blob
  mimeType: string
  createdAt: string
  updatedAt: string
}

export type NoteAttachmentKind =
  | 'creature'
  | 'character'
  | 'encounter'
  | 'combat'
  | 'loot'
  | 'item'

export const NOTE_ATTACHMENT_KINDS: NoteAttachmentKind[] = [
  'creature',
  'character',
  'encounter',
  'combat',
  'loot',
  'item',
]

export const NOTE_ATTACHMENT_KIND_LABELS: Record<NoteAttachmentKind, string> =
  {
    creature: 'Criatura',
    character: 'Personagem',
    encounter: 'Encontro',
    combat: 'Combate',
    loot: 'Saque',
    item: 'Item',
  }

/** Vínculo de uma nota com fichas, combates, saques ou equipamentos. */
export interface NoteAttachment {
  id: string
  kind: NoteAttachmentKind
  refId: string
  /** Anotação livre — ex.: “vende consumíveis até 50 PO”. */
  label?: string
  /** Quantidade sugerida (itens de equipamento). */
  quantity?: number
}

export interface WorldNote {
  id: string
  title: string
  folderId: string | null
  /** Markdown com [[links duplos]] para outras notas. */
  content: string
  pinned: boolean
  attachments: NoteAttachment[]
  createdAt: string
  updatedAt: string
}

export interface WorldFolder {
  id: string
  name: string
  parentId: string | null
  createdAt: string
  updatedAt: string
}
