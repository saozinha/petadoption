process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');

var server = require('../bin/www');
var User = require("../models/user");
var Organization = require("../models/organization");
var Shelter = require("../models/shelter");

var should = chai.should();
chai.use(chaiHttp);


describe('Profile', function() {
  
  // User.collection.drop();
  
  beforeEach(function(done){

    User.collection.drop();

    var newUser = new User();

    newUser.local.email = 'usuarioteste@teste.com.br';
    newUser.local.password = '12345';

    newUser.save(function(err) {
       done();
    });
    // done();
  });
  
  afterEach(function(done){
    User.collection.drop();
    done();
  });
   
  it('should complete the information for the user /users/:id PUT', function(done) {
    chai.request(server)
      .get('/users')
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body[0].should.have.property('local');
        var id = res.body[0]._id;
        var newUser = User();
        newUser._id = id;
        newUser.local.email = res.body[0].local.email;
        newUser.local.password = res.body[0].local.password;
        newUser.name = 'Usuário Teste';
        newUser.identification.type = 'CPF';
        newUser.identification.code = '123456';
        newUser.gender = 'F';
        newUser.dateBorn = new Date('November 01, 1984 11:13:00');
        chai.request(server)
          .put('/users/' + id)
          .send(newUser)
          .end(function(err, res){
            res.should.have.status(200);
            res.body.name.should.equal('Usuário Teste');
            res.body.local.should.deep.equal({ password: '12345', email: 'usuarioteste@teste.com.br' });
            res.body.identification.should.deep.equal({ code: '123456', type: 'CPF' });
            res.body.gender.should.equal('F');
            done();
          });
      });
  });

  it('should create a new organization /orgs POST', function(done) {
    var address = [{
      country: 'Brazil',
      state: 'Minas Gerais',
      city: 'Belo Horizonte',
      district: 'Funcionários',
      street: 'Praça da Liberdade',
      number: '450',
      complement: ''
    }];

    var newOrg = Organization();

    newOrg.name = 'Organization 01';
    newOrg.address = address;

    chai.request(server)
      .post('/orgs')
      .send(newOrg)
      .end(function(err, res){
        res.should.have.status(200);
        res.body.name.should.equal('Organization 01');
        done();
      });
  });

  it('should create a new shelter /shelters POST', function(done) {
    var address = {
      country: 'Brazil',
      state: 'Minas Gerais',
      city: 'Belo Horizonte',
      district: 'Funcionários',
      street: 'Praça da Liberdade',
      number: '450',
      complement: ''
    };

    var newOrg = Organization();

    newOrg.name = 'Organization 01';
    newOrg.address = address;

    newOrg.save(function(err, org) {

      var newShelter = Shelter();

      newShelter.organizationId = org._id;
      newShelter.name = 'Shelter 01';
      newShelter.capacity = 10;
      newShelter.address = address;
      
      chai.request(server)
        .post('/shelters')
        .send(newShelter)
        .end(function(err, res){
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('_id');
          res.body.should.have.property('organizationId');
          res.body.should.have.property('name');
          res.body.should.have.property('capacity');
          res.body.should.have.property('address');
          res.body.name.should.equal('Shelter 01');
          done();
        });
    });
  });

  it('should complete a full profile', function(done) {
    chai.request(server)
      .get('/users')
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body[0].should.have.property('local');
        var id = res.body[0]._id;
        var newUser = User();
        newUser._id = id;
        newUser.local.email = res.body[0].local.email;
        newUser.local.password = res.body[0].local.password;
        newUser.name = 'Usuário Teste';
        newUser.identification.type = 'CPF';
        newUser.identification.code = '123456';
        newUser.gender = 'F';
        newUser.dateBorn = new Date('November 01, 1984 11:13:00');

        var address = [{
          country: 'Brazil',
          state: 'Minas Gerais',
          city: 'Belo Horizonte',
          district: 'Funcionários',
          street: 'Praça da Liberdade',
          number: '450',
          complement: ''
        }];

        var newOrg = Organization();

        newOrg.name = 'Organization 01';
        newOrg.address = address;

        var newShelter1 = Shelter();

        newShelter1.name = 'Shelter 01';
        newShelter1.capacity = 10;
        newShelter1.address = address;

        var newShelter2 = Shelter();

        newShelter2.name = 'Shelter 02';
        newShelter2.capacity = 20;
        newShelter2.address = address;

        var vetShelter = [];

        vetShelter.push(newShelter1);
        vetShelter.push(newShelter2);
        
        console.log(newUser);
        console.log(newOrg);
        console.log(vetShelter);

        done();

        // chai.request(server)
        //   .post('/shelters')
        //   .send(newShelter)
        //   .end(function(err, res){
        //     res.should.have.status(200);
        //     res.should.be.json;
        //     res.body.should.be.a('object');
        //     res.body.should.have.property('_id');
        //     res.body.should.have.property('organizationId');
        //     res.body.should.have.property('name');
        //     res.body.should.have.property('capacity');
        //     res.body.should.have.property('address');
        //     res.body.name.should.equal('Shelter 01');
        //     done();
        //   });

        // chai.request(server)
        //   .post('/orgs')
        //   .send(newOrg)
        //   .end(function(err, res){
        //     res.should.have.status(200);
        //     res.body.name.should.equal('Organization 01');
        //     done();
        //   });

        // chai.request(server)
        //   .put('/users/' + id)
        //   .send(newUser)
        //   .end(function(err, res){
        //     res.should.have.status(200);
        //     res.body.name.should.equal('Usuário Teste');
        //     res.body.local.should.deep.equal({ password: '12345', email: 'usuarioteste@teste.com.br' });
        //     res.body.identification.should.deep.equal({ code: '123456', type: 'CPF' });
        //     res.body.gender.should.equal('F');
        //     done();
        //   });

      });
  });

});