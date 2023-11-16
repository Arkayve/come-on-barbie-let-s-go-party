<?php
require './vendor/autoload.php';
include_once './includes/_db.php';
include_once './includes/_function.php';

// To have correct language displayed
if (isset($_REQUEST['lang'])) {
    $lang = $_REQUEST['lang'];
}
else {
    $lang = 'us';
};
$query = $dbCo->prepare("SELECT id_language FROM languages WHERE name = :name");
$query->execute([
    'name' => strip_tags($lang)
]);
$idLang = $query->fetch();
$query = $dbCo->prepare("SELECT * FROM text WHERE id_language = :id_lang");
$query->execute([
    'id_lang' => intval(strip_tags($idLang['id_language']))
]);
$result = $query->fetchAll();
echo json_encode($result);
