import { Suspense, lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AppLayout } from '@/components/layout/AppLayout'
import { CharactersPage } from '@/pages/CharactersPage'

/**
 * Rotas pesadas entram sob demanda.
 *
 * A ficha arrasta os painéis de combate, magias e feitos — e, com eles, toda
 * a camada de tradução. Carregar isso só quando o usuário abre um personagem
 * mantém a tela inicial leve. `CharactersPage` fica estática por ser a rota
 * de entrada.
 */
const CharacterEditorPage = lazy(() =>
  import('@/pages/CharacterEditorPage').then((m) => ({
    default: m.CharacterEditorPage,
  })),
)
const SessionSheetPage = lazy(() =>
  import('@/pages/SessionSheetPage').then((m) => ({
    default: m.SessionSheetPage,
  })),
)
const NewCharacterPage = lazy(() =>
  import('@/pages/NewCharacterPage').then((m) => ({
    default: m.NewCharacterPage,
  })),
)
const BackgroundsCompendiumPage = lazy(() =>
  import('@/pages/BackgroundsCompendiumPage').then((m) => ({
    default: m.BackgroundsCompendiumPage,
  })),
)
const AncestriesCompendiumPage = lazy(() =>
  import('@/pages/AncestriesCompendiumPage').then((m) => ({
    default: m.AncestriesCompendiumPage,
  })),
)
const VersatileHeritagesCompendiumPage = lazy(() =>
  import('@/pages/VersatileHeritagesCompendiumPage').then((m) => ({
    default: m.VersatileHeritagesCompendiumPage,
  })),
)
const ClassesCompendiumPage = lazy(() =>
  import('@/pages/ClassesCompendiumPage').then((m) => ({
    default: m.ClassesCompendiumPage,
  })),
)
const CompanionsCompendiumPage = lazy(() =>
  import('@/pages/CompanionsCompendiumPage').then((m) => ({
    default: m.CompanionsCompendiumPage,
  })),
)
const ArchetypesCompendiumPage = lazy(() =>
  import('@/pages/ArchetypesCompendiumPage').then((m) => ({
    default: m.ArchetypesCompendiumPage,
  })),
)
const EquipmentCompendiumPage = lazy(() =>
  import('@/pages/EquipmentCompendiumPage').then((m) => ({
    default: m.EquipmentCompendiumPage,
  })),
)
const KitsCompendiumPage = lazy(() =>
  import('@/pages/KitsCompendiumPage').then((m) => ({
    default: m.KitsCompendiumPage,
  })),
)
const RitualsCompendiumPage = lazy(() =>
  import('@/pages/RitualsCompendiumPage').then((m) => ({
    default: m.RitualsCompendiumPage,
  })),
)
const SpellsCompendiumPage = lazy(() =>
  import('@/pages/SpellsCompendiumPage').then((m) => ({
    default: m.SpellsCompendiumPage,
  })),
)
const DeitiesCompendiumPage = lazy(() =>
  import('@/pages/DeitiesCompendiumPage').then((m) => ({
    default: m.DeitiesCompendiumPage,
  })),
)
const FeatsCompendiumPage = lazy(() =>
  import('@/pages/FeatsCompendiumPage').then((m) => ({
    default: m.FeatsCompendiumPage,
  })),
)
const GuidesCompendiumPage = lazy(() =>
  import('@/pages/GuidesCompendiumPage').then((m) => ({
    default: m.GuidesCompendiumPage,
  })),
)
const HomebrewCompendiumPage = lazy(() =>
  import('@/pages/HomebrewCompendiumPage').then((m) => ({
    default: m.HomebrewCompendiumPage,
  })),
)
const SettingsPage = lazy(() =>
  import('@/pages/SettingsPage').then((m) => ({ default: m.SettingsPage })),
)
const ComingSoonPage = lazy(() =>
  import('@/pages/ComingSoonPage').then((m) => ({ default: m.ComingSoonPage })),
)
const LootListPage = lazy(() =>
  import('@/pages/LootListPage').then((m) => ({ default: m.LootListPage })),
)
const LootEditorPage = lazy(() =>
  import('@/pages/LootEditorPage').then((m) => ({ default: m.LootEditorPage })),
)
const NewLootPage = lazy(() =>
  import('@/pages/NewLootPage').then((m) => ({ default: m.NewLootPage })),
)
const PartyInventoryPage = lazy(() =>
  import('@/pages/PartyInventoryPage').then((m) => ({
    default: m.PartyInventoryPage,
  })),
)
const BestiaryPage = lazy(() =>
  import('@/pages/BestiaryPage').then((m) => ({ default: m.BestiaryPage })),
)
const CreatureSessionSheetPage = lazy(() =>
  import('@/pages/CreatureSessionSheetPage').then((m) => ({
    default: m.CreatureSessionSheetPage,
  })),
)
const EncounterListPage = lazy(() =>
  import('@/pages/EncounterListPage').then((m) => ({
    default: m.EncounterListPage,
  })),
)
const EncounterEditorPage = lazy(() =>
  import('@/pages/EncounterEditorPage').then((m) => ({
    default: m.EncounterEditorPage,
  })),
)
const NewEncounterPage = lazy(() =>
  import('@/pages/NewEncounterPage').then((m) => ({
    default: m.NewEncounterPage,
  })),
)
const CombatListPage = lazy(() =>
  import('@/pages/CombatListPage').then((m) => ({
    default: m.CombatListPage,
  })),
)
const CombatTrackerPage = lazy(() =>
  import('@/pages/CombatTrackerPage').then((m) => ({
    default: m.CombatTrackerPage,
  })),
)

function RouteFallback() {
  return <div className="p-4 text-sm text-text-muted">Carregando…</div>
}

