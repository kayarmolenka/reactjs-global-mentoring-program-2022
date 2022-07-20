import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { createStore } from '../../store';
import { MovieSort } from './MovieSort';
import { valueSortMovie } from '../../constants';

const onHandleSortType = jest.fn();

describe('MovieSort', () => {
  afterEach(() => {
    onHandleSortType.mockRestore();
  });

  it('should render "SortBy" component', () => {
    render(
      <Provider store={createStore()}>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route
              path="*"
              element={
                <MovieSort
                  chosenTypeSorting={valueSortMovie[0]}
                  onHandleSortType={onHandleSortType}
                />
              }
            />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByText('Sort by')).toBeInTheDocument();
  });

  it('should call onHandleSortType after chose other genre from dropdown', async () => {
    render(
      <Provider store={createStore()}>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route
              path="*"
              element={
                <MovieSort
                  chosenTypeSorting={valueSortMovie[0]}
                  onHandleSortType={onHandleSortType}
                />
              }
            />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    fireEvent.change(screen.getByTestId('select'), {
      target: { value: 'Rating' },
    });
    expect(screen.getByText('Rating'));

    await waitFor(() => {
      expect((screen.getByText('Rating') as HTMLOptionElement).selected).toBeTruthy();

      expect(onHandleSortType).toHaveBeenCalled();
    });
  });
});
