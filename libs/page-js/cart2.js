$(function(){
	var pronum = count();
	$(".cartPrice p").eq(0).html('商品数量总计' +pronum+ '件');		
	var SECOOPRO = "SECOOPRO";
	var strPro = getCookie(SECOOPRO);
	var proArray = strPro.split("&");
	console.log(strPro);
	//console.log(proArray);
	$.ajax({
		url:"sourse/json/goodsList.json",
		type:"get",
		async:true,
		contentType:"json",
		cache:false,
		success:function(_response){
			console.log(_response);
			var SECOOPRO = "SECOOPRO";
			var strPro = getCookie(SECOOPRO);
			var proArray = strPro.split("&");
			function showCart(){
				var goods = _response.goodsList;
				index = 0;
				var goodsidArray = [];
				var indexArray = [];
				//console.log(goods);
				for(var i = 0; i < proArray.length; i ++){
					for(var j = 0 ; j < goods.length; j++){
						if(proArray[i] == goods[j].id){
							goodsidArray.push(proArray[i])
						}
					}	
				}
				//console.log(goodsidArray);
				var res = [];
				goodsidArray.sort();
				for(var i = 0;i<goodsidArray.length;){  
				 	var count = 0;  
				 	for(var j=i;j<goodsidArray.length;j++){  
						  if(goodsidArray[i] == goodsidArray[j]){  
						   	count++;  
						  }  
				 	}  
					 res.push([goodsidArray[i],count]);  
					 i+=count;  
				} 
				//res 二维数维中保存了 值和值的重复数
				
				console.log(res.length);
				//实现购物车分页功能
				var total = res.length;
				var pageCount = 5;
				var pageSize = total%pageCount == 0 ? total/pageCount : Math.ceil(total/pageCount);
				var index = 0;
				var start = 0;
				console.log(pageSize);
				var lastpage = total%pageCount;
				function showAll(){
					var tr = "";
					function generateHTML(){
						tr +=	'<tr class="addChecked" name="cartRow" itemKey="11316967_0" productid="' +goods[j].id+ '" quantity="3" style="display:none;">'
						tr +=	'<td><input class="checkBox" value="17672687_0" name="promotionId0" type="checkbox" checked=""></td>'
						tr +=	'<td width="97" valign="top">'
						tr +=		'<div class="cartPic fl padRight15">'
						tr +=			'<a href="javasript:;" target="_blank">'
						tr +=				'<img src="' +goods[j].imgurl+ '" alt="普拉达" width="80px" height="80px">'
						tr +=			'</a>'
						tr +=		'</div>'
						tr +=	'</td>'
						tr +=	'<td valign="top">'
						tr +=		'<div class="cartNames fl">'
						tr +=			'<p class="namePro">'
						tr +=				'<a href="javascript:;">' +goods[j].productname+ '</a>'
						tr +=			'</p>'
						tr +=		'</div>'
						tr +=		'<div class="cartNames fl" style="overflow: visible;">'
						tr +=			'<p class="namePro pad45 color999"></p>'
						tr +=		'</div>'
						tr +=	'</td>'
						tr +=	'<td valign="top">' +goods[j].sendAddress+ '</td>'
						tr +=	'<td valign="top">'
						tr +=		'<span>￥</span>'
						tr +=		 goods[j].price;
						tr +=	'</td>'
						tr +=	'<td valign="top">'
						tr +=		'<div class="countNum clearfix">'
						tr +=			'<div class="cPlus fl" action="decrease">-</div>';
						tr +=			'<div class="cInput fl">'
						tr +=				'<input class="Num" name="quantity" action="goto" value="' +res[i][1]+ '" type="text">'
						tr +=			'</div>'
						tr +=			'<div class="cMinus fl" action="increase">+</div>'
						tr +=		'</div>'
						tr +=	'</td>'
						tr +=	'<td valign="top">'
						tr +=		'<strong class="colore93">'
						tr +=		'￥' +goods[j].price*res[i][1];
						tr +=		'</strong>'
						tr +=		'<div>返利47库币</div>'
						tr +=	'</td>'
						tr +=	'<td valign="top">'
						tr +=		'<a class="del" href="javascript:;" name="deleteRow">删除</a>'
						tr +=	'</td>'
						tr += '</tr>';				
					}	
					//'<span class="rmb colore93">￥</span>' +
					$('.carTable tbody').html("");
					for(var  i = 0 ;i < total ;i++){  
					 	console.log(i);
						for(var j = 0 ; j < goods.length; j++){
							if(res[i][0] == goods[j].id){
								//console.log("重复次数:"+res[i][1]);
								//console.log(goods[j]);
								generateHTML();
							}
						}	
					} 
					$('.carTable tbody').append(tr);					
				}
				showAll();
				function show(){
					console.log("start:" +start);	
					start = index * pageCount;
					console.log(start+ "start")
					if(lastpage!=0){
						if(index < pageSize - 1){
							for(var  i = start ;i < start + pageCount;i++){  
							 	$('.carTable tbody tr').eq(i).css({"display":"table-row"});	
							} 
							$('.carTable tbody tr:lt('+start+')').css({"display":"none"});	
							$('.carTable tbody tr:gt('+(start+pageCount)+')').css({"display":"none"});
						}else{					
							for(var  i = start ; i < start + lastpage;i++){  
							 	$('.carTable tbody tr').eq(i).css({"display":"table-row"});	
							} 
							$('.carTable tbody tr:lt('+start+')').css({"display":"none"});	
							$('.carTable tbody tr:gt('+(start+pageCount)+')').css({"display":"none"});							
							
						}
					}else{					
						for(var  i = start ;i < start + pageCount;i++){  
							$('.carTable tbody tr').eq(i).css({"display":"table-row"});	
						} 
						$('.carTable tbody tr:lt('+start+')').css({"display":"none"});	
						$('.carTable tbody tr:gt('+(start+pageCount)+')').css({"display":"none"});						
					}

				}
				show();
				var cart_page = $('<div class="cart_page"></div>');
				(function pageList(){
					$('.cartSlist').append(cart_page);
					for(var i = 0; i < pageSize; i ++){
						var a = $('<a href="javascript:void(0);"></a>');
						a.html(i+1);
						cart_page.append(a);
						if(i == 0){
							a.addClass('on');
						}
					}
					var next = $('<a class="page_next" href="javascript:void(0);"></a>');
					next.html("下一页");
					cart_page.append(next);
				})();
				//点击事件
				$('.cart_page').on('click','a',function(){
					if(!$(this).is('.page_next')){
							console.log("不是下一页");
							$(this).addClass('on').siblings().removeClass('on');
							index = $(this).html()-1;
							console.log(index);
							show();
					}else{
						$(this).addClass('on').siblings().removeClass('on');
	           			index++;
	           			console.log("下一页");
	           			if(index >= pageSize - 1){
	           				index = pageSize - 1;
	           			}
	           			$('.cart_page a').eq(index).addClass('on');
	           			console.log(index);
	           			show();
					}
				})
			}
			showCart();
			//商品结算总额 和 商品小计
			//加 减商品数量
			function showList(pronum,totalprice){
				$(".cartPrice p").eq(0).html('商品数量总计' +pronum+ '件');
				$('.totalPriceBottom').find('strong').text(totalprice+'.00')
			}
			
			//点击减号
			$('.totalPriceBottom').find('strong').text(totalprice+'.00')
			$('.countNum .cPlus').click(function(){
				var totalprice = 0;
				var total = 0;
				$('.carTable td input[type="checkbox"]').each(function(){	
					if($(this).is(":checked")){
						console.log($(this));
						var tdtext = $(this).parent().parent().find('td').eq(-2).find('strong').text().replace(/￥/,"");
						var price = parseInt(tdtext);
						totalprice += price;
						total += parseInt($(this).parent().parent().find('td').eq(-3).find('.Num').val());
					}	
				})		
				console.log("209totalPrice"+totalprice);
				console.log("209totalPrice" +total);
				$('.totalPriceBottom').find('strong').text(totalprice+'.00')
				var num = parseInt($(this).next().find('.Num').val());
				var oneprice = $(this).parent().parent().prev().text();
				var oprice = oneprice.replace(/￥/,"");
				var unitprice = parseInt(oprice)
				var price = 0;				
				var total = 0;
				var totalPrice = 0;
				num--;
				if(num <= 1){
					$(this).next().find('.Num').val(1);
					price = 1 * unitprice;
				}else{
					$(this).next().find('.Num').val(num);
					num = parseInt($(this).next().find('.Num').val());
					price = num * unitprice;
				}
				console.log(price);
				var str =  '<strong class="colore93"><span class="rmb colore93">￥</span>' +price+ '</strong><div>返利47库币</div>'
				$(this).parent().parent().next().html(str);
				
				//把数量存到cookie
				var SECOOPRO = "SECOOPRO";
				var strPro = getCookie(SECOOPRO);	
				var productid = $(this).parent().parent().parent().attr("productid");
				var newstr = strPro.replace(new RegExp("&"+productid,"g"),"");
				var value = parseInt($(this).next().find('.Num').val());
				var addstr = null;
				var Arr = [];
				for(var i = 0; i < value; i ++){
					Arr.push(productid);
				}
				addstr = "&" + Arr.join("&");
				console.log("value="+value);
				console.log("addstr=" + addstr);
				newstr = newstr + addstr;
				removeCookie(SECOOPRO);
				var d = new Date();
				d.setDate(d.getDate()+7);
				setCookie(SECOOPRO,newstr,d);
				var pronum = count();
				$(".cartPrice p").eq(0).html('商品数量总计' +pronum+ '件');				
			})
			
			//点击加号
			$('.countNum .cMinus').click(function(){
				var totalprice = 0;
				var total = 0;
				$('.carTable td input[type="checkbox"]').each(function(){	
					if($(this).is(":checked")){
						console.log($(this));
						var tdtext = $(this).parent().parent().find('td').eq(-2).find('strong').text().replace(/￥/,"");
						var price = parseInt(tdtext);
						totalprice += price;
						total += parseInt($(this).parent().parent().find('td').eq(-3).find('.Num').val());
					}	
				})		
				console.log("253totalPrice"+totalprice);
				console.log('253totalPrice' +total);
				$('.totalPriceBottom').find('strong').text(totalprice+'.00')
				var num = parseInt($(this).prev().find('.Num').val());
				var oneprice = $(this).parent().parent().prev().text();
				var oprice = oneprice.replace(/￥/,"");
				var unitprice = parseInt(oprice);
				var price = 0;				
				num++;	
				if(num >= 10){
					$(this).prev().find('.Num').val(10);
					price = 10 * unitprice;
				}else{
					$(this).prev().find('.Num').val(num);
					num = parseInt($(this).prev().find('.Num').val());
					price = num * unitprice;
				}		
				
				var str =  '<strong class="colore93"><span class="rmb colore93">￥</span>' +price+ '</strong><div>返利47库币</div>'
				$(this).parent().parent().next().html(str);
				
				//把数量存到cookie
				var SECOOPRO = "SECOOPRO";
				var strPro = getCookie(SECOOPRO);	
				var productid = $(this).parent().parent().parent().attr("productid");
				var newstr = strPro.replace(new RegExp("&"+productid,"g"),"");
				var value = parseInt($(this).prev().find('.Num').val());
				var addstr = null;
				var Arr = [];
				for(var i = 0; i < value; i ++){
					Arr.push(productid);
				}
				addstr = "&" + Arr.join("&");
				console.log("value="+value);
				console.log("addstr=" + addstr);
				newstr = newstr + addstr;
				removeCookie(SECOOPRO);
				var d = new Date();
				d.setDate(d.getDate()+7);
				setCookie(SECOOPRO,newstr,d);
				var pronum = count();
				$(".cartPrice p").eq(0).html('商品数量总计' +pronum+ '件');
			})
			
			//点击数量输入框
			$('.countNum .Num').blur(function(){
				var totalprice = 0;
				var total = 0;
				$('.carTable td input[type="checkbox"]').each(function(){	
					if($(this).is(":checked")){
						console.log($(this));
						var tdtext = $(this).parent().parent().find('td').eq(-2).find('strong').text().replace(/￥/,"");
						var price = parseInt(tdtext);
						totalprice += price;
						total += parseInt($(this).parent().parent().find('td').eq(-3).find('.Num').val());
					}	
				})		
				console.log("290totalPrice"+totalprice);
				//把总价格写到清单
				$('.totalPriceBottom').find('strong').text(totalprice+'.00')
				var num = parseInt($(this).val());
				var oneprice = $(this).parent().parent().parent().prev().text();
				var oprice = oneprice.replace(/￥/,"");
				var unitprice = parseInt(oprice);
				if(!(num>1||num<10)){
					$(this).val(1);
					price = 1 * unitprice;
				}else{
					$(this).val(num);
					num = parseInt($(this).val());
					price = num * unitprice;
				}
				var str =  '<strong class="colore93"><span class="rmb colore93">￥</span>' +price+ '</strong><div>返利47库币</div>'
				$(this).parent().parent().parent().next().html(str);
				
				//把数量存到cookie
				var SECOOPRO = "SECOOPRO";
				var strPro = getCookie(SECOOPRO);	
				var productid = $(this).parent().parent().parent().parent().attr("productid");
				var newstr = strPro.replace(new RegExp("&"+productid,"g"),"");
				var value = parseInt($(this).val());
				var addstr = null;
				var Arr = [];
				for(var i = 0; i < value; i ++){
					Arr.push(productid);
				}
				addstr = "&"+Arr.join("&");
				console.log("value="+value);
				console.log("addstr=" + addstr);
				newstr = newstr + addstr;
				removeCookie(SECOOPRO);
				var d = new Date();
				d.setDate(d.getDate()+7);
				setCookie(SECOOPRO,newstr,d);
				var pronum = count();
				$(".cartPrice p").eq(0).html('商品数量总计' +pronum+ '件');				
			})
			
			//checkbox 样式
			$('.carTable td input[type="checkbox"]').click(function(){
				if($(this).is(':checked')){
					console.log("is");
					$(this).parent().parent().addClass('addChecked');
					$('#choseAll[type="checkbox"],#choseAllBtn[type="checkbox"]').prop("checked",false);
				}else{
					console.log("not");
					$(this).parent().parent().removeClass('addChecked');
					$('#choseAll[type="checkbox"],#choseAllBtn[type="checkbox"]').prop("checked",false);
				}
			})
			
			//点击全选
			$('#choseAll[type="checkbox"],#choseAllBtn[type="checkbox"]').click(function(){
				if($(this).is(':checked')){
					$('.carTable td input[type="checkbox"]').prop("checked",true);
					$('.carTable td input[type="checkbox"]').parent().parent().addClass('addChecked');
					var total = 0;
					var totalprice = 0;	
					$('.carTable tbody tr').find('td').each(function(){
						
						var price = parseInt($(this).find('strong').text().replace(/￥/,""));
						console.log(price);
						totalprice += price;
					})
					$('.carTable tbody tr').find('td').each(function(){
						total += parseInt($(this).find('.Num').val());
					})
					console.log("totalAllprice:" + totalprice);
					console.log("totalAll:" + total);
					
				}
			})
			
			//删除勾选购物车商品
			$('.delSp').click(function(){
				var pidArr = [];
				$('.carTable td input[type="checkbox"]').each(function(){	
					if($(this).is(":checked")){
						$(this).parent().parent().remove();
						var pid = $(this).parent().parent().attr("productid");
						pidArr.push(pid);
						console.log("pid="+pid);
					}	
				})	
				console.log("pidArr="+pidArr.length);
				for(var i = 0; i < pidArr.length; i ++){
					//把数量存到cookie
					var SECOOPRO = "SECOOPRO";
					var strPro = getCookie(SECOOPRO);
					var newstr = strPro.replace(new RegExp("&"+pidArr[i],"g"),"");
					removeCookie(SECOOPRO);
					var d = new Date();
					d.setDate(d.getDate()+7);
					setCookie(SECOOPRO,newstr,d);	
					var pronum = count();
					$(".cartPrice p").eq(0).html('商品数量总计' +pronum+ '件');						
				}
			})
			
			//点击选框按钮
			$('.carTable td input[type="checkbox"]').click(function(){
				var totalprice = 0;
				var total = 0;
				$('.carTable td input[type="checkbox"]').each(function(){	
					if($(this).is(":checked")){
						console.log($(this));
						var tdtext = $(this).parent().parent().find('td').eq(-2).find('strong').text().replace(/￥/,"");
						var price = parseInt(tdtext);
						totalprice += price;
						total += parseInt($(this).parent().parent().find('td').eq(-3).find('.Num').val());
					}	
				})
				$(".cartPrice p").eq(0).html('商品数量总计' +total+ '件');
				$('.totalPriceBottom').find('strong').text(totalprice+'.00');	
			})
			
			//点击选框按钮
			var totalprice = 0;
			$('.carTable td input[type="checkbox"]').each(function(){	
				if($(this).is(":checked")){
					console.log($(this));
					var tdtext = $(this).parent().parent().find('td').eq(-2).find('strong').text().replace(/￥/,"");
					var price = parseInt(tdtext);
					totalprice += price;
				}	
			})
			$('.totalPriceBottom').find('strong').text(totalprice+'.00');
			
			//删除行		
			$('.center .cartSlist .carTable tbody').on('click','.del',function(){
				console.log("删除行");
				var productid ="&" + $(this).parent('td').closest('tr').attr("productid");
				console.log(productid);
				$(this).parent('td').closest('tr').remove();
				var SECOOPRO = "SECOOPRO";
				var strPro = getCookie("SECOOPRO");
				
				var str = strPro.replace(new RegExp(productid,"g"),"");
				console.log(new RegExp(productid));
				console.log(str);
				function deleteProduct(str){
					var prostr = proArray.join("&");
					//更新本地数据
					removeCookie(SECOOPRO);
					var d = new Date();
					d.setDate(d.getDate()+7);
					setCookie(SECOOPRO,str,d);
					var pronum = count();
					$(".cartPrice p").eq(0).html('商品数量总计' +pronum+ '件');						
					function saveandShow(){
						var SECOOPRO = "SECOOPRO";
						var strPro = getCookie(SECOOPRO);
						console.log("strPro:"+strPro)
						var proArray = strPro.split("&");					
						showCart();
					};	
				}				
				deleteProduct(str);
				
				Nullcart();
			})
	
			/*当购物车有商品时 nullcart 隐藏*/
			function Nullcart(){
				console.log("Nullcart");
				if(typeof $('.carTable tbody tr') == undefined){
					$('.nullBox').css({"display":"block"});
					$('.center').html("");
				}else{
					$('.nullBox').css({"display":"none"});
				}				
			}
			Nullcart();		
			//记录商品数量 计算商品价格
		}
		
	})	
})


