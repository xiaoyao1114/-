var start=document.getElementById('start');
var play=document.getElementById('play');
var mengban=document.getElementById('mengban');
start.addEventListener('click',f1,false);
function f1(){
    mengban.style.display='block';
    play.style.display='block';
    zanting.style.display='block';
}
//退出游戏
var resite=document.getElementById('resite');
resite.addEventListener('click',f2,false);
function f2(){
    mengban.style.display='none';
    play.style.display='none';
    //zanting.style.display='none';

}
//返回首页
var back=document.getElementById('back');
back.addEventListener('click',f3,false);
function f3(){
    mycan();
    quan.style.display='none';
    over.style.display='none';
    lowscore.style.display='none';
    mengban.style.display='none';
    play.style.display='none';
    zanting.style.display='none';
    pause.style.display='none';
    del();


}
//隐藏画布，清除定时器，清除画布
function mycan(){

    clearInterval(backtime);
    clearInterval(pipetime);
    clearInterval(birdtime);
    clearInterval(groundtime);
    ctx.clearRect(0,0,849,640);
    ctb.clearRect(0,0,849,643);
    ctp.clearRect(0,0,849,643);
    up_pipe.px=-100;
    down_pipe.px=-100;
    birdstate='true';
    score=0;
    bird.by=250;



}
//显示画布，添加定时器，
function creatmycan(){
    backtime=setInterval(drbg1,10);
    groundtime=setInterval(drbg2,80);
    pipetime=setInterval(creatup_pipe,80);
    birdtime=setInterval(creatbird,80);

}
//开始游戏
var pipetime;var birdtime;var groundtime;var backtime;
var gogame=document.getElementById('begingame');
gogame.addEventListener('click',game,false);
var ctx0 = document.getElementById('canvas');
var ctx=ctx0 .getContext('2d');
var ctb0 = document.getElementById('canvas2');//鸟
var ctb=ctb0 .getContext('2d');
var ctp0 = document.getElementById('canvas3');//柱子
var ctp=ctp0 .getContext('2d');
var bgsound;var birsound;var diesound;
function game(){
    play.style.display='none';
    creatmycan();
    bgmusic();
}
//游戏背景音乐
function bgmusic(){
    bgsound=document.createElement('audio');
    bgsound.id='bgsou';
    bgsound.src='./images/bgSound.mp3';
    bgsound.loop='loop';
    bgsound.autoplay='autoplay';
    ctx0.appendChild(bgsound);
}
function del(){
    var obgsou=document.getElementById('bgsou');
    if(obgsou!=undefined||obgsou!==null){
        ctx0.removeChild(bgsound);
    }
}

//碰撞音乐
function birmusic(){
    birsound=document.createElement('audio');
    birsound.id='birsou';
    birsound.src='./images/woda.mp3';
    birsound.loop='false';
    birsound.autoplay='autoplay';
    ctb0.appendChild(birsound);
}
function delbird(){
    var obirsou=document.getElementById('birsou');
    if(obirsou!=undefined||obirsou!==null){
        ctb0.removeChild(obirsou);
    }
}
//鸟儿死了的声音
function diemusic(){
    diesound=document.createElement('audio');
    diesound.id='diesou';
    diesound.src='./images/woshan.mp3';
    diesound.loop='false';
    diesound.autoplay='autoplay';
    ctb0.appendChild(diesound);
}
function deldie(){
    var odiesou=document.getElementById('diesou');
    if(odiesou!=undefined||odiesou!==null){
        ctb0.removeChild(odiesou);
    }
}

