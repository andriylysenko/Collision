function TickerEventListener(events) {
  EventListener.call(this);
  this.events = events;

  this.onEvent = function(event) {
    var tickerEvent = new TickerEvent(event.getTime() + 1);
    this.events.queue(tickerEvent);
  }
}