import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

describe('App', () => {
  it('renders the collection with a skip link and landmarks', async () => {
    render(<MemoryRouter><App /></MemoryRouter>);
    expect(await screen.findByRole('heading', { name: 'Explore the collection' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Skip to main content' })).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: 'Primary' })).toBeInTheDocument();
  });
  it('renders an artifact page', async () => {
    render(<MemoryRouter initialEntries={['/artifacts/amber-moth']}><App /></MemoryRouter>);
    expect(await screen.findByRole('heading', { level: 1, name: 'The Amber Moth' })).toBeInTheDocument();
  });
});
