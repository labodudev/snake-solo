/*
Copyright (C) 2016  Jimmy LATOUR
http://labodudev.fr
*/

"use strict"

define(['app/config', 'app/player', 'app/foods', 'app/utils', 'app/debug'], function (config, player, foods, utils, debug) {
  function display() {}

  display.prototype = {
    context: "2d",

    getDisplay: function() {
      this.c = document.getElementById("csv");
      this.c.width = config.screenWidth;
      this.c.height = config.screenHeight;
      this.g = this.c.getContext("2d");
    },

    animationFrameLoop: function () {
      setTimeout(function () {
        requestAnimationFrame(display.prototype.animationFrameLoop);
        display.prototype.renderLoop();
      }, 1000 / config.fps);
    },

    renderLoop: function () {
      this.g.fillStyle = "#f2fbff";
      this.g.fillRect(0, 0, config.screenWidth, config.screenHeight);

      this.drawGrid();
      this.drawBorder();
      foods.drawFoods(this);
      player.drawPlayer(this);
      debug.draw(this);
    },

    drawCircle: function (centerX, centerY, radius, sides) {
      var theta = 0;
      var x = 0;
      var y = 0;

      this.g.beginPath();
      for (var i = 0; i < sides; i++) {
        theta = (i / sides) * 2 * Math.PI;
        x = centerX + radius * Math.sin(theta);
        y = centerY + radius * Math.cos(theta);
        this.g.lineTo(x, y);
      }
      this.g.closePath();
      this.g.fill();
    },

    drawGrid: function () {
      this.g.lineWidth = 1;
      this.g.strokeStyle = "black";
      this.g.globalAlpha = 0.15;
      this.g.beginPath();

      for (var x = config.xOffset - player.x; x < config.screenWidth; x += config.screenHeight / 18) {
        this.g.moveTo(x, 0);
        this.g.lineTo(x, config.screenHeight);
      }

      for (var y = config.yOffset - player.y; y < config.screenHeight; y += config.screenHeight / 18 ) {
        this.g.moveTo(0, y);
        this.g.lineTo(config.screenWidth, y);
      }

      this.g.stroke();
      this.g.globalAlpha = 1;
    },

    drawBorder: function () {
      this.g.lineWidth = 1;
      this.g.strokeStyle = 'black';

      if (player.x <= config.screenWidth/2) {
        this.g.beginPath();
        this.g.moveTo(config.screenWidth/2 - player.x, 0 ? player.y > config.screenHeight/2 : config.screenHeight/2 - player.y);
        this.g.lineTo(config.screenWidth/2 - player.x, config.gameHeight + config.screenHeight/2 - player.y);
        this.g.stroke();
      }

      if (player.y <= config.screenHeight/2) {
        this.g.beginPath();
        this.g.moveTo(0 ? player.x > config.screenWidth/2 : config.screenWidth/2 - player.x, config.screenHeight/2 - player.y);
        this.g.lineTo(config.gameWidth + config.screenWidth/2 - player.x, config.screenHeight/2 - player.y);
        this.g.stroke();
      }

      if (config.gameWidth - player.x <= config.screenWidth/2) {
        this.g.beginPath();
        this.g.moveTo(config.gameWidth + config.screenWidth/2 - player.x, config.screenHeight/2 - player.y);
        this.g.lineTo(config.gameWidth + config.screenWidth/2 - player.x, config.gameHeight + config.screenHeight/2 - player.y);
        this.g.stroke();
      }

      if (config.gameHeight - player.y <= config.screenHeight/2) {
        this.g.beginPath();
        this.g.moveTo(config.gameWidth + config.screenWidth/2 - player.x, config.gameHeight + config.screenHeight/2 - player.y);
        this.g.lineTo(config.screenWidth/2 - player.x, config.gameHeight + config.screenHeight/2 - player.y);
        this.g.stroke();
      }
    }
  };

  display.prototype.getDisplay();

  return new display;
});

(function() {
  var lastTime = 0;
  var vendors = ['ms', 'moz', 'webkit', 'o'];
  for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
    || window[vendors[x]+'CancelRequestAnimationFrame'];
  }

  if (!window.requestAnimationFrame)
    window.requestAnimationFrame = function(requestCallback, element) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = window.setTimeout(function() { requestCallback(currTime + timeToCall); }, timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };

  if (!window.cancelAnimationFrame)
    window.cancelAnimationFrame = function(id) { clearTimeout(id); };
}());
