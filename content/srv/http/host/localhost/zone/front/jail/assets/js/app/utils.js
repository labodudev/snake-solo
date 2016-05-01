/*
Copyright (C) 2016  Jimmy LATOUR
http://labodudev.fr
*/

"use strict"

define(function () {
  function utils() {}

  utils.prototype = {
    valueInRange: function (min, max, value) {
      return Math.min(max, Math.max(min, value));
    },

    AABB: function(collider, other, offset) {
      if (!offset) offset = 0;

      if (collider.x < other.x + offset &&
       collider.x + 5 > other.x - offset &&
       collider.y < other.y + offset &&
       collider.y + 5 > other.y - offset)
        return true;

      return false;
    }
  };

  return new utils;
});
