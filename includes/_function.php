<?php

/**
 * Generate a valid token in $_SESSION
 *
 * @return void
 */
function generateToken()
{
    if (!isset($_SESSION['token']) || time() > $_SESSION['tokenExpire']) {
        $_SESSION['token'] = md5(uniqid(mt_rand(), true));
        $_SESSION['tokenExpire'] = time() + 15 * 60;
    }
}

/**
 * Check for CSRF with referer and token
 * Redirect to the given page in case of error
 *
 * @param string $url The page to redirect
 * @return void
 */
function checkCSRF(string $url): void
{
    if (!isset($_SERVER['HTTP_REFERER']) || !str_contains($_SERVER['HTTP_REFERER'], 'http://localhost/come-on-barbie-let-s-go-party/')) {
        $_SESSION['error'] = 'error_referer';
    } else if (
        !isset($_SESSION['token']) || !isset($_REQUEST['token'])
        || $_REQUEST['token'] !== $_SESSION['token']
        || $_SESSION['tokenExpire'] < time()
    ) {
        $_SESSION['error'] = 'error_token';
    }
    if (!isset($_SESSION['error'])) return;

    header('Location: ' . $url);
    exit;
}

/**
 * Check for CSRF with referer and token
 *
 * @param array $data
 * @return void
 */
function checkCSRFAsync(array $data): void
{
    if (!isset($_SERVER['HTTP_REFERER']) || !str_contains($_SERVER['HTTP_REFERER'], 'http://localhost/todolist/')) {
        $error = 'error_referer';
    } else if (
        !isset($_SESSION['token']) || !isset($data['token'])
        || $data['token'] !== $_SESSION['token']
        || $_SESSION['tokenExpire'] < time()
    ) {
        $error = 'error_token';
    }
    if (!isset($error)) return;

    echo json_encode([
        'result' => false,
        'error' => $error
    ]);
    exit;
}

/**
 * Apply treatment on given array to prevent XSS fault.
 * 
 * @param array &$array
 */
function checkXSS(array &$array): void
{
    $array = array_map('strip_tags', $array);
}