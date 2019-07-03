function BallCollisionReactionEvent(time, ball, textureImage) {
  GameEvent.call(this, time);
  this.ball = ball;
  this.textureImage = textureImage;
  this.directionChanges = ball.getDirectionChanges();

  this.getBall = function() {
    return this.ball;
  }

  this.getTextureImage = function() {
    return this.textureImage;
  }

  this.isValid = function() {
    return this.directionChanges === this.ball.getDirectionChanges();
  }
}