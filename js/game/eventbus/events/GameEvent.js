function GameEvent(time) {
  this.time = time;

  this.getTime = function() {
    return this.time;
  }

  this.isValid = function() {
    return true;
  }
}