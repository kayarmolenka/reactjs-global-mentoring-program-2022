import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { createStore } from '../../store';
import { MovieCard } from './MovieCard';
import { IMovieList } from '../../models';

const movieList: IMovieList = {
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

const setIsShowEditModal = jest.fn();
const setActivePopup = jest.fn();
const handleMovieCard = jest.fn();

const MovieDetailMock = () => <div>{'Movie detail mock'}</div>;

describe('MovieCard', () => {
  afterEach(() => {
    setIsShowEditModal.mockRestore();
    setActivePopup.mockRestore();
    handleMovieCard.mockRestore();
  });

  it('should return movie date', () => {
    render(
      <Provider store={createStore()}>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route
              path="*"
              element={
                <MovieCard
                  movieData={movieList}
                  isShowEditModal={true}
                  setIsShowEditModal={setIsShowEditModal}
                  setActivePopup={setActivePopup}
                  activePopupId={123}
                  handleMovieCard={handleMovieCard}
                />
              }
            />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByText('Marvel')).toBeInTheDocument();
  });

  it('should navigate to MovieDetailMock after click om movie card', () => {
    render(
      <Provider store={createStore()}>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route
              path="*"
              element={
                <MovieCard
                  movieData={movieList}
                  isShowEditModal={true}
                  setIsShowEditModal={setIsShowEditModal}
                  setActivePopup={setActivePopup}
                  activePopupId={123}
                  handleMovieCard={handleMovieCard}
                />
              }
            />
            <Route path="/movie=:123456789" element={<MovieDetailMock />} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    fireEvent.click(screen.getByAltText('Marvel'));

    expect(screen.getByText('Movie detail mock')).toBeInTheDocument();
  });

  it('should return open pop up when activePopupId equal movie id', () => {
    render(
      <Provider store={createStore()}>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route
              path="*"
              element={
                <MovieCard
                  movieData={movieList}
                  isShowEditModal={true}
                  setIsShowEditModal={setIsShowEditModal}
                  setActivePopup={setActivePopup}
                  activePopupId={123456789}
                  handleMovieCard={handleMovieCard}
                />
              }
            />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByText('Delete')).toBeInTheDocument();
    expect(screen.getByText('Edit')).toBeInTheDocument();
  });

  it('should call setIsShowEditModal and setActivePopup after click on threeDotsIcon', () => {
    render(
      <Provider store={createStore()}>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route
              path="*"
              element={
                <MovieCard
                  movieData={movieList}
                  isShowEditModal={true}
                  setIsShowEditModal={setIsShowEditModal}
                  setActivePopup={setActivePopup}
                  activePopupId={123456789}
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
    expect(setActivePopup).toHaveBeenCalled();
  });

  it('should return confirm pop up after click delete button', () => {
    render(
      <Provider store={createStore()}>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route
              path="*"
              element={
                <MovieCard
                  movieData={movieList}
                  isShowEditModal={true}
                  setIsShowEditModal={setIsShowEditModal}
                  setActivePopup={setActivePopup}
                  activePopupId={123456789}
                  handleMovieCard={handleMovieCard}
                />
              }
            />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    fireEvent.click(screen.getByText('Delete'));
    expect(screen.getByText('Are you sure you want to delete this movie?')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Confirm'));
  });

  it('should return "The movie has been edited successfully!!" pop up after edit and submitted form', async () => {
    render(
      <Provider store={createStore()}>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route
              path="*"
              element={
                <MovieCard
                  movieData={movieList}
                  isShowEditModal={true}
                  setIsShowEditModal={setIsShowEditModal}
                  setActivePopup={setActivePopup}
                  activePopupId={123456789}
                  handleMovieCard={handleMovieCard}
                />
              }
            />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    fireEvent.click(screen.getByText('Edit'));
    expect(screen.getByText('Edit Movie')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(screen.getByText('The movie has been edited successfully!!')).toBeInTheDocument();
    });
  });
});
