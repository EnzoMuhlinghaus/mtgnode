/*
| -------------------------------------------------------------------
|  MTGNode Cards Library
| -------------------------------------------------------------------
|
| Author : Yomguithereal
| Version : 1.0
*/

// Dependencies
//==============
var _ = require('lodash');

// Main Class
//============
function CardLibrary() {

  // Properties
  //------------
  var _this = this,
      _cards = require('../../database/cards.json'),
      _axios = require('axios');

  // Utilities
  //-----------

  // Get card by Id
  this.get = function(id) {
    return new Promise(function(resolve, reject) {
      _axios.get(`https://api.scryfall.com/cards/multiverse/${id}`)
          .then(response => {
            resolve(response.data)
          })
    });
  };

  // Search card by criteria
  this.getBy = function(criteria) {
    console.log('searchBy');
    return _cards.filter(function(card) {
      return Object.keys(criteria).filter(function(key) {

        // TODO :: If Array
        // TODO :: If fuzzy
        // TODO :: Conditions
        return card[key] === criteria[key];
      }).length == Object.keys(criteria).length;
    });
  };

  // Batch search card by array
  this.getByIdArray = function(card_array) {
    console.log('searchByIdArray');
    console.log(card_array);
    var index = {};

    return card_array.map(function(id) {
      if (id in index) {
        var card = index[id];
      }
      else{
        var card = _.find(_cards, function(c) {
          return c.multiverseid === id;
        });
        index[id] = card;
      }

      return card;
    });
  };

  // Search by card name
  this.searchByName = function(name) {
    return new Promise(function(resolve, reject) {
      _axios.get(`https://api.scryfall.com/cards/search?order=cmc&q=${name}`)
        .then(response => {
          resolve(response.data)
        })
    });
  };

  // Search by card name and set
  this.searchByNameAndSet = function(name, set) {
    console.log('searchByNameAndSet');

    return _cards.filter(function(c) {
      return (c.set === set &&
              ~c.name.toLowerCase().indexOf(name.toLowerCase()));
    });
  }
}

// Exporting
//===========
module.exports = new CardLibrary();
