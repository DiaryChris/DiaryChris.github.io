<?php

header('content-type:text/html;charset=utf-8');
date_default_timezone_set('Asia/Shanghai');
session_start();
define('ROOT',dirname(__FILE__));
set_include_path('.'.PATH_SEPARATOR.ROOT.'/lib'.PATH_SEPARATOR.ROOT.'/inc'.PATH_SEPARATOR.ROOT.'/func');
require_once 'local_config.php';
require_once 'connect.php';
require_once 'user_func.php';
require_once 'alertMes_func.php';

?>