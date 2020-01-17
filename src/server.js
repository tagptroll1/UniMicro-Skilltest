import sirv from 'sirv';
import polka from 'polka';
import bodyParser from "body-parser";
import MemoryStore from "memorystore";
import compression from 'compression';
import session from 'express-session';
import * as sapper from '@sapper/server';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

const memoryStore = MemoryStore(session);

polka()
	.use(bodyParser.json())
	.use(session({
		secret: "uniMicro",
		resave: false,
		saveUninitialized: true,
		cookie: {
			maxAge: 60 * 60 * 24 * 365
		},
		store: new memoryStore(),
	}))
	.use(
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		sapper.middleware({
			session: req => {
				const { session } = req;

				if (!session) return {};

				const { accessToken, companies, currentCompany } = session;
				return {
					companies,
					currentCompany,
					loggedIn: !!accessToken,
				};
			}
		})
	)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});
