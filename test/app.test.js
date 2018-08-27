import supertest from 'supertest'
import app from '../src/app'

const fs = require('fs');

// supertest permet de tester des URL
// done est la fonction de callback de mocha
describe('============ TEST END POINT URL ============', () => {

    describe('==> GET /movies', () => {
        it('should send list of movies', done => {
            supertest(app)
                .get('/films')
                .expect('Content-Type', /json/)
                .expect(res => {
                    //on checke s il y a un body
                    should.exist(res.body);
                    res.body.should.be.a.Array;
                    res.body.should.have.length > 0;
                    res.body[0].should.have.only.keys('id', 'titre', 'img');
                })
                .expect(200)
                .end(done);
        })
    });

    describe('==> GET /movies/id', () => {
        it('should send a resume of movie', done => {
            supertest(app)
                .get('/films/12')
                .expect(200)
                .expect('Content-Type', /text/)
                .expect(res => {
                    should.exist(res.body);
                    res.body.should.be.a.String;
                    res.body.should.have.length > 0;
                })
                .end(done);
        })
    });

    describe('==> GET /false URL', () => {
        it('should send a 404', done => {
            supertest(app)
                .get('/films/ola')
                .expect(404)
                .expect('Content-Type', /text/)
                .expect(res => {
                    should.exist(res.body);
                    res.body.should.be.a.String;
                })
                .end(done);
        })
    });

    describe('==> POST /film', () => {
        it('should send a 200', done => {
            supertest(app)
                .post('/film')
                .field('Content-Type', 'multipart/form-data')
                .field('datas', JSON.stringify({titre: 'test', resume: 'resume test'}))
                .attach('file', 'public/imgs/cinema.jpg')
                .expect(200)
                .end(done);
        });

        it('should send error when posting empty form', done => {
            supertest(app)
                .post('/film')
                .field('Content-Type', 'multipart/form-data')
                .field('datas', JSON.stringify({titre: '', resume: ''}))
                .expect(400)
                .end(done);
        });
    });

    describe('==> PUT /film', () => {
        it('should send a 200 when modify film', done => {
            supertest(app)
                .post('/film/7')
                .field('Content-Type', 'multipart/form-data')
                .field('datas', JSON.stringify({titre: 'test', resume: 'resume test'}))
                .attach('file', 'public/imgs/cinema.jpg')
                .expect(200)
                .end(done);
        });

        it('should send error when modify and empty form', done => {
            supertest(app)
                .post('/film/7')
                .field('Content-Type', 'multipart/form-data')
                .field('datas', JSON.stringify({titre: '', resume: ''}))
                .expect(400)
                .end(done);
        });
    });

    describe('==> DELETE /movies/id', () => {
        it('should delete a  movie', done => {
            supertest(app)
                .del('/films/12')
                .expect(200)
                .end(done);
        })
    });

});



