import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCharacterStore } from '@/stores/characterStore'

/** Cria personagem e redireciona para a ficha */
export function NewCharacterPage() {
  const navigate = useNavigate()
  const createNew = useCharacterStore((s) => s.createNew)
  /**
   * Guarda contra dupla execução: em StrictMode o efeito roda duas vezes e
   * criava dois personagens (o segundo ficava órfão na lista).
   */
  const startedRef = useRef(false)

  useEffect(() => {
    if (startedRef.current) return
    startedRef.current = true
    void (async () => {
      const character = await createNew()
      navigate(`/personagens/${character.id}`, { replace: true })
    })()
  }, [createNew, navigate])

  return (
    <div className="p-4 text-sm text-text-muted">Criando personagem...</div>
  )
}
