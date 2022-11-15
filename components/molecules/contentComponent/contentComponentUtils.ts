import type { IContentComponent } from "types";

type SplitSponsorContentSpotReturn = {
  contentComponent: IContentComponent[];
  sponsorContent: IContentComponent[];
}

export const splitSponsorContentSpot = (contentSpots?: IContentComponent[]): SplitSponsorContentSpotReturn => {
  let contentComponent: IContentComponent[] = [];
  let sponsorContent:IContentComponent[] = [];

  if (contentSpots && contentSpots.length !== 0) {
    contentSpots.forEach((contentSpot) => {
      if (contentSpot.type.includes('sponsor')) {
        sponsorContent.push(contentSpot);
      } else {
        contentComponent.push(contentSpot);
      }
    })
  }

  return { contentComponent, sponsorContent };
}