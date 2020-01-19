
export default {
    contacts: function createContactPayload({
        Name = null,
        Role = null,

        AddressLine1 = null,
        AddressLine2 = null,
        AddressLine3 = null,
        City = null,
        Country = null,
        PostalCode = null,
        AddressCountryCode = null,

        PhoneCountryCode = null,
        Description = null,
        PhoneNumber = null,

        EmailAddress = null,

        Comment = null
    }) {
        return {
            Info: {
                Name,
                InvoiceAddress: {
                    AddressLine1,
                    AddressLine2,
                    AddressLine3,
                    City,
                    Country,
                    CountryCode: AddressCountryCode,
                    PostalCode,
                },
                DefaultPhone: {
                    CountryCode: PhoneCountryCode,
                    Description,
                    Number: PhoneNumber,
                },
                DefaultEmail: {
                    EmailAddress,
                }
            },
            Role,
            Comment
        }
    }
}