function BallToBallCollisionEventListener(bus, events) {
  EventListener.call(this);
  this.bus = bus;
  this.events = events;

  this.onEvent = function(event) {
    var ball1 = event.getBall1();
    var ball2 = event.getBall2();

    var velocities = new CollisionUtils().velocitiesAfterBounce(ball1, ball2);

    ball1.changeDirection(velocities.vx1, velocities.vy1, velocities.vz1);
    ball2.changeDirection(velocities.vx2, velocities.vy2, velocities.vz2);

    this.events.queue(new BallCollisionReactionEvent(event.getTime() + 0.00001, ball1, 'texture/ball/ball2.jpeg'));
    this.events.queue(new BallCollisionReactionEvent(event.getTime() + 1, ball1, 'texture/ball/ball1.png'));
    this.events.queue(new BallCollisionReactionEvent(event.getTime() + 2, ball1, 'texture/ball/ball2.jpeg'));
    this.events.queue(new BallCollisionReactionEvent(event.getTime() + 3, ball1, 'texture/ball/ball1.png'));
    
    this.events.queue(new BallCollisionReactionEvent(event.getTime() + 0.00001, ball2, 'texture/ball/ball2.jpeg'));
    this.events.queue(new BallCollisionReactionEvent(event.getTime() + 1, ball2, 'texture/ball/ball1.png'));
    this.events.queue(new BallCollisionReactionEvent(event.getTime() + 2, ball1, 'texture/ball/ball2.jpeg'));
    this.events.queue(new BallCollisionReactionEvent(event.getTime() + 3, ball1, 'texture/ball/ball1.png'));

    bus.publish('main_events', new PredictionEvent(event.getTime(), ball1));
    bus.publish('main_events', new PredictionEvent(event.getTime(), ball2));
  }
}