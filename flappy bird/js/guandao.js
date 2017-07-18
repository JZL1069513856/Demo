function guandao(x1,y1,x2,y2,bh){
	this.x1=x1;
	this.y1=y1;
	this.x2=x2;
	this.y2=y2;
	this.bh=bh;
	var guan1=new Image();
	var guan2=new Image();
	var score=new Image();
	var score1=new Image();
	var score2=new Image();
	guan1.src=imgarr[16];
	guan2.src=imgarr[17];	
	var y=5;
	this.darwGuan=function(){
				this.x1-=y;
				this.x2-=y;
				if((bird1.x+40)>this.x1&&(bird1.x+10)<(this.x1+52)&&(bird1.y+10)<(320+this.y1)||(bird1.x+40)>(this.x2)&&(bird1.x+10)<(this.x2+52)&&(bird1.y+38)>this.y2||(bird1.y+38)>400||(bird1.y+10)<0){ //碰撞检测					
					start=false;																								
				}																	
				score.src=imgarr[num];
				score1.src=imgarr[num1];
				score2.src=imgarr[num2];							
				ctx.drawImage(guan1,this.x1,this.y1);
				ctx.drawImage(guan2,this.x2,this.y2);
				if(numpd1){                             //画出得分图片
					ctx.drawImage(score2,90,100);					
					ctx.drawImage(score1,110,100);
					ctx.drawImage(score,130,100);
				}	
				else if(numpd){
					ctx.drawImage(score1,110,100);
					ctx.drawImage(score,130,100);
				}
				else{					
					ctx.drawImage(score,130,100);		
				}								
				if(this.x1<-52){									
					y=0;
					delete guanarr[bh];					
				}
				if((bird1.x+10)>(this.x1+52)&&scorepd==1){
					scorepd=0;
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
					setTimeout(function(){scorepd=1},1000);
				}			
		}
}