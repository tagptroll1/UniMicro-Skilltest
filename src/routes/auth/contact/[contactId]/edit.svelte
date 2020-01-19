<script context="module">
  import * as api from "api";
  import routes from "routes";

  export async function preload({ params }, { loggedIn }) {
    const path = routes.sapper.contactId(params.contactId);
    const { message, ok, status } = await api.get({ path }, this.fetch);

    if (!ok) {
      this.error(status, message);
    }

    return { contact: message };
  }
</script>

<script>
  export let contact;

  import payloads from "payloads";
  import ContactForm from "@forms/Contact.svelte";
  import { stores, goto } from "@sapper/app";
  const { session } = stores();

  const {
    ID,
    Info: { Name, DefaultEmail, DefaultPhone, InvoiceAddress },
    Comment,
    Role
  } = contact;

  const ids = {
    Contact: ID,
    Info: contact.Info.ID,
    InvoiceAddress: InvoiceAddress ? InvoiceAddress.ID : -1,
    DefaultPhone: DefaultPhone ? DefaultPhone.ID : -1,
    DefaultEmail: DefaultEmail ? DefaultEmail.ID : -1
  };

  const props = {
    Name,
    Role,
    Comment,
    returnTo: routes.site.contactId(ID)
  };

  if (InvoiceAddress) {
    const {
      AddressLine1,
      AddressLine2,
      AddressLine3,
      PostalCode,
      City,
      Country
    } = InvoiceAddress;
    Object.assign(props, {
      AddressLine1,
      AddressLine2,
      AddressLine3,
      PostalCode,
      City,
      Country
    });
  }

  if (DefaultEmail) {
    props.Email = DefaultEmail.EmailAddress;
  }

  if (DefaultPhone) {
    props.Phonenumber = DefaultPhone.Number;
  }

  $session.customerName = Name;

  async function submit({ target }) {
    const payload = payloads.updateContact(ids, {
      Name: target.Name.value,
      Role: target.Role.value,

      AddressLine1: target.AddressLine1.value,
      AddressLine2: target.AddressLine2.value,
      AddressLine3: target.AddressLine3.value,
      City: target.City.value,
      Country: target.Country.value,
      PostalCode: target.PostalCode.value,

      PhoneNumber: target.PhoneNumber.value,

      EmailAddress: target.EmailAddress.value,

      Comment: target.Comment.value
    });

    const path = routes.sapper.contactId(ID);

    const resp = await api.put({ path, body: payload });

    if (resp.ok) {
      goto(routes.site.contactId(ID));
    }
  }
</script>

<ContactForm on:submit {...props} />
