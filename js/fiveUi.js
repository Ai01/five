// ui部分js代码
//canvas画布
var chess = document.getElementById("chess");
var context = chess.getContext("2d");

//画棋盘函数
function drawChessBoard() {
    for (var i = 0; i < 15; i++) {
        context.strokeStyle = "#BFBFBF";
        //竖线
        context.moveTo(15 + i * 30, 15);
        context.lineTo(15 + i * 30, 435);
        context.stroke();
        //横线
        context.moveTo(15, 15 + i * 30);
        context.lineTo(435, 15 + i * 30);
        context.stroke();
    }
};

//画棋子函数
function drawChessman(i, j, me) {
    context.beginPath();
    context.arc(15 + i * 30, 15 + j * 30, 13, 0, 2 * Math.PI, true);
    context.closePath();
    //让棋子中间显示有光泽，其实就是渐变色
    var gradient = context.createRadialGradient(15 + i * 30 + 2, 15 + j * 30 - 2, 13, 15 + i * 30 + 2, 15 + j * 30 - 2, 0);
    //黑白不同的颜色
    if (me) {
        gradient.addColorStop(0, "#0A0A0A");
        gradient.addColorStop(1, "#636766");
    } else {
        gradient.addColorStop(0, "#D1D1D1");
        gradient.addColorStop(1, "#F9F9F9");
    }
    context.fillStyle = gradient;
    context.fill();
};
