<script context="module">
  import * as api from "api";
  import routes from "routes";

  export async function preload({ params }, session) {
    const path = routes.sapper.contacts(params.companyKey);
    const contactsResponse = await api.get({ path }, this.fetch);

    const { companyKey } = params;
    session.currentCompany = companyKey;

    if (!contactsResponse.ok) {
      this.error(contactsResponse.status, contactsResponse.message);
    }

    return {
      currentCompany: companyKey,
      contacts: contactsResponse.message
    };
  }
</script>

<script>
  export let currentCompany;
  export let contacts;

  import Contact from "@components/Contact.svelte";
  import AddContactIcon from "@components/AddContactIcon.svelte";
</script>

<style>
  h1 {
    margin-bottom: 0;
  }

  a {
    text-decoration: none;
  }

  ul {
    width: max-content;
    padding-left: 0;
  }

  li {
    position: relative;
    width: max-content;
    margin: 10px 10px;
    padding-left: 5px;
    list-style: none;
    color: darkblue;

    font-size: 2rem;
  }

  .create-new {
    margin-top: 5px;
    position: relative;
    height: 25px;
    padding: 2px 5px;
    border: 1px solid rgb(82, 82, 82);
  }
</style>

<h1>Your contacts</h1>
<a class="create-new" href={routes.site.createContact(currentCompany)}>
  <AddContactIcon />
  Create new Contact
</a>

<ul>
  {#each contacts as contact}
    <li>
      <Contact {contact} />
    </li>
  {/each}
</ul>
