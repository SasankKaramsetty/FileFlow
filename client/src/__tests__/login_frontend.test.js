import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../login/Login';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
global.fetch = require('jest-fetch-mock');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('Login Component', () => {
  it('should handle login form submission', async () => {
    render(<Login />);
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ user: { _id: '123', email: 'test@example.com' } }),
    });
    userEvent.type(screen.getByLabelText(/email address/i), 'test@example.com');
    userEvent.type(screen.getByLabelText(/password/i), 'password123');
    fireEvent.submit(screen.getByRole('button', { name: /login/i }));
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('http://localhost:8000/api/files/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'test@example.com',
          password: 'password123',
        }),
      });
    });
    expect(screen.getByText(/fileflow/i)).toBeInTheDocument();
  });
});
