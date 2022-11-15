export const commonAnalyticsValues = {
  HOMEPAGE_NAME: "homepage",
  CHRISTMAS_GIFT_GUIDE: "Christmas gift guide",
  LINK_EVENT_NAME: 'CGG_click',
  VIEW_EVENT_NAME: 'CGG_pageload',
  CGG: 'CGG'
}

export const UNAVAILABLE_SCRIPT_MESSAGE = 'Either the core Tealium script has not been imported, or the utag object is not available. Please check the tealium script import.';

export enum ClickEventActions {
  advert = "Advert Clicks",
  product = "Product Clicks",
  videoPlay = "Video Play",
  button = "Button Clicks",
  link = "Links"
}

export const constantViewEventData = {
  page_type: commonAnalyticsValues.CHRISTMAS_GIFT_GUIDE,
  pageload_event: commonAnalyticsValues.VIEW_EVENT_NAME,
  event_name: commonAnalyticsValues.VIEW_EVENT_NAME,
  ga_event_name: commonAnalyticsValues.VIEW_EVENT_NAME,
  event_name_cm: commonAnalyticsValues.VIEW_EVENT_NAME,
};


export const constantLinkEventData = {
  page_type: commonAnalyticsValues.CHRISTMAS_GIFT_GUIDE,
  event_name: commonAnalyticsValues.LINK_EVENT_NAME,
  ga_event_name: commonAnalyticsValues.LINK_EVENT_NAME,
  ga_eventcategory: commonAnalyticsValues.CHRISTMAS_GIFT_GUIDE
};
