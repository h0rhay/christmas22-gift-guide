import { commonAnalyticsValues, constantViewEventData } from "./eventsConstants";
import { EventTrackerInterface } from "./eventTracker";
import { ViewEventTrackerType, DynamicViewEventTrackerType } from "./types";


class ViewEventTracker implements EventTrackerInterface<ViewEventTrackerType> {
  analyticsEvents: ViewEventTrackerType;

  constructor({ page_name }: DynamicViewEventTrackerType) {
    const isHomepage = (page_name === commonAnalyticsValues.HOMEPAGE_NAME)?true:false;
    const dynamicViewEventData = {
      page_name: `${commonAnalyticsValues.CGG}_${page_name}`,
      page_breadcrumb: `${commonAnalyticsValues.CHRISTMAS_GIFT_GUIDE}${isHomepage?'':`|${page_name}`}`,
      page_category_name: `${commonAnalyticsValues.CHRISTMAS_GIFT_GUIDE}${isHomepage?'':`_${page_name}`}`,
    };
    this.analyticsEvents = { ...constantViewEventData, ...dynamicViewEventData };
  }

  getAnalyticsEvents(): ViewEventTrackerType {
    return this.analyticsEvents;
  }

  setAnalyticsEvents(analyticsEvents: DynamicViewEventTrackerType) {
    this.analyticsEvents = new ViewEventTracker(analyticsEvents).analyticsEvents
  }
}

export default ViewEventTracker;