export function AppRouter() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Navigate to="/personagens" replace />} />
        <Route path="personagens" element={<CharactersPage />} />
        <Route
          path="personagens/novo"
          element={
            <Suspense fallback={<RouteFallback />}>
              <NewCharacterPage />
            </Suspense>
          }
        />
        <Route
          path="personagens/:id"
          element={
            <Suspense fallback={<RouteFallback />}>
              <CharacterEditorPage />
            </Suspense>
          }
        />
        <Route
          path="personagens/:id/sessao"
          element={
            <Suspense fallback={<RouteFallback />}>
              <SessionSheetPage />
            </Suspense>
          }
        />
        <Route
          path="compendio/ancestralidades"
          element={
            <Suspense fallback={<RouteFallback />}>
              <AncestriesCompendiumPage />
            </Suspense>
          }
        />
        <Route
          path="compendio/herancas-versateis"
          element={
            <Suspense fallback={<RouteFallback />}>
              <VersatileHeritagesCompendiumPage />
            </Suspense>
          }
        />
        <Route
          path="compendio/classes"
          element={
            <Suspense fallback={<RouteFallback />}>
              <ClassesCompendiumPage />
            </Suspense>
          }
        />
        <Route
          path="compendio/origens"
          element={
            <Suspense fallback={<RouteFallback />}>
              <BackgroundsCompendiumPage />
            </Suspense>
          }
        />
        <Route
          path="compendio/feitos"
          element={
            <Suspense fallback={<RouteFallback />}>
              <FeatsCompendiumPage />
            </Suspense>
          }
        />
        <Route
          path="compendio/arquetipos"
          element={
            <Suspense fallback={<RouteFallback />}>
              <ArchetypesCompendiumPage />
            </Suspense>
          }
        />
        <Route
          path="compendio/companheiros"
          element={
            <Suspense fallback={<RouteFallback />}>
              <CompanionsCompendiumPage />
            </Suspense>
          }
        />
        <Route
          path="compendio/equipamento"
          element={
            <Suspense fallback={<RouteFallback />}>
              <EquipmentCompendiumPage />
            </Suspense>
          }
        />
        <Route
          path="compendio/kits"
          element={
            <Suspense fallback={<RouteFallback />}>
              <KitsCompendiumPage />
            </Suspense>
          }
        />
        <Route
          path="compendio/magias"
          element={
            <Suspense fallback={<RouteFallback />}>
              <SpellsCompendiumPage />
            </Suspense>
          }
        />
        <Route
          path="compendio/rituais"
          element={
            <Suspense fallback={<RouteFallback />}>
              <RitualsCompendiumPage />
            </Suspense>
          }
        />
        <Route
          path="compendio/divindades"
          element={
            <Suspense fallback={<RouteFallback />}>
              <DeitiesCompendiumPage />
            </Suspense>
          }
        />
        <Route
          path="compendio/guias"
          element={
            <Suspense fallback={<RouteFallback />}>
              <GuidesCompendiumPage />
            </Suspense>
          }
        />
        <Route
          path="compendio/homebrew"
          element={
            <Suspense fallback={<RouteFallback />}>
              <HomebrewCompendiumPage />
            </Suspense>
          }
        />
        <Route
          path="configuracoes"
          element={
            <Suspense fallback={<RouteFallback />}>
              <SettingsPage />
            </Suspense>
          }
        />
        <Route
          path="saques"
          element={
            <Suspense fallback={<RouteFallback />}>
              <LootListPage />
            </Suspense>
          }
        />
        <Route
          path="saques/novo"
          element={
            <Suspense fallback={<RouteFallback />}>
              <NewLootPage />
            </Suspense>
          }
        />
        <Route
          path="saques/mesa"
          element={
            <Suspense fallback={<RouteFallback />}>
              <PartyInventoryPage />
            </Suspense>
          }
        />
        <Route
          path="saques/:id"
          element={
            <Suspense fallback={<RouteFallback />}>
              <LootEditorPage />
            </Suspense>
          }
        />
        <Route
          path="bestiario"
          element={
            <Suspense fallback={<RouteFallback />}>
              <BestiaryPage />
            </Suspense>
          }
        />
        <Route
          path="bestiario/encontros"
          element={
            <Suspense fallback={<RouteFallback />}>
              <EncounterListPage />
            </Suspense>
          }
        />
        <Route
          path="bestiario/encontros/novo"
          element={
            <Suspense fallback={<RouteFallback />}>
              <NewEncounterPage />
            </Suspense>
          }
        />
        <Route
          path="bestiario/encontros/:id"
          element={
            <Suspense fallback={<RouteFallback />}>
              <EncounterEditorPage />
            </Suspense>
          }
        />
        <Route
          path="bestiario/:id/sessao"
          element={
            <Suspense fallback={<RouteFallback />}>
              <CreatureSessionSheetPage />
            </Suspense>
          }
        />
        <Route
          path="bestiario/:id"
          element={
            <Suspense fallback={<RouteFallback />}>
              <BestiaryPage />
            </Suspense>
          }
        />
        <Route
          path="combate"
          element={
            <Suspense fallback={<RouteFallback />}>
              <CombatListPage />
            </Suspense>
          }
        />
        <Route
          path="combate/:id"
          element={
            <Suspense fallback={<RouteFallback />}>
              <CombatTrackerPage />
            </Suspense>
          }
        />
        {/* Abas antigas salvas antes da aba Combate existir */}
        <Route
          path="em-breve/combate"
          element={<Navigate to="/combate" replace />}
        />
        <Route
          path="em-breve/mundo"
          element={
            <Suspense fallback={<RouteFallback />}>
              <ComingSoonPage title="Mundo" />
            </Suspense>
          }
        />
        <Route path="*" element={<Navigate to="/personagens" replace />} />
      </Route>
    </Routes>
  )
}
