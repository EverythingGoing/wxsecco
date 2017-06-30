$(function(){
	var check1 = false;
	var check2 = false;
	var check3 = false;
	$('#emailInput').focus();
	$('#emailInput').focus(function(){
		$('.reg_userName').html("请输入手机号！").css({"display":"block"}).removeClass('blur');
	})
	$('#emailInput').blur(function(){
		var rep1 = /.{4,25}/;
		var repP = /^[1-3]\d{10}$/;
		var user = $(this).val().trim();
		if(user.length==0){
			$('.reg_userName').html("请输入用户名！").css({"display":"block"}).addClass('blur');
		}else if(!rep1.test(user)){
			$('.reg_userName').html("用户名长度应为4-25个字符！").css({"display":"block"}).addClass('blur');
		}else if(!repP.test(user)){
			$('.reg_userName').html("请输入正确的手机号！").css({"display":"block"}).addClass('blur');
		}else{
			$('.reg_userName').css({"display":"none"});
			$('.email_show').css({"display":"block"});
			$('.phoneNumberCode').css({"display":"block"});
			check1 = true;
			
		}
	})	
	
	$('#passwordInput').blur(function(){
		var pass = $(this).val().trim();
		var pwdTest = /.{6,16}/;
		if(pass.length==0){
			$('.reg_pass').html("请输入密码！").css({"display":"block"}).addClass('blur');
		}else if(!pwdTest.test(pass)){
			$('.reg_pass').html("密码的长度只能在6-16位之间！").css({"display":"block"}).addClass('blur');
		}else{
			$('.reg_pass').css({"display":"none"});
			check2 = true;
		}
	})
	
	$('#passwordagain').blur(function(){
		var pass = $('#passwordInput').val().trim();
		var passAgain = $('#passwordagain').val().trim();
		if(passAgain.length==0){
			$('.again_pass').html("请输入确认密码！").css({"display":"block"}).addClass('blur');
		}else if(pass!=passAgain){
			$('.again_pass').html("两次输入的不一致，请重新输入！").css({"display":"block"}).addClass('blur');
		}else{
			$('.again_pass').css({"display":"none"});
			check3 = true;
		}
	})
	
	//切换验证码

	//短信验证码
	$("#modileMsg").click(function(){
		var str = "";
		var self = this;
		var dex = 10;
		var timer = "";
		for(var i = 0 ; i < 4; i ++){
			str += parseInt(Math.random()*10);
		}
		console.log(str);
		$("#telphoneNumber").val(str);		
		timer = setInterval(function(){
			console.log("timer");
			dex--;
			$(self).html(dex+"秒后重新获取验证码");
			if(dex <= 0){
				clearInterval(timer);
				
				$(self).html("重新获取验证码");
			}
		},1000)
	})	
	
	//点击立即注册按钮
	$("#indexLogin").click(function(){
		if( !check1 || !check2 || !check3){
			console.log("请输入正确信息");
			return;
		}
		
		var	SECOOUSER = 'SECOOUSER';
		var user = $('#emailInput').val();
		var pass = $('#passwordInput').val();
		var usermsg =  user+ ":" +pass;
		var oldstr = getCookie(SECOOUSER);
		console.log(oldstr);
		var msgstr = oldstr + "&"+usermsg;
		var userarr = [];
		var uName = [];
		if(oldstr){
			userarr	= oldstr.split("&");			
			for(var i = 0; i < userarr.length; i++){
				uName = userarr[i].split(":");
				if(uName[0] == user){
					console.log("该用户名已经注册");
					$('.guibingma').css({"display":"block"});
					return;
				}
			}			
		}
		$('.guibingma').css({"display":"block"}).html("注册成功！").css({'color':'green'});
		removeCookie(SECOOUSER);
		var d = new Date();
		d.setDate(d.getDate()+7);
		setCookie(SECOOUSER,msgstr,d);
	})
})
