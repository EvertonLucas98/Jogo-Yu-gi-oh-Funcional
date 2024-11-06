const player1LifeAmount = document.getElementById('player1-Life-Amount')
const player2LifeAmount = document.getElementById('player2-Life-Amount')
const player1LifeBar = document.getElementById('player1-health')
const player2LifeBar = document.getElementById('player2-health')
const resultScreen = document.getElementById('result-screen')
const restartButton = document.getElementById('restart-button')

// Cria os elementos que serão plotados no html
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
    const container = document.getElementById(containerId)
    container.innerHTML = cards.map(card => createCard(card.url, card.atk, card.def, card.deck)).join('')
}

// Armazenando as URL's das cartas
const topDeckCards = [
    {url: "imgs/DarkPaladin.jpg", atk: 2900, def: 2400, deck: 'top', position: 1},
    {url: "imgs/DarkMagicianGirl.jpg", atk: 2000, def: 1700, deck: 'top', position: 2},
    {url: "imgs/SummonedSkull.jpg", atk: 2500, def: 1200, deck: 'top', position: 3},
    {url: "imgs/Kuriboh.jpg", atk: 300, def: 200, deck: 'top', position: 4},
    {url: "imgs/BlackLusterSoldier.jpg", atk: 3000, def: 2500, deck: 'top', position: 5}
]

const bottomDeckCards = [
    {url: "imgs/LusterDragon.jpg", atk: 2400, def: 1400, deck: 'bottom', position: 6},
    {url: "imgs/BlueEyesWhiteDragon.jpg", atk: 3000, def: 2500, deck: 'bottom', position: 7},
    {url: "imgs/ObeliskTheTormentor.jpg", atk: 4000, def: 4000, deck: 'bottom', position: 8},
    {url: "imgs/RedEyesBlackDragon.jpg", atk: 2400, def: 2000, deck: 'bottom', position: 9},
    {url: "imgs/CyberDragon.jpg", atk: 2100, def: 1600, deck: 'bottom', position: 10}
]

// Renderiza as cartas na tela
renderCards(topDeckCards, "top-deck")
renderCards(bottomDeckCards, "bottom-deck")

// Função que obtém o valor os atributos das respectivas cartas (1º)
const infoValues = (event) => {
    const img = event.target
    const atk = img.getAttribute('data-atk')
    const def = img.getAttribute('data-def')
    const alt = img.getAttribute('alt')
    const deck = img.getAttribute('data-deck')
    const containerCard = event.target.closest('.flip-card')
    const childContainerCard = containerCard.querySelectorAll('div')[1]
    const card = childContainerCard.querySelector('img')
    // Adiciona a carta à área de duelo e à área de pré-visualização
    return (addToDuelArea(img.src, alt, atk, def, deck), createPreviewCard(card))
}

// Função que adiciona a carta à área de duelo (2º)
const addToDuelArea = (cardSrc, alt, atk, def, deck) => {
    const duelArea = document.querySelector('.duel')
    const duelAreaCard1 = document.querySelector('.duel-card-1')
    const duelAreaCard2 = document.querySelector('.duel-card-2')
    const amountCards = duelArea.querySelectorAll('img').length
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Verifica se já existe uma carta virada para cima na área de duelo e adiciona a carta selecionada
    if (amountCards < 2 && alt=='face-up') {
        console.log('addToDuelArea 01')
        // Renderiza a carta na área de duelo, desabilita o deck superior e habilita o deck inferior
        renderDuelCards(duelAreaCard1, width, height, cardSrc, atk, def, deck, 'card1')
        computerDuelCard(duelAreaCard2, width, height, 'card2')
        disableDeck('top-deck')
    } else if (amountCards < 3 && alt=='face-up') { // Verifica se existe menos de 2 cartas viradas para cima na área de duelo
        console.log('addToDuelArea 02')
        // Renderiza a segunda carta na área de duelo e desabilita os dois decks
        renderDuelCards(duelAreaCard2, width, height, cardSrc, atk, def, deck, 'card1')
        duelDamageComputer(atk, def)
        clearDuelArea()
    }
}

const computerDuelCard = (duelArea, width, height, cardNum) => {
    const src = bottomDeckCards[4].url
    const atk = bottomDeckCards[4].atk
    const def = bottomDeckCards[4].def
    const deck = bottomDeckCards[4].deck
    renderDuelCards(duelArea, width, height, src, atk, def, deck, cardNum)
}

