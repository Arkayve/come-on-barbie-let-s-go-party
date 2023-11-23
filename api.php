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
checkCSRFAsync($data);
checkXSS($data);

// To display best scores
if (isset($data['action']) && $data['action'] === 'score-request') {
    try {
        $dbCo->beginTransaction();
        $query = $dbCo->prepare("SELECT name, score FROM game JOIN player USING (id_player) ORDER BY score DESC LIMIT 10;");
        $isQueryOk = $query->execute();
        if ($isQueryOk) {
            $dbCo->commit();
            echo json_encode($query->fetchAll());
        } else {
            $dbCo->rollBack();
            echo json_encode([
                'result' => false,
                'error' => 'Problème lors de la récupération des scores.'
            ]);
        }
    } catch (Exception $e) {
        $dbCo->rollBack();
        echo json_encode([
            'result' => false,
            'error' => 'Une erreur s\'est produite : ' . $e->getMessage()
        ]);
    }
}

// To have correct language displayed
else if (isset($data['lang']) && strlen($data['lang']) === 2 && isset($data['action']) && $data['action'] === 'lang-modify') {
    try {
        $dbCo->beginTransaction();
        $query = $dbCo->prepare("SELECT * FROM text t JOIN languages l USING(id_languages) WHERE l.name = :name ORDER BY t.id_text");
        $isQueryOk = $query->execute([
            'name' => $data['lang']
        ]);
        if ($isQueryOk) {
            $dbCo->commit();
            echo json_encode($query->fetchAll());
        } else {
            $dbCo->rollBack();
            echo json_encode([
                'result' => false,
                'error' => 'Problème lors de la récupération des langues.'
            ]);
        }
    } catch (Exception $e) {
        $dbCo->rollBack();
        echo json_encode([
            'result' => false,
            'error' => 'Une erreur s\'est produite : ' . $e->getMessage()
        ]);
    }
}

// To display categories
else if (isset($data['action']) && $data['action'] === 'category' && isset($data['lang']) && strlen($data['lang']) === 2) {
    try {
        $dbCo->beginTransaction();
        $query = $dbCo->prepare("SELECT c.name, c.table_name FROM category c JOIN languages l USING (id_languages) WHERE l.name = :name;");
        $isQueryOk = $query->execute([
            'name' => $data['lang']
        ]);
        if ($isQueryOk) {
            $dbCo->commit();
            echo json_encode($query->fetchAll());
        } else {
            $dbCo->rollBack();
            echo json_encode([
                'result' => false,
                'error' => 'Problème lors de la récupération des categories.'
            ]);
        }
    } catch (Exception $e) {
        $dbCo->rollBack();
        echo json_encode([
            'result' => false,
            'error' => 'Une erreur s\'est produite : ' . $e->getMessage()
        ]);
    }
}

// To get quiz
else if (isset($data['quiztable']) && isset($data['difficulty']) && isset($data['lang']) && strlen($data['lang']) === 2 && isset($data['action']) && $data['action'] === 'add-quiz') {
    try {
        $dbCo->beginTransaction();
        $query = $dbCo->prepare("SELECT * FROM animalsinnumbers WHERE langue = :langue AND niveau = :niveau");
        $isQueryOk = $query->execute([
            // 'quiztable' => $data['quiztable']),
            'langue' => $data['lang'],
            'niveau' => intval($data['difficulty'])
        ]);
        if ($isQueryOk) {
            $dbCo->commit();
            echo json_encode($query->fetchAll());
        } else {
            $dbCo->rollBack();
            echo json_encode([
                'result' => false,
                'error' => 'Problème lors de la récupération des quiz.'
            ]);
        }

    } catch (Exception $e) {
        $dbCo->rollBack();
        echo json_encode([
            'result' => false,
            'error' => 'Une erreur s\'est produite : ' . $e->getMessage()
        ]);
    }
};