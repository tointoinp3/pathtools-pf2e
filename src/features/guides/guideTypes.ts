export type GuideCategory = 'creation' | 'feats' | 'progression' | 'spells' | 'rules'

export const GUIDE_CATEGORY_LABELS: Record<GuideCategory, string> = {
  creation: 'Criação',
  feats: 'Feitos',
  progression: 'Progressão',
  spells: 'Magias',
  rules: 'Regras',
}

export interface GuideSection {
  heading: string
  body: string
}

export interface GuideRelatedLink {
  label: string
  to: string
}

export interface Guide {
  id: string
  name: string
  originalName: string
  category: GuideCategory
  summary: string
  source: string
  aonUrl: string
  sections: GuideSection[]
  relatedGuides?: string[]
  relatedLinks?: GuideRelatedLink[]
}
