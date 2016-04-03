<?php
require_once 'include.php';
error_reporting(E_ALL ^ E_NOTICE);
//检查是否有正确cookie存在
if ($_COOKIE['username']) {
    $username = addslashes($_COOKIE['username']);
    $sql = "SELECT * FROM users WHERE username='{$username}'";
    $res = mysql_query($sql);
    $rows = mysql_fetch_array($res, MYSQL_ASSOC);
    if ($rows) {
        $_SESSION['username'] = $_COOKIE['username'];
        header('Location: messageboard.php');
        exit;
    }
}
header('Location: log_in.php');
exit;