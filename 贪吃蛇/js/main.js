window.onload = function(){
	var g = {
		cvs:null,
		ctx:null,
		ave:0,
		foodX:0,
		foodY:0,
		snake:[],
		score:0,
		gameOver:false,
		timerLeft:null,
		timerRight:null,
		timerTop:null,
		timerDown:null,
		oldDirection:null
	};
		
	init();
	function init(){
		g.cvs = document.getElementById('canvas');
		g.ctx = g.cvs.getContext('2d');
		g.cvs.width = 800;//window.innerWidth;
		g.cvs.height = 500;//window.innerHeight;
		g.cvs.style.background="#ccc";
		g.ave = (g.cvs.width - 300 ) / 30 | 0;
		drawBg();
		createFood();
		initSnake();
		computeScore();
		}
		
	//画背景
	function drawBg(){
		for(var i = 0; i < 30;i++){
				for(var j = 0; j < 30; j++){
					g.ctx.strokeStyle = "green";
					g.ctx.strokeRect(g.ave * i, g.ave * j, g.ave,g.ave);
				}
			}
	}
			
	//创建食物
	function createFood(){
		g.foodX = (Math.random() * 60 % 30) | 0;
		g.foodY = (Math.random() * 60 % 30) | 0;
		g.ctx.save();
		g.ctx.fillStyle = "red";
		g.ctx.fillRect(g.foodX * g.ave + 1, g.foodY * g.ave + 1, g.ave - 2, g.ave - 2);
		var len = g.snake.length;
		for(var i = 0 ; i < len; i++){
			if(g.snake[i].x == g.foodX && g.snake[i].y == g.foodY){//当食物在蛇身上时，重新创建
				createFood();
				break;
			}
		}
	}
		
	//初始化蛇身
	function initSnake(){
		g.ctx.restore();
		g.ctx.save();//保存当前界面
		g.ctx.fillStyle = "pink";
		for(var i = 0; i < 4; i++){
			g.ctx.fillRect(1 * g.ave + 1, i * g.ave + 1, g.ave - 2, g.ave - 2);
			var point = {
			x:1,
			y:i
			};
			g.snake.push(point);
		}
	}
		
	//吃食物
	function eat(){
		var headIndex = g.snake.length - 1;
		if(g.snake[headIndex].x == g.foodX && g.snake[headIndex].y == g.foodY){
			g.score += 10;
			createFood();	
			return true;
		}
		return false;
	}
		
	//计算得分
	function computeScore(){
		g.ctx.font = "Bold 20px Arial";//粗细大小字体，一个不能少
		g.ctx.clearRect(500,50,200,100);
		g.ctx.strokeText("得分：" + g.score,560,100);
			
	}
		
	//判断蛇是否咬到自己,通过判断蛇头是否和蛇身重合
	function self(){
		var len = g.snake.length - 1;
		for(var i = 0 ; i < len; i++){
			if(g.snake[i].x == g.snake[len].x && g.snake[i].y == g.snake[len].y){
				g.gameOver = true;
				clearTimer();
				alert("咬到自己啦，游戏结束！");
				break;
			}
		}
		computeScore();
	}
		
	//画出蛇头
	function creSnakeHead(point){
		g.ctx.restore();
		g.ctx.save();
		g.ctx.fillStyle = "#000";
		g.ctx.fillRect(point.x * g.ave + 1, point.y * g.ave + 1, g.ave - 2, g.ave - 2);
		g.snake.push(point);
			
	}
		
	//擦除蛇尾
	function clearSnakeTail(point){
		g.ctx.clearRect(point.x * g.ave + 1, point.y * g.ave + 1, g.ave - 2, g.ave - 2);
		g.snake.shift();
	}
		
	document.onkeydown = function(event){
		var e = event || window.event;
		switch(e.keyCode){
		case 37:{ //向左运动
			clearTimer();
			if(g.oldDirection == "right" || g.gameOver == true)return;
			moveLeft();
			g.oldDirection = "left";
		}break;
		case 38:{//向上运动
			clearTimer();
			if(g.oldDirection == "down" || g.gameOver == true)return;
			moveTop();
			g.oldDirection = "top";
		}break;
		case 39:{//向右运动
			clearTimer();
			if(g.oldDirection == "left" || g.gameOver == true)return;
			moveRight();
			g.oldDirection = "right";
		}break;
		case 40:{//向下运动
			clearTimer();
			if(g.oldDirection == "top" || g.gameOver == true)return;
			moveDown();
			g.oldDirection = "down";
		}break;
		}
	};
		
	function moveLeft(){
		if(g.gameOver == false){
			var headIndex = g.snake.length - 1;
			if(g.snake[headIndex].x - 1 >= 0){		
				creSnakeHead({x:g.snake[headIndex].x - 1, y:g.snake[headIndex].y});
				self();			
				if(!eat()){
					clearSnakeTail(g.snake[0]);
				}			
			}else{
				clearTimer();g.gameOver = true;alert("gameOver!");
			}
			g.timerLeft = setTimeout(function(){moveLeft();},1000);
		}
	}
		
	function moveTop(){
		if(g.gameOver == false){
			var headIndex = g.snake.length - 1;
			if(g.snake[headIndex].y - 1 >= 0){
				creSnakeHead({x:g.snake[headIndex].x, y:g.snake[headIndex].y - 1});
				self();
				if(!eat()){
					clearSnakeTail(g.snake[0]);
				}
			}else{
				clearTimer();g.gameOver = true;alert("gameOver!");
			}
			g.timerTop = setTimeout(function(){moveTop();},1000);
		}
	}
		
	function moveRight(){
		if(g.gameOver == false){
			var headIndex = g.snake.length - 1;
			if(g.snake[headIndex].x + 1 < 30){
				creSnakeHead({x:g.snake[headIndex].x + 1 ,y:g.snake[headIndex].y});
				self();
				if(!eat()){
					clearSnakeTail(g.snake[0]);
				}
			}else{
				clearTimer();g.gameOver = true;alert("gameOver!");
			}
			g.timerRight = setTimeout(function(){moveRight();},1000);
		}
	}
		
	function moveDown(){
		if(g.gameOver == false){
			var headIndex = g.snake.length - 1;
			if(g.snake[headIndex].y + 1 < 30){
				creSnakeHead({x:g.snake[headIndex].x, y:g.snake[headIndex].y + 1});
				self();
				if(!eat()){
					clearSnakeTail(g.snake[0]);
				}
			}else{
				clearTimer();g.gameOver = true;alert("gameOver!");
			}
			g.timerDown = setTimeout(function(){moveDown();},1000);
		}
	}
		
	function clearTimer(){
		clearTimeout(g.timerLeft);
		clearTimeout(g.timerTop);
		clearTimeout(g.timerRight);
		clearTimeout(g.timerDown);
	}
};