const createCard = (frontUrl, backUrl='imgs/Down.jpg') => `
    <div class="flip-card">
        <div class="flip-card-front">
            <img src="${backUrl}" class="face-card-img" alt="face up card">
        </div>
        <div class="flip-card-back">
            <img src="${frontUrl}" class="face-card-img" alt="face up card">
        </div>
    </div>
`

// Função que renderiza as cartas num container
const renderCards = (cards, containerId) => {
    const container = document.getElementById(containerId)
    container.innerHTML = cards.map(card => createCard(card)).join('')
}

// Armazenando as URL's das cartas
const topDeckCards = [
    "imgs/BlueEyesWhiteDragon.jpg",
    "imgs/DarkMagicianGirl.jpg",
    "imgs/CyberDragon.jpg",
    "imgs/ExodiaTheForbiddenOne.jpg",
    "imgs/DarkMagician.jpg"
]

const duelCards = [
    "imgs/BlueEyesWhiteDragon.jpg",
    "imgs/RedEyesBlackDragon.jpg"
]

const bottomDeckCards = [
    "imgs/Kuriboh.jpg",
    "imgs/DarkPaladin.jpg",
    "imgs/ObeliskTheTormentor.jpg",
    "imgs/RedEyesBlackDragon.jpg",
    "imgs/SummonedSkull.jpg"
]

// Renderizando na tela as cartas
renderCards(topDeckCards, "top-deck")
renderCards(bottomDeckCards, "bottom-deck")
