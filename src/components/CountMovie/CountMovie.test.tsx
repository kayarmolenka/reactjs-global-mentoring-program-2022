import { render, screen } from '@testing-library/react';
import { CountMovie } from './CountMovie';

describe('CountMovie', () => {
  it('should return "18 movies found" count', () => {
    render(<CountMovie countMovie={18} />);

    expect(screen.getByText('18 movies found')).toBeInTheDocument();
  });
});
