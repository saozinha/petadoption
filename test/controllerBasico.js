process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');

var server = require('../bin/www');
var User = require("../models/user");

var should = chai.should();
chai.use(chaiHttp);


describe('User', function() {
  
  User.collection.drop();
  
  beforeEach(function(done){
    var address = {
      country: 'Brazil',
      state: 'Minas Gerais',
      city: 'Belo Horizonte',
      district: 'Funcionários',
      street: 'Praça da Liberdade',
      number: '450',
      complement: ''
    };

    //console.log(address);

    var newUser = new User();

    newUser.local.email = 'usuarioteste@teste.com.br';
    newUser.local.password = '12345';
    newUser.name = 'Usuário Teste';
    newUser.identification.type = 'CPF'; //cpf, rg, ...
    newUser.identification.code = '15367244408'; //http://www.geradordecpf.org/
    newUser.gender = 'male';
    newUser.type = 'employee'; //funcionario, cuidador
    newUser.dateBorn = new Date('03/30/2016');
    newUser.phones = ['5531912345678'];
    newUser.address = [address];

    newUser.save(function(err) {
      done();
    });
  });
  
  afterEach(function(done){
    User.collection.drop();
    done();
  });
   
  it('should list ALL users on /users GET', function(done) {
    chai.request(server)
      .get('/users')
      .end(function(err, res){
        //console.log(res.body[0]);
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body[0].should.have.property('_id');
        res.body[0].should.have.property('name');
        res.body[0].should.have.property('local');
        res.body[0].should.have.property('identification');
        res.body[0].should.have.property('gender');
        res.body[0].should.have.property('type');
        res.body[0].should.have.property('dateBorn');
        res.body[0].should.have.property('phones');
        res.body[0].should.have.property('address');
        //res.body[0].name.should.equal('Usuário Teste');
        done();
      });
  });

  it('should list a SINGLE user on /users/<id> GET', function(done) {
    var address = [{
      country: 'Brazil',
      state: 'Minas Gerais',
      city: 'Belo Horizonte',
      district: 'Funcionários',
      street: 'Praça da Liberdade',
      number: '450',
      complement: ''
    }];

    //console.log(address);

    var newUser = new User();

    newUser.local.email = 'usuarioteste@teste.com.br';
    newUser.local.password = '12345';
    newUser.name = 'Usuário Teste';
    newUser.identification.type = 'CPF'; //cpf, rg, ...
    newUser.identification.code = '15367244408'; //http://www.geradordecpf.org/
    newUser.gender = 'male';
    newUser.type = 'employee'; //funcionario, cuidador
    newUser.dateBorn = new Date('03/30/2016');
    newUser.phones = ['5531912345678'];
    newUser.address = address;

    newUser.save(function(err, user) {
      chai.request(server)
        .get('/users/' + user._id)
        .end(function(err, res){
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('_id');
          res.body.should.have.property('name');
          res.body.should.have.property('local');
          res.body.should.have.property('identification');
          res.body.should.have.property('gender');
          res.body.should.have.property('type');
          res.body.should.have.property('dateBorn');
          res.body.should.have.property('phones');
          res.body.should.have.property('address');
          //res.body.name.should.equal('Usuário Teste');
          res.body._id.should.equal(user.id);
          done();
        });
    });
  });

  it('should add a SINGLE user on /users POST', function(done) {
    var address = [{
      country: 'Brazil',
      state: 'Minas Gerais',
      city: 'Belo Horizonte',
      district: 'Funcionários',
      street: 'Praça da Liberdade',
      number: '450',
      complement: ''
    }];

    var newUser = new User();

    newUser.local.email = 'usuarioteste@teste.com.br';
    newUser.local.password = '12345';
    newUser.name = 'Usuário Teste';
    newUser.identification.type = 'CPF'; //cpf, rg, ...
    newUser.identification.code = '15367244408'; //http://www.geradordecpf.org/
    newUser.gender = 'male';
    newUser.type = 'employee'; //funcionario, cuidador
    newUser.dateBorn = new Date('03/30/2016');
    newUser.phones = ['5531912345678'];
    newUser.address = address;

    chai.request(server)
      .post('/users')
      .send(newUser)
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('_id');
        res.body.should.have.property('name');
        res.body.should.have.property('local');
        res.body.should.have.property('identification');
        res.body.should.have.property('gender');
        res.body.should.have.property('type');
        res.body.should.have.property('dateBorn');
        res.body.should.have.property('phones');
        res.body.should.have.property('address');
        //res.body.name.should.equal('Usuário Teste');
        done();
      });
  });

  it('should update a SINGLE user on /users/<id> PUT', function(done) {
    chai.request(server)
      .get('/users')
      .end(function(err, res){
        res.body[0].name = 'Usuário Teste 2';
        chai.request(server)
          .put('/users/'+res.body[0]._id)
          .send(res.body[0])
          .end(function(error, res){
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('_id');
            res.body.name.should.equal('Usuário Teste 2');
            done();
        });
      });
  });

  it('should replace a name of user on /users/<id> PATCH', function(done) {
    chai.request(server)
      .get('/users')
      .end(function(err, res){
        chai.request(server)
          .patch('/users/'+res.body[0]._id)
          .send({ 'op': 'replace', 'path': '/name', 'value': 'Usuário Teste 2'})
          .end(function(error, res){
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('_id');
            res.body.name.should.equal('Usuário Teste 2');
            done();
        });
      });
  });

  it('should delete a SINGLE user on /users/<id> DELETE', function(done) {
    chai.request(server)
      .get('/users')
      .end(function(err, res){
        chai.request(server)
          .delete('/users/'+res.body[0]._id)
          .end(function(error, res){
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('Number');
            res.body.should.equal(1);
            done();
        });
      });
  });

});