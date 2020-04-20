    // Variables globales
    const map = document.querySelector('.map')
    const pacMan = document.querySelector('img[src="./img/pacman.gif"]')
    const redGhost = document.querySelector('img[src="./img/red-ghost.png')
    const blueGhost = document.querySelector('img[src="./img/blue-ghost.png"]')
    const greenGhost = document.querySelector('img[src="./img/green-ghost.png"]')
    const input = document.getElementById("userName")
    const modal = document.getElementById("myModal")
    const btn = document.getElementById("myBtn")
    const span = document.getElementsByClassName("close")[0]
    let posts = []
    const ul = document.querySelector('ul');
    let endGame = false
    let url = 'score.php'
    let confirmation


    //Déclaration des interval pour les joueurs
    let pacManInterval
    let redGhostInterval
    let greenGhostInterval
    let blueGhostInterval

    let userName //nom du joueur
    let userScore = 0//score du joueur

    //Direction des fantome
    let currentRedGhostDirection
    let currentBlueGhostDirection
    let currentGreenGhostDirection

    const maxSize = 1000
    const mqlMaxWidth = matchMedia(`(max-width: ${maxSize}px)`)
    const mqlMaxHeight = matchMedia(`(max-height: ${maxSize}px)`)
    const mqlOrientation = matchMedia('(orientation: portrait)')

    const directions = ['toLeft', 'toRight', 'toBottom', 'toTop']

    let level = 1; //Level 1 au début du jeu

    const sizeUnit = () => {
        let sizeUnit = 'px'
        if (isSmallScreen()) {
            sizeUnit = isPortraitOrientation() ? 'vw' : 'vh'
        }
        return sizeUnit
    }

    const isSmallScreen = () => {
        const mql = isPortraitOrientation() ? mqlMaxWidth : mqlMaxHeight
        return mql.matches
    }

    const isPortraitOrientation = () => {
        const mql = mqlOrientation
        return mql.matches
    }

    mqlMaxWidth.addListener(e => rearrangeElements())
    mqlMaxHeight.addListener(e => rearrangeElements())
    mqlOrientation.addListener(e => rearrangeElements())


    //--------------------------------------------MURS---------------------------------------------------------
    // Collection des murs axe horizontal droite-gauche
    const blockedSquaresToLeft = [
        {top:300, left:200},
        {top:500, left:200},
        {top:700, left:200},
        {top:200, left:300},
        {top:300, left:300},
        {top:500, left:300},
        {top:800, left:300},
        {top:0, left:500},
        {top:200, left:500},
        {top:600, left:500},
        {top:800, left:500},
        {top:400, left:600},
        {top:200, left:700},
        {top:300, left:700},
        {top:500, left:700},
        {top:800, left:700},
        {top:700, left:800},
        {top:0, left:0},
        {top:100, left:0},
        {top:200, left:0},
        {top:600, left:0},
        {top:700, left:0},
        {top:800, left:0},
        {top:900, left:0}
    ]
    // Collection des murs axe horizontal gauche-droite
    const blockedSquaresToRight = [
        {top:700, left:100},
        {top:200, left:200},
        {top:300, left:200},
        {top:500, left:200},
        {top:800, left:200},
        {top:400, left:300},
        {top:0, left:400},
        {top:200, left:400},
        {top:600, left:400},
        {top:800, left:400},
        {top:200, left:600},
        {top:300, left:600},
        {top:500, left:600},
        {top:800, left:600},
        {top:300, left:700},
        {top:500, left:700},
        {top:700, left:700},
        {top:0, left:900},
        {top:100, left:900},
        {top:200, left:900},
        {top:600, left:900},
        {top:700, left:900},
        {top:800, left:900},
        {top:900, left:900}
    ]
    // Collection des murs axe vertical bas-haut
    const blockedSquaresToTop = [
        {top:400, left:0},
        {top:600, left:0},
        {top:800, left:0},
        {top:100, left:100},
        {top:200, left:100},
        {top:400, left:100},
        {top:600, left:100},
        {top:400, left:100},
        {top:700, left:100},
        {top:900, left:100},
        {top:900, left:200},
        {top:100, left:300},
        {top:300, left:300},
        {top:700, left:300},
        {top:900, left:300},
        {top:200, left:400},
        {top:500, left:400},
        {top:600, left:400},
        {top:800, left:400},
        {top:200, left:500},
        {top:500, left:500},
        {top:600, left:500},
        {top:800, left:500},
        {top:100, left:600},
        {top:300, left:600},
        {top:700, left:600},
        {top:900, left:600},
        {top:900, left:700},
        {top:100, left:800},
        {top:200, left:800},
        {top:400, left:800},
        {top:600, left:800},
        {top:700, left:800},
        {top:900, left:800},
        {top:400, left:900},
        {top:600, left:900},
        {top:800, left:900},
        {top:0, left:0},
        {top:0, left:100},
        {top:0, left:200},
        {top:0, left:300},
        {top:0, left:400},
        {top:0, left:500},
        {top:0, left:600},
        {top:0, left:700},
        {top:0, left:800},
        {top:0, left:900}
    ]
    // Collection des murs axe vertical haut-bas
    const blockedSquaresToBottom = [
        {top:200, left:0},
        {top:400, left:0},
        {top:700, left:0},
        {top:0, left:100},
        {top:100, left:100},
        {top:200, left:100},
        {top:400, left:100},
        {top:600, left:100},
        {top:800, left:100},
        {top:800, left:200},
        {top:0, left:300},
        {top:200, left:300},
        {top:600, left:300},
        {top:800, left:300},
        {top:100, left:400},
        {top:300, left:400},
        {top:500, left:400},
        {top:700, left:400},
        {top:100, left:500},
        {top:300, left:500},
        {top:500, left:500},
        {top:700, left:500},
        {top:0, left:600},
        {top:200, left:600},
        {top:600, left:600},
        {top:800, left:600},
        {top:800, left:700},
        {top:0, left:800},
        {top:100, left:800},
        {top:200, left:800},
        {top:400, left:800},
        {top:600, left:800},
        {top:800, left:800},
        {top:200, left:900},
        {top:400, left:900},
        {top:700, left:900},
        {top:900, left:0},
        {top:900, left:100},
        {top:900, left:200},
        {top:900, left:300},
        {top:900, left:400},
        {top:900, left:500},
        {top:900, left:600},
        {top:900, left:700},
        {top:900, left:800},
        {top:900, left:900}
    ]


