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
    },

    update: function() {
      this._super();

      this.mesh.rotation.x += 0.005;
      this.mesh.rotation.y += 0.01;
    },
  });

});
