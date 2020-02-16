<?php 
    include("header.php");
    include("navbar_show.php");
?>

<div class="container">
    <h1>Browse Courses</h1>
    <select id="show_drop_down">
        <option value="ALL">Show ALL Courses</option>
        <option value="AMS">Show AMS-related Courses</option>
        <option value="ISE">Show ISE-related Courses</option>
        <option value="PHY">Show PHY-related Courses</option>
    </select>
    <table id="show_courses" class="display table-condensed" cellspacing="0" width="100%">
        <thead>
            <tr>
                <th style="min-width: 10px"></th>
                <th>AHU Course Name</th>
                <th>AHU Code</th>
                <th>AHU Credits</th>
                <th>SBU Equivalent Name</th>
                <th>SBU Code</th>
                <th>SBU Credits</th>
                <th>Semester</th>
                <th>Related Major</th>
                <th>Major Requirement</th>
                <th>Elective</th>
                <th>AHU Requirement</th>
                <th>SBC</th>
                <!-- <th>SBC2</th> -->
            </tr>
        </thead>
    </table>
    <a href="/" class="btn btn-success">Go back</a>
</div>

<script src="./js/show_courses.js"></script>
<?php include("footer.php") ?>