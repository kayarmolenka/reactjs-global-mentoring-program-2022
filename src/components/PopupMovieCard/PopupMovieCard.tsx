import { useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { Button } from '../index';
import { useClickOutside } from '../../hooks';

import styles from './PopupMovieCard.module.scss';

interface IPopupMovieCardProps {
  isOpenModal: boolean;
  setIsOpenModal: (data: boolean) => void;
  setOpenEditMode: (data: boolean) => void;
  setOpenDeleteModal: (data: boolean) => void;
}

export const PopupMovieCard = (props: IPopupMovieCardProps) => {
  const { isOpenModal, setIsOpenModal, setOpenDeleteModal, setOpenEditMode } = props;

  const closeModalWindow = useCallback(() => {
    setIsOpenModal(false);
    document.body.style.overflow = 'auto';
  }, [setIsOpenModal]);

  const stopClosed = useCallback((e) => {
    e.stopPropagation();
  }, []);

  const handleEditMovie = () => {
    setIsOpenModal(false);
    document.body.style.overflow = 'hidden';
    setOpenEditMode(true);
  };

  const handleDeleteMovie = () => {
    setOpenDeleteModal(true);
    setIsOpenModal(false);
  };

  const domNode = useClickOutside(() => {
    setIsOpenModal(false);
  });

  return isOpenModal ? (
    <div className={styles.modal} onClick={stopClosed} ref={domNode}>
      <div className={styles.modalCloseWrapper}>
        <FontAwesomeIcon
          icon={faXmark}
          className={styles.modalCloseIcon}
          onClick={closeModalWindow}
          data-testid="closeIcon"
        />
      </div>
      <div className={styles.modalBtnWrapper}>
        <Button text="Edit" onClick={handleEditMovie} className={styles.modalBtn} />
        <Button text="Delete" onClick={handleDeleteMovie} className={styles.modalBtn} />
      </div>
    </div>
  ) : null;
};
