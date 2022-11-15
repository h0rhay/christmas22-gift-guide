import React from "react";
import styled from "styled-components";

type SiteWidthContainerType = {
  children: React.ReactNode;
};

const SiteWidthContainer = styled.section`
  margin: 0 auto;
  width: 70rem;
  max-width: 90vw;
  /* @media (max-width: 36rem) {
  } */
`;

const SiteWidthWrapper = ({
  children,
  ...delegated
}: SiteWidthContainerType) => (
  <SiteWidthContainer className="site_width_wrapper" {...delegated}>
    {children}
  </SiteWidthContainer>
);

export default SiteWidthWrapper;
