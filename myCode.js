var sketchProc=function(processingInstance){ with (processingInstance){


var scw=400;
var sch=400;
var draww=400;
var drawh=400;
var centerx=scw/2;
var centery=sch/2;
size(scw,sch);

frameRate(30);
 
/** Create a variable to easily handle the status of the mouse
0=not pressed
1=just pressed
2=mouse held
3=mouse just released
*/

var mouseIsPressed=false;
var mouseStatus=0;

var mousePressed=function(){
    mouseIsPressed=true;
};
var mouseReleased=function(){mouseIsPressed=false;};







var drawBox = function(x, y, w, h, heading,col) {
    noStroke();
    fill(50, 50, 50, 50);
    rect(x+2, y+2, w, h, 8);
    if(col!==undefined){
        fill(col);
    } else {
        fill(255, 255, 255, 230);
    }
    rect(x, y, w, h, 8);
    if(heading!==undefined){
        fill(10, 10, 10);
        text(heading, x+10, y+16);
    }
};


var mouseStatus=0;

var updateMouseStatus=function(){
    if(mouseStatus===0){
        if(mouseIsPressed){
            mouseStatus=1;
        }
    } else if(mouseStatus===1){
        mouseStatus=2;
    } else if(mouseStatus===2){
        if(!mouseIsPressed){
            mouseStatus=3;
        }
    } else if(mouseStatus===3){
        mouseStatus=0;
    }
};

var state=0; //0=unclicked, 1=new particle.
var k=4;
var scaleval=100;

var particlelist=[];
var newParticle=function(x,y,velx,vely){
    var x2=(x-200)/scaleval;
    var y2=(y-200)/scaleval;
    var r=sqrt(x2*x2+y2*y2);
    var E=-k/r+0.5*(velx*velx+vely*vely);
    var M=x2*vely-y2*velx;
    var ecc=sqrt(1+2*E*M*M/(k*k));
    var par=M*M/k;
    var phi=atan2(y2,x2);
    var tmp=atan2((x2*velx+y2*vely)*par/(M*ecc*r),(par/r-1)/ecc);
    
    var phi0=atan2(y2,x2)-tmp;
    return {phi:phi,phi0:phi0,E:E,eccentricity:ecc,parameter:par,M:M};
};

var drawParticle=function(p){
    if(p.eccentricity<=1){
        var n=100;
        var i=0;
        var phi=i*2*3.141592/n;
        var c=cos(phi);
        var s=sin(phi);
        var r=p.parameter/(1+p.eccentricity*cos(phi-p.phi0));
        var lastx=r*c*scaleval+200;
        var lasty=r*s*scaleval+200;
        
        for(i=1;i<=n;i++){
            phi=i*2*3.141592/n;
            c=cos(phi);
            s=sin(phi);
            r=p.parameter/(1+p.eccentricity*cos(phi-p.phi0));
        var newx=r*c*scaleval+200;
        var newy=r*s*scaleval+200;
            line(lastx,lasty,newx,newy);
            lastx=newx;
            lasty=newy;
        }
        
        var lastx=200;
        var lasty=0;
    } else if(p.eccentricity>1){
        var n=100;
        if(p.eccentricity>8){
            n=300;
        }
        var i=0;
        var angfrom=p.phi0-acos(-1/p.eccentricity);
        var angto=p.phi0+acos(-1/p.eccentricity);
        var phi=i*(angto-angfrom)/n+angfrom;
        var c=cos(phi);
        var s=sin(phi);
        var r=p.parameter/(1+p.eccentricity*cos(phi-p.phi0));
        var lastx=r*c*scaleval+200;
        var lasty=r*s*scaleval+200;
        
        for(i=1;i<=n;i++){
            phi=i*(angto-angfrom)/n+angfrom;
            c=cos(phi);
            s=sin(phi);
            r=p.parameter/(1+p.eccentricity*cos(phi-p.phi0));
        var newx=r*c*scaleval+200;
        var newy=r*s*scaleval+200;
            line(lastx,lasty,newx,newy);
            lastx=newx;
            lasty=newy;
        }
        
        var lastx=200;
        var lasty=0;
        
    }
    var c=cos(p.phi);
    var s=sin(p.phi);
    var r=p.parameter/(1+p.eccentricity*cos(p.phi-p.phi0));
    var lastx=r*c*scaleval+200;
    var lasty=r*s*scaleval+200;
    stroke(0,0,0);
    ellipse(lastx,lasty,5,5);
};

background(255, 255, 255);
var x=242;var y=201;
var vx=0;
var vy=3.36;
particlelist[particlelist.length]=newParticle(x,y,vx,vy);
var draw= function() {
    background(255, 255, 255);
    for(var i=0;i<particlelist.length;i++){
        fill((200*(i+1))%255, (100*(i+1))%255, (900*(i+2))%255);
        stroke((200*(i+1))%155, (200*(i+1))%155, (200*(i+1))%155);
        var p=particlelist[i];
        drawParticle(p);
        var r=p.parameter/(1+p.eccentricity*cos(p.phi-p.phi0));
        particlelist[i].phi+=p.M/(r*r)*0.01;
    }
    if(state===1){
        vx=(mouseX-x)/50.0;
        vy=(mouseY-y)/50.0;
        stroke(0,0,0);
        line(x,y,mouseX,mouseY);
        particlelist[particlelist.length-1]=newParticle(x,y,-vx,-vy);
    }
};

var mouseClicked=function(){
    if(state===0){
        state=1;
        x=mouseX;
        y=mouseY;
        particlelist[particlelist.length]=newParticle(x,y,0.1,0.1);
    } else if(state===1){
        state=0;
    }
    
};

}};
