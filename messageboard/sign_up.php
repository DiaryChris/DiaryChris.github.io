<!doctype html>
<html lang="zh_CN">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=1366">
    <title>注册 SIGN UP</title>
    <link rel="shortcut icon" href="../icon/favicon.ico"/>
    <link rel="stylesheet" type="text/css" href="../css/normalize.css"/>
    <link rel="stylesheet" type="text/css" href="css/sign_up.css"/>
</head>
<body>
<div id="main">
    <h2 id="regh">注册 SIGN UP</h2>
    <hr>
    <form  method="post" action="action.php?act=signup" id="registerForm">
        <ul id="signuplist">
            <li class="line">
                <label for="username">用户名</label>
                <input type="text" id="username" name="username" placeholder=" 在这里填名字" required>
                <span class="res"></span>
            </li>
            <li class="line">
                <label for="password">密码</label>
                <input type="password" id="password" name="password" placeholder=" 请勿使用常用密码" required>
                <span class="res"></span>
            </li>
            <li class="line">
                <label for="passconfirm">密码确认</label>
                <input type="password" id="passconfirm" name="passconfirm" placeholder=" 填不对只能说明你笨" required>
                <span class="res"></span>
            </li>
            <li class="line">
                <label for="email">邮箱</label>
                <input type="email" id="email" name="email" placeholder=" 可以使用QQ邮箱" required>
                <span class="res"></span>
            </li>
            <li class="line">
                <input type="checkbox" id="check" name="check" required>
                <label id="checkinfo" for="check">我已同意达瑞哥哥从后台偷瞄我的信息</label>
            </li>
        </ul>
        <button id="submit" type="submit">注册</button>
    </form>
</div>
<script type="text/javascript" src="script/formEvent.js"></script>
</body>
</html>