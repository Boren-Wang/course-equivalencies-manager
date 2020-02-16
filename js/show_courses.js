// $(document).ready(function() {
//     $('#courses').DataTable();
// } );
/* Formatting function for row details - modify as you need */
function format ( d ) {
    // `d` is the original data object for the row
    var code;
    if(d.courses.description.length>0) {
        code = d.courses.code
    } else {
        code = "None"
    }
    return "<div>"+
        '<table cellpadding="5" cellspacing="0" border="0">'+
            '<tr>'+
                '<td class="child">AHU Course Description:</td>'+
                (code==="None"?"<td class='child'>None</td>":'<td class="child"><a href="' +d.courses.description+ '">' + code + '</a></td>')+
            '</tr>'+
            '<tr>'+
                '<td class="child">SBU Equivalent Description:</td>'+
                (!d.courses.sbu_description?"<td class='child'>None</td>":'<td class="child"><a href="' +d.courses.sbu_description+ '">' + d.courses.sbu_code + '</a></td>')+
            '</tr>'+
            // '<tr>'+
            //     '<td>University:</td>'+
            //     '<td>'+d.courses.university+'</td>'+
            // '</tr>'+
            '<tr>'+
                '<td class="child">Remark:</td>'+
                '<td class="child">'+(d.courses.remark?d.courses.remark:"None")+'</td>'+
            '</tr>'+
            // '<tr>'+
            //     '<td class="child">Department:</td>'+
            //     '<td class="child">'+d.courses.department+'</td>'+
            // '</tr>'+
            '<tr>'+
                '<td class="child">SBC-2:</td>'+
                '<td class="child">'+(d.courses.sbc2)+'</td>'+
            '</tr>'+
            '<tr>'+
                '<td class="child">SBC-3:</td>'+
                '<td class="child">'+(d.courses.sbc3)+'</td>'+
            '</tr>'+
            '<tr>'+
                '<td class="child">SBC-4:</td>'+
                '<td class="child">'+(d.courses.sbc4)+'</td>'+
            '</tr>'+
            '<tr>'+
                '<td class="child">SBC-5:</td>'+
                '<td class="child">'+(d.courses.sbc5)+'</td>'+
            '</tr>'+
        '</table>'+
    "</div>";
}
 
$(document).ready(function() {
    var table = $('#show_courses').DataTable( {
        dom: "Bfrtlip",
        ajax: {
            url: "./inc/query/show_courses.php",
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
            { "data": "courses.sbu_name" },
            { "data": "courses.sbu_code" },
            { "data": "courses.sbu_credits" },
            { "data": "courses.semester" },
            { "data": "courses.related_major" },
            { "data": "courses.required" },
            { "data": "courses.elective" },
            { "data": "courses.ahu_required",
                render: function(val) {
                    return val == 1 ? "Yes" : "No";
                }
            },
            { "data": "courses.sbc" },
            // { "data": "courses.sbc2" },
            
        ],
        order: [[1, 'asc']],
        select: true,
        buttons: [
            'csv', 'pdf', 'print'
        ],
        initComplete: function () {
            this.api().columns([7]).every( function () {
                var column = this;
                var columnHeader="semester";
                // if(this.index()===7){
                //     columnHeader="Semester"
                // } else if(this.index()===9){
                //     columnHeader="Major Requirement"
                // } else if(this.index()===10){
                //     columnHeader="Elective"
                // }
                var select = $('<select><option value="">'+columnHeader+'</option></select>')
                    .appendTo( $(column.header()).empty() )
                    .on( 'change', function () {
                        var val = $.fn.dataTable.util.escapeRegex(
                            $(this).val()
                        );
 
                        column
                            .search( val ? '^'+val+'$' : '', true, false )
                            .draw();
                    } );
 
                column.data().unique().sort().each( function ( d, j ) {
                    select.append( '<option value="'+d+'">'+d+'</option>' )
                } );
            } );
        }
    } );

    $('#show_drop_down').on('change', function() {
        // alert(this.value)
        if(this.value==="ALL"){
            // alert(this.value);
            table.column(8).search("").draw();
        } else if(this.value==="AMS"){
            // alert(this.value);
            table.column(8).search("AMS").draw();
        } else if(this.value==="ISE"){
            // alert(this.value);
            table.column(8).search("ISE").draw();
        } else if(this.value==="PHY"){
            // alert(this.value);
            table.column(8).search("PHY").draw();
        } 
    });

    // Add event listener for opening and closing details
    $('#show_courses tbody').on('click', 'td.details-control', function () {
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
