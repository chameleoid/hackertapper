game.module(
  'game.objects'
)
.require(
  'engine.three'
)
.body(function() {

  game.createClass('Cube', 'Three', {
    init: function() {
      this._super();

      this.mesh = new game.THREE.Mesh(
        new game.THREE.BoxGeometry(150, 150, 150),
        new game.THREE.MeshNormalMaterial()
      );

      this.scene.add(this.mesh);

      this.sprite.interactive = true;

      this.gl = this.renderer.getContext();

      this.sprite.tap =
      this.sprite.mousedown = (function(e) {
        var pixelData = new Uint8Array(4);
        var gl = this.gl;

        gl.readPixels(
          e.swipeX, game.system.height - e.swipeY, 1, 1,
          gl.RGBA, gl.UNSIGNED_BYTE, pixelData
        );

        if (pixelData[3] !== 0 && typeof this.mousedown == 'function') {
          this.mousedown(e);
        }
      }).bind(this);
    },

    update: function() {
      this._super();

      this.mesh.rotation.x += 0.005;
      this.mesh.rotation.y += 0.01;
    },
  });

});
