import { Provider } from 'react-redux';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { createStore, IApplicationState } from '../../store';
import { Header } from './Header';
import { IMovieList } from '../../models';

const MockRoute = () => <div>{'Mock Route'}</div>;
const NotFound = () => <div>{'Not Found'}</div>;

const movieList: IMovieList[] = [
  {
    budget: 23000,
    genres: ['Drama', 'Comedy'],
    id: 123456789,
    overview: '',
    poster_path: '',
    release_date: '',
    revenue: 123333,
    runtime: 126,
    tagline: '',
    title: '',
    vote_average: 8.7,
    vote_count: 1900,
  },
];

const store: IApplicationState = {
  movieList: movieList,
  sortingType: 'Rating',
  activeGenre: 'All',
  activeDescriptionMovie: movieList[0],
};

describe('Header', () => {
  it('should return HeaderComponent after moved to "*" path', () => {
    render(
      <Provider store={createStore({ application: store })}>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path="*" element={<Header />} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByText('Search')).toBeInTheDocument();
  });

  it('should navigate to MockRouter after input 23 in search input and click submit button', () => {
    render(
      <Provider store={createStore()}>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path="*" element={<Header />} />
            <Route path="/23" element={<MockRoute />} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    fireEvent.change(screen.getByPlaceholderText('What do you want to watch?'), {
      target: { value: '23' },
    });
    fireEvent.click(screen.getByText('Search'));

    expect(screen.getByText('Mock Route')).toBeInTheDocument();
  });

  it('should return NotFound component when path is not correct with all routes', () => {
    render(
      <Provider store={createStore()}>
        <MemoryRouter initialEntries={['/header/123']}>
          <Routes>
            <Route path="/header" element={<Header />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByText('Not Found')).toBeInTheDocument();
  });
});
