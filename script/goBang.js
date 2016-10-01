var goBang = {

    //默认选项
    defaults: {
        BOARD_WIDTH: 400,
        BOARD_HEIGHT: 400,
        BOARD_PADDING: 40,
        PIECE_RADIUS: 9
    },
    //棋盘二维数组 0-未落子 1-player落子 2-com落子
    board: [],
    //赢法三维数组
    wins: [],
    //赢法总计数
    count: 0,
    //赢法统计数组
    playerWin: [],
    comWin: [],
    //是否游戏结束
    end: false,
    //主入口
    play: function(options) {
        var self = this;

        //合并选项与默认选项
        if (options) {
            for (key in this.defaults) {
                this.options[key] = options[key] || this.defaults[key];
            }
        } else {
            this.options = this.defaults;
        }

        //初始化canvas
        var canvas = document.getElementById('goBangCanvas');
        var ctx = canvas.getContext('2d');

        canvas.width = this.options.BOARD_WIDTH;
        canvas.height = this.options.BOARD_HEIGHT;

        //初始化棋盘二维数组
        for (var i = 0; i < 15; i++) {
            this.board[i] = [];
            for (var j = 0; j < 15; j++) {
                this.board[i][j] = 0;
            }
        }
        //初始化赢法数组与赢法统计数组
        this.initWins();

        this.renderBoard(ctx);

        this.player = true;
        canvas.addEventListener('click', function(event) {
            self.takeOneStep(ctx, event, self.player);
        })
    },
    //绘制棋盘
    renderBoard: function(ctx) {

        var p = this.options.BOARD_PADDING,
            w = this.options.BOARD_WIDTH,
            h = this.options.BOARD_HEIGHT;

        ctx.lineWidth = 2;
        ctx.strokeStyle = '#999';
        for (var i = 0; i < 15; i++) {

            // horizontal
            ctx.beginPath();
            ctx.moveTo(p, p + (h - 2 * p) / 14 * i);
            ctx.lineTo(w - p, p + (h - 2 * p) / 14 * i);
            ctx.closePath();
            ctx.stroke();
            // vertical
            ctx.beginPath();
            ctx.moveTo(p + (w - 2 * p) / 14 * i, p);
            ctx.lineTo(p + (w - 2 * p) / 14 * i, h - p);
            ctx.closePath();
            ctx.stroke();
        }
    },
    //绘制一步棋
    renderOneStep: function(ctx, x, y, player) {

        var r = this.options.PIECE_RADIUS,
            p = this.options.BOARD_PADDING,
            cellX = (this.options.BOARD_WIDTH - 2 * this.options.BOARD_PADDING) / 14,
            cellY = (this.options.BOARD_HEIGHT - 2 * this.options.BOARD_PADDING) / 14,
            wins = this.wins,
            count = this.count,
            playerWin = this.playerWin,
            comWin = this.comWin,
            i;

        ctx.beginPath();
        ctx.arc(p + x * cellX, p + y * cellY, r, 0, 2 * Math.PI);
        ctx.closePath();
        if (player) {
            ctx.fillStyle = '#333'
            ctx.fill();

            this.board[x][y] = 1;

            //获胜判断
            for (i = 0; i < count; i++) {
                if (wins[x][y][i]) {
                    comWin[i] = -5;
                    if (++playerWin[i] === 5) {
                        this.end = true;
                        alert('You win!');
                    }
                }
            }
        } else {
            ctx.fillStyle = '#eee'
            ctx.fill();
            ctx.lineWidth = 2;
            ctx.strokeStyle = '#ccc'
            ctx.stroke();

            this.board[x][y] = 2;

            //获胜判断
            for (i = 0; i < count; i++) {
                if (wins[x][y][i]) {
                    playerWin[i] = -5;
                    if (++comWin[i] === 5) {
                        this.end = true;
                        alert('Computer win!');
                    }
                }
            }
        }
    },
    //玩家下一步棋
    takeOneStep: function(ctx, event, player) {

        var p = this.options.BOARD_PADDING,
            cellX = (this.options.BOARD_WIDTH - 2 * this.options.BOARD_PADDING) / 14,
            cellY = (this.options.BOARD_HEIGHT - 2 * this.options.BOARD_PADDING) / 14;

        var x = Math.round((event.offsetX - p) / cellX),
            y = Math.round((event.offsetY - p) / cellY),
            inboard = x >= 0 && x <= 14 && y >= 0 && y <= 14;

        if (inboard && !this.board[x][y] && !this.end) {
            this.renderOneStep(ctx, x, y, player);
            this.player = !this.player;
        }
    },
    //将所有赢法加入赢法数组，并根据赢法总计数初始化赢法统计数组
    initWins: function() {

        var wins = this.wins,
            count = this.count,
            playerWin = this.playerWin,
            comWin = this.comWin,
            i, j, k;

        //初始化赋值，防止报错
        for (i = 0; i < 15; i++) {
            wins[i] = [];
            for (j = 0; j < 15; j++) {
                wins[i][j] = [];
            }
        }

        //竖向
        for (i = 0; i < 15; i++) {
            //每列11种赢法，wins[i][j]为每种赢法起点
            for (j = 0; j < 11; j++) {
                //每种赢法包含5个点，分别为wins[i][j]-wins[i][j+4]
                for (k = 0; k < 5; k++) {
                    wins[i][j + k][count] = true;
                }
                count++;
            }
        }
        //横向
        for (i = 0; i < 15; i++) {
            //每行11种赢法，wins[j][i]为每种赢法起点
            for (j = 0; j < 11; j++) {
                //每种赢法包含5个点，分别为wins[j][i]-wins[j+4][i]
                for (k = 0; k < 5; k++) {
                    wins[j + k][i][count] = true;
                }
                count++;
            }
        }
        //斜向
        for (i = 0; i < 11; i++) {
            //wins[0]-wins[10]列每列从wins[i][4]开始，可能产生赢法，共11种
            for (j = 4; j < 15; j++) {
                //每种赢法包含5个点，分别为wins[i][j]-wins[i+4][j-4]
                for (k = 0; k < 5; k++) {
                    wins[i + k][j - k][count] = true;
                }
                count++;
            }
        }
        //反斜向
        for (i = 0; i < 11; i++) {
            //wins[0]-wins[10]列每列到wins[i][10]为止，可能产生赢法，共11种
            for (j = 0; j < 11; j++) {
                //每种赢法包含5个点，分别为wins[i][j]-wins[i+4][j+4]
                for (k = 0; k < 5; k++) {
                    wins[i + k][j + k][count] = true;
                }
                count++;
            }
        }
        //赢法计数完毕
        this.count = count;
        //初始化赢法统计数组为0
        for (i = 0; i < count; i++) {
            playerWin[i] = 0;
            comWin[i] = 0;
        }
    }

};

window.onload = function() {

    goBang.play();
};
