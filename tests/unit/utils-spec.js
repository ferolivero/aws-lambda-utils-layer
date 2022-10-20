require('dotenv').config();
const assert = require('assert');
const chai = require('chai');
const { expect } = require('chai');
const { isEmpty } = require('../../index');
const utils = require('../..');
const Joi = require('@hapi/joi');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

describe('environments test', () => {
    /****************************************************************
     *                                                              *
     *            UNIT TESTS FOR ENVIRONMENTS FUNCTIONALITY         *
     *                                                              *
     ****************************************************************/

    it('should be NullPointerException when env.DDB_USER_CREDENTIALS is null', async () => {
        try {
            delete process.env.DDB_USER_CREDENTIALS;
            utils.getEnvironmentVariable('DDB_USER_CREDENTIALS');
        } catch (err) {
            assert(err instanceof Error);
        }
    });

    it('should be Not found exception when env variable doesn\'t define using check all environments variables', async () => {
        delete process.env.DDB_USER_CREDENTIALS;
        const schema = Joi.object()
            .keys({
                DDB_USER_CREDENTIALS: Joi.string().required(),
            });
        await expect(utils.validateEnvVariablesAreDefined(schema))
            .to.be.rejectedWith(NotFoundException);
    });

    it('should be credentials when is setted credentials in env.DDB_USER_CREDENTIALS', async () => {
        delete process.env.DDB_USER_CREDENTIALS;
        process.env.DDB_USER_CREDENTIALS = 'credentials';
        assert(utils.getEnvironmentVariable('DDB_USER_CREDENTIALS') === 'credentials');
    });

    it('should be success when all variables was defined', async () => {
        try {
            delete process.env.DDB_USER_CREDENTIALS;
            const success = utils.checkEnvVariablesAreDefined([
                'DDB_USER_CREDENTIALS'
            ]);
            assert(success);
        } catch (err) {
            assert(err instanceof Error);
        }
    });

    it('should be NullPointerException when config not cointain variables', async () => {
        delete process.env.DDB_USER_CREDENTIALS;
        try {
            utils.checkEnvVariablesAreDefined();
        } catch (err) {
            assert(err instanceof Error);
        }
    });

    it('should be success. isEmpty should return true with number', () => {
        assert(!isEmpty(8));
    });

    it('should be success. isEmpty should return true with string', () => {
        assert(!isEmpty('prueba'));
    });

    it('should be success. isEmpty should return true with object', () => {
        assert(!isEmpty({key: 'value'}));
    });

    it('should return base64 object parsed', () => {
        const mockedObject = {
           key: {
               internalKey: '1234',
           }
        };
        const expectedResponse = 'eyJrZXkiOnsiaW50ZXJuYWxLZXkiOiIxMjM0In19';
        const response = utils.encodeBase64(mockedObject);
        expect(expectedResponse).to.eql(response);
    });

    it('should return base64 string parsed', () => {
        const mockedObject = 'message';
        const expectedResponse = 'bWVzc2FnZQ==';
        const response = utils.encodeBase64(mockedObject);

        const buffer = Buffer.from(response, 'base64');
        const responseInAscii = buffer.toString('ascii');

        expect(expectedResponse).to.eql(response);
        expect(responseInAscii).to.eql(mockedObject);
    });

    it('should return object from base64 object encoded', () => {
        const expectedObject = {
            key: {
                internalKey: '1234',
            }
        };
        const mockedResponse = 'eyJrZXkiOnsiaW50ZXJuYWxLZXkiOiIxMjM0In19';
        const response = JSON.parse(utils.decodeBase64(mockedResponse));
        expect(expectedObject).to.eql(response);
    });
});
