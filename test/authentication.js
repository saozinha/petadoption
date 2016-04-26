process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');

var server = require('../bin/www');
var User = require("../models/user");

var should = chai.should();
chai.use(chaiHttp);


describe('Authentication', function() {
  
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
   
  it('should create a new user', function(done) {
    chai.request(server)
      .post('/signup')
      .send({'email':'user@user.com.br', 'password':'123456'})
      .end(function(err, res){
        res.should.have.status(200);
        chai.request(server)
          .get('/users')
          .end(function(error, res){
            res.should.have.status(200);
            res.should.be.json;
            res.body[res.body.length - 1].local.email.should.equal('user@user.com.br');
            done();
        });
      });
  });

  it('should fail when try to create a new user without email or password', function(done) {
    chai.request(server)
      .post('/signup')
      .send({'email':'', 'password':'123456'})
      .end(function(err, res){
        res.should.have.status(200);
        chai.request(server)
          .get('/users')
          .end(function(error, res){
            res.should.have.status(200);
            res.should.be.json;
            res.body[res.body.length - 1].local.email.should.not.equal('');
            chai.request(server)
              .post('/signup')
              .send({'email':'user@user.com.br', 'password':''})
              .end(function(err, res){
                res.should.have.status(200);
                chai.request(server)
                  .get('/users')
                  .end(function(error, res){
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body[res.body.length - 1].local.password.should.not.equal('');
                    done();
                });
              });
        });
      });
  });

  it('should have success when try to get logged', function(done) {
    chai.request(server)
      .post('/signup')
      .send({'email':'user@user.com.br', 'password':'123456'})
      .end(function(err, res){
        res.should.have.status(200);
        chai.request(server)
          .get('/users')
          .end(function(error, res){
            res.should.have.status(200);
            res.should.be.json;
            res.body[res.body.length - 1].local.email.should.equal('user@user.com.br');
            chai.request(server)
              .post('/login')
              .send({'email':'user@user.com.br', 'password':'123456'})
              .end(function(err, res){
                res.should.have.status(200);
                res.redirects[0].should.equal('http://127.0.0.1:3000/');
                done();
              });
        });
      });
  });

  it('should have fail when try to get logged with blank email or password', function(done) {
    chai.request(server)
      .post('/signup')
      .send({'email':'user@user.com.br', 'password':'123456'})
      .end(function(err, res){
        res.should.have.status(200);
        chai.request(server)
          .get('/users')
          .end(function(error, res){
            res.should.have.status(200);
            res.should.be.json;
            res.body[res.body.length - 1].local.email.should.equal('user@user.com.br');
            chai.request(server)
              .post('/login')
              .send({'email':'user@user.com.br', 'password':'123'})
              .end(function(err, res){
                res.should.have.status(200);
                res.redirects[0].should.equal('http://127.0.0.1:3000/login');
                chai.request(server)
                  .post('/login')
                  .send({'email':'', 'password':'123456'})
                  .end(function(err, res){
                    res.should.have.status(200);
                    res.redirects[0].should.equal('http://127.0.0.1:3000/login');
                    done();
                  });
              });
        });
      });
  });


});