$(function(){
	//点击加入购物车按钮
    $.ajax({
        url: 'sourse/json/goodsList.json',
        type: 'get',
        async: true,
        //data: { '_': Math.random() },
        contentType: 'json',
        cache: false,
        success: function (_response) {
            var total = _response.goodsList.length;
            var pageCount = _response.pageCount;
            var pageSize = total%pageCount == 0 ? total/pageCount : Math.ceil(total/pageCount);
//          if(total%pageCount != 0){
//          	var pageSize = Math.ceil(total/pageCount);
//          }else{
//          	pageSize = total/pageCount;
//          }
            var lastpage = total%pageCount;
            
            console.log(lastpage);
            var index = 0;
            var start = 0;
           	var ul = $("#productList");
            console.log(total);
            console.log(pageCount);
            console.log(pageSize);
            function show(){
				//展示数据，清除旧的数据，更新新的数据
				ul.html("");
				start = index * pageCount;
				console.log("start:" +start);
                var html = "";
                function generateHTML(){
 					var imgurl = _response.goodsList[i].imgurl;
                	var productname = _response.goodsList[i].productname;
                	var id = _response.goodsList[i].id;
                	var price = _response.goodsList[i].price;
                	var discount = _response.goodsList[i].discount;
                	html += "<li class='active' id='" +id+ "'>";
                	html += "<div class='fpic'>";
                	html += "<a href='detail.html' target='_blank'>";
                	html += "<img src='"+imgurl+"' style='display: inline;width: 240px;height: 240px;'>";
                	html += "</a>";
                	html += "<div class='sol'></div>";
                	html += "</div>";
                	html += "<div class='fLev'></div>";
                	html += "<div class='fName'>"
                	html += "<a href='detail.html' target='_blank'>" +productname+ "</a>"
                	html += "</div>"
                	html += "<div class='fPrice'><p class='fl'><strong><span class='rmb'>￥</span>" +price+ "<span class='zk' style='visibility: hidden;'>" +discount+ "</span></strong></p></div>";
                	html += "<div class='addToCart'>"
                	html += "<span class='addBtn'>加入购物车</span>";
                	html += "</div>";
                	html += "</li> ";                	
                }
                if(lastpage != 0){
	                if(index < pageSize - 1){
		                for(var i = start; i < start + pageCount; i ++){
							generateHTML();
		                }
		                ul.append(html);
	                }else{
		                for(var i = start; i < start + lastpage; i ++){
		 					generateHTML();
		                }
		                ul.append(html);                	
	                }
                }else{
		                for(var i = start; i < start + pageCount; i ++){
		 					generateHTML();
		                }
		                ul.append(html);                	
                }
                               	
            };
            show();
            var btns = $(".goodsListBtn");
            (function pageList(){
				if(btns.find('span').length == 0){
					var next = $('<button></button>');
					next.html("上一页");
					next.addClass("btn1");
					btns.append(next);
					for(var i = 0; i < pageSize; i++){
						var span = $('<span></span>');
						span.html(i+1);
						btns.append(span);
						if(i == 0){
							span.css({"background":"orange"});
						}
					}
					var pre = $('<button></button>');
					pre.html("下一页");
					pre.addClass("btn2");
					btns.append(pre);
				}                	
            })();
            /*点击事件*/
           btns.on('click','span',function(){
           		console.log("clickthis:" + $(this).html());
           		$(this).css({"background":"orange"});
           		$('button,span',btns).not($(this)).css({"background":"#ffbb77"});
           		index = $(this).html() - 1;
           		show();           		
           });
           btns.on('click','button',function(){
           		if($(this).is($('button').eq(0))){
           			$(this).css({"background":"orange"});
           			$('button,span',btns).not($(this)).css({"background":"#ffbb77"});
           			index--;
           			if(index <= -1){
           				index = 0;
           			}
           			console.log("上一页");
           			$('span',btns).eq(index).css({"background":"orange"});
           			show();
           		}
           		if($(this).is($('button').eq(1))){
           			$(this).css({"background":"orange"});
           			$('button,span',btns).not($(this)).css({"background":"#ffbb77"});
           			index++;
           			console.log("下一页");
           			if(index >= pageSize - 1){
           				index = pageSize - 1;
           			}
           			$('span',btns).eq(index).css({"background":"orange"});
           			show();
           		}

           })

           //点击加入购物车
       		$(document).on('click','.addBtn',function(){
				/*保存数据到cookie中*/
				var SECOOPRO = "SECOOPRO";
				var strSECOOP = getCookie(SECOOPRO);
				//proty=id&id&id;proty=id&id&id&id;proty=id&id&id&id
				var proArray = [];
				if(SECOOPRO){
					proArray = strSECOOP.split("&");
				}	
				var proid = $(this).parent().parent().attr("id");
				console.log(strSECOOP);
				console.log(proid);
				function saveProduct(id){
					proArray.push(id);
					var prostr = proArray.join("&");
					//更新本地数据
					removeCookie(SECOOPRO);
					var d = new Date();
					d.setDate(d.getDate()+7);
					setCookie(SECOOPRO,prostr,d);
				}
				saveProduct(proid);	 
				//点击加入购物车成功计算商品总量
           		var pronum = count();
				$("#carNum").html(pronum);				
       		}) 
       		
       		//点击a标签
       		$(document).on('click','a',function(){
       			var proid = $(this).parent().parent().attr("id");
       			var CECOOID = "secooid";
       			var strid = getCookie(SECOOID);
       			if(strid){
       				removeCookie(CECOOID);
       			}
       			var d = new Date();
       			d.setDate(d.getDate()+1);
       			setCookie(CECOOID,proid,d);
       		})

        }
    })  
})
