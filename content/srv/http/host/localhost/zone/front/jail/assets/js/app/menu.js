/*
Copyright (C) 2016  Jimmy LATOUR
http://labodudev.fr
*/

"use strict"

define(["app/config", "app/display", "app/logic"], function (config, display, logic) {
  function menu() {}

  menu.prototype = {
    btnStart: document.getElementById('startButton'),
    btnLeaves: document.getElementsByClassName('leaveButton'),

    event: function () {
      this.btnStart.onclick = function() {
        menu.prototype.startGame();
      }

      for (var key in this.btnLeaves) {
        this.btnLeaves[key].onclick = function() {
          window.close();
        }
      }
    },

    startGame: function () {
      config.screenWidth = window.innerWidth;
      config.screenHeight = window.innerHeight;
      config.xOffset = -config.screenWidth;
      config.yOffset = -config.screenHeight;

      document.getElementById('startMenuWrapper').style.display = 'none';
      document.getElementById('gameAreaWrapper').style.opacity = 1;

      display.animationFrameLoop();
      display.c.focus();
      logic.logicLoop();
    }
  };

  menu.prototype.event();

  return new menu;
});
