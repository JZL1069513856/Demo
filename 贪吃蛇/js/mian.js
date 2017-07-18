var cav=document.createElement("canvas");//创建画布
cav.width="400";
cav.height="400";
cav.style.background="black";
document.body.appendChild(cav);
var ctx=cav.getContext("2d");
var sn=[42,41],dz=43,fx=1,n;
    function draw(t,c){
        ctx.fillStyle=c;
        ctx.fillRect(t%20*20+1,~~(t/20)*20+1,18,18);
    }
    document.onkeydown=function(e){
        var e=e||window.event;
        if(e.preventDefault){
            e.preventDefault();//取消事件的默认动作。event.preventDefault()
        }
        else{
//window对象的属性值，返回窗口的值，当捕捉到事件(event)时，做某些判断，如果判断失败，则阻止当前事件继续运行.            
            e.returnValue = false;
        };
        fx=sn[1]-sn[0]==(n=[-1,-20,1,20][(e||event).keyCode-37]||fx)?fx:n;//
    };
    !function(){
        sn.unshift(n=sn[0]+fx);
        if(sn.indexOf(n,1)>0 || n<0||n>399||fx==1&&n%20==0||fx==-1&&n%20==19) 
            return alert("GAME OVER");
        draw(n,"Lime");
        if(n==dz){
            while(sn.indexOf(dz=~~(Math.random()*400))>=0);
            draw(dz,"Yellow");
        }else
        draw(sn.pop(),"Black");
        setTimeout(arguments.callee,130);
    }();