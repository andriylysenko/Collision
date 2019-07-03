function PredictionEvent(time, ball) {
  GameEvent.call(this, time);
  this.ball = ball;

  this.getBall = function() {
    return this.ball;
  }
}