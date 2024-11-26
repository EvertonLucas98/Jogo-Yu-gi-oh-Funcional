// Armazena o elemento presente no HTML referente a QUANTIDADE NUMÉRICA de vida do PLAYER 1
const player1LifeAmount = document.getElementById('player1-Life-Amount')
// Armazena o elemento presente no HTML referente a QUANTIDADE NUMÉRICA de vida do PLAYER 2
const player2LifeAmount = document.getElementById('player2-Life-Amount')
// Armazena o elemento presente no HTML referente a REPRESENTAÇÃO VISUAL da vida do PLAYER 1
const player1LifeBar = document.getElementById('player1-health')
// Armazena o elemento presente no HTML referente a REPRESENTAÇÃO VISUAL da vida do PLAYER 2
const player2LifeBar = document.getElementById('player2-health')
// Armazena o elemento presente no HTML referente ao RESULTADO FINAL da partida
const resultScreen = document.getElementById('result-screen')
// Armazena o elemento presente no HTML referente ao BOTÃO DE REESTART
const restartButton = document.getElementById('restart-button')

// Cria as cartas que serão plotadas no html
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

// Função que renderiza as cartas num determinado container
const renderCards = (cards, containerId) => {
    // Armazena o elemento presente no HTML referente ao parâmetro passado
    const container = document.getElementById(containerId)
    // Plota no container informado as cartas com as características presentes dentro de cada registro que estarão dentro do array cards
    container.innerHTML = cards.map(card => createCard(card.url, card.atk, card.def, card.deck)).join('')
}

// Armazenando as características das cartas do DECK SUPERIOR
const topDeckCards = [
    {url: "imgs/DarkPaladin.jpg", atk: 2900, def: 2400, deck: 'top'},
    {url: "imgs/DarkMagicianGirl.jpg", atk: 2000, def: 1700, deck: 'top'},
    {url: "imgs/SummonedSkull.jpg", atk: 2500, def: 1200, deck: 'top'},
    {url: "imgs/Kuriboh.jpg", atk: 300, def: 200, deck: 'top'},
    {url: "imgs/BlackLusterSoldier.jpg", atk: 3000, def: 2500, deck: 'top'}
]

// Armazenando as características das cartas do DECK INFERIOR
const bottomDeckCards = [
    {url: "imgs/LusterDragon.jpg", atk: 2400, def: 1400, deck: 'bottom'},
    {url: "imgs/BlueEyesWhiteDragon.jpg", atk: 3000, def: 2500, deck: 'bottom'},
    {url: "imgs/ObeliskTheTormentor.jpg", atk: 4000, def: 4000, deck: 'bottom'},
    {url: "imgs/RedEyesBlackDragon.jpg", atk: 2400, def: 2000, deck: 'bottom'},
    {url: "imgs/CyberDragon.jpg", atk: 2100, def: 1600, deck: 'bottom'}
]

// Função que obtém os atributos das cartas do deck superior que são clicadas
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
    // Armazena as informações do CONTAINER do deck da carta
    const containerCard = event.target.closest('.flip-card')
    // Armazena o PRIMEIRO FILHO do container do deck da carta
    const childContainerCard = containerCard.querySelectorAll('div')[1]
    // Armazena A CARTA DO PRIMEIRO FILHO do container do deck
    const card = childContainerCard.querySelector('img')
    // Adiciona a carta à área de pré-visualização
    createPreviewCard(card)
    // Adiciona a carta à área de duelo
    addToDuelArea(img.src, alt, atk, def, deck)
}

// Função que adiciona a carta à área de duelo
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
    if (amountCards < 2 && alt=='face-up') {
        // Renderiza a carta na área de duelo
        renderDuelCards(duelAreaCard1, width, height, cardSrc, atk, def, deck, 'card1')
        // Desabilita o deck SUPERIOR
        disableDeck('top-deck')
        // Habilita o deck INFERIOR
        enableDeck('bottom-deck')
    } else if (amountCards < 3 && alt=='face-up') { // Verifica se existe menos de 2 cartas viradas para cima na área de duelo
        // Renderiza a segunda carta na área de duelo
        renderDuelCards(duelAreaCard2, width, height, cardSrc, atk, def, deck, 'card2')
        // Desabilita o deck SUPERIOR
        disableDeck('top-deck')
        // Desabilita o deck INFERIOR
        disableDeck('bottom-deck')
    }
}

