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