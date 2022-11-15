import Image from "next/image";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  padding: 5rem;
  width: 100vw;
  height: 100vh;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3rem;
`;

const Title = styled.h1`
  font-size: 8rem;
`;

const Description = styled.p`
  color: black;
  font-size: 2rem;
  font-family: "DINNextLTPro-Medium";

  a {
    font-size: 2rem;
    color: black;
    font-family: "DINNextLTPro-Medium";
    text-decoration-color: gray;
  }
  a:hover {
    text-decoration-color: black;
  }
`;

const ErrorComponent = () => {
  const homepage = `https://www.selfridges.com/GB/en/cat/christmas/`;
  return (
    <Wrapper>
      <Link href="https://www.selfridges.com/" passHref>
        <a target="_parent">
          <Image width={145} height={25} src={"/img/selfridges_logo.svg"} alt='selfridges-logo' />
        </a>
      </Link>
      <Title>404</Title>
      <Description>Sorry, the page you requested does not exist.</Description>
      {homepage && (
        <Description>
          Go to&nbsp;
          <Link href={homepage} passHref>
            <a target="_parent">home page.</a>
          </Link>
        </Description>
      )}
    </Wrapper>
  );
};
export default ErrorComponent;
