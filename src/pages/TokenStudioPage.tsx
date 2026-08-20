import { Tip } from '@/components/ui/Panel'
import { TokenStudio } from '@/features/combat/components/TokenStudio'

export function TokenStudioPage() {
  return (
    <div className="mx-auto max-w-5xl animate-fade-up p-5">
      <h1 className="font-display text-2xl font-semibold tracking-wide text-accent">
        Criar token
      </h1>
      <p className="mt-1 max-w-2xl text-sm text-text-muted">
        Igual aos VTTs: um círculo com a foto no meio e uma moldura em volta.
        Enquadre, escolha o aro e a cor, depois baixe um PNG ou cole no
        bestiário.
      </p>
      <div className="mt-3">
        <Tip>
          Atrelar ao bestiário grava a foto na criatura: toda ficha dela no
          grid usa esse token. PNG serve para Foundry, Roll20 ou o que você
          quiser.
        </Tip>
      </div>
      <div className="mt-5">
        <TokenStudio />
      </div>
    </div>
  )
}
