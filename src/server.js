import sirv from 'sirv';
import polka from 'polka';
import bodyParser from "body-parser";
import compression from 'compression';
import session from 'express-session';
import * as sapper from '@sapper/server';
import sessionFileStore from 'session-file-store';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

const StoreClass = sessionFileStore(session);

function sniffer(req, res, next) {
  const { method, path, statusCode } = req;
  console.log(`${statusCode} ${method} - ${path}`);
  next();
}

const app = polka()
  .use(bodyParser.json())
  .use(session({
    secret: "uniMicro",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 24 * 365,
      signed: NODE_ENV === 'production',
      httpOnly: NODE_ENV === 'production',
    },
    store: new StoreClass({ path: process.env.NOW ? `/tmp/sessions` : ".sessions" }),
  }))
  .use(sniffer)
  .use(
    compression({ threshold: 0 }),
    sirv('static', { dev }),

    sapper.middleware({
      session: req => {
        const { session } = req;

        if (!session) return {};

        const { companies, currentCompany } = session;

        return {
          companies,
          currentCompany,
        };
      }
    })
  )
  .listen(PORT, err => {
    if (err) console.log('error', err);
  });

export default app;