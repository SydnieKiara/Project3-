const { expect } = require('chai');
const sinon = require('sinon');
const Member = require('../models/Member');
const memberController = require('../controllers/memberController');

describe('Member Controller', () => {
    let req, res, next;

    beforeEach(() => {
        req = { params: {}, body: {} };
        res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
        next = sinon.stub();
    });

    it('should create a new member', async () => {
        req.body = { name: 'John Doe', email: 'john.doe@example.com', membershipDate: '2024-12-01' };
        sinon.stub(Member, 'create').resolves({ id: 1, ...req.body });

        await memberController.createMember(req, res, next);
        expect(res.status).to.have.been.calledWith(201);
        expect(res.json).to.have.been.calledWith({ id: 1, ...req.body });

        Member.create.restore(); // Restore the stub
    });

    it('should return 400 if data is invalid', async () => {
        req.body = { email: 'john.doe@example.com', membershipDate: '2024-12-01' };
        sinon.stub(Member, 'create').throws(new Error('Validation failed'));

        await memberController.createMember(req, res, next);
        expect(res.status).to.have.been.calledWith(400);
        expect(res.json).to.have.been.calledWith({ error: 'Validation failed' });

        Member.create.restore();
    });

    it('should fetch all members', async () => {
        const mockMembers = [{ id: 1, name: 'John Doe' }, { id: 2, name: 'Jane Doe' }];
        sinon.stub(Member, 'find').resolves(mockMembers);

        req.params = {};
        await memberController.getAllMembers(req, res, next);
        expect(res.status).to.have.been.calledWith(200);
        expect(res.json).to.have.been.calledWith(mockMembers);

        Member.find.restore();
    });

    // Additional test cases for updating and deleting members
});
