const life = [10000]
const lifePlayer1 = document.getElementById('player1-health')
const lifePlayer2 = document.getElementById('player2-health')

const createCard = (frontUrl, atk, def, backUrl='imgs/Down.jpg') => `
    <div class="flip-card">
        <div class="flip-card-front">
            <img src="${backUrl}" class="face-card-img" alt="face-down">
        </div>
        <div class="flip-card-back">
            <img src="${frontUrl}" class="face-card-img" alt="face-up" data-atk="${atk}" data-def="${def}">
        </div>
    </div>
`

// Função que renderiza as cartas num container
const renderCards = (cards, containerId) => {
    const container = document.getElementById(containerId)
    container.innerHTML = cards.map(card => createCard(card.url, card.atk, card.def)).join('')
}

// Armazenando as URL's das cartas
const topDeckCards = [
    {url: "imgs/BlueEyesWhiteDragon.jpg", atk: 3000, def: 2500},
    {url: "imgs/DarkMagicianGirl.jpg", atk: 2000, def: 1700},
    {url: "imgs/CyberDragon.jpg", atk: 2100, def: 1600},
    {url: "imgs/ExodiaTheForbiddenOne.jpg", atk: 1000, def: 1000},
    {url: "imgs/DarkMagician.jpg", atk: 2500, def: 2100}
]

const bottomDeckCards = [
    {url: "imgs/Kuriboh.jpg", atk: 300, def: 200},
    {url: "imgs/DarkPaladin.jpg", atk: 2900, def: 2400},
    {url: "imgs/ObeliskTheTormentor.jpg", atk: 4000, def: 4000},
    {url: "imgs/RedEyesBlackDragon.jpg", atk: 2400, def: 2000},
    {url: "imgs/SummonedSkull.jpg", atk: 2500, def: 1200}
]

// Renderiza as cartas na tela
renderCards(topDeckCards, "top-deck")
renderCards(bottomDeckCards, "bottom-deck")

// Função que mostra na tela o valor do ataque e da defesa das respectivas cartas
const infoValues = (event) => {
    const img = event.target
    const atk = img.getAttribute('data-atk')
    const def = img.getAttribute('data-def')
    const alt = img.getAttribute('alt')
    console.log(`Ataque: ${atk} e Defesa: ${def}`)

    // Adiciona a carta à área de duelo
    addToDuelArea(img.src, alt, atk, def)
}

// Função que adiciona a carta à área de duelo
const addToDuelArea = (cardSrc, alt, atk, def) => {
    const duelArea = document.querySelector('.duel')
    const amountCards = duelArea.querySelectorAll('img')

    // Verifica quantas cartas já estão na área de duelo
    if (amountCards.length < 1 && alt=='face-up') {
        // Se houver menos de 1 carta, adiciona a nova carta
        const cardElement = document.createElement('img')
        cardElement.src = cardSrc
        cardElement.id = 'card1'
        cardElement.alt = "card1-in-duel"
        cardElement.setAttribute("data-atk", atk)
        cardElement.setAttribute("data-def", def)
        cardElement.style.width = '250px'
        cardElement.style.height = '350px'

        duelArea.appendChild(cardElement)
        // Desabilita o deck superior
        disableTopDeck('top-deck')
        // Habilita o deck inferior
        enableBottomDeck('bottom-deck')
    } else if (amountCards.length < 2 && alt=='face-up') {
        // Se houver menos de 2 cartas, adiciona a nova carta
        const cardElement = document.createElement('img')
        cardElement.src = cardSrc
        cardElement.id = 'card2'
        cardElement.alt = "card2-in-duel"
        cardElement.setAttribute("data-atk", atk)
        cardElement.setAttribute("data-def", def)
        cardElement.style.width = '250px'
        cardElement.style.height = '350px'
        // Adiciona a carda à área de duelo
        duelArea.appendChild(cardElement)
        // Elimina a carta do jogo
        // (incompleto)
        // Desabilita o deck superior
        disableTopDeck('top-deck')
        // Habilita o deck inferior
        disableBottomDeck('bottom-deck')
    }
}

// Função para habilitar o deck superior
const enableTopDeck = (containerId) => {
    const container = document.getElementById(containerId)
    container.style.pointerEvents = 'auto'
    document.getElementById(containerId).addEventListener('click', infoValues)
    document.getElementById(containerId).addEventListener('click', handleFlipClick)
}

// Função para habilitar o deck inferior
const enableBottomDeck = (containerId) => {
    const container = document.getElementById(containerId)
    container.style.pointerEvents = 'auto'
    document.getElementById(containerId).addEventListener('click', infoValues)
    document.getElementById(containerId).addEventListener('click', handleFlipClick)
}

// Função que desabilita o deck superior
const disableTopDeck = (containerId) => {
    const container = document.getElementById(containerId)
    container.style.pointerEvents = 'none'
}

// Função que desabilita o deck inferior
const disableBottomDeck = (containerId) => {
    const container = document.getElementById(containerId)
    container.style.pointerEvents = 'none'
}

// Função que aplica ou remove a classe 'flipped'
const toggleFlip = (card) => card.style.transform = card.style.transform === 'rotateY(180deg)' ? 'rotateY(0deg)' : 'rotateY(180deg)'

// Implementa o click para uma carta específica
const handleFlipClick = (event) => {
    const card = event.target.closest('.flip-card')
    if (card) toggleFlip(card) // Realiza o flip da carta
}

// Função para o evento de click no botão
const duelButtonEvent = () => {
    const card1 = document.getElementById('card1')
    const card2 = document.getElementById('card2')
    const atkCard1 = card1.getAttribute('data-atk')
    const defCard2 = card2.getAttribute('data-def')
    duelDamage(atkCard1, defCard2)
    cleanDuelArea()
    restartRound()
}

// Função que calcula o dano
const duelDamage = (atk, def) => {
    if ((atk-def) > 0) {
        return applyDamageToBarLife((life[life.length-1]-(atk-def))/100)
    }
}

// Função que aplica o dano a barra de vida
const applyDamageToBarLife = (damage) => {
    return lifePlayer2.style.width = damage+"%"
}

// Função que limpa a area de duelo
const cleanDuelArea = () => {
    document.getElementById('card1').remove()
    document.getElementById('card2').remove()
}

document.getElementById('top-deck').addEventListener('click', infoValues)

// Evento de click no botão
document.getElementById('duel-button').addEventListener('click', duelButtonEvent)

// Adicionando o evento de click ao container que contém as cartas
document.getElementById('top-deck').addEventListener('click', handleFlipClick)
