<!doctype html>
<html lang="zh_CN">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=1366">
    <title>登录 LOG IN</title>
    <link rel="shortcut icon" href="../icon/favicon.ico"/>
    <link rel="stylesheet" type="text/css" href="../css/normalize.css"/>
    <link rel="stylesheet" type="text/css" href="css/log_in.css"/>
</head>
<body>
<div id="main">
    <h2 id="logh">登录 LOG IN</h2>
    <hr>
    <form method="post" action="action.php?act=login" id="loginForm">
        <ul id="loginList">
            <li class="line">
                <input type="text" id="username" name="username" placeholder="用户名/邮箱" required>
                <span class="res"></span>
            </li>
            <li class="line">
                <input type="password" id="password" name="password" placeholder="密码" required>
                <span class="res"></span>
            </li>
            <li class="line">
                <input type="checkbox" id="checkRemember" name="checkRemember">
                <label id="rememberInfo" for="checkRemember">记住我</label>
                <a href="sign_up.php" id="forget">尚未注册？</a>
            </li>
        </ul>
        <button id="submit" type="submit">登录</button>
    </form>
</div>
</body>
</html>