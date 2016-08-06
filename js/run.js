window.addEventListener('load', function() {
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

    drawChessBoard();


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



});
