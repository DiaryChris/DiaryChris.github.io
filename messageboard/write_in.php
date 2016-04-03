<?php 
	require_once("include.php");
	if(!isset($_POST["message"]))
	{
		echo "未收到";
	}
	elseif (empty($_POST["message"])) 
	{
		echo "none";
	}
	else
	{

		$message = $_POST['message'];
		$username = $_SESSION['username']?$_SESSION['username']:$_COOKIE['username'];
		$time = date("Y/m/d H:i:s");
//		echo $message;
//		echo $time;
		$sql = "INSERT INTO messages(time,username,message) VALUES('{$time}','{$username}', '{$message}')";
		if(!mysql_query($sql))
		{
			echo mysql_error();
		}
	}
?>