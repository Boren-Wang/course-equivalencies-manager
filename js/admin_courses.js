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
            label: "AHU Course Name: ",
            name: "courses.name"
        },  {
            label: "AHU Course Code: ",
            name: "courses.code"
        }, {
            label: "AHU Course Credits: ",
            name: "courses.credits"
        }, {
            label: "AHU Course Description: ",
            name: "courses.description"
        },{
            label: "SBU Equivalent Name: ",
            name: "courses.sbu_name"
        },{
            label: "SBU Equivalent Code: ",
            name: "courses.sbu_code"
        },{
            label: "SBU Equivalent Credits: ",
            name: "courses.sbu_credits"
        },{
            label: "SBU Equivalent Description: ",
            name: "courses.sbu_description"
        },
        {
            label: "Semester: ",
            name: "courses.semester",
            type: "select",
            options: [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8
            ]
        },{
            label: "Remark: ",
            name: "courses.remark"
        },{
            label: "SBC: ",
            name: "courses.sbc",
            type: "select",
            options: [
                "None",
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
        }, {
            label: "SBC2: ",
            name: "courses.sbc2",
            type: "select",
            options: [
                "None",
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
        },
        // {
        //     label: "Department: ",
        //     name: "courses.department"
        // }, 
        {
            label: "Required By: ",
            name: "courses.required",
            type: "select",
            options: [
                "None",
                "AMS",
                "ISE",
                "PHY",
                "AMS & ISE",
                "AMS & PHY",
                "ISE & PHY",
                "AMS & ISE & PHY"
            ]
        }, {
            label: "Serve as an Elective In: ",
            name: "courses.elective",
            type: "select",
            options: [
                "None",
                "AMS",
                "ISE",
                "PHY",
                "AMS & ISE",
                "AMS & PHY",
                "ISE & PHY",
                "AMS & ISE & PHY"
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
        // },
        // {
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

    // $('#admin_courses').on( 'click', 'tbody td:not(:first-child):not(.child)', function (e) {
    //     editor.bubble( this );
    // } );

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
            { "data": "courses.sbu_name" },
            { "data": "courses.sbu_code" },
            { "data": "courses.sbu_credits" },
            { "data": "courses.semester" },
            { "data": "courses.sbc" },
            { "data": "courses.sbc2" },
            { "data": "courses.required" },
            { "data": "courses.elective" },
            // { "data": "courses.category" },
            // {   data: "syllabi.id",
            //     render: function (val) {
            //         return val != null ?
            //             "<a href='" + editor.file( 'syllabi', val ).web_path + "' download=" + editor.file( 'syllabi', val ).name + ">" + editor.file( 'syllabi', val ).name + "</a>" : ""
            //     },
            //     defaultContent: "No File",
            //     title: "Syllabus"
            // },
        ],
        order: [[1, 'asc']],
        select: true,
        buttons: [
            { extend: "create", editor: editor },
            { extend: "edit",   editor: editor },
            { extend: "remove", editor: editor }
        ],
        // initComplete: function () {
        //     this.api().columns(2).every( function () {
        //         var column = this;
        //         var select = $('<select><option value="">University</option></select>')
        //             .appendTo( $(column.header()).empty() )
        //             .on( 'change', function () {
        //                 var val = $.fn.dataTable.util.escapeRegex(
        //                     $(this).val()
        //                 );

        //                 column
        //                     .search( this.value )
        //                     .draw();
        //             } );
        //         // console.log(column.data());
        //         column.data().sort().unique().each( function ( d, j ) {
        //             select.append( '<option value="'+d+'">'+d+'</option>' )
        //         } );
        //     } );
        // }
        initComplete: function () {
            this.api().columns([7, 10, 11]).every( function () {
                var column = this;
                var columnHeader;
                if(this.index()===7){
                    columnHeader="Semester"
                } else if(this.index()===10){
                    columnHeader="Required By"
                } else if(this.index()===11){
                    columnHeader="Serve as an Elective in"
                }
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

    // table
    //     .column(9)
    //     .search( "AMS" )
    //     .draw();
    // table.search( "AMS" ).draw();
    $('#drop_down').on('change', function() {
        // alert(this.value)
        if(this.value==="ALL"){
            table.search("").draw();
        } else if(this.value==="AMS"){
            table.search("AMS").draw();
        } else if(this.value==="CSE"){
            table.search("CSE").draw();
        } else if(this.value==="PHY"){
            table.search("PHY").draw();
        } 
    });

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
