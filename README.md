# Selfridges Christmas Gift Guide '22

Selfridges Christmas Gift Guide '22

## Getting Started

To run the server in your machine you can choose from running with npm or using docker compose for it.

## Run local server with npm

To run this project locally:
Run `yarn` or `npm install`

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

## Branching Strategy

This application has a trunk-based branching method with just one protected branch (`main`). Pull requests will be used for any merges to this protected branch.

```
----------------------------------------------------------------------------- main
|                                         |(merged via PR)
|                                         |
----------- feature branch ---------------
```

## Continuous Integration

```
- pr.yml
```

When a PR is created, `pr.yml` is launched and tests for `lints`, `unit tests`, `functional tests`, and so on.

## Continuous Deployment

```
- merge.yml
```

The project is deployed when PR's are created and merged to `main` branch.
You need to discover the URL from the AWS Cloudfront dashboard until we have R53 setup for a 'pretty' URL.

## Standalone jobs

```
- deploy.yml
- destroy.yml
```

`destroy.yml` & `deploy.yml` is used as a standalone job for deploying / deleting in specific environments (`Development`, `QA`, `PPT`, and `Production`), and it can be deployed from any branch except `Production`.

## AEM Author snippet

Insert into AEM author editor this parent snippet.
Go to page with a path:` selfridges/default/en_en/home/features/chritsmas-gift-guide.`
This code below starts the spinner, inserts an Iframe, and listens to messages from Iframe and updates the URL.

```
<style>
  .christmas-gift-guide {
    overflow-x: hidden;
  }
</style>
<div id="christmasGuide22Container" style="position:relative;"></div>
</div >
<div class="js-spinner">
</div>
<script>

const APP_URL = "https://dev-gift-guide.selfridges.com/"
const GIFT_GUIDE_CATEGORY_CHANGE = 'GIFT-GUIDE-CATEGORY-CHANGE'

// Activates the selfridges spinner element
document.body.classList.add('spinner-on');
document.body.classList.add('christmas-gift-guide');

// get message from Iframe and update URL
window.addEventListener('message', (event) => {
  var data = event.data;
  if (data.childMessage === GIFT_GUIDE_CATEGORY_CHANGE) {
    var queryParam = data.queryParam
    var parentUrl = `${window.location.origin}${window.location.pathname}`;
    var updatedUrl = data.queryParam === '/' ? parentUrl : `${parentUrl}?category=${queryParam}`;
    window.history.pushState({ path: updatedUrl }, '', updatedUrl);
    window.history.replaceState({ path: updatedUrl }, '', updatedUrl);
  }
  if (data.fromChild === 'analytics-postmessage') {
    var analyticsEvents = data.analyticsEvents;
    var eventType = data.eventType;
    if (eventType === 'link') {
        utag.link(analyticsEvents);
    } else {
        let utagMemoryDataFormatted = {};
        var bodyDataset = document.querySelector('body').dataset;
        var IS_V9 = !!(window?.FEATURE_SWITCHES && window?.FEATURE_SWITCHES?.WCSv9Migration); //It was used like that on cx-app
        var PLATFORM = IS_V9 ? 'v9' : 'v6'; //It was used like that on cx-app

        if (utag.data) {
          const utagMemoryData = {
            customer_email: utag.data.customer_email,
            visitor_status: utag.data.visitor_status,
            subscription_flag: utag.data.subscription_flag,
            site_language: utag.data.site_language || bodyDataset?.language,
            site_currency: utag.data.site_currency || 'gbp', //default gbp was used in cx-app
            wcs_user_id: utag.data.wcs_user_id,
            site_version: utag.data.site_version,
            subscription_status: utag.data.subscription_status,
            site_region: utag.data.site_region || bodyDataset.country?.toLowerCase(),
            subscription_id: utag.data.subscription_id,
            object_observed: utag.data.object_observed,
            site_view: utag.data.site_view,
            platform: utag.data.platform || PLATFORM,
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
});

const urlParams = window.location.search;
const urlSearchParams = new URLSearchParams(urlParams);
const category = encodeURIComponent(urlSearchParams.get('category'));
const containerHeight = window.innerHeight * 1.5
let container = document.getElementById('christmasGuide22Container');
let iframeEl = document.createElement('iframe');
container.style.height = containerHeight + 'px';
function turnOffSpinner() {
  document.body.classList.remove('spinner-on');
}

iframeEl.style.cssText = `position:absolute; top:0; left:0; width:100%;`;
iframeEl.style.height = containerHeight + 'px';

if (category !== "null") {
  iframeEl.setAttribute("src", `${APP_URL}${category}`);
} else {
  iframeEl.setAttribute("src", `${APP_URL}`);
}
iframeEl.setAttribute('frameborder', 0);
iframeEl.setAttribute("allow", "clipboard-read; clipboard-write");

iframeEl.setAttribute('onload', 'turnOffSpinner()');

container.appendChild(iframeEl);
</script>
```

## Listener in AEM author

Listens to messages from child Iframe with GIFT_GUIDE_CATEGORY_CHANGE title.
Receives category name and updates URL in a parent.

```
const GIFT_GUIDE_CATEGORY_CHANGE = 'GIFT-GUIDE-CATEGORY-CHANGE'

window.addEventListener('message', (event) => {
  if (event.data.childMessage === GIFT_GUIDE_CATEGORY_CHANGE) {
     const queryParam = event.data.queryParam
    const updatedUrl = `${window.location.origin}${window.location.pathname}?category=${queryParam}`

    window.history.pushState({ path: updatedUrl }, '', updatedUrl);
    window.history.replaceState({ path: updatedUrl }, '', updatedUrl);
  }
});
```
