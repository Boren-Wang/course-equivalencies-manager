/* Formatting function for row details - modify as you need */
function format ( d ) {
    // `d` is the original data object for the row
    var code1;
    if(d.course1.description.length>0) {
        code1 = d.course1.code
    } else {
        code1 = "None"
    }
    var code2;
    if(d.course2.description.length>0) {
        code2 = d.course2.code
    } else {
        code2 = "None"
    }
    return "<div>"+
        '<table cellpadding="5" cellspacing="0" border="0">'+
            '<tr>'+
                '<td>Name:</td>'+
                '<td><Strong>'+d.course1.name+'</Strong></td>'+
            '</tr>'+
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
                '<td>' +d.course1.credits+ '</td>'+
            '</tr>'+
            '<tr>'+
                '<td>Description:</td>'+
                '<td><a href="' +d.course1.description+ '">' + code1 + '</a></td>'+
            '</tr>'+
            // '<tr>'+
            //     '<td>Syllabus:</td>'+
            //     '<td>' +"<a href='" + d.course1.syllabus.web_path + "' download>" + d.course1.syllabus.name + "</a>"+ '</td>'+
            // '</tr>'+
        '</table>'+
        "<hr>"+
        '<table cellpadding="5" cellspacing="0" border="0">'+
            '<tr>'+
                '<td>Name:</td>'+       
                '<td><Strong>'+d.course2.name+'</Strong></td>'+
            '</tr>'+
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
                '<td>' +d.course2.credits+ '</td>'+
            '</tr>'+
            '<tr>'+
                '<td>Description:</td>'+
                '<td><a href="' +d.course2.description+ '">' + code2 + '</a></td>'+
            '</tr>'+
            // '<tr>'+
            //     '<td>Syllabus:</td>'+
            //     '<td>' +"<a href='" + d.course2.syllabus.web_path + "' download>" + d.course2.syllabus.name + "</a>"+ '</td>'+
            // '</tr>'+
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
            label: "Course",
            name: "evaluation_requests.course1_id",
            type: "select"
        },  {
            label: "SBU Equivalent",
            name: "evaluation_requests.course2_id",
            type: "select"
        }]
    } );
    var table = $('#admin_evaluation_requests').DataTable( {
        dom: "Bfrtip",
        // "ajax": "/ajax/data/objects.txt",
        ajax: {
            url: "./inc/query/admin_evaluation_requests.php",
            type: "POST"
        },
        columnDefs: [{targets: 3,
            render: function ( data, type, row ) {
              var color;
              if (data == "Pending") {
                color = 'black';
              } 
              if (data == "Approved") {
                color = 'green';
              }
              if (data == "Denied") {
                color = 'red';
              }
              console.log(color);
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
            { "data": "evaluation_requests.status" }
        ],
        "order": [[1, 'asc']],
        select: true,
        buttons: [
            { extend: "create", editor: editor },
            { extend: "edit",   editor: editor },
            { extend: "remove", editor: editor }
        ]
    } );
     
    // Add event listener for opening and closing details
    $('#admin_evaluation_requests tbody').on('click', 'td.details-control', function () {
        // console.log("Clicked!")
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