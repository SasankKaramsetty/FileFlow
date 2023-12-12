import supertest from 'supertest';
import app from '../server';

describe('Test wrong login password', () => {
  it('performs wrong pwd login and expects 404', async () => {
    const response = await supertest(app)
      .post('/login')
      .send({
        email: 'sasank@gmail.com',
        password: 'wrongpassword'
      });

    expect(response.status).toBe(404);
    expect(response.text).toContain('Cannot POST /login'); 
  });
});
