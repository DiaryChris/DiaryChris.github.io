
$(document).ready(function() {
	var index=1;
	//自定义属性index
	var tabs=$("#panel>ul>li>a");
	for (var i = 0; i < tabs.length; i++) {
		$(tabs[i]).attr('index', i+1);
	};

	//绑定背景改变事件
	$('a[data-toggle="tab"]').on('show.bs.tab', function (e) {
	  switch($(e.target).attr("index"))
	  {
	  	case "1":
	  	$("body").css('background-image', 'url("img/bg001.jpg")');
	  	index=1;
	  	break;
	  	case "2":
	  	$("body").css('background-image', 'url("img/bg002.jpg")');
	  	index=2;
	  	break;
	  	case "3":
	  	$("body").css('background-image', 'url("img/bg003.jpg")');
	  	index=3;
	  	break;
	  }
	});

	//设置定时器
	var timer=null;
	function settimer(){
		timer=setInterval(function() {
			if(index<3)
			{
				index++;
				$('a[index='+index+']').tab('show');
			}
			else
			{
				index=1;
				$('a[index='+index+']').tab('show');
			}
		},2000);
	}
	settimer();

	//鼠标移入移出事件
	$("#panel").on("mouseover",function() {
		clearInterval(timer);
	});
	$("#panel").on("mouseout",function() {
		settimer();
	});

	//按钮LOADING...
	$("#turnothers").on("click",function(){
		$(this).button("loading");
	})
});