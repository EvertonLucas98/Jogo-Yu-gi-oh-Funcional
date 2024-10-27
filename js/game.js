const player1LifeAmount = document.getElementById('player1-Life-Amount')
const player2LifeAmount = document.getElementById('player2-Life-Amount')
const player1LifeBar = document.getElementById('player1-health')
const player2LifeBar = document.getElementById('player2-health')
const resultScreen = document.getElementById('result-screen')
const restartButton = document.getElementById('restart-button')

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

// Função obtém o valor do ataque, da defesa, do alt e do deck das respectivas cartas (1º)
const infoValues = (event) => {
    const img = event.target
    const atk = img.getAttribute('data-atk')
    const def = img.getAttribute('data-def')
    const alt = img.getAttribute('alt')
    const deck = img.getAttribute('data-deck')
    // Adiciona a carta à área de duelo
    addToDuelArea(img.src, alt, atk, def, deck)
    const containerCard = event.target.closest('.flip-card')
    const childContainerCard = containerCard.querySelectorAll('div')[1]
    const card = childContainerCard.querySelector('img')
    createPreview(card)
}

// Função que adiciona a carta à área de duelo (2º)
const addToDuelArea = (cardSrc, alt, atk, def, deck) => {
    const duelArea = document.querySelector('.duel')
    const duelAreaCard1 = document.querySelector('.duel-card-1')
    const duelAreaCard2 = document.querySelector('.duel-card-2')
    const amountCards = duelArea.querySelectorAll('img').length
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Verifica se existe não existe cartas viradas para cima na área de duelo e adiciona a nova carta selecionada
    if (amountCards < 2 && alt=='face-up') {
        const cardElement = document.createElement('img')
        cardElement.src = cardSrc
        cardElement.id = 'card1'
        cardElement.alt = "card1-in-duel"
        cardElement.setAttribute("data-atk", atk)
        cardElement.setAttribute("data-def", def)
        cardElement.setAttribute("data-deck", deck)
        if (width < 451) {
            cardElement.style.width = '4.5em'
            cardElement.style.height = '8em'
        } else if (width < 1081 && height < 450) {
            cardElement.style.width = '7em'
            cardElement.style.height = '8.5em'
        } else if (width < 1081) {
            cardElement.style.width = '10.5em'
            cardElement.style.height = '14em'
        } else if (width < 1451 && height < 571) {
            cardElement.style.width = '10.5em'
            cardElement.style.height = '13.5em'
        } else if (width < 1451 && height < 756) {
            cardElement.style.width = '10.5em'
            cardElement.style.height = '15.5em'
        } else {
            cardElement.style.width = '15em'
            cardElement.style.height = '20em'
        }
        duelAreaCard1.appendChild(cardElement)
        // Desabilita o deck superior
        disableDeck('top-deck')
        // Habilita o deck inferior
        enableDeck('bottom-deck')
    // Verifica se existe menos de 2 cartas viradas para cima na área de duelo
    } else if (amountCards < 3 && alt=='face-up') {
        // Se houver menos de 2 cartas, adiciona a nova carta
        const cardElement = document.createElement('img')
        cardElement.src = cardSrc
        cardElement.id = 'card2'
        cardElement.alt = "card2-in-duel"
        cardElement.setAttribute("data-atk", atk)
        cardElement.setAttribute("data-def", def)
        cardElement.setAttribute("data-deck", deck)
        if (width < 451) {
            cardElement.style.width = '4.5em'
            cardElement.style.height = '8em'
        } else if (width < 1081 && height < 450) {
            cardElement.style.width = '7em'
            cardElement.style.height = '8.5em'
        } else if (width < 1081) {
            cardElement.style.width = '10.5em'
            cardElement.style.height = '14em'
        } else if (width < 1451 && height < 571) {
            cardElement.style.width = '10.5em'
            cardElement.style.height = '13.5em'
        } else if (width < 1451 && height < 756) {
            cardElement.style.width = '10.5em'
            cardElement.style.height = '15.5em'
        } else {
            cardElement.style.width = '15em'
            cardElement.style.height = '20em'
        }
        // Adiciona a carda à área de duelo
        duelAreaCard2.appendChild(cardElement)
        // Desabilita o deck superior
        disableDeck('top-deck')
        // Habilita o deck inferior
        disableDeck('bottom-deck')
    }
}

