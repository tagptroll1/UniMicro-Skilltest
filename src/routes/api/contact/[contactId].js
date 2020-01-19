import * as api from "api";
import routes from "routes";

export async function get(req, res, next) {
    const { params, session } = req;
    const key = params.contactId;
    const token = session.access_token;
    const CompanyKey = session.currentCompany;
    const path = routes.test.biz.contact(key, {
        invoiceAddress: true,
        defaultPhone: true,
        defaultAddress: true,
        defaultEmail: true,
    });

    const contact = await api.get({
        token,
        path,
        headers: {
            CompanyKey,
            "Content-Type": "application/json",
        }
    });

    res.setHeader("Content-Type", "application/json");
    res.writeHead(contact.status)
    res.end(JSON.stringify(contact.message || { ok: response.ok }));
}

export async function put(req, res, next) {
    const { params, session, body } = req;

    const key = params.contactId;
    const token = session.access_token;
    const CompanyKey = session.currentCompany;

    const path = routes.test.biz.contactId(key);

    const response = await api.put({
        token,
        path,
        body,
        headers: {
            CompanyKey,
        }
    });

    res.setHeader("Content-Type", "application/json");
    res.writeHead(response.status)
    res.end(JSON.stringify(response.message || { ok: response.ok }));
}

export async function del(req, res, next) {
    const { params, session } = req;

    const key = params.contactId;
    const token = session.access_token;
    const CompanyKey = session.currentCompany;

    const path = routes.test.biz.contactId(key);


    const response = await api.del({
        token,
        path,
        headers: {
            CompanyKey,
        }
    });

    res.setHeader("Content-Type", "application/json");
    res.writeHead(response.status)
    res.end(JSON.stringify(response.message || { ok: response.ok }));
}

