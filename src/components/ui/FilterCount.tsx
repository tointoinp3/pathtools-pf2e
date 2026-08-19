/** Quantos resultados a busca/filtro está mostrando, no padrão das Classes. */
export function FilterCount({
  shown,
  total,
  className = '',
}: {
  shown: number
  total: number
  className?: string
}) {
  return (
    <div className={`text-[11px] text-text-dim ${className}`}>
      {shown} de {total}
    </div>
  )
}
