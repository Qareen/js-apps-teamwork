import {validator} from '../../utils/validator';
const chai = require('chai'),
    expect = chai.expect,
    mocha = require('mocha');

describe('Validation tests', () => {
    it('Validator should return true when a valid email is passed', () => {
        let validEmail = 'ivan@abv.bg';
        expect(validator.email(validEmail)).to.be.true;
    });

    it('Validator should return false when an invalid email is passed', () => {
        let invalidEmail = 'asd';
        expect(validator.email(invalidEmail)).to.be.false;
    });

    it('Validator should return true when a valid userName is passed', () => {
        let validUserName = 'ivan123';
        expect(validator.userName(validUserName)).to.be.true;
    });

    it('Validator should return false when an invalid userName is passed', () => {
        let invalidUserName = '1';
        expect(validator.userName(invalidUserName)).to.be.false;
    });

    it('Validator should return true when a valid password is passed', () => {
        let validPassword = '123asd';
        expect(validator.password(validPassword)).to.be.true;
    });

    it('Validator should return false when an invalid password is passed', () => {
        let invalidPassword = '1';
        expect(validator.password(invalidPassword)).to.be.false;
    });

    it('Validator should return true when a valid carBrand is passed', () => {
        let validCarBrand = 'Mustang';
        expect(validator.carBrand(validCarBrand)).to.be.true;
    });

    it('Validator should return false when an invalid carBrand is passed', () => {
        let invalidCarBrand = '1';
        expect(validator.carBrand(invalidCarBrand)).to.be.false;
    });

    it('Validator should return true when a valid description is passed', () => {
        let validDescription = 'This is a nice description';
        expect(validator.description(validDescription)).to.be.true;
    });

    it('Validator should return false when an invalid description is passed', () => {
        let invalidDescription = '1';
        expect(validator.description(invalidDescription)).to.be.false;
    });

    it('Validator should return true when a valid image name is passed', () => {
        let validImageName = 'aPicture.jpeg';
        expect(validator.image(validImageName)).to.be.true;
    });

    it('Validator should return false when an invalid image name is passed', () => {
        let invalidImageName = 'notaPicture.exe';
        expect(validator.image(invalidImageName)).to.be.false;
    });

    it('Validator should return true when a valid comment is passed', () => {
        let validComment = '123asd';
        expect(validator.comment(validComment)).to.be.true;
    });

    it('Validator should return false when an invalid comment is passed', () => {
        let invalidComment = '1';
        expect(validator.comment(invalidComment)).to.be.false;
    });
});