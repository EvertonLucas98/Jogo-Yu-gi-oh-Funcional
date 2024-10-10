const createCard = (frontUrl, atk, def, backUrl='imgs/Down.jpg') => `
    <div class="flip-card">
        <div class="flip-card-front">
            <img src="${backUrl}" class="face-card-img" alt="face up card">
        </div>
        <div class="flip-card-back">
            <img src="${frontUrl}" class="face-card-img" alt="face up card" data-atk="${atk}" data-def="${def}">
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

const duelCards = []

const bottomDeckCards = [
    {url: "imgs/Kuriboh.jpg", atk: 300, def: 200},
    {url: "imgs/DarkPaladin.jpg", atk: 2900, def: 2400},
    {url: "imgs/ObeliskTheTormentor.jpg", atk: 4000, def: 4000},
    {url: "imgs/RedEyesBlackDragon.jpg", atk: 2400, def: 2000},
    {url: "imgs/SummonedSkull.jpg", atk: 2500, def: 1200}
]

// Renderizando na tela as cartas
renderCards(topDeckCards, "top-deck")
renderCards(bottomDeckCards, "bottom-deck")

// Função que mostra na tela o valor do ataque e da defesa das respectivas cartas
const showValues = (event) => {
    const img = event.target
    const atk = img.getAttribute('data-atk')
    const def = img.getAttribute('data-def')
    alert(`Ataque: ${atk} e Defesa: ${def}`)
}

// Evento de click na carta
document.getElementById('top-deck').addEventListener('click', showValues)
document.getElementById('bottom-deck').addEventListener('click', showValues)