// Renderiza uma carta numa área de duelo
const renderDuelCards = (duelAreaCard, width, height, cardSrc, atk, def, deck, cardNum) => {
    const cardElement = document.createElement('img')
    cardElement.src = cardSrc
    cardElement.id = cardNum
    cardElement.alt = "card1-in-duel"
    cardElement.setAttribute("data-atk", atk)
    cardElement.setAttribute("data-def", def)
    cardElement.setAttribute("data-deck", deck)

    // Verifica se a tela é menor que 451px
    if (width < 451) {
        cardElement.style.width = '4.5em'
        cardElement.style.height = '8em'
    // Verifica se a largura da tela é menor que 1081px e se a altura é menor que 450px
    } else if (width < 1081 && height < 450) {
        cardElement.style.width = '7em'
        cardElement.style.height = '8.5em'
    // Verifica se a largura da tela é menor que 1081px
    } else if (width < 1081) {
        cardElement.style.width = '10.5em'
        cardElement.style.height = '14em'
    // Verifica se a largura da é menor que 1451px e se a altura é menor que 571px
    } else if (width < 1451 && height < 571) {
        cardElement.style.width = '10.5em'
        cardElement.style.height = '13.5em'
    // Verifica se a largura da é menor que 1451px e se a altura é menor que 756px
    } else if (width < 1451 && height < 756) {
        cardElement.style.width = '10.5em'
        cardElement.style.height = '15.5em'
    // Caso não seja nenhum dos casos anteriores
    } else {
        cardElement.style.width = '15em'
        cardElement.style.height = '20em'
    }

    duelAreaCard.appendChild(cardElement)
}

// Função para criar uma imagem para área de pré-visualização
const createPreviewCard = (card) => {
    const cardPreviewSide = card.getAttribute('data-deck')
    const cardPreviewSrc = card.getAttribute('src')
    const topArea = document.getElementById('card1-preview')
    const bottomArea = document.getElementById('card2-preview')
    clearPreviewArea()
    const cardCopia = document.createElement('img')
    cardCopia.src = cardPreviewSrc
    cardCopia.alt = "card-preview"
    cardCopia.style.width = '70%'
    cardCopia.style.height = '100%'
    if (cardPreviewSide == 'top') {
        topArea.appendChild(cardCopia)
    } else {
        bottomArea.appendChild(cardCopia)
    }
}

// Função para limpar a área de pré-visualização
const clearPreviewArea = () => {
    const topArea = document.getElementById('card1-preview')
    const bottomArea = document.getElementById('card2-preview')
    if (topArea.querySelector('img')) topArea.querySelector('img').remove()
    if (bottomArea.querySelector('img')) bottomArea.querySelector('img').remove()
}

// Função para habilitar o deck
const enableDeck = (containerId) => {
    const container = document.getElementById(containerId)
    container.style.pointerEvents = 'auto'
    document.getElementById(containerId).addEventListener('click', infoValues)
    document.getElementById(containerId).addEventListener('click', handleFlipClick)
}

// Função para desabilitar o deck
const disableDeck = (containerId) => {
    const container = document.getElementById(containerId)
    container.style.pointerEvents = 'none'
}

// Função que realiza o flip da carta
const toggleFlip = (card) => card.style.transform = card.style.transform === 'rotateY(180deg)' ? 'rotateY(0deg)' : 'rotateY(180deg)'

// Implementa o click para uma carta específica
const handleFlipClick = (event) => {
    const card = event.target.closest('.flip-card')
    if (card) toggleFlip(card) // Realiza o flip da carta
}

// Função para o evento de click no botão de atacar do player 1 (3º)
const duelButtonEvent = () => {
    const card1 = document.getElementById('card1')
    const card2 = document.getElementById('card2')
    const atkCard1 = card1.getAttribute('data-atk')
    const defCard2 = card2.getAttribute('data-def')
    const deckCard1 = card1.getAttribute('data-deck')
    return (duelDamage(atkCard1, defCard2, 'top'),
            clearDuelArea(),
            renderCards(topDeckCards, "top-deck"),
            renderCards(bottomDeckCards, "bottom-deck"),
            otherRound('top-deck'))
}

// Função que calcula o dano (4º)
const duelDamage = (atk, def) => {
    if ((atk-def) > 0) {
        return applyDamageToPlayer( (Number(player2LifeAmount.textContent)-(atk-def)),
                                    (atk-def),
                                    player2LifeAmount,
                                    player2LifeBar,
                                    'PLAYER 1',
                                    'top-deck')
    }
}

const duelDamageComputer = (atk, def) => {
    if ((atk-def) > 0) {
        return applyDamageToPlayer( (Number(player1LifeAmount.textContent)-(atk-def)),
                                    (atk-def),
                                    player1LifeAmount,
                                    player1LifeBar,
                                    'PLAYER 2',
                                    'bottom-deck')
    }
}

// Função que aplica o dano a barra de vida (5º)
const applyDamageToPlayer = (damage, restOfLife, div, lifeBarPlayer, nameWinner, deckBlocked) => {
    lifeBarPlayer.style.width = ((damage*100)/Number(div.textContent))+"%"
    div.textContent -= restOfLife
    if (div.textContent <= 0) {
        // Limpa a área de pré-visualização
        clearPreviewArea()
        // Chama a condição de vitória
        winScreen(nameWinner, deckBlocked)
    }
}

