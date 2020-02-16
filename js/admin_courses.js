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
            label: "Remark: ",
            name: "courses.remark"
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
        },
        {
            label: "Related Major",
            name: "courses.related_major",
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
        {
            label: "Major Requirement: ",
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
            label: "Elective: ",
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
        {
            label: "AHU Requirement: ",
            name: "courses.ahu_required",
            type: "select",
            options: [
                {label: "Yes", value: 1},
                {label: "No", value: 0},
            ]
        }, 
        {
            label: "SBC: ",
            name: "courses.sbc",
            type: "select",
            options: [
                "None",
                { label: "(ARTS) Explore and Understand the Fine and Performing Arts", value: "ARTS" },
                { label: "(GLO) Engage Global Issues", value: "GLO" },
                { label: "(HUM) Address Problems using Critical Analysis and the Methods of the Humanities", value: "HUM" },
                { label: "(LANG) Communicate in a Human Language Other than English", value: "LANG" },
                { label: "(QPS) Master Quantitative Problem Solving", value: "QPS" },
                { label: "(SBS)Understand, Observe, and Analyze Human Behavior and the Structure and Functioning of Society", value: "SBS" },
                { label: "(SNW) Study the Natural World", value: "SNW" },
                { label: "(TECH) Understand Technology", value: "TECH" },
                { label: "(USA) Understand the Political, Economic, Social, and Cultural History of the United States", value: "USA" },
                { label: "(WRT) Write Effectively in English (WRT)", value: "WRT" },
                { label: "(STAS) Examine significant relationships between Science or Technology and the Arts, Humanities, or Social Sciences", value: "STAS" },
                { label: "(EXP+) Experiential Learning", value: "EXP+" },
                { label: "(HFA+) Humanities and Fine Arts", value: "HFA+" },
                { label: "(SBS+) Social and Behavioral Sciences", value: "SBS+" },
                { label: "(STEM+) Science, Technology, Engineering, and Mathematics", value: "STEM+" },
                { label: "(CER) Practice and Respect Critical and Ethical Reasoning", value: "CER" },
                { label: "(DIV) Respect Diversity and Foster Inclusiveness (see Note 2 below)", value: "DIV" },
                { label: "(ESI) Evaluate and Synthesize Researched Information", value: "ESI" },
                { label: "(SPK) Speak Effectively before an Audience", value: "SPK" },
                { label: "(WRTD) Write Effectively within One’s Discipline", value: "WRTD" },
            ]
        }, {
            label: "SBC2: ",
            name: "courses.sbc2",
            type: "select",
            options: [
                "None",
                { label: "(ARTS) Explore and Understand the Fine and Performing Arts", value: "ARTS" },
                { label: "(GLO) Engage Global Issues", value: "GLO" },
                { label: "(HUM) Address Problems using Critical Analysis and the Methods of the Humanities", value: "HUM" },
                { label: "(LANG) Communicate in a Human Language Other than English", value: "LANG" },
                { label: "(QPS) Master Quantitative Problem Solving", value: "QPS" },
                { label: "(SBS)Understand, Observe, and Analyze Human Behavior and the Structure and Functioning of Society", value: "SBS" },
                { label: "(SNW) Study the Natural World", value: "SNW" },
                { label: "(TECH) Understand Technology", value: "TECH" },
                { label: "(USA) Understand the Political, Economic, Social, and Cultural History of the United States", value: "USA" },
                { label: "(WRT) Write Effectively in English (WRT)", value: "WRT" },
                { label: "(STAS) Examine significant relationships between Science or Technology and the Arts, Humanities, or Social Sciences", value: "STAS" },
                { label: "(EXP+) Experiential Learning", value: "EXP+" },
                { label: "(HFA+) Humanities and Fine Arts", value: "HFA+" },
                { label: "(SBS+) Social and Behavioral Sciences", value: "SBS+" },
                { label: "(STEM+) Science, Technology, Engineering, and Mathematics", value: "STEM+" },
                { label: "(CER) Practice and Respect Critical and Ethical Reasoning", value: "CER" },
                { label: "(DIV) Respect Diversity and Foster Inclusiveness (see Note 2 below)", value: "DIV" },
                { label: "(ESI) Evaluate and Synthesize Researched Information", value: "ESI" },
                { label: "(SPK) Speak Effectively before an Audience", value: "SPK" },
                { label: "(WRTD) Write Effectively within One’s Discipline", value: "WRTD" },
            ]
        },
        {
            label: "SBC3: ",
            name: "courses.sbc3",
            type: "select",
            options: [
                "None",
                { label: "(ARTS) Explore and Understand the Fine and Performing Arts", value: "ARTS" },
                { label: "(GLO) Engage Global Issues", value: "GLO" },
                { label: "(HUM) Address Problems using Critical Analysis and the Methods of the Humanities", value: "HUM" },
                { label: "(LANG) Communicate in a Human Language Other than English", value: "LANG" },
                { label: "(QPS) Master Quantitative Problem Solving", value: "QPS" },
                { label: "(SBS)Understand, Observe, and Analyze Human Behavior and the Structure and Functioning of Society", value: "SBS" },
                { label: "(SNW) Study the Natural World", value: "SNW" },
                { label: "(TECH) Understand Technology", value: "TECH" },
                { label: "(USA) Understand the Political, Economic, Social, and Cultural History of the United States", value: "USA" },
                { label: "(WRT) Write Effectively in English (WRT)", value: "WRT" },
                { label: "(STAS) Examine significant relationships between Science or Technology and the Arts, Humanities, or Social Sciences", value: "STAS" },
                { label: "(EXP+) Experiential Learning", value: "EXP+" },
                { label: "(HFA+) Humanities and Fine Arts", value: "HFA+" },
                { label: "(SBS+) Social and Behavioral Sciences", value: "SBS+" },
                { label: "(STEM+) Science, Technology, Engineering, and Mathematics", value: "STEM+" },
                { label: "(CER) Practice and Respect Critical and Ethical Reasoning", value: "CER" },
                { label: "(DIV) Respect Diversity and Foster Inclusiveness (see Note 2 below)", value: "DIV" },
                { label: "(ESI) Evaluate and Synthesize Researched Information", value: "ESI" },
                { label: "(SPK) Speak Effectively before an Audience", value: "SPK" },
                { label: "(WRTD) Write Effectively within One’s Discipline", value: "WRTD" },
            ]
        },
        {
            label: "SBC4: ",
            name: "courses.sbc4",
            type: "select",
            options: [
                "None",
                { label: "(ARTS) Explore and Understand the Fine and Performing Arts", value: "ARTS" },
                { label: "(GLO) Engage Global Issues", value: "GLO" },
                { label: "(HUM) Address Problems using Critical Analysis and the Methods of the Humanities", value: "HUM" },
                { label: "(LANG) Communicate in a Human Language Other than English", value: "LANG" },
                { label: "(QPS) Master Quantitative Problem Solving", value: "QPS" },
                { label: "(SBS)Understand, Observe, and Analyze Human Behavior and the Structure and Functioning of Society", value: "SBS" },
                { label: "(SNW) Study the Natural World", value: "SNW" },
                { label: "(TECH) Understand Technology", value: "TECH" },
                { label: "(USA) Understand the Political, Economic, Social, and Cultural History of the United States", value: "USA" },
                { label: "(WRT) Write Effectively in English (WRT)", value: "WRT" },
                { label: "(STAS) Examine significant relationships between Science or Technology and the Arts, Humanities, or Social Sciences", value: "STAS" },
                { label: "(EXP+) Experiential Learning", value: "EXP+" },
                { label: "(HFA+) Humanities and Fine Arts", value: "HFA+" },
                { label: "(SBS+) Social and Behavioral Sciences", value: "SBS+" },
                { label: "(STEM+) Science, Technology, Engineering, and Mathematics", value: "STEM+" },
                { label: "(CER) Practice and Respect Critical and Ethical Reasoning", value: "CER" },
                { label: "(DIV) Respect Diversity and Foster Inclusiveness (see Note 2 below)", value: "DIV" },
                { label: "(ESI) Evaluate and Synthesize Researched Information", value: "ESI" },
                { label: "(SPK) Speak Effectively before an Audience", value: "SPK" },
                { label: "(WRTD) Write Effectively within One’s Discipline", value: "WRTD" },
            ]
        },
        {
            label: "SBC5: ",
            name: "courses.sbc5",
            type: "select",
            options: [
                "None",
                { label: "(ARTS) Explore and Understand the Fine and Performing Arts", value: "ARTS" },
                { label: "(GLO) Engage Global Issues", value: "GLO" },
                { label: "(HUM) Address Problems using Critical Analysis and the Methods of the Humanities", value: "HUM" },
                { label: "(LANG) Communicate in a Human Language Other than English", value: "LANG" },
                { label: "(QPS) Master Quantitative Problem Solving", value: "QPS" },
                { label: "(SBS)Understand, Observe, and Analyze Human Behavior and the Structure and Functioning of Society", value: "SBS" },
                { label: "(SNW) Study the Natural World", value: "SNW" },
                { label: "(TECH) Understand Technology", value: "TECH" },
                { label: "(USA) Understand the Political, Economic, Social, and Cultural History of the United States", value: "USA" },
                { label: "(WRT) Write Effectively in English (WRT)", value: "WRT" },
                { label: "(STAS) Examine significant relationships between Science or Technology and the Arts, Humanities, or Social Sciences", value: "STAS" },
                { label: "(EXP+) Experiential Learning", value: "EXP+" },
                { label: "(HFA+) Humanities and Fine Arts", value: "HFA+" },
                { label: "(SBS+) Social and Behavioral Sciences", value: "SBS+" },
                { label: "(STEM+) Science, Technology, Engineering, and Mathematics", value: "STEM+" },
                { label: "(CER) Practice and Respect Critical and Ethical Reasoning", value: "CER" },
                { label: "(DIV) Respect Diversity and Foster Inclusiveness (see Note 2 below)", value: "DIV" },
                { label: "(ESI) Evaluate and Synthesize Researched Information", value: "ESI" },
                { label: "(SPK) Speak Effectively before an Audience", value: "SPK" },
                { label: "(WRTD) Write Effectively within One’s Discipline", value: "WRTD" },
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

    $('#admin_courses').on( 'click', 'tbody td:not(:first-child):not(.child)', function (e) {
        editor.bubble( this );
    } );

    var table = $('#admin_courses').DataTable( {
        dom: "Bfrtlip",
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
            { "data": "courses.related_major" },
            { "data": "courses.required" },
            { "data": "courses.elective" },
            { "data": "courses.ahu_required",
                render: function(val) {
                    return val == 1 ? "Yes" : "No";
                }
            },
            { "data": "courses.sbc" },
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
            { extend: "remove", editor: editor },
            'csv', 
            'pdf', 
            'print'
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

    // table
    //     .column(9)
    //     .search( "AMS" )
    //     .draw();
    // table.search( "AMS" ).draw();
    $('#admin_drop_down').on('change', function() {
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
