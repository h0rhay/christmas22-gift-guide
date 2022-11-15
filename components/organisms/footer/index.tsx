import Image from "next/image";
import styled from "styled-components";

const FooterStyles = styled.footer`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;

const Footer = () => (
  <FooterStyles>
    <div>
      <span>
        <Image
          src="/img/selfridges_logo.svg"
          alt="Selfridges Logo"
          width={150}
          height={24}
        />
      </span>
    </div>
  </FooterStyles>
);
export default Footer;
