game.module(
  'game.extensions'
)
.require(
  'engine.three'
)
.body(function() {

  game.createClass('Three', {
    init: function() {
      var renderer = new game.THREE.WebGLRenderer({ alpha: true });
      renderer.setSize(game.config.system.width, game.config.system.height);

      this.renderer = renderer;

      this.canvas = this.renderer.domElement;

      this.baseTexture = new game.BaseTexture(this.canvas);
      this.texture = new game.Texture(this.baseTexture);
      this.sprite = new game.Sprite(this.texture);
      this.sprite.fixedToCamera = true;

      this.scene = new game.THREE.Scene();

      this.camera = new game.THREE.PerspectiveCamera(
        70, game.config.system.width / game.config.system.height, 1, 1000
      );

      this.camera.position.z = 400;
    },

    update: function() {
      this.renderer.render(this.scene, this.camera);
    },
  });

});
