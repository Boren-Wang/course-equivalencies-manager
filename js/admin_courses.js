var editor;

// $(document).ready(function() {
//     $('#courses').DataTable();
// } );
/* Formatting function for row details - modify as you need */
function format ( d ) {
    // `d` is the original data object for the row
    var code="Nonde";
    if(d.courses.description.length>0) {
        code = d.courses.code
    } else {
        code = "None"
    }
    return "<div>"+
        '<table cellpadding="5" cellspacing="0" border="0">'+
            '<tr>'+
                '<td>Description:</td>'+
                '<td><a href="' +d.courses.description+ '">' + code + '</a></td>'+
            '</tr>'+
        '</table>'+
    "</div>";
}
 
$(document).ready(function() {
    editor = new $.fn.dataTable.Editor( {
        ajax: "./inc/query/admin_courses.php",
        table: "#admin_courses",
        i18n: {
            create: {
                title: "Create a new course"
            },
            edit: {
                title: "Edit a course"
            }
        },
        fields: [ {
            label: "Name: ",
            name: "course.name"
        },  {
            label: "Code: ",
            name: "courses.code"
        }, {
            label: "Credits: ",
            name: "courses.credits"
        }, {
            label: "Description: ",
            name: "courses.description"
        }, {
            label: "Syllabus: ",
            name: "courses.syllabus_id",
            type: "upload",
            noFileText: "No File",
            clearText: "Clear",
            display: function(id) {
                return "<a href='" + editor.file( 'syllabi', id ).web_path + "' download>" + editor.file( 'syllabi', id ).name + "</a>";
            }
        }]
    } );
    var table = $('#admin_courses').DataTable( {
        dom: "Bfrtip",
        ajax: {
            url: "./inc/query/admin_courses.php",
            type: "POST"
        },
        columns: [
            {
                "class":          'details-control',
                "orderable":      false,
                "data":           null,
                "defaultContent": ''
            },
            { "data": "courses.name" },
            { "data": "courses.code" },
            { "data": "courses.credits" },
            {   data: "syllabi.id",
                render: function (val) {
                    return val != null ?
                        "<a href='" + editor.file( 'syllabi', val ).web_path + "' download=" + editor.file( 'syllabi', val ).name + ">" + editor.file( 'syllabi', val ).name + "</a>" : ""
                },
                defaultContent: "No File",
                title: "Syllabus"
            },
        ],
        order: [[1, 'asc']],
        select: true,
        buttons: [
            { extend: "create", editor: editor },
            { extend: "edit",   editor: editor },
            { extend: "remove", editor: editor }
        ]
    } );
    // Add event listener for opening and closing details
    $('#admin_courses tbody').on('click', 'td.details-control', function () {
        var tr = $(this).parents('tr');
        var row = table.row( tr );
 
        if ( row.child.isShown() ) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
        }
        else {
            // Open this row
            row.child( format(row.data()) ).show();
            tr.addClass('shown');
        }
    } );
} );