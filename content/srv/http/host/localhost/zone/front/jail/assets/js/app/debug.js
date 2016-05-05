/*
Copyright (C) 2016  Jimmy LATOUR
http://labodudev.fr
*/

"use strict"

define(['app/foods', 'app/player'], function(foods, player) {
  function debug() {}

  debug.prototype = {
    draw: function(display) {
      this.drawContext(display);
      this.drawVisibleFoods(display);
      this.drawVisibleSegment(display);
    },

    drawContext: function(display) {
      display.render.drawText("Context: " + display.context, 10, 20);
    },

    drawVisibleFoods: function(display) {
      display.render.drawText("Visible foods: " + foods.numberVisibleFoods, 10, 40);
    },

    drawVisibleSegment: function(display) {
      display.render.drawText("Visible segments: " + player.numberVisibleSegments, 10, 60);
    }
  };

  return new debug;
});
