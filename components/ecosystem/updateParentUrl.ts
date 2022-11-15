const GIFT_GUIDE_CATEGORY_CHANGE = 'GIFT-GUIDE-CATEGORY-CHANGE'

const updateParentUrl = (category: string) => {
  if (window && window.parent) {
    // Send a message to the parent
    const currentParentUrl = process.env.NEXT_PUBLIC_PARENT_URL;
    const messageObj = {
      queryParam: category,
      childMessage: GIFT_GUIDE_CATEGORY_CHANGE
    };
    if (currentParentUrl) {
      window.parent.postMessage(messageObj, currentParentUrl);
    }
  }
};


export default updateParentUrl;