//background
function drbg1(){
    var img = new Image();
    img.src='./images/bg22.jpg';
    ctx.clearRect(0,-78,849,640);
    ctx.drawImage(img,0,-78,849,640);
}
//setInterval(drbg1,10);
//ground
var x=0;
function drbg2(){
    var img = new Image();
    img.src='./images/ground.png';
    ctx.clearRect(0,560,500,240);
    ctx.drawImage(img,x,560,600,240);
    x-=25;
    if(x<=-65){
        x=0;
    }
}
//var groundtime=setInterval(drbg2,80);
//管子
function Pipe(x,y,width,height,img_src){
    this.px = x;
    this.py = y;
    this.pwidth = width;
    this.pheight = height;
    this.img_src = img_src;
    this.drawup = drawUpPipe;
    this.drawdown = drawDownPipe;
}
//画上部份的管子
function drawUpPipe(){
    var image = new Image();
    image.src = this.img_src;
    ctp.clearRect(0,0,849,643);
    ctp.drawImage(image,150,500,150,800,this.px,this.py,this.pwidth,this.pheight);
}
//画底部柱子
function drawDownPipe(){
    var image = new Image();
    image.src = this.img_src;
    ctp.drawImage(image,0,500,150,500,this.px,this.py,this.pwidth,this.pheight);

}
var velocity=18;
var up_pipe; var down_pipe;
up_pipe = new Pipe(-100,0,100,400,"./images/pipe.png");
down_pipe = new Pipe(-100,400,100,400,"./images/pipe.png");
function creatup_pipe(){
    up_pipe.drawup();
    down_pipe.drawdown();
}
//var pipetime=setInterval(creatup_pipe,80);
//小鸟
function Bird(x,y,width,height,img_srcs){
    this.bx = x;
    this.by = y;
    this.bwidth = width;
    this.bheight = height;
    this.imgs = img_srcs;
    this.draw = drawbird;
    this.move=function(){
        //小鸟的运动

        this.by+=10;
    }
}
function drawbird(){
    birdIndex++;
    var image = new Image();
    image.src = this.imgs[birdIndex%3];
    ctb.clearRect(0,0,849,643);
    ctb.drawImage(image,this.bx,this.by,this.bwidth,this.bheight);
    this.move();
}
var birdIndex=0;
//var birds = ["./images/b1.gif","./images/b2.gif","./images/b3.gif",
//    "./images/b4.gif","./images/b5.gif","./images/b6.gif","./images/b7.gif"];
var birds=["./images/0.gif","./images/1.gif","./images/2.gif"];
//var bird = new Bird(180,250,61,51,birds);
var bird = new Bird(180,250,42,32,birds);
function creatbird(){
    bird.draw();
    document.onkeyup = keyup;
    calculator();
}
//var birdtime=setInterval(creatbird,80);
//keyup
function keyup(e){
    var e = e||event;
    var currKey = e.keyCode||e.which||e.charCode;
    switch (currKey){
        case 32:
            bird.by-= 60;
            break;
    }
}
// 碰撞
var pipe_height=150;
var score = 0;
var isScore = false;
var birdstate='true';
//分数小于3
var lowscore=document.getElementById('lowscore');
var ospan=lowscore.getElementsByTagName('span')[0];
var oget=document.getElementById('get');
    oget.addEventListener('click',restart,false);
