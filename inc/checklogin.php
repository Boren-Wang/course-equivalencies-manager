<?php
	session_start();
//	include("./config/config.php");

    define("HOST", "127.0.0.1");
    define("DB", "iaps");
    define("PORT", "3306");
    define("USER", "root");
    define("PWD", "mhw1015sz15,.");

	try {
	  $db = new PDO("mysql:host=".HOST.";dbname=".DB.";port".PORT, USER, PWD);

	  $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	  $db->exec("SET NAMES 'utf8'");
	} catch(Exception $e) {
	  echo $e->GetMessage();
	  exit;
	}

	$_SESSION['user'] = NULL;
	$_SESSION['error'] = false;

	// username and password sent from form
	$username = $_POST['username'];
	$password = $_POST['password'];

	// To protect MySQL injection (more detail about MySQL injection)
	$username = stripslashes($username);
	$password = stripslashes($password);

	try {
		$results = $db->query("SELECT * FROM users WHERE username ='" . $username . "' AND password = '" . $password . "'");
	} catch(Exception $e) {
		exit;
	}

	$users = $results->fetchAll(PDO::FETCH_ASSOC);

	if(count($users) == 1) {
		$_SESSION['user'] = $username;
		header("location:../admin.php");
		exit();
	} else {
		$_SESSION['error'] = true;
		header("location:../login.php");
		exit();
	}
