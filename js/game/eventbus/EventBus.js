function EventBus() {
  this.subscriptions = {};

  this.subscribe = function(topic, selector, listener) {
    if (!(topic in this.subscriptions)) {
      this.subscriptions[topic] = []
    }
    this.subscriptions[topic].push(new Subscription(selector, listener));
  }

  this.publish = function(topic, event) {
    if (!(topic in this.subscriptions)) {
      return
    }
    this.subscriptions[topic].forEach(subscription => {
      if (subscription.getSelector().test(event)) {
        subscription.getListener().onEvent(event);
      }
    });
  }
}