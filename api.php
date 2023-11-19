<?php
require './vendor/autoload.php';
include_once './includes/_db.php';
include_once './includes/_function.php';

// To display best scores
if (isset($_REQUEST['score']) && $_REQUEST['score'] === 'request') {
    $query = $dbCo->prepare("SELECT name, score FROM game JOIN player USING (id_player) ORDER BY score DESC LIMIT 10;");
    $query->execute();
    echo json_encode($query->fetchAll());
}

// To have correct language displayed
else if (isset($_REQUEST['lang']) && strlen($_REQUEST['lang']) === 2 && isset($_REQUEST['modify'])) {
    $query = $dbCo->prepare("SELECT * FROM text t JOIN languages l USING(id_languages) WHERE l.name = :name ORDER BY t.id_text");
    $query->execute([
        'name' => strip_tags($_REQUEST['lang'])
    ]);
    echo json_encode($query->fetchAll());
}

// To display categories
else if (isset($_REQUEST['category']) && isset($_REQUEST['lang'])) {
    $query = $dbCo->prepare("SELECT c.name, c.table_name FROM category c JOIN languages l USING (id_languages) WHERE l.name = :name;");
    $query->execute([
        'name' => strip_tags($_REQUEST['lang'])
    ]);
    echo json_encode($query->fetchAll());
}

// To get quiz
else if (isset($_REQUEST['quiztable']) && isset($_REQUEST['difficulty']) && isset($_REQUEST['lang'])) {
    $query = $dbCo->prepare("SELECT * FROM animalsinnumbers WHERE langue = :langue AND niveau = :niveau");
    $query->execute([
        // 'quiztable' => strip_tags($_REQUEST['quiztable']),
        'langue' => strip_tags($_REQUEST['lang']),
        'niveau' => intval(strip_tags($_REQUEST['difficulty']))
    ]);
    echo json_encode($query->fetchAll());
};