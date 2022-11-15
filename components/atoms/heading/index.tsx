import styled, { css } from "styled-components";

type ITitle = {
  size?: string;
  center?: boolean;
};

type IHeading = {
  children: React.ReactNode;
  size?: string;
  center?: boolean;
};

const Title = styled.h1<ITitle>`
  ${({ theme, size, center }) => css`
    font-weight: ${theme.typography.fontWeight.regular};
    ${center && `text-align: center;`}
    ${size && `font-size: ${theme.typography.headingFontSize[size]};`}
  `}
  font-family: ${({ theme }) => theme.typography.fontFamily.formula};
`;

const Heading = ({ children, size, center }: IHeading) => (
  <Title size={size} center={center}>
    {children}
  </Title>
);

export default Heading;
