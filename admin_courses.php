<?php include("header.php") ?>

<div class="container">
    <h1>Courses</h1>
    <select id="drop_down" style="bottom: 10px;">
        <option value="ALL">Administer ALL Courses</option>
        <option value="AMS">Administer AMS-related Courses</option>
        <option value="CSE">Administer CSE-related Courses</option>
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
                <th>SBC</th>
                <th>SBC-2</th>
                <th>Required By</th>
                <th>Serve as an Elective In</th>
            </tr>
        </thead>
    </table>
    <a href="/" class="btn btn-success">go back</a>
</div>

<script src="./js/admin_courses.js"></script>
<?php include("footer.php") ?>