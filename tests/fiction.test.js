const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/library', { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.connection.close();
});

test('POST /api/fiction should create a new fiction book', async () => {
  const response = await request(app)
    .post('/api/fiction')
    .send({ title: 'Test Book', author: 'Author Name', publishedYear: 2024, genre: 'Mystery' });
  expect(response.status).toBe(201);
  expect(response.body.title).toBe('Test Book');
});
