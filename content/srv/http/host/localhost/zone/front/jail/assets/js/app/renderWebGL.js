/*
Copyright (C) 2016  Jimmy LATOUR
http://labodudev.fr
*/

"use strict"

define(["app/config", "app/player"], function (config, player) {
  function renderWebGL() {}

  renderWebGL.prototype = {
    c: undefined,

    setContext: function(c) {
      this.c = c;
    },

    cleanScreen: function() {
      this.c.enable(this.c.SCISSOR_TEST);

      this.c.scissor(0, 0, config.screenWidth, config.screenHeight)

      this.c.clearColor(245, 251, 255, 1);
      this.c.clear(this.c.COLOR_BUFFER_BIT);

      this.c.disable(this.c.SCISSOR_TEST);
    },

    drawCircle: function (centerX, centerY, radius, sides) {
    },

    drawGrid: function () {
    },

    drawBorder: function () {
    },

    drawText: function (text, x, y) {
    }
  };

  return new renderWebGL;
});
