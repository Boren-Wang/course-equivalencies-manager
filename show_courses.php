<?php 
    session_start();
    if(!isset($_SESSION['user'])){
        header("location: ./login.php");
        exit();
    }
    include("header.php");
?>

<div class="container">
    <h1>Browse Courses</h1>
    <select id="show_drop_down">
        <option value="ALL">Show ALL Courses</option>
        <option value="AMS">Show AMS-related Courses</option>
        <option value="CSE">Show CSE-related Courses</option>
        <option value="PHY">Show PHY-related Courses</option>
    </select>
    <table id="show_courses" class="display table-condensed" cellspacing="0" width="100%">
        <thead>
            <tr>
                <th style="min-width: 10px"></th>
                <th>AHU Course Name</th>
                <th>AHU Course Code</th>
                <th>AHU Course Credits</th>
                <th>SBU Equivalent Name</th>
                <th>SBU Equivalent Code</th>
                <th>SBU Equivalent Credits</th>
                <th>Semester</th>
                <th>SBC</th>
                <th>SBC-2</th>
                <th>Required By</th>
                <th>Serve as an Elective In</th>
            </tr>
        </thead>
    </table>
    <a href="/" class="btn btn-success">Go back</a>
</div>

<script src="./js/show_courses.js"></script>
<?php include("footer.php") ?>