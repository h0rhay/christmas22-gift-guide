import styled from "styled-components";

const StyledErrorMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 20rem;
  height: 30rem;
  ${({ theme }) => theme.breakpoints.large} {
    width: 40rem;
    height: 22.5rem;
  }
`;
const ErrorMessage = () => (
  <StyledErrorMessage>
    <h2>
      Sorry, there&rsquo;s been an error
      <br /> loading this video.
    </h2>
  </StyledErrorMessage>
);

export default ErrorMessage;
