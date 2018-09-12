
import { expect, request } from 'chai';
var chai = require('chai');

import api from '../../server';
import User from '../schemas/UserSchema';

var tokenAuth='';

// AUTH Tests
describe('Auth Controller',()=>{
    describe('auth', () => {

        let user = 
        {
            "user":{
                "email": "tester@test.com",
                "password": "asd"
            }
        }

        it('should send user object to : /auth POST', function(done) {
            chai
                .request(api)
                .post("/auth")
                .set('content-type', 'application/json')
                .send(user)
                .end(function(error, response, body) {
                    if (error) {
                        expect(error).to.not.be.null;
                    } else {
                        tokenAuth = body.data;
                        expect(body).to.not.be.null;
                        expect(body.data).to.be.a("string");
                        expect(response).to.have.status(200)
                    }
                });
        });
    });
})

// USER Tests
describe('User controller', () => {
    let user;

	before(async () => {
		await loadFixture('initial-data', 'articles');
		user = await User.findOne({});
        expect(user).to.not.be.null;

        expect(user._id).to.not.be.null;

        expect(user.email).to.not.be.null;
        expect(user.email).to.be.a('string');

        expect(user.hashed_password).to.not.be.null;
        expect(user.hashed_password).to.be.a('string');
	});
    
    describe('/hello', () => {
        let token = tokenAuth || 'WlRPS0VO.aWQ9NWI5NzQyYWFiMWEzMTc2NmRmOTgzYWI0O2FjdGlvbj1sb2dpbg==.YWZjNTZlYmY1MWFhN2U0YmQ5NDFhYmMwY2ZmZA==';
		it('Get message for authenticated users', async () => {
			chai
                .request(api)
                .post("/auth")
                .set('Authorization', "Bearer "+token)
                .send(user)
                .end(function(error, response, body) {
                    if (error) {
                        expect(error).to.not.be.null;
                    } else {
                        expect(body).to.not.be.null;
                        expect(body.data.Hello).to.equal("World");
                        expect(response).to.have.status(200)
                    }
                });
		});
    });
    
    /*
    describe('auth', () => {
		it('should return the token via /auth', async () => {
			let response = await request(api).post(`/auth`);
			expect(response).to.have.status(200);
		});
    });
    */

});
