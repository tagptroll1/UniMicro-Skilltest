
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
    },
    updateContact: function updateContactPayload(Ids, {
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
        const obj = {
            ID: Ids.Contact,
            Info: { ID: Ids.Info }
        };

        const address = AddressLine1 || AddressLine2 || AddressLine3 || City || Country || AddressCountryCode || PostalCode;
        const phone = PhoneCountryCode || Description || PhoneNumber;
        const email = EmailAddress;

        if (Name !== undefined) obj.Info.Name = Name;
        if (Role !== undefined) obj.Role = Role;
        if (Comment !== undefined) obj.Comment = Comment;

        if (address) {
            obj.Info.InvoiceAddress = { ID: Ids.InvoiceAddress };
            if (AddressLine1 !== undefined) obj.Info.InvoiceAddress.AddressLine1 = AddressLine1;
            if (AddressLine2 !== undefined) obj.Info.InvoiceAddress.AddressLine2 = AddressLine2;
            if (AddressLine3 !== undefined) obj.Info.InvoiceAddress.AddressLine3 = AddressLine3;

            if (City !== undefined) obj.Info.InvoiceAddress.City = City;
            if (Country !== undefined) obj.Info.InvoiceAddress.Country = Country;
            if (AddressCountryCode !== undefined) obj.Info.InvoiceAddress.CountryCode = AddressCountryCode;
            if (PostalCode !== undefined) obj.Info.InvoiceAddress.PostalCode = PostalCode;
        }

        if (phone) {
            obj.Info.DefaultPhone = { ID: Ids.DefaultPhone };
            if (PhoneCountryCode !== undefined) obj.Info.DefaultPhone.CountryCode = PhoneCountryCode;
            if (Description !== undefined) obj.Info.DefaultPhone.Description = Description;
            if (PhoneNumber !== undefined) obj.Info.DefaultPhone.Number = PhoneNumber;
        }

        if (email) {
            obj.Info.DefaultEmail = { ID: Ids.DefaultEmail };
            if (EmailAddress !== undefined) obj.Info.DefaultEmail.EmailAddress = EmailAddress;
        }

        return obj;
    }
}