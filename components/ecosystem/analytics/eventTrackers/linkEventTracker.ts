import { EventTrackerInterface } from "./eventTracker";
import { constantLinkEventData, commonAnalyticsValues } from "./eventsConstants";
import { LinkEventTrackerType, DynamicLinkEventTrackerType } from "./types";

class LinkEventTracker implements EventTrackerInterface<LinkEventTrackerType> {
  analyticsEvents: LinkEventTrackerType;
  constructor({ page_name, ga_eventlabel, ga_eventaction }: DynamicLinkEventTrackerType) {

    this.analyticsEvents = {
      ...constantLinkEventData,
      page_name: `${commonAnalyticsValues.CGG}_${page_name}`,
      ga_eventaction,
      ga_eventlabel,
    };
  }

  getAnalyticsEvents(): LinkEventTrackerType {
    return this.analyticsEvents;
  }

  setAnalyticsEvents(analyticsEvents: LinkEventTrackerType) {
    this.analyticsEvents = analyticsEvents;
  }
}

export default LinkEventTracker;