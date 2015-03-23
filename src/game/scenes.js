game.module(
  'game.scenes'
)
.body(function() {

  game.createScene('Main', {
    score: 0,
    _scoreText: undefined,

    tapScore: 1,
    _tapText: undefined,
    _tapEmitter: undefined,

    code: '',
    _code: undefined,
    _codeText: undefined,
    _codeOffset: 0,

    init: function() {
      this.score = game.storage.get('score', 0);
      this.updateScore(+0);

      this._code = game.getJSON('code.json');
      this._codeText = new game.BitmapText('', { font: 'volter-small' });
      this._codeText.addTo(this.stage);

      this._codeText.updateTransform();
      this._codeText.position.set(
        0,
        game.system.height - this._codeText.textHeight
      );

      this._tapText = new game.BitmapText('+' + this.tapScore, { font: 'volter' });
      this._tapText.cacheAsBitmap = true;

      this._tapEmitter = new game.Emitter({
        container: this.stage,
        speed: 120,
        speedVar: 50,
        angleVar: Math.PI,
        count: -1,
        endAlpha: 0,
        position: {
          x: game.system.width / 2,
          y: game.system.height / 2,
        },
      });

      this._tapEmitter.textures.push(this._tapText._cachedSprite.texture);

      this.addEmitter(this._tapEmitter);

      var codeOffset = 0;
      (function codeTransform() {
        if (codeOffset != this._codeOffset) {
          this._codeText.updateTransform();
          this._codeText.position.set(
            0,
            game.system.height - this._codeText.textHeight
          );
        }

        window.requestAnimationFrame(codeTransform.bind(this));
      }).apply(this);
    },

    mousedown: function(e) {
      this.updateScore(this.tapScore);
      this._tapEmitter.position.set(e.global.x, e.global.y);
      this._tapEmitter.emit(1);

      this.addCode(this.tapScore * 3);
    },

    addCode: function(bytes) {
      // TODO: wrap to start of _code when we reach the end

      this._codeOffset += bytes;

      for (var i=0, o=this._codeOffset, offset=0; i<7; i++) {
        o = this._code.lastIndexOf('\n', o - 1);

        offset = o > 0 ? o : 0;
      }

      this.code = this._code.substr(offset, this._codeOffset - offset);

      this._codeText.setText(this.code);
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
