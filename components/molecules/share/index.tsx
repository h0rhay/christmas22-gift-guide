import { useState, useEffect, useContext } from "react";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  LinkedinShareButton,
  LinkedinIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";
import styled from "styled-components";
import Modal from "components/atoms/modal";
import { MdOutlineContentCopy } from "react-icons/md";
import { FcApproval } from "react-icons/fc";
import CircleButton from "components/atoms/circleButton";
import { ClickEventActions } from "components/ecosystem/analytics/eventTrackers";
import AnalyticsFactory from "components/ecosystem/analytics/analyticsFactory";
import { AppContext } from "components/ecosystem/appContext";

const SocialNetworkingWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const SocialNetworkingButtonWrapper = styled.div`
  margin: 0.5rem 1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 4rem;
  span {
    font-size: 0.7rem;
  }
`;

const CopyIcon = styled(MdOutlineContentCopy)`
  cursor: pointer;
  height: 2.8rem;
`;

const CopyUrlButton = styled.button`
  background: transparent;
  border: none;
`;

const ShareHeader = styled.h3`
  text-align: center;
  margin-top: 2rem;
  letter-spacing: 0.06rem;
`;

type IShare = {
  type: string;
  url: string;
};

const Share = ({ type, url }: IShare) => {
  const [showDialog, setShowDialog] = useState(false);
  const [copyStatus, setCopyStatus] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      if (copyStatus) setCopyStatus(false);
    }, 5000);
  }, [copyStatus]);

  const shareDetails = {
    title: "Season's Feastings",
    subject: "Serving suggestions for the ultimate Christmas",
    body: "Introducing your guide to cooking up the ultimate festive season with us. Inside, you'll find ideas for dressing up, setting up, merrymaking and gift-giving, alongside everything that's happening at Selfridges this Christmas.",
    url: url,
  };
  const { categoryName } = useContext(AppContext);
  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    setCopyStatus(true);
  };

  const openSharePopup = () => {
    new AnalyticsFactory({
      ga_eventaction: ClickEventActions.button,
      page_name: categoryName,
      ga_eventlabel: "Share",
    }).trigger();

    if (navigator.share) {
      navigator
        .share({
          title: shareDetails.title,
          text: shareDetails.body,
          url: shareDetails.url,
        })
        .then(() => {})
        .catch(() => {});
    } else {
      setCopyStatus(false);
      setShowDialog(true);
    }
    return null;
  };

  const closePopup = () => setShowDialog(false);

  return (
    <>
      {type === "circleButton" && (
        <CircleButton
          variant="icon"
          type="share"
          clickHandler={openSharePopup}
        />
      )}

      <Modal isOpen={showDialog} onDismiss={closePopup}>
        <ShareHeader>Share this page</ShareHeader>

        <SocialNetworkingWrapper>
          <SocialNetworkingButtonWrapper>
            <WhatsappShareButton
              title={shareDetails.title}
              url={shareDetails.url}
            >
              <WhatsappIcon size={50} round />
            </WhatsappShareButton>
            <span>Whatsapp</span>
          </SocialNetworkingButtonWrapper>

          <SocialNetworkingButtonWrapper>
            <FacebookShareButton
              url={shareDetails.url}
              quote={shareDetails.subject}
            >
              <FacebookIcon size={50} round />
            </FacebookShareButton>
            <span>Facebook</span>
          </SocialNetworkingButtonWrapper>

          <SocialNetworkingButtonWrapper>
            <TwitterShareButton
              title={shareDetails.body}
              url={shareDetails.url}
            >
              <TwitterIcon size={50} round />
            </TwitterShareButton>
            <span>Twitter</span>
          </SocialNetworkingButtonWrapper>

          <SocialNetworkingButtonWrapper>
            <LinkedinShareButton
              title={shareDetails.title}
              url={shareDetails.url}
              summary={shareDetails.body}
              source={shareDetails.url}
            >
              <LinkedinIcon size={50} round />
            </LinkedinShareButton>
            <span>Linkedin</span>
          </SocialNetworkingButtonWrapper>

          <SocialNetworkingButtonWrapper>
            <CopyUrlButton
              data-testid="copy-link-button"
              onClick={copyToClipboard}
            >
              {copyStatus ? <FcApproval size={50} /> : <CopyIcon size={30} />}
            </CopyUrlButton>
            <span>{copyStatus ? "Link copied" : "Copy link"}</span>
          </SocialNetworkingButtonWrapper>
        </SocialNetworkingWrapper>
      </Modal>
    </>
  );
};

export default Share;
