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
    //棋盘评分数组
    playerScore: [],
    comScore: [],
    //是否为玩家回合
    player: true,
    //是否游戏结束
    end: false,
    // 游戏模式 1-玩家对弈 2-与AI对弈
    mode: 2,
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
        //初始化end
        this.end = false;

        this.renderBoard(ctx);

        canvas.addEventListener('click', function(event) {
            self.takeOneStep(ctx, event);
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
    renderOneStep: function(ctx, x, y) {

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
        if (this.player) {
            ctx.fillStyle = '#333'
            ctx.fill();

            this.board[x][y] = 1;

            //获胜判断
            for (i = 0; i < count; i++) {
                if (wins[x][y][i]) {
                    comWin[i] -= 5;
                    if (++playerWin[i] === 5) {
                        this.end = true;
                        this.alertWin('You win!');
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
                    playerWin[i] -= 5;
                    if (++comWin[i] === 5) {
                        this.end = true;
                        this.alertWin('Computer win!');
                    }
                }
            }
        }
    },
    //玩家下一步棋
    takeOneStep: function(ctx, event) {
        var self = this;

        var p = this.options.BOARD_PADDING,
            cellX = (this.options.BOARD_WIDTH - 2 * this.options.BOARD_PADDING) / 14,
            cellY = (this.options.BOARD_HEIGHT - 2 * this.options.BOARD_PADDING) / 14;

        var x = Math.round((event.offsetX - p) / cellX),
            y = Math.round((event.offsetY - p) / cellY),
            inboard = x >= 0 && x <= 14 && y >= 0 && y <= 14;

        if (inboard && !this.board[x][y] && !this.end && (this.player || this.mode === 1)) {
            this.renderOneStep(ctx, x, y);
            this.player = !this.player;
            if (this.mode === 2) {
                setTimeout(function() {
                    self.computerAI(ctx);
                }, 500 + 1000 * Math.random());
            }
        }
    },
    //将所有赢法加入赢法数组，并根据赢法总计数初始化赢法统计数组
    initWins: function() {

        var wins = this.wins,
            count = this.count,
            playerWin = this.playerWin,
            comWin = this.comWin,
            playerScore = this.playerScore,
            comScore = this.comScore,
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
    },
    computerAI: function(ctx) {
        var wins = this.wins,
            count = this.count,
            comWin = this.comWin,
            board = this.board,
            comScore = this.comScore,
            max = 0,
            maxX, maxY, i, j, k;

        //初始化棋盘评分数组为0
        for (i = 0; i < 15; i++) {
            comScore[i] = [];
            for (j = 0; j < 15; j++) {
                comScore[i][j] = 0;
            }
        }
        for (i = 0; i < 15; i++) {
            for (j = 0; j < 15; j++) {
                if (!board[i][j]) {
                    for (k = 0; k < count; k++) {
                        if (wins[i][j][k]) {
                            switch (comWin[k]) {
                                case 0:
                                    comScore[i][j] += 1
                                    break;
                                case 1:
                                    comScore[i][j] += 10
                                    break;
                                case 2:
                                    comScore[i][j] += 100
                                    break;
                                case 3:
                                    comScore[i][j] += 1000
                                    break;
                                case 4:
                                    comScore[i][j] += 100000
                                    break;
                                case -5:
                                    comScore[i][j] += 5
                                    break;
                                case -10:
                                    comScore[i][j] += 50
                                    break;
                                case -15:
                                    comScore[i][j] += 500
                                    break;
                                case -20:
                                    comScore[i][j] += 10000
                                    break;
                            }
                        }
                    }
                    if (comScore[i][j] > max) {
                        max = comScore[i][j];
                        maxX = i;
                        maxY = j;
                    }
                }
            }
        }
        // 如果棋盘上所有点评分均为0，则已无获胜可能，判定平局
        if (!max) {
            this.alertWin('End in a tie!');
            this.end = true;
        }
        if (!this.end) {
            this.renderOneStep(ctx, maxX, maxY);
            this.player = !this.player;
        }
    },
    alertWin: function(str) {
        var self = this;

        var panel = document.getElementById('winInfo'),
            rBtn = document.getElementById('restartBtn'),
            cBtn = document.getElementById('closeBtn');

        document.getElementById('winMsg').innerHTML = str;
        panel.style.display = 'block';
        rBtn.addEventListener('click', function() {
            panel.style.display = 'none';
            self.play();
        })
        cBtn.addEventListener('click', function() {
            panel.style.display = 'none';
        })
    }
};

window.onload = function() {

    goBang.play();
};
