<?php if (!defined('DATATABLES')) exit(); // Ensure being used in DataTables env.

// Enable error reporting for debugging (remove for production)
error_reporting(E_ALL);
ini_set('display_errors', '1');


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Database user / pass
 */
$sql_details = array(
	"type" => "Mysql",   // Database type: "Mysql", "Postgres", "Sqlserver", "Sqlite" or "Oracle"
    "user" => "b451271c84d327",        // Database user name
	"pass" => "d04d6c01",        // Database password
	"host" => "us-cdbr-iron-east-05.cleardb.net",        // Database host
	"port" => "3306",        // Database connection port (can be left empty for default)
	"db"   => "heroku_673c2b84b11cd77",        // Database name
	"dsn"  => "charset=utf8",        // PHP DSN extra information. Set as `charset=utf8` if you are using MySQL
	"pdoAttr" => array() // PHP PDO attributes array. See the PHP documentation for all options
);

// $sql_details = array(
// 	"type" => "Mysql",   // Database type: "Mysql", "Postgres", "Sqlserver", "Sqlite" or "Oracle"
//     "user" => "root",        // Database user name
// 	"pass" => "mhw1015sz15,.",        // Database password
// 	"host" => "127.0.0.1",        // Database host
// 	"port" => "",        // Database connection port (can be left empty for default)
// 	"db"   => "evaluation_helper",        // Database name
// 	"dsn"  => "charset=utf8",        // PHP DSN extra information. Set as `charset=utf8` if you are using MySQL
// 	"pdoAttr" => array() // PHP PDO attributes array. See the PHP documentation for all options
// );