//-------------------------------------- FONCTION DE MOUVEMENTS DU JOUEUR ET DES GHOSTS ------------------------------------

    //Fonction qui retourne la position d'un element (pacMan ou ghosts)
    const getPositionOf = (element) => {
        const top = parseInt(getComputedStyle(element, null).getPropertyValue('top'), 10)
        const left = parseInt(getComputedStyle(element, null).getPropertyValue('left'), 10)
        return { top, left }
    }

    //Méthode qui vérifie si il ne tappe pas un mur
    const isTheCharacterBlocked = (characterPosition, movingDirection) => {
        let blockedSquares
        switch (movingDirection) {
            case 'toLeft':
                blockedSquares = blockedSquaresToLeft
                break
            case 'toRight':
                blockedSquares = blockedSquaresToRight
                break
            case 'toTop':
                blockedSquares = blockedSquaresToTop
                break
            case 'toBottom':
                blockedSquares = blockedSquaresToBottom
                break
        }

        return blockedSquares.some(square => {
            const topsAreEquals = characterPosition.top === square.top
            const leftsAreEquals = characterPosition.left === square.left
            return topsAreEquals && leftsAreEquals
        })
    }

    //Mouvements du clavier
    const movePacMan = (to) => {


        clearInterval(pacManInterval)

        pacMan.className = to

        let pacManPosition = getPositionOf(pacMan)

        pacManInterval = setInterval(() => {


            document.querySelectorAll('.dot').forEach(function(item, index) {

                if (pacManPosition.top + 'px' === item.style.top && pacManPosition.left + 'px' === item.style.left){
                    if (item.style.display !== 'none'){ //Condition pour éviter de recompter les gums déjà mangées

                        item.style.display = 'none'
                        userScore = userScore + 1

                        //On teste si il a attrapé tous les pacgums
                        if(userScore%90 == 0){
                            alert('Bravo vous avez passé le level ' + level + '.')
                            level = level+1;

                            start() //relancement d'une game
                        }

                    }

                    //Maj de l'affichage du score
                    const score = document.querySelector('.playerScore')
                    score.innerHTML = userScore //on modifie le h3

                }
            });






            //Gestion de la mort du pacman
            if((pacManPosition.top === getPositionOf(redGhost).top && pacManPosition.left === getPositionOf(redGhost).left) || (pacManPosition.top === getPositionOf(greenGhost).top && pacManPosition.left === getPositionOf(greenGhost).left) || (pacManPosition.top === getPositionOf(blueGhost).top && pacManPosition.left === getPositionOf(blueGhost).left)) {

                confirmation = confirm('Voulez vous enregistrer votre score?')

                if (!endGame){
                    if (confirmation) {
                        fetch('score.php', {
                            method: 'POST',
                            body: JSON.stringify({
                                user: userName,
                                scoreUser: userScore,


                            }),
                            //on dit au serveur qu'on lui envoie du json et on lui précise UTF-8
                            headers: {
                                "Content-type": "application/json; charset=UTF-8"
                            }
                        })
                            .then(
                                response => response.json()
                            ).then(
                            json => {
                                console.log(json)
                            }
                        ).catch(
                            error => console.error(error)
                        )
                    }


                    clearInterval(greenGhostInterval)
                    clearInterval(blueGhostInterval)
                    clearInterval(redGhostInterval)
                    removeEventListener("keydown", endHand)
                    endGame = true
                    if (endGame){
                        window.fetch(url).then(
                            result => result.json()
                        ).then(
                            json => {
                                console.log(json);
                                posts = json
                                const postsList = posts.map(post => {
                                    console.log(post);
                                    return `<li class="flex"><div>${post.user} </div><div>--------------- </div><div>${ post.scoreUser }</div></li>`
                                });
                                const ulContent = postsList.join('')

                                ul.innerHTML = ulContent;
                            }
                        ).catch(
                            error => console.log(error)
                        );
                        modal.style.display = 'block'
                        clearInterval(pacManInterval)
                    }
                }
            }


            if (!isTheCharacterBlocked(pacManPosition, to)) {
                switch (to) {
                    case 'toLeft':
                        pacMan.style.left = pacManPosition.left === 0 ? 900 + "px" : pacManPosition.left - 100 + "px"
                        break
                    case 'toRight':
                        pacMan.style.left = pacManPosition.left === 900 ? 0 : pacManPosition.left + 100 + "px"
                        break
                    case 'toTop':
                        pacMan.style.top = pacManPosition.top - 100 + "px"
                        break
                    case 'toBottom':
                        pacMan.style.top = pacManPosition.top + 100 + "px"
                        break
                }
                pacManPosition = getPositionOf(pacMan)
            }
        }, 250)

    }

    //MOVE DU LEVEL 1
    //Mouvement du fantome rouge
    const moveRedGhost = () => {
        clearInterval(redGhostInterval)

        let redGhostPosition = getPositionOf(redGhost)

        const randomInt = Math.floor(Math.random() * 4)
        const randomDirection = directions[randomInt] // Soit 'toLeft', 'toRight', 'toTop', 'toBottom'


        redGhostInterval = setInterval(() => {
            currentRedGhostDirection = randomDirection

            if (!isTheCharacterBlocked(redGhostPosition, randomDirection)) {

                switch (randomDirection) {
                    case 'toLeft':
                        redGhost.style.left = redGhostPosition.left === 0 ? 900 + "px" : redGhostPosition.left - 100 + "px"
                        break
                    case 'toRight':
                        redGhost.style.left = redGhostPosition.left === 900 ? 0 : redGhostPosition.left + 100 + "px"
                        break
                    case 'toTop':
                        redGhost.style.top = redGhostPosition.top - 100 + "px"
                        break
                    case 'toBottom':
                        redGhost.style.top = redGhostPosition.top + 100 + "px"
                        break
                }
                redGhostPosition = getPositionOf(redGhost)
            } else {
                moveRedGhost() // La fonction est relancée si le fantôme est bloqué
                return
            }
        }, 250)
    }

    //Mouvement du fantome blue
    const moveBlueGhost = () => {
        clearInterval(blueGhostInterval)

        let blueGhostPosition = getPositionOf(blueGhost)

        const randomInt = Math.floor(Math.random() * 4)
        const randomDirection = directions[randomInt]


        blueGhostInterval = setInterval(() => {
            currentBlueGhostDirection = randomDirection

            if (!isTheCharacterBlocked(blueGhostPosition, randomDirection)) {

                switch (randomDirection) {
                    case 'toLeft':
                        blueGhost.style.left = blueGhostPosition.left === 0 ? 900 + "px" : blueGhostPosition.left - 100 + "px"
                        break
                    case 'toRight':
                        blueGhost.style.left = blueGhostPosition.left === 900 ? 0 : blueGhostPosition.left + 100 + "px"
                        break
                    case 'toTop':
                        blueGhost.style.top = blueGhostPosition.top - 100 + "px"
                        break
                    case 'toBottom':
                        blueGhost.style.top = blueGhostPosition.top + 100 + "px"
                        break
                }
                blueGhostPosition = getPositionOf(blueGhost)
            } else {
                moveBlueGhost() // La fonction est relancée si le fantôme est bloqué
                return
            }
        }, 250)
    }

    //Mouvement du fantome green
    const moveGreenGhost = () => {
        clearInterval(greenGhostInterval)

        let greenGhostPosition = getPositionOf(greenGhost)

        const randomInt = Math.floor(Math.random() * 4)
        const randomDirection = directions[randomInt] // Soit 'toLeft', 'toRight', 'toTop', 'toBottom'

        greenGhostInterval = setInterval(() => {
            currentGreenGhostDirection = randomDirection

            if (!isTheCharacterBlocked(greenGhostPosition, randomDirection)) {

                switch (randomDirection) {
                    case 'toLeft':
                        greenGhost.style.left = greenGhostPosition.left === 0 ? 900 + "px" : greenGhostPosition.left - 100 + "px"
                        break
                    case 'toRight':
                        greenGhost.style.left = greenGhostPosition.left === 900 ? 0 : greenGhostPosition.left + 100 + "px"
                        break
                    case 'toTop':
                        greenGhost.style.top = greenGhostPosition.top - 100 + "px"
                        break
                    case 'toBottom':
                        greenGhost.style.top = greenGhostPosition.top + 100 + "px"
                        break
                }
                greenGhostPosition = getPositionOf(greenGhost)
            } else {
                moveGreenGhost() // La fonction est relancée si le fantôme est bloqué
                return
            }
        }, 250)
    }

    //MOVE DU LEVEL 2
    //Méthode qui va permettre au ghost de suivre le pacman
    const move = (character, from, to) => {
        switch (to) {
            case 'toLeft':
                character.dataset.left = from.left === 0 ? 900 : from.left - 100
                character.style.left = isSmallScreen() ? pxToViewportSize(character.dataset.left) + sizeUnit() : character.dataset.left + sizeUnit()
                break
            case 'toRight':
                character.dataset.left = from.left === 900 ? 0 : from.left + 100
                character.style.left = isSmallScreen() ? pxToViewportSize(character.dataset.left) + sizeUnit() : character.dataset.left + sizeUnit()
                break
            case 'toTop':
                character.dataset.top = from.top - 100
                character.style.top = isSmallScreen() ? pxToViewportSize(character.dataset.top) + sizeUnit() : character.dataset.top + sizeUnit()
                break
            case 'toBottom':
                character.dataset.top = from.top + 100
                character.style.top = isSmallScreen() ? pxToViewportSize(character.dataset.top) + sizeUnit() : character.dataset.top + sizeUnit()
                break
        }
    }

    //Fonction qui retourne le delta (position) entre pacman et un ghost
    const getDelta = (pacManPosition, ghostPosition) => {
        const top = pacManPosition.top - ghostPosition.top
        const left = pacManPosition.left - ghostPosition.left
        let topDirection, leftDirection
        if (top === 0) topDirection = null
        else topDirection = top > 0 ? 'toBottom' : 'toTop'
        if (left === 0) leftDirection = null
        else leftDirection = left > 0 ? 'toRight' : 'toLeft'
        return { top, left, topDirection, leftDirection }
    }

    //Méthode qui suit le pacman
    const moveToPacMan = (ghost) => {
        const pacManPosition = getPositionOf(pacMan)
        const ghostPosition = getPositionOf(ghost)
        const delta = getDelta(pacManPosition, ghostPosition)

        let direction

        if (delta.top === delta.left) direction = [delta.topDirection, delta.leftDirection][Math.floor(Math.random() * 2)]
        if (delta.topDirection === null) direction = delta.leftDirection
        else if (delta.leftDirection === null) direction = delta.topDirection
        else direction = delta.top < delta.left ? delta.topDirection : delta.leftDirection

        if (isTheCharacterBlocked(ghostPosition, direction)) {
            direction = direction === delta.topDirection ? delta.leftDirection : delta.topDirection
            if (direction === null) {
                let otherDirections = directions.filter(direction => direction !== delta.topDirection && direction !== delta.leftDirection)
                direction = otherDirections[Math.floor(Math.random() * 2)]
            }
        }

        while (isTheCharacterBlocked(ghostPosition, direction)) {
            let otherDirections = directions.filter(direction => direction !== delta.topDirection && direction !== delta.leftDirection)
            direction = otherDirections[Math.floor(Math.random() * 2)]
        }
        move(ghost, ghostPosition, direction)
    }

    //Méthode qui va faire suivre le red ghost vers le pacman
    const moveToPacManRedGhost = () => {

        let timeout

        if(level >= 2 && level < 5)
            timeout = 500
        else if(level >= 5 && level < 8)
            timeout = 400
        else if(level >= 8)
            timeout = 300

        console.log("Vitesse rouge : " + timeout)

        clearInterval(redGhostInterval)
        redGhostInterval = setInterval(() => {
            moveToPacMan(redGhost)
        }, timeout)
    }

    //Méthode qui va faire suivre le blue ghost vers le pacman
    const moveToPacManBlueGhost = () => {

        let timeout

        if(level >= 3 && level < 6)
            timeout = 500
        else if(level >= 6 && level < 9)
            timeout = 400
        else if(level >= 9)
            timeout = 300

        console.log("Vitesse blue : " + timeout)

        clearInterval(blueGhostInterval)
        blueGhostInterval = setInterval(() => {
            moveToPacMan(blueGhost)
        }, timeout)
    }

    //Méthode qui va faire suivre le green ghost vers le pacman
    const moveToPacManGreenGhost = () => {

        let timeout

        if(level >= 4 && level < 7)
            timeout = 500
        else if(level >= 7 && level < 10)
            timeout = 400
        else if(level >= 10)
            timeout = 300

        console.log("Vitesse green : " + timeout)

        clearInterval(greenGhostInterval)
        greenGhostInterval = setInterval(() => {
            moveToPacMan(greenGhost)
        }, timeout)
    }

    //------------------------------------GESTION DES INPUTS--------------------------------------------------


    let endHand = (e) => {
        switch (e.keyCode) {
            case 37:
                movePacMan('toLeft')
                break
            case 39:
                movePacMan('toRight')
                break
            case 38:
                movePacMan('toTop')
                break
            case 40:
                movePacMan('toBottom')
                break
        }
    }

    addEventListener('keydown', endHand)


    //Méthode qui va afficher tous les pacgums
    const displayDots = () => {

        //Création des différents pacgums
        for(let col = 0; col < 10; col++){
            for(let row = 0; row < 10; row++){

                if((row == 3 && col == 0) || (row == 3 && col == 1) || (row == 5 && col == 0) || (row == 5 && col == 1) || (row == 4 && col == 4) || (row == 4 && col == 5) || (row == 3 && col == 8) || (row == 3 && col == 9) || (row == 5 && col == 8) || (row == 5 && col == 9)){
                    //Do nothing
                }else {

                    //Créer un element
                    const dot = document.createElement('div')
                    dot.className = 'dot'
                    dot.style.left = col * 100 + 'px'
                    dot.style.top = row * 100 + 'px'

                    map.insertBefore(dot, pacMan)
                }

            }
        }
    }

    //Méthode qui va afficher l'input pour que l'user puisse poser son blaze (et affichage du level)
    const displayNameInput = () => {

        userName = prompt("Player's Name", "PacMan")



        //Si il ne tape rien dans l'input, on ne lance pas la partie
        if(userName != null && userName.length > 2 && userName.length < 8){


            //on modifie la valeur de l'html pour qu'il prenne en compte le nom de l'user
            const user = document.querySelector('.playerName')
            user.innerHTML = userName //on modifie le h3

            //Affichage du level actuel du joueur
            const userLevel = document.querySelector('.playerLevel')
            userLevel.innerHTML = "Level : " + level

            document.getElementById('userName').value = userName

            start()


        }else{ //Vérification pour qu'il y ait 3 caractères minimums dans le nom de l'user

            prompt("Le nom doit être compris entre 3 et 7 caratères", "PacMan")
            displayNameInput()

        }

    }

    //Lors de la validation du formulaire
    const start = () => {

        //Affichage du level actuel du joueur
        const userLevel = document.querySelector('.playerLevel')
        userLevel.innerHTML = "Level : " + level

        displayDots()

            switch (level) {
                case 1:
                    moveBlueGhost()
                    moveRedGhost()
                    moveGreenGhost()
                    break;

                case 2:
                    moveGreenGhost()
                    moveBlueGhost()
                    moveToPacManRedGhost()
                    break;

                case 3:
                    moveGreenGhost()
                    moveToPacManRedGhost()
                    moveToPacManBlueGhost()
                    break;

                case 8:
                case 9:
                case 10:
                case 7:
                case 6:
                case 5:
                case 4:
                    moveToPacManGreenGhost()
                    moveToPacManRedGhost()
                    moveToPacManBlueGhost()
                    break;


            }

    }

    //Lancement de cette méthode avant le lancement de la partie
    displayNameInput()

