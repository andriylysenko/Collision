function ControlledBallChangeDirectionEvent(time, ball, balls) {
  GameEvent.call(this, time);
  this.ball = ball;
  this.balls = balls;
  this.directionChanges = balls.reduce((total, ball) => total + ball.getDirectionChanges(), 0);

  this.getBall = function() {
    return this.ball;
  }

  this.isValid = function() {
    return this.directionChanges === this.balls.reduce((total, ball) => total + ball.getDirectionChanges(), 0);
  }
}