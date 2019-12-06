/**
 * DeckController.js 
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */
var card_library = require('../libraries/Card'),
    deck_library = require('../libraries/Deck');

module.exports = {
  parse: function(req, res) {
    deck_library.parse(req.param('text'), req.param('format')).then(function (data) {
      res.json(data);
    }).catch(function () {
      console.error('failed parse');
    })
  },
  detail: function(req, res) {

    // Fectching deck
    Deck.findOne(req.param('id'), function(err, deck) {

      if (deck === undefined) {
        res.notFound();
        return false;
      }

      res.json(deck);
    });
  }
};
