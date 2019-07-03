function CollisionUtils() {

  this.timeToHit = function(ball1, ball2) {
    if (ball1 === ball2) {
      return undefined;
    }

    var dx  = ball2.getX() - ball1.getX();
    var dy  = ball2.getY() - ball1.getY();
    var dz  = ball2.getZ() - ball1.getZ();
    var dvx = ball2.getVx() - ball1.getVx();
    var dvy = ball2.getVy() - ball1.getVy();
    var dvz = ball2.getVz() - ball1.getVz();

    var discriminant = Math.pow(2 * (dx*dvx + dy*dvy + dz*dvz), 2) - 4 * (dvx*dvx + dvy*dvy + dvz*dvz) * (dx*dx + dy*dy + dz*dz - Math.pow(ball1.getRadius() + ball2.getRadius(), 2));
    if (discriminant < 0) {
      return undefined;
    }
    var t1 = (-2 * (dx*dvx + dy*dvy + dz*dvz) - Math.sqrt(discriminant)) / (2 * (dvx*dvx + dvy*dvy + dvz*dvz));

    if (t1 < 0 || isNaN(t1)) {
      return undefined;
    }

    return t1;
  }

  this.timeToHitVerticalWall = function(ball, wall) {
    var time = undefined;
    if (ball.getVx() > 0) {
        time = ((wall.getX() - wall.getWidth() / 2) - (ball.getX() + ball.getRadius())) / ball.getVx();
    } else if (ball.getVx() < 0) {
        time = ((wall.getX() + wall.getWidth() / 2) + (ball.getRadius() - ball.getX())) / ball.getVx();
    }
    return time >= 0 ? time : undefined;
  }

  this.timeToHitHorizontalWall = function(ball, wall) {
    var time = undefined;
    if (ball.getVy() > 0) {
        time = ((wall.getY() - wall.getHeight() / 2) - (ball.getY() + ball.getRadius())) / ball.getVy();
    } else if (ball.getVy() < 0) {
        time = ((wall.getY() - wall.getHeight() / 2) + (ball.getRadius() - ball.getY())) / ball.getVy();
    }
    return time >= 0 ? time : undefined;
  }

  this.timeToHitSideWall = function(ball, wall) {
    var time = undefined;
    if (ball.getVz() > 0) {
        time = ((wall.getZ() - wall.getDepth() / 2) - (ball.getZ() + ball.getRadius())) / ball.getVz();
    } else if (ball.getVz() < 0) {
        time = ((wall.getZ() + wall.getDepth() / 2) + (ball.getRadius() - ball.getZ())) / ball.getVz();
    }
    return time >= 0 ? time : undefined;
  }

  this.velocitiesAfterBounce = function(ball1, ball2) {
    var dx  = ball2.getX() - ball1.getX();
    var dy  = ball2.getY() - ball1.getY();
    var dz  = ball2.getZ() - ball1.getZ();

    var dvx = ball2.getVx() - ball1.getVx();
    var dvy = ball2.getVy() - ball1.getVy();
    var dvz = ball2.getVz() - ball1.getVz();
    var dvdr = dx*dvx + dy*dvy + dz*dvz;
    var dist = ball1.getRadius() + ball2.getRadius();

    var vx1 = ball1.getVx() - (2 * ball2.getMass() / (ball1.getMass() + ball2.getMass())) * (dvdr * (-dx) / (dist * dist));
    var vy1 = ball1.getVy() - (2 * ball2.getMass() / (ball1.getMass() + ball2.getMass())) * (dvdr * (-dy) / (dist * dist));
    var vz1 = ball1.getVz() - (2 * ball2.getMass() / (ball1.getMass() + ball2.getMass())) * (dvdr * (-dz) / (dist * dist));

    var vx2 = ball2.getVx() - (2 * ball1.getMass()/ (ball1.getMass() + ball2.getMass())) * (dvdr * (dx) / (dist * dist));
    var vy2 = ball2.getVy() - (2 * ball1.getMass()/ (ball1.getMass() + ball2.getMass())) * (dvdr * (dy) / (dist * dist));
    var vz2 = ball2.getVz() - (2 * ball1.getMass()/ (ball1.getMass() + ball2.getMass())) * (dvdr * (dz) / (dist * dist));

    return {vx1: vx1, vy1: vy1, vz1: vz1, vx2: vx2, vy2: vy2, vz2: vz2};
  }
}