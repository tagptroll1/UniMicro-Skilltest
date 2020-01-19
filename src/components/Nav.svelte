<script>
  export let companies;
  export let segment;

  import CompanyList from "@components/CompanyList.svelte";
  import routes from "routes";
  import { post } from "api";
  import { stores, goto } from "@sapper/app";
  const { session } = stores();

  function handleChange({ target }) {
    const { value } = target;

    goto(routes.site.contactsCompanyKey(value));
  }

  async function logout() {
    await post({ path: `api/logout` });
    $session.currentCompany = null;
    $session.companies = null;

    goto("/");
  }
</script>

<style>
  nav {
    display: flex;
    background-color: var(--main-color);
    padding: 0 1em;
    box-shadow: 0 1px 3px 2px rgba(20, 20, 20, 0.4);
  }

  ul {
    width: 25%;
    margin: 0;
    padding: 0;
  }

  /* clearfix */
  ul::after {
    content: "";
    display: block;
    clear: both;
  }

  li {
    display: block;
    list-style: none;
    float: left;
  }

  a,
  button {
    display: block;
    padding: 1em 0.5em;

    color: var(--white);
    font-size: 16px;
    font-weight: 600;

    text-decoration: none;
  }

  .logout {
    margin-left: auto;
  }

  button {
    display: block;
    box-sizing: border-box;

    background-color: unset;
    border: none;

    cursor: pointer;
  }
</style>

{#if true || $session.companies}
  <nav>
    <ul>
      <li>
        <a href="auth/contacts">Contacts</a>
      </li>

    </ul>
    <CompanyList on:change={handleChange} {companies} />

    <button class="logout" on:click={logout}>Logout</button>
  </nav>
{/if}
