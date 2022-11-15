export type GoogleAnalyticsType = {
  ga_event_name: string;
  ga_eventcategory?: string;
  ga_eventaction?: string;
  ga_eventlabel?: string;
};

export type EventTrackerType = {
  event_name: string;
  event_name_cm?: string;
} & GoogleAnalyticsType;

export interface EventTrackerInterface<T> {
  analyticsEvents: T;
  getAnalyticsEvents: () => T;
  setAnalyticsEvents: (analyticsEvents: T) => void;
}
export type EventTypes = 'link' | 'view'
