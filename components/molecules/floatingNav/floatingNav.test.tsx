import { render, screen } from '@testing-library/react';
import FloatingNav from '.';
import { ThemeProvider } from 'styled-components';
import Theme from 'styles/theme';
import ThemeContext from "components/ecosystem/themeContext/ThemeContext";

const mockCategoryList = [
  {
    id: 0,
    slug: 'foo'
  },
  {
    id: 1,
    slug: 'bar'
  },
  {
    id: 2,
    slug: 'foobar'
  }
]

let renderComponent: () => { container: any; };

describe('Floating Nav', () => {

  describe('when selected category is neither first nor last category', () => {
    beforeEach(() => {
      renderComponent = () =>
        render(
          <ThemeProvider theme={Theme}>
            <ThemeContext colorGroup="hero">
              <FloatingNav categoryId={1} categories={mockCategoryList} />
            </ThemeContext>
          </ThemeProvider>
        );
    });

    it('should match snapshot', () => {
      const { container } = renderComponent();
      expect(container).toMatchSnapshot('selected category is neither first nor last category');
    });

    it('should have home, prev and next button', () => {
      renderComponent();
      const home = screen.getByText(/home/i);
      const prev = screen.getByText(/prev/i);
      const next = screen.getByText(/next/i);
      expect(home).toBeInTheDocument();
      expect(prev).toBeInTheDocument();
      expect(next).toBeInTheDocument();
    });

    it('should have two svg buttons', () => {
      const { container } = renderComponent();
      container.querySelectorAll('svg').length.valueOf(2);
    });
  });

  describe('when first category is selected', () => {
    beforeEach(() => {
      renderComponent = () =>
        render(
          <ThemeProvider theme={Theme}>
            <ThemeContext colorGroup="hero">
              <FloatingNav categoryId={0} categories={mockCategoryList} />
            </ThemeContext>
          </ThemeProvider>
        );
    });

    it('should match snapshot', () => {
      const { container } = renderComponent();
      expect(container).toMatchSnapshot('first category is selected');
    });

    it('should have home and next button & not prev button', () => {
      renderComponent();
      const home = screen.getByText(/home/i);
      const prev = screen.queryByText(/prev/i);
      const next = screen.getByText(/next/i);
      expect(home).toBeInTheDocument();
      expect(prev).not.toBeInTheDocument();
      expect(next).toBeInTheDocument();
    });

  });

  describe('when last category is selected', () => {
    beforeEach(() => {
      renderComponent = () =>
        render(
          <ThemeProvider theme={Theme}>
            <ThemeContext colorGroup="hero">
              <FloatingNav categoryId={2} categories={mockCategoryList} />
            </ThemeContext>
          </ThemeProvider>
        );
    });

    it('should match snapshot', () => {
      const { container } = renderComponent();
      expect(container).toMatchSnapshot('last category is selected');
    });

    it('should have home and prev button & not next button', () => {
      renderComponent();
      const home = screen.getByText(/home/i);
      const prev = screen.getByText(/prev/i);
      const next = screen.queryByText(/next/i);
      expect(home).toBeInTheDocument();
      expect(prev).toBeInTheDocument();
      expect(next).not.toBeInTheDocument();
    });

  });

  describe('when no category is selected', () => {
    beforeEach(() => {
      renderComponent = () =>
        render(
          <ThemeProvider theme={Theme}>
            <ThemeContext colorGroup="hero">
              <FloatingNav categoryId={-1} categories={mockCategoryList} />
            </ThemeContext>
          </ThemeProvider>
        );
    });

    it('should match snapshot', () => {
      const { container } = renderComponent();
      expect(container).toMatchSnapshot('no category is selected');
    });

    it('should have only next button', () => {
      renderComponent();
      const home = screen.queryByText(/home/i);
      const prev = screen.queryByText(/prev/i);
      const next = screen.getByText(/next/i);
      expect(home).not.toBeInTheDocument();
      expect(prev).not.toBeInTheDocument();
      expect(next).toBeInTheDocument();
    });

  });

});
