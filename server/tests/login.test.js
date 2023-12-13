import supertest from 'supertest';
import app from '../server';

describe('Login Tests', () => {
  it('not entering the valid credintials 400', async () => {
    const response = await supertest(app)
      .post('/api/files/login')
      .send({
        email: 'sasank@gmail.com',
        password:'',
      });

    console.log('Response status:', response.status);
    console.log('Response body:', response.body);

    expect(response.status).toBe(400);
  });
});

describe('Test wrong login password', () => {
  it('performs wrong pwd login and user entered the correct email 401', async () => {
    const response = await supertest(app)
      .post('/api/files/login')
      .send({
        email: 'sasank@gmail.com',
        password: 'wrongpassword'
      });

    expect(response.status).toBe(401);
    // expect(response.text).toContain('Cannot POST /login'); 
  });
});

describe('Test wrong login password', () => {
  it('performs wrong user login and expects 404', async () => {
    const response = await supertest(app)
      .post('/api/files/login')
      .send({
        email: 'sasank741@gmail.com',
        password: 'wrongpassword'
      });

    expect(response.status).toBe(404);
    // expect(response.text).toContain('Cannot POST /login'); 
  });
});
describe('Test wrong login password', () => {
  it('user entered the correct creds it should be 200', async () => {
    const response = await supertest(app)
      .post('/api/files/login')
      .send({
        email: 'sasank@gmail.com',
        password: '123456'
      });

    expect(response.status).toBe(200);
    // expect(response.text).toContain('Cannot POST /login'); 
  });
});
