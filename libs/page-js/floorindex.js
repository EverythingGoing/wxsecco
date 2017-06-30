function floorMove(obj){
	var $nav = $(obj.nav);
	var $floor = $(obj.floor);
	// 2）滚动
	$(window).on('scroll',function(){
		var scrollTop = $(window).scrollTop();
		// 1>滚动距离大于600，显示楼层导航，小于600时隐藏
		if (scrollTop > obj.floorheight0) {
		    //淡入（显示）
			$nav.fadeIn('slow');//600
		} else {
		    //淡出（隐藏）
			$nav.fadeOut('fast');//200
		}

		// 2>滚动到某一楼层时，高亮显示导航对应楼层
	    // 得到当前楼层的index值
		$floor.each(function (idx, ele) {
		    console.log($(this).offset());
		    if (scrollTop >= $(ele).offset().top && scrollTop < ($(ele).offset().top + $(ele).outerHeight() / 2) - 100) {
				$nav.find(obj.li).not(obj.last).removeClass(obj.active).eq(idx).addClass(obj.active);
				// 退出循环
				$nav.find(obj.li).not(obj.last).find('b').css('display','block').eq(idx).css('display','none');
				return false;
			}
		});
	});
	
	// 3）点击楼层导航，跳转到相应楼层
	$nav.on('click',obj.li,function(){
		var index = $(this).index();
		$nav.find(obj.li).not(obj.last).removeClass(obj.active).eq(index).addClass(obj.active);
		//$nav.find(obj.li).not(obj.last).find('.fs').eq(index).css('display','none');	
		// 退出循环		
		var top;
		if($(this).hasClass(obj.last)){
			top = 0;
		}else{
			top = $floor.eq(index).offset().top;
		
		}
		// $(window).scrollTop(top);
		$('html,body').animate({scrollTop:top});
	});		
	//鼠标移动到相应的楼层，楼层样式相应的改变
	$nav.on('mouseenter',obj.li,function(){
		var index = $(this).index();
		$(this).find('.fs').css('display','none');
	}).on('mouseleave',obj.li,function(){
		var index = $(this).index();
		$(this).find('.fs').css('display','block');
	})
}