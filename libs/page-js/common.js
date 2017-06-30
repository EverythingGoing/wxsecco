	var common = common || {};		
	common.baseUrl = 'http://10.3.134.31/phoneapp/';
	$(function(){
		(function load(){
			(function eleLoad(){
				$('.header').load('header.html?_=' +Math.random(),function(){
					var pronum = count();
					$("#carNum").html(pronum);					
					var a = location.pathname;
					var exp = /index\.html/;
					console.log(exp.test(a));
					if(exp.test(a)){
						return;
					}else{
						$(".orderDivId").removeClass("orderDivShow");
						$(".orderDivMain").mouseenter(function(){
							$(".orderDivId").addClass("orderDivShow");
						}).mouseleave(function(){
							$(".orderDivId").addClass("orderDivShow");
						})	
						$(".orderDivId").mouseover(function(){
							$(".orderDivId").addClass('orderDivShow');
						}).mouseout(function(){
							$(".orderDivId").removeClass('orderDivShow');
						})
					}
				});
				$('.header2').load('secondHeader.html?=' +Math.random());
				$('.n-footer').load('footer.html?_=' +Math.random(),function(){
					var newblackMask = '<div class="newblackMask"></div>';
					$(newblackMask).insertAfter('.n-footer');
				});
			})();
		})();
		/*添加购物车成功弹出层*/
		(function addSuccess(){
			$(document).on('click','#addCarInfo',function(){
				var newheight = $('body').height();
				$('.love_tips').css({"display":"block"});
				$('.newblackMask').css({'display':'block','height':newheight});
				$('.buy').click(function(){
					$('.love_tips').css({"display":"none"});
					$('.newblackMask').css({'display':'none'});
				})
			})
			$(document).on('click',"#addBindCar",function(){
				console.log("addbindcart");
				$(this).prop("href","cart.html");
			})
			
			//商品列表页点击添加购物车按钮显示遮罩层
			$(document).on('click','.addBtn',function(){
				var newheight = $('body').height();
				$('.love_tips').css({"display":"block"});
				$('.newblackMask').css({'display':'block','height':newheight});
				$('.buy').click(function(){
					$('.love_tips').css({"display":"none"});
					$('.newblackMask').css({'display':'none'});
				})	
				$('.toCart').click(function(){
					console.log("addbindcart");
					$(this).prop({"href":"cart.html","target":"_blank"});	
					$('.love_tips').css({"display":"none"});
					$('.newblackMask').css({'display':'none'});					
				})
			})
		})();
	})
	/*topBar 鼠标经过*/
	function topBarmouse(){
		$("#Chead_service").mouseenter(function(){
			$(".Chead-service").show();
		}).mouseleave(function(){
			$(".Chead-service").show();
		});
		$(".Chead-service").mouseenter(function(){
			$(".Chead-service").show();
		}).mouseleave(function(){
			$(".Chead-service").hide();
		})
	}
	/*float-list 鼠标经过事件*/
	function floatList(){
		console.log("mouse");
		$("#float-list").on('mouseenter','dt',function(evt){
			console.log($(this));
			/*添加样式*/
			$(this).addClass('active');
			$(this).find('strong a').addClass('active');
			$(this).find('p a').addClass('active');
			/*显示隐藏*/
			$("#float-list dd").not($(this).next()).css("visibility","hidden");
			$(this).next().css("visibility","visible");
		}).on('mouseleave','dt',function(evt){
			$("#float-list dd").not($(this).next()).css("visibility","hidden");			
			$(this).next().css("visibility","visible");
			$(this).removeClass('whitebg');
			$('#float-list dt').removeClass('active');
			$('#float-list dt').find('strong a').removeClass('active');
			$('#float-list dt').find('p a').removeClass('active');
		})
		$("#float-list").on('mouseenter','dd',function(evt){
			$("#float-list dd").not($(this)).css("visibility","hidden");
			$(this).css("visibility","visible");
		}).on('mouseleave','dd',function(evt){
			$("#float-list dd").css("visibility","hidden");
			$("#float-list dt").removeClass('whitebg');
			$(this).prev().removeClass('active');
			$(this).prev().find('strong a').removeClass('active');
			$(this).prev().find('p a').removeClass('active');
		})
	}

