const { expect } = require('chai');
const request = require('supertest');
const app = require('../app'); // Assuming your main application file is app.js

describe('Integration Tests', () => {
    describe('POST /api/books/fiction', () => {
        it('should create a new fiction book', async () => {
            const newBook = {
                title: 'New Fiction Book',
                author: 'Author',
                genre: 'Genre',
                publicationYear: 2024
            };

            const res = await request(app)
                .post('/api/books/fiction')
                .send(newBook);

            expect(res.status).to.equal(201);
            expect(res.body).to.include(newBook);
        });

        it('should return 400 if required fields are missing', async () => {
            const newBook = { author: 'Author', genre: 'Genre', publicationYear: 2024 };

            const res = await request(app)
                .post('/api/books/fiction')
                .send(newBook);

            expect(res.status).to.equal(400);
            expect(res.body).to.have.property('error');
        });
    });

    describe('GET /api/members', () => {
        it('should return a list of members', async () => {
            const res = await request(app).get('/api/members');

            expect(res.status).to.equal(200);
            expect(res.body).to.be.an('array');
        });
    });

    describe('POST /api/members', () => {
        it('should create a new member', async () => {
            const newMember = { name: 'John Doe', email: 'john.doe@example.com', membershipDate: '2024-12-01' };

            const res = await request(app)
                .post('/api/members')
                .send(newMember);

            expect(res.status).to.equal(201);
            expect(res.body).to.include(newMember);
        });

        it('should return 400 if required fields are missing', async () => {
            const newMember = { email: 'john.doe@example.com', membershipDate: '2024-12-01' };

            const res = await request(app)
                .post('/api/members')
                .send(newMember);

            expect(res.status).to.equal(400);
            expect(res.body).to.have.property('error');
        });
    });

    describe('PUT /api/members/:id', () => {
        it('should update a member and return 200', async () => {
            const updatedData = { name: 'Jane Doe' };
            const res = await request(app)
                .put('/api/members/1')
                .send(updatedData);

            expect(res.status).to.equal(200);
            expect(res.body).to.include(updatedData);
        });

        it('should return 404 if the member is not found', async () => {
            const res = await request(app)
                .put('/api/members/999')
                .send({ name: 'Jane Doe' });

            expect(res.status).to.equal(404);
            expect(res.body).to.have.property('error');
        });
    });

    describe('DELETE /api/members/:id', () => {
        it('should delete a member and return 204', async () => {
            const res = await request(app).delete('/api/members/1');

            expect(res.status).to.equal(204);
        });

        it('should return 404 if the member is not found', async () => {
            const res = await request(app).delete('/api/members/999');

            expect(res.status).to.equal(404);
            expect(res.body).to.have.property('error');
        });
    });
});
