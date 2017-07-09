function plane(img,x,y,bn){
	this.bn=bn;
	this.img=img;
	if(x>0&&x<512&&y>0&&y<768){
		this.x=x;
		this.y=y;
	}
	bulObj[this.bn]=new bullet(this.x-50,this.y-42.5,this.bn);
	ctx.drawImage(this.img,this.x-50,this.y-42.5);
	// for()
}