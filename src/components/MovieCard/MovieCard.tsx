import { SyntheticEvent, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { PopupMovieCard, DeleteMovie, Modal, CongratulationsModal } from '../index';
import { MovieCardProps } from '../../models';
import DEFAULT_SRC from '../../assets/images/default_poster.png';
import { deleteMovie, fetchMovieList, useAppDispatch } from '../../store';

import styles from './MovieCard.module.scss';

export const MovieCard = (props: MovieCardProps) => {
  const {
    isShowEditModal,
    setIsShowEditModal,
    setActivePopup,
    activePopupId,
    handleMovieCard,
    movieData,
  } = props;

  const { id, title, release_date, genres, runtime, vote_average, overview, poster_path } =
    movieData;
  const handleEditMenu = (e: SyntheticEvent) => {
    e.stopPropagation();
    setActivePopup(id);
    setIsShowEditModal(true);
  };

  const [isSuccessModal, setSuccessModal] = useState(false);
  const [isOpenEditMode, setOpenEditMode] = useState(false);
  const [isOpenDeleteModal, setOpenDeleteModal] = useState(false);
  const [srcImg, setSrcImg] = useState(poster_path ? poster_path : DEFAULT_SRC);
  const dispatch = useAppDispatch();

  const completeEditMovie = () => {
    setSuccessModal(true);
  };

  const descriptionMovie = {
    title,
    release_date,
    genres,
    runtime,
    overview,
    vote_average,
    poster_path,
    id,
  };

  const showDescription = () => {
    handleMovieCard(id);
  };

  const handleErrorImage = () => {
    setSrcImg(DEFAULT_SRC);
  };

  const handleDeleteMovie = async () => {
    await dispatch(deleteMovie(id));
    dispatch(fetchMovieList());
  };

  return (
    <div className={styles.movieCard} id={title}>
      <div className={styles.movieCardImage}>
        <NavLink to={`movie=:${id}`}>
          <img
            src={srcImg}
            alt={title}
            className={styles.movieCardPoster}
            onClick={showDescription}
            onError={handleErrorImage}
          />
        </NavLink>
        <div className={styles.movieCardCircle} onClick={handleEditMenu} data-name={id}>
          <FontAwesomeIcon
            icon={faEllipsisVertical}
            className={styles.movieCardThreeDots}
            data-name={id}
            data-testid="threeDotsIcon"
          />
        </div>
        {isShowEditModal && activePopupId === id && (
          <PopupMovieCard
            isOpenModal={isShowEditModal}
            setIsOpenModal={setIsShowEditModal}
            setOpenEditMode={setOpenEditMode}
            setOpenDeleteModal={setOpenDeleteModal}
          />
        )}
        <DeleteMovie
          isDeleteMovieModal={isOpenDeleteModal}
          setIsDeleteMovie={setOpenDeleteModal}
          deleteMovie={handleDeleteMovie}
        />
        <Modal
          textHeader="Edit Movie"
          isOpenModal={isOpenEditMode}
          setIsOpenModal={setOpenEditMode}
          setSuccessModal={completeEditMovie}
          initialState={descriptionMovie}
          editMode={true}
        />
        {isSuccessModal && (
          <CongratulationsModal
            isOpenModal={isSuccessModal}
            setIsOpenModal={setSuccessModal}
            modalText="The movie has been edited successfully!!"
          />
        )}
      </div>
      <div className={styles.movieCardDescription}>
        <div className={styles.movieCardTitle}>{title}</div>
        <div className={styles.movieCardRealiseDate}>{release_date}</div>
      </div>
      <p className={styles.movieCardGenre}>
        {genres.map((genre) => (
          <li key={genre}>{genre}</li>
        ))}
      </p>
    </div>
  );
};
