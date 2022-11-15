export const REM = 16;

export const dimensionsInPx = {
  small: 960,
  large: 961,
};

export const breakpoints = {
  small: `@media (max-width: ${dimensionsInPx.small / REM}rem)`,
  large: `@media (min-width: ${dimensionsInPx.large / REM}rem)`,
};

const SLIDER_TABLET = 1080;
const SLIDER_MOBILE = 576;

export const tablet = `@media only screen 
and (min-width: ${SLIDER_MOBILE}px) 
and (max-width: ${SLIDER_TABLET}px) `;

export const tabletAndMobile = `@media (max-width: ${SLIDER_TABLET}px) `;
export const mobile = `@media (max-width: ${SLIDER_MOBILE}px) `;
