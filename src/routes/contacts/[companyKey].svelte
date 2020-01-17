<script context="module">
  import * as api from "api";
  import routes from "routes";

  export async function preload({ params }, session) {
    if (!session || !session.loggedIn) {
      return this.redirect(301, "/");
    }

    session.currentCompany = params.companyKey;

    const path = routes.sapper.contacts(params.companyKey);
    const contactsResponse = await api.get({ path });

    if (!contactsResponse.ok) {
      this.error(error, contactsResponse.message);
    }

    return { contacts: contactsResponse.message };
  }
</script>

<script>
  export let contacts;

  import { stores } from "@sapper/app";
  const { session } = stores();
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
    <li>
      <p>ID: {contact.ID}</p>
      <p>Role: {contact.Role}</p>
      <p>Comment: {contact.Comment || 'None'}</p>
    </li>
  {/each}
</ul>
