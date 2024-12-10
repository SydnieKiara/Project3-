const { expect } = require('chai');
const request = require('supertest');
const app = require('../app'); // Assuming your main application file is app.js

describe('Library API Routes', () => {
    describe('POST /api/books/fiction', () => {
        it('should create a new fiction book and return 201', async () => {
            const bookData = { title: 'New Fiction Book', author: 'Author', genre: 'Genre', publicationYear: 2024 };

            const res = await request(app)
                .post('/api/books/fiction')
                .send(bookData);

            expect(res.status).to.equal(201);
            expect(res.body).to.include(bookData);
        });

        it('should return 400 if required fields are missing', async () => {
            const bookData = { author: 'Author', genre: 'Genre', publicationYear: 2024 };

            const res = await request(app)
                .post('/api/books/fiction')
                .send(bookData);

            expect(res.status).to.equal(400);
            expect(res.body).to.have.property('error');
        });
    });

    describe('GET /api/books/fiction', () => {
        it('should return a list of fiction books', async () => {
            const res = await request(app).get('/api/books/fiction');

            expect(res.status).to.equal(200);
            expect(res.body).to.be.an('array');
        });
    });

    describe('PUT /api/books/fiction/:id', () => {
        it('should update a fiction book and return 200', async () => {
            const updatedData = { title: 'Updated Fiction Book Title' };
            const res = await request(app)
                .put('/api/books/fiction/1')
                .send(updatedData);

            expect(res.status).to.equal(200);
            expect(res.body).to.include(updatedData);
        });

        it('should return 404 if the book is not found', async () => {
            const res = await request(app)
                .put('/api/books/fiction/999')
                .send({ title: 'Updated Fiction Book Title' });

            expect(res.status).to.equal(404);
            expect(res.body).to.have.property('error');
        });
    });

    describe('DELETE /api/books/fiction/:id', () => {
        it('should delete a fiction book and return 204', async () => {
            const res = await request(app).delete('/api/books/fiction/1');

            expect(res.status).to.equal(204);
        });

        it('should return 404 if the book is not found', async () => {
            const res = await request(app).delete('/api/books/fiction/999');

            expect(res.status).to.equal(404);
            expect(res.body).to.have.property('error');
        });
    });

    // Similar tests for non-fiction books and members routes
});
