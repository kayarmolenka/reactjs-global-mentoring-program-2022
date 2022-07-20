import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { createStore } from '../../../store';
import { HeaderComponent } from './HeaderComponent';
import { ADD_MOVIE_TEXT } from '../../../constants';

const setSuccessModal = jest.fn();
const setIsOpenModal = jest.fn();
const addMovieHandle = jest.fn();

describe('HeaderComponent', () => {
  afterEach(() => {
    setSuccessModal.mockRestore();
    setIsOpenModal.mockRestore();
    addMovieHandle.mockRestore();
  });

  it('should render "Find your movie" header', () => {
    render(
      <Provider store={createStore()}>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route
              path="*"
              element={
                <HeaderComponent
                  isOpenModal={false}
                  isSuccessModal={false}
                  setSuccessModal={setSuccessModal}
                  setIsOpenModal={setIsOpenModal}
                  addMovieHandle={addMovieHandle}
                />
              }
            />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByText('Find your movie')).toBeInTheDocument();
  });

  it('should render success modal when isSuccessModal equal true', () => {
    render(
      <Provider store={createStore()}>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route
              path="*"
              element={
                <HeaderComponent
                  isOpenModal={false}
                  isSuccessModal={true}
                  setSuccessModal={setSuccessModal}
                  setIsOpenModal={setIsOpenModal}
                  addMovieHandle={addMovieHandle}
                />
              }
            />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    expect(
      screen.getByText('The movie has been added to database successfully'),
    ).toBeInTheDocument();
  });

  it('should call addMovieHandle after click addMovie button', () => {
    render(
      <Provider store={createStore()}>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route
              path="*"
              element={
                <HeaderComponent
                  isOpenModal={false}
                  isSuccessModal={true}
                  setSuccessModal={setSuccessModal}
                  setIsOpenModal={setIsOpenModal}
                  addMovieHandle={addMovieHandle}
                />
              }
            />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    fireEvent.click(screen.getByText(ADD_MOVIE_TEXT));
    expect(addMovieHandle).toHaveBeenCalled();
  });

  it('should fill all form and submit form', async () => {
    render(
      <Provider store={createStore()}>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route
              path="*"
              element={
                <HeaderComponent
                  isOpenModal={true}
                  isSuccessModal={false}
                  setSuccessModal={setSuccessModal}
                  setIsOpenModal={setIsOpenModal}
                  addMovieHandle={addMovieHandle}
                />
              }
            />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    fireEvent.click(screen.getByText(ADD_MOVIE_TEXT));

    expect(screen.getByText('Add Movie')).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText('Movie title'), {
      target: { value: 'Marvel' },
    });

    fireEvent.change(screen.getByPlaceholderText('Select Date'), {
      target: { value: '06/09/2022' },
    });

    fireEvent.change(screen.getByPlaceholderText('htpps://'), {
      target: {
        value:
          'https://bipbap.ru/kartinki-dlya-srisovki/malenkie-kartinki-dlya-srisovki-39-foto.html',
      },
    });

    fireEvent.change(screen.getByPlaceholderText('7.8'), {
      target: { value: '9.9' },
    });

    fireEvent.change(screen.getByPlaceholderText('minutes'), {
      target: { value: '120' },
    });

    fireEvent.change(screen.getByPlaceholderText('Movie description'), {
      target: {
        value:
          'The franchise has been commercially successful and has generally received positive reviews. It has inspired other film and television studios to attempt to create',
      },
    });

    fireEvent.click(screen.getByText('Select Genre'));

    fireEvent.click(screen.getByText('Comedy'));

    fireEvent.click(screen.getByText('Submit'));

    expect(addMovieHandle).toHaveBeenCalled();
  });
});
