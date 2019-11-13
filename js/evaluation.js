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
        ajax: "./inc/query/evaluation.php",
        table: "#evaluation",
        i18n: {
            edit: {
                title: "Evaluation"
            }
        },
        fields: [ {
            label: "Status:",
            name: "evaluation_requests.status",
            type: "select",
            options: [
                "Pending",
                "Approved",
                "Denied",
            ]
        } ]
    } );
    var table = $('#evaluation').DataTable( {
        dom: "Bfrtip",
        // "ajax": "/ajax/data/objects.txt",
        ajax: {
            url: "./inc/query/evaluation.php",
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
            { extend: "edit",   editor: editor },
        ]
    } );
     
    // Add event listener for opening and closing details
    $('#evaluation tbody').on('click', 'td.details-control', function () {
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