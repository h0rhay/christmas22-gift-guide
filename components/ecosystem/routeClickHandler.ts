import updateParentUrl from "components/ecosystem/updateParentUrl";
import { NextRouter } from "next/router";

/**
 * 
 * @param urlParameter which is being set into parent of Iframe url as '?query=param'
 * and set for inner project as '/param'
 */

export const routeClickHandler = (router: NextRouter, urlParameter: string): void => {
  updateParentUrl(urlParameter);
  router.push(urlParameter);
}; 