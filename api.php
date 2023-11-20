<?php
require './vendor/autoload.php';
include_once './includes/_function.php';

header('content-type:application/json');

$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['action'])) {
    echo json_encode([
        'result' => false,
        'error' => 'Aucune action'
    ]);
    exit;
}

include_once './includes/_db.php';

session_start();
// checkCSRFAsync($data);
// checkXSS($data);

// To display best scores
if (isset($data['action']) && $data['action'] === 'score-request') {
    $dbCo->beginTransaction();
    $query = $dbCo->prepare("SELECT name, score FROM game JOIN player USING (id_player) ORDER BY score DESC LIMIT 10;");
    $isQueryOk = $query->execute();
    $dbCo->commit();
    if ($isQueryOk) {
        echo json_encode($query->fetchAll());
    }
    else {
        echo json_encode([
            'result' => false,
            'error' => 'Problème lors de la récupération des scores.'
        ]);
    }
}

// To have correct language displayed
else if (isset($data['lang']) && strlen($data['lang']) === 2 && isset($data['action']) && $data['action'] === 'lang-modify') {
    $dbCo->beginTransaction();
    $query = $dbCo->prepare("SELECT * FROM text t JOIN languages l USING(id_languages) WHERE l.name = :name ORDER BY t.id_text");
    $isQueryOk = $query->execute([
        'name' => strip_tags($data['lang'])
    ]);
    if ($isQueryOk) {
        echo json_encode($query->fetchAll());
    }
    else {
        echo json_encode([
            'result' => false,
            'error' => 'Problème lors de la récupération des langues.'
        ]);
    }
}

// To display categories
else if (isset($data['action']) && $data['action'] === 'category' && isset($data['lang']) && strlen($data['lang']) === 2) {
    $dbCo->beginTransaction();
    $query = $dbCo->prepare("SELECT c.name, c.table_name FROM category c JOIN languages l USING (id_languages) WHERE l.name = :name;");
    $isQueryOk = $query->execute([
        'name' => strip_tags($data['lang'])
    ]);
    if ($isQueryOk) {
        echo json_encode($query->fetchAll());
    }
    else {
        echo json_encode([
            'result' => false,
            'error' => 'Problème lors de la récupération des categories.'
        ]);
    }
}

// To get quiz
else if (isset($data['quiztable']) && isset($data['difficulty']) && isset($data['lang']) && strlen($data['lang']) === 2 && isset($data['action']) && $data['action'] === 'add-quiz') {
    $dbCo->beginTransaction();
    $query = $dbCo->prepare("SELECT * FROM animalsinnumbers WHERE langue = :langue AND niveau = :niveau");
    $isQueryOk = $query->execute([
        // 'quiztable' => strip_tags($data['quiztable']),
        'langue' => strip_tags($data['lang']),
        'niveau' => intval(strip_tags($data['difficulty']))
    ]);
    if ($isQueryOk) {
        echo json_encode($query->fetchAll());
    }
    else {
        echo json_encode([
            'result' => false,
            'error' => 'Problème lors de la récupération des quiz.'
        ]);
    }
};