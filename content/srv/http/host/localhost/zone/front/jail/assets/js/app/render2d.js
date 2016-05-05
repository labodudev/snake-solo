/*
Copyright (C) 2016  Jimmy LATOUR
http://labodudev.fr
*/

"use strict"

define(["app/config", "app/player"], function (config, player) {
  function render2d() {}

  render2d.prototype = {
    c: undefined,

    setContext: function(c) {
      this.c = c;
    },

    cleanScreen: function () {
      this.c.fillStyle = "#f2fbff";
      this.c.fillRect(0, 0, config.screenWidth, config.screenHeight);
    },

    drawCircle: function (centerX, centerY, radius, sides, color) {
      var theta = 0;
      var x = 0;
      var y = 0;

      this.c.lineWidth = 2;
      this.c.strokeStyle = '#003300';
      this.c.fillStyle = color;
      this.c.beginPath();
      for (var i = 0; i < sides; i++) {
        theta = (i / sides) * 2 * Math.PI;
        x = centerX + radius * Math.sin(theta);
        y = centerY + radius * Math.cos(theta);
        this.c.lineTo(x, y);
      }
      this.c.closePath();
      this.c.fill();
      this.c.stroke();
    },

    drawGrid: function () {
      this.c.lineWidth = 1;
      this.c.strokeStyle = "black";
      this.c.globalAlpha = 0.15;
      this.c.beginPath();

      for (var x = config.xOffset - player.x; x < config.screenWidth; x += config.screenHeight / 18) {
        this.c.moveTo(x, 0);
        this.c.lineTo(x, config.screenHeight);
      }

      for (var y = config.yOffset - player.y; y < config.screenHeight; y += config.screenHeight / 18 ) {
        this.c.moveTo(0, y);
        this.c.lineTo(config.screenWidth, y);
      }

      this.c.stroke();
      this.c.globalAlpha = 1;
    },

    drawBorder: function () {
      this.c.lineWidth = 1;
      this.c.strokeStyle = 'black';

      if (player.x <= config.screenWidth/2) {
        this.c.beginPath();
        this.c.moveTo(config.screenWidth/2 - player.x, 0 ? player.y > config.screenHeight/2 : config.screenHeight/2 - player.y);
        this.c.lineTo(config.screenWidth/2 - player.x, config.gameHeight + config.screenHeight/2 - player.y);
        this.c.stroke();
      }

      if (player.y <= config.screenHeight/2) {
        this.c.beginPath();
        this.c.moveTo(0 ? player.x > config.screenWidth/2 : config.screenWidth/2 - player.x, config.screenHeight/2 - player.y);
        this.c.lineTo(config.gameWidth + config.screenWidth/2 - player.x, config.screenHeight/2 - player.y);
        this.c.stroke();
      }

      if (config.gameWidth - player.x <= config.screenWidth/2) {
        this.c.beginPath();
        this.c.moveTo(config.gameWidth + config.screenWidth/2 - player.x, config.screenHeight/2 - player.y);
        this.c.lineTo(config.gameWidth + config.screenWidth/2 - player.x, config.gameHeight + config.screenHeight/2 - player.y);
        this.c.stroke();
      }

      if (config.gameHeight - player.y <= config.screenHeight/2) {
        this.c.beginPath();
        this.c.moveTo(config.gameWidth + config.screenWidth/2 - player.x, config.gameHeight + config.screenHeight/2 - player.y);
        this.c.lineTo(config.screenWidth/2 - player.x, config.gameHeight + config.screenHeight/2 - player.y);
        this.c.stroke();
      }
    },

    drawText: function (text, x, y) {
      display.g.font = "15px Arial";
      display.g.fillStyle = 'black';
      display.render.fillText("Visible foods: " + foods.numberVisibleFoods, 10, 40);
    }
  };

  return new render2d;
});
