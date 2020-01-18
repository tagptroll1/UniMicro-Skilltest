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

    if (contact.ok) {
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(contact.message));
    } else {
        next();
    }
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

    if (response.ok) {
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ message: "OK" }));
    } else {
        next();
    }
}

