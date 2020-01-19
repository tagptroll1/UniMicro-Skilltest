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
    InvoiceAddress: InvoiceAddress.ID,
    DefaultPhone: DefaultPhone.ID,
    DefaultEmail: DefaultEmail.ID
  };

  $session.customerName = Name;

  async function save({ target }) {
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

<style>
  article {
    margin: 20px 20px 0;
  }

  h2 {
    margin-top: 20px;
  }

  label,
  input {
    display: block;
  }

  input[type="submit"] {
    margin-top: 10px;
  }
</style>

<article>
  <form on:submit|preventDefault={save}>
    <label for="Name">Name</label>
    <input
      class="Name"
      type="text"
      name="Name"
      placeholder="Name"
      value={Name} />

    <label for="Role">Role</label>
    <input
      class="Role"
      type="text"
      name="Role"
      placeholder="Role"
      value={Role || ''} />

    <h2>Address</h2>
    <label for="AddressLine1">AddressLine1</label>
    <input
      class="AddressLine"
      type="text"
      name="AddressLine1"
      placeholder="AddressLine1"
      value={InvoiceAddress.AddressLine1 || ''} />

    <label for="AddressLine2">AddressLine2</label>
    <input
      class="AddressLine"
      type="text"
      name="AddressLine2"
      placeholder="AddressLine2"
      value={InvoiceAddress.AddressLine2 || ''} />

    <label for="AddressLine3">AddressLine3</label>
    <input
      class="AddressLine"
      type="text"
      name="AddressLine3"
      placeholder="AddressLine3"
      value={InvoiceAddress.AddressLine3 || ''} />

    <label for="PostalCode">Postal code</label>
    <input
      class="PostalCode"
      type="text"
      name="PostalCode"
      placeholder="PostalCode"
      value={InvoiceAddress.PostalCode || ''} />

    <label for="City">City</label>
    <input
      class="City"
      type="text"
      name="City"
      placeholder="City"
      value={InvoiceAddress.City || ''} />

    <label for="Country">Country</label>
    <input
      class="Country"
      type="text"
      name="Country"
      placeholder="Country"
      value={InvoiceAddress.Country || ''} />

    <h2>E-mail</h2>
    <label for="EmailAddress">E-Mail:</label>
    <input
      type="text"
      name="EmailAddress"
      class="Email"
      placeholder="E-mail address"
      value={DefaultEmail.EmailAddress || ''} />

    <h2>Phonenumber</h2>
    <label for="PhoneNumber">Phonenumber:</label>
    <input
      type="text"
      name="PhoneNumber"
      class="PhoneNumber"
      placeholder="Phonenumber"
      value={DefaultPhone.Number || ''} />

    <label for="Comment">Comment:</label>
    <input
      type="text"
      name="Comment"
      class="Comment"
      placeholder="Comment (optional)"
      value={Comment || ''} />

    <input type="submit" value="Save" />
    <a href={routes.site.contactId(ID)}>Cancel</a>

  </form>

</article>
