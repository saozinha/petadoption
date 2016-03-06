var User = require('./../models/user');

var UserController = {
  index: function(req, res) {
    User.find({ flActive: true }, function(err, users) {
      if (err)
        res.send(err);

      //res.json(users);
      res.render('users/index', { users: users });
    });
  },
  show: function(req, res) {
    User.findById(req.params.id, function(err, user) {
      if (err)
        res.send(err);

      //res.json(user);
      res.render('users/show', { user: user });
    });
  },
  create: function(req, res) {
    var user = new User();

    user.local.email = req.body.email;
    user.local.password = req.body.password;
      
    user.save(function(err) {
      if (err)
        res.send(err);

      res.json({ message: 'user created!' });
    });
  },
  update: function(req, res) {
    User.findById(req.params.id, function(err, user) {
      if (err)
        res.send(err);

      // update the users info
      user.local.email = req.body.email;
      user.local.password = req.body.password;
      
      user.save(function(err) {
        if (err)
          res.send(err);

        res.json({ message: 'User updated!' });
      });
    });
  },
  destroy: function(req, res) {
    User.remove({_id: req.params.id}, function(err, user) {
      if (err)
        res.send(err);

      res.json({ message: 'Successfully deleted' });
    });
  }
};

module.exports = UserController;