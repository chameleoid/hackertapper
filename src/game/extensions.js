game.module(
  'game.extensions'
)
.require(
  'engine.three'
)
.body(function() {

  game.createClass('Three', {
    init: function() {
      var renderer = new game.THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        preserveDrawingBuffer: true,
      });

      renderer.setSize(game.system.width, game.system.height);

      this.renderer = renderer;

      this.canvas = this.renderer.domElement;

      this.texture = new game.Texture.fromCanvas(this.canvas);
      this.sprite = new game.Sprite(this.texture);

      this.scene = new game.THREE.Scene();

      this.camera = new game.THREE.PerspectiveCamera(
        70, game.system.width / game.system.height, 1, 1000
      );

      this.camera.position.z = 400;
    },

    update: function() {
      this.renderer.render(this.scene, this.camera);
    },
  });

});
