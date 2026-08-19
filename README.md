# Pathtools 2e

Aplicativo modular local para **Pathfinder 2e Remaster**, em português, pensado
para crescer (personagens, combate, mundo, campanhas e homebrew).

Sem fins lucrativos, feito por fã. Conteúdo de regras vem do
[Archives of Nethys](https://2e.aonprd.com/) sob a Community Use Policy da
Paizo — veja [`AVISO-LEGAL.md`](./AVISO-LEGAL.md) para o aviso completo.

## Estado atual

**Character Builder funcional.** Combate de mesa (grid, encontros) e Mundo /
campanhas ainda não existem — as rotas mostram “em breve”.

Já inclui:

- criação e gerenciamento de personagens, com retrato (zoom / enquadramento) e
  assistente passo a passo (checklist + navegação travada até ancestralidade,
  origem e classe)
- ficha com atributos, perícias, Conhecimentos (Lore), perícias homebrew,
  progressão por nível, conexões e mural de notas
- engine de cálculos e modificadores com breakdown rastreável
- **30 ancestralidades Remaster** (Player Core, PC2, Howl of the Wild, Tian Xia,
  Guns & Gears Remastered, Battlecry!) com heranças e feitos — mais **17
  heranças versáteis** (Aiuvarin, Dromaar, Nephilim, Dragonblood, Changeling,
  Dhampir, Duskwalker, Hungerseed, Reflection, Beastkin e geniekin)
- **29 classes Remaster** (Player Core, PC2, Impossible Magic, Rage of Elements,
  Dark Archives, Guns & Gears, War of Immortals, Battlecry!), com subclasses,
  magias concedidas e kits iniciais onde o AoN publica (16 kits; as demais
  classes usam 15 po)
- **253 origens oficiais** Remaster
- feitos Remaster de ancestralidade, classe, perícia, gerais e arquétipos
- **137 arquétipos** (multiclasse e outros)
- catálogo de magias Remaster (tradições, foco e truques de classe), rituais e
  divindades
- equipamento Remaster (armas, armaduras, runas, consumíveis, Treasure Vault…)
- companheiros, familiares (forma + específicos) e catálogo de animais para
  Animal Despertado
- painel de combate da ficha (ações básicas PF2e, rolagens, cargas como Golpe
  Mágico)
- bandeja de dados com histórico
- editor de origens homebrew
- persistência local (IndexedDB + Dexie) com auto-save

Ainda **não** inclui: simulador de encontro / grid de combate, worldbuilder,
campanhas, nem bestiário para o mestre. Kitsune, Nagaji e Poppet ficam de fora
enquanto as páginas de ancestralidade no Archives of Nethys forem Legacy.

## Stack

- React 19 + TypeScript (estrito)
- Vite
- Tailwind CSS 4
- Zustand
- Dexie (IndexedDB)
- React Router 7
- oxlint

Web app local — arquitetura compatível com empacotamento futuro via Tauri
(sem Electron).

## Instalação

```bash
npm install
```

## Execução

```bash
npm run dev
```

Abra o endereço indicado no terminal (geralmente `http://localhost:5173`).

## Build

```bash
npm run build
```

Pré-visualizar o build:

```bash
npm run preview
```

Lint:

```bash
npm run lint
```

Conferir se sobrou texto em inglês na UI:

```bash
npm run check:pt
```

## Testes

```bash
npm test
```

Runner nativo do Node (`node --test`), sem dependência nova: o Node lê
TypeScript direto e `scripts/test-alias.mjs` resolve o `@/` e os imports sem
extensão, que no app quem resolve é o Vite. Para rodar em modo contínuo:

```bash
npm run test:watch
```

Os testes ficam ao lado do que testam (`src/engine/*.test.ts`) e cobrem a
lógica onde um erro passa despercebido numa conferência manual:

- `partyTransferCore` — mover item e ouro entre fichas e baús: o total do
  grupo não pode mudar, pilha dividida não pode duplicar nem sumir, munição
  carregada perde o vínculo ao trocar de dono.
- `lootGenerator` / `lootTreasure` — orçamento por nível, ajuste de tamanho
  do grupo, fatia por severidade do encontro e itens permanentes sem repetir.

`partyTransfer.ts` continua sendo a porta de entrada (banco, stores e as
mensagens em português); a matemática mora em `partyTransferCore.ts`, sem
depender de UI nem de IndexedDB — é por isso que dá para testar sem abrir o
navegador.

## Estrutura

```
src/
  app/           # shell e rotas
  components/    # UI compartilhada, layout e dados
  features/      # personagens, ancestralidades, classes, origens, feitos,
                 # magias, equipamento, companheiros, rituais, divindades
  data/seeds/    # conteúdo oficial Remaster
  data/i18n/     # traduções PT-BR de nomes e descrições
  db/            # Dexie + versionamento + seed
  engine/        # regras e cálculos (sem UI)
  stores/        # Zustand
  types/         # tipos do domínio
  pages/         # páginas da aplicação
  utils/         # labels PT-BR e helpers
scripts/         # pipeline de extração de conteúdo do Archives of Nethys
_scratch/        # rascunhos e dumps intermediários (fora do controle de versão)
```

## Adicionar uma classe oficial

O conteúdo vem do Elasticsearch do AoN, nunca escrito à mão. Documentos com
`remaster_id` preenchido são a versão *legacy* e são descartados.

```bash
node scripts/fetch-class-remaster-feats.mjs ranger
node scripts/generate-remaster-feats.mjs ranger
```

Sem argumento, os dois scripts processam todas as classes; com o nome de uma
classe, só ela — assim dá para adicionar uma sem regerar arquivos já revisados.
Depois: escreva `classesX.ts` (siga `.cursor/rules/class-mechanics-guide.mdc`),
registre o ID em `ids.ts`, ligue em `classes.ts` e `feats.ts`, complete os nomes
e descrições PT em `src/data/i18n/` e **suba o `CURRENT_SEED_VERSION`**.

## Persistência

IndexedDB via Dexie, atualmente em `db.version(4)`.

Tabelas:

- `characters`
- `portraits` (Blob do retrato + enquadramento)
- `backgrounds`, `ancestries`, `heritages`, `classes`, `feats`
- `contentSources`
- `settings`

O seed é **idempotente**: conteúdo oficial ausente é inserido e, quando
`CURRENT_SEED_VERSION` sobe, os registros oficiais são atualizados via upsert.
Homebrew nunca é tocado. Ao adicionar ou corrigir conteúdo oficial, **suba o
`CURRENT_SEED_VERSION`** em `src/db/database.ts`.

Quando a versão e as contagens gravadas em `settings.seedCounts` já batem com o
banco, o seed sai antes de fazer qualquer trabalho — só então os módulos de
conteúdo são carregados. Por isso eles usam `import()` dinâmico: o pacote
oficial é grande e não entra na carga inicial.

## Idioma

O conteúdo dos seeds é a **fonte canônica em inglês** (bate com os livros e o
Archives of Nethys). O português é uma camada por cima, em `src/data/i18n/`,
aplicada por `withLocalizedFeatName`.

Rode `npm run check:pt` depois de adicionar conteúdo. Ele existe porque o
glossário automático troca termos soltos ("Strike" → "Golpe") **dentro** de
frases em inglês: um teste que só pergunte "a tradução mudou o texto?" passa
mesmo com a descrição inteira em inglês. O script mede a proporção de palavras
inequivocamente inglesas no texto todo.

Não colapse as duas coisas: o texto em inglês é o que permitirá uma versão em
inglês no futuro. Ao adicionar outros idiomas, cada pacote deve virar um módulo
próprio carregado sob demanda — a divisão de chunks já está preparada para isso.

Ponto de atenção para quando isso acontecer: hoje a tradução é aplicada **na
hora de semear** e o texto traduzido é o que fica gravado no IndexedDB. Trocar
de idioma exigiria ressemear. O caminho é mover a localização para a
renderização (como `FeatBrowser` já faz) e guardar o conteúdo canônico no banco.

## Sistema de conteúdo

Oficial e homebrew usam as **mesmas entidades**. A diferença relevante é só:

```ts
provenance: { type: 'official' | 'homebrew' }
```

Mesmo seletor, validação, boosts, perícias, banco e ficha. Fontes
(`ContentSource`) são reutilizáveis para futuros pacotes de conteúdo.

Só entra Pathfinder 2e **Remaster**. Páginas do AoN com aviso Legacy são
ignoradas.

## Homebrew

Em **Compêndio → Origens**:

- criar origem
- editar / excluir homebrew
- duplicar oficial como homebrew

Benefícios são interpretados pelos dados (sem `if` por ID de origem).

## Engine

Camada em `src/engine/`, sem nenhuma dependência de UI:

- `resolveCharacterSheet` — ponto de entrada; recebe o personagem persistido
  mais os catálogos e devolve a ficha resolvida
- proficiência, perícias, CA, PV, salvaguardas, CD de classe
- `resolveAncestryBenefits`, `resolveBackgroundBenefits`, `resolveClassBenefits`
- progressão (boosts por nível, aumentos de perícia, slots de feito)
- conjuração (slots, preparação, foco, magias emblemáticas)
- dinheiro inicial e kit de classe
- `evaluateFormula` — avaliador seguro para as fórmulas das Conexões

Nada derivado é gravado no banco: a ficha é sempre recalculada. A UI apenas
exibe resultados.

Contribuições guardam a origem (`sourceType`, `sourceId`, `label`) para permitir
breakdown e expansão futura (itens, condições, feitos etc.). Valores que ainda
não podem ser calculados usam `DerivedStat` com `pending` e `pendingReason`, em
vez de exibir um número errado.

## Referência de regras

Pathfinder 2e **Remaster** — Archives of Nethys: https://2e.aonprd.com/

Descrições longas são parafraseadas em português; mecânicas permanecem fiéis.
UI em pt-BR; IDs, `originalName` e código em inglês.
