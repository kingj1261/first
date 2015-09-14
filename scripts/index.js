'use strcit';

/**
 *  产生一个随机数
 *  @param min  		    最小值
 *  @param max 				最大值
 */
function rand(min,max){
	var range = max - min;   
	var random = Math.random();   
	return(min + Math.round(random * random));   
}

/**
 *  根据请求数据渲染组件列表
 *  @param dataList			数据列表
 */
function renderComponents(dataList){
	var dotColors=["dot-green","dot-blue","dot-red"];
	var icons=["icon-register","icon-msgbroker","icon-drm","icon-idc"];
	for(var i=0;i<dataList.length;i++){
		var item=dataList[i];
		item.dotColor=dotColors[rand(0,2)];
		item.icon=icons[rand(0,3)];
	}
	var templateContext={dataList:dataList};
	var tmpl=$.templates("#componentTemplate");
	var html=tmpl(templateContext);
	$("#mainCenter").html(html);
}

/**
 *  产生一个随机数
 *  @param page 			分页数据对象
 */
function renderPageinfos(page){
	var totalPages=page.total/page.pageSize;
	var current=Math.floor(page.current);
	var context={total:page.total,totalPages:totalPages,current:current,pageSize:page.pageSize,targetPage:page.targetPage};

	var maxPageBarCount=5;
	var pages=new Array();
	var start=1;
	var steps=current/maxPageBarCount;
	start=steps==0?1:steps*maxPageBarCount;
	for(var index=start;index<start+maxPageBarCount;++index){
		if(index<=totalPages){
			pages.push({page:index});
		}
	}
	context.pages=pages;
	var tmpl=$.templates("#pageTemplate");
	var html=tmpl(context);
	$(".pagebar").html(html);
}

/**
 *  查询组件
 *  @param query 			查询条件
 *  @param targetPage       目标页
 */
function searchComponents(query,targetPage){
	var serviceUrl="http://dip.alibaba-inc.com/api/v2/services/schema/mock/6175?query="+query+"&page="+targetPage;
	$.getJSON(serviceUrl,function(data){
		if(data.result){
		var dataList=data.data;
		var page=data.pagination;
		page.targetPage=targetPage;

		var pageSize=page.pageSize;
		var currentDataSize=dataList.length;
		var splitIndex=currentDataSize;
		if(currentDataSize>pageSize){
			splitIndex=pageSize;
		}

		renderComponents(dataList.slice(0,splitIndex));
		renderPageinfos(page);
		}else{
			alert('远程服务错误');
		}
	});
}

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
		var targetPage=$("#targetPage").val();
		searchComponents(query,targetPage);
	});

	//分页绑定事件
	$(".page").live("click",function(){
		var query=$(".search-input").val();
		var target=$(this).find("span")[0];
		var targetPage=$(target).text();
		searchComponents(query,targetPage);
	});
});