function signJs(){
	let arr = [0,0,0];
	//注册状态
	let status = false;
	
	$("#username").blur(function(){
		if(isUserName() === undefined){
			$("#usernameTPis").html("");
			arr[0] = 0;
			return;
		}
		if(isUserName()){
			existUserNameAjax();
			// $("#usernameTPis")[0].className = "green";
			// $("#usernameTPis").html("用户名合法");
			// arr[0] = 1;
		}
		else{
			$("#usernameTPis")[0].className = "red";
			$("#usernameTPis").html("用户名不合法，它由数字，字母下划线组成，6-10位");
			arr[0] = 0;
		}
	});
	
	$("#userpass").blur(function(){
		if(isUserPass() === undefined){
			$("#userpassTpis").html("");
			arr[1] = 0;
			return;
		}
		if(isUserPass()){
			$("#userpassTpis")[0].className = "green";
			$("#userpassTpis").html("密码合法");
			arr[1] = 1;
		}
		else{
			$("#userpassTpis")[0].className = "red";
			$("#userpassTpis").html("密码不合法，它由数字，字母下划线组成，6-10位");
			arr[1] = 0;
		}
	});
	
	$("#notapass").blur(function(){
		if(!$(this).val()){
			$("#notapassTpis").html("");
			arr[2] = 0;
			return;
		}
		if($(this).val() === $("#userpass").val()){
			$("#notapassTpis")[0].className = "green";
			$("#notapassTpis").html("密码一致");
			arr[2] = 1;
		}
		else{
			$("#notapassTpis")[0].className = "red";
			$("#notapassTpis").html("密码不一致");
			arr[2] = 0;
		}
	});
	
	
	$("#wrap_zcButton").click(function(){
		let count = true;
		arr.forEach(item=>{
			if(!item)
				count = false;
		});
		if(!count){
			$("#wrap_text")[0].className = "red";
			$("#wrap_text").html("亲！输入有误，请检查！");
			return;
		}
		else{
			// 前端验证完成，向后端发送注册请求
			zcUserAjax();
		}
	});
	
	
	//因为需要操作arr，所以将函数声明放在内部
	function existUserNameAjax(){
		//后端验证用户名是否存在
		$.get("http://10.35.161.3/BCT/dangdang/goodsAndShoppingCart/checkUser.php",{"username":$("#username").val()},function(data){
			if(data === "0" ){
				$("#usernameTPis")[0].className = "red";
				$("#usernameTPis").html("用户名已存在！");
				arr[0] = 0;
			}
			else{
				$("#usernameTPis")[0].className = "green";
				$("#usernameTPis").html("用户名合法");
				arr[0] = 1;
			}
		});
	}
	
	function zcUserAjax(){
		//后端注册
		$.post(
			"http://10.35.161.3/BCT/dangdang/goodsAndShoppingCart/addUser.php",
			{
				"username":$("#username").val(),
				"userpass":$("#userpass").val()
			},
			// $("#wrap_text")[0].className = "red";
			// $("#wrap_text").html("亲！输入有误，请检查！");
			function(data){
				console.log(data)
				if(data === "success"){
					$("#wrap_text")[0].className = "green";
					$("#wrap_text").html("亲,注册成功啦!2秒后自动跳转到登录页");
					setTimeout(()=>{
						$("#wrap_text").html("亲,注册成功啦!1秒后自动跳转到登录页");
					},1000);
					setTimeout(()=>{
						location.href="login.html";
					},2000);
				}else if(data === "fail"){
					$("#wrap_text")[0].className = "red";
					$("#wrap_text").html("亲,不好意思,注册失败!");
				}else{
					$("#wrap_text")[0].className = "red";
					$("#wrap_text").html("亲,不好意思,服务器出问题了!");
				}
			}
		);
		
		
	}
	
	
}


//用户名合法判断
function isUserName(){
	if(!$("#username").val()){
		return;
	}
	// 用户名有数字，字母下划线组成，6-10位
	let reg = /^[a-zA-Z0-9_]{6,10}$/;
	if(!reg.test($("#username").val())){
		return false;
	}
	return true;
}

//密码合法判断
function isUserPass(){
	if(!$("#userpass").val()){
		return;
	}
	// 密码有数字，字母下划线组成，6-10位
	let reg = /^[a-zA-Z0-9_]{6,10}$/;
	if(!reg.test($("#userpass").val())){
		return false;
	}
	return true;
}


// //读取在有效期内的cookie
// function readCookie(){
	
// }

