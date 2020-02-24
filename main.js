    // Variables globales
    const map = document.querySelector('.map')
    const pacMan = document.querySelector('img[src="./img/pacman.gif"]')
    const redGhost = document.querySelector('img[src="./img/red-ghost.png')
    const blueGhost = document.querySelector('img[src="./img/blue-ghost.png"]')
    const greenGhost = document.querySelector('img[src="./img/green-ghost.png"]')

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

    const directions = ['toLeft', 'toRight', 'toBottom', 'toTop']

    //--------------------------------------------MURS---------------------------------------------------------
    // Collection des murs axe horizontal droite-gauche
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

        //Maybe switch, pacman mange les pacgums
        //Recuperer position de pacman
        //Construire un tableau des positions de tous les points présents sur la carte
        //document.querySelectorAll('.dot')
        //supp du document --> un foreach
        //créer une variable let score et l'incrémenter

        clearInterval(pacManInterval)

        pacMan.className = to

        let pacManPosition = getPositionOf(pacMan)

        pacManInterval = setInterval(() => {


            document.querySelectorAll('.dot').forEach(function(item, index) {

                if (pacManPosition.top + 'px' === item.style.top && pacManPosition.left + 'px' === item.style.left){
                    if (item.style.display !== 'none'){ //Condition pour éviter de recompter les gums déjà mangées
                        item.style.display = 'none'
                        userScore = userScore + 1
                    }

                    //Maj de l'affichage du score
                    const score = document.querySelector('.playerScore')
                    score.innerHTML = userScore //on modifie le h3

                }
            });


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

        // générer un "to" aléatoire
        // À SUPPRIMER APRÈS LE POINT ⭐️
        const randomInt = Math.floor(Math.random() * 4)
        const randomDirection = directions[randomInt] // Soit 'toLeft', 'toRight', 'toTop', 'toBottom'

        // SI NOUS VOULONS AMÉLIORER LE DÉPLACEMENT, IL FAUDRA REMPLACER LES DEUX LIGNES PRÉCÉDENTES PAR UNE SOLUTION DE CE GENRE
        // let filtredDirections = directions.filter((direction) => {
        //     return direction !== currentRedGhostDirection && ????
        // })

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


    //------------------------------------GESTION DES INPUTS--------------------------------------------------
    addEventListener('keydown', e => {

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
    })

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

    //Méthode qui va afficher l'input pour que l'user puisse poser son blaze
    const displayNameInput = () => {

        userName = prompt("Player's Name", "PacMan")

        //Si il ne tape rien dans l'input, on ne lance pas la partie
        if(userName != null){

            //on modifie la valeur de l'html pour qu'il prenne en compte le nom de l'user
            const user = document.querySelector('.playerName')
            user.innerHTML = userName //on modifie le h3

            start()
        }

    }

    //Lors de la validation du formulaire
    const start = () => {
        displayDots()
        moveBlueGhost()
        moveRedGhost()
        moveGreenGhost()
    }

    //Lancement de cette méthode avant le lancement de la partie
    displayNameInput()