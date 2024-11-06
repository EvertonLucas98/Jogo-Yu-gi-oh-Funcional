// Armazena o elemento que corresponde NUMERICAMENTE a quantidade de vida do PLAYER 1
const player1LifeAmount = document.getElementById('player1-Life-Amount')
// Armazena o elemento que corresponde NUMERICAMENTE a quantidade de vida do PLAYER 2
const player2LifeAmount = document.getElementById('player2-Life-Amount')
// Armazena o elemento que corresponde GRAFICAMENTE a quantidade de vida do PLAYER 1
const player1LifeBar = document.getElementById('player1-health')
// Armazena o elemento que corresponde GRAFICAMENTE a quantidade de vida do PLAYER 1
const player2LifeBar = document.getElementById('player2-health')
// Armazena o elemento que corresponde à TELA DE RESULTADO
const resultScreen = document.getElementById('result-screen')
// Armazena o elemento que corresponde ao BOTÃO DE RECOMEÇAR
const restartButton = document.getElementById('restart-button')

// Cria os elementos que serão plotados no HTML
const createCard = (frontUrl, atk, def, deck, position, backUrl='imgs/Down.jpg') => `
    <div class="flip-card">
        <div class="flip-card-front">
            <img src="${backUrl}" class="face-card-img" alt="face-down">
        </div>
        <div class="flip-card-back">
            <img src="${frontUrl}" class="face-card-img" alt="face-up" data-atk="${atk}" data-def="${def}" data-deck="${deck}" position="${position}">
        </div>
    </div>
`

// Função que renderiza as cartas num container
const renderCards = (cards, containerId) => {
    // Obtém a div que será utilizada para renderizar as cartas
    const container = document.getElementById(containerId)
    // Renderizando as cartas
    container.innerHTML = cards.map(card => createCard(card.url, card.atk, card.def, card.deck)).join('')
}

// Armazena as informações das cartas do DECK SUPERIOR
const topDeckCards = [
    {url: "imgs/DarkPaladin.jpg", atk: 2900, def: 2400, deck: 'top', position: 1},
    {url: "imgs/DarkMagicianGirl.jpg", atk: 2000, def: 1700, deck: 'top', position: 2},
    {url: "imgs/SummonedSkull.jpg", atk: 2500, def: 1200, deck: 'top', position: 3},
    {url: "imgs/Kuriboh.jpg", atk: 300, def: 200, deck: 'top', position: 4},
    {url: "imgs/BlackLusterSoldier.jpg", atk: 3000, def: 2500, deck: 'top', position: 5}
]

// Armazena as informações das cartas do DECK INFERIOR
const bottomDeckCards = [
    {url: "imgs/LusterDragon.jpg", atk: 2400, def: 1400, deck: 'bottom', position: 6},
    {url: "imgs/BlueEyesWhiteDragon.jpg", atk: 3000, def: 2500, deck: 'bottom', position: 7},
    {url: "imgs/ObeliskTheTormentor.jpg", atk: 4000, def: 4000, deck: 'bottom', position: 8},
    {url: "imgs/RedEyesBlackDragon.jpg", atk: 2400, def: 2000, deck: 'bottom', position: 9},
    {url: "imgs/CyberDragon.jpg", atk: 2100, def: 1600, deck: 'bottom', position: 10}
]

// Função que obtém os atributos das cartas do deck superior que são clicadas (1º)
const infoValues = (event) => {
    // Armazena as informações da carta
    const img = event.target
    // Armazena as informação do ATAQUE da carta
    const atk = img.getAttribute('data-atk')
    // Armazena a informação da DEFESA da carta
    const def = img.getAttribute('data-def')
    // Armazena a informação do ALT da carta
    const alt = img.getAttribute('alt')
    // Armazena a informação do DECK da carta
    const deck = img.getAttribute('data-deck')
    // Armazena as informações do container do deck da carta
    const containerCard = event.target.closest('.flip-card')
    // Armazena o primeiro filho do container do deck da carta
    const childContainerCard = containerCard.querySelectorAll('div')[1]
    // Armazena a carta do primeiro filho do container do deck
    const card = childContainerCard.querySelector('img')
    // Adiciona a carta à área de pré-visualização
    createPreviewCard(card)
    // Adiciona a carta à área de duelo
    addToDuelArea(img.src, alt, atk, def, deck)
}

