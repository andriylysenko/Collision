function BallToWallCollisionEvent(time, ball) {
  GameEvent.call(this, time);
  this.ball = ball;
  this.directionChanges = ball.getDirectionChanges();

  this.getBall = function() {
    return this.ball;
  }

  this.isValid = function() {
    return this.directionChanges === this.ball.getDirectionChanges();
  }
}