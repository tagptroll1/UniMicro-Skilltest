import sirv from 'sirv';
import polka from 'polka';
import bodyParser from "body-parser";
import memorystore from "memorystore";
import compression from 'compression';
import session from 'express-session';
import * as sapper from '@sapper/server';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

const MemoryStore = memorystore(session);

polka()
	.use(bodyParser.json())
	.use(session({
		secret: "uniMicro",
		resave: false,
		saveUninitialized: true,
		cookie: {
			maxAge: 60 * 60 * 24 * 365
		},
		store: new MemoryStore(),
	}))
	.use(
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		sapper.middleware({
			session: req => {

			}
		})
	)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});
