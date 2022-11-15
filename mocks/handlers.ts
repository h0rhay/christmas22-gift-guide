import { RestRequest, ResponseFunction, RestContext, rest } from 'msw'
import { productResponses, priceResponses } from './mockResponses';

const END_POINT_PRODUCT = `${process.env.NEXT_PUBLIC_API_HOST}/productview/*`;
const END_POINT_STOCK = `${process.env.NEXT_PUBLIC_API_HOST}/stock/byId/*`;
const END_POINT_PRICE = `${process.env.NEXT_PUBLIC_API_HOST}/price/byId/*`;

export const handlers = [

  rest.get(END_POINT_STOCK, (req: RestRequest, res: ResponseFunction, ctx: RestContext) => {
    const productId = req.params['0'];
    if (productId == 'R03670385') {
      return res(
        ctx.status(200),
        ctx.json({
          stocks: [
            {
              "Stock Quantity Available to Purchase": "0"
            },
          ]
        }))
    } else {
      return res(
        ctx.status(200),
        ctx.json({
          stocks: [
            {
              "Stock Quantity Available to Purchase": "5"
            },
          ]
        }))
    }
  }),


  rest.get(END_POINT_PRODUCT, (req: RestRequest, res: ResponseFunction, ctx: RestContext) => {
    const productId = req.params['0'] as string;
    return res(
      ctx.status(200),
      ctx.json(productResponses[productId] || productResponses["default"])

    )
  }),


  rest.get(END_POINT_PRICE, (req: RestRequest, res: ResponseFunction, ctx: RestContext) => {
    const productId = req.params['0'] as string;
    return res(
      ctx.status(200),
      ctx.json(priceResponses[productId] || priceResponses["default"]))
  }),

]
