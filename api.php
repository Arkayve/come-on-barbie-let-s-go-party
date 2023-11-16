<?php
require './vendor/autoload.php';
include_once './includes/_db.php';
include_once './includes/_function.php';

// To have correct language displayed
if (isset($_REQUEST['lang']) && strlen($_REQUEST['lang']) === 2) {
    $lang = strip_tags($_REQUEST['lang']);
    $query = $dbCo->prepare("SELECT id_language FROM languages WHERE name = :name");
    $query->execute([
        'name' => strip_tags($lang)
    ]);
    $idLang = $query->fetch();
    $query = $dbCo->prepare("SELECT * FROM text WHERE id_language = :id_lang ORDER BY id_text");
    $query->execute([
        'id_lang' => intval(strip_tags($idLang['id_language']))
    ]);
    $result = $query->fetchAll();
    echo json_encode($result);
}

// To display categories
else if (isset($_REQUEST['category'])) {
    $query = $dbCo->prepare("SELECT name FROM category");
    $query->execute();
    $result = $query->fetchAll();
    echo json_encode($result);
};