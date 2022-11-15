import AnalyticsPostMessage from "./analyticsPostMessage";
import LinkEventTracker from "./eventTrackers/linkEventTracker";
import { DynamicViewEventTrackerType, DynamicLinkEventTrackerType } from "./eventTrackers/types";
import ViewEventTracker from "./eventTrackers/viewEventTracker";

class AnalyticsFactory {
  _analyticsEventTracker: LinkEventTracker | ViewEventTracker;
  _analyticsTriggerFunctionName: 'triggerLink' | 'triggerView';

  constructor(eventParams: DynamicLinkEventTrackerType | DynamicViewEventTrackerType) {

    if (this.isLink(eventParams)) {
      this._analyticsEventTracker = new LinkEventTracker(eventParams);
      this._analyticsTriggerFunctionName = 'triggerLink'
    } else {
      this._analyticsEventTracker = new ViewEventTracker(eventParams);
      this._analyticsTriggerFunctionName = 'triggerView'
    }
  }

  isLink(eventParams: DynamicLinkEventTrackerType | DynamicViewEventTrackerType): eventParams is DynamicLinkEventTrackerType {
    return (eventParams as DynamicLinkEventTrackerType).ga_eventaction !== undefined;
  }

  trigger(): void {
    const analyticsPostMessage = new AnalyticsPostMessage();

    if (this._analyticsTriggerFunctionName === 'triggerLink') {
      analyticsPostMessage.triggerLink(this._analyticsEventTracker as LinkEventTracker);
      return;
    }

    analyticsPostMessage.triggerView(this._analyticsEventTracker as ViewEventTracker);
  }
}

export default AnalyticsFactory;