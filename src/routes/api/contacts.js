import * as api from "api";
import routes from "routes";

export async function get(req, res) {

    const response = await api.get({
        path: routes.test.biz.contacts,
        token: req.session.access_token,
        headers: {
            "Content-Type": "application/json",
            "CompanyKey": req.query.companyKey
        },
    });

    if (!response.ok) {
        res.writeHead(400)
        return res.end()
    }

    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(response.message))
}