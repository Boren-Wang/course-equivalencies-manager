<!-- <div id="index" class="container" style="text-align: center;">
<h1>Course Equivalency Database</h1>
<a href="/admin_courses.php">Click Here to <strong>Administer</strong> Courses</a> -->
<!-- <br>
<a href="/admin_evaluation_requests.php">Click here to <strong>Administer</strong> evaluation requests</a>
<br>
<a href="/admin_courses_evaluation.php">Click here to <strong>Evaluate</strong> courses(General Education)</a>
<br>
<a href="/evaluation.php">Click here to <strong>Evaluate</strong> courses(Major)</a> -->
<?php 
	session_start();

	if(isset($_SESSION['user'])){
		header("location: ./admin_courses.php");
		exit();
	}
?>

<!DOCTYPE html>
<html>
    <head>
        <title>Course Equivalencies Manager</title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
        <!-- <link rel="stylesheet" href="/css/index.css"> -->
        <link rel="stylesheet" href="/css/login.css">
        <script src="https://cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.min.js" type="text/javascript" async></script>
    </head>
    <body>
    
    <div id="landing-header">
        <div class="container" style="position: relative; bottom: 125px;">
            <form class="form-signin" method="post" action="./inc/checklogin.php">
                <h2 class="form-signin-heading" style="color: white">Please log in</h2>
                <label for="username" class="sr-only">User Name</label>
                <input type="text" id="username" class="form-control" name="username" placeholder="User Name" required="" autofocus="">
                <label for="password" class="sr-only">Password</label>
                <input type="password" id="password" class="form-control" name="password" placeholder="Password" required="">
                <button class="btn btn-lg btn-primary btn-block" type="submit">Log in</button>
                <a href="/" class="btn btn-success btn-lg btn-block ">Go back</a>
            </form>
        </div>
    </div>
    
    
    <ul class="slideshow">
      <li></li>
      <li></li>
      <li></li>
      <!-- <li></li>
      <li></li> -->
    </ul>

<?php include("footer.php") ?>