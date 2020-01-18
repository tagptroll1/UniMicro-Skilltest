<script context="module">
  import * as api from "api";
  import routes from "routes";

  export async function preload({ params }, session) {
    const path = routes.sapper.contacts(params.companyKey);
    const contactsResponse = await api.get({ path }, this.fetch);

    session.currentCompany = params.companyKey;

    if (!contactsResponse.ok) {
      this.error(error, contactsResponse.message);
    }

    return {
      contacts: contactsResponse.message
    };
  }
</script>

<script>
  export let contacts;
</script>

<style>
  li {
    border: 1px solid black;

    margin: 10px;
    padding: 0;
    list-style: none;
  }
</style>

<h1>Your contacts</h1>

<ul>
  {#each contacts as contact}
    <a href={routes.site.contactId(contact.ID)}>
      <li>
        <p>ID: {contact.ID}</p>
        <p>Role: {contact.Role}</p>
        <p>Comment: {contact.Comment || 'None'}</p>
      </li>
    </a>
  {/each}
</ul>
