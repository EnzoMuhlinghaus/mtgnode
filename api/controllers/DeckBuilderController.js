/*
| -------------------------------------------------------------------
|  MTGNode Deck Builder Controller
| -------------------------------------------------------------------
|
|
|	Author : Yomguithereal
|	Version : 1.0
*/
var SetModel = require('../models/SetModel');
var DeckModel = require('../models/DeckModel');

// Index
exports.builder = function(req, res){

	// Getting Relevant Data
	var data = {
		sets: SetModel.getSetInfos()
		,decks : req.session.user.decks
	};

	// Rendering the view
	res.view('deck-builder/deck-builder', data);
}

// Get all cards from a Set
exports.set_cards = function(req, res){

	// Sending back the cards
	res.json(SetModel.getCards(req.param('id')));
}

// Get cards from a deck
exports.deck_cards = function(req, res){

	// Sending back the cards
	res.json(DeckModel.getCards(req.session.user, req.param('id')));
}