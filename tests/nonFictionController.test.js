const { expect } = require('chai');
const sinon = require('sinon');
const NonFictionBook = require('../models/NonFictionBook');
const nonFictionBookController = require('../controllers/nonFictionBookController');

describe('Non-Fiction Book Controller', () => {
    let req, res, next;

    beforeEach(() => {
        req = { params: {}, body: {} };
        res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
        next = sinon.stub();
    });

    it('should create a new non-fiction book', async () => {
        req.body = { title: 'Title', author: 'Author', genre: 'Genre', publicationYear: 2024 };
        sinon.stub(NonFictionBook, 'create').resolves({ id: 1, ...req.body });

        await nonFictionBookController.createNonFictionBook(req, res, next);
        expect(res.status).to.have.been.calledWith(201);
        expect(res.json).to.have.been.calledWith({ id: 1, ...req.body });

        NonFictionBook.create.restore();
    });

    it('should return 400 if data is invalid', async () => {
        req.body = { author: 'Author', genre: 'Genre', publicationYear: 2024 };
        sinon.stub(NonFictionBook, 'create').throws(new Error('Validation failed'));

        await nonFictionBookController.createNonFictionBook(req, res, next);
        expect(res.status).to.have.been.calledWith(400);
        expect(res.json).to.have.been.calledWith({ error: 'Validation failed' });

        NonFictionBook.create.restore();
    });

    it('should fetch all non-fiction books', async () => {
        const mockBooks = [{ id: 1, title: 'Title 1' }, { id: 2, title: 'Title 2' }];
        sinon.stub(NonFictionBook, 'find').resolves(mockBooks);

        req.params = {};
        await nonFictionBookController.getAllNonFictionBooks(req, res, next);
        expect(res.status).to.have.been.calledWith(200);
        expect(res.json).to.have.been.calledWith(mockBooks);

        NonFictionBook.find.restore();
    });

    // Additional test cases for updating and deleting non-fiction books
});
