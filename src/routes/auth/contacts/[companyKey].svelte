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
    text-align: center;
    margin-bottom: 10px;
  }

  a {
    margin: 0 auto;
    display: block;
    width: max-content;
  }

  ul {
    width: 30%;
    margin: 20px auto 0;
    padding-left: 0;
  }

  @media (max-width: 900px) {
    ul {
      width: 50%;
    }
  }

  li {
    margin: 30px 10px 0;
    padding-left: 5px;
    list-style: none;
    color: darkblue;

    font-size: 2rem;
  }

  .create-new {
    padding: 2px 5px;
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
