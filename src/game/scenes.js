game.module(
  'game.scenes'
)
.body(function() {

  game.createScene('Main', {
    score: 0,
    _scoreText: undefined,

    init: function() {
      this.score = game.storage.get('score', 0);
      this.updateScore(+0);

      var text = new game.BitmapText('+1', { font: 'volter' });
      text.cacheAsBitmap = true;

      var emitter = this._tapEmitter = new game.Emitter();

      emitter.container = this.stage;
      emitter.textures.push(text._cachedSprite.texture);
      emitter.position.set(game.system.width / 2, game.system.height / 2);
      emitter.speed = 100;
      emitter.speedVar = 90;

      emitter.rate = 100;
      emitter.count = -1;

      emitter.endAlpha = 0;
      emitter.angleVar = Math.PI;

      this.addEmitter(emitter);
    },

    mousedown: function(e) {
      this.updateScore(+1);
      this._tapEmitter.position.set(e.global.x, e.global.y);
      this._tapEmitter.emit(1);
    },

    updateScore: function(score) {
      this.score += score;
      game.storage.set('score', this.score);

      if (typeof this._scoreText == 'undefined') {
        this._scoreText = new game.BitmapText(this.score, { font: 'volter' });
        this._scoreText.addTo(this.stage);
      }

      this._scoreText.setText(this.score.toString());
      this._scoreText.updateTransform();
      this._scoreText.position.set(
        (game.system.width - this._scoreText.textWidth) / 2,
        50
      );
    },
  });

});
