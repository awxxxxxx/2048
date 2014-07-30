/**
 *游戏主控制
 *@author:WaterBear
 */

/******游戏的16宫格数组******/

var board = new Array();

/******游戏的分数********/

var score = 0;

/******是否发生碰撞******/

var hasConflicted = new Array();

$(document).ready(function() {
    newgame();
});


/****开始游戏********/

var newgame = function() {

    //初始化16宫格

    init();

    //在随机的两个格子生成数字

    RandomNumber();
    RandomNumber();
    score = 0;
    updateScore(score);
};


/******初始化16宫格******/

var init = function() {
    for(var i = 0; i < 4; ++i){
        for(var j = 0; j < 4; ++j){

            var gridCell = $('#grid-cell-'+i+'-'+j);

            //调用support2048.js文件中的函数

            gridCell.css('top',getPosTop(i,j));
            gridCell.css('left',getPosLeft(i,j));
        }
    }

    //初始化board数组

    for(var i = 0; i < 4; ++i){
        board[i] = new Array();
        hasConflicted[i] = new Array();
        for(var j = 0; j < 4; ++j){
            board[i][j] = 0;
            hasConflicted[i][j] = false;
        }
    }

    //更新数字

    updataBoardView();
};

var updataBoardView = function() {
    $('.number-cell').remove();
    for(var i = 0; i < 4; ++i){
        for(var j = 0; j < 4; ++j){

            $('#grid-container').append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
            var theNumberCell = $('#number-cell-'+i+'-'+j);

            if(board[i][j] === 0){

                theNumberCell.css('width','0px');
                theNumberCell.css('height','0px');
                theNumberCell.css('top',getPosTop(i,j) + 50);
                theNumberCell.css('left',getPosLeft(i,j) + 50);

            }
            else{

                theNumberCell.css('width','100px');
                theNumberCell.css('height','100px');
                theNumberCell.css('top',getPosTop(i,j));
                theNumberCell.css('left',getPosLeft(i,j));
                theNumberCell.css('background-color',getNumberBackgroundColor(board[i][j]));
                theNumberCell.css('color',getNumberColor(board[i][j]));
                theNumberCell.text(board[i][j]);
                hasConflicted[i][j] = false;
            }

        }
    }
};

/******随机生成一个数字*********/

var RandomNumber = function() {

    //调用support2048.js文件中的nospance函数检测是否有空间

    if(nospance(board)){
        return false;
    }

    //随机生成位置

    var x = parseInt(Math.floor(Math.random() * 4));
    var y = parseInt(Math.floor(Math.random() * 4));
    var times = 0;
    while(times < 50){
        if(board[x][y] === 0){
            break;
        }
        x = parseInt(Math.floor(Math.random() * 4));
        y = parseInt(Math.floor(Math.random() * 4));
    }
    if(times === 50){
        for(var i = 0; i < 4; ++i){
            for(var j = 0; j < 4; ++j){
                if(!board[i][j]){
                    x = i;
                    y = j;
                }
            }
        }
    }

    //随机生成一个数字

    var randomNumber = Math.random() < 0.5 ? 2:4;

    //在随机的位置显示数字

    board[x][y] = randomNumber;

    showNumber(x,y,randomNumber);
    return true;
}

/******键盘监听事件*********/

$(document).keydown(function(event){

    switch(event.keyCode){

        case 37:
            if(moveLeft()){
               setTimeout('RandomNumber()',210);
               setTimeout('isGameOver()',300);
            }
            break;
        case 38:
            if(moveUp()){
               setTimeout('RandomNumber()',210);
               setTimeout('isGameOver()',300);
            }
            break;
        case 39:
            if(moveRight()){
               setTimeout('RandomNumber()',210);
               setTimeout('isGameOver()',300);
            }
            break;
        case 40:
            if(moveDown()){
                setTimeout('RandomNumber()',210);
               setTimeout('isGameOver()',300);
            }
            break;
        default:
            break;

    }

});

/*****左移函数********/

var moveLeft = function() {

    if(!canMoveLeft(board)){
        return false;
    }

    for(var i = 0; i < 4; ++i){
        for(var j = 1; j < 4; ++j){
            if(board[i][j] !== 0){
                for(var k = 0; k < j; ++k){
                    if(board[i][k] == 0 && noBlockHor(i,k,j,board)){
                        showMove(i,j,i,k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if(board[i][k] == board[i][j] && noBlockHor(i,k,j,board) && !hasConflicted[i][k]){
                        showMove(i,j,i,k);
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        overSize(i,k,board);
                        //增加分数
                        score += board[i][k];
                        updateScore(score);
                        hasConflicted[i][k] = true;
                        continue;
                    }
                }
            }
        }
    }

    //刷新数据

    setTimeout("updataBoardView()",200);
    return true;
};

/***********上移函数**********/

var moveUp = function() {

    if(!canMoveUp(board)){
        return false;
    }

    for(var j = 0; j < 4; ++j){
        for(var i = 1; i < 4; ++i){
            if(board[i][j] !== 0){
                for(var k = 0; k < i; ++k){
                    if(board[k][j] == 0 && noBlockVer(j,k,i,board)){
                        showMove(i,j,k,j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if(board[k][j] == board[i][j] && noBlockVer(j,k,i,board)&& !hasConflicted[k][j]){
                        showMove(i,j,k,j);
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        overSize(k,j,board);
                        //增加分数
                        score += board[k][j];
                        updateScore(score);
                        hasConflicted[k][j] = true;
                        continue;
                    }
                }
            }
        }
    }

    //刷新数据

    setTimeout("updataBoardView()",200);
    return true;
};

/********右移函数*********/

var moveRight = function() {

    if(!canMoveRight(board)){
        return false;
    }

    for(var i = 0; i < 4; ++i){
        for(var j = 2; j >= 0; --j){
            if(board[i][j] !== 0){
                for(var k = 3; k > j; --k){
                    if(board[i][k] == 0 && noBlockHor(i,j,k,board)){
                        showMove(i,j,i,k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if(board[i][k] == board[i][j] && noBlockHor(i,j,k,board) && !hasConflicted[i][k]){
                        showMove(i,j,i,k);
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        overSize(i,k,board);
                        //增加分数
                        score += board[i][k];
                        updateScore(score);
                        hasConflicted[i][k] = true;
                        continue;
                    }
                }
            }
        }
    }

    //刷新数据

    setTimeout("updataBoardView()",200);
    return true;

};

/*********下移函数***********/

var moveDown = function() {

    if(!canMoveDown(board)){
        return false;
    }

    for(var j = 0; j < 4; ++j){
        for(var i = 2; i >= 0; --i){
            if(board[i][j] !== 0){
                for(var k = 3; k > i; --k){
                    if(board[k][j] == 0 && noBlockVer(j,i,k,board)){
                        showMove(i,j,k,j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if(board[k][j] == board[i][j] && noBlockVer(j,i,k,board)&& !hasConflicted[k][j]){
                        showMove(i,j,k,j);
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        overSize(k,j,board);
                        //增加分数
                        score += board[k][j];
                        updateScore(score);
                        hasConflicted[k][j] = true;
                        continue;
                    }
                }
            }
        }
    }

    //刷新数据

    setTimeout("updataBoardView()",200);
    return true;

};


/******检测游戏是否结束******/

var isGameOver = function(){
    if(nospance(board)&&nomove(board)){
        GameOver();
    }
};


/********游戏结束*********/

var GameOver = function() {
    alert('捞侠,你输了！');
};

/********增加分数*************/

var updateScore = function(score){
    $('#score').text(score);
};