// Função que adiciona a carta à área de duelo (2º)
const addToDuelArea = (cardSrc, alt, atk, def, deck) => {
    // Armazena as informações da ÁREA DE DUELO
    const duelArea = document.querySelector('.duel')
    // Armazena as informações da PRIMEIRA carta da área de duelo
    const duelAreaCard1 = document.querySelector('.duel-card-1')
    // Armazena as informações da SEGUNDA carta da área de duelo
    const duelAreaCard2 = document.querySelector('.duel-card-2')
    // Armazena a QUANTIDADE de imagens existentes na área de duelo
    const amountCards = duelArea.querySelectorAll('img').length
    // Armazena a LARGURA da tela
    const width = window.innerWidth;
    // Armazena o COMPRIMENTO da tela
    const height = window.innerHeight;

    // Se não tiver NENHUMA carta na área de duelo e se a carta clicada está virada para cima
    if (amountCards == 1 && alt=='face-up') {
        // Renderiza a carta na área de duelo,
        renderDuelCards(duelAreaCard1, width, height, cardSrc, atk, def, deck, 'card1')
        // Desabilita o deck superior
        disableDeck('top-deck')
        // Chama a função para escolher a carta do computador
        computerDuelCard(duelAreaCard2, width, height, 'card2', randomNumber(0, 4))
    } else if (amountCards == 2 && alt=='face-up') { // Se tiver UMA carta na área de duelo e se a carta clicada está virada para cima
        // Renderiza a segunda carta na área de duelo
        renderDuelCards(duelAreaCard2, width, height, cardSrc, atk, def, deck, 'card1')
        // Chama a função para informar os ataques e as defesas das cartas do duelo
        infoDuelValues(duelAreaCard1, duelAreaCard2)
        // Limpa a área de duelo
        clearDuelArea()
    }
}

// Função para GERAR UM NÚMERO ALEATÓRIO num determinado intervalo
const randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

// Função para SELECIONAR UMA CARTA PARA O COMPUTADOR 
const computerDuelCard = (duelArea, width, height, cardNum, position) => {
    const src = bottomDeckCards[position].url
    const atk = bottomDeckCards[position].atk
    const def = bottomDeckCards[position].def
    const deck = bottomDeckCards[position].deck
    renderDuelCards(duelArea, width, height, src, atk, def, deck, cardNum)
}

// Função para renderizaz uma carta numa área de duelo
const renderDuelCards = (duelAreaCard, width, height, cardSrc, atk, def, deck, cardNum) => {
    // Armazena a criação de uma imagem
    const cardElement = document.createElement('img')
    // Adiciona o atributo SRC
    cardElement.src = cardSrc
    // Adiciona o atributo ID
    cardElement.id = cardNum
    // Adiciona o atributo ALT
    cardElement.alt = "card1-in-duel"
    // Adiciona o atributo DATA-ATK
    cardElement.setAttribute("data-atk", atk)
    // Adiciona o atributo DATA-DEF
    cardElement.setAttribute("data-def", def)
    // Adiciona o atributo DATA-DECK
    cardElement.setAttribute("data-deck", deck)

    // Obs.: Mudar a estrutura a seguir por um switch
    // Se a tela é menor que 451px
    if (width < 451) {
        cardElement.style.width = '4.5em'
        cardElement.style.height = '8em'
    // Se a largura da tela é menor que 1081px e se a altura é menor que 450px
    } else if (width < 1081 && height < 450) {
        cardElement.style.width = '7em'
        cardElement.style.height = '8.5em'
    // Se a largura da tela é menor que 1081px
    } else if (width < 1081) {
        cardElement.style.width = '10.5em'
        cardElement.style.height = '14em'
    // Se a largura da é menor que 1451px e se a altura é menor que 571px
    } else if (width < 1451 && height < 571) {
        cardElement.style.width = '10.5em'
        cardElement.style.height = '13.5em'
    // Se a largura da é menor que 1451px e se a altura é menor que 756px
    } else if (width < 1451 && height < 756) {
        cardElement.style.width = '10.5em'
        cardElement.style.height = '15.5em'
    // Caso não seja nenhum dos casos anteriores
    } else {
        cardElement.style.width = '15em'
        cardElement.style.height = '20em'
    }

    // Adiciona a área de duelo a carta criada
    duelAreaCard.appendChild(cardElement)
}

// Função para criar uma imagem para área de pré-visualização
const createPreviewCard = (card) => {
    // Armazena o atributo DATA-DECK da carta
    const cardPreviewSide = card.getAttribute('data-deck')
    // Armazena o atributo SRC da carta
    const cardPreviewSrc = card.getAttribute('src')
    // Armazena a área de pré-visualização SUPERIOR
    const topArea = document.getElementById('card1-preview')
    // Armazena a área de pré-visualização INFERIOR
    const bottomArea = document.getElementById('card2-preview')
    // Limpa a área de pré-visualização 
    clearPreviewArea()
    // Armazena a criação de uma imagem
    const cardCopia = document.createElement('img')
    // Adiciona o atributo SRC
    cardCopia.src = cardPreviewSrc
    // Adiciona o atributo ALT
    cardCopia.alt = "card-preview"
    // Adiciona um estilo para a LARGURA
    cardCopia.style.width = '70%'
    // Adiciona um estilo para o COMPRIMENTO
    cardCopia.style.height = '100%'

    // Se a carta pertencer ao deck superior
    if (cardPreviewSide == 'top') {
        // Adiciona a carta criada na área de pré-visualização da parte SUPERIOR
        topArea.appendChild(cardCopia)
    } else {
        // Adiciona a carta criada na área de pré-visualização da parte INFERIOR
        bottomArea.appendChild(cardCopia)
    }
}

