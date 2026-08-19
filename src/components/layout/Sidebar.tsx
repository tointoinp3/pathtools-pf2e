import { NavLink } from 'react-router-dom'
import { ThemePicker } from '@/features/settings/ThemePicker'
import {
  useWorkspaceStore,
  type WorkspaceMode,
} from '@/stores/workspaceStore'
import { APP_NAME } from '@/brand'

interface NavItem {
  to: string
  label: string
  hint?: string
  soon?: boolean
}

interface NavSection {
  title: string
  items: NavItem[]
}

const LOOT_COMPENDIUM_PATHS = new Set([
  '/compendio/equipamento',
  '/compendio/kits',
  '/compendio/guias',
  '/compendio/homebrew',
])

const BESTIARY_COMPENDIUM_PATHS = new Set([
  '/compendio/equipamento',
  '/compendio/divindades',
  '/compendio/guias',
  '/compendio/homebrew',
])

const SOON_TOOLS: NavItem[] = [
  { to: '/em-breve/combate', label: 'Combate', soon: true },
  { to: '/em-breve/mundo', label: 'Mundo', soon: true },
]

const PERSONAGEM_TOOL: NavItem = {
  to: '/personagens',
  label: 'Personagem',
  hint: 'Voltar às fichas',
}

const SAQUE_TOOL: NavItem = {
  to: '/saques',
  label: 'Gerador de Saque',
  hint: 'Tesouro aleatório do catálogo',
}

const BESTIARY_TOOL: NavItem = {
  to: '/bestiario',
  label: 'Bestiário',
  hint: 'Fichas oficiais do catálogo',
}

function toolsFor(mode: WorkspaceMode): NavItem[] {
  if (mode === 'character') return [SAQUE_TOOL, BESTIARY_TOOL, ...SOON_TOOLS]
  if (mode === 'loot') return [PERSONAGEM_TOOL, BESTIARY_TOOL, ...SOON_TOOLS]
  return [PERSONAGEM_TOOL, SAQUE_TOOL, ...SOON_TOOLS]
}

function primarySection(mode: WorkspaceMode): NavSection {
  if (mode === 'loot') {
    return {
      title: 'Saques',
      items: [
        {
          to: '/saques',
          label: 'Meus Saques',
          hint: 'Tesouros salvos neste dispositivo',
        },
        {
          to: '/saques/novo',
          label: 'Criar Saque',
          hint: 'Sortear um tesouro do catálogo',
        },
        {
          to: '/saques/mesa',
          label: 'Inventário da mesa',
          hint: 'Fichas, baú compartilhado e trocas',
        },
      ],
    }
  }
  if (mode === 'bestiary') {
    return {
      title: 'Bestiário',
      items: [
        {
          to: '/bestiario',
          label: 'Catálogo',
          hint: 'Oficiais Remaster e homebrew',
        },
        {
          to: '/bestiario?criar=1',
          label: 'Criar criatura',
          hint: 'Guia GM Core + ícones de ação',
        },
        {
          to: '/bestiario/encontros',
          label: 'Meus Encontros',
          hint: 'Combates salvos neste dispositivo',
        },
        {
          to: '/bestiario/encontros/novo',
          label: 'Criar Encontro',
          hint: 'Sortear pelo orçamento de XP',
        },
      ],
    }
  }
  return {
    title: 'Personagens',
    items: [
      {
        to: '/personagens',
        label: 'Meus Personagens',
        hint: 'Fichas e grupos da mesa',
      },
      {
        to: '/personagens/novo',
        label: 'Criar Personagem',
        hint: 'Começar uma nova ficha',
      },
    ],
  }
}

