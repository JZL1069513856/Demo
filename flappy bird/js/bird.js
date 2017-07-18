function bird(x,y){
	this.x=x;
	this.y=y;
	var birds=new Image();
	var birdsarr=[];
	var j=0;
	var imgpd=true;//图片src延时判断变量
	for(var i=0;i<3;i++){
		birdsarr.push("images/bird0_"+i+".png");
	}	
	this.drawBird=function(){		
		if(imgpd==true){			
			imgpd=false;
			birds.src=birdsarr[j];
			j++;
			if(j==3){
				j=0
			}
			var out=setTimeout(function(){imgpd=true},80);	
		}						
		this.y+=speed;		
		ctx.drawImage(birds,this.x,this.y);		
	}

}