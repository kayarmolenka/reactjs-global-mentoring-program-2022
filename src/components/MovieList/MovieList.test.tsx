import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { createStore } from '../../store';
import { MovieList } from './MovieList';
import { IMovieList } from '../../models';

const movie1: IMovieList = {
  budget: 23000,
  genres: ['Drama', 'Comedy'],
  id: 123456789,
  overview:
    'The franchise has been commercially successful and has generally received positive reviews. It has inspired other film and television studios to attempt to create similar shared universes with comic book character adaptations. The MCU has also inspired several themed attractions, an art exhibit, two television specials, guidebooks for each film, multiple tie-in video games, and commercials.',
  poster_path:
    'https://bipbap.ru/kartinki-dlya-srisovki/malenkie-kartinki-dlya-srisovki-39-foto.html',
  release_date: '2020/07/08',
  revenue: 123333,
  runtime: 126,
  tagline: 'Marvel movie the best',
  title: 'Marvel',
  vote_average: 8.7,
  vote_count: 1900,
};

const movie2: IMovieList = {
  budget: 2344,
  genres: ['Drama', 'Action'],
  id: 5555,
  overview:
    'The MCU has also inspired several themed attractions, an art exhibit, two television specials, guidebooks for each film, multiple tie-in video games, and commercials.',
  poster_path:
    'https://bipbap.ru/kartinki-dlya-srisovki/malenkie-kartinki-dlya-srisovki-39-foto.html',
  release_date: '2020/07/08',
  revenue: 75435,
  runtime: 90,
  tagline: 'Terminal movie the best',
  title: 'Terminal',
  vote_average: 8.7,
  vote_count: 1900,
};

const setIsShowEditModal = jest.fn();
const handleMovieCard = jest.fn();

describe('MovieList', () => {
  afterEach(() => {
    setIsShowEditModal.mockRestore();
    handleMovieCard.mockRestore();
  });

  it('should return two movies in the list', () => {
    render(
      <Provider store={createStore()}>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route
              path="*"
              element={
                <MovieList
                  movies={[movie1, movie2]}
                  isShowEditModal={false}
                  setIsShowEditModal={setIsShowEditModal}
                  handleMovieCard={handleMovieCard}
                />
              }
            />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByText('Marvel')).toBeInTheDocument();
    expect(screen.getByText('Terminal')).toBeInTheDocument();
  });

  it('should call handleMovieCard after click on the card', () => {
    render(
      <Provider store={createStore()}>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route
              path="*"
              element={
                <MovieList
                  movies={[movie1, movie2]}
                  isShowEditModal={false}
                  setIsShowEditModal={setIsShowEditModal}
                  handleMovieCard={handleMovieCard}
                />
              }
            />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    fireEvent.click(screen.getByAltText('Marvel'));

    expect(handleMovieCard).toHaveBeenCalled();
  });

  it('should call setIsShowEditModal after click on threeDotsIcon', () => {
    render(
      <Provider store={createStore()}>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route
              path="*"
              element={
                <MovieList
                  movies={[movie1, movie2]}
                  isShowEditModal={false}
                  setIsShowEditModal={setIsShowEditModal}
                  handleMovieCard={handleMovieCard}
                />
              }
            />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    fireEvent.click(screen.getAllByTestId('threeDotsIcon')[0]);

    expect(setIsShowEditModal).toHaveBeenCalled();
  });
});
