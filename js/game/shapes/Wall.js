function Wall(width, height, depth, x, y, z, textureImage, opacity, transparent) {
  this.width = width;
  this.height = height;
  this.depth = depth;
  this.x = x;
  this.y = y;
  this.z = z;
  this.textureImage = textureImage;
  this.opacity = opacity;
  this.transparent = transparent;

  this.createShape = function() {
    var geometry = new THREE.BoxGeometry( this.width, this.height, this.depth );
    //var material = new THREE.MeshPhongMaterial( { color: this.color } );
    var loader = new THREE.TextureLoader();
    var texture = loader.load(this.textureImage);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set( 6, 6 );
    var material = new THREE.MeshBasicMaterial({
      map: texture,
      opacity: this.opacity,
			transparent: this.transparent
    });
    var shape = new THREE.Mesh( geometry, material );
    //shape.castShadow = true;
    //shape.receiveShadow = false;
    shape.position.x = this.x;
    shape.position.y = this.y;
    shape.position.z = this.z;

    return shape; 
  }

  this.shape = this.createShape();

  this.getWidth = function() {
    return this.width;
  }

  this.getHeight = function() {
    return this.height;
  }

  this.getDepth = function() {
    return this.depth;
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

  this.getShape = function() {
    return this.shape;
  }

  this.move = function(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.shape.position.x = x;
    this.shape.position.y = y;
    this.shape.position.z = z;
  }
}