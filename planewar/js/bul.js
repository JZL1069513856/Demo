
var buImg=new Image();
buImg.src="images/bullet.png";

function bullet(x,y,bn){
	this.x=x;
	this.y=y;
	this.s=25;
	this.bn=bn;
	this.set=function(){
		this.y-=this.s;
		ctx.drawImage(buImg,this.x+40,this.y);
		// console.log(this.y);
		if(this.y<=0){
			delete bulObj[this.bn];
		}
		// console.log(this.x+"--"+this.y);		
		// for(var obj in bulObj){
		// 	if(bulObj[obj].x<(this.x+this.w)&&(this.x+this.w)<(bulObj[obj].x+20)
		// 		&&(this.y+this.h)>bulObj[obj].y&&(this.y+this.h)>(bulObj[obj].y+30))
		// 	{
		// 		score+=this.score;
		// 		this.foeImg=bonImg;
		// 		ctx.drawImage(this.foeImg,this.x,this.y,500,500);
		// 		// ctx.drawImage(bonImg,this.x,this.y,500,500);
		// 		delete foeObj[this.bn];
		// 		delete bulObj[obj];
		// 		return ;
		// 	}
		// }
	}
	// setInterval(this.set,10);
}