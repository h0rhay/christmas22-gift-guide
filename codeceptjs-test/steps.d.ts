/// <reference types='codeceptjs' />

type steps_file = typeof import('./steps_file.js');
type products = typeof import('./fragments/products.js');
type common = typeof import('./fragments/common.js');
type floatingNav = typeof import('./fragments/floatingnav.js');
type categories = typeof import('./fragments/categories.js');
type sponsor = typeof import('./fragments/sponsor.js');
type carousel = typeof import ('./fragments/carousel.js');
type video = typeof import('./fragments/video.js');


declare namespace CodeceptJS {
  interface SupportObject {
    I: I,
    current: any,
    products: products,
    common: common,
    floatingNav: floatingNav,
    categories: categories,
    sponsor: sponsor,
    carousel:carousel
    video: video
  }
  interface Methods extends Puppeteer {}
  interface I extends ReturnType<steps_file> {}
  namespace Translation {
    interface Actions {}
  }
}
