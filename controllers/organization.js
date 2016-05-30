var Promise = require('bluebird');
var Organization = require('./../models/organization');
var User = require('./../models/user');

var OrganizationController = {
  // index: function(req, res) {
  // },
  show: (req, res) => {
    Promise.all([
      User.findById(req.user._id).execAsync()
      .then((user) => {
        return user;
      })
      .catch((err) => {
        throw err;
      }),
      Organization.findById(req.params.id).execAsync()
      .then((org) => {
        return org;
      })
      .catch((err) => {
        throw err;
      })
    ])
    .then(results => {
        // the results array will equal ['one','two'] even though
        // the second function had a shorter timeout.
      res.render('org/show', { user: results[0], org: results[1] });
    })
    .catch(err => { 
      console.log(err);
      res.render('error', { error: err });
    });
  },
  create: (req, res) => {
    var organization = new Organization();

    for (var key in req.body) {
      organization[key] = req.body[key];
    }

    organization.save((err, organization) => {
      if (err)
        res.send(err);

      res.json(organization);
      //res.json({ message: 'user created!' });
    });
  },
  update: function(req, res) {
    Promise.all([
      User.findById(req.user._id).execAsync()
      .then((user) => {
        return user;
      })
      .catch((err) => {
        throw err;
      }),
      Organization.findById(req.body._id).execAsync()
      .then((org) => {
        for (var key in req.body) {
          org[key] = req.body[key];
        }

        return org.saveAsync();
      })
      .catch((err) => {
        throw err;
      })
    ])
    .then(results => {
      res.render('org/show', { user: results[0], org: results[1] });
    })
    .catch(err => { 
      console.log(err);
      res.render('error', { error: err });
    });
  },
  // patch: function(req, res) {
  // },
  // destroy: function(req, res) {
  // }
};

module.exports = OrganizationController;