<?php


try {
    $db = new PDO('mysql:host=localhost;dbname=pacmanmain;charset=utf8', 'root', '', array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));
} catch (Exception $exception) {
    die('Erreur : ' . $exception->getMessage());
}



if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $query = $db->query('SELECT * FROM users ORDER BY scoreUser DESC LIMIT 10');
    $users = $query->fetchAll();

    echo json_encode($users);

} else {

    $encodedData = file_get_contents("php://input");
    $data = json_decode($encodedData, true);

    $query = $db->prepare('INSERT INTO users ( user , scoreUser) VALUES (?, ?)');
    $result = $query->execute(
        array(
            $data['user'],
            $data['scoreUser'],
        ));

        $answer = [
            'message' => $result ? 'Partie enregistré' : 'Partie pas enregistré',
            'newPost' => $data
        ];


    echo json_encode($answer);

}


