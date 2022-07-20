import { fireEvent, render, screen } from '@testing-library/react';
import { CongratulationsModal } from './CongratulationsModal';

describe('CongratulationsModal', () => {
  const handleOpenModal = jest.fn();

  afterEach(() => {
    handleOpenModal.mockRestore();
  });

  it('should return "You add movie!" text when modal is open', () => {
    render(
      <CongratulationsModal
        isOpenModal={true}
        setIsOpenModal={handleOpenModal}
        modalText="You add movie!"
      />,
    );

    expect(screen.getByText('You add movie!')).toBeInTheDocument();
  });

  it('should not return "You add movie!" text when modal is closed', () => {
    render(
      <CongratulationsModal
        isOpenModal={false}
        setIsOpenModal={handleOpenModal}
        modalText="You add movie!"
      />,
    );

    expect(screen.queryByText('You add movie!')).not.toBeInTheDocument();
  });

  it('should call handleOpenModal after click on close modal icon', () => {
    render(
      <CongratulationsModal
        isOpenModal={true}
        setIsOpenModal={handleOpenModal}
        modalText="You add movie!"
      />,
    );

    fireEvent.click(screen.getByTestId('closeIcon'));

    expect(handleOpenModal).toHaveBeenCalled();
  });
});