function restart(){
    mycan();
    lowscore.style.display='none';
    creatmycan();
    bgmusic();
}
//分数等于4/10时弹出优惠券
var quan=document.getElementById('quan');
var jiesu=document.getElementById('jiesu');
var ospan2=quan.getElementsByTagName('span')[0];
var ospa=quan.getElementsByTagName('span')[1];
var money=quan.getElementsByTagName('section')[0];
var goon=document.getElementById('goon');
goon.addEventListener('click',goongame,false);
jiesu.addEventListener('click',stgame,false);
function goongame(){
    var obgsou=document.getElementById('bgsou');
    if(obgsou==undefined||obgsou==null){
        bgmusic();
    }
    quan.style.display='none';
    pause.style.display='none';
    if(score=='mm'){
        setTimeout('score=5',2800);
    }if(score=='nn'){
        setTimeout('score=11',2800);
    }
    creatmycan();
}
//领取一张券后死了
var over=document.getElementById('over');
var ospan3=over.getElementsByTagName('span')[0];
var oh1=over.getElementsByTagName('h1')[0];
var stopgame=document.getElementById('stopgame');
stopgame.addEventListener('click',stgame,false);
function stgame(){
    mycan();
    over.style.display='none';
    mengban.style.display='none';
    quan.style.display='none';
    pause.style.display='none';
    lowscore.style.display='none';
}
function calculator(){
    if(bird.by>=535||((bird.bx+bird.bwidth>up_pipe.px)&&(bird.by>up_pipe.py)&&(bird.bx+bird.bwidth<up_pipe.px+up_pipe.pwidth)&&(bird.by<up_pipe.py+up_pipe.pheight))||
        ((bird.bx+bird.bwidth>up_pipe.px)&&(bird.by>up_pipe.py)&&(bird.bx+bird.bwidth<up_pipe.px+up_pipe.pwidth)&&(	bird.by<up_pipe.py+up_pipe.pheight))||
        ((bird.bx>down_pipe.px)&&(bird.by>down_pipe.py)&&(bird.bx<down_pipe.px+down_pipe.pwidth)&&(bird.by<down_pipe.py+down_pipe.pheight))||
        ((bird.bx>down_pipe.px)&&(bird.by+bird.bheight>down_pipe.py)&&(bird.bx<down_pipe.px+down_pipe.pwidth)&&(bird.by+bird.bheight<down_pipe.py+down_pipe.pheight))){
        del();
        birmusic();diemusic();
        setTimeout(delbird,500);
        setTimeout(deldie,1000);

        clearInterval(pipetime);
        clearInterval(birdtime);
       var tim= setInterval(diebird,10);
        function diebird(){
            ctb.clearRect(0,0,849,643);
            var img = new Image();
            img.src='./images/die1.png';
            ctb.drawImage(img,0,0,41,31,bird.bx,bird.by,41,31);
            bird.by+=10;
            if(bird.by>=535){
               clearInterval(tim);
            }
            ctb.stroke();
        }
        clearInterval(groundtime);
        birdstate='false';
        if(score<=3&&birdstate=='false'){
          lowscore.style.display='block';
            ospan.innerHTML="You got "+score+"!";}
        if((score>=5&&score<11&&birdstate=='false')||(score=='mm'&&birdstate=='false')){
             over.style.display='block';
            ospan3.innerHTML="游戏结束";
            oh1.innerHTML='在本次游戏中您获得一张优惠券';}
        if((score>=11&&birdstate=='false')||(score=='nn'&&birdstate=='false')){
            over.style.display='block';
            ospan3.innerHTML="游戏结束";
            oh1.innerHTML='在本次游戏中您获得二张优惠券';}
        return;}
    if(up_pipe.px+up_pipe.pwidth>0){
        up_pipe.px -= velocity;
        down_pipe.px -= velocity;
    }else{
        up_pipe.px = 450;
        down_pipe.px = 450;
        up_pipe.pheight = 100+Math.random()*200;
        down_pipe.py = up_pipe.pheight+pipe_height;
        down_pipe.pheight = 560-down_pipe.py;
        isScore = true;
    }
    if(isScore && bird.bx>up_pipe.px+up_pipe.pwidth){
        score+=1;
        isScore = false;
    }
    if(score==4){
        clearInterval(birdtime);
        clearInterval(backtime);
        clearInterval(pipetime);
        clearInterval(groundtime);
        quan.style.display='block';
        ospan2.innerHTML="恭喜您获得";
        money.style.backgroundImage='url("./images/money1.png")';
        score='mm';
        ospa.innerHTML='还有惊喜等着您哦';
    }
    if(score==10){
        clearInterval(birdtime);
        clearInterval(backtime);
        clearInterval(pipetime);
        clearInterval(groundtime);
        quan.style.display='block';
        money.style.backgroundImage='url("./images/money2.png")';
        ospan2.innerHTML="恭喜您获得";
        score='nn';
        ospa.innerHTML='您今日优惠券已领完';
    }
    ctb.fillStyle = "rgb(255,255,255)";
    ctb.font = "30px Accent";
       if(score>0){
        score%10!==0?ctb.fillText("You got "+score,200,100):ctb.fillText("Great!"+score,200,100);
    }
}
//暂停
var zanting=document.getElementById('zanting');
var pause=document.getElementById('pause');
var pause_goon=document.getElementById('pause_goon');
var pause_jiesu=document.getElementById('pause_jiesu');
zanting.addEventListener('click',zant,false);
pause_goon.addEventListener('click',goongame,false);
pause_jiesu.addEventListener('click',stgame,false);
function zant(){
    del();
    clearInterval(birdtime);
    clearInterval(backtime);
    clearInterval(pipetime);
    clearInterval(groundtime);
    pause.style.display='block';

}
//音频控制







