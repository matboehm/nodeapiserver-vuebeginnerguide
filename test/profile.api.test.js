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
                expect(response.body.data).to.have.lengthOf(2);
                expect(response.body.data[0].firstname).to.equal('Hans Peter');
                expect(response.body.data[0].lastname).to.equal('Baxxter');
                expect(response.body.data[0].gender).to.equal('male');
                expect(response.body.data[0].bio).to.equal('biography text');
                expect(response.body.data[0].age).to.equal(44);
                done();
            });
    })
});

describe('single profile endpoint', () => {
    it('returns a single profiles', done => {
        chai
            .request(app)
            .get('/profile/1')
            .end((error, response) => {
                expect(response).to.have.status(200);
                expect(response.body.data.firstname).to.equal('Hans Peter');
                expect(response.body.data.lastname).to.equal('Baxxter');
                expect(response.body.data.gender).to.equal('male');
                expect(response.body.data.bio).to.equal('biography text');
                expect(response.body.data.age).to.equal(44);
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
                expect(response.body.message).to.equal('success');
                expect(response.body.data.firstname).to.equal(profile.firstname);
                expect(response.body.data.lastname).to.equal(profile.lastname);
                expect(response.body.data.gender).to.equal(profile.gender);
                expect(response.body.data.bio).to.equal(profile.bio);
                expect(response.body.data.age).to.equal(profile.age);
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
                expect(response.body.message).to.equal('success');
                expect(response.body.data.age).to.equal(profileUpdate.age);
                expect(response.body.data.firstname).to.equal(undefined);
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