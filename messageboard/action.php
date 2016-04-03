<?php
require_once 'include.php';
error_reporting(E_ALL ^ E_NOTICE);
$act = $_REQUEST['act'];
//注册动作
if ($act === 'signup') {
    $res = signup();
    if ($res) {
        alertMes('注册成功', 'log_in.php');
    } else if (mysql_errno() === 1062) {
        if (strpos(addslashes(mysql_error()), 'username')) {
            alertMes('用户名已存在，请重试', 'sign_up.php');
        } else if (strpos(addslashes(mysql_error()), 'email')) {
            alertMes('邮箱已存在，请重试', 'sign_up.php');
        }
    } else {
        $errorstr = '注册失败\n错误信息:' . mysql_errno() . ":" . addslashes(mysql_error());
        alertMes($errorstr, 'sign_up.php');
    }
}
//登录动作
if ($act === 'login') {
    $res = login();
    switch ($res) {
        case 0:
            alertMes( '用户名/邮箱不存在', 'log_in.php');
            break;
        case 1;
            alertMes('密码错误', 'log_in.php');
            break;
        case 2:
            alertMes('登录成功', 'messageboard.php');
            break;
    }
}
