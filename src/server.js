import sirv from 'sirv';
import polka from 'polka';
import bodyParser from "body-parser";
import compression from 'compression';
import session from 'express-session';
import * as sapper from '@sapper/server';
import redirect from '@polka/redirect';
import sessionFileStore from 'session-file-store';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

const FileStore = sessionFileStore(session);

polka()
	.use(bodyParser.json())
	.use(session({
		secret: "uniMicro",
		resave: false,
		saveUninitialized: false,
		cookie: {
			maxAge: 60 * 60 * 24 * 365,
			secure: NODE_ENV === 'production',
			signed: NODE_ENV === 'production',
		},
		store: new FileStore({ path: ".sessions" }),
	}))
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
