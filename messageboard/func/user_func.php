<?php

//数据表users写入函数
function signup()
{
    $username = $_REQUEST['username'];
    $password = md5($_REQUEST['password']);
    $email = $_REQUEST['email'];
    $reg_time = date('Y/m/d H:i:s');
    $sql = "INSERT INTO users(username,password,email,reg_time) VALUES('$username', '$password','$email','$reg_time')";
    $res = mysql_query($sql);
    return $res;
}

//数据表users查询比对函数
function login()
{
    $username = mysql_real_escape_string($_REQUEST['username']);
    $password = md5($_REQUEST['password']);
    $checked=$_REQUEST['checkRemember'];
    $isEmail = preg_match('/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z]+)+)$/', $username);
    if ($isEmail === 1) {
        $altRes = mysql_query("SELECT username FROM users WHERE email='{$username}'");
        $altRows = mysql_fetch_array($altRes, MYSQL_ASSOC);
        if (!$altRows) {
            return 0;
        }
        $username = $altRows['username'];
    }
    $sql = "SELECT password FROM users WHERE username='{$username}'";
    $res = mysql_query($sql);
    $rows = mysql_fetch_array($res, MYSQL_ASSOC);
    if (!$rows) {
        return 0;
    } else if ($rows['password'] !== $password) {
        return 1;
    } else {
        if($_COOKIE['username']){
            setcookie('username');
        }
        if($checked){
            setcookie('username',$username,time()+7*24*3600);
        }
        $_SESSION['username'] = $username;
        return 2;
    }
}
