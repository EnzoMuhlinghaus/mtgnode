/*
| -------------------------------------------------------------------
|  MTGNode mtgimage.com Card Driver
| -------------------------------------------------------------------
|
| Author : Yomguithereal
| Version : 1.0
*/

;(function(undefined) {
  // Driver
  //--------
  this.currentDriver = function(card) {
    return card.image_uris.normal;
  };
}).call(this);
