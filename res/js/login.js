let cookie = {
	// 写入/修改cookie
	set(key,value,day){
		let d = new Date();
		d.setDate(d.getDate() + day)
		document.cookie = key + "=" + value + ";expires="+d;
	},
	// 读取cookie
	get(key){
		let arr = document.cookie.split("; ")
		var result = {}
		arr.forEach(item=>{
			let key = item.split("=")[0];
			let value = item.split("=")[1];
			result[key]=value;
		})
		return key?result[key]:result;
	},
	// 删除cookie
	remove(key){
		if(this.get(key)){
			document.cookie = key + "=18;expires=" + new Date('1999-09-09');
			return true;
		}
		else{
			return false;
		}
	}
}


function loginJs(){
	//检测有效期内的cookie存值
	if(cookie.get("bzbzbz") && cookie.get("hmhmhm")){
		$("#username").val(cookie.get("bzbzbz")),$("#userpass").val(cookie.get("hmhmhm"));
	}
	cheakText();
	$("#wrap_dlButton").click(function(){
		if( !($("#username").val() && $("#userpass").val()) ){
			$("#wrap_text")[0].className = "red";
			$("#wrap_text").html("亲,输入为空!");
			return;
		}
		userDLAjax();
	});
	
}

//记住密码复选框文字功能
function cheakText(){
	changeSpan();
	$("#wrap_check").click(function(){
		changeSpan();
	});
}


//根据记住密码的状态改变页面文字
function changeSpan(){
	let text = $("#wrap_check_text");
	if(readCheck()){
		text.html("请勿在公共电脑上勾选");
	}
	else{
		text.html("勾选后七天内免输入");
	}
}

//读取页面中记住密码的状态
function readCheck(){
	return $("#wrap_check")[0].checked;
}


//发送post请求查询账号密码，根据返回值改变页面文字显示
//登录成功后，执行保存cookie与localStorage(未实现)
function userDLAjax(){
	let username = $("#username").val();
	let userpass = $("#userpass").val()
	$.post(
		"http://10.35.161.3/BCT/dangdang/goodsAndShoppingCart/login.php",
		{
			"username":username,
			"userpass":userpass
		},
		function(data){
			if(data === "success"){
				$("#wrap_text")[0].className = "green";
				$("#wrap_text").html("亲,登录成功啦!2秒后自动跳转到首页");
				//保存cookie：
				if(readCheck()){
					cookie.set("bzbzbz",username,7);
					cookie.set("hmhmhm",userpass,7);
				}
				setTimeout(()=>{
					$("#wrap_text").html("亲,登录成功啦!1秒后自动跳转到首页");
				},1000);
				setTimeout(()=>{
					location.href="index.html";
				},2000);
			}else if(data === "fail"){
				$("#wrap_text")[0].className = "red";
				$("#wrap_text").html("亲,不好意思,用户名或者密码错误!");
			}else{
				$("#wrap_text")[0].className = "red";
				$("#wrap_text").html("亲,不好意思,服务器出错了!");
			}
		}
	);
}


//读取有效期内的cookie
function DDreadCookie(){
	
}


//保存7天有效期的cookie
function DDsaveCookie(){
	
}
