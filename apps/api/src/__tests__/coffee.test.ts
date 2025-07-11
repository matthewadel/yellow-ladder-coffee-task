import request from 'supertest';
import express from 'express';
import { coffeeRouter } from '../routes/coffee';

const app = express();
app.use(express.json());
app.use('/api/coffee', coffeeRouter);

describe('Coffee API', () => {
  describe('GET /api/coffee', () => {
    it('should return list of coffees', async () => {
      const response = await request(app).get('/api/coffee').expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toBeDefined();
      expect(Array.isArray(response.body.data)).toBe(true);
    });
  });

  describe('GET /api/coffee/:id', () => {
    it('should return a specific coffee', async () => {
      const response = await request(app).get('/api/coffee/1').expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toBeDefined();
      expect(response.body.data.id).toBe('1');
    });

    it('should return 404 for non-existent coffee', async () => {
      const response = await request(app).get('/api/coffee/999').expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe('Coffee not found');
    });
  });

  describe('GET /api/coffee/meta/categories', () => {
    it('should return list of categories', async () => {
      const response = await request(app)
        .get('/api/coffee/meta/categories')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toBeDefined();
      expect(Array.isArray(response.body.data)).toBe(true);
    });
  });
});
