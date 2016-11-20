/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-11-01 10:07:25
 * @version $Id$
 */
 $(".left-list h4").on("click",function(){
 	$(this).parent().find("ul").slideToggle(500)
 }); 

 $(".left-list ul li h5").on("click",function(){
 	$(this).siblings().slideToggle(500);
 	$(this).parent().siblings().find("a").removeClass("acitv");
 	$(this).siblings().removeClass("acitv");
 	$(this).addClass("acitv")
 		   .parent()
 		   .siblings()
 		   .find("h5")
 		   .removeClass("acitv");
 }); 
 $(".left-list ul li a").on("click",function(){
 	$(this).parent().siblings().find("h5").removeClass("acitv");
 	$(this).siblings().removeClass("acitv");
 	$(this).siblings("h5").find("a").removeClass("acitv");
 	$(this).addClass("acitv")
 		   .parent()
 		   .siblings()
 		   .find("a")
 		   .removeClass("acitv");
 }); 

var JsRequest ={
	$ : function(){
		var obj = {};
		
		var url=decodeURI(location.search); //获取url中"?"符后的字串
		obj.theRequest=new Object();
		obj.refresh=function(){
			obj.theRequest=new Object();
			if (url.indexOf("?") != -1) {
				var str = url.substr(1);
				strs = str.split("&");
				
				for (var i = 0; i < strs.length; i++) {
					obj.theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
					
				}
			}
		}
		obj.get=function(name){
			return obj.theRequest[name]; 
		}
		obj.getContextPath=function(){
			var pathName = document.location.pathname;
			var index = pathName.substr(1).indexOf("/");
		    var result = pathName.substr(0,index+1);
		    return result;
		}
		obj.refresh();
		return obj;
	}
	
}
$(function(){
	var reg =JsRequest.$();
	var hrefLoad = reg.get("ko");
	hrefLoad =Number(hrefLoad)-1;
	var indexTitle = $(".left-list ul li h5").parent().eq(hrefLoad);
	indexTitle.find("h5").click();
	var scroll=$(".main-right .right-list").eq(hrefLoad).offset().top;
	scroll-=200;
	$(".main-right").animate({scrollTop:scroll},500);
	// $(".main-right").animate()
})
	
 

