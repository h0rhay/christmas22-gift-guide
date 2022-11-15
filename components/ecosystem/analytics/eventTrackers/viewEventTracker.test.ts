import { DynamicViewEventTrackerType } from "./types";
import ViewEventTracker from "./viewEventTracker";

let viewEventParams: DynamicViewEventTrackerType

describe('ViewEventTracker', () => {
  beforeEach(() => {
    const singleParam = 'view_event_test';
    viewEventParams = {
      page_name: singleParam,
    };
  });

  it('Check if class constructor is being called', () => {
    const eventTracker = new ViewEventTracker(viewEventParams);
    expect(eventTracker).toBeInstanceOf(ViewEventTracker);
  });

  it('Check getAnalyticsEvents is a function', () => {
    const eventTracker = new ViewEventTracker(viewEventParams);

    expect(typeof eventTracker.getAnalyticsEvents).toBe("function");
  });

  it('Check setAnalyticsEvents is a function', () => {
    const eventTracker = new ViewEventTracker(viewEventParams);

    expect(typeof eventTracker.setAnalyticsEvents).toBe("function");
  });

  it('Check getAnalyticsEvents returns a json of analyticsEvents', () => {
    const eventTracker = new ViewEventTracker(viewEventParams);
    const getAnalyticsEventsSpy = jest.spyOn(eventTracker, 'getAnalyticsEvents');

    eventTracker.getAnalyticsEvents()
    expect(getAnalyticsEventsSpy).toHaveBeenCalledTimes(1);
    expect(getAnalyticsEventsSpy).toHaveBeenCalledWith();
  });

  it('Check setAnalyticsEvents set the analyticsEvents', () => {
    const eventTracker = new ViewEventTracker(viewEventParams);
    const setAnalyticsEventsSpy = jest.spyOn(eventTracker, 'setAnalyticsEvents');
    viewEventParams.page_name = "new_view_event_name";
    eventTracker.setAnalyticsEvents(viewEventParams);

    expect(setAnalyticsEventsSpy).toHaveBeenCalledTimes(1);
    expect(setAnalyticsEventsSpy).toHaveBeenCalledWith(viewEventParams);
  });
});
