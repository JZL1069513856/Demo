// 创建画布
var cav = document.createElement("canvas");
cav.width="288";
cav.height="512";
cav.style.background="black";
cav.style.border="1px solid gray";
document.body.appendChild(cav);
var ctx = cav.getContext("2d");
//预先加载游戏所需要的图片
var imgarr=["images/bg_day.png","images/bird0_0.png","images/bird0_1.png","images/bird0_2.png",
"images/button_play.png","images/land.png","images/font_048.png","images/font_049.png","images/font_050.png","images/font_051.png",
"images/font_052.png","images/font_053.png","images/font_054.png","images/font_055.png","images/font_056.png",
"images/font_057.png","images/pipe_down.png","images/pipe_up.png","images/tutorial.png"] 
var arrimg=[]; 
var count=0;
function load(){
	for(var i=0;i<imgarr.length;i++){  
	arrimg[i]=new Image();
	arrimg[i].src=imgarr[i];
	arrimg[i].onload=function(){ 
		count++;            
		arrimg[i]=null;		
		}
	}
}
load();
var  btn_start=new Image();
btn_start.src="images/button_play.png";
var  btn_start1=new Image();
btn_start1.src="images/tutorial.png";
var bgimg = new Image();
bgimg.src="images/bg_day.png";
var ground=new Image();
ground.src="images/land.png"
var ground1=new Image();
ground1.src="images/land.png"
var bird1=new bird(30,200);
var x=0;
var guanarr={};
var g=0;
var bulletarr={};
var b=0;
var start=true; //控制游戏开始.
var num=6; //控制score的得分图片
var num1=6; //两位数时候得分图片
var num2=6; //三位数时候得分图片
var numpd=false; //控制十位数即num1的显示
var numpd1=false;//控制百位数即num2的显示
var scorepd=1; //得分判断
var scorenum=0;//得分累积
var speed=0;//鸟儿掉落速度
var scorepre=0; //记录上次得分
var speedmax=10;
 var timer //控制画布一直画的定时器
 var creatb	;
function createGuan(){ //创建管道
		var up=Math.floor(Math.random()*-220)-60;
		var down=320+up+100; //这里的100控制管道之间的间隔，要改自己改。
		guanarr[g]=new guandao(330,up,330,down,g);
		g++;			
	var creat=setTimeout(createGuan,1300);
}
function createBullet(){
		bulletarr[b]=new bullet(bird1.x+40,bird1.y,4,b);
		b++;			
}
function go(){
	if(!start){		
		ctx.fillStyle="deeppink";
		ctx.font="40px 微软雅黑 bold";	
		ctx.fillText("GameOver",60,100);
		ctx.fillStyle="purple";
		ctx.font="14px 微软雅黑 bold";	
		ctx.fillText("您的最终得分为:",40,250);
		ctx.fillStyle="red";
		ctx.font="20px 微软雅黑 bold";	
		ctx.fillText(scorenum,170,250);
		ctx.fillStyle="purple";
		ctx.font="14px 微软雅黑 bold";	
		ctx.fillText("历史最高记录:",40,300);		
		ctx.fillStyle="green";
		ctx.font="20px 微软雅黑 bold";	
		ctx.fillText(scorepre,170,300);		
		ctx.fillStyle="orange";
		ctx.font="22px 微软雅黑 bold";	
		ctx.fillText("按回车重新开始",70,380);				
		return;
		}
	if(start){		
		x-=3;
		ctx.clearRect(0,0,288,512);
		ctx.drawImage(bgimg,0,0);			
		bird1.drawBird();
		for(var obj in guanarr){
			guanarr[obj].darwGuan();		
		}
		for(var obj1 in bulletarr){
			bulletarr[obj1].draw();
		}
		ctx.drawImage(ground,x,400);
		ctx.drawImage(ground1,288+x,400);
		if(x<-288){
			x=0;
		}	
	}
}
function ready(){
	ctx.clearRect(0,0,288,512);
	if(count>=18){
		start1();		
		clearInterval(oReady);
	}	
}
var oReady=setInterval(ready,30);
function start1(){	
	ctx.drawImage(bgimg,0,0);					
	ctx.drawImage(btn_start,70,400)
	ctx.drawImage(btn_start1,70,200)
	ctx.fillStyle="black";
	ctx.font="22px 微软雅黑 bold";	
	ctx.fillText("空格或鼠标左键跳跃",50,100);
	ctx.fillStyle="yellowgreen";
	ctx.font="12px 微软雅黑 bold";	
	ctx.fillText("人民币玩家专属特权(点击查看)",50,130);
	cav.addEventListener('click',chongzhi);
	cav.addEventListener('click',starts);
}
function chongzhi(e){
	var oX=e.clientX;//获取鼠标的x坐标
	var oY=e.clientY;
	if(oX>50&&oX<200&&oY>130&&oY<150){
		ctx.fillStyle="red";
		ctx.font="12px 微软雅黑 bold";	
		ctx.fillText("马化腾告诉你按方向键右键发子弹",50,170);
	}
}
function starts(e){
	var oX=e.clientX;//获取鼠标的x坐标
	var oY=e.clientY;
	if(oX>70&&oX<186&&oY>400&&oY<470){
		timer=setInterval(go,30);
		createGuan();
	}
}
 var flag=1;  //控制键盘不能一直按下
 var jumptimer;
 var downtimer;
 function down() {
	speed += 1.2;	
	if(speed >= speedmax) {
	speed = speedmax;
	}	
}
  downTimer = setInterval(down, 30);
 function jump(){	
 		speed+=0.8;		
		if(speed >= 0) {
		speed = 0;
		clearInterval(jumptimer);
		 downtimer = setInterval(down, 30);
		}		 			 				
 	}
 cav.addEventListener("click",function(){
 	speed =-12;
 	if(start) {
		//每次向上跳时，先将向上、向下计时器清楚，防止叠加
		clearInterval(jumptimer);
		clearInterval(downtimer); //清除向下的定时器；
		jumptimer = setInterval(jump, 30);		
	}				
 })
 window.addEventListener("keydown",function(e){	
 	if(e.keyCode==32&&flag==1){
 		speed = -12;
 	if(start) {
		//每次向上跳时，先将向上、向下计时器清楚，防止叠加
		clearInterval(jumptimer);
		clearInterval(downtimer); //清除向下的定时器；
		jumptimer = setInterval(jump, 30);		
	}
 		flag=0;				
 	}
 })
window.addEventListener("keyup",function(e){
 	flag=1;
 })
window.addEventListener("keydown",function(e){ //重新开始游戏
	if(e.keyCode==13&&start==false){ //比较记录得分
		if(scorenum>=scorepre){
			scorepre=scorenum;
		}
		else{
			scorepre;
		}		
		start=true;
		x=0;
		scorenum=0;
		num=6;	
		num1=6;
		num2=6;
		numpd=false;
		numpd1=false;
		speed=0;
		bulletarr={};
		guanarr={};
		g=0;
		bird1.x=30;
		bird1.y=200;			
	}		
 })
 window.addEventListener("keydown",function(e){
 	if(e.keyCode==39){ 	
 		createBullet();
 	}
 })
