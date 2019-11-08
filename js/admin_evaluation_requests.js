// $(document).ready(function() {
//     $('#courses').DataTable();
// } );
/* Formatting function for row details - modify as you need */
function format ( d ) {
    // `d` is the original data object for the row
    return "<div>"+
        '<table cellpadding="5" cellspacing="0" border="0" style="padding-left: 50px; float: left;">'+
            // '<tr>'+
            //     '<td><Strong>Course1</Strong></td>'+
            //     '<td></td>'+
            // '</tr>'+
            '<tr>'+
                '<td>Code:</td>'+
                '<td>'+d.course1.code+'</td>'+
            '</tr>'+
            // '<tr>'+
            //     '<td>Nature:</td>'+
            //     '<td>'+d.course1.nature+'</td>'+
            // '</tr>'+
            '<tr>'+
                '<td>Credits:</td>'+
                '<td>' +d.course1.credit+ '</td>'+
            '</tr>'+
            '<tr>'+
                '<td>Description:</td>'+
                '<td>' +d.course1.description+ '</td>'+
            '</tr>'+
            '<tr>'+
                '<td>Syllabus:</td>'+
                '<td>' +"<a href='" + d.course1.syllabus.web_path + "' download>" + d.course1.syllabus.name + "</a>"+ '</td>'+
            '</tr>'+
        '</table>'+
        '<table cellpadding="5" cellspacing="0" border="0" style="padding-left: 16%; display: inline-block;">'+
            // '<tr>'+
            //     '<td><Strong>Course2</Strong></td>'+
            //     '<td></td>'+
            // '</tr>'+
            '<tr>'+
                '<td>Code:</td>'+
                '<td>'+d.course2.code+'</td>'+
            '</tr>'+
            // '<tr>'+
            //     '<td>Nature:</td>'+
            //     '<td>'+d.course2.nature+'</td>'+
            // '</tr>'+
            '<tr>'+
                '<td>Credits:</td>'+
                '<td>' +d.course2.credit+ '</td>'+
            '</tr>'+
            '<tr>'+
                '<td>Description:</td>'+
                '<td>' +d.course2.description+ '</td>'+
            '</tr>'+
            '<tr>'+
                '<td>Syllabus:</td>'+
                '<td>' +"<a href='" + d.course2.syllabus.web_path + "' download>" + d.course2.syllabus.name + "</a>"+ '</td>'+
            '</tr>'+
        '</table>'+
    "</div>";
}
 
$(document).ready(function() {
    editor = new $.fn.dataTable.Editor( {
        ajax: "./inc/query/admin_evaluation_requests.php",
        table: "#admin_evaluation_requests",
        i18n: {
            create: {
                title: "Create a new evalution request"
            },
            edit: {
                title: "Edit a evalution request"
            }
        },
        fields: [ {
            label: "Course 1",
            name: "courses.id",
            type: "select"
        },  {
            label: "Course 2",
            name: "courses.id",
            type: "select"
        }]
    } );
    var table = $('#admin_evaluation_requests').DataTable( {
        "ajax": "/ajax/data/objects.txt",
        columnDefs: [{targets: 3,
            render: function ( data, type, row ) {
              var color;
              if (data == "pending") {
                color = 'black';
              } 
              if (data == "approved") {
                color = 'green';
              }
              if (data == "denied") {
                color = 'red';
              }
              return '<span style="color:' + color + '">' + data + '</span>';
            }
        }],
        "columns": [
            {
                "class":          'details-control',
                "orderable":      false,
                "data":           null,
                "defaultContent": ''
            },
            { "data": "course1.name" },
            { "data": "course2.name" },
            { "data": "approved" }
        ],
        "order": [[1, 'asc']]
    } );
     
    // Add event listener for opening and closing details
    $('#courses tbody').on('click', 'td.details-control', function () {
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