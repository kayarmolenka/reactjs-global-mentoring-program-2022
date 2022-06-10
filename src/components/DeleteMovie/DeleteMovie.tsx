import { useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { Button } from '../index';

import styles from './DeleteMovie.module.scss';

interface IDeleteMovieProps {
  isDeleteMovieModal: boolean;
  setIsDeleteMovie: (data: boolean) => void;
}

export const DeleteMovie = (props: IDeleteMovieProps) => {
  const { isDeleteMovieModal, setIsDeleteMovie } = props;
  const closeModalWindow = useCallback(() => {
    setIsDeleteMovie(false);
    document.body.style.overflow = 'auto';
  }, [setIsDeleteMovie]);

  const stopClosed = useCallback((e) => {
    e.stopPropagation();
  }, []);

  const handleConfirmDelete = () => {
    console.log('The movie was successfully deleted');
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