/*
Copyright (C) 2016  Jimmy LATOUR
http://labodudev.fr
*/

"use strict"

define(["app/config", "app/utils"], function (config, utils) {
  function player() {}

  player.prototype = {
    numberVisibleSegments: 0,
    x: Math.floor(Math.random() * config.gameWidth - 20) + 20,
    y: Math.floor(Math.random() * config.gameHeight - 20) + 20,
    s: 1,
    a: Math.floor(Math.random() * 360) + 0,
    d: 0,
    ls: [],
    lp: [],
    n: 0,

    drawPlayer: function (display) {
      var start = {
        x: this.x - (config.screenWidth / 2),
        y: this.y - (config.screenHeight / 2)
      };

      var x = 0;
      var y = 0;
      var lastX = 0;
      var lastY = 0;

      var headX = this.x - start.x;
      var headY = this.y - start.y;

      headX = utils.valueInRange(-this.x - this.x + config.screenWidth/2, config.gameWidth - this.x + config.gameWidth - this.x + config.screenWidth/2, headX);
      headY = utils.valueInRange(-this.y - this.y + config.screenHeight/2, config.gameHeight - this.y + config.gameHeight - this.y + config.screenHeight/2 , headY);

      display.g.lineWidth = 2;
      display.g.strokeStyle = '#003300';
      display.g.fillStyle = '#40d47e';
      display.drawCircle(headX, headY, config.radius, 20);
      display.g.stroke();

      display.g.fillStyle = '#e74c3c';
      this.numberVisibleSegments = 0;
      for (var i = 0; i < this.ls.length; i++) {
        x = this.lp[this.ls[i]].x - start.x;
        y = this.lp[this.ls[i]].y - start.y;
        x = utils.valueInRange(-this.x - this.x + config.screenWidth/2, config.gameWidth - this.x + config.gameWidth - this.x + config.screenWidth/2, x);
        y = utils.valueInRange(-this.y - this.y + config.screenHeight/2, config.gameHeight - this.y + config.gameHeight - this.y + config.screenHeight/2 , y);

        if(x > headX - config.screenWidth/2 - 20 &&
          x < headX + config.screenWidth/2 + 20 &&
          y > headY - config.screenHeight/2 - 20 &&
          y < headY + config.screenHeight/2 + 20) {
          this.numberVisibleSegments++;
          display.drawCircle(x, y, config.radius, 20);
          display.g.stroke();
        }
      }
    },

    movePlayer: function () {
      if (this.d == config.KEY_LEFT)
        this.a -= config.speedAngle;
      if (this.d == config.KEY_RIGHT)
        this.a += config.speedAngle;

      this.x += config.speed * Math.cos(this.a * Math.PI / 180);
      this.y += config.speed * Math.sin(this.a * Math.PI / 180);

      var borderCalc = config.radius / 3;

      if (this.x > config.gameWidth - borderCalc)
        this.x = borderCalc;
      if (this.y > config.gameHeight - borderCalc)
        this.y = borderCalc;
      if (this.x < borderCalc)
        this.x = config.gameWidth - borderCalc;
      if (this.y < borderCalc)
        this.y = config.gameHeight - borderCalc;

      if (this.lp.length > 0) {
        var part = this.lp.pop();
        part.x = this.x;
        part.y = this.y,
        this.lp.unshift(part);
      }
    },

    generatePath: function () {
  		var lastX = this.ls.length == 0 ? this.x : this.lp[this.ls[this.ls.length - 1]].x;
  		var lastY = this.ls.length == 0 ? this.y : this.lp[this.ls[this.ls.length - 1]].y;
  		for(var i = this.ls.length * (20 / config.speed); i < (this.n * (20 / config.speed)) + 1; i++) {
  			if( i % (20 / config.speed) == 0 && i != this.ls.length * (20 / config.speed) )
  				this.ls.push(i);

  			this.lp[i] = { x: lastX, y: lastY };
  		}
  	}
  }

  player.prototype.generatePath();

  return new player;
});
