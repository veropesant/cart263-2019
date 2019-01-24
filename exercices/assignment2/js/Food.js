class Food extends Agent{
  constructor(x,y,minSize, maxSize,vx,vy){
    super(x,y,random(minSize,maxSize),'yellow');
    this.vx=vx;
    this.vy=vy;
    this.minSize=minSize;
    this.maxSize=maxSize;
    this.active=true;
    this.color='yellow';
  }

  update(){
    if(this.x+this.size/2 < 0 || this.x+this.size/2 > width){
      this.vx = -this.vx;
    }
    if(this.y+this.size/2 < 0 || this.y+this.size/2 > height){
      this.vy = -this.vy;
    }
    this.x+=this.vx;
    this.y+=this.vy;
  }

  changeVelocity(){

    this.active=false;
    setTimeout(() => {
      this.vx=random(-10, 10);
      this.vy=random(-10, 10);
      this.active=true;
    }, 3000);
  }

  reset(){
    this.x = random(0,width);
    this.y = random(0,height);
    this.vx = random(-5, 5);
    this.vy = random(-5, 5);
    this.size = random(this.minSize, this.maxSize);
  }

  display(){
    push();
    fill(this.color);
    ellipse(this.x, this.y, this.size, this.size);
    pop();
  }
}
