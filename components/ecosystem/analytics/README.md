# Analytics.


## Structure

    .
    ├── eventTrackers            # Classes used to create analytics Data
    │    ├── index.ts            # Export all files in current folder.
    │    ├── eventTracker.ts     # Interface and common type for all eventTrackers.
    │    ├── linkEventTracker.ts # Represents the variables used over utag.link.
    │    └── viewEventTracker.ts # Represents the variables used over utag.view.
    ├── analytics.ts             # Class which triggers link and view functions from utag.
    ├── analyticsPostMessage.ts  # Class which send link/view attributes over postMessage.
    └── index.ts                 # exports Analytics and AnalyticsPostMessage.


## PostMessage:

It is used to send a post message with well-defined structure to a parent where should be triggering over there utag.link or utag.view.

You can find an example about how to use it at analyticsPostMessage.test.ts

### Use sample

*  utag.view it should be used when the page changes to identify that page.

* utag.link it should be used to track clicks.

You can notice two main things at the snippet bellow:

1. The analyticsPostMessage is created in useEffect when page is loaded so it is trigger the utag.view event.
2. The onClickHandler is attached to a button click, which should tracker a click.

```
import React, { useEffect } from 'react';
import Button from 'components/atoms/button';

import { AnalyticsPostMessage } from 'components/ecosystem/analytics';
import { LinkEventTracker, ViewEventTracker } from 'components/ecosystem/analytics/eventTrackers';

const SampleAnalyticsPage = () => {

  useEffect(() => {
    const analyticsPostMessage = new AnalyticsPostMessage();
    const viewEventTracker = new ViewEventTracker({
      event_name: 'sample_analytics_view',
      event_name_cm: 'sample_event_name_cm',
      page_name: 'sample_page_name',
      ga_event_name: 'sample_page_name', // ga events variables required to trigger ga events...
      ga_eventaction: 'sample_page_name',
      ga_eventcategory: 'sample_page_name',
      ga_eventlabel: 'sample_page_name',
      page_type: 'sample_page_type',
      pageload_event: 'sample_page_type',
    });

    analyticsPostMessage.triggerView(viewEventTracker);
  }, []);

  const onClickHandler = () => {
    const analyticsPostMessage = new AnalyticsPostMessage();
    const linkEventTracker = new LinkEventTracker({
      event_name: 'sample_analytics_view',
      event_name_cm: 'sample_event_name_cm',
      ga_event_name: 'sample_page_name', // ga events variables required to trigger ga events...
      ga_eventaction: 'sample_page_name',
      ga_eventcategory: 'sample_page_name',
      ga_eventlabel: 'sample_page_name',
    });

    analyticsPostMessage.triggerLink(linkEventTracker);
  }
  
  return (
    <>

      <div style={{ marginTop: '1em' }}>
        <Button type="button" onClick={onClickHandler}>Trigger Link</Button> 
      </div>
    </>
  )
};

export default SampleAnalyticsPage;

```

### Parent snippet
```
window.addEventListener('message', function(message) {
  var data = message.data;
  if (data.fromChild === 'analytics-postmessage') {
      var analyticsEvents = data.analyticsEvents;
      var eventType = data.eventType;
      if (eventType === 'link') {
          utag.link(analyticsEvents);
      } else {
          let utagMemoryDataFormatted = {};
          if (utag.data) {
            const utagMemoryData = {
              customer_email: utag.data.customer_email,
              visitor_status: utag.data.visitor_status,
              subscription_flag: utag.data.subscription_flag,
              site_language: utag.data.site_language,
              site_currency: utag.data.site_currency,
              wcs_user_id: utag.data.wcs_user_id,
              site_version: utag.data.site_version,
              subscription_status: utag.data.subscription_status,
              site_region: utag.data.site_region,
              subscription_id: utag.data.subscription_id,
              object_observed: utag.data.object_observed,
              site_view: utag.data.site_view,
              platform: utag.data.platform,
            };

             Object.keys(utagMemoryData).forEach((utagEventName) => {
              if (utagMemoryData[utagEventName] && utagMemoryData[utagEventName] !== '') {
                  utagMemoryDataFormatted[utagEventName] = utagMemoryData[utagEventName];
              }
            });
          }
          utag.view({ ...utagMemoryDataFormatted, ...analyticsEvents });
      }
  }
}, true);
```

## Analytics:

It is used to trigger link/view functions from utag.

* **It is required to import tealium script in the project before initialization**

1) To do that it is necessary to create a file called tealium.js at public folder 
2) Copy snippet bellow at the file created.

````
if (window) {
    window.utag_cfg_ovrd = window.utag_cfg_ovrd || {};
    console.log('iframe tealium being loaded');
    (function (a, b, c, d) {
        a = '//tags.tiqcdn.com/utag/selfridges/main/dev/utag.js';
        b = document;
        c = 'script';
        d = b.createElement(c);
        d.src = a;
        d.type = 'text/java' + c;
        d.async = true;
        a = b.getElementsByTagName(c)[0];
        a.parentNode.insertBefore(d, a);
        console.log('iframe utag script loaded');
    })();
}
```

3) Import that file before the Analytics be instantiated. egx: import at _app.tsx file.

4) If not declared the utag as global in ts files, copy the snippet below at index.d.ts otherwise may cause build issues in .ts files.

´´´
declare global {
  interface Window {
    utag: {
      link: Function;
      view: Function;
    };
  }
}
´´´


### Dependencies
* **It is required to import tealium script in the project before initialization**
