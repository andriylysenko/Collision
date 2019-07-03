function BallCollisionReactionEventListener() {
  EventListener.call(this);

  this.onEvent = function(event) {
    event.getBall().updateTexture(event.getTextureImage());
  }
}