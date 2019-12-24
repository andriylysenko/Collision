function BallToBallCollisionEventListener(eventsQueue, controlledBall, balls) {
  EventListener.call(this);
  this.eventsQueue = eventsQueue;
  this.controlledBall = controlledBall;
  this.balls = balls;

  this.onEvent = function(event) {
    var ball1 = event.getBall1();
    var ball2 = event.getBall2();

    if (ball1 === this.controlledBall || ball2 === this.controlledBall) {
      this.eventsQueue.queue(new EndGameEvent(event.getTime()));
      alert('Collision with controlled ball! Game time: ' + event.getTime());
      return;
    }

    var velocities = new CollisionUtils().velocitiesAfterBounce(ball1, ball2);

    ball1.changeDirection(velocities.vx1, velocities.vy1, velocities.vz1);
    ball2.changeDirection(velocities.vx2, velocities.vy2, velocities.vz2);

    if (ball1 !== this.controlledBall) {
      this.eventsQueue.queue(new BallCollisionReactionEvent(event.getTime() + 0.00001, ball1, 'texture/ball/ball2.jpeg'));
      this.eventsQueue.queue(new BallCollisionReactionEvent(event.getTime() + 1, ball1, 'texture/ball/ball1.png'));
    }
    if (ball2 !== this.controlledBall) {
      this.eventsQueue.queue(new BallCollisionReactionEvent(event.getTime() + 0.00001, ball2, 'texture/ball/ball2.jpeg'));
      this.eventsQueue.queue(new BallCollisionReactionEvent(event.getTime() + 1, ball2, 'texture/ball/ball1.png'));
    }

    this.eventsQueue.queue(new PredictionEvent(event.getTime(), ball1));
    this.eventsQueue.queue(new PredictionEvent(event.getTime(), ball2));
    if (ball1 !== this.controlledBall && ball2 !== this.controlledBall) {
      this.eventsQueue.queue(new ControlledBallChangeDirectionEvent(event.getTime(), this.controlledBall, this.balls));
    }
  }
}