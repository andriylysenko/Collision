function EndGameEventListener(events) {
  EventListener.call(this);
  this.events = events;

  this.onEvent = function(event) {
    this.events.clear();

    this.events.queue(new StartGameEvent(0));
  }
}