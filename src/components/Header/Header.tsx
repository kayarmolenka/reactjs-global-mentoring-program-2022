import { useEffect, useState } from 'react';
import { Route, Routes, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { HeaderComponent } from './components';
import { DescriptionMovie } from '../DescriptionMovie';
import DEFAULT_SRC from '../../assets/images/default_poster.png';

import { fetchMovieById, getActiveDescriptionMovieSelector, useAppDispatch } from '../../store';
import { NotFound } from '../NotFound';
import { convertIdFromStringToNumber } from '../../utils';

export const Header = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isSuccessModal, setSuccessModal] = useState(false);
  const activeMovieDescription = useSelector(getActiveDescriptionMovieSelector);
  const [srcImg, setSrcImg] = useState(
    activeMovieDescription?.poster_path ? activeMovieDescription.poster_path : DEFAULT_SRC,
  );
  const { '*': idMovie } = useParams();
  const dispatch = useAppDispatch();

  const addMovieHandle = () => {
    setIsOpenModal(true);
    document.body.style.overflow = 'hidden';
  };

  const handleErrorImage = () => {
    setSrcImg(DEFAULT_SRC);
  };

  useEffect(() => {
    if (activeMovieDescription?.id) {
      setSrcImg(activeMovieDescription.poster_path);
    }
  }, [activeMovieDescription, activeMovieDescription?.poster_path]);

  useEffect(() => {
    if (idMovie) {
      try {
        dispatch(fetchMovieById(convertIdFromStringToNumber(idMovie)));
      } catch (e) {
        console.error(e);
      }
    }
  }, [idMovie]);

  return (
    <Routes>
      <Route
        path="/*"
        element={
          <HeaderComponent
            isOpenModal={isOpenModal}
            isSuccessModal={isSuccessModal}
            setSuccessModal={setSuccessModal}
            setIsOpenModal={setIsOpenModal}
            addMovieHandle={addMovieHandle}
          />
        }
      />
      <Route
        path={`/movie:${idMovie && convertIdFromStringToNumber(idMovie)}`}
        element={
          activeMovieDescription && (
            <DescriptionMovie
              poster={srcImg}
              activeMovieDescription={activeMovieDescription}
              handleErrorImage={handleErrorImage}
            />
          )
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