// Função para limpar a área de pré-visualização
const clearPreviewArea = () => {
    // Armazena a área de pré-visualização SUPERIOR
    const topArea = document.getElementById('card1-preview')
    // Armazena a área de pré-visualização INFERIOR
    const bottomArea = document.getElementById('card2-preview')
    // Se a área SUPERIOR tiver uma imagem essa imagem é removida
    if (topArea.querySelector('img')) topArea.querySelector('img').remove()
    // Se a área INFERIOR tiver uma imagem essa imagem é removida
    if (bottomArea.querySelector('img')) bottomArea.querySelector('img').remove()
}

// Função para habilitar um deck
const enableDeck = (containerId) => {
    // Armazena o container do deck
    const container = document.getElementById(containerId)
    // Altera o estilo para tornar "clicável"
    container.style.pointerEvents = 'auto'
    // Adiciona o evento de click ao container
    document.getElementById(containerId).addEventListener('click', infoValues)
    document.getElementById(containerId).addEventListener('click', handleFlipClick)
}

// Função para desabilitar o deck
const disableDeck = (containerId) => {
    // Armazena o container do deck
    const container = document.getElementById(containerId)
    // Altera o estilo para tornar "inclicável"
    container.style.pointerEvents = 'none'
}

// Função que realiza o flip da carta
const toggleFlip = (card) => card.style.transform = card.style.transform === 'rotateY(180deg)' ? 'rotateY(0deg)' : 'rotateY(180deg)'

// Função que trata o clique das cartas
const handleFlipClick = (event) => {
    // Armazena a div da carta
    const card = event.target.closest('.flip-card')
    // Se a div conter uma carta
    if (card) toggleFlip(card) // Chama uma função que realiza o flip da carta
}

// Obtém as informações das cartas na área de duelo
const infoDuelValues = (duelCardArea1, duelCardArea2) => {
    // Obtém as informações da PRIMEIRA carta do duelo
    const imgDuelAtk = duelCardArea1.querySelector('img')
    // Obtém as informações da SEGUNDA carta do duelo
    const imgDuelDef = duelCardArea2.querySelector('img')
    // Otbém o ataque da PRIMEIRA carta do duelo
    const atk = imgDuelAtk.getAttribute('data-atk')
    // Otbém a defesa da SEGUNDA carta do duelo
    const def = imgDuelDef.getAttribute('data-def')
    // Chama a função para fazer o cálculo do dano do computador
    duelDamageComputer(atk, def)
}

// Função para o evento de click no botão de atacar do player 1 (3º)
const duelButtonEvent = () => {
    // Armazena as informações da PRIMEIRA carta
    const card1 = document.getElementById('card1')
    // Armazena as informações da SEGUNDA carta
    const card2 = document.getElementById('card2')
    // Armazena o ATAQUE da PRIMEIRA carta
    const atkCard1 = card1.getAttribute('data-atk')
    // Armazena a DEFESA da SEGUNDA carta
    const defCard2 = card2.getAttribute('data-def')

    // Calcula o dano
    duelDamage(atkCard1, defCard2, 'top')
    // Limpa a área de duelo
    clearDuelArea()
    // Vira as cartas do deck superior para baixo
    renderCards(topDeckCards, "top-deck")
    // Começa um novo round
    otherRound('top-deck')
}

// Função que calcula o DANO DO PLAYER
const duelDamage = (atk, def) => {
    // Se a diferença do ataque pela defesa for maior que 0
    if ((atk-def) > 0) {
        applyDamageToPlayer((Number(player2LifeAmount.textContent)-(atk-def)),
                            (atk-def),
                            player2LifeAmount,
                            player2LifeBar,
                            'PLAYER 1')
    }
}

// Função que calcula o DANO DO COMPUTADOR
const duelDamageComputer = (atk, def) => {
    // Se a diferença do ataque pela defesa for maior que 0
    if ((atk-def) > 0) {
        applyDamageToPlayer((Number(player1LifeAmount.textContent)-(atk-def)),
                            (atk-def),
                            player1LifeAmount,
                            player1LifeBar,
                            'PLAYER 2')
    }
}

