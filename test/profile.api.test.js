const app = require("../server");
const chai = require("chai");
const chaiHttp = require("chai-http");

const { expect } = chai;
chai.use(chaiHttp);

describe('Server root', () => {
    it('Is available and returns 200 status code', (done) => {
        chai
            .request(app)
            .get('/')
            .end((error, response) => {
                expect(response).to.have.status(200);
                expect(response.body.message).to.equals('Ok');
                done();
            });
    })
});

describe('profile list endpoint', () => {
    it('returns all the available profiles', done => {
        chai
            .request(app)
            .get('/profile')
            .end((error, response) => {
                expect(response).to.have.status(200);
                expect(response.body).to.have.lengthOf(2);
                expect(response.body[0].firstname).to.equal('Homer');
                expect(response.body[0].lastname).to.equal('Simpson');
                expect(response.body[0].gender).to.equal('male');
                expect(response.body[0].bio).to.equal('biography text');
                expect(response.body[0].age).to.equal(44);
                done();
            });
    })
});

describe('single profile endpoint', () => {
    it('returns a single profiles', done => {
        chai
            .request(app)
            .get('/profile/Homer')
            .end((error, response) => {
                expect(response).to.have.status(200);
                expect(response.body.firstname).to.equal('Homer');
                expect(response.body.lastname).to.equal('Simpson');
                expect(response.body.gender).to.equal('male');
                expect(response.body.bio).to.equal('biography text');
                expect(response.body.age).to.equal(44);
                done();
            });
    })
});

describe('create profile endpoint', () => {
    it('creates a profiles', done => {
        const profile = {
            firstname: 'Jessica',
            lastname: 'Jones',
            gender: 'female',
            bio: 'Top secret',
            age: 33
        };

        chai
            .request(app)
            .post('/profile')
            .send(profile)
            .end((error, response) => {
                expect(response).to.have.status(200);
                expect(response.body.firstname).to.equal(profile.firstname);
                expect(response.body.lastname).to.equal(profile.lastname);
                expect(response.body.gender).to.equal(profile.gender);
                expect(response.body.bio).to.equal(profile.bio);
                expect(response.body.age).to.equal(profile.age);
                done();
            });
    })
});

describe('update profile endpoint', () => {
    it('updates a profiles', done => {
        const profileUpdate = {
            age: 44
        };

        chai
            .request(app)
            .patch('/profile/3')
            .send(profileUpdate)
            .end((error, response) => {
                expect(response).to.have.status(200);
                expect(response.body.message).to.equal('updated');
                done();
            });
    })
});

describe('delete profile endpoint', () => {
    it('deletes a profiles', done => {
        chai
            .request(app)
            .delete('/profile/3')
            .end((error, response) => {
                expect(response).to.have.status(200);
                expect(response.body.message).to.equal('deleted');
                done();
            });
    })
});