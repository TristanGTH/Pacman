<?php ?>
<!DOCTYPE html>
<html lang="fr-FR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vanilla Pac-Man</title>
    <link rel="stylesheet" href="assets/css/style.css">
</head>

<body>

<!-- Background du jeu pour avoir un fond un peu plus beau -->
<div class="arcadeBackground">
    <img class="imgArcade" src="assets/img/logo.png" alt="logo">
</div>

<!-- Formulaire avec le bouton jouer et le nom du joueur -->
<form method="post" id="form_id">
    <input type="hidden" value="" name="userName"  id="userName">
</form>

<div class="center">
    <!-- Map, PacMan, et fantomes -->
    <div class="map">
        <img src="assets/img/pacman.gif" alt="Pacman">
        <img src="assets/img/red-ghost.png" alt="RedGhost">
        <img src="assets/img/blue-ghost.png" alt="BlueGhost">
        <img src="assets/img/green-ghost.png" alt="GreenGhost">
        <img src="assets/img/background.svg" alt="Labyrinthe">
    </div>

    <!-- Stats du joueurs affichées en bas de la zone de jeu -->
    <div class="playerStats">
        <h3 class="playerName"> Player1 </h3>
        <h3> ----------- </h3>
        <h3 class="playerScore"> 0 </h3>

    </div>

    <div class="playerStats">
        <h3 class="playerLevel"></h3>
    </div>


</div>

<div id="myModal" class="modal">

    <!-- Modal content -->
    <div class="modal-content">
        <ul></ul>
    </div>

</div>

<!-- Script js du joueur -->
<script type="text/javascript" src="assets/js/main.js"></script>
</body>
</html>
