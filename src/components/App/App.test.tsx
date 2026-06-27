import { render, screen } from '@testing-library/react';
import App from './App';

test('renders navigation', () => {
  render(<App />);
  const navLogo = screen.getByText(/VN/i);
  expect(navLogo).toBeInTheDocument();
});
