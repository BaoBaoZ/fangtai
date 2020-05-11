<?php

header('Content-Type:application/json;charset=UTF-8');

$conn=mysqli_connect('127.0.0.1','root','','fangtai',3306);
$sql="SET NAMES UTF8";
mysqli_query($conn,$sql);

$output=[];




