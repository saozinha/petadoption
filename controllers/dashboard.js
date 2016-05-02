var User = require('./../models/user');

var DashboardController = {

  index: function(req, res) {
    User.findById(req.user._id, function(err, userActive) {
      if (err)
        res.send(err);

      res.render('dashboard/index', { userActive: userActive });
    });
  },
};

module.exports = DashboardController;