// Função que aplica o dano a barra de vida
const applyDamageToPlayer = (damage, restOfLife, div, lifeBarPlayer, nameWinner) => {
    // Altera o estilo da barra de vida de acordo com a porcentagem que é equivalente ao dano
    lifeBarPlayer.style.width = ((damage*100)/5000)+"%"
    // Altera o valor contido na div que representa numericamente a quantidade de vida
    div.textContent -= restOfLife

    // Se o valor contido na div for menor ou igual a 0
    if (div.textContent <= 0) {
        // Limpa a área de pré-visualização
        clearPreviewArea()
        // Chama a condição de vitória
        winScreen(nameWinner)
    }
}

// Função que cria a tela de vitória
const winScreen = (nameWinner) => {
    // Torna visivel a tela de vitória
    resultScreen.style.display = 'block'
    // Escreve o player vencedor na tela
    document.getElementById('winner').innerText = nameWinner
    // Altera o estilo do lado DIREITO para DIMINUIR o brilho
    document.getElementById('right').style.filter = 'brightness(20%)'
    // Altera o estilo do lado ESQUERDO para DIMINUIR o brilho
    document.getElementById('left').style.filter = 'brightness(20%)'
    // Evento de click no botão de continuar, para reiniciar o game
    restartButton.addEventListener('click', () => {
        // Altera o estilo do lado DIREITO para AUMENTAR o brilho
        document.getElementById('right').style.filter = 'brightness(100%)'
        // Altera o estilo do lado ESQUERDO para AUMENTAR o brilho
        document.getElementById('left').style.filter = 'brightness(100%)'
        // Reseta o VALOR NUMÉRICO DA VIDA do PLAYER 1 
        player1LifeAmount.textContent = 5000
        // Reseta a BARRA DE VIDA do PLAYER 1
        player1LifeBar.style.width = 100+"%"
        // Reseta o VALOR NUMÉRICO DA VIDA do PLAYER 2
        player2LifeAmount.textContent = 5000
        // Reseta a BARRA DE VIDA do PLAYER 2
        player2LifeBar.style.width = 100+"%"
        // Altera o estilo do display da tela para sumir
        resultScreen.style.display = 'none'
        // Chama a função para jogar novamente
        playAgain()
    })
}

// Função para jogar novamente
const playAgain = () => {
    // Habilita o deck superior 
    enableDeck('top-deck')
    // Desabilita o deck inferior
    disableDeck('bottom-deck')
    // Adicionando o evento de click ao container que contém o deck superior
    document.getElementById('top-deck').addEventListener('click', infoValues)
    document.getElementById('top-deck').addEventListener('click', handleFlipClick)
}

// Função que limpa a area de duelo (6º)
const clearDuelArea = () => {
    // Remove as imagens da área de duelo
    document.getElementById('card1').remove()
    document.getElementById('card2').remove()
}

// Função para fazer o deck inferior começar jogando (7º)
const otherRound = (containerId) => {
    // Armazena a área da primeira carta
    const duelAreaCard1 = document.querySelector('.duel-card-1')
    // Armazena a LARGURA da tela
    const width = window.innerWidth;
    // Armazena a ALTURA da tela
    const height = window.innerHeight;

    // Chama a função que escolhe a carta do computador
    computerDuelCard(duelAreaCard1, width, height, 'card2', randomNumber(0, 4))
    // Ativa o deck desejado
    enableDeck(containerId)
    // Adiciona o evento de click no container desejado
    document.getElementById(containerId).addEventListener('click', infoValues)
    document.getElementById(containerId).addEventListener('click', handleFlipClick)
}

// Função para fazer o deck superior começar jogando (11º)
const anotherRound = (containerId) => {
    // Ativa o deck desejado
    enableDeck(containerId)
    // Adiciona o evento de click ao container desejado
    document.getElementById(containerId).addEventListener('click', infoValues)
    document.getElementById(containerId).addEventListener('click', handleFlipClick)
}

// Função que da play na musica do duelo
const backgroundMusic = () => {
    // Armazena as informações do botão
    const music = document.getElementById('duel-music-loop')
    // Ativa o play na musica
    music.play()
}

// Função que muta a musica
const stopMusic = () => {
    // Armazena as informações do botão
    const music = document.getElementById('duel-music-loop')
    // Pausa a musica
    music.pause()
}

// Renderiza os decks na tela
renderCards(topDeckCards, "top-deck")
renderCards(bottomDeckCards, "bottom-deck")

// Função que da play na musica de fundo
backgroundMusic()

// Adiciona o evento de click para mutar a musica
document.getElementById('music-stop').addEventListener('click', stopMusic)
// Adiciona o evento de click para desmutar a musica
document.getElementById('music-play').addEventListener('click', backgroundMusic)

// Adiciona um evento de click no container do deck superior
document.getElementById('top-deck').addEventListener('click', infoValues)
// Adiciona outro evento de click nas cartas
document.getElementById('top-deck').addEventListener('click', handleFlipClick)

// Evento de click no botão de duelo
document.getElementById('player1-duel-button').addEventListener('click', duelButtonEvent)