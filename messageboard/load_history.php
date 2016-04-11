<?php

$username = addslashes($_SESSION['username'] ? $_SESSION['username'] : $_COOKIE['username']);
$sql = "SELECT * FROM messages WHERE username='{$username}'";
$res = mysql_query($sql);
$rows = array();
while ($row = mysql_fetch_array($res, MYSQL_ASSOC)) {
    $rows[] = $row;
}
if ($rows) {
    foreach ($rows as $row) {
        echo "<span class='time'>" . $row['time'] . "</span><br/><span class='message'>" . $row['message'] . "</span><br/><br/>";
    }
}
