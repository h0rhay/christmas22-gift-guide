import { render } from '@testing-library/react';
import Checkbox from '.';
import { ThemeProvider } from 'styled-components';
import Theme from 'styles/theme';

const renderComponent = () =>
  render(
    <ThemeProvider theme={Theme}>
      <Checkbox label='foobar' id='foo' />
    </ThemeProvider>
  );

describe('Checkbox', () => {
  it('should match snapshot', () => {
    const { container } = renderComponent();
    expect(container).toMatchSnapshot();
  });
});
