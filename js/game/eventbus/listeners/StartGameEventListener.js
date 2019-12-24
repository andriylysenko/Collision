function StartGameEventListener(events, balls) {
  EventListener.call(this);
  this.events = events;
  this.balls = balls;

  this.onEvent = function(event) {
    this.balls.forEach(ball => this.events.queue(new PredictionEvent(0, ball)));
    this.events.queue(new TickerEvent(0));
  }
}