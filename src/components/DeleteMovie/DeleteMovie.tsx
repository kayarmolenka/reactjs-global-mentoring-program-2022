import { useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { Button } from '../index';

import styles from './DeleteMovie.module.scss';

interface IDeleteMovieProps {
  isDeleteMovieModal: boolean;
  setIsDeleteMovie: (data: boolean) => void;
  deleteMovie: () => void;
}

export const DeleteMovie = (props: IDeleteMovieProps) => {
  const { isDeleteMovieModal, setIsDeleteMovie, deleteMovie } = props;

  const closeModalWindow = useCallback(() => {
    setIsDeleteMovie(false);
    document.body.style.overflow = 'auto';
  }, [setIsDeleteMovie]);

  const stopClosed = useCallback((e) => {
    e.stopPropagation();
  }, []);

  const handleConfirmDelete = () => {
    deleteMovie();
    setIsDeleteMovie(false);
  };

  return isDeleteMovieModal ? (
    <div className={styles.modalShadow} onClick={closeModalWindow}>
      <div className={styles.modal} onClick={stopClosed}>
        <div className={styles.modalCloseWrapper}>
          <FontAwesomeIcon
            icon={faXmark}
            className={styles.modalCloseIcon}
            onClick={closeModalWindow}
            data-testid="closeIcon"
          />
        </div>
        <div className={styles.modalContent}>
          <h2>Delete Movie</h2>
          <p>Are you sure you want to delete this movie?</p>
          <div className={styles.modalConfirmBtnWrapper}>
            <Button
              text="Confirm"
              onClick={handleConfirmDelete}
              className={styles.modalConfirmBtn}
            />
          </div>
        </div>
      </div>
    </div>
  ) : null;
};
