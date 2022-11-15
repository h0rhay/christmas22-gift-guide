import styled, { css } from "styled-components";

const ButtonStyles = styled.button<IButtonStyles>`
  all: unset;
  cursor: pointer;
  text-align: center;
  width: 100%;
  padding: 0.5rem 0;
  transition: all 0.2s ease-in-out;
  background: ${({ theme }) => theme.currentColorGroup.surface};
  color: ${({ theme }) => theme.currentColorGroup.interface};
  outline: 1px solid ${({ theme }) => theme.currentColorGroup.surface};
  &:hover {
    background: ${({ theme }) => theme.currentColorGroup.interface};
    color: ${({ theme }) => theme.currentColorGroup.surface};
    outline: 1px solid ${({ theme }) => theme.currentColorGroup.interface};
    a {
      color: ${({ theme }) => theme.currentColorGroup.surface};
    }
  }
  a {
    color: ${({ theme }) => theme.currentColorGroup.interface};
    width: 100%;
    display: block;
    text-decoration: none;
  }

  ${({ variation }) => {
    switch (variation) {
      case "outlined":
        return css`
          background: ${({ theme }) => theme.currentColorGroup.interface};
          color: ${({ theme }) => theme.currentColorGroup.surface};
          outline: 0.01px solid
            ${({ theme }) => theme.currentColorGroup.interface};
          border: 1px solid ${({ theme }) => theme.currentColorGroup.surface};
        `;
      case "reverse":
        return css`
              background: ${({ theme }) => theme.currentColorGroup.interface}};
              color: ${({ theme }) => theme.currentColorGroup.surface};
              a {
                color: ${({ theme }) => theme.currentColorGroup.surface};
              }
              &:hover {
                background: ${({ theme }) => theme.currentColorGroup.surface};
                color: ${({ theme }) => theme.currentColorGroup.interface};
                outline: 1px solid ${({ theme }) =>
                  theme.currentColorGroup.interface};
                a {
                  color: ${({ theme }) => theme.currentColorGroup.interface};
                }
              }
            `;

      case "ghost":
        return css`
          font-size: ${({ theme }) => theme.typography.fontSize.small};
          background: transparent;
          color: ${({ theme }) => theme.currentColorGroup.interface};
          outline: 1px solid ${({ theme }) => theme.currentColorGroup.interface};
          &:hover {
            color: ${({ theme }) => theme.currentColorGroup.surface};
            background: ${({ theme }) => theme.currentColorGroup.interface};
            outline: 1.5px solid
              ${({ theme }) => theme.currentColorGroup.surface};
          }
        `;
      case "sponsor": {
        return css`
          background: ${({ theme }) => theme.colors.sfYellow};
          margin-top: auto;
          padding: unset;
          outline: none;
          max-width: 10rem;
          a {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 3rem;
          }
          :hover {
            background: rgb(255, 238, 153);
            outline: none;
            a {
              color: ${({ theme }) => theme.colors.black};
            }
          }
      `}
      
      case "sponsor-reverse": {
        return css`
          background: none;
          outline: none;
          :hover {
            color: black;
            outline: none;
            background: none;
          }

          ${({ theme }) => css`
            ${theme.breakpoints.large} {
              background: black;
              outline: black;
              margin-top: auto;

              a {
                text-align: center;
              }

              :hover {
                outline: 1px solid black;
                background: ${theme.colors.sfYellow};

                a {
                  color: black;
                }
              }
            }
          `}
        `;
      }
      default:
        return;
    }
  }};
`;

type type = "submit" | "button";

export type ButtonVariationType =
  | "outlined"
  | "grey"
  | "outlined-grey"
  | "reverse"
  | "ghost"
  | "sponsor"
  | "sponsor-reverse";

type IButtonStyles = {
  secondary?: boolean;
  variation?: ButtonVariationType;
};

type IButton = {
  children: React.ReactNode;
  onClick?: () => void;
  type: type;
  disabled?: boolean;
  secondary?: boolean;
  variation?: ButtonVariationType;
  className?: string;
};

const Button: React.FC<IButton> = ({
  children,
  type,
  onClick,
  disabled,
  secondary,
  variation,
  className,
}) => {
  return (
    <ButtonStyles
      data-test-id={variation}
      type={type}
      onClick={onClick}
      disabled={disabled}
      secondary={secondary}
      variation={variation}
      className={className || ""}
    >
      {children}
    </ButtonStyles>
  );
};

export default Button;
