<?php

require 'models/score.php';
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {

    $db = dbConnect();
    $encodedData = file_get_contents("php://input");
    $data = json_decode($encodedData, true);
    $verifInfo = check($data);


    if ($verifInfo){
        if ($verifInfo['scoreUser'] < $data['scoreUser']){
            $updateDb = newHighScore($data);
            $answer = [
                'message' => $updateDb ? 'Nouveau HighScore' : 'Nouveau HighScore pas enregister',
                'newPost' => $data
            ];
        }
        else{
            $answer = [
                'message' =>'Votre Score actuel ne depasse pas votre meilleur Score donc il ne sera pas enregistré',
            ];
        }

    }
    else{
        $insertDb= add($data);

        $answer = [
            'message' => $insertDb ? 'nouveau score bien enregistré' : 'score pas enregistré',
            'newPost' => $data
        ];

    }
    echo json_encode($answer);
}
else{
    $posts = getUsers();
    echo json_encode($posts);



}
