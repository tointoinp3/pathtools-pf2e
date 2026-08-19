import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Field, Input, Select } from '@/components/ui/Field'
import { Panel } from '@/components/ui/Panel'
import { soleActiveGroupId } from '@/features/groups/groupFilter'
import { useCharacterStore } from '@/stores/characterStore'
import { useGroupStore } from '@/stores/groupStore'
import { useStashStore } from '@/stores/stashStore'
import type { Character, CharacterGroup } from '@/types'

export function CharacterGroupSelect({
  characterId,
  groupId,
  groups,
}: {
  characterId: string
  groupId?: string | null
  groups: CharacterGroup[]
}) {
  const moveCharacter = useGroupStore((s) => s.moveCharacter)
  const loadCharacters = useCharacterStore((s) => s.loadAll)
  if (groups.length === 0) return null

  return (
    <Select
      className="mt-2 text-xs"
      value={groupId ?? ''}
      aria-label="Grupo da ficha"
      onChange={(e) => {
        const value = e.target.value
        void moveCharacter(characterId, value === '' ? null : value).then(
          () => loadCharacters(),
        )
      }}
    >
      <option value="">Sem grupo</option>
      {groups.map((group) => (
        <option key={group.id} value={group.id}>
          {group.name}
        </option>
      ))}
    </Select>
  )
}

