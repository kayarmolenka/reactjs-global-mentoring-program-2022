import { render } from '@testing-library/react';
import { Divider } from './Divider';

describe('Divider', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(<Divider />);

    expect(asFragment()).toMatchSnapshot();
  });
});
