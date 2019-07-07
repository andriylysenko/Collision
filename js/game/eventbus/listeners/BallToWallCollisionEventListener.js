function BallToWallCollisionEventListener(eventsQueue, controlledBall, balls) {
  EventListener.call(this);
  this.eventsQueue = eventsQueue;
  this.controlledBall = controlledBall;
  this.balls = balls;

  this.onEvent = function(event) {
    var ball = event.getBall();
    
    if (event instanceof BallToVerticalWallCollisionEvent) {
      ball.changeDirection(ball.getVx() * (-1), ball.getVy(), ball.getVz());
    } else if (event instanceof BallToHorizontalWallCollisionEvent) {
      ball.changeDirection(ball.getVx(), ball.getVy() * (-1), ball.getVz());
    } else if (event instanceof BallToSideWallCollisionEvent) {
      ball.changeDirection(ball.getVx(), ball.getVy(), ball.getVz() * (-1));
    }

    if (ball !== this.controlledBall) {
      this.eventsQueue.queue(new BallCollisionReactionEvent(event.getTime() + 0.00001, ball, 'texture/ball/ball2.jpeg'));
      this.eventsQueue.queue(new BallCollisionReactionEvent(event.getTime() + 1, ball, 'texture/ball/ball1.png'));
    }

    this.eventsQueue.queue(new PredictionEvent(event.getTime(), ball));
    if (ball !== this.controlledBall) {
      this.eventsQueue.queue(new ControlledBallChangeDirectionEvent(event.getTime(), this.controlledBall, this.balls));
    }
  }
}