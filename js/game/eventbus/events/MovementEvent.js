function MovementEvent(time, deltaTime) {
  GameEvent.call(this, time);
  this.deltaTime = deltaTime;

  this.getDeltaTime = function() {
    return this.deltaTime;
  }
}