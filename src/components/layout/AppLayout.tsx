import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { DiceToast, DiceTray } from '@/components/dice/DiceTray'
import { UiScaleController } from '@/features/settings/UiScaleController'
import { AppTabLinkInterceptor } from '@/features/tabs/AppTabLinkInterceptor'
import { TabBar } from '@/features/tabs/TabBar'
import { useGroupStore } from '@/stores/groupStore'
import { useSettingsStore } from '@/stores/settingsStore'
import { useStashStore } from '@/stores/stashStore'
import { useTabStore } from '@/stores/tabStore'
import { useWorkspaceStore } from '@/stores/workspaceStore'

export function AppLayout() {
  const loadSettings = useSettingsStore((s) => s.load)
  const loadGroups = useGroupStore((s) => s.loadAll)
  const loadStashes = useStashStore((s) => s.loadAll)
  const pathname = useLocation().pathname
  const syncFromPath = useWorkspaceStore((s) => s.syncFromPath)
  const activeId = useTabStore((s) => s.activeId)
  const reloadToken = useTabStore(
    (s) => s.tabs.find((tab) => tab.id === s.activeId)?.reloadToken ?? 0,
  )

  useEffect(() => {
    void loadSettings()
    void loadGroups()
    void loadStashes()
  }, [loadSettings, loadGroups, loadStashes])

  useEffect(() => {
    syncFromPath(pathname)
  }, [pathname, syncFromPath])

  return (
    <div className="flex h-full min-h-0 bg-transparent print:block print:h-auto">
      <UiScaleController />
      <AppTabLinkInterceptor />
      <Sidebar />
      <main className="relative flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden print:overflow-visible">
        <TabBar />
        <div className="min-h-0 flex-1 overflow-y-auto print:overflow-visible">
          <Outlet key={`${activeId}:${reloadToken}`} />
        </div>
      </main>
      <DiceTray />
      <DiceToast />
    </div>
  )
}
