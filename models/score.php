<?php


function getUsers(){
    $db = dbConnect();
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        $query = $db->query('SELECT * FROM users ORDER BY scoreUser DESC LIMIT 10');
        $users = $query->fetchAll();
        return $users;
    }
};


function check($data){

    $db = dbConnect();
    $query = $db->prepare('SELECT * FROM users WHERE user = ?');
    $result = $query->execute(array($data['user']));
    $resultQuery = $query ->fetch();
    return $resultQuery;

};

function newHighScore($data){

    $db = dbConnect();
    $query = $db->prepare('UPDATE users SET scoreUser = ? WHERE user = ? ');
    $result = $query->execute(array(
        $data['scoreUser'],
        $data['user'],
    ));
    return $result;

};

function add($data){

    $db = dbConnect();

    $query = $db->prepare('INSERT INTO users ( user , scoreUser) VALUES (?, ?)');
    $result = $query->execute(
        array(
            $data['user'],
            $data['scoreUser'],
        ));
    return $result;
};

