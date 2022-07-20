import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { DescriptionMovie } from './DescriptionMovie';
import { IMovieList } from '../../models';

const description: IMovieList = {
  budget: 230000000,
  genres: ['Drama'],
  id: 1,
  overview: 'It is very interesting movie',
  poster_path: 'www.picture.com',
  release_date: '2022-07-08',
  revenue: 23000,
  runtime: 123,
  tagline: 'Movie',
  title: 'Terminal',
  vote_average: 9.8,
  vote_count: 25,
};

const handleErrorImage = jest.fn();

const SuccessRoute = () => <div>{'You returned back'}</div>;

describe('DescriptionMovie', () => {
  afterEach(() => {
    handleErrorImage.mockRestore();
  });

  it('should return "123 min" runtime', () => {
    render(
      <MemoryRouter>
        <DescriptionMovie
          poster="Poster"
          activeMovieDescription={description}
          handleErrorImage={handleErrorImage}
        />
      </MemoryRouter>,
    );

    expect(screen.getByText('123 min')).toBeInTheDocument();
  });

  it('should return "No Data" runtime because runtime equal 0', () => {
    description.runtime = 0;
    render(
      <MemoryRouter>
        <DescriptionMovie
          poster="Poster"
          activeMovieDescription={description}
          handleErrorImage={handleErrorImage}
        />
      </MemoryRouter>,
    );

    expect(screen.getByText('No Data')).toBeInTheDocument();
    description.runtime = 123;
  });

  it('should return to back page and show "You returned back" after click on logo', () => {
    render(
      <MemoryRouter initialEntries={['/movie1']}>
        <Routes>
          <Route path="/" element={<SuccessRoute />} />
          <Route
            path="/movie1"
            element={
              <DescriptionMovie
                poster="Poster"
                activeMovieDescription={description}
                handleErrorImage={handleErrorImage}
              />
            }
          />
        </Routes>
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByText('netflix'));

    expect(screen.getByText('You returned back')).toBeInTheDocument();
  });
});
