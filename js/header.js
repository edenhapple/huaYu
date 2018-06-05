/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-11-03 09:30:14
 * @version $Id$
 */
$(function(){

	var urlstr = location.href;
	var urlstatus=false;
	$("#nav ul li a").each(function () {
		if ((urlstr).indexOf($(this).attr('href')) > -1&&$(this).attr('href')!="") {
			$(this).addClass('cur'); 
			urlstatus = true;
		} else {
		 	$(this).removeClass('cur');
		}
	});
	  
	if (!urlstatus) {
		$("#nav ul li a").eq(0).addClass('cur'); 
	}  
	// $('#nav li a').each(function(){  
 //        if($(this).attr('href')==String(window.location))  
 //            $(this).addClass('cur');  
 //    });  
 
});
