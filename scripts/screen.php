<?php
header('Content-Type: application/json');
header("Cache-Control: no-cache, must-revalidate");
header("Expires: Fri, 30 Oct 2020 00:00:00 GMT"); // Date in the past
header("Access-Control-Allow-Origin: *");

$enable = $_GET["enable"];

if ($enable == 'on') {
	shell_exec("sudo /root/screen.sh on");
} else if ($enable == 'off') {
	shell_exec("sudo /root/screen.sh off");
}

?>{
	"success": true
}