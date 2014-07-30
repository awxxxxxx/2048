/**
 *负责数字的动态变化
 *
 *@author:Waterbear;
 */

/****显示数字*****/

var showNumber = function(x,y,number){

    var numberCell = $('#number-cell-' + x + '-' +y);
    numberCell.css('background-color',getNumberBackgroundColor(number));
    numberCell.css('color',getNumberColor(number));
    numberCell.text(number);

    numberCell.animate({
        width:'100px',
        height:'100px',
        top:getPosTop(x,y),
        left:getPosLeft(x,y)
    },50);
};

/*****显示移动动画*******/

var showMove = function(fromx,fromy,tox,toy) {

    var numberCell = $('#number-cell-'+fromx+'-'+fromy);
    numberCell.animate({
        top:getPosTop(tox,toy),
        left:getPosLeft(tox,toy)
    },200);
};