// Função que cria a tela de vitória
const winScreen = (nameWinner, deckBlocked) => {
    // Torna visivel a tela de vitória
    resultScreen.style.display = 'block'
    // Escreve o player vencedor na tela
    document.getElementById('winner').innerText = nameWinner
    // Diminui o brilho dos elementos atrás da tela de vitória
    document.getElementById('right').style.filter = 'brightness(20%)'
    document.getElementById('left').style.filter = 'brightness(20%)'
    // Evento de click no botão de continuar, para reiniciar o game
    restartButton.addEventListener('click', () => {
        document.getElementById('right').style.filter = 'brightness(100%)'
        document.getElementById('left').style.filter = 'brightness(100%)'
        resultScreen.style.display = 'none'
        player1LifeAmount.textContent = 100
        player1LifeBar.style.width = 100+"%"
        player2LifeAmount.textContent = 100
        player2LifeBar.style.width = 100+"%"
        playAgain(deckBlocked)
    })
}

// Função para jogar novamente
const playAgain = (deckBlocked) => {
    // Verifica se o deck a ser bloqueado é o superior
    if (deckBlocked == 'top-deck') {
        // Habilita o deck inferior
        enableDeck('bottom-deck')
        disableDeck(deckBlocked)
        // Adicionando o evento de click ao container que contém o deck inferior
        document.getElementById('bottom-deck').addEventListener('click', infoValues)
        document.getElementById('bottom-deck').addEventListener('click', handleFlipClick)
    } else { // Caso seja o deck inferior a ser bloqueado
        // Habilita o deck superior 
        enableDeck('top-deck')
        // Desabilita o deck inferior
        disableDeck('bottom-deck')
        // Adicionando o evento de click ao container que contém o deck superior
        document.getElementById('top-deck').addEventListener('click', infoValues)
        document.getElementById('top-deck').addEventListener('click', handleFlipClick)
    }
}

// Função que limpa a area de duelo (6º)
const clearDuelArea = () => {
    document.getElementById('card1').remove()
    document.getElementById('card2').remove()
}

// Função para fazer o deck inferior começar jogando (7º)
const otherRound = (containerId) => {
    const duelAreaCard1 = document.querySelector('.duel-card-1')
    const width = window.innerWidth;
    const height = window.innerHeight;
    computerDuelCard(duelAreaCard1, width, height, 'card2')
    enableDeck(containerId)
    document.getElementById(containerId).addEventListener('click', otherInfoValues)
    document.getElementById(containerId).addEventListener('click', handleFlipClick)
}

// Função para pegar o atributo alt da imagem (8º)
const otherInfoValues = (event) => {
    const div = document.querySelector('.duel-card-1')
    const imgDiv = div.querySelector('img')
    const atk = imgDiv.getAttribute('data-atk')
    const img = event.target
    const alt = img.getAttribute('alt')
    const def = img.getAttribute('data-def')
    // Adiciona a carta à área de duelo
    otherAddToDuelArea(alt, atk, def)
}

// Função que adiciona a carta à área de duelo (9º)
const otherAddToDuelArea = (alt, atk, def) => {
    const duelArea = document.querySelector('.duel')
    const amountCards = duelArea.querySelectorAll('img')
    console.log('otherAddToDuelArea')
    
    // Verifica quantas cartas já estão na área de duelo
    if (amountCards < 2 && alt == 'face-up') {
        // Desabilita o deck superior
        disableDeck('top-deck')
        // Desabilita o deck inferior
        disableDeck('bottom-deck')
        duelDamageComputer(atk, def)
    }
}

// Função para fazer o deck superior começar jogando (11º)
const anotherRound = (containerId) => {
    enableDeck(containerId)
    document.getElementById(containerId).addEventListener('click', infoValues)
    document.getElementById(containerId).addEventListener('click', handleFlipClick)
}

// Função que da play na musica do duelo
const backgroundMusic = () => {
    const music = document.getElementById('duel-music-loop')
    music.play()
}

// Função que muta a musica
const stopMusic = () => {
    const music = document.getElementById('duel-music-loop')
    music.pause()
}

// Toca a musica de fundo
backgroundMusic()

// Adicionando o evento de click para mutar ou desmutar a musica
document.getElementById('music-stop').addEventListener('click', stopMusic)
document.getElementById('music-play').addEventListener('click', backgroundMusic)

// Adicionando o evento de click ao container que contém o deck superior
document.getElementById('top-deck').addEventListener('click', infoValues)
document.getElementById('top-deck').addEventListener('click', handleFlipClick)

// Evento de click no botão de duelo
document.getElementById('player1-duel-button').addEventListener('click', duelButtonEvent)