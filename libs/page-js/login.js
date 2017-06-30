$(function(){
	$("#username").focus(function(){
		$(this).prev().css({"display":"none"});
	})
	$("#username").blur(function(){	
		if($(this).val().length==0){
			$("#error_msg").html("请输入用户名！").css({"display":"block"});
			$(this).prev().css({"display":"block"});
		}else{
			$("#error_msg").css({"display":"none"});
			//$(this).prev().css({"display":"none"});
		}
	})
	$("#userPass").focus(function(){
		$(this).prev().css({"display":"none"});
		if($(this).val().length==0){
			$("#error_msg").css({"display":"block"});
		}else{
			$("#error_msg").css({"display":"none"});
		}		
	})
	$("#userPass").blur(function(){
		if($(this).val().length==0){
			$("#error_msg").html("请输入密码！").css({"display":"block"});
			$(this).prev().css({"display":"block"});
		}else{
			$("#error_msg").css({"display":"none"});
			//$(this).prev().css({"display":"none"});
		}		
	})
	$('#loginButton').click(function(){
		var	SECOOUSER = 'SECOOUSER';
		var user = $('#username').val();
		var pass = $('#userPass').val();	
		var cookie = getCookie(SECOOUSER);
		var teststr = user+":"+pass;
		var cookiearray = [];
		cookiearray = cookie.split("&");
		var has = false;
		for(var i = 0; i < cookiearray.length; i++){
			if(teststr == cookiearray[i]){
				has = true;
				break;
			}
		}
		if(has){
			console.log("登录成功");
			$("#capcode").css({"display":"block"});
			window.open('index.html');
			
			$("#error_msg").html("用户名或密码输入不正确！").css({"display":"none"});
		}else{
			$("#capcode").css({"display":"none"});
			$("#error_msg").html("用户名或密码输入不正确！").css({"display":"block"});
		}
	})
})
