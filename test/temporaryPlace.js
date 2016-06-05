process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');

var Promise = require("bluebird");

var server = require('../bin/www');
var User = require("../models/user");
var Organization = require("../models/organization");
var TemporaryPlace = require("../models/temporaryPlace");

var should = chai.should();
chai.use(chaiHttp);

var agent = chai.request.agent(server)

describe('TemporaryPlace', () => {
  
  var user_id;
  var user_email;
  var org_id;
  var tempplace_id;

  beforeEach((done) => {

    Promise.resolve(['teste@teste.com.br', '12345']).spread((email, senha) => {
      var newUser = new User();

      newUser.local.email = email;
      newUser.local.password = newUser.generateHash(senha);
      newUser.stage = 1;

      return newUser.saveAsync();
    }).then((user) => {

      user_id = user._id;
      user_email = user.local.email;

      var newOrg = new Organization();
      newOrg.name = 'Org01';

      newOrg.saveAsync();

      return ([user, newOrg]);
    }).then((objs) => {

      org_id = objs[1]._id;

      var address = {
        country: 'Brazil',
        state: 'Minas Gerais',
        city: 'Belo Horizonte',
        district: 'Funcionários',
        street: 'Praça da Liberdade',
        number: '450',
        complement: ''
      };

      var user = {
        _id: objs[0]._id,
        name: '',
        type: '',
        code: '',
        email: objs[0].local.email,
        phones: []
      };

      var temporaryPlace = new TemporaryPlace();

      temporaryPlace.organizationId = org_id;
      temporaryPlace.user = user;
      temporaryPlace.description = 'Description';
      temporaryPlace.capacity = 3;
      temporaryPlace.address = address;
      
      return temporaryPlace.saveAsync();
    }).then((temporaryPlace) => {
      tempplace_id = temporaryPlace._id;
      done();
    });

  });
  
  afterEach((done) => {
    User.collection.drop();
    Organization.collection.drop();
    TemporaryPlace.collection.drop();
    done();
  });
   
  it('should list ALL TemporaryPlaces on /tempplaces/orgs/<id> GET', (done) => {    
    agent
      .post('/login')
      .send({ email: 'teste@teste.com.br', password: '12345' })
      .then((res) => {
        res.should.have.status(200);
      })
      .then((res) => {
        agent
          .get('/tempplaces/orgs/' + org_id)
          .then((res) => {
            res.should.have.status(200);
            done();
          })      
          .catch((err) => {
            // console.log(err);
            done(err);
            // throw err;
          });
      })
      .catch((err) => {
        // console.log(err);
        done(err);
        // throw err;
      });
  });

  it('should list a SINGLE TemporaryPlace on /tempplaces/<id> GET', (done) => {    
    agent
      .post('/login')
      .send({ email: 'teste@teste.com.br', password: '12345' })
      .then((res) => {
        res.should.have.status(200);
      })
      .then((res) => {
        agent
          .get('/tempplaces/' + tempplace_id)
          .then((res) => {
            res.should.have.status(200);
            console.log(res.body);
            done();
          })
          .catch((err) => {
            // console.log(err);
            done(err);
            // throw err;
          });
      })
      .catch((err) => {
        // console.log(err);
        done(err);
        // throw err;
      });
  });

  it('should add a SINGLE TemporaryPlace on /tempplaces/<id> POST', function(done) {
    agent
      .post('/login')
      .send({ email: 'teste@teste.com.br', password: '12345' })
      .then((res) => {
        res.should.have.status(200);
      })
      .then((res) => {
        var address = {
          country: 'Brazil',
          state: 'Minas Gerais',
          city: 'Belo Horizonte',
          district: 'Funcionários',
          street: 'Praça da Liberdade',
          number: '450',
          complement: ''
        };

        var user = {
          _id: user_id,
          name: '',
          type: '',
          code: '',
          email: user_email,
          phones: []
        };

        var temporaryPlace = new TemporaryPlace();
        temporaryPlace.organizationId = org_id;
        temporaryPlace.user = user;
        temporaryPlace.description = 'Description';
        temporaryPlace.capacity = 3;
        temporaryPlace.address = address;

        agent
          .post('/tempplaces')
          .send(temporaryPlace)
          .then((res) => {
            res.should.have.status(200);
            console.log(res.body);
            done();
          })
          .catch((err) => {
            // console.log(err);
            done(err);
            // throw err;
          });
      })
      .catch((err) => {
        // console.log(err);
        done(err);
        // throw err;
      });
  });

  it('should update a SINGLE TemporaryPlace on /tempplaces/<id> PUT', function(done) {
    agent
      .post('/login')
      .send({ email: 'teste@teste.com.br', password: '12345' })
      .then((res) => {
        res.should.have.status(200);
      })
      .then((res) => {
        var address = {
          country: 'Brazil',
          state: 'Minas Gerais',
          city: 'Belo Horizonte',
          district: 'Funcionários',
          street: 'Praça da Liberdade',
          number: '450',
          complement: ''
        };

        var user = {
          _id: user_id,
          name: '',
          type: '',
          code: '',
          email: user_email,
          phones: []
        };

        var temporaryPlace = new TemporaryPlace();
        temporaryPlace.organizationId = org_id;
        temporaryPlace.user = user;
        temporaryPlace.description = 'Description2';
        temporaryPlace.capacity = 10;
        temporaryPlace.address = address;

        agent
          .put('/tempplaces/' + tempplace_id)
          .send(temporaryPlace)
          .then((res) => {
            res.should.have.status(200);
            console.log(res.body);
            done();
          })
          .catch((err) => {
            // console.log(err);
            done(err);
            // throw err;
          });
      })
      .catch((err) => {
        // console.log(err);
        done(err);
        // throw err;
      });
  });

});