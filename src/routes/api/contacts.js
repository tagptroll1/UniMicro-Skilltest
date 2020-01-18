import * as api from "api";
import routes from "routes";

export async function get(req, res, next) {

    const response = await api.get({
        path: routes.test.biz.contacts,
        token: req.session.access_token,
        headers: {
            "Content-Type": "application/json",
            "CompanyKey": req.query.companyKey
        },
    });

    if (!response.ok) {
        next();
    }

    req.session.currentCompany = req.query.companyKey;

    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(response.message))
}