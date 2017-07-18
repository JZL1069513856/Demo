function bullet(x,y,speed,bh){
	this.x=x;
	this.y=y;
	this.speed=speed;
	this.bh=bh;
	this.draw=function(){
				this.x+=speed;		
				ctx.beginPath();
				ctx.arc(this.x,this.y+10,5,0,2*Math.PI);					
				ctx.stroke();								
				ctx.closePath();
				ctx.fillStyle="red";
				ctx.fill();
				if(this.x>520){
					delete bulletarr[this.bh];
				}
				for(var obj in guanarr){
					if(this.x>guanarr[obj].x1&&this.x<(guanarr[obj].x1+52)&&(this.y<(320+guanarr[obj].y1)||this.y>guanarr[obj].y2)){				
					delete bulletarr[this.bh];
					delete guanarr[obj];
					num++;
					scorenum++;
					if(num>15){   
						num=6;
						num1++;
						numpd=true;
						if(num1>15){
							num=6;
							num1=6;
							num2++;
							numpd1=true;
							}
						}									
					}
				}
							
		}
}