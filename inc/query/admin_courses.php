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

  Editor::inst( $db, 'courses', 'id' )
  ->fields(
        Field::inst( 'courses.name' ),
        Field::inst( 'courses.code' ),
        Field::inst( 'courses.credits' ),
        Field::inst( 'courses.description' ),
        Field::inst( 'courses.sbc' ),
        Field::inst( 'courses.category' ),
        Field::inst( 'courses.university' ),
        Field::inst( 'courses.department' ),
        Field::inst( 'courses.syllabus_id' )
            ->setFormatter(Format::ifEmpty(null))
            ->upload(
                Upload::inst($_SERVER['DOCUMENT_ROOT'].'/uploads/__ID__.__EXTN__')
                    ->db('syllabi', 'id', array(
                        'course_id' => 'id',
                        'name' => Upload::DB_FILE_NAME,
                        'size' => Upload::DB_FILE_SIZE,
                        'web_path' => Upload::DB_WEB_PATH
                    ))
                    
        ),
        Field::inst('syllabi.id'),
        Field::inst('syllabi.name'),
        Field::inst('syllabi.web_path'),
    )
->leftJoin('syllabi', 'courses.syllabus_id', '=', 'syllabi.id')
->process( $_POST )
->json();