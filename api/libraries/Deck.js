/*
| -------------------------------------------------------------------
|  MTGNode Decks Library
| -------------------------------------------------------------------
|
| Author : Yomguithereal
| Version : 1.0
*/

// Dependencies
//==============
const parser = require('mtg-parser'),
    _ = require('lodash'),
    _axios = require('axios');

// Main Class
//============
function DeckLibrary() {

  // Parse a deck
  this.parse = function(text, format) {
      return new Promise(function(resolve, reject) {
          const deck = parser(text, format);

          const names = deck.cards.map(function(c) {
              return {
                  "name": c.name
              }
          });

          _axios.post("https://api.scryfall.com/cards/collection", {
              "identifiers": names
          })
              .then(response => {
                  const cards = response.data.data;

                  resolve(_.map(cards, function (card) {
                      card.multiverseid = _.first(card.multiverse_ids);
                      return card;
                  }));
              })
              .catch(function (error) {
                  reject(error);
              });
      });
  }
}

// Exporting
//===========
module.exports = new DeckLibrary();
