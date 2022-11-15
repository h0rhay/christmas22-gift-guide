import { MockedRequest } from 'msw'

if (typeof window !== 'undefined') {
    const { worker } = require('./browser');
    worker.start({onUnhandledRequest: (req: MockedRequest) => {
      console.log(
        'Found an unhandled %s request to %s',
        req.method,
        req.url.href,
      )
    }});
  } else {
    const { server } = require('./server');
    server.listen({onUnhandledRequest: (req: MockedRequest) => {
      console.log(
        'Found an unhandled %s request to %s',
        req.method,
        req.url.href,
      )
    }});
  }
  
  export {};