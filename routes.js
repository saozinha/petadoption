var user        = require('./controllers/user');
// var animal      = require('./controllers/animal');
var dashboard   = require('./controllers/dashboard');
//
module.exports = function(app, passport) {
  // =====================================
  // Dashboard ===========================
  // =====================================
  //
  app.get('/dashboard', isLoggedIn, dashboard.index);
  // app.get('/users/:id', user.show);
  // app.post('/users', user.create);
  // app.put('/users/:id', user.update);
  // app.patch('/users/:id', user.patch);
  // app.delete('/users/:id', user.destroy);
  //
  // =====================================
  // User ================================
  // =====================================
  //
  app.get('/users', user.index);
  app.get('/users/:id', user.show);
  app.post('/users', user.create);
  app.put('/users/:id', user.update);
  app.patch('/users/:id', user.patch);
  app.delete('/users/:id', user.destroy);

  // =====================================
  // Animal ==============================
  // =====================================
  //
  // app.get('/animal', animal.index);
  // app.get('/animal/:id', animal.show);
  // app.post('/animal', animal.create);
  // app.put('/animal/:id', animal.update);
  // app.patch('/animal/:id', animal.patch);
  // app.delete('/animal/:id', animal.destroy);

  //
  // =====================================
  // HOME PAGE (with login links) ========
  // =====================================
  app.get('/', function(req, res) {
    if (req.isAuthenticated()) {
      res.redirect('/dashboard');
    } else {
      res.render('index', { message: req.flash('loginMessage') }); 
    }
  });
  // =====================================
  // SIGNUP ==============================
  // =====================================
  // show the signup form
  app.get('/signup', function(req, res) {
    res.render('index', { message: req.flash('signupMessage') });
  });
  // process the signup form
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/profile', // redirect to the secure profile section
    failureRedirect : '/signup', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
  }));
  // =====================================
  // LOGIN ===============================
  // =====================================
  // show the login form
  app.get('/login', function(req, res) {
    res.render('index', { message: req.flash('loginMessage') });
  });
  // process the login form
  app.post('/login', passport.authenticate('local-login', {
    successRedirect : '/', // redirect to the secure profile section
    failureRedirect : '/login', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
  }));
  // =====================================
  // PROFILE SECTION =====================
  // =====================================
  // we will want this protected so you have to be logged in to visit
  // we will use route middleware to verify this (the isLoggedIn function)
  app.get('/profile', isLoggedIn, user.profile);
  // =====================================
  // FACEBOOK ROUTES =====================
  // =====================================
  // route for facebook authentication and login
  // app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
  // // handle the callback after facebook has authenticated the user
  // app.get('/auth/facebook/callback',
  //   passport.authenticate('facebook', {
  //       successRedirect : '/profile',
  //       failureRedirect : '/'
  //   }
  // ));
  // =====================================
  // TWITTER ROUTES ======================
  // =====================================
  // route for twitter authentication and login
  // app.get('/auth/twitter', passport.authenticate('twitter'));
  // // handle the callback after twitter has authenticated the user
  // app.get('/auth/twitter/callback',
  //   passport.authenticate('twitter', {
  //       successRedirect : '/profile',
  //       failureRedirect : '/'
  //   })
  // );
  // =====================================
  // GOOGLE ROUTES =======================
  // =====================================
  // send to google to do the authentication
  // profile gets us their basic information including their name
  // email gets their emails
  // app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
  // // the callback after google has authenticated the user
  // app.get('/auth/google/callback',
  //   passport.authenticate('google', {
  //           successRedirect : '/profile',
  //           failureRedirect : '/'
  //   })
  // );
  // =====================================
  // LOGOUT ==============================
  // =====================================
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

};
// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on 
  if (req.isAuthenticated())
    return next();
  // if they aren't redirect them to the home page
  res.redirect('/');
}