<?php
$conn = mysqli_connect("localhost", "root", "", "bot") or die("Database Error");

$getMesg = mysqli_real_escape_string($conn, $_POST['text']);

$checkData = "SELECT replies FROM chatbot WHERE queries LIKE '%$getMesg%'";

$runQuery = mysqli_query($conn, $checkData) or die("Error");

if (mysqli_num_rows($runQuery) > 0) {
    $fetchData = mysqli_fetch_assoc($runQuery);
    $reply = $fetchData['replies'];
    echo $reply;
} else {
    echo "Sorry, I am not able to understand! Please elaborate on your query.";
}
?>
