
/*********确定顶部的位置********/

var getPosTop = function(i,j) {
    return 20 + 120 * i;
};

/*******确定距离左边的位置*******/

var getPosLeft = function(i,j) {
    return 20 + 120 * j;
};

/*******返回数字背景的颜色**********/

var getNumberBackgroundColor = function(number) {

    switch(number){

        case 2: return '#eee4da';break;
        case 4: return '#ede0c8';break;
        case 8: return '#f2b179';break;
        case 16: return '#f59563';break;
        case 32: return '#f67c5f';break;
        case 64: return '#f65e3b';break;
        case 128: return '#decf72';break;
        case 256: return '#edcc61';break;
        case 512: return '#9c0';break;
        case 1024: return '#33b5e5';break;
        case 2048: return '#09c';break;
        case 4096: return '#a6c';break;
        case 8192: return '#93c';break;
    }
    return 'black';
};

/*******返回数字的颜色***********/

var getNumberColor = function(number) {

    if(number <= 4){
        return '#776e65';
    }
    return 'white';
};

/*******检测是否有空间*********/

var nospance = function(arr){

    for(var i = 0; i < 4; ++i){
        for(var j = 0; j < 4; ++j){
            if(arr[i][j] === 0 ){
                return false;
            }
        }
    }
    return true;
};

/*****检测能否左移*********/

var canMoveLeft = function(arr) {
    for(var i = 0; i < 4; ++i){
        for(var j = 1; j < 4;++j ){
            if(arr[i][j] !== 0){
                if(arr[i][j-1] === 0||arr[i][j-1] === arr[i][j]){
                    return true;
                }
            }
        }
    }
    return false;
};

/*****检测能否上移*********/

var canMoveUp = function(arr) {
    for(var i = 0; i < 4; ++i){
        for(var j = 1; j < 4;++j ){
            if(arr[i][j] !== 0){
                if(arr[j-1][i] === 0||arr[j-1][i] === arr[j][i]){
                    return true;
                }
            }
        }
    }
    return false;
};

/*****检测能否右移*********/

var canMoveRight = function(arr) {
    for(var i = 0; i < 4; ++i){
        for(var j = 2; j >= 0;--j ){
            if(arr[i][j] !== 0){
                if(arr[i][j+1] === 0||arr[i][j+1] === arr[i][j]){
                    return true;
                }
            }
        }
    }
    return false;
};

/*******检测能否下移***********/

var canMoveDown = function(arr){

    for(var j = 0; j < 4; ++j){
        for(var i = 2; i >= 0;--i ){
            if(arr[i][j] !== 0){
                if(arr[i+1][j] === 0||arr[i+1][j] === arr[i][j]){
                    return true;
                }
            }
        }
    }
    return false;
};





/****检测水平有没有障碍物******/

var noBlockHor = function(row,col1,col2,arr) {
    for(var i = col1 + 1; i < col2; ++i){
        if(board[row][i] !== 0){
            return false;
        }
    }
    return true;
};

/****检测垂直方向有没有障碍物********/

var noBlockVer = function(col,row1,row2,arr){
    for(var i = row1 + 1; i < row2; ++i){
        if(board[i][col] !== 0){
            return false;
        }
    }
    return true;
};

/******能否移动*****/

var nomove = function(arr) {
    if(canMoveDown(arr) || canMoveRight(arr)||canMoveLeft(arr)||canMoveUp(arr)){
        return false;
    }
    return true;
};

/******检测数字是否超过3位数*******/

var overSize = function(i,j,board) {
    if(board[i][j] > 1000){
       $('#number-cell-' + i +'-' + j).css('font-size','40px');
    }
};

