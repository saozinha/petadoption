var express = require('express');
var router = express.Router();
var animal = require('./../controllers/animal');
var validator = require('validator');

router.get('/animal', function(req, res){
	animal.list(function(resp){
		res.json(resp);
	});
});

router.get('/animal/:id', function(req, res){
	var id = validator.trim(validator.escape(req.param('id')));
	animal.user(id, function(resp){
		res.json(resp);
	});
});

router.post('/animal', function(req, res){
	var name 				= validator.trim(validator.escape(req.param('name')));
	var numberChip 			= validator.trim(validator.escape(req.param('numberChip')));
	var category 			= validator.trim(validator.escape(req.param('category')));
	var type 				= validator.trim(validator.escape(req.param('type')));
	var dateBorn 			= validator.trim(validator.escape(req.param('dateBorn')));
	var colors 				= validator.trim(validator.escape(req.param('colors')));
	var fur 				= validator.trim(validator.escape(req.param('fur')));
	var size 				= validator.trim(validator.escape(req.param('size')));
	var neutered 			= validator.trim(validator.escape(req.param('neutered')));
	var vaccinated 			= validator.trim(validator.escape(req.param('vaccinated')));
	var vermifugated 		= validator.trim(validator.escape(req.param('vermifugated')));
	var history 			= validator.trim(validator.escape(req.param('history')));
	var photos 				= validator.trim(validator.escape(req.param('photos')));
	var specitalAdoption 	= validator.trim(validator.escape(req.param('specitalAdoption')));
	var gender 				= validator.trim(validator.escape(req.param('gender')));
	var sociable 			= validator.trim(validator.escape(req.param('sociable')));
	var playful 			= validator.trim(validator.escape(req.param('playful')));
	var affectionate 		= validator.trim(validator.escape(req.param('affectionate')));
	var temporaryPlace 		= validator.trim(validator.escape(req.param('temporaryPlace')));

	animal.update(name
					,numberChip
					,category
					,type
					,dateBorn
					,colors
					,fur
					,size
					,neutered
					,vaccinated
					,vermifugated
					,history
					,photos
					,specitalAdoption
					,gender
					,sociable
					,playful
					,affectionate
					,temporaryPlace
					,createdDate,
					function(resp){
						res.json(resp);
					});
});

router.put('/animal', function(req, res){
	var name 				= validator.trim(validator.escape(req.param('name')));
	var numberChip 			= validator.trim(validator.escape(req.param('numberChip')));
	var category 			= validator.trim(validator.escape(req.param('category')));
	var type 				= validator.trim(validator.escape(req.param('type')));
	var dateBorn 			= validator.trim(validator.escape(req.param('dateBorn')));
	var colors 				= validator.trim(validator.escape(req.param('colors')));
	var fur 				= validator.trim(validator.escape(req.param('fur')));
	var size 				= validator.trim(validator.escape(req.param('size')));
	var neutered 			= validator.trim(validator.escape(req.param('neutered')));
	var vaccinated 			= validator.trim(validator.escape(req.param('vaccinated')));
	var vermifugated 		= validator.trim(validator.escape(req.param('vermifugated')));
	var history 			= validator.trim(validator.escape(req.param('history')));
	var photos 				= validator.trim(validator.escape(req.param('photos')));
	var specitalAdoption 	= validator.trim(validator.escape(req.param('specitalAdoption')));
	var gender 				= validator.trim(validator.escape(req.param('gender')));
	var sociable 			= validator.trim(validator.escape(req.param('sociable')));
	var playful 			= validator.trim(validator.escape(req.param('playful')));
	var affectionate 		= validator.trim(validator.escape(req.param('affectionate')));
	var temporaryPlace 		= validator.trim(validator.escape(req.param('temporaryPlace')));

	animal.update(name
					,numberChip
					,category
					,type
					,dateBorn
					,colors
					,fur
					,size
					,neutered
					,vaccinated
					,vermifugated
					,history
					,photos
					,specitalAdoption
					,gender
					,sociable
					,playful
					,affectionate
					,temporaryPlace
					,createdDate,
					function(resp){
						res.json(resp);
					});
});

router.delete('animal/:id', function(req, res){
	var id = validator.trim(validator.escape(req.param('id')));
	animal.delete(id, function(resp){
		res.json(resp);
	});
});

module.exports = router;
