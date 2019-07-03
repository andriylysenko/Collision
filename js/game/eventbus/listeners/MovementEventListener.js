function MovementEventListener(balls) {
  EventListener.call(this);
  this.balls = balls;

  this.onEvent = function(event) {
    this.balls.forEach(ball => {
      ball.move(event.getDeltaTime());
    })
  }
}