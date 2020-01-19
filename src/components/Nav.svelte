<script>
  export let segment;

  import { post } from "api";
  import { stores, goto } from "@sapper/app";
  const { session } = stores();

  async function logout() {
    await post({ path: `api/logout` });
    $session.currentCompany = null;
    $session.companies = null;

    goto("/");
  }
</script>

<style>
  nav {
    border-bottom: 1px solid rgba(255, 62, 0, 0.1);
    font-weight: 300;
    padding: 0 1em;
  }

  ul {
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
    float: left;
  }

  .selected {
    position: relative;
    display: inline-block;
  }

  .selected::after {
    position: absolute;
    content: "";
    width: calc(100% - 1em);
    height: 2px;
    background-color: rgb(255, 62, 0);
    display: block;
    bottom: -1px;
  }

  a,
  span {
    text-decoration: none;
    padding: 1em 0.5em;
    display: block;
  }

  .logout {
    float: right;
  }

  button {
    display: block;
    padding: 22px 8px 16px;
    color: #333;
    cursor: pointer;
    box-sizing: border-box;
    background-color: unset;
    border: none;
  }
</style>

{#if true || $session.companies}
  <nav>
    <ul>
      {#if segment === 'contact'}
        <li>
          <span class:selected={segment === 'contact'}>
            {$session.customerName}
          </span>
        </li>
      {/if}

      <li>
        <a class:selected={segment === 'contacts'} href="auth/contacts">
          contacts
        </a>
      </li>
      <li class="logout">
        <button on:click={logout}>Logout</button>
      </li>
    </ul>
  </nav>
{/if}
