<script context="module">
  export function preload({ params }, session) {
    return { currentCompany: params.companyKey };
  }
</script>

<script>
  export let currentCompany;

  import { goto } from "@sapper/app";
  import payloads from "payloads";
  import routes from "routes";
  import * as api from "api";

  function handleSubmit({ target }) {
    const payload = payloads.contacts({
      Name: target.Name.value,
      Role: target.Role.value,
      AddressLine1: target.AddressLine1.value,
      AddressLine2: target.AddressLine2.value,
      AddressLine3: target.AddressLine3.value,
      PostalCode: target.PostalCode.value,
      City: target.City.value,
      Country: target.Country.value,
      PhoneNumber: target.PhoneNumber.value,
      EmailAddress: target.EmailAddress.value,
      Comment: target.Comment.value
    });

    const path = routes.sapper.contacts(currentCompany);

    api.post({ path, body: payload }).then(contact => {
      goto(routes.site.contactId(contact.message.ID));
    });
  }
</script>

<style>
  label,
  input {
    display: block;
  }
</style>

<h1>Create new contact</h1>

<article>
  <form on:submit|preventDefault={handleSubmit}>
    <label for="Name">Name</label>
    <input class="Name" type="text" name="Name" placeholder="Name" />

    <label for="Role">Role</label>
    <input class="Role" type="text" name="Role" placeholder="Role" />

    <h2>Address</h2>
    <label for="AddressLine1">AddressLine1</label>
    <input
      class="AddressLine"
      type="text"
      name="AddressLine1"
      placeholder="AddressLine1" />

    <label for="AddressLine2">AddressLine2</label>
    <input
      class="AddressLine"
      type="text"
      name="AddressLine2"
      placeholder="AddressLine2" />

    <label for="AddressLine3">AddressLine3</label>
    <input
      class="AddressLine"
      type="text"
      name="AddressLine3"
      placeholder="AddressLine3" />

    <label for="PostalCode">Postal code</label>
    <input
      class="PostalCode"
      type="text"
      name="PostalCode"
      placeholder="PostalCode" />

    <label for="City">City</label>
    <input class="City" type="text" name="City" placeholder="City" />

    <label for="Country">Country</label>
    <input class="Country" type="text" name="Country" placeholder="Country" />

    <h2>E-mail</h2>
    <label for="EmailAddress">E-Mail:</label>
    <input
      type="text"
      name="EmailAddress"
      class="Email"
      placeholder="E-mail address" />

    <h2>Phonenumber</h2>
    <label for="PhoneNumber">Phonenumber:</label>
    <input
      type="text"
      name="PhoneNumber"
      class="PhoneNumber"
      placeholder="Phonenumber" />

    <label for="Comment">Comment:</label>
    <input
      type="text"
      name="Comment"
      class="Comment"
      placeholder="Comment (optional)" />

    <input type="submit" value="Save" />
  </form>

</article>
