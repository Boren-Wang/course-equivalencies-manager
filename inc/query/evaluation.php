<?php
  include("../config/DataTables.php");

  // Alias Editor classes so they are easy to use
  use
  DataTables\Editor,
  DataTables\Editor\Field,
  DataTables\Editor\Format,
  DataTables\Editor\Join,
  DataTables\Editor\Upload,
  DataTables\Editor\Validate;

  Editor::inst( $db, 'evaluation_requests', 'id' )
  ->fields(
        Field::inst( 'evaluation_requests.id' ),
        Field::inst( 'evaluation_requests.course1_id' )
            ->options('courses', 'id', 'name')
            ->validator('Validate::notEmpty'),
        Field::inst( 'evaluation_requests.course2_id' )
            ->options('courses', 'id', 'name')
            ->validator('Validate::notEmpty'),
        Field::inst( 'evaluation_requests.status' ),
        Field::inst( 'course1.id' ),
        Field::inst( 'course1.name' ),
        Field::inst( 'course1.code' ),
        Field::inst( 'course1.credits' ),
        Field::inst( 'course1.description' ),
        Field::inst( 'course1.syllabus_id' ),
        Field::inst( 'course2.id' ),
        Field::inst( 'course2.name' ),
        Field::inst( 'course2.code' ),
        Field::inst( 'course2.credits' ),
        Field::inst( 'course2.description' ),
        Field::inst( 'course2.syllabus_id' )
    )
->leftJoin('courses as course1', 'evaluation_requests.course1_id', '=', 'course1.id')
->leftJoin('courses as course2', 'evaluation_requests.course2_id', '=', 'course2.id')
->process( $_POST )
->json();