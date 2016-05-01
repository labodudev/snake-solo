/*
Copyright (C) 2016  Jimmy LATOUR
http://labodudev.fr
*/

"use strict"

define(['app/config', 'app/display', 'app/foods', 'app/player', 'app/utils'], function (config, display, foods, player, utils) {
  function logic() {}

  logic.prototype = {
    directionDown: function (event) {
      var key = event.which || event.keyCode;
      player.d = key;
    },

    directionUp: function (event) {
      player.d = 0;
    },

    logicLoop: function () {
      player.movePlayer();
      foods.eatFood();
      setTimeout(logic.prototype.logicLoop, 1000 / config.logicFps);
    }
  };

  display.c.addEventListener('keydown', logic.prototype.directionDown, false);
  display.c.addEventListener('keyup', logic.prototype.directionUp, false);
  
  return new logic;
});
