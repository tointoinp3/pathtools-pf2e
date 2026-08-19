import type { CreatureFamilySection } from '@/types/creature'

/** Lore (descrição + sidebars da ficha) das criaturas de Pathfinder #200: Seven Dooms for Sandpoint. */
export const CREATURE_LORE_SEVEN_DOOMS: Record<
  string,
  { description: string; sections: CreatureFamilySection[] }
> = {
  "creature-abstalar-zantus": {
    "description": "",
    "sections": []
  },
  "creature-adimar-scarnetti": {
    "description": "",
    "sections": []
  },
  "creature-aliver-pillbug-podiker": {
    "description": "",
    "sections": []
  },
  "creature-arika-avertin": {
    "description": "",
    "sections": []
  },
  "creature-ascended-disciple": {
    "description": "",
    "sections": []
  },
  "creature-asmerelli": {
    "description": "",
    "sections": []
  },
  "creature-chertus-jheed": {
    "description": "",
    "sections": []
  },
  "creature-clockwork-serpent": {
    "description": "Serpentes de corda costumam servir de guardiãs em laboratórios ou templos serpentinos.",
    "sections": [
      {
        "id": "experimental-serpents",
        "title": "Serpentes Experimentais",
        "body": "Dizem que serpentes de corda ainda mais estranhas existem no coração dos enclaves serpentinos. Esses construtos supostamente conseguem reparar dano a si mesmos ao trocar de modo serpente, ativar formas extras que permitem natação ou voo, ou até se despedaçar num enxame fervilhante de serpentes de corda menores."
      }
    ]
  },
  "creature-coloxus": {
    "description": "Embora o coloxus tenha a cabeça hedionda de uma mosca monstruosa, esses demônios são meticulosos e limpos, sempre vestidos com roupas elegantes sem uma mancha. Coloxus são manipuladores e intrigantes nascidos de almas vaidosas até a destruição. Mortais malignos adoram evocá-los como emissários ou espiões, mas também são assassinos excelentes. Mesmo no papel de assassino, o demônio permanece clamorosamente educado e formal, deleitando-se com a ironia de perpetuar um crime tão horrendo sob o disfarce de boa etiqueta, como se fosse um pedaço delicado de diplomacia.",
    "sections": [
      {
        "id": "enemies-of-filth",
        "title": "Inimigos da Imundície",
        "body": "A imundície costuma ser inescapável no Abismo e, por isso, demônios coloxus estão particularmente ansiosos para serem evocados para longe daquele plano e trabalhar o mal em realidades mais limpas. Quando se usa aliado planar ou amarração planar para evocar um coloxus, evocá-lo num ambiente limpo e prometer que você não o obrigará a servir em condições imundas pode facilitar a barganha. A critério do Mestre, o demônio pode concordar em servir por mais tempo ou a um custo menor que o normal."
      }
    ]
  },
  "creature-devils-disciple": {
    "description": "",
    "sections": []
  },
  "creature-divine-warden-of-haagenti": {
    "description": "",
    "sections": []
  },
  "creature-false-devil": {
    "description": "",
    "sections": []
  },
  "creature-fiendish-flock": {
    "description": "",
    "sections": []
  },
  "creature-fungus-tyrant": {
    "description": "Há centenas de anos, um grupo de poderosas assassinas súcubos invadiu o reino Abissal do senhor demoníaco da doença e dos fungos, Cyth-V'sug. As súcubos buscavam matar uma bruxa poderosa que havia profanado um templo profano a que serviam. Falharam na missão, mas dos cadáveres cresceram os primeiros tiranos fúngicos. Satisfeita com o resultado, a bruxa então semeou inúmeros mundos no Plano Material com esporos de tirano fúngico, que desde então cresceram e prosperaram nos novos ambientes como o apodrecimento prospera num cadáver. Hoje, centenas de tiranos fúngicos habitam os locais mais fétidos do Plano Material. Gostam especialmente de sistemas de cavernas vastos e cidades em ruínas, mas também aparecem em bosques corrompidos onde fey da praga mandam, ou nos esgotos de cidades ativas que despejam enormes quantidades de lixo mágico.\n\nUm encontro com um monstro planta normalmente sem inteligência agindo com intenção metódica pode ser evidência das manipulações de um tirano fúngico, mas tiranos fúngicos também gostam de manter outros tipos de criaturas como animais de estimação e servos — em especial humanoides atraentes. Servos especialmente favorecidos recebem o presente do abraço do tirano fúngico e se transformam em minions fungoides para sempre leais ao pálido soberano. Ainda assim, a maioria dos tiranos fúngicos percebe que um leque diversificado de guardiões é o melhor, e costuma manter alguns servos não fúngicos à mão para proteger o covil.\n\nTiranos fúngicos são violentamente ciumentos. Quem tenta seduzir seus animais dominados ou curar os infectados por eles ganha a ira eterna. Mas são as súcubos que mais enraivecem os tiranos fúngicos. Nesses demônios, o tirano vê o glamour e o poder antigos aos quais já não tem acesso, e só a destruição brutal dessas memórias zombeteiras acalma a fúria. Um tirano fúngico diante de alguém que suspeita ser súcubo é terrível: nessas batalhas, os seres fúngicos infernais abandonam a abordagem habitual de truques mentais sutis e despejam todo o poder para despedaçar a criatura ofensora. Tiranos fúngicos também se deleitam em transformar súcubos em criaturas fungoides sob seu controle.\n\nEmbora o ciúme não as obrigue a combater outros tiranos fúngicos, sempre cuidam de manter territórios separados dos parentes próximos e se esforçam para não “furtar” os animais encantados e infestados de outro tirano.\n\nUm tirano fúngico tem 1,8 m de altura e pesa 70 kg.",
    "sections": [
      {
        "id": "spore-trall",
        "title": "Escravo de Esporos",
        "body": "Quando uma criatura se torna escrava de esporos, ergue-se da morte com as mesmas estatísticas que tinha em vida, mas ganha o traço fungo, além de imunidade a efeitos de morte, doença, paralisado e veneno, e sua tendência passa a coincidir com a do tirano fúngico que a criou. Quando um escravo de esporos é morto, a alma finalmente viaja ao Ossário para julgamento, mas os restos físicos incrustados de fungo muitas vezes geram novas criaturas fúngicas, como miceloides, fungos violetas ou drakauthixes. Esses filhotes fúngicos não são controlados pelo tirano fúngico, mas em geral o consideram um aliado ou, com mais frequência, uma divindade."
      },
      {
        "id": "tanglebriar-s-tyrants",
        "title": "Tiranos de Tanglebriar",
        "body": "Os alcances fétidos de Tanglebriar, no sul de Kyonin, são a região de Golarion onde tiranos fúngicos são ao mesmo tempo mais comuns e mais poderosos. Muitos tiranos fúngicos de Tanglebriar têm poderes druídicos ou feitíceiros potentes além das magias inatas divinas, e desenvolveram variantes incomuns e violentas de vagens de esporos que lhes dão ainda mais opções táticas em combate."
      }
    ]
  },
  "creature-ghast-cultist": {
    "description": "",
    "sections": []
  },
  "creature-giant-longlegs": {
    "description": "A mais espalhada das pernalongas é a pernalonga gigante, criatura com o corpo do tamanho de um cão cujas pernas longas e finas lhe dão uma aparência bem mais intimidante.",
    "sections": []
  },
  "creature-glorkus": {
    "description": "",
    "sections": []
  },
  "creature-gorlak": {
    "description": "",
    "sections": []
  },
  "creature-gurlunk": {
    "description": "",
    "sections": []
  },
  "creature-iazmilor": {
    "description": "",
    "sections": []
  },
  "creature-jervis-stoot": {
    "description": "",
    "sections": []
  },
  "creature-jordus-munt": {
    "description": "",
    "sections": []
  },
  "creature-kaleb-valdemars-body": {
    "description": "",
    "sections": []
  },
  "creature-kanker": {
    "description": "Endinyon Greethe foi o primeiro alquimista de Sandpoint. Ao chegar na cidade nova e movimentada apenas 2 anos depois da fundação em 4666 AR, o talentoso expatriado nidalese abriu loja perto da orla sul e teve sucesso moderado, oferecendo aos moradores remédios herbais, isca de pesca aprimorada alquimicamente e outros elixires e tinturas úteis. Mas Endinyon guardava em segredo a maior fonte de renda — a mesma que o fizera fugir de Nidal: era um ladrão de cadáveres competente. Pelos três anos seguintes, forneceu corpos a tipos de má reputação em Magnimar ao sul e vilarejos menores como Galduria, Wolf's Ear e até Ravenmoor ao norte. Mas quando um pedido particularmente grande e complicado para Riddleport envolvendo corpos que ainda não estavam bem mortos deu errado, os cidadãos de Sandpoint se levantaram e queimaram a loja até o chão. Endinyon fugiu para os túneis de contrabandistas sob a cidade, afastando-se de Sandpoint onde os inimigos o procuravam alto e baixo. Por ironia, seguiu os túneis até uma rede de tocas de carniçais e acabou abaixo de Pauper's Graves a leste da cidade: um sítio de onde havia roubado muitos corpos. Infelizmente, esses furtos tinham enfurecido especialmente os carniçais que ainda moravam lá. Endinyon morreu, capturado e torturado pelos carniçais cujo “despensa” havia saqueado vezes demais, só para erguer-se ele mesmo como carniçal. Nos anos seguintes, o homem que fora Endinyon reinventou-se em algo novo — um carniçal chamado Kanker. Foi nas cavernas mais profundas de carniçais abaixo de Pauper's Graves que descobriu a fé de Kabriri, e não demorou a converter-se. Com o tempo, o jeito empreendedor e as habilidades de liderança de Kanker o ajudaram a subir ao poder entre os mortos-vivos que habitavam o interior de Sandpoint. Ainda assim, sempre guardou raiva e sede de vingança contra o povo de Sandpoint por arruinar o que começara a construir.\n\nKanker deixou os outros carniçais, explorou as Terras Sombrias abaixo da Costa Perdida e por fim encontrou caminho até as câmaras em torno do Fosso. Lá descobriu o templo antigo que ocupava as profundezas, e soube que achara o novo chamado. Começou a tarefa de esvaziar o templo para que ficasse adequado ao senhor demoníaco dos carniçais e dos segredos guardados pelos mortos, e com o tempo juntou-se a ele um pequeno séquito de cultistas carniçais de Kanker de pensamento semelhante — a maioria também com rancor contra os carniçais da Costa Perdida e os cidadãos de Sandpoint.\n\nPor anos Kanker contentou-se em estudar e adorar, mas numa viagem pelo interior de Sandpoint para forragear suprimentos alquímicos, um encontro fortuito com uma presença imponente de olhos vermelhos inquietantes deu ao carniçal uma nova direção. O encontro com o Bispo Vermelho inspirou Kanker, fazendo-o perceber que merecia mais do que um templo cripta antigo no interior. Ele e seus carniçais mereciam Sandpoint, e se Kanker auxiliasse o Bispo Vermelho ajudando outro grupo ativo na região, a Aurora da Meia-Noite, as perdições que logo viriam a Sandpoint dariam a Kanker tudo de que precisava para transformar a cidade no próprio domínio de morte-viva.\n\nKanker não é tolo. Suspeita que o Bispo Vermelho tem agenda oculta, mas a ideia de voltar a Sandpoint depois de tantos anos para governar a antiga casa é tentadora demais para o carniçal resistir, e assim pôs o templo e os recursos à disposição da Aurora da Meia-Noite e apresentou Tiluatchek ao peão dele, Aliver Podiker. Agora espera o momento certo de atacar.\n\nEsta aventura assume que Kanker permanece em grande parte nas sombras até os PCs chegarem ao nível mais baixo abaixo do Fosso, onde se torna a ameaça mais significativa que enfrentarão. Em combate, Kanker prefere lutar à distância com bombas alquímicas, mas não recua do corpo a corpo se puder evitar ser cercado. O ataque típico é usar Eflúvio Tóxico, golpear com o mangual e então golpear com uma garra — prefere evitar ataques de mandíbulas contra vivos, pois considera a morte-viva carniçal um presente e é seletivo sobre a quem inflige febre carniçal.\n\nSe os PCs não derrotarem Kanker no primeiro encontro, ele não hesitará em reunir novos aliados com seus rituais.",
    "sections": []
  },
  "creature-minargul": {
    "description": "",
    "sections": []
  },
  "creature-mnoghoth": {
    "description": "",
    "sections": []
  },
  "creature-narlo-nyrell": {
    "description": "",
    "sections": []
  },
  "creature-red-bishop": {
    "description": "Este sacerdote mariposa de Pazuzu não compartilha o nome verdadeiro com ninguém, em parte porque o próprio nome não pode ser dito em voz alta — só transmitido via um envio telepático inquietante. Para aqueles que manipula e atormenta, é conhecido apenas como o Bispo Vermelho.\n\nO Bispo Vermelho chegou à Costa Perdida na virada do século, em 4700 AR. Atraído de terras distantes pelo chamariz da influência do patrono demoníaco sobre a região, deleitou-se ao encontrar não só um santuário antigo dedicado a Pazuzu escondido na rocha da Ilha do Chopper nos arredores de Sandpoint, mas um legado muito mais antigo e poderoso nas profundezas do próprio Fosso. Ali sabia que existia um ponto fino entre o Plano Material e o reino Abissal de Alta M'vania, onde Pazuzu reina. Mas uma guarda antiga mantinha a ruptura potencial da realidade sob controle. Incapaz de desfazer essa guarda diretamente — e, de fato, preferindo corrupção lenta e crueldade a dor rápida e ruína imediata —, o Bispo Vermelho instalou-se na região para começar um plano que levaria mais de duas décadas a frutificar.\n\nA sorte de Sandpoint escureceu no dia em que o Bispo Vermelho chegou. A vida já era dura, mas quando ele começou a manipular eventos, as coisas pioraram de forma inegável. Foi o Bispo Vermelho quem garantiu que o excêntrico local Jervis Stoot encontrasse e fosse corrompido pela estatueta de Pazuzu que daria origem à sequência de assassinatos do Chopper. Foram os envios de pesadelo e o veneno sussurrado do Bispo Vermelho que fizeram tanta gente em Sandpoint tratar Nualia de forma horrível, resultando por fim no incêndio devastador que quase queimou a Catedral de Sandpoint até o chão. E embora o próprio Bispo Vermelho não fosse diretamente responsável pela ascensão do Senhor das Runas Karzoug, suas manipulações sutis certamente ajudaram a espalhar a influência do poço rúnico menor da ira escondido abaixo de Sandpoint, de modo que certos locais poderosos ficaram mais propensos à crueldade.\n\nDurante os 20 anos seguintes, Sandpoint suportou uma tragédia após outra. E embora a dor causada pela influência do Bispo Vermelho o divertisse, era só um efeito colateral do objetivo principal. Pois tais eventos eram o melhor jeito de cultivar as ferramentas de que precisava para ver a destruição da guarda de Sazzleru no Fosso. Aventureiros eram o objetivo do Bispo Vermelho — aventureiros que não fossem agentes diretos do Abismo, mas, como tantos mortais, pudessem ser manipulados a fazer a vontade dele.\n\nO Bispo Vermelho prefere manipular o mundo à sua volta a enfrentar inimigos diretamente em combate. Se puder orquestrar uma calamidade ou desastre mortal para eliminar os inimigos, fará isso em vez de confrontá-los em batalha. Ainda assim, no fim desta aventura, quando faz contato com o “projeto” mais recente (os PCs), é provável que seja forçado a lutar.\n\nQuando o combate é inevitável, o Bispo Vermelho luta com o máximo de aliados possível, para permanecer à distância e conjurar magias contra os inimigos. Assassino fantasmagórico é uma das favoritas — quem é alvo dessa magia suporta visões realistas de desastres horrorosos que encerram o mundo e parecem concentrar o grosso da devastação na vítima. Ao lutar com aliados assim, desativa o Olhar Portentoso, mas o ativa de imediato se estiver cercado ou reduzido a menos de 150 PV, independentemente de capangas ou aliados que possa amedrontar. No corpo a corpo, o Bispo Vermelho usa a espada longa com eficácia assustadora. Quem tenta enfrentá-lo de perto pode esperar um conjurador fraco — e pode não viver para se arrepender. Em geral, o Bispo Vermelho faz dois Golpes com a espada, então ou se move para uma posição melhor ou Foca o Olhar num inimigo.\n\nEmbora Sete Perdições para Sandpoint assuma que o Bispo Vermelho não sobrevive, se o clérigo mariposa escapar pode se tornar um inimigo recorrente perigoso — especialmente porque, uma vez derrotado e forçado a fugir, passa a trabalhar cada vez mais à distância, manipulando eventos para tornar a vida horrível para os inimigos em vez de buscar outro reencontro em batalha.",
    "sections": []
  },
  "creature-ripnugget": {
    "description": "",
    "sections": []
  },
  "creature-scarhorn": {
    "description": "",
    "sections": []
  },
  "creature-sicklefang-longlegs": {
    "description": "Um pouco maior que a pernalonga gigante, a presa-foice leva o nome pelas mandíbulas incomumente grandes e curvas, usadas para sangrar a presa com eficiência mortal.",
    "sections": []
  },
  "creature-spectral-devil": {
    "description": "",
    "sections": []
  },
  "creature-statue-of-alaznist": {
    "description": "",
    "sections": []
  },
  "creature-tiluatchek": {
    "description": "",
    "sections": []
  },
  "creature-tunch": {
    "description": "",
    "sections": []
  },
  "creature-vizmivool": {
    "description": "",
    "sections": []
  },
  "creature-wolgur-wrabs": {
    "description": "",
    "sections": []
  },
  "creature-zalavexus": {
    "description": "Este verme que anda foi cultista do Grande Antigo Hastur na vida anterior. Continua as conspirações e busca avançar os planos malignos na nova existência.",
    "sections": []
  },
  "creature-ziondriel": {
    "description": "",
    "sections": []
  },
  "creature-ziradini": {
    "description": "",
    "sections": []
  },
  "creature-zoog": {
    "description": "",
    "sections": []
  },
  "creature-zoog-swarm": {
    "description": "Se uma família de zoogs evita brigas internas e encontra fonte de comida confiável o bastante, os números podem inchar até enxames verdadeiramente enormes.",
    "sections": []
  }
}
