# Pathtools 2e

Ferramenta de mesa para **Pathfinder 2e Remaster**, em português: ficha,
compêndio, bestiário, encontros, saque e combate em grid. Roda no seu aparelho,
sem conta e sem nuvem.

Sem fins lucrativos, feito por fã. Conteúdo de regras vem do
[Archives of Nethys](https://2e.aonprd.com/) sob a Community Use Policy da
Paizo — veja [`AVISO-LEGAL.md`](./AVISO-LEGAL.md) para o aviso completo.

## Site

https://tointoinp3.github.io/pathtools-pf2e/

Abre no navegador, sem instalar nada. Fichas e homebrew ficam **neste
aparelho e neste navegador** (não na nuvem). Para levar a outro PC, use
exportar / importar JSON.

## Windows (.exe)

https://github.com/tointoinp3/pathtools-pf2e/releases/latest

Instalador para usar sem o navegador. O Windows pode avisar que o app não é
reconhecido (não há certificado pago): **Mais informações → Executar mesmo
assim**. Fichas do site e do programa não se misturam.

## Estado atual

Ficha, compêndio, bestiário, encontros, saque e combate em grid já funcionam.
O módulo de **Mundo** (lore, NPCs, campanhas) ainda não existe — a rota mostra
"em breve".

### Para o jogador

- criação e gerenciamento de personagens, com retrato (zoom / enquadramento) e
  assistente passo a passo: uma checklist mostra o que falta e leva direto à
  pendência (herança, aumento de atributo, magia emblemática, feito de
  dedicação…)
- ficha com atributos, perícias, Conhecimentos (Lore), perícias homebrew,
  progressão por nível, conexões e mural de notas
- engine de cálculos e modificadores com **breakdown rastreável**: passe o
  mouse num número e veja de onde veio cada parcela
- painel de combate da ficha: ações básicas PF2e, rolagens, condições,
  equipamento ativo e recursos de classe
- companheiros, familiares (forma + específicos) e eidolons
- ficha de sessão pronta para imprimir
- bandeja de dados com histórico

### Para o mestre

- **bestiário** com fichas completas: ataques, magias, habilidades, fraquezas e
  CDs de Recordar Conhecimento, cada criatura em versão Normal, Elite e Fraca,
  com rolagens clicáveis e ficha de sessão para imprimir
- **gerador de encontros** pelo orçamento de XP do GM Core (trivial a extremo),
  ajustado pelo tamanho do grupo
- **gerador de saque** pela tabela de tesouro por nível do GM Core — por nível,
  por encontro (com a fatia de cada severidade) ou livre, com re-sorteio linha
  a linha e exportação em texto
- **combate em grid**: arrastar e redimensionar fichas, pincel de terreno com
  conta-gotas, zoom, iniciativa com rodada e turno, PV e condições por ficha
  (a iniciativa já desconta penalidade de condição) e importação de um
  encontro salvo inteiro

### Para o grupo

- grupos de mesa e baú compartilhado
- transferir item e dinheiro entre fichas e baús, com o inventário da mesa
  numa tela só

### Conteúdo Remaster

| | |
|---|---|
| Criaturas | **2.127** (níveis −1 a 25), em 449 famílias |
| Feitos | **5.053** |
| Itens | **4.166** |
| Magias | **1.448** |
| Divindades | **423** |
| Origens | **315** |
| Arquétipos | **178** (29 de multiclasse) |
| Rituais | **115** |
| Guias de regra em PT-BR | **78** |
| Ancestralidades | **31**, mais **17 heranças versáteis** |
| Classes | **29**, com subclasses, magias concedidas e kits iniciais |

Vem de Player Core, Player Core 2, GM Core, Monster Core, Monster Core 2,
Treasure Vault, Howl of the Wild, Tian Xia, Guns & Gears, Rage of Elements,
Impossible Magic, Dark Archives, War of Immortals, Battlecry!, NPC Core,
Divine Mysteries e das Adventure Paths — 59 fontes no total.

### Em qualquer tela

- **homebrew** de ancestralidade, herança, arquétipo, classe, companheiro,
  divindade, equipamento, feito, magia, origem e ritual — mesmas entidades do
  conteúdo oficial, com guia de preenchimento em cada editor
- exportar / importar JSON de fichas e de homebrew, em lote
- abas no estilo navegador, tema claro / escuro e escala de interface
- persistência local (IndexedDB + Dexie) com auto-save

Kitsune, Nagaji e Poppet ficam de fora enquanto as páginas de ancestralidade no
Archives of Nethys forem Legacy.

## Stack

- React 19 + TypeScript (estrito)
- Vite
- Tailwind CSS 4
- Zustand
- Dexie (IndexedDB)
- React Router 7
- oxlint

Web app local, empacotado para Windows com **Tauri** (sem Electron). O mesmo
código serve o site e o `.exe`.

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

Os testes ficam ao lado do que testam (`*.test.ts`) e miram a lógica onde um
erro passa despercebido numa conferência manual:

- `partyTransferCore` — mover item e ouro entre fichas e baús: o total do
  grupo não pode mudar, pilha dividida não pode duplicar nem sumir, munição
  carregada perde o vínculo ao trocar de dono.
- `lootGenerator` / `lootTreasure` — orçamento por nível, ajuste de tamanho
  do grupo, fatia por severidade do encontro e itens permanentes sem repetir.
- `encounterGenerator` — XP por nível relativo e orçamento por severidade.
- `combat` — iniciativa, ordem de turno, rodada e efeito de condição.
- `creatureBuilding` — ajuste Elite / Fraca.
- `parseFeatEffects` — leitura de efeitos a partir do texto do feito.
- `tabLogic` / `tabTitle` / `sidebarNav` — navegação e abas.

O padrão para código testável é o do `partyTransfer.ts`: ele continua sendo a
porta de entrada (banco, stores e as mensagens em português), mas a matemática
mora em `partyTransferCore.ts`, sem depender de UI nem de IndexedDB — é por
isso que dá para testar sem abrir o navegador.

## Estrutura

```
src/
  app/           # shell e rotas
  components/    # UI compartilhada, layout e dados
  features/      # personagens, bestiário, combate, encontros, saque, grupos,
                 # compêndio (ancestralidades, classes, origens, feitos,
                 # magias, equipamento, companheiros, rituais, divindades),
                 # abas, backup e configurações
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

IndexedDB via Dexie, atualmente em `db.version(14)`.

Tabelas:

- `characters`, `portraits` (Blob do retrato + enquadramento)
- catálogo: `backgrounds`, `ancestries`, `heritages`, `classes`, `feats`,
  `archetypes`, `companionTypes`, `itemDefinitions`, `spells`, `rituals`,
  `deities`, `creatures`
- mesa: `lootHauls`, `encounters`, `combatSessions`, `tokenImages`,
  `characterGroups`, `sharedStashes`
- `contentSources`, `settings`

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

Em **Compêndio**, cada catálogo tem editor próprio — ancestralidade, herança,
arquétipo, classe, companheiro, divindade, equipamento, feito, magia, origem e
ritual:

- criar do zero
- editar / excluir o que é seu
- duplicar um oficial como homebrew para usar de ponto de partida

Cada editor traz um guia de preenchimento ao lado dos campos. Benefícios são
interpretados pelos dados (sem `if` por ID).

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
- `combat` — iniciativa, turno, rodada e efeito de condição no tabuleiro
- `encounterGenerator` — orçamento de XP por severidade e tamanho do grupo
- `lootGenerator` / `lootTreasure` — tabela de tesouro do GM Core
- `partyTransferCore` — item e dinheiro entre fichas e baús
- `creatureBuilding` — ajuste Elite / Fraca do bestiário

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
