import routes from "routes";
import * as api from "api";

export async function post(req, res) {
    const { body } = req;

    const accessTokenResponse = await api.post({
        body,
        path: routes.test.signIn,
    });

    const { message } = accessTokenResponse;

    res.setHeader("Content-Type", "application/json");

    if (!message) {
        res.writeHead(accessTokenResponse.status)
        return res.end(JSON.stringify({ ok: false }));
    }

    req.session.access_token = message.access_token;

    const companiesResponse = await api.get({
        path: routes.test.companyKey,
        token: message.access_token,
    });

    req.session.companies = companiesResponse.message;
    res.end(JSON.stringify(companiesResponse.message));
}