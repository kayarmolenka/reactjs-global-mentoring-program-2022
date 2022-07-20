import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from './ErrorBoundary';

describe('ErrorBoundary', () => {
  const Child = () => {
    throw new Error();
  };

  const Header = () => <div>{'Header'}</div>;

  it('should return "Sorry.. there was an error" because Child component return error', () => {
    render(
      <ErrorBoundary>
        <Child />
      </ErrorBoundary>,
    );

    expect(screen.getByText('Sorry.. there was an error')).toBeInTheDocument();
  });

  it('should return "Header" because there no error', () => {
    render(
      <ErrorBoundary>
        <Header />
      </ErrorBoundary>,
    );

    expect(screen.getByText('Header')).toBeInTheDocument();
  });
});
