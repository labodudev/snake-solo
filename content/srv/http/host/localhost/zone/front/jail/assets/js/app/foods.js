/*
Copyright (C) 2016  Jimmy LATOUR
http://labodudev.fr
*/

"use strict"

define(["app/config", "app/utils", "app/player"], function (config, utils, player) {
  function foods() {}

  foods.prototype = {
    foods: [],
    numberVisibleFoods: 0,
    numberFoodToGenerate: config.numberFood,

    generateFoods: function() {
      while(this.numberFoodToGenerate--) {
        this.foods.push({x: Math.floor(Math.random() * config.gameWidth - 20) + 20, y: Math.floor(Math.random() * config.gameHeight - 20) + 20});
      }
    },

    drawFoods: function(display) {
      display.g.strokeStyle = '#003300';
      display.g.fillStyle = '#e67e22';
      display.g.lineWidth = 2;

      this.numberVisibleFoods = 0;
      for (var key in this.foods) {
        if(this.foods[key].x > player.x - config.screenWidth/2 - 20 &&
          this.foods[key].x < player.x + config.screenWidth/2 + 20 &&
          this.foods[key].y > player.y - config.screenHeight/2 - 20 &&
          this.foods[key].y < player.y + config.screenHeight/2 + 20) {
          this.numberVisibleFoods++;
          display.drawCircle(this.foods[key].x - player.x + config.screenWidth / 2, this.foods[key].y -  player.y + config.screenHeight / 2, config.radiusFood, 10);
          display.g.stroke();
        }
      }
    },

    eatFood: function () {
			for (var key in this.foods) {
        if (utils.AABB(this.foods[key], player, 8)) {
          this.foods.splice( key, 1 );
	        player.n++;
          player.generatePath();
					break;
        }
	    }
		}
  }

  foods.prototype.generateFoods();

  return new foods;
});
