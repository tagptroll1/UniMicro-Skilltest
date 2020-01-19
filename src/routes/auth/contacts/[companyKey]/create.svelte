<script context="module">
  export function preload({ params }, session) {
    return { currentCompany: params.companyKey };
  }
</script>

<script>
  export let currentCompany;

  import { goto } from "@sapper/app";
  import ContactForm from "@forms/ContactForm.svelte";
  import payloads from "payloads";
  import routes from "routes";
  import * as api from "api";

  const returnTo = routes.site.contacts;

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
  h1 {
    text-align: center;
  }
</style>

<h1>Create new contact</h1>

<ContactForm on:submit={handleSubmit} {returnTo} />
