var Executive = require('./../models/executive');

var ExecutiveController = {
  index: function(req, res) {
    Executive.find({ flActive: true }, function(err, executives) {
        if (err)
            res.send(err);

        console.log("teste: " + req.user.local.email);
        //res.json(executives);
        res.render('executives/index', { executives: executives });
    });
  },
  show: function(req, res) {
    Executive.findById(req.params.id, function(err, executive) {
        if (err)
            res.send(err);
        //res.json(executive);
        res.render('executives/show', { executive: executive });
    });
  },
  create: function(req, res) {
    // create a Executive (accessed at POST http://localhost:8080/api/Executives)
    var executive = new Executive();      // create a new instance of the Executive model
    // set the Executives name (comes from the request)
    executive.stock = req.body.stock;
    executive.name = req.body.name;
    executive.photo = req.body.photo;
    executive.age = req.body.age;
    executive.biography = req.body.biography;
    executive.country = req.body.country;
    executive.state = req.body.state;
    executive.city = req.body.city;
    executive.position = req.body.position;
    executive.sector = req.body.sector;
    executive.industry = req.body.industry;
    executive.company = req.body.company;
    executive.website = req.body.website;
    executive.startDate = req.body.startDate;
    executive.stockPrice = req.body.stockPrice;
    executive.cashPay = req.body.cashPay;
    executive.ltPay = req.body.ltPay;
    executive.flActive = req.body.flActive;
    executive.returnValue = req.body.returnValue;
    // save the Executive and check for errors
    executive.save(function(err) {
        if (err)
            res.send(err);

        res.json({ message: 'Executive created!' });
    });
  },
  edit: function(req, res) {
    Executive.findById(req.params.id, function(err, executive) {
        if (err)
            res.send(err);

        res.json(executive);
    });
  },
  update: function(req, res) {
    Executive.findById(req.params.id, function(err, executive) {

        if (err)
            res.send(err);

        // update the Executives info
        executive.stock = req.body.stock;
        executive.name = req.body.name;
        executive.photo = req.body.photo;
        executive.age = req.body.age;
        executive.biography = req.body.biography;
        executive.country = req.body.country;
        executive.state = req.body.state;
        executive.city = req.body.city;
        executive.position = req.body.position;
        executive.sector = req.body.sector;
        executive.industry = req.body.industry;
        executive.company = req.body.company;
        executive.website = req.body.website;
        executive.startDate = req.body.startDate;
        executive.stockPrice = req.body.stockPrice;
        executive.cashPay = req.body.cashPay;
        executive.ltPay = req.body.ltPay;
        executive.flActive = req.body.flActive;
        executive.returnValue = req.body.returnValue;
        // save the Executive
        executive.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Executive updated!' });
        });
    });
  },
  destroy: function(req, res) {
    Executive.remove({
        _id: req.params.id
    }, function(err, executive) {
        if (err)
            res.send(err);

        res.json({ message: 'Successfully deleted' });
    });
  }
};

module.exports = ExecutiveController;