/*
Copyright (C) 2016  Jimmy LATOUR
http://labodudev.fr
*/

"use strict"

define(function () {
  function config() {
    this.gameWidth = 5000;
    this.gameHeight = 5000;
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
    this.xOffset = -this.screenWidth;
    this.yOffset = -this.screenHeight;
    this.fps = 90;
    this.logicFps = 120;
    this.radius = 12;
    this.radiusFood = 10;
    this.speed = 1;
    this.speedAngle = 2;
    this.KEY_LEFT = 37;
    this.KEY_RIGHT = 39;
    this.numberFood = 1000;
  }

  return new config;
});
