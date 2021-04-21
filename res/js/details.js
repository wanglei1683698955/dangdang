function detailsJs(){
	chageprovince();
	inputTips();
	baiduCB = baiduAPI();
}


//头部省份切换
function chageprovince(){
	$("#tools_province").click(function(event){
		if(event.target.nodeName === "LI"){
			$("#header_district").html($(event.target).html());
		}
	});
}


//读取在有效期内的localstorage
function readCookie(){
	
}


//搜索框获取焦点时显示提示文本列表,并给它绑定事件
function inputTips(){
	$("#globalSearch").focus(function(){
		$("#globalSearchUl").show();
	});
	$("#globalSearch").blur(function(){
		setTimeout(function(){
			$("#globalSearchUl").hide();
		},100);
	});
	
}


//搜索框从百度拿数据
function baiduAPI(){
	let oInout = $("#globalSearch")[0];
	let oUl = $("#globalSearchUl")[0];
	let urlHeader = 'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=';
	let urlFooter = '&cb=baiduCB';
	function fn(data) {  //读取数据回调函数
		// console.log(data)
	    oUl.innerHTML = "";
	    if (!data.s) return;
	    for (let i = 0; i < data.s.length; i++) {
	        oUl.innerHTML += '<li>' + data.s[i] + '</li>';
	        // let oli = document.querySelectorAll('li');
	        // for (let i = 0; i < oli.length; i++) {
	        //     oli[i].onclick = function () {
	        //         oInout.value = oli[i].innerHTML;
	        //         oUl.innerHTML = "";
	        //     }
	        // }
	    }
		$("#globalSearchUl li").click(function(event){
			if(event.target.nodeName === "LI"){
				$("#globalSearch").val($(event.target).html());
			}
		});
	}
	
	oInout.onkeyup = function(){     //键盘事件
	    delScript();
	    let jsonP = document.createElement("script");
	    if (oInout.value === "") {
	        oUl.innerHTML = "";
	        return;
	    }
	    let url = urlHeader + oInout.value + urlFooter;
	    jsonP.src = url;
	    document.body.appendChild(jsonP);
	}
	function delScript() {   //删除上一次加的标签
	    let oScript = document.querySelectorAll("script");
	    if (oScript.length <= 3) return;
	    document.body.removeChild(oScript[oScript.length - 1]);
	}
	return fn;
}


