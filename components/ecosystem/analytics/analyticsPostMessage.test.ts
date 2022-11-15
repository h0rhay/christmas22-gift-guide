import { ClickEventActions, LinkEventTracker, ViewEventTracker } from "./eventTrackers";
import AnalyticsPostMessage, { ChildMessageType } from "./analyticsPostMessage";

const targetUrl: string = 'http://localhost:3000';
const fromChild: string = 'xmas-test';

describe('Analytics through Post Message', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Check if class constructor is being called', () => {
    const analyticsPostMessage = new AnalyticsPostMessage({ targetUrl });
    expect(analyticsPostMessage).toBeInstanceOf(AnalyticsPostMessage);
  });

  it('Check triggerLink is a function', () => {
    const analyticsPostMessage = new AnalyticsPostMessage({ targetUrl });

    expect(typeof analyticsPostMessage.triggerLink).toBe("function");
  });

  it('Check triggerLink is a function', () => {
    const analyticsPostMessage = new AnalyticsPostMessage({ targetUrl });

    expect(typeof analyticsPostMessage.triggerView).toBe("function");
  });

  it('Check triggerLink calls post message to parent with linkEventTracker', () => {
    const postMessageSpy = jest.spyOn(window.parent, 'postMessage');
    const analyticsPostMessage = new AnalyticsPostMessage({ targetUrl, fromChild });
    const buildChildMessageSpy = jest.spyOn(analyticsPostMessage, '_buildChildMessage');

    const singleParam = 'link_event_test';
    const linkEventParams = {
      page_name: singleParam,
      ga_eventaction: ClickEventActions.advert,
      ga_eventlabel: singleParam,
    };


    const linkEventTracker = new LinkEventTracker(linkEventParams);
    const childMessage: ChildMessageType = {
      analyticsEvents: linkEventTracker.analyticsEvents,
      fromChild,
      eventType: 'link',
      triggerParentFunctionName: 'utag',
    }

    analyticsPostMessage.triggerLink(linkEventTracker);
    expect(buildChildMessageSpy).toHaveBeenCalledTimes(1);
    expect(buildChildMessageSpy).toHaveBeenCalledWith(linkEventTracker);

    expect(postMessageSpy).toHaveBeenCalledTimes(1);
    expect(postMessageSpy).toHaveBeenCalledWith(childMessage, targetUrl);
  });

  it('Check triggerView calls post message to parent with linkEventTracker', () => {
    const postMessageSpy = jest.spyOn(window.parent, 'postMessage');
    const analyticsPostMessage = new AnalyticsPostMessage({ targetUrl, fromChild });
    const buildChildMessageSpy = jest.spyOn(analyticsPostMessage, '_buildChildMessage');

    const singleParam = 'view_event_test';
    const viewEventParams = {
      page_name: singleParam,

    };

    const viewEventTracker = new ViewEventTracker(viewEventParams);

    const childMessage: ChildMessageType = {
      analyticsEvents: viewEventTracker.analyticsEvents,
      fromChild,
      eventType: 'view',
      triggerParentFunctionName: 'utag',
    }

    analyticsPostMessage.triggerView(viewEventTracker);
    expect(buildChildMessageSpy).toHaveBeenCalledTimes(1);
    expect(buildChildMessageSpy).toHaveBeenCalledWith(viewEventTracker);

    expect(postMessageSpy).toHaveBeenCalledTimes(1);
    expect(postMessageSpy).toHaveBeenCalledWith(childMessage, targetUrl);
  });
});