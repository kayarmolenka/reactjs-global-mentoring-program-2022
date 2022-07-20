import { fireEvent, render, screen } from '@testing-library/react';

import { DeleteMovie } from './DeleteMovie';

describe('DeleteMovie', () => {
  const handleIsDeleteMovie = jest.fn();
  const handleDeleteMovie = jest.fn();

  afterEach(() => {
    handleIsDeleteMovie.mockRestore();
    handleDeleteMovie.mockRestore();
  });

  it('should return "Delete Movie" when modal is open', () => {
    render(
      <DeleteMovie
        isDeleteMovieModal={true}
        setIsDeleteMovie={handleIsDeleteMovie}
        deleteMovie={handleDeleteMovie}
      />,
    );

    expect(screen.getByText('Delete Movie')).toBeInTheDocument();
  });

  it('should not return "Delete Movie" when modal is closed', () => {
    render(
      <DeleteMovie
        isDeleteMovieModal={false}
        setIsDeleteMovie={handleIsDeleteMovie}
        deleteMovie={handleDeleteMovie}
      />,
    );

    expect(screen.queryByText('Delete Movie')).not.toBeInTheDocument();
  });

  it('should call handleDeleteMovie after click on confirm button', () => {
    render(
      <DeleteMovie
        isDeleteMovieModal={true}
        setIsDeleteMovie={handleIsDeleteMovie}
        deleteMovie={handleDeleteMovie}
      />,
    );
    fireEvent.click(screen.getByText('Confirm'));

    expect(handleDeleteMovie).toHaveBeenCalled();
  });

  it('should call handleIsDeleteMovie after click on close icon modal', () => {
    render(
      <DeleteMovie
        isDeleteMovieModal={true}
        setIsDeleteMovie={handleIsDeleteMovie}
        deleteMovie={handleDeleteMovie}
      />,
    );

    fireEvent.click(screen.getByTestId('closeIcon'));

    expect(handleIsDeleteMovie).toHaveBeenCalled();
  });
});