function buildSections(mode: WorkspaceMode): NavSection[] {
  const compendiumItems: NavItem[] = [
    {
      to: '/compendio/ancestralidades',
      label: 'Ancestralidades',
      hint: 'Oficiais e homebrew',
    },
    {
      to: '/compendio/herancas-versateis',
      label: 'Heranças Versáteis',
      hint: 'Oficiais e homebrew versátil',
    },
    {
      to: '/compendio/classes',
      label: 'Classes',
      hint: 'Oficiais e homebrew',
    },
    {
      to: '/compendio/arquetipos',
      label: 'Arquétipos',
      hint: 'Oficiais e homebrew',
    },
    {
      to: '/compendio/origens',
      label: 'Origens',
      hint: 'Backgrounds oficiais e homebrew',
    },
    {
      to: '/compendio/feitos',
      label: 'Feitos',
      hint: 'Oficiais e homebrew',
    },
    {
      to: '/compendio/companheiros',
      label: 'Companheiros',
      hint: 'Oficiais e homebrew',
    },
    {
      to: '/compendio/equipamento',
      label: 'Equipamento',
      hint: 'Oficiais e homebrew',
    },
    {
      to: '/compendio/kits',
      label: 'Kits',
      hint: 'Pacotes de classe e o que vem em cada kit',
    },
    {
      to: '/compendio/magias',
      label: 'Magias',
      hint: 'Oficiais e homebrew',
    },
    {
      to: '/compendio/rituais',
      label: 'Rituais',
      hint: 'Oficiais e homebrew',
    },
    {
      to: '/compendio/divindades',
      label: 'Divindades',
      hint: 'Oficiais e homebrew',
    },
    {
      to: '/compendio/guias',
      label: 'Guias',
      hint: 'Criação, feitos e regras',
    },
    {
      to: '/compendio/homebrew',
      label: 'Homebrew',
      hint: 'Central das suas criações',
    },
  ]

  const visibleCompendium =
    mode === 'loot'
      ? compendiumItems.filter((item) => LOOT_COMPENDIUM_PATHS.has(item.to))
      : mode === 'bestiary'
        ? compendiumItems.filter((item) =>
            BESTIARY_COMPENDIUM_PATHS.has(item.to),
          )
        : compendiumItems

  return [
    primarySection(mode),
    { title: 'Compêndio', items: visibleCompendium },
    { title: 'Ferramentas', items: toolsFor(mode) },
    {
      title: 'Sistema',
      items: [{ to: '/configuracoes', label: 'Configurações' }],
    },
  ]
}

function modeTagline(mode: WorkspaceMode): string {
  if (mode === 'loot') return 'Pathfinder 2e Remaster · gerador de saque'
  if (mode === 'bestiary') return 'Pathfinder 2e Remaster · bestiário'
  return 'Pathfinder 2e Remaster · ficha local'
}

function modeFooter(mode: WorkspaceMode): string {
  if (mode === 'loot') return 'Equipamento · Kits · Saque'
  if (mode === 'bestiary') return 'Criaturas · Encontros · Equipamento'
  return 'Ancestralidades · Classes · Origens · Homebrew'
}

export function Sidebar() {
  const mode = useWorkspaceStore((s) => s.mode)
  const sections = buildSections(mode)

  return (
    <aside className="print-hidden flex h-full w-60 shrink-0 flex-col border-r border-border bg-surface-1">
      <div className="border-b border-border px-4 py-4">
        <div className="font-display text-base font-bold tracking-[0.08em] text-accent">
          {APP_NAME}
        </div>
        <div className="mt-0.5 text-[11px] text-text-dim">
          {modeTagline(mode)}
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-2.5 py-3">
        {sections.map((section) => (
          <div key={section.title} className="mb-4">
            <div className="mb-1.5 px-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-text-dim">
              {section.title}
            </div>
            <ul className="space-y-0.5">
              {section.items.map((item) => (
                <li key={`${section.title}-${item.to}-${item.label}`}>
                  {item.soon ? (
                    <div
                      className="flex items-center justify-between rounded-lg px-2.5 py-2 text-sm text-text-dim"
                      title="Em breve"
                    >
                      <span>{item.label}</span>
                      <span className="rounded border border-border px-1.5 py-0.5 text-[9px] uppercase tracking-wide">
                        Em breve
                      </span>
                    </div>
                  ) : (
                    <NavLink
                      to={item.to}
                      title={item.hint}
                      end={
                        item.to === '/saques' ||
                        item.to === '/personagens' ||
                        item.to === '/bestiario' ||
                        item.to === '/bestiario/encontros'
                      }
                      className={({ isActive }) =>
                        `nav-link-item block rounded-lg px-2.5 py-2 text-sm ${
                          isActive
                            ? 'bg-accent/15 text-accent shadow-[inset_3px_0_0_0_var(--color-accent)]'
                            : 'text-text-muted hover:bg-surface-2 hover:text-text'
                        }`
                      }
                    >
                      <span className="font-medium">{item.label}</span>
                      {item.hint && (
                        <span className="mt-0.5 block text-[10px] text-text-dim">
                          {item.hint}
                        </span>
                      )}
                    </NavLink>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      <div className="border-t border-border px-3 py-3 text-[10px] leading-relaxed text-text-dim">
        <div className="mb-2">
          <div className="mb-1 px-1 text-[10px] font-semibold uppercase tracking-[0.16em]">
            Tema
          </div>
          <ThemePicker compact />
        </div>
        Fundação v0.1
        <br />
        {modeFooter(mode)}
      </div>
    </aside>
  )
}
