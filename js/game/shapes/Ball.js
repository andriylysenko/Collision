function Ball(radius, x, y, z, textureImage, vx, vy, vz, mass) {
  this.radius = radius;
  this.x = x;
  this.y = y;
  this.z = z;
  this.textureImage = textureImage;
  this.vx = vx;
  this.vy = vy;
  this.vz = vz;
  this.mass = mass;
  this.directionChanges = 0;
  this.texturedMaterialCache = {};

  this.createShape = function() {
    var geometry = new THREE.SphereGeometry( this.radius, 32, 32 );
    var loader = new THREE.TextureLoader();
    var texture = loader.load(this.textureImage);
    //var material = new THREE.MeshLambertMaterial( {color: this.color} );
    var material = new THREE.MeshBasicMaterial({
      map: texture,
    });
    this.texturedMaterialCache[this.textureImage] = material;

    var shape = new THREE.Mesh( geometry, material );

    shape.castShadow = true;
    shape.receiveShadow = false;
    shape.position.x = this.x;
    shape.position.y = this.y;
    shape.position.z = this.z;

    return shape; 
  }

  this.shape = this.createShape();

  this.getRadius = function() {
    return this.radius;
  }

  this.getX = function() {
    return this.x;
  }

  this.getY = function() {
    return this.y;
  }

  this.getZ = function() {
    return this.z;
  }

  this.getVx = function() {
    return this.vx;
  }

  this.getVy = function() {
    return this.vy;
  }

  this.getVz = function() {
    return this.vz;
  }

  this.getMass = function() {
    return this.mass;
  }

  this.getShape = function() {
    return this.shape;
  }

  this.getDirectionChanges = function() {
    return this.directionChanges;
  }

  this.updateTexture = function(textureImage) {
    var material = null;
    if (textureImage in this.texturedMaterialCache) {
      material = this.texturedMaterialCache[textureImage];
    } else {
      this.textureImage = textureImage;
      var loader = new THREE.TextureLoader();
      var texture = loader.load(this.textureImage);
      var material = new THREE.MeshBasicMaterial({
        map: texture,
      });
    }

    this.shape.material = material;
  }

  this.move = function(deltaTime) {
    this.x += this.vx * deltaTime;
    this.y += this.vy * deltaTime;
    this.z += this.vz * deltaTime;

    this.shape.position.x = this.x;
    this.shape.position.y = this.y;
    this.shape.position.z = this.z;
  }

  this.changeDirection = function(vx, vy, vz) {
    this.vx = vx;
    this.vy = vy;
    this.vz = vz;
    this.directionChanges++;
  }

}