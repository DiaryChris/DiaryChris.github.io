window.onload=function()
{
	var btn=document.getElementById('btn_top');
	var clientHeight=document.documentElement.clientHeight;
	window.onscroll=function()
	{
		var osTop=document.documentElement.scrollTop||document.body.scrollTop;
		if (osTop>=clientHeight) 
		{
			btn.style.display="block";
		}
		else
		{
			btn.style.display="none";
		}
	}

	btn.onclick=function()
	{		
		var timer=setInterval(function(){
			var osTop=document.documentElement.scrollTop||document.body.scrollTop;
			var speed=osTop/4;
			document.documentElement.scrollTop=document.body.scrollTop-=speed;
			if(osTop==0){
			clearInterval(timer);
			}
		},30);	
	}
}
