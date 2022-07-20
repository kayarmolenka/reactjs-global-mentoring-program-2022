import { fireEvent, render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  const handleClick = jest.fn();

  afterEach(() => {
    handleClick.mockRestore();
  });

  it('should return button with "Click" text', () => {
    render(<Button text="Click" />);

    expect(screen.getByText('Click')).toBeInTheDocument();
  });

  it('should call handleClick after click on button', () => {
    render(<Button text="Click" onClick={handleClick} />);

    fireEvent.click(screen.getByText('Click'));
    expect(handleClick).toHaveBeenCalled();
  });
});
