/*楼梯js 开始*/
/*
	思路：
		1）获取页面元素
		2）滚动
			1>滚动距离大于600，显示楼层导航，小于600时隐藏
			2>滚动到某一楼层时，高亮显示导航对应楼层
		3）点击楼层导航，跳转到相应楼层
 */
// 1）获取页面元素
$(function(){
	//楼梯	
	floorMove({
		nav:".fsFixedTopContent",//电梯
		floor:".floor",//楼层
		li:"a",//电梯按钮
		active:"active",//按钮样式
		last:"fsbacktotop",//最后一层
		floorheight0:573
	})	
	
	//网站图片除了brand Imgs 之外 鼠标经过透明度都会改变
	function imgShowO(){
		$('img').not('.pro-list img').hover(function(){
			$(this).css({'opacity': '0.8',
				'animation': '.5s',
				'-moz-animation': '.5s',
				'-o-animation': '.5s',
				'-webkit-animatin': '.5s',
				'-ms-animation': '.5s',
				"@keyframe":""
			
			});
		},function(){
			$(this).css({'opacity': '1'});
		})
	}; 
	imgShowO();
/*楼梯js 结束*/
	function slide(){
		var $main = $('#mtsBanner');//轮播的主体
		var $pic = $main.find('.bannerWrap li');//轮播的单页
		var $nav = $main.find('.slide_control');//轮播的页码控制
		var len = $pic.length;
		var index = 0;
		
		var lastindex = 0;
		show();
		
		for(var i = 0; i < len; i++){
			if(i==0){
				$(".mall_dot").addClass('mall_dot_hover');//页码按钮
			}
		}
		
		$nav.on('click','.mall_dot',function(){
			index = $(this).index();
			show();
		});
		
		var timer;
		$main.on('mouseenter',function(){
			clearInterval(timer);
		}).on('mouseleave',function(){
			timer = setInterval(function(){
				index++;
				show();
			},3000);
		}).trigger('mouseleave')
		
		.on('click','.move_right',function(){//轮播的右滑按钮
			index++;
			show();
		}).on('click','.move_left',function(){//轮播的左滑按钮
			index--;
			show();
		});
		function show(){
			reset();
			if(index < 0){
				index = len - 1;
			}else if(index > len - 1){
				index = 0;
			}
			$pic.hide().eq(index).show();
			$pic.eq(index).addClass('on');
			
			$pic.eq(index).addClass('on');
			
			
			$nav.find('.mall_dot').removeClass().eq(index).addClass('mall_dot_hover');
			lastindex = index;
		}
		function reset(){
			$pic.eq(lastindex).find('.mts_big,.mts_small').removeAttr('style');//removeProp(attr);
		}		
	};
	slide();
	
})
//多动画轮播图
/**
 * 
 */