export function GroupsPanel({
  characters,
  selectedIds,
}: {
  characters: Character[]
  selectedIds: string[]
}) {
  const groups = useGroupStore((s) => s.groups)
  const activeGroupIds = useGroupStore((s) => s.activeGroupIds)
  const loadGroups = useGroupStore((s) => s.loadAll)
  const create = useGroupStore((s) => s.create)
  const rename = useGroupStore((s) => s.rename)
  const remove = useGroupStore((s) => s.remove)
  const toggleActive = useGroupStore((s) => s.toggleActive)
  const moveCharacters = useGroupStore((s) => s.moveCharacters)
  const loadCharacters = useCharacterStore((s) => s.loadAll)
  const loadStashes = useStashStore((s) => s.loadAll)

  const [newName, setNewName] = useState('')
  const [creating, setCreating] = useState(false)
  const [renameDraft, setRenameDraft] = useState<Record<string, string>>({})
  const [pendingDelete, setPendingDelete] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    void loadGroups()
    void loadStashes()
  }, [loadGroups, loadStashes])

  async function refreshSheets() {
    await Promise.all([loadCharacters(), loadGroups(), loadStashes()])
  }

  async function handleCreate() {
    const name = newName.trim()
    if (!name) return
    setCreating(true)
    try {
      const group = await create(name)
      if (selectedIds.length > 0) {
        await moveCharacters(selectedIds, group.id)
      }
      setNewName('')
      await refreshSheets()
    } catch (error) {
      window.alert(
        error instanceof Error ? error.message : 'Não deu para criar o grupo.',
      )
    } finally {
      setCreating(false)
    }
  }

  async function handleRename(id: string) {
    const name = (renameDraft[id] ?? '').trim()
    if (!name) return
    try {
      await rename(id, name)
      setRenameDraft((prev) => {
        const next = { ...prev }
        delete next[id]
        return next
      })
      await loadStashes()
    } catch (error) {
      window.alert(
        error instanceof Error ? error.message : 'Não deu para renomear.',
      )
    }
  }

  async function handleMoveSelected(groupId: string | null) {
    if (selectedIds.length === 0) return
    setBusy(true)
    try {
      await moveCharacters(selectedIds, groupId)
      await refreshSheets()
    } catch (error) {
      window.alert(
        error instanceof Error ? error.message : 'Não deu para mover as fichas.',
      )
    } finally {
      setBusy(false)
    }
  }

  async function handleDelete(id: string, deleteCharacters: boolean) {
    setBusy(true)
    try {
      await remove(id, deleteCharacters)
      setPendingDelete(null)
      await refreshSheets()
    } catch (error) {
      window.alert(
        error instanceof Error ? error.message : 'Não deu para excluir o grupo.',
      )
    } finally {
      setBusy(false)
    }
  }

  const countByGroup = (groupId: string) =>
    characters.filter((c) => c.groupId === groupId).length
  const orphanCount = characters.filter((c) => !c.groupId).length
  const soleId = soleActiveGroupId(groups, activeGroupIds)
  const soleName = soleId
    ? groups.find((group) => group.id === soleId)?.name
    : null

  return (
    <Panel
      title="Grupos da mesa"
      subtitle="Ative um ou mais para filtrar os menus de ficha"
      collapsible
      defaultOpen={groups.length > 0}
    >
      <div className="space-y-3">
        <p className="text-[11px] text-text-dim">
          Agrupe as fichas da campanha (ex.: mesa A e mesa B). Com um grupo
          ativo, saque e inventário só mostram essas fichas. Sem grupo ativo,
          todas aparecem. Cada grupo tem um baú; o baú da mesa vale para
          todo mundo.
          {soleName
            ? ` Novas fichas entram em “${soleName}”.`
            : ''}
        </p>

        <div className="flex flex-wrap items-end gap-2">
          <Field label="Novo grupo" className="min-w-[12rem] flex-1">
            <Input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Nome do grupo"
              onKeyDown={(e) => {
                if (e.key === 'Enter') void handleCreate()
              }}
            />
          </Field>
          <Button
            variant="accent"
            disabled={!newName.trim() || creating}
            onClick={() => void handleCreate()}
          >
            {creating ? 'Criando…' : 'Criar grupo'}
          </Button>
        </div>

        {selectedIds.length > 0 && groups.length > 0 ? (
          <div className="flex flex-wrap items-center gap-2 rounded-lg border border-border/70 bg-surface-2/40 px-2.5 py-2">
            <span className="text-xs text-text-muted">
              {selectedIds.length} ficha
              {selectedIds.length === 1 ? '' : 's'} selecionada
              {selectedIds.length === 1 ? '' : 's'}
            </span>
            <Select
              className="max-w-xs"
              defaultValue=""
              disabled={busy}
              onChange={(e) => {
                const value = e.target.value
                e.target.value = ''
                if (!value) return
                void handleMoveSelected(value === '__none__' ? null : value)
              }}
            >
              <option value="">Mover para…</option>
              <option value="__none__">Sem grupo</option>
              {groups.map((group) => (
                <option key={group.id} value={group.id}>
                  {group.name}
                </option>
              ))}
            </Select>
          </div>
        ) : null}

        {groups.length === 0 ? (
          <p className="text-xs text-text-dim">
            Ainda não há grupos. Crie um e marque fichas para jogá-las nele.
            {orphanCount > 0
              ? ` ${orphanCount} ficha${orphanCount === 1 ? '' : 's'} sem grupo.`
              : ''}
          </p>
        ) : (
          <ul className="space-y-2">
            {groups.map((group) => {
              const on = activeGroupIds.includes(group.id)
              const members = countByGroup(group.id)
              const deleting = pendingDelete === group.id
              const draft = renameDraft[group.id]
              return (
                <li
                  key={group.id}
                  className="rounded-lg border border-border/80 bg-surface-2/30 px-3 py-2.5"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <Input
                      className="min-w-[10rem] flex-1"
                      value={draft ?? group.name}
                      onChange={(e) =>
                        setRenameDraft((prev) => ({
                          ...prev,
                          [group.id]: e.target.value,
                        }))
                      }
                      onBlur={() => {
                        if (draft != null && draft.trim() && draft.trim() !== group.name) {
                          void handleRename(group.id)
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') void handleRename(group.id)
                      }}
                      aria-label={`Nome do grupo ${group.name}`}
                    />
                    <span className="text-[11px] text-text-dim">
                      {members} ficha{members === 1 ? '' : 's'}
                    </span>
                    <Button
                      size="sm"
                      variant={on ? 'accent' : 'secondary'}
                      onClick={() => toggleActive(group.id)}
                    >
                      {on ? 'Ativo' : 'Ativar'}
                    </Button>
                    <Button
                      size="sm"
                      variant="danger"
                      disabled={busy}
                      onClick={() =>
                        setPendingDelete(deleting ? null : group.id)
                      }
                    >
                      {deleting ? 'Cancelar' : 'Excluir'}
                    </Button>
                  </div>
                  {deleting ? (
                    <div className="mt-2 space-y-2 rounded-md border border-danger/30 bg-danger/5 px-2.5 py-2">
                      <p className="text-xs text-text-muted">
                        Excluir <strong>{group.name}</strong>? O baú do grupo
                        vai para o baú da mesa se as fichas ficarem.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Button
                          size="sm"
                          disabled={busy}
                          onClick={() => void handleDelete(group.id, false)}
                        >
                          Só o grupo — fichas ficam sem grupo
                        </Button>
                        <Button
                          size="sm"
                          variant="danger"
                          disabled={busy}
                          onClick={() => {
                            if (
                              !window.confirm(
                                `Apagar o grupo "${group.name}" e as ${members} ficha(s) dele? Isso não pode ser desfeito.`,
                              )
                            ) {
                              return
                            }
                            void handleDelete(group.id, true)
                          }}
                        >
                          Grupo e todas as fichas
                        </Button>
                      </div>
                    </div>
                  ) : null}
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </Panel>
  )
}
