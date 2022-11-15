import React from "react";
import styled from "styled-components";
import ContentSpot from "components/molecules/contentComponent/contentSpot";
import { IContentComponent } from "types";
import ContentTitle from "./contentTitle";

type ContentComponentType = {
  content: IContentComponent[];
};

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const ContentComponent = ({ content }: ContentComponentType) => {
  return (
    <Container>
      {content.map((contentSpot, index) => {
        return (
          <React.Fragment key={`cc-${index}`}>
            {contentSpot.type && contentSpot.type === "iconTitle" ? (
              <ContentTitle content={contentSpot.content} className={""} />
            ) : (
              <ContentSpot
                key={index}
                type={contentSpot.type}
                content={contentSpot.content}
              />
            )}
          </React.Fragment>
        );
      })}
    </Container>
  );
};

export default ContentComponent;
