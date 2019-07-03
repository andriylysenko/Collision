function PredictionEventListener(events, verticalWalls, horizontalWalls, sideWalls, balls) {
  EventListener.call(this);
  this.events = events;
  this.verticalWalls = verticalWalls;
  this.horizontalWalls = horizontalWalls;
  this.sideWalls = sideWalls;
  this.balls = balls;

  this.onEvent = function(event) {
    this.verticalWalls.forEach(wall => {
      var time = new CollisionUtils().timeToHitVerticalWall(event.getBall(), wall);
      if (time != undefined) {
        this.events.queue(new BallToVerticalWallCollisionEvent(event.getTime() + time, event.getBall()));
      }
    });

    this.horizontalWalls.forEach(wall => {
      var time = new CollisionUtils().timeToHitHorizontalWall(event.getBall(), wall);
      if (time != undefined) {
        this.events.queue(new BallToHorizontalWallCollisionEvent(event.getTime() + time, event.getBall()));
      }
    });

    this.sideWalls.forEach(wall => {
      var time = new CollisionUtils().timeToHitSideWall(event.getBall(), wall);
      if (time != undefined) {
        this.events.queue(new BallToSideWallCollisionEvent(event.getTime() + time, event.getBall()));
      }
    });

    this.balls.forEach(ball => {
      var time = new CollisionUtils().timeToHit(event.getBall(), ball);
      if (time != undefined) {
        this.events.queue(new BallToBallCollisionEvent(event.getTime() + time, event.getBall(), ball));
      }
    })
  }
}