// Função para criar uma imagem
const createPreview = (card) => {
    const cardPreviewSide = card.getAttribute('data-deck')
    const cardPreviewSrc = card.getAttribute('src')
    const topArea = document.getElementById('card1-preview')
    const bottomArea = document.getElementById('card2-preview')
    if (topArea.querySelector('img')) clearPreviewArea(topArea)
    if (bottomArea.querySelector('img')) clearPreviewArea(bottomArea)
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
const clearPreviewArea = (area) => {
    area.querySelector('img').remove()
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
    duelDamage(atkCard1, defCard2, deckCard1)
    cleanDuelArea()
    disableDuelButtonEvent('player1-duel-button')
    enableDuelButtonEvent('player2-duel-button')
    renderCards(topDeckCards, "top-deck")
    renderCards(bottomDeckCards, "bottom-deck")
    otherRound('bottom-deck')
}

// Função que calcula o dano (4º)
const duelDamage = (atk, def, deckCard1) => {
    if (deckCard1 == 'top') {
        if ((atk-def) > 0) {
            return applyDamageToPlayer2LifeBar((Number(player2LifeAmount.textContent)-(atk-def))/100, player2LifeAmount)
        }
    } else {
        if ((atk-def) > 0) {
            return applyDamageToPlayer1LifeBar((Number(player1LifeAmount.textContent)-(atk-def))/100, player1LifeAmount)
        }
    }
}

// Função que aplica o dano a barra de vida (5º)
const applyDamageToPlayer1LifeBar = (damage, div) => {
    player1LifeBar.style.width = damage+"%"
    div.textContent -= Number(div.textContent)-(damage*100)
    if (div.textContent <= 0) {
        resultScreen.style.display = 'block'
        document.getElementById('winner').innerText = 'PLAYER 2'
        document.getElementById('right').style.filter = 'brightness(20%)'
        document.getElementById('left').style.filter = 'brightness(20%)'
        restartButton.addEventListener('click', restartGame)
    }
}

// Função que aplica o dano a barra de vida (5º)
const applyDamageToPlayer2LifeBar = (damage, div) => {
    player2LifeBar.style.width = damage+"%"
    div.textContent -= Number(div.textContent)-(damage*100)
    if (div.textContent <= 0) {
        resultScreen.style.display = 'block'
        document.getElementById('winner').innerText = 'PLAYER 1'
        document.getElementById('right').style.filter = 'brightness(20%)'
        document.getElementById('left').style.filter = 'brightness(20%)'
        restartButton.addEventListener('click', restartGame)
    }
}

// Função que reinicia os valores da vida
const restartGame = () => {
    document.getElementById('right').style.filter = 'brightness(100%)'
    document.getElementById('left').style.filter = 'brightness(100%)'
    resultScreen.style.display = 'none'
    player1LifeAmount.textContent = 100
    player1LifeBar.style.width = 100+"%"
    player2LifeAmount.textContent = 100
    player2LifeBar.style.width = 100+"%"
    anotherRound('top-deck')
}

// Função que limpa a area de duelo (6º)
const cleanDuelArea = () => {
    document.getElementById('card1').remove()
    document.getElementById('card2').remove()
}

// Função para fazer o deck inferior começar jogando (7º)
const otherRound = (containerId) => {
    enableDeck(containerId)
    document.getElementById(containerId).addEventListener('click', otherInfoValues)
    document.getElementById(containerId).addEventListener('click', handleFlipClick)
}

// Função para pegar o atributo alt da imagem (8º)
const otherInfoValues = (event) => {
    const img = event.target
    const alt = img.getAttribute('alt')
    // Adiciona a carta à área de duelo
    otherAddToDuelArea(alt)
}

// Função que adiciona a carta à área de duelo (9º)
const otherAddToDuelArea = (alt) => {
    const duelArea = document.querySelector('.duel')
    const amountCards = duelArea.querySelectorAll('img')

    // Verifica quantas cartas já estão na área de duelo
    if (amountCards.length <= 2 && alt=='face-up') {
        // Desabilita o deck inferior
        disableDeck('bottom-deck')
        // Habilita o deck superior
        enableDeck('top-deck')
    } else if (amountCards.length < 3 && alt=='face-up') {
        // Desabilita o deck superior
        disableDeck('top-deck')
        // Habilita o deck inferior
        disableDeck('bottom-deck')
    }
}

// Função para o evento de click no botão de atacar do player 2 (10º)
const otherDuelButtonEvent = () => {
    const card1 = document.getElementById('card1')
    const card2 = document.getElementById('card2')
    const atkCard1 = card1.getAttribute('data-atk')
    const defCard2 = card2.getAttribute('data-def')
    duelDamage(atkCard1, defCard2)
    cleanDuelArea()
    enableDuelButtonEvent('player1-duel-button')
    disableDuelButtonEvent('player2-duel-button')
    renderCards(topDeckCards, "top-deck")
    renderCards(bottomDeckCards, "bottom-deck")
    anotherRound('top-deck')
}

// Função para fazer o deck superior começar jogando (11º)
const anotherRound = (containerId) => {
    enableDeck(containerId)
    document.getElementById(containerId).addEventListener('click', infoValues)
    document.getElementById(containerId).addEventListener('click', handleFlipClick)
}

// Função para habilitar os botões
const enableDuelButtonEvent = (containerId) => {
    const container = document.getElementById(containerId)
    container.style.pointerEvents = 'auto'
    document.getElementById('player2-duel-button').addEventListener('click', otherDuelButtonEvent)
}

// Função que desabilita o botão de ataque do player 1
const disableDuelButtonEvent = (containerId) => {
    const container = document.getElementById(containerId)
    container.style.pointerEvents = 'none'
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

backgroundMusic()

// Adicionando o evento de click para mutar ou desmutar a musica
document.getElementById('music-stop').addEventListener('click', stopMusic)
document.getElementById('music-play').addEventListener('click', backgroundMusic)

// Adicionando o evento de click ao container que contém o deck superior
document.getElementById('top-deck').addEventListener('click', infoValues)
document.getElementById('top-deck').addEventListener('click', handleFlipClick)

// Evento de click no botão
document.getElementById('player1-duel-button').addEventListener('click', duelButtonEvent)
