const redirect = require('@polka/redirect');

export function get(req, res, next) {
    req.session.destroy(err => {
        if (err) {
            console.error(err);
            next();
        } else {
            redirect(res, "/");
        }
    });
}