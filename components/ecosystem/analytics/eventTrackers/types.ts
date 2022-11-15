import { ClickEventActions } from "./eventsConstants";
import { EventTrackerType } from "./eventTracker";

export type GoogleAnalyticsType = {
  ga_event_name: string;
  ga_eventcategory?: string;
  ga_eventaction?: ClickEventActions;
  ga_eventlabel?: string;
};

export type CommonEventsTypes = {
  page_name: string;
  page_type?: string;
}

export type ViewEventTrackerType = {
  // specific for view event
  pageload_event?: string;
  page_load_time?: string; // not used anymore?
  page_subtype?: string;
  page_breadcrumb?: string
  page_category_name?: string
} & CommonEventsTypes
  & GoogleAnalyticsType
  & EventTrackerType

export type LinkEventTrackerType =
  CommonEventsTypes
  & GoogleAnalyticsType
  & EventTrackerType
  & Omit<EventTrackerType, 'event_name' | 'ga_event_name' | 'ga_eventcategory' | 'ga_eventaction'>;

export type DynamicViewEventTrackerType = {
  page_name: string;
}

export type DynamicLinkEventTrackerType = {
  ga_eventaction?: ClickEventActions;
  page_name: string;
  ga_eventlabel?: string;
}