// Renderiza uma carta numa área de duelo
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
    // Adiciona uma LARGURA de 70% do container
    cardCopia.style.width = '70%'
    // Adiciona uma ALTURA de 100% do container
    cardCopia.style.height = '100%'
    
    // Caso o DATA-DECK da carta seja referente as cartas do deck SUPERIOR
    if (cardPreviewSide == 'top') {
        topArea.appendChild(cardCopia)
    } else { // Caso seja referente as cartas do deck INFERIOR
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

// Função para habilitar um determinado deck
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

// Implementa o click para uma carta específica
const handleFlipClick = (event) => {
    // Armazena a div da carta
    const card = event.target.closest('.flip-card')

    // Se a div conter uma carta
    if (card) toggleFlip(card) // Realiza o flip da carta
}

// Função para o evento de click no botão de atacar do player 1
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
    // Desabilita o BOTÃO DE ATAQUE DO PLAYER 1 
    disableDuelButtonEvent('player1-duel-button')
    // Habilita o BOTÃO DE ATAQUE DO PLAYER 2 
    enableDuelButtonEvent('player2-duel-button')
    // Vira as cartas do deck SUPERIOR para baixo
    renderCards(topDeckCards, "top-deck")
    // Vira as cartas do deck INFERIOR para baixo
    renderCards(bottomDeckCards, "bottom-deck")
    // Começa um novo round
    otherRound('bottom-deck')
}

// Função que calcula o DANO DO PLAYER
const duelDamage = (atk, def, deckCard1) => {
    // Se a carta pertencer ao deck SUPERIOR
    if (deckCard1 == 'top') {
        // Se a diferença do ataque pela defesa for maior que 0
        if ((atk-def) > 0) {
            // Chama a função que aplica o dano ao player
            applyDamageToPlayer((Number(player2LifeAmount.textContent)-(atk-def)),
                                (atk-def),
                                player2LifeAmount,
                                player2LifeBar,
                                'PLAYER 1',
                                'top-deck')
        }
    } else { // A carta pertencer ao deck INFERIOR
        // Se a diferença do ataque pela defesa for maior que 0
        if ((atk-def) > 0) {
            // Chama a função que aplica o dano ao player
            applyDamageToPlayer((Number(player1LifeAmount.textContent)-(atk-def)),
                                (atk-def),
                                player1LifeAmount,
                                player1LifeBar,
                                'PLAYER 2',
                                'bottom-deck')
        }
    }
}

// Função que aplica o dano a barra de vida do player
const applyDamageToPlayer = (damage, restOfLife, div, lifeBarPlayer, nameWinner, deckBlocked) => {
    // Altera o estilo da barra de vida de acordo com a porcentagem que é equivalente ao dano
    lifeBarPlayer.style.width = ((damage*100)/5000)+"%"
    // Altera o valor contido na div que representa numericamente a quantidade de vida
    div.textContent -= restOfLife

    // Se o valor contido na div for menor ou igual a 0
    if (div.textContent <= 0) {
        // Limpa a área de pré-visualização
        clearPreviewArea()
        // Chama a função que cria a tela de vitória
        winScreen(nameWinner, deckBlocked)
    }
}

// Função que cria a tela de vitória
const winScreen = (nameWinner, deckBlocked) => {
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
        playAgain(deckBlocked)
    })
}

// Função para jogar novamente
const playAgain = (deckBlocked) => {
    // Verifica se o deck a ser bloqueado é o superior
    if (deckBlocked == 'top-deck') {
        // Habilita o deck INFERIOR
        enableDeck('bottom-deck')
        // Desabilita o deck SUPERIOR
        disableDeck('top-deck')
        // Adicionando o evento de click ao container que contém o deck inferior
        document.getElementById('bottom-deck').addEventListener('click', infoValues)
        document.getElementById('bottom-deck').addEventListener('click', handleFlipClick)
    } else { // Caso seja o deck INFERIOR a ser bloqueado
        // Habilita o deck superior 
        enableDeck('top-deck')
        // Desabilita o deck inferior
        disableDeck('bottom-deck')
        // Adicionando o evento de click ao container que contém o deck superior
        document.getElementById('top-deck').addEventListener('click', infoValues)
        document.getElementById('top-deck').addEventListener('click', handleFlipClick)
    }
}

