import Analytics from "./analytics";
import { ClickEventActions, LinkEventTracker, ViewEventTracker } from "./eventTrackers";

describe('Analytics through Post Message', () => {
  beforeAll(() => {
    window.utag = {
      link: jest.fn,
      view: jest.fn,
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Check if class constructor is being called', () => {
    const analytics = new Analytics();
    expect(analytics).toBeInstanceOf(Analytics);
  });

  it('Check if class constructor is being called', () => {
    const analytics = new Analytics();
    expect(analytics).toBeInstanceOf(Analytics);
  });

  it('Check triggerLink is a function', () => {
    const analytics = new Analytics();

    expect(typeof analytics.triggerLink).toBe("function");
  });

  it('Check triggerLink is a function', () => {
    const analytics = new Analytics();

    expect(typeof analytics.triggerView).toBe("function");
  });

  it('Check triggerLink call utag.link', () => {
    // @ts-ignore`
    const utagLinkSpy = jest.spyOn(window.utag, 'link').mockImplementationOnce(() => jest.fn());
    const analytics = new Analytics();

    const singleParam = 'link_event_test';
    const linkEventParams = {
      page_name: singleParam,
      ga_eventaction: ClickEventActions.button,
      ga_eventlabel: singleParam,
    };

    const linkEventTracker = new LinkEventTracker(linkEventParams);
    analytics.triggerLink(linkEventTracker);
    expect(utagLinkSpy).toHaveBeenCalledTimes(1);
    expect(utagLinkSpy).toHaveBeenCalledWith(linkEventTracker.analyticsEvents);
  });

  it('Check triggerView calls utag.view', () => {
    // @ts-ignore`
    const utagViewSpy = jest.spyOn(window.utag, 'link');
    const analytics = new Analytics();
    const singleParam = 'view_event_test';

    const viewEventTracker = new ViewEventTracker({
      page_name: singleParam,
    });
    analytics.triggerLink(viewEventTracker);
    expect(utagViewSpy).toHaveBeenCalledTimes(1);
    expect(utagViewSpy).toHaveBeenCalledWith(viewEventTracker.analyticsEvents);
  });

  it('Not break when utag not imported', () => {
    // @ts-ignore`
    window.utag = undefined;
    const consoleWarnSpy = jest.spyOn(global.console, 'warn').mockImplementation();

    const analytics = new Analytics();
    expect(analytics).toBeInstanceOf(Analytics);
    expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
  });
});