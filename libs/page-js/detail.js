$(function(){
	//遮罩层高度
	//$('.newblackMask').height($('body').height());
	
	//分享小图标显示隐藏
	$("#share").mouseenter(function(){
		$(".bdsharebuttonbox").show();
	}).mouseleave(function(){
		$(".bdsharebuttonbox").show();
	});
	$(".bdsharebuttonbox").mouseenter(function(){
		$(".bdsharebuttonbox").show();
	}).mouseout(function(){
		$(".bdsharebuttonbox").hide();
	})
	
	/*放大镜*/
	$(".move_box").on("mouseover",'a',function(){
		var index = $(this).index();
		var inode = $("<i></i>")
		console.log(index);
		//$(".move_box a").eq(0).removeClass("on").remove(inode);
		$(this).addClass("on").append(inode);
		$("#imgshow dt img").prop("src","sourse/img/detail/de" +(index+1)+ ".JPG");
		$("#imgshow dt img").attr('index',index);
	})
	.on("mouseout",'a',function(){
		var inode = $(".move_box a i");
		$(this).removeClass("on").remove(inode);
		//$(".move_box a").eq(0).addClass("on").add(inode);
	})
	//$("#imgshow dt").on("mouseover",".jqzoom",function(evt){
	$("#imgshow dt").mouseover(function(){	
		var zoomdivsrc = 0;
		if(!$('.jqzoom').attr('index')){
			zoomdivsrc = 1;
			console.log(1111111);
		}else{
			zoomdivsrc = parseInt($('.jqzoom').attr('index'))
		}
		console.log(zoomdivsrc);
		var zoomdiv = '<div class="zoomdiv" style="top: -1px;left: 430px;width: 460px;height: 400px;display: block;">';
			zoomdiv +=		'<div class="boxzoo">';
			zoomdiv +=			'<img src= sourse/img/detail/de' +(zoomdivsrc+1)+ '.JPG>';
			zoomdiv +=		'</div>';
			zoomdiv +='</div>';
		$(zoomdiv).insertAfter("#imgshow dt .jqzoom");
		$(".zoomspan").css({"display":"block"});
	}).mousemove(function(evt){
		var left = evt.clientX - $("#imgshow dt").offset().left - $('.zoomspan').width()/2;
		var top = evt.clientY - $("#imgshow dt").offset().top;
		if(left <= 0){
			left = 0;
		}
		if(left >= $('#imgshow dt').width() - $('.zoomspan').width()){
			left = $('#imgshow dt').width() - $('.zoomspan').width();
		}
		if(top <= 0){
			top = 0;
		}
		if(top >= $('#imgshow dt').height() - $('.zoomspan').height()){
			top = $('#imgshow dt').height() - $('.zoomspan').height();
		}
		$(".boxzoo img").css({"left":-left,"top":-top});
		$(".zoomspan").css({"display":"block","left":left,"top":top});	
	}).mouseout(function(){
		$(".zoomspan").css({"display":"none"});
		$(".zoomdiv").remove();
	})
	
	/*点击了立即抢购按钮*/
	$(document).on('click','#addBindCar,#addCarInfo',function(){
		//alert("点击了立即抢购按钮或者加入购物车按钮");
		/*获取所选商品的id名*/
		var proid = $('input[type="hidden"]').attr('secoopid');
		//var proty = $('input[type="hidden"]').attr('secoopty');
		var SECOOPRO = "SECOOPRO";
		var strSECOOP = getCookie(SECOOPRO);
		console.log(strSECOOP);
		//proty=id&id&id;proty=id&id&id&id;proty=id&id&id&id
		var proArray = [];
		if(SECOOPRO){
			proArray = strSECOOP.split("&");
		}		
		/*保存数据到cookie中*/
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
		
		
		
	})
	/*点击了加入购物车按钮*/
	
	/*商品展示列表固定定位*/
	$(window).scroll(function(){
		//console.log("scroll");
	})	
	/*ajax请求商品评论数据*/
	$.ajax({
		url:"sourse/json/comment.json",
		type:"get",
		async:true,
		currentType:"json",
		cashe:false,
		success:function(_response){
			console.log(_response);
			var total = _response.comment.length;
			console.log(total);
			var pageCount = _response.pageCount;
			var pageSize = total%pageCount==0 ? total/pageCount : Math.ceil(total/pageCount);
			var lastpage = total%pageCount;
			var index = 0;
			var start = 0;
			var showc = $("#comment_show");
			function show(){
				showc.html("");
				function generateHTML(){
					var account = _response.comment[i].account;
					var comment = _response.comment[i].comment;
					var goods = _response.comment[i].goods;
					var img = _response.comment[i].account.img;
					var name = _response.comment[i].account.name;
    				html +=	'<dl>';
    				html +=		'<dt>';
    				html +=			'<p>';
    				html +=				'<img src="' +img+ '" width="50px" height="50px">';
    				html +=			'</p>';
    				html +=			'<p class="name">' +name+ '</p>';
    				html +=		'</dt>';
    				html +=		'<dd>';
    				html +=			'<div class="pl_detail">';
    				html +=				'<div class="d_pf clearfix">';
    				html +=					'<div class="fl start_x">';
    				html +=						'<span class="star4">';
    				html +=							'<em style="width: 100%;"></em>';
    				html +=						'</span>';
    				html +=						'5.0';
    				html +=					'</div>';
    				html +=					'<div class="fr">';
    				html +=						'<span class="pl_client">来自网页评论</span>';
    				html +=						'<i>|</i>';
    				html +=						'同品牌评价';
    				html +=						'<i></i>';
    				html +=						'2016/11/30 17:22:31';
    				html +=					'</div>';
    				html +=				'</div>';
    				html +=				'<div class="d_cont">' +comment+ '</div>';
    				html +=				'<div class="pl_photos">';
    				html +=					'<div class="share_icon comment_share" style="display: none;"></div>';
    				html +=					'<div class="pl_dianzan pl_dianzan1" onclick="dianZan()">';
    				html +=						'<i></i>';
    				html +=						'<span id="praiseCount_324281">(1)</span>';
    				html +=						'<em id="praise_324281" style="display: none;">';
    				html +=							'<span></span>';
    				html +=							'一个评论只能点一次赞哟！';
    				html +=						'</em>';
    				html +=					'</div>';
    				html +=					'<div class="pl_photos_d" style="display: none;">';
    				html +=						'<div class="pl_photos_img">';
    				html +=							'<a class="img_prev" href="javascript:void(0);"><i></i></a>';
    				html +=							'<a class="img_next" href="javascript:void(0);"><i></i></a>';
    				html +=						'</div>';
    				html +=						'<div class="img-box"></div>';
    				html +=						'<div class="pl_photos_t">';
    				html +=							'<a class="img_hide" href="javascript:void(0);">收起</a>';
    				html +=							'|';
    				html +=							'<a class="img_turnleft" href="javascript:void(0);">向左旋转</a>';
    				html +=							'|';
    				html +=							'<a class="img_trunright" href="javascript:void(0);">向右旋转</a>';
    				html +=						'</div>';
    				html +=					'</div>';
    				html +=					'<p class="pl_goodsxx">';
    				html +=						'<a href="javacript:;">' +goods+ '</a>';
    				html +=					'</p>';
    				html +=				'</div>';
    				html +=			'</div>';
    				html +=		'</dd>';
    				html +=	'</dl>';						
				}
				start = index * pageCount;
				console.log("start:"+start);
				var html = "";
				if(lastpage==0){
					for(var i = start; i < start + pageCount; i ++){
						generateHTML();
					}
					showc.append(html);					
				}else{
					if(index < pageSize - 1){
						for(var i = start; i < start + pageCount; i ++){
							generateHTML();					
						}
						showc.append(html);
					}else{
						for(var i = start; i < start + lastpage; i ++){
							generateHTML();							
						}
						showc.append(html);
					}
				}
			}
			show();
			var comment_page = $('<div class="comment_page"></div>');
			(function pageList(){
				$('.dc_c_pl').append(comment_page);
				for(var i = 0; i < pageSize; i ++){
					var a = $('<a href="javascript:void(0);"></a>');
					a.html(i+1);
					comment_page.append(a);
					if(i == 0){
						a.addClass('on');
					}
				}
				var next = $('<a class="page_next" href="javascript:void(0);"></a>');
				next.html("下一页");
				comment_page.append(next);
			})();
			//点击事件
			$('.comment_page').on('click','a',function(){
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
           			$('.comment_page a').eq(index).addClass('on');
           			show();
				}
			})
			

			
			
			
		}		
	})
	//固定定位
	var top1 = $("#firstNav").offset().top;
	$(window).scroll(function(){
		var scroll1 = $(window).scrollTop();
		console.log(scroll1);		
		if(scroll1>=800 && scroll1<=6590){
			$("#firstNav").addClass('onfix');
		}else{
			$("#firstNav").removeClass('onfix');
		}
		if(scroll1>=6590){
			$('.dc_title').addClass('onfix');
		}else{
			$('.dc_title').removeClass('onfix');
		}
	})	
})
//加 减商品数量
function productCarOper(str){
	var num = chechCarOper();
	if(str == 'sub') {
		num--;
		if(num <= 1){
			$('#buyNumVal').val(1);
			return;
		}
		$('#buyNumVal').val(num);
		console.log(num);
	}
	if(str == 'add') {
		num++;
		if(num >= 4){
			$('#buyNumVal').val(4);
			return;
		}		
		$('#buyNumVal').val(num);
		console.log(num);
	}
}
function chechCarOper(){
	var buynum =  parseInt($('#buyNumVal').val());
	if(!(buynum>=1&&buynum<=4)){
		buynum = 1;
		$('#buyNumVal').val(1);
		buynum =  parseInt($('#buyNumVal').val(1))
		return buynum;
	}
	return buynum;
}	
