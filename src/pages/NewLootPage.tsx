import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  markPendingLootCreate,
  peekPendingLootCreate,
} from '@/features/loot/lootRepository'
import { useLootStore } from '@/stores/lootStore'

export function NewLootPage() {
  const navigate = useNavigate()
  const createNew = useLootStore((s) => s.createNew)

  useEffect(() => {
    const existing = peekPendingLootCreate()
    if (existing) {
      navigate(`/saques/${existing}`, { replace: true })
      return
    }
    let cancelled = false
    void createNew().then((haul) => {
      if (cancelled) return
      markPendingLootCreate(haul.id)
      navigate(`/saques/${haul.id}`, { replace: true })
    })
    return () => {
      cancelled = true
    }
  }, [createNew, navigate])

  return <div className="p-5 text-sm text-text-muted">Criando saque…</div>
}
