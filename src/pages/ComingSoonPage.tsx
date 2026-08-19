import { Link } from 'react-router-dom'
import { Panel, Tip } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'

export function ComingSoonPage({ title }: { title: string }) {
  return (
    <div className="mx-auto max-w-lg animate-fade-up p-5">
      <Panel title={title} subtitle="Módulo planejado para o Super App">
        <p className="text-sm text-text-muted">
          Esta área fará parte do app em breve. A arquitetura atual já está
          preparada para receber combate, mundo e campanhas sem reescrever as
          fichas.
        </p>
        <Tip>
          Enquanto isso, use a ficha + bandeja de dados para rodar testes na
          mesa.
        </Tip>
        <Link to="/personagens" className="mt-4 inline-flex">
          <Button variant="accent">Voltar aos Personagens</Button>
        </Link>
      </Panel>
    </div>
  )
}
