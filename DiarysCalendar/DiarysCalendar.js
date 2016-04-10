var ITEMS_NUM = 10; //需要随机数的总项目数
var GOOD_THINGS_NUM = 3; //务必与HTML保持一致
var BAD_THINGS_NUM = 1; //务必与HTML保持一致
var rand = []; //全局随机数组
var todayThings = [];

//日常事务对象数组
var THINGS = [{
	thing: '吃肉',
	gReason: '会使你精神愉悦，开心一整周',
	bReason: '要么太贵要么不新鲜，反正吃不爽'
}, {
	thing: '研究电子产品',
	gReason: '会有全新的发现',
	bReason: '会被你捣鼓坏的'
}, {
	thing: '做实验',
	gReason: '成功几率很大，试管能洗得很干净',
	bReason: '搞不好要爆炸，需要小心'
}, {
	thing: '唱歌',
	gReason: '歌神附体，抓紧时间录歌',
	bReason: '发挥不出真实水平'
}, {
	thing: '健身',
	gReason: '效果很棒，能突破极限重量',
	bReason: '什么都举不起来，只会浪费时间'
}, {
	thing: '写代码',
	gReason: '一气呵成，写得都要飞起来了',
	bReason: '今天又是世界Bug日'
}, {
	thing: '打羽毛球',
	gReason: '能找回少年时羽毛球男神的光环',
	bReason: '会被虐杀的'
}, {
	thing: '拍照片',
	gReason: '灵感闪现，运气也会很不错',
	bReason: '一张好的也挑不出来'
}, {
	thing: '看电影',
	gReason: '收获颇丰',
	bReason: '看不进去，浪费时间'
}, {
	thing: '学习新技能',
	gReason: '距离全能王更进一步',
	bReason: '会发现自己天赋不佳'
}, {
	thing: '修图',
	gReason: '能修出出色的成品',
	bReason: '选择困难症会强烈发作'
}, {
	thing: '与人聊天',
	gReason: '社交需求将得到很好的满足',
	bReason: '对方根本听不懂你在说什么'
}, ]


var LANGS = ['英语', '日语', '汉语普通话', '兰州方言']
var MUSICS = ['大陆民谣', '游戏原声', '港台流行', '独立音乐', '影视原声',
	'史诗音乐', '台湾民谣', '英式摇滚', '电子乐', '怀旧歌曲', '儿歌',
	'大陆流行', '交响乐', '纯音乐', '指弹吉他曲目', '摇滚乐', '古典音乐',
	'英文流行', '钢琴曲', '小提琴曲', '自己的原创歌曲'
]
var PLANGS = ['Javascript', 'Java', 'C#', 'C++', 'PHP', 'Python', 'Ruby', 'C',
	'MySQL', 'CSS', 'HTML', 'Perl', 'R', '.NET', 'Swift', 'Basic', 'Objective-C'
]


//根据种子seed产生n个随机数
function generateRand(seed, n) {
	var s = seed % 11113;
	for (var i = 0; i < 100 + n; i++) {
		s = s * s;
		s = s % 11113;
		if (i >= 100) {
			rand.push(s / 11113);
		}
	}
}

//从THINGS[]中挑出 GOOD_THINGS_NUM + BAD_THINGS_NUM 件事加入todayThings[]
function pickThings() {
	var thing;
	for (var i = 0; i < GOOD_THINGS_NUM + BAD_THINGS_NUM; i++) {
		thing = THINGS.splice(Math.floor(rand[i] * THINGS.length), 1)[0];
		todayThings.push(thing);
	}

}

//利用rand[index]返回表示XX指数的星星字符串
function getExp(index) {

	var str = '';
	var star = Math.floor(rand[index] * 6);
	for (var i = 0; i < star; i++) {
		str += '&#9733'; //实五角星的HTML代码
	}
	for (i = star; i < 5; i++) {
		str += '&#9734'; //空五角星的HTML代码
	}
	return str;
}

//利用rand[index]返回特定项目字符串
function getLang(index) {
	var n = Math.floor(rand[index] * LANGS.length);
	return LANGS[n];
}

function getMusic(index) {
	var n = Math.floor(rand[index] * MUSICS.length);
	return MUSICS[n];
}

function getPLang(index) {
	var n = Math.floor(rand[index] * PLANGS.length);
	return PLANGS[n];
}

function getSleepTime(index) {

	var addHour = Math.floor(rand[index] * 240 / 60);
	var addMin = Math.floor(rand[index] * 240 % 60);
	var hour = (22 + addHour) % 24;
	var min = addMin;

	var str = hour + ':' + min;
	return str;
}

//渲染HTML页面
function renderHTML() {

	var gThings = document.getElementsByClassName('goodThing');
	var bThings = document.getElementsByClassName('badThing');
	var gReasons = document.getElementsByClassName('gReason');
	var bReasons = document.getElementsByClassName('bReason');


	pickThings();

	for (var i = 0; i < gThings.length; i++) {


		gThings[i].innerHTML = todayThings[i].thing;
		gReasons[i].innerHTML = todayThings[i].gReason;
	}
	for (var j = 0; j < bThings.length; j++) {
		bThings[j].innerHTML = todayThings[j + gThings.length].thing;
		bReasons[j].innerHTML = todayThings[j + gThings.length].bReason;
	}

	var itemStart = GOOD_THINGS_NUM + BAD_THINGS_NUM;

	var studyExp = document.getElementById('studyExp').getElementsByClassName('itemValue')[0];
	var gameExp = document.getElementById('gameExp').getElementsByClassName('itemValue')[0];
	var betterLang = document.getElementById('betterLang').getElementsByClassName('itemValue')[0];
	var betterMusic = document.getElementById('betterMusic').getElementsByClassName('itemValue')[0];
	var betterPLang = document.getElementById('betterPLang').getElementsByClassName('itemValue')[0];
	var betterSleepTime = document.getElementById('betterSleepTime').getElementsByClassName('itemValue')[0];


	studyExp.innerHTML = getExp(itemStart++);
	gameExp.innerHTML = getExp(itemStart++);
	betterLang.innerHTML = getLang(itemStart++);
	betterMusic.innerHTML = getMusic(itemStart++);
	betterPLang.innerHTML = getPLang(itemStart++);
	betterSleepTime.innerHTML = getSleepTime(itemStart++);

}



window.onload = function() {

	var today = new Date();
	var year = today.getFullYear();
	var month = today.getMonth() + 1;
	var date = today.getDate();

	var dateStr = document.getElementById('dateStr');

	dateStr.innerHTML = year + '年' + month + '月' + date + '日';


	var dateseed = year * 10000 + month * 100 + date;
	generateRand(dateseed, ITEMS_NUM);

	renderHTML();

}