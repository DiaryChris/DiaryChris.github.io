<?php require_once 'include.php'?>

<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html" charset="utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=1366">
    <title>留言板</title>
    <link rel="shortcut icon" href="../icon/favicon.ico"/>
    <link rel="stylesheet" href="../css/normalize.css">
    <link rel="stylesheet" href="css/messageboard.css">
</head>
<body>
<div id="wrap">
    <div id="displayArea">
        <?php require_once 'load_history.php' ?>
    </div>
    <div id="bottomArea">
        <div id="inputLine">
            <textarea id="textInput" name="message"></textarea>
            <button id="submit" type="submit">留言</button>
        </div>
        <div id="status"></div>
    </div>
</div>
<script type="text/javascript" src="../lib/jquery-1.11.3.min.js"></script>
<script type="text/javascript" src="script/messageboard.js"></script>
</body>
</html>