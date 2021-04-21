<?php
	$conn = mysql_connect("localhost","root","root");
	if(!$conn){
		die("数据库连接失败：".mysql_error());
	}
	
	//2）、选择数据库（找目的地）
	if(!mysql_select_db("uservip",$conn)){
		die("数据库选择失败".mysql_error());
    };
    
?>