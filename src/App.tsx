import { useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AppRouter } from '@/app/router'
import { ThemeController } from '@/features/settings/ThemeController'
import { initializeDatabase } from '@/db'
import { APP_NAME } from '@/brand'

export default function App() {
  const [ready, setReady] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    void initializeDatabase()
      .then(() => setReady(true))
      .catch((e: unknown) => {
        setError(e instanceof Error ? e.message : 'Falha ao iniciar o banco local')
      })
  }, [])

  const splash = error ? (
    <div className="flex h-full items-center justify-center p-6">
      <div className="max-w-md animate-fade-up rounded-xl border border-danger/40 bg-danger/10 p-5 text-sm text-danger shadow-[var(--shadow-panel)]">
        <div className="font-display text-base font-semibold">Erro de inicialização</div>
        <p className="mt-2 text-danger/90">{error}</p>
      </div>
    </div>
  ) : !ready ? (
    <div className="flex h-full flex-col items-center justify-center gap-3">
      <div className="font-display text-lg tracking-wide text-accent animate-pulse-glow rounded-full px-4 py-2">
        {APP_NAME}
      </div>
      <div className="text-sm text-text-muted">Preparando ficha e compêndio local…</div>
    </div>
  ) : (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  )

  return (
    <>
      <ThemeController />
      {splash}
    </>
  )
}
