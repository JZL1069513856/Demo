var cav=document.createElement("canvas");//创建画布
cav.width="400";
cav.height="400";
cav.style.background="black";
document.body.appendChild(cav);
var ctx=cav.getContext("2d");
//食物的位置
function draw(){
	ctx.fillStyle="red";
	var x=Math.floor(Math.random()*370);
	var y=Math.floor(Math.random()*370);
	ctx.fillRect(x,y,20,20);
	// var len = g.snake.length;
	// for(var i = 0 ; i < len; i++){
	// 	if(g.snake[i].x == g.foodX && g.snake[i].y == g.foodY){//当食物在蛇身上时，重新创建食物
	// 		draw();
	// 		break;
	// 	}
	// }
}


init();
function init(){
	ave = (cav.width - 300 ) / 30 | 0;
	draw();
	draws();
	initSnake();
	// computeScore();
}
		
//初始化蛇身
function initSnake(){
	// cav.restore();
	// cav.save();
	cav.fillStyle = "#000";
	for(var i = 0; i < 4; i++){
	ctx.fillRect(1 *ave + 1, i * ave + 1, ave - 2, ave - 2);
	var point = {
	x:1,
	y:i
	};
	// g.snake.push(point);
	}
}


function draws(){
	ctx.fillStyle="green";
	var x=Math.floor(Math.random()*300);
	var y=Math.floor(Math.random()*300);
	ctx.fillRect(x,y,20,20);
	// setTimeout(draws,200);
}

//公共变量
var she={};//创建蛇对象
var keycods={};//键盘的键值
window.addEventListener("keydown",function(e){
	keycods[e.keyCode]=true;
})
function gos(){
	for(var obj in she){
		she[obj].move();
		// if(zdArr[obj]){
		// 	zdArr[obj].pz();
		// }
	}
}
