import { guid } from '../../utils/guid'
const chai = require('chai'),
    expect = chai.expect,
    mocha = require('mocha');

describe('User ID Generator tests: ', () => {
    it('Guid function should return random ID when called', () => {
        expect(guid()).to.be.a('string');
    });
});

