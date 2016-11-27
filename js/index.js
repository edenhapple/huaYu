/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-11-01 13:18:18
 * @version $Id$
 */
var screenWidth = document.body.clientWidth;
// console.log(screenWidth)
var num = 0;
var picArr =["images/banner1.png","images/banner2.png"];
// $("#banner img").css("width",screenWidth+"px");
// $("#banner").css("width",screenWidth*2+"px")
function lunPic(){
 	num++;
	num=num==2?0:num;
	$("#banner img").attr("src",picArr[num]);
 
};
setInterval(lunPic,2500);

$(".main-list ul li").hover(function(){
	$(this).find(".list-show").fadeIn(500)
},function(){
	$(this).find(".list-show").fadeOut(500)
})
