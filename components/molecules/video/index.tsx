import React, { useState, useEffect, useRef, useContext } from "react";
import VideoPoster from "./videoPoster";
import styled, { css } from "styled-components";
import { dimensionsInPx } from "styles/theme/breakpoints";
import { isMobileOnly } from "react-device-detect";
import { motion, AnimatePresence } from "framer-motion";
import { GrClose } from "react-icons/gr";
import { AppContext } from "components/ecosystem/appContext";
import ErrorMessage from "./errorMessage";
import { ClickEventActions } from "components/ecosystem/analytics/eventTrackers";
import AnalyticsFactory from "components/ecosystem/analytics/analyticsFactory";
import { VideoType } from 'types';

export const StyledVideo = styled.div<{ a11yMode: boolean }>`
  & video {
    width: 100%;
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    overflow: hidden;
    filter: ${({ a11yMode }) => (a11yMode ? "grayscale(100%)" : "none")};
  }
  > * {
    position: absolute;
    top: 1rem;
    right: 1rem;
    ${isMobileOnly && `top: 2rem;`}
    ${isMobileOnly && `right: 2rem;`}
    color: ${({ theme }) => theme.colors.grey.light};
  }
  svg {
    cursor: pointer;
    path {
      stroke: ${({ theme }) => theme.colors.grey.light};
    }
  }
`;

const Wrapper = styled.div<{
  isLandscapeVideo: boolean;
  isPortraitVideo: boolean;
}>`
  position: relative;
  padding-top: 56.25%;
  ${({ theme, isLandscapeVideo, isPortraitVideo }) => css`
    ${isPortraitVideo && `padding-top: 125%;`}
    ${theme.breakpoints.small} {
      padding-top: 125%;
      ${isLandscapeVideo && `padding-top: 56.26%;`}
    }
  `}
`;

const Container = styled.div<{
  isPortraitVideo: boolean;
  isLandscapeVideo: boolean;
  error: boolean;
}>`
  margin: 0 auto;
  ${({ theme, isPortraitVideo, isLandscapeVideo, error }) => css`
    ${isPortraitVideo && `max-width: 25rem;`}
    ${isPortraitVideo && error && `min-height: 40rem;`}
    ${isLandscapeVideo && error && `min-height: 20rem;`}
    ${theme.breakpoints.small} {
      max-width: 25rem;
      ${isLandscapeVideo && `max-width: none;`}
    }

    .video-description {
      margin: ${theme.typography.space.small} 0 ${theme.typography.space.small} 0;
    }
  `}

`;

const constructVideoUrl = (videoId?: string | null) => {
  return `https://images.selfridges.com/is/content/selfridges/${videoId}?fmt=`;
};

const getVideoId = (
  windowIsSmall: boolean | null,
  portraitVideoId?: string,
  landscapeVideoId?: string
): string | null => {
  if (landscapeVideoId && !portraitVideoId) {
    return landscapeVideoId || null;
  } else if (
    (!landscapeVideoId && portraitVideoId) ||
    windowIsSmall ||
    isMobileOnly
  ) {
    return portraitVideoId || null;
  } else {
    return landscapeVideoId || null;
  }
};

type Video = {
  id: string;
  altText: string;
  imgId?: string;
  portraitVideoId?: string;
  landscapeVideoId?: string;
} & Omit<VideoType, 'imgId' | 'landscapeVideoId' | 'portraitVideoId'>;

