
export function conversionDate(time) {
	let date = new Date(time);
	let Y = date.getFullYear() + '-';
	let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
	let D = date.getDate() + ' ';
	let h = date.getHours() + ':';
	let m = date.getMinutes() + ':';
	let s = date.getSeconds(); 
	let conversion = Y+M+D+h+m+s;
	return conversion;
}
