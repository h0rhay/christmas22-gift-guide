import Heading from "components/atoms/heading";
import { IPageSchema } from "components/ecosystem/schema";
import CTA from "components/molecules/cta";
import XmasTitle from "components/atoms/xmasTitleDesktop";

const PageContent = ({ headingText, pageText }: IPageSchema) => (
  <>
    <XmasTitle />
    <Heading size="large" center>
      {headingText}
    </Heading>
    <p>{pageText}</p>
    <CTA />
  </>
);

export default PageContent;
