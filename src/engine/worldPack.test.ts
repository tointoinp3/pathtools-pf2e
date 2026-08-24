import { test, describe } from 'node:test'
import assert from 'node:assert/strict'
import {
  parseWorldPack,
  remapWorldPack,
  worldPackIsEmpty,
} from './worldPack.ts'
import { WORLD_FORMAT } from '@/features/backup/formats.ts'

describe('parseWorldPack', () => {
  test('lê um pacote válido', () => {
    const pack = parseWorldPack({
      format: WORLD_FORMAT,
      notes: [
        {
          id: 'n1',
          title: 'Porto',
          content: '[[Reino]]',
          folderId: null,
          pinned: false,
          attachments: [],
          createdAt: 't',
          updatedAt: 't',
        },
      ],
      folders: [],
      maps: [
        {
          id: 'm1',
          name: 'Continente',
          markers: [],
          countries: [],
          vertices: [],
        },
      ],
      assets: [],
    })
    assert.equal(pack.notes[0]?.title, 'Porto')
    assert.equal(pack.maps[0]?.name, 'Continente')
  })

  test('rejeita arquivo de combate', () => {
    assert.throws(
      () => parseWorldPack({ format: 'pathtools-2e.combat' }),
      /combate/,
    )
  })
})

describe('remapWorldPack', () => {
  test('preserva aresta compartilhada após remapear IDs', () => {
    const pack = remapWorldPack(
      {
        notes: [
          {
            id: 'n1',
            title: 'Capital',
            folderId: 'f1',
            content: '',
            pinned: false,
            attachments: [],
            createdAt: 't',
            updatedAt: 't',
          },
        ],
        folders: [
          {
            id: 'f1',
            name: 'Lugares',
            parentId: null,
            createdAt: 't',
            updatedAt: 't',
          },
        ],
        maps: [
          {
            id: 'm1',
            name: 'Mapa',
            imageAssetId: 'img1',
            imageWidth: 100,
            imageHeight: 100,
            markers: [
              {
                id: 'pin1',
                x: 0.5,
                y: 0.5,
                shape: 'star',
                assetId: null,
                color: '#fff',
                size: 0.02,
                label: '',
                showLabel: false,
                noteId: 'n1',
              },
            ],
            vertices: [
              { id: 'a', x: 0, y: 0 },
              { id: 'b', x: 1, y: 0 },
              { id: 'c', x: 1, y: 1 },
              { id: 'd', x: 0, y: 1 },
            ],
            countries: [
              {
                id: 'c1',
                name: 'Norte',
                color: '#f00',
                vertexIds: ['a', 'b', 'c'],
                fillOpacity: 0.3,
                showLabel: true,
                label: null,
                noteId: 'n1',
              },
              {
                id: 'c2',
                name: 'Sul',
                color: '#00f',
                vertexIds: ['a', 'c', 'd'],
                fillOpacity: 0.3,
                showLabel: true,
                label: null,
                noteId: null,
              },
            ],
            legend: [],
            camera: null,
            showMarkers: true,
            showCountries: true,
            showLabels: true,
            showPaths: true,
            iconScale: 1,
            paths: [],
            createdAt: 't',
            updatedAt: 't',
          },
        ],
        assets: [
          {
            id: 'img1',
            kind: 'map',
            name: 'fundo',
            mimeType: 'image/png',
            dataBase64: 'xx',
          },
        ],
      },
      'now',
    )
    assert.notEqual(pack.notes[0]?.id, 'n1')
    assert.equal(pack.notes[0]?.folderId, pack.folders[0]?.id)
    const north = pack.maps[0]?.countries[0]
    const south = pack.maps[0]?.countries[1]
    assert.ok(north && south)
    const shared = north.vertexIds.filter((id) => south.vertexIds.includes(id))
    assert.equal(shared.length, 2)
    assert.equal(pack.maps[0]?.markers[0]?.noteId, pack.notes[0]?.id)
    assert.equal(pack.maps[0]?.imageAssetId, pack.assets[0]?.id)
  })

  test('pacote vazio', () => {
    assert.equal(
      worldPackIsEmpty({ notes: [], folders: [], maps: [], assets: [] }),
      true,
    )
  })
})
