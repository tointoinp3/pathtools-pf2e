import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  markPendingEncounterCreate,
  peekPendingEncounterCreate,
} from '@/features/encounters/encounterRepository'
import { useEncounterStore } from '@/stores/encounterStore'

export function NewEncounterPage() {
  const navigate = useNavigate()
  const createNew = useEncounterStore((s) => s.createNew)

  useEffect(() => {
    const existing = peekPendingEncounterCreate()
    if (existing) {
      navigate(`/bestiario/encontros/${existing}`, { replace: true })
      return
    }
    let cancelled = false
    void createNew().then((encounter) => {
      if (cancelled) return
      markPendingEncounterCreate(encounter.id)
      navigate(`/bestiario/encontros/${encounter.id}`, { replace: true })
    })
    return () => {
      cancelled = true
    }
  }, [createNew, navigate])

  return (
    <div className="p-5 text-sm text-text-muted">Criando encontro…</div>
  )
}
