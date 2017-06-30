$(function(){
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
				function show(){
					console.log("start:" +start);	
					$('.carTable tbody').html("");
					start = index * pageCount;
					console.log(start+ "start")
					if(lastpage!=0){
						if(index < pageSize - 1){
							for(var  i = start ;i < start + pageCount;i++){  
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
						}else{					
							for(var  i = start ; i < start + lastpage;i++){  
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
					}else{					
						for(var  i = start ;i < start + pageCount;i++){  
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
					var tr = "";
					function generateHTML(){
						tr +=	'<tr class="addChecked" name="cartRow" itemKey="11316967_0" productid="' +goods[j].id+ '" quantity="3">'
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
						tr +=			'<span class="rmb colore93">￥</span>' +goods[j].price*res[i][1];
						tr +=		'</strong>'
						tr +=		'<div>返利47库币</div>'
						tr +=	'</td>'
						tr +=	'<td valign="top">'
						tr +=		'<a class="del" href="javascript:;" name="deleteRow">删除</a>'
						tr +=	'</td>'
						tr += '</tr>';				
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
				function showTotalPrice(){
					var goodsNum = $('.carTable tbody tr').length;
					console.log(goodsNum);
					var totalPriceList = "";
					totalPriceList += 	'<div class="cartPrice">'
					totalPriceList +=		'<div class="cartAno">'
					totalPriceList +=			'<div class="ano01 fl">'
					totalPriceList +=				'<input id="choseAll" name="choseAll" checked="" type="checkbox">'
					totalPriceList +=				'<label for="choseAll">全选</label>'
					totalPriceList +=			'</div>'
					totalPriceList +=			'<div class="ano02 fl delSp">'
					totalPriceList +=				'<a href="javascript:;">删除选中商品</a>'
					totalPriceList +=			'</div>'
					totalPriceList +=		'</div>'
					totalPriceList +=		'<p>商品数量总计：' +goodsNum+ '件</p>'
					totalPriceList +=		'<p>包装数量总计：0件</p>'
					totalPriceList +=		'<p>返利货币108库币</p>'
					totalPriceList +=		'<p class="totalPriceBottom">'
					totalPriceList +=			'<span class="rmb"></span>'
					totalPriceList +=			'<strong>21,633.00</strong>'
					totalPriceList +=		'</p>'
					totalPriceList +=		'<p class="clearfix">'
					totalPriceList +=			'<a class="fl a01 marTop_12" href="index.html" target="_blank">继续购物</a>'
					totalPriceList +=			'<a class="fr a02" href="javascript:;">立即结算</a>'
					totalPriceList +=		'</p>'
					totalPriceList +=	'</div>'		
					//totalPriceList.insertAfter($('.cartBox'));
					$('.centerBox').append(totalPriceList);
					console.log($('.cartBox'));
					console.log("showTotal");					
		
				}	
				showTotalPrice();
			}
			showCart();
			//商品结算总额 和 商品小计
			//加 减商品数量
			$('.countNum .cPlus').click(function(){
				var num = parseInt($(this).next().find('.Num').val());
				var total = 0;
				num--;
				if(num <= 1){
					$(this).next().find('.Num').val(1);
					return;
				}
				$(this).next().find('.Num').val(num);
				//console.log($(this));
				$('.Num').each(function(){
					console.log($(this));
					total += parseInt($(this).val());
				})
				console.log(total);
			})
			$('.countNum .cMinus').click(function(){
				var num = parseInt($(this).prev().find('.Num').val());
				var total = 0;
				num++;
				$(this).prev().find('.Num').val(num);
				$('.Num').each(function(){
					console.log($(this));
					total += parseInt($(this).val());
				})		
				console.log(total);
			})
			$('.countNum .Num').blur(function(){
				console.log('blur');
				var total = 0;
				if(typeof parseInt($(this).val()) != Number){
					console.log("not a number");
					$(this).val(1);
				}
				$('.Num').each(function(){
					console.log($(this));
					total += parseInt($(this).val());
				})
			})
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
					$('.center').css({"display":"none"});
				}else{
					$('.nullBox').css({"display":"none"});
					$('.center').css({"display":"block"});
				}				
			}
			Nullcart();
			
			//记录商品数量 计算商品价格
			
		}
		
	})	

	
	
})
