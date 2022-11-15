import { render, screen } from '@testing-library/react';
import Modal from '.';
import { ThemeProvider } from 'styled-components';
import Theme from 'styles/theme';
import ThemeContext from "components/ecosystem/themeContext/ThemeContext";

const props = {
  isOpen: true,
  onDismiss: jest.fn(),
  children: <div>Modal Child Component</div>,
};

const renderComponent = () =>
  render(
    <ThemeProvider theme={Theme}>
      <ThemeContext colorGroup="hero">
        <Modal {...props} />
      </ThemeContext>
    </ThemeProvider>
  );

describe('Modal', () => {
  beforeEach(() => {
    renderComponent();
  });

  it('should have close button', () => {
    expect(screen.getByTestId('close-button')).toBeInTheDocument();
    expect(screen.getByTestId('close-button')).toMatchSnapshot('CLOSE BUTTON');
  });

  it('should have child component', () => {
    expect(screen.getByText(/modal child component/i)).toBeInTheDocument();
    expect(screen.getByText(/modal child component/i)).toMatchSnapshot('MODAL CHILDREN COMPONENT');
  });
});
