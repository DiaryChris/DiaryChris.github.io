var WINDOW_WIDTH = 1000;
var WINDOW_HEIGHT = 400;

var COLOR = '#0a9';
var B_COLORS = ['#e78', '#fe8', '#6fb', '#fa6'];

//Global Variable
var balls = [];
var dispTime = new Date;



function handleTimer() {

	MARGIN_LEFT = Math.floor(WINDOW_WIDTH / 10);
	MARGIN_TOP = Math.floor(WINDOW_HEIGHT / 4);
	RADIUS = Math.floor((WINDOW_WIDTH - 2 * MARGIN_LEFT) / 114);

	var canvas = document.getElementById('canvas');
	var context = canvas.getContext('2d');

	canvas.width = WINDOW_WIDTH;
	canvas.height = WINDOW_HEIGHT;

	setInterval(function() {
		update();
		render(context);
	}, 50);
}



function renderNumber(context, x, y, n, color) {

	context.fillStyle = color;
	for (var i = 0; i < digit[n].length; i++) {
		for (var j = 0; j < digit[n][i].length; j++) {
			if (digit[n][i][j]) {
				context.beginPath();
				context.arc(x + (j * 2 + 1) * RADIUS, y + (i * 2 + 1) * RADIUS, RADIUS - 1, 0, 2 * Math.PI);
				context.closePath();
				context.fill();
			}
		}
	}
}

function renderTime(context, x, y, color) {

	context.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);

	var current = dispTime;
	var hour = current.getHours();
	var min = current.getMinutes();
	var sec = current.getSeconds();

	renderNumber(context, x, y, parseInt(hour / 10), color);
	renderNumber(context, x + 16 * RADIUS, y, parseInt(hour % 10), color);
	renderNumber(context, x + 32 * RADIUS, y, 10, color);
	renderNumber(context, x + 42 * RADIUS, y, parseInt(min / 10), color);
	renderNumber(context, x + 58 * RADIUS, y, parseInt(min % 10), color);
	renderNumber(context, x + 74 * RADIUS, y, 10, color);
	renderNumber(context, x + 84 * RADIUS, y, parseInt(sec / 10), color);
	renderNumber(context, x + 100 * RADIUS, y, parseInt(sec % 10), color);

}

function renderBalls(context) {
	for (var i = 0; i < balls.length; i++) {
		if (balls[i]) {
			context.beginPath();
			context.arc(balls[i].x, balls[i].y, RADIUS - 1, 0, 2 * Math.PI);
			context.closePath();

			context.fillStyle = balls[i].color;
			context.fill();
		}
	}
}

function render(context) {

	renderTime(context, MARGIN_LEFT, MARGIN_TOP, COLOR);
	renderBalls(context);

}

function updateBalls() {
	for (var i = 0; i < balls.length; i++) {
		if (balls[i]) {
			balls[i].x += balls[i].vx;
			balls[i].y += balls[i].vy;

			if (balls[i].y >= WINDOW_HEIGHT - (RADIUS - 1)) {
				balls[i].y = WINDOW_HEIGHT - (RADIUS - 1) //超出画布修正
				balls[i].vy = -balls[i].vy * 0.85; //碰撞损失系数
			} else {
				balls[i].vy += balls[i].g;
			}
		}
	}

	//一种机智的删除不在画面中球的算法
	var count = 0;
	for (var i = 0; i < balls.length; i++) {
		if (balls[i].x > -(RADIUS - 1) && balls[i].x < WINDOW_WIDTH + (RADIUS - 1)) {
			balls[count++] = balls[i];
		}
	}
	while (balls.length > Math.min(count, 500)) {
		balls.pop();
	}
}

function addBalls(x, y, n) {
	for (var i = 0; i < digit[n].length; i++) {
		for (var j = 0; j < digit[n][i].length; j++) {
			if (digit[n][i][j]) {
				var ball = {
					x: x + (j * 2 + 1) * RADIUS,
					y: y + (i * 2 + 1) * RADIUS,
					r: RADIUS - 1,
					color: B_COLORS[Math.floor(Math.random() * B_COLORS.length)],

					vx: Math.pow(-1, Math.floor(Math.random() * 10)) * 4,
					vy: -4 - Math.random() * 6, //y方向初速度
					g: 1.6 //y方向加速度
				}
				balls.push(ball);
			}
		}
	}
}

function update() {

	updateBalls();

	var curTime = new Date;

	var curHour = curTime.getHours();
	var curMin = curTime.getMinutes();
	var curSec = curTime.getSeconds();

	var dispHour = dispTime.getHours();
	var dispMin = dispTime.getMinutes();
	var dispSec = dispTime.getSeconds();

	var x = MARGIN_LEFT;
	var y = MARGIN_TOP;

	if (curSec !== dispSec) {
		if (parseInt(curHour / 10) !== parseInt(dispHour / 10)) {
			addBalls(x, y, parseInt(curHour / 10));
		}
		if (parseInt(curHour % 10) !== parseInt(dispHour % 10)) {
			addBalls(x + 16 * RADIUS, y, parseInt(curHour % 10));
		}
		if (parseInt(curMin / 10) !== parseInt(dispMin / 10)) {
			addBalls(x + 42 * RADIUS, y, parseInt(curMin / 10));
		}
		if (parseInt(curMin % 10) !== parseInt(dispMin % 10)) {
			addBalls(x + 58 * RADIUS, y, parseInt(curMin % 10));
		}
		if (parseInt(curSec / 10) !== parseInt(dispSec / 10)) {
			addBalls(x + 84 * RADIUS, y, parseInt(curSec / 10));
		}
		if (parseInt(curSec % 10) !== parseInt(dispSec % 10)) {
			addBalls(x + 100 * RADIUS, y, parseInt(curSec % 10));
		}

		dispTime = curTime;
	}
}