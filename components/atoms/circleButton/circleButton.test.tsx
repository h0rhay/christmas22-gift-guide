import { render } from '@testing-library/react';
import CircleButton from '.';
import { ThemeProvider } from 'styled-components';
import Theme from 'styles/theme';
import ThemeContext from "components/ecosystem/themeContext/ThemeContext";

describe('CircleButton', () => {

  it('should match snapshot - Text CircleButton', () => {
    const renderComponent = () =>
      render(
        <ThemeProvider theme={Theme}>
          <ThemeContext colorGroup="hero">
            <CircleButton variant='text' text='foobar' clickHandler={() => null} />
          </ThemeContext>
        </ThemeProvider>
      );
    const { container } = renderComponent();
    expect(container).toMatchSnapshot('Text CircleButton');
  });

  it('should match snapshot - Accessibility CircleButton', () => {
    const renderComponent = () =>
      render(
        <ThemeProvider theme={Theme}>
          <ThemeContext colorGroup="hero">
            <CircleButton variant='icon' type='accessibility' clickHandler={() => null} />
          </ThemeContext>
        </ThemeProvider>
      );
    const { container } = renderComponent();
    expect(container).toMatchSnapshot('Accessibility CircleButton');
  });

  it('should match snapshot- Share CircleButton', () => {
    const renderComponent = () =>
      render(
        <ThemeProvider theme={Theme}>
          <ThemeContext colorGroup="hero">
            <CircleButton variant='icon' type='share' clickHandler={() => null} />
          </ThemeContext>
        </ThemeProvider>
      );
    const { container } = renderComponent();
    expect(container).toMatchSnapshot('Share CircleButton');
  });

});
