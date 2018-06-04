/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2018-06-01 14:21:55
 * @version $Id$
 */
export function setStorage(id,key,val) {
	let seller = localStorage.__seller__;
	if (!seller) {
		seller={};
		seller[id]={};
	}else{
		seller=JSON.parse(seller);
		if(!seller[id]){
			seller[id]={};
		}
	}
	seller[id][key]=val;
	window.localStorage.__seller__=JSON.stringify(seller);
}
export function getStorage(id,key,def) {
	let seller = window.localStorage.__seller__;
	if (!seller) {
		return def
	} 
	seller=JSON.parse(seller)[id];
	if (!seller) {
		return def
	} 
	let get = seller[key];
	return get || def;
}