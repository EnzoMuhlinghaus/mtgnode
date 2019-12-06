/**
 * CardController.js 
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */
var card_library = require('../libraries/Card');

module.exports = {
  single_card: function(req, res) {
    card_library.get(req.param('id')).then(function (card) {
      console.log('signlet card', card);
      res.json(card)
    }).catch(function () {
      res.notFound();
    });
  },
  batch_cards: function(req, res) {
    var batch = JSON.parse(req.param('cards'));

    res.json(card_library.getByIdArray(batch));
  },
  search: function(req, res) {
    card_library.searchByName(req.param('query')).then(function (data) {
      res.json(data);
    });
  }
};
