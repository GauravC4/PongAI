var ball;
var p1;
var p2;
var dumbFactor = 0.3;

function setup() { 
  createCanvas(600, 300);
	frameRate(60);
	ball = new Ball();
	p1 = new Paddle();
	p2 = new Paddle();
	p2.pos.x = width-10;
} 

function draw() { 
  background(0);
	fill(255);
		 if(ball.pos.x<width/2){
		 	ball.move(p1)
			p1.move(ball.pos.y);
		 }
		 else{
		 	ball.move(p2);
			if(random()<dumbFactor){
		 		//do nothing
		 	}else
		 		p2.move(ball.pos.y);
		 }
		//p1.move(ball.pos.y);
		ball.show();
		p1.show();
		p2.show();
	if(frameCount%444 == 0){
		p1.shrink();
		p2.shrink();
	}
	if(ball.destroyed){
		noLoop();
		if(ball.pos.x < 20)
			createP("Player 2 wins!!!");
		else if(ball.pos.x > width-20)
			createP("Player 1 wins!!!");
	}
}

function Ball(){
	this.destoryed = false;
	this.ydev = 5;
	this.xdev = 20;
	this.size = 20;
	this.maxSpeed = 20;
	this.accInc = 0.02;
	this.initSpeed = 5;
	this.pos = createVector(40,height/4);
	this.vel = createVector(random(this.xdev),random(-1*this.ydev,this.ydev)).setMag(this.initSpeed);
	this.acc = createVector(this.accInc,this.accInc);
	
	this.show = function(){
		ellipse(this.pos.x, this.pos.y, this.size, this.size);
	}
	
	this.move = function(p){
		this.vel.add(this.acc).limit(this.maxSpeed);
		
		if(this.pos.y > p.pos.y && 
			 this.pos.y <(p.pos.y+p.size)){
			
			if(this.pos.x < this.size|| 
				 this.pos.x > width-this.size){
				
				this.vel.x *= -1;
				this.acc.x *= -1;
				this.vel.y = random(-1*this.ydev,this.ydev);
			}
		}
		else if(this.pos.x<5 || this.pos.x>width-5){
				this.destroyed = true;
		}
		
		if(this.pos.y<this.size/2 || this.pos.y>height-this.size/2){
			this.vel.y *= -1;
			this.acc.y *= -1;
		}
		if(!this.destroyed)
			this.pos.add(this.vel);
	}
}

function Paddle(){
	this.size = 100;
	this.speed = 15;
	this.shrinkFactor = 10;
	this.minSize = 30;
	this.pos = createVector(0,height/4);
	
	this.shrink = function(){
		if(this.size>this.minSize){
			this.size -= this.shrinkFactor;
		}
	}
	
	this.show = function(){
		rect(this.pos.x,this.pos.y,10,this.size);
	}
	
	this.move = function(y){
		low = this.pos.y;
		high = this.pos.y+this.size;
		if(y>high-10 && high<height){
			this.pos.y += this.speed;
		}
		if(y<low+10 && low>0){
			this.pos.y -= this.speed;
		}
	}
}
