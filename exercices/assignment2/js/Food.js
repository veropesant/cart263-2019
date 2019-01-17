class Food extends Agent{
  constructor(x,y,minSize, maxSize,vx,vy){
    super(x,y,random(minSize,maxSize),'yellow');
    this.vx=vx;
    this.vy=vy;
    this.minSize=minSize;
    this.maxSize=maxSize;
  }
  reset(){
    this.x = random(0,width);
    this.y = random(0,height);
    this.size = random(this.minSize, this.maxSize);
  }
}
