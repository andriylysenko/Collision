function CollisionGame() {
  this.scene = null;
  this.camera = null;
  this.controls = null;
  this.renderer = null;
  this.vwalls = [];
  this.hwalls = [];
  this.swalls = [];
  this.balls = [];
  this.controlledBall = null;

  this.bus = null;
  this.events = null;

  this.gameTime = 0;

  this.init = function() {
    this.scene = this.createScene();
    this.camera = this.createCamera();
    this.renderer = this.createRenderer();
    this.controls = this.createCameraControls(this.camera, this.renderer);
    this.scene.add(this.createLight(0, 0, 0));
    this.scene.add(this.createLight(0, 0, 140));
    this.scene.add(this.createLight(140, 140, 0));
    this.scene.add(this.createLight(-140, -140, 0));

    document.body.appendChild( this.renderer.domElement );

    this.vwalls.push(new Wall(0.1, 80.1, 80.1, -40.1, 0.0, 0.0, 'texture/cube/brick/photos_2015_09_18_fst_7348gmdigtk.jpg', 1, false));
    this.vwalls.push(new Wall(0.1, 80.1, 80.1, 40.1, 0.0, 0.0, 'texture/cube/brick/photos_2015_09_18_fst_7348gmdigtk.jpg', 1, false));
    this.hwalls.push(new Wall(80.1, 0.1, 80.1, 0.0, 40.1, 0.0, 'texture/cube/brick/photos_2015_09_18_fst_7348gmdigtk.jpg', 1, false));
    this.hwalls.push(new Wall(80.1, 0.1, 80.1, 0.0, -40.1, 0.0, 'texture/cube/brick/photos_2015_09_18_fst_7348gmdigtk.jpg', 1, false));
    this.swalls.push(new Wall(80.1, 80.1, 0.1, 0.0, 0.0, -40.1, 'texture/cube/brick/photos_2015_09_18_fst_7348gmdigtk.jpg', 1, false));
    this.swalls.push(new Wall(80.1, 80.1, 0.1, 0.0, 0.0, 40.1, 'texture/cube/brick/photos_2015_09_18_fst_7348gmdigtk.jpg', 0.4, true));
    this.vwalls.concat(this.hwalls).concat(this.swalls).forEach(wall => this.scene.add(wall.getShape()));

    for (var i = 0; i < 20; i++) {
      this.balls.push(new Ball(4, Math.random() * 60 - 30, Math.random() * 60 - 30, Math.random() * 60 - 30, 'texture/ball/ball1.png', Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1, 2.0));
    }
    this.controlledBall = new Ball(4, 0, 0, 0, 'texture/ball/ball2.jpeg', 0.4, 0.4, 0.4, 2.0);
    this.balls.push(this.controlledBall);
    this.balls.forEach(ball => this.scene.add(ball.getShape()));

    this.events = new PriorityQueue({ comparator: (event1, event2) => { return event1.getTime() - event2.getTime() }})

    this.bus = new EventBus();
    this.bus.subscribe('main_events', new Predicate((event) => event instanceof TickerEvent), new TickerEventListener(this.events));
    this.bus.subscribe('main_events', new Predicate((event) => event instanceof MovementEvent), new MovementEventListener(this.balls));
    this.bus.subscribe("main_events", new Predicate((event) => event instanceof PredictionEvent), new PredictionEventListener(this.events, this.vwalls, this.hwalls, this.swalls, this.balls));
    this.bus.subscribe('main_events', new Predicate((event) => event instanceof BallToVerticalWallCollisionEvent || event instanceof BallToHorizontalWallCollisionEvent || event instanceof BallToSideWallCollisionEvent), new BallToWallCollisionEventListener(this.events, this.controlledBall, this.balls));
    this.bus.subscribe('main_events', new Predicate((event) => event instanceof BallToBallCollisionEvent), new BallToBallCollisionEventListener(this.events, this.controlledBall, this.balls));
    this.bus.subscribe('main_events', new Predicate((event) => event instanceof BallCollisionReactionEvent), new BallCollisionReactionEventListener());
    this.bus.subscribe('main_events', new Predicate((event) => event instanceof ControlledBallChangeDirectionEvent), new ControlledBallChangeDirectionEventListener(this.events, this.balls, this.vwalls, this.hwalls, this.swalls));
    

    // start the game
    this.balls.forEach(ball => this.bus.publish('main_events', new PredictionEvent(0, ball)));
    this.bus.publish('main_events', new TickerEvent(0));
  }

  this.createScene = function() {
    return new THREE.Scene();
  }

  this.createCamera = function() {
    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    camera.position.z = 50;
    return camera;
  }

  this.createCameraControls = function(camera, renderer) {
    return new THREE.OrbitControls( camera, renderer.domElement );
  }

  this.createRenderer = function() {
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    return renderer;
  }

  this.createLight = function(x, y, z) {
    var light = new THREE.PointLight( 0xffffff, 1 );
    light.position.set( x, y, z );
    light.castShadow = true;
    light.shadow.mapSize.width = 512;
    light.shadow.mapSize.height = 512;
    light.shadow.camera.near = 0.5;
    light.shadow.camera.far = 500;
    return light;
  }  

  this.loop = function() {
    var event = this.dequeue(this.events);
    while (event) {
      if (event.isValid()) {
        this.bus.publish('main_events', new MovementEvent(event.getTime(), event.getTime() - this.gameTime));
        this.bus.publish('main_events', event);
        this.gameTime = event.getTime();
        if (event instanceof TickerEvent) {
          break;
        }
      }
      event = this.dequeue(this.events);
    }

    this.controls.update();
    this.renderer.render( this.scene, this.camera );
  }

  this.dequeue = function(events) {
    var event = null;
    try {
      event = events.dequeue();
    } catch(e) {
      console.log('no events to process');
    }
    return event;
  }
}