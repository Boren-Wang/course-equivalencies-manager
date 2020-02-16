<?php 
    session_start();
    if(!isset($_SESSION['user'])){
        header("location: ./login.php");
        exit();
    }
    
    include("header.php");
    include("navbar_admin.php");
?>


<div class="container">
    <h1>Administer Courses</h1>
    <select id="admin_drop_down">
        <option value="ALL">Administer ALL Courses</option>
        <option value="AMS">Administer AMS-related Courses</option>
        <option value="ISE">Administer ISE-related Courses</option>
        <option value="PHY">Administer PHY-related Courses</option>
    </select>
    <table id="admin_courses" class="display table-condensed" cellspacing="0" width="100%">
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
                <th>Related Major</th>
                <th>Major Requirement</th>
                <th>Elective</th>
                <th>AHU Requirement</th>
                <th>SBC</th>
            </tr>
        </thead>
    </table>
    <a href="/" class="btn btn-success">Go back</a>
</div>

<script src="./js/admin_courses.js"></script>
<?php include("footer.php") ?>