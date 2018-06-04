/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2018-06-01 09:10:37
 * @version $Id$
 */
export function urlParse() {
	let url= window.location.search;
	let obj= {};
	let reg= /[?&][^?&]+=[^?&]+/g;
	let result =url.match(reg);
	if (result) {
		result.forEach((item)=> {
			let temp = item.substring(1).split('=');
			let key = decodeURIComponent(temp[0]);
			let val = decodeURIComponent(temp[1]);
			obj[key] = val; 
		})
		return obj;
	}
	
}
