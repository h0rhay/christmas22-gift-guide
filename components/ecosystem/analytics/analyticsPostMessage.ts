import LinkEventTracker from './eventTrackers/linkEventTracker';
import ViewEventTracker from './eventTrackers/viewEventTracker';
import { AnalyticsInterface } from './analytics';
import { LinkEventTrackerType, ViewEventTrackerType } from './eventTrackers/types';

export type PostMessageParamsType = {
  targetUrl: string;
  fromChild?: string;
}

export type ChildMessageType = {
  analyticsEvents: LinkEventTrackerType | ViewEventTrackerType;
  fromChild: string;
  eventType: 'link' | 'view',
  triggerParentFunctionName: string,
};

const PostMessageDefaultParams: PostMessageParamsType = {
  targetUrl: process.env.NEXT_PUBLIC_ANALYTICS_POST_MESSAGE_TARGET_URL || process.env.NEXT_PUBLIC_PARENT_URL || '',
  fromChild: 'analytics-postmessage'
}

class AnalyticsPostMessage implements AnalyticsInterface {
  _targetUrl: string;
  _fromChild: string;
  _hasAvailableParent: boolean;

  constructor({ targetUrl, fromChild }: PostMessageParamsType = PostMessageDefaultParams) {
    this._targetUrl = targetUrl;
    this._fromChild = fromChild || 'analytics-postmessage';
    this._hasAvailableParent = Boolean(typeof window !== 'undefined' && window.parent && this._targetUrl !== '');
  }

  triggerLink(linkEventTracker: LinkEventTracker): void {
    try {
      if (!this._hasAvailableParent) return;
      window && window.parent.postMessage(this._buildChildMessage(linkEventTracker), this._targetUrl);
    } catch (error) {
      console.warn('It was not possible to send analytics link at postmessage.', error);
    }
  }

  triggerView(viewEventTracker: ViewEventTracker): void {
    try {
      if (!this._hasAvailableParent) return;
      window && window.parent.postMessage(this._buildChildMessage(viewEventTracker), this._targetUrl);
    } catch (error) {
      console.warn('It was not possible to send analytics view at postmessage.', error);
    }
  }

  _buildChildMessage(message: LinkEventTracker | ViewEventTracker): ChildMessageType {
    const eventType = message instanceof LinkEventTracker ? 'link' : 'view';

    return {
      analyticsEvents: message.getAnalyticsEvents(),
      fromChild: this.fromChild,
      eventType,
      triggerParentFunctionName: 'utag',
    };
  }

  set fromChild(childName: string) {
    this._fromChild = childName;
  }

  get fromChild(): string {
    return this._fromChild
  }
}

export default AnalyticsPostMessage;