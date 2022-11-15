import LinkEventTracker from './eventTrackers/linkEventTracker';
import ViewEventTracker from './eventTrackers/viewEventTracker';

export interface AnalyticsInterface {
  triggerLink: (linkEventTracker: LinkEventTracker) => void;
  triggerView: (viewEventTracker: ViewEventTracker) => void;
}

const UNAVAILABLE_SCRIPT_MESSAGE = 'Either the core Tealium script has not been imported, or the utag object is not available. Please check the tealium script import.';

class Analytics implements AnalyticsInterface {
  _isUtagAvailable: boolean = false;

  constructor() {
    this._updateUtagState();
  };

  _updateUtagState() {

    this._isUtagAvailable = Boolean(typeof window !== 'undefined' && window.utag);

    if (!this._isUtagAvailable) {
      console.warn(UNAVAILABLE_SCRIPT_MESSAGE);
    }
  }

  triggerLink(linkEventTracker: LinkEventTracker) {
    if (!this._isUtagAvailable) {
      // implement utag is loaded verification.
      console.warn(UNAVAILABLE_SCRIPT_MESSAGE);
      return;
    }

    window?.utag?.link(linkEventTracker.getAnalyticsEvents());
  }

  triggerView(viewEventTracker: ViewEventTracker) {
    if (!this._isUtagAvailable) {
      console.warn(UNAVAILABLE_SCRIPT_MESSAGE);
      return;
    }

    window?.utag?.view(viewEventTracker.getAnalyticsEvents());
  }
}

export default Analytics;
