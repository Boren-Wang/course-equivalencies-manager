<?php

include("./config/DataTables.php");

use
    DataTables\Editor,
    DataTables\Editor\Field;

Editor::inst($db, 'institutions')
    ->field(
        Field::inst( 'institutions.name' ),
        Field::inst( 'institutions.longitude' ),
        Field::inst( 'institutions.latitude' ),
        Field::inst( 'institutions.since' ),
        Field::inst( 'institutions.city' ),
        Field::inst( 'institutions.country' ),
        Field::inst( 'institutions.hide' ),
        Field::inst( 'programs.term' ),
        Field::inst( 'programs.language' )
    )
    ->leftJoin('programs', 'institutions.id' ,'=', 'programs.institutionID')
    ->process($_POST)
    ->json();

//

//try {
//	$results = $db->query("SELECT * FROM institutions i LEFT JOIN programs p ON i.id = p.institutionID");
//} catch(Exception $e) {
//	echo "Data could not be retrieved from the database.";
//	exit;
//}
//
//$programs = $results->fetchAll(PDO::FETCH_ASSOC);