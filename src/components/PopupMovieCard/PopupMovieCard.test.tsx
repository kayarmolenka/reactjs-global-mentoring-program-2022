import { fireEvent, render, screen } from '@testing-library/react';
import { PopupMovieCard } from './PopupMovieCard';

describe('PopupMovieCard', () => {
  const setIsOpenModal = jest.fn();
  const setOpenEditMode = jest.fn();
  const setOpenDeleteModal = jest.fn();

  afterEach(() => {
    setIsOpenModal.mockRestore();
    setOpenEditMode.mockRestore();
    setOpenDeleteModal.mockRestore();
  });

  it('should return pop up modal with two buttons because modal is open', () => {
    render(
      <PopupMovieCard
        isOpenModal={true}
        setIsOpenModal={setIsOpenModal}
        setOpenEditMode={setOpenEditMode}
        setOpenDeleteModal={setOpenDeleteModal}
      />,
    );

    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  it('should not return pop up modal with two buttons because modal  close', () => {
    render(
      <PopupMovieCard
        isOpenModal={false}
        setIsOpenModal={setIsOpenModal}
        setOpenEditMode={setOpenEditMode}
        setOpenDeleteModal={setOpenDeleteModal}
      />,
    );

    expect(screen.queryByText('Delete')).not.toBeInTheDocument();
  });

  it('should call setIsOpenModal after click on closeIcon', () => {
    render(
      <PopupMovieCard
        isOpenModal={true}
        setIsOpenModal={setIsOpenModal}
        setOpenEditMode={setOpenEditMode}
        setOpenDeleteModal={setOpenDeleteModal}
      />,
    );

    fireEvent.click(screen.getByTestId('closeIcon'));

    expect(setIsOpenModal).toHaveBeenCalled();
  });

  it('should call setOpenEditMode after click on edit button', () => {
    render(
      <PopupMovieCard
        isOpenModal={true}
        setIsOpenModal={setIsOpenModal}
        setOpenEditMode={setOpenEditMode}
        setOpenDeleteModal={setOpenDeleteModal}
      />,
    );

    fireEvent.click(screen.getByText('Edit'));

    expect(setOpenEditMode).toHaveBeenCalled();
  });

  it('should call setOpenDeleteModal after click on delete button', () => {
    render(
      <PopupMovieCard
        isOpenModal={true}
        setIsOpenModal={setIsOpenModal}
        setOpenEditMode={setOpenEditMode}
        setOpenDeleteModal={setOpenDeleteModal}
      />,
    );

    fireEvent.click(screen.getByText('Delete'));

    expect(setOpenDeleteModal).toHaveBeenCalled();
  });
});
