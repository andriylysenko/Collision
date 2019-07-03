function BallToBallCollisionEvent(time, ball1, ball2) {
  GameEvent.call(this, time);
  this.ball1 = ball1;
  this.directionChangesBall1 = ball1.getDirectionChanges();
  this.ball2 = ball2;
  this.directionChangesBall2 = ball2.getDirectionChanges();

  this.getBall1 = function() {
    return this.ball1;
  }

  this.getBall2 = function() {
    return this.ball2;
  }

  this.isValid = function() {
    return this.directionChangesBall1 === this.ball1.getDirectionChanges() && this.directionChangesBall2 == this.ball2.getDirectionChanges();
  }
}