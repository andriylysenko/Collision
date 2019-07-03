function Subscription(selector, listener) {
  this.selector = selector;
  this.listener = listener;

  this.getSelector = function() {
    return this.selector;
  }

  this.getListener = function() {
    return this.listener;
  }
}