import styled from "styled-components";
import { tabletAndMobile } from "styles/theme/breakpoints";

const FullWidthWrapStyle = styled.div<{ isMobileOnly: boolean }>`
  ${({ isMobileOnly }) => (isMobileOnly ? tabletAndMobile : tabletAndMobile)} {
    width: 100vw;
    position: relative;
    left: 50%;
    right: 50%;
    margin-left: -50vw;
    margin-right: -50vw;
  }
`;

type FullWidthWrapType = {
  children: React.ReactNode;
  isMobileOnly?: boolean;
  isTopLayer?: boolean;
};

const FullWidthWrap = ({
  children,
  isMobileOnly = true,
}: FullWidthWrapType) => {
  return (
    <FullWidthWrapStyle isMobileOnly={isMobileOnly}>
      {children}
    </FullWidthWrapStyle>
  );
};

export default FullWidthWrap;
