var User = require('./../models/user');
var Organization = require('./../models/organization');
var Shelter = require('./../models/shelter');
var async = require('async');

var ProfileController = {
  show: function(req, res) {
    // if (req.user.stage == 0){
      res.render('user/profile');
    // }else{
    //   res.redirect('/dashboard');
    // }
  },
  create: function(req, res) {
    User.findById(req.user._id).execAsync()
    .then(function(user) {
      for (var key in req.body.user) {
        user[key] = req.body.user[key];
      }
      // user['stage'] = 3;

      return user.saveAsync();
    })
    .then(function(user) {
      var org = new Organization();

      for (var key in req.body.organization) {
        org[key] = req.body.organization[key];
      }

      return org.saveAsync();
    })
    .then(function(org){
      req.body.shelter.forEach(function(shelter, index){
        var newShelter = new Shelter();

        newShelter.organizationId = org._id;
        for (var key in shelter) {
          newShelter[key] = shelter[key];
        }
        newShelter.saveAsync();
      });

      return res.redirect('/dashboard'); 
    })
    .catch(function(err){
      // just need one of these
      console.log('error:', err);
      return err;
    });

  }
};

module.exports = ProfileController;