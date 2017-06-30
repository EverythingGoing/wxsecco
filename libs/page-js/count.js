function count(){
	var SECOOPRO = "SECOOPRO";
	var strPro = getCookie(SECOOPRO);
	var proArr = [];
	proArr = strPro.split("&");
	var num = proArr.length-1;
	console.log(num);
	return num;
}
