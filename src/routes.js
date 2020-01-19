export default {
    test: {
        signIn: "https://test-api.unieconomy.no/api/init/sign-in",
        companyKey: "https://test-api.unieconomy.no/api/init/companies",
        biz: {
            contacts: "https://test-api.unieconomy.no/api/biz/contacts?expand=Info",
            contactId: (key) => `https://test-api.unieconomy.no/api/biz/contacts/${key}`,
            contact: (key, { invoiceAddress, defaultPhone, defaultEmail, defaultAddress }) => {
                let url = `https://test-api.unieconomy.no/api/biz/contacts/${key}?expand=Info`;

                if (invoiceAddress) url += ",Info.InvoiceAddress";
                if (defaultPhone) url += ",Info.DefaultPhone";
                if (defaultEmail) url += ",Info.DefaultEmail";
                if (defaultAddress) url += ",Info.DefaultAddress";

                return url;
            }
        }
    },
    site: {
        contacts: "auth/contacts",
        contactId: (key) => `auth/contact/${key}`,
        editContact: (key) => `auth/contact/${key}/edit`,
        contactsCompanyKey: (companyKey) => `auth/contacts/${companyKey}`,
        createContact: (companyKey) => `auth/contacts/${companyKey}/create`,
    },
    sapper: {
        contactId: (key) => `/api/contact/${key}`,
        contacts: (key) => `/api/contacts?companyKey=${key}`,
        login: "/api/auth",
    }
};
