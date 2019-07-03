function BallToSideWallCollisionEventListener(bus, events) {
  EventListener.call(this);
  this.bus = bus;
  this.events = events;

  this.onEvent = function(event) {
    var ball = event.getBall();
    ball.changeDirection(ball.getVx(), ball.getVy(), ball.getVz() * (-1));

    this.events.queue(new BallCollisionReactionEvent(event.getTime() + 0.00001, ball, 'texture/ball/ball2.jpeg'));
    this.events.queue(new BallCollisionReactionEvent(event.getTime() + 1, ball, 'texture/ball/ball1.png'));

    bus.publish('main_events', new PredictionEvent(event.getTime(), ball));
  }
}