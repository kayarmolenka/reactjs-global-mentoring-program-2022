import { actionApplicationReducer } from './movieListSlice';
import { valueFilter, valueSortMovie } from '../constants';
import {
  changeFilter,
  fetchMovieById,
  fetchMovieList,
  fetchMovieListWithParams,
  setGenre,
} from './thunks';
import { IMovieList } from '../models';

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

const response = {
  limit: 15000,
  offset: 1,
  totalAmount: 12,
  data: [movieList],
};

const params = {
  sortBy: 'genres',
  filter: 'Drama',
};

describe('movieListSliceReducer', () => {
  const initialState = {
    movieList: [],
    activeGenre: valueFilter[0],
    sortingType: valueSortMovie[0],
  };

  it('should return movieList date after fulfilled response', () => {
    expect(actionApplicationReducer(initialState, fetchMovieList.fulfilled(response, ''))).toEqual({
      ...initialState,
      movieList: [movieList],
    });
  });

  it('should return movieList date after fulfilled response with params', () => {
    expect(
      actionApplicationReducer(
        initialState,
        fetchMovieListWithParams.fulfilled(response, '', params),
      ),
    ).toEqual({
      ...initialState,
      movieList: [movieList],
    });
  });

  it('should return activeDescriptionMovie date after fulfilled response', () => {
    expect(
      actionApplicationReducer(
        initialState,
        fetchMovieById.fulfilled(movieList, '123456789', 123456789),
      ),
    ).toEqual({
      ...initialState,
      activeDescriptionMovie: movieList,
    });
  });

  it('should setGenre Documentary', () => {
    expect(actionApplicationReducer(initialState, setGenre('Documentary'))).toEqual({
      ...initialState,
      activeGenre: 'Documentary',
    });
  });

  it('should return sorting type of genres after trigger changeFilter', () => {
    expect(actionApplicationReducer(initialState, changeFilter('genres'))).toEqual({
      ...initialState,
      sortingType: 'genres',
    });
  });
});
