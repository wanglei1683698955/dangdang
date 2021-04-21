function indexJs(){
	chageprovince();
	artcarStart();
	bookOnlineWrapStart();
	warpTabCk();
	inputTips();
	baiduCB = baiduAPI();
}


//头部省份切换
function chageprovince(){
	$("#tools_province").click(function(event){
		// $(this).show();
		if(event.target.nodeName === "LI"){
			$("#header_district").html($(event.target).html());
			// $(this).hide();
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


//首页顶部无缝轮播图
function artcarStart(){
	let prev = $(".article_field_carousel .artcarL");
	let next = $(".article_field_carousel .artcarR");
	let imgbox = $(".article_field_carousel ul");
	let dotBox = $(".article_field_carousel .artcarDot");
	let n = 0;
	let count = true;
	
	setInterval(function(){
		if(count === false){
			count = true;
		}
		else{
			if(n === imgbox.find("li").length - 1){
				n = 0;
				moveTsR();
			}
			else{
				n++;
				changeImg();
			}
		}
	},6000);
	
	for(let i = 0; i < imgbox.find("li").length; i++){
		let li = $("<li></li>");
		if(i === 0){
			li.addClass("focus")
		}
		dotBox.append(li);
	}
	
	let dotList = dotBox.find("li");
	
	next.click(function(){
		count = false;
		if(n === imgbox.find("li").length - 1){
			n = 0;
			moveTsR();
		}
		else{
			n++;
			changeImg();
		}
	});
	
	prev.click(()=>{
		count = false;
		if(n === 0){
			n = imgbox.find("li").length - 1;
			moveTsL();
		}
		else{
			n--;
			changeImg();
		}
	});
	
	dotList.click(function(){
		count = false;
		n = $(this).index();
		changeImg();
	});
	
	function changeImg(){
		imgbox.animate({
			marginLeft:-(n * 750)
		});
		dotList.removeClass("focus");
		dotList.eq(n).addClass("focus");
	}
	function moveTsL(){
		let imgLi = imgbox.find("li").eq(0).clone(true);
		imgbox.append(imgLi);
		//开启计时器的意义：等待页面中的元素加载完成后操作
		setTimeout(function(){
			imgbox.css({
				marginLeft:-( (imgbox.find("li").length - 1) * 750)
			});
			imgbox.animate({
				marginLeft:-( (imgbox.find("li").length - 2) * 750)
			},function(){
				imgbox.find("li").eq(imgbox.find("li").length - 1).remove();
			});
			dotList.removeClass("focus");
			dotList.eq(n).addClass("focus");
		},20);
	}
	
	function moveTsR(){
		let imgLi = imgbox.find("li").eq(0).clone(true);
		imgbox.append(imgLi);
		imgbox.animate({
			marginLeft:-( (imgbox.find("li").length - 1) * 750)
		},function(){
			imgbox.css({
				marginLeft:0
			});
			imgbox.find("li").eq(imgbox.find("li").length - 1).remove();
		});
		dotList.removeClass("focus");
		dotList.eq(n).addClass("focus");
	}
	
}


//首页底部无限循环无缝轮播图
function bookOnlineWrapStart(){
	let ulbox = $(".book_online .book_onlineWrap");
	let n = 0;
	let count = true;
	
	//鼠标移上动画停止，移下去动画从停止位置继续
	// ulbox.mouseenter(function(){
	// 	count = false;
	// 	ulbox.delay(100).stop(true,false).delay(100);
	// });
	// ulbox.mouseleave(function(){
	// 	count = true;
	// });
	
	n++;
	changeImg();
	
	setInterval(function(){
		if(count === false){
			return;
		}
		else{
			if(n === ulbox.find("ul").length - 1){
				n = 0;
				moveTsR();
			}
			else{
				n++;
				changeImg();
			}
		}
	},16);
	
	function changeImg(){
		ulbox.animate({
			marginLeft:-(n * 750)
		},16000,"linear");
	}
	
	function moveTsR(){
		let newLi = ulbox.find("ul").eq(0).clone(true);
		ulbox.append(newLi);
		ulbox.animate({
			marginLeft:-( (ulbox.find("ul").length - 1) * 750)
		},16000,"linear",function(){
			ulbox.css({
				marginLeft:0
			});
			ulbox.find("ul").eq(ulbox.find("ul").length - 1).remove();
		});
	}
}


//页面右方的tab选项卡
function warpTabCk(){
	let tabList = $(".warpTab li");
	let tabBoxList = $(".book_new_wrap .wrapTabBox")
	tabList.click(function(){
		tabList.removeClass("showTab");
		$(this).addClass("showTab");
		
		tabBoxList.removeClass("ssw");
		tabBoxList.eq($(this).index()).addClass("ssw");
	});
}







