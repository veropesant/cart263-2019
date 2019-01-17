class Avatar extends Agent{
  constructor(x, y, size, sizeLoss){
    super(x,y,size,'blue');
    this.maxSize=size;
    this.sizeLoss=sizeLoss;
  }

  update(){
    if(this.active){
      //positions the avatar where the mouse is.
      this.x=mouseX;
      this.y=mouseY;

      //makes sure that the size does not exceeds the max size or goes under 0
      this.size=constrain(this.size - this.sizeLoss, 0, this.maxSize);

      //when the size reaches 0, deactivate the avatar
      if(this.size===0){
        this.active=false;
      }
    }
  }

  eat(other){
    if(this.active){
      this.size=constrain(this.size + other.size, 0, this.maxSize);
      other.reset();
    }
  }
}
