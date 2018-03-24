window.onload = function () {
	
	handleTimer();
	handleCalendar();
}

window.onscroll = function () {
	
	var scrollTop = document.documentElement.scrollTop;
	if(scrollTop >= 250){
		document.getElementById('calendar').classList.add('moveDown')
		document.getElementById('linkArea').classList.add('moveDown')
	}
}