import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import HomePage from '../../app/page';

describe('HomePage', () => {
  it('UC-WEB-UNIT-001: renders main heading', () => {
    render(<HomePage />);
    expect(screen.getByText('Vale Integrador')).toBeInTheDocument();
  });

  it('UC-WEB-UNIT-002: renders description', () => {
    render(<HomePage />);
    expect(screen.getByText(/CRM Académico/)).toBeInTheDocument();
  });

  it('UC-WEB-UNIT-003: renders login button', () => {
    render(<HomePage />);
    expect(screen.getByText('Iniciar Sesión')).toBeInTheDocument();
  });

  it('UC-WEB-UNIT-004: renders dashboard link', () => {
    render(<HomePage />);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  it('UC-WEB-UNIT-005: login link points to /login', () => {
    render(<HomePage />);
    const loginLink = screen.getByText('Iniciar Sesión').closest('a');
    expect(loginLink).toHaveAttribute('href', '/login');
  });
});