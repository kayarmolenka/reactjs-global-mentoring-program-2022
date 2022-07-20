import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { Footer } from './Footer';

const HomePage = () => <div>{'HomePage'}</div>;
describe('Footer', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should return to Home page and show "HomePage" after click on logo in the footer', () => {
    render(
      <MemoryRouter initialEntries={['/footer']}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/footer" element={<Footer />} />
        </Routes>
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByText('netflix'));

    expect(screen.getByText('HomePage')).toBeInTheDocument();
  });
});
