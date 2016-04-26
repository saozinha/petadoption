var User = require('./../models/user');

var DashboardController = {

  index: function(req, res) {
    User.find({ flActive: true }, function(err, users) {
      if (err)
        res.send(err);

      //res.json(users);
      res.render('dashboard/index', { users: users });
    });
  },
};

module.exports = DashboardController;