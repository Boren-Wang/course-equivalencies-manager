var editor;

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
                '<td class="child">Description:</td>'+
                (code==="None"?"<td class='child'>None</td>":'<td class="child"><a href="' +d.courses.description+ '">' + code + '</a></td>')+
            '</tr>'+
            // '<tr>'+
            //     '<td>University:</td>'+
            //     '<td>'+d.courses.university+'</td>'+
            // '</tr>'+
            '<tr>'+
                '<td class="child">Department:</td>'+
                '<td class="child">'+d.courses.department+'</td>'+
            '</tr>'+
        '</table>'+
    "</div>";
}
 
$(document).ready(function() {
    editor = new $.fn.dataTable.Editor( {
        ajax: "./inc/query/admin_courses.php",
        table: "#admin_courses_evaluation",
        i18n: {
            create: {
                title: "Create a new course"
            },
            edit: {
                title: "Edit a course"
            }
        },
        fields: [ 
        // {
        //     label: "Name: ",
        //     name: "courses.name"
        // },  {
        //     label: "Code: ",
        //     name: "courses.code"
        // }, {
        //     label: "Credits: ",
        //     name: "courses.credits"
        // }, {
        //     label: "Description: ",
        //     name: "courses.description"
        // },
        {
            label: "SBC: ",
            name: "courses.sbc",
            type: "select",
            options: [
                "None",
                "Non-Transferable",
                { label: "Explore and Understand the Fine and Performing Arts (ARTS)", value: "ARTS" },
                { label: "Engage Global Issues (GLO)", value: "GLO" },
                { label: "Address Problems using Critical Analysis and the Methods of the Humanities (HUM)", value: "HUM" },
                { label: "Communicate in a Human Language Other than English (LANG)", value: "LANG" },
                { label: "Master Quantitative Problem Solving (QPS)", value: "QPS" },
                { label: "Understand, Observe, and Analyze Human Behavior and the Structure and Functioning of Society (SBS)", value: "SBS" },
                { label: "Study the Natural World (SNW)", value: "SNW" },
                { label: "Understand Technology (TECH)", value: "TECH" },
                { label: "Understand the Political, Economic, Social, and Cultural History of the United States (USA)", value: "USA" },
                { label: "Write Effectively in English (WRT)", value: "WRT" },
                { label: "Examine significant relationships between Science or Technology and the Arts, Humanities, or Social Sciences (STAS)", value: "STAS" },
                { label: "Experiential Learning (EXP+)", value: "EXP+" },
                { label: "Humanities and Fine Arts (HFA+)", value: "HFA+" },
                { label: "Social and Behavioral Sciences (SBS+)", value: "SBS+" },
                { label: "Science, Technology, Engineering, and Mathematics (STEM+)", value: "STEM+" },
                { label: "Practice and Respect Critical and Ethical Reasoning (CER)  ", value: "CER" },
                { label: "Respect Diversity and Foster Inclusiveness (DIV) (see Note 2 below)", value: "DIV" },
                { label: "Evaluate and Synthesize Researched Information (ESI)  ", value: "ESI" },
                { label: "Speak Effectively before an Audience (SPK)  ", value: "SPK" },
                { label: "Write Effectively within One’s Discipline (WRTD)", value: "WRTD" },
            ]
        },{
            label: "Category: ",
            name: "courses.category",
            type: "select",
            options: [
                "General Education",
                "Major Compulsory",
                "Major Elective"
            ]
        },
        // {
        //     label: "University: ",
        //     name: "courses.university",
        //     type: "select",
        //     options: [
        //         "Stony Brook University",
        //         "Anhui University"
        //     ]
        // },{
        //     label: "Department: ",
        //     name: "courses.department"
        // }, {
        //     label: "Syllabus: ",
        //     name: "courses.syllabus_id",
        //     type: "upload",
        //     noFileText: "No File",
        //     clearText: "Clear",
        //     display: function(id) {
        //         return "<a href='" + editor.file( 'syllabi', id ).web_path + "' download>" + editor.file( 'syllabi', id ).name + "</a>";
        //     }
        // }
        ]
    } );

    $('#admin_courses_evaluation').on( 'click', 'tbody td:not(:first-child):not(.child)', function (e) {
        editor.bubble( this );
    } );

    var table = $('#admin_courses_evaluation').DataTable( {
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
            { "data": "courses.university" },
            { "data": "courses.code" },
            { "data": "courses.credits" },
            { "data": "courses.sbc" },
            { "data": "courses.category" },
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
            // { extend: "create", editor: editor },
            { extend: "edit",   editor: editor },
            // { extend: "remove", editor: editor }
        ],
        initComplete: function () {
            this.api().columns(2).every( function () {
                var column = this;
                var select = $('<select><option value="">University</option></select>')
                    .appendTo( $(column.header()).empty() )
                    .on( 'change', function () {
                        var val = $.fn.dataTable.util.escapeRegex(
                            $(this).val()
                        );

                        column
                            .search( this.value )
                            .draw();
                    } );
                // console.log(column.data());
                column.data().sort().unique().each( function ( d, j ) {
                    select.append( '<option value="'+d+'">'+d+'</option>' )
                } );
                
            } );
        }
    } );
    // Add event listener for opening and closing details
    $('#admin_courses_evaluation tbody').on('click', 'td.details-control', function () {
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