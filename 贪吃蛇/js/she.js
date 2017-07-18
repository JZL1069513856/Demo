function she(x,y,speed,bh,direct){
	this.x=x;
	this.y=y;
	this.speed=speed;
	this.bh=bh;
	this.direct=direct;
	this.move=function(){
		for(var x in keycods){
			if(x==37){
				console.log("left");
				if(this.x<0){
					this.x=0;
				}
				this.x-=speed;
			}
			if(x==38){
				console.log("up");
				if (this.y<0) {
					this.y=0;
				}
				this.y-=speed;
			}
			if(x==39){
				console.log("right");
				if(this.x>400){
					this.x=400;
				}
				this.x+=speed;
			}
			if(x==40){
				console.log("down");
				if(this.y>400){
					this.y=400;
				}
				this.y+=speed;
			}
		}
		// ctx.beginPath();
		
		// ctx.stroke();
		// ctx.fill();
		// ctx.closePath();
	}
}