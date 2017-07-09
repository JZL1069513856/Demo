var bonImg=new Image();
var xz=50;//系数修正
var yz=100;//系数修正
var sxz=200;//系数修正
var nxz=0;//gameover修正
bonImg.src="images/blow1.gif";
function foe(x,y,type,bn){var foeImg=new Image();
	this.x=x;
	this.y=y;
	this.bn=bn;
	this.type=type;
	this.foeImg=foeImg;
	this.score;
	switch(this.type){
		case 1:
		this.foeImg.src="images/foe1.png";
		this.s=1+spd;
		this.w=152;
		this.h=115;
		this.score=10;
		this.hp=5;
		break;
		case 2:
		this.foeImg.src="images/foe2.png";
		this.s=2+spd;
		this.w=100;
		this.h=70;
		this.score=100;
		this.hp=3;
		break;
		case 3:
		this.foeImg.src="images/foe3.png";
		this.s=4+spd;
		this.w=60;
		this.h=43;
		this.score=500;
		this.hp=2;
		break;
	}
	this.move=function(obj){
		this.y+=this.s;
		this.s_x=this.x+this.w;
		this.s_y=this.y+this.h;
		// console.log(this.x,this.y);
		if(spd>100){
			spd=100;
		}else{
			spd+=spdAdd;
		}
		// console.log(spd);
		ctx.drawImage(this.foeImg,this.x,this.y);
		if(this.y>768){
			delete foeObj[this.bn];
			return ;
		}
		if(pl_x>this.x&&pl_x<(this.x+this.w)&&pl_y>this.y&&pl_y<(this.y+this.h)){
		
				// runPd=false;
				// console.log(pl_x)
				clearInterval(setI);
				paSeti=setInterval(pause,10);
		
			
		}
		for(obj in bulObj){
			if(bulObj[obj]){
				if(
					(bulObj[obj].x+xz)>this.x&&(this.x+this.w)>(bulObj[obj].x+xz)
					&&(bulObj[obj].y)>this.y&&(this.y+this.h)>(bulObj[obj].y)
					)
				{
					this.hp--;
					// ctx.drawImage(this.foeImg,this.x,this.y,500,500);
					delete bulObj[obj];
					if(this.hp<=0){
						score+=this.score;
						ctx.drawImage(bonImg,this.x-sxz,this.y-sxz,500,500);
						delete foeObj[this.bn];
					}
					// return false;
				}			
			}
		}
	}
}