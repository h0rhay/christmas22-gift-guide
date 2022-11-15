import BaubleIcon from "components/atoms/baubleIcons";
import styled from "styled-components";
import Title from "components/atoms/title/title";
import { ITopHeading } from "types";

type ContentTitleProps = {
  content: ITopHeading[];
  className: string;
};

const ContentTitleStyles = styled.section`
  padding-top: ${({ theme }) => theme.typography.space.smallGap};
  width: 100%;
  text-align: center;
  .contentTitle {
    margin-top: -0.5rem;
  }
  .contentTitleDescription {
    margin: ${({ theme }) => theme.typography.space.small} 0 0 0;
    ${({ theme }) => theme.breakpoints.large} {
      max-width: 70%;
      margin: ${({ theme }) => theme.typography.space.small} auto 0 auto;
    }
  }
`;

const ContentTitle = ({ content, className }: ContentTitleProps) => {
  const { baubleType, title, description } = content[0] as ITopHeading;
  return (
    <ContentTitleStyles className={className}>
      <BaubleIcon baubleType={baubleType} />
      {title && (
        <Title size="medium" className="contentTitle">
          {title}
        </Title>
      )}
      {description && <p className="contentTitleDescription">{description}</p>}
    </ContentTitleStyles>
  );
};

export default ContentTitle;
