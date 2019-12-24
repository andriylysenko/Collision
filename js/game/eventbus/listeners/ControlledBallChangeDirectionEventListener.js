function ControlledBallChangeDirectionEventListener(eventsQueue, balls, vwalls, hwalls, swalls) {
  EventListener.call(this);
  this.eventsQueue = eventsQueue;
  this.balls = balls;
  this.vwalls = vwalls;
  this.hwalls = hwalls;
  this.swalls = swalls;

  this.onEvent = function(event) {
    var ball = event.getBall();
    var vx = ball.getVx();
    var vy = ball.getVy();
    var vz = ball.getVz();

    var origParams = this.findOptimalDirectionChange(ball, [[vx, vy, vz]]);
    if (origParams.time === undefined || origParams.time > 30) {
      return;
    }

    var pvx = vx === 0 ? 0.4 : vx;
    var pvy = vy === 0 ? 0.4 : vy;
    var pvz = vz === 0 ? 0.4 : vz;
    var possibleDirections = [[-pvx, pvx, 0.5*pvx, -0.5*pvx, 2*pvx, -2*pvx, 0], 
                              [-pvy, pvy, 0.5*pvy, -0.5*pvy, 2*pvy, -2*pvy, 0], 
                              [-pvz, pvz, 0.5*pvz, -0.5*pvz, 2*pvz, -2*pvz, 0]];
    var directionPermutations = [];
    this.computePermutations(possibleDirections, 0, [], directionPermutations);
    directionPermutations = this.getAllowedDirections(ball, directionPermutations);
    if (directionPermutations.length === 0) {
      return;
    }

    console.log('original direction: vx=' + ball.getVx() + ', vy=' + ball.getVy() + ', vz=' + ball.getVz());
    var params = this.findOptimalDirectionChange(ball, directionPermutations);
    if (vx === params.vx && vy === params.vy && vz === params.vz) {
      return;
    }

    console.log('computed direction: ' + JSON.stringify(params));
    ball.changeDirection(params.vx, params.vy, params.vz);
    console.log('ball: x=' + ball.getX() + '; y=' + ball.getY() + '; z=' + ball.getZ());
    this.eventsQueue.queue(new PredictionEvent(event.getTime(), ball));
    if (params.time !== undefined && params.time > 0.5) {
      this.eventsQueue.queue(new ControlledBallChangeDirectionEvent(event.getTime() + params.time / 2.0, ball, this.balls));
    }
  }

  this.findOptimalDirectionChange = function(ball, directionPermutations) {
    var params = {vx: 0, vy: 0, vz: 0, time: 0};
    
    var vx = ball.getVx();
    var vy = ball.getVy();
    var vz = ball.getVz();

    var maxMinTime = 0;
    directionPermutations.forEach(direction => {
      ball.vx = direction[0];
      ball.vy = direction[1];
      ball.vz = direction[2];

      var minTime = 9007199254740992;
      this.balls.forEach(otherBall => {
        var time = new CollisionUtils().timeToHit(ball, otherBall);
        if (time != undefined) {
          if (time < minTime) {
            minTime = time;
          }
        }
      })
      if (minTime > maxMinTime) {
        maxMinTime = minTime;
        params.vx = direction[0];
        params.vy = direction[1];
        params.vz = direction[2];
        params.time = minTime;
      }
    })
    if (params.time === 9007199254740992) {
      params.time = undefined;
    }
    ball.vx = vx;
    ball.vy = vy;
    ball.vz = vz;
    return params;
  }

  this.getAllowedDirections = function(ball, directionPermutations) {
    // for each direction calculate time to hit each wall and if time to hit wall < threshold then this direction is not allowed
    var threshold = 0.5;
    var vx = ball.getVx();
    var vy = ball.getVy();
    var vz = ball.getVz();

    // Todo redesign the code to check if time is undefined for all walls then remove direction from allowed
    var allowedDirections = []
    var k = directionPermutations.length;
    while (k--) {
      var direction = directionPermutations[k];
      ball.vx = direction[0];
      ball.vy = direction[1];
      ball.vz = direction[2];

      var i = 0;
      for (i = 0; i < this.vwalls.length; i++) {
        var wall = this.vwalls[i];
        var time1 = new CollisionUtils().timeToHitVerticalWall(ball, wall);
        if (time1 !== undefined && time1 < threshold) {
          // directionPermutations.splice(k, 1);
          break;
        }
      }
      if (i < this.vwalls.length) {
        continue;
      }

      for (i = 0; i < this.hwalls.length; i++) {
        var wall = this.hwalls[i];
        var time2 = new CollisionUtils().timeToHitHorizontalWall(ball, wall);
        if (time2 !== undefined && time2 < threshold) {
          // directionPermutations.splice(k, 1);
          break;
        }
      }
      if (i < this.hwalls.length) {
        continue;
      }

      for (i = 0; i < this.swalls.length; i++) {
        var wall = this.swalls[i];
        var time3 = new CollisionUtils().timeToHitSideWall(ball, wall);
        if (time3 !== undefined && time3 < threshold) {
          // directionPermutations.splice(k, 1);
          break;
        }
      }
      if (i < this.swalls.length) {
        continue;
      }

      if (time1 === undefined && time2 === undefined && time3 === undefined) {
        //directionPermutations.splice(k, 1);
        continue;
      }
      allowedDirections.push(direction);
    }

    ball.vx = vx;
    ball.vy = vy;
    ball.vz = vz;
    return allowedDirections;
  }

  this.computePermutations = function(possibleDirections, currentIndex, currentResult, result) {
    if (currentIndex === possibleDirections.length) {
      result.push(currentResult.slice());
      return;
    }

    possibleDirections[currentIndex].forEach(element => {
      currentResult.push(element);
      this.computePermutations(possibleDirections, currentIndex + 1, currentResult, result);
      currentResult.pop();
    })
  }
}