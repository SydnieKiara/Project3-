const { expect } = require('chai');
const sinon = require('sinon');
const request = require('supertest');
const { validateFictionBookData, validateNonFictionBookData } = require('../middleware/validationMiddleware');
const app = require('../app'); // Assuming your main application file is app.js

describe('Validation Middleware', () => {
    let req, res, next;

    beforeEach(() => {
        req = { body: {} };
        res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
        next = sinon.stub();
    });

    it('should return 400 if title is missing in fiction book data', (done) => {
        req.body = { author: 'Author', genre: 'Genre', publicationYear: 2024 };

        validateFictionBookData(req, res, (err) => {
            expect(res.status).to.have.been.calledWith(400);
            expect(res.json).to.have.been.calledWith({ error: 'Title is required' });
            done();
        });
    });

    it('should pass validation if all fields are correct for fiction book', (done) => {
        req.body = { title: 'Title', author: 'Author', genre: 'Genre', publicationYear: 2024 };

        validateFictionBookData(req, res, next);
        expect(next).to.have.been.calledOnce;
        done();
    });

    it('should return 400 if title is missing in non-fiction book data', (done) => {
        req.body = { author: 'Author', genre: 'Genre', publicationYear: 2024 };

        validateNonFictionBookData(req, res, (err) => {
            expect(res.status).to.have.been.calledWith(400);
            expect(res.json).to.have.been.calledWith({ error: 'Title is required' });
            done();
        });
    });

    it('should pass validation if all fields are correct for non-fiction book', (done) => {
        req.body = { title: 'Title', author: 'Author', genre: 'Genre', publicationYear: 2024 };

        validateNonFictionBookData(req, res, next);
        expect(next).to.have.been.calledOnce;
        done();
    });
});
