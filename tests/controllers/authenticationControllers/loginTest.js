const chai = require('chai'),
    expect = chai.expect,
    sinon = require('sinon'),
    router = require('../../../controllers/authenticationControllers/loginController'),
    user = {
        displayName: "Ivan",
        photoURL: 'https://img-9gag-fun.9cache.com/photo/arb9YoK_460s.jpg'
    };

beforeEach('', () => {
    global.firebase = {};
    global.firebase.auth = () => {
        let result = {};
        result.onAuthStateChanged = (user) => {

        };

        return result;
    };
});

describe('zero', () => {
    it('zero1', () => {
        console.log(router.loginController());
        expect(1).to.equal(1);
    });
});
