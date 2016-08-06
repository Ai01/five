// ai部分js代码



//为了使已经落子的位置无法在落子所以需要确定棋盘状况，用二维数组表示棋盘
var chessBoard = [];
for (var i = 0; i < 15; i++) {
    chessBoard[i] = [];
    for (var j = 0; j < 15; j++) {
        chessBoard[i][j] = 0;
    }
};
//me用来确定黑白棋子
var me = true;
//over表示这局棋是否结束
var over = false;
//定义赢法数组wins是一个三维数组，前两维表示棋盘，后一维表示赢法
var wins = [];
for (var i = 0; i < 15; i++) {
    wins[i] = [];
    for (var j = 0; j < 15; j++) {
        wins[i][j] = [];
    }
}
//定义count作为赢法数组的索引，存在第三维
var count = 0;
//为赢法数组wins填入值（遍历出所有赢法）
//所有的横线的赢法
for (var i = 0; i < 15; i++) {
    for (var j = 0; j < 11; j++) {
        for (var k = 0; k < 5; k++) {
            wins[i][j + k][count] = true;
        }
        count++;
    }
}
//所有的竖线的赢法
for (var i = 0; i < 11; i++) {
    for (var j = 0; j < 15; j++) {
        for (var k = 0; k < 5; k++) {
            wins[i + k][j][count] = true;
        }
        count++;
    }
}
//所有的斜线赢法
for (var i = 0; i < 11; i++) {
    for (var j = 0; j < 11; j++) {
        for (var k = 0; k < 5; k++) {
            wins[i + k][j + k][count] = true;
        }
        count++;
    }
}
//所有的反斜线赢法
for (var i = 0; i < 11; i++) {
    for (var j = 14; j > 3; j--) {
        for (var k = 0; k < 5; k++) {
            wins[i + k][j - k][count] = true;
        }
        count++;
    }
}


//定义赢法统计数组,分为人的统计数组和计算机的统计数组
var myWin = [];
var computerWin = [];
//对数组进行初始化
for (var i = 0; i < count; i++) {
    myWin[i] = 0;
    computerWin[i] = 0;
}



//实现点击落子,当落子后对赢法数组进行改变
chess.onclick = function(e) {
    //判断棋是否结束了来决定是否可以继续落子
    if (over) {
        return;
    }
    //只有在我方下棋时才有效
    if (!me) {
        return;
    }
    var x = e.offsetX;
    var y = e.offsetY;
    var i = Math.floor(x / 30);
    var j = Math.floor(y / 30);
    if (chessBoard[i][j] === 0) {
        drawChessman(i, j, me);
        //如果是黑棋则记录为1
        chessBoard[i][j] = 1;
        //根据落子点，对所有的赢法进行遍历，当这种赢法在此处上是有点存在的时候，为这种赢法的统计数组加1可能
        for (var k = 0; k < count; k++) {
            if (wins[i][j][k]) {
                //当落子点有了一方的点时，另一方需要这处的赢法就不可能实现了，设置为异常值6
                myWin[k]++;
                computerWin[k] = 6;
                if (myWin[k] === 5) {
                    window.alert("你赢了");
                    over = true;
                }
            }
        }
        if (!over) {
            //交替下棋
            me = !me;
            //落子后进行判断，如果还没有结束就调用computerai函数
            computerAi();
        }
    }
};



function computerAi() {
    //定义三个值用来保存最高分的点和该点的坐标
    var max = 0;
    var u = 0,
        v = 0;
    //定义两个二维数组用来保存每个空缺的点的得分（针对我方和计算机）
    var myScore = [];
    var computerScore = [];
    for (var i = 0; i < 15; i++) {
        myScore[i] = [];
        computerScore[i] = [];
        for (var j = 0; j < 15; j++) {
            myScore[i][j] = 0;
            computerScore[i][j] = 0;
        }
    }
    //开始遍历整个棋盘
    for (var i = 0; i < 15; i++) {
        for (var j = 0; j < 15; j++) {
            //如果这个点是空闲的对这个点的得分进行计算
            if (chessBoard[i][j] === 0) {
                for (var k = 0; k < count; k++) {
                    //在这个点如果有一种赢法，然后就根据这种赢法的目前成功程度来给这个点打分
                    if (wins[i][j][k]) {
                        //这个点对这种赢法的我方当前的分
                        if (myWin[k] === 1) {
                            myScore[i][j] += 200;
                        } else if (myWin[k] === 2) {
                            myScore[i][j] += 400;
                        } else if (myWin[k] === 3) {
                            myScore[i][j] += 2000;
                        } else if (myWin[k] === 4) {
                            myScore[i][j] += 10000;
                        }
                        //这个点对这种赢法的计算机方当前得分
                        if (computerWin[k] === 1) {
                            computerScore[i][j] += 220;
                        } else if (computerWin[k] === 2) {
                            computerScore[i][j] += 420;
                        } else if (computerWin[k] === 3) {
                            computerScore[i][j] += 2100;
                        } else if (computerWin[k] === 4) {
                            computerScore[i][j] += 20000;
                        }
                    }
                }
                if (myScore[i][j] > max) {
                    max = myScore[i][j];
                    u = i;
                    v = j;
                } else if (myScore[i][j] = max) {
                    if (computerScore[i][j] > computerScore[u][v]) {
                        u = i;
                        v = j;
                    }
                }
                if (computerScore[i][j] > max) {
                    max = computerScore[i][j];
                    u = i;
                    v = j;
                } else if (computerScore[i][j] = max) {
                    if (myScore[i][j] > myScore[u][v]) {
                        u = i;
                        v = j;
                    }
                }
            }
        }
    }

    //落子
    drawChessman(u, v, me);
    chessBoard[u][v] = 2;
    for (var k = 0; k < count; k++) {
        if (wins[u][v][k]) {
            //当落子点有了一方的点时，另一方需要这处的赢法就不可能实现了，设置为异常值6
            computerWin[k]++;
            myWin[k] = 6;
            if (computerWin[k] === 5) {
                window.alert("计算机赢了");
                over = true;
            }
        }
    }
    if (!over) {
        //交替下棋
        me = !me;
    }

}
