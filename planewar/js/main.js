// 创建画布
var cav=document.createElement("canvas");
cav.width="512";
cav.height="768";
cav.style.border="1px solid gray";
cav.style.background="pink";
document.body.appendChild(cav);// 为body添加canvas
var ctx=cav.getContext("2d");

// 加载图片--缓存图片
var imgArr=["images/bg1.jpg","images/bg2.jpg","images/blow4.gif","images/bullet.png",
"images/bullet1.png","images/foe1.png","images/foe2.png","images/foe3.png","images/plane.png",
"images/but.png"];
var objArrimg=[];//存图片的数组
var count=0;//图片计数
var imgL=imgArr.length;//数组长度
for(var i=0;i<imgL;i++){
	objArrimg[i]=new Image();
	objArrimg[i].src=imgArr[i];
	objArrimg[i].onload=function(){
		count++;
		objArrimg[i]=null;
	}
}



// 各函数基本参数
var bgImg=new Image();bgImg.src="images/bg2.jpg";//背景
var figImg=new Image();figImg.src="images/bg1.jpg";//战斗背景
var plImg=new Image();plImg.src="images/plane.png";//飞机
// 系数修正
var spd=0;//难度系数
var spdXz=1.5;//难度系数修正
var spdAdd=0.01;//难度系数提升

// 判断
var gameNum=0;//游戏次数
// 规则
var score=0;
var setI;
// 子弹
var bn=0;
var bulObj={};

// 创建foe敌人
var foen=0;
var foeObj={};
function creFoe(){
	foen++;
	var typ=Math.floor(Math.random()*4+1);
	var k=Math.floor(Math.random()*2+1);
	var x=Math.floor(Math.random()*480);
	foeObj[foen]=new foe(x,-115,typ,foen);
	// foeObj[2]=new foe(0+x,-115,3,2);
	setTimeout(creFoe,(k+0.2)*150-spd*spdXz);
	// console.log(k);(k+0.2)*500
}
creFoe();
// 运行
function run(e){
	// console.log("run"+runPd);
	if(count>imgL-1){
		ctx.drawImage(figImg,0,0);
		tips("当前获得分数："+score,20,20,"black","15px");
		plane(plImg,pl_x,pl_y,bn);
		// for()
		// 子弹
		// for in 读取每个对象，并执行
		for(var obj in bulObj){
			bulObj[obj].set();
		}bn++;
		// 敌人
		for(var obj in foeObj){
			// 优化运行
			if(foeObj[obj]){
				foeObj[obj].move(obj);
			}
			else return ;
		}
		// console.log(foeObj)
		// if(score>2000){
		// 	clearInterval(setI);
		// 	tips("str",x,y,col,fot)
		// }
	}
	else tips("Loading...",50,718,"white",20);

	// ctx.clearRect(0,0,512,768);
	// console.log(ctx.drawImage)
}
// setI=setInterval(run,50);




// setTimeout(function(){
// 	clearInterval(setI);
// 	console.log(bulObj);
// },100);

// 提示信息(字符,x坐标,y坐标,颜色,字体大小)
// 在canvas里插入字体
function tips(str,x,y,col,fot){
	ctx.fillStyle=col;
	ctx.textBaseline="middle";
	ctx.font=fot+"'微软雅黑'";
	ctx.fillText(str,x,y);
}

// 鼠标监听事件
// 移动
var pl_x;//获取鼠标x轴
var pl_y;//获取鼠标y轴
cav.addEventListener("mousemove",function(e){
	pl_x=e.clientX;
	pl_y=e.clientY;
});
// 点击
var cl_x;//获取鼠标x轴
var cl_y;//获取鼠标y轴
cav.addEventListener("click",function(e){
	cl_x=e.clientX;
	cl_y=e.clientY;
});

// 登录界面
var butImg=new Image();
butImg.src="images/but.png";
function login(){
	// 创建背景+按钮
	ctx.drawImage(bgImg,0,0);
	if(pl_x>150&&pl_x<350&&pl_y>350&&pl_y<417){
		ctx.drawImage(butImg,400,0,200,67,150,350,200,67);
	}else{
		ctx.drawImage(butImg,0,0,200,67,150,350,200,67);
	}
	if(pl_x>150&&pl_x<350&&pl_y>450&&pl_y<517){
		ctx.drawImage(butImg,400,0,200,67,150,450,200,67);
	}else{
		ctx.drawImage(butImg,0,0,200,67,150,450,200,67);	
	}
	tips("开始游戏",185,380,"black","30px");
	tips("退出游戏",185,480,"black","30px");
	// 特效
	if(cl_x>150&&cl_x<350&&cl_y>350&&cl_y<417){
		cl_x=0;cl_y=0;
		clearInterval(lgset);
		setI=setInterval(run,50);
	}		
	if(cl_x>150&&cl_x<350&&cl_y>450&&cl_y<517){
		cl_x=0;cl_y=0;
		window.close();
	}
}
var lgset;
lgset=setInterval(login,50);
// clearInterval(lgset);
// 死亡暂停
function pause(){
		if(pl_x>150&&pl_x<350&&pl_y>250&&pl_y<317){
			ctx.drawImage(butImg,400,0,200,67,150,250,200,67);
		}else{
			ctx.drawImage(butImg,0,0,200,67,150,250,200,67);
		}
		if(pl_x>150&&pl_x<350&&pl_y>350&&pl_y<417){
			ctx.drawImage(butImg,400,0,200,67,150,350,200,67);
		}else{
			ctx.drawImage(butImg,0,0,200,67,150,350,200,67);
		}
		if(pl_x>150&&pl_x<350&&pl_y>450&&pl_y<517){
			ctx.drawImage(butImg,400,0,200,67,150,450,200,67);
		}else{
			ctx.drawImage(butImg,0,0,200,67,150,450,200,67);	
		}
		tips("游戏结束",185,280,"black","30px");
		tips("分数"+score,185,380,"black","30px");
		tips("重新开始",185,480,"black","30px");
		// console.log(cl_x+"--"+cl_y);			
		if(cl_x>150&&cl_x<350&&cl_y>450&&cl_y<517){
			cl_x=0;cl_y=0;
			score=0;
			setI=0;
			spd=0;
			// 子弹
			bn=0;
			bulObj={};
			// foe
			foen=0;
			foeObj={};
			clearInterval(paSeti);
			setI=setInterval(run,50);	
			// if(!runPd){
			// 	clearInterval(paSeti);
			// 	runPd=true;
			// }
		}
		// console.log(cl_x+"++++"+cl_y);
		if(cl_x>150&&cl_x<350&&cl_y>250&&cl_y<317){
			cl_x=0;cl_y=0;			
			score=0;
			setI=0;
			spd=0;
			// 子弹
			bn=0;
			bulObj={};
			// foe
			foen=0;
			foeObj={};
			clearInterval(paSeti);
			lgset=setInterval(login,50);
		}
}
var paSeti;