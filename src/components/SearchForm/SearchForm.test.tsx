import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { SearchForm } from './SearchForm';
import { createStore } from '../../store';

describe('SearchForm', () => {
  it('should render remove icon text after filled input and not render after remove text', () => {
    render(
      <Provider store={createStore()}>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path="*" element={<SearchForm />} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    fireEvent.change(screen.getByPlaceholderText('What do you want to watch?'), {
      target: { value: '23' },
    });
    fireEvent.click(screen.getByText('Search'));

    expect(screen.getByTestId('cancelText')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('cancelText'));

    expect(screen.queryByTestId('cancelText')).not.toBeInTheDocument();
  });
});