// Função que limpa a area de duelo
const clearDuelArea = () => {
    // Remove as imagens da área de duelo
    document.getElementById('card1').remove()
    document.getElementById('card2').remove()
}

// Função para fazer o deck inferior começar jogando
const otherRound = (containerId) => {
    // Habilita o deck desejado
    enableDeck(containerId)
    // Adiciona o evento de click no container desejado
    document.getElementById(containerId).addEventListener('click', otherInfoValues)
    document.getElementById(containerId).addEventListener('click', handleFlipClick)
}

// Função para pegar o atributo alt da imagem
const otherInfoValues = (event) => {
    // Armazena a imagem
    const img = event.target
    // Armazena o atributo ALT da imagem
    const alt = img.getAttribute('alt')
    // Adiciona a carta à área de duelo
    otherAddToDuelArea(alt)
}

// Função que adiciona a carta à área de duelo
const otherAddToDuelArea = (alt) => {
    // Armazena o container da área de duelo
    const duelArea = document.querySelector('.duel')
    // Armazena a quantidade de imagens contido na área de duelo
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

// Função para o evento de click no botão de atacar do player 2
const otherDuelButtonEvent = () => {
    // Armazena as informações da carta do PLAYER 1 na área de duelo
    const card1 = document.getElementById('card1')
    // Armazena as informações da carta do PLAYER 2 na área de duelo
    const card2 = document.getElementById('card2')
    // Armazena o ATAQUE da carta do PLAYER 1
    const atkCard1 = card1.getAttribute('data-atk')
    // Armazena o DEFESA da carta do PLAYER 2
    const defCard2 = card2.getAttribute('data-def')

    // Calcula o dano
    duelDamage(atkCard1, defCard2, 'bottom')
    // Limpa a área de duelo
    clearDuelArea()
    // Habilita o BOTÃO DE ATAQUE DO PLAYER 1
    enableDuelButtonEvent('player1-duel-button')
    // Desabilita o BOTÃO DE ATAQUE DO PLAYER 2
    disableDuelButtonEvent('player2-duel-button')
    // Vira as cartas do deck SUPERIOR para baixo
    renderCards(topDeckCards, "top-deck")
    // Vira as cartas do deck INFERIOR para baixo
    renderCards(bottomDeckCards, "bottom-deck")
    // Começa um novo round
    anotherRound('top-deck')
}

// Função para fazer o deck superior começar jogando
const anotherRound = (containerId) => {
    // Habilita o deck desejado
    enableDeck(containerId)
    // Adicionando o evento de click ao container que contém o deck desejado
    document.getElementById(containerId).addEventListener('click', infoValues)
    // Adiciona um evento de click que da o efeito de girar as cartas
    document.getElementById(containerId).addEventListener('click', handleFlipClick)
}

// Função para habilitar os botões
const enableDuelButtonEvent = (containerId) => {
    // Armazena o container do botão desejado
    const container = document.getElementById(containerId)
    // Torna o botão "clicável"
    container.style.pointerEvents = 'auto'
    // Adiciona um evento de click ao botão de ataque do player 2 
    document.getElementById('player2-duel-button').addEventListener('click', otherDuelButtonEvent)
}

// Função que desabilita o botão de ataque do player 1
const disableDuelButtonEvent = (containerId) => {
    // Armazena o container do botão desejado
    const container = document.getElementById(containerId)
    // Torna o botão "inclicável"
    container.style.pointerEvents = 'none'
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

// Renderiza as cartas do DECK SUPERIOR
renderCards(topDeckCards, "top-deck")
// Renderiza as cartas do DECK INFERIOR
renderCards(bottomDeckCards, "bottom-deck")

// Função que da play na musica de fundo
backgroundMusic()

// Adiciona o evento de click para mutar a musica
document.getElementById('music-stop').addEventListener('click', stopMusic)
// Adiciona o evento de click para desmutar a musica
document.getElementById('music-play').addEventListener('click', backgroundMusic)

// Adicionando o evento de click ao container que contém o deck superior
document.getElementById('top-deck').addEventListener('click', infoValues)
// Adiciona um evento de click que da o efeito de girar as cartas
document.getElementById('top-deck').addEventListener('click', handleFlipClick)

// Evento de click no botão de duelo
document.getElementById('player1-duel-button').addEventListener('click', duelButtonEvent)