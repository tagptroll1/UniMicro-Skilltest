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

  import EditIcon from "@components/EditIcon.svelte";
  import DeleteContactIcon from "@components/DeleteContactIcon.svelte";
  import { stores, goto } from "@sapper/app";
  const { session } = stores();

  const {
    ID,
    Info: { Name, DefaultEmail, DefaultPhone, InvoiceAddress },
    Comment,
    Role
  } = contact;

  $session.customerName = Name;

  function handleDelete() {
    const returnValue = confirm(
      `Are you sure you want to delete ${Name}?\nThis is irreversible!`
    );

    if (returnValue) {
      const path = routes.sapper.contactId(ID);
      api.del({ path }).then(({ ok }) => {
        if (ok) {
          goto(routes.site.contacts);
        }
      });
    }
  }
</script>

<style>
  article {
    margin: 20px 20px 0;
  }

  h1 {
    width: max-content;
  }

  h1 span {
    display: block;
    color: rgb(138, 138, 138);
    font-size: 1rem;
  }

  ul {
    max-width: 350px;
    padding: 0;
  }

  li {
    list-style: none;
    margin: 5px 0;
  }

  li span {
    padding-left: 10px;
  }

  a,
  button {
    display: inline-block;
    color: black;
    text-decoration: none;
    cursor: pointer;
    box-sizing: content-box;
    padding: 8px 10px;
    margin: 0;

    background-color: unset;
    border: 2px outset;
    font-size: 0.8rem;
  }

  .address {
    display: block;
  }
</style>

<article>
  <h1>
    {Name}
    {#if Role}
      <span>{Role}</span>
    {/if}
  </h1>
  <ul>

    <li>
      E-Mail:
      <span>{DefaultEmail.EmailAddress || 'none'}</span>
    </li>
    <li>
      Phonenumber:
      <span>{DefaultPhone.Number || 'none'}</span>
    </li>
    <li>
      Comment:
      <span>{Comment || 'none'}</span>
    </li>

    <li>
      Address:
      <span class="address">{InvoiceAddress.AddressLine1 || ''}</span>
      <span class="address">{InvoiceAddress.AddressLine2 || ''}</span>
      <span class="address">{InvoiceAddress.AddressLine3 || ''}</span>
    </li>

    <li>
      Postal Code:
      <span>{InvoiceAddress.PostalCode || ''}</span>
    </li>

    <li>
      City:
      <span>{InvoiceAddress.City || ''}</span>
    </li>

    <li>
      Country:
      <span>{InvoiceAddress.Country || ''}</span>
    </li>
  </ul>

  <a href={routes.site.editContact(ID)}>
    <EditIcon />
    Edit
  </a>

  <button on:click={handleDelete}>
    <DeleteContactIcon />
    Delete
  </button>
</article>
