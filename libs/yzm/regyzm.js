window.onload = function() {
	function yzm(){
		var inp = document.getElementById('emailcheckCode');
		var code = document.getElementById('code');
		var c = new KinerCode({
			len: 4, //产生验证码长度
			//指定产生验证码的词典
			chars: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
			question: false, //true 为算数题，并且没有len属性
			copy: false, //不允许复制产生验证码
			bgColor: '#f6779d', //背景颜色
			bgImg: '', //背景图片，与北京颜色选其一
			randomBg: false, //true表示采用随机背景颜色，若为true，bgColor,bgImg会失效
			inputArea: inp, //输入验证码的input
			codeArea: code, //验证码放置的区域
			click2refresh: true, //是否点击刷新验证码
			false2refresh: true, //在填错验证码后是否刷新验证码
			validateEven: "blur", //触发验证的方法，如：click,blur...
			validateFn: function(result, code) { //验证回调函数
				if (result) {
					alert('验证成功');
				} else {

					if (this.opt.question) {
						alert('验证失败:' + code.answer);
					} 
				}
			}
		})					
	}
	yzm();
}