const Video = ({
  id,
  altText,
  imgId,
  portraitVideoId,
  landscapeVideoId,
  description,
}: Video) => {
  const [windowIsSmall, setWindowIsSmall] = useState(
    global?.window?.innerWidth <= dimensionsInPx.small ? true : false
  );
  const [isLandscapeVideo, setIsLandscapeVideo] = useState(
    landscapeVideoId && !portraitVideoId ? true : false
  );
  const [isPortraitVideo, setIsPortraitVideo] = useState(
    !landscapeVideoId && portraitVideoId ? true : false
  );
  const [videoUrl, setVideoUrl] = useState<string>(
    constructVideoUrl(
      getVideoId(windowIsSmall, portraitVideoId, landscapeVideoId)
    )
  );

  const { a11yMode, categoryName, categoryTitle } = useContext(AppContext);
  const [error, setError] = useState(false);
  const [isValidPortraitVideoUrl, setIsValidVideoPortraitUrl] = useState(true);
  const [isValidLandscapeVideoUrl, setisValidLandscapeVideoUrl] =
    useState(true);
  const playerRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  function handleResize() {
    setPlaying(false);
    window.innerWidth <= dimensionsInPx.small
      ? setWindowIsSmall(true)
      : setWindowIsSmall(false);
  }

  const handleError = () => {
    if (!isValidLandscapeVideoUrl && !isValidPortraitVideoUrl) {
      setError(true);
    } else {
      if (!windowIsSmall) {
        setIsPortraitVideo(true);
        setVideoUrl(constructVideoUrl(portraitVideoId));
      } else if (windowIsSmall) {
        setIsLandscapeVideo(true);
        setVideoUrl(constructVideoUrl(landscapeVideoId));
      }
      setIsValidVideoPortraitUrl(false);
      setisValidLandscapeVideoUrl(false);
    }
  };

  const handlePlay = () => {
    setPlaying(true);
    new AnalyticsFactory({
      ga_eventaction: ClickEventActions.videoPlay,
      page_name: categoryName,
      ga_eventlabel: `${categoryTitle}_video_${id}`
    }).trigger();
  };

  const handleEnded = () => {
    setPlaying(false);
  };

  useEffect(() => {
    if (playing) playerRef.current?.play();
    window.addEventListener("load", handleResize);
    window.addEventListener("resize", handleResize);
    setVideoUrl(
      constructVideoUrl(
        getVideoId(windowIsSmall, portraitVideoId, landscapeVideoId)
      )
    );
    return () => {
      window.removeEventListener("load", handleResize);
      window.removeEventListener("resize", handleResize);
    };
  }, [windowIsSmall, playing]);

  if (!landscapeVideoId && !portraitVideoId) return <h2>No video provided</h2>;
  else if (error) {
    return <ErrorMessage />;
  }

  return (
    <Container
      data-test-id={`video-container`}
      isPortraitVideo={isPortraitVideo}
      isLandscapeVideo={isLandscapeVideo}
      error={error}
    >
      <Wrapper
        isPortraitVideo={isPortraitVideo}
        isLandscapeVideo={isLandscapeVideo}
      >
        <AnimatePresence initial={false}>
          {playing ? (
            <motion.div
              key={"video-fade"}
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: { duration: 1.6, ease: `easeInOut` },
              }}
              exit={{ opacity: 0 }}
            >
              <StyledVideo a11yMode={a11yMode}>
                <video
                  key={`${videoUrl}-${id}`}
                  ref={playerRef}
                  autoPlay={false}
                  muted={true}
                  playsInline={true}
                  controls={playing ? true : false}
                  preload="metadata"
                  onEnded={handleEnded}
                  onError={handleError}
                >
                  <source src={`${videoUrl}mp4`} type="video/mp4" />
                  <source src={`${videoUrl}webm`} type="video/webm" />
                  <p>
                    I&apos;m sorry; your browser doesn&apos;t support HTML
                    video.
                  </p>
                </video>
                <GrClose onClick={handleEnded} />
              </StyledVideo>
            </motion.div>
          ) : (
            <motion.div
              key={"video-poster-fade"}
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: { duration: 1.6, ease: `easeInOut` },
              }}
              exit={{ opacity: 0 }}
            >
              <VideoPoster
                imgId={imgId}
                altText={altText}
                handlePlay={handlePlay}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </Wrapper>
      {description && (<p className="video-description">{description}</p>)}
    </Container>
  );
};

export default Video;
