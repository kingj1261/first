'use strcit';
$(document).ready(function(){
	$(".collapse").toggle(function(){
		$(".menu-item").hide();
		$(".menu:not(.collapse)").animate({width:'20px',display:'none'});
		$(".content").animate({left: "20px"});
	},function(){
		$(".menu-item").show();
		$(".menu:not(.collapse)").animate({width:'180px',display:'block'});
		$(".content").animate({left: "180px"});
	});


	//绑定搜索事件
	$(".searchBtn").click(function(){
		var query=$(".search-input").val();
		var serviceUrl="http://dip.alibaba-inc.com/api/v2/services/schema/mock/6175";
		$.ajax({
			url:serviceUrl,
			dataType:"json",
			jsonp:"jsonpcallback",
			success:function(data){
				alert(data);
			}
		});
	});
});