import { commonAnalyticsValues, ClickEventActions, constantLinkEventData } from "./eventsConstants";
import LinkEventTracker from "./linkEventTracker";
import { LinkEventTrackerType } from "./types";

let linkEventParams: LinkEventTrackerType

const singleParam = 'link_event_test';
const formattedPageName = `${commonAnalyticsValues.CGG}_${singleParam}`;
describe('LinkEventTracker', () => {
  beforeEach(() => {
    linkEventParams = {
      ...constantLinkEventData,
      page_name: singleParam,
      ga_eventaction: ClickEventActions.advert,
      ga_eventlabel: singleParam,
    };
  });

  it('Check if class constructor is being called', () => {
    const linkEventTracker = new LinkEventTracker(linkEventParams);
    expect(linkEventTracker).toBeInstanceOf(LinkEventTracker);
  });

  it('Check getAnalyticsEvents is a function', () => {
    const linkEventTracker = new LinkEventTracker(linkEventParams);

    expect(typeof linkEventTracker.getAnalyticsEvents).toBe("function");
  });

  it('Check setAnalyticsEvents is a function', () => {
    const linkEventTracker = new LinkEventTracker(linkEventParams);

    expect(typeof linkEventTracker.setAnalyticsEvents).toBe("function");
  });

  it('Check getAnalyticsEvents returns a json of analyticsEvents', () => {
    const linkEventTracker = new LinkEventTracker(linkEventParams);
    const getAnalyticsEventsSpy = jest.spyOn(linkEventTracker, 'getAnalyticsEvents');
    linkEventParams.page_name = formattedPageName;
    expect(linkEventTracker.getAnalyticsEvents()).toEqual(linkEventParams);
    expect(getAnalyticsEventsSpy).toHaveBeenCalledTimes(1);
    expect(getAnalyticsEventsSpy).toHaveBeenCalledWith();
  });

  it('Check setAnalyticsEvents set the analyticsEvents', () => {
    const linkEventTracker = new LinkEventTracker(linkEventParams);
    const setAnalyticsEventsSpy = jest.spyOn(linkEventTracker, 'setAnalyticsEvents');
    linkEventParams.event_name = "new_event_name";
    linkEventTracker.setAnalyticsEvents(linkEventParams);

    expect(linkEventTracker.getAnalyticsEvents()).toBe(linkEventParams);
    expect(setAnalyticsEventsSpy).toHaveBeenCalledTimes(1);
    expect(setAnalyticsEventsSpy).toHaveBeenCalledWith(linkEventParams);
  });
});
