import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import {
  downloadHomebrewSlice,
  runHomebrewExport,
  runHomebrewImport,
  type HomebrewKind,
  type HomebrewSlice,
} from '@/features/backup/homebrewBackup'
import {
  runCharacterExportAll,
  runCharacterImport,
} from '@/features/backup/characterBackup'
import {
  runCombatExportAll,
  runCombatImport,
} from '@/features/backup/combatBackup'

interface JsonExchangeButtonsProps {
  onExport: () => void | Promise<void>
  onImport: () => void | Promise<void>
  exportLabel?: string
  importLabel?: string
  exportTitle?: string
  importTitle?: string
  disabled?: boolean
}

export function JsonExchangeButtons({
  onExport,
  onImport,
  exportLabel = 'Exportar JSON',
  importLabel = 'Importar JSON',
  exportTitle,
  importTitle,
  disabled,
}: JsonExchangeButtonsProps) {
  const [busy, setBusy] = useState(false)

  async function run(action: () => void | Promise<void>) {
    setBusy(true)
    try {
      await action()
    } catch (error) {
      window.alert(
        error instanceof Error ? error.message : 'Falha ao ler ou gravar o JSON.',
      )
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        size="sm"
        disabled={disabled || busy}
        title={importTitle}
        onClick={() => void run(onImport)}
      >
        {busy ? 'Aguarde…' : importLabel}
      </Button>
      <Button
        size="sm"
        disabled={disabled || busy}
        title={exportTitle}
        onClick={() => void run(onExport)}
      >
        {exportLabel}
      </Button>
    </div>
  )
}

export function HomebrewJsonButtons({ kind }: { kind: HomebrewKind }) {
  return (
    <JsonExchangeButtons
      exportLabel={kind === 'all' ? 'Exportar todos' : 'Exportar JSON'}
      importLabel="Importar JSON"
      importTitle="Aceita um ou vários arquivos .json de uma vez"
      exportTitle={
        kind === 'all'
          ? 'Baixa todo o homebrew deste dispositivo'
          : 'Baixa todo o homebrew deste tipo'
      }
      onExport={() => runHomebrewExport(kind)}
      onImport={() => runHomebrewImport()}
    />
  )
}

export function CombatJsonButtons() {
  return (
    <JsonExchangeButtons
      exportLabel="Exportar todos"
      importLabel="Importar JSON"
      importTitle="Aceita um ou vários arquivos .json de uma vez"
      exportTitle="Baixa todos os combates deste dispositivo"
      onExport={() => runCombatExportAll()}
      onImport={() => runCombatImport()}
    />
  )
}

export function CharacterJsonButtons() {
  return (
    <JsonExchangeButtons
      exportLabel="Exportar todos"
      importLabel="Importar JSON"
      importTitle="Aceita um ou vários arquivos .json de uma vez"
      exportTitle="Baixa todas as fichas deste dispositivo"
      onExport={() => runCharacterExportAll()}
      onImport={() => runCharacterImport()}
    />
  )
}

export function EditorJsonButtons({
  filenameStem,
  getSlice,
}: {
  filenameStem: string
  getSlice: () => HomebrewSlice
}) {
  return (
    <JsonExchangeButtons
      importTitle="Aceita um ou vários arquivos .json de uma vez"
      onImport={() => runHomebrewImport()}
      onExport={() =>
        downloadHomebrewSlice(filenameStem || 'homebrew', getSlice())
      }
    />
  )
}
