import nodeFetch from "node-fetch";

export async function send({ path, body, token, method, headers = {} }, fetch = undefined) {
    if (!fetch) {
        fetch = process.browser ? window.fetch : nodeFetch;
    }

    const options = { method, headers, credentials: "include" };

    if (body) {
        options.headers["Content-type"] = "application/json";
        options.body = JSON.stringify(body);
    }

    if (token) {
        options.headers.Authorization = `Bearer ${token}`;
    }

    try {
        const response = await fetch(path, options);
        const returnValue = {
            error: !response.ok,
            status: response.status,
            ok: response.ok,
            message: ""
        };

        if (!response.ok) {
            const message = await response.text();

            returnValue.ok = false;
            returnValue.error = true;
            returnValue.message = message;

            return returnValue;
        }
        const text = await response.text();

        if (text) {
            returnValue.message = JSON.parse(text);
        }

        return returnValue;
    } catch (err) {
        return {
            error: true,
            ok: false,
            message: err,
            status: 500,
        };
    }
}

export async function post({ path, body, token, headers }, fetch) {
    return await send({ path, body, token, headers, method: "POST" }, fetch);
}

export async function get({ path, token, headers }, fetch) {
    return await send({ path, token, headers, method: "GET" }, fetch);
}

export async function del({ path, token, headers }, fetch) {
    return await send({ path, token, headers, method: "DELETE" }, fetch);
}
