export function post(req, res, next) {
    delete req.session.access_token;
    delete req.session.currentCompany;
    delete req.session.companies;

    res.end(JSON.stringify({ ok: true }));
}