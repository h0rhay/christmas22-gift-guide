import { css } from "styled-components";

const DropdownStyles = css`
  [data-reach-listbox-option][data-current-selected] {
    font-weight: bold;
  }
  [data-reach-listbox-option][data-current-nav] {
    background: ${({ theme }) => theme.currentColorGroup.surface};
    cursor: pointer;
  }
  [data-reach-listbox-option] {
    background: ${({ theme }) => theme.currentColorGroup.surface};
    outline: 1px solid ${({ theme }) => theme.currentColorGroup.secondary};
    padding: 0.5rem;
    & ~ [data-reach-listbox-option] {
      margin-top: 1rem;
    }
  }
  [data-reach-listbox-list] {
    outline: 1px solid ${({ theme }) => theme.currentColorGroup.secondary};
    background: ${({ theme }) => theme.currentColorGroup.surface};
    list-style-type: none;
    margin: 0;
    padding: 0.75rem 0.75rem;
    min-height: 9.5rem;
    max-height: 15rem;
    overflow: scroll;
  }
  [data-reach-listbox-arrow] {
    display: none;
  }
  [data-reach-listbox-button] {
    width: 100%;
    cursor: pointer;
    outline: none;
  }
  [data-reach-listbox-input] {
    border-bottom: 1px solid ${({ theme }) => theme.currentColorGroup.surface};
    margin-bottom: 2rem;
    height: 3rem;
    display: flex;
    align-items: center;
    position: relative;
    &:after {
      content: "";
      background: url("/img/downChevron.svg") no-repeat center;
      height: 1rem;
      width: 1rem;
      position: absolute;
      top: calc(50% - 0.5rem);
      right: 0;
      cursor: pointer;
      pointer-events: none;
    }
  }
`;

export default DropdownStyles;
