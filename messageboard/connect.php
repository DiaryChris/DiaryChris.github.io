<?php
	error_reporting(E_ALL ^ E_DEPRECATED);
if(!mysql_connect(HOST.':'.PORT,USERNAME,PASSWORD)){
		echo mysql_error();
	}
	if(!mysql_select_db(DATABASE)){
		echo mysql_error();
	}
	if(!mysql_query('set names utf8')){
		echo mysql_error();
	}
?>